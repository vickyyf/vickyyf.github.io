var can = document.getElementById("myCanvas");
var cxt = can.getContext("2d");
cxt.fillStyle = 'rbga(255, 255, 255, 0)';
var w = can.width = window.innerWidth;
var h = can.height = window.innerHeight;
window.onresize = function () {
    w = can.width = window.innerWidth;
    h = can.height = window.innerHeight;
};
cxt.fillStyle = "aqua";

var drops = [];
function Drop() { }

Drop.prototype = {
    init: function () {
        this.x = random(0, w);
        this.y = 0;
        this.vy = random(4, 5);
        this.l = random(0.8 * h, 0.9 * h);
        this.r = 1;
        this.vr = 1;
        this.a = 1;
        this.va = 0.96;
    },
    draw: function () {
        if (this.y > this.l) {
            cxt.beginPath();
            cxt.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
            cxt.strokeStyle = "rgba(0,255,255," + this.a + ")";
            cxt.stroke();
        } else {
            cxt.fillStyle = "rgb(0,255,255)";
            cxt.fillRect(this.x, this.y, 2, 10);
        }

        this.update();
    },
    update: function () {
        if (this.y < this.l) {
            this.y += this.vy
        } else {
            if (this.a > 0.03) {
                this.r += this.vr;
                if (this.r > 50) {
                    this.a *= this.va;
                }
            } else {
                this.init()
            }

        }
    }
};

for (var i = 0; i < 30; i++) {
    setTimeout(function () {
        var drop = new Drop();
        drop.init();
        drops.push(drop);
    }, i * 300)

}

function move() {
    cxt.fillStyle = "rgba(0,0,0,0.1)";
    cxt.fillRect(0, 0, w, h);
    for (var k = 0; k < drops.length; k++) {
        drops[k].draw();
    }
    requestAnimationFrame(move);
}

move();
function random(min, max) {
    return Math.random() * (max - min) + min;
}