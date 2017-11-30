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
/******/ 	return __webpack_require__(__webpack_require__.s = 145);
/******/ })
/************************************************************************/
/******/ ({

/***/ 13:
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

/***/ 145:
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var timestamp_1 = __webpack_require__(17);
var lite_data_container_1 = __webpack_require__(52);
var message_sender_lite_1 = __webpack_require__(146);
var messaging_client_instance_1 = __webpack_require__(53);
/**
 * Constructor of a MessagingClient instance in lite mode.
 *
 * Entry point for building bundle file for lite version.
 *
 * @export
 * @class MessagingClient
 */
var MessagingClient = /** @class */ (function () {
    function MessagingClient(_test) {
        this._test = _test;
    }
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
        return MessagingClient.instantiate(environment);
    };
    /**
     * Create a new instance of MessagingClient.
     * It can be called only once at the same page.
     *
     * @static
     * @param {IEnvironmentConfiguration} environment - Configuration of environment
     */
    MessagingClient.instantiate = function (environment) {
        return new MessagingClient().instantiate(environment);
    };
    /**
     * Create a new instance of MessagingClient.
     * It can be called only once at the same page.
     *
     * @static
     * @param {IEnvironmentConfiguration} environment - Configuration of environment
     */
    MessagingClient.environment = function (test) {
        return new MessagingClient(test);
    };
    /**
     * Create a new instance of MessagingClient.
     * It can be called only once at the same page.
     *
     * @internal
     * @param {IEnvironmentConfiguration} environment - Configuration of environment
     */
    MessagingClient.prototype.instantiate = function (environment) {
        var lite = lite_data_container_1.LiteDataContainer.get();
        lite.environment = lite.environment || environment;
        lite.test = lite.test || this._test;
        if (lite.messagingClient) {
            return lite.messagingClient;
        }
        var sender = new message_sender_lite_1.MessageSenderLite();
        var messagingClient = new messaging_client_instance_1.MessagingClientInstance(sender, new timestamp_1.TimeStampProvider());
        lite.buffer = sender.buffer;
        lite.messagingClient = messagingClient;
        return messagingClient;
    };
    return MessagingClient;
}());
exports.MessagingClient = MessagingClient;


/***/ }),

/***/ 146:
/***/ (function(module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Message sender inplementation for lite mode
 *
 * @internal
 */
var MessageSenderLite = /** @class */ (function () {
    function MessageSenderLite() {
        this.buffer = { items: [] };
    }
    MessageSenderLite.prototype.send = function (messages) {
        var items = this.buffer.items;
        var free = MessageSenderLite.MaxBufferSize - items.length;
        if (free > 0) {
            if (messages instanceof Array) {
                if (free < messages.length) {
                    messages = messages.slice(0, free);
                }
                this.buffer.items = messages.concat(items);
            }
            else {
                this.buffer.items.push(messages);
            }
        }
    };
    MessageSenderLite.prototype.dispose = function (callback) {
        this.buffer.items.length = 0;
        if (callback) {
            callback();
        }
    };
    MessageSenderLite.MaxBufferSize = 15000;
    return MessageSenderLite;
}());
exports.MessageSenderLite = MessageSenderLite;


/***/ }),

/***/ 17:
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

/***/ 18:
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

/***/ 20:
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

/***/ 4:
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

/***/ 52:
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

/***/ 53:
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


/***/ })

