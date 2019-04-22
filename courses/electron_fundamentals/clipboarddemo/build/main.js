/******/ (function(modules) { // webpackBootstrap
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
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/main.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! electron */ \"electron\");\n/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(electron__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! path */ \"path\");\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_1__);\n\n\nconst STACK_SIZE = 3;\nconst ITEM_MAX_LENGTH = 20;\nfunction addToStack(item, stack) {\n    return [item].concat(stack.length >= STACK_SIZE ? stack.slice(0, -1) : stack);\n}\nfunction formatMenuTemplateForStack(clipboard, stack) {\n    return stack.map((item, i) => ({\n        label: `Copy: ${formatItem(item)}`,\n        click: (_) => clipboard.writeText(item),\n        accelerator: `CmdOrCtrl+Alt+${i + 1}`\n    }));\n}\nfunction formatItem(item) {\n    return item && item.length > ITEM_MAX_LENGTH\n        ? item.substr(0, ITEM_MAX_LENGTH) + '...'\n        : item;\n}\nfunction clipboardChangeListener(clipboard, onChange) {\n    let cache = clipboard.readText();\n    let latest = '';\n    setInterval(_ => {\n        latest = clipboard.readText();\n        if (latest !== cache) {\n            cache = latest;\n            onChange(cache);\n        }\n    }, 1000);\n}\nfunction registerGlobalShortcuts(globalShortcut, clipboard, stack) {\n    globalShortcut.unregisterAll();\n    stack.forEach((item, i) => {\n        globalShortcut.register(`CmdOrCtrl+Alt+${i + 1}`, (_) => {\n            clipboard.writeText(item);\n        });\n    });\n}\nelectron__WEBPACK_IMPORTED_MODULE_0__[\"app\"].on('ready', (_) => {\n    let stack = [];\n    const menuTemplate = [\n        { label: '<Empty>', enabled: false }\n    ];\n    const tray = new electron__WEBPACK_IMPORTED_MODULE_0__[\"Tray\"](path__WEBPACK_IMPORTED_MODULE_1___default.a.join('src', 'trayIcon.png'));\n    tray.setContextMenu(electron__WEBPACK_IMPORTED_MODULE_0__[\"Menu\"].buildFromTemplate(menuTemplate));\n    clipboardChangeListener(electron__WEBPACK_IMPORTED_MODULE_0__[\"clipboard\"], (text) => {\n        stack = addToStack(text, stack);\n        tray.setContextMenu(electron__WEBPACK_IMPORTED_MODULE_0__[\"Menu\"].buildFromTemplate(formatMenuTemplateForStack(electron__WEBPACK_IMPORTED_MODULE_0__[\"clipboard\"], stack)));\n        registerGlobalShortcuts(electron__WEBPACK_IMPORTED_MODULE_0__[\"globalShortcut\"], electron__WEBPACK_IMPORTED_MODULE_0__[\"clipboard\"], stack);\n    });\n});\nelectron__WEBPACK_IMPORTED_MODULE_0__[\"app\"].on('will-quit', (_) => {\n    electron__WEBPACK_IMPORTED_MODULE_0__[\"globalShortcut\"].unregisterAll();\n});\n\n\n//# sourceURL=webpack:///./src/main.ts?");

/***/ }),

/***/ "electron":
/*!***************************!*\
  !*** external "electron" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"electron\");\n\n//# sourceURL=webpack:///external_%22electron%22?");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"path\");\n\n//# sourceURL=webpack:///external_%22path%22?");

/***/ })

/******/ });