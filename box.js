//鼠标滑动各个方向反转盒子特效
var MouseBox = function (dom) {
    "use strict";

    this.dom = document.querySelectorAll(dom);
    for (var i = 0; i < this.dom.length; i++) {
        for (var j = 0; j < this.dom[i].children.length; j++) {
            var dom = this.dom[i].children;
            dom[j].onmouseenter = function (e) {
                var e = window.event || e;
                var _this = e.target; //获取到的是当前li 并不是span 因为nomouseenter方法不支持冒泡
                var ew = _this.clientWidth,
                    eh = _this.clientHeight,
                    box1 = _this.firstElementChild,
                    box2 = _this.lastElementChild;
                var dirtype = getDirection(e, _this);
                box2.style.display = "block";
                box1.style.transform = "translateZ(" + ew / 2 + "px)"
                if (dirtype == "left") {
                    box2.style.transform = "rotateY(-90deg) translateZ(" + ew / 2 + "px)"
                    _this.style.transform = "rotateY(90deg)"
                } else if (dirtype == "right") {
                    box2.style.transform = "rotateY(90deg) translateZ(" + ew / 2 + "px)"
                    _this.style.transform = "rotateY(-90deg)"
                } else if (dirtype == "top") {
                    box2.style.transform = "rotateX(90deg) translateZ(" + eh / 2 + "px)"
                    box1.style.transform = "translateZ(" + eh / 2 + "px)"
                    _this.style.transform = "rotateX(-90deg)"//从上往下翻转
                } else if (dirtype == "bottom") {
                    box2.style.transform = "rotateX(-90deg) translateZ(" + eh / 2 + "px)"
                    box1.style.transform = "translateZ(" + eh / 2 + "px)"
                    _this.style.transform = "rotateX(90deg)"
                }
            }

            dom[j].onmouseleave = function (e) {
                var _this = e.target;
                _this.style.transform = "rotateX(0deg)"
            }

        }
    }
    /* this.eat = function () {return function () {console.log(_this.name() + "在吃饭1");return _this } }; */
}



//推荐使用的判断鼠标移入移除方法
function getMouseDir (ev, dom) {
    var w = dom.clientWidth;
    var h = dom.clientHeight;
    var x = (ev.clientX - dom.offsetLeft - (w / 2)) * (w > h ? (h / w) : 1);
    var y = (ev.clientY - dom.offsetTop - (h / 2)) * (h > w ? (w / h) : 1);
    var direction = Math.round((((Math.atan2(y, x) * (180 / Math.PI)) + 180) / 90) + 3) % 4;
    var eventType = ev.type;
    var dirName = new Array('上方', '右侧', '下方', '左侧');
    console.log(eventType + ":" + direction + ":" + w + ":" + h + ":" + x + ":" + y + ":" + dom.offsetLeft + ":" + dom.offsetTop);
    if (eventType == 'mouseover') {
        // console.log(dirName[direction] + '进入');
    } else {
        // console.log(dirName[direction] + '离开');
    }
}


//获取鼠标方向
function getDirection (ev, dom) {
    var mx = ev.clientX,
        my = ev.clientY;
    var el = dom.offsetLeft,
        et = dom.offsetTop,
        ew = dom.clientWidth,
        eh = dom.clientHeight;

    var left = mx - el,
        right = el + ew - mx,
        top = my - et,
        bottom = et + eh - my;
    var min = Math.min.apply(Math, [left, right, top, bottom]);
    // console.log(mx + ":" + my + ":" + el + ":" + et + ":" + ew + ":" + eh)
    if (min === left) {
        return "left";
    } else if (min === right) {
        return "right";
    } else if (min === top) {
        return "top"
    } else {
        return "bottom";
    }

}

//根据鼠标移入方向图片左右旋转特效
var MouseRL = function (dom) {
    this.dom = document.querySelectorAll(dom);

    for (var i = 0; i < this.dom.length; i++) {
        this.dom[i].onmouseenter = function (e) {
            var e = window.event || e,
                _this = e.target,
                dirs = getDireLR(e, _this);
            if (dirs == "left") {
                _this.style.transform = "rotate(360deg)";
            } else {
                _this.style.transform = "rotate(-360deg)";
            }
        }
        this.dom[i].onmouseleave = function (e) {
            var e = window.event || e,
                _this = e.target;
            _this.style.transform = "rotate(0deg)";
        }

    }
}

