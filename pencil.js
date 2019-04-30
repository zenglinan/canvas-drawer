let view = document.getElementById('pencil');
let controller = {
  view: null,
  context: null,
  init(view){
    this.view = view
    this.useTool = "pencil"  // 使用的工具
  }
}
controller.init(view);
pencil.addEventListener('click', () => {
  this.useTool = "pencil";
  eraser.classList.remove('currentTool');
  pencil.classList.add('currentTool');
}, false);
pencil.addEventListener('touchend', () => {
  this.useTool = "pencil";
  eraser.classList.remove('currentTool');
  pencil.classList.add('currentTool');
}, false);
// 调整画笔粗细
sizeDiv.addEventListener('click', function () {
  size < 5 ? (size++) : (size = 1);
  sizeDiv.getElementsByTagName('span')[0].innerText = size;
}, false);
// 调整画笔颜色,小圆点颜色跟着变化
colorPick.addEventListener('click', (e) => {
  e = window.e || e;
  let target = e.target || e.srcElement;
  if (target.tagName === 'LI') {
    this.color = target.id;
    dot.style.backgroundColor = `${color}`;
  }
}, false)
colorSelector.addEventListener('change', () => {
  this.color = colorSelector.value;
  dot.style.backgroundColor = `${color}`;
})