/******/ });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCA1YzE2YWE4MmNiNDE5ZGU0MTgzNiIsIndlYnBhY2s6Ly8vLi9zcmMvZnJhbWV3b3JrL2dsb2JhbC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbWVzc2FnaW5nLWNsaWVudC1saXRlLnRzIiwid2VicGFjazovLy8uL3NyYy9tZXNzYWdlLXNlbmRlci1saXRlLnRzIiwid2VicGFjazovLy8uL3NyYy9mcmFtZXdvcmsvdGltZXN0YW1wLnRzIiwid2VicGFjazovLy8uL3NyYy9mcmFtZXdvcmsvdXRpbHMvZXh0ZW5kLnRzIiwid2VicGFjazovLy8od2VicGFjaykvYnVpbGRpbi9nbG9iYWwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ZyYW1ld29yay91dGlscy90cmF2ZXJzYWwudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xpdGUtZGF0YS1jb250YWluZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21lc3NhZ2luZy1jbGllbnQtaW5zdGFuY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87QUNWQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7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SUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQzdCLE1BQU0sSUFBSSxLQUFLLENBQUMsc0NBQXNDLENBQUMsQ0FBQztRQUM1RCxDQUFDO1FBRUQsT0FBTyxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUMzQyxPQUFPLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7UUFDOUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7SUFDTCw4QkFBQztBQUFELENBQUM7QUExQlksMERBQXVCIiwiZmlsZSI6Im1lc3NhZ2luZy1jbGllbnQtbGl0ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtdLCBmYWN0b3J5KTtcblx0ZWxzZSB7XG5cdFx0dmFyIGEgPSBmYWN0b3J5KCk7XG5cdFx0Zm9yKHZhciBpIGluIGEpICh0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgPyBleHBvcnRzIDogcm9vdClbaV0gPSBhW2ldO1xuXHR9XG59KSh0aGlzLCBmdW5jdGlvbigpIHtcbnJldHVybiBcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMTQ1KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCA1YzE2YWE4MmNiNDE5ZGU0MTgzNiIsIi8qKlxyXG4gKiBSZXR1cm4gZ2xvYmFsIHJvb3Qgb2JqZWN0IGZvciBjdXJyZW50IGVudmlyb25tZW50XHJcbiAqXHJcbiAqIEBpbnRlcm5hbFxyXG4gKiBAYWJzdHJhY3RcclxuICogQGNsYXNzIEdsb2JhbFByb3ZpZGVyXHJcbiAqL1xyXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgR2xvYmFsUHJvdmlkZXIge1xyXG4gICAgcHVibGljIHN0YXRpYyBjdXJyZW50KCkge1xyXG4gICAgICAgIGNvbnN0IHJvb3QgPSB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyA/IHdpbmRvdyA6XHJcbiAgICAgICAgICAgICAgICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXHJcbiAgICAgICAgICAgICAgICAgICAgIHR5cGVvZiBzZWxmICAgIT09ICd1bmRlZmluZWQnID8gc2VsZiA6XHJcbiAgICAgICAgICAgICAgICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXHJcbiAgICAgICAgICAgICAgICAgICAgIHR5cGVvZiBnbG9iYWwgIT09ICd1bmRlZmluZWQnID8gZ2xvYmFsIDpcclxuICAgICAgICAgICAgICAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cclxuICAgICAgICAgICAgICAgICAgICAgbnVsbDtcclxuXHJcbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXHJcbiAgICAgICAgaWYgKCFyb290KSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVW5zdXBwb3J0ZWQgZW52aXJvbm1lbnQuJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gcm9vdDtcclxuICAgIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvaWZkZWYtbG9hZGVyL2lmZGVmLWxvYWRlci5qcz9ERUJVRz10cnVlJlBFUkZPUk1BTkNFX0FVRElUPXRydWUhLi9zcmMvZnJhbWV3b3JrL2dsb2JhbC50cyIsImltcG9ydCB7IElUZXN0RW52aXJvbm1lbnQgfSBmcm9tICcuL2NvbmZpZ3VyYXRpb25zL3Rlc3QtZW52aXJvbm1lbnQnO1xyXG5pbXBvcnQgeyBJRW52aXJvbm1lbnRDb25maWd1cmF0aW9uLCBJTWVzc2FnaW5nQ2xpZW50IH0gZnJvbSAnLi9kZWZpbml0aW9ucyc7XHJcbmltcG9ydCB7IFRpbWVTdGFtcFByb3ZpZGVyIH0gZnJvbSAnLi9mcmFtZXdvcmsvdGltZXN0YW1wJztcclxuaW1wb3J0IHsgSU1lc3NhZ2luZ0NsaWVudExpdGVEYXRhIH0gZnJvbSAnLi9saXRlLWRhdGEnO1xyXG5pbXBvcnQgeyBMaXRlRGF0YUNvbnRhaW5lciB9IGZyb20gJy4vbGl0ZS1kYXRhLWNvbnRhaW5lcic7XHJcbmltcG9ydCB7IE1lc3NhZ2VTZW5kZXJMaXRlIH0gZnJvbSAnLi9tZXNzYWdlLXNlbmRlci1saXRlJztcclxuaW1wb3J0IHsgTWVzc2FnaW5nQ2xpZW50SW5zdGFuY2UgfSBmcm9tICcuL21lc3NhZ2luZy1jbGllbnQtaW5zdGFuY2UnO1xyXG5cclxuLyoqXHJcbiAqIENvbnN0cnVjdG9yIG9mIGEgTWVzc2FnaW5nQ2xpZW50IGluc3RhbmNlIGluIGxpdGUgbW9kZS5cclxuICpcclxuICogRW50cnkgcG9pbnQgZm9yIGJ1aWxkaW5nIGJ1bmRsZSBmaWxlIGZvciBsaXRlIHZlcnNpb24uXHJcbiAqXHJcbiAqIEBleHBvcnRcclxuICogQGNsYXNzIE1lc3NhZ2luZ0NsaWVudFxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIE1lc3NhZ2luZ0NsaWVudCB7XHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZSBhIG5ldyBpbnN0YW5jZSBvZiBNZXNzYWdpbmdDbGllbnQuXHJcbiAgICAgKiBJdCBjYW4gYmUgY2FsbGVkIG9ubHkgb25jZSBhdCB0aGUgc2FtZSBwYWdlLlxyXG4gICAgICpcclxuICAgICAqIERlcHJpY2F0ZWQgbWV0aG9kLiBTaG91bGQgYmUgZGVsZXRlZCBpbiB0aGUgbmV4dCBtYWpvciB2ZXJzaW9uLlxyXG4gICAgICpcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7SUVudmlyb25tZW50Q29uZmlndXJhdGlvbn0gZW52aXJvbm1lbnQgLSBDb25maWd1cmF0aW9uIG9mIGVudmlyb25tZW50XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgY3JlYXRlKFxyXG4gICAgICAgIGVudmlyb25tZW50OiBJRW52aXJvbm1lbnRDb25maWd1cmF0aW9uXHJcbiAgICApOiBJTWVzc2FnaW5nQ2xpZW50IHtcclxuICAgICAgICByZXR1cm4gTWVzc2FnaW5nQ2xpZW50Lmluc3RhbnRpYXRlKGVudmlyb25tZW50KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZSBhIG5ldyBpbnN0YW5jZSBvZiBNZXNzYWdpbmdDbGllbnQuXHJcbiAgICAgKiBJdCBjYW4gYmUgY2FsbGVkIG9ubHkgb25jZSBhdCB0aGUgc2FtZSBwYWdlLlxyXG4gICAgICpcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7SUVudmlyb25tZW50Q29uZmlndXJhdGlvbn0gZW52aXJvbm1lbnQgLSBDb25maWd1cmF0aW9uIG9mIGVudmlyb25tZW50XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgaW5zdGFudGlhdGUoXHJcbiAgICAgICAgZW52aXJvbm1lbnQ/OiBJRW52aXJvbm1lbnRDb25maWd1cmF0aW9uXHJcbiAgICApOiBJTWVzc2FnaW5nQ2xpZW50IHtcclxuICAgICAgICByZXR1cm4gbmV3IE1lc3NhZ2luZ0NsaWVudCgpLmluc3RhbnRpYXRlKGVudmlyb25tZW50KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZSBhIG5ldyBpbnN0YW5jZSBvZiBNZXNzYWdpbmdDbGllbnQuXHJcbiAgICAgKiBJdCBjYW4gYmUgY2FsbGVkIG9ubHkgb25jZSBhdCB0aGUgc2FtZSBwYWdlLlxyXG4gICAgICpcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7SUVudmlyb25tZW50Q29uZmlndXJhdGlvbn0gZW52aXJvbm1lbnQgLSBDb25maWd1cmF0aW9uIG9mIGVudmlyb25tZW50XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgZW52aXJvbm1lbnQoXHJcbiAgICAgICAgdGVzdDogSVRlc3RFbnZpcm9ubWVudFxyXG4gICAgKTogTWVzc2FnaW5nQ2xpZW50IHtcclxuICAgICAgICByZXR1cm4gbmV3IE1lc3NhZ2luZ0NsaWVudCh0ZXN0KTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IF90ZXN0PzogSVRlc3RFbnZpcm9ubWVudFxyXG4gICAgKSB7IH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZSBhIG5ldyBpbnN0YW5jZSBvZiBNZXNzYWdpbmdDbGllbnQuXHJcbiAgICAgKiBJdCBjYW4gYmUgY2FsbGVkIG9ubHkgb25jZSBhdCB0aGUgc2FtZSBwYWdlLlxyXG4gICAgICpcclxuICAgICAqIEBpbnRlcm5hbFxyXG4gICAgICogQHBhcmFtIHtJRW52aXJvbm1lbnRDb25maWd1cmF0aW9ufSBlbnZpcm9ubWVudCAtIENvbmZpZ3VyYXRpb24gb2YgZW52aXJvbm1lbnRcclxuICAgICAqL1xyXG4gICAgcHVibGljIGluc3RhbnRpYXRlKFxyXG4gICAgICAgIGVudmlyb25tZW50PzogSUVudmlyb25tZW50Q29uZmlndXJhdGlvblxyXG4gICAgKTogSU1lc3NhZ2luZ0NsaWVudCB7XHJcbiAgICAgICAgY29uc3QgbGl0ZTogSU1lc3NhZ2luZ0NsaWVudExpdGVEYXRhID0gTGl0ZURhdGFDb250YWluZXIuZ2V0KCk7XHJcblxyXG4gICAgICAgIGxpdGUuZW52aXJvbm1lbnQgPSBsaXRlLmVudmlyb25tZW50IHx8IGVudmlyb25tZW50O1xyXG4gICAgICAgIGxpdGUudGVzdCA9IGxpdGUudGVzdCB8fCB0aGlzLl90ZXN0O1xyXG5cclxuICAgICAgICBpZiAobGl0ZS5tZXNzYWdpbmdDbGllbnQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGxpdGUubWVzc2FnaW5nQ2xpZW50O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3Qgc2VuZGVyID0gbmV3IE1lc3NhZ2VTZW5kZXJMaXRlKCk7XHJcblxyXG4gICAgICAgIGNvbnN0IG1lc3NhZ2luZ0NsaWVudCA9IG5ldyBNZXNzYWdpbmdDbGllbnRJbnN0YW5jZShzZW5kZXIsIG5ldyBUaW1lU3RhbXBQcm92aWRlcigpKTtcclxuXHJcbiAgICAgICAgbGl0ZS5idWZmZXIgPSBzZW5kZXIuYnVmZmVyO1xyXG4gICAgICAgIGxpdGUubWVzc2FnaW5nQ2xpZW50ID0gbWVzc2FnaW5nQ2xpZW50O1xyXG5cclxuICAgICAgICByZXR1cm4gbWVzc2FnaW5nQ2xpZW50O1xyXG4gICAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy9pZmRlZi1sb2FkZXIvaWZkZWYtbG9hZGVyLmpzP0RFQlVHPXRydWUmUEVSRk9STUFOQ0VfQVVESVQ9dHJ1ZSEuL3NyYy9tZXNzYWdpbmctY2xpZW50LWxpdGUudHMiLCJpbXBvcnQgeyBJTWVzc2FnZSB9IGZyb20gJy4vZGVmaW5pdGlvbnMnO1xyXG5pbXBvcnQgeyBJTGl0ZUJ1ZmZlciB9IGZyb20gJy4vbGl0ZS1idWZmZXInO1xyXG5pbXBvcnQgeyBJTWVzc2FnZVNlbmRlciB9IGZyb20gJy4vbWVzc2FnZS1zZW5kZXInO1xyXG5cclxuLyoqXHJcbiAqIE1lc3NhZ2Ugc2VuZGVyIGlucGxlbWVudGF0aW9uIGZvciBsaXRlIG1vZGVcclxuICpcclxuICogQGludGVybmFsXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgTWVzc2FnZVNlbmRlckxpdGUgaW1wbGVtZW50cyBJTWVzc2FnZVNlbmRlciB7XHJcbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IE1heEJ1ZmZlclNpemU6IG51bWJlciA9IDE1MDAwO1xyXG5cclxuICAgIHB1YmxpYyByZWFkb25seSBidWZmZXI6IElMaXRlQnVmZmVyID0geyBpdGVtczogW10gfTtcclxuXHJcbiAgICBwdWJsaWMgc2VuZChtZXNzYWdlczogQXJyYXk8SU1lc3NhZ2U+IHwgSU1lc3NhZ2UpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBpdGVtcyA9IHRoaXMuYnVmZmVyLml0ZW1zO1xyXG4gICAgICAgIGNvbnN0IGZyZWUgPSBNZXNzYWdlU2VuZGVyTGl0ZS5NYXhCdWZmZXJTaXplIC0gaXRlbXMubGVuZ3RoO1xyXG5cclxuICAgICAgICBpZiAoZnJlZSA+IDApIHtcclxuICAgICAgICAgICAgaWYgKG1lc3NhZ2VzIGluc3RhbmNlb2YgQXJyYXkpIHtcclxuICAgICAgICAgICAgICAgIGlmIChmcmVlIDwgbWVzc2FnZXMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZXMgPSBtZXNzYWdlcy5zbGljZSgwLCBmcmVlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuYnVmZmVyLml0ZW1zID0gbWVzc2FnZXMuY29uY2F0KGl0ZW1zKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYnVmZmVyLml0ZW1zLnB1c2gobWVzc2FnZXMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBkaXNwb3NlKGNhbGxiYWNrPzogKCkgPT4gdm9pZCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuYnVmZmVyLml0ZW1zLmxlbmd0aCA9IDA7XHJcbiAgICAgICAgaWYgKGNhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgIGNhbGxiYWNrKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy9pZmRlZi1sb2FkZXIvaWZkZWYtbG9hZGVyLmpzP0RFQlVHPXRydWUmUEVSRk9STUFOQ0VfQVVESVQ9dHJ1ZSEuL3NyYy9tZXNzYWdlLXNlbmRlci1saXRlLnRzIiwiLyoqXHJcbiAqIEFQSSBvZiB0aW1lc3RhbXAgcHJvdmlkZXIgZGVmaW5pdGlvblxyXG4gKlxyXG4gKiBAaW50ZXJuYWxcclxuICogQGludGVyZmFjZSBJVGltZVN0YW1wUHJvdmlkZXJcclxuICovXHJcbmV4cG9ydCBpbnRlcmZhY2UgSVRpbWVTdGFtcFByb3ZpZGVyIHtcclxuICAgIG5vdygpOiBudW1iZXI7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBTaW1wbGUgdGltZXN0YW1wIHByb3ZpZGVyIGltcGxlbWVudGF0aW9uXHJcbiAqXHJcbiAqIEBpbnRlcm5hbFxyXG4gKiBAY2xhc3MgVGltZVN0YW1wUHJvdmlkZXJcclxuICogQGltcGxlbWVudHMge0lUaW1lU3RhbXBQcm92aWRlcn1cclxuICovXHJcbmV4cG9ydCBjbGFzcyBUaW1lU3RhbXBQcm92aWRlciBpbXBsZW1lbnRzIElUaW1lU3RhbXBQcm92aWRlciB7XHJcbiAgICBwdWJsaWMgbm93KCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuICtuZXcgRGF0ZSgpO1xyXG4gICAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy9pZmRlZi1sb2FkZXIvaWZkZWYtbG9hZGVyLmpzP0RFQlVHPXRydWUmUEVSRk9STUFOQ0VfQVVESVQ9dHJ1ZSEuL3NyYy9mcmFtZXdvcmsvdGltZXN0YW1wLnRzIiwiaW1wb3J0IHsgdHJhdmVyc2FsIH0gZnJvbSAnLi90cmF2ZXJzYWwnO1xyXG5cclxuLyoqXHJcbiAqIEV4dGVuZCB0aGUgZmlyc3Qgb2JqZWN0IGJ5IGFsbCBwcm9wZXJ0aWVzIGZyb20gdGhlIHNlY29uZFxyXG4gKiBSZXR1cm4gdGhlIGZpcnN0IG9iamVjdFxyXG4gKlxyXG4gKiBAaW50ZXJuYWxcclxuICogQHBhcmFtIHsqfSBkZXN0aW5hdGlvbiAtIG9iamVjdCB3aGF0IHdpbGwgYmUgZXh0ZW5kZWRcclxuICogQHBhcmFtIHsqfSBzb3VyY2UgLSBvYmplY3Qgd2l0aCBzb3VyY2UgZGF0YVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGV4dGVuZChkZXN0aW5hdGlvbjogYW55LCAuLi5zb3VyY2VzOiBBcnJheTxhbnk+KTogYW55IHtcclxuICAgIGlmICghZGVzdGluYXRpb24pIHtcclxuICAgICAgICBkZXN0aW5hdGlvbiA9IHt9O1xyXG4gICAgfVxyXG5cclxuICAgIHRyYXZlcnNhbCgobmFtZSwgc291cmNlVmFsdWUpID0+IHtcclxuICAgICAgICBpZiAoZGVzdGluYXRpb25bbmFtZV0gPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBkZXN0aW5hdGlvbltuYW1lXSA9IHNvdXJjZVZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgIH0sIGRlc3RpbmF0aW9uLCBzb3VyY2VzKTtcclxuXHJcbiAgICByZXR1cm4gZGVzdGluYXRpb247XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL2lmZGVmLWxvYWRlci9pZmRlZi1sb2FkZXIuanM/REVCVUc9dHJ1ZSZQRVJGT1JNQU5DRV9BVURJVD10cnVlIS4vc3JjL2ZyYW1ld29yay91dGlscy9leHRlbmQudHMiLCJ2YXIgZztcblxuLy8gVGhpcyB3b3JrcyBpbiBub24tc3RyaWN0IG1vZGVcbmcgPSAoZnVuY3Rpb24oKSB7XG5cdHJldHVybiB0aGlzO1xufSkoKTtcblxudHJ5IHtcblx0Ly8gVGhpcyB3b3JrcyBpZiBldmFsIGlzIGFsbG93ZWQgKHNlZSBDU1ApXG5cdGcgPSBnIHx8IEZ1bmN0aW9uKFwicmV0dXJuIHRoaXNcIikoKSB8fCAoMSxldmFsKShcInRoaXNcIik7XG59IGNhdGNoKGUpIHtcblx0Ly8gVGhpcyB3b3JrcyBpZiB0aGUgd2luZG93IHJlZmVyZW5jZSBpcyBhdmFpbGFibGVcblx0aWYodHlwZW9mIHdpbmRvdyA9PT0gXCJvYmplY3RcIilcblx0XHRnID0gd2luZG93O1xufVxuXG4vLyBnIGNhbiBzdGlsbCBiZSB1bmRlZmluZWQsIGJ1dCBub3RoaW5nIHRvIGRvIGFib3V0IGl0Li4uXG4vLyBXZSByZXR1cm4gdW5kZWZpbmVkLCBpbnN0ZWFkIG9mIG5vdGhpbmcgaGVyZSwgc28gaXQnc1xuLy8gZWFzaWVyIHRvIGhhbmRsZSB0aGlzIGNhc2UuIGlmKCFnbG9iYWwpIHsgLi4ufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGc7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAod2VicGFjaykvYnVpbGRpbi9nbG9iYWwuanNcbi8vIG1vZHVsZSBpZCA9IDIwXG4vLyBtb2R1bGUgY2h1bmtzID0gMSAyIDMiLCIvKipcclxuICogQGludGVybmFsXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gdHJhdmVyc2FsKFxyXG4gICAgY2FsbGJhY2s6IChuYW1lOiBzdHJpbmcsIHNvdXJjZVZhbHVlOiBhbnkpID0+IHZvaWQsXHJcbiAgICBkZXN0aW5hdGlvbjogYW55LFxyXG4gICAgc291cmNlczogQXJyYXk8YW55PlxyXG4pIHtcclxuICAgIC8vIERvIG5vdCB1c2UgZm9yLi5vZiB0byBhdm9pZCByZXF1aXJlIHBvbHlmaWxsc1xyXG4gICAgY29uc3QgbGVuZ3RoID0gc291cmNlcy5sZW5ndGg7XHJcbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgbGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgY29uc3Qgc291cmNlID0gc291cmNlc1tpbmRleF07XHJcblxyXG4gICAgICAgIGlmICghc291cmNlKSB7XHJcbiAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZm9yIChjb25zdCBuYW1lIGluIHNvdXJjZSkge1xyXG4gICAgICAgICAgICBpZiAoc291cmNlLmhhc093blByb3BlcnR5KG5hbWUpKSB7XHJcbiAgICAgICAgICAgICAgICBjYWxsYmFjayhuYW1lLCBzb3VyY2VbbmFtZV0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy9pZmRlZi1sb2FkZXIvaWZkZWYtbG9hZGVyLmpzP0RFQlVHPXRydWUmUEVSRk9STUFOQ0VfQVVESVQ9dHJ1ZSEuL3NyYy9mcmFtZXdvcmsvdXRpbHMvdHJhdmVyc2FsLnRzIiwiaW1wb3J0IHsgR2xvYmFsUHJvdmlkZXIgfSBmcm9tICcuL2ZyYW1ld29yay9nbG9iYWwnO1xyXG5pbXBvcnQgeyBJTWVzc2FnaW5nQ2xpZW50TGl0ZURhdGEgfSBmcm9tICcuL2xpdGUtZGF0YSc7XHJcblxyXG5jb25zdCBuYW1lOiAnTWVzc2FnaW5nQ2xpZW50LUxpdGVEYXRhJyA9ICdNZXNzYWdpbmdDbGllbnQtTGl0ZURhdGEnO1xyXG5cclxuLyoqXHJcbiAqIEBpbnRlcm5hbFxyXG4gKi9cclxuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLW5hbWVzcGFjZVxyXG5kZWNsYXJlIGdsb2JhbCB7XHJcbiAgICBpbnRlcmZhY2UgV2luZG93IHtcclxuICAgICAgICAnTWVzc2FnaW5nQ2xpZW50LUxpdGVEYXRhJzogSU1lc3NhZ2luZ0NsaWVudExpdGVEYXRhO1xyXG4gICAgfVxyXG59XHJcblxyXG4vKipcclxuICogSGVscGVyIGZvciBzdG9ycmluZyBkYXRhIGluIGdsb2JhbCB2YXJpYWJsZVxyXG4gKlxyXG4gKiBAaW50ZXJuYWxcclxuICovXHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBMaXRlRGF0YUNvbnRhaW5lciB7XHJcbiAgICBwdWJsaWMgc3RhdGljIGdldCgpOiBJTWVzc2FnaW5nQ2xpZW50TGl0ZURhdGEge1xyXG4gICAgICAgIGNvbnN0IHJvb3QgPSAoR2xvYmFsUHJvdmlkZXIuY3VycmVudCgpIGFzIFdpbmRvdyk7XHJcbiAgICAgICAgcmV0dXJuIHJvb3RbbmFtZV0gfHwgKHJvb3RbbmFtZV0gPSB7fSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBjbGVhcigpOiB2b2lkIHtcclxuICAgICAgICBkZWxldGUgKEdsb2JhbFByb3ZpZGVyLmN1cnJlbnQoKSBhcyBXaW5kb3cpW25hbWVdO1xyXG4gICAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy9pZmRlZi1sb2FkZXIvaWZkZWYtbG9hZGVyLmpzP0RFQlVHPXRydWUmUEVSRk9STUFOQ0VfQVVESVQ9dHJ1ZSEuL3NyYy9saXRlLWRhdGEtY29udGFpbmVyLnRzIiwiaW1wb3J0IHsgSU1lc3NhZ2UsIE1lc3NhZ2VUeXBlIH0gZnJvbSAnLi9kZWZpbml0aW9ucy9tZXNzYWdlJztcclxuaW1wb3J0IHsgSU1lc3NhZ2luZ0NsaWVudCB9IGZyb20gJy4vZGVmaW5pdGlvbnMvbWVzc2FnaW5nLWNsaWVudCc7XHJcbmltcG9ydCB7IElTZW5kaW5nT3B0aW9ucyB9IGZyb20gJy4vZGVmaW5pdGlvbnMvc2VuZGluZy1vcHRpb25zJztcclxuaW1wb3J0IHsgSVRpbWVTdGFtcFByb3ZpZGVyIH0gZnJvbSAnLi9mcmFtZXdvcmsvdGltZXN0YW1wJztcclxuaW1wb3J0IHsgZXh0ZW5kIH0gZnJvbSAnLi9mcmFtZXdvcmsvdXRpbHMvZXh0ZW5kJztcclxuaW1wb3J0IHsgSU1lc3NhZ2VTZW5kZXIgfSBmcm9tICcuL21lc3NhZ2Utc2VuZGVyJztcclxuXHJcbi8qKlxyXG4gKiBTaGFyZWQgdXNlciBBUEkgaW1wbGVtZW50YXRpb24gZm9yIGxpdGUgYW5kIGZ1bGwgdmVyc2lvbnMuXHJcbiAqXHJcbiAqIEluc3RhbmNlIG9mIHRoaXMgY2xhc3MgaXMgcHJvdmlkZWQgdG8gdXNlciBhbmQgaXNuJ3QgY2hhbmdlZC5cclxuICpcclxuICogQGludGVybmFsXHJcbiAqIEBjbGFzcyBNZXNzYWdpbmdDbGllbnRcclxuICogQGltcGxlbWVudHMge0lNZXNzYWdpbmdDbGllbnR9XHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgTWVzc2FnaW5nQ2xpZW50SW5zdGFuY2UgaW1wbGVtZW50cyBJTWVzc2FnaW5nQ2xpZW50IHtcclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFNlbmRlciBpbnN0YW5jZSB0aGF0IHdpbGwgYmUgcmVwbGFjZWQgYWZ0ZXIgZnVsbCB2ZXJzaW9uIGxvYWRpbmdcclxuICAgICAgICAgKi9cclxuICAgICAgICBwdWJsaWMgc2VuZGVyOiBJTWVzc2FnZVNlbmRlcixcclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IF90aW1lOiBJVGltZVN0YW1wUHJvdmlkZXJcclxuICAgICkgeyB9XHJcblxyXG4gICAgcHVibGljIGNyZWF0ZTxUTWVzc2FnZSBleHRlbmRzIElNZXNzYWdlPihtZXNzYWdlVHlwZTogTWVzc2FnZVR5cGUsIHBheWxvYWQ/OiBUTWVzc2FnZSk6IFRNZXNzYWdlIHtcclxuICAgICAgICBjb25zdCBtZXNzYWdlID0geyBfbWV0YTogeyB0eXBlOiBtZXNzYWdlVHlwZSB9IH0gYXMgVE1lc3NhZ2U7XHJcbiAgICAgICAgaWYgKHBheWxvYWQpIHtcclxuICAgICAgICAgICAgZXh0ZW5kKG1lc3NhZ2UsIHBheWxvYWQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbWVzc2FnZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2VuZDxUTWVzc2FnZSBleHRlbmRzIElNZXNzYWdlPihtZXNzYWdlOiBUTWVzc2FnZSwgb3B0aW9ucz86IElTZW5kaW5nT3B0aW9ucyk6IHZvaWQge1xyXG4gICAgICAgIGlmICghbWVzc2FnZSB8fCAhbWVzc2FnZS5fbWV0YSkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ01lc3NhZ2Ugb3IgbWVzc2FnZSB0eXBlIGlzIHVuZGVmaW5lZCcpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbWVzc2FnZS5fbWV0YS50aW1lc3RhbXAgPSB0aGlzLl90aW1lLm5vdygpO1xyXG4gICAgICAgIG1lc3NhZ2UgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KG1lc3NhZ2UpKTtcclxuICAgICAgICB0aGlzLnNlbmRlci5zZW5kKG1lc3NhZ2UsIG9wdGlvbnMpO1xyXG4gICAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy9pZmRlZi1sb2FkZXIvaWZkZWYtbG9hZGVyLmpzP0RFQlVHPXRydWUmUEVSRk9STUFOQ0VfQVVESVQ9dHJ1ZSEuL3NyYy9tZXNzYWdpbmctY2xpZW50LWluc3RhbmNlLnRzIl0sInNvdXJjZVJvb3QiOiIifQ==