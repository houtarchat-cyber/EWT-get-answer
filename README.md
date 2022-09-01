# 升学 E 网通 (EWT360) 试题答案获取 - Beta
此脚本在 EWT 试题中获取试题答案并自动完成选择题。

[![EWT Killer](https://img.shields.io/github/v/release/houtarchat-cyber/EWT-get-answer?color=5d89d2&label=EWT%20Killer)](https://github.com/houtarchat-cyber/EWT-get-answer/releases/latest)
[![Published at](https://img.shields.io/github/release-date/houtarchat-cyber/EWT-get-answer?color=5d89d2&label=Published%20at)](https://github.com/houtarchat-cyber/EWT-get-answer/releases/latest)
[![GitHub license](https://img.shields.io/github/license/houtarchat-cyber/EWT-get-answer)](https://github.com/houtarchat-cyber/EWT-get-answer/blob/main/LICENSE)
[![CodeQL](https://github.com/houtarchat-cyber/EWT-get-answer/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/houtarchat-cyber/EWT-get-answer/actions/workflows/codeql-analysis.yml)
[![CodeFactor](https://www.codefactor.io/repository/github/houtarchat-cyber/ewt-get-answer/badge)](https://www.codefactor.io/repository/github/houtarchat-cyber/ewt-get-answer)
[![GitHub stars](https://img.shields.io/github/stars/houtarchat-cyber/EWT-get-answer)](https://github.com/houtarchat-cyber/EWT-get-answer/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/houtarchat-cyber/EWT-get-answer)](https://github.com/houtarchat-cyber/EWT-get-answer/network/members)
[![GitHub issues](https://img.shields.io/github/issues/houtarchat-cyber/EWT-get-answer)](https://github.com/houtarchat-cyber/EWT-get-answer/issues)

脚本主页：[https://greasyfork.org/zh-CN/scripts/450155-升学-e-网通-ewt360-试题答案获取-beta](https://greasyfork.org/zh-CN/scripts/450155-%E5%8D%87%E5%AD%A6-e-%E7%BD%91%E9%80%9A-ewt360-%E8%AF%95%E9%A2%98%E7%AD%94%E6%A1%88%E8%8E%B7%E5%8F%96-beta)

![Repository Image](https://repository-images.githubusercontent.com/529219578/34135101-3012-44ee-bf33-06e07ad36fd0)

此脚本在各浏览器与JavaScript引擎中均具有良好的兼容性(* *Internet Explorer与Duktape除外*)。

脚本开源于[Github](https://github.com/houtarchat-cyber/EWT-get-answer), 使用TypeScript编写。

[自述文件](README.md)
[贡献者公约](CODE_OF_CONDUCT.md)
[贡献指南](CONTRIBUTING.md)
[LICENSE](LICENSE)
[安全策略](SECURITY.md)

> 使用第三方脚本意味着您相信脚本的开发人员没有在代码中插入恶意功能，并且已经保护它免受试图这样做的攻击者的攻击。你永远不应该运行你不信任的代码。

> 本程序从未提供品质担保。本代码按原样提供，不提供任何明示或暗示的保证或条件，包括但不限于任何关于所有权、特定用途的适用性、适销性或非侵权性的默示保证或条件。

<details>
<summary>

## 用户脚本是什么？

</summary>

> 用户脚本是一段代码，它们能够优化您的网页浏览体验。安装之后，有些脚本能为网站添加新的功能，有些能使网站的界面更加易用，有些则能隐藏网站上烦人的部分内容。
</details>

<details open>
<summary>

### 第一步：安装一个用户脚本管理器
</summary>
要使用用户脚本，您首先需要安装一个用户脚本管理器。您可以根据当前使用的浏览器来选择一个用户脚本管理器。

<details>
<summary>

#### 桌面端
</summary>

 - Chrome：[Tampermonkey](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo) 或 [Violentmonkey](https://chrome.google.com/webstore/detail/violent-monkey/jinjaccalgkegednnccohejagnlnfdag)
 - Firefox：[Greasemonkey](https://addons.mozilla.org/firefox/addon/greasemonkey/)
   、[Tampermonkey](https://addons.mozilla.org/firefox/addon/tampermonkey/)
   或 [Violentmonkey](https://addons.mozilla.org/firefox/addon/violentmonkey/)
 - Safari：[Tampermonkey](https://www.tampermonkey.net/?browser=safari)
   或 [Userscripts](https://apps.apple.com/app/userscripts/id1463298887)
 - Microsoft
   Edge：[Tampermonkey](https://microsoftedge.microsoft.com/addons/detail/tampermonkey/iikmkjmpaadaobahmlepeloendndfphd)
 - Opera：[Tampermonkey](https://addons.opera.com/extensions/details/tampermonkey-beta/)
   或 [Violentmonkey](https://violentmonkey.github.io/get-it/)
 - Maxthon：[Violentmonkey](https://extension.maxthon.com/detail/index.php?view_id=1680)
 - AdGuard：（不需要其他软件）
 </details>

<details>
<summary>

#### 手机端（Android）
</summary>

- Firefox：[Greasemonkey](https://addons.mozilla.org/firefox/addon/greasemonkey/)
  、[Tampermonkey](https://addons.mozilla.org/firefox/addon/tampermonkey/)
  或 [Violentmonkey](https://addons.mozilla.org/firefox/addon/violentmonkey/)
- Maxthon：[Violentmonkey](https://extension.maxthon.com/detail/index.php?view_id=1680)
- Dolphin：[Tampermonkey](https://play.google.com/store/apps/details?id=net.tampermonkey.dolphin)
 - UC：[Tampermonkey](https://www.tampermonkey.net/?browser=ucweb&ext=dhdg)
 - Kiwi：[Tampermonkey](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo) 或 [Violentmonkey](https://chrome.google.com/webstore/detail/violent-monkey/jinjaccalgkegednnccohejagnlnfdag)
 - X浏览器
- [书签地球](https://www.bookmarkearth.com/download/app)
- [M浏览器](https://www.coolapk.com/apk/252747)
 </details>

<details>
<summary>

#### 手机端（iOS）
</summary>

- Safari：[Tampermonkey](https://www.tampermonkey.net/?browser=safari)
  或 [Userscripts](https://apps.apple.com/app/userscripts/id1463298887)
- [Gear](https://gear4.app/)：（不需要其他软件）
 </details>
</details>

<details open>
<summary>

### 第二步：安装此用户脚本
</summary>

脚本主页：[![https://greasyfork.org/zh-CN/scripts/450155-升学-e-网通-ewt360-试题答案获取-beta](https://greasyfork.org/packs/media/images/blacklogo96-b2384000fca45aa17e45eb417cbcbb59.png) 转到 Greasy Fork 安装!](https://greasyfork.org/zh-CN/scripts/450155-%E5%8D%87%E5%AD%A6-e-%E7%BD%91%E9%80%9A-ewt360-%E8%AF%95%E9%A2%98%E7%AD%94%E6%A1%88%E8%8E%B7%E5%8F%96-beta)
</details>

<details open>
<summary>

### 第三步：使用用户脚本
</summary>

现在您可以访问这个用户脚本所针对的网站，脚本应该已经自动启动和生效。
</details>

<details>
<summary>

## 声明
</summary>

本程序基于脚本[“升学 E 网通 (EWT360) 试题分析获取 - Beta”](https://greasyfork.org/zh-CN/scripts/448799-%E5%8D%87%E5%AD%A6-e-%E7%BD%91%E9%80%9A-ewt360-%E8%AF%95%E9%A2%98%E5%88%86%E6%9E%90%E8%8E%B7%E5%8F%96-beta)，参考使用了“EWT选择答案获取 V1.3”中的API。

本程序仅供学习交流之用，不得用于商业或其他非法用途。

《EWT选择答案获取V1.3》作者为志成zhi_cheng @zhicheng233 ，源码发布在 [Github](https://github.com/zhicheng233/EWT-get-answer) 。

“EWT选择答案获取V1.3”和本程序均在GNU通用公共许可协议第三版下发布。

可以在 &lt;[http://www.gnu.org/licenses/](http://www.gnu.org/licenses/)&gt; 找到GNU通用公共许可协议的副本。

《EWT选择答案获取V1.3》版权归其作者（即志成zhi_cheng）所有。

本程序版权为：Copyright (C) 2022-2025 Houtar

《EWT选择答案获取V1.3》作者邮箱：[2473367376@qq.com](mailto:2473367376@qq.com)

该程序作者的电子邮件地址：[houtarchaat@gmail.com](mailto:houtarchaat@gmail.com)

Houtar，2022 年 8 月 25 日
</details>
