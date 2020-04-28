// ==UserScript==
// @name         keylol css
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  a style for keylol.com
// @author       mianxiu
// @match        keylol.com/*
// @grant        none
// @require      https://at.alicdn.com/t/font_1764890_t0yv142u7m7.js
// ==/UserScript==

(function () {
    'use strict';


    // 配合tampermonkey设置加载前移除css
    var clearCss = function () {
        document.querySelectorAll(`link[rel=stylesheet]`).forEach(e => {
            //console.log(e)
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



    // 使用MutationObserver来消除节点`位移`，因为等dom加载后再操作会使元素`移位`
    // 资源消耗大，谨慎使用
    // 通过更加详细的选择器来变相停止节点插入循环

    var createElement = function () {

        let body = document.querySelector(`body`)
        // nav-menu添加新parent
        let navMenuParent = document.createElement(`nav`)
        navMenuParent.id = `nav-menu-parent`

        document.querySelector(`body`).insertBefore(navMenuParent, document.querySelector('#nav-menu'))

    }

    createElement()


    // 移动节点
    var moveElement = function () {

        let logo = document.querySelector('body>.tb-container>#nav-logo')
        let navMenuParent = document.querySelector('body>#nav-menu-parent')
        let navMenu = document.querySelector('body>#nav-menu')
        let tbContainer = document.querySelector('body>.tb-container')

        // 用户栏&LOGO
        navMenu.insertBefore(tbContainer, null)
        navMenu.insertBefore(document.querySelector('#nav-additional>#nav-user-action-bar'), null)
        navMenu.insertBefore(logo, navMenu.childNodes[0])
        navMenuParent.insertBefore(navMenu, null)

    }

    var listenElement = function () {
        moveElement()
    }

    var moveObserver = new MutationObserver(listenElement);
    moveObserver.observe(targetNode, observerOptions);


    // DOM加载完全后------------------------
    // fetch热门主题图片
    let i = 1
    function fetchHotImg() {

        let imgRegx = /\"(https:\/\/blob\.keylol\.com\/forum.+?)\"/s

        let hotImgPostUrls = document.querySelectorAll(`.slideshow>li>a`)

        hotImgPostUrls.forEach(postUrl => {

            //console.log(postUrl.href)

            fetch(postUrl.href).then(function (res) {
                return res.text();
            }).then(bodyText => {

                let imgUrls = bodyText.match(imgRegx)
                if (imgUrls.length > 1) {

                    let imgNode = postUrl.children[0]
                    postUrl.insertBefore(document.createElement(`div`), imgNode)

                    // 去除默认尺寸
                    imgNode.removeAttribute("height")
                    imgNode.removeAttribute("width")
                    imgNode.src = bodyText.match(imgRegx)[0].replace(/"/g, ``)

                    // 去除slidebar序号
                    document.querySelector(`.slidebar > ul >li:nth-child(${i})`).innerText = ``
                    i++
                }
            })
        })
    }

    // 热门主题列表滚动监器
    function hotPostShowMore() {
        let tabPContent = document.querySelector(`#tabPAhn0P_content`)

        let tabShow = function (event) {
            if (tabPContentShow.value === `hide`) {
                tabPContent.classList.add(`tabPContentShow`)
                event.target.value = `show`
                event.target.className = `tabPContentBtnShow`
                event.target.innerText = `...`

            } else {
                tabPContent.classList.remove(`tabPContentShow`)
                event.target.value = `hide`
                event.target.className = `tabPContentBtnHide`
                event.target.innerText = `...+5`
            }
        }



        let tabPContentShow = document.createElement(`button`)
        tabPContentShow.id = `tabPContentShow`
        tabPContentShow.innerText = `...+5`
        tabPContentShow.value = `hide`
        tabPContentShow.className = `tabPContentBtnHide`


        tabPContent.append(tabPContentShow)
        tabPContentShow.addEventListener(`click`, tabShow)

    }


    // symbol使用
    let symbol = function (id) {
        return `<svg class="icon" aria-hidden="true"><use xlink:href="#${id}"></use></svg>`
    }


    let windowLoad = function () {
        console.log(`add symbol icons`)
        fetchHotImg()
        console.log(`add tabPAHn0P_content show more button`)
        hotPostShowMore()
    }

    // DOM加载后
    document.addEventListener("DOMContentLoaded", function (event) {
        windowLoad()
        document.querySelector('#nav-logo').innerHTML += symbol(`kelolsteam_panel_hot`)

    });


    var css = `
body{
background:green;
}

    .icon {
       width: 2em; height: 2em;
       vertical-align: -0.15em;
       fill: currentColor;
       overflow: hidden;
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
    setTimeout(() => {
        observer.disconnect()
        moveObserver.disconnect()
    }, 300)
})();