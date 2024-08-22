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

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ Announcement; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/head */ \"./node_modules/next/head.js\");\n/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_head__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _components_panel_headlink__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/panel/headlink */ \"./pages/components/panel/headlink.js\");\n/* harmony import */ var _components_panel_sidebar__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/panel/sidebar */ \"./pages/components/panel/sidebar.js\");\n/* harmony import */ var _components_panel_menu__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/panel/menu */ \"./pages/components/panel/menu.js\");\n/* harmony import */ var _components_panel_scriptlink__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../components/panel/scriptlink */ \"./pages/components/panel/scriptlink.js\");\n/* harmony import */ var _components_panel_footer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../components/panel/footer */ \"./pages/components/panel/footer.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_7__);\n/* harmony import */ var _components_Checker__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../components/Checker */ \"./pages/components/Checker.js\");\n/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @/helpers */ \"./helpers/index.js\");\n\nvar _s = $RefreshSig$();\n\n\n\n\n\n\n\n\n\nfunction Announcement() {\n    _s();\n    const [announcements, setAnnouncements] = (0,react__WEBPACK_IMPORTED_MODULE_7__.useState)([]);\n    const fetchAnnouncements = async ()=>{\n        const resp = await (0,_helpers__WEBPACK_IMPORTED_MODULE_9__.req)(\"announcement\");\n        if (resp) {\n            setAnnouncements(resp);\n        }\n    };\n    (0,react__WEBPACK_IMPORTED_MODULE_7__.useEffect)(()=>{\n        fetchAnnouncements();\n    }, []);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_head__WEBPACK_IMPORTED_MODULE_1___default()), {\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"meta\", {\n                        charSet: \"utf-8\"\n                    }, void 0, false, {\n                        fileName: \"D:\\\\Projects\\\\Blockstack-Github\\\\FrantzdyTradingCo\\\\pages\\\\panel\\\\announcement.js\",\n                        lineNumber: 28,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"meta\", {\n                        name: \"viewport\",\n                        content: \"width=device-width, initial-scale=1\"\n                    }, void 0, false, {\n                        fileName: \"D:\\\\Projects\\\\Blockstack-Github\\\\FrantzdyTradingCo\\\\pages\\\\panel\\\\announcement.js\",\n                        lineNumber: 29,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"title\", {\n                        children: \"Frantzdy Trading CO - Trading become easier when you trade with us\"\n                    }, void 0, false, {\n                        fileName: \"D:\\\\Projects\\\\Blockstack-Github\\\\FrantzdyTradingCo\\\\pages\\\\panel\\\\announcement.js\",\n                        lineNumber: 30,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"meta\", {\n                        name: \"description\",\n                        content: \"Frantzdy Trading Co - Announcement\"\n                    }, void 0, false, {\n                        fileName: \"D:\\\\Projects\\\\Blockstack-Github\\\\FrantzdyTradingCo\\\\pages\\\\panel\\\\announcement.js\",\n                        lineNumber: 33,\n                        columnNumber: 9\n                    }, this)\n                ]\n            }, void 0, true, {\n                fileName: \"D:\\\\Projects\\\\Blockstack-Github\\\\FrantzdyTradingCo\\\\pages\\\\panel\\\\announcement.js\",\n                lineNumber: 27,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_Checker__WEBPACK_IMPORTED_MODULE_8__[\"default\"], {\n                tier: 1,\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_panel_headlink__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {}, void 0, false, {\n                        fileName: \"D:\\\\Projects\\\\Blockstack-Github\\\\FrantzdyTradingCo\\\\pages\\\\panel\\\\announcement.js\",\n                        lineNumber: 36,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_panel_menu__WEBPACK_IMPORTED_MODULE_4__[\"default\"], {}, void 0, false, {\n                        fileName: \"D:\\\\Projects\\\\Blockstack-Github\\\\FrantzdyTradingCo\\\\pages\\\\panel\\\\announcement.js\",\n                        lineNumber: 37,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_panel_sidebar__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {}, void 0, false, {\n                        fileName: \"D:\\\\Projects\\\\Blockstack-Github\\\\FrantzdyTradingCo\\\\pages\\\\panel\\\\announcement.js\",\n                        lineNumber: 38,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        className: \"content-wrapper\",\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"section\", {\n                                className: \"content-header\",\n                                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                    className: \"container-fluid\",\n                                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                        className: \"row mb-2\",\n                                        children: [\n                                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                                className: \"col-sm-6\",\n                                                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h1\", {\n                                                    children: \"ANNOUNCEMENT\"\n                                                }, void 0, false, {\n                                                    fileName: \"D:\\\\Projects\\\\Blockstack-Github\\\\FrantzdyTradingCo\\\\pages\\\\panel\\\\announcement.js\",\n                                                    lineNumber: 45,\n                                                    columnNumber: 19\n                                                }, this)\n                                            }, void 0, false, {\n                                                fileName: \"D:\\\\Projects\\\\Blockstack-Github\\\\FrantzdyTradingCo\\\\pages\\\\panel\\\\announcement.js\",\n                                                lineNumber: 44,\n                                                columnNumber: 17\n                                            }, this),\n                                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                                className: \"col-sm-6\",\n                                                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"a\", {\n                                                    class: \"btn btn-export box-shadow float-right\",\n                                                    href: \"../panel/createannouncement\",\n                                                    children: \"Create Announcement\"\n                                                }, void 0, false, {\n                                                    fileName: \"D:\\\\Projects\\\\Blockstack-Github\\\\FrantzdyTradingCo\\\\pages\\\\panel\\\\announcement.js\",\n                                                    lineNumber: 48,\n                                                    columnNumber: 19\n                                                }, this)\n                                            }, void 0, false, {\n                                                fileName: \"D:\\\\Projects\\\\Blockstack-Github\\\\FrantzdyTradingCo\\\\pages\\\\panel\\\\announcement.js\",\n                                                lineNumber: 47,\n                                                columnNumber: 17\n                                            }, this)\n                                        ]\n                                    }, void 0, true, {\n                                        fileName: \"D:\\\\Projects\\\\Blockstack-Github\\\\FrantzdyTradingCo\\\\pages\\\\panel\\\\announcement.js\",\n                                        lineNumber: 43,\n                                        columnNumber: 15\n                                    }, this)\n                                }, void 0, false, {\n                                    fileName: \"D:\\\\Projects\\\\Blockstack-Github\\\\FrantzdyTradingCo\\\\pages\\\\panel\\\\announcement.js\",\n                                    lineNumber: 42,\n                                    columnNumber: 13\n                                }, this)\n                            }, void 0, false, {\n                                fileName: \"D:\\\\Projects\\\\Blockstack-Github\\\\FrantzdyTradingCo\\\\pages\\\\panel\\\\announcement.js\",\n                                lineNumber: 41,\n                                columnNumber: 11\n                            }, this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                className: \"content\",\n                                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"section\", {\n                                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                        className: \"container-fluid\",\n                                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                            class: \"row\",\n                                            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                                className: \"col-lg-12\",\n                                                children: announcements && announcements.map((e, i)=>{\n                                                    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                                        className: \"card mb-3\",\n                                                        children: [\n                                                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                                                className: \"card-header\",\n                                                                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h4\", {\n                                                                    className: \"card-title\",\n                                                                    children: [\n                                                                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                                                                            className: \"small text-primary\",\n                                                                            children: (0,_helpers__WEBPACK_IMPORTED_MODULE_9__.formatDateLocal)(e.date)\n                                                                        }, void 0, false, {\n                                                                            fileName: \"D:\\\\Projects\\\\Blockstack-Github\\\\FrantzdyTradingCo\\\\pages\\\\panel\\\\announcement.js\",\n                                                                            lineNumber: 69,\n                                                                            columnNumber: 33\n                                                                        }, this),\n                                                                        e.topic\n                                                                    ]\n                                                                }, void 0, true, {\n                                                                    fileName: \"D:\\\\Projects\\\\Blockstack-Github\\\\FrantzdyTradingCo\\\\pages\\\\panel\\\\announcement.js\",\n                                                                    lineNumber: 68,\n                                                                    columnNumber: 31\n                                                                }, this)\n                                                            }, void 0, false, {\n                                                                fileName: \"D:\\\\Projects\\\\Blockstack-Github\\\\FrantzdyTradingCo\\\\pages\\\\panel\\\\announcement.js\",\n                                                                lineNumber: 67,\n                                                                columnNumber: 29\n                                                            }, this),\n                                                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                                                className: \"card-body\",\n                                                                children: e.description\n                                                            }, void 0, false, {\n                                                                fileName: \"D:\\\\Projects\\\\Blockstack-Github\\\\FrantzdyTradingCo\\\\pages\\\\panel\\\\announcement.js\",\n                                                                lineNumber: 76,\n                                                                columnNumber: 29\n                                                            }, this)\n                                                        ]\n                                                    }, void 0, true, {\n                                                        fileName: \"D:\\\\Projects\\\\Blockstack-Github\\\\FrantzdyTradingCo\\\\pages\\\\panel\\\\announcement.js\",\n                                                        lineNumber: 66,\n                                                        columnNumber: 27\n                                                    }, this);\n                                                })\n                                            }, void 0, false, {\n                                                fileName: \"D:\\\\Projects\\\\Blockstack-Github\\\\FrantzdyTradingCo\\\\pages\\\\panel\\\\announcement.js\",\n                                                lineNumber: 62,\n                                                columnNumber: 19\n                                            }, this)\n                                        }, void 0, false, {\n                                            fileName: \"D:\\\\Projects\\\\Blockstack-Github\\\\FrantzdyTradingCo\\\\pages\\\\panel\\\\announcement.js\",\n                                            lineNumber: 61,\n                                            columnNumber: 17\n                                        }, this)\n                                    }, void 0, false, {\n                                        fileName: \"D:\\\\Projects\\\\Blockstack-Github\\\\FrantzdyTradingCo\\\\pages\\\\panel\\\\announcement.js\",\n                                        lineNumber: 60,\n                                        columnNumber: 15\n                                    }, this)\n                                }, void 0, false, {\n                                    fileName: \"D:\\\\Projects\\\\Blockstack-Github\\\\FrantzdyTradingCo\\\\pages\\\\panel\\\\announcement.js\",\n                                    lineNumber: 59,\n                                    columnNumber: 13\n                                }, this)\n                            }, void 0, false, {\n                                fileName: \"D:\\\\Projects\\\\Blockstack-Github\\\\FrantzdyTradingCo\\\\pages\\\\panel\\\\announcement.js\",\n                                lineNumber: 58,\n                                columnNumber: 11\n                            }, this)\n                        ]\n                    }, void 0, true, {\n                        fileName: \"D:\\\\Projects\\\\Blockstack-Github\\\\FrantzdyTradingCo\\\\pages\\\\panel\\\\announcement.js\",\n                        lineNumber: 40,\n                        columnNumber: 9\n                    }, this)\n                ]\n            }, void 0, true, {\n                fileName: \"D:\\\\Projects\\\\Blockstack-Github\\\\FrantzdyTradingCo\\\\pages\\\\panel\\\\announcement.js\",\n                lineNumber: 35,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_panel_footer__WEBPACK_IMPORTED_MODULE_6__[\"default\"], {}, void 0, false, {\n                fileName: \"D:\\\\Projects\\\\Blockstack-Github\\\\FrantzdyTradingCo\\\\pages\\\\panel\\\\announcement.js\",\n                lineNumber: 88,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_panel_scriptlink__WEBPACK_IMPORTED_MODULE_5__[\"default\"], {}, void 0, false, {\n                fileName: \"D:\\\\Projects\\\\Blockstack-Github\\\\FrantzdyTradingCo\\\\pages\\\\panel\\\\announcement.js\",\n                lineNumber: 89,\n                columnNumber: 7\n            }, this)\n        ]\n    }, void 0, true);\n}\n_s(Announcement, \"MLdoeMpvfE/h4MWtwJbdCM8JQSU=\");\n_c = Announcement;\nvar _c;\n$RefreshReg$(_c, \"Announcement\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9wYW5lbC9hbm5vdW5jZW1lbnQuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUE2QjtBQUN1QjtBQUNGO0FBQ047QUFDWTtBQUNSO0FBQ2M7QUFDbEI7QUFDYztBQUUzQyxTQUFTYzs7SUFDdEIsTUFBTSxDQUFDQyxlQUFlQyxpQkFBaUIsR0FBR1AsK0NBQVFBLENBQUMsRUFBRTtJQUVyRCxNQUFNUSxxQkFBcUI7UUFDekIsTUFBTUMsT0FBTyxNQUFNUCw2Q0FBR0EsQ0FBQztRQUN2QixJQUFJTyxNQUFNO1lBQ1JGLGlCQUFpQkU7UUFDbkI7SUFDRjtJQUVBVixnREFBU0EsQ0FBQztRQUNSUztJQUNGLEdBQUcsRUFBRTtJQUVMLHFCQUNFOzswQkFDRSw4REFBQ2pCLGtEQUFJQTs7a0NBQ0gsOERBQUNtQjt3QkFBS0MsU0FBUTs7Ozs7O2tDQUNkLDhEQUFDRDt3QkFBS0UsTUFBSzt3QkFBV0MsU0FBUTs7Ozs7O2tDQUM5Qiw4REFBQ0M7a0NBQU07Ozs7OztrQ0FHUCw4REFBQ0o7d0JBQUtFLE1BQUs7d0JBQWNDLFNBQVE7Ozs7Ozs7Ozs7OzswQkFFbkMsOERBQUNaLDJEQUFPQTtnQkFBQ2MsTUFBTTs7a0NBQ2IsOERBQUN2QixrRUFBUUE7Ozs7O2tDQUNULDhEQUFDRSw4REFBSUE7Ozs7O2tDQUNMLDhEQUFDRCxpRUFBT0E7Ozs7O2tDQUVSLDhEQUFDdUI7d0JBQUlDLFdBQVU7OzBDQUNiLDhEQUFDQztnQ0FBUUQsV0FBVTswQ0FDakIsNEVBQUNEO29DQUFJQyxXQUFVOzhDQUNiLDRFQUFDRDt3Q0FBSUMsV0FBVTs7MERBQ2IsOERBQUNEO2dEQUFJQyxXQUFVOzBEQUNiLDRFQUFDRTs4REFBRzs7Ozs7Ozs7Ozs7MERBRU4sOERBQUNIO2dEQUFJQyxXQUFVOzBEQUNiLDRFQUFDRztvREFDQ0MsT0FBTTtvREFDTkMsTUFBSzs4REFDTjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzBDQU9ULDhEQUFDTjtnQ0FBSUMsV0FBVTswQ0FDYiw0RUFBQ0M7OENBQ0MsNEVBQUNGO3dDQUFJQyxXQUFVO2tEQUNiLDRFQUFDRDs0Q0FBSUssT0FBTTtzREFDVCw0RUFBQ0w7Z0RBQUlDLFdBQVU7MERBQ1pYLGlCQUNDQSxjQUFjaUIsR0FBRyxDQUFDLENBQUNDLEdBQUdDO29EQUNwQixxQkFDRSw4REFBQ1Q7d0RBQUlDLFdBQVU7OzBFQUNiLDhEQUFDRDtnRUFBSUMsV0FBVTswRUFDYiw0RUFBQ1M7b0VBQUdULFdBQVU7O3NGQUNaLDhEQUFDVTs0RUFBRVYsV0FBVTtzRkFDVmIseURBQWVBLENBQUNvQixFQUFFSSxJQUFJOzs7Ozs7d0VBRXhCSixFQUFFSyxLQUFLOzs7Ozs7Ozs7Ozs7MEVBSVosOERBQUNiO2dFQUFJQyxXQUFVOzBFQUFhTyxFQUFFTSxXQUFXOzs7Ozs7Ozs7Ozs7Z0RBRy9DOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzswQkFTaEIsOERBQUNsQyxnRUFBTUE7Ozs7OzBCQUNQLDhEQUFDRCxvRUFBVUE7Ozs7Ozs7QUFHakI7R0FqRndCVTtLQUFBQSIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9wYWdlcy9wYW5lbC9hbm5vdW5jZW1lbnQuanM/NzVmNyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgSGVhZCBmcm9tIFwibmV4dC9oZWFkXCI7XHJcbmltcG9ydCBIZWFkTGluayBmcm9tIFwiLi4vY29tcG9uZW50cy9wYW5lbC9oZWFkbGlua1wiO1xyXG5pbXBvcnQgU2lkZWJhciBmcm9tIFwiLi4vY29tcG9uZW50cy9wYW5lbC9zaWRlYmFyXCI7XHJcbmltcG9ydCBNZW51IGZyb20gXCIuLi9jb21wb25lbnRzL3BhbmVsL21lbnVcIjtcclxuaW1wb3J0IFNjcmlwdExpbmsgZnJvbSBcIi4uL2NvbXBvbmVudHMvcGFuZWwvc2NyaXB0bGlua1wiO1xyXG5pbXBvcnQgRm9vdGVyIGZyb20gXCIuLi9jb21wb25lbnRzL3BhbmVsL2Zvb3RlclwiO1xyXG5pbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50LCB1c2VFZmZlY3QsIHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCBDaGVja2VyIGZyb20gXCIuLi9jb21wb25lbnRzL0NoZWNrZXJcIjtcclxuaW1wb3J0IHsgcmVxLCBwb3N0UmVxLCBmb3JtYXREYXRlTG9jYWwgfSBmcm9tIFwiQC9oZWxwZXJzXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBBbm5vdW5jZW1lbnQoKSB7XHJcbiAgY29uc3QgW2Fubm91bmNlbWVudHMsIHNldEFubm91bmNlbWVudHNdID0gdXNlU3RhdGUoW10pO1xyXG5cclxuICBjb25zdCBmZXRjaEFubm91bmNlbWVudHMgPSBhc3luYyAoKSA9PiB7XHJcbiAgICBjb25zdCByZXNwID0gYXdhaXQgcmVxKFwiYW5ub3VuY2VtZW50XCIpO1xyXG4gICAgaWYgKHJlc3ApIHtcclxuICAgICAgc2V0QW5ub3VuY2VtZW50cyhyZXNwKTtcclxuICAgIH1cclxuICB9O1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgZmV0Y2hBbm5vdW5jZW1lbnRzKCk7XHJcbiAgfSwgW10pO1xyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPD5cclxuICAgICAgPEhlYWQ+XHJcbiAgICAgICAgPG1ldGEgY2hhclNldD1cInV0Zi04XCIgLz5cclxuICAgICAgICA8bWV0YSBuYW1lPVwidmlld3BvcnRcIiBjb250ZW50PVwid2lkdGg9ZGV2aWNlLXdpZHRoLCBpbml0aWFsLXNjYWxlPTFcIiAvPlxyXG4gICAgICAgIDx0aXRsZT5cclxuICAgICAgICAgIEZyYW50emR5IFRyYWRpbmcgQ08gLSBUcmFkaW5nIGJlY29tZSBlYXNpZXIgd2hlbiB5b3UgdHJhZGUgd2l0aCB1c1xyXG4gICAgICAgIDwvdGl0bGU+XHJcbiAgICAgICAgPG1ldGEgbmFtZT1cImRlc2NyaXB0aW9uXCIgY29udGVudD1cIkZyYW50emR5IFRyYWRpbmcgQ28gLSBBbm5vdW5jZW1lbnRcIiAvPlxyXG4gICAgICA8L0hlYWQ+XHJcbiAgICAgIDxDaGVja2VyIHRpZXI9ezF9PlxyXG4gICAgICAgIDxIZWFkTGluayAvPlxyXG4gICAgICAgIDxNZW51IC8+XHJcbiAgICAgICAgPFNpZGViYXIgLz5cclxuXHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250ZW50LXdyYXBwZXJcIj5cclxuICAgICAgICAgIDxzZWN0aW9uIGNsYXNzTmFtZT1cImNvbnRlbnQtaGVhZGVyXCI+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGFpbmVyLWZsdWlkXCI+XHJcbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3cgbWItMlwiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtc20tNlwiPlxyXG4gICAgICAgICAgICAgICAgICA8aDE+QU5OT1VOQ0VNRU5UPC9oMT5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtc20tNlwiPlxyXG4gICAgICAgICAgICAgICAgICA8YVxyXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzPVwiYnRuIGJ0bi1leHBvcnQgYm94LXNoYWRvdyBmbG9hdC1yaWdodFwiXHJcbiAgICAgICAgICAgICAgICAgICAgaHJlZj1cIi4uL3BhbmVsL2NyZWF0ZWFubm91bmNlbWVudFwiXHJcbiAgICAgICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgICAgICBDcmVhdGUgQW5ub3VuY2VtZW50XHJcbiAgICAgICAgICAgICAgICAgIDwvYT5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDwvc2VjdGlvbj5cclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGVudFwiPlxyXG4gICAgICAgICAgICA8c2VjdGlvbj5cclxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRhaW5lci1mbHVpZFwiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInJvd1wiPlxyXG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC1sZy0xMlwiPlxyXG4gICAgICAgICAgICAgICAgICAgIHthbm5vdW5jZW1lbnRzICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICBhbm5vdW5jZW1lbnRzLm1hcCgoZSwgaSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY2FyZCBtYi0zXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNhcmQtaGVhZGVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxoNCBjbGFzc05hbWU9XCJjYXJkLXRpdGxlXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwic21hbGwgdGV4dC1wcmltYXJ5XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7Zm9ybWF0RGF0ZUxvY2FsKGUuZGF0ZSl9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9wPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtlLnRvcGljfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2g0PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjYXJkLWJvZHlcIj57ZS5kZXNjcmlwdGlvbn08L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICAgICAgIH0pfVxyXG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L3NlY3Rpb24+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9DaGVja2VyPlxyXG5cclxuICAgICAgPEZvb3RlciAvPlxyXG4gICAgICA8U2NyaXB0TGluayAvPlxyXG4gICAgPC8+XHJcbiAgKTtcclxufVxyXG4iXSwibmFtZXMiOlsiSGVhZCIsIkhlYWRMaW5rIiwiU2lkZWJhciIsIk1lbnUiLCJTY3JpcHRMaW5rIiwiRm9vdGVyIiwiUmVhY3QiLCJDb21wb25lbnQiLCJ1c2VFZmZlY3QiLCJ1c2VTdGF0ZSIsIkNoZWNrZXIiLCJyZXEiLCJwb3N0UmVxIiwiZm9ybWF0RGF0ZUxvY2FsIiwiQW5ub3VuY2VtZW50IiwiYW5ub3VuY2VtZW50cyIsInNldEFubm91bmNlbWVudHMiLCJmZXRjaEFubm91bmNlbWVudHMiLCJyZXNwIiwibWV0YSIsImNoYXJTZXQiLCJuYW1lIiwiY29udGVudCIsInRpdGxlIiwidGllciIsImRpdiIsImNsYXNzTmFtZSIsInNlY3Rpb24iLCJoMSIsImEiLCJjbGFzcyIsImhyZWYiLCJtYXAiLCJlIiwiaSIsImg0IiwicCIsImRhdGUiLCJ0b3BpYyIsImRlc2NyaXB0aW9uIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./pages/panel/announcement.js\n"));

/***/ })

});