let canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
let useTool = "";  // 使用的工具
let ifDraw = false;  // 是否落笔的标志
let ifClear = false;  // 是否擦除的标志
let lastPoint;  // 记录上一个点


initCanvas(canvas);
pencil.addEventListener('click', function () {
  useTool = "pencil";
  eraser.classList.remove('currentTool');
  this.classList.add('currentTool');
}, false);
eraser.addEventListener('click', function () {
  useTool = "eraser";
  pencil.classList.remove('currentTool');
  this.classList.add('currentTool');
}, false);
pencil.addEventListener('touchend', function () {
  useTool = "pencil";
  eraser.classList.remove('currentTool');
  this.classList.add('currentTool');
}, false);
eraser.addEventListener('touchend', function () {
  useTool = "eraser";
  pencil.classList.remove('currentTool');
  this.classList.add('currentTool');
}, false);
listenToUser(canvas, ifDraw, ifClear, lastPoint);

function initCanvas(canvas) {
  // 初始宽高为满屏
  setCanvasWidth();
  // 监听页面大小变化,保证满屏canvas
  window.onresize = function () {
    setCanvasWidth();
  }
  function setCanvasWidth() { // 设置canvas宽高为满屏
    let pageWidth = document.documentElement.clientWidth;
    let pageHeight = document.documentElement.clientHeight - canvas.offsetTop;
    canvas.width = pageWidth;
    canvas.height = pageHeight;
  }
}
function listenToUser(canvas, ifDraw, ifClear, lastPoint) {
  if (document.documentElement.ontouchstart !== undefined) {
    canvas.ontouchstart = function (e) { // 画点 记录位置
      let pos = getMousePos(e);
      if (useTool === "pencil") {
        ifDraw = true;
        drawCircle(canvas, context, { x: pos.x, y: pos.y });
        lastPoint = { x: pos.x, y: pos.y };
      } else if (useTool === "eraser") {
        ifClear = true;
        clearCircle(canvas, context, { x: pos.x, y: pos.y });
      }
    }
    canvas.ontouchmove = function (e) { // 画线 更新位置
      let pos = getMousePos(e);
      if (ifDraw) {
        drawLine(canvas, context, lastPoint, pos.x, pos.y);
        lastPoint = { x: pos.x, y: pos.y };  // 更新上一个点
      } else if (ifClear) {
        clearCircle(canvas, context, { x: pos.x, y: pos.y });
      }
    }
    canvas.ontouchend = function (e) {
      ifDraw = false;
      ifClear = false;
    }
  } else {
    canvas.onmousedown = function (e) { // 画点 记录位置
      let pos = getMousePos(e);
      if (useTool === "pencil") {
        ifDraw = true;
        drawCircle(canvas, context, { x: pos.x, y: pos.y });
        lastPoint = { x: pos.x, y: pos.y };
      } else if (useTool === "eraser") {
        ifClear = true;
        clearCircle(canvas, context, { x: pos.x, y: pos.y });
      }
    }
    canvas.onmousemove = function (e) { // 画线 更新位置
      let pos = getMousePos(e);
      if (ifDraw) {
        drawLine(canvas, context, lastPoint, pos.x, pos.y);
        lastPoint = { x: pos.x, y: pos.y };  // 更新上一个点
      } else if (ifClear) {
        clearCircle(canvas, context, { x: pos.x, y: pos.y });
      }
    }
    canvas.onmouseup = function (e) {
      ifDraw = false;
      ifClear = false;
    }
  }

  function getMousePos(e) {
    if ('touches' in e) {
      return {
        x: e.touches[0].clientX - e.target.offsetLeft,
        y: e.touches[0].clientY - e.target.offsetTop
      }
    } else {
      return {
        x: e.clientX - e.target.offsetLeft,
        y: e.clientY - e.target.offsetTop
      }
    }

  }
  function drawCircle(canvas, context, pos) {  // 画圆
    context.fillStyle = "black";
    context.beginPath();
    context.arc(pos.x, pos.y, 2, 0, Math.PI * 2);
    context.fill();
  }
  function clearCircle(canvas, context, pos) {
    context.fillStyle = "rgb(250, 249, 222)";
    context.fillRect(pos.x, pos.y, 15, 15);
  }
  function drawLine(canvas, context, lastPointObj, x, y) { // 画线
    context.strokeStyle = "black";
    context.lineWidth = 4;
    context.beginPath();
    context.moveTo(lastPointObj.x, lastPointObj.y);
    context.lineTo(x, y);
    context.closePath();
    context.stroke();
  }

}


