/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"main": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push(["./src/js/index.js","vendor"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/import/components.js":
/*!*************************************!*\
  !*** ./src/js/import/components.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./src/js/import/modules.js":
/*!**********************************!*\
  !*** ./src/js/import/modules.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./src/js/index.js":
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _import_modules__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./import/modules */ "./src/js/import/modules.js");
/* harmony import */ var _import_modules__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_import_modules__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _import_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./import/components */ "./src/js/import/components.js");
/* harmony import */ var _import_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_import_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flatpickr__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flatpickr */ "./node_modules/flatpickr/dist/flatpickr.js");
/* harmony import */ var flatpickr__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flatpickr__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var flatpickr_dist_l10n_ru_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! flatpickr/dist/l10n/ru.js */ "./node_modules/flatpickr/dist/l10n/ru.js");
/* harmony import */ var flatpickr_dist_l10n_ru_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(flatpickr_dist_l10n_ru_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var inputmask__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! inputmask */ "./node_modules/inputmask/index.js");
/* harmony import */ var inputmask__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(inputmask__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var hammerjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! hammerjs */ "./node_modules/hammerjs/hammer.js");
/* harmony import */ var hammerjs__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(hammerjs__WEBPACK_IMPORTED_MODULE_5__);
function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _objectDestructuringEmpty(obj) { if (obj == null) throw new TypeError("Cannot destructure undefined"); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }






 // Полифилы
//====================//

window.performance = window.performance || {};

window.performance.now = window.performance.now || function () {
  window.performance.offset = +new Date();
  return function () {
    return +new Date() - window.performance.offset;
  };
}();

window.requestAnimate = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (
/* Function */
callback,
/* DOMElement */
element) {
  var time = performance.now();
  var delay = Math.max(0, 16 - time - window.lastTimeAnimate || 0);
  return window.setTimeout(callback.bind(undefined, window.lastTimeAnimate = time + delay), delay);
};

window.cancelAnimate = window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || window.oCancelAnimationFrame || window.msCancelAnimationFrame || function cancelAnimate(
/* number */
id) {
  return window.clearTimeout(id);
}; //====================//
// Слайдер
//====================//


