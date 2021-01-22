// ==UserScript==
// @name         Web工具箱
// @namespace    https://github.com/zhchjiang95/WebPage-Tools
// @version      1.0.4
// @description  针对/精简所有用户体验不爽的网站。
// @author       zhchjiang95 <i@fiume.cn>
// @include	     *://*
// @match        *://*
// @grant        none
// ==/UserScript==


window.onload = () => {
    switch(location.host){
       case 'www.baidu.com':
            // 精简百度搜索
            var num = true
            var repair = () => {
                num = false
                var s = document.createElement('style')
                s.innerHTML = 'a{text-decoration: none}'
                document.body.append(s)
                document.querySelector('#content_left').style.width = '100%'
                document.querySelector('#s_tab').style.paddingTop = '76px'
                document.querySelector('#head').style.boxShadow = '0 0 2px #e6e6e6'
                document.querySelector('.new-pmd.c-container').classList.add('fiume-cn')
                document.querySelectorAll('.new-pmd.c-container').forEach(v => {
                    v.style.width = '100%'
                    v.style.borderBottom = '1px solid #f1f0f6'
                    v.style.paddingBottom = '14px'
                })
                document.querySelector('#content_right')?.remove()
                document.querySelector('#foot')?.remove()
                document.querySelector('.result-op.c-container.new-pmd')?.remove()
                setTimeout(() => num = true, 100)
            };
            var _self = document.createElement('iframe')
            document.body.append(_self)
            window.MutationObserver = _self.contentWindow.MutationObserver
            _self.remove()
            new MutationObserver(() => { num&&repair() }).observe(document.querySelector('body'), { childList: true })
       break;
       case 'segmentfault.com':
            // 处理需登录复制
            document.querySelector('div').id = 'SFUserId'
       break;
       case 'www.yuque.com':
            // 处理不能复制
            if(window.appData.settings.disableDocumentCopy){
                var el = document.querySelector('.WithToc-module_article_2_rhk')
                var html = el.innerHTML
                el.id = 'fiumeCn'
                el.childNodes[0].remove()
                setTimeout(() => el.innerHTML = html, 600)
            }
       break;
       case 'www.bilibili.com':
            var menu = null
            new MutationObserver(() => {
                menu = document.querySelector('.bilibili-player-video-btn-speed-menu')
                if(menu){
                    if(menu.dataset.jt === 'fiume.cn') return
                    var speed = ['0.5','0.75','1','1.25','1.5','2','2.5','3','3.5']
                    menu.dataset.jt = 'fiume.cn'
                    while(menu.hasChildNodes()){ menu.removeChild(menu.firstChild) }
                    menu.onclick = function(e){
                        this.querySelector('.bilibili-player-active')?.classList.remove('bilibili-player-active')
                        e.target.classList.add('bilibili-player-active')
                        document.querySelector('video').playbackRate = e.target.dataset.value
                        document.querySelector('.bilibili-player-video-btn-speed-name').innerText = e.target.innerText
                    }
                    speed.forEach(function(v){
                        var li = document.createElement('li')
                        li.classList.add('bilibili-player-video-btn-speed-menu-list')
                        li.dataset.value = v
                        li.innerText = v + 'x'
                        menu.prepend(li)
                    })
                }
            }).observe(document.body, { childList: true })
       break;
    }
}
