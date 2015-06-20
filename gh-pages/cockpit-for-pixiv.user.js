// ==UserScript==
// @name         cockpit for pixiv
// @version      0.1.6
// @description  Provide comfortable pixiv browsing.
// @author       8th713
// @homepage     https://github.com/8th713/cockpit-for-pixiv
// @supportURL   https://github.com/8th713/cockpit-for-pixiv/issues
// @license      MIT - https://github.com/8th713/cockpit-for-pixiv/blob/master/LICENSE
// @namespace    http://github.com/8th713
// @match        http://www.pixiv.net/*
// @exclude      http://www.pixiv.net/novel/*
// @exclude      http://www.pixiv.net/member_illust.php?mode*
// @grant        none
// ==/UserScript==
(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var link = document.createElement('link');
link.rel = 'stylesheet';
link.href = '//maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css';
document.head.appendChild(link);

var app = require('./app');

app.$appendTo(document.body);

},{"./app":43}],2:[function(require,module,exports){
/*
 Vue.js v0.10.6
 (c) 2014 Evan You
 License: MIT
*/
!function(){"use strict";function e(t,i,r){var n=e.resolve(t);if(null!=n){var s=e.modules[n];if(!s._resolving&&!s.exports){var o={};o.exports={},o.client=o.component=!0,s._resolving=!0,s.call(this,o.exports,e.relative(n),o),delete s._resolving,s.exports=o.exports}return s.exports}}e.modules={},e.aliases={},e.exts=["",".js",".json","/index.js","/index.json"],e.resolve=function(t){"/"===t.charAt(0)&&(t=t.slice(1));for(var i=0;5>i;i++){var r=t+e.exts[i];if(e.modules.hasOwnProperty(r))return r;if(e.aliases.hasOwnProperty(r))return e.aliases[r]}},e.normalize=function(e,t){var i=[];if("."!=t.charAt(0))return t;e=e.split("/"),t=t.split("/");for(var r=0;r<t.length;++r)".."===t[r]?e.pop():"."!=t[r]&&""!=t[r]&&i.push(t[r]);return e.concat(i).join("/")},e.register=function(t,i){e.modules[t]=i},e.alias=function(t,i){e.modules.hasOwnProperty(t)&&(e.aliases[i]=t)},e.relative=function(t){function i(r){var n=i.resolve(r);return e(n,t,r)}var r=e.normalize(t,"..");return i.resolve=function(i){var n=i.charAt(0);if("/"===n)return i.slice(1);if("."===n)return e.normalize(r,i);for(var s=t.split("/"),o=s.length;o--&&"deps"!==s[o];);return i=s.slice(0,o+2).join("/")+"/deps/"+i},i.exists=function(t){return e.modules.hasOwnProperty(i.resolve(t))},i},e.register("vue/src/main.js",function(e,t,i){function r(e){var t=this;e.data&&(e.defaultData=e.data,delete e.data),t!==o&&(e=n(e,t.options,!0)),a.processOptions(e);var i=function(i,r){r||(i=n(i,e,!0)),t.call(this,i,!0)},s=i.prototype=Object.create(t.prototype);return a.defProtected(s,"constructor",i),i.extend=r,i.super=t,i.options=e,l.forEach(function(e){i[e]=o[e]}),i.use=o.use,i.require=o.require,i}function n(e,t,i){if(e=e||{},!t)return e;for(var r in t)if("el"!==r){var s=e[r],c=t[r];i&&"function"==typeof s&&c?(e[r]=[s],Array.isArray(c)?e[r]=e[r].concat(c):e[r].push(c)):!i||!a.isTrueObject(s)&&!a.isTrueObject(c)||c instanceof o?void 0===s&&(e[r]=c):e[r]=n(s,c)}return e}var s=t("./config"),o=t("./viewmodel"),a=t("./utils"),c=a.hash,l=["directive","filter","partial","effect","component"],u={utils:a,config:s,transition:t("./transition"),observer:t("./observer")};o.options=s.globalAssets={directives:t("./directives"),filters:t("./filters"),partials:c(),effects:c(),components:c()},l.forEach(function(e){o[e]=function(t,i){var r=this.options[e+"s"];return r||(r=this.options[e+"s"]=c()),i?("partial"===e?i=a.parseTemplateOption(i):"component"===e?i=a.toConstructor(i):"filter"===e&&a.checkFilter(i),r[t]=i,this):r[t]}}),o.config=function(e,t){if("string"==typeof e){if(void 0===t)return s[e];s[e]=t}else a.extend(s,e);return this},o.use=function(e){if("string"==typeof e)try{e=t(e)}catch(i){return}var r=[].slice.call(arguments,1);return r.unshift(this),"function"==typeof e.install?e.install.apply(e,r):e.apply(null,r),this},o.require=function(e){return u[e]},o.extend=r,o.nextTick=a.nextTick,i.exports=o}),e.register("vue/src/emitter.js",function(e,t,i){function r(e){this._ctx=e||this}var n=[].slice,s=r.prototype;s.on=function(e,t){return this._cbs=this._cbs||{},(this._cbs[e]=this._cbs[e]||[]).push(t),this},s.once=function(e,t){function i(){r.off(e,i),t.apply(this,arguments)}var r=this;return this._cbs=this._cbs||{},i.fn=t,this.on(e,i),this},s.off=function(e,t){if(this._cbs=this._cbs||{},!arguments.length)return this._cbs={},this;var i=this._cbs[e];if(!i)return this;if(1===arguments.length)return delete this._cbs[e],this;for(var r,n=0;n<i.length;n++)if(r=i[n],r===t||r.fn===t){i.splice(n,1);break}return this},s.emit=function(e,t,i,r){this._cbs=this._cbs||{};var n=this._cbs[e];if(n){n=n.slice(0);for(var s=0,o=n.length;o>s;s++)n[s].call(this._ctx,t,i,r)}return this},s.applyEmit=function(e){this._cbs=this._cbs||{};var t,i=this._cbs[e];if(i){i=i.slice(0),t=n.call(arguments,1);for(var r=0,s=i.length;s>r;r++)i[r].apply(this._ctx,t)}return this},i.exports=r}),e.register("vue/src/config.js",function(e,t,i){var r=t("./text-parser");i.exports={prefix:"v",debug:!1,silent:!1,enterClass:"v-enter",leaveClass:"v-leave",interpolate:!0},Object.defineProperty(i.exports,"delimiters",{get:function(){return r.delimiters},set:function(e){r.setDelimiters(e)}})}),e.register("vue/src/utils.js",function(e,t,i){function r(e){return e.indexOf("[")<0?e:e.replace(h,".$1").replace(f,".$1")}var n,s=t("./config"),o={}.toString,a=window,c=(a.console,Object.defineProperty),l="object",u=/[^\w]this[^\w]/,h=/\['([^']+)'\]/g,f=/\["([^"]+)"\]/g,d="classList"in document.documentElement,p=a.requestAnimationFrame||a.webkitRequestAnimationFrame||a.setTimeout,v=i.exports={toFragment:t("./fragment"),parseTemplateOption:t("./template-parser.js"),get:function(e,t){if(t=r(t),t.indexOf(".")<0)return e[t];for(var i=t.split("."),n=-1,s=i.length;++n<s&&null!=e;)e=e[i[n]];return e},set:function(e,t,i){if(t=r(t),t.indexOf(".")<0)return void(e[t]=i);for(var n=t.split("."),s=-1,o=n.length-1;++s<o;)null==e[n[s]]&&(e[n[s]]={}),e=e[n[s]];e[n[s]]=i},baseKey:function(e){return e.indexOf(".")>0?e.split(".")[0]:e},hash:function(){return Object.create(null)},attr:function(e,t){var i=s.prefix+"-"+t,r=e.getAttribute(i);return null!==r&&e.removeAttribute(i),r},defProtected:function(e,t,i,r,n){c(e,t,{value:i,enumerable:r,writable:n,configurable:!0})},isObject:function(e){return typeof e===l&&e&&!Array.isArray(e)},isTrueObject:function(e){return"[object Object]"===o.call(e)},bind:function(e,t){return function(i){return e.call(t,i)}},guard:function(e){return null==e?"":"object"==typeof e?JSON.stringify(e):e},checkNumber:function(e){return isNaN(e)||null===e||"boolean"==typeof e?e:Number(e)},extend:function(e,t){for(var i in t)e[i]!==t[i]&&(e[i]=t[i]);return e},unique:function(e){for(var t,i=v.hash(),r=e.length,n=[];r--;)t=e[r],i[t]||(i[t]=1,n.push(t));return n},toConstructor:function(e){return n=n||t("./viewmodel"),v.isObject(e)?n.extend(e):"function"==typeof e?e:null},checkFilter:function(e){u.test(e.toString())&&(e.computed=!0)},processOptions:function(e){var t,i=e.components,r=e.partials,n=e.template,s=e.filters;if(i)for(t in i)i[t]=v.toConstructor(i[t]);if(r)for(t in r)r[t]=v.parseTemplateOption(r[t]);if(s)for(t in s)v.checkFilter(s[t]);n&&(e.template=v.parseTemplateOption(n))},nextTick:function(e){p(e,0)},addClass:function(e,t){if(d)e.classList.add(t);else{var i=" "+e.className+" ";i.indexOf(" "+t+" ")<0&&(e.className=(i+t).trim())}},removeClass:function(e,t){if(d)e.classList.remove(t);else{for(var i=" "+e.className+" ",r=" "+t+" ";i.indexOf(r)>=0;)i=i.replace(r," ");e.className=i.trim()}},objectToArray:function(e){var t,i,r=[];for(var n in e)t=e[n],i=v.isObject(t)?t:{$value:t},i.$key=n,r.push(i);return r}}}),e.register("vue/src/fragment.js",function(e,t,i){var r={legend:[1,"<fieldset>","</fieldset>"],tr:[2,"<table><tbody>","</tbody></table>"],col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],_default:[0,"",""]};r.td=r.th=[3,"<table><tbody><tr>","</tr></tbody></table>"],r.option=r.optgroup=[1,'<select multiple="multiple">',"</select>"],r.thead=r.tbody=r.colgroup=r.caption=r.tfoot=[1,"<table>","</table>"],r.text=r.circle=r.ellipse=r.line=r.path=r.polygon=r.polyline=r.rect=[1,'<svg xmlns="http://www.w3.org/2000/svg" version="1.1">',"</svg>"];var n=/<([\w:]+)/;i.exports=function(e){var t=document.createDocumentFragment(),i=n.exec(e);if(!i)return t.appendChild(document.createTextNode(e)),t;var s=i[1],o=r[s]||r._default,a=o[0],c=o[1],l=o[2],u=document.createElement("div");for(u.innerHTML=c+e.trim()+l;a--;)u=u.lastChild;if(u.firstChild===u.lastChild)return t.appendChild(u.firstChild),t;for(var h;h=u.firstChild;)1===u.nodeType&&t.appendChild(h);return t}}),e.register("vue/src/compiler.js",function(e,t,i){function r(e,t){var i,r,s=this;s.init=!0,s.destroyed=!1,t=s.options=t||{},l.processOptions(t),m(s,t.compilerOptions),s.repeat=s.repeat||!1,s.expCache=s.expCache||{};var a=s.el=s.setupElement(t);s.vm=a.vue_vm=e,s.bindings=l.hash(),s.dirs=[],s.deferred=[],s.computed=[],s.children=[],s.emitter=new o(e),e.$={},e.$el=a,e.$options=t,e.$compiler=s,e.$event=null;var c=t.parent;if(c&&(s.parent=c.$compiler,c.$compiler.children.push(s),e.$parent=c,"lazy"in t||(t.lazy=s.parent.options.lazy)),e.$root=n(s).vm,s.setupObserver(),t.methods)for(i in t.methods)s.createBinding(i);if(t.computed)for(i in t.computed)s.createBinding(i);var u=s.data=t.data||{},h=t.defaultData;if(h)for(i in h)g.call(u,i)||(u[i]=h[i]);var f=t.paramAttributes;if(f)for(r=f.length;r--;)u[f[r]]=l.checkNumber(s.eval(a.getAttribute(f[r])));m(e,u),e.$data=u,s.execHook("created"),u=s.data=e.$data;var p;for(i in e)p=e[i],"$"!==i.charAt(0)&&u[i]!==p&&"function"!=typeof p&&(u[i]=p);for(s.observeData(u),t.template&&this.resolveContent(),s.compile(a,!0),r=s.deferred.length;r--;)s.bindDirective(s.deferred[r]);s.deferred=null,this.computed.length&&d.parse(this.computed),s.init=!1,s.execHook("ready")}function n(e){for(;e.parent;)e=e.parent;return e}var s,o=t("./emitter"),a=t("./observer"),c=t("./config"),l=t("./utils"),u=t("./binding"),h=t("./directive"),f=t("./text-parser"),d=t("./deps-parser"),p=t("./exp-parser"),v=[].slice,m=l.extend,g={}.hasOwnProperty,b=Object.defineProperty,y=["created","ready","beforeDestroy","afterDestroy","attached","detached"],_=["if","repeat","view","component"],x=r.prototype;x.setupElement=function(e){var t,i,r,n,s,o="string"==typeof e.el?document.querySelector(e.el):e.el||document.createElement(e.tagName||"div"),a=e.template;if(a){if(o.hasChildNodes())for(this.rawContent=document.createElement("div");t=o.firstChild;)this.rawContent.appendChild(t);if(e.replace&&a.firstChild===a.lastChild){if(i=a.firstChild.cloneNode(!0),o.parentNode&&(o.parentNode.insertBefore(i,o),o.parentNode.removeChild(o)),o.hasAttributes())for(r=o.attributes.length;r--;)n=o.attributes[r],i.setAttribute(n.name,n.value);o=i}else o.appendChild(a.cloneNode(!0))}if(e.id&&(o.id=e.id),e.className&&(o.className=e.className),s=e.attributes)for(n in s)o.setAttribute(n,s[n]);return o},x.resolveContent=function(){function e(e,t){for(var i=e.parentNode,r=0,n=t.length;n>r;r++)i.insertBefore(t[r],e);i.removeChild(e)}var t,i,r,n,s,o=v.call(this.el.getElementsByTagName("content")),a=this.rawContent;if(r=o.length){for(;r--;)t=o[r],a?(i=t.getAttribute("select"),i?t.content=v.call(a.querySelectorAll(i)):s=t):t.content=v.call(t.childNodes);for(r=0,n=o.length;n>r;r++)t=o[r],t!==s&&e(t,t.content);a&&s&&e(s,v.call(a.childNodes))}this.rawContent=null},x.setupObserver=function(){function e(e){n(e),d.catcher.emit("get",a[e])}function t(e,t,i){l.emit("change:"+e,t,i),n(e),a[e].update(t)}function i(e,t){l.on("hook:"+e,function(){t.call(s.vm)})}function r(e){var t=s.children;if(t)for(var i,r=t.length;r--;)i=t[r],i.el.parentNode&&(e="hook:"+(e?"attached":"detached"),i.observer.emit(e),i.emitter.emit(e))}function n(e){a[e]||s.createBinding(e)}var s=this,a=s.bindings,c=s.options,l=s.observer=new o(s.vm);l.proxies={},l.on("get",e).on("set",t).on("mutate",t);for(var u,h,f,p=y.length;p--;)if(h=y[p],f=c[h],Array.isArray(f))for(u=f.length;u--;)i(h,f[u]);else f&&i(h,f);l.on("hook:attached",function(){r(1)}).on("hook:detached",function(){r(0)})},x.observeData=function(e){function t(e){"$data"!==e&&i()}function i(){s.update(r.data),n.emit("change:$data",r.data)}var r=this,n=r.observer;a.observe(e,"",n);var s=r.bindings.$data=new u(r,"$data");s.update(e),b(r.vm,"$data",{get:function(){return r.observer.emit("get","$data"),r.data},set:function(e){var t=r.data;a.unobserve(t,"",n),r.data=e,a.copyPaths(e,t),a.observe(e,"",n),i()}}),n.on("set",t).on("mutate",t)},x.compile=function(e,t){var i=e.nodeType;1===i&&"SCRIPT"!==e.tagName?this.compileElement(e,t):3===i&&c.interpolate&&this.compileTextNode(e)},x.checkPriorityDir=function(e,t,i){var r,n,s;if("component"===e&&i!==!0&&(s=this.resolveComponent(t,void 0,!0))?(n=this.parseDirective(e,"",t),n.Ctor=s):(r=l.attr(t,e),n=r&&this.parseDirective(e,r,t)),n){if(i===!0)return;return this.deferred.push(n),!0}},x.compileElement=function(e,t){if("TEXTAREA"===e.tagName&&e.value&&(e.value=this.eval(e.value)),e.hasAttributes()||e.tagName.indexOf("-")>-1){if(null!==l.attr(e,"pre"))return;var i,r,n,s;for(i=0,r=_.length;r>i;i++)if(this.checkPriorityDir(_[i],e,t))return;e.vue_trans=l.attr(e,"transition"),e.vue_anim=l.attr(e,"animation"),e.vue_effect=this.eval(l.attr(e,"effect"));var o,a,u,h,d,p,m,g=c.prefix+"-",b=this.options.paramAttributes;if(t){var y=l.attr(e,"with");if(y)for(d=this.parseDirective("with",y,e,!0),n=0,s=d.length;s>n;n++)this.bindDirective(d[n],this.parent)}var x=v.call(e.attributes);for(i=0,r=x.length;r>i;i++){if(o=x[i],a=o.name,u=!1,0===a.indexOf(g))for(u=!0,m=a.slice(g.length),d=this.parseDirective(m,o.value,e,!0),n=0,s=d.length;s>n;n++)this.bindDirective(d[n]);else c.interpolate&&(h=f.parseAttr(o.value),h&&(p=this.parseDirective("attr",h,e),p.arg=a,b&&b.indexOf(a)>-1?this.bindDirective(p,this.parent):this.bindDirective(p)));u&&"cloak"!==m&&e.removeAttribute(a)}}e.hasChildNodes()&&v.call(e.childNodes).forEach(this.compile,this)},x.compileTextNode=function(e){var t=f.parse(e.nodeValue);if(t){for(var i,r,n,s=0,o=t.length;o>s;s++)r=t[s],n=null,r.key?">"===r.key.charAt(0)?(i=document.createComment("ref"),n=this.parseDirective("partial",r.key.slice(1),i)):r.html?(i=document.createComment(c.prefix+"-html"),n=this.parseDirective("html",r.key,i)):(i=document.createTextNode(""),n=this.parseDirective("text",r.key,i)):i=document.createTextNode(r),e.parentNode.insertBefore(i,e),this.bindDirective(n);e.parentNode.removeChild(e)}},x.parseDirective=function(e,t,i,r){function n(t){return new h(e,t,o,s,i)}var s=this,o=s.getOption("directives",e);if(o){var a=h.parse(t);return r?a.map(n):n(a[0])}},x.bindDirective=function(e,t){if(e){if(this.dirs.push(e),e.isEmpty||e.isLiteral)return void(e.bind&&e.bind());var i,r=t||this,n=e.key;if(e.isExp)i=r.createBinding(n,e);else{for(;r&&!r.hasKey(n);)r=r.parent;r=r||this,i=r.bindings[n]||r.createBinding(n)}i.dirs.push(e),e.binding=i;var s=i.val();e.bind&&e.bind(s),e.$update(s,!0)}},x.createBinding=function(e,t){var i=this,r=i.options.methods,n=t&&t.isExp,s=t&&t.isFn||r&&r[e],o=i.bindings,c=i.options.computed,h=new u(i,e,n,s);if(n)i.defineExp(e,h,t);else if(s)o[e]=h,i.defineVmProp(e,h,r[e]);else if(o[e]=h,h.root)c&&c[e]?i.defineComputed(e,h,c[e]):"$"!==e.charAt(0)?i.defineDataProp(e,h):(i.defineVmProp(e,h,i.data[e]),delete i.data[e]);else if(c&&c[l.baseKey(e)])i.defineExp(e,h);else{a.ensurePath(i.data,e);var f=e.slice(0,e.lastIndexOf("."));o[f]||i.createBinding(f)}return h},x.defineDataProp=function(e,t){var i=this,r=i.data,n=r.__emitter__;g.call(r,e)||(r[e]=void 0),n&&!g.call(n.values,e)&&a.convertKey(r,e),t.value=r[e],b(i.vm,e,{get:function(){return i.data[e]},set:function(t){i.data[e]=t}})},x.defineVmProp=function(e,t,i){var r=this.observer;t.value=i,b(this.vm,e,{get:function(){return a.shouldGet&&r.emit("get",e),t.value},set:function(t){r.emit("set",e,t)}})},x.defineExp=function(e,t,i){var r=i&&i.computedKey,n=r?i.expression:e,s=this.expCache[n];s||(s=this.expCache[n]=p.parse(r||e,this)),s&&this.markComputed(t,s)},x.defineComputed=function(e,t,i){this.markComputed(t,i),b(this.vm,e,{get:t.value.$get,set:t.value.$set})},x.markComputed=function(e,t){e.isComputed=!0,e.isFn?e.value=t:("function"==typeof t&&(t={$get:t}),e.value={$get:l.bind(t.$get,this.vm),$set:t.$set?l.bind(t.$set,this.vm):void 0}),this.computed.push(e)},x.getOption=function(e,t,i){var r=this.options,n=this.parent,s=c.globalAssets,o=r[e]&&r[e][t]||(n?n.getOption(e,t,i):s[e]&&s[e][t]);return o},x.execHook=function(e){e="hook:"+e,this.observer.emit(e),this.emitter.emit(e)},x.hasKey=function(e){var t=l.baseKey(e);return g.call(this.data,t)||g.call(this.vm,t)},x.eval=function(e,t){var i=f.parseAttr(e);return i?p.eval(i,this,t):e},x.resolveComponent=function(e,i,r){s=s||t("./viewmodel");var n=l.attr(e,"component"),o=e.tagName,a=this.eval(n,i),c=o.indexOf("-")>0&&o.toLowerCase(),u=this.getOption("components",a||c,!0);return r?""===n?s:u:u||s},x.destroy=function(e){if(!this.destroyed){var t,i,r,n,s,o,c=this,l=c.vm,u=c.el,h=c.dirs,f=c.computed,d=c.bindings,p=c.children,v=c.parent;for(c.execHook("beforeDestroy"),a.unobserve(c.data,"",c.observer),t=p.length;t--;)p[t].destroy(!0);for(t=h.length;t--;)n=h[t],n.binding&&n.binding.compiler!==c&&(s=n.binding.dirs,s&&(i=s.indexOf(n),i>-1&&s.splice(i,1))),n.$unbind();for(t=f.length;t--;)f[t].unbind();for(r in d)o=d[r],o&&o.unbind();v&&(i=v.children.indexOf(c),i>-1&&v.children.splice(i,1)),e||(u===document.body?u.innerHTML="":l.$remove()),u.vue_vm=null,c.destroyed=!0,c.execHook("afterDestroy"),c.observer.off(),c.emitter.off()}},i.exports=r}),e.register("vue/src/viewmodel.js",function(e,t,i){function r(e){e!==!1&&new s(this,e)}function n(e){return"string"==typeof e?document.querySelector(e):e}var s=t("./compiler"),o=t("./utils"),a=t("./transition"),c=t("./batcher"),l=[].slice,u=o.defProtected,h=o.nextTick,f=new c,d=1,p=r.prototype;u(p,"$init",function(e){new s(this,e)}),u(p,"$get",function(e){var t=o.get(this,e);return void 0===t&&this.$parent?this.$parent.$get(e):t}),u(p,"$set",function(e,t){o.set(this,e,t)}),u(p,"$watch",function(e,t){function i(){var e=l.call(arguments);f.push({id:r,override:!0,execute:function(){t.apply(n,e)}})}var r=d++,n=this;t._fn=i,n.$compiler.observer.on("change:"+e,i)}),u(p,"$unwatch",function(e,t){var i=["change:"+e],r=this.$compiler.observer;t&&i.push(t._fn),r.off.apply(r,i)}),u(p,"$destroy",function(e){this.$compiler.destroy(e)}),u(p,"$broadcast",function(){for(var e,t=this.$compiler.children,i=t.length;i--;)e=t[i],e.emitter.applyEmit.apply(e.emitter,arguments),e.vm.$broadcast.apply(e.vm,arguments)}),u(p,"$dispatch",function(){var e=this.$compiler,t=e.emitter,i=e.parent;t.applyEmit.apply(t,arguments),i&&i.vm.$dispatch.apply(i.vm,arguments)}),["emit","on","off","once"].forEach(function(e){var t="emit"===e?"applyEmit":e;u(p,"$"+e,function(){var e=this.$compiler.emitter;e[t].apply(e,arguments)})}),u(p,"$appendTo",function(e,t){e=n(e);var i=this.$el;a(i,1,function(){e.appendChild(i),t&&h(t)},this.$compiler)}),u(p,"$remove",function(e){var t=this.$el;a(t,-1,function(){t.parentNode&&t.parentNode.removeChild(t),e&&h(e)},this.$compiler)}),u(p,"$before",function(e,t){e=n(e);var i=this.$el;a(i,1,function(){e.parentNode.insertBefore(i,e),t&&h(t)},this.$compiler)}),u(p,"$after",function(e,t){e=n(e);var i=this.$el;a(i,1,function(){e.nextSibling?e.parentNode.insertBefore(i,e.nextSibling):e.parentNode.appendChild(i),t&&h(t)},this.$compiler)}),i.exports=r}),e.register("vue/src/binding.js",function(e,t,i){function r(e,t,i,r){this.id=o++,this.value=void 0,this.isExp=!!i,this.isFn=r,this.root=!this.isExp&&-1===t.indexOf("."),this.compiler=e,this.key=t,this.dirs=[],this.subs=[],this.deps=[],this.unbound=!1}var n=t("./batcher"),s=new n,o=1,a=r.prototype;a.update=function(e){if((!this.isComputed||this.isFn)&&(this.value=e),this.dirs.length||this.subs.length){var t=this;s.push({id:this.id,execute:function(){t.unbound||t._update()}})}},a._update=function(){for(var e=this.dirs.length,t=this.val();e--;)this.dirs[e].$update(t);this.pub()},a.val=function(){return this.isComputed&&!this.isFn?this.value.$get():this.value},a.pub=function(){for(var e=this.subs.length;e--;)this.subs[e].update()},a.unbind=function(){this.unbound=!0;for(var e=this.dirs.length;e--;)this.dirs[e].$unbind();e=this.deps.length;for(var t;e--;){t=this.deps[e].subs;var i=t.indexOf(this);i>-1&&t.splice(i,1)}},i.exports=r}),e.register("vue/src/observer.js",function(e,t,i){function r(e){x(O,e,function(){var t,i,r=E.call(arguments),o=Array.prototype[e].apply(this,r);return"push"===e||"unshift"===e?t=r:"pop"===e||"shift"===e?i=[o]:"splice"===e&&(t=r.slice(2),i=o),n(this,t),s(this,i),this.__emitter__.emit("mutate","",this,{method:e,args:r,result:o,inserted:t,removed:i}),o},!A)}function n(e,t){if(t)for(var i,r,n=t.length;n--;)i=t[n],o(i)&&(i.__emitter__||(a(i),l(i)),r=i.__emitter__.owners,r.indexOf(e)<0&&r.push(e))}function s(e,t){if(t)for(var i,r=t.length;r--;)if(i=t[r],i&&i.__emitter__){var n=i.__emitter__.owners;n&&n.splice(n.indexOf(e))}}function o(e){return"object"==typeof e&&e&&!e.$compiler}function a(e){if(e.__emitter__)return!0;var t=new y;return x(e,"__emitter__",t),t.on("set",function(t,i,r){r&&c(e)}).on("mutate",function(){c(e)}),t.values=_.hash(),t.owners=[],!1}function c(e){for(var t=e.__emitter__.owners,i=t.length;i--;)t[i].__emitter__.emit("set","","",!0)}function l(e){k(e)?f(e):h(e)}function u(e,t){if(A)e.__proto__=t;else for(var i in t)x(e,i,t[i])}function h(e){u(e,j);for(var t in e)d(e,t)}function f(e){u(e,O),n(e,e)}function d(e,t,i){function r(e,i){o[t]=e,s.emit("set",t,e,i),k(e)&&s.emit("set",t+".length",e.length,i),g(e,t,s)}var n=t.charAt(0);if("$"!==n&&"_"!==n){var s=e.__emitter__,o=s.values;r(e[t],i),C(e,t,{enumerable:!0,configurable:!0,get:function(){var e=o[t];return N.shouldGet&&s.emit("get",t),e},set:function(e){var i=o[t];b(i,t,s),v(e,i),r(e,!0)}})}}function p(e){var t=e&&e.__emitter__;if(t)if(k(e))t.emit("set","length",e.length);else{var i,r;for(i in e)r=e[i],t.emit("set",i,r),p(r)}}function v(e,t){if($(e)&&$(t)){var i,r,n;for(i in t)w.call(e,i)||(r=t[i],k(r)?e[i]=[]:$(r)?(n=e[i]={},v(n,r)):e[i]=void 0)}}function m(e,t){for(var i,r=t.split("."),n=0,s=r.length-1;s>n;n++)i=r[n],e[i]||(e[i]={},e.__emitter__&&d(e,i)),e=e[i];$(e)&&(i=r[n],w.call(e,i)||(e[i]=void 0,e.__emitter__&&d(e,i)))}function g(e,t,i){if(o(e)){var r=t?t+".":"",n=a(e),s=e.__emitter__;i.proxies=i.proxies||{};var c=i.proxies[r]={get:function(e){i.emit("get",r+e)},set:function(n,s,o){n&&i.emit("set",r+n,s),t&&o&&i.emit("set",t,e,!0)},mutate:function(e,n,s){var o=e?r+e:t;i.emit("mutate",o,n,s);var a=s.method;"sort"!==a&&"reverse"!==a&&i.emit("set",o+".length",n.length)}};s.on("get",c.get).on("set",c.set).on("mutate",c.mutate),n?p(e):l(e)}}function b(e,t,i){if(e&&e.__emitter__){t=t?t+".":"";var r=i.proxies[t];r&&(e.__emitter__.off("get",r.get).off("set",r.set).off("mutate",r.mutate),i.proxies[t]=null)}}var y=t("./emitter"),_=t("./utils"),x=_.defProtected,$=_.isObject,k=Array.isArray,w={}.hasOwnProperty,C=Object.defineProperty,E=[].slice,A={}.__proto__,O=Object.create(Array.prototype);["push","pop","shift","unshift","splice","sort","reverse"].forEach(r),x(O,"$set",function(e,t){return this.splice(e,1,t)[0]},!A),x(O,"$remove",function(e){return"number"!=typeof e&&(e=this.indexOf(e)),e>-1?this.splice(e,1)[0]:void 0},!A);var j=Object.create(Object.prototype);x(j,"$add",function(e,t){w.call(this,e)||(this[e]=t,d(this,e,!0))},!A),x(j,"$delete",function(e){w.call(this,e)&&(this[e]=void 0,delete this[e],this.__emitter__.emit("delete",e))},!A);var N=i.exports={shouldGet:!1,observe:g,unobserve:b,ensurePath:m,copyPaths:v,watch:l,convert:a,convertKey:d}}),e.register("vue/src/directive.js",function(e,t,i){function r(e,t,i,n,o){this.id=s++,this.name=e,this.compiler=n,this.vm=n.vm,this.el=o,this.computeFilters=!1,this.key=t.key,this.arg=t.arg,this.expression=t.expression;var a=""===this.expression;if("function"==typeof i)this[a?"bind":"update"]=i;else for(var u in i)this[u]=i[u];if(a||this.isEmpty)return void(this.isEmpty=!0);h.Regex.test(this.key)&&(this.key=n.eval(this.key),this.isLiteral&&(this.expression=this.key));var f,d,p,v,m,g=t.filters;if(g)for(this.filters=[],p=0,v=g.length;v>p;p++)f=g[p],d=this.compiler.getOption("filters",f.name),d&&(f.apply=d,this.filters.push(f),d.computed&&(m=!0));this.filters&&this.filters.length||(this.filters=null),m&&(this.computedKey=r.inlineFilters(this.key,this.filters),this.filters=null),this.isExp=m||!l.test(this.key)||c.test(this.key)}function n(e){return e.indexOf('"')>-1?e.replace(u,"'"):e}var s=1,o=/^[\w\$-]+$/,a=/[^\s'"]+|'[^']+'|"[^"]+"/g,c=/^\$(parent|root)\./,l=/^[\w\.$]+$/,u=/"/g,h=t("./text-parser"),f=r.prototype;f.$update=function(e,t){this.$lock||(t||e!==this.value||e&&"object"==typeof e)&&(this.value=e,this.update&&this.update(this.filters&&!this.computeFilters?this.$applyFilters(e):e,t))},f.$applyFilters=function(e){for(var t,i=e,r=0,n=this.filters.length;n>r;r++)t=this.filters[r],i=t.apply.apply(this.vm,[i].concat(t.args));return i},f.$unbind=function(){this.el&&this.vm&&(this.unbind&&this.unbind(),this.vm=this.el=this.binding=this.compiler=null)},r.parse=function(e){function t(){v.expression=e.slice(f,g).trim(),void 0===v.key?v.key=e.slice(d,g).trim():m!==f&&i(),(0===g||v.key)&&p.push(v)}function i(){var t,i=e.slice(m,g).trim();if(i){t={};var r=i.match(a);t.name=r[0],t.args=r.length>1?r.slice(1):null}t&&(v.filters=v.filters||[]).push(t),m=g+1}for(var r,n,s=!1,c=!1,l=0,u=0,h=0,f=0,d=0,p=[],v={},m=0,g=0,b=e.length;b>g;g++)n=e.charAt(g),s?"'"===n&&(s=!s):c?'"'===n&&(c=!c):","!==n||h||l||u?":"!==n||v.key||v.arg?"|"===n&&"|"!==e.charAt(g+1)&&"|"!==e.charAt(g-1)?void 0===v.key?(m=g+1,v.key=e.slice(d,g).trim()):i():'"'===n?c=!0:"'"===n?s=!0:"("===n?h++:")"===n?h--:"["===n?u++:"]"===n?u--:"{"===n?l++:"}"===n&&l--:(r=e.slice(f,g).trim(),o.test(r)&&(d=g+1,v.arg=r)):(t(),v={},f=d=m=g+1);return(0===g||f!==g)&&t(),p},r.inlineFilters=function(e,t){for(var i,r,s=0,o=t.length;o>s;s++)r=t[s],i=r.args?',"'+r.args.map(n).join('","')+'"':"",e='this.$compiler.getOption("filters", "'+r.name+'").call(this,'+e+i+")";return e},i.exports=r}),e.register("vue/src/exp-parser.js",function(e,t){function i(e){return e=e.replace(p,"").replace(v,",").replace(d,"").replace(m,"").replace(g,""),e?e.split(/,+/):[]}function r(e,t,i){var r="",n=0,s=t;if(i&&void 0!==o.get(i,e))return"$temp.";for(;t&&!t.hasKey(e);)t=t.parent,n++;if(t){for(;n--;)r+="$parent.";t.bindings[e]||"$"===e.charAt(0)||t.createBinding(e)}else s.createBinding(e);return r}function n(e,t){var i;try{i=new Function(e)}catch(r){}return i}function s(e){return"$"===e.charAt(0)?"\\"+e:e}var o=t("./utils"),a=/"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'/g,c=/"(\d+)"/g,l=/\n/g,u=new RegExp("constructor".split("").join("['\"+, ]*")),h=/\\u\d\d\d\d/,f="break,case,catch,continue,debugger,default,delete,do,else,false,finally,for,function,if,in,instanceof,new,null,return,switch,this,throw,true,try,typeof,var,void,while,with,undefined,abstract,boolean,byte,char,class,const,double,enum,export,extends,final,float,goto,implements,import,int,interface,long,native,package,private,protected,public,short,static,super,synchronized,throws,transient,volatile,arguments,let,yield,Math",d=new RegExp(["\\b"+f.replace(/,/g,"\\b|\\b")+"\\b"].join("|"),"g"),p=/\/\*(?:.|\n)*?\*\/|\/\/[^\n]*\n|\/\/[^\n]*$|'[^']*'|"[^"]*"|[\s\t\n]*\.[\s\t\n]*[$\w\.]+|[\{,]\s*[\w\$_]+\s*:/g,v=/[^\w$]+/g,m=/\b\d[^,]*/g,g=/^,+|,+$/g;e.parse=function(e,t,f){function d(e){var t=y.length;return y[t]=e.replace(l,"\\n"),'"'+t+'"'}function p(e){var i=e.charAt(0);e=e.slice(1);var n="this."+r(e,t,f)+e;return b[e]||(g+=n+";",b[e]=1),i+n}function v(e,t){return y[t]}if(!h.test(e)&&!u.test(e)){var m=i(e);if(!m.length)return n("return "+e,e);m=o.unique(m);var g="",b=o.hash(),y=[],_=new RegExp("[^$\\w\\.]("+m.map(s).join("|")+")[$\\w\\.]*\\b","g"),x=(" "+e).replace(a,d).replace(_,p).replace(c,v);return x=g+"return "+x,n(x,e)}},e.eval=function(t,i,r){var n,s=e.parse(t,i,r);return s&&(i.vm.$temp=r,n=s.call(i.vm),delete i.vm.$temp),n}}),e.register("vue/src/template-parser.js",function(e,t,i){var r=t("./fragment");i.exports=function(e){var t;if(e instanceof window.DocumentFragment)return e;if("string"==typeof e){if("#"!==e.charAt(0))return r(e);if(t=document.getElementById(e.slice(1)),!t)return}else{if(!e.nodeType)return;t=e}return"TEMPLATE"===t.tagName&&t.content?t.content:r("SCRIPT"===t.tagName?t.innerHTML:t.outerHTML)}}),e.register("vue/src/text-parser.js",function(e,t){function i(){var e=r(l),t=r(u);return new RegExp(e+e+e+"?(.+?)"+t+"?"+t+t)}function r(e){return e.replace(h,"\\$&")}function n(t){l=t[0],u=t[1],e.delimiters=t,e.Regex=i()}function s(t){if(!e.Regex.test(t))return null;for(var i,r,n,s,o=[];i=t.match(e.Regex);)r=i.index,r>0&&o.push(t.slice(0,r)),n={key:i[1].trim()},s=i[0],n.html=s.charAt(2)===l&&s.charAt(s.length-3)===u,o.push(n),t=t.slice(r+i[0].length);return t.length&&o.push(t),o}function o(e){c=c||t("./directive");var i=s(e);if(!i)return null;if(1===i.length)return i[0].key;for(var r,n=[],o=0,l=i.length;l>o;o++)r=i[o],n.push(r.key?a(r.key):'"'+r+'"');return n.join("+")}function a(e){if(e.indexOf("|")>-1){var t=c.parse(e),i=t&&t[0];i&&i.filters&&(e=c.inlineFilters(i.key,i.filters))}return"("+e+")"}var c,l="{",u="}",h=/[-.*+?^${}()|[\]\/\\]/g;e.Regex=i(),e.parse=s,e.parseAttr=o,e.setDelimiters=n,e.delimiters=[l,u]}),e.register("vue/src/deps-parser.js",function(e,t,i){function r(e){if(!e.isFn){var t=o.hash();e.deps=[],c.on("get",function(i){var r=t[i.key];r&&r.compiler===i.compiler||i.compiler.repeat&&!n(i.compiler,e.compiler)||(t[i.key]=i,e.deps.push(i),i.subs.push(e))}),e.value.$get(),c.off("get")}}function n(e,t){for(;t;){if(e===t)return!0;t=t.parent}}var s=t("./emitter"),o=t("./utils"),a=t("./observer"),c=new s;i.exports={catcher:c,parse:function(e){a.shouldGet=!0,e.forEach(r),a.shouldGet=!1}}}),e.register("vue/src/filters.js",function(e,t,i){function r(e,t){if(s.isObject(e)){for(var i in e)if(r(e[i],t))return!0}else if(null!=e)return e.toString().toLowerCase().indexOf(t)>-1}function n(e){return c.test(e)?e.slice(1,-1):void 0}var s=t("./utils"),o=s.get,a=[].slice,c=/^'.*'$/,l=i.exports=s.hash();l.capitalize=function(e){return e||0===e?(e=e.toString(),e.charAt(0).toUpperCase()+e.slice(1)):""},l.uppercase=function(e){return e||0===e?e.toString().toUpperCase():""},l.lowercase=function(e){return e||0===e?e.toString().toLowerCase():""},l.currency=function(e,t){if(e=parseFloat(e),!e&&0!==e)return"";t=t||"$";var i=Math.floor(e).toString(),r=i.length%3,n=r>0?i.slice(0,r)+(i.length>3?",":""):"",s="."+e.toFixed(2).slice(-2);return t+n+i.slice(r).replace(/(\d{3})(?=\d)/g,"$1,")+s},l.pluralize=function(e){var t=a.call(arguments,1);return t.length>1?t[e-1]||t[t.length-1]:t[e-1]||t[0]+"s"};var u={enter:13,tab:9,"delete":46,up:38,left:37,right:39,down:40,esc:27};l.key=function(e,t){if(e){var i=u[t];return i||(i=parseInt(t,10)),function(t){return t.keyCode===i?e.call(this,t):void 0}}},l.filterBy=function(e,t,i,a){i&&"in"!==i&&(a=i);var c=n(t)||this.$get(t);return c?(c=c.toLowerCase(),a=a&&(n(a)||this.$get(a)),Array.isArray(e)||(e=s.objectToArray(e)),e.filter(function(e){return a?r(o(e,a),c):r(e,c)})):e},l.filterBy.computed=!0,l.orderBy=function(e,t,i){var r=n(t)||this.$get(t);if(!r)return e;Array.isArray(e)||(e=s.objectToArray(e));var a=1;return i&&("-1"===i?a=-1:"!"===i.charAt(0)?(i=i.slice(1),a=this.$get(i)?1:-1):a=this.$get(i)?-1:1),e.slice().sort(function(e,t){return e=o(e,r),t=o(t,r),e===t?0:e>t?a:-a})},l.orderBy.computed=!0}),e.register("vue/src/transition.js",function(e,t,i){function r(e,t,i,r){if(!o.trans)return i(),f.CSS_SKIP;var n,s=e.classList,c=e.vue_trans_cb,u=a.enterClass,h=a.leaveClass,d=r?o.anim:o.trans;return c&&(e.removeEventListener(d,c),s.remove(u),s.remove(h),e.vue_trans_cb=null),t>0?(s.add(u),i(),r?(n=function(t){t.target===e&&(e.removeEventListener(d,n),e.vue_trans_cb=null,s.remove(u))},e.addEventListener(d,n),e.vue_trans_cb=n):l.push({execute:function(){s.remove(u)}}),f.CSS_E):(e.offsetWidth||e.offsetHeight?(s.add(h),n=function(t){t.target===e&&(e.removeEventListener(d,n),e.vue_trans_cb=null,i(),s.remove(h))},e.addEventListener(d,n),e.vue_trans_cb=n):i(),f.CSS_L)}function n(e,t,i,r,n){function s(t,i){var r=u(function(){t(),l.splice(l.indexOf(r),1),l.length||(e.vue_timeouts=null)},i);l.push(r)}var o=n.getOption("effects",r);if(!o)return i(),f.JS_SKIP;var a=o.enter,c=o.leave,l=e.vue_timeouts;if(l)for(var d=l.length;d--;)h(l[d]);return l=e.vue_timeouts=[],t>0?"function"!=typeof a?(i(),f.JS_SKIP_E):(a(e,i,s),f.JS_E):"function"!=typeof c?(i(),f.JS_SKIP_L):(c(e,i,s),f.JS_L)}function s(){var e=document.createElement("vue"),t="transitionend",i={webkitTransition:"webkitTransitionEnd",transition:t,mozTransition:t},r={};for(var n in i)if(void 0!==e.style[n]){r.trans=i[n];break}return r.anim=""===e.style.animation?"animationend":"webkitAnimationEnd",r}var o=s(),a=t("./config"),c=t("./batcher"),l=new c,u=window.setTimeout,h=window.clearTimeout,f={CSS_E:1,CSS_L:2,JS_E:3,JS_L:4,CSS_SKIP:-1,JS_SKIP:-2,JS_SKIP_E:-3,JS_SKIP_L:-4,INIT:-5,SKIP:-6};l._preFlush=function(){document.body.offsetHeight};var d=i.exports=function(e,t,i,s){var o=function(){i(),s.execHook(t>0?"attached":"detached")
};if(s.init)return o(),f.INIT;var a=""===e.vue_trans,c=""===e.vue_anim,l=e.vue_effect;return l?n(e,t,o,l,s):a||c?r(e,t,o,c):(o(),f.SKIP)};d.codes=f,d.sniff=s}),e.register("vue/src/batcher.js",function(e,t,i){function r(){this.reset()}var n=t("./utils"),s=r.prototype;s.push=function(e){if(e.id&&this.has[e.id]){if(e.override){var t=this.has[e.id];t.cancelled=!0,this.queue.push(e),this.has[e.id]=e}}else this.queue.push(e),this.has[e.id]=e,this.waiting||(this.waiting=!0,n.nextTick(n.bind(this.flush,this)))},s.flush=function(){this._preFlush&&this._preFlush();for(var e=0;e<this.queue.length;e++){var t=this.queue[e];t.cancelled||t.execute()}this.reset()},s.reset=function(){this.has=n.hash(),this.queue=[],this.waiting=!1},i.exports=r}),e.register("vue/src/directives/index.js",function(e,t,i){var r=t("../utils"),n=t("../config"),s=t("../transition"),o=i.exports=r.hash();o.component={isLiteral:!0,bind:function(){this.el.vue_vm||(this.childVM=new this.Ctor({el:this.el,parent:this.vm}))},unbind:function(){this.childVM&&this.childVM.$destroy()}},o.attr={bind:function(){var e=this.vm.$options.paramAttributes;this.isParam=e&&e.indexOf(this.arg)>-1},update:function(e){e||0===e?this.el.setAttribute(this.arg,e):this.el.removeAttribute(this.arg),this.isParam&&(this.vm[this.arg]=r.checkNumber(e))}},o.text={bind:function(){this.attr=3===this.el.nodeType?"nodeValue":"textContent"},update:function(e){this.el[this.attr]=r.guard(e)}},o.show=function(e){var t=this.el,i=e?"":"none",r=function(){t.style.display=i};s(t,e?1:-1,r,this.compiler)},o["class"]=function(e){this.arg?r[e?"addClass":"removeClass"](this.el,this.arg):(this.lastVal&&r.removeClass(this.el,this.lastVal),e&&(r.addClass(this.el,e),this.lastVal=e))},o.cloak={isEmpty:!0,bind:function(){var e=this.el;this.compiler.observer.once("hook:ready",function(){e.removeAttribute(n.prefix+"-cloak")})}},o.ref={isLiteral:!0,bind:function(){var e=this.expression;e&&(this.vm.$parent.$[e]=this.vm)},unbind:function(){var e=this.expression;e&&delete this.vm.$parent.$[e]}},o.on=t("./on"),o.repeat=t("./repeat"),o.model=t("./model"),o["if"]=t("./if"),o["with"]=t("./with"),o.html=t("./html"),o.style=t("./style"),o.partial=t("./partial"),o.view=t("./view")}),e.register("vue/src/directives/if.js",function(e,t,i){var r=t("../utils");i.exports={bind:function(){this.parent=this.el.parentNode,this.ref=document.createComment("vue-if"),this.Ctor=this.compiler.resolveComponent(this.el),this.parent.insertBefore(this.ref,this.el),this.parent.removeChild(this.el),r.attr(this.el,"view"),r.attr(this.el,"repeat")},update:function(e){e?this.childVM||(this.childVM=new this.Ctor({el:this.el.cloneNode(!0),parent:this.vm}),this.compiler.init?this.parent.insertBefore(this.childVM.$el,this.ref):this.childVM.$before(this.ref)):this.unbind()},unbind:function(){this.childVM&&(this.childVM.$destroy(),this.childVM=null)}}}),e.register("vue/src/directives/repeat.js",function(e,t,i){function r(e,t){for(var i,r=0,n=e.length;n>r;r++)if(i=e[r],!i.$reused&&i.$value===t)return r;return-1}var n=t("../utils"),s=t("../config");i.exports={bind:function(){this.identifier="$r"+this.id,this.expCache=n.hash();var e=this.el,t=this.container=e.parentNode;this.childId=this.compiler.eval(n.attr(e,"ref")),this.ref=document.createComment(s.prefix+"-repeat-"+this.key),t.insertBefore(this.ref,e),t.removeChild(e),this.collection=null,this.vms=null},update:function(e){Array.isArray(e)||n.isObject(e)&&(e=n.objectToArray(e)),this.oldVMs=this.vms,this.oldCollection=this.collection,e=this.collection=e||[];var t=e[0]&&n.isObject(e[0]);this.vms=this.oldCollection?this.diff(e,t):this.init(e,t),this.childId&&(this.vm.$[this.childId]=this.vms)},init:function(e,t){for(var i,r=[],n=0,s=e.length;s>n;n++)i=this.build(e[n],n,t),r.push(i),this.compiler.init?this.container.insertBefore(i.$el,this.ref):i.$before(this.ref);return r},diff:function(e,t){var i,n,s,o,a,c,l,u,h=this.container,f=this.oldVMs,d=[];for(d.length=e.length,i=0,n=e.length;n>i;i++)s=e[i],t?(s.$index=i,s.__emitter__&&s.__emitter__[this.identifier]?s.$reused=!0:d[i]=this.build(s,i,t)):(a=r(f,s),a>-1?(f[a].$reused=!0,f[a].$data.$index=i):d[i]=this.build(s,i,t));for(i=0,n=f.length;n>i;i++)o=f[i],s=this.arg?o.$data[this.arg]:o.$data,s.$reused&&(o.$reused=!0,delete s.$reused),o.$reused?(o.$index=s.$index,s.$key&&s.$key!==o.$key&&(o.$key=s.$key),d[o.$index]=o):(s.__emitter__&&delete s.__emitter__[this.identifier],o.$destroy());for(i=d.length;i--;)if(o=d[i],s=o.$data,c=d[i+1],o.$reused){for(u=o.$el.nextSibling;!u.vue_vm&&u!==this.ref;)u=u.nextSibling;if(l=u.vue_vm,l!==c)if(c){for(u=c.$el;!u.parentNode;)c=d[u.vue_vm.$index+1],u=c?c.$el:this.ref;h.insertBefore(o.$el,u)}else h.insertBefore(o.$el,this.ref);delete o.$reused,delete s.$index,delete s.$key}else o.$before(c?c.$el:this.ref);return d},build:function(e,t,i){var r,n,s=!i||this.arg;s&&(r=e,n=this.arg||"$value",e={},e[n]=r),e.$index=t;var o=this.el.cloneNode(!0),a=this.compiler.resolveComponent(o,e),c=new a({el:o,data:e,parent:this.vm,compilerOptions:{repeat:!0,expCache:this.expCache}});return i&&((r||e).__emitter__[this.identifier]=!0),c},unbind:function(){if(this.childId&&delete this.vm.$[this.childId],this.vms)for(var e=this.vms.length;e--;)this.vms[e].$destroy()}}}),e.register("vue/src/directives/on.js",function(e,t,i){t("../utils");i.exports={isFn:!0,bind:function(){if(this.context=this.binding.isExp?this.vm:this.binding.compiler.vm,"IFRAME"===this.el.tagName&&"load"!==this.arg){var e=this;this.iframeBind=function(){e.el.contentWindow.addEventListener(e.arg,e.handler)},this.el.addEventListener("load",this.iframeBind)}},update:function(e){if("function"==typeof e){this.reset();var t=this.vm,i=this.context;this.handler=function(r){r.targetVM=t,i.$event=r;var n=e.call(i,r);return i.$event=null,n},this.iframeBind?this.iframeBind():this.el.addEventListener(this.arg,this.handler)}},reset:function(){var e=this.iframeBind?this.el.contentWindow:this.el;this.handler&&e.removeEventListener(this.arg,this.handler)},unbind:function(){this.reset(),this.el.removeEventListener("load",this.iframeBind)}}}),e.register("vue/src/directives/model.js",function(e,t,i){function r(e){return o.call(e.options,function(e){return e.selected}).map(function(e){return e.value||e.text})}var n=t("../utils"),s=navigator.userAgent.indexOf("MSIE 9.0")>0,o=[].filter;i.exports={bind:function(){var e=this,t=e.el,i=t.type,r=t.tagName;e.lock=!1,e.ownerVM=e.binding.compiler.vm,e.event=e.compiler.options.lazy||"SELECT"===r||"checkbox"===i||"radio"===i?"change":"input",e.attr="checkbox"===i?"checked":"INPUT"===r||"SELECT"===r||"TEXTAREA"===r?"value":"innerHTML","SELECT"===r&&t.hasAttribute("multiple")&&(this.multi=!0);var o=!1;e.cLock=function(){o=!0},e.cUnlock=function(){o=!1},t.addEventListener("compositionstart",this.cLock),t.addEventListener("compositionend",this.cUnlock),e.set=e.filters?function(){if(!o){var i;try{i=t.selectionStart}catch(r){}e._set(),n.nextTick(function(){void 0!==i&&t.setSelectionRange(i,i)})}}:function(){o||(e.lock=!0,e._set(),n.nextTick(function(){e.lock=!1}))},t.addEventListener(e.event,e.set),s&&(e.onCut=function(){n.nextTick(function(){e.set()})},e.onDel=function(t){(46===t.keyCode||8===t.keyCode)&&e.set()},t.addEventListener("cut",e.onCut),t.addEventListener("keyup",e.onDel))},_set:function(){this.ownerVM.$set(this.key,this.multi?r(this.el):this.el[this.attr])},update:function(e,t){if(t&&void 0===e)return this._set();if(!this.lock){var i=this.el;"SELECT"===i.tagName?(i.selectedIndex=-1,this.multi&&Array.isArray(e)?e.forEach(this.updateSelect,this):this.updateSelect(e)):"radio"===i.type?i.checked=e==i.value:"checkbox"===i.type?i.checked=!!e:i[this.attr]=n.guard(e)}},updateSelect:function(e){for(var t=this.el.options,i=t.length;i--;)if(t[i].value==e){t[i].selected=!0;break}},unbind:function(){var e=this.el;e.removeEventListener(this.event,this.set),e.removeEventListener("compositionstart",this.cLock),e.removeEventListener("compositionend",this.cUnlock),s&&(e.removeEventListener("cut",this.onCut),e.removeEventListener("keyup",this.onDel))}}}),e.register("vue/src/directives/with.js",function(e,t,i){var r=t("../utils");i.exports={bind:function(){var e=this,t=e.arg,i=e.key,n=e.compiler,s=e.binding.compiler;return n===s?void(this.alone=!0):void(t&&(n.bindings[t]||n.createBinding(t),n.observer.on("change:"+t,function(t){n.init||(e.lock||(e.lock=!0,r.nextTick(function(){e.lock=!1})),s.vm.$set(i,t))})))},update:function(e){this.alone||this.lock||(this.arg?this.vm.$set(this.arg,e):this.vm.$data!==e&&(this.vm.$data=e))}}}),e.register("vue/src/directives/html.js",function(e,t,i){var r=t("../utils"),n=[].slice;i.exports={bind:function(){8===this.el.nodeType&&(this.nodes=[])},update:function(e){e=r.guard(e),this.nodes?this.swap(e):this.el.innerHTML=e},swap:function(e){for(var t=this.el.parentNode,i=this.nodes,s=i.length;s--;)t.removeChild(i[s]);var o=r.toFragment(e);this.nodes=n.call(o.childNodes),t.insertBefore(o,this.el)}}}),e.register("vue/src/directives/style.js",function(e,t,i){var r=["-webkit-","-moz-","-ms-"];i.exports={bind:function(){var e=this.arg;e&&("$"===e.charAt(0)&&(e=e.slice(1),this.prefixed=!0),this.prop=e)},update:function(e){var t,i=this.prop;if(null!=e&&(e+=""),i){if(e&&(t="!important"===e.slice(-10)?"important":"",t&&(e=e.slice(0,-10).trim())),this.el.style.setProperty(i,e,t),this.prefixed)for(var n=r.length;n--;)this.el.style.setProperty(r[n]+i,e,t)}else this.el.style.cssText=e}}}),e.register("vue/src/directives/partial.js",function(e,t,i){t("../utils");i.exports={isLiteral:!0,bind:function(){var e=this.expression;if(e){var t=this.el,i=this.compiler,r=i.getOption("partials",e);if(r)if(r=r.cloneNode(!0),8===t.nodeType){var n=[].slice.call(r.childNodes),s=t.parentNode;s.insertBefore(r,t),s.removeChild(t),n.forEach(i.compile,i)}else t.innerHTML="",t.appendChild(r)}}}}),e.register("vue/src/directives/view.js",function(e,t,i){i.exports={bind:function(){var e=this.raw=this.el,t=e.parentNode,i=this.ref=document.createComment("v-view");t.insertBefore(i,e),t.removeChild(e);for(var r,n=this.inner=document.createElement("div");r=e.firstChild;)n.appendChild(r)},update:function(e){this.unbind();var t=this.compiler.getOption("components",e);t&&(this.childVM=new t({el:this.raw.cloneNode(!0),parent:this.vm,compilerOptions:{rawContent:this.inner.cloneNode(!0)}}),this.el=this.childVM.$el,this.compiler.init?this.ref.parentNode.insertBefore(this.el,this.ref):this.childVM.$before(this.ref))},unbind:function(){this.childVM&&this.childVM.$destroy()}}}),e.alias("vue/src/main.js","vue/index.js"),"object"==typeof exports?module.exports=e("vue"):"function"==typeof define&&define.amd?define(function(){return e("vue")}):window.Vue=e("vue")}();
},{}],3:[function(require,module,exports){
'use strict';

var api = require('./../../../../../../services/api.js'),
    Vue = require('vue/dist/vue.min.js'),
    pixiv = window.pixiv;

var Cmp = Vue.extend({
  attached: function attached() {
    var $el = window.$(this.$el);

    $el.find('.ui-counter').counter();
    pixiv.bookmarkTag.setup('.tag-cloud-container');
    pixiv.tag.setup();
    $el.on('click', '.tag', function() {
      pixiv.tag.toggle(this.dataset.tag);
      return false;
    });
    $el.find('input[name="comment"]').focus();
  }
});

module.exports = {
  bind: function() {
    var parent = this.el.parentNode;

    this.ref = document.createComment('v-include');
    parent.insertBefore(this.ref, this.el);
    parent.removeChild(this.el);
  },
  unbind: function() {
    if (this.childVM) {
      this.childVM.$destroy();
    }
  },
  update: function(value) {
    if (!value) { return; }

    var dir = this;

    this.unbind();
    api.getBookmark(value).then(function(el) {
      if (!dir.compiler) { return; }

      var btn = el.querySelector('input[type="submit"]'),
          form = el.querySelector('form');

      btn.setAttribute('v-attr', 'disabled:loading');
      form.setAttribute('v-on', 'submit:update');

      dir.childVM = new Cmp({parent: dir.vm, el: el });
      dir.el = dir.childVM.$el;

      if (dir.compiler.init) {
        dir.ref.parentNode.insertBefore(dir.el, dir.ref);
      } else {
        dir.childVM.$before(dir.ref);
      }
    }).catch(function(err) {
      if (!dir.compiler) { return; }

      dir.el = createErrBox(err.message);
      dir.ref.parentNode.insertBefore(dir.el, dir.ref);
    });
  }
};

function createErrBox(msg) {
  var box = document.createElement('div');

  box.className = 'pv-panel-item';
  box.textContent = msg;
  return box;
}

},{"./../../../../../../services/api.js":46,"vue/dist/vue.min.js":2}],4:[function(require,module,exports){
'use strict';

require('./index.less');

var api = require('./../../../../../services/api.js');

module.exports = {
  className: 'pv-bookmark',
  template: require('./template.html'),
  directives: {
    include: require('./directives/include')
  },
  data: {
    loading: false
  },
  methods: {
    update: function update(evt) {
      evt.preventDefault();
      evt.stopPropagation();

      var vm = this;

      this.loading = true;
      api.invoke('bookmark', this.pix, evt.target).then(function() {
        vm.loading = false;
        vm.$root.$broadcast('panel:change', 'bookmark');
      });
    }
  }
};

},{"./../../../../../services/api.js":46,"./directives/include":3,"./index.less":5,"./template.html":6}],5:[function(require,module,exports){
(function() { var head = document.getElementsByTagName('head')[0]; style = document.createElement('style'); style.type = 'text/css';var css = ".pv-bookmark{width:970px}.pv-bookmark .layout-body{margin:0}.pv-bookmark .bookmark-detail-unit{border-top:0;border-radius:0}.pv-bookmark .bookmark-list-unit{margin-bottom:0;border-bottom:0;border-radius:0}.pv-bookmark a[href*=\"member_illust.php\"] img[src*=\"/img/\"]{cursor:pointer}";if (style.styleSheet){ style.styleSheet.cssText = css; } else { style.appendChild(document.createTextNode(css)); } head.appendChild(style);}())
},{}],6:[function(require,module,exports){
module.exports = '<content></content><div class="pv-panel-body" v-if="!pix.self"><div v-include="pix.illust.id"></div></div><div class="pv-panel-body" v-if="pix.self"><p class="pv-panel-item">自分の作品です</p></div>';
},{}],7:[function(require,module,exports){
'use strict';

var utils = require('./../../../../../../services/utils.js'),
    throttle = utils.throttle,
    ensureAttached = utils.ensureAttached;

function isInView(el) {
  var rect = el.getBoundingClientRect();
  return el === document.elementFromPoint(rect.left, rect.top);
}

function draw(el) {
  el.src = el.dataset.src;
  el.classList.remove('ui-scroll-view');
}

module.exports = {
  load: function() {
    var l = this.items.length;

    this.items = this.items.filter(function(el) {
      return isInView(el) ? draw(el) : true;
    });

    if (l > this.items.length) {
      this.vm.$set(this.expression, this.el.firstElementChild.innerHTML);
    }
  },
  update: function(value) {
    if (value) {
      ensureAttached(this.vm, function() {
        this.items = [].slice.call(this.el.querySelectorAll('.ui-scroll-view'));
        this.load();
      }, this);
    }
  },
  bind: function() {
    this.items = [];
    this.handler = throttle(this.load, 33, this);
    this.el.addEventListener('scroll', this.handler);
    this.el.addEventListener('resize', this.handler);
  },
  unbind: function() {
    this.items = [];
    this.el.removeEventListener('scroll', this.handler);
    this.el.removeEventListener('resize', this.handler);
  }
};

},{"./../../../../../../services/utils.js":51}],8:[function(require,module,exports){
'use strict';

var patterns = {
  normal:        101,
  surprise:      102,
  serious:       103,
  heaven:        104,
  happy:         105,
  excited:       106,
  sing:          107,
  cry:           108,
  normal2:       201,
  shame2:        202,
  love2:         203,
  interesting2:  204,
  blush2:        205,
  fire2:         206,
  angry2:        207,
  shine2:        208,
  panic2:        209,
  normal3:       301,
  satisfaction3: 302,
  surprise3:     303,
  smile3:        304,
  shock3:        305,
  gaze3:         306,
  wink3:         307,
  happy3:        308,
  excited3:      309,
  love3:         310,
  normal4:       401,
  surprise4:     402,
  serious4:      403,
  love4:         404,
  shine4:        405,
  sweat4:        406,
  shame4:        407,
  sleep4:        408,
  heart:         501,
  teardrop:      502,
  star:          503
};

module.exports = function emoji(text) {
  return text.trim().replace(/\s*?(\([^()]+\))/g, replaceCb).replace(/\s*?(:[^:]+:)/g, replaceCb);
};

function replaceCb(_, m) {
  var n, pattern;

  pattern = m.replace(/[():]/g, '');
  if (n = patterns[pattern]) {
    return '<img src="' + 'http://source.pixiv.net/common/images/emoji/' + n + '.png" width="28" height="28" class="emoji-text">';
  } else {
    return m;
  }
  return m;
}

},{}],9:[function(require,module,exports){
'use strict';

require('./index.less');

var api = require('./../../../../../services/api.js');

module.exports = {
  className: 'pv-comments',
  template: require('./template.html'),
  directives: {
    lazy: require('./directives/lazy')
  },
  filters: {
    emoji: require('./filters/emoji')
  },
  data: {
    loading: false
  },
  methods: {
    getComments: function getComments() {
      var vm = this;

      this.loading = true;
      api.invoke('getComments', this.pix).then(function() {
        vm.loading = false;
      });
    }
  }
};

},{"./../../../../../services/api.js":46,"./directives/lazy":7,"./filters/emoji":8,"./index.less":10,"./template.html":11}],10:[function(require,module,exports){
(function() { var head = document.getElementsByTagName('head')[0]; style = document.createElement('style'); style.type = 'text/css';var css = ".pv-comments{width:420px}.pv-comments ._comment-item:first-child{margin-top:18px}.pv-comments ._comment-item .comment{padding-right:20px}.pv-comments ._comment-item.host-user .comment{padding-left:20px;padding-right:90px}.pv-comments .sticker{width:70px;height:70px}.pv-comments .action-list{display:none}";if (style.styleSheet){ style.styleSheet.cssText = css; } else { style.appendChild(document.createTextNode(css)); } head.appendChild(style);}())
},{}],11:[function(require,module,exports){
module.exports = '<content></content><div class="pv-panel-body" v-lazy="pix.comments.body"><div v-html="pix.comments.body | emoji"></div></div><div class="pv-panel-footer" v-if="pix.comments.more"><button class="btn btn-primary btn-block" v-on="click:getComments" v-attr="disabled:loading">もっと見る</button></div>';
},{}],12:[function(require,module,exports){
'use strict';

module.exports = {
  isEmpty: true,
  sanitize: function sanitize() {
    var validity = this.validity;

    if (validity.rangeOverflow) {
      this.value = this.max;
    } else if (validity.rangeUnderflow) {
      this.value = this.min;
    } else if (validity.valueMissing) {
      this.value = this.min;
    }
  },
  bind: function bind() {
    this.el.addEventListener('input', this.sanitize);
  },
  unbind: function unbind() {
    this.el.removeEventListener('input', this.sanitize);
  }
};


},{}],13:[function(require,module,exports){
'use strict';

require('./index.less');

module.exports = {
  className: 'pv-configuration',
  template: require('./template.html'),
  directives: {
    validate: require('./directives/validate')
  },
  methods: {
    removeConfig: function removeConfig() {
      var STORAGE_KEY = this.$get('STORAGE_KEY');

      localStorage.removeItem(STORAGE_KEY);
      location.reload();
    }
  }
};

},{"./directives/validate":12,"./index.less":14,"./template.html":15}],14:[function(require,module,exports){
(function() { var head = document.getElementsByTagName('head')[0]; style = document.createElement('style'); style.type = 'text/css';var css = ".pv-configuration{width:400px}.pv-configuration .pv-panel-item{display:flex}.pv-configuration label{flex:1;margin-right:8px;line-height:30px;text-align:right}.pv-configuration label:after{content:\":\"}.pv-configuration input{box-sizing:border-box;flex:2 0 auto;height:30px;padding:4px 6px;border:1px solid #e5e5e5;background:#fff;color:#666;transition:all linear .2s;border-radius:4px}";if (style.styleSheet){ style.styleSheet.cssText = css; } else { style.appendChild(document.createTextNode(css)); } head.appendChild(style);}())
},{}],15:[function(require,module,exports){
module.exports = '<h1 class="pv-panel-header">設定</h1><div class="pv-panel-body"><div class="pv-panel-item"><label for="pv-config-padding">Padding</label><input id="pv-config-padding" type="number" min="5" max="400" required="" v-validate="" v-model="config.padding"></div><div class="pv-panel-item"><label for="pv-config-cache">Cache size</label><input id="pv-config-cache" type="number" min="1" max="30" required="" v-validate="" v-model="config.cacheSize"></div><div class="pv-panel-item"><button class="btn btn-danger btn-block" v-on="click:removeConfig">設定を削除する(リロードが発生します)</button></div></div>';
},{}],16:[function(require,module,exports){
'use strict';

require('./index.less');

var api = require('./../../../../../services/api.js');

module.exports = {
  className: 'pv-description',
  template: require('./template.html'),
  data: {
    loading: false
  },
  methods: {
    rate: function rate(score) {
      this.$dispatch('pix:rate', score);
    },
    answer: function answer(stat) {
      var vm = this;

      this.loading = true;
      api.invoke('answer', this.pix, stat).then(function() {
        vm.loading = false;
      });
    }
  },
  created: function created() {
    this.$on('pix:rate:change', function(value) {
      this.loading = value;
    });
  }
};

},{"./../../../../../services/api.js":46,"./index.less":17,"./template.html":18}],17:[function(require,module,exports){
(function() { var head = document.getElementsByTagName('head')[0]; style = document.createElement('style'); style.type = 'text/css';var css = ".pv-description{width:400px}.pv-description .meta li{display:inline-block;margin-right:4px}.pv-description .star-rating{display:block;width:180px;line-height:1}.pv-description .star-rating:after{content:\'\';clear:both;display:table}.pv-description .star-rating.rated{pointer-events:none}.pv-description .star-rating>li{float:right}.pv-description .star-rating>li>button{cursor:pointer;display:inline-block;width:18px;margin:0;padding:0;border:0;background-color:inherit;color:#999;font-size:17px;font-family:FontAwesome;font-style:normal;font-weight:400;line-height:1;text-align:center;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}.pv-description .star-rating>li>button:before{content:\"\\f006\"}.pv-description .star-rating>li:hover>button,.pv-description .star-rating>li:hover~li>button{color:#f1c40f}.pv-description .star-rating>li:hover>button:before,.pv-description .star-rating>li:hover~li>button:before{content:\"\\f005\"}.pv-description .star-rating>li.active>button,.pv-description .star-rating>li.active~li>button{color:#f1c40f}.pv-description .star-rating>li.active>button:before,.pv-description .star-rating>li.active~li>button:before{content:\"\\f005\"}.pv-question{font-weight:700;margin-bottom:8px;padding-bottom:8px;border-bottom:1px solid #ccc}.pv-question:before{content:\"Q:\"}.pv-questionnaire{list-style-type:decimal;padding-left:40px}.pv-questionnaire li{margin:4px 0}.pv-questionnaire button{display:inline;border:0;background-color:transparent;cursor:pointer;color:#258fb8;font-family:inherit;text-align:left}.pv-questionnaire button:focus,.pv-questionnaire button:hover{outline:0;text-decoration:underline}.pv-questionnaire-result{width:100%}.pv-questionnaire-result td{padding:4px 16px;border-bottom:1px solid #ccc}.pv-questionnaire-result .count{text-align:right}.pv-questionnaire-result .active td{font-weight:700}";if (style.styleSheet){ style.styleSheet.cssText = css; } else { style.appendChild(document.createTextNode(css)); } head.appendChild(style);}())
},{}],18:[function(require,module,exports){
module.exports = '<content></content><div class="pv-panel-body"><div class="pv-panel-item" v-html="pix.desc.meta"></div><div class="pv-panel-item" v-html="pix.desc.caption"></div><div class="pv-panel-item" v-html="pix.desc.tags"></div><div class="pv-panel-item">閲覧数: <span v-text="pix.rate.rtv"></span> 評価回数: <span v-text="pix.rate.rtc"></span> 総合点: <span v-text="pix.rate.rtt"></span></div><div class="pv-panel-item" v-if="!pix.self"><ul class="star-rating" v-class="rated:pix.rate.rated"><li v-repeat="[10,9,8,7,6,5,4,3,2,1]" v-class="active:pix.rate.score == $value"><button class="_ui-tooltip" data-tooltip="{{$value}}" v-on="click:rate($value)" v-attr="disabled:loading"></button></li></ul></div><div class="pv-panel-item" v-if="pix.rate.hasQuestionnaire"><p class="pv-question" v-text="pix.rate.question"></p><ol class="pv-questionnaire" v-if="!pix.self && !pix.rate.answered"><li v-repeat="stat: pix.rate.stats"><button v-on="answer(stat)" v-attr="disabled:loading" v-text="stat.name"></button></li></ol><table class="pv-questionnaire-result" v-if="pix.self || pix.rate.answered"><tbody><tr v-repeat="stat: pix.rate.stats" v-class="stat.active"><td v-text="stat.name"></td><td class="count" v-text="stat.count"></td></tr></tbody></table></div></div>';
},{}],19:[function(require,module,exports){
'use strict';

require('./index.less');

var api = require('./../../../../../services/api.js');

module.exports = {
  className: 'pv-follow',
  template: require('./template.html'),
  data: {
    restrict: '0',
    loading: false
  },
  methods: {
    add: function add() {
      this.loading = true;
      api.invoke('follow', this.pix, this.restrict).then(this._always.bind(this));
    },
    put: function put() {
      this.loading = true;
      api.invoke('refollow', this.pix, this.restrict).then(this._always.bind(this));
    },
    del: function del() {
      this.loading = true;
      api.invoke('unfollow', this.pix).then(this._always.bind(this));
    },
    _always: function always() {
      this.loading = false;
      this.$root.$broadcast('panel:change', 'follow');
    }
  }
};

},{"./../../../../../services/api.js":46,"./index.less":20,"./template.html":21}],20:[function(require,module,exports){
(function() { var head = document.getElementsByTagName('head')[0]; style = document.createElement('style'); style.type = 'text/css';var css = ".pv-follow{width:300px}.pv-follow .input-label{display:inline-block;margin-right:20px;vertical-align:middle}.pv-follow .input-label>input{vertical-align:middle}.pv-follow .btn{margin-right:4px}";if (style.styleSheet){ style.styleSheet.cssText = css; } else { style.appendChild(document.createTextNode(css)); } head.appendChild(style);}())
},{}],21:[function(require,module,exports){
module.exports = '<content></content><div class="pv-panel-body" v-if="!pix.self"><p class="pv-panel-item"><label class="input-label"><input type="radio" value="0" v-model="restrict">公開</label><label class="input-label"><input type="radio" value="1" v-model="restrict">非公開</label></p><p class="pv-panel-item" v-if="pix.author.favorite"><button class="btn btn-primary" v-on="click:put" v-attr="disabled:loading">変更</button><button class="btn btn-danger" v-on="click:del" v-attr="disabled:loading">解除</button></p><p class="pv-panel-item" v-if="!pix.author.favorite"><button class="btn btn-primary" v-on="click:add" v-attr="disabled:loading">追加</button></p></div><div class="pv-panel-body" v-if="pix.self"><p class="pv-panel-item">自分です</p></div>';
},{}],22:[function(require,module,exports){
'use strict';

/* global GM_info */

require('./index.less');

var keys = require('./../../../../../services/keys.js');

module.exports = {
  className: 'pv-help',
  template: require('./template.html'),
  data: { map: {} },
  created: function created() {
    this.name = GM_info.script.name;
    this.version = GM_info.script.version;
    this.homepage = GM_info.script.homepage;
    this.support = GM_info.script.supportURL;
  },
  attached: function attached() {
    this.map = keys.getMap();
  }
};

},{"./../../../../../services/keys.js":48,"./index.less":23,"./template.html":24}],23:[function(require,module,exports){
(function() { var head = document.getElementsByTagName('head')[0]; style = document.createElement('style'); style.type = 'text/css';var css = ".pv-help{width:400px}.pv-help kbd{display:inline-block;margin-right:6px;padding:4px 1em;border-radius:4px;background-color:#fff;box-shadow:inset 0 -2px 0 0 #999,inset 0 0 0 1px #999;font-size:12px}.pv-help kbd:last-child{margin-right:0}.pv-help kbd span:after{content:\"+\"}.pv-help kbd span:last-child:after{content:\"\"}.pv-panel-item-header{padding:8px 16px;border-bottom:1px solid #ccc;background-color:#eef;font-size:14px}.pv-panel-table{width:100%;border-bottom:1px solid #ccc}.pv-panel-table td{padding:8px 16px}";if (style.styleSheet){ style.styleSheet.cssText = css; } else { style.appendChild(document.createTextNode(css)); } head.appendChild(style);}())
},{}],24:[function(require,module,exports){
module.exports = '<h1 class="pv-panel-header">HELP</h1><div class="pv-panel-body"><h2 class="pv-panel-item-header">About</h2><table class="pv-panel-table"><tr><td>Name:</td><td v-text="name"></td></tr><tr><td>Version:</td><td v-text="version"></td></tr><tr><td>Project:</td><td><a href="{{homepage}}" v-text="name"></a></td></tr><tr><td>Support:</td><td><a href="{{support}}">Github Issues</a></td></tr></table><h2 class="pv-panel-item-header">Shortcuts</h2><table class="pv-panel-table"><tr v-repeat="map"><td v-text="name"></td><td><kbd v-repeat="keys"><span v-repeat="modifiers" v-show="$value" v-text="$key"></span><span v-text="key"></span></kbd></td></tr></table></div>';
},{}],25:[function(require,module,exports){
'use strict';

require('./index.less');

module.exports = {
  className: 'pv-panel',
  template: require('./template.html'),
  components: {
    description:   require('./components/description'),
    bookmark:      require('./components/bookmark'),
    follow:        require('./components/follow'),
    comments:      require('./components/comments'),
    configuration: require('./components/configuration'),
    help:          require('./components/help')
  },
  computed: {
    illustUrl: function illustUrl() {
      var prefix = 'http://www.pixiv.net/member_illust.php?mode=medium&illust_id=',
          id;

      if (id = this.$get('pix.illust.id')) {
        return prefix + id;
      }
      return '#';
    },
    authorUrl: function authorUrl() {
      var prefix = 'http://www.pixiv.net/member_illust.php?id=',
          id;

      if (id = this.$get('pix.author.id')) {
        return prefix + id;
      }
      return '#';
    }
  }
};

},{"./components/bookmark":4,"./components/comments":9,"./components/configuration":13,"./components/description":16,"./components/follow":19,"./components/help":22,"./index.less":26,"./template.html":27}],26:[function(require,module,exports){
(function() { var head = document.getElementsByTagName('head')[0]; style = document.createElement('style'); style.type = 'text/css';var css = ".pv-panel{position:absolute;z-index:1;background-color:#fff;box-shadow:1px 1px 3px rgba(0,0,0,.4)}.pv-panel>section{display:flex;flex-direction:column;max-height:100vh}.pv-panel-header{flex:0 0 auto;background-color:#eee;padding:8px 16px;border-bottom:1px solid #ccc;font-size:16px}.pv-panel-body{flex:auto;overflow:auto}.pv-panel-footer{flex:0 0 auto;background-color:#eee;padding:8px 16px;border-top:1px solid #ccc;font-size:16px}.pv-panel-item{padding:8px 16px;border-bottom:1px solid #ccc}.pv-panel-item:empty{display:none}.pv-panel-item:last-child{border-bottom:0}";if (style.styleSheet){ style.styleSheet.cssText = css; } else { style.appendChild(document.createTextNode(css)); } head.appendChild(style);}())
},{}],27:[function(require,module,exports){
module.exports = '<section v-view="config.panel" v-with="pix: pix"><h1 class="pv-panel-header"><a v-attr="href: illustUrl" v-text="pix.desc.title"></a> | <a v-attr="href: authorUrl" v-text="pix.author.name"></a></h1></section>';
},{}],28:[function(require,module,exports){
'use strict';

require('./index.less');

// this.panel =  app.config.panel
// this.fit   =  app.config.fit
// this.pix   =  app.pix
module.exports = {
  tagName: 'ul',
  className: 'pv-toolbar',
  template: require('./template.html'),
  methods: {
    change: function change(type) {
      if (this.panel === type) {
        this.panel = null;
      } else {
        this.panel = type;
      }
    },
    resize: function resize() {
      this.$emit('img:resize');
    },
    download: function download() {
      this.$root.$broadcast('img:download');
    },
    tweet: function tweet() {
      this.$dispatch('pix:tweet');
    }
  },
  created: function created() {
    this.$on('panel:change', function(type) {
      this.change(type);
    });

    this.$on('img:resize', function() {
      this.fit = !this.fit;
    });
  }
};

},{"./index.less":29,"./template.html":30}],29:[function(require,module,exports){
(function() { var head = document.getElementsByTagName('head')[0]; style = document.createElement('style'); style.type = 'text/css';var css = ".pv-toolbar{position:relative;z-index:2;width:40px;background-color:#f5f5f5;box-shadow:1px 0 3px rgba(0,0,0,.4)}.pv-toolbar button{position:relative;z-index:1;display:inline-block;width:40px;height:40px;line-height:0;margin:0;padding:0;border:0;font-size:20px;background-color:#f5f5f5;color:#999;cursor:pointer}.pv-toolbar button:hover{color:#005580;background-color:#eee}.pv-toolbar button:focus{outline:1px dotted;outline-offset:-1px}.pv-toolbar button:disabled{pointer-events:none}.pv-toolbar>li{position:relative;z-index:1}.pv-toolbar>.current>button{text-shadow:0 -1px 0 rgba(0,0,0,.2);background-color:#08C;color:#FFF}.pv-toolbar>.active>button{color:#31cd73}.pv-toolbar>.divider{height:1px;margin:9px 0;overflow:hidden;background-color:#e5e5e5}";if (style.styleSheet){ style.styleSheet.cssText = css; } else { style.appendChild(document.createTextNode(css)); } head.appendChild(style);}())
},{}],30:[function(require,module,exports){
module.exports = '<li v-class="active: fit"><button class="_ui-tooltip" data-tooltip="画像サイズ切替(F)" v-on="click:resize"><span class="fa fa-fw fa-compress"></span></button></li><li><button class="_ui-tooltip" data-tooltip="ダウンロード(D)" v-on="click:download"><span class="fa fa-fw fa-download"></span></button></li><li><button class="_ui-tooltip" data-tooltip="つぶやく(T)" v-on="click:tweet"><span class="fa fa-fw fa-twitter"></span></button></li><li class="divider"></li><li v-class="\n  active: pix.rate.rated,\n  current: panel == \'description\'\n"><button class="_ui-tooltip" data-tooltip="情報(H)" v-on="click:change(\'description\')"><span class="fa fa-fw fa-info"></span></button></li><li v-class="\n  active: pix.illust.bookmark,\n  current: panel == \'bookmark\'\n"><button class="_ui-tooltip" data-tooltip="ブックマーク(B)" v-on="click:change(\'bookmark\')"><span class="fa fa-fw fa-bookmark"></span></button></li><li v-class="\n  active: pix.author.favorite,\n  current: panel == \'follow\'\n"><button class="_ui-tooltip" data-tooltip="フォロー" v-on="click:change(\'follow\')"><span class="fa fa-fw fa-user"></span></button></li><li v-class="current: panel == \'comments\'"><button class="_ui-tooltip" data-tooltip="コメント(C)" v-on="click:change(\'comments\')"><span class="fa fa-fw fa-comments"></span></button></li><li class="divider"></li><li v-class="current: panel == \'configuration\'"><button class="_ui-tooltip" data-tooltip="設定" v-on="click:change(\'configuration\')"><span class="fa fa-fw fa-wrench"></span></button></li><li v-class="current: panel == \'help\'"><button class="_ui-tooltip" data-tooltip="ヘルプ(?)" v-on="click:change(\'help\')"><span class="fa fa-fw fa-question"></span></button></li>';
},{}],31:[function(require,module,exports){
'use strict';

var utils = require('./../../../../../services/utils.js');

require('./index.less');

module.exports = {
  className: 'pv-comic',
  template: require('./template.html'),
  data: {
    page: 0,
    done: false,
    fail: false,
    thumbsView: false
  },
  computed: {
    src: function src() {
      return this.pix.illust.path.replace('{n}', this.page);
    },
    thumbs: function thumbs() {
      var illust = this.pix.illust;
      var arr = [];
      var i = 0, l = illust.length;

      for(; i < l; i++) {
        arr.push(illust.thumbs.replace('{n}', i));
      }
      return arr;
    },
    filename: function filename() {
      var pix = this.pix;

      return utils.format(
        '%s - %s [%s-%s]%s',
        pix.author.name,
        pix.desc.title,
        this.page + 1,
        pix.illust.length,
        pix.illust.path.slice(pix.illust.path.lastIndexOf('.'))
      );
    }
  },
  methods: {
    load: function load() {
      this.done = true;
      this.fail = false;
      this.thumbsView = false;
    },
    error: function error() {
      var illust = this.pix.illust;

      if (/_p\{n\}\.jpg/.test(illust.path)) {
        illust.path = illust.path.replace(/jpg$/, 'png');
        return;
      } else if (/_p\{n\}\.png/.test(illust.path)) {
        illust.path = illust.path.replace(/png$/, 'gif');
        return;
      }

      this.done = false;
      this.fail = true;
      this.thumbsView = false;
    },
    move: function move(evt) {
      var step = evt.shiftKey ? -1 : 1;

      evt.preventDefault();
      evt.stopPropagation();
      if (evt.ctrlKey) {
        this.$root.$emit('app:skip', step);
        return;
      }

      this.$emit('app:move', step);
    },
    select: function select(evt, page) {
      evt.preventDefault();
      evt.stopPropagation();

      if (this.page !== page) {
        this.page = page;
        return;
      }
      if (this.$done) {
        this.load();
      } else {
        this.error();
      }
    },
    showThumbs: function showThumbs(evt) {
      evt.preventDefault();
      evt.stopPropagation();
      this.$done = this.done;
      this.done = false;
      this.fail = false;
      this.thumbsView = true;
    }
  },
  created: function created() {
    var scroll = new utils.Scroll({
      el: this.$el,
      easing: 'linear',
      duration: 200
    });

    this.$on('app:move', function(step) {
      var next = this.page + step,
          length = this.pix.illust.length;

      if (0 <= next && next < length) {
        this.done = false;
        this.page = next;
        return;
      }

      this.$root.$emit('app:skip', step);
    });

    this.$on('img:download', function() {
      utils.download(this.src, this.filename);
    });

    this.$on('img:scroll', function(value) {
      scroll.by(value);
    });
  }
};

},{"./../../../../../services/utils.js":51,"./index.less":32,"./template.html":33}],32:[function(require,module,exports){
(function() { var head = document.getElementsByTagName('head')[0]; style = document.createElement('style'); style.type = 'text/css';var css = ".pv-page{position:absolute;bottom:4px;right:50%;padding:2px 20px;border-radius:15px;background-color:rgba(0,0,0,.4);color:#fff;transform:translate(50%)}.pv-page>.btn{margin-left:6px}.pv-page>*{vertical-align:middle}.pv-thumbs>li{display:inline-block;margin:6px;padding:2px;background-color:#fff;box-shadow:0 0 0 5px rgba(0,0,0,.2);cursor:pointer}.pv-thumbs>.current{box-shadow:0 0 0 5px rgba(0,0,0,.6)}";if (style.styleSheet){ style.styleSheet.cssText = css; } else { style.appendChild(document.createTextNode(css)); } head.appendChild(style);}())
},{}],33:[function(require,module,exports){
module.exports = '<img v-attr="\n    src: src,\n    data-padding: config.padding\n  " v-show="done && !thumbsView" v-on="\n    load: load,\n    error: error,\n    click: move,\n    dragstart: grab,\n    drag: drag\n  " v-fit="config.fit"><div class="pv-msg" v-show="fail && !thumbsView" v-on="click: move">画像が読み込めません</div><ul class="pv-thumbs" v-if="thumbsView"><li v-repeat="thumbs" v-class="current: page === $index" v-on="click:select($event, $index)" class="_ui-tooltip" data-tooltip="{{$index + 1}}"><img v-attr="src: $value"></li></ul><div class="pv-page" v-if="!thumbsView"><span v-text="page + 1"></span> <span>/</span> <span v-text="pix.illust.length"></span><button class="_ui-tooltip btn" v-on="click:showThumbs" data-tooltip="サムネイル一覧"><span class="fa fa-th-large"></span></button></div>';
},{}],34:[function(require,module,exports){
'use strict';

var utils = require('./../../../../../services/utils.js');

module.exports = {
  className: 'pv-illust',
  template: require('./template.html'),
  data: {
    done: false,
    fail: false
  },
  computed: {
    src: function src() {
      return this.pix.illust.path;
    },
    filename: function filename() {
      var pix = this.pix;

      return utils.format(
        '%s - %s%s',
        pix.author.name,
        pix.desc.title,
        pix.illust.path.slice(pix.illust.path.lastIndexOf('.'))
      );
    }
  },
  methods: {
    load: function load() {
      this.done = true;
      this.fail = false;
    },
    error: function error() {
      var illust = this.pix.illust;

      if (/_p0\.jpg/.test(illust.path)) {
        illust.path = illust.path.replace(/jpg$/, 'png');
        return;
      } else if (/_p0\.png/.test(illust.path)) {
        illust.path = illust.path.replace(/png$/, 'gif');
        return;
      }

      this.done = false;
      this.fail = true;
    }
  },
  created: function created() {
    var scroll = new utils.Scroll({
      el: this.$el,
      easing: 'linear',
      duration: 200
    });

    this.$on('app:move', function(step) {
      this.$root.$emit('app:skip', step);
    });

    this.$on('img:download', function() {
      utils.download(this.src, this.filename);
    });

    this.$on('img:scroll', function(value) {
      scroll.by(value);
    });
  }
};

},{"./../../../../../services/utils.js":51,"./template.html":35}],35:[function(require,module,exports){
module.exports = '<img v-attr="\n    src: src,\n    data-padding: config.padding\n  " v-show="done" v-on="\n    load: load,\n    error: error,\n    click: move,\n    dragstart: grab,\n    drag: drag\n  " v-fit="config.fit"><div class="pv-msg" v-show="fail" v-on="click: move">画像が読み込めません</div>';
},{}],36:[function(require,module,exports){
'use strict';

var utils = require('./../../../../../services/utils.js'),
    http = require('./../../../../../services/http.js'),
    UgokuIllustPlayer = window.pixiv.UgokuIllustPlayer;

require('./index.less');

module.exports = {
  className: 'pv-ugoku',
  template: require('./template.html'),
  computed: {
    src: function src() {
      return this.pix.illust.ugokuIllustFullscreenData.src;
    },
    filename: function filename() {
      var pix = this.pix;

      return utils.format('%s - %s%s', pix.author.name, pix.desc.title, '.zip');
    }
  },
  methods: {
    toggle: function toggle() {
      this.$player.toggle();
      this.paused = this.$player.paused;
    },
    stop: function stop() {
      this.$player.stop();
      this.paused = this.$player.paused;
    },
    fullscreen: function fullscreen() {
      this.$player.fullscreen();
    },
    cancel: function cancel(evt) {
      evt.preventDefault();
      evt.stopPropagation();
    }
  },
  created: function created() {
    var scroll = new utils.Scroll({
      el: this.$el,
      easing: 'linear',
      duration: 200
    });

    this.$on('app:move', function(step) {
      this.$root.$emit('app:skip', step);
    });

    this.$on('img:download', function() {
      var filename = this.filename;

      getBlobUrl(this.src).then(function(url) {
        utils.download(url, filename);
        window.URL.revokeObjectURL(url);
      });
    });

    this.$on('img:scroll', function(value) {
      scroll.by(value);
    });
  },
  ready: function ready() {
    var illust = this.pix.illust,
        ugokuIllustData = illust.ugokuIllustData,
        el = this.$el.querySelector('._ugoku-illust-player-container'),
        opts = {
          autoStart: true,
          maxWidth: 1920,
          maxHeight: 1080,
          fullscreenData: illust.ugokuIllustFullscreenData,
        };

    ugokuIllustData.size = UgokuIllustPlayer.size(illust.size);
    ugokuIllustData.originalSize = illust.size;

    this.$player = new UgokuIllustPlayer(el, ugokuIllustData, opts);
    this.paused = false;
    this.canFullscreen = ugokuIllustData.size[0] !== illust.size[0];
  },
  beforeDestroy: function beforeDestroy() {
    this.$player.dispose();
    delete this.$player;
  }
};

function getBlobUrl(path) {
  return http.get(path, 'blob').then(function(blob) {
    return window.URL.createObjectURL(blob);
  });
}

},{"./../../../../../services/http.js":47,"./../../../../../services/utils.js":51,"./index.less":37,"./template.html":38}],37:[function(require,module,exports){
(function() { var head = document.getElementsByTagName('head')[0]; style = document.createElement('style'); style.type = 'text/css';var css = ".pv-ugoku-ctrl{position:absolute;bottom:4px;right:50%;padding:2px 20px;border-radius:15px;background-color:rgba(0,0,0,.4);color:#fff;transform:translate(50%)}.pv-ugoku-ctrl>.btn{margin:0 3px}";if (style.styleSheet){ style.styleSheet.cssText = css; } else { style.appendChild(document.createTextNode(css)); } head.appendChild(style);}())
},{}],38:[function(require,module,exports){
module.exports = '<div v-on="click: move" class="_ugoku-illust-player-container"><div class="wrapper"><div class="_spinner"></div><div class="player toggle"></div></div></div><div class="_full-screen-container" v-on="click:cancel"><div class="_ugoku-illust-player-container"><div class="wrapper toggle"><div class="_spinner"></div><div class="player"></div></div><div class="exit-full-screen"><img src="http://source.pixiv.net/www/images/ugoku-illust/exit-full-screen.png" width="30" height="30"></div></div></div><div class="pv-ugoku-ctrl" v-on="click:cancel"><button class="btn _ui-tooltip" data-tooltip="{{paused ? \'再生\' : \'一時停止\'}}" v-on="click:toggle"><span class="fa fa-fw" v-class="\n      fa-pause: !paused,\n      fa-play: paused\n    "></span></button><button class="btn _ui-tooltip" data-tooltip="停止" v-on="click:stop"><span class="fa fa-fw fa-stop"></span></button><button class="btn _ui-tooltip" data-tooltip="フルスクリーン表示" v-if="canFullscreen" v-on="click:fullscreen"><span class="fa fa-fw fa-expand"></span></button></div>';
},{}],39:[function(require,module,exports){
'use strict';

var utils = require('./../../../../services/utils.js'),
    debounce = utils.debounce;

function resize(el, value) {
  var parent = document.querySelector('.pv-view'),
      style = el.style,
      margin, vw, vh, ow, oh, bw, bh, by;

  margin = +el.dataset.padding;
  vw = parent.offsetWidth  - margin * 2;
  vh = parent.offsetHeight - margin * 2;
  ow = el.naturalWidth;
  oh = el.naturalHeight;
  by = 1;

  if (value) {
    bw = (vw < ow) ? vw / ow : 1;
    bh = (vh < oh) ? vh / oh : 1;
    by = (bw < bh) ? bw : bh;
    by = parseInt(by * 1000, 10) / 1000;
  }

  style.width  = ow * by + 'px';
  style.height = oh * by + 'px';
  el.parentNode.style.padding = margin + 'px';
}

module.exports = {
  bind: function() {
    var dir = this;

    function handler() {
      resize(dir.el, dir.value);
    }

    this.handler1 = handler;
    this.handler2 = debounce(handler, 200);

    this.el.addEventListener('load', this.handler1);
    window.addEventListener('resize', this.handler2);
    this.vm.$root.$watch('config.padding', this.handler2);
  },
  unbind: function() {
    this.el.removeEventListener('load', this.handler1);
    window.removeEventListener('resize', this.handler2);
    this.vm.$root.$unwatch('config.padding', this.handler2);
  },
  update: function(value) {
    resize(this.el, value);
  }
};

},{"./../../../../services/utils.js":51}],40:[function(require,module,exports){
'use strict';

require('./index.less');

module.exports = {
  className: 'pv-view',
  template: require('./template.html'),
  replace: true,
  directives: {
    fit: require('./directives/fit')
  },
  components: {
    illust: require('./components/illust'),
    comic: require('./components/comic'),
    ugoku: require('./components/ugoku')
  },
  methods: {
    move: function move(evt) {
      evt.preventDefault();
      evt.stopPropagation();
      this.$root.$emit('app:skip', evt.shiftKey ? -1 : 1);
    },
    grab: function grab(evt) {
      var parent = evt.target.parentNode;

      this.$grabPoint = {
        x: evt.clientX,
        y: evt.clientY,
        left: parent.scrollLeft,
        top: parent.scrollTop
      };
    },
    drag: function drag(evt) {
      if (!evt.clientX && !evt.clientY) {
        return;
      }
      var parent = evt.target.parentNode,
          point = this.$grabPoint;

      parent.scrollLeft = point.left - (evt.clientX - point.x);
      parent.scrollTop  = point.top  - (evt.clientY - point.y);
    }
  }
};

},{"./components/comic":31,"./components/illust":34,"./components/ugoku":36,"./directives/fit":39,"./index.less":41,"./template.html":42}],41:[function(require,module,exports){
(function() { var head = document.getElementsByTagName('head')[0]; style = document.createElement('style'); style.type = 'text/css';var css = ".pv-view{position:absolute;top:0;left:0;width:100%;height:100vh;display:flex;align-items:center;justify-content:center}.pv-comic,.pv-illust,.pv-ugoku{overflow:auto;box-sizing:border-box;flex:1;width:0;max-height:100%;padding:20px;text-align:center}.pv-comic>._ugoku-illust-player-container,.pv-comic>img,.pv-illust>._ugoku-illust-player-container,.pv-illust>img,.pv-ugoku>._ugoku-illust-player-container,.pv-ugoku>img{display:inline-block;margin:auto;box-shadow:0 0 0 5px rgba(0,0,0,.2);background:#fff;transition:width .2s,height .2s}.pv-msg{display:inline-block;width:40%;margin:auto;background-color:rgba(255,255,255,.7);box-shadow:0 0 0 5px rgba(0,0,0,.2);font-size:3em;text-align:center}";if (style.styleSheet){ style.styleSheet.cssText = css; } else { style.appendChild(document.createTextNode(css)); } head.appendChild(style);}())
},{}],42:[function(require,module,exports){
module.exports = '<div v-on="click:close"><div v-view="pix.illust.type" v-with="pix: pix"></div><div class="pv-msg" v-if="state === ERROR" v-on="click: move">読み込めません</div></div>';
},{}],43:[function(require,module,exports){
'use strict';

/* global GM_info */

var api = require('./../services/api.js'),
    keys = require('./../services/keys.js'),
    utils = require('./../services/utils.js'),
    Cache = utils.Cache,
    Vue = require('vue/dist/vue.min.js');

var page = {
  TARGET: [
    'a[href*="member_illust.php"] img[src*="/img/"]',
    'a[href*="member_event.php"] img[src*="/img/"]'
  ].join(),
  matches: (function() {
    var p = window.Element.prototype;
    return (p.matches || p.matchesSelector || p.webkitMatchesSelector || p.mozMatchesSelector);
  })(),
  init: function init() {
    document.body.addEventListener('click', function handler(evt) {
      if (evt.button) { return; }

      var target = evt.target;

      if (page.matches.call(target, '.pv-bookmark img')) { return; }
      if (target.classList.contains('_layout-thumbnail')) {
        target = target.children[0];
      }
      if (!page.matches.call(target, page.TARGET)) { return; }

      evt.stopPropagation();
      evt.preventDefault();
      app.fetch(target);
    });
  },
  getNext: function getNext(target, step) {
    var list = document.querySelectorAll(this.TARGET),
        last = list.length - 1,
        index　= [].indexOf.call(list, target) + step,
        result;

    if (index > last) {
      result = list[0];
    } else if (index < 0) {
      result = list[last];
    } else {
      result = list[index];
    }
    return result;
  },
  addScrollbar: function addScrollbar() {
    document.documentElement.classList.remove('no-scrollbar');
  },
  removeScrollbar: function addScrollbar() {
    document.documentElement.classList.add('no-scrollbar');
  },
  scroll: new utils.Scroll()
};

var STORAGE_KEY = 'ppv-config';

require('./index.less');

var app = module.exports = new Vue({
  template: require('./template.html'),
  replace: true,
  components: {
    toolbar: require('./components/toolbar'),
    panel: require('./components/panel'),
    view: require('./components/view')
  },
  data: {
    config: utils.store.get(STORAGE_KEY, {
      panel: null,
      fit: true,
      padding: 20,
      cacheSize: 10,
      version: GM_info.script.version
    }),
    state: 0,
    pix: null,
    STANDBY: 0,
    LOADING: 1,
    COMPLETE: 2,
    ERROR: 3,
    STORAGE_KEY: STORAGE_KEY
  },
  computed: {
    canShowPanel: function canShowPanel() {
      var panel = this.config.panel;
      return this.state === this.COMPLETE ||
             /^(help|configuration)$/.test(panel);
    }
  },
  methods: {
    fetch: function fetch(target) {
      this.$img = target;
      this.pix = {};
      this.state = this.LOADING;
      keys.disabled = false;

      var vm = this;
      page.scroll.to(target.y - window.innerHeight / 3, function() {
        api.get(target.src, vm.$cache).then(function(data) {
          vm.pix = data;
          vm.state = vm.COMPLETE;
          // console.log(vm);
        }).catch(function(err) {
          vm.pix = {};
          vm.state = vm.ERROR;
          console.error(err.message);
        });
      });
    },
    close: function close() {
      keys.disabled = true;
      this.state = this.STANDBY;
      this.pix = {};
      this.$img = null;
    }
  },
  created: function created() {
    page.init();
    this.$cache = new Cache(this.config.cacheSize);

    this.$on('app:move', function(step) {
      if (this.state === this.COMPLETE) {
        this.$broadcast('app:move', step);
      }
      if (this.state === this.ERROR) {
        this.$emit('app:skip', step);
      }
    });

    this.$on('app:skip', function(step) {
      if (this.state > this.LOADING) {
        this.fetch(page.getNext(this.$img, step));
      }
    });

    var loading;
    this.$on('pix:rate', function(score) {
      var vm = this;

      if (!loading) {
        loading = true;
        this.$broadcast('pix:rate:change', loading);
        api.invoke('rate', this.pix, score).then(function() {
          loading = false;
          vm.$broadcast('pix:rate:change', loading);
        });
      }
    });

    this.$on('pix:tweet', function() {
      if (this.state !== this.COMPLETE) { return; }

      var twitter = 'https://twitter.com/intent/tweet?text=%s&url=%s',
          url = 'http://www.pixiv.net/member_illust.php?mode=medium&illust_id=',
          pix = this.pix,
          page = encodeURIComponent(url + pix.illust.id),
          text = encodeURIComponent(utils.format(
            '%s | %s #pixiv',
            pix.desc.title,
            pix.author.name)
          );

      utils.popup(utils.format(twitter, text, page), 550, 460);
    });
  },
  ready: function ready() {
    this.$watch('state', function(state) {
      if (state !== this.STANDBY) {
        page.removeScrollbar();
        return;
      }
      page.addScrollbar();
    });

    this.$watch('config', function(value) {
      utils.store.set(STORAGE_KEY, value);
    });

    this.$watch('config.cacheSize', function(value) {
      this.$cache.limit = value;
    });
  }
});

keys
.add({
  name: 'Next',
  handler: function() { app.$emit('app:move', 1); },
  cmbs: [
    keys.J,
    keys.Enter
  ]
})
.add({
  name: 'Prev',
  handler: function() { app.$emit('app:move', -1); },
  cmbs: [
    keys.K,
    [keys.Enter, keys.SHIFT]
  ]
})
.add({
  name: 'Skip next',
  handler: function() { app.$emit('app:skip', 1); },
  cmbs: [
    Keys.N,
    [keys.J,     keys.CTRL],
    [keys.Enter, keys.CTRL]
  ]
})
.add({
  name: 'Skip prev',
  handler: function() { app.$emit('app:skip', -1); },
  cmbs: [
    Keys.M,
    [keys.K,     keys.CTRL],
    [keys.Enter, keys.CTRL, keys.SHIFT]
  ]
})
.add({
  name: 'Scroll down',
  handler: function() { app.$broadcast('img:scroll', 200); },
  throttle: 190,
  cmbs: [keys.Space]
})
.add({
  name: 'Scroll up',
  handler: function() { app.$broadcast('img:scroll', -200); },
  throttle: 190,
  cmbs: [
    [keys.Space, keys.SHIFT]
  ]
})
.add({
  name: 'Resize',
  handler: function() { app.$broadcast('img:resize'); },
  cmbs: [keys.F]
})
.add({
  name: 'Rate',
  handler: function() { app.$emit('pix:rate', 10); },
  cmbs: [keys.S]
})
.add({
  name: 'Download',
  handler: function() { app.$broadcast('img:download'); },
  cmbs: [keys.D]
})
.add({
  name: 'Tweet',
  handler: function() { app.$emit('pix:tweet'); },
  cmbs: [keys.T]
})
.add({
  name: 'Toggle description',
  handler: function() { app.$broadcast('panel:change', 'description'); },
  cmbs: [keys.H]
})
.add({
  name: 'Toggle bookmark',
  handler: function() { app.$broadcast('panel:change', 'bookmark'); },
  cmbs: [keys.B]
})
.add({
  name: 'Toggle comments',
  handler: function() { app.$broadcast('panel:change', 'comments'); },
  cmbs: [keys.C]
})
.add({
  name: 'Toggle help',
  handler: function() { app.$broadcast('panel:change', 'help'); },
  cmbs: [
    [keys['/'], keys.SHIFT]
  ]
})
.init();

},{"./../services/api.js":46,"./../services/keys.js":48,"./../services/utils.js":51,"./components/panel":25,"./components/toolbar":28,"./components/view":40,"./index.less":44,"./template.html":45,"vue/dist/vue.min.js":2}],44:[function(require,module,exports){
(function() { var head = document.getElementsByTagName('head')[0]; style = document.createElement('style'); style.type = 'text/css';var css = "#pv{position:fixed;top:0;left:0;right:0;bottom:0;z-index:10001;display:flex}#pv .btn{display:inline-block;box-sizing:border-box;min-height:30px;padding:0 12px;border:1px solid rgba(0,0,0,.06);border-radius:4px;background:#f5f5f5;color:#444;text-shadow:0 1px 0 #fff;font-size:14px;font-family:\"Lucida Grande\",\"Hiragino Kaku Gothic ProN\",Meiryo,sans-serif;vertical-align:middle;text-decoration:none;text-align:center}#pv .btn:focus,#pv .btn:hover{background-color:#fafafa;color:#444;outline:0;text-decoration:none;border-color:rgba(0,0,0,.16)}#pv .btn-block{display:block;width:100%}#pv .btn-danger,#pv .btn-primary,#pv .btn-success{box-shadow:inset 0 0 5px rgba(0,0,0,.05);text-shadow:0 -1px 0 rgba(0,0,0,.1)}#pv .btn-danger:focus,#pv .btn-danger:hover,#pv .btn-primary:focus,#pv .btn-primary:hover,#pv .btn-success:focus,#pv .btn-success:hover{border-color:rgba(0,0,0,.21)}#pv .btn-primary{background-color:#00a8e6;color:#fff}#pv .btn-primary:focus,#pv .btn-primary:hover{background-color:#35b3ee;color:#fff}#pv .btn-success{background-color:#8cc14c;color:#fff}#pv .btn-success:focus,#pv .btn-success:hover{background-color:#8ec73b;color:#fff}#pv .btn-danger{background-color:#da314b;color:#fff}#pv .btn-danger:focus,#pv .btn-danger:hover{background-color:#e4354f;color:#fff}.pv-main{position:relative;flex:1;background-color:rgba(255,255,255,.6)}.no-scrollbar{overflow:hidden}.no-scrollbar embed,.no-scrollbar iframe{visibility:hidden}a[href*=\"ranking.php\"] ._layout-thumbnail,a[href*=\"ranking.php\"] img[src*=\"/img/\"],a[href*=\"member_illust.php\"] ._layout-thumbnail,a[href*=\"member_illust.php\"] img[src*=\"/img/\"],a[href*=\"member_event.php\"] ._layout-thumbnail,a[href*=\"member_event.php\"] img[src*=\"/img/\"]{cursor:zoom-in}";if (style.styleSheet){ style.styleSheet.cssText = css; } else { style.appendChild(document.createTextNode(css)); } head.appendChild(style);}())
},{}],45:[function(require,module,exports){
module.exports = '<div id="pv" v-show="state"><ul v-component="toolbar" v-with="\n    panel: config.panel,\n    fit: config.fit,\n    pix: pix\n  "></ul><div class="pv-main"><div v-if="canShowPanel" v-component="panel"></div><div v-component="view"></div></div></div>';
},{}],46:[function(require,module,exports){
'use strict';

var http = require('./http'),
    scrape = require('./scrape');

var SELF_1 =  '自分の作品です',
    SELF_2 =  '自分です',
    INVALID = '不正なデータです';

function throwError(msg) {
  return Promise.reject(new Error(msg));
}

function srcToId(src) {
  var result = /^.+\/(\d+)(?:.+)?\.(?:jpe?g|png|gif)/.exec(decodeURI(src));

  return result && result[1];
}

exports.get = function get(src, cache) {
  var URL = 'http://www.pixiv.net/member_illust.php?mode=medium&illust_id=',
      id = srcToId(src), data;

  if (!id) { return throwError('id が取得できません'); }
  if (data = cache.get(id)) { return Promise.resolve(data); }

  return http.get(URL + id, 'document').then(function(resp) {
    var data = scrape(resp);
    cache.put(id, data);

    return data;
  });
};

exports.getBookmark = function getBookmark(id) {
  if (!id) { return throwError(INVALID); }

  var URL = 'http://www.pixiv.net/bookmark_add.php?type=illust&illust_id=';

  return http.get(URL + id, 'document').then(function(resp) {
    var body = resp.querySelector('.layout-body');

    return body || throwError(SELF_1);
  });
};

exports.bookmark = function bookmark(pix, form) {
  if (!pix || !pix.token) { return throwError(INVALID); }
  if (pix.self) { return throwError(SELF_1); }

  var URL = 'http://www.pixiv.net/bookmark_add.php';

  return http.post(URL, form).then(function(data) {
    if (data) {
      pix.illust.bookmark = true;
      return;
    }
    return throwError('ブックマークできませんでした');
  });
};

exports.getComments = function getComments(pix) {
  if (!pix || !pix.token) { return throwError(INVALID); }
  if (!pix.comments.more) { return throwError('これ以上のコメントはありません'); }

  var URL = 'http://www.pixiv.net/rpc_comment_history.php', data;

  data = {
    i_id: pix.illust.id,
    u_id: pix.author.id,
    tt:   pix.token,
    p:    pix.comments.p + 1
  };

  return http.post(URL, data, 'json').then(function(resp) {
    if (resp.message === 'ok') {
      pix.comments.body += resp.body.html;
      pix.comments.more = resp.body.more;
      pix.comments.p++;
      return;
    }
    return throwError('コメントを取得できませんでした');
  });
};

exports.rate = function rate(pix, score) {
  if (!pix || !pix.token) { return throwError(INVALID); }
  if (pix.self) { return throwError(SELF_1); }
  if (pix.rate.rated) { return throwError('評価済みです'); }

  var URL = 'http://www.pixiv.net/rpc_rating.php', data;

  data = {
    mode: 'save',
    i_id: pix.illust.id,
    u_id: pix.user.id,
    qr:   +pix.rate.hasQuestionnaire,
    tt: pix.token,
    score: score
  };

  return http.post(URL, data, 'json').then(function(resp) {
    if (resp.score) {
      pix.rate.rtc += 1;
      pix.rate.rtt += score;
      pix.rate.score = score;
      pix.rate.rated = true;
      return;
    }
    return throwError('評価に失敗しました');
  });
};

exports.answer = function answer(pix, stat) {
  if (!pix || !pix.token) { return throwError(INVALID); }
  if (pix.self) { return throwError(SELF_1); }
  if (pix.rate.answered) { return throwError('回答済みです'); }

  var URL = 'http://www.pixiv.net/rpc_rating.php', data;

  data = {
    mode: 'save2',
    i_id: pix.illust.id,
    u_id: pix.user.id,
    qr:   +pix.rate.hasQuestionnaire,
    tt: pix.token,
    num:  stat.id
  };

  return http.post(URL, data, 'json').then(function(resp) {
    if ('keyword' in resp) {
      pix.rate.answered = true;
      stat.active = true;
      stat.count += 1;
      return;
    }
    return throwError('アンケートの回答に失敗しました');
  });
};

exports.follow = function follow(pix, restrict) {
  if (!pix || !pix.token) { return throwError(INVALID); }
  if (pix.self) { return throwError(SELF_2); }
  if (pix.author.favorite) { return throwError('フォロー済みです'); }

  var URL = 'http://www.pixiv.net/bookmark_add.php', data;

  data = {
    mode: 'add',
    type: 'user',
    user_id: pix.author.id,
    tt: pix.token,
    from_sid: '',
    restrict: restrict,
    left_column: 'OK'
  };

  return http.post(URL, data).then(function() {
    pix.author.favorite = true;
  });
};

exports.refollow = function refollow(pix, restrict) {
  if (!pix || !pix.token) { return throwError(INVALID); }
  if (pix.self) { return throwError(SELF_2); }
  if (!pix.author.favorite) { return throwError('フォローしていません'); }

  var URL = 'http://www.pixiv.net/bookmark_setting.php', data;

  data = {
    type: 'user',
    user_id: pix.author.id,
    tt: pix.token,
    from_sid: '',
    restrict: restrict,
    left_column: 'OK'
  };

  return http.post(URL, data).then(function() {
    pix.author.favorite = true;
  });
};

exports.unfollow = function unfollow(pix) {
  if (!pix || !pix.token) { return throwError(INVALID); }
  if (pix.self) { return throwError(SELF_2); }
  if (!pix.author.favorite) { return throwError('フォローしていません'); }

  var URL = 'http://www.pixiv.net/rpc_group_setting.php', data;

  data = {
    mode: 'del',
    type: 'bookuser',
    id: pix.author.id
  };

  return http.post(URL, data, 'json').then(function(resp) {
    if (resp.type === 'bookuser') {
      pix.author.favorite = true;
      return;
    }
    return throwError('フォロー解除に失敗しました');
  });
};

// always return a resolved promise.
exports.invoke = function invoke(method) {
  var args = [].slice.call(arguments, 1);

  return exports[method].apply(exports, args).catch(function(err) {
    console.error(err.message);
  });
};

},{"./http":47,"./scrape":50}],47:[function(require,module,exports){
'use strict';

var utils = require('./utils.js'),
    forEach = utils.forEach;

module.exports = http;

function http(opts) {
  return new Promise(function(resolve, reject) {
    var req = new XMLHttpRequest();

    req.open(opts.method, opts.url, true);

    if (opts.responseType) {
      req.responseType = opts.responseType;
    }

    req.onload = function() {
      if (req.status == 200) {
        resolve(req.response);
      } else {
        reject(new Error(req.statusText));
      }
    };

    req.onerror = function() {
      reject(new Error(req.statusText));
    };

    // setTimeout(function() {
    //   req.send(opts.data);
    // }, 500);

    req.send(opts.data);
  });
}

http.get = function get(url, type) {
  return http({
    method: 'GET',
    url: url,
    responseType: type
  });
};

function data2form(obj) {
  if (obj instanceof HTMLFormElement) {
    return new FormData(obj);
  }

  var result = new FormData();

  forEach(obj, function(value, key) {
    result.append(key, value);
  });
  return result;
}

http.post = function post(url, data, type) {
  return http({
    method: 'POST',
    url: url,
    data: data2form(data),
    responseType: type
  });
};

},{"./utils.js":51}],48:[function(require,module,exports){
'use strict';

var utils = require('./utils.js');

var map = {
  'A': 65,
  'B': 66,
  'C': 67,
  'D': 68,
  'E': 69,
  'F': 70,
  'G': 71,
  'H': 72,
  'I': 73,
  'J': 74,
  'K': 75,
  'L': 76,
  'M': 77,
  'N': 78,
  'O': 79,
  'P': 80,
  'Q': 81,
  'R': 82,
  'S': 83,
  'T': 84,
  'U': 85,
  'V': 86,
  'W': 87,
  'X': 88,
  'Y': 89,
  'Z': 90,
  'Enter': 13,
  'SHIFT': 16,
  'CTRL':  17,
  'ALT':   18,
  'Space': 32,
  '/':    191
};

map = utils.map(map, function(code, name) {
  return new Key(name, code);
});


/**
 * @param {String} name The key name.
 * @param {Number} code The key code.
 */
function Key(name, code) {
  this.name = name;
  this.code = code;
  map[name] = exports[name] = this;
}

/**
 * @param {Number} code The keyCode.
 * @returns {Key|null} The Key instance with matched to received code.
 */
Key.fromCode = function fromCode(code) {
  var name;

  for (name in map) {
    if (map[name].code === code) {
      return map[name];
    }
  }
  return null;
};

exports.Key = Key;

/**
 * @param {Key}         primary   The primary key.
 * @param {Array.<Key>} modifiers The modifier keys.
 */
function Cmb(primary, modifiers) {
  this.primary = primary;

  if (arguments.length === 2) {
    this.ctrl  = utils.contains(modifiers, exports.CTRL);
    this.alt   = utils.contains(modifiers, exports.ALT);
    this.shift = utils.contains(modifiers, exports.SHIFT);
  } else {
    this.ctrl  = false;
    this.alt   = false;
    this.shift = false;
  }
}

Cmb.prototype.equal = function equal(cmb) {
  return this.toString() === cmb.toString();
};

Cmb.prototype.toString = function() {
  return JSON.stringify(this);
};

Cmb.prototype.toText = function() {
  var name = this.primary.name,
      shift = this.shift;

  if (name === '/' && shift) {
    name = '?';
    shift = false;
  }

  return {
    key: name,
    modifiers: {
      Shift: shift,
      Ctrl:  this.ctrl,
      Alt:   this.alt
    }
  };
};

/**
 * @param {Array.<Key>} arr
 * @returns {Cmb} The new Cmb of the created from arguments.
 */
Cmb.fromKeys = function fromKeys(arr) {
  var primary = arr[0],
      modifiers = arr.slice(1);

  if (!Array.isArray(modifiers)) {
    modifiers = [modifiers];
  }

  return new Cmb(primary, modifiers);
};

/**
 * @param {KeyboardEvent} evt
 * @returns {Cmb} The new Cmb.
 */
Cmb.fromEvent = function fromEvent(evt) {
  var primary = Key.fromCode(evt.keyCode), modifiers = [];

  if (!primary) { return null; }
  if (evt.ctrlKey)  { modifiers.push(exports.CTRL);  }
  if (evt.altKey)   { modifiers.push(exports.ALT);   }
  if (evt.shiftKey) { modifiers.push(exports.SHIFT); }

  return modifiers.length ? new Cmb(primary, modifiers) : new Cmb(primary);
};

exports.Cmb = Cmb;

var keyMap = exports.keyMap = {
  up: [],
  down: []
};

/**
 * @example
 * var keys = require('keys');
 *
 * keys.add({
 *   name: 'next',
 *   handler: function(evt) {console.log(evt);},
 *   cmbs: [keys.Enter, keys.J]
 * });
 *
 * keys.add({
 *   name: 'prev',
 *   handler: function(evt) {console.log(evt);},
 *   cmbs: [
 *     [keys.Enter, keys.CTRL, keys.SHIFT],
 *     [keys.K,     keys.CTRL]
 *   ]
 * });
 */
exports.add = function add(entry) {
  entry.cmbs = entry.cmbs.map(function(keys) {
    if (Array.isArray(keys)) {
      return Cmb.fromKeys(keys);
    }
    return Cmb.fromKeys([keys]);
  });

  entry.handler = utils.throttle(entry.handler, entry.throttle || 33);

  if (entry.keyup) {
    keyMap.up.push(entry);
  } else {
    keyMap.down.push(entry);
  }
  return this;
};

exports.getMap = function getMap() {
  var all = keyMap.down.concat(keyMap.up);

  all = all.map(function(entry) {
    return {
      name: entry.name,
      keyup: entry.keyup,
      keys: entry.cmbs.map(function(cmb) {
        return cmb.toText();
      })
    };
  });

  return all;
};

var ignored = ['INPUT', 'TEXTAREA', 'SELECT'];

function handler(evt) {
  if (exports.disabled || utils.contains(ignored, evt.target.nodeName)) { return; }

  var cmb = Cmb.fromEvent(evt);

  if (!cmb) { return; }

  var map = evt.type === 'keyup' ? keyMap.up : keyMap.down,
      entry = find(map, cmb);

  if (entry) {
    evt.stopPropagation();
    evt.preventDefault();
    entry.handler.call(this, evt);
  }
}

function find(map, cmb) {
  var i = 0, l = map.length, opts,
      k, n;

  for (; i < l; i++) {
    opts = map[i];

    for (k = 0, n = opts.cmbs.length; k < n; k++) {
      if (cmb.equal(opts.cmbs[k])) {
        return opts;
      }
    }
  }
  return null;
}

exports.init = function init(enabled) {
  document.addEventListener('keydown', handler);
  document.addEventListener('keyup', handler);
  this.disabled = !enabled;
};

},{"./utils.js":51}],49:[function(require,module,exports){
'use strict';

var utils = require('./../utils.js'),
    forEach = utils.forEach,
    jsonParse = utils.jsonParse,
    Vue = require('vue/dist/vue.min.js'),
    set = Vue.require('utils').set;

module.exports = Dq;

function extractData(arr) {
  var lines = [];

  forEach(arr, function extractPix(el) {
    var text = el.textContent.replace(/\s+/g, '');

    if (text.indexOf('pixiv.development') === 0) {
      lines.push(text);
    }
    if (text.indexOf('pixiv.user') === 0) {
      lines.push(text);
    }
    if (text.indexOf('pixiv.context') === 0) {
      lines.push(text);
    }
  });

  return lines.join('');
}

function Dq(doc) {
  this.$  = doc.querySelector.bind(doc);
  this.$$ = doc.querySelectorAll.bind(doc);
  this.parse();
}

var docProto = Dq.prototype;

docProto.parse = function parse() {
  var source = extractData(this.$$('script:not([type]):not([src])'));

  var lines = source.split(';');

  lines.forEach(function(str) {
    var splited = str.split('=');

    if (splited[0]) {
      set(this, splited[0], jsonParse(splited[1]));
    }
  }, this);
};

docProto.has = function has(selector) {
  return !!this.$(selector);
};

docProto.get = function get(selector, property) {
  var node = this.$(selector);

  return node ? node[property] : '';
};

docProto.text = function text(selector) {
  return this.get(selector, 'textContent');
};

docProto.html = function innerHTML(selector) {
  return this.get(selector, 'innerHTML');
};

docProto.outerHTML = function outerHTML(selector) {
  return this.get(selector, 'outerHTML');
};

},{"./../utils.js":51,"vue/dist/vue.min.js":2}],50:[function(require,module,exports){
'use strict';

var utils = require('./../utils.js'),
    map = utils.map,
    Dq = require('./dq');

module.exports = scrape;

var SCORE  = /^あなたの評価 (\d+)点.*$/,
    ANSWER = /^.+「(.+)」.+$/,
    PAGE   = /複数枚投稿 (\d+)P/,
    NEW_URL_PATTERN = /\/c\/600x600\/img-master/;

var parser = {
  illust: function illust(src, id) {
    if (NEW_URL_PATTERN.test(src)) {
      // new
      // in:   http://{server}.pixiv.net/c/600x600/img-master/img/{YYYY}/{MM}/{DD}/{HH}/{mm}/{SS}/{id}_p0_master1200.jpg
      // path: http://{server}.pixiv.net/img-original/img/{YYYY}/{MM}/{DD}/{HH}/{mm}/{SS}/{id}_p0.jpg
      return {
        path: src
          .replace('/c/600x600/img-master', '/img-original')
          .replace('_master1200.jpg', '.jpg')
      };
    } else {
      // old
      // in:   http://{server}.pixiv.net/{unique}/img/{name}/{id}_m.jpg
      // path: http://{server}.pixiv.net/{unique}/img/{name}/{id}.jpg
      return {
        path: src.replace(id + '_m', id)
      };
    }
  },
  comic: function comic(src, id) {
    var label;

    if (NEW_URL_PATTERN.test(src)) {
      // new
      // in:     http://{server}.pixiv.net/c/600x600/img-master/img/{YYYY}/{MM}/{DD}/{HH}/{mm}/{SS}/{id}_p0_master1200.jpg
      // path:   http://{server}.pixiv.net/img-original/img/{YYYY}/{MM}/{DD}/{HH}/{mm}/{SS}/{id}_p{n}.jpg
      // thumbs: http://{server}.pixiv.net/c/128x128/img-master/img/{YYYY}/{MM}/{DD}/{HH}/{mm}/{SS}/{id}_p{n}_square1200.jpg
      return {
        path: src
          .replace('c/600x600/img-master', 'img-original')
          .replace(/_p\d+_/, '_p{n}_')
          .replace('_master1200', ''),
        thumbs: src
          .replace('600x600', '128x128')
          .replace(/_p\d+_/, '_p{n}_')
          .replace('master1200', 'square1200')
      };
    } else {
      // old
      // in:     http://{server}.pixiv.net/{unique}/img/{name}/{id}_m.jpg
      // path:   http://{server}.pixiv.net/{unique}/img/{name}/{id}_p{n}.jpg
      // path:   http://{server}.pixiv.net/{unique}/img/{name}/{id}_big_p{n}.jpg
      // thumbs: http://{server}.pixiv.net/{unique}/img/{name}/mobile/{id}_128x128_p{n}.jpg
      label = (id < 11319936) ? '_p{n}' : '_big_p{n}';

      return {
        path: src
          .replace(id + '_m', id + label),
        thumbs: src
          .replace(id, 'mobile/' + id)
          .replace(id + '_m', id + '_128x128_p{n}')
          .replace(/\.(?:png|gif)/, '.jpg')
      };
    }
  }
};

function createIllust(doc, ctx) {
  var obj = {},
      page = PAGE.exec(doc.text('.meta')),
      url;

  obj.bookmark = doc.has('.bookmark-container>.button-on');
  obj.id = ctx.illustId;
  obj.size = ctx.illustSize;
  obj.length = page ? +page[1] : 0;
  obj.type = ctx.ugokuIllustFullscreenData ? 'ugoku' :
             !!page ? 'comic' : 'illust';

  if (obj.type === 'ugoku') {
    obj.ugokuIllustData = ctx.ugokuIllustData;
    obj.ugokuIllustFullscreenData = ctx.ugokuIllustFullscreenData;
  }
  if (obj.type === 'comic') {
    url = parser.comic(doc.get('.works_display img', 'src'), obj.id);
    obj.path   = url.path;
    obj.thumbs = url.thumbs;
  }
  if (obj.type === 'illust') {
    url = parser.illust(doc.get('.works_display img', 'src'), obj.id);
    obj.path = url.path;
  }

  return obj;
}

function getStats(answer, doc) {
  var ths = doc.$$('.questionnaire>.stats>table>tbody>tr>th');

  return map(ths, function el2stat(th, index) {
    var span = th.nextSibling.firstChild;
    var name = th.textContent;

    return {
      id: index + 1,
      name: name,
      count: +span.textContent,
      active: answer === name
    };
  });
}

function createRate(doc, ctx) {
  var rate = {};

  rate.rtv = +doc.text('.view-count');  // 閲覧数
  rate.rtc = +doc.text('.rated-count'); // 評価回数
  rate.rtt = +doc.text('.score-count'); // 総合点

  rate.rated = ctx.rated;
  rate.score = rate.rated ? +doc.text('.result').replace(SCORE, '$1') : 0;
  rate.hasQuestionnaire = ctx.hasQuestionnaire;

  if (rate.hasQuestionnaire) {
    var answer = doc.text('.questionnaire>.toggle-stats').replace(ANSWER, '$1');

    rate.hasQuestionnaire = true;
    rate.question = doc.text('.questionnaire>.stats>h1'); // 質問
    rate.answered = !!answer;                             // 回答済みかどうか
    rate.stats    = getStats(answer, doc);                // 統計値
  } else {
    rate.hasQuestionnaire = false;
    rate.question = '';    // 質問
    rate.answered = false; // 回答済みかどうか
    rate.stats    = [];    // 統計値
  }

  return rate;
}

function scrape(resp) {
  var doc = new Dq(resp),
      context = doc.pixiv.context;

  return {
    self: context.self,
    token: context.token,
    illust: createIllust(doc, context),
    rate: createRate(doc, context),
    author: {
      id: context.userId,
      name: context.userName,
      favorite: context.favorite
    },
    desc: {
      title: context.illustTitle,
      meta: doc.outerHTML('.meta'),             // 投稿日|サイズ|ツール
      caption: doc.html('.work-info .caption'), // 概要
      tags: doc.html('.tags-container')         // タグリスト
    },
    comments: {
      body: doc.$('._comment-items').innerHTML,
      more: doc.has('.more-comment'),
      p: 1
    },
    user: doc.pixiv.user
  };
}

},{"./../utils.js":51,"./dq":49}],51:[function(require,module,exports){
'use strict';

var slice = [].slice,
    arrryEach = [].forEach;

exports.log = console.log.bind(console);

function forEach(obj, iterator, ctx) {
  if (!obj) { return; }

  if ('length' in obj) {
    arrryEach.call(obj, iterator, ctx);
    return;
  }

  Object.keys(obj).forEach(function(key) {
    iterator.call(ctx, obj[key], key, obj);
  });
}

exports.forEach = forEach;

exports.map = function map(obj, iterator, ctx) {
  if ('length' in obj) {
    return [].map.call(obj, iterator, ctx);
  }

  var newObj = {};
  forEach(obj, function(value, key, org) {
    newObj[key] = iterator.call(ctx, value, key, org);
  });

  return newObj;
};

exports.find = function find(obj, iterator, ctx) {
  var index = -1;

  if ('length' in obj) {
    index = -1;
    while (++index < obj.length) {
      if (iterator.call(ctx, obj[index], index, obj)) {
        return obj[index];
      }
    }
  } else {
    for (index in obj) {
      if (iterator.call(ctx, obj[index], index, obj)) {
        return obj[index];
      }
    }
  }
  return undefined;
};

exports.contains = function contains(obj, value) {
  if ('length' in obj) {
    return [].indexOf.call(obj, value) > -1;
  }

  var key;
  for (key in obj) {
    if (obj[key] === value) {
      return true;
    }
  }
  return false;
};

function extend(dst) {
  var args = slice.call(arguments, 1);

  forEach(args, function(src) {
    forEach(src, function(value, key) {
      dst[key] = value;
    });
  });
  return dst;
}

exports.extend  = extend;

exports.jsonParse = function jsonParse(src) {
  var data;

  src = src.replace(/'/g, '"');
  try {
    data = JSON.parse(src);
  } catch(err) {
    data = err;
  }

  return data;
};

exports.throttle = function throttle(func, wait, ctx) {
  var isThrottled = false,
      duration = wait || 24;

  function reset() { isThrottled = false; }

  return function() {
    if (isThrottled) { return; }
    isThrottled = true;
    setTimeout(reset, duration);
    func.apply(ctx || this, arguments);
  };
};

exports.debounce = function debounce(func, wait, ctx) {
  var timeout;

  return function() {
    var args = arguments;

    clearTimeout(timeout);
    timeout = setTimeout(function() {
      timeout = null;
      func.apply(ctx, args);
    }, wait || 200);
  };
};

function format(str) {
  var args = slice.call(arguments, 1);

  return str.replace(/%s/g, function () {
    return args.shift();
  });
}

exports.format = format;

exports.download = function download(url, name) {
  var dummy;

  dummy = document.createElement('a');
  dummy.download = name;
  dummy.href = url;
  dummy.dispatchEvent(new Event('click'));
};

exports.ensureReady = function ensureReady(vm, cb, ctx) {
  if (!vm.$compiler.init) { return cb.call(ctx); }

  vm.$once('hook:ready', function() {
    cb.call(ctx);
  });
};

exports.ensureAttached = function ensureAttached(vm, cb, ctx) {
  if (!vm.$compiler.init) { return cb.call(ctx); }

  vm.$once('hook:attached', function() {
    cb.call(ctx);
  });
};

exports.popup = function popup(url, width, height) {
  width = width || 550;
  height = height || 450;

  var tmpl = 'left=%s,top=%s,width=%s,height=%s,personalbar=0,toolbar=0,scrollbars=0,resizable=1',
      center = {x: screen.width / 2, y: screen.height / 2},
      left = Math.round(center.x - width / 2),
      top  = Math.round(center.y - height / 2) - 40;

  top = top < 0 ? 0 : top;

  return window.open(url, '', format(tmpl, left, top, width, height));
};

exports.store  = require('./utils/store');
exports.store.set = exports.debounce(exports.store.set);
exports.Scroll = require('./utils/scroll');
exports.Cache  = require('./utils/cache');

},{"./utils/cache":52,"./utils/scroll":53,"./utils/store":54}],52:[function(require,module,exports){
'use strict';

module.exports = Cache;

function Cache(limit) {
  this.limit = limit || 10;
  this.size = 0;
  this.data = {};
  this.hash = {};
}

var CacheProto = Cache.prototype;

CacheProto.put = function put(key, value) {
  var entry = this.hash[key] || {key: key};

  this.hash[key] = entry;
  this._refresh(entry);
  if (!(key in this.data)){ this.size++; }
  this.data[key] = value;

  while (this.size > this.limit) {
    this._remove(this.staleEnd.key);
  }

  return value;
};

CacheProto.get = function get(key) {
  var entry = this.hash[key];

  if (!entry) { return; }

  this._refresh(entry);
  return this.data[key];
};

CacheProto._remove = function remove(key) {
  var entry = this.hash[key];

  if (!entry) { return; }
  if (entry == this.freshEnd) { this.freshEnd = entry.older; }
  if (entry == this.staleEnd) { this.staleEnd = entry.newer; }
  this._link(entry.newer, entry.older);

  delete this.hash[key];
  delete this.data[key];
  this.size--;
};

CacheProto._refresh = function refresh(entry) {
  if (entry !== this.freshEnd) {
    if (!this.staleEnd) {
      this.staleEnd = entry;
    } else if (this.staleEnd === entry) {
      this.staleEnd = entry.newer;
    }

    this._link(entry.newer, entry.older);
    this._link(entry, this.freshEnd);
    this.freshEnd = entry;
    this.freshEnd.newer = null;
  }
};

CacheProto._link = function link(newer, older) {
  if (newer !== older) {
    if (newer) { newer.older = older; }
    if (older) { older.newer = newer; }
  }
};

},{}],53:[function(require,module,exports){
'use strict';

var raf = window.requestAnimationFrame,
    caf = window.cancelAnimationFrame,
    performance = window.performance;

module.exports = Scroll;

function Scroll(opts) {
  var key;

  for (key in Scroll.defaults) {
    this[key] = Scroll.defaults[key];
  }

  opts = opts || {};
  for (key in opts) {
    this[key] = opts[key];
  }
}

Scroll.prototype.to = function to(end, done) {
  caf(this.afId);

  var that = this;
  var el = this.el,
      easing = Scroll.ease[this.easing],
      duration = this.duration,
      begin = performance.now(),
      start = el.scrollTop,
      distance = end - start;

  that.afId = raf(loop);

  done = (typeof done === 'function') ? done : function() {};

  function loop(now) {
    var elapsed = now - begin;

    el.scrollTop = easing(elapsed, start, distance, duration);
    if (duration < elapsed || el.scrollTop === end) {
      el.scrollTop = end;
      caf(that.afId);
      done();
      return;
    }
    that.afId = raf(loop);
  }
};

Scroll.prototype.by = function by(distance, done) {
  this.to(this.el.scrollTop + distance, done);
};

Scroll.defaults = {
  el: document.body,
  duration: 300,
  easing: 'easeOutQuint'
};

Scroll.ease = {
  linear: function linear(t, b, c, d) {
    return c * t / d + b;
  },
  easeOutQuint: function easeOutQuint(t, b, c, d) {
    return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
  }
};

},{}],54:[function(require,module,exports){
'use strict';

module.exports = {
  get: function get(key, defaults) {
    var src = localStorage.getItem(key),
        data;

    if (src) {
      try {
        data = JSON.parse(src);
        if (data.version !== defaults.version) {
          data = exports.map(defaults, function(value, key) {
            return (key in data) ? data[key] : value;
          });
        }
        data.version = defaults.version;
        return data;
      } catch(err) {
        data = defaults;
      }
      return data;
    }
    return defaults;
  },
  set: function set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

},{}]},{},[1]);
