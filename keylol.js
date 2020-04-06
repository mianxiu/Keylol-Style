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
    document.querySelectorAll(`link[rel=stylesheet]`).forEach(e => {
        e.remove()
    })

    // 移动用户栏&LOGO
    const navMenuUl = document.querySelector('#nav-menu>ul ')
    navMenuUl.parentNode.insertBefore(document.querySelector('.tb-container'), null)
    navMenuUl.insertBefore(document.querySelector('#nav-logo'), navMenuUl.childNodes[0])


    var css = `

`

    if (typeof GM_addStyle != "undefined") {
        GM_addStyle(css);
    } else if (typeof PRO_addStyle != "undefined") {
        PRO_addStyle(css);
    } else if (typeof addStyle != "undefined") {
        addStyle(css);
    } else {
        var node = document.createElement("style");
        node.type = "text/css";
        node.appendChild(document.createTextNode(css));
        var heads = document.getElementsByTagName("head");
        if (heads.length > 0) {
            heads[0].appendChild(node);
        } else {
            // no head yet, stick it whereever
            document.documentElement.appendChild(node);
        }
    }
    // Your code here...
})();