window.Slider = /*#__PURE__*/function () {
  function Slider(element) {
    _classCallCheck(this, Slider);

    element.Slider = this;
    this.element = element;
    this.index = this.element.firstElementChild.querySelector("._active") || this.element.firstElementChild.firstElementChild;
    this.pos = {
      current: 0,
      progress: 0
    };
    this.animation = {
      entity: null,
      from: 0,
      to: 0
    };
    this.max = [Math.min(this.element.offsetWidth - this.element.firstElementChild.offsetWidth, 0), 0];
    this.Hammer = new hammerjs__WEBPACK_IMPORTED_MODULE_5___default.a.Manager(this.element);
    this.Hammer.add(new hammerjs__WEBPACK_IMPORTED_MODULE_5___default.a.Pan({
      direction: hammerjs__WEBPACK_IMPORTED_MODULE_5___default.a.DIRECTION_HORIZONTAL,
      threshold: 2
    }));
    hammerjs__WEBPACK_IMPORTED_MODULE_5___default.a.on(this.element, "touchstart mousedown pointerdown", function (ev) {
      this.animation.entity && this.animation.entity.stop();
    }.bind(this));
    hammerjs__WEBPACK_IMPORTED_MODULE_5___default.a.on(this.element, "click", function (ev) {
      this.isPan && ev.preventDefault();
    }.bind(this), false);
    this.Hammer.on("panleft panright panend panstart", function (ev) {
      if (ev.eventType === hammerjs__WEBPACK_IMPORTED_MODULE_5___default.a.INPUT_CANCEL) {
        return;
      }

      this.isPan = true;
      this.pos.progress = Math.min(Math.max(this.pos.current + ev.deltaX, this.max[0]), this.max[1]);

      if (this.pos.progress <= this.max[0] || this.pos.progress >= this.max[1]) {
        this.pos.progress += 20 * (ev.deltaX / this.element.offsetWidth);
      }

      this.element.firstElementChild.style.transform = "translate3d(" + this.pos.progress + "px, 0, 0)";

      if (ev.type === "panend") {
        this.animate(this.pos.progress, Math.min(Math.max(this.pos.current + ev.deltaX * Math.max(Math.abs(ev.overallVelocityX * 1.1), 1.1) * Math.max(Math.abs(ev.velocityX * 1.1), 1.1), this.max[0]), this.max[1]));
        setTimeout(function () {
          this.isPan = false;
        }.bind(this), 10);
      }
    }.bind(this));
    this.goTo(this.index);
  }

  _createClass(Slider, [{
    key: "goTo",
    value: function goTo(i) {
      this.animation.entity && this.animation.entity.stop();
      this.index && this.index.classList.remove("_active");
      this.index = this.element.firstElementChild.children[i] || i;

      if (this.index instanceof Element && this.index.parentElement === this.element.firstElementChild) {
        this.animate(this.pos.current, Math.min(Math.max(-this.index.offsetLeft + (this.element.offsetWidth - this.index.offsetWidth) / 2, this.max[0]), this.max[1]));
        this.index.classList.add("_active");
      }
    }
  }, {
    key: "animate",
    value: function animate(from, to) {
      this.animation.entity && this.animation.entity.stop();
      this.animation.from = from;
      this.animation.to = to;
      this.animation.entity = new Animate({
        duration: 600,
        timing: function (timeFraction) {
          if (this.animation.to <= this.max[0] && this.animation.from >= this.max[0] || this.animation.to >= this.max[1] && this.animation.from <= this.max[1]) {
            return 1 + 2 * Math.pow(timeFraction - 1, 3) + Math.pow(timeFraction - 1, 2);
          }

          return Math.sqrt(1 - Math.pow(timeFraction - 1, 2));
        }.bind(this),
        callback: function (progress) {
          this.pos.current = this.animation.from + (this.animation.to - this.animation.from) * (progress || 0);
          this.element.firstElementChild.style.transform = "translate3d(" + this.pos.current + "px, 0, 0)";
        }.bind(this)
      });
    }
  }, {
    key: "onResize",
    value: function onResize(event) {
      this.resizeTimer && clearTimeout(this.resizeTimer);
      this.resizeTimer = setTimeout(function () {
        this.max = [Math.min(this.element.offsetWidth - this.element.firstElementChild.offsetWidth, 0), 0];
        this.goTo(this.index);
      }.bind(this), 150);
    }
  }]);

  return Slider;
}(); //====================//
// Анимации
//====================//


window.Animate = /*#__PURE__*/function () {
  function Animate(_ref) {
    var timing = _ref.timing,
        callback = _ref.callback,
        duration = _ref.duration;

    _classCallCheck(this, Animate);

    this.animateId = null;
    this.startTime = performance.now();
    this.stopTime = null;

    this.timing = timing || function (t) {
      return t;
    };

    this.callback = callback;
    this.duration = duration || 300;
    this.start();
  }

  _createClass(Animate, [{
    key: "animate",
    value: function animate(time) {
      var timeFraction = (time - this.startTime) / this.duration;
      if (timeFraction > 1) timeFraction = 1;
      var progress = this.timing(timeFraction);
      this.callback(progress);

      if (timeFraction < 1) {
        this.animateId = requestAnimate(this.animate.bind(this));
      } else {
        this.animateId = null;
      }
    }
  }, {
    key: "start",
    value: function start() {
      this.stopTime && (this.startTime += performance.now() - this.stopTime);
      !this.animateId && (this.animateId = requestAnimate(this.animate.bind(this)));
    }
  }, {
    key: "stop",
    value: function stop() {
      this.animateId && cancelAnimate(this.animateId);
      this.stopTime = performance.now();
      this.animateId = null;
    }
  }]);

  return Animate;
}(); //====================//
// Маски для полей ввода
//====================//


