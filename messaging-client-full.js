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
            }).then(function (sw) {
                alert(sw.serviceWorker.state);
                return sw;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCAxOGNlNmM3NWQwNDI1NGFlYzZmYiIsIndlYnBhY2s6Ly8vLi9zcmMvZnJhbWV3b3JrL2d1aWQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ZyYW1ld29yay91dGlscy90cmF2ZXJzYWwudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ZyYW1ld29yay9pbmRleC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZnJhbWV3b3JrL2V2ZW50LWVtaXR0ZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ZyYW1ld29yay9nbG9iYWwudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ZyYW1ld29yay90aW1lc3RhbXAudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ZyYW1ld29yay91dGlscy9leHRlbmQudHMiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS9idWlsZGluL2dsb2JhbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZnJhbWV3b3JrL3V0aWxzL2luZGV4LnRzIiwid2VicGFjazovLy8uL3NyYy9mcmFtZXdvcmsvdW5sb2FkLWV2ZW50LnRzIiwid2VicGFjazovLy8uL3NyYy9mcmFtZXdvcmsvYWpheC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZnJhbWV3b3JrL3NpbmdsZXRvbi50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZnJhbWV3b3JrL3V0aWxzL2dyb3VwQnkudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ZyYW1ld29yay91dGlscy9vdmVycmlkZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZnJhbWV3b3JrL3V0aWxzL3NhZmVDbG9uZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbG9ncy9jb25zb2xlLWxvZ2dlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbG9ncy9ldmVudC1sb2dnZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xvZ3MvdW5pdmVyc2FsLWxvZ2dlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZnJhbWV3b3JrL3N0cmluZ3MudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3dvcmtlcnMvc2VuZGVycy93b3JrZXItcmVxdWVzdC1zZW5kZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3dvcmtlcnMvc2VuZGVycy9tZXNzYWdlLXJlY2VpdmVyLnRzIiwid2VicGFjazovLy8uL3NyYy93b3JrZXJzL3NlbmRlcnMvcmVzcG9uc2UtZW1pdHRlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvd29ya2Vycy9zZW5kZXJzL3dvcmtlci1ldmVudC1yZWNlaXZlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvd29ya2Vycy9zZW5kZXJzL3dvcmtlci1yZXF1ZXN0LXJlY2VpdmVyLnRzIiwid2VicGFjazovLy8uL3NyYy93b3JrZXJzL3BzZXVkby13b3JrZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ZyYW1ld29yay9zY3JpcHQtbG9hZGVyLnRzIiwid2VicGFjazovLy8uL3NyYy9saXRlLWRhdGEtY29udGFpbmVyLnRzIiwid2VicGFjazovLy8uL3NyYy9tZXNzYWdpbmctY2xpZW50LWluc3RhbmNlLnRzIiwid2VicGFjazovLy8uL3NyYy9mcmFtZXdvcmsvc2VydmljZS13b3JrZXItdXRpbHMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21lc3NhZ2luZy1jbGllbnQtZnVsbC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29uZmlndXJhdGlvbnMvZGVmYXVsdHMvZW52aXJvbm1lbnQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21lc3NhZ2Utc2VuZGVyLWZ1bGwudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbmZpZ3VyYXRpb25zL2RlZmF1bHRzL2NvbmZpZ3VyYXRpb24udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ZyYW1ld29yay9idWZmZXItY2FsbC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbG9ncy9tYWluLXJlY2VpdmVyLWxvZ2dlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvd29ya2Vycy9tYWluLXJlY2VpdmVyLnRzIiwid2VicGFjazovLy8uL3NyYy93b3JrZXJzL3dvcmtlci1wcm92aWRlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvd29ya2Vycy9zZXJ2aWNlLXdvcmtlci1zeW5jaHJvbm91cy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZnJhbWV3b3JrL3N5bmMtY2FsbC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvd29ya2Vycy9zZXJ2aWNlLXdvcmtlci13cmFwcGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO0FDVkE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ25EQTs7Ozs7O0dBTUc7QUFDSDtJQVFJLHNCQUNvQixNQUF3QjtRQUF4QixrQ0FBUyxNQUFNLENBQUMsTUFBTSxFQUFFO1FBQXhCLFdBQU0sR0FBTixNQUFNLENBQWtCO1FBSDNCLGVBQVUsR0FBa0IsRUFBRSxDQUFDO1FBSzVDLElBQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUM7UUFDbEMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxHQUFHLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQztZQUMzQixTQUFTLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FB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SSxZQUFZLENBQUMsVUFBVSxJQUFJLFlBQVksQ0FBQyxPQUFPLElBQUksYUFBYSxDQUFDO3dCQUM3RyxLQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7b0JBQ3JCLENBQUM7Z0JBQ0wsQ0FBQyxDQUFDLENBQUM7WUFDUCxDQUFDO1FBQ0wsQ0FBQyxDQUFDO0lBQ04sQ0FBQztJQUNMLDJCQUFDO0FBQUQsQ0FBQztBQXhEWSxvREFBb0IiLCJmaWxlIjoibWVzc2FnaW5nLWNsaWVudC1mdWxsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW10sIGZhY3RvcnkpO1xuXHRlbHNlIHtcblx0XHR2YXIgYSA9IGZhY3RvcnkoKTtcblx0XHRmb3IodmFyIGkgaW4gYSkgKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyA/IGV4cG9ydHMgOiByb290KVtpXSA9IGFbaV07XG5cdH1cbn0pKHRoaXMsIGZ1bmN0aW9uKCkge1xucmV0dXJuIFxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAxNDgpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDE4Y2U2Yzc1ZDA0MjU0YWVjNmZiIiwiLyoqXHJcbiAqIEFQSSBkZWZpbml0aW9uIGZvciBwcm92aWRpbmcgR1VJRFxyXG4gKlxyXG4gKiBAaW50ZXJuYWxcclxuICogQGludGVyZmFjZSBJR3VpZFByb3ZpZGVyXHJcbiAqL1xyXG5leHBvcnQgaW50ZXJmYWNlIElHdWlkUHJvdmlkZXIge1xyXG4gICAgbmV4dCgpOiBzdHJpbmc7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBSZWFsIEdVSUQgcHJvdmlkZXIgaW1wbGVtZW50YXRpb25cclxuICpcclxuICogQGludGVybmFsXHJcbiAqIEBjbGFzcyBHdWlkUHJvdmlkZXJcclxuICogQGltcGxlbWVudHMge0lHdWlkUHJvdmlkZXJ9XHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgR3VpZFByb3ZpZGVyIGltcGxlbWVudHMgSUd1aWRQcm92aWRlciB7XHJcbiAgICBwdWJsaWMgc3RhdGljIF9kZWZhdWx0OiBHdWlkUHJvdmlkZXI7XHJcbiAgICBwdWJsaWMgc3RhdGljIGdldCBkZWZhdWx0KCk6IEd1aWRQcm92aWRlciB7XHJcbiAgICAgICAgcmV0dXJuIEd1aWRQcm92aWRlci5fZGVmYXVsdCB8fCAoR3VpZFByb3ZpZGVyLl9kZWZhdWx0ID0gbmV3IEd1aWRQcm92aWRlcigpICk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfYnl0ZVRvSGV4OiBBcnJheTxzdHJpbmc+ID0gW107XHJcblxyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IHJhbmRvbSA9IFJhbmRvbS5jcmVhdGUoKVxyXG4gICAgKSB7XHJcbiAgICAgICAgY29uc3QgYnl0ZVRvSGV4ID0gdGhpcy5fYnl0ZVRvSGV4O1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMjU2OyArK2kpIHtcclxuICAgICAgICAgICAgYnl0ZVRvSGV4W2ldID0gKGkgKyAweDEwMCkudG9TdHJpbmcoMTYpLnN1YnN0cigxKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm4gYSBuZXcgZ3VpZFxyXG4gICAgICpcclxuICAgICAqIFRvRG86IFRoaW5rIGFib3V0IG1vcmUgZWZlY3RpdmUgYWxnb3JpdGhtXHJcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxyXG4gICAgICogQG1lbWJlcm9mIEd1aWRQcm92aWRlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgbmV4dCgpIHtcclxuICAgICAgICBjb25zdCBybmRzID0gdGhpcy5yYW5kb20ubmV4dCgpO1xyXG5cclxuICAgICAgICAvLyBQZXIgNC40LCBzZXQgYml0cyBmb3IgdmVyc2lvbiBhbmQgYGNsb2NrX3NlcV9oaV9hbmRfcmVzZXJ2ZWRgXHJcbiAgICAgICAgcm5kc1s2XSA9IChybmRzWzZdICYgMHgwZikgfCAweDQwO1xyXG4gICAgICAgIHJuZHNbOF0gPSAocm5kc1s4XSAmIDB4M2YpIHwgMHg4MDtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuYnl0ZXNUb1V1aWQocm5kcyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBieXRlc1RvVXVpZChidWY6IHsgW2luZGV4OiBudW1iZXJdOiBudW1iZXIgfSkge1xyXG4gICAgICAgIGxldCBpID0gMDtcclxuICAgICAgICBjb25zdCBidGggPSB0aGlzLl9ieXRlVG9IZXg7XHJcbiAgICAgICAgcmV0dXJuIGJ0aFtidWZbaSsrXV0gKyBidGhbYnVmW2krK11dICtcclxuICAgICAgICAgICAgICAgYnRoW2J1ZltpKytdXSArIGJ0aFtidWZbaSsrXV0gK1xyXG4gICAgICAgICAgICAgICBidGhbYnVmW2krK11dICsgYnRoW2J1ZltpKytdXSArXHJcbiAgICAgICAgICAgICAgIGJ0aFtidWZbaSsrXV0gKyBidGhbYnVmW2krK11dICtcclxuICAgICAgICAgICAgICAgYnRoW2J1ZltpKytdXSArIGJ0aFtidWZbaSsrXV0gK1xyXG4gICAgICAgICAgICAgICBidGhbYnVmW2krK11dICsgYnRoW2J1ZltpKytdXSArXHJcbiAgICAgICAgICAgICAgIGJ0aFtidWZbaSsrXV0gKyBidGhbYnVmW2krK11dICtcclxuICAgICAgICAgICAgICAgYnRoW2J1ZltpKytdXSArIGJ0aFtidWZbaSsrXV07XHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBCYXNlZCByYW5kb20gbnVtYmVycyBzb3VyY2VcclxuICpcclxuICogQGludGVybmFsXHJcbiAqIEBhYnN0cmFjdFxyXG4gKiBAY2xhc3MgUmFuZG9tXHJcbiAqL1xyXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgUmFuZG9tIHtcclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlIG5ldyBSYW5kb20gZ2VuZXJhdG9yIGluc3RhbmNlIHN1cHBvcnRlZCBieSBjdXJyZW50IGVudmlyb25tZW50XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgY3JlYXRlKGZvcmNlU2ltcGxlOiBib29sZWFuID0gZmFsc2UpOiBSYW5kb20ge1xyXG4gICAgICAgIGlmICh0eXBlb2YgY3J5cHRvICE9PSAndW5kZWZpbmVkJ1xyXG4gICAgICAgICAgICAmJiBjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzXHJcbiAgICAgICAgICAgICYmICFmb3JjZVNpbXBsZVxyXG4gICAgICAgICkge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IENyeXB0b1JhbmRvbSgpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgU2ltcGxlUmFuZG9tKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhYnN0cmFjdCBuZXh0KCk6IHsgW2luZGV4OiBudW1iZXJdOiBudW1iZXIgfTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFByb3ZpZGUgc3Ryb25nIHJhbmRvbSB2YWx1ZXMgZnJvbSBDcnlwdG8gQVBJXHJcbiAqXHJcbiAqIEBpbnRlcm5hbFxyXG4gKiBAY2xhc3MgQ3J5cHRvUmFuZG9tXHJcbiAqIEBleHRlbmRzIHtSYW5kb219XHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgQ3J5cHRvUmFuZG9tIGV4dGVuZHMgUmFuZG9tIHtcclxuICAgIHB1YmxpYyBuZXh0KCk6IHsgW2luZGV4OiBudW1iZXJdOiBudW1iZXIgfSB7XHJcbiAgICAgICAgLy8gV0hBVFdHIGNyeXB0byBSTkcgLSBodHRwOi8vd2lraS53aGF0d2cub3JnL3dpa2kvQ3J5cHRvXHJcbiAgICAgICAgY29uc3Qgcm5kczggPSBuZXcgVWludDhBcnJheSgxNik7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW5kZWZcclxuICAgICAgICBjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzKHJuZHM4KTtcclxuICAgICAgICByZXR1cm4gcm5kczg7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBQcm92aWRlIHJhbmRvbSB2YWx1ZXMgZnJvbSB1bnByZWRpY3RhYmxlIE1hdGgucmFuZG9tIGZ1bmN0aW9uXHJcbiAqXHJcbiAqIEBpbnRlcm5hbFxyXG4gKiBAY2xhc3MgU2ltcGxlUmFuZG9tXHJcbiAqIEBleHRlbmRzIHtSYW5kb219XHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgU2ltcGxlUmFuZG9tIGV4dGVuZHMgUmFuZG9tIHtcclxuICAgIHByaXZhdGUgX3JuZHMgPSBuZXcgQXJyYXkoMTYpO1xyXG5cclxuICAgIHB1YmxpYyBuZXh0KCk6IEFycmF5PG51bWJlcj4ge1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwLCByID0gMDsgaSA8IDE2OyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKChpICYgMHgwMykgPT09IDApIHtcclxuICAgICAgICAgICAgICAgIHIgPSBNYXRoLnJhbmRvbSgpICogMHgxMDAwMDAwMDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5fcm5kc1tpXSA9IHIgPj4+ICgoaSAmIDB4MDMpIDw8IDMpICYgMHhmZjtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3JuZHM7XHJcbiAgICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL2lmZGVmLWxvYWRlci9pZmRlZi1sb2FkZXIuanM/REVCVUc9dHJ1ZSZQRVJGT1JNQU5DRV9BVURJVD10cnVlIS4vc3JjL2ZyYW1ld29yay9ndWlkLnRzIiwiLyoqXHJcbiAqIEBpbnRlcm5hbFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHRyYXZlcnNhbChcclxuICAgIGNhbGxiYWNrOiAobmFtZTogc3RyaW5nLCBzb3VyY2VWYWx1ZTogYW55KSA9PiB2b2lkLFxyXG4gICAgZGVzdGluYXRpb246IGFueSxcclxuICAgIHNvdXJjZXM6IEFycmF5PGFueT5cclxuKSB7XHJcbiAgICAvLyBEbyBub3QgdXNlIGZvci4ub2YgdG8gYXZvaWQgcmVxdWlyZSBwb2x5ZmlsbHNcclxuICAgIGNvbnN0IGxlbmd0aCA9IHNvdXJjZXMubGVuZ3RoO1xyXG4gICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IGxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgIGNvbnN0IHNvdXJjZSA9IHNvdXJjZXNbaW5kZXhdO1xyXG5cclxuICAgICAgICBpZiAoIXNvdXJjZSkge1xyXG4gICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZvciAoY29uc3QgbmFtZSBpbiBzb3VyY2UpIHtcclxuICAgICAgICAgICAgaWYgKHNvdXJjZS5oYXNPd25Qcm9wZXJ0eShuYW1lKSkge1xyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2sobmFtZSwgc291cmNlW25hbWVdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvaWZkZWYtbG9hZGVyL2lmZGVmLWxvYWRlci5qcz9ERUJVRz10cnVlJlBFUkZPUk1BTkNFX0FVRElUPXRydWUhLi9zcmMvZnJhbWV3b3JrL3V0aWxzL3RyYXZlcnNhbC50cyIsImV4cG9ydCAqIGZyb20gJy4vYWpheCc7XHJcbmV4cG9ydCAqIGZyb20gJy4vYWpheC1kZWZpbml0aW9ucyc7XHJcbmV4cG9ydCAqIGZyb20gJy4vZXZlbnQtZW1pdHRlcic7XHJcbmV4cG9ydCAqIGZyb20gJy4vZ3VpZCc7XHJcbmV4cG9ydCAqIGZyb20gJy4vc2luZ2xldG9uJztcclxuZXhwb3J0ICogZnJvbSAnLi90aW1lc3RhbXAnO1xyXG5leHBvcnQgKiBmcm9tICcuL3V0aWxzJztcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL2lmZGVmLWxvYWRlci9pZmRlZi1sb2FkZXIuanM/REVCVUc9dHJ1ZSZQRVJGT1JNQU5DRV9BVURJVD10cnVlIS4vc3JjL2ZyYW1ld29yay9pbmRleC50cyIsIi8qKlxyXG4gKiBFdmVudCBlbWl0dGVyIGFuZCBzdWJzY3JpYmVyIHRvIHNlbmQgdGhlIHNhbWUgbWVzc2FnZXMgdG8gYSBmZXcgZGVzdGluYXRpb25zXHJcbiAqXHJcbiAqIEBpbnRlcm5hbFxyXG4gKiBAY2xhc3MgRXZlbnRFbWl0dGVyXHJcbiAqIEB0ZW1wbGF0ZSBURXZlbnRcclxuICovXHJcbmV4cG9ydCBjbGFzcyBFdmVudEVtaXR0ZXI8VEV2ZW50PiB7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9saXN0ZW5lcnMgPSBuZXcgIEFycmF5PEV2ZW50TGlzdGVuZXI8VEV2ZW50Pj4oKTtcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgX2J1ZmZlciA9IG5ldyAgQXJyYXk8VEV2ZW50PigpO1xyXG5cclxuICAgIHB1YmxpYyBzdWJzY3JpYmUobGlzdGVuZXI6IEV2ZW50TGlzdGVuZXI8VEV2ZW50Pik6IEV2ZW50RW1pdHRlcjxURXZlbnQ+IHtcclxuICAgICAgICBpZiAodHlwZW9mIGxpc3RlbmVyID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnN1YnNjcmliZWQobGlzdGVuZXIpIDwgMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fbGlzdGVuZXJzLnB1c2gobGlzdGVuZXIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9idWZmZXIubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLmZsdXNoQnVmZmVyKCkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB1bnN1YnNjcmliZShsaXN0ZW5lcjogRXZlbnRMaXN0ZW5lcjxURXZlbnQ+KTogRXZlbnRFbWl0dGVyPFRFdmVudD4ge1xyXG4gICAgICAgIGxldCBpbmRleCA9IHRoaXMuc3Vic2NyaWJlZChsaXN0ZW5lcik7XHJcbiAgICAgICAgd2hpbGUgKGluZGV4ID49IDApIHtcclxuICAgICAgICAgICAgdGhpcy5fbGlzdGVuZXJzLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgICAgIGluZGV4ID0gdGhpcy5zdWJzY3JpYmVkKGxpc3RlbmVyKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsZWFyKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX2xpc3RlbmVycy5sZW5ndGggPSAwO1xyXG4gICAgICAgIHRoaXMuX2J1ZmZlci5sZW5ndGggPSAwO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBlbWl0KGRhdGE6IFRFdmVudCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IGxlbmd0aCA9IHRoaXMuX2xpc3RlbmVycy5sZW5ndGg7XHJcbiAgICAgICAgaWYgKGxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9saXN0ZW5lcnNbaV0oZGF0YSk7XHJcbiAgICAgICAgICAgICAgICB9IGNhdGNoIChlcikgeyAvKmRvIG5vdGhpbmcqLyB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLl9idWZmZXIucHVzaChkYXRhKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlZGlyZWN0KGVtaXR0ZXI6IEV2ZW50RW1pdHRlcjxURXZlbnQ+KTogRXZlbnRFbWl0dGVyPFRFdmVudD4ge1xyXG4gICAgICAgIHRoaXMuc3Vic2NyaWJlKChldmVudCkgPT4ge1xyXG4gICAgICAgICAgICBlbWl0dGVyLmVtaXQoZXZlbnQpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBlbWl0dGVyO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBtYXA8VE5ld0V2ZW50Pihjb252ZXJ0OiAoZGF0YTogVEV2ZW50KSA9PiBUTmV3RXZlbnQpOiBFdmVudEVtaXR0ZXI8VE5ld0V2ZW50PiB7XHJcbiAgICAgICAgY29uc3QgbmV3RXZlbnRFbWl0dGVyID0gbmV3IEV2ZW50RW1pdHRlcjxUTmV3RXZlbnQ+KCk7XHJcbiAgICAgICAgdGhpcy5zdWJzY3JpYmUoKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgIG5ld0V2ZW50RW1pdHRlci5lbWl0KGNvbnZlcnQoZXZlbnQpKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gbmV3RXZlbnRFbWl0dGVyO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc3Vic2NyaWJlZChsaXN0ZW5lcjogRXZlbnRMaXN0ZW5lcjxURXZlbnQ+KTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbGlzdGVuZXJzLmluZGV4T2YobGlzdGVuZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZmx1c2hCdWZmZXIoKSB7XHJcbiAgICAgICAgY29uc3QgYnVmZmVyID0gdGhpcy5fYnVmZmVyLnNsaWNlKCk7XHJcbiAgICAgICAgdGhpcy5fYnVmZmVyLmxlbmd0aCA9IDA7XHJcbiAgICAgICAgY29uc3QgbGVuZ3RoID0gYnVmZmVyLmxlbmd0aDtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZW1pdChidWZmZXJbaV0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHR5cGUgRXZlbnRMaXN0ZW5lcjxURXZlbnQ+ID0gKGV2ZW50OiBURXZlbnQpID0+IHZvaWQ7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy9pZmRlZi1sb2FkZXIvaWZkZWYtbG9hZGVyLmpzP0RFQlVHPXRydWUmUEVSRk9STUFOQ0VfQVVESVQ9dHJ1ZSEuL3NyYy9mcmFtZXdvcmsvZXZlbnQtZW1pdHRlci50cyIsIi8qKlxyXG4gKiBSZXR1cm4gZ2xvYmFsIHJvb3Qgb2JqZWN0IGZvciBjdXJyZW50IGVudmlyb25tZW50XHJcbiAqXHJcbiAqIEBpbnRlcm5hbFxyXG4gKiBAYWJzdHJhY3RcclxuICogQGNsYXNzIEdsb2JhbFByb3ZpZGVyXHJcbiAqL1xyXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgR2xvYmFsUHJvdmlkZXIge1xyXG4gICAgcHVibGljIHN0YXRpYyBjdXJyZW50KCkge1xyXG4gICAgICAgIGNvbnN0IHJvb3QgPSB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyA/IHdpbmRvdyA6XHJcbiAgICAgICAgICAgICAgICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXHJcbiAgICAgICAgICAgICAgICAgICAgIHR5cGVvZiBzZWxmICAgIT09ICd1bmRlZmluZWQnID8gc2VsZiA6XHJcbiAgICAgICAgICAgICAgICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXHJcbiAgICAgICAgICAgICAgICAgICAgIHR5cGVvZiBnbG9iYWwgIT09ICd1bmRlZmluZWQnID8gZ2xvYmFsIDpcclxuICAgICAgICAgICAgICAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cclxuICAgICAgICAgICAgICAgICAgICAgbnVsbDtcclxuXHJcbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXHJcbiAgICAgICAgaWYgKCFyb290KSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVW5zdXBwb3J0ZWQgZW52aXJvbm1lbnQuJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gcm9vdDtcclxuICAgIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvaWZkZWYtbG9hZGVyL2lmZGVmLWxvYWRlci5qcz9ERUJVRz10cnVlJlBFUkZPUk1BTkNFX0FVRElUPXRydWUhLi9zcmMvZnJhbWV3b3JrL2dsb2JhbC50cyIsIi8qKlxyXG4gKiBBUEkgb2YgdGltZXN0YW1wIHByb3ZpZGVyIGRlZmluaXRpb25cclxuICpcclxuICogQGludGVybmFsXHJcbiAqIEBpbnRlcmZhY2UgSVRpbWVTdGFtcFByb3ZpZGVyXHJcbiAqL1xyXG5leHBvcnQgaW50ZXJmYWNlIElUaW1lU3RhbXBQcm92aWRlciB7XHJcbiAgICBub3coKTogbnVtYmVyO1xyXG59XHJcblxyXG4vKipcclxuICogU2ltcGxlIHRpbWVzdGFtcCBwcm92aWRlciBpbXBsZW1lbnRhdGlvblxyXG4gKlxyXG4gKiBAaW50ZXJuYWxcclxuICogQGNsYXNzIFRpbWVTdGFtcFByb3ZpZGVyXHJcbiAqIEBpbXBsZW1lbnRzIHtJVGltZVN0YW1wUHJvdmlkZXJ9XHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgVGltZVN0YW1wUHJvdmlkZXIgaW1wbGVtZW50cyBJVGltZVN0YW1wUHJvdmlkZXIge1xyXG4gICAgcHVibGljIG5vdygpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiArbmV3IERhdGUoKTtcclxuICAgIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvaWZkZWYtbG9hZGVyL2lmZGVmLWxvYWRlci5qcz9ERUJVRz10cnVlJlBFUkZPUk1BTkNFX0FVRElUPXRydWUhLi9zcmMvZnJhbWV3b3JrL3RpbWVzdGFtcC50cyIsImltcG9ydCB7IHRyYXZlcnNhbCB9IGZyb20gJy4vdHJhdmVyc2FsJztcclxuXHJcbi8qKlxyXG4gKiBFeHRlbmQgdGhlIGZpcnN0IG9iamVjdCBieSBhbGwgcHJvcGVydGllcyBmcm9tIHRoZSBzZWNvbmRcclxuICogUmV0dXJuIHRoZSBmaXJzdCBvYmplY3RcclxuICpcclxuICogQGludGVybmFsXHJcbiAqIEBwYXJhbSB7Kn0gZGVzdGluYXRpb24gLSBvYmplY3Qgd2hhdCB3aWxsIGJlIGV4dGVuZGVkXHJcbiAqIEBwYXJhbSB7Kn0gc291cmNlIC0gb2JqZWN0IHdpdGggc291cmNlIGRhdGFcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBleHRlbmQoZGVzdGluYXRpb246IGFueSwgLi4uc291cmNlczogQXJyYXk8YW55Pik6IGFueSB7XHJcbiAgICBpZiAoIWRlc3RpbmF0aW9uKSB7XHJcbiAgICAgICAgZGVzdGluYXRpb24gPSB7fTtcclxuICAgIH1cclxuXHJcbiAgICB0cmF2ZXJzYWwoKG5hbWUsIHNvdXJjZVZhbHVlKSA9PiB7XHJcbiAgICAgICAgaWYgKGRlc3RpbmF0aW9uW25hbWVdID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgZGVzdGluYXRpb25bbmFtZV0gPSBzb3VyY2VWYWx1ZTtcclxuICAgICAgICB9XHJcbiAgICB9LCBkZXN0aW5hdGlvbiwgc291cmNlcyk7XHJcblxyXG4gICAgcmV0dXJuIGRlc3RpbmF0aW9uO1xyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy9pZmRlZi1sb2FkZXIvaWZkZWYtbG9hZGVyLmpzP0RFQlVHPXRydWUmUEVSRk9STUFOQ0VfQVVESVQ9dHJ1ZSEuL3NyYy9mcmFtZXdvcmsvdXRpbHMvZXh0ZW5kLnRzIiwidmFyIGc7XG5cbi8vIFRoaXMgd29ya3MgaW4gbm9uLXN0cmljdCBtb2RlXG5nID0gKGZ1bmN0aW9uKCkge1xuXHRyZXR1cm4gdGhpcztcbn0pKCk7XG5cbnRyeSB7XG5cdC8vIFRoaXMgd29ya3MgaWYgZXZhbCBpcyBhbGxvd2VkIChzZWUgQ1NQKVxuXHRnID0gZyB8fCBGdW5jdGlvbihcInJldHVybiB0aGlzXCIpKCkgfHwgKDEsZXZhbCkoXCJ0aGlzXCIpO1xufSBjYXRjaChlKSB7XG5cdC8vIFRoaXMgd29ya3MgaWYgdGhlIHdpbmRvdyByZWZlcmVuY2UgaXMgYXZhaWxhYmxlXG5cdGlmKHR5cGVvZiB3aW5kb3cgPT09IFwib2JqZWN0XCIpXG5cdFx0ZyA9IHdpbmRvdztcbn1cblxuLy8gZyBjYW4gc3RpbGwgYmUgdW5kZWZpbmVkLCBidXQgbm90aGluZyB0byBkbyBhYm91dCBpdC4uLlxuLy8gV2UgcmV0dXJuIHVuZGVmaW5lZCwgaW5zdGVhZCBvZiBub3RoaW5nIGhlcmUsIHNvIGl0J3Ncbi8vIGVhc2llciB0byBoYW5kbGUgdGhpcyBjYXNlLiBpZighZ2xvYmFsKSB7IC4uLn1cblxubW9kdWxlLmV4cG9ydHMgPSBnO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gKHdlYnBhY2spL2J1aWxkaW4vZ2xvYmFsLmpzXG4vLyBtb2R1bGUgaWQgPSAyMFxuLy8gbW9kdWxlIGNodW5rcyA9IDEgMiAzIiwiZXhwb3J0ICogZnJvbSAnLi9leHRlbmQnO1xyXG5leHBvcnQgKiBmcm9tICcuL2dyb3VwQnknO1xyXG5leHBvcnQgKiBmcm9tICcuL292ZXJyaWRlJztcclxuZXhwb3J0ICogZnJvbSAnLi9zYWZlQ2xvbmUnO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvaWZkZWYtbG9hZGVyL2lmZGVmLWxvYWRlci5qcz9ERUJVRz10cnVlJlBFUkZPUk1BTkNFX0FVRElUPXRydWUhLi9zcmMvZnJhbWV3b3JrL3V0aWxzL2luZGV4LnRzIiwiLyoqXHJcbiAqIFRoZSBjbGFzcyBjaG9vc2VzIHRoZSBiZXN0IHVubG9hZCBldmVudCBmb3IgZGlmZmVyZW50IGJyb3dzZXJzXHJcbiAqL1xyXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgVW5sb2FkRXZlbnQge1xyXG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSBtb2RlID0gdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCdcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gKCh3aW5kb3cub25wYWdlaGlkZSB8fCB3aW5kb3cub25wYWdlaGlkZSA9PT0gbnVsbCkgPyAncGFnZWhpZGUnIDogJ3VubG9hZCcpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6ICdub25lJztcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGFkZExpc3RlbmVyKGhhbmRsZXI6IChldmVudDogRXZlbnQpID0+IHZvaWQpOiBib29sZWFuIHtcclxuICAgICAgICBzd2l0Y2ggKFVubG9hZEV2ZW50Lm1vZGUpIHtcclxuICAgICAgICAgICAgY2FzZSAncGFnZWhpZGUnOiB7XHJcbiAgICAgICAgICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncGFnZWhpZGUnLCBoYW5kbGVyKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgJ3VubG9hZCc6IHtcclxuICAgICAgICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCd1bmxvYWQnLCBoYW5kbGVyKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyByZW1vdmVMaXN0ZW5lcihoYW5kbGVyOiAoZXZlbnQ6IEV2ZW50KSA9PiB2b2lkKTogYm9vbGVhbiB7XHJcbiAgICAgICAgc3dpdGNoIChVbmxvYWRFdmVudC5tb2RlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgJ3BhZ2VoaWRlJzoge1xyXG4gICAgICAgICAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3BhZ2VoaWRlJywgaGFuZGxlcik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlICd1bmxvYWQnOiB7XHJcbiAgICAgICAgICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigndW5sb2FkJywgaGFuZGxlcik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBkZWZhdWx0OiByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy9pZmRlZi1sb2FkZXIvaWZkZWYtbG9hZGVyLmpzP0RFQlVHPXRydWUmUEVSRk9STUFOQ0VfQVVESVQ9dHJ1ZSEuL3NyYy9mcmFtZXdvcmsvdW5sb2FkLWV2ZW50LnRzIiwiaW1wb3J0IHsgSUFqYXhPcHRpb25zLCBJQWpheFByb3ZpZGVyIH0gZnJvbSAnLi9hamF4LWRlZmluaXRpb25zJztcclxuXHJcbmRlY2xhcmUgY2xhc3MgWERvbWFpblJlcXVlc3Qge1xyXG4gICAgcHVibGljIG9ubG9hZDogKCkgPT4gdm9pZDtcclxuICAgIHB1YmxpYyBvbmVycm9yOiAoKSA9PiB2b2lkO1xyXG4gICAgcHVibGljIHRpbWVvdXQ6IG51bWJlcjtcclxuXHJcbiAgICBwdWJsaWMgcmVzcG9uc2VUZXh0OiBzdHJpbmc7XHJcblxyXG4gICAgcHVibGljIG9wZW4obWV0aG9kOiBzdHJpbmcsIHVybDogc3RyaW5nLCBhc3luYz86IGJvb2xlYW4pOiB2b2lkO1xyXG5cclxuICAgIHB1YmxpYyBzZW5kKGRhdGE/OiBzdHJpbmcpOiB2b2lkO1xyXG59XHJcblxyXG4vKipcclxuICogQWpheCBwcm92aWRlciBpbXBsZW1lbnRhdGlvblxyXG4gKi9cclxuY2xhc3MgQWpheFJlcXVlc3Qge1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfeGhyOiBYTUxIdHRwUmVxdWVzdCB8IFhEb21haW5SZXF1ZXN0O1xyXG5cclxuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXHJcbiAgICBjb25zdHJ1Y3Rvcihjb3JzOiBib29sZWFuKSB7XHJcbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXHJcbiAgICAgICAgaWYgKGNvcnMgJiYgdHlwZW9mIFhEb21haW5SZXF1ZXN0ICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgICB0aGlzLl94aHIgPSBuZXcgWERvbWFpblJlcXVlc3QoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLl94aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cclxuICAgIHB1YmxpYyBzZW5kKG9wdGlvbnM6IElBamF4T3B0aW9ucyk6IFByb21pc2U8c3RyaW5nPiB7XHJcbiAgICAgICAgY29uc3QgeGhyID0gdGhpcy5feGhyO1xyXG5cclxuICAgICAgICBjb25zdCB0eXBlID0gb3B0aW9ucy50eXBlIHx8ICdQT1NUJztcclxuICAgICAgICBjb25zdCBib2R5ID0gb3B0aW9ucy5ib2R5IHx8ICcnO1xyXG4gICAgICAgIGNvbnN0IHVybCA9IG9wdGlvbnMudXJsO1xyXG4gICAgICAgIGNvbnN0IHRpbWVvdXQgPSBvcHRpb25zLnRpbWVvdXQ7XHJcblxyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIHhoci5vcGVuKHR5cGUsIHVybCwgLyphc3luYyovIHRydWUpO1xyXG4gICAgICAgICAgICBpZiAodGltZW91dCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICB4aHIudGltZW91dCA9IHRpbWVvdXQ7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMuc3Vic2NyaWJlKHJlc29sdmUsIHJlamVjdCwgdGltZW91dCk7XHJcbiAgICAgICAgICAgIHhoci5zZW5kKGJvZHkpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXHJcbiAgICBwcml2YXRlIHN1YnNjcmliZShyZXNvbHZlOiAodmFsdWU/OiBzdHJpbmcpID0+IHZvaWQsIHJlamVjdDogKHJlYXNvbj86IHN0cmluZykgPT4gdm9pZCwgdGltZW91dDogbnVtYmVyIHwgdW5kZWZpbmVkKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgeGhyID0gdGhpcy5feGhyO1xyXG5cclxuICAgICAgICBjb25zdCBsb2cgPSBuZXcgQXJyYXk8bnVtYmVyPigpO1xyXG5cclxuICAgICAgICBpZiAoeGhyIGluc3RhbmNlb2YgWE1MSHR0cFJlcXVlc3QpIHtcclxuICAgICAgICAgICAgeGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IChhRXZ0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBsb2cucHVzaCh4aHIucmVhZHlTdGF0ZSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoeGhyLnJlYWR5U3RhdGUgPT09IDQpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoeGhyLnN0YXR1cyA+PSAyMDAgJiYgeGhyLnN0YXR1cyA8IDMwMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHhoci5yZXNwb25zZVRleHQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdCh4aHIucmVzcG9uc2VUZXh0IHx8IHhoci5yZXNwb25zZVR5cGUgfHwgJ0NPUlMgcHJvYmxlbScpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB4aHIub25sb2FkID0gKCkgPT4gcmVzb2x2ZSh4aHIucmVzcG9uc2VUZXh0KTtcclxuICAgICAgICAgICAgeGhyLm9uZXJyb3IgPSAoKSA9PiByZWplY3QoJ1hEb21haW4gQ09SUyBwcm9ibGVtJyk7XHJcblxyXG4gICAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bWF4LWxpbmUtbGVuZ3RoXHJcbiAgICAgICAgICAgIC8vIEZpeGVzIGJ1ZyB3aXRoIElFOTogaHR0cHM6Ly9zb2NpYWwubXNkbi5taWNyb3NvZnQuY29tL0ZvcnVtcy9pZS9lbi1VUy8zMGVmM2FkZC03NjdjLTQ0MzYtYjhhOS1mMWNhMTliNDgxMmUvaWU5LXJ0bS14ZG9tYWlucmVxdWVzdC1pc3N1ZWQtcmVxdWVzdHMtbWF5LWFib3J0LWlmLWFsbC1ldmVudC1oYW5kbGVycy1ub3Qtc3BlY2lmaWVkP2ZvcnVtPWlld2ViZGV2ZWxvcG1lbnRcclxuICAgICAgICAgICAgKHhociBhcyBhbnkpLm9ucHJvZ3Jlc3MgPSAoKSA9PiB7IC8qKi8gfTtcclxuICAgICAgICAgICAgKHhociBhcyBhbnkpLm9udGltZW91dCA9ICgpID0+IHsgcmVqZWN0KCdUaW1lb3V0Jyk7IH07XHJcbiAgICAgICAgICAgIGlmICh0aW1lb3V0KSB7XHJcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHJlamVjdCgnTWFudWFsIHRpbWVvdXQnKSwgdGltZW91dCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBBamF4IHByb3ZpZGVyIGNvbnN0cnVjdG9yXHJcbiAqXHJcbiAqIEBpbnRlcm5hbFxyXG4gKiBAY2xhc3MgQWpheFxyXG4gKiBAaW1wbGVtZW50cyB7SUFqYXhQcm92aWRlcn1cclxuICovXHJcbmV4cG9ydCBjbGFzcyBBamF4IGltcGxlbWVudHMgSUFqYXhQcm92aWRlciB7XHJcbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xyXG4gICAgcHVibGljIHNlbmQob3B0aW9uczogSUFqYXhPcHRpb25zKTogUHJvbWlzZTxzdHJpbmc+IHtcclxuICAgICAgICBpZiAodHlwZW9mIGZldGNoICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5mZXRjaChvcHRpb25zKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXHJcbiAgICAgICAgY29uc3QgaXNBYnNvbHV0ZVVybCA9IG9wdGlvbnMudXJsLmluZGV4T2YoJzovLycpID4gMCB8fCBvcHRpb25zLnVybC5pbmRleE9mKCcvLycpID09PSAwO1xyXG4gICAgICAgIHJldHVybiBuZXcgQWpheFJlcXVlc3QoLyplbmFibGUgQ09SUzogKi8gaXNBYnNvbHV0ZVVybCkuc2VuZChvcHRpb25zKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGZldGNoKG9wdGlvbnM6IElBamF4T3B0aW9ucyk6IFByb21pc2U8c3RyaW5nPiB7XHJcbiAgICAgICAgcmV0dXJuIGZldGNoKG9wdGlvbnMudXJsLCB7XHJcbiAgICAgICAgICAgIGJvZHk6IG9wdGlvbnMuYm9keSxcclxuICAgICAgICAgICAgbWV0aG9kOiBvcHRpb25zLnR5cGVcclxuICAgICAgICB9KS50aGVuKChyZXNwb25zZTogUmVzcG9uc2UpID0+IC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovIHJlc3BvbnNlLnRleHQoKSk7XHJcbiAgICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL2lmZGVmLWxvYWRlci9pZmRlZi1sb2FkZXIuanM/REVCVUc9dHJ1ZSZQRVJGT1JNQU5DRV9BVURJVD10cnVlIS4vc3JjL2ZyYW1ld29yay9hamF4LnRzIiwiLy8gdHNsaW50OmRpc2FibGU6bm8tYW55XHJcbi8qKlxyXG4gKiBQcm92aWRlIHNpbmdsZSBleGVjdXRpb24gb2YgcGFzc2VkIGZ1bmN0aW9uXHJcbiAqXHJcbiAqIEBpbnRlcm5hbFxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFNpbmdsZXRvbjxURnVuYyBleHRlbmRzICguLi5hcmdzOiBBcnJheTxhbnk+KSA9PiBhbnk+IHtcclxuICAgIHB1YmxpYyByZWFkb25seSBleGVjdXRlT25jZTogVEZ1bmM7XHJcblxyXG4gICAgcHJpdmF0ZSBfZXhlY3V0ZWQgPSBmYWxzZTtcclxuXHJcbiAgICBwcml2YXRlIF9yZXN1bHQ6IGFueTtcclxuXHJcbiAgICBwdWJsaWMgZ2V0IGV4ZWN1dGVkKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5fZXhlY3V0ZWQ7IH1cclxuXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IF9mdW5jOiBURnVuY1xyXG4gICAgKSB7XHJcbiAgICAgICAgdGhpcy5leGVjdXRlT25jZSA9IHRoaXMuZXhlY3V0ZSBhcyBURnVuYztcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGV4ZWN1dGUgPSAoLi4uYXJnczogQXJyYXk8YW55PikgPT4ge1xyXG4gICAgICAgIGlmICh0aGlzLl9leGVjdXRlZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fcmVzdWx0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fcmVzdWx0ID0gdGhpcy5fZnVuYyguLi5hcmdzKTtcclxuXHJcbiAgICAgICAgdGhpcy5fZXhlY3V0ZWQgPSB0cnVlO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5fcmVzdWx0O1xyXG4gICAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy9pZmRlZi1sb2FkZXIvaWZkZWYtbG9hZGVyLmpzP0RFQlVHPXRydWUmUEVSRk9STUFOQ0VfQVVESVQ9dHJ1ZSEuL3NyYy9mcmFtZXdvcmsvc2luZ2xldG9uLnRzIiwiLyoqXHJcbiAqIEBpbnRlcm5hbFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGdyb3VwQnk8VEl0ZW0sIFRLZXk+KGFycmF5OiBBcnJheTxUSXRlbT4sIHByZWRpY2F0ZTogKG9iajogVEl0ZW0pID0+IFRLZXkpOiBNYXA8VEtleSwgQXJyYXk8VEl0ZW0+PiB7XHJcbiAgICByZXR1cm4gYXJyYXkucmVkdWNlKChtYXA6IE1hcDxUS2V5LCBBcnJheTxUSXRlbT4+LCBjdXJyZW50OiBUSXRlbSkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGtleSA9IHByZWRpY2F0ZShjdXJyZW50KTtcclxuICAgICAgICBsZXQgcHJldiA9IG1hcC5nZXQoa2V5KTtcclxuICAgICAgICBpZiAoIXByZXYpIHtcclxuICAgICAgICAgICAgbWFwLnNldChrZXksIHByZXYgPSBbXSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHByZXYucHVzaChjdXJyZW50KTtcclxuICAgICAgICByZXR1cm4gbWFwO1xyXG4gICAgfSwgbmV3IE1hcDxUS2V5LCBBcnJheTxUSXRlbT4+KCkpO1xyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy9pZmRlZi1sb2FkZXIvaWZkZWYtbG9hZGVyLmpzP0RFQlVHPXRydWUmUEVSRk9STUFOQ0VfQVVESVQ9dHJ1ZSEuL3NyYy9mcmFtZXdvcmsvdXRpbHMvZ3JvdXBCeS50cyIsImltcG9ydCB7IHRyYXZlcnNhbCB9IGZyb20gJy4vdHJhdmVyc2FsJztcclxuXHJcbi8qKlxyXG4gKiBPdmVycmlkZSB0aGUgZmlyc3Qgb2JqZWN0IGJ5IGFsbCBwcm9wZXJ0aWVzIGZyb20gdGhlIHNlY29uZFxyXG4gKiBSZXR1cm4gdGhlIGZpcnN0IG9iamVjdFxyXG4gKlxyXG4gKiBAaW50ZXJuYWxcclxuICogQHBhcmFtIHsqfSBkZXN0aW5hdGlvbiAtIG9iamVjdCB3aGF0IHdpbGwgYmUgb3ZlcnJpZGVkXHJcbiAqIEBwYXJhbSB7Kn0gc291cmNlIC0gb2JqZWN0IHdpdGggc291cmNlIGRhdGFcclxuICovXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gb3ZlcnJpZGUoZGVzdGluYXRpb246IGFueSwgLi4uc291cmNlczogQXJyYXk8YW55Pik6IGFueSB7XHJcbiAgICBpZiAoIWRlc3RpbmF0aW9uKSB7XHJcbiAgICAgICAgZGVzdGluYXRpb24gPSB7fTtcclxuICAgIH1cclxuXHJcbiAgICB0cmF2ZXJzYWwoKG5hbWUsIHNvdXJjZVZhbHVlKSA9PiB7XHJcbiAgICAgICAgZGVzdGluYXRpb25bbmFtZV0gPSBzb3VyY2VWYWx1ZTtcclxuICAgIH0sIGRlc3RpbmF0aW9uLCBzb3VyY2VzKTtcclxuXHJcbiAgICByZXR1cm4gZGVzdGluYXRpb247XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL2lmZGVmLWxvYWRlci9pZmRlZi1sb2FkZXIuanM/REVCVUc9dHJ1ZSZQRVJGT1JNQU5DRV9BVURJVD10cnVlIS4vc3JjL2ZyYW1ld29yay91dGlscy9vdmVycmlkZS50cyIsImltcG9ydCB7IHRyYXZlcnNhbCB9IGZyb20gJy4vdHJhdmVyc2FsJztcclxuXHJcbi8qKlxyXG4gKiBDbG9uZSBvYmplY3QgZGF0YSB3aXRob3V0IGZ1bmN0aW9uc1xyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHNhZmVDbG9uZShzb3VyY2U6IGFueSk6IGFueSB7XHJcbiAgICBjb25zdCBkZXN0aW5hdGlvbjogYW55ID0geyB9O1xyXG5cclxuICAgIHRyYXZlcnNhbCgobmFtZSwgc291cmNlVmFsdWUpID0+IHtcclxuICAgICAgICBpZiAodHlwZW9mIChzb3VyY2VWYWx1ZSkgIT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgICAgZGVzdGluYXRpb25bbmFtZV0gPSBzb3VyY2VWYWx1ZTtcclxuICAgICAgICB9XHJcbiAgICB9LCBkZXN0aW5hdGlvbiwgWyBzb3VyY2UgXSk7XHJcblxyXG4gICAgcmV0dXJuIGRlc3RpbmF0aW9uO1xyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy9pZmRlZi1sb2FkZXIvaWZkZWYtbG9hZGVyLmpzP0RFQlVHPXRydWUmUEVSRk9STUFOQ0VfQVVESVQ9dHJ1ZSEuL3NyYy9mcmFtZXdvcmsvdXRpbHMvc2FmZUNsb25lLnRzIiwiaW1wb3J0IHsgSUxvZ2dlciB9IGZyb20gJy4vbG9nZ2VyJztcclxuXHJcbi8qKlxyXG4gKiBQcmludCBpbnRlcm5hbCBsb2cgbWVzc2FnZXMgaW4gYnJvd3NlciBjb25zb2xlXHJcbiAqXHJcbiAqIElzIG5vdCBzdXBwb3J0ZWQgZm9yIHNvbWUgZW52aXJvbm1lbnRcclxuICpcclxuICogQGludGVybmFsXHJcbiAqIEBjbGFzcyBDb25zb2xlTG9nZ2VyXHJcbiAqIEBpbXBsZW1lbnRzIHtJTG9nZ2VyfVxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIENvbnNvbGVMb2dnZXIgaW1wbGVtZW50cyBJTG9nZ2VyIHtcclxuICAgIHB1YmxpYyByZWFkb25seSBwcmVmaXg6IHN0cmluZyA9IGBbbWVzc2FnaW5nLWNsaWVudC5qc106IGA7XHJcblxyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBfb3B0aW9uczogeyBtdXRlOiBib29sZWFuIH1cclxuICAgICkgeyB9XHJcblxyXG4gICAgcHVibGljIGZhdGFsKG1lc3NhZ2U6IHN0cmluZywgZXJyb3I/OiBFcnJvcik6IHZvaWQge1xyXG4gICAgICAgIGlmICghdGhpcy5fb3B0aW9ucy5tdXRlKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IodGhpcy5wcmVmaXggKyBtZXNzYWdlLCBlcnJvcik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBlcnJvcihtZXNzYWdlOiBzdHJpbmcsIGVycm9yPzogRXJyb3IpOiB2b2lkIHtcclxuICAgICAgICBpZiAoIXRoaXMuX29wdGlvbnMubXV0ZSkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKHRoaXMucHJlZml4ICsgbWVzc2FnZSwgZXJyb3IpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbG9nKG1lc3NhZ2U6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgICAgIGlmICghdGhpcy5fb3B0aW9ucy5tdXRlKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMucHJlZml4ICsgbWVzc2FnZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy9pZmRlZi1sb2FkZXIvaWZkZWYtbG9hZGVyLmpzP0RFQlVHPXRydWUmUEVSRk9STUFOQ0VfQVVESVQ9dHJ1ZSEuL3NyYy9sb2dzL2NvbnNvbGUtbG9nZ2VyLnRzIiwiaW1wb3J0IHsgRXZlbnRFbWl0dGVyIH0gZnJvbSAnLi4vZnJhbWV3b3JrL2V2ZW50LWVtaXR0ZXInO1xyXG5pbXBvcnQgeyBJTG9nZ2VyIH0gZnJvbSAnLi9sb2dnZXInO1xyXG5pbXBvcnQgeyBJV29ya2VyTG9nIH0gZnJvbSAnLi93b3JrZXItbG9nJztcclxuXHJcbi8qKlxyXG4gKiBTZW5kIGxvZyBtZXNzYWdlcyBpbnRvIEV2ZW50RW1pdHRlclxyXG4gKlxyXG4gKiBAaW50ZXJuYWxcclxuICogQGNsYXNzIEV2ZW50TG9nZ2VyXHJcbiAqIEBpbXBsZW1lbnRzIHtJTG9nZ2VyfVxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIEV2ZW50TG9nZ2VyIGltcGxlbWVudHMgSUxvZ2dlciB7XHJcbiAgICBwdWJsaWMgcmVhZG9ubHkgb25sb2cgPSBuZXcgRXZlbnRFbWl0dGVyPElXb3JrZXJMb2c+KCk7XHJcblxyXG4gICAgcHVibGljIGZhdGFsKG1lc3NhZ2U6IHN0cmluZywgZXJyb3I/OiBFcnJvcik6IHZvaWQge1xyXG4gICAgICAgIHRoaXMub25sb2cuZW1pdCh7bGV2ZWw6ICdmYXRhbCcsIG1lc3NhZ2UsIGVycm9yfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGVycm9yKG1lc3NhZ2U6IHN0cmluZywgZXJyb3I/OiBFcnJvcik6IHZvaWQge1xyXG4gICAgICAgIHRoaXMub25sb2cuZW1pdCh7bGV2ZWw6ICdlcnJvcicsIG1lc3NhZ2UsIGVycm9yfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGxvZyhtZXNzYWdlOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLm9ubG9nLmVtaXQoe2xldmVsOiAnbG9nJywgbWVzc2FnZX0pO1xyXG4gICAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy9pZmRlZi1sb2FkZXIvaWZkZWYtbG9hZGVyLmpzP0RFQlVHPXRydWUmUEVSRk9STUFOQ0VfQVVESVQ9dHJ1ZSEuL3NyYy9sb2dzL2V2ZW50LWxvZ2dlci50cyIsImltcG9ydCB7IElMb2dnZXIgfSBmcm9tICcuL2xvZ2dlcic7XHJcblxyXG4vKipcclxuICogUHJveHkgbG9nZ2VyIHRvIHJlc2VuZCBhbGwgbG9nIG1lc3NhZ2VzIHRvIGFub3RoZXIgbG9nZ2Vyc1xyXG4gKlxyXG4gKiBAaW50ZXJuYWxcclxuICogQGNsYXNzIFVuaXZlcnNhbExvZ2dlclxyXG4gKiBAaW1wbGVtZW50cyB7SUxvZ2dlcn1cclxuICovXHJcbmV4cG9ydCBjbGFzcyBVbml2ZXJzYWxMb2dnZXIgaW1wbGVtZW50cyBJTG9nZ2VyIHtcclxuICAgIHB1YmxpYyBlbmFibGVkOiBib29sZWFuID0gdHJ1ZTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgbG9nZ2VyczogQXJyYXk8SUxvZ2dlcj4gPSBbXVxyXG4gICAgKSB7IH1cclxuXHJcbiAgICBwdWJsaWMgZmF0YWwobWVzc2FnZTogc3RyaW5nLCBlcnJvcj86IEVycm9yKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuZW5hYmxlZCkge1xyXG4gICAgICAgICAgICB0aGlzLmxvZ2dlcigobCkgPT4gbC5mYXRhbChtZXNzYWdlLCBlcnJvcikpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZXJyb3IobWVzc2FnZTogc3RyaW5nLCBlcnJvcj86IEVycm9yKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuZW5hYmxlZCkge1xyXG4gICAgICAgICAgICB0aGlzLmxvZ2dlcigobCkgPT4gbC5lcnJvcihtZXNzYWdlLCBlcnJvcikpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbG9nKG1lc3NhZ2U6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLmVuYWJsZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5sb2dnZXIoKGwpID0+IGwubG9nKG1lc3NhZ2UpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXBsYWNlIGV4aXN0aW5nIGxvZ2dlcnMgdG8gbmV3IG9uZXNcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5PElMb2dnZXI+fSBsb2dnZXJzXHJcbiAgICAgKiBAbWVtYmVyb2YgVW5pdmVyc2FsTG9nZ2VyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyByZXBsYWNlKG5ld0xvZ2dlcnM6IEFycmF5PElMb2dnZXI+KTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5sb2dnZXJzLmxlbmd0aCA9IDA7XHJcblxyXG4gICAgICAgIGNvbnN0IGxlbmd0aCA9IG5ld0xvZ2dlcnMubGVuZ3RoO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy5sb2dnZXJzLnB1c2gobmV3TG9nZ2Vyc1tpXSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgbG9nZ2VyKGV4ZWN1dGU6IChsb2dnZXI6IElMb2dnZXIpID0+IHZvaWQpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBsb2dnZXJzID0gdGhpcy5sb2dnZXJzO1xyXG4gICAgICAgIGNvbnN0IGxlbmd0aCA9IGxvZ2dlcnMubGVuZ3RoO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgZXhlY3V0ZShsb2dnZXJzW2ldKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL2lmZGVmLWxvYWRlci9pZmRlZi1sb2FkZXIuanM/REVCVUc9dHJ1ZSZQRVJGT1JNQU5DRV9BVURJVD10cnVlIS4vc3JjL2xvZ3MvdW5pdmVyc2FsLWxvZ2dlci50cyIsImV4cG9ydCBmdW5jdGlvbiBlbmRzV2l0aChzdHI6IHN0cmluZywgc2VhcmNoU3RyOiBzdHJpbmcpOiBib29sZWFuIHtcclxuICAgIHJldHVybiBzdHIuc3Vic3RyKC1zZWFyY2hTdHIubGVuZ3RoLCBzZWFyY2hTdHIubGVuZ3RoKSA9PT0gc2VhcmNoU3RyO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gbWFwUGF0aChwYXRoMTogc3RyaW5nLCBwYXRoMjogc3RyaW5nKTogc3RyaW5nIHtcclxuICAgIGlmIChwYXRoMlswXSA9PT0gJy8nKSB7XHJcbiAgICAgICAgcmV0dXJuIHBhdGgyO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGluZGV4ID0gcGF0aDEubGFzdEluZGV4T2YoJy8nKTtcclxuICAgIGlmIChpbmRleCA8IDApIHtcclxuICAgICAgICByZXR1cm4gJy8nICsgcGF0aDI7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcGF0aDEuc3Vic3RyaW5nKDAsIGluZGV4ICsgMSkgKyBwYXRoMjtcclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvaWZkZWYtbG9hZGVyL2lmZGVmLWxvYWRlci5qcz9ERUJVRz10cnVlJlBFUkZPUk1BTkNFX0FVRElUPXRydWUhLi9zcmMvZnJhbWV3b3JrL3N0cmluZ3MudHMiLCJpbXBvcnQgeyBHdWlkUHJvdmlkZXIgfSBmcm9tICcuLi8uLi9mcmFtZXdvcmsvZ3VpZCc7XHJcbmltcG9ydCB7IElXb3JrZXJNZXNzYWdlLCBJV29ya2VyTWVzc2FnZVJlY2VpdmVyLCBJV29ya2VyTWVzc2FnZVNlbmRlciwgV29ya2VyRGF0YVR5cGUgfSBmcm9tICcuLi93b3JrZXItZGVmaW5pdGlvbnMnO1xyXG5pbXBvcnQgeyBJUmVxdWVzdEVudmVsb3AgfSBmcm9tICcuL3dvcmtlci1yZXF1ZXN0LXJlY2VpdmVyJztcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSVJlc3BvbnNlRW52ZWxvcDxUVHlwZSBleHRlbmRzIFdvcmtlckRhdGFUeXBlLCBUUmVzcG9uc2U+IGV4dGVuZHMgSVdvcmtlck1lc3NhZ2U8VFR5cGU+ICB7XHJcbiAgICByZXNwb25zZT86IFRSZXNwb25zZTtcclxuXHJcbiAgICBlcnJvcj86IHsgbWVzc2FnZTogc3RyaW5nIH07XHJcblxyXG4gICAgbWVzc2FnZUlkOiBzdHJpbmc7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUVycm9yIHtcclxuICAgIG1lc3NhZ2U6IHN0cmluZztcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFdvcmtlclJlcXVlc3RTZW5kZXI8VFR5cGUgZXh0ZW5kcyBXb3JrZXJEYXRhVHlwZSwgVFJlcXVlc3QsIFRSZXNwb25zZT4ge1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfZGljdGlvbmFyeToge1xyXG4gICAgICAgIFttZXNzYWdlaWQ6IHN0cmluZ106IHtcclxuICAgICAgICAgICAgcmVzb2x2ZT86IChyZXNwb25zZT86IFRSZXNwb25zZSkgPT4gdm9pZCxcclxuICAgICAgICAgICAgcmVqZWN0PzogKGVycm9yOiBJRXJyb3IpID0+IHZvaWRcclxuICAgICAgICB9XHJcbiAgICB9ID0geyB9O1xyXG5cclxuICAgIHByaXZhdGUgcmVhZG9ubHkgX2d1aWQgPSBHdWlkUHJvdmlkZXIuZGVmYXVsdDtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgdHlwZTogVFR5cGUsXHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBfc2VuZGVyOiBJV29ya2VyTWVzc2FnZVNlbmRlcixcclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IF9yZWNlaXZlcjogSVdvcmtlck1lc3NhZ2VSZWNlaXZlclxyXG4gICAgKSB7XHJcbiAgICAgICAgX3JlY2VpdmVyLmFkZEV2ZW50TGlzdGVuZXIodHlwZSwgdGhpcy5fcmVzcG9uc2UpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZW5kKGRhdGE/OiBUUmVxdWVzdCwgcmVzb2x2ZWQ/OiAocmVzcG9uc2U6IFRSZXNwb25zZSkgPT4gdm9pZCwgcmVqZWN0ZWQ/OiAoZXJyb3I6IElFcnJvcikgPT4gdm9pZCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IG1lc3NhZ2VJZCA9IHRoaXMuX2d1aWQubmV4dCgpO1xyXG5cclxuICAgICAgICB0aGlzLl9kaWN0aW9uYXJ5W21lc3NhZ2VJZF0gPSB7IHJlc29sdmU6IHJlc29sdmVkLCByZWplY3Q6IHJlamVjdGVkIH07XHJcblxyXG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IHRoaXMuX3NlbmRlci5wb3N0TWVzc2FnZSh7IHR5cGU6IHRoaXMudHlwZSwgbWVzc2FnZUlkLCByZXF1ZXN0OiBkYXRhIH0gYXMgSVJlcXVlc3RFbnZlbG9wPFRUeXBlLCBUUmVxdWVzdD4pO1xyXG4gICAgICAgIGlmIChyZXN1bHQgJiYgdHlwZW9mIHJlc3VsdC5jYXRjaCA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICByZXN1bHQuY2F0Y2gocmVqZWN0ZWQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZGlzcG9zZSgpIHtcclxuICAgICAgICB0aGlzLl9yZWNlaXZlci5yZW1vdmVFdmVudExpc3RlbmVyKHRoaXMudHlwZSwgdGhpcy5fcmVzcG9uc2UpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX3Jlc3BvbnNlID0gKGRhdGE6IElSZXNwb25zZUVudmVsb3A8VFR5cGUsIFRSZXNwb25zZT4pID0+IHtcclxuICAgICAgICBjb25zdCBtZXNzYWdlSWQgPSBkYXRhLm1lc3NhZ2VJZDtcclxuXHJcbiAgICAgICAgaWYgKG1lc3NhZ2VJZCkge1xyXG4gICAgICAgICAgICBjb25zdCBjYWxsYmFja3MgPSB0aGlzLl9kaWN0aW9uYXJ5W21lc3NhZ2VJZF07XHJcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLl9kaWN0aW9uYXJ5W21lc3NhZ2VJZF07XHJcblxyXG4gICAgICAgICAgICBpZiAoY2FsbGJhY2tzKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0YS5lcnJvcikge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgY2FsbGJhY2tzLnJlamVjdCA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFja3MucmVqZWN0KGRhdGEuZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBjYWxsYmFja3MucmVzb2x2ZSA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFja3MucmVzb2x2ZShkYXRhLnJlc3BvbnNlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL2lmZGVmLWxvYWRlci9pZmRlZi1sb2FkZXIuanM/REVCVUc9dHJ1ZSZQRVJGT1JNQU5DRV9BVURJVD10cnVlIS4vc3JjL3dvcmtlcnMvc2VuZGVycy93b3JrZXItcmVxdWVzdC1zZW5kZXIudHMiLCJpbXBvcnQgeyBJTG9nZ2VyIH0gZnJvbSAnLi4vLi4vbG9ncy9sb2dnZXInO1xyXG5pbXBvcnQgeyBJTGlzdGVuZXIsIElXb3JrZXJNZXNzYWdlLCBJV29ya2VyTWVzc2FnZVJlY2VpdmVyLCBNZXNzYWdlRXZlbnRMaXN0ZW5lciwgV29ya2VyRGF0YVR5cGUgfSBmcm9tICcuLi93b3JrZXItZGVmaW5pdGlvbnMnO1xyXG5cclxuLyoqXHJcbiAqIENsYXNzIGNvbnZlcnRzIGphdmFzY3JpcHQgbWVzc2FnZXMgd2l0aCBzdGFuZGFyZCBldmVudCAnbWVzc2FnZScgdG8gc3Ryb25nbHkgdHlwZWQgY3VzdG9tIG1lc3NhZ2VzXHJcbiAqXHJcbiAqIEBpbnRlcm5hbFxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIE1lc3NhZ2VSZWNlaXZlciBpbXBsZW1lbnRzIElXb3JrZXJNZXNzYWdlUmVjZWl2ZXIge1xyXG4gICAgcHJpdmF0ZSBfZGljOiB7IFt0eXBlOiBzdHJpbmddOiBBcnJheTxJTGlzdGVuZXI8YW55Pj4gfSA9IHsgfTtcclxuICAgIHByaXZhdGUgX2J1ZmZlcnM6IHsgW3R5cGU6IHN0cmluZ106IEFycmF5PE1lc3NhZ2VFdmVudD4gfSA9IHsgfTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IF9yZWNlaXZlcjoge1xyXG4gICAgICAgICAgICBhZGRFdmVudExpc3RlbmVyOiAodHlwZTogJ21lc3NhZ2UnLCBsaXN0ZW5lcjogTWVzc2FnZUV2ZW50TGlzdGVuZXIpID0+IHZvaWQsXHJcbiAgICAgICAgICAgIHJlbW92ZUV2ZW50TGlzdGVuZXI6ICh0eXBlOiAnbWVzc2FnZScsIGxpc3RlbmVyOiBNZXNzYWdlRXZlbnRMaXN0ZW5lcikgPT4gdm9pZFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBfbG9nZ2VyOiBJTG9nZ2VyXHJcbiAgICApIHtcclxuICAgICAgICBfcmVjZWl2ZXIuYWRkRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIHRoaXMuX2hhbmRsZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhZGRFdmVudExpc3RlbmVyPFRNZXNzYWdlIGV4dGVuZHMgSVdvcmtlck1lc3NhZ2U8V29ya2VyRGF0YVR5cGU+Pih0eXBlOiBzdHJpbmcsIGxpc3RlbmVyOiBJTGlzdGVuZXI8VE1lc3NhZ2U+KSB7XHJcbiAgICAgICAgY29uc3QgbGlzdGVuZXJzID0gdGhpcy5fZGljW3R5cGVdID0gdGhpcy5fZGljW3R5cGVdIHx8IFtdO1xyXG5cclxuICAgICAgICBsaXN0ZW5lcnMucHVzaChsaXN0ZW5lcik7XHJcblxyXG4gICAgICAgIHRoaXMuZmx1c2hCdWZmZXIodHlwZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlbW92ZUV2ZW50TGlzdGVuZXI8VE1lc3NhZ2UgZXh0ZW5kcyBJV29ya2VyTWVzc2FnZTxXb3JrZXJEYXRhVHlwZT4+KHR5cGU6IHN0cmluZywgbGlzdGVuZXI6IElMaXN0ZW5lcjxUTWVzc2FnZT4pIHtcclxuICAgICAgICBjb25zdCBsaXN0ZW5lcnMgPSB0aGlzLl9kaWNbdHlwZV07XHJcblxyXG4gICAgICAgIGlmIChsaXN0ZW5lcnMpIHtcclxuICAgICAgICAgICAgY29uc3QgaW5kZXggPSBsaXN0ZW5lcnMuaW5kZXhPZihsaXN0ZW5lcik7XHJcbiAgICAgICAgICAgIGlmIChpbmRleCA+PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBsaXN0ZW5lcnMuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGxpc3RlbmVycy5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgICAgIGRlbGV0ZSB0aGlzLl9kaWNbdHlwZV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGRpc3Bvc2UoKSB7XHJcbiAgICAgICAgdGhpcy5fZGljID0geyB9O1xyXG4gICAgICAgIHRoaXMuX2J1ZmZlcnMgPSB7IH07XHJcbiAgICAgICAgdGhpcy5fcmVjZWl2ZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIHRoaXMuX2hhbmRsZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZmx1c2hCdWZmZXIodHlwZTogc3RyaW5nKSB7XHJcbiAgICAgICAgY29uc3QgYnVmZmVyID0gdGhpcy5fYnVmZmVyc1t0eXBlXTtcclxuICAgICAgICBpZiAoYnVmZmVyICYmIGJ1ZmZlci5sZW5ndGggIT09IDApIHtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBsZW5ndGggPSBidWZmZXIubGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2hhbmRsZXIoYnVmZmVyW2ldKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJ1ZmZlci5sZW5ndGggPSAwO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfaGFuZGxlciA9IChldmVudDogTWVzc2FnZUV2ZW50KSA9PiB7XHJcbiAgICAgICAgY29uc3QgcmVxdWVzdCA9IGV2ZW50LmRhdGEgYXMgSVdvcmtlck1lc3NhZ2U8V29ya2VyRGF0YVR5cGU+O1xyXG5cclxuICAgICAgICBpZiAocmVxdWVzdCAmJiByZXF1ZXN0LnR5cGUpIHtcclxuICAgICAgICAgICAgY29uc3QgbGlzdGVuZXJzID0gdGhpcy5fZGljW3JlcXVlc3QudHlwZV07XHJcblxyXG4gICAgICAgICAgICBpZiAobGlzdGVuZXJzKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGxpc3RlbmVyIG9mIGxpc3RlbmVycykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpc3RlbmVyKHJlcXVlc3QpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2xvZ2dlci5lcnJvcihgRXJyb3Igb24gZXhlY3V0aW5nIGxpc3RlbmVyIGZvciBtZXNzYWdlIHR5cGUgJHtyZXF1ZXN0LnR5cGV9YCwgZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGJ1ZmZlciA9IHRoaXMuX2J1ZmZlcnNbcmVxdWVzdC50eXBlXSB8fCAodGhpcy5fYnVmZmVyc1tyZXF1ZXN0LnR5cGVdID0gW10pO1xyXG4gICAgICAgICAgICAgICAgYnVmZmVyLnB1c2goZXZlbnQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy9pZmRlZi1sb2FkZXIvaWZkZWYtbG9hZGVyLmpzP0RFQlVHPXRydWUmUEVSRk9STUFOQ0VfQVVESVQ9dHJ1ZSEuL3NyYy93b3JrZXJzL3NlbmRlcnMvbWVzc2FnZS1yZWNlaXZlci50cyIsImV4cG9ydCBpbnRlcmZhY2UgSVJlc3BvbnNlRW1pdHRlcjxUUmVxdWVzdCwgVFJlc3BvbnNlPiB7XHJcbiAgICBpbnZva2UocmVxdWVzdDogVFJlcXVlc3QpOiBUUmVzcG9uc2UgfCBQcm9taXNlPFRSZXNwb25zZT47XHJcblxyXG4gICAgc3RvcCgpOiB2b2lkO1xyXG59XHJcblxyXG5leHBvcnQgdHlwZSBJSGFuZGxlcjxUUmVxdWVzdCwgVFJlc3BvbnNlPiA9IChyZXF1ZXN0OiBUUmVxdWVzdCkgPT4gVFJlc3BvbnNlIHwgUHJvbWlzZTxUUmVzcG9uc2U+O1xyXG5cclxuLyoqXHJcbiAqIEhhbmRsZXIgZm9yIHRoaXMgZW1pdHRlciBpcyBvcHRpb25hbC5cclxuICogRGVmYXVsdCB2YWx1ZSB3aWxsIGJlIHJldHVybmVkIG9uIHVuZGVmaW5lZCBoYW5kbGVyLlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIE9wdGlvbmFsUmVzcG9uc2VFbWl0dGVyPFRSZXF1ZXN0LCBUUmVzcG9uc2U+IGltcGxlbWVudHMgSVJlc3BvbnNlRW1pdHRlcjxUUmVxdWVzdCwgVFJlc3BvbnNlPiB7XHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgZGVmOiBUUmVzcG9uc2UsXHJcbiAgICAgICAgcHVibGljIGhhbmRsZXI/OiBJSGFuZGxlcjxUUmVxdWVzdCwgVFJlc3BvbnNlPlxyXG4gICAgKSB7IH1cclxuXHJcbiAgICBwdWJsaWMgcmVhZG9ubHkgaW52b2tlID0gKHJlcXVlc3Q6IFRSZXF1ZXN0KTogVFJlc3BvbnNlIHwgUHJvbWlzZTxUUmVzcG9uc2U+ID0+IHtcclxuICAgICAgICBpZiAodGhpcy5oYW5kbGVyKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmhhbmRsZXIocmVxdWVzdCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLmRlZjtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RvcCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmhhbmRsZXIgPSB1bmRlZmluZWQ7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBIYW5kbGVyIGZvciB0aGlzIGVtaXR0ZXIgaXMgbWFuZGF0b3J5LlxyXG4gKiBBbGwgcmVxdWVzdHMgd2l0aG91dCBoYW5kbGVyIHdpbGwgYmUgYnVmZXJyZWQgYW5kIHBhc3NlZCB0byBhIG5ldyBoYW5kbGVyIG9uIGl0cyBzZXR0aW5nLlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIE1hbmRhdG9yeVJlc3BvbnNlRW1pdHRlcjxUUmVxdWVzdCwgVFJlc3BvbnNlPiBpbXBsZW1lbnRzIElSZXNwb25zZUVtaXR0ZXI8VFJlcXVlc3QsIFRSZXNwb25zZT4ge1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfYnVmZmVyID0gbmV3IEFycmF5PHsgcmVxdWVzdDogVFJlcXVlc3QsIHJlc29sdmU6IChyZXNwb25zZTogVFJlc3BvbnNlIHwgUHJvbWlzZUxpa2U8VFJlc3BvbnNlPikgPT4gdm9pZCB9PigpO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHByaXZhdGUgX2hhbmRsZXI/OiBJSGFuZGxlcjxUUmVxdWVzdCwgVFJlc3BvbnNlPlxyXG4gICAgKSB7IH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGhhbmRsZXIoKTogdW5kZWZpbmVkIHwgSUhhbmRsZXI8VFJlcXVlc3QsIFRSZXNwb25zZT4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9oYW5kbGVyO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHNldCBoYW5kbGVyKHZhbHVlOiB1bmRlZmluZWQgfCBJSGFuZGxlcjxUUmVxdWVzdCwgVFJlc3BvbnNlPikge1xyXG4gICAgICAgIHRoaXMuX2hhbmRsZXIgPSB2YWx1ZTtcclxuICAgICAgICB0aGlzLmZsdXNoQnVmZmVyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlYWRvbmx5IGludm9rZSA9IChyZXF1ZXN0OiBUUmVxdWVzdCk6IFRSZXNwb25zZSB8IFByb21pc2U8VFJlc3BvbnNlPiA9PiB7XHJcbiAgICAgICAgaWYgKHRoaXMuaGFuZGxlcikge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5oYW5kbGVyKHJlcXVlc3QpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLl9idWZmZXIucHVzaCh7IHJlcXVlc3QsIHJlc29sdmUgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0b3AoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5oYW5kbGVyID0gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZmx1c2hCdWZmZXIoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2hhbmRsZXIgJiYgdGhpcy5fYnVmZmVyLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgZm9yIChjb25zdCBkYXRhIG9mIHRoaXMuX2J1ZmZlcikge1xyXG4gICAgICAgICAgICAgICAgZGF0YS5yZXNvbHZlKHRoaXMuaW52b2tlKGRhdGEucmVxdWVzdCkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy9pZmRlZi1sb2FkZXIvaWZkZWYtbG9hZGVyLmpzP0RFQlVHPXRydWUmUEVSRk9STUFOQ0VfQVVESVQ9dHJ1ZSEuL3NyYy93b3JrZXJzL3NlbmRlcnMvcmVzcG9uc2UtZW1pdHRlci50cyIsImltcG9ydCB7IEV2ZW50RW1pdHRlciB9IGZyb20gJy4uLy4uL2ZyYW1ld29yay9ldmVudC1lbWl0dGVyJztcclxuaW1wb3J0IHsgSVdvcmtlck1lc3NhZ2UsIElXb3JrZXJNZXNzYWdlUmVjZWl2ZXIsIFdvcmtlckRhdGFUeXBlIH0gZnJvbSAnLi4vd29ya2VyLWRlZmluaXRpb25zJztcclxuXHJcbi8qKlxyXG4gKiBDbGFzcyB3cmFwcGVyIGZvciByZWNlaXZpbmcgbWVzc2FnZXMgYXMgdHlwZWQgZXZlbnRzXHJcbiAqXHJcbiAqIEBpbnRlcm5hbFxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFdvcmtlckV2ZW50UmVjZWl2ZXI8VFR5cGUgZXh0ZW5kcyBXb3JrZXJEYXRhVHlwZSwgVFdvcmtlck1lc3NhZ2UgZXh0ZW5kcyBJV29ya2VyTWVzc2FnZTxUVHlwZT4+IHtcclxuICAgIHB1YmxpYyByZWFkb25seSBldmVudDogRXZlbnRFbWl0dGVyPFRXb3JrZXJNZXNzYWdlPiA9IG5ldyBFdmVudEVtaXR0ZXI8VFdvcmtlck1lc3NhZ2U+KCk7XHJcblxyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IHR5cGU6IFRUeXBlLFxyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgX3JlY2VpdmVyOiBJV29ya2VyTWVzc2FnZVJlY2VpdmVyXHJcbiAgICApIHtcclxuICAgICAgICBfcmVjZWl2ZXIuYWRkRXZlbnRMaXN0ZW5lcih0eXBlLCB0aGlzLl9oYW5kbGVyKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZGlzcG9zZSgpIHtcclxuICAgICAgICB0aGlzLl9yZWNlaXZlci5yZW1vdmVFdmVudExpc3RlbmVyKHRoaXMudHlwZSwgdGhpcy5faGFuZGxlcik7XHJcbiAgICAgICAgdGhpcy5ldmVudC5jbGVhcigpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX2hhbmRsZXIgPSAoZGF0YTogVFdvcmtlck1lc3NhZ2UpID0+IHtcclxuICAgICAgICBpZiAoZGF0YS50eXBlID09PSB0aGlzLnR5cGUpIHtcclxuICAgICAgICAgICAgdGhpcy5ldmVudC5lbWl0KGRhdGEpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvaWZkZWYtbG9hZGVyL2lmZGVmLWxvYWRlci5qcz9ERUJVRz10cnVlJlBFUkZPUk1BTkNFX0FVRElUPXRydWUhLi9zcmMvd29ya2Vycy9zZW5kZXJzL3dvcmtlci1ldmVudC1yZWNlaXZlci50cyIsImltcG9ydCB7IElXb3JrZXJNZXNzYWdlLCBJV29ya2VyTWVzc2FnZVJlY2VpdmVyLCBJV29ya2VyTWVzc2FnZVNlbmRlciwgV29ya2VyRGF0YVR5cGUgfSBmcm9tICcuLi93b3JrZXItZGVmaW5pdGlvbnMnO1xyXG5pbXBvcnQgeyBJUmVzcG9uc2VFbWl0dGVyIH0gZnJvbSAnLi9yZXNwb25zZS1lbWl0dGVyJztcclxuaW1wb3J0IHsgSVJlc3BvbnNlRW52ZWxvcCB9IGZyb20gJy4vd29ya2VyLXJlcXVlc3Qtc2VuZGVyJztcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSVJlcXVlc3RFbnZlbG9wPFRUeXBlIGV4dGVuZHMgV29ya2VyRGF0YVR5cGUsIFRSZXF1ZXN0PiBleHRlbmRzIElXb3JrZXJNZXNzYWdlPFRUeXBlPiB7XHJcbiAgICByZXF1ZXN0OiBUUmVxdWVzdDtcclxuXHJcbiAgICBtZXNzYWdlSWQ6IHN0cmluZztcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFdvcmtlclJlcXVlc3RSZWNlaXZlcjxUVHlwZSBleHRlbmRzIFdvcmtlckRhdGFUeXBlLCBUUmVxdWVzdCwgVFJlc3BvbnNlPiB7XHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgdHlwZTogVFR5cGUsXHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBfc2VuZGVyOiBJV29ya2VyTWVzc2FnZVNlbmRlcixcclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IF9yZWNlaXZlcjogSVdvcmtlck1lc3NhZ2VSZWNlaXZlcixcclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IF9oYW5kbGVyOiBJUmVzcG9uc2VFbWl0dGVyPFRSZXF1ZXN0LCBUUmVzcG9uc2U+XHJcbiAgICApIHtcclxuICAgICAgICBfcmVjZWl2ZXIuYWRkRXZlbnRMaXN0ZW5lcih0eXBlLCB0aGlzLl9yZXNwb25zZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGRpc3Bvc2UoKSB7XHJcbiAgICAgICAgdGhpcy5fcmVjZWl2ZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcih0aGlzLnR5cGUsIHRoaXMuX3Jlc3BvbnNlKTtcclxuICAgICAgICB0aGlzLl9oYW5kbGVyLnN0b3AoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9yZXNwb25zZSA9IChkYXRhOiBJUmVxdWVzdEVudmVsb3A8VFR5cGUsIFRSZXF1ZXN0PikgPT4ge1xyXG4gICAgICAgIGNvbnN0IG1lc3NhZ2VJZCA9IGRhdGEubWVzc2FnZUlkO1xyXG4gICAgICAgIGNvbnN0IHR5cGUgPSBkYXRhLnR5cGU7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnR5cGUgPT09IHR5cGUpIHtcclxuICAgICAgICAgICAgaWYgKG1lc3NhZ2VJZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hd2FpdFJlc3BvbnNlKHR5cGUsIGRhdGEucmVxdWVzdCwgbWVzc2FnZUlkKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucmlzZUV2ZW50KHR5cGUsIGRhdGEucmVxdWVzdCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBhd2FpdFJlc3BvbnNlKHR5cGU6IFRUeXBlLCByZXF1ZXN0OiBUUmVxdWVzdCwgbWVzc2FnZUlkOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBzZW5kZXIgPSB0aGlzLl9zZW5kZXI7XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdChlcnJvcjogYW55KSB7XHJcbiAgICAgICAgICAgIGxldCBtZXNzYWdlID0gJyc7XHJcbiAgICAgICAgICAgIGlmIChlcnJvciAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBFcnJvcikge1xyXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2UgPSBlcnJvci5tZXNzYWdlO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlID0gZXJyb3IudG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzZW5kZXIucG9zdE1lc3NhZ2UoeyB0eXBlLCBtZXNzYWdlSWQsIGVycm9yOiB7IG1lc3NhZ2UgfSB9IGFzIElSZXNwb25zZUVudmVsb3A8VFR5cGUsIFRSZXNwb25zZT4pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmdW5jdGlvbiByZXNvbHZlKHJlc3BvbnNlOiBUUmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgc2VuZGVyLnBvc3RNZXNzYWdlKHsgdHlwZSwgbWVzc2FnZUlkLCByZXNwb25zZSB9IGFzIElSZXNwb25zZUVudmVsb3A8VFR5cGUsIFRSZXNwb25zZT4pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gdGhpcy5faGFuZGxlci5pbnZva2UocmVxdWVzdCk7XHJcblxyXG4gICAgICAgICAgICBpZiAodHlwZW9mIFByb21pc2UgIT09ICd1bmRlZmluZWQnICYmIHJlc3VsdCBpbnN0YW5jZW9mIFByb21pc2UpIHtcclxuICAgICAgICAgICAgICAgIHJlc3VsdC50aGVuKHJlc29sdmUsIHJlamVjdCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3VsdCBhcyBUUmVzcG9uc2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSByaXNlRXZlbnQodHlwZTogc3RyaW5nLCByZXF1ZXN0OiBUUmVxdWVzdCk6IHZvaWQge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2hhbmRsZXIuaW52b2tlKHJlcXVlc3QpO1xyXG4gICAgICAgIH0gY2F0Y2ggeyAvKiovIH1cclxuICAgIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvaWZkZWYtbG9hZGVyL2lmZGVmLWxvYWRlci5qcz9ERUJVRz10cnVlJlBFUkZPUk1BTkNFX0FVRElUPXRydWUhLi9zcmMvd29ya2Vycy9zZW5kZXJzL3dvcmtlci1yZXF1ZXN0LXJlY2VpdmVyLnRzIiwiaW1wb3J0IHsgSVNjcmlwdExvYWRlciwgU2NyaXB0TG9hZGVyIH0gZnJvbSAnLi4vZnJhbWV3b3JrL3NjcmlwdC1sb2FkZXInO1xyXG5pbXBvcnQgeyBJTWVzc2FnZUV2ZW50LCBJV29ya2VyR2xvYmFsU2NvcGUsIElXb3JrZXJMb2NhdGlvbiwgTWVzc2FnZUV2ZW50TGlzdGVuZXIgfSBmcm9tICcuL3dvcmtlci1kZWZpbml0aW9ucyc7XHJcblxyXG4vKipcclxuICogVmFyaWFibGUgbmFtZSB0byBwYXNzIFBzZXVkb1dvcmtlciBiZXR3ZWVuIG1haW4gY29kZSBhbmQgbG9hZGVkIGluIGEgV2ViV29ya2VyXHJcbiAqIEBpbnRlcm5hbFxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IFBzZXVkb1dvcmtlclNjb3BlTmFtZSA9ICdNZXNzYWdpbmdDbGllbnQtUHNldWRvV29ya2VyJztcclxuXHJcbi8qKlxyXG4gKiBFbXVsYXRvciBvZiBXZWIgV29ya2VyIGJlaGF2aW9yLiBSdW4gYWxsIHByb2NjZXNzIGluIHRoZSBtYWluIHdpbmRvdyBwcm9jZXNzLlxyXG4gKlxyXG4gKiBSZXF1aXJlZCBjb21wYXRpYmlsaXR5IHdpdGggSUU5IHdpdGhvdXQgcG9seWZpbGxzXHJcbiAqXHJcbiAqIEBpbnRlcm5hbFxyXG4gKiBAY2xhc3MgUHNldWRvV29ya2VyXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgUHNldWRvV29ya2VyIHtcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgX3BzZXVkb1dvcmtlcjogSW50ZXJuYWxQc2V1ZG9Xb3JrZXI7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9saXN0ZW5lcnM6IEFycmF5PE1lc3NhZ2VFdmVudExpc3RlbmVyPiA9IFtdO1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfYnVmZmVyOiBBcnJheTxJTWVzc2FnZUV2ZW50PiA9IFtdO1xyXG4gICAgcHJpdmF0ZSBfZ2xvYmFsOiBhbnkgPSB3aW5kb3c7XHJcblxyXG4gICAgcHVibGljIGdldCBwc2V1ZG9Xb3JrZXIoKSB7IHJldHVybiB0aGlzLl9wc2V1ZG9Xb3JrZXI7IH1cclxuXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwYXRoOiBzdHJpbmcsXHJcbiAgICAgICAgc2NyaXB0TG9hZGVyOiBJU2NyaXB0TG9hZGVyID0gbmV3IFNjcmlwdExvYWRlcigpXHJcbiAgICApIHtcclxuICAgICAgICB0aGlzLl9wc2V1ZG9Xb3JrZXIgPSB0aGlzLl9nbG9iYWxbUHNldWRvV29ya2VyU2NvcGVOYW1lXSA9XHJcbiAgICAgICAgICAgIG5ldyBJbnRlcm5hbFBzZXVkb1dvcmtlcihcclxuICAgICAgICAgICAgICAgIHBhdGgsXHJcbiAgICAgICAgICAgICAgICBzY3JpcHRMb2FkZXIsXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmFpc2VFdmVudDogKG1lc3NhZ2UpID0+IHRoaXMucmFpc2VFdmVudChtZXNzYWdlKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIHNjcmlwdExvYWRlci5sb2FkU2NyaXB0KHBhdGgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBwb3N0TWVzc2FnZShtZXNzYWdlOiBvYmplY3QpIHtcclxuICAgICAgICB0aGlzLl9wc2V1ZG9Xb3JrZXIucmFpc2VFdmVudCh7IGRhdGE6IG1lc3NhZ2UgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFkZEV2ZW50TGlzdGVuZXIoZXZlbnQ6ICdtZXNzYWdlJywgbGlzdGVuZXI6IE1lc3NhZ2VFdmVudExpc3RlbmVyKSB7XHJcbiAgICAgICAgaWYgKGV2ZW50ID09PSAnbWVzc2FnZScpIHtcclxuICAgICAgICAgICAgdGhpcy5fbGlzdGVuZXJzLnB1c2gobGlzdGVuZXIpO1xyXG5cclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fYnVmZmVyLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBidWZmZXIgPSB0aGlzLl9idWZmZXIuc2xpY2UoKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBsZW5ndGggPSBidWZmZXIubGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yYWlzZUV2ZW50KGJ1ZmZlcltpXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2J1ZmZlci5sZW5ndGggPSAwO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnQ6ICdtZXNzYWdlJywgbGlzdGVuZXI6IE1lc3NhZ2VFdmVudExpc3RlbmVyKSB7XHJcbiAgICAgICAgY29uc3QgaW5kZXggPSB0aGlzLl9saXN0ZW5lcnMuaW5kZXhPZihsaXN0ZW5lcik7XHJcbiAgICAgICAgaWYgKGluZGV4ID4gLTEpIHtcclxuICAgICAgICAgICAgdGhpcy5fbGlzdGVuZXJzLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB0ZXJtaW5hdGUoKSB7XHJcbiAgICAgICAgdGhpcy5fYnVmZmVyLmxlbmd0aCA9IDA7XHJcbiAgICAgICAgdGhpcy5fbGlzdGVuZXJzLmxlbmd0aCA9IDA7XHJcbiAgICAgICAgdGhpcy5fcHNldWRvV29ya2VyLmNsb3NlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSByYWlzZUV2ZW50KG1lc3NhZ2U6IElNZXNzYWdlRXZlbnQpIHtcclxuICAgICAgICBjb25zdCBsaXN0ZW5lcnMgPSB0aGlzLl9saXN0ZW5lcnM7XHJcbiAgICAgICAgY29uc3QgbGVuZ3RoID0gbGlzdGVuZXJzLmxlbmd0aDtcclxuICAgICAgICBpZiAobGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBsaXN0ZW5lciA9IGxpc3RlbmVyc1tpXTtcclxuICAgICAgICAgICAgICAgIGxpc3RlbmVyKG1lc3NhZ2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5fYnVmZmVyLnB1c2gobWVzc2FnZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG4vKipcclxuICogSW5zdGFuY2UgZm9yIGVtdWxhdGlvbmcgV29ya2VyIEVudmlyb25tZW50IGluc2lkZSBXZWJXb3JrZXIgY29kZVxyXG4gKlxyXG4gKiBAY2xhc3MgSW50ZXJuYWxQc2V1ZG9Xb3JrZXJcclxuICogQGltcGxlbWVudHMge0lXb3JrZXJHbG9iYWxTY29wZX1cclxuICovXHJcbmNsYXNzIEludGVybmFsUHNldWRvV29ya2VyIGltcGxlbWVudHMgSVdvcmtlckdsb2JhbFNjb3BlIHtcclxuICAgIHB1YmxpYyByZWFkb25seSBsb2NhdGlvbjogSVdvcmtlckxvY2F0aW9uO1xyXG5cclxuICAgIHByaXZhdGUgcmVhZG9ubHkgX2xpc3RlbmVyczogQXJyYXk8TWVzc2FnZUV2ZW50TGlzdGVuZXI+ID0gW107XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9idWZmZXI6IEFycmF5PElNZXNzYWdlRXZlbnQ+ID0gW107XHJcblxyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgbG9jYXRpb246IHN0cmluZyxcclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IF9zY3JpcHRMb2FkZXI6IElTY3JpcHRMb2FkZXIsXHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBfaW50ZXJuYWw6IElJbnRlcm5hbFdvcmtlckZ1bmN0aW9ucyxcclxuICAgICkge1xyXG4gICAgICAgIHRoaXMubG9jYXRpb24gPSBsb2NhdGlvbjtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcG9zdE1lc3NhZ2UobWVzc2FnZTogb2JqZWN0KTogdm9pZCB7XHJcbiAgICAgICAgbWVzc2FnZSA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkobWVzc2FnZSkpO1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLl9pbnRlcm5hbC5yYWlzZUV2ZW50KHsgZGF0YTogbWVzc2FnZSB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaW1wb3J0U2NyaXB0cyguLi5wYXRoczogQXJyYXk8c3RyaW5nPik6IGFueSB7XHJcbiAgICAgICAgbGV0IHJlc29sdmU6ICgpID0+IHZvaWQ7XHJcbiAgICAgICAgbGV0IHJlc29sdmVkOiBib29sZWFuO1xyXG5cclxuICAgICAgICBjb25zdCBsZW5ndGggPSBwYXRocy5sZW5ndGg7XHJcbiAgICAgICAgbGV0IHRvbG9hZCA9IHBhdGhzLmxlbmd0aDtcclxuICAgICAgICBjb25zdCBvbmxvYWQgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRvbG9hZC0tO1xyXG4gICAgICAgICAgICBpZiAodG9sb2FkIDw9IDApIHtcclxuICAgICAgICAgICAgICAgIHJlc29sdmVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGlmIChyZXNvbHZlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3NjcmlwdExvYWRlci5sb2FkU2NyaXB0KHBhdGhzW2ldLCBvbmxvYWQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgdGhlbjogKGNhbGxiYWNrOiAoKSA9PiB2b2lkKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAocmVzb2x2ZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjaygpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJlc29sdmUgPSBjYWxsYmFjaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFkZEV2ZW50TGlzdGVuZXIoZXZlbnQ6ICdtZXNzYWdlJyB8ICdjb25uZWN0JywgbGlzdGVuZXI6IE1lc3NhZ2VFdmVudExpc3RlbmVyKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKGV2ZW50ID09PSAnbWVzc2FnZScpIHtcclxuICAgICAgICAgICAgdGhpcy5fbGlzdGVuZXJzLnB1c2gobGlzdGVuZXIpO1xyXG5cclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fYnVmZmVyLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGJ1ZmZlciA9IHRoaXMuX2J1ZmZlci5zbGljZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGxlbmd0aCA9IGJ1ZmZlci5sZW5ndGg7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJhaXNlRXZlbnQoYnVmZmVyW2ldKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fYnVmZmVyLmxlbmd0aCA9IDA7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudDogJ21lc3NhZ2UnLCBsaXN0ZW5lcjogTWVzc2FnZUV2ZW50TGlzdGVuZXIpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBpbmRleCA9IHRoaXMuX2xpc3RlbmVycy5pbmRleE9mKGxpc3RlbmVyKTtcclxuICAgICAgICBpZiAoaW5kZXggPiAtMSkge1xyXG4gICAgICAgICAgICB0aGlzLl9saXN0ZW5lcnMuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJhaXNlRXZlbnQobWVzc2FnZTogSU1lc3NhZ2VFdmVudCkge1xyXG4gICAgICAgIGlmICghdGhpcy5fbGlzdGVuZXJzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICB0aGlzLl9idWZmZXIucHVzaChtZXNzYWdlKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjb25zdCBsZW5ndGggPSB0aGlzLl9saXN0ZW5lcnMubGVuZ3RoO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgbGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9saXN0ZW5lcnNbaW5kZXhdKG1lc3NhZ2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbG9zZSgpIHtcclxuICAgICAgICB0aGlzLl9idWZmZXIubGVuZ3RoID0gMDtcclxuICAgICAgICB0aGlzLl9saXN0ZW5lcnMubGVuZ3RoID0gMDtcclxuICAgIH1cclxufVxyXG5cclxuaW50ZXJmYWNlIElJbnRlcm5hbFdvcmtlckZ1bmN0aW9ucyB7XHJcbiAgICByYWlzZUV2ZW50KG1lc3NhZ2U6IElNZXNzYWdlRXZlbnQpOiB2b2lkO1xyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy9pZmRlZi1sb2FkZXIvaWZkZWYtbG9hZGVyLmpzP0RFQlVHPXRydWUmUEVSRk9STUFOQ0VfQVVESVQ9dHJ1ZSEuL3NyYy93b3JrZXJzL3BzZXVkby13b3JrZXIudHMiLCJpbXBvcnQgeyBHbG9iYWxQcm92aWRlciB9IGZyb20gJy4vZ2xvYmFsJztcclxuXHJcbi8qKlxyXG4gKiBMb2FkIHNjcmlwdCBmcm9tIGEgcGF0aFxyXG4gKlxyXG4gKiBAaW50ZXJuYWxcclxuICogQGludGVyZmFjZSBJU2NyaXB0TG9hZGVyXHJcbiAqL1xyXG5leHBvcnQgaW50ZXJmYWNlIElTY3JpcHRMb2FkZXIge1xyXG4gICAgbG9hZFNjcmlwdChwYXRoOiBzdHJpbmcsIG9ubG9hZD86ICgpID0+IHZvaWQpOiB2b2lkO1xyXG59XHJcblxyXG4vKipcclxuICogUG9seWZpbGwgZm9yIGxvYWRpbmcgc2NyaXB0IGluIERPTSBjb250ZXh0XHJcbiAqXHJcbiAqIEBpbnRlcm5hbFxyXG4gKiBAY2xhc3MgU2NyaXB0TG9hZGVyXHJcbiAqIEBpbXBsZW1lbnRzIHtJU2NyaXB0TG9hZGVyfVxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFNjcmlwdExvYWRlciBpbXBsZW1lbnRzIElTY3JpcHRMb2FkZXIge1xyXG4gICAgLyoqXHJcbiAgICAgKiBMb2FkIHNjcmlwdCBmcm9tIHBhdGggZW5kIGV4ZWN1dGUgaXRcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gcGF0aCB7c3RyaW5nfSAtIFBhdGggdG8gdGhlIHNjcmlwdFxyXG4gICAgICogQHBhcmFtIG9ubG9hZCB7KCkgPT4gdm9pZH0gLSBDYWxsYmFjayBleGVjdXRlZCBhZnRlciB0aGUgc2NyaXB0IGxvYWRzXHJcbiAgICAgKiBAbWVtYmVyb2YgU2NyaXB0TG9hZGVyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyByZWFkb25seSBsb2FkU2NyaXB0OiAocGF0aDogc3RyaW5nLCBvbmxvYWQ/OiAoKSA9PiB2b2lkKSA9PiB2b2lkO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIF9nbG9iYWwgPSBHbG9iYWxQcm92aWRlci5jdXJyZW50KClcclxuICAgICkge1xyXG4gICAgICAgIGlmICh0eXBlb2YgKF9nbG9iYWwgYXMgV2luZG93KS5kb2N1bWVudCAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAgICAgdGhpcy5sb2FkU2NyaXB0ID0gKHBhdGgsIG9ubG9hZCkgPT4gU2NyaXB0TG9hZGVyLmxvYWRWaWFEb20oKF9nbG9iYWwgYXMgV2luZG93KS5kb2N1bWVudCwgcGF0aCwgb25sb2FkKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vIERPTSBlbnZpcm9ubWVudCBpcyBub3Qgc3VwcG9ydGVkLicpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTptZW1iZXItb3JkZXJpbmdcclxuICAgIHByaXZhdGUgc3RhdGljIGxvYWRWaWFEb20oZG9jdW1lbnQ6IERvY3VtZW50LCBwYXRoOiBzdHJpbmcsIG9ubG9hZD86ICgpID0+IHZvaWQpIHtcclxuICAgICAgICBjb25zdCBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcclxuICAgICAgICBzY3JpcHQudHlwZSA9ICd0ZXh0L2phdmFzY3JpcHQnO1xyXG4gICAgICAgIHNjcmlwdC5zcmMgPSBwYXRoO1xyXG4gICAgICAgIGlmIChvbmxvYWQpIHtcclxuICAgICAgICAgICAgc2NyaXB0Lm9ubG9hZCA9IG9ubG9hZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgKGRvY3VtZW50LmJvZHkgfHwgZG9jdW1lbnQuaGVhZCkuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcclxuICAgIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvaWZkZWYtbG9hZGVyL2lmZGVmLWxvYWRlci5qcz9ERUJVRz10cnVlJlBFUkZPUk1BTkNFX0FVRElUPXRydWUhLi9zcmMvZnJhbWV3b3JrL3NjcmlwdC1sb2FkZXIudHMiLCJpbXBvcnQgeyBHbG9iYWxQcm92aWRlciB9IGZyb20gJy4vZnJhbWV3b3JrL2dsb2JhbCc7XHJcbmltcG9ydCB7IElNZXNzYWdpbmdDbGllbnRMaXRlRGF0YSB9IGZyb20gJy4vbGl0ZS1kYXRhJztcclxuXHJcbmNvbnN0IG5hbWU6ICdNZXNzYWdpbmdDbGllbnQtTGl0ZURhdGEnID0gJ01lc3NhZ2luZ0NsaWVudC1MaXRlRGF0YSc7XHJcblxyXG4vKipcclxuICogQGludGVybmFsXHJcbiAqL1xyXG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tbmFtZXNwYWNlXHJcbmRlY2xhcmUgZ2xvYmFsIHtcclxuICAgIGludGVyZmFjZSBXaW5kb3cge1xyXG4gICAgICAgICdNZXNzYWdpbmdDbGllbnQtTGl0ZURhdGEnOiBJTWVzc2FnaW5nQ2xpZW50TGl0ZURhdGE7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBIZWxwZXIgZm9yIHN0b3JyaW5nIGRhdGEgaW4gZ2xvYmFsIHZhcmlhYmxlXHJcbiAqXHJcbiAqIEBpbnRlcm5hbFxyXG4gKi9cclxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIExpdGVEYXRhQ29udGFpbmVyIHtcclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0KCk6IElNZXNzYWdpbmdDbGllbnRMaXRlRGF0YSB7XHJcbiAgICAgICAgY29uc3Qgcm9vdCA9IChHbG9iYWxQcm92aWRlci5jdXJyZW50KCkgYXMgV2luZG93KTtcclxuICAgICAgICByZXR1cm4gcm9vdFtuYW1lXSB8fCAocm9vdFtuYW1lXSA9IHt9KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGNsZWFyKCk6IHZvaWQge1xyXG4gICAgICAgIGRlbGV0ZSAoR2xvYmFsUHJvdmlkZXIuY3VycmVudCgpIGFzIFdpbmRvdylbbmFtZV07XHJcbiAgICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL2lmZGVmLWxvYWRlci9pZmRlZi1sb2FkZXIuanM/REVCVUc9dHJ1ZSZQRVJGT1JNQU5DRV9BVURJVD10cnVlIS4vc3JjL2xpdGUtZGF0YS1jb250YWluZXIudHMiLCJpbXBvcnQgeyBJTWVzc2FnZSwgTWVzc2FnZVR5cGUgfSBmcm9tICcuL2RlZmluaXRpb25zL21lc3NhZ2UnO1xyXG5pbXBvcnQgeyBJTWVzc2FnaW5nQ2xpZW50IH0gZnJvbSAnLi9kZWZpbml0aW9ucy9tZXNzYWdpbmctY2xpZW50JztcclxuaW1wb3J0IHsgSVNlbmRpbmdPcHRpb25zIH0gZnJvbSAnLi9kZWZpbml0aW9ucy9zZW5kaW5nLW9wdGlvbnMnO1xyXG5pbXBvcnQgeyBJVGltZVN0YW1wUHJvdmlkZXIgfSBmcm9tICcuL2ZyYW1ld29yay90aW1lc3RhbXAnO1xyXG5pbXBvcnQgeyBleHRlbmQgfSBmcm9tICcuL2ZyYW1ld29yay91dGlscy9leHRlbmQnO1xyXG5pbXBvcnQgeyBJTWVzc2FnZVNlbmRlciB9IGZyb20gJy4vbWVzc2FnZS1zZW5kZXInO1xyXG5cclxuLyoqXHJcbiAqIFNoYXJlZCB1c2VyIEFQSSBpbXBsZW1lbnRhdGlvbiBmb3IgbGl0ZSBhbmQgZnVsbCB2ZXJzaW9ucy5cclxuICpcclxuICogSW5zdGFuY2Ugb2YgdGhpcyBjbGFzcyBpcyBwcm92aWRlZCB0byB1c2VyIGFuZCBpc24ndCBjaGFuZ2VkLlxyXG4gKlxyXG4gKiBAaW50ZXJuYWxcclxuICogQGNsYXNzIE1lc3NhZ2luZ0NsaWVudFxyXG4gKiBAaW1wbGVtZW50cyB7SU1lc3NhZ2luZ0NsaWVudH1cclxuICovXHJcbmV4cG9ydCBjbGFzcyBNZXNzYWdpbmdDbGllbnRJbnN0YW5jZSBpbXBsZW1lbnRzIElNZXNzYWdpbmdDbGllbnQge1xyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogU2VuZGVyIGluc3RhbmNlIHRoYXQgd2lsbCBiZSByZXBsYWNlZCBhZnRlciBmdWxsIHZlcnNpb24gbG9hZGluZ1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHB1YmxpYyBzZW5kZXI6IElNZXNzYWdlU2VuZGVyLFxyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgX3RpbWU6IElUaW1lU3RhbXBQcm92aWRlclxyXG4gICAgKSB7IH1cclxuXHJcbiAgICBwdWJsaWMgY3JlYXRlPFRNZXNzYWdlIGV4dGVuZHMgSU1lc3NhZ2U+KG1lc3NhZ2VUeXBlOiBNZXNzYWdlVHlwZSwgcGF5bG9hZD86IFRNZXNzYWdlKTogVE1lc3NhZ2Uge1xyXG4gICAgICAgIGNvbnN0IG1lc3NhZ2UgPSB7IF9tZXRhOiB7IHR5cGU6IG1lc3NhZ2VUeXBlIH0gfSBhcyBUTWVzc2FnZTtcclxuICAgICAgICBpZiAocGF5bG9hZCkge1xyXG4gICAgICAgICAgICBleHRlbmQobWVzc2FnZSwgcGF5bG9hZCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBtZXNzYWdlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZW5kPFRNZXNzYWdlIGV4dGVuZHMgSU1lc3NhZ2U+KG1lc3NhZ2U6IFRNZXNzYWdlLCBvcHRpb25zPzogSVNlbmRpbmdPcHRpb25zKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKCFtZXNzYWdlIHx8ICFtZXNzYWdlLl9tZXRhKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTWVzc2FnZSBvciBtZXNzYWdlIHR5cGUgaXMgdW5kZWZpbmVkJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBtZXNzYWdlLl9tZXRhLnRpbWVzdGFtcCA9IHRoaXMuX3RpbWUubm93KCk7XHJcbiAgICAgICAgbWVzc2FnZSA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkobWVzc2FnZSkpO1xyXG4gICAgICAgIHRoaXMuc2VuZGVyLnNlbmQobWVzc2FnZSwgb3B0aW9ucyk7XHJcbiAgICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL2lmZGVmLWxvYWRlci9pZmRlZi1sb2FkZXIuanM/REVCVUc9dHJ1ZSZQRVJGT1JNQU5DRV9BVURJVD10cnVlIS4vc3JjL21lc3NhZ2luZy1jbGllbnQtaW5zdGFuY2UudHMiLCJpbXBvcnQgeyBlbmRzV2l0aCwgbWFwUGF0aCB9IGZyb20gJy4vc3RyaW5ncyc7XHJcblxyXG4vKipcclxuICogVGhlIGNsYXNzIGNvbnRhaW5zIHV0aWxpdGllcyBmb3IgU2VydmljZVdvcmtlclxyXG4gKi9cclxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFNlcnZpY2VXb3JrZXJVdGlscyB7XHJcbiAgICAvKipcclxuICAgICAqIENoZWNrIHN1cHBvcnRpbmcgU2VydmljZVdvcmtlciBBUEkgaW4gdGhlIGN1cnJlbnQgZW52aXJvbm1lbnRcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBpc1N1cHBvcnRlZCgpIHtcclxuICAgICAgICByZXR1cm4gdHlwZW9mIG5hdmlnYXRvciAhPT0gJ3VuZGVmaW5lZCdcclxuICAgICAgICAgICAgICAgJiYgJ3NlcnZpY2VXb3JrZXInIGluIG5hdmlnYXRvcjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlZ2lzdGVyIGEgbmV3IFNlcnZpY2VXb3JrZXIgaW5zdGFuY2UgYW5kIHdhaXQgaXRzIGFjdGl2YXRpb25cclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBhY3RpdmF0ZShwYXRoOiBzdHJpbmcsIHNjb3BlOiBzdHJpbmcsIGF0dGVtcHRzOiBudW1iZXIgPSAzKTogUHJvbWlzZTxJU2VydmljZVdvcmtlclJlZ2lzdHJhdGlvbkRhdGE+IHtcclxuICAgICAgICBsZXQgY291bnRlciA9IDA7XHJcbiAgICAgICAgcmV0dXJuIChuYXZpZ2F0b3IgYXMgTmF2aWdhdG9yKS5zZXJ2aWNlV29ya2VyLnJlZ2lzdGVyKHBhdGgsIHsgc2NvcGUgfSkudGhlbigocmVnaXN0cmF0aW9uKSA9PiB7XHJcbiAgICAgICAgICAgIGNvdW50ZXIrKztcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHNlcnZpY2VXb3JrZXIgPSByZWdpc3RyYXRpb24uYWN0aXZlIHx8IHJlZ2lzdHJhdGlvbi5pbnN0YWxsaW5nIHx8IHJlZ2lzdHJhdGlvbi53YWl0aW5nO1xyXG4gICAgICAgICAgICBpZiAoc2VydmljZVdvcmtlciAmJiBzZXJ2aWNlV29ya2VyLnN0YXRlID09PSAnYWN0aXZhdGVkJykge1xyXG4gICAgICAgICAgICAgICAgaWYgKGVuZHNXaXRoKHNlcnZpY2VXb3JrZXIuc2NyaXB0VVJMLCBwYXRoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7IHJlZ2lzdHJhdGlvbiwgc2VydmljZVdvcmtlciB9O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoc2VydmljZVdvcmtlcikge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlPElTZXJ2aWNlV29ya2VyUmVnaXN0cmF0aW9uRGF0YT4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uIHF1aWV0KGFjdGlvbjogKCkgPT4gdm9pZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAoc2VydmljZVdvcmtlciBhcyBhbnkpLm9uc3RhdGVjaGFuZ2UgPSAoc2VydmljZVdvcmtlciBhcyBhbnkpLm9uZXJyb3IgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgc2VydmljZVdvcmtlci5vbnN0YXRlY2hhbmdlID0gKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzZXJ2aWNlV29ya2VyLnN0YXRlID09PSAnYWN0aXZhdGVkJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcXVpZXQoKCkgPT4gcmVzb2x2ZSh7IHJlZ2lzdHJhdGlvbiwgc2VydmljZVdvcmtlciB9KSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNlcnZpY2VXb3JrZXIuc3RhdGUgPT09ICdyZWR1bmRhbnQnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjb3VudGVyIDwgYXR0ZW1wdHMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBxdWlldCgoKSA9PiByZXNvbHZlKFNlcnZpY2VXb3JrZXJVdGlscy5hY3RpdmF0ZShwYXRoLCBzY29wZSkpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcXVpZXQoKCkgPT4gcmVqZWN0KCdSZWdpc3RyYXRpb24gd2FzIGZhaWxlZCB3aXRoIG1heGltdW0gYXR0ZW1wdHMgZXhjZWVkcy4nKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBzZXJ2aWNlV29ya2VyLm9uZXJyb3IgPSAoZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cclxuICAgICAgICAgICAgICAgICAgICAgICAgcXVpZXQoKCkgPT4gcmVqZWN0KGV2ZW50LnRhcmdldCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KCdTZXJ2aWNlV29ya2VyIGZhaWxlZCB0aGUgcmVnaXN0cmF0aW9uLicpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyBhYnNvbHV0ZSBwYXRoIGZvciBwYXNzaW5nIGFzIHNjb3BlIHRvIGEgU2VydmljZVdvcmtlciBpbnN0YW5jZS5cclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBhYnNvbHV0ZVNjb3BlKHBhdGg6IHN0cmluZywgcmVsYXRpdmVTY29wZTogc3RyaW5nKSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBsb2NhdGlvbiAhPT0gJ3VuZGVmaW5lZCcgJiYgbG9jYXRpb24gJiYgbG9jYXRpb24ucGF0aG5hbWUpIHtcclxuICAgICAgICAgICAgcGF0aCA9IG1hcFBhdGgobG9jYXRpb24ucGF0aG5hbWUsIHBhdGgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbWFwUGF0aChwYXRoLCByZWxhdGl2ZVNjb3BlKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJU2VydmljZVdvcmtlclJlZ2lzdHJhdGlvbkRhdGEge1xyXG4gICAgcmVnaXN0cmF0aW9uOiBTZXJ2aWNlV29ya2VyUmVnaXN0cmF0aW9uO1xyXG5cclxuICAgIHNlcnZpY2VXb3JrZXI6IFNlcnZpY2VXb3JrZXI7XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL2lmZGVmLWxvYWRlci9pZmRlZi1sb2FkZXIuanM/REVCVUc9dHJ1ZSZQRVJGT1JNQU5DRV9BVURJVD10cnVlIS4vc3JjL2ZyYW1ld29yay9zZXJ2aWNlLXdvcmtlci11dGlscy50cyIsImltcG9ydCB7IEVudmlyb25tZW50RGF0YSB9IGZyb20gJy4vY29uZmlndXJhdGlvbnMvZGVmYXVsdHMvZW52aXJvbm1lbnQnO1xyXG5pbXBvcnQgeyBJVGVzdEVudmlyb25tZW50IH0gZnJvbSAnLi9jb25maWd1cmF0aW9ucy90ZXN0LWVudmlyb25tZW50JztcclxuaW1wb3J0IHsgSUVudmlyb25tZW50Q29uZmlndXJhdGlvbiB9IGZyb20gJy4vZGVmaW5pdGlvbnMnO1xyXG5pbXBvcnQgeyBJTWVzc2FnaW5nQ2xpZW50IH0gZnJvbSAnLi9kZWZpbml0aW9ucy9tZXNzYWdpbmctY2xpZW50JztcclxuaW1wb3J0IHsgb3ZlcnJpZGUgfSBmcm9tICcuL2ZyYW1ld29yay9pbmRleCc7XHJcbmltcG9ydCB7IFRpbWVTdGFtcFByb3ZpZGVyIH0gZnJvbSAnLi9mcmFtZXdvcmsvdGltZXN0YW1wJztcclxuaW1wb3J0IHsgSU1lc3NhZ2luZ0NsaWVudExpdGVEYXRhIH0gZnJvbSAnLi9saXRlLWRhdGEnO1xyXG5pbXBvcnQgeyBMaXRlRGF0YUNvbnRhaW5lciB9IGZyb20gJy4vbGl0ZS1kYXRhLWNvbnRhaW5lcic7XHJcbmltcG9ydCB7IENvbnNvbGVMb2dnZXIgfSBmcm9tICcuL2xvZ3MvY29uc29sZS1sb2dnZXInO1xyXG5pbXBvcnQgeyBFdmVudExvZ2dlciB9IGZyb20gJy4vbG9ncy9ldmVudC1sb2dnZXInO1xyXG5pbXBvcnQgeyBVbml2ZXJzYWxMb2dnZXIgfSBmcm9tICcuL2xvZ3MvdW5pdmVyc2FsLWxvZ2dlcic7XHJcbmltcG9ydCB7IE1lc3NhZ2VTZW5kZXJGdWxsIH0gZnJvbSAnLi9tZXNzYWdlLXNlbmRlci1mdWxsJztcclxuaW1wb3J0IHsgTWVzc2FnaW5nQ2xpZW50SW5zdGFuY2UgfSBmcm9tICcuL21lc3NhZ2luZy1jbGllbnQtaW5zdGFuY2UnO1xyXG5cclxuLyoqXHJcbiAqIENvbnN0cnVjdG9yIG9mIGEgTWVzc2FnaW5nQ2xpZW50IGluc3RhbmNlIGluIGZ1bGwgbW9kZS5cclxuICpcclxuICogRW50cnkgcG9pbnQgZm9yIGJ1aWxkaW5nIGJ1bmRsZSBmaWxlIGZvciBmdWxsIHZlcnNpb24uXHJcbiAqXHJcbiAqIEBleHBvcnRcclxuICogQGNsYXNzIE1lc3NhZ2luZ0NsaWVudFxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIE1lc3NhZ2luZ0NsaWVudCB7XHJcbiAgICAvKipcclxuICAgICAqIEBpbnRlcm5hbFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGVudmlyb25tZW50KHRlc3Q6IElUZXN0RW52aXJvbm1lbnQpOiBNZXNzYWdpbmdDbGllbnQge1xyXG4gICAgICAgIHJldHVybiBuZXcgTWVzc2FnaW5nQ2xpZW50KHRlc3QpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlIGEgbmV3IGluc3RhbmNlIG9mIE1lc3NhZ2luZ0NsaWVudC5cclxuICAgICAqIEl0IGNhbiBiZSBjYWxsZWQgb25seSBvbmNlIGF0IHRoZSBzYW1lIHBhZ2UuXHJcbiAgICAgKlxyXG4gICAgICogRGVwcmljYXRlZCBtZXRob2QuIFNob3VsZCBiZSBkZWxldGVkIGluIHRoZSBuZXh0IG1ham9yIHZlcnNpb24uXHJcbiAgICAgKlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHtJRW52aXJvbm1lbnRDb25maWd1cmF0aW9ufSBlbnZpcm9ubWVudCAtIENvbmZpZ3VyYXRpb24gb2YgZW52aXJvbm1lbnRcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBjcmVhdGUoXHJcbiAgICAgICAgZW52aXJvbm1lbnQ6IElFbnZpcm9ubWVudENvbmZpZ3VyYXRpb25cclxuICAgICk6IElNZXNzYWdpbmdDbGllbnQge1xyXG4gICAgICAgIGlmIChlbnZpcm9ubWVudC5tb2RlICE9PSAncHJvZHVjdGlvbicpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ01ldGhvZCBNZXNzYWdpbmdDbGllbnQuY3JlYXRlKCkgaXMgZGVwcmljYXRlZC4gUGxlYXNlIHVzZSBNZXNzYWdpbmdDbGllbnQuaW5zdGFudGlhdGUoKSBtZXRob2QgaW5zdGVhZC4nKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIE1lc3NhZ2luZ0NsaWVudC5pbnN0YW50aWF0ZShlbnZpcm9ubWVudCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBJbnN0YW50aWF0ZSBvZiBNZXNzYWdpbmdDbGllbnQuXHJcbiAgICAgKiBXaXRoIGNvbmZpZ3VyYXRpb24gaXQgY2FuIGJlIGNhbGxlZCBvbmx5IG9uY2UgYXQgdGhlIHNhbWUgcGFnZS5cclxuICAgICAqIFdpdGhvdXQgY29uZmlndXJhdGlvbiBpdCBjYW4gYmUgY2FsbGVkIG1hbnkgdGltZXMsIGJ1dCByZXR1cm5zIHRoZSBzYW1lIG9iamVjdC5cclxuICAgICAqXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0ge0lFbnZpcm9ubWVudENvbmZpZ3VyYXRpb259IGVudmlyb25tZW50IC0gQ29uZmlndXJhdGlvbiBvZiBlbnZpcm9ubWVudFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGluc3RhbnRpYXRlKFxyXG4gICAgICAgIGVudmlyb25tZW50PzogSUVudmlyb25tZW50Q29uZmlndXJhdGlvblxyXG4gICAgKTogSU1lc3NhZ2luZ0NsaWVudCB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBNZXNzYWdpbmdDbGllbnQoKS5pbnN0YW50aWF0ZShlbnZpcm9ubWVudCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZWluc3RhbnRpYXRlIG9mIE1lc3NhZ2luZ0NsaWVudCBmcm9tIGxpdGUgdmVyc2lvbi5cclxuICAgICAqXHJcbiAgICAgKiBDYWxsZWQgYXQgdGhlIGVuZCBvZiB0aGlzIGZpbGVcclxuICAgICAqXHJcbiAgICAgKiBAaW50ZXJuYWxcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7SUVudmlyb25tZW50Q29uZmlndXJhdGlvbn0gZW52aXJvbm1lbnQgLSBDb25maWd1cmF0aW9uIG9mIGVudmlyb25tZW50XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgcmVpbnN0YW50aWF0ZShcclxuICAgICAgICBlbnZpcm9ubWVudD86IElFbnZpcm9ubWVudENvbmZpZ3VyYXRpb25cclxuICAgICk6IHZvaWQge1xyXG4gICAgICAgIGlmIChMaXRlRGF0YUNvbnRhaW5lci5nZXQoKS5tZXNzYWdpbmdDbGllbnQpIHtcclxuICAgICAgICAgICAgbmV3IE1lc3NhZ2luZ0NsaWVudCgpLmluc3RhbnRpYXRlKGVudmlyb25tZW50KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBGb3JnZXQgYWJvdXQgYWxsIGluc3RhbmNlc1xyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIHRlcm1pbmF0ZShjYWxsYmFjaz86ICgpID0+IHZvaWQpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBkYXRhID0gTGl0ZURhdGFDb250YWluZXIuZ2V0KCk7XHJcblxyXG4gICAgICAgIGlmIChkYXRhLm1lc3NhZ2luZ0NsaWVudCkge1xyXG4gICAgICAgICAgICBkYXRhLm1lc3NhZ2luZ0NsaWVudC5zZW5kZXIuZGlzcG9zZShjYWxsYmFjayk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKGNhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgICAgICBjYWxsYmFjaygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBMaXRlRGF0YUNvbnRhaW5lci5jbGVhcigpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIGluaXRpYWxpemUoZGF0YTogSU1lc3NhZ2luZ0NsaWVudExpdGVEYXRhKTogTWVzc2FnaW5nQ2xpZW50SW5zdGFuY2Uge1xyXG4gICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xyXG4gICAgICAgIGlmICghZGF0YS5lbnZpcm9ubWVudCkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Vudmlyb25tZW50IHBhcmFtZXRlciBpcyBzdHJvbmdseSByZXF1aXJlZC4nKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHNlbmRlciA9IE1lc3NhZ2luZ0NsaWVudC5zZW5kZXIoZGF0YS5lbnZpcm9ubWVudCwgZGF0YS50ZXN0KTtcclxuXHJcbiAgICAgICAgbGV0IG1lc3NhZ2luZ0NsaWVudCA9IGRhdGEubWVzc2FnaW5nQ2xpZW50O1xyXG5cclxuICAgICAgICBpZiAobWVzc2FnaW5nQ2xpZW50KSB7XHJcbiAgICAgICAgICAgIG1lc3NhZ2luZ0NsaWVudC5zZW5kZXIgPSBzZW5kZXI7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbWVzc2FnaW5nQ2xpZW50ID0gbmV3IE1lc3NhZ2luZ0NsaWVudEluc3RhbmNlKHNlbmRlciwgbmV3IFRpbWVTdGFtcFByb3ZpZGVyKCkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgTWVzc2FnaW5nQ2xpZW50LnNlbmRCdWZmZXJlZERhdGEoZGF0YSwgc2VuZGVyKTtcclxuXHJcbiAgICAgICAgZGF0YS5pc0Z1bGxWZXJzaW9uID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgcmV0dXJuIG1lc3NhZ2luZ0NsaWVudDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBpbnRlcm5hbFxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IF90ZXN0RW52aXJvbm1lbnQ/OiBJVGVzdEVudmlyb25tZW50XHJcbiAgICApIHsgfVxyXG5cclxuICAgIHB1YmxpYyBpbnN0YW50aWF0ZShlbnZpcm9ubWVudD86IElFbnZpcm9ubWVudENvbmZpZ3VyYXRpb24pOiBJTWVzc2FnaW5nQ2xpZW50IHtcclxuICAgICAgICBjb25zdCBkYXRhID0gTGl0ZURhdGFDb250YWluZXIuZ2V0KCk7XHJcblxyXG4gICAgICAgIGlmIChkYXRhLmVudmlyb25tZW50ICYmIGVudmlyb25tZW50KSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQ29uZmlndXJhdGlvbiBvZiBNZXNzYWdpbmdDbGllbnRKUyBpcyBhbHJlYWR5IHNldC4gUGxlYXNlIHByb3ZpZGUgY29uZmlndXJhdGlvbiBvbmx5IG9uY2UuJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoZGF0YS5tZXNzYWdpbmdDbGllbnRcclxuICAgICAgICAgICAgJiYgZGF0YS5pc0Z1bGxWZXJzaW9uXHJcbiAgICAgICAgKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBkYXRhLm1lc3NhZ2luZ0NsaWVudDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGRhdGEuZW52aXJvbm1lbnQgPSBkYXRhLmVudmlyb25tZW50IHx8IGVudmlyb25tZW50O1xyXG5cclxuICAgICAgICBpZiAoZGF0YS5lbnZpcm9ubWVudCkge1xyXG4gICAgICAgICAgICBkYXRhLnRlc3QgPSBkYXRhLnRlc3QgfHwgdGhpcy5fdGVzdEVudmlyb25tZW50O1xyXG4gICAgICAgICAgICBkYXRhLm1lc3NhZ2luZ0NsaWVudCA9IE1lc3NhZ2luZ0NsaWVudC5pbml0aWFsaXplKGRhdGEpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGRhdGEubWVzc2FnaW5nQ2xpZW50KSB7XHJcbiAgICAgICAgICAgIHJldHVybiBkYXRhLm1lc3NhZ2luZ0NsaWVudDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignTGl0ZSB2ZXJzaW9uIG9mIE1lc3NhZ2luZ0NsaWVudEpTIHdhcyBub3QgbG9hZGVkLiBQbGVhc2UgcHJvdmlkZSBhIGNvbmZpZ3VyYXRpb24gdG8gaW5zdGFudGlhdGUgYSBmdWxsIHZlcnNpb24uJyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm1lbWJlci1vcmRlcmluZ1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgbG9nZ2VyKHRlc3Q6IElUZXN0RW52aXJvbm1lbnQgfCB1bmRlZmluZWQsIGVudmlyb25tZW50OiBJRW52aXJvbm1lbnRDb25maWd1cmF0aW9uKSB7XHJcbiAgICAgICAgY29uc3QgbG9nZ2VyID0gbmV3IFVuaXZlcnNhbExvZ2dlcihbXHJcbiAgICAgICAgICAgIG5ldyBDb25zb2xlTG9nZ2VyKCB7IG11dGU6ICFlbnZpcm9ubWVudC5kZWJ1ZyB9IClcclxuICAgICAgICBdKTtcclxuXHJcbiAgICAgICAgaWYgKHRlc3QgJiYgdGVzdC5saXN0ZW5lcnMgJiYgdGVzdC5saXN0ZW5lcnMubG9nKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGV2ZW50TG9nZ2VyID0gbmV3IEV2ZW50TG9nZ2VyKCk7XHJcbiAgICAgICAgICAgIGV2ZW50TG9nZ2VyLm9ubG9nLnN1YnNjcmliZSh0ZXN0Lmxpc3RlbmVycy5sb2cpO1xyXG4gICAgICAgICAgICBsb2dnZXIubG9nZ2Vycy5wdXNoKGV2ZW50TG9nZ2VyKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGxvZ2dlcjtcclxuICAgIH1cclxuXHJcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bWVtYmVyLW9yZGVyaW5nXHJcbiAgICBwcml2YXRlIHN0YXRpYyBzZW5kZXIoZW52aXJvbm1lbnQ6IElFbnZpcm9ubWVudENvbmZpZ3VyYXRpb24sIHRlc3Q/OiBJVGVzdEVudmlyb25tZW50KTogTWVzc2FnZVNlbmRlckZ1bGwge1xyXG4gICAgICAgIGNvbnN0IGVudmlyb25tZW50RGF0YSA9IG5ldyBFbnZpcm9ubWVudERhdGEoKTtcclxuXHJcbiAgICAgICAgb3ZlcnJpZGUoZW52aXJvbm1lbnREYXRhLCBlbnZpcm9ubWVudCk7XHJcblxyXG4gICAgICAgIGVudmlyb25tZW50RGF0YS52YWxpZGF0ZSgpO1xyXG5cclxuICAgICAgICBjb25zdCBsb2dnZXIgPSBNZXNzYWdpbmdDbGllbnQubG9nZ2VyKHRlc3QsIGVudmlyb25tZW50KTtcclxuXHJcbiAgICAgICAgY29uc3Qgc2VuZGVyID0gbmV3IE1lc3NhZ2VTZW5kZXJGdWxsKGVudmlyb25tZW50RGF0YSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9nZ2VyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXN0ID8gdGVzdC5jb25maWd1cmF0aW9uIDogbnVsbCk7XHJcblxyXG4gICAgICAgIGlmICh0ZXN0ICYmIHRlc3QubGlzdGVuZXJzKSB7XHJcbiAgICAgICAgICAgIGlmICh0ZXN0Lmxpc3RlbmVycy5hamF4KSB7XHJcbiAgICAgICAgICAgICAgICBzZW5kZXIuYWpheC5oYW5kbGVyID0gKG9wdGlvbnMpID0+ICgodGVzdC5saXN0ZW5lcnMgJiYgdGVzdC5saXN0ZW5lcnMuYWpheCAmJiB0ZXN0Lmxpc3RlbmVycy5hamF4KG9wdGlvbnMpKSB8fCAnJyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHNlbmRlci5wZXJmb3JtYW5jZS5zdWJzY3JpYmUoKHBlcmZvcm1hbmNlKSA9PiB0ZXN0Lmxpc3RlbmVycyAmJiB0ZXN0Lmxpc3RlbmVycy5wZXJmb3JtYW5jZSAmJiB0ZXN0Lmxpc3RlbmVycy5wZXJmb3JtYW5jZShwZXJmb3JtYW5jZSkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHNlbmRlcjtcclxuICAgIH1cclxuXHJcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bWVtYmVyLW9yZGVyaW5nXHJcbiAgICBwcml2YXRlIHN0YXRpYyBzZW5kQnVmZmVyZWREYXRhKGRhdGE6IElNZXNzYWdpbmdDbGllbnRMaXRlRGF0YSwgc2VuZGVyOiBNZXNzYWdlU2VuZGVyRnVsbCkge1xyXG4gICAgICAgIGlmIChkYXRhLmJ1ZmZlcikge1xyXG4gICAgICAgICAgICBzZW5kZXIuc2VuZChkYXRhLmJ1ZmZlci5pdGVtcyk7XHJcbiAgICAgICAgICAgIGRhdGEuYnVmZmVyLml0ZW1zLmxlbmd0aCA9IDA7XHJcbiAgICAgICAgICAgIGRhdGEuYnVmZmVyID0gdW5kZWZpbmVkO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuLy8gVHJ5IGluc3RhbnRpYXRlIGEgZnVsbCB2ZXJzaW9uIGZyb20gY29uZmlndXJhdGlvblxyXG5NZXNzYWdpbmdDbGllbnQucmVpbnN0YW50aWF0ZSgpO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvaWZkZWYtbG9hZGVyL2lmZGVmLWxvYWRlci5qcz9ERUJVRz10cnVlJlBFUkZPUk1BTkNFX0FVRElUPXRydWUhLi9zcmMvbWVzc2FnaW5nLWNsaWVudC1mdWxsLnRzIiwiaW1wb3J0IHsgRW52aXJvbm1lbnRNb2RlIH0gZnJvbSAnLi4vLi4vZGVmaW5pdGlvbnMvZW52aXJvbm1lbnQnO1xyXG5pbXBvcnQgeyBJRW52aXJvbm1lbnREYXRhIH0gZnJvbSAnLi4vZW52aXJvbm1lbnQnO1xyXG5cclxuLyoqXHJcbiAqIERlZmF1bHQgdmFsdWVzIG9mIEVudmlyb25tZW50RGF0YVxyXG4gKlxyXG4gKiBAaW50ZXJuYWxcclxuICogQGNsYXNzIEVudmlyb25tZW50RGF0YVxyXG4gKiBAaW1wbGVtZW50cyB7SUVudmlyb25tZW50RGF0YX1cclxuICovXHJcbmV4cG9ydCBjbGFzcyBFbnZpcm9ubWVudERhdGEgaW1wbGVtZW50cyBJRW52aXJvbm1lbnREYXRhIHtcclxuICAgIHB1YmxpYyB3b3JrZXJVcmwgPSAnJztcclxuXHJcbiAgICBwdWJsaWMgcG9seWZpbGxzVXJsID0gJy9tZXNzYWdpbmctY2xpZW50LXBvbHlmaWxscy5qcyc7XHJcblxyXG4gICAgcHVibGljIGFwaUtleSA9ICcnO1xyXG5cclxuICAgIHB1YmxpYyBmb3JjZVBvbHlmaWxscyA9IGZhbHNlO1xyXG5cclxuICAgIHB1YmxpYyBmYWtlTW9kZSA9IGZhbHNlO1xyXG5cclxuICAgIHB1YmxpYyBkZWJ1ZyA9IGZhbHNlO1xyXG5cclxuICAgIHB1YmxpYyBtb2RlOiBFbnZpcm9ubWVudE1vZGUgPSAncHJvZHVjdGlvbic7XHJcblxyXG4gICAgcHVibGljIHBlcmZvcm1hbmNlQXVkaXQgPSBmYWxzZTtcclxuXHJcbiAgICBwdWJsaWMgdmFsaWRhdGUoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmFwaUtleSkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0FwaUtleSBpcyByZXF1aXJlZCBidXQgbm90IGRlZmluZWQgb3IgZW1wdHkuJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghdGhpcy53b3JrZXJVcmwpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdXb3JrZXJVcmwgaXMgcmVxdWlyZWQgYnV0IG5vdCBkZWZpbmVkIG9yIGVtcHR5LicpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvaWZkZWYtbG9hZGVyL2lmZGVmLWxvYWRlci5qcz9ERUJVRz10cnVlJlBFUkZPUk1BTkNFX0FVRElUPXRydWUhLi9zcmMvY29uZmlndXJhdGlvbnMvZGVmYXVsdHMvZW52aXJvbm1lbnQudHMiLCJpbXBvcnQgeyBJQ29uZmlndXJhdGlvbiwgSUVudmlyb25tZW50RGF0YSB9IGZyb20gJy4vY29uZmlndXJhdGlvbnMnO1xyXG5pbXBvcnQgeyBjb25maWd1cmF0aW9uIGFzIHByZWRlZmluZWRDb25maWd1cmF0aW9uIH0gZnJvbSAnLi9jb25maWd1cmF0aW9ucy9kZWZhdWx0cy9jb25maWd1cmF0aW9uJztcclxuaW1wb3J0IHsgSU1lc3NhZ2UgfSBmcm9tICcuL2RlZmluaXRpb25zJztcclxuaW1wb3J0IHsgSVNlbmRpbmdPcHRpb25zIH0gZnJvbSAnLi9kZWZpbml0aW9ucy9zZW5kaW5nLW9wdGlvbnMnO1xyXG5pbXBvcnQgeyBCdWZmZXJDYWxsIH0gZnJvbSAnLi9mcmFtZXdvcmsvYnVmZmVyLWNhbGwnO1xyXG5pbXBvcnQgeyBJTG9nZ2VyIH0gZnJvbSAnLi9sb2dzJztcclxuaW1wb3J0IHsgTWFpblJlY2VpdmVyTG9nZ2VyIH0gZnJvbSAnLi9sb2dzL21haW4tcmVjZWl2ZXItbG9nZ2VyJztcclxuaW1wb3J0IHsgSU1lc3NhZ2VTZW5kZXIgfSBmcm9tICcuL21lc3NhZ2Utc2VuZGVyJztcclxuaW1wb3J0IHsgTWFpblJlY2VpdmVyIH0gZnJvbSAnLi93b3JrZXJzL21haW4tcmVjZWl2ZXInO1xyXG5pbXBvcnQgeyBXb3JrZXJSZXF1ZXN0U2VuZGVyIH0gZnJvbSAnLi93b3JrZXJzL3NlbmRlcnMvd29ya2VyLXJlcXVlc3Qtc2VuZGVyJztcclxuaW1wb3J0IHsgSUNvbmZpZ3VyYXRpb25Xb3JrZXJNZXNzYWdlLCBJTWVzc2FnZXNXb3JrZXJNZXNzYWdlLCBJV29ya2VySW5zdGFuY2UgfSBmcm9tICcuL3dvcmtlcnMvd29ya2VyLWRlZmluaXRpb25zJztcclxuaW1wb3J0IHsgV29ya2VyUHJvdmlkZXIgfSBmcm9tICcuL3dvcmtlcnMvd29ya2VyLXByb3ZpZGVyJztcclxuXHJcbi8qKlxyXG4gKiBNZXNzYWdlIHNlbmRlciBpbXBsZW1lbnRhdGlvbiBmb3IgZnVsbCBtb2RlXHJcbiAqXHJcbiAqIEBpbnRlcm5hbFxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIE1lc3NhZ2VTZW5kZXJGdWxsIGltcGxlbWVudHMgSU1lc3NhZ2VTZW5kZXIge1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfd29ya2VyOiBJV29ya2VySW5zdGFuY2U7XHJcblxyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfcmVjZWl2ZXI6IE1haW5SZWNlaXZlcjtcclxuXHJcbiAgICBwdWJsaWMgZ2V0IGFqYXgoKSB7IHJldHVybiB0aGlzLl9yZWNlaXZlci5hamF4OyB9XHJcblxyXG4gICAgcHVibGljIGdldCBwZXJmb3JtYW5jZSgpIHsgcmV0dXJuIHRoaXMuX3JlY2VpdmVyLnBlcmZvcm1hbmNlOyB9XHJcblxyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfdGVybWluYXRlQ29tbWFuZDogV29ya2VyUmVxdWVzdFNlbmRlcjwndGVybWluYXRlJywgdW5kZWZpbmVkLCB2b2lkPjtcclxuXHJcbiAgICBwcml2YXRlIF9kaXNwb3NlZCA9IGZhbHNlO1xyXG5cclxuICAgIHByaXZhdGUgcmVhZG9ubHkgX3NlbmRNZXNzYWdlczogQnVmZmVyQ2FsbDxJTWVzc2FnZT47XHJcblxyXG4gICAgcHJpdmF0ZSBfcGluZ0ludGVydmFsSWQ6IGFueTtcclxuXHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9jb25maWd1cmF0aW9uOiBJQ29uZmlndXJhdGlvbldvcmtlck1lc3NhZ2U7XHJcblxyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgZW52aXJvbm1lbnQ6IElFbnZpcm9ubWVudERhdGEsXHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBfbG9nZ2VyOiBJTG9nZ2VyLFxyXG4gICAgICAgIGNvbmZpZ3VyYXRpb246IElDb25maWd1cmF0aW9uIHwgbnVsbCA9IG51bGxcclxuICAgICkge1xyXG4gICAgICAgIGNvbmZpZ3VyYXRpb24gPSBjb25maWd1cmF0aW9uIHx8IHByZWRlZmluZWRDb25maWd1cmF0aW9uKGVudmlyb25tZW50Lm1vZGUpO1xyXG4gICAgICAgIGNvbnN0IHdvcmtlclByb3ZpZGVyID0gbmV3IFdvcmtlclByb3ZpZGVyKGVudmlyb25tZW50LndvcmtlclVybCwgY29uZmlndXJhdGlvbi53b3JrZXJzIHx8IFtdLCBfbG9nZ2VyKTtcclxuXHJcbiAgICAgICAgY29uc3Qgd29ya2VyID0gdGhpcy5fd29ya2VyID0gd29ya2VyUHJvdmlkZXIubmV3KCk7XHJcblxyXG4gICAgICAgIHRoaXMuX3JlY2VpdmVyID0gbmV3IE1haW5SZWNlaXZlcih3b3JrZXIsIF9sb2dnZXIpO1xyXG4gICAgICAgIHRoaXMuX3Rlcm1pbmF0ZUNvbW1hbmQgPSBuZXcgV29ya2VyUmVxdWVzdFNlbmRlcigndGVybWluYXRlJywgd29ya2VyLCB0aGlzLl9yZWNlaXZlci5yZWNlaXZlcik7XHJcblxyXG4gICAgICAgIE1haW5SZWNlaXZlckxvZ2dlci5sb2codGhpcy5fcmVjZWl2ZXIsIHRoaXMuX2xvZ2dlcik7XHJcblxyXG4gICAgICAgIHRoaXMuX2NvbmZpZ3VyYXRpb24gPSB7IHR5cGU6ICdjb25maWd1cmF0aW9uJywgY29uZmlndXJhdGlvbiwgZW52aXJvbm1lbnQgfTtcclxuXHJcbiAgICAgICAgLy8gSW5pdGlhbGl6ZSB3b3JrZXIgYnkgY29uZmlndXJhdGlvblxyXG4gICAgICAgIHdvcmtlci5wb3N0TWVzc2FnZSh0aGlzLl9jb25maWd1cmF0aW9uKTtcclxuXHJcbiAgICAgICAgdGhpcy5fc2VuZE1lc3NhZ2VzID0gbmV3IEJ1ZmZlckNhbGw8SU1lc3NhZ2U+KChtZXNzYWdlcykgPT4ge1xyXG4gICAgICAgICAgICB3b3JrZXIucG9zdE1lc3NhZ2UoeyB0eXBlOiAnbWVzc2FnZXMnLCBtZXNzYWdlcyB9IGFzIElNZXNzYWdlc1dvcmtlck1lc3NhZ2UpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLnBpbmcoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2VuZChtZXNzYWdlOiBJTWVzc2FnZSB8IEFycmF5PElNZXNzYWdlPiwgb3B0aW9ucz86IElTZW5kaW5nT3B0aW9ucyk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX3NlbmRNZXNzYWdlcy5jYWxsKG1lc3NhZ2UsIG9wdGlvbnMgJiYgb3B0aW9ucy5zeW5jKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZGlzcG9zZShjYWxsYmFjaz86ICgpID0+IHZvaWQpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCByZXNvbHZlID0gY2FsbGJhY2sgfHwgKCgpID0+IHsgLyoqLyB9KTtcclxuXHJcbiAgICAgICAgaWYgKCF0aGlzLl9kaXNwb3NlZCkge1xyXG4gICAgICAgICAgICB0aGlzLl9kaXNwb3NlZCA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5fcGluZ0ludGVydmFsSWQpIHtcclxuICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5fcGluZ0ludGVydmFsSWQpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjb25zdCB3b3JrZXIgPSB0aGlzLl93b3JrZXI7XHJcbiAgICAgICAgICAgIGNvbnN0IGhhbmRsZXIgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3NlbmRNZXNzYWdlcy5jbGVhcigpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3JlY2VpdmVyLmRpc3Bvc2UoKTtcclxuICAgICAgICAgICAgICAgIH0gZmluYWxseSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gd29ya2VyLnRlcm1pbmF0ZSgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0ICYmIHR5cGVvZiByZXN1bHQudGhlbiA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQudGhlbigoKSA9PiByZXNvbHZlKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHRoaXMuX3Rlcm1pbmF0ZUNvbW1hbmQuc2VuZCh1bmRlZmluZWQsIGhhbmRsZXIsIGhhbmRsZXIpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJlc29sdmUoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBwaW5nKCkge1xyXG4gICAgICAgIHRoaXMuX3BpbmdJbnRlcnZhbElkID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLl93b3JrZXIucG9zdE1lc3NhZ2UodGhpcy5fY29uZmlndXJhdGlvbik7XHJcbiAgICAgICAgfSwgNTAwMCk7XHJcbiAgICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL2lmZGVmLWxvYWRlci9pZmRlZi1sb2FkZXIuanM/REVCVUc9dHJ1ZSZQRVJGT1JNQU5DRV9BVURJVD10cnVlIS4vc3JjL21lc3NhZ2Utc2VuZGVyLWZ1bGwudHMiLCIvLyB0c2xpbnQ6ZGlzYWJsZTpxdW90ZW1hcmtcclxuaW1wb3J0IHsgRW52aXJvbm1lbnRNb2RlIH0gZnJvbSBcIi4uLy4uL2RlZmluaXRpb25zXCI7XHJcbmltcG9ydCB7IElDb25maWd1cmF0aW9uLCBJRkVBbmFseXRpY0NvbGxlY3RvckVuZHBvaW50Q29uZmlnIH0gZnJvbSAnLi4vY29uZmlndXJhdGlvbic7XHJcblxyXG4vKipcclxuICogQGludGVybmFsXHJcbiAqL1xyXG5leHBvcnQgY29uc3QgY29uZmlndXJhdGlvbiA9IChtb2RlOiBFbnZpcm9ubWVudE1vZGUpOiBJQ29uZmlndXJhdGlvbiA9PiB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIC8vIHdvcmtlcnM6IFsnZW11bGF0ZWQnXSxcclxuICAgICAgICBlbmRwb2ludHM6IFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdHlwZTogXCJmZS1hbmFseXRpYy1jb2xsZWN0b3JcIixcclxuICAgICAgICAgICAgICAgIHVybDogbW9kZSA9PT0gJ3Byb2R1Y3Rpb24nID8gXCJodHRwczovL2FuYWx5dGljcy5hZ29kYS5jb21cIiA6IFwiLy9oa2ctZ2Mtc3RhZ2luZy5hZ29kYS5sb2NhbFwiLFxyXG4gICAgICAgICAgICAgICAgdGltZW91dDogNjAwMDAsXHJcbiAgICAgICAgICAgICAgICBxdWV1ZXM6IFtcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBcImRlZmF1bHRcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmx1c2hUaW1lOiAxMDAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXhGbHVzaFRpbWU6IDMwMDAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBiYXRjaFNpemU6IDUwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXhNZXNzYWdlQ291bnQ6IDE1MDAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwZXJzaXN0ZW50OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhdHRlbXB0Q291bnQ6IDIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbGxUaHJlc2hvbGQ6IDAuNlxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgfSBhcyBJRkVBbmFseXRpY0NvbGxlY3RvckVuZHBvaW50Q29uZmlnXHJcbiAgICAgICAgXVxyXG4gICAgfTtcclxufTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL2lmZGVmLWxvYWRlci9pZmRlZi1sb2FkZXIuanM/REVCVUc9dHJ1ZSZQRVJGT1JNQU5DRV9BVURJVD10cnVlIS4vc3JjL2NvbmZpZ3VyYXRpb25zL2RlZmF1bHRzL2NvbmZpZ3VyYXRpb24udHMiLCJpbXBvcnQgeyBVbmxvYWRFdmVudCB9IGZyb20gJy4vdW5sb2FkLWV2ZW50JztcclxuXHJcbi8qKlxyXG4gKiBDYWxsIGZ1bmN0aW9uIGF0IHRoZSBlbmQgb2YgdGhlIGN1cnJlbnQgSlMgZXhlY3V0aW9uIGZsb3cgd2l0aCBjb25jYXRlbmRhdGVkIGFycmF5XHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgQnVmZmVyQ2FsbDxUPiB7XHJcbiAgICBwcml2YXRlIF9idWZmZXIgPSBuZXcgQXJyYXk8VD4oKTtcclxuICAgIHByaXZhdGUgdGltZW91dElkOiBhbnk7XHJcblxyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBfYWN0aW9uOiAoYnVmZmVyOiBBcnJheTxUPikgPT4gdm9pZFxyXG4gICAgKSB7IH1cclxuXHJcbiAgICBwdWJsaWMgY2FsbCh2YWx1ZTogVCB8IEFycmF5PFQ+LCBzeW5jOiBib29sZWFuID0gZmFsc2UpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9idWZmZXIucHVzaCguLi52YWx1ZSk7XHJcblxyXG4gICAgICAgIGlmIChzeW5jKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZmx1c2goKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMudGltZW91dElkKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRpbWVvdXRJZCA9IHNldFRpbWVvdXQodGhpcy5mbHVzaCk7XHJcbiAgICAgICAgICAgICAgICBVbmxvYWRFdmVudC5hZGRMaXN0ZW5lcih0aGlzLmZsdXNoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xlYXIoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fYnVmZmVyID0gbmV3IEFycmF5PFQ+KCk7XHJcbiAgICAgICAgaWYgKHRoaXMudGltZW91dElkKSB7XHJcbiAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aGlzLnRpbWVvdXRJZCk7XHJcbiAgICAgICAgICAgIHRoaXMudGltZW91dElkID0gdW5kZWZpbmVkO1xyXG4gICAgICAgIH1cclxuICAgICAgICBVbmxvYWRFdmVudC5yZW1vdmVMaXN0ZW5lcih0aGlzLmZsdXNoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGZsdXNoID0gKCkgPT4ge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9idWZmZXIubGVuZ3RoICE9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9hY3Rpb24odGhpcy5fYnVmZmVyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZmluYWxseSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2xlYXIoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL2lmZGVmLWxvYWRlci9pZmRlZi1sb2FkZXIuanM/REVCVUc9dHJ1ZSZQRVJGT1JNQU5DRV9BVURJVD10cnVlIS4vc3JjL2ZyYW1ld29yay9idWZmZXItY2FsbC50cyIsImltcG9ydCB7IE1haW5SZWNlaXZlciB9IGZyb20gJy4uL3dvcmtlcnMvbWFpbi1yZWNlaXZlcic7XHJcbmltcG9ydCB7IElMb2dnZXIgfSBmcm9tICcuL2xvZ2dlcic7XHJcbmltcG9ydCB7IElXb3JrZXJMb2cgfSBmcm9tICcuL3dvcmtlci1sb2cnO1xyXG5cclxuLyoqXHJcbiAqIEVtaXQgbG9ncyBmcm9tIE1haW5SZWNlaXZlclxyXG4gKlxyXG4gKiBAaW50ZXJuYWxcclxuICovXHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBNYWluUmVjZWl2ZXJMb2dnZXIge1xyXG4gICAgcHVibGljIHN0YXRpYyBsb2cocmVjZWl2ZXI6IE1haW5SZWNlaXZlciwgbG9nZ2VyOiBJTG9nZ2VyKSB7XHJcbiAgICAgICAgcmVjZWl2ZXIubG9nLnN1YnNjcmliZSgobG9nKSA9PiBNYWluUmVjZWl2ZXJMb2dnZXIucHJpbnRMb2cobG9nZ2VyLCBsb2cpKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBwcmludExvZyhsb2dnZXI6IElMb2dnZXIsIGxvZzogSVdvcmtlckxvZykge1xyXG4gICAgICAgIHN3aXRjaCAobG9nLmxldmVsKSB7XHJcbiAgICAgICAgICAgIGNhc2UgJ2xvZyc6IGxvZ2dlci5sb2cobG9nLm1lc3NhZ2UpOyBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnZXJyb3InOiBsb2dnZXIuZXJyb3IobG9nLm1lc3NhZ2UpOyBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnZmF0YWwnOiBsb2dnZXIuZmF0YWwobG9nLm1lc3NhZ2UpOyBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDogbG9nZ2VyLmxvZyhsb2cubWVzc2FnZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy9pZmRlZi1sb2FkZXIvaWZkZWYtbG9hZGVyLmpzP0RFQlVHPXRydWUmUEVSRk9STUFOQ0VfQVVESVQ9dHJ1ZSEuL3NyYy9sb2dzL21haW4tcmVjZWl2ZXItbG9nZ2VyLnRzIiwiaW1wb3J0IHsgSUFqYXhPcHRpb25zIH0gZnJvbSAnLi4vZnJhbWV3b3JrL2FqYXgtZGVmaW5pdGlvbnMnO1xyXG5pbXBvcnQgeyBFdmVudEVtaXR0ZXIgfSBmcm9tICcuLi9mcmFtZXdvcmsvZXZlbnQtZW1pdHRlcic7XHJcbmltcG9ydCB7IElMb2dnZXIgfSBmcm9tICcuLi9sb2dzL2xvZ2dlcic7XHJcbmltcG9ydCB7IElXb3JrZXJMb2cgfSBmcm9tICcuLi9sb2dzL3dvcmtlci1sb2cnO1xyXG5pbXBvcnQgeyBJUGVyZm9ybWFuY2VSZXBvcnQgfSBmcm9tICcuLi9wcm9jZXNzaW5nL2F1ZGl0L2RlZmluaXRpb25zJztcclxuaW1wb3J0IHsgTWVzc2FnZVJlY2VpdmVyIH0gZnJvbSAnLi9zZW5kZXJzL21lc3NhZ2UtcmVjZWl2ZXInO1xyXG5pbXBvcnQgeyBPcHRpb25hbFJlc3BvbnNlRW1pdHRlciB9IGZyb20gJy4vc2VuZGVycy9yZXNwb25zZS1lbWl0dGVyJztcclxuaW1wb3J0IHsgV29ya2VyRXZlbnRSZWNlaXZlciB9IGZyb20gJy4vc2VuZGVycy93b3JrZXItZXZlbnQtcmVjZWl2ZXInO1xyXG5pbXBvcnQgeyBXb3JrZXJSZXF1ZXN0UmVjZWl2ZXIgfSBmcm9tICcuL3NlbmRlcnMvd29ya2VyLXJlcXVlc3QtcmVjZWl2ZXInO1xyXG5pbXBvcnQgeyBJTG9nV29ya2VyTWVzc2FnZSwgSVBlcmZvcm1hbmNlV29ya2VyTWVzc2FnZSwgSVdvcmtlckluc3RhbmNlIH0gZnJvbSAnLi93b3JrZXItZGVmaW5pdGlvbnMnO1xyXG5cclxuLyoqXHJcbiAqIENsYXNzIHRvIHJlY2VpdmUgZXZlbnRzIGZyb20gV2ViV29ya2VyXHJcbiAqXHJcbiAqIEBpbnRlcm5hbFxyXG4gKiBAY2xhc3MgTWFpblJlY2VpdmVyXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgTWFpblJlY2VpdmVyIHtcclxuICAgIHB1YmxpYyByZWFkb25seSByZWNlaXZlcjogTWVzc2FnZVJlY2VpdmVyO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVjZWl2ZWQgbmV3IGFqYXggcmVxdWVzdFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcmVhZG9ubHkgYWpheCA9IG5ldyBPcHRpb25hbFJlc3BvbnNlRW1pdHRlcjxJQWpheE9wdGlvbnMsIHN0cmluZz4oJ3t9Jyk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZWNlaXZlZCBuZXcgbG9nc1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcmVhZG9ubHkgbG9nOiBFdmVudEVtaXR0ZXI8SVdvcmtlckxvZz47XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZWNlaXZlZCBuZXcgcGVyZm9tYW5jZSByZXBvcnRcclxuICAgICAqL1xyXG4gICAgcHVibGljIHJlYWRvbmx5IHBlcmZvcm1hbmNlOiBFdmVudEVtaXR0ZXI8SVBlcmZvcm1hbmNlUmVwb3J0PjtcclxuXHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9hamF4OiBXb3JrZXJSZXF1ZXN0UmVjZWl2ZXI8J2FqYXgnLCBJQWpheE9wdGlvbnMsIHN0cmluZz47XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9sb2c6IFdvcmtlckV2ZW50UmVjZWl2ZXI8J2xvZycsIElMb2dXb3JrZXJNZXNzYWdlPjtcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgX3BlcmZvcm1hbmNlOiBXb3JrZXJFdmVudFJlY2VpdmVyPCdwZXJmb3JtYW5jZScsIElQZXJmb3JtYW5jZVdvcmtlck1lc3NhZ2U+O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHdvcmtlcjogSVdvcmtlckluc3RhbmNlLFxyXG4gICAgICAgIGxvZ2dlcjogSUxvZ2dlcixcclxuICAgICkge1xyXG4gICAgICAgIHRoaXMucmVjZWl2ZXIgPSBuZXcgTWVzc2FnZVJlY2VpdmVyKHdvcmtlciwgbG9nZ2VyKTtcclxuXHJcbiAgICAgICAgdGhpcy5fYWpheCA9IG5ldyBXb3JrZXJSZXF1ZXN0UmVjZWl2ZXIoJ2FqYXgnLCB3b3JrZXIsIHRoaXMucmVjZWl2ZXIsIHRoaXMuYWpheCk7XHJcblxyXG4gICAgICAgIHRoaXMuX2xvZyA9IG5ldyBXb3JrZXJFdmVudFJlY2VpdmVyKCdsb2cnLCB0aGlzLnJlY2VpdmVyKTtcclxuXHJcbiAgICAgICAgdGhpcy5fcGVyZm9ybWFuY2UgPSBuZXcgV29ya2VyRXZlbnRSZWNlaXZlcigncGVyZm9ybWFuY2UnLCB0aGlzLnJlY2VpdmVyKTtcclxuXHJcbiAgICAgICAgdGhpcy5sb2cgPSB0aGlzLl9sb2cuZXZlbnQubWFwKChkYXRhKSA9PiBkYXRhLmxvZyk7XHJcblxyXG4gICAgICAgIHRoaXMucGVyZm9ybWFuY2UgPSB0aGlzLl9wZXJmb3JtYW5jZS5ldmVudC5tYXAoKGRhdGEpID0+IGRhdGEucmVwb3J0KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZGlzcG9zZSgpIHtcclxuICAgICAgICB0aGlzLl9hamF4LmRpc3Bvc2UoKTtcclxuICAgICAgICB0aGlzLl9sb2cuZGlzcG9zZSgpO1xyXG4gICAgICAgIHRoaXMuX3BlcmZvcm1hbmNlLmRpc3Bvc2UoKTtcclxuICAgIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvaWZkZWYtbG9hZGVyL2lmZGVmLWxvYWRlci5qcz9ERUJVRz10cnVlJlBFUkZPUk1BTkNFX0FVRElUPXRydWUhLi9zcmMvd29ya2Vycy9tYWluLXJlY2VpdmVyLnRzIiwiaW1wb3J0IHsgU3VwcG9ydGVkV29ya2VyIH0gZnJvbSAnLi4vY29uZmlndXJhdGlvbnMvY29uZmlndXJhdGlvbic7XHJcbmltcG9ydCB7IFNlcnZpY2VXb3JrZXJVdGlscyB9IGZyb20gJy4uL2ZyYW1ld29yay9zZXJ2aWNlLXdvcmtlci11dGlscyc7XHJcbmltcG9ydCB7IElMb2dnZXIgfSBmcm9tICcuLi9sb2dzL2xvZ2dlcic7XHJcbmltcG9ydCB7IFBzZXVkb1dvcmtlciB9IGZyb20gJy4vcHNldWRvLXdvcmtlcic7XHJcbmltcG9ydCB7IFNlcnZpY2VXb3JrZXJTeW5jaHJvbm91cyB9IGZyb20gJy4vc2VydmljZS13b3JrZXItc3luY2hyb25vdXMnO1xyXG5pbXBvcnQgeyBJV29ya2VySW5zdGFuY2UgfSBmcm9tICcuL3dvcmtlci1kZWZpbml0aW9ucyc7XHJcblxyXG4vKipcclxuICogQ3JlYXRlIHN1cHBvcnRlZCBieSBjdXJyZW50IGVudmlyb25tZW50IFdlYldvcmtlclxyXG4gKlxyXG4gKiBAaW50ZXJuYWxcclxuICogQGNsYXNzIFdvcmtlclByb3ZpZGVyXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgV29ya2VyUHJvdmlkZXIge1xyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBfcGF0aDogc3RyaW5nLFxyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgX3dvcmtlcnM6IEFycmF5PFN1cHBvcnRlZFdvcmtlcj4sXHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBfbG9nZ2VyOiBJTG9nZ2VyXHJcbiAgICApIHsgfVxyXG5cclxuICAgIHB1YmxpYyBuZXcoKTogSVdvcmtlckluc3RhbmNlIHtcclxuICAgICAgICBjb25zdCBzdXBwb3J0ZWRXb3JrZXJzID0gdGhpcy5zdXBwb3J0ZWRXb3JrZXIodGhpcy5fd29ya2Vycyk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlKHN1cHBvcnRlZFdvcmtlcnMpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY3JlYXRlKHR5cGU6IFN1cHBvcnRlZFdvcmtlcik6IElXb3JrZXJJbnN0YW5jZSB7XHJcbiAgICAgICAgdGhpcy5fbG9nZ2VyLmxvZyhgQ3JlYXRpbmcgd29ya2VyOiAnJHt0eXBlfSdgKTtcclxuICAgICAgICBzd2l0Y2ggKHR5cGUpIHtcclxuICAgICAgICAgICAgY2FzZSAnc2VydmljZSc6IHJldHVybiB0aGlzLnNlcnZpY2VXb3JrZXIoKTtcclxuICAgICAgICAgICAgY2FzZSAnZW11bGF0ZWQnOiByZXR1cm4gdGhpcy5lbXVsYXRlZFdvcmtlcigpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGVtdWxhdGVkV29ya2VyKCk6IElXb3JrZXJJbnN0YW5jZSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQc2V1ZG9Xb3JrZXIodGhpcy5fcGF0aCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzZXJ2aWNlV29ya2VyKCk6IElXb3JrZXJJbnN0YW5jZSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBTZXJ2aWNlV29ya2VyU3luY2hyb25vdXModGhpcy5fcGF0aCwgKHJlYXNvbikgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLl9sb2dnZXIuZXJyb3IocmVhc29uLnN0YWNrKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlKHRoaXMuc3VwcG9ydGVkV29ya2VyKFsnZW11bGF0ZWQnXSkpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc3VwcG9ydGVkV29ya2VyKHByZWZlcmVuY2U6IEFycmF5PFN1cHBvcnRlZFdvcmtlcj4gPSBbJ3NlcnZpY2UnLCAnZW11bGF0ZWQnXSk6IFN1cHBvcnRlZFdvcmtlciB7XHJcbiAgICAgICAgaWYgKFNlcnZpY2VXb3JrZXJVdGlscy5pc1N1cHBvcnRlZCgpICYmIHByZWZlcmVuY2UuaW5kZXhPZignc2VydmljZScpID49IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuICdzZXJ2aWNlJztcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHByZWZlcmVuY2UuaW5kZXhPZignZW11bGF0ZWQnKSA+PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAnZW11bGF0ZWQnO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5zdXBwb3J0ZWRXb3JrZXIoKTtcclxuICAgIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvaWZkZWYtbG9hZGVyL2lmZGVmLWxvYWRlci5qcz9ERUJVRz10cnVlJlBFUkZPUk1BTkNFX0FVRElUPXRydWUhLi9zcmMvd29ya2Vycy93b3JrZXItcHJvdmlkZXIudHMiLCJpbXBvcnQgeyBTeW5jQ2FsbCB9IGZyb20gJy4uL2ZyYW1ld29yay9zeW5jLWNhbGwnO1xyXG5pbXBvcnQgeyBTZXJ2aWNlV29ya2VyV3JhcHBlciB9IGZyb20gJy4vc2VydmljZS13b3JrZXItd3JhcHBlcic7XHJcbmltcG9ydCB7IElXb3JrZXJJbnN0YW5jZSwgTWVzc2FnZUV2ZW50TGlzdGVuZXIgfSBmcm9tICcuL3dvcmtlci1kZWZpbml0aW9ucyc7XHJcblxyXG4vKipcclxuICogQ29udmVydCBJV29ya2VySW5zdGFuY2UgbWV0aG9kIGNhbGxpbmcgdG8gc3luY2hyb25vdXMgb3BlcmF0aW9uc1xyXG4gKlxyXG4gKiBAaW50ZXJuYWxcclxuICovXHJcbmV4cG9ydCBjbGFzcyBTZXJ2aWNlV29ya2VyU3luY2hyb25vdXMgaW1wbGVtZW50cyBJV29ya2VySW5zdGFuY2Uge1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfc3luYzogU3luY0NhbGw8SVdvcmtlckluc3RhbmNlPjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwYXRoOiBzdHJpbmcsXHJcbiAgICAgICAgZG93bmdyYWRlOiAocmVhc29uOiBhbnkpID0+IElXb3JrZXJJbnN0YW5jZVxyXG4gICAgKSB7XHJcbiAgICAgICAgY29uc3Qgc2VydmljZVdvcmtlciA9IFNlcnZpY2VXb3JrZXJXcmFwcGVyLmNyZWF0ZShwYXRoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5jYXRjaCgoZXJyb3IpID0+IGRvd25ncmFkZShlcnJvcikpO1xyXG5cclxuICAgICAgICB0aGlzLl9zeW5jID0gbmV3IFN5bmNDYWxsKHNlcnZpY2VXb3JrZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhZGRFdmVudExpc3RlbmVyKHR5cGU6ICdtZXNzYWdlJywgbGlzdGVuZXI6IE1lc3NhZ2VFdmVudExpc3RlbmVyKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fc3luYy5jYWxsKChzdykgPT4gc3cuYWRkRXZlbnRMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcikpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZW1vdmVFdmVudExpc3RlbmVyKHR5cGU6ICdtZXNzYWdlJywgbGlzdGVuZXI6IE1lc3NhZ2VFdmVudExpc3RlbmVyKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fc3luYy5jYWxsKChzdykgPT4gc3cucmVtb3ZlRXZlbnRMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcikpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB0ZXJtaW5hdGUoKTogdm9pZCB8IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9zeW5jLmNhbGwoKHN3KSA9PiBzdy50ZXJtaW5hdGUoKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHBvc3RNZXNzYWdlKGRhdGE6IGFueSk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX3N5bmMuY2FsbCgoc3cpID0+IHN3LnBvc3RNZXNzYWdlKGRhdGEpKTtcclxuICAgIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvaWZkZWYtbG9hZGVyL2lmZGVmLWxvYWRlci5qcz9ERUJVRz10cnVlJlBFUkZPUk1BTkNFX0FVRElUPXRydWUhLi9zcmMvd29ya2Vycy9zZXJ2aWNlLXdvcmtlci1zeW5jaHJvbm91cy50cyIsIi8qKlxyXG4gKiBXYXkgdG8gY29udmVydCBtZXRob2QgY2FsbHMgZm9yIGFzeW5jaHJvbm91cyBjcmVhdGVkIG9iamVjdCB0byBzeW5jaHJvbm91cyBjYWxsaW5nXHJcbiAqXHJcbiAqIFRoZSBtZXRob2RzIHNob3VsZCBub3QgcmV0dXJuIGFueSB2YWx1ZXNcclxuICovXHJcbmV4cG9ydCBjbGFzcyBTeW5jQ2FsbDxUT2JqZWN0PiB7XHJcbiAgICBwcml2YXRlIF9vYmo6IFRPYmplY3Q7XHJcblxyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBfYXN5bmM6IFByb21pc2U8VE9iamVjdD5cclxuICAgICkge1xyXG4gICAgICAgIHRoaXMuX2FzeW5jLnRoZW4oKG9iaikgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLl9vYmogPSBvYmo7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBJZiBvYmplY3QgaXMgbm90IHJlc29sdmVkIHlldCwgdGhlIGNhbGxpbmcgd2lsbCBiZSBhc3luY2hyb25vdXNcclxuICAgICAqIElmIG9iamVjdCBhbHJlYWR5IGV4aXN0cyB0aGUsIGNhbGxpbmcgd2lsbCBiZSBzeW5jaHJvbm91c1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgY2FsbCA9IDxUUmVzdWx0PihmdW5jOiAob2JqOiBUT2JqZWN0KSA9PiBUUmVzdWx0IHwgUHJvbWlzZTxUUmVzdWx0Pik6IFRSZXN1bHQgfCBQcm9taXNlPFRSZXN1bHQ+ID0+IHtcclxuICAgICAgICBpZiAodGhpcy5fb2JqKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmdW5jKHRoaXMuX29iaik7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2FzeW5jLnRoZW4oKG9iaikgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZ1bmMob2JqKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy9pZmRlZi1sb2FkZXIvaWZkZWYtbG9hZGVyLmpzP0RFQlVHPXRydWUmUEVSRk9STUFOQ0VfQVVESVQ9dHJ1ZSEuL3NyYy9mcmFtZXdvcmsvc3luYy1jYWxsLnRzIiwiaW1wb3J0IHsgU2VydmljZVdvcmtlclV0aWxzIH0gZnJvbSAnLi4vZnJhbWV3b3JrL3NlcnZpY2Utd29ya2VyLXV0aWxzJztcclxuaW1wb3J0IHsgSVdvcmtlckluc3RhbmNlLCBNZXNzYWdlRXZlbnRMaXN0ZW5lciB9IGZyb20gJy4vd29ya2VyLWRlZmluaXRpb25zJztcclxuXHJcbi8qKlxyXG4gKiBDYWxsIHdyYXAgc2VydmljZSB3b3JrZXIgZnVuY3Rpb24gdG8gc3RhbmRhcmQgV2ViV29ya2VyIEFQSVxyXG4gKlxyXG4gKiBAaW50ZXJuYWxcclxuICovXHJcbmV4cG9ydCBjbGFzcyBTZXJ2aWNlV29ya2VyV3JhcHBlciBpbXBsZW1lbnRzIElXb3JrZXJJbnN0YW5jZSB7XHJcbiAgICBwdWJsaWMgc3RhdGljIGNyZWF0ZShwYXRoOiBzdHJpbmcpOiBQcm9taXNlPFNlcnZpY2VXb3JrZXJXcmFwcGVyPiB7XHJcbiAgICAgICAgaWYgKFNlcnZpY2VXb3JrZXJVdGlscy5pc1N1cHBvcnRlZCgpKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHNjb3BlID0gU2VydmljZVdvcmtlclV0aWxzLmFic29sdXRlU2NvcGUocGF0aCwgJ21hc3NhZ2luZy1jbGllbnQnKTtcclxuICAgICAgICAgICAgcmV0dXJuIFNlcnZpY2VXb3JrZXJVdGlscy5hY3RpdmF0ZShwYXRoLCBzY29wZSkudGhlbigoZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBTZXJ2aWNlV29ya2VyV3JhcHBlcihkYXRhLnJlZ2lzdHJhdGlvbiwgZGF0YS5zZXJ2aWNlV29ya2VyKTtcclxuICAgICAgICAgICAgfSkudGhlbigoc3cpID0+IHtcclxuICAgICAgICAgICAgICAgIGFsZXJ0KHN3LnNlcnZpY2VXb3JrZXIuc3RhdGUpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHN3O1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcignU2VydmljZVdvcmtlciBpcyB1bnN1cHBvcnRlZCcpKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwdWJsaWMgcmVnaXN0cmF0aW9uOiBTZXJ2aWNlV29ya2VyUmVnaXN0cmF0aW9uLFxyXG4gICAgICAgIHB1YmxpYyBzZXJ2aWNlV29ya2VyOiBTZXJ2aWNlV29ya2VyLFxyXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBjb250YWluZXI6IFNlcnZpY2VXb3JrZXJDb250YWluZXIgPSAobmF2aWdhdG9yIGFzIE5hdmlnYXRvcikuc2VydmljZVdvcmtlclxyXG4gICAgKSB7XHJcbiAgICAgICAgdGhpcy5zdWJzY3JpYmUoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYWRkRXZlbnRMaXN0ZW5lcih0eXBlOiAnbWVzc2FnZScsIGxpc3RlbmVyOiBNZXNzYWdlRXZlbnRMaXN0ZW5lcik6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuY29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIodHlwZSwgbGlzdGVuZXIgYXMgYW55KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVtb3ZlRXZlbnRMaXN0ZW5lcih0eXBlOiAnbWVzc2FnZScsIGxpc3RlbmVyOiBNZXNzYWdlRXZlbnRMaXN0ZW5lcik6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuY29udGFpbmVyLnJlbW92ZUV2ZW50TGlzdGVuZXIodHlwZSwgbGlzdGVuZXIgYXMgYW55KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdGVybWluYXRlKCk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgICh0aGlzLnNlcnZpY2VXb3JrZXIgYXMgYW55KS5vbnN0YXRlY2hhbmdlID0gdW5kZWZpbmVkO1xyXG4gICAgICAgIHJldHVybiB0aGlzLnJlZ2lzdHJhdGlvbi51bnJlZ2lzdGVyKCkgYXMgYW55IGFzIFByb21pc2U8dm9pZD47XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHBvc3RNZXNzYWdlKGRhdGE6IGFueSk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLnNlcnZpY2VXb3JrZXIuc3RhdGUgIT09ICdyZWR1bmRhbnQnKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2VydmljZVdvcmtlci5wb3N0TWVzc2FnZShkYXRhKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzdWJzY3JpYmUoKSB7XHJcbiAgICAgICAgY29uc3Qgc2VydmljZVdvcmtlciA9IHRoaXMuc2VydmljZVdvcmtlcjtcclxuICAgICAgICBzZXJ2aWNlV29ya2VyLm9uc3RhdGVjaGFuZ2UgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChzZXJ2aWNlV29ya2VyLnN0YXRlID09PSAncmVkdW5kYW50Jykge1xyXG4gICAgICAgICAgICAgICAgKHNlcnZpY2VXb3JrZXIgYXMgYW55KS5vbnN0YXRlY2hhbmdlID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb250YWluZXIuZ2V0UmVnaXN0cmF0aW9uLmNhbGwodGhpcy5jb250YWluZXIsIHRoaXMucmVnaXN0cmF0aW9uLnNjb3BlKS50aGVuKChyZWdpc3RyYXRpb246IFNlcnZpY2VXb3JrZXJSZWdpc3RyYXRpb24pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocmVnaXN0cmF0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVnaXN0cmF0aW9uID0gcmVnaXN0cmF0aW9uO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlcnZpY2VXb3JrZXIgPSByZWdpc3RyYXRpb24uYWN0aXZlIHx8IHJlZ2lzdHJhdGlvbi5pbnN0YWxsaW5nIHx8IHJlZ2lzdHJhdGlvbi53YWl0aW5nIHx8IHNlcnZpY2VXb3JrZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3Vic2NyaWJlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy9pZmRlZi1sb2FkZXIvaWZkZWYtbG9hZGVyLmpzP0RFQlVHPXRydWUmUEVSRk9STUFOQ0VfQVVESVQ9dHJ1ZSEuL3NyYy93b3JrZXJzL3NlcnZpY2Utd29ya2VyLXdyYXBwZXIudHMiXSwic291cmNlUm9vdCI6IiJ9