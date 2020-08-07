var divs = document.querySelectorAll('.bottom div');
var content = document.querySelector('.content');
Array.prototype.forEach.call(divs, function(div, index) {
  div.onclick = function() {
    content.className = 'content color-' + (index + 1);
  }
});