"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/panel/announcement",{

/***/ "./pages/panel/announcement.js":
/*!*************************************!*\
  !*** ./pages/panel/announcement.js ***!
  \*************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ Announcement; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/head */ \"./node_modules/next/head.js\");\n/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_head__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _components_panel_headlink__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/panel/headlink */ \"./pages/components/panel/headlink.js\");\n/* harmony import */ var _components_panel_sidebar__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/panel/sidebar */ \"./pages/components/panel/sidebar.js\");\n/* harmony import */ var _components_panel_menu__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/panel/menu */ \"./pages/components/panel/menu.js\");\n/* harmony import */ var _components_panel_scriptlink__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../components/panel/scriptlink */ \"./pages/components/panel/scriptlink.js\");\n/* harmony import */ var _components_panel_footer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../components/panel/footer */ \"./pages/components/panel/footer.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_7__);\n/* harmony import */ var _components_Checker__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../components/Checker */ \"./pages/components/Checker.js\");\n/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @/helpers */ \"./helpers/index.js\");\n\nvar _s = $RefreshSig$();\n\n\n\n\n\n\n\n\n\nfunction Announcement() {\n    _s();\n    const [announcements, setAnnouncements] = (0,react__WEBPACK_IMPORTED_MODULE_7__.useState)([]);\n    const fetchAnnouncements = async ()=>{\n        const resp = await (0,_helpers__WEBPACK_IMPORTED_MODULE_9__.req)(\"announcement\");\n        if (resp) {\n            setAnnouncements(resp);\n        }\n    };\n    (0,react__WEBPACK_IMPORTED_MODULE_7__.useEffect)(()=>{\n        fetchAnnouncements();\n    }, []);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_head__WEBPACK_IMPORTED_MODULE_1___default()), {\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"meta\", {\n                        charSet: \"utf-8\"\n                    }, void 0, false, {\n                        fileName: \"D:\\\\Projects\\\\Blockstack-Github\\\\FrantzdyTradingCo\\\\pages\\\\panel\\\\announcement.js\",\n                        lineNumber: 28,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"meta\", {\n                        name: \"viewport\",\n                        content: \"width=device-width, initial-scale=1\"\n                    }, void 0, false, {\n                        fileName: \"D:\\\\Projects\\\\Blockstack-Github\\\\FrantzdyTradingCo\\\\pages\\\\panel\\\\announcement.js\",\n                        lineNumber: 29,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"title\", {\n                        children: \"Frantzdy Trading CO - Trading become easier when you trade with us\"\n                    }, void 0, false, {\n                        fileName: \"D:\\\\Projects\\\\Blockstack-Github\\\\FrantzdyTradingCo\\\\pages\\\\panel\\\\announcement.js\",\n                        lineNumber: 30,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"meta\", {\n                        name: \"description\",\n                        content: \"Frantzdy Trading Co - Announcement\"\n                    }, void 0, false, {\n                        fileName: \"D:\\\\Projects\\\\Blockstack-Github\\\\FrantzdyTradingCo\\\\pages\\\\panel\\\\announcement.js\",\n                        lineNumber: 33,\n                        columnNumber: 9\n                    }, this)\n                ]\n            }, void 0, true, {\n                fileName: \"D:\\\\Projects\\\\Blockstack-Github\\\\FrantzdyTradingCo\\\\pages\\\\panel\\\\announcement.js\",\n                lineNumber: 27,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_Checker__WEBPACK_IMPORTED_MODULE_8__[\"default\"], {\n                tier: 1,\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_panel_headlink__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {}, void 0, false, {\n                        fileName: \"D:\\\\Projects\\\\Blockstack-Github\\\\FrantzdyTradingCo\\\\pages\\\\panel\\\\announcement.js\",\n                        lineNumber: 36,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_panel_menu__WEBPACK_IMPORTED_MODULE_4__[\"default\"], {}, void 0, false, {\n                        fileName: \"D:\\\\Projects\\\\Blockstack-Github\\\\FrantzdyTradingCo\\\\pages\\\\panel\\\\announcement.js\",\n                        lineNumber: 37,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_panel_sidebar__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {}, void 0, false, {\n                        fileName: \"D:\\\\Projects\\\\Blockstack-Github\\\\FrantzdyTradingCo\\\\pages\\\\panel\\\\announcement.js\",\n                        lineNumber: 38,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        className: \"content-wrapper\",\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"section\", {\n                                className: \"content-header\",\n                                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                    className: \"container-fluid\",\n                                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                        className: \"row mb-2\",\n                                        children: [\n                                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                                className: \"col-sm-6\",\n                                                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h1\", {\n                                                    children: \"ANNOUNCEMENT\"\n                                                }, void 0, false, {\n                                                    fileName: \"D:\\\\Projects\\\\Blockstack-Github\\\\FrantzdyTradingCo\\\\pages\\\\panel\\\\announcement.js\",\n                                                    lineNumber: 45,\n                                                    columnNumber: 19\n                                                }, this)\n                                            }, void 0, false, {\n                                                fileName: \"D:\\\\Projects\\\\Blockstack-Github\\\\FrantzdyTradingCo\\\\pages\\\\panel\\\\announcement.js\",\n                                                lineNumber: 44,\n                                                columnNumber: 17\n                                            }, this),\n                                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                                className: \"col-sm-6\",\n                                                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"a\", {\n                                                    class: \"btn btn-export box-shadow float-right\",\n                                                    href: \"../panel/createannouncement\",\n                                                    children: \"Create Announcement\"\n                                                }, void 0, false, {\n                                                    fileName: \"D:\\\\Projects\\\\Blockstack-Github\\\\FrantzdyTradingCo\\\\pages\\\\panel\\\\announcement.js\",\n                                                    lineNumber: 48,\n                                                    columnNumber: 19\n                                                }, this)\n                                            }, void 0, false, {\n                                                fileName: \"D:\\\\Projects\\\\Blockstack-Github\\\\FrantzdyTradingCo\\\\pages\\\\panel\\\\announcement.js\",\n                                                lineNumber: 47,\n                                                columnNumber: 17\n                                            }, this)\n                                        ]\n                                    }, void 0, true, {\n                                        fileName: \"D:\\\\Projects\\\\Blockstack-Github\\\\FrantzdyTradingCo\\\\pages\\\\panel\\\\announcement.js\",\n                                        lineNumber: 43,\n                                        columnNumber: 15\n                                    }, this)\n                                }, void 0, false, {\n                                    fileName: \"D:\\\\Projects\\\\Blockstack-Github\\\\FrantzdyTradingCo\\\\pages\\\\panel\\\\announcement.js\",\n                                    lineNumber: 42,\n                                    columnNumber: 13\n                                }, this)\n                            }, void 0, false, {\n                                fileName: \"D:\\\\Projects\\\\Blockstack-Github\\\\FrantzdyTradingCo\\\\pages\\\\panel\\\\announcement.js\",\n                                lineNumber: 41,\n                                columnNumber: 11\n                            }, this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                className: \"content\",\n                                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"section\", {\n                                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                        className: \"container-fluid\",\n                                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                            class: \"row\",\n                                            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                                className: \"col-lg-12\",\n                                                children: announcements && announcements.map((e, i)=>{\n                                                    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                                        id: \"accordion\",\n                                                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                                            className: \"card\",\n                                                            children: [\n                                                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"a\", {\n                                                                    className: \"d-block w-100\",\n                                                                    \"data-toggle\": \"collapse\",\n                                                                    href: \"#collapseOne\",\n                                                                    \"aria-expanded\": \"true\",\n                                                                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                                                        className: \"card-header\",\n                                                                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h4\", {\n                                                                            className: \"card-title\",\n                                                                            children: [\n                                                                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                                                                                    className: \"small mb-0\",\n                                                                                    children: (0,_helpers__WEBPACK_IMPORTED_MODULE_9__.formatDateLocal)(e.date)\n                                                                                }, void 0, false, {\n                                                                                    fileName: \"D:\\\\Projects\\\\Blockstack-Github\\\\FrantzdyTradingCo\\\\pages\\\\panel\\\\announcement.js\",\n                                                                                    lineNumber: 76,\n                                                                                    columnNumber: 37\n                                                                                }, this),\n                                                                                e.topic\n                                                                            ]\n                                                                        }, void 0, true, {\n                                                                            fileName: \"D:\\\\Projects\\\\Blockstack-Github\\\\FrantzdyTradingCo\\\\pages\\\\panel\\\\announcement.js\",\n                                                                            lineNumber: 75,\n                                                                            columnNumber: 35\n                                                                        }, this)\n                                                                    }, void 0, false, {\n                                                                        fileName: \"D:\\\\Projects\\\\Blockstack-Github\\\\FrantzdyTradingCo\\\\pages\\\\panel\\\\announcement.js\",\n                                                                        lineNumber: 74,\n                                                                        columnNumber: 33\n                                                                    }, this)\n                                                                }, void 0, false, {\n                                                                    fileName: \"D:\\\\Projects\\\\Blockstack-Github\\\\FrantzdyTradingCo\\\\pages\\\\panel\\\\announcement.js\",\n                                                                    lineNumber: 68,\n                                                                    columnNumber: 31\n                                                                }, this),\n                                                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                                                    id: \"collapseOne\",\n                                                                    className: \"collapse show\",\n                                                                    \"data-parent\": \"#accordion\",\n                                                                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                                                        className: \"card-body\",\n                                                                        children: e.description\n                                                                    }, void 0, false, {\n                                                                        fileName: \"D:\\\\Projects\\\\Blockstack-Github\\\\FrantzdyTradingCo\\\\pages\\\\panel\\\\announcement.js\",\n                                                                        lineNumber: 88,\n                                                                        columnNumber: 33\n                                                                    }, this)\n                                                                }, void 0, false, {\n                                                                    fileName: \"D:\\\\Projects\\\\Blockstack-Github\\\\FrantzdyTradingCo\\\\pages\\\\panel\\\\announcement.js\",\n                                                                    lineNumber: 83,\n                                                                    columnNumber: 31\n                                                                }, this)\n                                                            ]\n                                                        }, void 0, true, {\n                                                            fileName: \"D:\\\\Projects\\\\Blockstack-Github\\\\FrantzdyTradingCo\\\\pages\\\\panel\\\\announcement.js\",\n                                                            lineNumber: 67,\n                                                            columnNumber: 29\n                                                        }, this)\n                                                    }, void 0, false, {\n                                                        fileName: \"D:\\\\Projects\\\\Blockstack-Github\\\\FrantzdyTradingCo\\\\pages\\\\panel\\\\announcement.js\",\n                                                        lineNumber: 66,\n                                                        columnNumber: 27\n                                                    }, this);\n                                                })\n                                            }, void 0, false, {\n                                                fileName: \"D:\\\\Projects\\\\Blockstack-Github\\\\FrantzdyTradingCo\\\\pages\\\\panel\\\\announcement.js\",\n                                                lineNumber: 62,\n                                                columnNumber: 19\n                                            }, this)\n                                        }, void 0, false, {\n                                            fileName: \"D:\\\\Projects\\\\Blockstack-Github\\\\FrantzdyTradingCo\\\\pages\\\\panel\\\\announcement.js\",\n                                            lineNumber: 61,\n                                            columnNumber: 17\n                                        }, this)\n                                    }, void 0, false, {\n                                        fileName: \"D:\\\\Projects\\\\Blockstack-Github\\\\FrantzdyTradingCo\\\\pages\\\\panel\\\\announcement.js\",\n                                        lineNumber: 60,\n                                        columnNumber: 15\n                                    }, this)\n                                }, void 0, false, {\n                                    fileName: \"D:\\\\Projects\\\\Blockstack-Github\\\\FrantzdyTradingCo\\\\pages\\\\panel\\\\announcement.js\",\n                                    lineNumber: 59,\n                                    columnNumber: 13\n                                }, this)\n                            }, void 0, false, {\n                                fileName: \"D:\\\\Projects\\\\Blockstack-Github\\\\FrantzdyTradingCo\\\\pages\\\\panel\\\\announcement.js\",\n                                lineNumber: 58,\n                                columnNumber: 11\n                            }, this)\n                        ]\n                    }, void 0, true, {\n                        fileName: \"D:\\\\Projects\\\\Blockstack-Github\\\\FrantzdyTradingCo\\\\pages\\\\panel\\\\announcement.js\",\n                        lineNumber: 40,\n                        columnNumber: 9\n                    }, this)\n                ]\n            }, void 0, true, {\n                fileName: \"D:\\\\Projects\\\\Blockstack-Github\\\\FrantzdyTradingCo\\\\pages\\\\panel\\\\announcement.js\",\n                lineNumber: 35,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_panel_footer__WEBPACK_IMPORTED_MODULE_6__[\"default\"], {}, void 0, false, {\n                fileName: \"D:\\\\Projects\\\\Blockstack-Github\\\\FrantzdyTradingCo\\\\pages\\\\panel\\\\announcement.js\",\n                lineNumber: 102,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_panel_scriptlink__WEBPACK_IMPORTED_MODULE_5__[\"default\"], {}, void 0, false, {\n                fileName: \"D:\\\\Projects\\\\Blockstack-Github\\\\FrantzdyTradingCo\\\\pages\\\\panel\\\\announcement.js\",\n                lineNumber: 103,\n                columnNumber: 7\n            }, this)\n        ]\n    }, void 0, true);\n}\n_s(Announcement, \"MLdoeMpvfE/h4MWtwJbdCM8JQSU=\");\n_c = Announcement;\nvar _c;\n$RefreshReg$(_c, \"Announcement\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9wYW5lbC9hbm5vdW5jZW1lbnQuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUE2QjtBQUN1QjtBQUNGO0FBQ047QUFDWTtBQUNSO0FBQ2M7QUFDbEI7QUFDYztBQUUzQyxTQUFTYzs7SUFDdEIsTUFBTSxDQUFDQyxlQUFlQyxpQkFBaUIsR0FBR1AsK0NBQVFBLENBQUMsRUFBRTtJQUVyRCxNQUFNUSxxQkFBcUI7UUFDekIsTUFBTUMsT0FBTyxNQUFNUCw2Q0FBR0EsQ0FBQztRQUN2QixJQUFJTyxNQUFNO1lBQ1JGLGlCQUFpQkU7UUFDbkI7SUFDRjtJQUVBVixnREFBU0EsQ0FBQztRQUNSUztJQUNGLEdBQUcsRUFBRTtJQUVMLHFCQUNFOzswQkFDRSw4REFBQ2pCLGtEQUFJQTs7a0NBQ0gsOERBQUNtQjt3QkFBS0MsU0FBUTs7Ozs7O2tDQUNkLDhEQUFDRDt3QkFBS0UsTUFBSzt3QkFBV0MsU0FBUTs7Ozs7O2tDQUM5Qiw4REFBQ0M7a0NBQU07Ozs7OztrQ0FHUCw4REFBQ0o7d0JBQUtFLE1BQUs7d0JBQWNDLFNBQVE7Ozs7Ozs7Ozs7OzswQkFFbkMsOERBQUNaLDJEQUFPQTtnQkFBQ2MsTUFBTTs7a0NBQ2IsOERBQUN2QixrRUFBUUE7Ozs7O2tDQUNULDhEQUFDRSw4REFBSUE7Ozs7O2tDQUNMLDhEQUFDRCxpRUFBT0E7Ozs7O2tDQUVSLDhEQUFDdUI7d0JBQUlDLFdBQVU7OzBDQUNiLDhEQUFDQztnQ0FBUUQsV0FBVTswQ0FDakIsNEVBQUNEO29DQUFJQyxXQUFVOzhDQUNiLDRFQUFDRDt3Q0FBSUMsV0FBVTs7MERBQ2IsOERBQUNEO2dEQUFJQyxXQUFVOzBEQUNiLDRFQUFDRTs4REFBRzs7Ozs7Ozs7Ozs7MERBRU4sOERBQUNIO2dEQUFJQyxXQUFVOzBEQUNiLDRFQUFDRztvREFDQ0MsT0FBTTtvREFDTkMsTUFBSzs4REFDTjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzBDQU9ULDhEQUFDTjtnQ0FBSUMsV0FBVTswQ0FDYiw0RUFBQ0M7OENBQ0MsNEVBQUNGO3dDQUFJQyxXQUFVO2tEQUNiLDRFQUFDRDs0Q0FBSUssT0FBTTtzREFDVCw0RUFBQ0w7Z0RBQUlDLFdBQVU7MERBQ1pYLGlCQUNDQSxjQUFjaUIsR0FBRyxDQUFDLENBQUNDLEdBQUdDO29EQUNwQixxQkFDRSw4REFBQ1Q7d0RBQUlVLElBQUc7a0VBQ04sNEVBQUNWOzREQUFJQyxXQUFVOzs4RUFDYiw4REFBQ0c7b0VBQ0NILFdBQVU7b0VBQ1ZVLGVBQVk7b0VBQ1pMLE1BQUs7b0VBQ0xNLGlCQUFjOzhFQUVkLDRFQUFDWjt3RUFBSUMsV0FBVTtrRkFDYiw0RUFBQ1k7NEVBQUdaLFdBQVU7OzhGQUNaLDhEQUFDYTtvRkFBRWIsV0FBVTs4RkFDVmIseURBQWVBLENBQUNvQixFQUFFTyxJQUFJOzs7Ozs7Z0ZBRXhCUCxFQUFFUSxLQUFLOzs7Ozs7Ozs7Ozs7Ozs7Ozs4RUFJZCw4REFBQ2hCO29FQUNDVSxJQUFHO29FQUNIVCxXQUFVO29FQUNWZ0IsZUFBWTs4RUFFWiw0RUFBQ2pCO3dFQUFJQyxXQUFVO2tGQUFhTyxFQUFFVSxXQUFXOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2dEQUtuRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7MEJBU2hCLDhEQUFDdEMsZ0VBQU1BOzs7OzswQkFDUCw4REFBQ0Qsb0VBQVVBOzs7Ozs7O0FBR2pCO0dBL0Z3QlU7S0FBQUEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vcGFnZXMvcGFuZWwvYW5ub3VuY2VtZW50LmpzPzc1ZjciXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEhlYWQgZnJvbSBcIm5leHQvaGVhZFwiO1xyXG5pbXBvcnQgSGVhZExpbmsgZnJvbSBcIi4uL2NvbXBvbmVudHMvcGFuZWwvaGVhZGxpbmtcIjtcclxuaW1wb3J0IFNpZGViYXIgZnJvbSBcIi4uL2NvbXBvbmVudHMvcGFuZWwvc2lkZWJhclwiO1xyXG5pbXBvcnQgTWVudSBmcm9tIFwiLi4vY29tcG9uZW50cy9wYW5lbC9tZW51XCI7XHJcbmltcG9ydCBTY3JpcHRMaW5rIGZyb20gXCIuLi9jb21wb25lbnRzL3BhbmVsL3NjcmlwdGxpbmtcIjtcclxuaW1wb3J0IEZvb3RlciBmcm9tIFwiLi4vY29tcG9uZW50cy9wYW5lbC9mb290ZXJcIjtcclxuaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCwgdXNlRWZmZWN0LCB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgQ2hlY2tlciBmcm9tIFwiLi4vY29tcG9uZW50cy9DaGVja2VyXCI7XHJcbmltcG9ydCB7IHJlcSwgcG9zdFJlcSwgZm9ybWF0RGF0ZUxvY2FsIH0gZnJvbSBcIkAvaGVscGVyc1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gQW5ub3VuY2VtZW50KCkge1xyXG4gIGNvbnN0IFthbm5vdW5jZW1lbnRzLCBzZXRBbm5vdW5jZW1lbnRzXSA9IHVzZVN0YXRlKFtdKTtcclxuXHJcbiAgY29uc3QgZmV0Y2hBbm5vdW5jZW1lbnRzID0gYXN5bmMgKCkgPT4ge1xyXG4gICAgY29uc3QgcmVzcCA9IGF3YWl0IHJlcShcImFubm91bmNlbWVudFwiKTtcclxuICAgIGlmIChyZXNwKSB7XHJcbiAgICAgIHNldEFubm91bmNlbWVudHMocmVzcCk7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGZldGNoQW5ub3VuY2VtZW50cygpO1xyXG4gIH0sIFtdKTtcclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDw+XHJcbiAgICAgIDxIZWFkPlxyXG4gICAgICAgIDxtZXRhIGNoYXJTZXQ9XCJ1dGYtOFwiIC8+XHJcbiAgICAgICAgPG1ldGEgbmFtZT1cInZpZXdwb3J0XCIgY29udGVudD1cIndpZHRoPWRldmljZS13aWR0aCwgaW5pdGlhbC1zY2FsZT0xXCIgLz5cclxuICAgICAgICA8dGl0bGU+XHJcbiAgICAgICAgICBGcmFudHpkeSBUcmFkaW5nIENPIC0gVHJhZGluZyBiZWNvbWUgZWFzaWVyIHdoZW4geW91IHRyYWRlIHdpdGggdXNcclxuICAgICAgICA8L3RpdGxlPlxyXG4gICAgICAgIDxtZXRhIG5hbWU9XCJkZXNjcmlwdGlvblwiIGNvbnRlbnQ9XCJGcmFudHpkeSBUcmFkaW5nIENvIC0gQW5ub3VuY2VtZW50XCIgLz5cclxuICAgICAgPC9IZWFkPlxyXG4gICAgICA8Q2hlY2tlciB0aWVyPXsxfT5cclxuICAgICAgICA8SGVhZExpbmsgLz5cclxuICAgICAgICA8TWVudSAvPlxyXG4gICAgICAgIDxTaWRlYmFyIC8+XHJcblxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGVudC13cmFwcGVyXCI+XHJcbiAgICAgICAgICA8c2VjdGlvbiBjbGFzc05hbWU9XCJjb250ZW50LWhlYWRlclwiPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRhaW5lci1mbHVpZFwiPlxyXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93IG1iLTJcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLXNtLTZcIj5cclxuICAgICAgICAgICAgICAgICAgPGgxPkFOTk9VTkNFTUVOVDwvaDE+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLXNtLTZcIj5cclxuICAgICAgICAgICAgICAgICAgPGFcclxuICAgICAgICAgICAgICAgICAgICBjbGFzcz1cImJ0biBidG4tZXhwb3J0IGJveC1zaGFkb3cgZmxvYXQtcmlnaHRcIlxyXG4gICAgICAgICAgICAgICAgICAgIGhyZWY9XCIuLi9wYW5lbC9jcmVhdGVhbm5vdW5jZW1lbnRcIlxyXG4gICAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICAgICAgQ3JlYXRlIEFubm91bmNlbWVudFxyXG4gICAgICAgICAgICAgICAgICA8L2E+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8L3NlY3Rpb24+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRlbnRcIj5cclxuICAgICAgICAgICAgPHNlY3Rpb24+XHJcbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250YWluZXItZmx1aWRcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJyb3dcIj5cclxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtbGctMTJcIj5cclxuICAgICAgICAgICAgICAgICAgICB7YW5ub3VuY2VtZW50cyAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgYW5ub3VuY2VtZW50cy5tYXAoKGUsIGkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGlkPVwiYWNjb3JkaW9uXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNhcmRcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGFcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJkLWJsb2NrIHctMTAwXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhLXRvZ2dsZT1cImNvbGxhcHNlXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBocmVmPVwiI2NvbGxhcHNlT25lXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcmlhLWV4cGFuZGVkPVwidHJ1ZVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNhcmQtaGVhZGVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aDQgY2xhc3NOYW1lPVwiY2FyZC10aXRsZVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJzbWFsbCBtYi0wXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge2Zvcm1hdERhdGVMb2NhbChlLmRhdGUpfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3A+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtlLnRvcGljfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9oND5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9hPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ9XCJjb2xsYXBzZU9uZVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiY29sbGFwc2Ugc2hvd1wiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS1wYXJlbnQ9XCIjYWNjb3JkaW9uXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY2FyZC1ib2R5XCI+e2UuZGVzY3JpcHRpb259PC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgICAgICB9KX1cclxuICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9zZWN0aW9uPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvQ2hlY2tlcj5cclxuXHJcbiAgICAgIDxGb290ZXIgLz5cclxuICAgICAgPFNjcmlwdExpbmsgLz5cclxuICAgIDwvPlxyXG4gICk7XHJcbn1cclxuIl0sIm5hbWVzIjpbIkhlYWQiLCJIZWFkTGluayIsIlNpZGViYXIiLCJNZW51IiwiU2NyaXB0TGluayIsIkZvb3RlciIsIlJlYWN0IiwiQ29tcG9uZW50IiwidXNlRWZmZWN0IiwidXNlU3RhdGUiLCJDaGVja2VyIiwicmVxIiwicG9zdFJlcSIsImZvcm1hdERhdGVMb2NhbCIsIkFubm91bmNlbWVudCIsImFubm91bmNlbWVudHMiLCJzZXRBbm5vdW5jZW1lbnRzIiwiZmV0Y2hBbm5vdW5jZW1lbnRzIiwicmVzcCIsIm1ldGEiLCJjaGFyU2V0IiwibmFtZSIsImNvbnRlbnQiLCJ0aXRsZSIsInRpZXIiLCJkaXYiLCJjbGFzc05hbWUiLCJzZWN0aW9uIiwiaDEiLCJhIiwiY2xhc3MiLCJocmVmIiwibWFwIiwiZSIsImkiLCJpZCIsImRhdGEtdG9nZ2xlIiwiYXJpYS1leHBhbmRlZCIsImg0IiwicCIsImRhdGUiLCJ0b3BpYyIsImRhdGEtcGFyZW50IiwiZGVzY3JpcHRpb24iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./pages/panel/announcement.js\n"));

/***/ })

});