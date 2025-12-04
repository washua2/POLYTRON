Date.prototype.format = function (fmt) {
  let o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "h+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    S: this.getMilliseconds(), //毫秒
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

    // 可选的每个间隔代表多少分钟
    this.minutePerStep = [1, 2, 5, 10, 15, 20, 30, 60, 120, 180, 240, 360, 720, 1440];
    // 最小刻度间距
    this.minScaleSpacing = 20;
    // 整个时间轴表示的时间长度
    this.totalRulerHours = 24;
    // 允许的最小大格长度px值 如果调小 大格会变密集
    this.minLargeScaleSpacing = 80;
    // 缩放层级
    this.zoom = 24;

    this.currentTime = currentTime;
    this.timeParts = timeParts;
    this.isMove = false;
    this.moveTimer = null;
    this.changeCallback = changeCallback;
    this.nextCallback = nextCallback;

    this.init();
    this.setIsMove(isMove);

    // 鼠标是否被按下 用来确认时hover事件还是拖拽事件
    this.isMouseDownFlag = false;
    // 是否拖拽 用来确认mouseup时是点击事件还是拖拽事件
    this.isDragFlag = false;
    // 鼠标按下时鼠标x位置 在处理拖拽事件中用来比对
    this.mousedownX = 0;

    const _this = this;
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
      mouseleave(event) {
        _this.init();
        _this.isMouseDownFlag = false;
        _this.isDragFlag = false;
      },
    };

    this.canvas.addEventListener("wheel", this.eventListener.wheel);
    this.canvas.addEventListener("mousedown", this.eventListener.mousedown);
    this.canvas.addEventListener("mousemove", this.eventListener.mousemove);
    this.canvas.addEventListener("mouseup", this.eventListener.mouseup);
    this.canvas.addEventListener("mouseleave", this.eventListener.mouseleave);
  }
  setTotalRulerHours(hours, startTime) {
    this.totalRulerHours = hours;
    this.startTimestamp = startTime;
  }

  init() {
    // this.refreshStartTimestamp();
    // 清空画布
    this.clearCanvas();
     // 设置游标文字大小（当前时间）
    this.ctx.font = "14px normal";
    // 画刻度处背景
    this.fillScaleBg();
    // 画刻度
    this.drawScale();
    // 画游标
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
    // 一个像素多少毫秒
    let onePxsMS = this.canvas.width / (this.totalRulerHours * 60 * 60 * 1000);
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
    // 一分钟多少像素
    let oneMinutePx = this.canvas.width / (this.totalRulerHours * 60);
    // 一毫秒多少像素
    let oneMSPx = oneMinutePx / (60 * 1000);
    // 刻度间隔 默认20px
    let scaleSpacing = this.minScaleSpacing;
    // 每格代表多少分钟
    let scaleUnit = scaleSpacing / oneMinutePx;

    let len = this.minutePerStep.length;
    for (let i = 0; i < len; i += 1) {
      if (scaleUnit < this.minutePerStep[i]) {
        // 选择正确的刻度单位分钟
        scaleUnit = this.minutePerStep[i];
        // 每刻度之间的距离 = 一分钟多少像素 * 刻度单位
        scaleSpacing = oneMinutePx * scaleUnit;
        break;
      }
    }

    // 有刻度文字的大格相当于多少分钟 相当于直尺上的1cm
    let mediumStep = 30;
    for (let i = 0; i < len; i++) {
      if (this.minLargeScaleSpacing / oneMinutePx <= this.minutePerStep[i]) {
        mediumStep = this.minutePerStep[i];
        break;
      }
    }

    let totalScales = this.canvas.width / scaleSpacing;
    // 某个刻度距离最左端得距离
    let graduationLeft;
    // 某个刻度得时间
    let graduationTime;
    let lineHeight;
    // 开始时间 = 中间时间 - 一半得整条时间
    let startTimestamp = this.currentTime - (this.totalRulerHours * 60 * 60 * 1000) / 2;
    // 因为中间点是currentTime是固定的 最右边不一定在某个刻度上 会有一定的偏移量
    let leftOffsetMs =
      scaleUnit * 60 * 1000 - (startTimestamp % (scaleUnit * 60 * 1000));
    // 开始时间偏移距离(px)
    let leftOffsetPx = leftOffsetMs * oneMSPx;
    // 一刻度多少毫秒
    let oneScalesMS = scaleSpacing / oneMSPx;
    // 文字颜色
    this.ctx.fillStyle = "#fff";
    // 刻度线颜色
    this.ctx.strokeStyle = "rgba(151,158,167,1)";
    this.ctx.beginPath();
    // 画刻度线
    const _this = this;
    function drawScaleLine(left, height) {
      _this.ctx.moveTo(left, 0);
      _this.ctx.lineTo(left, height);
      _this.ctx.lineWidth = 1;
    }
    for (let i = 0; i < totalScales; i++) {
      // 距离 = 开始的偏移距离 + 格数 * 每格的px;
      graduationLeft = leftOffsetPx + i * scaleSpacing;
      // 时间 = 左侧开始时间 + 偏移时间 + 格数 * 一格多少毫秒
      graduationTime = startTimestamp + leftOffsetMs + i * oneScalesMS;
      let date = new Date(graduationTime);
      if ((graduationTime / (60 * 1000)) % mediumStep == 0) {
        // 大格刻度
        lineHeight = 20;
        let scaleText = this.createScaleText(date);
        this.ctx.fillText(scaleText, graduationLeft - 15, 35);
      } else {
        // 小格刻度
        lineHeight = 0;
      }
      drawScaleLine(graduationLeft, lineHeight);
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
    // 当currentTime改变或者整条时间轴代表的totalHours改变的时候 就刷新左边开始时间
    this.startTimestamp = this.currentTime - (this.totalRulerHours * 60 * 60 * 1000) / 2;
  }
  setCurrentTime(time) {
    let newTime;
    if (typeof time === "string") {
      newTime = new Date(time).getTime();
    } else if (typeof time === "object") {
      newTime = time.getTime && time.getTime();
    } else if (typeof time === "number") {
      newTime = time;
    }
    this.currentTime = newTime;
    this.init();
    // this.drawCursor();
  }
  setTimeParts(timeParts) {
    this.timeParts = timeParts;
    this.uniqueTimeParts();
    this.init();
    // this.drawCursor();
  }
  addTimeParts(timeParts) {
    this.setTimeParts(this.timeParts.concat(timeParts));
  }
  setIsMove(isMove, speed) {
    if(!speed){
      speed = 1;
    }
    if (this.isMove === isMove) return;
    this.isMove = isMove;
    const clearTimer = () => {
      if (this.moveTimer) {
        clearInterval(this.moveTimer);
        this.moveTimer = null;
      }
    };
    if (isMove) {
      if (this.moveTimer) {
        clearTimer();
      }
      this.moveTimer = setInterval(() => {
        this.currentTime += 1000;
        this.init();
      }, 1000/speed);
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
    let onePxsMS = this.canvas.width / (this.totalRulerHours * 60 * 60 * 1000);

    this.currentTime = this.currentTime - Math.round(diffX / onePxsMS);
    this.init();
    //this.drawCursor();
    this.mousedownX = posX;
  }
  hoverMove(event) {
    let posX = this.getMouseXRelativePos(event);
    let time = this.getMousePosTime(event);
    this.init();
    //this.drawCursor();
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
    // 每像素多少毫秒
    let onePxsMS = this.canvas.width / (this.totalRulerHours * 60 * 60 * 1000);
    let time = new Date(this.startTimestamp + posX / onePxsMS);
    return time;
  }
  clickEvent(event) {
    let time = this.getMousePosTime(event).getTime();
    this.setCurrentTime(time);
  }
  wheelEvent(event) {
    event.preventDefault();
    // 是放大一倍还是缩小一倍
    let delta = Math.max(-1, Math.min(1, event.wheelDelta));
    if (delta < 0) {
      this.zoom = this.zoom + 4;
      if (this.zoom >= 24) {
        //放大最大24小时
        this.zoom = 24;
      }
      this.totalRulerHours = this.zoom;
    } else if (delta > 0) {
      // 放大
      this.zoom = this.zoom - 4;
      if (this.zoom <= 1) {
        //缩小最小1小时
        this.zoom = 1;
      }
      this.totalRulerHours = this.zoom;
    }
    this.init();
    //this.drawCursor();
  }
  getMouseXRelativePos(event) {
    let scrollX =
      document.documentElement.scrollLeft || document.body.scrollLeft;
    let x = event.pageX || event.clientX + scrollX;
    // canvas元素距离窗口左侧距离
    let baseLeft = this.canvas.getBoundingClientRect().x;
    return x - baseLeft;
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
  // 时间区间去重
  uniqueTimeParts() {
    let len = this.timeParts.length;
    if (len <= 1) return;
    this.timeParts.sort((a, b) => {
      return a.start - b.start;
    });
    for (let i = 1; i < len; i++) {
      const element = this.timeParts[i];
      const preElement = this.timeParts[i - 1];
      if (
        element.start === preElement.start &&
        element.end === preElement.end
      ) {
        element.isRepeat = true;
      }
    }
    this.timeParts = this.timeParts.filter((item) => !item.isRepeat);
  }
  destroy() {
    this.canvas.removeEventListener("wheel", this.eventListener.wheel);
    this.canvas.removeEventListener("mousedown", this.eventListener.mousedown);
    this.canvas.removeEventListener("mousemove", this.eventListener.mousemove);
    this.canvas.removeEventListener("mouseup", this.eventListener.mouseup);
    this.canvas.removeEventListener(
      "mouseleave",
      this.eventListener.mouseleave
    );
    this.clearCanvas();
    if (this.moveTimer) {
      clearInterval(this.moveTimer);
      this.moveTimer = null;
    }
  }
};
