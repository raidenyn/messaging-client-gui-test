!function(e,t){if("object"==typeof exports&&"object"==typeof module)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else{var n=t();for(var r in n)("object"==typeof exports?exports:e)[r]=n[r]}}(this,function(){return function(e){function t(r){if(n[r])return n[r].exports;var i=n[r]={i:r,l:!1,exports:{}};return e[r].call(i.exports,i,i.exports,t),i.l=!0,i.exports}var n={};return t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:r})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=77)}([,,,,,,,,function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}();Object.defineProperty(t,"__esModule",{value:!0});var o=function(){function e(){r(this,e),this._listeners=new Array}return i(e,[{key:"subscribe",value:function(e){return"function"==typeof e&&this.subscribed(e)<0&&this._listeners.push(e),this}},{key:"unsubscribe",value:function(e){for(var t=this.subscribed(e);t>=0;)this._listeners.splice(t,1),t=this.subscribed(e);return this}},{key:"emit",value:function(e){for(var t=this._listeners.length,n=0;n<t;n++)try{this._listeners[n](e)}catch(e){}}},{key:"map",value:function(e){return this.subscribe(function(t){e.emit(t)}),e}},{key:"subscribed",value:function(e){return this._listeners.indexOf(e)}}]),e}();t.EventEmitter=o},function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}();Object.defineProperty(t,"__esModule",{value:!0});var o=function(){function e(){r(this,e)}return i(e,null,[{key:"extend",value:function(t){t||(t={});for(var n=arguments.length,r=Array(n>1?n-1:0),i=1;i<n;i++)r[i-1]=arguments[i];return e.traversal(function(e,n){void 0===t[e]&&(t[e]=n)},t,r),t}},{key:"override",value:function(t){t||(t={});for(var n=arguments.length,r=Array(n>1?n-1:0),i=1;i<n;i++)r[i-1]=arguments[i];return e.traversal(function(e,n){t[e]=n},t,r),t}},{key:"safeClone",value:function(t){var n={};return e.traversal(function(e,t){"function"!=typeof t&&(n[e]=t)},n,[t]),n}},{key:"groupBy",value:function(e,t){return e.reduce(function(e,n){var r=t(n),i=e.get(r);return i||e.set(r,i=[]),i.push(n),e},new Map)}},{key:"traversal",value:function(e,t,n){for(var r in n)if(n.hasOwnProperty(r)){var i=n[r];if(!i)continue;for(var o in i)i.hasOwnProperty(o)&&e(o,i[o])}}}]),e}();t.Utils=o},,,,,function(e,t,n){"use strict";function r(e){for(var n in e)t.hasOwnProperty(n)||(t[n]=e[n])}Object.defineProperty(t,"__esModule",{value:!0}),r(n(79)),r(n(8)),r(n(30)),r(n(31)),r(n(15)),r(n(9))},function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}();Object.defineProperty(t,"__esModule",{value:!0});var o=function(){function e(){r(this,e)}return i(e,[{key:"now",value:function(){return+new Date}}]),e}();t.TimeStampProvider=o},,,,,,,function(e,t,n){"use strict";function r(e){for(var n in e)t.hasOwnProperty(n)||(t[n]=e[n])}Object.defineProperty(t,"__esModule",{value:!0}),r(n(32)),r(n(33)),r(n(34)),r(n(35))},function(e,t,n){"use strict";(function(e){function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var r=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}();Object.defineProperty(t,"__esModule",{value:!0});var i=function(){function t(){n(this,t)}return r(t,null,[{key:"current",value:function(){var t="undefined"!=typeof window?window:"undefined"!=typeof self?self:void 0!==e?e:null;if(!t)throw new Error("Unsupported environment.");return t}}]),t}();t.GlobalProvider=i}).call(t,n(36))},,,,,,,function(e,t,n){"use strict";function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var u=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}();Object.defineProperty(t,"__esModule",{value:!0});var a=function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:s.create();o(this,e),this.random=t,this._byteToHex=[];for(var n=this._byteToHex,r=0;r<256;++r)n[r]=(r+256).toString(16).substr(1)}return u(e,[{key:"next",value:function(){var e=this.random.next();return e[6]=15&e[6]|64,e[8]=63&e[8]|128,this.bytesToUuid(e)}},{key:"bytesToUuid",value:function(e){var t=0,n=this._byteToHex;return n[e[t++]]+n[e[t++]]+n[e[t++]]+n[e[t++]]+n[e[t++]]+n[e[t++]]+n[e[t++]]+n[e[t++]]+n[e[t++]]+n[e[t++]]+n[e[t++]]+n[e[t++]]+n[e[t++]]+n[e[t++]]+n[e[t++]]+n[e[t++]]}}]),e}();t.GuidProvider=a;var s=function(){function e(){o(this,e)}return u(e,null,[{key:"create",value:function(){return"undefined"!=typeof crypto&&crypto.getRandomValues?new c:new f}}]),e}();t.Random=s;var c=function(e){function t(){return o(this,t),r(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return i(t,e),u(t,[{key:"next",value:function(){var e=new Uint8Array(16);return crypto.getRandomValues(e),e}}]),t}(s);t.CryptoRandom=c;var f=function(e){function t(){o(this,t);var e=r(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments));return e._rnds=new Array(16),e}return i(t,e),u(t,[{key:"next",value:function(){for(var e=0,t=0;e<16;e++)0==(3&e)&&(t=4294967296*Math.random()),this._rnds[e]=t>>>((3&e)<<3)&255;return this._rnds}}]),t}(s);t.SimpleRandom=f},function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}();Object.defineProperty(t,"__esModule",{value:!0});var o=function(){function e(t){var n=this;r(this,e),this._func=t,this._executed=!1,this.execute=function(){return n._executed?n._result:(n._result=n._func.apply(n,arguments),n._executed=!0,n._result)},this.executeOnce=this.execute}return i(e,[{key:"executed",get:function(){return this._executed}}]),e}();t.Singleton=o},function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}();Object.defineProperty(t,"__esModule",{value:!0});var o=function(){function e(t){r(this,e),this._options=t,this.prefix="[worker]: "}return i(e,[{key:"fatal",value:function(e,t){this._options.mute||console.error(this.prefix+e,t)}},{key:"error",value:function(e,t){this._options.mute||console.error(this.prefix+e,t)}},{key:"log",value:function(e){this._options.mute||console.log(this.prefix+e)}}]),e}();t.ConsoleLogger=o},function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}();Object.defineProperty(t,"__esModule",{value:!0});var o=n(8),u=function(){function e(){r(this,e),this.onlog=new o.EventEmitter}return i(e,[{key:"fatal",value:function(e,t){this.onlog.emit({level:"fatal",message:e,error:t})}},{key:"error",value:function(e,t){this.onlog.emit({level:"error",message:e,error:t})}},{key:"log",value:function(e){this.onlog.emit({level:"log",message:e})}}]),e}();t.EventLogger=u},function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}();Object.defineProperty(t,"__esModule",{value:!0});var o=function(){function e(t){r(this,e),this._sender=t,this.prefix=""}return i(e,[{key:"fatal",value:function(e,t){this._sender.postMessage({type:"log",log:{level:"fatal",message:this.prefix+e,error:t}})}},{key:"error",value:function(e,t){this._sender.postMessage({type:"log",log:{level:"error",message:this.prefix+e,error:t}})}},{key:"log",value:function(e){this._sender.postMessage({type:"log",log:{level:"log",message:this.prefix+e}})}}]),e}();t.WorkerLogger=o},function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}();Object.defineProperty(t,"__esModule",{value:!0});var o=function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];r(this,e),this.loggers=t}return i(e,[{key:"fatal",value:function(e,t){this.logger(function(n){return n.fatal(e,t)})}},{key:"error",value:function(e,t){this.logger(function(n){return n.error(e,t)})}},{key:"log",value:function(e){this.logger(function(t){return t.log(e)})}},{key:"replace",value:function(e){this.loggers.length=0;for(var t in e)e.hasOwnProperty(t)&&this.loggers.push(e[t])}},{key:"logger",value:function(e){var t=this.loggers;for(var n in t)t.hasOwnProperty(n)&&e(t[n])}}]),e}();t.UniversalLogger=o},function(e,t){var n;n=function(){return this}();try{n=n||Function("return this")()||(0,eval)("this")}catch(e){"object"==typeof window&&(n=window)}e.exports=n},function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}();Object.defineProperty(t,"__esModule",{value:!0});var o=n(38);t.PseudoWorkerScopeName="MessagingClient-PseudoWorker";var u=function(){function e(n){var i=this,u=arguments.length>1&&void 0!==arguments[1]?arguments[1]:new o.ScriptLoader;r(this,e),this._scriptLoader=u,this._listeners=[],this._buffer=[],this._unloaded=!1,this._global=window,this._pseudoWorker=this._global[t.PseudoWorkerScopeName]=new a(n,u,this,{riseEvent:function(e){return i.riseEvent(e)}}),u.loadScript(n)}return i(e,[{key:"postMessage",value:function(e){var t=this;e=JSON.parse(JSON.stringify(e)),setTimeout(function(){t._pseudoWorker.riseEvent({data:e})},0)}},{key:"addEventListener",value:function(e,t){var n=this;"message"===e&&(this._listeners.push(t),setTimeout(function(){if(n._buffer.length>0){var e=n._buffer.slice();for(var t in e)n._buffer.hasOwnProperty(t)&&n.riseEvent(n._buffer[t]);n._buffer.length=0}},10))}},{key:"removeEventListener",value:function(e,t){var n=this._listeners.indexOf(t);n>-1&&this._listeners.splice(n,1)}},{key:"riseEvent",value:function(e){if(this._listeners.length>0){for(var t in this._listeners)if(this._listeners.hasOwnProperty(t)){var n=this._listeners[t];n(e)}}else this._buffer.push(e)}},{key:"pseudoWorker",get:function(){return this._pseudoWorker}}]),e}();t.PseudoWorker=u;var a=function(){function e(t,n,i,o){r(this,e),this._scriptLoader=n,this._worker=i,this._internal=o,this._listeners=[],this._buffer=[],this.location=t}return i(e,[{key:"postMessage",value:function(e){var t=this;e=JSON.parse(JSON.stringify(e)),setTimeout(function(){t._internal.riseEvent({data:e})},10)}},{key:"importScripts",value:function(){for(var e=void 0,t=void 0,n=arguments.length,r=Array(n),i=0;i<n;i++)r[i]=arguments[i];var o=r.length;for(var u in r)if(r.hasOwnProperty(u)){var a=r[u],s=function(){--o<=0&&(t=!0,e&&e())};this._scriptLoader.loadScript(a,s)}return{then:function(n){if(t)return void n();e=n}}}},{key:"addEventListener",value:function(e,t){var n=this;"message"===e&&(this._listeners.push(t),setTimeout(function(){if(n._buffer.length){var e=n._buffer.slice();for(var t in e)e.hasOwnProperty(t)&&n.riseEvent(e[t]);n._buffer.length=0}},10))}},{key:"removeEventListener",value:function(e,t){var n=this._listeners.indexOf(t);n>-1&&this._listeners.splice(n,1)}},{key:"riseEvent",value:function(e){if(this._listeners.length){for(var t in this._listeners)if(this._listeners.hasOwnProperty(t)){var n=this._listeners[t];n(e)}}else this._buffer.push(e)}}]),e}()},function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}();Object.defineProperty(t,"__esModule",{value:!0});var o=n(23),u=function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:o.GlobalProvider.current();if(r(this,e),this._global=t,t instanceof Window&&t.document)return void(this.loadScript=function(n,r){return e.loadViaDom(t.document,n,r)});throw new Error("No DOM environment is not supported.")}return i(e,null,[{key:"loadViaDom",value:function(e,t,n){var r=e.createElement("script");r.type="text/javascript",r.src=t,n&&(r.onload=n),(e.body||e.head).appendChild(r)}}]),e}();t.ScriptLoader=u},,,,,,,,,,,,,,,,,function(e,t,n){"use strict";function r(e){for(var n in e)t.hasOwnProperty(n)||(t[n]=e[n])}Object.defineProperty(t,"__esModule",{value:!0}),r(n(56)),r(n(81)),r(n(93)),r(n(60)),r(n(62)),r(n(94)),r(n(61)),r(n(59)),r(n(95))},function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var i=function e(t){r(this,e),this.envelops=t};t.Batch=i},function(e,t,n){"use strict";function r(e){for(var n in e)t.hasOwnProperty(n)||(t[n]=e[n])}Object.defineProperty(t,"__esModule",{value:!0}),r(n(58)),r(n(83)),r(n(85))},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});!function(e){e[e.OnProcess="on-process"]="OnProcess",e[e.Consumed="consumed"]="Consumed",e[e.Error="error"]="Error"}(t.ConsumationStatus||(t.ConsumationStatus={}))},function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}();Object.defineProperty(t,"__esModule",{value:!0});var o=function(){function e(t){var n=this;r(this,e),this.pipes=t,this.queues=new Map,t.forEach(function(e,t){n.queues.set(t,e.queue)})}return i(e,[{key:"start",value:function(){this.pipes.forEach(function(e){e.start()})}}]),e}();t.Bus=o},function(e,t,n){"use strict";function r(e){for(var n in e)t.hasOwnProperty(n)||(t[n]=e[n])}Object.defineProperty(t,"__esModule",{value:!0}),r(n(87)),r(n(89))},function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}();Object.defineProperty(t,"__esModule",{value:!0});var o=n(14),u=n(56),a=function e(){r(this,e),this.flushTime=1e3,this.batchSize=50},s=function(){function e(t,n,i,u,s){var c=arguments.length>5&&void 0!==arguments[5]?arguments[5]:null;r(this,e),this.id=t,this.queue=n,this.endpoint=i,this._auditProvider=u,this._logger=s,this.onFlush=new o.EventEmitter,this.onError=new o.EventEmitter,this._config=new a,this._batchCounter=0,o.Utils.override(this._config,c)}return i(e,[{key:"start",value:function(){var e=this;setInterval(function(){return e.flush()},this._config.flushTime)}},{key:"flush",value:function(){var e=this;try{var t=this.queue.consume(this._config.batchSize);if(!t)return;var n=new u.Batch(t.items);n.index=++this._batchCounter,n.audit=this._auditProvider.audit(this,n),this.endpoint.send(n).then(function(){t.ack(),e._logger.log("[QID:"+e.id+"]: Batch "+n.index+" was sent successfuly."),e.onFlush.emit(void 0)},function(r){t.nack(),e._logger.error("[QID:"+e.id+"]: Batch "+n.index+" was sent with error.",r),e.onError.emit(void 0)})}catch(e){this._logger.fatal("[QID:"+this.id+"]: Error on flushing messages into the endpoint.",e)}}}]),e}();t.Pipe=s},function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var i=function e(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};r(this,e),this.type=t,this.message=n};t.Envelop=i},,,,,,,,,,,,,,,function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(78),i=n(14),o=n(22),u=n(80),a=n(55),s=n(96),c=n(97),f=n(99);!function(){var e=f.WorkerScope.current(),t=new o.UniversalLogger,n=new c.WorkerReceiver(e,t),l=new i.Singleton(function(c,f,l){u.Polyfills.load(e,function(){t.replace([new o.WorkerLogger(n.sender)]);var e=new s.Postman(new i.GuidProvider,new i.TimeStampProvider),u=new a.BusBuilder(l,c,f,e,t),v=u.build(),h=new a.Router(r.messagesConfiguration,v.queues,t),p=new a.Messager(h,e);n.messages.subscribe(function(e){return p.send(e.messages,e.context)}),v.start(),t.log("Worker was started successfuly.")},f.polyfillsUrl)});n.configuration.subscribe(function(e){l.executeOnce(e.configuration,e.environment,e.context)})}()},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.messagesConfiguration={messages:[]}},function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}();Object.defineProperty(t,"__esModule",{value:!0});var o=function(){function e(t){r(this,e),t&&"undefined"!=typeof XDomainRequest?this._xhr=new XDomainRequest:this._xhr=new XMLHttpRequest}return i(e,[{key:"send",value:function(e){var t=this,n=this._xhr,r=e.type||"POST",i=e.body||"",o=e.url,u=e.timeout;return new Promise(function(e,a){n.open(r,o,!0),void 0!==u&&(n.timeout=u),t.subscribe(e,a),n.send(i)})}},{key:"subscribe",value:function(e,t){var n=this._xhr;n instanceof XMLHttpRequest?n.onreadystatechange=function(r){4===n.readyState&&(n.status>=200&&n.status<300?e(n.responseText):t(n.responseText||n.responseType||"CORS problem"))}:(n.onload=function(){return e(n.responseText)},n.onerror=function(){return t("XDomain CORS problem")})}}]),e}(),u=function(){function e(){r(this,e)}return i(e,[{key:"send",value:function(e){var t=e.url.indexOf("://")>0||0===e.url.indexOf("//");return new o(t).send(e)}}]),e}();t.Ajax=u},function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}();Object.defineProperty(t,"__esModule",{value:!0});var o=function(){function e(){r(this,e)}return i(e,null,[{key:"load",value:function(t,n,r){if("undefined"==typeof Promise||"undefined"==typeof Map||"undefined"==typeof Symbol){var i=t.importScripts(r||e.url(t,"/messaging-client-polyfills.js"));i&&"function"==typeof i.then?i.then(n):n()}else n()}},{key:"url",value:function(e,t){var n=(e.location||"").toString();return(n=n.substring(0,n.lastIndexOf("/")))+t}}]),e}();t.Polyfills=o},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e){for(var n in e)t.hasOwnProperty(n)||(t[n]=e[n])}(n(82))},function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}();Object.defineProperty(t,"__esModule",{value:!0});var o=n(14),u=n(57),a=n(57),s=n(86),c=n(59),f=n(60),l=n(61),v=n(92),h=function(){function e(t,n,i,o,u){r(this,e),this._context=t,this._config=n,this._environment=i,this._postman=o,this._logger=u}return i(e,[{key:"build",value:function(){var e=new Map,t=!0,n=!1,r=void 0;try{for(var i,o=this._config.endpoints[Symbol.iterator]();!(t=(i=o.next()).done);t=!0){var u=i.value;this.pipes(u).forEach(function(t,n){e.set(n,t)})}}catch(e){n=!0,r=e}finally{try{!t&&o.return&&o.return()}finally{if(n)throw r}}return new c.Bus(e)}},{key:"pipes",value:function(e){var t=this.endpoint(e),n=new Map,r=!0,i=!1,o=void 0;try{for(var u,c=e.queues[Symbol.iterator]();!(r=(u=c.next()).done);r=!0){var f=u.value,v=new a.SampledQueue(this.queue(f),f),h=new s.BatchAuditProvider(this._postman,this._environment),p=new l.Pipe(f.id,v,t,h,this._logger,f);n.set(f.id,p)}}catch(e){i=!0,o=e}finally{try{!r&&c.return&&c.return()}finally{if(i)throw o}}return n}},{key:"queue",value:function(e){return e.persistant?(this._logger.fatal("Persitant queue is not supported yet"),new u.MemoryQueue):new u.MemoryQueue}},{key:"endpoint",value:function(e){var t=e;switch(e.type){case"console":return new f.ConsoleEndpoint(t);case"fe-analytic-collector":return new f.FEAnalyticsCollectorEndpoint(this.ajax(),new o.TimeStampProvider,t,this._environment)}return this._logger.fatal("Endpoint type '"+e.type+"' is not supported"),new f.ConsoleEndpoint}},{key:"ajax",value:function(){return this._environment.fakeMode?new v.PortAjaxProvider(this._context):new o.Ajax}}]),e}();t.BusBuilder=h},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e){for(var n in e)t.hasOwnProperty(n)||(t[n]=e[n])}(n(84))},function(e,t,n){"use strict";function r(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var o=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}();Object.defineProperty(t,"__esModule",{value:!0});var u=n(58),a=function(){function e(t,n){i(this,e),this._queue=t,this._status=u.ConsumationStatus.OnProcess,this.items=n}return o(e,[{key:"ack",value:function(){this._status===u.ConsumationStatus.OnProcess&&(this._queue.ack(this.items),this._status=u.ConsumationStatus.Consumed)}},{key:"nack",value:function(){this._status===u.ConsumationStatus.OnProcess&&(this._queue.nack(this.items),this._status=u.ConsumationStatus.Error)}},{key:"status",get:function(){return this._status}}]),e}(),s=function(){function e(){i(this,e),this._array=[],this._count=0}return o(e,[{key:"enqueue",value:function(e){var t;(t=this._array).push.apply(t,r(e)),this._count+=e.length}},{key:"consume",value:function(e){var t=this,n=this._array.length;if((e=Math.min(n,Math.max(e,0)))<=0)return null;var i=this._array.splice(0,e);return new a({nack:function(e){var n;return(n=t._array).push.apply(n,r(e))},ack:function(e){return t._count-=e.length}},i)}},{key:"count",get:function(){return this._count}}]),e}();t.MemoryQueue=s},function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}();Object.defineProperty(t,"__esModule",{value:!0});var o=n(9),u=function e(){r(this,e),this.maxMessageCount=15e3},a=function(){function e(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;r(this,e),this._queue=t,this._config=new u,o.Utils.override(this._config,n)}return i(e,[{key:"enqueue",value:function(e){var t=this._config.maxMessageCount-this._queue.count;t<=0||(t<e.length&&(e=e.slice(0,t)),this._queue.enqueue(e))}},{key:"consume",value:function(e){return this._queue.consume(e)}},{key:"count",get:function(){return this._queue.count}}]),e}();t.SampledQueue=a},function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}();Object.defineProperty(t,"__esModule",{value:!0});var o=function(){function e(t,n){r(this,e),this._postman=t,this._environment=n}return i(e,[{key:"audit",value:function(e,t){var n={name:"MessagingClientJs.queueSize",measurement:e.queue.count-t.envelops.length,count:1,tags:{queueId:e.id},_meta:{type:"measurement"}};return this._postman.seal(n)}}]),e}();t.BatchAuditProvider=o},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e){for(var n in e)t.hasOwnProperty(n)||(t[n]=e[n])}(n(88))},function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}();Object.defineProperty(t,"__esModule",{value:!0});var o=n(14),u=function e(){r(this,e),this.mute=!1},a=function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;r(this,e),this._config=new u,this._counter=0,o.Utils.override(this._config,t)}return i(e,[{key:"send",value:function(e){var t=this;return this._config.mute?Promise.resolve():new Promise(function(n){t.print(e),n()})}},{key:"print",value:function(e){var t=!0,n=!1,r=void 0;try{for(var i,o=e.envelops[Symbol.iterator]();!(t=(i=o.next()).done);t=!0){var u=i.value;try{var a="worker-(b-"+e.index+",m-"+ ++this._counter+")";a+=": ["+u.id+", time: "+u.timestamp+", type: "+u.type+"]: "+JSON.stringify(u.message),console.log(a)}catch(e){console.error("Error on message "+u.id+" serialization: "+e)}}}catch(e){n=!0,r=e}finally{try{!t&&o.return&&o.return()}finally{if(n)throw r}}}}]),e}();t.ConsoleEndpoint=a},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e){for(var n in e)t.hasOwnProperty(n)||(t[n]=e[n])}(n(90))},function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}();Object.defineProperty(t,"__esModule",{value:!0});var o=n(14),u=n(91),a=function(){function e(){r(this,e),this.timeout=2e3}return i(e,[{key:"validate",value:function(){if(!this.url)throw new Error("Url for FE Analytics Collector is not setted")}}]),e}(),s=function(){function e(t,n,i,u){r(this,e),this._ajax=t,this._timestamp=n,this._environment=u,this._config=new a,o.Utils.override(this._config,i),this._config.validate(),this._serializer=new c(u.apiKey)}return i(e,[{key:"send",value:function(e){var t=this.serialize(e);return this._ajax.send({type:"POST",url:this._config.url+"/v2?p=js&v="+encodeURIComponent(u.Version)+"&t="+this._timestamp.now(),body:t,timeout:this._config.timeout})}},{key:"serialize",value:function(e){var t="{}\n",n=!0,r=!1,i=void 0;try{for(var o,u=e.envelops[Symbol.iterator]();!(n=(o=u.next()).done);n=!0){var a=o.value;t+=this._serializer.serialize(a)+"\n"}}catch(e){r=!0,i=e}finally{try{!n&&u.return&&u.return()}finally{if(r)throw i}}return t+=this.audit(e)}},{key:"audit",value:function(e){return e.audit?this._serializer.serialize(e.audit)+"\n":""}}]),e}();t.FEAnalyticsCollectorEndpoint=s;var c=function(){function e(t){r(this,e),this._apiKey=t}return i(e,[{key:"serialize",value:function(e){var t=new Array;return t.push((e.timestamp||0).toString()),t.push(this._apiKey),t.push(e.name),t.push(""),t.push(this.type(e)),t.push(e.id),t.push(JSON.stringify(e.message)),t.join(",")}},{key:"type",value:function(t){var n=e.MessageTypes[t.type];return n=void 0===n?e.MessageTypes.default:n,n.toString()}}]),e}();c.MessageTypes={measurement:0,log:2,default:1}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.Version="0.0.1"},function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}();Object.defineProperty(t,"__esModule",{value:!0});var o=function(){function e(t){r(this,e),this._context=t}return i(e,[{key:"send",value:function(e){var t=this;return new Promise(function(n){t._context.port&&t._context.port.postMessage({type:"ajax",options:e}),n("")})}}]),e}();t.PortAjaxProvider=o},function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var u=function(e){function t(e){r(this,t);var n=i(this,(t.__proto__||Object.getPrototypeOf(t)).call(this));return n.worker=e,n}return o(t,e),t}(Function);t.Context=u},function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}();Object.defineProperty(t,"__esModule",{value:!0});var o=function(){function e(t,n){r(this,e),this._router=t,this._postmaster=n}return i(e,[{key:"send",value:function(e,t){var n=new Map,r=!0,i=!1,o=void 0;try{for(var u,a=e[Symbol.iterator]();!(r=(u=a.next()).done);r=!0){var s=u.value,c=this._postmaster.seal(s,t),f=this._router.route(c),l=n.get(f);l?l.push(c):(l=[c],n.set(f,l))}}catch(e){i=!0,o=e}finally{try{!r&&a.return&&a.return()}finally{if(i)throw o}}n.forEach(function(e,t){t.enqueue(e)})}}]),e}();t.Messager=o},function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},o=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}();Object.defineProperty(t,"__esModule",{value:!0});var u=function(){function e(t,n,i){if(r(this,e),this._queues=n,this._logger=i,0===n.size)throw new Error("No queue exists");this._routes=a.createRoutes(t)}return o(e,[{key:"route",value:function(t){var n=this.findQueue(t)||e.default,r=this._queues.get(n);return r||(this._logger.error("Queue for message type '"+t.type+"' is not defined. Use any other queue."),r=this._queues.values().next().value),r}},{key:"findQueue",value:function(e){var t=this._routes.get(e.type);if(!t||!t.length)return null;var n=!0,r=!1,i=void 0;try{for(var o,u=t[Symbol.iterator]();!(n=(o=u.next()).done);n=!0){var a=o.value;if(!a.properties)return a.queue;if(this.isMatch(e.message,a.properties))return a.queue}}catch(e){r=!0,i=e}finally{try{!n&&u.return&&u.return()}finally{if(r)throw i}}return null}},{key:"isMatch",value:function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:10;if(0===n)return!0;for(var r in t)if(t.hasOwnProperty(r)){var o=e[r],u=t[r];if("object"===(void 0===o?"undefined":i(o))&&"object"===(void 0===u?"undefined":i(u))){if(!this.isMatch(o,u,n-1))return!1}else if(e[r]!==t[r])return!1}return!0}}]),e}();u.default="default",t.Router=u;var a=function(){function e(){r(this,e)}return o(e,null,[{key:"createRoutes",value:function(t){var n=new Map,r=!0,i=!1,o=void 0;try{for(var u,a=t.messages[Symbol.iterator]();!(r=(u=a.next()).done);r=!0){var s=u.value,c=n.get(s.type);c?c.push(s):(c=[s],n.set(s.type,c))}}catch(e){i=!0,o=e}finally{try{!r&&a.return&&a.return()}finally{if(i)throw o}}var f=new Map;return n.forEach(function(t,n){t=t.sort(function(t,n){return e.weight(n.properties)-e.weight(t.properties)}),f.set(n,t)}),f}},{key:"weight",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:10;if(!e||t<=0)return 0;var n=0;for(var r in e)if(e.hasOwnProperty(r)){var o=e[r];"object"===(void 0===o?"undefined":i(o))?n+=this.weight(o,t-1):n++}return n}}]),e}()},function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}();Object.defineProperty(t,"__esModule",{value:!0});var o=n(62),u=function(){function e(t,n){r(this,e),this._guid=t,this._time=n}return i(e,[{key:"seal",value:function(e,t){var n=e._meta;return delete e._meta,this.envelop(n,e,t)}},{key:"envelop",value:function(e,t,n){var r=new o.Envelop(e.type);return r.id=this._guid.next(),r.timestamp=e.timestamp||this._time.now(),r.name=this.name(r.type,t),r.message=t,r.context=n,r}},{key:"name",value:function(e,t){if("measurement"===e){var n=t.name;return delete t.name,n}return e}}]),e}();t.Postman=u},function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}();Object.defineProperty(t,"__esModule",{value:!0});var o=n(8),u=n(55),a=n(98),s=function(){function e(t,n){var i=this;r(this,e),this._workerEnvironment=t,this._logger=n,this.messages=new o.EventEmitter,this.configuration=new o.EventEmitter,this._sender=new a.BroadcastWorkerSender([]),this._isDedicated=!1,t.addEventListener("message",function(e){return i.dedicatedWorker(e)}),t.addEventListener("connect",function(e){return i.sharedWorker(e)})}return i(e,[{key:"emit",value:function(e,t){var n=e.data;switch(n.type){case"messages":return this.messages.emit({messages:n.messages,context:t});case"configuration":return this.configuration.emit({configuration:n.configuration,environment:n.environment,context:t})}this._logger.error("Worker received unknown message type '"+n.type+"'. Handling was skipped.")}},{key:"dedicatedWorker",value:function(e){var t=new u.Context("dedicated");t.port=this._workerEnvironment,this._isDedicated||(this._sender.senders.push(this._workerEnvironment),this._isDedicated=!0),this.emit(e,t)}},{key:"sharedWorker",value:function(e){var t=this,n=e.ports[0];this._sender.senders.push(n),n.addEventListener("message",function(e){var r=new u.Context("shared");r.port=n,t.emit(e,r)}),n.start()}},{key:"sender",get:function(){return this._sender}}]),e}();t.WorkerReceiver=s},function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}();Object.defineProperty(t,"__esModule",{value:!0});var o=function(){function e(t){r(this,e),this.senders=t}return i(e,[{key:"postMessage",value:function(e){var t=!0,n=!1,r=void 0;try{for(var i,o=this.senders[Symbol.iterator]();!(t=(i=o.next()).done);t=!0){i.value.postMessage(e)}}catch(e){n=!0,r=e}finally{try{!t&&o.return&&o.return()}finally{if(n)throw r}}}}]),e}();t.BroadcastWorkerSender=o},function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}();Object.defineProperty(t,"__esModule",{value:!0});var o=n(23),u=n(37),a=function(){function e(){r(this,e)}return i(e,null,[{key:"current",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:o.GlobalProvider.current();if(e[u.PseudoWorkerScopeName]){var t=e[u.PseudoWorkerScopeName];return delete e[u.PseudoWorkerScopeName],t}return e}}]),e}();t.WorkerScope=a}])});