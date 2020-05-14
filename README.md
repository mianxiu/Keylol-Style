# ! 重要 Tampermonkey或其他扩展
>编辑脚本->设置->运行时期选`document-body&位置 1`

也可以使用stylus分开安装
- card-for-keylol.js 包含css和js
- keylol-beta.js
- keylol-beta.css

![](https://github.com/mianxiu/Keylol-Style/blob/master/sortcut/Snipaste_2020-05-12_23-57-47.png)
![](https://github.com/mianxiu/Keylol-Style/blob/master/sortcut/Snipaste_2020-05-12_23-57-23.png)
![](https://github.com/mianxiu/Keylol-Style/blob/master/sortcut/Snipaste_2020-05-12_16-07-34.png)
![](https://github.com/mianxiu/Keylol-Style/blob/master/sortcut/Snipaste_2020-05-12_16-07-02.png)

## symbol引用
iconfont
## 帖子点评的bug
论坛自带
## SEO
```json
<script type="application/ld+json">
{
    "@context": "https://ziyuan.baidu.com/contexts/cambrian.jsonld",
    "@id": "https://keylol.com/t588906-1-1",
    "appid": "1648820107470656",
    "title": "怎样才能打爆FPS外挂的狗头？",
    "images": ["https://blob.keylol.com/forum/202004/27/200541kjiocqahzxaikiqt.png","https://blob.keylol.com/forum/202004/27/200541q86hc520uclc82k2.jpg","https://blob.keylol.com/forum/202004/27/200549doxb7xrxxrxbksaz.png"],
    "description": "文：HypnosiaVX5前段时间，拳头公司的FPS新游《Valorant》在精妙营销操作之下热度暴增。各界玩家围观之余，也出现了角度刁钻的观点：这话仿佛在说，荼毒村庄的恶龙又来了，",
    "pubDate": "2020-04-27T20:09:18"
}
</script>
```
## 元素
ajaxwaitid 是进度提示

## 最后回复tip的匹配
有两种格式

子版块
```html
<td class="by">
<cite class="threadlist-reply-username">
<a class="threadlist-blue-text" href="home.php?mod=space&amp;username=%E5%A4%A9%E9%9B%B7%E6%97%A0%E5%A6%84" c="1" mid="card_2187">天雷无妄</a>
</cite>
<em><a href="forum.php?mod=redirect&amp;tid=588361&amp;goto=lastpost#lastpost">2020-5-4 12:11 回复</a></em>
```
热门主题，正则会匹配到两个
```html
<td class="by"><a href="f319-1" target="_blank">福利放送</a></td>
<td class="by">
<cite>
<a href="suid-1082564" c="1" mid="card_821">xdb123</a></cite>
<em><span><span title="2020-5-1">昨天&nbsp;18:36</span></span></em>
</td>
<td class="num"><a href="t590661-1-1" class="xi2">126</a><em>5146</em></td>
<td class="by">
<cite><a href="susername-aeonden121" c="1" mid="card_2261">aeonden121</a></cite>
<em><a href="forum.php?mod=redirect&amp;tid=590661&amp;goto=lastpost#lastpost">2020-5-5 00:00</a></em>
</td>
```
所以加入判断
```js
let replyByTemplate = replyByNode.length > 1 ? replyByNode[1].replace(replyByNodeRegx, `<span>最...
```
## 关于 MutationObserver
[MutationObserverInit](https://developer.mozilla.org/zh-CN/docs/Web/API/MutationObserverInit)的属性添加`attributeFilter:[]`时，可以屏蔽所有属性变动，只监听节点生成

## tip
[DOMContentLoaded](https://developer.mozilla.org/zh-CN/docs/Web/Events/DOMContentLoaded)

## flexbox 和 positon:sticky 混用修复
为使用sticky的元素添加`align-self:flex-start`
[my-position-sticky-element-isnt-sticky-when-using-flexbox](https://stackoverflow.com/questions/44446671/my-position-sticky-element-isnt-sticky-when-using-flexbox)

## 兼容
无法兼容firefox

`chrome` `edge beta` 测试通过