//获取鼠标移入左右方向
function getDireLR (ev, dom) {
    var w = dom.clientWidth,
        l = dom.offsetLeft;
    var ex = 0;
    if (ex == 0) {
        ex = ev.clientX;
    }
    var dis = ((ex - l) - (w / 2) > 0) ? "right" : "left";
    return dis;

}


//获取class中的样式属性值
function getAttr (dom, value) {
    if (getComputedStyle(dom, null)) {//非ie
        return getComputedStyle(dom, null)[value]
    } else {//ie8及以下
        return dom.currentStyle[value]
    }
}

//文字无缝滚动效果--》参数：滚动的span元素
var MsgMove = function (dom) {
    this.dom = document.querySelectorAll(dom);
    for (var i = 0; i < this.dom.length; i++) {
        var _this = this.dom[i];
        var w = _this.parentNode.clientWidth /* - (_this.clientWidth) */;

        setInterval(function () {
            _this.style.transform = "translateX(" + w + "px)";
            _this.style.transition = "all 5s linear .5s";

            _this.addEventListener("transitionend", function (e) {
                _this.style.transition = "";
                _this.style.transform = "translateX(-100%)";
            })

        }, 300)


    }
}


//轮播图特效--》参数 ：大的轮播className
var Lunbo = function (dom, left, right) {
    this.dom = document.querySelectorAll(dom);

    for (var i = 0; i < this.dom.length; i++) {
        var _this = this.dom[i];
        var left = _this.querySelector(left),
            right = _this.querySelector(right);
        var boxs = _this.children,
            box1 = boxs[0],
            box2 = boxs[1],
            box1_ul = box1.getElementsByTagName("ul")[0],
            box1_lis = box1_ul.getElementsByTagName("li"),
            box2_ul = box2.getElementsByTagName("ul")[0],
            box2_lis = box2_ul.getElementsByTagName("li");
        var size = box1_lis.length;
        var index = 0,
            o = 0;
        var bw = box1.clientWidth;
        box2_lis[index].style.background = "red";
        var timer = setInterval(function () {
            o = 1 + index;
            myclick(-bw, o)
        }, 5000)
        _this.onmousemove = function () {
            clearInterval(timer);
        }
        _this.onmouseout = function () {
            timer = setInterval(function () {
                o = 1 + index;
                myclick(-bw, o)
            }, 5000)
        }
        /*box1_ul.onmouseout = function () {
            timer = setInterval(function () {
                o = 1 + index;
                myclick(-bw, o)
            }, 1000)
        } */
        box2_ul.onclick = function (e) {
            console.log(e.target.getAttribute("index"))
            o = index = e.target.getAttribute("index");

            myclick(-bw, o)
        }

        left.onclick = function () {
            o = 1 + index;
            myclick(bw, o)

        }
        right.onclick = function () {
            o = 1 + index;
            myclick(-bw, o)

        }
        var myclick = function (bw, o) {
            box1_ul.style.transition = "all .5s linear .5s";
            box1_lis[o].style.transform = "translateX(" + -bw + "px)";
            box1_lis[o].style.display = "block";
            box1_ul.style.transform = "translateX(" + bw + "px)";
        }
        //监听，过渡事件的开始，进行，结束事件，分别为transitionstart、transitionrun、transitionend
        box1_ul.addEventListener("transitionend", function (e) {
            box1_ul.style.transform = null
            box1_ul.style.transition = "all 0s";
            box1_ul.style.transform = "translateX(0px)"
            for (var t = 0; t < box1_lis.length; t++) {
                box1_lis[t].style = null;
                box1_lis[t].style.display = "none";
                box2_lis[t].style.background = ""
            }
            box1_lis[o].style.display = "block";
            box2_lis[o].style.background = "red";
            index++;
            if (index >= size - 1) {
                index = -1;
            }

        });
    }
}

