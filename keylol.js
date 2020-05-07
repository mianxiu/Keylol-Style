// ==UserScript==
// @name         keylol css
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  a style for keylol.com
// @author       mianxiu
// @match        keylol.com/*
// @grant        none
// @require      https://at.alicdn.com/t/font_1797873_gp2i2yzhb75.js
// @require      https://at.alicdn.com/t/font_1764890_kx8zk1v655l.js
// @require      https://at.alicdn.com/t/font_1791164_o28nhplbhdk.js
// @require      https://at.alicdn.com/t/font_1794025_zq56oirsnm.js


// ==/UserScript==

/**this is iconfont.cn symbol
 * @require keylol editor icons link
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
    attributeFilter: []
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

  // 移动节点
  var moveElement = function () {
    let logo = $("body>.tb-container>#nav-logo")
    let navMenuParent = $("body>#nav-menu-parent")
    let navMenu = $("body>#nav-menu")
    let tbContainer = $("body>.tb-container")

    // 用户栏&LOGO
    navMenu.insertBefore(tbContainer, null)
    navMenu.insertBefore($("#nav-additional>#nav-user-action-bar"), null)
    navMenu.insertBefore(logo, navMenu.childNodes[0])
    navMenuParent.insertBefore(navMenu, null)
  }

  let darkModeCallback = () => {
    let darkModeValue = document.cookie.replace(/(?:(?:^|.*;\s*)darkMode\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    switch (darkModeValue) {
      case '1':
        $('html').classList.remove(`darkmode-css`)
        document.cookie = 'darkMode=0'
        break;
      case '0':
        $('html').classList.add(`darkmode-css`)
        document.cookie = 'darkMode=1'
        break;
    }
  }

  darkModeCallback()

  var listenElement = function () {
    moveElement()
    darkModeCallback()
  }

  var moveObserver = new MutationObserver(listenElement)
  moveObserver.observe(targetNode, observerOptions)

  // DOM加载完全后
  // 首页---------------------------------------------------------------------------------------
  let i = 1
  /**
   * fetch热门主题图片
   */
  function fetchHotImg() {
    let imgRegx = /\"(https:\/\/blob\.keylol\.com\/forum.+?)\"/s

    let hotImgPostUrls = $All(`.slideshow>li>a`)

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
            $(`.slidebar > ul >li:nth-child(${i})`).innerText = ``
            i++
          }
        })
    })
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
    $(`.subforunm_foot_text`).innerText = $(`.subforunm_foot_text`).innerText.replace(/\s+/gm, "")
  }

  /**
   * 深色模式
   */
  function darkMode() {
    let ul = $(`#nav-user-action-bar > ul > li.dropdown > ul`)
    ul.insertBefore(document.createElement(`li`), ul.children[0])
    ul.children[0].insertBefore(document.createElement(`a`), null)
    ul.children[0].children[0].id = `darkmode`

    let darkmodeNode = $(`#darkmode`)

    darkmodeNode.innerText = `深色模式`

    let darkModeValue = document.cookie.replace(/(?:(?:^|.*;\s*)darkMode\s*\=\s*([^;]*).*$)|^.*$/, "$1");


    // 初始化
    if (darkModeValue == '') {
      console.log('add darkmode cookie')
      document.cookie = 'darkMode=0'
    }
    darkmodeNode.addEventListener('click', darkModeCallback)
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
  const symbolNav = [
    "kelolmenu_iconsearch",
    "kelolmenu_icon_mail",
    "kelolmenu_icon_post_reply",
    "kelolkeylol_logo"
  ]
  function setNavIcons() {
    let navNodes = {
      searchNode: $(`.search-bar-form > .dropdown `),
      actionNode: $(`#nav-user-action-bar > ul > li > a.btn-user-action`),
      highLightNode: $(`#nav-user-action-bar > ul > li > a.btn-user-action-highlight`),
    }

    // 登录状态
    if (navNodes.highLightNode !== null) {
      let i = 0
      for (const key in navNodes) {
        let node = navNodes[key]

        if (node.firstChild != null) {
          node.firstChild.nodeValue = ``
        }
        navNodes[key].insertBefore(symbolHTMLNode(symbolNav[i]), node.children[0])
        i++
      }
    } else {
      // 未登录只插入搜索
      navNodes.searchNode.insertBefore(symbolHTMLNode(symbolNav[0]), navNodes.searchNode.children[0])
    }

    // 设置logo
    $("#nav-logo").innerHTML += symbolHTML(symbolNav[3])


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

  // 首页样式函数
  function home() {
    console.log(`fetch hot img`)
    fetchHotImg()

    console.log(`add tabPAHn0P_content show more button`)
    hotPostShowMore()

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
      lingyi: /灵异/gms
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
    vs: "keylolvs"
  }
  const symbolHotPostInfo = {
    attach_img: "keylolattach_img",
    agree: "keylolagree",
    reply: "keylolreply",
    newpost: "keylolnewpost",
    hidetop: "keylolhidetop",
    createnewpost: "keylolcreatenewpost",
    lock: "keylollock",
    postdigest: "keylolpostdigest",
    postattachment: "keylolpostattachment",
    postsolve: "keylolpostsolve"
  }

  // 控制面板
  const symbolControlPanel = {
    rss: "keylolrss",
    control: "keylolcontrol",
    collect: "keylolcollect",
    rabbin: "keylolrabbin"
  }

  // 移动列表导航
  const symbolPostNav = {
    prePage: "keylolpre-page",
    todaynum: "keyloltodaynum",
    post: "keylolpost",
    comments: "keylolcomments"
  }
  // 按tag排序图标
  const symbolPostSort = [
    "keylolviewsort",
    "keyloltypesort",
    "keyloltimesort",
    "keylolstatussort"
  ]


  /**
   * 移动子版列表导航
   */
  function movePostNav() {
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
    let mnNavLeft = $(`.mn-nav-left`)
    let mnNavRight = $(`.mn-nav-right`)
    let mnNavRightControlPanel = $(`.mn-nav-right-control-panel`)



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
      $All('.subforum_subject_detail_text_down div').forEach(node => {
        if (node.innerText === '｜' || node.innerHTML == '') {
          node.remove()
        }
      })
      $All('.subforum_subject_detail_text_down a').forEach(node => {
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
        if (ruleNode.innerHTML !== '') {
          mnNavRuleParentNode.insertBefore(ruleParent, null)
          $(`#mn-nav-rule-switch`).insertBefore($(`.ptn.xg2`), null)
          mnNavRuleParentNode.insertBefore(ruleNode, null)
        }



        // 添加切换按钮
        let switchRule = function () {

          let num = event.target.id.match(/\d+/gm)[0]
          $(`#current-forum-rule`).innerHTML = $(`#forum-rule-${num}`).innerHTML

        }

        $All(`.ptn.xg2 > a`).forEach(node => {
          node.removeEventListener('click', switchRule)
          node.addEventListener('click', switchRule)
        })

      }



      // 移动筛选栏
      detail2 = $All(`.subforum_subject2 > div.subforum_subject_detail2`)
      detail2.forEach(node => {
        node.style = ''
        $(`#mn-nav-sort-parent`).insertBefore(node, null)

      })

      // 筛选栏symbol
      let tagATagFirst = `#mn-nav-sort-parent .subforum_subject_detail_text_down > div:first-Child > a:first-Child`
      let i = 0
      $All(tagATagFirst).forEach(node => {
        node.innerHTML = `${symbolHTML(symbolPostSort[i])}<span>${node.innerText}</span>`
        i++
      })

      // 版块tag图标替换
      let tagAtag = `#mn-nav-tag-parent > div > div.subforum_subject_detail_text_down > div > a`
      $All(tagAtag).forEach(node => {


        let postTagNameRegx = /(.*)（.*/gm
        let postTagName = node.innerText.match(postTagNameRegx) !== null ?
          node.innerText.replace(postTagNameRegx, `$1`)
          : `<span class="post-tag-name">${node.innerText}</span>`
        let postNumRegx = /\d+/gm
        let postNum = node.innerText.match(postNumRegx) !== null ? `（${node.innerText.match(postNumRegx)[0]}）` : ''

        // 有img图标且有自定义图标时匹配替换
        if (node.children !== null && node.innerHTML !== tagIconMatch(node.innerHTML)) {
          node.innerHTML = `<span>${tagIconMatch(postTagName)}<span class="post-tag-num">${postNum}</span></span><span class="tag-tip">${node.innerText}</span>`
        }
      })


    }


    // new post btn
    $(`#pgt>a`).innerHTML = `${symbolHTML(symbolHotPostInfo.createnewpost)}<span>发新帖</span>`
    mnNavLeft.insertBefore($(`#pgt>a`), null)
    // 热门和子版导航不一样
    if ($('#thread_types') !== null) {
      // 热门导航
      mnNavLeft.insertBefore($(`#thread_types`), null)
    } else {
      // 子版信息
      $(`.subforum_right_title`).insertBefore($(`.subforum_left_title_left_down>div`), $(`.subforum_right_title`).children[0])
      mnNavLeft.insertBefore($(`.subforum`), null)

      // 子版信息symbol
      let today = $(`.subforum_right_title_left_up`)
      let post = $(`.subforum_right_title_mid_up`)
      let comment = $(`.subforum_right_title_right_up`)
      today.innerHTML = `<div class="suforum-symbol">${symbolHTML(symbolPostNav.todaynum)}<span class="subforum-info-tip">${today.innerHTML}</span></div>`
      post.innerHTML = `<div class="suforum-symbol">${symbolHTML(symbolPostNav.post)}<span class="subforum-info-tip">${post.innerHTML}</span></div>`
      comment.innerHTML = `<div class="suforum-symbol">${symbolHTML(symbolPostNav.comments)}<span class="subforum-info-tip">${comment.innerHTML}</span></div>`
    }


    // 分页栏
    if ($(`#pgt>.pg`) !== null) {
      // 热门分页
      mnNavRight.insertBefore($(`#pgt>.pg`), mnNavRightControlPanel)
    } else {
      // 子版分页
      if ($(`#fd_page_top>.pg`) !== null) {
        mnNavRight.insertBefore($(`#fd_page_top>.pg`), mnNavRightControlPanel)
      }


      // 分页symbol
      if ($(`.pg>.prev`) !== null) {
        $(`.pg>.prev`).innerHTML = symbolHTML(symbolPostNav.prePage)
      }



    }



    // 订阅、收藏 管理面板 回收站
    // 控制面板
    const controlPanelRegex = {
      rss: /订阅/gms,
      control: /管理/gms,
      collect: /收藏/gms,
      rabbin: /回收/gms
    }

    let mnNavControlPanelNodes = $All(`div[class*="subforum_left_title_right"]`)
    if (mnNavControlPanelNodes !== null) {

      // .y 热门版块
      let yNode = $(`.bm_h.cl .y`)
      if (yNode !== null) {
        mnNavRightControlPanel.insertBefore(yNode, null)
      }

      // div[class*="subforum_left_title_right"] 子版块
      mnNavControlPanelNodes.forEach(node => {

        mnNavRightControlPanel.insertBefore(node, null)
      })

      // 替换symbol
      $All(`.mn-nav-right-control-panel a`).forEach(node => {
        for (const key in controlPanelRegex) {
          if (controlPanelRegex[key].test(node.innerHTML) == true) {
            node.innerHTML = `<span>${symbolHTML(symbolControlPanel[key])}</span><span class="control-panel-tip">${node.innerHTML}</span>`
          }
        }
      })
    }
  }



  /**
   * 
   * @param {string} suid 
   * @param {string} size small middle
   */
  function avatar(suid, size) {
    let suidCache = []

    for (let i = suid.length - 1; i > -1; i -= 2) {
      let suidNum = `${suid.charAt(i - 1)}${suid.charAt(i)}`
      suidCache.push(`${suidNum.padStart(2, '0')}`)
    }
    suidCache.reverse()

    let avatarNum = suidCache.length > 3 ? (suidCache[0] = suidCache[0].padStart(3, '0'), suidCache) : (suidCache.unshift(`000`), suidCache)

    return `https://keylol.com/uc_server/data/avatar/${avatarNum.toString().replace(/,/gm, `/`)}_avatar_${size}.jpg`
  }



  /**
   * 列表渲染
   */
  function postListRender(trNode) {

    const tdRegx = /tr|td|th/gms
    const divRegx = /<div.+?\/div>/gms
    const icnRegx = /<td.+?icn.+?td>/gms

    const commontAtag = /th.+?(<a\s+href="(t|forum\.php\?mod=view).+?xst.+?a>).+?th>/gms
    const commontRegx = /<th.+?"(common|lock|new).+?<\/th>/gms

    const lastCommont = /td>\s*(<td.+?by.+?username.+?<\/td>)/gms

    const userRegx = /by-author">\s{0,}<cite class="threadlist-reply-username".+?(<a.+?a>)<\/cite>/gms

    const postTimeRegx = /em>(<span.+?title="\d\d\d\d-\d.+?<\/span>).+?<\/em>/gms
    const postTimeEmRegx = /cite><em>(\d{4}.+?表)<\/em>/gms

    const attacImgRegx = /<img.+?attach_img.+?>/gm
    const agreeRegx = /<img.+?agree.+?>/gm
    const lockRegx = /\[阅读权限.+?(\d+)<\/span>\]/gm
    const joinRegx = /<span class="xi1">(\d+?)人参与<\/span>/gm

    const tpsAtag = /<a.+?a>/gms
    const tpsRegx = /<span class="tps">.+<\/span>/gm

    const rewardRegx = /<span class="xi1">\[悬赏 <span class="xw1">(\d+?)<\/span> 克蒸汽\]<\/span>/gm
    const replyReWardRegx = /<span class="xi1">\[回帖奖励 <strong> (\d+?)<\/strong> ]<\/span>/gm

    const attachmentRegx = /<img.+?attachment.+?>/gms
    const digestRegx = /<img.+?digest.+?>/gms

    const newPostRegx = /(<a href=.+?class="xi1">)(New)(<\/a>)/gm
    const suidRegx = /[s|u]{0,1}uid[\-|\=](\d+)/gm
    const solveRegx = /(<a href.+?title="只看已.+?>).+?(<\/a>)/gm
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
        return ''
      }

      return ''

    }


    /**
     * 替换图标
     * @param {string} subTagHtml 
     */
    function subTag(subTagHtml) {
      // 是否有图标的匹配规则不一样
      const tagRegx = {
        subjectIconRegx: /(<a title.+?>).+?(<\/a>)/gm,
        subJectRegx: /<em>\[(<a href=.+?>.+?<\/a>)\]<\/em>/gm
      }
      // 有图标
      if (subTagHtml.match(tagRegx.subjectIconRegx) !== null) {
        return `<div class="post-list-icn">${subTagHtml.match(tagRegx.subjectIconRegx)[0].replace(tagRegx.subjectIconRegx,
          `
          $1${tagIconMatch(subTagHtml.match(tagRegx.subjectIconRegx)[0])}$2
        `
        )}
        </div>`
      }

      // 无图标
      if (subTagHtml.match(tagRegx.subJectRegx) !== null) {
        return `<div class="post-list-icn">${subTagHtml.match(tagRegx.subJectRegx)[0].replace(tagRegx.subJectRegx, '$1')}</div>`
      }
      return ''
    }


    // 回复---
    function replyNum(html) {


      // 回复数
      const replyNodeRegx = /num">(<a.+?>)(\d+?)(<\/a>)(<em>)(\d+?)(<\/em>)/gm
      const replyByNodeRegx = /by">(?!<a).+?cite.+?(<a.*?href=".+?)(<\/a>).+?(<a\s+.+?>.+?)(<\/a>)/gms
      const replyNode = html.match(replyNodeRegx)
      const replyByNode = html.match(replyByNodeRegx)


      if (replyNode !== null && replyByNodeRegx !== null) {
        // 最新回复人和时间
        let replyByTemplate = replyByNode.length > 1 ? replyByNode[1].replace(replyByNodeRegx, `<span>最后发表</span>$1$2$3$4`) : replyByNode[0].replace(replyByNodeRegx, `<span>最后发表</span>$1$2$3$4`)

        let replyTemplate = replyNode[0].replace(replyNodeRegx, `

        <div>${symbolHTML(symbolHotPostInfo.reply)}<span>$2</span></div><span class="post-reply-tip">${replyByTemplate}</span>`)
        return replyTemplate
      }

      return ''
    }



    // 渲染
    let tableHTML = trNode.innerHTML
    //let divs = tableHTML.match(divRegx)

    let suid = tableHTML.match(suidRegx) != null ? tableHTML.match(suidRegx)[0].replace(suidRegx, '$1') : ''

    let avatarUrl = avatar(suid, `small`)

    // 用户头像$名称
    // example <a href="suid-562667" c="1" mid="card_3928">yuyym</a>
    //         <a class="threadlist-blue-text" href="home.php?mod=space&amp;uid=1330011"
    if (tableHTML.match(userRegx) !== null) {
      tableHTML.match(userRegx)[0].innerHTML
    }

    let user = tableHTML.match(userRegx) !== null ? tableHTML.match(userRegx)[0].replace(userRegx,
      `
                
                <span class="post-avatar">
                <img src="${avatarUrl}">
                <span>$1</span>
                </span>
                
           `
    ) : ''



    // 发表时间
    let postTime = tableHTML.match(postTimeRegx) !== null
      ? tableHTML.match(postTimeRegx)[0].replace(postTimeRegx, `$1`)
      : tableHTML.match(postTimeEmRegx) !== null
        ? tableHTML.match(postTimeEmRegx)[0].replace(postTimeEmRegx,'$1')
        : ''


    // 已完成节点
    let solve = () => {
      if (tableHTML.match(solveRegx) !== null) {
        return tableHTML.match(solveRegx)[0].replace(solveRegx, `
            <span class="post-solve">$1${symbolHTML(symbolHotPostInfo.postsolve)}$2</span>`
        )
      } else if (tableHTML.match(solveHotRegx) !== null) {
        return tableHTML.match(solveHotRegx)[0].replace(solveHotRegx, `
          <span class="post-solve">${symbolHTML(symbolHotPostInfo.postsolve)}</span>`
        )
      } else {
        return ''
      }
    }


    let attachImg = tableHTML.match(attacImgRegx) !== null ? symbolHTML(symbolHotPostInfo.attach_img) : ''
    let agree = tableHTML.match(agreeRegx) !== null ? symbolHTML(symbolHotPostInfo.agree) : ''
    let lock = tableHTML.match(lockRegx) !== null ?
      `
          <span class="post-lock">
                <div>
                ${symbolHTML(symbolHotPostInfo.lock)}
                <span>${tableHTML.match(lockRegx)[0].replace(lockRegx, '$1')}</span>
                </div>
                <span class="post-lock-tip">阅读权限</span>
          </span>
      `
      : ''

    let join = tableHTML.match(joinRegx) !== null ?
      `
          <span class="post-join">
                <span>${tableHTML.match(joinRegx)[0].replace(joinRegx, '$1')}</span>
                <span class="post-join-tip">参与人数</span>
          </span>
      `
      : ''

    let reward = tableHTML.match(rewardRegx) !== null ?
      `
          <span class="post-reward">
                <span>${tableHTML.match(rewardRegx)[0].replace(rewardRegx, '$1')}</span>
                <span class="post-reward-tip">悬赏蒸气(克)</span>
          </span>
      `
      : ''

    let replyReward = tableHTML.match(replyReWardRegx) !== null ?
      `
          <span class="post-reply-reward">
                <span>${tableHTML.match(replyReWardRegx)[0].replace(replyReWardRegx, '$1')}
                    <span class="post-reply-reward-tip">奖励蒸气(克)</span>
                </span>
               
          </span>
      `
      : ''

    let attachment = tableHTML.match(attachmentRegx) !== null ? symbolHTML(symbolHotPostInfo.postattachment) : ''
    let digest = tableHTML.match(digestRegx) !== null ? symbolHTML(symbolHotPostInfo.postdigest) : ''


    // 快速跳转
    let tps = tableHTML.match(tpsRegx) !== null
      ? `<span class="post-tps">${tableHTML.match(tpsRegx)[0].match(tpsAtag)[0]}</span>`
      : ''

    let newPost = tableHTML.match(newPostRegx) !== null ? tableHTML.match(newPostRegx)[0].replace(newPostRegx,
      `
      $1
      <span class="post-new">${symbolHTML(symbolHotPostInfo.newpost)}</span>
      <span class="post-new-post-tip">新主题</span>
      $3
      `
    ) : ''

    let trTemplate = `
                ${icn(tableHTML.match(icnRegx)[0])}
                ${subTag(tableHTML)}
                 <div class="post-list">
                         <div class="post-list-left">
                         <div class="post-list-common">
                         ${tableHTML.match(commontRegx)[0].match(commontAtag)[0].replace(commontAtag, '$1')}
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
                             <div class="post-list-by-member">${user}</div>
                             <div class="post-list-num">
                             ${replyNum(tableHTML)}
                             </div>
                             <div class="post-list-time">${postTime}</div>
                         </div>
                         <div class="post-list-right-r">
                         <!--时间${tableHTML.match(lastCommont)[0]}-->
                             <div class="post-list-last-comment"></div>
                         </div>
                     </div>
                 </div>
                <div class="post-list-tip">
                    <div class="post-list-by-forum"></div>
                </div>  
           `
    trNode.innerHTML = trTemplate

  }



  function getPostListNode() {
    let postListNodes = $All(`tbody[id*="thread"]>tr`)
    postListNodes.forEach(trNode => {
      postListRender(trNode)
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
    wallpaper: "keylolwallpaper"
  }

  /**
   * 发帖模块
   */
  function postPanelPermission() {
    const symbolEditorRegex = {
      attchment: /attachn/,
      atuser: /fastpostat|at/,
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
      wallpaper: /postbg/
    }

    let postNode = $(`#f_pst`)
    let postIconNode = $(`.fpd`)
    let postFullEditor = $(`#e_body`)
    // 替换迷你编辑器图标
    if (postIconNode != null) {

      // 高级模式
      $(`#fastposteditor > div > div.bar > span > a`).innerHTML = `<span>${symbolHTML(symbolEditor.gaojimoshi)}</span><span class="editor-tip">切换高级模式</span>`
      // 加粗
      $(`.fpd > a:first-child`).innerHTML = `<span>${symbolHTML(symbolEditor.blod)}</span><span class="editor-tip">${$(`.fpd > a:first-child`).title}</span>`
      // 附件
      $(`.webuploader-pick`).innerHTML = `<span>${symbolHTML(symbolEditor.attchment)}</span><span class="editor-tip">上传附件</span>`

      // a节点
      postIconNode.childNodes.forEach(a => {

        if (a.tagName === 'A') {

          for (const key in symbolEditorRegex) {

            if (symbolEditorRegex[key].test(a.id) == true) {
              a.innerHTML = `<span>${symbolHTML(symbolEditor[key])}</span><span class="editor-tip">${
                a.title !== '' ? a.title : a.innerText
                }</span>`
            }
          }
        }
      })
    }
    if (postNode !== null) {
      console.log('have a post panel')
    }

  }


  /**
   * 无权发帖
   */
  function postPanelNoPermission() {
    let pthmNode = $(`.pt.hm`)
    let postForm = $(`#fastpostform`)
    postForm.innerHTML = `<span class="premission-tip">${pthmNode.innerHTML}</span>`
    $(`.forumrowdata`).remove()
    $(`#f_pst>.bm_h`).remove()

  }

  /**
   * ajax下一页后，渲染新增的DOM
   */
  function autopbn() {

    console.log(`has threadlisttableid`)

    let threadList = $(`#threadlisttableid`)

    if (threadList !== null) {


      let listTrnodeHistoryLength = threadList.childNodes.length

      let tableCallback = () => {

        let listTrNode = threadList.childNodes

        console.log(listTrnodeHistoryLength)
        console.log(listTrNode.length)

        for (let i = listTrNode.length - 1; i > listTrnodeHistoryLength - 1; i--) {

          //console.log(listTrNode[i].innerHTML)
          postListRender(listTrNode[i].childNodes[0])

        }

        listTrnodeHistoryLength = listTrNode.length

      }

      let tableConfig = {
        childList: true
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
    online: "keylolonline"
  }

  /**
   * 替换用户卡片弹窗
   */
  function userCard() {

    let appendParentNode = $(`#append_parent`)
    var config = {
      childList: true,
      attributeFilter: []
    };

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
      setTimeout(callback, 100)
      clearTimeout(callback)

    }
    let userCardObserver = new MutationObserver(symbolUserCardCallback)

    userCardObserver.observe(appendParentNode, config)

  }





  /**---------------------------------------------- */

  /**
   * 列表函数组合
   */
  function hotPost() {
    movePostNav()
    getPostListNode()
  }

  /**
   * 判断发帖权限
   */
  function postPanel() {
    // 无权发帖
    if ($(`.pt.hm`) == null) {
      postPanelPermission()
    } else {
      console.log(`无权发帖`)
      postPanelNoPermission()
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
    let isPost = new RegExp(`(${keylolDomin}\/forum.php\\?mod=viewthread.*)|(${keylolDomin}\/t\\d{3}.*)`).test(currentHref)

    if (isHome == true) {
      console.log(`i am home`)
      home()
    }

    if (isHotPost == true) {
      console.log(`i am hot post`)
      hotPost()
      userCard()

    }

    if (isSubject == true) {
      console.log(`i am subject`)

      postPanel()

      movePostNav()
      getPostListNode()
      userCard()
      autopbn()

    }

    if (isPost == true) {
      console.log(`i am post`)
    }
  }

  // DOM加载后
  document.addEventListener("DOMContentLoaded", function (event) {
    navFunction()
    footer()
    pageDecide()

  })

  var css = `
body{
background:green;
}



`
  // 添加css
  var node = document.createElement("style")
  node.type = "text/css"
  node.appendChild(document.createTextNode(css))
  var html = $("html")
  document.documentElement.appendChild(node)

  // Your code here...
  // 取消observer
  setTimeout(() => {
    observer.disconnect()
    moveObserver.disconnect()
  }, 300)
})()
