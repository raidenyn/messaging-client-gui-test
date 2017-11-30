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
/******/ 	return __webpack_require__(__webpack_require__.s = 147);
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
/* 29 */,
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
/* 43 */,
/* 44 */,
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
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var global_1 = __webpack_require__(13);
var name = 'MessagingClient-LiteData';
/**
 * Helper for storring data in global variable
 *
 * @internal
 */
var LiteDataContainer = /** @class */ (function () {
    function LiteDataContainer() {
    }
    LiteDataContainer.get = function () {
        var root = global_1.GlobalProvider.current();
        return root[name] || (root[name] = {});
    };
    LiteDataContainer.clear = function () {
        delete global_1.GlobalProvider.current()[name];
    };
    return LiteDataContainer;
}());
exports.LiteDataContainer = LiteDataContainer;


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var extend_1 = __webpack_require__(18);
/**
 * Shared user API implementation for lite and full versions.
 *
 * Instance of this class is provided to user and isn't changed.
 *
 * @internal
 * @class MessagingClient
 * @implements {IMessagingClient}
 */
var MessagingClientInstance = /** @class */ (function () {
    function MessagingClientInstance(
        /**
         * Sender instance that will be replaced after full version loading
         */
        sender, _time) {
        this.sender = sender;
        this._time = _time;
    }
    MessagingClientInstance.prototype.create = function (messageType, payload) {
        var message = { _meta: { type: messageType } };
        if (payload) {
            extend_1.extend(message, payload);
        }
        return message;
    };
    MessagingClientInstance.prototype.send = function (message, options) {
        if (!message || !message._meta) {
            throw new Error('Message or message type is undefined');
        }
        message._meta.timestamp = this._time.now();
        message = JSON.parse(JSON.stringify(message));
        this.sender.send(message, options);
    };
    return MessagingClientInstance;
}());
exports.MessagingClientInstance = MessagingClientInstance;


/***/ }),
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
/* 71 */,
/* 72 */,
/* 73 */,
/* 74 */,
/* 75 */,
/* 76 */,
/* 77 */,
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var strings_1 = __webpack_require__(155);
/**
 * The class contains utilities for ServiceWorker
 */
var ServiceWorkerUtils = /** @class */ (function () {
    function ServiceWorkerUtils() {
    }
    /**
     * Check supporting ServiceWorker API in the current environment
     */
    ServiceWorkerUtils.isSupported = function () {
        return typeof navigator !== 'undefined'
            && 'serviceWorker' in navigator;
    };
    /**
     * Register a new ServiceWorker instance and wait its activation
     */
    ServiceWorkerUtils.activate = function (path, scope, attempts) {
        if (attempts === void 0) { attempts = 3; }
        var counter = 0;
        return navigator.serviceWorker.register(path, { scope: scope }).then(function (registration) {
            counter++;
            var serviceWorker = registration.active || registration.installing || registration.waiting;
            if (serviceWorker && serviceWorker.state === 'activated') {
                if (strings_1.endsWith(serviceWorker.scriptURL, path)) {
                    return { registration: registration, serviceWorker: serviceWorker };
                }
            }
            if (serviceWorker) {
                return new Promise(function (resolve, reject) {
                    function quiet(action) {
                        serviceWorker.onstatechange = serviceWorker.onerror = undefined;
                        action();
                    }
                    serviceWorker.onstatechange = function (event) {
                        if (serviceWorker.state === 'activated') {
                            quiet(function () { return resolve({ registration: registration, serviceWorker: serviceWorker }); });
                        }
                        if (serviceWorker.state === 'redundant') {
                            /* istanbul ignore if */
                            if (counter < attempts) {
                                quiet(function () { return resolve(ServiceWorkerUtils.activate(path, scope)); });
                            }
                            else {
                                quiet(function () { return reject('Registration was failed with maximum attempts excides.'); });
                            }
                        }
                    };
                    serviceWorker.onerror = function (event) {
                        /* istanbul ignore next */
                        quiet(function () { return reject(event.target); });
                    };
                });
            }
            /* istanbul ignore next */
            return Promise.reject('ServiceWorker failed the registration.');
        });
    };
    /**
     * Returns absolute path for passing as scope to a ServiceWorker instance.
     */
    ServiceWorkerUtils.absoluteScope = function (path, relativeScope) {
        if (relativeScope[0] === '/') {
            return relativeScope;
        }
        var index = path.lastIndexOf('/');
        if (index < 0) {
            return relativeScope;
        }
        return path.substring(0, index + 1) + relativeScope;
    };
    return ServiceWorkerUtils;
}());
exports.ServiceWorkerUtils = ServiceWorkerUtils;


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
/* 98 */,
/* 99 */,
/* 100 */,
/* 101 */,
/* 102 */,
/* 103 */,
/* 104 */,
/* 105 */,
/* 106 */,
/* 107 */,
/* 108 */,
/* 109 */,
/* 110 */,
/* 111 */,
/* 112 */,
/* 113 */,
/* 114 */,
/* 115 */,
/* 116 */,
/* 117 */,
/* 118 */,
/* 119 */,
/* 120 */,
/* 121 */,
/* 122 */,
/* 123 */,
/* 124 */,
/* 125 */,
/* 126 */,
/* 127 */,
/* 128 */,
/* 129 */,
/* 130 */,
/* 131 */,
/* 132 */,
/* 133 */,
/* 134 */,
/* 135 */,
/* 136 */,
/* 137 */,
/* 138 */,
/* 139 */,
/* 140 */,
/* 141 */,
/* 142 */,
/* 143 */,
/* 144 */,
/* 145 */,
/* 146 */,
/* 147 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var environment_1 = __webpack_require__(148);
var index_1 = __webpack_require__(8);
var timestamp_1 = __webpack_require__(17);
var lite_data_container_1 = __webpack_require__(52);
var console_logger_1 = __webpack_require__(40);
var event_logger_1 = __webpack_require__(41);
var universal_logger_1 = __webpack_require__(42);
var message_sender_full_1 = __webpack_require__(149);
var messaging_client_instance_1 = __webpack_require__(53);
/**
 * Constructor of a MessagingClient instance in full mode.
 *
 * Entry point for building bundle file for full version.
 *
 * @export
 * @class MessagingClient
 */
var MessagingClient = /** @class */ (function () {
    /**
     * @internal
     */
    function MessagingClient(_testEnvironment) {
        this._testEnvironment = _testEnvironment;
    }
    /**
     * @internal
     */
    MessagingClient.environment = function (test) {
        return new MessagingClient(test);
    };
    /**
     * Create a new instance of MessagingClient.
     * It can be called only once at the same page.
     *
     * Depricated method. Should be deleted in the next major version.
     *
     * @static
     * @param {IEnvironmentConfiguration} environment - Configuration of environment
     */
    MessagingClient.create = function (environment) {
        if (environment.mode !== 'production') {
            console.log('Method MessagingClient.create() is depricated. Please use MessagingClient.instantiate() method instead.');
        }
        return MessagingClient.instantiate(environment);
    };
    /**
     * Instantiate of MessagingClient.
     * With configuration it can be called only once at the same page.
     * Without configuration it can be called many times, but returns the same object.
     *
     * @static
     * @param {IEnvironmentConfiguration} environment - Configuration of environment
     */
    MessagingClient.instantiate = function (environment) {
        return new MessagingClient().instantiate(environment);
    };
    /**
     * Reinstantiate of MessagingClient from lite version.
     *
     * Called at the end of this file
     *
     * @internal
     * @static
     * @param {IEnvironmentConfiguration} environment - Configuration of environment
     */
    MessagingClient.reinstantiate = function (environment) {
        if (lite_data_container_1.LiteDataContainer.get().messagingClient) {
            new MessagingClient().instantiate(environment);
        }
    };
    /**
     * Forget about all instances
     * @static
     */
    MessagingClient.terminate = function (callback) {
        var data = lite_data_container_1.LiteDataContainer.get();
        if (data.messagingClient) {
            data.messagingClient.sender.dispose(callback);
        }
        else {
            if (callback) {
                callback();
            }
        }
        lite_data_container_1.LiteDataContainer.clear();
    };
    MessagingClient.initialize = function (data) {
        /* istanbul ignore if */
        if (!data.environment) {
            throw new Error('Environment parameter is strongly required.');
        }
        var sender = MessagingClient.sender(data.environment, data.test);
        var messagingClient = data.messagingClient;
        if (messagingClient) {
            messagingClient.sender = sender;
        }
        else {
            messagingClient = new messaging_client_instance_1.MessagingClientInstance(sender, new timestamp_1.TimeStampProvider());
        }
        MessagingClient.sendBufferedData(data, sender);
        data.isFullVersion = true;
        return messagingClient;
    };
    MessagingClient.prototype.instantiate = function (environment) {
        var data = lite_data_container_1.LiteDataContainer.get();
        if (data.environment && environment) {
            throw new Error('Configuration of MessagingClientJS is already set. Please provide configuration only once.');
        }
        if (data.messagingClient
            && data.isFullVersion) {
            return data.messagingClient;
        }
        data.environment = data.environment || environment;
        if (data.environment) {
            data.test = data.test || this._testEnvironment;
            data.messagingClient = MessagingClient.initialize(data);
        }
        if (data.messagingClient) {
            return data.messagingClient;
        }
        throw new Error('Lite version of MessagingClientJS was not loaded. Please provide a configuration to instantiate a full version.');
    };
    // tslint:disable-next-line:member-ordering
    MessagingClient.logger = function (test, environment) {
        var logger = new universal_logger_1.UniversalLogger([
            new console_logger_1.ConsoleLogger({ mute: !environment.debug })
        ]);
        if (test && test.listeners && test.listeners.log) {
            var eventLogger = new event_logger_1.EventLogger();
            eventLogger.onlog.subscribe(test.listeners.log);
            logger.loggers.push(eventLogger);
        }
        return logger;
    };
    // tslint:disable-next-line:member-ordering
    MessagingClient.sender = function (environment, test) {
        var environmentData = new environment_1.EnvironmentData();
        index_1.override(environmentData, environment);
        environmentData.validate();
        var logger = MessagingClient.logger(test, environment);
        var sender = new message_sender_full_1.MessageSenderFull(environmentData, logger, test ? test.configuration : null);
        if (test && test.listeners) {
            if (test.listeners.ajax) {
                sender.ajax.handler = function (options) { return ((test.listeners && test.listeners.ajax && test.listeners.ajax(options)) || ''); };
            }
            sender.performance.subscribe(function (performance) { return test.listeners && test.listeners.performance && test.listeners.performance(performance); });
        }
        return sender;
    };
    // tslint:disable-next-line:member-ordering
    MessagingClient.sendBufferedData = function (data, sender) {
        if (data.buffer) {
            sender.send(data.buffer.items);
            data.buffer.items.length = 0;
            data.buffer = undefined;
        }
    };
    return MessagingClient;
}());
exports.MessagingClient = MessagingClient;
// Try instantiate a full version from configuration
MessagingClient.reinstantiate();


/***/ }),
/* 148 */
/***/ (function(module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Default values of EnvironmentData
 *
 * @internal
 * @class EnvironmentData
 * @implements {IEnvironmentData}
 */
var EnvironmentData = /** @class */ (function () {
    function EnvironmentData() {
        this.workerUrl = '';
        this.polyfillsUrl = '/messaging-client-polyfills.js';
        this.apiKey = '';
        this.forcePolyfills = false;
        this.fakeMode = false;
        this.debug = false;
        this.mode = 'production';
        this.performanceAudit = false;
    }
    EnvironmentData.prototype.validate = function () {
        if (!this.apiKey) {
            throw new Error('ApiKey is required but not defined or empty.');
        }
        if (!this.workerUrl) {
            throw new Error('WorkerUrl is required but not defined or empty.');
        }
    };
    return EnvironmentData;
}());
exports.EnvironmentData = EnvironmentData;


/***/ }),
/* 149 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var configuration_1 = __webpack_require__(150);
var buffer_call_1 = __webpack_require__(151);
var main_receiver_logger_1 = __webpack_require__(152);
var main_receiver_1 = __webpack_require__(153);
var worker_request_sender_1 = __webpack_require__(45);
var worker_provider_1 = __webpack_require__(154);
/**
 * Message sender implementation for full mode
 *
 * @internal
 */
var MessageSenderFull = /** @class */ (function () {
    function MessageSenderFull(environment, _logger, configuration) {
        if (configuration === void 0) { configuration = null; }
        this._logger = _logger;
        this._disposed = false;
        configuration = configuration || configuration_1.configuration(environment.mode);
        var workerProvider = new worker_provider_1.WorkerProvider(environment.workerUrl, configuration.workers || [], _logger);
        var worker = this._worker = workerProvider.new();
        this._receiver = new main_receiver_1.MainReceiver(worker, _logger);
        this._terminateCommand = new worker_request_sender_1.WorkerRequestSender('terminate', worker, this._receiver.receiver);
        main_receiver_logger_1.MainReceiverLogger.log(this._receiver, this._logger);
        this._configuration = { type: 'configuration', configuration: configuration, environment: environment };
        // Initialize worker by configuration
        worker.postMessage(this._configuration);
        this._sendMessages = new buffer_call_1.BufferCall(function (messages) {
            worker.postMessage({ type: 'messages', messages: messages });
        });
        this.ping();
    }
    Object.defineProperty(MessageSenderFull.prototype, "ajax", {
        get: function () { return this._receiver.ajax; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MessageSenderFull.prototype, "performance", {
        get: function () { return this._receiver.performance; },
        enumerable: true,
        configurable: true
    });
    MessageSenderFull.prototype.send = function (message, options) {
        this._sendMessages.call(message, options && options.sync);
    };
    MessageSenderFull.prototype.dispose = function (callback) {
        var _this = this;
        var resolve = callback || (function () { });
        if (!this._disposed) {
            this._disposed = true;
            if (this._pingIntervalId) {
                clearInterval(this._pingIntervalId);
            }
            var worker_1 = this._worker;
            var handler = function () {
                try {
                    _this._sendMessages.clear();
                    _this._receiver.dispose();
                }
                finally {
                    var result = worker_1.terminate();
                    if (result && typeof result.then === 'function') {
                        result.then(function () { return resolve(); });
                    }
                    else {
                        resolve();
                    }
                }
            };
            this._terminateCommand.send(undefined, handler, handler);
        }
        else {
            resolve();
        }
    };
    MessageSenderFull.prototype.ping = function () {
        var _this = this;
        this._pingIntervalId = setInterval(function () {
            _this._worker.postMessage(_this._configuration);
        }, 5000);
    };
    return MessageSenderFull;
}());
exports.MessageSenderFull = MessageSenderFull;


/***/ }),
/* 150 */
/***/ (function(module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @internal
 */
exports.configuration = function (mode) {
    return {
        // workers: ['emulated'],
        endpoints: [
            {
                type: "fe-analytic-collector",
                url: mode === 'production' ? "https://analytics.agoda.com" : "//hkg-gc-staging.agoda.local",
                timeout: 60000,
                queues: [
                    {
                        id: "default",
                        flushTime: 1000,
                        maxFlushTime: 30000,
                        batchSize: 50,
                        maxMessageCount: 15000,
                        persistent: true,
                        attemptCount: 2,
                        fillThreshold: 0.6
                    }
                ]
            }
        ]
    };
};


/***/ }),
/* 151 */
/***/ (function(module, exports, __webpack_require__) {

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
var unload_event_1 = __webpack_require__(30);
/**
 * Call function at the end of the current JS execution flow with concatendated array
 */
var BufferCall = /** @class */ (function () {
    function BufferCall(_action) {
        var _this = this;
        this._action = _action;
        this._buffer = new Array();
        this.flush = function () {
            try {
                if (_this._buffer.length !== 0) {
                    _this._action(_this._buffer);
                }
            }
            finally {
                _this.clear();
            }
        };
    }
    BufferCall.prototype.call = function (value, sync) {
        if (sync === void 0) { sync = false; }
        (_a = this._buffer).push.apply(_a, __spread(value));
        if (sync) {
            this.flush();
        }
        else {
            if (!this.timeoutId) {
                this.timeoutId = setTimeout(this.flush);
                unload_event_1.UnloadEvent.addListener(this.flush);
            }
        }
        var _a;
    };
    BufferCall.prototype.clear = function () {
        this._buffer = new Array();
        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
            this.timeoutId = undefined;
        }
        unload_event_1.UnloadEvent.removeListener(this.flush);
    };
    return BufferCall;
}());
exports.BufferCall = BufferCall;


/***/ }),
/* 152 */
/***/ (function(module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Emit logs from MainReceiver
 *
 * @internal
 */
var MainReceiverLogger = /** @class */ (function () {
    function MainReceiverLogger() {
    }
    MainReceiverLogger.log = function (receiver, logger) {
        receiver.log.subscribe(function (log) { return MainReceiverLogger.printLog(logger, log); });
    };
    MainReceiverLogger.printLog = function (logger, log) {
        switch (log.level) {
            case 'log':
                logger.log(log.message);
                break;
            case 'error':
                logger.error(log.message);
                break;
            case 'fatal':
                logger.fatal(log.message);
                break;
            default: logger.log(log.message);
        }
    };
    return MainReceiverLogger;
}());
exports.MainReceiverLogger = MainReceiverLogger;


/***/ }),
/* 153 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var message_receiver_1 = __webpack_require__(46);
var response_emitter_1 = __webpack_require__(47);
var worker_event_receiver_1 = __webpack_require__(48);
var worker_request_receiver_1 = __webpack_require__(49);
/**
 * Class to receive events from WebWorker
 *
 * @internal
 * @class MainReceiver
 */
var MainReceiver = /** @class */ (function () {
    function MainReceiver(worker, logger) {
        /**
         * Received new ajax request
         */
        this.ajax = new response_emitter_1.OptionalResponseEmitter('{}');
        this.receiver = new message_receiver_1.MessageReceiver(worker, logger);
        this._ajax = new worker_request_receiver_1.WorkerRequestReceiver('ajax', worker, this.receiver, this.ajax);
        this._log = new worker_event_receiver_1.WorkerEventReceiver('log', this.receiver);
        this._performance = new worker_event_receiver_1.WorkerEventReceiver('performance', this.receiver);
        this.log = this._log.event.map(function (data) { return data.log; });
        this.performance = this._performance.event.map(function (data) { return data.report; });
    }
    MainReceiver.prototype.dispose = function () {
        this._ajax.dispose();
        this._log.dispose();
        this._performance.dispose();
    };
    return MainReceiver;
}());
exports.MainReceiver = MainReceiver;


/***/ }),
/* 154 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var service_worker_utils_1 = __webpack_require__(78);
var pseudo_worker_1 = __webpack_require__(50);
var service_worker_synchronous_1 = __webpack_require__(156);
/**
 * Create supported by current environment WebWorker
 *
 * @internal
 * @class WorkerProvider
 */
var WorkerProvider = /** @class */ (function () {
    function WorkerProvider(_path, _workers, _logger) {
        this._path = _path;
        this._workers = _workers;
        this._logger = _logger;
    }
    WorkerProvider.prototype.new = function () {
        var supportedWorkers = this.supportedWorker(this._workers);
        return this.create(supportedWorkers);
    };
    WorkerProvider.prototype.create = function (type) {
        this._logger.log("Creating worker: '" + type + "'");
        switch (type) {
            case 'service': return this.serviceWorker();
            case 'emulated': return this.emulatedWorker();
        }
    };
    WorkerProvider.prototype.emulatedWorker = function () {
        return new pseudo_worker_1.PseudoWorker(this._path);
    };
    WorkerProvider.prototype.serviceWorker = function () {
        var _this = this;
        return new service_worker_synchronous_1.ServiceWorkerSynchronous(this._path, function (reason) {
            _this._logger.error(reason.stack);
            return _this.create(_this.supportedWorker(['emulated']));
        });
    };
    WorkerProvider.prototype.supportedWorker = function (preference) {
        if (preference === void 0) { preference = ['service', 'emulated']; }
        if (service_worker_utils_1.ServiceWorkerUtils.isSupported() && preference.indexOf('service') >= 0) {
            return 'service';
        }
        if (preference.indexOf('emulated') >= 0) {
            return 'emulated';
        }
        return this.supportedWorker();
    };
    return WorkerProvider;
}());
exports.WorkerProvider = WorkerProvider;


/***/ }),
/* 155 */
/***/ (function(module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
function endsWith(str, searchStr, position) {
    if (position === void 0) { position = 0; }
    if (typeof str.endsWith === 'function') {
        return str.endsWith(searchStr, position);
    }
    // This works much better than >= because
    // it compensates for NaN:
    if (!(position < this.length)) {
        position = this.length;
    }
    else {
        position |= 0; // round position
    }
    return str.substr(position - searchStr.length, searchStr.length) === searchStr;
}
exports.endsWith = endsWith;


/***/ }),
/* 156 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var sync_call_1 = __webpack_require__(157);
var service_worker_wrapper_1 = __webpack_require__(158);
/**
 * Convert IWorkerInstance method calling to synchronous operations
 *
 * @internal
 */
var ServiceWorkerSynchronous = /** @class */ (function () {
    function ServiceWorkerSynchronous(path, downgrade) {
        var serviceWorker = service_worker_wrapper_1.ServiceWorkerWrapper.create(path)
            .catch(function (error) { return downgrade(error); });
        this._sync = new sync_call_1.SyncCall(serviceWorker);
    }
    ServiceWorkerSynchronous.prototype.addEventListener = function (type, listener) {
        this._sync.call(function (sw) { return sw.addEventListener(type, listener); });
    };
    ServiceWorkerSynchronous.prototype.removeEventListener = function (type, listener) {
        this._sync.call(function (sw) { return sw.removeEventListener(type, listener); });
    };
    ServiceWorkerSynchronous.prototype.terminate = function () {
        return this._sync.call(function (sw) { return sw.terminate(); });
    };
    ServiceWorkerSynchronous.prototype.postMessage = function (data) {
        this._sync.call(function (sw) { return sw.postMessage(data); });
    };
    return ServiceWorkerSynchronous;
}());
exports.ServiceWorkerSynchronous = ServiceWorkerSynchronous;


/***/ }),
/* 157 */
/***/ (function(module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Way to convert method calls for asynchronous created object to synchronous calling
 *
 * The methods should not return any values
 */
var SyncCall = /** @class */ (function () {
    function SyncCall(_async) {
        var _this = this;
        this._async = _async;
        /**
         * If object is not resolved yet, the calling will be asynchronous
         * If object already exists the, calling will be synchronous
         */
        this.call = function (func) {
            if (_this._obj) {
                return func(_this._obj);
            }
            else {
                return _this._async.then(function (obj) {
                    return func(obj);
                });
            }
        };
        this._async.then(function (obj) {
            _this._obj = obj;
        });
    }
    return SyncCall;
}());
exports.SyncCall = SyncCall;


/***/ }),
/* 158 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var service_worker_utils_1 = __webpack_require__(78);
/**
 * Call wrap service worker function to standard WebWorker API
 *
 * @internal
 */
var ServiceWorkerWrapper = /** @class */ (function () {
    function ServiceWorkerWrapper(registration, serviceWorker, container) {
        if (container === void 0) { container = navigator.serviceWorker; }
        this.registration = registration;
        this.serviceWorker = serviceWorker;
        this.container = container;
        this.subscribe();
    }
    ServiceWorkerWrapper.create = function (path) {
        if (service_worker_utils_1.ServiceWorkerUtils.isSupported()) {
            var scope = service_worker_utils_1.ServiceWorkerUtils.absoluteScope(path, 'massaging-client');
            alert(scope);
            return service_worker_utils_1.ServiceWorkerUtils.activate(path, scope).then(function (data) {
                alert(data);
                return new ServiceWorkerWrapper(data.registration, data.serviceWorker);
            }).catch(function (err) {
                alert(err);
                throw err;
            });
        }
        return Promise.reject(new Error('ServiceWorker is unsupported'));
    };
    ServiceWorkerWrapper.prototype.addEventListener = function (type, listener) {
        this.container.addEventListener(type, listener);
    };
    ServiceWorkerWrapper.prototype.removeEventListener = function (type, listener) {
        this.container.removeEventListener(type, listener);
    };
    ServiceWorkerWrapper.prototype.terminate = function () {
        this.serviceWorker.onstatechange = undefined;
        return this.registration.unregister();
    };
    ServiceWorkerWrapper.prototype.postMessage = function (data) {
        if (this.serviceWorker.state !== 'redundant') {
            this.serviceWorker.postMessage(data);
        }
    };
    ServiceWorkerWrapper.prototype.subscribe = function () {
        var _this = this;
        var serviceWorker = this.serviceWorker;
        serviceWorker.onstatechange = function () {
            if (serviceWorker.state === 'redundant') {
                serviceWorker.onstatechange = undefined;
                _this.container.getRegistration.call(_this.container, _this.registration.scope).then(function (registration) {
                    if (registration) {
                        _this.registration = registration;
                        _this.serviceWorker = registration.active || registration.installing || registration.waiting || serviceWorker;
                        _this.subscribe();
                    }
                });
            }
        };
    };
    return ServiceWorkerWrapper;
}());
exports.ServiceWorkerWrapper = ServiceWorkerWrapper;