//获取class中的样式属性值
function getAttr (dom, value) {
    if (getComputedStyle(dom, null)) {//非ie
        return getComputedStyle(dom, null)[value]
    } else {//ie8及以下
        return dom.currentStyle[value]
    }
}


//侧边栏导航效果
var SideBarMenu = function (dom, sm) {//.sidebar-menu .sm

    this.dom = document.querySelectorAll(dom);
    for (var i = 0; i < this.dom.length; i++) {
        var sm = this.dom[i].querySelectorAll(sm);

        this.dom[i].onclick = function (e) {

            var _this = e.target.nextElementSibling;
            if (_this) {
                if (_this.style.display == "block") {
                    _this.style.display = "none"
                } else {
                    for (var j = 0; j < sm.length; j++) {
                        sm[j].style.display = "none"
                    }
                    _this.style.display = "block"
                }
            }

        }
    }
}

//广告自动显示，关闭广告
var adv = function (adv, close) {
    this.adv = document.querySelector(adv);
    this.close = document.querySelector(close);
    var _this = this;
    setTimeout(() => {
        this.adv.style.display = "block"
    }, 10000);
    this.close.onclick = function () {
        _this.adv.style.display = "none"
    }
}


//大轮播图
var SlideImg = function (dom, img, slide_nav1, dirL, dirR, title1, content1) {
    var slide = document.querySelector(dom),
        img = document.querySelector(img),
        slide_nav1 = document.querySelector(slide_nav1),
        lis = slide_nav1.getElementsByTagName("li"),
        dirL = document.querySelector(dirL),
        dirR = document.querySelector(dirR),
        title1s = document.querySelectorAll(title1),
        content1s = document.querySelectorAll(content1),
        index = 0;

    var fun1 = function () {
        for (var i = 0; i < img.children.length; i++) {
            img.children[i].style.display = "none";
            lis[i].style.backgroundColor = "rgba(230, 24, 55, 0.658)";

        }
        img.children[index].style.display = "block";
        lis[index].style.backgroundColor = "rgba(24, 230, 93, 0.438)";
        setTimeout(function () {
            if (index == 0) {
                title1s[0].style.transition = "all 2s";
                title1s[0].style.transform = "translateX(50px) skewX(-45deg)";
                content1s[0].style.transition = "all 2s";
                content1s[0].style.transform = "translateX(50px) translateY(160px)";
                title1s[0].addEventListener("transitionend", function (e) {
                    title1s[0].style.transform = "translateX(50px) rotate(0deg) skewX(0deg)";
                });
            } else {
                title1s[0].style = "";
                content1s[0].style = "";
            }
        }, 300)


    }
    fun1();
    var timer = setInterval(() => {

        index++;
        if (index > img.children.length - 1) {
            index = 0
        }
        fun1();
    }, 3000);
    slide.onmouseleave = function () {
        timer = setInterval(() => {

            index++;
            if (index > img.children.length - 1) {
                index = 0
            }
            fun1();
        }, 3000);
    }
    slide.onmouseenter = function () {
        clearInterval(timer)
    }
    for (var i = 0; i < lis.length; i++) {
        lis[i].index = i;
        lis[i].onclick = function (e) {
            index = this.index;
            fun1();
        }
    }
    dirL.onclick = function () {
        index--;
        if (index < 0) {
            index = img.children.length - 1
        }
        fun1();
    }
    dirR.onclick = function () {
        index++;
        if (index > img.children.length - 1) {
            index = 0
        }
        fun1();
    }

}

//tab切换效果
var TabObject = function (tab_bar_title, tab_bar_content) {
    var tab_bar_title = document.querySelector(tab_bar_title),
        tab_bar_content = document.querySelector(tab_bar_content),
        tab_bar_content_childs = tab_bar_content.children,
        index = 0;
    function showchild (index) {
        for (var i = 0; i < tab_bar_content_childs.length; i++) {
            tab_bar_content_childs[i].style.display = "none";
        }
        tab_bar_content_childs[index].style.display = "block";
    }
    showchild(index)

    tab_bar_title.onclick = function (e) {
        var dom = e.target;
        index = dom.getAttribute("index");
        showchild(index)
    }
}