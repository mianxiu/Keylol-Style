d// ==UserScript==
// @name         keylol css
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  a style for keylol.com
// @author       mianxiu
// @match        keylol.com/*
// @grant        none
// @require      https://at.alicdn.com/t/font_1764890_l5i3ra69qt.js
// ==/UserScript==

; (function () {
    "use strict"

    // 配合tampermonkey设置加载前移除css
    var clearCss = function () {
        document.querySelectorAll(`link[rel=stylesheet]`).forEach((e) => {
            e.remove()
        })
    }

    var targetNode = document.documentElement
    var observerOptions = {
        childList: true,
        subtree: true,
    }
    var observer = new MutationObserver(clearCss)
    observer.observe(targetNode, observerOptions)

    // 使用MutationObserver来消除节点`位移`，因为等dom加载后再操作会使元素`移位`
    // 资源消耗大，谨慎使用
    // 通过更加详细的选择器来变相停止节点插入循环

    var createElement = function () {
        let body = document.querySelector(`body`)

        // nav-menu添加新parent
        let navMenuParent = document.createElement(`nav`)
        navMenuParent.id = `nav-menu-parent`
        document.querySelector(`body`).insertBefore(navMenuParent, document.querySelector("#nav-menu"))

        // 添加index_subject的父节点，分类
        const indexSubjectTemplate = `
        <div class="index_subject_left">
            <div class="index_subject_steam"></div>
            <div class="index_subject_game"></div>
            <div class="index_subject_forum"></div>
            <div class="index_subject_translate"></div>
        </div>
        <div class="index_subject_right">
            <div class="row_ads"></div>
            <div class="forum_nav"></div>
            <div class="forum_question"></div>
        </div>
        `
        let indexSubjectParent = document.createElement(`div`)
        indexSubjectParent.id = `index-subject-parent`
        indexSubjectParent.className = `index_subject_parent`
        indexSubjectParent.innerHTML += indexSubjectTemplate
        document.querySelector("body").insertBefore(indexSubjectParent,null )
    }

    createElement()

    // 移动节点
    var moveElement = function () {
        let logo = document.querySelector("body>.tb-container>#nav-logo")
        let navMenuParent = document.querySelector("body>#nav-menu-parent")
        let navMenu = document.querySelector("body>#nav-menu")
        let tbContainer = document.querySelector("body>.tb-container")

        // 用户栏&LOGO
        navMenu.insertBefore(tbContainer, null)
        navMenu.insertBefore(document.querySelector("#nav-additional>#nav-user-action-bar"), null)
        navMenu.insertBefore(logo, navMenu.childNodes[0])
        navMenuParent.insertBefore(navMenu, null)

        // 移动版块到index-subject-parent > index_subject_left
        
        let steam = document.querySelector(`#index-subject-parent`)
        let game = document.querySelector(`#index-subject-parent`)
        let forum = document.querySelector(`#index-subject-parent`)
        let translateNode =  document.querySelector(`#index-subject-parent`)

        let steamNode = document.querySelector(`#wp > div:nth-child(3)`)
        let manufacturerNode =  document.querySelector(`#wp > div:nth-child(4)`)
        let gameNode = document.querySelector(`#wp > div:nth-child(5)`)
        let questionNode = document.querySelector(`#wp > div:nth-child(6)`)
        let forumNode = document.querySelector(`#wp > div:nth-child(7)`)
        let translateNode =  document.querySelector(`#wp > div.index_middle_subject.clearfix`)

        indexSubjectParentNode.insertBefore()

        // 移动到index_subject_right
        let rowAds = document.querySelector(`.index_navigation_mid rnd_ai_h`)
        let forumNav = document.querySelector(`div.index_navi_left`)
        let forumRight = document.querySelector(`.index_navi_right`)
        let forumQuestion = document.querySelector(`.index_subject`)

        let rowAdsNode = document.querySelector(`#index-subject-parent`)
        let forumNavNode = document.querySelector(`#index-subject-parent`)
        let forumQuestionNode = document.querySelector(`#index-subject-parent`)

    }

    var listenElement = function () {
        moveElement()
    }

    var moveObserver = new MutationObserver(listenElement)
    moveObserver.observe(targetNode, observerOptions)

    // DOM加载完全后------------------------
    // fetch热门主题图片
    let i = 1
    function fetchHotImg() {
        let imgRegx = /\"(https:\/\/blob\.keylol\.com\/forum.+?)\"/s

        let hotImgPostUrls = document.querySelectorAll(`.slideshow>li>a`)

        hotImgPostUrls.forEach((postUrl) => {
            //console.log(postUrl.href)

            fetch(postUrl.href)
                .then(function (res) {
                    return res.text()
                })
                .then((bodyText) => {
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
        let moreText = `...+5`
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
                event.target.innerText = moreText
            }
        }

        let tabPContentShow = document.createElement(`button`)
        tabPContentShow.id = `tabPContentShow`
        tabPContentShow.innerText = moreText
        tabPContentShow.value = `hide`
        tabPContentShow.className = `tabPContentBtnHide`

        tabPContent.append(tabPContentShow)
        tabPContentShow.addEventListener(`click`, tabShow)
    }

    // 添加深色模式
    function darkMode() {
        let ul = document.querySelector(`#nav-user-action-bar > ul > li.dropdown > ul`)
        ul.insertBefore(document.createElement(`li`), ul.children[0])
        ul.children[0].insertBefore(document.createElement(`a`), null)
        ul.children[0].children[0].id = `darkmode`
        let darkmodeNode = document.querySelector(`#darkmode`)
        darkmodeNode.innerText = `深色模式`
    }

    // symbol使用
    // 数组的顺序对应元素
    
 
    let symbol = function (id) {
        let span = document.createElement(`span`)
        span.className = `symbol-icons`
        span.innerHTML += `<svg class="icon" aria-hidden="true"><use xlink:href="#${id}"></use></svg>`
        return span
    }

    // 下拉菜单icons添加
     // 头像下拉菜单
    const symbolDownMenu = ["kelolmenu_night_mode", "kelolmenu_setting", 'kelolmenu_connet_qq', 'kelolmenu_friend', 'kelolmenu_my_post', 'kelolmenu_collect', 'kelolmenu_icon_prop','kelolmenu_order']
    function setDownMenuIcons(){
        let downMenu = document.querySelectorAll(`#nav-user-action-bar > ul > li.dropdown > ul>li:not(.divider)`)
        let i=0
        downMenu.forEach(node=>{
            if(node.className == ``){
                node.insertBefore(symbol(symbolDownMenu[i]),node.children[0])
            }
            i++
        })
    }

    // 搜索栏 消息 提醒
    // 搜索栏和导航栏
    const symbolNav = ['kelolmenu_iconsearch', 'kelolmenu_icon_mail', 'kelolmenu_icon_post_reply']
    function setNavIcons(){

        //

        let navNodes = {
            searchNode:document.querySelector(`.search-bar-form > .dropdown `),
            actionNode:document.querySelector(`#nav-user-action-bar > ul > li > a.btn-user-action`),
            highLightNode:document.querySelector(`#nav-user-action-bar > ul > li > a.btn-user-action-highlight`)
        }

        let i= 0
        for (const key in navNodes) {
            let node = navNodes[key]

            if(node.firstChild != null){
                node.firstChild.nodeValue = ``
            }
            
            navNodes[key].insertBefore(symbol(symbolNav[i]),node.children[0])
            i++
        }
    }

    let windowLoad = function () {
        console.log(`fetch hot img`)
        fetchHotImg()
        console.log(`add tabPAHn0P_content show more button`)
        hotPostShowMore()
        console.log(`add darkmode`)
        darkMode()
        console.log(`add down menu icons`)
        setDownMenuIcons()
        console.log(`add nav menu icons`)
        setNavIcons()
    }

    // DOM加载后
    document.addEventListener("DOMContentLoaded", function (event) {
        windowLoad()
        //document.querySelector("#nav-logo").innerHTML += symbol(`kelolsteam_panel_hot`)
    })

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
    var node = document.createElement("style")
    node.type = "text/css"
    node.appendChild(document.createTextNode(css))
    var html = document.querySelector("html")
    document.documentElement.appendChild(node)

    // Your code here...
    // 取消observer
    setTimeout(() => {
        observer.disconnect()
        moveObserver.disconnect()
    }, 300)
})()
