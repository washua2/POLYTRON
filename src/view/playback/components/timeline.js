// ===== Date format =====
Date.prototype.format = function (fmt) {
  let o = {
    "M+": this.getMonth() + 1,
    "d+": this.getDate(),
    "h+": this.getHours(),
    "m+": this.getMinutes(),
    "s+": this.getSeconds(),
    "q+": Math.floor((this.getMonth() + 3) / 3),
    S: this.getMilliseconds(),
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (this.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  }
  for (let k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
      );
    }
  }
  return fmt;
};

// ===== TimeLine =====
export default class TimeLine {
  constructor(
    canvasId,
    currentTime = new Date().getTime(),
    timeParts = [],
    isMove = false,
    changeCallback = (date) => {},
    nextCallback = (date) => {}
  ) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) throw new Error("Canvas not found: " + canvasId);

    this.ctx = this.canvas.getContext("2d");

    // 可选的每个间隔代表多少分钟
    this.minutePerStep = [
      1, 2, 5, 10, 15, 20, 30, 60, 120, 180, 240, 360, 720, 1440,
    ];
    // 最小刻度间距（CSS 像素）
    this.minScaleSpacing = 20;
    // 整个时间轴表示的时间长度（小时）
    this.totalRulerHours = 24;
    // 最小大格间距（CSS 像素）
    this.minLargeScaleSpacing = 80;
    // 缩放层级
    this.zoom = 24;

    this.currentTime = currentTime;
    this.timeParts = timeParts;
    this.isMove = false;
    this.moveTimer = null;
    this.changeCallback = changeCallback;
    this.nextCallback = nextCallback;

    // 鼠标状态
    this.isMouseDownFlag = false;
    this.isDragFlag = false;
    this.mousedownX = 0;

    // 触控状态
    this.isTouching = false;
    this.touchStartX = 0;
    this.lastTouchX = 0;
    this.isPinching = false;
    this.pinchStartDist = 0;
    this.pinchStartZoom = this.zoom;

    // DPR + Resize 适配
    this.fitCanvasSize();
    this.init();
    this.setIsMove(isMove);

    this.bindEvents();
    this.bindResize();
  }

  // ================== DPR / Resize ==================
  fitCanvasSize() {
    const rect = this.canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    const cssW = rect.width || this.canvas.clientWidth || 300;
    const cssH = rect.height || this.canvas.clientHeight || 50;

    // ✅ 逻辑尺寸 = CSS 像素
    this.logicalWidth = cssW;
    this.logicalHeight = cssH;
    this.dpr = dpr;

    this.canvas.style.width = cssW + "px";
    this.canvas.style.height = cssH + "px";

    // 物理像素
    this.canvas.width = Math.round(cssW * dpr);
    this.canvas.height = Math.round(cssH * dpr);

    // ✅ 坐标系回到 CSS 像素
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  bindResize() {
    // 用 ResizeObserver 更稳
    if (window.ResizeObserver) {
      this.resizeObserver = new ResizeObserver(() => {
        this.fitCanvasSize();
        this.init();
      });
      this.resizeObserver.observe(this.canvas);
    } else {
      this.onResize = () => {
        this.fitCanvasSize();
        this.init();
      };
      window.addEventListener("resize", this.onResize);
    }
  }

  // ================== Events ==================
  bindEvents() {
    const _this = this;

    this.eventListener = {
      // ----- PC -----
      wheel(event) {
        _this.wheelEvent(event);
        _this.hoverMove(event);
      },
      mousedown(event) {
        _this.isMouseDownFlag = true;
        _this.mousedownX = _this.getMouseXRelativePos(event);
      },
      mousemove(event) {
        if (_this.isMouseDownFlag) {
          _this.isDragFlag = true;
          _this.dragMove(event);
        } else {
          _this.hoverMove(event);
        }
      },
      mouseup(event) {
        if (!_this.isDragFlag) {
          _this.clickEvent(event);
          _this.hoverMove(event);
        }
        _this.changeCallback(new Date(_this.currentTime));
        _this.nextCallback(new Date(_this.currentTime));
        _this.isMouseDownFlag = false;
        _this.isDragFlag = false;
      },
      mouseleave() {
        _this.init();
        _this.isMouseDownFlag = false;
        _this.isDragFlag = false;
      },

      // ----- Mobile -----
      touchstart(e) {
        if (!e.touches.length) return;
        _this.isTouching = true;

        if (e.touches.length === 1) {
          const x = _this.getTouchXRelativePos(e.touches[0]);
          _this.touchStartX = x;
          _this.lastTouchX = x;
          _this.isPinching = false;
        }

        if (e.touches.length === 2) {
          // pinch start
          _this.isPinching = true;
          _this.pinchStartDist = _this.getTouchDistance(e.touches[0], e.touches[1]);
          _this.pinchStartZoom = _this.zoom;
        }
      },

      touchmove(e) {
        if (!_this.isTouching) return;
        e.preventDefault(); // 防止页面滚动

        if (e.touches.length === 1 && !_this.isPinching) {
          const x = _this.getTouchXRelativePos(e.touches[0]);
          const diffX = x - _this.lastTouchX;
          _this.dragMoveByDiff(diffX);
          _this.lastTouchX = x;
        }

        if (e.touches.length === 2) {
          // pinch zoom
          const dist = _this.getTouchDistance(e.touches[0], e.touches[1]);
          const ratio = dist / _this.pinchStartDist;
          const targetZoom = _this.pinchStartZoom / ratio; // 拉开=缩小，捏近=放大（符合直觉）
          _this.setZoom(targetZoom);
        }
      },

      touchend(e) {
        if (_this.isPinching && e.touches.length < 2) {
          _this.isPinching = false;
        }
        if (!e.touches.length) {
          // 单指 tap -> click
          if (!_this.isPinching) {
            const x = _this.lastTouchX;
            _this.tapAtX(x);
          }
          _this.isTouching = false;
          _this.changeCallback(new Date(_this.currentTime));
          _this.nextCallback(new Date(_this.currentTime));
        }
      },

      touchcancel() {
        _this.isTouching = false;
        _this.isPinching = false;
        _this.init();
      },
    };

    // PC
    this.canvas.addEventListener("wheel", this.eventListener.wheel, { passive: false });
    this.canvas.addEventListener("mousedown", this.eventListener.mousedown);
    this.canvas.addEventListener("mousemove", this.eventListener.mousemove);
    this.canvas.addEventListener("mouseup", this.eventListener.mouseup);
    this.canvas.addEventListener("mouseleave", this.eventListener.mouseleave);

    // Mobile
    this.canvas.addEventListener("touchstart", this.eventListener.touchstart, { passive: false });
    this.canvas.addEventListener("touchmove", this.eventListener.touchmove, { passive: false });
    this.canvas.addEventListener("touchend", this.eventListener.touchend);
    this.canvas.addEventListener("touchcancel", this.eventListener.touchcancel);
  }

  // ================== Public API ==================
  setTotalRulerHours(hours, startTime) {
    this.totalRulerHours = hours;
    this.startTimestamp = startTime;
    this.init();
  }

  setCurrentTime(time) {
    let newTime;
    if (typeof time === "string") newTime = new Date(time).getTime();
    else if (typeof time === "object") newTime = time.getTime && time.getTime();
    else if (typeof time === "number") newTime = time;

    this.currentTime = newTime;
    this.init();
  }

  setTimeParts(timeParts) {
    this.timeParts = timeParts;
    this.uniqueTimeParts();
    this.init();
  }

  addTimeParts(timeParts) {
    this.setTimeParts(this.timeParts.concat(timeParts));
  }

  setIsMove(isMove, speed = 1) {
    if (this.isMove === isMove) return;
    this.isMove = isMove;

    const clearTimer = () => {
      if (this.moveTimer) {
        clearInterval(this.moveTimer);
        this.moveTimer = null;
      }
    };

    if (isMove) {
      clearTimer();
      this.moveTimer = setInterval(() => {
        this.currentTime += 1000;
        this.init();
      }, 1000 / speed);
    } else {
      clearTimer();
    }
  }

  setChangeCallback(changeCallback) {
    this.changeCallback = changeCallback;
  }

  setnextCallback(nextCallback) {
    this.nextCallback = nextCallback;
  }

  getCurrentTime() {
    return this.currentTime;
  }

  getRaw() {
    return {
      currentTime: this.totalRulerHours,
      timeParts: this.timeParts,
      isMove: this.isMove,
      changeCallback: this.changeCallback,
      nextCallback: this.nextCallback,
    };
  }

  destroy() {
    // remove PC
    this.canvas.removeEventListener("wheel", this.eventListener.wheel);
    this.canvas.removeEventListener("mousedown", this.eventListener.mousedown);
    this.canvas.removeEventListener("mousemove", this.eventListener.mousemove);
    this.canvas.removeEventListener("mouseup", this.eventListener.mouseup);
    this.canvas.removeEventListener("mouseleave", this.eventListener.mouseleave);

    // remove Mobile
    this.canvas.removeEventListener("touchstart", this.eventListener.touchstart);
    this.canvas.removeEventListener("touchmove", this.eventListener.touchmove);
    this.canvas.removeEventListener("touchend", this.eventListener.touchend);
    this.canvas.removeEventListener("touchcancel", this.eventListener.touchcancel);

    if (this.onResize) window.removeEventListener("resize", this.onResize);
    if (this.resizeObserver) this.resizeObserver.disconnect();

    this.clearCanvas();
    if (this.moveTimer) clearInterval(this.moveTimer);
    this.moveTimer = null;
  }

  // ================== Core drawing ==================
  init() {
    this.clearCanvas();
    this.ctx.font = "14px normal";
    this.fillScaleBg();
    this.drawScale();
    this.drawCursor();

    if (this.timeParts.length) {
      this.timeParts.forEach((element) => {
        this.fillTimeParts(element);
      });
    }
  }

  fillScaleBg() {
    const w = this.logicalWidth;
    const h = this.logicalHeight;
    this.ctx.fillStyle = "#111928";
    this.ctx.fillRect(0, 0, w, h);
  }

  fillTimeParts(part) {
    const w = this.logicalWidth;

    let onePxsMS = w / (this.totalRulerHours * 60 * 60 * 1000);
    let beginX = (part.start - this.startTimestamp) * onePxsMS;
    let partWidth = (part.end - part.start) * onePxsMS;

    if (part.style && part.style.background) {
      this.ctx.fillStyle = part.style.background;
    } else {
      this.ctx.fillStyle = "rgba(109, 153, 254, 0.6)";
    }
    this.ctx.fillRect(beginX, 0, partWidth, 15);
  }

  drawScale() {
    const w = this.logicalWidth;

    let oneMinutePx = w / (this.totalRulerHours * 60);
    let oneMSPx = oneMinutePx / (60 * 1000);

    let scaleSpacing = this.minScaleSpacing;
    let scaleUnit = scaleSpacing / oneMinutePx;

    let len = this.minutePerStep.length;
    for (let i = 0; i < len; i += 1) {
      if (scaleUnit < this.minutePerStep[i]) {
        scaleUnit = this.minutePerStep[i];
        scaleSpacing = oneMinutePx * scaleUnit;
        break;
      }
    }

    let mediumStep = 30;
    for (let i = 0; i < len; i++) {
      if (this.minLargeScaleSpacing / oneMinutePx <= this.minutePerStep[i]) {
        mediumStep = this.minutePerStep[i];
        break;
      }
    }

    let totalScales = w / scaleSpacing;

    let startTimestamp =
      this.currentTime - (this.totalRulerHours * 60 * 60 * 1000) / 2;

    let leftOffsetMs =
      scaleUnit * 60 * 1000 - (startTimestamp % (scaleUnit * 60 * 1000));

    let leftOffsetPx = leftOffsetMs * oneMSPx;
    let oneScalesMS = scaleSpacing / oneMSPx;

    this.ctx.fillStyle = "#fff";
    this.ctx.strokeStyle = "rgba(151,158,167,1)";
    this.ctx.beginPath();

    const _this = this;
    function drawScaleLine(left, height) {
      _this.ctx.moveTo(left, 0);
      _this.ctx.lineTo(left, height);
      _this.ctx.lineWidth = 1;
    }

    for (let i = 0; i < totalScales; i++) {
      let graduationLeft = leftOffsetPx + i * scaleSpacing;
      let graduationTime = startTimestamp + leftOffsetMs + i * oneScalesMS;

      let date = new Date(graduationTime);
      let lineHeight;

      if ((graduationTime / (60 * 1000)) % mediumStep == 0) {
        lineHeight = 20;
        let scaleText = this.createScaleText(date);
        this.ctx.fillText(scaleText, graduationLeft - 15, 35);
      } else {
        lineHeight = 0;
      }
      drawScaleLine(graduationLeft, lineHeight);
    }

    this.ctx.stroke();
  }

  drawCursor() {
  const w = this.logicalWidth;
  const h = this.logicalHeight;

  // 中线
  this.ctx.beginPath();
  this.ctx.moveTo(w / 2, 0);
  this.ctx.lineTo(w / 2, 40);
  this.ctx.strokeStyle = "#1C64F2";
  this.ctx.lineWidth = 2;
  this.ctx.stroke();

  // ✅ 移动端文字往下偏移
  const isMobile = w < 1920; // 你也可以改成更合适的阈值
  const textYOffset = isMobile ? 14 : 0;  // 往下 8px

  this.ctx.fillStyle = "#ffffff";
  this.ctx.fillText(
    new Date(this.currentTime).format("yyyy-MM-dd hh:mm:ss"),
    w / 2 - 60,
    h - 15 + textYOffset
  );

  this.startTimestamp =
    this.currentTime - (this.totalRulerHours * 60 * 60 * 1000) / 2;
}


  // ================== Logic ==================
  createScaleText(time) {
    if (
      time.getHours() === 0 &&
      time.getMinutes() === 0 &&
      time.getMilliseconds() === 0
    ) {
      return time.format("yyyy-MM-dd");
    }
    return time.format("hh:mm");
  }

  dragMove(event) {
    let posX = this.getMouseXRelativePos(event);
    let diffX = posX - this.mousedownX;
    this.dragMoveByDiff(diffX);
    this.mousedownX = posX;
  }

  dragMoveByDiff(diffX) {
    const w = this.logicalWidth;
    let onePxsMS = w / (this.totalRulerHours * 60 * 60 * 1000);
    this.currentTime = this.currentTime - Math.round(diffX / onePxsMS);
    this.init();
  }

  hoverMove(event) {
    const w = this.logicalWidth;
    const h = this.logicalHeight;

    let posX = this.getMouseXRelativePos(event);
    let time = this.getMousePosTimeByX(posX);

    this.init();

    this.ctx.beginPath();
    this.ctx.moveTo(posX + 1, 0);
    this.ctx.lineTo(posX + 1, h);
    this.ctx.strokeStyle = "rgb(194, 202, 215)";
    this.ctx.lineWidth = 1;
    this.ctx.stroke();

    this.ctx.fillStyle = "rgb(194, 202, 215)";
    this.ctx.fillText(time.format("yyyy-MM-dd hh:mm:ss"), posX - 50, h - 10);
  }

  getMousePosTime(event) {
    let posX = this.getMouseXRelativePos(event);
    return this.getMousePosTimeByX(posX);
  }

  getMousePosTimeByX(posX) {
    const w = this.logicalWidth;
    let onePxsMS = w / (this.totalRulerHours * 60 * 60 * 1000);
    return new Date(this.startTimestamp + posX / onePxsMS);
  }

  clickEvent(event) {
    let time = this.getMousePosTime(event).getTime();
    this.setCurrentTime(time);
  }

  tapAtX(x) {
    let time = this.getMousePosTimeByX(x).getTime();
    this.setCurrentTime(time);
  }

  setZoom(targetZoom) {
    let z = Math.round(targetZoom / 1) * 1; // 整数小时
    if (z < 1) z = 1;
    if (z > 24) z = 24;
    this.zoom = z;
    this.totalRulerHours = z;
    this.init();
  }

  wheelEvent(event) {
    event.preventDefault();
    let delta = Math.max(-1, Math.min(1, event.wheelDelta));
    if (delta < 0) {
      this.zoom = this.zoom + 4;
      if (this.zoom >= 24) this.zoom = 24;
    } else if (delta > 0) {
      this.zoom = this.zoom - 4;
      if (this.zoom <= 1) this.zoom = 1;
    }
    this.totalRulerHours = this.zoom;
    this.init();
  }

  // ================== Mouse / Touch utils ==================
  getMouseXRelativePos(event) {
    let scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
    let x = event.pageX || event.clientX + scrollX;
    let baseLeft = this.canvas.getBoundingClientRect().x;
    return x - baseLeft;
  }

  getTouchXRelativePos(touch) {
    let x = touch.clientX;
    let baseLeft = this.canvas.getBoundingClientRect().left;
    return x - baseLeft;
  }

  getTouchDistance(t1, t2) {
    const dx = t1.clientX - t2.clientX;
    const dy = t1.clientY - t2.clientY;
    return Math.sqrt(dx * dx + dy * dy);
  }

  clearCanvas() {
    const w = this.logicalWidth;
    const h = this.logicalHeight;
    this.ctx.clearRect(0, 0, w, h);
  }

  // ================== TimeParts unique ==================
  uniqueTimeParts() {
    let len = this.timeParts.length;
    if (len <= 1) return;

    this.timeParts.sort((a, b) => a.start - b.start);

    for (let i = 1; i < len; i++) {
      const element = this.timeParts[i];
      const preElement = this.timeParts[i - 1];
      if (element.start === preElement.start && element.end === preElement.end) {
        element.isRepeat = true;
      }
    }
    this.timeParts = this.timeParts.filter((item) => !item.isRepeat);
  }
}
