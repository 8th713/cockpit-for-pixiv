/*
// ==UserScript==
// @name         cockpit download addon
// @description  cockpit download helper addon.
// @version      4.0.2
// @author       8th713
// @homepage     https://github.com/8th713/cockpit-for-pixiv
// @supportURL   https://github.com/8th713/cockpit-for-pixiv/issues
// @license      MIT
// @namespace    http://github.com/8th713
// @match        https://www.pixiv.net/*
// @exclude      https://www.pixiv.net/novel/*
// @exclude      https://www.pixiv.net/member_illust.php?mode*
// @grant        unsafeWindow
// @grant        GM_xmlhttpRequest
// @connect      i.pximg.net
// @connect      pixiv.net
// ==/UserScript==
*/!function(t){var e={};function r(n){if(e[n])return e[n].exports;var o=e[n]={i:n,l:!1,exports:{}};return t[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}r.m=t,r.c=e,r.d=function(t,e,n){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},r.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)r.d(n,o,function(e){return t[e]}.bind(null,o));return n},r.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="",r(r.s=17)}({1:function(t,e,r){"use strict";var n=function(){return(n=Object.assign||function(t){for(var e,r=1,n=arguments.length;r<n;r++)for(var o in e=arguments[r])Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o]);return t}).apply(this,arguments)},o=function(t,e,r){if(void 0===r&&(r=!1),!t||!e||"object"!==typeof t||"object"!==typeof e)return t;var i=n({},t);for(var s in e)e.hasOwnProperty(s)&&(e[s]instanceof Array&&t[s]instanceof Array?i[s]=r?t[s].concat(e[s]):e[s]:"object"===typeof e[s]&&"object"===typeof t[s]?i[s]=o(t[s],e[s],r):i[s]=e[s]);return i},i={defaults:{},errorType:null,polyfills:{fetch:null,FormData:null,URLSearchParams:null,performance:null,PerformanceObserver:null,AbortController:null},polyfill:function(t,e){for(var r=void 0===e?{}:e,n=r.doThrow,o=void 0===n||n,i=r.instance,s=void 0!==i&&i,a=[],u=2;u<arguments.length;u++)a[u-2]=arguments[u];var c=this.polyfills[t]||("undefined"!==typeof self?self[t]:null)||("undefined"!==typeof global?global[t]:null);if(o&&!c)throw new Error(t+" is not defined");return s&&c?new(c.bind.apply(c,[void 0].concat(a))):c}},s=function(t,e,r,n){if(!t.getEntriesByName)return!1;var o=t.getEntriesByName(e);return!!(o&&o.length>0)&&(r(o.reverse()[0]),n.clearMeasures&&n.clearMeasures(e),a.callbacks.delete(e),a.callbacks.size<1&&(a.observer.disconnect(),n.clearResourceTimings&&n.clearResourceTimings()),!0)},a={callbacks:new Map,observer:null,observe:function(t,e){if(t&&e){var r=i.polyfill("performance",{doThrow:!1});(function(t,e){return!a.observer&&t&&e&&(a.observer=new e(function(e){a.callbacks.forEach(function(r,n){s(e,n,r,t)})}),t.clearResourceTimings&&t.clearResourceTimings()),a.observer})(r,i.polyfill("PerformanceObserver",{doThrow:!1}))&&(s(r,t,e,r)||(a.callbacks.size<1&&a.observer.observe({entryTypes:["resource","measure"]}),a.callbacks.set(t,e)))}}},u=a,c=function(){return(c=Object.assign||function(t){for(var e,r=1,n=arguments.length;r<n;r++)for(var o in e=arguments[r])Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o]);return t}).apply(this,arguments)},l=function(){function t(t,e,r,n,o,i){void 0===r&&(r=new Map),void 0===n&&(n=[]),void 0===o&&(o=[]),void 0===i&&(i=[]),this._url=t,this._options=e,this._catchers=r,this._resolvers=n,this._middlewares=o,this._deferredChain=i}return t.factory=function(e,r){return void 0===e&&(e=""),void 0===r&&(r={}),new t(e,r)},t.prototype.selfFactory=function(e){var r=void 0===e?{}:e,n=r.url,o=void 0===n?this._url:n,i=r.options,s=void 0===i?this._options:i,a=r.catchers,u=void 0===a?this._catchers:a,l=r.resolvers,f=void 0===l?this._resolvers:l,p=r.middlewares,d=void 0===p?this._middlewares:p,h=r.deferredChain,y=void 0===h?this._deferredChain:h;return new t(o,c({},s),new Map(u),f.slice(),d.slice(),y.slice())},t.prototype.defaults=function(t,e){return void 0===e&&(e=!1),i.defaults=e?o(i.defaults,t):t,this},t.prototype.errorType=function(t){return i.errorType=t,this},t.prototype.polyfills=function(t){return i.polyfills=c({},i.polyfills,t),this},t.prototype.url=function(t,e){if(void 0===e&&(e=!1),e)return this.selfFactory({url:t});var r=this._url.split("?");return this.selfFactory({url:r.length>1?r[0]+t+"?"+r[1]:this._url+t})},t.prototype.options=function(t,e){return void 0===e&&(e=!0),this.selfFactory({options:e?o(this._options,t):t})},t.prototype.query=function(t,e){return void 0===e&&(e=!1),this.selfFactory({url:f(this._url,t,e)})},t.prototype.headers=function(t){return this.selfFactory({options:o(this._options,{headers:t})})},t.prototype.accept=function(t){return this.headers({Accept:t})},t.prototype.content=function(t){return this.headers({"Content-Type":t})},t.prototype.auth=function(t){return this.headers({Authorization:t})},t.prototype.catcher=function(t,e){var r=new Map(this._catchers);return r.set(t,e),this.selfFactory({catchers:r})},t.prototype.signal=function(t){return this.selfFactory({options:c({},this._options,{signal:t.signal})})},t.prototype.resolve=function(t,e){return void 0===e&&(e=!1),this.selfFactory({resolvers:e?[t]:this._resolvers.concat([t])})},t.prototype.defer=function(t,e){return void 0===e&&(e=!1),this.selfFactory({deferredChain:e?[t]:this._deferredChain.concat([t])})},t.prototype.middlewares=function(t,e){return void 0===e&&(e=!1),this.selfFactory({middlewares:e?t:this._middlewares.concat(t)})},t.prototype.method=function(t,e,r){void 0===e&&(e={}),void 0===r&&(r=null);var n=r?"object"===typeof r?this.json(r):this.body(r):this;return function(t){var e=t._url,r=t._catchers,n=t._resolvers,s=t._middlewares,a=t._options,c=new Map(r),l=o(i.defaults,a),f=i.polyfill("AbortController",{doThrow:!1,instance:!0});!l.signal&&f&&(l.signal=f.signal);var p=function(t){return function(e){return 0===t.length?e:1===t.length?t[0](e):t.reduceRight(function(r,n,o){return o===t.length-2?n(r(e)):n(r)})}}(s)(i.polyfill("fetch"))(e,l),d=p.then(function(t){return t.ok?t:t[i.errorType||"text"]().then(function(e){var r=new Error(e);throw r[i.errorType||"text"]=e,r.status=t.status,r.response=t,r})}),h=function(e){return e.catch(function(e){if(c.has(e.status))return c.get(e.status)(e,t);if(c.has(e.name))return c.get(e.name)(e,t);throw e})},y=function(t){return function(e){return h(t?d.then(function(e){return e&&e[t]()}).then(function(t){return t&&e&&e(t)||t}):d.then(function(t){return t&&e&&e(t)||t}))}},v={res:y(null),json:y("json"),blob:y("blob"),formData:y("formData"),arrayBuffer:y("arrayBuffer"),text:y("text"),perfs:function(t){return p.then(function(e){return u.observe(e.url,t)}),v},setTimeout:function(t,e){return void 0===e&&(e=f),setTimeout(function(){return e.abort()},t),v},controller:function(){return[f,v]},error:function(t,e){return c.set(t,e),v},badRequest:function(t){return v.error(400,t)},unauthorized:function(t){return v.error(401,t)},forbidden:function(t){return v.error(403,t)},notFound:function(t){return v.error(404,t)},timeout:function(t){return v.error(408,t)},internalError:function(t){return v.error(500,t)},onAbort:function(t){return v.error("AbortError",t)}};return n.reduce(function(e,r){return r(e,t)},v)}(n._deferredChain.reduce(function(t,e){return e(t,t._url,t._options)},n).options(c({},e,{method:t})))},t.prototype.get=function(t){return this.method("GET",t)},t.prototype.delete=function(t){return this.method("DELETE",t)},t.prototype.put=function(t,e){return this.method("PUT",e,t)},t.prototype.post=function(t,e){return this.method("POST",e,t)},t.prototype.patch=function(t,e){return this.method("PATCH",e,t)},t.prototype.head=function(t){return this.method("HEAD",t)},t.prototype.opts=function(t){return this.method("OPTIONS",t)},t.prototype.replay=function(t){return this.method(this._options.method,t)},t.prototype.body=function(t){return this.selfFactory({options:c({},this._options,{body:t})})},t.prototype.json=function(t){return this.content("application/json").body(JSON.stringify(t))},t.prototype.formData=function(t){return this.body(function(t){var e=i.polyfill("FormData",{instance:!0});for(var r in t)if(t[r]instanceof Array)for(var n=0,o=t[r];n<o.length;n++){var s=o[n];e.append(r+"[]",s)}else e.append(r,t[r]);return e}(t))},t.prototype.formUrl=function(t){return this.body("string"===typeof t?t:(e=t,Object.keys(e).map(function(t){var r=e[t];return r instanceof Array?r.map(function(e){return p(t,e)}).join("&"):p(t,r)}).join("&"))).content("application/x-www-form-urlencoded");var e},t}(),f=function(t,e,r){var n;if("string"===typeof e)n=e;else{var o=i.polyfill("URLSearchParams",{instance:!0});for(var s in e)if(e[s]instanceof Array)for(var a=0,u=e[s];a<u.length;a++){var c=u[a];o.append(s,c)}else o.append(s,e[s]);n=o.toString()}var l=t.split("?");return r||l.length<2?l[0]+"?"+n:t+"&"+n};function p(t,e){return encodeURIComponent(t)+"="+encodeURIComponent("object"===typeof e?JSON.stringify(e):""+e)}var d=l.factory;d.default=l.factory;e.a=d},17:function(t,e,r){"use strict";r.r(e);var n=r(1);function o(t){return Object(n.a)(`/ajax/illust/${t}/pages`).options({credentials:"same-origin",cache:"no-cache"}).content("application/json").errorType("json").resolve(t=>t.json(t=>t.body)).get()}function i(t){const e=t.lastIndexOf(".");return t.slice(e+1)}function s(t){return new Promise((e,r)=>{GM_xmlhttpRequest({url:t,responseType:"blob",method:"GET",headers:{referer:t},onload:t=>e(t.response),onerror:r})})}function a(t,e){const r=document.createElement("a");r.style.display="none",r.href=URL.createObjectURL(t),r.download=e,r.click(),setTimeout(()=>{window.URL.revokeObjectURL(r.href)},100)}function u(t){return 2===t.illustType?async function(t){const{id:e,title:r,userName:o}=t,i=await function(t){return Object(n.a)(`/ajax/illust/${t}/ugoira_meta`).options({credentials:"same-origin",cache:"no-cache"}).content("application/json").errorType("json").resolve(t=>t.json(t=>t.body)).get()}(e);a(await s(i.originalSrc),`${o} - ${r}.zip`)}(t):t.pageCount>1?async function(t){const{id:e,title:r,userName:n}=t,u=await o(e),c=new unsafeWindow.JSZip;for(const[t,e]of u.entries()){const o=e.urls.original,a=i(o),u=String(t).padStart(3,"000"),l=`${n} - ${r}[${u}].${a}`,f=await s(o);c.file(l,f)}a(await c.generateAsync({type:"blob"}),`${n} - ${r}.zip`)}(t):async function(t){const{id:e,title:r,userName:n}=t,[u]=await o(e),c=u.urls.original,l=await s(c),f=i(c);a(l,`${n} - ${r}.${f}`)}(t)}const c=new MessageChannel,{port1:l,port2:f}=c;l.addEventListener("message",t=>{const e=t.data;if(!1!==function(t){return t&&"object"===typeof t&&"string"===typeof t.type}(e))switch(e.type){case"CONNECTION-SUCCESS":return void function(t){const e=document.createElement("script");e.src=t,document.body.appendChild(e)}("https://unpkg.com/jszip@3.1.5/dist/jszip.min.js");case"DOWNLOAD_REQUEST":return void u(e.payload);default:console.error("Unknown Action",e)}}),l.start(),window.postMessage({type:"CONNECTION-REQUEST",id:"download"},location.origin,[f])}});