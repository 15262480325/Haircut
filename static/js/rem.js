/**
 * Created by 陆飞 on 2017/10/13.
 */

var calculateSize = function () {
  var baseFontSize = 100, docEl = document.documentElement, clientWidth = docEl.clientWidth;
  if (!clientWidth) return;
  docEl.style.fontSize = baseFontSize * (clientWidth / 640) + 'px';
  if(baseFontSize * (clientWidth / 640) > 100) docEl.style.fontSize = 100 + 'px';
};

calculateSize();

window.onresize = function () {
  calculateSize();
}
