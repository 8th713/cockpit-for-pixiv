/*
// ==UserScript==
// @name         cockpit download addon
// @description  cockpit download helper addon.
// @version      5.0.0
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
*/!function(t){var e={};function r(o){if(e[o])return e[o].exports;var s=e[o]={i:o,l:!1,exports:{}};return t[o].call(s.exports,s,s.exports,r),s.l=!0,s.exports}r.m=t,r.c=e,r.d=function(t,e,o){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:o})},r.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if(r.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var s in t)r.d(o,s,function(e){return t[e]}.bind(null,s));return o},r.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="",r(r.s=14)}({1:function(t,e,r){"use strict";
/*! MIT License © Sindre Sorhus */const o={},s=t=>"undefined"!==typeof self&&self&&t in self?self:"undefined"!==typeof window&&window&&t in window?window:"undefined"!==typeof global&&global&&t in global?global:"undefined"!==typeof globalThis&&globalThis?globalThis:void 0,n=["Headers","Request","Response","ReadableStream","fetch","AbortController","FormData"];for(const t of n)Object.defineProperty(o,t,{get(){const e=s(t),r=e&&e[t];return"function"===typeof r?r.bind(e):r}});const i=t=>null!==t&&"object"===typeof t,a="function"===typeof o.AbortController,u="function"===typeof o.ReadableStream,c="function"===typeof o.FormData,p=(...t)=>{let e={};for(const r of t)if(Array.isArray(r))Array.isArray(e)||(e=[]),e=[...e,...r];else if(i(r))for(let[t,o]of Object.entries(r))i(o)&&Reflect.has(e,t)&&(o=p(e[t],o)),e={...e,[t]:o};return e},h=["get","post","put","patch","head","delete"],f={json:"application/json",text:"text/*",formData:"multipart/form-data",arrayBuffer:"*/*",blob:"*/*"},l=[413,429,503],d=Symbol("stop");class y extends Error{constructor(t){super(t.statusText||String(0===t.status||t.status?t.status:"Unknown response error")),this.name="HTTPError",this.response=t}}class m extends Error{constructor(){super("Request timed out"),this.name="TimeoutError"}}const w=t=>new Promise(e=>setTimeout(e,t)),_=t=>h.includes(t)?t.toUpperCase():t,b={limit:2,methods:["get","put","head","delete","options","trace"],statusCodes:[408,413,429,500,502,503,504],afterStatusCodes:l},g=(t={})=>{if("number"===typeof t)return{...b,limit:t};if(t.methods&&!Array.isArray(t.methods))throw new Error("retry.methods must be an array");if(t.statusCodes&&!Array.isArray(t.statusCodes))throw new Error("retry.statusCodes must be an array");return{...b,...t,afterStatusCodes:l}};class R{constructor(t,e={}){if(this._retryCount=0,this._input=t,this._options={credentials:this._input.credentials||"same-origin",...e,hooks:p({beforeRequest:[],beforeRetry:[],afterResponse:[]},e.hooks),method:_(e.method||this._input.method),prefixUrl:String(e.prefixUrl||""),retry:g(e.retry),throwHttpErrors:!1!==e.throwHttpErrors,timeout:"undefined"===typeof e.timeout?1e4:e.timeout},"string"!==typeof this._input&&!(this._input instanceof URL||this._input instanceof o.Request))throw new TypeError("`input` must be a string, URL, or Request");if(this._options.prefixUrl&&"string"===typeof this._input){if(this._input.startsWith("/"))throw new Error("`input` must not begin with a slash when using `prefixUrl`");this._options.prefixUrl.endsWith("/")||(this._options.prefixUrl+="/"),this._input=this._options.prefixUrl+this._input}if(a&&(this.abortController=new o.AbortController,this._options.signal&&this._options.signal.addEventListener("abort",()=>{this.abortController.abort()}),this._options.signal=this.abortController.signal),this.request=new o.Request(this._input,this._options),this._options.searchParams){const t=new URL(this.request.url);t.search=new URLSearchParams(this._options.searchParams),!(c&&this._options.body instanceof o.FormData||this._options.body instanceof URLSearchParams)||this._options.headers&&this._options.headers["content-type"]||this.request.headers.delete("content-type"),this.request=new o.Request(new o.Request(t,this.request),this._options)}void 0!==this._options.json&&(this._options.body=JSON.stringify(this._options.json),this.request.headers.set("content-type","application/json"),this.request=new o.Request(this.request,{body:this._options.body}));const r=async()=>{if(this._options.timeout>2147483647)throw new RangeError("The `timeout` option cannot be greater than 2147483647");await w(1);let t=await this._fetch();for(const e of this._options.hooks.afterResponse){const r=await e(this.request,this._options,t.clone());r instanceof o.Response&&(t=r)}if(!t.ok&&this._options.throwHttpErrors)throw new y(t);if(this._options.onDownloadProgress){if("function"!==typeof this._options.onDownloadProgress)throw new TypeError("The `onDownloadProgress` option must be a function");if(!u)throw new Error("Streams are not supported in your environment. `ReadableStream` is missing.");return this._stream(t.clone(),this._options.onDownloadProgress)}return t},s=this._options.retry.methods.includes(this.request.method.toLowerCase())?this._retry(r):r();for(const[t,e]of Object.entries(f))s[t]=async()=>{this.request.headers.set("accept",this.request.headers.get("accept")||e);const r=(await s).clone();return"json"===t&&204===r.status?"":r[t]()};return s}_calculateRetryDelay(t){if(this._retryCount++,this._retryCount<this._options.retry.limit&&!(t instanceof m)){if(t instanceof y){if(!this._options.retry.statusCodes.includes(t.response.status))return 0;const e=t.response.headers.get("Retry-After");if(e&&this._options.retry.afterStatusCodes.includes(t.response.status)){let t=Number(e);return Number.isNaN(t)?t=Date.parse(e)-Date.now():t*=1e3,"undefined"!==typeof this._options.retry.maxRetryAfter&&t>this._options.retry.maxRetryAfter?0:t}if(413===t.response.status)return 0}return.3*2**(this._retryCount-1)*1e3}return 0}async _retry(t){try{return await t()}catch(e){const r=Math.min(this._calculateRetryDelay(e),2147483647);if(0!==r&&this._retryCount>0){await w(r);for(const t of this._options.hooks.beforeRetry){if(await t({request:this.request,options:this._options,error:e,response:e.response.clone(),retryCount:this._retryCount})===d)return}return this._retry(t)}if(this._options.throwHttpErrors)throw e}}async _fetch(){for(const t of this._options.hooks.beforeRequest){const e=await t(this.request,this._options);if(e instanceof Request){this.request=e;break}if(e instanceof Response)return e}return!1===this._options.timeout?o.fetch(this.request.clone()):(t=o.fetch(this.request.clone()),e=this._options.timeout,r=this.abortController,new Promise((o,s)=>{const n=setTimeout(()=>{r&&r.abort(),s(new m)},e);t.then(o).catch(s).then(()=>{clearTimeout(n)})}));var t,e,r}_stream(t,e){const r=Number(t.headers.get("content-length"))||0;let s=0;return new o.Response(new o.ReadableStream({start(o){const n=t.body.getReader();e&&e({percent:0,transferredBytes:0,totalBytes:r},new Uint8Array),async function t(){const{done:i,value:a}=await n.read();if(i)o.close();else{if(e){s+=a.byteLength,e({percent:0===r?0:s/r,transferredBytes:s,totalBytes:r},a)}o.enqueue(a),t()}}()}}))}}const C=(...t)=>{for(const e of t)if((!i(e)||Array.isArray(e))&&"undefined"!==typeof e)throw new TypeError("The `options` argument must be an object");return p({},...t)},E=t=>{const e=(e,r)=>new R(e,C(t,r));for(const r of h)e[r]=(e,o)=>new R(e,C(t,o,{method:r}));return e.HTTPError=y,e.TimeoutError=m,e.create=t=>E(C(t)),e.extend=e=>E(C(t,e)),e.stop=d,e};e.a=E()},14:function(t,e,r){"use strict";r.r(e);var o=r(1);const s=async t=>{const{body:e,error:r,message:s}=await o.a.get(`/ajax/illust/${t}/pages`,{credentials:"same-origin",cache:"no-cache"}).json();if(r)throw new Error(s);return e},n=t=>{const e=t.lastIndexOf(".");return t.slice(e+1)},i=t=>new Promise((e,r)=>{GM_xmlhttpRequest({url:t,responseType:"blob",method:"GET",headers:{referer:t},onload:t=>e(t.response),onerror:r})}),a=(t,e)=>{const r=document.createElement("a");r.style.display="none",r.href=URL.createObjectURL(t),r.download=e,r.click(),setTimeout(()=>{window.URL.revokeObjectURL(r.href)},100)},u=async t=>{const{id:e,title:r,userName:o}=t,[u]=await s(e),c=u.urls.original,p=await i(c),h=n(c);a(p,`${o} - ${r}.${h}`)},c=async t=>{const{id:e,title:r,userName:o}=t,u=await s(e),c=new unsafeWindow.JSZip;for(const[t,e]of u.entries()){const s=e.urls.original,a=n(s),u=`${o} - ${r}[${String(t).padStart(3,"000")}].${a}`,p=await i(s);c.file(u,p)}const p=await c.generateAsync({type:"blob"});a(p,`${o} - ${r}.zip`)},p=async t=>{const{id:e,title:r,userName:s}=t,n=await(async t=>{const{body:e,error:r,message:s}=await o.a.get(`/ajax/illust/${t}/ugoira_meta`,{credentials:"same-origin",cache:"no-cache"}).json();if(r)throw new Error(s);return e})(e),u=await i(n.originalSrc);a(u,`${s} - ${r}.zip`)},h=`${GM_info.script.name} - ${GM_info.script.version}`,f=new MessageChannel,{port1:l,port2:d}=f;l.addEventListener("message",t=>{const e=t.data;var r;if((t=>t&&"object"===typeof t&&"string"===typeof t.type)(e))switch(e.type){case"CONNECTION-SUCCESS":return void(t=>{const e=document.createElement("script");e.src=t,document.body.appendChild(e)})("https://unpkg.com/jszip@3.1.5/dist/jszip.min.js");case"DOWNLOAD_REQUEST":return void(2===(r=e.payload).illustType?p(r):r.pageCount>1?c(r):u(r));default:console.error(h+" Unknown Action",e)}}),l.start(),window.postMessage({type:"CONNECTION-REQUEST",id:"download"},location.origin,[d])}});