var map = document.getElementById('map'),
    btns = document.querySelectorAll('button'),
    span = document.querySelector('span'),
    score = 0,
    bodyNodes = [],
    Nodes = [];


function createDiv(color) {
    var div = document.createElement("div");
    div.style.width = "50px";
    div.style.height = "50px";
    div.style.position = "absolute";
    div.style.left = parseInt(Math.random() * 10) * 50 + 'px';
    div.style.top = parseInt(Math.random() * 10) * 50 + 'px';
    div.style.background = color;
    map.appendChild(div);
    return div;
}
var tou = createDiv('red'); //蛇头
Nodes.push(tou);
tou.deriction = '左';
var food = createDiv('blue') //食物

function move() {
    if (bodyNodes.length > 0) {
        for (let n = bodyNodes.length - 1; n >= 0; n--) {
            switch (bodyNodes[n].deriction) {
                case '左':
                    bodyNodes[n].style.left = parseInt(bodyNodes[n].style.left) - 50 + 'px';
                    break;
                case '右':
                    bodyNodes[n].style.left = parseInt(bodyNodes[n].style.left) + 50 + 'px';

                    break;
                case '上':
                    bodyNodes[n].style.top = parseInt(bodyNodes[n].style.top) - 50 + 'px';

                    break;
                case '下':
                    bodyNodes[n].style.top = parseInt(bodyNodes[n].style.top) + 50 + 'px';

                    break;
            }
            if (n == 0) {
                bodyNodes[n].deriction = tou.deriction;

            } else {
                bodyNodes[n].deriction = bodyNodes[n - 1].deriction;

            }
        }
    }
    //头移动
    switch (tou.deriction) {
        case '左':
            tou.style.left = parseInt(tou.style.left) - 50 + 'px';
            break;
        case '右':
            tou.style.left = parseInt(tou.style.left) + 50 + 'px';

            break;
        case '上':
            tou.style.top = parseInt(tou.style.top) - 50 + 'px';

            break;
        case '下':
            tou.style.top = parseInt(tou.style.top) + 50 + 'px';

            break;
    }
    //撞墙死
    if (parseInt(tou.style.left) < 0 || parseInt(tou.style.left) > 450 || parseInt(tou.style.top) < 0 || parseInt(tou.style.top) > 450) {
        clearInterval(t);
        var xz = confirm('最终得分：' + score + '分,重新开始');
        if (xz === true) {
            history.go(0);
        }

    }
    //吃身体死
    if (bodyNodes.length > 0) {
        for (let n = 0; n < bodyNodes.length; n++) {
            if (tou.style.left === bodyNodes[n].style.left && tou.style.top === bodyNodes[n].style.top) {
                clearInterval(t);

                var xz = confirm('最终得分：' + score + '分,重新开始');
                if (xz === true) {
                    history.go(0);
                }

            }
        }
    }
    if (tou.style.left === food.style.left && tou.style.top === food.style.top) {
        // console.log(1);
        var bodyNode = createDiv('yellow');
        var lastNode;
        if (bodyNodes.length > 0) {
            lastNode = bodyNodes[bodyNodes.length - 1];

        } else {
            lastNode = tou;
        }
        switch (lastNode.deriction) {
            case '左':
                bodyNode.style.left = parseInt(lastNode.style.left) + 50 + 'px';
                bodyNode.style.top = lastNode.style.top;

                break;
            case '右':
                bodyNode.style.left = parseInt(lastNode.style.left) - 50 + 'px';
                bodyNode.style.top = lastNode.style.top;

                break;
            case '上':
                bodyNode.style.top = parseInt(lastNode.style.top) + 50 + 'px';
                bodyNode.style.left = lastNode.style.left;

                break;
            case '下':
                bodyNode.style.top = parseInt(lastNode.style.top) - 50 + 'px';
                bodyNode.style.left = lastNode.style.left;

                break;
        }
        bodyNode.deriction = lastNode.deriction;
        bodyNodes.push(bodyNode);
        score += 10;
        span.innerHTML = score;
        //防止头和身体重合
        var x = parseInt(Math.random() * 10) * 50,
            y = parseInt(Math.random() * 10) * 50;
        for (let n = 0; n < Nodes.length; n++) {
            if (parseInt(Nodes[n].style.left) === x && parseInt(Nodes[n].style.top) === y) {
                x = parseInt(Math.random() * 10) * 50;
                y = parseInt(Math.random() * 10) * 50;
                n = -1;
            }
        }
        food.style.left = x + 'px';
        food.style.top = y + 'px';
    }
}
var t = setInterval(move, 400);

//键盘控制方向
document.onkeydown = function(e) {
    // console.log(e.keyCode);
    switch (e.keyCode) {
        case 37:
            //蛇不能回头
            if (tou.deriction != '右' || bodyNodes.leng == 0) {
                tou.deriction = '左';
                break;
            }

        case 38:
            if (
                tou.deriction != '下' || bodyNodes.leng == 0
            ) {
                tou.deriction = '上';
                break;
            }

        case 39:
            if (
                tou.deriction != '左' || bodyNodes.leng == 0
            ) {
                tou.deriction = '右';
                break;
            }

        case 40:
            if (
                tou.deriction != '上' || bodyNodes.leng == 0
            ) {
                tou.deriction = '下';
                break;
            }

    }
}