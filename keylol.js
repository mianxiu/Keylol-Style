// ==UserScript==
// @name         keylol css
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  a style for keylol.com
// @author       mianxiu
// @match        keylol.com/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    // 配合tampermonkey设置加载前移除css
    var clearCss = function () {
        document.querySelectorAll(`link[rel=stylesheet]`).forEach(e => {
            console.log(e)
            e.remove()

        })

    }

    var targetNode = document.documentElement
    var observerOptions = {
        childList: true,
        subtree: true
    }
    var observer = new MutationObserver(clearCss);
    observer.observe(targetNode, observerOptions);



    // 移动节点
    var moveElement = function () {

        // 用户栏&LOGO
        let navMenuUl = document.querySelector('#nav-menu>ul ')
        navMenuUl.parentNode.insertBefore(document.querySelector('.tb-container'), null)
        navMenuUl.insertBefore(document.querySelector('#nav-logo'), navMenuUl.childNodes[0])

    }

    window.onload = moveElement


    var css = `
body{
background:green;
}

`
    // 添加css
    var node = document.createElement("style");
    node.type = "text/css";
    node.appendChild(document.createTextNode(css));
    var html = document.querySelector("html");
    document.documentElement.appendChild(node);



    // Your code here...
    // 取消observer
    setTimeout(() => { observer.disconnect() }, 10000)
})();