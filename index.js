let canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
let useTool = "pencil";  // 使用的工具
let ifDraw = false;  // 是否落笔的标志
let ifClear = false;  // 是否擦除的标志
let lastPoint;  // 记录上一个点
let color = 'black'
let size = 1;

// 初始化画板
initCanvas(canvas);
// 给PC端和移动端的画笔和橡皮绑定事件
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
// 监听用户操作
listenToUser(canvas, ifDraw, ifClear, lastPoint);
// 调整画笔粗细
sizeDiv.addEventListener('click',function(){
  size < 5 ? (size ++) : (size = 1);
  sizeDiv.getElementsByTagName('span')[0].innerText = size;
},false);
// 调整画笔颜色,小圆点颜色跟着变化
colorPick.addEventListener('click', function(e){
  e = window.e || e;
  let target = e.target || e.srcElement;
  if(target.tagName === 'LI'){
    color = target.id;
    dot.style.backgroundColor = `${color}`;
  }
},false)
function initCanvas(canvas) {
  // 初始宽高为满屏
  setCanvasWidth();
  // 监听页面大小变化,保证满屏canvas
  window.onresize = function () {
    setCanvasWidth();
  }
  function setCanvasWidth() { // 设置canvas宽高为满屏
    let pageWidth = (document.documentElement.clientWidth - canvas.offsetLeft);
    let pageHeight = (document.documentElement.clientHeight - canvas.offsetTop);
    canvas.width = pageWidth;
    canvas.height = pageHeight;
  }
}
function listenToUser(canvas, ifDraw, ifClear, lastPoint) {
  if (document.documentElement.ontouchstart !== undefined) {
    // 移动端
    canvas.ontouchstart = function (e) {
      handleDown(e);
    }
    canvas.ontouchmove = function (e) { // 画线 更新位置
      handleMove(e);

    }
    canvas.ontouchend = function (e) {
      // 置零标志位
      handleEnd();
    }
  } else {
    // PC端
    canvas.onmousedown = function (e) {
      handleDown(e);
    }
    canvas.onmousemove = function (e) { // 画线 更新位置
      handleMove(e);
    }
    canvas.onmouseup = function (e) {
      handleEnd();
    }
  }

  function handleDown(e) {
    let pos = getMousePos(e);
    if (useTool === "pencil") {
      // 画点 记录位置
      ifDraw = true;
      drawCircle(canvas, context, { x: pos.x, y: pos.y });
      lastPoint = { x: pos.x, y: pos.y };
    } else if (useTool === "eraser") {
      // 擦除
      ifClear = true;
      clearCircle(canvas, context, { x: pos.x, y: pos.y });
    }
  }
  function handleMove(e) {
    let pos = getMousePos(e);
    if (ifDraw) {
      // 画线 记录位置
      drawLine(canvas, context, lastPoint, pos.x, pos.y);
      lastPoint = { x: pos.x, y: pos.y };  // 更新上一个点
    } else if (ifClear) {
      // 擦除
      clearCircle(canvas, context, { x: pos.x, y: pos.y });
    }
  }
  function handleEnd() {
    ifDraw = false;
    ifClear = false;
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
    context.fillStyle = color;
    context.beginPath();
    context.arc(pos.x, pos.y, size/2, 0, Math.PI * 2);
    context.fill();
  }
  function clearCircle(canvas, context, pos) {
    context.fillStyle = "rgb(250, 249, 222)";
    context.fillRect((pos.x-size*7.5), (pos.y-size*7.5), size*15, size*15);
  }
  function drawLine(canvas, context, lastPointObj, x, y) { // 画线
    context.strokeStyle = color;
    context.lineWidth = size;
    context.beginPath();
    context.moveTo(lastPointObj.x, lastPointObj.y);
    context.lineTo(x, y);
    context.closePath();
    context.stroke();
  }

}


