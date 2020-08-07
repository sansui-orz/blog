(function() {
  var lis = document.querySelectorAll('li');
  Array.prototype.forEach.call(lis, function(li) {
    li.onclick = function(e) {
      console.log(1, e.target.innerText);
    };
  });
})();