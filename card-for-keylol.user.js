// ==UserScript==
// @name         card for keylol
// @namespace    http://tampermonkey.net/
// @version      0.11.41.0008
// @description  a style for keylol.com
// @author       mianxiu
// @match        keylol.com/*
// @grant        none
// @run-at       document-body
// @require      https://at.alicdn.com/t/font_1797873_riqtis11l6p.js
// @require      https://at.alicdn.com/t/font_1804200_8bhv89r7hhc.js
// @require      https://at.alicdn.com/t/font_1764890_kx8zk1v655l.js
// @require      https://at.alicdn.com/t/font_1791164_gw437i8ws1.js
// @require      https://at.alicdn.com/t/font_1794025_bnx1ww55gzq.js

// ==/UserScript==

/**this is iconfont.cn symbol
 * @require keylol editor icons link
 * @require keylol post content icnos
 * @require keylol home icons link
 * @require game & manufactor logo link
 * @require keylol post icons link
 *
 * 在iconfont.cn 批量获取对象名
 * // let nodes={};document.querySelectorAll(`.icon-code-show`).forEach(node=>{nodes[node.innerText.replace(/keylol/,'')] = node.innerText});console.log(nodes);
 *
 */
; (function () {
    "use strict"

    /**
     * document.querySelector
     * @param {string} selector
     */
    function $(selector) {
        return document.querySelector(selector)
    }

    /**
     * document.querySelectorAll
     * @param {string} selector
     */
    function $All(selector) {
        return document.querySelectorAll(selector)
    }

    // 配合tampermonkey设置加载前移除css
    var clearCss = function () {
        $All(`link[rel=stylesheet]`).forEach((e) => {
            e.remove()
        })
    }

    var targetNode = document.documentElement
    var observerOptions = {
        childList: true,
        subtree: true,
        attributeFilter: [],
    }
    var observer = new MutationObserver(clearCss)
    observer.observe(targetNode, observerOptions)

    // 使用MutationObserver来消除节点`位移`，因为等dom加载后再操作会使元素`移位`
    // 资源消耗大，谨慎使用
    // 通过更加详细的选择器来变相停止节点插入循环
    var createElement = function () {
        let body = $(`body`)

        // nav-menu添加新parent
        let navMenuParent = document.createElement(`nav`)
        navMenuParent.id = `nav-menu-parent`
        $(`body`).insertBefore(navMenuParent, $("#nav-menu"))
    }

    createElement()


    /**
     * 加载CSS
     */
    function createCss() {

        var cssString = `
        /*hidden node*/
        #ajax_lang,
        #nav-menu>ul>li:nth-child(6),
        .index_navi {
            display: none !important;
        }
        
        .icon {
            width: 2.5em;
            height: 2.5em;
            vertical-align: -0.15em;
            fill: currentColor;
            overflow: hidden;
            color: black;
        }
        
        :root {
            --body-width: 1200px;
            --font-size-12: 12px;
            --font-size-14: 14px;
        }
        
        :root {
            --display-flex: flex;
            --border-radius-2: 4px;
            --border-radius-10: 10px;
            --border-radius-200: 200px;
            --element-margin-bottom-18: 18px;
            --element-padding: 8px 10px;
            --element-padding-left: 18px;
            --element-padding-0-10: 0 10px;
            --element-height-34: 34px;
            --down-menu-height: 46px;
            --down-menu-dual-line-height: 92px;
            --down-menu-divider-height: 1px;
            --marign-padding-18: 18px;
            --margin-bottom-30: 30px;
            --margin-bottom-60: 60px;
            --tip-margin-top-30: 30px;
            --motion-2: .4s all;
        }
        
        :root {
            --shadow-hot: 0px 6px 10px rgba(0, 0, 0, 0.25);
            --shadow-outline: 0px 0px 1px rgba(0, 0, 0, 0.25);
        }
        
        :root {
            /* color */
            --body-background: #ebebeb;
            --background-color: #ebebeb;
            --element-background: #fafafa;
            --menu-hover-background: #dedede;
            --tip-background: #2c2c2c;
            --active-background: red;
            --point: #056396;
            --point-orange: #fd6c2d;
            --point-yellow: #fdbb2d;
            --point-green: #67c8ae;
            --point-blue: #6296e1;
            --icon-line: black;
            --icon-fill: rgb(0, 0, 0);
            --icon-active: rgb(255, 255, 255);
            /* subject */
            --origni-bg: #1e262c;
            --uplay-bg: #fafafa;
            --gog-bg: #2c2c2c;
            --window-store-bg: #ededed;
            --epic-game-bg: #2a2a2a;
            --sankwo-bg: #292e41;
            --cube-bg: #1b344b;
            --wegame-bg: #211f1e;
            --console-bg: #2b2c31;
            --mobile-bg: #fafafa;
        
            /* game */
            --all-game-bg: #056396;
            --dota2-bg: #100f0f;
            --battle-net-bg: #0b0d12;
            --dota-underlord-bg: #342c4a;
            --ea-bg: #fafafa;
            --csgo-bg: #273548;
            --vr-bg: #767676;
            --gta-bg: #fafafa;
            --survivel-bg: #f2a900;
            --value-bg: #f74843;
            --ak-bg: #2d2e31;
            --uplay-game-bg: #398bf3;
        
            /* help */
            --help-background: #056396;
            --help-green: #8fd5c2;
            --help-green-key: #125c49;
            --help-yellow: #f2cc7b;
            --help-yellow-key: #795812;
            --help-red: #eda585;
            --help-red-key: #783519;
            --help-blue: #88b0e8;
            --help-blue-key: #103a76;
        
            /* context */
            --quote: #F4F4F4;
            --context-yellow: #F8F0DF;
            --context-reward: #ffca37;
            --code-background: #282c34;
            --code-copy-background: #5b616d;
            --code-copy-font: #e4ebfb;
            --code-copy-sb: #55c9ff;
            --table-line: #d4d4d4;
            --table-tr-2n: #eee;
        
        
        
            /* font */
            --font-color-light: #fafafa;
            --font-normal: #2c2c2c;
            --font-second-title: #aeaeae;
            --font-second-light-aphal: rgba(255, 255, 255, 0.7);
            --font-second-aphal: rgba(0, 0, 0, 0.3);
            --font-point: #c9d6e9;
            --font-point-second-title: rgba(201, 214, 233, 0.5);
            --input-background: #dedede;
            --input-post-background: #f4f4f4;
            --font-visit: #056396;
        }
        
        .darkmode-css {
        
            /* color */
            --body-background: #070E17;
            --background-color: #203A5C;
            --element-background: #101f31;
            --menu-hover-background: rgb(44, 77, 119);
            --tip-background: #203A5C;
            --active-background: rgb(186, 255, 74);
            --point: #203a5c;
            --point-orange: #fd6c2d;
            --point-yellow: #fdbb2d;
            --point-green: #67c8ae;
            --point-blue: #6296e1;
            --icon-line: #B7C8DF;
            --icon-fill: rgb(0, 0, 0);
            --icon-active: #B7C8DF;
            /* subject */
            --origni-bg: #1e262c;
            --uplay-bg: #fafafa;
            --gog-bg: #2c2c2c;
            --window-store-bg: #ededed;
            --epic-game-bg: #2a2a2a;
            --sankwo-bg: #292e41;
            --cube-bg: #1b344b;
            --wegame-bg: #211f1e;
            --console-bg: #2b2c31;
            --mobile-bg: #fafafa;
        
            /* game */
            --all-game-bg: #056396;
            --dota2-bg: #100f0f;
            --battle-net-bg: #0b0d12;
            --dota-underlord-bg: #342c4a;
            --ea-bg: #fafafa;
            --csgo-bg: #273548;
            --vr-bg: #767676;
            --gta-bg: #fafafa;
            --survivel-bg: #f2a900;
            --value-bg: #f74843;
            --ak-bg: #2d2e31;
            --uplay-game-bg: #398bf3;
        
            /* help */
            --help-background: #07244d;
            --help-green: #228167;
            --help-green-key: #033c2c;
            --help-yellow: #b08923;
            --help-yellow-key: #523904;
            --help-red: #97624b;
            --help-red-key: #5e240c;
            --help-blue: #4e6b94;
            --help-blue-key: #132b4e;
        
            /* context */
            --quote: #081423;
            --context-yellow: #B7AC95;
            --context-reward: #d49c3c;
            --code-background: #184a88;
            --code-copy-background: #1b3e6b;
            --code-copy-font: #aebfd4;
            --code-copy-sb: #ffffff;
            --table-line: #fff;
            --table-tr-2n: #05111f;
        
        
        
            /* font */
            --font-color-light: #B7C8DF;
            --font-normal: #B7C8DF;
            --font-second-title: #aeaeae;
            --font-second-light-aphal: rgba(255, 255, 255, 0.3);
            --font-second-aphal: rgba(255, 255, 255, 0.3);
            --font-point: #93abcd;
            --font-point-second-title: rgba(201, 214, 233, 0.5);
            --input-background: #203A5C;
            --input-post-background: #081423;
            --font-visit: #5A6D87;
        }
        
        html,
        body,
        ul,
        ol,
        button,
        p,
        a,
        strong,
        label,
        input,
        textarea {
            border: none;
            margin: 0;
            padding: 0;
            list-style-type: none;
            text-decoration: none;
        }
        
        a {
            line-height: var(--font-size-14);
            color: var(--font-normal);
            font-size: var(--font-size-14);
            outline: none;
        }
        
        select {
            height: var(--element-height-34);
            background-color: var(--input-background);
            border: 0;
            border-radius: var(--border-radius-10);
            padding: 0 10px;
            color: var(--font-normal);
        }
        
        select:focus {
            outline: none;
        }
        
        .symbol-icons {
            display: flex;
        }
        
        html {
            font-family: -apple-system, BlinkMacSystemFont, Helvetica Neue, PingFang SC, Microsoft YaHei, Source Han Sans SC, Noto Sans CJK SC, WenQuanYi Micro Hei, sans-serif;
            font-size: var(--font-size-14);
        }
        
        html {
            display: var(--display-flex);
            justify-content: center;
        }
        
        body {
            display: var(--display-flex);
            align-items: center;
            flex-direction: column;
            background-color: var(--body-background);
            width: 100%;
        }
        
        #nav-menu,
        #nav-menu>ul,
        .tb-container,
        .floatcontainer,
        #frameCX66dD,
        #wp,
        .tb,
        .area,
        .index_subject,
        .index_subject_row,
        .index_middle_subject,
        .index_foot_subject,
        .bbs_daily_stats,
        .rnd_ai_f,
        .subforunm_foot {
            display: var(--display-flex);
            justify-content: center;
        }
        
        .floatcontainer {
            flex-direction: column-reverse;
        }
        
        .floatcontainer {
            display: none;
        }
        
        .index_navi {
            display: var(--display-flex);
            flex-direction: row;
            justify-content: center;
        }
        
        /* ----------------导航栏----------------- */
        /*logo*/
        #nav-logo>span:first-child {
            display: none;
        }
        
        #nav-logo>span:last-child {}
        
        #nav-menu-parent .icon {
            color: var(--icon-line);
        }
        
        #nav-menu-parent {
            width: 100%;
            display: var(--display-flex);
            justify-content: center;
        }
        
        #nav-menu {
            height: 110px;
            width: var(--body-width);
            align-items: center;
            justify-content: space-between;
        }
        
        #nav-menu>ul {
            width: 640px;
        }
        
        /*菜单栏子项*/
        .has-sub {
            display: var(--display-flex);
            justify-content: center;
            align-items: center;
            width: calc(100% / 9);
            height: 30px;
        }
        
        .has-sub>ul {
            z-index: 12;
            display: none;
            background-color: var(--background-color);
            box-shadow: var(--shadow-hot);
            border-radius: var(--border-radius-10);
            position: absolute;
            top: 0;
            margin-left: 54px;
            margin-top: 68px;
            justify-content: end;
            width: 172px;
            flex-direction: column;
            overflow: hidden;
        }
        
        .has-sub>ul>li {
            justify-content: left;
            padding-left: var(--element-padding-left);
            font-size: var(--font-size-14);
            height: var(--down-menu-height);
        }
        
        .has-sub>ul>li.dual-line {
            height: var(--down-menu-dual-line-height);
        }
        
        .has-sub>ul>li>a {
            width: 100%;
            height: 100%;
            text-align: left;
            line-height: var(--down-menu-height);
        }
        
        .has-sub:hover>ul {
            display: var(--display-flex);
            flex-direction: column;
        }
        
        .has-sub>ul>li:hover {
            background-color: var(--menu-hover-background);
        }
        
        /* -------------用户&搜索栏---------- */
        #nav-additional {
            display: var(--display-flex);
        }
        
        /* 数量提示 */
        #nav-user-action-bar>ul>li>a {
            display: var(--display-flex);
            justify-content: center;
        }
        
        .badge {
            display: var(--display-flex);
            background-color: var(--point);
            color: var(--font-color-light);
            position: absolute;
            padding: 2px 6px;
            border-radius: 4px;
            margin-top: 35px;
        }
        
        /* -------搜索--------- */
        .tb-container {
            border-radius: var(--border-radius-200);
            background-color: var(--input-background);
            overflow: hidden;
        }
        
        #nav-search-bar {
            display: var(--display-flex);
            align-items: center;
            width: 240px;
        }
        
        #nav-user-action-bar {
            display: var(--display-flex);
        }
        
        /* 搜索输入框 */
        .search-bar-form {
            --search-bar-height: 30px;
        }
        
        .search-bar-form {
            align-items: center;
            display: var(--display-flex);
            flex-direction: row-reverse;
            height: var(--search-bar-height);
        }
        
        .search-box {
            background-color: var(--input-background);
            padding: 0;
            margin: 0;
            border: none;
            color: var(--font-normal);
        }
        
        .search-box:focus {
            outline: none;
        }
        
        .search-box::placeholder {
            color: var(--font-second-aphal);
        }
        
        /* 搜索切换按钮 */
        .search-bar-form>.dropdown {
            display: var(--display-flex);
        }
        
        /* 按钮 */
        .search-bar-form>.dropdown>button {
            display: var(--display-flex);
            align-items: center;
            justify-content: center;
            flex-direction: row-reverse;
            background-color: var(--input-background);
            margin-right: 14px;
            font: var(--font-size-12);
        }
        
        .search-bar-form>.dropdown>button>span:nth-child(1) {
            display: flex;
            width: 100%;
            min-width: 30px;
            color: var(--font-normal);
        }
        
        .search-bar-form>.dropdown>.dropdown-menu>li,
        #nav-user-action-bar>ul>.dropdown>.dropdown-menu-right>li {
            display: var(--display-flex);
        
            align-items: center;
        }
        
        /* 搜索输入框 菜单 */
        .search-bar-form>.dropdown>.dropdown-menu,
        #nav-user-action-bar>ul>.dropdown>.dropdown-menu-right {
            display: none;
            z-index: 11;
            background-color: var(--background-color);
            box-shadow: var(--shadow-hot);
            position: absolute;
            margin-top: var(--search-bar-height);
            border-radius: var(--border-radius-10);
            overflow: hidden;
        }
        
        .search-bar-form>.dropdown>.dropdown-menu>li {
            justify-content: center;
            font-size: var(--font-size-12);
            width: 80px;
            height: var(--search-bar-height);
        }
        
        .search-bar-form>.dropdown>.dropdown-menu>li>a {
            width: 100%;
            height: 100%;
            text-align: center;
            line-height: var(--search-bar-height);
        }
        
        /* 头像下拉 菜单*/
        #nav-user-action-bar>ul>.dropdown>.dropdown-menu-right {
            display: none;
            top: 0;
            margin-left: -140px;
            margin-top: 68px;
            justify-content: end;
            width: 172px;
            flex-direction: column;
        }
        
        .search-bar-form>.dropdown:hover>.dropdown-menu {
            display: block;
        }
        
        #nav-user-action-bar>ul>.dropdown:hover>.dropdown-menu-right {
            display: var(--display-flex);
        }
        
        /* 头像下拉 */
        #nav-user-action-bar>ul>.dropdown>ul>li {
            justify-content: left;
            padding-left: var(--element-padding-left);
            font-size: var(--font-size-14);
            height: var(--down-menu-height);
        }
        
        #nav-user-action-bar>ul>.dropdown>ul>li>a {
            width: 100%;
            height: 100%;
            text-align: left;
            line-height: var(--down-menu-height);
            cursor: pointer;
        }
        
        /* 分隔线 */
        .search-bar-form>.dropdown>.dropdown-menu>li.divider,
        #nav-user-action-bar>ul>.dropdown>ul>li.divider {
            height: var(--down-menu-divider-height);
            background-color: var(--menu-hover-background);
        }
        
        /* 下拉菜单hover效果*/
        .search-bar-form>.dropdown>.dropdown-menu>li:hover,
        #nav-user-action-bar>ul>.dropdown>ul>li:hover {
            background-color: var(--menu-hover-background);
        }
        
        /* 头像 */
        .dropdown {}
        
        .dropdown>a>img {
            height: 30px;
            width: 30px;
            border-radius: var(--border-radius-200);
        }
        
        /* 头像下拉菜单symbol */
        .dropdown>ul>li>span {
            margin-right: 8px;
        }
        
        /* 用户信息 */
        .list-inline {
            display: var(--display-flex);
            align-content: center;
            justify-content: space-between;
            height: 30px;
            width: 125px;
        }
        
        .list-inline>li {
            display: var(--display-flex);
            align-items: center;
        }
        
        /* ---------------主内容框架----------------------- */
        #wp {
            width: var(--body-width);
            min-width: 0 !important;
            flex-direction: column;
            flex-wrap: wrap;
        }
        
        /* -----------热门主题--------*/
        #diy1 {
            width: var(--body-width);
        }
        
        /* 热点 */
        #frameCX66dD {
            width: 100%;
            flex-direction: row-reverse;
            justify-content: space-between;
            padding-top: var(--margin-bottom-30);
            margin-bottom: 90px;
        }
        
        /* -----------tab---------------- */
        #tabPAhn0P,
        #tabPAhn0P_title {
            display: var(--display-flex);
        }
        
        #tabPAhn0P_title {
            width: 76px;
            height: 450px;
        }
        
        /* 版块列表-内容全局 */
        #tabPAhn0P_title>ul>li>a,
        #tabPAhn0P_content>div>div>ol>li>a:last-child {
            transition: 0.2s all;
            line-height: var(--font-size-14);
            margin-bottom: 18px;
            display: inline-block;
            background-color: var(--element-background);
            border-radius: var(--border-radius-10);
            padding: 10px 8px;
            box-shadow: var(--shadow-outline);
        
            /*文本省略*/
            white-space: nowrap;
            text-overflow: ellipsis;
            max-width: 660px;
            overflow: hidden;
        }
        
        /* 版块列表 */
        #tabPAhn0P_title>ul {
            display: var(--display-flex);
            flex-direction: column;
            justify-content: space-between;
        }
        
        #tabPAhn0P_title>ul>li.a>a {
            background-color: var(--point);
        }
        
        #tabPAhn0P_title>ul>li.a>a {
            color: var(--font-color-light);
        }
        
        /* 小点点 */
        #tabPAhn0P_title>ul>li:nth-child(1):before,
        #tabPAhn0P_title>ul>li:nth-child(2):before,
        #tabPAhn0P_title>ul>li:nth-child(3):before,
        #tabPAhn0P_title>ul>li:nth-child(4):before {
            border-radius: var(--border-radius-10);
            content: "";
            display: block;
            position: absolute;
            width: 10px;
            height: 10px;
            margin-left: 90px;
            margin-top: 16px;
        }
        
        #tabPAhn0P_title>ul>li:nth-child(1):before {
            background-color: var(--point-orange);
        }
        
        #tabPAhn0P_title>ul>li:nth-child(2):before {
            background-color: var(--point-yellow);
        }
        
        #tabPAhn0P_title>ul>li:nth-child(3):before {
            background-color: var(--point-green);
        }
        
        #tabPAhn0P_title>ul>li:nth-child(4):before {
            background-color: var(--point-blue);
        }
        
        /* 热门主题列表内容---------- */
        #tabPAhn0P_content {
            --tabPAhn0P_content-height: 558px;
        }
        
        #tabPAhn0P_content {
            display: var(--display-flex);
            width: 680px;
            padding-left: 50px;
            padding-right: 10px;
            overflow-y: hidden;
        }
        
        #tabPAhn0P_content ol {
            list-style-type: none;
        }
        
        #tabPAhn0P>div:nth-child(2) {
            transition: 0.2s all;
            height: var(--tabPAhn0P_content-height);
        }
        
        .tabPContentShow {
            height: 780px !important;
        }
        
        /* 更多按钮 */
        #tabPContentShow {
            transition: 0.2s all;
            font-size: var(--font-size-12);
            background-color: var(--element-background);
            position: absolute;
            display: var(--shadow-outline);
            padding: var(--element-padding);
            box-shadow: var(--shadow-outline);
            border-radius: var(--border-radius-10);
            cursor: pointer;
            color: var(--font-normal);
        }
        
        #tabPContentShow:focus {
            outline: none;
        }
        
        #tabPContentShow:hover {
            box-shadow: var(--shadow-hot);
        }
        
        .tabPContentBtnHide {
            margin-top: var(--tabPAhn0P_content-height);
        }
        
        .tabPContentBtnShow {
            margin-top: 780px;
        }
        
        /* 隐藏用户 版块前缀*/
        #tabPAhn0P_content li em,
        #tabPAhn0P_content li a {
            display: none;
        }
        
        /* hover */
        #tabPAhn0P_content>div>div>ol>li>a:hover {
            box-shadow: var(--shadow-hot);
        }
        
        .darkmode-css #tabPAhn0P_content>div>div>ol>li>a:hover {
            box-shadow: var(--shadow-hot);
            background-color: var(--menu-hover-background);
        }
        
        
        /* ---------------热门图片------- */
        #frameCX66dD_left,
        #portal_block_431,
        #portal_block_431_content,
        #portal_block_431_content>div.slidebox,
        .slideshow,
        .slideshow>li,
        .slideshow>li>a,
        .slideshow>li>a>div {
            width: 314px !important;
            height: 447px !important;
            border-radius: var(--border-radius-10);
            display: var(--display-flex);
            justify-content: center;
        }
        
        /* 356px */
        #frameCX66dD_left,
        #portal_block_431,
        #portal_block_431_content {
            width: 356px !important;
        }
        
        .slideshow {
            opacity: 1 !important;
        }
        
        .slideshow>li {
            overflow: hidden;
        }
        
        /* 图片遮罩 */
        .slideshow>li>a {
            background-color: var(--background-color);
        }
        
        .slideshow>li>a>div {
            background: linear-gradient(180deg, rgba(255, 255, 255, 0) 50%, #1e1e1e 100%);
            position: absolute;
            top: 0;
        }
        
        /* 图片 */
        .slideshow>li>a>img {
            /*	margin-top:80px;
            transform:scale(1.56);*/
            height: 100%;
        }
        
        /* 标题 */
        .slideshow>li>.title {
            color: var(--font-color-light);
            width: 200px;
            position: absolute;
            left: 30px;
            bottom: 68px;
            font-size: 18px;
            font-weight: bold;
        }
        
        /* 底部占位 */
        .slideshow>li {
            --slideshow-margin-left-top: -20px;
            --slideshow-margin--left-middle: 0px;
            --slideshow-margin-left-bottom: 20px;
            --slideshow-margin-left-bg: 40px;
        }
        
        .slideshow>li {
            transition: 0.2s all;
            position: absolute;
            margin-left: var(--slideshow-margin-left-bg);
            top: 60px;
            opacity: 0;
        }
        
        /* 底部占位1 */
        .slideshow>li:nth-child(1) {
            position: absolute;
            margin-left: var(--slideshow-margin--left-middle);
            top: 20px;
            display: flex !important;
            opacity: 0.6;
        }
        
        /* 底部占位2 */
        .slideshow>li:nth-child(2) {
            position: absolute;
            top: 40px;
            margin-left: var(--slideshow-margin-left-bottom);
            display: flex !important;
            opacity: 0.25;
        }
        
        /* 轮播设置 */
        .slideshow>li[style*="block"] {
            box-shadow: var(--shadow-hot);
            z-index: 3;
            position: absolute;
            margin-left: var(--slideshow-margin-left-top);
            top: 0px;
            opacity: 1;
        }
        
        .slideshow>li[style*="block"]+li {
            box-shadow: var(--shadow-hot);
            z-index: 2;
            position: absolute;
            margin-left: var(--slideshow-margin--left-middle);
            top: 20px;
            display: flex !important;
            opacity: 0.6;
        }
        
        .slideshow>li[style*="block"]+li+li {
            box-shadow: var(--shadow-outline);
            z-index: 1;
            position: absolute;
            margin-left: var(--slideshow-margin-left-bottom);
            top: 40px;
            display: flex !important;
            opacity: 0.25;
        }
        
        /* 图片控制条 */
        .slidebar {
            --slidebar-size: 8px;
        }
        
        .slidebar>ul {
            z-index: 10;
            position: absolute !important;
            top: 400px !important;
            left: 30px !important;
            display: var(--display-flex);
            width: 200px;
            justify-content: space-between;
        }
        
        .slidebar>ul>li {
            font-size: 0;
            height: var(--slidebar-size);
            width: var(--slidebar-size);
            border-radius: var(--border-radius-200);
            background-color: var(--font-color-light);
            opacity: 0.3;
        }
        
        .slidebar>ul>li.on {
            background-color: var(--font-color-light);
            opacity: 1;
        }
        
        /*------------------------版块内容--------------------------------*/
        #index-subject-parent div {
            transition: 0.2s all;
            display: var(--display-flex);
            flex-wrap: wrap;
        
            justify-content: end;
        }
        
        #index-subject-parent div.row_ads {
            display: none;
        }
        
        #index-subject-parent {
            display: var(--display-flex);
            flex-direction: row;
            justify-content: space-between;
        }
        
        .index_subject_left {
            display: initial;
            width: 789px;
        }
        
        .index_subject_right {
            display: var(--display-flex);
            flex-direction: column;
            width: 356px;
        }
        
        /* 版块标题 */
        .index_subject_title {
            padding: 8px 18px;
            margin-bottom: var(--marign-padding-18);
            background-color: var(--point);
            border-radius: var(--border-radius-10);
            color: var(--font-color-light);
        }
        
        #manufacturer>div.index_subject_title,
        #game>div.index_subject_title {
            background-color: var(--tip-background);
        }
        
        /* 版块 */
        .index_subject_row {
            margin-bottom: var(--margin-bottom-60);
        }
        
        .darkmode-css .index_subject_game {
            opacity: .8;
        }
        
        /* 子版块 */
        .subject_row_detail {
            padding: 12px 12px;
            margin: 0 12px 18px 0;
            box-shadow: var(--shadow-outline);
            border-radius: var(--border-radius-10);
            background-color: var(--element-background);
            align-items: center;
        }
        
        
        
        .subject_row_detail:hover {
            box-shadow: var(--shadow-hot);
        }
        
        /* 子版块br */
        .subject_row_detail_text br {
            display: none;
        }
        
        .subject_row_detail_text {
            flex-direction: column;
            color: var(--font-second-aphal);
        }
        
        /* 子版块颜色设置 */
        #manufacturer>div.index_subject_row>div:nth-child(1) {
            background-color: var(--origni-bg);
        }
        
        #manufacturer>div.index_subject_row>div:nth-child(2) {
            background-color: var(--uplay-bg);
        }
        
        #manufacturer>div.index_subject_row>div:nth-child(3) {
            background-color: var(--gog-bg);
        }
        
        #manufacturer>div.index_subject_row>div:nth-child(4) {
            background-color: var(--window-store-bg);
        }
        
        #manufacturer>div.index_subject_row>div:nth-child(5) {
            background-color: var(--epic-game-bg);
        }
        
        #manufacturer>div.index_subject_row>div:nth-child(6) {
            background-color: var(--gta-bg);
        }
        
        #manufacturer>div.index_subject_row>div:nth-child(7) {
            background-color: var(--sankwo-bg);
        }
        
        #manufacturer>div.index_subject_row>div:nth-child(8) {
            background-color: var(--cube-bg);
        }
        
        #manufacturer>div.index_subject_row>div:nth-child(9) {
            background-color: var(--wegame-bg);
        }
        
        #manufacturer>div.index_subject_row>div:nth-child(10) {
            background-color: var(--console-bg);
        }
        
        #manufacturer>div.index_subject_row>div:nth-child(11) {
            background-color: var(--mobile-bg);
        }
        
        /* 子版块游戏 */
        #game>div.index_subject_row>div:nth-child(1) {
            background-color: var(--all-game-bg);
        }
        
        #game>div.index_subject_row>div:nth-child(2) {
            background-color: var(--ak-bg);
        }
        
        #game>div.index_subject_row>div:nth-child(3) {
            background-color: var(--dota-underlord-bg);
        }
        
        #game>div.index_subject_row>div:nth-child(4) {
            background-color: var(--dota2-bg);
        }
        
        #game>div.index_subject_row>div:nth-child(5) {
            background-color: var(--csgo-bg);
        }
        
        #game>div.index_subject_row>div:nth-child(6) {
            background-color: var(--survivel-bg);
        }
        
        #game>div.index_subject_row>div:nth-child(7) {
            background-color: var(--gta-bg);
        }
        
        #game>div.index_subject_row>div:nth-child(8) {
            background-color: var(--value-bg);
        }
        
        #game>div.index_subject_row>div:nth-child(9) {
            background-color: var(--ea-bg);
        }
        
        #game>div.index_subject_row>div:nth-child(10) {
            background-color: var(--uplay-game-bg);
        }
        
        #game>div.index_subject_row>div:nth-child(11) {
            background-color: var(--battle-net-bg);
        }
        
        #game>div.index_subject_row>div:nth-child(12) {
            background-color: var(--vr-bg);
        }
        
        /* ------友商 游戏 全局标题 (黑底)------------ */
        div.index_subject_game div.subject_row_detail_text_up>a {
            color: var(--font-color-light);
        }
        
        /* ------友商 游戏 全局二级标题 (黑底)------------ */
        div.index_subject_game div.subject_row_detail_text_down {
            color: var(--font-second-light-aphal);
        }
        
        /* 友商二级字体 白底 */
        #manufacturer>div.index_subject_row>div:nth-child(2) div.subject_row_detail_text_down,
        #manufacturer>div.index_subject_row>div:nth-child(4) div.subject_row_detail_text_down,
        #manufacturer>div.index_subject_row>div:nth-child(6) div.subject_row_detail_text_down,
        #manufacturer>div.index_subject_row>div:nth-child(11) div.subject_row_detail_text_down {
            color: var(--font-second-aphal);
        }
        
        /*标题 白底*/
        #manufacturer>div.index_subject_row>div:nth-child(2) div.subject_row_detail_text_up>a,
        #manufacturer>div.index_subject_row>div:nth-child(4) div.subject_row_detail_text_up>a,
        #manufacturer>div.index_subject_row>div:nth-child(6) div.subject_row_detail_text_up>a,
        #manufacturer>div.index_subject_row>div:nth-child(11) div.subject_row_detail_text_up>a {
            color: var(--font-normal);
        }
        
        .darkmode-css #manufacturer>div.index_subject_row>div:nth-child(2) div.subject_row_detail_text_up>a,
        .darkmode-css #manufacturer>div.index_subject_row>div:nth-child(4) div.subject_row_detail_text_up>a,
        .darkmode-css #manufacturer>div.index_subject_row>div:nth-child(6) div.subject_row_detail_text_up>a,
        .darkmode-css #manufacturer>div.index_subject_row>div:nth-child(11) div.subject_row_detail_text_up>a {
            color: #2c2c2c;
        }
        
        #game>div.index_subject_row>div:nth-child(7)>div.subject_row_detail_text>div.subject_row_detail_text_up>a,
        #game>div.index_subject_row>div:nth-child(9)>div.subject_row_detail_text>div.subject_row_detail_text_up>a {
            color: var(--font-normal);
        }
        
        .darkmode-css #game>div.index_subject_row>div:nth-child(7)>div.subject_row_detail_text>div.subject_row_detail_text_up>a,
        .darkmode-css #game>div.index_subject_row>div:nth-child(9)>div.subject_row_detail_text>div.subject_row_detail_text_up>a {
            color: #2c2c2c;
        }
        
        #game>div.index_subject_row>div:nth-child(7)>div.subject_row_detail_text>div.subject_row_detail_text_down,
        #game>div.index_subject_row>div:nth-child(9)>div.subject_row_detail_text>div.subject_row_detail_text_down {
            color: var(--font-second-aphal);
        }
        
        /*----------------right panle--------------------*/
        .row_ads {
            height: 159px;
            margin-bottom: var(--margin-bottom-30);
            box-shadow: var(--shadow-hot);
            border-radius: var(--border-radius-10);
            overflow: hidden;
            display: none;
        }
        
        .forum_nav>div:last-child {
            margin-bottom: 0px;
        }
        
        #index-subject-parent>div.index_subject_right>div.row_ads>div>a>img {
            height: 159px !important;
            width: 356px !important;
        }
        
        /* 手册 */
        .forum_nav {
            margin-bottom: var(--margin-bottom-30);
        }
        
        .forum_nav>div {
        
            margin-bottom: var(--marign-padding-18);
            border-radius: var(--border-radius-10);
            align-items: center;
            overflow: hidden;
        }
        
        .forum_nav>div>a {
            padding: 10px 8px;
        }
        
        .navItem-1 {
            padding: 8px 10px;
            align-items: center;
            background-color: var(--help-background);
        }
        
        .navItem-1>a {
            padding: 0 !important;
            color: var(--font-point);
        }
        
        .navItem-2>a:nth-child(1),
        .navItem-5>a:nth-child(1),
        .navItem-7>a:nth-child(2) {
            background-color: var(--help-yellow);
            color: var(--help-yellow-key);
        }
        
        .navItem-3>a:nth-child(1),
        .navItem-5>a:nth-child(2),
        .navItem-7>a:nth-child(1) {
            background-color: var(--help-blue);
            color: var(--help-blue-key);
        }
        
        .navItem-3>a:nth-child(2),
        .navItem-4>a:nth-child(1),
        .navItem-6>a:nth-child(1),
        .navItem-8>a:nth-child(2) {
            background-color: var(--help-red);
            color: var(--help-red-key);
        }
        
        .navItem-2>a:nth-child(2),
        .navItem-4>a:nth-child(2),
        .navItem-6>a:nth-child(2),
        .navItem-8>a:nth-child(1) {
            background-color: var(--help-green);
            color: var(--help-green-key);
        }
        
        /* 子版块图片*/
        .navItem-1>span,
        .subject_row_detail_pic {
            margin-right: 12px;
        }
        
        .forum_help .icon {
            width: 1.5em;
            height: 1.5em;
        }
        
        /* 社区服务*/
        #forum-question div {
            align-items: center;
        }
        
        #forum-question .index_subject_title {
            display: none !important;
        }
        
        #forum-question>div.index_subject_row {
            margin-bottom: 0px;
        }
        
        #forum-question>div.index_subject_row>div {
            width: 314px;
            padding: 8px 10px;
            background-color: var(--help-background);
            flex-direction: row;
        }
        
        #forum-question>div.index_subject_row>div>div.subject_row_detail_text {
            flex-direction: row;
            color: var(--font-point-second-title);
        }
        
        #forum-question>div.index_subject_row>div>div.subject_row_detail_text>.subject_row_detail_text_up>a {
            color: var(--font-point);
            margin-right: 12px;
        }
        
        .forum_help {
            position: -webkit-sticky;
            position: sticky;
            top: 20px;
        }
        
        .forum_stats {
            font-size: var(--font-size-12);
            color: var(--font-second-title);
            flex-wrap: nowrap !important;
            flex-direction: column;
        }
        
        .forum_stats a {
            font-size: var(--font-size-12);
        }
        
        .forum_stats span {
            padding: 10px
        }
        
        .forum_stats em {
            font-style: normal;
        }
        
        
        /* --------汉化组------------ */
        .index_subject_translate {
            margin: 0px 0 60px 0px;
        }
        
        .index_subject_translate a,
        .middle_subject_detail_text_down {
            color: var(--font-color-light)
        }
        
        .index_middle_subject {
            flex-direction: row;
        }
        
        .index_middle_subject div {
            margin: 0 0 !important;
            width: 120px;
            flex-direction: row;
            flex-wrap: wrap !important;
        }
        
        .index_middle_subject>div {
            border-radius: var(--border-radius-10);
            padding: 80px 59px 22px 12px;
            margin-right: var(--margin-bottom-30) !important;
        }
        
        .middle_subject_detail_text {
            flex-direction: column-reverse !important;
        }
        
        .middle_subject_detail_text_down {
            font-weight: bold;
        }
        
        div.middle_subject_detail_right>div:nth-child(3),
        .middle_subject_detail_right>div:nth-child(1)>div,
        .middle_subject_detail_text>div {
            padding: 10px 10px;
        }
        
        .index_middle_subject img,
        div.middle_subject_detail>div.middle_subject_detail_pic,
        .middle_subject_tiltle,
        .middle_subject_mid_tiltle,
        .middle_subject_right_tiltle,
        .dot,
        .middle_subject_detail_right br,
        .left_dot {
            display: none !important;
        }
        
        
        
        
        .foot_subject_left,
        .foot_subject_right {
            display: var(--display-flex);
            flex-direction: row;
        }
        
        /* 底部 */
        .subforunm_foot_bg {
            display: none;
        }
        
        .index_middle_subject>div {
            border-radius: var(--border-radius-10);
            padding: 80px 59px 22px 12px;
            margin-right: var(--margin-bottom-30) !important;
        }
        
        .middle_subject_detail_text {
            flex-direction: column-reverse !important;
        }
        
        .middle_subject_detail_text_down {
            font-weight: bold;
        }
        
        div.middle_subject_detail_right>div:nth-child(3),
        .middle_subject_detail_right>div:nth-child(1)>div,
        .middle_subject_detail_text>div {
            padding: 10px 10px;
        }
        
        .index_middle_subject img,
        div.middle_subject_detail>div.middle_subject_detail_pic,
        .middle_subject_tiltle,
        .middle_subject_mid_tiltle,
        .middle_subject_right_tiltle,
        .dot,
        .middle_subject_detail_right br,
        .left_dot {
            display: none !important;
        }
        
        .middle_subject_left,
        .middle_subject_mid,
        .middle_subject_right {
            background-size: 100%;
            background-repeat: no-repeat;
        }
        
        
        /* 天邈 */
        .middle_subject_left {
            background: linear-gradient(180deg, rgba(51, 43, 43, 0) 10%, #9b0202 66.35%), url(https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/83/83b16a956fa8ab857c791f832a85d8aaceb41418_full.jpg);
            background-color: #282828;
        }
        
        /* 蒹葭 */
        .middle_subject_mid {
            background: linear-gradient(180deg, rgba(224, 224, 224, 0) 0%, #1C1919 46.35%), url(https://tva3.sinaimg.cn/crop.0.0.180.180.180/73fdc439jw1e8qgp5bmzyj2050050aa8.jpg?KID=imgbed,tva&Expires=1588217198&ssig=heG1pLOcvd);
            background-color: #c12d2a;
        }
        
        /* 起源 */
        .middle_subject_right {
            background: linear-gradient(180deg, rgba(224, 224, 224, 0) 7.81%, #CF7A0A 42.19%), url(https://tva2.sinaimg.cn/crop.82.2.1140.1140.180/e9f4390djw1ein0bjh0jjj212c0vw41n.jpg?KID=imgbed,tva&Expires=1588220053&ssig=NHj9nZ6XcD);
            background-color: #555;
        }
        
        
        
        /* ------------------底部----------- */
        .subforunm_foot {
        
            --subforunm-left-width: 783px;
            color: var(--font-point);
            font-size: var(--font-size-12);
            width: 100%;
            background-color: var(--point);
            height: 128px;
            align-items: flex-end;
        }
        
        .subforunm_foot_bg,
        .subforunm_foot br {
            display: none;
        }
        
        .subforunm_foot a {
            font-size: var(--font-size-12);
            padding-right: 4px;
            color: var(--font-point);
        }
        
        .pipe {
            padding-right: 4px;
        }
        
        .subforunm_foot_banner {
            display: flex;
            flex-direction: column;
            justify-content: end;
            width: 783px;
        }
        
        .subforunm_foot_intro {
            display: flex;
            flex-direction: column;
            width: calc(var(--body-width) - var(--subforunm-left-width));
        }
        
        .subforunm_foot_intro_left {
            display: none !important;
        }
        
        .subforunm_foot_intro_right {
            display: flex;
            flex-direction: column;
            justify-content: right;
        }
        
        .subforunm_foot_intro_right>div {
            display: flex;
            justify-content: flex-end;
        }
        
        /* 微信 */
        .qrcode {
            display: none;
            position: absolute;
            margin-top: -130px;
            background-color: var(--tip-background);
            padding: 10px;
            border-radius: var(--border-radius-10);
            box-shadow: var(--shadow-hot);
        }
        
        .qrcode>img {
            width: 100px;
            height: 100px;
        }
        
        .wechat-hover-qrcode:hover>.qrcode {
            display: flex;
        }
        
        .subforunm_foot_banner,
        .subforunm_foot_intro {
            position: relative;
            margin-bottom: 34px;
            justify-content: center;
        }
        
        .subforunm_foot_text {
            margin-bottom: 10px;
        }
        
        
        
        
        
        /* ---------keylol copyrigh-------t*/
        #nv_forum>div.subforunm_foot>div.subforunm_foot_banner>div.subforunm_foot_text_bottom>div>div:nth-child(1) {
            display: flex;
        }
        
        #nv_forum>div.subforunm_foot>div.subforunm_foot_banner>div.subforunm_foot_text_bottom>div>div:nth-child(2),
        #nv_forum>div.subforunm_foot>div.subforunm_foot_intro.clearfix>div.subforunm_foot_intro_right>div:nth-child(2) {
            opacity: .5;
        }
        
        .foot_subject_left,
        .foot_subject_right {
            display: var(--display-flex);
            flex-direction: row;
        }
        
        
        /* 底部广告 */
        .rnd_ai_f {
            width: var(--body-width);
            height: 120px;
            box-shadow: var(--shadow-outline);
            border-radius: var(--border-radius-10);
            overflow: hidden;
            margin: var(--margin-bottom-60) 0;
            justify-content: center;
        }
        
        .bbs_daily_stats {
            display: none;
        }
        
        
        
        /* ----backtop ----- */
        .backToTop {
            width: 40px !important;
            height: 40px !important;
            bottom: 200px !important;
            right: 10vw !important;
            border-radius: var(--border-radius-200);
            background-color: var(--point) !important;
            box-shadow: var(--shadow-hot);
        }
        
        /* --------------------------------hot post------------------------------------- */
        #pt .z,
        .bm_h>h1,
        .subforum_left_title,
        .mn-nav-left>a>img,
        .th {
            display: none;
        }
        
        .bm_h,
        .forumrowdata {
            color: var(--font-normal);
        }
        
        #mn-nav-parent {
            padding: 22px 0;
        }
        
        /*  类别分页 */
        #mn-nav-parent a {
            transition: var(--motion-2);
            line-height: var(--font-size-14);
        }
        
        #mn-nav-parent,
        #mn-nav-parent>div,
        #thread_types,
        #mn-search-bar {
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        
        /* 发帖按钮 */
        .mn-nav-left>a {
            height: var(--element-height-34);
            font-size: var(--font-size-12);
            display: flex;
            align-items: center;
            padding: var(--element-padding-0-10);
            background-color: var(--point);
            margin-right: var(--marign-padding-18);
            border-radius: var(--border-radius-10);
            box-shadow: var(--shadow-outline);
        }
        
        #searchmypost {
            height: var(--element-height-34);
            border-radius: var(--border-radius-10);
            background-color: var(--input-background);
            color: var(--font-normal);
            padding: 0 10px;
        }
        
        .mn-nav-left>a .icon {
            width: 1.3em;
            height: 1.3em;
            margin-right: 2px;
        }
        
        /*--我的帖子筛选---*/
        .mn-nav-left>a>span:nth-child(2) {
            color: var(--font-color-light)
        }
        
        .mn-nav-left>a:hover {
            box-shadow: var(--shadow-hot);
        }
        
        #mn-search-bar {
            margin-bottom: 22px;
        }
        
        #mn-search-bar>form {
            color: var(--font-normal);
        }
        
        /*点评*/
        #delform tr td.xg1,
        .tl_reply a {
            background-color: var(--element-background);
            height: var(--element-height-34);
            display: inline-flex;
            align-items: center;
            padding: 0 10px;
            border-radius: var(--border-radius-10);
            box-shadow: var(--shadow-outline);
        }
        
        .bw0_all+tr td.xg1:after {
            position: absolute;
            content: '';
            width: 0px;
            height: 0px;
            border: 10px solid var(--element-background);
            border-right-color: #0000;
            border-top-color: #0000;
            border-left-color: #0000;
            margin-top: -26px;
        }
        
        .bw0_all tr {
            width: var(--body-width);
        }
        
        .bw0_all .post-list {
            width: 100%;
        }
        
        /*用户组*/
        .tdats {
            display: flex
        }
        
        .tdats h4,
        .tdats th.c0 {
            margin: 0;
            height: var(--element-height-34);
        }
        
        .tdats>div>table>tbody:nth-child(1)>tr:nth-child(1)>th>span {
            height: calc(var(--element-height-34) * 2);
        }
        
        .tdats span.notice {
            display: flex;
            height: var(--element-height-34);
        }
        
        .tdats .alt {
            height: var(--element-height-34);
        }
        
        .tdats #c2 {
            position: absolute;
        }
        
        .tdats table {
            max-width: 300px;
            display: flex !important;
        }
        
        .tdats table td:last-child {
            white-space: normal;
        }
        
        /*隐藏空白tr*/
        .bw0_all+tbody {
            display: none;
        }
        
        .exfm>table {}
        
        #steam_connect_spacecp {
            color: var(--font-normal);
        }
        
        /*----------消息列表---------*/
        .nts dl,
        dl[id^="pmlist_"],
        .tbms.mtm.mbm a {
            display: flex;
            background-color: var(--element-background);
            width: fit-content;
            padding: 8px;
            border-radius: var(--border-radius-10);
            box-shadow: var(--shadow-outline);
            color: var(--font-normal);
        }
        
        dl[id^="pmlist_"] a,
        .nts dl a {
            color: var(--font-visit);
        }
        
        .tbms.mtm.mbm a {
            background-color: var(--help-yellow);
            color: var(--help-yellow-key);
        }
        
        /*--------------设置------------*/
        .un_selector+#showSelectBox {
            height: var(--element-height-34);
            display: flex;
            align-items: center;
            justify-content: center;
            width: fit-content;
            padding: 0 8px;
            background-color: var(--point);
            border-radius: var(--border-radius-10);
            color: var(--font-point);
        }
        
        #profilelist tr,
        .tfm tr {
            color: var(--font-normal);
            margin: 8px 0;
            display: flex;
            align-items: center;
        }
        
        #profilelist tr th,
        #profilelist tr td {
            margin-right: 8px;
        }
        
        .bw0 .px,
        .un_selector input {
            padding: 0 8px;
            height: var(--element-height-34);
            border-radius: var(--border-radius-10);
            background-color: var(--input-post-background);
        }
        
        .ct2_a {
            display: flex;
            flex-direction: row-reverse;
            justify-content: flex-end;
        }
        
        .appl {}
        
        /*积分*/
        .creditl+table {
            display: flex;
        }
        
        /*头像*/
        #avatarform {
            color: var(--font-normal);
            white-space: nowrap;
        }
        
        /*-编辑器--*/
        /*赠楼*/
        #ga_type,
        #ga_id {
            display: none;
        }
        
        #select2-ga_id-container,
        #select2-ga_type-container {
            background-color: var(--element-background);
            height: var(--element-height-34);
            display: inline-flex;
            align-items: center;
            padding: 0 8px;
            border-radius: var(--border-radius-10)
        }
        
        .select2-results__options,
        .select2-selection__rendered {
            max-height: 600px;
            overflow: auto;
        }
        
        .select2-results__options li,
        .select2-selection__rendered li {
            box-shadow: var(--shadow-outline);
            display: flex;
            padding: 8px;
            background-color: var(--element-background);
        }
        
        .select2-results__options li:hover,
        .select2-selection__rendered {
            background-color: var(--background-color);
        }
        
        .tedt .fpd .icon {
            width: 1.6em;
        }
        
        .tedt .fpd {
            display: flex;
        }
        
        .tedt .bar {
            height: var(--element-height-34);
        }
        
        /*访客*/
        #delform .post-tr {
            width: var(--body-width);
        }
        
        #delform .th.post-tr {
            display: none;
        }
        
        #delform .post-tr,
        #delform tr {
            margin-bottom: var(--marign-padding-18);
        }
        
        #delform .post-tr:hover .post-list {
            transition: var(--motion-2);
            box-shadow: var(--shadow-hot);
        }
        
        #ct>div>div.bm.bw0>div>div.tl {
            margin-bottom: 18px;
        }
        
        #uhd div {
            display: flex;
        }
        
        #uhd {
            display: flex;
            flex-direction: column;
        }
        
        .uhd-avatar img {
            border-radius: var(--border-radius-200);
        }
        
        .uhd-bottom {
            justify-content: space-between;
            margin: 18px 0;
        }
        
        .uhd-bottom .pipe {
            display: none;
        }
        
        .uhd-link {
            flex-direction: column;
            margin-left: 24px;
        }
        
        .uhd-link .mt {
            margin: 0;
        }
        
        .uhd-top {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
        }
        
        .u_profile tr,
        .u_profile {
            display: block !important;
        }
        
        .u_profile {
            color: var(--font-normal);
        }
        
        /*信息*/
        .pf_l {
            display: flex;
            flex-wrap: wrap;
            white-space: nowrap;
        }
        
        .pf_l a {
            color: var(--font-visit);
            font-weight: bold;
            white-space: nowrap;
        }
        
        .pf_l em {
            margin-right: 8px;
            white-space: nowrap;
        }
        
        .pf_l li {
            align-items: center;
            padding: 8px;
            background-color: var(--element-background);
            display: flex;
            width: fit-content;
            margin: 8px 8px 8px 0px;
            border-radius: var(--border-radius-10);
            box-shadow: var(--shadow-outline);
        }
        
        /*个人签名*/
        .bw0 table {
            display: block !important;
        }
        
        /**/
        .bw0>ul {
            margin-bottom: 18px;
        }
        
        .bw0>ul {
            display: flex;
            justify-content: left;
        }
        
        .bw0 h1 {
            margin-top: 0;
        }
        
        /* 分类和分页 */
        #thread_types,
        .mn-nav-right>.pg,
        .pg,
        .mn-search-bar-switch,
        .uhd-bottom>div,
        .bw0>ul,
        .duceapp_cv_ricon,
        .pwLogintype,
        .tab_regtype {
            height: var(--element-height-34);
            display: inline-flex;
            transition: var(--motion-2);
            border-radius: var(--border-radius-10);
            overflow: hidden;
            box-shadow: var(--shadow-outline);
        }
        
        /*个人设置左侧*/
        .appl ul {
            border-radius: var(--border-radius-10);
            overflow: hidden;
            margin-right: 34px;
            white-space: nowrap;
        }
        
        .appl ul li {
            box-shadow: var(--shadow-outline);
        }
        
        .appl h2 {
            margin-top: 0;
        }
        
        #thread_types>li>a,
        .mn-nav-right>.pg>a,
        .pg>a,
        .pgb>a,
        .mn-search-bar-switch>a,
        .uhd-bottom a,
        .bw0>ul a,
        .appl ul a,
        .duceapp_cv_ricon>span,
        .pwLogintype li,
        .tab_regtype {
            transition: var(--motion-2);
            display: flex;
            align-items: center;
            padding: var(--element-padding-0-10);
            background-color: var(--element-background);
            height: var(--element-height-34);
        }
        
        #thread_types>li>a {
            box-shadow: var(--shadow-outline);
        }
        
        .mn-nav-right>.pg>strong,
        .mn-nav-right>.pg>label,
        .pg>strong,
        .pg>label {
            display: flex;
            align-items: center;
            padding: var(--element-padding-0-10);
            background-color: var(--element-background);
        }
        
        .mn-nav-right>.pg>label span {
            color: var(--font-normal);
        }
        
        #thread_types>li>a:hover,
        .mn-nav-right>.pg>a:hover,
        .pgb>a:hover,
        .pg>a:hover,
        .mn-search-bar-switch>a:hover,
        .uhd-bottom a:hover,
        .bw0>ul a:hover,
        .appl ul a:hover,
        .duceapp_cv_ricon>span:hover,
        .pwLogintype li:hover,
        .tab_regtype:hover {
            background-color: var(--menu-hover-background);
        }
        
        #thread_types>li.xw1.a>a,
        .mn-nav-right>.pg>strong,
        .bw0>ul li.a>a,
        .appl ul li.a>a {
            background-color: var(--point);
        }
        
        #thread_types>li.xw1.a>a,
        .mn-nav-right>.pg>strong,
        .bw0>ul li.a>a,
        .appl ul li.a>a {
            color: var(--font-color-light);
        }
        
        .tbmu {
            font-size: 0;
            margin-bottom: var(--element-margin-bottom-18);
        }
        
        .tbmu .pipe {
            display: none;
        }
        
        /* 输入 */
        .mn-nav-right>.pg>label>input {
            width: 20px;
            color: var(--font-normal);
            padding: 4px;
            border-radius: var(--border-radius-2);
            background-color: var(--input-background);
            margin-right: 10px;
        }
        
        /*我的帖子下拉*/
        #filter_special_menu {
            background-color: var(--element-background);
            box-shadow: var(--shadow-hot);
            border-radius: var(--border-radius-10);
            overflow: hidden;
        }
        
        #filter_special_menu:hover {}
        
        #filter_special_menu ul {
            display: flex;
            flex-direction: column;
            justify-content: center;
        }
        
        #filter_special_menu ul li a {
            padding: var(--element-padding);
            display: flex;
            align-items: center;
        }
        
        #filter_special_menu ul li a:hover {
            background-color: var(--background-color);
        }
        
        /*订阅 收藏 管理 回收*/
        .subforum_left_title_right_up {
            margin-left: 0px !important;
        }
        
        .mn-nav-right-control-panel .icon {
            width: 2.4em !important;
            height: 2.4em !important;
        }
        
        .mn-nav-right-control-panel {
            flex-wrap: wrap;
            display: flex;
            flex-direction: row-reverse;
        }
        
        .mn-nav-right-control-panel div {
            display: flex;
        }
        
        .mn-nav-right-control-panel a {
            display: flex;
            justify-content: center;
        }
        
        .mn-nav-right-control-panel a .control-panel-tip {
            position: absolute;
            padding: var(--element-padding-0-10);
            margin-top: 40px;
            height: var(--element-height-34);
            background-color: var(--tip-background);
            border-radius: var(--border-radius-10);
            box-shadow: var(--shadow-hot);
            color: var(--font-color-light);
            align-items: center;
            display: none;
            z-index: 12;
            flex-wrap: nowrap;
        }
        
        .mn-nav-right-control-panel a:hover .control-panel-tip {
            display: flex;
        }
        
        /*返回按钮*/
        #pgt {
            display: none;
        }
        
        /*-----------------------------帖子nav----------------------*/
        /*banner*/
        .bm.bml.pbn img {
            width: 100%;
            border-radius: var(--border-radius-10);
            margin-bottom: 18px;
        }
        
        /*帖子类型*/
        #newspecial_menu {
            display: flex;
            flex-direction: column;
            border-radius: var(--border-radius-10);
            box-shadow: var(--shadow-hot);
            background-color: var(--point);
            overflow: hidden;
        }
        
        #newspecial_menu a {
            color: var(--font-second-light-aphal);
            font-size: var(--font-size-12);
            padding: var(--element-padding);
            display: flex;
        }
        
        #newspecial_menu a:hover {
            color: var(--font-color-light);
        }
        
        #mn-nav-parent .icon,
        #mn-nav-sort-parent .icon,
        #mn-nav-tag-parent .icon {
            width: 1.3em;
            height: 1.3em;
            margin-right: 2px;
            color: var(--icon-fill);
        }
        
        #mn-nav-parent .pg .icon {
            color: var(--icon-line);
        }
        
        #mn-nav-sort-parent .icon {
            color: var(--icon-line);
        }
        
        /*排序*/
        .subforum_subject_detail_text_up {
            display: none !important;
        }
        
        #mn-nav-sort-parent {
            margin-top: 40px;
            display: flex;
            justify-content: space-between;
        }
        
        .subforum_subject_detail2 {
            overflow: hidden;
            box-shadow: var(--shadow-outline);
            border-radius: var(--border-radius-10);
            background-color: var(--element-background);
        }
        
        
        #mn-nav-sort-parent div,
        #mn-nav-tag-parent div {
            align-items: center;
            height: var(--element-height-34);
            display: flex;
            flex-direction: row;
        }
        
        #mn-nav-sort-parent a {
            transition: .2s all;
            line-height: var(--element-height-34);
            padding: var(--element-padding-0-10);
        }
        
        #mn-nav-sort-parent a:hover {
            background-color: var(--background-color);
        }
        
        #mn-nav-sort-parent .active a {
            color: var(--font-color-light);
            background-color: var(--point);
        }
        
        #mn-nav-sort-parent .active a .icon {
            color: var(--icon-active)
        }
        
        div.subforum_subject_detail_text_down>div:first-child a {
            display: flex;
            align-items: center;
        }
        
        /*子版块*/
        #pgt+.subforum div {
            display: flex;
            align-content: center;
        }
        
        #pgt+.subforum img {
            height: 48px;
            border-radius: var(--border-radius-10);
            margin-right: 18px;
        }
        
        #pgt+.subforum .subforum_subject_title {
            display: none;
        }
        
        #pgt+.subforum .subforum_subject_detail {
            padding: var(--element-margin-bottom-18);
            background-color: var(--element-background);
            border-radius: var(--border-radius-10);
            margin-bottom: 18px;
            box-shadow: var(--shadow-outline);
            align-items: center;
        }
        
        .subforum {
            margin: 0 !important;
            display: flex;
        }
        
        .subforum_subject2 {
            display: none;
        }
        
        .suforum-symbol {
            display: flex;
            justify-content: center;
            flex-direction: column;
        }
        
        .subforum-info-tip {
            z-index: 15;
            position: absolute;
            padding: var(--element-padding);
            background-color: var(--tip-background);
            border-radius: var(--border-radius-10);
            color: var(--font-color-light);
            margin-top: var(--tip-margin-top-30);
            justify-content: center;
            display: none;
            box-shadow: var(--shadow-hot);
        }
        
        .subforum_right_title>div:hover .subforum-info-tip {
            display: flex;
        }
        
        #mn-nav-parent .subforum_right_title {
            color: var(--font-normal);
            display: flex;
            align-items: center;
            height: var(--element-height-34);
            background-color: var(--element-background);
            box-shadow: var(--shadow-outline);
            border-radius: var(--border-radius-10);
            padding: var(--element-padding-0-10);
        }
        
        .subforum_right_title>div {
            display: flex;
            margin-right: 8px;
        }
        
        /*-----版块tag------*/
        #mn-nav-tag-parent {
            margin-bottom: 40px;
        }
        
        #mn-nav-tag-parent div {
            height: auto;
        }
        
        #mn-nav-tag-parent .subforum_subject_detail2 {
            background: none;
            box-shadow: none;
            overflow: visible;
            border: none;
            margin-top: 22px !important;
        }
        
        #mn-nav-tag-parent .subforum_subject_detail_text_down {
        
            max-width: 1200px;
            flex-wrap: wrap;
        }
        
        #mn-nav-tag-parent .subforum_subject_detail_text_down a {
            transition: .2s all;
            box-shadow: var(--shadow-outline);
            border-radius: var(--border-radius-10);
            background-color: var(--element-background);
            margin: 0 10px 10px 0;
            height: var(--element-height-34);
            align-content: center;
            padding: var(--element-padding-0-10);
            flex-wrap: wrap;
            display: flex;
        }
        
        #mn-nav-tag-parent .subforum_subject_detail_text_down div.active a .post-tag-num {
            color: var(--element-background);
        }
        
        /*tag原始图标*/
        #mn-nav-tag-parent img {
            margin-right: 4px;
            border-radius: 4px;
            overflow: hidden;
        }
        
        .tag-tip {
            position: absolute;
            padding: var(--element-padding-0-10);
            height: var(--element-height-34);
            background-color: var(--tip-background);
            color: var(--font-color-light);
            border-radius: var(--border-radius-10);
            box-shadow: var(--shadow-hot);
            align-items: center;
            display: none;
            margin-top: var(--tip-margin-top-30);
        }
        
        #mn-nav-tag-parent>div>div.subforum_subject_detail_text_down>div>a {
            justify-content: center;
        }
        
        #mn-nav-tag-parent>div>div.subforum_subject_detail_text_down>div>a>span:first-child {
            display: flex;
            align-items: center;
        }
        
        #mn-nav-tag-parent>div>div.subforum_subject_detail_text_down>div>a:hover>.tag-tip {
            display: flex;
        }
        
        #mn-nav-tag-parent>div>div.subforum_subject_detail_text_down>div>a:hover {
            background-color: var(--background-color);
        }
        
        #mn-nav-tag-parent .subforum_subject_detail_text_down div.active a {
            background-color: var(--point) !important;
            color: var(--font-color-light);
        }
        
        #mn-nav-tag-parent .subforum_subject_detail_text_down div.active a .icon {
            color: black;
        }
        
        #mn-nav-tag-parent .subforum_subject_detail_text_down div.active .post-tag-name {
            color: var(--font-color-light);
        }
        
        /*版块规则*/
        #mn-nav-rule-parent {
            margin-top: 22px;
            display: flex;
            flex-direction: column;
        }
        
        #mn-nav-rule-switch {
            display: flex;
        }
        
        .ptn div,
        .ptn a {
            display: flex;
        }
        
        .ptn {
            display: flex;
            border-radius: var(--border-radius-10) var(--border-radius-10) 0 0;
            overflow: hidden;
            box-shadow: var(--shadow-outline);
        }
        
        /*隐藏*/
        div[id*="forum_rules"] #current-forum-rule {
            display: none;
        }
        
        #current-forum-rule a {
            color: var(--font-visit);
        }
        
        .ptn a,
        #current-forum-rule {
            padding: var(--element-padding);
            background-color: var(--element-background);
        }
        
        .ptn a:hover {
            background-color: var(--background-color);
        }
        
        .ptn a.active {
            background-color: var(--point);
            color: var(--font-color-light);
        }
        
        #current-forum-rule {
            border-radius: 0 var(--border-radius-10) var(--border-radius-10) var(--border-radius-10);
            margin-top: 0px !important;
            box-shadow: var(--shadow-outline);
            color: var(--font-normal);
        }
        
        /* ------------------列表------------------------ */
        /*新帖子提醒*/
        #forumnewshow {
            height: 0px;
            overflow: hidden;
            margin-bottom: 0px;
        }
        
        #forumnewshow a {
            color: var(--help-yellow-key);
            position: fixed;
            box-shadow: var(--shadow-hot);
            z-index: 112;
            top: 80px;
            left: 0;
            margin-left: 42vw;
            height: var(--element-height-34);
            display: flex;
            padding: var(--element-padding-0-10);
            background-color: rgb(253, 187, 45);
            align-items: center;
            border-radius: var(--border-radius-10);
        }
        
        #separatorline {
            overflow: hidden;
            height: 0px;
            margin-bottom: calc(30px - var(--marign-padding-18));
        }
        
        /*--隐藏原来的图标--*/
        .subforum_subject_detail2>a[href*="type=poll"],
        .bm.bw0.pgs.cl,
        .bm_c img[alt*="attach"],
        .bm_c img[alt*="agree"],
        .bm_c img[alt*="digest"],
        .lock .xi1,
        .new .xi1,
        .common .xi1,
        .new>em:first-child,
        .lock>em:first-child,
        .common>em:first-child,
        .common>a[href*="type=2"],
        .lock>a[href*="type=2"],
        .new>a[href*="type=2"],
        .common>em>a[href*="typeid"],
        .fromg,
        tr>div.post-list>div.post-list-left>div>div.lock>a:nth-child(3) {
            display: none;
        }
        
        .bm_c table .icon {
            width: 1.3em;
            height: 1.3em;
            color: var(--icon-line)
        }
        
        /*隐藏顶置*/
        .post-list a[class*="showhide"] {
            margin-right: 10px;
        }
        
        /*图标*/
        .post-info {
            margin-left: 10px;
        }
        
        .post-tps {
            color: var(--font-normal);
        }
        
        .bm_c table .post-info .icon {
            color: var(--icon-fill);
        }
        
        .post-list-left .symbol-icons,
        .post-list-right-l .symbol-icons {
            margin-right: 6px;
        }
        
        /*列表布局*/
        .bm_c table {
            display: flex;
            flex-direction: column;
        }
        
        /*子列表布局*/
        .newthread .post-tr .post-list{
            background-color:var(--help-yellow);
        }
        .darkmode-css .newthread .post-tr .post-list{
            background-color:var(--background-color);
        }
        
        .post-tr {
            margin-bottom: var(--marign-padding-18);
        }
        
        .post-tr:hover .post-list {
            transition: var(--motion-2);
            box-shadow: var(--shadow-hot);
        }
        
        .darkmode-css .post-tr:hover .post-list,
        .darkmode-css #delform .post-tr:hover .post-list {
            transition: var(--motion-2);
            box-shadow: var(--shadow-hot);
            background-color: var(--menu-hover-background);
        }
        
        .post-tr>div {
            background-color: var(--element-background);
            border-radius: var(--border-radius-10);
            box-shadow: var(--shadow-outline);
        }
        
        .post-tr,
        .post-list {
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 100%;
            height: var(--element-height-34);
        }
        
        .post-tr div {
            align-items: center;
            display: flex;
        
        }
        
        .post-tr>.post-list {
            padding: 0px 16px;
        }
        
        .post-list-by-member>a,
        .post-avatar {
            align-items: center;
            display: flex;
        }
        
        /**/
        .post-list-icn {
            padding: 0px 8px !important;
            height: var(--element-height-34);
            margin-right: 6px;
            white-space: nowrap;
        }
        
        .post-tr .post-list-icn .icon {
            color: var(--icon-fill);
        }
        
        .post-list-icn a {
            justify-content: center;
            display: flex;
        }
        
        
        /*隐藏不必要的字*/
        .post-list-common>div:nth-child(1) {
            font-size: 0px;
        }
        
        .post-list-common>a {
            line-height: var(--element-height-34);
            text-overflow: ellipsis;
            max-width: 640px;
            white-space: nowrap;
            overflow: hidden;
        }
        
        /* -- post tip---*/
        .post-list-tip a {
            color: var(--font-second-light-aphal);
        }
        
        /*版块暂时隐藏*/
        .post-list-tip {
            height: var(--element-height-34);
            display: none !important;
            margin-top: 40px;
            position: absolute;
            background-color: var(--tip-background) !important;
            box-shadow: var(--shadow-hot) !important;
        }
        
        
        
        /*阅读权限*/
        .post-lock,
        .post-join,
        .post-reward,
        .post-reply-reward,
        .post-new-post-tip {
            margin-right: 6px;
            font-size: var(--font-size-12);
            padding: 2px;
            border-radius: var(--border-radius-2);
            display: flex;
            background-color: var(--point);
            justify-content: center;
        }
        
        .post-lock span.symbol-icons+span {
            color: var(--font-point);
        }
        
        .post-join,
        .post-reward,
        .post-reply-reward {
            margin-right: 6px;
            background-color: var(--point-green);
        }
        
        .post-reward {
            background-color: var(--point-yellow);
        }
        
        .post-reply-reward {
            background-color: var(--point-orange);
        }
        
        .post-new {
            display: flex;
            justify-content: center;
            align-items: center;
        }
        
        /*提示全局*/
        .post-lock-tip,
        .post-join-tip,
        .post-reward-tip,
        .post-reply-reward-tip,
        .post-new-post-tip,
        .post-reply-tip {
            z-index: 11;
            padding: var(--element-padding-0-10);
            background-color: var(--tip-background);
            border-radius: var(--border-radius-10);
            margin-top: var(--tip-margin-top-30);
            display: none;
            flex-direction: row;
            position: absolute;
            height: var(--element-height-34);
            align-items: center;
            justify-content: center;
            box-shadow: var(--shadow-hot);
        }
        
        .post-lock:hover .post-lock-tip {
            color: var(--font-point);
            background-color: var(--point);
            display: flex;
        }
        
        .post-join:hover .post-join-tip {
            color: var(--font-normal);
            background-color: var(--point-green);
            display: flex;
        }
        
        .post-reward:hover .post-reward-tip {
            color: var(--font-normal);
            background-color: var(--point-yellow);
            display: flex;
        }
        
        .darkmode-css .post-reward:hover .post-reward-tip,
        .darkmode-css .post-reply-reward:hover .post-reply-reward-tip {
            color: black;
        }
        
        .post-reply-reward:hover .post-reply-reward-tip {
            color: var(--font-normal);
            background-color: var(--point-orange);
            display: flex;
        }
        
        .post-new:hover>.post-new-post-tip {
            color: var(--font-second-light-aphal);
            background-color: var(--tip-background);
            display: flex;
        }
        
        .post-reply-tip a,
        .post-reply-tip>span {
            margin-right: 4px;
            white-space: nowrap;
            color: var(--font-color-light);
            font-size: var(--font-size-12);
        }
        
        .post-reply-tip a:last-child {
            color: var(--font-second-light-aphal);
        }
        
        .post-list-num {
            justify-content: center;
        }
        
        .post-list-num span {
            color: var(--font-normal);
            flex-direction: row;
        }
        
        .post-list-num>span>a>span {
            color: var(--font-color-light);
        }
        
        .post-list-num:hover .post-reply-tip {
            z-index: 303;
            color: var(--font-second-light-aphal);
            background-color: var(--tip-background);
            display: flex;
        }
        
        .post-reply-tip>span:nth-child(1) {
            color: var(--font-point-second-title);
        }
        
        /*tps*/
        .common .tps {
            display: none;
        }
        
        .post-tps a {
        
            margin-right: 4px;
        }
        
        /*悬赏*/
        /* 头像 */
        .post-avatar>img {
            margin-right: 10px;
            width: 18px;
            height: 18px;
            border-radius: var(--border-radius-200);
        }
        
        .post-list-right-l>div {
            margin-left: 10px;
        }
        
        .post-list-right em {
            font-style: normal;
        }
        
        /*总回复*/
        .post-list-num em {
            display: none;
        }
        
        /*最后回复*/
        .post-list-last-comment {
            display: none !important;
        }
        
        .post-list-time {
            color: var(--font-second-aphal);
        }
        
        .post-list-time .xi1 {
            color: var(--font-normal);
        }
        
        /*------会员卡片------*/
        .p_opt div {
            display: flex;
            flex-wrap: wrap;
        }
        
        .p_opt {
        
            min-width: 160px;
            background-color: var(--background-color);
            border-radius: var(--border-radius-10);
            box-shadow: var(--shadow-hot);
            padding: var(--element-padding);
        }
        
        div[class*="card_gender"] .o.cl a {
        
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }
        
        div[class*="card_gender"] .icon {
            transition: .2s all;
            width: 1.6em;
            height: 1.6em;
            margin-right: 10px;
        }
        
        div[class*="card_gender"] .user-card-tip {
            position: absolute;
            margin-top: 40px;
            display: none;
            background-color: var(--tip-background);
            height: var(--element-height-34);
            padding: var(--element-padding-0-10);
            border-radius: var(--border-radius-10);
            box-shadow: var(--shadow-hot);
            align-items: center;
            color: var(--font-color-light);
            white-space: nowrap;
            flex-direction: row;
        }
        
        div[class*="card_gender"] a:hover .user-card-tip {
            display: flex;
        }
        
        .card_mn {
            width: 100%;
            display: flex;
        }
        
        .avt {
            margin-right: 10px;
        }
        
        .avt a img,
        .avt a {
            height: 48px;
            width: 48px;
            border-radius: var(--border-radius-200);
            overflow: hidden;
        }
        
        .avt a img:focus {
            border: none;
            outline: none;
        }
        
        .o.cl {
            position: absolute;
            margin-top: 24px;
            margin-left: 58px;
        }
        
        .pbn.cl {
            display: flex;
            flex-direction: row-reverse;
        }
        
        .pbn.cl span,
        .pbn.cl strong {
            margin-right: 10px;
        }
        
        /*-----------------------快速发帖-------------------*/
        /*无权发帖*/
        .premission-tip {
            color: var(--font-normal);
        }
        
        .premission-tip a {
            color: var(--font-visit);
        }
        
        #f_pst {
            width: var(--body-width);
            --pst-width: 920px;
        }
        
        #f_pst .pipe {
            display: none;
        }
        
        #f_pst div {
            display: flex;
            flex-wrap: wrap;
        }
        
        .avatar.avtm img {
            border-radius: var(--border-radius-200);
            overflow: hidden;
            position: absolute;
        
            margin-left: -120px;
            margin-top: -205px;
            width: 80px;
        }
        
        #fastpostform>table>tbody>tr>td.plc>div:nth-child(11),
        label[for*="fastpostrefresh"] {
            display: block;
            color: var(--font-normal);
        }
        
        #fastpostform>table>tbody>tr>td.plc>div:nth-child(11) a {
            color: var(--font-visit);
        }
        
        #fastpostform {
            background-color: var(--element-background);
            box-shadow: var(--shadow-outline);
            border-radius: var(--border-radius-10);
            padding: var(--element-margin-bottom-18);
        }
        
        #fastsmilies div {
            display: flex;
        }
        
        _pst .cl {
            justify-content: flex-end;
            flex-direction: column;
        }
        
        .pbt {
            flex-direction: row-reverse !important;
            justify-content: flex-end;
        }
        
        #f
        
        /*快速图标栏&高级模式*/
        #f_pst .bar {
            height: var(--element-height-34);
        }
        
        #f_pst .bar {
            margin: 8px 0px;
            align-items: center;
            justify-content: space-between;
        }
        
        #f_pst .bar .icon {
            width: 1.8em;
            height: 1.8em;
        }
        
        .darkmode-css #f_pst .bar .icon {
            color: var(--icon-line);
        }
        
        #f_pst .tedt {
            flex-direction: column;
        }
        
        #f_pst .area {
            justify-content: end;
        }
        
        /**/
        .forumrowdata {
            margin-bottom: var(--element-margin-bottom-18);
        }
        
        .forumrowdata a {
            color: var(--point);
        }
        
        /*主题选择*/
        #subject,
        #fastpostmessage,
        #pollm_c_1 input,
        .sadd input,
        #postbox input {
            overflow: hidden;
            background-color: var(--input-post-background);
            border-radius: var(--border-radius-10);
            color: var(--font-normal);
        }
        
        
        #fastpostmessage {
            padding: var(--element-margin-bottom-18);
            min-height: calc(var(--element-height-34) * 3);
            width: var(--pst-width) !important;
        }
        
        #fastpostform .cl {
            flex-direction: column;
        }
        
        #subject,
        #postbox input {
            height: var(--element-height-34);
            padding: var(--element-padding-0-10);
        }
        
        /*验证码*/
        .mtm.sec,
        #seccheck_fastpost {
            padding: var(--element-margin-bottom-18);
            align-items: center;
            color: var(--font-normal);
        }
        
        input[id*="seccodeverify"] {
            background-color: var(--input-post-background);
            box-shadow: var(--shadow-outline);
            border-radius: var(--border-radius-10);
            height: var(--element-height-34);
            padding: var(--element-padding-0-10);
            margin: 0 10px;
            color: var(--font-normal);
        }
        
        span[id*="checkseccodeverify"] {
            display: flex;
            position: absolute;
            align-items: center;
            margin-top: -24px;
            margin-left: 240px;
        }
        
        /*表情*/
        #fastsmilies,
        #smilies_preview {
            position: absolute;
            margin-left: calc(var(--pst-width) + 55px);
        }
        
        #smilies_preview {
            display: none;
            position: absolute !important;
            left: calc(1200px) !important;
        }
        
        #fastsmilies>table>tbody>tr {
            padding: 2px;
        }
        
        #fastsmilies>table>tbody>tr td {
            padding: 2px;
            border-radius: var(--border-radius-10);
        }
        
        #fastsmilies>table>tbody>tr td:hover {
            background-color: var(--background-color);
        }
        
        /*表情弹窗*/
        #fastpostsml_menu,
        #e_sml_menu,
        #sendsml_menu {
            display: flex;
            padding: var(--element-margin-bottom-18);
            background-color: var(--element-background);
            border-radius: var(--border-radius-10);
            box-shadow: var(--shadow-hot);
            width: auto;
        }
        
        #fastpostsmiliesdiv_tb,
        #smiliesdiv_tb,
        #sendsmiliesdiv_tb {
            flex-wrap: wrap;
            display: flex;
        }
        
        #fastpostsmiliesdiv_tb ul,
        #smiliesdiv_tb ul,
        #sendsmiliesdiv_tb ul {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
        }
        
        #fastpostsmiliesdiv_tb ul li,
        #smiliesdiv_tb ul li,
        #sendsmiliesdiv_tb ul li {
            padding: 8px;
            display: flex;
            flex-wrap: nowrap;
            border-radius: var(--border-radius-10);
        }
        
        #fastpostsmiliesdiv_tb ul li:hover,
        #smiliesdiv_tb ul li:hover,
        #sendsmiliesdiv_tb ul li:hover {
            background-color: var(--background-color);
        }
        
        #fastpostsmiliesdiv_page,
        #smiliesdiv_page,
        #sendsmiliesdiv_page {
            display: flex;
            align-items: center;
        }
        
        #fastpostsmiliesdiv_data,
        #smiliesdiv_data,
        #sendsmiliesdiv_data {
            padding: 10px;
        }
        
        #fastpostsmiliesdiv_table td,
        #smiliesdiv_data td,
        #sendsmiliesdiv_data td {
            padding: 2px;
            border-radius: var(--border-radius-10);
        }
        
        
        #fastpostsmiliesdiv_page .z,
        #smiliesdiv_page .z,
        #sendsmiliesdiv_page .z {
            display: flex;
            position: absolute;
            margin-left: 40px;
        }
        
        #fastpostsmiliesdiv_page .z a,
        #smiliesdiv_page .z a,
        #sendsmiliesdiv_page .z a {
            padding: 10px;
            border-radius: var(--border-radius-10);
        }
        
        #fastpostsmiliesdiv_page .z a:hover,
        #fastpostsmiliesdiv_table td:hover,
        #smiliesdiv_data td:hover,
        #sendsmiliesdiv_table td:hover {
            background-color: var(--background-color);
        }
        
        .darkmode-css .fpd .icon,
        .darkmode-css .webuploader-pick .icon {
            color: var(--icon-line);
        }
        
        .fpd {
            position: absolute;
        }
        
        .fpd a {
            margin-right: 8px;
            display: flex;
            justify-content: center;
        }
        
        #fastposteditor>div>div.bar>span>a span.editor-tip,
        .webuploader-pick span.editor-tip,
        .fpd a>span.editor-tip,
        #e_body .editor-tip,
        #fastpostform>div.pbt.cl>span,
        #subjectchk {
            z-index: 11;
            position: absolute;
            padding: var(--element-padding-0-10);
            height: var(--element-height-34);
            background-color: var(--tip-background);
            border-radius: var(--border-radius-10);
            color: var(--font-color-light);
            display: none;
            align-items: center;
            box-shadow: var(--shadow-hot);
            margin-top: 40px;
            white-space: nowrap;
        }
        
        .webuploader-pick {
            text-indent: initial !important;
            justify-content: center;
        }
        
        #fastposteditor>div>div.bar>span>a:hover span.editor-tip,
        #spanButtonPlaceholder:hover span.editor-tip,
        .fpd a:hover>span.editor-tip,
        #e_controls a[id^="e_"]:hover>span.editor-tip {
            display: flex;
            cursor: pointer;
        }
        
        #spanButtonPlaceholder {
            cursor: pointer;
            display: flex;
            width: auto;
            height: auto;
            overflow: visible;
            background: none;
        }
        
        #subject:focus+span,
        #subject:focus #subjectchk {
            display: flex !important;
        }
        
        /*上传附件*/
        div[id*="rt_rt_"] {
            position: absolute !important;
            top: auto !important;
            left: auto !important;
            width: auto !important;
            height: auto !important;
            overflow: visible !important;
            opacity: 0;
        }
        
        div[id*="rt_rt_"] input {
            display: flex;
            width: 25px;
            height: 25px;
        }
        
        /*高级模式*/
        .bar .y {
            display: flex;
        }
        
        /*主题*/
        #fastposteditor>div>div.bar>span>a {
            margin-left: var(--pst-width);
            display: flex;
            justify-content: center;
        }
        
        #typeid_fast_ctrl,
        #typeid_ctrl,
        .pn,
        #polloption_hidden+p,
        #pollm_c_1 .d {
            cursor: pointer;
            display: inline-flex;
            width: auto !important;
            padding: var(--element-padding-0-10);
            background-color: var(--point);
            height: var(--element-height-34);
            align-items: center;
            border-radius: var(--border-radius-10);
            color: var(--font-color-light);
            margin-left: 18px;
            ;
        }
        
        #typeid_ctrl {
            margin: 0;
        }
        
        #polloption_hidden+p {
            margin-top: 8px;
        }
        
        #polloption_hidden+p a {
            color: var(--font-point);
        }
        
        #typeid_fast_ctrl_menu,
        #typeid_ctrl_menu {
            background-color: var(--point);
            border-radius: var(--border-radius-10);
            box-shadow: var(--shadow-hot);
            width: auto !important;
            display: flex;
            padding-top: 10px;
        }
        
        #typeid_fast_ctrl_menu>ul>li,
        #typeid_ctrl_menu>ul>li {
            display: flex;
            padding: var(--element-padding-0-10);
            height: var(--element-height-34);
            color: var(--font-second-light-aphal);
            cursor: pointer;
        }
        
        #typeid_fast_ctrl_menu>ul>li:hover,
        #typeid_ctrl_menu>ul>li:hover {
            color: var(--font-color-light);
        }
        
        /*规则*/
        #fastpostform>div:nth-child(8) {
            display: flex;
            flex-flow: wrap;
            color: var(--font-normal);
        }
        
        #fastpostform>div:nth-child(8) a {
            color: var(--font-visit);
        }
        
        #fastpostform>div:nth-child(8) br {
            display: none;
        }
        
        /*无法访问*/
        .f_c.altw {
            height: calc(100vh - 478px);
            border-radius: var(--border-radius-10);
        }
        
        .f_c.altw p {
            font-size: 18px;
            font-weight: bold;
            color: var(--font-normal);
        }
        
        .f_c.altw a {
            color: var(--font-visit);
        }
        
        /*底部下一页*/
        #photo-next,
        #autopbn,
        .pgbtn>a {
            max-width: 60px;
            color: var(--font-color-light);
            height: var(--element-height-34);
            font-size: var(--font-size-12);
            display: flex;
            justify-content: center;
            align-items: center;
            padding: var(--element-padding-0-10);
            background-color: var(--point);
            margin-right: var(--marign-padding-18);
            border-radius: var(--border-radius-10);
            margin-bottom: var(--marign-padding-18);
            cursor: pointer;
        }
        
        /*-------------帖子内容-----------------------------------*/
        /*全局*/
        #postlist>[id^="post_"],
        #postlistreply {
            display: flex;
            flex-direction: column;
            margin-bottom: 18px;
            align-items: flex-end;
            justify-content: flex-end;
            --post-right-width: 1012px;
            width: var(--body-width);
        }
        
        
        /*表情全局*/
        #postlist>[id^="post_"] img[src*="smiley"],
        #postlistreply img[src*="smiley"] {
            width: 60px;
        }
        
        /*大猫*/
        #postlist>[id^="post_"] img[src*="smiley/steamcn_8"],
        #postlistreply img[src*="smiley"] {
            width: 80px;
        }
        
        
        /*icon 全局*/
        .authi .icon,
        .steam-name .icon,
        .post-bottom .icon,
        .favatar-info-title .icon {
            width: 1.4em;
            height: 1.4em;
            margin-right: 4px;
            color: var(--icon-line);
        }
        
        .favatar-info-title .icon {
            margin-right: 10px;
        }
        
        .fastre .icon {
            color: var(--icon-fill);
        }
        
        
        .post-user-card {
            position: sticky;
            top: 10px;
            align-self: flex-start;
            margin-right: 8px;
        }
        
        .post-top {
            display: flex;
        }
        
        .post-content {
            width: var(--post-right-width);
            background-color: var(--element-background);
            border-radius: var(--border-radius-10);
            box-shadow: var(--shadow-outline);
            overflow: hidden;
            padding-bottom: 50px;
        }
        
        /*hide 前端太渣*/
        #mn-content-title+#mn-nav-parent>div.mn-nav-right>div.mn-nav-right-control-panel>div:nth-child(1),
        #mn-content-title+#mn-nav-parent>div.mn-nav-right>div.mn-nav-right-control-panel>div:nth-child(2) {
            display: none;
        }
        
        table[id*="pid"],
        table[id*="pid"] tr,
        table[id*="pid"] td,
        table[id*="pid"]>tbody {
            display: flex;
            position: sticky;
            justify-content: space-between;
            max-width: var(--body-width);
        }
        
        /*回帖奖励信息*/
        #pl_top {
            display: flex;
            background-color: var(--element-background);
            height: var(--element-height-34);
            align-items: center;
            padding: var(--element-padding-0-10);
            border-radius: var(--border-radius-10);
            box-shadow: var(--shadow-outline);
            margin-bottom: 18px;
        }
        
        #mn-content-title a {
            padding: 8px 0;
            font-size: 18px;
            color: var(--font-normal);
        }
        
        #mn-content-title a:last-child {
            margin-left: 18px;
            color: var(--font-second-aphal);
        }
        
        div[id*="favatar"] {
            display: flex;
            width: 180px;
            flex-direction: column;
            background-color: var(--element-background);
            border-radius: var(--border-radius-10);
            box-shadow: var(--shadow-outline);
            overflow: hidden;
        }
        
        .favatar-avatar img {
            display: flex;
            border-radius: var(--border-radius-10);
        }
        
        .favatar-top {
            display: flex;
            flex-direction: column;
            justify-content: center;
        }
        
        .favatar-status {
            color: var(--font-normal);
        }
        
        .favatar-avatar {
            margin: var(--element-margin-bottom-18);
            display: flex;
            justify-content: center;
        }
        
        /*勋章*/
        .darkmode-css .favatar-bottom {
            opacity: .85;
        }
        
        .favatar-name,
        .favatar-status {
            padding: 4px 20px;
        }
        
        /*-积分信息-*/
        .favatar-mid {
            padding: 8px 0;
            color: var(--font-normal);
        }
        
        .favatar-mid span,
        .favatar-mid a {
            font-size: var(--font-size-12);
        }
        
        .favatar-mid .icon {
            color: var(--icon-fill);
        }
        
        .favatar-mid>div,
        .favatar-info-title {
            display: flex;
            flex-direction: row;
            align-items: center;
        }
        
        .favatar-mid>div {
            justify-content: space-between;
            padding: 4px 20px;
        }
        
        
        .favatar p {
            margin-block-start: 0px;
            margin-block-end: 0px;
        }
        
        /*勋章提示*/
        #ct>[id^="md_"] {
            margin-top: -10px;
            margin-left: 10px;
        }
        
        #ct>[id^="md_"] .tip_c {
            color: var(--help-yellow-key);
            background-color: var(--context-yellow);
            display: flex;
            box-shadow: var(--shadow-hot);
            padding: 0 18px;
            border-radius: var(--border-radius-10);
            align-items: center;
        }
        
        .darkmode-css #ct>[id^="md_"] .tip_c h4 {
            color: black;
            margin-right: 8px;
        }
        
        /*-----内容-----*/
        .pcb {
            display: inline-block;
            flex-direction: column;
            padding: 0 30px;
        }
        
        /*帖子*/
        td[id*="postmessage"] {
            display: block;
            flex-direction: column;
        }
        
        .post-content-top {
            display: flex;
            justify-content: space-between;
        }
        
        /*顶部栏*/
        .post-content-top {
            display: flex;
            align-items: center;
            justify-content: space-between;
            flex-direction: row;
            padding: 8px 10px;
        }
        
        .post-content-top-left,
        .post-content-top-right {
            display: flex;
        }
        
        .post-content-top-right strong {
            margin-right: 8px;
        }
        
        .post-content-top-right {
            flex-direction: row-reverse;
            align-items: center;
        }
        
        /*楼层*/
        .post-content-top-right strong em {
            font-style: normal
        }
        
        /*电梯*/
        /*一楼*/
        #fj+strong {
            margin-right: 8px;
        }
        
        #fj,
        #fj label {
            display: flex;
            margin-right: 8px;
            color: var(--font-normal);
        }
        
        #fj input {
            display: flex;
            width: 20px;
            color: var(--font-normal);
            padding: 4px;
            border-radius: var(--border-radius-2);
            background-color: var(--input-background);
            margin-right: 10px;
        }
        
        .repcn_bad {
            color: var(--help-red-key);
        }
        
        .repcn_good {
            color: var(--help-green-key)
        }
        
        .darkmode-css .repcn_bad {
            color: var(--help-red);
        }
        
        .darkmode-css .repcn_good {
            color: var(--help-green);
        }
        
        /**/
        .authi [id*="authicon"] {
            border-radius: 2px 6px 0 6px;
        }
        
        .authi,
        .authi em,
        .authi a,
        .pi strong a {
            font-size: var(--font-size-12);
            transition: .2s all;
            font-style: normal;
            color: var(--font-normal);
            display: flex;
            align-items: center;
            padding: 8px 10px;
            border-radius: var(--border-radius-10);
        }
        
        .authi span.xg1 {
            color: var(--font-second-aphal);
            margin-right: 8px;
            display: flex;
        }
        
        .authi span.xg1>span:first-child {
            display: none;
        }
        
        .authi a:hover {
            background-color: var(--body-background);
        }
        
        
        /*steam信息*/
        .steam_connect_user_bar {
            margin-left: 30px;
            margin-right: 30px;
            margin-bottom: 18px;
        }
        
        .steam_connect_user_bar,
        .steam-name {
            font-size: var(--font-size-12);
            display: inline-flex;
            height: var(--element-height-34);
            color: var(--font-normal);
            border-radius: var(--border-radius-10);
            overflow: hidden;
            align-items: center;
        }
        
        .steam_connect_user_bar a,
        .steam-name {
            transition: .2s all;
            padding: 10px;
            font-size: var(--font-size-12);
            background-color: var(--body-background);
        }
        
        .steam_connect_user_bar a:hover,
        .steam-name:hover {
            background-color: var(--input-background);
        }
        
        /*个性签名*/
        .post-content-sign {
            margin: 18px 30px 0px 30px;
            max-height: 200px;
            border-radius: var(--border-radius-2);
            overflow: hidden;
        }

        .post-content-sign *{
            line-height: normal;
        }
        
        /*悬赏提示*/
        .rusld {
            padding: 8px;
            background-color: var(--point-yellow);
            margin-bottom: 8px;
            border-radius: var(--border-radius-10);
        
        }
        
        .rusld cite {
            font-weight: bold;
            margin-right: 8px;
        }
        
        .post-content-sign img {
            border-radius: 0 !important;
            max-width: 1012px;
        }
        
        /*回复支持道具*/
        #favoritenumber {
            margin-left: 4px;
        }
        
        .post-bottom i img {
            display: none;
        }
        
        .post-bottom .icon {
            margin-right: 4px;
        }
        
        .post-bottom i {
            font-style: normal;
        }
        
        .post-bottom {
            padding: 8px;
            width: var(--post-right-width);
            display: flex;
            justify-content: flex-end;
            align-items: center;
            position: absolute;
        }
        
        .post-bottom>a {
            transition: .2s all;
            display: flex;
            align-items: center;
            height: var(--element-height-34);
            padding: var(--element-padding-0-10);
            background-color: var(--element-background);
            border-radius: var(--border-radius-10);
            font-size: var(--font-size-12);
        }
        
        .post-bottom a:hover {
            background-color: var(--background-color);
        }
        
        .pgbtn+.pgs.mtm.mbm.cl,
        #modactions+.pgs.mtm.mbm.cl {
            display: none;
        }
        
        /*道具列表*/
        .post-bottom ul[id*="mgc_post_"] {
            display: flex;
            left: 0px !important;
            top: 0 !important;
            margin-left: 890px;
            margin-top: 30px;
            box-shadow: var(--shadow-hot);
            flex-direction: column;
            border-radius: var(--border-radius-10);
            overflow: hidden;
        }
        
        .post-bottom ul[id*="mgc_post_"] a[id^="a_"] {
            display: flex;
            align-items: center;
            color: var(--font-normal);
            height: var(--element-height-34);
            background-color: var(--background-color);
            padding: var(--element-padding-0-10);
        }
        
        .darkmode-css .post-bottom ul[id*="mgc_post_"] a[id^="a_"] {
            background-color: var(--body-background);
        }
        
        .post-bottom ul[id*="mgc_post_"] a[id^="a_"]:hover {
            background-color: var(--input-background);
        }
        
        /*----内容渲染---*/
        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
            color: var(--font-normal);
        }
        
        h3.psth,
        xs1 {
            display: none;
        }
        
        .rnd_ai_pr {
            position: absolute;
            border-radius: var(--border-radius-10);
            overflow: hidden;
            box-shadow: var(--shadow-hot);
            margin-left: 1000px !important;
            height: 240px;
            margin-top: -65px;
        }
        
        [id^="postmessage_"] {
            color: var(--font-normal);
        }
        
        [id^="postmessage_"] a,
        #copyright a {
            color: var(--font-visit);
        }
        
        /*密码*/
        .locked {
            margin: 10px 0;
            color: var(--help-yellow-key);
            background-color: var(--help-yellow);
            border: 2px dashed var(--help-yellow-key);
            padding: 8px;
        }
        
        .locked input,
        .locked button {
            border-radius: var(--border-radius-2);
            height: var(--element-height-34);
            margin: 0 8px;
            background-color: var(--help-yellow-key);
            color: var(--help-yellow);
            padding: 0 8px;
        }
        
        .locked button {
            cursor: pointer;
        }
        
        .showhide {
            margin: 10px 0;
            color: var(--help-yellow-key);
            border: 2px dashed var(--help-yellow-key);
            padding: 8px;
        }
        
        .darkmode-css .showhide {
            border-color: var(--font-visit);
        }
        
        .darkmode-css .showhide p {
            color: var(--font-normal)
        }
        
        /*附件图片*/
        .mbn {
            display: inline-block;
        }
        
        .mbn a {
            border-radius: var(--border-radius-2);
            background-color: var(--point);
            color: var(--font-point);
        }
        
        .mbn a,
        .mbn em {
            font-style: normal;
            padding: 6px 10px;
            ;
            font-size: var(--font-size-12);
        }
        
        img[id*="aimg_"] {
            margin: 8px 0;
            border-radius: var(--border-radius-2);
        }
        
        /*图片提示*/
        [id^="postmessage_"] .tip_4,
        .attnm+.tip_4 {
            font-size: var(--font-size-12);
            color: var(--help-blue);
            background-color: var(--point);
            display: flex;
            box-shadow: var(--shadow-hot);
            padding: 8px;
            border-radius: var(--border-radius-10);
            align-items: center;
            margin-bottom: 8px;
        }
        
        [id^="postmessage_"] .tip_4 a {
            color: var(--font-color-light);
            padding: 0 8px;
        }
        
        .mbn.savephotop img {
            margin-top: 3px;
            border-radius: 0 0 2px 2px;
        }
        
        .quote {
            transition: .2s all;
            margin: 8px 0;
            padding: 10px;
            background-color: var(--quote);
            border-radius: var(--border-radius-10);
            box-shadow: var(--shadow-outline);
        }
        
        .quote:hover {
            box-shadow: var(--shadow-hot);
        }
        
        .darkmode-css .quote:hover {
            box-shadow: var(--shadow-outline);
            background-color: var(--input-background);
        }
        
        .quote:before {
            content: '“';
            font-size: 48px;
            position: absolute;
            margin: 0px 0 0 -20px;
        }
        
        blockquote {}
        
        .modact {
            padding: 8px;
        }
        
        #copyright {
            background-color: var(--background-color);
        }
        
        #copyright p {
            color: var(--font-normal)
        }
        
        /*加分*/
        [id*="ratelog_"] {
            margin-left: -30px;
            display: inline-flex;
            padding: 30px;
            background-color: var(--context-yellow);
            border-radius: 0 10px 10px 0
        }
        
        [id*="ratelog_"] dd {
            display: inline-flex;
        }
        
        [id*="ratelog"] img {
            border-radius: var(--border-radius-200);
            width: 18px;
            height: 18px;
            margin-right: 8px;
        }
        
        [id*="ratelog_"] .xw1,
        [id*="ratelog_"] .xw1 a {
            color: var(--help-yellow-key);
        }
        
        [id*="ratelog_"] .xw1 a .icon {
            width: 1.8em;
            height: 1.8em;
            margin-left: -8px;
            margin-right: 8px
        }
        
        [id*="ratelog_"] .xw1 a {
            display: flex;
            align-items: center;
        }
        
        [id*="ratelog_"] i {
            font-style: normal;
        }
        
        [id*="ratelog"] tbody:first-child th {
            height: 48px;
        }
        
        [id*="ratelog_"] span {
            color: var(--font-normal);
        }
        
        .darkmode-css [id*="ratelog_"] span,
        [id*="ratelog_"] a {
            color: #2c2c2c;
            white-space: nowrap;
        }
        
        [id^="rate_"] td:nth-child(1) {
            display: flex;
        }
        
        [id*="ratelog_"] th:last-child a {
            display: none;
        }
        
        .ratc {
            margin-top: 17px;
        }
        
        [id*="ratelog_"] [id^="rate_"] td:nth-child(1) {
            display: flex;
            height: 24px;
            align-items: center;
        }
        
        /*目录*/
        #threadindex {
            position: sticky;
            align-self: flex-start;
            top: 10px;
            max-height: 600px;
            overflow: hidden;
            margin-left: 8px;
            margin-right: -188px;
            width: 180px;
            border-radius: var(--border-radius-10);
        }
        
        #threadindex .tindex {
            background-color: var(--element-background);
            box-shadow: var(--shadow-outline);
            padding: 0 26px 10px 10px;
            font-size: var(--font-size-12);
            width: 180px;
            max-height: 600px;
            overflow-x: hidden;
            overflow-y: auto;
        }
        
        .tindex ul {
            padding-right: 18px;
            display: inline-flex;
            flex-direction: column;
        }
        
        .tindex li {
            width: fit-content;
            transition: .2s all;
            color: var(--font-normal);
            border-radius: var(--border-radius-10);
            display: inline-flex;
            padding: 8px;
            align-items: center;
            cursor: pointer;
        }
        
        .tindex li:hover {
            background-color: var(--background-color);
        }
        
        .tindex li.post-index-active {
            background-color: var(--point);
            color: var(--font-point);
        }
        
        .cm h3 {
            display: inline-flex;
            font-size: var(--font-size-12);
            padding: 10px;
            background: var(--context-reward);
            margin: 0px 0px 18px 0px;
            border-radius: 0 var(--border-radius-10) var(--border-radius-10) 0;
            color: var(--help-yellow-key);
        }
        
        /*最后编辑*/
        .pstatus {
            margin: 18px 0 18px 30px;
            display: inline-flex;
            align-items: center;
            font-style: normal;
            color: var(--font-point);
            background-color: var(--point);
            padding: 0 18px;
            height: var(--element-height-34);
            border-radius: var(--border-radius-10);
        }
        
        /*机遇*/
        .psth.xs1.ple {
            border-radius: 0 var(--border-radius-10) var(--border-radius-10) 0;
            color: var(--point);
            display: inline-block;
            margin: 18px 0;
            margin-left: -30px;
            padding: 8px 8px 8px 30px;
        }
        
        .darkmode-css .psth.xs1.ple {
            opacity: .8;
        }
        
        .darkmode-css .psth.xs1.ple a {
            color: var(--point)
        }
        
        /*steam info*/
        .steam-info-wrapper {
            position: absolute;
            box-shadow: var(--shadow-hot);
            border-radius: var(--border-radius-10);
        }
        
        .steam-info-wrapper iframe {
        
            height: 100%;
            width: 100%;
        }
        
        /*有目录的内容*/
        #threadindex+script+table {
            background-color: #f4f4f4;
            box-shadow: var(--shadow-outline);
        }
        
        /*点评*/
        [id^="comment_"] {
            background-color: var(--background-color);
            box-shadow: var(--shadow-outline);
            padding: 8px 0;
            margin: 34px 0;
            border-radius: var(--border-radius-10);
        }
        
        [id^="comment_"]:before {
            position: absolute;
            content: '';
            width: 0px;
            height: 0px;
            border: 20px solid var(--background-color);
            border-right-color: #0000;
            border-top-color: #0000;
            border-left-color: #0000;
            border-radius: 10px;
            margin-top: -43px;
            margin-left: 20px;
        }
        
        [id^="comment_"] .pstl.xs1.cl {
            padding: 10px;
            ;
        }
        
        [id^="comment_"] .psth.xs1 {
            color: var(--help-yellow-key);
            margin-bottom: 10px !important;
        }
        
        .psta.vm {
            display: flex;
            align-items: center;
            margin-bottom: 8px;
        }
        
        .psta.vm a img {
            width: 28px;
            height: 28px;
            border-radius: var(--border-radius-200);
            margin-right: 8px;
        }
        
        [id^="comment_"] .psti {
            color: var(--font-normal);
        }
        
        /*附件*/
        .tattl {
            display: inline-flex;
            align-items: center;
        
            padding: 18px;
            border-radius: var(--border-radius-10);
            border: 2px dashed var(--background-color);
        }
        
        .tattl p {
            color: var(--font-normal);
        }
        
        .attnm+.tip_4 p {
            color: var(--font-color-light);
        }
        
        .attnm a {
            color: var(--font-visit);
        }
        
        /*渲染论坛代码*/
        .blockcode [id^="code_"] {
            margin-top: 18px;
            padding: 18px;
            border-radius: 10px 10px 10px 0;
            background-color: var(--code-background);
        }
        
        .blockcode [id^="code_"]+em {
            font-style: normal;
            font-size: var(--font-size-12);
            display: inline-flex;
            border-radius: 0px 0px 10px 10px;
            background-color: var(--code-copy-background);
            padding: 8px;
            color: var(--code-copy-font);
            margin-bottom: 18px;
            cursor: pointer;
        }
        
        .blockcode li {
            color: var(--code-copy-font)
        }
        
        .blockcode .post-code-sb {
            color: var(--code-copy-sb);
        }
        
        /*表格*/
        .creditl+table>caption {
            width: calc(var(--body-width) - 166px);
        }
        
        .creditl+table td,
        .exfm+table td,
        .bw0+table td,
        .tdats table td,
        #ct>div.mn>div>table td {
            white-space: nowrap;
        }
        
        .creditl+table tr:nth-child(2n),
        .exfm+table tr:nth-child(2n),
        .bw0+table tr:nth-child(2n),
        .tdats table tr:nth-child(2n),
        #ct>div.mn>div>table tr:nth-child(2n) {
            background-color: var(--element-background);
        }
        
        .t_table,
        .creditl+table,
        .exfm+table,
        .bw0+table,
        .tdats table,
        #ct>div.mn>div>table {
            color: var(--font-normal);
            margin: 18px;
            border-radius: var(--border-radius-10);
            overflow: hidden;
            border: 1px solid var(--table-line);
        }
        
        .t_table td,
        .creditl+table td,
        .exfm+table td,
        .bw0+table td,
        .tdats table td,
        #ct>div.mn>div>table table td {
            padding: 8px;
            box-shadow: 0 0 1px var(--table-line);
        }
        
        .t_table tr:nth-child(2n) {
            background-color: var(--table-tr-2n);
        }
        
        /*关闭*/
        #warn_closed {
            padding: 18px;
            border-radius: var(--border-radius-10);
            margin-bottom: 18px !important;
        }
        
        .darkmode-css #warn_closed {
            opacity: .8;
        }
        
        /*最佳答案*/
        .rwdbst {
            margin: 18px 0;
            color: var(--help-yellow-key);
            padding: 18px;
            display: inline-flex;
            background-color: var(--help-yellow);
        }
        
        .darkmode-css .rwdbst a {
            color: var(--help-yellow-key)
        }
        
        /*tag*/
        .ptg.mbm.mtn {
            margin-top: 18px;
            color: #0000;
            display: flex;
            flex-wrap: wrap;
        }
        
        .ptg.mbm.mtn a {
            font-size: var(--font-size-12);
            display: inline-flex;
            align-items: center;
            color: var(--font-point);
            height: var(--element-height-34);
            background-color: var(--point);
            padding: 0 8px;
            border-radius: var(--border-radius-10);
            margin-bottom: 4px;
        }
        
        .ptg.mbm.mtn a:before {
            content: '';
            width: 6px;
            height: 6px;
            border-radius: var(--border-radius-200);
            background-color: var(--font-point);
            margin-right: 2px;
        }
        
        /*复制提示*/

        
        /*----登录--注册----*/
        .cv_wechat_title {
            font-size: 18px;
            font-weight: bold;
        }
        
        .cv_wechat_title i {
            display: none;
        }
        
        .login_input {
            display: flex;
            align-items: center;
            margin-bottom: 18px;
        }
        
        .cv_wechat_title,
        .cv_wechat_tip {
            padding: 18px;
        }
        
        .duceapp_cv_ricon {
            display: inline-flex;
            margin-bottom: 18px;
        
        }
        
        .duceapp_cv_ricon span {
            cursor: pointer;
        }
        
        .sms_button,
        a[id^="login_smsbutton_"] {
            height: var(--element-height-34);
            background-color: var(--help-yellow);
            align-items: center;
            justify-content: center;
            display: flex;
            margin: 18px 0;
            border-radius: var(--border-radius-10);
        }
        
        .duceapp_cv_logo a,
        .duceapp_cv_logo {
            width: 256px;
            height: 100px;
            background-repeat: no-repeat;
            background-size: contain;
        }
        
        .duceapp_cv_logo a img {
            display: none;
        }
        
        .duceapp_cv_logo a {
        
            display: flex;
        }
        
        .pwLogintype {
            margin-bottom: 18px;
            display: flex;
        }
        
        .duceapp_cv_wrap,
        .duceapp_cv_wrap iframe {
            color: var(--font-normal);
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100%;
        }
        
        
        
        .cv_wechat_qrcode {
            transform: none !important;
        }
        
        .duceapp_cv_wrap iframe {
            padding: 18px;
            background-color: #fff;
            border: none;
            border-radius: var(--border-radius-10);
        }
        
        .wxlogin_tip .icon {
            width: 1.4em;
            margin-right: 8px;
        }
        
        .cv_login_pwContent {
            padding: 18px;
            margin-top: 0px !important;
            background-color: var(--element-background);
            display: flex;
            flex-direction: column;
            width: 300px;
            border-radius: var(--border-radius-10);
            box-shadow: var(--shadow-outline);
        }
        
        .login_input {}
        
        .cv_login_pwContent input,
        #layer_register input,
        #layer_cellphone input {
            padding: 0 18px;
            height: var(--element-height-34);
            background-color: var(--input-background);
            height: var(--element-height-34);
            border-radius: var(--border-radius-10);
        }
        
        .login_checkbox,
        .login_checkbox span {
            display: flex;
            align-items: center;
        }
        
        .login_checkbox a,
        .login_checkbox span,
        .login_method a {
            padding: 18px;
        }
        
        .login_method {
            display: flex;
            align-items: center;
        }
        
        p._chk {}
        
        a[id^="login_smsbutton_"] {
            margin: 8px 0;
        }
        
        .login_button,
        .reg_button,
        .login_now a {
            transition: .2s all;
            cursor: pointer;
            height: var(--element-height-34);
            background-color: var(--point);
            border-radius: var(--border-radius-10);
            color: var(--font-point);
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .login_button:hover,
        .reg_button:hover {
            box-shadow: var(--shadow-hot);
        }
        
        .login_now a {
            margin-top: 18px;
        }
        
        /*-------图片墙------*/
        #water-fall {
            width: var(--body-width) !important;
            display: flex;
            flex-wrap: wrap;
            --photo-minheight: 180px;
            justify-content: end;
        }
        
        #water-fall li {
        
            margin: 0 5px 10px 5px;
        }
        
        #water-fall li:nth-child(4n) {
            margin-left: 5px;
        }
        
        .photo-link {
            width: 290px;
            height: 400px;
            display: inline-flex;
            position: relative;
            border-radius: var(--border-radius-10);
            overflow: hidden;
            min-height: var(--photo-minheight);
            background-color: var(--input-background);
            box-shadow: var(--shadow-outline);
            cursor: zoom-in;
        }
        
        .photo-mask {
            transition: .2s all;
            position: absolute;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            width: 100%;
            height: 100%;
            background-color: #00000057;
            opacity: 1;
            background: linear-gradient(180deg, #0000007a 0%, rgba(0, 0, 0, .14) 100%);
        }
        
        .photo-link:hover .photo-mask {
            background-color: #0000;
            opacity: 0;
        }
        
        .photo-title {
            color: #f4f4f4;
            font-size: 18px;
            padding: 18px;
            font-weight: bold;
            line-height: 24px;
        }
        
        .post-photo-img {
            background-position: center;
            background-size: cover;
            box-shadow: var(--shadow-outline);
            cursor: zoom-in;
            min-height: var(--photo-minheight);
            background-color: var(--element-background);
        }
        
        .photo-user-tip {
            margin: 18px;
            background-color: var(--element-background);
            padding: 8px 18px;
            display: inline-flex;
            border-radius: var(--border-radius-10);
            box-shadow: var(--shadow-hot);
            width: fit-content;
        }
        
        .photo-avatar {
            display: flex;
            align-items: center;
        }
        
        .photo-avatar img {
            border-radius: var(--border-radius-200);
            width: 40px;
            height: 40px;
        }
        
        .photo-avatar span,
        .photo-info {
            margin-left: 8px;
        }
        
        .photo-info,
        .photo-info div {
            display: flex;
            align-items: center;
            color: var(--font-normal);
        }
        
        .photo-info div {
            margin-left: 8px;
        }
        
        .photo-info .icon {
            color: var(--icon-fill);
            width: 1.4em;
            height: 1.4em;
        }
        
        .photo-lock {
            display: flex;
            width: 100%;
            min-height: var(--photo-minheight);
            align-items: center;
            justify-content: center;
        }
        
        /*---------------高级编辑器----------------*/
        /*草稿箱*/
        #draftlist_menu {
            color: var(--font-normal);
            border-radius: var(--border-radius-10);
            box-shadow: var(--shadow-hot);
            overflow: hidden;
        }
        
        #draftlist_menu li {
            background-color: var(--element-background);
            padding: 8px;
        }
        
        #draftlist_menu li:hover {
            background-color: var(--body-background);
        }
        
        #draftlist_menu li a {
            color: var(--font-visit);
        }
        
        /*回复标题*/
        #subjecthide {
            font-size: 18px;
            white-space: nowrap;
            display: flex;
            flex-direction: row !important;
            align-items: center;
        }
        
        /*纯文本*/
        #e_textarea {
            width: calc(var(--body-width) - 16px);
            border-radius: var(--border-radius-10);
            box-shadow: var(--shadow-outline);
            padding: 8px;
            min-height: var(--element-height-34);
            min-width: 340px;
        }
        
        #e_body .icon {
            width: 1.8em;
            height: 1.8em;
            color: var(--icon-line);
        }
        
        #e_body .editor-tip {}
        
        #postform {
            /*post main*/
        }
        
        #e_body,
        #postbox .z,
        #postbox .bm_h>h1,
        #postbox .subforum_left_title,
        #postbox .mn-nav-left>a>img,
        #postbox .th {
            display: flex !important;
            flex-direction: column;
        }
        
        #postbox .z {
            margin-bottom: 8px;
        }
        
        #postbox .z .mbn {
            display: flex;
        }
        
        #postbox .z .mbn a {
            margin: 0 0 8px 8px;
            ;
            white-space: nowrap;
        }
        
        #e_switcher {
            display: flex;
            align-items: center;
            white-space: nowrap;
        }
        
        #subjectchk {
            display: flex;
            margin-top: 0;
            margin-left: 360px;
        }
        
        #e_controls {
            display: flex;
            flex-direction: row-reverse;
            /*background-color:#d7cccc;*/
            margin-bottom: 8px;
            justify-content: space-between;
        }
        
        #e_controls[style*="position"] {
            background-color: var(--element-background);
        }
        
        #e_button {
            display: flex;
            border-radius: var(--border-radius-10);
            overflow: hidden;
            box-shadow: var(--shadow-outline);
            /*background-color:#c7c7d5;*/
        }
        
        #e_button>div {
            padding: 0 4px;
            display: flex;
            background-color: var(--element-background);
            box-shadow: var(--shadow-outline);
        }
        
        .edt.bar {
            padding: 4px;
            height: 44px;
            border-bottom: 1px solid #ddd;
            background: #fcfcfc;
        }
        
        /*分类*/
        .tb.cl.mbw,
        #post_extra_tb {
            display: inline-flex;
            flex-direction: row;
            justify-content: end;
            background-color: var(--element-background);
            box-shadow: var(--shadow-outline);
            border-radius: var(--border-radius-10);
            overflow: hidden;
            margin-bottom: 18px;
        }
        
        .tb.cl.mbw li,
        #post_extra_tb label {
            display: flex;
        }
        
        .tb.cl.mbw li a,
        #post_extra_tb label {
            height: var(--element-height-34);
            color: var(--font-normal);
            transition: .2s all;
            line-height: var(--element-height-34);
            padding: var(--element-padding-0-10);
        }
        
        .tb.cl.mbw li:hover a,
        #post_extra_tb label:hover {
            background-color: var(--background-color)
        }
        
        .tb.cl.mbw li.a a,
        #post_extra_tb label.a {
            color: var(--font-color-light);
            background-color: var(--point);
        }
        
        /*主题分类*/
        .ftid {
            display: flex;
            margin-bottom: 8px;
        }
        
        /*文本框*/
        #e_iframe {
            height: 800px;
            width: var(--body-width);
            border: 2px solid #d5d5d5;
            opacity: .8;
        }
        
        #editorheader+body {
            display: block;
            background-color: var(--element-background);
            /*background:red;*/
        }
        
        #post_extra {}
        
        /*数据提示*/
        #rstnotice {
            padding: 8px;
            background-color: var(--help-yellow);
            margin-bottom: 8px;
            border-radius: var(--border-radius-10);
        }
        
        /*按钮*/
        #e_controls a[id^="e_"] {
            transition: .2s all;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            border-radius: var(--border-radius-2);
            margin-right: 4px;
        }
        
        #e_controls a[id^="e_"]:hover {
            background-color: var(--input-background);
        }
        
        /*----工具栏按钮-------*/
        #e_body_loading {
            display: none;
        }
        
        #e_adv_s2 {
            max-width: 280px;
            flex-wrap: wrap;
            align-items: center;
        }
        
        /*颜色弹窗-背景等*/
        #e_forecolor_menu,
        #e_backcolor_menu,
        #e_postbg_menu,
        #sendforecolor_menu,
        #fastpostforecolor_menu {
            padding: 8px;
            border-radius: var(--border-radius-10);
            background-color: var(--element-background);
            box-shadow: var(--shadow-hot);
        }
        
        #e_forecolor_menu input,
        #e_backcolor_menu input,
        #e_postbg_menu input,
        #sendforecolor_menu input,
        #fastpostforecolor_menu input {
            transition: .2s all;
            width: 20px;
            height: 20px;
        }
        
        #e_forecolor_menu input:hover,
        #e_backcolor_menu input:hover,
        #e_postbg_menu input:hover,
        #sendforecolor_menu input:hover,
        #fastpostforecolor_menu input:hover {
            width: 30px;
            box-shadow: var(--shadow-hot);
        }
        
        /*表格*/
        #e_adv_2 {
            justify-content: center !important;
            align-items: center;
            flex-direction: column;
        }
        
        .b2r,
        .b1r {
            align-items: center;
        }
        
        .b1r a {
            height: fit-content;
        }
        
        #e_adv_2+.b2r {
            flex-direction: column;
            justify-content: center;
        }
        
        #e_adv_2+.b2r>p {
            display: flex;
        }
        
        /*字体*/
        #e_fontname,
        #e_fontsize {
            padding: 4px 8px !important;
            background-color: var(--input-background);
            box-shadow: var(--shadow-outline);
            border-radius: var(--border-radius-2);
            white-space: nowrap
        }
        
        #e_fontname {
            min-width: 80px
        }
        
        #e_fontsize {
            margin: 0 4px;
        }
        
        /*撤销重做*/
        #e_adv_5 {
            border-radius: var(--border-radius-10);
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            margin-left: 8px;
            background-color: var(--element-background);
            padding: 8px;
        }
        
        #e_switcher {
            display: flex;
            justify-content: center;
        }
        
        #e_switchercheck {}
        
        /*提示*/
        .m_c {
            background-color: var(--background-color);
            box-shadow: var(--shadow-hot);
            border-radius: var(--border-radius-10);
            padding: 10px;
        }
        
        .m_c a {
            color: var(--font-visit);
        }
        
        #e_fontname_menu,
        #e_fontsize_menu {
            display: flex;
            box-shadow: var(--shadow-hot);
            border-radius: var(--border-radius-10);
            overflow: hidden;
            min-width: 50px;
        }
        
        #e_fontname_menu ul>li>a {
            display: flex;
            padding: 8px;
            align-items: center;
            background-color: var(--background-color);
        }
        
        
        #e_fontsize_menu ul>li>a {
            display: flex;
        }
        
        #e_fontsize_menu ul>li>a>font {
            padding: 8px;
            font-size: var(--font-size-14);
            display: flex;
            width: 50px;
            align-items: center;
            background-color: var(--background-color);
        }
        
        #e_fontname_menu ul>li>a:hover,
        #e_fontsize_menu ul>li>a:hover>font {
            background-color: var(--menu-hover-background);
        }
        
        /*提示*/
        .pc_inner {
            padding: 8px;
            background-color: var(--help-yellow);
            border-radius: var(--border-radius-10);
            box-shadow: var(--shadow-hot);
        }
        
        /*字数检查等*/
        #e_bbar {
            display: inline-flex;
            justify-content: flex-end;
            align-items: center;
            font-size: 0;
            background-color: var(--point);
            padding: 4px;
            margin-bottom: 18px;
        }
        
        #e_bbar a {
            padding-left: 8px;
            color: var(--font-point);
        }
        
        #e_tip {
            font-size: var(--font-size-14);
            color: var(--font-point);
        }
        
        #e_resize img {
            cursor: row-resize;
        }
        
        .pg_post #pt {
            margin-bottom: 34px;
        }
        
        .pg_post #pt>.z,
        .pg_post #pt>.z>a,
        .pg_post #pt>.z span,
        #navtext a {
            align-items: center;
            flex-direction: row;
            display: flex;
            font-size: 18px;
            padding-right: 8px;
        }
        
        #navtext {
            color: var(--font-visit);
        }
        
        #navtext em {
            display: none;
        }
        
        /*帖子类型*/
        #pollm_c_1 input,
        .sadd input {
            height: var(--element-height-34);
        }
        
        .pg_post .mbn,
        .sadd p {
            align-items: center;
        }
        
        .sadd {
            display: flex;
            flex-direction: row;
            align-items: center;
        }
        
        .pg_post dt label {
            color: var(--font-visit);
        }
        
        .pg_post dd {
            margin-left: 8px;
            margin-right: 28px;
            margin-bottom: 18px;
        }
        
        .exfm,
        .exfm .z dl,
        .exfm .z dt,
        .xw0 {
            display: inline-flex;
            color: var(--font-normal);
            flex-wrap: wrap;
        }
        
        .exfm .spmf label,
        .xw0 {
            align-items: center;
        }
        
        .exfm .z {
            flex-direction: row;
        }
        
        .xl2.cl,
        .xl2.cl li label,
        .spmf label {
            display: flex;
            align-items: center;
            margin-right: 18px;
        }
        
        .pnpost {
            color: var(--font-normal);
        }
        
        .pnpost a {
            color: var(--font-visit);
        }
        
        /*---------赠楼-------*/
        .d_gw_highlight_red .d_gw_special_text {
            background-color: var(--help-red)
        }
        
        #d_gw_myaccount_info_ln1>span,
        #d_gw_myaccount_info_ln2>span {
            margin: 0 8px
        }
        
        #d_gw_myaccount_info_ln1>span:before,
        #d_gw_myaccount_info_ln2>span:before {
            margin-top: 20px;
            position: absolute;
            font-size: 16px;
        }
        
        #d_gw_myaccount_info_ln1>span:nth-child(1):before {
            content: '赠楼';
        }
        
        #d_gw_myaccount_info_ln1>span:nth-child(2):before {
            content: '参赠';
        }
        
        #d_gw_myaccount_info_ln1>span:nth-child(3):before {
            content: '获赠';
        }
        
        #d_gw_myaccount_info_ln1>span:nth-child(4):before {
            content: '蒸气';
        }
        
        #d_gw_myaccount_info_ln2>span:nth-child(1):before {
            content: '赠楼';
        }
        
        #d_gw_myaccount_info_ln2>span:nth-child(2):before {
            content: '参赠';
        }
        
        #d_gw_myaccount_info_ln2>span:nth-child(3):before {
            content: '获赠';
        }
        
        #d_gw_myaccount_info_ln2>span:nth-child(4):before {
            content: '蒸气';
        }
        
        
        .d_gw_search_result_right_top {
            display: flex;
        }
        
        #d_gw_special_firstln {
            display: flex;
            flex-direction: column;
            font-size: 18px;
        }
        
        .d_gw_special_text {
            color: var(--font-normal);
            padding: 8px;
            background-color: var(--element-background);
            border-radius: var(--border-radius-10);
            margin: 8px;
        }
        
        .p_gw_status_line_full {
            height: 50px;
            font-size: 18px;
            background-color: var(--help-yellow);
            display: flex;
            padding: 0 18px;
            align-items: center;
            border-radius: var(--border-radius-10);
        }
        
        #gw_time_countdown span {
            color: var(--help-yellow-key);
        }
        
        #d_gw_jr_marketprice {
            font-size: 18px;
            color: var(--help-yellow-key);
        }
        
        .d_gw_nearest_giveaway_bottom_ln2 {
            color: var(--font-second-aphal);
        }
        
        .d_gw_nearest_giveaway_bottom_ln2 {
            font-size: 14px;
        }
        
        #d_gw_detail {
            display: flex;
            flex-wrap: wrap;
        }
        
        #d_gw_bigimg {
            height: 300px;
            width: 921px;
            background-repeat: no-repeat;
            background-size: cover;
            background-position: center;
            margin-bottom: 18px;
            border-radius: var(--border-radius-10);
            overflow: hidden;
        }
        
        #d_gw_joininfo {
            display: flex;
            position: absolute;
            background-color: var(--element-background);
            padding: 8px;
            border-radius: var(--border-radius-10);
            margin: 200px 0 0 18px;
        }
        
        #d_gw_joininfo a {
            font-size: 18px;
            font-weight: bold;
        }
        
        #search_name {
            margin: 18px 0;
        }
        
        #textbox_searchgw {
            height: var(--element-height-34);
            padding: 0 8px;
            background-color: var(--input-background);
            border-radius: var(--border-radius-10);
        }
        
        .pg_steamcn_gift #ct {
            display: flex;
        }
        
        .d_gw_nearest_giveaway {
        
            display: flex;
        }
        
        .d_gw_nearest_giveaway:hover,
        #p_gw_newest_giveaway:hover,
        .d_gw_easiest_giveaway:hover,
        .d_gw_newlist_item:hover {
            box-shadow: var(--shadow-hot);
        }
        
        #d_gw_content {
            width: 100%;
        }
        
        #d_gw_myinfo {
            display: flex;
            justify-content: space-between;
        }
        
        #d_gw_myinfo>div:last-child {
            display: none;
        }
        
        #d_gw_myaccount_info {
            display: flex;
            align-items: center;
            background-color: var(--element-background);
            padding: 8px;
            border-radius: var(--border-radius-10);
        
        }
        
        #d_gw_myaccount_info>a>img,
        .img_gw_search_result_right_top_avatar {
            border-radius: var(--border-radius-200);
            width: 64px
        }
        
        #d_gw_nav_squrebtns a {
            background-color: red;
        }
        
        #d_gw_nav_squrebtns a img,
        #d_gw_nav_newgw {
            background-color: #5bf;
            padding: 8px;
        }
        
        .green_outer,
        .d_gw_lb_selection_outer {
            display: flex;
            margin-bottom: 8px;
            padding: 8px;
            border-radius: var(--border-radius-2);
            width: fit-content;
        }
        
        .d_gw_lb_selection_outer {
            background-color: #5bf;
        }
        
        .green_outer {
            background-color: #00cc00;
        }
        
        #d_gw_myaccount_bottom {
            color: var(--font-normal);
            display: flex;
            background-color: var(--element-background);
            height: var(--element-height-34);
            align-items: center;
            padding: 0 8px;
            margin: 8px 0;
            border-radius: var(--border-radius-10);
            justify-content: space-between;
        }
        
        #d_gw_nav_newgw:before {
            content: '创建新赠楼';
            font-size: 18px;
        }
        
        #d_gw_myaccount_info_lines {
            display: flex;
        }
        
        #d_gw_myaccount_info_lines span {
            padding: 8px;
            font-size: 18px;
            font-weight: bold;
            color: var(--font-normal);
        }
        
        /*赠楼列表*/
        .d_gw_nearest_giveaway_top_right,
        .d_gw_easiest_giveaway_top_right {
            padding: 0 18px;
        }
        
        .a_gw_no_underline p,
        .d_gw_nearest_giveaway_top_right p {
            font-size: 18px;
            font-weight: bold;
            margin-bottom: 8px;
        }
        
        .p_new_giveaway_img span,
        .a_gw_no_underline span {
            display: none;
        }
        
        .d_gw_nearest_giveaway,
        #p_gw_newest_giveaway,
        .d_gw_easiest_giveaway,
        .d_gw_search_result {
            transition: .2s all;
            margin-bottom: 18px;
            padding: 18px;
            background-color: var(--element-background);
            border-radius: var(--border-radius-10);
            box-shadow: var(--shadow-outline);
            display: flex;
        }
        
        .d_gw_nearest_giveaway_top_left img,
        #p_gw_newest_giveaway img,
        .d_gw_easiest_giveaway_top_left img,
        .d_gw_search_result_left img {
            width: 300px;
            border-radius: var(--border-radius-10);
        }
        
        /**/
        #d_gw_newlist {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
        }
        
        .d_gw_newlist_item {
            transition: .2s all;
            padding: 8px;
            background-color: var(--element-background);
            margin: 0 8px 8px 0;
            border-radius: var(--border-radius-10);
        }
        
        .d_gw_newlist_item img {
            height: 120px;
            border-radius: var(--border-radius-10);
        }
        
        
        /*-----------------重要 帖子操作-----------------------*/
        .post-select {
        
            display: flex;
            font-size: 0px;
        }
        
        .post-select input {
            opacity: 0;
            position: absolute;
        }
        
        .post-select-label .icon {
            font-size: var(--font-size-14);
            width: 1.8em;
            height: 1.8em;
        }
        
        .post-select-label {
            display: flex;
            width: 24px;
            height: 24px;
            border-radius: var(--border-radius-200);
            background-color: var(--background-color);
            align-items: center;
            justify-content: center;
            box-shadow: var(--shadow-outline);
        }
        
        input[id^="manage"]:checked+.post-select-label {
            background-color: var(--help-yellow);
        }
        
        #mdly {
            position: absolute;
        }
      `

        if ($(`#card-for-keylol`) == null) {
            console.log(`add card-for-keylol`)
            // 添加css
            var cssNode = document.createElement("style")
            cssNode.id = `card-for-keylol`
            cssNode.type = "text/css"
            cssNode.appendChild(document.createTextNode(cssString))
            var html = $("html")
            document.documentElement.appendChild(cssNode)
        }


    }

    // 移动节点
    var moveElement = function () {
        let logo = $("body>.tb-container>#nav-logo")
        let navMenuParent = $("body>#nav-menu-parent")
        let navMenu = $("body>#nav-menu")
        let tbContainer = $("body>.tb-container")

        // 用户栏&LOGO
        navMenu !== null ? navMenu.insertBefore(tbContainer, null) : null
        navMenu !== null ? navMenu.insertBefore($("#nav-additional>#nav-user-action-bar"), null) : null
        navMenu !== null ? navMenu.insertBefore(logo, navMenu.childNodes[0]) : null
        navMenu !== null ? navMenuParent.insertBefore(navMenu, null) : null
    }


    //初始化深色模式
    function darkModeInit() {
        let darkModeValue = localStorage.getItem(`darkmode`)
        if (darkModeValue == null) {
            localStorage.setItem(`darkmode`, `0`)
        }
        if (darkModeValue === '1') {
            $(`html`).classList.add(`darkmode-css`)
        } else {
            $(`html`).classList.remove(`darkmode-css`)
        }
    }


    var listenElement = function () {
        createCss()
        moveElement()
        darkModeInit()
    }

    var moveObserver = new MutationObserver(listenElement)
    moveObserver.observe(targetNode, observerOptions)

    // DOM加载完全后
    // 首页---------------------------------------------------------------------------------------
    let i = 1
    /**  
     * fetch热门主题图片
     */
    function fetchHotImg(aNode) {

        const symbolLock = `keylolclosepost`

        let idJsonRegx = /<script type="application\/ld\+json">(.+?)<\/script>/s
        // /<img.+?file="(.+?)".+?>/
        let otherImgRegx = /<img.+?file="(.+?\.(?!gif).{3,4})".+?>/gm

        // aNode !== null ? aNode.className = `photo-link` : null

        let url = aNode !== null ? aNode.href : null

        if (url !== null) {

            fetch(url)
                .then(res => {
                    return res.text()
                })
                .then(bodyText => {

                    let idJson = bodyText.match(idJsonRegx) !== null
                        ? JSON.parse(bodyText.match(idJsonRegx)[0].replace(idJsonRegx, '$1'))
                        : null

                    let otherImg = bodyText.match(otherImgRegx) !== null
                        ? bodyText.match(otherImgRegx)[0].replace(otherImgRegx, `$1`)
                        : null


                    let imgUrl = idJson !== null && idJson.images[0] !== undefined ? idJson.images[0] : otherImg


                    let imgNode = aNode.children[0]
                    aNode.insertBefore(document.createElement(`div`), imgNode)

                    // 去除默认尺寸
                    imgNode.removeAttribute("height")
                    imgNode.removeAttribute("width")
                    imgNode.src = imgUrl

                    // 去除slidebar序号
                    $(`.slidebar > ul >li:nth-child(${i})`).innerText = ``

                })
        }
    }

    /**
     * 热门主题列表滚动监器
     */
    function hotPostShowMore() {
        let tabPContent = $(`#tabPAhn0P_content`)
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

    /**
     * 热门主题颜色条目改为背景
     */
    function hotPostBackground() {
        let hotList = $All(`div[id*=portal_block_] [style*="color"]`)
        hotList.forEach(fontTag => {
            fontTag.parentNode.style = `background-color:${fontTag.style.color};opacity:.8;`
            fontTag.style.color = `rgba(255,255,255,9)`
        })

    }
    /**
     * 移动版块节点
     */
    function createIndexSubjectParent() {
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
                          <div class="forum_help">
                              <div class="forum_nav"></div>
                              <div class="forum_question"></div>
                              <div class="forum_stats"></div>
                          </div>        
                      </div>
                      `
        let indexSubjectParent = document.createElement(`div`)
        indexSubjectParent.id = `index-subject-parent`
        indexSubjectParent.className = `index_subject_parent`
        indexSubjectParent.innerHTML += indexSubjectTemplate
        $("body").insertBefore(indexSubjectParent, null)
    }

    /**
     * 移动子版块
     */
    function moveIndexSubject() {
        // 移动版块到index-subject-parent > index_subject_left
        let steamNode = $(`#wp > div:nth-child(3)`)
        let manufacturerNode = $(`#wp > div:nth-child(4)`)
        let gameNode = $(`#wp > div:nth-child(5)`)
        let questionNode = $(`#wp > div:nth-child(6)`)
        let forumNode = $(`#wp > div:nth-child(7)`)
        let translateNode = $(`#wp > div.index_middle_subject.clearfix`)

        manufacturerNode.id = `manufacturer`
        gameNode.id = `game`

        let steam = $(`.index_subject_steam`)
        let game = $(`.index_subject_game`)
        let forum = $(`.index_subject_forum`)
        let translate = $(`.index_subject_translate`)

        steam.insertBefore(steamNode, null)
        // 合并两个游戏相关版块
        game.insertBefore(manufacturerNode, null)
        game.insertBefore(gameNode, null)
        // 互助休闲
        forum.insertBefore(questionNode, null)
        forum.insertBefore(forumNode, null)
        translate.insertBefore(translateNode, null)

        // 移动到index_subject_right
        let rowAdsNode = $(`.index_navigation_mid`)
        let forumQuestionNode = $(`#wp >.index_subject`)

        // 小广告
        let rowAds = $(`.row_ads`)
        // 社区服务
        let forumQuestion = $(`.forum_question`)

        forumQuestionNode.id = `forum-question`

        rowAds.style = "display:flex"
        rowAds.insertBefore(rowAdsNode, null)
        forumQuestion.insertBefore(forumQuestionNode, null)

        // 每日在线人数&帖子信息
        let statsNode = $(`.bbs_daily_stats`)
        let clearStats = decodeURI(statsNode.innerHTML).split(`｜`)
        let clearStatsMemberOnline = clearStats[5].split(`，`)

        let statsTemplate = `
          <div class="stats_member">
              <span>${clearStats[0]}</span>
              <span>${clearStats[1]}</span>
              <span>${clearStatsMemberOnline[0]}</span>
          </div>
          <div class="stats_new_member">
              <span>${clearStats[4]}</span>
          </div>
          <div class="stats_total">
              <span>${clearStats[2]}</span>
              <span>${clearStats[3]}</span>
          </div>
          <div class="stats_hight">
              <span>${clearStatsMemberOnline[1]}</span>
          </div>
          `

        $(`.forum_stats`).innerHTML += statsTemplate

        // 关注重点
        let forumNav = $(`.forum_nav`)
        let navLeftNode = $(`.index_navi_left`)
        let navRightNode = $(`.index_navi_right`)
        let navHtml = navLeftNode.innerHTML + navRightNode.innerHTML

        const linkRegx = navHtml.match(/<a.+\/a>/gm)
        const forumNavTemplate = `
              <div class="navItem-1">${linkRegx[14]}</div>
              <div class="navItem-2">${linkRegx[7]}${linkRegx[0]}</div>
              <div class="navItem-3">${linkRegx[4]}${linkRegx[8]}</div>
              <div class="navItem-4">${linkRegx[1]}${linkRegx[9]}</div>
              <div class="navItem-5">${linkRegx[5]}${linkRegx[12]}</div>
              <div class="navItem-6">${linkRegx[10]}${linkRegx[2]}</div>
              <div class="navItem-7">${linkRegx[13]}${linkRegx[6]}</div>
              <div class="navItem-8">${linkRegx[3]}${linkRegx[11]}</div>
          `

        forumNav.innerHTML += forumNavTemplate

        // 最后移动 index-subject-parent
        let wp = $(`#wp`)
        wp.insertBefore($(`#index-subject-parent`), $(`.bbs_daily_stats`))
    }

    /**
     * footer
     */
    function footer() {
        let footerNode = $(`.subforunm_foot_text`)
        footerNode !== null ? footerNode.innerText = footerNode.innerText.replace(/\s+/gm, "") : null
    }

    /**
     * 深色模式
     */
    function darkMode() {
        let ul = $(`#nav-user-action-bar > ul > li.dropdown > ul`)

        let darkmodeNode = document.createElement(`li`)
        darkmodeNode.innerHTML = `
          <a id="darkmode">深色模式</a>  
      `
        ul.insertBefore(darkmodeNode, ul.childNodes[0])

        let darkModeCallback = () => {
            let darkModeValue = localStorage.getItem(`darkmode`)

            if (darkModeValue === `1`) {
                localStorage.setItem(`darkmode`, `0`)
                $(`html`).classList.remove(`darkmode-css`)
            } else {
                localStorage.setItem(`darkmode`, `1`)
                $(`html`).classList.add(`darkmode-css`)
            }
        }

        $(`#darkmode`).addEventListener("click", darkModeCallback)
    }

    // 首页symbol -----------------------------------------------------------------------
    // 数组的顺序对应元素
    /**
     * 输入icon id,生成symbol 节点
     * @param {string}} id
     * @returns {HTMLSpanElement}
     */
    let symbolHTMLNode = function (id) {
        let span = document.createElement(`span`)
        span.className = `symbol-icons`
        span.innerHTML += `<svg class="icon" aria-hidden="true"><use xlink:href="#${id}"></use></svg>`
        return span
    }

    /**
     * 输入icon id,生成symbol片段
     * 详情 https://www.iconfont.cn/help/detail?spm=a313x.7781069.1998910419.d8cf4382a&helptype=code
     * @param {string} id
     * @returns {string} span string
     */
    let symbolHTML = function (id) {
        return `<span class="symbol-icons"><svg class="icon" aria-hidden="true"><use xlink:href="#${id}"></use></svg></span>`
    }

    // 下拉菜单icons添加
    // 头像下拉菜单
    const symbolDownMenu = [
        "kelolmenu_night_mode",
        "kelolmenu_setting",
        "kelolmenu_connet_qq",
        "kelolmenu_friend",
        "kelolmenu_my_post",
        "kelolmenu_collect",
        "kelolmenu_icon_prop",
        "kelolmenu_order",
    ]
    function setDownMenuIcons() {
        let downMenu = $All(`#nav-user-action-bar > ul > li.dropdown > ul>li:not(.divider)`)
        let i = 0
        downMenu.forEach((node) => {
            if (node.className == ``) {
                node.insertBefore(symbolHTMLNode(symbolDownMenu[i]), node.children[0])
            }
            i++
        })
    }

    // 搜索栏 消息 提醒 logo
    // 搜索栏和导航栏
    const symbolNav = {
        search: "kelolmenu_iconsearch",
        mail: "kelolmenu_icon_mail",
        postreply: "kelolmenu_icon_post_reply",
        logo: "kelolkeylol_logo"
    }
    /**
     * 导航symbol
     */
    function setNavIcons() {

        let searchNode = $(`.search-bar-form > .dropdown > .btn-default`)
        let mail = $(`#nav-user-action-bar  a[href*="do=pm"]`)
        let notic = $(`#nav-user-action-bar  a[href*="do=notic"]`)
        let highLightNode = $(`#nav-user-action-bar  a[href*="view=mypost"]`)
        let logo = $("#nav-logo")

        // 提醒数量
        let mailBadge = mail !== null && mail.children.length > 0 ? `<span class="badge">${mail.textContent.replace(/.*(\d+)/, '$1')}</span>` : ''
        let noticBadge = notic !== null && notic.children.length > 0 ? `<span class="badge">${notic.textContent.replace(/.*(\d+)/, '$1')}</span>` : ''

        searchNode !== null ? searchNode.innerHTML += symbolHTML(symbolNav.search) : null

        mail !== null ? mail.innerHTML = `${symbolHTML(symbolNav.mail)}${mailBadge}` : null

        notic !== null ? notic.innerHTML = `${symbolHTML(symbolNav.postreply)}${noticBadge}` : null

        // 设置logo
        logo !== null ? logo.innerHTML += symbolHTML(symbolNav.logo) : null

    }

    // steam平台工具
    const symbolSteam = [
        "kelolsteam_panel_hot",
        "kelolsteam_panel_code",
        "kelolsteam_panel_translate",
        "kelolsteam_panel_achivement",
        "kelolsteam_panel_gamepeviews",
        "kelolsteam_panel_gift",
        "kelolsteam_panel_shopping",
        "kelolsteam_panel_bundle",
        "kelolsteam_panel_market",
        "kelolsteam_panel_sharegame",
        "kelolsteam_panel_resource",
    ]
    function setSteamToolIcons() {
        let steamNodes = $All(`#index-subject-parent > div.index_subject_left > div.index_subject_steam > div > div.index_subject_row > div > div.subject_row_detail_pic > a`)
        let i = 0
        steamNodes.forEach((node) => {
            node.innerHTML = ``
            node.insertBefore(symbolHTMLNode(symbolSteam[i]), null)
            i++
        })
    }

    // 使用第二个引入链接
    // 厂商logo
    const symbolManufactrer = [
        "kelolmanufacturers_panel_origin",
        "kelolmanufacturers_panel_uplay",
        "kelolmanufacturers_panel_gog",
        "kelolmanufacturers_panel_Windows_Store",
        "kelolmanufacturers_panel_epic_games",
        "kelolmanufacturers_panel_other",
        "kelolmanufacturers_panel_sonkwo",
        "kelolmanufacturers_panel_cube",
        "kelolmanufacturers_panel_wegame",
        "kelolmanufacturers_panel_console",
        "kelolmanufacturers_panel_mobile",
    ]
    function setManufactrerIcons() {
        let manufactrerNode = $All(
            `#index-subject-parent > div.index_subject_left > div.index_subject_game > div:nth-child(1) > div.index_subject_row > div > div.subject_row_detail_pic > a`
        )
        let i = 0
        manufactrerNode.forEach((node) => {
            node.innerHTML = ``
            node.insertBefore(symbolHTMLNode(symbolManufactrer[i]), null)
            i++
        })
    }

    // 游戏logo
    const symbolGameLogo = [
        "kelolgame_panel_all_game",
        "kelolgame_panel_ak",
        "kelolgame_panel_dota_underlords",
        "kelolgame_panel_dota2",
        "kelolgame_panel_csgo",
        "kelolgame_panel_survivel",
        "kelolgame_panel_gtav",
        "kelolgame_panel_valve",
        "kelolgame_panel_ea",
        "kelolgame_panel_uplay",
        "kelolgame_panel_battle_net",
        "kelolgame_panel_vr",
    ]
    function setGameIcons() {
        let gameNode = $All(`#index-subject-parent > div.index_subject_left > div.index_subject_game > div:nth-child(2) > div.index_subject_row > div > div.subject_row_detail_pic > a`)
        let i = 0
        gameNode.forEach((node) => {
            node.innerHTML = ``
            node.insertBefore(symbolHTMLNode(symbolGameLogo[i]), null)
            i++
        })
    }

    // 问题互助
    const symbolHelp = [
        "kelolhelp_panel_tool_fail",
        "kelolhelp_panel_trade_fail",
        "kelolhelp_panel_forum_help",
        "kelolhelp_panel_resource_help",
        "kelolhelp_panel_game_crash",
        "kelolhelp_panel_software",
        "kelolhelp_panel_magic",
    ]
    /**
     * 替换帮助版块
     */
    function setHelpIcons() {
        let helpNode = $All(
            `#index-subject-parent > div.index_subject_left > div.index_subject_forum > div:nth-child(1) > div.index_subject_row > div > div.subject_row_detail_pic > a`
        )
        let i = 0
        helpNode.forEach((node) => {
            node.innerHTML = ``
            node.insertBefore(symbolHTMLNode(symbolHelp[i]), null)
            i++
        })
    }

    // 休闲杂谈
    const symbolFree = ["kelolfree_panel_water", "kelolfree_panel_photo", "kelolfree_panel_girl", "kelolfree_panel_hardware", "kelolfree_panel_openbox"]
    function setFreeIcons() {
        let freeNode = $All(
            `#index-subject-parent > div.index_subject_left > div.index_subject_forum > div:nth-child(2) > div.index_subject_row > div > div.subject_row_detail_pic > a`
        )
        let i = 0
        freeNode.forEach((node) => {
            node.innerHTML = ``
            node.insertBefore(symbolHTMLNode(symbolFree[i]), null)
            i++
        })
    }

    // 社区指南
    const symbolGuide = [
        "kelolforum_help_start",
        "kelolforum_help_announcement",
        "kelolforum_help_feedback",
        "kelolforum_help_activity",
        "kelolforum_help_manage",
        "kelolforum_help_null",
    ]
    function setGuideIcons() {
        // kelo ads guide
        $(`div.navItem-1`).insertBefore(symbolHTMLNode(symbolGuide[0]), $(`div.navItem-1`).children[0])

        let guideNode = $All(`#forum-question > div.index_subject_row > div > div.subject_row_detail_pic > a`)
        let i = 1
        guideNode.forEach((node) => {
            node.innerHTML = ``
            node.insertBefore(symbolHTMLNode(symbolGuide[i]), null)
            i++
        })
    }

    // 首页symbol
    // 导航栏的一系列函数
    function navFunction() {
        // 检测 是否登录

        console.log(`add nav menu icons`)
        setNavIcons()

        if (document.querySelector(`.dropdown > a`) !== null) {
            console.log(`add darkmode`)
            darkMode()
            console.log(`add down menu icons`)
            setDownMenuIcons()
        }
    }

    /**
     * 首页样式
     */
    function home() {
        console.log(`fetch hot img`)
        let hotImgPostUrls = $All(`.slideshow>li>a`)
        hotImgPostUrls.forEach(a => {
            fetchHotImg(a)
        })


        console.log(`add tabPAHn0P_content show more button`)
        hotPostShowMore()
        hotPostBackground()

        console.log(`create subject parent`)
        createIndexSubjectParent()
        console.log(`move child forum`)
        moveIndexSubject()

        console.log(`add symbol icons`)
        setSteamToolIcons()
        setManufactrerIcons()
        setGameIcons()
        setHelpIcons()
        setFreeIcons()
        setGuideIcons()
    }

    // 热门主题---------------------------------------------------------------------------------------
    // 使用第三个symbol

    /**
     * 输入带关键字的html,匹配版块tag的图标
     * @param {string} html
     * @returns {string} symbol片段
     * @returns {string} 无匹配时返回 html
     */
    function tagIconMatch(html) {
        // 判断版块,替换版块tag图标
        const symbolSubTag = {
            yundong: "keylolyundong",
            guanshui: "keylolguanshui",
            licai: "keylollicai",
            lianji: "keylollianji",
            shoucang: "keylolshoucang",
            yurenjie: "keylolyurenjie",
            haojia: "keylolhaojia",
            qinggan: "keylolqinggan",
            ouqi: "keylolouqi",
            jiqiao: "keyloljiqiao",
            yingyin: "keylolyingyin",
            lingyi: "keylollingyi",
        }

        const tagSymbolRegx = {
            yundong: /运动/gms,
            guanshui: /灌水/gms,
            licai: /理财/gms,
            lianji: /交友/gms,
            shoucang: /收藏/gms,
            yurenjie: /愚人节/gms,
            haojia: /好价/gms,
            qinggan: /情感/gms,
            ouqi: /欧气/gms,
            jiqiao: /社区/gms,
            yingyin: /影音/gms,
            lingyi: /灵异/gms,
        }

        for (const key in tagSymbolRegx) {
            if (html.match(tagSymbolRegx[key]) !== null) {
                return symbolHTML(symbolSubTag[key])
            }
        }

        return html
    }

    // 列表替换
    const symbolHotPostStats = {
        reward: "keylolreward",
        closepost: "keylolclosepost",
        vote: "keylolvote",
        top: "keyloltop",
        globaltop: "keylolglobaltop",
        vs: "keylolvs",
    }
    const symbolHotPostInfo = {
        attach_img: "keylolattach_img",
        agree: "keylolagree",
        reply: "keylolreply",
        newpost: "keylolnewpost",
        createnewpost: "keylolcreatenewpost",
        hidetop: "keylolhidetop",
        lock: "keylollock",
        postdigest: "keylolpostdigest",
        postattachment: "keylolpostattachment",
        postsolve: "keylolpostsolve",
    }


    // 按tag排序图标
    const symbolPostSort = ["keylolviewsort", "keyloltypesort", "keyloltimesort", "keylolstatussort"]

    /**
     * 移动子版列表导航
     */
    function renderPostListNav() {
        let mnNode = $(`.mn`)
        // 创建父节点
        let mnNavParentTemplate = `
            <div class="mn-nav-left"></div>
            <div class="mn-nav-right">
              <div class="mn-nav-right-control-panel"></div>
            </div>
          `
        let mnNavParent = document.createElement(`div`)
        mnNavParent.id = `mn-nav-parent`
        mnNavParent.innerHTML += mnNavParentTemplate

        mnNode.insertBefore(mnNavParent, mnNode.children[0])
        // 移动子节点



        // 子版块相关
        // 子版块创建规则，筛选父节点
        // 存在子版元素
        if ($(`.subforum`) !== null) {
            let mnNavSortParent = document.createElement(`div`)
            let mnNavRuleParent = document.createElement(`div`)
            let mnNavTagParent = document.createElement(`div`)

            mnNavRuleParent.id = `mn-nav-rule-parent`
            mnNavSortParent.id = `mn-nav-sort-parent`
            mnNavTagParent.id = `mn-nav-tag-parent`

            mnNode.insertBefore(mnNavRuleParent, $(`.bm.bml.pbn`))
            mnNode.insertBefore(mnNavSortParent, $(`.bm.bml.pbn`))
            mnNode.insertBefore(mnNavTagParent, $(`.bm.bml.pbn`))

            // 清除｜清除不名意义a tag
            $All(".subforum_subject_detail_text_down div").forEach((node) => {
                if (node.innerText === "｜" || node.innerHTML == "") {
                    node.remove()
                }
            })
            $All(".subforum_subject_detail_text_down a").forEach((node) => {
                if (/^\s*$/.test(node.innerText)) {
                    node.remove()
                }
            })

            // tag栏
            let detail2 = $All(`.subforum_subject2 > div.subforum_subject_detail2`)

            if (detail2.length > 4) {
                let mnNavTagNode = $(`#mn-nav-tag-parent`)
                mnNavTagNode.insertBefore($(`.subforum_subject2 > div.subforum_subject_detail2:last-child`), null)
            }

            // 规则栏
            let ruleParent = $(`.ptn.xg2`)
            if (ruleParent !== null) {
                let mnNavRuleParentNode = $(`#mn-nav-rule-parent`)
                mnNavRuleParentNode.innerHTML = `<div id="mn-nav-rule-switch"></div>`

                const lineRegx = /<\/a> \| <div/gm
                ruleParent.innerHTML = ruleParent.innerHTML.replace(lineRegx, `<\/a><div`)

                let ruleNode = $(`#current-forum-rule`)
                if (ruleNode.innerHTML !== "") {
                    mnNavRuleParentNode.insertBefore(ruleParent, null)
                    $(`#mn-nav-rule-switch`).insertBefore($(`.ptn.xg2`), null)
                    mnNavRuleParentNode.insertBefore(ruleNode, null)
                }

                // 添加切换按钮
                let switchRule = function () {
                    let num = event.target.id.match(/\d+/gm)[0]
                    $(`#current-forum-rule`).innerHTML = $(`#forum-rule-${num}`).innerHTML
                }

                $All(`.ptn.xg2 > a`).forEach((node) => {
                    node.removeEventListener("click", switchRule)
                    node.addEventListener("click", switchRule)
                })
            }

            // 移动筛选栏
            detail2 = $All(`.subforum_subject2 > div.subforum_subject_detail2`)
            detail2.forEach((node) => {
                node.style = ""
                $(`#mn-nav-sort-parent`).insertBefore(node, null)
            })

            // 筛选栏symbol
            let tagATagFirst = `#mn-nav-sort-parent .subforum_subject_detail_text_down > div:first-Child > a:first-Child`
            let i = 0
            $All(tagATagFirst).forEach((node) => {
                node.innerHTML = `${symbolHTML(symbolPostSort[i])}<span>${node.innerText}</span>`
                i++
            })

            // 版块tag图标替换
            let tagAtag = `#mn-nav-tag-parent > div > div.subforum_subject_detail_text_down > div > a`
            $All(tagAtag).forEach((node) => {
                let postTagNameRegx = /(.*)（.*/gm
                let postTagName = node.innerText.match(postTagNameRegx) !== null ? node.innerText.replace(postTagNameRegx, `$1`) : `<span class="post-tag-name">${node.innerText}</span>`
                let postNumRegx = /\d+/gm
                let postNum = node.innerText.match(postNumRegx) !== null ? `（${node.innerText.match(postNumRegx)[0]}）` : ""

                // 有img图标且有自定义图标时匹配替换
                if (node.children !== null && node.innerHTML !== tagIconMatch(node.innerHTML)) {
                    node.innerHTML = `<span>${tagIconMatch(postTagName)}<span class="post-tag-num">${postNum}</span></span><span class="tag-tip">${node.innerText}</span>`
                }
            })
        }

    }






    /**
     * 发帖按钮
     */
    function renderNewBtn() {
        const symbolPostBotton = {
            createnewpost: "keylolcreatenewpost",
            comments: "keylolcomments"
        }


        let mnNavLeft = $(`.mn-nav-left`)
        let newPostNode = $(`#pgt>a`)
        // 帖子详细页面
        let newFromPostNode = $(`#newspecial`)
        let replyPostNode = $(`#post_reply`)


        if (replyPostNode !== null) {

            // 倒序插入为第一节点
            // 回复按钮  
            replyPostNode.innerHTML = `${symbolHTML(symbolPostBotton.comments)}<span>回复</span>`
            mnNavLeft.insertBefore(replyPostNode, mnNavLeft.childNodes[0])

            // 发帖按钮
            newFromPostNode.innerHTML = `${symbolHTML(symbolPostBotton.createnewpost)}<span></span>`
            mnNavLeft.insertBefore(newFromPostNode, mnNavLeft.childNodes[0])

        }
        else {
            // 发帖按钮
            if (newPostNode !== null) {
                newPostNode.innerHTML = `${symbolHTML(symbolPostBotton.createnewpost)}<span>发贴</span>`
                mnNavLeft.insertBefore(newPostNode, mnNavLeft.childNodes[0])
            }

        }


    }




    // 移动列表导航
    const symbolPostListNav = {
        prePage: "keylolpre-page",
        todaynum: "keyloltodaynum",
        post: "keylolpost",
        comments: "keylolcomments",
        viewnuminfo: "keylolviewnuminfo",
        shoucang: "keylolshoucang"
    }
    /**
     * 版块、帖子信息
     */
    function renderPostInfo() {

        /**
         * 
         * @param {Element}} element 
         * @param {string} symbolKey 
         */
        function renderPostInfoChild(element, symbolKey) {
            if (element !== null) {
                element.innerHTML = `<div class="suforum-symbol">${symbolHTML(symbolKey)}<span class="subforum-info-tip">${element.innerHTML}</span></div>`
            }

        }

        let mnNavLeft = $(`.mn-nav-left`)
        let thread = $("#thread_types")
        let favatar = $(`div[id*="favatar"]`)

        // 热门和子版导航不一样
        if (thread !== null) {
            // 热门导航
            mnNavLeft.insertBefore($(`#thread_types`), null)
        } else {
            // 子版信息
            let subForumRightTitle = $(`.subforum_right_title`)
            if (subForumRightTitle !== null) {
                subForumRightTitle.insertBefore($(`.subforum_left_title_left_down>div`), $(`.subforum_right_title`).children[0])
                mnNavLeft.insertBefore($(`.subforum`), null)
            }


            // 子版信息symbol
            let left = $(`.subforum_right_title_left_up`)
            let mid = $(`.subforum_right_title_mid_up`)
            let right = $(`.subforum_right_title_right_up`)

            if (favatar === null) {
                // 子版块
                renderPostInfoChild(left, symbolPostListNav.todaynum)
                renderPostInfoChild(mid, symbolPostListNav.post)
                renderPostInfoChild(right, symbolPostListNav.comments)

            } else {

                // 帖子页面
                renderPostInfoChild(left, symbolPostListNav.comments)
                renderPostInfoChild(mid, symbolPostListNav.viewnuminfo)
                renderPostInfoChild(right, symbolPostListNav.shoucang)

            }


        }
    }



    /**
     * 操作分页
     */
    function renderPagePanel() {

        let mnNavRight = $(`.mn-nav-right`)
        let mnNavRightControlPanel = $(`.mn-nav-right-control-panel`)
        // 分页栏
        if ($(`#pgt .pg`) !== null) {
            // 热门分页
            mnNavRight.insertBefore($(`#pgt .pg`), mnNavRightControlPanel)
        } else {
            // 子版分页
            if ($(`#fd_page_top .pg`) !== null) {
                mnNavRight.insertBefore($(`#fd_page_top .pg`), mnNavRightControlPanel)
            }
        }

        // 分页symbol
        if ($(`.mn-nav-right .prev`) !== null) {
            $(`.mn-nav-right .prev`).innerHTML = symbolHTML(symbolPostListNav.prePage)
        }
    }


    /**
     * 我的帖子列表
     */
    function renderMyPostBar() {
        let mn = $(`.mn`)
        let searchbody = $(`#searchbody`)
        let th = $(`#threadlist > .th`)

        let createMnSearchBar = () => {

            let mnSearchBar = document.createElement(`div`)
            mnSearchBar.id = `mn-search-bar`

            const searchRegx = {
                switch: /<a.+?>(.+?)<\/a>/gm,
                searchbody: /<tbody\s{0,}class="bw0_all"\s{0,}id="searchbody.+?\/tbody>/gms
            }

            let mnSearchSwitchTemplate = ``

            th.innerHTML.match(searchRegx.switch).forEach(a => {
                mnSearchSwitchTemplate += a
            })


            let mnSearchBodyTemplate = th.innerHTML.match(searchRegx.searchbody)[0]


            mnSearchBar.innerHTML = `
        <div class="mn-search-bar-switch">${mnSearchSwitchTemplate}</div>
        ${mnSearchBodyTemplate}`

            mn.insertBefore(mnSearchBar, mn.childNodes[2])

        }

        if (searchbody !== null) {
            console.log(`我的帖子列表`)
            createMnSearchBar()
        }



    }



    // 控制面板
    const symbolControlPanel = {
        rss: "keylolrss",
        control: "keylolcontrol",
        collect: "keylolcollect",
        rabbin: "keylolrabbin",
        lolshare: "keylolshare",
    }
    /**
     * 控制面板
     */
    function renderControlPanel() {
        // 订阅、收藏 管理面板 回收站
        // 控制面板
        const controlPanelRegex = {
            rss: /rss/gms,
            control: /modcp/gms,
            collect: /favorite/gms,
            rabbin: /回收/gms,
            lolshare: /t\d\d\d/gms,
        }

        let mnNavRightControlPanel = $(`.mn-nav-right-control-panel`)

        let mnNavControlPanelNodes = $All(`div[class*="subforum_left_title_right"]`)
        if (mnNavControlPanelNodes !== null) {
            // .y 热门版块
            let yNode = $(`.bm_h.cl .y`)
            if (yNode !== null) {
                mnNavRightControlPanel.insertBefore(yNode, null)
            }

            // div[class*="subforum_left_title_right"] 子版块
            mnNavControlPanelNodes.forEach((node) => {
                mnNavRightControlPanel.insertBefore(node, null)
            })

            // 替换symbol
            $All(`.mn-nav-right-control-panel a`).forEach((node) => {
                for (const key in controlPanelRegex) {
                    console.log(node.href)
                    if (controlPanelRegex[key].test(node.href) == true || controlPanelRegex[key].test(node.innerHTML) == true) {
                        node.innerHTML = `<span>${symbolHTML(symbolControlPanel[key])}</span><span class="control-panel-tip">${node.innerHTML}</span>`
                    }
                }
            })
        }
    }



    /**
     * 用户头像
     * @param {string} suid
     * @param {string} size small middle
     */
    function avatarImgUrl(suid, size) {
        let suidCache = []

        for (let i = suid.length - 1; i > -1; i -= 2) {
            let suidNum = `${suid.charAt(i - 1)}${suid.charAt(i)}`
            suidCache.push(`${suidNum.padStart(2, "0")}`)
        }
        suidCache.reverse()

        let avatarNum = suidCache.length > 3 ? ((suidCache[0] = suidCache[0].padStart(3, "0")), suidCache) : (suidCache.unshift(`000`), suidCache)

        return `https://keylol.com/uc_server/data/avatar/${avatarNum.toString().replace(/,/gm, `/`)}_avatar_${size}.jpg`
    }

    /**
     * 列表渲染
     */
    function postListTrRender(trNode) {


        const tdRegx = /tr|td|th/gms
        const divRegx = /<div.+?\/div>/gms
        const icnRegx = /<td.+?icn.+?td>/gms

        const commonAtag = /th.+?(<a\s+href="(t|forum\.php\?mod=view).+?xst.+?a>).+?th>/gms
        const commonRegx = /<th.+?"(common|lock|new).+?<\/th>/gms
        const commonTdAtag = /(fn">)(|\/em).+?(<a\s{0,}href="t.+xst.+?a>)/gms
        const commonTdRegx = /td><td.+?xst.+?td>/gms
        const commonThRegx = /<th.+?(<a.+?<\/a>).+?<\/th>/gms

        const lastCommont = /td>\s*(<td.+?by.+?username.+?<\/td>)/gms

        const userHotRegx = /(<a href="suid-.+?>)(.+?)(<\/a>)/gms
        const userRegx = /by-author">\s{0,}<cite class="threadlist-reply-username".+?(<a.+?>)(.+?)(<\/a>)<\/cite>/gms

        // 
        // /em>(<span.+?title="\d\d\d\d-\d.+?<\/span>).+?<\/em>/gms
        const postTimeRegx = /em>(<span.+?\d\d\d\d-\d.+?<\/span>).+?<\/em>/gms
        const postTimeEmRegx = /cite>\s{0,}<em>(\d{4}.+?表)<\/em>/gms

        const attachImgRegx = /<img.+?(attach_img|.+?image_s).+?>/gm
        const agreeRegx = /<img.+?agree.+?>/gm
        const lockRegx = /\[阅读权限.+?(\d+)<\/span>\]/gm
        const joinRegx = /<span class="xi1">(\d+?)人参与<\/span>/gm

        const tpsAtag = /<a.+a>/gms
        const tpsRegx = /<span class="tps">.+<\/span>/gm

        const rewardRegx = /<span class="xi1">\[悬赏 <span class="xw1">(\d+?)<\/span> 克蒸汽\]<\/span>/gm
        const replyReWardRegx = /<span class="xi1">\[回帖奖励 <strong> (\d+?)<\/strong> ]<\/span>/gm

        const attachmentRegx = /<img.+?(attachment|.+?filetype\/common.gif).+?>/gms
        const digestRegx = /<img.+?digest.+?>/gms

        const newPostRegx = /(<a href=.+?class="xi1">)(New)(<\/a>)/gm
        const suidRegx = /[s|u]{0,1}uid[\-|\=](\d+)/gm
        const solveRegx = /-\s{0,}(<a\s{0,}.+?rewardtype=2".+?>).+?(<\/a>)/gm
        const solveHotRegx = /\[已解决\]/gm

        // 判断帖子模式图标---
        function icn(icnHtml) {
            const icnFolderRegx = /.*folder_common.*/gms
            const icnRewardRegx = /reward/gm
            const icnLockRegx = /lock/gms
            const icnGlobalRegx = /pin_2/gms
            const icnTopRegx = /pin_1/gms
            const icnVsRegx = /debate/gms

            let icnTemplate = (symbolName) => {
                return `<div class="post-list-icn">${symbolHTML(symbolName)}</div>`
            }

            // 默认新窗口
            // 悬赏
            if (icnRewardRegx.test(icnHtml) == true) {
                return icnTemplate(symbolHotPostStats.reward)
            }

            if (icnLockRegx.test(icnHtml) == true) {
                return icnTemplate(symbolHotPostStats.closepost)
            }

            if (icnGlobalRegx.test(icnHtml) == true) {
                return icnTemplate(symbolHotPostStats.globaltop)
            }
            if (icnTopRegx.test(icnHtml) == true) {
                return icnTemplate(symbolHotPostStats.top)
            }

            if (icnVsRegx.test(icnHtml) == true) {
                return icnTemplate(symbolHotPostStats.vs)
            }
            if (icnFolderRegx.test(icnHtml) == true) {
                return ""
            }

            return ""
        }

        /**
         * 替换图标
         * @param {string} subTagHtml
         */
        function subTag(subTagHtml) {
            // 是否有图标的匹配规则不一样
            const tagRegx = {
                subjectIconRegx: /(<a title.+?>).+?(<\/a>)/gm,
                subJectRegx: /<em>\[(<a href=.+?>.+?<\/a>)\]<\/em>/gm,
            }
            // 有图标
            if (subTagHtml.match(tagRegx.subjectIconRegx) !== null) {
                return `<div class="post-list-icn">${subTagHtml.match(tagRegx.subjectIconRegx)[0].replace(
                    tagRegx.subjectIconRegx,
                    `
            $1${tagIconMatch(subTagHtml.match(tagRegx.subjectIconRegx)[0])}$2
          `
                )}
          </div>`
            }

            // 无图标
            if (subTagHtml.match(tagRegx.subJectRegx) !== null) {
                return `<div class="post-list-icn">${subTagHtml.match(tagRegx.subJectRegx)[0].replace(tagRegx.subJectRegx, "$1")}</div>`
            }
            return ""
        }

        /**
         * 先匹配replyByParentHTML，然后进一步匹配replyNodeRegx/replyDelForumNodeRegx 
         */
        function replyNum(html) {
            // 回复数

            const replyNodeRegx = /num">(<a.+?>)(\d+?)(<\/a>)(<em>)(\d+?)(<\/em>)/gm
            const replyDelForumNodeRegx = /num">.+?(<a.+?>)(\d{0,})(<\/a>).*(<em>)(\d{0,})(<\/em>)/gms
            // 父节点
            const replyByParentRegx = /by">(?!<a).+?cite.+?(<a.*?href=".+?)(<\/a>).+?(<a\s+.+?>.+?)(<\/a>)/gms

            const replyHTML = html.match(replyNodeRegx)
            const replyDelForumHTML = html.match(replyDelForumNodeRegx)

            const replyByParentHTML = html.match(replyByParentRegx)

            // 最后发表的tip
            let lastReplyTemplate = ``
            if (replyHTML !== null && replyByParentRegx !== null) {

                lastReplyTemplate =
                    replyByParentHTML.length > 1
                        ? replyByParentHTML[1].replace(replyByParentRegx, `<span>最后发表</span>$1$2$3$4`)
                        : replyByParentHTML[0].replace(replyByParentRegx, `<span>最后发表</span>$1$2$3$4`)

            } else if (replyDelForumHTML !== null && replyByParentRegx !== null) {
                // 访客视角
                lastReplyTemplate = replyByParentHTML[0].replace(replyByParentRegx, `<span>最后发表</span>$1$2$3$4`)
            }

            /**
             * 匹配详细的回复数
             * @param {*} ndoe 
             * @param {*} regx 
             * @param {*} tipTempelate 
             */
            let postReplyTemplate = (ndoe, regx, tipTempelate) => {
                return ndoe[0].replace(regx,
                    `<div>${symbolHTML(symbolHotPostInfo.reply)}<span>$2</span></div>
              <span class="post-reply-tip">${tipTempelate}</span>`
                )
            }

            let postReply = () => {
                if (replyHTML !== null) {
                    return postReplyTemplate(replyHTML, replyNodeRegx, lastReplyTemplate)
                } else if (replyDelForumHTML !== null) {
                    return postReplyTemplate(replyDelForumHTML, replyDelForumNodeRegx, lastReplyTemplate)
                }
            }

            return postReply()
        }

        // 渲染 -------------
        trNode.classList.add(`post-tr`)

        let tableHTML = trNode.innerHTML


        let suid = tableHTML.match(suidRegx) != null ? tableHTML.match(suidRegx)[0].replace(suidRegx, "$1") : ""

        let avatarUrl = avatarImgUrl(suid, `small`)

        // 用户头像$名称
        // example <a href="suid-562667" c="1" mid="card_3928">yuyym</a>
        //         <a class="threadlist-blue-text" href="home.php?mod=space&amp;uid=1330011"
        function user() {
            let userTemplate, userTemplateRegx

            if (tableHTML.match(userRegx) !== null) {
                userTemplate = tableHTML.match(userRegx)[0]
                userTemplateRegx = userRegx
            }
            if (tableHTML.match(userHotRegx) !== null) {
                userTemplate = tableHTML.match(userHotRegx)[0]
                userTemplateRegx = userHotRegx
            }

            return userTemplate !== undefined ? userTemplate.replace(
                userTemplateRegx,
                `
        $1
        <span class="post-avatar">
        <img src="${avatarUrl}">
        <span>$2</span>
        </span>  
        $3`
            )
                : ''
        }

        /**
         * 匹配帖子标题（内容）
         * 有三种不同的格式
         */
        function common() {


            if (tableHTML.match(commonRegx) !== null) {

                return tableHTML.match(commonRegx)[0].match(commonAtag)[0].replace(commonAtag, "$1")

            } else if (tableHTML.match(commonTdRegx) !== null) {
                //console.log(tableHTML.match(commonTdRegx)[0])
                return tableHTML.match(commonTdRegx)[0].match(commonTdAtag)[0].replace(commonTdAtag, "$3")
            } else {
                let th = tableHTML.match(commonThRegx)
                return th !== null ? tableHTML.match(commonThRegx)[0].replace(commonThRegx, "$1") : ''
            }


        }
        // 发表时间
        let postTime =
            tableHTML.match(postTimeRegx) !== null
                ? tableHTML.match(postTimeRegx)[0].replace(postTimeRegx, `$1`)
                : tableHTML.match(postTimeEmRegx) !== null
                    ? tableHTML.match(postTimeEmRegx)[0].replace(postTimeEmRegx, "$1")
                    : ""

        // 已完成节点
        let solve = () => {
            if (tableHTML.match(solveRegx) !== null) {
                return tableHTML.match(solveRegx)[0].replace(
                    solveRegx,
                    `
              <span class="post-solve">$1${symbolHTML(symbolHotPostInfo.postsolve)}$2</span>`
                )
            } else if (tableHTML.match(solveHotRegx) !== null) {
                return tableHTML.match(solveHotRegx)[0].replace(
                    solveHotRegx,
                    `
            <span class="post-solve">${symbolHTML(symbolHotPostInfo.postsolve)}</span>`
                )
            } else {
                return ""
            }
        }

        let attachImg = tableHTML.match(attachImgRegx) !== null ? symbolHTML(symbolHotPostInfo.attach_img) : ""
        let agree = tableHTML.match(agreeRegx) !== null ? symbolHTML(symbolHotPostInfo.agree) : ""


        let lock =
            tableHTML.match(lockRegx) !== null
                ? `
            <span class="post-lock">
                  <div>
                  ${symbolHTML(symbolHotPostInfo.lock)}
                  <span>${tableHTML.match(lockRegx)[0].replace(lockRegx, "$1")}</span>
                  </div>
                  <span class="post-lock-tip">阅读权限</span>
            </span>
        `
                : ""

        let join =
            tableHTML.match(joinRegx) !== null
                ? `
            <span class="post-join">
                  <span>${tableHTML.match(joinRegx)[0].replace(joinRegx, "$1")}</span>
                  <span class="post-join-tip">参与人数</span>
            </span>
        `
                : ""

        let reward =
            tableHTML.match(rewardRegx) !== null
                ? `
            <span class="post-reward">
                  <span>${tableHTML.match(rewardRegx)[0].replace(rewardRegx, "$1")}</span>
                  <span class="post-reward-tip">悬赏蒸气(克)</span>
            </span>
        `
                : ""

        let replyReward =
            tableHTML.match(replyReWardRegx) !== null
                ? `
            <span class="post-reply-reward">
                      <span>${tableHTML.match(replyReWardRegx)[0].replace(replyReWardRegx, "$1")}</span>
                      <span class="post-reply-reward-tip">奖励蒸气(克)</span>
            </span>
        `
                : ""

        let attachment = tableHTML.match(attachmentRegx) !== null ? symbolHTML(symbolHotPostInfo.postattachment) : ""
        let digest = tableHTML.match(digestRegx) !== null ? symbolHTML(symbolHotPostInfo.postdigest) : ""

        // 快速跳转

        let tps = tableHTML.match(tpsRegx) !== null ? `<span class="post-tps">${tableHTML.match(tpsRegx)[0].match(tpsAtag)[0]}</span>` : ""

        let newPost =
            tableHTML.match(newPostRegx) !== null
                ? tableHTML.match(newPostRegx)[0].replace(
                    newPostRegx,
                    `
        $1
        <span class="post-new">
        <span>${symbolHTML(symbolHotPostInfo.newpost)}</span>
        <span class="post-new-post-tip">新主题</span>
        </span>   
        $3
        `
                )
                : ""

        let trTemplate = `
                  ${icn(tableHTML.match(icnRegx)[0])}
                  ${subTag(tableHTML)}
                   <div class="post-list">
                           <div class="post-list-left">
                            <div class="post-list-common">
                            ${common()}
                              <div class="post-info">
                                ${join}
                                ${reward}
                                ${solve()}        
                                ${replyReward}
                                ${digest}
                                ${lock}
                                ${attachImg}
                                ${agree}
                                ${attachment}
                                ${newPost}
                                ${tps}
                              </div>
                            </div>
                       </div>
                       <div class="post-list-right">
                           <!--会员-->
                           <div class="post-list-right-l">
                               <div class="post-list-by-member">${user()}</div>
                               <div class="post-list-num">
                               ${replyNum(tableHTML)}
                               </div>
                               <div class="post-list-time">${postTime}</div>
                           </div>
                           <div class="post-list-right-r">
                           <!--时间-->
                               <div class="post-list-last-comment"></div>
                           </div>
                       </div>
                   </div>
             `
        //${tableHTML.match(lastCommont)[0]}
        trNode.innerHTML = trTemplate
    }




    /**
     * 渲染id为tbody[id*="thread"]>tr的列表
     */
    function renderThreadLists() {

        let postListNodes = $All(`tbody[id*="thread"]>tr`).length !== 0 ? $All(`tbody[id*="thread"]>tr`) : $All(`.pg_tag #ct > div > div.bm_c > table > tbody > tr`)


        postListNodes.forEach((trNode) => {
            postListTrRender(trNode)
        })
    }


    /**
     * 个人空间头像导航
     */
    function renderDelformNav() {
        let uhd = $(`#uhd`)
        let uhdLink = $(`#uhd .h.cl`)
        let uhdMn = $(`#uhd .mn`)
        let uhdAvt = $(`#uhd .avt`)
        let uhdUl = $(`#uhd ul.tb.cl`)
        let uhdSwitch = $(`.tbmu`)

        let uhdTemplate = `
      <div class="uhd-top">
         <div class="uhd-info">
              <div class="uhd-avatar">${uhdAvt.innerHTML}</div>
              <div class="uhd-link">${uhdLink.innerHTML.replace(uhdAvt.innerHTML, '')}</div>
         </div>
         <div class="uhd-mn">${uhdMn !== null ? uhdMn.innerHTML : ''}</div>
      </div>
      <div class="uhd-bottom">
      <div class="uhd-list-tab">${uhdSwitch !== null ? uhdSwitch.innerHTML : ''}</div>
      <div class="uhd-tab">${uhdUl.innerHTML}</div>
      </div>
      `

        if (uhd !== null) {
            uhd.innerHTML = uhdTemplate
            uhdSwitch !== null ? uhdSwitch.remove() : null
        }
    }


    /**
     * 访客视角的列表
     */
    function renderDelformLists() {
        let postListNodes = $All(`#delform tbody >tr`)

        postListNodes.forEach((trNode) => {
            if (trNode.childNodes.length > 3) {
                postListTrRender(trNode)
            }

        })

    }

    const symbolEditor = {
        attchment: "keylolattchment",
        atuser: "keylolatuser",
        autolayout: "keylolautolayout",
        blod: "keylolblod",
        centerlayout: "keylolcenterlayout",
        code: "keylolcode",
        downloadimg: "keyloldownloadimg",
        emoji: "keylolemoji",
        eraser: "keyloleraser",
        flash: "keylolflash",
        floatleft: "keylolfloatleft",
        floatright: "keylolfloatright",
        foldhide: "keylolfoldhide",
        fontbackground: "keylolfontbackground",
        fontcolor: "keylolfontcolor",
        fontitalic: "keylolfontitalic",
        fontunderline: "keylolfontunderline",
        fromword: "keylolfromword",
        gaojimoshi: "keylolgaojimoshi",
        img: "keylolimg",
        leftlaout: "keylolleftlaout",
        line: "keylolline",
        link: "keylollink",
        movie: "keylolmovie",
        music: "keylolmusic",
        musiclink: "keylolmusiclink",
        netease: "keylolnetease",
        neteaselist: "keylolneteaselist",
        normallist: "keylolnormallist",
        numberlist: "keylolnumberlist",
        phonetic: "keylolphonetic",
        postpassword: "keylolpostpassword",
        quoter: "keylolquoter",
        reflash: "keylolreflash",
        rightlaout: "keylolrightlaout",
        selectnomalsvg: "keylolselectnomalsvg",
        steamapp: "keylolsteamapp",
        steamappsub: "keylolsteamappsub",
        steamlink: "keylolsteamlink",
        suspend: "keylolsuspend",
        table: "keyloltable",
        texthidden: "keyloltexthidden",
        unlink: "keylolunlink",
        wallpaper: "keylolwallpaper",
        paging: "keylolpaging",
        free: "keylolfree",
        hidecontent: "keylolhidecontent",
        indexlist: "keylolindexlist",
        redo: "keylolredo",
        undo: "keylolundo",
        tuya: "keyloltuya"

    }

    /**
     * 渲染编辑器图标
     * 包含快速发帖，高级编辑器，设置编辑器
     */
    function renderEditorPermission() {
        /**
         * 元素id匹配
         */
        const symbolEditorRegex = {
            tuya: /e_tuya/,
            attchment: /e_attach/,
            atuser: /e_at$|fastpostat/,
            autolayout: /autotypeset/,
            blod: /B|bold/gms,
            centerlayout: /justifycenter/,
            code: /code/,
            downloadimg: /downremoteimg/,
            emoji: /sml/,
            eraser: /removeformat/,
            flash: /fls/,
            floatleft: /floatleft/,
            floatright: /floatright/,
            foldhide: /cst1_spoil/,
            fontbackground: /backcolor/,
            fontcolor: /forecolor/,
            fontitalic: /I|italic/gms,
            fontunderline: /U|underline/gms,
            fromword: /pasteword/,
            gaojimoshi: /高级模式/,
            img: /image|img/,
            leftlaout: /justifyleft/,
            line: /inserthorizontalrule/,
            link: /url/,
            movie: /vid/,
            music: /aud/,
            musiclink: /html5audio/,
            netease: /cst1_163/,
            neteaselist: /cst2_163a/,
            normallist: /insertunorderedlist/,
            numberlist: /insertorderedlist/,
            phonetic: /cst2_rb/,
            postpassword: /password/,
            quoter: /quote/,
            reflash: /换一个/,
            rightlaout: /justifyright/,
            selectnomalsvg: /fastpostrefresh/,
            steamapp: /cst1_sframe/,
            steamappsub: /cst2_sfpack/,
            steamlink: /cst2_steam/,
            suspend: /cst2_hover/,
            table: /tbl/,
            texthidden: /cst1_spoiler/,
            unlink: /unlink/,
            wallpaper: /postbg/,
            paging: /page/,
            free: /free/,
            hidecontent: /hide/,
            indexlist: /index/,
            redo: /redo/,
            undo: /undo/
        }

        let postNode = $(`#f_pst`)
        let postIconNode = $All(`.fpd a`)
        let postFullEditor = $All(`#e_controls a`)



        // 替换迷你编辑器图标
        if (postFullEditor !== null || postIconNode != null || signHtml !== null) {


            // 高级模式
            let toFullNode = $(`#fastposteditor > div > div.bar > span > a`)
            let minB = $(`.fpd > a:first-child`)
            let minAttl = $(`.webuploader-pick`)
            let paint = $(`#e_tuya`)

            /**
             * 无法匹配的特殊元素
             */
            toFullNode !== null ?
                toFullNode.innerHTML = `<span>${symbolHTML(symbolEditor.gaojimoshi)}</span><span class="editor-tip">切换高级模式</span>`
                : null

            // 加粗
            minB !== null ?
                minB.innerHTML = `<span>${symbolHTML(symbolEditor.blod)}</span><span class="editor-tip">${$(`.fpd > a:first-child`).title}</span>`
                : null

            // 附件
            minAttl !== null ?
                minAttl.innerHTML = `<span>${symbolHTML(symbolEditor.attchment)}</span><span class="editor-tip">上传附件</span>`
                : null

            // 涂鸦
            paint !== null ?
                paint.innerHTML = `<span>${symbolHTML(symbolEditor.tuya)}</span><span class="editor-tip">${paint.innerText}</span>`
                : null

            // a节点
            let contorBarNode = postIconNode !== null && postIconNode.length > 0 ? postIconNode : postFullEditor

            contorBarNode.forEach((a) => {

                if (a.tagName === "A") {

                    for (const key in symbolEditorRegex) {

                        if (symbolEditorRegex[key].test(a.id) == true) {

                            a.innerHTML = `<span>${symbolHTML(symbolEditor[key])}</span><span class="editor-tip">${a.title !== "" ? a.title : a.innerText}</span>`
                        }
                    }
                }
            })
        }
        if (postNode !== null) {
            console.log("have a post panel")
        }
    }

    /**
     * 无权发帖
     */
    function editorNoPermission() {
        let pthmNode = $(`.pt.hm`)
        let postForm = $(`#fastpostform`)
        postForm.innerHTML = `<span class="premission-tip">${pthmNode.innerHTML}</span>`
        $(`.forumrowdata`) !== null ? $(`.forumrowdata`).remove() : null
        $(`#f_pst>.bm_h`) !== null ? $(`#f_pst>.bm_h`).remove() : null
    }

    /**
     * ajax下一页后，渲染新增的DOM
     */
    function autopbn() {

        console.log(`has threadlisttableid`)

        let threadList = $(`#threadlisttableid`)

        if (threadList !== null) {

            let tableCallback = () => {

                let normalThreadTr = $All(`tbody[id*="normalthread"] tr`)

                normalThreadTr.forEach(tr => {

                    if (tr.className !== 'post-tr') {
                        postListTrRender(tr)
                    }

                })

            }

            let tableConfig = {
                childList: true,
            }

            let threadListObserver = new MutationObserver(tableCallback)
            threadListObserver.observe(threadList, tableConfig)
        }
    }

    // 用户面板
    const symbolUserCard = {
        addfriend: "keyloladdfriend",
        hi: "keylolhi",
        iconmail: "keyloliconmail",
        online: "keylolonline",
    }

    /**
     * 替换用户卡片弹窗
     */
    function userTipCard() {
        let appendParentNode = $(`#append_parent`)
        var config = {
            childList: true,
            attributeFilter: [],
        }

        let symbolUserCardCallback = function () {
            let callback = function () {
                let lastCardMenuId = appendParentNode.childNodes[appendParentNode.childNodes.length - 1].id

                let friend = $(`#${lastCardMenuId} a[id*="a_friend_li"]`)
                let poke = $(`#${lastCardMenuId} a[id*="a_poke"]`)
                let pm = $(`#${lastCardMenuId} a[id*="a_sendpm"]`)

                friend.innerHTML = `<span>${symbolHTML(symbolUserCard.addfriend)}</span><span class="user-card-tip">${friend.innerText}</span>`
                poke.innerHTML = `<span>${symbolHTML(symbolUserCard.hi)}</span></span><span class="user-card-tip">${poke.innerText}</span>`
                pm.innerHTML = `<span>${symbolHTML(symbolUserCard.iconmail)}</span></span><span class="user-card-tip">${pm.innerText}</span>`
            }
            setTimeout(callback, 130)
            clearTimeout(callback)
        }
        let userCardObserver = new MutationObserver(symbolUserCardCallback)

        userCardObserver.observe(appendParentNode, config)
    }


    /**
     * 帖子详细相关-------------------------------------------
     * 
     */
    /**
     * 帖子内容导航
     */
    function postContentNav() {
        const postNavTemplate = `
      <div id="mn-content-title"></div>
      <div id="mn-nav-parent">
           <div class="mn-nav-left"></div>
           <div class="mn-nav-right">
               <div class="mn-nav-right-control-panel"></div>
           </div>
      </div>
      `

        let wp = $(`#wp`)
        let postNavParent = document.createElement(`div`)
        postNavParent.id = `mn`
        postNavParent.innerHTML = postNavTemplate

        wp.insertBefore(postNavParent, wp.childNodes[0])

        // // 移动节点
        let titleNode = $(`#thread_subject`)
        let tagInfo = $(`.subforum_left_title_left_up a:last-child`)
        let infoNode = $(`.subforum_right_title`)

        let postContentTitle = $(`#mn-content-title`)
        let postNavLeft = $(`.mn-nav-left`)

        postContentTitle.insertBefore(titleNode, null)
        postContentTitle.insertBefore(tagInfo, null)
        postNavLeft.insertBefore(infoNode, null)

    }



    const symbolPostStatus = {
        // 用户卡片图标
        coin: "keylolcoin",
        percent: "keylolpercent",
        steamcreate: "keylolsteamcreate",
        comments: "keylolcomments",
        post: "keylolpost",
        steampoint: "keylolsteampoint"
    }

    /**
     * 渲染用户卡片
     * @param {Element} post
     */
    function renderPostFavatar(post) {

        let favatarNode = $(`#${post.id} div[id*="favatar"]`)

        const postUserInfoRegx = {
            // 头像用户名等
            username: /(<a.+?suid.+?>.+?<\/a>)/gm,
            avatar: /<div.+?avatar.+?img.+div>/gm,
            customstatus: /<p.+customstatus.+?<\/p>/gm,
            medal: /<p.+?class="md_ctrl.+?p>/gm,
            level: /<a.+usergroup.+?img.+?<\/a>/gm,
        }

        const postStatusRegx = {

            // 积分信息    
            steamcreate: /(<a.+?type=create.+?>.+?<\/a>)<\/p>(.+?)<\/th>/gm,
            percent: /th.+?(<a.+?\d{0,}%<\/a>).+?p>(.+?)<\/th>/gm,
            steampoint: /td.+?(<a\s{0,}class.+?do=profile.+?>\d{0,}(?!%)<\/a>).+?p>(.+?)<\/td>/gm,
            post: /(<a.+?type=thread.+?>\d{0,}<\/a>).+?\/p>(.+?)<\/th>/gm,
            comments: /<th><p>(<a\s{0,}href="home\.php\?mod=space&amp;uid=\d{0,}&amp;do=thread&amp;type=reply&amp;view=me&amp;from=space".+?>.+?\/a>)<\/p>(.+?)<\/th>/gm,
            coin: /<p>(<a href="home\.php\?mod=space&amp;uid=\d{0,}&amp;do=profile"\s{0,}class="xi2".+?\/a>)<\/p>(.+?)<\/td>/gm

        }

        let favatarHTML = favatarNode !== null ? favatarNode.innerHTML : ''


        function avatar() {
            let elementMatch = favatarHTML.match(postUserInfoRegx.avatar)
            return elementMatch !== null ? elementMatch[0] : ''
        }

        function username() {
            let elementMatch = favatarHTML.match(postUserInfoRegx.username)
            return elementMatch !== null ? elementMatch[0] : ''
        }

        function customStatus() {
            let elementMatch = favatarHTML.match(postUserInfoRegx.customstatus)
            return elementMatch !== null ? elementMatch[0] : ''
        }


        function favatarStatus() {

            let favatarStatusTemplate = ``

            for (const key in postStatusRegx) {
                if (postStatusRegx[key].test(favatarHTML) === true) {

                    let elementMatch = favatarHTML.match(postStatusRegx[key])[0]

                    favatarStatusTemplate += elementMatch.replace(postStatusRegx[key],
                        `
              <div>
              <span class="favatar-info-title">${symbolHTML(symbolPostStatus[key])}<span>$2</span></span>
              <span>$1</span>
              </div>
            `
                    )

                }
            }

            return favatarStatusTemplate

        }

        function level() {
            let elementMatch = favatarHTML.match(postUserInfoRegx.level)
            return elementMatch !== null ? elementMatch[0] : ''
        }

        function medal() {
            let elementMatch = favatarHTML.match(postUserInfoRegx.medal)
            return elementMatch !== null ? elementMatch[0] : ''
        }


        let favatarTemplate = `
      <div class="favatar-top">
          <div class="favatar-avatar">${avatar()}</div>
          <div class="favatar-name">${username()}</div>
          <div class="favatar-status">${customStatus()}</div>
      </div>
      <div class="favatar-mid">
          ${favatarStatus()}
      </div>
      <div class="favatar-bottom">
       ${level()}
       ${medal()}
      </div>
      `
        favatarNode.innerHTML = favatarTemplate

    }




    /**
     * 重构帖子内容布局
     * 包括主帖特殊按钮
     * @param {Element} post
     */
    function movePostElement(post) {
        /**
         * 如果不先移动需要的按钮，后面渲染图标时无法匹配会丢弃
         * @param {Element} favatar 用户卡片
         * @param {Element} postTopBarLeft 只看作者等菜单栏
         * @param {Element} postTopBarRight 楼层电梯
         * @param {Element} postSteamBar steam info
         * @param {Element} pstatus 最后编辑提醒
         * @param {Element} comment 回复按钮
         * @param {Element} postContent 帖子主要内容
         * @param {Element} collectBtn 收藏按钮
         * @param {Element} mainSupport 主贴支持按钮
         * @param {Element} postBottomBar 道具按钮等parent
         * @param {Element} sign 签名
         * @param {Element} ptn 收藏、支持等parent
         */
        function postTamplate(
            favatar,
            postTopBarLeft,
            postTopBarRight,
            postSteamBar,
            pstatus,
            comment,
            postContent,
            collectBtn,
            mainSupport,
            manageBtn,
            postBottomBar,
            sign,
            ptn

        ) {


            const symbolSelect = {
                selectnomalsvg: "keylolselectnomalsvg"
            }


            let postSteamBarHTML = postSteamBar !== null ? `<div class="steam_connect_user_bar">${postSteamBar.innerHTML}</div>` : ''
            let pstatusHTML = pstatus !== null ? ` <div class="pstatus">${pstatus.innerHTML}</div>` : ''

            postSteamBar !== null ? postSteamBar.remove() : null
            pstatus !== null ? pstatus.remove() : null

            // 删除无内容的点评
            if (comment !== null && comment.children.length === 0) {
                comment.remove()
            }



            // 楼层链接
            let floor = postTopBarRight.innerHTML.replace(postTopBarLeft.innerHTML, '')




            return `
        <div class="post-top" id="${post.id.replace(/post_/gm, `pid`)}">
            <div class="post-user-card"><div id="${favatar.id}">${favatar.innerHTML}</div></div>
            <div class="post-content">
                <div class="post-content-top">
                   <div class="post-content-top-left">${postTopBarLeft.innerHTML}</div>
                   <div class="post-content-top-right">
                   <div class="post-select"> 
                   ${manageBtn !== null ? manageBtn.innerHTML : ''}
                        ${manageBtn !== null ?
                    `<label title="" for="${manageBtn.getAttribute(`for`)}" class="post-select-label">${symbolHTML(symbolSelect.selectnomalsvg)}</label>`
                    : ''}
                        
                   </div>
                   ${postTopBarRight.innerHTML.replace(postTopBarLeft.innerHTML, '')}
                   </div>
                </div>
                ${postSteamBarHTML}
                ${pstatusHTML}
                <div class="post-content-mid">
                ${postContent.innerHTML.replace(postSteamBarHTML.innerHTML, '')}
                </div>
                <div class="post-content-sign">${sign !== null ? sign.innerHTML : ''}</div>
            </div>
        </div>
        <div class="post-bottom">
        ${collectBtn !== null ? collectBtn.innerHTML : ''}
        ${mainSupport !== null ? mainSupport.innerHTML : ''}
        ${ptn !== null ? ptn.innerHTML : ''}
        ${postBottomBar.innerHTML}
        </div> 
        `

        }


        // 移动帖子布局
        let id = post.id
        let favatarNode = $(`#${id} div[id*="favatar"]`)
        let postTopBarLeftNode = $(`#${id} .pti`)
        let postTopBarRightNode = $(`#${id} .plc>.pi`)
        let postSteamBarNode = $(`#${id} .steam_connect_user_bar`)
        let pstatusNode = $(`#${id} .pstatus`)
        let commentNode = $(`#${id} [id^="comment_"] `)
        let postConentNode = $(`#${id} .pct`)
        // P_btn栏和收藏同级别的所有图标
        let collectBtn = $(`#${id} #k_favorite`)
        let mainSupport = $(`#${id} #recommend_add`)

        let manageBtn = $(`#${id} label[for^="manage"]`)


        //
        let ptn = $(`#${id} #p_btn`)
        let postBottomBar = $(`#${id} .po.hin`)

        // 签名
        let sign = $(`#${id} .sign`)

        post.innerHTML = postTamplate(
            favatarNode,
            postTopBarLeftNode,
            postTopBarRightNode,
            postSteamBarNode,
            pstatusNode,
            commentNode,
            postConentNode,
            collectBtn,
            mainSupport,
            manageBtn,
            postBottomBar,
            sign,
            ptn,
        )

    }


    /**
     * 渲染论坛代码
     * @param {Element}} post 
     */
    function renderPostCode(post) {
        let blockCode = $All(`#${post.id} [id^="code_"]`)

        const blockCodeRegx = {
            lsb: /(\[)/gms,
            rsb: /(\])/gms
        }

        const blockCodeReplace = {
            lsb: `<span class="post-code-sb">$1</span>`,
            rsb: `<span class="post-code-sb">$1</span>`,
            http: `<span class="post-code-http">$1</span>`
        }

        blockCode.forEach(el => {
            let elTemplate = el.innerHTML
            for (const key in blockCodeRegx) {

                elTemplate = elTemplate.replace(blockCodeRegx[key], blockCodeReplace[key])
            }
            el.innerHTML = elTemplate
        })



    }

    /**
     * 重构帖子目录和目录内容请求方式
     * 
     * @param {Element} post 
     */
    function renderThreadindexListener(post) {


        let indexLi = $All(`#${post.id} #threadindex li`)
        let postmessage = $(`#${post.id} [id^="postmessage_"]`)

        // 移动目录节点
        let threadIndexNode = $(`#${post.id} #threadindex`)
        if (threadIndexNode !== null) {
            $(`#${post.id} .post-top`).insertBefore($(`#${post.id} #threadindex`), null)
        }


        /**
         * 请求目录内容
         */
        let indexLiCallback = () => {

            // 添加active
            event.target.parentNode.childNodes.forEach(li => {
                li.className = ''
            })

            event.target.className = 'post-index-active'

            let url = event.target.getAttribute(`contentUrl`)

            fetch(url)
                .then(res => {
                    if (res.ok) {
                        console.log(`fetch is done`)
                        return res.text()
                    }
                })
                .then(html => {
                    let domparser = new DOMParser()
                    let postmessageDOM = domparser.parseFromString(html, 'text/html')

                    // 移除多余编辑记录
                    let pstatus = postmessageDOM.querySelector(`.pstatus`)
                    pstatus !== null ? pstatus.remove() : null
                    // 密码帖是.lock
                    let pmNode = postmessageDOM.querySelector(`[id^="postmessage_"]`)
                    let contentHTML = pmNode !== null ? pmNode.innerHTML : `<div class="locked">${postmessageDOM.querySelector(`.locked`).innerHTML}</div>`
                    postmessage.innerHTML = contentHTML
                })
                .catch(error => {
                    console.log(`something war wrong...`)
                })
        }



        indexLi.forEach(li => {

            const liUrlRegx = /.*'(forum.+?)'.+?'(post.+?)'.*/gm
            let liUrl = li.getAttribute('onclick').replace(liUrlRegx, `$1&inajax=1&ajaxtarget=$2`)
            li.setAttribute('contentUrl', liUrl)
            // 清除原来的监听
            li.removeAttribute('onclick')

            li.addEventListener('click', indexLiCallback)
        })
    }


    /**
     * 渲染steam信息栏
     * @param {Element} post 
     */
    function renderSympolSteamBar(post) {

        const symbolSteamBar = {
            Steam_icon_logo_post: "keylolSteam_icon_logo_post",
        }

        // 匹配steam图标
        let steamUserBar = $(`#${post.id} .steam_connect_user_bar`)

        if (steamUserBar !== null) {
            if (steamUserBar.firstChild !== null) {
                let steamName = document.createElement(`span`)
                steamName.className = `steam-name`
                steamName.innerHTML = `<span>${symbolHTML(symbolSteamBar.Steam_icon_logo_post)}</span><span>${steamUserBar.firstChild.textContent}</span>`
                steamUserBar.firstChild.textContent = ''
                steamUserBar.insertBefore(steamName, steamUserBar.childNodes[0])
            }
        }
    }





    /**
     * 重构帖子内容支持收藏举报等
     * 通过正则匹配.post-bottom-bar替换icon,无法匹配的会丢弃
     * 
     * @param {Element} post 
     */
    function renderPostBottomBar(post) {

        const symbolPostBottomBar = {
            hide: "keylolhide",
            jubao: "keyloljubao",
            shoucang: "keylolshoucangline",
            tiezidaoju: "keyloltiezidaoju",
            zhichi: "keylolzhichi",
            mainzhichi: "keylolzhichi",
            reply: "keylolcomments",
            editor: "keylolposteditor",
            addcoin: "keylolcoin",
            favoriteNotic: "keylolfavoritenotic"
        }

        // 规则顺序是图标排列顺序
        const symbolPostBottomRegx = {
            editor: /(<a.+?action=edit.+?>)(.+?)(<\/a>)/gm,
            reply: /(<a.+?action=reply.+?>)(.+?)(<\/a>)/gm,
            addcoin: /(<a.+?action=rate.+?>)(.+?)(<\/a>)/gm,
            //manage: /(<label.+?manage.+?autocomplete.+?>)(.+?)(<\/label>)/gms,
            shoucang: /(<a.+?ac=favorite.+?>)(.+?)(<\/a>)/gm,

            tiezidaoju: /p>\s{0,}(<a.+?mgc_post.+?>)(.+?)(<\/a>).+?(<ul.+?\/li.+?ul>)/gms,
            //hide: "keylolhide",   

            favoriteNotic: /(<a.+?favorite_notification.+?>)(.+?)(<\/a>)/gm,
            zhichi: /(<a\s{0,}class="replyadd.+?>)(.+?)(<\/a>)/gm,
            mainzhichi: /(<a.+?recommend_add.+?>)(.+?)(<\/a>)/gm,
            jubao: /(<a.+?mod=report.+?>)(.+?)(<\/a>)/gm


        }
        /**
         * 渲染内容图标
         */

        let popCl = $(`#${post.id} .post-bottom`)

        if (popCl !== null) {
            let popClTemplate = ``
            let popClHTML = popCl.innerHTML

            for (const key in symbolPostBottomRegx) {
                if (symbolPostBottomRegx[key].test(popClHTML) === true) {

                    let nodeMatch = popClHTML.match(symbolPostBottomRegx[key])[0].replace(symbolPostBottomRegx[key], `
                $1
                <span>${symbolHTML(symbolPostBottomBar[key])}</span>
                <span>$2
                </span>
                ${key === 'tiezidaoju' ? `<span class="mgc-post-list">$4</span>` : ''}
                $3
                `)

                    popClTemplate += nodeMatch
                }
            }

            popCl.innerHTML = popClTemplate
        }


    }



    /**
     * 渲染帖子倒序等图标
     * @param {Element} post 
     */
    function renderPostInfoSymbol(post) {

        const symbolPostTopBar = {
            posttime: "keyloltimesort",
            az: "keylolaZ",
            za: "keylolzA",
            onlyposter: "keylolonlyposter",
            readmode: "keylolreadmode",
            allposter: "keylolallposter"
        }


        // 对象顺序是按钮排序
        const postTopBarRegx = {
            //楼层管理员、楼主等
            authNormalIcon: /()(<img.+_(?!MEB).{0,}png">)()/gm,
            // 图标
            posttime: /(<em\s{0,}id="authorposto.+?>)(.+?)(<\/em>)/gm,
            postfrom: /(<span.+?xg1">)(.+?)(<\/span>)/gm,
            onlyposter: /(<a.+?authorid.+?>)(.+?)(<\/a>)/gm,
            allposter: /(<a.+?href="t.+?rel="nofollow">)(.+?)(<\/a>)/gm,
            az: /(<a.+?ordertype=2.+?>)(.+?)(<\/a>)/gm,
            za: /(<a.+?ordertype=1.+?>)(.+?)(<\/a>)/gm,
            readmode: /(<a.+?readmode.+?>)(.+?)(<\/a>)/gm

        }

        let postTopBar = $(`#${post.id} .authi`)

        if (postTopBar !== null) {

            let postTopBarTemplate = ``
            let nodeHTML = postTopBar.innerHTML

            for (const key in postTopBarRegx) {

                if (postTopBarRegx[key].test(nodeHTML) == true) {

                    postTopBarTemplate += nodeHTML.match(postTopBarRegx[key])[0].replace(postTopBarRegx[key],
                        `$1
          <span>
          ${key !== 'authNormalIcon' ? symbolHTML(symbolPostTopBar[key]) : ''}
          </span>
          <span>$2</span>
          $3
          `
                    )
                }
            }
            postTopBar.innerHTML = postTopBarTemplate
        }


    }



    /**
     * 加分面板图标
     * @param {Element} post 
     */
    function renderPostContentRatelog(post) {
        const symbolRatelog = {
            postaddscore: "keylolpostaddscore"
        }
        let ratelog = $(`#${post.id} [id*="ratelog_"] .xw1:nth-child(1) a`)
        if (ratelog !== null) {

            ratelog.innerHTML = `${symbolHTML(symbolRatelog.postaddscore)}<span>${ratelog.innerHTML}</span>`
        }
    }


    /**
     * 帖子内容相关函数组合
     * 渲染一个帖子内的单个楼层
     * @param {Element} post 
     */
    function renderPostContextAll(post) {
        renderPostFavatar(post)
        movePostElement(post)
        renderSympolSteamBar(post)
        renderPostBottomBar(post)
        renderPostInfoSymbol(post)
        renderPostContentRatelog(post)
        renderThreadindexListener(post)
        renderPostCode(post)
    }


    /**
     * 为帖子添加监听器
     * 修复回帖&评分
     */
    function renderPostAjaxListener() {
        console.log(`添加帖子监听`)

        let postLists = $(`#postlist`)

        let postAjaxCallback = (records) => {

            let postlistreplys = $All(`#postlist > [id^="post"]`)

            postlistreplys.forEach(postlist => {


                if (postlist.children[0].className !== `post-top` && postlist.children[0].children.length !== 0) {

                    console.log(true)

                    renderPostContextAll(postlist)
                }
            })

        }

        let postAjaxConfig = {
            childList: true,
            subtree: true,
            characterData: true
        }

        let postAjaxObserver = new MutationObserver(postAjaxCallback)
        postAjaxObserver.observe(postLists, postAjaxConfig)

    }


    /**
     * 帖子渲染函数组合----------------------
     * 
     * renderPostFavatar 用户面板
     * 
     * 
     */
    function renderPostContent() {

        let postLists = $All(`#postlist > [id^="post_"]`)

        postLists.forEach(postNode => {
            postNode.className = `post-content-list`
            renderPostContextAll(postNode)
        })

    }

    /**---------------------------------------------- */
    /**
     * 请求有链接的节点的首张图片
     * @param {Element} aNode 
     */
    function fetchPhoto(aNode) {

        const symbolLock = `keylolclosepost`

        let idJsonRegx = /<script type="application\/ld\+json">(.+?)<\/script>/s
        // /<img.+?file="(.+?)".+?>/
        let otherImgRegx = /<img.+?file="(http.+?\.(?!gif).{3,4})".+?>/gm

        aNode !== null ? aNode.className = `photo-link` : null

        let url = aNode !== null ? aNode.href : null

        if (url !== null) {

            fetch(url)
                .then(res => {
                    return res.text()
                })
                .then(bodyText => {

                    //console.log(bodyText)

                    let idJson = bodyText.match(idJsonRegx) !== null
                        ? JSON.parse(bodyText.match(idJsonRegx)[0].replace(idJsonRegx, '$1'))
                        : null

                    let otherImg = bodyText.match(otherImgRegx) !== null
                        ? bodyText.match(otherImgRegx)[0].replace(otherImgRegx, `$1`)
                        : null


                    let imgUrl = idJson !== null && idJson.images[0] !== undefined ? idJson.images[0] : otherImg

                    aNode.innerHTML += imgUrl !== null
                        ? `<div class="post-photo-img" style=" width:100%;height:100%; background-image:url(${imgUrl})"></div>`
                        : `<span class="photo-lock">${symbolHTML(symbolLock)}</span>`
                })
        }
    }

    /**
     * 渲染自拍条目
     */
    function renderPhotoForumLi(liNode) {

        const symbolPhoto = {
            comments: "keylolcomments",
            like: "keylolqinggan"
        }


        liNode.style = ''
        liNode.className = "photo-list"
        // /(<a\s{0,}href="t.+?onclick.+?title.+?>)(.+?)(<\/a>)/gm
        //(<a\s{0,}.+?onclick.+?title.+?>)(.+?)(<\/a>)
        let linkRegx = /(<a\s{0,}.+?onclick.+?title.+?>)(.+?)(<\/a>)/gm
        let titleRegx = /atarget.+?title="(.+?)"(.+?)</gm
        let userRegx = /(<a\s{0,}href=.+?id.+?(\d+)">)(.+?)(<\/a>)/gm
        let likeRegx = /喜欢:.+?(\d+)/gm
        let replyRegx = /回复">(\d+)/gm


        let liNodeHTML = liNode.innerHTML

        let linkHTML = liNodeHTML.match(linkRegx)
        let userHTML = liNodeHTML.match(userRegx)[0]
        let titlHTML = liNodeHTML.match(titleRegx)[0]



        let likeHTML = liNodeHTML.match(likeRegx)[0]
        let replyHTML = liNodeHTML.match(replyRegx)[0]

        let liTemplate = linkHTML !== null ? linkHTML[0].replace(linkRegx,
            `$1
          <div class="photo-mask">
              <div class="photo-title">${titlHTML.replace(titleRegx, `$1`)}</div>
              <div class="photo-user-tip">
                  <div class="photo-avatar">
                        <img src=" ${avatarImgUrl(userHTML.replace(userRegx, '$2'), 'middle')}">
                        <span>${userHTML.replace(userRegx, '$3')}</span>
                  </div>
                  <div class="photo-info">
                      <div>${symbolHTML(symbolPhoto.like)}<span>${likeHTML.replace(likeRegx, `$1`)}</span></div>
                      <div>${symbolHTML(symbolPhoto.comments)}<span>${replyHTML.replace(replyRegx, `$1`)}</span></div> 
                  </div>
               </div>
         </div>
      $3
      `
        )
            : ''

        liNode.innerHTML = liTemplate

        let a = liNode.firstElementChild

        fetchPhoto(a)
    }


    /**
     * 自动加载3页后，需要下页按钮
     * maxloadNum为0取消ajax加载
     * 
     */
    function renderPhotoScrollLoad() {


        let waterFallNode = $(`#water-fall`)

        let defultPgbtn = $(`.pgbtn`)
        let nextUrl = defultPgbtn !== null ? defultPgbtn.firstChild.href : ''

        // 去除默认下拉更新
        document.querySelector(`script[reload*="1"]`).remove()
        defultPgbtn !== null ? defultPgbtn.remove() : ''

        let moderate = $(`#moderate`)


        let pageRegx = /(.*page=)(\d+)/gm
        let pageDomin = nextUrl.replace(pageRegx, '$1')
        let page = Number(nextUrl.replace(pageRegx, '$2'))

        // 添加加载按钮
        let photoNext = document.createElement('a')
        photoNext.id = `photo-next`
        photoNext.setAttribute(`domin`, pageDomin)
        photoNext.setAttribute(`page`, page)
        photoNext.setAttribute(`nextpage`, `0`)
        photoNext.innerText = `加载更多`

        moderate.insertBefore(photoNext, null)

        let photoNextNode = $(`#photo-next`)

        // 加载页面
        let fetchNextPhotoList = () => {

            let photoNextBtn = $(`#photo-next`)

            if (photoNextBtn !== null) {

                let domin = photoNext.getAttribute(`domin`)
                let page = photoNext.getAttribute(`page`)


                fetch(domin + page)
                    .then(res => {
                        return res.text()
                    })
                    .then(bodyText => {

                        let domparser = new DOMParser();
                        let photoDOM = domparser.parseFromString(bodyText, `text/html`)

                        let waterfall = photoDOM.querySelector(`#waterfall`)

                        waterFallNode.innerHTML += waterfall.innerHTML

                        // 增加页数
                        let currentPage = Number(photoNextBtn.getAttribute(`page`))
                        photoNextBtn.setAttribute(`page`, currentPage + 1)


                        // 改变地址栏
                        let state = {
                            page: page,
                        };
                        window.history.replaceState(state, "fetch photo", domin + page);

                        // 重渲染列表
                        $(`#water-fall`).childNodes.forEach(li => {
                            if (li.nodeName !== '#text' && li.className === '') {
                                console.log(li.offsetWidth)
                                renderPhotoForumLi(li)
                            }

                        })


                    }).catch(err => {

                    })
            }




        }

        photoNextNode.addEventListener('click', fetchNextPhotoList)



        window.addEventListener(`scroll`, () => {

        })

        console.log(pageDomin)
        console.log(page)

    }

    /**
     * 自拍版块
     */
    function renderPhotoForum() {

        $(`#waterfall`).id = `water-fall`

        let photoLi = $All(`#water-fall li`)

        photoLi.forEach(li => {

            renderPhotoForumLi(li)

        })

        renderPhotoScrollLoad()
    }



    /**
     * 渲染登录图标
     */
    function renderLoginSymbol() {
        const symbolDuceapp = {
            wechat: 'kelolwechat',
            qq: 'kelolTencent_QQ-Logowine1'
        }
        let duceapp_cv_body = $(`.duceapp_cv_body`)
        let wechaTip = $(`.wxlogin_tip`)
        let qqTip = $(`.duceapp_qqlogin`)

        wechaTip !== null ? wechaTip.firstChild.innerHTML = symbolHTML(symbolDuceapp.wechat) : null
        qqTip !== null ? qqTip.firstChild.innerHTML = symbolHTML(symbolDuceapp.qq) : null

    }

    /**---------------------------------------------- */
    /**
     * 列表相关函数组合
     */
    function hotPostAll() {
        renderPostListNav()
        renderNewBtn()
        renderPostInfo()
        renderPagePanel()
        renderControlPanel()
        renderMyPostBar()
        renderThreadLists()
    }

    /**
     * 判断发帖权限
     */
    function postPanel() {

        if ($(`#e_controls`) !== null) {
            console.log(`editor`)
            renderEditorPermission()

        } else if ($(`.pt.hm`) == null) {
            console.log(`min post`)
            renderEditorPermission()
        } else {
            console.log(`无权发帖`)
            editorNoPermission()
        }
    }

    /**
     * 判断页面来操作不同的节点
     */
    let pageDecide = function () {
        // https://keylol.com
        let keylolDomin = `.*${document.domain.replace(/\./gm, `\\.`)}`
        let currentHref = window.location.href

        // 首页
        let isHome = new RegExp(`(${keylolDomin}\/forum.php$)|(${keylolDomin}\/$)`, "gm").test(currentHref)
        // 热门主题列表
        let isHotPost = new RegExp(`${keylolDomin}\/forum.php\\?mod=guide.*`).test(currentHref)
        // 版块
        let isSubject = new RegExp(`(${keylolDomin}\/forum.php\\?mod=forumdisplay.*)|${keylolDomin}\/f\\d{3}.*`).test(currentHref)
        // 帖子
        let isPostContent = new RegExp(`(${keylolDomin}\/forum.php\\?mod=(viewthread|post).*)|(${keylolDomin}\/t\\d{3}.*)`).test(currentHref)

        let isLogin = /login|register/gm.test(currentHref)

        // 自拍区
        let isPhoto = /f(id=){0,1}(273|259)/gm.test(currentHref)

        //let isPost = new RegExp(`(${keylolDomin}\/forum.php\\?mod=post.*)|(${keylolDomin}\/t\\d{3}.*)`).test(currentHref)

        let isTags = new RegExp(`${keylolDomin}\/misc.php\\?mod=tag.*`).test(currentHref)

        // 访客视角
        let isVisit = new RegExp(`${keylolDomin}\/home.php\\?mod=space.+?from=space.*`).test(currentHref)
        let isMy = new RegExp(`${keylolDomin}\/suid-\d{0,}`).test(currentHref)

        let isSetting = new RegExp(`${keylolDomin}.+?(op=info|ac=pm)`).test(currentHref)

        if (isLogin == true) {
            console.log(`login`)
            renderLoginSymbol()
        }


        if (isHome == true) {
            console.log(`home`)
            home()
        }

        if (isHotPost == true) {
            console.log(`hot post`)
            hotPostAll()
            userTipCard()
        }

        if (isSubject == true) {
            console.log(`subject`)

            postPanel()

            renderPostListNav()
            renderNewBtn()
            renderPostInfo()
            renderPagePanel()
            renderControlPanel()
            renderThreadLists()
            userTipCard()
            autopbn()


            if (isPhoto == true) {
                renderPhotoForum()
                console.log(`photo`)
            }
        }

        if (isPostContent == true) {
            console.log(`post min panel`)

            postPanel()

            postContentNav()
            renderNewBtn()
            renderPostInfo()
            renderPagePanel()

            renderPostContent()
            renderControlPanel()

            renderPostAjaxListener()

        }


        // if (isPost == true) {
        //   console.log(`post content`)

        //   postPanel()

        // }

        if (isVisit == true || isMy == true) {
            console.log(`visit`)


            renderDelformNav()
            renderDelformLists()

        }

        if (isSetting == true) {
            console.log(`setting`)

            postPanel()
        }


        if (isTags == true) {

            console.log(`tags`)

            renderControlPanel()
            renderThreadLists()
            userTipCard()
            autopbn()

        }

    }

    // DOM加载后
    document.addEventListener("DOMContentLoaded", function (event) {
        navFunction()
        footer()
        pageDecide()
    })


    // Your code here...
    // 取消observer
    setTimeout(() => {
        observer.disconnect()
        moveObserver.disconnect()
    }, 300)
})()
