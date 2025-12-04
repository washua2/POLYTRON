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
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(
      RegExp.$1,
      (this.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  for (let k in o)
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
      );
  return fmt;
};

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
    this.ctx = this.canvas.getContext("2d");

    // ====== 基础配置 ======
    this.minutePerStep = [1, 2, 5, 10, 15, 20, 30, 60, 120, 180, 240, 360, 720, 1440];
    this.minScaleSpacing = 20;
    this.totalRulerHours = 24;
    this.minLargeScaleSpacing = 80;
    this.zoom = 24;

    this.currentTime = currentTime;
    this.timeParts = timeParts;
    this.isMove = false;
    this.moveTimer = null;
    this.changeCallback = changeCallback;
    this.nextCallback = nextCallback;

    // ====== 交互状态 ======
    this.isMouseDownFlag = false;
    this.isDragFlag = false;
    this.mousedownX = 0;

    // ====== 移动端状态 ======
    this.isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    this.touching = false;
    this.touchStartX = 0;
    this.touchStartTime = 0;
    this.lastTapTime = 0;

    // pinch
    this.pinchStartDist = 0;
    this.pinchStartZoom = this.zoom;

    // resize
    this.resizeObserver = null;

    // 先做一次 DPR/尺寸适配
    this.fitCanvasSize();

    this.init();
    this.setIsMove(isMove);

    const _this = this;

    // ====== PC 事件 ======
    this.eventListener = {
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
    };

    // ====== 移动端事件 ======
    this.touchListener = {
      touchstart(e) {
        if (!e.touches?.length) return;
        e.preventDefault();
        _this.touching = true;

        if (e.touches.length === 1) {
          const t = e.touches[0];
          _this.touchStartX = _this.getTouchXRelativePos(t);
          _this.touchStartTime = _this.currentTime;
        }

        if (e.touches.length === 2) {
          _this.pinchStartDist = _this.getTouchDistance(e.touches[0], e.touches[1]);
          _this.pinchStartZoom = _this.zoom;
        }
      },

      touchmove(e) {
        if (!e.touches?.length) return;
        e.preventDefault();

        // 单指拖动
        if (e.touches.length === 1 && _this.touching) {
          const t = e.touches[0];
          const x = _this.getTouchXRelativePos(t);
          const diffX = x - _this.touchStartX;

          const onePxsMS = _this.canvas.width / (_this.totalRulerHours * 60 * 60 * 1000);
          _this.currentTime = _this.touchStartTime - Math.round(diffX / onePxsMS);
          _this.init();
        }

        // 双指捏合缩放
        if (e.touches.length === 2) {
          const dist = _this.getTouchDistance(e.touches[0], e.touches[1]);
          const ratio = dist / _this.pinchStartDist;

          // ratio > 1 说明放大（zoom 变小小时数变少）
          let newZoom = _this.pinchStartZoom / ratio;

          // 每次缩放按 1/4 小时阶梯对齐，和 wheel 的步长一致（4小时一档）
          newZoom = Math.round(newZoom / 4) * 4;

          if (newZoom > 24) newZoom = 24;
          if (newZoom < 1) newZoom = 1;

          if (newZoom !== _this.zoom) {
            _this.zoom = newZoom;
            _this.totalRulerHours = newZoom;
            _this.init();
          }
        }
      },

      touchend(e) {
        e.preventDefault();
        _this.touching = false;

        // 单指点击（tap）选时间
        if (e.changedTouches && e.changedTouches.length === 1) {
          const t = e.changedTouches[0];
          const x = _this.getTouchXRelativePos(t);

          const now = Date.now();
          const isTap = true; // 不做长按判定，直接当 tap
          if (isTap) {
            const time = _this.startTimestamp +
              (x / (_this.canvas.width / (_this.totalRulerHours * 60 * 60 * 1000)));
            _this.setCurrentTime(time);
          }

          _this.lastTapTime = now;
        }

        _this.changeCallback(new Date(_this.currentTime));
        _this.nextCallback(new Date(_this.currentTime));
      },
    };

    // ====== 绑定事件 ======
    // PC
    this.canvas.addEventListener("wheel", this.eventListener.wheel, { passive: false });
    this.canvas.addEventListener("mousedown", this.eventListener.mousedown);
    this.canvas.addEventListener("mousemove", this.eventListener.mousemove);
    this.canvas.addEventListener("mouseup", this.eventListener.mouseup);
    this.canvas.addEventListener("mouseleave", this.eventListener.mouseleave);

    // Mobile
    this.canvas.addEventListener("touchstart", this.touchListener.touchstart, { passive: false });
    this.canvas.addEventListener("touchmove", this.touchListener.touchmove, { passive: false });
    this.canvas.addEventListener("touchend", this.touchListener.touchend, { passive: false });

    // Resize 监听（父容器变宽也会自适应）
    this.observeResize();
  }

  // ================== 尺寸 / DPR 适配 ==================
  fitCanvasSize() {
    // canvas CSS 宽高（来自 DOM 设置）
    const rect = this.canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    // 如果你外部已经写死 width/height 属性，这里只做 DPR 放大
    // 否则按实际 rect 来设置
    const cssW = rect.width || this.canvas.width;
    const cssH = rect.height || this.canvas.height;

    this.canvas.style.width = cssW + "px";
    this.canvas.style.height = cssH + "px";

    this.canvas.width = Math.round(cssW * dpr);
    this.canvas.height = Math.round(cssH * dpr);

    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  observeResize() {
    if (typeof ResizeObserver !== "undefined") {
      this.resizeObserver = new ResizeObserver(() => {
        this.fitCanvasSize();
        this.init();
      });
      this.resizeObserver.observe(this.canvas);
    } else {
      // 退化方案
      this._onResize = () => {
        this.fitCanvasSize();
        this.init();
      };
      window.addEventListener("resize", this._onResize);
    }
  }

  // ================== 你的原逻辑 ==================
  setTotalRulerHours(hours, startTime) {
    this.totalRulerHours = hours;
    this.startTimestamp = startTime;
  }

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
    this.ctx.fillStyle = "#111928";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  fillTimeParts(part) {
    let onePxsMS = this.canvas.width / (this.totalRulerHours * 60 * 60 * 1000);
    let beginX = (part.start - this.startTimestamp) * onePxsMS;
    let partWidth = (part.end - part.start) * onePxsMS;
    this.ctx.fillStyle = (part.style && part.style.background)
      ? part.style.background
      : "rgba(109, 153, 254, 0.6)";
    this.ctx.fillRect(beginX, 0, partWidth, 15);
  }

  drawScale() {
    let oneMinutePx = this.canvas.width / (this.totalRulerHours * 60);
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

    let totalScales = this.canvas.width / scaleSpacing;
    let startTimestamp = this.currentTime - (this.totalRulerHours * 60 * 60 * 1000) / 2;
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
      const graduationLeft = leftOffsetPx + i * scaleSpacing;
      const graduationTime = startTimestamp + leftOffsetMs + i * oneScalesMS;
      const date = new Date(graduationTime);

      if ((graduationTime / (60 * 1000)) % mediumStep == 0) {
        drawScaleLine(graduationLeft, 20);
        const scaleText = this.createScaleText(date);
        this.ctx.fillText(scaleText, graduationLeft - 15, 35);
      } else {
        drawScaleLine(graduationLeft, 0);
      }
    }
    this.ctx.stroke();
  }

  drawCursor() {
    this.ctx.beginPath();
    this.ctx.moveTo(this.canvas.width / 2, 0);
    this.ctx.lineTo(this.canvas.width / 2, 40);
    this.ctx.strokeStyle = "#1C64F2";
    this.ctx.lineWidth = 2;
    this.ctx.stroke();

    this.ctx.fillStyle = "#ffffff";
    this.ctx.fillText(
      new Date(this.currentTime).format("yyyy-MM-dd hh:mm:ss"),
      this.canvas.width / 2 - 60,
      this.canvas.height - 15
    );

    this.startTimestamp = this.currentTime - (this.totalRulerHours * 60 * 60 * 1000) / 2;
  }

  refreshStartTimestamp() {
    this.startTimestamp = this.currentTime - (this.totalRulerHours * 60 * 60 * 1000) / 2;
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

  createScaleText(time) {
    if (time.getHours() === 0 && time.getMinutes() === 0 && time.getMilliseconds() === 0) {
      return time.format("yyyy-MM-dd");
    }
    return time.format("hh:mm");
  }

  dragMove(event) {
    let posX = this.getMouseXRelativePos(event);
    let diffX = posX - this.mousedownX;
    let onePxsMS = this.canvas.width / (this.totalRulerHours * 60 * 60 * 1000);

    this.currentTime = this.currentTime - Math.round(diffX / onePxsMS);
    this.init();
    this.mousedownX = posX;
  }

  hoverMove(event) {
    // 移动端不展示 hover 线
    if (this.isTouchDevice) return;

    let posX = this.getMouseXRelativePos(event);
    let time = this.getMousePosTime(event);
    this.init();

    this.ctx.beginPath();
    this.ctx.moveTo(posX + 1, 0);
    this.ctx.lineTo(posX + 1, this.canvas.height);
    this.ctx.strokeStyle = "rgb(194, 202, 215)";
    this.ctx.lineWidth = 1;
    this.ctx.stroke();

    this.ctx.fillStyle = "rgb(194, 202, 215)";
    this.ctx.fillText(
      time.format("yyyy-MM-dd hh:mm:ss"),
      posX - 50,
      this.canvas.height - 10
    );
  }

  getMousePosTime(event) {
    let posX = this.getMouseXRelativePos(event);
    let onePxsMS = this.canvas.width / (this.totalRulerHours * 60 * 60 * 1000);
    return new Date(this.startTimestamp + posX / onePxsMS);
  }

  clickEvent(event) {
    let time = this.getMousePosTime(event).getTime();
    this.setCurrentTime(time);
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

  getMouseXRelativePos(event) {
    let scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
    let x = event.pageX || event.clientX + scrollX;
    let baseLeft = this.canvas.getBoundingClientRect().x;
    return x - baseLeft;
  }

  // ================== Touch 辅助 ==================
  getTouchXRelativePos(touch) {
    let scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
    let x = touch.pageX || touch.clientX + scrollX;
    let baseLeft = this.canvas.getBoundingClientRect().x;
    return x - baseLeft;
  }

  getTouchDistance(t1, t2) {
    const dx = t1.pageX - t2.pageX;
    const dy = t1.pageY - t2.pageY;
    return Math.sqrt(dx * dx + dy * dy);
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
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

  destroy() {
    // pc
    this.canvas.removeEventListener("wheel", this.eventListener.wheel);
    this.canvas.removeEventListener("mousedown", this.eventListener.mousedown);
    this.canvas.removeEventListener("mousemove", this.eventListener.mousemove);
    this.canvas.removeEventListener("mouseup", this.eventListener.mouseup);
    this.canvas.removeEventListener("mouseleave", this.eventListener.mouseleave);

    // touch
    this.canvas.removeEventListener("touchstart", this.touchListener.touchstart);
    this.canvas.removeEventListener("touchmove", this.touchListener.touchmove);
    this.canvas.removeEventListener("touchend", this.touchListener.touchend);

    // resize
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
      this.resizeObserver = null;
    }
    if (this._onResize) window.removeEventListener("resize", this._onResize);

    this.clearCanvas();
    if (this.moveTimer) {
      clearInterval(this.moveTimer);
      this.moveTimer = null;
    }
  }
}
