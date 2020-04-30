// ==UserScript==
// @name         keylol css
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  a style for keylol.com
// @author       mianxiu
// @match        keylol.com/*
// @grant        none
// @require      https://at.alicdn.com/t/font_1764890_hw9pknr37a9.js
// @require      https://at.alicdn.com/t/font_1791164_o28nhplbhdk.js

// ==/UserScript==

;(function () {
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

  // 首页symbol ---
  // 数组的顺序对应元素
  let symbol = function (id) {
    let span = document.createElement(`span`)
    span.className = `symbol-icons`
    span.innerHTML += `<svg class="icon" aria-hidden="true"><use xlink:href="#${id}"></use></svg>`
    return span
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

  // 搜索栏 消息 提醒
  // 搜索栏和导航栏
  const symbolNav = ["kelolmenu_iconsearch", "kelolmenu_icon_mail", "kelolmenu_icon_post_reply"]
  function setNavIcons() {
    let navNodes = {
      searchNode: $(`.search-bar-form > .dropdown `),
      actionNode: $(`#nav-user-action-bar > ul > li > a.btn-user-action`),
      highLightNode: $(`#nav-user-action-bar > ul > li > a.btn-user-action-highlight`),
    }

    let i = 0
    for (const key in navNodes) {
      let node = navNodes[key]

      if (node.firstChild != null) {
        node.firstChild.nodeValue = ``
      }
      navNodes[key].insertBefore(symbol(symbolNav[i]), node.children[0])
      i++
    }
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
    console.log(`add darkmode`)
    darkMode()
    console.log(`add nav menu icons`)
    setNavIcons()
    console.log(`add down menu icons`)
    setDownMenuIcons()
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
    $(`#pgt>a`).innerText += `发新帖`
    mnNavLeft.insertBefore($(`#pgt>a`), null)
    mnNavLeft.insertBefore($(`#thread_types`), null)

    mnNavRight.insertBefore($(`#pgt>.pg`), null)
    mnNavRight.insertBefore($(`.y`), null)

    // 列表
    let trNode = $All(`tbody>tr`)

    const tdRegx = /tr|td|th/gms
    const divRegx = /<div.+?\/div>/gms
    const userRegx = /(<a href="suid.+?>)(.+?)(<\/a>)/gm
    const suidRegx = /.*suid-(\d+).*/gms

    // middle大小头像链接
    function avatar(suid) {
      if (suid.length > 6) {
        return `//${document.domain}/uc_server/data/avatar/00${suid.charAt(0)}/${suid.charAt(1)}${suid.charAt(2)}/${suid.charAt(3)}${suid.charAt(4)}/${suid.charAt(5)}${suid.charAt(6)}_avatar_small.jpg`
        
      } else {
        return `//${document.domain}/uc_server/data/avatar/000/${suid.charAt(0)}${suid.charAt(1)}/${suid.charAt(2)}${suid.charAt(3)}/${suid.charAt(4)}${suid.charAt(5)}_avatar_small.jpg`

      }
    }

    for (let i = 1; i < trNode.length; i++) {
      let tnode = trNode[i]

      let tHtml = tnode.innerHTML.replace(tdRegx, `div`)
      let divs = tHtml.match(divRegx)

      let suid = divs[3].replace(suidRegx,'$1')

      let avatarUrl = avatar(suid)

      let user = tHtml.replace(
        userRegx,
        `
               $1<span class="post-avatar"><img src="${avatarUrl}"></span>
               <span>$2</span>$3
          `
      )

      let trTemplate = `
               <div class="post-list-icn">${divs[0]}</div>
               <div class="post-list-left">
                   <div class="post-list-common">${divs[1]}</div>
               </div>
               <div class="post-list-right">
                   <!--会员-->
                   <div class="post-list-right-l">
                       <div class="post-list-by-member">${user}</div>
                       <div class="post-list-num">${divs[4]}</div>
                   </div>
                   <div class="post-list-right-r">
                   <!--时间-->            
                       <div class="post-list-last-comment">${divs[5]}</div>
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
    //$("#nav-logo").innerHTML += symbol(`kelolsteam_panel_hot`)
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
