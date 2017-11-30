(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 97);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */,
/* 2 */,
/* 3 */
/***/ (function(module, exports) {

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Real GUID provider implementation
 *
 * @internal
 * @class GuidProvider
 * @implements {IGuidProvider}
 */
var GuidProvider = /** @class */ (function () {
    function GuidProvider(random) {
        if (random === void 0) { random = Random.create(); }
        this.random = random;
        this._byteToHex = [];
        var byteToHex = this._byteToHex;
        for (var i = 0; i < 256; ++i) {
            byteToHex[i] = (i + 0x100).toString(16).substr(1);
        }
    }
    Object.defineProperty(GuidProvider, "default", {
        get: function () {
            return GuidProvider._default || (GuidProvider._default = new GuidProvider());
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Return a new guid
     *
     * ToDo: Think about more efective algorithm
     * @returns {string}
     * @memberof GuidProvider
     */
    GuidProvider.prototype.next = function () {
        var rnds = this.random.next();
        // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`
        rnds[6] = (rnds[6] & 0x0f) | 0x40;
        rnds[8] = (rnds[8] & 0x3f) | 0x80;
        return this.bytesToUuid(rnds);
    };
    GuidProvider.prototype.bytesToUuid = function (buf) {
        var i = 0;
        var bth = this._byteToHex;
        return bth[buf[i++]] + bth[buf[i++]] +
            bth[buf[i++]] + bth[buf[i++]] +
            bth[buf[i++]] + bth[buf[i++]] +
            bth[buf[i++]] + bth[buf[i++]] +
            bth[buf[i++]] + bth[buf[i++]] +
            bth[buf[i++]] + bth[buf[i++]] +
            bth[buf[i++]] + bth[buf[i++]] +
            bth[buf[i++]] + bth[buf[i++]];
    };
    return GuidProvider;
}());
exports.GuidProvider = GuidProvider;
/**
 * Based random numbers source
 *
 * @internal
 * @abstract
 * @class Random
 */
var Random = /** @class */ (function () {
    function Random() {
    }
    /**
     * Create new Random generator instance supported by current environment
     */
    Random.create = function (forceSimple) {
        if (forceSimple === void 0) { forceSimple = false; }
        if (typeof crypto !== 'undefined'
            && crypto.getRandomValues
            && !forceSimple) {
            return new CryptoRandom();
        }
        else {
            return new SimpleRandom();
        }
    };
    return Random;
}());
exports.Random = Random;
/**
 * Provide strong random values from Crypto API
 *
 * @internal
 * @class CryptoRandom
 * @extends {Random}
 */
var CryptoRandom = /** @class */ (function (_super) {
    __extends(CryptoRandom, _super);
    function CryptoRandom() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CryptoRandom.prototype.next = function () {
        // WHATWG crypto RNG - http://wiki.whatwg.org/wiki/Crypto
        var rnds8 = new Uint8Array(16); // eslint-disable-line no-undef
        crypto.getRandomValues(rnds8);
        return rnds8;
    };
    return CryptoRandom;
}(Random));
exports.CryptoRandom = CryptoRandom;
/**
 * Provide random values from unpredictable Math.random function
 *
 * @internal
 * @class SimpleRandom
 * @extends {Random}
 */
var SimpleRandom = /** @class */ (function (_super) {
    __extends(SimpleRandom, _super);
    function SimpleRandom() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._rnds = new Array(16);
        return _this;
    }
    SimpleRandom.prototype.next = function () {
        for (var i = 0, r = 0; i < 16; i++) {
            if ((i & 0x03) === 0) {
                r = Math.random() * 0x100000000;
            }
            this._rnds[i] = r >>> ((i & 0x03) << 3) & 0xff;
        }
        return this._rnds;
    };
    return SimpleRandom;
}(Random));
exports.SimpleRandom = SimpleRandom;


/***/ }),
/* 4 */
/***/ (function(module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @internal
 */
function traversal(callback, destination, sources) {
    // Do not use for..of to avoid require polyfills
    var length = sources.length;
    for (var index = 0; index < length; index++) {
        var source = sources[index];
        if (!source) {
            continue;
        }
        for (var name_1 in source) {
            if (source.hasOwnProperty(name_1)) {
                callback(name_1, source[name_1]);
            }
        }
    }
}
exports.traversal = traversal;


/***/ }),
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(35));
__export(__webpack_require__(12));
__export(__webpack_require__(3));
__export(__webpack_require__(36));
__export(__webpack_require__(17));
__export(__webpack_require__(28));


/***/ }),
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */
/***/ (function(module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Event emitter and subscriber to send the same messages to a few destinations
 *
 * @internal
 * @class EventEmitter
 * @template TEvent
 */
var EventEmitter = /** @class */ (function () {
    function EventEmitter() {
        this._listeners = new Array();
        this._buffer = new Array();
    }
    EventEmitter.prototype.subscribe = function (listener) {
        var _this = this;
        if (typeof listener === 'function') {
            if (this.subscribed(listener) < 0) {
                this._listeners.push(listener);
            }
            if (this._buffer.length > 0) {
                setTimeout(function () { return _this.flushBuffer(); });
            }
        }
        return this;
    };
    EventEmitter.prototype.unsubscribe = function (listener) {
        var index = this.subscribed(listener);
        while (index >= 0) {
            this._listeners.splice(index, 1);
            index = this.subscribed(listener);
        }
        return this;
    };
    EventEmitter.prototype.clear = function () {
        this._listeners.length = 0;
        this._buffer.length = 0;
    };
    EventEmitter.prototype.emit = function (data) {
        var length = this._listeners.length;
        if (length > 0) {
            for (var i = 0; i < length; i++) {
                try {
                    this._listeners[i](data);
                }
                catch (er) { }
            }
        }
        else {
            this._buffer.push(data);
        }
    };
    EventEmitter.prototype.redirect = function (emitter) {
        this.subscribe(function (event) {
            emitter.emit(event);
        });
        return emitter;
    };
    EventEmitter.prototype.map = function (convert) {
        var newEventEmitter = new EventEmitter();
        this.subscribe(function (event) {
            newEventEmitter.emit(convert(event));
        });
        return newEventEmitter;
    };
    EventEmitter.prototype.subscribed = function (listener) {
        return this._listeners.indexOf(listener);
    };
    EventEmitter.prototype.flushBuffer = function () {
        var buffer = this._buffer.slice();
        this._buffer.length = 0;
        var length = buffer.length;
        for (var i = 0; i < length; i++) {
            this.emit(buffer[i]);
        }
    };
    return EventEmitter;
}());
exports.EventEmitter = EventEmitter;


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Return global root object for current environment
 *
 * @internal
 * @abstract
 * @class GlobalProvider
 */
var GlobalProvider = /** @class */ (function () {
    function GlobalProvider() {
    }
    GlobalProvider.current = function () {
        var root = typeof window !== 'undefined' ? window :
            /* istanbul ignore next */
            typeof self !== 'undefined' ? self :
                /* istanbul ignore next */
                typeof global !== 'undefined' ? global :
                    /* istanbul ignore next */
                    null;
        /* istanbul ignore if */
        if (!root) {
            throw new Error('Unsupported environment.');
        }
        return root;
    };
    return GlobalProvider;
}());
exports.GlobalProvider = GlobalProvider;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(20)))

/***/ }),
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */
/***/ (function(module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Simple timestamp provider implementation
 *
 * @internal
 * @class TimeStampProvider
 * @implements {ITimeStampProvider}
 */
var TimeStampProvider = /** @class */ (function () {
    function TimeStampProvider() {
    }
    TimeStampProvider.prototype.now = function () {
        return +new Date();
    };
    return TimeStampProvider;
}());
exports.TimeStampProvider = TimeStampProvider;


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var traversal_1 = __webpack_require__(4);
/**
 * Extend the first object by all properties from the second
 * Return the first object
 *
 * @internal
 * @param {*} destination - object what will be extended
 * @param {*} source - object with source data
 */
function extend(destination) {
    var sources = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        sources[_i - 1] = arguments[_i];
    }
    if (!destination) {
        destination = {};
    }
    traversal_1.traversal(function (name, sourceValue) {
        if (destination[name] === undefined) {
            destination[name] = sourceValue;
        }
    }, destination, sources);
    return destination;
}
exports.extend = extend;


/***/ }),
/* 19 */,
/* 20 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */,
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(18));
__export(__webpack_require__(37));
__export(__webpack_require__(38));
__export(__webpack_require__(39));


/***/ }),
/* 29 */
/***/ (function(module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
var WebStorages = /** @class */ (function () {
    function WebStorages() {
    }
    Object.defineProperty(WebStorages, "localStorage", {
        get: function () {
            if (WebStorages._localStorage !== undefined) {
                return WebStorages._localStorage;
            }
            return WebStorages._localStorage = WebStorages.local();
        },
        enumerable: true,
        configurable: true
    });
    WebStorages.local = function () {
        /* istanbul ignore if */
        if (typeof localStorage === 'undefined') {
            return null;
        }
        try {
            localStorage.getItem(''); // localStorage was disabled by user.
        }
        catch (_a) {
            /* istanbul ignore next */
            return null;
        }
        return localStorage;
    };
    return WebStorages;
}());
exports.WebStorages = WebStorages;


/***/ }),
/* 30 */
/***/ (function(module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * The class chooses the best unload event for different browsers
 */
var UnloadEvent = /** @class */ (function () {
    function UnloadEvent() {
    }
    UnloadEvent.addListener = function (handler) {
        switch (UnloadEvent.mode) {
            case 'pagehide': {
                window.addEventListener('pagehide', handler);
                return true;
            }
            case 'unload': {
                window.addEventListener('unload', handler);
                return true;
            }
            default: return false;
        }
    };
    UnloadEvent.removeListener = function (handler) {
        switch (UnloadEvent.mode) {
            case 'pagehide': {
                window.removeEventListener('pagehide', handler);
                return true;
            }
            case 'unload': {
                window.removeEventListener('unload', handler);
                return true;
            }
            default: return false;
        }
    };
    UnloadEvent.mode = typeof window !== 'undefined'
        ? ((window.onpagehide || window.onpagehide === null) ? 'pagehide' : 'unload')
        : 'none';
    return UnloadEvent;
}());
exports.UnloadEvent = UnloadEvent;


/***/ }),
/* 31 */,
/* 32 */,
/* 33 */,
/* 34 */,
/* 35 */
/***/ (function(module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Ajax provider implementation
 */
var AjaxRequest = /** @class */ (function () {
    /* istanbul ignore next */
    function AjaxRequest(cors) {
        /* istanbul ignore if */
        if (cors && typeof XDomainRequest !== 'undefined') {
            this._xhr = new XDomainRequest();
        }
        else {
            this._xhr = new XMLHttpRequest();
        }
    }
    /* istanbul ignore next */
    AjaxRequest.prototype.send = function (options) {
        var _this = this;
        var xhr = this._xhr;
        var type = options.type || 'POST';
        var body = options.body || '';
        var url = options.url;
        var timeout = options.timeout;
        return new Promise(function (resolve, reject) {
            xhr.open(type, url, /*async*/ true);
            if (timeout !== undefined) {
                xhr.timeout = timeout;
            }
            _this.subscribe(resolve, reject, timeout);
            xhr.send(body);
        });
    };
    /* istanbul ignore next */
    AjaxRequest.prototype.subscribe = function (resolve, reject, timeout) {
        var xhr = this._xhr;
        var log = new Array();
        if (xhr instanceof XMLHttpRequest) {
            xhr.onreadystatechange = function (aEvt) {
                log.push(xhr.readyState);
                if (xhr.readyState === 4) {
                    if (xhr.status >= 200 && xhr.status < 300) {
                        resolve(xhr.responseText);
                    }
                    else {
                        reject(xhr.responseText || xhr.responseType || 'CORS problem');
                    }
                }
            };
        }
        else {
            xhr.onload = function () { return resolve(xhr.responseText); };
            xhr.onerror = function () { return reject('XDomain CORS problem'); };
            // tslint:disable-next-line:max-line-length
            // Fixes bug with IE9: https://social.msdn.microsoft.com/Forums/ie/en-US/30ef3add-767c-4436-b8a9-f1ca19b4812e/ie9-rtm-xdomainrequest-issued-requests-may-abort-if-all-event-handlers-not-specified?forum=iewebdevelopment
            xhr.onprogress = function () { };
            xhr.ontimeout = function () { reject('Timeout'); };
            if (timeout) {
                setTimeout(function () { return reject('Manual timeout'); }, timeout);
            }
        }
    };
    return AjaxRequest;
}());
/**
 * Ajax provider constructor
 *
 * @internal
 * @class Ajax
 * @implements {IAjaxProvider}
 */
var Ajax = /** @class */ (function () {
    function Ajax() {
    }
    /* istanbul ignore next */
    Ajax.prototype.send = function (options) {
        if (typeof fetch !== 'undefined') {
            return this.fetch(options);
        }
        /* istanbul ignore next */
        var isAbsoluteUrl = options.url.indexOf('://') > 0 || options.url.indexOf('//') === 0;
        return new AjaxRequest(/*enable CORS: */ isAbsoluteUrl).send(options);
    };
    Ajax.prototype.fetch = function (options) {
        return fetch(options.url, {
            body: options.body,
            method: options.type
        }).then(function (response) { /* istanbul ignore next */ return response.text(); });
    };
    return Ajax;
}());
exports.Ajax = Ajax;


/***/ }),
/* 36 */
/***/ (function(module, exports) {

var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable:no-any
/**
 * Provide single execution of passed function
 *
 * @internal
 */
var Singleton = /** @class */ (function () {
    function Singleton(_func) {
        var _this = this;
        this._func = _func;
        this._executed = false;
        this.execute = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            if (_this._executed) {
                return _this._result;
            }
            _this._result = _this._func.apply(_this, __spread(args));
            _this._executed = true;
            return _this._result;
        };
        this.executeOnce = this.execute;
    }
    Object.defineProperty(Singleton.prototype, "executed", {
        get: function () { return this._executed; },
        enumerable: true,
        configurable: true
    });
    return Singleton;
}());
exports.Singleton = Singleton;


/***/ }),
/* 37 */
/***/ (function(module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @internal
 */
function groupBy(array, predicate) {
    return array.reduce(function (map, current) {
        var key = predicate(current);
        var prev = map.get(key);
        if (!prev) {
            map.set(key, prev = []);
        }
        prev.push(current);
        return map;
    }, new Map());
}
exports.groupBy = groupBy;


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var traversal_1 = __webpack_require__(4);
/**
 * Override the first object by all properties from the second
 * Return the first object
 *
 * @internal
 * @param {*} destination - object what will be overrided
 * @param {*} source - object with source data
 */
function override(destination) {
    var sources = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        sources[_i - 1] = arguments[_i];
    }
    if (!destination) {
        destination = {};
    }
    traversal_1.traversal(function (name, sourceValue) {
        destination[name] = sourceValue;
    }, destination, sources);
    return destination;
}
exports.override = override;


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var traversal_1 = __webpack_require__(4);
/**
 * Clone object data without functions
 */
function safeClone(source) {
    var destination = {};
    traversal_1.traversal(function (name, sourceValue) {
        if (typeof (sourceValue) !== 'function') {
            destination[name] = sourceValue;
        }
    }, destination, [source]);
    return destination;
}
exports.safeClone = safeClone;


/***/ }),
/* 40 */
/***/ (function(module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Print internal log messages in browser console
 *
 * Is not supported for some environment
 *
 * @internal
 * @class ConsoleLogger
 * @implements {ILogger}
 */
var ConsoleLogger = /** @class */ (function () {
    function ConsoleLogger(_options) {
        this._options = _options;
        this.prefix = "[messaging-client.js]: ";
    }
    ConsoleLogger.prototype.fatal = function (message, error) {
        if (!this._options.mute) {
            console.error(this.prefix + message, error);
        }
    };
    ConsoleLogger.prototype.error = function (message, error) {
        if (!this._options.mute) {
            console.error(this.prefix + message, error);
        }
    };
    ConsoleLogger.prototype.log = function (message) {
        if (!this._options.mute) {
            console.log(this.prefix + message);
        }
    };
    return ConsoleLogger;
}());
exports.ConsoleLogger = ConsoleLogger;


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var event_emitter_1 = __webpack_require__(12);
/**
 * Send log messages into EventEmitter
 *
 * @internal
 * @class EventLogger
 * @implements {ILogger}
 */
var EventLogger = /** @class */ (function () {
    function EventLogger() {
        this.onlog = new event_emitter_1.EventEmitter();
    }
    EventLogger.prototype.fatal = function (message, error) {
        this.onlog.emit({ level: 'fatal', message: message, error: error });
    };
    EventLogger.prototype.error = function (message, error) {
        this.onlog.emit({ level: 'error', message: message, error: error });
    };
    EventLogger.prototype.log = function (message) {
        this.onlog.emit({ level: 'log', message: message });
    };
    return EventLogger;
}());
exports.EventLogger = EventLogger;


/***/ }),
/* 42 */
/***/ (function(module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Proxy logger to resend all log messages to another loggers
 *
 * @internal
 * @class UniversalLogger
 * @implements {ILogger}
 */
var UniversalLogger = /** @class */ (function () {
    function UniversalLogger(loggers) {
        if (loggers === void 0) { loggers = []; }
        this.loggers = loggers;
        this.enabled = true;
    }
    UniversalLogger.prototype.fatal = function (message, error) {
        if (this.enabled) {
            this.logger(function (l) { return l.fatal(message, error); });
        }
    };
    UniversalLogger.prototype.error = function (message, error) {
        if (this.enabled) {
            this.logger(function (l) { return l.error(message, error); });
        }
    };
    UniversalLogger.prototype.log = function (message) {
        if (this.enabled) {
            this.logger(function (l) { return l.log(message); });
        }
    };
    /**
     * Replace existing loggers to new ones
     *
     * @param {Array<ILogger>} loggers
     * @memberof UniversalLogger
     */
    UniversalLogger.prototype.replace = function (newLoggers) {
        this.loggers.length = 0;
        var length = newLoggers.length;
        for (var i = 0; i < length; i++) {
            this.loggers.push(newLoggers[i]);
        }
    };
    UniversalLogger.prototype.logger = function (execute) {
        var loggers = this.loggers;
        var length = loggers.length;
        for (var i = 0; i < length; i++) {
            execute(loggers[i]);
        }
    };
    return UniversalLogger;
}());
exports.UniversalLogger = UniversalLogger;


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(104));
__export(__webpack_require__(106));


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var indexeddb_provider_1 = __webpack_require__(108);
var IndexedDbUtils = /** @class */ (function () {
    function IndexedDbUtils() {
    }
    IndexedDbUtils.open = function (name, version, onupgradeneeded, attempts) {
        if (attempts === void 0) { attempts = 3; }
        var factory = indexeddb_provider_1.IndexedDBProvider.getIndexedDB();
        if (!factory) {
            return Promise.reject('Cannot instantiate IndexedDB factory.');
        }
        return new Promise(function (resolve, reject) {
            var attemptCounter = 0;
            var open = function () {
                attemptCounter++;
                var request = factory.open(name, 1);
                request.onsuccess = function () {
                    var db = request.result;
                    resolve(db);
                };
                request.onupgradeneeded = function () {
                    var db = request.result;
                    onupgradeneeded(db);
                };
                request.onerror = function () {
                    if (attemptCounter >= attempts) {
                        reject("Error on openning IndexedDB '" + name + "'. Attempts count: " + attemptCounter + ".");
                    }
                    else {
                        try {
                            openSafe();
                        }
                        catch (error) {
                            reject(error);
                        }
                    }
                };
                request.onblocked = function () {
                    openSafe();
                };
            };
            var openSafe = function () {
                try {
                    open();
                }
                catch (error) {
                    reject(error.message);
                }
            };
            openSafe();
        });
    };
    IndexedDbUtils.transaction = function (storeFactory, action, result) {
        return new Promise(function (resolve, reject) {
            var storage = storeFactory();
            storage.transaction.oncomplete = function () {
                resolve(result);
            };
            storage.transaction.onabort = storage.transaction.onerror = function (e) {
                return reject(e.message || e.type);
            };
            action(storage, result);
        });
    };
    IndexedDbUtils.request = function (request, action) {
        request.onsuccess = function (e) {
            var data = e.target.result;
            if (action) {
                action(data);
            }
        };
        request.onerror = function () {
            request.transaction.abort();
        };
    };
    IndexedDbUtils.addArray = function (storage, items, completed) {
        var i = 0;
        var addNext = function () {
            if (i < items.length) {
                var item = items[i];
                i++;
                IndexedDbUtils.request(storage.add(item), addNext);
            }
            else {
                if (completed) {
                    completed();
                }
            }
        };
        addNext();
    };
    IndexedDbUtils.remove = function (name) {
        var factory = indexeddb_provider_1.IndexedDBProvider.getIndexedDB();
        if (!factory) {
            return Promise.reject('Cannot instantiate IndexedDB factory.');
        }
        return new Promise(function (resolve, reject) {
            var request = factory.deleteDatabase(name);
            request.onsuccess = function () {
                resolve();
            };
            request.onerror = function () {
                reject("Error on removing IndexedDB '" + name + "'");
            };
            request.onblocked = function () {
                reject("Removing '" + name + "' was blocked.");
            };
        });
    };
    return IndexedDbUtils;
}());
exports.IndexedDbUtils = IndexedDbUtils;


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var guid_1 = __webpack_require__(3);
var WorkerRequestSender = /** @class */ (function () {
    function WorkerRequestSender(type, _sender, _receiver) {
        var _this = this;
        this.type = type;
        this._sender = _sender;
        this._receiver = _receiver;
        this._dictionary = {};
        this._guid = guid_1.GuidProvider.default;
        this._response = function (data) {
            var messageId = data.messageId;
            if (messageId) {
                var callbacks = _this._dictionary[messageId];
                delete _this._dictionary[messageId];
                if (callbacks) {
                    if (data.error) {
                        if (typeof callbacks.reject === 'function') {
                            callbacks.reject(data.error);
                        }
                    }
                    else {
                        if (typeof callbacks.resolve === 'function') {
                            callbacks.resolve(data.response);
                        }
                    }
                }
            }
        };
        _receiver.addEventListener(type, this._response);
    }
    WorkerRequestSender.prototype.send = function (data, resolved, rejected) {
        var messageId = this._guid.next();
        this._dictionary[messageId] = { resolve: resolved, reject: rejected };
        var result = this._sender.postMessage({ type: this.type, messageId: messageId, request: data });
        if (result && typeof result.catch === 'function') {
            result.catch(rejected);
        }
    };
    WorkerRequestSender.prototype.dispose = function () {
        this._receiver.removeEventListener(this.type, this._response);
    };
    return WorkerRequestSender;
}());
exports.WorkerRequestSender = WorkerRequestSender;


/***/ }),
/* 46 */
/***/ (function(module, exports) {

var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Class converts javascript messages with standard event 'message' to strongly typed custom messages
 *
 * @internal
 */
var MessageReceiver = /** @class */ (function () {
    function MessageReceiver(_receiver, _logger) {
        var _this = this;
        this._receiver = _receiver;
        this._logger = _logger;
        this._dic = {};
        this._buffers = {};
        this._handler = function (event) {
            var request = event.data;
            if (request && request.type) {
                var listeners = _this._dic[request.type];
                if (listeners) {
                    try {
                        for (var listeners_1 = __values(listeners), listeners_1_1 = listeners_1.next(); !listeners_1_1.done; listeners_1_1 = listeners_1.next()) {
                            var listener = listeners_1_1.value;
                            try {
                                listener(request);
                            }
                            catch (error) {
                                _this._logger.error("Error on executing listener for message type " + request.type, error);
                            }
                        }
                    }
                    catch (e_1_1) { e_1 = { error: e_1_1 }; }
                    finally {
                        try {
                            if (listeners_1_1 && !listeners_1_1.done && (_a = listeners_1.return)) _a.call(listeners_1);
                        }
                        finally { if (e_1) throw e_1.error; }
                    }
                }
                else {
                    var buffer = _this._buffers[request.type] || (_this._buffers[request.type] = []);
                    buffer.push(event);
                }
            }
            var e_1, _a;
        };
        _receiver.addEventListener('message', this._handler);
    }
    MessageReceiver.prototype.addEventListener = function (type, listener) {
        var listeners = this._dic[type] = this._dic[type] || [];
        listeners.push(listener);
        this.flushBuffer(type);
    };
    MessageReceiver.prototype.removeEventListener = function (type, listener) {
        var listeners = this._dic[type];
        if (listeners) {
            var index = listeners.indexOf(listener);
            if (index >= 0) {
                listeners.splice(index, 1);
            }
            if (listeners.length === 0) {
                delete this._dic[type];
            }
        }
    };
    MessageReceiver.prototype.dispose = function () {
        this._dic = {};
        this._buffers = {};
        this._receiver.removeEventListener('message', this._handler);
    };
    MessageReceiver.prototype.flushBuffer = function (type) {
        var _this = this;
        var buffer = this._buffers[type];
        if (buffer && buffer.length !== 0) {
            setTimeout(function () {
                var length = buffer.length;
                for (var i = 0; i < length; i++) {
                    _this._handler(buffer[i]);
                }
                buffer.length = 0;
            });
        }
    };
    return MessageReceiver;
}());
exports.MessageReceiver = MessageReceiver;


/***/ }),
/* 47 */
/***/ (function(module, exports) {

var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Handler for this emitter is optional.
 * Default value will be returned on undefined handler.
 */
var OptionalResponseEmitter = /** @class */ (function () {
    function OptionalResponseEmitter(def, handler) {
        var _this = this;
        this.def = def;
        this.handler = handler;
        this.invoke = function (request) {
            if (_this.handler) {
                return _this.handler(request);
            }
            return _this.def;
        };
    }
    OptionalResponseEmitter.prototype.stop = function () {
        this.handler = undefined;
    };
    return OptionalResponseEmitter;
}());
exports.OptionalResponseEmitter = OptionalResponseEmitter;
/**
 * Handler for this emitter is mandatory.
 * All requests without handler will be buferred and passed to a new handler on its setting.
 */
var MandatoryResponseEmitter = /** @class */ (function () {
    function MandatoryResponseEmitter(_handler) {
        var _this = this;
        this._handler = _handler;
        this._buffer = new Array();
        this.invoke = function (request) {
            if (_this.handler) {
                return _this.handler(request);
            }
            return new Promise(function (resolve, reject) {
                _this._buffer.push({ request: request, resolve: resolve });
            });
        };
    }
    Object.defineProperty(MandatoryResponseEmitter.prototype, "handler", {
        get: function () {
            return this._handler;
        },
        set: function (value) {
            this._handler = value;
            this.flushBuffer();
        },
        enumerable: true,
        configurable: true
    });
    MandatoryResponseEmitter.prototype.stop = function () {
        this.handler = undefined;
    };
    MandatoryResponseEmitter.prototype.flushBuffer = function () {
        if (this._handler && this._buffer.length > 0) {
            try {
                for (var _a = __values(this._buffer), _b = _a.next(); !_b.done; _b = _a.next()) {
                    var data = _b.value;
                    data.resolve(this.invoke(data.request));
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }
        var e_1, _c;
    };
    return MandatoryResponseEmitter;
}());
exports.MandatoryResponseEmitter = MandatoryResponseEmitter;


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var event_emitter_1 = __webpack_require__(12);
/**
 * Class wrapper for receiving messages as typed events
 *
 * @internal
 */
var WorkerEventReceiver = /** @class */ (function () {
    function WorkerEventReceiver(type, _receiver) {
        var _this = this;
        this.type = type;
        this._receiver = _receiver;
        this.event = new event_emitter_1.EventEmitter();
        this._handler = function (data) {
            if (data.type === _this.type) {
                _this.event.emit(data);
            }
        };
        _receiver.addEventListener(type, this._handler);
    }
    WorkerEventReceiver.prototype.dispose = function () {
        this._receiver.removeEventListener(this.type, this._handler);
        this.event.clear();
    };
    return WorkerEventReceiver;
}());
exports.WorkerEventReceiver = WorkerEventReceiver;


/***/ }),
/* 49 */
/***/ (function(module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
var WorkerRequestReceiver = /** @class */ (function () {
    function WorkerRequestReceiver(type, _sender, _receiver, _handler) {
        var _this = this;
        this.type = type;
        this._sender = _sender;
        this._receiver = _receiver;
        this._handler = _handler;
        this._response = function (data) {
            var messageId = data.messageId;
            var type = data.type;
            if (_this.type === type) {
                if (messageId) {
                    _this.awaitResponse(type, data.request, messageId);
                }
                else {
                    _this.riseEvent(type, data.request);
                }
            }
        };
        _receiver.addEventListener(type, this._response);
    }
    WorkerRequestReceiver.prototype.dispose = function () {
        this._receiver.removeEventListener(this.type, this._response);
        this._handler.stop();
    };
    WorkerRequestReceiver.prototype.awaitResponse = function (type, request, messageId) {
        var sender = this._sender;
        function reject(error) {
            var message = '';
            if (error != null) {
                if (error instanceof Error) {
                    message = error.message;
                }
                else {
                    message = error.toString();
                }
            }
            sender.postMessage({ type: type, messageId: messageId, error: { message: message } });
        }
        function resolve(response) {
            sender.postMessage({ type: type, messageId: messageId, response: response });
        }
        try {
            var result = this._handler.invoke(request);
            if (typeof Promise !== 'undefined' && result instanceof Promise) {
                result.then(resolve, reject);
            }
            else {
                resolve(result);
            }
        }
        catch (error) {
            reject(error);
        }
    };
    WorkerRequestReceiver.prototype.riseEvent = function (type, request) {
        try {
            this._handler.invoke(request);
        }
        catch (_a) { }
    };
    return WorkerRequestReceiver;
}());
exports.WorkerRequestReceiver = WorkerRequestReceiver;


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var script_loader_1 = __webpack_require__(51);
/**
 * Variable name to pass PseudoWorker between main code and loaded in a WebWorker
 * @internal
 */
exports.PseudoWorkerScopeName = 'MessagingClient-PseudoWorker';
/**
 * Emulator of Web Worker behavior. Run all proccess in the main window process.
 *
 * Required compatibility with IE9 without polyfills
 *
 * @internal
 * @class PseudoWorker
 */
var PseudoWorker = /** @class */ (function () {
    function PseudoWorker(path, scriptLoader) {
        if (scriptLoader === void 0) { scriptLoader = new script_loader_1.ScriptLoader(); }
        var _this = this;
        this._listeners = [];
        this._buffer = [];
        this._global = window;
        this._pseudoWorker = this._global[exports.PseudoWorkerScopeName] =
            new InternalPseudoWorker(path, scriptLoader, {
                raiseEvent: function (message) { return _this.raiseEvent(message); }
            });
        scriptLoader.loadScript(path);
    }
    Object.defineProperty(PseudoWorker.prototype, "pseudoWorker", {
        get: function () { return this._pseudoWorker; },
        enumerable: true,
        configurable: true
    });
    PseudoWorker.prototype.postMessage = function (message) {
        this._pseudoWorker.raiseEvent({ data: message });
    };
    PseudoWorker.prototype.addEventListener = function (event, listener) {
        var _this = this;
        if (event === 'message') {
            this._listeners.push(listener);
            setTimeout(function () {
                if (_this._buffer.length > 0) {
                    var buffer = _this._buffer.slice();
                    var length_1 = buffer.length;
                    for (var i = 0; i < length_1; i++) {
                        _this.raiseEvent(buffer[i]);
                    }
                    _this._buffer.length = 0;
                }
            });
        }
    };
    PseudoWorker.prototype.removeEventListener = function (event, listener) {
        var index = this._listeners.indexOf(listener);
        if (index > -1) {
            this._listeners.splice(index, 1);
        }
    };
    PseudoWorker.prototype.terminate = function () {
        this._buffer.length = 0;
        this._listeners.length = 0;
        this._pseudoWorker.close();
    };
    PseudoWorker.prototype.raiseEvent = function (message) {
        var listeners = this._listeners;
        var length = listeners.length;
        if (length > 0) {
            for (var i = 0; i < length; i++) {
                var listener = listeners[i];
                listener(message);
            }
        }
        else {
            this._buffer.push(message);
        }
    };
    return PseudoWorker;
}());
exports.PseudoWorker = PseudoWorker;
/**
 * Instance for emulationg Worker Environment inside WebWorker code
 *
 * @class InternalPseudoWorker
 * @implements {IWorkerGlobalScope}
 */
var InternalPseudoWorker = /** @class */ (function () {
    function InternalPseudoWorker(location, _scriptLoader, _internal) {
        this._scriptLoader = _scriptLoader;
        this._internal = _internal;
        this._listeners = [];
        this._buffer = [];
        this.location = location;
    }
    InternalPseudoWorker.prototype.postMessage = function (message) {
        var _this = this;
        message = JSON.parse(JSON.stringify(message));
        setTimeout(function () {
            _this._internal.raiseEvent({ data: message });
        });
    };
    InternalPseudoWorker.prototype.importScripts = function () {
        var paths = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            paths[_i] = arguments[_i];
        }
        var resolve;
        var resolved;
        var length = paths.length;
        var toload = paths.length;
        var onload = function () {
            toload--;
            if (toload <= 0) {
                resolved = true;
                if (resolve) {
                    resolve();
                }
            }
        };
        for (var i = 0; i < length; i++) {
            this._scriptLoader.loadScript(paths[i], onload);
        }
        return {
            then: function (callback) {
                if (resolved) {
                    callback();
                    return;
                }
                resolve = callback;
            }
        };
    };
    InternalPseudoWorker.prototype.addEventListener = function (event, listener) {
        var _this = this;
        if (event === 'message') {
            this._listeners.push(listener);
            setTimeout(function () {
                if (_this._buffer.length) {
                    var buffer = _this._buffer.slice();
                    var length_2 = buffer.length;
                    for (var i = 0; i < length_2; i++) {
                        _this.raiseEvent(buffer[i]);
                    }
                    _this._buffer.length = 0;
                }
            });
        }
    };
    InternalPseudoWorker.prototype.removeEventListener = function (event, listener) {
        var index = this._listeners.indexOf(listener);
        if (index > -1) {
            this._listeners.splice(index, 1);
        }
    };
    InternalPseudoWorker.prototype.raiseEvent = function (message) {
        if (!this._listeners.length) {
            this._buffer.push(message);
        }
        else {
            var length_3 = this._listeners.length;
            for (var index = 0; index < length_3; index++) {
                this._listeners[index](message);
            }
        }
    };
    InternalPseudoWorker.prototype.close = function () {
        this._buffer.length = 0;
        this._listeners.length = 0;
    };
    return InternalPseudoWorker;
}());


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var global_1 = __webpack_require__(13);
/**
 * Polyfill for loading script in DOM context
 *
 * @internal
 * @class ScriptLoader
 * @implements {IScriptLoader}
 */
var ScriptLoader = /** @class */ (function () {
    function ScriptLoader(_global) {
        if (_global === void 0) { _global = global_1.GlobalProvider.current(); }
        if (typeof _global.document !== 'undefined') {
            this.loadScript = function (path, onload) { return ScriptLoader.loadViaDom(_global.document, path, onload); };
            return;
        }
        throw new Error('No DOM environment is not supported.');
    }
    // tslint:disable-next-line:member-ordering
    ScriptLoader.loadViaDom = function (document, path, onload) {
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = path;
        if (onload) {
            script.onload = onload;
        }
        (document.body || document.head).appendChild(script);
    };
    return ScriptLoader;
}());
exports.ScriptLoader = ScriptLoader;


/***/ }),
/* 52 */,
/* 53 */,
/* 54 */,
/* 55 */,
/* 56 */,
/* 57 */,
/* 58 */,
/* 59 */,
/* 60 */,
/* 61 */,
/* 62 */,
/* 63 */,
/* 64 */,
/* 65 */,
/* 66 */,
/* 67 */,
/* 68 */,
/* 69 */,
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(71));
__export(__webpack_require__(102));
__export(__webpack_require__(130));
__export(__webpack_require__(75));
__export(__webpack_require__(77));
__export(__webpack_require__(131));
__export(__webpack_require__(76));
__export(__webpack_require__(74));
__export(__webpack_require__(133));


/***/ }),
/* 71 */
/***/ (function(module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Batch of few envelops
 *
 * @internal
 */
var Batch = /** @class */ (function () {
    function Batch(envelops, 
        /**
         * Index of the batch
         */
        index) {
        if (index === void 0) { index = 0; }
        this.envelops = envelops;
        this.index = index;
        /**
         * Error count for the current batch
         */
        this.errorCount = 0;
    }
    return Batch;
}());
exports.Batch = Batch;


/***/ }),
/* 72 */
/***/ (function(module, exports) {

var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
Object.defineProperty(exports, "__esModule", { value: true });
function duration(time1, time2) {
    return {
        clocktime: time2.clocktime - time1.clocktime,
        cpu: (time2.cpu && time1.cpu) ? (time2.cpu - time1.cpu) : undefined
    };
}
exports.duration = duration;
function distorbtion(items, val) {
    var values = new Array();
    try {
        for (var items_1 = __values(items), items_1_1 = items_1.next(); !items_1_1.done; items_1_1 = items_1.next()) {
            var item = items_1_1.value;
            var current = val(item);
            if (current !== undefined) {
                values.push(current);
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (items_1_1 && !items_1_1.done && (_a = items_1.return)) _a.call(items_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    values.sort(function (a, b) { return a - b; });
    return {
        average: average(values),
        median: median(values),
        max: values[values.length - 1],
        min: values[0],
        total: values.length
    };
    var e_1, _a;
}
exports.distorbtion = distorbtion;
function average(values) {
    var avg = 0;
    try {
        for (var values_1 = __values(values), values_1_1 = values_1.next(); !values_1_1.done; values_1_1 = values_1.next()) {
            var val = values_1_1.value;
            avg += val;
        }
    }
    catch (e_2_1) { e_2 = { error: e_2_1 }; }
    finally {
        try {
            if (values_1_1 && !values_1_1.done && (_a = values_1.return)) _a.call(values_1);
        }
        finally { if (e_2) throw e_2.error; }
    }
    return avg / values.length;
    var e_2, _a;
}
function median(values) {
    var half = Math.floor(values.length / 2);
    if (values.length % 2) {
        return values[half];
    }
    else {
        return (values[half - 1] + values[half]) / 2.0;
    }
}


/***/ }),
/* 73 */
/***/ (function(module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
var Perfstamp = /** @class */ (function () {
    function Perfstamp() {
        this.clocktime = +new Date();
        this.cpu = Perfstamp.now();
    }
    return Perfstamp;
}());
exports.Perfstamp = Perfstamp;
/* istanbul ignore next */
if (typeof performance !== 'undefined'
    && typeof performance.now !== 'undefined') {
    Perfstamp.now = function () { return performance.now(); };
}
else {
    /* istanbul ignore next */
    Perfstamp.now = function () { return undefined; };
}


/***/ }),
/* 74 */
/***/ (function(module, exports) {

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Bus for all pipes in the system
 *
 * @internal
 * @class Bus
 */
var Bus = /** @class */ (function () {
    function Bus(pipes) {
        var _this = this;
        this.pipes = pipes;
        this.queues = new Map();
        pipes.forEach(function (pipe, id) {
            _this.queues.set(id, pipe.batchBuilder.queue);
        });
    }
    Bus.prototype.start = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, pipe, e_1_1, e_1, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 5, 6, 7]);
                        _a = __values(this.pipes.values()), _b = _a.next();
                        _d.label = 1;
                    case 1:
                        if (!!_b.done) return [3 /*break*/, 4];
                        pipe = _b.value;
                        return [4 /*yield*/, pipe.start()];
                    case 2:
                        _d.sent();
                        _d.label = 3;
                    case 3:
                        _b = _a.next();
                        return [3 /*break*/, 1];
                    case 4: return [3 /*break*/, 7];
                    case 5:
                        e_1_1 = _d.sent();
                        e_1 = { error: e_1_1 };
                        return [3 /*break*/, 7];
                    case 6:
                        try {
                            if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                        }
                        finally { if (e_1) throw e_1.error; }
                        return [7 /*endfinally*/];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    Bus.prototype.terminate = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, pipe, e_2_1, e_2, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 5, 6, 7]);
                        _a = __values(this.pipes.values()), _b = _a.next();
                        _d.label = 1;
                    case 1:
                        if (!!_b.done) return [3 /*break*/, 4];
                        pipe = _b.value;
                        return [4 /*yield*/, pipe.terminate()];
                    case 2:
                        _d.sent();
                        _d.label = 3;
                    case 3:
                        _b = _a.next();
                        return [3 /*break*/, 1];
                    case 4: return [3 /*break*/, 7];
                    case 5:
                        e_2_1 = _d.sent();
                        e_2 = { error: e_2_1 };
                        return [3 /*break*/, 7];
                    case 6:
                        try {
                            if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                        }
                        finally { if (e_2) throw e_2.error; }
                        return [7 /*endfinally*/];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    return Bus;
}());
exports.Bus = Bus;


/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(123));


/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var tab_sync_point_1 = __webpack_require__(127);
var unload_event_1 = __webpack_require__(30);
var pipe_stats_1 = __webpack_require__(128);
/**
 * Pipe consumes messages from a queue and send it to an endpoint
 *
 * @internal
 */
var Pipe = /** @class */ (function () {
    function Pipe(batchBuilder, endpoint, _flushTimeStrategy, _logger, _auditor, _syncPoint) {
        if (_syncPoint === void 0) { _syncPoint = new tab_sync_point_1.LocalStorageTabSyncPoint(batchBuilder.queue.id + '-pipe'); }
        this.batchBuilder = batchBuilder;
        this.endpoint = endpoint;
        this._flushTimeStrategy = _flushTimeStrategy;
        this._logger = _logger;
        this._auditor = _auditor;
        this._syncPoint = _syncPoint;
        this._active = true;
    }
    Object.defineProperty(Pipe.prototype, "queueId", {
        get: function () {
            return this.batchBuilder.queue.id;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Start queue handling
     */
    Pipe.prototype.start = function () {
        if (this._intervalId) {
            throw new Error('Pipe already was started.');
        }
        this._intervalId = {};
        this.subscribe();
        return this.schedule();
    };
    Pipe.prototype.terminate = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this._active) return [3 /*break*/, 2];
                        this.dispose();
                        return [4 /*yield*/, this.batchBuilder.destroy()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    Pipe.prototype.dispose = function () {
        if (this._active) {
            this._active = false;
            if (this._intervalId) {
                clearTimeout(this._intervalId);
                this._intervalId = undefined;
            }
            this._syncPoint.dispose();
        }
    };
    Pipe.prototype.schedule = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var duration;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this._active) return [3 /*break*/, 2];
                        return [4 /*yield*/, this._flushTimeStrategy.duration()];
                    case 1:
                        duration = _a.sent();
                        this._intervalId = setTimeout(function () { return __awaiter(_this, void 0, void 0, function () {
                            var error_1;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        _a.trys.push([0, 2, 3, 4]);
                                        return [4 /*yield*/, this.flush()];
                                    case 1:
                                        _a.sent();
                                        return [3 /*break*/, 4];
                                    case 2:
                                        error_1 = _a.sent();
                                        this._logger.error("[QID:" + this.queueId + "]: Error on flushing messages into the endpoint.", error_1);
                                        return [3 /*break*/, 4];
                                    case 3:
                                        this.schedule();
                                        return [7 /*endfinally*/];
                                    case 4: return [2 /*return*/];
                                }
                            });
                        }); }, duration);
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    Pipe.prototype.subscribe = function () {
        var _this = this;
        unload_event_1.UnloadEvent.addListener(function () {
            _this.dispose();
        });
    };
    /**
     * Take {batchSize} items from the queue and send it to endpoint.
     * Confirm or reject consumation on the end of endpoint process
     */
    Pipe.prototype.flush = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var auditor, avoidConcurrency, consumption, result, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this._active) {
                            return [2 /*return*/];
                        }
                        auditor = this._auditor.start(this.batchBuilder.queue);
                        avoidConcurrency = !this._syncPoint.capture(this._flushTimeStrategy.syncTime());
                        return [4 /*yield*/, this.batchBuilder.next(avoidConcurrency)];
                    case 1:
                        consumption = _a.sent();
                        if (!consumption) {
                            return [2 /*return*/];
                        }
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 6]);
                        auditor.dequeued(consumption.batch);
                        result = this.endpoint
                            .send(consumption.batch)
                            .then(function () { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        auditor.confirmed(pipe_stats_1.AjaxRequestStatusResult.Success);
                                        return [4 /*yield*/, consumption.ack()];
                                    case 1:
                                        _a.sent();
                                        auditor.ended();
                                        this._logger.log("[QID:" + this.queueId + "]: Batch " + consumption.batch.index + " was sent successfully.");
                                        return [2 /*return*/];
                                }
                            });
                        }); }, function (reason) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        auditor.confirmed(pipe_stats_1.AjaxRequestStatusResult.NetworkError);
                                        return [4 /*yield*/, consumption.nack()];
                                    case 1:
                                        _a.sent();
                                        auditor.ended();
                                        this._logger.error("[QID:" + this.queueId + "]: Batch " + consumption.batch.index + " was sent with error.", reason);
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        auditor.sent();
                        return [4 /*yield*/, result];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 6];
                    case 4:
                        error_2 = _a.sent();
                        return [4 /*yield*/, consumption.nack()];
                    case 5:
                        _a.sent();
                        throw error_2;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    return Pipe;
}());
exports.Pipe = Pipe;


/***/ }),
/* 77 */
/***/ (function(module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Envelop for a message.
 * Enrich additional technical information.
 *
 * @internal
 */
var Envelop = /** @class */ (function () {
    function Envelop(
        /**
         * Type of message body
         */
        type, 
        /**
         * Main message body from a user code
         */
        message) {
        if (message === void 0) { message = {}; }
        this.type = type;
        this.message = message;
    }
    return Envelop;
}());
exports.Envelop = Envelop;


/***/ }),
/* 78 */,
/* 79 */,
/* 80 */,
/* 81 */,
/* 82 */,
/* 83 */,
/* 84 */,
/* 85 */,
/* 86 */,
/* 87 */,
/* 88 */,
/* 89 */,
/* 90 */,
/* 91 */,
/* 92 */,
/* 93 */,
/* 94 */,
/* 95 */,
/* 96 */,
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var messages_configuration_1 = __webpack_require__(98);
var framework_1 = __webpack_require__(8);
var logs_1 = __webpack_require__(99);
var polyfills_1 = __webpack_require__(101);
var processing_1 = __webpack_require__(70);
var messenger_performance_auditor_1 = __webpack_require__(134);
var messenger_statistic_auditor_1 = __webpack_require__(136);
var pipe_stats_provider_1 = __webpack_require__(137);
var pipe_stats_indexeddb_1 = __webpack_require__(138);
var pipe_stats_local_storage_1 = __webpack_require__(139);
var pipe_stats_memory_1 = __webpack_require__(140);
var postman_1 = __webpack_require__(141);
var worker_receiver_1 = __webpack_require__(142);
var worker_scope_1 = __webpack_require__(144);
/**
 * Entry point for building js-file for WebWorker environment
 */
(function () {
    // Receive current global scope variable
    var scope = worker_scope_1.WorkerScope.current();
    // Create logger for all objects
    var logger = new logs_1.UniversalLogger([]);
    // Create messages receiver from main thread
    var receiver = new worker_receiver_1.WorkerReceiver(scope, logger);
    // Use singleton to prevent a few initialization in shared web worker
    var singleton = new framework_1.Singleton(function (configuration, environment) {
        logger.enabled = environment.debug;
        // Run loading polyfills if they are necessary
        polyfills_1.Polyfills.load(scope, function () { return __awaiter(_this, void 0, void 0, function () {
            var _this = this;
            var postman, statsStorage, _a, statsProvider, busBuilder, bus, router, messagesPerformanceAuditor, messagesStatisticAuditor, messenger;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        // Add logger for sending messages back to main thread
                        logger.replace([new logs_1.WorkerLogger(receiver.context.sender)]);
                        postman = new postman_1.Postman(framework_1.GuidProvider.default, new framework_1.TimeStampProvider());
                        _a = pipe_stats_local_storage_1.PipeStatsLocalStorage.create();
                        if (_a) return [3 /*break*/, 2];
                        return [4 /*yield*/, pipe_stats_indexeddb_1.PipeStatsIndexedDBStorage.create().catch(function () { return new pipe_stats_memory_1.PipeStatsMemoryStorage(); })];
                    case 1:
                        _a = (_b.sent());
                        _b.label = 2;
                    case 2:
                        statsStorage = _a;
                        statsProvider = new pipe_stats_provider_1.PipeStatsProvider(statsStorage);
                        busBuilder = new processing_1.BusBuilder(receiver.context, configuration, environment, statsProvider, logger);
                        return [4 /*yield*/, busBuilder.build()];
                    case 3:
                        bus = _b.sent();
                        router = new processing_1.Router(messages_configuration_1.messagesConfiguration, bus.queues);
                        messagesPerformanceAuditor = messenger_performance_auditor_1.MessengerPerformanceAuditorBuilder.create(environment.performanceAudit, busBuilder.auditSender);
                        messagesStatisticAuditor = new messenger_statistic_auditor_1.MessengerStatisticAuditor(statsStorage);
                        messenger = new processing_1.Messenger(router, postman, messagesStatisticAuditor, messagesPerformanceAuditor);
                        // Bind receive event from main thread to Messenger handler
                        receiver.messages.subscribe(function (data) {
                            messenger.send(data.messages);
                        });
                        // Start all pipes to handle messages from queues
                        return [4 /*yield*/, bus.start()];
                    case 4:
                        // Start all pipes to handle messages from queues
                        _b.sent();
                        // Subscribe for termination command and terminate all reactions for other calling
                        receiver.terminate.handler = function () { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        _a.trys.push([0, , 4, 5]);
                                        return [4 /*yield*/, bus.terminate()];
                                    case 1:
                                        _a.sent();
                                        return [4 /*yield*/, statsStorage.clear()];
                                    case 2:
                                        _a.sent();
                                        return [4 /*yield*/, statsStorage.dispose()];
                                    case 3:
                                        _a.sent();
                                        return [3 /*break*/, 5];
                                    case 4:
                                        receiver.dispose();
                                        return [7 /*endfinally*/];
                                    case 5: return [2 /*return*/];
                                }
                            });
                        }); };
                        logger.log('Worker was started successfully.');
                        return [2 /*return*/];
                }
            });
        }); }, environment);
    });
    // Map receiving of configuration messages to singleton execution
    receiver.configuration.subscribe(function (event) {
        try {
            singleton.executeOnce(event.configuration, event.environment);
        }
        catch (error) {
            logger.error(error);
        }
    });
})();


/***/ }),
/* 98 */
/***/ (function(module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @internal
 */
exports.messagesConfiguration = {
    messages: []
};


/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(40));
__export(__webpack_require__(41));
__export(__webpack_require__(100));
__export(__webpack_require__(42));


/***/ }),
/* 100 */
/***/ (function(module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Send log messages to a main thread
 *
 * @internal
 * @class SharedWorkerLogger
 * @implements {ILogger}
 */
var WorkerLogger = /** @class */ (function () {
    function WorkerLogger(_sender) {
        this._sender = _sender;
        this.prefix = "";
    }
    WorkerLogger.prototype.fatal = function (message, error) {
        this._sender.postMessage({ type: 'log', log: { level: 'fatal', message: this.prefix + message, error: error } });
    };
    WorkerLogger.prototype.error = function (message, error) {
        this._sender.postMessage({ type: 'log', log: { level: 'error', message: this.prefix + message, error: error } });
    };
    WorkerLogger.prototype.log = function (message) {
        this._sender.postMessage({ type: 'log', log: { level: 'log', message: this.prefix + message } });
    };
    return WorkerLogger;
}());
exports.WorkerLogger = WorkerLogger;


/***/ }),
/* 101 */
/***/ (function(module, exports) {

/**
 * Polyfills
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Dynamic polyfills loader from separated file
 * If some of Api is not exists - load all batch to browser.
 * Actual for supporting IE9+
 *
 * @internal
 * @class Polyfills
 */
var Polyfills = /** @class */ (function () {
    function Polyfills() {
    }
    /**
     * Check and load polyfills if necessary
     */
    Polyfills.load = function (scope, loaded, data) {
        // Check required APIs and load polyfils if necessary
        /* istanbul ignore if */
        if (data.forcePolyfills ||
            typeof Promise === 'undefined' ||
            typeof Map === 'undefined' ||
            typeof Symbol === 'undefined') {
            var result = scope.importScripts(data.polyfillsUrl || Polyfills.url(scope, '/messaging-client-polyfills.js'));
            if (result && typeof result.then === 'function') {
                result.then(loaded);
            }
            else {
                loaded();
            }
        }
        else {
            loaded();
        }
    };
    Polyfills.url = function (scope, polyfillsName) {
        var currentLocation = (scope.location || '').toString();
        currentLocation = currentLocation.substring(0, currentLocation.lastIndexOf('/'));
        return currentLocation + polyfillsName;
    };
    return Polyfills;
}());
exports.Polyfills = Polyfills;


/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(103));


/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
Object.defineProperty(exports, "__esModule", { value: true });
var framework_1 = __webpack_require__(8);
var queues_1 = __webpack_require__(43);
var queues_2 = __webpack_require__(43);
var indexeddb_queue_1 = __webpack_require__(107);
var local_storage_queue_1 = __webpack_require__(109);
var audit_provider_1 = __webpack_require__(113);
var pipe_performance_auditor_1 = __webpack_require__(114);
var pipe_statistics_auditor_1 = __webpack_require__(116);
var worker_audit_sender_1 = __webpack_require__(117);
var batch_builder_1 = __webpack_require__(118);
var batch_drop_strategy_1 = __webpack_require__(119);
var batch_indexeddb_storage_1 = __webpack_require__(120);
var batch_localstorage_storage_1 = __webpack_require__(121);
var batch_memory_storage_1 = __webpack_require__(122);
var bus_1 = __webpack_require__(74);
var endpoints_1 = __webpack_require__(75);
var flush_time_strategy_1 = __webpack_require__(126);
var pipe_1 = __webpack_require__(76);
var port_ajax_provider_1 = __webpack_require__(129);
/**
 * @internal
 */
var BusBuilder = /** @class */ (function () {
    function BusBuilder(_context, _config, _environment, _statsProvider, _logger) {
        this._context = _context;
        this._config = _config;
        this._environment = _environment;
        this._statsProvider = _statsProvider;
        this._logger = _logger;
        this.auditSender = new worker_audit_sender_1.WorkerAuditSender(this._context);
    }
    BusBuilder.prototype.build = function () {
        return __awaiter(this, void 0, void 0, function () {
            var allPipes, _a, _b, endpointConfig, pipes, e_1_1, e_1, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        allPipes = new Map();
                        _d.label = 1;
                    case 1:
                        _d.trys.push([1, 6, 7, 8]);
                        _a = __values(this._config.endpoints), _b = _a.next();
                        _d.label = 2;
                    case 2:
                        if (!!_b.done) return [3 /*break*/, 5];
                        endpointConfig = _b.value;
                        return [4 /*yield*/, this.pipes(endpointConfig)];
                    case 3:
                        pipes = _d.sent();
                        pipes.forEach(function (pipe, id) {
                            allPipes.set(id, pipe);
                        });
                        _d.label = 4;
                    case 4:
                        _b = _a.next();
                        return [3 /*break*/, 2];
                    case 5: return [3 /*break*/, 8];
                    case 6:
                        e_1_1 = _d.sent();
                        e_1 = { error: e_1_1 };
                        return [3 /*break*/, 8];
                    case 7:
                        try {
                            if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                        }
                        finally { if (e_1) throw e_1.error; }
                        return [7 /*endfinally*/];
                    case 8: return [2 /*return*/, new bus_1.Bus(allPipes)];
                }
            });
        });
    };
    BusBuilder.prototype.pipes = function (endpointConfig) {
        return __awaiter(this, void 0, void 0, function () {
            var endpoint, pipes, performanceAuditor, statisticAuditor, _a, _b, queueConfig, queue, _c, batchStorage, auditProvider, batchDropStrategy, batchBuilder, flushTimeStrategy, pipe, e_2_1, e_2, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        endpoint = this.endpoint(endpointConfig);
                        pipes = new Map();
                        performanceAuditor = pipe_performance_auditor_1.PipePerformanceAuditorBuilder.create(this._environment.performanceAudit, new worker_audit_sender_1.WorkerAuditSender(this._context));
                        statisticAuditor = new pipe_statistics_auditor_1.PipeStatisticAuditor(this._statsProvider);
                        _e.label = 1;
                    case 1:
                        _e.trys.push([1, 7, 8, 9]);
                        _a = __values(endpointConfig.queues), _b = _a.next();
                        _e.label = 2;
                    case 2:
                        if (!!_b.done) return [3 /*break*/, 6];
                        queueConfig = _b.value;
                        _c = queues_2.SampledQueue.bind;
                        return [4 /*yield*/, this.queue(queueConfig)];
                    case 3:
                        queue = new (_c.apply(queues_2.SampledQueue, [void 0, _e.sent(), queueConfig]))();
                        return [4 /*yield*/, this.batchStorage(queueConfig)];
                    case 4:
                        batchStorage = _e.sent();
                        auditProvider = new audit_provider_1.BatchAuditProvider();
                        batchDropStrategy = new batch_drop_strategy_1.DefaultBatchDropStrategy(queueConfig);
                        batchBuilder = new batch_builder_1.BatchBuilder(queue, batchStorage, batchDropStrategy, auditProvider, statisticAuditor, queueConfig);
                        flushTimeStrategy = new flush_time_strategy_1.DynamicFlushTimeStrategy(this._statsProvider.get(queue), queueConfig);
                        pipe = new pipe_1.Pipe(batchBuilder, endpoint, flushTimeStrategy, this._logger, performanceAuditor);
                        pipes.set(queueConfig.id, pipe);
                        _e.label = 5;
                    case 5:
                        _b = _a.next();
                        return [3 /*break*/, 2];
                    case 6: return [3 /*break*/, 9];
                    case 7:
                        e_2_1 = _e.sent();
                        e_2 = { error: e_2_1 };
                        return [3 /*break*/, 9];
                    case 8:
                        try {
                            if (_b && !_b.done && (_d = _a.return)) _d.call(_a);
                        }
                        finally { if (e_2) throw e_2.error; }
                        return [7 /*endfinally*/];
                    case 9: return [2 /*return*/, pipes];
                }
            });
        });
    };
    BusBuilder.prototype.batchStorage = function (config) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var syncTime;
            return __generator(this, function (_a) {
                if (config.persistent) {
                    syncTime = (config.maxFlushTime || 30) * 1.5;
                    return [2 /*return*/, batch_indexeddb_storage_1.BatchIndexedDBStorage.create(config.id, syncTime, config.name, config.reset)
                            .then(function (storage) {
                            storage.logger = _this._logger;
                            _this._logger.log("Created persistent batch storage for id " + config.id);
                            return storage;
                        })
                            .catch(function (error) {
                            _this._logger.error('Creating IndexedDb for batch storage was failed.', error);
                            var storage = batch_localstorage_storage_1.BatchLocalStorageStorage.create(config.id, config.name, config.reset);
                            if (storage) {
                                storage.logger = _this._logger;
                                _this._logger.log("Downgraded to local storage batch storage for id " + config.id + ".");
                                return storage;
                            }
                            _this._logger.log("Downgraded to memory batch storage for id " + config.id + ".");
                            return new batch_memory_storage_1.BatchMemoryStorage();
                        })];
                }
                this._logger.log("Created memory batch storage for id " + config.id);
                return [2 /*return*/, new batch_memory_storage_1.BatchMemoryStorage()];
            });
        });
    };
    BusBuilder.prototype.queue = function (config) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var lsQueue;
            return __generator(this, function (_a) {
                if (config.persistent) {
                    lsQueue = local_storage_queue_1.LocalStorageQueue.create(config.id, config.name, config.reset);
                    if (lsQueue) {
                        this._logger.log("Created Local Storage queue for id " + config.id);
                        return [2 /*return*/, lsQueue];
                    }
                    return [2 /*return*/, indexeddb_queue_1.IndexedDBQueue.create(config.id, config.name, config.reset)
                            .then(function (queue) {
                            _this._logger.log("Created persistent queue for id " + config.id);
                            return queue;
                        })
                            .catch(function () {
                            _this._logger.log("Downgraded to memory queue for id " + config.id + ".");
                            return new queues_1.MemoryQueue(config.id);
                        })];
                }
                this._logger.log("Created memory queue for id " + config.id);
                return [2 /*return*/, new queues_1.MemoryQueue(config.id)];
            });
        });
    };
    BusBuilder.prototype.endpoint = function (config) {
        var configuration = config;
        if (config.type !== 'fe-analytic-collector') {
            this._logger.error("Endpoint type '" + config.type + "' is not supported");
        }
        return new endpoints_1.FEAnalyticsCollectorEndpoint(this.ajax(), new framework_1.TimeStampProvider(), this._logger, configuration, this._environment);
    };
    BusBuilder.prototype.ajax = function () {
        if (this._environment.fakeMode) {
            return new port_ajax_provider_1.PortAjaxProvider(this._context);
        }
        return new framework_1.Ajax();
    };
    return BusBuilder;
}());
exports.BusBuilder = BusBuilder;


/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(105));


/***/ }),
/* 105 */
/***/ (function(module, exports) {

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Implementation of queue for storing items in a memory
 *
 * @internal
 */
var MemoryQueue = /** @class */ (function () {
    function MemoryQueue(id) {
        this.id = id;
        this._array = [];
    }
    Object.defineProperty(MemoryQueue.prototype, "count", {
        get: function () {
            return this._array.length;
        },
        enumerable: true,
        configurable: true
    });
    MemoryQueue.prototype.enqueue = function (items) {
        (_a = this._array).push.apply(_a, __spread(items));
        var _a;
    };
    MemoryQueue.prototype.clear = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this._array.length = 0;
                return [2 /*return*/];
            });
        });
    };
    MemoryQueue.prototype.dequeue = function (count) {
        var length = this._array.length;
        count = Math.min(length, Math.max(count, 0));
        if (count <= 0) {
            return [];
        }
        return this._array.splice(0, count);
    };
    MemoryQueue.prototype.destroy = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.clear();
                return [2 /*return*/];
            });
        });
    };
    MemoryQueue.prototype.dispose = function () { };
    return MemoryQueue;
}());
exports.MemoryQueue = MemoryQueue;


/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = __webpack_require__(28);
var SampledQueueConfiguration = /** @class */ (function () {
    function SampledQueueConfiguration() {
        this.maxMessageCount = 15000;
    }
    return SampledQueueConfiguration;
}());
/**
 * Queue decorator for providing sampling of messages
 *
 * @internal
 * @class SampledQueue
 * @implements {IQueue<TItem>}
 * @template TItem
 */
var SampledQueue = /** @class */ (function () {
    function SampledQueue(queue, config) {
        if (config === void 0) { config = null; }
        this.queue = queue;
        this.config = new SampledQueueConfiguration();
        utils_1.override(this.config, config);
    }
    Object.defineProperty(SampledQueue.prototype, "id", {
        get: function () { return this.queue.id; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SampledQueue.prototype, "count", {
        get: function () { return this.queue.count; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SampledQueue.prototype, "size", {
        get: function () { return this.config.maxMessageCount; },
        enumerable: true,
        configurable: true
    });
    SampledQueue.prototype.enqueue = function (messages) {
        var freeCount = this.size - this.queue.count;
        if (freeCount <= 0) {
            return;
        }
        if (freeCount < messages.length) {
            messages = messages.slice(0, freeCount);
        }
        return this.queue.enqueue(messages);
    };
    SampledQueue.prototype.dequeue = function (count, avoidConcurrency) {
        return this.queue.dequeue(count, avoidConcurrency);
    };
    SampledQueue.prototype.destroy = function () {
        return this.queue.destroy();
    };
    SampledQueue.prototype.dispose = function () {
        return this.queue.dispose();
    };
    return SampledQueue;
}());
exports.SampledQueue = SampledQueue;


/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var indexeddb_utils_1 = __webpack_require__(44);
/**
 * Implementation of queue for storing items in a memory
 *
 * @internal
 */
var IndexedDBQueue = /** @class */ (function () {
    function IndexedDBQueue(id, _db) {
        this.id = id;
        this._db = _db;
        this._lastCount = 0;
    }
    IndexedDBQueue.create = function (id, name, clear) {
        return __awaiter(this, void 0, void 0, function () {
            var dbName, database, queue;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        dbName = 'mcjs:' + (name || id);
                        return [4 /*yield*/, indexeddb_utils_1.IndexedDbUtils.open(dbName, 1, function (db) {
                                if (!db.objectStoreNames.contains(IndexedDBQueue.storageName)) {
                                    db.createObjectStore(IndexedDBQueue.storageName, { autoIncrement: true });
                                }
                            })];
                    case 1:
                        database = _a.sent();
                        queue = new IndexedDBQueue(id, database);
                        if (!clear) return [3 /*break*/, 3];
                        return [4 /*yield*/, queue.clear()];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [2 /*return*/, queue];
                }
            });
        });
    };
    Object.defineProperty(IndexedDBQueue.prototype, "count", {
        get: function () {
            return this._lastCount;
        },
        enumerable: true,
        configurable: true
    });
    IndexedDBQueue.prototype.enqueue = function (items) {
        var _this = this;
        return this.transaction(function (storage) {
            indexeddb_utils_1.IndexedDbUtils.addArray(storage, items, function () { return _this.updateCount(storage); });
        }, undefined);
    };
    IndexedDBQueue.prototype.dequeue = function (count) {
        var _this = this;
        return this.transaction(function (storage, result) {
            var counter = 0;
            indexeddb_utils_1.IndexedDbUtils.request(storage.openCursor(), function (cursor) {
                if (cursor && (counter < count)) {
                    result.push(cursor.value);
                    cursor.delete();
                    counter++;
                    cursor.continue();
                }
                else {
                    _this.updateCount(storage);
                }
            });
        }, new Array());
    };
    IndexedDBQueue.prototype.destroy = function () {
        this.dispose();
        return indexeddb_utils_1.IndexedDbUtils.remove(this._db.name);
    };
    IndexedDBQueue.prototype.dispose = function () {
        this._db.close();
    };
    IndexedDBQueue.prototype.clear = function () {
        return this.transaction(function (storage) {
            storage.clear();
        }, undefined);
    };
    IndexedDBQueue.prototype.updateCount = function (storage) {
        var _this = this;
        var countRequest = storage.count();
        countRequest.onsuccess = function (e) {
            _this._lastCount = +e.target.result;
        };
    };
    IndexedDBQueue.prototype.open = function (mode) {
        if (mode === void 0) { mode = 'readwrite'; }
        return this._db.transaction([IndexedDBQueue.storageName], mode).objectStore(IndexedDBQueue.storageName);
    };
    IndexedDBQueue.prototype.transaction = function (action, result) {
        var _this = this;
        return indexeddb_utils_1.IndexedDbUtils.transaction(function () { return _this.open(); }, action, result);
    };
    IndexedDBQueue.storageName = 'messages';
    return IndexedDBQueue;
}());
exports.IndexedDBQueue = IndexedDBQueue;


/***/ }),
/* 108 */
/***/ (function(module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
var IndexedDBProvider = /** @class */ (function () {
    function IndexedDBProvider() {
    }
    /* istanbul ignore next */
    IndexedDBProvider.getIndexedDB = function () {
        /* istanbul ignore if */
        if (typeof indexedDB !== 'undefined') {
            return indexedDB;
        }
        /* istanbul ignore if */
        if (typeof mozIndexedDB !== 'undefined') {
            return mozIndexedDB;
        }
        /* istanbul ignore if */
        if (typeof webkitIndexedDB !== 'undefined') {
            return webkitIndexedDB;
        }
        /* istanbul ignore if */
        if (typeof msIndexedDB !== 'undefined') {
            return msIndexedDB;
        }
        return undefined;
    };
    IndexedDBProvider.isSupported = function () {
        return !!IndexedDBProvider.getIndexedDB();
    };
    return IndexedDBProvider;
}());
exports.IndexedDBProvider = IndexedDBProvider;


/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
Object.defineProperty(exports, "__esModule", { value: true });
var webstorage_1 = __webpack_require__(29);
var index_1 = __webpack_require__(43);
var local_storage_key_value_1 = __webpack_require__(110);
var local_storage_key_value_cache_1 = __webpack_require__(112);
/**
 * Implementation of queue for storing items in a LocalStorage
 *
 * @internal
 */
var LocalStorageQueue = /** @class */ (function () {
    function LocalStorageQueue(id, _storage) {
        this.id = id;
        this._storage = _storage;
        this._memory = new index_1.MemoryQueue(id);
    }
    LocalStorageQueue.create = function (id, name, clear) {
        if (clear === void 0) { clear = false; }
        var localStorage = webstorage_1.WebStorages.localStorage;
        if (!localStorage) {
            return null;
        }
        var storage = new local_storage_key_value_1.LocalStorageKeyValue((name || id) + '', localStorage);
        var cache = new local_storage_key_value_cache_1.LocalStorageKeyValueCache(storage);
        if (clear) {
            storage.clear();
        }
        return new LocalStorageQueue(id, cache);
    };
    Object.defineProperty(LocalStorageQueue.prototype, "count", {
        get: function () {
            return this._memory.count + this._storage.length();
        },
        enumerable: true,
        configurable: true
    });
    LocalStorageQueue.prototype.enqueue = function (items) {
        try {
            for (var items_1 = __values(items), items_1_1 = items_1.next(); !items_1_1.done; items_1_1 = items_1.next()) {
                var item = items_1_1.value;
                var key = item.id;
                if (!this._storage.setItem(key, item)) {
                    this._memory.enqueue([item]);
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (items_1_1 && !items_1_1.done && (_a = items_1.return)) _a.call(items_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        var e_1, _a;
    };
    LocalStorageQueue.prototype.clear = function () {
        this._storage.clear();
    };
    LocalStorageQueue.prototype.dequeue = function (count, avoidConcurrency) {
        var result = this._memory.dequeue(count);
        if (result.length >= count) {
            return result;
        }
        else {
            count = count - result.length;
        }
        if (!avoidConcurrency) {
            var storage = this._storage;
            var dequeuedKeys = new Array();
            var counter = 0;
            try {
                for (var _a = __values(storage.enumerate()), _b = _a.next(); !_b.done; _b = _a.next()) {
                    var item = _b.value;
                    var value = item.value;
                    if (value) {
                        result.push(value);
                        dequeuedKeys.push(item.key);
                        counter++;
                    }
                    if (counter >= count) {
                        break;
                    }
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                }
                finally { if (e_2) throw e_2.error; }
            }
            try {
                for (var dequeuedKeys_1 = __values(dequeuedKeys), dequeuedKeys_1_1 = dequeuedKeys_1.next(); !dequeuedKeys_1_1.done; dequeuedKeys_1_1 = dequeuedKeys_1.next()) {
                    var key = dequeuedKeys_1_1.value;
                    storage.removeItem(key);
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (dequeuedKeys_1_1 && !dequeuedKeys_1_1.done && (_d = dequeuedKeys_1.return)) _d.call(dequeuedKeys_1);
                }
                finally { if (e_3) throw e_3.error; }
            }
        }
        return result;
        var e_2, _c, e_3, _d;
    };
    LocalStorageQueue.prototype.destroy = function () {
        this.dispose();
        this.clear();
    };
    LocalStorageQueue.prototype.dispose = function () {
        this._memory.dispose();
    };
    return LocalStorageQueue;
}());
exports.LocalStorageQueue = LocalStorageQueue;


/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
Object.defineProperty(exports, "__esModule", { value: true });
var storage_key_1 = __webpack_require__(111);
/**
 * Key-Value storage based on Storage and implemented low level operations
 */
var LocalStorageKeyValue = /** @class */ (function () {
    function LocalStorageKeyValue(queueId, _storage) {
        this.queueId = queueId;
        this._storage = _storage;
    }
    LocalStorageKeyValue.prototype.length = function () {
        var counter = 0;
        var keys = this.keys();
        while (!keys.next().done) {
            counter++;
        }
        return counter;
    };
    LocalStorageKeyValue.prototype.clear = function () {
        try {
            for (var _a = __values(this.keys()), _b = _a.next(); !_b.done; _b = _a.next()) {
                var key = _b.value;
                this._storage.removeItem(key.value());
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
            }
            finally { if (e_1) throw e_1.error; }
        }
        var e_1, _c;
    };
    LocalStorageKeyValue.prototype.has = function (key) {
        var sKey = new storage_key_1.StorageKey(this.queueId, key).value();
        return !!this._storage.getItem(sKey);
    };
    LocalStorageKeyValue.prototype.getItem = function (key) {
        var sKey = new storage_key_1.StorageKey(this.queueId, key).value();
        var value = this._storage.getItem(sKey);
        return this.toObject(value, sKey);
    };
    LocalStorageKeyValue.prototype.removeItem = function (key) {
        var sKey = new storage_key_1.StorageKey(this.queueId, key).value();
        this._storage.removeItem(sKey);
    };
    LocalStorageKeyValue.prototype.setItem = function (key, data) {
        var sKey = new storage_key_1.StorageKey(this.queueId, key).value();
        var value = JSON.stringify(data);
        try {
            this._storage.setItem(sKey, value);
            return true;
        }
        catch (_a) {
            return false;
        }
    };
    LocalStorageKeyValue.prototype.enumerate = function () {
        var _a, _b, key, sKey, value, e_2_1, e_2, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _d.trys.push([0, 5, 6, 7]);
                    _a = __values(this.keys()), _b = _a.next();
                    _d.label = 1;
                case 1:
                    if (!!_b.done) return [3 /*break*/, 4];
                    key = _b.value;
                    sKey = key.value();
                    value = this.toObject(this._storage.getItem(sKey), sKey);
                    if (!value) return [3 /*break*/, 3];
                    return [4 /*yield*/, { value: value, key: key.key }];
                case 2:
                    _d.sent();
                    _d.label = 3;
                case 3:
                    _b = _a.next();
                    return [3 /*break*/, 1];
                case 4: return [3 /*break*/, 7];
                case 5:
                    e_2_1 = _d.sent();
                    e_2 = { error: e_2_1 };
                    return [3 /*break*/, 7];
                case 6:
                    try {
                        if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                    }
                    finally { if (e_2) throw e_2.error; }
                    return [7 /*endfinally*/];
                case 7: return [2 /*return*/];
            }
        });
    };
    LocalStorageKeyValue.prototype.toObject = function (value, sKey) {
        if (!value) {
            return null;
        }
        try {
            return JSON.parse(value);
        }
        catch (_a) {
            this._storage.removeItem(sKey);
        }
        return null;
    };
    LocalStorageKeyValue.prototype.keys = function () {
        var storage, map, i, key, sKey;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    storage = this._storage;
                    map = new Map();
                    i = storage.length - 1;
                    _a.label = 1;
                case 1:
                    if (!(i >= 0)) return [3 /*break*/, 4];
                    if (i >= storage.length) {
                        i = storage.length - 1;
                    }
                    key = storage.key(i);
                    if (!key) return [3 /*break*/, 3];
                    sKey = storage_key_1.StorageKey.parse(key);
                    if (!(sKey && sKey.queue === this.queueId && !map.has(key))) return [3 /*break*/, 3];
                    map.set(key, undefined);
                    return [4 /*yield*/, sKey];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    i--;
                    return [3 /*break*/, 1];
                case 4:
                    map.clear();
                    return [2 /*return*/];
            }
        });
    };
    return LocalStorageKeyValue;
}());
exports.LocalStorageKeyValue = LocalStorageKeyValue;


/***/ }),
/* 111 */
/***/ (function(module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
var StorageKey = /** @class */ (function () {
    function StorageKey(queue, key) {
        this.queue = queue;
        this.key = key;
    }
    StorageKey.parse = function (value) {
        if (value && (value.indexOf(StorageKey.prefix, 0) === 0)) {
            var queueMath = StorageKey.regex.queue.exec(value);
            var keyMath = StorageKey.regex.key.exec(value);
            if (queueMath && keyMath) {
                var sKey = new StorageKey(queueMath[1], keyMath[1]);
                sKey._key = value;
                return sKey;
            }
        }
        return null;
    };
    StorageKey.prototype.value = function () {
        return this._key || (this._key = StorageKey.prefix + "?q=" + encodeURIComponent(this.queue) + "&k=" + encodeURIComponent(this.key));
    };
    StorageKey.prefix = 'mcjs';
    StorageKey.regex = {
        queue: /q=([\w-]+)/,
        key: /k=([\w-]+)/
    };
    return StorageKey;
}());
exports.StorageKey = StorageKey;


/***/ }),
/* 112 */
/***/ (function(module, exports) {

var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
Object.defineProperty(exports, "__esModule", { value: true });
var LocalStorageKeyValueCache = /** @class */ (function () {
    function LocalStorageKeyValueCache(_storage) {
        this._storage = _storage;
        this._cache = new Map();
        this._length = 0;
        this._updateLength = true;
    }
    LocalStorageKeyValueCache.prototype.length = function () {
        if (this._updateLength) {
            this._length = this._storage.length();
            this._updateLength = false;
        }
        return this._length;
    };
    LocalStorageKeyValueCache.prototype.clear = function () {
        this._storage.clear();
        this._cache.clear();
        this._updateLength = true;
    };
    LocalStorageKeyValueCache.prototype.has = function (key) {
        return this._storage.has(key);
    };
    LocalStorageKeyValueCache.prototype.getItem = function (key) {
        if (!this._storage.has(key)) {
            this._cache.delete(key);
            return null;
        }
        var value = this._cache.get(key);
        if (!value) {
            value = this._storage.getItem(key);
            this._cache.set(key, value);
        }
        return value;
    };
    LocalStorageKeyValueCache.prototype.removeItem = function (key) {
        this._storage.removeItem(key);
        this._cache.delete(key);
        this._length--;
    };
    LocalStorageKeyValueCache.prototype.setItem = function (key, data) {
        var success = this._storage.setItem(key, data);
        if (success) {
            this._cache.set(key, data);
            this._updateLength = true;
        }
        return success;
    };
    LocalStorageKeyValueCache.prototype.enumerate = function () {
        var _a, _b, key, value, e_1_1, _c, _d, item, key, e_2_1, e_1, _e, e_2, _f;
        return __generator(this, function (_g) {
            switch (_g.label) {
                case 0:
                    _g.trys.push([0, 5, 6, 7]);
                    _a = __values(this._cache.keys()), _b = _a.next();
                    _g.label = 1;
                case 1:
                    if (!!_b.done) return [3 /*break*/, 4];
                    key = _b.value;
                    value = this.getItem(key);
                    if (!value) return [3 /*break*/, 3];
                    return [4 /*yield*/, {
                            key: key,
                            value: value
                        }];
                case 2:
                    _g.sent();
                    _g.label = 3;
                case 3:
                    _b = _a.next();
                    return [3 /*break*/, 1];
                case 4: return [3 /*break*/, 7];
                case 5:
                    e_1_1 = _g.sent();
                    e_1 = { error: e_1_1 };
                    return [3 /*break*/, 7];
                case 6:
                    try {
                        if (_b && !_b.done && (_e = _a.return)) _e.call(_a);
                    }
                    finally { if (e_1) throw e_1.error; }
                    return [7 /*endfinally*/];
                case 7:
                    _g.trys.push([7, 12, 13, 14]);
                    _c = __values(this._storage.enumerate()), _d = _c.next();
                    _g.label = 8;
                case 8:
                    if (!!_d.done) return [3 /*break*/, 11];
                    item = _d.value;
                    key = item.key;
                    if (!!this._cache.has(key)) return [3 /*break*/, 10];
                    return [4 /*yield*/, item];
                case 9:
                    _g.sent();
                    _g.label = 10;
                case 10:
                    _d = _c.next();
                    return [3 /*break*/, 8];
                case 11: return [3 /*break*/, 14];
                case 12:
                    e_2_1 = _g.sent();
                    e_2 = { error: e_2_1 };
                    return [3 /*break*/, 14];
                case 13:
                    try {
                        if (_d && !_d.done && (_f = _c.return)) _f.call(_c);
                    }
                    finally { if (e_2) throw e_2.error; }
                    return [7 /*endfinally*/];
                case 14: return [2 /*return*/];
            }
        });
    };
    return LocalStorageKeyValueCache;
}());
exports.LocalStorageKeyValueCache = LocalStorageKeyValueCache;


/***/ }),
/* 113 */
/***/ (function(module, exports) {

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @internal
 */
var BatchAuditProvider = /** @class */ (function () {
    function BatchAuditProvider() {
    }
    BatchAuditProvider.prototype.audit = function (batch, repo) {
        return __awaiter(this, void 0, void 0, function () {
            var stat;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, repo.update(function (pipeStats) {
                            stat = {
                                cid: pipeStats.statistic.clientId,
                                qid: pipeStats.statistic.queueId,
                                bi: pipeStats.statistic.batchIndex,
                                tmc: pipeStats.statistic.totalMessageCount,
                                trec: pipeStats.statistic.totalRequestErrorCount,
                                qmc: pipeStats.state.queueMessageCount,
                                qs: pipeStats.state.queueSize,
                                rec: pipeStats.statistic.requestErrorCount,
                                bmc: batch.envelops.length,
                            };
                            pipeStats.statistic.requestErrorCount = 0;
                        })];
                    case 1:
                        _a.sent();
                        if (!stat) {
                            throw new Error('Statistic was not filled.');
                        }
                        return [2 /*return*/, stat];
                }
            });
        });
    };
    return BatchAuditProvider;
}());
exports.BatchAuditProvider = BatchAuditProvider;


/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var batch_reporter_1 = __webpack_require__(115);
var perfstamp_1 = __webpack_require__(73);
//////////
var PipePerformanceAuditorBuilder = /** @class */ (function () {
    function PipePerformanceAuditorBuilder() {
    }
    PipePerformanceAuditorBuilder.create = function (send, sender) {
        return new PipePerformanceAuditor(send ? sender : undefined);
    };
    return PipePerformanceAuditorBuilder;
}());
exports.PipePerformanceAuditorBuilder = PipePerformanceAuditorBuilder;
var PipePerformanceAuditor = /** @class */ (function () {
    function PipePerformanceAuditor(_sender) {
        this._sender = _sender;
    }
    PipePerformanceAuditor.prototype.start = function (queue) {
        if (this._sender) {
            /////////////////////////////////////
            return new PerformanceBatchAuditor(this._sender);
            //////////////////////
        }
        return new DummyAuditor();
    };
    return PipePerformanceAuditor;
}());
var DummyAuditor = /** @class */ (function () {
    function DummyAuditor() {
    }
    DummyAuditor.prototype.dequeued = function (bach) { };
    DummyAuditor.prototype.sent = function () { };
    DummyAuditor.prototype.confirmed = function (result) { };
    DummyAuditor.prototype.ended = function () { };
    return DummyAuditor;
}());
/////////////////////////
var PerformanceBatchAuditor = /** @class */ (function () {
    function PerformanceBatchAuditor(_sender) {
        this._sender = _sender;
        this._audit = {
            dequeuedAt: new perfstamp_1.Perfstamp()
        };
    }
    PerformanceBatchAuditor.prototype.dequeued = function (batch) {
        this._batch = batch;
    };
    PerformanceBatchAuditor.prototype.sent = function () {
        this._audit.sentAt = new perfstamp_1.Perfstamp();
    };
    PerformanceBatchAuditor.prototype.confirmed = function (result) {
        this._audit.confirmedAt = new perfstamp_1.Perfstamp();
        this._audit.result = result;
    };
    PerformanceBatchAuditor.prototype.ended = function () {
        this._audit.endedAt = new perfstamp_1.Perfstamp();
        if (this._batch) {
            var report = new batch_reporter_1.BatchReporter(this._batch, this._audit).report();
            this._sender.batch(report);
        }
    };
    return PerformanceBatchAuditor;
}());
//////////


/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var calc_methods_1 = __webpack_require__(72);
var BatchReporter = /** @class */ (function () {
    function BatchReporter(_batch, _audit) {
        this._batch = _batch;
        this._audit = _audit;
    }
    BatchReporter.prototype.report = function () {
        var batch = this._batch;
        var audit = this._audit;
        if (!audit.dequeuedAt || !audit.confirmedAt || !audit.sentAt || !audit.endedAt) {
            throw new Error('Error on report collecting. Some data is missing.');
        }
        return {
            batch: {
                index: batch.index,
                result: audit.result
            },
            batchingDuration: calc_methods_1.duration(audit.dequeuedAt, audit.sentAt),
            confirmationDuration: calc_methods_1.duration(audit.confirmedAt, audit.endedAt)
        };
    };
    return BatchReporter;
}());
exports.BatchReporter = BatchReporter;


/***/ }),
/* 116 */
/***/ (function(module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
var PipeStatisticAuditor = /** @class */ (function () {
    function PipeStatisticAuditor(_stats) {
        this._stats = _stats;
    }
    PipeStatisticAuditor.prototype.start = function (queue) {
        return new BatchStatisticAuditor(this._stats.get(queue));
    };
    return PipeStatisticAuditor;
}());
exports.PipeStatisticAuditor = PipeStatisticAuditor;
var BatchStatisticAuditor = /** @class */ (function () {
    function BatchStatisticAuditor(stats) {
        this.stats = stats;
    }
    BatchStatisticAuditor.prototype.result = function (success) {
        return this.stats.update(function (stats) {
            var statistic = stats.statistic;
            if (!success) {
                statistic.requestErrorCount++;
                statistic.totalRequestErrorCount++;
            }
            statistic.lastSendingSuccess = success;
        });
    };
    return BatchStatisticAuditor;
}());


/***/ }),
/* 117 */
/***/ (function(module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Sender audit data to main thread
 *
 * @internal
 */
var WorkerAuditSender = /** @class */ (function () {
    function WorkerAuditSender(_context) {
        this._context = _context;
    }
    WorkerAuditSender.prototype.batch = function (report) {
        this._context.sender.postMessage({ type: 'performance', report: { type: 'batch', data: report } });
    };
    WorkerAuditSender.prototype.messages = function (report) {
        this._context.sender.postMessage({ type: 'performance', report: { type: 'messages', data: report } });
    };
    return WorkerAuditSender;
}());
exports.WorkerAuditSender = WorkerAuditSender;


/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = __webpack_require__(8);
var batch_1 = __webpack_require__(71);
/**
 * Class define default values for configurations
 *
 * @internal
 */
var BatchBuilderConfiguration = /** @class */ (function () {
    function BatchBuilderConfiguration() {
        this.batchSize = 50;
    }
    return BatchBuilderConfiguration;
}());
var BatchBuilder = /** @class */ (function () {
    function BatchBuilder(queue, _batchStorage, _batchDropStrategy, _auditProvider, _auditor, config) {
        if (config === void 0) { config = null; }
        this.queue = queue;
        this._batchStorage = _batchStorage;
        this._batchDropStrategy = _batchDropStrategy;
        this._auditProvider = _auditProvider;
        this._auditor = _auditor;
        this._config = new BatchBuilderConfiguration();
        index_1.override(this._config, config);
    }
    BatchBuilder.prototype.next = function (avoidConcurrency) {
        if (avoidConcurrency === void 0) { avoidConcurrency = false; }
        return __awaiter(this, void 0, void 0, function () {
            var auditor, consumation;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        auditor = this._auditor.start(this.queue);
                        return [4 /*yield*/, this.batch(auditor.stats, avoidConcurrency)];
                    case 1:
                        consumation = _a.sent();
                        if (!consumation) {
                            return [2 /*return*/, undefined];
                        }
                        return [2 /*return*/, new BatchConsumation(consumation, auditor, this._batchDropStrategy)];
                }
            });
        });
    };
    BatchBuilder.prototype.destroy = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._batchStorage.destroy()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.queue.destroy()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    BatchBuilder.prototype.batch = function (repo, avoidConcurrency) {
        var _this = this;
        return this._batchStorage.append(function () { return __awaiter(_this, void 0, void 0, function () {
            var envelops, batch, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.queue.dequeue(this._config.batchSize, avoidConcurrency)];
                    case 1:
                        envelops = _b.sent();
                        if (!envelops.length) {
                            return [2 /*return*/, undefined];
                        }
                        return [4 /*yield*/, repo.update(function (stats) {
                                return new batch_1.Batch(envelops, ++stats.statistic.batchIndex);
                            })];
                    case 2:
                        batch = _b.sent();
                        _a = batch;
                        return [4 /*yield*/, this._auditProvider.audit(batch, repo)];
                    case 3:
                        _a.audits = _b.sent();
                        return [2 /*return*/, batch];
                }
            });
        }); }, avoidConcurrency);
    };
    return BatchBuilder;
}());
exports.BatchBuilder = BatchBuilder;
var BatchConsumation = /** @class */ (function () {
    function BatchConsumation(_consumption, _auditor, _batchDropStrategy) {
        this._consumption = _consumption;
        this._auditor = _auditor;
        this._batchDropStrategy = _batchDropStrategy;
    }
    Object.defineProperty(BatchConsumation.prototype, "batch", {
        get: function () {
            return this._consumption.batch;
        },
        enumerable: true,
        configurable: true
    });
    BatchConsumation.prototype.ack = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._auditor.result(true)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this._consumption.ack()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    BatchConsumation.prototype.nack = function () {
        return __awaiter(this, void 0, void 0, function () {
            var stats;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.batch.errorCount++;
                        return [4 /*yield*/, this._auditor.result(false)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this._auditor.stats.read()];
                    case 2:
                        stats = _a.sent();
                        if (!this._batchDropStrategy.shouldBeDropped(stats, this.batch)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this._consumption.ack()];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 6];
                    case 4: return [4 /*yield*/, this._consumption.nack()];
                    case 5:
                        _a.sent();
                        _a.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    return BatchConsumation;
}());
exports.BatchConsumation = BatchConsumation;


/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = __webpack_require__(8);
var DefaultBatchDropStrategyConfiguration = /** @class */ (function () {
    function DefaultBatchDropStrategyConfiguration() {
        this.fillThreshold = 0.6;
        this.attemptCount = 2;
    }
    return DefaultBatchDropStrategyConfiguration;
}());
var DefaultBatchDropStrategy = /** @class */ (function () {
    function DefaultBatchDropStrategy(config) {
        this._config = new DefaultBatchDropStrategyConfiguration();
        index_1.override(this._config, config);
    }
    DefaultBatchDropStrategy.prototype.shouldBeDropped = function (pipeStats, batch) {
        var state = pipeStats.state;
        var config = this._config;
        return batch.errorCount >= config.attemptCount
            && (state.queueMessageCount / state.queueSize) > config.fillThreshold;
    };
    return DefaultBatchDropStrategy;
}());
exports.DefaultBatchDropStrategy = DefaultBatchDropStrategy;


/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var indexeddb_utils_1 = __webpack_require__(44);
var BatchIndexedDBStorage = /** @class */ (function () {
    function BatchIndexedDBStorage(id, _syncTime, _db) {
        this.id = id;
        this._syncTime = _syncTime;
        this._db = _db;
    }
    BatchIndexedDBStorage.create = function (id, synchronizationTime, name, clear) {
        return __awaiter(this, void 0, void 0, function () {
            var database, storage;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, BatchIndexedDBStorage.db(id, name)];
                    case 1:
                        database = _a.sent();
                        storage = new BatchIndexedDBStorage(id, synchronizationTime, database);
                        if (!clear) return [3 /*break*/, 3];
                        return [4 /*yield*/, storage.clear()];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [2 /*return*/, storage];
                }
            });
        });
    };
    BatchIndexedDBStorage.db = function (id, name) {
        var dbName = 'mcjs-batch:' + (name || id);
        return indexeddb_utils_1.IndexedDbUtils.open(dbName, 1, function (db) {
            if (!db.objectStoreNames.contains(BatchIndexedDBStorage.storageName)) {
                db.createObjectStore(BatchIndexedDBStorage.storageName, { keyPath: 'batch' + '.' + 'index' });
            }
        });
    };
    BatchIndexedDBStorage.prototype.append = function (create) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var batch, batchIndex_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.read()];
                    case 1:
                        batch = _a.sent();
                        if (!!batch) return [3 /*break*/, 4];
                        return [4 /*yield*/, create()];
                    case 2:
                        batch = _a.sent();
                        if (!batch) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.save(batch)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        if (batch) {
                            batchIndex_1 = batch.index;
                            return [2 /*return*/, {
                                    batch: batch,
                                    ack: function () { return _this.reset(batchIndex_1); },
                                    nack: function () { return _this.avoidAccess(batchIndex_1); }
                                }];
                        }
                        return [2 /*return*/, undefined];
                }
            });
        });
    };
    BatchIndexedDBStorage.prototype.clear = function () {
        return this.transaction(function (storage) {
            storage.clear();
        }, undefined);
    };
    BatchIndexedDBStorage.prototype.destroy = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this._db.close();
                return [2 /*return*/, indexeddb_utils_1.IndexedDbUtils.remove(this._db.name).catch()];
            });
        });
    };
    BatchIndexedDBStorage.prototype.reset = function (index) {
        return this.remove(index);
    };
    BatchIndexedDBStorage.prototype.read = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var readResult, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this._recovery) {
                            return [2 /*return*/, this._recovery];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.transaction(function (storage, result) {
                                indexeddb_utils_1.IndexedDbUtils.request(storage.openCursor(), function (cursor) {
                                    if (cursor) {
                                        var data = cursor.value;
                                        if (data && _this.isNotBlocked(data)) {
                                            cursor.update(data);
                                            result.batch = data.batch;
                                        }
                                        else {
                                            cursor.continue();
                                        }
                                    }
                                });
                            }, { batch: undefined })];
                    case 2:
                        readResult = _a.sent();
                        return [2 /*return*/, readResult.batch];
                    case 3:
                        error_1 = _a.sent();
                        this.error('Error on reading.', error_1);
                        return [2 /*return*/, undefined];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    BatchIndexedDBStorage.prototype.save = function (batch) {
        return __awaiter(this, void 0, void 0, function () {
            var error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.transaction(function (storage) {
                                indexeddb_utils_1.IndexedDbUtils.request(storage.add({
                                    batch: batch,
                                    lastAccess: +new Date()
                                }));
                            }, undefined)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        error_2 = _a.sent();
                        this._recovery = batch;
                        this.error('Error on saving.', error_2);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    BatchIndexedDBStorage.prototype.remove = function (batchIndex) {
        return __awaiter(this, void 0, void 0, function () {
            var error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this._recovery && this._recovery.index === batchIndex) {
                            this._recovery = undefined;
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.transaction(function (storage) {
                                indexeddb_utils_1.IndexedDbUtils.request(storage.delete(batchIndex));
                            }, undefined)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_3 = _a.sent();
                        this.error('Error on removing.', error_3);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    BatchIndexedDBStorage.prototype.avoidAccess = function (batchIndex) {
        return __awaiter(this, void 0, void 0, function () {
            var error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.transaction(function (storage) {
                                indexeddb_utils_1.IndexedDbUtils.request(storage.get(batchIndex), function (data) {
                                    data.lastAccess = undefined;
                                    storage.put(data);
                                });
                            }, undefined)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        error_4 = _a.sent();
                        this.error('Error on access avoiding.', error_4);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    BatchIndexedDBStorage.prototype.open = function (mode) {
        return this._db.transaction([BatchIndexedDBStorage.storageName], mode).objectStore(BatchIndexedDBStorage.storageName);
    };
    BatchIndexedDBStorage.prototype.transaction = function (action, result, mode) {
        var _this = this;
        if (mode === void 0) { mode = 'readwrite'; }
        return indexeddb_utils_1.IndexedDbUtils.transaction(function () { return _this.open(mode); }, action, result);
    };
    BatchIndexedDBStorage.prototype.isNotBlocked = function (data) {
        if (this._syncTime) {
            var now = +new Date();
            if (data.lastAccess && Math.abs(now - data.lastAccess) < this._syncTime) {
                return false;
            }
            data.lastAccess = now;
        }
        return true;
    };
    BatchIndexedDBStorage.prototype.error = function (message, error) {
        if (this.logger) {
            this.logger.error('[IndexedDb BS]:' + message, error);
        }
    };
    BatchIndexedDBStorage.storageName = 'batch';
    return BatchIndexedDBStorage;
}());
exports.BatchIndexedDBStorage = BatchIndexedDBStorage;


/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var webstorage_1 = __webpack_require__(29);
var BatchLocalStorageStorage = /** @class */ (function () {
    function BatchLocalStorageStorage(key, _storage) {
        this.key = key;
        this._storage = _storage;
    }
    BatchLocalStorageStorage.create = function (id, name, clear) {
        if (!webstorage_1.WebStorages.localStorage) {
            return undefined;
        }
        var storage = new BatchLocalStorageStorage('mcjs-batch:' + (name || id), webstorage_1.WebStorages.localStorage);
        if (clear) {
            storage.clear();
        }
        return storage;
    };
    BatchLocalStorageStorage.prototype.append = function (create, avoidConcurrancy) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var batch, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        batch = this._cache || (avoidConcurrancy ? undefined : this.read());
                        if (!!batch) return [3 /*break*/, 2];
                        _a = this;
                        return [4 /*yield*/, create()];
                    case 1:
                        batch = _a._cache = _b.sent();
                        if (batch && !avoidConcurrancy) {
                            this.save(batch);
                        }
                        _b.label = 2;
                    case 2:
                        if (batch) {
                            return [2 /*return*/, {
                                    batch: batch,
                                    ack: function () {
                                        _this._cache = undefined;
                                        if (!avoidConcurrancy) {
                                            _this.reset();
                                        }
                                    },
                                    nack: function () { }
                                }];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    BatchLocalStorageStorage.prototype.clear = function () {
        this.reset();
    };
    BatchLocalStorageStorage.prototype.destroy = function () {
        this.clear();
    };
    BatchLocalStorageStorage.prototype.read = function () {
        try {
            var str = this._storage.getItem(this.key);
            if (str) {
                try {
                    return JSON.parse(str);
                }
                catch (_a) {
                    this._storage.removeItem(this.key);
                }
            }
        }
        catch (error) {
            this.log('Error on reading', error);
        }
        return undefined;
    };
    BatchLocalStorageStorage.prototype.save = function (batch) {
        try {
            var str = JSON.stringify(batch);
            this._storage.setItem(this.key, str);
        }
        catch (error) {
            this.log('Error on saving', error);
        }
    };
    BatchLocalStorageStorage.prototype.reset = function () {
        try {
            this._storage.removeItem(this.key);
        }
        catch (error) {
            this.log('Error on reseting', error);
        }
    };
    BatchLocalStorageStorage.prototype.log = function (message, error) {
        if (this.logger) {
            this.logger.error('[LStorage BS]:' + message, error);
        }
    };
    return BatchLocalStorageStorage;
}());
exports.BatchLocalStorageStorage = BatchLocalStorageStorage;


/***/ }),
/* 122 */
/***/ (function(module, exports) {

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var BatchMemoryStorage = /** @class */ (function () {
    function BatchMemoryStorage() {
    }
    BatchMemoryStorage.prototype.append = function (create) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!!this._batch) return [3 /*break*/, 2];
                        _a = this;
                        return [4 /*yield*/, create()];
                    case 1:
                        _a._batch = _b.sent();
                        _b.label = 2;
                    case 2:
                        if (!this._batch) {
                            return [2 /*return*/, undefined];
                        }
                        return [2 /*return*/, {
                                batch: this._batch,
                                ack: function () { return _this._batch = undefined; },
                                nack: function () { }
                            }];
                }
            });
        });
    };
    BatchMemoryStorage.prototype.clear = function () {
        this._batch = undefined;
    };
    BatchMemoryStorage.prototype.destroy = function () {
        this.clear();
    };
    return BatchMemoryStorage;
}());
exports.BatchMemoryStorage = BatchMemoryStorage;


/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(124));


/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
Object.defineProperty(exports, "__esModule", { value: true });
var framework_1 = __webpack_require__(8);
var version_1 = __webpack_require__(125);
/**
 * Default values for configurations
 *
 * @internal
 * @class FEAnalyticsCollectorConfiguration
 * @implements {IFEAnalyticsCollectorConfiguration}
 */
var FEAnalyticsCollectorConfiguration = /** @class */ (function () {
    function FEAnalyticsCollectorConfiguration() {
        this.timeout = 2000;
        this.auditApiKey = 'fe-data';
    }
    /**
     * Formal validation of current configuration
     *
     * @memberof FEAnalyticsCollectorConfiguration
     */
    FEAnalyticsCollectorConfiguration.prototype.validate = function (logger) {
        if (!this.url) {
            var message = 'Url for FE Analytics Collector is not setted';
            logger.fatal(message);
            throw new Error(message);
        }
    };
    return FEAnalyticsCollectorConfiguration;
}());
/**
 * Real messages sender to BE servers
 *
 * @internal
 * @link https://confluence.agoda.local/display/ADPMES/FE+Analytics+Collectors+Format
 * @class PortEndpoint
 */
var FEAnalyticsCollectorEndpoint = /** @class */ (function () {
    function FEAnalyticsCollectorEndpoint(_ajax, _timestamp, _logger, config, environment) {
        this._ajax = _ajax;
        this._timestamp = _timestamp;
        this._config = new FEAnalyticsCollectorConfiguration();
        framework_1.override(this._config, config);
        this._config.validate(_logger);
        this._serializer = new EnvelopSerializer(environment.apiKey);
    }
    FEAnalyticsCollectorEndpoint.prototype.send = function (batch) {
        var body = this.serialize(batch);
        return this._ajax.send({
            type: 'POST',
            url: this._config.url + "/v2_1?p=js&v=" + encodeURIComponent(version_1.Version) + "&t=" + this._timestamp.now(),
            body: body,
            timeout: this._config.timeout
        });
    };
    FEAnalyticsCollectorEndpoint.prototype.serialize = function (batch) {
        var lines = this.audit(batch);
        lines += "\n\n{}\n";
        try {
            for (var _a = __values(batch.envelops), _b = _a.next(); !_b.done; _b = _a.next()) {
                var envelop = _b.value;
                lines += this._serializer.serialize(envelop) + '\n';
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return lines;
        var e_1, _c;
    };
    FEAnalyticsCollectorEndpoint.prototype.audit = function (batch) {
        return JSON.stringify(batch.audits || {});
    };
    return FEAnalyticsCollectorEndpoint;
}());
exports.FEAnalyticsCollectorEndpoint = FEAnalyticsCollectorEndpoint;
var EnvelopSerializer = /** @class */ (function () {
    function EnvelopSerializer(_apiKey) {
        this._apiKey = _apiKey;
        this.valueFilter = function (key, value) {
            if (value === null
                || (typeof value === 'number' && isNaN(value))) {
                return undefined;
            }
            return value;
        };
    }
    EnvelopSerializer.prototype.serialize = function (envelop) {
        var parts = new Array();
        parts.push((envelop.timestamp || 0).toString()); // timeStamp
        parts.push(this._apiKey); // apikey
        parts.push(envelop.name); // message_name
        parts.push(''); // partition_key
        parts.push(this.type(envelop)); // message type
        parts.push(envelop.id); // uuid
        parts.push(JSON.stringify(envelop.message, this.valueFilter)); // payload
        return parts.join(',');
    };
    EnvelopSerializer.prototype.type = function (envelop) {
        var index = EnvelopSerializer.MessageTypes[envelop.type];
        index = index === undefined ? EnvelopSerializer.MessageTypes['default'] : index;
        return index.toString();
    };
    EnvelopSerializer.MessageTypes = {
        measurement: 0,
        log: 2,
        default: 1
    };
    return EnvelopSerializer;
}());


/***/ }),
/* 125 */
/***/ (function(module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Version of the library
 *
 * This file is edited in TeamCity server before each build.
 *
 * @internal
 */
exports.Version = '0.0.1';


/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = __webpack_require__(8);
/**
 * Class define deafult values for configurations
 *
 * @internal
 */
var FlushTimeConfiguration = /** @class */ (function () {
    function FlushTimeConfiguration() {
        this.flushTime = 1000;
        this.maxFlushTime = 30000;
    }
    return FlushTimeConfiguration;
}());
var DynamicFlushTimeStrategy = /** @class */ (function () {
    function DynamicFlushTimeStrategy(_repo, config) {
        if (config === void 0) { config = null; }
        this._repo = _repo;
        this.config = config;
        this._config = new FlushTimeConfiguration();
        index_1.override(this._config, config);
        this._lastFlushTime = this._config.flushTime;
    }
    DynamicFlushTimeStrategy.prototype.duration = function () {
        return __awaiter(this, void 0, void 0, function () {
            var stats, flushTime, factor;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._repo.read()];
                    case 1:
                        stats = _a.sent();
                        if (!stats.statistic.lastSendingSuccess) {
                            factor = Math.max(stats.statistic.requestErrorCount, 1);
                            flushTime = Math.min(this._config.flushTime * factor, this._config.maxFlushTime);
                        }
                        else {
                            flushTime = this._config.flushTime;
                        }
                        return [2 /*return*/, this._lastFlushTime = flushTime];
                }
            });
        });
    };
    DynamicFlushTimeStrategy.prototype.syncTime = function () {
        return Math.max(this._lastFlushTime * 20, this._config.maxFlushTime + 5);
    };
    return DynamicFlushTimeStrategy;
}());
exports.DynamicFlushTimeStrategy = DynamicFlushTimeStrategy;


/***/ }),
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var guid_1 = __webpack_require__(3);
var unload_event_1 = __webpack_require__(30);
var webstorage_1 = __webpack_require__(29);
var LocalStorageTabSyncPoint = /** @class */ (function () {
    function LocalStorageTabSyncPoint(taskId, _storage) {
        if (_storage === void 0) { _storage = webstorage_1.WebStorages.localStorage; }
        this.taskId = taskId;
        this._storage = _storage;
        this._keys = {
            x: 'mcjs-mutex-x:' + taskId,
            y: 'mcjs-mutex-y:' + taskId
        };
        if (this._storage && !LocalStorageTabSyncPoint.subscribed) {
            LocalStorageTabSyncPoint.subscribe(this._storage);
            LocalStorageTabSyncPoint.subscribed = true;
        }
    }
    /**
     * Capture task ID between all opened tabs of the current domain.
     * On unnuccessable localStorage return true;
     *
     * @param {string} taskId - Unique task ID
     * @param {number} [duration=20000] - Maximum time for capture the activation in ms
     * @returns {boolean} True if current tab is active for the task
     */
    LocalStorageTabSyncPoint.prototype.capture = function (duration) {
        if (duration === void 0) { duration = 1000 * 20; }
        if (!this._storage || this._disposed) {
            return true;
        }
        var storage = this._storage;
        var mutexXKey = this._keys.x;
        var mutexYKey = this._keys.y;
        var tabId = LocalStorageTabSyncPoint.tabId;
        var now = +new Date();
        storage.setItem(mutexXKey, tabId);
        var strY = storage.getItem(mutexYKey);
        var mutexY = strY ? JSON.parse(strY) : null;
        var dur = mutexY ? Math.abs(now - mutexY.time) : NaN;
        var captured = !mutexY || mutexY.id === tabId || dur > duration;
        if (captured) {
            var val = JSON.stringify({ id: tabId, time: now });
            storage.setItem(mutexYKey, val);
            LocalStorageTabSyncPoint.allYKeys[this._keys.y] = true;
        }
        else {
            LocalStorageTabSyncPoint.allYKeys[this._keys.y] = false;
        }
        this._isCaptured = captured && (storage.getItem(mutexXKey) === tabId);
        return this._isCaptured;
    };
    LocalStorageTabSyncPoint.prototype.dispose = function () {
        if (this._storage && this._isCaptured && !this._disposed) {
            this._storage.removeItem(this._keys.y);
            this._isCaptured = false;
            this._disposed = true;
        }
    };
    // tslint:disable-next-line:member-ordering
    LocalStorageTabSyncPoint.subscribe = function (storage) {
        unload_event_1.UnloadEvent.addListener(function () {
            LocalStorageTabSyncPoint.uncaptureAll(storage);
        });
    };
    // tslint:disable-next-line:member-ordering
    LocalStorageTabSyncPoint.uncaptureAll = function (storage) {
        var keys = LocalStorageTabSyncPoint.allYKeys;
        for (var key in keys) {
            if (keys.hasOwnProperty(key) && keys[key]) {
                storage.removeItem(key);
                keys[key] = false;
            }
        }
    };
    LocalStorageTabSyncPoint.tabId = guid_1.GuidProvider.default.next();
    LocalStorageTabSyncPoint.allYKeys = {};
    return LocalStorageTabSyncPoint;
}());
exports.LocalStorageTabSyncPoint = LocalStorageTabSyncPoint;


/***/ }),
/* 128 */
/***/ (function(module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
var AjaxRequestStatusResult;
(function (AjaxRequestStatusResult) {
    AjaxRequestStatusResult[AjaxRequestStatusResult["Success"] = 0] = "Success";
    AjaxRequestStatusResult[AjaxRequestStatusResult["NetworkError"] = 1] = "NetworkError";
})(AjaxRequestStatusResult = exports.AjaxRequestStatusResult || (exports.AjaxRequestStatusResult = {}));


/***/ }),
/* 129 */
/***/ (function(module, exports, __webpack_require__) {

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var worker_request_sender_1 = __webpack_require__(45);
/**
 * Resend all request to a port
 *
 * @internal
 * @class PortAjaxProvider
 * @implements {IAjaxProvider}
 */
var PortAjaxProvider = /** @class */ (function () {
    function PortAjaxProvider(_context) {
        this._context = _context;
        this._sender = new worker_request_sender_1.WorkerRequestSender('ajax', this._context.sender, this._context.receiver);
    }
    PortAjaxProvider.prototype.send = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        _this._sender.send(options, resolve, reject);
                    })];
            });
        });
    };
    return PortAjaxProvider;
}());
exports.PortAjaxProvider = PortAjaxProvider;


/***/ }),
/* 130 */
/***/ (function(module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
var Context = /** @class */ (function () {
    function Context(sender, receiver) {
        this.sender = sender;
        this.receiver = receiver;
    }
    return Context;
}());
exports.Context = Context;


/***/ }),
/* 131 */
/***/ (function(module, exports, __webpack_require__) {

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
Object.defineProperty(exports, "__esModule", { value: true });
var sync_1 = __webpack_require__(132);
/**
 * @internal
 * @class Messenger
 */
var Messenger = /** @class */ (function () {
    function Messenger(_router, _postmaster, _statisticAuditor, _performanceAuditor) {
        this._router = _router;
        this._postmaster = _postmaster;
        this._statisticAuditor = _statisticAuditor;
        this._performanceAuditor = _performanceAuditor;
    }
    /**
     * Send all user messages to the destinations queues
     */
    Messenger.prototype.send = function (messages) {
        return __awaiter(this, void 0, void 0, function () {
            var auditor, group, messages_1, messages_1_1, message, envelop, queue, envelops, enquings, _a, _b, queue, envelops, enquiuing, statisting, enquings_1, enquings_1_1, promises, e_1_1, e_2, _c, e_3, _d, e_1, _e;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        auditor = this._performanceAuditor.started();
                        group = new Map();
                        try {
                            for (messages_1 = __values(messages), messages_1_1 = messages_1.next(); !messages_1_1.done; messages_1_1 = messages_1.next()) {
                                message = messages_1_1.value;
                                envelop = this._postmaster.seal(message);
                                queue = this._router.route(envelop);
                                if (queue) {
                                    envelops = group.get(queue);
                                    if (envelops) {
                                        envelops.push(envelop);
                                    }
                                    else {
                                        envelops = [envelop];
                                        group.set(queue, envelops);
                                    }
                                }
                            }
                        }
                        catch (e_2_1) { e_2 = { error: e_2_1 }; }
                        finally {
                            try {
                                if (messages_1_1 && !messages_1_1.done && (_c = messages_1.return)) _c.call(messages_1);
                            }
                            finally { if (e_2) throw e_2.error; }
                        }
                        enquings = new Array();
                        try {
                            for (_a = __values(group.keys()), _b = _a.next(); !_b.done; _b = _a.next()) {
                                queue = _b.value;
                                envelops = group.get(queue);
                                /* istanbul ignore if */
                                if (envelops) {
                                    enquiuing = queue.enqueue(envelops);
                                    statisting = this._statisticAuditor.enqueued(queue.id, envelops);
                                    enquings.push([enquiuing, statisting]);
                                    auditor.enqueued(queue.id, envelops);
                                }
                            }
                        }
                        catch (e_3_1) { e_3 = { error: e_3_1 }; }
                        finally {
                            try {
                                if (_b && !_b.done && (_d = _a.return)) _d.call(_a);
                            }
                            finally { if (e_3) throw e_3.error; }
                        }
                        _f.label = 1;
                    case 1:
                        _f.trys.push([1, 6, 7, 8]);
                        enquings_1 = __values(enquings), enquings_1_1 = enquings_1.next();
                        _f.label = 2;
                    case 2:
                        if (!!enquings_1_1.done) return [3 /*break*/, 5];
                        promises = enquings_1_1.value;
                        if (!sync_1.isAsyncAll(promises)) return [3 /*break*/, 4];
                        return [4 /*yield*/, Promise.all(enquings)];
                    case 3:
                        _f.sent();
                        _f.label = 4;
                    case 4:
                        enquings_1_1 = enquings_1.next();
                        return [3 /*break*/, 2];
                    case 5: return [3 /*break*/, 8];
                    case 6:
                        e_1_1 = _f.sent();
                        e_1 = { error: e_1_1 };
                        return [3 /*break*/, 8];
                    case 7:
                        try {
                            if (enquings_1_1 && !enquings_1_1.done && (_e = enquings_1.return)) _e.call(enquings_1);
                        }
                        finally { if (e_1) throw e_1.error; }
                        return [7 /*endfinally*/];
                    case 8:
                        auditor.completed();
                        return [2 /*return*/];
                }
            });
        });
    };
    return Messenger;
}());
exports.Messenger = Messenger;


/***/ }),
/* 132 */
/***/ (function(module, exports) {

var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
Object.defineProperty(exports, "__esModule", { value: true });
function sync(result) {
    if (result instanceof Promise) {
        return undefined;
    }
    return result;
}
exports.sync = sync;
function isAsyncAll(results) {
    try {
        for (var results_1 = __values(results), results_1_1 = results_1.next(); !results_1_1.done; results_1_1 = results_1.next()) {
            var result = results_1_1.value;
            if (result instanceof Promise) {
                return true;
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (results_1_1 && !results_1_1.done && (_a = results_1.return)) _a.call(results_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return false;
    var e_1, _a;
}
exports.isAsyncAll = isAsyncAll;


/***/ }),
/* 133 */
/***/ (function(module, exports) {

var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Real impelementation of IRouter
 *
 * @internal
 */
var Router = /** @class */ (function () {
    function Router(configuration, _queues) {
        this._queues = _queues;
        this._routes = MessageConfigurations.createRoutes(configuration);
    }
    Router.prototype.route = function (envelop) {
        var queueId = this.findQueue(envelop) || Router.default;
        var queue = this._queues.get(queueId);
        if (!queue && this._queues.size > 0) {
            queue = this._queues.values().next().value;
        }
        return queue;
    };
    Router.prototype.findQueue = function (envelop) {
        var configs = this._routes.get(envelop.type);
        if (!configs || !configs.length) {
            return null;
        }
        try {
            for (var configs_1 = __values(configs), configs_1_1 = configs_1.next(); !configs_1_1.done; configs_1_1 = configs_1.next()) {
                var config = configs_1_1.value;
                if (!config.properties) {
                    return config.queue;
                }
                else {
                    if (this.isMatch(envelop.message, config.properties)) {
                        return config.queue;
                    }
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (configs_1_1 && !configs_1_1.done && (_a = configs_1.return)) _a.call(configs_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return null;
        var e_1, _a;
    };
    Router.prototype.isMatch = function (message, properties, deep) {
        if (deep === void 0) { deep = 10; }
        if (deep === 0) {
            return true;
        }
        for (var name_1 in properties) {
            if (properties.hasOwnProperty(name_1)) {
                var messageValue = message[name_1];
                var configValue = properties[name_1];
                if (typeof (messageValue) === 'object' && typeof (configValue) === 'object') {
                    if (!this.isMatch(messageValue, configValue, deep - 1)) {
                        return false;
                    }
                }
                else if (message[name_1] !== properties[name_1]) {
                    return false;
                }
            }
        }
        return true;
    };
    Router.default = 'default';
    return Router;
}());
exports.Router = Router;
var MessageConfigurations = /** @class */ (function () {
    function MessageConfigurations() {
    }
    MessageConfigurations.createRoutes = function (configuration) {
        var routes = new Map();
        try {
            for (var _a = __values(configuration.messages), _b = _a.next(); !_b.done; _b = _a.next()) {
                var message = _b.value;
                var messages = routes.get(message.type);
                if (messages) {
                    messages.push(message);
                }
                else {
                    messages = [message];
                    routes.set(message.type, messages);
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
            }
            finally { if (e_2) throw e_2.error; }
        }
        var result = new Map();
        routes.forEach(function (messages, type) {
            messages = messages.sort(function (a, b) { return MessageConfigurations.weight(b.properties) - MessageConfigurations.weight(a.properties); });
            result.set(type, messages);
        });
        return result;
        var e_2, _c;
    };
    MessageConfigurations.weight = function (properties, deep) {
        if (deep === void 0) { deep = 10; }
        if (!properties || deep <= 0) {
            return 0;
        }
        var count = 0;
        for (var name_2 in properties) {
            if (properties.hasOwnProperty(name_2)) {
                var value = properties[name_2];
                if (typeof value === 'object') {
                    count += this.weight(value, deep - 1);
                }
                else {
                    count++;
                }
            }
        }
        return count;
    };
    return MessageConfigurations;
}());


/***/ }),
/* 134 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var messages_reporter_1 = __webpack_require__(135);
var perfstamp_1 = __webpack_require__(73);
//////////
var MessengerPerformanceAuditorBuilder = /** @class */ (function () {
    function MessengerPerformanceAuditorBuilder() {
    }
    MessengerPerformanceAuditorBuilder.create = function (real, sender) {
        return new MessengerPerformanceAuditor(real ? sender : undefined);
    };
    return MessengerPerformanceAuditorBuilder;
}());
exports.MessengerPerformanceAuditorBuilder = MessengerPerformanceAuditorBuilder;
var MessengerPerformanceAuditor = /** @class */ (function () {
    function MessengerPerformanceAuditor(_sender) {
        this._sender = _sender;
    }
    MessengerPerformanceAuditor.prototype.started = function () {
        if (this._sender) {
            /////////////////////////////////////
            return new PerformanceMessagesAuditor(this._sender);
            //////////////////////
        }
        return new DummyMessagesPerformanceAuditor();
    };
    return MessengerPerformanceAuditor;
}());
var DummyMessagesPerformanceAuditor = /** @class */ (function () {
    function DummyMessagesPerformanceAuditor() {
    }
    DummyMessagesPerformanceAuditor.prototype.enqueued = function (queueId, envelops) { };
    DummyMessagesPerformanceAuditor.prototype.completed = function () { };
    return DummyMessagesPerformanceAuditor;
}());
/////////////////////////
/**
 * Performance message auditor for collection timings information from enqueue message proccess
 */
var PerformanceMessagesAuditor = /** @class */ (function () {
    function PerformanceMessagesAuditor(_sender) {
        this._sender = _sender;
        this._audits = {
            groups: new Array(),
            workerStartedAt: undefined,
            enqueuedAt: undefined
        };
        this._audits.workerStartedAt = new perfstamp_1.Perfstamp();
    }
    PerformanceMessagesAuditor.prototype.enqueued = function (queueId, envelops) {
        this._audits.groups.push(envelops);
    };
    PerformanceMessagesAuditor.prototype.completed = function () {
        this._audits.enqueuedAt = new perfstamp_1.Perfstamp();
        var report = new messages_reporter_1.MessagesReporter(this._audits).report();
        this._sender.messages(report);
    };
    return PerformanceMessagesAuditor;
}());
//////////


/***/ }),
/* 135 */
/***/ (function(module, exports, __webpack_require__) {

var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
Object.defineProperty(exports, "__esModule", { value: true });
var calc_methods_1 = __webpack_require__(72);
var MessagesReporter = /** @class */ (function () {
    function MessagesReporter(_audits) {
        this._audits = _audits;
    }
    MessagesReporter.prototype.report = function () {
        var audits = this._audits;
        if (!audits.enqueuedAt || !audits.workerStartedAt) {
            throw new Error('MessagesReporter cannot generate report. Data is not complete.');
        }
        var creates = new Array();
        var enqueuedAt = audits.enqueuedAt;
        var workerStartedAt = audits.workerStartedAt;
        try {
            for (var _a = __values(audits.groups), _b = _a.next(); !_b.done; _b = _a.next()) {
                var group = _b.value;
                try {
                    for (var group_1 = __values(group), group_1_1 = group_1.next(); !group_1_1.done; group_1_1 = group_1.next()) {
                        var audit = group_1_1.value;
                        creates.push(audit.timestamp);
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (group_1_1 && !group_1_1.done && (_c = group_1.return)) _c.call(group_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_d = _a.return)) _d.call(_a);
            }
            finally { if (e_2) throw e_2.error; }
        }
        var enqueue = {
            clocktime: calc_methods_1.distorbtion(creates, function (timestamp) { return enqueuedAt.clocktime - timestamp; }),
            cpu: undefined
        };
        return {
            count: creates.length,
            enqueue: enqueue,
            workerEnqueue: calc_methods_1.duration(workerStartedAt, audits.enqueuedAt)
        };
        var e_2, _d, e_1, _c;
    };
    return MessagesReporter;
}());
exports.MessagesReporter = MessagesReporter;


/***/ }),
/* 136 */
/***/ (function(module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
var MessengerStatisticAuditor = /** @class */ (function () {
    function MessengerStatisticAuditor(_pipeStorages) {
        this._pipeStorages = _pipeStorages;
    }
    MessengerStatisticAuditor.prototype.enqueued = function (queueId, envelops) {
        var length = envelops.length;
        return this._pipeStorages.update(queueId, function (stats) {
            stats.totalMessageCount += length;
        });
    };
    return MessengerStatisticAuditor;
}());
exports.MessengerStatisticAuditor = MessengerStatisticAuditor;


/***/ }),
/* 137 */
/***/ (function(module, exports) {

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var PipeStatsProvider = /** @class */ (function () {
    function PipeStatsProvider(_pipeStatsStorage) {
        this._pipeStatsStorage = _pipeStatsStorage;
        this._dictionary = {};
    }
    PipeStatsProvider.prototype.get = function (queue) {
        var dictionary = this._dictionary;
        return dictionary[queue.id] || (dictionary[queue.id] = this.create(queue));
    };
    PipeStatsProvider.prototype.create = function (queue) {
        var state = {
            get queueMessageCount() { return queue.count; },
            get queueSize() { return queue.size; }
        };
        return new PipeStatsRepository(queue.id, state, this._pipeStatsStorage);
    };
    return PipeStatsProvider;
}());
exports.PipeStatsProvider = PipeStatsProvider;
var PipeStatsRepository = /** @class */ (function () {
    function PipeStatsRepository(_queueId, _state, _pipeStatsStorage) {
        this._queueId = _queueId;
        this._state = _state;
        this._pipeStatsStorage = _pipeStatsStorage;
    }
    PipeStatsRepository.prototype.update = function (action) {
        return __awaiter(this, void 0, void 0, function () {
            var state, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        state = this._state;
                        return [4 /*yield*/, this._pipeStatsStorage.update(this._queueId, function (statistic) {
                                result = action({
                                    statistic: statistic,
                                    state: state
                                });
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    };
    PipeStatsRepository.prototype.read = function () {
        return __awaiter(this, void 0, void 0, function () {
            var state, statistic;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        state = this._state;
                        return [4 /*yield*/, this._pipeStatsStorage.read(this._queueId)];
                    case 1:
                        statistic = _a.sent();
                        return [2 /*return*/, {
                                statistic: statistic,
                                state: state
                            }];
                }
            });
        });
    };
    return PipeStatsRepository;
}());


/***/ }),
/* 138 */
/***/ (function(module, exports, __webpack_require__) {

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var guid_1 = __webpack_require__(3);
var indexeddb_utils_1 = __webpack_require__(44);
var PipeStatsIndexedDBStorage = /** @class */ (function () {
    function PipeStatsIndexedDBStorage(_db, _clientId) {
        this._db = _db;
        this._clientId = _clientId;
        this._recovery = {};
    }
    PipeStatsIndexedDBStorage.create = function (name) {
        if (name === void 0) { name = 'mcjs-counters'; }
        return __awaiter(this, void 0, void 0, function () {
            var database, clientId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, indexeddb_utils_1.IndexedDbUtils.open(name, 1, function (db) {
                            if (!db.objectStoreNames.contains(PipeStatsIndexedDBStorage.PipeStatisticsStorage)) {
                                db.createObjectStore(PipeStatsIndexedDBStorage.PipeStatisticsStorage, { keyPath: 'queueId', autoIncrement: false });
                            }
                            if (!db.objectStoreNames.contains(PipeStatsIndexedDBStorage.ClientStorage)) {
                                db.createObjectStore(PipeStatsIndexedDBStorage.ClientStorage, { keyPath: 'id', autoIncrement: false });
                            }
                        })];
                    case 1:
                        database = _a.sent();
                        return [4 /*yield*/, PipeStatsIndexedDBStorage.clientId(database)];
                    case 2:
                        clientId = _a.sent();
                        return [2 /*return*/, new PipeStatsIndexedDBStorage(database, clientId)];
                }
            });
        });
    };
    PipeStatsIndexedDBStorage.clientId = function (database) {
        return __awaiter(this, void 0, void 0, function () {
            var clientStorage, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        clientStorage = database.transaction([PipeStatsIndexedDBStorage.ClientStorage], 'readwrite')
                            .objectStore(PipeStatsIndexedDBStorage.ClientStorage);
                        return [4 /*yield*/, indexeddb_utils_1.IndexedDbUtils.transaction(function () { return clientStorage; }, function (storage, result) {
                                indexeddb_utils_1.IndexedDbUtils.request(storage.get('default'), function (client) {
                                    if (!client) {
                                        client = {
                                            id: 'default',
                                            clientId: PipeStatsIndexedDBStorage.guid.next()
                                        };
                                        storage.add(client);
                                    }
                                    result.clientId = client.clientId;
                                });
                            }, { clientId: '' })];
                    case 1:
                        data = _a.sent();
                        return [2 /*return*/, data.clientId];
                }
            });
        });
    };
    PipeStatsIndexedDBStorage.prototype.update = function (queueId, action) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var recovery, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.transaction(function (storage, result) {
                                indexeddb_utils_1.IndexedDbUtils.request(storage.get(queueId), function (stats) {
                                    stats = recovery = (_this._recovery[queueId] || stats || _this.newData(queueId));
                                    action(stats);
                                    storage.put(stats);
                                });
                            }, undefined, 'readwrite')];
                    case 1:
                        _b.sent();
                        this._recovery[queueId] = undefined;
                        return [3 /*break*/, 3];
                    case 2:
                        _a = _b.sent();
                        if (!recovery) {
                            recovery = this.newData(queueId);
                            action(recovery);
                        }
                        this._recovery[queueId] = recovery;
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    PipeStatsIndexedDBStorage.prototype.read = function (queueId) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var d, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.transaction(function (storage, result) {
                                indexeddb_utils_1.IndexedDbUtils.request(storage.get(queueId), function (stats) {
                                    result.stats = _this._recovery[queueId] || stats || _this.newData(queueId);
                                });
                            }, { stats: {} }, 'readonly')];
                    case 1:
                        d = _b.sent();
                        this._recovery[queueId] = undefined;
                        return [2 /*return*/, d.stats];
                    case 2:
                        _a = _b.sent();
                        return [2 /*return*/, this._recovery[queueId] = this.newData(queueId)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    PipeStatsIndexedDBStorage.prototype.clear = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this._recovery = {};
                return [2 /*return*/, this.transaction(function (storage) {
                        storage.clear();
                    }, undefined)];
            });
        });
    };
    PipeStatsIndexedDBStorage.prototype.dispose = function () {
        this._db.close();
    };
    PipeStatsIndexedDBStorage.prototype.destroy = function () {
        this.dispose();
        this._recovery = {};
        return indexeddb_utils_1.IndexedDbUtils.remove(this._db.name);
    };
    PipeStatsIndexedDBStorage.prototype.newData = function (queueId) {
        return {
            clientId: this._clientId,
            queueId: queueId,
            batchIndex: 0,
            lastSendingSuccess: true,
            requestErrorCount: 0,
            totalMessageCount: 0,
            totalRequestErrorCount: 0
        };
    };
    PipeStatsIndexedDBStorage.prototype.open = function (mode) {
        return this._db.transaction([PipeStatsIndexedDBStorage.PipeStatisticsStorage], mode).objectStore(PipeStatsIndexedDBStorage.PipeStatisticsStorage);
    };
    PipeStatsIndexedDBStorage.prototype.transaction = function (action, result, mode) {
        var _this = this;
        if (mode === void 0) { mode = 'readwrite'; }
        return indexeddb_utils_1.IndexedDbUtils.transaction(function () { return _this.open(mode); }, action, result);
    };
    PipeStatsIndexedDBStorage.guid = guid_1.GuidProvider.default;
    PipeStatsIndexedDBStorage.PipeStatisticsStorage = 'pipe-statistics';
    PipeStatsIndexedDBStorage.ClientStorage = 'client';
    return PipeStatsIndexedDBStorage;
}());
exports.PipeStatsIndexedDBStorage = PipeStatsIndexedDBStorage;


/***/ }),
/* 139 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var guid_1 = __webpack_require__(3);
var webstorage_1 = __webpack_require__(29);
var PipeStatsLocalStorage = /** @class */ (function () {
    function PipeStatsLocalStorage(_storage) {
        this._storage = _storage;
        this._recovery = {};
    }
    PipeStatsLocalStorage.create = function (localStorage) {
        if (localStorage === void 0) { localStorage = webstorage_1.WebStorages.localStorage; }
        if (!localStorage) {
            return null;
        }
        return new PipeStatsLocalStorage(localStorage);
    };
    PipeStatsLocalStorage.prototype.clientId = function () {
        var key = PipeStatsLocalStorage._clientKey;
        var clientId = this._clientId || this._storage.getItem(key);
        if (!clientId) {
            clientId = guid_1.GuidProvider.default.next();
            this._storage.setItem(key, clientId);
        }
        return this._clientId = clientId;
    };
    PipeStatsLocalStorage.prototype.update = function (queueId, action) {
        var key = this.key(queueId);
        var stats = this._recovery[key] || this.get(key) || this.new(queueId);
        action(stats);
        this.set(key, stats);
    };
    PipeStatsLocalStorage.prototype.read = function (queueId) {
        var key = this.key(queueId);
        var stats = this._recovery[key] || this.get(key);
        if (!stats) {
            stats = this.new(queueId);
            this.set(key, stats);
        }
        return stats;
    };
    PipeStatsLocalStorage.prototype.clear = function () {
        var storage = this._storage;
        for (var i = 0; i < storage.length; i++) {
            var key = storage.key(i);
            if (key && key.indexOf(PipeStatsLocalStorage._prefix) === 0) {
                storage.removeItem(key);
                this._recovery[key] = undefined;
            }
        }
    };
    PipeStatsLocalStorage.prototype.destroy = function () {
        this.clear();
    };
    PipeStatsLocalStorage.prototype.dispose = function () {
        //
    };
    PipeStatsLocalStorage.prototype.key = function (queueId) {
        return PipeStatsLocalStorage._prefix + queueId;
    };
    PipeStatsLocalStorage.prototype.new = function (queueId) {
        return {
            clientId: this.clientId(),
            queueId: queueId,
            batchIndex: 0,
            totalMessageCount: 0,
            totalRequestErrorCount: 0,
            requestErrorCount: 0,
            lastSendingSuccess: false
        };
    };
    PipeStatsLocalStorage.prototype.get = function (key) {
        var str = this._storage.getItem(key);
        if (!str) {
            return null;
        }
        try {
            var stats = JSON.parse(str);
            if (stats) {
                stats.clientId = this.clientId();
            }
            return stats;
        }
        catch (_a) {
            return null;
        }
    };
    PipeStatsLocalStorage.prototype.set = function (key, val) {
        try {
            this._storage.setItem(key, JSON.stringify(val, function (name, value) {
                switch (name) {
                    case 'clientId': return undefined;
                    default: return value;
                }
            }));
            this._recovery[key] = undefined;
        }
        catch (_a) {
            this._recovery[key] = val;
        }
    };
    PipeStatsLocalStorage._prefix = 'mcjs-stats:';
    PipeStatsLocalStorage._clientKey = 'mcjs-stats-client';
    return PipeStatsLocalStorage;
}());
exports.PipeStatsLocalStorage = PipeStatsLocalStorage;


/***/ }),
/* 140 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var guid_1 = __webpack_require__(3);
var PipeStatsMemoryStorage = /** @class */ (function () {
    function PipeStatsMemoryStorage() {
        this.clientId = guid_1.GuidProvider.default.next();
        this._dictionary = {};
    }
    PipeStatsMemoryStorage.prototype.update = function (queueId, action) {
        action(this.get(queueId));
    };
    PipeStatsMemoryStorage.prototype.read = function (queueId) {
        return this.get(queueId);
    };
    PipeStatsMemoryStorage.prototype.clear = function () {
        this._dictionary = {};
    };
    PipeStatsMemoryStorage.prototype.destroy = function () {
        this.clear();
    };
    PipeStatsMemoryStorage.prototype.dispose = function () {
        //
    };
    PipeStatsMemoryStorage.prototype.get = function (queueId) {
        var dictionary = this._dictionary;
        return dictionary[queueId] || (dictionary[queueId] = {
            clientId: this.clientId,
            queueId: queueId,
            batchIndex: 0,
            totalMessageCount: 0,
            totalRequestErrorCount: 0,
            requestErrorCount: 0,
            lastSendingSuccess: false
        });
    };
    return PipeStatsMemoryStorage;
}());
exports.PipeStatsMemoryStorage = PipeStatsMemoryStorage;


/***/ }),
/* 141 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var envelop_1 = __webpack_require__(77);
/**
 * @internal
 * @class Postman
 * @implements {IPostman}
 */
var Postman = /** @class */ (function () {
    function Postman(_guid, _time) {
        this._guid = _guid;
        this._time = _time;
    }
    Postman.prototype.seal = function (message) {
        var meta = message._meta;
        delete message._meta; // ToDo: Check perfomance of the delete operator
        return this.envelop(meta, message);
    };
    Postman.prototype.envelop = function (meta, message) {
        var envelop = new envelop_1.Envelop(meta.type);
        envelop.id = this._guid.next();
        envelop.timestamp = meta.timestamp || this._time.now();
        envelop.name = this.name(envelop.type, message);
        envelop.message = message;
        return envelop;
    };
    Postman.prototype.name = function (type, message) {
        if (type === 'measurement') {
            var name_1 = message.name;
            delete message.name;
            return name_1;
        }
        if (type === 'log') {
            var name_2 = Postman.LogLevel[message.level];
            name_2 = typeof name_2 === 'number' ? name_2 : 2;
            delete message.level;
            return name_2.toString();
        }
        return type;
    };
    Postman.LogLevel = {
        trace: 0,
        debug: 1,
        info: 2,
        warn: 3,
        error: 4,
        fatal: 5
    };
    return Postman;
}());
exports.Postman = Postman;


/***/ }),
/* 142 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var processing_1 = __webpack_require__(70);
var message_receiver_1 = __webpack_require__(46);
var response_emitter_1 = __webpack_require__(47);
var worker_event_receiver_1 = __webpack_require__(48);
var worker_request_receiver_1 = __webpack_require__(49);
var service_worker_sender_1 = __webpack_require__(143);
/**
 * Receiver wrapper for worker environment.
 * It allows add received messages with variouse data types from a main thread.
 *
 * @internal
 */
var WorkerReceiver = /** @class */ (function () {
    function WorkerReceiver(workerEnvironment, logger) {
        this.terminate = new response_emitter_1.MandatoryResponseEmitter();
        var sender = this.getSender(workerEnvironment);
        var receiver = this._receiver = new message_receiver_1.MessageReceiver(workerEnvironment, logger);
        this.context = new processing_1.Context(sender, receiver);
        this._messages = new worker_event_receiver_1.WorkerEventReceiver('messages', receiver);
        this._configuration = new worker_event_receiver_1.WorkerEventReceiver('configuration', receiver);
        this._terminate = new worker_request_receiver_1.WorkerRequestReceiver('terminate', sender, receiver, this.terminate);
    }
    Object.defineProperty(WorkerReceiver.prototype, "messages", {
        get: function () { return this._messages.event; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WorkerReceiver.prototype, "configuration", {
        get: function () { return this._configuration.event; },
        enumerable: true,
        configurable: true
    });
    WorkerReceiver.prototype.dispose = function () {
        this._receiver.dispose();
        this._terminate.dispose();
        this._messages.dispose();
        this._configuration.dispose();
    };
    WorkerReceiver.prototype.getSender = function (workerEnvironment) {
        if ('clients' in workerEnvironment) {
            var serviceWorkerGlobal_1 = workerEnvironment;
            return new service_worker_sender_1.ServiceWorkerSender(function () { return serviceWorkerGlobal_1.clients.matchAll({ includeUncontrolled: true }); });
        }
        return workerEnvironment;
    };
    return WorkerReceiver;
}());
exports.WorkerReceiver = WorkerReceiver;


/***/ }),
/* 143 */
/***/ (function(module, exports) {

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Send data to each page from SharedWorker
 *
 * @internal
 */
var ServiceWorkerSender = /** @class */ (function () {
    function ServiceWorkerSender(_clients) {
        this._clients = _clients;
    }
    ServiceWorkerSender.prototype.postMessage = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var clients, clients_1, clients_1_1, client, e_1_1, e_1, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this._clients()];
                    case 1:
                        clients = _b.sent();
                        if (clients.length === 0) {
                            return [2 /*return*/, Promise.reject("Don't see any clients")];
                        }
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, 7, 8, 9]);
                        clients_1 = __values(clients), clients_1_1 = clients_1.next();
                        _b.label = 3;
                    case 3:
                        if (!!clients_1_1.done) return [3 /*break*/, 6];
                        client = clients_1_1.value;
                        return [4 /*yield*/, client.postMessage(data)];
                    case 4:
                        _b.sent();
                        _b.label = 5;
                    case 5:
                        clients_1_1 = clients_1.next();
                        return [3 /*break*/, 3];
                    case 6: return [3 /*break*/, 9];
                    case 7:
                        e_1_1 = _b.sent();
                        e_1 = { error: e_1_1 };
                        return [3 /*break*/, 9];
                    case 8:
                        try {
                            if (clients_1_1 && !clients_1_1.done && (_a = clients_1.return)) _a.call(clients_1);
                        }
                        finally { if (e_1) throw e_1.error; }
                        return [7 /*endfinally*/];
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    return ServiceWorkerSender;
}());
exports.ServiceWorkerSender = ServiceWorkerSender;


/***/ }),
/* 144 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var global_1 = __webpack_require__(13);
var pseudo_worker_1 = __webpack_require__(50);
/**
 * Return current global root variable for Worker enveronemnt
 *
 * @internal
 * @abstract
 * @class WorkerScope
 */
var WorkerScope = /** @class */ (function () {
    function WorkerScope() {
    }
    /**
     * Return current global root variable for Worker enveronemnt
     *
     * @static
     * @param {*} [global=WorkerScope.global()]
     * @returns {IWorkerGlobalScope}
     * @memberof WorkerScope
     */
    WorkerScope.current = function (global) {
        if (global === void 0) { global = global_1.GlobalProvider.current(); }
        if (global[pseudo_worker_1.PseudoWorkerScopeName]) {
            // We are in WebWorker emulator
            var pseudoWorker = global[pseudo_worker_1.PseudoWorkerScopeName];
            delete global[pseudo_worker_1.PseudoWorkerScopeName];
            return pseudoWorker;
        }
        // We are in real Web Worker
        return global;
    };
    return WorkerScope;
}());
exports.WorkerScope = WorkerScope;


/***/ })
/******/ ]);
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCA1YzE2YWE4MmNiNDE5ZGU0MTgzNiIsIndlYnBhY2s6Ly8vLi9zcmMvZnJhbWV3b3JrL2d1aWQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ZyYW1ld29yay91dGlscy90cmF2ZXJzYWwudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ZyYW1ld29yay9pbmRleC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZnJhbWV3b3JrL2V2ZW50LWVtaXR0ZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ZyYW1ld29yay9nbG9iYWwudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ZyYW1ld29yay90aW1lc3RhbXAudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ZyYW1ld29yay91dGlscy9leHRlbmQudHMiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS9idWlsZGluL2dsb2JhbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZnJhbWV3b3JrL3V0aWxzL2luZGV4LnRzIiwid2VicGFjazovLy8uL3NyYy9mcmFtZXdvcmsvd2Vic3RvcmFnZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZnJhbWV3b3JrL3VubG9hZC1ldmVudC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZnJhbWV3b3JrL2FqYXgudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ZyYW1ld29yay9zaW5nbGV0b24udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ZyYW1ld29yay91dGlscy9ncm91cEJ5LnRzIiwid2VicGFjazovLy8uL3NyYy9mcmFtZXdvcmsvdXRpbHMvb3ZlcnJpZGUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ZyYW1ld29yay91dGlscy9zYWZlQ2xvbmUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xvZ3MvY29uc29sZS1sb2dnZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xvZ3MvZXZlbnQtbG9nZ2VyLnRzIiwid2VicGFjazovLy8uL3NyYy9sb2dzL3VuaXZlcnNhbC1sb2dnZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3F1ZXVlcy9pbmRleC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZnJhbWV3b3JrL2luZGV4ZWRkYi11dGlscy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvd29ya2Vycy9zZW5kZXJzL3dvcmtlci1yZXF1ZXN0LXNlbmRlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvd29ya2Vycy9zZW5kZXJzL21lc3NhZ2UtcmVjZWl2ZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3dvcmtlcnMvc2VuZGVycy9yZXNwb25zZS1lbWl0dGVyLnRzIiwid2VicGFjazovLy8uL3NyYy93b3JrZXJzL3NlbmRlcnMvd29ya2VyLWV2ZW50LXJlY2VpdmVyLnRzIiwid2VicGFjazovLy8uL3NyYy93b3JrZXJzL3NlbmRlcnMvd29ya2VyLXJlcXVlc3QtcmVjZWl2ZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3dvcmtlcnMvcHNldWRvLXdvcmtlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZnJhbWV3b3JrL3NjcmlwdC1sb2FkZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Byb2Nlc3NpbmcvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Byb2Nlc3NpbmcvYmF0Y2gudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Byb2Nlc3NpbmcvYXVkaXQvcmVwb3J0ZXJzL2NhbGMtbWV0aG9kcy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcHJvY2Vzc2luZy9hdWRpdC9hdWRpdG9ycy9wZXJmc3RhbXAudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Byb2Nlc3NpbmcvYnVzLnRzIiwid2VicGFjazovLy8uL3NyYy9wcm9jZXNzaW5nL2VuZHBvaW50cy9pbmRleC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcHJvY2Vzc2luZy9waXBlLnRzIiwid2VicGFjazovLy8uL3NyYy9wcm9jZXNzaW5nL2VudmVsb3AudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21lc3NhZ2luZy1jbGllbnQtd29ya2VyLnRzIiwid2VicGFjazovLy8uL3NyYy9jb25maWd1cmF0aW9ucy9kZWZhdWx0cy9tZXNzYWdlcy1jb25maWd1cmF0aW9uLnRzIiwid2VicGFjazovLy8uL3NyYy9sb2dzL2luZGV4LnRzIiwid2VicGFjazovLy8uL3NyYy9sb2dzL3dvcmtlci1sb2dnZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3BvbHlmaWxscy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcHJvY2Vzc2luZy9idWlsZGVycy9pbmRleC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcHJvY2Vzc2luZy9idWlsZGVycy9idXMtYnVpbGRlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcXVldWVzL21lbW9yeS9pbmRleC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcXVldWVzL21lbW9yeS9tZW1vcnktcXVldWUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3F1ZXVlcy9zYW1wbGVkLXF1ZXVlLnRzIiwid2VicGFjazovLy8uL3NyYy9xdWV1ZXMvaW5kZXhlZGRiL2luZGV4ZWRkYi1xdWV1ZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZnJhbWV3b3JrL2luZGV4ZWRkYi1wcm92aWRlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcXVldWVzL2xvY2FsLXN0b3JhZ2UvbG9jYWwtc3RvcmFnZS1xdWV1ZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcXVldWVzL2xvY2FsLXN0b3JhZ2UvbG9jYWwtc3RvcmFnZS1rZXktdmFsdWUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3F1ZXVlcy9sb2NhbC1zdG9yYWdlL3N0b3JhZ2Uta2V5LnRzIiwid2VicGFjazovLy8uL3NyYy9xdWV1ZXMvbG9jYWwtc3RvcmFnZS9sb2NhbC1zdG9yYWdlLWtleS12YWx1ZS1jYWNoZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcHJvY2Vzc2luZy9hdWRpdC9hdWRpdC1wcm92aWRlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcHJvY2Vzc2luZy9hdWRpdC9hdWRpdG9ycy9waXBlLXBlcmZvcm1hbmNlLWF1ZGl0b3IudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Byb2Nlc3NpbmcvYXVkaXQvcmVwb3J0ZXJzL2JhdGNoLXJlcG9ydGVyLnRzIiwid2VicGFjazovLy8uL3NyYy9wcm9jZXNzaW5nL2F1ZGl0L2F1ZGl0b3JzL3BpcGUtc3RhdGlzdGljcy1hdWRpdG9yLnRzIiwid2VicGFjazovLy8uL3NyYy9wcm9jZXNzaW5nL2F1ZGl0L3NlbmRlcnMvd29ya2VyLWF1ZGl0LXNlbmRlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcHJvY2Vzc2luZy9iYXRjaC1idWlsZGVyLnRzIiwid2VicGFjazovLy8uL3NyYy9wcm9jZXNzaW5nL2JhdGNoLWRyb3Atc3RyYXRlZ3kudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Byb2Nlc3NpbmcvYmF0Y2gtc3RvcmFnZXMvaW5kZXhlZGRiLXN0b3JhZ2UvYmF0Y2gtaW5kZXhlZGRiLXN0b3JhZ2UudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Byb2Nlc3NpbmcvYmF0Y2gtc3RvcmFnZXMvbG9jYWwtc3RvcmFnZS9iYXRjaC1sb2NhbHN0b3JhZ2Utc3RvcmFnZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcHJvY2Vzc2luZy9iYXRjaC1zdG9yYWdlcy9tZW1vcnktc3RvcmFnZS9iYXRjaC1tZW1vcnktc3RvcmFnZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcHJvY2Vzc2luZy9lbmRwb2ludHMvZmUtYW5hbHl0aWNzLWNvbGxlY3Rvci9pbmRleC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcHJvY2Vzc2luZy9lbmRwb2ludHMvZmUtYW5hbHl0aWNzLWNvbGxlY3Rvci9mZS1hbmFseXRpY3MtY29sbGVjdG9yLWVuZHBvaW50LnRzIiwid2VicGFjazovLy8uL3NyYy92ZXJzaW9uLnRzIiwid2VicGFjazovLy8uL3NyYy9wcm9jZXNzaW5nL2ZsdXNoLXRpbWUtc3RyYXRlZ3kudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ZyYW1ld29yay90YWItc3luYy1wb2ludC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcHJvY2Vzc2luZy9hdWRpdC9zdGF0cy9waXBlLXN0YXRzLnRzIiwid2VicGFjazovLy8uL3NyYy9wcm9jZXNzaW5nL2J1aWxkZXJzL3BvcnQtYWpheC1wcm92aWRlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcHJvY2Vzc2luZy9jb250ZXh0LnRzIiwid2VicGFjazovLy8uL3NyYy9wcm9jZXNzaW5nL21lc3Nlbmdlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZnJhbWV3b3JrL3N5bmMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Byb2Nlc3Npbmcvcm91dGVyLnRzIiwid2VicGFjazovLy8uL3NyYy9wcm9jZXNzaW5nL2F1ZGl0L2F1ZGl0b3JzL21lc3Nlbmdlci1wZXJmb3JtYW5jZS1hdWRpdG9yLnRzIiwid2VicGFjazovLy8uL3NyYy9wcm9jZXNzaW5nL2F1ZGl0L3JlcG9ydGVycy9tZXNzYWdlcy1yZXBvcnRlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcHJvY2Vzc2luZy9hdWRpdC9hdWRpdG9ycy9tZXNzZW5nZXItc3RhdGlzdGljLWF1ZGl0b3IudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Byb2Nlc3NpbmcvYXVkaXQvc3RhdHMvcGlwZS1zdGF0cy1wcm92aWRlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcHJvY2Vzc2luZy9hdWRpdC9zdGF0cy9zdG9yYWdlcy9waXBlLXN0YXRzLmluZGV4ZWRkYi50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcHJvY2Vzc2luZy9hdWRpdC9zdGF0cy9zdG9yYWdlcy9waXBlLXN0YXRzLmxvY2FsLXN0b3JhZ2UudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Byb2Nlc3NpbmcvYXVkaXQvc3RhdHMvc3RvcmFnZXMvcGlwZS1zdGF0cy5tZW1vcnkudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Byb2Nlc3NpbmcvcG9zdG1hbi50cyIsIndlYnBhY2s6Ly8vLi9zcmMvd29ya2Vycy93b3JrZXItcmVjZWl2ZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3dvcmtlcnMvc2VydmljZS13b3JrZXItc2VuZGVyLnRzIiwid2VicGFjazovLy8uL3NyYy93b3JrZXJzL3dvcmtlci1zY29wZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztBQ1ZBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNuREE7Ozs7OztHQU1HO0FBQ0g7SUFRSSxzQkFDb0IsTUFBd0I7UUFBeEIsa0NBQVMsTUFBTSxDQUFDLE1BQU0sRUFBRTtRQUF4QixXQUFNLEdBQU4sTUFBTSxDQUFrQjtRQUgzQixlQUFVLEdBQWtCLEVBQUUsQ0FBQztRQUs1QyxJQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDO1FBQ2xDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUM7WUFDM0IsU0FBUyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdEQsQ0FBQztJQUNMLENBQUM7SUFiRCxzQkFBa0IsdUJBQU87YUFBekI7WUFDSSxNQUFNLENBQUMsWUFBWSxDQUFD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LFVBQXlCLElBQW9DOzs7Ozs0QkFDekMscUJBQU0sSUFBSSxDQUFDLFFBQVEsRUFBRTs7d0JBQS9CLE9BQU8sR0FBRyxTQUFxQjt3QkFFckMsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDOzRCQUN2QixNQUFNLGdCQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsdUJBQXVCLENBQUMsRUFBQzt3QkFDbkQsQ0FBQzs7Ozt3QkFFb0IsNEJBQU87Ozs7d0JBQWpCLE1BQU07d0JBQ2IscUJBQU0sTUFBTSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUM7O3dCQUE5QixTQUE4QixDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztLQUV0QztJQUNMLDBCQUFDO0FBQUQsQ0FBQztBQWhCWSxrREFBbUI7Ozs7Ozs7O0FDUGhDLHVDQUFxRDtBQUNyRCw4Q0FBd0Q7QUFHeEQ7Ozs7OztHQU1HO0FBQ0g7SUFBQTtJQW9CQSxDQUFDO0lBbkJHOzs7Ozs7O09BT0c7SUFDVyxtQkFBTyxHQUFyQixVQUFzQixNQUFzQztRQUF0QyxrQ0FBYyx1QkFBYyxDQUFDLE9BQU8sRUFBRTtRQUN4RCxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMscUNBQXFCLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDaEMsK0JBQStCO1lBQy9CLElBQU0sWUFBWSxHQUFHLE1BQU0sQ0FBQyxxQ0FBcUIsQ0FBQyxDQUFDO1lBQ25ELE9BQU8sTUFBTSxDQUFDLHFDQUFxQixDQUFDLENBQUM7WUFDckMsTUFBTSxDQUFDLFlBQVksQ0FBQztRQUN4QixDQUFDO1FBRUQsNEJBQTRCO1FBQzVCLE1BQU0sQ0FBQyxNQUFNLENBQUM7SUFDbEIsQ0FBQztJQUNMLGtCQUFDO0FBQUQsQ0FBQztBQXBCcUIsa0NBQVciLCJmaWxlIjoibWVzc2FnaW5nLWNsaWVudC13b3JrZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXSwgZmFjdG9yeSk7XG5cdGVsc2Uge1xuXHRcdHZhciBhID0gZmFjdG9yeSgpO1xuXHRcdGZvcih2YXIgaSBpbiBhKSAodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnID8gZXhwb3J0cyA6IHJvb3QpW2ldID0gYVtpXTtcblx0fVxufSkodGhpcywgZnVuY3Rpb24oKSB7XG5yZXR1cm4gXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDk3KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCA1YzE2YWE4MmNiNDE5ZGU0MTgzNiIsIi8qKlxyXG4gKiBBUEkgZGVmaW5pdGlvbiBmb3IgcHJvdmlkaW5nIEdVSURcclxuICpcclxuICogQGludGVybmFsXHJcbiAqIEBpbnRlcmZhY2UgSUd1aWRQcm92aWRlclxyXG4gKi9cclxuZXhwb3J0IGludGVyZmFjZSBJR3VpZFByb3ZpZGVyIHtcclxuICAgIG5leHQoKTogc3RyaW5nO1xyXG59XHJcblxyXG4vKipcclxuICogUmVhbCBHVUlEIHByb3ZpZGVyIGltcGxlbWVudGF0aW9uXHJcbiAqXHJcbiAqIEBpbnRlcm5hbFxyXG4gKiBAY2xhc3MgR3VpZFByb3ZpZGVyXHJcbiAqIEBpbXBsZW1lbnRzIHtJR3VpZFByb3ZpZGVyfVxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIEd1aWRQcm92aWRlciBpbXBsZW1lbnRzIElHdWlkUHJvdmlkZXIge1xyXG4gICAgcHVibGljIHN0YXRpYyBfZGVmYXVsdDogR3VpZFByb3ZpZGVyO1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXQgZGVmYXVsdCgpOiBHdWlkUHJvdmlkZXIge1xyXG4gICAgICAgIHJldHVybiBHdWlkUHJvdmlkZXIuX2RlZmF1bHQgfHwgKEd1aWRQcm92aWRlci5fZGVmYXVsdCA9IG5ldyBHdWlkUHJvdmlkZXIoKSApO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcmVhZG9ubHkgX2J5dGVUb0hleDogQXJyYXk8c3RyaW5nPiA9IFtdO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHB1YmxpYyByZWFkb25seSByYW5kb20gPSBSYW5kb20uY3JlYXRlKClcclxuICAgICkge1xyXG4gICAgICAgIGNvbnN0IGJ5dGVUb0hleCA9IHRoaXMuX2J5dGVUb0hleDtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDI1NjsgKytpKSB7XHJcbiAgICAgICAgICAgIGJ5dGVUb0hleFtpXSA9IChpICsgMHgxMDApLnRvU3RyaW5nKDE2KS5zdWJzdHIoMSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJuIGEgbmV3IGd1aWRcclxuICAgICAqXHJcbiAgICAgKiBUb0RvOiBUaGluayBhYm91dCBtb3JlIGVmZWN0aXZlIGFsZ29yaXRobVxyXG4gICAgICogQHJldHVybnMge3N0cmluZ31cclxuICAgICAqIEBtZW1iZXJvZiBHdWlkUHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIG5leHQoKSB7XHJcbiAgICAgICAgY29uc3Qgcm5kcyA9IHRoaXMucmFuZG9tLm5leHQoKTtcclxuXHJcbiAgICAgICAgLy8gUGVyIDQuNCwgc2V0IGJpdHMgZm9yIHZlcnNpb24gYW5kIGBjbG9ja19zZXFfaGlfYW5kX3Jlc2VydmVkYFxyXG4gICAgICAgIHJuZHNbNl0gPSAocm5kc1s2XSAmIDB4MGYpIHwgMHg0MDtcclxuICAgICAgICBybmRzWzhdID0gKHJuZHNbOF0gJiAweDNmKSB8IDB4ODA7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLmJ5dGVzVG9VdWlkKHJuZHMpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgYnl0ZXNUb1V1aWQoYnVmOiB7IFtpbmRleDogbnVtYmVyXTogbnVtYmVyIH0pIHtcclxuICAgICAgICBsZXQgaSA9IDA7XHJcbiAgICAgICAgY29uc3QgYnRoID0gdGhpcy5fYnl0ZVRvSGV4O1xyXG4gICAgICAgIHJldHVybiBidGhbYnVmW2krK11dICsgYnRoW2J1ZltpKytdXSArXHJcbiAgICAgICAgICAgICAgIGJ0aFtidWZbaSsrXV0gKyBidGhbYnVmW2krK11dICtcclxuICAgICAgICAgICAgICAgYnRoW2J1ZltpKytdXSArIGJ0aFtidWZbaSsrXV0gK1xyXG4gICAgICAgICAgICAgICBidGhbYnVmW2krK11dICsgYnRoW2J1ZltpKytdXSArXHJcbiAgICAgICAgICAgICAgIGJ0aFtidWZbaSsrXV0gKyBidGhbYnVmW2krK11dICtcclxuICAgICAgICAgICAgICAgYnRoW2J1ZltpKytdXSArIGJ0aFtidWZbaSsrXV0gK1xyXG4gICAgICAgICAgICAgICBidGhbYnVmW2krK11dICsgYnRoW2J1ZltpKytdXSArXHJcbiAgICAgICAgICAgICAgIGJ0aFtidWZbaSsrXV0gKyBidGhbYnVmW2krK11dO1xyXG4gICAgfVxyXG59XHJcblxyXG4vKipcclxuICogQmFzZWQgcmFuZG9tIG51bWJlcnMgc291cmNlXHJcbiAqXHJcbiAqIEBpbnRlcm5hbFxyXG4gKiBAYWJzdHJhY3RcclxuICogQGNsYXNzIFJhbmRvbVxyXG4gKi9cclxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFJhbmRvbSB7XHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZSBuZXcgUmFuZG9tIGdlbmVyYXRvciBpbnN0YW5jZSBzdXBwb3J0ZWQgYnkgY3VycmVudCBlbnZpcm9ubWVudFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGNyZWF0ZShmb3JjZVNpbXBsZTogYm9vbGVhbiA9IGZhbHNlKTogUmFuZG9tIHtcclxuICAgICAgICBpZiAodHlwZW9mIGNyeXB0byAhPT0gJ3VuZGVmaW5lZCdcclxuICAgICAgICAgICAgJiYgY3J5cHRvLmdldFJhbmRvbVZhbHVlc1xyXG4gICAgICAgICAgICAmJiAhZm9yY2VTaW1wbGVcclxuICAgICAgICApIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBDcnlwdG9SYW5kb20oKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFNpbXBsZVJhbmRvbSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYWJzdHJhY3QgbmV4dCgpOiB7IFtpbmRleDogbnVtYmVyXTogbnVtYmVyIH07XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBQcm92aWRlIHN0cm9uZyByYW5kb20gdmFsdWVzIGZyb20gQ3J5cHRvIEFQSVxyXG4gKlxyXG4gKiBAaW50ZXJuYWxcclxuICogQGNsYXNzIENyeXB0b1JhbmRvbVxyXG4gKiBAZXh0ZW5kcyB7UmFuZG9tfVxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIENyeXB0b1JhbmRvbSBleHRlbmRzIFJhbmRvbSB7XHJcbiAgICBwdWJsaWMgbmV4dCgpOiB7IFtpbmRleDogbnVtYmVyXTogbnVtYmVyIH0ge1xyXG4gICAgICAgIC8vIFdIQVRXRyBjcnlwdG8gUk5HIC0gaHR0cDovL3dpa2kud2hhdHdnLm9yZy93aWtpL0NyeXB0b1xyXG4gICAgICAgIGNvbnN0IHJuZHM4ID0gbmV3IFVpbnQ4QXJyYXkoMTYpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVuZGVmXHJcbiAgICAgICAgY3J5cHRvLmdldFJhbmRvbVZhbHVlcyhybmRzOCk7XHJcbiAgICAgICAgcmV0dXJuIHJuZHM4O1xyXG4gICAgfVxyXG59XHJcblxyXG4vKipcclxuICogUHJvdmlkZSByYW5kb20gdmFsdWVzIGZyb20gdW5wcmVkaWN0YWJsZSBNYXRoLnJhbmRvbSBmdW5jdGlvblxyXG4gKlxyXG4gKiBAaW50ZXJuYWxcclxuICogQGNsYXNzIFNpbXBsZVJhbmRvbVxyXG4gKiBAZXh0ZW5kcyB7UmFuZG9tfVxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFNpbXBsZVJhbmRvbSBleHRlbmRzIFJhbmRvbSB7XHJcbiAgICBwcml2YXRlIF9ybmRzID0gbmV3IEFycmF5KDE2KTtcclxuXHJcbiAgICBwdWJsaWMgbmV4dCgpOiBBcnJheTxudW1iZXI+IHtcclxuICAgICAgICBmb3IgKGxldCBpID0gMCwgciA9IDA7IGkgPCAxNjsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmICgoaSAmIDB4MDMpID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICByID0gTWF0aC5yYW5kb20oKSAqIDB4MTAwMDAwMDAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuX3JuZHNbaV0gPSByID4+PiAoKGkgJiAweDAzKSA8PCAzKSAmIDB4ZmY7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLl9ybmRzO1xyXG4gICAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy9pZmRlZi1sb2FkZXIvaWZkZWYtbG9hZGVyLmpzP0RFQlVHPXRydWUmUEVSRk9STUFOQ0VfQVVESVQ9dHJ1ZSEuL3NyYy9mcmFtZXdvcmsvZ3VpZC50cyIsIi8qKlxyXG4gKiBAaW50ZXJuYWxcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiB0cmF2ZXJzYWwoXHJcbiAgICBjYWxsYmFjazogKG5hbWU6IHN0cmluZywgc291cmNlVmFsdWU6IGFueSkgPT4gdm9pZCxcclxuICAgIGRlc3RpbmF0aW9uOiBhbnksXHJcbiAgICBzb3VyY2VzOiBBcnJheTxhbnk+XHJcbikge1xyXG4gICAgLy8gRG8gbm90IHVzZSBmb3IuLm9mIHRvIGF2b2lkIHJlcXVpcmUgcG9seWZpbGxzXHJcbiAgICBjb25zdCBsZW5ndGggPSBzb3VyY2VzLmxlbmd0aDtcclxuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBsZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICBjb25zdCBzb3VyY2UgPSBzb3VyY2VzW2luZGV4XTtcclxuXHJcbiAgICAgICAgaWYgKCFzb3VyY2UpIHtcclxuICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmb3IgKGNvbnN0IG5hbWUgaW4gc291cmNlKSB7XHJcbiAgICAgICAgICAgIGlmIChzb3VyY2UuaGFzT3duUHJvcGVydHkobmFtZSkpIHtcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrKG5hbWUsIHNvdXJjZVtuYW1lXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL2lmZGVmLWxvYWRlci9pZmRlZi1sb2FkZXIuanM/REVCVUc9dHJ1ZSZQRVJGT1JNQU5DRV9BVURJVD10cnVlIS4vc3JjL2ZyYW1ld29yay91dGlscy90cmF2ZXJzYWwudHMiLCJleHBvcnQgKiBmcm9tICcuL2FqYXgnO1xyXG5leHBvcnQgKiBmcm9tICcuL2FqYXgtZGVmaW5pdGlvbnMnO1xyXG5leHBvcnQgKiBmcm9tICcuL2V2ZW50LWVtaXR0ZXInO1xyXG5leHBvcnQgKiBmcm9tICcuL2d1aWQnO1xyXG5leHBvcnQgKiBmcm9tICcuL3NpbmdsZXRvbic7XHJcbmV4cG9ydCAqIGZyb20gJy4vdGltZXN0YW1wJztcclxuZXhwb3J0ICogZnJvbSAnLi91dGlscyc7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy9pZmRlZi1sb2FkZXIvaWZkZWYtbG9hZGVyLmpzP0RFQlVHPXRydWUmUEVSRk9STUFOQ0VfQVVESVQ9dHJ1ZSEuL3NyYy9mcmFtZXdvcmsvaW5kZXgudHMiLCIvKipcclxuICogRXZlbnQgZW1pdHRlciBhbmQgc3Vic2NyaWJlciB0byBzZW5kIHRoZSBzYW1lIG1lc3NhZ2VzIHRvIGEgZmV3IGRlc3RpbmF0aW9uc1xyXG4gKlxyXG4gKiBAaW50ZXJuYWxcclxuICogQGNsYXNzIEV2ZW50RW1pdHRlclxyXG4gKiBAdGVtcGxhdGUgVEV2ZW50XHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgRXZlbnRFbWl0dGVyPFRFdmVudD4ge1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfbGlzdGVuZXJzID0gbmV3ICBBcnJheTxFdmVudExpc3RlbmVyPFRFdmVudD4+KCk7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9idWZmZXIgPSBuZXcgIEFycmF5PFRFdmVudD4oKTtcclxuXHJcbiAgICBwdWJsaWMgc3Vic2NyaWJlKGxpc3RlbmVyOiBFdmVudExpc3RlbmVyPFRFdmVudD4pOiBFdmVudEVtaXR0ZXI8VEV2ZW50PiB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBsaXN0ZW5lciA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5zdWJzY3JpYmVkKGxpc3RlbmVyKSA8IDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2xpc3RlbmVycy5wdXNoKGxpc3RlbmVyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGhpcy5fYnVmZmVyLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5mbHVzaEJ1ZmZlcigpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdW5zdWJzY3JpYmUobGlzdGVuZXI6IEV2ZW50TGlzdGVuZXI8VEV2ZW50Pik6IEV2ZW50RW1pdHRlcjxURXZlbnQ+IHtcclxuICAgICAgICBsZXQgaW5kZXggPSB0aGlzLnN1YnNjcmliZWQobGlzdGVuZXIpO1xyXG4gICAgICAgIHdoaWxlIChpbmRleCA+PSAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2xpc3RlbmVycy5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICAgICAgICBpbmRleCA9IHRoaXMuc3Vic2NyaWJlZChsaXN0ZW5lcik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbGVhcigpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9saXN0ZW5lcnMubGVuZ3RoID0gMDtcclxuICAgICAgICB0aGlzLl9idWZmZXIubGVuZ3RoID0gMDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZW1pdChkYXRhOiBURXZlbnQpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBsZW5ndGggPSB0aGlzLl9saXN0ZW5lcnMubGVuZ3RoO1xyXG4gICAgICAgIGlmIChsZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbGlzdGVuZXJzW2ldKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgfSBjYXRjaCAoZXIpIHsgLypkbyBub3RoaW5nKi8gfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5fYnVmZmVyLnB1c2goZGF0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZWRpcmVjdChlbWl0dGVyOiBFdmVudEVtaXR0ZXI8VEV2ZW50Pik6IEV2ZW50RW1pdHRlcjxURXZlbnQ+IHtcclxuICAgICAgICB0aGlzLnN1YnNjcmliZSgoZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgZW1pdHRlci5lbWl0KGV2ZW50KTtcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gZW1pdHRlcjtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbWFwPFROZXdFdmVudD4oY29udmVydDogKGRhdGE6IFRFdmVudCkgPT4gVE5ld0V2ZW50KTogRXZlbnRFbWl0dGVyPFROZXdFdmVudD4ge1xyXG4gICAgICAgIGNvbnN0IG5ld0V2ZW50RW1pdHRlciA9IG5ldyBFdmVudEVtaXR0ZXI8VE5ld0V2ZW50PigpO1xyXG4gICAgICAgIHRoaXMuc3Vic2NyaWJlKChldmVudCkgPT4ge1xyXG4gICAgICAgICAgICBuZXdFdmVudEVtaXR0ZXIuZW1pdChjb252ZXJ0KGV2ZW50KSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIG5ld0V2ZW50RW1pdHRlcjtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHN1YnNjcmliZWQobGlzdGVuZXI6IEV2ZW50TGlzdGVuZXI8VEV2ZW50Pik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2xpc3RlbmVycy5pbmRleE9mKGxpc3RlbmVyKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGZsdXNoQnVmZmVyKCkge1xyXG4gICAgICAgIGNvbnN0IGJ1ZmZlciA9IHRoaXMuX2J1ZmZlci5zbGljZSgpO1xyXG4gICAgICAgIHRoaXMuX2J1ZmZlci5sZW5ndGggPSAwO1xyXG4gICAgICAgIGNvbnN0IGxlbmd0aCA9IGJ1ZmZlci5sZW5ndGg7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLmVtaXQoYnVmZmVyW2ldKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB0eXBlIEV2ZW50TGlzdGVuZXI8VEV2ZW50PiA9IChldmVudDogVEV2ZW50KSA9PiB2b2lkO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvaWZkZWYtbG9hZGVyL2lmZGVmLWxvYWRlci5qcz9ERUJVRz10cnVlJlBFUkZPUk1BTkNFX0FVRElUPXRydWUhLi9zcmMvZnJhbWV3b3JrL2V2ZW50LWVtaXR0ZXIudHMiLCIvKipcclxuICogUmV0dXJuIGdsb2JhbCByb290IG9iamVjdCBmb3IgY3VycmVudCBlbnZpcm9ubWVudFxyXG4gKlxyXG4gKiBAaW50ZXJuYWxcclxuICogQGFic3RyYWN0XHJcbiAqIEBjbGFzcyBHbG9iYWxQcm92aWRlclxyXG4gKi9cclxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEdsb2JhbFByb3ZpZGVyIHtcclxuICAgIHB1YmxpYyBzdGF0aWMgY3VycmVudCgpIHtcclxuICAgICAgICBjb25zdCByb290ID0gdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgPyB3aW5kb3cgOlxyXG4gICAgICAgICAgICAgICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xyXG4gICAgICAgICAgICAgICAgICAgICB0eXBlb2Ygc2VsZiAgICE9PSAndW5kZWZpbmVkJyA/IHNlbGYgOlxyXG4gICAgICAgICAgICAgICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xyXG4gICAgICAgICAgICAgICAgICAgICB0eXBlb2YgZ2xvYmFsICE9PSAndW5kZWZpbmVkJyA/IGdsb2JhbCA6XHJcbiAgICAgICAgICAgICAgICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXHJcbiAgICAgICAgICAgICAgICAgICAgIG51bGw7XHJcblxyXG4gICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xyXG4gICAgICAgIGlmICghcm9vdCkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1Vuc3VwcG9ydGVkIGVudmlyb25tZW50LicpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHJvb3Q7XHJcbiAgICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL2lmZGVmLWxvYWRlci9pZmRlZi1sb2FkZXIuanM/REVCVUc9dHJ1ZSZQRVJGT1JNQU5DRV9BVURJVD10cnVlIS4vc3JjL2ZyYW1ld29yay9nbG9iYWwudHMiLCIvKipcclxuICogQVBJIG9mIHRpbWVzdGFtcCBwcm92aWRlciBkZWZpbml0aW9uXHJcbiAqXHJcbiAqIEBpbnRlcm5hbFxyXG4gKiBAaW50ZXJmYWNlIElUaW1lU3RhbXBQcm92aWRlclxyXG4gKi9cclxuZXhwb3J0IGludGVyZmFjZSBJVGltZVN0YW1wUHJvdmlkZXIge1xyXG4gICAgbm93KCk6IG51bWJlcjtcclxufVxyXG5cclxuLyoqXHJcbiAqIFNpbXBsZSB0aW1lc3RhbXAgcHJvdmlkZXIgaW1wbGVtZW50YXRpb25cclxuICpcclxuICogQGludGVybmFsXHJcbiAqIEBjbGFzcyBUaW1lU3RhbXBQcm92aWRlclxyXG4gKiBAaW1wbGVtZW50cyB7SVRpbWVTdGFtcFByb3ZpZGVyfVxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFRpbWVTdGFtcFByb3ZpZGVyIGltcGxlbWVudHMgSVRpbWVTdGFtcFByb3ZpZGVyIHtcclxuICAgIHB1YmxpYyBub3coKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gK25ldyBEYXRlKCk7XHJcbiAgICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL2lmZGVmLWxvYWRlci9pZmRlZi1sb2FkZXIuanM/REVCVUc9dHJ1ZSZQRVJGT1JNQU5DRV9BVURJVD10cnVlIS4vc3JjL2ZyYW1ld29yay90aW1lc3RhbXAudHMiLCJpbXBvcnQgeyB0cmF2ZXJzYWwgfSBmcm9tICcuL3RyYXZlcnNhbCc7XHJcblxyXG4vKipcclxuICogRXh0ZW5kIHRoZSBmaXJzdCBvYmplY3QgYnkgYWxsIHByb3BlcnRpZXMgZnJvbSB0aGUgc2Vjb25kXHJcbiAqIFJldHVybiB0aGUgZmlyc3Qgb2JqZWN0XHJcbiAqXHJcbiAqIEBpbnRlcm5hbFxyXG4gKiBAcGFyYW0geyp9IGRlc3RpbmF0aW9uIC0gb2JqZWN0IHdoYXQgd2lsbCBiZSBleHRlbmRlZFxyXG4gKiBAcGFyYW0geyp9IHNvdXJjZSAtIG9iamVjdCB3aXRoIHNvdXJjZSBkYXRhXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZXh0ZW5kKGRlc3RpbmF0aW9uOiBhbnksIC4uLnNvdXJjZXM6IEFycmF5PGFueT4pOiBhbnkge1xyXG4gICAgaWYgKCFkZXN0aW5hdGlvbikge1xyXG4gICAgICAgIGRlc3RpbmF0aW9uID0ge307XHJcbiAgICB9XHJcblxyXG4gICAgdHJhdmVyc2FsKChuYW1lLCBzb3VyY2VWYWx1ZSkgPT4ge1xyXG4gICAgICAgIGlmIChkZXN0aW5hdGlvbltuYW1lXSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIGRlc3RpbmF0aW9uW25hbWVdID0gc291cmNlVmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgfSwgZGVzdGluYXRpb24sIHNvdXJjZXMpO1xyXG5cclxuICAgIHJldHVybiBkZXN0aW5hdGlvbjtcclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvaWZkZWYtbG9hZGVyL2lmZGVmLWxvYWRlci5qcz9ERUJVRz10cnVlJlBFUkZPUk1BTkNFX0FVRElUPXRydWUhLi9zcmMvZnJhbWV3b3JrL3V0aWxzL2V4dGVuZC50cyIsInZhciBnO1xuXG4vLyBUaGlzIHdvcmtzIGluIG5vbi1zdHJpY3QgbW9kZVxuZyA9IChmdW5jdGlvbigpIHtcblx0cmV0dXJuIHRoaXM7XG59KSgpO1xuXG50cnkge1xuXHQvLyBUaGlzIHdvcmtzIGlmIGV2YWwgaXMgYWxsb3dlZCAoc2VlIENTUClcblx0ZyA9IGcgfHwgRnVuY3Rpb24oXCJyZXR1cm4gdGhpc1wiKSgpIHx8ICgxLGV2YWwpKFwidGhpc1wiKTtcbn0gY2F0Y2goZSkge1xuXHQvLyBUaGlzIHdvcmtzIGlmIHRoZSB3aW5kb3cgcmVmZXJlbmNlIGlzIGF2YWlsYWJsZVxuXHRpZih0eXBlb2Ygd2luZG93ID09PSBcIm9iamVjdFwiKVxuXHRcdGcgPSB3aW5kb3c7XG59XG5cbi8vIGcgY2FuIHN0aWxsIGJlIHVuZGVmaW5lZCwgYnV0IG5vdGhpbmcgdG8gZG8gYWJvdXQgaXQuLi5cbi8vIFdlIHJldHVybiB1bmRlZmluZWQsIGluc3RlYWQgb2Ygbm90aGluZyBoZXJlLCBzbyBpdCdzXG4vLyBlYXNpZXIgdG8gaGFuZGxlIHRoaXMgY2FzZS4gaWYoIWdsb2JhbCkgeyAuLi59XG5cbm1vZHVsZS5leHBvcnRzID0gZztcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vICh3ZWJwYWNrKS9idWlsZGluL2dsb2JhbC5qc1xuLy8gbW9kdWxlIGlkID0gMjBcbi8vIG1vZHVsZSBjaHVua3MgPSAxIDIgMyIsImV4cG9ydCAqIGZyb20gJy4vZXh0ZW5kJztcclxuZXhwb3J0ICogZnJvbSAnLi9ncm91cEJ5JztcclxuZXhwb3J0ICogZnJvbSAnLi9vdmVycmlkZSc7XHJcbmV4cG9ydCAqIGZyb20gJy4vc2FmZUNsb25lJztcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL2lmZGVmLWxvYWRlci9pZmRlZi1sb2FkZXIuanM/REVCVUc9dHJ1ZSZQRVJGT1JNQU5DRV9BVURJVD10cnVlIS4vc3JjL2ZyYW1ld29yay91dGlscy9pbmRleC50cyIsImV4cG9ydCBhYnN0cmFjdCBjbGFzcyBXZWJTdG9yYWdlcyB7XHJcbiAgICBwcml2YXRlIHN0YXRpYyBfbG9jYWxTdG9yYWdlOiBTdG9yYWdlIHwgbnVsbCB8IHVuZGVmaW5lZDtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldCBsb2NhbFN0b3JhZ2UoKTogU3RvcmFnZSB8IG51bGwge1xyXG4gICAgICAgIGlmIChXZWJTdG9yYWdlcy5fbG9jYWxTdG9yYWdlICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFdlYlN0b3JhZ2VzLl9sb2NhbFN0b3JhZ2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gV2ViU3RvcmFnZXMuX2xvY2FsU3RvcmFnZSA9IFdlYlN0b3JhZ2VzLmxvY2FsKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgbG9jYWwoKTogU3RvcmFnZSB8IG51bGwge1xyXG4gICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xyXG4gICAgICAgIGlmICh0eXBlb2YgbG9jYWxTdG9yYWdlID09PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5nZXRJdGVtKCcnKTsgLy8gbG9jYWxTdG9yYWdlIHdhcyBkaXNhYmxlZCBieSB1c2VyLlxyXG4gICAgICAgIH0gY2F0Y2gge1xyXG4gICAgICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBsb2NhbFN0b3JhZ2U7XHJcbiAgICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL2lmZGVmLWxvYWRlci9pZmRlZi1sb2FkZXIuanM/REVCVUc9dHJ1ZSZQRVJGT1JNQU5DRV9BVURJVD10cnVlIS4vc3JjL2ZyYW1ld29yay93ZWJzdG9yYWdlLnRzIiwiLyoqXHJcbiAqIFRoZSBjbGFzcyBjaG9vc2VzIHRoZSBiZXN0IHVubG9hZCBldmVudCBmb3IgZGlmZmVyZW50IGJyb3dzZXJzXHJcbiAqL1xyXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgVW5sb2FkRXZlbnQge1xyXG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSBtb2RlID0gdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCdcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gKCh3aW5kb3cub25wYWdlaGlkZSB8fCB3aW5kb3cub25wYWdlaGlkZSA9PT0gbnVsbCkgPyAncGFnZWhpZGUnIDogJ3VubG9hZCcpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6ICdub25lJztcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGFkZExpc3RlbmVyKGhhbmRsZXI6IChldmVudDogRXZlbnQpID0+IHZvaWQpOiBib29sZWFuIHtcclxuICAgICAgICBzd2l0Y2ggKFVubG9hZEV2ZW50Lm1vZGUpIHtcclxuICAgICAgICAgICAgY2FzZSAncGFnZWhpZGUnOiB7XHJcbiAgICAgICAgICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncGFnZWhpZGUnLCBoYW5kbGVyKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgJ3VubG9hZCc6IHtcclxuICAgICAgICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCd1bmxvYWQnLCBoYW5kbGVyKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyByZW1vdmVMaXN0ZW5lcihoYW5kbGVyOiAoZXZlbnQ6IEV2ZW50KSA9PiB2b2lkKTogYm9vbGVhbiB7XHJcbiAgICAgICAgc3dpdGNoIChVbmxvYWRFdmVudC5tb2RlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgJ3BhZ2VoaWRlJzoge1xyXG4gICAgICAgICAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3BhZ2VoaWRlJywgaGFuZGxlcik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlICd1bmxvYWQnOiB7XHJcbiAgICAgICAgICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigndW5sb2FkJywgaGFuZGxlcik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBkZWZhdWx0OiByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy9pZmRlZi1sb2FkZXIvaWZkZWYtbG9hZGVyLmpzP0RFQlVHPXRydWUmUEVSRk9STUFOQ0VfQVVESVQ9dHJ1ZSEuL3NyYy9mcmFtZXdvcmsvdW5sb2FkLWV2ZW50LnRzIiwiaW1wb3J0IHsgSUFqYXhPcHRpb25zLCBJQWpheFByb3ZpZGVyIH0gZnJvbSAnLi9hamF4LWRlZmluaXRpb25zJztcclxuXHJcbmRlY2xhcmUgY2xhc3MgWERvbWFpblJlcXVlc3Qge1xyXG4gICAgcHVibGljIG9ubG9hZDogKCkgPT4gdm9pZDtcclxuICAgIHB1YmxpYyBvbmVycm9yOiAoKSA9PiB2b2lkO1xyXG4gICAgcHVibGljIHRpbWVvdXQ6IG51bWJlcjtcclxuXHJcbiAgICBwdWJsaWMgcmVzcG9uc2VUZXh0OiBzdHJpbmc7XHJcblxyXG4gICAgcHVibGljIG9wZW4obWV0aG9kOiBzdHJpbmcsIHVybDogc3RyaW5nLCBhc3luYz86IGJvb2xlYW4pOiB2b2lkO1xyXG5cclxuICAgIHB1YmxpYyBzZW5kKGRhdGE/OiBzdHJpbmcpOiB2b2lkO1xyXG59XHJcblxyXG4vKipcclxuICogQWpheCBwcm92aWRlciBpbXBsZW1lbnRhdGlvblxyXG4gKi9cclxuY2xhc3MgQWpheFJlcXVlc3Qge1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfeGhyOiBYTUxIdHRwUmVxdWVzdCB8IFhEb21haW5SZXF1ZXN0O1xyXG5cclxuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXHJcbiAgICBjb25zdHJ1Y3Rvcihjb3JzOiBib29sZWFuKSB7XHJcbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXHJcbiAgICAgICAgaWYgKGNvcnMgJiYgdHlwZW9mIFhEb21haW5SZXF1ZXN0ICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgICB0aGlzLl94aHIgPSBuZXcgWERvbWFpblJlcXVlc3QoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLl94aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cclxuICAgIHB1YmxpYyBzZW5kKG9wdGlvbnM6IElBamF4T3B0aW9ucyk6IFByb21pc2U8c3RyaW5nPiB7XHJcbiAgICAgICAgY29uc3QgeGhyID0gdGhpcy5feGhyO1xyXG5cclxuICAgICAgICBjb25zdCB0eXBlID0gb3B0aW9ucy50eXBlIHx8ICdQT1NUJztcclxuICAgICAgICBjb25zdCBib2R5ID0gb3B0aW9ucy5ib2R5IHx8ICcnO1xyXG4gICAgICAgIGNvbnN0IHVybCA9IG9wdGlvbnMudXJsO1xyXG4gICAgICAgIGNvbnN0IHRpbWVvdXQgPSBvcHRpb25zLnRpbWVvdXQ7XHJcblxyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIHhoci5vcGVuKHR5cGUsIHVybCwgLyphc3luYyovIHRydWUpO1xyXG4gICAgICAgICAgICBpZiAodGltZW91dCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICB4aHIudGltZW91dCA9IHRpbWVvdXQ7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMuc3Vic2NyaWJlKHJlc29sdmUsIHJlamVjdCwgdGltZW91dCk7XHJcbiAgICAgICAgICAgIHhoci5zZW5kKGJvZHkpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXHJcbiAgICBwcml2YXRlIHN1YnNjcmliZShyZXNvbHZlOiAodmFsdWU/OiBzdHJpbmcpID0+IHZvaWQsIHJlamVjdDogKHJlYXNvbj86IHN0cmluZykgPT4gdm9pZCwgdGltZW91dDogbnVtYmVyIHwgdW5kZWZpbmVkKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgeGhyID0gdGhpcy5feGhyO1xyXG5cclxuICAgICAgICBjb25zdCBsb2cgPSBuZXcgQXJyYXk8bnVtYmVyPigpO1xyXG5cclxuICAgICAgICBpZiAoeGhyIGluc3RhbmNlb2YgWE1MSHR0cFJlcXVlc3QpIHtcclxuICAgICAgICAgICAgeGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IChhRXZ0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBsb2cucHVzaCh4aHIucmVhZHlTdGF0ZSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoeGhyLnJlYWR5U3RhdGUgPT09IDQpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoeGhyLnN0YXR1cyA+PSAyMDAgJiYgeGhyLnN0YXR1cyA8IDMwMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHhoci5yZXNwb25zZVRleHQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdCh4aHIucmVzcG9uc2VUZXh0IHx8IHhoci5yZXNwb25zZVR5cGUgfHwgJ0NPUlMgcHJvYmxlbScpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB4aHIub25sb2FkID0gKCkgPT4gcmVzb2x2ZSh4aHIucmVzcG9uc2VUZXh0KTtcclxuICAgICAgICAgICAgeGhyLm9uZXJyb3IgPSAoKSA9PiByZWplY3QoJ1hEb21haW4gQ09SUyBwcm9ibGVtJyk7XHJcblxyXG4gICAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bWF4LWxpbmUtbGVuZ3RoXHJcbiAgICAgICAgICAgIC8vIEZpeGVzIGJ1ZyB3aXRoIElFOTogaHR0cHM6Ly9zb2NpYWwubXNkbi5taWNyb3NvZnQuY29tL0ZvcnVtcy9pZS9lbi1VUy8zMGVmM2FkZC03NjdjLTQ0MzYtYjhhOS1mMWNhMTliNDgxMmUvaWU5LXJ0bS14ZG9tYWlucmVxdWVzdC1pc3N1ZWQtcmVxdWVzdHMtbWF5LWFib3J0LWlmLWFsbC1ldmVudC1oYW5kbGVycy1ub3Qtc3BlY2lmaWVkP2ZvcnVtPWlld2ViZGV2ZWxvcG1lbnRcclxuICAgICAgICAgICAgKHhociBhcyBhbnkpLm9ucHJvZ3Jlc3MgPSAoKSA9PiB7IC8qKi8gfTtcclxuICAgICAgICAgICAgKHhociBhcyBhbnkpLm9udGltZW91dCA9ICgpID0+IHsgcmVqZWN0KCdUaW1lb3V0Jyk7IH07XHJcbiAgICAgICAgICAgIGlmICh0aW1lb3V0KSB7XHJcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHJlamVjdCgnTWFudWFsIHRpbWVvdXQnKSwgdGltZW91dCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBBamF4IHByb3ZpZGVyIGNvbnN0cnVjdG9yXHJcbiAqXHJcbiAqIEBpbnRlcm5hbFxyXG4gKiBAY2xhc3MgQWpheFxyXG4gKiBAaW1wbGVtZW50cyB7SUFqYXhQcm92aWRlcn1cclxuICovXHJcbmV4cG9ydCBjbGFzcyBBamF4IGltcGxlbWVudHMgSUFqYXhQcm92aWRlciB7XHJcbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xyXG4gICAgcHVibGljIHNlbmQob3B0aW9uczogSUFqYXhPcHRpb25zKTogUHJvbWlzZTxzdHJpbmc+IHtcclxuICAgICAgICBpZiAodHlwZW9mIGZldGNoICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5mZXRjaChvcHRpb25zKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXHJcbiAgICAgICAgY29uc3QgaXNBYnNvbHV0ZVVybCA9IG9wdGlvbnMudXJsLmluZGV4T2YoJzovLycpID4gMCB8fCBvcHRpb25zLnVybC5pbmRleE9mKCcvLycpID09PSAwO1xyXG4gICAgICAgIHJldHVybiBuZXcgQWpheFJlcXVlc3QoLyplbmFibGUgQ09SUzogKi8gaXNBYnNvbHV0ZVVybCkuc2VuZChvcHRpb25zKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGZldGNoKG9wdGlvbnM6IElBamF4T3B0aW9ucyk6IFByb21pc2U8c3RyaW5nPiB7XHJcbiAgICAgICAgcmV0dXJuIGZldGNoKG9wdGlvbnMudXJsLCB7XHJcbiAgICAgICAgICAgIGJvZHk6IG9wdGlvbnMuYm9keSxcclxuICAgICAgICAgICAgbWV0aG9kOiBvcHRpb25zLnR5cGVcclxuICAgICAgICB9KS50aGVuKChyZXNwb25zZTogUmVzcG9uc2UpID0+IC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovIHJlc3BvbnNlLnRleHQoKSk7XHJcbiAgICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL2lmZGVmLWxvYWRlci9pZmRlZi1sb2FkZXIuanM/REVCVUc9dHJ1ZSZQRVJGT1JNQU5DRV9BVURJVD10cnVlIS4vc3JjL2ZyYW1ld29yay9hamF4LnRzIiwiLy8gdHNsaW50OmRpc2FibGU6bm8tYW55XHJcbi8qKlxyXG4gKiBQcm92aWRlIHNpbmdsZSBleGVjdXRpb24gb2YgcGFzc2VkIGZ1bmN0aW9uXHJcbiAqXHJcbiAqIEBpbnRlcm5hbFxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFNpbmdsZXRvbjxURnVuYyBleHRlbmRzICguLi5hcmdzOiBBcnJheTxhbnk+KSA9PiBhbnk+IHtcclxuICAgIHB1YmxpYyByZWFkb25seSBleGVjdXRlT25jZTogVEZ1bmM7XHJcblxyXG4gICAgcHJpdmF0ZSBfZXhlY3V0ZWQgPSBmYWxzZTtcclxuXHJcbiAgICBwcml2YXRlIF9yZXN1bHQ6IGFueTtcclxuXHJcbiAgICBwdWJsaWMgZ2V0IGV4ZWN1dGVkKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5fZXhlY3V0ZWQ7IH1cclxuXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IF9mdW5jOiBURnVuY1xyXG4gICAgKSB7XHJcbiAgICAgICAgdGhpcy5leGVjdXRlT25jZSA9IHRoaXMuZXhlY3V0ZSBhcyBURnVuYztcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGV4ZWN1dGUgPSAoLi4uYXJnczogQXJyYXk8YW55PikgPT4ge1xyXG4gICAgICAgIGlmICh0aGlzLl9leGVjdXRlZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fcmVzdWx0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fcmVzdWx0ID0gdGhpcy5fZnVuYyguLi5hcmdzKTtcclxuXHJcbiAgICAgICAgdGhpcy5fZXhlY3V0ZWQgPSB0cnVlO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5fcmVzdWx0O1xyXG4gICAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy9pZmRlZi1sb2FkZXIvaWZkZWYtbG9hZGVyLmpzP0RFQlVHPXRydWUmUEVSRk9STUFOQ0VfQVVESVQ9dHJ1ZSEuL3NyYy9mcmFtZXdvcmsvc2luZ2xldG9uLnRzIiwiLyoqXHJcbiAqIEBpbnRlcm5hbFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGdyb3VwQnk8VEl0ZW0sIFRLZXk+KGFycmF5OiBBcnJheTxUSXRlbT4sIHByZWRpY2F0ZTogKG9iajogVEl0ZW0pID0+IFRLZXkpOiBNYXA8VEtleSwgQXJyYXk8VEl0ZW0+PiB7XHJcbiAgICByZXR1cm4gYXJyYXkucmVkdWNlKChtYXA6IE1hcDxUS2V5LCBBcnJheTxUSXRlbT4+LCBjdXJyZW50OiBUSXRlbSkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGtleSA9IHByZWRpY2F0ZShjdXJyZW50KTtcclxuICAgICAgICBsZXQgcHJldiA9IG1hcC5nZXQoa2V5KTtcclxuICAgICAgICBpZiAoIXByZXYpIHtcclxuICAgICAgICAgICAgbWFwLnNldChrZXksIHByZXYgPSBbXSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHByZXYucHVzaChjdXJyZW50KTtcclxuICAgICAgICByZXR1cm4gbWFwO1xyXG4gICAgfSwgbmV3IE1hcDxUS2V5LCBBcnJheTxUSXRlbT4+KCkpO1xyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy9pZmRlZi1sb2FkZXIvaWZkZWYtbG9hZGVyLmpzP0RFQlVHPXRydWUmUEVSRk9STUFOQ0VfQVVESVQ9dHJ1ZSEuL3NyYy9mcmFtZXdvcmsvdXRpbHMvZ3JvdXBCeS50cyIsImltcG9ydCB7IHRyYXZlcnNhbCB9IGZyb20gJy4vdHJhdmVyc2FsJztcclxuXHJcbi8qKlxyXG4gKiBPdmVycmlkZSB0aGUgZmlyc3Qgb2JqZWN0IGJ5IGFsbCBwcm9wZXJ0aWVzIGZyb20gdGhlIHNlY29uZFxyXG4gKiBSZXR1cm4gdGhlIGZpcnN0IG9iamVjdFxyXG4gKlxyXG4gKiBAaW50ZXJuYWxcclxuICogQHBhcmFtIHsqfSBkZXN0aW5hdGlvbiAtIG9iamVjdCB3aGF0IHdpbGwgYmUgb3ZlcnJpZGVkXHJcbiAqIEBwYXJhbSB7Kn0gc291cmNlIC0gb2JqZWN0IHdpdGggc291cmNlIGRhdGFcclxuICovXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gb3ZlcnJpZGUoZGVzdGluYXRpb246IGFueSwgLi4uc291cmNlczogQXJyYXk8YW55Pik6IGFueSB7XHJcbiAgICBpZiAoIWRlc3RpbmF0aW9uKSB7XHJcbiAgICAgICAgZGVzdGluYXRpb24gPSB7fTtcclxuICAgIH1cclxuXHJcbiAgICB0cmF2ZXJzYWwoKG5hbWUsIHNvdXJjZVZhbHVlKSA9PiB7XHJcbiAgICAgICAgZGVzdGluYXRpb25bbmFtZV0gPSBzb3VyY2VWYWx1ZTtcclxuICAgIH0sIGRlc3RpbmF0aW9uLCBzb3VyY2VzKTtcclxuXHJcbiAgICByZXR1cm4gZGVzdGluYXRpb247XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL2lmZGVmLWxvYWRlci9pZmRlZi1sb2FkZXIuanM/REVCVUc9dHJ1ZSZQRVJGT1JNQU5DRV9BVURJVD10cnVlIS4vc3JjL2ZyYW1ld29yay91dGlscy9vdmVycmlkZS50cyIsImltcG9ydCB7IHRyYXZlcnNhbCB9IGZyb20gJy4vdHJhdmVyc2FsJztcclxuXHJcbi8qKlxyXG4gKiBDbG9uZSBvYmplY3QgZGF0YSB3aXRob3V0IGZ1bmN0aW9uc1xyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHNhZmVDbG9uZShzb3VyY2U6IGFueSk6IGFueSB7XHJcbiAgICBjb25zdCBkZXN0aW5hdGlvbjogYW55ID0geyB9O1xyXG5cclxuICAgIHRyYXZlcnNhbCgobmFtZSwgc291cmNlVmFsdWUpID0+IHtcclxuICAgICAgICBpZiAodHlwZW9mIChzb3VyY2VWYWx1ZSkgIT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgICAgZGVzdGluYXRpb25bbmFtZV0gPSBzb3VyY2VWYWx1ZTtcclxuICAgICAgICB9XHJcbiAgICB9LCBkZXN0aW5hdGlvbiwgWyBzb3VyY2UgXSk7XHJcblxyXG4gICAgcmV0dXJuIGRlc3RpbmF0aW9uO1xyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy9pZmRlZi1sb2FkZXIvaWZkZWYtbG9hZGVyLmpzP0RFQlVHPXRydWUmUEVSRk9STUFOQ0VfQVVESVQ9dHJ1ZSEuL3NyYy9mcmFtZXdvcmsvdXRpbHMvc2FmZUNsb25lLnRzIiwiaW1wb3J0IHsgSUxvZ2dlciB9IGZyb20gJy4vbG9nZ2VyJztcclxuXHJcbi8qKlxyXG4gKiBQcmludCBpbnRlcm5hbCBsb2cgbWVzc2FnZXMgaW4gYnJvd3NlciBjb25zb2xlXHJcbiAqXHJcbiAqIElzIG5vdCBzdXBwb3J0ZWQgZm9yIHNvbWUgZW52aXJvbm1lbnRcclxuICpcclxuICogQGludGVybmFsXHJcbiAqIEBjbGFzcyBDb25zb2xlTG9nZ2VyXHJcbiAqIEBpbXBsZW1lbnRzIHtJTG9nZ2VyfVxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIENvbnNvbGVMb2dnZXIgaW1wbGVtZW50cyBJTG9nZ2VyIHtcclxuICAgIHB1YmxpYyByZWFkb25seSBwcmVmaXg6IHN0cmluZyA9IGBbbWVzc2FnaW5nLWNsaWVudC5qc106IGA7XHJcblxyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBfb3B0aW9uczogeyBtdXRlOiBib29sZWFuIH1cclxuICAgICkgeyB9XHJcblxyXG4gICAgcHVibGljIGZhdGFsKG1lc3NhZ2U6IHN0cmluZywgZXJyb3I/OiBFcnJvcik6IHZvaWQge1xyXG4gICAgICAgIGlmICghdGhpcy5fb3B0aW9ucy5tdXRlKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IodGhpcy5wcmVmaXggKyBtZXNzYWdlLCBlcnJvcik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBlcnJvcihtZXNzYWdlOiBzdHJpbmcsIGVycm9yPzogRXJyb3IpOiB2b2lkIHtcclxuICAgICAgICBpZiAoIXRoaXMuX29wdGlvbnMubXV0ZSkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKHRoaXMucHJlZml4ICsgbWVzc2FnZSwgZXJyb3IpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbG9nKG1lc3NhZ2U6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgICAgIGlmICghdGhpcy5fb3B0aW9ucy5tdXRlKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMucHJlZml4ICsgbWVzc2FnZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy9pZmRlZi1sb2FkZXIvaWZkZWYtbG9hZGVyLmpzP0RFQlVHPXRydWUmUEVSRk9STUFOQ0VfQVVESVQ9dHJ1ZSEuL3NyYy9sb2dzL2NvbnNvbGUtbG9nZ2VyLnRzIiwiaW1wb3J0IHsgRXZlbnRFbWl0dGVyIH0gZnJvbSAnLi4vZnJhbWV3b3JrL2V2ZW50LWVtaXR0ZXInO1xyXG5pbXBvcnQgeyBJTG9nZ2VyIH0gZnJvbSAnLi9sb2dnZXInO1xyXG5pbXBvcnQgeyBJV29ya2VyTG9nIH0gZnJvbSAnLi93b3JrZXItbG9nJztcclxuXHJcbi8qKlxyXG4gKiBTZW5kIGxvZyBtZXNzYWdlcyBpbnRvIEV2ZW50RW1pdHRlclxyXG4gKlxyXG4gKiBAaW50ZXJuYWxcclxuICogQGNsYXNzIEV2ZW50TG9nZ2VyXHJcbiAqIEBpbXBsZW1lbnRzIHtJTG9nZ2VyfVxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIEV2ZW50TG9nZ2VyIGltcGxlbWVudHMgSUxvZ2dlciB7XHJcbiAgICBwdWJsaWMgcmVhZG9ubHkgb25sb2cgPSBuZXcgRXZlbnRFbWl0dGVyPElXb3JrZXJMb2c+KCk7XHJcblxyXG4gICAgcHVibGljIGZhdGFsKG1lc3NhZ2U6IHN0cmluZywgZXJyb3I/OiBFcnJvcik6IHZvaWQge1xyXG4gICAgICAgIHRoaXMub25sb2cuZW1pdCh7bGV2ZWw6ICdmYXRhbCcsIG1lc3NhZ2UsIGVycm9yfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGVycm9yKG1lc3NhZ2U6IHN0cmluZywgZXJyb3I/OiBFcnJvcik6IHZvaWQge1xyXG4gICAgICAgIHRoaXMub25sb2cuZW1pdCh7bGV2ZWw6ICdlcnJvcicsIG1lc3NhZ2UsIGVycm9yfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGxvZyhtZXNzYWdlOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLm9ubG9nLmVtaXQoe2xldmVsOiAnbG9nJywgbWVzc2FnZX0pO1xyXG4gICAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy9pZmRlZi1sb2FkZXIvaWZkZWYtbG9hZGVyLmpzP0RFQlVHPXRydWUmUEVSRk9STUFOQ0VfQVVESVQ9dHJ1ZSEuL3NyYy9sb2dzL2V2ZW50LWxvZ2dlci50cyIsImltcG9ydCB7IElMb2dnZXIgfSBmcm9tICcuL2xvZ2dlcic7XHJcblxyXG4vKipcclxuICogUHJveHkgbG9nZ2VyIHRvIHJlc2VuZCBhbGwgbG9nIG1lc3NhZ2VzIHRvIGFub3RoZXIgbG9nZ2Vyc1xyXG4gKlxyXG4gKiBAaW50ZXJuYWxcclxuICogQGNsYXNzIFVuaXZlcnNhbExvZ2dlclxyXG4gKiBAaW1wbGVtZW50cyB7SUxvZ2dlcn1cclxuICovXHJcbmV4cG9ydCBjbGFzcyBVbml2ZXJzYWxMb2dnZXIgaW1wbGVtZW50cyBJTG9nZ2VyIHtcclxuICAgIHB1YmxpYyBlbmFibGVkOiBib29sZWFuID0gdHJ1ZTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgbG9nZ2VyczogQXJyYXk8SUxvZ2dlcj4gPSBbXVxyXG4gICAgKSB7IH1cclxuXHJcbiAgICBwdWJsaWMgZmF0YWwobWVzc2FnZTogc3RyaW5nLCBlcnJvcj86IEVycm9yKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuZW5hYmxlZCkge1xyXG4gICAgICAgICAgICB0aGlzLmxvZ2dlcigobCkgPT4gbC5mYXRhbChtZXNzYWdlLCBlcnJvcikpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZXJyb3IobWVzc2FnZTogc3RyaW5nLCBlcnJvcj86IEVycm9yKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuZW5hYmxlZCkge1xyXG4gICAgICAgICAgICB0aGlzLmxvZ2dlcigobCkgPT4gbC5lcnJvcihtZXNzYWdlLCBlcnJvcikpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbG9nKG1lc3NhZ2U6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLmVuYWJsZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5sb2dnZXIoKGwpID0+IGwubG9nKG1lc3NhZ2UpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXBsYWNlIGV4aXN0aW5nIGxvZ2dlcnMgdG8gbmV3IG9uZXNcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5PElMb2dnZXI+fSBsb2dnZXJzXHJcbiAgICAgKiBAbWVtYmVyb2YgVW5pdmVyc2FsTG9nZ2VyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyByZXBsYWNlKG5ld0xvZ2dlcnM6IEFycmF5PElMb2dnZXI+KTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5sb2dnZXJzLmxlbmd0aCA9IDA7XHJcblxyXG4gICAgICAgIGNvbnN0IGxlbmd0aCA9IG5ld0xvZ2dlcnMubGVuZ3RoO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy5sb2dnZXJzLnB1c2gobmV3TG9nZ2Vyc1tpXSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgbG9nZ2VyKGV4ZWN1dGU6IChsb2dnZXI6IElMb2dnZXIpID0+IHZvaWQpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBsb2dnZXJzID0gdGhpcy5sb2dnZXJzO1xyXG4gICAgICAgIGNvbnN0IGxlbmd0aCA9IGxvZ2dlcnMubGVuZ3RoO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgZXhlY3V0ZShsb2dnZXJzW2ldKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL2lmZGVmLWxvYWRlci9pZmRlZi1sb2FkZXIuanM/REVCVUc9dHJ1ZSZQRVJGT1JNQU5DRV9BVURJVD10cnVlIS4vc3JjL2xvZ3MvdW5pdmVyc2FsLWxvZ2dlci50cyIsImV4cG9ydCAqIGZyb20gJy4vcXVldWUnO1xyXG5leHBvcnQgKiBmcm9tICcuL21lbW9yeSc7XHJcbmV4cG9ydCAqIGZyb20gJy4vc2FtcGxlZC1xdWV1ZSc7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy9pZmRlZi1sb2FkZXIvaWZkZWYtbG9hZGVyLmpzP0RFQlVHPXRydWUmUEVSRk9STUFOQ0VfQVVESVQ9dHJ1ZSEuL3NyYy9xdWV1ZXMvaW5kZXgudHMiLCJpbXBvcnQgeyBJbmRleGVkREJQcm92aWRlciB9IGZyb20gJy4vaW5kZXhlZGRiLXByb3ZpZGVyJztcclxuXHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBJbmRleGVkRGJVdGlscyB7XHJcbiAgICBwdWJsaWMgc3RhdGljIG9wZW4oXHJcbiAgICAgICAgbmFtZTogc3RyaW5nLFxyXG4gICAgICAgIHZlcnNpb246IG51bWJlcixcclxuICAgICAgICBvbnVwZ3JhZGVuZWVkZWQ6IChkYjogSURCRGF0YWJhc2UpID0+IHZvaWQsXHJcbiAgICAgICAgYXR0ZW1wdHM6IG51bWJlciA9IDNcclxuICAgICk6IFByb21pc2U8SURCRGF0YWJhc2U+IHtcclxuICAgICAgICBjb25zdCBmYWN0b3J5ID0gSW5kZXhlZERCUHJvdmlkZXIuZ2V0SW5kZXhlZERCKCk7XHJcblxyXG4gICAgICAgIGlmICghZmFjdG9yeSkge1xyXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoJ0Nhbm5vdCBpbnN0YW50aWF0ZSBJbmRleGVkREIgZmFjdG9yeS4nKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZTxJREJEYXRhYmFzZT4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgYXR0ZW1wdENvdW50ZXIgPSAwO1xyXG4gICAgICAgICAgICBjb25zdCBvcGVuID0gKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgYXR0ZW1wdENvdW50ZXIrKztcclxuXHJcbiAgICAgICAgICAgICAgICBjb25zdCByZXF1ZXN0ID0gZmFjdG9yeS5vcGVuKG5hbWUsIDEpO1xyXG5cclxuICAgICAgICAgICAgICAgIHJlcXVlc3Qub25zdWNjZXNzID0gKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGRiID0gcmVxdWVzdC5yZXN1bHQgYXMgSURCRGF0YWJhc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShkYik7XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgcmVxdWVzdC5vbnVwZ3JhZGVuZWVkZWQgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZGIgPSByZXF1ZXN0LnJlc3VsdCBhcyBJREJEYXRhYmFzZTtcclxuICAgICAgICAgICAgICAgICAgICBvbnVwZ3JhZGVuZWVkZWQoZGIpO1xyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIHJlcXVlc3Qub25lcnJvciA9ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoYXR0ZW1wdENvdW50ZXIgPj0gYXR0ZW1wdHMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGBFcnJvciBvbiBvcGVubmluZyBJbmRleGVkREIgJyR7bmFtZX0nLiBBdHRlbXB0cyBjb3VudDogJHthdHRlbXB0Q291bnRlcn0uYCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wZW5TYWZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIHJlcXVlc3Qub25ibG9ja2VkID0gKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIG9wZW5TYWZlKCk7XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBjb25zdCBvcGVuU2FmZSA9ICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICAgICAgb3BlbigpO1xyXG4gICAgICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyb3IubWVzc2FnZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIG9wZW5TYWZlKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyB0cmFuc2FjdGlvbjxUPihcclxuICAgICAgICBzdG9yZUZhY3Rvcnk6ICgpID0+IElEQk9iamVjdFN0b3JlLFxyXG4gICAgICAgIGFjdGlvbjogKHN0b3JhZ2U6IElEQk9iamVjdFN0b3JlLCByZXN1bHQ6IFQpID0+IHZvaWQsXHJcbiAgICAgICAgcmVzdWx0OiBUXHJcbiAgICApOiBQcm9taXNlPFQ+IHtcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2U8VD4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBzdG9yYWdlID0gc3RvcmVGYWN0b3J5KCk7XHJcblxyXG4gICAgICAgICAgICBzdG9yYWdlLnRyYW5zYWN0aW9uLm9uY29tcGxldGUgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3VsdCk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHN0b3JhZ2UudHJhbnNhY3Rpb24ub25hYm9ydCA9IHN0b3JhZ2UudHJhbnNhY3Rpb24ub25lcnJvciA9IChlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KChlIGFzIGFueSkubWVzc2FnZSB8fCBlLnR5cGUpO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgYWN0aW9uKHN0b3JhZ2UsIHJlc3VsdCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyByZXF1ZXN0PFREYXRhPihcclxuICAgICAgICByZXF1ZXN0OiBJREJSZXF1ZXN0LFxyXG4gICAgICAgIGFjdGlvbj86IChkYXRhOiBURGF0YSkgPT4gdm9pZFxyXG4gICAgKTogdm9pZCB7XHJcbiAgICAgICAgcmVxdWVzdC5vbnN1Y2Nlc3MgPSAoZSkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBkYXRhID0gKGUudGFyZ2V0IGFzIGFueSkucmVzdWx0IGFzIFREYXRhO1xyXG5cclxuICAgICAgICAgICAgaWYgKGFjdGlvbikge1xyXG4gICAgICAgICAgICAgICAgYWN0aW9uKGRhdGEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICByZXF1ZXN0Lm9uZXJyb3IgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIHJlcXVlc3QudHJhbnNhY3Rpb24uYWJvcnQoKTtcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgYWRkQXJyYXk8VEl0ZW0+KFxyXG4gICAgICAgIHN0b3JhZ2U6IElEQk9iamVjdFN0b3JlLFxyXG4gICAgICAgIGl0ZW1zOiBBcnJheTxUSXRlbT4sXHJcbiAgICAgICAgY29tcGxldGVkPzogKCkgPT4gdm9pZFxyXG4gICAgKTogdm9pZCB7XHJcbiAgICAgICAgbGV0IGkgPSAwO1xyXG5cclxuICAgICAgICBjb25zdCBhZGROZXh0ID0gKCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoaSA8IGl0ZW1zLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaXRlbSA9IGl0ZW1zW2ldO1xyXG4gICAgICAgICAgICAgICAgaSsrO1xyXG4gICAgICAgICAgICAgICAgSW5kZXhlZERiVXRpbHMucmVxdWVzdDxJREJDdXJzb3JXaXRoVmFsdWU+KHN0b3JhZ2UuYWRkKGl0ZW0pLCBhZGROZXh0KTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlmIChjb21wbGV0ZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb21wbGV0ZWQoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGFkZE5leHQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIHJlbW92ZShuYW1lOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICBjb25zdCBmYWN0b3J5ID0gSW5kZXhlZERCUHJvdmlkZXIuZ2V0SW5kZXhlZERCKCk7XHJcblxyXG4gICAgICAgIGlmICghZmFjdG9yeSkge1xyXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoJ0Nhbm5vdCBpbnN0YW50aWF0ZSBJbmRleGVkREIgZmFjdG9yeS4nKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZTx2b2lkPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHJlcXVlc3QgPSBmYWN0b3J5LmRlbGV0ZURhdGFiYXNlKG5hbWUpO1xyXG4gICAgICAgICAgICByZXF1ZXN0Lm9uc3VjY2VzcyA9ICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgcmVxdWVzdC5vbmVycm9yID0gKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmVqZWN0KGBFcnJvciBvbiByZW1vdmluZyBJbmRleGVkREIgJyR7bmFtZX0nYCk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHJlcXVlc3Qub25ibG9ja2VkID0gKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmVqZWN0KGBSZW1vdmluZyAnJHtuYW1lfScgd2FzIGJsb2NrZWQuYCk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL2lmZGVmLWxvYWRlci9pZmRlZi1sb2FkZXIuanM/REVCVUc9dHJ1ZSZQRVJGT1JNQU5DRV9BVURJVD10cnVlIS4vc3JjL2ZyYW1ld29yay9pbmRleGVkZGItdXRpbHMudHMiLCJpbXBvcnQgeyBHdWlkUHJvdmlkZXIgfSBmcm9tICcuLi8uLi9mcmFtZXdvcmsvZ3VpZCc7XHJcbmltcG9ydCB7IElXb3JrZXJNZXNzYWdlLCBJV29ya2VyTWVzc2FnZVJlY2VpdmVyLCBJV29ya2VyTWVzc2FnZVNlbmRlciwgV29ya2VyRGF0YVR5cGUgfSBmcm9tICcuLi93b3JrZXItZGVmaW5pdGlvbnMnO1xyXG5pbXBvcnQgeyBJUmVxdWVzdEVudmVsb3AgfSBmcm9tICcuL3dvcmtlci1yZXF1ZXN0LXJlY2VpdmVyJztcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSVJlc3BvbnNlRW52ZWxvcDxUVHlwZSBleHRlbmRzIFdvcmtlckRhdGFUeXBlLCBUUmVzcG9uc2U+IGV4dGVuZHMgSVdvcmtlck1lc3NhZ2U8VFR5cGU+ICB7XHJcbiAgICByZXNwb25zZT86IFRSZXNwb25zZTtcclxuXHJcbiAgICBlcnJvcj86IHsgbWVzc2FnZTogc3RyaW5nIH07XHJcblxyXG4gICAgbWVzc2FnZUlkOiBzdHJpbmc7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUVycm9yIHtcclxuICAgIG1lc3NhZ2U6IHN0cmluZztcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFdvcmtlclJlcXVlc3RTZW5kZXI8VFR5cGUgZXh0ZW5kcyBXb3JrZXJEYXRhVHlwZSwgVFJlcXVlc3QsIFRSZXNwb25zZT4ge1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfZGljdGlvbmFyeToge1xyXG4gICAgICAgIFttZXNzYWdlaWQ6IHN0cmluZ106IHtcclxuICAgICAgICAgICAgcmVzb2x2ZT86IChyZXNwb25zZT86IFRSZXNwb25zZSkgPT4gdm9pZCxcclxuICAgICAgICAgICAgcmVqZWN0PzogKGVycm9yOiBJRXJyb3IpID0+IHZvaWRcclxuICAgICAgICB9XHJcbiAgICB9ID0geyB9O1xyXG5cclxuICAgIHByaXZhdGUgcmVhZG9ubHkgX2d1aWQgPSBHdWlkUHJvdmlkZXIuZGVmYXVsdDtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgdHlwZTogVFR5cGUsXHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBfc2VuZGVyOiBJV29ya2VyTWVzc2FnZVNlbmRlcixcclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IF9yZWNlaXZlcjogSVdvcmtlck1lc3NhZ2VSZWNlaXZlclxyXG4gICAgKSB7XHJcbiAgICAgICAgX3JlY2VpdmVyLmFkZEV2ZW50TGlzdGVuZXIodHlwZSwgdGhpcy5fcmVzcG9uc2UpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZW5kKGRhdGE/OiBUUmVxdWVzdCwgcmVzb2x2ZWQ/OiAocmVzcG9uc2U6IFRSZXNwb25zZSkgPT4gdm9pZCwgcmVqZWN0ZWQ/OiAoZXJyb3I6IElFcnJvcikgPT4gdm9pZCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IG1lc3NhZ2VJZCA9IHRoaXMuX2d1aWQubmV4dCgpO1xyXG5cclxuICAgICAgICB0aGlzLl9kaWN0aW9uYXJ5W21lc3NhZ2VJZF0gPSB7IHJlc29sdmU6IHJlc29sdmVkLCByZWplY3Q6IHJlamVjdGVkIH07XHJcblxyXG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IHRoaXMuX3NlbmRlci5wb3N0TWVzc2FnZSh7IHR5cGU6IHRoaXMudHlwZSwgbWVzc2FnZUlkLCByZXF1ZXN0OiBkYXRhIH0gYXMgSVJlcXVlc3RFbnZlbG9wPFRUeXBlLCBUUmVxdWVzdD4pO1xyXG4gICAgICAgIGlmIChyZXN1bHQgJiYgdHlwZW9mIHJlc3VsdC5jYXRjaCA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICByZXN1bHQuY2F0Y2gocmVqZWN0ZWQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZGlzcG9zZSgpIHtcclxuICAgICAgICB0aGlzLl9yZWNlaXZlci5yZW1vdmVFdmVudExpc3RlbmVyKHRoaXMudHlwZSwgdGhpcy5fcmVzcG9uc2UpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX3Jlc3BvbnNlID0gKGRhdGE6IElSZXNwb25zZUVudmVsb3A8VFR5cGUsIFRSZXNwb25zZT4pID0+IHtcclxuICAgICAgICBjb25zdCBtZXNzYWdlSWQgPSBkYXRhLm1lc3NhZ2VJZDtcclxuXHJcbiAgICAgICAgaWYgKG1lc3NhZ2VJZCkge1xyXG4gICAgICAgICAgICBjb25zdCBjYWxsYmFja3MgPSB0aGlzLl9kaWN0aW9uYXJ5W21lc3NhZ2VJZF07XHJcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLl9kaWN0aW9uYXJ5W21lc3NhZ2VJZF07XHJcblxyXG4gICAgICAgICAgICBpZiAoY2FsbGJhY2tzKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0YS5lcnJvcikge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgY2FsbGJhY2tzLnJlamVjdCA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFja3MucmVqZWN0KGRhdGEuZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBjYWxsYmFja3MucmVzb2x2ZSA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFja3MucmVzb2x2ZShkYXRhLnJlc3BvbnNlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL2lmZGVmLWxvYWRlci9pZmRlZi1sb2FkZXIuanM/REVCVUc9dHJ1ZSZQRVJGT1JNQU5DRV9BVURJVD10cnVlIS4vc3JjL3dvcmtlcnMvc2VuZGVycy93b3JrZXItcmVxdWVzdC1zZW5kZXIudHMiLCJpbXBvcnQgeyBJTG9nZ2VyIH0gZnJvbSAnLi4vLi4vbG9ncy9sb2dnZXInO1xyXG5pbXBvcnQgeyBJTGlzdGVuZXIsIElXb3JrZXJNZXNzYWdlLCBJV29ya2VyTWVzc2FnZVJlY2VpdmVyLCBNZXNzYWdlRXZlbnRMaXN0ZW5lciwgV29ya2VyRGF0YVR5cGUgfSBmcm9tICcuLi93b3JrZXItZGVmaW5pdGlvbnMnO1xyXG5cclxuLyoqXHJcbiAqIENsYXNzIGNvbnZlcnRzIGphdmFzY3JpcHQgbWVzc2FnZXMgd2l0aCBzdGFuZGFyZCBldmVudCAnbWVzc2FnZScgdG8gc3Ryb25nbHkgdHlwZWQgY3VzdG9tIG1lc3NhZ2VzXHJcbiAqXHJcbiAqIEBpbnRlcm5hbFxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIE1lc3NhZ2VSZWNlaXZlciBpbXBsZW1lbnRzIElXb3JrZXJNZXNzYWdlUmVjZWl2ZXIge1xyXG4gICAgcHJpdmF0ZSBfZGljOiB7IFt0eXBlOiBzdHJpbmddOiBBcnJheTxJTGlzdGVuZXI8YW55Pj4gfSA9IHsgfTtcclxuICAgIHByaXZhdGUgX2J1ZmZlcnM6IHsgW3R5cGU6IHN0cmluZ106IEFycmF5PE1lc3NhZ2VFdmVudD4gfSA9IHsgfTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IF9yZWNlaXZlcjoge1xyXG4gICAgICAgICAgICBhZGRFdmVudExpc3RlbmVyOiAodHlwZTogJ21lc3NhZ2UnLCBsaXN0ZW5lcjogTWVzc2FnZUV2ZW50TGlzdGVuZXIpID0+IHZvaWQsXHJcbiAgICAgICAgICAgIHJlbW92ZUV2ZW50TGlzdGVuZXI6ICh0eXBlOiAnbWVzc2FnZScsIGxpc3RlbmVyOiBNZXNzYWdlRXZlbnRMaXN0ZW5lcikgPT4gdm9pZFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBfbG9nZ2VyOiBJTG9nZ2VyXHJcbiAgICApIHtcclxuICAgICAgICBfcmVjZWl2ZXIuYWRkRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIHRoaXMuX2hhbmRsZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhZGRFdmVudExpc3RlbmVyPFRNZXNzYWdlIGV4dGVuZHMgSVdvcmtlck1lc3NhZ2U8V29ya2VyRGF0YVR5cGU+Pih0eXBlOiBzdHJpbmcsIGxpc3RlbmVyOiBJTGlzdGVuZXI8VE1lc3NhZ2U+KSB7XHJcbiAgICAgICAgY29uc3QgbGlzdGVuZXJzID0gdGhpcy5fZGljW3R5cGVdID0gdGhpcy5fZGljW3R5cGVdIHx8IFtdO1xyXG5cclxuICAgICAgICBsaXN0ZW5lcnMucHVzaChsaXN0ZW5lcik7XHJcblxyXG4gICAgICAgIHRoaXMuZmx1c2hCdWZmZXIodHlwZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlbW92ZUV2ZW50TGlzdGVuZXI8VE1lc3NhZ2UgZXh0ZW5kcyBJV29ya2VyTWVzc2FnZTxXb3JrZXJEYXRhVHlwZT4+KHR5cGU6IHN0cmluZywgbGlzdGVuZXI6IElMaXN0ZW5lcjxUTWVzc2FnZT4pIHtcclxuICAgICAgICBjb25zdCBsaXN0ZW5lcnMgPSB0aGlzLl9kaWNbdHlwZV07XHJcblxyXG4gICAgICAgIGlmIChsaXN0ZW5lcnMpIHtcclxuICAgICAgICAgICAgY29uc3QgaW5kZXggPSBsaXN0ZW5lcnMuaW5kZXhPZihsaXN0ZW5lcik7XHJcbiAgICAgICAgICAgIGlmIChpbmRleCA+PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBsaXN0ZW5lcnMuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGxpc3RlbmVycy5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgICAgIGRlbGV0ZSB0aGlzLl9kaWNbdHlwZV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGRpc3Bvc2UoKSB7XHJcbiAgICAgICAgdGhpcy5fZGljID0geyB9O1xyXG4gICAgICAgIHRoaXMuX2J1ZmZlcnMgPSB7IH07XHJcbiAgICAgICAgdGhpcy5fcmVjZWl2ZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIHRoaXMuX2hhbmRsZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZmx1c2hCdWZmZXIodHlwZTogc3RyaW5nKSB7XHJcbiAgICAgICAgY29uc3QgYnVmZmVyID0gdGhpcy5fYnVmZmVyc1t0eXBlXTtcclxuICAgICAgICBpZiAoYnVmZmVyICYmIGJ1ZmZlci5sZW5ndGggIT09IDApIHtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBsZW5ndGggPSBidWZmZXIubGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2hhbmRsZXIoYnVmZmVyW2ldKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJ1ZmZlci5sZW5ndGggPSAwO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfaGFuZGxlciA9IChldmVudDogTWVzc2FnZUV2ZW50KSA9PiB7XHJcbiAgICAgICAgY29uc3QgcmVxdWVzdCA9IGV2ZW50LmRhdGEgYXMgSVdvcmtlck1lc3NhZ2U8V29ya2VyRGF0YVR5cGU+O1xyXG5cclxuICAgICAgICBpZiAocmVxdWVzdCAmJiByZXF1ZXN0LnR5cGUpIHtcclxuICAgICAgICAgICAgY29uc3QgbGlzdGVuZXJzID0gdGhpcy5fZGljW3JlcXVlc3QudHlwZV07XHJcblxyXG4gICAgICAgICAgICBpZiAobGlzdGVuZXJzKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGxpc3RlbmVyIG9mIGxpc3RlbmVycykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpc3RlbmVyKHJlcXVlc3QpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2xvZ2dlci5lcnJvcihgRXJyb3Igb24gZXhlY3V0aW5nIGxpc3RlbmVyIGZvciBtZXNzYWdlIHR5cGUgJHtyZXF1ZXN0LnR5cGV9YCwgZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGJ1ZmZlciA9IHRoaXMuX2J1ZmZlcnNbcmVxdWVzdC50eXBlXSB8fCAodGhpcy5fYnVmZmVyc1tyZXF1ZXN0LnR5cGVdID0gW10pO1xyXG4gICAgICAgICAgICAgICAgYnVmZmVyLnB1c2goZXZlbnQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy9pZmRlZi1sb2FkZXIvaWZkZWYtbG9hZGVyLmpzP0RFQlVHPXRydWUmUEVSRk9STUFOQ0VfQVVESVQ9dHJ1ZSEuL3NyYy93b3JrZXJzL3NlbmRlcnMvbWVzc2FnZS1yZWNlaXZlci50cyIsImV4cG9ydCBpbnRlcmZhY2UgSVJlc3BvbnNlRW1pdHRlcjxUUmVxdWVzdCwgVFJlc3BvbnNlPiB7XHJcbiAgICBpbnZva2UocmVxdWVzdDogVFJlcXVlc3QpOiBUUmVzcG9uc2UgfCBQcm9taXNlPFRSZXNwb25zZT47XHJcblxyXG4gICAgc3RvcCgpOiB2b2lkO1xyXG59XHJcblxyXG5leHBvcnQgdHlwZSBJSGFuZGxlcjxUUmVxdWVzdCwgVFJlc3BvbnNlPiA9IChyZXF1ZXN0OiBUUmVxdWVzdCkgPT4gVFJlc3BvbnNlIHwgUHJvbWlzZTxUUmVzcG9uc2U+O1xyXG5cclxuLyoqXHJcbiAqIEhhbmRsZXIgZm9yIHRoaXMgZW1pdHRlciBpcyBvcHRpb25hbC5cclxuICogRGVmYXVsdCB2YWx1ZSB3aWxsIGJlIHJldHVybmVkIG9uIHVuZGVmaW5lZCBoYW5kbGVyLlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIE9wdGlvbmFsUmVzcG9uc2VFbWl0dGVyPFRSZXF1ZXN0LCBUUmVzcG9uc2U+IGltcGxlbWVudHMgSVJlc3BvbnNlRW1pdHRlcjxUUmVxdWVzdCwgVFJlc3BvbnNlPiB7XHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgZGVmOiBUUmVzcG9uc2UsXHJcbiAgICAgICAgcHVibGljIGhhbmRsZXI/OiBJSGFuZGxlcjxUUmVxdWVzdCwgVFJlc3BvbnNlPlxyXG4gICAgKSB7IH1cclxuXHJcbiAgICBwdWJsaWMgcmVhZG9ubHkgaW52b2tlID0gKHJlcXVlc3Q6IFRSZXF1ZXN0KTogVFJlc3BvbnNlIHwgUHJvbWlzZTxUUmVzcG9uc2U+ID0+IHtcclxuICAgICAgICBpZiAodGhpcy5oYW5kbGVyKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmhhbmRsZXIocmVxdWVzdCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLmRlZjtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RvcCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmhhbmRsZXIgPSB1bmRlZmluZWQ7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBIYW5kbGVyIGZvciB0aGlzIGVtaXR0ZXIgaXMgbWFuZGF0b3J5LlxyXG4gKiBBbGwgcmVxdWVzdHMgd2l0aG91dCBoYW5kbGVyIHdpbGwgYmUgYnVmZXJyZWQgYW5kIHBhc3NlZCB0byBhIG5ldyBoYW5kbGVyIG9uIGl0cyBzZXR0aW5nLlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIE1hbmRhdG9yeVJlc3BvbnNlRW1pdHRlcjxUUmVxdWVzdCwgVFJlc3BvbnNlPiBpbXBsZW1lbnRzIElSZXNwb25zZUVtaXR0ZXI8VFJlcXVlc3QsIFRSZXNwb25zZT4ge1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfYnVmZmVyID0gbmV3IEFycmF5PHsgcmVxdWVzdDogVFJlcXVlc3QsIHJlc29sdmU6IChyZXNwb25zZTogVFJlc3BvbnNlIHwgUHJvbWlzZUxpa2U8VFJlc3BvbnNlPikgPT4gdm9pZCB9PigpO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHByaXZhdGUgX2hhbmRsZXI/OiBJSGFuZGxlcjxUUmVxdWVzdCwgVFJlc3BvbnNlPlxyXG4gICAgKSB7IH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGhhbmRsZXIoKTogdW5kZWZpbmVkIHwgSUhhbmRsZXI8VFJlcXVlc3QsIFRSZXNwb25zZT4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9oYW5kbGVyO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHNldCBoYW5kbGVyKHZhbHVlOiB1bmRlZmluZWQgfCBJSGFuZGxlcjxUUmVxdWVzdCwgVFJlc3BvbnNlPikge1xyXG4gICAgICAgIHRoaXMuX2hhbmRsZXIgPSB2YWx1ZTtcclxuICAgICAgICB0aGlzLmZsdXNoQnVmZmVyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlYWRvbmx5IGludm9rZSA9IChyZXF1ZXN0OiBUUmVxdWVzdCk6IFRSZXNwb25zZSB8IFByb21pc2U8VFJlc3BvbnNlPiA9PiB7XHJcbiAgICAgICAgaWYgKHRoaXMuaGFuZGxlcikge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5oYW5kbGVyKHJlcXVlc3QpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLl9idWZmZXIucHVzaCh7IHJlcXVlc3QsIHJlc29sdmUgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0b3AoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5oYW5kbGVyID0gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZmx1c2hCdWZmZXIoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2hhbmRsZXIgJiYgdGhpcy5fYnVmZmVyLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgZm9yIChjb25zdCBkYXRhIG9mIHRoaXMuX2J1ZmZlcikge1xyXG4gICAgICAgICAgICAgICAgZGF0YS5yZXNvbHZlKHRoaXMuaW52b2tlKGRhdGEucmVxdWVzdCkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy9pZmRlZi1sb2FkZXIvaWZkZWYtbG9hZGVyLmpzP0RFQlVHPXRydWUmUEVSRk9STUFOQ0VfQVVESVQ9dHJ1ZSEuL3NyYy93b3JrZXJzL3NlbmRlcnMvcmVzcG9uc2UtZW1pdHRlci50cyIsImltcG9ydCB7IEV2ZW50RW1pdHRlciB9IGZyb20gJy4uLy4uL2ZyYW1ld29yay9ldmVudC1lbWl0dGVyJztcclxuaW1wb3J0IHsgSVdvcmtlck1lc3NhZ2UsIElXb3JrZXJNZXNzYWdlUmVjZWl2ZXIsIFdvcmtlckRhdGFUeXBlIH0gZnJvbSAnLi4vd29ya2VyLWRlZmluaXRpb25zJztcclxuXHJcbi8qKlxyXG4gKiBDbGFzcyB3cmFwcGVyIGZvciByZWNlaXZpbmcgbWVzc2FnZXMgYXMgdHlwZWQgZXZlbnRzXHJcbiAqXHJcbiAqIEBpbnRlcm5hbFxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFdvcmtlckV2ZW50UmVjZWl2ZXI8VFR5cGUgZXh0ZW5kcyBXb3JrZXJEYXRhVHlwZSwgVFdvcmtlck1lc3NhZ2UgZXh0ZW5kcyBJV29ya2VyTWVzc2FnZTxUVHlwZT4+IHtcclxuICAgIHB1YmxpYyByZWFkb25seSBldmVudDogRXZlbnRFbWl0dGVyPFRXb3JrZXJNZXNzYWdlPiA9IG5ldyBFdmVudEVtaXR0ZXI8VFdvcmtlck1lc3NhZ2U+KCk7XHJcblxyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IHR5cGU6IFRUeXBlLFxyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgX3JlY2VpdmVyOiBJV29ya2VyTWVzc2FnZVJlY2VpdmVyXHJcbiAgICApIHtcclxuICAgICAgICBfcmVjZWl2ZXIuYWRkRXZlbnRMaXN0ZW5lcih0eXBlLCB0aGlzLl9oYW5kbGVyKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZGlzcG9zZSgpIHtcclxuICAgICAgICB0aGlzLl9yZWNlaXZlci5yZW1vdmVFdmVudExpc3RlbmVyKHRoaXMudHlwZSwgdGhpcy5faGFuZGxlcik7XHJcbiAgICAgICAgdGhpcy5ldmVudC5jbGVhcigpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX2hhbmRsZXIgPSAoZGF0YTogVFdvcmtlck1lc3NhZ2UpID0+IHtcclxuICAgICAgICBpZiAoZGF0YS50eXBlID09PSB0aGlzLnR5cGUpIHtcclxuICAgICAgICAgICAgdGhpcy5ldmVudC5lbWl0KGRhdGEpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvaWZkZWYtbG9hZGVyL2lmZGVmLWxvYWRlci5qcz9ERUJVRz10cnVlJlBFUkZPUk1BTkNFX0FVRElUPXRydWUhLi9zcmMvd29ya2Vycy9zZW5kZXJzL3dvcmtlci1ldmVudC1yZWNlaXZlci50cyIsImltcG9ydCB7IElXb3JrZXJNZXNzYWdlLCBJV29ya2VyTWVzc2FnZVJlY2VpdmVyLCBJV29ya2VyTWVzc2FnZVNlbmRlciwgV29ya2VyRGF0YVR5cGUgfSBmcm9tICcuLi93b3JrZXItZGVmaW5pdGlvbnMnO1xyXG5pbXBvcnQgeyBJUmVzcG9uc2VFbWl0dGVyIH0gZnJvbSAnLi9yZXNwb25zZS1lbWl0dGVyJztcclxuaW1wb3J0IHsgSVJlc3BvbnNlRW52ZWxvcCB9IGZyb20gJy4vd29ya2VyLXJlcXVlc3Qtc2VuZGVyJztcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSVJlcXVlc3RFbnZlbG9wPFRUeXBlIGV4dGVuZHMgV29ya2VyRGF0YVR5cGUsIFRSZXF1ZXN0PiBleHRlbmRzIElXb3JrZXJNZXNzYWdlPFRUeXBlPiB7XHJcbiAgICByZXF1ZXN0OiBUUmVxdWVzdDtcclxuXHJcbiAgICBtZXNzYWdlSWQ6IHN0cmluZztcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFdvcmtlclJlcXVlc3RSZWNlaXZlcjxUVHlwZSBleHRlbmRzIFdvcmtlckRhdGFUeXBlLCBUUmVxdWVzdCwgVFJlc3BvbnNlPiB7XHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgdHlwZTogVFR5cGUsXHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBfc2VuZGVyOiBJV29ya2VyTWVzc2FnZVNlbmRlcixcclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IF9yZWNlaXZlcjogSVdvcmtlck1lc3NhZ2VSZWNlaXZlcixcclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IF9oYW5kbGVyOiBJUmVzcG9uc2VFbWl0dGVyPFRSZXF1ZXN0LCBUUmVzcG9uc2U+XHJcbiAgICApIHtcclxuICAgICAgICBfcmVjZWl2ZXIuYWRkRXZlbnRMaXN0ZW5lcih0eXBlLCB0aGlzLl9yZXNwb25zZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGRpc3Bvc2UoKSB7XHJcbiAgICAgICAgdGhpcy5fcmVjZWl2ZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcih0aGlzLnR5cGUsIHRoaXMuX3Jlc3BvbnNlKTtcclxuICAgICAgICB0aGlzLl9oYW5kbGVyLnN0b3AoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9yZXNwb25zZSA9IChkYXRhOiBJUmVxdWVzdEVudmVsb3A8VFR5cGUsIFRSZXF1ZXN0PikgPT4ge1xyXG4gICAgICAgIGNvbnN0IG1lc3NhZ2VJZCA9IGRhdGEubWVzc2FnZUlkO1xyXG4gICAgICAgIGNvbnN0IHR5cGUgPSBkYXRhLnR5cGU7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnR5cGUgPT09IHR5cGUpIHtcclxuICAgICAgICAgICAgaWYgKG1lc3NhZ2VJZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hd2FpdFJlc3BvbnNlKHR5cGUsIGRhdGEucmVxdWVzdCwgbWVzc2FnZUlkKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucmlzZUV2ZW50KHR5cGUsIGRhdGEucmVxdWVzdCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBhd2FpdFJlc3BvbnNlKHR5cGU6IFRUeXBlLCByZXF1ZXN0OiBUUmVxdWVzdCwgbWVzc2FnZUlkOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBzZW5kZXIgPSB0aGlzLl9zZW5kZXI7XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdChlcnJvcjogYW55KSB7XHJcbiAgICAgICAgICAgIGxldCBtZXNzYWdlID0gJyc7XHJcbiAgICAgICAgICAgIGlmIChlcnJvciAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBFcnJvcikge1xyXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2UgPSBlcnJvci5tZXNzYWdlO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlID0gZXJyb3IudG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzZW5kZXIucG9zdE1lc3NhZ2UoeyB0eXBlLCBtZXNzYWdlSWQsIGVycm9yOiB7IG1lc3NhZ2UgfSB9IGFzIElSZXNwb25zZUVudmVsb3A8VFR5cGUsIFRSZXNwb25zZT4pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmdW5jdGlvbiByZXNvbHZlKHJlc3BvbnNlOiBUUmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgc2VuZGVyLnBvc3RNZXNzYWdlKHsgdHlwZSwgbWVzc2FnZUlkLCByZXNwb25zZSB9IGFzIElSZXNwb25zZUVudmVsb3A8VFR5cGUsIFRSZXNwb25zZT4pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gdGhpcy5faGFuZGxlci5pbnZva2UocmVxdWVzdCk7XHJcblxyXG4gICAgICAgICAgICBpZiAodHlwZW9mIFByb21pc2UgIT09ICd1bmRlZmluZWQnICYmIHJlc3VsdCBpbnN0YW5jZW9mIFByb21pc2UpIHtcclxuICAgICAgICAgICAgICAgIHJlc3VsdC50aGVuKHJlc29sdmUsIHJlamVjdCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3VsdCBhcyBUUmVzcG9uc2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSByaXNlRXZlbnQodHlwZTogc3RyaW5nLCByZXF1ZXN0OiBUUmVxdWVzdCk6IHZvaWQge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2hhbmRsZXIuaW52b2tlKHJlcXVlc3QpO1xyXG4gICAgICAgIH0gY2F0Y2ggeyAvKiovIH1cclxuICAgIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvaWZkZWYtbG9hZGVyL2lmZGVmLWxvYWRlci5qcz9ERUJVRz10cnVlJlBFUkZPUk1BTkNFX0FVRElUPXRydWUhLi9zcmMvd29ya2Vycy9zZW5kZXJzL3dvcmtlci1yZXF1ZXN0LXJlY2VpdmVyLnRzIiwiaW1wb3J0IHsgSVNjcmlwdExvYWRlciwgU2NyaXB0TG9hZGVyIH0gZnJvbSAnLi4vZnJhbWV3b3JrL3NjcmlwdC1sb2FkZXInO1xyXG5pbXBvcnQgeyBJTWVzc2FnZUV2ZW50LCBJV29ya2VyR2xvYmFsU2NvcGUsIElXb3JrZXJMb2NhdGlvbiwgTWVzc2FnZUV2ZW50TGlzdGVuZXIgfSBmcm9tICcuL3dvcmtlci1kZWZpbml0aW9ucyc7XHJcblxyXG4vKipcclxuICogVmFyaWFibGUgbmFtZSB0byBwYXNzIFBzZXVkb1dvcmtlciBiZXR3ZWVuIG1haW4gY29kZSBhbmQgbG9hZGVkIGluIGEgV2ViV29ya2VyXHJcbiAqIEBpbnRlcm5hbFxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IFBzZXVkb1dvcmtlclNjb3BlTmFtZSA9ICdNZXNzYWdpbmdDbGllbnQtUHNldWRvV29ya2VyJztcclxuXHJcbi8qKlxyXG4gKiBFbXVsYXRvciBvZiBXZWIgV29ya2VyIGJlaGF2aW9yLiBSdW4gYWxsIHByb2NjZXNzIGluIHRoZSBtYWluIHdpbmRvdyBwcm9jZXNzLlxyXG4gKlxyXG4gKiBSZXF1aXJlZCBjb21wYXRpYmlsaXR5IHdpdGggSUU5IHdpdGhvdXQgcG9seWZpbGxzXHJcbiAqXHJcbiAqIEBpbnRlcm5hbFxyXG4gKiBAY2xhc3MgUHNldWRvV29ya2VyXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgUHNldWRvV29ya2VyIHtcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgX3BzZXVkb1dvcmtlcjogSW50ZXJuYWxQc2V1ZG9Xb3JrZXI7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9saXN0ZW5lcnM6IEFycmF5PE1lc3NhZ2VFdmVudExpc3RlbmVyPiA9IFtdO1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfYnVmZmVyOiBBcnJheTxJTWVzc2FnZUV2ZW50PiA9IFtdO1xyXG4gICAgcHJpdmF0ZSBfZ2xvYmFsOiBhbnkgPSB3aW5kb3c7XHJcblxyXG4gICAgcHVibGljIGdldCBwc2V1ZG9Xb3JrZXIoKSB7IHJldHVybiB0aGlzLl9wc2V1ZG9Xb3JrZXI7IH1cclxuXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwYXRoOiBzdHJpbmcsXHJcbiAgICAgICAgc2NyaXB0TG9hZGVyOiBJU2NyaXB0TG9hZGVyID0gbmV3IFNjcmlwdExvYWRlcigpXHJcbiAgICApIHtcclxuICAgICAgICB0aGlzLl9wc2V1ZG9Xb3JrZXIgPSB0aGlzLl9nbG9iYWxbUHNldWRvV29ya2VyU2NvcGVOYW1lXSA9XHJcbiAgICAgICAgICAgIG5ldyBJbnRlcm5hbFBzZXVkb1dvcmtlcihcclxuICAgICAgICAgICAgICAgIHBhdGgsXHJcbiAgICAgICAgICAgICAgICBzY3JpcHRMb2FkZXIsXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmFpc2VFdmVudDogKG1lc3NhZ2UpID0+IHRoaXMucmFpc2VFdmVudChtZXNzYWdlKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIHNjcmlwdExvYWRlci5sb2FkU2NyaXB0KHBhdGgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBwb3N0TWVzc2FnZShtZXNzYWdlOiBvYmplY3QpIHtcclxuICAgICAgICB0aGlzLl9wc2V1ZG9Xb3JrZXIucmFpc2VFdmVudCh7IGRhdGE6IG1lc3NhZ2UgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFkZEV2ZW50TGlzdGVuZXIoZXZlbnQ6ICdtZXNzYWdlJywgbGlzdGVuZXI6IE1lc3NhZ2VFdmVudExpc3RlbmVyKSB7XHJcbiAgICAgICAgaWYgKGV2ZW50ID09PSAnbWVzc2FnZScpIHtcclxuICAgICAgICAgICAgdGhpcy5fbGlzdGVuZXJzLnB1c2gobGlzdGVuZXIpO1xyXG5cclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fYnVmZmVyLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBidWZmZXIgPSB0aGlzLl9idWZmZXIuc2xpY2UoKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBsZW5ndGggPSBidWZmZXIubGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yYWlzZUV2ZW50KGJ1ZmZlcltpXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2J1ZmZlci5sZW5ndGggPSAwO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnQ6ICdtZXNzYWdlJywgbGlzdGVuZXI6IE1lc3NhZ2VFdmVudExpc3RlbmVyKSB7XHJcbiAgICAgICAgY29uc3QgaW5kZXggPSB0aGlzLl9saXN0ZW5lcnMuaW5kZXhPZihsaXN0ZW5lcik7XHJcbiAgICAgICAgaWYgKGluZGV4ID4gLTEpIHtcclxuICAgICAgICAgICAgdGhpcy5fbGlzdGVuZXJzLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB0ZXJtaW5hdGUoKSB7XHJcbiAgICAgICAgdGhpcy5fYnVmZmVyLmxlbmd0aCA9IDA7XHJcbiAgICAgICAgdGhpcy5fbGlzdGVuZXJzLmxlbmd0aCA9IDA7XHJcbiAgICAgICAgdGhpcy5fcHNldWRvV29ya2VyLmNsb3NlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSByYWlzZUV2ZW50KG1lc3NhZ2U6IElNZXNzYWdlRXZlbnQpIHtcclxuICAgICAgICBjb25zdCBsaXN0ZW5lcnMgPSB0aGlzLl9saXN0ZW5lcnM7XHJcbiAgICAgICAgY29uc3QgbGVuZ3RoID0gbGlzdGVuZXJzLmxlbmd0aDtcclxuICAgICAgICBpZiAobGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBsaXN0ZW5lciA9IGxpc3RlbmVyc1tpXTtcclxuICAgICAgICAgICAgICAgIGxpc3RlbmVyKG1lc3NhZ2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5fYnVmZmVyLnB1c2gobWVzc2FnZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG4vKipcclxuICogSW5zdGFuY2UgZm9yIGVtdWxhdGlvbmcgV29ya2VyIEVudmlyb25tZW50IGluc2lkZSBXZWJXb3JrZXIgY29kZVxyXG4gKlxyXG4gKiBAY2xhc3MgSW50ZXJuYWxQc2V1ZG9Xb3JrZXJcclxuICogQGltcGxlbWVudHMge0lXb3JrZXJHbG9iYWxTY29wZX1cclxuICovXHJcbmNsYXNzIEludGVybmFsUHNldWRvV29ya2VyIGltcGxlbWVudHMgSVdvcmtlckdsb2JhbFNjb3BlIHtcclxuICAgIHB1YmxpYyByZWFkb25seSBsb2NhdGlvbjogSVdvcmtlckxvY2F0aW9uO1xyXG5cclxuICAgIHByaXZhdGUgcmVhZG9ubHkgX2xpc3RlbmVyczogQXJyYXk8TWVzc2FnZUV2ZW50TGlzdGVuZXI+ID0gW107XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9idWZmZXI6IEFycmF5PElNZXNzYWdlRXZlbnQ+ID0gW107XHJcblxyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgbG9jYXRpb246IHN0cmluZyxcclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IF9zY3JpcHRMb2FkZXI6IElTY3JpcHRMb2FkZXIsXHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBfaW50ZXJuYWw6IElJbnRlcm5hbFdvcmtlckZ1bmN0aW9ucyxcclxuICAgICkge1xyXG4gICAgICAgIHRoaXMubG9jYXRpb24gPSBsb2NhdGlvbjtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcG9zdE1lc3NhZ2UobWVzc2FnZTogb2JqZWN0KTogdm9pZCB7XHJcbiAgICAgICAgbWVzc2FnZSA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkobWVzc2FnZSkpO1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLl9pbnRlcm5hbC5yYWlzZUV2ZW50KHsgZGF0YTogbWVzc2FnZSB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaW1wb3J0U2NyaXB0cyguLi5wYXRoczogQXJyYXk8c3RyaW5nPik6IGFueSB7XHJcbiAgICAgICAgbGV0IHJlc29sdmU6ICgpID0+IHZvaWQ7XHJcbiAgICAgICAgbGV0IHJlc29sdmVkOiBib29sZWFuO1xyXG5cclxuICAgICAgICBjb25zdCBsZW5ndGggPSBwYXRocy5sZW5ndGg7XHJcbiAgICAgICAgbGV0IHRvbG9hZCA9IHBhdGhzLmxlbmd0aDtcclxuICAgICAgICBjb25zdCBvbmxvYWQgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRvbG9hZC0tO1xyXG4gICAgICAgICAgICBpZiAodG9sb2FkIDw9IDApIHtcclxuICAgICAgICAgICAgICAgIHJlc29sdmVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGlmIChyZXNvbHZlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3NjcmlwdExvYWRlci5sb2FkU2NyaXB0KHBhdGhzW2ldLCBvbmxvYWQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgdGhlbjogKGNhbGxiYWNrOiAoKSA9PiB2b2lkKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAocmVzb2x2ZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjaygpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJlc29sdmUgPSBjYWxsYmFjaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFkZEV2ZW50TGlzdGVuZXIoZXZlbnQ6ICdtZXNzYWdlJyB8ICdjb25uZWN0JywgbGlzdGVuZXI6IE1lc3NhZ2VFdmVudExpc3RlbmVyKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKGV2ZW50ID09PSAnbWVzc2FnZScpIHtcclxuICAgICAgICAgICAgdGhpcy5fbGlzdGVuZXJzLnB1c2gobGlzdGVuZXIpO1xyXG5cclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fYnVmZmVyLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGJ1ZmZlciA9IHRoaXMuX2J1ZmZlci5zbGljZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGxlbmd0aCA9IGJ1ZmZlci5sZW5ndGg7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJhaXNlRXZlbnQoYnVmZmVyW2ldKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fYnVmZmVyLmxlbmd0aCA9IDA7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudDogJ21lc3NhZ2UnLCBsaXN0ZW5lcjogTWVzc2FnZUV2ZW50TGlzdGVuZXIpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBpbmRleCA9IHRoaXMuX2xpc3RlbmVycy5pbmRleE9mKGxpc3RlbmVyKTtcclxuICAgICAgICBpZiAoaW5kZXggPiAtMSkge1xyXG4gICAgICAgICAgICB0aGlzLl9saXN0ZW5lcnMuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJhaXNlRXZlbnQobWVzc2FnZTogSU1lc3NhZ2VFdmVudCkge1xyXG4gICAgICAgIGlmICghdGhpcy5fbGlzdGVuZXJzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICB0aGlzLl9idWZmZXIucHVzaChtZXNzYWdlKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjb25zdCBsZW5ndGggPSB0aGlzLl9saXN0ZW5lcnMubGVuZ3RoO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgbGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9saXN0ZW5lcnNbaW5kZXhdKG1lc3NhZ2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbG9zZSgpIHtcclxuICAgICAgICB0aGlzLl9idWZmZXIubGVuZ3RoID0gMDtcclxuICAgICAgICB0aGlzLl9saXN0ZW5lcnMubGVuZ3RoID0gMDtcclxuICAgIH1cclxufVxyXG5cclxuaW50ZXJmYWNlIElJbnRlcm5hbFdvcmtlckZ1bmN0aW9ucyB7XHJcbiAgICByYWlzZUV2ZW50KG1lc3NhZ2U6IElNZXNzYWdlRXZlbnQpOiB2b2lkO1xyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy9pZmRlZi1sb2FkZXIvaWZkZWYtbG9hZGVyLmpzP0RFQlVHPXRydWUmUEVSRk9STUFOQ0VfQVVESVQ9dHJ1ZSEuL3NyYy93b3JrZXJzL3BzZXVkby13b3JrZXIudHMiLCJpbXBvcnQgeyBHbG9iYWxQcm92aWRlciB9IGZyb20gJy4vZ2xvYmFsJztcclxuXHJcbi8qKlxyXG4gKiBMb2FkIHNjcmlwdCBmcm9tIGEgcGF0aFxyXG4gKlxyXG4gKiBAaW50ZXJuYWxcclxuICogQGludGVyZmFjZSBJU2NyaXB0TG9hZGVyXHJcbiAqL1xyXG5leHBvcnQgaW50ZXJmYWNlIElTY3JpcHRMb2FkZXIge1xyXG4gICAgbG9hZFNjcmlwdChwYXRoOiBzdHJpbmcsIG9ubG9hZD86ICgpID0+IHZvaWQpOiB2b2lkO1xyXG59XHJcblxyXG4vKipcclxuICogUG9seWZpbGwgZm9yIGxvYWRpbmcgc2NyaXB0IGluIERPTSBjb250ZXh0XHJcbiAqXHJcbiAqIEBpbnRlcm5hbFxyXG4gKiBAY2xhc3MgU2NyaXB0TG9hZGVyXHJcbiAqIEBpbXBsZW1lbnRzIHtJU2NyaXB0TG9hZGVyfVxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFNjcmlwdExvYWRlciBpbXBsZW1lbnRzIElTY3JpcHRMb2FkZXIge1xyXG4gICAgLyoqXHJcbiAgICAgKiBMb2FkIHNjcmlwdCBmcm9tIHBhdGggZW5kIGV4ZWN1dGUgaXRcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gcGF0aCB7c3RyaW5nfSAtIFBhdGggdG8gdGhlIHNjcmlwdFxyXG4gICAgICogQHBhcmFtIG9ubG9hZCB7KCkgPT4gdm9pZH0gLSBDYWxsYmFjayBleGVjdXRlZCBhZnRlciB0aGUgc2NyaXB0IGxvYWRzXHJcbiAgICAgKiBAbWVtYmVyb2YgU2NyaXB0TG9hZGVyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyByZWFkb25seSBsb2FkU2NyaXB0OiAocGF0aDogc3RyaW5nLCBvbmxvYWQ/OiAoKSA9PiB2b2lkKSA9PiB2b2lkO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIF9nbG9iYWwgPSBHbG9iYWxQcm92aWRlci5jdXJyZW50KClcclxuICAgICkge1xyXG4gICAgICAgIGlmICh0eXBlb2YgKF9nbG9iYWwgYXMgV2luZG93KS5kb2N1bWVudCAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAgICAgdGhpcy5sb2FkU2NyaXB0ID0gKHBhdGgsIG9ubG9hZCkgPT4gU2NyaXB0TG9hZGVyLmxvYWRWaWFEb20oKF9nbG9iYWwgYXMgV2luZG93KS5kb2N1bWVudCwgcGF0aCwgb25sb2FkKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vIERPTSBlbnZpcm9ubWVudCBpcyBub3Qgc3VwcG9ydGVkLicpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTptZW1iZXItb3JkZXJpbmdcclxuICAgIHByaXZhdGUgc3RhdGljIGxvYWRWaWFEb20oZG9jdW1lbnQ6IERvY3VtZW50LCBwYXRoOiBzdHJpbmcsIG9ubG9hZD86ICgpID0+IHZvaWQpIHtcclxuICAgICAgICBjb25zdCBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcclxuICAgICAgICBzY3JpcHQudHlwZSA9ICd0ZXh0L2phdmFzY3JpcHQnO1xyXG4gICAgICAgIHNjcmlwdC5zcmMgPSBwYXRoO1xyXG4gICAgICAgIGlmIChvbmxvYWQpIHtcclxuICAgICAgICAgICAgc2NyaXB0Lm9ubG9hZCA9IG9ubG9hZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgKGRvY3VtZW50LmJvZHkgfHwgZG9jdW1lbnQuaGVhZCkuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcclxuICAgIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvaWZkZWYtbG9hZGVyL2lmZGVmLWxvYWRlci5qcz9ERUJVRz10cnVlJlBFUkZPUk1BTkNFX0FVRElUPXRydWUhLi9zcmMvZnJhbWV3b3JrL3NjcmlwdC1sb2FkZXIudHMiLCJleHBvcnQgKiBmcm9tICcuL2JhdGNoJztcclxuZXhwb3J0ICogZnJvbSAnLi9idWlsZGVycyc7XHJcbmV4cG9ydCAqIGZyb20gJy4vY29udGV4dCc7XHJcbmV4cG9ydCAqIGZyb20gJy4vZW5kcG9pbnRzJztcclxuZXhwb3J0ICogZnJvbSAnLi9lbnZlbG9wJztcclxuZXhwb3J0ICogZnJvbSAnLi9tZXNzZW5nZXInO1xyXG5leHBvcnQgKiBmcm9tICcuL3BpcGUnO1xyXG5leHBvcnQgKiBmcm9tICcuL2J1cyc7XHJcbmV4cG9ydCAqIGZyb20gJy4vcm91dGVyJztcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL2lmZGVmLWxvYWRlci9pZmRlZi1sb2FkZXIuanM/REVCVUc9dHJ1ZSZQRVJGT1JNQU5DRV9BVURJVD10cnVlIS4vc3JjL3Byb2Nlc3NpbmcvaW5kZXgudHMiLCJpbXBvcnQgeyBJQmF0Y2hBdWRpdERhdGEgfSBmcm9tICcuL2F1ZGl0L2F1ZGl0LWRhdGEnO1xyXG5pbXBvcnQgeyBJRW52ZWxvcCB9IGZyb20gJy4vZW52ZWxvcCc7XHJcblxyXG4vKipcclxuICogQmF0Y2ggb2YgZmV3IGVudmVsb3BzXHJcbiAqXHJcbiAqIEBpbnRlcm5hbFxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIEJhdGNoIHtcclxuICAgIC8qKlxyXG4gICAgICogQ29udGFpbnMgZW52ZWxvcCB3aXRoIGFvdWRpdCBkYXRhXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhdWRpdHM/OiBJQmF0Y2hBdWRpdERhdGE7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBFcnJvciBjb3VudCBmb3IgdGhlIGN1cnJlbnQgYmF0Y2hcclxuICAgICAqL1xyXG4gICAgcHVibGljIGVycm9yQ291bnQ6IG51bWJlciA9IDA7XHJcblxyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IGVudmVsb3BzOiBBcnJheTxJRW52ZWxvcD4sXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEluZGV4IG9mIHRoZSBiYXRjaFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBpbmRleDogbnVtYmVyID0gMFxyXG4gICAgKSB7IH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvaWZkZWYtbG9hZGVyL2lmZGVmLWxvYWRlci5qcz9ERUJVRz10cnVlJlBFUkZPUk1BTkNFX0FVRElUPXRydWUhLi9zcmMvcHJvY2Vzc2luZy9iYXRjaC50cyIsImltcG9ydCB7IElEaXN0b3JidGlvbiwgSUR1cmF0aW9uLCBJUGVyZnN0YW1wIH0gZnJvbSAnLi4vZGVmaW5pdGlvbnMnO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGR1cmF0aW9uKHRpbWUxOiBJUGVyZnN0YW1wLCB0aW1lMjogSVBlcmZzdGFtcCk6IElEdXJhdGlvbjxudW1iZXI+IHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgY2xvY2t0aW1lOiB0aW1lMi5jbG9ja3RpbWUgLSB0aW1lMS5jbG9ja3RpbWUsXHJcbiAgICAgICAgY3B1OiAodGltZTIuY3B1ICYmIHRpbWUxLmNwdSkgPyAodGltZTIuY3B1IC0gdGltZTEuY3B1KSA6IHVuZGVmaW5lZFxyXG4gICAgfTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGRpc3RvcmJ0aW9uPFRJdGVtPihpdGVtczogQXJyYXk8VEl0ZW0+LCB2YWw6IChpdGVtOiBUSXRlbSkgPT4gbnVtYmVyIHwgdW5kZWZpbmVkKTogSURpc3RvcmJ0aW9uIHtcclxuICAgIGNvbnN0IHZhbHVlcyA9IG5ldyBBcnJheTxudW1iZXI+KCk7XHJcbiAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgaXRlbXMpIHtcclxuICAgICAgICBjb25zdCBjdXJyZW50ID0gdmFsKGl0ZW0pO1xyXG4gICAgICAgIGlmIChjdXJyZW50ICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgdmFsdWVzLnB1c2goY3VycmVudCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgdmFsdWVzLnNvcnQoKGEsIGIpID0+IGEgLSBiKTtcclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGF2ZXJhZ2U6IGF2ZXJhZ2UodmFsdWVzKSxcclxuICAgICAgICBtZWRpYW46IG1lZGlhbih2YWx1ZXMpLFxyXG4gICAgICAgIG1heDogdmFsdWVzW3ZhbHVlcy5sZW5ndGggLSAxXSxcclxuICAgICAgICBtaW46IHZhbHVlc1swXSxcclxuICAgICAgICB0b3RhbDogdmFsdWVzLmxlbmd0aFxyXG4gICAgfTtcclxufVxyXG5cclxuZnVuY3Rpb24gYXZlcmFnZSh2YWx1ZXM6IEFycmF5PG51bWJlcj4pOiBudW1iZXIge1xyXG4gICAgbGV0IGF2ZyA9IDA7XHJcbiAgICBmb3IgKGNvbnN0IHZhbCBvZiB2YWx1ZXMpIHtcclxuICAgICAgICBhdmcgKz0gdmFsO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGF2ZyAvIHZhbHVlcy5sZW5ndGg7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIG1lZGlhbih2YWx1ZXM6IEFycmF5PG51bWJlcj4pOiBudW1iZXIge1xyXG4gICAgY29uc3QgaGFsZiA9IE1hdGguZmxvb3IodmFsdWVzLmxlbmd0aCAvIDIpO1xyXG5cclxuICAgIGlmICh2YWx1ZXMubGVuZ3RoICUgMikge1xyXG4gICAgICAgIHJldHVybiB2YWx1ZXNbaGFsZl07XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJldHVybiAodmFsdWVzW2hhbGYgLSAxXSArIHZhbHVlc1toYWxmXSkgLyAyLjA7XHJcbiAgICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL2lmZGVmLWxvYWRlci9pZmRlZi1sb2FkZXIuanM/REVCVUc9dHJ1ZSZQRVJGT1JNQU5DRV9BVURJVD10cnVlIS4vc3JjL3Byb2Nlc3NpbmcvYXVkaXQvcmVwb3J0ZXJzL2NhbGMtbWV0aG9kcy50cyIsImltcG9ydCB7IElQZXJmc3RhbXAgfSBmcm9tICcuLi9kZWZpbml0aW9ucyc7XHJcblxyXG5leHBvcnQgY2xhc3MgUGVyZnN0YW1wIGltcGxlbWVudHMgSVBlcmZzdGFtcCB7XHJcbiAgICBwdWJsaWMgc3RhdGljIG5vdzogKCkgPT4gbnVtYmVyIHwgdW5kZWZpbmVkO1xyXG5cclxuICAgIHB1YmxpYyByZWFkb25seSBjbG9ja3RpbWU6IG51bWJlciA9ICtuZXcgRGF0ZSgpO1xyXG5cclxuICAgIHB1YmxpYyByZWFkb25seSBjcHU/OiBudW1iZXIgPSBQZXJmc3RhbXAubm93KCk7XHJcbn1cclxuXHJcbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXHJcbmlmICh0eXBlb2YgcGVyZm9ybWFuY2UgIT09ICd1bmRlZmluZWQnXHJcbiAgICAmJiB0eXBlb2YgcGVyZm9ybWFuY2Uubm93ICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgUGVyZnN0YW1wLm5vdyA9ICgpID0+IHBlcmZvcm1hbmNlLm5vdygpO1xyXG59IGVsc2Uge1xyXG4gICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cclxuICAgIFBlcmZzdGFtcC5ub3cgPSAoKSA9PiB1bmRlZmluZWQ7XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL2lmZGVmLWxvYWRlci9pZmRlZi1sb2FkZXIuanM/REVCVUc9dHJ1ZSZQRVJGT1JNQU5DRV9BVURJVD10cnVlIS4vc3JjL3Byb2Nlc3NpbmcvYXVkaXQvYXVkaXRvcnMvcGVyZnN0YW1wLnRzIiwiaW1wb3J0IHsgSUVudmVsb3BRdWV1ZSB9IGZyb20gJy4vZW52ZWxvcC1xdWV1ZSc7XHJcbmltcG9ydCB7IFBpcGUgfSBmcm9tICcuL3BpcGUnO1xyXG5cclxuLyoqXHJcbiAqIEJ1cyBmb3IgYWxsIHBpcGVzIGluIHRoZSBzeXN0ZW1cclxuICpcclxuICogQGludGVybmFsXHJcbiAqIEBjbGFzcyBCdXNcclxuICovXHJcbmV4cG9ydCBjbGFzcyBCdXMge1xyXG4gICAgcHVibGljIHJlYWRvbmx5IHF1ZXVlczogTWFwPHN0cmluZywgSUVudmVsb3BRdWV1ZT4gPSBuZXcgTWFwKCk7XHJcblxyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IHBpcGVzOiBNYXA8c3RyaW5nLCBQaXBlPlxyXG4gICAgKSB7XHJcbiAgICAgICAgcGlwZXMuZm9yRWFjaCgocGlwZSwgaWQpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5xdWV1ZXMuc2V0KGlkLCBwaXBlLmJhdGNoQnVpbGRlci5xdWV1ZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFzeW5jIHN0YXJ0KCkge1xyXG4gICAgICAgIGZvciAoY29uc3QgcGlwZSBvZiB0aGlzLnBpcGVzLnZhbHVlcygpKSB7XHJcbiAgICAgICAgICAgIGF3YWl0IHBpcGUuc3RhcnQoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFzeW5jIHRlcm1pbmF0ZSgpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICBmb3IgKGNvbnN0IHBpcGUgb2YgdGhpcy5waXBlcy52YWx1ZXMoKSkge1xyXG4gICAgICAgICAgICBhd2FpdCBwaXBlLnRlcm1pbmF0ZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvaWZkZWYtbG9hZGVyL2lmZGVmLWxvYWRlci5qcz9ERUJVRz10cnVlJlBFUkZPUk1BTkNFX0FVRElUPXRydWUhLi9zcmMvcHJvY2Vzc2luZy9idXMudHMiLCJleHBvcnQgKiBmcm9tICcuL2VuZHBvaW50JztcclxuZXhwb3J0ICogZnJvbSAnLi9mZS1hbmFseXRpY3MtY29sbGVjdG9yJztcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL2lmZGVmLWxvYWRlci9pZmRlZi1sb2FkZXIuanM/REVCVUc9dHJ1ZSZQRVJGT1JNQU5DRV9BVURJVD10cnVlIS4vc3JjL3Byb2Nlc3NpbmcvZW5kcG9pbnRzL2luZGV4LnRzIiwiaW1wb3J0IHsgSVN5bmNQb2ludCwgTG9jYWxTdG9yYWdlVGFiU3luY1BvaW50IH0gZnJvbSAnLi4vZnJhbWV3b3JrL3RhYi1zeW5jLXBvaW50JztcclxuaW1wb3J0IHsgVW5sb2FkRXZlbnQgfSBmcm9tICcuLi9mcmFtZXdvcmsvdW5sb2FkLWV2ZW50JztcclxuaW1wb3J0IHsgSUxvZ2dlciB9IGZyb20gJy4uL2xvZ3MnO1xyXG5pbXBvcnQgeyBJUGlwZVBlcmZvcm1hbmNlQXVkaXRvciB9IGZyb20gJy4vYXVkaXQvYXVkaXRvcnMvcGlwZSc7XHJcbmltcG9ydCB7IEFqYXhSZXF1ZXN0U3RhdHVzUmVzdWx0IH0gZnJvbSAnLi9hdWRpdC9zdGF0cy9waXBlLXN0YXRzJztcclxuaW1wb3J0IHsgSUJhdGNoQnVpbGRlciB9IGZyb20gJy4vYmF0Y2gtYnVpbGRlcic7XHJcbmltcG9ydCB7IElFbmRwb2ludCB9IGZyb20gJy4vZW5kcG9pbnRzJztcclxuaW1wb3J0IHsgSUZsdXNoVGltZVN0cmF0ZWd5IH0gZnJvbSAnLi9mbHVzaC10aW1lLXN0cmF0ZWd5JztcclxuXHJcbi8qKlxyXG4gKiBQaXBlIGNvbnN1bWVzIG1lc3NhZ2VzIGZyb20gYSBxdWV1ZSBhbmQgc2VuZCBpdCB0byBhbiBlbmRwb2ludFxyXG4gKlxyXG4gKiBAaW50ZXJuYWxcclxuICovXHJcbmV4cG9ydCBjbGFzcyBQaXBlIHtcclxuICAgIHByaXZhdGUgX2ludGVydmFsSWQ6IGFueSB8IHVuZGVmaW5lZDtcclxuICAgIHByaXZhdGUgX2FjdGl2ZSA9IHRydWU7XHJcblxyXG4gICAgcHVibGljIGdldCBxdWV1ZUlkKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuYmF0Y2hCdWlsZGVyLnF1ZXVlLmlkO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBiYXRjaEJ1aWxkZXI6IElCYXRjaEJ1aWxkZXIsXHJcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IGVuZHBvaW50OiBJRW5kcG9pbnQsXHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBfZmx1c2hUaW1lU3RyYXRlZ3k6IElGbHVzaFRpbWVTdHJhdGVneSxcclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IF9sb2dnZXI6IElMb2dnZXIsXHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBfYXVkaXRvcjogSVBpcGVQZXJmb3JtYW5jZUF1ZGl0b3IsXHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBfc3luY1BvaW50OiBJU3luY1BvaW50ID0gbmV3IExvY2FsU3RvcmFnZVRhYlN5bmNQb2ludChiYXRjaEJ1aWxkZXIucXVldWUuaWQgKyAnLXBpcGUnKVxyXG4gICAgKSB7IH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFN0YXJ0IHF1ZXVlIGhhbmRsaW5nXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGFydCgpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICBpZiAodGhpcy5faW50ZXJ2YWxJZCkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1BpcGUgYWxyZWFkeSB3YXMgc3RhcnRlZC4nKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5faW50ZXJ2YWxJZCA9IHt9O1xyXG5cclxuICAgICAgICB0aGlzLnN1YnNjcmliZSgpO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5zY2hlZHVsZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhc3luYyB0ZXJtaW5hdGUoKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2FjdGl2ZSkge1xyXG4gICAgICAgICAgICB0aGlzLmRpc3Bvc2UoKTtcclxuICAgICAgICAgICAgYXdhaXQgdGhpcy5iYXRjaEJ1aWxkZXIuZGVzdHJveSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZGlzcG9zZSgpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5fYWN0aXZlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2FjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5faW50ZXJ2YWxJZCkge1xyXG4gICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuX2ludGVydmFsSWQpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5faW50ZXJ2YWxJZCA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLl9zeW5jUG9pbnQuZGlzcG9zZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGFzeW5jIHNjaGVkdWxlKCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9hY3RpdmUpIHtcclxuICAgICAgICAgICAgY29uc3QgZHVyYXRpb24gPSBhd2FpdCB0aGlzLl9mbHVzaFRpbWVTdHJhdGVneS5kdXJhdGlvbigpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5faW50ZXJ2YWxJZCA9IHNldFRpbWVvdXQoYXN5bmMgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLmZsdXNoKCk7XHJcbiAgICAgICAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2xvZ2dlci5lcnJvcihgW1FJRDoke3RoaXMucXVldWVJZH1dOiBFcnJvciBvbiBmbHVzaGluZyBtZXNzYWdlcyBpbnRvIHRoZSBlbmRwb2ludC5gLCBlcnJvcik7XHJcbiAgICAgICAgICAgICAgICB9IGZpbmFsbHkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2NoZWR1bGUoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSwgZHVyYXRpb24pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHN1YnNjcmliZSgpOiB2b2lkIHtcclxuICAgICAgICBVbmxvYWRFdmVudC5hZGRMaXN0ZW5lcigoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuZGlzcG9zZSgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGFrZSB7YmF0Y2hTaXplfSBpdGVtcyBmcm9tIHRoZSBxdWV1ZSBhbmQgc2VuZCBpdCB0byBlbmRwb2ludC5cclxuICAgICAqIENvbmZpcm0gb3IgcmVqZWN0IGNvbnN1bWF0aW9uIG9uIHRoZSBlbmQgb2YgZW5kcG9pbnQgcHJvY2Vzc1xyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGFzeW5jIGZsdXNoKCk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgIGlmICghdGhpcy5fYWN0aXZlKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IGF1ZGl0b3IgPSB0aGlzLl9hdWRpdG9yLnN0YXJ0KHRoaXMuYmF0Y2hCdWlsZGVyLnF1ZXVlKTtcclxuXHJcbiAgICAgICAgY29uc3QgYXZvaWRDb25jdXJyZW5jeSA9ICF0aGlzLl9zeW5jUG9pbnQuY2FwdHVyZSh0aGlzLl9mbHVzaFRpbWVTdHJhdGVneS5zeW5jVGltZSgpKTtcclxuXHJcbiAgICAgICAgY29uc3QgY29uc3VtcHRpb24gPSBhd2FpdCB0aGlzLmJhdGNoQnVpbGRlci5uZXh0KGF2b2lkQ29uY3VycmVuY3kpO1xyXG5cclxuICAgICAgICBpZiAoIWNvbnN1bXB0aW9uKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGF1ZGl0b3IuZGVxdWV1ZWQoY29uc3VtcHRpb24uYmF0Y2gpO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gdGhpcy5lbmRwb2ludFxyXG4gICAgICAgICAgICAgICAgLnNlbmQoY29uc3VtcHRpb24uYmF0Y2gpXHJcbiAgICAgICAgICAgICAgICAudGhlbihcclxuICAgICAgICAgICAgICAgIGFzeW5jICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBhdWRpdG9yLmNvbmZpcm1lZChBamF4UmVxdWVzdFN0YXR1c1Jlc3VsdC5TdWNjZXNzKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgYXdhaXQgY29uc3VtcHRpb24uYWNrKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGF1ZGl0b3IuZW5kZWQoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbG9nZ2VyLmxvZyhgW1FJRDoke3RoaXMucXVldWVJZH1dOiBCYXRjaCAke2NvbnN1bXB0aW9uLmJhdGNoLmluZGV4fSB3YXMgc2VudCBzdWNjZXNzZnVsbHkuYCk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgYXN5bmMgKHJlYXNvbikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGF1ZGl0b3IuY29uZmlybWVkKEFqYXhSZXF1ZXN0U3RhdHVzUmVzdWx0Lk5ldHdvcmtFcnJvcik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGF3YWl0IGNvbnN1bXB0aW9uLm5hY2soKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgYXVkaXRvci5lbmRlZCgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9sb2dnZXIuZXJyb3IoYFtRSUQ6JHt0aGlzLnF1ZXVlSWR9XTogQmF0Y2ggJHtjb25zdW1wdGlvbi5iYXRjaC5pbmRleH0gd2FzIHNlbnQgd2l0aCBlcnJvci5gLCByZWFzb24pO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBhdWRpdG9yLnNlbnQoKTtcclxuXHJcbiAgICAgICAgICAgIGF3YWl0IHJlc3VsdDtcclxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICBhd2FpdCBjb25zdW1wdGlvbi5uYWNrKCk7XHJcbiAgICAgICAgICAgIHRocm93IGVycm9yO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvaWZkZWYtbG9hZGVyL2lmZGVmLWxvYWRlci5qcz9ERUJVRz10cnVlJlBFUkZPUk1BTkNFX0FVRElUPXRydWUhLi9zcmMvcHJvY2Vzc2luZy9waXBlLnRzIiwiaW1wb3J0IHsgTWVzc2FnZVR5cGUgfSBmcm9tICcuLi9kZWZpbml0aW9ucyc7XHJcblxyXG4vKipcclxuICogRW52ZWxvcCBmb3IgYSBtZXNzYWdlLlxyXG4gKiBFbnJpY2ggYWRkaXRpb25hbCB0ZWNobmljYWwgaW5mb3JtYXRpb24uXHJcbiAqXHJcbiAqIEBpbnRlcm5hbFxyXG4gKi9cclxuZXhwb3J0IGludGVyZmFjZSBJRW52ZWxvcCB7XHJcbiAgICAvKipcclxuICAgICAqIFVuaXF1ZSBJRCBvZiBtZXNzYWdlXHJcbiAgICAgKi9cclxuICAgIGlkOiBzdHJpbmc7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaW1lc3RhbXAgb2YgbWVzc2FnZSBzZW5kaW5nIHRvIHRoZSBsaWJyYXJ5XHJcbiAgICAgKi9cclxuICAgIHRpbWVzdGFtcDogbnVtYmVyO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogTmFtZSBvZiBtZXNzYWdlXHJcbiAgICAgKi9cclxuICAgIG5hbWU6IHN0cmluZztcclxuXHJcbiAgICAvKipcclxuICAgICAqIFR5cGUgb2YgbWVzc2FnZSBib2R5XHJcbiAgICAgKi9cclxuICAgIHJlYWRvbmx5IHR5cGU6IE1lc3NhZ2VUeXBlO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogTWFpbiBtZXNzYWdlIGJvZHkgZnJvbSBhIHVzZXIgY29kZVxyXG4gICAgICovXHJcbiAgICBtZXNzYWdlOiBvYmplY3Q7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBFbnZlbG9wIGZvciBhIG1lc3NhZ2UuXHJcbiAqIEVucmljaCBhZGRpdGlvbmFsIHRlY2huaWNhbCBpbmZvcm1hdGlvbi5cclxuICpcclxuICogQGludGVybmFsXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgRW52ZWxvcCBpbXBsZW1lbnRzIElFbnZlbG9wIHtcclxuICAgIC8qKlxyXG4gICAgICogVW5pcXVlIElEIG9mIG1lc3NhZ2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIGlkOiBzdHJpbmc7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaW1lc3RhbXAgb2YgbWVzc2FnZSBzZW5kaW5nIHRvIHRoZSBsaWJyYXJ5XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyB0aW1lc3RhbXA6IG51bWJlcjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIE5hbWUgb2YgbWVzc2FnZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgbmFtZTogc3RyaW5nO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFR5cGUgb2YgbWVzc2FnZSBib2R5XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IHR5cGU6IE1lc3NhZ2VUeXBlLFxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBNYWluIG1lc3NhZ2UgYm9keSBmcm9tIGEgdXNlciBjb2RlXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIG1lc3NhZ2U6IGFueSA9IHsgfVxyXG4gICAgKSB7IH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvaWZkZWYtbG9hZGVyL2lmZGVmLWxvYWRlci5qcz9ERUJVRz10cnVlJlBFUkZPUk1BTkNFX0FVRElUPXRydWUhLi9zcmMvcHJvY2Vzc2luZy9lbnZlbG9wLnRzIiwiaW1wb3J0IHsgSUNvbmZpZ3VyYXRpb24sIElFbnZpcm9ubWVudERhdGEgfSBmcm9tICcuL2NvbmZpZ3VyYXRpb25zJztcclxuaW1wb3J0IHsgbWVzc2FnZXNDb25maWd1cmF0aW9uIH0gZnJvbSAnLi9jb25maWd1cmF0aW9ucy9kZWZhdWx0cy9tZXNzYWdlcy1jb25maWd1cmF0aW9uJztcclxuaW1wb3J0IHsgR3VpZFByb3ZpZGVyLCBTaW5nbGV0b24sIFRpbWVTdGFtcFByb3ZpZGVyIH0gZnJvbSAnLi9mcmFtZXdvcmsnO1xyXG5pbXBvcnQgeyBVbml2ZXJzYWxMb2dnZXIsIFdvcmtlckxvZ2dlciB9IGZyb20gJy4vbG9ncyc7XHJcbmltcG9ydCB7IFBvbHlmaWxscyB9IGZyb20gJy4vcG9seWZpbGxzJztcclxuaW1wb3J0IHsgQnVzQnVpbGRlciwgTWVzc2VuZ2VyLCBSb3V0ZXIgfSBmcm9tICcuL3Byb2Nlc3NpbmcnO1xyXG5pbXBvcnQgeyBNZXNzZW5nZXJQZXJmb3JtYW5jZUF1ZGl0b3JCdWlsZGVyIH0gZnJvbSAnLi9wcm9jZXNzaW5nL2F1ZGl0L2F1ZGl0b3JzL21lc3Nlbmdlci1wZXJmb3JtYW5jZS1hdWRpdG9yJztcclxuaW1wb3J0IHsgTWVzc2VuZ2VyU3RhdGlzdGljQXVkaXRvciB9IGZyb20gJy4vcHJvY2Vzc2luZy9hdWRpdC9hdWRpdG9ycy9tZXNzZW5nZXItc3RhdGlzdGljLWF1ZGl0b3InO1xyXG5pbXBvcnQgeyBQaXBlU3RhdHNQcm92aWRlciB9IGZyb20gJy4vcHJvY2Vzc2luZy9hdWRpdC9zdGF0cy9waXBlLXN0YXRzLXByb3ZpZGVyJztcclxuaW1wb3J0IHsgUGlwZVN0YXRzSW5kZXhlZERCU3RvcmFnZSB9IGZyb20gJy4vcHJvY2Vzc2luZy9hdWRpdC9zdGF0cy9zdG9yYWdlcy9waXBlLXN0YXRzLmluZGV4ZWRkYic7XHJcbmltcG9ydCB7IFBpcGVTdGF0c0xvY2FsU3RvcmFnZSB9IGZyb20gJy4vcHJvY2Vzc2luZy9hdWRpdC9zdGF0cy9zdG9yYWdlcy9waXBlLXN0YXRzLmxvY2FsLXN0b3JhZ2UnO1xyXG5pbXBvcnQgeyBQaXBlU3RhdHNNZW1vcnlTdG9yYWdlIH0gZnJvbSAnLi9wcm9jZXNzaW5nL2F1ZGl0L3N0YXRzL3N0b3JhZ2VzL3BpcGUtc3RhdHMubWVtb3J5JztcclxuaW1wb3J0IHsgUG9zdG1hbiB9IGZyb20gJy4vcHJvY2Vzc2luZy9wb3N0bWFuJztcclxuaW1wb3J0IHsgSVdvcmtlckdsb2JhbFNjb3BlIH0gZnJvbSAnLi93b3JrZXJzL3dvcmtlci1kZWZpbml0aW9ucyc7XHJcbmltcG9ydCB7IFdvcmtlclJlY2VpdmVyIH0gZnJvbSAnLi93b3JrZXJzL3dvcmtlci1yZWNlaXZlcic7XHJcbmltcG9ydCB7IFdvcmtlclNjb3BlIH0gZnJvbSAnLi93b3JrZXJzL3dvcmtlci1zY29wZSc7XHJcblxyXG4vKipcclxuICogRW50cnkgcG9pbnQgZm9yIGJ1aWxkaW5nIGpzLWZpbGUgZm9yIFdlYldvcmtlciBlbnZpcm9ubWVudFxyXG4gKi9cclxuKCgpID0+IHtcclxuICAgIC8vIFJlY2VpdmUgY3VycmVudCBnbG9iYWwgc2NvcGUgdmFyaWFibGVcclxuICAgIGNvbnN0IHNjb3BlOiBJV29ya2VyR2xvYmFsU2NvcGUgPSBXb3JrZXJTY29wZS5jdXJyZW50KCk7XHJcblxyXG4gICAgLy8gQ3JlYXRlIGxvZ2dlciBmb3IgYWxsIG9iamVjdHNcclxuICAgIGNvbnN0IGxvZ2dlciA9IG5ldyBVbml2ZXJzYWxMb2dnZXIoWyBdKTtcclxuXHJcbiAgICAvLyBDcmVhdGUgbWVzc2FnZXMgcmVjZWl2ZXIgZnJvbSBtYWluIHRocmVhZFxyXG4gICAgY29uc3QgcmVjZWl2ZXIgPSBuZXcgV29ya2VyUmVjZWl2ZXIoc2NvcGUsIGxvZ2dlcik7XHJcblxyXG4gICAgLy8gVXNlIHNpbmdsZXRvbiB0byBwcmV2ZW50IGEgZmV3IGluaXRpYWxpemF0aW9uIGluIHNoYXJlZCB3ZWIgd29ya2VyXHJcbiAgICBjb25zdCBzaW5nbGV0b24gPSBuZXcgU2luZ2xldG9uKChjb25maWd1cmF0aW9uOiBJQ29uZmlndXJhdGlvbiwgZW52aXJvbm1lbnQ6IElFbnZpcm9ubWVudERhdGEpID0+IHtcclxuICAgICAgICBsb2dnZXIuZW5hYmxlZCA9IGVudmlyb25tZW50LmRlYnVnO1xyXG5cclxuICAgICAgICAvLyBSdW4gbG9hZGluZyBwb2x5ZmlsbHMgaWYgdGhleSBhcmUgbmVjZXNzYXJ5XHJcbiAgICAgICAgUG9seWZpbGxzLmxvYWQoc2NvcGUsIGFzeW5jICgpID0+IHtcclxuICAgICAgICAgICAgLy8gQWRkIGxvZ2dlciBmb3Igc2VuZGluZyBtZXNzYWdlcyBiYWNrIHRvIG1haW4gdGhyZWFkXHJcbiAgICAgICAgICAgIGxvZ2dlci5yZXBsYWNlKFsgbmV3IFdvcmtlckxvZ2dlcihyZWNlaXZlci5jb250ZXh0LnNlbmRlcikgXSk7XHJcblxyXG4gICAgICAgICAgICAvLyBDcmVhdGUgY2xhc3MgdG8gc2VhbCBtZXNzYWdlcyB0byBlbnZlbG9wcyAocHJvdmlkZSBlbnJpY2htZW50KVxyXG4gICAgICAgICAgICBjb25zdCBwb3N0bWFuID0gbmV3IFBvc3RtYW4oR3VpZFByb3ZpZGVyLmRlZmF1bHQsIG5ldyBUaW1lU3RhbXBQcm92aWRlcigpKTtcclxuXHJcbiAgICAgICAgICAgIC8vIENyZWF0ZSBzdGF0aXN0aWMgc3RvcmFnZXMgYW5kIHByb3ZpZGVyc1xyXG4gICAgICAgICAgICBjb25zdCBzdGF0c1N0b3JhZ2UgPSAgUGlwZVN0YXRzTG9jYWxTdG9yYWdlLmNyZWF0ZSgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8fCBhd2FpdCBQaXBlU3RhdHNJbmRleGVkREJTdG9yYWdlLmNyZWF0ZSgpLmNhdGNoKCgpID0+IG5ldyBQaXBlU3RhdHNNZW1vcnlTdG9yYWdlKCkpO1xyXG4gICAgICAgICAgICBjb25zdCBzdGF0c1Byb3ZpZGVyID0gbmV3IFBpcGVTdGF0c1Byb3ZpZGVyKHN0YXRzU3RvcmFnZSk7XHJcblxyXG4gICAgICAgICAgICAvLyBDcmVhdGUgYnVzIGJ1aWxkZXIgZnJvbSBjb25maWd1cmF0aW9uXHJcbiAgICAgICAgICAgIGNvbnN0IGJ1c0J1aWxkZXIgPSBuZXcgQnVzQnVpbGRlcihyZWNlaXZlci5jb250ZXh0LCBjb25maWd1cmF0aW9uLCBlbnZpcm9ubWVudCwgc3RhdHNQcm92aWRlciwgbG9nZ2VyKTtcclxuXHJcbiAgICAgICAgICAgIC8vIEJ1aWxkIGJ1c1xyXG4gICAgICAgICAgICBjb25zdCBidXMgPSBhd2FpdCBidXNCdWlsZGVyLmJ1aWxkKCk7XHJcblxyXG4gICAgICAgICAgICAvLyBDcmVhdGUgYSBtZXNzYWdlIHJvdXRlclxyXG4gICAgICAgICAgICBjb25zdCByb3V0ZXIgPSBuZXcgUm91dGVyKG1lc3NhZ2VzQ29uZmlndXJhdGlvbiwgYnVzLnF1ZXVlcyk7XHJcblxyXG4gICAgICAgICAgICAvLyBQZXJmb3JtYW5jZSBhbmQgc3RhdGlzdGljIGF1ZGl0b3JzIGZvciBNZXNzZW5nZXJcclxuICAgICAgICAgICAgY29uc3QgbWVzc2FnZXNQZXJmb3JtYW5jZUF1ZGl0b3IgPSBNZXNzZW5nZXJQZXJmb3JtYW5jZUF1ZGl0b3JCdWlsZGVyLmNyZWF0ZShlbnZpcm9ubWVudC5wZXJmb3JtYW5jZUF1ZGl0LCBidXNCdWlsZGVyLmF1ZGl0U2VuZGVyKTtcclxuICAgICAgICAgICAgY29uc3QgbWVzc2FnZXNTdGF0aXN0aWNBdWRpdG9yID0gbmV3IE1lc3NlbmdlclN0YXRpc3RpY0F1ZGl0b3Ioc3RhdHNTdG9yYWdlKTtcclxuXHJcbiAgICAgICAgICAgIC8vIENyZWF0ZSBtZXNzYWdlIHJvdXRlciB0byBoYW5kbGluZyBtZXNzYWdlcyBmcm9tIG1haW4gdGhyZWFkXHJcbiAgICAgICAgICAgIGNvbnN0IG1lc3NlbmdlciA9IG5ldyBNZXNzZW5nZXIocm91dGVyLCBwb3N0bWFuLCBtZXNzYWdlc1N0YXRpc3RpY0F1ZGl0b3IsIG1lc3NhZ2VzUGVyZm9ybWFuY2VBdWRpdG9yKTtcclxuXHJcbiAgICAgICAgICAgIC8vIEJpbmQgcmVjZWl2ZSBldmVudCBmcm9tIG1haW4gdGhyZWFkIHRvIE1lc3NlbmdlciBoYW5kbGVyXHJcbiAgICAgICAgICAgIHJlY2VpdmVyLm1lc3NhZ2VzLnN1YnNjcmliZSgoZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgbWVzc2VuZ2VyLnNlbmQoZGF0YS5tZXNzYWdlcyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgLy8gU3RhcnQgYWxsIHBpcGVzIHRvIGhhbmRsZSBtZXNzYWdlcyBmcm9tIHF1ZXVlc1xyXG4gICAgICAgICAgICBhd2FpdCBidXMuc3RhcnQoKTtcclxuXHJcbiAgICAgICAgICAgIC8vIFN1YnNjcmliZSBmb3IgdGVybWluYXRpb24gY29tbWFuZCBhbmQgdGVybWluYXRlIGFsbCByZWFjdGlvbnMgZm9yIG90aGVyIGNhbGxpbmdcclxuICAgICAgICAgICAgcmVjZWl2ZXIudGVybWluYXRlLmhhbmRsZXIgPSBhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgIGF3YWl0IGJ1cy50ZXJtaW5hdGUoKTtcclxuICAgICAgICAgICAgICAgICAgICBhd2FpdCBzdGF0c1N0b3JhZ2UuY2xlYXIoKTtcclxuICAgICAgICAgICAgICAgICAgICBhd2FpdCBzdGF0c1N0b3JhZ2UuZGlzcG9zZSgpO1xyXG4gICAgICAgICAgICAgICAgfSBmaW5hbGx5IHtcclxuICAgICAgICAgICAgICAgICAgICByZWNlaXZlci5kaXNwb3NlKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBsb2dnZXIubG9nKCdXb3JrZXIgd2FzIHN0YXJ0ZWQgc3VjY2Vzc2Z1bGx5LicpO1xyXG4gICAgICAgIH0sIGVudmlyb25tZW50KTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIE1hcCByZWNlaXZpbmcgb2YgY29uZmlndXJhdGlvbiBtZXNzYWdlcyB0byBzaW5nbGV0b24gZXhlY3V0aW9uXHJcbiAgICByZWNlaXZlci5jb25maWd1cmF0aW9uLnN1YnNjcmliZSgoZXZlbnQpID0+IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBzaW5nbGV0b24uZXhlY3V0ZU9uY2UoZXZlbnQuY29uZmlndXJhdGlvbiwgZXZlbnQuZW52aXJvbm1lbnQpO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgIGxvZ2dlci5lcnJvcihlcnJvcik7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn0pKCk7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy9pZmRlZi1sb2FkZXIvaWZkZWYtbG9hZGVyLmpzP0RFQlVHPXRydWUmUEVSRk9STUFOQ0VfQVVESVQ9dHJ1ZSEuL3NyYy9tZXNzYWdpbmctY2xpZW50LXdvcmtlci50cyIsIlxyXG5pbXBvcnQgeyBJTWVzc2FnZXNDb25maWd1cmF0aW9uIH0gZnJvbSAnLi4vbWVzc2FnZXMtY29uZmlndXJhdGlvbic7XHJcblxyXG4vKipcclxuICogQGludGVybmFsXHJcbiAqL1xyXG5leHBvcnQgY29uc3QgbWVzc2FnZXNDb25maWd1cmF0aW9uOiBJTWVzc2FnZXNDb25maWd1cmF0aW9uID0ge1xyXG4gICAgbWVzc2FnZXM6IFtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBDb25maWd1cmF0aW9uIGZvciBlYWNoIG1lc3NhZ2VzXHJcbiAgICAgICAgICogRGlzYmxlIGluIGZpcnN0IHZlcnNpb24gZm9yIHNlbmRpbmcgYWxsIG1lc3NhZ2VzIHRvICdkZWZhdWx0JyBxdWV1ZS5cclxuICAgICAgICAgKi9cclxuICAgICAgICAvKlxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdHlwZTogJ21lYXN1cmVtZW50JyxcclxuICAgICAgICAgICAgcXVldWU6ICdkZWJ1ZydcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdHlwZTogJ2xvZycsXHJcbiAgICAgICAgICAgIHF1ZXVlOiAnZGVidWcnXHJcbiAgICAgICAgfVxyXG4gICAgICAgICovXHJcbiAgICBdXHJcbn07XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy9pZmRlZi1sb2FkZXIvaWZkZWYtbG9hZGVyLmpzP0RFQlVHPXRydWUmUEVSRk9STUFOQ0VfQVVESVQ9dHJ1ZSEuL3NyYy9jb25maWd1cmF0aW9ucy9kZWZhdWx0cy9tZXNzYWdlcy1jb25maWd1cmF0aW9uLnRzIiwiZXhwb3J0ICogZnJvbSAnLi9sb2dnZXInO1xyXG5leHBvcnQgKiBmcm9tICcuL2NvbnNvbGUtbG9nZ2VyJztcclxuZXhwb3J0ICogZnJvbSAnLi9ldmVudC1sb2dnZXInO1xyXG5leHBvcnQgKiBmcm9tICcuL3dvcmtlci1sb2dnZXInO1xyXG5leHBvcnQgKiBmcm9tICcuL3VuaXZlcnNhbC1sb2dnZXInO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvaWZkZWYtbG9hZGVyL2lmZGVmLWxvYWRlci5qcz9ERUJVRz10cnVlJlBFUkZPUk1BTkNFX0FVRElUPXRydWUhLi9zcmMvbG9ncy9pbmRleC50cyIsImltcG9ydCB7IElMb2dXb3JrZXJNZXNzYWdlLCBJV29ya2VyTWVzc2FnZVNlbmRlciB9IGZyb20gJy4uL3dvcmtlcnMvd29ya2VyLWRlZmluaXRpb25zJztcclxuaW1wb3J0IHsgSUxvZ2dlciB9IGZyb20gJy4vbG9nZ2VyJztcclxuXHJcbi8qKlxyXG4gKiBTZW5kIGxvZyBtZXNzYWdlcyB0byBhIG1haW4gdGhyZWFkXHJcbiAqXHJcbiAqIEBpbnRlcm5hbFxyXG4gKiBAY2xhc3MgU2hhcmVkV29ya2VyTG9nZ2VyXHJcbiAqIEBpbXBsZW1lbnRzIHtJTG9nZ2VyfVxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFdvcmtlckxvZ2dlciBpbXBsZW1lbnRzIElMb2dnZXIge1xyXG4gICAgcHVibGljIHJlYWRvbmx5IHByZWZpeDogc3RyaW5nID0gYGA7XHJcblxyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBfc2VuZGVyOiBJV29ya2VyTWVzc2FnZVNlbmRlclxyXG4gICAgKSB7IH1cclxuXHJcbiAgICBwdWJsaWMgZmF0YWwobWVzc2FnZTogc3RyaW5nLCBlcnJvcj86IEVycm9yKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fc2VuZGVyLnBvc3RNZXNzYWdlKHsgdHlwZTogJ2xvZycsIGxvZzoge2xldmVsOiAnZmF0YWwnLCBtZXNzYWdlOiB0aGlzLnByZWZpeCArIG1lc3NhZ2UsIGVycm9yfSB9IGFzIElMb2dXb3JrZXJNZXNzYWdlKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZXJyb3IobWVzc2FnZTogc3RyaW5nLCBlcnJvcj86IEVycm9yKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fc2VuZGVyLnBvc3RNZXNzYWdlKHsgdHlwZTogJ2xvZycsIGxvZzoge2xldmVsOiAnZXJyb3InLCBtZXNzYWdlOiB0aGlzLnByZWZpeCArIG1lc3NhZ2UsIGVycm9yfSB9IGFzIElMb2dXb3JrZXJNZXNzYWdlKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbG9nKG1lc3NhZ2U6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX3NlbmRlci5wb3N0TWVzc2FnZSh7IHR5cGU6ICdsb2cnLCBsb2c6IHtsZXZlbDogJ2xvZycsIG1lc3NhZ2U6IHRoaXMucHJlZml4ICsgbWVzc2FnZX0gfSBhcyBJTG9nV29ya2VyTWVzc2FnZSk7XHJcbiAgICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL2lmZGVmLWxvYWRlci9pZmRlZi1sb2FkZXIuanM/REVCVUc9dHJ1ZSZQRVJGT1JNQU5DRV9BVURJVD10cnVlIS4vc3JjL2xvZ3Mvd29ya2VyLWxvZ2dlci50cyIsIi8qKlxyXG4gKiBQb2x5ZmlsbHNcclxuICovXHJcblxyXG5pbXBvcnQgeyBJRW52aXJvbm1lbnREYXRhIH0gZnJvbSAnLi9jb25maWd1cmF0aW9ucy9lbnZpcm9ubWVudCc7XHJcbmltcG9ydCB7IElXb3JrZXJHbG9iYWxTY29wZSB9IGZyb20gJy4vd29ya2Vycy93b3JrZXItZGVmaW5pdGlvbnMnO1xyXG5cclxuLyoqXHJcbiAqIER5bmFtaWMgcG9seWZpbGxzIGxvYWRlciBmcm9tIHNlcGFyYXRlZCBmaWxlXHJcbiAqIElmIHNvbWUgb2YgQXBpIGlzIG5vdCBleGlzdHMgLSBsb2FkIGFsbCBiYXRjaCB0byBicm93c2VyLlxyXG4gKiBBY3R1YWwgZm9yIHN1cHBvcnRpbmcgSUU5K1xyXG4gKlxyXG4gKiBAaW50ZXJuYWxcclxuICogQGNsYXNzIFBvbHlmaWxsc1xyXG4gKi9cclxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFBvbHlmaWxscyB7XHJcbiAgICAvKipcclxuICAgICAqIENoZWNrIGFuZCBsb2FkIHBvbHlmaWxscyBpZiBuZWNlc3NhcnlcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBsb2FkKHNjb3BlOiBJV29ya2VyR2xvYmFsU2NvcGUsIGxvYWRlZDogKCkgPT4gdm9pZCwgZGF0YTogSUVudmlyb25tZW50RGF0YSkge1xyXG4gICAgICAgIC8vIENoZWNrIHJlcXVpcmVkIEFQSXMgYW5kIGxvYWQgcG9seWZpbHMgaWYgbmVjZXNzYXJ5XHJcbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXHJcbiAgICAgICAgaWYgKGRhdGEuZm9yY2VQb2x5ZmlsbHMgfHxcclxuICAgICAgICAgICAgdHlwZW9mIFByb21pc2UgPT09ICd1bmRlZmluZWQnIHx8XHJcbiAgICAgICAgICAgIHR5cGVvZiBNYXAgPT09ICd1bmRlZmluZWQnIHx8XHJcbiAgICAgICAgICAgIHR5cGVvZiBTeW1ib2wgPT09ICd1bmRlZmluZWQnXHJcbiAgICAgICAgKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IHNjb3BlLmltcG9ydFNjcmlwdHMoZGF0YS5wb2x5ZmlsbHNVcmwgfHwgUG9seWZpbGxzLnVybChzY29wZSwgJy9tZXNzYWdpbmctY2xpZW50LXBvbHlmaWxscy5qcycpKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChyZXN1bHQgJiYgdHlwZW9mIHJlc3VsdC50aGVuID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgICAgICByZXN1bHQudGhlbihsb2FkZWQpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgbG9hZGVkKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBsb2FkZWQoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgdXJsKHNjb3BlOiBJV29ya2VyR2xvYmFsU2NvcGUsIHBvbHlmaWxsc05hbWU6IHN0cmluZykge1xyXG4gICAgICAgIGxldCBjdXJyZW50TG9jYXRpb246IHN0cmluZyA9IChzY29wZS5sb2NhdGlvbiB8fCAnJykudG9TdHJpbmcoKTtcclxuXHJcbiAgICAgICAgY3VycmVudExvY2F0aW9uID0gY3VycmVudExvY2F0aW9uLnN1YnN0cmluZygwLCBjdXJyZW50TG9jYXRpb24ubGFzdEluZGV4T2YoJy8nKSk7XHJcblxyXG4gICAgICAgIHJldHVybiBjdXJyZW50TG9jYXRpb24gKyBwb2x5ZmlsbHNOYW1lO1xyXG4gICAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy9pZmRlZi1sb2FkZXIvaWZkZWYtbG9hZGVyLmpzP0RFQlVHPXRydWUmUEVSRk9STUFOQ0VfQVVESVQ9dHJ1ZSEuL3NyYy9wb2x5ZmlsbHMudHMiLCJleHBvcnQgKiBmcm9tICcuL2J1cy1idWlsZGVyJztcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL2lmZGVmLWxvYWRlci9pZmRlZi1sb2FkZXIuanM/REVCVUc9dHJ1ZSZQRVJGT1JNQU5DRV9BVURJVD10cnVlIS4vc3JjL3Byb2Nlc3NpbmcvYnVpbGRlcnMvaW5kZXgudHMiLCJpbXBvcnQgeyBJQ29uZmlndXJhdGlvbiwgSUVuZHBvaW50Q29uZmlnLCBJSW5NZW1vcnlRdWV1ZUNvbmZpZywgSVBlcnNpc3RlbnRRdWV1ZUNvbmZpZyB9IGZyb20gJy4uLy4uL2NvbmZpZ3VyYXRpb25zL2NvbmZpZ3VyYXRpb24nO1xyXG5pbXBvcnQgeyBJRW52aXJvbm1lbnREYXRhIH0gZnJvbSAnLi4vLi4vY29uZmlndXJhdGlvbnMvZW52aXJvbm1lbnQnO1xyXG5pbXBvcnQgeyBBamF4LCBJQWpheFByb3ZpZGVyLCBUaW1lU3RhbXBQcm92aWRlciB9IGZyb20gJy4uLy4uL2ZyYW1ld29yayc7XHJcbmltcG9ydCB7IElMb2dnZXIgfSBmcm9tICcuLi8uLi9sb2dzJztcclxuaW1wb3J0IHsgSVF1ZXVlLCBNZW1vcnlRdWV1ZSB9IGZyb20gJy4uLy4uL3F1ZXVlcyc7XHJcbmltcG9ydCB7IFNhbXBsZWRRdWV1ZSB9IGZyb20gJy4uLy4uL3F1ZXVlcyc7XHJcbmltcG9ydCB7IEluZGV4ZWREQlF1ZXVlIH0gZnJvbSAnLi4vLi4vcXVldWVzL2luZGV4ZWRkYi9pbmRleGVkZGItcXVldWUnO1xyXG5pbXBvcnQgeyBMb2NhbFN0b3JhZ2VRdWV1ZSB9IGZyb20gJy4uLy4uL3F1ZXVlcy9sb2NhbC1zdG9yYWdlL2xvY2FsLXN0b3JhZ2UtcXVldWUnO1xyXG5pbXBvcnQgeyBCYXRjaEF1ZGl0UHJvdmlkZXIgfSBmcm9tICcuLi9hdWRpdC9hdWRpdC1wcm92aWRlcic7XHJcbmltcG9ydCB7IFBpcGVQZXJmb3JtYW5jZUF1ZGl0b3JCdWlsZGVyIH0gZnJvbSAnLi4vYXVkaXQvYXVkaXRvcnMvcGlwZS1wZXJmb3JtYW5jZS1hdWRpdG9yJztcclxuaW1wb3J0IHsgUGlwZVN0YXRpc3RpY0F1ZGl0b3IgfSBmcm9tICcuLi9hdWRpdC9hdWRpdG9ycy9waXBlLXN0YXRpc3RpY3MtYXVkaXRvcic7XHJcbmltcG9ydCB7IFdvcmtlckF1ZGl0U2VuZGVyIH0gZnJvbSAnLi4vYXVkaXQvc2VuZGVycy93b3JrZXItYXVkaXQtc2VuZGVyJztcclxuaW1wb3J0IHsgSVBpcGVTdGF0c1Byb3ZpZGVyIH0gZnJvbSAnLi4vYXVkaXQvc3RhdHMvcGlwZS1zdGF0cyc7XHJcbmltcG9ydCB7IEJhdGNoQnVpbGRlciB9IGZyb20gJy4uL2JhdGNoLWJ1aWxkZXInO1xyXG5pbXBvcnQgeyBEZWZhdWx0QmF0Y2hEcm9wU3RyYXRlZ3kgfSBmcm9tICcuLi9iYXRjaC1kcm9wLXN0cmF0ZWd5JztcclxuaW1wb3J0IHsgSUJhdGNoU3RvcmFnZSB9IGZyb20gJy4uL2JhdGNoLXN0b3JhZ2VzL2JhdGNoLXN0b3JhZ2UnO1xyXG5pbXBvcnQgeyBCYXRjaEluZGV4ZWREQlN0b3JhZ2UgfSBmcm9tICcuLi9iYXRjaC1zdG9yYWdlcy9pbmRleGVkZGItc3RvcmFnZS9iYXRjaC1pbmRleGVkZGItc3RvcmFnZSc7XHJcbmltcG9ydCB7IEJhdGNoTG9jYWxTdG9yYWdlU3RvcmFnZSB9IGZyb20gJy4uL2JhdGNoLXN0b3JhZ2VzL2xvY2FsLXN0b3JhZ2UvYmF0Y2gtbG9jYWxzdG9yYWdlLXN0b3JhZ2UnO1xyXG5pbXBvcnQgeyBCYXRjaE1lbW9yeVN0b3JhZ2UgfSBmcm9tICcuLi9iYXRjaC1zdG9yYWdlcy9tZW1vcnktc3RvcmFnZS9iYXRjaC1tZW1vcnktc3RvcmFnZSc7XHJcbmltcG9ydCB7IEJ1cyB9IGZyb20gJy4uL2J1cyc7XHJcbmltcG9ydCB7IENvbnRleHQgfSBmcm9tICcuLi9jb250ZXh0JztcclxuaW1wb3J0IHsgRkVBbmFseXRpY3NDb2xsZWN0b3JFbmRwb2ludCwgSUVuZHBvaW50LCBJRkVBbmFseXRpY3NDb2xsZWN0b3JDb25maWd1cmF0aW9uIH0gZnJvbSAnLi4vZW5kcG9pbnRzJztcclxuaW1wb3J0IHsgRHluYW1pY0ZsdXNoVGltZVN0cmF0ZWd5IH0gZnJvbSAnLi4vZmx1c2gtdGltZS1zdHJhdGVneSc7XHJcbmltcG9ydCB7IFBpcGUgfSBmcm9tICcuLi9waXBlJztcclxuaW1wb3J0IHsgUG9ydEFqYXhQcm92aWRlciB9IGZyb20gJy4vcG9ydC1hamF4LXByb3ZpZGVyJztcclxuXHJcbi8qKlxyXG4gKiBAaW50ZXJuYWxcclxuICovXHJcbmV4cG9ydCBjbGFzcyBCdXNCdWlsZGVyIHtcclxuICAgIHB1YmxpYyByZWFkb25seSBhdWRpdFNlbmRlcjogV29ya2VyQXVkaXRTZW5kZXI7XHJcblxyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBfY29udGV4dDogQ29udGV4dCxcclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IF9jb25maWc6IElDb25maWd1cmF0aW9uLFxyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgX2Vudmlyb25tZW50OiBJRW52aXJvbm1lbnREYXRhLFxyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgX3N0YXRzUHJvdmlkZXI6IElQaXBlU3RhdHNQcm92aWRlcixcclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IF9sb2dnZXI6IElMb2dnZXJcclxuICAgICkge1xyXG4gICAgICAgIHRoaXMuYXVkaXRTZW5kZXIgPSBuZXcgV29ya2VyQXVkaXRTZW5kZXIodGhpcy5fY29udGV4dCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFzeW5jIGJ1aWxkKCk6IFByb21pc2U8QnVzPiB7XHJcbiAgICAgICAgY29uc3QgYWxsUGlwZXMgPSBuZXcgTWFwPHN0cmluZywgUGlwZT4oKTtcclxuXHJcbiAgICAgICAgZm9yIChjb25zdCBlbmRwb2ludENvbmZpZyBvZiB0aGlzLl9jb25maWcuZW5kcG9pbnRzKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHBpcGVzID0gYXdhaXQgdGhpcy5waXBlcyhlbmRwb2ludENvbmZpZyk7XHJcblxyXG4gICAgICAgICAgICBwaXBlcy5mb3JFYWNoKChwaXBlLCBpZCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgYWxsUGlwZXMuc2V0KGlkLCBwaXBlKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gbmV3IEJ1cyhhbGxQaXBlcyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBhc3luYyBwaXBlcyhlbmRwb2ludENvbmZpZzogSUVuZHBvaW50Q29uZmlnKTogUHJvbWlzZTxNYXA8c3RyaW5nLCBQaXBlPj4ge1xyXG4gICAgICAgIGNvbnN0IGVuZHBvaW50ID0gdGhpcy5lbmRwb2ludChlbmRwb2ludENvbmZpZyk7XHJcblxyXG4gICAgICAgIGNvbnN0IHBpcGVzID0gbmV3IE1hcDxzdHJpbmcsIFBpcGU+KCk7XHJcblxyXG4gICAgICAgIGNvbnN0IHBlcmZvcm1hbmNlQXVkaXRvciA9IFBpcGVQZXJmb3JtYW5jZUF1ZGl0b3JCdWlsZGVyLmNyZWF0ZSh0aGlzLl9lbnZpcm9ubWVudC5wZXJmb3JtYW5jZUF1ZGl0LCBuZXcgV29ya2VyQXVkaXRTZW5kZXIodGhpcy5fY29udGV4dCkpO1xyXG4gICAgICAgIGNvbnN0IHN0YXRpc3RpY0F1ZGl0b3IgPSBuZXcgUGlwZVN0YXRpc3RpY0F1ZGl0b3IodGhpcy5fc3RhdHNQcm92aWRlcik7XHJcblxyXG4gICAgICAgIGZvciAoY29uc3QgcXVldWVDb25maWcgb2YgZW5kcG9pbnRDb25maWcucXVldWVzKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHF1ZXVlID0gbmV3IFNhbXBsZWRRdWV1ZShhd2FpdCB0aGlzLnF1ZXVlKHF1ZXVlQ29uZmlnKSwgcXVldWVDb25maWcpO1xyXG4gICAgICAgICAgICBjb25zdCBiYXRjaFN0b3JhZ2UgPSBhd2FpdCB0aGlzLmJhdGNoU3RvcmFnZShxdWV1ZUNvbmZpZyk7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBhdWRpdFByb3ZpZGVyID0gbmV3IEJhdGNoQXVkaXRQcm92aWRlcigpO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgYmF0Y2hEcm9wU3RyYXRlZ3kgPSBuZXcgRGVmYXVsdEJhdGNoRHJvcFN0cmF0ZWd5KHF1ZXVlQ29uZmlnKTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGJhdGNoQnVpbGRlciA9IG5ldyBCYXRjaEJ1aWxkZXIocXVldWUsIGJhdGNoU3RvcmFnZSwgYmF0Y2hEcm9wU3RyYXRlZ3ksIGF1ZGl0UHJvdmlkZXIsIHN0YXRpc3RpY0F1ZGl0b3IsIHF1ZXVlQ29uZmlnKTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGZsdXNoVGltZVN0cmF0ZWd5ID0gbmV3IER5bmFtaWNGbHVzaFRpbWVTdHJhdGVneSh0aGlzLl9zdGF0c1Byb3ZpZGVyLmdldChxdWV1ZSksIHF1ZXVlQ29uZmlnKTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHBpcGUgPSBuZXcgUGlwZShiYXRjaEJ1aWxkZXIsIGVuZHBvaW50LCBmbHVzaFRpbWVTdHJhdGVneSwgdGhpcy5fbG9nZ2VyLCBwZXJmb3JtYW5jZUF1ZGl0b3IpO1xyXG5cclxuICAgICAgICAgICAgcGlwZXMuc2V0KHF1ZXVlQ29uZmlnLmlkLCBwaXBlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBwaXBlcztcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGFzeW5jIGJhdGNoU3RvcmFnZShjb25maWc6IElJbk1lbW9yeVF1ZXVlQ29uZmlnIHwgSVBlcnNpc3RlbnRRdWV1ZUNvbmZpZyk6IFByb21pc2U8SUJhdGNoU3RvcmFnZT4ge1xyXG4gICAgICAgIGlmIChjb25maWcucGVyc2lzdGVudCkge1xyXG4gICAgICAgICAgICBjb25zdCBzeW5jVGltZSA9IChjb25maWcubWF4Rmx1c2hUaW1lIHx8IDMwKSAqIDEuNTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBCYXRjaEluZGV4ZWREQlN0b3JhZ2UuY3JlYXRlKGNvbmZpZy5pZCwgc3luY1RpbWUsIGNvbmZpZy5uYW1lLCBjb25maWcucmVzZXQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbigoc3RvcmFnZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0b3JhZ2UubG9nZ2VyID0gdGhpcy5fbG9nZ2VyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2xvZ2dlci5sb2coYENyZWF0ZWQgcGVyc2lzdGVudCBiYXRjaCBzdG9yYWdlIGZvciBpZCAke2NvbmZpZy5pZH1gKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gc3RvcmFnZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuY2F0Y2goKGVycm9yKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fbG9nZ2VyLmVycm9yKCdDcmVhdGluZyBJbmRleGVkRGIgZm9yIGJhdGNoIHN0b3JhZ2Ugd2FzIGZhaWxlZC4nLCBlcnJvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3RvcmFnZSA9IEJhdGNoTG9jYWxTdG9yYWdlU3RvcmFnZS5jcmVhdGUoY29uZmlnLmlkLCBjb25maWcubmFtZSwgY29uZmlnLnJlc2V0KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHN0b3JhZ2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RvcmFnZS5sb2dnZXIgPSB0aGlzLl9sb2dnZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2xvZ2dlci5sb2coYERvd25ncmFkZWQgdG8gbG9jYWwgc3RvcmFnZSBiYXRjaCBzdG9yYWdlIGZvciBpZCAke2NvbmZpZy5pZH0uYCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBzdG9yYWdlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fbG9nZ2VyLmxvZyhgRG93bmdyYWRlZCB0byBtZW1vcnkgYmF0Y2ggc3RvcmFnZSBmb3IgaWQgJHtjb25maWcuaWR9LmApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgQmF0Y2hNZW1vcnlTdG9yYWdlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9sb2dnZXIubG9nKGBDcmVhdGVkIG1lbW9yeSBiYXRjaCBzdG9yYWdlIGZvciBpZCAke2NvbmZpZy5pZH1gKTtcclxuICAgICAgICByZXR1cm4gbmV3IEJhdGNoTWVtb3J5U3RvcmFnZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgYXN5bmMgcXVldWUoY29uZmlnOiBJSW5NZW1vcnlRdWV1ZUNvbmZpZyB8IElQZXJzaXN0ZW50UXVldWVDb25maWcpOiBQcm9taXNlPElRdWV1ZT4ge1xyXG4gICAgICAgIGlmIChjb25maWcucGVyc2lzdGVudCkge1xyXG4gICAgICAgICAgICBjb25zdCBsc1F1ZXVlID0gTG9jYWxTdG9yYWdlUXVldWUuY3JlYXRlKGNvbmZpZy5pZCwgY29uZmlnLm5hbWUsIGNvbmZpZy5yZXNldCk7XHJcbiAgICAgICAgICAgIGlmIChsc1F1ZXVlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9sb2dnZXIubG9nKGBDcmVhdGVkIExvY2FsIFN0b3JhZ2UgcXVldWUgZm9yIGlkICR7Y29uZmlnLmlkfWApO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGxzUXVldWU7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBJbmRleGVkREJRdWV1ZS5jcmVhdGUoY29uZmlnLmlkLCBjb25maWcubmFtZSwgY29uZmlnLnJlc2V0KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbigocXVldWUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fbG9nZ2VyLmxvZyhgQ3JlYXRlZCBwZXJzaXN0ZW50IHF1ZXVlIGZvciBpZCAke2NvbmZpZy5pZH1gKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHF1ZXVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuY2F0Y2goKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9sb2dnZXIubG9nKGBEb3duZ3JhZGVkIHRvIG1lbW9yeSBxdWV1ZSBmb3IgaWQgJHtjb25maWcuaWR9LmApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IE1lbW9yeVF1ZXVlKGNvbmZpZy5pZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fbG9nZ2VyLmxvZyhgQ3JlYXRlZCBtZW1vcnkgcXVldWUgZm9yIGlkICR7Y29uZmlnLmlkfWApO1xyXG4gICAgICAgIHJldHVybiBuZXcgTWVtb3J5UXVldWUoY29uZmlnLmlkKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGVuZHBvaW50KGNvbmZpZzogSUVuZHBvaW50Q29uZmlnKTogSUVuZHBvaW50IHtcclxuICAgICAgICBjb25zdCBjb25maWd1cmF0aW9uID0gY29uZmlnIGFzIGFueTtcclxuXHJcbiAgICAgICAgaWYgKGNvbmZpZy50eXBlICE9PSAnZmUtYW5hbHl0aWMtY29sbGVjdG9yJykge1xyXG4gICAgICAgICAgICB0aGlzLl9sb2dnZXIuZXJyb3IoYEVuZHBvaW50IHR5cGUgJyR7Y29uZmlnLnR5cGV9JyBpcyBub3Qgc3VwcG9ydGVkYCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gbmV3IEZFQW5hbHl0aWNzQ29sbGVjdG9yRW5kcG9pbnQodGhpcy5hamF4KCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBUaW1lU3RhbXBQcm92aWRlcigpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9sb2dnZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbmZpZ3VyYXRpb24gYXMgSUZFQW5hbHl0aWNzQ29sbGVjdG9yQ29uZmlndXJhdGlvbixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fZW52aXJvbm1lbnQpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgYWpheCgpOiBJQWpheFByb3ZpZGVyIHtcclxuICAgICAgICBpZiAodGhpcy5fZW52aXJvbm1lbnQuZmFrZU1vZGUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQb3J0QWpheFByb3ZpZGVyKHRoaXMuX2NvbnRleHQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbmV3IEFqYXgoKTtcclxuICAgIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvaWZkZWYtbG9hZGVyL2lmZGVmLWxvYWRlci5qcz9ERUJVRz10cnVlJlBFUkZPUk1BTkNFX0FVRElUPXRydWUhLi9zcmMvcHJvY2Vzc2luZy9idWlsZGVycy9idXMtYnVpbGRlci50cyIsImV4cG9ydCAqIGZyb20gJy4vbWVtb3J5LXF1ZXVlJztcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL2lmZGVmLWxvYWRlci9pZmRlZi1sb2FkZXIuanM/REVCVUc9dHJ1ZSZQRVJGT1JNQU5DRV9BVURJVD10cnVlIS4vc3JjL3F1ZXVlcy9tZW1vcnkvaW5kZXgudHMiLCJpbXBvcnQgeyBJRW52ZWxvcCB9IGZyb20gJy4uLy4uL3Byb2Nlc3NpbmcvZW52ZWxvcCc7XHJcbmltcG9ydCB7IElRdWV1ZSB9IGZyb20gJy4uL3F1ZXVlJztcclxuXHJcbi8qKlxyXG4gKiBJbXBsZW1lbnRhdGlvbiBvZiBxdWV1ZSBmb3Igc3RvcmluZyBpdGVtcyBpbiBhIG1lbW9yeVxyXG4gKlxyXG4gKiBAaW50ZXJuYWxcclxuICovXHJcbmV4cG9ydCBjbGFzcyBNZW1vcnlRdWV1ZSBpbXBsZW1lbnRzIElRdWV1ZSB7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9hcnJheTogQXJyYXk8SUVudmVsb3A+ID0gW107XHJcblxyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IGlkOiBzdHJpbmdcclxuICAgICkgeyB9XHJcblxyXG4gICAgcHVibGljIGdldCBjb3VudCgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9hcnJheS5sZW5ndGg7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGVucXVldWUoaXRlbXM6IEFycmF5PElFbnZlbG9wPik6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX2FycmF5LnB1c2goLi4uaXRlbXMpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhc3luYyBjbGVhcigpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICB0aGlzLl9hcnJheS5sZW5ndGggPSAwO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBkZXF1ZXVlKGNvdW50OiBudW1iZXIpOiBBcnJheTxJRW52ZWxvcD4ge1xyXG4gICAgICAgIGNvbnN0IGxlbmd0aCA9IHRoaXMuX2FycmF5Lmxlbmd0aDtcclxuXHJcbiAgICAgICAgY291bnQgPSBNYXRoLm1pbihsZW5ndGgsIE1hdGgubWF4KGNvdW50LCAwKSk7XHJcblxyXG4gICAgICAgIGlmIChjb3VudCA8PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBbXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLl9hcnJheS5zcGxpY2UoMCwgY291bnQpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhc3luYyBkZXN0cm95KCk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgIHRoaXMuY2xlYXIoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZGlzcG9zZSgpOiB2b2lkIHsgLyoqLyB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL2lmZGVmLWxvYWRlci9pZmRlZi1sb2FkZXIuanM/REVCVUc9dHJ1ZSZQRVJGT1JNQU5DRV9BVURJVD10cnVlIS4vc3JjL3F1ZXVlcy9tZW1vcnkvbWVtb3J5LXF1ZXVlLnRzIiwiaW1wb3J0IHsgb3ZlcnJpZGUgfSBmcm9tICcuLi9mcmFtZXdvcmsvdXRpbHMnO1xyXG5pbXBvcnQgeyBJRW52ZWxvcCB9IGZyb20gJy4uL3Byb2Nlc3NpbmcvZW52ZWxvcCc7XHJcbmltcG9ydCB7IElTYW1wbGVkUXVldWUgfSBmcm9tICcuL2luZGV4JztcclxuaW1wb3J0IHsgSVF1ZXVlIH0gZnJvbSAnLi9xdWV1ZSc7XHJcblxyXG4vKipcclxuICpcclxuICpcclxuICogQGludGVyZmFjZSBJU2FtcGxlZFF1ZXVlQ29uZmlndXJhdGlvblxyXG4gKi9cclxuZXhwb3J0IGludGVyZmFjZSBJU2FtcGxlZFF1ZXVlQ29uZmlndXJhdGlvbiB7XHJcbiAgICBtYXhNZXNzYWdlQ291bnQ/OiBudW1iZXI7XHJcbn1cclxuXHJcbmNsYXNzIFNhbXBsZWRRdWV1ZUNvbmZpZ3VyYXRpb24gaW1wbGVtZW50cyBJU2FtcGxlZFF1ZXVlQ29uZmlndXJhdGlvbiB7XHJcbiAgICBwdWJsaWMgbWF4TWVzc2FnZUNvdW50OiBudW1iZXIgPSAxNTAwMDtcclxufVxyXG5cclxuLyoqXHJcbiAqIFF1ZXVlIGRlY29yYXRvciBmb3IgcHJvdmlkaW5nIHNhbXBsaW5nIG9mIG1lc3NhZ2VzXHJcbiAqXHJcbiAqIEBpbnRlcm5hbFxyXG4gKiBAY2xhc3MgU2FtcGxlZFF1ZXVlXHJcbiAqIEBpbXBsZW1lbnRzIHtJUXVldWU8VEl0ZW0+fVxyXG4gKiBAdGVtcGxhdGUgVEl0ZW1cclxuICovXHJcbmV4cG9ydCBjbGFzcyBTYW1wbGVkUXVldWUgaW1wbGVtZW50cyBJU2FtcGxlZFF1ZXVlIHtcclxuICAgIHB1YmxpYyBjb25maWc6IFNhbXBsZWRRdWV1ZUNvbmZpZ3VyYXRpb24gPSBuZXcgU2FtcGxlZFF1ZXVlQ29uZmlndXJhdGlvbigpO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBxdWV1ZTogSVF1ZXVlLFxyXG4gICAgICAgIGNvbmZpZzogSVNhbXBsZWRRdWV1ZUNvbmZpZ3VyYXRpb24gfCBudWxsID0gbnVsbFxyXG4gICAgKSB7XHJcbiAgICAgICAgb3ZlcnJpZGUodGhpcy5jb25maWcsIGNvbmZpZyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBpZCgpOiBzdHJpbmcgeyByZXR1cm4gdGhpcy5xdWV1ZS5pZDsgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgY291bnQoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMucXVldWUuY291bnQ7IH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IHNpemUoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuY29uZmlnLm1heE1lc3NhZ2VDb3VudDsgfVxyXG5cclxuICAgIHB1YmxpYyBlbnF1ZXVlKG1lc3NhZ2VzOiBJRW52ZWxvcFtdKTogdm9pZCB8IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgIGNvbnN0IGZyZWVDb3VudCA9IHRoaXMuc2l6ZSAtIHRoaXMucXVldWUuY291bnQ7XHJcblxyXG4gICAgICAgIGlmIChmcmVlQ291bnQgPD0gMCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoZnJlZUNvdW50IDwgbWVzc2FnZXMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIG1lc3NhZ2VzID0gbWVzc2FnZXMuc2xpY2UoMCwgZnJlZUNvdW50KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLnF1ZXVlLmVucXVldWUobWVzc2FnZXMpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBkZXF1ZXVlKGNvdW50OiBudW1iZXIsIGF2b2lkQ29uY3VycmVuY3k/OiBib29sZWFuKTogQXJyYXk8SUVudmVsb3A+IHwgUHJvbWlzZTxBcnJheTxJRW52ZWxvcD4+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5xdWV1ZS5kZXF1ZXVlKGNvdW50LCBhdm9pZENvbmN1cnJlbmN5KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZGVzdHJveSgpOiB2b2lkIHwgUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucXVldWUuZGVzdHJveSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBkaXNwb3NlKCk6IHZvaWQge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnF1ZXVlLmRpc3Bvc2UoKTtcclxuICAgIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvaWZkZWYtbG9hZGVyL2lmZGVmLWxvYWRlci5qcz9ERUJVRz10cnVlJlBFUkZPUk1BTkNFX0FVRElUPXRydWUhLi9zcmMvcXVldWVzL3NhbXBsZWQtcXVldWUudHMiLCJpbXBvcnQgeyBJbmRleGVkRGJVdGlscyB9IGZyb20gJy4uLy4uL2ZyYW1ld29yay9pbmRleGVkZGItdXRpbHMnO1xyXG5pbXBvcnQgeyBJRW52ZWxvcCB9IGZyb20gJy4uLy4uL3Byb2Nlc3NpbmcvZW52ZWxvcCc7XHJcbmltcG9ydCB7IElRdWV1ZSB9IGZyb20gJy4uL3F1ZXVlJztcclxuXHJcbi8qKlxyXG4gKiBJbXBsZW1lbnRhdGlvbiBvZiBxdWV1ZSBmb3Igc3RvcmluZyBpdGVtcyBpbiBhIG1lbW9yeVxyXG4gKlxyXG4gKiBAaW50ZXJuYWxcclxuICovXHJcbmV4cG9ydCBjbGFzcyBJbmRleGVkREJRdWV1ZSBpbXBsZW1lbnRzIElRdWV1ZSB7XHJcbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IHN0b3JhZ2VOYW1lID0gJ21lc3NhZ2VzJztcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGFzeW5jIGNyZWF0ZShpZDogc3RyaW5nLCBuYW1lPzogc3RyaW5nLCBjbGVhcj86IGJvb2xlYW4pOiBQcm9taXNlPEluZGV4ZWREQlF1ZXVlPiB7XHJcbiAgICAgICAgY29uc3QgZGJOYW1lID0gJ21janM6JyArIChuYW1lIHx8IGlkKTtcclxuXHJcbiAgICAgICAgY29uc3QgZGF0YWJhc2UgPSBhd2FpdCBJbmRleGVkRGJVdGlscy5vcGVuKGRiTmFtZSwgMSwgKGRiKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICghZGIub2JqZWN0U3RvcmVOYW1lcy5jb250YWlucyhJbmRleGVkREJRdWV1ZS5zdG9yYWdlTmFtZSkpIHtcclxuICAgICAgICAgICAgICAgIGRiLmNyZWF0ZU9iamVjdFN0b3JlKEluZGV4ZWREQlF1ZXVlLnN0b3JhZ2VOYW1lLCB7IGF1dG9JbmNyZW1lbnQ6IHRydWUgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgY29uc3QgcXVldWUgPSBuZXcgSW5kZXhlZERCUXVldWUoaWQsIGRhdGFiYXNlKTtcclxuXHJcbiAgICAgICAgaWYgKGNsZWFyKSB7XHJcbiAgICAgICAgICAgIGF3YWl0IHF1ZXVlLmNsZWFyKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gcXVldWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfbGFzdENvdW50OiBudW1iZXIgPSAwO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBpZDogc3RyaW5nLFxyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgX2RiOiBJREJEYXRhYmFzZVxyXG4gICAgKSB7IH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGNvdW50KCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2xhc3RDb3VudDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZW5xdWV1ZShpdGVtczogQXJyYXk8SUVudmVsb3A+KTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudHJhbnNhY3Rpb24oKHN0b3JhZ2UpID0+IHtcclxuICAgICAgICAgICAgSW5kZXhlZERiVXRpbHMuYWRkQXJyYXkoc3RvcmFnZSwgaXRlbXMsICgpID0+IHRoaXMudXBkYXRlQ291bnQoc3RvcmFnZSkpO1xyXG4gICAgICAgIH0sIHVuZGVmaW5lZCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGRlcXVldWUoY291bnQ6IG51bWJlcik6IFByb21pc2U8QXJyYXk8SUVudmVsb3A+PiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudHJhbnNhY3Rpb24oKHN0b3JhZ2UsIHJlc3VsdCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgY291bnRlciA9IDA7XHJcblxyXG4gICAgICAgICAgICBJbmRleGVkRGJVdGlscy5yZXF1ZXN0PElEQkN1cnNvcldpdGhWYWx1ZT4oc3RvcmFnZS5vcGVuQ3Vyc29yKCksIChjdXJzb3IpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChjdXJzb3IgJiYgKGNvdW50ZXIgPCBjb3VudCkpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHQucHVzaChjdXJzb3IudmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGN1cnNvci5kZWxldGUoKTtcclxuICAgICAgICAgICAgICAgICAgICBjb3VudGVyKys7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGN1cnNvci5jb250aW51ZSgpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZUNvdW50KHN0b3JhZ2UpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9LCBuZXcgQXJyYXk8SUVudmVsb3A+KCkpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBkZXN0cm95KCk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgIHRoaXMuZGlzcG9zZSgpO1xyXG4gICAgICAgIHJldHVybiBJbmRleGVkRGJVdGlscy5yZW1vdmUodGhpcy5fZGIubmFtZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGRpc3Bvc2UoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fZGIuY2xvc2UoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xlYXIoKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudHJhbnNhY3Rpb24oKHN0b3JhZ2UpID0+IHtcclxuICAgICAgICAgICAgc3RvcmFnZS5jbGVhcigpO1xyXG4gICAgICAgIH0sIHVuZGVmaW5lZCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB1cGRhdGVDb3VudChzdG9yYWdlOiBJREJPYmplY3RTdG9yZSk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IGNvdW50UmVxdWVzdCA9IHN0b3JhZ2UuY291bnQoKTtcclxuICAgICAgICBjb3VudFJlcXVlc3Qub25zdWNjZXNzID0gKGUpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5fbGFzdENvdW50ID0gKyhlLnRhcmdldCBhcyBhbnkpLnJlc3VsdDtcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb3Blbihtb2RlOiBJREJUcmFuc2FjdGlvbk1vZGUgPSAncmVhZHdyaXRlJyk6IElEQk9iamVjdFN0b3JlIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZGIudHJhbnNhY3Rpb24oW0luZGV4ZWREQlF1ZXVlLnN0b3JhZ2VOYW1lXSwgbW9kZSkub2JqZWN0U3RvcmUoSW5kZXhlZERCUXVldWUuc3RvcmFnZU5hbWUpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgdHJhbnNhY3Rpb248VD4oYWN0aW9uOiAoc3RvcmFnZTogSURCT2JqZWN0U3RvcmUsIHJlc3VsdDogVCkgPT4gdm9pZCwgcmVzdWx0OiBUKTogUHJvbWlzZTxUPiB7XHJcbiAgICAgICAgcmV0dXJuIEluZGV4ZWREYlV0aWxzLnRyYW5zYWN0aW9uKCgpID0+IHRoaXMub3BlbigpLCBhY3Rpb24sIHJlc3VsdCk7XHJcbiAgICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL2lmZGVmLWxvYWRlci9pZmRlZi1sb2FkZXIuanM/REVCVUc9dHJ1ZSZQRVJGT1JNQU5DRV9BVURJVD10cnVlIS4vc3JjL3F1ZXVlcy9pbmRleGVkZGIvaW5kZXhlZGRiLXF1ZXVlLnRzIiwiZXhwb3J0IGFic3RyYWN0IGNsYXNzIEluZGV4ZWREQlByb3ZpZGVyIHtcclxuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldEluZGV4ZWREQigpOiBJREJGYWN0b3J5IHwgdW5kZWZpbmVkIHtcclxuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cclxuICAgICAgICBpZiAodHlwZW9mIGluZGV4ZWREQiAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGluZGV4ZWREQjtcclxuICAgICAgICB9XHJcbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXHJcbiAgICAgICAgaWYgKHR5cGVvZiBtb3pJbmRleGVkREIgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBtb3pJbmRleGVkREI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xyXG4gICAgICAgIGlmICh0eXBlb2Ygd2Via2l0SW5kZXhlZERCICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgICByZXR1cm4gd2Via2l0SW5kZXhlZERCO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cclxuICAgICAgICBpZiAodHlwZW9mIG1zSW5kZXhlZERCICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgICByZXR1cm4gbXNJbmRleGVkREI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgaXNTdXBwb3J0ZWQoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuICEhSW5kZXhlZERCUHJvdmlkZXIuZ2V0SW5kZXhlZERCKCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmRlY2xhcmUgY29uc3QgbW96SW5kZXhlZERCOiBJREJGYWN0b3J5O1xyXG5kZWNsYXJlIGNvbnN0IHdlYmtpdEluZGV4ZWREQjogSURCRmFjdG9yeTtcclxuZGVjbGFyZSBjb25zdCBtc0luZGV4ZWREQjogSURCRmFjdG9yeTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL2lmZGVmLWxvYWRlci9pZmRlZi1sb2FkZXIuanM/REVCVUc9dHJ1ZSZQRVJGT1JNQU5DRV9BVURJVD10cnVlIS4vc3JjL2ZyYW1ld29yay9pbmRleGVkZGItcHJvdmlkZXIudHMiLCJpbXBvcnQgeyBXZWJTdG9yYWdlcyB9IGZyb20gJy4uLy4uL2ZyYW1ld29yay93ZWJzdG9yYWdlJztcclxuaW1wb3J0IHsgSUVudmVsb3AgfSBmcm9tICcuLi8uLi9wcm9jZXNzaW5nL2VudmVsb3AnO1xyXG5pbXBvcnQgeyBNZW1vcnlRdWV1ZSB9IGZyb20gJy4uL2luZGV4JztcclxuaW1wb3J0IHsgSVF1ZXVlIH0gZnJvbSAnLi4vcXVldWUnO1xyXG5pbXBvcnQgeyBJS2V5VmFsdWVTdG9yYWdlLCBMb2NhbFN0b3JhZ2VLZXlWYWx1ZSB9IGZyb20gJy4vbG9jYWwtc3RvcmFnZS1rZXktdmFsdWUnO1xyXG5pbXBvcnQgeyBMb2NhbFN0b3JhZ2VLZXlWYWx1ZUNhY2hlIH0gZnJvbSAnLi9sb2NhbC1zdG9yYWdlLWtleS12YWx1ZS1jYWNoZSc7XHJcblxyXG4vKipcclxuICogSW1wbGVtZW50YXRpb24gb2YgcXVldWUgZm9yIHN0b3JpbmcgaXRlbXMgaW4gYSBMb2NhbFN0b3JhZ2VcclxuICpcclxuICogQGludGVybmFsXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgTG9jYWxTdG9yYWdlUXVldWUgaW1wbGVtZW50cyBJUXVldWUge1xyXG4gICAgcHVibGljIHN0YXRpYyBjcmVhdGUoaWQ6IHN0cmluZywgbmFtZT86IHN0cmluZywgY2xlYXI6IGJvb2xlYW4gPSBmYWxzZSk6IExvY2FsU3RvcmFnZVF1ZXVlIHwgbnVsbCB7XHJcbiAgICAgICAgY29uc3QgbG9jYWxTdG9yYWdlID0gV2ViU3RvcmFnZXMubG9jYWxTdG9yYWdlO1xyXG4gICAgICAgIGlmICghbG9jYWxTdG9yYWdlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3Qgc3RvcmFnZSA9IG5ldyBMb2NhbFN0b3JhZ2VLZXlWYWx1ZSgobmFtZSB8fCBpZCkgKyAnJywgbG9jYWxTdG9yYWdlKTtcclxuICAgICAgICBjb25zdCBjYWNoZSA9IG5ldyBMb2NhbFN0b3JhZ2VLZXlWYWx1ZUNhY2hlKHN0b3JhZ2UpO1xyXG5cclxuICAgICAgICBpZiAoY2xlYXIpIHtcclxuICAgICAgICAgICAgc3RvcmFnZS5jbGVhcigpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIG5ldyBMb2NhbFN0b3JhZ2VRdWV1ZShpZCwgY2FjaGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcmVhZG9ubHkgX21lbW9yeTogTWVtb3J5UXVldWU7XHJcblxyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IGlkOiBzdHJpbmcsXHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBfc3RvcmFnZTogSUtleVZhbHVlU3RvcmFnZVxyXG4gICAgKSB7XHJcbiAgICAgICAgdGhpcy5fbWVtb3J5ID0gbmV3IE1lbW9yeVF1ZXVlKGlkKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGNvdW50KCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX21lbW9yeS5jb3VudCArIHRoaXMuX3N0b3JhZ2UubGVuZ3RoKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGVucXVldWUoaXRlbXM6IEFycmF5PElFbnZlbG9wPik6IHZvaWQge1xyXG4gICAgICAgIGZvciAoY29uc3QgaXRlbSBvZiBpdGVtcykge1xyXG4gICAgICAgICAgICBjb25zdCBrZXkgPSBpdGVtLmlkO1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuX3N0b3JhZ2Uuc2V0SXRlbShrZXksIGl0ZW0pKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9tZW1vcnkuZW5xdWV1ZShbaXRlbV0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbGVhcigpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9zdG9yYWdlLmNsZWFyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGRlcXVldWUoY291bnQ6IG51bWJlciwgYXZvaWRDb25jdXJyZW5jeTogYm9vbGVhbik6IEFycmF5PElFbnZlbG9wPiB7XHJcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gdGhpcy5fbWVtb3J5LmRlcXVldWUoY291bnQpO1xyXG5cclxuICAgICAgICBpZiAocmVzdWx0Lmxlbmd0aCA+PSBjb3VudCkge1xyXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNvdW50ID0gY291bnQgLSByZXN1bHQubGVuZ3RoO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCFhdm9pZENvbmN1cnJlbmN5KSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHN0b3JhZ2UgPSB0aGlzLl9zdG9yYWdlO1xyXG4gICAgICAgICAgICBjb25zdCBkZXF1ZXVlZEtleXMgPSBuZXcgQXJyYXk8c3RyaW5nPigpO1xyXG4gICAgICAgICAgICBsZXQgY291bnRlciA9IDA7XHJcbiAgICAgICAgICAgIGZvciAoY29uc3QgaXRlbSBvZiBzdG9yYWdlLmVudW1lcmF0ZSgpKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB2YWx1ZSA9IGl0ZW0udmFsdWUgYXMgSUVudmVsb3A7XHJcbiAgICAgICAgICAgICAgICBpZiAodmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHQucHVzaCh2YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVxdWV1ZWRLZXlzLnB1c2goaXRlbS5rZXkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvdW50ZXIrKztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChjb3VudGVyID49IGNvdW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZm9yIChjb25zdCBrZXkgb2YgZGVxdWV1ZWRLZXlzKSB7XHJcbiAgICAgICAgICAgICAgICBzdG9yYWdlLnJlbW92ZUl0ZW0oa2V5KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZGVzdHJveSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmRpc3Bvc2UoKTtcclxuICAgICAgICB0aGlzLmNsZWFyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGRpc3Bvc2UoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fbWVtb3J5LmRpc3Bvc2UoKTtcclxuICAgIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvaWZkZWYtbG9hZGVyL2lmZGVmLWxvYWRlci5qcz9ERUJVRz10cnVlJlBFUkZPUk1BTkNFX0FVRElUPXRydWUhLi9zcmMvcXVldWVzL2xvY2FsLXN0b3JhZ2UvbG9jYWwtc3RvcmFnZS1xdWV1ZS50cyIsImltcG9ydCB7IFN0b3JhZ2VLZXkgfSBmcm9tICcuL3N0b3JhZ2Uta2V5JztcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUtleVZhbHVlU3RvcmFnZSB7XHJcbiAgICBsZW5ndGgoKTogbnVtYmVyO1xyXG5cclxuICAgIGNsZWFyKCk6IHZvaWQ7XHJcblxyXG4gICAgaGFzKGtleTogc3RyaW5nKTogYm9vbGVhbjtcclxuXHJcbiAgICBnZXRJdGVtKGtleTogc3RyaW5nKTogb2JqZWN0IHwgbnVsbDtcclxuXHJcbiAgICByZW1vdmVJdGVtKGtleTogc3RyaW5nKTogdm9pZDtcclxuXHJcbiAgICBzZXRJdGVtKGtleTogc3RyaW5nLCBkYXRhOiBvYmplY3QpOiBib29sZWFuO1xyXG5cclxuICAgIGVudW1lcmF0ZSgpOiBJdGVyYWJsZUl0ZXJhdG9yPElTdG9yYWdlSXRlbT47XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSVN0b3JhZ2VJdGVtIHtcclxuICAgIHJlYWRvbmx5IGtleTogc3RyaW5nO1xyXG5cclxuICAgIHJlYWRvbmx5IHZhbHVlOiBvYmplY3QgfCBudWxsO1xyXG59XHJcblxyXG4vKipcclxuICogS2V5LVZhbHVlIHN0b3JhZ2UgYmFzZWQgb24gU3RvcmFnZSBhbmQgaW1wbGVtZW50ZWQgbG93IGxldmVsIG9wZXJhdGlvbnNcclxuICovXHJcbmV4cG9ydCBjbGFzcyBMb2NhbFN0b3JhZ2VLZXlWYWx1ZSBpbXBsZW1lbnRzIElLZXlWYWx1ZVN0b3JhZ2Uge1xyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IHF1ZXVlSWQ6IHN0cmluZyxcclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IF9zdG9yYWdlOiBTdG9yYWdlXHJcbiAgICApIHsgfVxyXG5cclxuICAgIHB1YmxpYyBsZW5ndGgoKTogbnVtYmVyIHtcclxuICAgICAgICBsZXQgY291bnRlciA9IDA7XHJcbiAgICAgICAgY29uc3Qga2V5cyA9IHRoaXMua2V5cygpO1xyXG4gICAgICAgIHdoaWxlICgha2V5cy5uZXh0KCkuZG9uZSkge1xyXG4gICAgICAgICAgICBjb3VudGVyKys7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBjb3VudGVyO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbGVhcigpOiB2b2lkIHtcclxuICAgICAgICBmb3IgKGNvbnN0IGtleSBvZiB0aGlzLmtleXMoKSkge1xyXG4gICAgICAgICAgICB0aGlzLl9zdG9yYWdlLnJlbW92ZUl0ZW0oa2V5LnZhbHVlKCkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaGFzKGtleTogc3RyaW5nKTogYm9vbGVhbiB7XHJcbiAgICAgICAgY29uc3Qgc0tleSA9IG5ldyBTdG9yYWdlS2V5KHRoaXMucXVldWVJZCwga2V5KS52YWx1ZSgpO1xyXG4gICAgICAgIHJldHVybiAhIXRoaXMuX3N0b3JhZ2UuZ2V0SXRlbShzS2V5KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0SXRlbShrZXk6IHN0cmluZyk6IG9iamVjdCB8IG51bGwge1xyXG4gICAgICAgIGNvbnN0IHNLZXkgPSBuZXcgU3RvcmFnZUtleSh0aGlzLnF1ZXVlSWQsIGtleSkudmFsdWUoKTtcclxuICAgICAgICBjb25zdCB2YWx1ZSA9IHRoaXMuX3N0b3JhZ2UuZ2V0SXRlbShzS2V5KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMudG9PYmplY3QodmFsdWUsIHNLZXkpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZW1vdmVJdGVtKGtleTogc3RyaW5nKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3Qgc0tleSA9IG5ldyBTdG9yYWdlS2V5KHRoaXMucXVldWVJZCwga2V5KS52YWx1ZSgpO1xyXG4gICAgICAgIHRoaXMuX3N0b3JhZ2UucmVtb3ZlSXRlbShzS2V5KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0SXRlbShrZXk6IHN0cmluZywgZGF0YTogb2JqZWN0KTogYm9vbGVhbiB7XHJcbiAgICAgICAgY29uc3Qgc0tleSA9IG5ldyBTdG9yYWdlS2V5KHRoaXMucXVldWVJZCwga2V5KS52YWx1ZSgpO1xyXG4gICAgICAgIGNvbnN0IHZhbHVlID0gSlNPTi5zdHJpbmdpZnkoZGF0YSk7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgdGhpcy5fc3RvcmFnZS5zZXRJdGVtKHNLZXksIHZhbHVlKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfSBjYXRjaCB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljKiBlbnVtZXJhdGUoKTogSXRlcmFibGVJdGVyYXRvcjxJU3RvcmFnZUl0ZW0+IHtcclxuICAgICAgICBmb3IgKGNvbnN0IGtleSBvZiB0aGlzLmtleXMoKSkge1xyXG4gICAgICAgICAgICBjb25zdCBzS2V5ID0ga2V5LnZhbHVlKCk7XHJcbiAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gdGhpcy50b09iamVjdCh0aGlzLl9zdG9yYWdlLmdldEl0ZW0oc0tleSksIHNLZXkpO1xyXG4gICAgICAgICAgICBpZiAodmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIHlpZWxkIHsgdmFsdWUsIGtleToga2V5LmtleSB9O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgdG9PYmplY3QodmFsdWU6IHN0cmluZyB8IG51bGwsIHNLZXk6IHN0cmluZyk6IG9iamVjdCB8IG51bGwge1xyXG4gICAgICAgIGlmICghdmFsdWUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICByZXR1cm4gSlNPTi5wYXJzZSh2YWx1ZSk7XHJcbiAgICAgICAgfSBjYXRjaCB7XHJcbiAgICAgICAgICAgIHRoaXMuX3N0b3JhZ2UucmVtb3ZlSXRlbShzS2V5KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSoga2V5cygpOiBJdGVyYWJsZUl0ZXJhdG9yPFN0b3JhZ2VLZXk+IHtcclxuICAgICAgICBjb25zdCBzdG9yYWdlID0gdGhpcy5fc3RvcmFnZTtcclxuXHJcbiAgICAgICAgY29uc3QgbWFwID0gbmV3IE1hcDxzdHJpbmcsIGFueT4oKTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IHN0b3JhZ2UubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcclxuICAgICAgICAgICAgaWYgKGkgPj0gc3RvcmFnZS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIGkgPSBzdG9yYWdlLmxlbmd0aCAtIDE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29uc3Qga2V5ID0gc3RvcmFnZS5rZXkoaSk7XHJcbiAgICAgICAgICAgIGlmIChrZXkpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHNLZXkgPSBTdG9yYWdlS2V5LnBhcnNlKGtleSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoc0tleSAmJiBzS2V5LnF1ZXVlID09PSB0aGlzLnF1ZXVlSWQgJiYgIW1hcC5oYXMoa2V5KSkge1xyXG4gICAgICAgICAgICAgICAgICAgIG1hcC5zZXQoa2V5LCB1bmRlZmluZWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIHlpZWxkIHNLZXk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG1hcC5jbGVhcigpO1xyXG4gICAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy9pZmRlZi1sb2FkZXIvaWZkZWYtbG9hZGVyLmpzP0RFQlVHPXRydWUmUEVSRk9STUFOQ0VfQVVESVQ9dHJ1ZSEuL3NyYy9xdWV1ZXMvbG9jYWwtc3RvcmFnZS9sb2NhbC1zdG9yYWdlLWtleS12YWx1ZS50cyIsImV4cG9ydCBjbGFzcyBTdG9yYWdlS2V5IHtcclxuICAgIHB1YmxpYyBzdGF0aWMgcGFyc2UodmFsdWU6IHN0cmluZyk6IFN0b3JhZ2VLZXkgfCBudWxsIHtcclxuICAgICAgICBpZiAodmFsdWUgJiYgKHZhbHVlLmluZGV4T2YoU3RvcmFnZUtleS5wcmVmaXgsIDApID09PSAwKSkge1xyXG4gICAgICAgICAgICBjb25zdCBxdWV1ZU1hdGggPSBTdG9yYWdlS2V5LnJlZ2V4LnF1ZXVlLmV4ZWModmFsdWUpO1xyXG4gICAgICAgICAgICBjb25zdCBrZXlNYXRoID0gU3RvcmFnZUtleS5yZWdleC5rZXkuZXhlYyh2YWx1ZSk7XHJcbiAgICAgICAgICAgIGlmIChxdWV1ZU1hdGggJiYga2V5TWF0aCkge1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgc0tleSA9IG5ldyBTdG9yYWdlS2V5KHF1ZXVlTWF0aFsxXSwga2V5TWF0aFsxXSk7XHJcbiAgICAgICAgICAgICAgICBzS2V5Ll9rZXkgPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBzS2V5O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIHByZWZpeCA9ICdtY2pzJztcclxuICAgIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IHJlZ2V4ID0ge1xyXG4gICAgICAgIHF1ZXVlOiAvcT0oW1xcdy1dKykvLFxyXG4gICAgICAgIGtleTogL2s9KFtcXHctXSspL1xyXG4gICAgfTtcclxuXHJcbiAgICBwcml2YXRlIF9rZXk6IHN0cmluZztcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgcXVldWU6IHN0cmluZyxcclxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkga2V5OiBzdHJpbmdcclxuICAgICkgeyB9XHJcblxyXG4gICAgcHVibGljIHZhbHVlKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2tleSB8fCAodGhpcy5fa2V5ID0gYCR7U3RvcmFnZUtleS5wcmVmaXh9P3E9JHtlbmNvZGVVUklDb21wb25lbnQodGhpcy5xdWV1ZSl9Jms9JHtlbmNvZGVVUklDb21wb25lbnQodGhpcy5rZXkpfWApO1xyXG4gICAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy9pZmRlZi1sb2FkZXIvaWZkZWYtbG9hZGVyLmpzP0RFQlVHPXRydWUmUEVSRk9STUFOQ0VfQVVESVQ9dHJ1ZSEuL3NyYy9xdWV1ZXMvbG9jYWwtc3RvcmFnZS9zdG9yYWdlLWtleS50cyIsImltcG9ydCB7IElLZXlWYWx1ZVN0b3JhZ2UsIElTdG9yYWdlSXRlbSB9IGZyb20gJy4vbG9jYWwtc3RvcmFnZS1rZXktdmFsdWUnO1xyXG5cclxuZXhwb3J0IGNsYXNzIExvY2FsU3RvcmFnZUtleVZhbHVlQ2FjaGUgaW1wbGVtZW50cyBJS2V5VmFsdWVTdG9yYWdlIHtcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgX2NhY2hlID0gbmV3IE1hcDxzdHJpbmcsIG9iamVjdCB8IG51bGwgfCB1bmRlZmluZWQ+KCk7XHJcbiAgICBwcml2YXRlIF9sZW5ndGggPSAwO1xyXG4gICAgcHJpdmF0ZSBfdXBkYXRlTGVuZ3RoID0gdHJ1ZTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IF9zdG9yYWdlOiBJS2V5VmFsdWVTdG9yYWdlXHJcbiAgICApIHsgfVxyXG5cclxuICAgIHB1YmxpYyBsZW5ndGgoKTogbnVtYmVyIHtcclxuICAgICAgICBpZiAodGhpcy5fdXBkYXRlTGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2xlbmd0aCA9IHRoaXMuX3N0b3JhZ2UubGVuZ3RoKCk7XHJcbiAgICAgICAgICAgIHRoaXMuX3VwZGF0ZUxlbmd0aCA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5fbGVuZ3RoO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbGVhcigpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9zdG9yYWdlLmNsZWFyKCk7XHJcbiAgICAgICAgdGhpcy5fY2FjaGUuY2xlYXIoKTtcclxuICAgICAgICB0aGlzLl91cGRhdGVMZW5ndGggPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBoYXMoa2V5OiBzdHJpbmcpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fc3RvcmFnZS5oYXMoa2V5KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0SXRlbShrZXk6IHN0cmluZyk6IG9iamVjdCB8IG51bGwge1xyXG4gICAgICAgIGlmICghdGhpcy5fc3RvcmFnZS5oYXMoa2V5KSkge1xyXG4gICAgICAgICAgICB0aGlzLl9jYWNoZS5kZWxldGUoa2V5KTtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgdmFsdWUgPSB0aGlzLl9jYWNoZS5nZXQoa2V5KTtcclxuICAgICAgICBpZiAoIXZhbHVlKSB7XHJcbiAgICAgICAgICAgIHZhbHVlID0gdGhpcy5fc3RvcmFnZS5nZXRJdGVtKGtleSk7XHJcbiAgICAgICAgICAgIHRoaXMuX2NhY2hlLnNldChrZXksIHZhbHVlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZW1vdmVJdGVtKGtleTogc3RyaW5nKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fc3RvcmFnZS5yZW1vdmVJdGVtKGtleSk7XHJcbiAgICAgICAgdGhpcy5fY2FjaGUuZGVsZXRlKGtleSk7XHJcbiAgICAgICAgdGhpcy5fbGVuZ3RoLS07XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldEl0ZW0oa2V5OiBzdHJpbmcsIGRhdGE6IG9iamVjdCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGNvbnN0IHN1Y2Nlc3MgPSB0aGlzLl9zdG9yYWdlLnNldEl0ZW0oa2V5LCBkYXRhKTtcclxuICAgICAgICBpZiAoc3VjY2Vzcykge1xyXG4gICAgICAgICAgICB0aGlzLl9jYWNoZS5zZXQoa2V5LCBkYXRhKTtcclxuICAgICAgICAgICAgdGhpcy5fdXBkYXRlTGVuZ3RoID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHN1Y2Nlc3M7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljKiBlbnVtZXJhdGUoKTogSXRlcmFibGVJdGVyYXRvcjxJU3RvcmFnZUl0ZW0+IHtcclxuICAgICAgICBmb3IgKGNvbnN0IGtleSBvZiB0aGlzLl9jYWNoZS5rZXlzKCkpIHtcclxuICAgICAgICAgICAgY29uc3QgdmFsdWUgPSB0aGlzLmdldEl0ZW0oa2V5KTtcclxuICAgICAgICAgICAgaWYgKHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICB5aWVsZCB7XHJcbiAgICAgICAgICAgICAgICAgICAga2V5LFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgdGhpcy5fc3RvcmFnZS5lbnVtZXJhdGUoKSkge1xyXG4gICAgICAgICAgICBjb25zdCBrZXkgPSBpdGVtLmtleTtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLl9jYWNoZS5oYXMoa2V5KSkge1xyXG4gICAgICAgICAgICAgICAgeWllbGQgaXRlbTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvaWZkZWYtbG9hZGVyL2lmZGVmLWxvYWRlci5qcz9ERUJVRz10cnVlJlBFUkZPUk1BTkNFX0FVRElUPXRydWUhLi9zcmMvcXVldWVzL2xvY2FsLXN0b3JhZ2UvbG9jYWwtc3RvcmFnZS1rZXktdmFsdWUtY2FjaGUudHMiLCJpbXBvcnQgeyBCYXRjaCB9IGZyb20gJy4uL2JhdGNoJztcclxuaW1wb3J0IHsgSUJhdGNoQXVkaXREYXRhIH0gZnJvbSAnLi9hdWRpdC1kYXRhJztcclxuaW1wb3J0IHsgSVBpcGVTdGF0c1JlcG9zaXRvcnkgfSBmcm9tICcuL3N0YXRzL3BpcGUtc3RhdHMnO1xyXG5cclxuLyoqXHJcbiAqIFByb3ZpZGUgYXVkaXQgaW5mb3JtYXRpb24gZm9yIHBhc3NlZCBiYXRjaFxyXG4gKlxyXG4gKiBAaW50ZXJuYWxcclxuICovXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUJhdGNoQXVkaXRQcm92aWRlciB7XHJcbiAgICBhdWRpdChiYXRjaDogQmF0Y2gsIHJlcG86IElQaXBlU3RhdHNSZXBvc2l0b3J5KTogUHJvbWlzZTxJQmF0Y2hBdWRpdERhdGE+O1xyXG59XHJcblxyXG4vKipcclxuICogQGludGVybmFsXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgQmF0Y2hBdWRpdFByb3ZpZGVyIGltcGxlbWVudHMgSUJhdGNoQXVkaXRQcm92aWRlciB7XHJcbiAgICBwdWJsaWMgYXN5bmMgYXVkaXQoYmF0Y2g6IEJhdGNoLCByZXBvOiBJUGlwZVN0YXRzUmVwb3NpdG9yeSk6IFByb21pc2U8SUJhdGNoQXVkaXREYXRhPiB7XHJcbiAgICAgICAgbGV0IHN0YXQ6IElCYXRjaEF1ZGl0RGF0YSB8IHVuZGVmaW5lZDtcclxuXHJcbiAgICAgICAgYXdhaXQgcmVwby51cGRhdGUoKHBpcGVTdGF0cykgPT4ge1xyXG4gICAgICAgICAgICBzdGF0ID0ge1xyXG4gICAgICAgICAgICAgICAgY2lkOiBwaXBlU3RhdHMuc3RhdGlzdGljLmNsaWVudElkLFxyXG4gICAgICAgICAgICAgICAgcWlkOiBwaXBlU3RhdHMuc3RhdGlzdGljLnF1ZXVlSWQsXHJcbiAgICAgICAgICAgICAgICBiaTogcGlwZVN0YXRzLnN0YXRpc3RpYy5iYXRjaEluZGV4LFxyXG4gICAgICAgICAgICAgICAgdG1jOiBwaXBlU3RhdHMuc3RhdGlzdGljLnRvdGFsTWVzc2FnZUNvdW50LFxyXG4gICAgICAgICAgICAgICAgdHJlYzogcGlwZVN0YXRzLnN0YXRpc3RpYy50b3RhbFJlcXVlc3RFcnJvckNvdW50LFxyXG4gICAgICAgICAgICAgICAgcW1jOiBwaXBlU3RhdHMuc3RhdGUucXVldWVNZXNzYWdlQ291bnQsXHJcbiAgICAgICAgICAgICAgICBxczogcGlwZVN0YXRzLnN0YXRlLnF1ZXVlU2l6ZSxcclxuICAgICAgICAgICAgICAgIHJlYzogcGlwZVN0YXRzLnN0YXRpc3RpYy5yZXF1ZXN0RXJyb3JDb3VudCxcclxuICAgICAgICAgICAgICAgIGJtYzogYmF0Y2guZW52ZWxvcHMubGVuZ3RoLFxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgcGlwZVN0YXRzLnN0YXRpc3RpYy5yZXF1ZXN0RXJyb3JDb3VudCA9IDA7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGlmICghc3RhdCkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1N0YXRpc3RpYyB3YXMgbm90IGZpbGxlZC4nKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBzdGF0O1xyXG4gICAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy9pZmRlZi1sb2FkZXIvaWZkZWYtbG9hZGVyLmpzP0RFQlVHPXRydWUmUEVSRk9STUFOQ0VfQVVESVQ9dHJ1ZSEuL3NyYy9wcm9jZXNzaW5nL2F1ZGl0L2F1ZGl0LXByb3ZpZGVyLnRzIiwiXHJcbmltcG9ydCB7IElRdWV1ZSB9IGZyb20gJy4uLy4uLy4uL3F1ZXVlcy9xdWV1ZSc7XHJcbmltcG9ydCB7IEJhdGNoIH0gZnJvbSAnLi4vLi4vYmF0Y2gnO1xyXG5pbXBvcnQgeyBJQXVkaXRTZW5kZXIgfSBmcm9tICcuLi9zZW5kZXJzL2F1ZGl0LXNlbmRlcic7XHJcbmltcG9ydCB7IEFqYXhSZXF1ZXN0U3RhdHVzUmVzdWx0IH0gZnJvbSAnLi4vc3RhdHMvcGlwZS1zdGF0cyc7XHJcbmltcG9ydCB7IElCYXRjaFBlcmZvcm1hbmNlQXVkaXRvciwgSVBpcGVQZXJmb3JtYW5jZUF1ZGl0b3IgfSBmcm9tICcuL3BpcGUnO1xyXG5cclxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG5pbXBvcnQgeyBJQmF0Y2hBdWRpdCB9IGZyb20gJy4uL2RlZmluaXRpb25zJztcclxuaW1wb3J0IHsgQmF0Y2hSZXBvcnRlciB9IGZyb20gJy4uL3JlcG9ydGVycy9iYXRjaC1yZXBvcnRlcic7XHJcbmltcG9ydCB7IFBlcmZzdGFtcCB9IGZyb20gJy4vcGVyZnN0YW1wJztcclxuLy8vLy8vLy8vL1xyXG5cclxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFBpcGVQZXJmb3JtYW5jZUF1ZGl0b3JCdWlsZGVyIHtcclxuICAgIHB1YmxpYyBzdGF0aWMgY3JlYXRlKHNlbmQ6IGJvb2xlYW4sIHNlbmRlcj86IElBdWRpdFNlbmRlcik6IElQaXBlUGVyZm9ybWFuY2VBdWRpdG9yIHtcclxuICAgICAgICByZXR1cm4gbmV3IFBpcGVQZXJmb3JtYW5jZUF1ZGl0b3Ioc2VuZCA/IHNlbmRlciA6IHVuZGVmaW5lZCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIFBpcGVQZXJmb3JtYW5jZUF1ZGl0b3IgaW1wbGVtZW50cyBJUGlwZVBlcmZvcm1hbmNlQXVkaXRvciB7XHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IF9zZW5kZXI/OiBJQXVkaXRTZW5kZXJcclxuICAgICkgeyB9XHJcblxyXG4gICAgcHVibGljIHN0YXJ0KHF1ZXVlOiBJUXVldWUpIHtcclxuICAgICAgICBpZiAodGhpcy5fc2VuZGVyKSB7XHJcbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQZXJmb3JtYW5jZUJhdGNoQXVkaXRvcih0aGlzLl9zZW5kZXIpO1xyXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gbmV3IER1bW15QXVkaXRvcigpO1xyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBEdW1teUF1ZGl0b3IgaW1wbGVtZW50cyBJQmF0Y2hQZXJmb3JtYW5jZUF1ZGl0b3Ige1xyXG4gICAgcHVibGljIGRlcXVldWVkKGJhY2g6IEJhdGNoKTogdm9pZCB7IC8qKi8gfVxyXG5cclxuICAgIHB1YmxpYyBzZW50KCk6IHZvaWQgeyAvKiovIH1cclxuXHJcbiAgICBwdWJsaWMgY29uZmlybWVkKHJlc3VsdDogQWpheFJlcXVlc3RTdGF0dXNSZXN1bHQpOiB2b2lkIHsgLyoqLyB9XHJcblxyXG4gICAgcHVibGljIGVuZGVkKCk6IHZvaWQgeyAvKiovIH1cclxufVxyXG5cclxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG5jbGFzcyBQZXJmb3JtYW5jZUJhdGNoQXVkaXRvciBpbXBsZW1lbnRzIElCYXRjaFBlcmZvcm1hbmNlQXVkaXRvciB7XHJcbiAgICBwcml2YXRlIF9iYXRjaD86IEJhdGNoO1xyXG5cclxuICAgIHByaXZhdGUgcmVhZG9ubHkgX2F1ZGl0OiBJQmF0Y2hBdWRpdCA9IHtcclxuICAgICAgICBkZXF1ZXVlZEF0OiBuZXcgUGVyZnN0YW1wKClcclxuICAgIH07XHJcblxyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBfc2VuZGVyOiBJQXVkaXRTZW5kZXJcclxuICAgICkgeyB9XHJcblxyXG4gICAgcHVibGljIGRlcXVldWVkKGJhdGNoOiBCYXRjaCkge1xyXG4gICAgICAgIHRoaXMuX2JhdGNoID0gYmF0Y2g7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNlbnQoKSB7XHJcbiAgICAgICAgdGhpcy5fYXVkaXQuc2VudEF0ID0gbmV3IFBlcmZzdGFtcCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjb25maXJtZWQocmVzdWx0OiBBamF4UmVxdWVzdFN0YXR1c1Jlc3VsdCkge1xyXG4gICAgICAgIHRoaXMuX2F1ZGl0LmNvbmZpcm1lZEF0ID0gbmV3IFBlcmZzdGFtcCgpO1xyXG4gICAgICAgIHRoaXMuX2F1ZGl0LnJlc3VsdCA9IHJlc3VsdDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZW5kZWQoKSB7XHJcbiAgICAgICAgdGhpcy5fYXVkaXQuZW5kZWRBdCA9IG5ldyBQZXJmc3RhbXAoKTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuX2JhdGNoKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHJlcG9ydCA9IG5ldyBCYXRjaFJlcG9ydGVyKHRoaXMuX2JhdGNoLCB0aGlzLl9hdWRpdCkucmVwb3J0KCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLl9zZW5kZXIuYmF0Y2gocmVwb3J0KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuLy8vLy8vLy8vL1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvaWZkZWYtbG9hZGVyL2lmZGVmLWxvYWRlci5qcz9ERUJVRz10cnVlJlBFUkZPUk1BTkNFX0FVRElUPXRydWUhLi9zcmMvcHJvY2Vzc2luZy9hdWRpdC9hdWRpdG9ycy9waXBlLXBlcmZvcm1hbmNlLWF1ZGl0b3IudHMiLCJpbXBvcnQgeyBCYXRjaCB9IGZyb20gJy4uLy4uL2JhdGNoJztcclxuaW1wb3J0IHsgSUJhdGNoQXVkaXQsIElCYXRjaFBlcmZvcm1hbmNlUmVwb3J0IH0gZnJvbSAnLi4vZGVmaW5pdGlvbnMnO1xyXG5pbXBvcnQgeyBkdXJhdGlvbiB9IGZyb20gJy4vY2FsYy1tZXRob2RzJztcclxuXHJcbmV4cG9ydCBjbGFzcyBCYXRjaFJlcG9ydGVyIHtcclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgX2JhdGNoOiBCYXRjaCxcclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IF9hdWRpdDogSUJhdGNoQXVkaXQsXHJcbiAgICApIHt9XHJcblxyXG4gICAgcHVibGljIHJlcG9ydCgpOiBJQmF0Y2hQZXJmb3JtYW5jZVJlcG9ydCB7XHJcbiAgICAgICAgY29uc3QgYmF0Y2ggPSB0aGlzLl9iYXRjaDtcclxuICAgICAgICBjb25zdCBhdWRpdCA9IHRoaXMuX2F1ZGl0O1xyXG5cclxuICAgICAgICBpZiAoIWF1ZGl0LmRlcXVldWVkQXQgfHwgIWF1ZGl0LmNvbmZpcm1lZEF0IHx8ICFhdWRpdC5zZW50QXQgfHwgIWF1ZGl0LmVuZGVkQXQpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdFcnJvciBvbiByZXBvcnQgY29sbGVjdGluZy4gU29tZSBkYXRhIGlzIG1pc3NpbmcuJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBiYXRjaDoge1xyXG4gICAgICAgICAgICAgICAgaW5kZXg6IGJhdGNoLmluZGV4LFxyXG4gICAgICAgICAgICAgICAgcmVzdWx0OiBhdWRpdC5yZXN1bHRcclxuICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgIGJhdGNoaW5nRHVyYXRpb246IGR1cmF0aW9uKGF1ZGl0LmRlcXVldWVkQXQsIGF1ZGl0LnNlbnRBdCksXHJcblxyXG4gICAgICAgICAgICBjb25maXJtYXRpb25EdXJhdGlvbjogZHVyYXRpb24oYXVkaXQuY29uZmlybWVkQXQsIGF1ZGl0LmVuZGVkQXQpXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvaWZkZWYtbG9hZGVyL2lmZGVmLWxvYWRlci5qcz9ERUJVRz10cnVlJlBFUkZPUk1BTkNFX0FVRElUPXRydWUhLi9zcmMvcHJvY2Vzc2luZy9hdWRpdC9yZXBvcnRlcnMvYmF0Y2gtcmVwb3J0ZXIudHMiLCJcclxuaW1wb3J0IHsgSUVudmVsb3BRdWV1ZSB9IGZyb20gJy4uLy4uL2VudmVsb3AtcXVldWUnO1xyXG5pbXBvcnQgeyBJUGlwZVN0YXRzUHJvdmlkZXIsIElQaXBlU3RhdHNSZXBvc2l0b3J5IH0gZnJvbSAnLi4vc3RhdHMvcGlwZS1zdGF0cyc7XHJcbmltcG9ydCB7IElCYXRjaFN0YXRpc3RpY0F1ZGl0b3IsIElQaXBlU3RhdGlzdGljQXVkaXRvciB9IGZyb20gJy4vcGlwZSc7XHJcblxyXG5leHBvcnQgY2xhc3MgUGlwZVN0YXRpc3RpY0F1ZGl0b3IgaW1wbGVtZW50cyBJUGlwZVN0YXRpc3RpY0F1ZGl0b3Ige1xyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBfc3RhdHM6IElQaXBlU3RhdHNQcm92aWRlclxyXG4gICAgKSB7IH1cclxuXHJcbiAgICBwdWJsaWMgc3RhcnQocXVldWU6IElFbnZlbG9wUXVldWUpIHtcclxuICAgICAgICByZXR1cm4gbmV3IEJhdGNoU3RhdGlzdGljQXVkaXRvcih0aGlzLl9zdGF0cy5nZXQocXVldWUpKTtcclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgQmF0Y2hTdGF0aXN0aWNBdWRpdG9yIGltcGxlbWVudHMgSUJhdGNoU3RhdGlzdGljQXVkaXRvciB7XHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgc3RhdHM6IElQaXBlU3RhdHNSZXBvc2l0b3J5XHJcbiAgICApIHsgfVxyXG5cclxuICAgIHB1YmxpYyByZXN1bHQoc3VjY2VzczogYm9vbGVhbikge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnN0YXRzLnVwZGF0ZSgoc3RhdHMpID0+IHtcclxuICAgICAgICAgICAgY29uc3Qgc3RhdGlzdGljID0gc3RhdHMuc3RhdGlzdGljO1xyXG5cclxuICAgICAgICAgICAgaWYgKCFzdWNjZXNzKSB7XHJcbiAgICAgICAgICAgICAgICBzdGF0aXN0aWMucmVxdWVzdEVycm9yQ291bnQrKztcclxuICAgICAgICAgICAgICAgIHN0YXRpc3RpYy50b3RhbFJlcXVlc3RFcnJvckNvdW50Kys7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHN0YXRpc3RpYy5sYXN0U2VuZGluZ1N1Y2Nlc3MgPSBzdWNjZXNzO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy9pZmRlZi1sb2FkZXIvaWZkZWYtbG9hZGVyLmpzP0RFQlVHPXRydWUmUEVSRk9STUFOQ0VfQVVESVQ9dHJ1ZSEuL3NyYy9wcm9jZXNzaW5nL2F1ZGl0L2F1ZGl0b3JzL3BpcGUtc3RhdGlzdGljcy1hdWRpdG9yLnRzIiwiaW1wb3J0IHsgSVBlcmZvcm1hbmNlV29ya2VyTWVzc2FnZSB9IGZyb20gJy4uLy4uLy4uL3dvcmtlcnMvd29ya2VyLWRlZmluaXRpb25zJztcclxuaW1wb3J0IHsgQ29udGV4dCB9IGZyb20gJy4uLy4uL2NvbnRleHQnO1xyXG5pbXBvcnQgeyBJQmF0Y2hQZXJmb3JtYW5jZVJlcG9ydCwgSU1lc3NhZ2VzUGVyZm9ybWFuY2VSZXBvcnQgfSBmcm9tICcuLi9kZWZpbml0aW9ucyc7XHJcbmltcG9ydCB7IElBdWRpdFNlbmRlciB9IGZyb20gJy4vYXVkaXQtc2VuZGVyJztcclxuXHJcbi8qKlxyXG4gKiBTZW5kZXIgYXVkaXQgZGF0YSB0byBtYWluIHRocmVhZFxyXG4gKlxyXG4gKiBAaW50ZXJuYWxcclxuICovXHJcbmV4cG9ydCBjbGFzcyBXb3JrZXJBdWRpdFNlbmRlciBpbXBsZW1lbnRzIElBdWRpdFNlbmRlciB7XHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IF9jb250ZXh0OiBDb250ZXh0LFxyXG4gICAgKSB7IH1cclxuXHJcbiAgICBwdWJsaWMgYmF0Y2gocmVwb3J0OiBJQmF0Y2hQZXJmb3JtYW5jZVJlcG9ydCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX2NvbnRleHQuc2VuZGVyLnBvc3RNZXNzYWdlKHsgdHlwZTogJ3BlcmZvcm1hbmNlJywgcmVwb3J0OiB7IHR5cGU6ICdiYXRjaCcsIGRhdGE6IHJlcG9ydCB9IH0gYXMgSVBlcmZvcm1hbmNlV29ya2VyTWVzc2FnZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG1lc3NhZ2VzKHJlcG9ydDogSU1lc3NhZ2VzUGVyZm9ybWFuY2VSZXBvcnQpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9jb250ZXh0LnNlbmRlci5wb3N0TWVzc2FnZSh7IHR5cGU6ICdwZXJmb3JtYW5jZScsIHJlcG9ydDogeyB0eXBlOiAnbWVzc2FnZXMnLCBkYXRhOiByZXBvcnQgfSB9IGFzIElQZXJmb3JtYW5jZVdvcmtlck1lc3NhZ2UpO1xyXG4gICAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy9pZmRlZi1sb2FkZXIvaWZkZWYtbG9hZGVyLmpzP0RFQlVHPXRydWUmUEVSRk9STUFOQ0VfQVVESVQ9dHJ1ZSEuL3NyYy9wcm9jZXNzaW5nL2F1ZGl0L3NlbmRlcnMvd29ya2VyLWF1ZGl0LXNlbmRlci50cyIsImltcG9ydCB7IG92ZXJyaWRlIH0gZnJvbSAnLi4vZnJhbWV3b3JrL2luZGV4JztcclxuaW1wb3J0IHsgSUJhdGNoQXVkaXRQcm92aWRlciB9IGZyb20gJy4vYXVkaXQvYXVkaXQtcHJvdmlkZXInO1xyXG5pbXBvcnQgeyBJQmF0Y2hTdGF0aXN0aWNBdWRpdG9yLCBJUGlwZVN0YXRpc3RpY0F1ZGl0b3IgfSBmcm9tICcuL2F1ZGl0L2F1ZGl0b3JzL3BpcGUnO1xyXG5pbXBvcnQgeyBJUGlwZVN0YXRzUmVwb3NpdG9yeSB9IGZyb20gJy4vYXVkaXQvc3RhdHMvcGlwZS1zdGF0cyc7XHJcbmltcG9ydCB7IEJhdGNoIH0gZnJvbSAnLi9iYXRjaCc7XHJcbmltcG9ydCB7IElCYXRjaERyb3BTdHJhdGVneSB9IGZyb20gJy4vYmF0Y2gtZHJvcC1zdHJhdGVneSc7XHJcbmltcG9ydCB7IElCYXRjaFN0b3JhZ2UsIElTdG9yZWRCYXRjaENvbnN1bWF0aW9uIH0gZnJvbSAnLi9iYXRjaC1zdG9yYWdlcy9iYXRjaC1zdG9yYWdlJztcclxuaW1wb3J0IHsgSUVudmVsb3BRdWV1ZSB9IGZyb20gJy4vZW52ZWxvcC1xdWV1ZSc7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElCYXRjaEJ1aWxkZXIge1xyXG4gICAgcmVhZG9ubHkgcXVldWU6IElFbnZlbG9wUXVldWU7XHJcblxyXG4gICAgbmV4dChhdm9pZENvbmN1cnJlbmN5PzogYm9vbGVhbik6IFByb21pc2U8QmF0Y2hDb25zdW1hdGlvbiB8IHVuZGVmaW5lZD47XHJcblxyXG4gICAgZGVzdHJveSgpOiBQcm9taXNlPHZvaWQ+O1xyXG59XHJcblxyXG4vKipcclxuICogQ29uZmlndXJhdGlvbnMgZm9yIEJhdGNoXHJcbiAqL1xyXG5leHBvcnQgaW50ZXJmYWNlIElCYXRjaEJ1aWxkZXJDb25maWd1cmF0aW9uIHtcclxuICAgIC8qKlxyXG4gICAgICogTWF4IGNvdW50IG9mIG1lc3NhZ2VzIGluIG9uZSBzZW5kaW5nIHRvIGFuIGVuZHBvaW50XHJcbiAgICAgKi9cclxuICAgIGJhdGNoU2l6ZT86IG51bWJlcjtcclxufVxyXG5cclxuLyoqXHJcbiAqIENsYXNzIGRlZmluZSBkZWZhdWx0IHZhbHVlcyBmb3IgY29uZmlndXJhdGlvbnNcclxuICpcclxuICogQGludGVybmFsXHJcbiAqL1xyXG5jbGFzcyBCYXRjaEJ1aWxkZXJDb25maWd1cmF0aW9uIGltcGxlbWVudHMgSUJhdGNoQnVpbGRlckNvbmZpZ3VyYXRpb24ge1xyXG4gICAgcHVibGljIGJhdGNoU2l6ZTogbnVtYmVyID0gNTA7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBCYXRjaEJ1aWxkZXIgaW1wbGVtZW50cyBJQmF0Y2hCdWlsZGVyIHtcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgX2NvbmZpZzogQmF0Y2hCdWlsZGVyQ29uZmlndXJhdGlvbiA9IG5ldyBCYXRjaEJ1aWxkZXJDb25maWd1cmF0aW9uKCk7XHJcblxyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IHF1ZXVlOiBJRW52ZWxvcFF1ZXVlLFxyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgX2JhdGNoU3RvcmFnZTogSUJhdGNoU3RvcmFnZSxcclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IF9iYXRjaERyb3BTdHJhdGVneTogSUJhdGNoRHJvcFN0cmF0ZWd5LFxyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgX2F1ZGl0UHJvdmlkZXI6IElCYXRjaEF1ZGl0UHJvdmlkZXIsXHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBfYXVkaXRvcjogSVBpcGVTdGF0aXN0aWNBdWRpdG9yLFxyXG4gICAgICAgIGNvbmZpZzogSUJhdGNoQnVpbGRlckNvbmZpZ3VyYXRpb24gfCBudWxsID0gbnVsbFxyXG4gICAgKSB7XHJcbiAgICAgICAgb3ZlcnJpZGUodGhpcy5fY29uZmlnLCBjb25maWcpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhc3luYyBuZXh0KGF2b2lkQ29uY3VycmVuY3k6IGJvb2xlYW4gPSBmYWxzZSk6IFByb21pc2U8QmF0Y2hDb25zdW1hdGlvbiB8IHVuZGVmaW5lZD4ge1xyXG4gICAgICAgIGNvbnN0IGF1ZGl0b3IgPSB0aGlzLl9hdWRpdG9yLnN0YXJ0KHRoaXMucXVldWUpO1xyXG4gICAgICAgIGNvbnN0IGNvbnN1bWF0aW9uID0gYXdhaXQgdGhpcy5iYXRjaChhdWRpdG9yLnN0YXRzLCBhdm9pZENvbmN1cnJlbmN5KTtcclxuXHJcbiAgICAgICAgaWYgKCFjb25zdW1hdGlvbikge1xyXG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIG5ldyBCYXRjaENvbnN1bWF0aW9uKGNvbnN1bWF0aW9uLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdWRpdG9yLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9iYXRjaERyb3BTdHJhdGVneSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFzeW5jIGRlc3Ryb3koKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgYXdhaXQgdGhpcy5fYmF0Y2hTdG9yYWdlLmRlc3Ryb3koKTtcclxuICAgICAgICBhd2FpdCB0aGlzLnF1ZXVlLmRlc3Ryb3koKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGJhdGNoKHJlcG86IElQaXBlU3RhdHNSZXBvc2l0b3J5LCBhdm9pZENvbmN1cnJlbmN5OiBib29sZWFuKTogUHJvbWlzZTxJU3RvcmVkQmF0Y2hDb25zdW1hdGlvbiB8IHVuZGVmaW5lZD4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9iYXRjaFN0b3JhZ2UuYXBwZW5kKGFzeW5jICgpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgZW52ZWxvcHMgPSBhd2FpdCB0aGlzLnF1ZXVlLmRlcXVldWUodGhpcy5fY29uZmlnLmJhdGNoU2l6ZSwgYXZvaWRDb25jdXJyZW5jeSk7XHJcblxyXG4gICAgICAgICAgICBpZiAoIWVudmVsb3BzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY29uc3QgYmF0Y2ggPSBhd2FpdCByZXBvLnVwZGF0ZSgoc3RhdHMpID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgQmF0Y2goZW52ZWxvcHMsICsrc3RhdHMuc3RhdGlzdGljLmJhdGNoSW5kZXgpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGJhdGNoLmF1ZGl0cyA9IGF3YWl0IHRoaXMuX2F1ZGl0UHJvdmlkZXIuYXVkaXQoYmF0Y2gsIHJlcG8pO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGJhdGNoO1xyXG4gICAgICAgIH0sIGF2b2lkQ29uY3VycmVuY3kpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgQmF0Y2hDb25zdW1hdGlvbiB7XHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IF9jb25zdW1wdGlvbjogSVN0b3JlZEJhdGNoQ29uc3VtYXRpb24sXHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBfYXVkaXRvcjogSUJhdGNoU3RhdGlzdGljQXVkaXRvcixcclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IF9iYXRjaERyb3BTdHJhdGVneTogSUJhdGNoRHJvcFN0cmF0ZWd5XHJcbiAgICApIHsgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgYmF0Y2goKTogQmF0Y2gge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jb25zdW1wdGlvbi5iYXRjaDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYXN5bmMgYWNrKCk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgIGF3YWl0IHRoaXMuX2F1ZGl0b3IucmVzdWx0KHRydWUpO1xyXG4gICAgICAgIGF3YWl0IHRoaXMuX2NvbnN1bXB0aW9uLmFjaygpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhc3luYyBuYWNrKCk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgIHRoaXMuYmF0Y2guZXJyb3JDb3VudCsrO1xyXG4gICAgICAgIGF3YWl0IHRoaXMuX2F1ZGl0b3IucmVzdWx0KGZhbHNlKTtcclxuXHJcbiAgICAgICAgY29uc3Qgc3RhdHMgPSBhd2FpdCB0aGlzLl9hdWRpdG9yLnN0YXRzLnJlYWQoKTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuX2JhdGNoRHJvcFN0cmF0ZWd5LnNob3VsZEJlRHJvcHBlZChzdGF0cywgdGhpcy5iYXRjaCkpIHtcclxuICAgICAgICAgICAgYXdhaXQgdGhpcy5fY29uc3VtcHRpb24uYWNrKCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgYXdhaXQgdGhpcy5fY29uc3VtcHRpb24ubmFjaygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvaWZkZWYtbG9hZGVyL2lmZGVmLWxvYWRlci5qcz9ERUJVRz10cnVlJlBFUkZPUk1BTkNFX0FVRElUPXRydWUhLi9zcmMvcHJvY2Vzc2luZy9iYXRjaC1idWlsZGVyLnRzIiwiaW1wb3J0IHsgb3ZlcnJpZGUgfSBmcm9tICcuLi9mcmFtZXdvcmsvaW5kZXgnO1xyXG5pbXBvcnQgeyBJUGlwZVN0YXRzIH0gZnJvbSAnLi9hdWRpdC9zdGF0cy9waXBlLXN0YXRzJztcclxuaW1wb3J0IHsgQmF0Y2ggfSBmcm9tICcuL2JhdGNoJztcclxuXHJcbi8qKlxyXG4gKiBEcm9wIGJhdGNoIHN0cmF0ZWd5IGRlcm1pbmF0ZSB0aGVuIGN1cnJlbnQgYmF0Y2ggc2hvdWxkIGJlIGRyb3BwZWQgYmFzZWQgb24gY3VycmVudCBzdGF0ZSBhbmQgc3RhdGlzaXRjc1xyXG4gKi9cclxuZXhwb3J0IGludGVyZmFjZSBJQmF0Y2hEcm9wU3RyYXRlZ3kge1xyXG4gICAgc2hvdWxkQmVEcm9wcGVkKHBpcGVTdGF0czogSVBpcGVTdGF0cywgYmF0Y2g6IEJhdGNoKTogYm9vbGVhbjtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJQmF0Y2hEcm9wU3RyYXRlZ3lDb25maWd1cmF0aW9uIHtcclxuICAgIC8qKlxyXG4gICAgICogUmF0aW8gb2YgcXVldWUgZnVsbGluZyBhZnRlciB3aGljaCBiYXRjaGVzIGFyZSBkcm9wcGVkIGFmdGV0IGBhdHRlbXB0Q291bnRgXHJcbiAgICAgKi9cclxuICAgIGZpbGxUaHJlc2hvbGQ/OiBudW1iZXI7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBOdW1iZXIgb2YgYXR0ZW1wdCBmb3IgZWFjaCBiYXRjaGVzIGFmdGVyIGV4Y2lkaW5nIG9mIGBmaWxsVGhyZXNob2xkYFxyXG4gICAgICovXHJcbiAgICBhdHRlbXB0Q291bnQ/OiBudW1iZXI7XHJcbn1cclxuXHJcbmNsYXNzIERlZmF1bHRCYXRjaERyb3BTdHJhdGVneUNvbmZpZ3VyYXRpb24gaW1wbGVtZW50cyBJQmF0Y2hEcm9wU3RyYXRlZ3lDb25maWd1cmF0aW9uIHtcclxuICAgIHB1YmxpYyBmaWxsVGhyZXNob2xkID0gMC42O1xyXG5cclxuICAgIHB1YmxpYyBhdHRlbXB0Q291bnQgPSAyO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgRGVmYXVsdEJhdGNoRHJvcFN0cmF0ZWd5IGltcGxlbWVudHMgSUJhdGNoRHJvcFN0cmF0ZWd5IHtcclxuICAgIHByaXZhdGUgX2NvbmZpZyA9IG5ldyBEZWZhdWx0QmF0Y2hEcm9wU3RyYXRlZ3lDb25maWd1cmF0aW9uKCk7XHJcblxyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgY29uZmlnOiBJQmF0Y2hEcm9wU3RyYXRlZ3lDb25maWd1cmF0aW9uXHJcbiAgICApIHtcclxuICAgICAgICBvdmVycmlkZSh0aGlzLl9jb25maWcsIGNvbmZpZyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNob3VsZEJlRHJvcHBlZChwaXBlU3RhdHM6IElQaXBlU3RhdHMsIGJhdGNoOiBCYXRjaCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGNvbnN0IHN0YXRlID0gcGlwZVN0YXRzLnN0YXRlO1xyXG4gICAgICAgIGNvbnN0IGNvbmZpZyA9IHRoaXMuX2NvbmZpZztcclxuXHJcbiAgICAgICAgcmV0dXJuIGJhdGNoLmVycm9yQ291bnQgPj0gY29uZmlnLmF0dGVtcHRDb3VudFxyXG4gICAgICAgICAgICAgICAmJiAoc3RhdGUucXVldWVNZXNzYWdlQ291bnQgLyBzdGF0ZS5xdWV1ZVNpemUpID4gY29uZmlnLmZpbGxUaHJlc2hvbGQ7XHJcbiAgICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL2lmZGVmLWxvYWRlci9pZmRlZi1sb2FkZXIuanM/REVCVUc9dHJ1ZSZQRVJGT1JNQU5DRV9BVURJVD10cnVlIS4vc3JjL3Byb2Nlc3NpbmcvYmF0Y2gtZHJvcC1zdHJhdGVneS50cyIsImltcG9ydCB7IEluZGV4ZWREYlV0aWxzIH0gZnJvbSAnLi4vLi4vLi4vZnJhbWV3b3JrL2luZGV4ZWRkYi11dGlscyc7XHJcbmltcG9ydCB7IElMb2dnZXIgfSBmcm9tICcuLi8uLi8uLi9sb2dzL2xvZ2dlcic7XHJcbmltcG9ydCB7IEJhdGNoIH0gZnJvbSAnLi4vLi4vYmF0Y2gnO1xyXG5pbXBvcnQgeyBJQmF0Y2hTdG9yYWdlLCBJU3RvcmVkQmF0Y2hDb25zdW1hdGlvbiB9IGZyb20gJy4uL2JhdGNoLXN0b3JhZ2UnO1xyXG5cclxuZXhwb3J0IGNsYXNzIEJhdGNoSW5kZXhlZERCU3RvcmFnZSBpbXBsZW1lbnRzIElCYXRjaFN0b3JhZ2Uge1xyXG4gICAgcHVibGljIHN0YXRpYyBhc3luYyBjcmVhdGUoaWQ6IHN0cmluZywgc3luY2hyb25pemF0aW9uVGltZTogbnVtYmVyLCBuYW1lPzogc3RyaW5nLCBjbGVhcj86IGJvb2xlYW4pOiBQcm9taXNlPEJhdGNoSW5kZXhlZERCU3RvcmFnZT4ge1xyXG4gICAgICAgIGNvbnN0IGRhdGFiYXNlID0gYXdhaXQgQmF0Y2hJbmRleGVkREJTdG9yYWdlLmRiKGlkLCBuYW1lKTtcclxuXHJcbiAgICAgICAgY29uc3Qgc3RvcmFnZSA9IG5ldyBCYXRjaEluZGV4ZWREQlN0b3JhZ2UoaWQsIHN5bmNocm9uaXphdGlvblRpbWUsIGRhdGFiYXNlKTtcclxuXHJcbiAgICAgICAgaWYgKGNsZWFyKSB7XHJcbiAgICAgICAgICAgIGF3YWl0IHN0b3JhZ2UuY2xlYXIoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBzdG9yYWdlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgZGIoaWQ6IHN0cmluZywgbmFtZT86IHN0cmluZyk6IFByb21pc2U8SURCRGF0YWJhc2U+IHtcclxuICAgICAgICBjb25zdCBkYk5hbWUgPSAnbWNqcy1iYXRjaDonICsgKG5hbWUgfHwgaWQpO1xyXG5cclxuICAgICAgICByZXR1cm4gSW5kZXhlZERiVXRpbHMub3BlbihkYk5hbWUsIDEsIChkYikgPT4ge1xyXG4gICAgICAgICAgICBpZiAoIWRiLm9iamVjdFN0b3JlTmFtZXMuY29udGFpbnMoQmF0Y2hJbmRleGVkREJTdG9yYWdlLnN0b3JhZ2VOYW1lKSkge1xyXG4gICAgICAgICAgICAgICAgZGIuY3JlYXRlT2JqZWN0U3RvcmUoQmF0Y2hJbmRleGVkREJTdG9yYWdlLnN0b3JhZ2VOYW1lLCB7IGtleVBhdGg6ICgnYmF0Y2gnIGFzIGtleW9mIElCYXRjaERhdGEpICsgJy4nICsgKCdpbmRleCcgYXMga2V5b2YgQmF0Y2gpIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgc3RvcmFnZU5hbWUgPSAnYmF0Y2gnO1xyXG5cclxuICAgIHB1YmxpYyBsb2dnZXI/OiBJTG9nZ2VyO1xyXG5cclxuICAgIHByaXZhdGUgX3JlY292ZXJ5PzogQmF0Y2g7XHJcblxyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IGlkOiBzdHJpbmcsXHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBfc3luY1RpbWU6IG51bWJlcixcclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IF9kYjogSURCRGF0YWJhc2UsXHJcbiAgICApIHsgfVxyXG5cclxuICAgIHB1YmxpYyBhc3luYyBhcHBlbmQoY3JlYXRlOiAoKSA9PiBQcm9taXNlPEJhdGNoIHwgdW5kZWZpbmVkPik6IFByb21pc2U8SVN0b3JlZEJhdGNoQ29uc3VtYXRpb24gfCB1bmRlZmluZWQ+IHtcclxuICAgICAgICBsZXQgYmF0Y2ggPSBhd2FpdCB0aGlzLnJlYWQoKTtcclxuXHJcbiAgICAgICAgaWYgKCFiYXRjaCkge1xyXG5cclxuICAgICAgICAgICAgYmF0Y2ggPSBhd2FpdCBjcmVhdGUoKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChiYXRjaCkge1xyXG4gICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5zYXZlKGJhdGNoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGJhdGNoKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGJhdGNoSW5kZXggPSBiYXRjaC5pbmRleDtcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIGJhdGNoLFxyXG4gICAgICAgICAgICAgICAgYWNrOiAoKSA9PiB0aGlzLnJlc2V0KGJhdGNoSW5kZXgpLFxyXG4gICAgICAgICAgICAgICAgbmFjazogKCkgPT4gdGhpcy5hdm9pZEFjY2VzcyhiYXRjaEluZGV4KVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xlYXIoKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudHJhbnNhY3Rpb24oKHN0b3JhZ2UpID0+IHtcclxuICAgICAgICAgICAgc3RvcmFnZS5jbGVhcigpO1xyXG4gICAgICAgIH0sIHVuZGVmaW5lZCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFzeW5jIGRlc3Ryb3koKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgdGhpcy5fZGIuY2xvc2UoKTtcclxuICAgICAgICByZXR1cm4gSW5kZXhlZERiVXRpbHMucmVtb3ZlKHRoaXMuX2RiLm5hbWUpLmNhdGNoKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSByZXNldChpbmRleDogbnVtYmVyKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucmVtb3ZlKGluZGV4KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGFzeW5jIHJlYWQoKTogUHJvbWlzZTxCYXRjaCB8IHVuZGVmaW5lZD4ge1xyXG4gICAgICAgIGlmICh0aGlzLl9yZWNvdmVyeSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fcmVjb3Zlcnk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBjb25zdCByZWFkUmVzdWx0ID0gYXdhaXQgdGhpcy50cmFuc2FjdGlvbigoc3RvcmFnZSwgcmVzdWx0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBJbmRleGVkRGJVdGlscy5yZXF1ZXN0PElEQkN1cnNvcldpdGhWYWx1ZT4oc3RvcmFnZS5vcGVuQ3Vyc29yKCksIChjdXJzb3IpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoY3Vyc29yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGRhdGEgPSBjdXJzb3IudmFsdWUgYXMgSUJhdGNoRGF0YTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEgJiYgdGhpcy5pc05vdEJsb2NrZWQoZGF0YSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1cnNvci51cGRhdGUoZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQuYmF0Y2ggPSBkYXRhLmJhdGNoO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3Vyc29yLmNvbnRpbnVlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSwgeyBiYXRjaDogdW5kZWZpbmVkIGFzIEJhdGNoIHwgdW5kZWZpbmVkIH0pO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHJlYWRSZXN1bHQuYmF0Y2g7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgdGhpcy5lcnJvcignRXJyb3Igb24gcmVhZGluZy4nLCBlcnJvcik7XHJcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgYXN5bmMgc2F2ZShiYXRjaDogQmF0Y2gpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBhd2FpdCB0aGlzLnRyYW5zYWN0aW9uKChzdG9yYWdlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBJbmRleGVkRGJVdGlscy5yZXF1ZXN0KHN0b3JhZ2UuYWRkKHtcclxuICAgICAgICAgICAgICAgICAgICBiYXRjaCxcclxuICAgICAgICAgICAgICAgICAgICBsYXN0QWNjZXNzOiArbmV3IERhdGUoKVxyXG4gICAgICAgICAgICAgICAgfSBhcyBJQmF0Y2hEYXRhKSk7XHJcbiAgICAgICAgICAgIH0sIHVuZGVmaW5lZCk7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgdGhpcy5fcmVjb3ZlcnkgPSBiYXRjaDtcclxuICAgICAgICAgICAgdGhpcy5lcnJvcignRXJyb3Igb24gc2F2aW5nLicsIGVycm9yKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBhc3luYyByZW1vdmUoYmF0Y2hJbmRleDogbnVtYmVyKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgaWYgKHRoaXMuX3JlY292ZXJ5ICYmIHRoaXMuX3JlY292ZXJ5LmluZGV4ID09PSBiYXRjaEluZGV4KSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3JlY292ZXJ5ID0gdW5kZWZpbmVkO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBhd2FpdCB0aGlzLnRyYW5zYWN0aW9uKChzdG9yYWdlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBJbmRleGVkRGJVdGlscy5yZXF1ZXN0KHN0b3JhZ2UuZGVsZXRlKGJhdGNoSW5kZXgpKTtcclxuICAgICAgICAgICAgfSwgdW5kZWZpbmVkKTtcclxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICB0aGlzLmVycm9yKCdFcnJvciBvbiByZW1vdmluZy4nLCBlcnJvcik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgYXN5bmMgYXZvaWRBY2Nlc3MoYmF0Y2hJbmRleDogbnVtYmVyKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgYXdhaXQgdGhpcy50cmFuc2FjdGlvbigoc3RvcmFnZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgSW5kZXhlZERiVXRpbHMucmVxdWVzdChzdG9yYWdlLmdldChiYXRjaEluZGV4KSwgKGRhdGE6IElCYXRjaERhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBkYXRhLmxhc3RBY2Nlc3MgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RvcmFnZS5wdXQoZGF0YSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSwgdW5kZWZpbmVkKTtcclxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICB0aGlzLmVycm9yKCdFcnJvciBvbiBhY2Nlc3MgYXZvaWRpbmcuJywgZXJyb3IpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9wZW4obW9kZTogSURCVHJhbnNhY3Rpb25Nb2RlKTogSURCT2JqZWN0U3RvcmUge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9kYi50cmFuc2FjdGlvbihbQmF0Y2hJbmRleGVkREJTdG9yYWdlLnN0b3JhZ2VOYW1lXSwgbW9kZSkub2JqZWN0U3RvcmUoQmF0Y2hJbmRleGVkREJTdG9yYWdlLnN0b3JhZ2VOYW1lKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHRyYW5zYWN0aW9uPFQ+KGFjdGlvbjogKHN0b3JhZ2U6IElEQk9iamVjdFN0b3JlLCByZXN1bHQ6IFQpID0+IHZvaWQsIHJlc3VsdDogVCwgbW9kZTogSURCVHJhbnNhY3Rpb25Nb2RlID0gJ3JlYWR3cml0ZScpOiBQcm9taXNlPFQ+IHtcclxuICAgICAgICByZXR1cm4gSW5kZXhlZERiVXRpbHMudHJhbnNhY3Rpb24oKCkgPT4gdGhpcy5vcGVuKG1vZGUpLCBhY3Rpb24sIHJlc3VsdCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBpc05vdEJsb2NrZWQoZGF0YTogSUJhdGNoRGF0YSk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGlmICh0aGlzLl9zeW5jVGltZSkge1xyXG4gICAgICAgICAgICBjb25zdCBub3cgPSArbmV3IERhdGUoKTtcclxuICAgICAgICAgICAgaWYgKGRhdGEubGFzdEFjY2VzcyAmJiBNYXRoLmFicyhub3cgLSBkYXRhLmxhc3RBY2Nlc3MpIDwgdGhpcy5fc3luY1RpbWUpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBkYXRhLmxhc3RBY2Nlc3MgPSBub3c7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZXJyb3IobWVzc2FnZTogc3RyaW5nLCBlcnJvcjogRXJyb3IpIHtcclxuICAgICAgICBpZiAodGhpcy5sb2dnZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5sb2dnZXIuZXJyb3IoJ1tJbmRleGVkRGIgQlNdOicgKyBtZXNzYWdlLCBlcnJvcik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5pbnRlcmZhY2UgSUJhdGNoRGF0YSB7XHJcbiAgICBiYXRjaDogQmF0Y2g7XHJcblxyXG4gICAgbGFzdEFjY2VzczogbnVtYmVyIHwgdW5kZWZpbmVkO1xyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy9pZmRlZi1sb2FkZXIvaWZkZWYtbG9hZGVyLmpzP0RFQlVHPXRydWUmUEVSRk9STUFOQ0VfQVVESVQ9dHJ1ZSEuL3NyYy9wcm9jZXNzaW5nL2JhdGNoLXN0b3JhZ2VzL2luZGV4ZWRkYi1zdG9yYWdlL2JhdGNoLWluZGV4ZWRkYi1zdG9yYWdlLnRzIiwiaW1wb3J0IHsgV2ViU3RvcmFnZXMgfSBmcm9tICcuLi8uLi8uLi9mcmFtZXdvcmsvd2Vic3RvcmFnZSc7XHJcbmltcG9ydCB7IElMb2dnZXIgfSBmcm9tICcuLi8uLi8uLi9sb2dzL2xvZ2dlcic7XHJcbmltcG9ydCB7IEJhdGNoIH0gZnJvbSAnLi4vLi4vYmF0Y2gnO1xyXG5pbXBvcnQgeyBJQmF0Y2hTdG9yYWdlLCBJU3RvcmVkQmF0Y2hDb25zdW1hdGlvbiB9IGZyb20gJy4uL2JhdGNoLXN0b3JhZ2UnO1xyXG5cclxuZXhwb3J0IGNsYXNzIEJhdGNoTG9jYWxTdG9yYWdlU3RvcmFnZSBpbXBsZW1lbnRzIElCYXRjaFN0b3JhZ2Uge1xyXG4gICAgcHVibGljIHN0YXRpYyBjcmVhdGUoaWQ6IHN0cmluZywgbmFtZT86IHN0cmluZywgY2xlYXI/OiBib29sZWFuKTogQmF0Y2hMb2NhbFN0b3JhZ2VTdG9yYWdlIHwgdW5kZWZpbmVkIHtcclxuICAgICAgICBpZiAoIVdlYlN0b3JhZ2VzLmxvY2FsU3RvcmFnZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3Qgc3RvcmFnZSA9IG5ldyBCYXRjaExvY2FsU3RvcmFnZVN0b3JhZ2UoJ21janMtYmF0Y2g6JyArIChuYW1lIHx8IGlkKSwgV2ViU3RvcmFnZXMubG9jYWxTdG9yYWdlKTtcclxuXHJcbiAgICAgICAgaWYgKGNsZWFyKSB7XHJcbiAgICAgICAgICAgIHN0b3JhZ2UuY2xlYXIoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBzdG9yYWdlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBsb2dnZXI/OiBJTG9nZ2VyO1xyXG5cclxuICAgIHByaXZhdGUgX2NhY2hlPzogQmF0Y2g7XHJcblxyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IGtleTogc3RyaW5nLFxyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgX3N0b3JhZ2U6IFN0b3JhZ2VcclxuICAgICkgeyB9XHJcblxyXG4gICAgcHVibGljIGFzeW5jIGFwcGVuZChjcmVhdGU6ICgpID0+IFByb21pc2U8QmF0Y2ggfCB1bmRlZmluZWQ+LCBhdm9pZENvbmN1cnJhbmN5OiBib29sZWFuKTogUHJvbWlzZTxJU3RvcmVkQmF0Y2hDb25zdW1hdGlvbiB8IHVuZGVmaW5lZD4ge1xyXG4gICAgICAgIGxldCBiYXRjaCA9IHRoaXMuX2NhY2hlIHx8IChhdm9pZENvbmN1cnJhbmN5ID8gdW5kZWZpbmVkIDogdGhpcy5yZWFkKCkpO1xyXG5cclxuICAgICAgICBpZiAoIWJhdGNoKSB7XHJcbiAgICAgICAgICAgIGJhdGNoID0gdGhpcy5fY2FjaGUgPSBhd2FpdCBjcmVhdGUoKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChiYXRjaCAmJiAhYXZvaWRDb25jdXJyYW5jeSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zYXZlKGJhdGNoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGJhdGNoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICBiYXRjaCxcclxuICAgICAgICAgICAgICAgIGFjazogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2NhY2hlID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghYXZvaWRDb25jdXJyYW5jeSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlc2V0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIG5hY2s6ICgpID0+IHsgLyoqLyB9XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsZWFyKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMucmVzZXQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZGVzdHJveSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmNsZWFyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSByZWFkKCk6IEJhdGNoIHwgdW5kZWZpbmVkIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBjb25zdCBzdHIgPSB0aGlzLl9zdG9yYWdlLmdldEl0ZW0odGhpcy5rZXkpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHN0cikge1xyXG4gICAgICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gSlNPTi5wYXJzZShzdHIpIGFzIEJhdGNoO1xyXG4gICAgICAgICAgICAgICAgfSBjYXRjaCB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc3RvcmFnZS5yZW1vdmVJdGVtKHRoaXMua2V5KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9nKCdFcnJvciBvbiByZWFkaW5nJywgZXJyb3IpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2F2ZShiYXRjaDogQmF0Y2gpOiB2b2lkIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBjb25zdCBzdHIgPSBKU09OLnN0cmluZ2lmeShiYXRjaCk7XHJcbiAgICAgICAgICAgIHRoaXMuX3N0b3JhZ2Uuc2V0SXRlbSh0aGlzLmtleSwgc3RyKTtcclxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICB0aGlzLmxvZygnRXJyb3Igb24gc2F2aW5nJywgZXJyb3IpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHJlc2V0KCk6IHZvaWQge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3N0b3JhZ2UucmVtb3ZlSXRlbSh0aGlzLmtleSk7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgdGhpcy5sb2coJ0Vycm9yIG9uIHJlc2V0aW5nJywgZXJyb3IpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGxvZyhtZXNzYWdlOiBzdHJpbmcsIGVycm9yOiBFcnJvcikge1xyXG4gICAgICAgIGlmICh0aGlzLmxvZ2dlcikge1xyXG4gICAgICAgICAgICB0aGlzLmxvZ2dlci5lcnJvcignW0xTdG9yYWdlIEJTXTonICsgbWVzc2FnZSwgZXJyb3IpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvaWZkZWYtbG9hZGVyL2lmZGVmLWxvYWRlci5qcz9ERUJVRz10cnVlJlBFUkZPUk1BTkNFX0FVRElUPXRydWUhLi9zcmMvcHJvY2Vzc2luZy9iYXRjaC1zdG9yYWdlcy9sb2NhbC1zdG9yYWdlL2JhdGNoLWxvY2Fsc3RvcmFnZS1zdG9yYWdlLnRzIiwiaW1wb3J0IHsgQmF0Y2ggfSBmcm9tICcuLi8uLi9iYXRjaCc7XHJcbmltcG9ydCB7IElCYXRjaFN0b3JhZ2UsIElTdG9yZWRCYXRjaENvbnN1bWF0aW9uIH0gZnJvbSAnLi4vYmF0Y2gtc3RvcmFnZSc7XHJcblxyXG5leHBvcnQgY2xhc3MgQmF0Y2hNZW1vcnlTdG9yYWdlIGltcGxlbWVudHMgSUJhdGNoU3RvcmFnZSB7XHJcbiAgICBwcml2YXRlIF9iYXRjaDogQmF0Y2ggfCB1bmRlZmluZWQ7XHJcblxyXG4gICAgcHVibGljIGFzeW5jIGFwcGVuZChjcmVhdGU6ICgpID0+IFByb21pc2U8QmF0Y2ggfCB1bmRlZmluZWQ+KTogUHJvbWlzZTxJU3RvcmVkQmF0Y2hDb25zdW1hdGlvbiB8IHVuZGVmaW5lZD4ge1xyXG4gICAgICAgIGlmICghdGhpcy5fYmF0Y2gpIHtcclxuICAgICAgICAgICAgdGhpcy5fYmF0Y2ggPSBhd2FpdCBjcmVhdGUoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICghdGhpcy5fYmF0Y2gpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGJhdGNoOiB0aGlzLl9iYXRjaCxcclxuICAgICAgICAgICAgYWNrOiAoKSA9PiB0aGlzLl9iYXRjaCA9IHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgbmFjazogKCkgPT4geyAvKiovIH1cclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbGVhcigpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9iYXRjaCA9IHVuZGVmaW5lZDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZGVzdHJveSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmNsZWFyKCk7XHJcbiAgICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL2lmZGVmLWxvYWRlci9pZmRlZi1sb2FkZXIuanM/REVCVUc9dHJ1ZSZQRVJGT1JNQU5DRV9BVURJVD10cnVlIS4vc3JjL3Byb2Nlc3NpbmcvYmF0Y2gtc3RvcmFnZXMvbWVtb3J5LXN0b3JhZ2UvYmF0Y2gtbWVtb3J5LXN0b3JhZ2UudHMiLCJleHBvcnQgKiBmcm9tICcuL2ZlLWFuYWx5dGljcy1jb2xsZWN0b3ItZW5kcG9pbnQnO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvaWZkZWYtbG9hZGVyL2lmZGVmLWxvYWRlci5qcz9ERUJVRz10cnVlJlBFUkZPUk1BTkNFX0FVRElUPXRydWUhLi9zcmMvcHJvY2Vzc2luZy9lbmRwb2ludHMvZmUtYW5hbHl0aWNzLWNvbGxlY3Rvci9pbmRleC50cyIsImltcG9ydCB7IE1lc3NhZ2VUeXBlIH0gZnJvbSAnLi4vLi4vLi4vZGVmaW5pdGlvbnMnO1xyXG5pbXBvcnQgeyBJQWpheFByb3ZpZGVyLCBJVGltZVN0YW1wUHJvdmlkZXIsIG92ZXJyaWRlIH0gZnJvbSAnLi4vLi4vLi4vZnJhbWV3b3JrJztcclxuaW1wb3J0IHsgSUxvZ2dlciB9IGZyb20gJy4uLy4uLy4uL2xvZ3MvbG9nZ2VyJztcclxuaW1wb3J0IHsgVmVyc2lvbiB9IGZyb20gJy4uLy4uLy4uL3ZlcnNpb24nO1xyXG5pbXBvcnQgeyBCYXRjaCB9IGZyb20gJy4uLy4uL2JhdGNoJztcclxuaW1wb3J0IHsgSUVudmVsb3AgfSBmcm9tICcuLi8uLi9lbnZlbG9wJztcclxuaW1wb3J0IHsgSUVuZHBvaW50IH0gZnJvbSAnLi4vZW5kcG9pbnQnO1xyXG5cclxuLyoqXHJcbiAqIEVudmlyb25tZW50IGRhdGEgZm9yIEZFIEFuYWx5dGljcyBDb2xsZWN0b3JcclxuICpcclxuICogQGludGVybmFsXHJcbiAqIEBpbnRlcmZhY2UgSUZFQW5hbHl0aWNzQ29sbGVjdG9yQ29uZmlndXJhdGlvblxyXG4gKi9cclxuZXhwb3J0IGludGVyZmFjZSBJRkVBbmFseXRpY3NDb2xsZWN0b3JFbnZpcm9ubWVudCB7XHJcbiAgICAvKipcclxuICAgICAqIEFwaUtleSBmcm9tIGVudmVyb25lbW50XHJcbiAgICAgKlxyXG4gICAgICogQHR5cGUge3N0cmluZ31AbWVtYmVyb2YgSUZFQW5hbHl0aWNzQ29sbGVjdG9yQ29uZmlndXJhdGlvblxyXG4gICAgICovXHJcbiAgICBhcGlLZXk6IHN0cmluZztcclxufVxyXG5cclxuLyoqXHJcbiAqIENvbmZpZ3VyYXRpb24gZGF0YSBmb3IgRkUgQW5hbHl0aWNzIENvbGxlY3RvclxyXG4gKlxyXG4gKiBAaW50ZXJmYWNlIElGRUFuYWx5dGljc0NvbGxlY3RvckNvbmZpZ3VyYXRpb25cclxuICovXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUZFQW5hbHl0aWNzQ29sbGVjdG9yQ29uZmlndXJhdGlvbiB7XHJcbiAgICAvKipcclxuICAgICAqIFVybCBmb3Igc2VydmVyIHRvIHNlbmRpbmcgbWVzc2FnZXNcclxuICAgICAqXHJcbiAgICAgKiBAdHlwZSB7c3RyaW5nfUBtZW1iZXJvZiBJRkVBbmFseXRpY3NDb2xsZWN0b3JDb25maWd1cmF0aW9uXHJcbiAgICAgKi9cclxuICAgIHVybDogc3RyaW5nO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWpheCByZXF1ZXN0IHRpbWVvdXRcclxuICAgICAqXHJcbiAgICAgKiBAdHlwZSB7bnVtYmVyfUBtZW1iZXJvZiBJRkVBbmFseXRpY3NDb2xsZWN0b3JDb25maWd1cmF0aW9uXHJcbiAgICAgKi9cclxuICAgIHRpbWVvdXQ/OiBudW1iZXI7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBcGlLZXkgaXMgdXNlZCBmb3IgQXVkaXRNZXNzYWdlc1xyXG4gICAgICpcclxuICAgICAqIEB0eXBlIHtzdHJpbmd9XHJcbiAgICAgKiBAbWVtYmVyb2YgSUZFQW5hbHl0aWNzQ29sbGVjdG9yQ29uZmlndXJhdGlvblxyXG4gICAgICovXHJcbiAgICBhdWRpdEFwaUtleT86IHN0cmluZztcclxufVxyXG5cclxuLyoqXHJcbiAqIERlZmF1bHQgdmFsdWVzIGZvciBjb25maWd1cmF0aW9uc1xyXG4gKlxyXG4gKiBAaW50ZXJuYWxcclxuICogQGNsYXNzIEZFQW5hbHl0aWNzQ29sbGVjdG9yQ29uZmlndXJhdGlvblxyXG4gKiBAaW1wbGVtZW50cyB7SUZFQW5hbHl0aWNzQ29sbGVjdG9yQ29uZmlndXJhdGlvbn1cclxuICovXHJcbmNsYXNzIEZFQW5hbHl0aWNzQ29sbGVjdG9yQ29uZmlndXJhdGlvbiBpbXBsZW1lbnRzIElGRUFuYWx5dGljc0NvbGxlY3RvckNvbmZpZ3VyYXRpb24ge1xyXG4gICAgcHVibGljIHVybDogc3RyaW5nO1xyXG5cclxuICAgIHB1YmxpYyB0aW1lb3V0OiBudW1iZXIgPSAyMDAwO1xyXG5cclxuICAgIHB1YmxpYyBhdWRpdEFwaUtleTogc3RyaW5nID0gJ2ZlLWRhdGEnO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRm9ybWFsIHZhbGlkYXRpb24gb2YgY3VycmVudCBjb25maWd1cmF0aW9uXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEZFQW5hbHl0aWNzQ29sbGVjdG9yQ29uZmlndXJhdGlvblxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgdmFsaWRhdGUobG9nZ2VyOiBJTG9nZ2VyKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLnVybCkge1xyXG4gICAgICAgICAgICBjb25zdCBtZXNzYWdlID0gJ1VybCBmb3IgRkUgQW5hbHl0aWNzIENvbGxlY3RvciBpcyBub3Qgc2V0dGVkJztcclxuICAgICAgICAgICAgbG9nZ2VyLmZhdGFsKG1lc3NhZ2UpO1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG4vKipcclxuICogUmVhbCBtZXNzYWdlcyBzZW5kZXIgdG8gQkUgc2VydmVyc1xyXG4gKlxyXG4gKiBAaW50ZXJuYWxcclxuICogQGxpbmsgaHR0cHM6Ly9jb25mbHVlbmNlLmFnb2RhLmxvY2FsL2Rpc3BsYXkvQURQTUVTL0ZFK0FuYWx5dGljcytDb2xsZWN0b3JzK0Zvcm1hdFxyXG4gKiBAY2xhc3MgUG9ydEVuZHBvaW50XHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgRkVBbmFseXRpY3NDb2xsZWN0b3JFbmRwb2ludCBpbXBsZW1lbnRzIElFbmRwb2ludCB7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9jb25maWcgPSBuZXcgRkVBbmFseXRpY3NDb2xsZWN0b3JDb25maWd1cmF0aW9uKCk7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9zZXJpYWxpemVyOiBFbnZlbG9wU2VyaWFsaXplcjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IF9hamF4OiBJQWpheFByb3ZpZGVyLFxyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgX3RpbWVzdGFtcDogSVRpbWVTdGFtcFByb3ZpZGVyLFxyXG4gICAgICAgIF9sb2dnZXI6IElMb2dnZXIsXHJcbiAgICAgICAgY29uZmlnOiBJRkVBbmFseXRpY3NDb2xsZWN0b3JDb25maWd1cmF0aW9uLFxyXG4gICAgICAgIGVudmlyb25tZW50OiBJRkVBbmFseXRpY3NDb2xsZWN0b3JFbnZpcm9ubWVudFxyXG4gICAgKSB7XHJcbiAgICAgICAgIG92ZXJyaWRlKHRoaXMuX2NvbmZpZywgY29uZmlnKTtcclxuICAgICAgICAgdGhpcy5fY29uZmlnLnZhbGlkYXRlKF9sb2dnZXIpO1xyXG5cclxuICAgICAgICAgdGhpcy5fc2VyaWFsaXplciA9IG5ldyBFbnZlbG9wU2VyaWFsaXplcihlbnZpcm9ubWVudC5hcGlLZXkpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZW5kKGJhdGNoOiBCYXRjaCk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgIGNvbnN0IGJvZHkgPSB0aGlzLnNlcmlhbGl6ZShiYXRjaCk7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLl9hamF4LnNlbmQoe1xyXG4gICAgICAgICAgICB0eXBlOiAnUE9TVCcsXHJcbiAgICAgICAgICAgIHVybDogYCR7dGhpcy5fY29uZmlnLnVybH0vdjJfMT9wPWpzJnY9JHtlbmNvZGVVUklDb21wb25lbnQoVmVyc2lvbil9JnQ9JHt0aGlzLl90aW1lc3RhbXAubm93KCl9YCxcclxuICAgICAgICAgICAgYm9keSxcclxuICAgICAgICAgICAgdGltZW91dDogdGhpcy5fY29uZmlnLnRpbWVvdXRcclxuICAgICAgICB9KSBhcyBQcm9taXNlPGFueT47XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzZXJpYWxpemUoYmF0Y2g6IEJhdGNoKTogc3RyaW5nIHtcclxuICAgICAgICBsZXQgbGluZXMgPSB0aGlzLmF1ZGl0KGJhdGNoKTtcclxuICAgICAgICBsaW5lcyArPSBgXFxuXFxue31cXG5gO1xyXG4gICAgICAgIGZvciAoY29uc3QgZW52ZWxvcCBvZiBiYXRjaC5lbnZlbG9wcykge1xyXG4gICAgICAgICAgICBsaW5lcyArPSB0aGlzLl9zZXJpYWxpemVyLnNlcmlhbGl6ZShlbnZlbG9wKSArICdcXG4nO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbGluZXM7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBhdWRpdChiYXRjaDogQmF0Y2gpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShiYXRjaC5hdWRpdHMgfHwge30pO1xyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBFbnZlbG9wU2VyaWFsaXplciB7XHJcbiAgICBwcml2YXRlIHN0YXRpYyBNZXNzYWdlVHlwZXM6IHtba2V5IGluIE1lc3NhZ2VUeXBlIHwgJ2RlZmF1bHQnXTogbnVtYmVyIH0gPSB7XHJcbiAgICAgICAgbWVhc3VyZW1lbnQgOiAwLFxyXG4gICAgICAgIGxvZyA6IDIsXHJcbiAgICAgICAgZGVmYXVsdDogMVxyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IF9hcGlLZXk6IHN0cmluZ1xyXG4gICAgKSB7IH1cclxuXHJcbiAgICBwdWJsaWMgc2VyaWFsaXplKGVudmVsb3A6IElFbnZlbG9wKTogc3RyaW5nICB7XHJcbiAgICAgICAgY29uc3QgcGFydHMgPSBuZXcgQXJyYXk8c3RyaW5nPigpO1xyXG5cclxuICAgICAgICBwYXJ0cy5wdXNoKChlbnZlbG9wLnRpbWVzdGFtcCB8fCAwKS50b1N0cmluZygpKTsgLy8gdGltZVN0YW1wXHJcbiAgICAgICAgcGFydHMucHVzaCh0aGlzLl9hcGlLZXkpOyAvLyBhcGlrZXlcclxuICAgICAgICBwYXJ0cy5wdXNoKGVudmVsb3AubmFtZSk7IC8vIG1lc3NhZ2VfbmFtZVxyXG4gICAgICAgIHBhcnRzLnB1c2goJycpOyAvLyBwYXJ0aXRpb25fa2V5XHJcbiAgICAgICAgcGFydHMucHVzaCh0aGlzLnR5cGUoZW52ZWxvcCkpOyAvLyBtZXNzYWdlIHR5cGVcclxuICAgICAgICBwYXJ0cy5wdXNoKGVudmVsb3AuaWQpOyAvLyB1dWlkXHJcbiAgICAgICAgcGFydHMucHVzaChKU09OLnN0cmluZ2lmeShlbnZlbG9wLm1lc3NhZ2UsIHRoaXMudmFsdWVGaWx0ZXIpKTsgLy8gcGF5bG9hZFxyXG5cclxuICAgICAgICByZXR1cm4gcGFydHMuam9pbignLCcpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgdHlwZShlbnZlbG9wOiBJRW52ZWxvcCk6IHN0cmluZyB7XHJcbiAgICAgICAgbGV0IGluZGV4ID0gRW52ZWxvcFNlcmlhbGl6ZXIuTWVzc2FnZVR5cGVzW2VudmVsb3AudHlwZV07XHJcblxyXG4gICAgICAgIGluZGV4ID0gaW5kZXggPT09IHVuZGVmaW5lZCA/IEVudmVsb3BTZXJpYWxpemVyLk1lc3NhZ2VUeXBlc1snZGVmYXVsdCddIDogaW5kZXg7XHJcblxyXG4gICAgICAgIHJldHVybiBpbmRleC50b1N0cmluZygpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgdmFsdWVGaWx0ZXIgPSAoa2V5OiBzdHJpbmcsIHZhbHVlOiBhbnkpOiBhbnkgPT4ge1xyXG4gICAgICAgIGlmICh2YWx1ZSA9PT0gbnVsbFxyXG4gICAgICAgICAgICB8fCAodHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJyAmJiBpc05hTih2YWx1ZSkpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdmFsdWU7XHJcbiAgICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL2lmZGVmLWxvYWRlci9pZmRlZi1sb2FkZXIuanM/REVCVUc9dHJ1ZSZQRVJGT1JNQU5DRV9BVURJVD10cnVlIS4vc3JjL3Byb2Nlc3NpbmcvZW5kcG9pbnRzL2ZlLWFuYWx5dGljcy1jb2xsZWN0b3IvZmUtYW5hbHl0aWNzLWNvbGxlY3Rvci1lbmRwb2ludC50cyIsIi8qKlxyXG4gKiBWZXJzaW9uIG9mIHRoZSBsaWJyYXJ5XHJcbiAqXHJcbiAqIFRoaXMgZmlsZSBpcyBlZGl0ZWQgaW4gVGVhbUNpdHkgc2VydmVyIGJlZm9yZSBlYWNoIGJ1aWxkLlxyXG4gKlxyXG4gKiBAaW50ZXJuYWxcclxuICovXHJcbmV4cG9ydCBjb25zdCBWZXJzaW9uID0gJzAuMC4xJztcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL2lmZGVmLWxvYWRlci9pZmRlZi1sb2FkZXIuanM/REVCVUc9dHJ1ZSZQRVJGT1JNQU5DRV9BVURJVD10cnVlIS4vc3JjL3ZlcnNpb24udHMiLCJpbXBvcnQgeyBvdmVycmlkZSB9IGZyb20gJy4uL2ZyYW1ld29yay9pbmRleCc7XHJcbmltcG9ydCB7IElQaXBlU3RhdHNSZXBvc2l0b3J5IH0gZnJvbSAnLi9hdWRpdC9zdGF0cy9waXBlLXN0YXRzJztcclxuXHJcbi8qKlxyXG4gKiBDb25maWd1cmF0aW9ucyBmb3IgRmx1c2hUaW1lXHJcbiAqL1xyXG5leHBvcnQgaW50ZXJmYWNlIElGbHVzaFRpbWVDb25maWd1cmF0aW9uIHtcclxuICAgIC8qKlxyXG4gICAgICogVGltZSBpbnRlcnZhbCB0byBzZW5kIGRhdGEgZnJvbSB0aGUgcXVldWUgdG8gYW4gZW5kcG9pbnRcclxuICAgICAqL1xyXG4gICAgZmx1c2hUaW1lPzogbnVtYmVyO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogTWF4aW11bSBmbHVzaCB0aW1lIHRoYXQgYWxsb3dlZCBmb3IgdGhpcyBxdWV1ZVxyXG4gICAgICovXHJcbiAgICBtYXhGbHVzaFRpbWU/OiBudW1iZXI7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDbGFzcyBkZWZpbmUgZGVhZnVsdCB2YWx1ZXMgZm9yIGNvbmZpZ3VyYXRpb25zXHJcbiAqXHJcbiAqIEBpbnRlcm5hbFxyXG4gKi9cclxuY2xhc3MgRmx1c2hUaW1lQ29uZmlndXJhdGlvbiBpbXBsZW1lbnRzIElGbHVzaFRpbWVDb25maWd1cmF0aW9uIHtcclxuICAgIHB1YmxpYyBmbHVzaFRpbWU6IG51bWJlciA9IDEwMDA7XHJcblxyXG4gICAgcHVibGljIG1heEZsdXNoVGltZTogbnVtYmVyID0gMzAwMDA7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUZsdXNoVGltZVN0cmF0ZWd5IHtcclxuICAgIGR1cmF0aW9uKCk6IFByb21pc2U8bnVtYmVyPjtcclxuXHJcbiAgICBzeW5jVGltZSgpOiBudW1iZXI7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBEeW5hbWljRmx1c2hUaW1lU3RyYXRlZ3kgaW1wbGVtZW50cyBJRmx1c2hUaW1lU3RyYXRlZ3kge1xyXG4gICAgcHJvdGVjdGVkIHJlYWRvbmx5IF9jb25maWc6IEZsdXNoVGltZUNvbmZpZ3VyYXRpb24gPSBuZXcgRmx1c2hUaW1lQ29uZmlndXJhdGlvbigpO1xyXG5cclxuICAgIHByaXZhdGUgX2xhc3RGbHVzaFRpbWU6IG51bWJlcjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IF9yZXBvOiBJUGlwZVN0YXRzUmVwb3NpdG9yeSxcclxuICAgICAgICByZWFkb25seSBjb25maWc6IElGbHVzaFRpbWVDb25maWd1cmF0aW9uIHwgbnVsbCA9IG51bGxcclxuICAgICkge1xyXG4gICAgICAgIG92ZXJyaWRlKHRoaXMuX2NvbmZpZywgY29uZmlnKTtcclxuICAgICAgICB0aGlzLl9sYXN0Rmx1c2hUaW1lID0gdGhpcy5fY29uZmlnLmZsdXNoVGltZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYXN5bmMgZHVyYXRpb24oKTogUHJvbWlzZTxudW1iZXI+IHtcclxuICAgICAgICBjb25zdCBzdGF0cyA9IGF3YWl0IHRoaXMuX3JlcG8ucmVhZCgpO1xyXG4gICAgICAgIGxldCBmbHVzaFRpbWU7XHJcbiAgICAgICAgaWYgKCFzdGF0cy5zdGF0aXN0aWMubGFzdFNlbmRpbmdTdWNjZXNzKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGZhY3RvciA9IE1hdGgubWF4KHN0YXRzLnN0YXRpc3RpYy5yZXF1ZXN0RXJyb3JDb3VudCwgMSk7XHJcbiAgICAgICAgICAgIGZsdXNoVGltZSA9IE1hdGgubWluKHRoaXMuX2NvbmZpZy5mbHVzaFRpbWUgKiBmYWN0b3IsIHRoaXMuX2NvbmZpZy5tYXhGbHVzaFRpbWUpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGZsdXNoVGltZSA9IHRoaXMuX2NvbmZpZy5mbHVzaFRpbWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLl9sYXN0Rmx1c2hUaW1lID0gZmx1c2hUaW1lO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzeW5jVGltZSgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiBNYXRoLm1heCh0aGlzLl9sYXN0Rmx1c2hUaW1lICogMjAsIHRoaXMuX2NvbmZpZy5tYXhGbHVzaFRpbWUgKyA1KTtcclxuICAgIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvaWZkZWYtbG9hZGVyL2lmZGVmLWxvYWRlci5qcz9ERUJVRz10cnVlJlBFUkZPUk1BTkNFX0FVRElUPXRydWUhLi9zcmMvcHJvY2Vzc2luZy9mbHVzaC10aW1lLXN0cmF0ZWd5LnRzIiwiaW1wb3J0IHsgR3VpZFByb3ZpZGVyIH0gZnJvbSAnLi9ndWlkJztcclxuaW1wb3J0IHsgVW5sb2FkRXZlbnQgfSBmcm9tICcuL3VubG9hZC1ldmVudCc7XHJcbmltcG9ydCB7IFdlYlN0b3JhZ2VzIH0gZnJvbSAnLi93ZWJzdG9yYWdlJztcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSVN5bmNQb2ludCB7XHJcbiAgICAvKipcclxuICAgICAqIENhcHR1cmUgdGhlIGN1cnJlbnQgYWN0aXZpdHkgZnJvbSBhbGwgdGFiXHJcbiAgICAgKi9cclxuICAgIGNhcHR1cmUoZHVyYXRpb246IG51bWJlcik6IGJvb2xlYW47XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBVbmNhcHR1cmUgY3VycmVudCB0dWIgaWYgaXQgaXMgYWN0aXZlXHJcbiAgICAgKi9cclxuICAgIGRpc3Bvc2UoKTogdm9pZDtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIExvY2FsU3RvcmFnZVRhYlN5bmNQb2ludCBpbXBsZW1lbnRzIElTeW5jUG9pbnQge1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgdGFiSWQgPSBHdWlkUHJvdmlkZXIuZGVmYXVsdC5uZXh0KCk7XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgYWxsWUtleXM6IHsgW3lLZXk6IHN0cmluZ106IGJvb2xlYW4gfSA9IHsgfTtcclxuICAgIHByaXZhdGUgc3RhdGljIHN1YnNjcmliZWQ6IGJvb2xlYW47XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9rZXlzOiBJTXV0ZXhLZXlzO1xyXG4gICAgcHJpdmF0ZSBfaXNDYXB0dXJlZDogYm9vbGVhbjtcclxuICAgIHByaXZhdGUgX2Rpc3Bvc2VkOiBib29sZWFuO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHB1YmxpYyB0YXNrSWQ6IHN0cmluZyxcclxuICAgICAgICBwcml2YXRlIF9zdG9yYWdlOiBTdG9yYWdlIHwgbnVsbCA9IFdlYlN0b3JhZ2VzLmxvY2FsU3RvcmFnZVxyXG4gICAgKSB7XHJcbiAgICAgICAgdGhpcy5fa2V5cyA9IHtcclxuICAgICAgICAgICAgeDogJ21janMtbXV0ZXgteDonICsgdGFza0lkLFxyXG4gICAgICAgICAgICB5OiAnbWNqcy1tdXRleC15OicgKyB0YXNrSWRcclxuICAgICAgICB9O1xyXG4gICAgICAgIGlmICh0aGlzLl9zdG9yYWdlICYmICFMb2NhbFN0b3JhZ2VUYWJTeW5jUG9pbnQuc3Vic2NyaWJlZCkge1xyXG4gICAgICAgICAgICBMb2NhbFN0b3JhZ2VUYWJTeW5jUG9pbnQuc3Vic2NyaWJlKHRoaXMuX3N0b3JhZ2UpO1xyXG4gICAgICAgICAgICBMb2NhbFN0b3JhZ2VUYWJTeW5jUG9pbnQuc3Vic2NyaWJlZCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2FwdHVyZSB0YXNrIElEIGJldHdlZW4gYWxsIG9wZW5lZCB0YWJzIG9mIHRoZSBjdXJyZW50IGRvbWFpbi5cclxuICAgICAqIE9uIHVubnVjY2Vzc2FibGUgbG9jYWxTdG9yYWdlIHJldHVybiB0cnVlO1xyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB0YXNrSWQgLSBVbmlxdWUgdGFzayBJRFxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IFtkdXJhdGlvbj0yMDAwMF0gLSBNYXhpbXVtIHRpbWUgZm9yIGNhcHR1cmUgdGhlIGFjdGl2YXRpb24gaW4gbXNcclxuICAgICAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIGN1cnJlbnQgdGFiIGlzIGFjdGl2ZSBmb3IgdGhlIHRhc2tcclxuICAgICAqL1xyXG4gICAgcHVibGljIGNhcHR1cmUoZHVyYXRpb246IG51bWJlciA9IDEwMDAgKiAyMCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGlmICghdGhpcy5fc3RvcmFnZSB8fCB0aGlzLl9kaXNwb3NlZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHN0b3JhZ2UgPSB0aGlzLl9zdG9yYWdlO1xyXG5cclxuICAgICAgICBjb25zdCBtdXRleFhLZXkgPSB0aGlzLl9rZXlzLng7XHJcbiAgICAgICAgY29uc3QgbXV0ZXhZS2V5ID0gdGhpcy5fa2V5cy55O1xyXG5cclxuICAgICAgICBjb25zdCB0YWJJZCA9IExvY2FsU3RvcmFnZVRhYlN5bmNQb2ludC50YWJJZDtcclxuICAgICAgICBjb25zdCBub3cgPSArbmV3IERhdGUoKTtcclxuXHJcbiAgICAgICAgc3RvcmFnZS5zZXRJdGVtKG11dGV4WEtleSwgdGFiSWQpO1xyXG4gICAgICAgIGNvbnN0IHN0clkgPSBzdG9yYWdlLmdldEl0ZW0obXV0ZXhZS2V5KTtcclxuICAgICAgICBjb25zdCBtdXRleFkgPSBzdHJZID8gSlNPTi5wYXJzZShzdHJZKSBhcyBJTXV0ZXhEYXRhIDogbnVsbDtcclxuXHJcbiAgICAgICAgY29uc3QgZHVyID0gbXV0ZXhZID8gTWF0aC5hYnMobm93IC0gbXV0ZXhZLnRpbWUpIDogTmFOO1xyXG4gICAgICAgIGNvbnN0IGNhcHR1cmVkID0gIW11dGV4WSB8fCBtdXRleFkuaWQgPT09IHRhYklkIHx8IGR1ciA+IGR1cmF0aW9uO1xyXG5cclxuICAgICAgICBpZiAoY2FwdHVyZWQpIHtcclxuICAgICAgICAgICAgY29uc3QgdmFsID0gSlNPTi5zdHJpbmdpZnkoeyBpZDogdGFiSWQsIHRpbWU6IG5vdyB9IGFzIElNdXRleERhdGEpO1xyXG4gICAgICAgICAgICBzdG9yYWdlLnNldEl0ZW0obXV0ZXhZS2V5LCB2YWwpO1xyXG4gICAgICAgICAgICBMb2NhbFN0b3JhZ2VUYWJTeW5jUG9pbnQuYWxsWUtleXNbdGhpcy5fa2V5cy55XSA9IHRydWU7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgTG9jYWxTdG9yYWdlVGFiU3luY1BvaW50LmFsbFlLZXlzW3RoaXMuX2tleXMueV0gPSBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX2lzQ2FwdHVyZWQgPSBjYXB0dXJlZCAmJiAoc3RvcmFnZS5nZXRJdGVtKG11dGV4WEtleSkgPT09IHRhYklkKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lzQ2FwdHVyZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGRpc3Bvc2UoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX3N0b3JhZ2UgJiYgdGhpcy5faXNDYXB0dXJlZCAmJiAhdGhpcy5fZGlzcG9zZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5fc3RvcmFnZS5yZW1vdmVJdGVtKHRoaXMuX2tleXMueSk7XHJcbiAgICAgICAgICAgIHRoaXMuX2lzQ2FwdHVyZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5fZGlzcG9zZWQgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bWVtYmVyLW9yZGVyaW5nXHJcbiAgICBwcml2YXRlIHN0YXRpYyBzdWJzY3JpYmUoc3RvcmFnZTogU3RvcmFnZSkge1xyXG4gICAgICAgIFVubG9hZEV2ZW50LmFkZExpc3RlbmVyKCgpID0+IHtcclxuICAgICAgICAgICAgTG9jYWxTdG9yYWdlVGFiU3luY1BvaW50LnVuY2FwdHVyZUFsbChzdG9yYWdlKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bWVtYmVyLW9yZGVyaW5nXHJcbiAgICBwdWJsaWMgc3RhdGljIHVuY2FwdHVyZUFsbChzdG9yYWdlOiBTdG9yYWdlKSB7XHJcbiAgICAgICAgY29uc3Qga2V5cyA9IExvY2FsU3RvcmFnZVRhYlN5bmNQb2ludC5hbGxZS2V5cztcclxuICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiBrZXlzKSB7XHJcbiAgICAgICAgICAgIGlmIChrZXlzLmhhc093blByb3BlcnR5KGtleSkgJiYga2V5c1trZXldKSB7XHJcbiAgICAgICAgICAgICAgICBzdG9yYWdlLnJlbW92ZUl0ZW0oa2V5KTtcclxuICAgICAgICAgICAgICAgIGtleXNba2V5XSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5pbnRlcmZhY2UgSU11dGV4RGF0YSB7XHJcbiAgICBpZDogc3RyaW5nO1xyXG5cclxuICAgIHRpbWU6IG51bWJlcjtcclxufVxyXG5cclxuaW50ZXJmYWNlIElNdXRleEtleXMge1xyXG4gICAgeDogc3RyaW5nO1xyXG5cclxuICAgIHk6IHN0cmluZztcclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvaWZkZWYtbG9hZGVyL2lmZGVmLWxvYWRlci5qcz9ERUJVRz10cnVlJlBFUkZPUk1BTkNFX0FVRElUPXRydWUhLi9zcmMvZnJhbWV3b3JrL3RhYi1zeW5jLXBvaW50LnRzIiwiaW1wb3J0IHsgSUVudmVsb3BRdWV1ZSB9IGZyb20gJy4uLy4uL2VudmVsb3AtcXVldWUnO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJUGlwZVN0YXRzUHJvdmlkZXIge1xyXG4gICAgZ2V0KHF1ZXVlOiBJRW52ZWxvcFF1ZXVlKTogSVBpcGVTdGF0c1JlcG9zaXRvcnk7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSVBpcGVTdGF0c1JlcG9zaXRvcnkge1xyXG4gICAgcmVhZCgpOiBQcm9taXNlPElQaXBlU3RhdHM+O1xyXG5cclxuICAgIHVwZGF0ZTxUPihhY3Rpb246IChzdGF0czogSVBpcGVTdGF0cykgPT4gVCk6IFByb21pc2U8VD47XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSVBpcGVQZXJzaXN0ZW50U3RhdHMge1xyXG4gICAgLyoqXHJcbiAgICAgKiBVbmlxdWUgQ2xpZW50IElkXHJcbiAgICAgKi9cclxuICAgIHJlYWRvbmx5IGNsaWVudElkOiBzdHJpbmc7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBRdWV1ZSBuYW1lIGZyb20gY29uZmlndXJhdGlvblxyXG4gICAgICovXHJcbiAgICByZWFkb25seSBxdWV1ZUlkOiBzdHJpbmc7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBJbmNyZW1lbnRhbCBudW1iZXIsIHVuaXF1ZSBmb3IgQ2xpZW50SWRcclxuICAgICAqL1xyXG4gICAgYmF0Y2hJbmRleDogbnVtYmVyO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVG90YWwgTWVzc2FnZSBDb3VudCAoaGlzdG9yaWNhbCBwZXIgQ2xpZW50SUQgYW5kIFF1ZXVlSUQpXHJcbiAgICAgKi9cclxuICAgIHRvdGFsTWVzc2FnZUNvdW50OiBudW1iZXI7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUb3RhbCBSZXF1ZXN0IEVycm9yIENvdW50IChoaXN0b3JpY2FsIHBlciBDbGllbnRJRCBhbmQgUXVldWVJRClcclxuICAgICAqL1xyXG4gICAgdG90YWxSZXF1ZXN0RXJyb3JDb3VudDogbnVtYmVyO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVxdWVzdCBFcnJvciBDb3VudCAoc2NpZW5jZSBsYXN0IHN1Y2Nlc3MpXHJcbiAgICAgKi9cclxuICAgIHJlcXVlc3RFcnJvckNvdW50OiBudW1iZXI7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBMYXN0IGVycm9yIGlzIHN1Y2Nlc3NcclxuICAgICAqL1xyXG4gICAgbGFzdFNlbmRpbmdTdWNjZXNzOiBib29sZWFuO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElQaXBlU3RhdGUge1xyXG4gICAgLyoqXHJcbiAgICAgKiBRdWV1ZSBTaXplIChtYXhpbXVtIGFsbG93ZWQgbWVzc2FnZSBjb3VudCBpbiB0aGUgcXVldWUpXHJcbiAgICAgKi9cclxuICAgIHJlYWRvbmx5IHF1ZXVlU2l6ZTogbnVtYmVyO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUXVldWUgTWVzc2FnZSBDb3VudCAoY3VycmVudCBtZXNzYWdlIGNvdW50IGluIHRoZSBxdWV1ZSlcclxuICAgICAqL1xyXG4gICAgcmVhZG9ubHkgcXVldWVNZXNzYWdlQ291bnQ6IG51bWJlcjtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJUGlwZVN0YXRzIHtcclxuICAgIHJlYWRvbmx5IHN0YXRlOiBJUGlwZVN0YXRlO1xyXG5cclxuICAgIHJlYWRvbmx5IHN0YXRpc3RpYzogSVBpcGVQZXJzaXN0ZW50U3RhdHM7XHJcbn1cclxuXHJcbmV4cG9ydCBlbnVtIEFqYXhSZXF1ZXN0U3RhdHVzUmVzdWx0IHtcclxuICAgIFN1Y2Nlc3MgPSAwLFxyXG5cclxuICAgIE5ldHdvcmtFcnJvciA9IDFcclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvaWZkZWYtbG9hZGVyL2lmZGVmLWxvYWRlci5qcz9ERUJVRz10cnVlJlBFUkZPUk1BTkNFX0FVRElUPXRydWUhLi9zcmMvcHJvY2Vzc2luZy9hdWRpdC9zdGF0cy9waXBlLXN0YXRzLnRzIiwiaW1wb3J0IHsgSUFqYXhPcHRpb25zLCBJQWpheFByb3ZpZGVyIH0gZnJvbSAnLi4vLi4vZnJhbWV3b3JrJztcclxuaW1wb3J0IHsgV29ya2VyUmVxdWVzdFNlbmRlciB9IGZyb20gJy4uLy4uL3dvcmtlcnMvc2VuZGVycy93b3JrZXItcmVxdWVzdC1zZW5kZXInO1xyXG5pbXBvcnQgeyBDb250ZXh0IH0gZnJvbSAnLi4vY29udGV4dCc7XHJcblxyXG4vKipcclxuICogUmVzZW5kIGFsbCByZXF1ZXN0IHRvIGEgcG9ydFxyXG4gKlxyXG4gKiBAaW50ZXJuYWxcclxuICogQGNsYXNzIFBvcnRBamF4UHJvdmlkZXJcclxuICogQGltcGxlbWVudHMge0lBamF4UHJvdmlkZXJ9XHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgUG9ydEFqYXhQcm92aWRlciBpbXBsZW1lbnRzIElBamF4UHJvdmlkZXIge1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfc2VuZGVyOiBXb3JrZXJSZXF1ZXN0U2VuZGVyPCdhamF4JywgSUFqYXhPcHRpb25zLCBzdHJpbmc+O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgX2NvbnRleHQ6IENvbnRleHQsXHJcbiAgICApIHtcclxuICAgICAgICB0aGlzLl9zZW5kZXIgPSBuZXcgV29ya2VyUmVxdWVzdFNlbmRlcignYWpheCcsIHRoaXMuX2NvbnRleHQuc2VuZGVyLCB0aGlzLl9jb250ZXh0LnJlY2VpdmVyKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYXN5bmMgc2VuZChvcHRpb25zOiBJQWpheE9wdGlvbnMpOiBQcm9taXNlPHN0cmluZz4ge1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZTxzdHJpbmc+KChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5fc2VuZGVyLnNlbmQob3B0aW9ucywgcmVzb2x2ZSwgcmVqZWN0KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvaWZkZWYtbG9hZGVyL2lmZGVmLWxvYWRlci5qcz9ERUJVRz10cnVlJlBFUkZPUk1BTkNFX0FVRElUPXRydWUhLi9zcmMvcHJvY2Vzc2luZy9idWlsZGVycy9wb3J0LWFqYXgtcHJvdmlkZXIudHMiLCJpbXBvcnQgeyBJV29ya2VyTWVzc2FnZVJlY2VpdmVyLCBJV29ya2VyTWVzc2FnZVNlbmRlciB9IGZyb20gJy4uL3dvcmtlcnMvd29ya2VyLWRlZmluaXRpb25zJztcclxuXHJcbmV4cG9ydCBjbGFzcyBDb250ZXh0IHtcclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBzZW5kZXI6IElXb3JrZXJNZXNzYWdlU2VuZGVyLFxyXG4gICAgICAgIHB1YmxpYyByZWFkb25seSByZWNlaXZlcjogSVdvcmtlck1lc3NhZ2VSZWNlaXZlclxyXG4gICAgKSB7fVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy9pZmRlZi1sb2FkZXIvaWZkZWYtbG9hZGVyLmpzP0RFQlVHPXRydWUmUEVSRk9STUFOQ0VfQVVESVQ9dHJ1ZSEuL3NyYy9wcm9jZXNzaW5nL2NvbnRleHQudHMiLCJpbXBvcnQgeyBJTWVzc2FnZSB9IGZyb20gJy4uL2RlZmluaXRpb25zJztcclxuaW1wb3J0IHsgaXNBc3luY0FsbCB9IGZyb20gJy4uL2ZyYW1ld29yay9zeW5jJztcclxuaW1wb3J0IHsgSU1lc3NlbmdlclBlcmZvcm1hbmNlQXVkaXRvciwgSU1lc3NlbmdlclN0YXRpc3RpY0F1ZGl0b3IgfSBmcm9tICcuL2F1ZGl0L2F1ZGl0b3JzL21lc3Nlbmdlcic7XHJcbmltcG9ydCB7IEVudmVsb3AgfSBmcm9tICcuL2VudmVsb3AnO1xyXG5pbXBvcnQgeyBJRW52ZWxvcFF1ZXVlIH0gZnJvbSAnLi9lbnZlbG9wLXF1ZXVlJztcclxuaW1wb3J0IHsgSVBvc3RtYW4gfSBmcm9tICcuL3Bvc3RtYW4nO1xyXG5pbXBvcnQgeyBJUm91dGVyIH0gZnJvbSAnLi9yb3V0ZXInO1xyXG5cclxuLyoqXHJcbiAqIEBpbnRlcm5hbFxyXG4gKiBAY2xhc3MgTWVzc2VuZ2VyXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgTWVzc2VuZ2VyIHtcclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgX3JvdXRlcjogSVJvdXRlcixcclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IF9wb3N0bWFzdGVyOiBJUG9zdG1hbixcclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IF9zdGF0aXN0aWNBdWRpdG9yOiBJTWVzc2VuZ2VyU3RhdGlzdGljQXVkaXRvcixcclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IF9wZXJmb3JtYW5jZUF1ZGl0b3I6IElNZXNzZW5nZXJQZXJmb3JtYW5jZUF1ZGl0b3IsXHJcbiAgICApIHsgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2VuZCBhbGwgdXNlciBtZXNzYWdlcyB0byB0aGUgZGVzdGluYXRpb25zIHF1ZXVlc1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYXN5bmMgc2VuZChtZXNzYWdlczogQXJyYXk8SU1lc3NhZ2U+KTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgY29uc3QgYXVkaXRvciA9IHRoaXMuX3BlcmZvcm1hbmNlQXVkaXRvci5zdGFydGVkKCk7XHJcblxyXG4gICAgICAgIC8vIEdyb3VwIG9mIGVudmVsb3BzIGJ5IHRoZWlyIGRlc3RpbmF0aW9uIHF1ZXVlXHJcbiAgICAgICAgY29uc3QgZ3JvdXAgPSBuZXcgTWFwPElFbnZlbG9wUXVldWUsIEFycmF5PEVudmVsb3A+PigpO1xyXG5cclxuICAgICAgICBmb3IgKGNvbnN0IG1lc3NhZ2Ugb2YgbWVzc2FnZXMpIHtcclxuICAgICAgICAgICAgLy8gU2VhbCB0aGUgbWVzc2FnZVxyXG4gICAgICAgICAgICBjb25zdCBlbnZlbG9wID0gdGhpcy5fcG9zdG1hc3Rlci5zZWFsKG1lc3NhZ2UpO1xyXG5cclxuICAgICAgICAgICAgLy8gRmluZCBxdWV1ZSBmb3IgdGhlIGVudmVsb3BcclxuICAgICAgICAgICAgY29uc3QgcXVldWUgPSB0aGlzLl9yb3V0ZXIucm91dGUoZW52ZWxvcCk7XHJcblxyXG4gICAgICAgICAgICBpZiAocXVldWUpIHtcclxuICAgICAgICAgICAgICAgIC8vIFB1dCBlbnZlbG9wIHRvIGl0cyBxdWV1ZSBncm91cFxyXG4gICAgICAgICAgICAgICAgbGV0IGVudmVsb3BzID0gZ3JvdXAuZ2V0KHF1ZXVlKTtcclxuICAgICAgICAgICAgICAgIGlmIChlbnZlbG9wcykge1xyXG4gICAgICAgICAgICAgICAgICAgIGVudmVsb3BzLnB1c2goZW52ZWxvcCk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGVudmVsb3BzID0gWyBlbnZlbG9wIF07XHJcbiAgICAgICAgICAgICAgICAgICAgZ3JvdXAuc2V0KHF1ZXVlLCBlbnZlbG9wcyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IGVucXVpbmdzID0gbmV3IEFycmF5PEFycmF5PFByb21pc2U8dm9pZD4gfCB2b2lkPj4oKTtcclxuXHJcbiAgICAgICAgZm9yIChjb25zdCBxdWV1ZSBvZiBncm91cC5rZXlzKCkpIHtcclxuICAgICAgICAgICAgY29uc3QgZW52ZWxvcHMgPSBncm91cC5nZXQocXVldWUpO1xyXG4gICAgICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cclxuICAgICAgICAgICAgaWYgKGVudmVsb3BzKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBlbnF1aXVpbmcgPSBxdWV1ZS5lbnF1ZXVlKGVudmVsb3BzKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHN0YXRpc3RpbmcgPSB0aGlzLl9zdGF0aXN0aWNBdWRpdG9yLmVucXVldWVkKHF1ZXVlLmlkLCBlbnZlbG9wcyk7XHJcblxyXG4gICAgICAgICAgICAgICAgZW5xdWluZ3MucHVzaChbZW5xdWl1aW5nLCBzdGF0aXN0aW5nXSk7XHJcblxyXG4gICAgICAgICAgICAgICAgYXVkaXRvci5lbnF1ZXVlZChxdWV1ZS5pZCwgZW52ZWxvcHMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBBd2FpdCBhbGwgb3BlcmF0aW9ucyBvbmx5IGlmIHRoZXkgYXJlIGFzeW5jaHJvbm91c1xyXG4gICAgICAgIGZvciAoY29uc3QgcHJvbWlzZXMgb2YgZW5xdWluZ3MpIHtcclxuICAgICAgICAgICAgaWYgKGlzQXN5bmNBbGwocHJvbWlzZXMpKSB7XHJcbiAgICAgICAgICAgICAgICBhd2FpdCBQcm9taXNlLmFsbChlbnF1aW5ncyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGF1ZGl0b3IuY29tcGxldGVkKCk7XHJcbiAgICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL2lmZGVmLWxvYWRlci9pZmRlZi1sb2FkZXIuanM/REVCVUc9dHJ1ZSZQRVJGT1JNQU5DRV9BVURJVD10cnVlIS4vc3JjL3Byb2Nlc3NpbmcvbWVzc2VuZ2VyLnRzIiwiZXhwb3J0IGZ1bmN0aW9uIHN5bmM8VD4ocmVzdWx0OiBQcm9taXNlPFQ+IHwgVCk6IFQgfCB1bmRlZmluZWQge1xyXG4gICAgaWYgKHJlc3VsdCBpbnN0YW5jZW9mIFByb21pc2UpIHtcclxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGlzQXN5bmNBbGwocmVzdWx0czogQXJyYXk8UHJvbWlzZTx2b2lkPiB8IHZvaWQ+KTogYm9vbGVhbiB7XHJcbiAgICBmb3IgKGNvbnN0IHJlc3VsdCBvZiByZXN1bHRzKSB7XHJcbiAgICAgICAgaWYgKHJlc3VsdCBpbnN0YW5jZW9mIFByb21pc2UpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy9pZmRlZi1sb2FkZXIvaWZkZWYtbG9hZGVyLmpzP0RFQlVHPXRydWUmUEVSRk9STUFOQ0VfQVVESVQ9dHJ1ZSEuL3NyYy9mcmFtZXdvcmsvc3luYy50cyIsImltcG9ydCB7IElNZXNzYWdlQ29uZmlndXJhdGlvbiwgSU1lc3NhZ2VzQ29uZmlndXJhdGlvbiB9IGZyb20gJy4uL2NvbmZpZ3VyYXRpb25zL21lc3NhZ2VzLWNvbmZpZ3VyYXRpb24nO1xyXG5pbXBvcnQgeyBJRW52ZWxvcCB9IGZyb20gJy4vZW52ZWxvcCc7XHJcbmltcG9ydCB7IElFbnZlbG9wUXVldWUgfSBmcm9tICcuL2VudmVsb3AtcXVldWUnO1xyXG5cclxuLyoqXHJcbiAqIFJvdXRlciBzaG91bGQgc2VsZWN0IHF1ZXVlIGZvciBlbnZlbG9wXHJcbiAqXHJcbiAqIEBpbnRlcm5hbFxyXG4gKiBAaW50ZXJmYWNlIElSb3V0ZXJcclxuICovXHJcbmV4cG9ydCBpbnRlcmZhY2UgSVJvdXRlciB7XHJcbiAgICAvKipcclxuICAgICAqIFJldHVybiBxdWV1ZSBmb3IgdGhlIGVudmVsb3AuXHJcbiAgICAgKiBJZiBxdWV1ZSBpcyBub3QgZm91bmQgLSByZXR1cm4gZGVmYXVsdCBvciBhbnkgb3RoZXIgcXVldWVcclxuICAgICAqL1xyXG4gICAgcm91dGUoZW52ZWxvcDogSUVudmVsb3ApOiBJRW52ZWxvcFF1ZXVlIHwgdW5kZWZpbmVkO1xyXG59XHJcblxyXG4vKipcclxuICogUmVhbCBpbXBlbGVtZW50YXRpb24gb2YgSVJvdXRlclxyXG4gKlxyXG4gKiBAaW50ZXJuYWxcclxuICovXHJcbmV4cG9ydCBjbGFzcyBSb3V0ZXIgaW1wbGVtZW50cyBJUm91dGVyIHtcclxuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgZGVmYXVsdDogc3RyaW5nID0gJ2RlZmF1bHQnO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGljdGlvbmFyeSBvZiBtZXNzYWdlIGNvbmZpZ3VyYXRpb25zIGJ5IG1lc3NhZ2UgdHlwZVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9yb3V0ZXM6IE1hcDxzdHJpbmcsIEFycmF5PElNZXNzYWdlQ29uZmlndXJhdGlvbj4+O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIGNvbmZpZ3VyYXRpb246IElNZXNzYWdlc0NvbmZpZ3VyYXRpb24sXHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBfcXVldWVzOiBNYXA8c3RyaW5nLCBJRW52ZWxvcFF1ZXVlPlxyXG4gICAgKSB7XHJcbiAgICAgICAgdGhpcy5fcm91dGVzID0gTWVzc2FnZUNvbmZpZ3VyYXRpb25zLmNyZWF0ZVJvdXRlcyhjb25maWd1cmF0aW9uKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcm91dGUoZW52ZWxvcDogSUVudmVsb3ApOiBJRW52ZWxvcFF1ZXVlIHwgdW5kZWZpbmVkIHtcclxuICAgICAgICBjb25zdCBxdWV1ZUlkID0gdGhpcy5maW5kUXVldWUoZW52ZWxvcCkgfHwgUm91dGVyLmRlZmF1bHQ7XHJcblxyXG4gICAgICAgIGxldCBxdWV1ZSA9IHRoaXMuX3F1ZXVlcy5nZXQocXVldWVJZCk7XHJcblxyXG4gICAgICAgIGlmICghcXVldWUgJiYgdGhpcy5fcXVldWVzLnNpemUgPiAwKSB7XHJcbiAgICAgICAgICAgIHF1ZXVlID0gdGhpcy5fcXVldWVzLnZhbHVlcygpLm5leHQoKS52YWx1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBxdWV1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGZpbmRRdWV1ZShlbnZlbG9wOiBJRW52ZWxvcCk6IHN0cmluZyB8IG51bGwge1xyXG4gICAgICAgIGNvbnN0IGNvbmZpZ3MgPSB0aGlzLl9yb3V0ZXMuZ2V0KGVudmVsb3AudHlwZSk7XHJcblxyXG4gICAgICAgIGlmICghY29uZmlncyB8fCAhY29uZmlncy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmb3IgKGNvbnN0IGNvbmZpZyBvZiBjb25maWdzKSB7XHJcbiAgICAgICAgICAgIGlmICghY29uZmlnLnByb3BlcnRpZXMpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBjb25maWcucXVldWU7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5pc01hdGNoKGVudmVsb3AubWVzc2FnZSwgY29uZmlnLnByb3BlcnRpZXMpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNvbmZpZy5xdWV1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBpc01hdGNoKG1lc3NhZ2U6IGFueSwgcHJvcGVydGllczogYW55LCBkZWVwOiBudW1iZXIgPSAxMCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGlmIChkZWVwID09PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZm9yIChjb25zdCBuYW1lIGluIHByb3BlcnRpZXMpIHtcclxuICAgICAgICAgICAgaWYgKHByb3BlcnRpZXMuaGFzT3duUHJvcGVydHkobmFtZSkpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IG1lc3NhZ2VWYWx1ZSA9IG1lc3NhZ2VbbmFtZV07XHJcbiAgICAgICAgICAgICAgICBjb25zdCBjb25maWdWYWx1ZSA9IHByb3BlcnRpZXNbbmFtZV07XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiAobWVzc2FnZVZhbHVlKSA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIChjb25maWdWYWx1ZSkgPT09ICdvYmplY3QnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLmlzTWF0Y2gobWVzc2FnZVZhbHVlLCBjb25maWdWYWx1ZSwgZGVlcCAtIDEpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKG1lc3NhZ2VbbmFtZV0gIT09IHByb3BlcnRpZXNbbmFtZV0pIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIE1lc3NhZ2VDb25maWd1cmF0aW9ucyB7XHJcbiAgICBwdWJsaWMgc3RhdGljIGNyZWF0ZVJvdXRlcyhjb25maWd1cmF0aW9uOiBJTWVzc2FnZXNDb25maWd1cmF0aW9uKTogTWFwPHN0cmluZywgQXJyYXk8SU1lc3NhZ2VDb25maWd1cmF0aW9uPj4ge1xyXG4gICAgICAgIGNvbnN0IHJvdXRlcyA9IG5ldyBNYXA8c3RyaW5nLCBBcnJheTxJTWVzc2FnZUNvbmZpZ3VyYXRpb24+PigpO1xyXG5cclxuICAgICAgICBmb3IgKGNvbnN0IG1lc3NhZ2Ugb2YgY29uZmlndXJhdGlvbi5tZXNzYWdlcykge1xyXG4gICAgICAgICAgICBsZXQgbWVzc2FnZXMgPSByb3V0ZXMuZ2V0KG1lc3NhZ2UudHlwZSk7XHJcbiAgICAgICAgICAgIGlmIChtZXNzYWdlcykge1xyXG4gICAgICAgICAgICAgICAgbWVzc2FnZXMucHVzaChtZXNzYWdlKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2VzID0gW21lc3NhZ2VdO1xyXG4gICAgICAgICAgICAgICAgcm91dGVzLnNldChtZXNzYWdlLnR5cGUsIG1lc3NhZ2VzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gbmV3IE1hcDxzdHJpbmcsIEFycmF5PElNZXNzYWdlQ29uZmlndXJhdGlvbj4+KCk7XHJcbiAgICAgICAgcm91dGVzLmZvckVhY2goKG1lc3NhZ2VzLCB0eXBlKSA9PiB7XHJcbiAgICAgICAgICAgIG1lc3NhZ2VzID0gbWVzc2FnZXMuc29ydCgoYSwgYikgPT4gTWVzc2FnZUNvbmZpZ3VyYXRpb25zLndlaWdodChiLnByb3BlcnRpZXMpIC0gTWVzc2FnZUNvbmZpZ3VyYXRpb25zLndlaWdodChhLnByb3BlcnRpZXMpKTtcclxuICAgICAgICAgICAgcmVzdWx0LnNldCh0eXBlLCBtZXNzYWdlcyk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgd2VpZ2h0KHByb3BlcnRpZXM6IGFueSwgZGVlcDogbnVtYmVyID0gMTApOiBudW1iZXIge1xyXG4gICAgICAgIGlmICghcHJvcGVydGllcyB8fCBkZWVwIDw9IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgY291bnQgPSAwO1xyXG4gICAgICAgIGZvciAoY29uc3QgbmFtZSBpbiBwcm9wZXJ0aWVzKSB7XHJcbiAgICAgICAgICAgIGlmIChwcm9wZXJ0aWVzLmhhc093blByb3BlcnR5KG5hbWUpKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB2YWx1ZSA9IHByb3BlcnRpZXNbbmFtZV07XHJcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnb2JqZWN0Jykge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvdW50ICs9IHRoaXMud2VpZ2h0KHZhbHVlLCBkZWVwIC0gMSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvdW50Kys7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGNvdW50O1xyXG4gICAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy9pZmRlZi1sb2FkZXIvaWZkZWYtbG9hZGVyLmpzP0RFQlVHPXRydWUmUEVSRk9STUFOQ0VfQVVESVQ9dHJ1ZSEuL3NyYy9wcm9jZXNzaW5nL3JvdXRlci50cyIsIlxyXG5pbXBvcnQgeyBJRW52ZWxvcCB9IGZyb20gJy4uLy4uL2VudmVsb3AnO1xyXG5pbXBvcnQgeyBJQXVkaXRTZW5kZXIgfSBmcm9tICcuLi9zZW5kZXJzL2F1ZGl0LXNlbmRlcic7XHJcbmltcG9ydCB7IElNZXNzYWdlc1BlcmZvcm1hbmNlQXVkaXRvciwgSU1lc3NlbmdlclBlcmZvcm1hbmNlQXVkaXRvciB9IGZyb20gJy4vbWVzc2VuZ2VyJztcclxuXHJcbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuaW1wb3J0IHsgSUVudmVsb3BBdWRpdCwgSUVudmVsb3BzQXVkaXQgfSBmcm9tICcuLi9kZWZpbml0aW9ucyc7XHJcbmltcG9ydCB7IE1lc3NhZ2VzUmVwb3J0ZXIgfSBmcm9tICcuLi9yZXBvcnRlcnMvbWVzc2FnZXMtcmVwb3J0ZXInO1xyXG5pbXBvcnQgeyBQZXJmc3RhbXAgfSBmcm9tICcuL3BlcmZzdGFtcCc7XHJcbi8vLy8vLy8vLy9cclxuXHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBNZXNzZW5nZXJQZXJmb3JtYW5jZUF1ZGl0b3JCdWlsZGVyIHtcclxuICAgIHB1YmxpYyBzdGF0aWMgY3JlYXRlKHJlYWw6IGJvb2xlYW4sIHNlbmRlcj86IElBdWRpdFNlbmRlcik6IElNZXNzZW5nZXJQZXJmb3JtYW5jZUF1ZGl0b3Ige1xyXG4gICAgICAgIHJldHVybiBuZXcgTWVzc2VuZ2VyUGVyZm9ybWFuY2VBdWRpdG9yKHJlYWwgPyBzZW5kZXIgOiB1bmRlZmluZWQpO1xyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBNZXNzZW5nZXJQZXJmb3JtYW5jZUF1ZGl0b3IgaW1wbGVtZW50cyBJTWVzc2VuZ2VyUGVyZm9ybWFuY2VBdWRpdG9yIHtcclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgX3NlbmRlcj86IElBdWRpdFNlbmRlclxyXG4gICAgKSB7IH1cclxuXHJcbiAgICBwdWJsaWMgc3RhcnRlZCgpIHtcclxuICAgICAgICBpZiAodGhpcy5fc2VuZGVyKSB7XHJcbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQZXJmb3JtYW5jZU1lc3NhZ2VzQXVkaXRvcih0aGlzLl9zZW5kZXIpO1xyXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gbmV3IER1bW15TWVzc2FnZXNQZXJmb3JtYW5jZUF1ZGl0b3IoKTtcclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgRHVtbXlNZXNzYWdlc1BlcmZvcm1hbmNlQXVkaXRvciBpbXBsZW1lbnRzIElNZXNzYWdlc1BlcmZvcm1hbmNlQXVkaXRvciB7XHJcbiAgICBwdWJsaWMgZW5xdWV1ZWQocXVldWVJZDogc3RyaW5nLCBlbnZlbG9wczogQXJyYXk8SUVudmVsb3A+KSB7IC8qKi8gfVxyXG5cclxuICAgIHB1YmxpYyBjb21wbGV0ZWQoKTogdm9pZCB7IC8qKi8gfVxyXG59XHJcblxyXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbi8qKlxyXG4gKiBQZXJmb3JtYW5jZSBtZXNzYWdlIGF1ZGl0b3IgZm9yIGNvbGxlY3Rpb24gdGltaW5ncyBpbmZvcm1hdGlvbiBmcm9tIGVucXVldWUgbWVzc2FnZSBwcm9jY2Vzc1xyXG4gKi9cclxuY2xhc3MgUGVyZm9ybWFuY2VNZXNzYWdlc0F1ZGl0b3IgaW1wbGVtZW50cyBJTWVzc2FnZXNQZXJmb3JtYW5jZUF1ZGl0b3Ige1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfYXVkaXRzOiBJRW52ZWxvcHNBdWRpdCA9IHtcclxuICAgICAgICBncm91cHM6IG5ldyBBcnJheTxBcnJheTxJRW52ZWxvcEF1ZGl0Pj4oKSxcclxuICAgICAgICB3b3JrZXJTdGFydGVkQXQ6IHVuZGVmaW5lZCxcclxuICAgICAgICBlbnF1ZXVlZEF0OiB1bmRlZmluZWRcclxuICAgIH07XHJcblxyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBfc2VuZGVyOiBJQXVkaXRTZW5kZXJcclxuICAgICkge1xyXG4gICAgICAgIHRoaXMuX2F1ZGl0cy53b3JrZXJTdGFydGVkQXQgPSBuZXcgUGVyZnN0YW1wKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGVucXVldWVkKHF1ZXVlSWQ6IHN0cmluZywgZW52ZWxvcHM6IEFycmF5PElFbnZlbG9wPikge1xyXG4gICAgICAgIHRoaXMuX2F1ZGl0cy5ncm91cHMucHVzaChlbnZlbG9wcyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNvbXBsZXRlZCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9hdWRpdHMuZW5xdWV1ZWRBdCA9IG5ldyBQZXJmc3RhbXAoKTtcclxuXHJcbiAgICAgICAgY29uc3QgcmVwb3J0ID0gbmV3IE1lc3NhZ2VzUmVwb3J0ZXIodGhpcy5fYXVkaXRzKS5yZXBvcnQoKTtcclxuXHJcbiAgICAgICAgdGhpcy5fc2VuZGVyLm1lc3NhZ2VzKHJlcG9ydCk7XHJcbiAgICB9XHJcbn1cclxuLy8vLy8vLy8vL1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvaWZkZWYtbG9hZGVyL2lmZGVmLWxvYWRlci5qcz9ERUJVRz10cnVlJlBFUkZPUk1BTkNFX0FVRElUPXRydWUhLi9zcmMvcHJvY2Vzc2luZy9hdWRpdC9hdWRpdG9ycy9tZXNzZW5nZXItcGVyZm9ybWFuY2UtYXVkaXRvci50cyIsImltcG9ydCB7IElFbnZlbG9wc0F1ZGl0LCBJTWVzc2FnZXNQZXJmb3JtYW5jZVJlcG9ydCB9IGZyb20gJy4uL2RlZmluaXRpb25zJztcclxuaW1wb3J0IHsgZGlzdG9yYnRpb24sIGR1cmF0aW9uIH0gZnJvbSAnLi9jYWxjLW1ldGhvZHMnO1xyXG5cclxuZXhwb3J0IGNsYXNzIE1lc3NhZ2VzUmVwb3J0ZXIge1xyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBfYXVkaXRzOiBJRW52ZWxvcHNBdWRpdCxcclxuICAgICkge31cclxuXHJcbiAgICBwdWJsaWMgcmVwb3J0KCk6IElNZXNzYWdlc1BlcmZvcm1hbmNlUmVwb3J0IHtcclxuICAgICAgICBjb25zdCBhdWRpdHMgPSB0aGlzLl9hdWRpdHM7XHJcblxyXG4gICAgICAgIGlmICghYXVkaXRzLmVucXVldWVkQXQgfHwgIWF1ZGl0cy53b3JrZXJTdGFydGVkQXQpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdNZXNzYWdlc1JlcG9ydGVyIGNhbm5vdCBnZW5lcmF0ZSByZXBvcnQuIERhdGEgaXMgbm90IGNvbXBsZXRlLicpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgY3JlYXRlcyA9IG5ldyBBcnJheTxudW1iZXI+KCk7XHJcbiAgICAgICAgY29uc3QgZW5xdWV1ZWRBdCA9IGF1ZGl0cy5lbnF1ZXVlZEF0O1xyXG4gICAgICAgIGNvbnN0IHdvcmtlclN0YXJ0ZWRBdCA9IGF1ZGl0cy53b3JrZXJTdGFydGVkQXQ7XHJcblxyXG4gICAgICAgIGZvciAoY29uc3QgZ3JvdXAgb2YgYXVkaXRzLmdyb3Vwcykge1xyXG4gICAgICAgICAgICBmb3IgKGNvbnN0IGF1ZGl0IG9mIGdyb3VwKSB7XHJcbiAgICAgICAgICAgICAgICBjcmVhdGVzLnB1c2goYXVkaXQudGltZXN0YW1wKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgZW5xdWV1ZSA9IHtcclxuICAgICAgICAgICAgY2xvY2t0aW1lOiBkaXN0b3JidGlvbihjcmVhdGVzLCAodGltZXN0YW1wKSA9PiBlbnF1ZXVlZEF0LmNsb2NrdGltZSAtIHRpbWVzdGFtcCksXHJcbiAgICAgICAgICAgIGNwdTogdW5kZWZpbmVkXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgY291bnQ6IGNyZWF0ZXMubGVuZ3RoLFxyXG5cclxuICAgICAgICAgICAgZW5xdWV1ZSxcclxuXHJcbiAgICAgICAgICAgIHdvcmtlckVucXVldWU6IGR1cmF0aW9uKHdvcmtlclN0YXJ0ZWRBdCwgYXVkaXRzLmVucXVldWVkQXQpXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvaWZkZWYtbG9hZGVyL2lmZGVmLWxvYWRlci5qcz9ERUJVRz10cnVlJlBFUkZPUk1BTkNFX0FVRElUPXRydWUhLi9zcmMvcHJvY2Vzc2luZy9hdWRpdC9yZXBvcnRlcnMvbWVzc2FnZXMtcmVwb3J0ZXIudHMiLCJcclxuaW1wb3J0IHsgSUVudmVsb3AgfSBmcm9tICcuLi8uLi9lbnZlbG9wJztcclxuaW1wb3J0IHsgSVBpcGVTdGF0c1N0b3JhZ2UgfSBmcm9tICcuLi9zdGF0cy9zdG9yYWdlcy9waXBlLXN0YXRzLnN0b3JhZ2UnO1xyXG5pbXBvcnQgeyBJTWVzc2VuZ2VyU3RhdGlzdGljQXVkaXRvciB9IGZyb20gJy4vbWVzc2VuZ2VyJztcclxuXHJcbmV4cG9ydCBjbGFzcyBNZXNzZW5nZXJTdGF0aXN0aWNBdWRpdG9yIGltcGxlbWVudHMgSU1lc3NlbmdlclN0YXRpc3RpY0F1ZGl0b3Ige1xyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBfcGlwZVN0b3JhZ2VzOiBJUGlwZVN0YXRzU3RvcmFnZVxyXG4gICAgKSB7IH1cclxuXHJcbiAgICBwdWJsaWMgZW5xdWV1ZWQocXVldWVJZDogc3RyaW5nLCBlbnZlbG9wczogQXJyYXk8SUVudmVsb3A+KSB7XHJcbiAgICAgICAgY29uc3QgbGVuZ3RoID0gZW52ZWxvcHMubGVuZ3RoO1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9waXBlU3RvcmFnZXMudXBkYXRlKHF1ZXVlSWQsIChzdGF0cykgPT4ge1xyXG4gICAgICAgICAgICBzdGF0cy50b3RhbE1lc3NhZ2VDb3VudCArPSBsZW5ndGg7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL2lmZGVmLWxvYWRlci9pZmRlZi1sb2FkZXIuanM/REVCVUc9dHJ1ZSZQRVJGT1JNQU5DRV9BVURJVD10cnVlIS4vc3JjL3Byb2Nlc3NpbmcvYXVkaXQvYXVkaXRvcnMvbWVzc2VuZ2VyLXN0YXRpc3RpYy1hdWRpdG9yLnRzIiwiaW1wb3J0IHsgSUVudmVsb3BRdWV1ZSB9IGZyb20gJy4uLy4uL2VudmVsb3AtcXVldWUnO1xyXG5pbXBvcnQgeyBJUGlwZVN0YXRlLCBJUGlwZVN0YXRzLCBJUGlwZVN0YXRzUHJvdmlkZXIsIElQaXBlU3RhdHNSZXBvc2l0b3J5IH0gZnJvbSAnLi9waXBlLXN0YXRzJztcclxuaW1wb3J0IHsgSVBpcGVTdGF0c1N0b3JhZ2UgfSBmcm9tICcuL3N0b3JhZ2VzL3BpcGUtc3RhdHMuc3RvcmFnZSc7XHJcblxyXG5leHBvcnQgY2xhc3MgUGlwZVN0YXRzUHJvdmlkZXIgaW1wbGVtZW50cyBJUGlwZVN0YXRzUHJvdmlkZXIge1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfZGljdGlvbmFyeTogSVBpcGVTdGF0c1JlcG9zaXRvcnlEaWN0aW9uYXJ5ID0ge307XHJcblxyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBfcGlwZVN0YXRzU3RvcmFnZTogSVBpcGVTdGF0c1N0b3JhZ2VcclxuICAgICkgeyB9XHJcblxyXG4gICAgcHVibGljIGdldChxdWV1ZTogSUVudmVsb3BRdWV1ZSk6IElQaXBlU3RhdHNSZXBvc2l0b3J5IHtcclxuICAgICAgICBjb25zdCBkaWN0aW9uYXJ5ID0gdGhpcy5fZGljdGlvbmFyeTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGRpY3Rpb25hcnlbcXVldWUuaWRdIHx8IChkaWN0aW9uYXJ5W3F1ZXVlLmlkXSA9IHRoaXMuY3JlYXRlKHF1ZXVlKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjcmVhdGUocXVldWU6IElFbnZlbG9wUXVldWUpIHtcclxuICAgICAgICBjb25zdCBzdGF0ZSA9IHtcclxuICAgICAgICAgICAgZ2V0IHF1ZXVlTWVzc2FnZUNvdW50KCkgeyByZXR1cm4gcXVldWUuY291bnQ7IH0sXHJcbiAgICAgICAgICAgIGdldCBxdWV1ZVNpemUoKSB7IHJldHVybiBxdWV1ZS5zaXplOyB9XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgcmV0dXJuIG5ldyBQaXBlU3RhdHNSZXBvc2l0b3J5KHF1ZXVlLmlkLCBzdGF0ZSwgdGhpcy5fcGlwZVN0YXRzU3RvcmFnZSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIFBpcGVTdGF0c1JlcG9zaXRvcnkgaW1wbGVtZW50cyBJUGlwZVN0YXRzUmVwb3NpdG9yeSB7XHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IF9xdWV1ZUlkOiBzdHJpbmcsXHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBfc3RhdGU6IElQaXBlU3RhdGUsXHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBfcGlwZVN0YXRzU3RvcmFnZTogSVBpcGVTdGF0c1N0b3JhZ2VcclxuICAgICkgeyB9XHJcblxyXG4gICAgcHVibGljIGFzeW5jIHVwZGF0ZTxUPihhY3Rpb246IChzdGF0czogSVBpcGVTdGF0cykgPT4gVCk6IFByb21pc2U8VD4ge1xyXG4gICAgICAgIGNvbnN0IHN0YXRlID0gdGhpcy5fc3RhdGU7XHJcblxyXG4gICAgICAgIGxldCByZXN1bHQ6IFQgfCB1bmRlZmluZWQ7XHJcblxyXG4gICAgICAgIGF3YWl0IHRoaXMuX3BpcGVTdGF0c1N0b3JhZ2UudXBkYXRlKHRoaXMuX3F1ZXVlSWQsIChzdGF0aXN0aWMpID0+IHtcclxuICAgICAgICAgICAgcmVzdWx0ID0gYWN0aW9uKHtcclxuICAgICAgICAgICAgICAgIHN0YXRpc3RpYyxcclxuICAgICAgICAgICAgICAgIHN0YXRlXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gcmVzdWx0IGFzIGFueTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYXN5bmMgcmVhZCgpOiBQcm9taXNlPElQaXBlU3RhdHM+IHtcclxuICAgICAgICBjb25zdCBzdGF0ZSA9IHRoaXMuX3N0YXRlO1xyXG5cclxuICAgICAgICBjb25zdCBzdGF0aXN0aWMgPSBhd2FpdCB0aGlzLl9waXBlU3RhdHNTdG9yYWdlLnJlYWQodGhpcy5fcXVldWVJZCk7XHJcblxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHN0YXRpc3RpYyxcclxuICAgICAgICAgICAgc3RhdGVcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG59XHJcblxyXG5pbnRlcmZhY2UgSVBpcGVTdGF0c1JlcG9zaXRvcnlEaWN0aW9uYXJ5IHtcclxuICAgIFtxdWV1ZUlkOiBzdHJpbmddOiBQaXBlU3RhdHNSZXBvc2l0b3J5O1xyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy9pZmRlZi1sb2FkZXIvaWZkZWYtbG9hZGVyLmpzP0RFQlVHPXRydWUmUEVSRk9STUFOQ0VfQVVESVQ9dHJ1ZSEuL3NyYy9wcm9jZXNzaW5nL2F1ZGl0L3N0YXRzL3BpcGUtc3RhdHMtcHJvdmlkZXIudHMiLCJpbXBvcnQgeyBHdWlkUHJvdmlkZXIgfSBmcm9tICcuLi8uLi8uLi8uLi9mcmFtZXdvcmsvZ3VpZCc7XHJcbmltcG9ydCB7IEluZGV4ZWREYlV0aWxzIH0gZnJvbSAnLi4vLi4vLi4vLi4vZnJhbWV3b3JrL2luZGV4ZWRkYi11dGlscyc7XHJcbmltcG9ydCB7IElQaXBlUGVyc2lzdGVudFN0YXRzIH0gZnJvbSAnLi4vcGlwZS1zdGF0cyc7XHJcbmltcG9ydCB7IElQaXBlU3RhdHNTdG9yYWdlIH0gZnJvbSAnLi9waXBlLXN0YXRzLnN0b3JhZ2UnO1xyXG5cclxuZXhwb3J0IGNsYXNzIFBpcGVTdGF0c0luZGV4ZWREQlN0b3JhZ2UgaW1wbGVtZW50cyBJUGlwZVN0YXRzU3RvcmFnZSB7XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSBndWlkID0gR3VpZFByb3ZpZGVyLmRlZmF1bHQ7XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBhc3luYyBjcmVhdGUobmFtZTogc3RyaW5nID0gJ21janMtY291bnRlcnMnKTogUHJvbWlzZTxQaXBlU3RhdHNJbmRleGVkREJTdG9yYWdlPiB7XHJcbiAgICAgICAgY29uc3QgZGF0YWJhc2UgPSBhd2FpdCBJbmRleGVkRGJVdGlscy5vcGVuKG5hbWUsIDEsIChkYikgPT4ge1xyXG4gICAgICAgICAgICBpZiAoIWRiLm9iamVjdFN0b3JlTmFtZXMuY29udGFpbnMoUGlwZVN0YXRzSW5kZXhlZERCU3RvcmFnZS5QaXBlU3RhdGlzdGljc1N0b3JhZ2UpKSB7XHJcbiAgICAgICAgICAgICAgICBkYi5jcmVhdGVPYmplY3RTdG9yZShQaXBlU3RhdHNJbmRleGVkREJTdG9yYWdlLlBpcGVTdGF0aXN0aWNzU3RvcmFnZSwgeyBrZXlQYXRoOiAncXVldWVJZCcsIGF1dG9JbmNyZW1lbnQ6IGZhbHNlIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICghZGIub2JqZWN0U3RvcmVOYW1lcy5jb250YWlucyhQaXBlU3RhdHNJbmRleGVkREJTdG9yYWdlLkNsaWVudFN0b3JhZ2UpKSB7XHJcbiAgICAgICAgICAgICAgICBkYi5jcmVhdGVPYmplY3RTdG9yZShQaXBlU3RhdHNJbmRleGVkREJTdG9yYWdlLkNsaWVudFN0b3JhZ2UsIHsga2V5UGF0aDogJ2lkJywgYXV0b0luY3JlbWVudDogZmFsc2UgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgY29uc3QgY2xpZW50SWQgPSBhd2FpdCBQaXBlU3RhdHNJbmRleGVkREJTdG9yYWdlLmNsaWVudElkKGRhdGFiYXNlKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIG5ldyBQaXBlU3RhdHNJbmRleGVkREJTdG9yYWdlKGRhdGFiYXNlLCBjbGllbnRJZCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBhc3luYyBjbGllbnRJZChkYXRhYmFzZTogSURCRGF0YWJhc2UpOiBQcm9taXNlPHN0cmluZz4ge1xyXG4gICAgICAgIGNvbnN0IGNsaWVudFN0b3JhZ2UgPSBkYXRhYmFzZS50cmFuc2FjdGlvbihbUGlwZVN0YXRzSW5kZXhlZERCU3RvcmFnZS5DbGllbnRTdG9yYWdlXSwgJ3JlYWR3cml0ZScpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm9iamVjdFN0b3JlKFBpcGVTdGF0c0luZGV4ZWREQlN0b3JhZ2UuQ2xpZW50U3RvcmFnZSk7XHJcblxyXG4gICAgICAgIGNvbnN0IGRhdGEgPSBhd2FpdCBJbmRleGVkRGJVdGlscy50cmFuc2FjdGlvbigoKSA9PiBjbGllbnRTdG9yYWdlLCAoc3RvcmFnZSwgcmVzdWx0KSA9PiB7XHJcbiAgICAgICAgICAgIEluZGV4ZWREYlV0aWxzLnJlcXVlc3Q8SUNsaWVudERhdGE+KHN0b3JhZ2UuZ2V0KCdkZWZhdWx0JyksIChjbGllbnQpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICghY2xpZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2xpZW50ID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogJ2RlZmF1bHQnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGllbnRJZDogUGlwZVN0YXRzSW5kZXhlZERCU3RvcmFnZS5ndWlkLm5leHQoKVxyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgc3RvcmFnZS5hZGQoY2xpZW50KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJlc3VsdC5jbGllbnRJZCA9IGNsaWVudC5jbGllbnRJZDtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSwgeyBjbGllbnRJZDogJycgYXMgc3RyaW5nIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gZGF0YS5jbGllbnRJZDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBQaXBlU3RhdGlzdGljc1N0b3JhZ2UgPSAncGlwZS1zdGF0aXN0aWNzJztcclxuICAgIHByaXZhdGUgc3RhdGljIENsaWVudFN0b3JhZ2UgPSAnY2xpZW50JztcclxuXHJcbiAgICBwcml2YXRlIF9yZWNvdmVyeTogeyBbcXVldWVJZDogc3RyaW5nXTogSVBpcGVQZXJzaXN0ZW50U3RhdHMgfCB1bmRlZmluZWQgfSA9IHsgfTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IF9kYjogSURCRGF0YWJhc2UsXHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBfY2xpZW50SWQ6IHN0cmluZ1xyXG4gICAgKSB7IH1cclxuXHJcbiAgICBwdWJsaWMgYXN5bmMgdXBkYXRlKHF1ZXVlSWQ6IHN0cmluZywgYWN0aW9uOiAoc3RhdHM6IElQaXBlUGVyc2lzdGVudFN0YXRzKSA9PiB2b2lkKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgbGV0IHJlY292ZXJ5OiBJUGlwZVBlcnNpc3RlbnRTdGF0cyB8IHVuZGVmaW5lZDtcclxuXHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgYXdhaXQgdGhpcy50cmFuc2FjdGlvbigoc3RvcmFnZSwgcmVzdWx0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBJbmRleGVkRGJVdGlscy5yZXF1ZXN0PElQaXBlUGVyc2lzdGVudFN0YXRzPihzdG9yYWdlLmdldChxdWV1ZUlkKSwgKHN0YXRzKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RhdHMgPSByZWNvdmVyeSA9ICh0aGlzLl9yZWNvdmVyeVtxdWV1ZUlkXSB8fCBzdGF0cyB8fCB0aGlzLm5ld0RhdGEocXVldWVJZCkpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBhY3Rpb24oc3RhdHMpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBzdG9yYWdlLnB1dChzdGF0cyk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSwgdW5kZWZpbmVkLCAncmVhZHdyaXRlJyk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLl9yZWNvdmVyeVtxdWV1ZUlkXSA9IHVuZGVmaW5lZDtcclxuICAgICAgICB9IGNhdGNoIHtcclxuICAgICAgICAgICAgaWYgKCFyZWNvdmVyeSkge1xyXG4gICAgICAgICAgICAgICAgcmVjb3ZlcnkgPSB0aGlzLm5ld0RhdGEocXVldWVJZCk7XHJcblxyXG4gICAgICAgICAgICAgICAgYWN0aW9uKHJlY292ZXJ5KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLl9yZWNvdmVyeVtxdWV1ZUlkXSA9IHJlY292ZXJ5O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYXN5bmMgcmVhZChxdWV1ZUlkOiBzdHJpbmcpOiBQcm9taXNlPElQaXBlUGVyc2lzdGVudFN0YXRzPiB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgY29uc3QgZCA9IGF3YWl0IHRoaXMudHJhbnNhY3Rpb24oKHN0b3JhZ2UsIHJlc3VsdCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgSW5kZXhlZERiVXRpbHMucmVxdWVzdDxJUGlwZVBlcnNpc3RlbnRTdGF0cz4oc3RvcmFnZS5nZXQocXVldWVJZCksIChzdGF0cykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5zdGF0cyA9IHRoaXMuX3JlY292ZXJ5W3F1ZXVlSWRdIHx8IHN0YXRzIHx8IHRoaXMubmV3RGF0YShxdWV1ZUlkKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9LCB7IHN0YXRzOiB7fSBhcyBJUGlwZVBlcnNpc3RlbnRTdGF0cyB9LCAncmVhZG9ubHknKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuX3JlY292ZXJ5W3F1ZXVlSWRdID0gdW5kZWZpbmVkO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGQuc3RhdHM7XHJcbiAgICAgICAgfSBjYXRjaCB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9yZWNvdmVyeVtxdWV1ZUlkXSA9IHRoaXMubmV3RGF0YShxdWV1ZUlkKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFzeW5jIGNsZWFyKCk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgIHRoaXMuX3JlY292ZXJ5ID0geyB9O1xyXG4gICAgICAgIHJldHVybiB0aGlzLnRyYW5zYWN0aW9uKChzdG9yYWdlKSA9PiB7XHJcbiAgICAgICAgICAgIHN0b3JhZ2UuY2xlYXIoKTtcclxuICAgICAgICB9LCB1bmRlZmluZWQpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBkaXNwb3NlKCk6IHZvaWQgfCBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICB0aGlzLl9kYi5jbG9zZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBkZXN0cm95KCk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgIHRoaXMuZGlzcG9zZSgpO1xyXG4gICAgICAgIHRoaXMuX3JlY292ZXJ5ID0geyB9O1xyXG4gICAgICAgIHJldHVybiBJbmRleGVkRGJVdGlscy5yZW1vdmUodGhpcy5fZGIubmFtZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBuZXdEYXRhKHF1ZXVlSWQ6IHN0cmluZykge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGNsaWVudElkOiB0aGlzLl9jbGllbnRJZCxcclxuICAgICAgICAgICAgcXVldWVJZCxcclxuICAgICAgICAgICAgYmF0Y2hJbmRleDogMCxcclxuICAgICAgICAgICAgbGFzdFNlbmRpbmdTdWNjZXNzOiB0cnVlLFxyXG4gICAgICAgICAgICByZXF1ZXN0RXJyb3JDb3VudDogMCxcclxuICAgICAgICAgICAgdG90YWxNZXNzYWdlQ291bnQ6IDAsXHJcbiAgICAgICAgICAgIHRvdGFsUmVxdWVzdEVycm9yQ291bnQ6IDBcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb3Blbihtb2RlOiBJREJUcmFuc2FjdGlvbk1vZGUpOiBJREJPYmplY3RTdG9yZSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RiLnRyYW5zYWN0aW9uKFtQaXBlU3RhdHNJbmRleGVkREJTdG9yYWdlLlBpcGVTdGF0aXN0aWNzU3RvcmFnZV0sIG1vZGUpLm9iamVjdFN0b3JlKFBpcGVTdGF0c0luZGV4ZWREQlN0b3JhZ2UuUGlwZVN0YXRpc3RpY3NTdG9yYWdlKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHRyYW5zYWN0aW9uPFQ+KGFjdGlvbjogKHN0b3JhZ2U6IElEQk9iamVjdFN0b3JlLCByZXN1bHQ6IFQpID0+IHZvaWQsIHJlc3VsdDogVCwgbW9kZTogSURCVHJhbnNhY3Rpb25Nb2RlID0gJ3JlYWR3cml0ZScpOiBQcm9taXNlPFQ+IHtcclxuICAgICAgICByZXR1cm4gSW5kZXhlZERiVXRpbHMudHJhbnNhY3Rpb24oKCkgPT4gdGhpcy5vcGVuKG1vZGUpLCBhY3Rpb24sIHJlc3VsdCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmludGVyZmFjZSBJQ2xpZW50RGF0YSB7XHJcbiAgICBpZDogc3RyaW5nO1xyXG4gICAgY2xpZW50SWQ6IHN0cmluZztcclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvaWZkZWYtbG9hZGVyL2lmZGVmLWxvYWRlci5qcz9ERUJVRz10cnVlJlBFUkZPUk1BTkNFX0FVRElUPXRydWUhLi9zcmMvcHJvY2Vzc2luZy9hdWRpdC9zdGF0cy9zdG9yYWdlcy9waXBlLXN0YXRzLmluZGV4ZWRkYi50cyIsImltcG9ydCB7IEd1aWRQcm92aWRlciB9IGZyb20gJy4uLy4uLy4uLy4uL2ZyYW1ld29yay9ndWlkJztcclxuaW1wb3J0IHsgV2ViU3RvcmFnZXMgfSBmcm9tICcuLi8uLi8uLi8uLi9mcmFtZXdvcmsvd2Vic3RvcmFnZSc7XHJcbmltcG9ydCB7IElQaXBlUGVyc2lzdGVudFN0YXRzIH0gZnJvbSAnLi4vcGlwZS1zdGF0cyc7XHJcbmltcG9ydCB7IElQaXBlU3RhdHNTdG9yYWdlIH0gZnJvbSAnLi9waXBlLXN0YXRzLnN0b3JhZ2UnO1xyXG5cclxuZXhwb3J0IGNsYXNzIFBpcGVTdGF0c0xvY2FsU3RvcmFnZSBpbXBsZW1lbnRzIElQaXBlU3RhdHNTdG9yYWdlIHtcclxuICAgIHB1YmxpYyBzdGF0aWMgY3JlYXRlKGxvY2FsU3RvcmFnZTogU3RvcmFnZSB8IG51bGwgPSBXZWJTdG9yYWdlcy5sb2NhbFN0b3JhZ2UpOiBQaXBlU3RhdHNMb2NhbFN0b3JhZ2UgfCBudWxsIHtcclxuICAgICAgICBpZiAoIWxvY2FsU3RvcmFnZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBuZXcgUGlwZVN0YXRzTG9jYWxTdG9yYWdlKGxvY2FsU3RvcmFnZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgX3ByZWZpeCA9ICdtY2pzLXN0YXRzOic7XHJcbiAgICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBfY2xpZW50S2V5ID0gJ21janMtc3RhdHMtY2xpZW50JztcclxuXHJcbiAgICBwcml2YXRlIF9jbGllbnRJZDogc3RyaW5nO1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfcmVjb3Zlcnk6IHsgW3F1ZXVlSWQ6IHN0cmluZ106IElQaXBlUGVyc2lzdGVudFN0YXRzIHwgdW5kZWZpbmVkIH0gPSB7IH07XHJcblxyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBfc3RvcmFnZTogU3RvcmFnZVxyXG4gICAgKSB7IH1cclxuXHJcbiAgICBwdWJsaWMgY2xpZW50SWQoKTogc3RyaW5nIHtcclxuICAgICAgICBjb25zdCBrZXkgPSBQaXBlU3RhdHNMb2NhbFN0b3JhZ2UuX2NsaWVudEtleTtcclxuICAgICAgICBsZXQgY2xpZW50SWQgPSB0aGlzLl9jbGllbnRJZCB8fCB0aGlzLl9zdG9yYWdlLmdldEl0ZW0oa2V5KTtcclxuICAgICAgICBpZiAoIWNsaWVudElkKSB7XHJcbiAgICAgICAgICAgIGNsaWVudElkID0gR3VpZFByb3ZpZGVyLmRlZmF1bHQubmV4dCgpO1xyXG4gICAgICAgICAgICB0aGlzLl9zdG9yYWdlLnNldEl0ZW0oa2V5LCBjbGllbnRJZCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLl9jbGllbnRJZCA9IGNsaWVudElkO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB1cGRhdGUocXVldWVJZDogc3RyaW5nLCBhY3Rpb246IChzdGF0czogSVBpcGVQZXJzaXN0ZW50U3RhdHMpID0+IHZvaWQpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBrZXkgPSB0aGlzLmtleShxdWV1ZUlkKTtcclxuXHJcbiAgICAgICAgY29uc3Qgc3RhdHMgPSB0aGlzLl9yZWNvdmVyeVtrZXldIHx8IHRoaXMuZ2V0KGtleSkgfHwgdGhpcy5uZXcocXVldWVJZCk7XHJcblxyXG4gICAgICAgIGFjdGlvbihzdGF0cyk7XHJcblxyXG4gICAgICAgIHRoaXMuc2V0KGtleSwgc3RhdHMpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZWFkKHF1ZXVlSWQ6IHN0cmluZyk6IElQaXBlUGVyc2lzdGVudFN0YXRzIHtcclxuICAgICAgICBjb25zdCBrZXkgPSB0aGlzLmtleShxdWV1ZUlkKTtcclxuXHJcbiAgICAgICAgbGV0IHN0YXRzID0gdGhpcy5fcmVjb3Zlcnlba2V5XSB8fCB0aGlzLmdldChrZXkpO1xyXG5cclxuICAgICAgICBpZiAoIXN0YXRzKSB7XHJcbiAgICAgICAgICAgIHN0YXRzID0gdGhpcy5uZXcocXVldWVJZCk7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0KGtleSwgc3RhdHMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHN0YXRzO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbGVhcigpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBzdG9yYWdlID0gdGhpcy5fc3RvcmFnZTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHN0b3JhZ2UubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgY29uc3Qga2V5ID0gc3RvcmFnZS5rZXkoaSk7XHJcbiAgICAgICAgICAgIGlmIChrZXkgJiYga2V5LmluZGV4T2YoUGlwZVN0YXRzTG9jYWxTdG9yYWdlLl9wcmVmaXgpID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBzdG9yYWdlLnJlbW92ZUl0ZW0oa2V5KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3JlY292ZXJ5W2tleV0gPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGRlc3Ryb3koKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5jbGVhcigpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBkaXNwb3NlKCk6IHZvaWQge1xyXG4gICAgICAgIC8vXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBrZXkocXVldWVJZDogc3RyaW5nKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gUGlwZVN0YXRzTG9jYWxTdG9yYWdlLl9wcmVmaXggKyBxdWV1ZUlkO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgbmV3KHF1ZXVlSWQ6IHN0cmluZyk6IElQaXBlUGVyc2lzdGVudFN0YXRzIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBjbGllbnRJZDogdGhpcy5jbGllbnRJZCgpLFxyXG4gICAgICAgICAgICBxdWV1ZUlkLFxyXG4gICAgICAgICAgICBiYXRjaEluZGV4OiAwLFxyXG4gICAgICAgICAgICB0b3RhbE1lc3NhZ2VDb3VudDogMCxcclxuICAgICAgICAgICAgdG90YWxSZXF1ZXN0RXJyb3JDb3VudDogMCxcclxuICAgICAgICAgICAgcmVxdWVzdEVycm9yQ291bnQ6IDAsXHJcbiAgICAgICAgICAgIGxhc3RTZW5kaW5nU3VjY2VzczogZmFsc2VcclxuICAgICAgICB9IGFzIElQaXBlUGVyc2lzdGVudFN0YXRzO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0KGtleTogc3RyaW5nKTogSVBpcGVQZXJzaXN0ZW50U3RhdHMgfCBudWxsIHtcclxuICAgICAgICBjb25zdCBzdHIgPSB0aGlzLl9zdG9yYWdlLmdldEl0ZW0oa2V5KTtcclxuXHJcbiAgICAgICAgaWYgKCFzdHIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBjb25zdCBzdGF0cyA9IEpTT04ucGFyc2Uoc3RyKTtcclxuICAgICAgICAgICAgaWYgKHN0YXRzKSB7XHJcbiAgICAgICAgICAgICAgICBzdGF0cy5jbGllbnRJZCA9IHRoaXMuY2xpZW50SWQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gc3RhdHM7XHJcbiAgICAgICAgfSBjYXRjaCB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNldChrZXk6IHN0cmluZywgdmFsOiBJUGlwZVBlcnNpc3RlbnRTdGF0cyk6IHZvaWQge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3N0b3JhZ2Uuc2V0SXRlbShrZXksIEpTT04uc3RyaW5naWZ5KHZhbCwgKG5hbWU6IGtleW9mIElQaXBlUGVyc2lzdGVudFN0YXRzLCB2YWx1ZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgc3dpdGNoIChuYW1lKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnY2xpZW50SWQnOiByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6IHJldHVybiB2YWx1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgICAgICB0aGlzLl9yZWNvdmVyeVtrZXldID0gdW5kZWZpbmVkO1xyXG4gICAgICAgIH0gY2F0Y2gge1xyXG4gICAgICAgICAgICB0aGlzLl9yZWNvdmVyeVtrZXldID0gdmFsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvaWZkZWYtbG9hZGVyL2lmZGVmLWxvYWRlci5qcz9ERUJVRz10cnVlJlBFUkZPUk1BTkNFX0FVRElUPXRydWUhLi9zcmMvcHJvY2Vzc2luZy9hdWRpdC9zdGF0cy9zdG9yYWdlcy9waXBlLXN0YXRzLmxvY2FsLXN0b3JhZ2UudHMiLCJpbXBvcnQgeyBHdWlkUHJvdmlkZXIgfSBmcm9tICcuLi8uLi8uLi8uLi9mcmFtZXdvcmsvZ3VpZCc7XHJcbmltcG9ydCB7IElQaXBlUGVyc2lzdGVudFN0YXRzIH0gZnJvbSAnLi4vcGlwZS1zdGF0cyc7XHJcbmltcG9ydCB7IElQaXBlU3RhdHNTdG9yYWdlIH0gZnJvbSAnLi9waXBlLXN0YXRzLnN0b3JhZ2UnO1xyXG5cclxuZXhwb3J0IGNsYXNzIFBpcGVTdGF0c01lbW9yeVN0b3JhZ2UgaW1wbGVtZW50cyBJUGlwZVN0YXRzU3RvcmFnZSB7XHJcbiAgICBwdWJsaWMgcmVhZG9ubHkgY2xpZW50SWQ6IHN0cmluZyA9IEd1aWRQcm92aWRlci5kZWZhdWx0Lm5leHQoKTtcclxuXHJcbiAgICBwcml2YXRlIF9kaWN0aW9uYXJ5OiBJUGlwZVN0YXRzRGljdGlvbmFyeSA9IHt9O1xyXG5cclxuICAgIHB1YmxpYyB1cGRhdGUocXVldWVJZDogc3RyaW5nLCBhY3Rpb246IChzdGF0czogSVBpcGVQZXJzaXN0ZW50U3RhdHMpID0+IHZvaWQpOiB2b2lkIHtcclxuICAgICAgICBhY3Rpb24odGhpcy5nZXQocXVldWVJZCkpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZWFkKHF1ZXVlSWQ6IHN0cmluZyk6IElQaXBlUGVyc2lzdGVudFN0YXRzIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXQocXVldWVJZCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsZWFyKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX2RpY3Rpb25hcnkgPSB7fTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZGVzdHJveSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmNsZWFyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGRpc3Bvc2UoKTogdm9pZCB7XHJcbiAgICAgICAgLy9cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldChxdWV1ZUlkOiBzdHJpbmcpOiBJUGlwZVBlcnNpc3RlbnRTdGF0cyB7XHJcbiAgICAgICAgY29uc3QgZGljdGlvbmFyeSA9IHRoaXMuX2RpY3Rpb25hcnk7XHJcblxyXG4gICAgICAgIHJldHVybiBkaWN0aW9uYXJ5W3F1ZXVlSWRdIHx8IChkaWN0aW9uYXJ5W3F1ZXVlSWRdID0ge1xyXG4gICAgICAgICAgICBjbGllbnRJZDogdGhpcy5jbGllbnRJZCxcclxuICAgICAgICAgICAgcXVldWVJZCxcclxuICAgICAgICAgICAgYmF0Y2hJbmRleDogMCxcclxuICAgICAgICAgICAgdG90YWxNZXNzYWdlQ291bnQ6IDAsXHJcbiAgICAgICAgICAgIHRvdGFsUmVxdWVzdEVycm9yQ291bnQ6IDAsXHJcbiAgICAgICAgICAgIHJlcXVlc3RFcnJvckNvdW50OiAwLFxyXG4gICAgICAgICAgICBsYXN0U2VuZGluZ1N1Y2Nlc3M6IGZhbHNlXHJcbiAgICAgICAgfSBhcyBJUGlwZVBlcnNpc3RlbnRTdGF0cyk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmludGVyZmFjZSBJUGlwZVN0YXRzRGljdGlvbmFyeSB7XHJcbiAgICBbcXVldWVJZDogc3RyaW5nXTogSVBpcGVQZXJzaXN0ZW50U3RhdHM7XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL2lmZGVmLWxvYWRlci9pZmRlZi1sb2FkZXIuanM/REVCVUc9dHJ1ZSZQRVJGT1JNQU5DRV9BVURJVD10cnVlIS4vc3JjL3Byb2Nlc3NpbmcvYXVkaXQvc3RhdHMvc3RvcmFnZXMvcGlwZS1zdGF0cy5tZW1vcnkudHMiLCJpbXBvcnQgeyBJTG9nLCBJTWVhc3VyZW1lbnQsIElNZXNzYWdlLCBJTWVzc2FnZU1ldGEsIExvZ0xldmVsLCBNZXNzYWdlVHlwZSB9IGZyb20gJy4uL2RlZmluaXRpb25zJztcclxuaW1wb3J0IHsgSUd1aWRQcm92aWRlciB9IGZyb20gJy4uL2ZyYW1ld29yay9ndWlkJztcclxuaW1wb3J0IHsgSVRpbWVTdGFtcFByb3ZpZGVyIH0gZnJvbSAnLi4vZnJhbWV3b3JrL3RpbWVzdGFtcCc7XHJcbmltcG9ydCB7IEVudmVsb3AsIElFbnZlbG9wIH0gZnJvbSAnLi9lbnZlbG9wJztcclxuXHJcbi8qKlxyXG4gKiBAaW50ZXJuYWxcclxuICogQGludGVyZmFjZSBJUG9zdG1hblxyXG4gKi9cclxuZXhwb3J0IGludGVyZmFjZSBJUG9zdG1hbiB7XHJcbiAgICAvKipcclxuICAgICAqIFNlYWwgbWVzc2FnZSBpbnRvIGVudmVsb3BcclxuICAgICAqXHJcbiAgICAgKiBAaW50ZXJuYWxcclxuICAgICAqIEBwYXJhbSB7SU1lc3NhZ2V9IG1lc3NhZ2VcclxuICAgICAqIEBwYXJhbSB7Q29udGV4dH0gW2NvbnRleHRdXHJcbiAgICAgKiBAcmV0dXJucyB7SUVudmVsb3B9XHJcbiAgICAgKiBAbWVtYmVyb2YgSVBvc3RtYW5cclxuICAgICAqL1xyXG4gICAgc2VhbChtZXNzYWdlOiBJTWVzc2FnZSk6IElFbnZlbG9wO1xyXG59XHJcblxyXG4vKipcclxuICogQGludGVybmFsXHJcbiAqIEBjbGFzcyBQb3N0bWFuXHJcbiAqIEBpbXBsZW1lbnRzIHtJUG9zdG1hbn1cclxuICovXHJcbmV4cG9ydCBjbGFzcyBQb3N0bWFuIGltcGxlbWVudHMgSVBvc3RtYW4ge1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgTG9nTGV2ZWw6IHtba2V5IGluIExvZ0xldmVsXTogbnVtYmVyIH0gPSB7XHJcbiAgICAgICAgdHJhY2U6IDAsXHJcbiAgICAgICAgZGVidWc6IDEsXHJcbiAgICAgICAgaW5mbzogMixcclxuICAgICAgICB3YXJuOiAzLFxyXG4gICAgICAgIGVycm9yOiA0LFxyXG4gICAgICAgIGZhdGFsOiA1XHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgX2d1aWQ6IElHdWlkUHJvdmlkZXIsXHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBfdGltZTogSVRpbWVTdGFtcFByb3ZpZGVyXHJcbiAgICApIHsgfVxyXG5cclxuICAgIHB1YmxpYyBzZWFsKG1lc3NhZ2U6IElNZXNzYWdlKTogSUVudmVsb3Age1xyXG4gICAgICAgIGNvbnN0IG1ldGEgPSBtZXNzYWdlLl9tZXRhO1xyXG5cclxuICAgICAgICBkZWxldGUgKG1lc3NhZ2UgYXMgYW55KS5fbWV0YTsgLy8gVG9EbzogQ2hlY2sgcGVyZm9tYW5jZSBvZiB0aGUgZGVsZXRlIG9wZXJhdG9yXHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLmVudmVsb3AobWV0YSwgbWVzc2FnZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBlbnZlbG9wKG1ldGE6IElNZXNzYWdlTWV0YSwgbWVzc2FnZTogb2JqZWN0KTogSUVudmVsb3Age1xyXG4gICAgICAgIGNvbnN0IGVudmVsb3AgPSBuZXcgRW52ZWxvcChtZXRhLnR5cGUpO1xyXG4gICAgICAgIGVudmVsb3AuaWQgPSB0aGlzLl9ndWlkLm5leHQoKTtcclxuICAgICAgICBlbnZlbG9wLnRpbWVzdGFtcCA9IG1ldGEudGltZXN0YW1wIHx8IHRoaXMuX3RpbWUubm93KCk7XHJcbiAgICAgICAgZW52ZWxvcC5uYW1lID0gdGhpcy5uYW1lKGVudmVsb3AudHlwZSwgbWVzc2FnZSk7XHJcbiAgICAgICAgZW52ZWxvcC5tZXNzYWdlID0gbWVzc2FnZTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGVudmVsb3A7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBuYW1lKHR5cGU6IE1lc3NhZ2VUeXBlLCBtZXNzYWdlOiBhbnkpOiBzdHJpbmcge1xyXG4gICAgICAgIGlmICh0eXBlID09PSAnbWVhc3VyZW1lbnQnKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IG5hbWUgPSAobWVzc2FnZSBhcyBJTWVhc3VyZW1lbnQpLm5hbWU7XHJcbiAgICAgICAgICAgIGRlbGV0ZSBtZXNzYWdlLm5hbWU7XHJcbiAgICAgICAgICAgIHJldHVybiBuYW1lO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodHlwZSA9PT0gJ2xvZycpIHtcclxuICAgICAgICAgICAgbGV0IG5hbWUgPSBQb3N0bWFuLkxvZ0xldmVsWyhtZXNzYWdlIGFzIElMb2cpLmxldmVsXTtcclxuICAgICAgICAgICAgbmFtZSA9IHR5cGVvZiBuYW1lID09PSAnbnVtYmVyJyA/IG5hbWUgOiAyO1xyXG4gICAgICAgICAgICBkZWxldGUgbWVzc2FnZS5sZXZlbDtcclxuICAgICAgICAgICAgcmV0dXJuIG5hbWUudG9TdHJpbmcoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHR5cGU7XHJcbiAgICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL2lmZGVmLWxvYWRlci9pZmRlZi1sb2FkZXIuanM/REVCVUc9dHJ1ZSZQRVJGT1JNQU5DRV9BVURJVD10cnVlIS4vc3JjL3Byb2Nlc3NpbmcvcG9zdG1hbi50cyIsImltcG9ydCB7IElDb25maWd1cmF0aW9uIH0gZnJvbSAnLi4vY29uZmlndXJhdGlvbnMvY29uZmlndXJhdGlvbic7XHJcbmltcG9ydCB7IElFbnZpcm9ubWVudERhdGEgfSBmcm9tICcuLi9jb25maWd1cmF0aW9ucy9lbnZpcm9ubWVudCc7XHJcbmltcG9ydCB7IElMb2dnZXIgfSBmcm9tICcuLi9sb2dzJztcclxuaW1wb3J0IHsgQ29udGV4dCB9IGZyb20gJy4uL3Byb2Nlc3NpbmcnO1xyXG5pbXBvcnQgeyBNZXNzYWdlUmVjZWl2ZXIgfSBmcm9tICcuL3NlbmRlcnMvbWVzc2FnZS1yZWNlaXZlcic7XHJcbmltcG9ydCB7IE1hbmRhdG9yeVJlc3BvbnNlRW1pdHRlciB9IGZyb20gJy4vc2VuZGVycy9yZXNwb25zZS1lbWl0dGVyJztcclxuaW1wb3J0IHsgV29ya2VyRXZlbnRSZWNlaXZlciB9IGZyb20gJy4vc2VuZGVycy93b3JrZXItZXZlbnQtcmVjZWl2ZXInO1xyXG5pbXBvcnQgeyBXb3JrZXJSZXF1ZXN0UmVjZWl2ZXIgfSBmcm9tICcuL3NlbmRlcnMvd29ya2VyLXJlcXVlc3QtcmVjZWl2ZXInO1xyXG5pbXBvcnQgeyBTZXJ2aWNlV29ya2VyU2VuZGVyIH0gZnJvbSAnLi9zZXJ2aWNlLXdvcmtlci1zZW5kZXInO1xyXG5pbXBvcnQgeyBJQ29uZmlndXJhdGlvbldvcmtlck1lc3NhZ2UsIElNZXNzYWdlc1dvcmtlck1lc3NhZ2UsIElXb3JrZXJHbG9iYWxTY29wZSwgSVdvcmtlck1lc3NhZ2VTZW5kZXIgfSBmcm9tICcuL3dvcmtlci1kZWZpbml0aW9ucyc7XHJcblxyXG4vKipcclxuICogQGludGVybmFsXHJcbiAqL1xyXG5leHBvcnQgaW50ZXJmYWNlIElDb25maWd1cmF0aW9uRXZlbnQge1xyXG4gICAgY29uZmlndXJhdGlvbjogSUNvbmZpZ3VyYXRpb247XHJcblxyXG4gICAgZW52aXJvbm1lbnQ6IElFbnZpcm9ubWVudERhdGE7XHJcblxyXG4gICAgY29udGV4dDogQ29udGV4dDtcclxufVxyXG5cclxuLyoqXHJcbiAqIEBpbnRlcm5hbFxyXG4gKi9cclxuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWVtcHR5LWludGVyZmFjZVxyXG5leHBvcnQgaW50ZXJmYWNlIElUZXJtaW5hdGVFdmVudCB7IH1cclxuXHJcbi8qKlxyXG4gKiBSZWNlaXZlciB3cmFwcGVyIGZvciB3b3JrZXIgZW52aXJvbm1lbnQuXHJcbiAqIEl0IGFsbG93cyBhZGQgcmVjZWl2ZWQgbWVzc2FnZXMgd2l0aCB2YXJpb3VzZSBkYXRhIHR5cGVzIGZyb20gYSBtYWluIHRocmVhZC5cclxuICpcclxuICogQGludGVybmFsXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgV29ya2VyUmVjZWl2ZXIge1xyXG4gICAgcHVibGljIHJlYWRvbmx5IGNvbnRleHQ6IENvbnRleHQ7XHJcblxyXG4gICAgcHVibGljIGdldCBtZXNzYWdlcygpIHsgcmV0dXJuIHRoaXMuX21lc3NhZ2VzLmV2ZW50OyB9XHJcblxyXG4gICAgcHVibGljIGdldCBjb25maWd1cmF0aW9uKCkgeyByZXR1cm4gdGhpcy5fY29uZmlndXJhdGlvbi5ldmVudDsgfVxyXG5cclxuICAgIHB1YmxpYyByZWFkb25seSB0ZXJtaW5hdGUgPSBuZXcgTWFuZGF0b3J5UmVzcG9uc2VFbWl0dGVyPElUZXJtaW5hdGVFdmVudCB8IHVuZGVmaW5lZCwgdm9pZD4oKTtcclxuXHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9yZWNlaXZlcjogTWVzc2FnZVJlY2VpdmVyO1xyXG5cclxuICAgIHByaXZhdGUgcmVhZG9ubHkgX3Rlcm1pbmF0ZTogV29ya2VyUmVxdWVzdFJlY2VpdmVyPCd0ZXJtaW5hdGUnLCBJVGVybWluYXRlRXZlbnQgfCB1bmRlZmluZWQsIHZvaWQ+O1xyXG5cclxuICAgIHByaXZhdGUgcmVhZG9ubHkgX21lc3NhZ2VzOiBXb3JrZXJFdmVudFJlY2VpdmVyPCdtZXNzYWdlcycsIElNZXNzYWdlc1dvcmtlck1lc3NhZ2U+O1xyXG5cclxuICAgIHByaXZhdGUgcmVhZG9ubHkgX2NvbmZpZ3VyYXRpb246IFdvcmtlckV2ZW50UmVjZWl2ZXI8J2NvbmZpZ3VyYXRpb24nLCBJQ29uZmlndXJhdGlvbldvcmtlck1lc3NhZ2U+O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHdvcmtlckVudmlyb25tZW50OiBJV29ya2VyR2xvYmFsU2NvcGUsXHJcbiAgICAgICAgbG9nZ2VyOiBJTG9nZ2VyXHJcbiAgICApIHtcclxuICAgICAgICBjb25zdCBzZW5kZXIgPSB0aGlzLmdldFNlbmRlcih3b3JrZXJFbnZpcm9ubWVudCk7XHJcblxyXG4gICAgICAgIGNvbnN0IHJlY2VpdmVyID0gdGhpcy5fcmVjZWl2ZXIgPSBuZXcgTWVzc2FnZVJlY2VpdmVyKHdvcmtlckVudmlyb25tZW50LCBsb2dnZXIpO1xyXG5cclxuICAgICAgICB0aGlzLmNvbnRleHQgPSBuZXcgQ29udGV4dChzZW5kZXIsIHJlY2VpdmVyKTtcclxuXHJcbiAgICAgICAgdGhpcy5fbWVzc2FnZXMgPSBuZXcgV29ya2VyRXZlbnRSZWNlaXZlcignbWVzc2FnZXMnLCByZWNlaXZlcik7XHJcblxyXG4gICAgICAgIHRoaXMuX2NvbmZpZ3VyYXRpb24gPSBuZXcgV29ya2VyRXZlbnRSZWNlaXZlcignY29uZmlndXJhdGlvbicsIHJlY2VpdmVyKTtcclxuXHJcbiAgICAgICAgdGhpcy5fdGVybWluYXRlID0gbmV3IFdvcmtlclJlcXVlc3RSZWNlaXZlcigndGVybWluYXRlJywgc2VuZGVyLCByZWNlaXZlciwgdGhpcy50ZXJtaW5hdGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBkaXNwb3NlKCkge1xyXG4gICAgICAgIHRoaXMuX3JlY2VpdmVyLmRpc3Bvc2UoKTtcclxuXHJcbiAgICAgICAgdGhpcy5fdGVybWluYXRlLmRpc3Bvc2UoKTtcclxuICAgICAgICB0aGlzLl9tZXNzYWdlcy5kaXNwb3NlKCk7XHJcbiAgICAgICAgdGhpcy5fY29uZmlndXJhdGlvbi5kaXNwb3NlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRTZW5kZXIod29ya2VyRW52aXJvbm1lbnQ6IElXb3JrZXJHbG9iYWxTY29wZSB8IFNlcnZpY2VXb3JrZXJHbG9iYWxTY29wZSk6IElXb3JrZXJNZXNzYWdlU2VuZGVyIHtcclxuICAgICAgICBpZiAoJ2NsaWVudHMnIGluIHdvcmtlckVudmlyb25tZW50KSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHNlcnZpY2VXb3JrZXJHbG9iYWwgPSB3b3JrZXJFbnZpcm9ubWVudCBhcyBTZXJ2aWNlV29ya2VyR2xvYmFsU2NvcGU7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgU2VydmljZVdvcmtlclNlbmRlcigoKSA9PiBzZXJ2aWNlV29ya2VyR2xvYmFsLmNsaWVudHMubWF0Y2hBbGwoeyBpbmNsdWRlVW5jb250cm9sbGVkOiB0cnVlIH0pKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHdvcmtlckVudmlyb25tZW50IGFzIGFueSBhcyBJV29ya2VyTWVzc2FnZVNlbmRlcjtcclxuICAgIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvaWZkZWYtbG9hZGVyL2lmZGVmLWxvYWRlci5qcz9ERUJVRz10cnVlJlBFUkZPUk1BTkNFX0FVRElUPXRydWUhLi9zcmMvd29ya2Vycy93b3JrZXItcmVjZWl2ZXIudHMiLCJpbXBvcnQgeyBJV29ya2VyTWVzc2FnZSwgSVdvcmtlck1lc3NhZ2VTZW5kZXIsIFdvcmtlckRhdGFUeXBlIH0gZnJvbSAnLi93b3JrZXItZGVmaW5pdGlvbnMnO1xyXG5cclxuLyoqXHJcbiAqIFNlbmQgZGF0YSB0byBlYWNoIHBhZ2UgZnJvbSBTaGFyZWRXb3JrZXJcclxuICpcclxuICogQGludGVybmFsXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgU2VydmljZVdvcmtlclNlbmRlciBpbXBsZW1lbnRzIElXb3JrZXJNZXNzYWdlU2VuZGVyIHtcclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgX2NsaWVudHM6ICgpID0+IFByb21pc2U8QXJyYXk8SVdvcmtlck1lc3NhZ2VTZW5kZXI+PlxyXG4gICAgKSB7IH1cclxuXHJcbiAgICBwdWJsaWMgYXN5bmMgcG9zdE1lc3NhZ2UoZGF0YTogSVdvcmtlck1lc3NhZ2U8V29ya2VyRGF0YVR5cGU+KTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgY29uc3QgY2xpZW50cyA9IGF3YWl0IHRoaXMuX2NsaWVudHMoKTtcclxuXHJcbiAgICAgICAgaWYgKGNsaWVudHMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChgRG9uJ3Qgc2VlIGFueSBjbGllbnRzYCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmb3IgKGNvbnN0IGNsaWVudCBvZiBjbGllbnRzKSB7XHJcbiAgICAgICAgICAgIGF3YWl0IGNsaWVudC5wb3N0TWVzc2FnZShkYXRhKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL2lmZGVmLWxvYWRlci9pZmRlZi1sb2FkZXIuanM/REVCVUc9dHJ1ZSZQRVJGT1JNQU5DRV9BVURJVD10cnVlIS4vc3JjL3dvcmtlcnMvc2VydmljZS13b3JrZXItc2VuZGVyLnRzIiwiaW1wb3J0IHsgR2xvYmFsUHJvdmlkZXIgfSBmcm9tICcuLi9mcmFtZXdvcmsvZ2xvYmFsJztcclxuaW1wb3J0IHsgUHNldWRvV29ya2VyU2NvcGVOYW1lIH0gZnJvbSAnLi9wc2V1ZG8td29ya2VyJztcclxuaW1wb3J0IHsgSVdvcmtlckdsb2JhbFNjb3BlIH0gZnJvbSAnLi93b3JrZXItZGVmaW5pdGlvbnMnO1xyXG5cclxuLyoqXHJcbiAqIFJldHVybiBjdXJyZW50IGdsb2JhbCByb290IHZhcmlhYmxlIGZvciBXb3JrZXIgZW52ZXJvbmVtbnRcclxuICpcclxuICogQGludGVybmFsXHJcbiAqIEBhYnN0cmFjdFxyXG4gKiBAY2xhc3MgV29ya2VyU2NvcGVcclxuICovXHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBXb3JrZXJTY29wZSB7XHJcbiAgICAvKipcclxuICAgICAqIFJldHVybiBjdXJyZW50IGdsb2JhbCByb290IHZhcmlhYmxlIGZvciBXb3JrZXIgZW52ZXJvbmVtbnRcclxuICAgICAqXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0geyp9IFtnbG9iYWw9V29ya2VyU2NvcGUuZ2xvYmFsKCldXHJcbiAgICAgKiBAcmV0dXJucyB7SVdvcmtlckdsb2JhbFNjb3BlfVxyXG4gICAgICogQG1lbWJlcm9mIFdvcmtlclNjb3BlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgY3VycmVudChnbG9iYWw6IGFueSA9IEdsb2JhbFByb3ZpZGVyLmN1cnJlbnQoKSk6IElXb3JrZXJHbG9iYWxTY29wZSB7XHJcbiAgICAgICAgaWYgKGdsb2JhbFtQc2V1ZG9Xb3JrZXJTY29wZU5hbWVdKSB7XHJcbiAgICAgICAgICAgIC8vIFdlIGFyZSBpbiBXZWJXb3JrZXIgZW11bGF0b3JcclxuICAgICAgICAgICAgY29uc3QgcHNldWRvV29ya2VyID0gZ2xvYmFsW1BzZXVkb1dvcmtlclNjb3BlTmFtZV07XHJcbiAgICAgICAgICAgIGRlbGV0ZSBnbG9iYWxbUHNldWRvV29ya2VyU2NvcGVOYW1lXTtcclxuICAgICAgICAgICAgcmV0dXJuIHBzZXVkb1dvcmtlcjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFdlIGFyZSBpbiByZWFsIFdlYiBXb3JrZXJcclxuICAgICAgICByZXR1cm4gZ2xvYmFsO1xyXG4gICAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy9pZmRlZi1sb2FkZXIvaWZkZWYtbG9hZGVyLmpzP0RFQlVHPXRydWUmUEVSRk9STUFOQ0VfQVVESVQ9dHJ1ZSEuL3NyYy93b3JrZXJzL3dvcmtlci1zY29wZS50cyJdLCJzb3VyY2VSb290IjoiIn0=