(function(_w) {
    var $ = function(classNameOrId) {
        if (classNameOrId[0] === '.') {
            return document.getElementsByClassName(classNameOrId.substr(1));
        } else {
            return document.getElementById(classNameOrId.substr(1));
        }
    };
    
    var main = $('#main');
    var startBtn = $('#start');
    var selectBtn = $('#select-btn');
    var frameNumber = $('#frame-number');
    var frameDuration = $('#frame-duration');
    selectBtn.onclick = function() {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs){

            chrome.tabs.sendMessage(tabs[0].id, {
                name: 'start-select',
                frameNumber: frameNumber.value,
                frameDuration: frameDuration.value,
            }, function(response) {
                 startBtn.innerText = response;
            });  
        })
    };
})(window);