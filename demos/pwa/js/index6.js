(function() {
  var lis = document.querySelectorAll('li');
  Array.prototype.forEach.call(lis, function(li) {
    li.onclick = function(e) {
      console.log(e.target.innerText, 3);
    };
  });
})();