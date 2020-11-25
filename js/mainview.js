var together = new Date(2020, 9 - 1, 07);       // start from 0
var dateCalcH = 30;
var dateCalcW = 900;
var currentPage = 0;
var drawnTree = false;
var cur = 0;
var totalBackgroundImage = 9;


$(document).ready(function() {
    var winW = window.innerWidth;
    var winH = window.innerHeight;

    // set time calculator
    $('#date-calc').html(GetDateDiffString());
    $('#date-calc').css({
        'height': dateCalcH,
        'width' : dateCalcW,
        'top' : parseInt((winH - dateCalcH) / 4 * 3),
        'left': parseInt((winW - dateCalcW) / 2)
    });
    

    // set clock
    var w = $('.clock').innerWidth();
    var h = $('.clock').innerHeight();
    $('.clock').css({
        'top' : parseInt((winH - h) / 3),
        'left': parseInt((winW - w) / 2)
    });

    // set scroll event
    var wheelScrolling = function(event) {
        var delta = 0;
        // if (!event)
        //     event = window.event;
        if (event.wheelDelta) {
            delta = event.wheelDelta / 120;
        }
        else if (event.detail) {
            delta = -event.detail / 3;
        }
        if (delta) {
            ChangePage();
        }
        if (event.preventDefault) {
            event.preventDefault();
        }
        event.returnValue = false;
    };


    // set stars
    var obj = document.getElementById('gal');
    for (var i = 0; i < 100; i++) {
        var childObj = document.createElement('div');
        childObj.className = "star";
        obj.appendChild(childObj);
    }

    if (window.addEventListener) {
        window.addEventListener("DOMMouseScroll", wheelScrolling, { passive: false });
    }
    window.onmousewheel = wheelScrolling;

    // set clock
    timer();

    // set background switch
    bgtimer();
});

function ChangePage() {
    currentPage = 1 - currentPage;
    if (currentPage == 0) {
        SetChildrenProperty("#main-view", "display", "block");
        SetChildrenProperty("#next-view", "display", "none");
        $('.clock').css("display", "flex");
        $('#main-view-flag').css({
            "checked": true,
            //"display": none
        });
        $('#next-view-flag').css("checked", false);
    }
    else {
        SetChildrenProperty("#main-view", "display", "none");
        SetChildrenProperty("#next-view", "display", "block");
        if (!drawnTree) {
            drawnTree = true;
            DrawTree();
        }
        $('#next-view').css("display", "flex");
        $('#main-view-flag').css("checked", false);
        $('#next-view-flag').css({
            "checked": true,
           // "display": none
        });
    }
}

function SetChildrenProperty(curElement, property, value) {
    $(curElement).css(property, value);
    $(curElement).children().css(property, value);        
}

function bgtimer() {
    cur = cur % totalBackgroundImage + 1;
    var imgstr = 'url(img/background' + cur.toString() + '.jpg)';
    console.log(imgstr);
    $('#background').css({
        'background-image': imgstr,
        'background-size': '100% 100%',
    });
    $('#background1').css({
        'background-image': imgstr,
        'background-size': '100% 100%',
    });
    setTimeout("bgtimer()", 6000);
}

function timer() {
    $('#date-calc').html(GetDateDiffString());
    setTimeout("timer()", 1000);
}

function GetDateDiffString() {
    var current = new Date();
    // console.log(together.toDateString());
    // console.log(current.toDateString());
    var interval = parseInt(parseInt(current - together) / 1000);
    var seconds = parseInt(interval % 60);
    var minutes = parseInt((interval / 60) % 60);
    var hours = parseInt((interval / 60 / 60) % 24);
    var days = parseInt(interval / 60 / 60 / 24);
    // console.log(interval, seconds, minutes, hours, days);
    return (  days.toString() + " days "
            + hours.toString() + " hours "
            + minutes.toString() + " minutes "
            + seconds.toString() + " sceconds since");
}

function DrawTree() {
    $('#love-tree').css('display', 'block');
    var can = $('#love-tree');
    var width = can.width(), height = can.height();
    can.attr('width', width);
    can.attr('height', height);

    var opts = {
        seed: {
            x: width / 2 - 20,
            color: 'rgb(190, 26, 37)',
            scale: 2
        },
        branch:[
            [535, 680, 570, 250, 500, 200, 30, 100, [
                [540, 500, 455, 417, 340, 400, 13, 100, [
                    [450, 435, 434, 430, 394, 395, 2, 40]
                ]],
                [550, 445, 600, 356, 680, 345, 12, 100, [
                    [578, 400, 648, 409, 661, 426, 3, 80]
                ]],
                [539, 281, 537, 248, 534, 217, 3, 40],
                [546, 397, 413, 247, 328, 244, 9, 80, [
                    [427, 286, 383, 253, 371, 205, 2, 40],
                    [498, 345, 435, 315, 395, 330, 4, 60]
                ]],
                [546, 357, 608, 252, 678, 221, 6, 100, [
                    [590, 293, 646, 277, 648, 271, 2, 80]
                ]]
            ]]
        ],
        bloom: {
            num: 700,
            width: 1080,
            height: 650,
        },
        footer: {
            width: 1200,
            height: 5,
            speed: 10,
        }
    }

    var tree = new Tree(can[0], width, height, opts);
    var seed = tree.seed;

    var seedAnimate = eval(Jscex.compile("async", function () {
        seed.draw();
        while (0) {
            $await(Jscex.Async.sleep(10));
        }
        while (seed.canScale()) {
            seed.scale(0.95);
            $await(Jscex.Async.sleep(10));
        }
        while (seed.canMove()) {
            seed.move(0, 2);
            $await(Jscex.Async.sleep(10));
        }
    }));


    var growAnimate = eval(Jscex.compile("async", function () {
        do {
            tree.grow();
            $await(Jscex.Async.sleep(10));
        } while (tree.canGrow());
    }));

    var flowAnimate = eval(Jscex.compile("async", function () {
        do {
            tree.flower(2);
            $await(Jscex.Async.sleep(10));
        } while (tree.canFlower());
    }));

    var moveAnimate = eval(Jscex.compile("async", function () {
        tree.snapshot("p1", 240, 0, 610, 680);
        while (tree.move("p1", 500, 0)) {
            $await(Jscex.Async.sleep(10));
        }
        // footer.draw();
        tree.snapshot("p2", 500, 0, 610, 680);

        can.parent().css("background", "url(" + tree.toDataURL('image/png') + ")");
        $await(Jscex.Async.sleep(300));
    }));

    var jumpAnimate = eval(Jscex.compile("async", function () {
        var ctx = tree.ctx;
        while (true) {
            tree.ctx.clearRect(0, 0, width, height);
            tree.jump();
            $await(Jscex.Async.sleep(25));
        }
    }));
    var runAsync = eval(Jscex.compile("async", function () {
        $await(growAnimate());
        $await(flowAnimate());
        $await(moveAnimate());
        $await(jumpAnimate());
    }));

    runAsync().start();
}