/***/ })
/******/ ]);
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCA1YzE2YWE4MmNiNDE5ZGU0MTgzNiIsIndlYnBhY2s6Ly8vLi9zcmMvZnJhbWV3b3JrL2d1aWQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ZyYW1ld29yay91dGlscy90cmF2ZXJzYWwudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ZyYW1ld29yay9pbmRleC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZnJhbWV3b3JrL2V2ZW50LWVtaXR0ZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ZyYW1ld29yay9nbG9iYWwudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ZyYW1ld29yay90aW1lc3RhbXAudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ZyYW1ld29yay91dGlscy9leHRlbmQudHMiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS9idWlsZGluL2dsb2JhbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZnJhbWV3b3JrL3V0aWxzL2luZGV4LnRzIiwid2VicGFjazovLy8uL3NyYy9mcmFtZXdvcmsvdW5sb2FkLWV2ZW50LnRzIiwid2VicGFjazovLy8uL3NyYy9mcmFtZXdvcmsvYWpheC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZnJhbWV3b3JrL3NpbmdsZXRvbi50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZnJhbWV3b3JrL3V0aWxzL2dyb3VwQnkudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ZyYW1ld29yay91dGlscy9vdmVycmlkZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZnJhbWV3b3JrL3V0aWxzL3NhZmVDbG9uZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbG9ncy9jb25zb2xlLWxvZ2dlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbG9ncy9ldmVudC1sb2dnZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xvZ3MvdW5pdmVyc2FsLWxvZ2dlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvd29ya2Vycy9zZW5kZXJzL3dvcmtlci1yZXF1ZXN0LXNlbmRlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvd29ya2Vycy9zZW5kZXJzL21lc3NhZ2UtcmVjZWl2ZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3dvcmtlcnMvc2VuZGVycy9yZXNwb25zZS1lbWl0dGVyLnRzIiwid2VicGFjazovLy8uL3NyYy93b3JrZXJzL3NlbmRlcnMvd29ya2VyLWV2ZW50LXJlY2VpdmVyLnRzIiwid2VicGFjazovLy8uL3NyYy93b3JrZXJzL3NlbmRlcnMvd29ya2VyLXJlcXVlc3QtcmVjZWl2ZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3dvcmtlcnMvcHNldWRvLXdvcmtlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZnJhbWV3b3JrL3NjcmlwdC1sb2FkZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xpdGUtZGF0YS1jb250YWluZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21lc3NhZ2luZy1jbGllbnQtaW5zdGFuY2UudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ZyYW1ld29yay9zZXJ2aWNlLXdvcmtlci11dGlscy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbWVzc2FnaW5nLWNsaWVudC1mdWxsLnRzIiwid2VicGFjazovLy8uL3NyYy9jb25maWd1cmF0aW9ucy9kZWZhdWx0cy9lbnZpcm9ubWVudC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbWVzc2FnZS1zZW5kZXItZnVsbC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29uZmlndXJhdGlvbnMvZGVmYXVsdHMvY29uZmlndXJhdGlvbi50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZnJhbWV3b3JrL2J1ZmZlci1jYWxsLnRzIiwid2VicGFjazovLy8uL3NyYy9sb2dzL21haW4tcmVjZWl2ZXItbG9nZ2VyLnRzIiwid2VicGFjazovLy8uL3NyYy93b3JrZXJzL21haW4tcmVjZWl2ZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3dvcmtlcnMvd29ya2VyLXByb3ZpZGVyLnRzIiwid2VicGFjazovLy8uL3NyYy9mcmFtZXdvcmsvc3RyaW5ncy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvd29ya2Vycy9zZXJ2aWNlLXdvcmtlci1zeW5jaHJvbm91cy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZnJhbWV3b3JrL3N5bmMtY2FsbC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvd29ya2Vycy9zZXJ2aWNlLXdvcmtlci13cmFwcGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO0FDVkE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ25EQTs7Ozs7O0dBTUc7QUFDSDtJQVFJLHNCQUNvQixNQUF3QjtRQUF4QixrQ0FBUyxNQUFNLENBQUMsTUFBTSxFQUFFO1FBQXhCLFdBQU0sR0FBTixNQUFNLENBQWtCO1FBSDNCLGVBQVUsR0FBa0IsRUFBRSxDQUFDO1FBSzVDLElBQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUM7UUFDbEMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxHQUFHLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQztZQUMzQixTQUFTLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FB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Q0FBQyxJQUFJLENBQUMsVUFBQyxZQUF1QztvQkFDdEgsRUFBRSxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQzt3QkFDZixLQUFJLENBQUMsWUFBWSxHQUFHLFlBQVksQ0FBQzt3QkFDakMsS0FBSSxDQUFDLGFBQWEsR0FBRyxZQUFZLENBQUMsTUFBTSxJQUFJLFlBQVksQ0FBQyxVQUFVLElBQUksWUFBWSxDQUFDLE9BQU8sSUFBSSxhQUFhLENBQUM7d0JBQzdHLEtBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztvQkFDckIsQ0FBQztnQkFDTCxDQUFDLENBQUMsQ0FBQztZQUNQLENBQUM7UUFDTCxDQUFDLENBQUM7SUFDTixDQUFDO0lBQ0wsMkJBQUM7QUFBRCxDQUFDO0FBMURZLG9EQUFvQiIsImZpbGUiOiJtZXNzYWdpbmctY2xpZW50LWZ1bGwuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXSwgZmFjdG9yeSk7XG5cdGVsc2Uge1xuXHRcdHZhciBhID0gZmFjdG9yeSgpO1xuXHRcdGZvcih2YXIgaSBpbiBhKSAodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnID8gZXhwb3J0cyA6IHJvb3QpW2ldID0gYVtpXTtcblx0fVxufSkodGhpcywgZnVuY3Rpb24oKSB7XG5yZXR1cm4gXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDE0Nyk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgNWMxNmFhODJjYjQxOWRlNDE4MzYiLCIvKipcclxuICogQVBJIGRlZmluaXRpb24gZm9yIHByb3ZpZGluZyBHVUlEXHJcbiAqXHJcbiAqIEBpbnRlcm5hbFxyXG4gKiBAaW50ZXJmYWNlIElHdWlkUHJvdmlkZXJcclxuICovXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUd1aWRQcm92aWRlciB7XHJcbiAgICBuZXh0KCk6IHN0cmluZztcclxufVxyXG5cclxuLyoqXHJcbiAqIFJlYWwgR1VJRCBwcm92aWRlciBpbXBsZW1lbnRhdGlvblxyXG4gKlxyXG4gKiBAaW50ZXJuYWxcclxuICogQGNsYXNzIEd1aWRQcm92aWRlclxyXG4gKiBAaW1wbGVtZW50cyB7SUd1aWRQcm92aWRlcn1cclxuICovXHJcbmV4cG9ydCBjbGFzcyBHdWlkUHJvdmlkZXIgaW1wbGVtZW50cyBJR3VpZFByb3ZpZGVyIHtcclxuICAgIHB1YmxpYyBzdGF0aWMgX2RlZmF1bHQ6IEd1aWRQcm92aWRlcjtcclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0IGRlZmF1bHQoKTogR3VpZFByb3ZpZGVyIHtcclxuICAgICAgICByZXR1cm4gR3VpZFByb3ZpZGVyLl9kZWZhdWx0IHx8IChHdWlkUHJvdmlkZXIuX2RlZmF1bHQgPSBuZXcgR3VpZFByb3ZpZGVyKCkgKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9ieXRlVG9IZXg6IEFycmF5PHN0cmluZz4gPSBbXTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgcmFuZG9tID0gUmFuZG9tLmNyZWF0ZSgpXHJcbiAgICApIHtcclxuICAgICAgICBjb25zdCBieXRlVG9IZXggPSB0aGlzLl9ieXRlVG9IZXg7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAyNTY7ICsraSkge1xyXG4gICAgICAgICAgICBieXRlVG9IZXhbaV0gPSAoaSArIDB4MTAwKS50b1N0cmluZygxNikuc3Vic3RyKDEpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybiBhIG5ldyBndWlkXHJcbiAgICAgKlxyXG4gICAgICogVG9EbzogVGhpbmsgYWJvdXQgbW9yZSBlZmVjdGl2ZSBhbGdvcml0aG1cclxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAgICAgKiBAbWVtYmVyb2YgR3VpZFByb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBuZXh0KCkge1xyXG4gICAgICAgIGNvbnN0IHJuZHMgPSB0aGlzLnJhbmRvbS5uZXh0KCk7XHJcblxyXG4gICAgICAgIC8vIFBlciA0LjQsIHNldCBiaXRzIGZvciB2ZXJzaW9uIGFuZCBgY2xvY2tfc2VxX2hpX2FuZF9yZXNlcnZlZGBcclxuICAgICAgICBybmRzWzZdID0gKHJuZHNbNl0gJiAweDBmKSB8IDB4NDA7XHJcbiAgICAgICAgcm5kc1s4XSA9IChybmRzWzhdICYgMHgzZikgfCAweDgwO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5ieXRlc1RvVXVpZChybmRzKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGJ5dGVzVG9VdWlkKGJ1ZjogeyBbaW5kZXg6IG51bWJlcl06IG51bWJlciB9KSB7XHJcbiAgICAgICAgbGV0IGkgPSAwO1xyXG4gICAgICAgIGNvbnN0IGJ0aCA9IHRoaXMuX2J5dGVUb0hleDtcclxuICAgICAgICByZXR1cm4gYnRoW2J1ZltpKytdXSArIGJ0aFtidWZbaSsrXV0gK1xyXG4gICAgICAgICAgICAgICBidGhbYnVmW2krK11dICsgYnRoW2J1ZltpKytdXSArXHJcbiAgICAgICAgICAgICAgIGJ0aFtidWZbaSsrXV0gKyBidGhbYnVmW2krK11dICtcclxuICAgICAgICAgICAgICAgYnRoW2J1ZltpKytdXSArIGJ0aFtidWZbaSsrXV0gK1xyXG4gICAgICAgICAgICAgICBidGhbYnVmW2krK11dICsgYnRoW2J1ZltpKytdXSArXHJcbiAgICAgICAgICAgICAgIGJ0aFtidWZbaSsrXV0gKyBidGhbYnVmW2krK11dICtcclxuICAgICAgICAgICAgICAgYnRoW2J1ZltpKytdXSArIGJ0aFtidWZbaSsrXV0gK1xyXG4gICAgICAgICAgICAgICBidGhbYnVmW2krK11dICsgYnRoW2J1ZltpKytdXTtcclxuICAgIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIEJhc2VkIHJhbmRvbSBudW1iZXJzIHNvdXJjZVxyXG4gKlxyXG4gKiBAaW50ZXJuYWxcclxuICogQGFic3RyYWN0XHJcbiAqIEBjbGFzcyBSYW5kb21cclxuICovXHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBSYW5kb20ge1xyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGUgbmV3IFJhbmRvbSBnZW5lcmF0b3IgaW5zdGFuY2Ugc3VwcG9ydGVkIGJ5IGN1cnJlbnQgZW52aXJvbm1lbnRcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBjcmVhdGUoZm9yY2VTaW1wbGU6IGJvb2xlYW4gPSBmYWxzZSk6IFJhbmRvbSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBjcnlwdG8gIT09ICd1bmRlZmluZWQnXHJcbiAgICAgICAgICAgICYmIGNyeXB0by5nZXRSYW5kb21WYWx1ZXNcclxuICAgICAgICAgICAgJiYgIWZvcmNlU2ltcGxlXHJcbiAgICAgICAgKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgQ3J5cHRvUmFuZG9tKCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBTaW1wbGVSYW5kb20oKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFic3RyYWN0IG5leHQoKTogeyBbaW5kZXg6IG51bWJlcl06IG51bWJlciB9O1xyXG59XHJcblxyXG4vKipcclxuICogUHJvdmlkZSBzdHJvbmcgcmFuZG9tIHZhbHVlcyBmcm9tIENyeXB0byBBUElcclxuICpcclxuICogQGludGVybmFsXHJcbiAqIEBjbGFzcyBDcnlwdG9SYW5kb21cclxuICogQGV4dGVuZHMge1JhbmRvbX1cclxuICovXHJcbmV4cG9ydCBjbGFzcyBDcnlwdG9SYW5kb20gZXh0ZW5kcyBSYW5kb20ge1xyXG4gICAgcHVibGljIG5leHQoKTogeyBbaW5kZXg6IG51bWJlcl06IG51bWJlciB9IHtcclxuICAgICAgICAvLyBXSEFUV0cgY3J5cHRvIFJORyAtIGh0dHA6Ly93aWtpLndoYXR3Zy5vcmcvd2lraS9DcnlwdG9cclxuICAgICAgICBjb25zdCBybmRzOCA9IG5ldyBVaW50OEFycmF5KDE2KTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bmRlZlxyXG4gICAgICAgIGNyeXB0by5nZXRSYW5kb21WYWx1ZXMocm5kczgpO1xyXG4gICAgICAgIHJldHVybiBybmRzODtcclxuICAgIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIFByb3ZpZGUgcmFuZG9tIHZhbHVlcyBmcm9tIHVucHJlZGljdGFibGUgTWF0aC5yYW5kb20gZnVuY3Rpb25cclxuICpcclxuICogQGludGVybmFsXHJcbiAqIEBjbGFzcyBTaW1wbGVSYW5kb21cclxuICogQGV4dGVuZHMge1JhbmRvbX1cclxuICovXHJcbmV4cG9ydCBjbGFzcyBTaW1wbGVSYW5kb20gZXh0ZW5kcyBSYW5kb20ge1xyXG4gICAgcHJpdmF0ZSBfcm5kcyA9IG5ldyBBcnJheSgxNik7XHJcblxyXG4gICAgcHVibGljIG5leHQoKTogQXJyYXk8bnVtYmVyPiB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIHIgPSAwOyBpIDwgMTY7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoKGkgJiAweDAzKSA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgciA9IE1hdGgucmFuZG9tKCkgKiAweDEwMDAwMDAwMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLl9ybmRzW2ldID0gciA+Pj4gKChpICYgMHgwMykgPDwgMykgJiAweGZmO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5fcm5kcztcclxuICAgIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvaWZkZWYtbG9hZGVyL2lmZGVmLWxvYWRlci5qcz9ERUJVRz10cnVlJlBFUkZPUk1BTkNFX0FVRElUPXRydWUhLi9zcmMvZnJhbWV3b3JrL2d1aWQudHMiLCIvKipcclxuICogQGludGVybmFsXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gdHJhdmVyc2FsKFxyXG4gICAgY2FsbGJhY2s6IChuYW1lOiBzdHJpbmcsIHNvdXJjZVZhbHVlOiBhbnkpID0+IHZvaWQsXHJcbiAgICBkZXN0aW5hdGlvbjogYW55LFxyXG4gICAgc291cmNlczogQXJyYXk8YW55PlxyXG4pIHtcclxuICAgIC8vIERvIG5vdCB1c2UgZm9yLi5vZiB0byBhdm9pZCByZXF1aXJlIHBvbHlmaWxsc1xyXG4gICAgY29uc3QgbGVuZ3RoID0gc291cmNlcy5sZW5ndGg7XHJcbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgbGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgY29uc3Qgc291cmNlID0gc291cmNlc1tpbmRleF07XHJcblxyXG4gICAgICAgIGlmICghc291cmNlKSB7XHJcbiAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZm9yIChjb25zdCBuYW1lIGluIHNvdXJjZSkge1xyXG4gICAgICAgICAgICBpZiAoc291cmNlLmhhc093blByb3BlcnR5KG5hbWUpKSB7XHJcbiAgICAgICAgICAgICAgICBjYWxsYmFjayhuYW1lLCBzb3VyY2VbbmFtZV0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy9pZmRlZi1sb2FkZXIvaWZkZWYtbG9hZGVyLmpzP0RFQlVHPXRydWUmUEVSRk9STUFOQ0VfQVVESVQ9dHJ1ZSEuL3NyYy9mcmFtZXdvcmsvdXRpbHMvdHJhdmVyc2FsLnRzIiwiZXhwb3J0ICogZnJvbSAnLi9hamF4JztcclxuZXhwb3J0ICogZnJvbSAnLi9hamF4LWRlZmluaXRpb25zJztcclxuZXhwb3J0ICogZnJvbSAnLi9ldmVudC1lbWl0dGVyJztcclxuZXhwb3J0ICogZnJvbSAnLi9ndWlkJztcclxuZXhwb3J0ICogZnJvbSAnLi9zaW5nbGV0b24nO1xyXG5leHBvcnQgKiBmcm9tICcuL3RpbWVzdGFtcCc7XHJcbmV4cG9ydCAqIGZyb20gJy4vdXRpbHMnO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvaWZkZWYtbG9hZGVyL2lmZGVmLWxvYWRlci5qcz9ERUJVRz10cnVlJlBFUkZPUk1BTkNFX0FVRElUPXRydWUhLi9zcmMvZnJhbWV3b3JrL2luZGV4LnRzIiwiLyoqXHJcbiAqIEV2ZW50IGVtaXR0ZXIgYW5kIHN1YnNjcmliZXIgdG8gc2VuZCB0aGUgc2FtZSBtZXNzYWdlcyB0byBhIGZldyBkZXN0aW5hdGlvbnNcclxuICpcclxuICogQGludGVybmFsXHJcbiAqIEBjbGFzcyBFdmVudEVtaXR0ZXJcclxuICogQHRlbXBsYXRlIFRFdmVudFxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIEV2ZW50RW1pdHRlcjxURXZlbnQ+IHtcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgX2xpc3RlbmVycyA9IG5ldyAgQXJyYXk8RXZlbnRMaXN0ZW5lcjxURXZlbnQ+PigpO1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfYnVmZmVyID0gbmV3ICBBcnJheTxURXZlbnQ+KCk7XHJcblxyXG4gICAgcHVibGljIHN1YnNjcmliZShsaXN0ZW5lcjogRXZlbnRMaXN0ZW5lcjxURXZlbnQ+KTogRXZlbnRFbWl0dGVyPFRFdmVudD4ge1xyXG4gICAgICAgIGlmICh0eXBlb2YgbGlzdGVuZXIgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuc3Vic2NyaWJlZChsaXN0ZW5lcikgPCAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9saXN0ZW5lcnMucHVzaChsaXN0ZW5lcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRoaXMuX2J1ZmZlci5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMuZmx1c2hCdWZmZXIoKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVuc3Vic2NyaWJlKGxpc3RlbmVyOiBFdmVudExpc3RlbmVyPFRFdmVudD4pOiBFdmVudEVtaXR0ZXI8VEV2ZW50PiB7XHJcbiAgICAgICAgbGV0IGluZGV4ID0gdGhpcy5zdWJzY3JpYmVkKGxpc3RlbmVyKTtcclxuICAgICAgICB3aGlsZSAoaW5kZXggPj0gMCkge1xyXG4gICAgICAgICAgICB0aGlzLl9saXN0ZW5lcnMuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICAgICAgaW5kZXggPSB0aGlzLnN1YnNjcmliZWQobGlzdGVuZXIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xlYXIoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fbGlzdGVuZXJzLmxlbmd0aCA9IDA7XHJcbiAgICAgICAgdGhpcy5fYnVmZmVyLmxlbmd0aCA9IDA7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGVtaXQoZGF0YTogVEV2ZW50KTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgbGVuZ3RoID0gdGhpcy5fbGlzdGVuZXJzLmxlbmd0aDtcclxuICAgICAgICBpZiAobGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2xpc3RlbmVyc1tpXShkYXRhKTtcclxuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGVyKSB7IC8qZG8gbm90aGluZyovIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2J1ZmZlci5wdXNoKGRhdGEpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVkaXJlY3QoZW1pdHRlcjogRXZlbnRFbWl0dGVyPFRFdmVudD4pOiBFdmVudEVtaXR0ZXI8VEV2ZW50PiB7XHJcbiAgICAgICAgdGhpcy5zdWJzY3JpYmUoKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgIGVtaXR0ZXIuZW1pdChldmVudCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIGVtaXR0ZXI7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG1hcDxUTmV3RXZlbnQ+KGNvbnZlcnQ6IChkYXRhOiBURXZlbnQpID0+IFROZXdFdmVudCk6IEV2ZW50RW1pdHRlcjxUTmV3RXZlbnQ+IHtcclxuICAgICAgICBjb25zdCBuZXdFdmVudEVtaXR0ZXIgPSBuZXcgRXZlbnRFbWl0dGVyPFROZXdFdmVudD4oKTtcclxuICAgICAgICB0aGlzLnN1YnNjcmliZSgoZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgbmV3RXZlbnRFbWl0dGVyLmVtaXQoY29udmVydChldmVudCkpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBuZXdFdmVudEVtaXR0ZXI7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzdWJzY3JpYmVkKGxpc3RlbmVyOiBFdmVudExpc3RlbmVyPFRFdmVudD4pOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9saXN0ZW5lcnMuaW5kZXhPZihsaXN0ZW5lcik7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBmbHVzaEJ1ZmZlcigpIHtcclxuICAgICAgICBjb25zdCBidWZmZXIgPSB0aGlzLl9idWZmZXIuc2xpY2UoKTtcclxuICAgICAgICB0aGlzLl9idWZmZXIubGVuZ3RoID0gMDtcclxuICAgICAgICBjb25zdCBsZW5ndGggPSBidWZmZXIubGVuZ3RoO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy5lbWl0KGJ1ZmZlcltpXSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgdHlwZSBFdmVudExpc3RlbmVyPFRFdmVudD4gPSAoZXZlbnQ6IFRFdmVudCkgPT4gdm9pZDtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL2lmZGVmLWxvYWRlci9pZmRlZi1sb2FkZXIuanM/REVCVUc9dHJ1ZSZQRVJGT1JNQU5DRV9BVURJVD10cnVlIS4vc3JjL2ZyYW1ld29yay9ldmVudC1lbWl0dGVyLnRzIiwiLyoqXHJcbiAqIFJldHVybiBnbG9iYWwgcm9vdCBvYmplY3QgZm9yIGN1cnJlbnQgZW52aXJvbm1lbnRcclxuICpcclxuICogQGludGVybmFsXHJcbiAqIEBhYnN0cmFjdFxyXG4gKiBAY2xhc3MgR2xvYmFsUHJvdmlkZXJcclxuICovXHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBHbG9iYWxQcm92aWRlciB7XHJcbiAgICBwdWJsaWMgc3RhdGljIGN1cnJlbnQoKSB7XHJcbiAgICAgICAgY29uc3Qgcm9vdCA9IHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnID8gd2luZG93IDpcclxuICAgICAgICAgICAgICAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cclxuICAgICAgICAgICAgICAgICAgICAgdHlwZW9mIHNlbGYgICAhPT0gJ3VuZGVmaW5lZCcgPyBzZWxmIDpcclxuICAgICAgICAgICAgICAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cclxuICAgICAgICAgICAgICAgICAgICAgdHlwZW9mIGdsb2JhbCAhPT0gJ3VuZGVmaW5lZCcgPyBnbG9iYWwgOlxyXG4gICAgICAgICAgICAgICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xyXG4gICAgICAgICAgICAgICAgICAgICBudWxsO1xyXG5cclxuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cclxuICAgICAgICBpZiAoIXJvb3QpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbnN1cHBvcnRlZCBlbnZpcm9ubWVudC4nKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiByb290O1xyXG4gICAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy9pZmRlZi1sb2FkZXIvaWZkZWYtbG9hZGVyLmpzP0RFQlVHPXRydWUmUEVSRk9STUFOQ0VfQVVESVQ9dHJ1ZSEuL3NyYy9mcmFtZXdvcmsvZ2xvYmFsLnRzIiwiLyoqXHJcbiAqIEFQSSBvZiB0aW1lc3RhbXAgcHJvdmlkZXIgZGVmaW5pdGlvblxyXG4gKlxyXG4gKiBAaW50ZXJuYWxcclxuICogQGludGVyZmFjZSBJVGltZVN0YW1wUHJvdmlkZXJcclxuICovXHJcbmV4cG9ydCBpbnRlcmZhY2UgSVRpbWVTdGFtcFByb3ZpZGVyIHtcclxuICAgIG5vdygpOiBudW1iZXI7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBTaW1wbGUgdGltZXN0YW1wIHByb3ZpZGVyIGltcGxlbWVudGF0aW9uXHJcbiAqXHJcbiAqIEBpbnRlcm5hbFxyXG4gKiBAY2xhc3MgVGltZVN0YW1wUHJvdmlkZXJcclxuICogQGltcGxlbWVudHMge0lUaW1lU3RhbXBQcm92aWRlcn1cclxuICovXHJcbmV4cG9ydCBjbGFzcyBUaW1lU3RhbXBQcm92aWRlciBpbXBsZW1lbnRzIElUaW1lU3RhbXBQcm92aWRlciB7XHJcbiAgICBwdWJsaWMgbm93KCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuICtuZXcgRGF0ZSgpO1xyXG4gICAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy9pZmRlZi1sb2FkZXIvaWZkZWYtbG9hZGVyLmpzP0RFQlVHPXRydWUmUEVSRk9STUFOQ0VfQVVESVQ9dHJ1ZSEuL3NyYy9mcmFtZXdvcmsvdGltZXN0YW1wLnRzIiwiaW1wb3J0IHsgdHJhdmVyc2FsIH0gZnJvbSAnLi90cmF2ZXJzYWwnO1xyXG5cclxuLyoqXHJcbiAqIEV4dGVuZCB0aGUgZmlyc3Qgb2JqZWN0IGJ5IGFsbCBwcm9wZXJ0aWVzIGZyb20gdGhlIHNlY29uZFxyXG4gKiBSZXR1cm4gdGhlIGZpcnN0IG9iamVjdFxyXG4gKlxyXG4gKiBAaW50ZXJuYWxcclxuICogQHBhcmFtIHsqfSBkZXN0aW5hdGlvbiAtIG9iamVjdCB3aGF0IHdpbGwgYmUgZXh0ZW5kZWRcclxuICogQHBhcmFtIHsqfSBzb3VyY2UgLSBvYmplY3Qgd2l0aCBzb3VyY2UgZGF0YVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGV4dGVuZChkZXN0aW5hdGlvbjogYW55LCAuLi5zb3VyY2VzOiBBcnJheTxhbnk+KTogYW55IHtcclxuICAgIGlmICghZGVzdGluYXRpb24pIHtcclxuICAgICAgICBkZXN0aW5hdGlvbiA9IHt9O1xyXG4gICAgfVxyXG5cclxuICAgIHRyYXZlcnNhbCgobmFtZSwgc291cmNlVmFsdWUpID0+IHtcclxuICAgICAgICBpZiAoZGVzdGluYXRpb25bbmFtZV0gPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBkZXN0aW5hdGlvbltuYW1lXSA9IHNvdXJjZVZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgIH0sIGRlc3RpbmF0aW9uLCBzb3VyY2VzKTtcclxuXHJcbiAgICByZXR1cm4gZGVzdGluYXRpb247XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL2lmZGVmLWxvYWRlci9pZmRlZi1sb2FkZXIuanM/REVCVUc9dHJ1ZSZQRVJGT1JNQU5DRV9BVURJVD10cnVlIS4vc3JjL2ZyYW1ld29yay91dGlscy9leHRlbmQudHMiLCJ2YXIgZztcblxuLy8gVGhpcyB3b3JrcyBpbiBub24tc3RyaWN0IG1vZGVcbmcgPSAoZnVuY3Rpb24oKSB7XG5cdHJldHVybiB0aGlzO1xufSkoKTtcblxudHJ5IHtcblx0Ly8gVGhpcyB3b3JrcyBpZiBldmFsIGlzIGFsbG93ZWQgKHNlZSBDU1ApXG5cdGcgPSBnIHx8IEZ1bmN0aW9uKFwicmV0dXJuIHRoaXNcIikoKSB8fCAoMSxldmFsKShcInRoaXNcIik7XG59IGNhdGNoKGUpIHtcblx0Ly8gVGhpcyB3b3JrcyBpZiB0aGUgd2luZG93IHJlZmVyZW5jZSBpcyBhdmFpbGFibGVcblx0aWYodHlwZW9mIHdpbmRvdyA9PT0gXCJvYmplY3RcIilcblx0XHRnID0gd2luZG93O1xufVxuXG4vLyBnIGNhbiBzdGlsbCBiZSB1bmRlZmluZWQsIGJ1dCBub3RoaW5nIHRvIGRvIGFib3V0IGl0Li4uXG4vLyBXZSByZXR1cm4gdW5kZWZpbmVkLCBpbnN0ZWFkIG9mIG5vdGhpbmcgaGVyZSwgc28gaXQnc1xuLy8gZWFzaWVyIHRvIGhhbmRsZSB0aGlzIGNhc2UuIGlmKCFnbG9iYWwpIHsgLi4ufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGc7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAod2VicGFjaykvYnVpbGRpbi9nbG9iYWwuanNcbi8vIG1vZHVsZSBpZCA9IDIwXG4vLyBtb2R1bGUgY2h1bmtzID0gMSAyIDMiLCJleHBvcnQgKiBmcm9tICcuL2V4dGVuZCc7XHJcbmV4cG9ydCAqIGZyb20gJy4vZ3JvdXBCeSc7XHJcbmV4cG9ydCAqIGZyb20gJy4vb3ZlcnJpZGUnO1xyXG5leHBvcnQgKiBmcm9tICcuL3NhZmVDbG9uZSc7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy9pZmRlZi1sb2FkZXIvaWZkZWYtbG9hZGVyLmpzP0RFQlVHPXRydWUmUEVSRk9STUFOQ0VfQVVESVQ9dHJ1ZSEuL3NyYy9mcmFtZXdvcmsvdXRpbHMvaW5kZXgudHMiLCIvKipcclxuICogVGhlIGNsYXNzIGNob29zZXMgdGhlIGJlc3QgdW5sb2FkIGV2ZW50IGZvciBkaWZmZXJlbnQgYnJvd3NlcnNcclxuICovXHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBVbmxvYWRFdmVudCB7XHJcbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IG1vZGUgPSB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyAoKHdpbmRvdy5vbnBhZ2VoaWRlIHx8IHdpbmRvdy5vbnBhZ2VoaWRlID09PSBudWxsKSA/ICdwYWdlaGlkZScgOiAndW5sb2FkJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogJ25vbmUnO1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgYWRkTGlzdGVuZXIoaGFuZGxlcjogKGV2ZW50OiBFdmVudCkgPT4gdm9pZCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHN3aXRjaCAoVW5sb2FkRXZlbnQubW9kZSkge1xyXG4gICAgICAgICAgICBjYXNlICdwYWdlaGlkZSc6IHtcclxuICAgICAgICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdwYWdlaGlkZScsIGhhbmRsZXIpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSAndW5sb2FkJzoge1xyXG4gICAgICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3VubG9hZCcsIGhhbmRsZXIpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZGVmYXVsdDogcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIHJlbW92ZUxpc3RlbmVyKGhhbmRsZXI6IChldmVudDogRXZlbnQpID0+IHZvaWQpOiBib29sZWFuIHtcclxuICAgICAgICBzd2l0Y2ggKFVubG9hZEV2ZW50Lm1vZGUpIHtcclxuICAgICAgICAgICAgY2FzZSAncGFnZWhpZGUnOiB7XHJcbiAgICAgICAgICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncGFnZWhpZGUnLCBoYW5kbGVyKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgJ3VubG9hZCc6IHtcclxuICAgICAgICAgICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCd1bmxvYWQnLCBoYW5kbGVyKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL2lmZGVmLWxvYWRlci9pZmRlZi1sb2FkZXIuanM/REVCVUc9dHJ1ZSZQRVJGT1JNQU5DRV9BVURJVD10cnVlIS4vc3JjL2ZyYW1ld29yay91bmxvYWQtZXZlbnQudHMiLCJpbXBvcnQgeyBJQWpheE9wdGlvbnMsIElBamF4UHJvdmlkZXIgfSBmcm9tICcuL2FqYXgtZGVmaW5pdGlvbnMnO1xyXG5cclxuZGVjbGFyZSBjbGFzcyBYRG9tYWluUmVxdWVzdCB7XHJcbiAgICBwdWJsaWMgb25sb2FkOiAoKSA9PiB2b2lkO1xyXG4gICAgcHVibGljIG9uZXJyb3I6ICgpID0+IHZvaWQ7XHJcbiAgICBwdWJsaWMgdGltZW91dDogbnVtYmVyO1xyXG5cclxuICAgIHB1YmxpYyByZXNwb25zZVRleHQ6IHN0cmluZztcclxuXHJcbiAgICBwdWJsaWMgb3BlbihtZXRob2Q6IHN0cmluZywgdXJsOiBzdHJpbmcsIGFzeW5jPzogYm9vbGVhbik6IHZvaWQ7XHJcblxyXG4gICAgcHVibGljIHNlbmQoZGF0YT86IHN0cmluZyk6IHZvaWQ7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBBamF4IHByb3ZpZGVyIGltcGxlbWVudGF0aW9uXHJcbiAqL1xyXG5jbGFzcyBBamF4UmVxdWVzdCB7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF94aHI6IFhNTEh0dHBSZXF1ZXN0IHwgWERvbWFpblJlcXVlc3Q7XHJcblxyXG4gICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cclxuICAgIGNvbnN0cnVjdG9yKGNvcnM6IGJvb2xlYW4pIHtcclxuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cclxuICAgICAgICBpZiAoY29ycyAmJiB0eXBlb2YgWERvbWFpblJlcXVlc3QgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3hociA9IG5ldyBYRG9tYWluUmVxdWVzdCgpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3hociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xyXG4gICAgcHVibGljIHNlbmQob3B0aW9uczogSUFqYXhPcHRpb25zKTogUHJvbWlzZTxzdHJpbmc+IHtcclxuICAgICAgICBjb25zdCB4aHIgPSB0aGlzLl94aHI7XHJcblxyXG4gICAgICAgIGNvbnN0IHR5cGUgPSBvcHRpb25zLnR5cGUgfHwgJ1BPU1QnO1xyXG4gICAgICAgIGNvbnN0IGJvZHkgPSBvcHRpb25zLmJvZHkgfHwgJyc7XHJcbiAgICAgICAgY29uc3QgdXJsID0gb3B0aW9ucy51cmw7XHJcbiAgICAgICAgY29uc3QgdGltZW91dCA9IG9wdGlvbnMudGltZW91dDtcclxuXHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgeGhyLm9wZW4odHlwZSwgdXJsLCAvKmFzeW5jKi8gdHJ1ZSk7XHJcbiAgICAgICAgICAgIGlmICh0aW1lb3V0ICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIHhoci50aW1lb3V0ID0gdGltZW91dDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5zdWJzY3JpYmUocmVzb2x2ZSwgcmVqZWN0LCB0aW1lb3V0KTtcclxuICAgICAgICAgICAgeGhyLnNlbmQoYm9keSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cclxuICAgIHByaXZhdGUgc3Vic2NyaWJlKHJlc29sdmU6ICh2YWx1ZT86IHN0cmluZykgPT4gdm9pZCwgcmVqZWN0OiAocmVhc29uPzogc3RyaW5nKSA9PiB2b2lkLCB0aW1lb3V0OiBudW1iZXIgfCB1bmRlZmluZWQpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCB4aHIgPSB0aGlzLl94aHI7XHJcblxyXG4gICAgICAgIGNvbnN0IGxvZyA9IG5ldyBBcnJheTxudW1iZXI+KCk7XHJcblxyXG4gICAgICAgIGlmICh4aHIgaW5zdGFuY2VvZiBYTUxIdHRwUmVxdWVzdCkge1xyXG4gICAgICAgICAgICB4aHIub25yZWFkeXN0YXRlY2hhbmdlID0gKGFFdnQpID0+IHtcclxuICAgICAgICAgICAgICAgIGxvZy5wdXNoKHhoci5yZWFkeVN0YXRlKTtcclxuICAgICAgICAgICAgICAgIGlmICh4aHIucmVhZHlTdGF0ZSA9PT0gNCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh4aHIuc3RhdHVzID49IDIwMCAmJiB4aHIuc3RhdHVzIDwgMzAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoeGhyLnJlc3BvbnNlVGV4dCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KHhoci5yZXNwb25zZVRleHQgfHwgeGhyLnJlc3BvbnNlVHlwZSB8fCAnQ09SUyBwcm9ibGVtJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHhoci5vbmxvYWQgPSAoKSA9PiByZXNvbHZlKHhoci5yZXNwb25zZVRleHQpO1xyXG4gICAgICAgICAgICB4aHIub25lcnJvciA9ICgpID0+IHJlamVjdCgnWERvbWFpbiBDT1JTIHByb2JsZW0nKTtcclxuXHJcbiAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTptYXgtbGluZS1sZW5ndGhcclxuICAgICAgICAgICAgLy8gRml4ZXMgYnVnIHdpdGggSUU5OiBodHRwczovL3NvY2lhbC5tc2RuLm1pY3Jvc29mdC5jb20vRm9ydW1zL2llL2VuLVVTLzMwZWYzYWRkLTc2N2MtNDQzNi1iOGE5LWYxY2ExOWI0ODEyZS9pZTktcnRtLXhkb21haW5yZXF1ZXN0LWlzc3VlZC1yZXF1ZXN0cy1tYXktYWJvcnQtaWYtYWxsLWV2ZW50LWhhbmRsZXJzLW5vdC1zcGVjaWZpZWQ/Zm9ydW09aWV3ZWJkZXZlbG9wbWVudFxyXG4gICAgICAgICAgICAoeGhyIGFzIGFueSkub25wcm9ncmVzcyA9ICgpID0+IHsgLyoqLyB9O1xyXG4gICAgICAgICAgICAoeGhyIGFzIGFueSkub250aW1lb3V0ID0gKCkgPT4geyByZWplY3QoJ1RpbWVvdXQnKTsgfTtcclxuICAgICAgICAgICAgaWYgKHRpbWVvdXQpIHtcclxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gcmVqZWN0KCdNYW51YWwgdGltZW91dCcpLCB0aW1lb3V0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIEFqYXggcHJvdmlkZXIgY29uc3RydWN0b3JcclxuICpcclxuICogQGludGVybmFsXHJcbiAqIEBjbGFzcyBBamF4XHJcbiAqIEBpbXBsZW1lbnRzIHtJQWpheFByb3ZpZGVyfVxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIEFqYXggaW1wbGVtZW50cyBJQWpheFByb3ZpZGVyIHtcclxuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXHJcbiAgICBwdWJsaWMgc2VuZChvcHRpb25zOiBJQWpheE9wdGlvbnMpOiBQcm9taXNlPHN0cmluZz4ge1xyXG4gICAgICAgIGlmICh0eXBlb2YgZmV0Y2ggIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmZldGNoKG9wdGlvbnMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cclxuICAgICAgICBjb25zdCBpc0Fic29sdXRlVXJsID0gb3B0aW9ucy51cmwuaW5kZXhPZignOi8vJykgPiAwIHx8IG9wdGlvbnMudXJsLmluZGV4T2YoJy8vJykgPT09IDA7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBBamF4UmVxdWVzdCgvKmVuYWJsZSBDT1JTOiAqLyBpc0Fic29sdXRlVXJsKS5zZW5kKG9wdGlvbnMpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZmV0Y2gob3B0aW9uczogSUFqYXhPcHRpb25zKTogUHJvbWlzZTxzdHJpbmc+IHtcclxuICAgICAgICByZXR1cm4gZmV0Y2gob3B0aW9ucy51cmwsIHtcclxuICAgICAgICAgICAgYm9keTogb3B0aW9ucy5ib2R5LFxyXG4gICAgICAgICAgICBtZXRob2Q6IG9wdGlvbnMudHlwZVxyXG4gICAgICAgIH0pLnRoZW4oKHJlc3BvbnNlOiBSZXNwb25zZSkgPT4gLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi8gcmVzcG9uc2UudGV4dCgpKTtcclxuICAgIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvaWZkZWYtbG9hZGVyL2lmZGVmLWxvYWRlci5qcz9ERUJVRz10cnVlJlBFUkZPUk1BTkNFX0FVRElUPXRydWUhLi9zcmMvZnJhbWV3b3JrL2FqYXgudHMiLCIvLyB0c2xpbnQ6ZGlzYWJsZTpuby1hbnlcclxuLyoqXHJcbiAqIFByb3ZpZGUgc2luZ2xlIGV4ZWN1dGlvbiBvZiBwYXNzZWQgZnVuY3Rpb25cclxuICpcclxuICogQGludGVybmFsXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgU2luZ2xldG9uPFRGdW5jIGV4dGVuZHMgKC4uLmFyZ3M6IEFycmF5PGFueT4pID0+IGFueT4ge1xyXG4gICAgcHVibGljIHJlYWRvbmx5IGV4ZWN1dGVPbmNlOiBURnVuYztcclxuXHJcbiAgICBwcml2YXRlIF9leGVjdXRlZCA9IGZhbHNlO1xyXG5cclxuICAgIHByaXZhdGUgX3Jlc3VsdDogYW55O1xyXG5cclxuICAgIHB1YmxpYyBnZXQgZXhlY3V0ZWQoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl9leGVjdXRlZDsgfVxyXG5cclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgX2Z1bmM6IFRGdW5jXHJcbiAgICApIHtcclxuICAgICAgICB0aGlzLmV4ZWN1dGVPbmNlID0gdGhpcy5leGVjdXRlIGFzIFRGdW5jO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZXhlY3V0ZSA9ICguLi5hcmdzOiBBcnJheTxhbnk+KSA9PiB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2V4ZWN1dGVkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9yZXN1bHQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9yZXN1bHQgPSB0aGlzLl9mdW5jKC4uLmFyZ3MpO1xyXG5cclxuICAgICAgICB0aGlzLl9leGVjdXRlZCA9IHRydWU7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLl9yZXN1bHQ7XHJcbiAgICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL2lmZGVmLWxvYWRlci9pZmRlZi1sb2FkZXIuanM/REVCVUc9dHJ1ZSZQRVJGT1JNQU5DRV9BVURJVD10cnVlIS4vc3JjL2ZyYW1ld29yay9zaW5nbGV0b24udHMiLCIvKipcclxuICogQGludGVybmFsXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZ3JvdXBCeTxUSXRlbSwgVEtleT4oYXJyYXk6IEFycmF5PFRJdGVtPiwgcHJlZGljYXRlOiAob2JqOiBUSXRlbSkgPT4gVEtleSk6IE1hcDxUS2V5LCBBcnJheTxUSXRlbT4+IHtcclxuICAgIHJldHVybiBhcnJheS5yZWR1Y2UoKG1hcDogTWFwPFRLZXksIEFycmF5PFRJdGVtPj4sIGN1cnJlbnQ6IFRJdGVtKSA9PiB7XHJcbiAgICAgICAgY29uc3Qga2V5ID0gcHJlZGljYXRlKGN1cnJlbnQpO1xyXG4gICAgICAgIGxldCBwcmV2ID0gbWFwLmdldChrZXkpO1xyXG4gICAgICAgIGlmICghcHJldikge1xyXG4gICAgICAgICAgICBtYXAuc2V0KGtleSwgcHJldiA9IFtdKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHJldi5wdXNoKGN1cnJlbnQpO1xyXG4gICAgICAgIHJldHVybiBtYXA7XHJcbiAgICB9LCBuZXcgTWFwPFRLZXksIEFycmF5PFRJdGVtPj4oKSk7XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL2lmZGVmLWxvYWRlci9pZmRlZi1sb2FkZXIuanM/REVCVUc9dHJ1ZSZQRVJGT1JNQU5DRV9BVURJVD10cnVlIS4vc3JjL2ZyYW1ld29yay91dGlscy9ncm91cEJ5LnRzIiwiaW1wb3J0IHsgdHJhdmVyc2FsIH0gZnJvbSAnLi90cmF2ZXJzYWwnO1xyXG5cclxuLyoqXHJcbiAqIE92ZXJyaWRlIHRoZSBmaXJzdCBvYmplY3QgYnkgYWxsIHByb3BlcnRpZXMgZnJvbSB0aGUgc2Vjb25kXHJcbiAqIFJldHVybiB0aGUgZmlyc3Qgb2JqZWN0XHJcbiAqXHJcbiAqIEBpbnRlcm5hbFxyXG4gKiBAcGFyYW0geyp9IGRlc3RpbmF0aW9uIC0gb2JqZWN0IHdoYXQgd2lsbCBiZSBvdmVycmlkZWRcclxuICogQHBhcmFtIHsqfSBzb3VyY2UgLSBvYmplY3Qgd2l0aCBzb3VyY2UgZGF0YVxyXG4gKi9cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBvdmVycmlkZShkZXN0aW5hdGlvbjogYW55LCAuLi5zb3VyY2VzOiBBcnJheTxhbnk+KTogYW55IHtcclxuICAgIGlmICghZGVzdGluYXRpb24pIHtcclxuICAgICAgICBkZXN0aW5hdGlvbiA9IHt9O1xyXG4gICAgfVxyXG5cclxuICAgIHRyYXZlcnNhbCgobmFtZSwgc291cmNlVmFsdWUpID0+IHtcclxuICAgICAgICBkZXN0aW5hdGlvbltuYW1lXSA9IHNvdXJjZVZhbHVlO1xyXG4gICAgfSwgZGVzdGluYXRpb24sIHNvdXJjZXMpO1xyXG5cclxuICAgIHJldHVybiBkZXN0aW5hdGlvbjtcclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvaWZkZWYtbG9hZGVyL2lmZGVmLWxvYWRlci5qcz9ERUJVRz10cnVlJlBFUkZPUk1BTkNFX0FVRElUPXRydWUhLi9zcmMvZnJhbWV3b3JrL3V0aWxzL292ZXJyaWRlLnRzIiwiaW1wb3J0IHsgdHJhdmVyc2FsIH0gZnJvbSAnLi90cmF2ZXJzYWwnO1xyXG5cclxuLyoqXHJcbiAqIENsb25lIG9iamVjdCBkYXRhIHdpdGhvdXQgZnVuY3Rpb25zXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gc2FmZUNsb25lKHNvdXJjZTogYW55KTogYW55IHtcclxuICAgIGNvbnN0IGRlc3RpbmF0aW9uOiBhbnkgPSB7IH07XHJcblxyXG4gICAgdHJhdmVyc2FsKChuYW1lLCBzb3VyY2VWYWx1ZSkgPT4ge1xyXG4gICAgICAgIGlmICh0eXBlb2YgKHNvdXJjZVZhbHVlKSAhPT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICBkZXN0aW5hdGlvbltuYW1lXSA9IHNvdXJjZVZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgIH0sIGRlc3RpbmF0aW9uLCBbIHNvdXJjZSBdKTtcclxuXHJcbiAgICByZXR1cm4gZGVzdGluYXRpb247XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL2lmZGVmLWxvYWRlci9pZmRlZi1sb2FkZXIuanM/REVCVUc9dHJ1ZSZQRVJGT1JNQU5DRV9BVURJVD10cnVlIS4vc3JjL2ZyYW1ld29yay91dGlscy9zYWZlQ2xvbmUudHMiLCJpbXBvcnQgeyBJTG9nZ2VyIH0gZnJvbSAnLi9sb2dnZXInO1xyXG5cclxuLyoqXHJcbiAqIFByaW50IGludGVybmFsIGxvZyBtZXNzYWdlcyBpbiBicm93c2VyIGNvbnNvbGVcclxuICpcclxuICogSXMgbm90IHN1cHBvcnRlZCBmb3Igc29tZSBlbnZpcm9ubWVudFxyXG4gKlxyXG4gKiBAaW50ZXJuYWxcclxuICogQGNsYXNzIENvbnNvbGVMb2dnZXJcclxuICogQGltcGxlbWVudHMge0lMb2dnZXJ9XHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgQ29uc29sZUxvZ2dlciBpbXBsZW1lbnRzIElMb2dnZXIge1xyXG4gICAgcHVibGljIHJlYWRvbmx5IHByZWZpeDogc3RyaW5nID0gYFttZXNzYWdpbmctY2xpZW50LmpzXTogYDtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IF9vcHRpb25zOiB7IG11dGU6IGJvb2xlYW4gfVxyXG4gICAgKSB7IH1cclxuXHJcbiAgICBwdWJsaWMgZmF0YWwobWVzc2FnZTogc3RyaW5nLCBlcnJvcj86IEVycm9yKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9vcHRpb25zLm11dGUpIHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcih0aGlzLnByZWZpeCArIG1lc3NhZ2UsIGVycm9yKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGVycm9yKG1lc3NhZ2U6IHN0cmluZywgZXJyb3I/OiBFcnJvcik6IHZvaWQge1xyXG4gICAgICAgIGlmICghdGhpcy5fb3B0aW9ucy5tdXRlKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IodGhpcy5wcmVmaXggKyBtZXNzYWdlLCBlcnJvcik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBsb2cobWVzc2FnZTogc3RyaW5nKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9vcHRpb25zLm11dGUpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5wcmVmaXggKyBtZXNzYWdlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL2lmZGVmLWxvYWRlci9pZmRlZi1sb2FkZXIuanM/REVCVUc9dHJ1ZSZQRVJGT1JNQU5DRV9BVURJVD10cnVlIS4vc3JjL2xvZ3MvY29uc29sZS1sb2dnZXIudHMiLCJpbXBvcnQgeyBFdmVudEVtaXR0ZXIgfSBmcm9tICcuLi9mcmFtZXdvcmsvZXZlbnQtZW1pdHRlcic7XHJcbmltcG9ydCB7IElMb2dnZXIgfSBmcm9tICcuL2xvZ2dlcic7XHJcbmltcG9ydCB7IElXb3JrZXJMb2cgfSBmcm9tICcuL3dvcmtlci1sb2cnO1xyXG5cclxuLyoqXHJcbiAqIFNlbmQgbG9nIG1lc3NhZ2VzIGludG8gRXZlbnRFbWl0dGVyXHJcbiAqXHJcbiAqIEBpbnRlcm5hbFxyXG4gKiBAY2xhc3MgRXZlbnRMb2dnZXJcclxuICogQGltcGxlbWVudHMge0lMb2dnZXJ9XHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgRXZlbnRMb2dnZXIgaW1wbGVtZW50cyBJTG9nZ2VyIHtcclxuICAgIHB1YmxpYyByZWFkb25seSBvbmxvZyA9IG5ldyBFdmVudEVtaXR0ZXI8SVdvcmtlckxvZz4oKTtcclxuXHJcbiAgICBwdWJsaWMgZmF0YWwobWVzc2FnZTogc3RyaW5nLCBlcnJvcj86IEVycm9yKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5vbmxvZy5lbWl0KHtsZXZlbDogJ2ZhdGFsJywgbWVzc2FnZSwgZXJyb3J9KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZXJyb3IobWVzc2FnZTogc3RyaW5nLCBlcnJvcj86IEVycm9yKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5vbmxvZy5lbWl0KHtsZXZlbDogJ2Vycm9yJywgbWVzc2FnZSwgZXJyb3J9KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbG9nKG1lc3NhZ2U6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMub25sb2cuZW1pdCh7bGV2ZWw6ICdsb2cnLCBtZXNzYWdlfSk7XHJcbiAgICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL2lmZGVmLWxvYWRlci9pZmRlZi1sb2FkZXIuanM/REVCVUc9dHJ1ZSZQRVJGT1JNQU5DRV9BVURJVD10cnVlIS4vc3JjL2xvZ3MvZXZlbnQtbG9nZ2VyLnRzIiwiaW1wb3J0IHsgSUxvZ2dlciB9IGZyb20gJy4vbG9nZ2VyJztcclxuXHJcbi8qKlxyXG4gKiBQcm94eSBsb2dnZXIgdG8gcmVzZW5kIGFsbCBsb2cgbWVzc2FnZXMgdG8gYW5vdGhlciBsb2dnZXJzXHJcbiAqXHJcbiAqIEBpbnRlcm5hbFxyXG4gKiBAY2xhc3MgVW5pdmVyc2FsTG9nZ2VyXHJcbiAqIEBpbXBsZW1lbnRzIHtJTG9nZ2VyfVxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFVuaXZlcnNhbExvZ2dlciBpbXBsZW1lbnRzIElMb2dnZXIge1xyXG4gICAgcHVibGljIGVuYWJsZWQ6IGJvb2xlYW4gPSB0cnVlO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBsb2dnZXJzOiBBcnJheTxJTG9nZ2VyPiA9IFtdXHJcbiAgICApIHsgfVxyXG5cclxuICAgIHB1YmxpYyBmYXRhbChtZXNzYWdlOiBzdHJpbmcsIGVycm9yPzogRXJyb3IpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5lbmFibGVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9nZ2VyKChsKSA9PiBsLmZhdGFsKG1lc3NhZ2UsIGVycm9yKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBlcnJvcihtZXNzYWdlOiBzdHJpbmcsIGVycm9yPzogRXJyb3IpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5lbmFibGVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9nZ2VyKChsKSA9PiBsLmVycm9yKG1lc3NhZ2UsIGVycm9yKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBsb2cobWVzc2FnZTogc3RyaW5nKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuZW5hYmxlZCkge1xyXG4gICAgICAgICAgICB0aGlzLmxvZ2dlcigobCkgPT4gbC5sb2cobWVzc2FnZSkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlcGxhY2UgZXhpc3RpbmcgbG9nZ2VycyB0byBuZXcgb25lc1xyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7QXJyYXk8SUxvZ2dlcj59IGxvZ2dlcnNcclxuICAgICAqIEBtZW1iZXJvZiBVbml2ZXJzYWxMb2dnZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIHJlcGxhY2UobmV3TG9nZ2VyczogQXJyYXk8SUxvZ2dlcj4pOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmxvZ2dlcnMubGVuZ3RoID0gMDtcclxuXHJcbiAgICAgICAgY29uc3QgbGVuZ3RoID0gbmV3TG9nZ2Vycy5sZW5ndGg7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLmxvZ2dlcnMucHVzaChuZXdMb2dnZXJzW2ldKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBsb2dnZXIoZXhlY3V0ZTogKGxvZ2dlcjogSUxvZ2dlcikgPT4gdm9pZCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IGxvZ2dlcnMgPSB0aGlzLmxvZ2dlcnM7XHJcbiAgICAgICAgY29uc3QgbGVuZ3RoID0gbG9nZ2Vycy5sZW5ndGg7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBleGVjdXRlKGxvZ2dlcnNbaV0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvaWZkZWYtbG9hZGVyL2lmZGVmLWxvYWRlci5qcz9ERUJVRz10cnVlJlBFUkZPUk1BTkNFX0FVRElUPXRydWUhLi9zcmMvbG9ncy91bml2ZXJzYWwtbG9nZ2VyLnRzIiwiaW1wb3J0IHsgR3VpZFByb3ZpZGVyIH0gZnJvbSAnLi4vLi4vZnJhbWV3b3JrL2d1aWQnO1xyXG5pbXBvcnQgeyBJV29ya2VyTWVzc2FnZSwgSVdvcmtlck1lc3NhZ2VSZWNlaXZlciwgSVdvcmtlck1lc3NhZ2VTZW5kZXIsIFdvcmtlckRhdGFUeXBlIH0gZnJvbSAnLi4vd29ya2VyLWRlZmluaXRpb25zJztcclxuaW1wb3J0IHsgSVJlcXVlc3RFbnZlbG9wIH0gZnJvbSAnLi93b3JrZXItcmVxdWVzdC1yZWNlaXZlcic7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElSZXNwb25zZUVudmVsb3A8VFR5cGUgZXh0ZW5kcyBXb3JrZXJEYXRhVHlwZSwgVFJlc3BvbnNlPiBleHRlbmRzIElXb3JrZXJNZXNzYWdlPFRUeXBlPiAge1xyXG4gICAgcmVzcG9uc2U/OiBUUmVzcG9uc2U7XHJcblxyXG4gICAgZXJyb3I/OiB7IG1lc3NhZ2U6IHN0cmluZyB9O1xyXG5cclxuICAgIG1lc3NhZ2VJZDogc3RyaW5nO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElFcnJvciB7XHJcbiAgICBtZXNzYWdlOiBzdHJpbmc7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBXb3JrZXJSZXF1ZXN0U2VuZGVyPFRUeXBlIGV4dGVuZHMgV29ya2VyRGF0YVR5cGUsIFRSZXF1ZXN0LCBUUmVzcG9uc2U+IHtcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgX2RpY3Rpb25hcnk6IHtcclxuICAgICAgICBbbWVzc2FnZWlkOiBzdHJpbmddOiB7XHJcbiAgICAgICAgICAgIHJlc29sdmU/OiAocmVzcG9uc2U/OiBUUmVzcG9uc2UpID0+IHZvaWQsXHJcbiAgICAgICAgICAgIHJlamVjdD86IChlcnJvcjogSUVycm9yKSA9PiB2b2lkXHJcbiAgICAgICAgfVxyXG4gICAgfSA9IHsgfTtcclxuXHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9ndWlkID0gR3VpZFByb3ZpZGVyLmRlZmF1bHQ7XHJcblxyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IHR5cGU6IFRUeXBlLFxyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgX3NlbmRlcjogSVdvcmtlck1lc3NhZ2VTZW5kZXIsXHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBfcmVjZWl2ZXI6IElXb3JrZXJNZXNzYWdlUmVjZWl2ZXJcclxuICAgICkge1xyXG4gICAgICAgIF9yZWNlaXZlci5hZGRFdmVudExpc3RlbmVyKHR5cGUsIHRoaXMuX3Jlc3BvbnNlKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2VuZChkYXRhPzogVFJlcXVlc3QsIHJlc29sdmVkPzogKHJlc3BvbnNlOiBUUmVzcG9uc2UpID0+IHZvaWQsIHJlamVjdGVkPzogKGVycm9yOiBJRXJyb3IpID0+IHZvaWQpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBtZXNzYWdlSWQgPSB0aGlzLl9ndWlkLm5leHQoKTtcclxuXHJcbiAgICAgICAgdGhpcy5fZGljdGlvbmFyeVttZXNzYWdlSWRdID0geyByZXNvbHZlOiByZXNvbHZlZCwgcmVqZWN0OiByZWplY3RlZCB9O1xyXG5cclxuICAgICAgICBjb25zdCByZXN1bHQgPSB0aGlzLl9zZW5kZXIucG9zdE1lc3NhZ2UoeyB0eXBlOiB0aGlzLnR5cGUsIG1lc3NhZ2VJZCwgcmVxdWVzdDogZGF0YSB9IGFzIElSZXF1ZXN0RW52ZWxvcDxUVHlwZSwgVFJlcXVlc3Q+KTtcclxuICAgICAgICBpZiAocmVzdWx0ICYmIHR5cGVvZiByZXN1bHQuY2F0Y2ggPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgICAgcmVzdWx0LmNhdGNoKHJlamVjdGVkKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGRpc3Bvc2UoKSB7XHJcbiAgICAgICAgdGhpcy5fcmVjZWl2ZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcih0aGlzLnR5cGUsIHRoaXMuX3Jlc3BvbnNlKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9yZXNwb25zZSA9IChkYXRhOiBJUmVzcG9uc2VFbnZlbG9wPFRUeXBlLCBUUmVzcG9uc2U+KSA9PiB7XHJcbiAgICAgICAgY29uc3QgbWVzc2FnZUlkID0gZGF0YS5tZXNzYWdlSWQ7XHJcblxyXG4gICAgICAgIGlmIChtZXNzYWdlSWQpIHtcclxuICAgICAgICAgICAgY29uc3QgY2FsbGJhY2tzID0gdGhpcy5fZGljdGlvbmFyeVttZXNzYWdlSWRdO1xyXG4gICAgICAgICAgICBkZWxldGUgdGhpcy5fZGljdGlvbmFyeVttZXNzYWdlSWRdO1xyXG5cclxuICAgICAgICAgICAgaWYgKGNhbGxiYWNrcykge1xyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEuZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGNhbGxiYWNrcy5yZWplY3QgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2tzLnJlamVjdChkYXRhLmVycm9yKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgY2FsbGJhY2tzLnJlc29sdmUgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2tzLnJlc29sdmUoZGF0YS5yZXNwb25zZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy9pZmRlZi1sb2FkZXIvaWZkZWYtbG9hZGVyLmpzP0RFQlVHPXRydWUmUEVSRk9STUFOQ0VfQVVESVQ9dHJ1ZSEuL3NyYy93b3JrZXJzL3NlbmRlcnMvd29ya2VyLXJlcXVlc3Qtc2VuZGVyLnRzIiwiaW1wb3J0IHsgSUxvZ2dlciB9IGZyb20gJy4uLy4uL2xvZ3MvbG9nZ2VyJztcclxuaW1wb3J0IHsgSUxpc3RlbmVyLCBJV29ya2VyTWVzc2FnZSwgSVdvcmtlck1lc3NhZ2VSZWNlaXZlciwgTWVzc2FnZUV2ZW50TGlzdGVuZXIsIFdvcmtlckRhdGFUeXBlIH0gZnJvbSAnLi4vd29ya2VyLWRlZmluaXRpb25zJztcclxuXHJcbi8qKlxyXG4gKiBDbGFzcyBjb252ZXJ0cyBqYXZhc2NyaXB0IG1lc3NhZ2VzIHdpdGggc3RhbmRhcmQgZXZlbnQgJ21lc3NhZ2UnIHRvIHN0cm9uZ2x5IHR5cGVkIGN1c3RvbSBtZXNzYWdlc1xyXG4gKlxyXG4gKiBAaW50ZXJuYWxcclxuICovXHJcbmV4cG9ydCBjbGFzcyBNZXNzYWdlUmVjZWl2ZXIgaW1wbGVtZW50cyBJV29ya2VyTWVzc2FnZVJlY2VpdmVyIHtcclxuICAgIHByaXZhdGUgX2RpYzogeyBbdHlwZTogc3RyaW5nXTogQXJyYXk8SUxpc3RlbmVyPGFueT4+IH0gPSB7IH07XHJcbiAgICBwcml2YXRlIF9idWZmZXJzOiB7IFt0eXBlOiBzdHJpbmddOiBBcnJheTxNZXNzYWdlRXZlbnQ+IH0gPSB7IH07XHJcblxyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBfcmVjZWl2ZXI6IHtcclxuICAgICAgICAgICAgYWRkRXZlbnRMaXN0ZW5lcjogKHR5cGU6ICdtZXNzYWdlJywgbGlzdGVuZXI6IE1lc3NhZ2VFdmVudExpc3RlbmVyKSA9PiB2b2lkLFxyXG4gICAgICAgICAgICByZW1vdmVFdmVudExpc3RlbmVyOiAodHlwZTogJ21lc3NhZ2UnLCBsaXN0ZW5lcjogTWVzc2FnZUV2ZW50TGlzdGVuZXIpID0+IHZvaWRcclxuICAgICAgICB9LFxyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgX2xvZ2dlcjogSUxvZ2dlclxyXG4gICAgKSB7XHJcbiAgICAgICAgX3JlY2VpdmVyLmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCB0aGlzLl9oYW5kbGVyKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYWRkRXZlbnRMaXN0ZW5lcjxUTWVzc2FnZSBleHRlbmRzIElXb3JrZXJNZXNzYWdlPFdvcmtlckRhdGFUeXBlPj4odHlwZTogc3RyaW5nLCBsaXN0ZW5lcjogSUxpc3RlbmVyPFRNZXNzYWdlPikge1xyXG4gICAgICAgIGNvbnN0IGxpc3RlbmVycyA9IHRoaXMuX2RpY1t0eXBlXSA9IHRoaXMuX2RpY1t0eXBlXSB8fCBbXTtcclxuXHJcbiAgICAgICAgbGlzdGVuZXJzLnB1c2gobGlzdGVuZXIpO1xyXG5cclxuICAgICAgICB0aGlzLmZsdXNoQnVmZmVyKHR5cGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZW1vdmVFdmVudExpc3RlbmVyPFRNZXNzYWdlIGV4dGVuZHMgSVdvcmtlck1lc3NhZ2U8V29ya2VyRGF0YVR5cGU+Pih0eXBlOiBzdHJpbmcsIGxpc3RlbmVyOiBJTGlzdGVuZXI8VE1lc3NhZ2U+KSB7XHJcbiAgICAgICAgY29uc3QgbGlzdGVuZXJzID0gdGhpcy5fZGljW3R5cGVdO1xyXG5cclxuICAgICAgICBpZiAobGlzdGVuZXJzKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGluZGV4ID0gbGlzdGVuZXJzLmluZGV4T2YobGlzdGVuZXIpO1xyXG4gICAgICAgICAgICBpZiAoaW5kZXggPj0gMCkge1xyXG4gICAgICAgICAgICAgICAgbGlzdGVuZXJzLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChsaXN0ZW5lcnMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBkZWxldGUgdGhpcy5fZGljW3R5cGVdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBkaXNwb3NlKCkge1xyXG4gICAgICAgIHRoaXMuX2RpYyA9IHsgfTtcclxuICAgICAgICB0aGlzLl9idWZmZXJzID0geyB9O1xyXG4gICAgICAgIHRoaXMuX3JlY2VpdmVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCB0aGlzLl9oYW5kbGVyKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGZsdXNoQnVmZmVyKHR5cGU6IHN0cmluZykge1xyXG4gICAgICAgIGNvbnN0IGJ1ZmZlciA9IHRoaXMuX2J1ZmZlcnNbdHlwZV07XHJcbiAgICAgICAgaWYgKGJ1ZmZlciAmJiBidWZmZXIubGVuZ3RoICE9PSAwKSB7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbGVuZ3RoID0gYnVmZmVyLmxlbmd0aDtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9oYW5kbGVyKGJ1ZmZlcltpXSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBidWZmZXIubGVuZ3RoID0gMDtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX2hhbmRsZXIgPSAoZXZlbnQ6IE1lc3NhZ2VFdmVudCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHJlcXVlc3QgPSBldmVudC5kYXRhIGFzIElXb3JrZXJNZXNzYWdlPFdvcmtlckRhdGFUeXBlPjtcclxuXHJcbiAgICAgICAgaWYgKHJlcXVlc3QgJiYgcmVxdWVzdC50eXBlKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGxpc3RlbmVycyA9IHRoaXMuX2RpY1tyZXF1ZXN0LnR5cGVdO1xyXG5cclxuICAgICAgICAgICAgaWYgKGxpc3RlbmVycykge1xyXG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBsaXN0ZW5lciBvZiBsaXN0ZW5lcnMpIHtcclxuICAgICAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsaXN0ZW5lcihyZXF1ZXN0KTtcclxuICAgICAgICAgICAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9sb2dnZXIuZXJyb3IoYEVycm9yIG9uIGV4ZWN1dGluZyBsaXN0ZW5lciBmb3IgbWVzc2FnZSB0eXBlICR7cmVxdWVzdC50eXBlfWAsIGVycm9yKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBidWZmZXIgPSB0aGlzLl9idWZmZXJzW3JlcXVlc3QudHlwZV0gfHwgKHRoaXMuX2J1ZmZlcnNbcmVxdWVzdC50eXBlXSA9IFtdKTtcclxuICAgICAgICAgICAgICAgIGJ1ZmZlci5wdXNoKGV2ZW50KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvaWZkZWYtbG9hZGVyL2lmZGVmLWxvYWRlci5qcz9ERUJVRz10cnVlJlBFUkZPUk1BTkNFX0FVRElUPXRydWUhLi9zcmMvd29ya2Vycy9zZW5kZXJzL21lc3NhZ2UtcmVjZWl2ZXIudHMiLCJleHBvcnQgaW50ZXJmYWNlIElSZXNwb25zZUVtaXR0ZXI8VFJlcXVlc3QsIFRSZXNwb25zZT4ge1xyXG4gICAgaW52b2tlKHJlcXVlc3Q6IFRSZXF1ZXN0KTogVFJlc3BvbnNlIHwgUHJvbWlzZTxUUmVzcG9uc2U+O1xyXG5cclxuICAgIHN0b3AoKTogdm9pZDtcclxufVxyXG5cclxuZXhwb3J0IHR5cGUgSUhhbmRsZXI8VFJlcXVlc3QsIFRSZXNwb25zZT4gPSAocmVxdWVzdDogVFJlcXVlc3QpID0+IFRSZXNwb25zZSB8IFByb21pc2U8VFJlc3BvbnNlPjtcclxuXHJcbi8qKlxyXG4gKiBIYW5kbGVyIGZvciB0aGlzIGVtaXR0ZXIgaXMgb3B0aW9uYWwuXHJcbiAqIERlZmF1bHQgdmFsdWUgd2lsbCBiZSByZXR1cm5lZCBvbiB1bmRlZmluZWQgaGFuZGxlci5cclxuICovXHJcbmV4cG9ydCBjbGFzcyBPcHRpb25hbFJlc3BvbnNlRW1pdHRlcjxUUmVxdWVzdCwgVFJlc3BvbnNlPiBpbXBsZW1lbnRzIElSZXNwb25zZUVtaXR0ZXI8VFJlcXVlc3QsIFRSZXNwb25zZT4ge1xyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IGRlZjogVFJlc3BvbnNlLFxyXG4gICAgICAgIHB1YmxpYyBoYW5kbGVyPzogSUhhbmRsZXI8VFJlcXVlc3QsIFRSZXNwb25zZT5cclxuICAgICkgeyB9XHJcblxyXG4gICAgcHVibGljIHJlYWRvbmx5IGludm9rZSA9IChyZXF1ZXN0OiBUUmVxdWVzdCk6IFRSZXNwb25zZSB8IFByb21pc2U8VFJlc3BvbnNlPiA9PiB7XHJcbiAgICAgICAgaWYgKHRoaXMuaGFuZGxlcikge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5oYW5kbGVyKHJlcXVlc3QpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5kZWY7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0b3AoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5oYW5kbGVyID0gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG59XHJcblxyXG4vKipcclxuICogSGFuZGxlciBmb3IgdGhpcyBlbWl0dGVyIGlzIG1hbmRhdG9yeS5cclxuICogQWxsIHJlcXVlc3RzIHdpdGhvdXQgaGFuZGxlciB3aWxsIGJlIGJ1ZmVycmVkIGFuZCBwYXNzZWQgdG8gYSBuZXcgaGFuZGxlciBvbiBpdHMgc2V0dGluZy5cclxuICovXHJcbmV4cG9ydCBjbGFzcyBNYW5kYXRvcnlSZXNwb25zZUVtaXR0ZXI8VFJlcXVlc3QsIFRSZXNwb25zZT4gaW1wbGVtZW50cyBJUmVzcG9uc2VFbWl0dGVyPFRSZXF1ZXN0LCBUUmVzcG9uc2U+IHtcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgX2J1ZmZlciA9IG5ldyBBcnJheTx7IHJlcXVlc3Q6IFRSZXF1ZXN0LCByZXNvbHZlOiAocmVzcG9uc2U6IFRSZXNwb25zZSB8IFByb21pc2VMaWtlPFRSZXNwb25zZT4pID0+IHZvaWQgfT4oKTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwcml2YXRlIF9oYW5kbGVyPzogSUhhbmRsZXI8VFJlcXVlc3QsIFRSZXNwb25zZT5cclxuICAgICkgeyB9XHJcblxyXG4gICAgcHVibGljIGdldCBoYW5kbGVyKCk6IHVuZGVmaW5lZCB8IElIYW5kbGVyPFRSZXF1ZXN0LCBUUmVzcG9uc2U+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5faGFuZGxlcjtcclxuICAgIH1cclxuICAgIHB1YmxpYyBzZXQgaGFuZGxlcih2YWx1ZTogdW5kZWZpbmVkIHwgSUhhbmRsZXI8VFJlcXVlc3QsIFRSZXNwb25zZT4pIHtcclxuICAgICAgICB0aGlzLl9oYW5kbGVyID0gdmFsdWU7XHJcbiAgICAgICAgdGhpcy5mbHVzaEJ1ZmZlcigpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZWFkb25seSBpbnZva2UgPSAocmVxdWVzdDogVFJlcXVlc3QpOiBUUmVzcG9uc2UgfCBQcm9taXNlPFRSZXNwb25zZT4gPT4ge1xyXG4gICAgICAgIGlmICh0aGlzLmhhbmRsZXIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaGFuZGxlcihyZXF1ZXN0KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5fYnVmZmVyLnB1c2goeyByZXF1ZXN0LCByZXNvbHZlIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdG9wKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuaGFuZGxlciA9IHVuZGVmaW5lZDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGZsdXNoQnVmZmVyKCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9oYW5kbGVyICYmIHRoaXMuX2J1ZmZlci5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIGZvciAoY29uc3QgZGF0YSBvZiB0aGlzLl9idWZmZXIpIHtcclxuICAgICAgICAgICAgICAgIGRhdGEucmVzb2x2ZSh0aGlzLmludm9rZShkYXRhLnJlcXVlc3QpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvaWZkZWYtbG9hZGVyL2lmZGVmLWxvYWRlci5qcz9ERUJVRz10cnVlJlBFUkZPUk1BTkNFX0FVRElUPXRydWUhLi9zcmMvd29ya2Vycy9zZW5kZXJzL3Jlc3BvbnNlLWVtaXR0ZXIudHMiLCJpbXBvcnQgeyBFdmVudEVtaXR0ZXIgfSBmcm9tICcuLi8uLi9mcmFtZXdvcmsvZXZlbnQtZW1pdHRlcic7XHJcbmltcG9ydCB7IElXb3JrZXJNZXNzYWdlLCBJV29ya2VyTWVzc2FnZVJlY2VpdmVyLCBXb3JrZXJEYXRhVHlwZSB9IGZyb20gJy4uL3dvcmtlci1kZWZpbml0aW9ucyc7XHJcblxyXG4vKipcclxuICogQ2xhc3Mgd3JhcHBlciBmb3IgcmVjZWl2aW5nIG1lc3NhZ2VzIGFzIHR5cGVkIGV2ZW50c1xyXG4gKlxyXG4gKiBAaW50ZXJuYWxcclxuICovXHJcbmV4cG9ydCBjbGFzcyBXb3JrZXJFdmVudFJlY2VpdmVyPFRUeXBlIGV4dGVuZHMgV29ya2VyRGF0YVR5cGUsIFRXb3JrZXJNZXNzYWdlIGV4dGVuZHMgSVdvcmtlck1lc3NhZ2U8VFR5cGU+PiB7XHJcbiAgICBwdWJsaWMgcmVhZG9ubHkgZXZlbnQ6IEV2ZW50RW1pdHRlcjxUV29ya2VyTWVzc2FnZT4gPSBuZXcgRXZlbnRFbWl0dGVyPFRXb3JrZXJNZXNzYWdlPigpO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHB1YmxpYyByZWFkb25seSB0eXBlOiBUVHlwZSxcclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IF9yZWNlaXZlcjogSVdvcmtlck1lc3NhZ2VSZWNlaXZlclxyXG4gICAgKSB7XHJcbiAgICAgICAgX3JlY2VpdmVyLmFkZEV2ZW50TGlzdGVuZXIodHlwZSwgdGhpcy5faGFuZGxlcik7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGRpc3Bvc2UoKSB7XHJcbiAgICAgICAgdGhpcy5fcmVjZWl2ZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcih0aGlzLnR5cGUsIHRoaXMuX2hhbmRsZXIpO1xyXG4gICAgICAgIHRoaXMuZXZlbnQuY2xlYXIoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9oYW5kbGVyID0gKGRhdGE6IFRXb3JrZXJNZXNzYWdlKSA9PiB7XHJcbiAgICAgICAgaWYgKGRhdGEudHlwZSA9PT0gdGhpcy50eXBlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZXZlbnQuZW1pdChkYXRhKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL2lmZGVmLWxvYWRlci9pZmRlZi1sb2FkZXIuanM/REVCVUc9dHJ1ZSZQRVJGT1JNQU5DRV9BVURJVD10cnVlIS4vc3JjL3dvcmtlcnMvc2VuZGVycy93b3JrZXItZXZlbnQtcmVjZWl2ZXIudHMiLCJpbXBvcnQgeyBJV29ya2VyTWVzc2FnZSwgSVdvcmtlck1lc3NhZ2VSZWNlaXZlciwgSVdvcmtlck1lc3NhZ2VTZW5kZXIsIFdvcmtlckRhdGFUeXBlIH0gZnJvbSAnLi4vd29ya2VyLWRlZmluaXRpb25zJztcclxuaW1wb3J0IHsgSVJlc3BvbnNlRW1pdHRlciB9IGZyb20gJy4vcmVzcG9uc2UtZW1pdHRlcic7XHJcbmltcG9ydCB7IElSZXNwb25zZUVudmVsb3AgfSBmcm9tICcuL3dvcmtlci1yZXF1ZXN0LXNlbmRlcic7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElSZXF1ZXN0RW52ZWxvcDxUVHlwZSBleHRlbmRzIFdvcmtlckRhdGFUeXBlLCBUUmVxdWVzdD4gZXh0ZW5kcyBJV29ya2VyTWVzc2FnZTxUVHlwZT4ge1xyXG4gICAgcmVxdWVzdDogVFJlcXVlc3Q7XHJcblxyXG4gICAgbWVzc2FnZUlkOiBzdHJpbmc7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBXb3JrZXJSZXF1ZXN0UmVjZWl2ZXI8VFR5cGUgZXh0ZW5kcyBXb3JrZXJEYXRhVHlwZSwgVFJlcXVlc3QsIFRSZXNwb25zZT4ge1xyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IHR5cGU6IFRUeXBlLFxyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgX3NlbmRlcjogSVdvcmtlck1lc3NhZ2VTZW5kZXIsXHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBfcmVjZWl2ZXI6IElXb3JrZXJNZXNzYWdlUmVjZWl2ZXIsXHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBfaGFuZGxlcjogSVJlc3BvbnNlRW1pdHRlcjxUUmVxdWVzdCwgVFJlc3BvbnNlPlxyXG4gICAgKSB7XHJcbiAgICAgICAgX3JlY2VpdmVyLmFkZEV2ZW50TGlzdGVuZXIodHlwZSwgdGhpcy5fcmVzcG9uc2UpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBkaXNwb3NlKCkge1xyXG4gICAgICAgIHRoaXMuX3JlY2VpdmVyLnJlbW92ZUV2ZW50TGlzdGVuZXIodGhpcy50eXBlLCB0aGlzLl9yZXNwb25zZSk7XHJcbiAgICAgICAgdGhpcy5faGFuZGxlci5zdG9wKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfcmVzcG9uc2UgPSAoZGF0YTogSVJlcXVlc3RFbnZlbG9wPFRUeXBlLCBUUmVxdWVzdD4pID0+IHtcclxuICAgICAgICBjb25zdCBtZXNzYWdlSWQgPSBkYXRhLm1lc3NhZ2VJZDtcclxuICAgICAgICBjb25zdCB0eXBlID0gZGF0YS50eXBlO1xyXG5cclxuICAgICAgICBpZiAodGhpcy50eXBlID09PSB0eXBlKSB7XHJcbiAgICAgICAgICAgIGlmIChtZXNzYWdlSWQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYXdhaXRSZXNwb25zZSh0eXBlLCBkYXRhLnJlcXVlc3QsIG1lc3NhZ2VJZCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJpc2VFdmVudCh0eXBlLCBkYXRhLnJlcXVlc3QpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgYXdhaXRSZXNwb25zZSh0eXBlOiBUVHlwZSwgcmVxdWVzdDogVFJlcXVlc3QsIG1lc3NhZ2VJZDogc3RyaW5nKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3Qgc2VuZGVyID0gdGhpcy5fc2VuZGVyO1xyXG5cclxuICAgICAgICBmdW5jdGlvbiByZWplY3QoZXJyb3I6IGFueSkge1xyXG4gICAgICAgICAgICBsZXQgbWVzc2FnZSA9ICcnO1xyXG4gICAgICAgICAgICBpZiAoZXJyb3IgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGVycm9yIGluc3RhbmNlb2YgRXJyb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlID0gZXJyb3IubWVzc2FnZTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZSA9IGVycm9yLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc2VuZGVyLnBvc3RNZXNzYWdlKHsgdHlwZSwgbWVzc2FnZUlkLCBlcnJvcjogeyBtZXNzYWdlIH0gfSBhcyBJUmVzcG9uc2VFbnZlbG9wPFRUeXBlLCBUUmVzcG9uc2U+KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZnVuY3Rpb24gcmVzb2x2ZShyZXNwb25zZTogVFJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgIHNlbmRlci5wb3N0TWVzc2FnZSh7IHR5cGUsIG1lc3NhZ2VJZCwgcmVzcG9uc2UgfSBhcyBJUmVzcG9uc2VFbnZlbG9wPFRUeXBlLCBUUmVzcG9uc2U+KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IHRoaXMuX2hhbmRsZXIuaW52b2tlKHJlcXVlc3QpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBQcm9taXNlICE9PSAndW5kZWZpbmVkJyAmJiByZXN1bHQgaW5zdGFuY2VvZiBQcm9taXNlKSB7XHJcbiAgICAgICAgICAgICAgICByZXN1bHQudGhlbihyZXNvbHZlLCByZWplY3QpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZShyZXN1bHQgYXMgVFJlc3BvbnNlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgIHJlamVjdChlcnJvcik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcmlzZUV2ZW50KHR5cGU6IHN0cmluZywgcmVxdWVzdDogVFJlcXVlc3QpOiB2b2lkIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICB0aGlzLl9oYW5kbGVyLmludm9rZShyZXF1ZXN0KTtcclxuICAgICAgICB9IGNhdGNoIHsgLyoqLyB9XHJcbiAgICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL2lmZGVmLWxvYWRlci9pZmRlZi1sb2FkZXIuanM/REVCVUc9dHJ1ZSZQRVJGT1JNQU5DRV9BVURJVD10cnVlIS4vc3JjL3dvcmtlcnMvc2VuZGVycy93b3JrZXItcmVxdWVzdC1yZWNlaXZlci50cyIsImltcG9ydCB7IElTY3JpcHRMb2FkZXIsIFNjcmlwdExvYWRlciB9IGZyb20gJy4uL2ZyYW1ld29yay9zY3JpcHQtbG9hZGVyJztcclxuaW1wb3J0IHsgSU1lc3NhZ2VFdmVudCwgSVdvcmtlckdsb2JhbFNjb3BlLCBJV29ya2VyTG9jYXRpb24sIE1lc3NhZ2VFdmVudExpc3RlbmVyIH0gZnJvbSAnLi93b3JrZXItZGVmaW5pdGlvbnMnO1xyXG5cclxuLyoqXHJcbiAqIFZhcmlhYmxlIG5hbWUgdG8gcGFzcyBQc2V1ZG9Xb3JrZXIgYmV0d2VlbiBtYWluIGNvZGUgYW5kIGxvYWRlZCBpbiBhIFdlYldvcmtlclxyXG4gKiBAaW50ZXJuYWxcclxuICovXHJcbmV4cG9ydCBjb25zdCBQc2V1ZG9Xb3JrZXJTY29wZU5hbWUgPSAnTWVzc2FnaW5nQ2xpZW50LVBzZXVkb1dvcmtlcic7XHJcblxyXG4vKipcclxuICogRW11bGF0b3Igb2YgV2ViIFdvcmtlciBiZWhhdmlvci4gUnVuIGFsbCBwcm9jY2VzcyBpbiB0aGUgbWFpbiB3aW5kb3cgcHJvY2Vzcy5cclxuICpcclxuICogUmVxdWlyZWQgY29tcGF0aWJpbGl0eSB3aXRoIElFOSB3aXRob3V0IHBvbHlmaWxsc1xyXG4gKlxyXG4gKiBAaW50ZXJuYWxcclxuICogQGNsYXNzIFBzZXVkb1dvcmtlclxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFBzZXVkb1dvcmtlciB7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9wc2V1ZG9Xb3JrZXI6IEludGVybmFsUHNldWRvV29ya2VyO1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfbGlzdGVuZXJzOiBBcnJheTxNZXNzYWdlRXZlbnRMaXN0ZW5lcj4gPSBbXTtcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgX2J1ZmZlcjogQXJyYXk8SU1lc3NhZ2VFdmVudD4gPSBbXTtcclxuICAgIHByaXZhdGUgX2dsb2JhbDogYW55ID0gd2luZG93O1xyXG5cclxuICAgIHB1YmxpYyBnZXQgcHNldWRvV29ya2VyKCkgeyByZXR1cm4gdGhpcy5fcHNldWRvV29ya2VyOyB9XHJcblxyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcGF0aDogc3RyaW5nLFxyXG4gICAgICAgIHNjcmlwdExvYWRlcjogSVNjcmlwdExvYWRlciA9IG5ldyBTY3JpcHRMb2FkZXIoKVxyXG4gICAgKSB7XHJcbiAgICAgICAgdGhpcy5fcHNldWRvV29ya2VyID0gdGhpcy5fZ2xvYmFsW1BzZXVkb1dvcmtlclNjb3BlTmFtZV0gPVxyXG4gICAgICAgICAgICBuZXcgSW50ZXJuYWxQc2V1ZG9Xb3JrZXIoXHJcbiAgICAgICAgICAgICAgICBwYXRoLFxyXG4gICAgICAgICAgICAgICAgc2NyaXB0TG9hZGVyLFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHJhaXNlRXZlbnQ6IChtZXNzYWdlKSA9PiB0aGlzLnJhaXNlRXZlbnQobWVzc2FnZSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICBzY3JpcHRMb2FkZXIubG9hZFNjcmlwdChwYXRoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcG9zdE1lc3NhZ2UobWVzc2FnZTogb2JqZWN0KSB7XHJcbiAgICAgICAgdGhpcy5fcHNldWRvV29ya2VyLnJhaXNlRXZlbnQoeyBkYXRhOiBtZXNzYWdlIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhZGRFdmVudExpc3RlbmVyKGV2ZW50OiAnbWVzc2FnZScsIGxpc3RlbmVyOiBNZXNzYWdlRXZlbnRMaXN0ZW5lcikge1xyXG4gICAgICAgIGlmIChldmVudCA9PT0gJ21lc3NhZ2UnKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2xpc3RlbmVycy5wdXNoKGxpc3RlbmVyKTtcclxuXHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2J1ZmZlci5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYnVmZmVyID0gdGhpcy5fYnVmZmVyLnNsaWNlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbGVuZ3RoID0gYnVmZmVyLmxlbmd0aDtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmFpc2VFdmVudChidWZmZXJbaV0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9idWZmZXIubGVuZ3RoID0gMDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50OiAnbWVzc2FnZScsIGxpc3RlbmVyOiBNZXNzYWdlRXZlbnRMaXN0ZW5lcikge1xyXG4gICAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5fbGlzdGVuZXJzLmluZGV4T2YobGlzdGVuZXIpO1xyXG4gICAgICAgIGlmIChpbmRleCA+IC0xKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2xpc3RlbmVycy5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdGVybWluYXRlKCkge1xyXG4gICAgICAgIHRoaXMuX2J1ZmZlci5sZW5ndGggPSAwO1xyXG4gICAgICAgIHRoaXMuX2xpc3RlbmVycy5sZW5ndGggPSAwO1xyXG4gICAgICAgIHRoaXMuX3BzZXVkb1dvcmtlci5jbG9zZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcmFpc2VFdmVudChtZXNzYWdlOiBJTWVzc2FnZUV2ZW50KSB7XHJcbiAgICAgICAgY29uc3QgbGlzdGVuZXJzID0gdGhpcy5fbGlzdGVuZXJzO1xyXG4gICAgICAgIGNvbnN0IGxlbmd0aCA9IGxpc3RlbmVycy5sZW5ndGg7XHJcbiAgICAgICAgaWYgKGxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbGlzdGVuZXIgPSBsaXN0ZW5lcnNbaV07XHJcbiAgICAgICAgICAgICAgICBsaXN0ZW5lcihtZXNzYWdlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2J1ZmZlci5wdXNoKG1lc3NhZ2UpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIEluc3RhbmNlIGZvciBlbXVsYXRpb25nIFdvcmtlciBFbnZpcm9ubWVudCBpbnNpZGUgV2ViV29ya2VyIGNvZGVcclxuICpcclxuICogQGNsYXNzIEludGVybmFsUHNldWRvV29ya2VyXHJcbiAqIEBpbXBsZW1lbnRzIHtJV29ya2VyR2xvYmFsU2NvcGV9XHJcbiAqL1xyXG5jbGFzcyBJbnRlcm5hbFBzZXVkb1dvcmtlciBpbXBsZW1lbnRzIElXb3JrZXJHbG9iYWxTY29wZSB7XHJcbiAgICBwdWJsaWMgcmVhZG9ubHkgbG9jYXRpb246IElXb3JrZXJMb2NhdGlvbjtcclxuXHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9saXN0ZW5lcnM6IEFycmF5PE1lc3NhZ2VFdmVudExpc3RlbmVyPiA9IFtdO1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfYnVmZmVyOiBBcnJheTxJTWVzc2FnZUV2ZW50PiA9IFtdO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIGxvY2F0aW9uOiBzdHJpbmcsXHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBfc2NyaXB0TG9hZGVyOiBJU2NyaXB0TG9hZGVyLFxyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgX2ludGVybmFsOiBJSW50ZXJuYWxXb3JrZXJGdW5jdGlvbnMsXHJcbiAgICApIHtcclxuICAgICAgICB0aGlzLmxvY2F0aW9uID0gbG9jYXRpb247XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHBvc3RNZXNzYWdlKG1lc3NhZ2U6IG9iamVjdCk6IHZvaWQge1xyXG4gICAgICAgIG1lc3NhZ2UgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KG1lc3NhZ2UpKTtcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5faW50ZXJuYWwucmFpc2VFdmVudCh7IGRhdGE6IG1lc3NhZ2UgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGltcG9ydFNjcmlwdHMoLi4ucGF0aHM6IEFycmF5PHN0cmluZz4pOiBhbnkge1xyXG4gICAgICAgIGxldCByZXNvbHZlOiAoKSA9PiB2b2lkO1xyXG4gICAgICAgIGxldCByZXNvbHZlZDogYm9vbGVhbjtcclxuXHJcbiAgICAgICAgY29uc3QgbGVuZ3RoID0gcGF0aHMubGVuZ3RoO1xyXG4gICAgICAgIGxldCB0b2xvYWQgPSBwYXRocy5sZW5ndGg7XHJcbiAgICAgICAgY29uc3Qgb25sb2FkID0gKCkgPT4ge1xyXG4gICAgICAgICAgICB0b2xvYWQtLTtcclxuICAgICAgICAgICAgaWYgKHRvbG9hZCA8PSAwKSB7XHJcbiAgICAgICAgICAgICAgICByZXNvbHZlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBpZiAocmVzb2x2ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLl9zY3JpcHRMb2FkZXIubG9hZFNjcmlwdChwYXRoc1tpXSwgb25sb2FkKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHRoZW46IChjYWxsYmFjazogKCkgPT4gdm9pZCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHJlc29sdmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2soKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXNvbHZlID0gY2FsbGJhY2s7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhZGRFdmVudExpc3RlbmVyKGV2ZW50OiAnbWVzc2FnZScgfCAnY29ubmVjdCcsIGxpc3RlbmVyOiBNZXNzYWdlRXZlbnRMaXN0ZW5lcik6IHZvaWQge1xyXG4gICAgICAgIGlmIChldmVudCA9PT0gJ21lc3NhZ2UnKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2xpc3RlbmVycy5wdXNoKGxpc3RlbmVyKTtcclxuXHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2J1ZmZlci5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBidWZmZXIgPSB0aGlzLl9idWZmZXIuc2xpY2UoKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBsZW5ndGggPSBidWZmZXIubGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yYWlzZUV2ZW50KGJ1ZmZlcltpXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2J1ZmZlci5sZW5ndGggPSAwO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnQ6ICdtZXNzYWdlJywgbGlzdGVuZXI6IE1lc3NhZ2VFdmVudExpc3RlbmVyKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgaW5kZXggPSB0aGlzLl9saXN0ZW5lcnMuaW5kZXhPZihsaXN0ZW5lcik7XHJcbiAgICAgICAgaWYgKGluZGV4ID4gLTEpIHtcclxuICAgICAgICAgICAgdGhpcy5fbGlzdGVuZXJzLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByYWlzZUV2ZW50KG1lc3NhZ2U6IElNZXNzYWdlRXZlbnQpIHtcclxuICAgICAgICBpZiAoIXRoaXMuX2xpc3RlbmVycy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgdGhpcy5fYnVmZmVyLnB1c2gobWVzc2FnZSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY29uc3QgbGVuZ3RoID0gdGhpcy5fbGlzdGVuZXJzLmxlbmd0aDtcclxuICAgICAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IGxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fbGlzdGVuZXJzW2luZGV4XShtZXNzYWdlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xvc2UoKSB7XHJcbiAgICAgICAgdGhpcy5fYnVmZmVyLmxlbmd0aCA9IDA7XHJcbiAgICAgICAgdGhpcy5fbGlzdGVuZXJzLmxlbmd0aCA9IDA7XHJcbiAgICB9XHJcbn1cclxuXHJcbmludGVyZmFjZSBJSW50ZXJuYWxXb3JrZXJGdW5jdGlvbnMge1xyXG4gICAgcmFpc2VFdmVudChtZXNzYWdlOiBJTWVzc2FnZUV2ZW50KTogdm9pZDtcclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvaWZkZWYtbG9hZGVyL2lmZGVmLWxvYWRlci5qcz9ERUJVRz10cnVlJlBFUkZPUk1BTkNFX0FVRElUPXRydWUhLi9zcmMvd29ya2Vycy9wc2V1ZG8td29ya2VyLnRzIiwiaW1wb3J0IHsgR2xvYmFsUHJvdmlkZXIgfSBmcm9tICcuL2dsb2JhbCc7XHJcblxyXG4vKipcclxuICogTG9hZCBzY3JpcHQgZnJvbSBhIHBhdGhcclxuICpcclxuICogQGludGVybmFsXHJcbiAqIEBpbnRlcmZhY2UgSVNjcmlwdExvYWRlclxyXG4gKi9cclxuZXhwb3J0IGludGVyZmFjZSBJU2NyaXB0TG9hZGVyIHtcclxuICAgIGxvYWRTY3JpcHQocGF0aDogc3RyaW5nLCBvbmxvYWQ/OiAoKSA9PiB2b2lkKTogdm9pZDtcclxufVxyXG5cclxuLyoqXHJcbiAqIFBvbHlmaWxsIGZvciBsb2FkaW5nIHNjcmlwdCBpbiBET00gY29udGV4dFxyXG4gKlxyXG4gKiBAaW50ZXJuYWxcclxuICogQGNsYXNzIFNjcmlwdExvYWRlclxyXG4gKiBAaW1wbGVtZW50cyB7SVNjcmlwdExvYWRlcn1cclxuICovXHJcbmV4cG9ydCBjbGFzcyBTY3JpcHRMb2FkZXIgaW1wbGVtZW50cyBJU2NyaXB0TG9hZGVyIHtcclxuICAgIC8qKlxyXG4gICAgICogTG9hZCBzY3JpcHQgZnJvbSBwYXRoIGVuZCBleGVjdXRlIGl0XHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHBhdGgge3N0cmluZ30gLSBQYXRoIHRvIHRoZSBzY3JpcHRcclxuICAgICAqIEBwYXJhbSBvbmxvYWQgeygpID0+IHZvaWR9IC0gQ2FsbGJhY2sgZXhlY3V0ZWQgYWZ0ZXIgdGhlIHNjcmlwdCBsb2Fkc1xyXG4gICAgICogQG1lbWJlcm9mIFNjcmlwdExvYWRlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcmVhZG9ubHkgbG9hZFNjcmlwdDogKHBhdGg6IHN0cmluZywgb25sb2FkPzogKCkgPT4gdm9pZCkgPT4gdm9pZDtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBfZ2xvYmFsID0gR2xvYmFsUHJvdmlkZXIuY3VycmVudCgpXHJcbiAgICApIHtcclxuICAgICAgICBpZiAodHlwZW9mIChfZ2xvYmFsIGFzIFdpbmRvdykuZG9jdW1lbnQgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZFNjcmlwdCA9IChwYXRoLCBvbmxvYWQpID0+IFNjcmlwdExvYWRlci5sb2FkVmlhRG9tKChfZ2xvYmFsIGFzIFdpbmRvdykuZG9jdW1lbnQsIHBhdGgsIG9ubG9hZCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdObyBET00gZW52aXJvbm1lbnQgaXMgbm90IHN1cHBvcnRlZC4nKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bWVtYmVyLW9yZGVyaW5nXHJcbiAgICBwcml2YXRlIHN0YXRpYyBsb2FkVmlhRG9tKGRvY3VtZW50OiBEb2N1bWVudCwgcGF0aDogc3RyaW5nLCBvbmxvYWQ/OiAoKSA9PiB2b2lkKSB7XHJcbiAgICAgICAgY29uc3Qgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XHJcbiAgICAgICAgc2NyaXB0LnR5cGUgPSAndGV4dC9qYXZhc2NyaXB0JztcclxuICAgICAgICBzY3JpcHQuc3JjID0gcGF0aDtcclxuICAgICAgICBpZiAob25sb2FkKSB7XHJcbiAgICAgICAgICAgIHNjcmlwdC5vbmxvYWQgPSBvbmxvYWQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIChkb2N1bWVudC5ib2R5IHx8IGRvY3VtZW50LmhlYWQpLmFwcGVuZENoaWxkKHNjcmlwdCk7XHJcbiAgICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL2lmZGVmLWxvYWRlci9pZmRlZi1sb2FkZXIuanM/REVCVUc9dHJ1ZSZQRVJGT1JNQU5DRV9BVURJVD10cnVlIS4vc3JjL2ZyYW1ld29yay9zY3JpcHQtbG9hZGVyLnRzIiwiaW1wb3J0IHsgR2xvYmFsUHJvdmlkZXIgfSBmcm9tICcuL2ZyYW1ld29yay9nbG9iYWwnO1xyXG5pbXBvcnQgeyBJTWVzc2FnaW5nQ2xpZW50TGl0ZURhdGEgfSBmcm9tICcuL2xpdGUtZGF0YSc7XHJcblxyXG5jb25zdCBuYW1lOiAnTWVzc2FnaW5nQ2xpZW50LUxpdGVEYXRhJyA9ICdNZXNzYWdpbmdDbGllbnQtTGl0ZURhdGEnO1xyXG5cclxuLyoqXHJcbiAqIEBpbnRlcm5hbFxyXG4gKi9cclxuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLW5hbWVzcGFjZVxyXG5kZWNsYXJlIGdsb2JhbCB7XHJcbiAgICBpbnRlcmZhY2UgV2luZG93IHtcclxuICAgICAgICAnTWVzc2FnaW5nQ2xpZW50LUxpdGVEYXRhJzogSU1lc3NhZ2luZ0NsaWVudExpdGVEYXRhO1xyXG4gICAgfVxyXG59XHJcblxyXG4vKipcclxuICogSGVscGVyIGZvciBzdG9ycmluZyBkYXRhIGluIGdsb2JhbCB2YXJpYWJsZVxyXG4gKlxyXG4gKiBAaW50ZXJuYWxcclxuICovXHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBMaXRlRGF0YUNvbnRhaW5lciB7XHJcbiAgICBwdWJsaWMgc3RhdGljIGdldCgpOiBJTWVzc2FnaW5nQ2xpZW50TGl0ZURhdGEge1xyXG4gICAgICAgIGNvbnN0IHJvb3QgPSAoR2xvYmFsUHJvdmlkZXIuY3VycmVudCgpIGFzIFdpbmRvdyk7XHJcbiAgICAgICAgcmV0dXJuIHJvb3RbbmFtZV0gfHwgKHJvb3RbbmFtZV0gPSB7fSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBjbGVhcigpOiB2b2lkIHtcclxuICAgICAgICBkZWxldGUgKEdsb2JhbFByb3ZpZGVyLmN1cnJlbnQoKSBhcyBXaW5kb3cpW25hbWVdO1xyXG4gICAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy9pZmRlZi1sb2FkZXIvaWZkZWYtbG9hZGVyLmpzP0RFQlVHPXRydWUmUEVSRk9STUFOQ0VfQVVESVQ9dHJ1ZSEuL3NyYy9saXRlLWRhdGEtY29udGFpbmVyLnRzIiwiaW1wb3J0IHsgSU1lc3NhZ2UsIE1lc3NhZ2VUeXBlIH0gZnJvbSAnLi9kZWZpbml0aW9ucy9tZXNzYWdlJztcclxuaW1wb3J0IHsgSU1lc3NhZ2luZ0NsaWVudCB9IGZyb20gJy4vZGVmaW5pdGlvbnMvbWVzc2FnaW5nLWNsaWVudCc7XHJcbmltcG9ydCB7IElTZW5kaW5nT3B0aW9ucyB9IGZyb20gJy4vZGVmaW5pdGlvbnMvc2VuZGluZy1vcHRpb25zJztcclxuaW1wb3J0IHsgSVRpbWVTdGFtcFByb3ZpZGVyIH0gZnJvbSAnLi9mcmFtZXdvcmsvdGltZXN0YW1wJztcclxuaW1wb3J0IHsgZXh0ZW5kIH0gZnJvbSAnLi9mcmFtZXdvcmsvdXRpbHMvZXh0ZW5kJztcclxuaW1wb3J0IHsgSU1lc3NhZ2VTZW5kZXIgfSBmcm9tICcuL21lc3NhZ2Utc2VuZGVyJztcclxuXHJcbi8qKlxyXG4gKiBTaGFyZWQgdXNlciBBUEkgaW1wbGVtZW50YXRpb24gZm9yIGxpdGUgYW5kIGZ1bGwgdmVyc2lvbnMuXHJcbiAqXHJcbiAqIEluc3RhbmNlIG9mIHRoaXMgY2xhc3MgaXMgcHJvdmlkZWQgdG8gdXNlciBhbmQgaXNuJ3QgY2hhbmdlZC5cclxuICpcclxuICogQGludGVybmFsXHJcbiAqIEBjbGFzcyBNZXNzYWdpbmdDbGllbnRcclxuICogQGltcGxlbWVudHMge0lNZXNzYWdpbmdDbGllbnR9XHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgTWVzc2FnaW5nQ2xpZW50SW5zdGFuY2UgaW1wbGVtZW50cyBJTWVzc2FnaW5nQ2xpZW50IHtcclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFNlbmRlciBpbnN0YW5jZSB0aGF0IHdpbGwgYmUgcmVwbGFjZWQgYWZ0ZXIgZnVsbCB2ZXJzaW9uIGxvYWRpbmdcclxuICAgICAgICAgKi9cclxuICAgICAgICBwdWJsaWMgc2VuZGVyOiBJTWVzc2FnZVNlbmRlcixcclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IF90aW1lOiBJVGltZVN0YW1wUHJvdmlkZXJcclxuICAgICkgeyB9XHJcblxyXG4gICAgcHVibGljIGNyZWF0ZTxUTWVzc2FnZSBleHRlbmRzIElNZXNzYWdlPihtZXNzYWdlVHlwZTogTWVzc2FnZVR5cGUsIHBheWxvYWQ/OiBUTWVzc2FnZSk6IFRNZXNzYWdlIHtcclxuICAgICAgICBjb25zdCBtZXNzYWdlID0geyBfbWV0YTogeyB0eXBlOiBtZXNzYWdlVHlwZSB9IH0gYXMgVE1lc3NhZ2U7XHJcbiAgICAgICAgaWYgKHBheWxvYWQpIHtcclxuICAgICAgICAgICAgZXh0ZW5kKG1lc3NhZ2UsIHBheWxvYWQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbWVzc2FnZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2VuZDxUTWVzc2FnZSBleHRlbmRzIElNZXNzYWdlPihtZXNzYWdlOiBUTWVzc2FnZSwgb3B0aW9ucz86IElTZW5kaW5nT3B0aW9ucyk6IHZvaWQge1xyXG4gICAgICAgIGlmICghbWVzc2FnZSB8fCAhbWVzc2FnZS5fbWV0YSkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ01lc3NhZ2Ugb3IgbWVzc2FnZSB0eXBlIGlzIHVuZGVmaW5lZCcpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbWVzc2FnZS5fbWV0YS50aW1lc3RhbXAgPSB0aGlzLl90aW1lLm5vdygpO1xyXG4gICAgICAgIG1lc3NhZ2UgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KG1lc3NhZ2UpKTtcclxuICAgICAgICB0aGlzLnNlbmRlci5zZW5kKG1lc3NhZ2UsIG9wdGlvbnMpO1xyXG4gICAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy9pZmRlZi1sb2FkZXIvaWZkZWYtbG9hZGVyLmpzP0RFQlVHPXRydWUmUEVSRk9STUFOQ0VfQVVESVQ9dHJ1ZSEuL3NyYy9tZXNzYWdpbmctY2xpZW50LWluc3RhbmNlLnRzIiwiaW1wb3J0IHsgZW5kc1dpdGggfSBmcm9tICcuL3N0cmluZ3MnO1xyXG5cclxuLyoqXHJcbiAqIFRoZSBjbGFzcyBjb250YWlucyB1dGlsaXRpZXMgZm9yIFNlcnZpY2VXb3JrZXJcclxuICovXHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBTZXJ2aWNlV29ya2VyVXRpbHMge1xyXG4gICAgLyoqXHJcbiAgICAgKiBDaGVjayBzdXBwb3J0aW5nIFNlcnZpY2VXb3JrZXIgQVBJIGluIHRoZSBjdXJyZW50IGVudmlyb25tZW50XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgaXNTdXBwb3J0ZWQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHR5cGVvZiBuYXZpZ2F0b3IgIT09ICd1bmRlZmluZWQnXHJcbiAgICAgICAgICAgICAgICYmICdzZXJ2aWNlV29ya2VyJyBpbiBuYXZpZ2F0b3I7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZWdpc3RlciBhIG5ldyBTZXJ2aWNlV29ya2VyIGluc3RhbmNlIGFuZCB3YWl0IGl0cyBhY3RpdmF0aW9uXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgYWN0aXZhdGUocGF0aDogc3RyaW5nLCBzY29wZTogc3RyaW5nLCBhdHRlbXB0czogbnVtYmVyID0gMyk6IFByb21pc2U8SVNlcnZpY2VXb3JrZXJSZWdpc3RyYXRpb25EYXRhPiB7XHJcbiAgICAgICAgbGV0IGNvdW50ZXIgPSAwO1xyXG4gICAgICAgIHJldHVybiAobmF2aWdhdG9yIGFzIE5hdmlnYXRvcikuc2VydmljZVdvcmtlci5yZWdpc3RlcihwYXRoLCB7IHNjb3BlIH0pLnRoZW4oKHJlZ2lzdHJhdGlvbikgPT4ge1xyXG4gICAgICAgICAgICBjb3VudGVyKys7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBzZXJ2aWNlV29ya2VyID0gcmVnaXN0cmF0aW9uLmFjdGl2ZSB8fCByZWdpc3RyYXRpb24uaW5zdGFsbGluZyB8fCByZWdpc3RyYXRpb24ud2FpdGluZztcclxuICAgICAgICAgICAgaWYgKHNlcnZpY2VXb3JrZXIgJiYgc2VydmljZVdvcmtlci5zdGF0ZSA9PT0gJ2FjdGl2YXRlZCcpIHtcclxuICAgICAgICAgICAgICAgIGlmIChlbmRzV2l0aChzZXJ2aWNlV29ya2VyLnNjcmlwdFVSTCwgcGF0aCkpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4geyByZWdpc3RyYXRpb24sIHNlcnZpY2VXb3JrZXIgfTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHNlcnZpY2VXb3JrZXIpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZTxJU2VydmljZVdvcmtlclJlZ2lzdHJhdGlvbkRhdGE+KChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiBxdWlldChhY3Rpb246ICgpID0+IHZvaWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgKHNlcnZpY2VXb3JrZXIgYXMgYW55KS5vbnN0YXRlY2hhbmdlID0gKHNlcnZpY2VXb3JrZXIgYXMgYW55KS5vbmVycm9yID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHNlcnZpY2VXb3JrZXIub25zdGF0ZWNoYW5nZSA9IChldmVudCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2VydmljZVdvcmtlci5zdGF0ZSA9PT0gJ2FjdGl2YXRlZCcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHF1aWV0KCgpID0+IHJlc29sdmUoeyByZWdpc3RyYXRpb24sIHNlcnZpY2VXb3JrZXIgfSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzZXJ2aWNlV29ya2VyLnN0YXRlID09PSAncmVkdW5kYW50Jykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY291bnRlciA8IGF0dGVtcHRzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcXVpZXQoKCkgPT4gcmVzb2x2ZShTZXJ2aWNlV29ya2VyVXRpbHMuYWN0aXZhdGUocGF0aCwgc2NvcGUpKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHF1aWV0KCgpID0+IHJlamVjdCgnUmVnaXN0cmF0aW9uIHdhcyBmYWlsZWQgd2l0aCBtYXhpbXVtIGF0dGVtcHRzIGV4Y2lkZXMuJykpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgc2VydmljZVdvcmtlci5vbmVycm9yID0gKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHF1aWV0KCgpID0+IHJlamVjdChldmVudC50YXJnZXQpKTtcclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdCgnU2VydmljZVdvcmtlciBmYWlsZWQgdGhlIHJlZ2lzdHJhdGlvbi4nKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgYWJzb2x1dGUgcGF0aCBmb3IgcGFzc2luZyBhcyBzY29wZSB0byBhIFNlcnZpY2VXb3JrZXIgaW5zdGFuY2UuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgYWJzb2x1dGVTY29wZShwYXRoOiBzdHJpbmcsIHJlbGF0aXZlU2NvcGU6IHN0cmluZykge1xyXG4gICAgICAgIGlmIChyZWxhdGl2ZVNjb3BlWzBdID09PSAnLycpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHJlbGF0aXZlU2NvcGU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IGluZGV4ID0gcGF0aC5sYXN0SW5kZXhPZignLycpO1xyXG4gICAgICAgIGlmIChpbmRleCA8IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIHJlbGF0aXZlU2NvcGU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBwYXRoLnN1YnN0cmluZygwLCBpbmRleCArIDEpICsgcmVsYXRpdmVTY29wZTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJU2VydmljZVdvcmtlclJlZ2lzdHJhdGlvbkRhdGEge1xyXG4gICAgcmVnaXN0cmF0aW9uOiBTZXJ2aWNlV29ya2VyUmVnaXN0cmF0aW9uO1xyXG5cclxuICAgIHNlcnZpY2VXb3JrZXI6IFNlcnZpY2VXb3JrZXI7XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL2lmZGVmLWxvYWRlci9pZmRlZi1sb2FkZXIuanM/REVCVUc9dHJ1ZSZQRVJGT1JNQU5DRV9BVURJVD10cnVlIS4vc3JjL2ZyYW1ld29yay9zZXJ2aWNlLXdvcmtlci11dGlscy50cyIsImltcG9ydCB7IEVudmlyb25tZW50RGF0YSB9IGZyb20gJy4vY29uZmlndXJhdGlvbnMvZGVmYXVsdHMvZW52aXJvbm1lbnQnO1xyXG5pbXBvcnQgeyBJVGVzdEVudmlyb25tZW50IH0gZnJvbSAnLi9jb25maWd1cmF0aW9ucy90ZXN0LWVudmlyb25tZW50JztcclxuaW1wb3J0IHsgSUVudmlyb25tZW50Q29uZmlndXJhdGlvbiB9IGZyb20gJy4vZGVmaW5pdGlvbnMnO1xyXG5pbXBvcnQgeyBJTWVzc2FnaW5nQ2xpZW50IH0gZnJvbSAnLi9kZWZpbml0aW9ucy9tZXNzYWdpbmctY2xpZW50JztcclxuaW1wb3J0IHsgb3ZlcnJpZGUgfSBmcm9tICcuL2ZyYW1ld29yay9pbmRleCc7XHJcbmltcG9ydCB7IFRpbWVTdGFtcFByb3ZpZGVyIH0gZnJvbSAnLi9mcmFtZXdvcmsvdGltZXN0YW1wJztcclxuaW1wb3J0IHsgSU1lc3NhZ2luZ0NsaWVudExpdGVEYXRhIH0gZnJvbSAnLi9saXRlLWRhdGEnO1xyXG5pbXBvcnQgeyBMaXRlRGF0YUNvbnRhaW5lciB9IGZyb20gJy4vbGl0ZS1kYXRhLWNvbnRhaW5lcic7XHJcbmltcG9ydCB7IENvbnNvbGVMb2dnZXIgfSBmcm9tICcuL2xvZ3MvY29uc29sZS1sb2dnZXInO1xyXG5pbXBvcnQgeyBFdmVudExvZ2dlciB9IGZyb20gJy4vbG9ncy9ldmVudC1sb2dnZXInO1xyXG5pbXBvcnQgeyBVbml2ZXJzYWxMb2dnZXIgfSBmcm9tICcuL2xvZ3MvdW5pdmVyc2FsLWxvZ2dlcic7XHJcbmltcG9ydCB7IE1lc3NhZ2VTZW5kZXJGdWxsIH0gZnJvbSAnLi9tZXNzYWdlLXNlbmRlci1mdWxsJztcclxuaW1wb3J0IHsgTWVzc2FnaW5nQ2xpZW50SW5zdGFuY2UgfSBmcm9tICcuL21lc3NhZ2luZy1jbGllbnQtaW5zdGFuY2UnO1xyXG5cclxuLyoqXHJcbiAqIENvbnN0cnVjdG9yIG9mIGEgTWVzc2FnaW5nQ2xpZW50IGluc3RhbmNlIGluIGZ1bGwgbW9kZS5cclxuICpcclxuICogRW50cnkgcG9pbnQgZm9yIGJ1aWxkaW5nIGJ1bmRsZSBmaWxlIGZvciBmdWxsIHZlcnNpb24uXHJcbiAqXHJcbiAqIEBleHBvcnRcclxuICogQGNsYXNzIE1lc3NhZ2luZ0NsaWVudFxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIE1lc3NhZ2luZ0NsaWVudCB7XHJcbiAgICAvKipcclxuICAgICAqIEBpbnRlcm5hbFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGVudmlyb25tZW50KHRlc3Q6IElUZXN0RW52aXJvbm1lbnQpOiBNZXNzYWdpbmdDbGllbnQge1xyXG4gICAgICAgIHJldHVybiBuZXcgTWVzc2FnaW5nQ2xpZW50KHRlc3QpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlIGEgbmV3IGluc3RhbmNlIG9mIE1lc3NhZ2luZ0NsaWVudC5cclxuICAgICAqIEl0IGNhbiBiZSBjYWxsZWQgb25seSBvbmNlIGF0IHRoZSBzYW1lIHBhZ2UuXHJcbiAgICAgKlxyXG4gICAgICogRGVwcmljYXRlZCBtZXRob2QuIFNob3VsZCBiZSBkZWxldGVkIGluIHRoZSBuZXh0IG1ham9yIHZlcnNpb24uXHJcbiAgICAgKlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHtJRW52aXJvbm1lbnRDb25maWd1cmF0aW9ufSBlbnZpcm9ubWVudCAtIENvbmZpZ3VyYXRpb24gb2YgZW52aXJvbm1lbnRcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBjcmVhdGUoXHJcbiAgICAgICAgZW52aXJvbm1lbnQ6IElFbnZpcm9ubWVudENvbmZpZ3VyYXRpb25cclxuICAgICk6IElNZXNzYWdpbmdDbGllbnQge1xyXG4gICAgICAgIGlmIChlbnZpcm9ubWVudC5tb2RlICE9PSAncHJvZHVjdGlvbicpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ01ldGhvZCBNZXNzYWdpbmdDbGllbnQuY3JlYXRlKCkgaXMgZGVwcmljYXRlZC4gUGxlYXNlIHVzZSBNZXNzYWdpbmdDbGllbnQuaW5zdGFudGlhdGUoKSBtZXRob2QgaW5zdGVhZC4nKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIE1lc3NhZ2luZ0NsaWVudC5pbnN0YW50aWF0ZShlbnZpcm9ubWVudCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBJbnN0YW50aWF0ZSBvZiBNZXNzYWdpbmdDbGllbnQuXHJcbiAgICAgKiBXaXRoIGNvbmZpZ3VyYXRpb24gaXQgY2FuIGJlIGNhbGxlZCBvbmx5IG9uY2UgYXQgdGhlIHNhbWUgcGFnZS5cclxuICAgICAqIFdpdGhvdXQgY29uZmlndXJhdGlvbiBpdCBjYW4gYmUgY2FsbGVkIG1hbnkgdGltZXMsIGJ1dCByZXR1cm5zIHRoZSBzYW1lIG9iamVjdC5cclxuICAgICAqXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0ge0lFbnZpcm9ubWVudENvbmZpZ3VyYXRpb259IGVudmlyb25tZW50IC0gQ29uZmlndXJhdGlvbiBvZiBlbnZpcm9ubWVudFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGluc3RhbnRpYXRlKFxyXG4gICAgICAgIGVudmlyb25tZW50PzogSUVudmlyb25tZW50Q29uZmlndXJhdGlvblxyXG4gICAgKTogSU1lc3NhZ2luZ0NsaWVudCB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBNZXNzYWdpbmdDbGllbnQoKS5pbnN0YW50aWF0ZShlbnZpcm9ubWVudCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZWluc3RhbnRpYXRlIG9mIE1lc3NhZ2luZ0NsaWVudCBmcm9tIGxpdGUgdmVyc2lvbi5cclxuICAgICAqXHJcbiAgICAgKiBDYWxsZWQgYXQgdGhlIGVuZCBvZiB0aGlzIGZpbGVcclxuICAgICAqXHJcbiAgICAgKiBAaW50ZXJuYWxcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7SUVudmlyb25tZW50Q29uZmlndXJhdGlvbn0gZW52aXJvbm1lbnQgLSBDb25maWd1cmF0aW9uIG9mIGVudmlyb25tZW50XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgcmVpbnN0YW50aWF0ZShcclxuICAgICAgICBlbnZpcm9ubWVudD86IElFbnZpcm9ubWVudENvbmZpZ3VyYXRpb25cclxuICAgICk6IHZvaWQge1xyXG4gICAgICAgIGlmIChMaXRlRGF0YUNvbnRhaW5lci5nZXQoKS5tZXNzYWdpbmdDbGllbnQpIHtcclxuICAgICAgICAgICAgbmV3IE1lc3NhZ2luZ0NsaWVudCgpLmluc3RhbnRpYXRlKGVudmlyb25tZW50KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBGb3JnZXQgYWJvdXQgYWxsIGluc3RhbmNlc1xyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIHRlcm1pbmF0ZShjYWxsYmFjaz86ICgpID0+IHZvaWQpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBkYXRhID0gTGl0ZURhdGFDb250YWluZXIuZ2V0KCk7XHJcblxyXG4gICAgICAgIGlmIChkYXRhLm1lc3NhZ2luZ0NsaWVudCkge1xyXG4gICAgICAgICAgICBkYXRhLm1lc3NhZ2luZ0NsaWVudC5zZW5kZXIuZGlzcG9zZShjYWxsYmFjayk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKGNhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgICAgICBjYWxsYmFjaygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBMaXRlRGF0YUNvbnRhaW5lci5jbGVhcigpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIGluaXRpYWxpemUoZGF0YTogSU1lc3NhZ2luZ0NsaWVudExpdGVEYXRhKTogTWVzc2FnaW5nQ2xpZW50SW5zdGFuY2Uge1xyXG4gICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xyXG4gICAgICAgIGlmICghZGF0YS5lbnZpcm9ubWVudCkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Vudmlyb25tZW50IHBhcmFtZXRlciBpcyBzdHJvbmdseSByZXF1aXJlZC4nKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHNlbmRlciA9IE1lc3NhZ2luZ0NsaWVudC5zZW5kZXIoZGF0YS5lbnZpcm9ubWVudCwgZGF0YS50ZXN0KTtcclxuXHJcbiAgICAgICAgbGV0IG1lc3NhZ2luZ0NsaWVudCA9IGRhdGEubWVzc2FnaW5nQ2xpZW50O1xyXG5cclxuICAgICAgICBpZiAobWVzc2FnaW5nQ2xpZW50KSB7XHJcbiAgICAgICAgICAgIG1lc3NhZ2luZ0NsaWVudC5zZW5kZXIgPSBzZW5kZXI7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbWVzc2FnaW5nQ2xpZW50ID0gbmV3IE1lc3NhZ2luZ0NsaWVudEluc3RhbmNlKHNlbmRlciwgbmV3IFRpbWVTdGFtcFByb3ZpZGVyKCkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgTWVzc2FnaW5nQ2xpZW50LnNlbmRCdWZmZXJlZERhdGEoZGF0YSwgc2VuZGVyKTtcclxuXHJcbiAgICAgICAgZGF0YS5pc0Z1bGxWZXJzaW9uID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgcmV0dXJuIG1lc3NhZ2luZ0NsaWVudDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBpbnRlcm5hbFxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IF90ZXN0RW52aXJvbm1lbnQ/OiBJVGVzdEVudmlyb25tZW50XHJcbiAgICApIHsgfVxyXG5cclxuICAgIHB1YmxpYyBpbnN0YW50aWF0ZShlbnZpcm9ubWVudD86IElFbnZpcm9ubWVudENvbmZpZ3VyYXRpb24pOiBJTWVzc2FnaW5nQ2xpZW50IHtcclxuICAgICAgICBjb25zdCBkYXRhID0gTGl0ZURhdGFDb250YWluZXIuZ2V0KCk7XHJcblxyXG4gICAgICAgIGlmIChkYXRhLmVudmlyb25tZW50ICYmIGVudmlyb25tZW50KSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQ29uZmlndXJhdGlvbiBvZiBNZXNzYWdpbmdDbGllbnRKUyBpcyBhbHJlYWR5IHNldC4gUGxlYXNlIHByb3ZpZGUgY29uZmlndXJhdGlvbiBvbmx5IG9uY2UuJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoZGF0YS5tZXNzYWdpbmdDbGllbnRcclxuICAgICAgICAgICAgJiYgZGF0YS5pc0Z1bGxWZXJzaW9uXHJcbiAgICAgICAgKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBkYXRhLm1lc3NhZ2luZ0NsaWVudDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGRhdGEuZW52aXJvbm1lbnQgPSBkYXRhLmVudmlyb25tZW50IHx8IGVudmlyb25tZW50O1xyXG5cclxuICAgICAgICBpZiAoZGF0YS5lbnZpcm9ubWVudCkge1xyXG4gICAgICAgICAgICBkYXRhLnRlc3QgPSBkYXRhLnRlc3QgfHwgdGhpcy5fdGVzdEVudmlyb25tZW50O1xyXG4gICAgICAgICAgICBkYXRhLm1lc3NhZ2luZ0NsaWVudCA9IE1lc3NhZ2luZ0NsaWVudC5pbml0aWFsaXplKGRhdGEpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGRhdGEubWVzc2FnaW5nQ2xpZW50KSB7XHJcbiAgICAgICAgICAgIHJldHVybiBkYXRhLm1lc3NhZ2luZ0NsaWVudDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignTGl0ZSB2ZXJzaW9uIG9mIE1lc3NhZ2luZ0NsaWVudEpTIHdhcyBub3QgbG9hZGVkLiBQbGVhc2UgcHJvdmlkZSBhIGNvbmZpZ3VyYXRpb24gdG8gaW5zdGFudGlhdGUgYSBmdWxsIHZlcnNpb24uJyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm1lbWJlci1vcmRlcmluZ1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgbG9nZ2VyKHRlc3Q6IElUZXN0RW52aXJvbm1lbnQgfCB1bmRlZmluZWQsIGVudmlyb25tZW50OiBJRW52aXJvbm1lbnRDb25maWd1cmF0aW9uKSB7XHJcbiAgICAgICAgY29uc3QgbG9nZ2VyID0gbmV3IFVuaXZlcnNhbExvZ2dlcihbXHJcbiAgICAgICAgICAgIG5ldyBDb25zb2xlTG9nZ2VyKCB7IG11dGU6ICFlbnZpcm9ubWVudC5kZWJ1ZyB9IClcclxuICAgICAgICBdKTtcclxuXHJcbiAgICAgICAgaWYgKHRlc3QgJiYgdGVzdC5saXN0ZW5lcnMgJiYgdGVzdC5saXN0ZW5lcnMubG9nKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGV2ZW50TG9nZ2VyID0gbmV3IEV2ZW50TG9nZ2VyKCk7XHJcbiAgICAgICAgICAgIGV2ZW50TG9nZ2VyLm9ubG9nLnN1YnNjcmliZSh0ZXN0Lmxpc3RlbmVycy5sb2cpO1xyXG4gICAgICAgICAgICBsb2dnZXIubG9nZ2Vycy5wdXNoKGV2ZW50TG9nZ2VyKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGxvZ2dlcjtcclxuICAgIH1cclxuXHJcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bWVtYmVyLW9yZGVyaW5nXHJcbiAgICBwcml2YXRlIHN0YXRpYyBzZW5kZXIoZW52aXJvbm1lbnQ6IElFbnZpcm9ubWVudENvbmZpZ3VyYXRpb24sIHRlc3Q/OiBJVGVzdEVudmlyb25tZW50KTogTWVzc2FnZVNlbmRlckZ1bGwge1xyXG4gICAgICAgIGNvbnN0IGVudmlyb25tZW50RGF0YSA9IG5ldyBFbnZpcm9ubWVudERhdGEoKTtcclxuXHJcbiAgICAgICAgb3ZlcnJpZGUoZW52aXJvbm1lbnREYXRhLCBlbnZpcm9ubWVudCk7XHJcblxyXG4gICAgICAgIGVudmlyb25tZW50RGF0YS52YWxpZGF0ZSgpO1xyXG5cclxuICAgICAgICBjb25zdCBsb2dnZXIgPSBNZXNzYWdpbmdDbGllbnQubG9nZ2VyKHRlc3QsIGVudmlyb25tZW50KTtcclxuXHJcbiAgICAgICAgY29uc3Qgc2VuZGVyID0gbmV3IE1lc3NhZ2VTZW5kZXJGdWxsKGVudmlyb25tZW50RGF0YSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9nZ2VyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXN0ID8gdGVzdC5jb25maWd1cmF0aW9uIDogbnVsbCk7XHJcblxyXG4gICAgICAgIGlmICh0ZXN0ICYmIHRlc3QubGlzdGVuZXJzKSB7XHJcbiAgICAgICAgICAgIGlmICh0ZXN0Lmxpc3RlbmVycy5hamF4KSB7XHJcbiAgICAgICAgICAgICAgICBzZW5kZXIuYWpheC5oYW5kbGVyID0gKG9wdGlvbnMpID0+ICgodGVzdC5saXN0ZW5lcnMgJiYgdGVzdC5saXN0ZW5lcnMuYWpheCAmJiB0ZXN0Lmxpc3RlbmVycy5hamF4KG9wdGlvbnMpKSB8fCAnJyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHNlbmRlci5wZXJmb3JtYW5jZS5zdWJzY3JpYmUoKHBlcmZvcm1hbmNlKSA9PiB0ZXN0Lmxpc3RlbmVycyAmJiB0ZXN0Lmxpc3RlbmVycy5wZXJmb3JtYW5jZSAmJiB0ZXN0Lmxpc3RlbmVycy5wZXJmb3JtYW5jZShwZXJmb3JtYW5jZSkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHNlbmRlcjtcclxuICAgIH1cclxuXHJcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bWVtYmVyLW9yZGVyaW5nXHJcbiAgICBwcml2YXRlIHN0YXRpYyBzZW5kQnVmZmVyZWREYXRhKGRhdGE6IElNZXNzYWdpbmdDbGllbnRMaXRlRGF0YSwgc2VuZGVyOiBNZXNzYWdlU2VuZGVyRnVsbCkge1xyXG4gICAgICAgIGlmIChkYXRhLmJ1ZmZlcikge1xyXG4gICAgICAgICAgICBzZW5kZXIuc2VuZChkYXRhLmJ1ZmZlci5pdGVtcyk7XHJcbiAgICAgICAgICAgIGRhdGEuYnVmZmVyLml0ZW1zLmxlbmd0aCA9IDA7XHJcbiAgICAgICAgICAgIGRhdGEuYnVmZmVyID0gdW5kZWZpbmVkO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuLy8gVHJ5IGluc3RhbnRpYXRlIGEgZnVsbCB2ZXJzaW9uIGZyb20gY29uZmlndXJhdGlvblxyXG5NZXNzYWdpbmdDbGllbnQucmVpbnN0YW50aWF0ZSgpO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvaWZkZWYtbG9hZGVyL2lmZGVmLWxvYWRlci5qcz9ERUJVRz10cnVlJlBFUkZPUk1BTkNFX0FVRElUPXRydWUhLi9zcmMvbWVzc2FnaW5nLWNsaWVudC1mdWxsLnRzIiwiaW1wb3J0IHsgRW52aXJvbm1lbnRNb2RlIH0gZnJvbSAnLi4vLi4vZGVmaW5pdGlvbnMvZW52aXJvbm1lbnQnO1xyXG5pbXBvcnQgeyBJRW52aXJvbm1lbnREYXRhIH0gZnJvbSAnLi4vZW52aXJvbm1lbnQnO1xyXG5cclxuLyoqXHJcbiAqIERlZmF1bHQgdmFsdWVzIG9mIEVudmlyb25tZW50RGF0YVxyXG4gKlxyXG4gKiBAaW50ZXJuYWxcclxuICogQGNsYXNzIEVudmlyb25tZW50RGF0YVxyXG4gKiBAaW1wbGVtZW50cyB7SUVudmlyb25tZW50RGF0YX1cclxuICovXHJcbmV4cG9ydCBjbGFzcyBFbnZpcm9ubWVudERhdGEgaW1wbGVtZW50cyBJRW52aXJvbm1lbnREYXRhIHtcclxuICAgIHB1YmxpYyB3b3JrZXJVcmwgPSAnJztcclxuXHJcbiAgICBwdWJsaWMgcG9seWZpbGxzVXJsID0gJy9tZXNzYWdpbmctY2xpZW50LXBvbHlmaWxscy5qcyc7XHJcblxyXG4gICAgcHVibGljIGFwaUtleSA9ICcnO1xyXG5cclxuICAgIHB1YmxpYyBmb3JjZVBvbHlmaWxscyA9IGZhbHNlO1xyXG5cclxuICAgIHB1YmxpYyBmYWtlTW9kZSA9IGZhbHNlO1xyXG5cclxuICAgIHB1YmxpYyBkZWJ1ZyA9IGZhbHNlO1xyXG5cclxuICAgIHB1YmxpYyBtb2RlOiBFbnZpcm9ubWVudE1vZGUgPSAncHJvZHVjdGlvbic7XHJcblxyXG4gICAgcHVibGljIHBlcmZvcm1hbmNlQXVkaXQgPSBmYWxzZTtcclxuXHJcbiAgICBwdWJsaWMgdmFsaWRhdGUoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmFwaUtleSkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0FwaUtleSBpcyByZXF1aXJlZCBidXQgbm90IGRlZmluZWQgb3IgZW1wdHkuJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghdGhpcy53b3JrZXJVcmwpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdXb3JrZXJVcmwgaXMgcmVxdWlyZWQgYnV0IG5vdCBkZWZpbmVkIG9yIGVtcHR5LicpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvaWZkZWYtbG9hZGVyL2lmZGVmLWxvYWRlci5qcz9ERUJVRz10cnVlJlBFUkZPUk1BTkNFX0FVRElUPXRydWUhLi9zcmMvY29uZmlndXJhdGlvbnMvZGVmYXVsdHMvZW52aXJvbm1lbnQudHMiLCJpbXBvcnQgeyBJQ29uZmlndXJhdGlvbiwgSUVudmlyb25tZW50RGF0YSB9IGZyb20gJy4vY29uZmlndXJhdGlvbnMnO1xyXG5pbXBvcnQgeyBjb25maWd1cmF0aW9uIGFzIHByZWRlZmluZWRDb25maWd1cmF0aW9uIH0gZnJvbSAnLi9jb25maWd1cmF0aW9ucy9kZWZhdWx0cy9jb25maWd1cmF0aW9uJztcclxuaW1wb3J0IHsgSU1lc3NhZ2UgfSBmcm9tICcuL2RlZmluaXRpb25zJztcclxuaW1wb3J0IHsgSVNlbmRpbmdPcHRpb25zIH0gZnJvbSAnLi9kZWZpbml0aW9ucy9zZW5kaW5nLW9wdGlvbnMnO1xyXG5pbXBvcnQgeyBCdWZmZXJDYWxsIH0gZnJvbSAnLi9mcmFtZXdvcmsvYnVmZmVyLWNhbGwnO1xyXG5pbXBvcnQgeyBJTG9nZ2VyIH0gZnJvbSAnLi9sb2dzJztcclxuaW1wb3J0IHsgTWFpblJlY2VpdmVyTG9nZ2VyIH0gZnJvbSAnLi9sb2dzL21haW4tcmVjZWl2ZXItbG9nZ2VyJztcclxuaW1wb3J0IHsgSU1lc3NhZ2VTZW5kZXIgfSBmcm9tICcuL21lc3NhZ2Utc2VuZGVyJztcclxuaW1wb3J0IHsgTWFpblJlY2VpdmVyIH0gZnJvbSAnLi93b3JrZXJzL21haW4tcmVjZWl2ZXInO1xyXG5pbXBvcnQgeyBXb3JrZXJSZXF1ZXN0U2VuZGVyIH0gZnJvbSAnLi93b3JrZXJzL3NlbmRlcnMvd29ya2VyLXJlcXVlc3Qtc2VuZGVyJztcclxuaW1wb3J0IHsgSUNvbmZpZ3VyYXRpb25Xb3JrZXJNZXNzYWdlLCBJTWVzc2FnZXNXb3JrZXJNZXNzYWdlLCBJV29ya2VySW5zdGFuY2UgfSBmcm9tICcuL3dvcmtlcnMvd29ya2VyLWRlZmluaXRpb25zJztcclxuaW1wb3J0IHsgV29ya2VyUHJvdmlkZXIgfSBmcm9tICcuL3dvcmtlcnMvd29ya2VyLXByb3ZpZGVyJztcclxuXHJcbi8qKlxyXG4gKiBNZXNzYWdlIHNlbmRlciBpbXBsZW1lbnRhdGlvbiBmb3IgZnVsbCBtb2RlXHJcbiAqXHJcbiAqIEBpbnRlcm5hbFxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIE1lc3NhZ2VTZW5kZXJGdWxsIGltcGxlbWVudHMgSU1lc3NhZ2VTZW5kZXIge1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfd29ya2VyOiBJV29ya2VySW5zdGFuY2U7XHJcblxyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfcmVjZWl2ZXI6IE1haW5SZWNlaXZlcjtcclxuXHJcbiAgICBwdWJsaWMgZ2V0IGFqYXgoKSB7IHJldHVybiB0aGlzLl9yZWNlaXZlci5hamF4OyB9XHJcblxyXG4gICAgcHVibGljIGdldCBwZXJmb3JtYW5jZSgpIHsgcmV0dXJuIHRoaXMuX3JlY2VpdmVyLnBlcmZvcm1hbmNlOyB9XHJcblxyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfdGVybWluYXRlQ29tbWFuZDogV29ya2VyUmVxdWVzdFNlbmRlcjwndGVybWluYXRlJywgdW5kZWZpbmVkLCB2b2lkPjtcclxuXHJcbiAgICBwcml2YXRlIF9kaXNwb3NlZCA9IGZhbHNlO1xyXG5cclxuICAgIHByaXZhdGUgcmVhZG9ubHkgX3NlbmRNZXNzYWdlczogQnVmZmVyQ2FsbDxJTWVzc2FnZT47XHJcblxyXG4gICAgcHJpdmF0ZSBfcGluZ0ludGVydmFsSWQ6IGFueTtcclxuXHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9jb25maWd1cmF0aW9uOiBJQ29uZmlndXJhdGlvbldvcmtlck1lc3NhZ2U7XHJcblxyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgZW52aXJvbm1lbnQ6IElFbnZpcm9ubWVudERhdGEsXHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBfbG9nZ2VyOiBJTG9nZ2VyLFxyXG4gICAgICAgIGNvbmZpZ3VyYXRpb246IElDb25maWd1cmF0aW9uIHwgbnVsbCA9IG51bGxcclxuICAgICkge1xyXG4gICAgICAgIGNvbmZpZ3VyYXRpb24gPSBjb25maWd1cmF0aW9uIHx8IHByZWRlZmluZWRDb25maWd1cmF0aW9uKGVudmlyb25tZW50Lm1vZGUpO1xyXG4gICAgICAgIGNvbnN0IHdvcmtlclByb3ZpZGVyID0gbmV3IFdvcmtlclByb3ZpZGVyKGVudmlyb25tZW50LndvcmtlclVybCwgY29uZmlndXJhdGlvbi53b3JrZXJzIHx8IFtdLCBfbG9nZ2VyKTtcclxuXHJcbiAgICAgICAgY29uc3Qgd29ya2VyID0gdGhpcy5fd29ya2VyID0gd29ya2VyUHJvdmlkZXIubmV3KCk7XHJcblxyXG4gICAgICAgIHRoaXMuX3JlY2VpdmVyID0gbmV3IE1haW5SZWNlaXZlcih3b3JrZXIsIF9sb2dnZXIpO1xyXG4gICAgICAgIHRoaXMuX3Rlcm1pbmF0ZUNvbW1hbmQgPSBuZXcgV29ya2VyUmVxdWVzdFNlbmRlcigndGVybWluYXRlJywgd29ya2VyLCB0aGlzLl9yZWNlaXZlci5yZWNlaXZlcik7XHJcblxyXG4gICAgICAgIE1haW5SZWNlaXZlckxvZ2dlci5sb2codGhpcy5fcmVjZWl2ZXIsIHRoaXMuX2xvZ2dlcik7XHJcblxyXG4gICAgICAgIHRoaXMuX2NvbmZpZ3VyYXRpb24gPSB7IHR5cGU6ICdjb25maWd1cmF0aW9uJywgY29uZmlndXJhdGlvbiwgZW52aXJvbm1lbnQgfTtcclxuXHJcbiAgICAgICAgLy8gSW5pdGlhbGl6ZSB3b3JrZXIgYnkgY29uZmlndXJhdGlvblxyXG4gICAgICAgIHdvcmtlci5wb3N0TWVzc2FnZSh0aGlzLl9jb25maWd1cmF0aW9uKTtcclxuXHJcbiAgICAgICAgdGhpcy5fc2VuZE1lc3NhZ2VzID0gbmV3IEJ1ZmZlckNhbGw8SU1lc3NhZ2U+KChtZXNzYWdlcykgPT4ge1xyXG4gICAgICAgICAgICB3b3JrZXIucG9zdE1lc3NhZ2UoeyB0eXBlOiAnbWVzc2FnZXMnLCBtZXNzYWdlcyB9IGFzIElNZXNzYWdlc1dvcmtlck1lc3NhZ2UpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLnBpbmcoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2VuZChtZXNzYWdlOiBJTWVzc2FnZSB8IEFycmF5PElNZXNzYWdlPiwgb3B0aW9ucz86IElTZW5kaW5nT3B0aW9ucyk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX3NlbmRNZXNzYWdlcy5jYWxsKG1lc3NhZ2UsIG9wdGlvbnMgJiYgb3B0aW9ucy5zeW5jKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZGlzcG9zZShjYWxsYmFjaz86ICgpID0+IHZvaWQpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCByZXNvbHZlID0gY2FsbGJhY2sgfHwgKCgpID0+IHsgLyoqLyB9KTtcclxuXHJcbiAgICAgICAgaWYgKCF0aGlzLl9kaXNwb3NlZCkge1xyXG4gICAgICAgICAgICB0aGlzLl9kaXNwb3NlZCA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5fcGluZ0ludGVydmFsSWQpIHtcclxuICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5fcGluZ0ludGVydmFsSWQpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjb25zdCB3b3JrZXIgPSB0aGlzLl93b3JrZXI7XHJcbiAgICAgICAgICAgIGNvbnN0IGhhbmRsZXIgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3NlbmRNZXNzYWdlcy5jbGVhcigpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3JlY2VpdmVyLmRpc3Bvc2UoKTtcclxuICAgICAgICAgICAgICAgIH0gZmluYWxseSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gd29ya2VyLnRlcm1pbmF0ZSgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0ICYmIHR5cGVvZiByZXN1bHQudGhlbiA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQudGhlbigoKSA9PiByZXNvbHZlKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHRoaXMuX3Rlcm1pbmF0ZUNvbW1hbmQuc2VuZCh1bmRlZmluZWQsIGhhbmRsZXIsIGhhbmRsZXIpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJlc29sdmUoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBwaW5nKCkge1xyXG4gICAgICAgIHRoaXMuX3BpbmdJbnRlcnZhbElkID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLl93b3JrZXIucG9zdE1lc3NhZ2UodGhpcy5fY29uZmlndXJhdGlvbik7XHJcbiAgICAgICAgfSwgNTAwMCk7XHJcbiAgICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL2lmZGVmLWxvYWRlci9pZmRlZi1sb2FkZXIuanM/REVCVUc9dHJ1ZSZQRVJGT1JNQU5DRV9BVURJVD10cnVlIS4vc3JjL21lc3NhZ2Utc2VuZGVyLWZ1bGwudHMiLCIvLyB0c2xpbnQ6ZGlzYWJsZTpxdW90ZW1hcmtcclxuaW1wb3J0IHsgRW52aXJvbm1lbnRNb2RlIH0gZnJvbSBcIi4uLy4uL2RlZmluaXRpb25zXCI7XHJcbmltcG9ydCB7IElDb25maWd1cmF0aW9uLCBJRkVBbmFseXRpY0NvbGxlY3RvckVuZHBvaW50Q29uZmlnIH0gZnJvbSAnLi4vY29uZmlndXJhdGlvbic7XHJcblxyXG4vKipcclxuICogQGludGVybmFsXHJcbiAqL1xyXG5leHBvcnQgY29uc3QgY29uZmlndXJhdGlvbiA9IChtb2RlOiBFbnZpcm9ubWVudE1vZGUpOiBJQ29uZmlndXJhdGlvbiA9PiB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIC8vIHdvcmtlcnM6IFsnZW11bGF0ZWQnXSxcclxuICAgICAgICBlbmRwb2ludHM6IFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdHlwZTogXCJmZS1hbmFseXRpYy1jb2xsZWN0b3JcIixcclxuICAgICAgICAgICAgICAgIHVybDogbW9kZSA9PT0gJ3Byb2R1Y3Rpb24nID8gXCJodHRwczovL2FuYWx5dGljcy5hZ29kYS5jb21cIiA6IFwiLy9oa2ctZ2Mtc3RhZ2luZy5hZ29kYS5sb2NhbFwiLFxyXG4gICAgICAgICAgICAgICAgdGltZW91dDogNjAwMDAsXHJcbiAgICAgICAgICAgICAgICBxdWV1ZXM6IFtcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBcImRlZmF1bHRcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmx1c2hUaW1lOiAxMDAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXhGbHVzaFRpbWU6IDMwMDAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBiYXRjaFNpemU6IDUwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXhNZXNzYWdlQ291bnQ6IDE1MDAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwZXJzaXN0ZW50OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhdHRlbXB0Q291bnQ6IDIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbGxUaHJlc2hvbGQ6IDAuNlxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgfSBhcyBJRkVBbmFseXRpY0NvbGxlY3RvckVuZHBvaW50Q29uZmlnXHJcbiAgICAgICAgXVxyXG4gICAgfTtcclxufTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL2lmZGVmLWxvYWRlci9pZmRlZi1sb2FkZXIuanM/REVCVUc9dHJ1ZSZQRVJGT1JNQU5DRV9BVURJVD10cnVlIS4vc3JjL2NvbmZpZ3VyYXRpb25zL2RlZmF1bHRzL2NvbmZpZ3VyYXRpb24udHMiLCJpbXBvcnQgeyBVbmxvYWRFdmVudCB9IGZyb20gJy4vdW5sb2FkLWV2ZW50JztcclxuXHJcbi8qKlxyXG4gKiBDYWxsIGZ1bmN0aW9uIGF0IHRoZSBlbmQgb2YgdGhlIGN1cnJlbnQgSlMgZXhlY3V0aW9uIGZsb3cgd2l0aCBjb25jYXRlbmRhdGVkIGFycmF5XHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgQnVmZmVyQ2FsbDxUPiB7XHJcbiAgICBwcml2YXRlIF9idWZmZXIgPSBuZXcgQXJyYXk8VD4oKTtcclxuICAgIHByaXZhdGUgdGltZW91dElkOiBhbnk7XHJcblxyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBfYWN0aW9uOiAoYnVmZmVyOiBBcnJheTxUPikgPT4gdm9pZFxyXG4gICAgKSB7IH1cclxuXHJcbiAgICBwdWJsaWMgY2FsbCh2YWx1ZTogVCB8IEFycmF5PFQ+LCBzeW5jOiBib29sZWFuID0gZmFsc2UpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9idWZmZXIucHVzaCguLi52YWx1ZSk7XHJcblxyXG4gICAgICAgIGlmIChzeW5jKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZmx1c2goKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMudGltZW91dElkKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRpbWVvdXRJZCA9IHNldFRpbWVvdXQodGhpcy5mbHVzaCk7XHJcbiAgICAgICAgICAgICAgICBVbmxvYWRFdmVudC5hZGRMaXN0ZW5lcih0aGlzLmZsdXNoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xlYXIoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fYnVmZmVyID0gbmV3IEFycmF5PFQ+KCk7XHJcbiAgICAgICAgaWYgKHRoaXMudGltZW91dElkKSB7XHJcbiAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aGlzLnRpbWVvdXRJZCk7XHJcbiAgICAgICAgICAgIHRoaXMudGltZW91dElkID0gdW5kZWZpbmVkO1xyXG4gICAgICAgIH1cclxuICAgICAgICBVbmxvYWRFdmVudC5yZW1vdmVMaXN0ZW5lcih0aGlzLmZsdXNoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGZsdXNoID0gKCkgPT4ge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9idWZmZXIubGVuZ3RoICE9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9hY3Rpb24odGhpcy5fYnVmZmVyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZmluYWxseSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2xlYXIoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL2lmZGVmLWxvYWRlci9pZmRlZi1sb2FkZXIuanM/REVCVUc9dHJ1ZSZQRVJGT1JNQU5DRV9BVURJVD10cnVlIS4vc3JjL2ZyYW1ld29yay9idWZmZXItY2FsbC50cyIsImltcG9ydCB7IE1haW5SZWNlaXZlciB9IGZyb20gJy4uL3dvcmtlcnMvbWFpbi1yZWNlaXZlcic7XHJcbmltcG9ydCB7IElMb2dnZXIgfSBmcm9tICcuL2xvZ2dlcic7XHJcbmltcG9ydCB7IElXb3JrZXJMb2cgfSBmcm9tICcuL3dvcmtlci1sb2cnO1xyXG5cclxuLyoqXHJcbiAqIEVtaXQgbG9ncyBmcm9tIE1haW5SZWNlaXZlclxyXG4gKlxyXG4gKiBAaW50ZXJuYWxcclxuICovXHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBNYWluUmVjZWl2ZXJMb2dnZXIge1xyXG4gICAgcHVibGljIHN0YXRpYyBsb2cocmVjZWl2ZXI6IE1haW5SZWNlaXZlciwgbG9nZ2VyOiBJTG9nZ2VyKSB7XHJcbiAgICAgICAgcmVjZWl2ZXIubG9nLnN1YnNjcmliZSgobG9nKSA9PiBNYWluUmVjZWl2ZXJMb2dnZXIucHJpbnRMb2cobG9nZ2VyLCBsb2cpKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBwcmludExvZyhsb2dnZXI6IElMb2dnZXIsIGxvZzogSVdvcmtlckxvZykge1xyXG4gICAgICAgIHN3aXRjaCAobG9nLmxldmVsKSB7XHJcbiAgICAgICAgICAgIGNhc2UgJ2xvZyc6IGxvZ2dlci5sb2cobG9nLm1lc3NhZ2UpOyBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnZXJyb3InOiBsb2dnZXIuZXJyb3IobG9nLm1lc3NhZ2UpOyBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnZmF0YWwnOiBsb2dnZXIuZmF0YWwobG9nLm1lc3NhZ2UpOyBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDogbG9nZ2VyLmxvZyhsb2cubWVzc2FnZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy9pZmRlZi1sb2FkZXIvaWZkZWYtbG9hZGVyLmpzP0RFQlVHPXRydWUmUEVSRk9STUFOQ0VfQVVESVQ9dHJ1ZSEuL3NyYy9sb2dzL21haW4tcmVjZWl2ZXItbG9nZ2VyLnRzIiwiaW1wb3J0IHsgSUFqYXhPcHRpb25zIH0gZnJvbSAnLi4vZnJhbWV3b3JrL2FqYXgtZGVmaW5pdGlvbnMnO1xyXG5pbXBvcnQgeyBFdmVudEVtaXR0ZXIgfSBmcm9tICcuLi9mcmFtZXdvcmsvZXZlbnQtZW1pdHRlcic7XHJcbmltcG9ydCB7IElMb2dnZXIgfSBmcm9tICcuLi9sb2dzL2xvZ2dlcic7XHJcbmltcG9ydCB7IElXb3JrZXJMb2cgfSBmcm9tICcuLi9sb2dzL3dvcmtlci1sb2cnO1xyXG5pbXBvcnQgeyBJUGVyZm9ybWFuY2VSZXBvcnQgfSBmcm9tICcuLi9wcm9jZXNzaW5nL2F1ZGl0L2RlZmluaXRpb25zJztcclxuaW1wb3J0IHsgTWVzc2FnZVJlY2VpdmVyIH0gZnJvbSAnLi9zZW5kZXJzL21lc3NhZ2UtcmVjZWl2ZXInO1xyXG5pbXBvcnQgeyBPcHRpb25hbFJlc3BvbnNlRW1pdHRlciB9IGZyb20gJy4vc2VuZGVycy9yZXNwb25zZS1lbWl0dGVyJztcclxuaW1wb3J0IHsgV29ya2VyRXZlbnRSZWNlaXZlciB9IGZyb20gJy4vc2VuZGVycy93b3JrZXItZXZlbnQtcmVjZWl2ZXInO1xyXG5pbXBvcnQgeyBXb3JrZXJSZXF1ZXN0UmVjZWl2ZXIgfSBmcm9tICcuL3NlbmRlcnMvd29ya2VyLXJlcXVlc3QtcmVjZWl2ZXInO1xyXG5pbXBvcnQgeyBJTG9nV29ya2VyTWVzc2FnZSwgSVBlcmZvcm1hbmNlV29ya2VyTWVzc2FnZSwgSVdvcmtlckluc3RhbmNlIH0gZnJvbSAnLi93b3JrZXItZGVmaW5pdGlvbnMnO1xyXG5cclxuLyoqXHJcbiAqIENsYXNzIHRvIHJlY2VpdmUgZXZlbnRzIGZyb20gV2ViV29ya2VyXHJcbiAqXHJcbiAqIEBpbnRlcm5hbFxyXG4gKiBAY2xhc3MgTWFpblJlY2VpdmVyXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgTWFpblJlY2VpdmVyIHtcclxuICAgIHB1YmxpYyByZWFkb25seSByZWNlaXZlcjogTWVzc2FnZVJlY2VpdmVyO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVjZWl2ZWQgbmV3IGFqYXggcmVxdWVzdFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcmVhZG9ubHkgYWpheCA9IG5ldyBPcHRpb25hbFJlc3BvbnNlRW1pdHRlcjxJQWpheE9wdGlvbnMsIHN0cmluZz4oJ3t9Jyk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZWNlaXZlZCBuZXcgbG9nc1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcmVhZG9ubHkgbG9nOiBFdmVudEVtaXR0ZXI8SVdvcmtlckxvZz47XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZWNlaXZlZCBuZXcgcGVyZm9tYW5jZSByZXBvcnRcclxuICAgICAqL1xyXG4gICAgcHVibGljIHJlYWRvbmx5IHBlcmZvcm1hbmNlOiBFdmVudEVtaXR0ZXI8SVBlcmZvcm1hbmNlUmVwb3J0PjtcclxuXHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9hamF4OiBXb3JrZXJSZXF1ZXN0UmVjZWl2ZXI8J2FqYXgnLCBJQWpheE9wdGlvbnMsIHN0cmluZz47XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9sb2c6IFdvcmtlckV2ZW50UmVjZWl2ZXI8J2xvZycsIElMb2dXb3JrZXJNZXNzYWdlPjtcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgX3BlcmZvcm1hbmNlOiBXb3JrZXJFdmVudFJlY2VpdmVyPCdwZXJmb3JtYW5jZScsIElQZXJmb3JtYW5jZVdvcmtlck1lc3NhZ2U+O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHdvcmtlcjogSVdvcmtlckluc3RhbmNlLFxyXG4gICAgICAgIGxvZ2dlcjogSUxvZ2dlcixcclxuICAgICkge1xyXG4gICAgICAgIHRoaXMucmVjZWl2ZXIgPSBuZXcgTWVzc2FnZVJlY2VpdmVyKHdvcmtlciwgbG9nZ2VyKTtcclxuXHJcbiAgICAgICAgdGhpcy5fYWpheCA9IG5ldyBXb3JrZXJSZXF1ZXN0UmVjZWl2ZXIoJ2FqYXgnLCB3b3JrZXIsIHRoaXMucmVjZWl2ZXIsIHRoaXMuYWpheCk7XHJcblxyXG4gICAgICAgIHRoaXMuX2xvZyA9IG5ldyBXb3JrZXJFdmVudFJlY2VpdmVyKCdsb2cnLCB0aGlzLnJlY2VpdmVyKTtcclxuXHJcbiAgICAgICAgdGhpcy5fcGVyZm9ybWFuY2UgPSBuZXcgV29ya2VyRXZlbnRSZWNlaXZlcigncGVyZm9ybWFuY2UnLCB0aGlzLnJlY2VpdmVyKTtcclxuXHJcbiAgICAgICAgdGhpcy5sb2cgPSB0aGlzLl9sb2cuZXZlbnQubWFwKChkYXRhKSA9PiBkYXRhLmxvZyk7XHJcblxyXG4gICAgICAgIHRoaXMucGVyZm9ybWFuY2UgPSB0aGlzLl9wZXJmb3JtYW5jZS5ldmVudC5tYXAoKGRhdGEpID0+IGRhdGEucmVwb3J0KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZGlzcG9zZSgpIHtcclxuICAgICAgICB0aGlzLl9hamF4LmRpc3Bvc2UoKTtcclxuICAgICAgICB0aGlzLl9sb2cuZGlzcG9zZSgpO1xyXG4gICAgICAgIHRoaXMuX3BlcmZvcm1hbmNlLmRpc3Bvc2UoKTtcclxuICAgIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvaWZkZWYtbG9hZGVyL2lmZGVmLWxvYWRlci5qcz9ERUJVRz10cnVlJlBFUkZPUk1BTkNFX0FVRElUPXRydWUhLi9zcmMvd29ya2Vycy9tYWluLXJlY2VpdmVyLnRzIiwiaW1wb3J0IHsgU3VwcG9ydGVkV29ya2VyIH0gZnJvbSAnLi4vY29uZmlndXJhdGlvbnMvY29uZmlndXJhdGlvbic7XHJcbmltcG9ydCB7IFNlcnZpY2VXb3JrZXJVdGlscyB9IGZyb20gJy4uL2ZyYW1ld29yay9zZXJ2aWNlLXdvcmtlci11dGlscyc7XHJcbmltcG9ydCB7IElMb2dnZXIgfSBmcm9tICcuLi9sb2dzL2xvZ2dlcic7XHJcbmltcG9ydCB7IFBzZXVkb1dvcmtlciB9IGZyb20gJy4vcHNldWRvLXdvcmtlcic7XHJcbmltcG9ydCB7IFNlcnZpY2VXb3JrZXJTeW5jaHJvbm91cyB9IGZyb20gJy4vc2VydmljZS13b3JrZXItc3luY2hyb25vdXMnO1xyXG5pbXBvcnQgeyBJV29ya2VySW5zdGFuY2UgfSBmcm9tICcuL3dvcmtlci1kZWZpbml0aW9ucyc7XHJcblxyXG4vKipcclxuICogQ3JlYXRlIHN1cHBvcnRlZCBieSBjdXJyZW50IGVudmlyb25tZW50IFdlYldvcmtlclxyXG4gKlxyXG4gKiBAaW50ZXJuYWxcclxuICogQGNsYXNzIFdvcmtlclByb3ZpZGVyXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgV29ya2VyUHJvdmlkZXIge1xyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBfcGF0aDogc3RyaW5nLFxyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgX3dvcmtlcnM6IEFycmF5PFN1cHBvcnRlZFdvcmtlcj4sXHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBfbG9nZ2VyOiBJTG9nZ2VyXHJcbiAgICApIHsgfVxyXG5cclxuICAgIHB1YmxpYyBuZXcoKTogSVdvcmtlckluc3RhbmNlIHtcclxuICAgICAgICBjb25zdCBzdXBwb3J0ZWRXb3JrZXJzID0gdGhpcy5zdXBwb3J0ZWRXb3JrZXIodGhpcy5fd29ya2Vycyk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlKHN1cHBvcnRlZFdvcmtlcnMpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY3JlYXRlKHR5cGU6IFN1cHBvcnRlZFdvcmtlcik6IElXb3JrZXJJbnN0YW5jZSB7XHJcbiAgICAgICAgdGhpcy5fbG9nZ2VyLmxvZyhgQ3JlYXRpbmcgd29ya2VyOiAnJHt0eXBlfSdgKTtcclxuICAgICAgICBzd2l0Y2ggKHR5cGUpIHtcclxuICAgICAgICAgICAgY2FzZSAnc2VydmljZSc6IHJldHVybiB0aGlzLnNlcnZpY2VXb3JrZXIoKTtcclxuICAgICAgICAgICAgY2FzZSAnZW11bGF0ZWQnOiByZXR1cm4gdGhpcy5lbXVsYXRlZFdvcmtlcigpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGVtdWxhdGVkV29ya2VyKCk6IElXb3JrZXJJbnN0YW5jZSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQc2V1ZG9Xb3JrZXIodGhpcy5fcGF0aCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzZXJ2aWNlV29ya2VyKCk6IElXb3JrZXJJbnN0YW5jZSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBTZXJ2aWNlV29ya2VyU3luY2hyb25vdXModGhpcy5fcGF0aCwgKHJlYXNvbikgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLl9sb2dnZXIuZXJyb3IocmVhc29uLnN0YWNrKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlKHRoaXMuc3VwcG9ydGVkV29ya2VyKFsnZW11bGF0ZWQnXSkpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc3VwcG9ydGVkV29ya2VyKHByZWZlcmVuY2U6IEFycmF5PFN1cHBvcnRlZFdvcmtlcj4gPSBbJ3NlcnZpY2UnLCAnZW11bGF0ZWQnXSk6IFN1cHBvcnRlZFdvcmtlciB7XHJcbiAgICAgICAgaWYgKFNlcnZpY2VXb3JrZXJVdGlscy5pc1N1cHBvcnRlZCgpICYmIHByZWZlcmVuY2UuaW5kZXhPZignc2VydmljZScpID49IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuICdzZXJ2aWNlJztcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHByZWZlcmVuY2UuaW5kZXhPZignZW11bGF0ZWQnKSA+PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAnZW11bGF0ZWQnO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5zdXBwb3J0ZWRXb3JrZXIoKTtcclxuICAgIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvaWZkZWYtbG9hZGVyL2lmZGVmLWxvYWRlci5qcz9ERUJVRz10cnVlJlBFUkZPUk1BTkNFX0FVRElUPXRydWUhLi9zcmMvd29ya2Vycy93b3JrZXItcHJvdmlkZXIudHMiLCJleHBvcnQgZnVuY3Rpb24gZW5kc1dpdGgoc3RyOiBzdHJpbmcsIHNlYXJjaFN0cjogc3RyaW5nLCBwb3NpdGlvbjogbnVtYmVyID0gMCk6IGJvb2xlYW4ge1xyXG4gICAgaWYgKHR5cGVvZiBzdHIuZW5kc1dpdGggPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICByZXR1cm4gc3RyLmVuZHNXaXRoKHNlYXJjaFN0ciwgcG9zaXRpb24pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFRoaXMgd29ya3MgbXVjaCBiZXR0ZXIgdGhhbiA+PSBiZWNhdXNlXHJcbiAgICAvLyBpdCBjb21wZW5zYXRlcyBmb3IgTmFOOlxyXG4gICAgaWYgKCEocG9zaXRpb24gPCB0aGlzLmxlbmd0aCkpIHtcclxuICAgICAgICBwb3NpdGlvbiA9IHRoaXMubGVuZ3RoO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBwb3NpdGlvbiB8PSAwOyAvLyByb3VuZCBwb3NpdGlvblxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHN0ci5zdWJzdHIocG9zaXRpb24gLSBzZWFyY2hTdHIubGVuZ3RoLCBzZWFyY2hTdHIubGVuZ3RoKSA9PT0gc2VhcmNoU3RyO1xyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy9pZmRlZi1sb2FkZXIvaWZkZWYtbG9hZGVyLmpzP0RFQlVHPXRydWUmUEVSRk9STUFOQ0VfQVVESVQ9dHJ1ZSEuL3NyYy9mcmFtZXdvcmsvc3RyaW5ncy50cyIsImltcG9ydCB7IFN5bmNDYWxsIH0gZnJvbSAnLi4vZnJhbWV3b3JrL3N5bmMtY2FsbCc7XHJcbmltcG9ydCB7IFNlcnZpY2VXb3JrZXJXcmFwcGVyIH0gZnJvbSAnLi9zZXJ2aWNlLXdvcmtlci13cmFwcGVyJztcclxuaW1wb3J0IHsgSVdvcmtlckluc3RhbmNlLCBNZXNzYWdlRXZlbnRMaXN0ZW5lciB9IGZyb20gJy4vd29ya2VyLWRlZmluaXRpb25zJztcclxuXHJcbi8qKlxyXG4gKiBDb252ZXJ0IElXb3JrZXJJbnN0YW5jZSBtZXRob2QgY2FsbGluZyB0byBzeW5jaHJvbm91cyBvcGVyYXRpb25zXHJcbiAqXHJcbiAqIEBpbnRlcm5hbFxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFNlcnZpY2VXb3JrZXJTeW5jaHJvbm91cyBpbXBsZW1lbnRzIElXb3JrZXJJbnN0YW5jZSB7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9zeW5jOiBTeW5jQ2FsbDxJV29ya2VySW5zdGFuY2U+O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHBhdGg6IHN0cmluZyxcclxuICAgICAgICBkb3duZ3JhZGU6IChyZWFzb246IGFueSkgPT4gSVdvcmtlckluc3RhbmNlXHJcbiAgICApIHtcclxuICAgICAgICBjb25zdCBzZXJ2aWNlV29ya2VyID0gU2VydmljZVdvcmtlcldyYXBwZXIuY3JlYXRlKHBhdGgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmNhdGNoKChlcnJvcikgPT4gZG93bmdyYWRlKGVycm9yKSk7XHJcblxyXG4gICAgICAgIHRoaXMuX3N5bmMgPSBuZXcgU3luY0NhbGwoc2VydmljZVdvcmtlcik7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFkZEV2ZW50TGlzdGVuZXIodHlwZTogJ21lc3NhZ2UnLCBsaXN0ZW5lcjogTWVzc2FnZUV2ZW50TGlzdGVuZXIpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9zeW5jLmNhbGwoKHN3KSA9PiBzdy5hZGRFdmVudExpc3RlbmVyKHR5cGUsIGxpc3RlbmVyKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlbW92ZUV2ZW50TGlzdGVuZXIodHlwZTogJ21lc3NhZ2UnLCBsaXN0ZW5lcjogTWVzc2FnZUV2ZW50TGlzdGVuZXIpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9zeW5jLmNhbGwoKHN3KSA9PiBzdy5yZW1vdmVFdmVudExpc3RlbmVyKHR5cGUsIGxpc3RlbmVyKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHRlcm1pbmF0ZSgpOiB2b2lkIHwgUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3N5bmMuY2FsbCgoc3cpID0+IHN3LnRlcm1pbmF0ZSgpKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcG9zdE1lc3NhZ2UoZGF0YTogYW55KTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fc3luYy5jYWxsKChzdykgPT4gc3cucG9zdE1lc3NhZ2UoZGF0YSkpO1xyXG4gICAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy9pZmRlZi1sb2FkZXIvaWZkZWYtbG9hZGVyLmpzP0RFQlVHPXRydWUmUEVSRk9STUFOQ0VfQVVESVQ9dHJ1ZSEuL3NyYy93b3JrZXJzL3NlcnZpY2Utd29ya2VyLXN5bmNocm9ub3VzLnRzIiwiLyoqXHJcbiAqIFdheSB0byBjb252ZXJ0IG1ldGhvZCBjYWxscyBmb3IgYXN5bmNocm9ub3VzIGNyZWF0ZWQgb2JqZWN0IHRvIHN5bmNocm9ub3VzIGNhbGxpbmdcclxuICpcclxuICogVGhlIG1ldGhvZHMgc2hvdWxkIG5vdCByZXR1cm4gYW55IHZhbHVlc1xyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFN5bmNDYWxsPFRPYmplY3Q+IHtcclxuICAgIHByaXZhdGUgX29iajogVE9iamVjdDtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IF9hc3luYzogUHJvbWlzZTxUT2JqZWN0PlxyXG4gICAgKSB7XHJcbiAgICAgICAgdGhpcy5fYXN5bmMudGhlbigob2JqKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuX29iaiA9IG9iajtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIElmIG9iamVjdCBpcyBub3QgcmVzb2x2ZWQgeWV0LCB0aGUgY2FsbGluZyB3aWxsIGJlIGFzeW5jaHJvbm91c1xyXG4gICAgICogSWYgb2JqZWN0IGFscmVhZHkgZXhpc3RzIHRoZSwgY2FsbGluZyB3aWxsIGJlIHN5bmNocm9ub3VzXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBjYWxsID0gPFRSZXN1bHQ+KGZ1bmM6IChvYmo6IFRPYmplY3QpID0+IFRSZXN1bHQgfCBQcm9taXNlPFRSZXN1bHQ+KTogVFJlc3VsdCB8IFByb21pc2U8VFJlc3VsdD4gPT4ge1xyXG4gICAgICAgIGlmICh0aGlzLl9vYmopIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZ1bmModGhpcy5fb2JqKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fYXN5bmMudGhlbigob2JqKSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZnVuYyhvYmopO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL2lmZGVmLWxvYWRlci9pZmRlZi1sb2FkZXIuanM/REVCVUc9dHJ1ZSZQRVJGT1JNQU5DRV9BVURJVD10cnVlIS4vc3JjL2ZyYW1ld29yay9zeW5jLWNhbGwudHMiLCJpbXBvcnQgeyBTZXJ2aWNlV29ya2VyVXRpbHMgfSBmcm9tICcuLi9mcmFtZXdvcmsvc2VydmljZS13b3JrZXItdXRpbHMnO1xyXG5pbXBvcnQgeyBJV29ya2VySW5zdGFuY2UsIE1lc3NhZ2VFdmVudExpc3RlbmVyIH0gZnJvbSAnLi93b3JrZXItZGVmaW5pdGlvbnMnO1xyXG5cclxuLyoqXHJcbiAqIENhbGwgd3JhcCBzZXJ2aWNlIHdvcmtlciBmdW5jdGlvbiB0byBzdGFuZGFyZCBXZWJXb3JrZXIgQVBJXHJcbiAqXHJcbiAqIEBpbnRlcm5hbFxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFNlcnZpY2VXb3JrZXJXcmFwcGVyIGltcGxlbWVudHMgSVdvcmtlckluc3RhbmNlIHtcclxuICAgIHB1YmxpYyBzdGF0aWMgY3JlYXRlKHBhdGg6IHN0cmluZyk6IFByb21pc2U8U2VydmljZVdvcmtlcldyYXBwZXI+IHtcclxuICAgICAgICBpZiAoU2VydmljZVdvcmtlclV0aWxzLmlzU3VwcG9ydGVkKCkpIHtcclxuICAgICAgICAgICAgY29uc3Qgc2NvcGUgPSBTZXJ2aWNlV29ya2VyVXRpbHMuYWJzb2x1dGVTY29wZShwYXRoLCAnbWFzc2FnaW5nLWNsaWVudCcpO1xyXG4gICAgICAgICAgICBhbGVydChzY29wZSk7XHJcbiAgICAgICAgICAgIHJldHVybiBTZXJ2aWNlV29ya2VyVXRpbHMuYWN0aXZhdGUocGF0aCwgc2NvcGUpLnRoZW4oKGRhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgIGFsZXJ0KGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBTZXJ2aWNlV29ya2VyV3JhcHBlcihkYXRhLnJlZ2lzdHJhdGlvbiwgZGF0YS5zZXJ2aWNlV29ya2VyKTtcclxuICAgICAgICAgICAgfSkuY2F0Y2goKGVycikgPT4ge1xyXG4gICAgICAgICAgICAgICAgYWxlcnQoZXJyKTtcclxuICAgICAgICAgICAgICAgIHRocm93IGVycjtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoJ1NlcnZpY2VXb3JrZXIgaXMgdW5zdXBwb3J0ZWQnKSk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHVibGljIHJlZ2lzdHJhdGlvbjogU2VydmljZVdvcmtlclJlZ2lzdHJhdGlvbixcclxuICAgICAgICBwdWJsaWMgc2VydmljZVdvcmtlcjogU2VydmljZVdvcmtlcixcclxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgY29udGFpbmVyOiBTZXJ2aWNlV29ya2VyQ29udGFpbmVyID0gKG5hdmlnYXRvciBhcyBOYXZpZ2F0b3IpLnNlcnZpY2VXb3JrZXJcclxuICAgICkge1xyXG4gICAgICAgIHRoaXMuc3Vic2NyaWJlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFkZEV2ZW50TGlzdGVuZXIodHlwZTogJ21lc3NhZ2UnLCBsaXN0ZW5lcjogTWVzc2FnZUV2ZW50TGlzdGVuZXIpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKHR5cGUsIGxpc3RlbmVyIGFzIGFueSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlbW92ZUV2ZW50TGlzdGVuZXIodHlwZTogJ21lc3NhZ2UnLCBsaXN0ZW5lcjogTWVzc2FnZUV2ZW50TGlzdGVuZXIpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmNvbnRhaW5lci5yZW1vdmVFdmVudExpc3RlbmVyKHR5cGUsIGxpc3RlbmVyIGFzIGFueSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHRlcm1pbmF0ZSgpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICAodGhpcy5zZXJ2aWNlV29ya2VyIGFzIGFueSkub25zdGF0ZWNoYW5nZSA9IHVuZGVmaW5lZDtcclxuICAgICAgICByZXR1cm4gdGhpcy5yZWdpc3RyYXRpb24udW5yZWdpc3RlcigpIGFzIGFueSBhcyBQcm9taXNlPHZvaWQ+O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBwb3N0TWVzc2FnZShkYXRhOiBhbnkpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5zZXJ2aWNlV29ya2VyLnN0YXRlICE9PSAncmVkdW5kYW50Jykge1xyXG4gICAgICAgICAgICB0aGlzLnNlcnZpY2VXb3JrZXIucG9zdE1lc3NhZ2UoZGF0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc3Vic2NyaWJlKCkge1xyXG4gICAgICAgIGNvbnN0IHNlcnZpY2VXb3JrZXIgPSB0aGlzLnNlcnZpY2VXb3JrZXI7XHJcbiAgICAgICAgc2VydmljZVdvcmtlci5vbnN0YXRlY2hhbmdlID0gKCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoc2VydmljZVdvcmtlci5zdGF0ZSA9PT0gJ3JlZHVuZGFudCcpIHtcclxuICAgICAgICAgICAgICAgIChzZXJ2aWNlV29ya2VyIGFzIGFueSkub25zdGF0ZWNoYW5nZSA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29udGFpbmVyLmdldFJlZ2lzdHJhdGlvbi5jYWxsKHRoaXMuY29udGFpbmVyLCB0aGlzLnJlZ2lzdHJhdGlvbi5zY29wZSkudGhlbigocmVnaXN0cmF0aW9uOiBTZXJ2aWNlV29ya2VyUmVnaXN0cmF0aW9uKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlZ2lzdHJhdGlvbikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlZ2lzdHJhdGlvbiA9IHJlZ2lzdHJhdGlvbjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXJ2aWNlV29ya2VyID0gcmVnaXN0cmF0aW9uLmFjdGl2ZSB8fCByZWdpc3RyYXRpb24uaW5zdGFsbGluZyB8fCByZWdpc3RyYXRpb24ud2FpdGluZyB8fCBzZXJ2aWNlV29ya2VyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN1YnNjcmliZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvaWZkZWYtbG9hZGVyL2lmZGVmLWxvYWRlci5qcz9ERUJVRz10cnVlJlBFUkZPUk1BTkNFX0FVRElUPXRydWUhLi9zcmMvd29ya2Vycy9zZXJ2aWNlLXdvcmtlci13cmFwcGVyLnRzIl0sInNvdXJjZVJvb3QiOiIifQ==