inputmask__WEBPACK_IMPORTED_MODULE_4___default.a.extendAliases({
  "name": {
    mask: "a{2,+}[ ][-]a{*}",
    jitMasking: true,
    autoUnmask: true,
    oncomplete: function oncomplete(event) {
      this.classList.remove("_error", "_empty");
    },
    onincomplete: function onincomplete(event) {
      this.classList.add("_error") || this.value || this.classList.add("_empty");
    }
  },
  "nominal": {
    alias: "numeric",
    greedy: true,
    rightAlign: false,
    groupSeparator: " ",
    unmaskAsNumber: false,
    min: 1000,
    max: 50000,
    SetMaxOnOverflow: true,
    oncomplete: function oncomplete() {
      var preset = this.parentElement.nextElementSibling.querySelector(".cert__preset[data-value=\"".concat(this.inputmask.unmaskedvalue(), "\"]"));
      preset || this.parentElement.nextElementSibling.Slider && this.parentElement.nextElementSibling.Slider.index && this.parentElement.nextElementSibling.Slider.index.classList.remove('_active');
      this.parentElement.nextElementSibling.Slider && this.parentElement.nextElementSibling.Slider.goTo(preset);
    }
  },
  "email": {
    required: true,
    inputmode: "email",
    oncomplete: function oncomplete(event) {
      this.classList.remove("_error", "_empty");
    },
    onincomplete: function onincomplete(event) {
      this.classList.add("_error") || this.value || this.classList.add("_empty");
    }
  },
  "tel": {
    mask: "+7 (999) 999-99-99",
    inputmode: "tel",
    onUnMask: function onUnMask(mValue, uValue) {
      return "+7" + uValue;
    },
    onBeforePaste: function onBeforePaste(pastedValue, opts) {
      return pastedValue = pastedValue.replace(/^(\+7)|(7)|(8)/, ""), "+" + pastedValue;
    },
    oncomplete: function oncomplete(event) {
      this.classList.remove("_error", "_empty");
    },
    onincomplete: function onincomplete(event) {
      this.classList.add("_error") || this.value || this.classList.add("_empty");
    }
  }
});
inputmask__WEBPACK_IMPORTED_MODULE_4___default.a.extendDefaults({
  showMaskOnHover: false,
  removeMaskOnSubmit: true
});

