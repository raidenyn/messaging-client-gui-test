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
    // Add logger for sending messages back to main thread
    logger.replace([new logs_1.WorkerLogger(receiver.context.sender)]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBlN2RhNzI3YzgxNmM2YmI1NzE3NCIsIndlYnBhY2s6Ly8vLi9zcmMvZnJhbWV3b3JrL2d1aWQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ZyYW1ld29yay91dGlscy90cmF2ZXJzYWwudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ZyYW1ld29yay9pbmRleC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZnJhbWV3b3JrL2V2ZW50LWVtaXR0ZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ZyYW1ld29yay9nbG9iYWwudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ZyYW1ld29yay90aW1lc3RhbXAudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ZyYW1ld29yay91dGlscy9leHRlbmQudHMiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS9idWlsZGluL2dsb2JhbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZnJhbWV3b3JrL3V0aWxzL2luZGV4LnRzIiwid2VicGFjazovLy8uL3NyYy9mcmFtZXdvcmsvd2Vic3RvcmFnZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZnJhbWV3b3JrL3VubG9hZC1ldmVudC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZnJhbWV3b3JrL2FqYXgudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ZyYW1ld29yay9zaW5nbGV0b24udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ZyYW1ld29yay91dGlscy9ncm91cEJ5LnRzIiwid2VicGFjazovLy8uL3NyYy9mcmFtZXdvcmsvdXRpbHMvb3ZlcnJpZGUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ZyYW1ld29yay91dGlscy9zYWZlQ2xvbmUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xvZ3MvY29uc29sZS1sb2dnZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xvZ3MvZXZlbnQtbG9nZ2VyLnRzIiwid2VicGFjazovLy8uL3NyYy9sb2dzL3VuaXZlcnNhbC1sb2dnZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ZyYW1ld29yay9zdHJpbmdzLnRzIiwid2VicGFjazovLy8uL3NyYy9xdWV1ZXMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ZyYW1ld29yay9pbmRleGVkZGItdXRpbHMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3dvcmtlcnMvc2VuZGVycy93b3JrZXItcmVxdWVzdC1zZW5kZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3dvcmtlcnMvc2VuZGVycy9tZXNzYWdlLXJlY2VpdmVyLnRzIiwid2VicGFjazovLy8uL3NyYy93b3JrZXJzL3NlbmRlcnMvcmVzcG9uc2UtZW1pdHRlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvd29ya2Vycy9zZW5kZXJzL3dvcmtlci1ldmVudC1yZWNlaXZlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvd29ya2Vycy9zZW5kZXJzL3dvcmtlci1yZXF1ZXN0LXJlY2VpdmVyLnRzIiwid2VicGFjazovLy8uL3NyYy93b3JrZXJzL3BzZXVkby13b3JrZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ZyYW1ld29yay9zY3JpcHQtbG9hZGVyLnRzIiwid2VicGFjazovLy8uL3NyYy9wcm9jZXNzaW5nL2luZGV4LnRzIiwid2VicGFjazovLy8uL3NyYy9wcm9jZXNzaW5nL2JhdGNoLnRzIiwid2VicGFjazovLy8uL3NyYy9wcm9jZXNzaW5nL2F1ZGl0L3JlcG9ydGVycy9jYWxjLW1ldGhvZHMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Byb2Nlc3NpbmcvYXVkaXQvYXVkaXRvcnMvcGVyZnN0YW1wLnRzIiwid2VicGFjazovLy8uL3NyYy9wcm9jZXNzaW5nL2J1cy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcHJvY2Vzc2luZy9lbmRwb2ludHMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Byb2Nlc3NpbmcvcGlwZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcHJvY2Vzc2luZy9lbnZlbG9wLnRzIiwid2VicGFjazovLy8uL3NyYy9tZXNzYWdpbmctY2xpZW50LXdvcmtlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29uZmlndXJhdGlvbnMvZGVmYXVsdHMvbWVzc2FnZXMtY29uZmlndXJhdGlvbi50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbG9ncy9pbmRleC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbG9ncy93b3JrZXItbG9nZ2VyLnRzIiwid2VicGFjazovLy8uL3NyYy9wb2x5ZmlsbHMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Byb2Nlc3NpbmcvYnVpbGRlcnMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Byb2Nlc3NpbmcvYnVpbGRlcnMvYnVzLWJ1aWxkZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3F1ZXVlcy9tZW1vcnkvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3F1ZXVlcy9tZW1vcnkvbWVtb3J5LXF1ZXVlLnRzIiwid2VicGFjazovLy8uL3NyYy9xdWV1ZXMvc2FtcGxlZC1xdWV1ZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcXVldWVzL2luZGV4ZWRkYi9pbmRleGVkZGItcXVldWUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ZyYW1ld29yay9pbmRleGVkZGItcHJvdmlkZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3F1ZXVlcy9sb2NhbC1zdG9yYWdlL2xvY2FsLXN0b3JhZ2UtcXVldWUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3F1ZXVlcy9sb2NhbC1zdG9yYWdlL2xvY2FsLXN0b3JhZ2Uta2V5LXZhbHVlLnRzIiwid2VicGFjazovLy8uL3NyYy9xdWV1ZXMvbG9jYWwtc3RvcmFnZS9zdG9yYWdlLWtleS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcXVldWVzL2xvY2FsLXN0b3JhZ2UvbG9jYWwtc3RvcmFnZS1rZXktdmFsdWUtY2FjaGUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Byb2Nlc3NpbmcvYXVkaXQvYXVkaXQtcHJvdmlkZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Byb2Nlc3NpbmcvYXVkaXQvYXVkaXRvcnMvcGlwZS1wZXJmb3JtYW5jZS1hdWRpdG9yLnRzIiwid2VicGFjazovLy8uL3NyYy9wcm9jZXNzaW5nL2F1ZGl0L3JlcG9ydGVycy9iYXRjaC1yZXBvcnRlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcHJvY2Vzc2luZy9hdWRpdC9hdWRpdG9ycy9waXBlLXN0YXRpc3RpY3MtYXVkaXRvci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcHJvY2Vzc2luZy9hdWRpdC9zZW5kZXJzL3dvcmtlci1hdWRpdC1zZW5kZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Byb2Nlc3NpbmcvYmF0Y2gtYnVpbGRlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcHJvY2Vzc2luZy9iYXRjaC1kcm9wLXN0cmF0ZWd5LnRzIiwid2VicGFjazovLy8uL3NyYy9wcm9jZXNzaW5nL2JhdGNoLXN0b3JhZ2VzL2luZGV4ZWRkYi1zdG9yYWdlL2JhdGNoLWluZGV4ZWRkYi1zdG9yYWdlLnRzIiwid2VicGFjazovLy8uL3NyYy9wcm9jZXNzaW5nL2JhdGNoLXN0b3JhZ2VzL2xvY2FsLXN0b3JhZ2UvYmF0Y2gtbG9jYWxzdG9yYWdlLXN0b3JhZ2UudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Byb2Nlc3NpbmcvYmF0Y2gtc3RvcmFnZXMvbWVtb3J5LXN0b3JhZ2UvYmF0Y2gtbWVtb3J5LXN0b3JhZ2UudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Byb2Nlc3NpbmcvZW5kcG9pbnRzL2ZlLWFuYWx5dGljcy1jb2xsZWN0b3IvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Byb2Nlc3NpbmcvZW5kcG9pbnRzL2ZlLWFuYWx5dGljcy1jb2xsZWN0b3IvZmUtYW5hbHl0aWNzLWNvbGxlY3Rvci1lbmRwb2ludC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdmVyc2lvbi50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcHJvY2Vzc2luZy9mbHVzaC10aW1lLXN0cmF0ZWd5LnRzIiwid2VicGFjazovLy8uL3NyYy9mcmFtZXdvcmsvdGFiLXN5bmMtcG9pbnQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Byb2Nlc3NpbmcvYXVkaXQvc3RhdHMvcGlwZS1zdGF0cy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcHJvY2Vzc2luZy9idWlsZGVycy9wb3J0LWFqYXgtcHJvdmlkZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Byb2Nlc3NpbmcvY29udGV4dC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcHJvY2Vzc2luZy9tZXNzZW5nZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ZyYW1ld29yay9zeW5jLnRzIiwid2VicGFjazovLy8uL3NyYy9wcm9jZXNzaW5nL3JvdXRlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcHJvY2Vzc2luZy9hdWRpdC9hdWRpdG9ycy9tZXNzZW5nZXItcGVyZm9ybWFuY2UtYXVkaXRvci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcHJvY2Vzc2luZy9hdWRpdC9yZXBvcnRlcnMvbWVzc2FnZXMtcmVwb3J0ZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Byb2Nlc3NpbmcvYXVkaXQvYXVkaXRvcnMvbWVzc2VuZ2VyLXN0YXRpc3RpYy1hdWRpdG9yLnRzIiwid2VicGFjazovLy8uL3NyYy9wcm9jZXNzaW5nL2F1ZGl0L3N0YXRzL3BpcGUtc3RhdHMtcHJvdmlkZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Byb2Nlc3NpbmcvYXVkaXQvc3RhdHMvc3RvcmFnZXMvcGlwZS1zdGF0cy5pbmRleGVkZGIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Byb2Nlc3NpbmcvYXVkaXQvc3RhdHMvc3RvcmFnZXMvcGlwZS1zdGF0cy5sb2NhbC1zdG9yYWdlLnRzIiwid2VicGFjazovLy8uL3NyYy9wcm9jZXNzaW5nL2F1ZGl0L3N0YXRzL3N0b3JhZ2VzL3BpcGUtc3RhdHMubWVtb3J5LnRzIiwid2VicGFjazovLy8uL3NyYy9wcm9jZXNzaW5nL3Bvc3RtYW4udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3dvcmtlcnMvd29ya2VyLXJlY2VpdmVyLnRzIiwid2VicGFjazovLy8uL3NyYy93b3JrZXJzL3NlcnZpY2Utd29ya2VyLXNlbmRlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvd29ya2Vycy93b3JrZXItc2NvcGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87QUNWQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbkRBOzs7Ozs7R0FNRztBQUNIO0lBUUksc0JBQ29CLE1BQXdCO1FBQXhCLGtDQUFTLE1BQU0sQ0FBQyxNQUFNLEVBQUU7UUFBeEIsV0FBTSxHQUFOLE1BQU0sQ0FBa0I7UUFIM0IsZUFBVSxHQUFrQixFQUFFLENBQUM7UUFLNUMsSUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQztRQUNsQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDO1lBQzNCLFNBQVMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3RELENBQUM7SUFDTCxDQUFDO0lBYkQsc0JB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QUF3RDtBQUd4RDs7Ozs7O0dBTUc7QUFDSDtJQUFBO0lBb0JBLENBQUM7SUFuQkc7Ozs7Ozs7T0FPRztJQUNXLG1CQUFPLEdBQXJCLFVBQXNCLE1BQXNDO1FBQXRDLGtDQUFjLHVCQUFjLENBQUMsT0FBTyxFQUFFO1FBQ3hELEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxxQ0FBcUIsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNoQywrQkFBK0I7WUFDL0IsSUFBTSxZQUFZLEdBQUcsTUFBTSxDQUFDLHFDQUFxQixDQUFDLENBQUM7WUFDbkQsT0FBTyxNQUFNLENBQUMscUNBQXFCLENBQUMsQ0FBQztZQUNyQyxNQUFNLENBQUMsWUFBWSxDQUFDO1FBQ3hCLENBQUM7UUFFRCw0QkFBNEI7UUFDNUIsTUFBTSxDQUFDLE1BQU0sQ0FBQztJQUNsQixDQUFDO0lBQ0wsa0JBQUM7QUFBRCxDQUFDO0FBcEJxQixrQ0FBVyIsImZpbGUiOiJtZXNzYWdpbmctY2xpZW50LXdvcmtlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtdLCBmYWN0b3J5KTtcblx0ZWxzZSB7XG5cdFx0dmFyIGEgPSBmYWN0b3J5KCk7XG5cdFx0Zm9yKHZhciBpIGluIGEpICh0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgPyBleHBvcnRzIDogcm9vdClbaV0gPSBhW2ldO1xuXHR9XG59KSh0aGlzLCBmdW5jdGlvbigpIHtcbnJldHVybiBcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gOTgpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIGU3ZGE3MjdjODE2YzZiYjU3MTc0IiwiLyoqXHJcbiAqIEFQSSBkZWZpbml0aW9uIGZvciBwcm92aWRpbmcgR1VJRFxyXG4gKlxyXG4gKiBAaW50ZXJuYWxcclxuICogQGludGVyZmFjZSBJR3VpZFByb3ZpZGVyXHJcbiAqL1xyXG5leHBvcnQgaW50ZXJmYWNlIElHdWlkUHJvdmlkZXIge1xyXG4gICAgbmV4dCgpOiBzdHJpbmc7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBSZWFsIEdVSUQgcHJvdmlkZXIgaW1wbGVtZW50YXRpb25cclxuICpcclxuICogQGludGVybmFsXHJcbiAqIEBjbGFzcyBHdWlkUHJvdmlkZXJcclxuICogQGltcGxlbWVudHMge0lHdWlkUHJvdmlkZXJ9XHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgR3VpZFByb3ZpZGVyIGltcGxlbWVudHMgSUd1aWRQcm92aWRlciB7XHJcbiAgICBwdWJsaWMgc3RhdGljIF9kZWZhdWx0OiBHdWlkUHJvdmlkZXI7XHJcbiAgICBwdWJsaWMgc3RhdGljIGdldCBkZWZhdWx0KCk6IEd1aWRQcm92aWRlciB7XHJcbiAgICAgICAgcmV0dXJuIEd1aWRQcm92aWRlci5fZGVmYXVsdCB8fCAoR3VpZFByb3ZpZGVyLl9kZWZhdWx0ID0gbmV3IEd1aWRQcm92aWRlcigpICk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfYnl0ZVRvSGV4OiBBcnJheTxzdHJpbmc+ID0gW107XHJcblxyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IHJhbmRvbSA9IFJhbmRvbS5jcmVhdGUoKVxyXG4gICAgKSB7XHJcbiAgICAgICAgY29uc3QgYnl0ZVRvSGV4ID0gdGhpcy5fYnl0ZVRvSGV4O1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMjU2OyArK2kpIHtcclxuICAgICAgICAgICAgYnl0ZVRvSGV4W2ldID0gKGkgKyAweDEwMCkudG9TdHJpbmcoMTYpLnN1YnN0cigxKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm4gYSBuZXcgZ3VpZFxyXG4gICAgICpcclxuICAgICAqIFRvRG86IFRoaW5rIGFib3V0IG1vcmUgZWZlY3RpdmUgYWxnb3JpdGhtXHJcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxyXG4gICAgICogQG1lbWJlcm9mIEd1aWRQcm92aWRlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgbmV4dCgpIHtcclxuICAgICAgICBjb25zdCBybmRzID0gdGhpcy5yYW5kb20ubmV4dCgpO1xyXG5cclxuICAgICAgICAvLyBQZXIgNC40LCBzZXQgYml0cyBmb3IgdmVyc2lvbiBhbmQgYGNsb2NrX3NlcV9oaV9hbmRfcmVzZXJ2ZWRgXHJcbiAgICAgICAgcm5kc1s2XSA9IChybmRzWzZdICYgMHgwZikgfCAweDQwO1xyXG4gICAgICAgIHJuZHNbOF0gPSAocm5kc1s4XSAmIDB4M2YpIHwgMHg4MDtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuYnl0ZXNUb1V1aWQocm5kcyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBieXRlc1RvVXVpZChidWY6IHsgW2luZGV4OiBudW1iZXJdOiBudW1iZXIgfSkge1xyXG4gICAgICAgIGxldCBpID0gMDtcclxuICAgICAgICBjb25zdCBidGggPSB0aGlzLl9ieXRlVG9IZXg7XHJcbiAgICAgICAgcmV0dXJuIGJ0aFtidWZbaSsrXV0gKyBidGhbYnVmW2krK11dICtcclxuICAgICAgICAgICAgICAgYnRoW2J1ZltpKytdXSArIGJ0aFtidWZbaSsrXV0gK1xyXG4gICAgICAgICAgICAgICBidGhbYnVmW2krK11dICsgYnRoW2J1ZltpKytdXSArXHJcbiAgICAgICAgICAgICAgIGJ0aFtidWZbaSsrXV0gKyBidGhbYnVmW2krK11dICtcclxuICAgICAgICAgICAgICAgYnRoW2J1ZltpKytdXSArIGJ0aFtidWZbaSsrXV0gK1xyXG4gICAgICAgICAgICAgICBidGhbYnVmW2krK11dICsgYnRoW2J1ZltpKytdXSArXHJcbiAgICAgICAgICAgICAgIGJ0aFtidWZbaSsrXV0gKyBidGhbYnVmW2krK11dICtcclxuICAgICAgICAgICAgICAgYnRoW2J1ZltpKytdXSArIGJ0aFtidWZbaSsrXV07XHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBCYXNlZCByYW5kb20gbnVtYmVycyBzb3VyY2VcclxuICpcclxuICogQGludGVybmFsXHJcbiAqIEBhYnN0cmFjdFxyXG4gKiBAY2xhc3MgUmFuZG9tXHJcbiAqL1xyXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgUmFuZG9tIHtcclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlIG5ldyBSYW5kb20gZ2VuZXJhdG9yIGluc3RhbmNlIHN1cHBvcnRlZCBieSBjdXJyZW50IGVudmlyb25tZW50XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgY3JlYXRlKGZvcmNlU2ltcGxlOiBib29sZWFuID0gZmFsc2UpOiBSYW5kb20ge1xyXG4gICAgICAgIGlmICh0eXBlb2YgY3J5cHRvICE9PSAndW5kZWZpbmVkJ1xyXG4gICAgICAgICAgICAmJiBjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzXHJcbiAgICAgICAgICAgICYmICFmb3JjZVNpbXBsZVxyXG4gICAgICAgICkge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IENyeXB0b1JhbmRvbSgpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgU2ltcGxlUmFuZG9tKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhYnN0cmFjdCBuZXh0KCk6IHsgW2luZGV4OiBudW1iZXJdOiBudW1iZXIgfTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFByb3ZpZGUgc3Ryb25nIHJhbmRvbSB2YWx1ZXMgZnJvbSBDcnlwdG8gQVBJXHJcbiAqXHJcbiAqIEBpbnRlcm5hbFxyXG4gKiBAY2xhc3MgQ3J5cHRvUmFuZG9tXHJcbiAqIEBleHRlbmRzIHtSYW5kb219XHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgQ3J5cHRvUmFuZG9tIGV4dGVuZHMgUmFuZG9tIHtcclxuICAgIHB1YmxpYyBuZXh0KCk6IHsgW2luZGV4OiBudW1iZXJdOiBudW1iZXIgfSB7XHJcbiAgICAgICAgLy8gV0hBVFdHIGNyeXB0byBSTkcgLSBodHRwOi8vd2lraS53aGF0d2cub3JnL3dpa2kvQ3J5cHRvXHJcbiAgICAgICAgY29uc3Qgcm5kczggPSBuZXcgVWludDhBcnJheSgxNik7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW5kZWZcclxuICAgICAgICBjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzKHJuZHM4KTtcclxuICAgICAgICByZXR1cm4gcm5kczg7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBQcm92aWRlIHJhbmRvbSB2YWx1ZXMgZnJvbSB1bnByZWRpY3RhYmxlIE1hdGgucmFuZG9tIGZ1bmN0aW9uXHJcbiAqXHJcbiAqIEBpbnRlcm5hbFxyXG4gKiBAY2xhc3MgU2ltcGxlUmFuZG9tXHJcbiAqIEBleHRlbmRzIHtSYW5kb219XHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgU2ltcGxlUmFuZG9tIGV4dGVuZHMgUmFuZG9tIHtcclxuICAgIHByaXZhdGUgX3JuZHMgPSBuZXcgQXJyYXkoMTYpO1xyXG5cclxuICAgIHB1YmxpYyBuZXh0KCk6IEFycmF5PG51bWJlcj4ge1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwLCByID0gMDsgaSA8IDE2OyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKChpICYgMHgwMykgPT09IDApIHtcclxuICAgICAgICAgICAgICAgIHIgPSBNYXRoLnJhbmRvbSgpICogMHgxMDAwMDAwMDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5fcm5kc1tpXSA9IHIgPj4+ICgoaSAmIDB4MDMpIDw8IDMpICYgMHhmZjtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3JuZHM7XHJcbiAgICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL2lmZGVmLWxvYWRlci9pZmRlZi1sb2FkZXIuanM/REVCVUc9dHJ1ZSZQRVJGT1JNQU5DRV9BVURJVD10cnVlIS4vc3JjL2ZyYW1ld29yay9ndWlkLnRzIiwiLyoqXHJcbiAqIEBpbnRlcm5hbFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHRyYXZlcnNhbChcclxuICAgIGNhbGxiYWNrOiAobmFtZTogc3RyaW5nLCBzb3VyY2VWYWx1ZTogYW55KSA9PiB2b2lkLFxyXG4gICAgZGVzdGluYXRpb246IGFueSxcclxuICAgIHNvdXJjZXM6IEFycmF5PGFueT5cclxuKSB7XHJcbiAgICAvLyBEbyBub3QgdXNlIGZvci4ub2YgdG8gYXZvaWQgcmVxdWlyZSBwb2x5ZmlsbHNcclxuICAgIGNvbnN0IGxlbmd0aCA9IHNvdXJjZXMubGVuZ3RoO1xyXG4gICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IGxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgIGNvbnN0IHNvdXJjZSA9IHNvdXJjZXNbaW5kZXhdO1xyXG5cclxuICAgICAgICBpZiAoIXNvdXJjZSkge1xyXG4gICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZvciAoY29uc3QgbmFtZSBpbiBzb3VyY2UpIHtcclxuICAgICAgICAgICAgaWYgKHNvdXJjZS5oYXNPd25Qcm9wZXJ0eShuYW1lKSkge1xyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2sobmFtZSwgc291cmNlW25hbWVdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvaWZkZWYtbG9hZGVyL2lmZGVmLWxvYWRlci5qcz9ERUJVRz10cnVlJlBFUkZPUk1BTkNFX0FVRElUPXRydWUhLi9zcmMvZnJhbWV3b3JrL3V0aWxzL3RyYXZlcnNhbC50cyIsImV4cG9ydCAqIGZyb20gJy4vYWpheCc7XHJcbmV4cG9ydCAqIGZyb20gJy4vYWpheC1kZWZpbml0aW9ucyc7XHJcbmV4cG9ydCAqIGZyb20gJy4vZXZlbnQtZW1pdHRlcic7XHJcbmV4cG9ydCAqIGZyb20gJy4vZ3VpZCc7XHJcbmV4cG9ydCAqIGZyb20gJy4vc2luZ2xldG9uJztcclxuZXhwb3J0ICogZnJvbSAnLi90aW1lc3RhbXAnO1xyXG5leHBvcnQgKiBmcm9tICcuL3V0aWxzJztcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL2lmZGVmLWxvYWRlci9pZmRlZi1sb2FkZXIuanM/REVCVUc9dHJ1ZSZQRVJGT1JNQU5DRV9BVURJVD10cnVlIS4vc3JjL2ZyYW1ld29yay9pbmRleC50cyIsIi8qKlxyXG4gKiBFdmVudCBlbWl0dGVyIGFuZCBzdWJzY3JpYmVyIHRvIHNlbmQgdGhlIHNhbWUgbWVzc2FnZXMgdG8gYSBmZXcgZGVzdGluYXRpb25zXHJcbiAqXHJcbiAqIEBpbnRlcm5hbFxyXG4gKiBAY2xhc3MgRXZlbnRFbWl0dGVyXHJcbiAqIEB0ZW1wbGF0ZSBURXZlbnRcclxuICovXHJcbmV4cG9ydCBjbGFzcyBFdmVudEVtaXR0ZXI8VEV2ZW50PiB7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9saXN0ZW5lcnMgPSBuZXcgIEFycmF5PEV2ZW50TGlzdGVuZXI8VEV2ZW50Pj4oKTtcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgX2J1ZmZlciA9IG5ldyAgQXJyYXk8VEV2ZW50PigpO1xyXG5cclxuICAgIHB1YmxpYyBzdWJzY3JpYmUobGlzdGVuZXI6IEV2ZW50TGlzdGVuZXI8VEV2ZW50Pik6IEV2ZW50RW1pdHRlcjxURXZlbnQ+IHtcclxuICAgICAgICBpZiAodHlwZW9mIGxpc3RlbmVyID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnN1YnNjcmliZWQobGlzdGVuZXIpIDwgMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fbGlzdGVuZXJzLnB1c2gobGlzdGVuZXIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9idWZmZXIubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLmZsdXNoQnVmZmVyKCkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB1bnN1YnNjcmliZShsaXN0ZW5lcjogRXZlbnRMaXN0ZW5lcjxURXZlbnQ+KTogRXZlbnRFbWl0dGVyPFRFdmVudD4ge1xyXG4gICAgICAgIGxldCBpbmRleCA9IHRoaXMuc3Vic2NyaWJlZChsaXN0ZW5lcik7XHJcbiAgICAgICAgd2hpbGUgKGluZGV4ID49IDApIHtcclxuICAgICAgICAgICAgdGhpcy5fbGlzdGVuZXJzLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgICAgIGluZGV4ID0gdGhpcy5zdWJzY3JpYmVkKGxpc3RlbmVyKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsZWFyKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX2xpc3RlbmVycy5sZW5ndGggPSAwO1xyXG4gICAgICAgIHRoaXMuX2J1ZmZlci5sZW5ndGggPSAwO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBlbWl0KGRhdGE6IFRFdmVudCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IGxlbmd0aCA9IHRoaXMuX2xpc3RlbmVycy5sZW5ndGg7XHJcbiAgICAgICAgaWYgKGxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9saXN0ZW5lcnNbaV0oZGF0YSk7XHJcbiAgICAgICAgICAgICAgICB9IGNhdGNoIChlcikgeyAvKmRvIG5vdGhpbmcqLyB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLl9idWZmZXIucHVzaChkYXRhKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlZGlyZWN0KGVtaXR0ZXI6IEV2ZW50RW1pdHRlcjxURXZlbnQ+KTogRXZlbnRFbWl0dGVyPFRFdmVudD4ge1xyXG4gICAgICAgIHRoaXMuc3Vic2NyaWJlKChldmVudCkgPT4ge1xyXG4gICAgICAgICAgICBlbWl0dGVyLmVtaXQoZXZlbnQpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBlbWl0dGVyO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBtYXA8VE5ld0V2ZW50Pihjb252ZXJ0OiAoZGF0YTogVEV2ZW50KSA9PiBUTmV3RXZlbnQpOiBFdmVudEVtaXR0ZXI8VE5ld0V2ZW50PiB7XHJcbiAgICAgICAgY29uc3QgbmV3RXZlbnRFbWl0dGVyID0gbmV3IEV2ZW50RW1pdHRlcjxUTmV3RXZlbnQ+KCk7XHJcbiAgICAgICAgdGhpcy5zdWJzY3JpYmUoKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgIG5ld0V2ZW50RW1pdHRlci5lbWl0KGNvbnZlcnQoZXZlbnQpKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gbmV3RXZlbnRFbWl0dGVyO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc3Vic2NyaWJlZChsaXN0ZW5lcjogRXZlbnRMaXN0ZW5lcjxURXZlbnQ+KTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbGlzdGVuZXJzLmluZGV4T2YobGlzdGVuZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZmx1c2hCdWZmZXIoKSB7XHJcbiAgICAgICAgY29uc3QgYnVmZmVyID0gdGhpcy5fYnVmZmVyLnNsaWNlKCk7XHJcbiAgICAgICAgdGhpcy5fYnVmZmVyLmxlbmd0aCA9IDA7XHJcbiAgICAgICAgY29uc3QgbGVuZ3RoID0gYnVmZmVyLmxlbmd0aDtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZW1pdChidWZmZXJbaV0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHR5cGUgRXZlbnRMaXN0ZW5lcjxURXZlbnQ+ID0gKGV2ZW50OiBURXZlbnQpID0+IHZvaWQ7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy9pZmRlZi1sb2FkZXIvaWZkZWYtbG9hZGVyLmpzP0RFQlVHPXRydWUmUEVSRk9STUFOQ0VfQVVESVQ9dHJ1ZSEuL3NyYy9mcmFtZXdvcmsvZXZlbnQtZW1pdHRlci50cyIsIi8qKlxyXG4gKiBSZXR1cm4gZ2xvYmFsIHJvb3Qgb2JqZWN0IGZvciBjdXJyZW50IGVudmlyb25tZW50XHJcbiAqXHJcbiAqIEBpbnRlcm5hbFxyXG4gKiBAYWJzdHJhY3RcclxuICogQGNsYXNzIEdsb2JhbFByb3ZpZGVyXHJcbiAqL1xyXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgR2xvYmFsUHJvdmlkZXIge1xyXG4gICAgcHVibGljIHN0YXRpYyBjdXJyZW50KCkge1xyXG4gICAgICAgIGNvbnN0IHJvb3QgPSB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyA/IHdpbmRvdyA6XHJcbiAgICAgICAgICAgICAgICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXHJcbiAgICAgICAgICAgICAgICAgICAgIHR5cGVvZiBzZWxmICAgIT09ICd1bmRlZmluZWQnID8gc2VsZiA6XHJcbiAgICAgICAgICAgICAgICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXHJcbiAgICAgICAgICAgICAgICAgICAgIHR5cGVvZiBnbG9iYWwgIT09ICd1bmRlZmluZWQnID8gZ2xvYmFsIDpcclxuICAgICAgICAgICAgICAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cclxuICAgICAgICAgICAgICAgICAgICAgbnVsbDtcclxuXHJcbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXHJcbiAgICAgICAgaWYgKCFyb290KSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVW5zdXBwb3J0ZWQgZW52aXJvbm1lbnQuJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gcm9vdDtcclxuICAgIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvaWZkZWYtbG9hZGVyL2lmZGVmLWxvYWRlci5qcz9ERUJVRz10cnVlJlBFUkZPUk1BTkNFX0FVRElUPXRydWUhLi9zcmMvZnJhbWV3b3JrL2dsb2JhbC50cyIsIi8qKlxyXG4gKiBBUEkgb2YgdGltZXN0YW1wIHByb3ZpZGVyIGRlZmluaXRpb25cclxuICpcclxuICogQGludGVybmFsXHJcbiAqIEBpbnRlcmZhY2UgSVRpbWVTdGFtcFByb3ZpZGVyXHJcbiAqL1xyXG5leHBvcnQgaW50ZXJmYWNlIElUaW1lU3RhbXBQcm92aWRlciB7XHJcbiAgICBub3coKTogbnVtYmVyO1xyXG59XHJcblxyXG4vKipcclxuICogU2ltcGxlIHRpbWVzdGFtcCBwcm92aWRlciBpbXBsZW1lbnRhdGlvblxyXG4gKlxyXG4gKiBAaW50ZXJuYWxcclxuICogQGNsYXNzIFRpbWVTdGFtcFByb3ZpZGVyXHJcbiAqIEBpbXBsZW1lbnRzIHtJVGltZVN0YW1wUHJvdmlkZXJ9XHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgVGltZVN0YW1wUHJvdmlkZXIgaW1wbGVtZW50cyBJVGltZVN0YW1wUHJvdmlkZXIge1xyXG4gICAgcHVibGljIG5vdygpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiArbmV3IERhdGUoKTtcclxuICAgIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvaWZkZWYtbG9hZGVyL2lmZGVmLWxvYWRlci5qcz9ERUJVRz10cnVlJlBFUkZPUk1BTkNFX0FVRElUPXRydWUhLi9zcmMvZnJhbWV3b3JrL3RpbWVzdGFtcC50cyIsImltcG9ydCB7IHRyYXZlcnNhbCB9IGZyb20gJy4vdHJhdmVyc2FsJztcclxuXHJcbi8qKlxyXG4gKiBFeHRlbmQgdGhlIGZpcnN0IG9iamVjdCBieSBhbGwgcHJvcGVydGllcyBmcm9tIHRoZSBzZWNvbmRcclxuICogUmV0dXJuIHRoZSBmaXJzdCBvYmplY3RcclxuICpcclxuICogQGludGVybmFsXHJcbiAqIEBwYXJhbSB7Kn0gZGVzdGluYXRpb24gLSBvYmplY3Qgd2hhdCB3aWxsIGJlIGV4dGVuZGVkXHJcbiAqIEBwYXJhbSB7Kn0gc291cmNlIC0gb2JqZWN0IHdpdGggc291cmNlIGRhdGFcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBleHRlbmQoZGVzdGluYXRpb246IGFueSwgLi4uc291cmNlczogQXJyYXk8YW55Pik6IGFueSB7XHJcbiAgICBpZiAoIWRlc3RpbmF0aW9uKSB7XHJcbiAgICAgICAgZGVzdGluYXRpb24gPSB7fTtcclxuICAgIH1cclxuXHJcbiAgICB0cmF2ZXJzYWwoKG5hbWUsIHNvdXJjZVZhbHVlKSA9PiB7XHJcbiAgICAgICAgaWYgKGRlc3RpbmF0aW9uW25hbWVdID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgZGVzdGluYXRpb25bbmFtZV0gPSBzb3VyY2VWYWx1ZTtcclxuICAgICAgICB9XHJcbiAgICB9LCBkZXN0aW5hdGlvbiwgc291cmNlcyk7XHJcblxyXG4gICAgcmV0dXJuIGRlc3RpbmF0aW9uO1xyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy9pZmRlZi1sb2FkZXIvaWZkZWYtbG9hZGVyLmpzP0RFQlVHPXRydWUmUEVSRk9STUFOQ0VfQVVESVQ9dHJ1ZSEuL3NyYy9mcmFtZXdvcmsvdXRpbHMvZXh0ZW5kLnRzIiwidmFyIGc7XG5cbi8vIFRoaXMgd29ya3MgaW4gbm9uLXN0cmljdCBtb2RlXG5nID0gKGZ1bmN0aW9uKCkge1xuXHRyZXR1cm4gdGhpcztcbn0pKCk7XG5cbnRyeSB7XG5cdC8vIFRoaXMgd29ya3MgaWYgZXZhbCBpcyBhbGxvd2VkIChzZWUgQ1NQKVxuXHRnID0gZyB8fCBGdW5jdGlvbihcInJldHVybiB0aGlzXCIpKCkgfHwgKDEsZXZhbCkoXCJ0aGlzXCIpO1xufSBjYXRjaChlKSB7XG5cdC8vIFRoaXMgd29ya3MgaWYgdGhlIHdpbmRvdyByZWZlcmVuY2UgaXMgYXZhaWxhYmxlXG5cdGlmKHR5cGVvZiB3aW5kb3cgPT09IFwib2JqZWN0XCIpXG5cdFx0ZyA9IHdpbmRvdztcbn1cblxuLy8gZyBjYW4gc3RpbGwgYmUgdW5kZWZpbmVkLCBidXQgbm90aGluZyB0byBkbyBhYm91dCBpdC4uLlxuLy8gV2UgcmV0dXJuIHVuZGVmaW5lZCwgaW5zdGVhZCBvZiBub3RoaW5nIGhlcmUsIHNvIGl0J3Ncbi8vIGVhc2llciB0byBoYW5kbGUgdGhpcyBjYXNlLiBpZighZ2xvYmFsKSB7IC4uLn1cblxubW9kdWxlLmV4cG9ydHMgPSBnO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gKHdlYnBhY2spL2J1aWxkaW4vZ2xvYmFsLmpzXG4vLyBtb2R1bGUgaWQgPSAyMFxuLy8gbW9kdWxlIGNodW5rcyA9IDEgMiAzIiwiZXhwb3J0ICogZnJvbSAnLi9leHRlbmQnO1xyXG5leHBvcnQgKiBmcm9tICcuL2dyb3VwQnknO1xyXG5leHBvcnQgKiBmcm9tICcuL292ZXJyaWRlJztcclxuZXhwb3J0ICogZnJvbSAnLi9zYWZlQ2xvbmUnO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvaWZkZWYtbG9hZGVyL2lmZGVmLWxvYWRlci5qcz9ERUJVRz10cnVlJlBFUkZPUk1BTkNFX0FVRElUPXRydWUhLi9zcmMvZnJhbWV3b3JrL3V0aWxzL2luZGV4LnRzIiwiZXhwb3J0IGFic3RyYWN0IGNsYXNzIFdlYlN0b3JhZ2VzIHtcclxuICAgIHByaXZhdGUgc3RhdGljIF9sb2NhbFN0b3JhZ2U6IFN0b3JhZ2UgfCBudWxsIHwgdW5kZWZpbmVkO1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0IGxvY2FsU3RvcmFnZSgpOiBTdG9yYWdlIHwgbnVsbCB7XHJcbiAgICAgICAgaWYgKFdlYlN0b3JhZ2VzLl9sb2NhbFN0b3JhZ2UgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gV2ViU3RvcmFnZXMuX2xvY2FsU3RvcmFnZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBXZWJTdG9yYWdlcy5fbG9jYWxTdG9yYWdlID0gV2ViU3RvcmFnZXMubG9jYWwoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBsb2NhbCgpOiBTdG9yYWdlIHwgbnVsbCB7XHJcbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXHJcbiAgICAgICAgaWYgKHR5cGVvZiBsb2NhbFN0b3JhZ2UgPT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLmdldEl0ZW0oJycpOyAvLyBsb2NhbFN0b3JhZ2Ugd2FzIGRpc2FibGVkIGJ5IHVzZXIuXHJcbiAgICAgICAgfSBjYXRjaCB7XHJcbiAgICAgICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGxvY2FsU3RvcmFnZTtcclxuICAgIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvaWZkZWYtbG9hZGVyL2lmZGVmLWxvYWRlci5qcz9ERUJVRz10cnVlJlBFUkZPUk1BTkNFX0FVRElUPXRydWUhLi9zcmMvZnJhbWV3b3JrL3dlYnN0b3JhZ2UudHMiLCIvKipcclxuICogVGhlIGNsYXNzIGNob29zZXMgdGhlIGJlc3QgdW5sb2FkIGV2ZW50IGZvciBkaWZmZXJlbnQgYnJvd3NlcnNcclxuICovXHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBVbmxvYWRFdmVudCB7XHJcbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IG1vZGUgPSB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyAoKHdpbmRvdy5vbnBhZ2VoaWRlIHx8IHdpbmRvdy5vbnBhZ2VoaWRlID09PSBudWxsKSA/ICdwYWdlaGlkZScgOiAndW5sb2FkJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogJ25vbmUnO1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgYWRkTGlzdGVuZXIoaGFuZGxlcjogKGV2ZW50OiBFdmVudCkgPT4gdm9pZCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHN3aXRjaCAoVW5sb2FkRXZlbnQubW9kZSkge1xyXG4gICAgICAgICAgICBjYXNlICdwYWdlaGlkZSc6IHtcclxuICAgICAgICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdwYWdlaGlkZScsIGhhbmRsZXIpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSAndW5sb2FkJzoge1xyXG4gICAgICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3VubG9hZCcsIGhhbmRsZXIpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZGVmYXVsdDogcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIHJlbW92ZUxpc3RlbmVyKGhhbmRsZXI6IChldmVudDogRXZlbnQpID0+IHZvaWQpOiBib29sZWFuIHtcclxuICAgICAgICBzd2l0Y2ggKFVubG9hZEV2ZW50Lm1vZGUpIHtcclxuICAgICAgICAgICAgY2FzZSAncGFnZWhpZGUnOiB7XHJcbiAgICAgICAgICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncGFnZWhpZGUnLCBoYW5kbGVyKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgJ3VubG9hZCc6IHtcclxuICAgICAgICAgICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCd1bmxvYWQnLCBoYW5kbGVyKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL2lmZGVmLWxvYWRlci9pZmRlZi1sb2FkZXIuanM/REVCVUc9dHJ1ZSZQRVJGT1JNQU5DRV9BVURJVD10cnVlIS4vc3JjL2ZyYW1ld29yay91bmxvYWQtZXZlbnQudHMiLCJpbXBvcnQgeyBJQWpheE9wdGlvbnMsIElBamF4UHJvdmlkZXIgfSBmcm9tICcuL2FqYXgtZGVmaW5pdGlvbnMnO1xyXG5cclxuZGVjbGFyZSBjbGFzcyBYRG9tYWluUmVxdWVzdCB7XHJcbiAgICBwdWJsaWMgb25sb2FkOiAoKSA9PiB2b2lkO1xyXG4gICAgcHVibGljIG9uZXJyb3I6ICgpID0+IHZvaWQ7XHJcbiAgICBwdWJsaWMgdGltZW91dDogbnVtYmVyO1xyXG5cclxuICAgIHB1YmxpYyByZXNwb25zZVRleHQ6IHN0cmluZztcclxuXHJcbiAgICBwdWJsaWMgb3BlbihtZXRob2Q6IHN0cmluZywgdXJsOiBzdHJpbmcsIGFzeW5jPzogYm9vbGVhbik6IHZvaWQ7XHJcblxyXG4gICAgcHVibGljIHNlbmQoZGF0YT86IHN0cmluZyk6IHZvaWQ7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBBamF4IHByb3ZpZGVyIGltcGxlbWVudGF0aW9uXHJcbiAqL1xyXG5jbGFzcyBBamF4UmVxdWVzdCB7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF94aHI6IFhNTEh0dHBSZXF1ZXN0IHwgWERvbWFpblJlcXVlc3Q7XHJcblxyXG4gICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cclxuICAgIGNvbnN0cnVjdG9yKGNvcnM6IGJvb2xlYW4pIHtcclxuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cclxuICAgICAgICBpZiAoY29ycyAmJiB0eXBlb2YgWERvbWFpblJlcXVlc3QgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3hociA9IG5ldyBYRG9tYWluUmVxdWVzdCgpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3hociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xyXG4gICAgcHVibGljIHNlbmQob3B0aW9uczogSUFqYXhPcHRpb25zKTogUHJvbWlzZTxzdHJpbmc+IHtcclxuICAgICAgICBjb25zdCB4aHIgPSB0aGlzLl94aHI7XHJcblxyXG4gICAgICAgIGNvbnN0IHR5cGUgPSBvcHRpb25zLnR5cGUgfHwgJ1BPU1QnO1xyXG4gICAgICAgIGNvbnN0IGJvZHkgPSBvcHRpb25zLmJvZHkgfHwgJyc7XHJcbiAgICAgICAgY29uc3QgdXJsID0gb3B0aW9ucy51cmw7XHJcbiAgICAgICAgY29uc3QgdGltZW91dCA9IG9wdGlvbnMudGltZW91dDtcclxuXHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgeGhyLm9wZW4odHlwZSwgdXJsLCAvKmFzeW5jKi8gdHJ1ZSk7XHJcbiAgICAgICAgICAgIGlmICh0aW1lb3V0ICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIHhoci50aW1lb3V0ID0gdGltZW91dDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5zdWJzY3JpYmUocmVzb2x2ZSwgcmVqZWN0LCB0aW1lb3V0KTtcclxuICAgICAgICAgICAgeGhyLnNlbmQoYm9keSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cclxuICAgIHByaXZhdGUgc3Vic2NyaWJlKHJlc29sdmU6ICh2YWx1ZT86IHN0cmluZykgPT4gdm9pZCwgcmVqZWN0OiAocmVhc29uPzogc3RyaW5nKSA9PiB2b2lkLCB0aW1lb3V0OiBudW1iZXIgfCB1bmRlZmluZWQpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCB4aHIgPSB0aGlzLl94aHI7XHJcblxyXG4gICAgICAgIGNvbnN0IGxvZyA9IG5ldyBBcnJheTxudW1iZXI+KCk7XHJcblxyXG4gICAgICAgIGlmICh4aHIgaW5zdGFuY2VvZiBYTUxIdHRwUmVxdWVzdCkge1xyXG4gICAgICAgICAgICB4aHIub25yZWFkeXN0YXRlY2hhbmdlID0gKGFFdnQpID0+IHtcclxuICAgICAgICAgICAgICAgIGxvZy5wdXNoKHhoci5yZWFkeVN0YXRlKTtcclxuICAgICAgICAgICAgICAgIGlmICh4aHIucmVhZHlTdGF0ZSA9PT0gNCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh4aHIuc3RhdHVzID49IDIwMCAmJiB4aHIuc3RhdHVzIDwgMzAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoeGhyLnJlc3BvbnNlVGV4dCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KHhoci5yZXNwb25zZVRleHQgfHwgeGhyLnJlc3BvbnNlVHlwZSB8fCAnQ09SUyBwcm9ibGVtJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHhoci5vbmxvYWQgPSAoKSA9PiByZXNvbHZlKHhoci5yZXNwb25zZVRleHQpO1xyXG4gICAgICAgICAgICB4aHIub25lcnJvciA9ICgpID0+IHJlamVjdCgnWERvbWFpbiBDT1JTIHByb2JsZW0nKTtcclxuXHJcbiAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTptYXgtbGluZS1sZW5ndGhcclxuICAgICAgICAgICAgLy8gRml4ZXMgYnVnIHdpdGggSUU5OiBodHRwczovL3NvY2lhbC5tc2RuLm1pY3Jvc29mdC5jb20vRm9ydW1zL2llL2VuLVVTLzMwZWYzYWRkLTc2N2MtNDQzNi1iOGE5LWYxY2ExOWI0ODEyZS9pZTktcnRtLXhkb21haW5yZXF1ZXN0LWlzc3VlZC1yZXF1ZXN0cy1tYXktYWJvcnQtaWYtYWxsLWV2ZW50LWhhbmRsZXJzLW5vdC1zcGVjaWZpZWQ/Zm9ydW09aWV3ZWJkZXZlbG9wbWVudFxyXG4gICAgICAgICAgICAoeGhyIGFzIGFueSkub25wcm9ncmVzcyA9ICgpID0+IHsgLyoqLyB9O1xyXG4gICAgICAgICAgICAoeGhyIGFzIGFueSkub250aW1lb3V0ID0gKCkgPT4geyByZWplY3QoJ1RpbWVvdXQnKTsgfTtcclxuICAgICAgICAgICAgaWYgKHRpbWVvdXQpIHtcclxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gcmVqZWN0KCdNYW51YWwgdGltZW91dCcpLCB0aW1lb3V0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIEFqYXggcHJvdmlkZXIgY29uc3RydWN0b3JcclxuICpcclxuICogQGludGVybmFsXHJcbiAqIEBjbGFzcyBBamF4XHJcbiAqIEBpbXBsZW1lbnRzIHtJQWpheFByb3ZpZGVyfVxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIEFqYXggaW1wbGVtZW50cyBJQWpheFByb3ZpZGVyIHtcclxuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXHJcbiAgICBwdWJsaWMgc2VuZChvcHRpb25zOiBJQWpheE9wdGlvbnMpOiBQcm9taXNlPHN0cmluZz4ge1xyXG4gICAgICAgIGlmICh0eXBlb2YgZmV0Y2ggIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmZldGNoKG9wdGlvbnMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cclxuICAgICAgICBjb25zdCBpc0Fic29sdXRlVXJsID0gb3B0aW9ucy51cmwuaW5kZXhPZignOi8vJykgPiAwIHx8IG9wdGlvbnMudXJsLmluZGV4T2YoJy8vJykgPT09IDA7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBBamF4UmVxdWVzdCgvKmVuYWJsZSBDT1JTOiAqLyBpc0Fic29sdXRlVXJsKS5zZW5kKG9wdGlvbnMpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZmV0Y2gob3B0aW9uczogSUFqYXhPcHRpb25zKTogUHJvbWlzZTxzdHJpbmc+IHtcclxuICAgICAgICByZXR1cm4gZmV0Y2gob3B0aW9ucy51cmwsIHtcclxuICAgICAgICAgICAgYm9keTogb3B0aW9ucy5ib2R5LFxyXG4gICAgICAgICAgICBtZXRob2Q6IG9wdGlvbnMudHlwZVxyXG4gICAgICAgIH0pLnRoZW4oKHJlc3BvbnNlOiBSZXNwb25zZSkgPT4gLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi8gcmVzcG9uc2UudGV4dCgpKTtcclxuICAgIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvaWZkZWYtbG9hZGVyL2lmZGVmLWxvYWRlci5qcz9ERUJVRz10cnVlJlBFUkZPUk1BTkNFX0FVRElUPXRydWUhLi9zcmMvZnJhbWV3b3JrL2FqYXgudHMiLCIvLyB0c2xpbnQ6ZGlzYWJsZTpuby1hbnlcclxuLyoqXHJcbiAqIFByb3ZpZGUgc2luZ2xlIGV4ZWN1dGlvbiBvZiBwYXNzZWQgZnVuY3Rpb25cclxuICpcclxuICogQGludGVybmFsXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgU2luZ2xldG9uPFRGdW5jIGV4dGVuZHMgKC4uLmFyZ3M6IEFycmF5PGFueT4pID0+IGFueT4ge1xyXG4gICAgcHVibGljIHJlYWRvbmx5IGV4ZWN1dGVPbmNlOiBURnVuYztcclxuXHJcbiAgICBwcml2YXRlIF9leGVjdXRlZCA9IGZhbHNlO1xyXG5cclxuICAgIHByaXZhdGUgX3Jlc3VsdDogYW55O1xyXG5cclxuICAgIHB1YmxpYyBnZXQgZXhlY3V0ZWQoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl9leGVjdXRlZDsgfVxyXG5cclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgX2Z1bmM6IFRGdW5jXHJcbiAgICApIHtcclxuICAgICAgICB0aGlzLmV4ZWN1dGVPbmNlID0gdGhpcy5leGVjdXRlIGFzIFRGdW5jO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZXhlY3V0ZSA9ICguLi5hcmdzOiBBcnJheTxhbnk+KSA9PiB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2V4ZWN1dGVkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9yZXN1bHQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9yZXN1bHQgPSB0aGlzLl9mdW5jKC4uLmFyZ3MpO1xyXG5cclxuICAgICAgICB0aGlzLl9leGVjdXRlZCA9IHRydWU7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLl9yZXN1bHQ7XHJcbiAgICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL2lmZGVmLWxvYWRlci9pZmRlZi1sb2FkZXIuanM/REVCVUc9dHJ1ZSZQRVJGT1JNQU5DRV9BVURJVD10cnVlIS4vc3JjL2ZyYW1ld29yay9zaW5nbGV0b24udHMiLCIvKipcclxuICogQGludGVybmFsXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZ3JvdXBCeTxUSXRlbSwgVEtleT4oYXJyYXk6IEFycmF5PFRJdGVtPiwgcHJlZGljYXRlOiAob2JqOiBUSXRlbSkgPT4gVEtleSk6IE1hcDxUS2V5LCBBcnJheTxUSXRlbT4+IHtcclxuICAgIHJldHVybiBhcnJheS5yZWR1Y2UoKG1hcDogTWFwPFRLZXksIEFycmF5PFRJdGVtPj4sIGN1cnJlbnQ6IFRJdGVtKSA9PiB7XHJcbiAgICAgICAgY29uc3Qga2V5ID0gcHJlZGljYXRlKGN1cnJlbnQpO1xyXG4gICAgICAgIGxldCBwcmV2ID0gbWFwLmdldChrZXkpO1xyXG4gICAgICAgIGlmICghcHJldikge1xyXG4gICAgICAgICAgICBtYXAuc2V0KGtleSwgcHJldiA9IFtdKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHJldi5wdXNoKGN1cnJlbnQpO1xyXG4gICAgICAgIHJldHVybiBtYXA7XHJcbiAgICB9LCBuZXcgTWFwPFRLZXksIEFycmF5PFRJdGVtPj4oKSk7XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL2lmZGVmLWxvYWRlci9pZmRlZi1sb2FkZXIuanM/REVCVUc9dHJ1ZSZQRVJGT1JNQU5DRV9BVURJVD10cnVlIS4vc3JjL2ZyYW1ld29yay91dGlscy9ncm91cEJ5LnRzIiwiaW1wb3J0IHsgdHJhdmVyc2FsIH0gZnJvbSAnLi90cmF2ZXJzYWwnO1xyXG5cclxuLyoqXHJcbiAqIE92ZXJyaWRlIHRoZSBmaXJzdCBvYmplY3QgYnkgYWxsIHByb3BlcnRpZXMgZnJvbSB0aGUgc2Vjb25kXHJcbiAqIFJldHVybiB0aGUgZmlyc3Qgb2JqZWN0XHJcbiAqXHJcbiAqIEBpbnRlcm5hbFxyXG4gKiBAcGFyYW0geyp9IGRlc3RpbmF0aW9uIC0gb2JqZWN0IHdoYXQgd2lsbCBiZSBvdmVycmlkZWRcclxuICogQHBhcmFtIHsqfSBzb3VyY2UgLSBvYmplY3Qgd2l0aCBzb3VyY2UgZGF0YVxyXG4gKi9cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBvdmVycmlkZShkZXN0aW5hdGlvbjogYW55LCAuLi5zb3VyY2VzOiBBcnJheTxhbnk+KTogYW55IHtcclxuICAgIGlmICghZGVzdGluYXRpb24pIHtcclxuICAgICAgICBkZXN0aW5hdGlvbiA9IHt9O1xyXG4gICAgfVxyXG5cclxuICAgIHRyYXZlcnNhbCgobmFtZSwgc291cmNlVmFsdWUpID0+IHtcclxuICAgICAgICBkZXN0aW5hdGlvbltuYW1lXSA9IHNvdXJjZVZhbHVlO1xyXG4gICAgfSwgZGVzdGluYXRpb24sIHNvdXJjZXMpO1xyXG5cclxuICAgIHJldHVybiBkZXN0aW5hdGlvbjtcclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvaWZkZWYtbG9hZGVyL2lmZGVmLWxvYWRlci5qcz9ERUJVRz10cnVlJlBFUkZPUk1BTkNFX0FVRElUPXRydWUhLi9zcmMvZnJhbWV3b3JrL3V0aWxzL292ZXJyaWRlLnRzIiwiaW1wb3J0IHsgdHJhdmVyc2FsIH0gZnJvbSAnLi90cmF2ZXJzYWwnO1xyXG5cclxuLyoqXHJcbiAqIENsb25lIG9iamVjdCBkYXRhIHdpdGhvdXQgZnVuY3Rpb25zXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gc2FmZUNsb25lKHNvdXJjZTogYW55KTogYW55IHtcclxuICAgIGNvbnN0IGRlc3RpbmF0aW9uOiBhbnkgPSB7IH07XHJcblxyXG4gICAgdHJhdmVyc2FsKChuYW1lLCBzb3VyY2VWYWx1ZSkgPT4ge1xyXG4gICAgICAgIGlmICh0eXBlb2YgKHNvdXJjZVZhbHVlKSAhPT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICBkZXN0aW5hdGlvbltuYW1lXSA9IHNvdXJjZVZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgIH0sIGRlc3RpbmF0aW9uLCBbIHNvdXJjZSBdKTtcclxuXHJcbiAgICByZXR1cm4gZGVzdGluYXRpb247XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL2lmZGVmLWxvYWRlci9pZmRlZi1sb2FkZXIuanM/REVCVUc9dHJ1ZSZQRVJGT1JNQU5DRV9BVURJVD10cnVlIS4vc3JjL2ZyYW1ld29yay91dGlscy9zYWZlQ2xvbmUudHMiLCJpbXBvcnQgeyBJTG9nZ2VyIH0gZnJvbSAnLi9sb2dnZXInO1xyXG5cclxuLyoqXHJcbiAqIFByaW50IGludGVybmFsIGxvZyBtZXNzYWdlcyBpbiBicm93c2VyIGNvbnNvbGVcclxuICpcclxuICogSXMgbm90IHN1cHBvcnRlZCBmb3Igc29tZSBlbnZpcm9ubWVudFxyXG4gKlxyXG4gKiBAaW50ZXJuYWxcclxuICogQGNsYXNzIENvbnNvbGVMb2dnZXJcclxuICogQGltcGxlbWVudHMge0lMb2dnZXJ9XHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgQ29uc29sZUxvZ2dlciBpbXBsZW1lbnRzIElMb2dnZXIge1xyXG4gICAgcHVibGljIHJlYWRvbmx5IHByZWZpeDogc3RyaW5nID0gYFttZXNzYWdpbmctY2xpZW50LmpzXTogYDtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IF9vcHRpb25zOiB7IG11dGU6IGJvb2xlYW4gfVxyXG4gICAgKSB7IH1cclxuXHJcbiAgICBwdWJsaWMgZmF0YWwobWVzc2FnZTogc3RyaW5nLCBlcnJvcj86IEVycm9yKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9vcHRpb25zLm11dGUpIHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcih0aGlzLnByZWZpeCArIG1lc3NhZ2UsIGVycm9yKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGVycm9yKG1lc3NhZ2U6IHN0cmluZywgZXJyb3I/OiBFcnJvcik6IHZvaWQge1xyXG4gICAgICAgIGlmICghdGhpcy5fb3B0aW9ucy5tdXRlKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IodGhpcy5wcmVmaXggKyBtZXNzYWdlLCBlcnJvcik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBsb2cobWVzc2FnZTogc3RyaW5nKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9vcHRpb25zLm11dGUpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5wcmVmaXggKyBtZXNzYWdlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL2lmZGVmLWxvYWRlci9pZmRlZi1sb2FkZXIuanM/REVCVUc9dHJ1ZSZQRVJGT1JNQU5DRV9BVURJVD10cnVlIS4vc3JjL2xvZ3MvY29uc29sZS1sb2dnZXIudHMiLCJpbXBvcnQgeyBFdmVudEVtaXR0ZXIgfSBmcm9tICcuLi9mcmFtZXdvcmsvZXZlbnQtZW1pdHRlcic7XHJcbmltcG9ydCB7IElMb2dnZXIgfSBmcm9tICcuL2xvZ2dlcic7XHJcbmltcG9ydCB7IElXb3JrZXJMb2cgfSBmcm9tICcuL3dvcmtlci1sb2cnO1xyXG5cclxuLyoqXHJcbiAqIFNlbmQgbG9nIG1lc3NhZ2VzIGludG8gRXZlbnRFbWl0dGVyXHJcbiAqXHJcbiAqIEBpbnRlcm5hbFxyXG4gKiBAY2xhc3MgRXZlbnRMb2dnZXJcclxuICogQGltcGxlbWVudHMge0lMb2dnZXJ9XHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgRXZlbnRMb2dnZXIgaW1wbGVtZW50cyBJTG9nZ2VyIHtcclxuICAgIHB1YmxpYyByZWFkb25seSBvbmxvZyA9IG5ldyBFdmVudEVtaXR0ZXI8SVdvcmtlckxvZz4oKTtcclxuXHJcbiAgICBwdWJsaWMgZmF0YWwobWVzc2FnZTogc3RyaW5nLCBlcnJvcj86IEVycm9yKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5vbmxvZy5lbWl0KHtsZXZlbDogJ2ZhdGFsJywgbWVzc2FnZSwgZXJyb3J9KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZXJyb3IobWVzc2FnZTogc3RyaW5nLCBlcnJvcj86IEVycm9yKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5vbmxvZy5lbWl0KHtsZXZlbDogJ2Vycm9yJywgbWVzc2FnZSwgZXJyb3J9KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbG9nKG1lc3NhZ2U6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMub25sb2cuZW1pdCh7bGV2ZWw6ICdsb2cnLCBtZXNzYWdlfSk7XHJcbiAgICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL2lmZGVmLWxvYWRlci9pZmRlZi1sb2FkZXIuanM/REVCVUc9dHJ1ZSZQRVJGT1JNQU5DRV9BVURJVD10cnVlIS4vc3JjL2xvZ3MvZXZlbnQtbG9nZ2VyLnRzIiwiaW1wb3J0IHsgSUxvZ2dlciB9IGZyb20gJy4vbG9nZ2VyJztcclxuXHJcbi8qKlxyXG4gKiBQcm94eSBsb2dnZXIgdG8gcmVzZW5kIGFsbCBsb2cgbWVzc2FnZXMgdG8gYW5vdGhlciBsb2dnZXJzXHJcbiAqXHJcbiAqIEBpbnRlcm5hbFxyXG4gKiBAY2xhc3MgVW5pdmVyc2FsTG9nZ2VyXHJcbiAqIEBpbXBsZW1lbnRzIHtJTG9nZ2VyfVxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFVuaXZlcnNhbExvZ2dlciBpbXBsZW1lbnRzIElMb2dnZXIge1xyXG4gICAgcHVibGljIGVuYWJsZWQ6IGJvb2xlYW4gPSB0cnVlO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBsb2dnZXJzOiBBcnJheTxJTG9nZ2VyPiA9IFtdXHJcbiAgICApIHsgfVxyXG5cclxuICAgIHB1YmxpYyBmYXRhbChtZXNzYWdlOiBzdHJpbmcsIGVycm9yPzogRXJyb3IpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5lbmFibGVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9nZ2VyKChsKSA9PiBsLmZhdGFsKG1lc3NhZ2UsIGVycm9yKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBlcnJvcihtZXNzYWdlOiBzdHJpbmcsIGVycm9yPzogRXJyb3IpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5lbmFibGVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9nZ2VyKChsKSA9PiBsLmVycm9yKG1lc3NhZ2UsIGVycm9yKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBsb2cobWVzc2FnZTogc3RyaW5nKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuZW5hYmxlZCkge1xyXG4gICAgICAgICAgICB0aGlzLmxvZ2dlcigobCkgPT4gbC5sb2cobWVzc2FnZSkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlcGxhY2UgZXhpc3RpbmcgbG9nZ2VycyB0byBuZXcgb25lc1xyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7QXJyYXk8SUxvZ2dlcj59IGxvZ2dlcnNcclxuICAgICAqIEBtZW1iZXJvZiBVbml2ZXJzYWxMb2dnZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIHJlcGxhY2UobmV3TG9nZ2VyczogQXJyYXk8SUxvZ2dlcj4pOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmxvZ2dlcnMubGVuZ3RoID0gMDtcclxuXHJcbiAgICAgICAgY29uc3QgbGVuZ3RoID0gbmV3TG9nZ2Vycy5sZW5ndGg7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLmxvZ2dlcnMucHVzaChuZXdMb2dnZXJzW2ldKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBsb2dnZXIoZXhlY3V0ZTogKGxvZ2dlcjogSUxvZ2dlcikgPT4gdm9pZCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IGxvZ2dlcnMgPSB0aGlzLmxvZ2dlcnM7XHJcbiAgICAgICAgY29uc3QgbGVuZ3RoID0gbG9nZ2Vycy5sZW5ndGg7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBleGVjdXRlKGxvZ2dlcnNbaV0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvaWZkZWYtbG9hZGVyL2lmZGVmLWxvYWRlci5qcz9ERUJVRz10cnVlJlBFUkZPUk1BTkNFX0FVRElUPXRydWUhLi9zcmMvbG9ncy91bml2ZXJzYWwtbG9nZ2VyLnRzIiwiZXhwb3J0IGZ1bmN0aW9uIGVuZHNXaXRoKHN0cjogc3RyaW5nLCBzZWFyY2hTdHI6IHN0cmluZyk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHN0ci5zdWJzdHIoLXNlYXJjaFN0ci5sZW5ndGgsIHNlYXJjaFN0ci5sZW5ndGgpID09PSBzZWFyY2hTdHI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBtYXBQYXRoKHBhdGgxOiBzdHJpbmcsIHBhdGgyOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgaWYgKHBhdGgyWzBdID09PSAnLycpIHtcclxuICAgICAgICByZXR1cm4gcGF0aDI7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgaW5kZXggPSBwYXRoMS5sYXN0SW5kZXhPZignLycpO1xyXG4gICAgaWYgKGluZGV4IDwgMCkge1xyXG4gICAgICAgIHJldHVybiAnLycgKyBwYXRoMjtcclxuICAgIH1cclxuICAgIHJldHVybiBwYXRoMS5zdWJzdHJpbmcoMCwgaW5kZXggKyAxKSArIHBhdGgyO1xyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy9pZmRlZi1sb2FkZXIvaWZkZWYtbG9hZGVyLmpzP0RFQlVHPXRydWUmUEVSRk9STUFOQ0VfQVVESVQ9dHJ1ZSEuL3NyYy9mcmFtZXdvcmsvc3RyaW5ncy50cyIsImV4cG9ydCAqIGZyb20gJy4vcXVldWUnO1xyXG5leHBvcnQgKiBmcm9tICcuL21lbW9yeSc7XHJcbmV4cG9ydCAqIGZyb20gJy4vc2FtcGxlZC1xdWV1ZSc7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy9pZmRlZi1sb2FkZXIvaWZkZWYtbG9hZGVyLmpzP0RFQlVHPXRydWUmUEVSRk9STUFOQ0VfQVVESVQ9dHJ1ZSEuL3NyYy9xdWV1ZXMvaW5kZXgudHMiLCJpbXBvcnQgeyBJbmRleGVkREJQcm92aWRlciB9IGZyb20gJy4vaW5kZXhlZGRiLXByb3ZpZGVyJztcclxuXHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBJbmRleGVkRGJVdGlscyB7XHJcbiAgICBwdWJsaWMgc3RhdGljIG9wZW4oXHJcbiAgICAgICAgbmFtZTogc3RyaW5nLFxyXG4gICAgICAgIHZlcnNpb246IG51bWJlcixcclxuICAgICAgICBvbnVwZ3JhZGVuZWVkZWQ6IChkYjogSURCRGF0YWJhc2UpID0+IHZvaWQsXHJcbiAgICAgICAgYXR0ZW1wdHM6IG51bWJlciA9IDNcclxuICAgICk6IFByb21pc2U8SURCRGF0YWJhc2U+IHtcclxuICAgICAgICBjb25zdCBmYWN0b3J5ID0gSW5kZXhlZERCUHJvdmlkZXIuZ2V0SW5kZXhlZERCKCk7XHJcblxyXG4gICAgICAgIGlmICghZmFjdG9yeSkge1xyXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoJ0Nhbm5vdCBpbnN0YW50aWF0ZSBJbmRleGVkREIgZmFjdG9yeS4nKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZTxJREJEYXRhYmFzZT4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgYXR0ZW1wdENvdW50ZXIgPSAwO1xyXG4gICAgICAgICAgICBjb25zdCBvcGVuID0gKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgYXR0ZW1wdENvdW50ZXIrKztcclxuXHJcbiAgICAgICAgICAgICAgICBjb25zdCByZXF1ZXN0ID0gZmFjdG9yeS5vcGVuKG5hbWUsIDEpO1xyXG5cclxuICAgICAgICAgICAgICAgIHJlcXVlc3Qub25zdWNjZXNzID0gKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGRiID0gcmVxdWVzdC5yZXN1bHQgYXMgSURCRGF0YWJhc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShkYik7XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgcmVxdWVzdC5vbnVwZ3JhZGVuZWVkZWQgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZGIgPSByZXF1ZXN0LnJlc3VsdCBhcyBJREJEYXRhYmFzZTtcclxuICAgICAgICAgICAgICAgICAgICBvbnVwZ3JhZGVuZWVkZWQoZGIpO1xyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIHJlcXVlc3Qub25lcnJvciA9ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoYXR0ZW1wdENvdW50ZXIgPj0gYXR0ZW1wdHMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGBFcnJvciBvbiBvcGVubmluZyBJbmRleGVkREIgJyR7bmFtZX0nLiBBdHRlbXB0cyBjb3VudDogJHthdHRlbXB0Q291bnRlcn0uYCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wZW5TYWZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIHJlcXVlc3Qub25ibG9ja2VkID0gKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIG9wZW5TYWZlKCk7XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBjb25zdCBvcGVuU2FmZSA9ICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICAgICAgb3BlbigpO1xyXG4gICAgICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyb3IubWVzc2FnZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIG9wZW5TYWZlKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyB0cmFuc2FjdGlvbjxUPihcclxuICAgICAgICBzdG9yZUZhY3Rvcnk6ICgpID0+IElEQk9iamVjdFN0b3JlLFxyXG4gICAgICAgIGFjdGlvbjogKHN0b3JhZ2U6IElEQk9iamVjdFN0b3JlLCByZXN1bHQ6IFQpID0+IHZvaWQsXHJcbiAgICAgICAgcmVzdWx0OiBUXHJcbiAgICApOiBQcm9taXNlPFQ+IHtcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2U8VD4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBzdG9yYWdlID0gc3RvcmVGYWN0b3J5KCk7XHJcblxyXG4gICAgICAgICAgICBzdG9yYWdlLnRyYW5zYWN0aW9uLm9uY29tcGxldGUgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3VsdCk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHN0b3JhZ2UudHJhbnNhY3Rpb24ub25hYm9ydCA9IHN0b3JhZ2UudHJhbnNhY3Rpb24ub25lcnJvciA9IChlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KChlIGFzIGFueSkubWVzc2FnZSB8fCBlLnR5cGUpO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgYWN0aW9uKHN0b3JhZ2UsIHJlc3VsdCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyByZXF1ZXN0PFREYXRhPihcclxuICAgICAgICByZXF1ZXN0OiBJREJSZXF1ZXN0LFxyXG4gICAgICAgIGFjdGlvbj86IChkYXRhOiBURGF0YSkgPT4gdm9pZFxyXG4gICAgKTogdm9pZCB7XHJcbiAgICAgICAgcmVxdWVzdC5vbnN1Y2Nlc3MgPSAoZSkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBkYXRhID0gKGUudGFyZ2V0IGFzIGFueSkucmVzdWx0IGFzIFREYXRhO1xyXG5cclxuICAgICAgICAgICAgaWYgKGFjdGlvbikge1xyXG4gICAgICAgICAgICAgICAgYWN0aW9uKGRhdGEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICByZXF1ZXN0Lm9uZXJyb3IgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIHJlcXVlc3QudHJhbnNhY3Rpb24uYWJvcnQoKTtcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgYWRkQXJyYXk8VEl0ZW0+KFxyXG4gICAgICAgIHN0b3JhZ2U6IElEQk9iamVjdFN0b3JlLFxyXG4gICAgICAgIGl0ZW1zOiBBcnJheTxUSXRlbT4sXHJcbiAgICAgICAgY29tcGxldGVkPzogKCkgPT4gdm9pZFxyXG4gICAgKTogdm9pZCB7XHJcbiAgICAgICAgbGV0IGkgPSAwO1xyXG5cclxuICAgICAgICBjb25zdCBhZGROZXh0ID0gKCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoaSA8IGl0ZW1zLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaXRlbSA9IGl0ZW1zW2ldO1xyXG4gICAgICAgICAgICAgICAgaSsrO1xyXG4gICAgICAgICAgICAgICAgSW5kZXhlZERiVXRpbHMucmVxdWVzdDxJREJDdXJzb3JXaXRoVmFsdWU+KHN0b3JhZ2UuYWRkKGl0ZW0pLCBhZGROZXh0KTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlmIChjb21wbGV0ZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb21wbGV0ZWQoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGFkZE5leHQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIHJlbW92ZShuYW1lOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICBjb25zdCBmYWN0b3J5ID0gSW5kZXhlZERCUHJvdmlkZXIuZ2V0SW5kZXhlZERCKCk7XHJcblxyXG4gICAgICAgIGlmICghZmFjdG9yeSkge1xyXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoJ0Nhbm5vdCBpbnN0YW50aWF0ZSBJbmRleGVkREIgZmFjdG9yeS4nKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZTx2b2lkPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHJlcXVlc3QgPSBmYWN0b3J5LmRlbGV0ZURhdGFiYXNlKG5hbWUpO1xyXG4gICAgICAgICAgICByZXF1ZXN0Lm9uc3VjY2VzcyA9ICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgcmVxdWVzdC5vbmVycm9yID0gKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmVqZWN0KGBFcnJvciBvbiByZW1vdmluZyBJbmRleGVkREIgJyR7bmFtZX0nYCk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHJlcXVlc3Qub25ibG9ja2VkID0gKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmVqZWN0KGBSZW1vdmluZyAnJHtuYW1lfScgd2FzIGJsb2NrZWQuYCk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL2lmZGVmLWxvYWRlci9pZmRlZi1sb2FkZXIuanM/REVCVUc9dHJ1ZSZQRVJGT1JNQU5DRV9BVURJVD10cnVlIS4vc3JjL2ZyYW1ld29yay9pbmRleGVkZGItdXRpbHMudHMiLCJpbXBvcnQgeyBHdWlkUHJvdmlkZXIgfSBmcm9tICcuLi8uLi9mcmFtZXdvcmsvZ3VpZCc7XHJcbmltcG9ydCB7IElXb3JrZXJNZXNzYWdlLCBJV29ya2VyTWVzc2FnZVJlY2VpdmVyLCBJV29ya2VyTWVzc2FnZVNlbmRlciwgV29ya2VyRGF0YVR5cGUgfSBmcm9tICcuLi93b3JrZXItZGVmaW5pdGlvbnMnO1xyXG5pbXBvcnQgeyBJUmVxdWVzdEVudmVsb3AgfSBmcm9tICcuL3dvcmtlci1yZXF1ZXN0LXJlY2VpdmVyJztcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSVJlc3BvbnNlRW52ZWxvcDxUVHlwZSBleHRlbmRzIFdvcmtlckRhdGFUeXBlLCBUUmVzcG9uc2U+IGV4dGVuZHMgSVdvcmtlck1lc3NhZ2U8VFR5cGU+ICB7XHJcbiAgICByZXNwb25zZT86IFRSZXNwb25zZTtcclxuXHJcbiAgICBlcnJvcj86IHsgbWVzc2FnZTogc3RyaW5nIH07XHJcblxyXG4gICAgbWVzc2FnZUlkOiBzdHJpbmc7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUVycm9yIHtcclxuICAgIG1lc3NhZ2U6IHN0cmluZztcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFdvcmtlclJlcXVlc3RTZW5kZXI8VFR5cGUgZXh0ZW5kcyBXb3JrZXJEYXRhVHlwZSwgVFJlcXVlc3QsIFRSZXNwb25zZT4ge1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfZGljdGlvbmFyeToge1xyXG4gICAgICAgIFttZXNzYWdlaWQ6IHN0cmluZ106IHtcclxuICAgICAgICAgICAgcmVzb2x2ZT86IChyZXNwb25zZT86IFRSZXNwb25zZSkgPT4gdm9pZCxcclxuICAgICAgICAgICAgcmVqZWN0PzogKGVycm9yOiBJRXJyb3IpID0+IHZvaWRcclxuICAgICAgICB9XHJcbiAgICB9ID0geyB9O1xyXG5cclxuICAgIHByaXZhdGUgcmVhZG9ubHkgX2d1aWQgPSBHdWlkUHJvdmlkZXIuZGVmYXVsdDtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgdHlwZTogVFR5cGUsXHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBfc2VuZGVyOiBJV29ya2VyTWVzc2FnZVNlbmRlcixcclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IF9yZWNlaXZlcjogSVdvcmtlck1lc3NhZ2VSZWNlaXZlclxyXG4gICAgKSB7XHJcbiAgICAgICAgX3JlY2VpdmVyLmFkZEV2ZW50TGlzdGVuZXIodHlwZSwgdGhpcy5fcmVzcG9uc2UpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZW5kKGRhdGE/OiBUUmVxdWVzdCwgcmVzb2x2ZWQ/OiAocmVzcG9uc2U6IFRSZXNwb25zZSkgPT4gdm9pZCwgcmVqZWN0ZWQ/OiAoZXJyb3I6IElFcnJvcikgPT4gdm9pZCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IG1lc3NhZ2VJZCA9IHRoaXMuX2d1aWQubmV4dCgpO1xyXG5cclxuICAgICAgICB0aGlzLl9kaWN0aW9uYXJ5W21lc3NhZ2VJZF0gPSB7IHJlc29sdmU6IHJlc29sdmVkLCByZWplY3Q6IHJlamVjdGVkIH07XHJcblxyXG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IHRoaXMuX3NlbmRlci5wb3N0TWVzc2FnZSh7IHR5cGU6IHRoaXMudHlwZSwgbWVzc2FnZUlkLCByZXF1ZXN0OiBkYXRhIH0gYXMgSVJlcXVlc3RFbnZlbG9wPFRUeXBlLCBUUmVxdWVzdD4pO1xyXG4gICAgICAgIGlmIChyZXN1bHQgJiYgdHlwZW9mIHJlc3VsdC5jYXRjaCA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICByZXN1bHQuY2F0Y2gocmVqZWN0ZWQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZGlzcG9zZSgpIHtcclxuICAgICAgICB0aGlzLl9yZWNlaXZlci5yZW1vdmVFdmVudExpc3RlbmVyKHRoaXMudHlwZSwgdGhpcy5fcmVzcG9uc2UpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX3Jlc3BvbnNlID0gKGRhdGE6IElSZXNwb25zZUVudmVsb3A8VFR5cGUsIFRSZXNwb25zZT4pID0+IHtcclxuICAgICAgICBjb25zdCBtZXNzYWdlSWQgPSBkYXRhLm1lc3NhZ2VJZDtcclxuXHJcbiAgICAgICAgaWYgKG1lc3NhZ2VJZCkge1xyXG4gICAgICAgICAgICBjb25zdCBjYWxsYmFja3MgPSB0aGlzLl9kaWN0aW9uYXJ5W21lc3NhZ2VJZF07XHJcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLl9kaWN0aW9uYXJ5W21lc3NhZ2VJZF07XHJcblxyXG4gICAgICAgICAgICBpZiAoY2FsbGJhY2tzKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0YS5lcnJvcikge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgY2FsbGJhY2tzLnJlamVjdCA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFja3MucmVqZWN0KGRhdGEuZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBjYWxsYmFja3MucmVzb2x2ZSA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFja3MucmVzb2x2ZShkYXRhLnJlc3BvbnNlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL2lmZGVmLWxvYWRlci9pZmRlZi1sb2FkZXIuanM/REVCVUc9dHJ1ZSZQRVJGT1JNQU5DRV9BVURJVD10cnVlIS4vc3JjL3dvcmtlcnMvc2VuZGVycy93b3JrZXItcmVxdWVzdC1zZW5kZXIudHMiLCJpbXBvcnQgeyBJTG9nZ2VyIH0gZnJvbSAnLi4vLi4vbG9ncy9sb2dnZXInO1xyXG5pbXBvcnQgeyBJTGlzdGVuZXIsIElXb3JrZXJNZXNzYWdlLCBJV29ya2VyTWVzc2FnZVJlY2VpdmVyLCBNZXNzYWdlRXZlbnRMaXN0ZW5lciwgV29ya2VyRGF0YVR5cGUgfSBmcm9tICcuLi93b3JrZXItZGVmaW5pdGlvbnMnO1xyXG5cclxuLyoqXHJcbiAqIENsYXNzIGNvbnZlcnRzIGphdmFzY3JpcHQgbWVzc2FnZXMgd2l0aCBzdGFuZGFyZCBldmVudCAnbWVzc2FnZScgdG8gc3Ryb25nbHkgdHlwZWQgY3VzdG9tIG1lc3NhZ2VzXHJcbiAqXHJcbiAqIEBpbnRlcm5hbFxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIE1lc3NhZ2VSZWNlaXZlciBpbXBsZW1lbnRzIElXb3JrZXJNZXNzYWdlUmVjZWl2ZXIge1xyXG4gICAgcHJpdmF0ZSBfZGljOiB7IFt0eXBlOiBzdHJpbmddOiBBcnJheTxJTGlzdGVuZXI8YW55Pj4gfSA9IHsgfTtcclxuICAgIHByaXZhdGUgX2J1ZmZlcnM6IHsgW3R5cGU6IHN0cmluZ106IEFycmF5PE1lc3NhZ2VFdmVudD4gfSA9IHsgfTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IF9yZWNlaXZlcjoge1xyXG4gICAgICAgICAgICBhZGRFdmVudExpc3RlbmVyOiAodHlwZTogJ21lc3NhZ2UnLCBsaXN0ZW5lcjogTWVzc2FnZUV2ZW50TGlzdGVuZXIpID0+IHZvaWQsXHJcbiAgICAgICAgICAgIHJlbW92ZUV2ZW50TGlzdGVuZXI6ICh0eXBlOiAnbWVzc2FnZScsIGxpc3RlbmVyOiBNZXNzYWdlRXZlbnRMaXN0ZW5lcikgPT4gdm9pZFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBfbG9nZ2VyOiBJTG9nZ2VyXHJcbiAgICApIHtcclxuICAgICAgICBfcmVjZWl2ZXIuYWRkRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIHRoaXMuX2hhbmRsZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhZGRFdmVudExpc3RlbmVyPFRNZXNzYWdlIGV4dGVuZHMgSVdvcmtlck1lc3NhZ2U8V29ya2VyRGF0YVR5cGU+Pih0eXBlOiBzdHJpbmcsIGxpc3RlbmVyOiBJTGlzdGVuZXI8VE1lc3NhZ2U+KSB7XHJcbiAgICAgICAgY29uc3QgbGlzdGVuZXJzID0gdGhpcy5fZGljW3R5cGVdID0gdGhpcy5fZGljW3R5cGVdIHx8IFtdO1xyXG5cclxuICAgICAgICBsaXN0ZW5lcnMucHVzaChsaXN0ZW5lcik7XHJcblxyXG4gICAgICAgIHRoaXMuZmx1c2hCdWZmZXIodHlwZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlbW92ZUV2ZW50TGlzdGVuZXI8VE1lc3NhZ2UgZXh0ZW5kcyBJV29ya2VyTWVzc2FnZTxXb3JrZXJEYXRhVHlwZT4+KHR5cGU6IHN0cmluZywgbGlzdGVuZXI6IElMaXN0ZW5lcjxUTWVzc2FnZT4pIHtcclxuICAgICAgICBjb25zdCBsaXN0ZW5lcnMgPSB0aGlzLl9kaWNbdHlwZV07XHJcblxyXG4gICAgICAgIGlmIChsaXN0ZW5lcnMpIHtcclxuICAgICAgICAgICAgY29uc3QgaW5kZXggPSBsaXN0ZW5lcnMuaW5kZXhPZihsaXN0ZW5lcik7XHJcbiAgICAgICAgICAgIGlmIChpbmRleCA+PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBsaXN0ZW5lcnMuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGxpc3RlbmVycy5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgICAgIGRlbGV0ZSB0aGlzLl9kaWNbdHlwZV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGRpc3Bvc2UoKSB7XHJcbiAgICAgICAgdGhpcy5fZGljID0geyB9O1xyXG4gICAgICAgIHRoaXMuX2J1ZmZlcnMgPSB7IH07XHJcbiAgICAgICAgdGhpcy5fcmVjZWl2ZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIHRoaXMuX2hhbmRsZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZmx1c2hCdWZmZXIodHlwZTogc3RyaW5nKSB7XHJcbiAgICAgICAgY29uc3QgYnVmZmVyID0gdGhpcy5fYnVmZmVyc1t0eXBlXTtcclxuICAgICAgICBpZiAoYnVmZmVyICYmIGJ1ZmZlci5sZW5ndGggIT09IDApIHtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBsZW5ndGggPSBidWZmZXIubGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2hhbmRsZXIoYnVmZmVyW2ldKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJ1ZmZlci5sZW5ndGggPSAwO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfaGFuZGxlciA9IChldmVudDogTWVzc2FnZUV2ZW50KSA9PiB7XHJcbiAgICAgICAgY29uc3QgcmVxdWVzdCA9IGV2ZW50LmRhdGEgYXMgSVdvcmtlck1lc3NhZ2U8V29ya2VyRGF0YVR5cGU+O1xyXG5cclxuICAgICAgICBpZiAocmVxdWVzdCAmJiByZXF1ZXN0LnR5cGUpIHtcclxuICAgICAgICAgICAgY29uc3QgbGlzdGVuZXJzID0gdGhpcy5fZGljW3JlcXVlc3QudHlwZV07XHJcblxyXG4gICAgICAgICAgICBpZiAobGlzdGVuZXJzKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGxpc3RlbmVyIG9mIGxpc3RlbmVycykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpc3RlbmVyKHJlcXVlc3QpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2xvZ2dlci5lcnJvcihgRXJyb3Igb24gZXhlY3V0aW5nIGxpc3RlbmVyIGZvciBtZXNzYWdlIHR5cGUgJHtyZXF1ZXN0LnR5cGV9YCwgZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGJ1ZmZlciA9IHRoaXMuX2J1ZmZlcnNbcmVxdWVzdC50eXBlXSB8fCAodGhpcy5fYnVmZmVyc1tyZXF1ZXN0LnR5cGVdID0gW10pO1xyXG4gICAgICAgICAgICAgICAgYnVmZmVyLnB1c2goZXZlbnQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy9pZmRlZi1sb2FkZXIvaWZkZWYtbG9hZGVyLmpzP0RFQlVHPXRydWUmUEVSRk9STUFOQ0VfQVVESVQ9dHJ1ZSEuL3NyYy93b3JrZXJzL3NlbmRlcnMvbWVzc2FnZS1yZWNlaXZlci50cyIsImV4cG9ydCBpbnRlcmZhY2UgSVJlc3BvbnNlRW1pdHRlcjxUUmVxdWVzdCwgVFJlc3BvbnNlPiB7XHJcbiAgICBpbnZva2UocmVxdWVzdDogVFJlcXVlc3QpOiBUUmVzcG9uc2UgfCBQcm9taXNlPFRSZXNwb25zZT47XHJcblxyXG4gICAgc3RvcCgpOiB2b2lkO1xyXG59XHJcblxyXG5leHBvcnQgdHlwZSBJSGFuZGxlcjxUUmVxdWVzdCwgVFJlc3BvbnNlPiA9IChyZXF1ZXN0OiBUUmVxdWVzdCkgPT4gVFJlc3BvbnNlIHwgUHJvbWlzZTxUUmVzcG9uc2U+O1xyXG5cclxuLyoqXHJcbiAqIEhhbmRsZXIgZm9yIHRoaXMgZW1pdHRlciBpcyBvcHRpb25hbC5cclxuICogRGVmYXVsdCB2YWx1ZSB3aWxsIGJlIHJldHVybmVkIG9uIHVuZGVmaW5lZCBoYW5kbGVyLlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIE9wdGlvbmFsUmVzcG9uc2VFbWl0dGVyPFRSZXF1ZXN0LCBUUmVzcG9uc2U+IGltcGxlbWVudHMgSVJlc3BvbnNlRW1pdHRlcjxUUmVxdWVzdCwgVFJlc3BvbnNlPiB7XHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgZGVmOiBUUmVzcG9uc2UsXHJcbiAgICAgICAgcHVibGljIGhhbmRsZXI/OiBJSGFuZGxlcjxUUmVxdWVzdCwgVFJlc3BvbnNlPlxyXG4gICAgKSB7IH1cclxuXHJcbiAgICBwdWJsaWMgcmVhZG9ubHkgaW52b2tlID0gKHJlcXVlc3Q6IFRSZXF1ZXN0KTogVFJlc3BvbnNlIHwgUHJvbWlzZTxUUmVzcG9uc2U+ID0+IHtcclxuICAgICAgICBpZiAodGhpcy5oYW5kbGVyKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmhhbmRsZXIocmVxdWVzdCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLmRlZjtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RvcCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmhhbmRsZXIgPSB1bmRlZmluZWQ7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBIYW5kbGVyIGZvciB0aGlzIGVtaXR0ZXIgaXMgbWFuZGF0b3J5LlxyXG4gKiBBbGwgcmVxdWVzdHMgd2l0aG91dCBoYW5kbGVyIHdpbGwgYmUgYnVmZXJyZWQgYW5kIHBhc3NlZCB0byBhIG5ldyBoYW5kbGVyIG9uIGl0cyBzZXR0aW5nLlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIE1hbmRhdG9yeVJlc3BvbnNlRW1pdHRlcjxUUmVxdWVzdCwgVFJlc3BvbnNlPiBpbXBsZW1lbnRzIElSZXNwb25zZUVtaXR0ZXI8VFJlcXVlc3QsIFRSZXNwb25zZT4ge1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfYnVmZmVyID0gbmV3IEFycmF5PHsgcmVxdWVzdDogVFJlcXVlc3QsIHJlc29sdmU6IChyZXNwb25zZTogVFJlc3BvbnNlIHwgUHJvbWlzZUxpa2U8VFJlc3BvbnNlPikgPT4gdm9pZCB9PigpO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHByaXZhdGUgX2hhbmRsZXI/OiBJSGFuZGxlcjxUUmVxdWVzdCwgVFJlc3BvbnNlPlxyXG4gICAgKSB7IH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGhhbmRsZXIoKTogdW5kZWZpbmVkIHwgSUhhbmRsZXI8VFJlcXVlc3QsIFRSZXNwb25zZT4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9oYW5kbGVyO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHNldCBoYW5kbGVyKHZhbHVlOiB1bmRlZmluZWQgfCBJSGFuZGxlcjxUUmVxdWVzdCwgVFJlc3BvbnNlPikge1xyXG4gICAgICAgIHRoaXMuX2hhbmRsZXIgPSB2YWx1ZTtcclxuICAgICAgICB0aGlzLmZsdXNoQnVmZmVyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlYWRvbmx5IGludm9rZSA9IChyZXF1ZXN0OiBUUmVxdWVzdCk6IFRSZXNwb25zZSB8IFByb21pc2U8VFJlc3BvbnNlPiA9PiB7XHJcbiAgICAgICAgaWYgKHRoaXMuaGFuZGxlcikge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5oYW5kbGVyKHJlcXVlc3QpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLl9idWZmZXIucHVzaCh7IHJlcXVlc3QsIHJlc29sdmUgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0b3AoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5oYW5kbGVyID0gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZmx1c2hCdWZmZXIoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2hhbmRsZXIgJiYgdGhpcy5fYnVmZmVyLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgZm9yIChjb25zdCBkYXRhIG9mIHRoaXMuX2J1ZmZlcikge1xyXG4gICAgICAgICAgICAgICAgZGF0YS5yZXNvbHZlKHRoaXMuaW52b2tlKGRhdGEucmVxdWVzdCkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy9pZmRlZi1sb2FkZXIvaWZkZWYtbG9hZGVyLmpzP0RFQlVHPXRydWUmUEVSRk9STUFOQ0VfQVVESVQ9dHJ1ZSEuL3NyYy93b3JrZXJzL3NlbmRlcnMvcmVzcG9uc2UtZW1pdHRlci50cyIsImltcG9ydCB7IEV2ZW50RW1pdHRlciB9IGZyb20gJy4uLy4uL2ZyYW1ld29yay9ldmVudC1lbWl0dGVyJztcclxuaW1wb3J0IHsgSVdvcmtlck1lc3NhZ2UsIElXb3JrZXJNZXNzYWdlUmVjZWl2ZXIsIFdvcmtlckRhdGFUeXBlIH0gZnJvbSAnLi4vd29ya2VyLWRlZmluaXRpb25zJztcclxuXHJcbi8qKlxyXG4gKiBDbGFzcyB3cmFwcGVyIGZvciByZWNlaXZpbmcgbWVzc2FnZXMgYXMgdHlwZWQgZXZlbnRzXHJcbiAqXHJcbiAqIEBpbnRlcm5hbFxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFdvcmtlckV2ZW50UmVjZWl2ZXI8VFR5cGUgZXh0ZW5kcyBXb3JrZXJEYXRhVHlwZSwgVFdvcmtlck1lc3NhZ2UgZXh0ZW5kcyBJV29ya2VyTWVzc2FnZTxUVHlwZT4+IHtcclxuICAgIHB1YmxpYyByZWFkb25seSBldmVudDogRXZlbnRFbWl0dGVyPFRXb3JrZXJNZXNzYWdlPiA9IG5ldyBFdmVudEVtaXR0ZXI8VFdvcmtlck1lc3NhZ2U+KCk7XHJcblxyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IHR5cGU6IFRUeXBlLFxyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgX3JlY2VpdmVyOiBJV29ya2VyTWVzc2FnZVJlY2VpdmVyXHJcbiAgICApIHtcclxuICAgICAgICBfcmVjZWl2ZXIuYWRkRXZlbnRMaXN0ZW5lcih0eXBlLCB0aGlzLl9oYW5kbGVyKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZGlzcG9zZSgpIHtcclxuICAgICAgICB0aGlzLl9yZWNlaXZlci5yZW1vdmVFdmVudExpc3RlbmVyKHRoaXMudHlwZSwgdGhpcy5faGFuZGxlcik7XHJcbiAgICAgICAgdGhpcy5ldmVudC5jbGVhcigpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX2hhbmRsZXIgPSAoZGF0YTogVFdvcmtlck1lc3NhZ2UpID0+IHtcclxuICAgICAgICBpZiAoZGF0YS50eXBlID09PSB0aGlzLnR5cGUpIHtcclxuICAgICAgICAgICAgdGhpcy5ldmVudC5lbWl0KGRhdGEpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvaWZkZWYtbG9hZGVyL2lmZGVmLWxvYWRlci5qcz9ERUJVRz10cnVlJlBFUkZPUk1BTkNFX0FVRElUPXRydWUhLi9zcmMvd29ya2Vycy9zZW5kZXJzL3dvcmtlci1ldmVudC1yZWNlaXZlci50cyIsImltcG9ydCB7IElXb3JrZXJNZXNzYWdlLCBJV29ya2VyTWVzc2FnZVJlY2VpdmVyLCBJV29ya2VyTWVzc2FnZVNlbmRlciwgV29ya2VyRGF0YVR5cGUgfSBmcm9tICcuLi93b3JrZXItZGVmaW5pdGlvbnMnO1xyXG5pbXBvcnQgeyBJUmVzcG9uc2VFbWl0dGVyIH0gZnJvbSAnLi9yZXNwb25zZS1lbWl0dGVyJztcclxuaW1wb3J0IHsgSVJlc3BvbnNlRW52ZWxvcCB9IGZyb20gJy4vd29ya2VyLXJlcXVlc3Qtc2VuZGVyJztcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSVJlcXVlc3RFbnZlbG9wPFRUeXBlIGV4dGVuZHMgV29ya2VyRGF0YVR5cGUsIFRSZXF1ZXN0PiBleHRlbmRzIElXb3JrZXJNZXNzYWdlPFRUeXBlPiB7XHJcbiAgICByZXF1ZXN0OiBUUmVxdWVzdDtcclxuXHJcbiAgICBtZXNzYWdlSWQ6IHN0cmluZztcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFdvcmtlclJlcXVlc3RSZWNlaXZlcjxUVHlwZSBleHRlbmRzIFdvcmtlckRhdGFUeXBlLCBUUmVxdWVzdCwgVFJlc3BvbnNlPiB7XHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgdHlwZTogVFR5cGUsXHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBfc2VuZGVyOiBJV29ya2VyTWVzc2FnZVNlbmRlcixcclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IF9yZWNlaXZlcjogSVdvcmtlck1lc3NhZ2VSZWNlaXZlcixcclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IF9oYW5kbGVyOiBJUmVzcG9uc2VFbWl0dGVyPFRSZXF1ZXN0LCBUUmVzcG9uc2U+XHJcbiAgICApIHtcclxuICAgICAgICBfcmVjZWl2ZXIuYWRkRXZlbnRMaXN0ZW5lcih0eXBlLCB0aGlzLl9yZXNwb25zZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGRpc3Bvc2UoKSB7XHJcbiAgICAgICAgdGhpcy5fcmVjZWl2ZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcih0aGlzLnR5cGUsIHRoaXMuX3Jlc3BvbnNlKTtcclxuICAgICAgICB0aGlzLl9oYW5kbGVyLnN0b3AoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9yZXNwb25zZSA9IChkYXRhOiBJUmVxdWVzdEVudmVsb3A8VFR5cGUsIFRSZXF1ZXN0PikgPT4ge1xyXG4gICAgICAgIGNvbnN0IG1lc3NhZ2VJZCA9IGRhdGEubWVzc2FnZUlkO1xyXG4gICAgICAgIGNvbnN0IHR5cGUgPSBkYXRhLnR5cGU7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnR5cGUgPT09IHR5cGUpIHtcclxuICAgICAgICAgICAgaWYgKG1lc3NhZ2VJZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hd2FpdFJlc3BvbnNlKHR5cGUsIGRhdGEucmVxdWVzdCwgbWVzc2FnZUlkKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucmlzZUV2ZW50KHR5cGUsIGRhdGEucmVxdWVzdCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBhd2FpdFJlc3BvbnNlKHR5cGU6IFRUeXBlLCByZXF1ZXN0OiBUUmVxdWVzdCwgbWVzc2FnZUlkOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBzZW5kZXIgPSB0aGlzLl9zZW5kZXI7XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdChlcnJvcjogYW55KSB7XHJcbiAgICAgICAgICAgIGxldCBtZXNzYWdlID0gJyc7XHJcbiAgICAgICAgICAgIGlmIChlcnJvciAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBFcnJvcikge1xyXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2UgPSBlcnJvci5tZXNzYWdlO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlID0gZXJyb3IudG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzZW5kZXIucG9zdE1lc3NhZ2UoeyB0eXBlLCBtZXNzYWdlSWQsIGVycm9yOiB7IG1lc3NhZ2UgfSB9IGFzIElSZXNwb25zZUVudmVsb3A8VFR5cGUsIFRSZXNwb25zZT4pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmdW5jdGlvbiByZXNvbHZlKHJlc3BvbnNlOiBUUmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgc2VuZGVyLnBvc3RNZXNzYWdlKHsgdHlwZSwgbWVzc2FnZUlkLCByZXNwb25zZSB9IGFzIElSZXNwb25zZUVudmVsb3A8VFR5cGUsIFRSZXNwb25zZT4pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gdGhpcy5faGFuZGxlci5pbnZva2UocmVxdWVzdCk7XHJcblxyXG4gICAgICAgICAgICBpZiAodHlwZW9mIFByb21pc2UgIT09ICd1bmRlZmluZWQnICYmIHJlc3VsdCBpbnN0YW5jZW9mIFByb21pc2UpIHtcclxuICAgICAgICAgICAgICAgIHJlc3VsdC50aGVuKHJlc29sdmUsIHJlamVjdCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3VsdCBhcyBUUmVzcG9uc2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSByaXNlRXZlbnQodHlwZTogc3RyaW5nLCByZXF1ZXN0OiBUUmVxdWVzdCk6IHZvaWQge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2hhbmRsZXIuaW52b2tlKHJlcXVlc3QpO1xyXG4gICAgICAgIH0gY2F0Y2ggeyAvKiovIH1cclxuICAgIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvaWZkZWYtbG9hZGVyL2lmZGVmLWxvYWRlci5qcz9ERUJVRz10cnVlJlBFUkZPUk1BTkNFX0FVRElUPXRydWUhLi9zcmMvd29ya2Vycy9zZW5kZXJzL3dvcmtlci1yZXF1ZXN0LXJlY2VpdmVyLnRzIiwiaW1wb3J0IHsgSVNjcmlwdExvYWRlciwgU2NyaXB0TG9hZGVyIH0gZnJvbSAnLi4vZnJhbWV3b3JrL3NjcmlwdC1sb2FkZXInO1xyXG5pbXBvcnQgeyBJTWVzc2FnZUV2ZW50LCBJV29ya2VyR2xvYmFsU2NvcGUsIElXb3JrZXJMb2NhdGlvbiwgTWVzc2FnZUV2ZW50TGlzdGVuZXIgfSBmcm9tICcuL3dvcmtlci1kZWZpbml0aW9ucyc7XHJcblxyXG4vKipcclxuICogVmFyaWFibGUgbmFtZSB0byBwYXNzIFBzZXVkb1dvcmtlciBiZXR3ZWVuIG1haW4gY29kZSBhbmQgbG9hZGVkIGluIGEgV2ViV29ya2VyXHJcbiAqIEBpbnRlcm5hbFxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IFBzZXVkb1dvcmtlclNjb3BlTmFtZSA9ICdNZXNzYWdpbmdDbGllbnQtUHNldWRvV29ya2VyJztcclxuXHJcbi8qKlxyXG4gKiBFbXVsYXRvciBvZiBXZWIgV29ya2VyIGJlaGF2aW9yLiBSdW4gYWxsIHByb2NjZXNzIGluIHRoZSBtYWluIHdpbmRvdyBwcm9jZXNzLlxyXG4gKlxyXG4gKiBSZXF1aXJlZCBjb21wYXRpYmlsaXR5IHdpdGggSUU5IHdpdGhvdXQgcG9seWZpbGxzXHJcbiAqXHJcbiAqIEBpbnRlcm5hbFxyXG4gKiBAY2xhc3MgUHNldWRvV29ya2VyXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgUHNldWRvV29ya2VyIHtcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgX3BzZXVkb1dvcmtlcjogSW50ZXJuYWxQc2V1ZG9Xb3JrZXI7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9saXN0ZW5lcnM6IEFycmF5PE1lc3NhZ2VFdmVudExpc3RlbmVyPiA9IFtdO1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfYnVmZmVyOiBBcnJheTxJTWVzc2FnZUV2ZW50PiA9IFtdO1xyXG4gICAgcHJpdmF0ZSBfZ2xvYmFsOiBhbnkgPSB3aW5kb3c7XHJcblxyXG4gICAgcHVibGljIGdldCBwc2V1ZG9Xb3JrZXIoKSB7IHJldHVybiB0aGlzLl9wc2V1ZG9Xb3JrZXI7IH1cclxuXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwYXRoOiBzdHJpbmcsXHJcbiAgICAgICAgc2NyaXB0TG9hZGVyOiBJU2NyaXB0TG9hZGVyID0gbmV3IFNjcmlwdExvYWRlcigpXHJcbiAgICApIHtcclxuICAgICAgICB0aGlzLl9wc2V1ZG9Xb3JrZXIgPSB0aGlzLl9nbG9iYWxbUHNldWRvV29ya2VyU2NvcGVOYW1lXSA9XHJcbiAgICAgICAgICAgIG5ldyBJbnRlcm5hbFBzZXVkb1dvcmtlcihcclxuICAgICAgICAgICAgICAgIHBhdGgsXHJcbiAgICAgICAgICAgICAgICBzY3JpcHRMb2FkZXIsXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmFpc2VFdmVudDogKG1lc3NhZ2UpID0+IHRoaXMucmFpc2VFdmVudChtZXNzYWdlKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIHNjcmlwdExvYWRlci5sb2FkU2NyaXB0KHBhdGgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBwb3N0TWVzc2FnZShtZXNzYWdlOiBvYmplY3QpIHtcclxuICAgICAgICB0aGlzLl9wc2V1ZG9Xb3JrZXIucmFpc2VFdmVudCh7IGRhdGE6IG1lc3NhZ2UgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFkZEV2ZW50TGlzdGVuZXIoZXZlbnQ6ICdtZXNzYWdlJywgbGlzdGVuZXI6IE1lc3NhZ2VFdmVudExpc3RlbmVyKSB7XHJcbiAgICAgICAgaWYgKGV2ZW50ID09PSAnbWVzc2FnZScpIHtcclxuICAgICAgICAgICAgdGhpcy5fbGlzdGVuZXJzLnB1c2gobGlzdGVuZXIpO1xyXG5cclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fYnVmZmVyLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBidWZmZXIgPSB0aGlzLl9idWZmZXIuc2xpY2UoKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBsZW5ndGggPSBidWZmZXIubGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yYWlzZUV2ZW50KGJ1ZmZlcltpXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2J1ZmZlci5sZW5ndGggPSAwO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnQ6ICdtZXNzYWdlJywgbGlzdGVuZXI6IE1lc3NhZ2VFdmVudExpc3RlbmVyKSB7XHJcbiAgICAgICAgY29uc3QgaW5kZXggPSB0aGlzLl9saXN0ZW5lcnMuaW5kZXhPZihsaXN0ZW5lcik7XHJcbiAgICAgICAgaWYgKGluZGV4ID4gLTEpIHtcclxuICAgICAgICAgICAgdGhpcy5fbGlzdGVuZXJzLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB0ZXJtaW5hdGUoKSB7XHJcbiAgICAgICAgdGhpcy5fYnVmZmVyLmxlbmd0aCA9IDA7XHJcbiAgICAgICAgdGhpcy5fbGlzdGVuZXJzLmxlbmd0aCA9IDA7XHJcbiAgICAgICAgdGhpcy5fcHNldWRvV29ya2VyLmNsb3NlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSByYWlzZUV2ZW50KG1lc3NhZ2U6IElNZXNzYWdlRXZlbnQpIHtcclxuICAgICAgICBjb25zdCBsaXN0ZW5lcnMgPSB0aGlzLl9saXN0ZW5lcnM7XHJcbiAgICAgICAgY29uc3QgbGVuZ3RoID0gbGlzdGVuZXJzLmxlbmd0aDtcclxuICAgICAgICBpZiAobGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBsaXN0ZW5lciA9IGxpc3RlbmVyc1tpXTtcclxuICAgICAgICAgICAgICAgIGxpc3RlbmVyKG1lc3NhZ2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5fYnVmZmVyLnB1c2gobWVzc2FnZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG4vKipcclxuICogSW5zdGFuY2UgZm9yIGVtdWxhdGlvbmcgV29ya2VyIEVudmlyb25tZW50IGluc2lkZSBXZWJXb3JrZXIgY29kZVxyXG4gKlxyXG4gKiBAY2xhc3MgSW50ZXJuYWxQc2V1ZG9Xb3JrZXJcclxuICogQGltcGxlbWVudHMge0lXb3JrZXJHbG9iYWxTY29wZX1cclxuICovXHJcbmNsYXNzIEludGVybmFsUHNldWRvV29ya2VyIGltcGxlbWVudHMgSVdvcmtlckdsb2JhbFNjb3BlIHtcclxuICAgIHB1YmxpYyByZWFkb25seSBsb2NhdGlvbjogSVdvcmtlckxvY2F0aW9uO1xyXG5cclxuICAgIHByaXZhdGUgcmVhZG9ubHkgX2xpc3RlbmVyczogQXJyYXk8TWVzc2FnZUV2ZW50TGlzdGVuZXI+ID0gW107XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9idWZmZXI6IEFycmF5PElNZXNzYWdlRXZlbnQ+ID0gW107XHJcblxyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgbG9jYXRpb246IHN0cmluZyxcclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IF9zY3JpcHRMb2FkZXI6IElTY3JpcHRMb2FkZXIsXHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBfaW50ZXJuYWw6IElJbnRlcm5hbFdvcmtlckZ1bmN0aW9ucyxcclxuICAgICkge1xyXG4gICAgICAgIHRoaXMubG9jYXRpb24gPSBsb2NhdGlvbjtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcG9zdE1lc3NhZ2UobWVzc2FnZTogb2JqZWN0KTogdm9pZCB7XHJcbiAgICAgICAgbWVzc2FnZSA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkobWVzc2FnZSkpO1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLl9pbnRlcm5hbC5yYWlzZUV2ZW50KHsgZGF0YTogbWVzc2FnZSB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaW1wb3J0U2NyaXB0cyguLi5wYXRoczogQXJyYXk8c3RyaW5nPik6IGFueSB7XHJcbiAgICAgICAgbGV0IHJlc29sdmU6ICgpID0+IHZvaWQ7XHJcbiAgICAgICAgbGV0IHJlc29sdmVkOiBib29sZWFuO1xyXG5cclxuICAgICAgICBjb25zdCBsZW5ndGggPSBwYXRocy5sZW5ndGg7XHJcbiAgICAgICAgbGV0IHRvbG9hZCA9IHBhdGhzLmxlbmd0aDtcclxuICAgICAgICBjb25zdCBvbmxvYWQgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRvbG9hZC0tO1xyXG4gICAgICAgICAgICBpZiAodG9sb2FkIDw9IDApIHtcclxuICAgICAgICAgICAgICAgIHJlc29sdmVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGlmIChyZXNvbHZlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3NjcmlwdExvYWRlci5sb2FkU2NyaXB0KHBhdGhzW2ldLCBvbmxvYWQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgdGhlbjogKGNhbGxiYWNrOiAoKSA9PiB2b2lkKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAocmVzb2x2ZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjaygpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJlc29sdmUgPSBjYWxsYmFjaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFkZEV2ZW50TGlzdGVuZXIoZXZlbnQ6ICdtZXNzYWdlJyB8ICdjb25uZWN0JywgbGlzdGVuZXI6IE1lc3NhZ2VFdmVudExpc3RlbmVyKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKGV2ZW50ID09PSAnbWVzc2FnZScpIHtcclxuICAgICAgICAgICAgdGhpcy5fbGlzdGVuZXJzLnB1c2gobGlzdGVuZXIpO1xyXG5cclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fYnVmZmVyLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGJ1ZmZlciA9IHRoaXMuX2J1ZmZlci5zbGljZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGxlbmd0aCA9IGJ1ZmZlci5sZW5ndGg7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJhaXNlRXZlbnQoYnVmZmVyW2ldKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fYnVmZmVyLmxlbmd0aCA9IDA7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudDogJ21lc3NhZ2UnLCBsaXN0ZW5lcjogTWVzc2FnZUV2ZW50TGlzdGVuZXIpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBpbmRleCA9IHRoaXMuX2xpc3RlbmVycy5pbmRleE9mKGxpc3RlbmVyKTtcclxuICAgICAgICBpZiAoaW5kZXggPiAtMSkge1xyXG4gICAgICAgICAgICB0aGlzLl9saXN0ZW5lcnMuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJhaXNlRXZlbnQobWVzc2FnZTogSU1lc3NhZ2VFdmVudCkge1xyXG4gICAgICAgIGlmICghdGhpcy5fbGlzdGVuZXJzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICB0aGlzLl9idWZmZXIucHVzaChtZXNzYWdlKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjb25zdCBsZW5ndGggPSB0aGlzLl9saXN0ZW5lcnMubGVuZ3RoO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgbGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9saXN0ZW5lcnNbaW5kZXhdKG1lc3NhZ2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbG9zZSgpIHtcclxuICAgICAgICB0aGlzLl9idWZmZXIubGVuZ3RoID0gMDtcclxuICAgICAgICB0aGlzLl9saXN0ZW5lcnMubGVuZ3RoID0gMDtcclxuICAgIH1cclxufVxyXG5cclxuaW50ZXJmYWNlIElJbnRlcm5hbFdvcmtlckZ1bmN0aW9ucyB7XHJcbiAgICByYWlzZUV2ZW50KG1lc3NhZ2U6IElNZXNzYWdlRXZlbnQpOiB2b2lkO1xyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy9pZmRlZi1sb2FkZXIvaWZkZWYtbG9hZGVyLmpzP0RFQlVHPXRydWUmUEVSRk9STUFOQ0VfQVVESVQ9dHJ1ZSEuL3NyYy93b3JrZXJzL3BzZXVkby13b3JrZXIudHMiLCJpbXBvcnQgeyBHbG9iYWxQcm92aWRlciB9IGZyb20gJy4vZ2xvYmFsJztcclxuXHJcbi8qKlxyXG4gKiBMb2FkIHNjcmlwdCBmcm9tIGEgcGF0aFxyXG4gKlxyXG4gKiBAaW50ZXJuYWxcclxuICogQGludGVyZmFjZSBJU2NyaXB0TG9hZGVyXHJcbiAqL1xyXG5leHBvcnQgaW50ZXJmYWNlIElTY3JpcHRMb2FkZXIge1xyXG4gICAgbG9hZFNjcmlwdChwYXRoOiBzdHJpbmcsIG9ubG9hZD86ICgpID0+IHZvaWQpOiB2b2lkO1xyXG59XHJcblxyXG4vKipcclxuICogUG9seWZpbGwgZm9yIGxvYWRpbmcgc2NyaXB0IGluIERPTSBjb250ZXh0XHJcbiAqXHJcbiAqIEBpbnRlcm5hbFxyXG4gKiBAY2xhc3MgU2NyaXB0TG9hZGVyXHJcbiAqIEBpbXBsZW1lbnRzIHtJU2NyaXB0TG9hZGVyfVxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFNjcmlwdExvYWRlciBpbXBsZW1lbnRzIElTY3JpcHRMb2FkZXIge1xyXG4gICAgLyoqXHJcbiAgICAgKiBMb2FkIHNjcmlwdCBmcm9tIHBhdGggZW5kIGV4ZWN1dGUgaXRcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gcGF0aCB7c3RyaW5nfSAtIFBhdGggdG8gdGhlIHNjcmlwdFxyXG4gICAgICogQHBhcmFtIG9ubG9hZCB7KCkgPT4gdm9pZH0gLSBDYWxsYmFjayBleGVjdXRlZCBhZnRlciB0aGUgc2NyaXB0IGxvYWRzXHJcbiAgICAgKiBAbWVtYmVyb2YgU2NyaXB0TG9hZGVyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyByZWFkb25seSBsb2FkU2NyaXB0OiAocGF0aDogc3RyaW5nLCBvbmxvYWQ/OiAoKSA9PiB2b2lkKSA9PiB2b2lkO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIF9nbG9iYWwgPSBHbG9iYWxQcm92aWRlci5jdXJyZW50KClcclxuICAgICkge1xyXG4gICAgICAgIGlmICh0eXBlb2YgKF9nbG9iYWwgYXMgV2luZG93KS5kb2N1bWVudCAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAgICAgdGhpcy5sb2FkU2NyaXB0ID0gKHBhdGgsIG9ubG9hZCkgPT4gU2NyaXB0TG9hZGVyLmxvYWRWaWFEb20oKF9nbG9iYWwgYXMgV2luZG93KS5kb2N1bWVudCwgcGF0aCwgb25sb2FkKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vIERPTSBlbnZpcm9ubWVudCBpcyBub3Qgc3VwcG9ydGVkLicpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTptZW1iZXItb3JkZXJpbmdcclxuICAgIHByaXZhdGUgc3RhdGljIGxvYWRWaWFEb20oZG9jdW1lbnQ6IERvY3VtZW50LCBwYXRoOiBzdHJpbmcsIG9ubG9hZD86ICgpID0+IHZvaWQpIHtcclxuICAgICAgICBjb25zdCBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcclxuICAgICAgICBzY3JpcHQudHlwZSA9ICd0ZXh0L2phdmFzY3JpcHQnO1xyXG4gICAgICAgIHNjcmlwdC5zcmMgPSBwYXRoO1xyXG4gICAgICAgIGlmIChvbmxvYWQpIHtcclxuICAgICAgICAgICAgc2NyaXB0Lm9ubG9hZCA9IG9ubG9hZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgKGRvY3VtZW50LmJvZHkgfHwgZG9jdW1lbnQuaGVhZCkuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcclxuICAgIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvaWZkZWYtbG9hZGVyL2lmZGVmLWxvYWRlci5qcz9ERUJVRz10cnVlJlBFUkZPUk1BTkNFX0FVRElUPXRydWUhLi9zcmMvZnJhbWV3b3JrL3NjcmlwdC1sb2FkZXIudHMiLCJleHBvcnQgKiBmcm9tICcuL2JhdGNoJztcclxuZXhwb3J0ICogZnJvbSAnLi9idWlsZGVycyc7XHJcbmV4cG9ydCAqIGZyb20gJy4vY29udGV4dCc7XHJcbmV4cG9ydCAqIGZyb20gJy4vZW5kcG9pbnRzJztcclxuZXhwb3J0ICogZnJvbSAnLi9lbnZlbG9wJztcclxuZXhwb3J0ICogZnJvbSAnLi9tZXNzZW5nZXInO1xyXG5leHBvcnQgKiBmcm9tICcuL3BpcGUnO1xyXG5leHBvcnQgKiBmcm9tICcuL2J1cyc7XHJcbmV4cG9ydCAqIGZyb20gJy4vcm91dGVyJztcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL2lmZGVmLWxvYWRlci9pZmRlZi1sb2FkZXIuanM/REVCVUc9dHJ1ZSZQRVJGT1JNQU5DRV9BVURJVD10cnVlIS4vc3JjL3Byb2Nlc3NpbmcvaW5kZXgudHMiLCJpbXBvcnQgeyBJQmF0Y2hBdWRpdERhdGEgfSBmcm9tICcuL2F1ZGl0L2F1ZGl0LWRhdGEnO1xyXG5pbXBvcnQgeyBJRW52ZWxvcCB9IGZyb20gJy4vZW52ZWxvcCc7XHJcblxyXG4vKipcclxuICogQmF0Y2ggb2YgZmV3IGVudmVsb3BzXHJcbiAqXHJcbiAqIEBpbnRlcm5hbFxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIEJhdGNoIHtcclxuICAgIC8qKlxyXG4gICAgICogQ29udGFpbnMgZW52ZWxvcCB3aXRoIGFvdWRpdCBkYXRhXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhdWRpdHM/OiBJQmF0Y2hBdWRpdERhdGE7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBFcnJvciBjb3VudCBmb3IgdGhlIGN1cnJlbnQgYmF0Y2hcclxuICAgICAqL1xyXG4gICAgcHVibGljIGVycm9yQ291bnQ6IG51bWJlciA9IDA7XHJcblxyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IGVudmVsb3BzOiBBcnJheTxJRW52ZWxvcD4sXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEluZGV4IG9mIHRoZSBiYXRjaFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBpbmRleDogbnVtYmVyID0gMFxyXG4gICAgKSB7IH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvaWZkZWYtbG9hZGVyL2lmZGVmLWxvYWRlci5qcz9ERUJVRz10cnVlJlBFUkZPUk1BTkNFX0FVRElUPXRydWUhLi9zcmMvcHJvY2Vzc2luZy9iYXRjaC50cyIsImltcG9ydCB7IElEaXN0b3JidGlvbiwgSUR1cmF0aW9uLCBJUGVyZnN0YW1wIH0gZnJvbSAnLi4vZGVmaW5pdGlvbnMnO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGR1cmF0aW9uKHRpbWUxOiBJUGVyZnN0YW1wLCB0aW1lMjogSVBlcmZzdGFtcCk6IElEdXJhdGlvbjxudW1iZXI+IHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgY2xvY2t0aW1lOiB0aW1lMi5jbG9ja3RpbWUgLSB0aW1lMS5jbG9ja3RpbWUsXHJcbiAgICAgICAgY3B1OiAodGltZTIuY3B1ICYmIHRpbWUxLmNwdSkgPyAodGltZTIuY3B1IC0gdGltZTEuY3B1KSA6IHVuZGVmaW5lZFxyXG4gICAgfTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGRpc3RvcmJ0aW9uPFRJdGVtPihpdGVtczogQXJyYXk8VEl0ZW0+LCB2YWw6IChpdGVtOiBUSXRlbSkgPT4gbnVtYmVyIHwgdW5kZWZpbmVkKTogSURpc3RvcmJ0aW9uIHtcclxuICAgIGNvbnN0IHZhbHVlcyA9IG5ldyBBcnJheTxudW1iZXI+KCk7XHJcbiAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgaXRlbXMpIHtcclxuICAgICAgICBjb25zdCBjdXJyZW50ID0gdmFsKGl0ZW0pO1xyXG4gICAgICAgIGlmIChjdXJyZW50ICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgdmFsdWVzLnB1c2goY3VycmVudCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgdmFsdWVzLnNvcnQoKGEsIGIpID0+IGEgLSBiKTtcclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGF2ZXJhZ2U6IGF2ZXJhZ2UodmFsdWVzKSxcclxuICAgICAgICBtZWRpYW46IG1lZGlhbih2YWx1ZXMpLFxyXG4gICAgICAgIG1heDogdmFsdWVzW3ZhbHVlcy5sZW5ndGggLSAxXSxcclxuICAgICAgICBtaW46IHZhbHVlc1swXSxcclxuICAgICAgICB0b3RhbDogdmFsdWVzLmxlbmd0aFxyXG4gICAgfTtcclxufVxyXG5cclxuZnVuY3Rpb24gYXZlcmFnZSh2YWx1ZXM6IEFycmF5PG51bWJlcj4pOiBudW1iZXIge1xyXG4gICAgbGV0IGF2ZyA9IDA7XHJcbiAgICBmb3IgKGNvbnN0IHZhbCBvZiB2YWx1ZXMpIHtcclxuICAgICAgICBhdmcgKz0gdmFsO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGF2ZyAvIHZhbHVlcy5sZW5ndGg7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIG1lZGlhbih2YWx1ZXM6IEFycmF5PG51bWJlcj4pOiBudW1iZXIge1xyXG4gICAgY29uc3QgaGFsZiA9IE1hdGguZmxvb3IodmFsdWVzLmxlbmd0aCAvIDIpO1xyXG5cclxuICAgIGlmICh2YWx1ZXMubGVuZ3RoICUgMikge1xyXG4gICAgICAgIHJldHVybiB2YWx1ZXNbaGFsZl07XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJldHVybiAodmFsdWVzW2hhbGYgLSAxXSArIHZhbHVlc1toYWxmXSkgLyAyLjA7XHJcbiAgICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL2lmZGVmLWxvYWRlci9pZmRlZi1sb2FkZXIuanM/REVCVUc9dHJ1ZSZQRVJGT1JNQU5DRV9BVURJVD10cnVlIS4vc3JjL3Byb2Nlc3NpbmcvYXVkaXQvcmVwb3J0ZXJzL2NhbGMtbWV0aG9kcy50cyIsImltcG9ydCB7IElQZXJmc3RhbXAgfSBmcm9tICcuLi9kZWZpbml0aW9ucyc7XHJcblxyXG5leHBvcnQgY2xhc3MgUGVyZnN0YW1wIGltcGxlbWVudHMgSVBlcmZzdGFtcCB7XHJcbiAgICBwdWJsaWMgc3RhdGljIG5vdzogKCkgPT4gbnVtYmVyIHwgdW5kZWZpbmVkO1xyXG5cclxuICAgIHB1YmxpYyByZWFkb25seSBjbG9ja3RpbWU6IG51bWJlciA9ICtuZXcgRGF0ZSgpO1xyXG5cclxuICAgIHB1YmxpYyByZWFkb25seSBjcHU/OiBudW1iZXIgPSBQZXJmc3RhbXAubm93KCk7XHJcbn1cclxuXHJcbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXHJcbmlmICh0eXBlb2YgcGVyZm9ybWFuY2UgIT09ICd1bmRlZmluZWQnXHJcbiAgICAmJiB0eXBlb2YgcGVyZm9ybWFuY2Uubm93ICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgUGVyZnN0YW1wLm5vdyA9ICgpID0+IHBlcmZvcm1hbmNlLm5vdygpO1xyXG59IGVsc2Uge1xyXG4gICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cclxuICAgIFBlcmZzdGFtcC5ub3cgPSAoKSA9PiB1bmRlZmluZWQ7XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL2lmZGVmLWxvYWRlci9pZmRlZi1sb2FkZXIuanM/REVCVUc9dHJ1ZSZQRVJGT1JNQU5DRV9BVURJVD10cnVlIS4vc3JjL3Byb2Nlc3NpbmcvYXVkaXQvYXVkaXRvcnMvcGVyZnN0YW1wLnRzIiwiaW1wb3J0IHsgSUVudmVsb3BRdWV1ZSB9IGZyb20gJy4vZW52ZWxvcC1xdWV1ZSc7XHJcbmltcG9ydCB7IFBpcGUgfSBmcm9tICcuL3BpcGUnO1xyXG5cclxuLyoqXHJcbiAqIEJ1cyBmb3IgYWxsIHBpcGVzIGluIHRoZSBzeXN0ZW1cclxuICpcclxuICogQGludGVybmFsXHJcbiAqIEBjbGFzcyBCdXNcclxuICovXHJcbmV4cG9ydCBjbGFzcyBCdXMge1xyXG4gICAgcHVibGljIHJlYWRvbmx5IHF1ZXVlczogTWFwPHN0cmluZywgSUVudmVsb3BRdWV1ZT4gPSBuZXcgTWFwKCk7XHJcblxyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IHBpcGVzOiBNYXA8c3RyaW5nLCBQaXBlPlxyXG4gICAgKSB7XHJcbiAgICAgICAgcGlwZXMuZm9yRWFjaCgocGlwZSwgaWQpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5xdWV1ZXMuc2V0KGlkLCBwaXBlLmJhdGNoQnVpbGRlci5xdWV1ZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFzeW5jIHN0YXJ0KCkge1xyXG4gICAgICAgIGZvciAoY29uc3QgcGlwZSBvZiB0aGlzLnBpcGVzLnZhbHVlcygpKSB7XHJcbiAgICAgICAgICAgIGF3YWl0IHBpcGUuc3RhcnQoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFzeW5jIHRlcm1pbmF0ZSgpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICBmb3IgKGNvbnN0IHBpcGUgb2YgdGhpcy5waXBlcy52YWx1ZXMoKSkge1xyXG4gICAgICAgICAgICBhd2FpdCBwaXBlLnRlcm1pbmF0ZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvaWZkZWYtbG9hZGVyL2lmZGVmLWxvYWRlci5qcz9ERUJVRz10cnVlJlBFUkZPUk1BTkNFX0FVRElUPXRydWUhLi9zcmMvcHJvY2Vzc2luZy9idXMudHMiLCJleHBvcnQgKiBmcm9tICcuL2VuZHBvaW50JztcclxuZXhwb3J0ICogZnJvbSAnLi9mZS1hbmFseXRpY3MtY29sbGVjdG9yJztcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL2lmZGVmLWxvYWRlci9pZmRlZi1sb2FkZXIuanM/REVCVUc9dHJ1ZSZQRVJGT1JNQU5DRV9BVURJVD10cnVlIS4vc3JjL3Byb2Nlc3NpbmcvZW5kcG9pbnRzL2luZGV4LnRzIiwiaW1wb3J0IHsgSVN5bmNQb2ludCwgTG9jYWxTdG9yYWdlVGFiU3luY1BvaW50IH0gZnJvbSAnLi4vZnJhbWV3b3JrL3RhYi1zeW5jLXBvaW50JztcclxuaW1wb3J0IHsgVW5sb2FkRXZlbnQgfSBmcm9tICcuLi9mcmFtZXdvcmsvdW5sb2FkLWV2ZW50JztcclxuaW1wb3J0IHsgSUxvZ2dlciB9IGZyb20gJy4uL2xvZ3MnO1xyXG5pbXBvcnQgeyBJUGlwZVBlcmZvcm1hbmNlQXVkaXRvciB9IGZyb20gJy4vYXVkaXQvYXVkaXRvcnMvcGlwZSc7XHJcbmltcG9ydCB7IEFqYXhSZXF1ZXN0U3RhdHVzUmVzdWx0IH0gZnJvbSAnLi9hdWRpdC9zdGF0cy9waXBlLXN0YXRzJztcclxuaW1wb3J0IHsgSUJhdGNoQnVpbGRlciB9IGZyb20gJy4vYmF0Y2gtYnVpbGRlcic7XHJcbmltcG9ydCB7IElFbmRwb2ludCB9IGZyb20gJy4vZW5kcG9pbnRzJztcclxuaW1wb3J0IHsgSUZsdXNoVGltZVN0cmF0ZWd5IH0gZnJvbSAnLi9mbHVzaC10aW1lLXN0cmF0ZWd5JztcclxuXHJcbi8qKlxyXG4gKiBQaXBlIGNvbnN1bWVzIG1lc3NhZ2VzIGZyb20gYSBxdWV1ZSBhbmQgc2VuZCBpdCB0byBhbiBlbmRwb2ludFxyXG4gKlxyXG4gKiBAaW50ZXJuYWxcclxuICovXHJcbmV4cG9ydCBjbGFzcyBQaXBlIHtcclxuICAgIHByaXZhdGUgX2ludGVydmFsSWQ6IGFueSB8IHVuZGVmaW5lZDtcclxuICAgIHByaXZhdGUgX2FjdGl2ZSA9IHRydWU7XHJcblxyXG4gICAgcHVibGljIGdldCBxdWV1ZUlkKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuYmF0Y2hCdWlsZGVyLnF1ZXVlLmlkO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBiYXRjaEJ1aWxkZXI6IElCYXRjaEJ1aWxkZXIsXHJcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IGVuZHBvaW50OiBJRW5kcG9pbnQsXHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBfZmx1c2hUaW1lU3RyYXRlZ3k6IElGbHVzaFRpbWVTdHJhdGVneSxcclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IF9sb2dnZXI6IElMb2dnZXIsXHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBfYXVkaXRvcjogSVBpcGVQZXJmb3JtYW5jZUF1ZGl0b3IsXHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBfc3luY1BvaW50OiBJU3luY1BvaW50ID0gbmV3IExvY2FsU3RvcmFnZVRhYlN5bmNQb2ludChiYXRjaEJ1aWxkZXIucXVldWUuaWQgKyAnLXBpcGUnKVxyXG4gICAgKSB7IH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFN0YXJ0IHF1ZXVlIGhhbmRsaW5nXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGFydCgpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICBpZiAodGhpcy5faW50ZXJ2YWxJZCkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1BpcGUgYWxyZWFkeSB3YXMgc3RhcnRlZC4nKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5faW50ZXJ2YWxJZCA9IHt9O1xyXG5cclxuICAgICAgICB0aGlzLnN1YnNjcmliZSgpO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5zY2hlZHVsZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhc3luYyB0ZXJtaW5hdGUoKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2FjdGl2ZSkge1xyXG4gICAgICAgICAgICB0aGlzLmRpc3Bvc2UoKTtcclxuICAgICAgICAgICAgYXdhaXQgdGhpcy5iYXRjaEJ1aWxkZXIuZGVzdHJveSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZGlzcG9zZSgpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5fYWN0aXZlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2FjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5faW50ZXJ2YWxJZCkge1xyXG4gICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuX2ludGVydmFsSWQpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5faW50ZXJ2YWxJZCA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLl9zeW5jUG9pbnQuZGlzcG9zZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGFzeW5jIHNjaGVkdWxlKCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9hY3RpdmUpIHtcclxuICAgICAgICAgICAgY29uc3QgZHVyYXRpb24gPSBhd2FpdCB0aGlzLl9mbHVzaFRpbWVTdHJhdGVneS5kdXJhdGlvbigpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5faW50ZXJ2YWxJZCA9IHNldFRpbWVvdXQoYXN5bmMgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLmZsdXNoKCk7XHJcbiAgICAgICAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2xvZ2dlci5lcnJvcihgW1FJRDoke3RoaXMucXVldWVJZH1dOiBFcnJvciBvbiBmbHVzaGluZyBtZXNzYWdlcyBpbnRvIHRoZSBlbmRwb2ludC5gLCBlcnJvcik7XHJcbiAgICAgICAgICAgICAgICB9IGZpbmFsbHkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2NoZWR1bGUoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSwgZHVyYXRpb24pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHN1YnNjcmliZSgpOiB2b2lkIHtcclxuICAgICAgICBVbmxvYWRFdmVudC5hZGRMaXN0ZW5lcigoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuZGlzcG9zZSgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGFrZSB7YmF0Y2hTaXplfSBpdGVtcyBmcm9tIHRoZSBxdWV1ZSBhbmQgc2VuZCBpdCB0byBlbmRwb2ludC5cclxuICAgICAqIENvbmZpcm0gb3IgcmVqZWN0IGNvbnN1bWF0aW9uIG9uIHRoZSBlbmQgb2YgZW5kcG9pbnQgcHJvY2Vzc1xyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGFzeW5jIGZsdXNoKCk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgIGlmICghdGhpcy5fYWN0aXZlKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IGF1ZGl0b3IgPSB0aGlzLl9hdWRpdG9yLnN0YXJ0KHRoaXMuYmF0Y2hCdWlsZGVyLnF1ZXVlKTtcclxuXHJcbiAgICAgICAgY29uc3QgYXZvaWRDb25jdXJyZW5jeSA9ICF0aGlzLl9zeW5jUG9pbnQuY2FwdHVyZSh0aGlzLl9mbHVzaFRpbWVTdHJhdGVneS5zeW5jVGltZSgpKTtcclxuXHJcbiAgICAgICAgY29uc3QgY29uc3VtcHRpb24gPSBhd2FpdCB0aGlzLmJhdGNoQnVpbGRlci5uZXh0KGF2b2lkQ29uY3VycmVuY3kpO1xyXG5cclxuICAgICAgICBpZiAoIWNvbnN1bXB0aW9uKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGF1ZGl0b3IuZGVxdWV1ZWQoY29uc3VtcHRpb24uYmF0Y2gpO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gdGhpcy5lbmRwb2ludFxyXG4gICAgICAgICAgICAgICAgLnNlbmQoY29uc3VtcHRpb24uYmF0Y2gpXHJcbiAgICAgICAgICAgICAgICAudGhlbihcclxuICAgICAgICAgICAgICAgIGFzeW5jICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBhdWRpdG9yLmNvbmZpcm1lZChBamF4UmVxdWVzdFN0YXR1c1Jlc3VsdC5TdWNjZXNzKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgYXdhaXQgY29uc3VtcHRpb24uYWNrKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGF1ZGl0b3IuZW5kZWQoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbG9nZ2VyLmxvZyhgW1FJRDoke3RoaXMucXVldWVJZH1dOiBCYXRjaCAke2NvbnN1bXB0aW9uLmJhdGNoLmluZGV4fSB3YXMgc2VudCBzdWNjZXNzZnVsbHkuYCk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgYXN5bmMgKHJlYXNvbikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGF1ZGl0b3IuY29uZmlybWVkKEFqYXhSZXF1ZXN0U3RhdHVzUmVzdWx0Lk5ldHdvcmtFcnJvcik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGF3YWl0IGNvbnN1bXB0aW9uLm5hY2soKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgYXVkaXRvci5lbmRlZCgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9sb2dnZXIuZXJyb3IoYFtRSUQ6JHt0aGlzLnF1ZXVlSWR9XTogQmF0Y2ggJHtjb25zdW1wdGlvbi5iYXRjaC5pbmRleH0gd2FzIHNlbnQgd2l0aCBlcnJvci5gLCByZWFzb24pO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBhdWRpdG9yLnNlbnQoKTtcclxuXHJcbiAgICAgICAgICAgIGF3YWl0IHJlc3VsdDtcclxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICBhd2FpdCBjb25zdW1wdGlvbi5uYWNrKCk7XHJcbiAgICAgICAgICAgIHRocm93IGVycm9yO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvaWZkZWYtbG9hZGVyL2lmZGVmLWxvYWRlci5qcz9ERUJVRz10cnVlJlBFUkZPUk1BTkNFX0FVRElUPXRydWUhLi9zcmMvcHJvY2Vzc2luZy9waXBlLnRzIiwiaW1wb3J0IHsgTWVzc2FnZVR5cGUgfSBmcm9tICcuLi9kZWZpbml0aW9ucyc7XHJcblxyXG4vKipcclxuICogRW52ZWxvcCBmb3IgYSBtZXNzYWdlLlxyXG4gKiBFbnJpY2ggYWRkaXRpb25hbCB0ZWNobmljYWwgaW5mb3JtYXRpb24uXHJcbiAqXHJcbiAqIEBpbnRlcm5hbFxyXG4gKi9cclxuZXhwb3J0IGludGVyZmFjZSBJRW52ZWxvcCB7XHJcbiAgICAvKipcclxuICAgICAqIFVuaXF1ZSBJRCBvZiBtZXNzYWdlXHJcbiAgICAgKi9cclxuICAgIGlkOiBzdHJpbmc7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaW1lc3RhbXAgb2YgbWVzc2FnZSBzZW5kaW5nIHRvIHRoZSBsaWJyYXJ5XHJcbiAgICAgKi9cclxuICAgIHRpbWVzdGFtcDogbnVtYmVyO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogTmFtZSBvZiBtZXNzYWdlXHJcbiAgICAgKi9cclxuICAgIG5hbWU6IHN0cmluZztcclxuXHJcbiAgICAvKipcclxuICAgICAqIFR5cGUgb2YgbWVzc2FnZSBib2R5XHJcbiAgICAgKi9cclxuICAgIHJlYWRvbmx5IHR5cGU6IE1lc3NhZ2VUeXBlO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogTWFpbiBtZXNzYWdlIGJvZHkgZnJvbSBhIHVzZXIgY29kZVxyXG4gICAgICovXHJcbiAgICBtZXNzYWdlOiBvYmplY3Q7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBFbnZlbG9wIGZvciBhIG1lc3NhZ2UuXHJcbiAqIEVucmljaCBhZGRpdGlvbmFsIHRlY2huaWNhbCBpbmZvcm1hdGlvbi5cclxuICpcclxuICogQGludGVybmFsXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgRW52ZWxvcCBpbXBsZW1lbnRzIElFbnZlbG9wIHtcclxuICAgIC8qKlxyXG4gICAgICogVW5pcXVlIElEIG9mIG1lc3NhZ2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIGlkOiBzdHJpbmc7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaW1lc3RhbXAgb2YgbWVzc2FnZSBzZW5kaW5nIHRvIHRoZSBsaWJyYXJ5XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyB0aW1lc3RhbXA6IG51bWJlcjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIE5hbWUgb2YgbWVzc2FnZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgbmFtZTogc3RyaW5nO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFR5cGUgb2YgbWVzc2FnZSBib2R5XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IHR5cGU6IE1lc3NhZ2VUeXBlLFxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBNYWluIG1lc3NhZ2UgYm9keSBmcm9tIGEgdXNlciBjb2RlXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIG1lc3NhZ2U6IGFueSA9IHsgfVxyXG4gICAgKSB7IH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvaWZkZWYtbG9hZGVyL2lmZGVmLWxvYWRlci5qcz9ERUJVRz10cnVlJlBFUkZPUk1BTkNFX0FVRElUPXRydWUhLi9zcmMvcHJvY2Vzc2luZy9lbnZlbG9wLnRzIiwiaW1wb3J0IHsgSUNvbmZpZ3VyYXRpb24sIElFbnZpcm9ubWVudERhdGEgfSBmcm9tICcuL2NvbmZpZ3VyYXRpb25zJztcclxuaW1wb3J0IHsgbWVzc2FnZXNDb25maWd1cmF0aW9uIH0gZnJvbSAnLi9jb25maWd1cmF0aW9ucy9kZWZhdWx0cy9tZXNzYWdlcy1jb25maWd1cmF0aW9uJztcclxuaW1wb3J0IHsgR3VpZFByb3ZpZGVyLCBTaW5nbGV0b24sIFRpbWVTdGFtcFByb3ZpZGVyIH0gZnJvbSAnLi9mcmFtZXdvcmsnO1xyXG5pbXBvcnQgeyBVbml2ZXJzYWxMb2dnZXIsIFdvcmtlckxvZ2dlciB9IGZyb20gJy4vbG9ncyc7XHJcbmltcG9ydCB7IFBvbHlmaWxscyB9IGZyb20gJy4vcG9seWZpbGxzJztcclxuaW1wb3J0IHsgQnVzQnVpbGRlciwgTWVzc2VuZ2VyLCBSb3V0ZXIgfSBmcm9tICcuL3Byb2Nlc3NpbmcnO1xyXG5pbXBvcnQgeyBNZXNzZW5nZXJQZXJmb3JtYW5jZUF1ZGl0b3JCdWlsZGVyIH0gZnJvbSAnLi9wcm9jZXNzaW5nL2F1ZGl0L2F1ZGl0b3JzL21lc3Nlbmdlci1wZXJmb3JtYW5jZS1hdWRpdG9yJztcclxuaW1wb3J0IHsgTWVzc2VuZ2VyU3RhdGlzdGljQXVkaXRvciB9IGZyb20gJy4vcHJvY2Vzc2luZy9hdWRpdC9hdWRpdG9ycy9tZXNzZW5nZXItc3RhdGlzdGljLWF1ZGl0b3InO1xyXG5pbXBvcnQgeyBQaXBlU3RhdHNQcm92aWRlciB9IGZyb20gJy4vcHJvY2Vzc2luZy9hdWRpdC9zdGF0cy9waXBlLXN0YXRzLXByb3ZpZGVyJztcclxuaW1wb3J0IHsgUGlwZVN0YXRzSW5kZXhlZERCU3RvcmFnZSB9IGZyb20gJy4vcHJvY2Vzc2luZy9hdWRpdC9zdGF0cy9zdG9yYWdlcy9waXBlLXN0YXRzLmluZGV4ZWRkYic7XHJcbmltcG9ydCB7IFBpcGVTdGF0c0xvY2FsU3RvcmFnZSB9IGZyb20gJy4vcHJvY2Vzc2luZy9hdWRpdC9zdGF0cy9zdG9yYWdlcy9waXBlLXN0YXRzLmxvY2FsLXN0b3JhZ2UnO1xyXG5pbXBvcnQgeyBQaXBlU3RhdHNNZW1vcnlTdG9yYWdlIH0gZnJvbSAnLi9wcm9jZXNzaW5nL2F1ZGl0L3N0YXRzL3N0b3JhZ2VzL3BpcGUtc3RhdHMubWVtb3J5JztcclxuaW1wb3J0IHsgUG9zdG1hbiB9IGZyb20gJy4vcHJvY2Vzc2luZy9wb3N0bWFuJztcclxuaW1wb3J0IHsgSVdvcmtlckdsb2JhbFNjb3BlIH0gZnJvbSAnLi93b3JrZXJzL3dvcmtlci1kZWZpbml0aW9ucyc7XHJcbmltcG9ydCB7IFdvcmtlclJlY2VpdmVyIH0gZnJvbSAnLi93b3JrZXJzL3dvcmtlci1yZWNlaXZlcic7XHJcbmltcG9ydCB7IFdvcmtlclNjb3BlIH0gZnJvbSAnLi93b3JrZXJzL3dvcmtlci1zY29wZSc7XHJcblxyXG4vKipcclxuICogRW50cnkgcG9pbnQgZm9yIGJ1aWxkaW5nIGpzLWZpbGUgZm9yIFdlYldvcmtlciBlbnZpcm9ubWVudFxyXG4gKi9cclxuKCgpID0+IHtcclxuICAgIC8vIFJlY2VpdmUgY3VycmVudCBnbG9iYWwgc2NvcGUgdmFyaWFibGVcclxuICAgIGNvbnN0IHNjb3BlOiBJV29ya2VyR2xvYmFsU2NvcGUgPSBXb3JrZXJTY29wZS5jdXJyZW50KCk7XHJcblxyXG4gICAgLy8gQ3JlYXRlIGxvZ2dlciBmb3IgYWxsIG9iamVjdHNcclxuICAgIGNvbnN0IGxvZ2dlciA9IG5ldyBVbml2ZXJzYWxMb2dnZXIoWyBdKTtcclxuXHJcbiAgICAvLyBDcmVhdGUgbWVzc2FnZXMgcmVjZWl2ZXIgZnJvbSBtYWluIHRocmVhZFxyXG4gICAgY29uc3QgcmVjZWl2ZXIgPSBuZXcgV29ya2VyUmVjZWl2ZXIoc2NvcGUsIGxvZ2dlcik7XHJcblxyXG4gICAgLy8gQWRkIGxvZ2dlciBmb3Igc2VuZGluZyBtZXNzYWdlcyBiYWNrIHRvIG1haW4gdGhyZWFkXHJcbiAgICBsb2dnZXIucmVwbGFjZShbIG5ldyBXb3JrZXJMb2dnZXIocmVjZWl2ZXIuY29udGV4dC5zZW5kZXIpIF0pO1xyXG5cclxuICAgIC8vIFVzZSBzaW5nbGV0b24gdG8gcHJldmVudCBhIGZldyBpbml0aWFsaXphdGlvbiBpbiBzaGFyZWQgd2ViIHdvcmtlclxyXG4gICAgY29uc3Qgc2luZ2xldG9uID0gbmV3IFNpbmdsZXRvbigoY29uZmlndXJhdGlvbjogSUNvbmZpZ3VyYXRpb24sIGVudmlyb25tZW50OiBJRW52aXJvbm1lbnREYXRhKSA9PiB7XHJcbiAgICAgICAgbG9nZ2VyLmVuYWJsZWQgPSBlbnZpcm9ubWVudC5kZWJ1ZztcclxuXHJcbiAgICAgICAgLy8gUnVuIGxvYWRpbmcgcG9seWZpbGxzIGlmIHRoZXkgYXJlIG5lY2Vzc2FyeVxyXG4gICAgICAgIFBvbHlmaWxscy5sb2FkKHNjb3BlLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgICAgIC8vIENyZWF0ZSBjbGFzcyB0byBzZWFsIG1lc3NhZ2VzIHRvIGVudmVsb3BzIChwcm92aWRlIGVucmljaG1lbnQpXHJcbiAgICAgICAgICAgIGNvbnN0IHBvc3RtYW4gPSBuZXcgUG9zdG1hbihHdWlkUHJvdmlkZXIuZGVmYXVsdCwgbmV3IFRpbWVTdGFtcFByb3ZpZGVyKCkpO1xyXG5cclxuICAgICAgICAgICAgLy8gQ3JlYXRlIHN0YXRpc3RpYyBzdG9yYWdlcyBhbmQgcHJvdmlkZXJzXHJcbiAgICAgICAgICAgIGNvbnN0IHN0YXRzU3RvcmFnZSA9ICBQaXBlU3RhdHNMb2NhbFN0b3JhZ2UuY3JlYXRlKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHx8IGF3YWl0IFBpcGVTdGF0c0luZGV4ZWREQlN0b3JhZ2UuY3JlYXRlKCkuY2F0Y2goKCkgPT4gbmV3IFBpcGVTdGF0c01lbW9yeVN0b3JhZ2UoKSk7XHJcbiAgICAgICAgICAgIGNvbnN0IHN0YXRzUHJvdmlkZXIgPSBuZXcgUGlwZVN0YXRzUHJvdmlkZXIoc3RhdHNTdG9yYWdlKTtcclxuXHJcbiAgICAgICAgICAgIC8vIENyZWF0ZSBidXMgYnVpbGRlciBmcm9tIGNvbmZpZ3VyYXRpb25cclxuICAgICAgICAgICAgY29uc3QgYnVzQnVpbGRlciA9IG5ldyBCdXNCdWlsZGVyKHJlY2VpdmVyLmNvbnRleHQsIGNvbmZpZ3VyYXRpb24sIGVudmlyb25tZW50LCBzdGF0c1Byb3ZpZGVyLCBsb2dnZXIpO1xyXG5cclxuICAgICAgICAgICAgLy8gQnVpbGQgYnVzXHJcbiAgICAgICAgICAgIGNvbnN0IGJ1cyA9IGF3YWl0IGJ1c0J1aWxkZXIuYnVpbGQoKTtcclxuXHJcbiAgICAgICAgICAgIC8vIENyZWF0ZSBhIG1lc3NhZ2Ugcm91dGVyXHJcbiAgICAgICAgICAgIGNvbnN0IHJvdXRlciA9IG5ldyBSb3V0ZXIobWVzc2FnZXNDb25maWd1cmF0aW9uLCBidXMucXVldWVzKTtcclxuXHJcbiAgICAgICAgICAgIC8vIFBlcmZvcm1hbmNlIGFuZCBzdGF0aXN0aWMgYXVkaXRvcnMgZm9yIE1lc3NlbmdlclxyXG4gICAgICAgICAgICBjb25zdCBtZXNzYWdlc1BlcmZvcm1hbmNlQXVkaXRvciA9IE1lc3NlbmdlclBlcmZvcm1hbmNlQXVkaXRvckJ1aWxkZXIuY3JlYXRlKGVudmlyb25tZW50LnBlcmZvcm1hbmNlQXVkaXQsIGJ1c0J1aWxkZXIuYXVkaXRTZW5kZXIpO1xyXG4gICAgICAgICAgICBjb25zdCBtZXNzYWdlc1N0YXRpc3RpY0F1ZGl0b3IgPSBuZXcgTWVzc2VuZ2VyU3RhdGlzdGljQXVkaXRvcihzdGF0c1N0b3JhZ2UpO1xyXG5cclxuICAgICAgICAgICAgLy8gQ3JlYXRlIG1lc3NhZ2Ugcm91dGVyIHRvIGhhbmRsaW5nIG1lc3NhZ2VzIGZyb20gbWFpbiB0aHJlYWRcclxuICAgICAgICAgICAgY29uc3QgbWVzc2VuZ2VyID0gbmV3IE1lc3Nlbmdlcihyb3V0ZXIsIHBvc3RtYW4sIG1lc3NhZ2VzU3RhdGlzdGljQXVkaXRvciwgbWVzc2FnZXNQZXJmb3JtYW5jZUF1ZGl0b3IpO1xyXG5cclxuICAgICAgICAgICAgLy8gQmluZCByZWNlaXZlIGV2ZW50IGZyb20gbWFpbiB0aHJlYWQgdG8gTWVzc2VuZ2VyIGhhbmRsZXJcclxuICAgICAgICAgICAgcmVjZWl2ZXIubWVzc2FnZXMuc3Vic2NyaWJlKChkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBtZXNzZW5nZXIuc2VuZChkYXRhLm1lc3NhZ2VzKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAvLyBTdGFydCBhbGwgcGlwZXMgdG8gaGFuZGxlIG1lc3NhZ2VzIGZyb20gcXVldWVzXHJcbiAgICAgICAgICAgIGF3YWl0IGJ1cy5zdGFydCgpO1xyXG5cclxuICAgICAgICAgICAgLy8gU3Vic2NyaWJlIGZvciB0ZXJtaW5hdGlvbiBjb21tYW5kIGFuZCB0ZXJtaW5hdGUgYWxsIHJlYWN0aW9ucyBmb3Igb3RoZXIgY2FsbGluZ1xyXG4gICAgICAgICAgICByZWNlaXZlci50ZXJtaW5hdGUuaGFuZGxlciA9IGFzeW5jICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYXdhaXQgYnVzLnRlcm1pbmF0ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGF3YWl0IHN0YXRzU3RvcmFnZS5jbGVhcigpO1xyXG4gICAgICAgICAgICAgICAgICAgIGF3YWl0IHN0YXRzU3RvcmFnZS5kaXNwb3NlKCk7XHJcbiAgICAgICAgICAgICAgICB9IGZpbmFsbHkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlY2VpdmVyLmRpc3Bvc2UoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIGxvZ2dlci5sb2coJ1dvcmtlciB3YXMgc3RhcnRlZCBzdWNjZXNzZnVsbHkuJyk7XHJcbiAgICAgICAgfSwgZW52aXJvbm1lbnQpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gTWFwIHJlY2VpdmluZyBvZiBjb25maWd1cmF0aW9uIG1lc3NhZ2VzIHRvIHNpbmdsZXRvbiBleGVjdXRpb25cclxuICAgIHJlY2VpdmVyLmNvbmZpZ3VyYXRpb24uc3Vic2NyaWJlKChldmVudCkgPT4ge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIHNpbmdsZXRvbi5leGVjdXRlT25jZShldmVudC5jb25maWd1cmF0aW9uLCBldmVudC5lbnZpcm9ubWVudCk7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgbG9nZ2VyLmVycm9yKGVycm9yKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufSkoKTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL2lmZGVmLWxvYWRlci9pZmRlZi1sb2FkZXIuanM/REVCVUc9dHJ1ZSZQRVJGT1JNQU5DRV9BVURJVD10cnVlIS4vc3JjL21lc3NhZ2luZy1jbGllbnQtd29ya2VyLnRzIiwiXHJcbmltcG9ydCB7IElNZXNzYWdlc0NvbmZpZ3VyYXRpb24gfSBmcm9tICcuLi9tZXNzYWdlcy1jb25maWd1cmF0aW9uJztcclxuXHJcbi8qKlxyXG4gKiBAaW50ZXJuYWxcclxuICovXHJcbmV4cG9ydCBjb25zdCBtZXNzYWdlc0NvbmZpZ3VyYXRpb246IElNZXNzYWdlc0NvbmZpZ3VyYXRpb24gPSB7XHJcbiAgICBtZXNzYWdlczogW1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIENvbmZpZ3VyYXRpb24gZm9yIGVhY2ggbWVzc2FnZXNcclxuICAgICAgICAgKiBEaXNibGUgaW4gZmlyc3QgdmVyc2lvbiBmb3Igc2VuZGluZyBhbGwgbWVzc2FnZXMgdG8gJ2RlZmF1bHQnIHF1ZXVlLlxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIC8qXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0eXBlOiAnbWVhc3VyZW1lbnQnLFxyXG4gICAgICAgICAgICBxdWV1ZTogJ2RlYnVnJ1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0eXBlOiAnbG9nJyxcclxuICAgICAgICAgICAgcXVldWU6ICdkZWJ1ZydcclxuICAgICAgICB9XHJcbiAgICAgICAgKi9cclxuICAgIF1cclxufTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL2lmZGVmLWxvYWRlci9pZmRlZi1sb2FkZXIuanM/REVCVUc9dHJ1ZSZQRVJGT1JNQU5DRV9BVURJVD10cnVlIS4vc3JjL2NvbmZpZ3VyYXRpb25zL2RlZmF1bHRzL21lc3NhZ2VzLWNvbmZpZ3VyYXRpb24udHMiLCJleHBvcnQgKiBmcm9tICcuL2xvZ2dlcic7XHJcbmV4cG9ydCAqIGZyb20gJy4vY29uc29sZS1sb2dnZXInO1xyXG5leHBvcnQgKiBmcm9tICcuL2V2ZW50LWxvZ2dlcic7XHJcbmV4cG9ydCAqIGZyb20gJy4vd29ya2VyLWxvZ2dlcic7XHJcbmV4cG9ydCAqIGZyb20gJy4vdW5pdmVyc2FsLWxvZ2dlcic7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy9pZmRlZi1sb2FkZXIvaWZkZWYtbG9hZGVyLmpzP0RFQlVHPXRydWUmUEVSRk9STUFOQ0VfQVVESVQ9dHJ1ZSEuL3NyYy9sb2dzL2luZGV4LnRzIiwiaW1wb3J0IHsgSUxvZ1dvcmtlck1lc3NhZ2UsIElXb3JrZXJNZXNzYWdlU2VuZGVyIH0gZnJvbSAnLi4vd29ya2Vycy93b3JrZXItZGVmaW5pdGlvbnMnO1xyXG5pbXBvcnQgeyBJTG9nZ2VyIH0gZnJvbSAnLi9sb2dnZXInO1xyXG5cclxuLyoqXHJcbiAqIFNlbmQgbG9nIG1lc3NhZ2VzIHRvIGEgbWFpbiB0aHJlYWRcclxuICpcclxuICogQGludGVybmFsXHJcbiAqIEBjbGFzcyBTaGFyZWRXb3JrZXJMb2dnZXJcclxuICogQGltcGxlbWVudHMge0lMb2dnZXJ9XHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgV29ya2VyTG9nZ2VyIGltcGxlbWVudHMgSUxvZ2dlciB7XHJcbiAgICBwdWJsaWMgcmVhZG9ubHkgcHJlZml4OiBzdHJpbmcgPSBgYDtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IF9zZW5kZXI6IElXb3JrZXJNZXNzYWdlU2VuZGVyXHJcbiAgICApIHsgfVxyXG5cclxuICAgIHB1YmxpYyBmYXRhbChtZXNzYWdlOiBzdHJpbmcsIGVycm9yPzogRXJyb3IpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9zZW5kZXIucG9zdE1lc3NhZ2UoeyB0eXBlOiAnbG9nJywgbG9nOiB7bGV2ZWw6ICdmYXRhbCcsIG1lc3NhZ2U6IHRoaXMucHJlZml4ICsgbWVzc2FnZSwgZXJyb3J9IH0gYXMgSUxvZ1dvcmtlck1lc3NhZ2UpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBlcnJvcihtZXNzYWdlOiBzdHJpbmcsIGVycm9yPzogRXJyb3IpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9zZW5kZXIucG9zdE1lc3NhZ2UoeyB0eXBlOiAnbG9nJywgbG9nOiB7bGV2ZWw6ICdlcnJvcicsIG1lc3NhZ2U6IHRoaXMucHJlZml4ICsgbWVzc2FnZSwgZXJyb3J9IH0gYXMgSUxvZ1dvcmtlck1lc3NhZ2UpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBsb2cobWVzc2FnZTogc3RyaW5nKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fc2VuZGVyLnBvc3RNZXNzYWdlKHsgdHlwZTogJ2xvZycsIGxvZzoge2xldmVsOiAnbG9nJywgbWVzc2FnZTogdGhpcy5wcmVmaXggKyBtZXNzYWdlfSB9IGFzIElMb2dXb3JrZXJNZXNzYWdlKTtcclxuICAgIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvaWZkZWYtbG9hZGVyL2lmZGVmLWxvYWRlci5qcz9ERUJVRz10cnVlJlBFUkZPUk1BTkNFX0FVRElUPXRydWUhLi9zcmMvbG9ncy93b3JrZXItbG9nZ2VyLnRzIiwiLyoqXHJcbiAqIFBvbHlmaWxsc1xyXG4gKi9cclxuXHJcbmltcG9ydCB7IElFbnZpcm9ubWVudERhdGEgfSBmcm9tICcuL2NvbmZpZ3VyYXRpb25zL2Vudmlyb25tZW50JztcclxuaW1wb3J0IHsgbWFwUGF0aCB9IGZyb20gJy4vZnJhbWV3b3JrL3N0cmluZ3MnO1xyXG5pbXBvcnQgeyBJV29ya2VyR2xvYmFsU2NvcGUgfSBmcm9tICcuL3dvcmtlcnMvd29ya2VyLWRlZmluaXRpb25zJztcclxuXHJcbi8qKlxyXG4gKiBEeW5hbWljIHBvbHlmaWxscyBsb2FkZXIgZnJvbSBzZXBhcmF0ZWQgZmlsZVxyXG4gKiBJZiBzb21lIG9mIEFwaSBpcyBub3QgZXhpc3RzIC0gbG9hZCBhbGwgYmF0Y2ggdG8gYnJvd3Nlci5cclxuICogQWN0dWFsIGZvciBzdXBwb3J0aW5nIElFOStcclxuICpcclxuICogQGludGVybmFsXHJcbiAqIEBjbGFzcyBQb2x5ZmlsbHNcclxuICovXHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBQb2x5ZmlsbHMge1xyXG4gICAgLyoqXHJcbiAgICAgKiBDaGVjayBhbmQgbG9hZCBwb2x5ZmlsbHMgaWYgbmVjZXNzYXJ5XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgbG9hZChzY29wZTogSVdvcmtlckdsb2JhbFNjb3BlLCBsb2FkZWQ6ICgpID0+IHZvaWQsIGRhdGE6IElFbnZpcm9ubWVudERhdGEpIHtcclxuICAgICAgICAvLyBDaGVjayByZXF1aXJlZCBBUElzIGFuZCBsb2FkIHBvbHlmaWxzIGlmIG5lY2Vzc2FyeVxyXG4gICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xyXG4gICAgICAgIGlmIChkYXRhLmZvcmNlUG9seWZpbGxzIHx8XHJcbiAgICAgICAgICAgIHR5cGVvZiBQcm9taXNlID09PSAndW5kZWZpbmVkJyB8fFxyXG4gICAgICAgICAgICB0eXBlb2YgTWFwID09PSAndW5kZWZpbmVkJyB8fFxyXG4gICAgICAgICAgICB0eXBlb2YgU3ltYm9sID09PSAndW5kZWZpbmVkJ1xyXG4gICAgICAgICkge1xyXG4gICAgICAgICAgICBjb25zdCByZXN1bHQgPSBzY29wZS5pbXBvcnRTY3JpcHRzKGRhdGEucG9seWZpbGxzVXJsIHx8IFBvbHlmaWxscy51cmwoc2NvcGUsICcvbWVzc2FnaW5nLWNsaWVudC1wb2x5ZmlsbHMuanMnKSk7XHJcblxyXG4gICAgICAgICAgICBpZiAocmVzdWx0ICYmIHR5cGVvZiByZXN1bHQudGhlbiA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0LnRoZW4obG9hZGVkKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGxvYWRlZCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbG9hZGVkKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIHVybChzY29wZTogSVdvcmtlckdsb2JhbFNjb3BlLCBwb2x5ZmlsbHNOYW1lOiBzdHJpbmcpIHtcclxuICAgICAgICBjb25zdCBjdXJyZW50TG9jYXRpb246IHN0cmluZyA9IChzY29wZS5sb2NhdGlvbiB8fCAnJykudG9TdHJpbmcoKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIG1hcFBhdGgoY3VycmVudExvY2F0aW9uLCBwb2x5ZmlsbHNOYW1lKTtcclxuICAgIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvaWZkZWYtbG9hZGVyL2lmZGVmLWxvYWRlci5qcz9ERUJVRz10cnVlJlBFUkZPUk1BTkNFX0FVRElUPXRydWUhLi9zcmMvcG9seWZpbGxzLnRzIiwiZXhwb3J0ICogZnJvbSAnLi9idXMtYnVpbGRlcic7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy9pZmRlZi1sb2FkZXIvaWZkZWYtbG9hZGVyLmpzP0RFQlVHPXRydWUmUEVSRk9STUFOQ0VfQVVESVQ9dHJ1ZSEuL3NyYy9wcm9jZXNzaW5nL2J1aWxkZXJzL2luZGV4LnRzIiwiaW1wb3J0IHsgSUNvbmZpZ3VyYXRpb24sIElFbmRwb2ludENvbmZpZywgSUluTWVtb3J5UXVldWVDb25maWcsIElQZXJzaXN0ZW50UXVldWVDb25maWcgfSBmcm9tICcuLi8uLi9jb25maWd1cmF0aW9ucy9jb25maWd1cmF0aW9uJztcclxuaW1wb3J0IHsgSUVudmlyb25tZW50RGF0YSB9IGZyb20gJy4uLy4uL2NvbmZpZ3VyYXRpb25zL2Vudmlyb25tZW50JztcclxuaW1wb3J0IHsgQWpheCwgSUFqYXhQcm92aWRlciwgVGltZVN0YW1wUHJvdmlkZXIgfSBmcm9tICcuLi8uLi9mcmFtZXdvcmsnO1xyXG5pbXBvcnQgeyBJTG9nZ2VyIH0gZnJvbSAnLi4vLi4vbG9ncyc7XHJcbmltcG9ydCB7IElRdWV1ZSwgTWVtb3J5UXVldWUgfSBmcm9tICcuLi8uLi9xdWV1ZXMnO1xyXG5pbXBvcnQgeyBTYW1wbGVkUXVldWUgfSBmcm9tICcuLi8uLi9xdWV1ZXMnO1xyXG5pbXBvcnQgeyBJbmRleGVkREJRdWV1ZSB9IGZyb20gJy4uLy4uL3F1ZXVlcy9pbmRleGVkZGIvaW5kZXhlZGRiLXF1ZXVlJztcclxuaW1wb3J0IHsgTG9jYWxTdG9yYWdlUXVldWUgfSBmcm9tICcuLi8uLi9xdWV1ZXMvbG9jYWwtc3RvcmFnZS9sb2NhbC1zdG9yYWdlLXF1ZXVlJztcclxuaW1wb3J0IHsgQmF0Y2hBdWRpdFByb3ZpZGVyIH0gZnJvbSAnLi4vYXVkaXQvYXVkaXQtcHJvdmlkZXInO1xyXG5pbXBvcnQgeyBQaXBlUGVyZm9ybWFuY2VBdWRpdG9yQnVpbGRlciB9IGZyb20gJy4uL2F1ZGl0L2F1ZGl0b3JzL3BpcGUtcGVyZm9ybWFuY2UtYXVkaXRvcic7XHJcbmltcG9ydCB7IFBpcGVTdGF0aXN0aWNBdWRpdG9yIH0gZnJvbSAnLi4vYXVkaXQvYXVkaXRvcnMvcGlwZS1zdGF0aXN0aWNzLWF1ZGl0b3InO1xyXG5pbXBvcnQgeyBXb3JrZXJBdWRpdFNlbmRlciB9IGZyb20gJy4uL2F1ZGl0L3NlbmRlcnMvd29ya2VyLWF1ZGl0LXNlbmRlcic7XHJcbmltcG9ydCB7IElQaXBlU3RhdHNQcm92aWRlciB9IGZyb20gJy4uL2F1ZGl0L3N0YXRzL3BpcGUtc3RhdHMnO1xyXG5pbXBvcnQgeyBCYXRjaEJ1aWxkZXIgfSBmcm9tICcuLi9iYXRjaC1idWlsZGVyJztcclxuaW1wb3J0IHsgRGVmYXVsdEJhdGNoRHJvcFN0cmF0ZWd5IH0gZnJvbSAnLi4vYmF0Y2gtZHJvcC1zdHJhdGVneSc7XHJcbmltcG9ydCB7IElCYXRjaFN0b3JhZ2UgfSBmcm9tICcuLi9iYXRjaC1zdG9yYWdlcy9iYXRjaC1zdG9yYWdlJztcclxuaW1wb3J0IHsgQmF0Y2hJbmRleGVkREJTdG9yYWdlIH0gZnJvbSAnLi4vYmF0Y2gtc3RvcmFnZXMvaW5kZXhlZGRiLXN0b3JhZ2UvYmF0Y2gtaW5kZXhlZGRiLXN0b3JhZ2UnO1xyXG5pbXBvcnQgeyBCYXRjaExvY2FsU3RvcmFnZVN0b3JhZ2UgfSBmcm9tICcuLi9iYXRjaC1zdG9yYWdlcy9sb2NhbC1zdG9yYWdlL2JhdGNoLWxvY2Fsc3RvcmFnZS1zdG9yYWdlJztcclxuaW1wb3J0IHsgQmF0Y2hNZW1vcnlTdG9yYWdlIH0gZnJvbSAnLi4vYmF0Y2gtc3RvcmFnZXMvbWVtb3J5LXN0b3JhZ2UvYmF0Y2gtbWVtb3J5LXN0b3JhZ2UnO1xyXG5pbXBvcnQgeyBCdXMgfSBmcm9tICcuLi9idXMnO1xyXG5pbXBvcnQgeyBDb250ZXh0IH0gZnJvbSAnLi4vY29udGV4dCc7XHJcbmltcG9ydCB7IEZFQW5hbHl0aWNzQ29sbGVjdG9yRW5kcG9pbnQsIElFbmRwb2ludCwgSUZFQW5hbHl0aWNzQ29sbGVjdG9yQ29uZmlndXJhdGlvbiB9IGZyb20gJy4uL2VuZHBvaW50cyc7XHJcbmltcG9ydCB7IER5bmFtaWNGbHVzaFRpbWVTdHJhdGVneSB9IGZyb20gJy4uL2ZsdXNoLXRpbWUtc3RyYXRlZ3knO1xyXG5pbXBvcnQgeyBQaXBlIH0gZnJvbSAnLi4vcGlwZSc7XHJcbmltcG9ydCB7IFBvcnRBamF4UHJvdmlkZXIgfSBmcm9tICcuL3BvcnQtYWpheC1wcm92aWRlcic7XHJcblxyXG4vKipcclxuICogQGludGVybmFsXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgQnVzQnVpbGRlciB7XHJcbiAgICBwdWJsaWMgcmVhZG9ubHkgYXVkaXRTZW5kZXI6IFdvcmtlckF1ZGl0U2VuZGVyO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgX2NvbnRleHQ6IENvbnRleHQsXHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBfY29uZmlnOiBJQ29uZmlndXJhdGlvbixcclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IF9lbnZpcm9ubWVudDogSUVudmlyb25tZW50RGF0YSxcclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IF9zdGF0c1Byb3ZpZGVyOiBJUGlwZVN0YXRzUHJvdmlkZXIsXHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBfbG9nZ2VyOiBJTG9nZ2VyXHJcbiAgICApIHtcclxuICAgICAgICB0aGlzLmF1ZGl0U2VuZGVyID0gbmV3IFdvcmtlckF1ZGl0U2VuZGVyKHRoaXMuX2NvbnRleHQpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhc3luYyBidWlsZCgpOiBQcm9taXNlPEJ1cz4ge1xyXG4gICAgICAgIGNvbnN0IGFsbFBpcGVzID0gbmV3IE1hcDxzdHJpbmcsIFBpcGU+KCk7XHJcblxyXG4gICAgICAgIGZvciAoY29uc3QgZW5kcG9pbnRDb25maWcgb2YgdGhpcy5fY29uZmlnLmVuZHBvaW50cykge1xyXG4gICAgICAgICAgICBjb25zdCBwaXBlcyA9IGF3YWl0IHRoaXMucGlwZXMoZW5kcG9pbnRDb25maWcpO1xyXG5cclxuICAgICAgICAgICAgcGlwZXMuZm9yRWFjaCgocGlwZSwgaWQpID0+IHtcclxuICAgICAgICAgICAgICAgIGFsbFBpcGVzLnNldChpZCwgcGlwZSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIG5ldyBCdXMoYWxsUGlwZXMpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgYXN5bmMgcGlwZXMoZW5kcG9pbnRDb25maWc6IElFbmRwb2ludENvbmZpZyk6IFByb21pc2U8TWFwPHN0cmluZywgUGlwZT4+IHtcclxuICAgICAgICBjb25zdCBlbmRwb2ludCA9IHRoaXMuZW5kcG9pbnQoZW5kcG9pbnRDb25maWcpO1xyXG5cclxuICAgICAgICBjb25zdCBwaXBlcyA9IG5ldyBNYXA8c3RyaW5nLCBQaXBlPigpO1xyXG5cclxuICAgICAgICBjb25zdCBwZXJmb3JtYW5jZUF1ZGl0b3IgPSBQaXBlUGVyZm9ybWFuY2VBdWRpdG9yQnVpbGRlci5jcmVhdGUodGhpcy5fZW52aXJvbm1lbnQucGVyZm9ybWFuY2VBdWRpdCwgbmV3IFdvcmtlckF1ZGl0U2VuZGVyKHRoaXMuX2NvbnRleHQpKTtcclxuICAgICAgICBjb25zdCBzdGF0aXN0aWNBdWRpdG9yID0gbmV3IFBpcGVTdGF0aXN0aWNBdWRpdG9yKHRoaXMuX3N0YXRzUHJvdmlkZXIpO1xyXG5cclxuICAgICAgICBmb3IgKGNvbnN0IHF1ZXVlQ29uZmlnIG9mIGVuZHBvaW50Q29uZmlnLnF1ZXVlcykge1xyXG4gICAgICAgICAgICBjb25zdCBxdWV1ZSA9IG5ldyBTYW1wbGVkUXVldWUoYXdhaXQgdGhpcy5xdWV1ZShxdWV1ZUNvbmZpZyksIHF1ZXVlQ29uZmlnKTtcclxuICAgICAgICAgICAgY29uc3QgYmF0Y2hTdG9yYWdlID0gYXdhaXQgdGhpcy5iYXRjaFN0b3JhZ2UocXVldWVDb25maWcpO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgYXVkaXRQcm92aWRlciA9IG5ldyBCYXRjaEF1ZGl0UHJvdmlkZXIoKTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGJhdGNoRHJvcFN0cmF0ZWd5ID0gbmV3IERlZmF1bHRCYXRjaERyb3BTdHJhdGVneShxdWV1ZUNvbmZpZyk7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBiYXRjaEJ1aWxkZXIgPSBuZXcgQmF0Y2hCdWlsZGVyKHF1ZXVlLCBiYXRjaFN0b3JhZ2UsIGJhdGNoRHJvcFN0cmF0ZWd5LCBhdWRpdFByb3ZpZGVyLCBzdGF0aXN0aWNBdWRpdG9yLCBxdWV1ZUNvbmZpZyk7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBmbHVzaFRpbWVTdHJhdGVneSA9IG5ldyBEeW5hbWljRmx1c2hUaW1lU3RyYXRlZ3kodGhpcy5fc3RhdHNQcm92aWRlci5nZXQocXVldWUpLCBxdWV1ZUNvbmZpZyk7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBwaXBlID0gbmV3IFBpcGUoYmF0Y2hCdWlsZGVyLCBlbmRwb2ludCwgZmx1c2hUaW1lU3RyYXRlZ3ksIHRoaXMuX2xvZ2dlciwgcGVyZm9ybWFuY2VBdWRpdG9yKTtcclxuXHJcbiAgICAgICAgICAgIHBpcGVzLnNldChxdWV1ZUNvbmZpZy5pZCwgcGlwZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gcGlwZXM7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBhc3luYyBiYXRjaFN0b3JhZ2UoY29uZmlnOiBJSW5NZW1vcnlRdWV1ZUNvbmZpZyB8IElQZXJzaXN0ZW50UXVldWVDb25maWcpOiBQcm9taXNlPElCYXRjaFN0b3JhZ2U+IHtcclxuICAgICAgICBpZiAoY29uZmlnLnBlcnNpc3RlbnQpIHtcclxuICAgICAgICAgICAgY29uc3Qgc3luY1RpbWUgPSAoY29uZmlnLm1heEZsdXNoVGltZSB8fCAzMCkgKiAxLjU7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gQmF0Y2hJbmRleGVkREJTdG9yYWdlLmNyZWF0ZShjb25maWcuaWQsIHN5bmNUaW1lLCBjb25maWcubmFtZSwgY29uZmlnLnJlc2V0KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oKHN0b3JhZ2UpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdG9yYWdlLmxvZ2dlciA9IHRoaXMuX2xvZ2dlcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9sb2dnZXIubG9nKGBDcmVhdGVkIHBlcnNpc3RlbnQgYmF0Y2ggc3RvcmFnZSBmb3IgaWQgJHtjb25maWcuaWR9YCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHN0b3JhZ2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2xvZ2dlci5lcnJvcignQ3JlYXRpbmcgSW5kZXhlZERiIGZvciBiYXRjaCBzdG9yYWdlIHdhcyBmYWlsZWQuJywgZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHN0b3JhZ2UgPSBCYXRjaExvY2FsU3RvcmFnZVN0b3JhZ2UuY3JlYXRlKGNvbmZpZy5pZCwgY29uZmlnLm5hbWUsIGNvbmZpZy5yZXNldCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzdG9yYWdlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0b3JhZ2UubG9nZ2VyID0gdGhpcy5fbG9nZ2VyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9sb2dnZXIubG9nKGBEb3duZ3JhZGVkIHRvIGxvY2FsIHN0b3JhZ2UgYmF0Y2ggc3RvcmFnZSBmb3IgaWQgJHtjb25maWcuaWR9LmApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gc3RvcmFnZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2xvZ2dlci5sb2coYERvd25ncmFkZWQgdG8gbWVtb3J5IGJhdGNoIHN0b3JhZ2UgZm9yIGlkICR7Y29uZmlnLmlkfS5gKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IEJhdGNoTWVtb3J5U3RvcmFnZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fbG9nZ2VyLmxvZyhgQ3JlYXRlZCBtZW1vcnkgYmF0Y2ggc3RvcmFnZSBmb3IgaWQgJHtjb25maWcuaWR9YCk7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBCYXRjaE1lbW9yeVN0b3JhZ2UoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGFzeW5jIHF1ZXVlKGNvbmZpZzogSUluTWVtb3J5UXVldWVDb25maWcgfCBJUGVyc2lzdGVudFF1ZXVlQ29uZmlnKTogUHJvbWlzZTxJUXVldWU+IHtcclxuICAgICAgICBpZiAoY29uZmlnLnBlcnNpc3RlbnQpIHtcclxuICAgICAgICAgICAgY29uc3QgbHNRdWV1ZSA9IExvY2FsU3RvcmFnZVF1ZXVlLmNyZWF0ZShjb25maWcuaWQsIGNvbmZpZy5uYW1lLCBjb25maWcucmVzZXQpO1xyXG4gICAgICAgICAgICBpZiAobHNRdWV1ZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fbG9nZ2VyLmxvZyhgQ3JlYXRlZCBMb2NhbCBTdG9yYWdlIHF1ZXVlIGZvciBpZCAke2NvbmZpZy5pZH1gKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBsc1F1ZXVlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gSW5kZXhlZERCUXVldWUuY3JlYXRlKGNvbmZpZy5pZCwgY29uZmlnLm5hbWUsIGNvbmZpZy5yZXNldClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oKHF1ZXVlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2xvZ2dlci5sb2coYENyZWF0ZWQgcGVyc2lzdGVudCBxdWV1ZSBmb3IgaWQgJHtjb25maWcuaWR9YCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBxdWV1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmNhdGNoKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fbG9nZ2VyLmxvZyhgRG93bmdyYWRlZCB0byBtZW1vcnkgcXVldWUgZm9yIGlkICR7Y29uZmlnLmlkfS5gKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBNZW1vcnlRdWV1ZShjb25maWcuaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX2xvZ2dlci5sb2coYENyZWF0ZWQgbWVtb3J5IHF1ZXVlIGZvciBpZCAke2NvbmZpZy5pZH1gKTtcclxuICAgICAgICByZXR1cm4gbmV3IE1lbW9yeVF1ZXVlKGNvbmZpZy5pZCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBlbmRwb2ludChjb25maWc6IElFbmRwb2ludENvbmZpZyk6IElFbmRwb2ludCB7XHJcbiAgICAgICAgY29uc3QgY29uZmlndXJhdGlvbiA9IGNvbmZpZyBhcyBhbnk7XHJcblxyXG4gICAgICAgIGlmIChjb25maWcudHlwZSAhPT0gJ2ZlLWFuYWx5dGljLWNvbGxlY3RvcicpIHtcclxuICAgICAgICAgICAgdGhpcy5fbG9nZ2VyLmVycm9yKGBFbmRwb2ludCB0eXBlICcke2NvbmZpZy50eXBlfScgaXMgbm90IHN1cHBvcnRlZGApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIG5ldyBGRUFuYWx5dGljc0NvbGxlY3RvckVuZHBvaW50KHRoaXMuYWpheCgpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXcgVGltZVN0YW1wUHJvdmlkZXIoKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fbG9nZ2VyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25maWd1cmF0aW9uIGFzIElGRUFuYWx5dGljc0NvbGxlY3RvckNvbmZpZ3VyYXRpb24sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2Vudmlyb25tZW50KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGFqYXgoKTogSUFqYXhQcm92aWRlciB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2Vudmlyb25tZW50LmZha2VNb2RlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgUG9ydEFqYXhQcm92aWRlcih0aGlzLl9jb250ZXh0KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG5ldyBBamF4KCk7XHJcbiAgICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL2lmZGVmLWxvYWRlci9pZmRlZi1sb2FkZXIuanM/REVCVUc9dHJ1ZSZQRVJGT1JNQU5DRV9BVURJVD10cnVlIS4vc3JjL3Byb2Nlc3NpbmcvYnVpbGRlcnMvYnVzLWJ1aWxkZXIudHMiLCJleHBvcnQgKiBmcm9tICcuL21lbW9yeS1xdWV1ZSc7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy9pZmRlZi1sb2FkZXIvaWZkZWYtbG9hZGVyLmpzP0RFQlVHPXRydWUmUEVSRk9STUFOQ0VfQVVESVQ9dHJ1ZSEuL3NyYy9xdWV1ZXMvbWVtb3J5L2luZGV4LnRzIiwiaW1wb3J0IHsgSUVudmVsb3AgfSBmcm9tICcuLi8uLi9wcm9jZXNzaW5nL2VudmVsb3AnO1xyXG5pbXBvcnQgeyBJUXVldWUgfSBmcm9tICcuLi9xdWV1ZSc7XHJcblxyXG4vKipcclxuICogSW1wbGVtZW50YXRpb24gb2YgcXVldWUgZm9yIHN0b3JpbmcgaXRlbXMgaW4gYSBtZW1vcnlcclxuICpcclxuICogQGludGVybmFsXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgTWVtb3J5UXVldWUgaW1wbGVtZW50cyBJUXVldWUge1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfYXJyYXk6IEFycmF5PElFbnZlbG9wPiA9IFtdO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBpZDogc3RyaW5nXHJcbiAgICApIHsgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgY291bnQoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fYXJyYXkubGVuZ3RoO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBlbnF1ZXVlKGl0ZW1zOiBBcnJheTxJRW52ZWxvcD4pOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9hcnJheS5wdXNoKC4uLml0ZW1zKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYXN5bmMgY2xlYXIoKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgdGhpcy5fYXJyYXkubGVuZ3RoID0gMDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZGVxdWV1ZShjb3VudDogbnVtYmVyKTogQXJyYXk8SUVudmVsb3A+IHtcclxuICAgICAgICBjb25zdCBsZW5ndGggPSB0aGlzLl9hcnJheS5sZW5ndGg7XHJcblxyXG4gICAgICAgIGNvdW50ID0gTWF0aC5taW4obGVuZ3RoLCBNYXRoLm1heChjb3VudCwgMCkpO1xyXG5cclxuICAgICAgICBpZiAoY291bnQgPD0gMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gW107XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5fYXJyYXkuc3BsaWNlKDAsIGNvdW50KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYXN5bmMgZGVzdHJveSgpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICB0aGlzLmNsZWFyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGRpc3Bvc2UoKTogdm9pZCB7IC8qKi8gfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy9pZmRlZi1sb2FkZXIvaWZkZWYtbG9hZGVyLmpzP0RFQlVHPXRydWUmUEVSRk9STUFOQ0VfQVVESVQ9dHJ1ZSEuL3NyYy9xdWV1ZXMvbWVtb3J5L21lbW9yeS1xdWV1ZS50cyIsImltcG9ydCB7IG92ZXJyaWRlIH0gZnJvbSAnLi4vZnJhbWV3b3JrL3V0aWxzJztcclxuaW1wb3J0IHsgSUVudmVsb3AgfSBmcm9tICcuLi9wcm9jZXNzaW5nL2VudmVsb3AnO1xyXG5pbXBvcnQgeyBJU2FtcGxlZFF1ZXVlIH0gZnJvbSAnLi9pbmRleCc7XHJcbmltcG9ydCB7IElRdWV1ZSB9IGZyb20gJy4vcXVldWUnO1xyXG5cclxuLyoqXHJcbiAqXHJcbiAqXHJcbiAqIEBpbnRlcmZhY2UgSVNhbXBsZWRRdWV1ZUNvbmZpZ3VyYXRpb25cclxuICovXHJcbmV4cG9ydCBpbnRlcmZhY2UgSVNhbXBsZWRRdWV1ZUNvbmZpZ3VyYXRpb24ge1xyXG4gICAgbWF4TWVzc2FnZUNvdW50PzogbnVtYmVyO1xyXG59XHJcblxyXG5jbGFzcyBTYW1wbGVkUXVldWVDb25maWd1cmF0aW9uIGltcGxlbWVudHMgSVNhbXBsZWRRdWV1ZUNvbmZpZ3VyYXRpb24ge1xyXG4gICAgcHVibGljIG1heE1lc3NhZ2VDb3VudDogbnVtYmVyID0gMTUwMDA7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBRdWV1ZSBkZWNvcmF0b3IgZm9yIHByb3ZpZGluZyBzYW1wbGluZyBvZiBtZXNzYWdlc1xyXG4gKlxyXG4gKiBAaW50ZXJuYWxcclxuICogQGNsYXNzIFNhbXBsZWRRdWV1ZVxyXG4gKiBAaW1wbGVtZW50cyB7SVF1ZXVlPFRJdGVtPn1cclxuICogQHRlbXBsYXRlIFRJdGVtXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgU2FtcGxlZFF1ZXVlIGltcGxlbWVudHMgSVNhbXBsZWRRdWV1ZSB7XHJcbiAgICBwdWJsaWMgY29uZmlnOiBTYW1wbGVkUXVldWVDb25maWd1cmF0aW9uID0gbmV3IFNhbXBsZWRRdWV1ZUNvbmZpZ3VyYXRpb24oKTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgcXVldWU6IElRdWV1ZSxcclxuICAgICAgICBjb25maWc6IElTYW1wbGVkUXVldWVDb25maWd1cmF0aW9uIHwgbnVsbCA9IG51bGxcclxuICAgICkge1xyXG4gICAgICAgIG92ZXJyaWRlKHRoaXMuY29uZmlnLCBjb25maWcpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgaWQoKTogc3RyaW5nIHsgcmV0dXJuIHRoaXMucXVldWUuaWQ7IH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGNvdW50KCk6IG51bWJlciB7IHJldHVybiB0aGlzLnF1ZXVlLmNvdW50OyB9XHJcblxyXG4gICAgcHVibGljIGdldCBzaXplKCk6IG51bWJlciB7IHJldHVybiB0aGlzLmNvbmZpZy5tYXhNZXNzYWdlQ291bnQ7IH1cclxuXHJcbiAgICBwdWJsaWMgZW5xdWV1ZShtZXNzYWdlczogSUVudmVsb3BbXSk6IHZvaWQgfCBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICBjb25zdCBmcmVlQ291bnQgPSB0aGlzLnNpemUgLSB0aGlzLnF1ZXVlLmNvdW50O1xyXG5cclxuICAgICAgICBpZiAoZnJlZUNvdW50IDw9IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGZyZWVDb3VudCA8IG1lc3NhZ2VzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICBtZXNzYWdlcyA9IG1lc3NhZ2VzLnNsaWNlKDAsIGZyZWVDb3VudCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5xdWV1ZS5lbnF1ZXVlKG1lc3NhZ2VzKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZGVxdWV1ZShjb3VudDogbnVtYmVyLCBhdm9pZENvbmN1cnJlbmN5PzogYm9vbGVhbik6IEFycmF5PElFbnZlbG9wPiB8IFByb21pc2U8QXJyYXk8SUVudmVsb3A+PiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucXVldWUuZGVxdWV1ZShjb3VudCwgYXZvaWRDb25jdXJyZW5jeSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGRlc3Ryb3koKTogdm9pZCB8IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnF1ZXVlLmRlc3Ryb3koKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZGlzcG9zZSgpOiB2b2lkIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5xdWV1ZS5kaXNwb3NlKCk7XHJcbiAgICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL2lmZGVmLWxvYWRlci9pZmRlZi1sb2FkZXIuanM/REVCVUc9dHJ1ZSZQRVJGT1JNQU5DRV9BVURJVD10cnVlIS4vc3JjL3F1ZXVlcy9zYW1wbGVkLXF1ZXVlLnRzIiwiaW1wb3J0IHsgSW5kZXhlZERiVXRpbHMgfSBmcm9tICcuLi8uLi9mcmFtZXdvcmsvaW5kZXhlZGRiLXV0aWxzJztcclxuaW1wb3J0IHsgSUVudmVsb3AgfSBmcm9tICcuLi8uLi9wcm9jZXNzaW5nL2VudmVsb3AnO1xyXG5pbXBvcnQgeyBJUXVldWUgfSBmcm9tICcuLi9xdWV1ZSc7XHJcblxyXG4vKipcclxuICogSW1wbGVtZW50YXRpb24gb2YgcXVldWUgZm9yIHN0b3JpbmcgaXRlbXMgaW4gYSBtZW1vcnlcclxuICpcclxuICogQGludGVybmFsXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgSW5kZXhlZERCUXVldWUgaW1wbGVtZW50cyBJUXVldWUge1xyXG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSBzdG9yYWdlTmFtZSA9ICdtZXNzYWdlcyc7XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBhc3luYyBjcmVhdGUoaWQ6IHN0cmluZywgbmFtZT86IHN0cmluZywgY2xlYXI/OiBib29sZWFuKTogUHJvbWlzZTxJbmRleGVkREJRdWV1ZT4ge1xyXG4gICAgICAgIGNvbnN0IGRiTmFtZSA9ICdtY2pzOicgKyAobmFtZSB8fCBpZCk7XHJcblxyXG4gICAgICAgIGNvbnN0IGRhdGFiYXNlID0gYXdhaXQgSW5kZXhlZERiVXRpbHMub3BlbihkYk5hbWUsIDEsIChkYikgPT4ge1xyXG4gICAgICAgICAgICBpZiAoIWRiLm9iamVjdFN0b3JlTmFtZXMuY29udGFpbnMoSW5kZXhlZERCUXVldWUuc3RvcmFnZU5hbWUpKSB7XHJcbiAgICAgICAgICAgICAgICBkYi5jcmVhdGVPYmplY3RTdG9yZShJbmRleGVkREJRdWV1ZS5zdG9yYWdlTmFtZSwgeyBhdXRvSW5jcmVtZW50OiB0cnVlIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGNvbnN0IHF1ZXVlID0gbmV3IEluZGV4ZWREQlF1ZXVlKGlkLCBkYXRhYmFzZSk7XHJcblxyXG4gICAgICAgIGlmIChjbGVhcikge1xyXG4gICAgICAgICAgICBhd2FpdCBxdWV1ZS5jbGVhcigpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHF1ZXVlO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX2xhc3RDb3VudDogbnVtYmVyID0gMDtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgaWQ6IHN0cmluZyxcclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IF9kYjogSURCRGF0YWJhc2VcclxuICAgICkgeyB9XHJcblxyXG4gICAgcHVibGljIGdldCBjb3VudCgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9sYXN0Q291bnQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGVucXVldWUoaXRlbXM6IEFycmF5PElFbnZlbG9wPik6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnRyYW5zYWN0aW9uKChzdG9yYWdlKSA9PiB7XHJcbiAgICAgICAgICAgIEluZGV4ZWREYlV0aWxzLmFkZEFycmF5KHN0b3JhZ2UsIGl0ZW1zLCAoKSA9PiB0aGlzLnVwZGF0ZUNvdW50KHN0b3JhZ2UpKTtcclxuICAgICAgICB9LCB1bmRlZmluZWQpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBkZXF1ZXVlKGNvdW50OiBudW1iZXIpOiBQcm9taXNlPEFycmF5PElFbnZlbG9wPj4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnRyYW5zYWN0aW9uKChzdG9yYWdlLCByZXN1bHQpID0+IHtcclxuICAgICAgICAgICAgbGV0IGNvdW50ZXIgPSAwO1xyXG5cclxuICAgICAgICAgICAgSW5kZXhlZERiVXRpbHMucmVxdWVzdDxJREJDdXJzb3JXaXRoVmFsdWU+KHN0b3JhZ2Uub3BlbkN1cnNvcigpLCAoY3Vyc29yKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoY3Vyc29yICYmIChjb3VudGVyIDwgY291bnQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goY3Vyc29yLnZhbHVlKTtcclxuICAgICAgICAgICAgICAgICAgICBjdXJzb3IuZGVsZXRlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY291bnRlcisrO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBjdXJzb3IuY29udGludWUoKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVDb3VudChzdG9yYWdlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSwgbmV3IEFycmF5PElFbnZlbG9wPigpKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZGVzdHJveSgpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICB0aGlzLmRpc3Bvc2UoKTtcclxuICAgICAgICByZXR1cm4gSW5kZXhlZERiVXRpbHMucmVtb3ZlKHRoaXMuX2RiLm5hbWUpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBkaXNwb3NlKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX2RiLmNsb3NlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsZWFyKCk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnRyYW5zYWN0aW9uKChzdG9yYWdlKSA9PiB7XHJcbiAgICAgICAgICAgIHN0b3JhZ2UuY2xlYXIoKTtcclxuICAgICAgICB9LCB1bmRlZmluZWQpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgdXBkYXRlQ291bnQoc3RvcmFnZTogSURCT2JqZWN0U3RvcmUpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBjb3VudFJlcXVlc3QgPSBzdG9yYWdlLmNvdW50KCk7XHJcbiAgICAgICAgY291bnRSZXF1ZXN0Lm9uc3VjY2VzcyA9IChlKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuX2xhc3RDb3VudCA9ICsoZS50YXJnZXQgYXMgYW55KS5yZXN1bHQ7XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9wZW4obW9kZTogSURCVHJhbnNhY3Rpb25Nb2RlID0gJ3JlYWR3cml0ZScpOiBJREJPYmplY3RTdG9yZSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RiLnRyYW5zYWN0aW9uKFtJbmRleGVkREJRdWV1ZS5zdG9yYWdlTmFtZV0sIG1vZGUpLm9iamVjdFN0b3JlKEluZGV4ZWREQlF1ZXVlLnN0b3JhZ2VOYW1lKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHRyYW5zYWN0aW9uPFQ+KGFjdGlvbjogKHN0b3JhZ2U6IElEQk9iamVjdFN0b3JlLCByZXN1bHQ6IFQpID0+IHZvaWQsIHJlc3VsdDogVCk6IFByb21pc2U8VD4ge1xyXG4gICAgICAgIHJldHVybiBJbmRleGVkRGJVdGlscy50cmFuc2FjdGlvbigoKSA9PiB0aGlzLm9wZW4oKSwgYWN0aW9uLCByZXN1bHQpO1xyXG4gICAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy9pZmRlZi1sb2FkZXIvaWZkZWYtbG9hZGVyLmpzP0RFQlVHPXRydWUmUEVSRk9STUFOQ0VfQVVESVQ9dHJ1ZSEuL3NyYy9xdWV1ZXMvaW5kZXhlZGRiL2luZGV4ZWRkYi1xdWV1ZS50cyIsImV4cG9ydCBhYnN0cmFjdCBjbGFzcyBJbmRleGVkREJQcm92aWRlciB7XHJcbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXRJbmRleGVkREIoKTogSURCRmFjdG9yeSB8IHVuZGVmaW5lZCB7XHJcbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXHJcbiAgICAgICAgaWYgKHR5cGVvZiBpbmRleGVkREIgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBpbmRleGVkREI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xyXG4gICAgICAgIGlmICh0eXBlb2YgbW96SW5kZXhlZERCICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgICByZXR1cm4gbW96SW5kZXhlZERCO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cclxuICAgICAgICBpZiAodHlwZW9mIHdlYmtpdEluZGV4ZWREQiAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHdlYmtpdEluZGV4ZWREQjtcclxuICAgICAgICB9XHJcbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXHJcbiAgICAgICAgaWYgKHR5cGVvZiBtc0luZGV4ZWREQiAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG1zSW5kZXhlZERCO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGlzU3VwcG9ydGVkKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiAhIUluZGV4ZWREQlByb3ZpZGVyLmdldEluZGV4ZWREQigpO1xyXG4gICAgfVxyXG59XHJcblxyXG5kZWNsYXJlIGNvbnN0IG1vekluZGV4ZWREQjogSURCRmFjdG9yeTtcclxuZGVjbGFyZSBjb25zdCB3ZWJraXRJbmRleGVkREI6IElEQkZhY3Rvcnk7XHJcbmRlY2xhcmUgY29uc3QgbXNJbmRleGVkREI6IElEQkZhY3Rvcnk7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy9pZmRlZi1sb2FkZXIvaWZkZWYtbG9hZGVyLmpzP0RFQlVHPXRydWUmUEVSRk9STUFOQ0VfQVVESVQ9dHJ1ZSEuL3NyYy9mcmFtZXdvcmsvaW5kZXhlZGRiLXByb3ZpZGVyLnRzIiwiaW1wb3J0IHsgV2ViU3RvcmFnZXMgfSBmcm9tICcuLi8uLi9mcmFtZXdvcmsvd2Vic3RvcmFnZSc7XHJcbmltcG9ydCB7IElFbnZlbG9wIH0gZnJvbSAnLi4vLi4vcHJvY2Vzc2luZy9lbnZlbG9wJztcclxuaW1wb3J0IHsgTWVtb3J5UXVldWUgfSBmcm9tICcuLi9pbmRleCc7XHJcbmltcG9ydCB7IElRdWV1ZSB9IGZyb20gJy4uL3F1ZXVlJztcclxuaW1wb3J0IHsgSUtleVZhbHVlU3RvcmFnZSwgTG9jYWxTdG9yYWdlS2V5VmFsdWUgfSBmcm9tICcuL2xvY2FsLXN0b3JhZ2Uta2V5LXZhbHVlJztcclxuaW1wb3J0IHsgTG9jYWxTdG9yYWdlS2V5VmFsdWVDYWNoZSB9IGZyb20gJy4vbG9jYWwtc3RvcmFnZS1rZXktdmFsdWUtY2FjaGUnO1xyXG5cclxuLyoqXHJcbiAqIEltcGxlbWVudGF0aW9uIG9mIHF1ZXVlIGZvciBzdG9yaW5nIGl0ZW1zIGluIGEgTG9jYWxTdG9yYWdlXHJcbiAqXHJcbiAqIEBpbnRlcm5hbFxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIExvY2FsU3RvcmFnZVF1ZXVlIGltcGxlbWVudHMgSVF1ZXVlIHtcclxuICAgIHB1YmxpYyBzdGF0aWMgY3JlYXRlKGlkOiBzdHJpbmcsIG5hbWU/OiBzdHJpbmcsIGNsZWFyOiBib29sZWFuID0gZmFsc2UpOiBMb2NhbFN0b3JhZ2VRdWV1ZSB8IG51bGwge1xyXG4gICAgICAgIGNvbnN0IGxvY2FsU3RvcmFnZSA9IFdlYlN0b3JhZ2VzLmxvY2FsU3RvcmFnZTtcclxuICAgICAgICBpZiAoIWxvY2FsU3RvcmFnZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHN0b3JhZ2UgPSBuZXcgTG9jYWxTdG9yYWdlS2V5VmFsdWUoKG5hbWUgfHwgaWQpICsgJycsIGxvY2FsU3RvcmFnZSk7XHJcbiAgICAgICAgY29uc3QgY2FjaGUgPSBuZXcgTG9jYWxTdG9yYWdlS2V5VmFsdWVDYWNoZShzdG9yYWdlKTtcclxuXHJcbiAgICAgICAgaWYgKGNsZWFyKSB7XHJcbiAgICAgICAgICAgIHN0b3JhZ2UuY2xlYXIoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBuZXcgTG9jYWxTdG9yYWdlUXVldWUoaWQsIGNhY2hlKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9tZW1vcnk6IE1lbW9yeVF1ZXVlO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBpZDogc3RyaW5nLFxyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgX3N0b3JhZ2U6IElLZXlWYWx1ZVN0b3JhZ2VcclxuICAgICkge1xyXG4gICAgICAgIHRoaXMuX21lbW9yeSA9IG5ldyBNZW1vcnlRdWV1ZShpZCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBjb3VudCgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9tZW1vcnkuY291bnQgKyB0aGlzLl9zdG9yYWdlLmxlbmd0aCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBlbnF1ZXVlKGl0ZW1zOiBBcnJheTxJRW52ZWxvcD4pOiB2b2lkIHtcclxuICAgICAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgaXRlbXMpIHtcclxuICAgICAgICAgICAgY29uc3Qga2V5ID0gaXRlbS5pZDtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLl9zdG9yYWdlLnNldEl0ZW0oa2V5LCBpdGVtKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fbWVtb3J5LmVucXVldWUoW2l0ZW1dKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xlYXIoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fc3RvcmFnZS5jbGVhcigpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBkZXF1ZXVlKGNvdW50OiBudW1iZXIsIGF2b2lkQ29uY3VycmVuY3k6IGJvb2xlYW4pOiBBcnJheTxJRW52ZWxvcD4ge1xyXG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IHRoaXMuX21lbW9yeS5kZXF1ZXVlKGNvdW50KTtcclxuXHJcbiAgICAgICAgaWYgKHJlc3VsdC5sZW5ndGggPj0gY291bnQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjb3VudCA9IGNvdW50IC0gcmVzdWx0Lmxlbmd0aDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICghYXZvaWRDb25jdXJyZW5jeSkge1xyXG4gICAgICAgICAgICBjb25zdCBzdG9yYWdlID0gdGhpcy5fc3RvcmFnZTtcclxuICAgICAgICAgICAgY29uc3QgZGVxdWV1ZWRLZXlzID0gbmV3IEFycmF5PHN0cmluZz4oKTtcclxuICAgICAgICAgICAgbGV0IGNvdW50ZXIgPSAwO1xyXG4gICAgICAgICAgICBmb3IgKGNvbnN0IGl0ZW0gb2Ygc3RvcmFnZS5lbnVtZXJhdGUoKSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdmFsdWUgPSBpdGVtLnZhbHVlIGFzIElFbnZlbG9wO1xyXG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnB1c2godmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGRlcXVldWVkS2V5cy5wdXNoKGl0ZW0ua2V5KTtcclxuICAgICAgICAgICAgICAgICAgICBjb3VudGVyKys7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoY291bnRlciA+PSBjb3VudCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGZvciAoY29uc3Qga2V5IG9mIGRlcXVldWVkS2V5cykge1xyXG4gICAgICAgICAgICAgICAgc3RvcmFnZS5yZW1vdmVJdGVtKGtleSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGRlc3Ryb3koKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5kaXNwb3NlKCk7XHJcbiAgICAgICAgdGhpcy5jbGVhcigpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBkaXNwb3NlKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX21lbW9yeS5kaXNwb3NlKCk7XHJcbiAgICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL2lmZGVmLWxvYWRlci9pZmRlZi1sb2FkZXIuanM/REVCVUc9dHJ1ZSZQRVJGT1JNQU5DRV9BVURJVD10cnVlIS4vc3JjL3F1ZXVlcy9sb2NhbC1zdG9yYWdlL2xvY2FsLXN0b3JhZ2UtcXVldWUudHMiLCJpbXBvcnQgeyBTdG9yYWdlS2V5IH0gZnJvbSAnLi9zdG9yYWdlLWtleSc7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElLZXlWYWx1ZVN0b3JhZ2Uge1xyXG4gICAgbGVuZ3RoKCk6IG51bWJlcjtcclxuXHJcbiAgICBjbGVhcigpOiB2b2lkO1xyXG5cclxuICAgIGhhcyhrZXk6IHN0cmluZyk6IGJvb2xlYW47XHJcblxyXG4gICAgZ2V0SXRlbShrZXk6IHN0cmluZyk6IG9iamVjdCB8IG51bGw7XHJcblxyXG4gICAgcmVtb3ZlSXRlbShrZXk6IHN0cmluZyk6IHZvaWQ7XHJcblxyXG4gICAgc2V0SXRlbShrZXk6IHN0cmluZywgZGF0YTogb2JqZWN0KTogYm9vbGVhbjtcclxuXHJcbiAgICBlbnVtZXJhdGUoKTogSXRlcmFibGVJdGVyYXRvcjxJU3RvcmFnZUl0ZW0+O1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElTdG9yYWdlSXRlbSB7XHJcbiAgICByZWFkb25seSBrZXk6IHN0cmluZztcclxuXHJcbiAgICByZWFkb25seSB2YWx1ZTogb2JqZWN0IHwgbnVsbDtcclxufVxyXG5cclxuLyoqXHJcbiAqIEtleS1WYWx1ZSBzdG9yYWdlIGJhc2VkIG9uIFN0b3JhZ2UgYW5kIGltcGxlbWVudGVkIGxvdyBsZXZlbCBvcGVyYXRpb25zXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgTG9jYWxTdG9yYWdlS2V5VmFsdWUgaW1wbGVtZW50cyBJS2V5VmFsdWVTdG9yYWdlIHtcclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBxdWV1ZUlkOiBzdHJpbmcsXHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBfc3RvcmFnZTogU3RvcmFnZVxyXG4gICAgKSB7IH1cclxuXHJcbiAgICBwdWJsaWMgbGVuZ3RoKCk6IG51bWJlciB7XHJcbiAgICAgICAgbGV0IGNvdW50ZXIgPSAwO1xyXG4gICAgICAgIGNvbnN0IGtleXMgPSB0aGlzLmtleXMoKTtcclxuICAgICAgICB3aGlsZSAoIWtleXMubmV4dCgpLmRvbmUpIHtcclxuICAgICAgICAgICAgY291bnRlcisrO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gY291bnRlcjtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xlYXIoKTogdm9pZCB7XHJcbiAgICAgICAgZm9yIChjb25zdCBrZXkgb2YgdGhpcy5rZXlzKCkpIHtcclxuICAgICAgICAgICAgdGhpcy5fc3RvcmFnZS5yZW1vdmVJdGVtKGtleS52YWx1ZSgpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGhhcyhrZXk6IHN0cmluZyk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGNvbnN0IHNLZXkgPSBuZXcgU3RvcmFnZUtleSh0aGlzLnF1ZXVlSWQsIGtleSkudmFsdWUoKTtcclxuICAgICAgICByZXR1cm4gISF0aGlzLl9zdG9yYWdlLmdldEl0ZW0oc0tleSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldEl0ZW0oa2V5OiBzdHJpbmcpOiBvYmplY3QgfCBudWxsIHtcclxuICAgICAgICBjb25zdCBzS2V5ID0gbmV3IFN0b3JhZ2VLZXkodGhpcy5xdWV1ZUlkLCBrZXkpLnZhbHVlKCk7XHJcbiAgICAgICAgY29uc3QgdmFsdWUgPSB0aGlzLl9zdG9yYWdlLmdldEl0ZW0oc0tleSk7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLnRvT2JqZWN0KHZhbHVlLCBzS2V5KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVtb3ZlSXRlbShrZXk6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IHNLZXkgPSBuZXcgU3RvcmFnZUtleSh0aGlzLnF1ZXVlSWQsIGtleSkudmFsdWUoKTtcclxuICAgICAgICB0aGlzLl9zdG9yYWdlLnJlbW92ZUl0ZW0oc0tleSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldEl0ZW0oa2V5OiBzdHJpbmcsIGRhdGE6IG9iamVjdCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGNvbnN0IHNLZXkgPSBuZXcgU3RvcmFnZUtleSh0aGlzLnF1ZXVlSWQsIGtleSkudmFsdWUoKTtcclxuICAgICAgICBjb25zdCB2YWx1ZSA9IEpTT04uc3RyaW5naWZ5KGRhdGEpO1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3N0b3JhZ2Uuc2V0SXRlbShzS2V5LCB2YWx1ZSk7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH0gY2F0Y2gge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyogZW51bWVyYXRlKCk6IEl0ZXJhYmxlSXRlcmF0b3I8SVN0b3JhZ2VJdGVtPiB7XHJcbiAgICAgICAgZm9yIChjb25zdCBrZXkgb2YgdGhpcy5rZXlzKCkpIHtcclxuICAgICAgICAgICAgY29uc3Qgc0tleSA9IGtleS52YWx1ZSgpO1xyXG4gICAgICAgICAgICBjb25zdCB2YWx1ZSA9IHRoaXMudG9PYmplY3QodGhpcy5fc3RvcmFnZS5nZXRJdGVtKHNLZXkpLCBzS2V5KTtcclxuICAgICAgICAgICAgaWYgKHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICB5aWVsZCB7IHZhbHVlLCBrZXk6IGtleS5rZXkgfTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHRvT2JqZWN0KHZhbHVlOiBzdHJpbmcgfCBudWxsLCBzS2V5OiBzdHJpbmcpOiBvYmplY3QgfCBudWxsIHtcclxuICAgICAgICBpZiAoIXZhbHVlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UodmFsdWUpO1xyXG4gICAgICAgIH0gY2F0Y2gge1xyXG4gICAgICAgICAgICB0aGlzLl9zdG9yYWdlLnJlbW92ZUl0ZW0oc0tleSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUqIGtleXMoKTogSXRlcmFibGVJdGVyYXRvcjxTdG9yYWdlS2V5PiB7XHJcbiAgICAgICAgY29uc3Qgc3RvcmFnZSA9IHRoaXMuX3N0b3JhZ2U7XHJcblxyXG4gICAgICAgIGNvbnN0IG1hcCA9IG5ldyBNYXA8c3RyaW5nLCBhbnk+KCk7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSBzdG9yYWdlLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XHJcbiAgICAgICAgICAgIGlmIChpID49IHN0b3JhZ2UubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICBpID0gc3RvcmFnZS5sZW5ndGggLSAxO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnN0IGtleSA9IHN0b3JhZ2Uua2V5KGkpO1xyXG4gICAgICAgICAgICBpZiAoa2V5KSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBzS2V5ID0gU3RvcmFnZUtleS5wYXJzZShrZXkpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHNLZXkgJiYgc0tleS5xdWV1ZSA9PT0gdGhpcy5xdWV1ZUlkICYmICFtYXAuaGFzKGtleSkpIHtcclxuICAgICAgICAgICAgICAgICAgICBtYXAuc2V0KGtleSwgdW5kZWZpbmVkKTtcclxuICAgICAgICAgICAgICAgICAgICB5aWVsZCBzS2V5O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBtYXAuY2xlYXIoKTtcclxuICAgIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvaWZkZWYtbG9hZGVyL2lmZGVmLWxvYWRlci5qcz9ERUJVRz10cnVlJlBFUkZPUk1BTkNFX0FVRElUPXRydWUhLi9zcmMvcXVldWVzL2xvY2FsLXN0b3JhZ2UvbG9jYWwtc3RvcmFnZS1rZXktdmFsdWUudHMiLCJleHBvcnQgY2xhc3MgU3RvcmFnZUtleSB7XHJcbiAgICBwdWJsaWMgc3RhdGljIHBhcnNlKHZhbHVlOiBzdHJpbmcpOiBTdG9yYWdlS2V5IHwgbnVsbCB7XHJcbiAgICAgICAgaWYgKHZhbHVlICYmICh2YWx1ZS5pbmRleE9mKFN0b3JhZ2VLZXkucHJlZml4LCAwKSA9PT0gMCkpIHtcclxuICAgICAgICAgICAgY29uc3QgcXVldWVNYXRoID0gU3RvcmFnZUtleS5yZWdleC5xdWV1ZS5leGVjKHZhbHVlKTtcclxuICAgICAgICAgICAgY29uc3Qga2V5TWF0aCA9IFN0b3JhZ2VLZXkucmVnZXgua2V5LmV4ZWModmFsdWUpO1xyXG4gICAgICAgICAgICBpZiAocXVldWVNYXRoICYmIGtleU1hdGgpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHNLZXkgPSBuZXcgU3RvcmFnZUtleShxdWV1ZU1hdGhbMV0sIGtleU1hdGhbMV0pO1xyXG4gICAgICAgICAgICAgICAgc0tleS5fa2V5ID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gc0tleTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBwcmVmaXggPSAnbWNqcyc7XHJcbiAgICBwcml2YXRlIHN0YXRpYyByZWFkb25seSByZWdleCA9IHtcclxuICAgICAgICBxdWV1ZTogL3E9KFtcXHctXSspLyxcclxuICAgICAgICBrZXk6IC9rPShbXFx3LV0rKS9cclxuICAgIH07XHJcblxyXG4gICAgcHJpdmF0ZSBfa2V5OiBzdHJpbmc7XHJcblxyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IHF1ZXVlOiBzdHJpbmcsXHJcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IGtleTogc3RyaW5nXHJcbiAgICApIHsgfVxyXG5cclxuICAgIHB1YmxpYyB2YWx1ZSgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9rZXkgfHwgKHRoaXMuX2tleSA9IGAke1N0b3JhZ2VLZXkucHJlZml4fT9xPSR7ZW5jb2RlVVJJQ29tcG9uZW50KHRoaXMucXVldWUpfSZrPSR7ZW5jb2RlVVJJQ29tcG9uZW50KHRoaXMua2V5KX1gKTtcclxuICAgIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvaWZkZWYtbG9hZGVyL2lmZGVmLWxvYWRlci5qcz9ERUJVRz10cnVlJlBFUkZPUk1BTkNFX0FVRElUPXRydWUhLi9zcmMvcXVldWVzL2xvY2FsLXN0b3JhZ2Uvc3RvcmFnZS1rZXkudHMiLCJpbXBvcnQgeyBJS2V5VmFsdWVTdG9yYWdlLCBJU3RvcmFnZUl0ZW0gfSBmcm9tICcuL2xvY2FsLXN0b3JhZ2Uta2V5LXZhbHVlJztcclxuXHJcbmV4cG9ydCBjbGFzcyBMb2NhbFN0b3JhZ2VLZXlWYWx1ZUNhY2hlIGltcGxlbWVudHMgSUtleVZhbHVlU3RvcmFnZSB7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9jYWNoZSA9IG5ldyBNYXA8c3RyaW5nLCBvYmplY3QgfCBudWxsIHwgdW5kZWZpbmVkPigpO1xyXG4gICAgcHJpdmF0ZSBfbGVuZ3RoID0gMDtcclxuICAgIHByaXZhdGUgX3VwZGF0ZUxlbmd0aCA9IHRydWU7XHJcblxyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBfc3RvcmFnZTogSUtleVZhbHVlU3RvcmFnZVxyXG4gICAgKSB7IH1cclxuXHJcbiAgICBwdWJsaWMgbGVuZ3RoKCk6IG51bWJlciB7XHJcbiAgICAgICAgaWYgKHRoaXMuX3VwZGF0ZUxlbmd0aCkge1xyXG4gICAgICAgICAgICB0aGlzLl9sZW5ndGggPSB0aGlzLl9zdG9yYWdlLmxlbmd0aCgpO1xyXG4gICAgICAgICAgICB0aGlzLl91cGRhdGVMZW5ndGggPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2xlbmd0aDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xlYXIoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fc3RvcmFnZS5jbGVhcigpO1xyXG4gICAgICAgIHRoaXMuX2NhY2hlLmNsZWFyKCk7XHJcbiAgICAgICAgdGhpcy5fdXBkYXRlTGVuZ3RoID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaGFzKGtleTogc3RyaW5nKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3N0b3JhZ2UuaGFzKGtleSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldEl0ZW0oa2V5OiBzdHJpbmcpOiBvYmplY3QgfCBudWxsIHtcclxuICAgICAgICBpZiAoIXRoaXMuX3N0b3JhZ2UuaGFzKGtleSkpIHtcclxuICAgICAgICAgICAgdGhpcy5fY2FjaGUuZGVsZXRlKGtleSk7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHZhbHVlID0gdGhpcy5fY2FjaGUuZ2V0KGtleSk7XHJcbiAgICAgICAgaWYgKCF2YWx1ZSkge1xyXG4gICAgICAgICAgICB2YWx1ZSA9IHRoaXMuX3N0b3JhZ2UuZ2V0SXRlbShrZXkpO1xyXG4gICAgICAgICAgICB0aGlzLl9jYWNoZS5zZXQoa2V5LCB2YWx1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVtb3ZlSXRlbShrZXk6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX3N0b3JhZ2UucmVtb3ZlSXRlbShrZXkpO1xyXG4gICAgICAgIHRoaXMuX2NhY2hlLmRlbGV0ZShrZXkpO1xyXG4gICAgICAgIHRoaXMuX2xlbmd0aC0tO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXRJdGVtKGtleTogc3RyaW5nLCBkYXRhOiBvYmplY3QpOiBib29sZWFuIHtcclxuICAgICAgICBjb25zdCBzdWNjZXNzID0gdGhpcy5fc3RvcmFnZS5zZXRJdGVtKGtleSwgZGF0YSk7XHJcbiAgICAgICAgaWYgKHN1Y2Nlc3MpIHtcclxuICAgICAgICAgICAgdGhpcy5fY2FjaGUuc2V0KGtleSwgZGF0YSk7XHJcbiAgICAgICAgICAgIHRoaXMuX3VwZGF0ZUxlbmd0aCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBzdWNjZXNzO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyogZW51bWVyYXRlKCk6IEl0ZXJhYmxlSXRlcmF0b3I8SVN0b3JhZ2VJdGVtPiB7XHJcbiAgICAgICAgZm9yIChjb25zdCBrZXkgb2YgdGhpcy5fY2FjaGUua2V5cygpKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gdGhpcy5nZXRJdGVtKGtleSk7XHJcbiAgICAgICAgICAgIGlmICh2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgeWllbGQge1xyXG4gICAgICAgICAgICAgICAgICAgIGtleSxcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZVxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZm9yIChjb25zdCBpdGVtIG9mIHRoaXMuX3N0b3JhZ2UuZW51bWVyYXRlKCkpIHtcclxuICAgICAgICAgICAgY29uc3Qga2V5ID0gaXRlbS5rZXk7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5fY2FjaGUuaGFzKGtleSkpIHtcclxuICAgICAgICAgICAgICAgIHlpZWxkIGl0ZW07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL2lmZGVmLWxvYWRlci9pZmRlZi1sb2FkZXIuanM/REVCVUc9dHJ1ZSZQRVJGT1JNQU5DRV9BVURJVD10cnVlIS4vc3JjL3F1ZXVlcy9sb2NhbC1zdG9yYWdlL2xvY2FsLXN0b3JhZ2Uta2V5LXZhbHVlLWNhY2hlLnRzIiwiaW1wb3J0IHsgQmF0Y2ggfSBmcm9tICcuLi9iYXRjaCc7XHJcbmltcG9ydCB7IElCYXRjaEF1ZGl0RGF0YSB9IGZyb20gJy4vYXVkaXQtZGF0YSc7XHJcbmltcG9ydCB7IElQaXBlU3RhdHNSZXBvc2l0b3J5IH0gZnJvbSAnLi9zdGF0cy9waXBlLXN0YXRzJztcclxuXHJcbi8qKlxyXG4gKiBQcm92aWRlIGF1ZGl0IGluZm9ybWF0aW9uIGZvciBwYXNzZWQgYmF0Y2hcclxuICpcclxuICogQGludGVybmFsXHJcbiAqL1xyXG5leHBvcnQgaW50ZXJmYWNlIElCYXRjaEF1ZGl0UHJvdmlkZXIge1xyXG4gICAgYXVkaXQoYmF0Y2g6IEJhdGNoLCByZXBvOiBJUGlwZVN0YXRzUmVwb3NpdG9yeSk6IFByb21pc2U8SUJhdGNoQXVkaXREYXRhPjtcclxufVxyXG5cclxuLyoqXHJcbiAqIEBpbnRlcm5hbFxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIEJhdGNoQXVkaXRQcm92aWRlciBpbXBsZW1lbnRzIElCYXRjaEF1ZGl0UHJvdmlkZXIge1xyXG4gICAgcHVibGljIGFzeW5jIGF1ZGl0KGJhdGNoOiBCYXRjaCwgcmVwbzogSVBpcGVTdGF0c1JlcG9zaXRvcnkpOiBQcm9taXNlPElCYXRjaEF1ZGl0RGF0YT4ge1xyXG4gICAgICAgIGxldCBzdGF0OiBJQmF0Y2hBdWRpdERhdGEgfCB1bmRlZmluZWQ7XHJcblxyXG4gICAgICAgIGF3YWl0IHJlcG8udXBkYXRlKChwaXBlU3RhdHMpID0+IHtcclxuICAgICAgICAgICAgc3RhdCA9IHtcclxuICAgICAgICAgICAgICAgIGNpZDogcGlwZVN0YXRzLnN0YXRpc3RpYy5jbGllbnRJZCxcclxuICAgICAgICAgICAgICAgIHFpZDogcGlwZVN0YXRzLnN0YXRpc3RpYy5xdWV1ZUlkLFxyXG4gICAgICAgICAgICAgICAgYmk6IHBpcGVTdGF0cy5zdGF0aXN0aWMuYmF0Y2hJbmRleCxcclxuICAgICAgICAgICAgICAgIHRtYzogcGlwZVN0YXRzLnN0YXRpc3RpYy50b3RhbE1lc3NhZ2VDb3VudCxcclxuICAgICAgICAgICAgICAgIHRyZWM6IHBpcGVTdGF0cy5zdGF0aXN0aWMudG90YWxSZXF1ZXN0RXJyb3JDb3VudCxcclxuICAgICAgICAgICAgICAgIHFtYzogcGlwZVN0YXRzLnN0YXRlLnF1ZXVlTWVzc2FnZUNvdW50LFxyXG4gICAgICAgICAgICAgICAgcXM6IHBpcGVTdGF0cy5zdGF0ZS5xdWV1ZVNpemUsXHJcbiAgICAgICAgICAgICAgICByZWM6IHBpcGVTdGF0cy5zdGF0aXN0aWMucmVxdWVzdEVycm9yQ291bnQsXHJcbiAgICAgICAgICAgICAgICBibWM6IGJhdGNoLmVudmVsb3BzLmxlbmd0aCxcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHBpcGVTdGF0cy5zdGF0aXN0aWMucmVxdWVzdEVycm9yQ291bnQgPSAwO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpZiAoIXN0YXQpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdTdGF0aXN0aWMgd2FzIG5vdCBmaWxsZWQuJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gc3RhdDtcclxuICAgIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvaWZkZWYtbG9hZGVyL2lmZGVmLWxvYWRlci5qcz9ERUJVRz10cnVlJlBFUkZPUk1BTkNFX0FVRElUPXRydWUhLi9zcmMvcHJvY2Vzc2luZy9hdWRpdC9hdWRpdC1wcm92aWRlci50cyIsIlxyXG5pbXBvcnQgeyBJUXVldWUgfSBmcm9tICcuLi8uLi8uLi9xdWV1ZXMvcXVldWUnO1xyXG5pbXBvcnQgeyBCYXRjaCB9IGZyb20gJy4uLy4uL2JhdGNoJztcclxuaW1wb3J0IHsgSUF1ZGl0U2VuZGVyIH0gZnJvbSAnLi4vc2VuZGVycy9hdWRpdC1zZW5kZXInO1xyXG5pbXBvcnQgeyBBamF4UmVxdWVzdFN0YXR1c1Jlc3VsdCB9IGZyb20gJy4uL3N0YXRzL3BpcGUtc3RhdHMnO1xyXG5pbXBvcnQgeyBJQmF0Y2hQZXJmb3JtYW5jZUF1ZGl0b3IsIElQaXBlUGVyZm9ybWFuY2VBdWRpdG9yIH0gZnJvbSAnLi9waXBlJztcclxuXHJcbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuaW1wb3J0IHsgSUJhdGNoQXVkaXQgfSBmcm9tICcuLi9kZWZpbml0aW9ucyc7XHJcbmltcG9ydCB7IEJhdGNoUmVwb3J0ZXIgfSBmcm9tICcuLi9yZXBvcnRlcnMvYmF0Y2gtcmVwb3J0ZXInO1xyXG5pbXBvcnQgeyBQZXJmc3RhbXAgfSBmcm9tICcuL3BlcmZzdGFtcCc7XHJcbi8vLy8vLy8vLy9cclxuXHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBQaXBlUGVyZm9ybWFuY2VBdWRpdG9yQnVpbGRlciB7XHJcbiAgICBwdWJsaWMgc3RhdGljIGNyZWF0ZShzZW5kOiBib29sZWFuLCBzZW5kZXI/OiBJQXVkaXRTZW5kZXIpOiBJUGlwZVBlcmZvcm1hbmNlQXVkaXRvciB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQaXBlUGVyZm9ybWFuY2VBdWRpdG9yKHNlbmQgPyBzZW5kZXIgOiB1bmRlZmluZWQpO1xyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBQaXBlUGVyZm9ybWFuY2VBdWRpdG9yIGltcGxlbWVudHMgSVBpcGVQZXJmb3JtYW5jZUF1ZGl0b3Ige1xyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBfc2VuZGVyPzogSUF1ZGl0U2VuZGVyXHJcbiAgICApIHsgfVxyXG5cclxuICAgIHB1YmxpYyBzdGFydChxdWV1ZTogSVF1ZXVlKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX3NlbmRlcikge1xyXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgUGVyZm9ybWFuY2VCYXRjaEF1ZGl0b3IodGhpcy5fc2VuZGVyKTtcclxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIG5ldyBEdW1teUF1ZGl0b3IoKTtcclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgRHVtbXlBdWRpdG9yIGltcGxlbWVudHMgSUJhdGNoUGVyZm9ybWFuY2VBdWRpdG9yIHtcclxuICAgIHB1YmxpYyBkZXF1ZXVlZChiYWNoOiBCYXRjaCk6IHZvaWQgeyAvKiovIH1cclxuXHJcbiAgICBwdWJsaWMgc2VudCgpOiB2b2lkIHsgLyoqLyB9XHJcblxyXG4gICAgcHVibGljIGNvbmZpcm1lZChyZXN1bHQ6IEFqYXhSZXF1ZXN0U3RhdHVzUmVzdWx0KTogdm9pZCB7IC8qKi8gfVxyXG5cclxuICAgIHB1YmxpYyBlbmRlZCgpOiB2b2lkIHsgLyoqLyB9XHJcbn1cclxuXHJcbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuY2xhc3MgUGVyZm9ybWFuY2VCYXRjaEF1ZGl0b3IgaW1wbGVtZW50cyBJQmF0Y2hQZXJmb3JtYW5jZUF1ZGl0b3Ige1xyXG4gICAgcHJpdmF0ZSBfYmF0Y2g/OiBCYXRjaDtcclxuXHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9hdWRpdDogSUJhdGNoQXVkaXQgPSB7XHJcbiAgICAgICAgZGVxdWV1ZWRBdDogbmV3IFBlcmZzdGFtcCgpXHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgX3NlbmRlcjogSUF1ZGl0U2VuZGVyXHJcbiAgICApIHsgfVxyXG5cclxuICAgIHB1YmxpYyBkZXF1ZXVlZChiYXRjaDogQmF0Y2gpIHtcclxuICAgICAgICB0aGlzLl9iYXRjaCA9IGJhdGNoO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZW50KCkge1xyXG4gICAgICAgIHRoaXMuX2F1ZGl0LnNlbnRBdCA9IG5ldyBQZXJmc3RhbXAoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY29uZmlybWVkKHJlc3VsdDogQWpheFJlcXVlc3RTdGF0dXNSZXN1bHQpIHtcclxuICAgICAgICB0aGlzLl9hdWRpdC5jb25maXJtZWRBdCA9IG5ldyBQZXJmc3RhbXAoKTtcclxuICAgICAgICB0aGlzLl9hdWRpdC5yZXN1bHQgPSByZXN1bHQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGVuZGVkKCkge1xyXG4gICAgICAgIHRoaXMuX2F1ZGl0LmVuZGVkQXQgPSBuZXcgUGVyZnN0YW1wKCk7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLl9iYXRjaCkge1xyXG4gICAgICAgICAgICBjb25zdCByZXBvcnQgPSBuZXcgQmF0Y2hSZXBvcnRlcih0aGlzLl9iYXRjaCwgdGhpcy5fYXVkaXQpLnJlcG9ydCgpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5fc2VuZGVyLmJhdGNoKHJlcG9ydCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbi8vLy8vLy8vLy9cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL2lmZGVmLWxvYWRlci9pZmRlZi1sb2FkZXIuanM/REVCVUc9dHJ1ZSZQRVJGT1JNQU5DRV9BVURJVD10cnVlIS4vc3JjL3Byb2Nlc3NpbmcvYXVkaXQvYXVkaXRvcnMvcGlwZS1wZXJmb3JtYW5jZS1hdWRpdG9yLnRzIiwiaW1wb3J0IHsgQmF0Y2ggfSBmcm9tICcuLi8uLi9iYXRjaCc7XHJcbmltcG9ydCB7IElCYXRjaEF1ZGl0LCBJQmF0Y2hQZXJmb3JtYW5jZVJlcG9ydCB9IGZyb20gJy4uL2RlZmluaXRpb25zJztcclxuaW1wb3J0IHsgZHVyYXRpb24gfSBmcm9tICcuL2NhbGMtbWV0aG9kcyc7XHJcblxyXG5leHBvcnQgY2xhc3MgQmF0Y2hSZXBvcnRlciB7XHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IF9iYXRjaDogQmF0Y2gsXHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBfYXVkaXQ6IElCYXRjaEF1ZGl0LFxyXG4gICAgKSB7fVxyXG5cclxuICAgIHB1YmxpYyByZXBvcnQoKTogSUJhdGNoUGVyZm9ybWFuY2VSZXBvcnQge1xyXG4gICAgICAgIGNvbnN0IGJhdGNoID0gdGhpcy5fYmF0Y2g7XHJcbiAgICAgICAgY29uc3QgYXVkaXQgPSB0aGlzLl9hdWRpdDtcclxuXHJcbiAgICAgICAgaWYgKCFhdWRpdC5kZXF1ZXVlZEF0IHx8ICFhdWRpdC5jb25maXJtZWRBdCB8fCAhYXVkaXQuc2VudEF0IHx8ICFhdWRpdC5lbmRlZEF0KSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignRXJyb3Igb24gcmVwb3J0IGNvbGxlY3RpbmcuIFNvbWUgZGF0YSBpcyBtaXNzaW5nLicpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgYmF0Y2g6IHtcclxuICAgICAgICAgICAgICAgIGluZGV4OiBiYXRjaC5pbmRleCxcclxuICAgICAgICAgICAgICAgIHJlc3VsdDogYXVkaXQucmVzdWx0XHJcbiAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICBiYXRjaGluZ0R1cmF0aW9uOiBkdXJhdGlvbihhdWRpdC5kZXF1ZXVlZEF0LCBhdWRpdC5zZW50QXQpLFxyXG5cclxuICAgICAgICAgICAgY29uZmlybWF0aW9uRHVyYXRpb246IGR1cmF0aW9uKGF1ZGl0LmNvbmZpcm1lZEF0LCBhdWRpdC5lbmRlZEF0KVxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL2lmZGVmLWxvYWRlci9pZmRlZi1sb2FkZXIuanM/REVCVUc9dHJ1ZSZQRVJGT1JNQU5DRV9BVURJVD10cnVlIS4vc3JjL3Byb2Nlc3NpbmcvYXVkaXQvcmVwb3J0ZXJzL2JhdGNoLXJlcG9ydGVyLnRzIiwiXHJcbmltcG9ydCB7IElFbnZlbG9wUXVldWUgfSBmcm9tICcuLi8uLi9lbnZlbG9wLXF1ZXVlJztcclxuaW1wb3J0IHsgSVBpcGVTdGF0c1Byb3ZpZGVyLCBJUGlwZVN0YXRzUmVwb3NpdG9yeSB9IGZyb20gJy4uL3N0YXRzL3BpcGUtc3RhdHMnO1xyXG5pbXBvcnQgeyBJQmF0Y2hTdGF0aXN0aWNBdWRpdG9yLCBJUGlwZVN0YXRpc3RpY0F1ZGl0b3IgfSBmcm9tICcuL3BpcGUnO1xyXG5cclxuZXhwb3J0IGNsYXNzIFBpcGVTdGF0aXN0aWNBdWRpdG9yIGltcGxlbWVudHMgSVBpcGVTdGF0aXN0aWNBdWRpdG9yIHtcclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgX3N0YXRzOiBJUGlwZVN0YXRzUHJvdmlkZXJcclxuICAgICkgeyB9XHJcblxyXG4gICAgcHVibGljIHN0YXJ0KHF1ZXVlOiBJRW52ZWxvcFF1ZXVlKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBCYXRjaFN0YXRpc3RpY0F1ZGl0b3IodGhpcy5fc3RhdHMuZ2V0KHF1ZXVlKSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIEJhdGNoU3RhdGlzdGljQXVkaXRvciBpbXBsZW1lbnRzIElCYXRjaFN0YXRpc3RpY0F1ZGl0b3Ige1xyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IHN0YXRzOiBJUGlwZVN0YXRzUmVwb3NpdG9yeVxyXG4gICAgKSB7IH1cclxuXHJcbiAgICBwdWJsaWMgcmVzdWx0KHN1Y2Nlc3M6IGJvb2xlYW4pIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5zdGF0cy51cGRhdGUoKHN0YXRzKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHN0YXRpc3RpYyA9IHN0YXRzLnN0YXRpc3RpYztcclxuXHJcbiAgICAgICAgICAgIGlmICghc3VjY2Vzcykge1xyXG4gICAgICAgICAgICAgICAgc3RhdGlzdGljLnJlcXVlc3RFcnJvckNvdW50Kys7XHJcbiAgICAgICAgICAgICAgICBzdGF0aXN0aWMudG90YWxSZXF1ZXN0RXJyb3JDb3VudCsrO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBzdGF0aXN0aWMubGFzdFNlbmRpbmdTdWNjZXNzID0gc3VjY2VzcztcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvaWZkZWYtbG9hZGVyL2lmZGVmLWxvYWRlci5qcz9ERUJVRz10cnVlJlBFUkZPUk1BTkNFX0FVRElUPXRydWUhLi9zcmMvcHJvY2Vzc2luZy9hdWRpdC9hdWRpdG9ycy9waXBlLXN0YXRpc3RpY3MtYXVkaXRvci50cyIsImltcG9ydCB7IElQZXJmb3JtYW5jZVdvcmtlck1lc3NhZ2UgfSBmcm9tICcuLi8uLi8uLi93b3JrZXJzL3dvcmtlci1kZWZpbml0aW9ucyc7XHJcbmltcG9ydCB7IENvbnRleHQgfSBmcm9tICcuLi8uLi9jb250ZXh0JztcclxuaW1wb3J0IHsgSUJhdGNoUGVyZm9ybWFuY2VSZXBvcnQsIElNZXNzYWdlc1BlcmZvcm1hbmNlUmVwb3J0IH0gZnJvbSAnLi4vZGVmaW5pdGlvbnMnO1xyXG5pbXBvcnQgeyBJQXVkaXRTZW5kZXIgfSBmcm9tICcuL2F1ZGl0LXNlbmRlcic7XHJcblxyXG4vKipcclxuICogU2VuZGVyIGF1ZGl0IGRhdGEgdG8gbWFpbiB0aHJlYWRcclxuICpcclxuICogQGludGVybmFsXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgV29ya2VyQXVkaXRTZW5kZXIgaW1wbGVtZW50cyBJQXVkaXRTZW5kZXIge1xyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBfY29udGV4dDogQ29udGV4dCxcclxuICAgICkgeyB9XHJcblxyXG4gICAgcHVibGljIGJhdGNoKHJlcG9ydDogSUJhdGNoUGVyZm9ybWFuY2VSZXBvcnQpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9jb250ZXh0LnNlbmRlci5wb3N0TWVzc2FnZSh7IHR5cGU6ICdwZXJmb3JtYW5jZScsIHJlcG9ydDogeyB0eXBlOiAnYmF0Y2gnLCBkYXRhOiByZXBvcnQgfSB9IGFzIElQZXJmb3JtYW5jZVdvcmtlck1lc3NhZ2UpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBtZXNzYWdlcyhyZXBvcnQ6IElNZXNzYWdlc1BlcmZvcm1hbmNlUmVwb3J0KTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fY29udGV4dC5zZW5kZXIucG9zdE1lc3NhZ2UoeyB0eXBlOiAncGVyZm9ybWFuY2UnLCByZXBvcnQ6IHsgdHlwZTogJ21lc3NhZ2VzJywgZGF0YTogcmVwb3J0IH0gfSBhcyBJUGVyZm9ybWFuY2VXb3JrZXJNZXNzYWdlKTtcclxuICAgIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvaWZkZWYtbG9hZGVyL2lmZGVmLWxvYWRlci5qcz9ERUJVRz10cnVlJlBFUkZPUk1BTkNFX0FVRElUPXRydWUhLi9zcmMvcHJvY2Vzc2luZy9hdWRpdC9zZW5kZXJzL3dvcmtlci1hdWRpdC1zZW5kZXIudHMiLCJpbXBvcnQgeyBvdmVycmlkZSB9IGZyb20gJy4uL2ZyYW1ld29yay9pbmRleCc7XHJcbmltcG9ydCB7IElCYXRjaEF1ZGl0UHJvdmlkZXIgfSBmcm9tICcuL2F1ZGl0L2F1ZGl0LXByb3ZpZGVyJztcclxuaW1wb3J0IHsgSUJhdGNoU3RhdGlzdGljQXVkaXRvciwgSVBpcGVTdGF0aXN0aWNBdWRpdG9yIH0gZnJvbSAnLi9hdWRpdC9hdWRpdG9ycy9waXBlJztcclxuaW1wb3J0IHsgSVBpcGVTdGF0c1JlcG9zaXRvcnkgfSBmcm9tICcuL2F1ZGl0L3N0YXRzL3BpcGUtc3RhdHMnO1xyXG5pbXBvcnQgeyBCYXRjaCB9IGZyb20gJy4vYmF0Y2gnO1xyXG5pbXBvcnQgeyBJQmF0Y2hEcm9wU3RyYXRlZ3kgfSBmcm9tICcuL2JhdGNoLWRyb3Atc3RyYXRlZ3knO1xyXG5pbXBvcnQgeyBJQmF0Y2hTdG9yYWdlLCBJU3RvcmVkQmF0Y2hDb25zdW1hdGlvbiB9IGZyb20gJy4vYmF0Y2gtc3RvcmFnZXMvYmF0Y2gtc3RvcmFnZSc7XHJcbmltcG9ydCB7IElFbnZlbG9wUXVldWUgfSBmcm9tICcuL2VudmVsb3AtcXVldWUnO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJQmF0Y2hCdWlsZGVyIHtcclxuICAgIHJlYWRvbmx5IHF1ZXVlOiBJRW52ZWxvcFF1ZXVlO1xyXG5cclxuICAgIG5leHQoYXZvaWRDb25jdXJyZW5jeT86IGJvb2xlYW4pOiBQcm9taXNlPEJhdGNoQ29uc3VtYXRpb24gfCB1bmRlZmluZWQ+O1xyXG5cclxuICAgIGRlc3Ryb3koKTogUHJvbWlzZTx2b2lkPjtcclxufVxyXG5cclxuLyoqXHJcbiAqIENvbmZpZ3VyYXRpb25zIGZvciBCYXRjaFxyXG4gKi9cclxuZXhwb3J0IGludGVyZmFjZSBJQmF0Y2hCdWlsZGVyQ29uZmlndXJhdGlvbiB7XHJcbiAgICAvKipcclxuICAgICAqIE1heCBjb3VudCBvZiBtZXNzYWdlcyBpbiBvbmUgc2VuZGluZyB0byBhbiBlbmRwb2ludFxyXG4gICAgICovXHJcbiAgICBiYXRjaFNpemU/OiBudW1iZXI7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDbGFzcyBkZWZpbmUgZGVmYXVsdCB2YWx1ZXMgZm9yIGNvbmZpZ3VyYXRpb25zXHJcbiAqXHJcbiAqIEBpbnRlcm5hbFxyXG4gKi9cclxuY2xhc3MgQmF0Y2hCdWlsZGVyQ29uZmlndXJhdGlvbiBpbXBsZW1lbnRzIElCYXRjaEJ1aWxkZXJDb25maWd1cmF0aW9uIHtcclxuICAgIHB1YmxpYyBiYXRjaFNpemU6IG51bWJlciA9IDUwO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgQmF0Y2hCdWlsZGVyIGltcGxlbWVudHMgSUJhdGNoQnVpbGRlciB7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9jb25maWc6IEJhdGNoQnVpbGRlckNvbmZpZ3VyYXRpb24gPSBuZXcgQmF0Y2hCdWlsZGVyQ29uZmlndXJhdGlvbigpO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBxdWV1ZTogSUVudmVsb3BRdWV1ZSxcclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IF9iYXRjaFN0b3JhZ2U6IElCYXRjaFN0b3JhZ2UsXHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBfYmF0Y2hEcm9wU3RyYXRlZ3k6IElCYXRjaERyb3BTdHJhdGVneSxcclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IF9hdWRpdFByb3ZpZGVyOiBJQmF0Y2hBdWRpdFByb3ZpZGVyLFxyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgX2F1ZGl0b3I6IElQaXBlU3RhdGlzdGljQXVkaXRvcixcclxuICAgICAgICBjb25maWc6IElCYXRjaEJ1aWxkZXJDb25maWd1cmF0aW9uIHwgbnVsbCA9IG51bGxcclxuICAgICkge1xyXG4gICAgICAgIG92ZXJyaWRlKHRoaXMuX2NvbmZpZywgY29uZmlnKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYXN5bmMgbmV4dChhdm9pZENvbmN1cnJlbmN5OiBib29sZWFuID0gZmFsc2UpOiBQcm9taXNlPEJhdGNoQ29uc3VtYXRpb24gfCB1bmRlZmluZWQ+IHtcclxuICAgICAgICBjb25zdCBhdWRpdG9yID0gdGhpcy5fYXVkaXRvci5zdGFydCh0aGlzLnF1ZXVlKTtcclxuICAgICAgICBjb25zdCBjb25zdW1hdGlvbiA9IGF3YWl0IHRoaXMuYmF0Y2goYXVkaXRvci5zdGF0cywgYXZvaWRDb25jdXJyZW5jeSk7XHJcblxyXG4gICAgICAgIGlmICghY29uc3VtYXRpb24pIHtcclxuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBuZXcgQmF0Y2hDb25zdW1hdGlvbihjb25zdW1hdGlvbixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXVkaXRvcixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fYmF0Y2hEcm9wU3RyYXRlZ3kpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhc3luYyBkZXN0cm95KCk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgIGF3YWl0IHRoaXMuX2JhdGNoU3RvcmFnZS5kZXN0cm95KCk7XHJcbiAgICAgICAgYXdhaXQgdGhpcy5xdWV1ZS5kZXN0cm95KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBiYXRjaChyZXBvOiBJUGlwZVN0YXRzUmVwb3NpdG9yeSwgYXZvaWRDb25jdXJyZW5jeTogYm9vbGVhbik6IFByb21pc2U8SVN0b3JlZEJhdGNoQ29uc3VtYXRpb24gfCB1bmRlZmluZWQ+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fYmF0Y2hTdG9yYWdlLmFwcGVuZChhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGVudmVsb3BzID0gYXdhaXQgdGhpcy5xdWV1ZS5kZXF1ZXVlKHRoaXMuX2NvbmZpZy5iYXRjaFNpemUsIGF2b2lkQ29uY3VycmVuY3kpO1xyXG5cclxuICAgICAgICAgICAgaWYgKCFlbnZlbG9wcy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGJhdGNoID0gYXdhaXQgcmVwby51cGRhdGUoKHN0YXRzKSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IEJhdGNoKGVudmVsb3BzLCArK3N0YXRzLnN0YXRpc3RpYy5iYXRjaEluZGV4KTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBiYXRjaC5hdWRpdHMgPSBhd2FpdCB0aGlzLl9hdWRpdFByb3ZpZGVyLmF1ZGl0KGJhdGNoLCByZXBvKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBiYXRjaDtcclxuICAgICAgICB9LCBhdm9pZENvbmN1cnJlbmN5KTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEJhdGNoQ29uc3VtYXRpb24ge1xyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBfY29uc3VtcHRpb246IElTdG9yZWRCYXRjaENvbnN1bWF0aW9uLFxyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgX2F1ZGl0b3I6IElCYXRjaFN0YXRpc3RpY0F1ZGl0b3IsXHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBfYmF0Y2hEcm9wU3RyYXRlZ3k6IElCYXRjaERyb3BTdHJhdGVneVxyXG4gICAgKSB7IH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGJhdGNoKCk6IEJhdGNoIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY29uc3VtcHRpb24uYmF0Y2g7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFzeW5jIGFjaygpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICBhd2FpdCB0aGlzLl9hdWRpdG9yLnJlc3VsdCh0cnVlKTtcclxuICAgICAgICBhd2FpdCB0aGlzLl9jb25zdW1wdGlvbi5hY2soKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYXN5bmMgbmFjaygpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICB0aGlzLmJhdGNoLmVycm9yQ291bnQrKztcclxuICAgICAgICBhd2FpdCB0aGlzLl9hdWRpdG9yLnJlc3VsdChmYWxzZSk7XHJcblxyXG4gICAgICAgIGNvbnN0IHN0YXRzID0gYXdhaXQgdGhpcy5fYXVkaXRvci5zdGF0cy5yZWFkKCk7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLl9iYXRjaERyb3BTdHJhdGVneS5zaG91bGRCZURyb3BwZWQoc3RhdHMsIHRoaXMuYmF0Y2gpKSB7XHJcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuX2NvbnN1bXB0aW9uLmFjaygpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuX2NvbnN1bXB0aW9uLm5hY2soKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL2lmZGVmLWxvYWRlci9pZmRlZi1sb2FkZXIuanM/REVCVUc9dHJ1ZSZQRVJGT1JNQU5DRV9BVURJVD10cnVlIS4vc3JjL3Byb2Nlc3NpbmcvYmF0Y2gtYnVpbGRlci50cyIsImltcG9ydCB7IG92ZXJyaWRlIH0gZnJvbSAnLi4vZnJhbWV3b3JrL2luZGV4JztcclxuaW1wb3J0IHsgSVBpcGVTdGF0cyB9IGZyb20gJy4vYXVkaXQvc3RhdHMvcGlwZS1zdGF0cyc7XHJcbmltcG9ydCB7IEJhdGNoIH0gZnJvbSAnLi9iYXRjaCc7XHJcblxyXG4vKipcclxuICogRHJvcCBiYXRjaCBzdHJhdGVneSBkZXJtaW5hdGUgdGhlbiBjdXJyZW50IGJhdGNoIHNob3VsZCBiZSBkcm9wcGVkIGJhc2VkIG9uIGN1cnJlbnQgc3RhdGUgYW5kIHN0YXRpc2l0Y3NcclxuICovXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUJhdGNoRHJvcFN0cmF0ZWd5IHtcclxuICAgIHNob3VsZEJlRHJvcHBlZChwaXBlU3RhdHM6IElQaXBlU3RhdHMsIGJhdGNoOiBCYXRjaCk6IGJvb2xlYW47XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUJhdGNoRHJvcFN0cmF0ZWd5Q29uZmlndXJhdGlvbiB7XHJcbiAgICAvKipcclxuICAgICAqIFJhdGlvIG9mIHF1ZXVlIGZ1bGxpbmcgYWZ0ZXIgd2hpY2ggYmF0Y2hlcyBhcmUgZHJvcHBlZCBhZnRldCBgYXR0ZW1wdENvdW50YFxyXG4gICAgICovXHJcbiAgICBmaWxsVGhyZXNob2xkPzogbnVtYmVyO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogTnVtYmVyIG9mIGF0dGVtcHQgZm9yIGVhY2ggYmF0Y2hlcyBhZnRlciBleGNpZGluZyBvZiBgZmlsbFRocmVzaG9sZGBcclxuICAgICAqL1xyXG4gICAgYXR0ZW1wdENvdW50PzogbnVtYmVyO1xyXG59XHJcblxyXG5jbGFzcyBEZWZhdWx0QmF0Y2hEcm9wU3RyYXRlZ3lDb25maWd1cmF0aW9uIGltcGxlbWVudHMgSUJhdGNoRHJvcFN0cmF0ZWd5Q29uZmlndXJhdGlvbiB7XHJcbiAgICBwdWJsaWMgZmlsbFRocmVzaG9sZCA9IDAuNjtcclxuXHJcbiAgICBwdWJsaWMgYXR0ZW1wdENvdW50ID0gMjtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIERlZmF1bHRCYXRjaERyb3BTdHJhdGVneSBpbXBsZW1lbnRzIElCYXRjaERyb3BTdHJhdGVneSB7XHJcbiAgICBwcml2YXRlIF9jb25maWcgPSBuZXcgRGVmYXVsdEJhdGNoRHJvcFN0cmF0ZWd5Q29uZmlndXJhdGlvbigpO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIGNvbmZpZzogSUJhdGNoRHJvcFN0cmF0ZWd5Q29uZmlndXJhdGlvblxyXG4gICAgKSB7XHJcbiAgICAgICAgb3ZlcnJpZGUodGhpcy5fY29uZmlnLCBjb25maWcpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzaG91bGRCZURyb3BwZWQocGlwZVN0YXRzOiBJUGlwZVN0YXRzLCBiYXRjaDogQmF0Y2gpOiBib29sZWFuIHtcclxuICAgICAgICBjb25zdCBzdGF0ZSA9IHBpcGVTdGF0cy5zdGF0ZTtcclxuICAgICAgICBjb25zdCBjb25maWcgPSB0aGlzLl9jb25maWc7XHJcblxyXG4gICAgICAgIHJldHVybiBiYXRjaC5lcnJvckNvdW50ID49IGNvbmZpZy5hdHRlbXB0Q291bnRcclxuICAgICAgICAgICAgICAgJiYgKHN0YXRlLnF1ZXVlTWVzc2FnZUNvdW50IC8gc3RhdGUucXVldWVTaXplKSA+IGNvbmZpZy5maWxsVGhyZXNob2xkO1xyXG4gICAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy9pZmRlZi1sb2FkZXIvaWZkZWYtbG9hZGVyLmpzP0RFQlVHPXRydWUmUEVSRk9STUFOQ0VfQVVESVQ9dHJ1ZSEuL3NyYy9wcm9jZXNzaW5nL2JhdGNoLWRyb3Atc3RyYXRlZ3kudHMiLCJpbXBvcnQgeyBJbmRleGVkRGJVdGlscyB9IGZyb20gJy4uLy4uLy4uL2ZyYW1ld29yay9pbmRleGVkZGItdXRpbHMnO1xyXG5pbXBvcnQgeyBJTG9nZ2VyIH0gZnJvbSAnLi4vLi4vLi4vbG9ncy9sb2dnZXInO1xyXG5pbXBvcnQgeyBCYXRjaCB9IGZyb20gJy4uLy4uL2JhdGNoJztcclxuaW1wb3J0IHsgSUJhdGNoU3RvcmFnZSwgSVN0b3JlZEJhdGNoQ29uc3VtYXRpb24gfSBmcm9tICcuLi9iYXRjaC1zdG9yYWdlJztcclxuXHJcbmV4cG9ydCBjbGFzcyBCYXRjaEluZGV4ZWREQlN0b3JhZ2UgaW1wbGVtZW50cyBJQmF0Y2hTdG9yYWdlIHtcclxuICAgIHB1YmxpYyBzdGF0aWMgYXN5bmMgY3JlYXRlKGlkOiBzdHJpbmcsIHN5bmNocm9uaXphdGlvblRpbWU6IG51bWJlciwgbmFtZT86IHN0cmluZywgY2xlYXI/OiBib29sZWFuKTogUHJvbWlzZTxCYXRjaEluZGV4ZWREQlN0b3JhZ2U+IHtcclxuICAgICAgICBjb25zdCBkYXRhYmFzZSA9IGF3YWl0IEJhdGNoSW5kZXhlZERCU3RvcmFnZS5kYihpZCwgbmFtZSk7XHJcblxyXG4gICAgICAgIGNvbnN0IHN0b3JhZ2UgPSBuZXcgQmF0Y2hJbmRleGVkREJTdG9yYWdlKGlkLCBzeW5jaHJvbml6YXRpb25UaW1lLCBkYXRhYmFzZSk7XHJcblxyXG4gICAgICAgIGlmIChjbGVhcikge1xyXG4gICAgICAgICAgICBhd2FpdCBzdG9yYWdlLmNsZWFyKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gc3RvcmFnZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGRiKGlkOiBzdHJpbmcsIG5hbWU/OiBzdHJpbmcpOiBQcm9taXNlPElEQkRhdGFiYXNlPiB7XHJcbiAgICAgICAgY29uc3QgZGJOYW1lID0gJ21janMtYmF0Y2g6JyArIChuYW1lIHx8IGlkKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIEluZGV4ZWREYlV0aWxzLm9wZW4oZGJOYW1lLCAxLCAoZGIpID0+IHtcclxuICAgICAgICAgICAgaWYgKCFkYi5vYmplY3RTdG9yZU5hbWVzLmNvbnRhaW5zKEJhdGNoSW5kZXhlZERCU3RvcmFnZS5zdG9yYWdlTmFtZSkpIHtcclxuICAgICAgICAgICAgICAgIGRiLmNyZWF0ZU9iamVjdFN0b3JlKEJhdGNoSW5kZXhlZERCU3RvcmFnZS5zdG9yYWdlTmFtZSwgeyBrZXlQYXRoOiAoJ2JhdGNoJyBhcyBrZXlvZiBJQmF0Y2hEYXRhKSArICcuJyArICgnaW5kZXgnIGFzIGtleW9mIEJhdGNoKSB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIHN0b3JhZ2VOYW1lID0gJ2JhdGNoJztcclxuXHJcbiAgICBwdWJsaWMgbG9nZ2VyPzogSUxvZ2dlcjtcclxuXHJcbiAgICBwcml2YXRlIF9yZWNvdmVyeT86IEJhdGNoO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBpZDogc3RyaW5nLFxyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgX3N5bmNUaW1lOiBudW1iZXIsXHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBfZGI6IElEQkRhdGFiYXNlLFxyXG4gICAgKSB7IH1cclxuXHJcbiAgICBwdWJsaWMgYXN5bmMgYXBwZW5kKGNyZWF0ZTogKCkgPT4gUHJvbWlzZTxCYXRjaCB8IHVuZGVmaW5lZD4pOiBQcm9taXNlPElTdG9yZWRCYXRjaENvbnN1bWF0aW9uIHwgdW5kZWZpbmVkPiB7XHJcbiAgICAgICAgbGV0IGJhdGNoID0gYXdhaXQgdGhpcy5yZWFkKCk7XHJcblxyXG4gICAgICAgIGlmICghYmF0Y2gpIHtcclxuXHJcbiAgICAgICAgICAgIGJhdGNoID0gYXdhaXQgY3JlYXRlKCk7XHJcblxyXG4gICAgICAgICAgICBpZiAoYmF0Y2gpIHtcclxuICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMuc2F2ZShiYXRjaCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChiYXRjaCkge1xyXG4gICAgICAgICAgICBjb25zdCBiYXRjaEluZGV4ID0gYmF0Y2guaW5kZXg7XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICBiYXRjaCxcclxuICAgICAgICAgICAgICAgIGFjazogKCkgPT4gdGhpcy5yZXNldChiYXRjaEluZGV4KSxcclxuICAgICAgICAgICAgICAgIG5hY2s6ICgpID0+IHRoaXMuYXZvaWRBY2Nlc3MoYmF0Y2hJbmRleClcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsZWFyKCk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnRyYW5zYWN0aW9uKChzdG9yYWdlKSA9PiB7XHJcbiAgICAgICAgICAgIHN0b3JhZ2UuY2xlYXIoKTtcclxuICAgICAgICB9LCB1bmRlZmluZWQpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhc3luYyBkZXN0cm95KCk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgIHRoaXMuX2RiLmNsb3NlKCk7XHJcbiAgICAgICAgcmV0dXJuIEluZGV4ZWREYlV0aWxzLnJlbW92ZSh0aGlzLl9kYi5uYW1lKS5jYXRjaCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcmVzZXQoaW5kZXg6IG51bWJlcik6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnJlbW92ZShpbmRleCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBhc3luYyByZWFkKCk6IFByb21pc2U8QmF0Y2ggfCB1bmRlZmluZWQ+IHtcclxuICAgICAgICBpZiAodGhpcy5fcmVjb3ZlcnkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3JlY292ZXJ5O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgY29uc3QgcmVhZFJlc3VsdCA9IGF3YWl0IHRoaXMudHJhbnNhY3Rpb24oKHN0b3JhZ2UsIHJlc3VsdCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgSW5kZXhlZERiVXRpbHMucmVxdWVzdDxJREJDdXJzb3JXaXRoVmFsdWU+KHN0b3JhZ2Uub3BlbkN1cnNvcigpLCAoY3Vyc29yKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGN1cnNvcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBkYXRhID0gY3Vyc29yLnZhbHVlIGFzIElCYXRjaERhdGE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhICYmIHRoaXMuaXNOb3RCbG9ja2VkKGRhdGEpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJzb3IudXBkYXRlKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0LmJhdGNoID0gZGF0YS5iYXRjaDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1cnNvci5jb250aW51ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0sIHsgYmF0Y2g6IHVuZGVmaW5lZCBhcyBCYXRjaCB8IHVuZGVmaW5lZCB9KTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiByZWFkUmVzdWx0LmJhdGNoO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZXJyb3IoJ0Vycm9yIG9uIHJlYWRpbmcuJywgZXJyb3IpO1xyXG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGFzeW5jIHNhdmUoYmF0Y2g6IEJhdGNoKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgYXdhaXQgdGhpcy50cmFuc2FjdGlvbigoc3RvcmFnZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgSW5kZXhlZERiVXRpbHMucmVxdWVzdChzdG9yYWdlLmFkZCh7XHJcbiAgICAgICAgICAgICAgICAgICAgYmF0Y2gsXHJcbiAgICAgICAgICAgICAgICAgICAgbGFzdEFjY2VzczogK25ldyBEYXRlKClcclxuICAgICAgICAgICAgICAgIH0gYXMgSUJhdGNoRGF0YSkpO1xyXG4gICAgICAgICAgICB9LCB1bmRlZmluZWQpO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3JlY292ZXJ5ID0gYmF0Y2g7XHJcbiAgICAgICAgICAgIHRoaXMuZXJyb3IoJ0Vycm9yIG9uIHNhdmluZy4nLCBlcnJvcik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgYXN5bmMgcmVtb3ZlKGJhdGNoSW5kZXg6IG51bWJlcik6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgIGlmICh0aGlzLl9yZWNvdmVyeSAmJiB0aGlzLl9yZWNvdmVyeS5pbmRleCA9PT0gYmF0Y2hJbmRleCkge1xyXG4gICAgICAgICAgICB0aGlzLl9yZWNvdmVyeSA9IHVuZGVmaW5lZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgYXdhaXQgdGhpcy50cmFuc2FjdGlvbigoc3RvcmFnZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgSW5kZXhlZERiVXRpbHMucmVxdWVzdChzdG9yYWdlLmRlbGV0ZShiYXRjaEluZGV4KSk7XHJcbiAgICAgICAgICAgIH0sIHVuZGVmaW5lZCk7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgdGhpcy5lcnJvcignRXJyb3Igb24gcmVtb3ZpbmcuJywgZXJyb3IpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGFzeW5jIGF2b2lkQWNjZXNzKGJhdGNoSW5kZXg6IG51bWJlcik6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGF3YWl0IHRoaXMudHJhbnNhY3Rpb24oKHN0b3JhZ2UpID0+IHtcclxuICAgICAgICAgICAgICAgIEluZGV4ZWREYlV0aWxzLnJlcXVlc3Qoc3RvcmFnZS5nZXQoYmF0Y2hJbmRleCksIChkYXRhOiBJQmF0Y2hEYXRhKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YS5sYXN0QWNjZXNzID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICAgICAgICAgIHN0b3JhZ2UucHV0KGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0sIHVuZGVmaW5lZCk7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgdGhpcy5lcnJvcignRXJyb3Igb24gYWNjZXNzIGF2b2lkaW5nLicsIGVycm9yKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvcGVuKG1vZGU6IElEQlRyYW5zYWN0aW9uTW9kZSk6IElEQk9iamVjdFN0b3JlIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZGIudHJhbnNhY3Rpb24oW0JhdGNoSW5kZXhlZERCU3RvcmFnZS5zdG9yYWdlTmFtZV0sIG1vZGUpLm9iamVjdFN0b3JlKEJhdGNoSW5kZXhlZERCU3RvcmFnZS5zdG9yYWdlTmFtZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB0cmFuc2FjdGlvbjxUPihhY3Rpb246IChzdG9yYWdlOiBJREJPYmplY3RTdG9yZSwgcmVzdWx0OiBUKSA9PiB2b2lkLCByZXN1bHQ6IFQsIG1vZGU6IElEQlRyYW5zYWN0aW9uTW9kZSA9ICdyZWFkd3JpdGUnKTogUHJvbWlzZTxUPiB7XHJcbiAgICAgICAgcmV0dXJuIEluZGV4ZWREYlV0aWxzLnRyYW5zYWN0aW9uKCgpID0+IHRoaXMub3Blbihtb2RlKSwgYWN0aW9uLCByZXN1bHQpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaXNOb3RCbG9ja2VkKGRhdGE6IElCYXRjaERhdGEpOiBib29sZWFuIHtcclxuICAgICAgICBpZiAodGhpcy5fc3luY1RpbWUpIHtcclxuICAgICAgICAgICAgY29uc3Qgbm93ID0gK25ldyBEYXRlKCk7XHJcbiAgICAgICAgICAgIGlmIChkYXRhLmxhc3RBY2Nlc3MgJiYgTWF0aC5hYnMobm93IC0gZGF0YS5sYXN0QWNjZXNzKSA8IHRoaXMuX3N5bmNUaW1lKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZGF0YS5sYXN0QWNjZXNzID0gbm93O1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGVycm9yKG1lc3NhZ2U6IHN0cmluZywgZXJyb3I6IEVycm9yKSB7XHJcbiAgICAgICAgaWYgKHRoaXMubG9nZ2VyKSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9nZ2VyLmVycm9yKCdbSW5kZXhlZERiIEJTXTonICsgbWVzc2FnZSwgZXJyb3IpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuaW50ZXJmYWNlIElCYXRjaERhdGEge1xyXG4gICAgYmF0Y2g6IEJhdGNoO1xyXG5cclxuICAgIGxhc3RBY2Nlc3M6IG51bWJlciB8IHVuZGVmaW5lZDtcclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvaWZkZWYtbG9hZGVyL2lmZGVmLWxvYWRlci5qcz9ERUJVRz10cnVlJlBFUkZPUk1BTkNFX0FVRElUPXRydWUhLi9zcmMvcHJvY2Vzc2luZy9iYXRjaC1zdG9yYWdlcy9pbmRleGVkZGItc3RvcmFnZS9iYXRjaC1pbmRleGVkZGItc3RvcmFnZS50cyIsImltcG9ydCB7IFdlYlN0b3JhZ2VzIH0gZnJvbSAnLi4vLi4vLi4vZnJhbWV3b3JrL3dlYnN0b3JhZ2UnO1xyXG5pbXBvcnQgeyBJTG9nZ2VyIH0gZnJvbSAnLi4vLi4vLi4vbG9ncy9sb2dnZXInO1xyXG5pbXBvcnQgeyBCYXRjaCB9IGZyb20gJy4uLy4uL2JhdGNoJztcclxuaW1wb3J0IHsgSUJhdGNoU3RvcmFnZSwgSVN0b3JlZEJhdGNoQ29uc3VtYXRpb24gfSBmcm9tICcuLi9iYXRjaC1zdG9yYWdlJztcclxuXHJcbmV4cG9ydCBjbGFzcyBCYXRjaExvY2FsU3RvcmFnZVN0b3JhZ2UgaW1wbGVtZW50cyBJQmF0Y2hTdG9yYWdlIHtcclxuICAgIHB1YmxpYyBzdGF0aWMgY3JlYXRlKGlkOiBzdHJpbmcsIG5hbWU/OiBzdHJpbmcsIGNsZWFyPzogYm9vbGVhbik6IEJhdGNoTG9jYWxTdG9yYWdlU3RvcmFnZSB8IHVuZGVmaW5lZCB7XHJcbiAgICAgICAgaWYgKCFXZWJTdG9yYWdlcy5sb2NhbFN0b3JhZ2UpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHN0b3JhZ2UgPSBuZXcgQmF0Y2hMb2NhbFN0b3JhZ2VTdG9yYWdlKCdtY2pzLWJhdGNoOicgKyAobmFtZSB8fCBpZCksIFdlYlN0b3JhZ2VzLmxvY2FsU3RvcmFnZSk7XHJcblxyXG4gICAgICAgIGlmIChjbGVhcikge1xyXG4gICAgICAgICAgICBzdG9yYWdlLmNsZWFyKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gc3RvcmFnZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbG9nZ2VyPzogSUxvZ2dlcjtcclxuXHJcbiAgICBwcml2YXRlIF9jYWNoZT86IEJhdGNoO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBrZXk6IHN0cmluZyxcclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IF9zdG9yYWdlOiBTdG9yYWdlXHJcbiAgICApIHsgfVxyXG5cclxuICAgIHB1YmxpYyBhc3luYyBhcHBlbmQoY3JlYXRlOiAoKSA9PiBQcm9taXNlPEJhdGNoIHwgdW5kZWZpbmVkPiwgYXZvaWRDb25jdXJyYW5jeTogYm9vbGVhbik6IFByb21pc2U8SVN0b3JlZEJhdGNoQ29uc3VtYXRpb24gfCB1bmRlZmluZWQ+IHtcclxuICAgICAgICBsZXQgYmF0Y2ggPSB0aGlzLl9jYWNoZSB8fCAoYXZvaWRDb25jdXJyYW5jeSA/IHVuZGVmaW5lZCA6IHRoaXMucmVhZCgpKTtcclxuXHJcbiAgICAgICAgaWYgKCFiYXRjaCkge1xyXG4gICAgICAgICAgICBiYXRjaCA9IHRoaXMuX2NhY2hlID0gYXdhaXQgY3JlYXRlKCk7XHJcblxyXG4gICAgICAgICAgICBpZiAoYmF0Y2ggJiYgIWF2b2lkQ29uY3VycmFuY3kpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2F2ZShiYXRjaCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChiYXRjaCkge1xyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgYmF0Y2gsXHJcbiAgICAgICAgICAgICAgICBhY2s6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9jYWNoZSA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIWF2b2lkQ29uY3VycmFuY3kpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXNldCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBuYWNrOiAoKSA9PiB7IC8qKi8gfVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbGVhcigpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnJlc2V0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGRlc3Ryb3koKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5jbGVhcigpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcmVhZCgpOiBCYXRjaCB8IHVuZGVmaW5lZCB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgY29uc3Qgc3RyID0gdGhpcy5fc3RvcmFnZS5nZXRJdGVtKHRoaXMua2V5KTtcclxuXHJcbiAgICAgICAgICAgIGlmIChzdHIpIHtcclxuICAgICAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIEpTT04ucGFyc2Uoc3RyKSBhcyBCYXRjaDtcclxuICAgICAgICAgICAgICAgIH0gY2F0Y2gge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3N0b3JhZ2UucmVtb3ZlSXRlbSh0aGlzLmtleSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICB0aGlzLmxvZygnRXJyb3Igb24gcmVhZGluZycsIGVycm9yKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNhdmUoYmF0Y2g6IEJhdGNoKTogdm9pZCB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgY29uc3Qgc3RyID0gSlNPTi5zdHJpbmdpZnkoYmF0Y2gpO1xyXG4gICAgICAgICAgICB0aGlzLl9zdG9yYWdlLnNldEl0ZW0odGhpcy5rZXksIHN0cik7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgdGhpcy5sb2coJ0Vycm9yIG9uIHNhdmluZycsIGVycm9yKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSByZXNldCgpOiB2b2lkIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICB0aGlzLl9zdG9yYWdlLnJlbW92ZUl0ZW0odGhpcy5rZXkpO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9nKCdFcnJvciBvbiByZXNldGluZycsIGVycm9yKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBsb2cobWVzc2FnZTogc3RyaW5nLCBlcnJvcjogRXJyb3IpIHtcclxuICAgICAgICBpZiAodGhpcy5sb2dnZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5sb2dnZXIuZXJyb3IoJ1tMU3RvcmFnZSBCU106JyArIG1lc3NhZ2UsIGVycm9yKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL2lmZGVmLWxvYWRlci9pZmRlZi1sb2FkZXIuanM/REVCVUc9dHJ1ZSZQRVJGT1JNQU5DRV9BVURJVD10cnVlIS4vc3JjL3Byb2Nlc3NpbmcvYmF0Y2gtc3RvcmFnZXMvbG9jYWwtc3RvcmFnZS9iYXRjaC1sb2NhbHN0b3JhZ2Utc3RvcmFnZS50cyIsImltcG9ydCB7IEJhdGNoIH0gZnJvbSAnLi4vLi4vYmF0Y2gnO1xyXG5pbXBvcnQgeyBJQmF0Y2hTdG9yYWdlLCBJU3RvcmVkQmF0Y2hDb25zdW1hdGlvbiB9IGZyb20gJy4uL2JhdGNoLXN0b3JhZ2UnO1xyXG5cclxuZXhwb3J0IGNsYXNzIEJhdGNoTWVtb3J5U3RvcmFnZSBpbXBsZW1lbnRzIElCYXRjaFN0b3JhZ2Uge1xyXG4gICAgcHJpdmF0ZSBfYmF0Y2g6IEJhdGNoIHwgdW5kZWZpbmVkO1xyXG5cclxuICAgIHB1YmxpYyBhc3luYyBhcHBlbmQoY3JlYXRlOiAoKSA9PiBQcm9taXNlPEJhdGNoIHwgdW5kZWZpbmVkPik6IFByb21pc2U8SVN0b3JlZEJhdGNoQ29uc3VtYXRpb24gfCB1bmRlZmluZWQ+IHtcclxuICAgICAgICBpZiAoIXRoaXMuX2JhdGNoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2JhdGNoID0gYXdhaXQgY3JlYXRlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIXRoaXMuX2JhdGNoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBiYXRjaDogdGhpcy5fYmF0Y2gsXHJcbiAgICAgICAgICAgIGFjazogKCkgPT4gdGhpcy5fYmF0Y2ggPSB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgIG5hY2s6ICgpID0+IHsgLyoqLyB9XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xlYXIoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fYmF0Y2ggPSB1bmRlZmluZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGRlc3Ryb3koKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5jbGVhcigpO1xyXG4gICAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy9pZmRlZi1sb2FkZXIvaWZkZWYtbG9hZGVyLmpzP0RFQlVHPXRydWUmUEVSRk9STUFOQ0VfQVVESVQ9dHJ1ZSEuL3NyYy9wcm9jZXNzaW5nL2JhdGNoLXN0b3JhZ2VzL21lbW9yeS1zdG9yYWdlL2JhdGNoLW1lbW9yeS1zdG9yYWdlLnRzIiwiZXhwb3J0ICogZnJvbSAnLi9mZS1hbmFseXRpY3MtY29sbGVjdG9yLWVuZHBvaW50JztcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL2lmZGVmLWxvYWRlci9pZmRlZi1sb2FkZXIuanM/REVCVUc9dHJ1ZSZQRVJGT1JNQU5DRV9BVURJVD10cnVlIS4vc3JjL3Byb2Nlc3NpbmcvZW5kcG9pbnRzL2ZlLWFuYWx5dGljcy1jb2xsZWN0b3IvaW5kZXgudHMiLCJpbXBvcnQgeyBNZXNzYWdlVHlwZSB9IGZyb20gJy4uLy4uLy4uL2RlZmluaXRpb25zJztcclxuaW1wb3J0IHsgSUFqYXhQcm92aWRlciwgSVRpbWVTdGFtcFByb3ZpZGVyLCBvdmVycmlkZSB9IGZyb20gJy4uLy4uLy4uL2ZyYW1ld29yayc7XHJcbmltcG9ydCB7IElMb2dnZXIgfSBmcm9tICcuLi8uLi8uLi9sb2dzL2xvZ2dlcic7XHJcbmltcG9ydCB7IFZlcnNpb24gfSBmcm9tICcuLi8uLi8uLi92ZXJzaW9uJztcclxuaW1wb3J0IHsgQmF0Y2ggfSBmcm9tICcuLi8uLi9iYXRjaCc7XHJcbmltcG9ydCB7IElFbnZlbG9wIH0gZnJvbSAnLi4vLi4vZW52ZWxvcCc7XHJcbmltcG9ydCB7IElFbmRwb2ludCB9IGZyb20gJy4uL2VuZHBvaW50JztcclxuXHJcbi8qKlxyXG4gKiBFbnZpcm9ubWVudCBkYXRhIGZvciBGRSBBbmFseXRpY3MgQ29sbGVjdG9yXHJcbiAqXHJcbiAqIEBpbnRlcm5hbFxyXG4gKiBAaW50ZXJmYWNlIElGRUFuYWx5dGljc0NvbGxlY3RvckNvbmZpZ3VyYXRpb25cclxuICovXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUZFQW5hbHl0aWNzQ29sbGVjdG9yRW52aXJvbm1lbnQge1xyXG4gICAgLyoqXHJcbiAgICAgKiBBcGlLZXkgZnJvbSBlbnZlcm9uZW1udFxyXG4gICAgICpcclxuICAgICAqIEB0eXBlIHtzdHJpbmd9QG1lbWJlcm9mIElGRUFuYWx5dGljc0NvbGxlY3RvckNvbmZpZ3VyYXRpb25cclxuICAgICAqL1xyXG4gICAgYXBpS2V5OiBzdHJpbmc7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDb25maWd1cmF0aW9uIGRhdGEgZm9yIEZFIEFuYWx5dGljcyBDb2xsZWN0b3JcclxuICpcclxuICogQGludGVyZmFjZSBJRkVBbmFseXRpY3NDb2xsZWN0b3JDb25maWd1cmF0aW9uXHJcbiAqL1xyXG5leHBvcnQgaW50ZXJmYWNlIElGRUFuYWx5dGljc0NvbGxlY3RvckNvbmZpZ3VyYXRpb24ge1xyXG4gICAgLyoqXHJcbiAgICAgKiBVcmwgZm9yIHNlcnZlciB0byBzZW5kaW5nIG1lc3NhZ2VzXHJcbiAgICAgKlxyXG4gICAgICogQHR5cGUge3N0cmluZ31AbWVtYmVyb2YgSUZFQW5hbHl0aWNzQ29sbGVjdG9yQ29uZmlndXJhdGlvblxyXG4gICAgICovXHJcbiAgICB1cmw6IHN0cmluZztcclxuXHJcbiAgICAvKipcclxuICAgICAqIEFqYXggcmVxdWVzdCB0aW1lb3V0XHJcbiAgICAgKlxyXG4gICAgICogQHR5cGUge251bWJlcn1AbWVtYmVyb2YgSUZFQW5hbHl0aWNzQ29sbGVjdG9yQ29uZmlndXJhdGlvblxyXG4gICAgICovXHJcbiAgICB0aW1lb3V0PzogbnVtYmVyO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQXBpS2V5IGlzIHVzZWQgZm9yIEF1ZGl0TWVzc2FnZXNcclxuICAgICAqXHJcbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxyXG4gICAgICogQG1lbWJlcm9mIElGRUFuYWx5dGljc0NvbGxlY3RvckNvbmZpZ3VyYXRpb25cclxuICAgICAqL1xyXG4gICAgYXVkaXRBcGlLZXk/OiBzdHJpbmc7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBEZWZhdWx0IHZhbHVlcyBmb3IgY29uZmlndXJhdGlvbnNcclxuICpcclxuICogQGludGVybmFsXHJcbiAqIEBjbGFzcyBGRUFuYWx5dGljc0NvbGxlY3RvckNvbmZpZ3VyYXRpb25cclxuICogQGltcGxlbWVudHMge0lGRUFuYWx5dGljc0NvbGxlY3RvckNvbmZpZ3VyYXRpb259XHJcbiAqL1xyXG5jbGFzcyBGRUFuYWx5dGljc0NvbGxlY3RvckNvbmZpZ3VyYXRpb24gaW1wbGVtZW50cyBJRkVBbmFseXRpY3NDb2xsZWN0b3JDb25maWd1cmF0aW9uIHtcclxuICAgIHB1YmxpYyB1cmw6IHN0cmluZztcclxuXHJcbiAgICBwdWJsaWMgdGltZW91dDogbnVtYmVyID0gMjAwMDtcclxuXHJcbiAgICBwdWJsaWMgYXVkaXRBcGlLZXk6IHN0cmluZyA9ICdmZS1kYXRhJztcclxuXHJcbiAgICAvKipcclxuICAgICAqIEZvcm1hbCB2YWxpZGF0aW9uIG9mIGN1cnJlbnQgY29uZmlndXJhdGlvblxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBGRUFuYWx5dGljc0NvbGxlY3RvckNvbmZpZ3VyYXRpb25cclxuICAgICAqL1xyXG4gICAgcHVibGljIHZhbGlkYXRlKGxvZ2dlcjogSUxvZ2dlcikge1xyXG4gICAgICAgIGlmICghdGhpcy51cmwpIHtcclxuICAgICAgICAgICAgY29uc3QgbWVzc2FnZSA9ICdVcmwgZm9yIEZFIEFuYWx5dGljcyBDb2xsZWN0b3IgaXMgbm90IHNldHRlZCc7XHJcbiAgICAgICAgICAgIGxvZ2dlci5mYXRhbChtZXNzYWdlKTtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKG1lc3NhZ2UpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIFJlYWwgbWVzc2FnZXMgc2VuZGVyIHRvIEJFIHNlcnZlcnNcclxuICpcclxuICogQGludGVybmFsXHJcbiAqIEBsaW5rIGh0dHBzOi8vY29uZmx1ZW5jZS5hZ29kYS5sb2NhbC9kaXNwbGF5L0FEUE1FUy9GRStBbmFseXRpY3MrQ29sbGVjdG9ycytGb3JtYXRcclxuICogQGNsYXNzIFBvcnRFbmRwb2ludFxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIEZFQW5hbHl0aWNzQ29sbGVjdG9yRW5kcG9pbnQgaW1wbGVtZW50cyBJRW5kcG9pbnQge1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfY29uZmlnID0gbmV3IEZFQW5hbHl0aWNzQ29sbGVjdG9yQ29uZmlndXJhdGlvbigpO1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfc2VyaWFsaXplcjogRW52ZWxvcFNlcmlhbGl6ZXI7XHJcblxyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBfYWpheDogSUFqYXhQcm92aWRlcixcclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IF90aW1lc3RhbXA6IElUaW1lU3RhbXBQcm92aWRlcixcclxuICAgICAgICBfbG9nZ2VyOiBJTG9nZ2VyLFxyXG4gICAgICAgIGNvbmZpZzogSUZFQW5hbHl0aWNzQ29sbGVjdG9yQ29uZmlndXJhdGlvbixcclxuICAgICAgICBlbnZpcm9ubWVudDogSUZFQW5hbHl0aWNzQ29sbGVjdG9yRW52aXJvbm1lbnRcclxuICAgICkge1xyXG4gICAgICAgICBvdmVycmlkZSh0aGlzLl9jb25maWcsIGNvbmZpZyk7XHJcbiAgICAgICAgIHRoaXMuX2NvbmZpZy52YWxpZGF0ZShfbG9nZ2VyKTtcclxuXHJcbiAgICAgICAgIHRoaXMuX3NlcmlhbGl6ZXIgPSBuZXcgRW52ZWxvcFNlcmlhbGl6ZXIoZW52aXJvbm1lbnQuYXBpS2V5KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2VuZChiYXRjaDogQmF0Y2gpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICBjb25zdCBib2R5ID0gdGhpcy5zZXJpYWxpemUoYmF0Y2gpO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5fYWpheC5zZW5kKHtcclxuICAgICAgICAgICAgdHlwZTogJ1BPU1QnLFxyXG4gICAgICAgICAgICB1cmw6IGAke3RoaXMuX2NvbmZpZy51cmx9L3YyXzE/cD1qcyZ2PSR7ZW5jb2RlVVJJQ29tcG9uZW50KFZlcnNpb24pfSZ0PSR7dGhpcy5fdGltZXN0YW1wLm5vdygpfWAsXHJcbiAgICAgICAgICAgIGJvZHksXHJcbiAgICAgICAgICAgIHRpbWVvdXQ6IHRoaXMuX2NvbmZpZy50aW1lb3V0XHJcbiAgICAgICAgfSkgYXMgUHJvbWlzZTxhbnk+O1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2VyaWFsaXplKGJhdGNoOiBCYXRjaCk6IHN0cmluZyB7XHJcbiAgICAgICAgbGV0IGxpbmVzID0gdGhpcy5hdWRpdChiYXRjaCk7XHJcbiAgICAgICAgbGluZXMgKz0gYFxcblxcbnt9XFxuYDtcclxuICAgICAgICBmb3IgKGNvbnN0IGVudmVsb3Agb2YgYmF0Y2guZW52ZWxvcHMpIHtcclxuICAgICAgICAgICAgbGluZXMgKz0gdGhpcy5fc2VyaWFsaXplci5zZXJpYWxpemUoZW52ZWxvcCkgKyAnXFxuJztcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGxpbmVzO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgYXVkaXQoYmF0Y2g6IEJhdGNoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoYmF0Y2guYXVkaXRzIHx8IHt9KTtcclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgRW52ZWxvcFNlcmlhbGl6ZXIge1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgTWVzc2FnZVR5cGVzOiB7W2tleSBpbiBNZXNzYWdlVHlwZSB8ICdkZWZhdWx0J106IG51bWJlciB9ID0ge1xyXG4gICAgICAgIG1lYXN1cmVtZW50IDogMCxcclxuICAgICAgICBsb2cgOiAyLFxyXG4gICAgICAgIGRlZmF1bHQ6IDFcclxuICAgIH07XHJcblxyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBfYXBpS2V5OiBzdHJpbmdcclxuICAgICkgeyB9XHJcblxyXG4gICAgcHVibGljIHNlcmlhbGl6ZShlbnZlbG9wOiBJRW52ZWxvcCk6IHN0cmluZyAge1xyXG4gICAgICAgIGNvbnN0IHBhcnRzID0gbmV3IEFycmF5PHN0cmluZz4oKTtcclxuXHJcbiAgICAgICAgcGFydHMucHVzaCgoZW52ZWxvcC50aW1lc3RhbXAgfHwgMCkudG9TdHJpbmcoKSk7IC8vIHRpbWVTdGFtcFxyXG4gICAgICAgIHBhcnRzLnB1c2godGhpcy5fYXBpS2V5KTsgLy8gYXBpa2V5XHJcbiAgICAgICAgcGFydHMucHVzaChlbnZlbG9wLm5hbWUpOyAvLyBtZXNzYWdlX25hbWVcclxuICAgICAgICBwYXJ0cy5wdXNoKCcnKTsgLy8gcGFydGl0aW9uX2tleVxyXG4gICAgICAgIHBhcnRzLnB1c2godGhpcy50eXBlKGVudmVsb3ApKTsgLy8gbWVzc2FnZSB0eXBlXHJcbiAgICAgICAgcGFydHMucHVzaChlbnZlbG9wLmlkKTsgLy8gdXVpZFxyXG4gICAgICAgIHBhcnRzLnB1c2goSlNPTi5zdHJpbmdpZnkoZW52ZWxvcC5tZXNzYWdlLCB0aGlzLnZhbHVlRmlsdGVyKSk7IC8vIHBheWxvYWRcclxuXHJcbiAgICAgICAgcmV0dXJuIHBhcnRzLmpvaW4oJywnKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHR5cGUoZW52ZWxvcDogSUVudmVsb3ApOiBzdHJpbmcge1xyXG4gICAgICAgIGxldCBpbmRleCA9IEVudmVsb3BTZXJpYWxpemVyLk1lc3NhZ2VUeXBlc1tlbnZlbG9wLnR5cGVdO1xyXG5cclxuICAgICAgICBpbmRleCA9IGluZGV4ID09PSB1bmRlZmluZWQgPyBFbnZlbG9wU2VyaWFsaXplci5NZXNzYWdlVHlwZXNbJ2RlZmF1bHQnXSA6IGluZGV4O1xyXG5cclxuICAgICAgICByZXR1cm4gaW5kZXgudG9TdHJpbmcoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHZhbHVlRmlsdGVyID0gKGtleTogc3RyaW5nLCB2YWx1ZTogYW55KTogYW55ID0+IHtcclxuICAgICAgICBpZiAodmFsdWUgPT09IG51bGxcclxuICAgICAgICAgICAgfHwgKHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicgJiYgaXNOYU4odmFsdWUpKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy9pZmRlZi1sb2FkZXIvaWZkZWYtbG9hZGVyLmpzP0RFQlVHPXRydWUmUEVSRk9STUFOQ0VfQVVESVQ9dHJ1ZSEuL3NyYy9wcm9jZXNzaW5nL2VuZHBvaW50cy9mZS1hbmFseXRpY3MtY29sbGVjdG9yL2ZlLWFuYWx5dGljcy1jb2xsZWN0b3ItZW5kcG9pbnQudHMiLCIvKipcclxuICogVmVyc2lvbiBvZiB0aGUgbGlicmFyeVxyXG4gKlxyXG4gKiBUaGlzIGZpbGUgaXMgZWRpdGVkIGluIFRlYW1DaXR5IHNlcnZlciBiZWZvcmUgZWFjaCBidWlsZC5cclxuICpcclxuICogQGludGVybmFsXHJcbiAqL1xyXG5leHBvcnQgY29uc3QgVmVyc2lvbiA9ICcwLjAuMSc7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy9pZmRlZi1sb2FkZXIvaWZkZWYtbG9hZGVyLmpzP0RFQlVHPXRydWUmUEVSRk9STUFOQ0VfQVVESVQ9dHJ1ZSEuL3NyYy92ZXJzaW9uLnRzIiwiaW1wb3J0IHsgb3ZlcnJpZGUgfSBmcm9tICcuLi9mcmFtZXdvcmsvaW5kZXgnO1xyXG5pbXBvcnQgeyBJUGlwZVN0YXRzUmVwb3NpdG9yeSB9IGZyb20gJy4vYXVkaXQvc3RhdHMvcGlwZS1zdGF0cyc7XHJcblxyXG4vKipcclxuICogQ29uZmlndXJhdGlvbnMgZm9yIEZsdXNoVGltZVxyXG4gKi9cclxuZXhwb3J0IGludGVyZmFjZSBJRmx1c2hUaW1lQ29uZmlndXJhdGlvbiB7XHJcbiAgICAvKipcclxuICAgICAqIFRpbWUgaW50ZXJ2YWwgdG8gc2VuZCBkYXRhIGZyb20gdGhlIHF1ZXVlIHRvIGFuIGVuZHBvaW50XHJcbiAgICAgKi9cclxuICAgIGZsdXNoVGltZT86IG51bWJlcjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIE1heGltdW0gZmx1c2ggdGltZSB0aGF0IGFsbG93ZWQgZm9yIHRoaXMgcXVldWVcclxuICAgICAqL1xyXG4gICAgbWF4Rmx1c2hUaW1lPzogbnVtYmVyO1xyXG59XHJcblxyXG4vKipcclxuICogQ2xhc3MgZGVmaW5lIGRlYWZ1bHQgdmFsdWVzIGZvciBjb25maWd1cmF0aW9uc1xyXG4gKlxyXG4gKiBAaW50ZXJuYWxcclxuICovXHJcbmNsYXNzIEZsdXNoVGltZUNvbmZpZ3VyYXRpb24gaW1wbGVtZW50cyBJRmx1c2hUaW1lQ29uZmlndXJhdGlvbiB7XHJcbiAgICBwdWJsaWMgZmx1c2hUaW1lOiBudW1iZXIgPSAxMDAwO1xyXG5cclxuICAgIHB1YmxpYyBtYXhGbHVzaFRpbWU6IG51bWJlciA9IDMwMDAwO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElGbHVzaFRpbWVTdHJhdGVneSB7XHJcbiAgICBkdXJhdGlvbigpOiBQcm9taXNlPG51bWJlcj47XHJcblxyXG4gICAgc3luY1RpbWUoKTogbnVtYmVyO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgRHluYW1pY0ZsdXNoVGltZVN0cmF0ZWd5IGltcGxlbWVudHMgSUZsdXNoVGltZVN0cmF0ZWd5IHtcclxuICAgIHByb3RlY3RlZCByZWFkb25seSBfY29uZmlnOiBGbHVzaFRpbWVDb25maWd1cmF0aW9uID0gbmV3IEZsdXNoVGltZUNvbmZpZ3VyYXRpb24oKTtcclxuXHJcbiAgICBwcml2YXRlIF9sYXN0Rmx1c2hUaW1lOiBudW1iZXI7XHJcblxyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBfcmVwbzogSVBpcGVTdGF0c1JlcG9zaXRvcnksXHJcbiAgICAgICAgcmVhZG9ubHkgY29uZmlnOiBJRmx1c2hUaW1lQ29uZmlndXJhdGlvbiB8IG51bGwgPSBudWxsXHJcbiAgICApIHtcclxuICAgICAgICBvdmVycmlkZSh0aGlzLl9jb25maWcsIGNvbmZpZyk7XHJcbiAgICAgICAgdGhpcy5fbGFzdEZsdXNoVGltZSA9IHRoaXMuX2NvbmZpZy5mbHVzaFRpbWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFzeW5jIGR1cmF0aW9uKCk6IFByb21pc2U8bnVtYmVyPiB7XHJcbiAgICAgICAgY29uc3Qgc3RhdHMgPSBhd2FpdCB0aGlzLl9yZXBvLnJlYWQoKTtcclxuICAgICAgICBsZXQgZmx1c2hUaW1lO1xyXG4gICAgICAgIGlmICghc3RhdHMuc3RhdGlzdGljLmxhc3RTZW5kaW5nU3VjY2Vzcykge1xyXG4gICAgICAgICAgICBjb25zdCBmYWN0b3IgPSBNYXRoLm1heChzdGF0cy5zdGF0aXN0aWMucmVxdWVzdEVycm9yQ291bnQsIDEpO1xyXG4gICAgICAgICAgICBmbHVzaFRpbWUgPSBNYXRoLm1pbih0aGlzLl9jb25maWcuZmx1c2hUaW1lICogZmFjdG9yLCB0aGlzLl9jb25maWcubWF4Rmx1c2hUaW1lKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBmbHVzaFRpbWUgPSB0aGlzLl9jb25maWcuZmx1c2hUaW1lO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5fbGFzdEZsdXNoVGltZSA9IGZsdXNoVGltZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3luY1RpbWUoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gTWF0aC5tYXgodGhpcy5fbGFzdEZsdXNoVGltZSAqIDIwLCB0aGlzLl9jb25maWcubWF4Rmx1c2hUaW1lICsgNSk7XHJcbiAgICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL2lmZGVmLWxvYWRlci9pZmRlZi1sb2FkZXIuanM/REVCVUc9dHJ1ZSZQRVJGT1JNQU5DRV9BVURJVD10cnVlIS4vc3JjL3Byb2Nlc3NpbmcvZmx1c2gtdGltZS1zdHJhdGVneS50cyIsImltcG9ydCB7IEd1aWRQcm92aWRlciB9IGZyb20gJy4vZ3VpZCc7XHJcbmltcG9ydCB7IFVubG9hZEV2ZW50IH0gZnJvbSAnLi91bmxvYWQtZXZlbnQnO1xyXG5pbXBvcnQgeyBXZWJTdG9yYWdlcyB9IGZyb20gJy4vd2Vic3RvcmFnZSc7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElTeW5jUG9pbnQge1xyXG4gICAgLyoqXHJcbiAgICAgKiBDYXB0dXJlIHRoZSBjdXJyZW50IGFjdGl2aXR5IGZyb20gYWxsIHRhYlxyXG4gICAgICovXHJcbiAgICBjYXB0dXJlKGR1cmF0aW9uOiBudW1iZXIpOiBib29sZWFuO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVW5jYXB0dXJlIGN1cnJlbnQgdHViIGlmIGl0IGlzIGFjdGl2ZVxyXG4gICAgICovXHJcbiAgICBkaXNwb3NlKCk6IHZvaWQ7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBMb2NhbFN0b3JhZ2VUYWJTeW5jUG9pbnQgaW1wbGVtZW50cyBJU3luY1BvaW50IHtcclxuICAgIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IHRhYklkID0gR3VpZFByb3ZpZGVyLmRlZmF1bHQubmV4dCgpO1xyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IGFsbFlLZXlzOiB7IFt5S2V5OiBzdHJpbmddOiBib29sZWFuIH0gPSB7IH07XHJcbiAgICBwcml2YXRlIHN0YXRpYyBzdWJzY3JpYmVkOiBib29sZWFuO1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfa2V5czogSU11dGV4S2V5cztcclxuICAgIHByaXZhdGUgX2lzQ2FwdHVyZWQ6IGJvb2xlYW47XHJcbiAgICBwcml2YXRlIF9kaXNwb3NlZDogYm9vbGVhbjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwdWJsaWMgdGFza0lkOiBzdHJpbmcsXHJcbiAgICAgICAgcHJpdmF0ZSBfc3RvcmFnZTogU3RvcmFnZSB8IG51bGwgPSBXZWJTdG9yYWdlcy5sb2NhbFN0b3JhZ2VcclxuICAgICkge1xyXG4gICAgICAgIHRoaXMuX2tleXMgPSB7XHJcbiAgICAgICAgICAgIHg6ICdtY2pzLW11dGV4LXg6JyArIHRhc2tJZCxcclxuICAgICAgICAgICAgeTogJ21janMtbXV0ZXgteTonICsgdGFza0lkXHJcbiAgICAgICAgfTtcclxuICAgICAgICBpZiAodGhpcy5fc3RvcmFnZSAmJiAhTG9jYWxTdG9yYWdlVGFiU3luY1BvaW50LnN1YnNjcmliZWQpIHtcclxuICAgICAgICAgICAgTG9jYWxTdG9yYWdlVGFiU3luY1BvaW50LnN1YnNjcmliZSh0aGlzLl9zdG9yYWdlKTtcclxuICAgICAgICAgICAgTG9jYWxTdG9yYWdlVGFiU3luY1BvaW50LnN1YnNjcmliZWQgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENhcHR1cmUgdGFzayBJRCBiZXR3ZWVuIGFsbCBvcGVuZWQgdGFicyBvZiB0aGUgY3VycmVudCBkb21haW4uXHJcbiAgICAgKiBPbiB1bm51Y2Nlc3NhYmxlIGxvY2FsU3RvcmFnZSByZXR1cm4gdHJ1ZTtcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdGFza0lkIC0gVW5pcXVlIHRhc2sgSURcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBbZHVyYXRpb249MjAwMDBdIC0gTWF4aW11bSB0aW1lIGZvciBjYXB0dXJlIHRoZSBhY3RpdmF0aW9uIGluIG1zXHJcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiBjdXJyZW50IHRhYiBpcyBhY3RpdmUgZm9yIHRoZSB0YXNrXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBjYXB0dXJlKGR1cmF0aW9uOiBudW1iZXIgPSAxMDAwICogMjApOiBib29sZWFuIHtcclxuICAgICAgICBpZiAoIXRoaXMuX3N0b3JhZ2UgfHwgdGhpcy5fZGlzcG9zZWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBzdG9yYWdlID0gdGhpcy5fc3RvcmFnZTtcclxuXHJcbiAgICAgICAgY29uc3QgbXV0ZXhYS2V5ID0gdGhpcy5fa2V5cy54O1xyXG4gICAgICAgIGNvbnN0IG11dGV4WUtleSA9IHRoaXMuX2tleXMueTtcclxuXHJcbiAgICAgICAgY29uc3QgdGFiSWQgPSBMb2NhbFN0b3JhZ2VUYWJTeW5jUG9pbnQudGFiSWQ7XHJcbiAgICAgICAgY29uc3Qgbm93ID0gK25ldyBEYXRlKCk7XHJcblxyXG4gICAgICAgIHN0b3JhZ2Uuc2V0SXRlbShtdXRleFhLZXksIHRhYklkKTtcclxuICAgICAgICBjb25zdCBzdHJZID0gc3RvcmFnZS5nZXRJdGVtKG11dGV4WUtleSk7XHJcbiAgICAgICAgY29uc3QgbXV0ZXhZID0gc3RyWSA/IEpTT04ucGFyc2Uoc3RyWSkgYXMgSU11dGV4RGF0YSA6IG51bGw7XHJcblxyXG4gICAgICAgIGNvbnN0IGR1ciA9IG11dGV4WSA/IE1hdGguYWJzKG5vdyAtIG11dGV4WS50aW1lKSA6IE5hTjtcclxuICAgICAgICBjb25zdCBjYXB0dXJlZCA9ICFtdXRleFkgfHwgbXV0ZXhZLmlkID09PSB0YWJJZCB8fCBkdXIgPiBkdXJhdGlvbjtcclxuXHJcbiAgICAgICAgaWYgKGNhcHR1cmVkKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHZhbCA9IEpTT04uc3RyaW5naWZ5KHsgaWQ6IHRhYklkLCB0aW1lOiBub3cgfSBhcyBJTXV0ZXhEYXRhKTtcclxuICAgICAgICAgICAgc3RvcmFnZS5zZXRJdGVtKG11dGV4WUtleSwgdmFsKTtcclxuICAgICAgICAgICAgTG9jYWxTdG9yYWdlVGFiU3luY1BvaW50LmFsbFlLZXlzW3RoaXMuX2tleXMueV0gPSB0cnVlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIExvY2FsU3RvcmFnZVRhYlN5bmNQb2ludC5hbGxZS2V5c1t0aGlzLl9rZXlzLnldID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9pc0NhcHR1cmVkID0gY2FwdHVyZWQgJiYgKHN0b3JhZ2UuZ2V0SXRlbShtdXRleFhLZXkpID09PSB0YWJJZCk7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLl9pc0NhcHR1cmVkO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBkaXNwb3NlKCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9zdG9yYWdlICYmIHRoaXMuX2lzQ2FwdHVyZWQgJiYgIXRoaXMuX2Rpc3Bvc2VkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3N0b3JhZ2UucmVtb3ZlSXRlbSh0aGlzLl9rZXlzLnkpO1xyXG4gICAgICAgICAgICB0aGlzLl9pc0NhcHR1cmVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuX2Rpc3Bvc2VkID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm1lbWJlci1vcmRlcmluZ1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgc3Vic2NyaWJlKHN0b3JhZ2U6IFN0b3JhZ2UpIHtcclxuICAgICAgICBVbmxvYWRFdmVudC5hZGRMaXN0ZW5lcigoKSA9PiB7XHJcbiAgICAgICAgICAgIExvY2FsU3RvcmFnZVRhYlN5bmNQb2ludC51bmNhcHR1cmVBbGwoc3RvcmFnZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm1lbWJlci1vcmRlcmluZ1xyXG4gICAgcHVibGljIHN0YXRpYyB1bmNhcHR1cmVBbGwoc3RvcmFnZTogU3RvcmFnZSkge1xyXG4gICAgICAgIGNvbnN0IGtleXMgPSBMb2NhbFN0b3JhZ2VUYWJTeW5jUG9pbnQuYWxsWUtleXM7XHJcbiAgICAgICAgZm9yIChjb25zdCBrZXkgaW4ga2V5cykge1xyXG4gICAgICAgICAgICBpZiAoa2V5cy5oYXNPd25Qcm9wZXJ0eShrZXkpICYmIGtleXNba2V5XSkge1xyXG4gICAgICAgICAgICAgICAgc3RvcmFnZS5yZW1vdmVJdGVtKGtleSk7XHJcbiAgICAgICAgICAgICAgICBrZXlzW2tleV0gPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuaW50ZXJmYWNlIElNdXRleERhdGEge1xyXG4gICAgaWQ6IHN0cmluZztcclxuXHJcbiAgICB0aW1lOiBudW1iZXI7XHJcbn1cclxuXHJcbmludGVyZmFjZSBJTXV0ZXhLZXlzIHtcclxuICAgIHg6IHN0cmluZztcclxuXHJcbiAgICB5OiBzdHJpbmc7XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL2lmZGVmLWxvYWRlci9pZmRlZi1sb2FkZXIuanM/REVCVUc9dHJ1ZSZQRVJGT1JNQU5DRV9BVURJVD10cnVlIS4vc3JjL2ZyYW1ld29yay90YWItc3luYy1wb2ludC50cyIsImltcG9ydCB7IElFbnZlbG9wUXVldWUgfSBmcm9tICcuLi8uLi9lbnZlbG9wLXF1ZXVlJztcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSVBpcGVTdGF0c1Byb3ZpZGVyIHtcclxuICAgIGdldChxdWV1ZTogSUVudmVsb3BRdWV1ZSk6IElQaXBlU3RhdHNSZXBvc2l0b3J5O1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElQaXBlU3RhdHNSZXBvc2l0b3J5IHtcclxuICAgIHJlYWQoKTogUHJvbWlzZTxJUGlwZVN0YXRzPjtcclxuXHJcbiAgICB1cGRhdGU8VD4oYWN0aW9uOiAoc3RhdHM6IElQaXBlU3RhdHMpID0+IFQpOiBQcm9taXNlPFQ+O1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElQaXBlUGVyc2lzdGVudFN0YXRzIHtcclxuICAgIC8qKlxyXG4gICAgICogVW5pcXVlIENsaWVudCBJZFxyXG4gICAgICovXHJcbiAgICByZWFkb25seSBjbGllbnRJZDogc3RyaW5nO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUXVldWUgbmFtZSBmcm9tIGNvbmZpZ3VyYXRpb25cclxuICAgICAqL1xyXG4gICAgcmVhZG9ubHkgcXVldWVJZDogc3RyaW5nO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogSW5jcmVtZW50YWwgbnVtYmVyLCB1bmlxdWUgZm9yIENsaWVudElkXHJcbiAgICAgKi9cclxuICAgIGJhdGNoSW5kZXg6IG51bWJlcjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRvdGFsIE1lc3NhZ2UgQ291bnQgKGhpc3RvcmljYWwgcGVyIENsaWVudElEIGFuZCBRdWV1ZUlEKVxyXG4gICAgICovXHJcbiAgICB0b3RhbE1lc3NhZ2VDb3VudDogbnVtYmVyO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVG90YWwgUmVxdWVzdCBFcnJvciBDb3VudCAoaGlzdG9yaWNhbCBwZXIgQ2xpZW50SUQgYW5kIFF1ZXVlSUQpXHJcbiAgICAgKi9cclxuICAgIHRvdGFsUmVxdWVzdEVycm9yQ291bnQ6IG51bWJlcjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlcXVlc3QgRXJyb3IgQ291bnQgKHNjaWVuY2UgbGFzdCBzdWNjZXNzKVxyXG4gICAgICovXHJcbiAgICByZXF1ZXN0RXJyb3JDb3VudDogbnVtYmVyO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogTGFzdCBlcnJvciBpcyBzdWNjZXNzXHJcbiAgICAgKi9cclxuICAgIGxhc3RTZW5kaW5nU3VjY2VzczogYm9vbGVhbjtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJUGlwZVN0YXRlIHtcclxuICAgIC8qKlxyXG4gICAgICogUXVldWUgU2l6ZSAobWF4aW11bSBhbGxvd2VkIG1lc3NhZ2UgY291bnQgaW4gdGhlIHF1ZXVlKVxyXG4gICAgICovXHJcbiAgICByZWFkb25seSBxdWV1ZVNpemU6IG51bWJlcjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFF1ZXVlIE1lc3NhZ2UgQ291bnQgKGN1cnJlbnQgbWVzc2FnZSBjb3VudCBpbiB0aGUgcXVldWUpXHJcbiAgICAgKi9cclxuICAgIHJlYWRvbmx5IHF1ZXVlTWVzc2FnZUNvdW50OiBudW1iZXI7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSVBpcGVTdGF0cyB7XHJcbiAgICByZWFkb25seSBzdGF0ZTogSVBpcGVTdGF0ZTtcclxuXHJcbiAgICByZWFkb25seSBzdGF0aXN0aWM6IElQaXBlUGVyc2lzdGVudFN0YXRzO1xyXG59XHJcblxyXG5leHBvcnQgZW51bSBBamF4UmVxdWVzdFN0YXR1c1Jlc3VsdCB7XHJcbiAgICBTdWNjZXNzID0gMCxcclxuXHJcbiAgICBOZXR3b3JrRXJyb3IgPSAxXHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL2lmZGVmLWxvYWRlci9pZmRlZi1sb2FkZXIuanM/REVCVUc9dHJ1ZSZQRVJGT1JNQU5DRV9BVURJVD10cnVlIS4vc3JjL3Byb2Nlc3NpbmcvYXVkaXQvc3RhdHMvcGlwZS1zdGF0cy50cyIsImltcG9ydCB7IElBamF4T3B0aW9ucywgSUFqYXhQcm92aWRlciB9IGZyb20gJy4uLy4uL2ZyYW1ld29yayc7XHJcbmltcG9ydCB7IFdvcmtlclJlcXVlc3RTZW5kZXIgfSBmcm9tICcuLi8uLi93b3JrZXJzL3NlbmRlcnMvd29ya2VyLXJlcXVlc3Qtc2VuZGVyJztcclxuaW1wb3J0IHsgQ29udGV4dCB9IGZyb20gJy4uL2NvbnRleHQnO1xyXG5cclxuLyoqXHJcbiAqIFJlc2VuZCBhbGwgcmVxdWVzdCB0byBhIHBvcnRcclxuICpcclxuICogQGludGVybmFsXHJcbiAqIEBjbGFzcyBQb3J0QWpheFByb3ZpZGVyXHJcbiAqIEBpbXBsZW1lbnRzIHtJQWpheFByb3ZpZGVyfVxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFBvcnRBamF4UHJvdmlkZXIgaW1wbGVtZW50cyBJQWpheFByb3ZpZGVyIHtcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgX3NlbmRlcjogV29ya2VyUmVxdWVzdFNlbmRlcjwnYWpheCcsIElBamF4T3B0aW9ucywgc3RyaW5nPjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IF9jb250ZXh0OiBDb250ZXh0LFxyXG4gICAgKSB7XHJcbiAgICAgICAgdGhpcy5fc2VuZGVyID0gbmV3IFdvcmtlclJlcXVlc3RTZW5kZXIoJ2FqYXgnLCB0aGlzLl9jb250ZXh0LnNlbmRlciwgdGhpcy5fY29udGV4dC5yZWNlaXZlcik7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFzeW5jIHNlbmQob3B0aW9uczogSUFqYXhPcHRpb25zKTogUHJvbWlzZTxzdHJpbmc+IHtcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2U8c3RyaW5nPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuX3NlbmRlci5zZW5kKG9wdGlvbnMsIHJlc29sdmUsIHJlamVjdCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL2lmZGVmLWxvYWRlci9pZmRlZi1sb2FkZXIuanM/REVCVUc9dHJ1ZSZQRVJGT1JNQU5DRV9BVURJVD10cnVlIS4vc3JjL3Byb2Nlc3NpbmcvYnVpbGRlcnMvcG9ydC1hamF4LXByb3ZpZGVyLnRzIiwiaW1wb3J0IHsgSVdvcmtlck1lc3NhZ2VSZWNlaXZlciwgSVdvcmtlck1lc3NhZ2VTZW5kZXIgfSBmcm9tICcuLi93b3JrZXJzL3dvcmtlci1kZWZpbml0aW9ucyc7XHJcblxyXG5leHBvcnQgY2xhc3MgQ29udGV4dCB7XHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgc2VuZGVyOiBJV29ya2VyTWVzc2FnZVNlbmRlcixcclxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgcmVjZWl2ZXI6IElXb3JrZXJNZXNzYWdlUmVjZWl2ZXJcclxuICAgICkge31cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvaWZkZWYtbG9hZGVyL2lmZGVmLWxvYWRlci5qcz9ERUJVRz10cnVlJlBFUkZPUk1BTkNFX0FVRElUPXRydWUhLi9zcmMvcHJvY2Vzc2luZy9jb250ZXh0LnRzIiwiaW1wb3J0IHsgSU1lc3NhZ2UgfSBmcm9tICcuLi9kZWZpbml0aW9ucyc7XHJcbmltcG9ydCB7IGlzQXN5bmNBbGwgfSBmcm9tICcuLi9mcmFtZXdvcmsvc3luYyc7XHJcbmltcG9ydCB7IElNZXNzZW5nZXJQZXJmb3JtYW5jZUF1ZGl0b3IsIElNZXNzZW5nZXJTdGF0aXN0aWNBdWRpdG9yIH0gZnJvbSAnLi9hdWRpdC9hdWRpdG9ycy9tZXNzZW5nZXInO1xyXG5pbXBvcnQgeyBFbnZlbG9wIH0gZnJvbSAnLi9lbnZlbG9wJztcclxuaW1wb3J0IHsgSUVudmVsb3BRdWV1ZSB9IGZyb20gJy4vZW52ZWxvcC1xdWV1ZSc7XHJcbmltcG9ydCB7IElQb3N0bWFuIH0gZnJvbSAnLi9wb3N0bWFuJztcclxuaW1wb3J0IHsgSVJvdXRlciB9IGZyb20gJy4vcm91dGVyJztcclxuXHJcbi8qKlxyXG4gKiBAaW50ZXJuYWxcclxuICogQGNsYXNzIE1lc3NlbmdlclxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIE1lc3NlbmdlciB7XHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IF9yb3V0ZXI6IElSb3V0ZXIsXHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBfcG9zdG1hc3RlcjogSVBvc3RtYW4sXHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBfc3RhdGlzdGljQXVkaXRvcjogSU1lc3NlbmdlclN0YXRpc3RpY0F1ZGl0b3IsXHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBfcGVyZm9ybWFuY2VBdWRpdG9yOiBJTWVzc2VuZ2VyUGVyZm9ybWFuY2VBdWRpdG9yLFxyXG4gICAgKSB7IH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNlbmQgYWxsIHVzZXIgbWVzc2FnZXMgdG8gdGhlIGRlc3RpbmF0aW9ucyBxdWV1ZXNcclxuICAgICAqL1xyXG4gICAgcHVibGljIGFzeW5jIHNlbmQobWVzc2FnZXM6IEFycmF5PElNZXNzYWdlPik6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgIGNvbnN0IGF1ZGl0b3IgPSB0aGlzLl9wZXJmb3JtYW5jZUF1ZGl0b3Iuc3RhcnRlZCgpO1xyXG5cclxuICAgICAgICAvLyBHcm91cCBvZiBlbnZlbG9wcyBieSB0aGVpciBkZXN0aW5hdGlvbiBxdWV1ZVxyXG4gICAgICAgIGNvbnN0IGdyb3VwID0gbmV3IE1hcDxJRW52ZWxvcFF1ZXVlLCBBcnJheTxFbnZlbG9wPj4oKTtcclxuXHJcbiAgICAgICAgZm9yIChjb25zdCBtZXNzYWdlIG9mIG1lc3NhZ2VzKSB7XHJcbiAgICAgICAgICAgIC8vIFNlYWwgdGhlIG1lc3NhZ2VcclxuICAgICAgICAgICAgY29uc3QgZW52ZWxvcCA9IHRoaXMuX3Bvc3RtYXN0ZXIuc2VhbChtZXNzYWdlKTtcclxuXHJcbiAgICAgICAgICAgIC8vIEZpbmQgcXVldWUgZm9yIHRoZSBlbnZlbG9wXHJcbiAgICAgICAgICAgIGNvbnN0IHF1ZXVlID0gdGhpcy5fcm91dGVyLnJvdXRlKGVudmVsb3ApO1xyXG5cclxuICAgICAgICAgICAgaWYgKHF1ZXVlKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBQdXQgZW52ZWxvcCB0byBpdHMgcXVldWUgZ3JvdXBcclxuICAgICAgICAgICAgICAgIGxldCBlbnZlbG9wcyA9IGdyb3VwLmdldChxdWV1ZSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoZW52ZWxvcHMpIHtcclxuICAgICAgICAgICAgICAgICAgICBlbnZlbG9wcy5wdXNoKGVudmVsb3ApO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBlbnZlbG9wcyA9IFsgZW52ZWxvcCBdO1xyXG4gICAgICAgICAgICAgICAgICAgIGdyb3VwLnNldChxdWV1ZSwgZW52ZWxvcHMpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBlbnF1aW5ncyA9IG5ldyBBcnJheTxBcnJheTxQcm9taXNlPHZvaWQ+IHwgdm9pZD4+KCk7XHJcblxyXG4gICAgICAgIGZvciAoY29uc3QgcXVldWUgb2YgZ3JvdXAua2V5cygpKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGVudmVsb3BzID0gZ3JvdXAuZ2V0KHF1ZXVlKTtcclxuICAgICAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXHJcbiAgICAgICAgICAgIGlmIChlbnZlbG9wcykge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZW5xdWl1aW5nID0gcXVldWUuZW5xdWV1ZShlbnZlbG9wcyk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBzdGF0aXN0aW5nID0gdGhpcy5fc3RhdGlzdGljQXVkaXRvci5lbnF1ZXVlZChxdWV1ZS5pZCwgZW52ZWxvcHMpO1xyXG5cclxuICAgICAgICAgICAgICAgIGVucXVpbmdzLnB1c2goW2VucXVpdWluZywgc3RhdGlzdGluZ10pO1xyXG5cclxuICAgICAgICAgICAgICAgIGF1ZGl0b3IuZW5xdWV1ZWQocXVldWUuaWQsIGVudmVsb3BzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gQXdhaXQgYWxsIG9wZXJhdGlvbnMgb25seSBpZiB0aGV5IGFyZSBhc3luY2hyb25vdXNcclxuICAgICAgICBmb3IgKGNvbnN0IHByb21pc2VzIG9mIGVucXVpbmdzKSB7XHJcbiAgICAgICAgICAgIGlmIChpc0FzeW5jQWxsKHByb21pc2VzKSkge1xyXG4gICAgICAgICAgICAgICAgYXdhaXQgUHJvbWlzZS5hbGwoZW5xdWluZ3MpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBhdWRpdG9yLmNvbXBsZXRlZCgpO1xyXG4gICAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy9pZmRlZi1sb2FkZXIvaWZkZWYtbG9hZGVyLmpzP0RFQlVHPXRydWUmUEVSRk9STUFOQ0VfQVVESVQ9dHJ1ZSEuL3NyYy9wcm9jZXNzaW5nL21lc3Nlbmdlci50cyIsImV4cG9ydCBmdW5jdGlvbiBzeW5jPFQ+KHJlc3VsdDogUHJvbWlzZTxUPiB8IFQpOiBUIHwgdW5kZWZpbmVkIHtcclxuICAgIGlmIChyZXN1bHQgaW5zdGFuY2VvZiBQcm9taXNlKSB7XHJcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgIH1cclxuICAgIHJldHVybiByZXN1bHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBpc0FzeW5jQWxsKHJlc3VsdHM6IEFycmF5PFByb21pc2U8dm9pZD4gfCB2b2lkPik6IGJvb2xlYW4ge1xyXG4gICAgZm9yIChjb25zdCByZXN1bHQgb2YgcmVzdWx0cykge1xyXG4gICAgICAgIGlmIChyZXN1bHQgaW5zdGFuY2VvZiBQcm9taXNlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBmYWxzZTtcclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvaWZkZWYtbG9hZGVyL2lmZGVmLWxvYWRlci5qcz9ERUJVRz10cnVlJlBFUkZPUk1BTkNFX0FVRElUPXRydWUhLi9zcmMvZnJhbWV3b3JrL3N5bmMudHMiLCJpbXBvcnQgeyBJTWVzc2FnZUNvbmZpZ3VyYXRpb24sIElNZXNzYWdlc0NvbmZpZ3VyYXRpb24gfSBmcm9tICcuLi9jb25maWd1cmF0aW9ucy9tZXNzYWdlcy1jb25maWd1cmF0aW9uJztcclxuaW1wb3J0IHsgSUVudmVsb3AgfSBmcm9tICcuL2VudmVsb3AnO1xyXG5pbXBvcnQgeyBJRW52ZWxvcFF1ZXVlIH0gZnJvbSAnLi9lbnZlbG9wLXF1ZXVlJztcclxuXHJcbi8qKlxyXG4gKiBSb3V0ZXIgc2hvdWxkIHNlbGVjdCBxdWV1ZSBmb3IgZW52ZWxvcFxyXG4gKlxyXG4gKiBAaW50ZXJuYWxcclxuICogQGludGVyZmFjZSBJUm91dGVyXHJcbiAqL1xyXG5leHBvcnQgaW50ZXJmYWNlIElSb3V0ZXIge1xyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm4gcXVldWUgZm9yIHRoZSBlbnZlbG9wLlxyXG4gICAgICogSWYgcXVldWUgaXMgbm90IGZvdW5kIC0gcmV0dXJuIGRlZmF1bHQgb3IgYW55IG90aGVyIHF1ZXVlXHJcbiAgICAgKi9cclxuICAgIHJvdXRlKGVudmVsb3A6IElFbnZlbG9wKTogSUVudmVsb3BRdWV1ZSB8IHVuZGVmaW5lZDtcclxufVxyXG5cclxuLyoqXHJcbiAqIFJlYWwgaW1wZWxlbWVudGF0aW9uIG9mIElSb3V0ZXJcclxuICpcclxuICogQGludGVybmFsXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgUm91dGVyIGltcGxlbWVudHMgSVJvdXRlciB7XHJcbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IGRlZmF1bHQ6IHN0cmluZyA9ICdkZWZhdWx0JztcclxuXHJcbiAgICAvKipcclxuICAgICAqIERpY3Rpb25hcnkgb2YgbWVzc2FnZSBjb25maWd1cmF0aW9ucyBieSBtZXNzYWdlIHR5cGVcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfcm91dGVzOiBNYXA8c3RyaW5nLCBBcnJheTxJTWVzc2FnZUNvbmZpZ3VyYXRpb24+PjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBjb25maWd1cmF0aW9uOiBJTWVzc2FnZXNDb25maWd1cmF0aW9uLFxyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgX3F1ZXVlczogTWFwPHN0cmluZywgSUVudmVsb3BRdWV1ZT5cclxuICAgICkge1xyXG4gICAgICAgIHRoaXMuX3JvdXRlcyA9IE1lc3NhZ2VDb25maWd1cmF0aW9ucy5jcmVhdGVSb3V0ZXMoY29uZmlndXJhdGlvbik7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJvdXRlKGVudmVsb3A6IElFbnZlbG9wKTogSUVudmVsb3BRdWV1ZSB8IHVuZGVmaW5lZCB7XHJcbiAgICAgICAgY29uc3QgcXVldWVJZCA9IHRoaXMuZmluZFF1ZXVlKGVudmVsb3ApIHx8IFJvdXRlci5kZWZhdWx0O1xyXG5cclxuICAgICAgICBsZXQgcXVldWUgPSB0aGlzLl9xdWV1ZXMuZ2V0KHF1ZXVlSWQpO1xyXG5cclxuICAgICAgICBpZiAoIXF1ZXVlICYmIHRoaXMuX3F1ZXVlcy5zaXplID4gMCkge1xyXG4gICAgICAgICAgICBxdWV1ZSA9IHRoaXMuX3F1ZXVlcy52YWx1ZXMoKS5uZXh0KCkudmFsdWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gcXVldWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBmaW5kUXVldWUoZW52ZWxvcDogSUVudmVsb3ApOiBzdHJpbmcgfCBudWxsIHtcclxuICAgICAgICBjb25zdCBjb25maWdzID0gdGhpcy5fcm91dGVzLmdldChlbnZlbG9wLnR5cGUpO1xyXG5cclxuICAgICAgICBpZiAoIWNvbmZpZ3MgfHwgIWNvbmZpZ3MubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZm9yIChjb25zdCBjb25maWcgb2YgY29uZmlncykge1xyXG4gICAgICAgICAgICBpZiAoIWNvbmZpZy5wcm9wZXJ0aWVzKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gY29uZmlnLnF1ZXVlO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNNYXRjaChlbnZlbG9wLm1lc3NhZ2UsIGNvbmZpZy5wcm9wZXJ0aWVzKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBjb25maWcucXVldWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaXNNYXRjaChtZXNzYWdlOiBhbnksIHByb3BlcnRpZXM6IGFueSwgZGVlcDogbnVtYmVyID0gMTApOiBib29sZWFuIHtcclxuICAgICAgICBpZiAoZGVlcCA9PT0gMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZvciAoY29uc3QgbmFtZSBpbiBwcm9wZXJ0aWVzKSB7XHJcbiAgICAgICAgICAgIGlmIChwcm9wZXJ0aWVzLmhhc093blByb3BlcnR5KG5hbWUpKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBtZXNzYWdlVmFsdWUgPSBtZXNzYWdlW25hbWVdO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgY29uZmlnVmFsdWUgPSBwcm9wZXJ0aWVzW25hbWVdO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgKG1lc3NhZ2VWYWx1ZSkgPT09ICdvYmplY3QnICYmIHR5cGVvZiAoY29uZmlnVmFsdWUpID09PSAnb2JqZWN0Jykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5pc01hdGNoKG1lc3NhZ2VWYWx1ZSwgY29uZmlnVmFsdWUsIGRlZXAgLSAxKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChtZXNzYWdlW25hbWVdICE9PSBwcm9wZXJ0aWVzW25hbWVdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBNZXNzYWdlQ29uZmlndXJhdGlvbnMge1xyXG4gICAgcHVibGljIHN0YXRpYyBjcmVhdGVSb3V0ZXMoY29uZmlndXJhdGlvbjogSU1lc3NhZ2VzQ29uZmlndXJhdGlvbik6IE1hcDxzdHJpbmcsIEFycmF5PElNZXNzYWdlQ29uZmlndXJhdGlvbj4+IHtcclxuICAgICAgICBjb25zdCByb3V0ZXMgPSBuZXcgTWFwPHN0cmluZywgQXJyYXk8SU1lc3NhZ2VDb25maWd1cmF0aW9uPj4oKTtcclxuXHJcbiAgICAgICAgZm9yIChjb25zdCBtZXNzYWdlIG9mIGNvbmZpZ3VyYXRpb24ubWVzc2FnZXMpIHtcclxuICAgICAgICAgICAgbGV0IG1lc3NhZ2VzID0gcm91dGVzLmdldChtZXNzYWdlLnR5cGUpO1xyXG4gICAgICAgICAgICBpZiAobWVzc2FnZXMpIHtcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2VzLnB1c2gobWVzc2FnZSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlcyA9IFttZXNzYWdlXTtcclxuICAgICAgICAgICAgICAgIHJvdXRlcy5zZXQobWVzc2FnZS50eXBlLCBtZXNzYWdlcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IG5ldyBNYXA8c3RyaW5nLCBBcnJheTxJTWVzc2FnZUNvbmZpZ3VyYXRpb24+PigpO1xyXG4gICAgICAgIHJvdXRlcy5mb3JFYWNoKChtZXNzYWdlcywgdHlwZSkgPT4ge1xyXG4gICAgICAgICAgICBtZXNzYWdlcyA9IG1lc3NhZ2VzLnNvcnQoKGEsIGIpID0+IE1lc3NhZ2VDb25maWd1cmF0aW9ucy53ZWlnaHQoYi5wcm9wZXJ0aWVzKSAtIE1lc3NhZ2VDb25maWd1cmF0aW9ucy53ZWlnaHQoYS5wcm9wZXJ0aWVzKSk7XHJcbiAgICAgICAgICAgIHJlc3VsdC5zZXQodHlwZSwgbWVzc2FnZXMpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIHdlaWdodChwcm9wZXJ0aWVzOiBhbnksIGRlZXA6IG51bWJlciA9IDEwKTogbnVtYmVyIHtcclxuICAgICAgICBpZiAoIXByb3BlcnRpZXMgfHwgZGVlcCA8PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGNvdW50ID0gMDtcclxuICAgICAgICBmb3IgKGNvbnN0IG5hbWUgaW4gcHJvcGVydGllcykge1xyXG4gICAgICAgICAgICBpZiAocHJvcGVydGllcy5oYXNPd25Qcm9wZXJ0eShuYW1lKSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdmFsdWUgPSBwcm9wZXJ0aWVzW25hbWVdO1xyXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb3VudCArPSB0aGlzLndlaWdodCh2YWx1ZSwgZGVlcCAtIDEpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBjb3VudCsrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBjb3VudDtcclxuICAgIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvaWZkZWYtbG9hZGVyL2lmZGVmLWxvYWRlci5qcz9ERUJVRz10cnVlJlBFUkZPUk1BTkNFX0FVRElUPXRydWUhLi9zcmMvcHJvY2Vzc2luZy9yb3V0ZXIudHMiLCJcclxuaW1wb3J0IHsgSUVudmVsb3AgfSBmcm9tICcuLi8uLi9lbnZlbG9wJztcclxuaW1wb3J0IHsgSUF1ZGl0U2VuZGVyIH0gZnJvbSAnLi4vc2VuZGVycy9hdWRpdC1zZW5kZXInO1xyXG5pbXBvcnQgeyBJTWVzc2FnZXNQZXJmb3JtYW5jZUF1ZGl0b3IsIElNZXNzZW5nZXJQZXJmb3JtYW5jZUF1ZGl0b3IgfSBmcm9tICcuL21lc3Nlbmdlcic7XHJcblxyXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbmltcG9ydCB7IElFbnZlbG9wQXVkaXQsIElFbnZlbG9wc0F1ZGl0IH0gZnJvbSAnLi4vZGVmaW5pdGlvbnMnO1xyXG5pbXBvcnQgeyBNZXNzYWdlc1JlcG9ydGVyIH0gZnJvbSAnLi4vcmVwb3J0ZXJzL21lc3NhZ2VzLXJlcG9ydGVyJztcclxuaW1wb3J0IHsgUGVyZnN0YW1wIH0gZnJvbSAnLi9wZXJmc3RhbXAnO1xyXG4vLy8vLy8vLy8vXHJcblxyXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgTWVzc2VuZ2VyUGVyZm9ybWFuY2VBdWRpdG9yQnVpbGRlciB7XHJcbiAgICBwdWJsaWMgc3RhdGljIGNyZWF0ZShyZWFsOiBib29sZWFuLCBzZW5kZXI/OiBJQXVkaXRTZW5kZXIpOiBJTWVzc2VuZ2VyUGVyZm9ybWFuY2VBdWRpdG9yIHtcclxuICAgICAgICByZXR1cm4gbmV3IE1lc3NlbmdlclBlcmZvcm1hbmNlQXVkaXRvcihyZWFsID8gc2VuZGVyIDogdW5kZWZpbmVkKTtcclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgTWVzc2VuZ2VyUGVyZm9ybWFuY2VBdWRpdG9yIGltcGxlbWVudHMgSU1lc3NlbmdlclBlcmZvcm1hbmNlQXVkaXRvciB7XHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IF9zZW5kZXI/OiBJQXVkaXRTZW5kZXJcclxuICAgICkgeyB9XHJcblxyXG4gICAgcHVibGljIHN0YXJ0ZWQoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX3NlbmRlcikge1xyXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgUGVyZm9ybWFuY2VNZXNzYWdlc0F1ZGl0b3IodGhpcy5fc2VuZGVyKTtcclxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIG5ldyBEdW1teU1lc3NhZ2VzUGVyZm9ybWFuY2VBdWRpdG9yKCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIER1bW15TWVzc2FnZXNQZXJmb3JtYW5jZUF1ZGl0b3IgaW1wbGVtZW50cyBJTWVzc2FnZXNQZXJmb3JtYW5jZUF1ZGl0b3Ige1xyXG4gICAgcHVibGljIGVucXVldWVkKHF1ZXVlSWQ6IHN0cmluZywgZW52ZWxvcHM6IEFycmF5PElFbnZlbG9wPikgeyAvKiovIH1cclxuXHJcbiAgICBwdWJsaWMgY29tcGxldGVkKCk6IHZvaWQgeyAvKiovIH1cclxufVxyXG5cclxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4vKipcclxuICogUGVyZm9ybWFuY2UgbWVzc2FnZSBhdWRpdG9yIGZvciBjb2xsZWN0aW9uIHRpbWluZ3MgaW5mb3JtYXRpb24gZnJvbSBlbnF1ZXVlIG1lc3NhZ2UgcHJvY2Nlc3NcclxuICovXHJcbmNsYXNzIFBlcmZvcm1hbmNlTWVzc2FnZXNBdWRpdG9yIGltcGxlbWVudHMgSU1lc3NhZ2VzUGVyZm9ybWFuY2VBdWRpdG9yIHtcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgX2F1ZGl0czogSUVudmVsb3BzQXVkaXQgPSB7XHJcbiAgICAgICAgZ3JvdXBzOiBuZXcgQXJyYXk8QXJyYXk8SUVudmVsb3BBdWRpdD4+KCksXHJcbiAgICAgICAgd29ya2VyU3RhcnRlZEF0OiB1bmRlZmluZWQsXHJcbiAgICAgICAgZW5xdWV1ZWRBdDogdW5kZWZpbmVkXHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgX3NlbmRlcjogSUF1ZGl0U2VuZGVyXHJcbiAgICApIHtcclxuICAgICAgICB0aGlzLl9hdWRpdHMud29ya2VyU3RhcnRlZEF0ID0gbmV3IFBlcmZzdGFtcCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBlbnF1ZXVlZChxdWV1ZUlkOiBzdHJpbmcsIGVudmVsb3BzOiBBcnJheTxJRW52ZWxvcD4pIHtcclxuICAgICAgICB0aGlzLl9hdWRpdHMuZ3JvdXBzLnB1c2goZW52ZWxvcHMpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjb21wbGV0ZWQoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fYXVkaXRzLmVucXVldWVkQXQgPSBuZXcgUGVyZnN0YW1wKCk7XHJcblxyXG4gICAgICAgIGNvbnN0IHJlcG9ydCA9IG5ldyBNZXNzYWdlc1JlcG9ydGVyKHRoaXMuX2F1ZGl0cykucmVwb3J0KCk7XHJcblxyXG4gICAgICAgIHRoaXMuX3NlbmRlci5tZXNzYWdlcyhyZXBvcnQpO1xyXG4gICAgfVxyXG59XHJcbi8vLy8vLy8vLy9cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL2lmZGVmLWxvYWRlci9pZmRlZi1sb2FkZXIuanM/REVCVUc9dHJ1ZSZQRVJGT1JNQU5DRV9BVURJVD10cnVlIS4vc3JjL3Byb2Nlc3NpbmcvYXVkaXQvYXVkaXRvcnMvbWVzc2VuZ2VyLXBlcmZvcm1hbmNlLWF1ZGl0b3IudHMiLCJpbXBvcnQgeyBJRW52ZWxvcHNBdWRpdCwgSU1lc3NhZ2VzUGVyZm9ybWFuY2VSZXBvcnQgfSBmcm9tICcuLi9kZWZpbml0aW9ucyc7XHJcbmltcG9ydCB7IGRpc3RvcmJ0aW9uLCBkdXJhdGlvbiB9IGZyb20gJy4vY2FsYy1tZXRob2RzJztcclxuXHJcbmV4cG9ydCBjbGFzcyBNZXNzYWdlc1JlcG9ydGVyIHtcclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgX2F1ZGl0czogSUVudmVsb3BzQXVkaXQsXHJcbiAgICApIHt9XHJcblxyXG4gICAgcHVibGljIHJlcG9ydCgpOiBJTWVzc2FnZXNQZXJmb3JtYW5jZVJlcG9ydCB7XHJcbiAgICAgICAgY29uc3QgYXVkaXRzID0gdGhpcy5fYXVkaXRzO1xyXG5cclxuICAgICAgICBpZiAoIWF1ZGl0cy5lbnF1ZXVlZEF0IHx8ICFhdWRpdHMud29ya2VyU3RhcnRlZEF0KSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTWVzc2FnZXNSZXBvcnRlciBjYW5ub3QgZ2VuZXJhdGUgcmVwb3J0LiBEYXRhIGlzIG5vdCBjb21wbGV0ZS4nKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IGNyZWF0ZXMgPSBuZXcgQXJyYXk8bnVtYmVyPigpO1xyXG4gICAgICAgIGNvbnN0IGVucXVldWVkQXQgPSBhdWRpdHMuZW5xdWV1ZWRBdDtcclxuICAgICAgICBjb25zdCB3b3JrZXJTdGFydGVkQXQgPSBhdWRpdHMud29ya2VyU3RhcnRlZEF0O1xyXG5cclxuICAgICAgICBmb3IgKGNvbnN0IGdyb3VwIG9mIGF1ZGl0cy5ncm91cHMpIHtcclxuICAgICAgICAgICAgZm9yIChjb25zdCBhdWRpdCBvZiBncm91cCkge1xyXG4gICAgICAgICAgICAgICAgY3JlYXRlcy5wdXNoKGF1ZGl0LnRpbWVzdGFtcCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IGVucXVldWUgPSB7XHJcbiAgICAgICAgICAgIGNsb2NrdGltZTogZGlzdG9yYnRpb24oY3JlYXRlcywgKHRpbWVzdGFtcCkgPT4gZW5xdWV1ZWRBdC5jbG9ja3RpbWUgLSB0aW1lc3RhbXApLFxyXG4gICAgICAgICAgICBjcHU6IHVuZGVmaW5lZFxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGNvdW50OiBjcmVhdGVzLmxlbmd0aCxcclxuXHJcbiAgICAgICAgICAgIGVucXVldWUsXHJcblxyXG4gICAgICAgICAgICB3b3JrZXJFbnF1ZXVlOiBkdXJhdGlvbih3b3JrZXJTdGFydGVkQXQsIGF1ZGl0cy5lbnF1ZXVlZEF0KVxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL2lmZGVmLWxvYWRlci9pZmRlZi1sb2FkZXIuanM/REVCVUc9dHJ1ZSZQRVJGT1JNQU5DRV9BVURJVD10cnVlIS4vc3JjL3Byb2Nlc3NpbmcvYXVkaXQvcmVwb3J0ZXJzL21lc3NhZ2VzLXJlcG9ydGVyLnRzIiwiXHJcbmltcG9ydCB7IElFbnZlbG9wIH0gZnJvbSAnLi4vLi4vZW52ZWxvcCc7XHJcbmltcG9ydCB7IElQaXBlU3RhdHNTdG9yYWdlIH0gZnJvbSAnLi4vc3RhdHMvc3RvcmFnZXMvcGlwZS1zdGF0cy5zdG9yYWdlJztcclxuaW1wb3J0IHsgSU1lc3NlbmdlclN0YXRpc3RpY0F1ZGl0b3IgfSBmcm9tICcuL21lc3Nlbmdlcic7XHJcblxyXG5leHBvcnQgY2xhc3MgTWVzc2VuZ2VyU3RhdGlzdGljQXVkaXRvciBpbXBsZW1lbnRzIElNZXNzZW5nZXJTdGF0aXN0aWNBdWRpdG9yIHtcclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgX3BpcGVTdG9yYWdlczogSVBpcGVTdGF0c1N0b3JhZ2VcclxuICAgICkgeyB9XHJcblxyXG4gICAgcHVibGljIGVucXVldWVkKHF1ZXVlSWQ6IHN0cmluZywgZW52ZWxvcHM6IEFycmF5PElFbnZlbG9wPikge1xyXG4gICAgICAgIGNvbnN0IGxlbmd0aCA9IGVudmVsb3BzLmxlbmd0aDtcclxuICAgICAgICByZXR1cm4gdGhpcy5fcGlwZVN0b3JhZ2VzLnVwZGF0ZShxdWV1ZUlkLCAoc3RhdHMpID0+IHtcclxuICAgICAgICAgICAgc3RhdHMudG90YWxNZXNzYWdlQ291bnQgKz0gbGVuZ3RoO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy9pZmRlZi1sb2FkZXIvaWZkZWYtbG9hZGVyLmpzP0RFQlVHPXRydWUmUEVSRk9STUFOQ0VfQVVESVQ9dHJ1ZSEuL3NyYy9wcm9jZXNzaW5nL2F1ZGl0L2F1ZGl0b3JzL21lc3Nlbmdlci1zdGF0aXN0aWMtYXVkaXRvci50cyIsImltcG9ydCB7IElFbnZlbG9wUXVldWUgfSBmcm9tICcuLi8uLi9lbnZlbG9wLXF1ZXVlJztcclxuaW1wb3J0IHsgSVBpcGVTdGF0ZSwgSVBpcGVTdGF0cywgSVBpcGVTdGF0c1Byb3ZpZGVyLCBJUGlwZVN0YXRzUmVwb3NpdG9yeSB9IGZyb20gJy4vcGlwZS1zdGF0cyc7XHJcbmltcG9ydCB7IElQaXBlU3RhdHNTdG9yYWdlIH0gZnJvbSAnLi9zdG9yYWdlcy9waXBlLXN0YXRzLnN0b3JhZ2UnO1xyXG5cclxuZXhwb3J0IGNsYXNzIFBpcGVTdGF0c1Byb3ZpZGVyIGltcGxlbWVudHMgSVBpcGVTdGF0c1Byb3ZpZGVyIHtcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgX2RpY3Rpb25hcnk6IElQaXBlU3RhdHNSZXBvc2l0b3J5RGljdGlvbmFyeSA9IHt9O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgX3BpcGVTdGF0c1N0b3JhZ2U6IElQaXBlU3RhdHNTdG9yYWdlXHJcbiAgICApIHsgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQocXVldWU6IElFbnZlbG9wUXVldWUpOiBJUGlwZVN0YXRzUmVwb3NpdG9yeSB7XHJcbiAgICAgICAgY29uc3QgZGljdGlvbmFyeSA9IHRoaXMuX2RpY3Rpb25hcnk7XHJcblxyXG4gICAgICAgIHJldHVybiBkaWN0aW9uYXJ5W3F1ZXVlLmlkXSB8fCAoZGljdGlvbmFyeVtxdWV1ZS5pZF0gPSB0aGlzLmNyZWF0ZShxdWV1ZSkpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY3JlYXRlKHF1ZXVlOiBJRW52ZWxvcFF1ZXVlKSB7XHJcbiAgICAgICAgY29uc3Qgc3RhdGUgPSB7XHJcbiAgICAgICAgICAgIGdldCBxdWV1ZU1lc3NhZ2VDb3VudCgpIHsgcmV0dXJuIHF1ZXVlLmNvdW50OyB9LFxyXG4gICAgICAgICAgICBnZXQgcXVldWVTaXplKCkgeyByZXR1cm4gcXVldWUuc2l6ZTsgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHJldHVybiBuZXcgUGlwZVN0YXRzUmVwb3NpdG9yeShxdWV1ZS5pZCwgc3RhdGUsIHRoaXMuX3BpcGVTdGF0c1N0b3JhZ2UpO1xyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBQaXBlU3RhdHNSZXBvc2l0b3J5IGltcGxlbWVudHMgSVBpcGVTdGF0c1JlcG9zaXRvcnkge1xyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBfcXVldWVJZDogc3RyaW5nLFxyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgX3N0YXRlOiBJUGlwZVN0YXRlLFxyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgX3BpcGVTdGF0c1N0b3JhZ2U6IElQaXBlU3RhdHNTdG9yYWdlXHJcbiAgICApIHsgfVxyXG5cclxuICAgIHB1YmxpYyBhc3luYyB1cGRhdGU8VD4oYWN0aW9uOiAoc3RhdHM6IElQaXBlU3RhdHMpID0+IFQpOiBQcm9taXNlPFQ+IHtcclxuICAgICAgICBjb25zdCBzdGF0ZSA9IHRoaXMuX3N0YXRlO1xyXG5cclxuICAgICAgICBsZXQgcmVzdWx0OiBUIHwgdW5kZWZpbmVkO1xyXG5cclxuICAgICAgICBhd2FpdCB0aGlzLl9waXBlU3RhdHNTdG9yYWdlLnVwZGF0ZSh0aGlzLl9xdWV1ZUlkLCAoc3RhdGlzdGljKSA9PiB7XHJcbiAgICAgICAgICAgIHJlc3VsdCA9IGFjdGlvbih7XHJcbiAgICAgICAgICAgICAgICBzdGF0aXN0aWMsXHJcbiAgICAgICAgICAgICAgICBzdGF0ZVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdCBhcyBhbnk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFzeW5jIHJlYWQoKTogUHJvbWlzZTxJUGlwZVN0YXRzPiB7XHJcbiAgICAgICAgY29uc3Qgc3RhdGUgPSB0aGlzLl9zdGF0ZTtcclxuXHJcbiAgICAgICAgY29uc3Qgc3RhdGlzdGljID0gYXdhaXQgdGhpcy5fcGlwZVN0YXRzU3RvcmFnZS5yZWFkKHRoaXMuX3F1ZXVlSWQpO1xyXG5cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBzdGF0aXN0aWMsXHJcbiAgICAgICAgICAgIHN0YXRlXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxufVxyXG5cclxuaW50ZXJmYWNlIElQaXBlU3RhdHNSZXBvc2l0b3J5RGljdGlvbmFyeSB7XHJcbiAgICBbcXVldWVJZDogc3RyaW5nXTogUGlwZVN0YXRzUmVwb3NpdG9yeTtcclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvaWZkZWYtbG9hZGVyL2lmZGVmLWxvYWRlci5qcz9ERUJVRz10cnVlJlBFUkZPUk1BTkNFX0FVRElUPXRydWUhLi9zcmMvcHJvY2Vzc2luZy9hdWRpdC9zdGF0cy9waXBlLXN0YXRzLXByb3ZpZGVyLnRzIiwiaW1wb3J0IHsgR3VpZFByb3ZpZGVyIH0gZnJvbSAnLi4vLi4vLi4vLi4vZnJhbWV3b3JrL2d1aWQnO1xyXG5pbXBvcnQgeyBJbmRleGVkRGJVdGlscyB9IGZyb20gJy4uLy4uLy4uLy4uL2ZyYW1ld29yay9pbmRleGVkZGItdXRpbHMnO1xyXG5pbXBvcnQgeyBJUGlwZVBlcnNpc3RlbnRTdGF0cyB9IGZyb20gJy4uL3BpcGUtc3RhdHMnO1xyXG5pbXBvcnQgeyBJUGlwZVN0YXRzU3RvcmFnZSB9IGZyb20gJy4vcGlwZS1zdGF0cy5zdG9yYWdlJztcclxuXHJcbmV4cG9ydCBjbGFzcyBQaXBlU3RhdHNJbmRleGVkREJTdG9yYWdlIGltcGxlbWVudHMgSVBpcGVTdGF0c1N0b3JhZ2Uge1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgZ3VpZCA9IEd1aWRQcm92aWRlci5kZWZhdWx0O1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgYXN5bmMgY3JlYXRlKG5hbWU6IHN0cmluZyA9ICdtY2pzLWNvdW50ZXJzJyk6IFByb21pc2U8UGlwZVN0YXRzSW5kZXhlZERCU3RvcmFnZT4ge1xyXG4gICAgICAgIGNvbnN0IGRhdGFiYXNlID0gYXdhaXQgSW5kZXhlZERiVXRpbHMub3BlbihuYW1lLCAxLCAoZGIpID0+IHtcclxuICAgICAgICAgICAgaWYgKCFkYi5vYmplY3RTdG9yZU5hbWVzLmNvbnRhaW5zKFBpcGVTdGF0c0luZGV4ZWREQlN0b3JhZ2UuUGlwZVN0YXRpc3RpY3NTdG9yYWdlKSkge1xyXG4gICAgICAgICAgICAgICAgZGIuY3JlYXRlT2JqZWN0U3RvcmUoUGlwZVN0YXRzSW5kZXhlZERCU3RvcmFnZS5QaXBlU3RhdGlzdGljc1N0b3JhZ2UsIHsga2V5UGF0aDogJ3F1ZXVlSWQnLCBhdXRvSW5jcmVtZW50OiBmYWxzZSB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoIWRiLm9iamVjdFN0b3JlTmFtZXMuY29udGFpbnMoUGlwZVN0YXRzSW5kZXhlZERCU3RvcmFnZS5DbGllbnRTdG9yYWdlKSkge1xyXG4gICAgICAgICAgICAgICAgZGIuY3JlYXRlT2JqZWN0U3RvcmUoUGlwZVN0YXRzSW5kZXhlZERCU3RvcmFnZS5DbGllbnRTdG9yYWdlLCB7IGtleVBhdGg6ICdpZCcsIGF1dG9JbmNyZW1lbnQ6IGZhbHNlIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGNvbnN0IGNsaWVudElkID0gYXdhaXQgUGlwZVN0YXRzSW5kZXhlZERCU3RvcmFnZS5jbGllbnRJZChkYXRhYmFzZSk7XHJcblxyXG4gICAgICAgIHJldHVybiBuZXcgUGlwZVN0YXRzSW5kZXhlZERCU3RvcmFnZShkYXRhYmFzZSwgY2xpZW50SWQpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgYXN5bmMgY2xpZW50SWQoZGF0YWJhc2U6IElEQkRhdGFiYXNlKTogUHJvbWlzZTxzdHJpbmc+IHtcclxuICAgICAgICBjb25zdCBjbGllbnRTdG9yYWdlID0gZGF0YWJhc2UudHJhbnNhY3Rpb24oW1BpcGVTdGF0c0luZGV4ZWREQlN0b3JhZ2UuQ2xpZW50U3RvcmFnZV0sICdyZWFkd3JpdGUnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5vYmplY3RTdG9yZShQaXBlU3RhdHNJbmRleGVkREJTdG9yYWdlLkNsaWVudFN0b3JhZ2UpO1xyXG5cclxuICAgICAgICBjb25zdCBkYXRhID0gYXdhaXQgSW5kZXhlZERiVXRpbHMudHJhbnNhY3Rpb24oKCkgPT4gY2xpZW50U3RvcmFnZSwgKHN0b3JhZ2UsIHJlc3VsdCkgPT4ge1xyXG4gICAgICAgICAgICBJbmRleGVkRGJVdGlscy5yZXF1ZXN0PElDbGllbnREYXRhPihzdG9yYWdlLmdldCgnZGVmYXVsdCcpLCAoY2xpZW50KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWNsaWVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNsaWVudCA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6ICdkZWZhdWx0JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2xpZW50SWQ6IFBpcGVTdGF0c0luZGV4ZWREQlN0b3JhZ2UuZ3VpZC5uZXh0KClcclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgIHN0b3JhZ2UuYWRkKGNsaWVudCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXN1bHQuY2xpZW50SWQgPSBjbGllbnQuY2xpZW50SWQ7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sIHsgY2xpZW50SWQ6ICcnIGFzIHN0cmluZyB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGRhdGEuY2xpZW50SWQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgUGlwZVN0YXRpc3RpY3NTdG9yYWdlID0gJ3BpcGUtc3RhdGlzdGljcyc7XHJcbiAgICBwcml2YXRlIHN0YXRpYyBDbGllbnRTdG9yYWdlID0gJ2NsaWVudCc7XHJcblxyXG4gICAgcHJpdmF0ZSBfcmVjb3Zlcnk6IHsgW3F1ZXVlSWQ6IHN0cmluZ106IElQaXBlUGVyc2lzdGVudFN0YXRzIHwgdW5kZWZpbmVkIH0gPSB7IH07XHJcblxyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBfZGI6IElEQkRhdGFiYXNlLFxyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgX2NsaWVudElkOiBzdHJpbmdcclxuICAgICkgeyB9XHJcblxyXG4gICAgcHVibGljIGFzeW5jIHVwZGF0ZShxdWV1ZUlkOiBzdHJpbmcsIGFjdGlvbjogKHN0YXRzOiBJUGlwZVBlcnNpc3RlbnRTdGF0cykgPT4gdm9pZCk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgIGxldCByZWNvdmVyeTogSVBpcGVQZXJzaXN0ZW50U3RhdHMgfCB1bmRlZmluZWQ7XHJcblxyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGF3YWl0IHRoaXMudHJhbnNhY3Rpb24oKHN0b3JhZ2UsIHJlc3VsdCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgSW5kZXhlZERiVXRpbHMucmVxdWVzdDxJUGlwZVBlcnNpc3RlbnRTdGF0cz4oc3RvcmFnZS5nZXQocXVldWVJZCksIChzdGF0cykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHN0YXRzID0gcmVjb3ZlcnkgPSAodGhpcy5fcmVjb3ZlcnlbcXVldWVJZF0gfHwgc3RhdHMgfHwgdGhpcy5uZXdEYXRhKHF1ZXVlSWQpKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgYWN0aW9uKHN0YXRzKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgc3RvcmFnZS5wdXQoc3RhdHMpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0sIHVuZGVmaW5lZCwgJ3JlYWR3cml0ZScpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5fcmVjb3ZlcnlbcXVldWVJZF0gPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgfSBjYXRjaCB7XHJcbiAgICAgICAgICAgIGlmICghcmVjb3ZlcnkpIHtcclxuICAgICAgICAgICAgICAgIHJlY292ZXJ5ID0gdGhpcy5uZXdEYXRhKHF1ZXVlSWQpO1xyXG5cclxuICAgICAgICAgICAgICAgIGFjdGlvbihyZWNvdmVyeSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5fcmVjb3ZlcnlbcXVldWVJZF0gPSByZWNvdmVyeTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFzeW5jIHJlYWQocXVldWVJZDogc3RyaW5nKTogUHJvbWlzZTxJUGlwZVBlcnNpc3RlbnRTdGF0cz4ge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGQgPSBhd2FpdCB0aGlzLnRyYW5zYWN0aW9uKChzdG9yYWdlLCByZXN1bHQpID0+IHtcclxuICAgICAgICAgICAgICAgIEluZGV4ZWREYlV0aWxzLnJlcXVlc3Q8SVBpcGVQZXJzaXN0ZW50U3RhdHM+KHN0b3JhZ2UuZ2V0KHF1ZXVlSWQpLCAoc3RhdHMpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHQuc3RhdHMgPSB0aGlzLl9yZWNvdmVyeVtxdWV1ZUlkXSB8fCBzdGF0cyB8fCB0aGlzLm5ld0RhdGEocXVldWVJZCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSwgeyBzdGF0czoge30gYXMgSVBpcGVQZXJzaXN0ZW50U3RhdHMgfSwgJ3JlYWRvbmx5Jyk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLl9yZWNvdmVyeVtxdWV1ZUlkXSA9IHVuZGVmaW5lZDtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBkLnN0YXRzO1xyXG4gICAgICAgIH0gY2F0Y2gge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fcmVjb3ZlcnlbcXVldWVJZF0gPSB0aGlzLm5ld0RhdGEocXVldWVJZCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhc3luYyBjbGVhcigpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICB0aGlzLl9yZWNvdmVyeSA9IHsgfTtcclxuICAgICAgICByZXR1cm4gdGhpcy50cmFuc2FjdGlvbigoc3RvcmFnZSkgPT4ge1xyXG4gICAgICAgICAgICBzdG9yYWdlLmNsZWFyKCk7XHJcbiAgICAgICAgfSwgdW5kZWZpbmVkKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZGlzcG9zZSgpOiB2b2lkIHwgUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgdGhpcy5fZGIuY2xvc2UoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZGVzdHJveSgpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICB0aGlzLmRpc3Bvc2UoKTtcclxuICAgICAgICB0aGlzLl9yZWNvdmVyeSA9IHsgfTtcclxuICAgICAgICByZXR1cm4gSW5kZXhlZERiVXRpbHMucmVtb3ZlKHRoaXMuX2RiLm5hbWUpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgbmV3RGF0YShxdWV1ZUlkOiBzdHJpbmcpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBjbGllbnRJZDogdGhpcy5fY2xpZW50SWQsXHJcbiAgICAgICAgICAgIHF1ZXVlSWQsXHJcbiAgICAgICAgICAgIGJhdGNoSW5kZXg6IDAsXHJcbiAgICAgICAgICAgIGxhc3RTZW5kaW5nU3VjY2VzczogdHJ1ZSxcclxuICAgICAgICAgICAgcmVxdWVzdEVycm9yQ291bnQ6IDAsXHJcbiAgICAgICAgICAgIHRvdGFsTWVzc2FnZUNvdW50OiAwLFxyXG4gICAgICAgICAgICB0b3RhbFJlcXVlc3RFcnJvckNvdW50OiAwXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9wZW4obW9kZTogSURCVHJhbnNhY3Rpb25Nb2RlKTogSURCT2JqZWN0U3RvcmUge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9kYi50cmFuc2FjdGlvbihbUGlwZVN0YXRzSW5kZXhlZERCU3RvcmFnZS5QaXBlU3RhdGlzdGljc1N0b3JhZ2VdLCBtb2RlKS5vYmplY3RTdG9yZShQaXBlU3RhdHNJbmRleGVkREJTdG9yYWdlLlBpcGVTdGF0aXN0aWNzU3RvcmFnZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB0cmFuc2FjdGlvbjxUPihhY3Rpb246IChzdG9yYWdlOiBJREJPYmplY3RTdG9yZSwgcmVzdWx0OiBUKSA9PiB2b2lkLCByZXN1bHQ6IFQsIG1vZGU6IElEQlRyYW5zYWN0aW9uTW9kZSA9ICdyZWFkd3JpdGUnKTogUHJvbWlzZTxUPiB7XHJcbiAgICAgICAgcmV0dXJuIEluZGV4ZWREYlV0aWxzLnRyYW5zYWN0aW9uKCgpID0+IHRoaXMub3Blbihtb2RlKSwgYWN0aW9uLCByZXN1bHQpO1xyXG4gICAgfVxyXG59XHJcblxyXG5pbnRlcmZhY2UgSUNsaWVudERhdGEge1xyXG4gICAgaWQ6IHN0cmluZztcclxuICAgIGNsaWVudElkOiBzdHJpbmc7XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL2lmZGVmLWxvYWRlci9pZmRlZi1sb2FkZXIuanM/REVCVUc9dHJ1ZSZQRVJGT1JNQU5DRV9BVURJVD10cnVlIS4vc3JjL3Byb2Nlc3NpbmcvYXVkaXQvc3RhdHMvc3RvcmFnZXMvcGlwZS1zdGF0cy5pbmRleGVkZGIudHMiLCJpbXBvcnQgeyBHdWlkUHJvdmlkZXIgfSBmcm9tICcuLi8uLi8uLi8uLi9mcmFtZXdvcmsvZ3VpZCc7XHJcbmltcG9ydCB7IFdlYlN0b3JhZ2VzIH0gZnJvbSAnLi4vLi4vLi4vLi4vZnJhbWV3b3JrL3dlYnN0b3JhZ2UnO1xyXG5pbXBvcnQgeyBJUGlwZVBlcnNpc3RlbnRTdGF0cyB9IGZyb20gJy4uL3BpcGUtc3RhdHMnO1xyXG5pbXBvcnQgeyBJUGlwZVN0YXRzU3RvcmFnZSB9IGZyb20gJy4vcGlwZS1zdGF0cy5zdG9yYWdlJztcclxuXHJcbmV4cG9ydCBjbGFzcyBQaXBlU3RhdHNMb2NhbFN0b3JhZ2UgaW1wbGVtZW50cyBJUGlwZVN0YXRzU3RvcmFnZSB7XHJcbiAgICBwdWJsaWMgc3RhdGljIGNyZWF0ZShsb2NhbFN0b3JhZ2U6IFN0b3JhZ2UgfCBudWxsID0gV2ViU3RvcmFnZXMubG9jYWxTdG9yYWdlKTogUGlwZVN0YXRzTG9jYWxTdG9yYWdlIHwgbnVsbCB7XHJcbiAgICAgICAgaWYgKCFsb2NhbFN0b3JhZ2UpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gbmV3IFBpcGVTdGF0c0xvY2FsU3RvcmFnZShsb2NhbFN0b3JhZ2UpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IF9wcmVmaXggPSAnbWNqcy1zdGF0czonO1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgX2NsaWVudEtleSA9ICdtY2pzLXN0YXRzLWNsaWVudCc7XHJcblxyXG4gICAgcHJpdmF0ZSBfY2xpZW50SWQ6IHN0cmluZztcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgX3JlY292ZXJ5OiB7IFtxdWV1ZUlkOiBzdHJpbmddOiBJUGlwZVBlcnNpc3RlbnRTdGF0cyB8IHVuZGVmaW5lZCB9ID0geyB9O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgX3N0b3JhZ2U6IFN0b3JhZ2VcclxuICAgICkgeyB9XHJcblxyXG4gICAgcHVibGljIGNsaWVudElkKCk6IHN0cmluZyB7XHJcbiAgICAgICAgY29uc3Qga2V5ID0gUGlwZVN0YXRzTG9jYWxTdG9yYWdlLl9jbGllbnRLZXk7XHJcbiAgICAgICAgbGV0IGNsaWVudElkID0gdGhpcy5fY2xpZW50SWQgfHwgdGhpcy5fc3RvcmFnZS5nZXRJdGVtKGtleSk7XHJcbiAgICAgICAgaWYgKCFjbGllbnRJZCkge1xyXG4gICAgICAgICAgICBjbGllbnRJZCA9IEd1aWRQcm92aWRlci5kZWZhdWx0Lm5leHQoKTtcclxuICAgICAgICAgICAgdGhpcy5fc3RvcmFnZS5zZXRJdGVtKGtleSwgY2xpZW50SWQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5fY2xpZW50SWQgPSBjbGllbnRJZDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdXBkYXRlKHF1ZXVlSWQ6IHN0cmluZywgYWN0aW9uOiAoc3RhdHM6IElQaXBlUGVyc2lzdGVudFN0YXRzKSA9PiB2b2lkKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3Qga2V5ID0gdGhpcy5rZXkocXVldWVJZCk7XHJcblxyXG4gICAgICAgIGNvbnN0IHN0YXRzID0gdGhpcy5fcmVjb3Zlcnlba2V5XSB8fCB0aGlzLmdldChrZXkpIHx8IHRoaXMubmV3KHF1ZXVlSWQpO1xyXG5cclxuICAgICAgICBhY3Rpb24oc3RhdHMpO1xyXG5cclxuICAgICAgICB0aGlzLnNldChrZXksIHN0YXRzKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVhZChxdWV1ZUlkOiBzdHJpbmcpOiBJUGlwZVBlcnNpc3RlbnRTdGF0cyB7XHJcbiAgICAgICAgY29uc3Qga2V5ID0gdGhpcy5rZXkocXVldWVJZCk7XHJcblxyXG4gICAgICAgIGxldCBzdGF0cyA9IHRoaXMuX3JlY292ZXJ5W2tleV0gfHwgdGhpcy5nZXQoa2V5KTtcclxuXHJcbiAgICAgICAgaWYgKCFzdGF0cykge1xyXG4gICAgICAgICAgICBzdGF0cyA9IHRoaXMubmV3KHF1ZXVlSWQpO1xyXG4gICAgICAgICAgICB0aGlzLnNldChrZXksIHN0YXRzKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBzdGF0cztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xlYXIoKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3Qgc3RvcmFnZSA9IHRoaXMuX3N0b3JhZ2U7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdG9yYWdlLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGtleSA9IHN0b3JhZ2Uua2V5KGkpO1xyXG4gICAgICAgICAgICBpZiAoa2V5ICYmIGtleS5pbmRleE9mKFBpcGVTdGF0c0xvY2FsU3RvcmFnZS5fcHJlZml4KSA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgc3RvcmFnZS5yZW1vdmVJdGVtKGtleSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9yZWNvdmVyeVtrZXldID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBkZXN0cm95KCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuY2xlYXIoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZGlzcG9zZSgpOiB2b2lkIHtcclxuICAgICAgICAvL1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUga2V5KHF1ZXVlSWQ6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIFBpcGVTdGF0c0xvY2FsU3RvcmFnZS5fcHJlZml4ICsgcXVldWVJZDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG5ldyhxdWV1ZUlkOiBzdHJpbmcpOiBJUGlwZVBlcnNpc3RlbnRTdGF0cyB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgY2xpZW50SWQ6IHRoaXMuY2xpZW50SWQoKSxcclxuICAgICAgICAgICAgcXVldWVJZCxcclxuICAgICAgICAgICAgYmF0Y2hJbmRleDogMCxcclxuICAgICAgICAgICAgdG90YWxNZXNzYWdlQ291bnQ6IDAsXHJcbiAgICAgICAgICAgIHRvdGFsUmVxdWVzdEVycm9yQ291bnQ6IDAsXHJcbiAgICAgICAgICAgIHJlcXVlc3RFcnJvckNvdW50OiAwLFxyXG4gICAgICAgICAgICBsYXN0U2VuZGluZ1N1Y2Nlc3M6IGZhbHNlXHJcbiAgICAgICAgfSBhcyBJUGlwZVBlcnNpc3RlbnRTdGF0cztcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldChrZXk6IHN0cmluZyk6IElQaXBlUGVyc2lzdGVudFN0YXRzIHwgbnVsbCB7XHJcbiAgICAgICAgY29uc3Qgc3RyID0gdGhpcy5fc3RvcmFnZS5nZXRJdGVtKGtleSk7XHJcblxyXG4gICAgICAgIGlmICghc3RyKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgY29uc3Qgc3RhdHMgPSBKU09OLnBhcnNlKHN0cik7XHJcbiAgICAgICAgICAgIGlmIChzdGF0cykge1xyXG4gICAgICAgICAgICAgICAgc3RhdHMuY2xpZW50SWQgPSB0aGlzLmNsaWVudElkKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHN0YXRzO1xyXG4gICAgICAgIH0gY2F0Y2gge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzZXQoa2V5OiBzdHJpbmcsIHZhbDogSVBpcGVQZXJzaXN0ZW50U3RhdHMpOiB2b2lkIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICB0aGlzLl9zdG9yYWdlLnNldEl0ZW0oa2V5LCBKU09OLnN0cmluZ2lmeSh2YWwsIChuYW1lOiBrZXlvZiBJUGlwZVBlcnNpc3RlbnRTdGF0cywgdmFsdWUpID0+IHtcclxuICAgICAgICAgICAgICAgIHN3aXRjaCAobmFtZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ2NsaWVudElkJzogcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OiByZXR1cm4gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pKTtcclxuICAgICAgICAgICAgdGhpcy5fcmVjb3Zlcnlba2V5XSA9IHVuZGVmaW5lZDtcclxuICAgICAgICB9IGNhdGNoIHtcclxuICAgICAgICAgICAgdGhpcy5fcmVjb3Zlcnlba2V5XSA9IHZhbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL2lmZGVmLWxvYWRlci9pZmRlZi1sb2FkZXIuanM/REVCVUc9dHJ1ZSZQRVJGT1JNQU5DRV9BVURJVD10cnVlIS4vc3JjL3Byb2Nlc3NpbmcvYXVkaXQvc3RhdHMvc3RvcmFnZXMvcGlwZS1zdGF0cy5sb2NhbC1zdG9yYWdlLnRzIiwiaW1wb3J0IHsgR3VpZFByb3ZpZGVyIH0gZnJvbSAnLi4vLi4vLi4vLi4vZnJhbWV3b3JrL2d1aWQnO1xyXG5pbXBvcnQgeyBJUGlwZVBlcnNpc3RlbnRTdGF0cyB9IGZyb20gJy4uL3BpcGUtc3RhdHMnO1xyXG5pbXBvcnQgeyBJUGlwZVN0YXRzU3RvcmFnZSB9IGZyb20gJy4vcGlwZS1zdGF0cy5zdG9yYWdlJztcclxuXHJcbmV4cG9ydCBjbGFzcyBQaXBlU3RhdHNNZW1vcnlTdG9yYWdlIGltcGxlbWVudHMgSVBpcGVTdGF0c1N0b3JhZ2Uge1xyXG4gICAgcHVibGljIHJlYWRvbmx5IGNsaWVudElkOiBzdHJpbmcgPSBHdWlkUHJvdmlkZXIuZGVmYXVsdC5uZXh0KCk7XHJcblxyXG4gICAgcHJpdmF0ZSBfZGljdGlvbmFyeTogSVBpcGVTdGF0c0RpY3Rpb25hcnkgPSB7fTtcclxuXHJcbiAgICBwdWJsaWMgdXBkYXRlKHF1ZXVlSWQ6IHN0cmluZywgYWN0aW9uOiAoc3RhdHM6IElQaXBlUGVyc2lzdGVudFN0YXRzKSA9PiB2b2lkKTogdm9pZCB7XHJcbiAgICAgICAgYWN0aW9uKHRoaXMuZ2V0KHF1ZXVlSWQpKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVhZChxdWV1ZUlkOiBzdHJpbmcpOiBJUGlwZVBlcnNpc3RlbnRTdGF0cyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0KHF1ZXVlSWQpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbGVhcigpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9kaWN0aW9uYXJ5ID0ge307XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGRlc3Ryb3koKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5jbGVhcigpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBkaXNwb3NlKCk6IHZvaWQge1xyXG4gICAgICAgIC8vXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXQocXVldWVJZDogc3RyaW5nKTogSVBpcGVQZXJzaXN0ZW50U3RhdHMge1xyXG4gICAgICAgIGNvbnN0IGRpY3Rpb25hcnkgPSB0aGlzLl9kaWN0aW9uYXJ5O1xyXG5cclxuICAgICAgICByZXR1cm4gZGljdGlvbmFyeVtxdWV1ZUlkXSB8fCAoZGljdGlvbmFyeVtxdWV1ZUlkXSA9IHtcclxuICAgICAgICAgICAgY2xpZW50SWQ6IHRoaXMuY2xpZW50SWQsXHJcbiAgICAgICAgICAgIHF1ZXVlSWQsXHJcbiAgICAgICAgICAgIGJhdGNoSW5kZXg6IDAsXHJcbiAgICAgICAgICAgIHRvdGFsTWVzc2FnZUNvdW50OiAwLFxyXG4gICAgICAgICAgICB0b3RhbFJlcXVlc3RFcnJvckNvdW50OiAwLFxyXG4gICAgICAgICAgICByZXF1ZXN0RXJyb3JDb3VudDogMCxcclxuICAgICAgICAgICAgbGFzdFNlbmRpbmdTdWNjZXNzOiBmYWxzZVxyXG4gICAgICAgIH0gYXMgSVBpcGVQZXJzaXN0ZW50U3RhdHMpO1xyXG4gICAgfVxyXG59XHJcblxyXG5pbnRlcmZhY2UgSVBpcGVTdGF0c0RpY3Rpb25hcnkge1xyXG4gICAgW3F1ZXVlSWQ6IHN0cmluZ106IElQaXBlUGVyc2lzdGVudFN0YXRzO1xyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy9pZmRlZi1sb2FkZXIvaWZkZWYtbG9hZGVyLmpzP0RFQlVHPXRydWUmUEVSRk9STUFOQ0VfQVVESVQ9dHJ1ZSEuL3NyYy9wcm9jZXNzaW5nL2F1ZGl0L3N0YXRzL3N0b3JhZ2VzL3BpcGUtc3RhdHMubWVtb3J5LnRzIiwiaW1wb3J0IHsgSUxvZywgSU1lYXN1cmVtZW50LCBJTWVzc2FnZSwgSU1lc3NhZ2VNZXRhLCBMb2dMZXZlbCwgTWVzc2FnZVR5cGUgfSBmcm9tICcuLi9kZWZpbml0aW9ucyc7XHJcbmltcG9ydCB7IElHdWlkUHJvdmlkZXIgfSBmcm9tICcuLi9mcmFtZXdvcmsvZ3VpZCc7XHJcbmltcG9ydCB7IElUaW1lU3RhbXBQcm92aWRlciB9IGZyb20gJy4uL2ZyYW1ld29yay90aW1lc3RhbXAnO1xyXG5pbXBvcnQgeyBFbnZlbG9wLCBJRW52ZWxvcCB9IGZyb20gJy4vZW52ZWxvcCc7XHJcblxyXG4vKipcclxuICogQGludGVybmFsXHJcbiAqIEBpbnRlcmZhY2UgSVBvc3RtYW5cclxuICovXHJcbmV4cG9ydCBpbnRlcmZhY2UgSVBvc3RtYW4ge1xyXG4gICAgLyoqXHJcbiAgICAgKiBTZWFsIG1lc3NhZ2UgaW50byBlbnZlbG9wXHJcbiAgICAgKlxyXG4gICAgICogQGludGVybmFsXHJcbiAgICAgKiBAcGFyYW0ge0lNZXNzYWdlfSBtZXNzYWdlXHJcbiAgICAgKiBAcGFyYW0ge0NvbnRleHR9IFtjb250ZXh0XVxyXG4gICAgICogQHJldHVybnMge0lFbnZlbG9wfVxyXG4gICAgICogQG1lbWJlcm9mIElQb3N0bWFuXHJcbiAgICAgKi9cclxuICAgIHNlYWwobWVzc2FnZTogSU1lc3NhZ2UpOiBJRW52ZWxvcDtcclxufVxyXG5cclxuLyoqXHJcbiAqIEBpbnRlcm5hbFxyXG4gKiBAY2xhc3MgUG9zdG1hblxyXG4gKiBAaW1wbGVtZW50cyB7SVBvc3RtYW59XHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgUG9zdG1hbiBpbXBsZW1lbnRzIElQb3N0bWFuIHtcclxuICAgIHByaXZhdGUgc3RhdGljIExvZ0xldmVsOiB7W2tleSBpbiBMb2dMZXZlbF06IG51bWJlciB9ID0ge1xyXG4gICAgICAgIHRyYWNlOiAwLFxyXG4gICAgICAgIGRlYnVnOiAxLFxyXG4gICAgICAgIGluZm86IDIsXHJcbiAgICAgICAgd2FybjogMyxcclxuICAgICAgICBlcnJvcjogNCxcclxuICAgICAgICBmYXRhbDogNVxyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IF9ndWlkOiBJR3VpZFByb3ZpZGVyLFxyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgX3RpbWU6IElUaW1lU3RhbXBQcm92aWRlclxyXG4gICAgKSB7IH1cclxuXHJcbiAgICBwdWJsaWMgc2VhbChtZXNzYWdlOiBJTWVzc2FnZSk6IElFbnZlbG9wIHtcclxuICAgICAgICBjb25zdCBtZXRhID0gbWVzc2FnZS5fbWV0YTtcclxuXHJcbiAgICAgICAgZGVsZXRlIChtZXNzYWdlIGFzIGFueSkuX21ldGE7IC8vIFRvRG86IENoZWNrIHBlcmZvbWFuY2Ugb2YgdGhlIGRlbGV0ZSBvcGVyYXRvclxyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5lbnZlbG9wKG1ldGEsIG1lc3NhZ2UpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZW52ZWxvcChtZXRhOiBJTWVzc2FnZU1ldGEsIG1lc3NhZ2U6IG9iamVjdCk6IElFbnZlbG9wIHtcclxuICAgICAgICBjb25zdCBlbnZlbG9wID0gbmV3IEVudmVsb3AobWV0YS50eXBlKTtcclxuICAgICAgICBlbnZlbG9wLmlkID0gdGhpcy5fZ3VpZC5uZXh0KCk7XHJcbiAgICAgICAgZW52ZWxvcC50aW1lc3RhbXAgPSBtZXRhLnRpbWVzdGFtcCB8fCB0aGlzLl90aW1lLm5vdygpO1xyXG4gICAgICAgIGVudmVsb3AubmFtZSA9IHRoaXMubmFtZShlbnZlbG9wLnR5cGUsIG1lc3NhZ2UpO1xyXG4gICAgICAgIGVudmVsb3AubWVzc2FnZSA9IG1lc3NhZ2U7XHJcblxyXG4gICAgICAgIHJldHVybiBlbnZlbG9wO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgbmFtZSh0eXBlOiBNZXNzYWdlVHlwZSwgbWVzc2FnZTogYW55KTogc3RyaW5nIHtcclxuICAgICAgICBpZiAodHlwZSA9PT0gJ21lYXN1cmVtZW50Jykge1xyXG4gICAgICAgICAgICBjb25zdCBuYW1lID0gKG1lc3NhZ2UgYXMgSU1lYXN1cmVtZW50KS5uYW1lO1xyXG4gICAgICAgICAgICBkZWxldGUgbWVzc2FnZS5uYW1lO1xyXG4gICAgICAgICAgICByZXR1cm4gbmFtZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHR5cGUgPT09ICdsb2cnKSB7XHJcbiAgICAgICAgICAgIGxldCBuYW1lID0gUG9zdG1hbi5Mb2dMZXZlbFsobWVzc2FnZSBhcyBJTG9nKS5sZXZlbF07XHJcbiAgICAgICAgICAgIG5hbWUgPSB0eXBlb2YgbmFtZSA9PT0gJ251bWJlcicgPyBuYW1lIDogMjtcclxuICAgICAgICAgICAgZGVsZXRlIG1lc3NhZ2UubGV2ZWw7XHJcbiAgICAgICAgICAgIHJldHVybiBuYW1lLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0eXBlO1xyXG4gICAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy9pZmRlZi1sb2FkZXIvaWZkZWYtbG9hZGVyLmpzP0RFQlVHPXRydWUmUEVSRk9STUFOQ0VfQVVESVQ9dHJ1ZSEuL3NyYy9wcm9jZXNzaW5nL3Bvc3RtYW4udHMiLCJpbXBvcnQgeyBJQ29uZmlndXJhdGlvbiB9IGZyb20gJy4uL2NvbmZpZ3VyYXRpb25zL2NvbmZpZ3VyYXRpb24nO1xyXG5pbXBvcnQgeyBJRW52aXJvbm1lbnREYXRhIH0gZnJvbSAnLi4vY29uZmlndXJhdGlvbnMvZW52aXJvbm1lbnQnO1xyXG5pbXBvcnQgeyBJTG9nZ2VyIH0gZnJvbSAnLi4vbG9ncyc7XHJcbmltcG9ydCB7IENvbnRleHQgfSBmcm9tICcuLi9wcm9jZXNzaW5nJztcclxuaW1wb3J0IHsgTWVzc2FnZVJlY2VpdmVyIH0gZnJvbSAnLi9zZW5kZXJzL21lc3NhZ2UtcmVjZWl2ZXInO1xyXG5pbXBvcnQgeyBNYW5kYXRvcnlSZXNwb25zZUVtaXR0ZXIgfSBmcm9tICcuL3NlbmRlcnMvcmVzcG9uc2UtZW1pdHRlcic7XHJcbmltcG9ydCB7IFdvcmtlckV2ZW50UmVjZWl2ZXIgfSBmcm9tICcuL3NlbmRlcnMvd29ya2VyLWV2ZW50LXJlY2VpdmVyJztcclxuaW1wb3J0IHsgV29ya2VyUmVxdWVzdFJlY2VpdmVyIH0gZnJvbSAnLi9zZW5kZXJzL3dvcmtlci1yZXF1ZXN0LXJlY2VpdmVyJztcclxuaW1wb3J0IHsgU2VydmljZVdvcmtlclNlbmRlciB9IGZyb20gJy4vc2VydmljZS13b3JrZXItc2VuZGVyJztcclxuaW1wb3J0IHsgSUNvbmZpZ3VyYXRpb25Xb3JrZXJNZXNzYWdlLCBJTWVzc2FnZXNXb3JrZXJNZXNzYWdlLCBJV29ya2VyR2xvYmFsU2NvcGUsIElXb3JrZXJNZXNzYWdlU2VuZGVyIH0gZnJvbSAnLi93b3JrZXItZGVmaW5pdGlvbnMnO1xyXG5cclxuLyoqXHJcbiAqIEBpbnRlcm5hbFxyXG4gKi9cclxuZXhwb3J0IGludGVyZmFjZSBJQ29uZmlndXJhdGlvbkV2ZW50IHtcclxuICAgIGNvbmZpZ3VyYXRpb246IElDb25maWd1cmF0aW9uO1xyXG5cclxuICAgIGVudmlyb25tZW50OiBJRW52aXJvbm1lbnREYXRhO1xyXG5cclxuICAgIGNvbnRleHQ6IENvbnRleHQ7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBAaW50ZXJuYWxcclxuICovXHJcbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1lbXB0eS1pbnRlcmZhY2VcclxuZXhwb3J0IGludGVyZmFjZSBJVGVybWluYXRlRXZlbnQgeyB9XHJcblxyXG4vKipcclxuICogUmVjZWl2ZXIgd3JhcHBlciBmb3Igd29ya2VyIGVudmlyb25tZW50LlxyXG4gKiBJdCBhbGxvd3MgYWRkIHJlY2VpdmVkIG1lc3NhZ2VzIHdpdGggdmFyaW91c2UgZGF0YSB0eXBlcyBmcm9tIGEgbWFpbiB0aHJlYWQuXHJcbiAqXHJcbiAqIEBpbnRlcm5hbFxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFdvcmtlclJlY2VpdmVyIHtcclxuICAgIHB1YmxpYyByZWFkb25seSBjb250ZXh0OiBDb250ZXh0O1xyXG5cclxuICAgIHB1YmxpYyBnZXQgbWVzc2FnZXMoKSB7IHJldHVybiB0aGlzLl9tZXNzYWdlcy5ldmVudDsgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgY29uZmlndXJhdGlvbigpIHsgcmV0dXJuIHRoaXMuX2NvbmZpZ3VyYXRpb24uZXZlbnQ7IH1cclxuXHJcbiAgICBwdWJsaWMgcmVhZG9ubHkgdGVybWluYXRlID0gbmV3IE1hbmRhdG9yeVJlc3BvbnNlRW1pdHRlcjxJVGVybWluYXRlRXZlbnQgfCB1bmRlZmluZWQsIHZvaWQ+KCk7XHJcblxyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfcmVjZWl2ZXI6IE1lc3NhZ2VSZWNlaXZlcjtcclxuXHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF90ZXJtaW5hdGU6IFdvcmtlclJlcXVlc3RSZWNlaXZlcjwndGVybWluYXRlJywgSVRlcm1pbmF0ZUV2ZW50IHwgdW5kZWZpbmVkLCB2b2lkPjtcclxuXHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9tZXNzYWdlczogV29ya2VyRXZlbnRSZWNlaXZlcjwnbWVzc2FnZXMnLCBJTWVzc2FnZXNXb3JrZXJNZXNzYWdlPjtcclxuXHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9jb25maWd1cmF0aW9uOiBXb3JrZXJFdmVudFJlY2VpdmVyPCdjb25maWd1cmF0aW9uJywgSUNvbmZpZ3VyYXRpb25Xb3JrZXJNZXNzYWdlPjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICB3b3JrZXJFbnZpcm9ubWVudDogSVdvcmtlckdsb2JhbFNjb3BlLFxyXG4gICAgICAgIGxvZ2dlcjogSUxvZ2dlclxyXG4gICAgKSB7XHJcbiAgICAgICAgY29uc3Qgc2VuZGVyID0gdGhpcy5nZXRTZW5kZXIod29ya2VyRW52aXJvbm1lbnQpO1xyXG5cclxuICAgICAgICBjb25zdCByZWNlaXZlciA9IHRoaXMuX3JlY2VpdmVyID0gbmV3IE1lc3NhZ2VSZWNlaXZlcih3b3JrZXJFbnZpcm9ubWVudCwgbG9nZ2VyKTtcclxuXHJcbiAgICAgICAgdGhpcy5jb250ZXh0ID0gbmV3IENvbnRleHQoc2VuZGVyLCByZWNlaXZlcik7XHJcblxyXG4gICAgICAgIHRoaXMuX21lc3NhZ2VzID0gbmV3IFdvcmtlckV2ZW50UmVjZWl2ZXIoJ21lc3NhZ2VzJywgcmVjZWl2ZXIpO1xyXG5cclxuICAgICAgICB0aGlzLl9jb25maWd1cmF0aW9uID0gbmV3IFdvcmtlckV2ZW50UmVjZWl2ZXIoJ2NvbmZpZ3VyYXRpb24nLCByZWNlaXZlcik7XHJcblxyXG4gICAgICAgIHRoaXMuX3Rlcm1pbmF0ZSA9IG5ldyBXb3JrZXJSZXF1ZXN0UmVjZWl2ZXIoJ3Rlcm1pbmF0ZScsIHNlbmRlciwgcmVjZWl2ZXIsIHRoaXMudGVybWluYXRlKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZGlzcG9zZSgpIHtcclxuICAgICAgICB0aGlzLl9yZWNlaXZlci5kaXNwb3NlKCk7XHJcblxyXG4gICAgICAgIHRoaXMuX3Rlcm1pbmF0ZS5kaXNwb3NlKCk7XHJcbiAgICAgICAgdGhpcy5fbWVzc2FnZXMuZGlzcG9zZSgpO1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZ3VyYXRpb24uZGlzcG9zZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0U2VuZGVyKHdvcmtlckVudmlyb25tZW50OiBJV29ya2VyR2xvYmFsU2NvcGUgfCBTZXJ2aWNlV29ya2VyR2xvYmFsU2NvcGUpOiBJV29ya2VyTWVzc2FnZVNlbmRlciB7XHJcbiAgICAgICAgaWYgKCdjbGllbnRzJyBpbiB3b3JrZXJFbnZpcm9ubWVudCkge1xyXG4gICAgICAgICAgICBjb25zdCBzZXJ2aWNlV29ya2VyR2xvYmFsID0gd29ya2VyRW52aXJvbm1lbnQgYXMgU2VydmljZVdvcmtlckdsb2JhbFNjb3BlO1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFNlcnZpY2VXb3JrZXJTZW5kZXIoKCkgPT4gc2VydmljZVdvcmtlckdsb2JhbC5jbGllbnRzLm1hdGNoQWxsKHsgaW5jbHVkZVVuY29udHJvbGxlZDogdHJ1ZSB9KSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB3b3JrZXJFbnZpcm9ubWVudCBhcyBhbnkgYXMgSVdvcmtlck1lc3NhZ2VTZW5kZXI7XHJcbiAgICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL2lmZGVmLWxvYWRlci9pZmRlZi1sb2FkZXIuanM/REVCVUc9dHJ1ZSZQRVJGT1JNQU5DRV9BVURJVD10cnVlIS4vc3JjL3dvcmtlcnMvd29ya2VyLXJlY2VpdmVyLnRzIiwiaW1wb3J0IHsgSVdvcmtlck1lc3NhZ2UsIElXb3JrZXJNZXNzYWdlU2VuZGVyLCBXb3JrZXJEYXRhVHlwZSB9IGZyb20gJy4vd29ya2VyLWRlZmluaXRpb25zJztcclxuXHJcbi8qKlxyXG4gKiBTZW5kIGRhdGEgdG8gZWFjaCBwYWdlIGZyb20gU2hhcmVkV29ya2VyXHJcbiAqXHJcbiAqIEBpbnRlcm5hbFxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFNlcnZpY2VXb3JrZXJTZW5kZXIgaW1wbGVtZW50cyBJV29ya2VyTWVzc2FnZVNlbmRlciB7XHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IF9jbGllbnRzOiAoKSA9PiBQcm9taXNlPEFycmF5PElXb3JrZXJNZXNzYWdlU2VuZGVyPj5cclxuICAgICkgeyB9XHJcblxyXG4gICAgcHVibGljIGFzeW5jIHBvc3RNZXNzYWdlKGRhdGE6IElXb3JrZXJNZXNzYWdlPFdvcmtlckRhdGFUeXBlPik6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgIGNvbnN0IGNsaWVudHMgPSBhd2FpdCB0aGlzLl9jbGllbnRzKCk7XHJcblxyXG4gICAgICAgIGlmIChjbGllbnRzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoYERvbid0IHNlZSBhbnkgY2xpZW50c2ApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZm9yIChjb25zdCBjbGllbnQgb2YgY2xpZW50cykge1xyXG4gICAgICAgICAgICBhd2FpdCBjbGllbnQucG9zdE1lc3NhZ2UoZGF0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy9pZmRlZi1sb2FkZXIvaWZkZWYtbG9hZGVyLmpzP0RFQlVHPXRydWUmUEVSRk9STUFOQ0VfQVVESVQ9dHJ1ZSEuL3NyYy93b3JrZXJzL3NlcnZpY2Utd29ya2VyLXNlbmRlci50cyIsImltcG9ydCB7IEdsb2JhbFByb3ZpZGVyIH0gZnJvbSAnLi4vZnJhbWV3b3JrL2dsb2JhbCc7XHJcbmltcG9ydCB7IFBzZXVkb1dvcmtlclNjb3BlTmFtZSB9IGZyb20gJy4vcHNldWRvLXdvcmtlcic7XHJcbmltcG9ydCB7IElXb3JrZXJHbG9iYWxTY29wZSB9IGZyb20gJy4vd29ya2VyLWRlZmluaXRpb25zJztcclxuXHJcbi8qKlxyXG4gKiBSZXR1cm4gY3VycmVudCBnbG9iYWwgcm9vdCB2YXJpYWJsZSBmb3IgV29ya2VyIGVudmVyb25lbW50XHJcbiAqXHJcbiAqIEBpbnRlcm5hbFxyXG4gKiBAYWJzdHJhY3RcclxuICogQGNsYXNzIFdvcmtlclNjb3BlXHJcbiAqL1xyXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgV29ya2VyU2NvcGUge1xyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm4gY3VycmVudCBnbG9iYWwgcm9vdCB2YXJpYWJsZSBmb3IgV29ya2VyIGVudmVyb25lbW50XHJcbiAgICAgKlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHsqfSBbZ2xvYmFsPVdvcmtlclNjb3BlLmdsb2JhbCgpXVxyXG4gICAgICogQHJldHVybnMge0lXb3JrZXJHbG9iYWxTY29wZX1cclxuICAgICAqIEBtZW1iZXJvZiBXb3JrZXJTY29wZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGN1cnJlbnQoZ2xvYmFsOiBhbnkgPSBHbG9iYWxQcm92aWRlci5jdXJyZW50KCkpOiBJV29ya2VyR2xvYmFsU2NvcGUge1xyXG4gICAgICAgIGlmIChnbG9iYWxbUHNldWRvV29ya2VyU2NvcGVOYW1lXSkge1xyXG4gICAgICAgICAgICAvLyBXZSBhcmUgaW4gV2ViV29ya2VyIGVtdWxhdG9yXHJcbiAgICAgICAgICAgIGNvbnN0IHBzZXVkb1dvcmtlciA9IGdsb2JhbFtQc2V1ZG9Xb3JrZXJTY29wZU5hbWVdO1xyXG4gICAgICAgICAgICBkZWxldGUgZ2xvYmFsW1BzZXVkb1dvcmtlclNjb3BlTmFtZV07XHJcbiAgICAgICAgICAgIHJldHVybiBwc2V1ZG9Xb3JrZXI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBXZSBhcmUgaW4gcmVhbCBXZWIgV29ya2VyXHJcbiAgICAgICAgcmV0dXJuIGdsb2JhbDtcclxuICAgIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvaWZkZWYtbG9hZGVyL2lmZGVmLWxvYWRlci5qcz9ERUJVRz10cnVlJlBFUkZPUk1BTkNFX0FVRElUPXRydWUhLi9zcmMvd29ya2Vycy93b3JrZXItc2NvcGUudHMiXSwic291cmNlUm9vdCI6IiJ9