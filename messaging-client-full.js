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
/******/ 	return __webpack_require__(__webpack_require__.s = 148);
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
/* 44 */,
/* 45 */,
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
/* 53 */
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
/* 54 */
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
/* 78 */,
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var strings_1 = __webpack_require__(43);
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
                                quiet(function () { return reject('Registration was failed with maximum attempts exceeds.'); });
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
        if (typeof location !== 'undefined' && location && location.pathname) {
            path = strings_1.mapPath(location.pathname, path);
        }
        return strings_1.mapPath(path, relativeScope);
    };
    return ServiceWorkerUtils;
}());
exports.ServiceWorkerUtils = ServiceWorkerUtils;


/***/ }),
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
/* 147 */,
/* 148 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var environment_1 = __webpack_require__(149);
var index_1 = __webpack_require__(8);
var timestamp_1 = __webpack_require__(17);
var lite_data_container_1 = __webpack_require__(53);
var console_logger_1 = __webpack_require__(40);
var event_logger_1 = __webpack_require__(41);
var universal_logger_1 = __webpack_require__(42);
var message_sender_full_1 = __webpack_require__(150);
var messaging_client_instance_1 = __webpack_require__(54);
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
/* 149 */
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
/* 150 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var configuration_1 = __webpack_require__(151);
var buffer_call_1 = __webpack_require__(152);
var main_receiver_logger_1 = __webpack_require__(153);
var main_receiver_1 = __webpack_require__(154);
var worker_request_sender_1 = __webpack_require__(46);
var worker_provider_1 = __webpack_require__(155);
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
/* 151 */
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
/* 152 */
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
/* 153 */
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
/* 154 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var message_receiver_1 = __webpack_require__(47);
var response_emitter_1 = __webpack_require__(48);
var worker_event_receiver_1 = __webpack_require__(49);
var worker_request_receiver_1 = __webpack_require__(50);
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
/* 155 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var service_worker_utils_1 = __webpack_require__(79);
var pseudo_worker_1 = __webpack_require__(51);
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
var service_worker_utils_1 = __webpack_require__(79);
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
            return service_worker_utils_1.ServiceWorkerUtils.activate(path, scope).then(function (data) {
                return new ServiceWorkerWrapper(data.registration, data.serviceWorker);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBhYjJmOGZmYTNlNTg3NThmZDU0YiIsIndlYnBhY2s6Ly8vLi9zcmMvZnJhbWV3b3JrL2d1aWQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ZyYW1ld29yay91dGlscy90cmF2ZXJzYWwudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ZyYW1ld29yay9pbmRleC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZnJhbWV3b3JrL2V2ZW50LWVtaXR0ZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ZyYW1ld29yay9nbG9iYWwudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ZyYW1ld29yay90aW1lc3RhbXAudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ZyYW1ld29yay91dGlscy9leHRlbmQudHMiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS9idWlsZGluL2dsb2JhbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZnJhbWV3b3JrL3V0aWxzL2luZGV4LnRzIiwid2VicGFjazovLy8uL3NyYy9mcmFtZXdvcmsvdW5sb2FkLWV2ZW50LnRzIiwid2VicGFjazovLy8uL3NyYy9mcmFtZXdvcmsvYWpheC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZnJhbWV3b3JrL3NpbmdsZXRvbi50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZnJhbWV3b3JrL3V0aWxzL2dyb3VwQnkudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ZyYW1ld29yay91dGlscy9vdmVycmlkZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZnJhbWV3b3JrL3V0aWxzL3NhZmVDbG9uZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbG9ncy9jb25zb2xlLWxvZ2dlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbG9ncy9ldmVudC1sb2dnZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xvZ3MvdW5pdmVyc2FsLWxvZ2dlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZnJhbWV3b3JrL3N0cmluZ3MudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3dvcmtlcnMvc2VuZGVycy93b3JrZXItcmVxdWVzdC1zZW5kZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3dvcmtlcnMvc2VuZGVycy9tZXNzYWdlLXJlY2VpdmVyLnRzIiwid2VicGFjazovLy8uL3NyYy93b3JrZXJzL3NlbmRlcnMvcmVzcG9uc2UtZW1pdHRlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvd29ya2Vycy9zZW5kZXJzL3dvcmtlci1ldmVudC1yZWNlaXZlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvd29ya2Vycy9zZW5kZXJzL3dvcmtlci1yZXF1ZXN0LXJlY2VpdmVyLnRzIiwid2VicGFjazovLy8uL3NyYy93b3JrZXJzL3BzZXVkby13b3JrZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ZyYW1ld29yay9zY3JpcHQtbG9hZGVyLnRzIiwid2VicGFjazovLy8uL3NyYy9saXRlLWRhdGEtY29udGFpbmVyLnRzIiwid2VicGFjazovLy8uL3NyYy9tZXNzYWdpbmctY2xpZW50LWluc3RhbmNlLnRzIiwid2VicGFjazovLy8uL3NyYy9mcmFtZXdvcmsvc2VydmljZS13b3JrZXItdXRpbHMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21lc3NhZ2luZy1jbGllbnQtZnVsbC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29uZmlndXJhdGlvbnMvZGVmYXVsdHMvZW52aXJvbm1lbnQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21lc3NhZ2Utc2VuZGVyLWZ1bGwudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbmZpZ3VyYXRpb25zL2RlZmF1bHRzL2NvbmZpZ3VyYXRpb24udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ZyYW1ld29yay9idWZmZXItY2FsbC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbG9ncy9tYWluLXJlY2VpdmVyLWxvZ2dlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvd29ya2Vycy9tYWluLXJlY2VpdmVyLnRzIiwid2VicGFjazovLy8uL3NyYy93b3JrZXJzL3dvcmtlci1wcm92aWRlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvd29ya2Vycy9zZXJ2aWNlLXdvcmtlci1zeW5jaHJvbm91cy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZnJhbWV3b3JrL3N5bmMtY2FsbC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvd29ya2Vycy9zZXJ2aWNlLXdvcmtlci13cmFwcGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO0FDVkE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ25EQTs7Ozs7O0dBTUc7QUFDSDtJQVFJLHNCQUNvQixNQUF3QjtRQUF4QixrQ0FBUyxNQUFNLENBQUMsTUFBTSxFQUFFO1FBQXhCLFdBQU0sR0FBTixNQUFNLENBQWtCO1FBSDNCLGVBQVUsR0FBa0IsRUFBRSxDQUFDO1FBSzVDLElBQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUM7UUFDbEMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxHQUFHLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQztZQUMzQixTQUFTLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FB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QUNQLENBQUM7UUFDTCxDQUFDLENBQUM7SUFDTixDQUFDO0lBQ0wsMkJBQUM7QUFBRCxDQUFDO0FBckRZLG9EQUFvQiIsImZpbGUiOiJtZXNzYWdpbmctY2xpZW50LWZ1bGwuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXSwgZmFjdG9yeSk7XG5cdGVsc2Uge1xuXHRcdHZhciBhID0gZmFjdG9yeSgpO1xuXHRcdGZvcih2YXIgaSBpbiBhKSAodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnID8gZXhwb3J0cyA6IHJvb3QpW2ldID0gYVtpXTtcblx0fVxufSkodGhpcywgZnVuY3Rpb24oKSB7XG5yZXR1cm4gXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDE0OCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgYWIyZjhmZmEzZTU4NzU4ZmQ1NGIiLCIvKipcclxuICogQVBJIGRlZmluaXRpb24gZm9yIHByb3ZpZGluZyBHVUlEXHJcbiAqXHJcbiAqIEBpbnRlcm5hbFxyXG4gKiBAaW50ZXJmYWNlIElHdWlkUHJvdmlkZXJcclxuICovXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUd1aWRQcm92aWRlciB7XHJcbiAgICBuZXh0KCk6IHN0cmluZztcclxufVxyXG5cclxuLyoqXHJcbiAqIFJlYWwgR1VJRCBwcm92aWRlciBpbXBsZW1lbnRhdGlvblxyXG4gKlxyXG4gKiBAaW50ZXJuYWxcclxuICogQGNsYXNzIEd1aWRQcm92aWRlclxyXG4gKiBAaW1wbGVtZW50cyB7SUd1aWRQcm92aWRlcn1cclxuICovXHJcbmV4cG9ydCBjbGFzcyBHdWlkUHJvdmlkZXIgaW1wbGVtZW50cyBJR3VpZFByb3ZpZGVyIHtcclxuICAgIHB1YmxpYyBzdGF0aWMgX2RlZmF1bHQ6IEd1aWRQcm92aWRlcjtcclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0IGRlZmF1bHQoKTogR3VpZFByb3ZpZGVyIHtcclxuICAgICAgICByZXR1cm4gR3VpZFByb3ZpZGVyLl9kZWZhdWx0IHx8IChHdWlkUHJvdmlkZXIuX2RlZmF1bHQgPSBuZXcgR3VpZFByb3ZpZGVyKCkgKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9ieXRlVG9IZXg6IEFycmF5PHN0cmluZz4gPSBbXTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgcmFuZG9tID0gUmFuZG9tLmNyZWF0ZSgpXHJcbiAgICApIHtcclxuICAgICAgICBjb25zdCBieXRlVG9IZXggPSB0aGlzLl9ieXRlVG9IZXg7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAyNTY7ICsraSkge1xyXG4gICAgICAgICAgICBieXRlVG9IZXhbaV0gPSAoaSArIDB4MTAwKS50b1N0cmluZygxNikuc3Vic3RyKDEpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybiBhIG5ldyBndWlkXHJcbiAgICAgKlxyXG4gICAgICogVG9EbzogVGhpbmsgYWJvdXQgbW9yZSBlZmVjdGl2ZSBhbGdvcml0aG1cclxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAgICAgKiBAbWVtYmVyb2YgR3VpZFByb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBuZXh0KCkge1xyXG4gICAgICAgIGNvbnN0IHJuZHMgPSB0aGlzLnJhbmRvbS5uZXh0KCk7XHJcblxyXG4gICAgICAgIC8vIFBlciA0LjQsIHNldCBiaXRzIGZvciB2ZXJzaW9uIGFuZCBgY2xvY2tfc2VxX2hpX2FuZF9yZXNlcnZlZGBcclxuICAgICAgICBybmRzWzZdID0gKHJuZHNbNl0gJiAweDBmKSB8IDB4NDA7XHJcbiAgICAgICAgcm5kc1s4XSA9IChybmRzWzhdICYgMHgzZikgfCAweDgwO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5ieXRlc1RvVXVpZChybmRzKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGJ5dGVzVG9VdWlkKGJ1ZjogeyBbaW5kZXg6IG51bWJlcl06IG51bWJlciB9KSB7XHJcbiAgICAgICAgbGV0IGkgPSAwO1xyXG4gICAgICAgIGNvbnN0IGJ0aCA9IHRoaXMuX2J5dGVUb0hleDtcclxuICAgICAgICByZXR1cm4gYnRoW2J1ZltpKytdXSArIGJ0aFtidWZbaSsrXV0gK1xyXG4gICAgICAgICAgICAgICBidGhbYnVmW2krK11dICsgYnRoW2J1ZltpKytdXSArXHJcbiAgICAgICAgICAgICAgIGJ0aFtidWZbaSsrXV0gKyBidGhbYnVmW2krK11dICtcclxuICAgICAgICAgICAgICAgYnRoW2J1ZltpKytdXSArIGJ0aFtidWZbaSsrXV0gK1xyXG4gICAgICAgICAgICAgICBidGhbYnVmW2krK11dICsgYnRoW2J1ZltpKytdXSArXHJcbiAgICAgICAgICAgICAgIGJ0aFtidWZbaSsrXV0gKyBidGhbYnVmW2krK11dICtcclxuICAgICAgICAgICAgICAgYnRoW2J1ZltpKytdXSArIGJ0aFtidWZbaSsrXV0gK1xyXG4gICAgICAgICAgICAgICBidGhbYnVmW2krK11dICsgYnRoW2J1ZltpKytdXTtcclxuICAgIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIEJhc2VkIHJhbmRvbSBudW1iZXJzIHNvdXJjZVxyXG4gKlxyXG4gKiBAaW50ZXJuYWxcclxuICogQGFic3RyYWN0XHJcbiAqIEBjbGFzcyBSYW5kb21cclxuICovXHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBSYW5kb20ge1xyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGUgbmV3IFJhbmRvbSBnZW5lcmF0b3IgaW5zdGFuY2Ugc3VwcG9ydGVkIGJ5IGN1cnJlbnQgZW52aXJvbm1lbnRcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBjcmVhdGUoZm9yY2VTaW1wbGU6IGJvb2xlYW4gPSBmYWxzZSk6IFJhbmRvbSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBjcnlwdG8gIT09ICd1bmRlZmluZWQnXHJcbiAgICAgICAgICAgICYmIGNyeXB0by5nZXRSYW5kb21WYWx1ZXNcclxuICAgICAgICAgICAgJiYgIWZvcmNlU2ltcGxlXHJcbiAgICAgICAgKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgQ3J5cHRvUmFuZG9tKCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBTaW1wbGVSYW5kb20oKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFic3RyYWN0IG5leHQoKTogeyBbaW5kZXg6IG51bWJlcl06IG51bWJlciB9O1xyXG59XHJcblxyXG4vKipcclxuICogUHJvdmlkZSBzdHJvbmcgcmFuZG9tIHZhbHVlcyBmcm9tIENyeXB0byBBUElcclxuICpcclxuICogQGludGVybmFsXHJcbiAqIEBjbGFzcyBDcnlwdG9SYW5kb21cclxuICogQGV4dGVuZHMge1JhbmRvbX1cclxuICovXHJcbmV4cG9ydCBjbGFzcyBDcnlwdG9SYW5kb20gZXh0ZW5kcyBSYW5kb20ge1xyXG4gICAgcHVibGljIG5leHQoKTogeyBbaW5kZXg6IG51bWJlcl06IG51bWJlciB9IHtcclxuICAgICAgICAvLyBXSEFUV0cgY3J5cHRvIFJORyAtIGh0dHA6Ly93aWtpLndoYXR3Zy5vcmcvd2lraS9DcnlwdG9cclxuICAgICAgICBjb25zdCBybmRzOCA9IG5ldyBVaW50OEFycmF5KDE2KTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bmRlZlxyXG4gICAgICAgIGNyeXB0by5nZXRSYW5kb21WYWx1ZXMocm5kczgpO1xyXG4gICAgICAgIHJldHVybiBybmRzODtcclxuICAgIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIFByb3ZpZGUgcmFuZG9tIHZhbHVlcyBmcm9tIHVucHJlZGljdGFibGUgTWF0aC5yYW5kb20gZnVuY3Rpb25cclxuICpcclxuICogQGludGVybmFsXHJcbiAqIEBjbGFzcyBTaW1wbGVSYW5kb21cclxuICogQGV4dGVuZHMge1JhbmRvbX1cclxuICovXHJcbmV4cG9ydCBjbGFzcyBTaW1wbGVSYW5kb20gZXh0ZW5kcyBSYW5kb20ge1xyXG4gICAgcHJpdmF0ZSBfcm5kcyA9IG5ldyBBcnJheSgxNik7XHJcblxyXG4gICAgcHVibGljIG5leHQoKTogQXJyYXk8bnVtYmVyPiB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIHIgPSAwOyBpIDwgMTY7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoKGkgJiAweDAzKSA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgciA9IE1hdGgucmFuZG9tKCkgKiAweDEwMDAwMDAwMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLl9ybmRzW2ldID0gciA+Pj4gKChpICYgMHgwMykgPDwgMykgJiAweGZmO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5fcm5kcztcclxuICAgIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvaWZkZWYtbG9hZGVyL2lmZGVmLWxvYWRlci5qcz9ERUJVRz10cnVlJlBFUkZPUk1BTkNFX0FVRElUPXRydWUhLi9zcmMvZnJhbWV3b3JrL2d1aWQudHMiLCIvKipcclxuICogQGludGVybmFsXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gdHJhdmVyc2FsKFxyXG4gICAgY2FsbGJhY2s6IChuYW1lOiBzdHJpbmcsIHNvdXJjZVZhbHVlOiBhbnkpID0+IHZvaWQsXHJcbiAgICBkZXN0aW5hdGlvbjogYW55LFxyXG4gICAgc291cmNlczogQXJyYXk8YW55PlxyXG4pIHtcclxuICAgIC8vIERvIG5vdCB1c2UgZm9yLi5vZiB0byBhdm9pZCByZXF1aXJlIHBvbHlmaWxsc1xyXG4gICAgY29uc3QgbGVuZ3RoID0gc291cmNlcy5sZW5ndGg7XHJcbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgbGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgY29uc3Qgc291cmNlID0gc291cmNlc1tpbmRleF07XHJcblxyXG4gICAgICAgIGlmICghc291cmNlKSB7XHJcbiAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZm9yIChjb25zdCBuYW1lIGluIHNvdXJjZSkge1xyXG4gICAgICAgICAgICBpZiAoc291cmNlLmhhc093blByb3BlcnR5KG5hbWUpKSB7XHJcbiAgICAgICAgICAgICAgICBjYWxsYmFjayhuYW1lLCBzb3VyY2VbbmFtZV0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy9pZmRlZi1sb2FkZXIvaWZkZWYtbG9hZGVyLmpzP0RFQlVHPXRydWUmUEVSRk9STUFOQ0VfQVVESVQ9dHJ1ZSEuL3NyYy9mcmFtZXdvcmsvdXRpbHMvdHJhdmVyc2FsLnRzIiwiZXhwb3J0ICogZnJvbSAnLi9hamF4JztcclxuZXhwb3J0ICogZnJvbSAnLi9hamF4LWRlZmluaXRpb25zJztcclxuZXhwb3J0ICogZnJvbSAnLi9ldmVudC1lbWl0dGVyJztcclxuZXhwb3J0ICogZnJvbSAnLi9ndWlkJztcclxuZXhwb3J0ICogZnJvbSAnLi9zaW5nbGV0b24nO1xyXG5leHBvcnQgKiBmcm9tICcuL3RpbWVzdGFtcCc7XHJcbmV4cG9ydCAqIGZyb20gJy4vdXRpbHMnO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvaWZkZWYtbG9hZGVyL2lmZGVmLWxvYWRlci5qcz9ERUJVRz10cnVlJlBFUkZPUk1BTkNFX0FVRElUPXRydWUhLi9zcmMvZnJhbWV3b3JrL2luZGV4LnRzIiwiLyoqXHJcbiAqIEV2ZW50IGVtaXR0ZXIgYW5kIHN1YnNjcmliZXIgdG8gc2VuZCB0aGUgc2FtZSBtZXNzYWdlcyB0byBhIGZldyBkZXN0aW5hdGlvbnNcclxuICpcclxuICogQGludGVybmFsXHJcbiAqIEBjbGFzcyBFdmVudEVtaXR0ZXJcclxuICogQHRlbXBsYXRlIFRFdmVudFxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIEV2ZW50RW1pdHRlcjxURXZlbnQ+IHtcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgX2xpc3RlbmVycyA9IG5ldyAgQXJyYXk8RXZlbnRMaXN0ZW5lcjxURXZlbnQ+PigpO1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfYnVmZmVyID0gbmV3ICBBcnJheTxURXZlbnQ+KCk7XHJcblxyXG4gICAgcHVibGljIHN1YnNjcmliZShsaXN0ZW5lcjogRXZlbnRMaXN0ZW5lcjxURXZlbnQ+KTogRXZlbnRFbWl0dGVyPFRFdmVudD4ge1xyXG4gICAgICAgIGlmICh0eXBlb2YgbGlzdGVuZXIgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuc3Vic2NyaWJlZChsaXN0ZW5lcikgPCAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9saXN0ZW5lcnMucHVzaChsaXN0ZW5lcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRoaXMuX2J1ZmZlci5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMuZmx1c2hCdWZmZXIoKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVuc3Vic2NyaWJlKGxpc3RlbmVyOiBFdmVudExpc3RlbmVyPFRFdmVudD4pOiBFdmVudEVtaXR0ZXI8VEV2ZW50PiB7XHJcbiAgICAgICAgbGV0IGluZGV4ID0gdGhpcy5zdWJzY3JpYmVkKGxpc3RlbmVyKTtcclxuICAgICAgICB3aGlsZSAoaW5kZXggPj0gMCkge1xyXG4gICAgICAgICAgICB0aGlzLl9saXN0ZW5lcnMuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICAgICAgaW5kZXggPSB0aGlzLnN1YnNjcmliZWQobGlzdGVuZXIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xlYXIoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fbGlzdGVuZXJzLmxlbmd0aCA9IDA7XHJcbiAgICAgICAgdGhpcy5fYnVmZmVyLmxlbmd0aCA9IDA7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGVtaXQoZGF0YTogVEV2ZW50KTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgbGVuZ3RoID0gdGhpcy5fbGlzdGVuZXJzLmxlbmd0aDtcclxuICAgICAgICBpZiAobGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2xpc3RlbmVyc1tpXShkYXRhKTtcclxuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGVyKSB7IC8qZG8gbm90aGluZyovIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2J1ZmZlci5wdXNoKGRhdGEpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVkaXJlY3QoZW1pdHRlcjogRXZlbnRFbWl0dGVyPFRFdmVudD4pOiBFdmVudEVtaXR0ZXI8VEV2ZW50PiB7XHJcbiAgICAgICAgdGhpcy5zdWJzY3JpYmUoKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgIGVtaXR0ZXIuZW1pdChldmVudCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIGVtaXR0ZXI7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG1hcDxUTmV3RXZlbnQ+KGNvbnZlcnQ6IChkYXRhOiBURXZlbnQpID0+IFROZXdFdmVudCk6IEV2ZW50RW1pdHRlcjxUTmV3RXZlbnQ+IHtcclxuICAgICAgICBjb25zdCBuZXdFdmVudEVtaXR0ZXIgPSBuZXcgRXZlbnRFbWl0dGVyPFROZXdFdmVudD4oKTtcclxuICAgICAgICB0aGlzLnN1YnNjcmliZSgoZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgbmV3RXZlbnRFbWl0dGVyLmVtaXQoY29udmVydChldmVudCkpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBuZXdFdmVudEVtaXR0ZXI7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzdWJzY3JpYmVkKGxpc3RlbmVyOiBFdmVudExpc3RlbmVyPFRFdmVudD4pOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9saXN0ZW5lcnMuaW5kZXhPZihsaXN0ZW5lcik7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBmbHVzaEJ1ZmZlcigpIHtcclxuICAgICAgICBjb25zdCBidWZmZXIgPSB0aGlzLl9idWZmZXIuc2xpY2UoKTtcclxuICAgICAgICB0aGlzLl9idWZmZXIubGVuZ3RoID0gMDtcclxuICAgICAgICBjb25zdCBsZW5ndGggPSBidWZmZXIubGVuZ3RoO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy5lbWl0KGJ1ZmZlcltpXSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgdHlwZSBFdmVudExpc3RlbmVyPFRFdmVudD4gPSAoZXZlbnQ6IFRFdmVudCkgPT4gdm9pZDtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL2lmZGVmLWxvYWRlci9pZmRlZi1sb2FkZXIuanM/REVCVUc9dHJ1ZSZQRVJGT1JNQU5DRV9BVURJVD10cnVlIS4vc3JjL2ZyYW1ld29yay9ldmVudC1lbWl0dGVyLnRzIiwiLyoqXHJcbiAqIFJldHVybiBnbG9iYWwgcm9vdCBvYmplY3QgZm9yIGN1cnJlbnQgZW52aXJvbm1lbnRcclxuICpcclxuICogQGludGVybmFsXHJcbiAqIEBhYnN0cmFjdFxyXG4gKiBAY2xhc3MgR2xvYmFsUHJvdmlkZXJcclxuICovXHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBHbG9iYWxQcm92aWRlciB7XHJcbiAgICBwdWJsaWMgc3RhdGljIGN1cnJlbnQoKSB7XHJcbiAgICAgICAgY29uc3Qgcm9vdCA9IHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnID8gd2luZG93IDpcclxuICAgICAgICAgICAgICAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cclxuICAgICAgICAgICAgICAgICAgICAgdHlwZW9mIHNlbGYgICAhPT0gJ3VuZGVmaW5lZCcgPyBzZWxmIDpcclxuICAgICAgICAgICAgICAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cclxuICAgICAgICAgICAgICAgICAgICAgdHlwZW9mIGdsb2JhbCAhPT0gJ3VuZGVmaW5lZCcgPyBnbG9iYWwgOlxyXG4gICAgICAgICAgICAgICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xyXG4gICAgICAgICAgICAgICAgICAgICBudWxsO1xyXG5cclxuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cclxuICAgICAgICBpZiAoIXJvb3QpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbnN1cHBvcnRlZCBlbnZpcm9ubWVudC4nKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiByb290O1xyXG4gICAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy9pZmRlZi1sb2FkZXIvaWZkZWYtbG9hZGVyLmpzP0RFQlVHPXRydWUmUEVSRk9STUFOQ0VfQVVESVQ9dHJ1ZSEuL3NyYy9mcmFtZXdvcmsvZ2xvYmFsLnRzIiwiLyoqXHJcbiAqIEFQSSBvZiB0aW1lc3RhbXAgcHJvdmlkZXIgZGVmaW5pdGlvblxyXG4gKlxyXG4gKiBAaW50ZXJuYWxcclxuICogQGludGVyZmFjZSBJVGltZVN0YW1wUHJvdmlkZXJcclxuICovXHJcbmV4cG9ydCBpbnRlcmZhY2UgSVRpbWVTdGFtcFByb3ZpZGVyIHtcclxuICAgIG5vdygpOiBudW1iZXI7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBTaW1wbGUgdGltZXN0YW1wIHByb3ZpZGVyIGltcGxlbWVudGF0aW9uXHJcbiAqXHJcbiAqIEBpbnRlcm5hbFxyXG4gKiBAY2xhc3MgVGltZVN0YW1wUHJvdmlkZXJcclxuICogQGltcGxlbWVudHMge0lUaW1lU3RhbXBQcm92aWRlcn1cclxuICovXHJcbmV4cG9ydCBjbGFzcyBUaW1lU3RhbXBQcm92aWRlciBpbXBsZW1lbnRzIElUaW1lU3RhbXBQcm92aWRlciB7XHJcbiAgICBwdWJsaWMgbm93KCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuICtuZXcgRGF0ZSgpO1xyXG4gICAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy9pZmRlZi1sb2FkZXIvaWZkZWYtbG9hZGVyLmpzP0RFQlVHPXRydWUmUEVSRk9STUFOQ0VfQVVESVQ9dHJ1ZSEuL3NyYy9mcmFtZXdvcmsvdGltZXN0YW1wLnRzIiwiaW1wb3J0IHsgdHJhdmVyc2FsIH0gZnJvbSAnLi90cmF2ZXJzYWwnO1xyXG5cclxuLyoqXHJcbiAqIEV4dGVuZCB0aGUgZmlyc3Qgb2JqZWN0IGJ5IGFsbCBwcm9wZXJ0aWVzIGZyb20gdGhlIHNlY29uZFxyXG4gKiBSZXR1cm4gdGhlIGZpcnN0IG9iamVjdFxyXG4gKlxyXG4gKiBAaW50ZXJuYWxcclxuICogQHBhcmFtIHsqfSBkZXN0aW5hdGlvbiAtIG9iamVjdCB3aGF0IHdpbGwgYmUgZXh0ZW5kZWRcclxuICogQHBhcmFtIHsqfSBzb3VyY2UgLSBvYmplY3Qgd2l0aCBzb3VyY2UgZGF0YVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGV4dGVuZChkZXN0aW5hdGlvbjogYW55LCAuLi5zb3VyY2VzOiBBcnJheTxhbnk+KTogYW55IHtcclxuICAgIGlmICghZGVzdGluYXRpb24pIHtcclxuICAgICAgICBkZXN0aW5hdGlvbiA9IHt9O1xyXG4gICAgfVxyXG5cclxuICAgIHRyYXZlcnNhbCgobmFtZSwgc291cmNlVmFsdWUpID0+IHtcclxuICAgICAgICBpZiAoZGVzdGluYXRpb25bbmFtZV0gPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBkZXN0aW5hdGlvbltuYW1lXSA9IHNvdXJjZVZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgIH0sIGRlc3RpbmF0aW9uLCBzb3VyY2VzKTtcclxuXHJcbiAgICByZXR1cm4gZGVzdGluYXRpb247XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL2lmZGVmLWxvYWRlci9pZmRlZi1sb2FkZXIuanM/REVCVUc9dHJ1ZSZQRVJGT1JNQU5DRV9BVURJVD10cnVlIS4vc3JjL2ZyYW1ld29yay91dGlscy9leHRlbmQudHMiLCJ2YXIgZztcblxuLy8gVGhpcyB3b3JrcyBpbiBub24tc3RyaWN0IG1vZGVcbmcgPSAoZnVuY3Rpb24oKSB7XG5cdHJldHVybiB0aGlzO1xufSkoKTtcblxudHJ5IHtcblx0Ly8gVGhpcyB3b3JrcyBpZiBldmFsIGlzIGFsbG93ZWQgKHNlZSBDU1ApXG5cdGcgPSBnIHx8IEZ1bmN0aW9uKFwicmV0dXJuIHRoaXNcIikoKSB8fCAoMSxldmFsKShcInRoaXNcIik7XG59IGNhdGNoKGUpIHtcblx0Ly8gVGhpcyB3b3JrcyBpZiB0aGUgd2luZG93IHJlZmVyZW5jZSBpcyBhdmFpbGFibGVcblx0aWYodHlwZW9mIHdpbmRvdyA9PT0gXCJvYmplY3RcIilcblx0XHRnID0gd2luZG93O1xufVxuXG4vLyBnIGNhbiBzdGlsbCBiZSB1bmRlZmluZWQsIGJ1dCBub3RoaW5nIHRvIGRvIGFib3V0IGl0Li4uXG4vLyBXZSByZXR1cm4gdW5kZWZpbmVkLCBpbnN0ZWFkIG9mIG5vdGhpbmcgaGVyZSwgc28gaXQnc1xuLy8gZWFzaWVyIHRvIGhhbmRsZSB0aGlzIGNhc2UuIGlmKCFnbG9iYWwpIHsgLi4ufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGc7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAod2VicGFjaykvYnVpbGRpbi9nbG9iYWwuanNcbi8vIG1vZHVsZSBpZCA9IDIwXG4vLyBtb2R1bGUgY2h1bmtzID0gMSAyIDMiLCJleHBvcnQgKiBmcm9tICcuL2V4dGVuZCc7XHJcbmV4cG9ydCAqIGZyb20gJy4vZ3JvdXBCeSc7XHJcbmV4cG9ydCAqIGZyb20gJy4vb3ZlcnJpZGUnO1xyXG5leHBvcnQgKiBmcm9tICcuL3NhZmVDbG9uZSc7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy9pZmRlZi1sb2FkZXIvaWZkZWYtbG9hZGVyLmpzP0RFQlVHPXRydWUmUEVSRk9STUFOQ0VfQVVESVQ9dHJ1ZSEuL3NyYy9mcmFtZXdvcmsvdXRpbHMvaW5kZXgudHMiLCIvKipcclxuICogVGhlIGNsYXNzIGNob29zZXMgdGhlIGJlc3QgdW5sb2FkIGV2ZW50IGZvciBkaWZmZXJlbnQgYnJvd3NlcnNcclxuICovXHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBVbmxvYWRFdmVudCB7XHJcbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IG1vZGUgPSB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyAoKHdpbmRvdy5vbnBhZ2VoaWRlIHx8IHdpbmRvdy5vbnBhZ2VoaWRlID09PSBudWxsKSA/ICdwYWdlaGlkZScgOiAndW5sb2FkJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogJ25vbmUnO1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgYWRkTGlzdGVuZXIoaGFuZGxlcjogKGV2ZW50OiBFdmVudCkgPT4gdm9pZCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHN3aXRjaCAoVW5sb2FkRXZlbnQubW9kZSkge1xyXG4gICAgICAgICAgICBjYXNlICdwYWdlaGlkZSc6IHtcclxuICAgICAgICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdwYWdlaGlkZScsIGhhbmRsZXIpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSAndW5sb2FkJzoge1xyXG4gICAgICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3VubG9hZCcsIGhhbmRsZXIpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZGVmYXVsdDogcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIHJlbW92ZUxpc3RlbmVyKGhhbmRsZXI6IChldmVudDogRXZlbnQpID0+IHZvaWQpOiBib29sZWFuIHtcclxuICAgICAgICBzd2l0Y2ggKFVubG9hZEV2ZW50Lm1vZGUpIHtcclxuICAgICAgICAgICAgY2FzZSAncGFnZWhpZGUnOiB7XHJcbiAgICAgICAgICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncGFnZWhpZGUnLCBoYW5kbGVyKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgJ3VubG9hZCc6IHtcclxuICAgICAgICAgICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCd1bmxvYWQnLCBoYW5kbGVyKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL2lmZGVmLWxvYWRlci9pZmRlZi1sb2FkZXIuanM/REVCVUc9dHJ1ZSZQRVJGT1JNQU5DRV9BVURJVD10cnVlIS4vc3JjL2ZyYW1ld29yay91bmxvYWQtZXZlbnQudHMiLCJpbXBvcnQgeyBJQWpheE9wdGlvbnMsIElBamF4UHJvdmlkZXIgfSBmcm9tICcuL2FqYXgtZGVmaW5pdGlvbnMnO1xyXG5cclxuZGVjbGFyZSBjbGFzcyBYRG9tYWluUmVxdWVzdCB7XHJcbiAgICBwdWJsaWMgb25sb2FkOiAoKSA9PiB2b2lkO1xyXG4gICAgcHVibGljIG9uZXJyb3I6ICgpID0+IHZvaWQ7XHJcbiAgICBwdWJsaWMgdGltZW91dDogbnVtYmVyO1xyXG5cclxuICAgIHB1YmxpYyByZXNwb25zZVRleHQ6IHN0cmluZztcclxuXHJcbiAgICBwdWJsaWMgb3BlbihtZXRob2Q6IHN0cmluZywgdXJsOiBzdHJpbmcsIGFzeW5jPzogYm9vbGVhbik6IHZvaWQ7XHJcblxyXG4gICAgcHVibGljIHNlbmQoZGF0YT86IHN0cmluZyk6IHZvaWQ7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBBamF4IHByb3ZpZGVyIGltcGxlbWVudGF0aW9uXHJcbiAqL1xyXG5jbGFzcyBBamF4UmVxdWVzdCB7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF94aHI6IFhNTEh0dHBSZXF1ZXN0IHwgWERvbWFpblJlcXVlc3Q7XHJcblxyXG4gICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cclxuICAgIGNvbnN0cnVjdG9yKGNvcnM6IGJvb2xlYW4pIHtcclxuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cclxuICAgICAgICBpZiAoY29ycyAmJiB0eXBlb2YgWERvbWFpblJlcXVlc3QgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3hociA9IG5ldyBYRG9tYWluUmVxdWVzdCgpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3hociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xyXG4gICAgcHVibGljIHNlbmQob3B0aW9uczogSUFqYXhPcHRpb25zKTogUHJvbWlzZTxzdHJpbmc+IHtcclxuICAgICAgICBjb25zdCB4aHIgPSB0aGlzLl94aHI7XHJcblxyXG4gICAgICAgIGNvbnN0IHR5cGUgPSBvcHRpb25zLnR5cGUgfHwgJ1BPU1QnO1xyXG4gICAgICAgIGNvbnN0IGJvZHkgPSBvcHRpb25zLmJvZHkgfHwgJyc7XHJcbiAgICAgICAgY29uc3QgdXJsID0gb3B0aW9ucy51cmw7XHJcbiAgICAgICAgY29uc3QgdGltZW91dCA9IG9wdGlvbnMudGltZW91dDtcclxuXHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgeGhyLm9wZW4odHlwZSwgdXJsLCAvKmFzeW5jKi8gdHJ1ZSk7XHJcbiAgICAgICAgICAgIGlmICh0aW1lb3V0ICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIHhoci50aW1lb3V0ID0gdGltZW91dDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5zdWJzY3JpYmUocmVzb2x2ZSwgcmVqZWN0LCB0aW1lb3V0KTtcclxuICAgICAgICAgICAgeGhyLnNlbmQoYm9keSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cclxuICAgIHByaXZhdGUgc3Vic2NyaWJlKHJlc29sdmU6ICh2YWx1ZT86IHN0cmluZykgPT4gdm9pZCwgcmVqZWN0OiAocmVhc29uPzogc3RyaW5nKSA9PiB2b2lkLCB0aW1lb3V0OiBudW1iZXIgfCB1bmRlZmluZWQpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCB4aHIgPSB0aGlzLl94aHI7XHJcblxyXG4gICAgICAgIGNvbnN0IGxvZyA9IG5ldyBBcnJheTxudW1iZXI+KCk7XHJcblxyXG4gICAgICAgIGlmICh4aHIgaW5zdGFuY2VvZiBYTUxIdHRwUmVxdWVzdCkge1xyXG4gICAgICAgICAgICB4aHIub25yZWFkeXN0YXRlY2hhbmdlID0gKGFFdnQpID0+IHtcclxuICAgICAgICAgICAgICAgIGxvZy5wdXNoKHhoci5yZWFkeVN0YXRlKTtcclxuICAgICAgICAgICAgICAgIGlmICh4aHIucmVhZHlTdGF0ZSA9PT0gNCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh4aHIuc3RhdHVzID49IDIwMCAmJiB4aHIuc3RhdHVzIDwgMzAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoeGhyLnJlc3BvbnNlVGV4dCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KHhoci5yZXNwb25zZVRleHQgfHwgeGhyLnJlc3BvbnNlVHlwZSB8fCAnQ09SUyBwcm9ibGVtJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHhoci5vbmxvYWQgPSAoKSA9PiByZXNvbHZlKHhoci5yZXNwb25zZVRleHQpO1xyXG4gICAgICAgICAgICB4aHIub25lcnJvciA9ICgpID0+IHJlamVjdCgnWERvbWFpbiBDT1JTIHByb2JsZW0nKTtcclxuXHJcbiAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTptYXgtbGluZS1sZW5ndGhcclxuICAgICAgICAgICAgLy8gRml4ZXMgYnVnIHdpdGggSUU5OiBodHRwczovL3NvY2lhbC5tc2RuLm1pY3Jvc29mdC5jb20vRm9ydW1zL2llL2VuLVVTLzMwZWYzYWRkLTc2N2MtNDQzNi1iOGE5LWYxY2ExOWI0ODEyZS9pZTktcnRtLXhkb21haW5yZXF1ZXN0LWlzc3VlZC1yZXF1ZXN0cy1tYXktYWJvcnQtaWYtYWxsLWV2ZW50LWhhbmRsZXJzLW5vdC1zcGVjaWZpZWQ/Zm9ydW09aWV3ZWJkZXZlbG9wbWVudFxyXG4gICAgICAgICAgICAoeGhyIGFzIGFueSkub25wcm9ncmVzcyA9ICgpID0+IHsgLyoqLyB9O1xyXG4gICAgICAgICAgICAoeGhyIGFzIGFueSkub250aW1lb3V0ID0gKCkgPT4geyByZWplY3QoJ1RpbWVvdXQnKTsgfTtcclxuICAgICAgICAgICAgaWYgKHRpbWVvdXQpIHtcclxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gcmVqZWN0KCdNYW51YWwgdGltZW91dCcpLCB0aW1lb3V0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIEFqYXggcHJvdmlkZXIgY29uc3RydWN0b3JcclxuICpcclxuICogQGludGVybmFsXHJcbiAqIEBjbGFzcyBBamF4XHJcbiAqIEBpbXBsZW1lbnRzIHtJQWpheFByb3ZpZGVyfVxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIEFqYXggaW1wbGVtZW50cyBJQWpheFByb3ZpZGVyIHtcclxuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXHJcbiAgICBwdWJsaWMgc2VuZChvcHRpb25zOiBJQWpheE9wdGlvbnMpOiBQcm9taXNlPHN0cmluZz4ge1xyXG4gICAgICAgIGlmICh0eXBlb2YgZmV0Y2ggIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmZldGNoKG9wdGlvbnMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cclxuICAgICAgICBjb25zdCBpc0Fic29sdXRlVXJsID0gb3B0aW9ucy51cmwuaW5kZXhPZignOi8vJykgPiAwIHx8IG9wdGlvbnMudXJsLmluZGV4T2YoJy8vJykgPT09IDA7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBBamF4UmVxdWVzdCgvKmVuYWJsZSBDT1JTOiAqLyBpc0Fic29sdXRlVXJsKS5zZW5kKG9wdGlvbnMpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZmV0Y2gob3B0aW9uczogSUFqYXhPcHRpb25zKTogUHJvbWlzZTxzdHJpbmc+IHtcclxuICAgICAgICByZXR1cm4gZmV0Y2gob3B0aW9ucy51cmwsIHtcclxuICAgICAgICAgICAgYm9keTogb3B0aW9ucy5ib2R5LFxyXG4gICAgICAgICAgICBtZXRob2Q6IG9wdGlvbnMudHlwZVxyXG4gICAgICAgIH0pLnRoZW4oKHJlc3BvbnNlOiBSZXNwb25zZSkgPT4gLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi8gcmVzcG9uc2UudGV4dCgpKTtcclxuICAgIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvaWZkZWYtbG9hZGVyL2lmZGVmLWxvYWRlci5qcz9ERUJVRz10cnVlJlBFUkZPUk1BTkNFX0FVRElUPXRydWUhLi9zcmMvZnJhbWV3b3JrL2FqYXgudHMiLCIvLyB0c2xpbnQ6ZGlzYWJsZTpuby1hbnlcclxuLyoqXHJcbiAqIFByb3ZpZGUgc2luZ2xlIGV4ZWN1dGlvbiBvZiBwYXNzZWQgZnVuY3Rpb25cclxuICpcclxuICogQGludGVybmFsXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgU2luZ2xldG9uPFRGdW5jIGV4dGVuZHMgKC4uLmFyZ3M6IEFycmF5PGFueT4pID0+IGFueT4ge1xyXG4gICAgcHVibGljIHJlYWRvbmx5IGV4ZWN1dGVPbmNlOiBURnVuYztcclxuXHJcbiAgICBwcml2YXRlIF9leGVjdXRlZCA9IGZhbHNlO1xyXG5cclxuICAgIHByaXZhdGUgX3Jlc3VsdDogYW55O1xyXG5cclxuICAgIHB1YmxpYyBnZXQgZXhlY3V0ZWQoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl9leGVjdXRlZDsgfVxyXG5cclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgX2Z1bmM6IFRGdW5jXHJcbiAgICApIHtcclxuICAgICAgICB0aGlzLmV4ZWN1dGVPbmNlID0gdGhpcy5leGVjdXRlIGFzIFRGdW5jO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZXhlY3V0ZSA9ICguLi5hcmdzOiBBcnJheTxhbnk+KSA9PiB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2V4ZWN1dGVkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9yZXN1bHQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9yZXN1bHQgPSB0aGlzLl9mdW5jKC4uLmFyZ3MpO1xyXG5cclxuICAgICAgICB0aGlzLl9leGVjdXRlZCA9IHRydWU7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLl9yZXN1bHQ7XHJcbiAgICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL2lmZGVmLWxvYWRlci9pZmRlZi1sb2FkZXIuanM/REVCVUc9dHJ1ZSZQRVJGT1JNQU5DRV9BVURJVD10cnVlIS4vc3JjL2ZyYW1ld29yay9zaW5nbGV0b24udHMiLCIvKipcclxuICogQGludGVybmFsXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZ3JvdXBCeTxUSXRlbSwgVEtleT4oYXJyYXk6IEFycmF5PFRJdGVtPiwgcHJlZGljYXRlOiAob2JqOiBUSXRlbSkgPT4gVEtleSk6IE1hcDxUS2V5LCBBcnJheTxUSXRlbT4+IHtcclxuICAgIHJldHVybiBhcnJheS5yZWR1Y2UoKG1hcDogTWFwPFRLZXksIEFycmF5PFRJdGVtPj4sIGN1cnJlbnQ6IFRJdGVtKSA9PiB7XHJcbiAgICAgICAgY29uc3Qga2V5ID0gcHJlZGljYXRlKGN1cnJlbnQpO1xyXG4gICAgICAgIGxldCBwcmV2ID0gbWFwLmdldChrZXkpO1xyXG4gICAgICAgIGlmICghcHJldikge1xyXG4gICAgICAgICAgICBtYXAuc2V0KGtleSwgcHJldiA9IFtdKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHJldi5wdXNoKGN1cnJlbnQpO1xyXG4gICAgICAgIHJldHVybiBtYXA7XHJcbiAgICB9LCBuZXcgTWFwPFRLZXksIEFycmF5PFRJdGVtPj4oKSk7XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL2lmZGVmLWxvYWRlci9pZmRlZi1sb2FkZXIuanM/REVCVUc9dHJ1ZSZQRVJGT1JNQU5DRV9BVURJVD10cnVlIS4vc3JjL2ZyYW1ld29yay91dGlscy9ncm91cEJ5LnRzIiwiaW1wb3J0IHsgdHJhdmVyc2FsIH0gZnJvbSAnLi90cmF2ZXJzYWwnO1xyXG5cclxuLyoqXHJcbiAqIE92ZXJyaWRlIHRoZSBmaXJzdCBvYmplY3QgYnkgYWxsIHByb3BlcnRpZXMgZnJvbSB0aGUgc2Vjb25kXHJcbiAqIFJldHVybiB0aGUgZmlyc3Qgb2JqZWN0XHJcbiAqXHJcbiAqIEBpbnRlcm5hbFxyXG4gKiBAcGFyYW0geyp9IGRlc3RpbmF0aW9uIC0gb2JqZWN0IHdoYXQgd2lsbCBiZSBvdmVycmlkZWRcclxuICogQHBhcmFtIHsqfSBzb3VyY2UgLSBvYmplY3Qgd2l0aCBzb3VyY2UgZGF0YVxyXG4gKi9cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBvdmVycmlkZShkZXN0aW5hdGlvbjogYW55LCAuLi5zb3VyY2VzOiBBcnJheTxhbnk+KTogYW55IHtcclxuICAgIGlmICghZGVzdGluYXRpb24pIHtcclxuICAgICAgICBkZXN0aW5hdGlvbiA9IHt9O1xyXG4gICAgfVxyXG5cclxuICAgIHRyYXZlcnNhbCgobmFtZSwgc291cmNlVmFsdWUpID0+IHtcclxuICAgICAgICBkZXN0aW5hdGlvbltuYW1lXSA9IHNvdXJjZVZhbHVlO1xyXG4gICAgfSwgZGVzdGluYXRpb24sIHNvdXJjZXMpO1xyXG5cclxuICAgIHJldHVybiBkZXN0aW5hdGlvbjtcclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvaWZkZWYtbG9hZGVyL2lmZGVmLWxvYWRlci5qcz9ERUJVRz10cnVlJlBFUkZPUk1BTkNFX0FVRElUPXRydWUhLi9zcmMvZnJhbWV3b3JrL3V0aWxzL292ZXJyaWRlLnRzIiwiaW1wb3J0IHsgdHJhdmVyc2FsIH0gZnJvbSAnLi90cmF2ZXJzYWwnO1xyXG5cclxuLyoqXHJcbiAqIENsb25lIG9iamVjdCBkYXRhIHdpdGhvdXQgZnVuY3Rpb25zXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gc2FmZUNsb25lKHNvdXJjZTogYW55KTogYW55IHtcclxuICAgIGNvbnN0IGRlc3RpbmF0aW9uOiBhbnkgPSB7IH07XHJcblxyXG4gICAgdHJhdmVyc2FsKChuYW1lLCBzb3VyY2VWYWx1ZSkgPT4ge1xyXG4gICAgICAgIGlmICh0eXBlb2YgKHNvdXJjZVZhbHVlKSAhPT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICBkZXN0aW5hdGlvbltuYW1lXSA9IHNvdXJjZVZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgIH0sIGRlc3RpbmF0aW9uLCBbIHNvdXJjZSBdKTtcclxuXHJcbiAgICByZXR1cm4gZGVzdGluYXRpb247XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL2lmZGVmLWxvYWRlci9pZmRlZi1sb2FkZXIuanM/REVCVUc9dHJ1ZSZQRVJGT1JNQU5DRV9BVURJVD10cnVlIS4vc3JjL2ZyYW1ld29yay91dGlscy9zYWZlQ2xvbmUudHMiLCJpbXBvcnQgeyBJTG9nZ2VyIH0gZnJvbSAnLi9sb2dnZXInO1xyXG5cclxuLyoqXHJcbiAqIFByaW50IGludGVybmFsIGxvZyBtZXNzYWdlcyBpbiBicm93c2VyIGNvbnNvbGVcclxuICpcclxuICogSXMgbm90IHN1cHBvcnRlZCBmb3Igc29tZSBlbnZpcm9ubWVudFxyXG4gKlxyXG4gKiBAaW50ZXJuYWxcclxuICogQGNsYXNzIENvbnNvbGVMb2dnZXJcclxuICogQGltcGxlbWVudHMge0lMb2dnZXJ9XHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgQ29uc29sZUxvZ2dlciBpbXBsZW1lbnRzIElMb2dnZXIge1xyXG4gICAgcHVibGljIHJlYWRvbmx5IHByZWZpeDogc3RyaW5nID0gYFttZXNzYWdpbmctY2xpZW50LmpzXTogYDtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IF9vcHRpb25zOiB7IG11dGU6IGJvb2xlYW4gfVxyXG4gICAgKSB7IH1cclxuXHJcbiAgICBwdWJsaWMgZmF0YWwobWVzc2FnZTogc3RyaW5nLCBlcnJvcj86IEVycm9yKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9vcHRpb25zLm11dGUpIHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcih0aGlzLnByZWZpeCArIG1lc3NhZ2UsIGVycm9yKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGVycm9yKG1lc3NhZ2U6IHN0cmluZywgZXJyb3I/OiBFcnJvcik6IHZvaWQge1xyXG4gICAgICAgIGlmICghdGhpcy5fb3B0aW9ucy5tdXRlKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IodGhpcy5wcmVmaXggKyBtZXNzYWdlLCBlcnJvcik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBsb2cobWVzc2FnZTogc3RyaW5nKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9vcHRpb25zLm11dGUpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5wcmVmaXggKyBtZXNzYWdlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL2lmZGVmLWxvYWRlci9pZmRlZi1sb2FkZXIuanM/REVCVUc9dHJ1ZSZQRVJGT1JNQU5DRV9BVURJVD10cnVlIS4vc3JjL2xvZ3MvY29uc29sZS1sb2dnZXIudHMiLCJpbXBvcnQgeyBFdmVudEVtaXR0ZXIgfSBmcm9tICcuLi9mcmFtZXdvcmsvZXZlbnQtZW1pdHRlcic7XHJcbmltcG9ydCB7IElMb2dnZXIgfSBmcm9tICcuL2xvZ2dlcic7XHJcbmltcG9ydCB7IElXb3JrZXJMb2cgfSBmcm9tICcuL3dvcmtlci1sb2cnO1xyXG5cclxuLyoqXHJcbiAqIFNlbmQgbG9nIG1lc3NhZ2VzIGludG8gRXZlbnRFbWl0dGVyXHJcbiAqXHJcbiAqIEBpbnRlcm5hbFxyXG4gKiBAY2xhc3MgRXZlbnRMb2dnZXJcclxuICogQGltcGxlbWVudHMge0lMb2dnZXJ9XHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgRXZlbnRMb2dnZXIgaW1wbGVtZW50cyBJTG9nZ2VyIHtcclxuICAgIHB1YmxpYyByZWFkb25seSBvbmxvZyA9IG5ldyBFdmVudEVtaXR0ZXI8SVdvcmtlckxvZz4oKTtcclxuXHJcbiAgICBwdWJsaWMgZmF0YWwobWVzc2FnZTogc3RyaW5nLCBlcnJvcj86IEVycm9yKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5vbmxvZy5lbWl0KHtsZXZlbDogJ2ZhdGFsJywgbWVzc2FnZSwgZXJyb3J9KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZXJyb3IobWVzc2FnZTogc3RyaW5nLCBlcnJvcj86IEVycm9yKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5vbmxvZy5lbWl0KHtsZXZlbDogJ2Vycm9yJywgbWVzc2FnZSwgZXJyb3J9KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbG9nKG1lc3NhZ2U6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMub25sb2cuZW1pdCh7bGV2ZWw6ICdsb2cnLCBtZXNzYWdlfSk7XHJcbiAgICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL2lmZGVmLWxvYWRlci9pZmRlZi1sb2FkZXIuanM/REVCVUc9dHJ1ZSZQRVJGT1JNQU5DRV9BVURJVD10cnVlIS4vc3JjL2xvZ3MvZXZlbnQtbG9nZ2VyLnRzIiwiaW1wb3J0IHsgSUxvZ2dlciB9IGZyb20gJy4vbG9nZ2VyJztcclxuXHJcbi8qKlxyXG4gKiBQcm94eSBsb2dnZXIgdG8gcmVzZW5kIGFsbCBsb2cgbWVzc2FnZXMgdG8gYW5vdGhlciBsb2dnZXJzXHJcbiAqXHJcbiAqIEBpbnRlcm5hbFxyXG4gKiBAY2xhc3MgVW5pdmVyc2FsTG9nZ2VyXHJcbiAqIEBpbXBsZW1lbnRzIHtJTG9nZ2VyfVxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFVuaXZlcnNhbExvZ2dlciBpbXBsZW1lbnRzIElMb2dnZXIge1xyXG4gICAgcHVibGljIGVuYWJsZWQ6IGJvb2xlYW4gPSB0cnVlO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBsb2dnZXJzOiBBcnJheTxJTG9nZ2VyPiA9IFtdXHJcbiAgICApIHsgfVxyXG5cclxuICAgIHB1YmxpYyBmYXRhbChtZXNzYWdlOiBzdHJpbmcsIGVycm9yPzogRXJyb3IpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5lbmFibGVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9nZ2VyKChsKSA9PiBsLmZhdGFsKG1lc3NhZ2UsIGVycm9yKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBlcnJvcihtZXNzYWdlOiBzdHJpbmcsIGVycm9yPzogRXJyb3IpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5lbmFibGVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9nZ2VyKChsKSA9PiBsLmVycm9yKG1lc3NhZ2UsIGVycm9yKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBsb2cobWVzc2FnZTogc3RyaW5nKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuZW5hYmxlZCkge1xyXG4gICAgICAgICAgICB0aGlzLmxvZ2dlcigobCkgPT4gbC5sb2cobWVzc2FnZSkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlcGxhY2UgZXhpc3RpbmcgbG9nZ2VycyB0byBuZXcgb25lc1xyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7QXJyYXk8SUxvZ2dlcj59IGxvZ2dlcnNcclxuICAgICAqIEBtZW1iZXJvZiBVbml2ZXJzYWxMb2dnZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIHJlcGxhY2UobmV3TG9nZ2VyczogQXJyYXk8SUxvZ2dlcj4pOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmxvZ2dlcnMubGVuZ3RoID0gMDtcclxuXHJcbiAgICAgICAgY29uc3QgbGVuZ3RoID0gbmV3TG9nZ2Vycy5sZW5ndGg7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLmxvZ2dlcnMucHVzaChuZXdMb2dnZXJzW2ldKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBsb2dnZXIoZXhlY3V0ZTogKGxvZ2dlcjogSUxvZ2dlcikgPT4gdm9pZCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IGxvZ2dlcnMgPSB0aGlzLmxvZ2dlcnM7XHJcbiAgICAgICAgY29uc3QgbGVuZ3RoID0gbG9nZ2Vycy5sZW5ndGg7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBleGVjdXRlKGxvZ2dlcnNbaV0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvaWZkZWYtbG9hZGVyL2lmZGVmLWxvYWRlci5qcz9ERUJVRz10cnVlJlBFUkZPUk1BTkNFX0FVRElUPXRydWUhLi9zcmMvbG9ncy91bml2ZXJzYWwtbG9nZ2VyLnRzIiwiZXhwb3J0IGZ1bmN0aW9uIGVuZHNXaXRoKHN0cjogc3RyaW5nLCBzZWFyY2hTdHI6IHN0cmluZyk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHN0ci5zdWJzdHIoLXNlYXJjaFN0ci5sZW5ndGgsIHNlYXJjaFN0ci5sZW5ndGgpID09PSBzZWFyY2hTdHI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBtYXBQYXRoKHBhdGgxOiBzdHJpbmcsIHBhdGgyOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgaWYgKHBhdGgyWzBdID09PSAnLycpIHtcclxuICAgICAgICByZXR1cm4gcGF0aDI7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgaW5kZXggPSBwYXRoMS5sYXN0SW5kZXhPZignLycpO1xyXG4gICAgaWYgKGluZGV4IDwgMCkge1xyXG4gICAgICAgIHJldHVybiAnLycgKyBwYXRoMjtcclxuICAgIH1cclxuICAgIHJldHVybiBwYXRoMS5zdWJzdHJpbmcoMCwgaW5kZXggKyAxKSArIHBhdGgyO1xyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy9pZmRlZi1sb2FkZXIvaWZkZWYtbG9hZGVyLmpzP0RFQlVHPXRydWUmUEVSRk9STUFOQ0VfQVVESVQ9dHJ1ZSEuL3NyYy9mcmFtZXdvcmsvc3RyaW5ncy50cyIsImltcG9ydCB7IEd1aWRQcm92aWRlciB9IGZyb20gJy4uLy4uL2ZyYW1ld29yay9ndWlkJztcclxuaW1wb3J0IHsgSVdvcmtlck1lc3NhZ2UsIElXb3JrZXJNZXNzYWdlUmVjZWl2ZXIsIElXb3JrZXJNZXNzYWdlU2VuZGVyLCBXb3JrZXJEYXRhVHlwZSB9IGZyb20gJy4uL3dvcmtlci1kZWZpbml0aW9ucyc7XHJcbmltcG9ydCB7IElSZXF1ZXN0RW52ZWxvcCB9IGZyb20gJy4vd29ya2VyLXJlcXVlc3QtcmVjZWl2ZXInO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJUmVzcG9uc2VFbnZlbG9wPFRUeXBlIGV4dGVuZHMgV29ya2VyRGF0YVR5cGUsIFRSZXNwb25zZT4gZXh0ZW5kcyBJV29ya2VyTWVzc2FnZTxUVHlwZT4gIHtcclxuICAgIHJlc3BvbnNlPzogVFJlc3BvbnNlO1xyXG5cclxuICAgIGVycm9yPzogeyBtZXNzYWdlOiBzdHJpbmcgfTtcclxuXHJcbiAgICBtZXNzYWdlSWQ6IHN0cmluZztcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJRXJyb3Ige1xyXG4gICAgbWVzc2FnZTogc3RyaW5nO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgV29ya2VyUmVxdWVzdFNlbmRlcjxUVHlwZSBleHRlbmRzIFdvcmtlckRhdGFUeXBlLCBUUmVxdWVzdCwgVFJlc3BvbnNlPiB7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9kaWN0aW9uYXJ5OiB7XHJcbiAgICAgICAgW21lc3NhZ2VpZDogc3RyaW5nXToge1xyXG4gICAgICAgICAgICByZXNvbHZlPzogKHJlc3BvbnNlPzogVFJlc3BvbnNlKSA9PiB2b2lkLFxyXG4gICAgICAgICAgICByZWplY3Q/OiAoZXJyb3I6IElFcnJvcikgPT4gdm9pZFxyXG4gICAgICAgIH1cclxuICAgIH0gPSB7IH07XHJcblxyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfZ3VpZCA9IEd1aWRQcm92aWRlci5kZWZhdWx0O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHB1YmxpYyByZWFkb25seSB0eXBlOiBUVHlwZSxcclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IF9zZW5kZXI6IElXb3JrZXJNZXNzYWdlU2VuZGVyLFxyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgX3JlY2VpdmVyOiBJV29ya2VyTWVzc2FnZVJlY2VpdmVyXHJcbiAgICApIHtcclxuICAgICAgICBfcmVjZWl2ZXIuYWRkRXZlbnRMaXN0ZW5lcih0eXBlLCB0aGlzLl9yZXNwb25zZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNlbmQoZGF0YT86IFRSZXF1ZXN0LCByZXNvbHZlZD86IChyZXNwb25zZTogVFJlc3BvbnNlKSA9PiB2b2lkLCByZWplY3RlZD86IChlcnJvcjogSUVycm9yKSA9PiB2b2lkKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgbWVzc2FnZUlkID0gdGhpcy5fZ3VpZC5uZXh0KCk7XHJcblxyXG4gICAgICAgIHRoaXMuX2RpY3Rpb25hcnlbbWVzc2FnZUlkXSA9IHsgcmVzb2x2ZTogcmVzb2x2ZWQsIHJlamVjdDogcmVqZWN0ZWQgfTtcclxuXHJcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gdGhpcy5fc2VuZGVyLnBvc3RNZXNzYWdlKHsgdHlwZTogdGhpcy50eXBlLCBtZXNzYWdlSWQsIHJlcXVlc3Q6IGRhdGEgfSBhcyBJUmVxdWVzdEVudmVsb3A8VFR5cGUsIFRSZXF1ZXN0Pik7XHJcbiAgICAgICAgaWYgKHJlc3VsdCAmJiB0eXBlb2YgcmVzdWx0LmNhdGNoID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgIHJlc3VsdC5jYXRjaChyZWplY3RlZCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBkaXNwb3NlKCkge1xyXG4gICAgICAgIHRoaXMuX3JlY2VpdmVyLnJlbW92ZUV2ZW50TGlzdGVuZXIodGhpcy50eXBlLCB0aGlzLl9yZXNwb25zZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfcmVzcG9uc2UgPSAoZGF0YTogSVJlc3BvbnNlRW52ZWxvcDxUVHlwZSwgVFJlc3BvbnNlPikgPT4ge1xyXG4gICAgICAgIGNvbnN0IG1lc3NhZ2VJZCA9IGRhdGEubWVzc2FnZUlkO1xyXG5cclxuICAgICAgICBpZiAobWVzc2FnZUlkKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGNhbGxiYWNrcyA9IHRoaXMuX2RpY3Rpb25hcnlbbWVzc2FnZUlkXTtcclxuICAgICAgICAgICAgZGVsZXRlIHRoaXMuX2RpY3Rpb25hcnlbbWVzc2FnZUlkXTtcclxuXHJcbiAgICAgICAgICAgIGlmIChjYWxsYmFja3MpIHtcclxuICAgICAgICAgICAgICAgIGlmIChkYXRhLmVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBjYWxsYmFja3MucmVqZWN0ID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrcy5yZWplY3QoZGF0YS5lcnJvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGNhbGxiYWNrcy5yZXNvbHZlID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrcy5yZXNvbHZlKGRhdGEucmVzcG9uc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvaWZkZWYtbG9hZGVyL2lmZGVmLWxvYWRlci5qcz9ERUJVRz10cnVlJlBFUkZPUk1BTkNFX0FVRElUPXRydWUhLi9zcmMvd29ya2Vycy9zZW5kZXJzL3dvcmtlci1yZXF1ZXN0LXNlbmRlci50cyIsImltcG9ydCB7IElMb2dnZXIgfSBmcm9tICcuLi8uLi9sb2dzL2xvZ2dlcic7XHJcbmltcG9ydCB7IElMaXN0ZW5lciwgSVdvcmtlck1lc3NhZ2UsIElXb3JrZXJNZXNzYWdlUmVjZWl2ZXIsIE1lc3NhZ2VFdmVudExpc3RlbmVyLCBXb3JrZXJEYXRhVHlwZSB9IGZyb20gJy4uL3dvcmtlci1kZWZpbml0aW9ucyc7XHJcblxyXG4vKipcclxuICogQ2xhc3MgY29udmVydHMgamF2YXNjcmlwdCBtZXNzYWdlcyB3aXRoIHN0YW5kYXJkIGV2ZW50ICdtZXNzYWdlJyB0byBzdHJvbmdseSB0eXBlZCBjdXN0b20gbWVzc2FnZXNcclxuICpcclxuICogQGludGVybmFsXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgTWVzc2FnZVJlY2VpdmVyIGltcGxlbWVudHMgSVdvcmtlck1lc3NhZ2VSZWNlaXZlciB7XHJcbiAgICBwcml2YXRlIF9kaWM6IHsgW3R5cGU6IHN0cmluZ106IEFycmF5PElMaXN0ZW5lcjxhbnk+PiB9ID0geyB9O1xyXG4gICAgcHJpdmF0ZSBfYnVmZmVyczogeyBbdHlwZTogc3RyaW5nXTogQXJyYXk8TWVzc2FnZUV2ZW50PiB9ID0geyB9O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgX3JlY2VpdmVyOiB7XHJcbiAgICAgICAgICAgIGFkZEV2ZW50TGlzdGVuZXI6ICh0eXBlOiAnbWVzc2FnZScsIGxpc3RlbmVyOiBNZXNzYWdlRXZlbnRMaXN0ZW5lcikgPT4gdm9pZCxcclxuICAgICAgICAgICAgcmVtb3ZlRXZlbnRMaXN0ZW5lcjogKHR5cGU6ICdtZXNzYWdlJywgbGlzdGVuZXI6IE1lc3NhZ2VFdmVudExpc3RlbmVyKSA9PiB2b2lkXHJcbiAgICAgICAgfSxcclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IF9sb2dnZXI6IElMb2dnZXJcclxuICAgICkge1xyXG4gICAgICAgIF9yZWNlaXZlci5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgdGhpcy5faGFuZGxlcik7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFkZEV2ZW50TGlzdGVuZXI8VE1lc3NhZ2UgZXh0ZW5kcyBJV29ya2VyTWVzc2FnZTxXb3JrZXJEYXRhVHlwZT4+KHR5cGU6IHN0cmluZywgbGlzdGVuZXI6IElMaXN0ZW5lcjxUTWVzc2FnZT4pIHtcclxuICAgICAgICBjb25zdCBsaXN0ZW5lcnMgPSB0aGlzLl9kaWNbdHlwZV0gPSB0aGlzLl9kaWNbdHlwZV0gfHwgW107XHJcblxyXG4gICAgICAgIGxpc3RlbmVycy5wdXNoKGxpc3RlbmVyKTtcclxuXHJcbiAgICAgICAgdGhpcy5mbHVzaEJ1ZmZlcih0eXBlKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVtb3ZlRXZlbnRMaXN0ZW5lcjxUTWVzc2FnZSBleHRlbmRzIElXb3JrZXJNZXNzYWdlPFdvcmtlckRhdGFUeXBlPj4odHlwZTogc3RyaW5nLCBsaXN0ZW5lcjogSUxpc3RlbmVyPFRNZXNzYWdlPikge1xyXG4gICAgICAgIGNvbnN0IGxpc3RlbmVycyA9IHRoaXMuX2RpY1t0eXBlXTtcclxuXHJcbiAgICAgICAgaWYgKGxpc3RlbmVycykge1xyXG4gICAgICAgICAgICBjb25zdCBpbmRleCA9IGxpc3RlbmVycy5pbmRleE9mKGxpc3RlbmVyKTtcclxuICAgICAgICAgICAgaWYgKGluZGV4ID49IDApIHtcclxuICAgICAgICAgICAgICAgIGxpc3RlbmVycy5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAobGlzdGVuZXJzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgZGVsZXRlIHRoaXMuX2RpY1t0eXBlXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZGlzcG9zZSgpIHtcclxuICAgICAgICB0aGlzLl9kaWMgPSB7IH07XHJcbiAgICAgICAgdGhpcy5fYnVmZmVycyA9IHsgfTtcclxuICAgICAgICB0aGlzLl9yZWNlaXZlci5yZW1vdmVFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgdGhpcy5faGFuZGxlcik7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBmbHVzaEJ1ZmZlcih0eXBlOiBzdHJpbmcpIHtcclxuICAgICAgICBjb25zdCBidWZmZXIgPSB0aGlzLl9idWZmZXJzW3R5cGVdO1xyXG4gICAgICAgIGlmIChidWZmZXIgJiYgYnVmZmVyLmxlbmd0aCAhPT0gMCkge1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGxlbmd0aCA9IGJ1ZmZlci5sZW5ndGg7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5faGFuZGxlcihidWZmZXJbaV0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnVmZmVyLmxlbmd0aCA9IDA7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9oYW5kbGVyID0gKGV2ZW50OiBNZXNzYWdlRXZlbnQpID0+IHtcclxuICAgICAgICBjb25zdCByZXF1ZXN0ID0gZXZlbnQuZGF0YSBhcyBJV29ya2VyTWVzc2FnZTxXb3JrZXJEYXRhVHlwZT47XHJcblxyXG4gICAgICAgIGlmIChyZXF1ZXN0ICYmIHJlcXVlc3QudHlwZSkge1xyXG4gICAgICAgICAgICBjb25zdCBsaXN0ZW5lcnMgPSB0aGlzLl9kaWNbcmVxdWVzdC50eXBlXTtcclxuXHJcbiAgICAgICAgICAgIGlmIChsaXN0ZW5lcnMpIHtcclxuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgbGlzdGVuZXIgb2YgbGlzdGVuZXJzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGlzdGVuZXIocmVxdWVzdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fbG9nZ2VyLmVycm9yKGBFcnJvciBvbiBleGVjdXRpbmcgbGlzdGVuZXIgZm9yIG1lc3NhZ2UgdHlwZSAke3JlcXVlc3QudHlwZX1gLCBlcnJvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgYnVmZmVyID0gdGhpcy5fYnVmZmVyc1tyZXF1ZXN0LnR5cGVdIHx8ICh0aGlzLl9idWZmZXJzW3JlcXVlc3QudHlwZV0gPSBbXSk7XHJcbiAgICAgICAgICAgICAgICBidWZmZXIucHVzaChldmVudCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL2lmZGVmLWxvYWRlci9pZmRlZi1sb2FkZXIuanM/REVCVUc9dHJ1ZSZQRVJGT1JNQU5DRV9BVURJVD10cnVlIS4vc3JjL3dvcmtlcnMvc2VuZGVycy9tZXNzYWdlLXJlY2VpdmVyLnRzIiwiZXhwb3J0IGludGVyZmFjZSBJUmVzcG9uc2VFbWl0dGVyPFRSZXF1ZXN0LCBUUmVzcG9uc2U+IHtcclxuICAgIGludm9rZShyZXF1ZXN0OiBUUmVxdWVzdCk6IFRSZXNwb25zZSB8IFByb21pc2U8VFJlc3BvbnNlPjtcclxuXHJcbiAgICBzdG9wKCk6IHZvaWQ7XHJcbn1cclxuXHJcbmV4cG9ydCB0eXBlIElIYW5kbGVyPFRSZXF1ZXN0LCBUUmVzcG9uc2U+ID0gKHJlcXVlc3Q6IFRSZXF1ZXN0KSA9PiBUUmVzcG9uc2UgfCBQcm9taXNlPFRSZXNwb25zZT47XHJcblxyXG4vKipcclxuICogSGFuZGxlciBmb3IgdGhpcyBlbWl0dGVyIGlzIG9wdGlvbmFsLlxyXG4gKiBEZWZhdWx0IHZhbHVlIHdpbGwgYmUgcmV0dXJuZWQgb24gdW5kZWZpbmVkIGhhbmRsZXIuXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgT3B0aW9uYWxSZXNwb25zZUVtaXR0ZXI8VFJlcXVlc3QsIFRSZXNwb25zZT4gaW1wbGVtZW50cyBJUmVzcG9uc2VFbWl0dGVyPFRSZXF1ZXN0LCBUUmVzcG9uc2U+IHtcclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBkZWY6IFRSZXNwb25zZSxcclxuICAgICAgICBwdWJsaWMgaGFuZGxlcj86IElIYW5kbGVyPFRSZXF1ZXN0LCBUUmVzcG9uc2U+XHJcbiAgICApIHsgfVxyXG5cclxuICAgIHB1YmxpYyByZWFkb25seSBpbnZva2UgPSAocmVxdWVzdDogVFJlcXVlc3QpOiBUUmVzcG9uc2UgfCBQcm9taXNlPFRSZXNwb25zZT4gPT4ge1xyXG4gICAgICAgIGlmICh0aGlzLmhhbmRsZXIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaGFuZGxlcihyZXF1ZXN0KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGVmO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdG9wKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuaGFuZGxlciA9IHVuZGVmaW5lZDtcclxuICAgIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIEhhbmRsZXIgZm9yIHRoaXMgZW1pdHRlciBpcyBtYW5kYXRvcnkuXHJcbiAqIEFsbCByZXF1ZXN0cyB3aXRob3V0IGhhbmRsZXIgd2lsbCBiZSBidWZlcnJlZCBhbmQgcGFzc2VkIHRvIGEgbmV3IGhhbmRsZXIgb24gaXRzIHNldHRpbmcuXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgTWFuZGF0b3J5UmVzcG9uc2VFbWl0dGVyPFRSZXF1ZXN0LCBUUmVzcG9uc2U+IGltcGxlbWVudHMgSVJlc3BvbnNlRW1pdHRlcjxUUmVxdWVzdCwgVFJlc3BvbnNlPiB7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9idWZmZXIgPSBuZXcgQXJyYXk8eyByZXF1ZXN0OiBUUmVxdWVzdCwgcmVzb2x2ZTogKHJlc3BvbnNlOiBUUmVzcG9uc2UgfCBQcm9taXNlTGlrZTxUUmVzcG9uc2U+KSA9PiB2b2lkIH0+KCk7XHJcblxyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHJpdmF0ZSBfaGFuZGxlcj86IElIYW5kbGVyPFRSZXF1ZXN0LCBUUmVzcG9uc2U+XHJcbiAgICApIHsgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgaGFuZGxlcigpOiB1bmRlZmluZWQgfCBJSGFuZGxlcjxUUmVxdWVzdCwgVFJlc3BvbnNlPiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2hhbmRsZXI7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc2V0IGhhbmRsZXIodmFsdWU6IHVuZGVmaW5lZCB8IElIYW5kbGVyPFRSZXF1ZXN0LCBUUmVzcG9uc2U+KSB7XHJcbiAgICAgICAgdGhpcy5faGFuZGxlciA9IHZhbHVlO1xyXG4gICAgICAgIHRoaXMuZmx1c2hCdWZmZXIoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVhZG9ubHkgaW52b2tlID0gKHJlcXVlc3Q6IFRSZXF1ZXN0KTogVFJlc3BvbnNlIHwgUHJvbWlzZTxUUmVzcG9uc2U+ID0+IHtcclxuICAgICAgICBpZiAodGhpcy5oYW5kbGVyKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmhhbmRsZXIocmVxdWVzdCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuX2J1ZmZlci5wdXNoKHsgcmVxdWVzdCwgcmVzb2x2ZSB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RvcCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmhhbmRsZXIgPSB1bmRlZmluZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBmbHVzaEJ1ZmZlcigpIHtcclxuICAgICAgICBpZiAodGhpcy5faGFuZGxlciAmJiB0aGlzLl9idWZmZXIubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICBmb3IgKGNvbnN0IGRhdGEgb2YgdGhpcy5fYnVmZmVyKSB7XHJcbiAgICAgICAgICAgICAgICBkYXRhLnJlc29sdmUodGhpcy5pbnZva2UoZGF0YS5yZXF1ZXN0KSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL2lmZGVmLWxvYWRlci9pZmRlZi1sb2FkZXIuanM/REVCVUc9dHJ1ZSZQRVJGT1JNQU5DRV9BVURJVD10cnVlIS4vc3JjL3dvcmtlcnMvc2VuZGVycy9yZXNwb25zZS1lbWl0dGVyLnRzIiwiaW1wb3J0IHsgRXZlbnRFbWl0dGVyIH0gZnJvbSAnLi4vLi4vZnJhbWV3b3JrL2V2ZW50LWVtaXR0ZXInO1xyXG5pbXBvcnQgeyBJV29ya2VyTWVzc2FnZSwgSVdvcmtlck1lc3NhZ2VSZWNlaXZlciwgV29ya2VyRGF0YVR5cGUgfSBmcm9tICcuLi93b3JrZXItZGVmaW5pdGlvbnMnO1xyXG5cclxuLyoqXHJcbiAqIENsYXNzIHdyYXBwZXIgZm9yIHJlY2VpdmluZyBtZXNzYWdlcyBhcyB0eXBlZCBldmVudHNcclxuICpcclxuICogQGludGVybmFsXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgV29ya2VyRXZlbnRSZWNlaXZlcjxUVHlwZSBleHRlbmRzIFdvcmtlckRhdGFUeXBlLCBUV29ya2VyTWVzc2FnZSBleHRlbmRzIElXb3JrZXJNZXNzYWdlPFRUeXBlPj4ge1xyXG4gICAgcHVibGljIHJlYWRvbmx5IGV2ZW50OiBFdmVudEVtaXR0ZXI8VFdvcmtlck1lc3NhZ2U+ID0gbmV3IEV2ZW50RW1pdHRlcjxUV29ya2VyTWVzc2FnZT4oKTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgdHlwZTogVFR5cGUsXHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBfcmVjZWl2ZXI6IElXb3JrZXJNZXNzYWdlUmVjZWl2ZXJcclxuICAgICkge1xyXG4gICAgICAgIF9yZWNlaXZlci5hZGRFdmVudExpc3RlbmVyKHR5cGUsIHRoaXMuX2hhbmRsZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBkaXNwb3NlKCkge1xyXG4gICAgICAgIHRoaXMuX3JlY2VpdmVyLnJlbW92ZUV2ZW50TGlzdGVuZXIodGhpcy50eXBlLCB0aGlzLl9oYW5kbGVyKTtcclxuICAgICAgICB0aGlzLmV2ZW50LmNsZWFyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfaGFuZGxlciA9IChkYXRhOiBUV29ya2VyTWVzc2FnZSkgPT4ge1xyXG4gICAgICAgIGlmIChkYXRhLnR5cGUgPT09IHRoaXMudHlwZSkge1xyXG4gICAgICAgICAgICB0aGlzLmV2ZW50LmVtaXQoZGF0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy9pZmRlZi1sb2FkZXIvaWZkZWYtbG9hZGVyLmpzP0RFQlVHPXRydWUmUEVSRk9STUFOQ0VfQVVESVQ9dHJ1ZSEuL3NyYy93b3JrZXJzL3NlbmRlcnMvd29ya2VyLWV2ZW50LXJlY2VpdmVyLnRzIiwiaW1wb3J0IHsgSVdvcmtlck1lc3NhZ2UsIElXb3JrZXJNZXNzYWdlUmVjZWl2ZXIsIElXb3JrZXJNZXNzYWdlU2VuZGVyLCBXb3JrZXJEYXRhVHlwZSB9IGZyb20gJy4uL3dvcmtlci1kZWZpbml0aW9ucyc7XHJcbmltcG9ydCB7IElSZXNwb25zZUVtaXR0ZXIgfSBmcm9tICcuL3Jlc3BvbnNlLWVtaXR0ZXInO1xyXG5pbXBvcnQgeyBJUmVzcG9uc2VFbnZlbG9wIH0gZnJvbSAnLi93b3JrZXItcmVxdWVzdC1zZW5kZXInO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJUmVxdWVzdEVudmVsb3A8VFR5cGUgZXh0ZW5kcyBXb3JrZXJEYXRhVHlwZSwgVFJlcXVlc3Q+IGV4dGVuZHMgSVdvcmtlck1lc3NhZ2U8VFR5cGU+IHtcclxuICAgIHJlcXVlc3Q6IFRSZXF1ZXN0O1xyXG5cclxuICAgIG1lc3NhZ2VJZDogc3RyaW5nO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgV29ya2VyUmVxdWVzdFJlY2VpdmVyPFRUeXBlIGV4dGVuZHMgV29ya2VyRGF0YVR5cGUsIFRSZXF1ZXN0LCBUUmVzcG9uc2U+IHtcclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHB1YmxpYyByZWFkb25seSB0eXBlOiBUVHlwZSxcclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IF9zZW5kZXI6IElXb3JrZXJNZXNzYWdlU2VuZGVyLFxyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgX3JlY2VpdmVyOiBJV29ya2VyTWVzc2FnZVJlY2VpdmVyLFxyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgX2hhbmRsZXI6IElSZXNwb25zZUVtaXR0ZXI8VFJlcXVlc3QsIFRSZXNwb25zZT5cclxuICAgICkge1xyXG4gICAgICAgIF9yZWNlaXZlci5hZGRFdmVudExpc3RlbmVyKHR5cGUsIHRoaXMuX3Jlc3BvbnNlKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZGlzcG9zZSgpIHtcclxuICAgICAgICB0aGlzLl9yZWNlaXZlci5yZW1vdmVFdmVudExpc3RlbmVyKHRoaXMudHlwZSwgdGhpcy5fcmVzcG9uc2UpO1xyXG4gICAgICAgIHRoaXMuX2hhbmRsZXIuc3RvcCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX3Jlc3BvbnNlID0gKGRhdGE6IElSZXF1ZXN0RW52ZWxvcDxUVHlwZSwgVFJlcXVlc3Q+KSA9PiB7XHJcbiAgICAgICAgY29uc3QgbWVzc2FnZUlkID0gZGF0YS5tZXNzYWdlSWQ7XHJcbiAgICAgICAgY29uc3QgdHlwZSA9IGRhdGEudHlwZTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMudHlwZSA9PT0gdHlwZSkge1xyXG4gICAgICAgICAgICBpZiAobWVzc2FnZUlkKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmF3YWl0UmVzcG9uc2UodHlwZSwgZGF0YS5yZXF1ZXN0LCBtZXNzYWdlSWQpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yaXNlRXZlbnQodHlwZSwgZGF0YS5yZXF1ZXN0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGF3YWl0UmVzcG9uc2UodHlwZTogVFR5cGUsIHJlcXVlc3Q6IFRSZXF1ZXN0LCBtZXNzYWdlSWQ6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IHNlbmRlciA9IHRoaXMuX3NlbmRlcjtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0KGVycm9yOiBhbnkpIHtcclxuICAgICAgICAgICAgbGV0IG1lc3NhZ2UgPSAnJztcclxuICAgICAgICAgICAgaWYgKGVycm9yICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIEVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZSA9IGVycm9yLm1lc3NhZ2U7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2UgPSBlcnJvci50b1N0cmluZygpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHNlbmRlci5wb3N0TWVzc2FnZSh7IHR5cGUsIG1lc3NhZ2VJZCwgZXJyb3I6IHsgbWVzc2FnZSB9IH0gYXMgSVJlc3BvbnNlRW52ZWxvcDxUVHlwZSwgVFJlc3BvbnNlPik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZ1bmN0aW9uIHJlc29sdmUocmVzcG9uc2U6IFRSZXNwb25zZSkge1xyXG4gICAgICAgICAgICBzZW5kZXIucG9zdE1lc3NhZ2UoeyB0eXBlLCBtZXNzYWdlSWQsIHJlc3BvbnNlIH0gYXMgSVJlc3BvbnNlRW52ZWxvcDxUVHlwZSwgVFJlc3BvbnNlPik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBjb25zdCByZXN1bHQgPSB0aGlzLl9oYW5kbGVyLmludm9rZShyZXF1ZXN0KTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgUHJvbWlzZSAhPT0gJ3VuZGVmaW5lZCcgJiYgcmVzdWx0IGluc3RhbmNlb2YgUHJvbWlzZSkge1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0LnRoZW4ocmVzb2x2ZSwgcmVqZWN0KTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJlc29sdmUocmVzdWx0IGFzIFRSZXNwb25zZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICByZWplY3QoZXJyb3IpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHJpc2VFdmVudCh0eXBlOiBzdHJpbmcsIHJlcXVlc3Q6IFRSZXF1ZXN0KTogdm9pZCB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgdGhpcy5faGFuZGxlci5pbnZva2UocmVxdWVzdCk7XHJcbiAgICAgICAgfSBjYXRjaCB7IC8qKi8gfVxyXG4gICAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy9pZmRlZi1sb2FkZXIvaWZkZWYtbG9hZGVyLmpzP0RFQlVHPXRydWUmUEVSRk9STUFOQ0VfQVVESVQ9dHJ1ZSEuL3NyYy93b3JrZXJzL3NlbmRlcnMvd29ya2VyLXJlcXVlc3QtcmVjZWl2ZXIudHMiLCJpbXBvcnQgeyBJU2NyaXB0TG9hZGVyLCBTY3JpcHRMb2FkZXIgfSBmcm9tICcuLi9mcmFtZXdvcmsvc2NyaXB0LWxvYWRlcic7XHJcbmltcG9ydCB7IElNZXNzYWdlRXZlbnQsIElXb3JrZXJHbG9iYWxTY29wZSwgSVdvcmtlckxvY2F0aW9uLCBNZXNzYWdlRXZlbnRMaXN0ZW5lciB9IGZyb20gJy4vd29ya2VyLWRlZmluaXRpb25zJztcclxuXHJcbi8qKlxyXG4gKiBWYXJpYWJsZSBuYW1lIHRvIHBhc3MgUHNldWRvV29ya2VyIGJldHdlZW4gbWFpbiBjb2RlIGFuZCBsb2FkZWQgaW4gYSBXZWJXb3JrZXJcclxuICogQGludGVybmFsXHJcbiAqL1xyXG5leHBvcnQgY29uc3QgUHNldWRvV29ya2VyU2NvcGVOYW1lID0gJ01lc3NhZ2luZ0NsaWVudC1Qc2V1ZG9Xb3JrZXInO1xyXG5cclxuLyoqXHJcbiAqIEVtdWxhdG9yIG9mIFdlYiBXb3JrZXIgYmVoYXZpb3IuIFJ1biBhbGwgcHJvY2Nlc3MgaW4gdGhlIG1haW4gd2luZG93IHByb2Nlc3MuXHJcbiAqXHJcbiAqIFJlcXVpcmVkIGNvbXBhdGliaWxpdHkgd2l0aCBJRTkgd2l0aG91dCBwb2x5ZmlsbHNcclxuICpcclxuICogQGludGVybmFsXHJcbiAqIEBjbGFzcyBQc2V1ZG9Xb3JrZXJcclxuICovXHJcbmV4cG9ydCBjbGFzcyBQc2V1ZG9Xb3JrZXIge1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfcHNldWRvV29ya2VyOiBJbnRlcm5hbFBzZXVkb1dvcmtlcjtcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgX2xpc3RlbmVyczogQXJyYXk8TWVzc2FnZUV2ZW50TGlzdGVuZXI+ID0gW107XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9idWZmZXI6IEFycmF5PElNZXNzYWdlRXZlbnQ+ID0gW107XHJcbiAgICBwcml2YXRlIF9nbG9iYWw6IGFueSA9IHdpbmRvdztcclxuXHJcbiAgICBwdWJsaWMgZ2V0IHBzZXVkb1dvcmtlcigpIHsgcmV0dXJuIHRoaXMuX3BzZXVkb1dvcmtlcjsgfVxyXG5cclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHBhdGg6IHN0cmluZyxcclxuICAgICAgICBzY3JpcHRMb2FkZXI6IElTY3JpcHRMb2FkZXIgPSBuZXcgU2NyaXB0TG9hZGVyKClcclxuICAgICkge1xyXG4gICAgICAgIHRoaXMuX3BzZXVkb1dvcmtlciA9IHRoaXMuX2dsb2JhbFtQc2V1ZG9Xb3JrZXJTY29wZU5hbWVdID1cclxuICAgICAgICAgICAgbmV3IEludGVybmFsUHNldWRvV29ya2VyKFxyXG4gICAgICAgICAgICAgICAgcGF0aCxcclxuICAgICAgICAgICAgICAgIHNjcmlwdExvYWRlcixcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICByYWlzZUV2ZW50OiAobWVzc2FnZSkgPT4gdGhpcy5yYWlzZUV2ZW50KG1lc3NhZ2UpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgc2NyaXB0TG9hZGVyLmxvYWRTY3JpcHQocGF0aCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHBvc3RNZXNzYWdlKG1lc3NhZ2U6IG9iamVjdCkge1xyXG4gICAgICAgIHRoaXMuX3BzZXVkb1dvcmtlci5yYWlzZUV2ZW50KHsgZGF0YTogbWVzc2FnZSB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYWRkRXZlbnRMaXN0ZW5lcihldmVudDogJ21lc3NhZ2UnLCBsaXN0ZW5lcjogTWVzc2FnZUV2ZW50TGlzdGVuZXIpIHtcclxuICAgICAgICBpZiAoZXZlbnQgPT09ICdtZXNzYWdlJykge1xyXG4gICAgICAgICAgICB0aGlzLl9saXN0ZW5lcnMucHVzaChsaXN0ZW5lcik7XHJcblxyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9idWZmZXIubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGJ1ZmZlciA9IHRoaXMuX2J1ZmZlci5zbGljZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGxlbmd0aCA9IGJ1ZmZlci5sZW5ndGg7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJhaXNlRXZlbnQoYnVmZmVyW2ldKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fYnVmZmVyLmxlbmd0aCA9IDA7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudDogJ21lc3NhZ2UnLCBsaXN0ZW5lcjogTWVzc2FnZUV2ZW50TGlzdGVuZXIpIHtcclxuICAgICAgICBjb25zdCBpbmRleCA9IHRoaXMuX2xpc3RlbmVycy5pbmRleE9mKGxpc3RlbmVyKTtcclxuICAgICAgICBpZiAoaW5kZXggPiAtMSkge1xyXG4gICAgICAgICAgICB0aGlzLl9saXN0ZW5lcnMuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHRlcm1pbmF0ZSgpIHtcclxuICAgICAgICB0aGlzLl9idWZmZXIubGVuZ3RoID0gMDtcclxuICAgICAgICB0aGlzLl9saXN0ZW5lcnMubGVuZ3RoID0gMDtcclxuICAgICAgICB0aGlzLl9wc2V1ZG9Xb3JrZXIuY2xvc2UoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHJhaXNlRXZlbnQobWVzc2FnZTogSU1lc3NhZ2VFdmVudCkge1xyXG4gICAgICAgIGNvbnN0IGxpc3RlbmVycyA9IHRoaXMuX2xpc3RlbmVycztcclxuICAgICAgICBjb25zdCBsZW5ndGggPSBsaXN0ZW5lcnMubGVuZ3RoO1xyXG4gICAgICAgIGlmIChsZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGxpc3RlbmVyID0gbGlzdGVuZXJzW2ldO1xyXG4gICAgICAgICAgICAgICAgbGlzdGVuZXIobWVzc2FnZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLl9idWZmZXIucHVzaChtZXNzYWdlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBJbnN0YW5jZSBmb3IgZW11bGF0aW9uZyBXb3JrZXIgRW52aXJvbm1lbnQgaW5zaWRlIFdlYldvcmtlciBjb2RlXHJcbiAqXHJcbiAqIEBjbGFzcyBJbnRlcm5hbFBzZXVkb1dvcmtlclxyXG4gKiBAaW1wbGVtZW50cyB7SVdvcmtlckdsb2JhbFNjb3BlfVxyXG4gKi9cclxuY2xhc3MgSW50ZXJuYWxQc2V1ZG9Xb3JrZXIgaW1wbGVtZW50cyBJV29ya2VyR2xvYmFsU2NvcGUge1xyXG4gICAgcHVibGljIHJlYWRvbmx5IGxvY2F0aW9uOiBJV29ya2VyTG9jYXRpb247XHJcblxyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfbGlzdGVuZXJzOiBBcnJheTxNZXNzYWdlRXZlbnRMaXN0ZW5lcj4gPSBbXTtcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgX2J1ZmZlcjogQXJyYXk8SU1lc3NhZ2VFdmVudD4gPSBbXTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBsb2NhdGlvbjogc3RyaW5nLFxyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgX3NjcmlwdExvYWRlcjogSVNjcmlwdExvYWRlcixcclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IF9pbnRlcm5hbDogSUludGVybmFsV29ya2VyRnVuY3Rpb25zLFxyXG4gICAgKSB7XHJcbiAgICAgICAgdGhpcy5sb2NhdGlvbiA9IGxvY2F0aW9uO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBwb3N0TWVzc2FnZShtZXNzYWdlOiBvYmplY3QpOiB2b2lkIHtcclxuICAgICAgICBtZXNzYWdlID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShtZXNzYWdlKSk7XHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuX2ludGVybmFsLnJhaXNlRXZlbnQoeyBkYXRhOiBtZXNzYWdlIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBpbXBvcnRTY3JpcHRzKC4uLnBhdGhzOiBBcnJheTxzdHJpbmc+KTogYW55IHtcclxuICAgICAgICBsZXQgcmVzb2x2ZTogKCkgPT4gdm9pZDtcclxuICAgICAgICBsZXQgcmVzb2x2ZWQ6IGJvb2xlYW47XHJcblxyXG4gICAgICAgIGNvbnN0IGxlbmd0aCA9IHBhdGhzLmxlbmd0aDtcclxuICAgICAgICBsZXQgdG9sb2FkID0gcGF0aHMubGVuZ3RoO1xyXG4gICAgICAgIGNvbnN0IG9ubG9hZCA9ICgpID0+IHtcclxuICAgICAgICAgICAgdG9sb2FkLS07XHJcbiAgICAgICAgICAgIGlmICh0b2xvYWQgPD0gMCkge1xyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgaWYgKHJlc29sdmUpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy5fc2NyaXB0TG9hZGVyLmxvYWRTY3JpcHQocGF0aHNbaV0sIG9ubG9hZCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICB0aGVuOiAoY2FsbGJhY2s6ICgpID0+IHZvaWQpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChyZXNvbHZlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZSA9IGNhbGxiYWNrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYWRkRXZlbnRMaXN0ZW5lcihldmVudDogJ21lc3NhZ2UnIHwgJ2Nvbm5lY3QnLCBsaXN0ZW5lcjogTWVzc2FnZUV2ZW50TGlzdGVuZXIpOiB2b2lkIHtcclxuICAgICAgICBpZiAoZXZlbnQgPT09ICdtZXNzYWdlJykge1xyXG4gICAgICAgICAgICB0aGlzLl9saXN0ZW5lcnMucHVzaChsaXN0ZW5lcik7XHJcblxyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9idWZmZXIubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYnVmZmVyID0gdGhpcy5fYnVmZmVyLnNsaWNlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbGVuZ3RoID0gYnVmZmVyLmxlbmd0aDtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmFpc2VFdmVudChidWZmZXJbaV0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9idWZmZXIubGVuZ3RoID0gMDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50OiAnbWVzc2FnZScsIGxpc3RlbmVyOiBNZXNzYWdlRXZlbnRMaXN0ZW5lcik6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5fbGlzdGVuZXJzLmluZGV4T2YobGlzdGVuZXIpO1xyXG4gICAgICAgIGlmIChpbmRleCA+IC0xKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2xpc3RlbmVycy5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmFpc2VFdmVudChtZXNzYWdlOiBJTWVzc2FnZUV2ZW50KSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9saXN0ZW5lcnMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2J1ZmZlci5wdXNoKG1lc3NhZ2UpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGxlbmd0aCA9IHRoaXMuX2xpc3RlbmVycy5sZW5ndGg7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBsZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2xpc3RlbmVyc1tpbmRleF0obWVzc2FnZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsb3NlKCkge1xyXG4gICAgICAgIHRoaXMuX2J1ZmZlci5sZW5ndGggPSAwO1xyXG4gICAgICAgIHRoaXMuX2xpc3RlbmVycy5sZW5ndGggPSAwO1xyXG4gICAgfVxyXG59XHJcblxyXG5pbnRlcmZhY2UgSUludGVybmFsV29ya2VyRnVuY3Rpb25zIHtcclxuICAgIHJhaXNlRXZlbnQobWVzc2FnZTogSU1lc3NhZ2VFdmVudCk6IHZvaWQ7XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL2lmZGVmLWxvYWRlci9pZmRlZi1sb2FkZXIuanM/REVCVUc9dHJ1ZSZQRVJGT1JNQU5DRV9BVURJVD10cnVlIS4vc3JjL3dvcmtlcnMvcHNldWRvLXdvcmtlci50cyIsImltcG9ydCB7IEdsb2JhbFByb3ZpZGVyIH0gZnJvbSAnLi9nbG9iYWwnO1xyXG5cclxuLyoqXHJcbiAqIExvYWQgc2NyaXB0IGZyb20gYSBwYXRoXHJcbiAqXHJcbiAqIEBpbnRlcm5hbFxyXG4gKiBAaW50ZXJmYWNlIElTY3JpcHRMb2FkZXJcclxuICovXHJcbmV4cG9ydCBpbnRlcmZhY2UgSVNjcmlwdExvYWRlciB7XHJcbiAgICBsb2FkU2NyaXB0KHBhdGg6IHN0cmluZywgb25sb2FkPzogKCkgPT4gdm9pZCk6IHZvaWQ7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBQb2x5ZmlsbCBmb3IgbG9hZGluZyBzY3JpcHQgaW4gRE9NIGNvbnRleHRcclxuICpcclxuICogQGludGVybmFsXHJcbiAqIEBjbGFzcyBTY3JpcHRMb2FkZXJcclxuICogQGltcGxlbWVudHMge0lTY3JpcHRMb2FkZXJ9XHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgU2NyaXB0TG9hZGVyIGltcGxlbWVudHMgSVNjcmlwdExvYWRlciB7XHJcbiAgICAvKipcclxuICAgICAqIExvYWQgc2NyaXB0IGZyb20gcGF0aCBlbmQgZXhlY3V0ZSBpdFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBwYXRoIHtzdHJpbmd9IC0gUGF0aCB0byB0aGUgc2NyaXB0XHJcbiAgICAgKiBAcGFyYW0gb25sb2FkIHsoKSA9PiB2b2lkfSAtIENhbGxiYWNrIGV4ZWN1dGVkIGFmdGVyIHRoZSBzY3JpcHQgbG9hZHNcclxuICAgICAqIEBtZW1iZXJvZiBTY3JpcHRMb2FkZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIHJlYWRvbmx5IGxvYWRTY3JpcHQ6IChwYXRoOiBzdHJpbmcsIG9ubG9hZD86ICgpID0+IHZvaWQpID0+IHZvaWQ7XHJcblxyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgX2dsb2JhbCA9IEdsb2JhbFByb3ZpZGVyLmN1cnJlbnQoKVxyXG4gICAgKSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiAoX2dsb2JhbCBhcyBXaW5kb3cpLmRvY3VtZW50ICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRTY3JpcHQgPSAocGF0aCwgb25sb2FkKSA9PiBTY3JpcHRMb2FkZXIubG9hZFZpYURvbSgoX2dsb2JhbCBhcyBXaW5kb3cpLmRvY3VtZW50LCBwYXRoLCBvbmxvYWQpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignTm8gRE9NIGVudmlyb25tZW50IGlzIG5vdCBzdXBwb3J0ZWQuJyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm1lbWJlci1vcmRlcmluZ1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgbG9hZFZpYURvbShkb2N1bWVudDogRG9jdW1lbnQsIHBhdGg6IHN0cmluZywgb25sb2FkPzogKCkgPT4gdm9pZCkge1xyXG4gICAgICAgIGNvbnN0IHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xyXG4gICAgICAgIHNjcmlwdC50eXBlID0gJ3RleHQvamF2YXNjcmlwdCc7XHJcbiAgICAgICAgc2NyaXB0LnNyYyA9IHBhdGg7XHJcbiAgICAgICAgaWYgKG9ubG9hZCkge1xyXG4gICAgICAgICAgICBzY3JpcHQub25sb2FkID0gb25sb2FkO1xyXG4gICAgICAgIH1cclxuICAgICAgICAoZG9jdW1lbnQuYm9keSB8fCBkb2N1bWVudC5oZWFkKS5hcHBlbmRDaGlsZChzY3JpcHQpO1xyXG4gICAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy9pZmRlZi1sb2FkZXIvaWZkZWYtbG9hZGVyLmpzP0RFQlVHPXRydWUmUEVSRk9STUFOQ0VfQVVESVQ9dHJ1ZSEuL3NyYy9mcmFtZXdvcmsvc2NyaXB0LWxvYWRlci50cyIsImltcG9ydCB7IEdsb2JhbFByb3ZpZGVyIH0gZnJvbSAnLi9mcmFtZXdvcmsvZ2xvYmFsJztcclxuaW1wb3J0IHsgSU1lc3NhZ2luZ0NsaWVudExpdGVEYXRhIH0gZnJvbSAnLi9saXRlLWRhdGEnO1xyXG5cclxuY29uc3QgbmFtZTogJ01lc3NhZ2luZ0NsaWVudC1MaXRlRGF0YScgPSAnTWVzc2FnaW5nQ2xpZW50LUxpdGVEYXRhJztcclxuXHJcbi8qKlxyXG4gKiBAaW50ZXJuYWxcclxuICovXHJcbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1uYW1lc3BhY2VcclxuZGVjbGFyZSBnbG9iYWwge1xyXG4gICAgaW50ZXJmYWNlIFdpbmRvdyB7XHJcbiAgICAgICAgJ01lc3NhZ2luZ0NsaWVudC1MaXRlRGF0YSc6IElNZXNzYWdpbmdDbGllbnRMaXRlRGF0YTtcclxuICAgIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIEhlbHBlciBmb3Igc3RvcnJpbmcgZGF0YSBpbiBnbG9iYWwgdmFyaWFibGVcclxuICpcclxuICogQGludGVybmFsXHJcbiAqL1xyXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgTGl0ZURhdGFDb250YWluZXIge1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXQoKTogSU1lc3NhZ2luZ0NsaWVudExpdGVEYXRhIHtcclxuICAgICAgICBjb25zdCByb290ID0gKEdsb2JhbFByb3ZpZGVyLmN1cnJlbnQoKSBhcyBXaW5kb3cpO1xyXG4gICAgICAgIHJldHVybiByb290W25hbWVdIHx8IChyb290W25hbWVdID0ge30pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgY2xlYXIoKTogdm9pZCB7XHJcbiAgICAgICAgZGVsZXRlIChHbG9iYWxQcm92aWRlci5jdXJyZW50KCkgYXMgV2luZG93KVtuYW1lXTtcclxuICAgIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvaWZkZWYtbG9hZGVyL2lmZGVmLWxvYWRlci5qcz9ERUJVRz10cnVlJlBFUkZPUk1BTkNFX0FVRElUPXRydWUhLi9zcmMvbGl0ZS1kYXRhLWNvbnRhaW5lci50cyIsImltcG9ydCB7IElNZXNzYWdlLCBNZXNzYWdlVHlwZSB9IGZyb20gJy4vZGVmaW5pdGlvbnMvbWVzc2FnZSc7XHJcbmltcG9ydCB7IElNZXNzYWdpbmdDbGllbnQgfSBmcm9tICcuL2RlZmluaXRpb25zL21lc3NhZ2luZy1jbGllbnQnO1xyXG5pbXBvcnQgeyBJU2VuZGluZ09wdGlvbnMgfSBmcm9tICcuL2RlZmluaXRpb25zL3NlbmRpbmctb3B0aW9ucyc7XHJcbmltcG9ydCB7IElUaW1lU3RhbXBQcm92aWRlciB9IGZyb20gJy4vZnJhbWV3b3JrL3RpbWVzdGFtcCc7XHJcbmltcG9ydCB7IGV4dGVuZCB9IGZyb20gJy4vZnJhbWV3b3JrL3V0aWxzL2V4dGVuZCc7XHJcbmltcG9ydCB7IElNZXNzYWdlU2VuZGVyIH0gZnJvbSAnLi9tZXNzYWdlLXNlbmRlcic7XHJcblxyXG4vKipcclxuICogU2hhcmVkIHVzZXIgQVBJIGltcGxlbWVudGF0aW9uIGZvciBsaXRlIGFuZCBmdWxsIHZlcnNpb25zLlxyXG4gKlxyXG4gKiBJbnN0YW5jZSBvZiB0aGlzIGNsYXNzIGlzIHByb3ZpZGVkIHRvIHVzZXIgYW5kIGlzbid0IGNoYW5nZWQuXHJcbiAqXHJcbiAqIEBpbnRlcm5hbFxyXG4gKiBAY2xhc3MgTWVzc2FnaW5nQ2xpZW50XHJcbiAqIEBpbXBsZW1lbnRzIHtJTWVzc2FnaW5nQ2xpZW50fVxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIE1lc3NhZ2luZ0NsaWVudEluc3RhbmNlIGltcGxlbWVudHMgSU1lc3NhZ2luZ0NsaWVudCB7XHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBTZW5kZXIgaW5zdGFuY2UgdGhhdCB3aWxsIGJlIHJlcGxhY2VkIGFmdGVyIGZ1bGwgdmVyc2lvbiBsb2FkaW5nXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIHNlbmRlcjogSU1lc3NhZ2VTZW5kZXIsXHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBfdGltZTogSVRpbWVTdGFtcFByb3ZpZGVyXHJcbiAgICApIHsgfVxyXG5cclxuICAgIHB1YmxpYyBjcmVhdGU8VE1lc3NhZ2UgZXh0ZW5kcyBJTWVzc2FnZT4obWVzc2FnZVR5cGU6IE1lc3NhZ2VUeXBlLCBwYXlsb2FkPzogVE1lc3NhZ2UpOiBUTWVzc2FnZSB7XHJcbiAgICAgICAgY29uc3QgbWVzc2FnZSA9IHsgX21ldGE6IHsgdHlwZTogbWVzc2FnZVR5cGUgfSB9IGFzIFRNZXNzYWdlO1xyXG4gICAgICAgIGlmIChwYXlsb2FkKSB7XHJcbiAgICAgICAgICAgIGV4dGVuZChtZXNzYWdlLCBwYXlsb2FkKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG1lc3NhZ2U7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNlbmQ8VE1lc3NhZ2UgZXh0ZW5kcyBJTWVzc2FnZT4obWVzc2FnZTogVE1lc3NhZ2UsIG9wdGlvbnM/OiBJU2VuZGluZ09wdGlvbnMpOiB2b2lkIHtcclxuICAgICAgICBpZiAoIW1lc3NhZ2UgfHwgIW1lc3NhZ2UuX21ldGEpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdNZXNzYWdlIG9yIG1lc3NhZ2UgdHlwZSBpcyB1bmRlZmluZWQnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG1lc3NhZ2UuX21ldGEudGltZXN0YW1wID0gdGhpcy5fdGltZS5ub3coKTtcclxuICAgICAgICBtZXNzYWdlID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShtZXNzYWdlKSk7XHJcbiAgICAgICAgdGhpcy5zZW5kZXIuc2VuZChtZXNzYWdlLCBvcHRpb25zKTtcclxuICAgIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvaWZkZWYtbG9hZGVyL2lmZGVmLWxvYWRlci5qcz9ERUJVRz10cnVlJlBFUkZPUk1BTkNFX0FVRElUPXRydWUhLi9zcmMvbWVzc2FnaW5nLWNsaWVudC1pbnN0YW5jZS50cyIsImltcG9ydCB7IGVuZHNXaXRoLCBtYXBQYXRoIH0gZnJvbSAnLi9zdHJpbmdzJztcclxuXHJcbi8qKlxyXG4gKiBUaGUgY2xhc3MgY29udGFpbnMgdXRpbGl0aWVzIGZvciBTZXJ2aWNlV29ya2VyXHJcbiAqL1xyXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgU2VydmljZVdvcmtlclV0aWxzIHtcclxuICAgIC8qKlxyXG4gICAgICogQ2hlY2sgc3VwcG9ydGluZyBTZXJ2aWNlV29ya2VyIEFQSSBpbiB0aGUgY3VycmVudCBlbnZpcm9ubWVudFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGlzU3VwcG9ydGVkKCkge1xyXG4gICAgICAgIHJldHVybiB0eXBlb2YgbmF2aWdhdG9yICE9PSAndW5kZWZpbmVkJ1xyXG4gICAgICAgICAgICAgICAmJiAnc2VydmljZVdvcmtlcicgaW4gbmF2aWdhdG9yO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVnaXN0ZXIgYSBuZXcgU2VydmljZVdvcmtlciBpbnN0YW5jZSBhbmQgd2FpdCBpdHMgYWN0aXZhdGlvblxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGFjdGl2YXRlKHBhdGg6IHN0cmluZywgc2NvcGU6IHN0cmluZywgYXR0ZW1wdHM6IG51bWJlciA9IDMpOiBQcm9taXNlPElTZXJ2aWNlV29ya2VyUmVnaXN0cmF0aW9uRGF0YT4ge1xyXG4gICAgICAgIGxldCBjb3VudGVyID0gMDtcclxuICAgICAgICByZXR1cm4gKG5hdmlnYXRvciBhcyBOYXZpZ2F0b3IpLnNlcnZpY2VXb3JrZXIucmVnaXN0ZXIocGF0aCwgeyBzY29wZSB9KS50aGVuKChyZWdpc3RyYXRpb24pID0+IHtcclxuICAgICAgICAgICAgY291bnRlcisrO1xyXG5cclxuICAgICAgICAgICAgY29uc3Qgc2VydmljZVdvcmtlciA9IHJlZ2lzdHJhdGlvbi5hY3RpdmUgfHwgcmVnaXN0cmF0aW9uLmluc3RhbGxpbmcgfHwgcmVnaXN0cmF0aW9uLndhaXRpbmc7XHJcbiAgICAgICAgICAgIGlmIChzZXJ2aWNlV29ya2VyICYmIHNlcnZpY2VXb3JrZXIuc3RhdGUgPT09ICdhY3RpdmF0ZWQnKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZW5kc1dpdGgoc2VydmljZVdvcmtlci5zY3JpcHRVUkwsIHBhdGgpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsgcmVnaXN0cmF0aW9uLCBzZXJ2aWNlV29ya2VyIH07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChzZXJ2aWNlV29ya2VyKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2U8SVNlcnZpY2VXb3JrZXJSZWdpc3RyYXRpb25EYXRhPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gcXVpZXQoYWN0aW9uOiAoKSA9PiB2b2lkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIChzZXJ2aWNlV29ya2VyIGFzIGFueSkub25zdGF0ZWNoYW5nZSA9IChzZXJ2aWNlV29ya2VyIGFzIGFueSkub25lcnJvciA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBzZXJ2aWNlV29ya2VyLm9uc3RhdGVjaGFuZ2UgPSAoZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNlcnZpY2VXb3JrZXIuc3RhdGUgPT09ICdhY3RpdmF0ZWQnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBxdWlldCgoKSA9PiByZXNvbHZlKHsgcmVnaXN0cmF0aW9uLCBzZXJ2aWNlV29ya2VyIH0pKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2VydmljZVdvcmtlci5zdGF0ZSA9PT0gJ3JlZHVuZGFudCcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNvdW50ZXIgPCBhdHRlbXB0cykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHF1aWV0KCgpID0+IHJlc29sdmUoU2VydmljZVdvcmtlclV0aWxzLmFjdGl2YXRlKHBhdGgsIHNjb3BlKSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBxdWlldCgoKSA9PiByZWplY3QoJ1JlZ2lzdHJhdGlvbiB3YXMgZmFpbGVkIHdpdGggbWF4aW11bSBhdHRlbXB0cyBleGNlZWRzLicpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHNlcnZpY2VXb3JrZXIub25lcnJvciA9IChldmVudCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBxdWlldCgoKSA9PiByZWplY3QoZXZlbnQudGFyZ2V0KSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xyXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoJ1NlcnZpY2VXb3JrZXIgZmFpbGVkIHRoZSByZWdpc3RyYXRpb24uJyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIGFic29sdXRlIHBhdGggZm9yIHBhc3NpbmcgYXMgc2NvcGUgdG8gYSBTZXJ2aWNlV29ya2VyIGluc3RhbmNlLlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGFic29sdXRlU2NvcGUocGF0aDogc3RyaW5nLCByZWxhdGl2ZVNjb3BlOiBzdHJpbmcpIHtcclxuICAgICAgICBpZiAodHlwZW9mIGxvY2F0aW9uICE9PSAndW5kZWZpbmVkJyAmJiBsb2NhdGlvbiAmJiBsb2NhdGlvbi5wYXRobmFtZSkge1xyXG4gICAgICAgICAgICBwYXRoID0gbWFwUGF0aChsb2NhdGlvbi5wYXRobmFtZSwgcGF0aCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBtYXBQYXRoKHBhdGgsIHJlbGF0aXZlU2NvcGUpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElTZXJ2aWNlV29ya2VyUmVnaXN0cmF0aW9uRGF0YSB7XHJcbiAgICByZWdpc3RyYXRpb246IFNlcnZpY2VXb3JrZXJSZWdpc3RyYXRpb247XHJcblxyXG4gICAgc2VydmljZVdvcmtlcjogU2VydmljZVdvcmtlcjtcclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvaWZkZWYtbG9hZGVyL2lmZGVmLWxvYWRlci5qcz9ERUJVRz10cnVlJlBFUkZPUk1BTkNFX0FVRElUPXRydWUhLi9zcmMvZnJhbWV3b3JrL3NlcnZpY2Utd29ya2VyLXV0aWxzLnRzIiwiaW1wb3J0IHsgRW52aXJvbm1lbnREYXRhIH0gZnJvbSAnLi9jb25maWd1cmF0aW9ucy9kZWZhdWx0cy9lbnZpcm9ubWVudCc7XHJcbmltcG9ydCB7IElUZXN0RW52aXJvbm1lbnQgfSBmcm9tICcuL2NvbmZpZ3VyYXRpb25zL3Rlc3QtZW52aXJvbm1lbnQnO1xyXG5pbXBvcnQgeyBJRW52aXJvbm1lbnRDb25maWd1cmF0aW9uIH0gZnJvbSAnLi9kZWZpbml0aW9ucyc7XHJcbmltcG9ydCB7IElNZXNzYWdpbmdDbGllbnQgfSBmcm9tICcuL2RlZmluaXRpb25zL21lc3NhZ2luZy1jbGllbnQnO1xyXG5pbXBvcnQgeyBvdmVycmlkZSB9IGZyb20gJy4vZnJhbWV3b3JrL2luZGV4JztcclxuaW1wb3J0IHsgVGltZVN0YW1wUHJvdmlkZXIgfSBmcm9tICcuL2ZyYW1ld29yay90aW1lc3RhbXAnO1xyXG5pbXBvcnQgeyBJTWVzc2FnaW5nQ2xpZW50TGl0ZURhdGEgfSBmcm9tICcuL2xpdGUtZGF0YSc7XHJcbmltcG9ydCB7IExpdGVEYXRhQ29udGFpbmVyIH0gZnJvbSAnLi9saXRlLWRhdGEtY29udGFpbmVyJztcclxuaW1wb3J0IHsgQ29uc29sZUxvZ2dlciB9IGZyb20gJy4vbG9ncy9jb25zb2xlLWxvZ2dlcic7XHJcbmltcG9ydCB7IEV2ZW50TG9nZ2VyIH0gZnJvbSAnLi9sb2dzL2V2ZW50LWxvZ2dlcic7XHJcbmltcG9ydCB7IFVuaXZlcnNhbExvZ2dlciB9IGZyb20gJy4vbG9ncy91bml2ZXJzYWwtbG9nZ2VyJztcclxuaW1wb3J0IHsgTWVzc2FnZVNlbmRlckZ1bGwgfSBmcm9tICcuL21lc3NhZ2Utc2VuZGVyLWZ1bGwnO1xyXG5pbXBvcnQgeyBNZXNzYWdpbmdDbGllbnRJbnN0YW5jZSB9IGZyb20gJy4vbWVzc2FnaW5nLWNsaWVudC1pbnN0YW5jZSc7XHJcblxyXG4vKipcclxuICogQ29uc3RydWN0b3Igb2YgYSBNZXNzYWdpbmdDbGllbnQgaW5zdGFuY2UgaW4gZnVsbCBtb2RlLlxyXG4gKlxyXG4gKiBFbnRyeSBwb2ludCBmb3IgYnVpbGRpbmcgYnVuZGxlIGZpbGUgZm9yIGZ1bGwgdmVyc2lvbi5cclxuICpcclxuICogQGV4cG9ydFxyXG4gKiBAY2xhc3MgTWVzc2FnaW5nQ2xpZW50XHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgTWVzc2FnaW5nQ2xpZW50IHtcclxuICAgIC8qKlxyXG4gICAgICogQGludGVybmFsXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgZW52aXJvbm1lbnQodGVzdDogSVRlc3RFbnZpcm9ubWVudCk6IE1lc3NhZ2luZ0NsaWVudCB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBNZXNzYWdpbmdDbGllbnQodGVzdCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGUgYSBuZXcgaW5zdGFuY2Ugb2YgTWVzc2FnaW5nQ2xpZW50LlxyXG4gICAgICogSXQgY2FuIGJlIGNhbGxlZCBvbmx5IG9uY2UgYXQgdGhlIHNhbWUgcGFnZS5cclxuICAgICAqXHJcbiAgICAgKiBEZXByaWNhdGVkIG1ldGhvZC4gU2hvdWxkIGJlIGRlbGV0ZWQgaW4gdGhlIG5leHQgbWFqb3IgdmVyc2lvbi5cclxuICAgICAqXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0ge0lFbnZpcm9ubWVudENvbmZpZ3VyYXRpb259IGVudmlyb25tZW50IC0gQ29uZmlndXJhdGlvbiBvZiBlbnZpcm9ubWVudFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGNyZWF0ZShcclxuICAgICAgICBlbnZpcm9ubWVudDogSUVudmlyb25tZW50Q29uZmlndXJhdGlvblxyXG4gICAgKTogSU1lc3NhZ2luZ0NsaWVudCB7XHJcbiAgICAgICAgaWYgKGVudmlyb25tZW50Lm1vZGUgIT09ICdwcm9kdWN0aW9uJykge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnTWV0aG9kIE1lc3NhZ2luZ0NsaWVudC5jcmVhdGUoKSBpcyBkZXByaWNhdGVkLiBQbGVhc2UgdXNlIE1lc3NhZ2luZ0NsaWVudC5pbnN0YW50aWF0ZSgpIG1ldGhvZCBpbnN0ZWFkLicpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gTWVzc2FnaW5nQ2xpZW50Lmluc3RhbnRpYXRlKGVudmlyb25tZW50KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEluc3RhbnRpYXRlIG9mIE1lc3NhZ2luZ0NsaWVudC5cclxuICAgICAqIFdpdGggY29uZmlndXJhdGlvbiBpdCBjYW4gYmUgY2FsbGVkIG9ubHkgb25jZSBhdCB0aGUgc2FtZSBwYWdlLlxyXG4gICAgICogV2l0aG91dCBjb25maWd1cmF0aW9uIGl0IGNhbiBiZSBjYWxsZWQgbWFueSB0aW1lcywgYnV0IHJldHVybnMgdGhlIHNhbWUgb2JqZWN0LlxyXG4gICAgICpcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7SUVudmlyb25tZW50Q29uZmlndXJhdGlvbn0gZW52aXJvbm1lbnQgLSBDb25maWd1cmF0aW9uIG9mIGVudmlyb25tZW50XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgaW5zdGFudGlhdGUoXHJcbiAgICAgICAgZW52aXJvbm1lbnQ/OiBJRW52aXJvbm1lbnRDb25maWd1cmF0aW9uXHJcbiAgICApOiBJTWVzc2FnaW5nQ2xpZW50IHtcclxuICAgICAgICByZXR1cm4gbmV3IE1lc3NhZ2luZ0NsaWVudCgpLmluc3RhbnRpYXRlKGVudmlyb25tZW50KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlaW5zdGFudGlhdGUgb2YgTWVzc2FnaW5nQ2xpZW50IGZyb20gbGl0ZSB2ZXJzaW9uLlxyXG4gICAgICpcclxuICAgICAqIENhbGxlZCBhdCB0aGUgZW5kIG9mIHRoaXMgZmlsZVxyXG4gICAgICpcclxuICAgICAqIEBpbnRlcm5hbFxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHtJRW52aXJvbm1lbnRDb25maWd1cmF0aW9ufSBlbnZpcm9ubWVudCAtIENvbmZpZ3VyYXRpb24gb2YgZW52aXJvbm1lbnRcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyByZWluc3RhbnRpYXRlKFxyXG4gICAgICAgIGVudmlyb25tZW50PzogSUVudmlyb25tZW50Q29uZmlndXJhdGlvblxyXG4gICAgKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKExpdGVEYXRhQ29udGFpbmVyLmdldCgpLm1lc3NhZ2luZ0NsaWVudCkge1xyXG4gICAgICAgICAgICBuZXcgTWVzc2FnaW5nQ2xpZW50KCkuaW5zdGFudGlhdGUoZW52aXJvbm1lbnQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEZvcmdldCBhYm91dCBhbGwgaW5zdGFuY2VzXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgdGVybWluYXRlKGNhbGxiYWNrPzogKCkgPT4gdm9pZCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IGRhdGEgPSBMaXRlRGF0YUNvbnRhaW5lci5nZXQoKTtcclxuXHJcbiAgICAgICAgaWYgKGRhdGEubWVzc2FnaW5nQ2xpZW50KSB7XHJcbiAgICAgICAgICAgIGRhdGEubWVzc2FnaW5nQ2xpZW50LnNlbmRlci5kaXNwb3NlKGNhbGxiYWNrKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAoY2FsbGJhY2spIHtcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIExpdGVEYXRhQ29udGFpbmVyLmNsZWFyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgaW5pdGlhbGl6ZShkYXRhOiBJTWVzc2FnaW5nQ2xpZW50TGl0ZURhdGEpOiBNZXNzYWdpbmdDbGllbnRJbnN0YW5jZSB7XHJcbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXHJcbiAgICAgICAgaWYgKCFkYXRhLmVudmlyb25tZW50KSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignRW52aXJvbm1lbnQgcGFyYW1ldGVyIGlzIHN0cm9uZ2x5IHJlcXVpcmVkLicpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3Qgc2VuZGVyID0gTWVzc2FnaW5nQ2xpZW50LnNlbmRlcihkYXRhLmVudmlyb25tZW50LCBkYXRhLnRlc3QpO1xyXG5cclxuICAgICAgICBsZXQgbWVzc2FnaW5nQ2xpZW50ID0gZGF0YS5tZXNzYWdpbmdDbGllbnQ7XHJcblxyXG4gICAgICAgIGlmIChtZXNzYWdpbmdDbGllbnQpIHtcclxuICAgICAgICAgICAgbWVzc2FnaW5nQ2xpZW50LnNlbmRlciA9IHNlbmRlcjtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBtZXNzYWdpbmdDbGllbnQgPSBuZXcgTWVzc2FnaW5nQ2xpZW50SW5zdGFuY2Uoc2VuZGVyLCBuZXcgVGltZVN0YW1wUHJvdmlkZXIoKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBNZXNzYWdpbmdDbGllbnQuc2VuZEJ1ZmZlcmVkRGF0YShkYXRhLCBzZW5kZXIpO1xyXG5cclxuICAgICAgICBkYXRhLmlzRnVsbFZlcnNpb24gPSB0cnVlO1xyXG5cclxuICAgICAgICByZXR1cm4gbWVzc2FnaW5nQ2xpZW50O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGludGVybmFsXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgX3Rlc3RFbnZpcm9ubWVudD86IElUZXN0RW52aXJvbm1lbnRcclxuICAgICkgeyB9XHJcblxyXG4gICAgcHVibGljIGluc3RhbnRpYXRlKGVudmlyb25tZW50PzogSUVudmlyb25tZW50Q29uZmlndXJhdGlvbik6IElNZXNzYWdpbmdDbGllbnQge1xyXG4gICAgICAgIGNvbnN0IGRhdGEgPSBMaXRlRGF0YUNvbnRhaW5lci5nZXQoKTtcclxuXHJcbiAgICAgICAgaWYgKGRhdGEuZW52aXJvbm1lbnQgJiYgZW52aXJvbm1lbnQpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdDb25maWd1cmF0aW9uIG9mIE1lc3NhZ2luZ0NsaWVudEpTIGlzIGFscmVhZHkgc2V0LiBQbGVhc2UgcHJvdmlkZSBjb25maWd1cmF0aW9uIG9ubHkgb25jZS4nKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChkYXRhLm1lc3NhZ2luZ0NsaWVudFxyXG4gICAgICAgICAgICAmJiBkYXRhLmlzRnVsbFZlcnNpb25cclxuICAgICAgICApIHtcclxuICAgICAgICAgICAgcmV0dXJuIGRhdGEubWVzc2FnaW5nQ2xpZW50O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZGF0YS5lbnZpcm9ubWVudCA9IGRhdGEuZW52aXJvbm1lbnQgfHwgZW52aXJvbm1lbnQ7XHJcblxyXG4gICAgICAgIGlmIChkYXRhLmVudmlyb25tZW50KSB7XHJcbiAgICAgICAgICAgIGRhdGEudGVzdCA9IGRhdGEudGVzdCB8fCB0aGlzLl90ZXN0RW52aXJvbm1lbnQ7XHJcbiAgICAgICAgICAgIGRhdGEubWVzc2FnaW5nQ2xpZW50ID0gTWVzc2FnaW5nQ2xpZW50LmluaXRpYWxpemUoZGF0YSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoZGF0YS5tZXNzYWdpbmdDbGllbnQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGRhdGEubWVzc2FnaW5nQ2xpZW50O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdMaXRlIHZlcnNpb24gb2YgTWVzc2FnaW5nQ2xpZW50SlMgd2FzIG5vdCBsb2FkZWQuIFBsZWFzZSBwcm92aWRlIGEgY29uZmlndXJhdGlvbiB0byBpbnN0YW50aWF0ZSBhIGZ1bGwgdmVyc2lvbi4nKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bWVtYmVyLW9yZGVyaW5nXHJcbiAgICBwcml2YXRlIHN0YXRpYyBsb2dnZXIodGVzdDogSVRlc3RFbnZpcm9ubWVudCB8IHVuZGVmaW5lZCwgZW52aXJvbm1lbnQ6IElFbnZpcm9ubWVudENvbmZpZ3VyYXRpb24pIHtcclxuICAgICAgICBjb25zdCBsb2dnZXIgPSBuZXcgVW5pdmVyc2FsTG9nZ2VyKFtcclxuICAgICAgICAgICAgbmV3IENvbnNvbGVMb2dnZXIoIHsgbXV0ZTogIWVudmlyb25tZW50LmRlYnVnIH0gKVxyXG4gICAgICAgIF0pO1xyXG5cclxuICAgICAgICBpZiAodGVzdCAmJiB0ZXN0Lmxpc3RlbmVycyAmJiB0ZXN0Lmxpc3RlbmVycy5sb2cpIHtcclxuICAgICAgICAgICAgY29uc3QgZXZlbnRMb2dnZXIgPSBuZXcgRXZlbnRMb2dnZXIoKTtcclxuICAgICAgICAgICAgZXZlbnRMb2dnZXIub25sb2cuc3Vic2NyaWJlKHRlc3QubGlzdGVuZXJzLmxvZyk7XHJcbiAgICAgICAgICAgIGxvZ2dlci5sb2dnZXJzLnB1c2goZXZlbnRMb2dnZXIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbG9nZ2VyO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTptZW1iZXItb3JkZXJpbmdcclxuICAgIHByaXZhdGUgc3RhdGljIHNlbmRlcihlbnZpcm9ubWVudDogSUVudmlyb25tZW50Q29uZmlndXJhdGlvbiwgdGVzdD86IElUZXN0RW52aXJvbm1lbnQpOiBNZXNzYWdlU2VuZGVyRnVsbCB7XHJcbiAgICAgICAgY29uc3QgZW52aXJvbm1lbnREYXRhID0gbmV3IEVudmlyb25tZW50RGF0YSgpO1xyXG5cclxuICAgICAgICBvdmVycmlkZShlbnZpcm9ubWVudERhdGEsIGVudmlyb25tZW50KTtcclxuXHJcbiAgICAgICAgZW52aXJvbm1lbnREYXRhLnZhbGlkYXRlKCk7XHJcblxyXG4gICAgICAgIGNvbnN0IGxvZ2dlciA9IE1lc3NhZ2luZ0NsaWVudC5sb2dnZXIodGVzdCwgZW52aXJvbm1lbnQpO1xyXG5cclxuICAgICAgICBjb25zdCBzZW5kZXIgPSBuZXcgTWVzc2FnZVNlbmRlckZ1bGwoZW52aXJvbm1lbnREYXRhLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2dnZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlc3QgPyB0ZXN0LmNvbmZpZ3VyYXRpb24gOiBudWxsKTtcclxuXHJcbiAgICAgICAgaWYgKHRlc3QgJiYgdGVzdC5saXN0ZW5lcnMpIHtcclxuICAgICAgICAgICAgaWYgKHRlc3QubGlzdGVuZXJzLmFqYXgpIHtcclxuICAgICAgICAgICAgICAgIHNlbmRlci5hamF4LmhhbmRsZXIgPSAob3B0aW9ucykgPT4gKCh0ZXN0Lmxpc3RlbmVycyAmJiB0ZXN0Lmxpc3RlbmVycy5hamF4ICYmIHRlc3QubGlzdGVuZXJzLmFqYXgob3B0aW9ucykpIHx8ICcnKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgc2VuZGVyLnBlcmZvcm1hbmNlLnN1YnNjcmliZSgocGVyZm9ybWFuY2UpID0+IHRlc3QubGlzdGVuZXJzICYmIHRlc3QubGlzdGVuZXJzLnBlcmZvcm1hbmNlICYmIHRlc3QubGlzdGVuZXJzLnBlcmZvcm1hbmNlKHBlcmZvcm1hbmNlKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gc2VuZGVyO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTptZW1iZXItb3JkZXJpbmdcclxuICAgIHByaXZhdGUgc3RhdGljIHNlbmRCdWZmZXJlZERhdGEoZGF0YTogSU1lc3NhZ2luZ0NsaWVudExpdGVEYXRhLCBzZW5kZXI6IE1lc3NhZ2VTZW5kZXJGdWxsKSB7XHJcbiAgICAgICAgaWYgKGRhdGEuYnVmZmVyKSB7XHJcbiAgICAgICAgICAgIHNlbmRlci5zZW5kKGRhdGEuYnVmZmVyLml0ZW1zKTtcclxuICAgICAgICAgICAgZGF0YS5idWZmZXIuaXRlbXMubGVuZ3RoID0gMDtcclxuICAgICAgICAgICAgZGF0YS5idWZmZXIgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG4vLyBUcnkgaW5zdGFudGlhdGUgYSBmdWxsIHZlcnNpb24gZnJvbSBjb25maWd1cmF0aW9uXHJcbk1lc3NhZ2luZ0NsaWVudC5yZWluc3RhbnRpYXRlKCk7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy9pZmRlZi1sb2FkZXIvaWZkZWYtbG9hZGVyLmpzP0RFQlVHPXRydWUmUEVSRk9STUFOQ0VfQVVESVQ9dHJ1ZSEuL3NyYy9tZXNzYWdpbmctY2xpZW50LWZ1bGwudHMiLCJpbXBvcnQgeyBFbnZpcm9ubWVudE1vZGUgfSBmcm9tICcuLi8uLi9kZWZpbml0aW9ucy9lbnZpcm9ubWVudCc7XHJcbmltcG9ydCB7IElFbnZpcm9ubWVudERhdGEgfSBmcm9tICcuLi9lbnZpcm9ubWVudCc7XHJcblxyXG4vKipcclxuICogRGVmYXVsdCB2YWx1ZXMgb2YgRW52aXJvbm1lbnREYXRhXHJcbiAqXHJcbiAqIEBpbnRlcm5hbFxyXG4gKiBAY2xhc3MgRW52aXJvbm1lbnREYXRhXHJcbiAqIEBpbXBsZW1lbnRzIHtJRW52aXJvbm1lbnREYXRhfVxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIEVudmlyb25tZW50RGF0YSBpbXBsZW1lbnRzIElFbnZpcm9ubWVudERhdGEge1xyXG4gICAgcHVibGljIHdvcmtlclVybCA9ICcnO1xyXG5cclxuICAgIHB1YmxpYyBwb2x5ZmlsbHNVcmwgPSAnL21lc3NhZ2luZy1jbGllbnQtcG9seWZpbGxzLmpzJztcclxuXHJcbiAgICBwdWJsaWMgYXBpS2V5ID0gJyc7XHJcblxyXG4gICAgcHVibGljIGZvcmNlUG9seWZpbGxzID0gZmFsc2U7XHJcblxyXG4gICAgcHVibGljIGZha2VNb2RlID0gZmFsc2U7XHJcblxyXG4gICAgcHVibGljIGRlYnVnID0gZmFsc2U7XHJcblxyXG4gICAgcHVibGljIG1vZGU6IEVudmlyb25tZW50TW9kZSA9ICdwcm9kdWN0aW9uJztcclxuXHJcbiAgICBwdWJsaWMgcGVyZm9ybWFuY2VBdWRpdCA9IGZhbHNlO1xyXG5cclxuICAgIHB1YmxpYyB2YWxpZGF0ZSgpIHtcclxuICAgICAgICBpZiAoIXRoaXMuYXBpS2V5KSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQXBpS2V5IGlzIHJlcXVpcmVkIGJ1dCBub3QgZGVmaW5lZCBvciBlbXB0eS4nKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCF0aGlzLndvcmtlclVybCkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1dvcmtlclVybCBpcyByZXF1aXJlZCBidXQgbm90IGRlZmluZWQgb3IgZW1wdHkuJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy9pZmRlZi1sb2FkZXIvaWZkZWYtbG9hZGVyLmpzP0RFQlVHPXRydWUmUEVSRk9STUFOQ0VfQVVESVQ9dHJ1ZSEuL3NyYy9jb25maWd1cmF0aW9ucy9kZWZhdWx0cy9lbnZpcm9ubWVudC50cyIsImltcG9ydCB7IElDb25maWd1cmF0aW9uLCBJRW52aXJvbm1lbnREYXRhIH0gZnJvbSAnLi9jb25maWd1cmF0aW9ucyc7XHJcbmltcG9ydCB7IGNvbmZpZ3VyYXRpb24gYXMgcHJlZGVmaW5lZENvbmZpZ3VyYXRpb24gfSBmcm9tICcuL2NvbmZpZ3VyYXRpb25zL2RlZmF1bHRzL2NvbmZpZ3VyYXRpb24nO1xyXG5pbXBvcnQgeyBJTWVzc2FnZSB9IGZyb20gJy4vZGVmaW5pdGlvbnMnO1xyXG5pbXBvcnQgeyBJU2VuZGluZ09wdGlvbnMgfSBmcm9tICcuL2RlZmluaXRpb25zL3NlbmRpbmctb3B0aW9ucyc7XHJcbmltcG9ydCB7IEJ1ZmZlckNhbGwgfSBmcm9tICcuL2ZyYW1ld29yay9idWZmZXItY2FsbCc7XHJcbmltcG9ydCB7IElMb2dnZXIgfSBmcm9tICcuL2xvZ3MnO1xyXG5pbXBvcnQgeyBNYWluUmVjZWl2ZXJMb2dnZXIgfSBmcm9tICcuL2xvZ3MvbWFpbi1yZWNlaXZlci1sb2dnZXInO1xyXG5pbXBvcnQgeyBJTWVzc2FnZVNlbmRlciB9IGZyb20gJy4vbWVzc2FnZS1zZW5kZXInO1xyXG5pbXBvcnQgeyBNYWluUmVjZWl2ZXIgfSBmcm9tICcuL3dvcmtlcnMvbWFpbi1yZWNlaXZlcic7XHJcbmltcG9ydCB7IFdvcmtlclJlcXVlc3RTZW5kZXIgfSBmcm9tICcuL3dvcmtlcnMvc2VuZGVycy93b3JrZXItcmVxdWVzdC1zZW5kZXInO1xyXG5pbXBvcnQgeyBJQ29uZmlndXJhdGlvbldvcmtlck1lc3NhZ2UsIElNZXNzYWdlc1dvcmtlck1lc3NhZ2UsIElXb3JrZXJJbnN0YW5jZSB9IGZyb20gJy4vd29ya2Vycy93b3JrZXItZGVmaW5pdGlvbnMnO1xyXG5pbXBvcnQgeyBXb3JrZXJQcm92aWRlciB9IGZyb20gJy4vd29ya2Vycy93b3JrZXItcHJvdmlkZXInO1xyXG5cclxuLyoqXHJcbiAqIE1lc3NhZ2Ugc2VuZGVyIGltcGxlbWVudGF0aW9uIGZvciBmdWxsIG1vZGVcclxuICpcclxuICogQGludGVybmFsXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgTWVzc2FnZVNlbmRlckZ1bGwgaW1wbGVtZW50cyBJTWVzc2FnZVNlbmRlciB7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF93b3JrZXI6IElXb3JrZXJJbnN0YW5jZTtcclxuXHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9yZWNlaXZlcjogTWFpblJlY2VpdmVyO1xyXG5cclxuICAgIHB1YmxpYyBnZXQgYWpheCgpIHsgcmV0dXJuIHRoaXMuX3JlY2VpdmVyLmFqYXg7IH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IHBlcmZvcm1hbmNlKCkgeyByZXR1cm4gdGhpcy5fcmVjZWl2ZXIucGVyZm9ybWFuY2U7IH1cclxuXHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF90ZXJtaW5hdGVDb21tYW5kOiBXb3JrZXJSZXF1ZXN0U2VuZGVyPCd0ZXJtaW5hdGUnLCB1bmRlZmluZWQsIHZvaWQ+O1xyXG5cclxuICAgIHByaXZhdGUgX2Rpc3Bvc2VkID0gZmFsc2U7XHJcblxyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfc2VuZE1lc3NhZ2VzOiBCdWZmZXJDYWxsPElNZXNzYWdlPjtcclxuXHJcbiAgICBwcml2YXRlIF9waW5nSW50ZXJ2YWxJZDogYW55O1xyXG5cclxuICAgIHByaXZhdGUgcmVhZG9ubHkgX2NvbmZpZ3VyYXRpb246IElDb25maWd1cmF0aW9uV29ya2VyTWVzc2FnZTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBlbnZpcm9ubWVudDogSUVudmlyb25tZW50RGF0YSxcclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IF9sb2dnZXI6IElMb2dnZXIsXHJcbiAgICAgICAgY29uZmlndXJhdGlvbjogSUNvbmZpZ3VyYXRpb24gfCBudWxsID0gbnVsbFxyXG4gICAgKSB7XHJcbiAgICAgICAgY29uZmlndXJhdGlvbiA9IGNvbmZpZ3VyYXRpb24gfHwgcHJlZGVmaW5lZENvbmZpZ3VyYXRpb24oZW52aXJvbm1lbnQubW9kZSk7XHJcbiAgICAgICAgY29uc3Qgd29ya2VyUHJvdmlkZXIgPSBuZXcgV29ya2VyUHJvdmlkZXIoZW52aXJvbm1lbnQud29ya2VyVXJsLCBjb25maWd1cmF0aW9uLndvcmtlcnMgfHwgW10sIF9sb2dnZXIpO1xyXG5cclxuICAgICAgICBjb25zdCB3b3JrZXIgPSB0aGlzLl93b3JrZXIgPSB3b3JrZXJQcm92aWRlci5uZXcoKTtcclxuXHJcbiAgICAgICAgdGhpcy5fcmVjZWl2ZXIgPSBuZXcgTWFpblJlY2VpdmVyKHdvcmtlciwgX2xvZ2dlcik7XHJcbiAgICAgICAgdGhpcy5fdGVybWluYXRlQ29tbWFuZCA9IG5ldyBXb3JrZXJSZXF1ZXN0U2VuZGVyKCd0ZXJtaW5hdGUnLCB3b3JrZXIsIHRoaXMuX3JlY2VpdmVyLnJlY2VpdmVyKTtcclxuXHJcbiAgICAgICAgTWFpblJlY2VpdmVyTG9nZ2VyLmxvZyh0aGlzLl9yZWNlaXZlciwgdGhpcy5fbG9nZ2VyKTtcclxuXHJcbiAgICAgICAgdGhpcy5fY29uZmlndXJhdGlvbiA9IHsgdHlwZTogJ2NvbmZpZ3VyYXRpb24nLCBjb25maWd1cmF0aW9uLCBlbnZpcm9ubWVudCB9O1xyXG5cclxuICAgICAgICAvLyBJbml0aWFsaXplIHdvcmtlciBieSBjb25maWd1cmF0aW9uXHJcbiAgICAgICAgd29ya2VyLnBvc3RNZXNzYWdlKHRoaXMuX2NvbmZpZ3VyYXRpb24pO1xyXG5cclxuICAgICAgICB0aGlzLl9zZW5kTWVzc2FnZXMgPSBuZXcgQnVmZmVyQ2FsbDxJTWVzc2FnZT4oKG1lc3NhZ2VzKSA9PiB7XHJcbiAgICAgICAgICAgIHdvcmtlci5wb3N0TWVzc2FnZSh7IHR5cGU6ICdtZXNzYWdlcycsIG1lc3NhZ2VzIH0gYXMgSU1lc3NhZ2VzV29ya2VyTWVzc2FnZSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMucGluZygpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZW5kKG1lc3NhZ2U6IElNZXNzYWdlIHwgQXJyYXk8SU1lc3NhZ2U+LCBvcHRpb25zPzogSVNlbmRpbmdPcHRpb25zKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fc2VuZE1lc3NhZ2VzLmNhbGwobWVzc2FnZSwgb3B0aW9ucyAmJiBvcHRpb25zLnN5bmMpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBkaXNwb3NlKGNhbGxiYWNrPzogKCkgPT4gdm9pZCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IHJlc29sdmUgPSBjYWxsYmFjayB8fCAoKCkgPT4geyAvKiovIH0pO1xyXG5cclxuICAgICAgICBpZiAoIXRoaXMuX2Rpc3Bvc2VkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2Rpc3Bvc2VkID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9waW5nSW50ZXJ2YWxJZCkge1xyXG4gICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLl9waW5nSW50ZXJ2YWxJZCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHdvcmtlciA9IHRoaXMuX3dvcmtlcjtcclxuICAgICAgICAgICAgY29uc3QgaGFuZGxlciA9ICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc2VuZE1lc3NhZ2VzLmNsZWFyKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcmVjZWl2ZXIuZGlzcG9zZSgpO1xyXG4gICAgICAgICAgICAgICAgfSBmaW5hbGx5IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSB3b3JrZXIudGVybWluYXRlKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQgJiYgdHlwZW9mIHJlc3VsdC50aGVuID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdC50aGVuKCgpID0+IHJlc29sdmUoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgdGhpcy5fdGVybWluYXRlQ29tbWFuZC5zZW5kKHVuZGVmaW5lZCwgaGFuZGxlciwgaGFuZGxlcik7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmVzb2x2ZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHBpbmcoKSB7XHJcbiAgICAgICAgdGhpcy5fcGluZ0ludGVydmFsSWQgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuX3dvcmtlci5wb3N0TWVzc2FnZSh0aGlzLl9jb25maWd1cmF0aW9uKTtcclxuICAgICAgICB9LCA1MDAwKTtcclxuICAgIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvaWZkZWYtbG9hZGVyL2lmZGVmLWxvYWRlci5qcz9ERUJVRz10cnVlJlBFUkZPUk1BTkNFX0FVRElUPXRydWUhLi9zcmMvbWVzc2FnZS1zZW5kZXItZnVsbC50cyIsIi8vIHRzbGludDpkaXNhYmxlOnF1b3RlbWFya1xyXG5pbXBvcnQgeyBFbnZpcm9ubWVudE1vZGUgfSBmcm9tIFwiLi4vLi4vZGVmaW5pdGlvbnNcIjtcclxuaW1wb3J0IHsgSUNvbmZpZ3VyYXRpb24sIElGRUFuYWx5dGljQ29sbGVjdG9yRW5kcG9pbnRDb25maWcgfSBmcm9tICcuLi9jb25maWd1cmF0aW9uJztcclxuXHJcbi8qKlxyXG4gKiBAaW50ZXJuYWxcclxuICovXHJcbmV4cG9ydCBjb25zdCBjb25maWd1cmF0aW9uID0gKG1vZGU6IEVudmlyb25tZW50TW9kZSk6IElDb25maWd1cmF0aW9uID0+IHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgLy8gd29ya2VyczogWydlbXVsYXRlZCddLFxyXG4gICAgICAgIGVuZHBvaW50czogW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0eXBlOiBcImZlLWFuYWx5dGljLWNvbGxlY3RvclwiLFxyXG4gICAgICAgICAgICAgICAgdXJsOiBtb2RlID09PSAncHJvZHVjdGlvbicgPyBcImh0dHBzOi8vYW5hbHl0aWNzLmFnb2RhLmNvbVwiIDogXCIvL2hrZy1nYy1zdGFnaW5nLmFnb2RhLmxvY2FsXCIsXHJcbiAgICAgICAgICAgICAgICB0aW1lb3V0OiA2MDAwMCxcclxuICAgICAgICAgICAgICAgIHF1ZXVlczogW1xyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IFwiZGVmYXVsdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmbHVzaFRpbWU6IDEwMDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1heEZsdXNoVGltZTogMzAwMDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJhdGNoU2l6ZTogNTAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1heE1lc3NhZ2VDb3VudDogMTUwMDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBlcnNpc3RlbnQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGF0dGVtcHRDb3VudDogMixcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmlsbFRocmVzaG9sZDogMC42XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICB9IGFzIElGRUFuYWx5dGljQ29sbGVjdG9yRW5kcG9pbnRDb25maWdcclxuICAgICAgICBdXHJcbiAgICB9O1xyXG59O1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvaWZkZWYtbG9hZGVyL2lmZGVmLWxvYWRlci5qcz9ERUJVRz10cnVlJlBFUkZPUk1BTkNFX0FVRElUPXRydWUhLi9zcmMvY29uZmlndXJhdGlvbnMvZGVmYXVsdHMvY29uZmlndXJhdGlvbi50cyIsImltcG9ydCB7IFVubG9hZEV2ZW50IH0gZnJvbSAnLi91bmxvYWQtZXZlbnQnO1xyXG5cclxuLyoqXHJcbiAqIENhbGwgZnVuY3Rpb24gYXQgdGhlIGVuZCBvZiB0aGUgY3VycmVudCBKUyBleGVjdXRpb24gZmxvdyB3aXRoIGNvbmNhdGVuZGF0ZWQgYXJyYXlcclxuICovXHJcbmV4cG9ydCBjbGFzcyBCdWZmZXJDYWxsPFQ+IHtcclxuICAgIHByaXZhdGUgX2J1ZmZlciA9IG5ldyBBcnJheTxUPigpO1xyXG4gICAgcHJpdmF0ZSB0aW1lb3V0SWQ6IGFueTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IF9hY3Rpb246IChidWZmZXI6IEFycmF5PFQ+KSA9PiB2b2lkXHJcbiAgICApIHsgfVxyXG5cclxuICAgIHB1YmxpYyBjYWxsKHZhbHVlOiBUIHwgQXJyYXk8VD4sIHN5bmM6IGJvb2xlYW4gPSBmYWxzZSk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX2J1ZmZlci5wdXNoKC4uLnZhbHVlKTtcclxuXHJcbiAgICAgICAgaWYgKHN5bmMpIHtcclxuICAgICAgICAgICAgdGhpcy5mbHVzaCgpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy50aW1lb3V0SWQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudGltZW91dElkID0gc2V0VGltZW91dCh0aGlzLmZsdXNoKTtcclxuICAgICAgICAgICAgICAgIFVubG9hZEV2ZW50LmFkZExpc3RlbmVyKHRoaXMuZmx1c2gpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbGVhcigpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9idWZmZXIgPSBuZXcgQXJyYXk8VD4oKTtcclxuICAgICAgICBpZiAodGhpcy50aW1lb3V0SWQpIHtcclxuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMudGltZW91dElkKTtcclxuICAgICAgICAgICAgdGhpcy50aW1lb3V0SWQgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFVubG9hZEV2ZW50LnJlbW92ZUxpc3RlbmVyKHRoaXMuZmx1c2gpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZmx1c2ggPSAoKSA9PiB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX2J1ZmZlci5sZW5ndGggIT09IDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2FjdGlvbih0aGlzLl9idWZmZXIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBmaW5hbGx5IHtcclxuICAgICAgICAgICAgdGhpcy5jbGVhcigpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvaWZkZWYtbG9hZGVyL2lmZGVmLWxvYWRlci5qcz9ERUJVRz10cnVlJlBFUkZPUk1BTkNFX0FVRElUPXRydWUhLi9zcmMvZnJhbWV3b3JrL2J1ZmZlci1jYWxsLnRzIiwiaW1wb3J0IHsgTWFpblJlY2VpdmVyIH0gZnJvbSAnLi4vd29ya2Vycy9tYWluLXJlY2VpdmVyJztcclxuaW1wb3J0IHsgSUxvZ2dlciB9IGZyb20gJy4vbG9nZ2VyJztcclxuaW1wb3J0IHsgSVdvcmtlckxvZyB9IGZyb20gJy4vd29ya2VyLWxvZyc7XHJcblxyXG4vKipcclxuICogRW1pdCBsb2dzIGZyb20gTWFpblJlY2VpdmVyXHJcbiAqXHJcbiAqIEBpbnRlcm5hbFxyXG4gKi9cclxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIE1haW5SZWNlaXZlckxvZ2dlciB7XHJcbiAgICBwdWJsaWMgc3RhdGljIGxvZyhyZWNlaXZlcjogTWFpblJlY2VpdmVyLCBsb2dnZXI6IElMb2dnZXIpIHtcclxuICAgICAgICByZWNlaXZlci5sb2cuc3Vic2NyaWJlKChsb2cpID0+IE1haW5SZWNlaXZlckxvZ2dlci5wcmludExvZyhsb2dnZXIsIGxvZykpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIHByaW50TG9nKGxvZ2dlcjogSUxvZ2dlciwgbG9nOiBJV29ya2VyTG9nKSB7XHJcbiAgICAgICAgc3dpdGNoIChsb2cubGV2ZWwpIHtcclxuICAgICAgICAgICAgY2FzZSAnbG9nJzogbG9nZ2VyLmxvZyhsb2cubWVzc2FnZSk7IGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdlcnJvcic6IGxvZ2dlci5lcnJvcihsb2cubWVzc2FnZSk7IGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdmYXRhbCc6IGxvZ2dlci5mYXRhbChsb2cubWVzc2FnZSk7IGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBsb2dnZXIubG9nKGxvZy5tZXNzYWdlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL2lmZGVmLWxvYWRlci9pZmRlZi1sb2FkZXIuanM/REVCVUc9dHJ1ZSZQRVJGT1JNQU5DRV9BVURJVD10cnVlIS4vc3JjL2xvZ3MvbWFpbi1yZWNlaXZlci1sb2dnZXIudHMiLCJpbXBvcnQgeyBJQWpheE9wdGlvbnMgfSBmcm9tICcuLi9mcmFtZXdvcmsvYWpheC1kZWZpbml0aW9ucyc7XHJcbmltcG9ydCB7IEV2ZW50RW1pdHRlciB9IGZyb20gJy4uL2ZyYW1ld29yay9ldmVudC1lbWl0dGVyJztcclxuaW1wb3J0IHsgSUxvZ2dlciB9IGZyb20gJy4uL2xvZ3MvbG9nZ2VyJztcclxuaW1wb3J0IHsgSVdvcmtlckxvZyB9IGZyb20gJy4uL2xvZ3Mvd29ya2VyLWxvZyc7XHJcbmltcG9ydCB7IElQZXJmb3JtYW5jZVJlcG9ydCB9IGZyb20gJy4uL3Byb2Nlc3NpbmcvYXVkaXQvZGVmaW5pdGlvbnMnO1xyXG5pbXBvcnQgeyBNZXNzYWdlUmVjZWl2ZXIgfSBmcm9tICcuL3NlbmRlcnMvbWVzc2FnZS1yZWNlaXZlcic7XHJcbmltcG9ydCB7IE9wdGlvbmFsUmVzcG9uc2VFbWl0dGVyIH0gZnJvbSAnLi9zZW5kZXJzL3Jlc3BvbnNlLWVtaXR0ZXInO1xyXG5pbXBvcnQgeyBXb3JrZXJFdmVudFJlY2VpdmVyIH0gZnJvbSAnLi9zZW5kZXJzL3dvcmtlci1ldmVudC1yZWNlaXZlcic7XHJcbmltcG9ydCB7IFdvcmtlclJlcXVlc3RSZWNlaXZlciB9IGZyb20gJy4vc2VuZGVycy93b3JrZXItcmVxdWVzdC1yZWNlaXZlcic7XHJcbmltcG9ydCB7IElMb2dXb3JrZXJNZXNzYWdlLCBJUGVyZm9ybWFuY2VXb3JrZXJNZXNzYWdlLCBJV29ya2VySW5zdGFuY2UgfSBmcm9tICcuL3dvcmtlci1kZWZpbml0aW9ucyc7XHJcblxyXG4vKipcclxuICogQ2xhc3MgdG8gcmVjZWl2ZSBldmVudHMgZnJvbSBXZWJXb3JrZXJcclxuICpcclxuICogQGludGVybmFsXHJcbiAqIEBjbGFzcyBNYWluUmVjZWl2ZXJcclxuICovXHJcbmV4cG9ydCBjbGFzcyBNYWluUmVjZWl2ZXIge1xyXG4gICAgcHVibGljIHJlYWRvbmx5IHJlY2VpdmVyOiBNZXNzYWdlUmVjZWl2ZXI7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZWNlaXZlZCBuZXcgYWpheCByZXF1ZXN0XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyByZWFkb25seSBhamF4ID0gbmV3IE9wdGlvbmFsUmVzcG9uc2VFbWl0dGVyPElBamF4T3B0aW9ucywgc3RyaW5nPigne30nKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlY2VpdmVkIG5ldyBsb2dzXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyByZWFkb25seSBsb2c6IEV2ZW50RW1pdHRlcjxJV29ya2VyTG9nPjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlY2VpdmVkIG5ldyBwZXJmb21hbmNlIHJlcG9ydFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcmVhZG9ubHkgcGVyZm9ybWFuY2U6IEV2ZW50RW1pdHRlcjxJUGVyZm9ybWFuY2VSZXBvcnQ+O1xyXG5cclxuICAgIHByaXZhdGUgcmVhZG9ubHkgX2FqYXg6IFdvcmtlclJlcXVlc3RSZWNlaXZlcjwnYWpheCcsIElBamF4T3B0aW9ucywgc3RyaW5nPjtcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgX2xvZzogV29ya2VyRXZlbnRSZWNlaXZlcjwnbG9nJywgSUxvZ1dvcmtlck1lc3NhZ2U+O1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfcGVyZm9ybWFuY2U6IFdvcmtlckV2ZW50UmVjZWl2ZXI8J3BlcmZvcm1hbmNlJywgSVBlcmZvcm1hbmNlV29ya2VyTWVzc2FnZT47XHJcblxyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgd29ya2VyOiBJV29ya2VySW5zdGFuY2UsXHJcbiAgICAgICAgbG9nZ2VyOiBJTG9nZ2VyLFxyXG4gICAgKSB7XHJcbiAgICAgICAgdGhpcy5yZWNlaXZlciA9IG5ldyBNZXNzYWdlUmVjZWl2ZXIod29ya2VyLCBsb2dnZXIpO1xyXG5cclxuICAgICAgICB0aGlzLl9hamF4ID0gbmV3IFdvcmtlclJlcXVlc3RSZWNlaXZlcignYWpheCcsIHdvcmtlciwgdGhpcy5yZWNlaXZlciwgdGhpcy5hamF4KTtcclxuXHJcbiAgICAgICAgdGhpcy5fbG9nID0gbmV3IFdvcmtlckV2ZW50UmVjZWl2ZXIoJ2xvZycsIHRoaXMucmVjZWl2ZXIpO1xyXG5cclxuICAgICAgICB0aGlzLl9wZXJmb3JtYW5jZSA9IG5ldyBXb3JrZXJFdmVudFJlY2VpdmVyKCdwZXJmb3JtYW5jZScsIHRoaXMucmVjZWl2ZXIpO1xyXG5cclxuICAgICAgICB0aGlzLmxvZyA9IHRoaXMuX2xvZy5ldmVudC5tYXAoKGRhdGEpID0+IGRhdGEubG9nKTtcclxuXHJcbiAgICAgICAgdGhpcy5wZXJmb3JtYW5jZSA9IHRoaXMuX3BlcmZvcm1hbmNlLmV2ZW50Lm1hcCgoZGF0YSkgPT4gZGF0YS5yZXBvcnQpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBkaXNwb3NlKCkge1xyXG4gICAgICAgIHRoaXMuX2FqYXguZGlzcG9zZSgpO1xyXG4gICAgICAgIHRoaXMuX2xvZy5kaXNwb3NlKCk7XHJcbiAgICAgICAgdGhpcy5fcGVyZm9ybWFuY2UuZGlzcG9zZSgpO1xyXG4gICAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy9pZmRlZi1sb2FkZXIvaWZkZWYtbG9hZGVyLmpzP0RFQlVHPXRydWUmUEVSRk9STUFOQ0VfQVVESVQ9dHJ1ZSEuL3NyYy93b3JrZXJzL21haW4tcmVjZWl2ZXIudHMiLCJpbXBvcnQgeyBTdXBwb3J0ZWRXb3JrZXIgfSBmcm9tICcuLi9jb25maWd1cmF0aW9ucy9jb25maWd1cmF0aW9uJztcclxuaW1wb3J0IHsgU2VydmljZVdvcmtlclV0aWxzIH0gZnJvbSAnLi4vZnJhbWV3b3JrL3NlcnZpY2Utd29ya2VyLXV0aWxzJztcclxuaW1wb3J0IHsgSUxvZ2dlciB9IGZyb20gJy4uL2xvZ3MvbG9nZ2VyJztcclxuaW1wb3J0IHsgUHNldWRvV29ya2VyIH0gZnJvbSAnLi9wc2V1ZG8td29ya2VyJztcclxuaW1wb3J0IHsgU2VydmljZVdvcmtlclN5bmNocm9ub3VzIH0gZnJvbSAnLi9zZXJ2aWNlLXdvcmtlci1zeW5jaHJvbm91cyc7XHJcbmltcG9ydCB7IElXb3JrZXJJbnN0YW5jZSB9IGZyb20gJy4vd29ya2VyLWRlZmluaXRpb25zJztcclxuXHJcbi8qKlxyXG4gKiBDcmVhdGUgc3VwcG9ydGVkIGJ5IGN1cnJlbnQgZW52aXJvbm1lbnQgV2ViV29ya2VyXHJcbiAqXHJcbiAqIEBpbnRlcm5hbFxyXG4gKiBAY2xhc3MgV29ya2VyUHJvdmlkZXJcclxuICovXHJcbmV4cG9ydCBjbGFzcyBXb3JrZXJQcm92aWRlciB7XHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IF9wYXRoOiBzdHJpbmcsXHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBfd29ya2VyczogQXJyYXk8U3VwcG9ydGVkV29ya2VyPixcclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IF9sb2dnZXI6IElMb2dnZXJcclxuICAgICkgeyB9XHJcblxyXG4gICAgcHVibGljIG5ldygpOiBJV29ya2VySW5zdGFuY2Uge1xyXG4gICAgICAgIGNvbnN0IHN1cHBvcnRlZFdvcmtlcnMgPSB0aGlzLnN1cHBvcnRlZFdvcmtlcih0aGlzLl93b3JrZXJzKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5jcmVhdGUoc3VwcG9ydGVkV29ya2Vycyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjcmVhdGUodHlwZTogU3VwcG9ydGVkV29ya2VyKTogSVdvcmtlckluc3RhbmNlIHtcclxuICAgICAgICB0aGlzLl9sb2dnZXIubG9nKGBDcmVhdGluZyB3b3JrZXI6ICcke3R5cGV9J2ApO1xyXG4gICAgICAgIHN3aXRjaCAodHlwZSkge1xyXG4gICAgICAgICAgICBjYXNlICdzZXJ2aWNlJzogcmV0dXJuIHRoaXMuc2VydmljZVdvcmtlcigpO1xyXG4gICAgICAgICAgICBjYXNlICdlbXVsYXRlZCc6IHJldHVybiB0aGlzLmVtdWxhdGVkV29ya2VyKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZW11bGF0ZWRXb3JrZXIoKTogSVdvcmtlckluc3RhbmNlIHtcclxuICAgICAgICByZXR1cm4gbmV3IFBzZXVkb1dvcmtlcih0aGlzLl9wYXRoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNlcnZpY2VXb3JrZXIoKTogSVdvcmtlckluc3RhbmNlIHtcclxuICAgICAgICByZXR1cm4gbmV3IFNlcnZpY2VXb3JrZXJTeW5jaHJvbm91cyh0aGlzLl9wYXRoLCAocmVhc29uKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuX2xvZ2dlci5lcnJvcihyZWFzb24uc3RhY2spO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jcmVhdGUodGhpcy5zdXBwb3J0ZWRXb3JrZXIoWydlbXVsYXRlZCddKSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzdXBwb3J0ZWRXb3JrZXIocHJlZmVyZW5jZTogQXJyYXk8U3VwcG9ydGVkV29ya2VyPiA9IFsnc2VydmljZScsICdlbXVsYXRlZCddKTogU3VwcG9ydGVkV29ya2VyIHtcclxuICAgICAgICBpZiAoU2VydmljZVdvcmtlclV0aWxzLmlzU3VwcG9ydGVkKCkgJiYgcHJlZmVyZW5jZS5pbmRleE9mKCdzZXJ2aWNlJykgPj0gMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gJ3NlcnZpY2UnO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAocHJlZmVyZW5jZS5pbmRleE9mKCdlbXVsYXRlZCcpID49IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuICdlbXVsYXRlZCc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLnN1cHBvcnRlZFdvcmtlcigpO1xyXG4gICAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy9pZmRlZi1sb2FkZXIvaWZkZWYtbG9hZGVyLmpzP0RFQlVHPXRydWUmUEVSRk9STUFOQ0VfQVVESVQ9dHJ1ZSEuL3NyYy93b3JrZXJzL3dvcmtlci1wcm92aWRlci50cyIsImltcG9ydCB7IFN5bmNDYWxsIH0gZnJvbSAnLi4vZnJhbWV3b3JrL3N5bmMtY2FsbCc7XHJcbmltcG9ydCB7IFNlcnZpY2VXb3JrZXJXcmFwcGVyIH0gZnJvbSAnLi9zZXJ2aWNlLXdvcmtlci13cmFwcGVyJztcclxuaW1wb3J0IHsgSVdvcmtlckluc3RhbmNlLCBNZXNzYWdlRXZlbnRMaXN0ZW5lciB9IGZyb20gJy4vd29ya2VyLWRlZmluaXRpb25zJztcclxuXHJcbi8qKlxyXG4gKiBDb252ZXJ0IElXb3JrZXJJbnN0YW5jZSBtZXRob2QgY2FsbGluZyB0byBzeW5jaHJvbm91cyBvcGVyYXRpb25zXHJcbiAqXHJcbiAqIEBpbnRlcm5hbFxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFNlcnZpY2VXb3JrZXJTeW5jaHJvbm91cyBpbXBsZW1lbnRzIElXb3JrZXJJbnN0YW5jZSB7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9zeW5jOiBTeW5jQ2FsbDxJV29ya2VySW5zdGFuY2U+O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHBhdGg6IHN0cmluZyxcclxuICAgICAgICBkb3duZ3JhZGU6IChyZWFzb246IGFueSkgPT4gSVdvcmtlckluc3RhbmNlXHJcbiAgICApIHtcclxuICAgICAgICBjb25zdCBzZXJ2aWNlV29ya2VyID0gU2VydmljZVdvcmtlcldyYXBwZXIuY3JlYXRlKHBhdGgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmNhdGNoKChlcnJvcikgPT4gZG93bmdyYWRlKGVycm9yKSk7XHJcblxyXG4gICAgICAgIHRoaXMuX3N5bmMgPSBuZXcgU3luY0NhbGwoc2VydmljZVdvcmtlcik7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFkZEV2ZW50TGlzdGVuZXIodHlwZTogJ21lc3NhZ2UnLCBsaXN0ZW5lcjogTWVzc2FnZUV2ZW50TGlzdGVuZXIpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9zeW5jLmNhbGwoKHN3KSA9PiBzdy5hZGRFdmVudExpc3RlbmVyKHR5cGUsIGxpc3RlbmVyKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlbW92ZUV2ZW50TGlzdGVuZXIodHlwZTogJ21lc3NhZ2UnLCBsaXN0ZW5lcjogTWVzc2FnZUV2ZW50TGlzdGVuZXIpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9zeW5jLmNhbGwoKHN3KSA9PiBzdy5yZW1vdmVFdmVudExpc3RlbmVyKHR5cGUsIGxpc3RlbmVyKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHRlcm1pbmF0ZSgpOiB2b2lkIHwgUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3N5bmMuY2FsbCgoc3cpID0+IHN3LnRlcm1pbmF0ZSgpKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcG9zdE1lc3NhZ2UoZGF0YTogYW55KTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fc3luYy5jYWxsKChzdykgPT4gc3cucG9zdE1lc3NhZ2UoZGF0YSkpO1xyXG4gICAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy9pZmRlZi1sb2FkZXIvaWZkZWYtbG9hZGVyLmpzP0RFQlVHPXRydWUmUEVSRk9STUFOQ0VfQVVESVQ9dHJ1ZSEuL3NyYy93b3JrZXJzL3NlcnZpY2Utd29ya2VyLXN5bmNocm9ub3VzLnRzIiwiLyoqXHJcbiAqIFdheSB0byBjb252ZXJ0IG1ldGhvZCBjYWxscyBmb3IgYXN5bmNocm9ub3VzIGNyZWF0ZWQgb2JqZWN0IHRvIHN5bmNocm9ub3VzIGNhbGxpbmdcclxuICpcclxuICogVGhlIG1ldGhvZHMgc2hvdWxkIG5vdCByZXR1cm4gYW55IHZhbHVlc1xyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFN5bmNDYWxsPFRPYmplY3Q+IHtcclxuICAgIHByaXZhdGUgX29iajogVE9iamVjdDtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IF9hc3luYzogUHJvbWlzZTxUT2JqZWN0PlxyXG4gICAgKSB7XHJcbiAgICAgICAgdGhpcy5fYXN5bmMudGhlbigob2JqKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuX29iaiA9IG9iajtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIElmIG9iamVjdCBpcyBub3QgcmVzb2x2ZWQgeWV0LCB0aGUgY2FsbGluZyB3aWxsIGJlIGFzeW5jaHJvbm91c1xyXG4gICAgICogSWYgb2JqZWN0IGFscmVhZHkgZXhpc3RzIHRoZSwgY2FsbGluZyB3aWxsIGJlIHN5bmNocm9ub3VzXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBjYWxsID0gPFRSZXN1bHQ+KGZ1bmM6IChvYmo6IFRPYmplY3QpID0+IFRSZXN1bHQgfCBQcm9taXNlPFRSZXN1bHQ+KTogVFJlc3VsdCB8IFByb21pc2U8VFJlc3VsdD4gPT4ge1xyXG4gICAgICAgIGlmICh0aGlzLl9vYmopIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZ1bmModGhpcy5fb2JqKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fYXN5bmMudGhlbigob2JqKSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZnVuYyhvYmopO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL2lmZGVmLWxvYWRlci9pZmRlZi1sb2FkZXIuanM/REVCVUc9dHJ1ZSZQRVJGT1JNQU5DRV9BVURJVD10cnVlIS4vc3JjL2ZyYW1ld29yay9zeW5jLWNhbGwudHMiLCJpbXBvcnQgeyBTZXJ2aWNlV29ya2VyVXRpbHMgfSBmcm9tICcuLi9mcmFtZXdvcmsvc2VydmljZS13b3JrZXItdXRpbHMnO1xyXG5pbXBvcnQgeyBJV29ya2VySW5zdGFuY2UsIE1lc3NhZ2VFdmVudExpc3RlbmVyIH0gZnJvbSAnLi93b3JrZXItZGVmaW5pdGlvbnMnO1xyXG5cclxuLyoqXHJcbiAqIENhbGwgd3JhcCBzZXJ2aWNlIHdvcmtlciBmdW5jdGlvbiB0byBzdGFuZGFyZCBXZWJXb3JrZXIgQVBJXHJcbiAqXHJcbiAqIEBpbnRlcm5hbFxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFNlcnZpY2VXb3JrZXJXcmFwcGVyIGltcGxlbWVudHMgSVdvcmtlckluc3RhbmNlIHtcclxuICAgIHB1YmxpYyBzdGF0aWMgY3JlYXRlKHBhdGg6IHN0cmluZyk6IFByb21pc2U8U2VydmljZVdvcmtlcldyYXBwZXI+IHtcclxuICAgICAgICBpZiAoU2VydmljZVdvcmtlclV0aWxzLmlzU3VwcG9ydGVkKCkpIHtcclxuICAgICAgICAgICAgY29uc3Qgc2NvcGUgPSBTZXJ2aWNlV29ya2VyVXRpbHMuYWJzb2x1dGVTY29wZShwYXRoLCAnbWFzc2FnaW5nLWNsaWVudCcpO1xyXG4gICAgICAgICAgICByZXR1cm4gU2VydmljZVdvcmtlclV0aWxzLmFjdGl2YXRlKHBhdGgsIHNjb3BlKS50aGVuKChkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFNlcnZpY2VXb3JrZXJXcmFwcGVyKGRhdGEucmVnaXN0cmF0aW9uLCBkYXRhLnNlcnZpY2VXb3JrZXIpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcignU2VydmljZVdvcmtlciBpcyB1bnN1cHBvcnRlZCcpKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwdWJsaWMgcmVnaXN0cmF0aW9uOiBTZXJ2aWNlV29ya2VyUmVnaXN0cmF0aW9uLFxyXG4gICAgICAgIHB1YmxpYyBzZXJ2aWNlV29ya2VyOiBTZXJ2aWNlV29ya2VyLFxyXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBjb250YWluZXI6IFNlcnZpY2VXb3JrZXJDb250YWluZXIgPSAobmF2aWdhdG9yIGFzIE5hdmlnYXRvcikuc2VydmljZVdvcmtlclxyXG4gICAgKSB7XHJcbiAgICAgICAgdGhpcy5zdWJzY3JpYmUoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYWRkRXZlbnRMaXN0ZW5lcih0eXBlOiAnbWVzc2FnZScsIGxpc3RlbmVyOiBNZXNzYWdlRXZlbnRMaXN0ZW5lcik6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuY29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIodHlwZSwgbGlzdGVuZXIgYXMgYW55KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVtb3ZlRXZlbnRMaXN0ZW5lcih0eXBlOiAnbWVzc2FnZScsIGxpc3RlbmVyOiBNZXNzYWdlRXZlbnRMaXN0ZW5lcik6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuY29udGFpbmVyLnJlbW92ZUV2ZW50TGlzdGVuZXIodHlwZSwgbGlzdGVuZXIgYXMgYW55KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdGVybWluYXRlKCk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgICh0aGlzLnNlcnZpY2VXb3JrZXIgYXMgYW55KS5vbnN0YXRlY2hhbmdlID0gdW5kZWZpbmVkO1xyXG4gICAgICAgIHJldHVybiB0aGlzLnJlZ2lzdHJhdGlvbi51bnJlZ2lzdGVyKCkgYXMgYW55IGFzIFByb21pc2U8dm9pZD47XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHBvc3RNZXNzYWdlKGRhdGE6IGFueSk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLnNlcnZpY2VXb3JrZXIuc3RhdGUgIT09ICdyZWR1bmRhbnQnKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2VydmljZVdvcmtlci5wb3N0TWVzc2FnZShkYXRhKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzdWJzY3JpYmUoKSB7XHJcbiAgICAgICAgY29uc3Qgc2VydmljZVdvcmtlciA9IHRoaXMuc2VydmljZVdvcmtlcjtcclxuICAgICAgICBzZXJ2aWNlV29ya2VyLm9uc3RhdGVjaGFuZ2UgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChzZXJ2aWNlV29ya2VyLnN0YXRlID09PSAncmVkdW5kYW50Jykge1xyXG4gICAgICAgICAgICAgICAgKHNlcnZpY2VXb3JrZXIgYXMgYW55KS5vbnN0YXRlY2hhbmdlID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb250YWluZXIuZ2V0UmVnaXN0cmF0aW9uLmNhbGwodGhpcy5jb250YWluZXIsIHRoaXMucmVnaXN0cmF0aW9uLnNjb3BlKS50aGVuKChyZWdpc3RyYXRpb246IFNlcnZpY2VXb3JrZXJSZWdpc3RyYXRpb24pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocmVnaXN0cmF0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVnaXN0cmF0aW9uID0gcmVnaXN0cmF0aW9uO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlcnZpY2VXb3JrZXIgPSByZWdpc3RyYXRpb24uYWN0aXZlIHx8IHJlZ2lzdHJhdGlvbi5pbnN0YWxsaW5nIHx8IHJlZ2lzdHJhdGlvbi53YWl0aW5nIHx8IHNlcnZpY2VXb3JrZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3Vic2NyaWJlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy9pZmRlZi1sb2FkZXIvaWZkZWYtbG9hZGVyLmpzP0RFQlVHPXRydWUmUEVSRk9STUFOQ0VfQVVESVQ9dHJ1ZSEuL3NyYy93b3JrZXJzL3NlcnZpY2Utd29ya2VyLXdyYXBwZXIudHMiXSwic291cmNlUm9vdCI6IiJ9