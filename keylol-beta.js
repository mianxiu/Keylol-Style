// ==UserScript==
// @name         card for keylol
// @namespace    http://tampermonkey.net/
// @version      0.11.6.0003
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
        body !== null && $(`#nav-menu-parent`) === null ? body.insertBefore(navMenuParent, $("#nav-menu")) : null
    }




    /**
     * 加载CSS
     */
    function createCss() {

        var cssString = `
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
        let actionBar = $("#nav-additional>#nav-user-action-bar")

        // 用户栏&LOGO
        navMenu !== null && tbContainer !== null ? navMenu.insertBefore(tbContainer, null) : null
        navMenu !== null && actionBar !== null ? navMenu.insertBefore(actionBar, null) : null
        navMenu !== null && logo !== null ? navMenu.insertBefore(logo, navMenu.childNodes[0]) : null
        navMenu !== null && navMenuParent !== null ? navMenuParent.insertBefore(navMenu, null) : null
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
        createElement()
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
                    aNode !== null ? aNode.insertBefore(document.createElement(`div`), imgNode) : null

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
        $("body") !== null ? $("body").insertBefore(indexSubjectParent, null) : null
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

        // 移动帖子标题节点
        let titleNode = $(`#thread_subject`)
        let forumTag = $(`.subforum_left_title_left_up a:last-child`)
        let infoNode = $(`.subforum_right_title`)

        let postContentTitle = $(`#mn-content-title`)
        let postNavLeft = $(`.mn-nav-left`)

        postContentTitle.insertBefore(titleNode, null)
        forumTag !== null ? postContentTitle.insertBefore(forumTag, null) : null
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

            let pid = post.id !== `postlistreply` ? post.id.replace(/post_/gm, `pid`) : ''


            return `
      <div class="post-top" >
          <div class="post-user-card"><div id="${favatar.id}">${favatar.innerHTML}</div></div>
          <div class="post-content" id="${pid}">
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
        let isPhoto = /f(id=){0,1}(273|259|330)/gm.test(currentHref)

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
