(function() {
    var SelectArea = function(callback) {
        this.wwidth = window.innerWidth;
        this.hheight = window.innerHeight;
        this.canvas = this.createCanvas();
        this.init();
        this.callback = callback;
    };

    SelectArea.prototype.init = function() {
        var canvas = this.canvas;
        var ctx = this.canvas.getContext('2d');
        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        var startx = 0;
        var starty = 0;
        var x = 0;
        var y = 0;
        this.draw(ctx);
        var drawing = false;
        var that = this;
        canvas.onmousedown = function(e) {
            drawing = true;
            startx = x = e.offsetX;
            starty = y = e.offsetY;
            that.draw(ctx, startx, starty, 10, 10);
        };
        canvas.onmousemove = function(e) {
            if (drawing) {
                x = e.offsetX;
                y = e.offsetY;
                that.draw(ctx, startx > x ? x : startx, starty > y ? y : starty, Math.abs(x - startx), Math.abs(y - starty));
            }
        };
        canvas.onmouseout = canvas.onmouseleave = canvas.onmouseup = function() {
            if (drawing && (Math.abs(x - startx) < 50 || Math.abs(y - starty) < 50)) {
                alert('宽高不能小于50px, 请重新选择!');
                that.draw(ctx);
            } else if (drawing) {
                that.createBtns(Math.max(x, startx), Math.max(y, starty), { x: startx, y: starty, x2: x, y2: y });
            }
            startx = 0;
            starty = 0;
            x = 0;
            y = 0;
            drawing = false;
        };
    };

    SelectArea.prototype.draw = function(ctx, x, y, w, h) {
        ctx.clearRect(0, 0, this.wwidth, this.hheight);
        ctx.fillRect(0, 0, this.wwidth, this.hheight);
        if (w) {
            ctx.clearRect(x, y, w, h);
        };
    };

    SelectArea.prototype.createCanvas = function() {
        var canvas = document.createElement('canvas');
        canvas.id = Math.random() + '';
        canvas.width = this.wwidth;
        canvas.height = this.hheight;
        canvas.style.position = 'fixed';
        canvas.style.top = 0;
        canvas.style.left  = 0;
        canvas.style.zIndex = 99999;
        canvas.style.background = 'transparent';
        document.body.appendChild(canvas);
        return canvas;
    };

    SelectArea.prototype.createBtns = function(x, y, points) {
        var that = this;
        x = x < 220 ? 220 : x;
        function createBtn() {
            var btn = document.createElement('button');
            btn.style.width = '100px';
            btn.style.position = 'fixed';
            btn.style.zIndex = 100000;
            btn.style.top = y + 'px';
            return btn;
        }
        var cancelBtn = createBtn();
        cancelBtn.style.left = x - 220 + 'px';
        cancelBtn.innerHTML = 'cancel';
        cancelBtn.onclick = function() {
            that.clear();
        };
        var confirmBtn = createBtn();
        confirmBtn.style.left = x - 120 + 'px';
        confirmBtn.innerHTML = 'confirm';
        confirmBtn.onclick = function() {
            that.clear();
            // that.start(points.x, points.y, points.x2, points.y2);
            that.callback(points.x, points.y, points.x2, points.y2);
        };
        this.cancelBtn = cancelBtn;
        this.confirmBtn = confirmBtn;
        document.body.appendChild(cancelBtn);
        document.body.appendChild(confirmBtn);
    };

    SelectArea.prototype.clear = function() {
        this.cancelBtn && document.body.removeChild(this.cancelBtn);
        this.confirmBtn && document.body.removeChild(this.confirmBtn);
        this.canvas && document.body.removeChild(this.canvas);
        this.cancelBtn = null;
        this.confirmBtn = null;
        this.canvas = null;
    };

    var CreateGIF = function(frameNumber, frameDuration, callback) {
        var Animated_GIF = window.Animated_GIF.default;
        var that = this;
        this.ag = new Animated_GIF();
        this.frameNumber = frameNumber;
        this.frameDuration = frameDuration;
        this.callback = callback;
        document.body.addEventListener('mousemove', function(e) {
            that.mx = e.pageX;
            that.my = e.pageY;
        });
    };

    CreateGIF.prototype.init = function() {

    };

    CreateGIF.prototype.start = function(x, y, x2, y2) {
        var ag = this.ag;
        var that = this;
        var count = 0;
        this.drawBorder(x, y, x2, y2);
        ag.setSize(Math.abs(x - x2), Math.abs(y - y2));
        ag.setDelay(this.frameDuration * this.frameNumber);
        var promises = [];
        var intervalKey = setInterval(function() {
            count++;
            promises.push(that.getFragment(x, y, x2, y2).then(function(img) {
                ag.addFrame(img);
            }));
            if (count >= that.frameNumber) {
                clearInterval(intervalKey);
                Promise.all(promises).then(function() {
                    ag.getBase64GIF(function(image) {
                        that.callback(image);
                    });
                });
            }
        }, this.frameDuration * 1000);
    };

    CreateGIF.prototype.drawBorder = function(x, y, x2, y2) {
        var col = document.createElement('div');
        col.style.position = 'fixed';
        col.style.left = Math.min(x, x2) + 'px';
        col.style.top = Math.min(y, y2) + 'px';
        col.style.width = '1px';
        col.style.height = Math.abs(y - y2) + 'px';
        col.style.background = 'red';
        col.style.boxShadow = Math.abs(x - x2) + 'px 0px #000';
        col.style.zIndex = 9999;
        var row = document.createElement('div');
        row.style.position = 'fixed';
        row.style.left = Math.min(x, x2) + 'px';
        row.style.top = Math.min(y, y2) + 'px';
        row.style.width = Math.abs(x - x2) + 'px';
        row.style.height = '1px';
        row.style.background = 'red';
        row.style.boxShadow = '0px ' + Math.abs(y - y2) + 'px #000';
        row.style.zIndex = 9999;
        document.body.appendChild(col);
        document.body.appendChild(row);
    }

    CreateGIF.prototype.getFragment = function(x, y, x2, y2) {
        var that = this;
        var _mx = this.mx;
        var _my = this.my;
        var bodyLeft = document.body.scrollLeft;
        var bodyTop = document.body.scrollTop;
        return html2canvas(document.body).then(function(canvas) {
            var ctx = canvas.getContext('2d');
            that.drawShubiao(ctx, _mx, _my);
            var img = document.createElement('img');
            img.className = 'img';
            img.src = that.cutImage(canvas, bodyLeft + x, bodyTop + y, Math.abs(x - x2), Math.abs(y - y2));
            return img;
        });
    };

    CreateGIF.prototype.cutImage = function(canvas, x, y, w, h) {
        var canvas2 = document.createElement('canvas');
        var ctx2 = canvas2.getContext('2d');
        canvas2.style.position = 'fixed';
        canvas2.style.left = '-200vw';
        canvas2.style.top = '0px';
        canvas2.width = w;
        canvas2.height = h;
        document.body.appendChild(canvas2);
        var _ctx = canvas.getContext('2d');
        var imgAreaData = _ctx.getImageData(x, y, w, h);
        ctx2.putImageData(imgAreaData, 0, 0);
        var result = canvas2.toDataURL("image/jpeg");
        document.body.removeChild(canvas2);
        return result;
    };

    CreateGIF.prototype.drawShubiao = function(ctx, _mx, _my) {
        ctx.strokeStyle = '#000000';
        ctx.beginPath();
        ctx.moveTo(_mx, _my);
        ctx.lineTo(_mx, _my + 10);
        ctx.lineTo(_mx + 4, _my + 6);
        ctx.lineTo(_mx + 6, _my + 13);
        ctx.lineTo(_mx + 8, _my + 12);
        ctx.lineTo(_mx + 6, _my + 5);
        ctx.lineTo(_mx + 11, _my + 5);
        ctx.closePath();
        ctx.fillStyle = '#ffffff';
        ctx.fill();
        // ctx.lineTo(_mx, _my);
        ctx.stroke();
    };

    chrome.extension.onMessage.addListener(function (message, sender, sendResponse) {
        if (message.name === 'start-select') {
            var createGIF = new CreateGIF(
                message.frameNumber,
                message.frameDuration,
                function(imgData) {
                    // sendResponse(data);
                    var img = document.createElement('img');
                    img.src = imgData;
                    img.style.position = 'fixed';
                    img.style.left = '100px';
                    img.style.top = '100px';
                    document.body.appendChild(img);
                });
            var selectArea = new SelectArea(function(x, y, x2, y2) {
                createGIF.start(x, y, x2, y2);
            });
            document.title = '!';
        } else {
            document.title = '?';
        }
        
    });
})();