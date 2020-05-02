// ==UserScript==
// @name         keylol css
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  a style for keylol.com
// @author       mianxiu
// @match        keylol.com/*
// @grant        none
// @require      https://at.alicdn.com/t/font_1764890_s32akqsl73.js
// @require      https://at.alicdn.com/t/font_1791164_o28nhplbhdk.js
// @require      https://at.alicdn.com/t/font_1794025_8s99ve1dib.js

// ==/UserScript==

; (function () {
  "use strict"

  function $(selector) {
    return document.querySelector(selector)
  }

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

  var listenElement = function () {
    moveElement()
  }

  var moveObserver = new MutationObserver(listenElement)
  moveObserver.observe(targetNode, observerOptions)

  // DOM加载完全后
  // 首页---------------------------------------------------------------------------------------
  // fetch热门主题图片
  let i = 1
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

  // 热门主题列表滚动监器
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

  // 移动版块节点
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

  // 移动子版块
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

    console.log(clearStats[5].split(`，`))
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
    //console.log(clearStats)

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

  // 去除footer多余空格
  function footer() {
    $(`.subforunm_foot_text`).innerText = $(`.subforunm_foot_text`).innerText.replace(/\s+/gm, "")
  }

  // 添加深色模式
  function darkMode() {
    let ul = $(`#nav-user-action-bar > ul > li.dropdown > ul`)
    ul.insertBefore(document.createElement(`li`), ul.children[0])
    ul.children[0].insertBefore(document.createElement(`a`), null)
    ul.children[0].children[0].id = `darkmode`
    let darkmodeNode = $(`#darkmode`)
    darkmodeNode.innerText = `深色模式`
  }

  // 首页symbol -----------------------------------------------------------------------
  // 数组的顺序对应元素
  let symbol = function (id) {
    let span = document.createElement(`span`)
    span.className = `symbol-icons`
    span.innerHTML += `<svg class="icon" aria-hidden="true"><use xlink:href="#${id}"></use></svg>`
    return span
  }

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
        node.insertBefore(symbol(symbolDownMenu[i]), node.children[0])
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
        navNodes[key].insertBefore(symbol(symbolNav[i]), node.children[0])
        i++
      }
    } else {
      // 未登录只插入搜索
      navNodes.searchNode.insertBefore(symbol(symbolNav[0]), navNodes.searchNode.children[0])
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
      node.insertBefore(symbol(symbolSteam[i]), null)
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
      node.insertBefore(symbol(symbolManufactrer[i]), null)
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
      node.insertBefore(symbol(symbolGameLogo[i]), null)
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
      node.insertBefore(symbol(symbolHelp[i]), null)
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
      node.insertBefore(symbol(symbolFree[i]), null)
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
    $(`div.navItem-1`).insertBefore(symbol(symbolGuide[0]), $(`div.navItem-1`).children[0])

    let guideNode = $All(`#forum-question > div.index_subject_row > div > div.subject_row_detail_pic > a`)
    let i = 1
    guideNode.forEach((node) => {
      node.innerHTML = ``
      node.insertBefore(symbol(symbolGuide[i]), null)
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
  // 列表替换
  const symbolHotPostStats = {
    reward: "keylolreward",
    closepost: "keylolclosepost",
    vote: "keylolvote",
    top: "keyloltop",
    globaltop: "keylolglobaltop"
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
  const symbolHotPostUser = {
    addfriend: "keyloladdfriend",
    iconmail: "keyloliconmail",
    hi: "keylolhi",
    online: "keylolonline"
  }


  function moveHotPost() {
    let mnNode = $(`.mn`)
    // 创建父节点
    let mnNavParentTemplate = `
          <div class="mn-nav-left"></div>
          <div class="mn-nav-right"></div>
        `
    let mnNavParent = document.createElement(`div`)
    mnNavParent.id = `mn-nav-parent`
    mnNavParent.innerHTML += mnNavParentTemplate

    mnNode.insertBefore(mnNavParent, mnNode.children[0])
    // 移动子节点
    let mnNavLeft = $(`.mn-nav-left`)
    let mnNavRight = $(`.mn-nav-right`)


    // new post btn
    $(`#pgt>a`).innerHTML = `${symbolHTML(symbolHotPostInfo.createnewpost)}<span>发新帖</span>`
    mnNavLeft.insertBefore($(`#pgt>a`), null)
    mnNavLeft.insertBefore($(`#thread_types`), null)

    if ($(`#pgt>.pg`) !== null) {
      mnNavRight.insertBefore($(`#pgt>.pg`), null)
    }

    mnNavRight.insertBefore($(`.y`), null)

  }


  function hotPostList() {
    // 列表
    let trNode = $All(`tbody>tr`)

    const tdRegx = /tr|td|th/gms
    const divRegx = /<div.+?\/div>/gms
    const userRegx = /(<a.+[s|u]id.+>)(.+?)(<\/a>)/gm
    const emRegx = /<em><span.+?<\/span><\/em>/gms
    const attacImgRegx = /<img.+?attach_img.+?>/gm
    const agreeRegx = /<img.+?agree.+?>/gm
    const lockRegx = /\[阅读权限.+?(\d+)<\/span>\]/gm
    const joinRegx = /<span class="xi1">(\d+?)人参与<\/span>/gm
    const tpsRegx = /<span class="tps">.+<\/span>/gm
    const rewardRegx = /<span class="xi1">\[悬赏 <span class="xw1">(\d+?)<\/span> 克蒸汽\]<\/span>/gm
    const replyReWardRegx = /<span class="xi1">\[回帖奖励 <strong> (\d+?)<\/strong> ]<\/span>/gm
    const attachmentRegx = /<img.+?attachment.+?>/gms
    const digestRegx = /<img.+?digest.+?>/gms
    const newPostRegx = /(<a href=.+?class="xi1">)(New)(<\/a>)/gm
    const suidRegx = /[s|u]{0,1}uid[\-|\=](\d+)/gm
    const solveRegx = /(<a href.+?title="只看已.+?>).+?(<\/a>)/gm
    const solveHotRegx = /\[已解决\]/gm

    // middle大小头像链接
    function avatar(suid) {
      if (suid.length > 6) {
        return `//${document.domain}/uc_server/data/avatar/00${suid.charAt(0)}/${suid.charAt(1)}${suid.charAt(2)}/${suid.charAt(3)}${suid.charAt(4)}/${suid.charAt(5)}${suid.charAt(6)}_avatar_small.jpg`

      } else {
        return `//${document.domain}/uc_server/data/avatar/000/${suid.charAt(0)}${suid.charAt(1)}/${suid.charAt(2)}${suid.charAt(3)}/${suid.charAt(4)}${suid.charAt(5)}_avatar_small.jpg`

      }
    }


    // 判断帖子模式---
    function icn(icnHtml) {

      const icnFolderRegx = /.*folder_common.*/gms
      const icnRewardRegx = /reward/gm
      const icnLockRegx = /lock/gms
      const icnGlobalRegx = /pin_2/gms
      const icnTopRegx = /pin_1/gms

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

      if (icnFolderRegx.test(icnHtml) == true) {
        return ''
      }

      return ''

    }


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

    // 替换图标---
    function subTag(subTagHtml) {

      const tagSymbolRegx = {
        yundong: /tle="运动/gms,
        guanshui: /tle="灌水/gms,
        licai: /tle="收藏/gms,
        lianji: /tle="交友/gms,
        shoucang: /tle="收藏/gms,
        yurenjie: /tle="愚人节/gms,
        haojia: /tle="好价/gms,
        qinggan: /tle="情感/gms,
        ouqi: /tle="欧气/gms,
        jiqiao: /tle="社区/gms,
        yingyin: /tle="影音/gms,
        lingyi: /tle="灵异/gms
      }

      let tagIconMatch = (html) => {
        for (const key in tagSymbolRegx) {
          if (html.match(tagSymbolRegx[key]) !== null) {
            return symbolHTML(symbolSubTag[key])
          }
        }

        return html
      }

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
      // <td class="num"><a href="t590966-1-1" class="xi2">0</a><em>0</em></td>
      const replyNodeRegx = /num">(<a.+?>)(\d+?)(<\/a>)(<em>)(\d+?)(<\/em>)/gm
      const replyByNodeRegx = /cite>(<a\s+href=.+?)(<\/a>).+?(<a\s+.+?>.+?)(<\/a>)/gms
      const replyNode = html.match(replyNodeRegx)
      const replyByNode = html.match(replyByNodeRegx)

      if (replyNode !== null && replyByNode !== null ) {   
        let replyByTemplate = replyByNode[0].replace(replyByNodeRegx,`$1$2$3$4`)
        let replyTemplate = replyNode[0].replace(replyNodeRegx,`
        <div>${symbolHTML(symbolHotPostInfo.reply)}<span>$2</span></div><span class="post-reply-tip">${replyByTemplate}</span>`)
        return replyTemplate
      }

      return ''
    }

    // 遍历每个帖子
    for (let i = 0; i < trNode.length; i++) {
      let tnode = trNode[i]

      let tableHTML = tnode.innerHTML.replace(tdRegx, `div`)
      let divs = tableHTML.match(divRegx)


      let suid = tableHTML.match(suidRegx) != null ? tableHTML.match(suidRegx)[0].replace(suidRegx, '$1') : ''

      let avatarUrl = avatar(suid)

      // 用户头像$名称
      // example <a href="suid-562667" c="1" mid="card_3928">yuyym</a>
      //         <a class="threadlist-blue-text" href="home.php?mod=space&amp;uid=1330011"
      let user = tableHTML.match(userRegx) !== null ? tableHTML.match(userRegx)[0].replace(userRegx,
        `
                $1
                <span class="post-avatar">
                <img src="${avatarUrl}">
                <span>$2</span>
                </span>
                $3
           `
      ) : ''



      // 发表时间
      let em = tableHTML.match(emRegx) !== null ? tableHTML.match(emRegx)[0] : ''


      // 已完成
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
      let tps = tableHTML.match(tpsRegx) !== null ? tableHTML.match(tpsRegx)[0].replace(/tps/, `post-tps`) : ''

      let newPost = tableHTML.match(newPostRegx) !== null ? tableHTML.match(newPostRegx)[0].replace(newPostRegx,
        `
      $1
      <span class="post-new">${symbolHTML(symbolHotPostInfo.newpost)}</span>
      <span class="post-new-post-tip">新主题</span>
      $3
      `
      ) : ''

      let trTemplate = `
                ${icn(divs[0])}
                ${subTag(tableHTML)}
                 <div class="post-list">
                         <div class="post-list-left">
                         <div class="post-list-common">
                         ${divs[1]}
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
                             <div class="post-list-time">${em}</div>
                         </div>
                         <div class="post-list-right-r">
                         <!--时间-->            
                             <div class="post-list-last-comment">${divs[5]}</div>
                         </div>
                     </div>
                 </div>
                <div class="post-list-tip">
                    <div class="post-list-by-forum">${divs[2]}</div>
                </div>  
           `
      tnode.innerHTML = trTemplate
    }
  }

  function hotPost() {
    moveHotPost()
    hotPostList()
  }

  // 判断页面来操作不同的节点
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
    }

    if (isSubject == true) {
      console.log(`i am subject`)
      hotPostList()
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
