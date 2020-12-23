// ==UserScript==
// @name         WebPage工具箱
// @namespace    https://github.com/zhchjiang95
// @version      1.0.2
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
            var repair = () => {
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
                document.querySelector('#content_right').remove()
                document.querySelector('#foot').remove()
                document.querySelector('.result-op.c-container.new-pmd').remove()
            };
            repair()
            document.querySelector('.bg.s_btn_wr').addEventListener('click', () =>{
                var timer = setTimeout(() => {
                    console.log(1212)
                    if(document.querySelector('.fiume-cn')){
                        clearTimeout(timer)
                    } else {
                        repair()
                    }
                }, 800)
            }, false)
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
    }
}