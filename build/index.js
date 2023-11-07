!function(){"use strict";var e,t={210:function(e,t,n){var r=window.wp.blocks,a=window.React,l=window.wp.data,o=window.wp.i18n,s=window.wp.blockEditor,i=window.wp.components,c=window.wp.element,u=window.wp.apiFetch,p=n.n(u),d=JSON.parse('{"u2":"local-test/dynamic-post-search"}');(0,r.registerBlockType)(d.u2,{edit:function({attributes:e,setAttributes:t}){const{posts:n}=e,[r,u]=(0,c.useState)(""),[d,m]=(0,c.useState)([]),[f,v]=(0,c.useState)(!1),w=(0,l.useSelect)((e=>{const{getPostTypes:t}=e("core"),n=["attachment","media","page"],r=t({per_page:-1})?.filter((({viewable:e,slug:t})=>e&&!n.includes(t)));return(r||[]).map((({rest_base:e})=>e))}),[]);return(0,l.useSelect)((e=>{Promise.all(w.map((e=>p()({path:`/wp/v2/${e}?search=${r}`})))).then((e=>{m(e.reduce(((e,t)=>[...t,...e]),[]))}))}),[r]),(0,a.createElement)("div",{...(0,s.useBlockProps)()},(0,a.createElement)("div",null,(0,a.createElement)(i.SearchControl,{label:"Search post",value:r,onChange:e=>{u(e),v(!0)},onClose:()=>{u(""),v(!1)}})),f&&(0,a.createElement)("div",null,(0,a.createElement)(i.Popover,{className:"popover-search-results"},d&&d.map((e=>(0,a.createElement)("div",{key:e.id,className:"popover-search-result",onClick:()=>{(e=>{let r=[...n,e];v(!1),u(""),t({posts:r})})(e)}},(0,a.createElement)("div",{className:"popover-search-result-post"},(0,a.createElement)("span",{className:"title"},""!==e.title.rendered?e.title.rendered:"(no title)"),(0,a.createElement)("span",{className:"link"},e.link))))))),(0,a.createElement)("ul",{className:"posts-list"},n&&n.map((e=>(0,a.createElement)("li",{className:"posts-list-item",key:e.id},(0,a.createElement)("div",{className:"posts-list-link"},(0,a.createElement)("a",{href:e.link,target:"_blank"},e.title.rendered?e.title.rendered:(0,o.__)("Default title","author-plugin")),(0,a.createElement)("span",null,e.link)),(0,a.createElement)("button",{onClick:()=>(e=>{const r=n.filter((t=>e.id!==t.id));t({posts:r})})(e)},"Clear"))))))}})}},n={};function r(e){var a=n[e];if(void 0!==a)return a.exports;var l=n[e]={exports:{}};return t[e](l,l.exports,r),l.exports}r.m=t,e=[],r.O=function(t,n,a,l){if(!n){var o=1/0;for(u=0;u<e.length;u++){n=e[u][0],a=e[u][1],l=e[u][2];for(var s=!0,i=0;i<n.length;i++)(!1&l||o>=l)&&Object.keys(r.O).every((function(e){return r.O[e](n[i])}))?n.splice(i--,1):(s=!1,l<o&&(o=l));if(s){e.splice(u--,1);var c=a();void 0!==c&&(t=c)}}return t}l=l||0;for(var u=e.length;u>0&&e[u-1][2]>l;u--)e[u]=e[u-1];e[u]=[n,a,l]},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,{a:t}),t},r.d=function(e,t){for(var n in t)r.o(t,n)&&!r.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},function(){var e={826:0,431:0};r.O.j=function(t){return 0===e[t]};var t=function(t,n){var a,l,o=n[0],s=n[1],i=n[2],c=0;if(o.some((function(t){return 0!==e[t]}))){for(a in s)r.o(s,a)&&(r.m[a]=s[a]);if(i)var u=i(r)}for(t&&t(n);c<o.length;c++)l=o[c],r.o(e,l)&&e[l]&&e[l][0](),e[l]=0;return r.O(u)},n=self.webpackChunkdynamic_post_search=self.webpackChunkdynamic_post_search||[];n.forEach(t.bind(null,0)),n.push=t.bind(null,n.push.bind(n))}();var a=r.O(void 0,[431],(function(){return r(210)}));a=r.O(a)}();