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
/******/ 	return __webpack_require__(__webpack_require__.s = 98);
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
/***/ (function(module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
function endsWith(str, searchStr) {
    return str.substr(-searchStr.length, searchStr.length) === searchStr;
}
exports.endsWith = endsWith;
function mapPath(path1, path2) {
    if (path2[0] === '/') {
        return path2;
    }
    var index = path1.lastIndexOf('/');
    if (index < 0) {
        return '/' + path2;
    }
    return path1.substring(0, index + 1) + path2;
}
exports.mapPath = mapPath;


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(105));
__export(__webpack_require__(107));


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var indexeddb_provider_1 = __webpack_require__(109);
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
/* 46 */
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
/* 48 */
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
/* 49 */
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
/* 50 */
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
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var script_loader_1 = __webpack_require__(52);
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
/* 52 */
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
/* 70 */,
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(72));
__export(__webpack_require__(103));
__export(__webpack_require__(131));
__export(__webpack_require__(76));
__export(__webpack_require__(78));
__export(__webpack_require__(132));
__export(__webpack_require__(77));
__export(__webpack_require__(75));
__export(__webpack_require__(134));


/***/ }),
/* 72 */
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
/* 73 */
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
/* 74 */
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
/* 75 */
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
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(124));


/***/ }),
/* 77 */
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
var tab_sync_point_1 = __webpack_require__(128);
var unload_event_1 = __webpack_require__(30);
var pipe_stats_1 = __webpack_require__(129);
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
/* 78 */
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
/* 97 */,
/* 98 */
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
var messages_configuration_1 = __webpack_require__(99);
var framework_1 = __webpack_require__(8);
var logs_1 = __webpack_require__(100);
var polyfills_1 = __webpack_require__(102);
var processing_1 = __webpack_require__(71);
var messenger_performance_auditor_1 = __webpack_require__(135);
var messenger_statistic_auditor_1 = __webpack_require__(137);
var pipe_stats_provider_1 = __webpack_require__(138);
var pipe_stats_indexeddb_1 = __webpack_require__(139);
var pipe_stats_local_storage_1 = __webpack_require__(140);
var pipe_stats_memory_1 = __webpack_require__(141);
var postman_1 = __webpack_require__(142);
var worker_receiver_1 = __webpack_require__(143);
var worker_scope_1 = __webpack_require__(145);
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
/* 99 */
/***/ (function(module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @internal
 */
exports.messagesConfiguration = {
    messages: []
};


/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(40));
__export(__webpack_require__(41));
__export(__webpack_require__(101));
__export(__webpack_require__(42));


/***/ }),
/* 101 */
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
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Polyfills
 */
Object.defineProperty(exports, "__esModule", { value: true });
var strings_1 = __webpack_require__(43);
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
        return strings_1.mapPath(currentLocation, polyfillsName);
    };
    return Polyfills;
}());
exports.Polyfills = Polyfills;


/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(104));


/***/ }),
/* 104 */
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
var queues_1 = __webpack_require__(44);
var queues_2 = __webpack_require__(44);
var indexeddb_queue_1 = __webpack_require__(108);
var local_storage_queue_1 = __webpack_require__(110);
var audit_provider_1 = __webpack_require__(114);
var pipe_performance_auditor_1 = __webpack_require__(115);
var pipe_statistics_auditor_1 = __webpack_require__(117);
var worker_audit_sender_1 = __webpack_require__(118);
var batch_builder_1 = __webpack_require__(119);
var batch_drop_strategy_1 = __webpack_require__(120);
var batch_indexeddb_storage_1 = __webpack_require__(121);
var batch_localstorage_storage_1 = __webpack_require__(122);
var batch_memory_storage_1 = __webpack_require__(123);
var bus_1 = __webpack_require__(75);
var endpoints_1 = __webpack_require__(76);
var flush_time_strategy_1 = __webpack_require__(127);
var pipe_1 = __webpack_require__(77);
var port_ajax_provider_1 = __webpack_require__(130);
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
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(106));


/***/ }),
/* 106 */
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
/* 107 */
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
/* 108 */
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
var indexeddb_utils_1 = __webpack_require__(45);
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
/* 109 */
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
/* 110 */
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
var index_1 = __webpack_require__(44);
var local_storage_key_value_1 = __webpack_require__(111);
var local_storage_key_value_cache_1 = __webpack_require__(113);
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
/* 111 */
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
var storage_key_1 = __webpack_require__(112);
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
/* 112 */
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
/* 113 */
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
/* 114 */
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
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var batch_reporter_1 = __webpack_require__(116);
var perfstamp_1 = __webpack_require__(74);
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
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var calc_methods_1 = __webpack_require__(73);
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
/* 117 */
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
/* 118 */
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
/* 119 */
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
var batch_1 = __webpack_require__(72);
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
/* 120 */
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
var indexeddb_utils_1 = __webpack_require__(45);
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
/* 122 */
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
/* 123 */
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
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(125));


/***/ }),
/* 125 */
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
var version_1 = __webpack_require__(126);
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
/* 126 */
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
/* 127 */
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
/* 128 */
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
/* 129 */
/***/ (function(module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
var AjaxRequestStatusResult;
(function (AjaxRequestStatusResult) {
    AjaxRequestStatusResult[AjaxRequestStatusResult["Success"] = 0] = "Success";
    AjaxRequestStatusResult[AjaxRequestStatusResult["NetworkError"] = 1] = "NetworkError";
})(AjaxRequestStatusResult = exports.AjaxRequestStatusResult || (exports.AjaxRequestStatusResult = {}));


/***/ }),
/* 130 */
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
var worker_request_sender_1 = __webpack_require__(46);
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
/* 131 */
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
/* 132 */
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
var sync_1 = __webpack_require__(133);
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
/* 134 */
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
/* 135 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var messages_reporter_1 = __webpack_require__(136);
var perfstamp_1 = __webpack_require__(74);
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
/* 136 */
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
var calc_methods_1 = __webpack_require__(73);
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
/* 137 */
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
/* 138 */
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
/* 139 */
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
var indexeddb_utils_1 = __webpack_require__(45);
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
/* 140 */
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
/* 141 */
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
/* 142 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var envelop_1 = __webpack_require__(78);
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
/* 143 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var processing_1 = __webpack_require__(71);
var message_receiver_1 = __webpack_require__(47);
var response_emitter_1 = __webpack_require__(48);
var worker_event_receiver_1 = __webpack_require__(49);
var worker_request_receiver_1 = __webpack_require__(50);
var service_worker_sender_1 = __webpack_require__(144);
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
/* 144 */
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
/* 145 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var global_1 = __webpack_require__(13);
var pseudo_worker_1 = __webpack_require__(51);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCAxOGNlNmM3NWQwNDI1NGFlYzZmYiIsIndlYnBhY2s6Ly8vLi9zcmMvZnJhbWV3b3JrL2d1aWQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ZyYW1ld29yay91dGlscy90cmF2ZXJzYWwudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ZyYW1ld29yay9pbmRleC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZnJhbWV3b3JrL2V2ZW50LWVtaXR0ZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ZyYW1ld29yay9nbG9iYWwudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ZyYW1ld29yay90aW1lc3RhbXAudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ZyYW1ld29yay91dGlscy9leHRlbmQudHMiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS9idWlsZGluL2dsb2JhbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZnJhbWV3b3JrL3V0aWxzL2luZGV4LnRzIiwid2VicGFjazovLy8uL3NyYy9mcmFtZXdvcmsvd2Vic3RvcmFnZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZnJhbWV3b3JrL3VubG9hZC1ldmVudC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZnJhbWV3b3JrL2FqYXgudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ZyYW1ld29yay9zaW5nbGV0b24udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ZyYW1ld29yay91dGlscy9ncm91cEJ5LnRzIiwid2VicGFjazovLy8uL3NyYy9mcmFtZXdvcmsvdXRpbHMvb3ZlcnJpZGUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ZyYW1ld29yay91dGlscy9zYWZlQ2xvbmUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xvZ3MvY29uc29sZS1sb2dnZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xvZ3MvZXZlbnQtbG9nZ2VyLnRzIiwid2VicGFjazovLy8uL3NyYy9sb2dzL3VuaXZlcnNhbC1sb2dnZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ZyYW1ld29yay9zdHJpbmdzLnRzIiwid2VicGFjazovLy8uL3NyYy9xdWV1ZXMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ZyYW1ld29yay9pbmRleGVkZGItdXRpbHMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3dvcmtlcnMvc2VuZGVycy93b3JrZXItcmVxdWVzdC1zZW5kZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3dvcmtlcnMvc2VuZGVycy9tZXNzYWdlLXJlY2VpdmVyLnRzIiwid2VicGFjazovLy8uL3NyYy93b3JrZXJzL3NlbmRlcnMvcmVzcG9uc2UtZW1pdHRlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvd29ya2Vycy9zZW5kZXJzL3dvcmtlci1ldmVudC1yZWNlaXZlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvd29ya2Vycy9zZW5kZXJzL3dvcmtlci1yZXF1ZXN0LXJlY2VpdmVyLnRzIiwid2VicGFjazovLy8uL3NyYy93b3JrZXJzL3BzZXVkby13b3JrZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ZyYW1ld29yay9zY3JpcHQtbG9hZGVyLnRzIiwid2VicGFjazovLy8uL3NyYy9wcm9jZXNzaW5nL2luZGV4LnRzIiwid2VicGFjazovLy8uL3NyYy9wcm9jZXNzaW5nL2JhdGNoLnRzIiwid2VicGFjazovLy8uL3NyYy9wcm9jZXNzaW5nL2F1ZGl0L3JlcG9ydGVycy9jYWxjLW1ldGhvZHMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Byb2Nlc3NpbmcvYXVkaXQvYXVkaXRvcnMvcGVyZnN0YW1wLnRzIiwid2VicGFjazovLy8uL3NyYy9wcm9jZXNzaW5nL2J1cy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcHJvY2Vzc2luZy9lbmRwb2ludHMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Byb2Nlc3NpbmcvcGlwZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcHJvY2Vzc2luZy9lbnZlbG9wLnRzIiwid2VicGFjazovLy8uL3NyYy9tZXNzYWdpbmctY2xpZW50LXdvcmtlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29uZmlndXJhdGlvbnMvZGVmYXVsdHMvbWVzc2FnZXMtY29uZmlndXJhdGlvbi50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbG9ncy9pbmRleC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbG9ncy93b3JrZXItbG9nZ2VyLnRzIiwid2VicGFjazovLy8uL3NyYy9wb2x5ZmlsbHMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Byb2Nlc3NpbmcvYnVpbGRlcnMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Byb2Nlc3NpbmcvYnVpbGRlcnMvYnVzLWJ1aWxkZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3F1ZXVlcy9tZW1vcnkvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3F1ZXVlcy9tZW1vcnkvbWVtb3J5LXF1ZXVlLnRzIiwid2VicGFjazovLy8uL3NyYy9xdWV1ZXMvc2FtcGxlZC1xdWV1ZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcXVldWVzL2luZGV4ZWRkYi9pbmRleGVkZGItcXVldWUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ZyYW1ld29yay9pbmRleGVkZGItcHJvdmlkZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3F1ZXVlcy9sb2NhbC1zdG9yYWdlL2xvY2FsLXN0b3JhZ2UtcXVldWUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3F1ZXVlcy9sb2NhbC1zdG9yYWdlL2xvY2FsLXN0b3JhZ2Uta2V5LXZhbHVlLnRzIiwid2VicGFjazovLy8uL3NyYy9xdWV1ZXMvbG9jYWwtc3RvcmFnZS9zdG9yYWdlLWtleS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcXVldWVzL2xvY2FsLXN0b3JhZ2UvbG9jYWwtc3RvcmFnZS1rZXktdmFsdWUtY2FjaGUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Byb2Nlc3NpbmcvYXVkaXQvYXVkaXQtcHJvdmlkZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Byb2Nlc3NpbmcvYXVkaXQvYXVkaXRvcnMvcGlwZS1wZXJmb3JtYW5jZS1hdWRpdG9yLnRzIiwid2VicGFjazovLy8uL3NyYy9wcm9jZXNzaW5nL2F1ZGl0L3JlcG9ydGVycy9iYXRjaC1yZXBvcnRlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcHJvY2Vzc2luZy9hdWRpdC9hdWRpdG9ycy9waXBlLXN0YXRpc3RpY3MtYXVkaXRvci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcHJvY2Vzc2luZy9hdWRpdC9zZW5kZXJzL3dvcmtlci1hdWRpdC1zZW5kZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Byb2Nlc3NpbmcvYmF0Y2gtYnVpbGRlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcHJvY2Vzc2luZy9iYXRjaC1kcm9wLXN0cmF0ZWd5LnRzIiwid2VicGFjazovLy8uL3NyYy9wcm9jZXNzaW5nL2JhdGNoLXN0b3JhZ2VzL2luZGV4ZWRkYi1zdG9yYWdlL2JhdGNoLWluZGV4ZWRkYi1zdG9yYWdlLnRzIiwid2VicGFjazovLy8uL3NyYy9wcm9jZXNzaW5nL2JhdGNoLXN0b3JhZ2VzL2xvY2FsLXN0b3JhZ2UvYmF0Y2gtbG9jYWxzdG9yYWdlLXN0b3JhZ2UudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Byb2Nlc3NpbmcvYmF0Y2gtc3RvcmFnZXMvbWVtb3J5LXN0b3JhZ2UvYmF0Y2gtbWVtb3J5LXN0b3JhZ2UudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Byb2Nlc3NpbmcvZW5kcG9pbnRzL2ZlLWFuYWx5dGljcy1jb2xsZWN0b3IvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Byb2Nlc3NpbmcvZW5kcG9pbnRzL2ZlLWFuYWx5dGljcy1jb2xsZWN0b3IvZmUtYW5hbHl0aWNzLWNvbGxlY3Rvci1lbmRwb2ludC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdmVyc2lvbi50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcHJvY2Vzc2luZy9mbHVzaC10aW1lLXN0cmF0ZWd5LnRzIiwid2VicGFjazovLy8uL3NyYy9mcmFtZXdvcmsvdGFiLXN5bmMtcG9pbnQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Byb2Nlc3NpbmcvYXVkaXQvc3RhdHMvcGlwZS1zdGF0cy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcHJvY2Vzc2luZy9idWlsZGVycy9wb3J0LWFqYXgtcHJvdmlkZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Byb2Nlc3NpbmcvY29udGV4dC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcHJvY2Vzc2luZy9tZXNzZW5nZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ZyYW1ld29yay9zeW5jLnRzIiwid2VicGFjazovLy8uL3NyYy9wcm9jZXNzaW5nL3JvdXRlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcHJvY2Vzc2luZy9hdWRpdC9hdWRpdG9ycy9tZXNzZW5nZXItcGVyZm9ybWFuY2UtYXVkaXRvci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcHJvY2Vzc2luZy9hdWRpdC9yZXBvcnRlcnMvbWVzc2FnZXMtcmVwb3J0ZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Byb2Nlc3NpbmcvYXVkaXQvYXVkaXRvcnMvbWVzc2VuZ2VyLXN0YXRpc3RpYy1hdWRpdG9yLnRzIiwid2VicGFjazovLy8uL3NyYy9wcm9jZXNzaW5nL2F1ZGl0L3N0YXRzL3BpcGUtc3RhdHMtcHJvdmlkZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Byb2Nlc3NpbmcvYXVkaXQvc3RhdHMvc3RvcmFnZXMvcGlwZS1zdGF0cy5pbmRleGVkZGIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Byb2Nlc3NpbmcvYXVkaXQvc3RhdHMvc3RvcmFnZXMvcGlwZS1zdGF0cy5sb2NhbC1zdG9yYWdlLnRzIiwid2VicGFjazovLy8uL3NyYy9wcm9jZXNzaW5nL2F1ZGl0L3N0YXRzL3N0b3JhZ2VzL3BpcGUtc3RhdHMubWVtb3J5LnRzIiwid2VicGFjazovLy8uL3NyYy9wcm9jZXNzaW5nL3Bvc3RtYW4udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3dvcmtlcnMvd29ya2VyLXJlY2VpdmVyLnRzIiwid2VicGFjazovLy8uL3NyYy93b3JrZXJzL3NlcnZpY2Utd29ya2VyLXNlbmRlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvd29ya2Vycy93b3JrZXItc2NvcGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87QUNWQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbkRBOzs7Ozs7R0FNRztBQUNIO0lBUUksc0JBQ29CLE1BQXdCO1FBQXhCLGtDQUFTLE1BQU0sQ0FBQyxNQUFNLEVBQUU7UUFBeEIsV0FBTSxHQUFOLE1BQU0sQ0FBa0I7UUFIM0IsZUFBVSxHQUFrQixFQUFFLENBQUM7UUFLNUMsSUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQztRQUNsQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDO1lBQzNCLFNBQVMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3RELENBQUM7SUFDTCxDQUFDO0lBYkQsc0JB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LDhDQUF3RDtBQUd4RDs7Ozs7O0dBTUc7QUFDSDtJQUFBO0lBb0JBLENBQUM7SUFuQkc7Ozs7Ozs7T0FPRztJQUNXLG1CQUFPLEdBQXJCLFVBQXNCLE1BQXNDO1FBQXRDLGtDQUFjLHVCQUFjLENBQUMsT0FBTyxFQUFFO1FBQ3hELEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxxQ0FBcUIsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNoQywrQkFBK0I7WUFDL0IsSUFBTSxZQUFZLEdBQUcsTUFBTSxDQUFDLHFDQUFxQixDQUFDLENBQUM7WUFDbkQsT0FBTyxNQUFNLENBQUMscUNBQXFCLENBQUMsQ0FBQztZQUNyQyxNQUFNLENBQUMsWUFBWSxDQUFDO1FBQ3hCLENBQUM7UUFFRCw0QkFBNEI7UUFDNUIsTUFBTSxDQUFDLE1BQU0sQ0FBQztJQUNsQixDQUFDO0lBQ0wsa0JBQUM7QUFBRCxDQUFDO0FBcEJxQixrQ0FBVyIsImZpbGUiOiJtZXNzYWdpbmctY2xpZW50LXdvcmtlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtdLCBmYWN0b3J5KTtcblx0ZWxzZSB7XG5cdFx0dmFyIGEgPSBmYWN0b3J5KCk7XG5cdFx0Zm9yKHZhciBpIGluIGEpICh0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgPyBleHBvcnRzIDogcm9vdClbaV0gPSBhW2ldO1xuXHR9XG59KSh0aGlzLCBmdW5jdGlvbigpIHtcbnJldHVybiBcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gOTgpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDE4Y2U2Yzc1ZDA0MjU0YWVjNmZiIiwiLyoqXHJcbiAqIEFQSSBkZWZpbml0aW9uIGZvciBwcm92aWRpbmcgR1VJRFxyXG4gKlxyXG4gKiBAaW50ZXJuYWxcclxuICogQGludGVyZmFjZSBJR3VpZFByb3ZpZGVyXHJcbiAqL1xyXG5leHBvcnQgaW50ZXJmYWNlIElHdWlkUHJvdmlkZXIge1xyXG4gICAgbmV4dCgpOiBzdHJpbmc7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBSZWFsIEdVSUQgcHJvdmlkZXIgaW1wbGVtZW50YXRpb25cclxuICpcclxuICogQGludGVybmFsXHJcbiAqIEBjbGFzcyBHdWlkUHJvdmlkZXJcclxuICogQGltcGxlbWVudHMge0lHdWlkUHJvdmlkZXJ9XHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgR3VpZFByb3ZpZGVyIGltcGxlbWVudHMgSUd1aWRQcm92aWRlciB7XHJcbiAgICBwdWJsaWMgc3RhdGljIF9kZWZhdWx0OiBHdWlkUHJvdmlkZXI7XHJcbiAgICBwdWJsaWMgc3RhdGljIGdldCBkZWZhdWx0KCk6IEd1aWRQcm92aWRlciB7XHJcbiAgICAgICAgcmV0dXJuIEd1aWRQcm92aWRlci5fZGVmYXVsdCB8fCAoR3VpZFByb3ZpZGVyLl9kZWZhdWx0ID0gbmV3IEd1aWRQcm92aWRlcigpICk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfYnl0ZVRvSGV4OiBBcnJheTxzdHJpbmc+ID0gW107XHJcblxyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IHJhbmRvbSA9IFJhbmRvbS5jcmVhdGUoKVxyXG4gICAgKSB7XHJcbiAgICAgICAgY29uc3QgYnl0ZVRvSGV4ID0gdGhpcy5fYnl0ZVRvSGV4O1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMjU2OyArK2kpIHtcclxuICAgICAgICAgICAgYnl0ZVRvSGV4W2ldID0gKGkgKyAweDEwMCkudG9TdHJpbmcoMTYpLnN1YnN0cigxKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm4gYSBuZXcgZ3VpZFxyXG4gICAgICpcclxuICAgICAqIFRvRG86IFRoaW5rIGFib3V0IG1vcmUgZWZlY3RpdmUgYWxnb3JpdGhtXHJcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxyXG4gICAgICogQG1lbWJlcm9mIEd1aWRQcm92aWRlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgbmV4dCgpIHtcclxuICAgICAgICBjb25zdCBybmRzID0gdGhpcy5yYW5kb20ubmV4dCgpO1xyXG5cclxuICAgICAgICAvLyBQZXIgNC40LCBzZXQgYml0cyBmb3IgdmVyc2lvbiBhbmQgYGNsb2NrX3NlcV9oaV9hbmRfcmVzZXJ2ZWRgXHJcbiAgICAgICAgcm5kc1s2XSA9IChybmRzWzZdICYgMHgwZikgfCAweDQwO1xyXG4gICAgICAgIHJuZHNbOF0gPSAocm5kc1s4XSAmIDB4M2YpIHwgMHg4MDtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuYnl0ZXNUb1V1aWQocm5kcyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBieXRlc1RvVXVpZChidWY6IHsgW2luZGV4OiBudW1iZXJdOiBudW1iZXIgfSkge1xyXG4gICAgICAgIGxldCBpID0gMDtcclxuICAgICAgICBjb25zdCBidGggPSB0aGlzLl9ieXRlVG9IZXg7XHJcbiAgICAgICAgcmV0dXJuIGJ0aFtidWZbaSsrXV0gKyBidGhbYnVmW2krK11dICtcclxuICAgICAgICAgICAgICAgYnRoW2J1ZltpKytdXSArIGJ0aFtidWZbaSsrXV0gK1xyXG4gICAgICAgICAgICAgICBidGhbYnVmW2krK11dICsgYnRoW2J1ZltpKytdXSArXHJcbiAgICAgICAgICAgICAgIGJ0aFtidWZbaSsrXV0gKyBidGhbYnVmW2krK11dICtcclxuICAgICAgICAgICAgICAgYnRoW2J1ZltpKytdXSArIGJ0aFtidWZbaSsrXV0gK1xyXG4gICAgICAgICAgICAgICBidGhbYnVmW2krK11dICsgYnRoW2J1ZltpKytdXSArXHJcbiAgICAgICAgICAgICAgIGJ0aFtidWZbaSsrXV0gKyBidGhbYnVmW2krK11dICtcclxuICAgICAgICAgICAgICAgYnRoW2J1ZltpKytdXSArIGJ0aFtidWZbaSsrXV07XHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBCYXNlZCByYW5kb20gbnVtYmVycyBzb3VyY2VcclxuICpcclxuICogQGludGVybmFsXHJcbiAqIEBhYnN0cmFjdFxyXG4gKiBAY2xhc3MgUmFuZG9tXHJcbiAqL1xyXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgUmFuZG9tIHtcclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlIG5ldyBSYW5kb20gZ2VuZXJhdG9yIGluc3RhbmNlIHN1cHBvcnRlZCBieSBjdXJyZW50IGVudmlyb25tZW50XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgY3JlYXRlKGZvcmNlU2ltcGxlOiBib29sZWFuID0gZmFsc2UpOiBSYW5kb20ge1xyXG4gICAgICAgIGlmICh0eXBlb2YgY3J5cHRvICE9PSAndW5kZWZpbmVkJ1xyXG4gICAgICAgICAgICAmJiBjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzXHJcbiAgICAgICAgICAgICYmICFmb3JjZVNpbXBsZVxyXG4gICAgICAgICkge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IENyeXB0b1JhbmRvbSgpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgU2ltcGxlUmFuZG9tKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhYnN0cmFjdCBuZXh0KCk6IHsgW2luZGV4OiBudW1iZXJdOiBudW1iZXIgfTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFByb3ZpZGUgc3Ryb25nIHJhbmRvbSB2YWx1ZXMgZnJvbSBDcnlwdG8gQVBJXHJcbiAqXHJcbiAqIEBpbnRlcm5hbFxyXG4gKiBAY2xhc3MgQ3J5cHRvUmFuZG9tXHJcbiAqIEBleHRlbmRzIHtSYW5kb219XHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgQ3J5cHRvUmFuZG9tIGV4dGVuZHMgUmFuZG9tIHtcclxuICAgIHB1YmxpYyBuZXh0KCk6IHsgW2luZGV4OiBudW1iZXJdOiBudW1iZXIgfSB7XHJcbiAgICAgICAgLy8gV0hBVFdHIGNyeXB0byBSTkcgLSBodHRwOi8vd2lraS53aGF0d2cub3JnL3dpa2kvQ3J5cHRvXHJcbiAgICAgICAgY29uc3Qgcm5kczggPSBuZXcgVWludDhBcnJheSgxNik7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW5kZWZcclxuICAgICAgICBjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzKHJuZHM4KTtcclxuICAgICAgICByZXR1cm4gcm5kczg7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBQcm92aWRlIHJhbmRvbSB2YWx1ZXMgZnJvbSB1bnByZWRpY3RhYmxlIE1hdGgucmFuZG9tIGZ1bmN0aW9uXHJcbiAqXHJcbiAqIEBpbnRlcm5hbFxyXG4gKiBAY2xhc3MgU2ltcGxlUmFuZG9tXHJcbiAqIEBleHRlbmRzIHtSYW5kb219XHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgU2ltcGxlUmFuZG9tIGV4dGVuZHMgUmFuZG9tIHtcclxuICAgIHByaXZhdGUgX3JuZHMgPSBuZXcgQXJyYXkoMTYpO1xyXG5cclxuICAgIHB1YmxpYyBuZXh0KCk6IEFycmF5PG51bWJlcj4ge1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwLCByID0gMDsgaSA8IDE2OyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKChpICYgMHgwMykgPT09IDApIHtcclxuICAgICAgICAgICAgICAgIHIgPSBNYXRoLnJhbmRvbSgpICogMHgxMDAwMDAwMDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5fcm5kc1tpXSA9IHIgPj4+ICgoaSAmIDB4MDMpIDw8IDMpICYgMHhmZjtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3JuZHM7XHJcbiAgICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL2lmZGVmLWxvYWRlci9pZmRlZi1sb2FkZXIuanM/REVCVUc9dHJ1ZSZQRVJGT1JNQU5DRV9BVURJVD10cnVlIS4vc3JjL2ZyYW1ld29yay9ndWlkLnRzIiwiLyoqXHJcbiAqIEBpbnRlcm5hbFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHRyYXZlcnNhbChcclxuICAgIGNhbGxiYWNrOiAobmFtZTogc3RyaW5nLCBzb3VyY2VWYWx1ZTogYW55KSA9PiB2b2lkLFxyXG4gICAgZGVzdGluYXRpb246IGFueSxcclxuICAgIHNvdXJjZXM6IEFycmF5PGFueT5cclxuKSB7XHJcbiAgICAvLyBEbyBub3QgdXNlIGZvci4ub2YgdG8gYXZvaWQgcmVxdWlyZSBwb2x5ZmlsbHNcclxuICAgIGNvbnN0IGxlbmd0aCA9IHNvdXJjZXMubGVuZ3RoO1xyXG4gICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IGxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgIGNvbnN0IHNvdXJjZSA9IHNvdXJjZXNbaW5kZXhdO1xyXG5cclxuICAgICAgICBpZiAoIXNvdXJjZSkge1xyXG4gICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZvciAoY29uc3QgbmFtZSBpbiBzb3VyY2UpIHtcclxuICAgICAgICAgICAgaWYgKHNvdXJjZS5oYXNPd25Qcm9wZXJ0eShuYW1lKSkge1xyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2sobmFtZSwgc291cmNlW25hbWVdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvaWZkZWYtbG9hZGVyL2lmZGVmLWxvYWRlci5qcz9ERUJVRz10cnVlJlBFUkZPUk1BTkNFX0FVRElUPXRydWUhLi9zcmMvZnJhbWV3b3JrL3V0aWxzL3RyYXZlcnNhbC50cyIsImV4cG9ydCAqIGZyb20gJy4vYWpheCc7XHJcbmV4cG9ydCAqIGZyb20gJy4vYWpheC1kZWZpbml0aW9ucyc7XHJcbmV4cG9ydCAqIGZyb20gJy4vZXZlbnQtZW1pdHRlcic7XHJcbmV4cG9ydCAqIGZyb20gJy4vZ3VpZCc7XHJcbmV4cG9ydCAqIGZyb20gJy4vc2luZ2xldG9uJztcclxuZXhwb3J0ICogZnJvbSAnLi90aW1lc3RhbXAnO1xyXG5leHBvcnQgKiBmcm9tICcuL3V0aWxzJztcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL2lmZGVmLWxvYWRlci9pZmRlZi1sb2FkZXIuanM/REVCVUc9dHJ1ZSZQRVJGT1JNQU5DRV9BVURJVD10cnVlIS4vc3JjL2ZyYW1ld29yay9pbmRleC50cyIsIi8qKlxyXG4gKiBFdmVudCBlbWl0dGVyIGFuZCBzdWJzY3JpYmVyIHRvIHNlbmQgdGhlIHNhbWUgbWVzc2FnZXMgdG8gYSBmZXcgZGVzdGluYXRpb25zXHJcbiAqXHJcbiAqIEBpbnRlcm5hbFxyXG4gKiBAY2xhc3MgRXZlbnRFbWl0dGVyXHJcbiAqIEB0ZW1wbGF0ZSBURXZlbnRcclxuICovXHJcbmV4cG9ydCBjbGFzcyBFdmVudEVtaXR0ZXI8VEV2ZW50PiB7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9saXN0ZW5lcnMgPSBuZXcgIEFycmF5PEV2ZW50TGlzdGVuZXI8VEV2ZW50Pj4oKTtcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgX2J1ZmZlciA9IG5ldyAgQXJyYXk8VEV2ZW50PigpO1xyXG5cclxuICAgIHB1YmxpYyBzdWJzY3JpYmUobGlzdGVuZXI6IEV2ZW50TGlzdGVuZXI8VEV2ZW50Pik6IEV2ZW50RW1pdHRlcjxURXZlbnQ+IHtcclxuICAgICAgICBpZiAodHlwZW9mIGxpc3RlbmVyID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnN1YnNjcmliZWQobGlzdGVuZXIpIDwgMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fbGlzdGVuZXJzLnB1c2gobGlzdGVuZXIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9idWZmZXIubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLmZsdXNoQnVmZmVyKCkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB1bnN1YnNjcmliZShsaXN0ZW5lcjogRXZlbnRMaXN0ZW5lcjxURXZlbnQ+KTogRXZlbnRFbWl0dGVyPFRFdmVudD4ge1xyXG4gICAgICAgIGxldCBpbmRleCA9IHRoaXMuc3Vic2NyaWJlZChsaXN0ZW5lcik7XHJcbiAgICAgICAgd2hpbGUgKGluZGV4ID49IDApIHtcclxuICAgICAgICAgICAgdGhpcy5fbGlzdGVuZXJzLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgICAgIGluZGV4ID0gdGhpcy5zdWJzY3JpYmVkKGxpc3RlbmVyKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsZWFyKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX2xpc3RlbmVycy5sZW5ndGggPSAwO1xyXG4gICAgICAgIHRoaXMuX2J1ZmZlci5sZW5ndGggPSAwO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBlbWl0KGRhdGE6IFRFdmVudCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IGxlbmd0aCA9IHRoaXMuX2xpc3RlbmVycy5sZW5ndGg7XHJcbiAgICAgICAgaWYgKGxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9saXN0ZW5lcnNbaV0oZGF0YSk7XHJcbiAgICAgICAgICAgICAgICB9IGNhdGNoIChlcikgeyAvKmRvIG5vdGhpbmcqLyB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLl9idWZmZXIucHVzaChkYXRhKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlZGlyZWN0KGVtaXR0ZXI6IEV2ZW50RW1pdHRlcjxURXZlbnQ+KTogRXZlbnRFbWl0dGVyPFRFdmVudD4ge1xyXG4gICAgICAgIHRoaXMuc3Vic2NyaWJlKChldmVudCkgPT4ge1xyXG4gICAgICAgICAgICBlbWl0dGVyLmVtaXQoZXZlbnQpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBlbWl0dGVyO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBtYXA8VE5ld0V2ZW50Pihjb252ZXJ0OiAoZGF0YTogVEV2ZW50KSA9PiBUTmV3RXZlbnQpOiBFdmVudEVtaXR0ZXI8VE5ld0V2ZW50PiB7XHJcbiAgICAgICAgY29uc3QgbmV3RXZlbnRFbWl0dGVyID0gbmV3IEV2ZW50RW1pdHRlcjxUTmV3RXZlbnQ+KCk7XHJcbiAgICAgICAgdGhpcy5zdWJzY3JpYmUoKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgIG5ld0V2ZW50RW1pdHRlci5lbWl0KGNvbnZlcnQoZXZlbnQpKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gbmV3RXZlbnRFbWl0dGVyO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc3Vic2NyaWJlZChsaXN0ZW5lcjogRXZlbnRMaXN0ZW5lcjxURXZlbnQ+KTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbGlzdGVuZXJzLmluZGV4T2YobGlzdGVuZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZmx1c2hCdWZmZXIoKSB7XHJcbiAgICAgICAgY29uc3QgYnVmZmVyID0gdGhpcy5fYnVmZmVyLnNsaWNlKCk7XHJcbiAgICAgICAgdGhpcy5fYnVmZmVyLmxlbmd0aCA9IDA7XHJcbiAgICAgICAgY29uc3QgbGVuZ3RoID0gYnVmZmVyLmxlbmd0aDtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZW1pdChidWZmZXJbaV0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHR5cGUgRXZlbnRMaXN0ZW5lcjxURXZlbnQ+ID0gKGV2ZW50OiBURXZlbnQpID0+IHZvaWQ7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy9pZmRlZi1sb2FkZXIvaWZkZWYtbG9hZGVyLmpzP0RFQlVHPXRydWUmUEVSRk9STUFOQ0VfQVVESVQ9dHJ1ZSEuL3NyYy9mcmFtZXdvcmsvZXZlbnQtZW1pdHRlci50cyIsIi8qKlxyXG4gKiBSZXR1cm4gZ2xvYmFsIHJvb3Qgb2JqZWN0IGZvciBjdXJyZW50IGVudmlyb25tZW50XHJcbiAqXHJcbiAqIEBpbnRlcm5hbFxyXG4gKiBAYWJzdHJhY3RcclxuICogQGNsYXNzIEdsb2JhbFByb3ZpZGVyXHJcbiAqL1xyXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgR2xvYmFsUHJvdmlkZXIge1xyXG4gICAgcHVibGljIHN0YXRpYyBjdXJyZW50KCkge1xyXG4gICAgICAgIGNvbnN0IHJvb3QgPSB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyA/IHdpbmRvdyA6XHJcbiAgICAgICAgICAgICAgICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXHJcbiAgICAgICAgICAgICAgICAgICAgIHR5cGVvZiBzZWxmICAgIT09ICd1bmRlZmluZWQnID8gc2VsZiA6XHJcbiAgICAgICAgICAgICAgICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXHJcbiAgICAgICAgICAgICAgICAgICAgIHR5cGVvZiBnbG9iYWwgIT09ICd1bmRlZmluZWQnID8gZ2xvYmFsIDpcclxuICAgICAgICAgICAgICAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cclxuICAgICAgICAgICAgICAgICAgICAgbnVsbDtcclxuXHJcbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXHJcbiAgICAgICAgaWYgKCFyb290KSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVW5zdXBwb3J0ZWQgZW52aXJvbm1lbnQuJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gcm9vdDtcclxuICAgIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvaWZkZWYtbG9hZGVyL2lmZGVmLWxvYWRlci5qcz9ERUJVRz10cnVlJlBFUkZPUk1BTkNFX0FVRElUPXRydWUhLi9zcmMvZnJhbWV3b3JrL2dsb2JhbC50cyIsIi8qKlxyXG4gKiBBUEkgb2YgdGltZXN0YW1wIHByb3ZpZGVyIGRlZmluaXRpb25cclxuICpcclxuICogQGludGVybmFsXHJcbiAqIEBpbnRlcmZhY2UgSVRpbWVTdGFtcFByb3ZpZGVyXHJcbiAqL1xyXG5leHBvcnQgaW50ZXJmYWNlIElUaW1lU3RhbXBQcm92aWRlciB7XHJcbiAgICBub3coKTogbnVtYmVyO1xyXG59XHJcblxyXG4vKipcclxuICogU2ltcGxlIHRpbWVzdGFtcCBwcm92aWRlciBpbXBsZW1lbnRhdGlvblxyXG4gKlxyXG4gKiBAaW50ZXJuYWxcclxuICogQGNsYXNzIFRpbWVTdGFtcFByb3ZpZGVyXHJcbiAqIEBpbXBsZW1lbnRzIHtJVGltZVN0YW1wUHJvdmlkZXJ9XHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgVGltZVN0YW1wUHJvdmlkZXIgaW1wbGVtZW50cyBJVGltZVN0YW1wUHJvdmlkZXIge1xyXG4gICAgcHVibGljIG5vdygpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiArbmV3IERhdGUoKTtcclxuICAgIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvaWZkZWYtbG9hZGVyL2lmZGVmLWxvYWRlci5qcz9ERUJVRz10cnVlJlBFUkZPUk1BTkNFX0FVRElUPXRydWUhLi9zcmMvZnJhbWV3b3JrL3RpbWVzdGFtcC50cyIsImltcG9ydCB7IHRyYXZlcnNhbCB9IGZyb20gJy4vdHJhdmVyc2FsJztcclxuXHJcbi8qKlxyXG4gKiBFeHRlbmQgdGhlIGZpcnN0IG9iamVjdCBieSBhbGwgcHJvcGVydGllcyBmcm9tIHRoZSBzZWNvbmRcclxuICogUmV0dXJuIHRoZSBmaXJzdCBvYmplY3RcclxuICpcclxuICogQGludGVybmFsXHJcbiAqIEBwYXJhbSB7Kn0gZGVzdGluYXRpb24gLSBvYmplY3Qgd2hhdCB3aWxsIGJlIGV4dGVuZGVkXHJcbiAqIEBwYXJhbSB7Kn0gc291cmNlIC0gb2JqZWN0IHdpdGggc291cmNlIGRhdGFcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBleHRlbmQoZGVzdGluYXRpb246IGFueSwgLi4uc291cmNlczogQXJyYXk8YW55Pik6IGFueSB7XHJcbiAgICBpZiAoIWRlc3RpbmF0aW9uKSB7XHJcbiAgICAgICAgZGVzdGluYXRpb24gPSB7fTtcclxuICAgIH1cclxuXHJcbiAgICB0cmF2ZXJzYWwoKG5hbWUsIHNvdXJjZVZhbHVlKSA9PiB7XHJcbiAgICAgICAgaWYgKGRlc3RpbmF0aW9uW25hbWVdID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgZGVzdGluYXRpb25bbmFtZV0gPSBzb3VyY2VWYWx1ZTtcclxuICAgICAgICB9XHJcbiAgICB9LCBkZXN0aW5hdGlvbiwgc291cmNlcyk7XHJcblxyXG4gICAgcmV0dXJuIGRlc3RpbmF0aW9uO1xyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy9pZmRlZi1sb2FkZXIvaWZkZWYtbG9hZGVyLmpzP0RFQlVHPXRydWUmUEVSRk9STUFOQ0VfQVVESVQ9dHJ1ZSEuL3NyYy9mcmFtZXdvcmsvdXRpbHMvZXh0ZW5kLnRzIiwidmFyIGc7XG5cbi8vIFRoaXMgd29ya3MgaW4gbm9uLXN0cmljdCBtb2RlXG5nID0gKGZ1bmN0aW9uKCkge1xuXHRyZXR1cm4gdGhpcztcbn0pKCk7XG5cbnRyeSB7XG5cdC8vIFRoaXMgd29ya3MgaWYgZXZhbCBpcyBhbGxvd2VkIChzZWUgQ1NQKVxuXHRnID0gZyB8fCBGdW5jdGlvbihcInJldHVybiB0aGlzXCIpKCkgfHwgKDEsZXZhbCkoXCJ0aGlzXCIpO1xufSBjYXRjaChlKSB7XG5cdC8vIFRoaXMgd29ya3MgaWYgdGhlIHdpbmRvdyByZWZlcmVuY2UgaXMgYXZhaWxhYmxlXG5cdGlmKHR5cGVvZiB3aW5kb3cgPT09IFwib2JqZWN0XCIpXG5cdFx0ZyA9IHdpbmRvdztcbn1cblxuLy8gZyBjYW4gc3RpbGwgYmUgdW5kZWZpbmVkLCBidXQgbm90aGluZyB0byBkbyBhYm91dCBpdC4uLlxuLy8gV2UgcmV0dXJuIHVuZGVmaW5lZCwgaW5zdGVhZCBvZiBub3RoaW5nIGhlcmUsIHNvIGl0J3Ncbi8vIGVhc2llciB0byBoYW5kbGUgdGhpcyBjYXNlLiBpZighZ2xvYmFsKSB7IC4uLn1cblxubW9kdWxlLmV4cG9ydHMgPSBnO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gKHdlYnBhY2spL2J1aWxkaW4vZ2xvYmFsLmpzXG4vLyBtb2R1bGUgaWQgPSAyMFxuLy8gbW9kdWxlIGNodW5rcyA9IDEgMiAzIiwiZXhwb3J0ICogZnJvbSAnLi9leHRlbmQnO1xyXG5leHBvcnQgKiBmcm9tICcuL2dyb3VwQnknO1xyXG5leHBvcnQgKiBmcm9tICcuL292ZXJyaWRlJztcclxuZXhwb3J0ICogZnJvbSAnLi9zYWZlQ2xvbmUnO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvaWZkZWYtbG9hZGVyL2lmZGVmLWxvYWRlci5qcz9ERUJVRz10cnVlJlBFUkZPUk1BTkNFX0FVRElUPXRydWUhLi9zcmMvZnJhbWV3b3JrL3V0aWxzL2luZGV4LnRzIiwiZXhwb3J0IGFic3RyYWN0IGNsYXNzIFdlYlN0b3JhZ2VzIHtcclxuICAgIHByaXZhdGUgc3RhdGljIF9sb2NhbFN0b3JhZ2U6IFN0b3JhZ2UgfCBudWxsIHwgdW5kZWZpbmVkO1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0IGxvY2FsU3RvcmFnZSgpOiBTdG9yYWdlIHwgbnVsbCB7XHJcbiAgICAgICAgaWYgKFdlYlN0b3JhZ2VzLl9sb2NhbFN0b3JhZ2UgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gV2ViU3RvcmFnZXMuX2xvY2FsU3RvcmFnZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBXZWJTdG9yYWdlcy5fbG9jYWxTdG9yYWdlID0gV2ViU3RvcmFnZXMubG9jYWwoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBsb2NhbCgpOiBTdG9yYWdlIHwgbnVsbCB7XHJcbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXHJcbiAgICAgICAgaWYgKHR5cGVvZiBsb2NhbFN0b3JhZ2UgPT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLmdldEl0ZW0oJycpOyAvLyBsb2NhbFN0b3JhZ2Ugd2FzIGRpc2FibGVkIGJ5IHVzZXIuXHJcbiAgICAgICAgfSBjYXRjaCB7XHJcbiAgICAgICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGxvY2FsU3RvcmFnZTtcclxuICAgIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvaWZkZWYtbG9hZGVyL2lmZGVmLWxvYWRlci5qcz9ERUJVRz10cnVlJlBFUkZPUk1BTkNFX0FVRElUPXRydWUhLi9zcmMvZnJhbWV3b3JrL3dlYnN0b3JhZ2UudHMiLCIvKipcclxuICogVGhlIGNsYXNzIGNob29zZXMgdGhlIGJlc3QgdW5sb2FkIGV2ZW50IGZvciBkaWZmZXJlbnQgYnJvd3NlcnNcclxuICovXHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBVbmxvYWRFdmVudCB7XHJcbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IG1vZGUgPSB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyAoKHdpbmRvdy5vbnBhZ2VoaWRlIHx8IHdpbmRvdy5vbnBhZ2VoaWRlID09PSBudWxsKSA/ICdwYWdlaGlkZScgOiAndW5sb2FkJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogJ25vbmUnO1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgYWRkTGlzdGVuZXIoaGFuZGxlcjogKGV2ZW50OiBFdmVudCkgPT4gdm9pZCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHN3aXRjaCAoVW5sb2FkRXZlbnQubW9kZSkge1xyXG4gICAgICAgICAgICBjYXNlICdwYWdlaGlkZSc6IHtcclxuICAgICAgICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdwYWdlaGlkZScsIGhhbmRsZXIpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSAndW5sb2FkJzoge1xyXG4gICAgICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3VubG9hZCcsIGhhbmRsZXIpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZGVmYXVsdDogcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIHJlbW92ZUxpc3RlbmVyKGhhbmRsZXI6IChldmVudDogRXZlbnQpID0+IHZvaWQpOiBib29sZWFuIHtcclxuICAgICAgICBzd2l0Y2ggKFVubG9hZEV2ZW50Lm1vZGUpIHtcclxuICAgICAgICAgICAgY2FzZSAncGFnZWhpZGUnOiB7XHJcbiAgICAgICAgICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncGFnZWhpZGUnLCBoYW5kbGVyKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgJ3VubG9hZCc6IHtcclxuICAgICAgICAgICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCd1bmxvYWQnLCBoYW5kbGVyKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL2lmZGVmLWxvYWRlci9pZmRlZi1sb2FkZXIuanM/REVCVUc9dHJ1ZSZQRVJGT1JNQU5DRV9BVURJVD10cnVlIS4vc3JjL2ZyYW1ld29yay91bmxvYWQtZXZlbnQudHMiLCJpbXBvcnQgeyBJQWpheE9wdGlvbnMsIElBamF4UHJvdmlkZXIgfSBmcm9tICcuL2FqYXgtZGVmaW5pdGlvbnMnO1xyXG5cclxuZGVjbGFyZSBjbGFzcyBYRG9tYWluUmVxdWVzdCB7XHJcbiAgICBwdWJsaWMgb25sb2FkOiAoKSA9PiB2b2lkO1xyXG4gICAgcHVibGljIG9uZXJyb3I6ICgpID0+IHZvaWQ7XHJcbiAgICBwdWJsaWMgdGltZW91dDogbnVtYmVyO1xyXG5cclxuICAgIHB1YmxpYyByZXNwb25zZVRleHQ6IHN0cmluZztcclxuXHJcbiAgICBwdWJsaWMgb3BlbihtZXRob2Q6IHN0cmluZywgdXJsOiBzdHJpbmcsIGFzeW5jPzogYm9vbGVhbik6IHZvaWQ7XHJcblxyXG4gICAgcHVibGljIHNlbmQoZGF0YT86IHN0cmluZyk6IHZvaWQ7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBBamF4IHByb3ZpZGVyIGltcGxlbWVudGF0aW9uXHJcbiAqL1xyXG5jbGFzcyBBamF4UmVxdWVzdCB7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF94aHI6IFhNTEh0dHBSZXF1ZXN0IHwgWERvbWFpblJlcXVlc3Q7XHJcblxyXG4gICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cclxuICAgIGNvbnN0cnVjdG9yKGNvcnM6IGJvb2xlYW4pIHtcclxuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cclxuICAgICAgICBpZiAoY29ycyAmJiB0eXBlb2YgWERvbWFpblJlcXVlc3QgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3hociA9IG5ldyBYRG9tYWluUmVxdWVzdCgpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3hociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xyXG4gICAgcHVibGljIHNlbmQob3B0aW9uczogSUFqYXhPcHRpb25zKTogUHJvbWlzZTxzdHJpbmc+IHtcclxuICAgICAgICBjb25zdCB4aHIgPSB0aGlzLl94aHI7XHJcblxyXG4gICAgICAgIGNvbnN0IHR5cGUgPSBvcHRpb25zLnR5cGUgfHwgJ1BPU1QnO1xyXG4gICAgICAgIGNvbnN0IGJvZHkgPSBvcHRpb25zLmJvZHkgfHwgJyc7XHJcbiAgICAgICAgY29uc3QgdXJsID0gb3B0aW9ucy51cmw7XHJcbiAgICAgICAgY29uc3QgdGltZW91dCA9IG9wdGlvbnMudGltZW91dDtcclxuXHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgeGhyLm9wZW4odHlwZSwgdXJsLCAvKmFzeW5jKi8gdHJ1ZSk7XHJcbiAgICAgICAgICAgIGlmICh0aW1lb3V0ICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIHhoci50aW1lb3V0ID0gdGltZW91dDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5zdWJzY3JpYmUocmVzb2x2ZSwgcmVqZWN0LCB0aW1lb3V0KTtcclxuICAgICAgICAgICAgeGhyLnNlbmQoYm9keSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cclxuICAgIHByaXZhdGUgc3Vic2NyaWJlKHJlc29sdmU6ICh2YWx1ZT86IHN0cmluZykgPT4gdm9pZCwgcmVqZWN0OiAocmVhc29uPzogc3RyaW5nKSA9PiB2b2lkLCB0aW1lb3V0OiBudW1iZXIgfCB1bmRlZmluZWQpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCB4aHIgPSB0aGlzLl94aHI7XHJcblxyXG4gICAgICAgIGNvbnN0IGxvZyA9IG5ldyBBcnJheTxudW1iZXI+KCk7XHJcblxyXG4gICAgICAgIGlmICh4aHIgaW5zdGFuY2VvZiBYTUxIdHRwUmVxdWVzdCkge1xyXG4gICAgICAgICAgICB4aHIub25yZWFkeXN0YXRlY2hhbmdlID0gKGFFdnQpID0+IHtcclxuICAgICAgICAgICAgICAgIGxvZy5wdXNoKHhoci5yZWFkeVN0YXRlKTtcclxuICAgICAgICAgICAgICAgIGlmICh4aHIucmVhZHlTdGF0ZSA9PT0gNCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh4aHIuc3RhdHVzID49IDIwMCAmJiB4aHIuc3RhdHVzIDwgMzAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoeGhyLnJlc3BvbnNlVGV4dCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KHhoci5yZXNwb25zZVRleHQgfHwgeGhyLnJlc3BvbnNlVHlwZSB8fCAnQ09SUyBwcm9ibGVtJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHhoci5vbmxvYWQgPSAoKSA9PiByZXNvbHZlKHhoci5yZXNwb25zZVRleHQpO1xyXG4gICAgICAgICAgICB4aHIub25lcnJvciA9ICgpID0+IHJlamVjdCgnWERvbWFpbiBDT1JTIHByb2JsZW0nKTtcclxuXHJcbiAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTptYXgtbGluZS1sZW5ndGhcclxuICAgICAgICAgICAgLy8gRml4ZXMgYnVnIHdpdGggSUU5OiBodHRwczovL3NvY2lhbC5tc2RuLm1pY3Jvc29mdC5jb20vRm9ydW1zL2llL2VuLVVTLzMwZWYzYWRkLTc2N2MtNDQzNi1iOGE5LWYxY2ExOWI0ODEyZS9pZTktcnRtLXhkb21haW5yZXF1ZXN0LWlzc3VlZC1yZXF1ZXN0cy1tYXktYWJvcnQtaWYtYWxsLWV2ZW50LWhhbmRsZXJzLW5vdC1zcGVjaWZpZWQ/Zm9ydW09aWV3ZWJkZXZlbG9wbWVudFxyXG4gICAgICAgICAgICAoeGhyIGFzIGFueSkub25wcm9ncmVzcyA9ICgpID0+IHsgLyoqLyB9O1xyXG4gICAgICAgICAgICAoeGhyIGFzIGFueSkub250aW1lb3V0ID0gKCkgPT4geyByZWplY3QoJ1RpbWVvdXQnKTsgfTtcclxuICAgICAgICAgICAgaWYgKHRpbWVvdXQpIHtcclxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gcmVqZWN0KCdNYW51YWwgdGltZW91dCcpLCB0aW1lb3V0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIEFqYXggcHJvdmlkZXIgY29uc3RydWN0b3JcclxuICpcclxuICogQGludGVybmFsXHJcbiAqIEBjbGFzcyBBamF4XHJcbiAqIEBpbXBsZW1lbnRzIHtJQWpheFByb3ZpZGVyfVxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIEFqYXggaW1wbGVtZW50cyBJQWpheFByb3ZpZGVyIHtcclxuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXHJcbiAgICBwdWJsaWMgc2VuZChvcHRpb25zOiBJQWpheE9wdGlvbnMpOiBQcm9taXNlPHN0cmluZz4ge1xyXG4gICAgICAgIGlmICh0eXBlb2YgZmV0Y2ggIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmZldGNoKG9wdGlvbnMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cclxuICAgICAgICBjb25zdCBpc0Fic29sdXRlVXJsID0gb3B0aW9ucy51cmwuaW5kZXhPZignOi8vJykgPiAwIHx8IG9wdGlvbnMudXJsLmluZGV4T2YoJy8vJykgPT09IDA7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBBamF4UmVxdWVzdCgvKmVuYWJsZSBDT1JTOiAqLyBpc0Fic29sdXRlVXJsKS5zZW5kKG9wdGlvbnMpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZmV0Y2gob3B0aW9uczogSUFqYXhPcHRpb25zKTogUHJvbWlzZTxzdHJpbmc+IHtcclxuICAgICAgICByZXR1cm4gZmV0Y2gob3B0aW9ucy51cmwsIHtcclxuICAgICAgICAgICAgYm9keTogb3B0aW9ucy5ib2R5LFxyXG4gICAgICAgICAgICBtZXRob2Q6IG9wdGlvbnMudHlwZVxyXG4gICAgICAgIH0pLnRoZW4oKHJlc3BvbnNlOiBSZXNwb25zZSkgPT4gLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi8gcmVzcG9uc2UudGV4dCgpKTtcclxuICAgIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvaWZkZWYtbG9hZGVyL2lmZGVmLWxvYWRlci5qcz9ERUJVRz10cnVlJlBFUkZPUk1BTkNFX0FVRElUPXRydWUhLi9zcmMvZnJhbWV3b3JrL2FqYXgudHMiLCIvLyB0c2xpbnQ6ZGlzYWJsZTpuby1hbnlcclxuLyoqXHJcbiAqIFByb3ZpZGUgc2luZ2xlIGV4ZWN1dGlvbiBvZiBwYXNzZWQgZnVuY3Rpb25cclxuICpcclxuICogQGludGVybmFsXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgU2luZ2xldG9uPFRGdW5jIGV4dGVuZHMgKC4uLmFyZ3M6IEFycmF5PGFueT4pID0+IGFueT4ge1xyXG4gICAgcHVibGljIHJlYWRvbmx5IGV4ZWN1dGVPbmNlOiBURnVuYztcclxuXHJcbiAgICBwcml2YXRlIF9leGVjdXRlZCA9IGZhbHNlO1xyXG5cclxuICAgIHByaXZhdGUgX3Jlc3VsdDogYW55O1xyXG5cclxuICAgIHB1YmxpYyBnZXQgZXhlY3V0ZWQoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl9leGVjdXRlZDsgfVxyXG5cclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgX2Z1bmM6IFRGdW5jXHJcbiAgICApIHtcclxuICAgICAgICB0aGlzLmV4ZWN1dGVPbmNlID0gdGhpcy5leGVjdXRlIGFzIFRGdW5jO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZXhlY3V0ZSA9ICguLi5hcmdzOiBBcnJheTxhbnk+KSA9PiB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2V4ZWN1dGVkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9yZXN1bHQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9yZXN1bHQgPSB0aGlzLl9mdW5jKC4uLmFyZ3MpO1xyXG5cclxuICAgICAgICB0aGlzLl9leGVjdXRlZCA9IHRydWU7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLl9yZXN1bHQ7XHJcbiAgICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL2lmZGVmLWxvYWRlci9pZmRlZi1sb2FkZXIuanM/REVCVUc9dHJ1ZSZQRVJGT1JNQU5DRV9BVURJVD10cnVlIS4vc3JjL2ZyYW1ld29yay9zaW5nbGV0b24udHMiLCIvKipcclxuICogQGludGVybmFsXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZ3JvdXBCeTxUSXRlbSwgVEtleT4oYXJyYXk6IEFycmF5PFRJdGVtPiwgcHJlZGljYXRlOiAob2JqOiBUSXRlbSkgPT4gVEtleSk6IE1hcDxUS2V5LCBBcnJheTxUSXRlbT4+IHtcclxuICAgIHJldHVybiBhcnJheS5yZWR1Y2UoKG1hcDogTWFwPFRLZXksIEFycmF5PFRJdGVtPj4sIGN1cnJlbnQ6IFRJdGVtKSA9PiB7XHJcbiAgICAgICAgY29uc3Qga2V5ID0gcHJlZGljYXRlKGN1cnJlbnQpO1xyXG4gICAgICAgIGxldCBwcmV2ID0gbWFwLmdldChrZXkpO1xyXG4gICAgICAgIGlmICghcHJldikge1xyXG4gICAgICAgICAgICBtYXAuc2V0KGtleSwgcHJldiA9IFtdKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHJldi5wdXNoKGN1cnJlbnQpO1xyXG4gICAgICAgIHJldHVybiBtYXA7XHJcbiAgICB9LCBuZXcgTWFwPFRLZXksIEFycmF5PFRJdGVtPj4oKSk7XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL2lmZGVmLWxvYWRlci9pZmRlZi1sb2FkZXIuanM/REVCVUc9dHJ1ZSZQRVJGT1JNQU5DRV9BVURJVD10cnVlIS4vc3JjL2ZyYW1ld29yay91dGlscy9ncm91cEJ5LnRzIiwiaW1wb3J0IHsgdHJhdmVyc2FsIH0gZnJvbSAnLi90cmF2ZXJzYWwnO1xyXG5cclxuLyoqXHJcbiAqIE92ZXJyaWRlIHRoZSBmaXJzdCBvYmplY3QgYnkgYWxsIHByb3BlcnRpZXMgZnJvbSB0aGUgc2Vjb25kXHJcbiAqIFJldHVybiB0aGUgZmlyc3Qgb2JqZWN0XHJcbiAqXHJcbiAqIEBpbnRlcm5hbFxyXG4gKiBAcGFyYW0geyp9IGRlc3RpbmF0aW9uIC0gb2JqZWN0IHdoYXQgd2lsbCBiZSBvdmVycmlkZWRcclxuICogQHBhcmFtIHsqfSBzb3VyY2UgLSBvYmplY3Qgd2l0aCBzb3VyY2UgZGF0YVxyXG4gKi9cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBvdmVycmlkZShkZXN0aW5hdGlvbjogYW55LCAuLi5zb3VyY2VzOiBBcnJheTxhbnk+KTogYW55IHtcclxuICAgIGlmICghZGVzdGluYXRpb24pIHtcclxuICAgICAgICBkZXN0aW5hdGlvbiA9IHt9O1xyXG4gICAgfVxyXG5cclxuICAgIHRyYXZlcnNhbCgobmFtZSwgc291cmNlVmFsdWUpID0+IHtcclxuICAgICAgICBkZXN0aW5hdGlvbltuYW1lXSA9IHNvdXJjZVZhbHVlO1xyXG4gICAgfSwgZGVzdGluYXRpb24sIHNvdXJjZXMpO1xyXG5cclxuICAgIHJldHVybiBkZXN0aW5hdGlvbjtcclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvaWZkZWYtbG9hZGVyL2lmZGVmLWxvYWRlci5qcz9ERUJVRz10cnVlJlBFUkZPUk1BTkNFX0FVRElUPXRydWUhLi9zcmMvZnJhbWV3b3JrL3V0aWxzL292ZXJyaWRlLnRzIiwiaW1wb3J0IHsgdHJhdmVyc2FsIH0gZnJvbSAnLi90cmF2ZXJzYWwnO1xyXG5cclxuLyoqXHJcbiAqIENsb25lIG9iamVjdCBkYXRhIHdpdGhvdXQgZnVuY3Rpb25zXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gc2FmZUNsb25lKHNvdXJjZTogYW55KTogYW55IHtcclxuICAgIGNvbnN0IGRlc3RpbmF0aW9uOiBhbnkgPSB7IH07XHJcblxyXG4gICAgdHJhdmVyc2FsKChuYW1lLCBzb3VyY2VWYWx1ZSkgPT4ge1xyXG4gICAgICAgIGlmICh0eXBlb2YgKHNvdXJjZVZhbHVlKSAhPT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICBkZXN0aW5hdGlvbltuYW1lXSA9IHNvdXJjZVZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgIH0sIGRlc3RpbmF0aW9uLCBbIHNvdXJjZSBdKTtcclxuXHJcbiAgICByZXR1cm4gZGVzdGluYXRpb247XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL2lmZGVmLWxvYWRlci9pZmRlZi1sb2FkZXIuanM/REVCVUc9dHJ1ZSZQRVJGT1JNQU5DRV9BVURJVD10cnVlIS4vc3JjL2ZyYW1ld29yay91dGlscy9zYWZlQ2xvbmUudHMiLCJpbXBvcnQgeyBJTG9nZ2VyIH0gZnJvbSAnLi9sb2dnZXInO1xyXG5cclxuLyoqXHJcbiAqIFByaW50IGludGVybmFsIGxvZyBtZXNzYWdlcyBpbiBicm93c2VyIGNvbnNvbGVcclxuICpcclxuICogSXMgbm90IHN1cHBvcnRlZCBmb3Igc29tZSBlbnZpcm9ubWVudFxyXG4gKlxyXG4gKiBAaW50ZXJuYWxcclxuICogQGNsYXNzIENvbnNvbGVMb2dnZXJcclxuICogQGltcGxlbWVudHMge0lMb2dnZXJ9XHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgQ29uc29sZUxvZ2dlciBpbXBsZW1lbnRzIElMb2dnZXIge1xyXG4gICAgcHVibGljIHJlYWRvbmx5IHByZWZpeDogc3RyaW5nID0gYFttZXNzYWdpbmctY2xpZW50LmpzXTogYDtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IF9vcHRpb25zOiB7IG11dGU6IGJvb2xlYW4gfVxyXG4gICAgKSB7IH1cclxuXHJcbiAgICBwdWJsaWMgZmF0YWwobWVzc2FnZTogc3RyaW5nLCBlcnJvcj86IEVycm9yKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9vcHRpb25zLm11dGUpIHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcih0aGlzLnByZWZpeCArIG1lc3NhZ2UsIGVycm9yKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGVycm9yKG1lc3NhZ2U6IHN0cmluZywgZXJyb3I/OiBFcnJvcik6IHZvaWQge1xyXG4gICAgICAgIGlmICghdGhpcy5fb3B0aW9ucy5tdXRlKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IodGhpcy5wcmVmaXggKyBtZXNzYWdlLCBlcnJvcik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBsb2cobWVzc2FnZTogc3RyaW5nKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9vcHRpb25zLm11dGUpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5wcmVmaXggKyBtZXNzYWdlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL2lmZGVmLWxvYWRlci9pZmRlZi1sb2FkZXIuanM/REVCVUc9dHJ1ZSZQRVJGT1JNQU5DRV9BVURJVD10cnVlIS4vc3JjL2xvZ3MvY29uc29sZS1sb2dnZXIudHMiLCJpbXBvcnQgeyBFdmVudEVtaXR0ZXIgfSBmcm9tICcuLi9mcmFtZXdvcmsvZXZlbnQtZW1pdHRlcic7XHJcbmltcG9ydCB7IElMb2dnZXIgfSBmcm9tICcuL2xvZ2dlcic7XHJcbmltcG9ydCB7IElXb3JrZXJMb2cgfSBmcm9tICcuL3dvcmtlci1sb2cnO1xyXG5cclxuLyoqXHJcbiAqIFNlbmQgbG9nIG1lc3NhZ2VzIGludG8gRXZlbnRFbWl0dGVyXHJcbiAqXHJcbiAqIEBpbnRlcm5hbFxyXG4gKiBAY2xhc3MgRXZlbnRMb2dnZXJcclxuICogQGltcGxlbWVudHMge0lMb2dnZXJ9XHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgRXZlbnRMb2dnZXIgaW1wbGVtZW50cyBJTG9nZ2VyIHtcclxuICAgIHB1YmxpYyByZWFkb25seSBvbmxvZyA9IG5ldyBFdmVudEVtaXR0ZXI8SVdvcmtlckxvZz4oKTtcclxuXHJcbiAgICBwdWJsaWMgZmF0YWwobWVzc2FnZTogc3RyaW5nLCBlcnJvcj86IEVycm9yKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5vbmxvZy5lbWl0KHtsZXZlbDogJ2ZhdGFsJywgbWVzc2FnZSwgZXJyb3J9KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZXJyb3IobWVzc2FnZTogc3RyaW5nLCBlcnJvcj86IEVycm9yKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5vbmxvZy5lbWl0KHtsZXZlbDogJ2Vycm9yJywgbWVzc2FnZSwgZXJyb3J9KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbG9nKG1lc3NhZ2U6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMub25sb2cuZW1pdCh7bGV2ZWw6ICdsb2cnLCBtZXNzYWdlfSk7XHJcbiAgICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL2lmZGVmLWxvYWRlci9pZmRlZi1sb2FkZXIuanM/REVCVUc9dHJ1ZSZQRVJGT1JNQU5DRV9BVURJVD10cnVlIS4vc3JjL2xvZ3MvZXZlbnQtbG9nZ2VyLnRzIiwiaW1wb3J0IHsgSUxvZ2dlciB9IGZyb20gJy4vbG9nZ2VyJztcclxuXHJcbi8qKlxyXG4gKiBQcm94eSBsb2dnZXIgdG8gcmVzZW5kIGFsbCBsb2cgbWVzc2FnZXMgdG8gYW5vdGhlciBsb2dnZXJzXHJcbiAqXHJcbiAqIEBpbnRlcm5hbFxyXG4gKiBAY2xhc3MgVW5pdmVyc2FsTG9nZ2VyXHJcbiAqIEBpbXBsZW1lbnRzIHtJTG9nZ2VyfVxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFVuaXZlcnNhbExvZ2dlciBpbXBsZW1lbnRzIElMb2dnZXIge1xyXG4gICAgcHVibGljIGVuYWJsZWQ6IGJvb2xlYW4gPSB0cnVlO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBsb2dnZXJzOiBBcnJheTxJTG9nZ2VyPiA9IFtdXHJcbiAgICApIHsgfVxyXG5cclxuICAgIHB1YmxpYyBmYXRhbChtZXNzYWdlOiBzdHJpbmcsIGVycm9yPzogRXJyb3IpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5lbmFibGVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9nZ2VyKChsKSA9PiBsLmZhdGFsKG1lc3NhZ2UsIGVycm9yKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBlcnJvcihtZXNzYWdlOiBzdHJpbmcsIGVycm9yPzogRXJyb3IpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5lbmFibGVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9nZ2VyKChsKSA9PiBsLmVycm9yKG1lc3NhZ2UsIGVycm9yKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBsb2cobWVzc2FnZTogc3RyaW5nKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuZW5hYmxlZCkge1xyXG4gICAgICAgICAgICB0aGlzLmxvZ2dlcigobCkgPT4gbC5sb2cobWVzc2FnZSkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlcGxhY2UgZXhpc3RpbmcgbG9nZ2VycyB0byBuZXcgb25lc1xyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7QXJyYXk8SUxvZ2dlcj59IGxvZ2dlcnNcclxuICAgICAqIEBtZW1iZXJvZiBVbml2ZXJzYWxMb2dnZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIHJlcGxhY2UobmV3TG9nZ2VyczogQXJyYXk8SUxvZ2dlcj4pOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmxvZ2dlcnMubGVuZ3RoID0gMDtcclxuXHJcbiAgICAgICAgY29uc3QgbGVuZ3RoID0gbmV3TG9nZ2Vycy5sZW5ndGg7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLmxvZ2dlcnMucHVzaChuZXdMb2dnZXJzW2ldKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBsb2dnZXIoZXhlY3V0ZTogKGxvZ2dlcjogSUxvZ2dlcikgPT4gdm9pZCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IGxvZ2dlcnMgPSB0aGlzLmxvZ2dlcnM7XHJcbiAgICAgICAgY29uc3QgbGVuZ3RoID0gbG9nZ2Vycy5sZW5ndGg7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBleGVjdXRlKGxvZ2dlcnNbaV0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvaWZkZWYtbG9hZGVyL2lmZGVmLWxvYWRlci5qcz9ERUJVRz10cnVlJlBFUkZPUk1BTkNFX0FVRElUPXRydWUhLi9zcmMvbG9ncy91bml2ZXJzYWwtbG9nZ2VyLnRzIiwiZXhwb3J0IGZ1bmN0aW9uIGVuZHNXaXRoKHN0cjogc3RyaW5nLCBzZWFyY2hTdHI6IHN0cmluZyk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHN0ci5zdWJzdHIoLXNlYXJjaFN0ci5sZW5ndGgsIHNlYXJjaFN0ci5sZW5ndGgpID09PSBzZWFyY2hTdHI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBtYXBQYXRoKHBhdGgxOiBzdHJpbmcsIHBhdGgyOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgaWYgKHBhdGgyWzBdID09PSAnLycpIHtcclxuICAgICAgICByZXR1cm4gcGF0aDI7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgaW5kZXggPSBwYXRoMS5sYXN0SW5kZXhPZignLycpO1xyXG4gICAgaWYgKGluZGV4IDwgMCkge1xyXG4gICAgICAgIHJldHVybiAnLycgKyBwYXRoMjtcclxuICAgIH1cclxuICAgIHJldHVybiBwYXRoMS5zdWJzdHJpbmcoMCwgaW5kZXggKyAxKSArIHBhdGgyO1xyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy9pZmRlZi1sb2FkZXIvaWZkZWYtbG9hZGVyLmpzP0RFQlVHPXRydWUmUEVSRk9STUFOQ0VfQVVESVQ9dHJ1ZSEuL3NyYy9mcmFtZXdvcmsvc3RyaW5ncy50cyIsImV4cG9ydCAqIGZyb20gJy4vcXVldWUnO1xyXG5leHBvcnQgKiBmcm9tICcuL21lbW9yeSc7XHJcbmV4cG9ydCAqIGZyb20gJy4vc2FtcGxlZC1xdWV1ZSc7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy9pZmRlZi1sb2FkZXIvaWZkZWYtbG9hZGVyLmpzP0RFQlVHPXRydWUmUEVSRk9STUFOQ0VfQVVESVQ9dHJ1ZSEuL3NyYy9xdWV1ZXMvaW5kZXgudHMiLCJpbXBvcnQgeyBJbmRleGVkREJQcm92aWRlciB9IGZyb20gJy4vaW5kZXhlZGRiLXByb3ZpZGVyJztcclxuXHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBJbmRleGVkRGJVdGlscyB7XHJcbiAgICBwdWJsaWMgc3RhdGljIG9wZW4oXHJcbiAgICAgICAgbmFtZTogc3RyaW5nLFxyXG4gICAgICAgIHZlcnNpb246IG51bWJlcixcclxuICAgICAgICBvbnVwZ3JhZGVuZWVkZWQ6IChkYjogSURCRGF0YWJhc2UpID0+IHZvaWQsXHJcbiAgICAgICAgYXR0ZW1wdHM6IG51bWJlciA9IDNcclxuICAgICk6IFByb21pc2U8SURCRGF0YWJhc2U+IHtcclxuICAgICAgICBjb25zdCBmYWN0b3J5ID0gSW5kZXhlZERCUHJvdmlkZXIuZ2V0SW5kZXhlZERCKCk7XHJcblxyXG4gICAgICAgIGlmICghZmFjdG9yeSkge1xyXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoJ0Nhbm5vdCBpbnN0YW50aWF0ZSBJbmRleGVkREIgZmFjdG9yeS4nKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZTxJREJEYXRhYmFzZT4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgYXR0ZW1wdENvdW50ZXIgPSAwO1xyXG4gICAgICAgICAgICBjb25zdCBvcGVuID0gKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgYXR0ZW1wdENvdW50ZXIrKztcclxuXHJcbiAgICAgICAgICAgICAgICBjb25zdCByZXF1ZXN0ID0gZmFjdG9yeS5vcGVuKG5hbWUsIDEpO1xyXG5cclxuICAgICAgICAgICAgICAgIHJlcXVlc3Qub25zdWNjZXNzID0gKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGRiID0gcmVxdWVzdC5yZXN1bHQgYXMgSURCRGF0YWJhc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShkYik7XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgcmVxdWVzdC5vbnVwZ3JhZGVuZWVkZWQgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZGIgPSByZXF1ZXN0LnJlc3VsdCBhcyBJREJEYXRhYmFzZTtcclxuICAgICAgICAgICAgICAgICAgICBvbnVwZ3JhZGVuZWVkZWQoZGIpO1xyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIHJlcXVlc3Qub25lcnJvciA9ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoYXR0ZW1wdENvdW50ZXIgPj0gYXR0ZW1wdHMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGBFcnJvciBvbiBvcGVubmluZyBJbmRleGVkREIgJyR7bmFtZX0nLiBBdHRlbXB0cyBjb3VudDogJHthdHRlbXB0Q291bnRlcn0uYCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wZW5TYWZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIHJlcXVlc3Qub25ibG9ja2VkID0gKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIG9wZW5TYWZlKCk7XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBjb25zdCBvcGVuU2FmZSA9ICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICAgICAgb3BlbigpO1xyXG4gICAgICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyb3IubWVzc2FnZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIG9wZW5TYWZlKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyB0cmFuc2FjdGlvbjxUPihcclxuICAgICAgICBzdG9yZUZhY3Rvcnk6ICgpID0+IElEQk9iamVjdFN0b3JlLFxyXG4gICAgICAgIGFjdGlvbjogKHN0b3JhZ2U6IElEQk9iamVjdFN0b3JlLCByZXN1bHQ6IFQpID0+IHZvaWQsXHJcbiAgICAgICAgcmVzdWx0OiBUXHJcbiAgICApOiBQcm9taXNlPFQ+IHtcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2U8VD4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBzdG9yYWdlID0gc3RvcmVGYWN0b3J5KCk7XHJcblxyXG4gICAgICAgICAgICBzdG9yYWdlLnRyYW5zYWN0aW9uLm9uY29tcGxldGUgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3VsdCk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHN0b3JhZ2UudHJhbnNhY3Rpb24ub25hYm9ydCA9IHN0b3JhZ2UudHJhbnNhY3Rpb24ub25lcnJvciA9IChlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KChlIGFzIGFueSkubWVzc2FnZSB8fCBlLnR5cGUpO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgYWN0aW9uKHN0b3JhZ2UsIHJlc3VsdCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyByZXF1ZXN0PFREYXRhPihcclxuICAgICAgICByZXF1ZXN0OiBJREJSZXF1ZXN0LFxyXG4gICAgICAgIGFjdGlvbj86IChkYXRhOiBURGF0YSkgPT4gdm9pZFxyXG4gICAgKTogdm9pZCB7XHJcbiAgICAgICAgcmVxdWVzdC5vbnN1Y2Nlc3MgPSAoZSkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBkYXRhID0gKGUudGFyZ2V0IGFzIGFueSkucmVzdWx0IGFzIFREYXRhO1xyXG5cclxuICAgICAgICAgICAgaWYgKGFjdGlvbikge1xyXG4gICAgICAgICAgICAgICAgYWN0aW9uKGRhdGEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICByZXF1ZXN0Lm9uZXJyb3IgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIHJlcXVlc3QudHJhbnNhY3Rpb24uYWJvcnQoKTtcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgYWRkQXJyYXk8VEl0ZW0+KFxyXG4gICAgICAgIHN0b3JhZ2U6IElEQk9iamVjdFN0b3JlLFxyXG4gICAgICAgIGl0ZW1zOiBBcnJheTxUSXRlbT4sXHJcbiAgICAgICAgY29tcGxldGVkPzogKCkgPT4gdm9pZFxyXG4gICAgKTogdm9pZCB7XHJcbiAgICAgICAgbGV0IGkgPSAwO1xyXG5cclxuICAgICAgICBjb25zdCBhZGROZXh0ID0gKCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoaSA8IGl0ZW1zLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaXRlbSA9IGl0ZW1zW2ldO1xyXG4gICAgICAgICAgICAgICAgaSsrO1xyXG4gICAgICAgICAgICAgICAgSW5kZXhlZERiVXRpbHMucmVxdWVzdDxJREJDdXJzb3JXaXRoVmFsdWU+KHN0b3JhZ2UuYWRkKGl0ZW0pLCBhZGROZXh0KTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlmIChjb21wbGV0ZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb21wbGV0ZWQoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGFkZE5leHQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIHJlbW92ZShuYW1lOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICBjb25zdCBmYWN0b3J5ID0gSW5kZXhlZERCUHJvdmlkZXIuZ2V0SW5kZXhlZERCKCk7XHJcblxyXG4gICAgICAgIGlmICghZmFjdG9yeSkge1xyXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoJ0Nhbm5vdCBpbnN0YW50aWF0ZSBJbmRleGVkREIgZmFjdG9yeS4nKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZTx2b2lkPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHJlcXVlc3QgPSBmYWN0b3J5LmRlbGV0ZURhdGFiYXNlKG5hbWUpO1xyXG4gICAgICAgICAgICByZXF1ZXN0Lm9uc3VjY2VzcyA9ICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgcmVxdWVzdC5vbmVycm9yID0gKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmVqZWN0KGBFcnJvciBvbiByZW1vdmluZyBJbmRleGVkREIgJyR7bmFtZX0nYCk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHJlcXVlc3Qub25ibG9ja2VkID0gKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmVqZWN0KGBSZW1vdmluZyAnJHtuYW1lfScgd2FzIGJsb2NrZWQuYCk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL2lmZGVmLWxvYWRlci9pZmRlZi1sb2FkZXIuanM/REVCVUc9dHJ1ZSZQRVJGT1JNQU5DRV9BVURJVD10cnVlIS4vc3JjL2ZyYW1ld29yay9pbmRleGVkZGItdXRpbHMudHMiLCJpbXBvcnQgeyBHdWlkUHJvdmlkZXIgfSBmcm9tICcuLi8uLi9mcmFtZXdvcmsvZ3VpZCc7XHJcbmltcG9ydCB7IElXb3JrZXJNZXNzYWdlLCBJV29ya2VyTWVzc2FnZVJlY2VpdmVyLCBJV29ya2VyTWVzc2FnZVNlbmRlciwgV29ya2VyRGF0YVR5cGUgfSBmcm9tICcuLi93b3JrZXItZGVmaW5pdGlvbnMnO1xyXG5pbXBvcnQgeyBJUmVxdWVzdEVudmVsb3AgfSBmcm9tICcuL3dvcmtlci1yZXF1ZXN0LXJlY2VpdmVyJztcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSVJlc3BvbnNlRW52ZWxvcDxUVHlwZSBleHRlbmRzIFdvcmtlckRhdGFUeXBlLCBUUmVzcG9uc2U+IGV4dGVuZHMgSVdvcmtlck1lc3NhZ2U8VFR5cGU+ICB7XHJcbiAgICByZXNwb25zZT86IFRSZXNwb25zZTtcclxuXHJcbiAgICBlcnJvcj86IHsgbWVzc2FnZTogc3RyaW5nIH07XHJcblxyXG4gICAgbWVzc2FnZUlkOiBzdHJpbmc7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUVycm9yIHtcclxuICAgIG1lc3NhZ2U6IHN0cmluZztcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFdvcmtlclJlcXVlc3RTZW5kZXI8VFR5cGUgZXh0ZW5kcyBXb3JrZXJEYXRhVHlwZSwgVFJlcXVlc3QsIFRSZXNwb25zZT4ge1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfZGljdGlvbmFyeToge1xyXG4gICAgICAgIFttZXNzYWdlaWQ6IHN0cmluZ106IHtcclxuICAgICAgICAgICAgcmVzb2x2ZT86IChyZXNwb25zZT86IFRSZXNwb25zZSkgPT4gdm9pZCxcclxuICAgICAgICAgICAgcmVqZWN0PzogKGVycm9yOiBJRXJyb3IpID0+IHZvaWRcclxuICAgICAgICB9XHJcbiAgICB9ID0geyB9O1xyXG5cclxuICAgIHByaXZhdGUgcmVhZG9ubHkgX2d1aWQgPSBHdWlkUHJvdmlkZXIuZGVmYXVsdDtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgdHlwZTogVFR5cGUsXHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBfc2VuZGVyOiBJV29ya2VyTWVzc2FnZVNlbmRlcixcclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IF9yZWNlaXZlcjogSVdvcmtlck1lc3NhZ2VSZWNlaXZlclxyXG4gICAgKSB7XHJcbiAgICAgICAgX3JlY2VpdmVyLmFkZEV2ZW50TGlzdGVuZXIodHlwZSwgdGhpcy5fcmVzcG9uc2UpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZW5kKGRhdGE/OiBUUmVxdWVzdCwgcmVzb2x2ZWQ/OiAocmVzcG9uc2U6IFRSZXNwb25zZSkgPT4gdm9pZCwgcmVqZWN0ZWQ/OiAoZXJyb3I6IElFcnJvcikgPT4gdm9pZCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IG1lc3NhZ2VJZCA9IHRoaXMuX2d1aWQubmV4dCgpO1xyXG5cclxuICAgICAgICB0aGlzLl9kaWN0aW9uYXJ5W21lc3NhZ2VJZF0gPSB7IHJlc29sdmU6IHJlc29sdmVkLCByZWplY3Q6IHJlamVjdGVkIH07XHJcblxyXG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IHRoaXMuX3NlbmRlci5wb3N0TWVzc2FnZSh7IHR5cGU6IHRoaXMudHlwZSwgbWVzc2FnZUlkLCByZXF1ZXN0OiBkYXRhIH0gYXMgSVJlcXVlc3RFbnZlbG9wPFRUeXBlLCBUUmVxdWVzdD4pO1xyXG4gICAgICAgIGlmIChyZXN1bHQgJiYgdHlwZW9mIHJlc3VsdC5jYXRjaCA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICByZXN1bHQuY2F0Y2gocmVqZWN0ZWQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZGlzcG9zZSgpIHtcclxuICAgICAgICB0aGlzLl9yZWNlaXZlci5yZW1vdmVFdmVudExpc3RlbmVyKHRoaXMudHlwZSwgdGhpcy5fcmVzcG9uc2UpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX3Jlc3BvbnNlID0gKGRhdGE6IElSZXNwb25zZUVudmVsb3A8VFR5cGUsIFRSZXNwb25zZT4pID0+IHtcclxuICAgICAgICBjb25zdCBtZXNzYWdlSWQgPSBkYXRhLm1lc3NhZ2VJZDtcclxuXHJcbiAgICAgICAgaWYgKG1lc3NhZ2VJZCkge1xyXG4gICAgICAgICAgICBjb25zdCBjYWxsYmFja3MgPSB0aGlzLl9kaWN0aW9uYXJ5W21lc3NhZ2VJZF07XHJcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLl9kaWN0aW9uYXJ5W21lc3NhZ2VJZF07XHJcblxyXG4gICAgICAgICAgICBpZiAoY2FsbGJhY2tzKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0YS5lcnJvcikge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgY2FsbGJhY2tzLnJlamVjdCA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFja3MucmVqZWN0KGRhdGEuZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBjYWxsYmFja3MucmVzb2x2ZSA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFja3MucmVzb2x2ZShkYXRhLnJlc3BvbnNlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL2lmZGVmLWxvYWRlci9pZmRlZi1sb2FkZXIuanM/REVCVUc9dHJ1ZSZQRVJGT1JNQU5DRV9BVURJVD10cnVlIS4vc3JjL3dvcmtlcnMvc2VuZGVycy93b3JrZXItcmVxdWVzdC1zZW5kZXIudHMiLCJpbXBvcnQgeyBJTG9nZ2VyIH0gZnJvbSAnLi4vLi4vbG9ncy9sb2dnZXInO1xyXG5pbXBvcnQgeyBJTGlzdGVuZXIsIElXb3JrZXJNZXNzYWdlLCBJV29ya2VyTWVzc2FnZVJlY2VpdmVyLCBNZXNzYWdlRXZlbnRMaXN0ZW5lciwgV29ya2VyRGF0YVR5cGUgfSBmcm9tICcuLi93b3JrZXItZGVmaW5pdGlvbnMnO1xyXG5cclxuLyoqXHJcbiAqIENsYXNzIGNvbnZlcnRzIGphdmFzY3JpcHQgbWVzc2FnZXMgd2l0aCBzdGFuZGFyZCBldmVudCAnbWVzc2FnZScgdG8gc3Ryb25nbHkgdHlwZWQgY3VzdG9tIG1lc3NhZ2VzXHJcbiAqXHJcbiAqIEBpbnRlcm5hbFxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIE1lc3NhZ2VSZWNlaXZlciBpbXBsZW1lbnRzIElXb3JrZXJNZXNzYWdlUmVjZWl2ZXIge1xyXG4gICAgcHJpdmF0ZSBfZGljOiB7IFt0eXBlOiBzdHJpbmddOiBBcnJheTxJTGlzdGVuZXI8YW55Pj4gfSA9IHsgfTtcclxuICAgIHByaXZhdGUgX2J1ZmZlcnM6IHsgW3R5cGU6IHN0cmluZ106IEFycmF5PE1lc3NhZ2VFdmVudD4gfSA9IHsgfTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IF9yZWNlaXZlcjoge1xyXG4gICAgICAgICAgICBhZGRFdmVudExpc3RlbmVyOiAodHlwZTogJ21lc3NhZ2UnLCBsaXN0ZW5lcjogTWVzc2FnZUV2ZW50TGlzdGVuZXIpID0+IHZvaWQsXHJcbiAgICAgICAgICAgIHJlbW92ZUV2ZW50TGlzdGVuZXI6ICh0eXBlOiAnbWVzc2FnZScsIGxpc3RlbmVyOiBNZXNzYWdlRXZlbnRMaXN0ZW5lcikgPT4gdm9pZFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBfbG9nZ2VyOiBJTG9nZ2VyXHJcbiAgICApIHtcclxuICAgICAgICBfcmVjZWl2ZXIuYWRkRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIHRoaXMuX2hhbmRsZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhZGRFdmVudExpc3RlbmVyPFRNZXNzYWdlIGV4dGVuZHMgSVdvcmtlck1lc3NhZ2U8V29ya2VyRGF0YVR5cGU+Pih0eXBlOiBzdHJpbmcsIGxpc3RlbmVyOiBJTGlzdGVuZXI8VE1lc3NhZ2U+KSB7XHJcbiAgICAgICAgY29uc3QgbGlzdGVuZXJzID0gdGhpcy5fZGljW3R5cGVdID0gdGhpcy5fZGljW3R5cGVdIHx8IFtdO1xyXG5cclxuICAgICAgICBsaXN0ZW5lcnMucHVzaChsaXN0ZW5lcik7XHJcblxyXG4gICAgICAgIHRoaXMuZmx1c2hCdWZmZXIodHlwZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlbW92ZUV2ZW50TGlzdGVuZXI8VE1lc3NhZ2UgZXh0ZW5kcyBJV29ya2VyTWVzc2FnZTxXb3JrZXJEYXRhVHlwZT4+KHR5cGU6IHN0cmluZywgbGlzdGVuZXI6IElMaXN0ZW5lcjxUTWVzc2FnZT4pIHtcclxuICAgICAgICBjb25zdCBsaXN0ZW5lcnMgPSB0aGlzLl9kaWNbdHlwZV07XHJcblxyXG4gICAgICAgIGlmIChsaXN0ZW5lcnMpIHtcclxuICAgICAgICAgICAgY29uc3QgaW5kZXggPSBsaXN0ZW5lcnMuaW5kZXhPZihsaXN0ZW5lcik7XHJcbiAgICAgICAgICAgIGlmIChpbmRleCA+PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBsaXN0ZW5lcnMuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGxpc3RlbmVycy5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgICAgIGRlbGV0ZSB0aGlzLl9kaWNbdHlwZV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGRpc3Bvc2UoKSB7XHJcbiAgICAgICAgdGhpcy5fZGljID0geyB9O1xyXG4gICAgICAgIHRoaXMuX2J1ZmZlcnMgPSB7IH07XHJcbiAgICAgICAgdGhpcy5fcmVjZWl2ZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIHRoaXMuX2hhbmRsZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZmx1c2hCdWZmZXIodHlwZTogc3RyaW5nKSB7XHJcbiAgICAgICAgY29uc3QgYnVmZmVyID0gdGhpcy5fYnVmZmVyc1t0eXBlXTtcclxuICAgICAgICBpZiAoYnVmZmVyICYmIGJ1ZmZlci5sZW5ndGggIT09IDApIHtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBsZW5ndGggPSBidWZmZXIubGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2hhbmRsZXIoYnVmZmVyW2ldKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJ1ZmZlci5sZW5ndGggPSAwO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfaGFuZGxlciA9IChldmVudDogTWVzc2FnZUV2ZW50KSA9PiB7XHJcbiAgICAgICAgY29uc3QgcmVxdWVzdCA9IGV2ZW50LmRhdGEgYXMgSVdvcmtlck1lc3NhZ2U8V29ya2VyRGF0YVR5cGU+O1xyXG5cclxuICAgICAgICBpZiAocmVxdWVzdCAmJiByZXF1ZXN0LnR5cGUpIHtcclxuICAgICAgICAgICAgY29uc3QgbGlzdGVuZXJzID0gdGhpcy5fZGljW3JlcXVlc3QudHlwZV07XHJcblxyXG4gICAgICAgICAgICBpZiAobGlzdGVuZXJzKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGxpc3RlbmVyIG9mIGxpc3RlbmVycykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpc3RlbmVyKHJlcXVlc3QpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2xvZ2dlci5lcnJvcihgRXJyb3Igb24gZXhlY3V0aW5nIGxpc3RlbmVyIGZvciBtZXNzYWdlIHR5cGUgJHtyZXF1ZXN0LnR5cGV9YCwgZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGJ1ZmZlciA9IHRoaXMuX2J1ZmZlcnNbcmVxdWVzdC50eXBlXSB8fCAodGhpcy5fYnVmZmVyc1tyZXF1ZXN0LnR5cGVdID0gW10pO1xyXG4gICAgICAgICAgICAgICAgYnVmZmVyLnB1c2goZXZlbnQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy9pZmRlZi1sb2FkZXIvaWZkZWYtbG9hZGVyLmpzP0RFQlVHPXRydWUmUEVSRk9STUFOQ0VfQVVESVQ9dHJ1ZSEuL3NyYy93b3JrZXJzL3NlbmRlcnMvbWVzc2FnZS1yZWNlaXZlci50cyIsImV4cG9ydCBpbnRlcmZhY2UgSVJlc3BvbnNlRW1pdHRlcjxUUmVxdWVzdCwgVFJlc3BvbnNlPiB7XHJcbiAgICBpbnZva2UocmVxdWVzdDogVFJlcXVlc3QpOiBUUmVzcG9uc2UgfCBQcm9taXNlPFRSZXNwb25zZT47XHJcblxyXG4gICAgc3RvcCgpOiB2b2lkO1xyXG59XHJcblxyXG5leHBvcnQgdHlwZSBJSGFuZGxlcjxUUmVxdWVzdCwgVFJlc3BvbnNlPiA9IChyZXF1ZXN0OiBUUmVxdWVzdCkgPT4gVFJlc3BvbnNlIHwgUHJvbWlzZTxUUmVzcG9uc2U+O1xyXG5cclxuLyoqXHJcbiAqIEhhbmRsZXIgZm9yIHRoaXMgZW1pdHRlciBpcyBvcHRpb25hbC5cclxuICogRGVmYXVsdCB2YWx1ZSB3aWxsIGJlIHJldHVybmVkIG9uIHVuZGVmaW5lZCBoYW5kbGVyLlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIE9wdGlvbmFsUmVzcG9uc2VFbWl0dGVyPFRSZXF1ZXN0LCBUUmVzcG9uc2U+IGltcGxlbWVudHMgSVJlc3BvbnNlRW1pdHRlcjxUUmVxdWVzdCwgVFJlc3BvbnNlPiB7XHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgZGVmOiBUUmVzcG9uc2UsXHJcbiAgICAgICAgcHVibGljIGhhbmRsZXI/OiBJSGFuZGxlcjxUUmVxdWVzdCwgVFJlc3BvbnNlPlxyXG4gICAgKSB7IH1cclxuXHJcbiAgICBwdWJsaWMgcmVhZG9ubHkgaW52b2tlID0gKHJlcXVlc3Q6IFRSZXF1ZXN0KTogVFJlc3BvbnNlIHwgUHJvbWlzZTxUUmVzcG9uc2U+ID0+IHtcclxuICAgICAgICBpZiAodGhpcy5oYW5kbGVyKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmhhbmRsZXIocmVxdWVzdCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLmRlZjtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RvcCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmhhbmRsZXIgPSB1bmRlZmluZWQ7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBIYW5kbGVyIGZvciB0aGlzIGVtaXR0ZXIgaXMgbWFuZGF0b3J5LlxyXG4gKiBBbGwgcmVxdWVzdHMgd2l0aG91dCBoYW5kbGVyIHdpbGwgYmUgYnVmZXJyZWQgYW5kIHBhc3NlZCB0byBhIG5ldyBoYW5kbGVyIG9uIGl0cyBzZXR0aW5nLlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIE1hbmRhdG9yeVJlc3BvbnNlRW1pdHRlcjxUUmVxdWVzdCwgVFJlc3BvbnNlPiBpbXBsZW1lbnRzIElSZXNwb25zZUVtaXR0ZXI8VFJlcXVlc3QsIFRSZXNwb25zZT4ge1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfYnVmZmVyID0gbmV3IEFycmF5PHsgcmVxdWVzdDogVFJlcXVlc3QsIHJlc29sdmU6IChyZXNwb25zZTogVFJlc3BvbnNlIHwgUHJvbWlzZUxpa2U8VFJlc3BvbnNlPikgPT4gdm9pZCB9PigpO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHByaXZhdGUgX2hhbmRsZXI/OiBJSGFuZGxlcjxUUmVxdWVzdCwgVFJlc3BvbnNlPlxyXG4gICAgKSB7IH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGhhbmRsZXIoKTogdW5kZWZpbmVkIHwgSUhhbmRsZXI8VFJlcXVlc3QsIFRSZXNwb25zZT4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9oYW5kbGVyO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHNldCBoYW5kbGVyKHZhbHVlOiB1bmRlZmluZWQgfCBJSGFuZGxlcjxUUmVxdWVzdCwgVFJlc3BvbnNlPikge1xyXG4gICAgICAgIHRoaXMuX2hhbmRsZXIgPSB2YWx1ZTtcclxuICAgICAgICB0aGlzLmZsdXNoQnVmZmVyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlYWRvbmx5IGludm9rZSA9IChyZXF1ZXN0OiBUUmVxdWVzdCk6IFRSZXNwb25zZSB8IFByb21pc2U8VFJlc3BvbnNlPiA9PiB7XHJcbiAgICAgICAgaWYgKHRoaXMuaGFuZGxlcikge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5oYW5kbGVyKHJlcXVlc3QpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLl9idWZmZXIucHVzaCh7IHJlcXVlc3QsIHJlc29sdmUgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0b3AoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5oYW5kbGVyID0gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZmx1c2hCdWZmZXIoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2hhbmRsZXIgJiYgdGhpcy5fYnVmZmVyLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgZm9yIChjb25zdCBkYXRhIG9mIHRoaXMuX2J1ZmZlcikge1xyXG4gICAgICAgICAgICAgICAgZGF0YS5yZXNvbHZlKHRoaXMuaW52b2tlKGRhdGEucmVxdWVzdCkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy9pZmRlZi1sb2FkZXIvaWZkZWYtbG9hZGVyLmpzP0RFQlVHPXRydWUmUEVSRk9STUFOQ0VfQVVESVQ9dHJ1ZSEuL3NyYy93b3JrZXJzL3NlbmRlcnMvcmVzcG9uc2UtZW1pdHRlci50cyIsImltcG9ydCB7IEV2ZW50RW1pdHRlciB9IGZyb20gJy4uLy4uL2ZyYW1ld29yay9ldmVudC1lbWl0dGVyJztcclxuaW1wb3J0IHsgSVdvcmtlck1lc3NhZ2UsIElXb3JrZXJNZXNzYWdlUmVjZWl2ZXIsIFdvcmtlckRhdGFUeXBlIH0gZnJvbSAnLi4vd29ya2VyLWRlZmluaXRpb25zJztcclxuXHJcbi8qKlxyXG4gKiBDbGFzcyB3cmFwcGVyIGZvciByZWNlaXZpbmcgbWVzc2FnZXMgYXMgdHlwZWQgZXZlbnRzXHJcbiAqXHJcbiAqIEBpbnRlcm5hbFxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFdvcmtlckV2ZW50UmVjZWl2ZXI8VFR5cGUgZXh0ZW5kcyBXb3JrZXJEYXRhVHlwZSwgVFdvcmtlck1lc3NhZ2UgZXh0ZW5kcyBJV29ya2VyTWVzc2FnZTxUVHlwZT4+IHtcclxuICAgIHB1YmxpYyByZWFkb25seSBldmVudDogRXZlbnRFbWl0dGVyPFRXb3JrZXJNZXNzYWdlPiA9IG5ldyBFdmVudEVtaXR0ZXI8VFdvcmtlck1lc3NhZ2U+KCk7XHJcblxyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IHR5cGU6IFRUeXBlLFxyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgX3JlY2VpdmVyOiBJV29ya2VyTWVzc2FnZVJlY2VpdmVyXHJcbiAgICApIHtcclxuICAgICAgICBfcmVjZWl2ZXIuYWRkRXZlbnRMaXN0ZW5lcih0eXBlLCB0aGlzLl9oYW5kbGVyKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZGlzcG9zZSgpIHtcclxuICAgICAgICB0aGlzLl9yZWNlaXZlci5yZW1vdmVFdmVudExpc3RlbmVyKHRoaXMudHlwZSwgdGhpcy5faGFuZGxlcik7XHJcbiAgICAgICAgdGhpcy5ldmVudC5jbGVhcigpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX2hhbmRsZXIgPSAoZGF0YTogVFdvcmtlck1lc3NhZ2UpID0+IHtcclxuICAgICAgICBpZiAoZGF0YS50eXBlID09PSB0aGlzLnR5cGUpIHtcclxuICAgICAgICAgICAgdGhpcy5ldmVudC5lbWl0KGRhdGEpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvaWZkZWYtbG9hZGVyL2lmZGVmLWxvYWRlci5qcz9ERUJVRz10cnVlJlBFUkZPUk1BTkNFX0FVRElUPXRydWUhLi9zcmMvd29ya2Vycy9zZW5kZXJzL3dvcmtlci1ldmVudC1yZWNlaXZlci50cyIsImltcG9ydCB7IElXb3JrZXJNZXNzYWdlLCBJV29ya2VyTWVzc2FnZVJlY2VpdmVyLCBJV29ya2VyTWVzc2FnZVNlbmRlciwgV29ya2VyRGF0YVR5cGUgfSBmcm9tICcuLi93b3JrZXItZGVmaW5pdGlvbnMnO1xyXG5pbXBvcnQgeyBJUmVzcG9uc2VFbWl0dGVyIH0gZnJvbSAnLi9yZXNwb25zZS1lbWl0dGVyJztcclxuaW1wb3J0IHsgSVJlc3BvbnNlRW52ZWxvcCB9IGZyb20gJy4vd29ya2VyLXJlcXVlc3Qtc2VuZGVyJztcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSVJlcXVlc3RFbnZlbG9wPFRUeXBlIGV4dGVuZHMgV29ya2VyRGF0YVR5cGUsIFRSZXF1ZXN0PiBleHRlbmRzIElXb3JrZXJNZXNzYWdlPFRUeXBlPiB7XHJcbiAgICByZXF1ZXN0OiBUUmVxdWVzdDtcclxuXHJcbiAgICBtZXNzYWdlSWQ6IHN0cmluZztcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFdvcmtlclJlcXVlc3RSZWNlaXZlcjxUVHlwZSBleHRlbmRzIFdvcmtlckRhdGFUeXBlLCBUUmVxdWVzdCwgVFJlc3BvbnNlPiB7XHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgdHlwZTogVFR5cGUsXHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBfc2VuZGVyOiBJV29ya2VyTWVzc2FnZVNlbmRlcixcclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IF9yZWNlaXZlcjogSVdvcmtlck1lc3NhZ2VSZWNlaXZlcixcclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IF9oYW5kbGVyOiBJUmVzcG9uc2VFbWl0dGVyPFRSZXF1ZXN0LCBUUmVzcG9uc2U+XHJcbiAgICApIHtcclxuICAgICAgICBfcmVjZWl2ZXIuYWRkRXZlbnRMaXN0ZW5lcih0eXBlLCB0aGlzLl9yZXNwb25zZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGRpc3Bvc2UoKSB7XHJcbiAgICAgICAgdGhpcy5fcmVjZWl2ZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcih0aGlzLnR5cGUsIHRoaXMuX3Jlc3BvbnNlKTtcclxuICAgICAgICB0aGlzLl9oYW5kbGVyLnN0b3AoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9yZXNwb25zZSA9IChkYXRhOiBJUmVxdWVzdEVudmVsb3A8VFR5cGUsIFRSZXF1ZXN0PikgPT4ge1xyXG4gICAgICAgIGNvbnN0IG1lc3NhZ2VJZCA9IGRhdGEubWVzc2FnZUlkO1xyXG4gICAgICAgIGNvbnN0IHR5cGUgPSBkYXRhLnR5cGU7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnR5cGUgPT09IHR5cGUpIHtcclxuICAgICAgICAgICAgaWYgKG1lc3NhZ2VJZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hd2FpdFJlc3BvbnNlKHR5cGUsIGRhdGEucmVxdWVzdCwgbWVzc2FnZUlkKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucmlzZUV2ZW50KHR5cGUsIGRhdGEucmVxdWVzdCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBhd2FpdFJlc3BvbnNlKHR5cGU6IFRUeXBlLCByZXF1ZXN0OiBUUmVxdWVzdCwgbWVzc2FnZUlkOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBzZW5kZXIgPSB0aGlzLl9zZW5kZXI7XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdChlcnJvcjogYW55KSB7XHJcbiAgICAgICAgICAgIGxldCBtZXNzYWdlID0gJyc7XHJcbiAgICAgICAgICAgIGlmIChlcnJvciAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBFcnJvcikge1xyXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2UgPSBlcnJvci5tZXNzYWdlO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlID0gZXJyb3IudG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzZW5kZXIucG9zdE1lc3NhZ2UoeyB0eXBlLCBtZXNzYWdlSWQsIGVycm9yOiB7IG1lc3NhZ2UgfSB9IGFzIElSZXNwb25zZUVudmVsb3A8VFR5cGUsIFRSZXNwb25zZT4pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmdW5jdGlvbiByZXNvbHZlKHJlc3BvbnNlOiBUUmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgc2VuZGVyLnBvc3RNZXNzYWdlKHsgdHlwZSwgbWVzc2FnZUlkLCByZXNwb25zZSB9IGFzIElSZXNwb25zZUVudmVsb3A8VFR5cGUsIFRSZXNwb25zZT4pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gdGhpcy5faGFuZGxlci5pbnZva2UocmVxdWVzdCk7XHJcblxyXG4gICAgICAgICAgICBpZiAodHlwZW9mIFByb21pc2UgIT09ICd1bmRlZmluZWQnICYmIHJlc3VsdCBpbnN0YW5jZW9mIFByb21pc2UpIHtcclxuICAgICAgICAgICAgICAgIHJlc3VsdC50aGVuKHJlc29sdmUsIHJlamVjdCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3VsdCBhcyBUUmVzcG9uc2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSByaXNlRXZlbnQodHlwZTogc3RyaW5nLCByZXF1ZXN0OiBUUmVxdWVzdCk6IHZvaWQge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2hhbmRsZXIuaW52b2tlKHJlcXVlc3QpO1xyXG4gICAgICAgIH0gY2F0Y2ggeyAvKiovIH1cclxuICAgIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvaWZkZWYtbG9hZGVyL2lmZGVmLWxvYWRlci5qcz9ERUJVRz10cnVlJlBFUkZPUk1BTkNFX0FVRElUPXRydWUhLi9zcmMvd29ya2Vycy9zZW5kZXJzL3dvcmtlci1yZXF1ZXN0LXJlY2VpdmVyLnRzIiwiaW1wb3J0IHsgSVNjcmlwdExvYWRlciwgU2NyaXB0TG9hZGVyIH0gZnJvbSAnLi4vZnJhbWV3b3JrL3NjcmlwdC1sb2FkZXInO1xyXG5pbXBvcnQgeyBJTWVzc2FnZUV2ZW50LCBJV29ya2VyR2xvYmFsU2NvcGUsIElXb3JrZXJMb2NhdGlvbiwgTWVzc2FnZUV2ZW50TGlzdGVuZXIgfSBmcm9tICcuL3dvcmtlci1kZWZpbml0aW9ucyc7XHJcblxyXG4vKipcclxuICogVmFyaWFibGUgbmFtZSB0byBwYXNzIFBzZXVkb1dvcmtlciBiZXR3ZWVuIG1haW4gY29kZSBhbmQgbG9hZGVkIGluIGEgV2ViV29ya2VyXHJcbiAqIEBpbnRlcm5hbFxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IFBzZXVkb1dvcmtlclNjb3BlTmFtZSA9ICdNZXNzYWdpbmdDbGllbnQtUHNldWRvV29ya2VyJztcclxuXHJcbi8qKlxyXG4gKiBFbXVsYXRvciBvZiBXZWIgV29ya2VyIGJlaGF2aW9yLiBSdW4gYWxsIHByb2NjZXNzIGluIHRoZSBtYWluIHdpbmRvdyBwcm9jZXNzLlxyXG4gKlxyXG4gKiBSZXF1aXJlZCBjb21wYXRpYmlsaXR5IHdpdGggSUU5IHdpdGhvdXQgcG9seWZpbGxzXHJcbiAqXHJcbiAqIEBpbnRlcm5hbFxyXG4gKiBAY2xhc3MgUHNldWRvV29ya2VyXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgUHNldWRvV29ya2VyIHtcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgX3BzZXVkb1dvcmtlcjogSW50ZXJuYWxQc2V1ZG9Xb3JrZXI7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9saXN0ZW5lcnM6IEFycmF5PE1lc3NhZ2VFdmVudExpc3RlbmVyPiA9IFtdO1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfYnVmZmVyOiBBcnJheTxJTWVzc2FnZUV2ZW50PiA9IFtdO1xyXG4gICAgcHJpdmF0ZSBfZ2xvYmFsOiBhbnkgPSB3aW5kb3c7XHJcblxyXG4gICAgcHVibGljIGdldCBwc2V1ZG9Xb3JrZXIoKSB7IHJldHVybiB0aGlzLl9wc2V1ZG9Xb3JrZXI7IH1cclxuXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwYXRoOiBzdHJpbmcsXHJcbiAgICAgICAgc2NyaXB0TG9hZGVyOiBJU2NyaXB0TG9hZGVyID0gbmV3IFNjcmlwdExvYWRlcigpXHJcbiAgICApIHtcclxuICAgICAgICB0aGlzLl9wc2V1ZG9Xb3JrZXIgPSB0aGlzLl9nbG9iYWxbUHNldWRvV29ya2VyU2NvcGVOYW1lXSA9XHJcbiAgICAgICAgICAgIG5ldyBJbnRlcm5hbFBzZXVkb1dvcmtlcihcclxuICAgICAgICAgICAgICAgIHBhdGgsXHJcbiAgICAgICAgICAgICAgICBzY3JpcHRMb2FkZXIsXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmFpc2VFdmVudDogKG1lc3NhZ2UpID0+IHRoaXMucmFpc2VFdmVudChtZXNzYWdlKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIHNjcmlwdExvYWRlci5sb2FkU2NyaXB0KHBhdGgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBwb3N0TWVzc2FnZShtZXNzYWdlOiBvYmplY3QpIHtcclxuICAgICAgICB0aGlzLl9wc2V1ZG9Xb3JrZXIucmFpc2VFdmVudCh7IGRhdGE6IG1lc3NhZ2UgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFkZEV2ZW50TGlzdGVuZXIoZXZlbnQ6ICdtZXNzYWdlJywgbGlzdGVuZXI6IE1lc3NhZ2VFdmVudExpc3RlbmVyKSB7XHJcbiAgICAgICAgaWYgKGV2ZW50ID09PSAnbWVzc2FnZScpIHtcclxuICAgICAgICAgICAgdGhpcy5fbGlzdGVuZXJzLnB1c2gobGlzdGVuZXIpO1xyXG5cclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fYnVmZmVyLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBidWZmZXIgPSB0aGlzLl9idWZmZXIuc2xpY2UoKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBsZW5ndGggPSBidWZmZXIubGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yYWlzZUV2ZW50KGJ1ZmZlcltpXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2J1ZmZlci5sZW5ndGggPSAwO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnQ6ICdtZXNzYWdlJywgbGlzdGVuZXI6IE1lc3NhZ2VFdmVudExpc3RlbmVyKSB7XHJcbiAgICAgICAgY29uc3QgaW5kZXggPSB0aGlzLl9saXN0ZW5lcnMuaW5kZXhPZihsaXN0ZW5lcik7XHJcbiAgICAgICAgaWYgKGluZGV4ID4gLTEpIHtcclxuICAgICAgICAgICAgdGhpcy5fbGlzdGVuZXJzLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB0ZXJtaW5hdGUoKSB7XHJcbiAgICAgICAgdGhpcy5fYnVmZmVyLmxlbmd0aCA9IDA7XHJcbiAgICAgICAgdGhpcy5fbGlzdGVuZXJzLmxlbmd0aCA9IDA7XHJcbiAgICAgICAgdGhpcy5fcHNldWRvV29ya2VyLmNsb3NlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSByYWlzZUV2ZW50KG1lc3NhZ2U6IElNZXNzYWdlRXZlbnQpIHtcclxuICAgICAgICBjb25zdCBsaXN0ZW5lcnMgPSB0aGlzLl9saXN0ZW5lcnM7XHJcbiAgICAgICAgY29uc3QgbGVuZ3RoID0gbGlzdGVuZXJzLmxlbmd0aDtcclxuICAgICAgICBpZiAobGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBsaXN0ZW5lciA9IGxpc3RlbmVyc1tpXTtcclxuICAgICAgICAgICAgICAgIGxpc3RlbmVyKG1lc3NhZ2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5fYnVmZmVyLnB1c2gobWVzc2FnZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG4vKipcclxuICogSW5zdGFuY2UgZm9yIGVtdWxhdGlvbmcgV29ya2VyIEVudmlyb25tZW50IGluc2lkZSBXZWJXb3JrZXIgY29kZVxyXG4gKlxyXG4gKiBAY2xhc3MgSW50ZXJuYWxQc2V1ZG9Xb3JrZXJcclxuICogQGltcGxlbWVudHMge0lXb3JrZXJHbG9iYWxTY29wZX1cclxuICovXHJcbmNsYXNzIEludGVybmFsUHNldWRvV29ya2VyIGltcGxlbWVudHMgSVdvcmtlckdsb2JhbFNjb3BlIHtcclxuICAgIHB1YmxpYyByZWFkb25seSBsb2NhdGlvbjogSVdvcmtlckxvY2F0aW9uO1xyXG5cclxuICAgIHByaXZhdGUgcmVhZG9ubHkgX2xpc3RlbmVyczogQXJyYXk8TWVzc2FnZUV2ZW50TGlzdGVuZXI+ID0gW107XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9idWZmZXI6IEFycmF5PElNZXNzYWdlRXZlbnQ+ID0gW107XHJcblxyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgbG9jYXRpb246IHN0cmluZyxcclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IF9zY3JpcHRMb2FkZXI6IElTY3JpcHRMb2FkZXIsXHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBfaW50ZXJuYWw6IElJbnRlcm5hbFdvcmtlckZ1bmN0aW9ucyxcclxuICAgICkge1xyXG4gICAgICAgIHRoaXMubG9jYXRpb24gPSBsb2NhdGlvbjtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcG9zdE1lc3NhZ2UobWVzc2FnZTogb2JqZWN0KTogdm9pZCB7XHJcbiAgICAgICAgbWVzc2FnZSA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkobWVzc2FnZSkpO1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLl9pbnRlcm5hbC5yYWlzZUV2ZW50KHsgZGF0YTogbWVzc2FnZSB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaW1wb3J0U2NyaXB0cyguLi5wYXRoczogQXJyYXk8c3RyaW5nPik6IGFueSB7XHJcbiAgICAgICAgbGV0IHJlc29sdmU6ICgpID0+IHZvaWQ7XHJcbiAgICAgICAgbGV0IHJlc29sdmVkOiBib29sZWFuO1xyXG5cclxuICAgICAgICBjb25zdCBsZW5ndGggPSBwYXRocy5sZW5ndGg7XHJcbiAgICAgICAgbGV0IHRvbG9hZCA9IHBhdGhzLmxlbmd0aDtcclxuICAgICAgICBjb25zdCBvbmxvYWQgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRvbG9hZC0tO1xyXG4gICAgICAgICAgICBpZiAodG9sb2FkIDw9IDApIHtcclxuICAgICAgICAgICAgICAgIHJlc29sdmVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGlmIChyZXNvbHZlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3NjcmlwdExvYWRlci5sb2FkU2NyaXB0KHBhdGhzW2ldLCBvbmxvYWQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgdGhlbjogKGNhbGxiYWNrOiAoKSA9PiB2b2lkKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAocmVzb2x2ZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjaygpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJlc29sdmUgPSBjYWxsYmFjaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFkZEV2ZW50TGlzdGVuZXIoZXZlbnQ6ICdtZXNzYWdlJyB8ICdjb25uZWN0JywgbGlzdGVuZXI6IE1lc3NhZ2VFdmVudExpc3RlbmVyKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKGV2ZW50ID09PSAnbWVzc2FnZScpIHtcclxuICAgICAgICAgICAgdGhpcy5fbGlzdGVuZXJzLnB1c2gobGlzdGVuZXIpO1xyXG5cclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fYnVmZmVyLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGJ1ZmZlciA9IHRoaXMuX2J1ZmZlci5zbGljZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGxlbmd0aCA9IGJ1ZmZlci5sZW5ndGg7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJhaXNlRXZlbnQoYnVmZmVyW2ldKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fYnVmZmVyLmxlbmd0aCA9IDA7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudDogJ21lc3NhZ2UnLCBsaXN0ZW5lcjogTWVzc2FnZUV2ZW50TGlzdGVuZXIpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBpbmRleCA9IHRoaXMuX2xpc3RlbmVycy5pbmRleE9mKGxpc3RlbmVyKTtcclxuICAgICAgICBpZiAoaW5kZXggPiAtMSkge1xyXG4gICAgICAgICAgICB0aGlzLl9saXN0ZW5lcnMuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJhaXNlRXZlbnQobWVzc2FnZTogSU1lc3NhZ2VFdmVudCkge1xyXG4gICAgICAgIGlmICghdGhpcy5fbGlzdGVuZXJzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICB0aGlzLl9idWZmZXIucHVzaChtZXNzYWdlKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjb25zdCBsZW5ndGggPSB0aGlzLl9saXN0ZW5lcnMubGVuZ3RoO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgbGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9saXN0ZW5lcnNbaW5kZXhdKG1lc3NhZ2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbG9zZSgpIHtcclxuICAgICAgICB0aGlzLl9idWZmZXIubGVuZ3RoID0gMDtcclxuICAgICAgICB0aGlzLl9saXN0ZW5lcnMubGVuZ3RoID0gMDtcclxuICAgIH1cclxufVxyXG5cclxuaW50ZXJmYWNlIElJbnRlcm5hbFdvcmtlckZ1bmN0aW9ucyB7XHJcbiAgICByYWlzZUV2ZW50KG1lc3NhZ2U6IElNZXNzYWdlRXZlbnQpOiB2b2lkO1xyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy9pZmRlZi1sb2FkZXIvaWZkZWYtbG9hZGVyLmpzP0RFQlVHPXRydWUmUEVSRk9STUFOQ0VfQVVESVQ9dHJ1ZSEuL3NyYy93b3JrZXJzL3BzZXVkby13b3JrZXIudHMiLCJpbXBvcnQgeyBHbG9iYWxQcm92aWRlciB9IGZyb20gJy4vZ2xvYmFsJztcclxuXHJcbi8qKlxyXG4gKiBMb2FkIHNjcmlwdCBmcm9tIGEgcGF0aFxyXG4gKlxyXG4gKiBAaW50ZXJuYWxcclxuICogQGludGVyZmFjZSBJU2NyaXB0TG9hZGVyXHJcbiAqL1xyXG5leHBvcnQgaW50ZXJmYWNlIElTY3JpcHRMb2FkZXIge1xyXG4gICAgbG9hZFNjcmlwdChwYXRoOiBzdHJpbmcsIG9ubG9hZD86ICgpID0+IHZvaWQpOiB2b2lkO1xyXG59XHJcblxyXG4vKipcclxuICogUG9seWZpbGwgZm9yIGxvYWRpbmcgc2NyaXB0IGluIERPTSBjb250ZXh0XHJcbiAqXHJcbiAqIEBpbnRlcm5hbFxyXG4gKiBAY2xhc3MgU2NyaXB0TG9hZGVyXHJcbiAqIEBpbXBsZW1lbnRzIHtJU2NyaXB0TG9hZGVyfVxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFNjcmlwdExvYWRlciBpbXBsZW1lbnRzIElTY3JpcHRMb2FkZXIge1xyXG4gICAgLyoqXHJcbiAgICAgKiBMb2FkIHNjcmlwdCBmcm9tIHBhdGggZW5kIGV4ZWN1dGUgaXRcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gcGF0aCB7c3RyaW5nfSAtIFBhdGggdG8gdGhlIHNjcmlwdFxyXG4gICAgICogQHBhcmFtIG9ubG9hZCB7KCkgPT4gdm9pZH0gLSBDYWxsYmFjayBleGVjdXRlZCBhZnRlciB0aGUgc2NyaXB0IGxvYWRzXHJcbiAgICAgKiBAbWVtYmVyb2YgU2NyaXB0TG9hZGVyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyByZWFkb25seSBsb2FkU2NyaXB0OiAocGF0aDogc3RyaW5nLCBvbmxvYWQ/OiAoKSA9PiB2b2lkKSA9PiB2b2lkO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIF9nbG9iYWwgPSBHbG9iYWxQcm92aWRlci5jdXJyZW50KClcclxuICAgICkge1xyXG4gICAgICAgIGlmICh0eXBlb2YgKF9nbG9iYWwgYXMgV2luZG93KS5kb2N1bWVudCAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAgICAgdGhpcy5sb2FkU2NyaXB0ID0gKHBhdGgsIG9ubG9hZCkgPT4gU2NyaXB0TG9hZGVyLmxvYWRWaWFEb20oKF9nbG9iYWwgYXMgV2luZG93KS5kb2N1bWVudCwgcGF0aCwgb25sb2FkKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vIERPTSBlbnZpcm9ubWVudCBpcyBub3Qgc3VwcG9ydGVkLicpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTptZW1iZXItb3JkZXJpbmdcclxuICAgIHByaXZhdGUgc3RhdGljIGxvYWRWaWFEb20oZG9jdW1lbnQ6IERvY3VtZW50LCBwYXRoOiBzdHJpbmcsIG9ubG9hZD86ICgpID0+IHZvaWQpIHtcclxuICAgICAgICBjb25zdCBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcclxuICAgICAgICBzY3JpcHQudHlwZSA9ICd0ZXh0L2phdmFzY3JpcHQnO1xyXG4gICAgICAgIHNjcmlwdC5zcmMgPSBwYXRoO1xyXG4gICAgICAgIGlmIChvbmxvYWQpIHtcclxuICAgICAgICAgICAgc2NyaXB0Lm9ubG9hZCA9IG9ubG9hZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgKGRvY3VtZW50LmJvZHkgfHwgZG9jdW1lbnQuaGVhZCkuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcclxuICAgIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvaWZkZWYtbG9hZGVyL2lmZGVmLWxvYWRlci5qcz9ERUJVRz10cnVlJlBFUkZPUk1BTkNFX0FVRElUPXRydWUhLi9zcmMvZnJhbWV3b3JrL3NjcmlwdC1sb2FkZXIudHMiLCJleHBvcnQgKiBmcm9tICcuL2JhdGNoJztcclxuZXhwb3J0ICogZnJvbSAnLi9idWlsZGVycyc7XHJcbmV4cG9ydCAqIGZyb20gJy4vY29udGV4dCc7XHJcbmV4cG9ydCAqIGZyb20gJy4vZW5kcG9pbnRzJztcclxuZXhwb3J0ICogZnJvbSAnLi9lbnZlbG9wJztcclxuZXhwb3J0ICogZnJvbSAnLi9tZXNzZW5nZXInO1xyXG5leHBvcnQgKiBmcm9tICcuL3BpcGUnO1xyXG5leHBvcnQgKiBmcm9tICcuL2J1cyc7XHJcbmV4cG9ydCAqIGZyb20gJy4vcm91dGVyJztcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL2lmZGVmLWxvYWRlci9pZmRlZi1sb2FkZXIuanM/REVCVUc9dHJ1ZSZQRVJGT1JNQU5DRV9BVURJVD10cnVlIS4vc3JjL3Byb2Nlc3NpbmcvaW5kZXgudHMiLCJpbXBvcnQgeyBJQmF0Y2hBdWRpdERhdGEgfSBmcm9tICcuL2F1ZGl0L2F1ZGl0LWRhdGEnO1xyXG5pbXBvcnQgeyBJRW52ZWxvcCB9IGZyb20gJy4vZW52ZWxvcCc7XHJcblxyXG4vKipcclxuICogQmF0Y2ggb2YgZmV3IGVudmVsb3BzXHJcbiAqXHJcbiAqIEBpbnRlcm5hbFxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIEJhdGNoIHtcclxuICAgIC8qKlxyXG4gICAgICogQ29udGFpbnMgZW52ZWxvcCB3aXRoIGFvdWRpdCBkYXRhXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhdWRpdHM/OiBJQmF0Y2hBdWRpdERhdGE7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBFcnJvciBjb3VudCBmb3IgdGhlIGN1cnJlbnQgYmF0Y2hcclxuICAgICAqL1xyXG4gICAgcHVibGljIGVycm9yQ291bnQ6IG51bWJlciA9IDA7XHJcblxyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IGVudmVsb3BzOiBBcnJheTxJRW52ZWxvcD4sXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEluZGV4IG9mIHRoZSBiYXRjaFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBpbmRleDogbnVtYmVyID0gMFxyXG4gICAgKSB7IH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvaWZkZWYtbG9hZGVyL2lmZGVmLWxvYWRlci5qcz9ERUJVRz10cnVlJlBFUkZPUk1BTkNFX0FVRElUPXRydWUhLi9zcmMvcHJvY2Vzc2luZy9iYXRjaC50cyIsImltcG9ydCB7IElEaXN0b3JidGlvbiwgSUR1cmF0aW9uLCBJUGVyZnN0YW1wIH0gZnJvbSAnLi4vZGVmaW5pdGlvbnMnO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGR1cmF0aW9uKHRpbWUxOiBJUGVyZnN0YW1wLCB0aW1lMjogSVBlcmZzdGFtcCk6IElEdXJhdGlvbjxudW1iZXI+IHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgY2xvY2t0aW1lOiB0aW1lMi5jbG9ja3RpbWUgLSB0aW1lMS5jbG9ja3RpbWUsXHJcbiAgICAgICAgY3B1OiAodGltZTIuY3B1ICYmIHRpbWUxLmNwdSkgPyAodGltZTIuY3B1IC0gdGltZTEuY3B1KSA6IHVuZGVmaW5lZFxyXG4gICAgfTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGRpc3RvcmJ0aW9uPFRJdGVtPihpdGVtczogQXJyYXk8VEl0ZW0+LCB2YWw6IChpdGVtOiBUSXRlbSkgPT4gbnVtYmVyIHwgdW5kZWZpbmVkKTogSURpc3RvcmJ0aW9uIHtcclxuICAgIGNvbnN0IHZhbHVlcyA9IG5ldyBBcnJheTxudW1iZXI+KCk7XHJcbiAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgaXRlbXMpIHtcclxuICAgICAgICBjb25zdCBjdXJyZW50ID0gdmFsKGl0ZW0pO1xyXG4gICAgICAgIGlmIChjdXJyZW50ICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgdmFsdWVzLnB1c2goY3VycmVudCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgdmFsdWVzLnNvcnQoKGEsIGIpID0+IGEgLSBiKTtcclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGF2ZXJhZ2U6IGF2ZXJhZ2UodmFsdWVzKSxcclxuICAgICAgICBtZWRpYW46IG1lZGlhbih2YWx1ZXMpLFxyXG4gICAgICAgIG1heDogdmFsdWVzW3ZhbHVlcy5sZW5ndGggLSAxXSxcclxuICAgICAgICBtaW46IHZhbHVlc1swXSxcclxuICAgICAgICB0b3RhbDogdmFsdWVzLmxlbmd0aFxyXG4gICAgfTtcclxufVxyXG5cclxuZnVuY3Rpb24gYXZlcmFnZSh2YWx1ZXM6IEFycmF5PG51bWJlcj4pOiBudW1iZXIge1xyXG4gICAgbGV0IGF2ZyA9IDA7XHJcbiAgICBmb3IgKGNvbnN0IHZhbCBvZiB2YWx1ZXMpIHtcclxuICAgICAgICBhdmcgKz0gdmFsO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGF2ZyAvIHZhbHVlcy5sZW5ndGg7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIG1lZGlhbih2YWx1ZXM6IEFycmF5PG51bWJlcj4pOiBudW1iZXIge1xyXG4gICAgY29uc3QgaGFsZiA9IE1hdGguZmxvb3IodmFsdWVzLmxlbmd0aCAvIDIpO1xyXG5cclxuICAgIGlmICh2YWx1ZXMubGVuZ3RoICUgMikge1xyXG4gICAgICAgIHJldHVybiB2YWx1ZXNbaGFsZl07XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJldHVybiAodmFsdWVzW2hhbGYgLSAxXSArIHZhbHVlc1toYWxmXSkgLyAyLjA7XHJcbiAgICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL2lmZGVmLWxvYWRlci9pZmRlZi1sb2FkZXIuanM/REVCVUc9dHJ1ZSZQRVJGT1JNQU5DRV9BVURJVD10cnVlIS4vc3JjL3Byb2Nlc3NpbmcvYXVkaXQvcmVwb3J0ZXJzL2NhbGMtbWV0aG9kcy50cyIsImltcG9ydCB7IElQZXJmc3RhbXAgfSBmcm9tICcuLi9kZWZpbml0aW9ucyc7XHJcblxyXG5leHBvcnQgY2xhc3MgUGVyZnN0YW1wIGltcGxlbWVudHMgSVBlcmZzdGFtcCB7XHJcbiAgICBwdWJsaWMgc3RhdGljIG5vdzogKCkgPT4gbnVtYmVyIHwgdW5kZWZpbmVkO1xyXG5cclxuICAgIHB1YmxpYyByZWFkb25seSBjbG9ja3RpbWU6IG51bWJlciA9ICtuZXcgRGF0ZSgpO1xyXG5cclxuICAgIHB1YmxpYyByZWFkb25seSBjcHU/OiBudW1iZXIgPSBQZXJmc3RhbXAubm93KCk7XHJcbn1cclxuXHJcbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXHJcbmlmICh0eXBlb2YgcGVyZm9ybWFuY2UgIT09ICd1bmRlZmluZWQnXHJcbiAgICAmJiB0eXBlb2YgcGVyZm9ybWFuY2Uubm93ICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgUGVyZnN0YW1wLm5vdyA9ICgpID0+IHBlcmZvcm1hbmNlLm5vdygpO1xyXG59IGVsc2Uge1xyXG4gICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cclxuICAgIFBlcmZzdGFtcC5ub3cgPSAoKSA9PiB1bmRlZmluZWQ7XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL2lmZGVmLWxvYWRlci9pZmRlZi1sb2FkZXIuanM/REVCVUc9dHJ1ZSZQRVJGT1JNQU5DRV9BVURJVD10cnVlIS4vc3JjL3Byb2Nlc3NpbmcvYXVkaXQvYXVkaXRvcnMvcGVyZnN0YW1wLnRzIiwiaW1wb3J0IHsgSUVudmVsb3BRdWV1ZSB9IGZyb20gJy4vZW52ZWxvcC1xdWV1ZSc7XHJcbmltcG9ydCB7IFBpcGUgfSBmcm9tICcuL3BpcGUnO1xyXG5cclxuLyoqXHJcbiAqIEJ1cyBmb3IgYWxsIHBpcGVzIGluIHRoZSBzeXN0ZW1cclxuICpcclxuICogQGludGVybmFsXHJcbiAqIEBjbGFzcyBCdXNcclxuICovXHJcbmV4cG9ydCBjbGFzcyBCdXMge1xyXG4gICAgcHVibGljIHJlYWRvbmx5IHF1ZXVlczogTWFwPHN0cmluZywgSUVudmVsb3BRdWV1ZT4gPSBuZXcgTWFwKCk7XHJcblxyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IHBpcGVzOiBNYXA8c3RyaW5nLCBQaXBlPlxyXG4gICAgKSB7XHJcbiAgICAgICAgcGlwZXMuZm9yRWFjaCgocGlwZSwgaWQpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5xdWV1ZXMuc2V0KGlkLCBwaXBlLmJhdGNoQnVpbGRlci5xdWV1ZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFzeW5jIHN0YXJ0KCkge1xyXG4gICAgICAgIGZvciAoY29uc3QgcGlwZSBvZiB0aGlzLnBpcGVzLnZhbHVlcygpKSB7XHJcbiAgICAgICAgICAgIGF3YWl0IHBpcGUuc3RhcnQoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFzeW5jIHRlcm1pbmF0ZSgpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICBmb3IgKGNvbnN0IHBpcGUgb2YgdGhpcy5waXBlcy52YWx1ZXMoKSkge1xyXG4gICAgICAgICAgICBhd2FpdCBwaXBlLnRlcm1pbmF0ZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvaWZkZWYtbG9hZGVyL2lmZGVmLWxvYWRlci5qcz9ERUJVRz10cnVlJlBFUkZPUk1BTkNFX0FVRElUPXRydWUhLi9zcmMvcHJvY2Vzc2luZy9idXMudHMiLCJleHBvcnQgKiBmcm9tICcuL2VuZHBvaW50JztcclxuZXhwb3J0ICogZnJvbSAnLi9mZS1hbmFseXRpY3MtY29sbGVjdG9yJztcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL2lmZGVmLWxvYWRlci9pZmRlZi1sb2FkZXIuanM/REVCVUc9dHJ1ZSZQRVJGT1JNQU5DRV9BVURJVD10cnVlIS4vc3JjL3Byb2Nlc3NpbmcvZW5kcG9pbnRzL2luZGV4LnRzIiwiaW1wb3J0IHsgSVN5bmNQb2ludCwgTG9jYWxTdG9yYWdlVGFiU3luY1BvaW50IH0gZnJvbSAnLi4vZnJhbWV3b3JrL3RhYi1zeW5jLXBvaW50JztcclxuaW1wb3J0IHsgVW5sb2FkRXZlbnQgfSBmcm9tICcuLi9mcmFtZXdvcmsvdW5sb2FkLWV2ZW50JztcclxuaW1wb3J0IHsgSUxvZ2dlciB9IGZyb20gJy4uL2xvZ3MnO1xyXG5pbXBvcnQgeyBJUGlwZVBlcmZvcm1hbmNlQXVkaXRvciB9IGZyb20gJy4vYXVkaXQvYXVkaXRvcnMvcGlwZSc7XHJcbmltcG9ydCB7IEFqYXhSZXF1ZXN0U3RhdHVzUmVzdWx0IH0gZnJvbSAnLi9hdWRpdC9zdGF0cy9waXBlLXN0YXRzJztcclxuaW1wb3J0IHsgSUJhdGNoQnVpbGRlciB9IGZyb20gJy4vYmF0Y2gtYnVpbGRlcic7XHJcbmltcG9ydCB7IElFbmRwb2ludCB9IGZyb20gJy4vZW5kcG9pbnRzJztcclxuaW1wb3J0IHsgSUZsdXNoVGltZVN0cmF0ZWd5IH0gZnJvbSAnLi9mbHVzaC10aW1lLXN0cmF0ZWd5JztcclxuXHJcbi8qKlxyXG4gKiBQaXBlIGNvbnN1bWVzIG1lc3NhZ2VzIGZyb20gYSBxdWV1ZSBhbmQgc2VuZCBpdCB0byBhbiBlbmRwb2ludFxyXG4gKlxyXG4gKiBAaW50ZXJuYWxcclxuICovXHJcbmV4cG9ydCBjbGFzcyBQaXBlIHtcclxuICAgIHByaXZhdGUgX2ludGVydmFsSWQ6IGFueSB8IHVuZGVmaW5lZDtcclxuICAgIHByaXZhdGUgX2FjdGl2ZSA9IHRydWU7XHJcblxyXG4gICAgcHVibGljIGdldCBxdWV1ZUlkKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuYmF0Y2hCdWlsZGVyLnF1ZXVlLmlkO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBiYXRjaEJ1aWxkZXI6IElCYXRjaEJ1aWxkZXIsXHJcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IGVuZHBvaW50OiBJRW5kcG9pbnQsXHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBfZmx1c2hUaW1lU3RyYXRlZ3k6IElGbHVzaFRpbWVTdHJhdGVneSxcclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IF9sb2dnZXI6IElMb2dnZXIsXHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBfYXVkaXRvcjogSVBpcGVQZXJmb3JtYW5jZUF1ZGl0b3IsXHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBfc3luY1BvaW50OiBJU3luY1BvaW50ID0gbmV3IExvY2FsU3RvcmFnZVRhYlN5bmNQb2ludChiYXRjaEJ1aWxkZXIucXVldWUuaWQgKyAnLXBpcGUnKVxyXG4gICAgKSB7IH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFN0YXJ0IHF1ZXVlIGhhbmRsaW5nXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGFydCgpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICBpZiAodGhpcy5faW50ZXJ2YWxJZCkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1BpcGUgYWxyZWFkeSB3YXMgc3RhcnRlZC4nKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5faW50ZXJ2YWxJZCA9IHt9O1xyXG5cclxuICAgICAgICB0aGlzLnN1YnNjcmliZSgpO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5zY2hlZHVsZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhc3luYyB0ZXJtaW5hdGUoKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2FjdGl2ZSkge1xyXG4gICAgICAgICAgICB0aGlzLmRpc3Bvc2UoKTtcclxuICAgICAgICAgICAgYXdhaXQgdGhpcy5iYXRjaEJ1aWxkZXIuZGVzdHJveSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZGlzcG9zZSgpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5fYWN0aXZlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2FjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5faW50ZXJ2YWxJZCkge1xyXG4gICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuX2ludGVydmFsSWQpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5faW50ZXJ2YWxJZCA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLl9zeW5jUG9pbnQuZGlzcG9zZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGFzeW5jIHNjaGVkdWxlKCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9hY3RpdmUpIHtcclxuICAgICAgICAgICAgY29uc3QgZHVyYXRpb24gPSBhd2FpdCB0aGlzLl9mbHVzaFRpbWVTdHJhdGVneS5kdXJhdGlvbigpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5faW50ZXJ2YWxJZCA9IHNldFRpbWVvdXQoYXN5bmMgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLmZsdXNoKCk7XHJcbiAgICAgICAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2xvZ2dlci5lcnJvcihgW1FJRDoke3RoaXMucXVldWVJZH1dOiBFcnJvciBvbiBmbHVzaGluZyBtZXNzYWdlcyBpbnRvIHRoZSBlbmRwb2ludC5gLCBlcnJvcik7XHJcbiAgICAgICAgICAgICAgICB9IGZpbmFsbHkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2NoZWR1bGUoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSwgZHVyYXRpb24pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHN1YnNjcmliZSgpOiB2b2lkIHtcclxuICAgICAgICBVbmxvYWRFdmVudC5hZGRMaXN0ZW5lcigoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuZGlzcG9zZSgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGFrZSB7YmF0Y2hTaXplfSBpdGVtcyBmcm9tIHRoZSBxdWV1ZSBhbmQgc2VuZCBpdCB0byBlbmRwb2ludC5cclxuICAgICAqIENvbmZpcm0gb3IgcmVqZWN0IGNvbnN1bWF0aW9uIG9uIHRoZSBlbmQgb2YgZW5kcG9pbnQgcHJvY2Vzc1xyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGFzeW5jIGZsdXNoKCk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgIGlmICghdGhpcy5fYWN0aXZlKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IGF1ZGl0b3IgPSB0aGlzLl9hdWRpdG9yLnN0YXJ0KHRoaXMuYmF0Y2hCdWlsZGVyLnF1ZXVlKTtcclxuXHJcbiAgICAgICAgY29uc3QgYXZvaWRDb25jdXJyZW5jeSA9ICF0aGlzLl9zeW5jUG9pbnQuY2FwdHVyZSh0aGlzLl9mbHVzaFRpbWVTdHJhdGVneS5zeW5jVGltZSgpKTtcclxuXHJcbiAgICAgICAgY29uc3QgY29uc3VtcHRpb24gPSBhd2FpdCB0aGlzLmJhdGNoQnVpbGRlci5uZXh0KGF2b2lkQ29uY3VycmVuY3kpO1xyXG5cclxuICAgICAgICBpZiAoIWNvbnN1bXB0aW9uKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGF1ZGl0b3IuZGVxdWV1ZWQoY29uc3VtcHRpb24uYmF0Y2gpO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gdGhpcy5lbmRwb2ludFxyXG4gICAgICAgICAgICAgICAgLnNlbmQoY29uc3VtcHRpb24uYmF0Y2gpXHJcbiAgICAgICAgICAgICAgICAudGhlbihcclxuICAgICAgICAgICAgICAgIGFzeW5jICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBhdWRpdG9yLmNvbmZpcm1lZChBamF4UmVxdWVzdFN0YXR1c1Jlc3VsdC5TdWNjZXNzKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgYXdhaXQgY29uc3VtcHRpb24uYWNrKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGF1ZGl0b3IuZW5kZWQoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbG9nZ2VyLmxvZyhgW1FJRDoke3RoaXMucXVldWVJZH1dOiBCYXRjaCAke2NvbnN1bXB0aW9uLmJhdGNoLmluZGV4fSB3YXMgc2VudCBzdWNjZXNzZnVsbHkuYCk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgYXN5bmMgKHJlYXNvbikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGF1ZGl0b3IuY29uZmlybWVkKEFqYXhSZXF1ZXN0U3RhdHVzUmVzdWx0Lk5ldHdvcmtFcnJvcik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGF3YWl0IGNvbnN1bXB0aW9uLm5hY2soKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgYXVkaXRvci5lbmRlZCgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9sb2dnZXIuZXJyb3IoYFtRSUQ6JHt0aGlzLnF1ZXVlSWR9XTogQmF0Y2ggJHtjb25zdW1wdGlvbi5iYXRjaC5pbmRleH0gd2FzIHNlbnQgd2l0aCBlcnJvci5gLCByZWFzb24pO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBhdWRpdG9yLnNlbnQoKTtcclxuXHJcbiAgICAgICAgICAgIGF3YWl0IHJlc3VsdDtcclxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICBhd2FpdCBjb25zdW1wdGlvbi5uYWNrKCk7XHJcbiAgICAgICAgICAgIHRocm93IGVycm9yO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvaWZkZWYtbG9hZGVyL2lmZGVmLWxvYWRlci5qcz9ERUJVRz10cnVlJlBFUkZPUk1BTkNFX0FVRElUPXRydWUhLi9zcmMvcHJvY2Vzc2luZy9waXBlLnRzIiwiaW1wb3J0IHsgTWVzc2FnZVR5cGUgfSBmcm9tICcuLi9kZWZpbml0aW9ucyc7XHJcblxyXG4vKipcclxuICogRW52ZWxvcCBmb3IgYSBtZXNzYWdlLlxyXG4gKiBFbnJpY2ggYWRkaXRpb25hbCB0ZWNobmljYWwgaW5mb3JtYXRpb24uXHJcbiAqXHJcbiAqIEBpbnRlcm5hbFxyXG4gKi9cclxuZXhwb3J0IGludGVyZmFjZSBJRW52ZWxvcCB7XHJcbiAgICAvKipcclxuICAgICAqIFVuaXF1ZSBJRCBvZiBtZXNzYWdlXHJcbiAgICAgKi9cclxuICAgIGlkOiBzdHJpbmc7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaW1lc3RhbXAgb2YgbWVzc2FnZSBzZW5kaW5nIHRvIHRoZSBsaWJyYXJ5XHJcbiAgICAgKi9cclxuICAgIHRpbWVzdGFtcDogbnVtYmVyO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogTmFtZSBvZiBtZXNzYWdlXHJcbiAgICAgKi9cclxuICAgIG5hbWU6IHN0cmluZztcclxuXHJcbiAgICAvKipcclxuICAgICAqIFR5cGUgb2YgbWVzc2FnZSBib2R5XHJcbiAgICAgKi9cclxuICAgIHJlYWRvbmx5IHR5cGU6IE1lc3NhZ2VUeXBlO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogTWFpbiBtZXNzYWdlIGJvZHkgZnJvbSBhIHVzZXIgY29kZVxyXG4gICAgICovXHJcbiAgICBtZXNzYWdlOiBvYmplY3Q7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBFbnZlbG9wIGZvciBhIG1lc3NhZ2UuXHJcbiAqIEVucmljaCBhZGRpdGlvbmFsIHRlY2huaWNhbCBpbmZvcm1hdGlvbi5cclxuICpcclxuICogQGludGVybmFsXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgRW52ZWxvcCBpbXBsZW1lbnRzIElFbnZlbG9wIHtcclxuICAgIC8qKlxyXG4gICAgICogVW5pcXVlIElEIG9mIG1lc3NhZ2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIGlkOiBzdHJpbmc7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaW1lc3RhbXAgb2YgbWVzc2FnZSBzZW5kaW5nIHRvIHRoZSBsaWJyYXJ5XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyB0aW1lc3RhbXA6IG51bWJlcjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIE5hbWUgb2YgbWVzc2FnZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgbmFtZTogc3RyaW5nO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFR5cGUgb2YgbWVzc2FnZSBib2R5XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IHR5cGU6IE1lc3NhZ2VUeXBlLFxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBNYWluIG1lc3NhZ2UgYm9keSBmcm9tIGEgdXNlciBjb2RlXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIG1lc3NhZ2U6IGFueSA9IHsgfVxyXG4gICAgKSB7IH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvaWZkZWYtbG9hZGVyL2lmZGVmLWxvYWRlci5qcz9ERUJVRz10cnVlJlBFUkZPUk1BTkNFX0FVRElUPXRydWUhLi9zcmMvcHJvY2Vzc2luZy9lbnZlbG9wLnRzIiwiaW1wb3J0IHsgSUNvbmZpZ3VyYXRpb24sIElFbnZpcm9ubWVudERhdGEgfSBmcm9tICcuL2NvbmZpZ3VyYXRpb25zJztcclxuaW1wb3J0IHsgbWVzc2FnZXNDb25maWd1cmF0aW9uIH0gZnJvbSAnLi9jb25maWd1cmF0aW9ucy9kZWZhdWx0cy9tZXNzYWdlcy1jb25maWd1cmF0aW9uJztcclxuaW1wb3J0IHsgR3VpZFByb3ZpZGVyLCBTaW5nbGV0b24sIFRpbWVTdGFtcFByb3ZpZGVyIH0gZnJvbSAnLi9mcmFtZXdvcmsnO1xyXG5pbXBvcnQgeyBVbml2ZXJzYWxMb2dnZXIsIFdvcmtlckxvZ2dlciB9IGZyb20gJy4vbG9ncyc7XHJcbmltcG9ydCB7IFBvbHlmaWxscyB9IGZyb20gJy4vcG9seWZpbGxzJztcclxuaW1wb3J0IHsgQnVzQnVpbGRlciwgTWVzc2VuZ2VyLCBSb3V0ZXIgfSBmcm9tICcuL3Byb2Nlc3NpbmcnO1xyXG5pbXBvcnQgeyBNZXNzZW5nZXJQZXJmb3JtYW5jZUF1ZGl0b3JCdWlsZGVyIH0gZnJvbSAnLi9wcm9jZXNzaW5nL2F1ZGl0L2F1ZGl0b3JzL21lc3Nlbmdlci1wZXJmb3JtYW5jZS1hdWRpdG9yJztcclxuaW1wb3J0IHsgTWVzc2VuZ2VyU3RhdGlzdGljQXVkaXRvciB9IGZyb20gJy4vcHJvY2Vzc2luZy9hdWRpdC9hdWRpdG9ycy9tZXNzZW5nZXItc3RhdGlzdGljLWF1ZGl0b3InO1xyXG5pbXBvcnQgeyBQaXBlU3RhdHNQcm92aWRlciB9IGZyb20gJy4vcHJvY2Vzc2luZy9hdWRpdC9zdGF0cy9waXBlLXN0YXRzLXByb3ZpZGVyJztcclxuaW1wb3J0IHsgUGlwZVN0YXRzSW5kZXhlZERCU3RvcmFnZSB9IGZyb20gJy4vcHJvY2Vzc2luZy9hdWRpdC9zdGF0cy9zdG9yYWdlcy9waXBlLXN0YXRzLmluZGV4ZWRkYic7XHJcbmltcG9ydCB7IFBpcGVTdGF0c0xvY2FsU3RvcmFnZSB9IGZyb20gJy4vcHJvY2Vzc2luZy9hdWRpdC9zdGF0cy9zdG9yYWdlcy9waXBlLXN0YXRzLmxvY2FsLXN0b3JhZ2UnO1xyXG5pbXBvcnQgeyBQaXBlU3RhdHNNZW1vcnlTdG9yYWdlIH0gZnJvbSAnLi9wcm9jZXNzaW5nL2F1ZGl0L3N0YXRzL3N0b3JhZ2VzL3BpcGUtc3RhdHMubWVtb3J5JztcclxuaW1wb3J0IHsgUG9zdG1hbiB9IGZyb20gJy4vcHJvY2Vzc2luZy9wb3N0bWFuJztcclxuaW1wb3J0IHsgSVdvcmtlckdsb2JhbFNjb3BlIH0gZnJvbSAnLi93b3JrZXJzL3dvcmtlci1kZWZpbml0aW9ucyc7XHJcbmltcG9ydCB7IFdvcmtlclJlY2VpdmVyIH0gZnJvbSAnLi93b3JrZXJzL3dvcmtlci1yZWNlaXZlcic7XHJcbmltcG9ydCB7IFdvcmtlclNjb3BlIH0gZnJvbSAnLi93b3JrZXJzL3dvcmtlci1zY29wZSc7XHJcblxyXG4vKipcclxuICogRW50cnkgcG9pbnQgZm9yIGJ1aWxkaW5nIGpzLWZpbGUgZm9yIFdlYldvcmtlciBlbnZpcm9ubWVudFxyXG4gKi9cclxuKCgpID0+IHtcclxuICAgIC8vIFJlY2VpdmUgY3VycmVudCBnbG9iYWwgc2NvcGUgdmFyaWFibGVcclxuICAgIGNvbnN0IHNjb3BlOiBJV29ya2VyR2xvYmFsU2NvcGUgPSBXb3JrZXJTY29wZS5jdXJyZW50KCk7XHJcblxyXG4gICAgLy8gQ3JlYXRlIGxvZ2dlciBmb3IgYWxsIG9iamVjdHNcclxuICAgIGNvbnN0IGxvZ2dlciA9IG5ldyBVbml2ZXJzYWxMb2dnZXIoWyBdKTtcclxuXHJcbiAgICAvLyBDcmVhdGUgbWVzc2FnZXMgcmVjZWl2ZXIgZnJvbSBtYWluIHRocmVhZFxyXG4gICAgY29uc3QgcmVjZWl2ZXIgPSBuZXcgV29ya2VyUmVjZWl2ZXIoc2NvcGUsIGxvZ2dlcik7XHJcblxyXG4gICAgLy8gVXNlIHNpbmdsZXRvbiB0byBwcmV2ZW50IGEgZmV3IGluaXRpYWxpemF0aW9uIGluIHNoYXJlZCB3ZWIgd29ya2VyXHJcbiAgICBjb25zdCBzaW5nbGV0b24gPSBuZXcgU2luZ2xldG9uKChjb25maWd1cmF0aW9uOiBJQ29uZmlndXJhdGlvbiwgZW52aXJvbm1lbnQ6IElFbnZpcm9ubWVudERhdGEpID0+IHtcclxuICAgICAgICBsb2dnZXIuZW5hYmxlZCA9IGVudmlyb25tZW50LmRlYnVnO1xyXG5cclxuICAgICAgICAvLyBSdW4gbG9hZGluZyBwb2x5ZmlsbHMgaWYgdGhleSBhcmUgbmVjZXNzYXJ5XHJcbiAgICAgICAgUG9seWZpbGxzLmxvYWQoc2NvcGUsIGFzeW5jICgpID0+IHtcclxuICAgICAgICAgICAgLy8gQWRkIGxvZ2dlciBmb3Igc2VuZGluZyBtZXNzYWdlcyBiYWNrIHRvIG1haW4gdGhyZWFkXHJcbiAgICAgICAgICAgIGxvZ2dlci5yZXBsYWNlKFsgbmV3IFdvcmtlckxvZ2dlcihyZWNlaXZlci5jb250ZXh0LnNlbmRlcikgXSk7XHJcblxyXG4gICAgICAgICAgICAvLyBDcmVhdGUgY2xhc3MgdG8gc2VhbCBtZXNzYWdlcyB0byBlbnZlbG9wcyAocHJvdmlkZSBlbnJpY2htZW50KVxyXG4gICAgICAgICAgICBjb25zdCBwb3N0bWFuID0gbmV3IFBvc3RtYW4oR3VpZFByb3ZpZGVyLmRlZmF1bHQsIG5ldyBUaW1lU3RhbXBQcm92aWRlcigpKTtcclxuXHJcbiAgICAgICAgICAgIC8vIENyZWF0ZSBzdGF0aXN0aWMgc3RvcmFnZXMgYW5kIHByb3ZpZGVyc1xyXG4gICAgICAgICAgICBjb25zdCBzdGF0c1N0b3JhZ2UgPSAgUGlwZVN0YXRzTG9jYWxTdG9yYWdlLmNyZWF0ZSgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8fCBhd2FpdCBQaXBlU3RhdHNJbmRleGVkREJTdG9yYWdlLmNyZWF0ZSgpLmNhdGNoKCgpID0+IG5ldyBQaXBlU3RhdHNNZW1vcnlTdG9yYWdlKCkpO1xyXG4gICAgICAgICAgICBjb25zdCBzdGF0c1Byb3ZpZGVyID0gbmV3IFBpcGVTdGF0c1Byb3ZpZGVyKHN0YXRzU3RvcmFnZSk7XHJcblxyXG4gICAgICAgICAgICAvLyBDcmVhdGUgYnVzIGJ1aWxkZXIgZnJvbSBjb25maWd1cmF0aW9uXHJcbiAgICAgICAgICAgIGNvbnN0IGJ1c0J1aWxkZXIgPSBuZXcgQnVzQnVpbGRlcihyZWNlaXZlci5jb250ZXh0LCBjb25maWd1cmF0aW9uLCBlbnZpcm9ubWVudCwgc3RhdHNQcm92aWRlciwgbG9nZ2VyKTtcclxuXHJcbiAgICAgICAgICAgIC8vIEJ1aWxkIGJ1c1xyXG4gICAgICAgICAgICBjb25zdCBidXMgPSBhd2FpdCBidXNCdWlsZGVyLmJ1aWxkKCk7XHJcblxyXG4gICAgICAgICAgICAvLyBDcmVhdGUgYSBtZXNzYWdlIHJvdXRlclxyXG4gICAgICAgICAgICBjb25zdCByb3V0ZXIgPSBuZXcgUm91dGVyKG1lc3NhZ2VzQ29uZmlndXJhdGlvbiwgYnVzLnF1ZXVlcyk7XHJcblxyXG4gICAgICAgICAgICAvLyBQZXJmb3JtYW5jZSBhbmQgc3RhdGlzdGljIGF1ZGl0b3JzIGZvciBNZXNzZW5nZXJcclxuICAgICAgICAgICAgY29uc3QgbWVzc2FnZXNQZXJmb3JtYW5jZUF1ZGl0b3IgPSBNZXNzZW5nZXJQZXJmb3JtYW5jZUF1ZGl0b3JCdWlsZGVyLmNyZWF0ZShlbnZpcm9ubWVudC5wZXJmb3JtYW5jZUF1ZGl0LCBidXNCdWlsZGVyLmF1ZGl0U2VuZGVyKTtcclxuICAgICAgICAgICAgY29uc3QgbWVzc2FnZXNTdGF0aXN0aWNBdWRpdG9yID0gbmV3IE1lc3NlbmdlclN0YXRpc3RpY0F1ZGl0b3Ioc3RhdHNTdG9yYWdlKTtcclxuXHJcbiAgICAgICAgICAgIC8vIENyZWF0ZSBtZXNzYWdlIHJvdXRlciB0byBoYW5kbGluZyBtZXNzYWdlcyBmcm9tIG1haW4gdGhyZWFkXHJcbiAgICAgICAgICAgIGNvbnN0IG1lc3NlbmdlciA9IG5ldyBNZXNzZW5nZXIocm91dGVyLCBwb3N0bWFuLCBtZXNzYWdlc1N0YXRpc3RpY0F1ZGl0b3IsIG1lc3NhZ2VzUGVyZm9ybWFuY2VBdWRpdG9yKTtcclxuXHJcbiAgICAgICAgICAgIC8vIEJpbmQgcmVjZWl2ZSBldmVudCBmcm9tIG1haW4gdGhyZWFkIHRvIE1lc3NlbmdlciBoYW5kbGVyXHJcbiAgICAgICAgICAgIHJlY2VpdmVyLm1lc3NhZ2VzLnN1YnNjcmliZSgoZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgbWVzc2VuZ2VyLnNlbmQoZGF0YS5tZXNzYWdlcyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgLy8gU3RhcnQgYWxsIHBpcGVzIHRvIGhhbmRsZSBtZXNzYWdlcyBmcm9tIHF1ZXVlc1xyXG4gICAgICAgICAgICBhd2FpdCBidXMuc3RhcnQoKTtcclxuXHJcbiAgICAgICAgICAgIC8vIFN1YnNjcmliZSBmb3IgdGVybWluYXRpb24gY29tbWFuZCBhbmQgdGVybWluYXRlIGFsbCByZWFjdGlvbnMgZm9yIG90aGVyIGNhbGxpbmdcclxuICAgICAgICAgICAgcmVjZWl2ZXIudGVybWluYXRlLmhhbmRsZXIgPSBhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgIGF3YWl0IGJ1cy50ZXJtaW5hdGUoKTtcclxuICAgICAgICAgICAgICAgICAgICBhd2FpdCBzdGF0c1N0b3JhZ2UuY2xlYXIoKTtcclxuICAgICAgICAgICAgICAgICAgICBhd2FpdCBzdGF0c1N0b3JhZ2UuZGlzcG9zZSgpO1xyXG4gICAgICAgICAgICAgICAgfSBmaW5hbGx5IHtcclxuICAgICAgICAgICAgICAgICAgICByZWNlaXZlci5kaXNwb3NlKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBsb2dnZXIubG9nKCdXb3JrZXIgd2FzIHN0YXJ0ZWQgc3VjY2Vzc2Z1bGx5LicpO1xyXG4gICAgICAgIH0sIGVudmlyb25tZW50KTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIE1hcCByZWNlaXZpbmcgb2YgY29uZmlndXJhdGlvbiBtZXNzYWdlcyB0byBzaW5nbGV0b24gZXhlY3V0aW9uXHJcbiAgICByZWNlaXZlci5jb25maWd1cmF0aW9uLnN1YnNjcmliZSgoZXZlbnQpID0+IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBzaW5nbGV0b24uZXhlY3V0ZU9uY2UoZXZlbnQuY29uZmlndXJhdGlvbiwgZXZlbnQuZW52aXJvbm1lbnQpO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgIGxvZ2dlci5lcnJvcihlcnJvcik7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn0pKCk7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy9pZmRlZi1sb2FkZXIvaWZkZWYtbG9hZGVyLmpzP0RFQlVHPXRydWUmUEVSRk9STUFOQ0VfQVVESVQ9dHJ1ZSEuL3NyYy9tZXNzYWdpbmctY2xpZW50LXdvcmtlci50cyIsIlxyXG5pbXBvcnQgeyBJTWVzc2FnZXNDb25maWd1cmF0aW9uIH0gZnJvbSAnLi4vbWVzc2FnZXMtY29uZmlndXJhdGlvbic7XHJcblxyXG4vKipcclxuICogQGludGVybmFsXHJcbiAqL1xyXG5leHBvcnQgY29uc3QgbWVzc2FnZXNDb25maWd1cmF0aW9uOiBJTWVzc2FnZXNDb25maWd1cmF0aW9uID0ge1xyXG4gICAgbWVzc2FnZXM6IFtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBDb25maWd1cmF0aW9uIGZvciBlYWNoIG1lc3NhZ2VzXHJcbiAgICAgICAgICogRGlzYmxlIGluIGZpcnN0IHZlcnNpb24gZm9yIHNlbmRpbmcgYWxsIG1lc3NhZ2VzIHRvICdkZWZhdWx0JyBxdWV1ZS5cclxuICAgICAgICAgKi9cclxuICAgICAgICAvKlxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdHlwZTogJ21lYXN1cmVtZW50JyxcclxuICAgICAgICAgICAgcXVldWU6ICdkZWJ1ZydcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdHlwZTogJ2xvZycsXHJcbiAgICAgICAgICAgIHF1ZXVlOiAnZGVidWcnXHJcbiAgICAgICAgfVxyXG4gICAgICAgICovXHJcbiAgICBdXHJcbn07XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy9pZmRlZi1sb2FkZXIvaWZkZWYtbG9hZGVyLmpzP0RFQlVHPXRydWUmUEVSRk9STUFOQ0VfQVVESVQ9dHJ1ZSEuL3NyYy9jb25maWd1cmF0aW9ucy9kZWZhdWx0cy9tZXNzYWdlcy1jb25maWd1cmF0aW9uLnRzIiwiZXhwb3J0ICogZnJvbSAnLi9sb2dnZXInO1xyXG5leHBvcnQgKiBmcm9tICcuL2NvbnNvbGUtbG9nZ2VyJztcclxuZXhwb3J0ICogZnJvbSAnLi9ldmVudC1sb2dnZXInO1xyXG5leHBvcnQgKiBmcm9tICcuL3dvcmtlci1sb2dnZXInO1xyXG5leHBvcnQgKiBmcm9tICcuL3VuaXZlcnNhbC1sb2dnZXInO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvaWZkZWYtbG9hZGVyL2lmZGVmLWxvYWRlci5qcz9ERUJVRz10cnVlJlBFUkZPUk1BTkNFX0FVRElUPXRydWUhLi9zcmMvbG9ncy9pbmRleC50cyIsImltcG9ydCB7IElMb2dXb3JrZXJNZXNzYWdlLCBJV29ya2VyTWVzc2FnZVNlbmRlciB9IGZyb20gJy4uL3dvcmtlcnMvd29ya2VyLWRlZmluaXRpb25zJztcclxuaW1wb3J0IHsgSUxvZ2dlciB9IGZyb20gJy4vbG9nZ2VyJztcclxuXHJcbi8qKlxyXG4gKiBTZW5kIGxvZyBtZXNzYWdlcyB0byBhIG1haW4gdGhyZWFkXHJcbiAqXHJcbiAqIEBpbnRlcm5hbFxyXG4gKiBAY2xhc3MgU2hhcmVkV29ya2VyTG9nZ2VyXHJcbiAqIEBpbXBsZW1lbnRzIHtJTG9nZ2VyfVxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFdvcmtlckxvZ2dlciBpbXBsZW1lbnRzIElMb2dnZXIge1xyXG4gICAgcHVibGljIHJlYWRvbmx5IHByZWZpeDogc3RyaW5nID0gYGA7XHJcblxyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBfc2VuZGVyOiBJV29ya2VyTWVzc2FnZVNlbmRlclxyXG4gICAgKSB7IH1cclxuXHJcbiAgICBwdWJsaWMgZmF0YWwobWVzc2FnZTogc3RyaW5nLCBlcnJvcj86IEVycm9yKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fc2VuZGVyLnBvc3RNZXNzYWdlKHsgdHlwZTogJ2xvZycsIGxvZzoge2xldmVsOiAnZmF0YWwnLCBtZXNzYWdlOiB0aGlzLnByZWZpeCArIG1lc3NhZ2UsIGVycm9yfSB9IGFzIElMb2dXb3JrZXJNZXNzYWdlKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZXJyb3IobWVzc2FnZTogc3RyaW5nLCBlcnJvcj86IEVycm9yKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fc2VuZGVyLnBvc3RNZXNzYWdlKHsgdHlwZTogJ2xvZycsIGxvZzoge2xldmVsOiAnZXJyb3InLCBtZXNzYWdlOiB0aGlzLnByZWZpeCArIG1lc3NhZ2UsIGVycm9yfSB9IGFzIElMb2dXb3JrZXJNZXNzYWdlKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbG9nKG1lc3NhZ2U6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX3NlbmRlci5wb3N0TWVzc2FnZSh7IHR5cGU6ICdsb2cnLCBsb2c6IHtsZXZlbDogJ2xvZycsIG1lc3NhZ2U6IHRoaXMucHJlZml4ICsgbWVzc2FnZX0gfSBhcyBJTG9nV29ya2VyTWVzc2FnZSk7XHJcbiAgICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL2lmZGVmLWxvYWRlci9pZmRlZi1sb2FkZXIuanM/REVCVUc9dHJ1ZSZQRVJGT1JNQU5DRV9BVURJVD10cnVlIS4vc3JjL2xvZ3Mvd29ya2VyLWxvZ2dlci50cyIsIi8qKlxyXG4gKiBQb2x5ZmlsbHNcclxuICovXHJcblxyXG5pbXBvcnQgeyBJRW52aXJvbm1lbnREYXRhIH0gZnJvbSAnLi9jb25maWd1cmF0aW9ucy9lbnZpcm9ubWVudCc7XHJcbmltcG9ydCB7IG1hcFBhdGggfSBmcm9tICcuL2ZyYW1ld29yay9zdHJpbmdzJztcclxuaW1wb3J0IHsgSVdvcmtlckdsb2JhbFNjb3BlIH0gZnJvbSAnLi93b3JrZXJzL3dvcmtlci1kZWZpbml0aW9ucyc7XHJcblxyXG4vKipcclxuICogRHluYW1pYyBwb2x5ZmlsbHMgbG9hZGVyIGZyb20gc2VwYXJhdGVkIGZpbGVcclxuICogSWYgc29tZSBvZiBBcGkgaXMgbm90IGV4aXN0cyAtIGxvYWQgYWxsIGJhdGNoIHRvIGJyb3dzZXIuXHJcbiAqIEFjdHVhbCBmb3Igc3VwcG9ydGluZyBJRTkrXHJcbiAqXHJcbiAqIEBpbnRlcm5hbFxyXG4gKiBAY2xhc3MgUG9seWZpbGxzXHJcbiAqL1xyXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgUG9seWZpbGxzIHtcclxuICAgIC8qKlxyXG4gICAgICogQ2hlY2sgYW5kIGxvYWQgcG9seWZpbGxzIGlmIG5lY2Vzc2FyeVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGxvYWQoc2NvcGU6IElXb3JrZXJHbG9iYWxTY29wZSwgbG9hZGVkOiAoKSA9PiB2b2lkLCBkYXRhOiBJRW52aXJvbm1lbnREYXRhKSB7XHJcbiAgICAgICAgLy8gQ2hlY2sgcmVxdWlyZWQgQVBJcyBhbmQgbG9hZCBwb2x5ZmlscyBpZiBuZWNlc3NhcnlcclxuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cclxuICAgICAgICBpZiAoZGF0YS5mb3JjZVBvbHlmaWxscyB8fFxyXG4gICAgICAgICAgICB0eXBlb2YgUHJvbWlzZSA9PT0gJ3VuZGVmaW5lZCcgfHxcclxuICAgICAgICAgICAgdHlwZW9mIE1hcCA9PT0gJ3VuZGVmaW5lZCcgfHxcclxuICAgICAgICAgICAgdHlwZW9mIFN5bWJvbCA9PT0gJ3VuZGVmaW5lZCdcclxuICAgICAgICApIHtcclxuICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gc2NvcGUuaW1wb3J0U2NyaXB0cyhkYXRhLnBvbHlmaWxsc1VybCB8fCBQb2x5ZmlsbHMudXJsKHNjb3BlLCAnL21lc3NhZ2luZy1jbGllbnQtcG9seWZpbGxzLmpzJykpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHJlc3VsdCAmJiB0eXBlb2YgcmVzdWx0LnRoZW4gPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgICAgICAgIHJlc3VsdC50aGVuKGxvYWRlZCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBsb2FkZWQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGxvYWRlZCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyB1cmwoc2NvcGU6IElXb3JrZXJHbG9iYWxTY29wZSwgcG9seWZpbGxzTmFtZTogc3RyaW5nKSB7XHJcbiAgICAgICAgY29uc3QgY3VycmVudExvY2F0aW9uOiBzdHJpbmcgPSAoc2NvcGUubG9jYXRpb24gfHwgJycpLnRvU3RyaW5nKCk7XHJcblxyXG4gICAgICAgIHJldHVybiBtYXBQYXRoKGN1cnJlbnRMb2NhdGlvbiwgcG9seWZpbGxzTmFtZSk7XHJcbiAgICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL2lmZGVmLWxvYWRlci9pZmRlZi1sb2FkZXIuanM/REVCVUc9dHJ1ZSZQRVJGT1JNQU5DRV9BVURJVD10cnVlIS4vc3JjL3BvbHlmaWxscy50cyIsImV4cG9ydCAqIGZyb20gJy4vYnVzLWJ1aWxkZXInO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvaWZkZWYtbG9hZGVyL2lmZGVmLWxvYWRlci5qcz9ERUJVRz10cnVlJlBFUkZPUk1BTkNFX0FVRElUPXRydWUhLi9zcmMvcHJvY2Vzc2luZy9idWlsZGVycy9pbmRleC50cyIsImltcG9ydCB7IElDb25maWd1cmF0aW9uLCBJRW5kcG9pbnRDb25maWcsIElJbk1lbW9yeVF1ZXVlQ29uZmlnLCBJUGVyc2lzdGVudFF1ZXVlQ29uZmlnIH0gZnJvbSAnLi4vLi4vY29uZmlndXJhdGlvbnMvY29uZmlndXJhdGlvbic7XHJcbmltcG9ydCB7IElFbnZpcm9ubWVudERhdGEgfSBmcm9tICcuLi8uLi9jb25maWd1cmF0aW9ucy9lbnZpcm9ubWVudCc7XHJcbmltcG9ydCB7IEFqYXgsIElBamF4UHJvdmlkZXIsIFRpbWVTdGFtcFByb3ZpZGVyIH0gZnJvbSAnLi4vLi4vZnJhbWV3b3JrJztcclxuaW1wb3J0IHsgSUxvZ2dlciB9IGZyb20gJy4uLy4uL2xvZ3MnO1xyXG5pbXBvcnQgeyBJUXVldWUsIE1lbW9yeVF1ZXVlIH0gZnJvbSAnLi4vLi4vcXVldWVzJztcclxuaW1wb3J0IHsgU2FtcGxlZFF1ZXVlIH0gZnJvbSAnLi4vLi4vcXVldWVzJztcclxuaW1wb3J0IHsgSW5kZXhlZERCUXVldWUgfSBmcm9tICcuLi8uLi9xdWV1ZXMvaW5kZXhlZGRiL2luZGV4ZWRkYi1xdWV1ZSc7XHJcbmltcG9ydCB7IExvY2FsU3RvcmFnZVF1ZXVlIH0gZnJvbSAnLi4vLi4vcXVldWVzL2xvY2FsLXN0b3JhZ2UvbG9jYWwtc3RvcmFnZS1xdWV1ZSc7XHJcbmltcG9ydCB7IEJhdGNoQXVkaXRQcm92aWRlciB9IGZyb20gJy4uL2F1ZGl0L2F1ZGl0LXByb3ZpZGVyJztcclxuaW1wb3J0IHsgUGlwZVBlcmZvcm1hbmNlQXVkaXRvckJ1aWxkZXIgfSBmcm9tICcuLi9hdWRpdC9hdWRpdG9ycy9waXBlLXBlcmZvcm1hbmNlLWF1ZGl0b3InO1xyXG5pbXBvcnQgeyBQaXBlU3RhdGlzdGljQXVkaXRvciB9IGZyb20gJy4uL2F1ZGl0L2F1ZGl0b3JzL3BpcGUtc3RhdGlzdGljcy1hdWRpdG9yJztcclxuaW1wb3J0IHsgV29ya2VyQXVkaXRTZW5kZXIgfSBmcm9tICcuLi9hdWRpdC9zZW5kZXJzL3dvcmtlci1hdWRpdC1zZW5kZXInO1xyXG5pbXBvcnQgeyBJUGlwZVN0YXRzUHJvdmlkZXIgfSBmcm9tICcuLi9hdWRpdC9zdGF0cy9waXBlLXN0YXRzJztcclxuaW1wb3J0IHsgQmF0Y2hCdWlsZGVyIH0gZnJvbSAnLi4vYmF0Y2gtYnVpbGRlcic7XHJcbmltcG9ydCB7IERlZmF1bHRCYXRjaERyb3BTdHJhdGVneSB9IGZyb20gJy4uL2JhdGNoLWRyb3Atc3RyYXRlZ3knO1xyXG5pbXBvcnQgeyBJQmF0Y2hTdG9yYWdlIH0gZnJvbSAnLi4vYmF0Y2gtc3RvcmFnZXMvYmF0Y2gtc3RvcmFnZSc7XHJcbmltcG9ydCB7IEJhdGNoSW5kZXhlZERCU3RvcmFnZSB9IGZyb20gJy4uL2JhdGNoLXN0b3JhZ2VzL2luZGV4ZWRkYi1zdG9yYWdlL2JhdGNoLWluZGV4ZWRkYi1zdG9yYWdlJztcclxuaW1wb3J0IHsgQmF0Y2hMb2NhbFN0b3JhZ2VTdG9yYWdlIH0gZnJvbSAnLi4vYmF0Y2gtc3RvcmFnZXMvbG9jYWwtc3RvcmFnZS9iYXRjaC1sb2NhbHN0b3JhZ2Utc3RvcmFnZSc7XHJcbmltcG9ydCB7IEJhdGNoTWVtb3J5U3RvcmFnZSB9IGZyb20gJy4uL2JhdGNoLXN0b3JhZ2VzL21lbW9yeS1zdG9yYWdlL2JhdGNoLW1lbW9yeS1zdG9yYWdlJztcclxuaW1wb3J0IHsgQnVzIH0gZnJvbSAnLi4vYnVzJztcclxuaW1wb3J0IHsgQ29udGV4dCB9IGZyb20gJy4uL2NvbnRleHQnO1xyXG5pbXBvcnQgeyBGRUFuYWx5dGljc0NvbGxlY3RvckVuZHBvaW50LCBJRW5kcG9pbnQsIElGRUFuYWx5dGljc0NvbGxlY3RvckNvbmZpZ3VyYXRpb24gfSBmcm9tICcuLi9lbmRwb2ludHMnO1xyXG5pbXBvcnQgeyBEeW5hbWljRmx1c2hUaW1lU3RyYXRlZ3kgfSBmcm9tICcuLi9mbHVzaC10aW1lLXN0cmF0ZWd5JztcclxuaW1wb3J0IHsgUGlwZSB9IGZyb20gJy4uL3BpcGUnO1xyXG5pbXBvcnQgeyBQb3J0QWpheFByb3ZpZGVyIH0gZnJvbSAnLi9wb3J0LWFqYXgtcHJvdmlkZXInO1xyXG5cclxuLyoqXHJcbiAqIEBpbnRlcm5hbFxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIEJ1c0J1aWxkZXIge1xyXG4gICAgcHVibGljIHJlYWRvbmx5IGF1ZGl0U2VuZGVyOiBXb3JrZXJBdWRpdFNlbmRlcjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IF9jb250ZXh0OiBDb250ZXh0LFxyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgX2NvbmZpZzogSUNvbmZpZ3VyYXRpb24sXHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBfZW52aXJvbm1lbnQ6IElFbnZpcm9ubWVudERhdGEsXHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBfc3RhdHNQcm92aWRlcjogSVBpcGVTdGF0c1Byb3ZpZGVyLFxyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgX2xvZ2dlcjogSUxvZ2dlclxyXG4gICAgKSB7XHJcbiAgICAgICAgdGhpcy5hdWRpdFNlbmRlciA9IG5ldyBXb3JrZXJBdWRpdFNlbmRlcih0aGlzLl9jb250ZXh0KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYXN5bmMgYnVpbGQoKTogUHJvbWlzZTxCdXM+IHtcclxuICAgICAgICBjb25zdCBhbGxQaXBlcyA9IG5ldyBNYXA8c3RyaW5nLCBQaXBlPigpO1xyXG5cclxuICAgICAgICBmb3IgKGNvbnN0IGVuZHBvaW50Q29uZmlnIG9mIHRoaXMuX2NvbmZpZy5lbmRwb2ludHMpIHtcclxuICAgICAgICAgICAgY29uc3QgcGlwZXMgPSBhd2FpdCB0aGlzLnBpcGVzKGVuZHBvaW50Q29uZmlnKTtcclxuXHJcbiAgICAgICAgICAgIHBpcGVzLmZvckVhY2goKHBpcGUsIGlkKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBhbGxQaXBlcy5zZXQoaWQsIHBpcGUpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBuZXcgQnVzKGFsbFBpcGVzKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGFzeW5jIHBpcGVzKGVuZHBvaW50Q29uZmlnOiBJRW5kcG9pbnRDb25maWcpOiBQcm9taXNlPE1hcDxzdHJpbmcsIFBpcGU+PiB7XHJcbiAgICAgICAgY29uc3QgZW5kcG9pbnQgPSB0aGlzLmVuZHBvaW50KGVuZHBvaW50Q29uZmlnKTtcclxuXHJcbiAgICAgICAgY29uc3QgcGlwZXMgPSBuZXcgTWFwPHN0cmluZywgUGlwZT4oKTtcclxuXHJcbiAgICAgICAgY29uc3QgcGVyZm9ybWFuY2VBdWRpdG9yID0gUGlwZVBlcmZvcm1hbmNlQXVkaXRvckJ1aWxkZXIuY3JlYXRlKHRoaXMuX2Vudmlyb25tZW50LnBlcmZvcm1hbmNlQXVkaXQsIG5ldyBXb3JrZXJBdWRpdFNlbmRlcih0aGlzLl9jb250ZXh0KSk7XHJcbiAgICAgICAgY29uc3Qgc3RhdGlzdGljQXVkaXRvciA9IG5ldyBQaXBlU3RhdGlzdGljQXVkaXRvcih0aGlzLl9zdGF0c1Byb3ZpZGVyKTtcclxuXHJcbiAgICAgICAgZm9yIChjb25zdCBxdWV1ZUNvbmZpZyBvZiBlbmRwb2ludENvbmZpZy5xdWV1ZXMpIHtcclxuICAgICAgICAgICAgY29uc3QgcXVldWUgPSBuZXcgU2FtcGxlZFF1ZXVlKGF3YWl0IHRoaXMucXVldWUocXVldWVDb25maWcpLCBxdWV1ZUNvbmZpZyk7XHJcbiAgICAgICAgICAgIGNvbnN0IGJhdGNoU3RvcmFnZSA9IGF3YWl0IHRoaXMuYmF0Y2hTdG9yYWdlKHF1ZXVlQ29uZmlnKTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGF1ZGl0UHJvdmlkZXIgPSBuZXcgQmF0Y2hBdWRpdFByb3ZpZGVyKCk7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBiYXRjaERyb3BTdHJhdGVneSA9IG5ldyBEZWZhdWx0QmF0Y2hEcm9wU3RyYXRlZ3kocXVldWVDb25maWcpO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgYmF0Y2hCdWlsZGVyID0gbmV3IEJhdGNoQnVpbGRlcihxdWV1ZSwgYmF0Y2hTdG9yYWdlLCBiYXRjaERyb3BTdHJhdGVneSwgYXVkaXRQcm92aWRlciwgc3RhdGlzdGljQXVkaXRvciwgcXVldWVDb25maWcpO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgZmx1c2hUaW1lU3RyYXRlZ3kgPSBuZXcgRHluYW1pY0ZsdXNoVGltZVN0cmF0ZWd5KHRoaXMuX3N0YXRzUHJvdmlkZXIuZ2V0KHF1ZXVlKSwgcXVldWVDb25maWcpO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgcGlwZSA9IG5ldyBQaXBlKGJhdGNoQnVpbGRlciwgZW5kcG9pbnQsIGZsdXNoVGltZVN0cmF0ZWd5LCB0aGlzLl9sb2dnZXIsIHBlcmZvcm1hbmNlQXVkaXRvcik7XHJcblxyXG4gICAgICAgICAgICBwaXBlcy5zZXQocXVldWVDb25maWcuaWQsIHBpcGUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHBpcGVzO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgYXN5bmMgYmF0Y2hTdG9yYWdlKGNvbmZpZzogSUluTWVtb3J5UXVldWVDb25maWcgfCBJUGVyc2lzdGVudFF1ZXVlQ29uZmlnKTogUHJvbWlzZTxJQmF0Y2hTdG9yYWdlPiB7XHJcbiAgICAgICAgaWYgKGNvbmZpZy5wZXJzaXN0ZW50KSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHN5bmNUaW1lID0gKGNvbmZpZy5tYXhGbHVzaFRpbWUgfHwgMzApICogMS41O1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIEJhdGNoSW5kZXhlZERCU3RvcmFnZS5jcmVhdGUoY29uZmlnLmlkLCBzeW5jVGltZSwgY29uZmlnLm5hbWUsIGNvbmZpZy5yZXNldClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKChzdG9yYWdlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RvcmFnZS5sb2dnZXIgPSB0aGlzLl9sb2dnZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fbG9nZ2VyLmxvZyhgQ3JlYXRlZCBwZXJzaXN0ZW50IGJhdGNoIHN0b3JhZ2UgZm9yIGlkICR7Y29uZmlnLmlkfWApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBzdG9yYWdlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9sb2dnZXIuZXJyb3IoJ0NyZWF0aW5nIEluZGV4ZWREYiBmb3IgYmF0Y2ggc3RvcmFnZSB3YXMgZmFpbGVkLicsIGVycm9yKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzdG9yYWdlID0gQmF0Y2hMb2NhbFN0b3JhZ2VTdG9yYWdlLmNyZWF0ZShjb25maWcuaWQsIGNvbmZpZy5uYW1lLCBjb25maWcucmVzZXQpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3RvcmFnZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdG9yYWdlLmxvZ2dlciA9IHRoaXMuX2xvZ2dlcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fbG9nZ2VyLmxvZyhgRG93bmdyYWRlZCB0byBsb2NhbCBzdG9yYWdlIGJhdGNoIHN0b3JhZ2UgZm9yIGlkICR7Y29uZmlnLmlkfS5gKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHN0b3JhZ2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9sb2dnZXIubG9nKGBEb3duZ3JhZGVkIHRvIG1lbW9yeSBiYXRjaCBzdG9yYWdlIGZvciBpZCAke2NvbmZpZy5pZH0uYCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBCYXRjaE1lbW9yeVN0b3JhZ2UoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX2xvZ2dlci5sb2coYENyZWF0ZWQgbWVtb3J5IGJhdGNoIHN0b3JhZ2UgZm9yIGlkICR7Y29uZmlnLmlkfWApO1xyXG4gICAgICAgIHJldHVybiBuZXcgQmF0Y2hNZW1vcnlTdG9yYWdlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBhc3luYyBxdWV1ZShjb25maWc6IElJbk1lbW9yeVF1ZXVlQ29uZmlnIHwgSVBlcnNpc3RlbnRRdWV1ZUNvbmZpZyk6IFByb21pc2U8SVF1ZXVlPiB7XHJcbiAgICAgICAgaWYgKGNvbmZpZy5wZXJzaXN0ZW50KSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGxzUXVldWUgPSBMb2NhbFN0b3JhZ2VRdWV1ZS5jcmVhdGUoY29uZmlnLmlkLCBjb25maWcubmFtZSwgY29uZmlnLnJlc2V0KTtcclxuICAgICAgICAgICAgaWYgKGxzUXVldWUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2xvZ2dlci5sb2coYENyZWF0ZWQgTG9jYWwgU3RvcmFnZSBxdWV1ZSBmb3IgaWQgJHtjb25maWcuaWR9YCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbHNRdWV1ZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIEluZGV4ZWREQlF1ZXVlLmNyZWF0ZShjb25maWcuaWQsIGNvbmZpZy5uYW1lLCBjb25maWcucmVzZXQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKChxdWV1ZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9sb2dnZXIubG9nKGBDcmVhdGVkIHBlcnNpc3RlbnQgcXVldWUgZm9yIGlkICR7Y29uZmlnLmlkfWApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcXVldWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5jYXRjaCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2xvZ2dlci5sb2coYERvd25ncmFkZWQgdG8gbWVtb3J5IHF1ZXVlIGZvciBpZCAke2NvbmZpZy5pZH0uYCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgTWVtb3J5UXVldWUoY29uZmlnLmlkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9sb2dnZXIubG9nKGBDcmVhdGVkIG1lbW9yeSBxdWV1ZSBmb3IgaWQgJHtjb25maWcuaWR9YCk7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBNZW1vcnlRdWV1ZShjb25maWcuaWQpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZW5kcG9pbnQoY29uZmlnOiBJRW5kcG9pbnRDb25maWcpOiBJRW5kcG9pbnQge1xyXG4gICAgICAgIGNvbnN0IGNvbmZpZ3VyYXRpb24gPSBjb25maWcgYXMgYW55O1xyXG5cclxuICAgICAgICBpZiAoY29uZmlnLnR5cGUgIT09ICdmZS1hbmFseXRpYy1jb2xsZWN0b3InKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2xvZ2dlci5lcnJvcihgRW5kcG9pbnQgdHlwZSAnJHtjb25maWcudHlwZX0nIGlzIG5vdCBzdXBwb3J0ZWRgKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBuZXcgRkVBbmFseXRpY3NDb2xsZWN0b3JFbmRwb2ludCh0aGlzLmFqYXgoKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3IFRpbWVTdGFtcFByb3ZpZGVyKCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2xvZ2dlcixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uZmlndXJhdGlvbiBhcyBJRkVBbmFseXRpY3NDb2xsZWN0b3JDb25maWd1cmF0aW9uLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9lbnZpcm9ubWVudCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBhamF4KCk6IElBamF4UHJvdmlkZXIge1xyXG4gICAgICAgIGlmICh0aGlzLl9lbnZpcm9ubWVudC5mYWtlTW9kZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFBvcnRBamF4UHJvdmlkZXIodGhpcy5fY29udGV4dCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBuZXcgQWpheCgpO1xyXG4gICAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy9pZmRlZi1sb2FkZXIvaWZkZWYtbG9hZGVyLmpzP0RFQlVHPXRydWUmUEVSRk9STUFOQ0VfQVVESVQ9dHJ1ZSEuL3NyYy9wcm9jZXNzaW5nL2J1aWxkZXJzL2J1cy1idWlsZGVyLnRzIiwiZXhwb3J0ICogZnJvbSAnLi9tZW1vcnktcXVldWUnO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvaWZkZWYtbG9hZGVyL2lmZGVmLWxvYWRlci5qcz9ERUJVRz10cnVlJlBFUkZPUk1BTkNFX0FVRElUPXRydWUhLi9zcmMvcXVldWVzL21lbW9yeS9pbmRleC50cyIsImltcG9ydCB7IElFbnZlbG9wIH0gZnJvbSAnLi4vLi4vcHJvY2Vzc2luZy9lbnZlbG9wJztcclxuaW1wb3J0IHsgSVF1ZXVlIH0gZnJvbSAnLi4vcXVldWUnO1xyXG5cclxuLyoqXHJcbiAqIEltcGxlbWVudGF0aW9uIG9mIHF1ZXVlIGZvciBzdG9yaW5nIGl0ZW1zIGluIGEgbWVtb3J5XHJcbiAqXHJcbiAqIEBpbnRlcm5hbFxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIE1lbW9yeVF1ZXVlIGltcGxlbWVudHMgSVF1ZXVlIHtcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgX2FycmF5OiBBcnJheTxJRW52ZWxvcD4gPSBbXTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgaWQ6IHN0cmluZ1xyXG4gICAgKSB7IH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGNvdW50KCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2FycmF5Lmxlbmd0aDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZW5xdWV1ZShpdGVtczogQXJyYXk8SUVudmVsb3A+KTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fYXJyYXkucHVzaCguLi5pdGVtcyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFzeW5jIGNsZWFyKCk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgIHRoaXMuX2FycmF5Lmxlbmd0aCA9IDA7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGRlcXVldWUoY291bnQ6IG51bWJlcik6IEFycmF5PElFbnZlbG9wPiB7XHJcbiAgICAgICAgY29uc3QgbGVuZ3RoID0gdGhpcy5fYXJyYXkubGVuZ3RoO1xyXG5cclxuICAgICAgICBjb3VudCA9IE1hdGgubWluKGxlbmd0aCwgTWF0aC5tYXgoY291bnQsIDApKTtcclxuXHJcbiAgICAgICAgaWYgKGNvdW50IDw9IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIFtdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2FycmF5LnNwbGljZSgwLCBjb3VudCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFzeW5jIGRlc3Ryb3koKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgdGhpcy5jbGVhcigpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBkaXNwb3NlKCk6IHZvaWQgeyAvKiovIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvaWZkZWYtbG9hZGVyL2lmZGVmLWxvYWRlci5qcz9ERUJVRz10cnVlJlBFUkZPUk1BTkNFX0FVRElUPXRydWUhLi9zcmMvcXVldWVzL21lbW9yeS9tZW1vcnktcXVldWUudHMiLCJpbXBvcnQgeyBvdmVycmlkZSB9IGZyb20gJy4uL2ZyYW1ld29yay91dGlscyc7XHJcbmltcG9ydCB7IElFbnZlbG9wIH0gZnJvbSAnLi4vcHJvY2Vzc2luZy9lbnZlbG9wJztcclxuaW1wb3J0IHsgSVNhbXBsZWRRdWV1ZSB9IGZyb20gJy4vaW5kZXgnO1xyXG5pbXBvcnQgeyBJUXVldWUgfSBmcm9tICcuL3F1ZXVlJztcclxuXHJcbi8qKlxyXG4gKlxyXG4gKlxyXG4gKiBAaW50ZXJmYWNlIElTYW1wbGVkUXVldWVDb25maWd1cmF0aW9uXHJcbiAqL1xyXG5leHBvcnQgaW50ZXJmYWNlIElTYW1wbGVkUXVldWVDb25maWd1cmF0aW9uIHtcclxuICAgIG1heE1lc3NhZ2VDb3VudD86IG51bWJlcjtcclxufVxyXG5cclxuY2xhc3MgU2FtcGxlZFF1ZXVlQ29uZmlndXJhdGlvbiBpbXBsZW1lbnRzIElTYW1wbGVkUXVldWVDb25maWd1cmF0aW9uIHtcclxuICAgIHB1YmxpYyBtYXhNZXNzYWdlQ291bnQ6IG51bWJlciA9IDE1MDAwO1xyXG59XHJcblxyXG4vKipcclxuICogUXVldWUgZGVjb3JhdG9yIGZvciBwcm92aWRpbmcgc2FtcGxpbmcgb2YgbWVzc2FnZXNcclxuICpcclxuICogQGludGVybmFsXHJcbiAqIEBjbGFzcyBTYW1wbGVkUXVldWVcclxuICogQGltcGxlbWVudHMge0lRdWV1ZTxUSXRlbT59XHJcbiAqIEB0ZW1wbGF0ZSBUSXRlbVxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFNhbXBsZWRRdWV1ZSBpbXBsZW1lbnRzIElTYW1wbGVkUXVldWUge1xyXG4gICAgcHVibGljIGNvbmZpZzogU2FtcGxlZFF1ZXVlQ29uZmlndXJhdGlvbiA9IG5ldyBTYW1wbGVkUXVldWVDb25maWd1cmF0aW9uKCk7XHJcblxyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IHF1ZXVlOiBJUXVldWUsXHJcbiAgICAgICAgY29uZmlnOiBJU2FtcGxlZFF1ZXVlQ29uZmlndXJhdGlvbiB8IG51bGwgPSBudWxsXHJcbiAgICApIHtcclxuICAgICAgICBvdmVycmlkZSh0aGlzLmNvbmZpZywgY29uZmlnKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGlkKCk6IHN0cmluZyB7IHJldHVybiB0aGlzLnF1ZXVlLmlkOyB9XHJcblxyXG4gICAgcHVibGljIGdldCBjb3VudCgpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5xdWV1ZS5jb3VudDsgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgc2l6ZSgpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5jb25maWcubWF4TWVzc2FnZUNvdW50OyB9XHJcblxyXG4gICAgcHVibGljIGVucXVldWUobWVzc2FnZXM6IElFbnZlbG9wW10pOiB2b2lkIHwgUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgY29uc3QgZnJlZUNvdW50ID0gdGhpcy5zaXplIC0gdGhpcy5xdWV1ZS5jb3VudDtcclxuXHJcbiAgICAgICAgaWYgKGZyZWVDb3VudCA8PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChmcmVlQ291bnQgPCBtZXNzYWdlcy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgbWVzc2FnZXMgPSBtZXNzYWdlcy5zbGljZSgwLCBmcmVlQ291bnQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMucXVldWUuZW5xdWV1ZShtZXNzYWdlcyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGRlcXVldWUoY291bnQ6IG51bWJlciwgYXZvaWRDb25jdXJyZW5jeT86IGJvb2xlYW4pOiBBcnJheTxJRW52ZWxvcD4gfCBQcm9taXNlPEFycmF5PElFbnZlbG9wPj4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnF1ZXVlLmRlcXVldWUoY291bnQsIGF2b2lkQ29uY3VycmVuY3kpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBkZXN0cm95KCk6IHZvaWQgfCBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5xdWV1ZS5kZXN0cm95KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGRpc3Bvc2UoKTogdm9pZCB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucXVldWUuZGlzcG9zZSgpO1xyXG4gICAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy9pZmRlZi1sb2FkZXIvaWZkZWYtbG9hZGVyLmpzP0RFQlVHPXRydWUmUEVSRk9STUFOQ0VfQVVESVQ9dHJ1ZSEuL3NyYy9xdWV1ZXMvc2FtcGxlZC1xdWV1ZS50cyIsImltcG9ydCB7IEluZGV4ZWREYlV0aWxzIH0gZnJvbSAnLi4vLi4vZnJhbWV3b3JrL2luZGV4ZWRkYi11dGlscyc7XHJcbmltcG9ydCB7IElFbnZlbG9wIH0gZnJvbSAnLi4vLi4vcHJvY2Vzc2luZy9lbnZlbG9wJztcclxuaW1wb3J0IHsgSVF1ZXVlIH0gZnJvbSAnLi4vcXVldWUnO1xyXG5cclxuLyoqXHJcbiAqIEltcGxlbWVudGF0aW9uIG9mIHF1ZXVlIGZvciBzdG9yaW5nIGl0ZW1zIGluIGEgbWVtb3J5XHJcbiAqXHJcbiAqIEBpbnRlcm5hbFxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIEluZGV4ZWREQlF1ZXVlIGltcGxlbWVudHMgSVF1ZXVlIHtcclxuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgc3RvcmFnZU5hbWUgPSAnbWVzc2FnZXMnO1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgYXN5bmMgY3JlYXRlKGlkOiBzdHJpbmcsIG5hbWU/OiBzdHJpbmcsIGNsZWFyPzogYm9vbGVhbik6IFByb21pc2U8SW5kZXhlZERCUXVldWU+IHtcclxuICAgICAgICBjb25zdCBkYk5hbWUgPSAnbWNqczonICsgKG5hbWUgfHwgaWQpO1xyXG5cclxuICAgICAgICBjb25zdCBkYXRhYmFzZSA9IGF3YWl0IEluZGV4ZWREYlV0aWxzLm9wZW4oZGJOYW1lLCAxLCAoZGIpID0+IHtcclxuICAgICAgICAgICAgaWYgKCFkYi5vYmplY3RTdG9yZU5hbWVzLmNvbnRhaW5zKEluZGV4ZWREQlF1ZXVlLnN0b3JhZ2VOYW1lKSkge1xyXG4gICAgICAgICAgICAgICAgZGIuY3JlYXRlT2JqZWN0U3RvcmUoSW5kZXhlZERCUXVldWUuc3RvcmFnZU5hbWUsIHsgYXV0b0luY3JlbWVudDogdHJ1ZSB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBjb25zdCBxdWV1ZSA9IG5ldyBJbmRleGVkREJRdWV1ZShpZCwgZGF0YWJhc2UpO1xyXG5cclxuICAgICAgICBpZiAoY2xlYXIpIHtcclxuICAgICAgICAgICAgYXdhaXQgcXVldWUuY2xlYXIoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBxdWV1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9sYXN0Q291bnQ6IG51bWJlciA9IDA7XHJcblxyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IGlkOiBzdHJpbmcsXHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBfZGI6IElEQkRhdGFiYXNlXHJcbiAgICApIHsgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgY291bnQoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbGFzdENvdW50O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBlbnF1ZXVlKGl0ZW1zOiBBcnJheTxJRW52ZWxvcD4pOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy50cmFuc2FjdGlvbigoc3RvcmFnZSkgPT4ge1xyXG4gICAgICAgICAgICBJbmRleGVkRGJVdGlscy5hZGRBcnJheShzdG9yYWdlLCBpdGVtcywgKCkgPT4gdGhpcy51cGRhdGVDb3VudChzdG9yYWdlKSk7XHJcbiAgICAgICAgfSwgdW5kZWZpbmVkKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZGVxdWV1ZShjb3VudDogbnVtYmVyKTogUHJvbWlzZTxBcnJheTxJRW52ZWxvcD4+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy50cmFuc2FjdGlvbigoc3RvcmFnZSwgcmVzdWx0KSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBjb3VudGVyID0gMDtcclxuXHJcbiAgICAgICAgICAgIEluZGV4ZWREYlV0aWxzLnJlcXVlc3Q8SURCQ3Vyc29yV2l0aFZhbHVlPihzdG9yYWdlLm9wZW5DdXJzb3IoKSwgKGN1cnNvcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGN1cnNvciAmJiAoY291bnRlciA8IGNvdW50KSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKGN1cnNvci52YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgY3Vyc29yLmRlbGV0ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvdW50ZXIrKztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY3Vyc29yLmNvbnRpbnVlKCk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlQ291bnQoc3RvcmFnZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sIG5ldyBBcnJheTxJRW52ZWxvcD4oKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGRlc3Ryb3koKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgdGhpcy5kaXNwb3NlKCk7XHJcbiAgICAgICAgcmV0dXJuIEluZGV4ZWREYlV0aWxzLnJlbW92ZSh0aGlzLl9kYi5uYW1lKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZGlzcG9zZSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9kYi5jbG9zZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbGVhcigpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy50cmFuc2FjdGlvbigoc3RvcmFnZSkgPT4ge1xyXG4gICAgICAgICAgICBzdG9yYWdlLmNsZWFyKCk7XHJcbiAgICAgICAgfSwgdW5kZWZpbmVkKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHVwZGF0ZUNvdW50KHN0b3JhZ2U6IElEQk9iamVjdFN0b3JlKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgY291bnRSZXF1ZXN0ID0gc3RvcmFnZS5jb3VudCgpO1xyXG4gICAgICAgIGNvdW50UmVxdWVzdC5vbnN1Y2Nlc3MgPSAoZSkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLl9sYXN0Q291bnQgPSArKGUudGFyZ2V0IGFzIGFueSkucmVzdWx0O1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvcGVuKG1vZGU6IElEQlRyYW5zYWN0aW9uTW9kZSA9ICdyZWFkd3JpdGUnKTogSURCT2JqZWN0U3RvcmUge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9kYi50cmFuc2FjdGlvbihbSW5kZXhlZERCUXVldWUuc3RvcmFnZU5hbWVdLCBtb2RlKS5vYmplY3RTdG9yZShJbmRleGVkREJRdWV1ZS5zdG9yYWdlTmFtZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB0cmFuc2FjdGlvbjxUPihhY3Rpb246IChzdG9yYWdlOiBJREJPYmplY3RTdG9yZSwgcmVzdWx0OiBUKSA9PiB2b2lkLCByZXN1bHQ6IFQpOiBQcm9taXNlPFQ+IHtcclxuICAgICAgICByZXR1cm4gSW5kZXhlZERiVXRpbHMudHJhbnNhY3Rpb24oKCkgPT4gdGhpcy5vcGVuKCksIGFjdGlvbiwgcmVzdWx0KTtcclxuICAgIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvaWZkZWYtbG9hZGVyL2lmZGVmLWxvYWRlci5qcz9ERUJVRz10cnVlJlBFUkZPUk1BTkNFX0FVRElUPXRydWUhLi9zcmMvcXVldWVzL2luZGV4ZWRkYi9pbmRleGVkZGItcXVldWUudHMiLCJleHBvcnQgYWJzdHJhY3QgY2xhc3MgSW5kZXhlZERCUHJvdmlkZXIge1xyXG4gICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0SW5kZXhlZERCKCk6IElEQkZhY3RvcnkgfCB1bmRlZmluZWQge1xyXG4gICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xyXG4gICAgICAgIGlmICh0eXBlb2YgaW5kZXhlZERCICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgICByZXR1cm4gaW5kZXhlZERCO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cclxuICAgICAgICBpZiAodHlwZW9mIG1vekluZGV4ZWREQiAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG1vekluZGV4ZWREQjtcclxuICAgICAgICB9XHJcbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXHJcbiAgICAgICAgaWYgKHR5cGVvZiB3ZWJraXRJbmRleGVkREIgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB3ZWJraXRJbmRleGVkREI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xyXG4gICAgICAgIGlmICh0eXBlb2YgbXNJbmRleGVkREIgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBtc0luZGV4ZWREQjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBpc1N1cHBvcnRlZCgpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gISFJbmRleGVkREJQcm92aWRlci5nZXRJbmRleGVkREIoKTtcclxuICAgIH1cclxufVxyXG5cclxuZGVjbGFyZSBjb25zdCBtb3pJbmRleGVkREI6IElEQkZhY3Rvcnk7XHJcbmRlY2xhcmUgY29uc3Qgd2Via2l0SW5kZXhlZERCOiBJREJGYWN0b3J5O1xyXG5kZWNsYXJlIGNvbnN0IG1zSW5kZXhlZERCOiBJREJGYWN0b3J5O1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvaWZkZWYtbG9hZGVyL2lmZGVmLWxvYWRlci5qcz9ERUJVRz10cnVlJlBFUkZPUk1BTkNFX0FVRElUPXRydWUhLi9zcmMvZnJhbWV3b3JrL2luZGV4ZWRkYi1wcm92aWRlci50cyIsImltcG9ydCB7IFdlYlN0b3JhZ2VzIH0gZnJvbSAnLi4vLi4vZnJhbWV3b3JrL3dlYnN0b3JhZ2UnO1xyXG5pbXBvcnQgeyBJRW52ZWxvcCB9IGZyb20gJy4uLy4uL3Byb2Nlc3NpbmcvZW52ZWxvcCc7XHJcbmltcG9ydCB7IE1lbW9yeVF1ZXVlIH0gZnJvbSAnLi4vaW5kZXgnO1xyXG5pbXBvcnQgeyBJUXVldWUgfSBmcm9tICcuLi9xdWV1ZSc7XHJcbmltcG9ydCB7IElLZXlWYWx1ZVN0b3JhZ2UsIExvY2FsU3RvcmFnZUtleVZhbHVlIH0gZnJvbSAnLi9sb2NhbC1zdG9yYWdlLWtleS12YWx1ZSc7XHJcbmltcG9ydCB7IExvY2FsU3RvcmFnZUtleVZhbHVlQ2FjaGUgfSBmcm9tICcuL2xvY2FsLXN0b3JhZ2Uta2V5LXZhbHVlLWNhY2hlJztcclxuXHJcbi8qKlxyXG4gKiBJbXBsZW1lbnRhdGlvbiBvZiBxdWV1ZSBmb3Igc3RvcmluZyBpdGVtcyBpbiBhIExvY2FsU3RvcmFnZVxyXG4gKlxyXG4gKiBAaW50ZXJuYWxcclxuICovXHJcbmV4cG9ydCBjbGFzcyBMb2NhbFN0b3JhZ2VRdWV1ZSBpbXBsZW1lbnRzIElRdWV1ZSB7XHJcbiAgICBwdWJsaWMgc3RhdGljIGNyZWF0ZShpZDogc3RyaW5nLCBuYW1lPzogc3RyaW5nLCBjbGVhcjogYm9vbGVhbiA9IGZhbHNlKTogTG9jYWxTdG9yYWdlUXVldWUgfCBudWxsIHtcclxuICAgICAgICBjb25zdCBsb2NhbFN0b3JhZ2UgPSBXZWJTdG9yYWdlcy5sb2NhbFN0b3JhZ2U7XHJcbiAgICAgICAgaWYgKCFsb2NhbFN0b3JhZ2UpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBzdG9yYWdlID0gbmV3IExvY2FsU3RvcmFnZUtleVZhbHVlKChuYW1lIHx8IGlkKSArICcnLCBsb2NhbFN0b3JhZ2UpO1xyXG4gICAgICAgIGNvbnN0IGNhY2hlID0gbmV3IExvY2FsU3RvcmFnZUtleVZhbHVlQ2FjaGUoc3RvcmFnZSk7XHJcblxyXG4gICAgICAgIGlmIChjbGVhcikge1xyXG4gICAgICAgICAgICBzdG9yYWdlLmNsZWFyKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gbmV3IExvY2FsU3RvcmFnZVF1ZXVlKGlkLCBjYWNoZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfbWVtb3J5OiBNZW1vcnlRdWV1ZTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgaWQ6IHN0cmluZyxcclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IF9zdG9yYWdlOiBJS2V5VmFsdWVTdG9yYWdlXHJcbiAgICApIHtcclxuICAgICAgICB0aGlzLl9tZW1vcnkgPSBuZXcgTWVtb3J5UXVldWUoaWQpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgY291bnQoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbWVtb3J5LmNvdW50ICsgdGhpcy5fc3RvcmFnZS5sZW5ndGgoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZW5xdWV1ZShpdGVtczogQXJyYXk8SUVudmVsb3A+KTogdm9pZCB7XHJcbiAgICAgICAgZm9yIChjb25zdCBpdGVtIG9mIGl0ZW1zKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGtleSA9IGl0ZW0uaWQ7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5fc3RvcmFnZS5zZXRJdGVtKGtleSwgaXRlbSkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX21lbW9yeS5lbnF1ZXVlKFtpdGVtXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsZWFyKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX3N0b3JhZ2UuY2xlYXIoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZGVxdWV1ZShjb3VudDogbnVtYmVyLCBhdm9pZENvbmN1cnJlbmN5OiBib29sZWFuKTogQXJyYXk8SUVudmVsb3A+IHtcclxuICAgICAgICBjb25zdCByZXN1bHQgPSB0aGlzLl9tZW1vcnkuZGVxdWV1ZShjb3VudCk7XHJcblxyXG4gICAgICAgIGlmIChyZXN1bHQubGVuZ3RoID49IGNvdW50KSB7XHJcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY291bnQgPSBjb3VudCAtIHJlc3VsdC5sZW5ndGg7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIWF2b2lkQ29uY3VycmVuY3kpIHtcclxuICAgICAgICAgICAgY29uc3Qgc3RvcmFnZSA9IHRoaXMuX3N0b3JhZ2U7XHJcbiAgICAgICAgICAgIGNvbnN0IGRlcXVldWVkS2V5cyA9IG5ldyBBcnJheTxzdHJpbmc+KCk7XHJcbiAgICAgICAgICAgIGxldCBjb3VudGVyID0gMDtcclxuICAgICAgICAgICAgZm9yIChjb25zdCBpdGVtIG9mIHN0b3JhZ2UuZW51bWVyYXRlKCkpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gaXRlbS52YWx1ZSBhcyBJRW52ZWxvcDtcclxuICAgICAgICAgICAgICAgIGlmICh2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKHZhbHVlKTtcclxuICAgICAgICAgICAgICAgICAgICBkZXF1ZXVlZEtleXMucHVzaChpdGVtLmtleSk7XHJcbiAgICAgICAgICAgICAgICAgICAgY291bnRlcisrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGNvdW50ZXIgPj0gY291bnQpIHtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmb3IgKGNvbnN0IGtleSBvZiBkZXF1ZXVlZEtleXMpIHtcclxuICAgICAgICAgICAgICAgIHN0b3JhZ2UucmVtb3ZlSXRlbShrZXkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBkZXN0cm95KCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuZGlzcG9zZSgpO1xyXG4gICAgICAgIHRoaXMuY2xlYXIoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZGlzcG9zZSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9tZW1vcnkuZGlzcG9zZSgpO1xyXG4gICAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy9pZmRlZi1sb2FkZXIvaWZkZWYtbG9hZGVyLmpzP0RFQlVHPXRydWUmUEVSRk9STUFOQ0VfQVVESVQ9dHJ1ZSEuL3NyYy9xdWV1ZXMvbG9jYWwtc3RvcmFnZS9sb2NhbC1zdG9yYWdlLXF1ZXVlLnRzIiwiaW1wb3J0IHsgU3RvcmFnZUtleSB9IGZyb20gJy4vc3RvcmFnZS1rZXknO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJS2V5VmFsdWVTdG9yYWdlIHtcclxuICAgIGxlbmd0aCgpOiBudW1iZXI7XHJcblxyXG4gICAgY2xlYXIoKTogdm9pZDtcclxuXHJcbiAgICBoYXMoa2V5OiBzdHJpbmcpOiBib29sZWFuO1xyXG5cclxuICAgIGdldEl0ZW0oa2V5OiBzdHJpbmcpOiBvYmplY3QgfCBudWxsO1xyXG5cclxuICAgIHJlbW92ZUl0ZW0oa2V5OiBzdHJpbmcpOiB2b2lkO1xyXG5cclxuICAgIHNldEl0ZW0oa2V5OiBzdHJpbmcsIGRhdGE6IG9iamVjdCk6IGJvb2xlYW47XHJcblxyXG4gICAgZW51bWVyYXRlKCk6IEl0ZXJhYmxlSXRlcmF0b3I8SVN0b3JhZ2VJdGVtPjtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJU3RvcmFnZUl0ZW0ge1xyXG4gICAgcmVhZG9ubHkga2V5OiBzdHJpbmc7XHJcblxyXG4gICAgcmVhZG9ubHkgdmFsdWU6IG9iamVjdCB8IG51bGw7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBLZXktVmFsdWUgc3RvcmFnZSBiYXNlZCBvbiBTdG9yYWdlIGFuZCBpbXBsZW1lbnRlZCBsb3cgbGV2ZWwgb3BlcmF0aW9uc1xyXG4gKi9cclxuZXhwb3J0IGNsYXNzIExvY2FsU3RvcmFnZUtleVZhbHVlIGltcGxlbWVudHMgSUtleVZhbHVlU3RvcmFnZSB7XHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgcXVldWVJZDogc3RyaW5nLFxyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgX3N0b3JhZ2U6IFN0b3JhZ2VcclxuICAgICkgeyB9XHJcblxyXG4gICAgcHVibGljIGxlbmd0aCgpOiBudW1iZXIge1xyXG4gICAgICAgIGxldCBjb3VudGVyID0gMDtcclxuICAgICAgICBjb25zdCBrZXlzID0gdGhpcy5rZXlzKCk7XHJcbiAgICAgICAgd2hpbGUgKCFrZXlzLm5leHQoKS5kb25lKSB7XHJcbiAgICAgICAgICAgIGNvdW50ZXIrKztcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGNvdW50ZXI7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsZWFyKCk6IHZvaWQge1xyXG4gICAgICAgIGZvciAoY29uc3Qga2V5IG9mIHRoaXMua2V5cygpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3N0b3JhZ2UucmVtb3ZlSXRlbShrZXkudmFsdWUoKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBoYXMoa2V5OiBzdHJpbmcpOiBib29sZWFuIHtcclxuICAgICAgICBjb25zdCBzS2V5ID0gbmV3IFN0b3JhZ2VLZXkodGhpcy5xdWV1ZUlkLCBrZXkpLnZhbHVlKCk7XHJcbiAgICAgICAgcmV0dXJuICEhdGhpcy5fc3RvcmFnZS5nZXRJdGVtKHNLZXkpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRJdGVtKGtleTogc3RyaW5nKTogb2JqZWN0IHwgbnVsbCB7XHJcbiAgICAgICAgY29uc3Qgc0tleSA9IG5ldyBTdG9yYWdlS2V5KHRoaXMucXVldWVJZCwga2V5KS52YWx1ZSgpO1xyXG4gICAgICAgIGNvbnN0IHZhbHVlID0gdGhpcy5fc3RvcmFnZS5nZXRJdGVtKHNLZXkpO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy50b09iamVjdCh2YWx1ZSwgc0tleSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlbW92ZUl0ZW0oa2V5OiBzdHJpbmcpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBzS2V5ID0gbmV3IFN0b3JhZ2VLZXkodGhpcy5xdWV1ZUlkLCBrZXkpLnZhbHVlKCk7XHJcbiAgICAgICAgdGhpcy5fc3RvcmFnZS5yZW1vdmVJdGVtKHNLZXkpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXRJdGVtKGtleTogc3RyaW5nLCBkYXRhOiBvYmplY3QpOiBib29sZWFuIHtcclxuICAgICAgICBjb25zdCBzS2V5ID0gbmV3IFN0b3JhZ2VLZXkodGhpcy5xdWV1ZUlkLCBrZXkpLnZhbHVlKCk7XHJcbiAgICAgICAgY29uc3QgdmFsdWUgPSBKU09OLnN0cmluZ2lmeShkYXRhKTtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICB0aGlzLl9zdG9yYWdlLnNldEl0ZW0oc0tleSwgdmFsdWUpO1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9IGNhdGNoIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMqIGVudW1lcmF0ZSgpOiBJdGVyYWJsZUl0ZXJhdG9yPElTdG9yYWdlSXRlbT4ge1xyXG4gICAgICAgIGZvciAoY29uc3Qga2V5IG9mIHRoaXMua2V5cygpKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHNLZXkgPSBrZXkudmFsdWUoKTtcclxuICAgICAgICAgICAgY29uc3QgdmFsdWUgPSB0aGlzLnRvT2JqZWN0KHRoaXMuX3N0b3JhZ2UuZ2V0SXRlbShzS2V5KSwgc0tleSk7XHJcbiAgICAgICAgICAgIGlmICh2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgeWllbGQgeyB2YWx1ZSwga2V5OiBrZXkua2V5IH07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB0b09iamVjdCh2YWx1ZTogc3RyaW5nIHwgbnVsbCwgc0tleTogc3RyaW5nKTogb2JqZWN0IHwgbnVsbCB7XHJcbiAgICAgICAgaWYgKCF2YWx1ZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIHJldHVybiBKU09OLnBhcnNlKHZhbHVlKTtcclxuICAgICAgICB9IGNhdGNoIHtcclxuICAgICAgICAgICAgdGhpcy5fc3RvcmFnZS5yZW1vdmVJdGVtKHNLZXkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlKiBrZXlzKCk6IEl0ZXJhYmxlSXRlcmF0b3I8U3RvcmFnZUtleT4ge1xyXG4gICAgICAgIGNvbnN0IHN0b3JhZ2UgPSB0aGlzLl9zdG9yYWdlO1xyXG5cclxuICAgICAgICBjb25zdCBtYXAgPSBuZXcgTWFwPHN0cmluZywgYW55PigpO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gc3RvcmFnZS5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xyXG4gICAgICAgICAgICBpZiAoaSA+PSBzdG9yYWdlLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgaSA9IHN0b3JhZ2UubGVuZ3RoIC0gMTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb25zdCBrZXkgPSBzdG9yYWdlLmtleShpKTtcclxuICAgICAgICAgICAgaWYgKGtleSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgc0tleSA9IFN0b3JhZ2VLZXkucGFyc2Uoa2V5KTtcclxuICAgICAgICAgICAgICAgIGlmIChzS2V5ICYmIHNLZXkucXVldWUgPT09IHRoaXMucXVldWVJZCAmJiAhbWFwLmhhcyhrZXkpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbWFwLnNldChrZXksIHVuZGVmaW5lZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgeWllbGQgc0tleTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbWFwLmNsZWFyKCk7XHJcbiAgICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL2lmZGVmLWxvYWRlci9pZmRlZi1sb2FkZXIuanM/REVCVUc9dHJ1ZSZQRVJGT1JNQU5DRV9BVURJVD10cnVlIS4vc3JjL3F1ZXVlcy9sb2NhbC1zdG9yYWdlL2xvY2FsLXN0b3JhZ2Uta2V5LXZhbHVlLnRzIiwiZXhwb3J0IGNsYXNzIFN0b3JhZ2VLZXkge1xyXG4gICAgcHVibGljIHN0YXRpYyBwYXJzZSh2YWx1ZTogc3RyaW5nKTogU3RvcmFnZUtleSB8IG51bGwge1xyXG4gICAgICAgIGlmICh2YWx1ZSAmJiAodmFsdWUuaW5kZXhPZihTdG9yYWdlS2V5LnByZWZpeCwgMCkgPT09IDApKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHF1ZXVlTWF0aCA9IFN0b3JhZ2VLZXkucmVnZXgucXVldWUuZXhlYyh2YWx1ZSk7XHJcbiAgICAgICAgICAgIGNvbnN0IGtleU1hdGggPSBTdG9yYWdlS2V5LnJlZ2V4LmtleS5leGVjKHZhbHVlKTtcclxuICAgICAgICAgICAgaWYgKHF1ZXVlTWF0aCAmJiBrZXlNYXRoKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBzS2V5ID0gbmV3IFN0b3JhZ2VLZXkocXVldWVNYXRoWzFdLCBrZXlNYXRoWzFdKTtcclxuICAgICAgICAgICAgICAgIHNLZXkuX2tleSA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHNLZXk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgcHJlZml4ID0gJ21janMnO1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgcmVnZXggPSB7XHJcbiAgICAgICAgcXVldWU6IC9xPShbXFx3LV0rKS8sXHJcbiAgICAgICAga2V5OiAvaz0oW1xcdy1dKykvXHJcbiAgICB9O1xyXG5cclxuICAgIHByaXZhdGUgX2tleTogc3RyaW5nO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBxdWV1ZTogc3RyaW5nLFxyXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBrZXk6IHN0cmluZ1xyXG4gICAgKSB7IH1cclxuXHJcbiAgICBwdWJsaWMgdmFsdWUoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fa2V5IHx8ICh0aGlzLl9rZXkgPSBgJHtTdG9yYWdlS2V5LnByZWZpeH0/cT0ke2VuY29kZVVSSUNvbXBvbmVudCh0aGlzLnF1ZXVlKX0maz0ke2VuY29kZVVSSUNvbXBvbmVudCh0aGlzLmtleSl9YCk7XHJcbiAgICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL2lmZGVmLWxvYWRlci9pZmRlZi1sb2FkZXIuanM/REVCVUc9dHJ1ZSZQRVJGT1JNQU5DRV9BVURJVD10cnVlIS4vc3JjL3F1ZXVlcy9sb2NhbC1zdG9yYWdlL3N0b3JhZ2Uta2V5LnRzIiwiaW1wb3J0IHsgSUtleVZhbHVlU3RvcmFnZSwgSVN0b3JhZ2VJdGVtIH0gZnJvbSAnLi9sb2NhbC1zdG9yYWdlLWtleS12YWx1ZSc7XHJcblxyXG5leHBvcnQgY2xhc3MgTG9jYWxTdG9yYWdlS2V5VmFsdWVDYWNoZSBpbXBsZW1lbnRzIElLZXlWYWx1ZVN0b3JhZ2Uge1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfY2FjaGUgPSBuZXcgTWFwPHN0cmluZywgb2JqZWN0IHwgbnVsbCB8IHVuZGVmaW5lZD4oKTtcclxuICAgIHByaXZhdGUgX2xlbmd0aCA9IDA7XHJcbiAgICBwcml2YXRlIF91cGRhdGVMZW5ndGggPSB0cnVlO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgX3N0b3JhZ2U6IElLZXlWYWx1ZVN0b3JhZ2VcclxuICAgICkgeyB9XHJcblxyXG4gICAgcHVibGljIGxlbmd0aCgpOiBudW1iZXIge1xyXG4gICAgICAgIGlmICh0aGlzLl91cGRhdGVMZW5ndGgpIHtcclxuICAgICAgICAgICAgdGhpcy5fbGVuZ3RoID0gdGhpcy5fc3RvcmFnZS5sZW5ndGgoKTtcclxuICAgICAgICAgICAgdGhpcy5fdXBkYXRlTGVuZ3RoID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLl9sZW5ndGg7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsZWFyKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX3N0b3JhZ2UuY2xlYXIoKTtcclxuICAgICAgICB0aGlzLl9jYWNoZS5jbGVhcigpO1xyXG4gICAgICAgIHRoaXMuX3VwZGF0ZUxlbmd0aCA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGhhcyhrZXk6IHN0cmluZyk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9zdG9yYWdlLmhhcyhrZXkpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRJdGVtKGtleTogc3RyaW5nKTogb2JqZWN0IHwgbnVsbCB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9zdG9yYWdlLmhhcyhrZXkpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2NhY2hlLmRlbGV0ZShrZXkpO1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCB2YWx1ZSA9IHRoaXMuX2NhY2hlLmdldChrZXkpO1xyXG4gICAgICAgIGlmICghdmFsdWUpIHtcclxuICAgICAgICAgICAgdmFsdWUgPSB0aGlzLl9zdG9yYWdlLmdldEl0ZW0oa2V5KTtcclxuICAgICAgICAgICAgdGhpcy5fY2FjaGUuc2V0KGtleSwgdmFsdWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlbW92ZUl0ZW0oa2V5OiBzdHJpbmcpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9zdG9yYWdlLnJlbW92ZUl0ZW0oa2V5KTtcclxuICAgICAgICB0aGlzLl9jYWNoZS5kZWxldGUoa2V5KTtcclxuICAgICAgICB0aGlzLl9sZW5ndGgtLTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0SXRlbShrZXk6IHN0cmluZywgZGF0YTogb2JqZWN0KTogYm9vbGVhbiB7XHJcbiAgICAgICAgY29uc3Qgc3VjY2VzcyA9IHRoaXMuX3N0b3JhZ2Uuc2V0SXRlbShrZXksIGRhdGEpO1xyXG4gICAgICAgIGlmIChzdWNjZXNzKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2NhY2hlLnNldChrZXksIGRhdGEpO1xyXG4gICAgICAgICAgICB0aGlzLl91cGRhdGVMZW5ndGggPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gc3VjY2VzcztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMqIGVudW1lcmF0ZSgpOiBJdGVyYWJsZUl0ZXJhdG9yPElTdG9yYWdlSXRlbT4ge1xyXG4gICAgICAgIGZvciAoY29uc3Qga2V5IG9mIHRoaXMuX2NhY2hlLmtleXMoKSkge1xyXG4gICAgICAgICAgICBjb25zdCB2YWx1ZSA9IHRoaXMuZ2V0SXRlbShrZXkpO1xyXG4gICAgICAgICAgICBpZiAodmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIHlpZWxkIHtcclxuICAgICAgICAgICAgICAgICAgICBrZXksXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWVcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZvciAoY29uc3QgaXRlbSBvZiB0aGlzLl9zdG9yYWdlLmVudW1lcmF0ZSgpKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGtleSA9IGl0ZW0ua2V5O1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuX2NhY2hlLmhhcyhrZXkpKSB7XHJcbiAgICAgICAgICAgICAgICB5aWVsZCBpdGVtO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy9pZmRlZi1sb2FkZXIvaWZkZWYtbG9hZGVyLmpzP0RFQlVHPXRydWUmUEVSRk9STUFOQ0VfQVVESVQ9dHJ1ZSEuL3NyYy9xdWV1ZXMvbG9jYWwtc3RvcmFnZS9sb2NhbC1zdG9yYWdlLWtleS12YWx1ZS1jYWNoZS50cyIsImltcG9ydCB7IEJhdGNoIH0gZnJvbSAnLi4vYmF0Y2gnO1xyXG5pbXBvcnQgeyBJQmF0Y2hBdWRpdERhdGEgfSBmcm9tICcuL2F1ZGl0LWRhdGEnO1xyXG5pbXBvcnQgeyBJUGlwZVN0YXRzUmVwb3NpdG9yeSB9IGZyb20gJy4vc3RhdHMvcGlwZS1zdGF0cyc7XHJcblxyXG4vKipcclxuICogUHJvdmlkZSBhdWRpdCBpbmZvcm1hdGlvbiBmb3IgcGFzc2VkIGJhdGNoXHJcbiAqXHJcbiAqIEBpbnRlcm5hbFxyXG4gKi9cclxuZXhwb3J0IGludGVyZmFjZSBJQmF0Y2hBdWRpdFByb3ZpZGVyIHtcclxuICAgIGF1ZGl0KGJhdGNoOiBCYXRjaCwgcmVwbzogSVBpcGVTdGF0c1JlcG9zaXRvcnkpOiBQcm9taXNlPElCYXRjaEF1ZGl0RGF0YT47XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBAaW50ZXJuYWxcclxuICovXHJcbmV4cG9ydCBjbGFzcyBCYXRjaEF1ZGl0UHJvdmlkZXIgaW1wbGVtZW50cyBJQmF0Y2hBdWRpdFByb3ZpZGVyIHtcclxuICAgIHB1YmxpYyBhc3luYyBhdWRpdChiYXRjaDogQmF0Y2gsIHJlcG86IElQaXBlU3RhdHNSZXBvc2l0b3J5KTogUHJvbWlzZTxJQmF0Y2hBdWRpdERhdGE+IHtcclxuICAgICAgICBsZXQgc3RhdDogSUJhdGNoQXVkaXREYXRhIHwgdW5kZWZpbmVkO1xyXG5cclxuICAgICAgICBhd2FpdCByZXBvLnVwZGF0ZSgocGlwZVN0YXRzKSA9PiB7XHJcbiAgICAgICAgICAgIHN0YXQgPSB7XHJcbiAgICAgICAgICAgICAgICBjaWQ6IHBpcGVTdGF0cy5zdGF0aXN0aWMuY2xpZW50SWQsXHJcbiAgICAgICAgICAgICAgICBxaWQ6IHBpcGVTdGF0cy5zdGF0aXN0aWMucXVldWVJZCxcclxuICAgICAgICAgICAgICAgIGJpOiBwaXBlU3RhdHMuc3RhdGlzdGljLmJhdGNoSW5kZXgsXHJcbiAgICAgICAgICAgICAgICB0bWM6IHBpcGVTdGF0cy5zdGF0aXN0aWMudG90YWxNZXNzYWdlQ291bnQsXHJcbiAgICAgICAgICAgICAgICB0cmVjOiBwaXBlU3RhdHMuc3RhdGlzdGljLnRvdGFsUmVxdWVzdEVycm9yQ291bnQsXHJcbiAgICAgICAgICAgICAgICBxbWM6IHBpcGVTdGF0cy5zdGF0ZS5xdWV1ZU1lc3NhZ2VDb3VudCxcclxuICAgICAgICAgICAgICAgIHFzOiBwaXBlU3RhdHMuc3RhdGUucXVldWVTaXplLFxyXG4gICAgICAgICAgICAgICAgcmVjOiBwaXBlU3RhdHMuc3RhdGlzdGljLnJlcXVlc3RFcnJvckNvdW50LFxyXG4gICAgICAgICAgICAgICAgYm1jOiBiYXRjaC5lbnZlbG9wcy5sZW5ndGgsXHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBwaXBlU3RhdHMuc3RhdGlzdGljLnJlcXVlc3RFcnJvckNvdW50ID0gMDtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaWYgKCFzdGF0KSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignU3RhdGlzdGljIHdhcyBub3QgZmlsbGVkLicpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHN0YXQ7XHJcbiAgICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL2lmZGVmLWxvYWRlci9pZmRlZi1sb2FkZXIuanM/REVCVUc9dHJ1ZSZQRVJGT1JNQU5DRV9BVURJVD10cnVlIS4vc3JjL3Byb2Nlc3NpbmcvYXVkaXQvYXVkaXQtcHJvdmlkZXIudHMiLCJcclxuaW1wb3J0IHsgSVF1ZXVlIH0gZnJvbSAnLi4vLi4vLi4vcXVldWVzL3F1ZXVlJztcclxuaW1wb3J0IHsgQmF0Y2ggfSBmcm9tICcuLi8uLi9iYXRjaCc7XHJcbmltcG9ydCB7IElBdWRpdFNlbmRlciB9IGZyb20gJy4uL3NlbmRlcnMvYXVkaXQtc2VuZGVyJztcclxuaW1wb3J0IHsgQWpheFJlcXVlc3RTdGF0dXNSZXN1bHQgfSBmcm9tICcuLi9zdGF0cy9waXBlLXN0YXRzJztcclxuaW1wb3J0IHsgSUJhdGNoUGVyZm9ybWFuY2VBdWRpdG9yLCBJUGlwZVBlcmZvcm1hbmNlQXVkaXRvciB9IGZyb20gJy4vcGlwZSc7XHJcblxyXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbmltcG9ydCB7IElCYXRjaEF1ZGl0IH0gZnJvbSAnLi4vZGVmaW5pdGlvbnMnO1xyXG5pbXBvcnQgeyBCYXRjaFJlcG9ydGVyIH0gZnJvbSAnLi4vcmVwb3J0ZXJzL2JhdGNoLXJlcG9ydGVyJztcclxuaW1wb3J0IHsgUGVyZnN0YW1wIH0gZnJvbSAnLi9wZXJmc3RhbXAnO1xyXG4vLy8vLy8vLy8vXHJcblxyXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgUGlwZVBlcmZvcm1hbmNlQXVkaXRvckJ1aWxkZXIge1xyXG4gICAgcHVibGljIHN0YXRpYyBjcmVhdGUoc2VuZDogYm9vbGVhbiwgc2VuZGVyPzogSUF1ZGl0U2VuZGVyKTogSVBpcGVQZXJmb3JtYW5jZUF1ZGl0b3Ige1xyXG4gICAgICAgIHJldHVybiBuZXcgUGlwZVBlcmZvcm1hbmNlQXVkaXRvcihzZW5kID8gc2VuZGVyIDogdW5kZWZpbmVkKTtcclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgUGlwZVBlcmZvcm1hbmNlQXVkaXRvciBpbXBsZW1lbnRzIElQaXBlUGVyZm9ybWFuY2VBdWRpdG9yIHtcclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgX3NlbmRlcj86IElBdWRpdFNlbmRlclxyXG4gICAgKSB7IH1cclxuXHJcbiAgICBwdWJsaWMgc3RhcnQocXVldWU6IElRdWV1ZSkge1xyXG4gICAgICAgIGlmICh0aGlzLl9zZW5kZXIpIHtcclxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFBlcmZvcm1hbmNlQmF0Y2hBdWRpdG9yKHRoaXMuX3NlbmRlcik7XHJcbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBuZXcgRHVtbXlBdWRpdG9yKCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIER1bW15QXVkaXRvciBpbXBsZW1lbnRzIElCYXRjaFBlcmZvcm1hbmNlQXVkaXRvciB7XHJcbiAgICBwdWJsaWMgZGVxdWV1ZWQoYmFjaDogQmF0Y2gpOiB2b2lkIHsgLyoqLyB9XHJcblxyXG4gICAgcHVibGljIHNlbnQoKTogdm9pZCB7IC8qKi8gfVxyXG5cclxuICAgIHB1YmxpYyBjb25maXJtZWQocmVzdWx0OiBBamF4UmVxdWVzdFN0YXR1c1Jlc3VsdCk6IHZvaWQgeyAvKiovIH1cclxuXHJcbiAgICBwdWJsaWMgZW5kZWQoKTogdm9pZCB7IC8qKi8gfVxyXG59XHJcblxyXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbmNsYXNzIFBlcmZvcm1hbmNlQmF0Y2hBdWRpdG9yIGltcGxlbWVudHMgSUJhdGNoUGVyZm9ybWFuY2VBdWRpdG9yIHtcclxuICAgIHByaXZhdGUgX2JhdGNoPzogQmF0Y2g7XHJcblxyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfYXVkaXQ6IElCYXRjaEF1ZGl0ID0ge1xyXG4gICAgICAgIGRlcXVldWVkQXQ6IG5ldyBQZXJmc3RhbXAoKVxyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IF9zZW5kZXI6IElBdWRpdFNlbmRlclxyXG4gICAgKSB7IH1cclxuXHJcbiAgICBwdWJsaWMgZGVxdWV1ZWQoYmF0Y2g6IEJhdGNoKSB7XHJcbiAgICAgICAgdGhpcy5fYmF0Y2ggPSBiYXRjaDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2VudCgpIHtcclxuICAgICAgICB0aGlzLl9hdWRpdC5zZW50QXQgPSBuZXcgUGVyZnN0YW1wKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNvbmZpcm1lZChyZXN1bHQ6IEFqYXhSZXF1ZXN0U3RhdHVzUmVzdWx0KSB7XHJcbiAgICAgICAgdGhpcy5fYXVkaXQuY29uZmlybWVkQXQgPSBuZXcgUGVyZnN0YW1wKCk7XHJcbiAgICAgICAgdGhpcy5fYXVkaXQucmVzdWx0ID0gcmVzdWx0O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBlbmRlZCgpIHtcclxuICAgICAgICB0aGlzLl9hdWRpdC5lbmRlZEF0ID0gbmV3IFBlcmZzdGFtcCgpO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5fYmF0Y2gpIHtcclxuICAgICAgICAgICAgY29uc3QgcmVwb3J0ID0gbmV3IEJhdGNoUmVwb3J0ZXIodGhpcy5fYmF0Y2gsIHRoaXMuX2F1ZGl0KS5yZXBvcnQoKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuX3NlbmRlci5iYXRjaChyZXBvcnQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4vLy8vLy8vLy8vXHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy9pZmRlZi1sb2FkZXIvaWZkZWYtbG9hZGVyLmpzP0RFQlVHPXRydWUmUEVSRk9STUFOQ0VfQVVESVQ9dHJ1ZSEuL3NyYy9wcm9jZXNzaW5nL2F1ZGl0L2F1ZGl0b3JzL3BpcGUtcGVyZm9ybWFuY2UtYXVkaXRvci50cyIsImltcG9ydCB7IEJhdGNoIH0gZnJvbSAnLi4vLi4vYmF0Y2gnO1xyXG5pbXBvcnQgeyBJQmF0Y2hBdWRpdCwgSUJhdGNoUGVyZm9ybWFuY2VSZXBvcnQgfSBmcm9tICcuLi9kZWZpbml0aW9ucyc7XHJcbmltcG9ydCB7IGR1cmF0aW9uIH0gZnJvbSAnLi9jYWxjLW1ldGhvZHMnO1xyXG5cclxuZXhwb3J0IGNsYXNzIEJhdGNoUmVwb3J0ZXIge1xyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBfYmF0Y2g6IEJhdGNoLFxyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgX2F1ZGl0OiBJQmF0Y2hBdWRpdCxcclxuICAgICkge31cclxuXHJcbiAgICBwdWJsaWMgcmVwb3J0KCk6IElCYXRjaFBlcmZvcm1hbmNlUmVwb3J0IHtcclxuICAgICAgICBjb25zdCBiYXRjaCA9IHRoaXMuX2JhdGNoO1xyXG4gICAgICAgIGNvbnN0IGF1ZGl0ID0gdGhpcy5fYXVkaXQ7XHJcblxyXG4gICAgICAgIGlmICghYXVkaXQuZGVxdWV1ZWRBdCB8fCAhYXVkaXQuY29uZmlybWVkQXQgfHwgIWF1ZGl0LnNlbnRBdCB8fCAhYXVkaXQuZW5kZWRBdCkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Vycm9yIG9uIHJlcG9ydCBjb2xsZWN0aW5nLiBTb21lIGRhdGEgaXMgbWlzc2luZy4nKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGJhdGNoOiB7XHJcbiAgICAgICAgICAgICAgICBpbmRleDogYmF0Y2guaW5kZXgsXHJcbiAgICAgICAgICAgICAgICByZXN1bHQ6IGF1ZGl0LnJlc3VsdFxyXG4gICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgYmF0Y2hpbmdEdXJhdGlvbjogZHVyYXRpb24oYXVkaXQuZGVxdWV1ZWRBdCwgYXVkaXQuc2VudEF0KSxcclxuXHJcbiAgICAgICAgICAgIGNvbmZpcm1hdGlvbkR1cmF0aW9uOiBkdXJhdGlvbihhdWRpdC5jb25maXJtZWRBdCwgYXVkaXQuZW5kZWRBdClcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy9pZmRlZi1sb2FkZXIvaWZkZWYtbG9hZGVyLmpzP0RFQlVHPXRydWUmUEVSRk9STUFOQ0VfQVVESVQ9dHJ1ZSEuL3NyYy9wcm9jZXNzaW5nL2F1ZGl0L3JlcG9ydGVycy9iYXRjaC1yZXBvcnRlci50cyIsIlxyXG5pbXBvcnQgeyBJRW52ZWxvcFF1ZXVlIH0gZnJvbSAnLi4vLi4vZW52ZWxvcC1xdWV1ZSc7XHJcbmltcG9ydCB7IElQaXBlU3RhdHNQcm92aWRlciwgSVBpcGVTdGF0c1JlcG9zaXRvcnkgfSBmcm9tICcuLi9zdGF0cy9waXBlLXN0YXRzJztcclxuaW1wb3J0IHsgSUJhdGNoU3RhdGlzdGljQXVkaXRvciwgSVBpcGVTdGF0aXN0aWNBdWRpdG9yIH0gZnJvbSAnLi9waXBlJztcclxuXHJcbmV4cG9ydCBjbGFzcyBQaXBlU3RhdGlzdGljQXVkaXRvciBpbXBsZW1lbnRzIElQaXBlU3RhdGlzdGljQXVkaXRvciB7XHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IF9zdGF0czogSVBpcGVTdGF0c1Byb3ZpZGVyXHJcbiAgICApIHsgfVxyXG5cclxuICAgIHB1YmxpYyBzdGFydChxdWV1ZTogSUVudmVsb3BRdWV1ZSkge1xyXG4gICAgICAgIHJldHVybiBuZXcgQmF0Y2hTdGF0aXN0aWNBdWRpdG9yKHRoaXMuX3N0YXRzLmdldChxdWV1ZSkpO1xyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBCYXRjaFN0YXRpc3RpY0F1ZGl0b3IgaW1wbGVtZW50cyBJQmF0Y2hTdGF0aXN0aWNBdWRpdG9yIHtcclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBzdGF0czogSVBpcGVTdGF0c1JlcG9zaXRvcnlcclxuICAgICkgeyB9XHJcblxyXG4gICAgcHVibGljIHJlc3VsdChzdWNjZXNzOiBib29sZWFuKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RhdHMudXBkYXRlKChzdGF0cykgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBzdGF0aXN0aWMgPSBzdGF0cy5zdGF0aXN0aWM7XHJcblxyXG4gICAgICAgICAgICBpZiAoIXN1Y2Nlc3MpIHtcclxuICAgICAgICAgICAgICAgIHN0YXRpc3RpYy5yZXF1ZXN0RXJyb3JDb3VudCsrO1xyXG4gICAgICAgICAgICAgICAgc3RhdGlzdGljLnRvdGFsUmVxdWVzdEVycm9yQ291bnQrKztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgc3RhdGlzdGljLmxhc3RTZW5kaW5nU3VjY2VzcyA9IHN1Y2Nlc3M7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL2lmZGVmLWxvYWRlci9pZmRlZi1sb2FkZXIuanM/REVCVUc9dHJ1ZSZQRVJGT1JNQU5DRV9BVURJVD10cnVlIS4vc3JjL3Byb2Nlc3NpbmcvYXVkaXQvYXVkaXRvcnMvcGlwZS1zdGF0aXN0aWNzLWF1ZGl0b3IudHMiLCJpbXBvcnQgeyBJUGVyZm9ybWFuY2VXb3JrZXJNZXNzYWdlIH0gZnJvbSAnLi4vLi4vLi4vd29ya2Vycy93b3JrZXItZGVmaW5pdGlvbnMnO1xyXG5pbXBvcnQgeyBDb250ZXh0IH0gZnJvbSAnLi4vLi4vY29udGV4dCc7XHJcbmltcG9ydCB7IElCYXRjaFBlcmZvcm1hbmNlUmVwb3J0LCBJTWVzc2FnZXNQZXJmb3JtYW5jZVJlcG9ydCB9IGZyb20gJy4uL2RlZmluaXRpb25zJztcclxuaW1wb3J0IHsgSUF1ZGl0U2VuZGVyIH0gZnJvbSAnLi9hdWRpdC1zZW5kZXInO1xyXG5cclxuLyoqXHJcbiAqIFNlbmRlciBhdWRpdCBkYXRhIHRvIG1haW4gdGhyZWFkXHJcbiAqXHJcbiAqIEBpbnRlcm5hbFxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFdvcmtlckF1ZGl0U2VuZGVyIGltcGxlbWVudHMgSUF1ZGl0U2VuZGVyIHtcclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgX2NvbnRleHQ6IENvbnRleHQsXHJcbiAgICApIHsgfVxyXG5cclxuICAgIHB1YmxpYyBiYXRjaChyZXBvcnQ6IElCYXRjaFBlcmZvcm1hbmNlUmVwb3J0KTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fY29udGV4dC5zZW5kZXIucG9zdE1lc3NhZ2UoeyB0eXBlOiAncGVyZm9ybWFuY2UnLCByZXBvcnQ6IHsgdHlwZTogJ2JhdGNoJywgZGF0YTogcmVwb3J0IH0gfSBhcyBJUGVyZm9ybWFuY2VXb3JrZXJNZXNzYWdlKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbWVzc2FnZXMocmVwb3J0OiBJTWVzc2FnZXNQZXJmb3JtYW5jZVJlcG9ydCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX2NvbnRleHQuc2VuZGVyLnBvc3RNZXNzYWdlKHsgdHlwZTogJ3BlcmZvcm1hbmNlJywgcmVwb3J0OiB7IHR5cGU6ICdtZXNzYWdlcycsIGRhdGE6IHJlcG9ydCB9IH0gYXMgSVBlcmZvcm1hbmNlV29ya2VyTWVzc2FnZSk7XHJcbiAgICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL2lmZGVmLWxvYWRlci9pZmRlZi1sb2FkZXIuanM/REVCVUc9dHJ1ZSZQRVJGT1JNQU5DRV9BVURJVD10cnVlIS4vc3JjL3Byb2Nlc3NpbmcvYXVkaXQvc2VuZGVycy93b3JrZXItYXVkaXQtc2VuZGVyLnRzIiwiaW1wb3J0IHsgb3ZlcnJpZGUgfSBmcm9tICcuLi9mcmFtZXdvcmsvaW5kZXgnO1xyXG5pbXBvcnQgeyBJQmF0Y2hBdWRpdFByb3ZpZGVyIH0gZnJvbSAnLi9hdWRpdC9hdWRpdC1wcm92aWRlcic7XHJcbmltcG9ydCB7IElCYXRjaFN0YXRpc3RpY0F1ZGl0b3IsIElQaXBlU3RhdGlzdGljQXVkaXRvciB9IGZyb20gJy4vYXVkaXQvYXVkaXRvcnMvcGlwZSc7XHJcbmltcG9ydCB7IElQaXBlU3RhdHNSZXBvc2l0b3J5IH0gZnJvbSAnLi9hdWRpdC9zdGF0cy9waXBlLXN0YXRzJztcclxuaW1wb3J0IHsgQmF0Y2ggfSBmcm9tICcuL2JhdGNoJztcclxuaW1wb3J0IHsgSUJhdGNoRHJvcFN0cmF0ZWd5IH0gZnJvbSAnLi9iYXRjaC1kcm9wLXN0cmF0ZWd5JztcclxuaW1wb3J0IHsgSUJhdGNoU3RvcmFnZSwgSVN0b3JlZEJhdGNoQ29uc3VtYXRpb24gfSBmcm9tICcuL2JhdGNoLXN0b3JhZ2VzL2JhdGNoLXN0b3JhZ2UnO1xyXG5pbXBvcnQgeyBJRW52ZWxvcFF1ZXVlIH0gZnJvbSAnLi9lbnZlbG9wLXF1ZXVlJztcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUJhdGNoQnVpbGRlciB7XHJcbiAgICByZWFkb25seSBxdWV1ZTogSUVudmVsb3BRdWV1ZTtcclxuXHJcbiAgICBuZXh0KGF2b2lkQ29uY3VycmVuY3k/OiBib29sZWFuKTogUHJvbWlzZTxCYXRjaENvbnN1bWF0aW9uIHwgdW5kZWZpbmVkPjtcclxuXHJcbiAgICBkZXN0cm95KCk6IFByb21pc2U8dm9pZD47XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDb25maWd1cmF0aW9ucyBmb3IgQmF0Y2hcclxuICovXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUJhdGNoQnVpbGRlckNvbmZpZ3VyYXRpb24ge1xyXG4gICAgLyoqXHJcbiAgICAgKiBNYXggY291bnQgb2YgbWVzc2FnZXMgaW4gb25lIHNlbmRpbmcgdG8gYW4gZW5kcG9pbnRcclxuICAgICAqL1xyXG4gICAgYmF0Y2hTaXplPzogbnVtYmVyO1xyXG59XHJcblxyXG4vKipcclxuICogQ2xhc3MgZGVmaW5lIGRlZmF1bHQgdmFsdWVzIGZvciBjb25maWd1cmF0aW9uc1xyXG4gKlxyXG4gKiBAaW50ZXJuYWxcclxuICovXHJcbmNsYXNzIEJhdGNoQnVpbGRlckNvbmZpZ3VyYXRpb24gaW1wbGVtZW50cyBJQmF0Y2hCdWlsZGVyQ29uZmlndXJhdGlvbiB7XHJcbiAgICBwdWJsaWMgYmF0Y2hTaXplOiBudW1iZXIgPSA1MDtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEJhdGNoQnVpbGRlciBpbXBsZW1lbnRzIElCYXRjaEJ1aWxkZXIge1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfY29uZmlnOiBCYXRjaEJ1aWxkZXJDb25maWd1cmF0aW9uID0gbmV3IEJhdGNoQnVpbGRlckNvbmZpZ3VyYXRpb24oKTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgcXVldWU6IElFbnZlbG9wUXVldWUsXHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBfYmF0Y2hTdG9yYWdlOiBJQmF0Y2hTdG9yYWdlLFxyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgX2JhdGNoRHJvcFN0cmF0ZWd5OiBJQmF0Y2hEcm9wU3RyYXRlZ3ksXHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBfYXVkaXRQcm92aWRlcjogSUJhdGNoQXVkaXRQcm92aWRlcixcclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IF9hdWRpdG9yOiBJUGlwZVN0YXRpc3RpY0F1ZGl0b3IsXHJcbiAgICAgICAgY29uZmlnOiBJQmF0Y2hCdWlsZGVyQ29uZmlndXJhdGlvbiB8IG51bGwgPSBudWxsXHJcbiAgICApIHtcclxuICAgICAgICBvdmVycmlkZSh0aGlzLl9jb25maWcsIGNvbmZpZyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFzeW5jIG5leHQoYXZvaWRDb25jdXJyZW5jeTogYm9vbGVhbiA9IGZhbHNlKTogUHJvbWlzZTxCYXRjaENvbnN1bWF0aW9uIHwgdW5kZWZpbmVkPiB7XHJcbiAgICAgICAgY29uc3QgYXVkaXRvciA9IHRoaXMuX2F1ZGl0b3Iuc3RhcnQodGhpcy5xdWV1ZSk7XHJcbiAgICAgICAgY29uc3QgY29uc3VtYXRpb24gPSBhd2FpdCB0aGlzLmJhdGNoKGF1ZGl0b3Iuc3RhdHMsIGF2b2lkQ29uY3VycmVuY3kpO1xyXG5cclxuICAgICAgICBpZiAoIWNvbnN1bWF0aW9uKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gbmV3IEJhdGNoQ29uc3VtYXRpb24oY29uc3VtYXRpb24sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF1ZGl0b3IsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2JhdGNoRHJvcFN0cmF0ZWd5KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYXN5bmMgZGVzdHJveSgpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICBhd2FpdCB0aGlzLl9iYXRjaFN0b3JhZ2UuZGVzdHJveSgpO1xyXG4gICAgICAgIGF3YWl0IHRoaXMucXVldWUuZGVzdHJveSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgYmF0Y2gocmVwbzogSVBpcGVTdGF0c1JlcG9zaXRvcnksIGF2b2lkQ29uY3VycmVuY3k6IGJvb2xlYW4pOiBQcm9taXNlPElTdG9yZWRCYXRjaENvbnN1bWF0aW9uIHwgdW5kZWZpbmVkPiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2JhdGNoU3RvcmFnZS5hcHBlbmQoYXN5bmMgKCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBlbnZlbG9wcyA9IGF3YWl0IHRoaXMucXVldWUuZGVxdWV1ZSh0aGlzLl9jb25maWcuYmF0Y2hTaXplLCBhdm9pZENvbmN1cnJlbmN5KTtcclxuXHJcbiAgICAgICAgICAgIGlmICghZW52ZWxvcHMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjb25zdCBiYXRjaCA9IGF3YWl0IHJlcG8udXBkYXRlKChzdGF0cykgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBCYXRjaChlbnZlbG9wcywgKytzdGF0cy5zdGF0aXN0aWMuYmF0Y2hJbmRleCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgYmF0Y2guYXVkaXRzID0gYXdhaXQgdGhpcy5fYXVkaXRQcm92aWRlci5hdWRpdChiYXRjaCwgcmVwbyk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gYmF0Y2g7XHJcbiAgICAgICAgfSwgYXZvaWRDb25jdXJyZW5jeSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBCYXRjaENvbnN1bWF0aW9uIHtcclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgX2NvbnN1bXB0aW9uOiBJU3RvcmVkQmF0Y2hDb25zdW1hdGlvbixcclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IF9hdWRpdG9yOiBJQmF0Y2hTdGF0aXN0aWNBdWRpdG9yLFxyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgX2JhdGNoRHJvcFN0cmF0ZWd5OiBJQmF0Y2hEcm9wU3RyYXRlZ3lcclxuICAgICkgeyB9XHJcblxyXG4gICAgcHVibGljIGdldCBiYXRjaCgpOiBCYXRjaCB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbnN1bXB0aW9uLmJhdGNoO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhc3luYyBhY2soKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgYXdhaXQgdGhpcy5fYXVkaXRvci5yZXN1bHQodHJ1ZSk7XHJcbiAgICAgICAgYXdhaXQgdGhpcy5fY29uc3VtcHRpb24uYWNrKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFzeW5jIG5hY2soKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgdGhpcy5iYXRjaC5lcnJvckNvdW50Kys7XHJcbiAgICAgICAgYXdhaXQgdGhpcy5fYXVkaXRvci5yZXN1bHQoZmFsc2UpO1xyXG5cclxuICAgICAgICBjb25zdCBzdGF0cyA9IGF3YWl0IHRoaXMuX2F1ZGl0b3Iuc3RhdHMucmVhZCgpO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5fYmF0Y2hEcm9wU3RyYXRlZ3kuc2hvdWxkQmVEcm9wcGVkKHN0YXRzLCB0aGlzLmJhdGNoKSkge1xyXG4gICAgICAgICAgICBhd2FpdCB0aGlzLl9jb25zdW1wdGlvbi5hY2soKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBhd2FpdCB0aGlzLl9jb25zdW1wdGlvbi5uYWNrKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy9pZmRlZi1sb2FkZXIvaWZkZWYtbG9hZGVyLmpzP0RFQlVHPXRydWUmUEVSRk9STUFOQ0VfQVVESVQ9dHJ1ZSEuL3NyYy9wcm9jZXNzaW5nL2JhdGNoLWJ1aWxkZXIudHMiLCJpbXBvcnQgeyBvdmVycmlkZSB9IGZyb20gJy4uL2ZyYW1ld29yay9pbmRleCc7XHJcbmltcG9ydCB7IElQaXBlU3RhdHMgfSBmcm9tICcuL2F1ZGl0L3N0YXRzL3BpcGUtc3RhdHMnO1xyXG5pbXBvcnQgeyBCYXRjaCB9IGZyb20gJy4vYmF0Y2gnO1xyXG5cclxuLyoqXHJcbiAqIERyb3AgYmF0Y2ggc3RyYXRlZ3kgZGVybWluYXRlIHRoZW4gY3VycmVudCBiYXRjaCBzaG91bGQgYmUgZHJvcHBlZCBiYXNlZCBvbiBjdXJyZW50IHN0YXRlIGFuZCBzdGF0aXNpdGNzXHJcbiAqL1xyXG5leHBvcnQgaW50ZXJmYWNlIElCYXRjaERyb3BTdHJhdGVneSB7XHJcbiAgICBzaG91bGRCZURyb3BwZWQocGlwZVN0YXRzOiBJUGlwZVN0YXRzLCBiYXRjaDogQmF0Y2gpOiBib29sZWFuO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElCYXRjaERyb3BTdHJhdGVneUNvbmZpZ3VyYXRpb24ge1xyXG4gICAgLyoqXHJcbiAgICAgKiBSYXRpbyBvZiBxdWV1ZSBmdWxsaW5nIGFmdGVyIHdoaWNoIGJhdGNoZXMgYXJlIGRyb3BwZWQgYWZ0ZXQgYGF0dGVtcHRDb3VudGBcclxuICAgICAqL1xyXG4gICAgZmlsbFRocmVzaG9sZD86IG51bWJlcjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIE51bWJlciBvZiBhdHRlbXB0IGZvciBlYWNoIGJhdGNoZXMgYWZ0ZXIgZXhjaWRpbmcgb2YgYGZpbGxUaHJlc2hvbGRgXHJcbiAgICAgKi9cclxuICAgIGF0dGVtcHRDb3VudD86IG51bWJlcjtcclxufVxyXG5cclxuY2xhc3MgRGVmYXVsdEJhdGNoRHJvcFN0cmF0ZWd5Q29uZmlndXJhdGlvbiBpbXBsZW1lbnRzIElCYXRjaERyb3BTdHJhdGVneUNvbmZpZ3VyYXRpb24ge1xyXG4gICAgcHVibGljIGZpbGxUaHJlc2hvbGQgPSAwLjY7XHJcblxyXG4gICAgcHVibGljIGF0dGVtcHRDb3VudCA9IDI7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBEZWZhdWx0QmF0Y2hEcm9wU3RyYXRlZ3kgaW1wbGVtZW50cyBJQmF0Y2hEcm9wU3RyYXRlZ3kge1xyXG4gICAgcHJpdmF0ZSBfY29uZmlnID0gbmV3IERlZmF1bHRCYXRjaERyb3BTdHJhdGVneUNvbmZpZ3VyYXRpb24oKTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBjb25maWc6IElCYXRjaERyb3BTdHJhdGVneUNvbmZpZ3VyYXRpb25cclxuICAgICkge1xyXG4gICAgICAgIG92ZXJyaWRlKHRoaXMuX2NvbmZpZywgY29uZmlnKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2hvdWxkQmVEcm9wcGVkKHBpcGVTdGF0czogSVBpcGVTdGF0cywgYmF0Y2g6IEJhdGNoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgY29uc3Qgc3RhdGUgPSBwaXBlU3RhdHMuc3RhdGU7XHJcbiAgICAgICAgY29uc3QgY29uZmlnID0gdGhpcy5fY29uZmlnO1xyXG5cclxuICAgICAgICByZXR1cm4gYmF0Y2guZXJyb3JDb3VudCA+PSBjb25maWcuYXR0ZW1wdENvdW50XHJcbiAgICAgICAgICAgICAgICYmIChzdGF0ZS5xdWV1ZU1lc3NhZ2VDb3VudCAvIHN0YXRlLnF1ZXVlU2l6ZSkgPiBjb25maWcuZmlsbFRocmVzaG9sZDtcclxuICAgIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvaWZkZWYtbG9hZGVyL2lmZGVmLWxvYWRlci5qcz9ERUJVRz10cnVlJlBFUkZPUk1BTkNFX0FVRElUPXRydWUhLi9zcmMvcHJvY2Vzc2luZy9iYXRjaC1kcm9wLXN0cmF0ZWd5LnRzIiwiaW1wb3J0IHsgSW5kZXhlZERiVXRpbHMgfSBmcm9tICcuLi8uLi8uLi9mcmFtZXdvcmsvaW5kZXhlZGRiLXV0aWxzJztcclxuaW1wb3J0IHsgSUxvZ2dlciB9IGZyb20gJy4uLy4uLy4uL2xvZ3MvbG9nZ2VyJztcclxuaW1wb3J0IHsgQmF0Y2ggfSBmcm9tICcuLi8uLi9iYXRjaCc7XHJcbmltcG9ydCB7IElCYXRjaFN0b3JhZ2UsIElTdG9yZWRCYXRjaENvbnN1bWF0aW9uIH0gZnJvbSAnLi4vYmF0Y2gtc3RvcmFnZSc7XHJcblxyXG5leHBvcnQgY2xhc3MgQmF0Y2hJbmRleGVkREJTdG9yYWdlIGltcGxlbWVudHMgSUJhdGNoU3RvcmFnZSB7XHJcbiAgICBwdWJsaWMgc3RhdGljIGFzeW5jIGNyZWF0ZShpZDogc3RyaW5nLCBzeW5jaHJvbml6YXRpb25UaW1lOiBudW1iZXIsIG5hbWU/OiBzdHJpbmcsIGNsZWFyPzogYm9vbGVhbik6IFByb21pc2U8QmF0Y2hJbmRleGVkREJTdG9yYWdlPiB7XHJcbiAgICAgICAgY29uc3QgZGF0YWJhc2UgPSBhd2FpdCBCYXRjaEluZGV4ZWREQlN0b3JhZ2UuZGIoaWQsIG5hbWUpO1xyXG5cclxuICAgICAgICBjb25zdCBzdG9yYWdlID0gbmV3IEJhdGNoSW5kZXhlZERCU3RvcmFnZShpZCwgc3luY2hyb25pemF0aW9uVGltZSwgZGF0YWJhc2UpO1xyXG5cclxuICAgICAgICBpZiAoY2xlYXIpIHtcclxuICAgICAgICAgICAgYXdhaXQgc3RvcmFnZS5jbGVhcigpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHN0b3JhZ2U7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBkYihpZDogc3RyaW5nLCBuYW1lPzogc3RyaW5nKTogUHJvbWlzZTxJREJEYXRhYmFzZT4ge1xyXG4gICAgICAgIGNvbnN0IGRiTmFtZSA9ICdtY2pzLWJhdGNoOicgKyAobmFtZSB8fCBpZCk7XHJcblxyXG4gICAgICAgIHJldHVybiBJbmRleGVkRGJVdGlscy5vcGVuKGRiTmFtZSwgMSwgKGRiKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICghZGIub2JqZWN0U3RvcmVOYW1lcy5jb250YWlucyhCYXRjaEluZGV4ZWREQlN0b3JhZ2Uuc3RvcmFnZU5hbWUpKSB7XHJcbiAgICAgICAgICAgICAgICBkYi5jcmVhdGVPYmplY3RTdG9yZShCYXRjaEluZGV4ZWREQlN0b3JhZ2Uuc3RvcmFnZU5hbWUsIHsga2V5UGF0aDogKCdiYXRjaCcgYXMga2V5b2YgSUJhdGNoRGF0YSkgKyAnLicgKyAoJ2luZGV4JyBhcyBrZXlvZiBCYXRjaCkgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBzdG9yYWdlTmFtZSA9ICdiYXRjaCc7XHJcblxyXG4gICAgcHVibGljIGxvZ2dlcj86IElMb2dnZXI7XHJcblxyXG4gICAgcHJpdmF0ZSBfcmVjb3Zlcnk/OiBCYXRjaDtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgaWQ6IHN0cmluZyxcclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IF9zeW5jVGltZTogbnVtYmVyLFxyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgX2RiOiBJREJEYXRhYmFzZSxcclxuICAgICkgeyB9XHJcblxyXG4gICAgcHVibGljIGFzeW5jIGFwcGVuZChjcmVhdGU6ICgpID0+IFByb21pc2U8QmF0Y2ggfCB1bmRlZmluZWQ+KTogUHJvbWlzZTxJU3RvcmVkQmF0Y2hDb25zdW1hdGlvbiB8IHVuZGVmaW5lZD4ge1xyXG4gICAgICAgIGxldCBiYXRjaCA9IGF3YWl0IHRoaXMucmVhZCgpO1xyXG5cclxuICAgICAgICBpZiAoIWJhdGNoKSB7XHJcblxyXG4gICAgICAgICAgICBiYXRjaCA9IGF3YWl0IGNyZWF0ZSgpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGJhdGNoKSB7XHJcbiAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLnNhdmUoYmF0Y2gpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoYmF0Y2gpIHtcclxuICAgICAgICAgICAgY29uc3QgYmF0Y2hJbmRleCA9IGJhdGNoLmluZGV4O1xyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgYmF0Y2gsXHJcbiAgICAgICAgICAgICAgICBhY2s6ICgpID0+IHRoaXMucmVzZXQoYmF0Y2hJbmRleCksXHJcbiAgICAgICAgICAgICAgICBuYWNrOiAoKSA9PiB0aGlzLmF2b2lkQWNjZXNzKGJhdGNoSW5kZXgpXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbGVhcigpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy50cmFuc2FjdGlvbigoc3RvcmFnZSkgPT4ge1xyXG4gICAgICAgICAgICBzdG9yYWdlLmNsZWFyKCk7XHJcbiAgICAgICAgfSwgdW5kZWZpbmVkKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYXN5bmMgZGVzdHJveSgpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICB0aGlzLl9kYi5jbG9zZSgpO1xyXG4gICAgICAgIHJldHVybiBJbmRleGVkRGJVdGlscy5yZW1vdmUodGhpcy5fZGIubmFtZSkuY2F0Y2goKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHJlc2V0KGluZGV4OiBudW1iZXIpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5yZW1vdmUoaW5kZXgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgYXN5bmMgcmVhZCgpOiBQcm9taXNlPEJhdGNoIHwgdW5kZWZpbmVkPiB7XHJcbiAgICAgICAgaWYgKHRoaXMuX3JlY292ZXJ5KSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9yZWNvdmVyeTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHJlYWRSZXN1bHQgPSBhd2FpdCB0aGlzLnRyYW5zYWN0aW9uKChzdG9yYWdlLCByZXN1bHQpID0+IHtcclxuICAgICAgICAgICAgICAgIEluZGV4ZWREYlV0aWxzLnJlcXVlc3Q8SURCQ3Vyc29yV2l0aFZhbHVlPihzdG9yYWdlLm9wZW5DdXJzb3IoKSwgKGN1cnNvcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjdXJzb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZGF0YSA9IGN1cnNvci52YWx1ZSBhcyBJQmF0Y2hEYXRhO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YSAmJiB0aGlzLmlzTm90QmxvY2tlZChkYXRhKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3Vyc29yLnVwZGF0ZShkYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdC5iYXRjaCA9IGRhdGEuYmF0Y2g7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJzb3IuY29udGludWUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9LCB7IGJhdGNoOiB1bmRlZmluZWQgYXMgQmF0Y2ggfCB1bmRlZmluZWQgfSk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gcmVhZFJlc3VsdC5iYXRjaDtcclxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICB0aGlzLmVycm9yKCdFcnJvciBvbiByZWFkaW5nLicsIGVycm9yKTtcclxuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBhc3luYyBzYXZlKGJhdGNoOiBCYXRjaCk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGF3YWl0IHRoaXMudHJhbnNhY3Rpb24oKHN0b3JhZ2UpID0+IHtcclxuICAgICAgICAgICAgICAgIEluZGV4ZWREYlV0aWxzLnJlcXVlc3Qoc3RvcmFnZS5hZGQoe1xyXG4gICAgICAgICAgICAgICAgICAgIGJhdGNoLFxyXG4gICAgICAgICAgICAgICAgICAgIGxhc3RBY2Nlc3M6ICtuZXcgRGF0ZSgpXHJcbiAgICAgICAgICAgICAgICB9IGFzIElCYXRjaERhdGEpKTtcclxuICAgICAgICAgICAgfSwgdW5kZWZpbmVkKTtcclxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICB0aGlzLl9yZWNvdmVyeSA9IGJhdGNoO1xyXG4gICAgICAgICAgICB0aGlzLmVycm9yKCdFcnJvciBvbiBzYXZpbmcuJywgZXJyb3IpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGFzeW5jIHJlbW92ZShiYXRjaEluZGV4OiBudW1iZXIpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICBpZiAodGhpcy5fcmVjb3ZlcnkgJiYgdGhpcy5fcmVjb3ZlcnkuaW5kZXggPT09IGJhdGNoSW5kZXgpIHtcclxuICAgICAgICAgICAgdGhpcy5fcmVjb3ZlcnkgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGF3YWl0IHRoaXMudHJhbnNhY3Rpb24oKHN0b3JhZ2UpID0+IHtcclxuICAgICAgICAgICAgICAgIEluZGV4ZWREYlV0aWxzLnJlcXVlc3Qoc3RvcmFnZS5kZWxldGUoYmF0Y2hJbmRleCkpO1xyXG4gICAgICAgICAgICB9LCB1bmRlZmluZWQpO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZXJyb3IoJ0Vycm9yIG9uIHJlbW92aW5nLicsIGVycm9yKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBhc3luYyBhdm9pZEFjY2VzcyhiYXRjaEluZGV4OiBudW1iZXIpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBhd2FpdCB0aGlzLnRyYW5zYWN0aW9uKChzdG9yYWdlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBJbmRleGVkRGJVdGlscy5yZXF1ZXN0KHN0b3JhZ2UuZ2V0KGJhdGNoSW5kZXgpLCAoZGF0YTogSUJhdGNoRGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGEubGFzdEFjY2VzcyA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgICAgICAgICBzdG9yYWdlLnB1dChkYXRhKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9LCB1bmRlZmluZWQpO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZXJyb3IoJ0Vycm9yIG9uIGFjY2VzcyBhdm9pZGluZy4nLCBlcnJvcik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb3Blbihtb2RlOiBJREJUcmFuc2FjdGlvbk1vZGUpOiBJREJPYmplY3RTdG9yZSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RiLnRyYW5zYWN0aW9uKFtCYXRjaEluZGV4ZWREQlN0b3JhZ2Uuc3RvcmFnZU5hbWVdLCBtb2RlKS5vYmplY3RTdG9yZShCYXRjaEluZGV4ZWREQlN0b3JhZ2Uuc3RvcmFnZU5hbWUpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgdHJhbnNhY3Rpb248VD4oYWN0aW9uOiAoc3RvcmFnZTogSURCT2JqZWN0U3RvcmUsIHJlc3VsdDogVCkgPT4gdm9pZCwgcmVzdWx0OiBULCBtb2RlOiBJREJUcmFuc2FjdGlvbk1vZGUgPSAncmVhZHdyaXRlJyk6IFByb21pc2U8VD4ge1xyXG4gICAgICAgIHJldHVybiBJbmRleGVkRGJVdGlscy50cmFuc2FjdGlvbigoKSA9PiB0aGlzLm9wZW4obW9kZSksIGFjdGlvbiwgcmVzdWx0KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGlzTm90QmxvY2tlZChkYXRhOiBJQmF0Y2hEYXRhKTogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYgKHRoaXMuX3N5bmNUaW1lKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IG5vdyA9ICtuZXcgRGF0ZSgpO1xyXG4gICAgICAgICAgICBpZiAoZGF0YS5sYXN0QWNjZXNzICYmIE1hdGguYWJzKG5vdyAtIGRhdGEubGFzdEFjY2VzcykgPCB0aGlzLl9zeW5jVGltZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGRhdGEubGFzdEFjY2VzcyA9IG5vdztcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBlcnJvcihtZXNzYWdlOiBzdHJpbmcsIGVycm9yOiBFcnJvcikge1xyXG4gICAgICAgIGlmICh0aGlzLmxvZ2dlcikge1xyXG4gICAgICAgICAgICB0aGlzLmxvZ2dlci5lcnJvcignW0luZGV4ZWREYiBCU106JyArIG1lc3NhZ2UsIGVycm9yKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmludGVyZmFjZSBJQmF0Y2hEYXRhIHtcclxuICAgIGJhdGNoOiBCYXRjaDtcclxuXHJcbiAgICBsYXN0QWNjZXNzOiBudW1iZXIgfCB1bmRlZmluZWQ7XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL2lmZGVmLWxvYWRlci9pZmRlZi1sb2FkZXIuanM/REVCVUc9dHJ1ZSZQRVJGT1JNQU5DRV9BVURJVD10cnVlIS4vc3JjL3Byb2Nlc3NpbmcvYmF0Y2gtc3RvcmFnZXMvaW5kZXhlZGRiLXN0b3JhZ2UvYmF0Y2gtaW5kZXhlZGRiLXN0b3JhZ2UudHMiLCJpbXBvcnQgeyBXZWJTdG9yYWdlcyB9IGZyb20gJy4uLy4uLy4uL2ZyYW1ld29yay93ZWJzdG9yYWdlJztcclxuaW1wb3J0IHsgSUxvZ2dlciB9IGZyb20gJy4uLy4uLy4uL2xvZ3MvbG9nZ2VyJztcclxuaW1wb3J0IHsgQmF0Y2ggfSBmcm9tICcuLi8uLi9iYXRjaCc7XHJcbmltcG9ydCB7IElCYXRjaFN0b3JhZ2UsIElTdG9yZWRCYXRjaENvbnN1bWF0aW9uIH0gZnJvbSAnLi4vYmF0Y2gtc3RvcmFnZSc7XHJcblxyXG5leHBvcnQgY2xhc3MgQmF0Y2hMb2NhbFN0b3JhZ2VTdG9yYWdlIGltcGxlbWVudHMgSUJhdGNoU3RvcmFnZSB7XHJcbiAgICBwdWJsaWMgc3RhdGljIGNyZWF0ZShpZDogc3RyaW5nLCBuYW1lPzogc3RyaW5nLCBjbGVhcj86IGJvb2xlYW4pOiBCYXRjaExvY2FsU3RvcmFnZVN0b3JhZ2UgfCB1bmRlZmluZWQge1xyXG4gICAgICAgIGlmICghV2ViU3RvcmFnZXMubG9jYWxTdG9yYWdlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBzdG9yYWdlID0gbmV3IEJhdGNoTG9jYWxTdG9yYWdlU3RvcmFnZSgnbWNqcy1iYXRjaDonICsgKG5hbWUgfHwgaWQpLCBXZWJTdG9yYWdlcy5sb2NhbFN0b3JhZ2UpO1xyXG5cclxuICAgICAgICBpZiAoY2xlYXIpIHtcclxuICAgICAgICAgICAgc3RvcmFnZS5jbGVhcigpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHN0b3JhZ2U7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGxvZ2dlcj86IElMb2dnZXI7XHJcblxyXG4gICAgcHJpdmF0ZSBfY2FjaGU/OiBCYXRjaDtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkga2V5OiBzdHJpbmcsXHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBfc3RvcmFnZTogU3RvcmFnZVxyXG4gICAgKSB7IH1cclxuXHJcbiAgICBwdWJsaWMgYXN5bmMgYXBwZW5kKGNyZWF0ZTogKCkgPT4gUHJvbWlzZTxCYXRjaCB8IHVuZGVmaW5lZD4sIGF2b2lkQ29uY3VycmFuY3k6IGJvb2xlYW4pOiBQcm9taXNlPElTdG9yZWRCYXRjaENvbnN1bWF0aW9uIHwgdW5kZWZpbmVkPiB7XHJcbiAgICAgICAgbGV0IGJhdGNoID0gdGhpcy5fY2FjaGUgfHwgKGF2b2lkQ29uY3VycmFuY3kgPyB1bmRlZmluZWQgOiB0aGlzLnJlYWQoKSk7XHJcblxyXG4gICAgICAgIGlmICghYmF0Y2gpIHtcclxuICAgICAgICAgICAgYmF0Y2ggPSB0aGlzLl9jYWNoZSA9IGF3YWl0IGNyZWF0ZSgpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGJhdGNoICYmICFhdm9pZENvbmN1cnJhbmN5KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNhdmUoYmF0Y2gpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoYmF0Y2gpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIGJhdGNoLFxyXG4gICAgICAgICAgICAgICAgYWNrOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fY2FjaGUgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFhdm9pZENvbmN1cnJhbmN5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVzZXQoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgbmFjazogKCkgPT4geyAvKiovIH1cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xlYXIoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5yZXNldCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBkZXN0cm95KCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuY2xlYXIoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHJlYWQoKTogQmF0Y2ggfCB1bmRlZmluZWQge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHN0ciA9IHRoaXMuX3N0b3JhZ2UuZ2V0SXRlbSh0aGlzLmtleSk7XHJcblxyXG4gICAgICAgICAgICBpZiAoc3RyKSB7XHJcbiAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBKU09OLnBhcnNlKHN0cikgYXMgQmF0Y2g7XHJcbiAgICAgICAgICAgICAgICB9IGNhdGNoIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9zdG9yYWdlLnJlbW92ZUl0ZW0odGhpcy5rZXkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgdGhpcy5sb2coJ0Vycm9yIG9uIHJlYWRpbmcnLCBlcnJvcik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzYXZlKGJhdGNoOiBCYXRjaCk6IHZvaWQge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHN0ciA9IEpTT04uc3RyaW5naWZ5KGJhdGNoKTtcclxuICAgICAgICAgICAgdGhpcy5fc3RvcmFnZS5zZXRJdGVtKHRoaXMua2V5LCBzdHIpO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9nKCdFcnJvciBvbiBzYXZpbmcnLCBlcnJvcik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcmVzZXQoKTogdm9pZCB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgdGhpcy5fc3RvcmFnZS5yZW1vdmVJdGVtKHRoaXMua2V5KTtcclxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICB0aGlzLmxvZygnRXJyb3Igb24gcmVzZXRpbmcnLCBlcnJvcik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgbG9nKG1lc3NhZ2U6IHN0cmluZywgZXJyb3I6IEVycm9yKSB7XHJcbiAgICAgICAgaWYgKHRoaXMubG9nZ2VyKSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9nZ2VyLmVycm9yKCdbTFN0b3JhZ2UgQlNdOicgKyBtZXNzYWdlLCBlcnJvcik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy9pZmRlZi1sb2FkZXIvaWZkZWYtbG9hZGVyLmpzP0RFQlVHPXRydWUmUEVSRk9STUFOQ0VfQVVESVQ9dHJ1ZSEuL3NyYy9wcm9jZXNzaW5nL2JhdGNoLXN0b3JhZ2VzL2xvY2FsLXN0b3JhZ2UvYmF0Y2gtbG9jYWxzdG9yYWdlLXN0b3JhZ2UudHMiLCJpbXBvcnQgeyBCYXRjaCB9IGZyb20gJy4uLy4uL2JhdGNoJztcclxuaW1wb3J0IHsgSUJhdGNoU3RvcmFnZSwgSVN0b3JlZEJhdGNoQ29uc3VtYXRpb24gfSBmcm9tICcuLi9iYXRjaC1zdG9yYWdlJztcclxuXHJcbmV4cG9ydCBjbGFzcyBCYXRjaE1lbW9yeVN0b3JhZ2UgaW1wbGVtZW50cyBJQmF0Y2hTdG9yYWdlIHtcclxuICAgIHByaXZhdGUgX2JhdGNoOiBCYXRjaCB8IHVuZGVmaW5lZDtcclxuXHJcbiAgICBwdWJsaWMgYXN5bmMgYXBwZW5kKGNyZWF0ZTogKCkgPT4gUHJvbWlzZTxCYXRjaCB8IHVuZGVmaW5lZD4pOiBQcm9taXNlPElTdG9yZWRCYXRjaENvbnN1bWF0aW9uIHwgdW5kZWZpbmVkPiB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9iYXRjaCkge1xyXG4gICAgICAgICAgICB0aGlzLl9iYXRjaCA9IGF3YWl0IGNyZWF0ZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCF0aGlzLl9iYXRjaCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgYmF0Y2g6IHRoaXMuX2JhdGNoLFxyXG4gICAgICAgICAgICBhY2s6ICgpID0+IHRoaXMuX2JhdGNoID0gdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICBuYWNrOiAoKSA9PiB7IC8qKi8gfVxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsZWFyKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX2JhdGNoID0gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBkZXN0cm95KCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuY2xlYXIoKTtcclxuICAgIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvaWZkZWYtbG9hZGVyL2lmZGVmLWxvYWRlci5qcz9ERUJVRz10cnVlJlBFUkZPUk1BTkNFX0FVRElUPXRydWUhLi9zcmMvcHJvY2Vzc2luZy9iYXRjaC1zdG9yYWdlcy9tZW1vcnktc3RvcmFnZS9iYXRjaC1tZW1vcnktc3RvcmFnZS50cyIsImV4cG9ydCAqIGZyb20gJy4vZmUtYW5hbHl0aWNzLWNvbGxlY3Rvci1lbmRwb2ludCc7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy9pZmRlZi1sb2FkZXIvaWZkZWYtbG9hZGVyLmpzP0RFQlVHPXRydWUmUEVSRk9STUFOQ0VfQVVESVQ9dHJ1ZSEuL3NyYy9wcm9jZXNzaW5nL2VuZHBvaW50cy9mZS1hbmFseXRpY3MtY29sbGVjdG9yL2luZGV4LnRzIiwiaW1wb3J0IHsgTWVzc2FnZVR5cGUgfSBmcm9tICcuLi8uLi8uLi9kZWZpbml0aW9ucyc7XHJcbmltcG9ydCB7IElBamF4UHJvdmlkZXIsIElUaW1lU3RhbXBQcm92aWRlciwgb3ZlcnJpZGUgfSBmcm9tICcuLi8uLi8uLi9mcmFtZXdvcmsnO1xyXG5pbXBvcnQgeyBJTG9nZ2VyIH0gZnJvbSAnLi4vLi4vLi4vbG9ncy9sb2dnZXInO1xyXG5pbXBvcnQgeyBWZXJzaW9uIH0gZnJvbSAnLi4vLi4vLi4vdmVyc2lvbic7XHJcbmltcG9ydCB7IEJhdGNoIH0gZnJvbSAnLi4vLi4vYmF0Y2gnO1xyXG5pbXBvcnQgeyBJRW52ZWxvcCB9IGZyb20gJy4uLy4uL2VudmVsb3AnO1xyXG5pbXBvcnQgeyBJRW5kcG9pbnQgfSBmcm9tICcuLi9lbmRwb2ludCc7XHJcblxyXG4vKipcclxuICogRW52aXJvbm1lbnQgZGF0YSBmb3IgRkUgQW5hbHl0aWNzIENvbGxlY3RvclxyXG4gKlxyXG4gKiBAaW50ZXJuYWxcclxuICogQGludGVyZmFjZSBJRkVBbmFseXRpY3NDb2xsZWN0b3JDb25maWd1cmF0aW9uXHJcbiAqL1xyXG5leHBvcnQgaW50ZXJmYWNlIElGRUFuYWx5dGljc0NvbGxlY3RvckVudmlyb25tZW50IHtcclxuICAgIC8qKlxyXG4gICAgICogQXBpS2V5IGZyb20gZW52ZXJvbmVtbnRcclxuICAgICAqXHJcbiAgICAgKiBAdHlwZSB7c3RyaW5nfUBtZW1iZXJvZiBJRkVBbmFseXRpY3NDb2xsZWN0b3JDb25maWd1cmF0aW9uXHJcbiAgICAgKi9cclxuICAgIGFwaUtleTogc3RyaW5nO1xyXG59XHJcblxyXG4vKipcclxuICogQ29uZmlndXJhdGlvbiBkYXRhIGZvciBGRSBBbmFseXRpY3MgQ29sbGVjdG9yXHJcbiAqXHJcbiAqIEBpbnRlcmZhY2UgSUZFQW5hbHl0aWNzQ29sbGVjdG9yQ29uZmlndXJhdGlvblxyXG4gKi9cclxuZXhwb3J0IGludGVyZmFjZSBJRkVBbmFseXRpY3NDb2xsZWN0b3JDb25maWd1cmF0aW9uIHtcclxuICAgIC8qKlxyXG4gICAgICogVXJsIGZvciBzZXJ2ZXIgdG8gc2VuZGluZyBtZXNzYWdlc1xyXG4gICAgICpcclxuICAgICAqIEB0eXBlIHtzdHJpbmd9QG1lbWJlcm9mIElGRUFuYWx5dGljc0NvbGxlY3RvckNvbmZpZ3VyYXRpb25cclxuICAgICAqL1xyXG4gICAgdXJsOiBzdHJpbmc7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBamF4IHJlcXVlc3QgdGltZW91dFxyXG4gICAgICpcclxuICAgICAqIEB0eXBlIHtudW1iZXJ9QG1lbWJlcm9mIElGRUFuYWx5dGljc0NvbGxlY3RvckNvbmZpZ3VyYXRpb25cclxuICAgICAqL1xyXG4gICAgdGltZW91dD86IG51bWJlcjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEFwaUtleSBpcyB1c2VkIGZvciBBdWRpdE1lc3NhZ2VzXHJcbiAgICAgKlxyXG4gICAgICogQHR5cGUge3N0cmluZ31cclxuICAgICAqIEBtZW1iZXJvZiBJRkVBbmFseXRpY3NDb2xsZWN0b3JDb25maWd1cmF0aW9uXHJcbiAgICAgKi9cclxuICAgIGF1ZGl0QXBpS2V5Pzogc3RyaW5nO1xyXG59XHJcblxyXG4vKipcclxuICogRGVmYXVsdCB2YWx1ZXMgZm9yIGNvbmZpZ3VyYXRpb25zXHJcbiAqXHJcbiAqIEBpbnRlcm5hbFxyXG4gKiBAY2xhc3MgRkVBbmFseXRpY3NDb2xsZWN0b3JDb25maWd1cmF0aW9uXHJcbiAqIEBpbXBsZW1lbnRzIHtJRkVBbmFseXRpY3NDb2xsZWN0b3JDb25maWd1cmF0aW9ufVxyXG4gKi9cclxuY2xhc3MgRkVBbmFseXRpY3NDb2xsZWN0b3JDb25maWd1cmF0aW9uIGltcGxlbWVudHMgSUZFQW5hbHl0aWNzQ29sbGVjdG9yQ29uZmlndXJhdGlvbiB7XHJcbiAgICBwdWJsaWMgdXJsOiBzdHJpbmc7XHJcblxyXG4gICAgcHVibGljIHRpbWVvdXQ6IG51bWJlciA9IDIwMDA7XHJcblxyXG4gICAgcHVibGljIGF1ZGl0QXBpS2V5OiBzdHJpbmcgPSAnZmUtZGF0YSc7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBGb3JtYWwgdmFsaWRhdGlvbiBvZiBjdXJyZW50IGNvbmZpZ3VyYXRpb25cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgRkVBbmFseXRpY3NDb2xsZWN0b3JDb25maWd1cmF0aW9uXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyB2YWxpZGF0ZShsb2dnZXI6IElMb2dnZXIpIHtcclxuICAgICAgICBpZiAoIXRoaXMudXJsKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IG1lc3NhZ2UgPSAnVXJsIGZvciBGRSBBbmFseXRpY3MgQ29sbGVjdG9yIGlzIG5vdCBzZXR0ZWQnO1xyXG4gICAgICAgICAgICBsb2dnZXIuZmF0YWwobWVzc2FnZSk7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihtZXNzYWdlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBSZWFsIG1lc3NhZ2VzIHNlbmRlciB0byBCRSBzZXJ2ZXJzXHJcbiAqXHJcbiAqIEBpbnRlcm5hbFxyXG4gKiBAbGluayBodHRwczovL2NvbmZsdWVuY2UuYWdvZGEubG9jYWwvZGlzcGxheS9BRFBNRVMvRkUrQW5hbHl0aWNzK0NvbGxlY3RvcnMrRm9ybWF0XHJcbiAqIEBjbGFzcyBQb3J0RW5kcG9pbnRcclxuICovXHJcbmV4cG9ydCBjbGFzcyBGRUFuYWx5dGljc0NvbGxlY3RvckVuZHBvaW50IGltcGxlbWVudHMgSUVuZHBvaW50IHtcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgX2NvbmZpZyA9IG5ldyBGRUFuYWx5dGljc0NvbGxlY3RvckNvbmZpZ3VyYXRpb24oKTtcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgX3NlcmlhbGl6ZXI6IEVudmVsb3BTZXJpYWxpemVyO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgX2FqYXg6IElBamF4UHJvdmlkZXIsXHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBfdGltZXN0YW1wOiBJVGltZVN0YW1wUHJvdmlkZXIsXHJcbiAgICAgICAgX2xvZ2dlcjogSUxvZ2dlcixcclxuICAgICAgICBjb25maWc6IElGRUFuYWx5dGljc0NvbGxlY3RvckNvbmZpZ3VyYXRpb24sXHJcbiAgICAgICAgZW52aXJvbm1lbnQ6IElGRUFuYWx5dGljc0NvbGxlY3RvckVudmlyb25tZW50XHJcbiAgICApIHtcclxuICAgICAgICAgb3ZlcnJpZGUodGhpcy5fY29uZmlnLCBjb25maWcpO1xyXG4gICAgICAgICB0aGlzLl9jb25maWcudmFsaWRhdGUoX2xvZ2dlcik7XHJcblxyXG4gICAgICAgICB0aGlzLl9zZXJpYWxpemVyID0gbmV3IEVudmVsb3BTZXJpYWxpemVyKGVudmlyb25tZW50LmFwaUtleSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNlbmQoYmF0Y2g6IEJhdGNoKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgY29uc3QgYm9keSA9IHRoaXMuc2VyaWFsaXplKGJhdGNoKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2FqYXguc2VuZCh7XHJcbiAgICAgICAgICAgIHR5cGU6ICdQT1NUJyxcclxuICAgICAgICAgICAgdXJsOiBgJHt0aGlzLl9jb25maWcudXJsfS92Ml8xP3A9anMmdj0ke2VuY29kZVVSSUNvbXBvbmVudChWZXJzaW9uKX0mdD0ke3RoaXMuX3RpbWVzdGFtcC5ub3coKX1gLFxyXG4gICAgICAgICAgICBib2R5LFxyXG4gICAgICAgICAgICB0aW1lb3V0OiB0aGlzLl9jb25maWcudGltZW91dFxyXG4gICAgICAgIH0pIGFzIFByb21pc2U8YW55PjtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNlcmlhbGl6ZShiYXRjaDogQmF0Y2gpOiBzdHJpbmcge1xyXG4gICAgICAgIGxldCBsaW5lcyA9IHRoaXMuYXVkaXQoYmF0Y2gpO1xyXG4gICAgICAgIGxpbmVzICs9IGBcXG5cXG57fVxcbmA7XHJcbiAgICAgICAgZm9yIChjb25zdCBlbnZlbG9wIG9mIGJhdGNoLmVudmVsb3BzKSB7XHJcbiAgICAgICAgICAgIGxpbmVzICs9IHRoaXMuX3NlcmlhbGl6ZXIuc2VyaWFsaXplKGVudmVsb3ApICsgJ1xcbic7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBsaW5lcztcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGF1ZGl0KGJhdGNoOiBCYXRjaCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KGJhdGNoLmF1ZGl0cyB8fCB7fSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIEVudmVsb3BTZXJpYWxpemVyIHtcclxuICAgIHByaXZhdGUgc3RhdGljIE1lc3NhZ2VUeXBlczoge1trZXkgaW4gTWVzc2FnZVR5cGUgfCAnZGVmYXVsdCddOiBudW1iZXIgfSA9IHtcclxuICAgICAgICBtZWFzdXJlbWVudCA6IDAsXHJcbiAgICAgICAgbG9nIDogMixcclxuICAgICAgICBkZWZhdWx0OiAxXHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgX2FwaUtleTogc3RyaW5nXHJcbiAgICApIHsgfVxyXG5cclxuICAgIHB1YmxpYyBzZXJpYWxpemUoZW52ZWxvcDogSUVudmVsb3ApOiBzdHJpbmcgIHtcclxuICAgICAgICBjb25zdCBwYXJ0cyA9IG5ldyBBcnJheTxzdHJpbmc+KCk7XHJcblxyXG4gICAgICAgIHBhcnRzLnB1c2goKGVudmVsb3AudGltZXN0YW1wIHx8IDApLnRvU3RyaW5nKCkpOyAvLyB0aW1lU3RhbXBcclxuICAgICAgICBwYXJ0cy5wdXNoKHRoaXMuX2FwaUtleSk7IC8vIGFwaWtleVxyXG4gICAgICAgIHBhcnRzLnB1c2goZW52ZWxvcC5uYW1lKTsgLy8gbWVzc2FnZV9uYW1lXHJcbiAgICAgICAgcGFydHMucHVzaCgnJyk7IC8vIHBhcnRpdGlvbl9rZXlcclxuICAgICAgICBwYXJ0cy5wdXNoKHRoaXMudHlwZShlbnZlbG9wKSk7IC8vIG1lc3NhZ2UgdHlwZVxyXG4gICAgICAgIHBhcnRzLnB1c2goZW52ZWxvcC5pZCk7IC8vIHV1aWRcclxuICAgICAgICBwYXJ0cy5wdXNoKEpTT04uc3RyaW5naWZ5KGVudmVsb3AubWVzc2FnZSwgdGhpcy52YWx1ZUZpbHRlcikpOyAvLyBwYXlsb2FkXHJcblxyXG4gICAgICAgIHJldHVybiBwYXJ0cy5qb2luKCcsJyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB0eXBlKGVudmVsb3A6IElFbnZlbG9wKTogc3RyaW5nIHtcclxuICAgICAgICBsZXQgaW5kZXggPSBFbnZlbG9wU2VyaWFsaXplci5NZXNzYWdlVHlwZXNbZW52ZWxvcC50eXBlXTtcclxuXHJcbiAgICAgICAgaW5kZXggPSBpbmRleCA9PT0gdW5kZWZpbmVkID8gRW52ZWxvcFNlcmlhbGl6ZXIuTWVzc2FnZVR5cGVzWydkZWZhdWx0J10gOiBpbmRleDtcclxuXHJcbiAgICAgICAgcmV0dXJuIGluZGV4LnRvU3RyaW5nKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB2YWx1ZUZpbHRlciA9IChrZXk6IHN0cmluZywgdmFsdWU6IGFueSk6IGFueSA9PiB7XHJcbiAgICAgICAgaWYgKHZhbHVlID09PSBudWxsXHJcbiAgICAgICAgICAgIHx8ICh0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInICYmIGlzTmFOKHZhbHVlKSkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvaWZkZWYtbG9hZGVyL2lmZGVmLWxvYWRlci5qcz9ERUJVRz10cnVlJlBFUkZPUk1BTkNFX0FVRElUPXRydWUhLi9zcmMvcHJvY2Vzc2luZy9lbmRwb2ludHMvZmUtYW5hbHl0aWNzLWNvbGxlY3Rvci9mZS1hbmFseXRpY3MtY29sbGVjdG9yLWVuZHBvaW50LnRzIiwiLyoqXHJcbiAqIFZlcnNpb24gb2YgdGhlIGxpYnJhcnlcclxuICpcclxuICogVGhpcyBmaWxlIGlzIGVkaXRlZCBpbiBUZWFtQ2l0eSBzZXJ2ZXIgYmVmb3JlIGVhY2ggYnVpbGQuXHJcbiAqXHJcbiAqIEBpbnRlcm5hbFxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IFZlcnNpb24gPSAnMC4wLjEnO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvaWZkZWYtbG9hZGVyL2lmZGVmLWxvYWRlci5qcz9ERUJVRz10cnVlJlBFUkZPUk1BTkNFX0FVRElUPXRydWUhLi9zcmMvdmVyc2lvbi50cyIsImltcG9ydCB7IG92ZXJyaWRlIH0gZnJvbSAnLi4vZnJhbWV3b3JrL2luZGV4JztcclxuaW1wb3J0IHsgSVBpcGVTdGF0c1JlcG9zaXRvcnkgfSBmcm9tICcuL2F1ZGl0L3N0YXRzL3BpcGUtc3RhdHMnO1xyXG5cclxuLyoqXHJcbiAqIENvbmZpZ3VyYXRpb25zIGZvciBGbHVzaFRpbWVcclxuICovXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUZsdXNoVGltZUNvbmZpZ3VyYXRpb24ge1xyXG4gICAgLyoqXHJcbiAgICAgKiBUaW1lIGludGVydmFsIHRvIHNlbmQgZGF0YSBmcm9tIHRoZSBxdWV1ZSB0byBhbiBlbmRwb2ludFxyXG4gICAgICovXHJcbiAgICBmbHVzaFRpbWU/OiBudW1iZXI7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBNYXhpbXVtIGZsdXNoIHRpbWUgdGhhdCBhbGxvd2VkIGZvciB0aGlzIHF1ZXVlXHJcbiAgICAgKi9cclxuICAgIG1heEZsdXNoVGltZT86IG51bWJlcjtcclxufVxyXG5cclxuLyoqXHJcbiAqIENsYXNzIGRlZmluZSBkZWFmdWx0IHZhbHVlcyBmb3IgY29uZmlndXJhdGlvbnNcclxuICpcclxuICogQGludGVybmFsXHJcbiAqL1xyXG5jbGFzcyBGbHVzaFRpbWVDb25maWd1cmF0aW9uIGltcGxlbWVudHMgSUZsdXNoVGltZUNvbmZpZ3VyYXRpb24ge1xyXG4gICAgcHVibGljIGZsdXNoVGltZTogbnVtYmVyID0gMTAwMDtcclxuXHJcbiAgICBwdWJsaWMgbWF4Rmx1c2hUaW1lOiBudW1iZXIgPSAzMDAwMDtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJRmx1c2hUaW1lU3RyYXRlZ3kge1xyXG4gICAgZHVyYXRpb24oKTogUHJvbWlzZTxudW1iZXI+O1xyXG5cclxuICAgIHN5bmNUaW1lKCk6IG51bWJlcjtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIER5bmFtaWNGbHVzaFRpbWVTdHJhdGVneSBpbXBsZW1lbnRzIElGbHVzaFRpbWVTdHJhdGVneSB7XHJcbiAgICBwcm90ZWN0ZWQgcmVhZG9ubHkgX2NvbmZpZzogRmx1c2hUaW1lQ29uZmlndXJhdGlvbiA9IG5ldyBGbHVzaFRpbWVDb25maWd1cmF0aW9uKCk7XHJcblxyXG4gICAgcHJpdmF0ZSBfbGFzdEZsdXNoVGltZTogbnVtYmVyO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgX3JlcG86IElQaXBlU3RhdHNSZXBvc2l0b3J5LFxyXG4gICAgICAgIHJlYWRvbmx5IGNvbmZpZzogSUZsdXNoVGltZUNvbmZpZ3VyYXRpb24gfCBudWxsID0gbnVsbFxyXG4gICAgKSB7XHJcbiAgICAgICAgb3ZlcnJpZGUodGhpcy5fY29uZmlnLCBjb25maWcpO1xyXG4gICAgICAgIHRoaXMuX2xhc3RGbHVzaFRpbWUgPSB0aGlzLl9jb25maWcuZmx1c2hUaW1lO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhc3luYyBkdXJhdGlvbigpOiBQcm9taXNlPG51bWJlcj4ge1xyXG4gICAgICAgIGNvbnN0IHN0YXRzID0gYXdhaXQgdGhpcy5fcmVwby5yZWFkKCk7XHJcbiAgICAgICAgbGV0IGZsdXNoVGltZTtcclxuICAgICAgICBpZiAoIXN0YXRzLnN0YXRpc3RpYy5sYXN0U2VuZGluZ1N1Y2Nlc3MpIHtcclxuICAgICAgICAgICAgY29uc3QgZmFjdG9yID0gTWF0aC5tYXgoc3RhdHMuc3RhdGlzdGljLnJlcXVlc3RFcnJvckNvdW50LCAxKTtcclxuICAgICAgICAgICAgZmx1c2hUaW1lID0gTWF0aC5taW4odGhpcy5fY29uZmlnLmZsdXNoVGltZSAqIGZhY3RvciwgdGhpcy5fY29uZmlnLm1heEZsdXNoVGltZSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgZmx1c2hUaW1lID0gdGhpcy5fY29uZmlnLmZsdXNoVGltZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2xhc3RGbHVzaFRpbWUgPSBmbHVzaFRpbWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN5bmNUaW1lKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIE1hdGgubWF4KHRoaXMuX2xhc3RGbHVzaFRpbWUgKiAyMCwgdGhpcy5fY29uZmlnLm1heEZsdXNoVGltZSArIDUpO1xyXG4gICAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy9pZmRlZi1sb2FkZXIvaWZkZWYtbG9hZGVyLmpzP0RFQlVHPXRydWUmUEVSRk9STUFOQ0VfQVVESVQ9dHJ1ZSEuL3NyYy9wcm9jZXNzaW5nL2ZsdXNoLXRpbWUtc3RyYXRlZ3kudHMiLCJpbXBvcnQgeyBHdWlkUHJvdmlkZXIgfSBmcm9tICcuL2d1aWQnO1xyXG5pbXBvcnQgeyBVbmxvYWRFdmVudCB9IGZyb20gJy4vdW5sb2FkLWV2ZW50JztcclxuaW1wb3J0IHsgV2ViU3RvcmFnZXMgfSBmcm9tICcuL3dlYnN0b3JhZ2UnO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJU3luY1BvaW50IHtcclxuICAgIC8qKlxyXG4gICAgICogQ2FwdHVyZSB0aGUgY3VycmVudCBhY3Rpdml0eSBmcm9tIGFsbCB0YWJcclxuICAgICAqL1xyXG4gICAgY2FwdHVyZShkdXJhdGlvbjogbnVtYmVyKTogYm9vbGVhbjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFVuY2FwdHVyZSBjdXJyZW50IHR1YiBpZiBpdCBpcyBhY3RpdmVcclxuICAgICAqL1xyXG4gICAgZGlzcG9zZSgpOiB2b2lkO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgTG9jYWxTdG9yYWdlVGFiU3luY1BvaW50IGltcGxlbWVudHMgSVN5bmNQb2ludCB7XHJcbiAgICBwcml2YXRlIHN0YXRpYyByZWFkb25seSB0YWJJZCA9IEd1aWRQcm92aWRlci5kZWZhdWx0Lm5leHQoKTtcclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBhbGxZS2V5czogeyBbeUtleTogc3RyaW5nXTogYm9vbGVhbiB9ID0geyB9O1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgc3Vic2NyaWJlZDogYm9vbGVhbjtcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgX2tleXM6IElNdXRleEtleXM7XHJcbiAgICBwcml2YXRlIF9pc0NhcHR1cmVkOiBib29sZWFuO1xyXG4gICAgcHJpdmF0ZSBfZGlzcG9zZWQ6IGJvb2xlYW47XHJcblxyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHVibGljIHRhc2tJZDogc3RyaW5nLFxyXG4gICAgICAgIHByaXZhdGUgX3N0b3JhZ2U6IFN0b3JhZ2UgfCBudWxsID0gV2ViU3RvcmFnZXMubG9jYWxTdG9yYWdlXHJcbiAgICApIHtcclxuICAgICAgICB0aGlzLl9rZXlzID0ge1xyXG4gICAgICAgICAgICB4OiAnbWNqcy1tdXRleC14OicgKyB0YXNrSWQsXHJcbiAgICAgICAgICAgIHk6ICdtY2pzLW11dGV4LXk6JyArIHRhc2tJZFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgaWYgKHRoaXMuX3N0b3JhZ2UgJiYgIUxvY2FsU3RvcmFnZVRhYlN5bmNQb2ludC5zdWJzY3JpYmVkKSB7XHJcbiAgICAgICAgICAgIExvY2FsU3RvcmFnZVRhYlN5bmNQb2ludC5zdWJzY3JpYmUodGhpcy5fc3RvcmFnZSk7XHJcbiAgICAgICAgICAgIExvY2FsU3RvcmFnZVRhYlN5bmNQb2ludC5zdWJzY3JpYmVkID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDYXB0dXJlIHRhc2sgSUQgYmV0d2VlbiBhbGwgb3BlbmVkIHRhYnMgb2YgdGhlIGN1cnJlbnQgZG9tYWluLlxyXG4gICAgICogT24gdW5udWNjZXNzYWJsZSBsb2NhbFN0b3JhZ2UgcmV0dXJuIHRydWU7XHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHRhc2tJZCAtIFVuaXF1ZSB0YXNrIElEXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gW2R1cmF0aW9uPTIwMDAwXSAtIE1heGltdW0gdGltZSBmb3IgY2FwdHVyZSB0aGUgYWN0aXZhdGlvbiBpbiBtc1xyXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgY3VycmVudCB0YWIgaXMgYWN0aXZlIGZvciB0aGUgdGFza1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgY2FwdHVyZShkdXJhdGlvbjogbnVtYmVyID0gMTAwMCAqIDIwKTogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9zdG9yYWdlIHx8IHRoaXMuX2Rpc3Bvc2VkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3Qgc3RvcmFnZSA9IHRoaXMuX3N0b3JhZ2U7XHJcblxyXG4gICAgICAgIGNvbnN0IG11dGV4WEtleSA9IHRoaXMuX2tleXMueDtcclxuICAgICAgICBjb25zdCBtdXRleFlLZXkgPSB0aGlzLl9rZXlzLnk7XHJcblxyXG4gICAgICAgIGNvbnN0IHRhYklkID0gTG9jYWxTdG9yYWdlVGFiU3luY1BvaW50LnRhYklkO1xyXG4gICAgICAgIGNvbnN0IG5vdyA9ICtuZXcgRGF0ZSgpO1xyXG5cclxuICAgICAgICBzdG9yYWdlLnNldEl0ZW0obXV0ZXhYS2V5LCB0YWJJZCk7XHJcbiAgICAgICAgY29uc3Qgc3RyWSA9IHN0b3JhZ2UuZ2V0SXRlbShtdXRleFlLZXkpO1xyXG4gICAgICAgIGNvbnN0IG11dGV4WSA9IHN0clkgPyBKU09OLnBhcnNlKHN0clkpIGFzIElNdXRleERhdGEgOiBudWxsO1xyXG5cclxuICAgICAgICBjb25zdCBkdXIgPSBtdXRleFkgPyBNYXRoLmFicyhub3cgLSBtdXRleFkudGltZSkgOiBOYU47XHJcbiAgICAgICAgY29uc3QgY2FwdHVyZWQgPSAhbXV0ZXhZIHx8IG11dGV4WS5pZCA9PT0gdGFiSWQgfHwgZHVyID4gZHVyYXRpb247XHJcblxyXG4gICAgICAgIGlmIChjYXB0dXJlZCkge1xyXG4gICAgICAgICAgICBjb25zdCB2YWwgPSBKU09OLnN0cmluZ2lmeSh7IGlkOiB0YWJJZCwgdGltZTogbm93IH0gYXMgSU11dGV4RGF0YSk7XHJcbiAgICAgICAgICAgIHN0b3JhZ2Uuc2V0SXRlbShtdXRleFlLZXksIHZhbCk7XHJcbiAgICAgICAgICAgIExvY2FsU3RvcmFnZVRhYlN5bmNQb2ludC5hbGxZS2V5c1t0aGlzLl9rZXlzLnldID0gdHJ1ZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBMb2NhbFN0b3JhZ2VUYWJTeW5jUG9pbnQuYWxsWUtleXNbdGhpcy5fa2V5cy55XSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5faXNDYXB0dXJlZCA9IGNhcHR1cmVkICYmIChzdG9yYWdlLmdldEl0ZW0obXV0ZXhYS2V5KSA9PT0gdGFiSWQpO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5faXNDYXB0dXJlZDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZGlzcG9zZSgpIHtcclxuICAgICAgICBpZiAodGhpcy5fc3RvcmFnZSAmJiB0aGlzLl9pc0NhcHR1cmVkICYmICF0aGlzLl9kaXNwb3NlZCkge1xyXG4gICAgICAgICAgICB0aGlzLl9zdG9yYWdlLnJlbW92ZUl0ZW0odGhpcy5fa2V5cy55KTtcclxuICAgICAgICAgICAgdGhpcy5faXNDYXB0dXJlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLl9kaXNwb3NlZCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTptZW1iZXItb3JkZXJpbmdcclxuICAgIHByaXZhdGUgc3RhdGljIHN1YnNjcmliZShzdG9yYWdlOiBTdG9yYWdlKSB7XHJcbiAgICAgICAgVW5sb2FkRXZlbnQuYWRkTGlzdGVuZXIoKCkgPT4ge1xyXG4gICAgICAgICAgICBMb2NhbFN0b3JhZ2VUYWJTeW5jUG9pbnQudW5jYXB0dXJlQWxsKHN0b3JhZ2UpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTptZW1iZXItb3JkZXJpbmdcclxuICAgIHB1YmxpYyBzdGF0aWMgdW5jYXB0dXJlQWxsKHN0b3JhZ2U6IFN0b3JhZ2UpIHtcclxuICAgICAgICBjb25zdCBrZXlzID0gTG9jYWxTdG9yYWdlVGFiU3luY1BvaW50LmFsbFlLZXlzO1xyXG4gICAgICAgIGZvciAoY29uc3Qga2V5IGluIGtleXMpIHtcclxuICAgICAgICAgICAgaWYgKGtleXMuaGFzT3duUHJvcGVydHkoa2V5KSAmJiBrZXlzW2tleV0pIHtcclxuICAgICAgICAgICAgICAgIHN0b3JhZ2UucmVtb3ZlSXRlbShrZXkpO1xyXG4gICAgICAgICAgICAgICAga2V5c1trZXldID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmludGVyZmFjZSBJTXV0ZXhEYXRhIHtcclxuICAgIGlkOiBzdHJpbmc7XHJcblxyXG4gICAgdGltZTogbnVtYmVyO1xyXG59XHJcblxyXG5pbnRlcmZhY2UgSU11dGV4S2V5cyB7XHJcbiAgICB4OiBzdHJpbmc7XHJcblxyXG4gICAgeTogc3RyaW5nO1xyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy9pZmRlZi1sb2FkZXIvaWZkZWYtbG9hZGVyLmpzP0RFQlVHPXRydWUmUEVSRk9STUFOQ0VfQVVESVQ9dHJ1ZSEuL3NyYy9mcmFtZXdvcmsvdGFiLXN5bmMtcG9pbnQudHMiLCJpbXBvcnQgeyBJRW52ZWxvcFF1ZXVlIH0gZnJvbSAnLi4vLi4vZW52ZWxvcC1xdWV1ZSc7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElQaXBlU3RhdHNQcm92aWRlciB7XHJcbiAgICBnZXQocXVldWU6IElFbnZlbG9wUXVldWUpOiBJUGlwZVN0YXRzUmVwb3NpdG9yeTtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJUGlwZVN0YXRzUmVwb3NpdG9yeSB7XHJcbiAgICByZWFkKCk6IFByb21pc2U8SVBpcGVTdGF0cz47XHJcblxyXG4gICAgdXBkYXRlPFQ+KGFjdGlvbjogKHN0YXRzOiBJUGlwZVN0YXRzKSA9PiBUKTogUHJvbWlzZTxUPjtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJUGlwZVBlcnNpc3RlbnRTdGF0cyB7XHJcbiAgICAvKipcclxuICAgICAqIFVuaXF1ZSBDbGllbnQgSWRcclxuICAgICAqL1xyXG4gICAgcmVhZG9ubHkgY2xpZW50SWQ6IHN0cmluZztcclxuXHJcbiAgICAvKipcclxuICAgICAqIFF1ZXVlIG5hbWUgZnJvbSBjb25maWd1cmF0aW9uXHJcbiAgICAgKi9cclxuICAgIHJlYWRvbmx5IHF1ZXVlSWQ6IHN0cmluZztcclxuXHJcbiAgICAvKipcclxuICAgICAqIEluY3JlbWVudGFsIG51bWJlciwgdW5pcXVlIGZvciBDbGllbnRJZFxyXG4gICAgICovXHJcbiAgICBiYXRjaEluZGV4OiBudW1iZXI7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUb3RhbCBNZXNzYWdlIENvdW50IChoaXN0b3JpY2FsIHBlciBDbGllbnRJRCBhbmQgUXVldWVJRClcclxuICAgICAqL1xyXG4gICAgdG90YWxNZXNzYWdlQ291bnQ6IG51bWJlcjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRvdGFsIFJlcXVlc3QgRXJyb3IgQ291bnQgKGhpc3RvcmljYWwgcGVyIENsaWVudElEIGFuZCBRdWV1ZUlEKVxyXG4gICAgICovXHJcbiAgICB0b3RhbFJlcXVlc3RFcnJvckNvdW50OiBudW1iZXI7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXF1ZXN0IEVycm9yIENvdW50IChzY2llbmNlIGxhc3Qgc3VjY2VzcylcclxuICAgICAqL1xyXG4gICAgcmVxdWVzdEVycm9yQ291bnQ6IG51bWJlcjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIExhc3QgZXJyb3IgaXMgc3VjY2Vzc1xyXG4gICAgICovXHJcbiAgICBsYXN0U2VuZGluZ1N1Y2Nlc3M6IGJvb2xlYW47XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSVBpcGVTdGF0ZSB7XHJcbiAgICAvKipcclxuICAgICAqIFF1ZXVlIFNpemUgKG1heGltdW0gYWxsb3dlZCBtZXNzYWdlIGNvdW50IGluIHRoZSBxdWV1ZSlcclxuICAgICAqL1xyXG4gICAgcmVhZG9ubHkgcXVldWVTaXplOiBudW1iZXI7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBRdWV1ZSBNZXNzYWdlIENvdW50IChjdXJyZW50IG1lc3NhZ2UgY291bnQgaW4gdGhlIHF1ZXVlKVxyXG4gICAgICovXHJcbiAgICByZWFkb25seSBxdWV1ZU1lc3NhZ2VDb3VudDogbnVtYmVyO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElQaXBlU3RhdHMge1xyXG4gICAgcmVhZG9ubHkgc3RhdGU6IElQaXBlU3RhdGU7XHJcblxyXG4gICAgcmVhZG9ubHkgc3RhdGlzdGljOiBJUGlwZVBlcnNpc3RlbnRTdGF0cztcclxufVxyXG5cclxuZXhwb3J0IGVudW0gQWpheFJlcXVlc3RTdGF0dXNSZXN1bHQge1xyXG4gICAgU3VjY2VzcyA9IDAsXHJcblxyXG4gICAgTmV0d29ya0Vycm9yID0gMVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy9pZmRlZi1sb2FkZXIvaWZkZWYtbG9hZGVyLmpzP0RFQlVHPXRydWUmUEVSRk9STUFOQ0VfQVVESVQ9dHJ1ZSEuL3NyYy9wcm9jZXNzaW5nL2F1ZGl0L3N0YXRzL3BpcGUtc3RhdHMudHMiLCJpbXBvcnQgeyBJQWpheE9wdGlvbnMsIElBamF4UHJvdmlkZXIgfSBmcm9tICcuLi8uLi9mcmFtZXdvcmsnO1xyXG5pbXBvcnQgeyBXb3JrZXJSZXF1ZXN0U2VuZGVyIH0gZnJvbSAnLi4vLi4vd29ya2Vycy9zZW5kZXJzL3dvcmtlci1yZXF1ZXN0LXNlbmRlcic7XHJcbmltcG9ydCB7IENvbnRleHQgfSBmcm9tICcuLi9jb250ZXh0JztcclxuXHJcbi8qKlxyXG4gKiBSZXNlbmQgYWxsIHJlcXVlc3QgdG8gYSBwb3J0XHJcbiAqXHJcbiAqIEBpbnRlcm5hbFxyXG4gKiBAY2xhc3MgUG9ydEFqYXhQcm92aWRlclxyXG4gKiBAaW1wbGVtZW50cyB7SUFqYXhQcm92aWRlcn1cclxuICovXHJcbmV4cG9ydCBjbGFzcyBQb3J0QWpheFByb3ZpZGVyIGltcGxlbWVudHMgSUFqYXhQcm92aWRlciB7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9zZW5kZXI6IFdvcmtlclJlcXVlc3RTZW5kZXI8J2FqYXgnLCBJQWpheE9wdGlvbnMsIHN0cmluZz47XHJcblxyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBfY29udGV4dDogQ29udGV4dCxcclxuICAgICkge1xyXG4gICAgICAgIHRoaXMuX3NlbmRlciA9IG5ldyBXb3JrZXJSZXF1ZXN0U2VuZGVyKCdhamF4JywgdGhpcy5fY29udGV4dC5zZW5kZXIsIHRoaXMuX2NvbnRleHQucmVjZWl2ZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhc3luYyBzZW5kKG9wdGlvbnM6IElBamF4T3B0aW9ucyk6IFByb21pc2U8c3RyaW5nPiB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlPHN0cmluZz4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLl9zZW5kZXIuc2VuZChvcHRpb25zLCByZXNvbHZlLCByZWplY3QpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy9pZmRlZi1sb2FkZXIvaWZkZWYtbG9hZGVyLmpzP0RFQlVHPXRydWUmUEVSRk9STUFOQ0VfQVVESVQ9dHJ1ZSEuL3NyYy9wcm9jZXNzaW5nL2J1aWxkZXJzL3BvcnQtYWpheC1wcm92aWRlci50cyIsImltcG9ydCB7IElXb3JrZXJNZXNzYWdlUmVjZWl2ZXIsIElXb3JrZXJNZXNzYWdlU2VuZGVyIH0gZnJvbSAnLi4vd29ya2Vycy93b3JrZXItZGVmaW5pdGlvbnMnO1xyXG5cclxuZXhwb3J0IGNsYXNzIENvbnRleHQge1xyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IHNlbmRlcjogSVdvcmtlck1lc3NhZ2VTZW5kZXIsXHJcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IHJlY2VpdmVyOiBJV29ya2VyTWVzc2FnZVJlY2VpdmVyXHJcbiAgICApIHt9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL2lmZGVmLWxvYWRlci9pZmRlZi1sb2FkZXIuanM/REVCVUc9dHJ1ZSZQRVJGT1JNQU5DRV9BVURJVD10cnVlIS4vc3JjL3Byb2Nlc3NpbmcvY29udGV4dC50cyIsImltcG9ydCB7IElNZXNzYWdlIH0gZnJvbSAnLi4vZGVmaW5pdGlvbnMnO1xyXG5pbXBvcnQgeyBpc0FzeW5jQWxsIH0gZnJvbSAnLi4vZnJhbWV3b3JrL3N5bmMnO1xyXG5pbXBvcnQgeyBJTWVzc2VuZ2VyUGVyZm9ybWFuY2VBdWRpdG9yLCBJTWVzc2VuZ2VyU3RhdGlzdGljQXVkaXRvciB9IGZyb20gJy4vYXVkaXQvYXVkaXRvcnMvbWVzc2VuZ2VyJztcclxuaW1wb3J0IHsgRW52ZWxvcCB9IGZyb20gJy4vZW52ZWxvcCc7XHJcbmltcG9ydCB7IElFbnZlbG9wUXVldWUgfSBmcm9tICcuL2VudmVsb3AtcXVldWUnO1xyXG5pbXBvcnQgeyBJUG9zdG1hbiB9IGZyb20gJy4vcG9zdG1hbic7XHJcbmltcG9ydCB7IElSb3V0ZXIgfSBmcm9tICcuL3JvdXRlcic7XHJcblxyXG4vKipcclxuICogQGludGVybmFsXHJcbiAqIEBjbGFzcyBNZXNzZW5nZXJcclxuICovXHJcbmV4cG9ydCBjbGFzcyBNZXNzZW5nZXIge1xyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBfcm91dGVyOiBJUm91dGVyLFxyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgX3Bvc3RtYXN0ZXI6IElQb3N0bWFuLFxyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgX3N0YXRpc3RpY0F1ZGl0b3I6IElNZXNzZW5nZXJTdGF0aXN0aWNBdWRpdG9yLFxyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgX3BlcmZvcm1hbmNlQXVkaXRvcjogSU1lc3NlbmdlclBlcmZvcm1hbmNlQXVkaXRvcixcclxuICAgICkgeyB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZW5kIGFsbCB1c2VyIG1lc3NhZ2VzIHRvIHRoZSBkZXN0aW5hdGlvbnMgcXVldWVzXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhc3luYyBzZW5kKG1lc3NhZ2VzOiBBcnJheTxJTWVzc2FnZT4pOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICBjb25zdCBhdWRpdG9yID0gdGhpcy5fcGVyZm9ybWFuY2VBdWRpdG9yLnN0YXJ0ZWQoKTtcclxuXHJcbiAgICAgICAgLy8gR3JvdXAgb2YgZW52ZWxvcHMgYnkgdGhlaXIgZGVzdGluYXRpb24gcXVldWVcclxuICAgICAgICBjb25zdCBncm91cCA9IG5ldyBNYXA8SUVudmVsb3BRdWV1ZSwgQXJyYXk8RW52ZWxvcD4+KCk7XHJcblxyXG4gICAgICAgIGZvciAoY29uc3QgbWVzc2FnZSBvZiBtZXNzYWdlcykge1xyXG4gICAgICAgICAgICAvLyBTZWFsIHRoZSBtZXNzYWdlXHJcbiAgICAgICAgICAgIGNvbnN0IGVudmVsb3AgPSB0aGlzLl9wb3N0bWFzdGVyLnNlYWwobWVzc2FnZSk7XHJcblxyXG4gICAgICAgICAgICAvLyBGaW5kIHF1ZXVlIGZvciB0aGUgZW52ZWxvcFxyXG4gICAgICAgICAgICBjb25zdCBxdWV1ZSA9IHRoaXMuX3JvdXRlci5yb3V0ZShlbnZlbG9wKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChxdWV1ZSkge1xyXG4gICAgICAgICAgICAgICAgLy8gUHV0IGVudmVsb3AgdG8gaXRzIHF1ZXVlIGdyb3VwXHJcbiAgICAgICAgICAgICAgICBsZXQgZW52ZWxvcHMgPSBncm91cC5nZXQocXVldWUpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGVudmVsb3BzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZW52ZWxvcHMucHVzaChlbnZlbG9wKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZW52ZWxvcHMgPSBbIGVudmVsb3AgXTtcclxuICAgICAgICAgICAgICAgICAgICBncm91cC5zZXQocXVldWUsIGVudmVsb3BzKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgZW5xdWluZ3MgPSBuZXcgQXJyYXk8QXJyYXk8UHJvbWlzZTx2b2lkPiB8IHZvaWQ+PigpO1xyXG5cclxuICAgICAgICBmb3IgKGNvbnN0IHF1ZXVlIG9mIGdyb3VwLmtleXMoKSkge1xyXG4gICAgICAgICAgICBjb25zdCBlbnZlbG9wcyA9IGdyb3VwLmdldChxdWV1ZSk7XHJcbiAgICAgICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xyXG4gICAgICAgICAgICBpZiAoZW52ZWxvcHMpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGVucXVpdWluZyA9IHF1ZXVlLmVucXVldWUoZW52ZWxvcHMpO1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgc3RhdGlzdGluZyA9IHRoaXMuX3N0YXRpc3RpY0F1ZGl0b3IuZW5xdWV1ZWQocXVldWUuaWQsIGVudmVsb3BzKTtcclxuXHJcbiAgICAgICAgICAgICAgICBlbnF1aW5ncy5wdXNoKFtlbnF1aXVpbmcsIHN0YXRpc3RpbmddKTtcclxuXHJcbiAgICAgICAgICAgICAgICBhdWRpdG9yLmVucXVldWVkKHF1ZXVlLmlkLCBlbnZlbG9wcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIEF3YWl0IGFsbCBvcGVyYXRpb25zIG9ubHkgaWYgdGhleSBhcmUgYXN5bmNocm9ub3VzXHJcbiAgICAgICAgZm9yIChjb25zdCBwcm9taXNlcyBvZiBlbnF1aW5ncykge1xyXG4gICAgICAgICAgICBpZiAoaXNBc3luY0FsbChwcm9taXNlcykpIHtcclxuICAgICAgICAgICAgICAgIGF3YWl0IFByb21pc2UuYWxsKGVucXVpbmdzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgYXVkaXRvci5jb21wbGV0ZWQoKTtcclxuICAgIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvaWZkZWYtbG9hZGVyL2lmZGVmLWxvYWRlci5qcz9ERUJVRz10cnVlJlBFUkZPUk1BTkNFX0FVRElUPXRydWUhLi9zcmMvcHJvY2Vzc2luZy9tZXNzZW5nZXIudHMiLCJleHBvcnQgZnVuY3Rpb24gc3luYzxUPihyZXN1bHQ6IFByb21pc2U8VD4gfCBUKTogVCB8IHVuZGVmaW5lZCB7XHJcbiAgICBpZiAocmVzdWx0IGluc3RhbmNlb2YgUHJvbWlzZSkge1xyXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaXNBc3luY0FsbChyZXN1bHRzOiBBcnJheTxQcm9taXNlPHZvaWQ+IHwgdm9pZD4pOiBib29sZWFuIHtcclxuICAgIGZvciAoY29uc3QgcmVzdWx0IG9mIHJlc3VsdHMpIHtcclxuICAgICAgICBpZiAocmVzdWx0IGluc3RhbmNlb2YgUHJvbWlzZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL2lmZGVmLWxvYWRlci9pZmRlZi1sb2FkZXIuanM/REVCVUc9dHJ1ZSZQRVJGT1JNQU5DRV9BVURJVD10cnVlIS4vc3JjL2ZyYW1ld29yay9zeW5jLnRzIiwiaW1wb3J0IHsgSU1lc3NhZ2VDb25maWd1cmF0aW9uLCBJTWVzc2FnZXNDb25maWd1cmF0aW9uIH0gZnJvbSAnLi4vY29uZmlndXJhdGlvbnMvbWVzc2FnZXMtY29uZmlndXJhdGlvbic7XHJcbmltcG9ydCB7IElFbnZlbG9wIH0gZnJvbSAnLi9lbnZlbG9wJztcclxuaW1wb3J0IHsgSUVudmVsb3BRdWV1ZSB9IGZyb20gJy4vZW52ZWxvcC1xdWV1ZSc7XHJcblxyXG4vKipcclxuICogUm91dGVyIHNob3VsZCBzZWxlY3QgcXVldWUgZm9yIGVudmVsb3BcclxuICpcclxuICogQGludGVybmFsXHJcbiAqIEBpbnRlcmZhY2UgSVJvdXRlclxyXG4gKi9cclxuZXhwb3J0IGludGVyZmFjZSBJUm91dGVyIHtcclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJuIHF1ZXVlIGZvciB0aGUgZW52ZWxvcC5cclxuICAgICAqIElmIHF1ZXVlIGlzIG5vdCBmb3VuZCAtIHJldHVybiBkZWZhdWx0IG9yIGFueSBvdGhlciBxdWV1ZVxyXG4gICAgICovXHJcbiAgICByb3V0ZShlbnZlbG9wOiBJRW52ZWxvcCk6IElFbnZlbG9wUXVldWUgfCB1bmRlZmluZWQ7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBSZWFsIGltcGVsZW1lbnRhdGlvbiBvZiBJUm91dGVyXHJcbiAqXHJcbiAqIEBpbnRlcm5hbFxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFJvdXRlciBpbXBsZW1lbnRzIElSb3V0ZXIge1xyXG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSBkZWZhdWx0OiBzdHJpbmcgPSAnZGVmYXVsdCc7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEaWN0aW9uYXJ5IG9mIG1lc3NhZ2UgY29uZmlndXJhdGlvbnMgYnkgbWVzc2FnZSB0eXBlXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgcmVhZG9ubHkgX3JvdXRlczogTWFwPHN0cmluZywgQXJyYXk8SU1lc3NhZ2VDb25maWd1cmF0aW9uPj47XHJcblxyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgY29uZmlndXJhdGlvbjogSU1lc3NhZ2VzQ29uZmlndXJhdGlvbixcclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IF9xdWV1ZXM6IE1hcDxzdHJpbmcsIElFbnZlbG9wUXVldWU+XHJcbiAgICApIHtcclxuICAgICAgICB0aGlzLl9yb3V0ZXMgPSBNZXNzYWdlQ29uZmlndXJhdGlvbnMuY3JlYXRlUm91dGVzKGNvbmZpZ3VyYXRpb24pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByb3V0ZShlbnZlbG9wOiBJRW52ZWxvcCk6IElFbnZlbG9wUXVldWUgfCB1bmRlZmluZWQge1xyXG4gICAgICAgIGNvbnN0IHF1ZXVlSWQgPSB0aGlzLmZpbmRRdWV1ZShlbnZlbG9wKSB8fCBSb3V0ZXIuZGVmYXVsdDtcclxuXHJcbiAgICAgICAgbGV0IHF1ZXVlID0gdGhpcy5fcXVldWVzLmdldChxdWV1ZUlkKTtcclxuXHJcbiAgICAgICAgaWYgKCFxdWV1ZSAmJiB0aGlzLl9xdWV1ZXMuc2l6ZSA+IDApIHtcclxuICAgICAgICAgICAgcXVldWUgPSB0aGlzLl9xdWV1ZXMudmFsdWVzKCkubmV4dCgpLnZhbHVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHF1ZXVlO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZmluZFF1ZXVlKGVudmVsb3A6IElFbnZlbG9wKTogc3RyaW5nIHwgbnVsbCB7XHJcbiAgICAgICAgY29uc3QgY29uZmlncyA9IHRoaXMuX3JvdXRlcy5nZXQoZW52ZWxvcC50eXBlKTtcclxuXHJcbiAgICAgICAgaWYgKCFjb25maWdzIHx8ICFjb25maWdzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZvciAoY29uc3QgY29uZmlnIG9mIGNvbmZpZ3MpIHtcclxuICAgICAgICAgICAgaWYgKCFjb25maWcucHJvcGVydGllcykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbmZpZy5xdWV1ZTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzTWF0Y2goZW52ZWxvcC5tZXNzYWdlLCBjb25maWcucHJvcGVydGllcykpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gY29uZmlnLnF1ZXVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGlzTWF0Y2gobWVzc2FnZTogYW55LCBwcm9wZXJ0aWVzOiBhbnksIGRlZXA6IG51bWJlciA9IDEwKTogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYgKGRlZXAgPT09IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmb3IgKGNvbnN0IG5hbWUgaW4gcHJvcGVydGllcykge1xyXG4gICAgICAgICAgICBpZiAocHJvcGVydGllcy5oYXNPd25Qcm9wZXJ0eShuYW1lKSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbWVzc2FnZVZhbHVlID0gbWVzc2FnZVtuYW1lXTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGNvbmZpZ1ZhbHVlID0gcHJvcGVydGllc1tuYW1lXTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIChtZXNzYWdlVmFsdWUpID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgKGNvbmZpZ1ZhbHVlKSA9PT0gJ29iamVjdCcpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuaXNNYXRjaChtZXNzYWdlVmFsdWUsIGNvbmZpZ1ZhbHVlLCBkZWVwIC0gMSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAobWVzc2FnZVtuYW1lXSAhPT0gcHJvcGVydGllc1tuYW1lXSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgTWVzc2FnZUNvbmZpZ3VyYXRpb25zIHtcclxuICAgIHB1YmxpYyBzdGF0aWMgY3JlYXRlUm91dGVzKGNvbmZpZ3VyYXRpb246IElNZXNzYWdlc0NvbmZpZ3VyYXRpb24pOiBNYXA8c3RyaW5nLCBBcnJheTxJTWVzc2FnZUNvbmZpZ3VyYXRpb24+PiB7XHJcbiAgICAgICAgY29uc3Qgcm91dGVzID0gbmV3IE1hcDxzdHJpbmcsIEFycmF5PElNZXNzYWdlQ29uZmlndXJhdGlvbj4+KCk7XHJcblxyXG4gICAgICAgIGZvciAoY29uc3QgbWVzc2FnZSBvZiBjb25maWd1cmF0aW9uLm1lc3NhZ2VzKSB7XHJcbiAgICAgICAgICAgIGxldCBtZXNzYWdlcyA9IHJvdXRlcy5nZXQobWVzc2FnZS50eXBlKTtcclxuICAgICAgICAgICAgaWYgKG1lc3NhZ2VzKSB7XHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlcy5wdXNoKG1lc3NhZ2UpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgbWVzc2FnZXMgPSBbbWVzc2FnZV07XHJcbiAgICAgICAgICAgICAgICByb3V0ZXMuc2V0KG1lc3NhZ2UudHlwZSwgbWVzc2FnZXMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCByZXN1bHQgPSBuZXcgTWFwPHN0cmluZywgQXJyYXk8SU1lc3NhZ2VDb25maWd1cmF0aW9uPj4oKTtcclxuICAgICAgICByb3V0ZXMuZm9yRWFjaCgobWVzc2FnZXMsIHR5cGUpID0+IHtcclxuICAgICAgICAgICAgbWVzc2FnZXMgPSBtZXNzYWdlcy5zb3J0KChhLCBiKSA9PiBNZXNzYWdlQ29uZmlndXJhdGlvbnMud2VpZ2h0KGIucHJvcGVydGllcykgLSBNZXNzYWdlQ29uZmlndXJhdGlvbnMud2VpZ2h0KGEucHJvcGVydGllcykpO1xyXG4gICAgICAgICAgICByZXN1bHQuc2V0KHR5cGUsIG1lc3NhZ2VzKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyB3ZWlnaHQocHJvcGVydGllczogYW55LCBkZWVwOiBudW1iZXIgPSAxMCk6IG51bWJlciB7XHJcbiAgICAgICAgaWYgKCFwcm9wZXJ0aWVzIHx8IGRlZXAgPD0gMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gMDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBjb3VudCA9IDA7XHJcbiAgICAgICAgZm9yIChjb25zdCBuYW1lIGluIHByb3BlcnRpZXMpIHtcclxuICAgICAgICAgICAgaWYgKHByb3BlcnRpZXMuaGFzT3duUHJvcGVydHkobmFtZSkpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gcHJvcGVydGllc1tuYW1lXTtcclxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY291bnQgKz0gdGhpcy53ZWlnaHQodmFsdWUsIGRlZXAgLSAxKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY291bnQrKztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gY291bnQ7XHJcbiAgICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL2lmZGVmLWxvYWRlci9pZmRlZi1sb2FkZXIuanM/REVCVUc9dHJ1ZSZQRVJGT1JNQU5DRV9BVURJVD10cnVlIS4vc3JjL3Byb2Nlc3Npbmcvcm91dGVyLnRzIiwiXHJcbmltcG9ydCB7IElFbnZlbG9wIH0gZnJvbSAnLi4vLi4vZW52ZWxvcCc7XHJcbmltcG9ydCB7IElBdWRpdFNlbmRlciB9IGZyb20gJy4uL3NlbmRlcnMvYXVkaXQtc2VuZGVyJztcclxuaW1wb3J0IHsgSU1lc3NhZ2VzUGVyZm9ybWFuY2VBdWRpdG9yLCBJTWVzc2VuZ2VyUGVyZm9ybWFuY2VBdWRpdG9yIH0gZnJvbSAnLi9tZXNzZW5nZXInO1xyXG5cclxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG5pbXBvcnQgeyBJRW52ZWxvcEF1ZGl0LCBJRW52ZWxvcHNBdWRpdCB9IGZyb20gJy4uL2RlZmluaXRpb25zJztcclxuaW1wb3J0IHsgTWVzc2FnZXNSZXBvcnRlciB9IGZyb20gJy4uL3JlcG9ydGVycy9tZXNzYWdlcy1yZXBvcnRlcic7XHJcbmltcG9ydCB7IFBlcmZzdGFtcCB9IGZyb20gJy4vcGVyZnN0YW1wJztcclxuLy8vLy8vLy8vL1xyXG5cclxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIE1lc3NlbmdlclBlcmZvcm1hbmNlQXVkaXRvckJ1aWxkZXIge1xyXG4gICAgcHVibGljIHN0YXRpYyBjcmVhdGUocmVhbDogYm9vbGVhbiwgc2VuZGVyPzogSUF1ZGl0U2VuZGVyKTogSU1lc3NlbmdlclBlcmZvcm1hbmNlQXVkaXRvciB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBNZXNzZW5nZXJQZXJmb3JtYW5jZUF1ZGl0b3IocmVhbCA/IHNlbmRlciA6IHVuZGVmaW5lZCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIE1lc3NlbmdlclBlcmZvcm1hbmNlQXVkaXRvciBpbXBsZW1lbnRzIElNZXNzZW5nZXJQZXJmb3JtYW5jZUF1ZGl0b3Ige1xyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBfc2VuZGVyPzogSUF1ZGl0U2VuZGVyXHJcbiAgICApIHsgfVxyXG5cclxuICAgIHB1YmxpYyBzdGFydGVkKCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9zZW5kZXIpIHtcclxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFBlcmZvcm1hbmNlTWVzc2FnZXNBdWRpdG9yKHRoaXMuX3NlbmRlcik7XHJcbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBuZXcgRHVtbXlNZXNzYWdlc1BlcmZvcm1hbmNlQXVkaXRvcigpO1xyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBEdW1teU1lc3NhZ2VzUGVyZm9ybWFuY2VBdWRpdG9yIGltcGxlbWVudHMgSU1lc3NhZ2VzUGVyZm9ybWFuY2VBdWRpdG9yIHtcclxuICAgIHB1YmxpYyBlbnF1ZXVlZChxdWV1ZUlkOiBzdHJpbmcsIGVudmVsb3BzOiBBcnJheTxJRW52ZWxvcD4pIHsgLyoqLyB9XHJcblxyXG4gICAgcHVibGljIGNvbXBsZXRlZCgpOiB2b2lkIHsgLyoqLyB9XHJcbn1cclxuXHJcbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuLyoqXHJcbiAqIFBlcmZvcm1hbmNlIG1lc3NhZ2UgYXVkaXRvciBmb3IgY29sbGVjdGlvbiB0aW1pbmdzIGluZm9ybWF0aW9uIGZyb20gZW5xdWV1ZSBtZXNzYWdlIHByb2NjZXNzXHJcbiAqL1xyXG5jbGFzcyBQZXJmb3JtYW5jZU1lc3NhZ2VzQXVkaXRvciBpbXBsZW1lbnRzIElNZXNzYWdlc1BlcmZvcm1hbmNlQXVkaXRvciB7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9hdWRpdHM6IElFbnZlbG9wc0F1ZGl0ID0ge1xyXG4gICAgICAgIGdyb3VwczogbmV3IEFycmF5PEFycmF5PElFbnZlbG9wQXVkaXQ+PigpLFxyXG4gICAgICAgIHdvcmtlclN0YXJ0ZWRBdDogdW5kZWZpbmVkLFxyXG4gICAgICAgIGVucXVldWVkQXQ6IHVuZGVmaW5lZFxyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IF9zZW5kZXI6IElBdWRpdFNlbmRlclxyXG4gICAgKSB7XHJcbiAgICAgICAgdGhpcy5fYXVkaXRzLndvcmtlclN0YXJ0ZWRBdCA9IG5ldyBQZXJmc3RhbXAoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZW5xdWV1ZWQocXVldWVJZDogc3RyaW5nLCBlbnZlbG9wczogQXJyYXk8SUVudmVsb3A+KSB7XHJcbiAgICAgICAgdGhpcy5fYXVkaXRzLmdyb3Vwcy5wdXNoKGVudmVsb3BzKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY29tcGxldGVkKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX2F1ZGl0cy5lbnF1ZXVlZEF0ID0gbmV3IFBlcmZzdGFtcCgpO1xyXG5cclxuICAgICAgICBjb25zdCByZXBvcnQgPSBuZXcgTWVzc2FnZXNSZXBvcnRlcih0aGlzLl9hdWRpdHMpLnJlcG9ydCgpO1xyXG5cclxuICAgICAgICB0aGlzLl9zZW5kZXIubWVzc2FnZXMocmVwb3J0KTtcclxuICAgIH1cclxufVxyXG4vLy8vLy8vLy8vXHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy9pZmRlZi1sb2FkZXIvaWZkZWYtbG9hZGVyLmpzP0RFQlVHPXRydWUmUEVSRk9STUFOQ0VfQVVESVQ9dHJ1ZSEuL3NyYy9wcm9jZXNzaW5nL2F1ZGl0L2F1ZGl0b3JzL21lc3Nlbmdlci1wZXJmb3JtYW5jZS1hdWRpdG9yLnRzIiwiaW1wb3J0IHsgSUVudmVsb3BzQXVkaXQsIElNZXNzYWdlc1BlcmZvcm1hbmNlUmVwb3J0IH0gZnJvbSAnLi4vZGVmaW5pdGlvbnMnO1xyXG5pbXBvcnQgeyBkaXN0b3JidGlvbiwgZHVyYXRpb24gfSBmcm9tICcuL2NhbGMtbWV0aG9kcyc7XHJcblxyXG5leHBvcnQgY2xhc3MgTWVzc2FnZXNSZXBvcnRlciB7XHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IF9hdWRpdHM6IElFbnZlbG9wc0F1ZGl0LFxyXG4gICAgKSB7fVxyXG5cclxuICAgIHB1YmxpYyByZXBvcnQoKTogSU1lc3NhZ2VzUGVyZm9ybWFuY2VSZXBvcnQge1xyXG4gICAgICAgIGNvbnN0IGF1ZGl0cyA9IHRoaXMuX2F1ZGl0cztcclxuXHJcbiAgICAgICAgaWYgKCFhdWRpdHMuZW5xdWV1ZWRBdCB8fCAhYXVkaXRzLndvcmtlclN0YXJ0ZWRBdCkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ01lc3NhZ2VzUmVwb3J0ZXIgY2Fubm90IGdlbmVyYXRlIHJlcG9ydC4gRGF0YSBpcyBub3QgY29tcGxldGUuJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBjcmVhdGVzID0gbmV3IEFycmF5PG51bWJlcj4oKTtcclxuICAgICAgICBjb25zdCBlbnF1ZXVlZEF0ID0gYXVkaXRzLmVucXVldWVkQXQ7XHJcbiAgICAgICAgY29uc3Qgd29ya2VyU3RhcnRlZEF0ID0gYXVkaXRzLndvcmtlclN0YXJ0ZWRBdDtcclxuXHJcbiAgICAgICAgZm9yIChjb25zdCBncm91cCBvZiBhdWRpdHMuZ3JvdXBzKSB7XHJcbiAgICAgICAgICAgIGZvciAoY29uc3QgYXVkaXQgb2YgZ3JvdXApIHtcclxuICAgICAgICAgICAgICAgIGNyZWF0ZXMucHVzaChhdWRpdC50aW1lc3RhbXApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBlbnF1ZXVlID0ge1xyXG4gICAgICAgICAgICBjbG9ja3RpbWU6IGRpc3RvcmJ0aW9uKGNyZWF0ZXMsICh0aW1lc3RhbXApID0+IGVucXVldWVkQXQuY2xvY2t0aW1lIC0gdGltZXN0YW1wKSxcclxuICAgICAgICAgICAgY3B1OiB1bmRlZmluZWRcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBjb3VudDogY3JlYXRlcy5sZW5ndGgsXHJcblxyXG4gICAgICAgICAgICBlbnF1ZXVlLFxyXG5cclxuICAgICAgICAgICAgd29ya2VyRW5xdWV1ZTogZHVyYXRpb24od29ya2VyU3RhcnRlZEF0LCBhdWRpdHMuZW5xdWV1ZWRBdClcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy9pZmRlZi1sb2FkZXIvaWZkZWYtbG9hZGVyLmpzP0RFQlVHPXRydWUmUEVSRk9STUFOQ0VfQVVESVQ9dHJ1ZSEuL3NyYy9wcm9jZXNzaW5nL2F1ZGl0L3JlcG9ydGVycy9tZXNzYWdlcy1yZXBvcnRlci50cyIsIlxyXG5pbXBvcnQgeyBJRW52ZWxvcCB9IGZyb20gJy4uLy4uL2VudmVsb3AnO1xyXG5pbXBvcnQgeyBJUGlwZVN0YXRzU3RvcmFnZSB9IGZyb20gJy4uL3N0YXRzL3N0b3JhZ2VzL3BpcGUtc3RhdHMuc3RvcmFnZSc7XHJcbmltcG9ydCB7IElNZXNzZW5nZXJTdGF0aXN0aWNBdWRpdG9yIH0gZnJvbSAnLi9tZXNzZW5nZXInO1xyXG5cclxuZXhwb3J0IGNsYXNzIE1lc3NlbmdlclN0YXRpc3RpY0F1ZGl0b3IgaW1wbGVtZW50cyBJTWVzc2VuZ2VyU3RhdGlzdGljQXVkaXRvciB7XHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IF9waXBlU3RvcmFnZXM6IElQaXBlU3RhdHNTdG9yYWdlXHJcbiAgICApIHsgfVxyXG5cclxuICAgIHB1YmxpYyBlbnF1ZXVlZChxdWV1ZUlkOiBzdHJpbmcsIGVudmVsb3BzOiBBcnJheTxJRW52ZWxvcD4pIHtcclxuICAgICAgICBjb25zdCBsZW5ndGggPSBlbnZlbG9wcy5sZW5ndGg7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3BpcGVTdG9yYWdlcy51cGRhdGUocXVldWVJZCwgKHN0YXRzKSA9PiB7XHJcbiAgICAgICAgICAgIHN0YXRzLnRvdGFsTWVzc2FnZUNvdW50ICs9IGxlbmd0aDtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvaWZkZWYtbG9hZGVyL2lmZGVmLWxvYWRlci5qcz9ERUJVRz10cnVlJlBFUkZPUk1BTkNFX0FVRElUPXRydWUhLi9zcmMvcHJvY2Vzc2luZy9hdWRpdC9hdWRpdG9ycy9tZXNzZW5nZXItc3RhdGlzdGljLWF1ZGl0b3IudHMiLCJpbXBvcnQgeyBJRW52ZWxvcFF1ZXVlIH0gZnJvbSAnLi4vLi4vZW52ZWxvcC1xdWV1ZSc7XHJcbmltcG9ydCB7IElQaXBlU3RhdGUsIElQaXBlU3RhdHMsIElQaXBlU3RhdHNQcm92aWRlciwgSVBpcGVTdGF0c1JlcG9zaXRvcnkgfSBmcm9tICcuL3BpcGUtc3RhdHMnO1xyXG5pbXBvcnQgeyBJUGlwZVN0YXRzU3RvcmFnZSB9IGZyb20gJy4vc3RvcmFnZXMvcGlwZS1zdGF0cy5zdG9yYWdlJztcclxuXHJcbmV4cG9ydCBjbGFzcyBQaXBlU3RhdHNQcm92aWRlciBpbXBsZW1lbnRzIElQaXBlU3RhdHNQcm92aWRlciB7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9kaWN0aW9uYXJ5OiBJUGlwZVN0YXRzUmVwb3NpdG9yeURpY3Rpb25hcnkgPSB7fTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IF9waXBlU3RhdHNTdG9yYWdlOiBJUGlwZVN0YXRzU3RvcmFnZVxyXG4gICAgKSB7IH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0KHF1ZXVlOiBJRW52ZWxvcFF1ZXVlKTogSVBpcGVTdGF0c1JlcG9zaXRvcnkge1xyXG4gICAgICAgIGNvbnN0IGRpY3Rpb25hcnkgPSB0aGlzLl9kaWN0aW9uYXJ5O1xyXG5cclxuICAgICAgICByZXR1cm4gZGljdGlvbmFyeVtxdWV1ZS5pZF0gfHwgKGRpY3Rpb25hcnlbcXVldWUuaWRdID0gdGhpcy5jcmVhdGUocXVldWUpKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGNyZWF0ZShxdWV1ZTogSUVudmVsb3BRdWV1ZSkge1xyXG4gICAgICAgIGNvbnN0IHN0YXRlID0ge1xyXG4gICAgICAgICAgICBnZXQgcXVldWVNZXNzYWdlQ291bnQoKSB7IHJldHVybiBxdWV1ZS5jb3VudDsgfSxcclxuICAgICAgICAgICAgZ2V0IHF1ZXVlU2l6ZSgpIHsgcmV0dXJuIHF1ZXVlLnNpemU7IH1cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICByZXR1cm4gbmV3IFBpcGVTdGF0c1JlcG9zaXRvcnkocXVldWUuaWQsIHN0YXRlLCB0aGlzLl9waXBlU3RhdHNTdG9yYWdlKTtcclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgUGlwZVN0YXRzUmVwb3NpdG9yeSBpbXBsZW1lbnRzIElQaXBlU3RhdHNSZXBvc2l0b3J5IHtcclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgX3F1ZXVlSWQ6IHN0cmluZyxcclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IF9zdGF0ZTogSVBpcGVTdGF0ZSxcclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IF9waXBlU3RhdHNTdG9yYWdlOiBJUGlwZVN0YXRzU3RvcmFnZVxyXG4gICAgKSB7IH1cclxuXHJcbiAgICBwdWJsaWMgYXN5bmMgdXBkYXRlPFQ+KGFjdGlvbjogKHN0YXRzOiBJUGlwZVN0YXRzKSA9PiBUKTogUHJvbWlzZTxUPiB7XHJcbiAgICAgICAgY29uc3Qgc3RhdGUgPSB0aGlzLl9zdGF0ZTtcclxuXHJcbiAgICAgICAgbGV0IHJlc3VsdDogVCB8IHVuZGVmaW5lZDtcclxuXHJcbiAgICAgICAgYXdhaXQgdGhpcy5fcGlwZVN0YXRzU3RvcmFnZS51cGRhdGUodGhpcy5fcXVldWVJZCwgKHN0YXRpc3RpYykgPT4ge1xyXG4gICAgICAgICAgICByZXN1bHQgPSBhY3Rpb24oe1xyXG4gICAgICAgICAgICAgICAgc3RhdGlzdGljLFxyXG4gICAgICAgICAgICAgICAgc3RhdGVcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiByZXN1bHQgYXMgYW55O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhc3luYyByZWFkKCk6IFByb21pc2U8SVBpcGVTdGF0cz4ge1xyXG4gICAgICAgIGNvbnN0IHN0YXRlID0gdGhpcy5fc3RhdGU7XHJcblxyXG4gICAgICAgIGNvbnN0IHN0YXRpc3RpYyA9IGF3YWl0IHRoaXMuX3BpcGVTdGF0c1N0b3JhZ2UucmVhZCh0aGlzLl9xdWV1ZUlkKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgc3RhdGlzdGljLFxyXG4gICAgICAgICAgICBzdGF0ZVxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbn1cclxuXHJcbmludGVyZmFjZSBJUGlwZVN0YXRzUmVwb3NpdG9yeURpY3Rpb25hcnkge1xyXG4gICAgW3F1ZXVlSWQ6IHN0cmluZ106IFBpcGVTdGF0c1JlcG9zaXRvcnk7XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL2lmZGVmLWxvYWRlci9pZmRlZi1sb2FkZXIuanM/REVCVUc9dHJ1ZSZQRVJGT1JNQU5DRV9BVURJVD10cnVlIS4vc3JjL3Byb2Nlc3NpbmcvYXVkaXQvc3RhdHMvcGlwZS1zdGF0cy1wcm92aWRlci50cyIsImltcG9ydCB7IEd1aWRQcm92aWRlciB9IGZyb20gJy4uLy4uLy4uLy4uL2ZyYW1ld29yay9ndWlkJztcclxuaW1wb3J0IHsgSW5kZXhlZERiVXRpbHMgfSBmcm9tICcuLi8uLi8uLi8uLi9mcmFtZXdvcmsvaW5kZXhlZGRiLXV0aWxzJztcclxuaW1wb3J0IHsgSVBpcGVQZXJzaXN0ZW50U3RhdHMgfSBmcm9tICcuLi9waXBlLXN0YXRzJztcclxuaW1wb3J0IHsgSVBpcGVTdGF0c1N0b3JhZ2UgfSBmcm9tICcuL3BpcGUtc3RhdHMuc3RvcmFnZSc7XHJcblxyXG5leHBvcnQgY2xhc3MgUGlwZVN0YXRzSW5kZXhlZERCU3RvcmFnZSBpbXBsZW1lbnRzIElQaXBlU3RhdHNTdG9yYWdlIHtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IGd1aWQgPSBHdWlkUHJvdmlkZXIuZGVmYXVsdDtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGFzeW5jIGNyZWF0ZShuYW1lOiBzdHJpbmcgPSAnbWNqcy1jb3VudGVycycpOiBQcm9taXNlPFBpcGVTdGF0c0luZGV4ZWREQlN0b3JhZ2U+IHtcclxuICAgICAgICBjb25zdCBkYXRhYmFzZSA9IGF3YWl0IEluZGV4ZWREYlV0aWxzLm9wZW4obmFtZSwgMSwgKGRiKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICghZGIub2JqZWN0U3RvcmVOYW1lcy5jb250YWlucyhQaXBlU3RhdHNJbmRleGVkREJTdG9yYWdlLlBpcGVTdGF0aXN0aWNzU3RvcmFnZSkpIHtcclxuICAgICAgICAgICAgICAgIGRiLmNyZWF0ZU9iamVjdFN0b3JlKFBpcGVTdGF0c0luZGV4ZWREQlN0b3JhZ2UuUGlwZVN0YXRpc3RpY3NTdG9yYWdlLCB7IGtleVBhdGg6ICdxdWV1ZUlkJywgYXV0b0luY3JlbWVudDogZmFsc2UgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCFkYi5vYmplY3RTdG9yZU5hbWVzLmNvbnRhaW5zKFBpcGVTdGF0c0luZGV4ZWREQlN0b3JhZ2UuQ2xpZW50U3RvcmFnZSkpIHtcclxuICAgICAgICAgICAgICAgIGRiLmNyZWF0ZU9iamVjdFN0b3JlKFBpcGVTdGF0c0luZGV4ZWREQlN0b3JhZ2UuQ2xpZW50U3RvcmFnZSwgeyBrZXlQYXRoOiAnaWQnLCBhdXRvSW5jcmVtZW50OiBmYWxzZSB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBjb25zdCBjbGllbnRJZCA9IGF3YWl0IFBpcGVTdGF0c0luZGV4ZWREQlN0b3JhZ2UuY2xpZW50SWQoZGF0YWJhc2UpO1xyXG5cclxuICAgICAgICByZXR1cm4gbmV3IFBpcGVTdGF0c0luZGV4ZWREQlN0b3JhZ2UoZGF0YWJhc2UsIGNsaWVudElkKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGFzeW5jIGNsaWVudElkKGRhdGFiYXNlOiBJREJEYXRhYmFzZSk6IFByb21pc2U8c3RyaW5nPiB7XHJcbiAgICAgICAgY29uc3QgY2xpZW50U3RvcmFnZSA9IGRhdGFiYXNlLnRyYW5zYWN0aW9uKFtQaXBlU3RhdHNJbmRleGVkREJTdG9yYWdlLkNsaWVudFN0b3JhZ2VdLCAncmVhZHdyaXRlJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAub2JqZWN0U3RvcmUoUGlwZVN0YXRzSW5kZXhlZERCU3RvcmFnZS5DbGllbnRTdG9yYWdlKTtcclxuXHJcbiAgICAgICAgY29uc3QgZGF0YSA9IGF3YWl0IEluZGV4ZWREYlV0aWxzLnRyYW5zYWN0aW9uKCgpID0+IGNsaWVudFN0b3JhZ2UsIChzdG9yYWdlLCByZXN1bHQpID0+IHtcclxuICAgICAgICAgICAgSW5kZXhlZERiVXRpbHMucmVxdWVzdDxJQ2xpZW50RGF0YT4oc3RvcmFnZS5nZXQoJ2RlZmF1bHQnKSwgKGNsaWVudCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFjbGllbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICBjbGllbnQgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiAnZGVmYXVsdCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsaWVudElkOiBQaXBlU3RhdHNJbmRleGVkREJTdG9yYWdlLmd1aWQubmV4dCgpXHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICBzdG9yYWdlLmFkZChjbGllbnQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmVzdWx0LmNsaWVudElkID0gY2xpZW50LmNsaWVudElkO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9LCB7IGNsaWVudElkOiAnJyBhcyBzdHJpbmcgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiBkYXRhLmNsaWVudElkO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIFBpcGVTdGF0aXN0aWNzU3RvcmFnZSA9ICdwaXBlLXN0YXRpc3RpY3MnO1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgQ2xpZW50U3RvcmFnZSA9ICdjbGllbnQnO1xyXG5cclxuICAgIHByaXZhdGUgX3JlY292ZXJ5OiB7IFtxdWV1ZUlkOiBzdHJpbmddOiBJUGlwZVBlcnNpc3RlbnRTdGF0cyB8IHVuZGVmaW5lZCB9ID0geyB9O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgX2RiOiBJREJEYXRhYmFzZSxcclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IF9jbGllbnRJZDogc3RyaW5nXHJcbiAgICApIHsgfVxyXG5cclxuICAgIHB1YmxpYyBhc3luYyB1cGRhdGUocXVldWVJZDogc3RyaW5nLCBhY3Rpb246IChzdGF0czogSVBpcGVQZXJzaXN0ZW50U3RhdHMpID0+IHZvaWQpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICBsZXQgcmVjb3Zlcnk6IElQaXBlUGVyc2lzdGVudFN0YXRzIHwgdW5kZWZpbmVkO1xyXG5cclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBhd2FpdCB0aGlzLnRyYW5zYWN0aW9uKChzdG9yYWdlLCByZXN1bHQpID0+IHtcclxuICAgICAgICAgICAgICAgIEluZGV4ZWREYlV0aWxzLnJlcXVlc3Q8SVBpcGVQZXJzaXN0ZW50U3RhdHM+KHN0b3JhZ2UuZ2V0KHF1ZXVlSWQpLCAoc3RhdHMpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBzdGF0cyA9IHJlY292ZXJ5ID0gKHRoaXMuX3JlY292ZXJ5W3F1ZXVlSWRdIHx8IHN0YXRzIHx8IHRoaXMubmV3RGF0YShxdWV1ZUlkKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbihzdGF0cyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHN0b3JhZ2UucHV0KHN0YXRzKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9LCB1bmRlZmluZWQsICdyZWFkd3JpdGUnKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuX3JlY292ZXJ5W3F1ZXVlSWRdID0gdW5kZWZpbmVkO1xyXG4gICAgICAgIH0gY2F0Y2gge1xyXG4gICAgICAgICAgICBpZiAoIXJlY292ZXJ5KSB7XHJcbiAgICAgICAgICAgICAgICByZWNvdmVyeSA9IHRoaXMubmV3RGF0YShxdWV1ZUlkKTtcclxuXHJcbiAgICAgICAgICAgICAgICBhY3Rpb24ocmVjb3ZlcnkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuX3JlY292ZXJ5W3F1ZXVlSWRdID0gcmVjb3Zlcnk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhc3luYyByZWFkKHF1ZXVlSWQ6IHN0cmluZyk6IFByb21pc2U8SVBpcGVQZXJzaXN0ZW50U3RhdHM+IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBjb25zdCBkID0gYXdhaXQgdGhpcy50cmFuc2FjdGlvbigoc3RvcmFnZSwgcmVzdWx0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBJbmRleGVkRGJVdGlscy5yZXF1ZXN0PElQaXBlUGVyc2lzdGVudFN0YXRzPihzdG9yYWdlLmdldChxdWV1ZUlkKSwgKHN0YXRzKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnN0YXRzID0gdGhpcy5fcmVjb3ZlcnlbcXVldWVJZF0gfHwgc3RhdHMgfHwgdGhpcy5uZXdEYXRhKHF1ZXVlSWQpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0sIHsgc3RhdHM6IHt9IGFzIElQaXBlUGVyc2lzdGVudFN0YXRzIH0sICdyZWFkb25seScpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5fcmVjb3ZlcnlbcXVldWVJZF0gPSB1bmRlZmluZWQ7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gZC5zdGF0cztcclxuICAgICAgICB9IGNhdGNoIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3JlY292ZXJ5W3F1ZXVlSWRdID0gdGhpcy5uZXdEYXRhKHF1ZXVlSWQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYXN5bmMgY2xlYXIoKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgdGhpcy5fcmVjb3ZlcnkgPSB7IH07XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudHJhbnNhY3Rpb24oKHN0b3JhZ2UpID0+IHtcclxuICAgICAgICAgICAgc3RvcmFnZS5jbGVhcigpO1xyXG4gICAgICAgIH0sIHVuZGVmaW5lZCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGRpc3Bvc2UoKTogdm9pZCB8IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgIHRoaXMuX2RiLmNsb3NlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGRlc3Ryb3koKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgdGhpcy5kaXNwb3NlKCk7XHJcbiAgICAgICAgdGhpcy5fcmVjb3ZlcnkgPSB7IH07XHJcbiAgICAgICAgcmV0dXJuIEluZGV4ZWREYlV0aWxzLnJlbW92ZSh0aGlzLl9kYi5uYW1lKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG5ld0RhdGEocXVldWVJZDogc3RyaW5nKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgY2xpZW50SWQ6IHRoaXMuX2NsaWVudElkLFxyXG4gICAgICAgICAgICBxdWV1ZUlkLFxyXG4gICAgICAgICAgICBiYXRjaEluZGV4OiAwLFxyXG4gICAgICAgICAgICBsYXN0U2VuZGluZ1N1Y2Nlc3M6IHRydWUsXHJcbiAgICAgICAgICAgIHJlcXVlc3RFcnJvckNvdW50OiAwLFxyXG4gICAgICAgICAgICB0b3RhbE1lc3NhZ2VDb3VudDogMCxcclxuICAgICAgICAgICAgdG90YWxSZXF1ZXN0RXJyb3JDb3VudDogMFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvcGVuKG1vZGU6IElEQlRyYW5zYWN0aW9uTW9kZSk6IElEQk9iamVjdFN0b3JlIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZGIudHJhbnNhY3Rpb24oW1BpcGVTdGF0c0luZGV4ZWREQlN0b3JhZ2UuUGlwZVN0YXRpc3RpY3NTdG9yYWdlXSwgbW9kZSkub2JqZWN0U3RvcmUoUGlwZVN0YXRzSW5kZXhlZERCU3RvcmFnZS5QaXBlU3RhdGlzdGljc1N0b3JhZ2UpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgdHJhbnNhY3Rpb248VD4oYWN0aW9uOiAoc3RvcmFnZTogSURCT2JqZWN0U3RvcmUsIHJlc3VsdDogVCkgPT4gdm9pZCwgcmVzdWx0OiBULCBtb2RlOiBJREJUcmFuc2FjdGlvbk1vZGUgPSAncmVhZHdyaXRlJyk6IFByb21pc2U8VD4ge1xyXG4gICAgICAgIHJldHVybiBJbmRleGVkRGJVdGlscy50cmFuc2FjdGlvbigoKSA9PiB0aGlzLm9wZW4obW9kZSksIGFjdGlvbiwgcmVzdWx0KTtcclxuICAgIH1cclxufVxyXG5cclxuaW50ZXJmYWNlIElDbGllbnREYXRhIHtcclxuICAgIGlkOiBzdHJpbmc7XHJcbiAgICBjbGllbnRJZDogc3RyaW5nO1xyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy9pZmRlZi1sb2FkZXIvaWZkZWYtbG9hZGVyLmpzP0RFQlVHPXRydWUmUEVSRk9STUFOQ0VfQVVESVQ9dHJ1ZSEuL3NyYy9wcm9jZXNzaW5nL2F1ZGl0L3N0YXRzL3N0b3JhZ2VzL3BpcGUtc3RhdHMuaW5kZXhlZGRiLnRzIiwiaW1wb3J0IHsgR3VpZFByb3ZpZGVyIH0gZnJvbSAnLi4vLi4vLi4vLi4vZnJhbWV3b3JrL2d1aWQnO1xyXG5pbXBvcnQgeyBXZWJTdG9yYWdlcyB9IGZyb20gJy4uLy4uLy4uLy4uL2ZyYW1ld29yay93ZWJzdG9yYWdlJztcclxuaW1wb3J0IHsgSVBpcGVQZXJzaXN0ZW50U3RhdHMgfSBmcm9tICcuLi9waXBlLXN0YXRzJztcclxuaW1wb3J0IHsgSVBpcGVTdGF0c1N0b3JhZ2UgfSBmcm9tICcuL3BpcGUtc3RhdHMuc3RvcmFnZSc7XHJcblxyXG5leHBvcnQgY2xhc3MgUGlwZVN0YXRzTG9jYWxTdG9yYWdlIGltcGxlbWVudHMgSVBpcGVTdGF0c1N0b3JhZ2Uge1xyXG4gICAgcHVibGljIHN0YXRpYyBjcmVhdGUobG9jYWxTdG9yYWdlOiBTdG9yYWdlIHwgbnVsbCA9IFdlYlN0b3JhZ2VzLmxvY2FsU3RvcmFnZSk6IFBpcGVTdGF0c0xvY2FsU3RvcmFnZSB8IG51bGwge1xyXG4gICAgICAgIGlmICghbG9jYWxTdG9yYWdlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIG5ldyBQaXBlU3RhdHNMb2NhbFN0b3JhZ2UobG9jYWxTdG9yYWdlKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBfcHJlZml4ID0gJ21janMtc3RhdHM6JztcclxuICAgIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IF9jbGllbnRLZXkgPSAnbWNqcy1zdGF0cy1jbGllbnQnO1xyXG5cclxuICAgIHByaXZhdGUgX2NsaWVudElkOiBzdHJpbmc7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9yZWNvdmVyeTogeyBbcXVldWVJZDogc3RyaW5nXTogSVBpcGVQZXJzaXN0ZW50U3RhdHMgfCB1bmRlZmluZWQgfSA9IHsgfTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IF9zdG9yYWdlOiBTdG9yYWdlXHJcbiAgICApIHsgfVxyXG5cclxuICAgIHB1YmxpYyBjbGllbnRJZCgpOiBzdHJpbmcge1xyXG4gICAgICAgIGNvbnN0IGtleSA9IFBpcGVTdGF0c0xvY2FsU3RvcmFnZS5fY2xpZW50S2V5O1xyXG4gICAgICAgIGxldCBjbGllbnRJZCA9IHRoaXMuX2NsaWVudElkIHx8IHRoaXMuX3N0b3JhZ2UuZ2V0SXRlbShrZXkpO1xyXG4gICAgICAgIGlmICghY2xpZW50SWQpIHtcclxuICAgICAgICAgICAgY2xpZW50SWQgPSBHdWlkUHJvdmlkZXIuZGVmYXVsdC5uZXh0KCk7XHJcbiAgICAgICAgICAgIHRoaXMuX3N0b3JhZ2Uuc2V0SXRlbShrZXksIGNsaWVudElkKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NsaWVudElkID0gY2xpZW50SWQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVwZGF0ZShxdWV1ZUlkOiBzdHJpbmcsIGFjdGlvbjogKHN0YXRzOiBJUGlwZVBlcnNpc3RlbnRTdGF0cykgPT4gdm9pZCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IGtleSA9IHRoaXMua2V5KHF1ZXVlSWQpO1xyXG5cclxuICAgICAgICBjb25zdCBzdGF0cyA9IHRoaXMuX3JlY292ZXJ5W2tleV0gfHwgdGhpcy5nZXQoa2V5KSB8fCB0aGlzLm5ldyhxdWV1ZUlkKTtcclxuXHJcbiAgICAgICAgYWN0aW9uKHN0YXRzKTtcclxuXHJcbiAgICAgICAgdGhpcy5zZXQoa2V5LCBzdGF0cyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlYWQocXVldWVJZDogc3RyaW5nKTogSVBpcGVQZXJzaXN0ZW50U3RhdHMge1xyXG4gICAgICAgIGNvbnN0IGtleSA9IHRoaXMua2V5KHF1ZXVlSWQpO1xyXG5cclxuICAgICAgICBsZXQgc3RhdHMgPSB0aGlzLl9yZWNvdmVyeVtrZXldIHx8IHRoaXMuZ2V0KGtleSk7XHJcblxyXG4gICAgICAgIGlmICghc3RhdHMpIHtcclxuICAgICAgICAgICAgc3RhdHMgPSB0aGlzLm5ldyhxdWV1ZUlkKTtcclxuICAgICAgICAgICAgdGhpcy5zZXQoa2V5LCBzdGF0cyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gc3RhdHM7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsZWFyKCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IHN0b3JhZ2UgPSB0aGlzLl9zdG9yYWdlO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3RvcmFnZS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBjb25zdCBrZXkgPSBzdG9yYWdlLmtleShpKTtcclxuICAgICAgICAgICAgaWYgKGtleSAmJiBrZXkuaW5kZXhPZihQaXBlU3RhdHNMb2NhbFN0b3JhZ2UuX3ByZWZpeCkgPT09IDApIHtcclxuICAgICAgICAgICAgICAgIHN0b3JhZ2UucmVtb3ZlSXRlbShrZXkpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fcmVjb3Zlcnlba2V5XSA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZGVzdHJveSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmNsZWFyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGRpc3Bvc2UoKTogdm9pZCB7XHJcbiAgICAgICAgLy9cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGtleShxdWV1ZUlkOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiBQaXBlU3RhdHNMb2NhbFN0b3JhZ2UuX3ByZWZpeCArIHF1ZXVlSWQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBuZXcocXVldWVJZDogc3RyaW5nKTogSVBpcGVQZXJzaXN0ZW50U3RhdHMge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGNsaWVudElkOiB0aGlzLmNsaWVudElkKCksXHJcbiAgICAgICAgICAgIHF1ZXVlSWQsXHJcbiAgICAgICAgICAgIGJhdGNoSW5kZXg6IDAsXHJcbiAgICAgICAgICAgIHRvdGFsTWVzc2FnZUNvdW50OiAwLFxyXG4gICAgICAgICAgICB0b3RhbFJlcXVlc3RFcnJvckNvdW50OiAwLFxyXG4gICAgICAgICAgICByZXF1ZXN0RXJyb3JDb3VudDogMCxcclxuICAgICAgICAgICAgbGFzdFNlbmRpbmdTdWNjZXNzOiBmYWxzZVxyXG4gICAgICAgIH0gYXMgSVBpcGVQZXJzaXN0ZW50U3RhdHM7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXQoa2V5OiBzdHJpbmcpOiBJUGlwZVBlcnNpc3RlbnRTdGF0cyB8IG51bGwge1xyXG4gICAgICAgIGNvbnN0IHN0ciA9IHRoaXMuX3N0b3JhZ2UuZ2V0SXRlbShrZXkpO1xyXG5cclxuICAgICAgICBpZiAoIXN0cikge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHN0YXRzID0gSlNPTi5wYXJzZShzdHIpO1xyXG4gICAgICAgICAgICBpZiAoc3RhdHMpIHtcclxuICAgICAgICAgICAgICAgIHN0YXRzLmNsaWVudElkID0gdGhpcy5jbGllbnRJZCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBzdGF0cztcclxuICAgICAgICB9IGNhdGNoIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2V0KGtleTogc3RyaW5nLCB2YWw6IElQaXBlUGVyc2lzdGVudFN0YXRzKTogdm9pZCB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgdGhpcy5fc3RvcmFnZS5zZXRJdGVtKGtleSwgSlNPTi5zdHJpbmdpZnkodmFsLCAobmFtZToga2V5b2YgSVBpcGVQZXJzaXN0ZW50U3RhdHMsIHZhbHVlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKG5hbWUpIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlICdjbGllbnRJZCc6IHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDogcmV0dXJuIHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgICAgIHRoaXMuX3JlY292ZXJ5W2tleV0gPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgfSBjYXRjaCB7XHJcbiAgICAgICAgICAgIHRoaXMuX3JlY292ZXJ5W2tleV0gPSB2YWw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy9pZmRlZi1sb2FkZXIvaWZkZWYtbG9hZGVyLmpzP0RFQlVHPXRydWUmUEVSRk9STUFOQ0VfQVVESVQ9dHJ1ZSEuL3NyYy9wcm9jZXNzaW5nL2F1ZGl0L3N0YXRzL3N0b3JhZ2VzL3BpcGUtc3RhdHMubG9jYWwtc3RvcmFnZS50cyIsImltcG9ydCB7IEd1aWRQcm92aWRlciB9IGZyb20gJy4uLy4uLy4uLy4uL2ZyYW1ld29yay9ndWlkJztcclxuaW1wb3J0IHsgSVBpcGVQZXJzaXN0ZW50U3RhdHMgfSBmcm9tICcuLi9waXBlLXN0YXRzJztcclxuaW1wb3J0IHsgSVBpcGVTdGF0c1N0b3JhZ2UgfSBmcm9tICcuL3BpcGUtc3RhdHMuc3RvcmFnZSc7XHJcblxyXG5leHBvcnQgY2xhc3MgUGlwZVN0YXRzTWVtb3J5U3RvcmFnZSBpbXBsZW1lbnRzIElQaXBlU3RhdHNTdG9yYWdlIHtcclxuICAgIHB1YmxpYyByZWFkb25seSBjbGllbnRJZDogc3RyaW5nID0gR3VpZFByb3ZpZGVyLmRlZmF1bHQubmV4dCgpO1xyXG5cclxuICAgIHByaXZhdGUgX2RpY3Rpb25hcnk6IElQaXBlU3RhdHNEaWN0aW9uYXJ5ID0ge307XHJcblxyXG4gICAgcHVibGljIHVwZGF0ZShxdWV1ZUlkOiBzdHJpbmcsIGFjdGlvbjogKHN0YXRzOiBJUGlwZVBlcnNpc3RlbnRTdGF0cykgPT4gdm9pZCk6IHZvaWQge1xyXG4gICAgICAgIGFjdGlvbih0aGlzLmdldChxdWV1ZUlkKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlYWQocXVldWVJZDogc3RyaW5nKTogSVBpcGVQZXJzaXN0ZW50U3RhdHMge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldChxdWV1ZUlkKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xlYXIoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fZGljdGlvbmFyeSA9IHt9O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBkZXN0cm95KCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuY2xlYXIoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZGlzcG9zZSgpOiB2b2lkIHtcclxuICAgICAgICAvL1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0KHF1ZXVlSWQ6IHN0cmluZyk6IElQaXBlUGVyc2lzdGVudFN0YXRzIHtcclxuICAgICAgICBjb25zdCBkaWN0aW9uYXJ5ID0gdGhpcy5fZGljdGlvbmFyeTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGRpY3Rpb25hcnlbcXVldWVJZF0gfHwgKGRpY3Rpb25hcnlbcXVldWVJZF0gPSB7XHJcbiAgICAgICAgICAgIGNsaWVudElkOiB0aGlzLmNsaWVudElkLFxyXG4gICAgICAgICAgICBxdWV1ZUlkLFxyXG4gICAgICAgICAgICBiYXRjaEluZGV4OiAwLFxyXG4gICAgICAgICAgICB0b3RhbE1lc3NhZ2VDb3VudDogMCxcclxuICAgICAgICAgICAgdG90YWxSZXF1ZXN0RXJyb3JDb3VudDogMCxcclxuICAgICAgICAgICAgcmVxdWVzdEVycm9yQ291bnQ6IDAsXHJcbiAgICAgICAgICAgIGxhc3RTZW5kaW5nU3VjY2VzczogZmFsc2VcclxuICAgICAgICB9IGFzIElQaXBlUGVyc2lzdGVudFN0YXRzKTtcclxuICAgIH1cclxufVxyXG5cclxuaW50ZXJmYWNlIElQaXBlU3RhdHNEaWN0aW9uYXJ5IHtcclxuICAgIFtxdWV1ZUlkOiBzdHJpbmddOiBJUGlwZVBlcnNpc3RlbnRTdGF0cztcclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvaWZkZWYtbG9hZGVyL2lmZGVmLWxvYWRlci5qcz9ERUJVRz10cnVlJlBFUkZPUk1BTkNFX0FVRElUPXRydWUhLi9zcmMvcHJvY2Vzc2luZy9hdWRpdC9zdGF0cy9zdG9yYWdlcy9waXBlLXN0YXRzLm1lbW9yeS50cyIsImltcG9ydCB7IElMb2csIElNZWFzdXJlbWVudCwgSU1lc3NhZ2UsIElNZXNzYWdlTWV0YSwgTG9nTGV2ZWwsIE1lc3NhZ2VUeXBlIH0gZnJvbSAnLi4vZGVmaW5pdGlvbnMnO1xyXG5pbXBvcnQgeyBJR3VpZFByb3ZpZGVyIH0gZnJvbSAnLi4vZnJhbWV3b3JrL2d1aWQnO1xyXG5pbXBvcnQgeyBJVGltZVN0YW1wUHJvdmlkZXIgfSBmcm9tICcuLi9mcmFtZXdvcmsvdGltZXN0YW1wJztcclxuaW1wb3J0IHsgRW52ZWxvcCwgSUVudmVsb3AgfSBmcm9tICcuL2VudmVsb3AnO1xyXG5cclxuLyoqXHJcbiAqIEBpbnRlcm5hbFxyXG4gKiBAaW50ZXJmYWNlIElQb3N0bWFuXHJcbiAqL1xyXG5leHBvcnQgaW50ZXJmYWNlIElQb3N0bWFuIHtcclxuICAgIC8qKlxyXG4gICAgICogU2VhbCBtZXNzYWdlIGludG8gZW52ZWxvcFxyXG4gICAgICpcclxuICAgICAqIEBpbnRlcm5hbFxyXG4gICAgICogQHBhcmFtIHtJTWVzc2FnZX0gbWVzc2FnZVxyXG4gICAgICogQHBhcmFtIHtDb250ZXh0fSBbY29udGV4dF1cclxuICAgICAqIEByZXR1cm5zIHtJRW52ZWxvcH1cclxuICAgICAqIEBtZW1iZXJvZiBJUG9zdG1hblxyXG4gICAgICovXHJcbiAgICBzZWFsKG1lc3NhZ2U6IElNZXNzYWdlKTogSUVudmVsb3A7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBAaW50ZXJuYWxcclxuICogQGNsYXNzIFBvc3RtYW5cclxuICogQGltcGxlbWVudHMge0lQb3N0bWFufVxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFBvc3RtYW4gaW1wbGVtZW50cyBJUG9zdG1hbiB7XHJcbiAgICBwcml2YXRlIHN0YXRpYyBMb2dMZXZlbDoge1trZXkgaW4gTG9nTGV2ZWxdOiBudW1iZXIgfSA9IHtcclxuICAgICAgICB0cmFjZTogMCxcclxuICAgICAgICBkZWJ1ZzogMSxcclxuICAgICAgICBpbmZvOiAyLFxyXG4gICAgICAgIHdhcm46IDMsXHJcbiAgICAgICAgZXJyb3I6IDQsXHJcbiAgICAgICAgZmF0YWw6IDVcclxuICAgIH07XHJcblxyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBfZ3VpZDogSUd1aWRQcm92aWRlcixcclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IF90aW1lOiBJVGltZVN0YW1wUHJvdmlkZXJcclxuICAgICkgeyB9XHJcblxyXG4gICAgcHVibGljIHNlYWwobWVzc2FnZTogSU1lc3NhZ2UpOiBJRW52ZWxvcCB7XHJcbiAgICAgICAgY29uc3QgbWV0YSA9IG1lc3NhZ2UuX21ldGE7XHJcblxyXG4gICAgICAgIGRlbGV0ZSAobWVzc2FnZSBhcyBhbnkpLl9tZXRhOyAvLyBUb0RvOiBDaGVjayBwZXJmb21hbmNlIG9mIHRoZSBkZWxldGUgb3BlcmF0b3JcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZW52ZWxvcChtZXRhLCBtZXNzYWdlKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGVudmVsb3AobWV0YTogSU1lc3NhZ2VNZXRhLCBtZXNzYWdlOiBvYmplY3QpOiBJRW52ZWxvcCB7XHJcbiAgICAgICAgY29uc3QgZW52ZWxvcCA9IG5ldyBFbnZlbG9wKG1ldGEudHlwZSk7XHJcbiAgICAgICAgZW52ZWxvcC5pZCA9IHRoaXMuX2d1aWQubmV4dCgpO1xyXG4gICAgICAgIGVudmVsb3AudGltZXN0YW1wID0gbWV0YS50aW1lc3RhbXAgfHwgdGhpcy5fdGltZS5ub3coKTtcclxuICAgICAgICBlbnZlbG9wLm5hbWUgPSB0aGlzLm5hbWUoZW52ZWxvcC50eXBlLCBtZXNzYWdlKTtcclxuICAgICAgICBlbnZlbG9wLm1lc3NhZ2UgPSBtZXNzYWdlO1xyXG5cclxuICAgICAgICByZXR1cm4gZW52ZWxvcDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG5hbWUodHlwZTogTWVzc2FnZVR5cGUsIG1lc3NhZ2U6IGFueSk6IHN0cmluZyB7XHJcbiAgICAgICAgaWYgKHR5cGUgPT09ICdtZWFzdXJlbWVudCcpIHtcclxuICAgICAgICAgICAgY29uc3QgbmFtZSA9IChtZXNzYWdlIGFzIElNZWFzdXJlbWVudCkubmFtZTtcclxuICAgICAgICAgICAgZGVsZXRlIG1lc3NhZ2UubmFtZTtcclxuICAgICAgICAgICAgcmV0dXJuIG5hbWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0eXBlID09PSAnbG9nJykge1xyXG4gICAgICAgICAgICBsZXQgbmFtZSA9IFBvc3RtYW4uTG9nTGV2ZWxbKG1lc3NhZ2UgYXMgSUxvZykubGV2ZWxdO1xyXG4gICAgICAgICAgICBuYW1lID0gdHlwZW9mIG5hbWUgPT09ICdudW1iZXInID8gbmFtZSA6IDI7XHJcbiAgICAgICAgICAgIGRlbGV0ZSBtZXNzYWdlLmxldmVsO1xyXG4gICAgICAgICAgICByZXR1cm4gbmFtZS50b1N0cmluZygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdHlwZTtcclxuICAgIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvaWZkZWYtbG9hZGVyL2lmZGVmLWxvYWRlci5qcz9ERUJVRz10cnVlJlBFUkZPUk1BTkNFX0FVRElUPXRydWUhLi9zcmMvcHJvY2Vzc2luZy9wb3N0bWFuLnRzIiwiaW1wb3J0IHsgSUNvbmZpZ3VyYXRpb24gfSBmcm9tICcuLi9jb25maWd1cmF0aW9ucy9jb25maWd1cmF0aW9uJztcclxuaW1wb3J0IHsgSUVudmlyb25tZW50RGF0YSB9IGZyb20gJy4uL2NvbmZpZ3VyYXRpb25zL2Vudmlyb25tZW50JztcclxuaW1wb3J0IHsgSUxvZ2dlciB9IGZyb20gJy4uL2xvZ3MnO1xyXG5pbXBvcnQgeyBDb250ZXh0IH0gZnJvbSAnLi4vcHJvY2Vzc2luZyc7XHJcbmltcG9ydCB7IE1lc3NhZ2VSZWNlaXZlciB9IGZyb20gJy4vc2VuZGVycy9tZXNzYWdlLXJlY2VpdmVyJztcclxuaW1wb3J0IHsgTWFuZGF0b3J5UmVzcG9uc2VFbWl0dGVyIH0gZnJvbSAnLi9zZW5kZXJzL3Jlc3BvbnNlLWVtaXR0ZXInO1xyXG5pbXBvcnQgeyBXb3JrZXJFdmVudFJlY2VpdmVyIH0gZnJvbSAnLi9zZW5kZXJzL3dvcmtlci1ldmVudC1yZWNlaXZlcic7XHJcbmltcG9ydCB7IFdvcmtlclJlcXVlc3RSZWNlaXZlciB9IGZyb20gJy4vc2VuZGVycy93b3JrZXItcmVxdWVzdC1yZWNlaXZlcic7XHJcbmltcG9ydCB7IFNlcnZpY2VXb3JrZXJTZW5kZXIgfSBmcm9tICcuL3NlcnZpY2Utd29ya2VyLXNlbmRlcic7XHJcbmltcG9ydCB7IElDb25maWd1cmF0aW9uV29ya2VyTWVzc2FnZSwgSU1lc3NhZ2VzV29ya2VyTWVzc2FnZSwgSVdvcmtlckdsb2JhbFNjb3BlLCBJV29ya2VyTWVzc2FnZVNlbmRlciB9IGZyb20gJy4vd29ya2VyLWRlZmluaXRpb25zJztcclxuXHJcbi8qKlxyXG4gKiBAaW50ZXJuYWxcclxuICovXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUNvbmZpZ3VyYXRpb25FdmVudCB7XHJcbiAgICBjb25maWd1cmF0aW9uOiBJQ29uZmlndXJhdGlvbjtcclxuXHJcbiAgICBlbnZpcm9ubWVudDogSUVudmlyb25tZW50RGF0YTtcclxuXHJcbiAgICBjb250ZXh0OiBDb250ZXh0O1xyXG59XHJcblxyXG4vKipcclxuICogQGludGVybmFsXHJcbiAqL1xyXG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tZW1wdHktaW50ZXJmYWNlXHJcbmV4cG9ydCBpbnRlcmZhY2UgSVRlcm1pbmF0ZUV2ZW50IHsgfVxyXG5cclxuLyoqXHJcbiAqIFJlY2VpdmVyIHdyYXBwZXIgZm9yIHdvcmtlciBlbnZpcm9ubWVudC5cclxuICogSXQgYWxsb3dzIGFkZCByZWNlaXZlZCBtZXNzYWdlcyB3aXRoIHZhcmlvdXNlIGRhdGEgdHlwZXMgZnJvbSBhIG1haW4gdGhyZWFkLlxyXG4gKlxyXG4gKiBAaW50ZXJuYWxcclxuICovXHJcbmV4cG9ydCBjbGFzcyBXb3JrZXJSZWNlaXZlciB7XHJcbiAgICBwdWJsaWMgcmVhZG9ubHkgY29udGV4dDogQ29udGV4dDtcclxuXHJcbiAgICBwdWJsaWMgZ2V0IG1lc3NhZ2VzKCkgeyByZXR1cm4gdGhpcy5fbWVzc2FnZXMuZXZlbnQ7IH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGNvbmZpZ3VyYXRpb24oKSB7IHJldHVybiB0aGlzLl9jb25maWd1cmF0aW9uLmV2ZW50OyB9XHJcblxyXG4gICAgcHVibGljIHJlYWRvbmx5IHRlcm1pbmF0ZSA9IG5ldyBNYW5kYXRvcnlSZXNwb25zZUVtaXR0ZXI8SVRlcm1pbmF0ZUV2ZW50IHwgdW5kZWZpbmVkLCB2b2lkPigpO1xyXG5cclxuICAgIHByaXZhdGUgcmVhZG9ubHkgX3JlY2VpdmVyOiBNZXNzYWdlUmVjZWl2ZXI7XHJcblxyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfdGVybWluYXRlOiBXb3JrZXJSZXF1ZXN0UmVjZWl2ZXI8J3Rlcm1pbmF0ZScsIElUZXJtaW5hdGVFdmVudCB8IHVuZGVmaW5lZCwgdm9pZD47XHJcblxyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfbWVzc2FnZXM6IFdvcmtlckV2ZW50UmVjZWl2ZXI8J21lc3NhZ2VzJywgSU1lc3NhZ2VzV29ya2VyTWVzc2FnZT47XHJcblxyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfY29uZmlndXJhdGlvbjogV29ya2VyRXZlbnRSZWNlaXZlcjwnY29uZmlndXJhdGlvbicsIElDb25maWd1cmF0aW9uV29ya2VyTWVzc2FnZT47XHJcblxyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgd29ya2VyRW52aXJvbm1lbnQ6IElXb3JrZXJHbG9iYWxTY29wZSxcclxuICAgICAgICBsb2dnZXI6IElMb2dnZXJcclxuICAgICkge1xyXG4gICAgICAgIGNvbnN0IHNlbmRlciA9IHRoaXMuZ2V0U2VuZGVyKHdvcmtlckVudmlyb25tZW50KTtcclxuXHJcbiAgICAgICAgY29uc3QgcmVjZWl2ZXIgPSB0aGlzLl9yZWNlaXZlciA9IG5ldyBNZXNzYWdlUmVjZWl2ZXIod29ya2VyRW52aXJvbm1lbnQsIGxvZ2dlcik7XHJcblxyXG4gICAgICAgIHRoaXMuY29udGV4dCA9IG5ldyBDb250ZXh0KHNlbmRlciwgcmVjZWl2ZXIpO1xyXG5cclxuICAgICAgICB0aGlzLl9tZXNzYWdlcyA9IG5ldyBXb3JrZXJFdmVudFJlY2VpdmVyKCdtZXNzYWdlcycsIHJlY2VpdmVyKTtcclxuXHJcbiAgICAgICAgdGhpcy5fY29uZmlndXJhdGlvbiA9IG5ldyBXb3JrZXJFdmVudFJlY2VpdmVyKCdjb25maWd1cmF0aW9uJywgcmVjZWl2ZXIpO1xyXG5cclxuICAgICAgICB0aGlzLl90ZXJtaW5hdGUgPSBuZXcgV29ya2VyUmVxdWVzdFJlY2VpdmVyKCd0ZXJtaW5hdGUnLCBzZW5kZXIsIHJlY2VpdmVyLCB0aGlzLnRlcm1pbmF0ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGRpc3Bvc2UoKSB7XHJcbiAgICAgICAgdGhpcy5fcmVjZWl2ZXIuZGlzcG9zZSgpO1xyXG5cclxuICAgICAgICB0aGlzLl90ZXJtaW5hdGUuZGlzcG9zZSgpO1xyXG4gICAgICAgIHRoaXMuX21lc3NhZ2VzLmRpc3Bvc2UoKTtcclxuICAgICAgICB0aGlzLl9jb25maWd1cmF0aW9uLmRpc3Bvc2UoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldFNlbmRlcih3b3JrZXJFbnZpcm9ubWVudDogSVdvcmtlckdsb2JhbFNjb3BlIHwgU2VydmljZVdvcmtlckdsb2JhbFNjb3BlKTogSVdvcmtlck1lc3NhZ2VTZW5kZXIge1xyXG4gICAgICAgIGlmICgnY2xpZW50cycgaW4gd29ya2VyRW52aXJvbm1lbnQpIHtcclxuICAgICAgICAgICAgY29uc3Qgc2VydmljZVdvcmtlckdsb2JhbCA9IHdvcmtlckVudmlyb25tZW50IGFzIFNlcnZpY2VXb3JrZXJHbG9iYWxTY29wZTtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBTZXJ2aWNlV29ya2VyU2VuZGVyKCgpID0+IHNlcnZpY2VXb3JrZXJHbG9iYWwuY2xpZW50cy5tYXRjaEFsbCh7IGluY2x1ZGVVbmNvbnRyb2xsZWQ6IHRydWUgfSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gd29ya2VyRW52aXJvbm1lbnQgYXMgYW55IGFzIElXb3JrZXJNZXNzYWdlU2VuZGVyO1xyXG4gICAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy9pZmRlZi1sb2FkZXIvaWZkZWYtbG9hZGVyLmpzP0RFQlVHPXRydWUmUEVSRk9STUFOQ0VfQVVESVQ9dHJ1ZSEuL3NyYy93b3JrZXJzL3dvcmtlci1yZWNlaXZlci50cyIsImltcG9ydCB7IElXb3JrZXJNZXNzYWdlLCBJV29ya2VyTWVzc2FnZVNlbmRlciwgV29ya2VyRGF0YVR5cGUgfSBmcm9tICcuL3dvcmtlci1kZWZpbml0aW9ucyc7XHJcblxyXG4vKipcclxuICogU2VuZCBkYXRhIHRvIGVhY2ggcGFnZSBmcm9tIFNoYXJlZFdvcmtlclxyXG4gKlxyXG4gKiBAaW50ZXJuYWxcclxuICovXHJcbmV4cG9ydCBjbGFzcyBTZXJ2aWNlV29ya2VyU2VuZGVyIGltcGxlbWVudHMgSVdvcmtlck1lc3NhZ2VTZW5kZXIge1xyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBfY2xpZW50czogKCkgPT4gUHJvbWlzZTxBcnJheTxJV29ya2VyTWVzc2FnZVNlbmRlcj4+XHJcbiAgICApIHsgfVxyXG5cclxuICAgIHB1YmxpYyBhc3luYyBwb3N0TWVzc2FnZShkYXRhOiBJV29ya2VyTWVzc2FnZTxXb3JrZXJEYXRhVHlwZT4pOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICBjb25zdCBjbGllbnRzID0gYXdhaXQgdGhpcy5fY2xpZW50cygpO1xyXG5cclxuICAgICAgICBpZiAoY2xpZW50cy5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGBEb24ndCBzZWUgYW55IGNsaWVudHNgKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZvciAoY29uc3QgY2xpZW50IG9mIGNsaWVudHMpIHtcclxuICAgICAgICAgICAgYXdhaXQgY2xpZW50LnBvc3RNZXNzYWdlKGRhdGEpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvaWZkZWYtbG9hZGVyL2lmZGVmLWxvYWRlci5qcz9ERUJVRz10cnVlJlBFUkZPUk1BTkNFX0FVRElUPXRydWUhLi9zcmMvd29ya2Vycy9zZXJ2aWNlLXdvcmtlci1zZW5kZXIudHMiLCJpbXBvcnQgeyBHbG9iYWxQcm92aWRlciB9IGZyb20gJy4uL2ZyYW1ld29yay9nbG9iYWwnO1xyXG5pbXBvcnQgeyBQc2V1ZG9Xb3JrZXJTY29wZU5hbWUgfSBmcm9tICcuL3BzZXVkby13b3JrZXInO1xyXG5pbXBvcnQgeyBJV29ya2VyR2xvYmFsU2NvcGUgfSBmcm9tICcuL3dvcmtlci1kZWZpbml0aW9ucyc7XHJcblxyXG4vKipcclxuICogUmV0dXJuIGN1cnJlbnQgZ2xvYmFsIHJvb3QgdmFyaWFibGUgZm9yIFdvcmtlciBlbnZlcm9uZW1udFxyXG4gKlxyXG4gKiBAaW50ZXJuYWxcclxuICogQGFic3RyYWN0XHJcbiAqIEBjbGFzcyBXb3JrZXJTY29wZVxyXG4gKi9cclxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFdvcmtlclNjb3BlIHtcclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJuIGN1cnJlbnQgZ2xvYmFsIHJvb3QgdmFyaWFibGUgZm9yIFdvcmtlciBlbnZlcm9uZW1udFxyXG4gICAgICpcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7Kn0gW2dsb2JhbD1Xb3JrZXJTY29wZS5nbG9iYWwoKV1cclxuICAgICAqIEByZXR1cm5zIHtJV29ya2VyR2xvYmFsU2NvcGV9XHJcbiAgICAgKiBAbWVtYmVyb2YgV29ya2VyU2NvcGVcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBjdXJyZW50KGdsb2JhbDogYW55ID0gR2xvYmFsUHJvdmlkZXIuY3VycmVudCgpKTogSVdvcmtlckdsb2JhbFNjb3BlIHtcclxuICAgICAgICBpZiAoZ2xvYmFsW1BzZXVkb1dvcmtlclNjb3BlTmFtZV0pIHtcclxuICAgICAgICAgICAgLy8gV2UgYXJlIGluIFdlYldvcmtlciBlbXVsYXRvclxyXG4gICAgICAgICAgICBjb25zdCBwc2V1ZG9Xb3JrZXIgPSBnbG9iYWxbUHNldWRvV29ya2VyU2NvcGVOYW1lXTtcclxuICAgICAgICAgICAgZGVsZXRlIGdsb2JhbFtQc2V1ZG9Xb3JrZXJTY29wZU5hbWVdO1xyXG4gICAgICAgICAgICByZXR1cm4gcHNldWRvV29ya2VyO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gV2UgYXJlIGluIHJlYWwgV2ViIFdvcmtlclxyXG4gICAgICAgIHJldHVybiBnbG9iYWw7XHJcbiAgICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL2lmZGVmLWxvYWRlci9pZmRlZi1sb2FkZXIuanM/REVCVUc9dHJ1ZSZQRVJGT1JNQU5DRV9BVURJVD10cnVlIS4vc3JjL3dvcmtlcnMvd29ya2VyLXNjb3BlLnRzIl0sInNvdXJjZVJvb3QiOiIifQ==