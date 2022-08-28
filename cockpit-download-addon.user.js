/*
// ==UserScript==
// @name         cockpit download addon
// @description  cockpit download helper addon.
// @version      5.0.3
// @author       8th713
// @homepage     https://github.com/8th713/cockpit-for-pixiv
// @supportURL   https://github.com/8th713/cockpit-for-pixiv/issues
// @license      MIT
// @namespace    http://github.com/8th713
// @match        https://www.pixiv.net/*
// @exclude      https://www.pixiv.net/novel/*
// @grant        unsafeWindow
// @grant        GM_xmlhttpRequest
// @connect      i.pximg.net
// @connect      pixiv.net
// ==/UserScript==
*/(()=>{"use strict";function e(e){const n=e.lastIndexOf(".");return e.slice(n+1)}function n(e){return new Promise(((n,t)=>{GM_xmlhttpRequest({url:e,responseType:"blob",method:"GET",headers:{referer:e},onload:e=>n(e.response),onerror:t})}))}function t(e,n){const t=document.createElement("a"),o=URL.createObjectURL(e);t.style.display="none",t.href=o,t.download=n,t.click(),setTimeout((()=>{window.URL.revokeObjectURL(t.href)}),100)}async function o(o,i){return 2===o.illustType?async function(e){const{urls:o,title:i,userName:r}=e,s=o.original.replace("img-original","img-zip-ugoira").replace("_ugoira0.jpg","_ugoira1920x1080.zip");t(await n(s),`${r} - ${i}.zip`)}(o):o.pageCount>1?async function(o,i){const{title:r,userName:s}=o,a=new unsafeWindow.JSZip;for(const[t,o]of i.entries()){const i=o.urls.original,c=e(i),l=`${s} - ${r}[${String(t).padStart(3,"000")}].${c}`,u=await n(i);a.file(l,u)}t(await a.generateAsync({type:"blob"}),`${s} - ${r}.zip`)}(o,i):async function(o,i){const{title:r,userName:s}=o,a=i.urls.original,c=await n(a),l=e(a);t(c,`${s} - ${r}.${l}`)}(o,i[0])}const i=`${GM_info.script.name} - ${GM_info.script.version}`,r=new MessageChannel,{port1:s,port2:a}=r;s.addEventListener("message",(e=>{var n;if((n=e.data)&&"CFP-ADDON-CONNECTION-SUCCESS"===n.type)!function(e){const n=document.createElement("script");n.src=e,document.body.appendChild(n)}("https://unpkg.com/jszip@3.6.0/dist/jszip.min.js");else if(function(e){var n,t;return e&&"DOWNLOAD"===e.method&&(null===(n=e.args)||void 0===n?void 0:n.info)&&(null===(t=e.args)||void 0===t?void 0:t.images)}(e.data))try{const{info:n,images:t}=e.data.args;o(n,t)}catch(e){console.error(i+": Download error",e)}else console.error(i+": Unknown action",e.data)})),s.start(),setTimeout((()=>{window.postMessage({type:"CFP-ADDON-CONNECTION-REQUEST",key:"DOWNLOAD-ADDON",methods:["DOWNLOAD"]},location.origin,[a])}),500)})();