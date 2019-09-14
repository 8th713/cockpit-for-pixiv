/*
// ==UserScript==
// @name         cockpit download addon
// @description  cockpit download helper addon.
// @version      4.1.0-beta.0
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
*/!function(t){var e={};function o(r){if(e[r])return e[r].exports;var s=e[r]={i:r,l:!1,exports:{}};return t[r].call(s.exports,s,s.exports,o),s.l=!0,s.exports}o.m=t,o.c=e,o.d=function(t,e,r){o.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},o.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},o.t=function(t,e){if(1&e&&(t=o(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(o.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var s in t)o.d(r,s,function(e){return t[e]}.bind(null,s));return r},o.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return o.d(e,"a",e),e},o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},o.p="",o(o.s=14)}({14:function(t,e,o){"use strict";o.r(e);var r=o(2);const s=async t=>{const{body:e,error:o,message:s}=await r.a.get(`/ajax/illust/${t}/pages`,{credentials:"same-origin",cache:"no-cache"}).json();if(o)throw new Error(s);return e},n=t=>{const e=t.lastIndexOf(".");return t.slice(e+1)},i=t=>new Promise((e,o)=>{GM_xmlhttpRequest({url:t,responseType:"blob",method:"GET",headers:{referer:t},onload:t=>e(t.response),onerror:o})}),a=(t,e)=>{const o=document.createElement("a");o.style.display="none",o.href=URL.createObjectURL(t),o.download=e,o.click(),setTimeout(()=>{window.URL.revokeObjectURL(o.href)},100)},c=async t=>{const{id:e,title:o,userName:r}=t,[c]=await s(e),h=c.urls.original,u=await i(h),p=n(h);a(u,`${r} - ${o}.${p}`)},h=async t=>{const{id:e,title:o,userName:r}=t,c=await s(e),h=new unsafeWindow.JSZip;for(const[t,e]of c.entries()){const s=e.urls.original,a=n(s),c=`${r} - ${o}[${String(t).padStart(3,"000")}].${a}`,u=await i(s);h.file(c,u)}const u=await h.generateAsync({type:"blob"});a(u,`${r} - ${o}.zip`)},u=async t=>{const{id:e,title:o,userName:s}=t,n=await(async t=>{const{body:e,error:o,message:s}=await r.a.get(`/ajax/illust/${t}/ugoira_meta`,{credentials:"same-origin",cache:"no-cache"}).json();if(o)throw new Error(s);return e})(e),c=await i(n.originalSrc);a(c,`${s} - ${o}.zip`)},p=`${GM_info.script.name} - ${GM_info.script.version}`,f=new MessageChannel,{port1:l,port2:d}=f;l.addEventListener("message",t=>{const e=t.data;if((t=>t&&"object"===typeof t&&"string"===typeof t.type)(e))switch(e.type){case"CONNECTION-SUCCESS":return void(t=>{const e=document.createElement("script");e.src=t,document.body.appendChild(e)})("https://unpkg.com/jszip@3.1.5/dist/jszip.min.js");case"DOWNLOAD_REQUEST":return void(t=>2===t.illustType?u(t):t.pageCount>1?h(t):c(t))(e.payload);default:console.error(p+" Unknown Action",e)}}),l.start(),window.postMessage({type:"CONNECTION-REQUEST",id:"download"},location.origin,[d])},2:function(t,e,o){"use strict";
/*! MIT License © Sindre Sorhus */const r={};{const t=t=>{let e;if("undefined"!==typeof self&&self&&t in self&&(e=self),"undefined"!==typeof window&&window&&t in window&&(e=window),"undefined"!==typeof global&&global&&t in global&&(e=global),"undefined"!==typeof globalThis&&globalThis&&(e=globalThis),"undefined"===typeof e)return;const o=e[t];return"function"===typeof o?o.bind(e):o},e=["document","Headers","Request","Response","ReadableStream","fetch","AbortController","FormData"],o={};for(const r of e)o[r]={get:()=>t(r)};Object.defineProperties(r,o)}const s=t=>null!==t&&"object"===typeof t,n="function"===typeof r.AbortController,i="function"===typeof r.ReadableStream,a="function"===typeof r.FormData,c=(...t)=>{let e={};for(const o of t)if(Array.isArray(o))Array.isArray(e)||(e=[]),e=[...e,...o];else if(s(o))for(let[t,r]of Object.entries(o))s(r)&&Reflect.has(e,t)&&(r=c(e[t],r)),e={...e,[t]:r};return e},h=["get","post","put","patch","head","delete"],u={json:"application/json",text:"text/*",formData:"multipart/form-data",arrayBuffer:"*/*",blob:"*/*"},p=new Set(["get","put","head","delete","options","trace"]),f=new Set([408,413,429,500,502,503,504]),l=new Set([413,429,503]);class d extends Error{constructor(t){super(t.statusText),this.name="HTTPError",this.response=t}}class y extends Error{constructor(){super("Request timed out"),this.name="TimeoutError"}}const m=(t,e,o)=>(o>2147483647&&e(new RangeError("The `timeout` option cannot be greater than 2147483647")),setTimeout(t,o)),w=t=>new Promise((e,o)=>m(e,o,t)),b=(t,e,o)=>new Promise((r,s)=>{const i=m(()=>{n&&o.abort(),s(new y)},s,e);t.then(r).catch(s).then(()=>{clearTimeout(i)})}),_=t=>h.includes(t)?t.toUpperCase():t,g={limit:2,methods:p,statusCodes:f,afterStatusCodes:l},R=t=>{if("number"===typeof t)return{...g,limit:t};if(t.methods&&!Array.isArray(t.methods))throw new Error("retry.methods must be an array");if(t.statusCodes&&!Array.isArray(t.statusCodes))throw new Error("retry.statusCodes must be an array");return{...g,...t,methods:t.methods?new Set(t.methods):g.methods,statusCodes:t.statusCodes?new Set(t.statusCodes):g.statusCodes,afterStatusCodes:l}};class S{constructor(t,{timeout:e=1e4,hooks:o,throwHttpErrors:s=!0,searchParams:h,json:p,retry:f={},...l}){if(this._retryCount=0,this._options={method:"get",credentials:"same-origin",retry:R(f),...l},t instanceof r.Request)this._input=t,this._options={...this._options,method:l.method||t.method,headers:l.headers||t.headers,body:l.body||t.body,credentials:l.credentials||t.credentials};else{if(this._input=String(t||""),this._options.prefixUrl=String(this._options.prefixUrl||""),this._options.prefixUrl&&this._input.startsWith("/"))throw new Error("`input` must not begin with a slash when using `prefixUrl`");if(this._options.prefixUrl&&!this._options.prefixUrl.endsWith("/")&&(this._options.prefixUrl+="/"),this._input=this._options.prefixUrl+this._input,h){const t=new URL(this._input,r.document&&r.document.baseURI);if("string"===typeof h||URLSearchParams&&h instanceof URLSearchParams)t.search=h;else{if(!Object.values(h).every(t=>"number"===typeof t||"string"===typeof t))throw new Error("The `searchParams` option must be either a string, `URLSearchParams` instance or an object with string and number values");t.search=new URLSearchParams(h).toString()}this._input=t.toString()}}n&&(this.abortController=new r.AbortController,this._options.signal&&this._options.signal.addEventListener("abort",()=>{this.abortController.abort()}),this._options.signal=this.abortController.signal),this._options.method=_(this._options.method),this._timeout=e,this._hooks=c({beforeRequest:[],beforeRetry:[],afterResponse:[]},o),this._throwHttpErrors=s;const y=new r.Headers(this._options.headers||{});if((a&&this._options.body instanceof r.FormData||this._options.body instanceof URLSearchParams)&&y.has("content-type"))throw new Error(`The \`content-type\` header cannot be used with a ${this._options.body.constructor.name} body. It will be set automatically.`);if(p){if(this._options.body)throw new Error("The `json` option cannot be used with the `body` option");y.set("content-type","application/json"),this._options.body=JSON.stringify(p)}this._options.headers=y;const m=async()=>{await w(1);let t=await this._fetch();for(const e of this._hooks.afterResponse){const o=await e(this._input,this._options,t.clone());o instanceof r.Response&&(t=o)}if(!t.ok&&this._throwHttpErrors)throw new d(t);if(this._options.onDownloadProgress){if("function"!==typeof this._options.onDownloadProgress)throw new TypeError("The `onDownloadProgress` option must be a function");if(!i)throw new Error("Streams are not supported in your environment. `ReadableStream` is missing.");return this._stream(t.clone(),this._options.onDownloadProgress)}return t},b=this._options.retry.methods.has(this._options.method.toLowerCase())?this._retry(m):m();for(const[t,e]of Object.entries(u))b[t]=async()=>(y.set("accept",e),(await b).clone()[t]());return b}_calculateRetryDelay(t){if(this._retryCount++,this._retryCount<this._options.retry.limit&&!(t instanceof y)){if(t instanceof d){if(!this._options.retry.statusCodes.has(t.response.status))return 0;const e=t.response.headers.get("Retry-After");if(e&&this._options.retry.afterStatusCodes.has(t.response.status)){let t=Number(e);return Number.isNaN(t)?t=Date.parse(e)-Date.now():t*=1e3,"undefined"!==typeof this._options.retry.maxRetryAfter&&t>this._options.retry.maxRetryAfter?0:t}if(413===t.response.status)return 0}return.3*2**(this._retryCount-1)*1e3}return 0}async _retry(t){try{return await t()}catch(e){const o=this._calculateRetryDelay(e);if(0!==o&&this._retryCount>0){await w(o);for(const t of this._hooks.beforeRetry)await t(this._input,this._options,e,this._retryCount);return this._retry(t)}if(this._throwHttpErrors)throw e}}async _fetch(){for(const t of this._hooks.beforeRequest){const e=await t(this._input,this._options);if(e instanceof Response)return e}return!1===this._timeout?r.fetch(this._input,this._options):b(r.fetch(this._input,this._options),this._timeout,this.abortController)}_stream(t,e){const o=Number(t.headers.get("content-length"))||0;let s=0;return new r.Response(new r.ReadableStream({start(r){const n=t.body.getReader();e&&e({percent:0,transferredBytes:0,totalBytes:o},new Uint8Array),async function t(){const{done:i,value:a}=await n.read();if(i)r.close();else{if(e){s+=a.byteLength,e({percent:0===o?0:s/o,transferredBytes:s,totalBytes:o},a)}r.enqueue(a),t()}}()}}))}}const C=(...t)=>{for(const e of t)if((!s(e)||Array.isArray(e))&&"undefined"!==typeof e)throw new TypeError("The `options` argument must be an object");return c({},...t)},E=t=>{const e=(e,o)=>new S(e,C(t,o));for(const o of h)e[o]=(e,r)=>new S(e,C(t,r,{method:o}));return e.create=t=>E(C(t)),e.extend=e=>E(C(t,e)),e};e.a=E()}});