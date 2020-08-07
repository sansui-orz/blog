var divs = document.querySelectorAll('.bottom div');
var content = document.querySelector('.content');
Array.prototype.forEach.call(divs, function(_, index) {
  content.class = 'content color-' + (index + 1);
});