window.Certificate = /*#__PURE__*/function () {
  function Certificate(el, _ref2) {
    _objectDestructuringEmpty(_ref2);

    _classCallCheck(this, Certificate);

    if (el instanceof HTMLFormElement) {
      this.form = el;
    } else {
      this.form = document.querySelector(String(el));
    }

    this.form.Certificate = this;
    this.form.noValidate = true;
    this.form.onsubmit = this.submit.bind(this);
    this.form.addEventListener("change", this.refreshCheckout.bind(this));
    this.config = {
      newItemOnStart: true,
      maxItems: 0,
      itemType: {
        param: "ITEMS[#INDEX#][TYPE]",
        required: true,
        startIndex: 0,
        types: [{
          name: "Сертификат 1",
          value: "1",
          img: "./img/Сертификат 1.png",
          class: ""
        }, {
          name: "Сертификат 2",
          value: "2",
          img: "./img/Сертификат 2.png",
          class: ""
        }, {
          name: "Сертификат 3",
          value: "3",
          img: "./img/Сертификат 3.png",
          class: ""
        }, {
          name: "Сертификат 4",
          value: "4",
          img: "./img/Сертификат 4.png",
          class: ""
        }, {
          name: "Сертификат 5",
          value: "5",
          img: "./img/Сертификат 5.png",
          class: ""
        }]
      },
      itemNominal: {
        param: "ITEMS[#INDEX#][NOMINAL]",
        required: true,
        value: 1000,
        min: 1000,
        max: 50000,
        class: "_nominal",
        presets: [{
          name: "1 000",
          value: 1000,
          class: ""
        }, {
          name: "2 000",
          value: 2000,
          class: ""
        }, {
          name: "3 000",
          value: 3000,
          class: ""
        }, {
          name: "5 000",
          value: 5000,
          class: ""
        }, {
          name: "10 000",
          value: 10000,
          class: ""
        }, {
          name: "20 000",
          value: 20000,
          class: ""
        }, {
          name: "50 000",
          value: 50000,
          class: ""
        }]
      },
      recipient: [{
        type: "text",
        param: "ITEMS[#INDEX#][NAME]",
        placeholder: "Имя",
        title: "Имя",
        class: "_name",
        regexp: '^\\s?[A-Za-zА-Яа-яЁё]+\\s?-?[A-Za-zА-Яа-яЁё]+\\s?',
        required: true
      }, {
        type: "text",
        param: "ITEMS[#INDEX#][PHONE]",
        placeholder: "+7 (000) 000-00-00",
        title: "Телефон",
        class: "_tel",
        required: true,
        mask: "tel"
      }, {
        type: "text",
        param: "ITEMS[#INDEX#][EMAIL]",
        placeholder: "Email",
        title: "Email",
        class: "_email",
        required: true,
        mask: "email"
      }, {
        type: "text",
        param: "ITEMS[#INDEX#][TEXT]",
        placeholder: "Текст поздравления",
        class: "_text"
      }],
      datetime: {
        type: "datetime",
        param: "ITEMS[#INDEX#][DATE]",
        class: "_datetime",
        min: "today",
        max: "2022-10-25",
        toggle: {
          type: "checkbox",
          class: "",
          param: "ITEMS[#INDEX#][USE_DATE]",
          value: "Y",
          label: "Отложенная отправка",
          checked: false
        },
        timezone: {
          param: "ITEMS[#INDEX#][DATE_TIMEZONE]"
        }
      },
      sender: [{
        type: "text",
        param: "SENDER_NAME",
        placeholder: "Имя",
        class: "_name",
        required: true,
        regexp: '^\\s?[A-Za-zА-Яа-яЁё]+\\s?-?[A-Za-zА-Яа-яЁё]+\\s?'
      }, {
        type: "text",
        param: "SENDER_PHONE",
        placeholder: "+7 (000) 000-00-00",
        class: "_tel",
        required: true,
        mask: "tel"
      }, {
        type: "text",
        param: "SENDER_EMAIL",
        placeholder: "Email",
        class: "_email",
        required: true,
        mask: "email"
      }, {
        type: "checkbox",
        param: "SENDER_ANON",
        label: "Отправить анонимно",
        value: "Y",
        class: "cert__switch"
      }],
      policy: {
        text: "Нажимая на кнопку «Оформить», вы соглашаетесь с условиями #LINK#",
        link: {
          target: "_blank",
          text: "Политики конфиденциальности",
          url: "https://visagehall.ru/about/policy/"
        }
      }
    };
    this.init();
  }

  _createClass(Certificate, [{
    key: "init",
    value: function init() {
      this.items = [];
      this.isValid = false;
      this.createItem();
      this.add = this.form.appendChild(document.createElement('div'));
      this.add.className = "cert__add";
      var addBtn = this.add.appendChild(document.createElement('div'));
      addBtn.className = "cert__btn _add";
      addBtn.innerText = "Добавить сертификат";
      addBtn.addEventListener("click", this.createItem.bind(this));
      var sender = this.form.appendChild(document.createElement('div'));
      sender.className = "cert__sender";
      var senderHeadline = sender.appendChild(document.createElement('h4'));
      senderHeadline.innerText = "Ваши данные";

      for (var i = 0; i < this.config.sender.length; i++) {
        var v = this.config.sender[i];
        var field = sender.appendChild(document.createElement("div"));
        field.className = "cert__field";

        if (v.type == "checkbox") {
          (function () {
            field.innerText = v.label;
            field.classList.add("_switch");
            var label = field.appendChild(document.createElement("label"));
            label.className = "cert__switch";
            v.class && label.classList.add(v.class);
            var checkbox = label.appendChild(document.createElement("input"));
            checkbox.type = "checkbox";
            checkbox.value = v.value;
            checkbox.checked = !!v.checked;
            checkbox.required = !!v.required;
            checkbox.name = v.param;
            checkbox.addEventListener("change", function () {
              (this.checked || label.classList.remove('_active')) && label.classList.add('_active');
            });
          })();
        } else {
          var input = field.appendChild(document.createElement("input"));
          input.type = "text";
          input.required = !!v.required;
          input.className = "cert__input";
          v.value && (input.value = v.value);
          v.class && input.classList.add(v.class);
          v.placeholder && (input.placeholder = v.placeholder);
          input.name = v.param;
          v.mask && inputmask__WEBPACK_IMPORTED_MODULE_4___default()(v.mask).mask(input);
          v.regexp && (input.pattern = v.regexp);
        }
      }

      this.checkout = this.form.appendChild(document.createElement('div'));
      this.checkout.className = "cert__checkout";
      var checkoutBtn = this.checkout.appendChild(document.createElement('button'));
      checkoutBtn.className = "cert__btn _checkout";

      if (this.config.policy) {
        var policy = this.checkout.appendChild(document.createElement('p'));
        policy.className = "cert__policy";
        var policyLink = document.createElement('a');
        policyLink.innerText = String(this.config.policy.link.text);
        policyLink.href = String(this.config.policy.link.url);
        policyLink.target = String(this.config.policy.link.target);
        policy.innerHTML = String(this.config.policy.text).replace("#LINK#", policyLink.outerHTML);
      }

      this.refreshCheckout();
    }
  }, {
    key: "createItem",
    value: function createItem() {
      var _this = this;

      var fieldset = document.createElement("fieldset");
      fieldset.className = "cert__fieldset";
      (this.items.length > 0 || fieldset.classList.add("_new")) && fieldset.classList.add("_edit");
      var item = fieldset.appendChild(document.createElement("div"));
      item.className = "cert__item";
      (this.form.firstElementChild || !this.form.appendChild(fieldset)) && this.form.insertBefore(fieldset, this.add);
      var design = item.appendChild(document.createElement("div"));
      design.className = "cert__design";
      var designHeadline = design.appendChild(document.createElement("h4"));
      designHeadline.innerText = "Выберите дизайн";
      var types = design.appendChild(document.createElement("div"));
      types.className = "cert__types slider";
      var typesWrap = types.appendChild(document.createElement("div"));
      typesWrap.className = "slider__wrap";

      var _loop = function _loop(i) {
        var v = _this.config.itemType.types[i];
        var label = typesWrap.appendChild(document.createElement("label"));
        label.className = "cert__type";
        v.class && label.classList.add(v.class);
        label.title = v.name;
        var radio = label.appendChild(document.createElement("input"));
        radio.type = "radio";
        radio.name = _this.config.itemType.param.replace("#INDEX#", _this.items.length);
        radio.required = _this.config.itemType.required;
        radio.value = v.value;
        radio.addEventListener("change", function () {
          this.checked && types.Slider && types.Slider.goTo(label);
        });
        var img = label.appendChild(document.createElement("img"));
        img.className = "cert__img";
        img.src = v.img;
        img.alt = v.name;

        if (i == _this.config.itemType.startIndex) {
          label.classList.add("_active");
          radio.checked = true;
        }
      };

      for (var i = 0; i < this.config.itemType.types.length; i++) {
        _loop(i);
      }

      new Slider(types);
      var info = item.appendChild(document.createElement("div"));
      info.className = "cert__info";
      var nominal = info.appendChild(document.createElement("div"));
      nominal.className = "cert__nominal";
      var nominalHeadline = nominal.appendChild(document.createElement("h4"));
      nominalHeadline.innerText = "Номинал";
      var nominalField = nominal.appendChild(document.createElement("div"));
      nominalField.className = "cert__field";
      this.config.itemNominal.class && nominalField.classList.add(this.config.itemNominal.class);
      var nominalInput = nominalField.appendChild(document.createElement("input"));
      nominalInput.className = "cert__input";
      nominalInput.type = "text";
      nominalInput.name = this.config.itemNominal.param.replace("#INDEX#", this.items.length);
      nominalInput.required = this.config.itemNominal.required;
      nominalInput.value = this.config.itemNominal.value || this.config.itemNominal.min || 0;
      inputmask__WEBPACK_IMPORTED_MODULE_4___default()("nominal").mask(nominalInput);
      nominalInput.addEventListener("change", function (e) {
        nominalField.dataset.value = nominalInput.value;
      });
      nominalField.dataset.value = nominalInput.value;
      var presets = nominal.appendChild(document.createElement("div"));
      presets.className = "cert__presets slider";
      var presetsWrap = presets.appendChild(document.createElement("div"));
      presetsWrap.className = "slider__wrap";

      var _loop2 = function _loop2(_i) {
        var v = _this.config.itemNominal.presets[_i];
        var preset = presetsWrap.appendChild(document.createElement("div"));
        preset.className = "cert__preset";
        v.class && preset.classList.add(v.class);
        preset.dataset.value = v.value;
        preset.innerText = v.name;
        preset.addEventListener("click", function () {
          if (!fieldset.disabled) {
            nominalInput.value = preset.dataset.value;
            nominalField.dataset.value = nominalInput.value;
            presets.Slider && presets.Slider.goTo(preset);
            this.refreshCheckout();
          }
        }.bind(_this));

        if (nominalInput.value == preset.dataset.value) {
          preset.classList.add("_active");
        }
      };

      for (var _i = 0; _i < this.config.itemNominal.presets.length; _i++) {
        _loop2(_i);
      }

      new Slider(presets);
      var recipient = info.appendChild(document.createElement("div"));
      recipient.className = "cert__recipient";
      var recipientHeadline = recipient.appendChild(document.createElement("h4"));
      recipientHeadline.innerText = "Данные получателя";

      for (var _i2 = 0; _i2 < this.config.recipient.length; _i2++) {
        var v = this.config.recipient[_i2];
        var field = recipient.appendChild(document.createElement("div"));
        field.className = "cert__field";
        v.title && (field.title = v.title);
        var input = void 0;

        if (v.type == "textarea") {
          input = field.appendChild(document.createElement("textarea"));
          input.spellcheck = false;
          input.rows = 1;
        } else {
          input = field.appendChild(document.createElement("input"));
          input.type = "text";
        }

        input.required = !!v.required;
        input.className = "cert__input";
        v.value && (input.value = v.value);
        v.class && input.classList.add(v.class);
        v.placeholder && (input.placeholder = v.placeholder);
        input.name = v.param.replace("#INDEX#", this.items.length);
        v.mask && inputmask__WEBPACK_IMPORTED_MODULE_4___default()(v.mask).mask(input);
        v.regexp && (input.pattern = v.regexp);
      }

      var datetime = info.appendChild(document.createElement("div"));
      datetime.className = "cert__datetime";
      var datetimeFieldCheckbox = datetime.appendChild(document.createElement("div"));
      datetimeFieldCheckbox.className = "cert__field _switch";
      datetimeFieldCheckbox.innerText = this.config.datetime.toggle.label;
      this.config.datetime.toggle.class && datetimeFieldCheckbox.classList.add(this.config.datetime.toggle.class);
      var datetimeLabel = datetimeFieldCheckbox.appendChild(document.createElement("label"));
      datetimeLabel.className = "cert__switch";
      var datetimeCheckbox = datetimeLabel.appendChild(document.createElement("input"));
      datetimeCheckbox.type = "checkbox";
      datetimeCheckbox.value = this.config.datetime.toggle.value;
      datetimeCheckbox.checked = !!this.config.datetime.toggle.checked;
      datetimeCheckbox.required = !!this.config.datetime.toggle.required;
      datetimeCheckbox.name = this.config.datetime.toggle.param.replace("#INDEX#", this.items.length);
      datetimeCheckbox.addEventListener("change", function () {
        (this.checked || datetimeLabel.classList.remove('_active')) && datetimeLabel.classList.add('_active');
      });
      var datetimeField = datetime.appendChild(document.createElement("div"));
      datetimeField.className = "cert__field";
      this.config.datetime.toggle.checked || datetimeField.classList.add('_hidden');
      var datetimeInput = datetimeField.appendChild(document.createElement("input"));
      datetimeInput.className = "cert__input";
      datetimeInput.type = "text";
      this.config.datetime.value && (datetimeInput.value = this.config.datetime.value);
      datetimeInput.required = !!this.config.datetime.required;
      datetimeInput.name = this.config.datetime.param.replace("#INDEX#", this.items.length);
      new flatpickr__WEBPACK_IMPORTED_MODULE_2___default.a(datetimeInput, {
        enableTime: true,
        minDate: this.config.datetime.min,
        maxDate: this.config.datetime.max,
        defaultDate: new Date(),
        dateFormat: "d.m.Y H:i",
        time_24hr: true,
        disableMobile: "true",
        locale: flatpickr_dist_l10n_ru_js__WEBPACK_IMPORTED_MODULE_3__["Russian"],
        altInput: true,
        altFormat: "j F Y в H:i",
        monthSelectorType: "static"
      });
      var timezoneInput = datetime.appendChild(document.createElement("input"));
      timezoneInput.type = "hidden";
      timezoneInput.name = this.config.datetime.timezone.param.replace("#INDEX#", this.items.length);
      timezoneInput.value = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
      datetimeCheckbox.addEventListener("change", function () {
        if (this.checked) {
          datetimeLabel.classList.add('_active');
          datetimeField.classList.remove('_hidden');
        } else {
          datetimeField.classList.add('_hidden');
        }
      });
      var action = info.appendChild(document.createElement("div"));
      action.className = "cert__action";
      var save = action.appendChild(document.createElement("div"));
      save.innerText = "Сохранить";
      save.tabIndex = 0;
      save.className = "cert__btn _save";
      save.addEventListener("click", this.saveItem.bind(this, fieldset));
      save.addEventListener("keyup", function (event) {
        event.code == "Enter" && this.saveItem(fieldset);
      }.bind(this));
      var edit = action.appendChild(document.createElement("div"));
      edit.innerText = "Изменить";
      edit.tabIndex = 0;
      edit.className = "cert__btn _edit";
      edit.addEventListener("click", this.editItem.bind(this, fieldset));
      edit.addEventListener("keyup", function (event) {
        event.code == "Enter" && this.editItem(fieldset);
      }.bind(this));
      var remove = action.appendChild(document.createElement("div"));
      remove.innerText = "Удалить";
      remove.tabIndex = 0;
      remove.className = "cert__btn _remove";
      remove.addEventListener("click", this.removeItem.bind(this, fieldset));
      remove.addEventListener("keyup", function (event) {
        event.code == "Enter" && this.removeItem(fieldset);
      }.bind(this));
      this.items.push(fieldset);
    }
  }, {
    key: "saveItem",
    value: function saveItem(item) {
      if (this.validateItem(item)) {
        item.disabled = true;
        item.classList.add("_save");
        item.classList.remove("_new", "_edit");
      }

      this.refreshCheckout();
    }
  }, {
    key: "editItem",
    value: function editItem(item) {
      item.disabled = false;

      if (this.items.length > 1) {
        item.classList.add("_edit");
        item.classList.remove("_new", "_save");
      } else {
        item.classList.add("_new");
        item.classList.remove("_edit", "_save");
      }
    }
  }, {
    key: "removeItem",
    value: function removeItem(item) {
      this.form.removeChild(item);
      this.items.splice(this.items.indexOf(item), 1);
      this.refreshCheckout();
    }
  }, {
    key: "validateItem",
    value: function validateItem(item) {
      var isValid = true;

      var _iterator = _createForOfIteratorHelper(item.querySelectorAll('[name]')),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var input = _step.value;

          if (!input.validity.valid || input.inputmask && !input.inputmask.isValid()) {
            //isValid && input.reportValidity();
            isValid = false;
            input.classList.add("_error") || input.value || input.classList.add("_empty");
          } else {
            input.classList.remove("_error", "_empty");
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      return isValid;
    }
  }, {
    key: "validate",
    value: function validate() {
      return this.items.length > 0 && this.validateItem(this.form);
    }
  }, {
    key: "refreshCheckout",
    value: function refreshCheckout(e) {
      var value = 0;

      var _iterator2 = _createForOfIteratorHelper(this.form.querySelectorAll('.cert__nominal input')),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var i = _step2.value;
          value += +String(i.value).replace(" ", "");
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }

      var isValid = this.items.length > 0;

      var _iterator3 = _createForOfIteratorHelper(this.form.querySelectorAll('[name]')),
          _step3;

      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var input = _step3.value;

          if (!input.validity.valid || input.inputmask && !input.inputmask.isValid()) {
            isValid = false;
            e instanceof Event && input === e.target && (input.classList.add("_error") || input.value || input.classList.add("_empty"));
          } else {
            e instanceof Event && input === e.target && input.classList.remove("_error", "_empty");
          }
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }

      this.checkout.firstElementChild.disabled = !isValid;
      this.checkout.firstElementChild.innerText = value && "Оформить за " + inputmask__WEBPACK_IMPORTED_MODULE_4___default.a.format(value, {
        alias: "numeric",
        groupSeparator: " "
      }) + " ₽" || "Оформить";
    }
  }, {
    key: "submit",
    value: function submit() {
      if (this.validate()) {
        var _iterator4 = _createForOfIteratorHelper(this.items),
            _step4;

        try {
          for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
            var i = _step4.value;
            i.disabled = false;
          }
        } catch (err) {
          _iterator4.e(err);
        } finally {
          _iterator4.f();
        }

        return true;
      } else {
        return false;
      }
    }
  }]);

  return Certificate;
}();

/***/ })

/******/ });
//# sourceMappingURL=main.js.map