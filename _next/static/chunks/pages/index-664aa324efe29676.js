(self["webpackChunk_N_E"] = self["webpackChunk_N_E"] || []).push([[405],{

/***/ 3454:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var _global_process, _global_process1;
module.exports = ((_global_process = __webpack_require__.g.process) == null ? void 0 : _global_process.env) && typeof ((_global_process1 = __webpack_require__.g.process) == null ? void 0 : _global_process1.env) === "object" ? __webpack_require__.g.process : __webpack_require__(7663);

//# sourceMappingURL=process.js.map

/***/ }),

/***/ 9208:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {


    (window.__NEXT_P = window.__NEXT_P || []).push([
      "/",
      function () {
        return __webpack_require__(2052);
      }
    ]);
    if(false) {}
  

/***/ }),

/***/ 570:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5893);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7294);


const BurnForm = (param)=>{
    let { burnAmount, setBurnAmount, burnRecipientAddress, setBurnRecipientAddress, onBurnTokens } = param;
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("section", {
        className: "flex flex-col items-center p-4 bg-gray-50 rounded-lg shadow space-y-3",
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h2", {
                className: "text-lg font-semibold text-gray-700",
                children: "Burn Tokens"
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "w-full",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
                        htmlFor: "burnAmount",
                        className: "sr-only",
                        children: "Amount to Burn"
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
                        id: "burnAmount",
                        type: "number",
                        value: burnAmount,
                        onChange: (e)=>setBurnAmount(Number(e.target.value)),
                        className: "w-full p-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400  focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500  disabled:bg-gray-100 disabled:text-gray-500 disabled:border-gray-200  invalid:border-red-500 invalid:text-red-600  focus:invalid:border-red-500 focus:invalid:ring-red-500",
                        min: "0"
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "w-full",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
                        htmlFor: "burnRecipientAddress",
                        className: "sr-only",
                        children: "Address"
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
                        id: "burnRecipientAddress",
                        type: "text",
                        value: burnRecipientAddress,
                        onChange: (e)=>setBurnRecipientAddress(e.target.value),
                        className: "w-full p-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400  focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500  disabled:bg-gray-100 disabled:text-gray-500 disabled:border-gray-200",
                        placeholder: "Recipient's Address"
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                onClick: onBurnTokens,
                className: "w-full px-5 py-3 text-sm font-medium text-white transition-colors duration-150 bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 focus:outline-none",
                children: "Burn Tokens"
            })
        ]
    });
};
/* harmony default export */ __webpack_exports__.Z = (BurnForm);


/***/ }),

/***/ 8122:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: function() { return /* binding */ GradientBG; }
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5893);
/* harmony import */ var _styles_Home_module_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1110);
/* harmony import */ var _styles_Home_module_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_styles_Home_module_css__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7294);
// @ts-nocheck



function GradientBG(param) {
    let { children } = param;
    const canvasRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const [context, setContext] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [pixels, setPixels] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
    function Color(h, s, l, a) {
        this.h = h;
        this.s = s;
        this.l = l;
        this.a = a;
        this.dir = Math.random() > 0.5 ? -1 : 1;
        this.toString = function() {
            return "hsla(" + this.h + ", " + this.s + "%, " + this.l + "%, " + this.a + ")";
        };
    }
    function Pixel(x, y, w, h, color) {
        this.x = {
            c: x,
            min: 0,
            max: canvasRef.current.width,
            dir: Math.random() > 0.5 ? -1 : 1
        };
        this.y = {
            c: y,
            min: 0,
            max: canvasRef.current.height,
            dir: Math.random() > 0.5 ? -1 : 1
        };
        this.w = {
            c: w,
            min: 2,
            max: canvasRef.current.width,
            dir: Math.random() > 0.5 ? -1 : 1
        };
        this.h = {
            c: h,
            min: 2,
            max: canvasRef.current.height,
            dir: Math.random() > 0.5 ? -1 : 1
        };
        this.color = color;
        this.direction = Math.random() > 0.1 ? -1 : 1;
        this.velocity = (Math.random() * 100 + 100) * 0.01 * this.direction;
    }
    function updatePixel(pixel) {
        if (pixel.x.c <= pixel.x.min || pixel.x.c >= pixel.x.max) {
            pixel.x.dir *= -1;
        }
        if (pixel.y.c <= pixel.y.min || pixel.y.c >= pixel.y.max) {
            pixel.y.dir *= -1;
        }
        if (pixel.w.c <= pixel.w.min || pixel.w.c >= pixel.w.max) {
            pixel.w.dir *= -1;
        }
        if (pixel.h.c <= pixel.h.min || pixel.h.c >= pixel.h.max) {
            pixel.h.dir *= -1;
        }
        if (pixel.color.a <= 0 || pixel.color.a >= 0.75) {
            pixel.color.dir *= -1;
        }
        pixel.x.c += 0.005 * pixel.x.dir;
        pixel.y.c += 0.005 * pixel.y.dir;
        pixel.w.c += 0.005 * pixel.w.dir;
        pixel.h.c += 0.005 * pixel.h.dir;
    }
    function renderPixel(pixel) {
        context.restore();
        context.fillStyle = pixel.color.toString();
        context.fillRect(pixel.x.c, pixel.y.c, pixel.w.c, pixel.h.c);
    }
    function paint() {
        if (canvasRef.current) {
            context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
            for(let i = 0; i < pixels.length; i++){
                updatePixel(pixels[i]);
                renderPixel(pixels[i]);
            }
        }
    }
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (canvasRef.current) {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext("2d");
            setContext(ctx);
            const currentPixels = [
                new Pixel(1, 1, 3, 4, new Color(252, 70, 67, 0.8)),
                new Pixel(0, 0, 1, 1, new Color(0, 0, 98, 1)),
                new Pixel(0, 3, 2, 2, new Color(11, 100, 62, 0.8)),
                new Pixel(4, 0, 4, 3, new Color(190, 94, 75, 0.8)),
                new Pixel(3, 1, 1, 2, new Color(324, 98, 50, 0.1))
            ];
            setPixels(currentPixels);
        }
    }, []);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        let animationFrameId;
        if (context) {
            const animate = ()=>{
                paint();
                animationFrameId = window.requestAnimationFrame(animate);
            };
            animate();
        }
        return ()=>{
            window.cancelAnimationFrame(animationFrameId);
        };
    }, [
        paint,
        pixels,
        context
    ]);
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                className: (_styles_Home_module_css__WEBPACK_IMPORTED_MODULE_2___default().background),
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("canvas", {
                    className: (_styles_Home_module_css__WEBPACK_IMPORTED_MODULE_2___default().backgroundGradients),
                    width: "6",
                    height: "6",
                    ref: canvasRef
                })
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                className: (_styles_Home_module_css__WEBPACK_IMPORTED_MODULE_2___default().container),
                children: children
            })
        ]
    });
}


/***/ }),

/***/ 3055:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5893);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7294);
/* harmony import */ var _barrel_optimize_names_FaSpinner_react_icons_fa__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9583);



const LoadingSpinner = (param)=>{
    let { active, text = "Processing...", transactionUrl } = param;
    if (!active) return null;
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "flex flex-col items-center justify-center p-4 bg-gray-50 rounded-lg shadow mt-4",
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_FaSpinner_react_icons_fa__WEBPACK_IMPORTED_MODULE_2__/* .FaSpinner */ .fCD, {
                className: "animate-spin text-3xl text-blue-600",
                "aria-hidden": "true"
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                className: "mt-2 text-center",
                children: transactionUrl ? // If transactionUrl is provided, show it as a clickable link
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("a", {
                    href: transactionUrl,
                    className: "text-blue-600 hover:text-blue-700 transition-colors duration-150",
                    target: "_blank",
                    rel: "noopener noreferrer",
                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                        className: "text-sm font-medium",
                        children: "Transaction Details"
                    })
                }) : // If transactionUrl is not provided, show the text
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                    className: "text-sm text-blue-600",
                    children: text
                })
            })
        ]
    });
};
/* harmony default export */ __webpack_exports__.Z = (LoadingSpinner);


/***/ }),

/***/ 2842:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5893);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7294);


const MintForm = (param)=>{
    let { mintAmount, setMintAmount, mintRecipientAddress, mintAdminPrivateKey, setMintAdminPrivateKey, setMintRecipientAddress, onMintTokens } = param;
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("section", {
        className: "flex flex-col items-center p-4 bg-gray-50 rounded-lg shadow space-y-3",
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h2", {
                className: "text-lg font-semibold text-gray-700",
                children: "Mint Your Tokens"
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "w-full",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
                        htmlFor: "mintAmount",
                        className: "sr-only",
                        children: "Amount to Mint"
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
                        id: "mintAmount",
                        type: "number",
                        value: mintAmount.toString(),
                        onChange: (e)=>setMintAmount(Number(e.target.value)),
                        className: "w-full p-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400  focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500  disabled:bg-gray-100 disabled:text-gray-500 disabled:border-gray-200  invalid:border-red-500 invalid:text-red-600  focus:invalid:border-red-500 focus:invalid:ring-red-500",
                        min: "0"
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "w-full",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
                        htmlFor: "mintRecipientAddress",
                        className: "sr-only",
                        children: "Recipient Address"
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
                        id: "mintRecipientAddress",
                        type: "text",
                        value: mintRecipientAddress,
                        onChange: (e)=>setMintRecipientAddress(e.target.value),
                        className: "w-full p-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400  focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500  disabled:bg-gray-100 disabled:text-gray-500 disabled:border-gray-200",
                        placeholder: "Recipient's Address"
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "w-full",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
                        htmlFor: "mintAdminPrivateKey",
                        className: "sr-only",
                        children: "Admin's Private Key"
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
                        id: "mintAdminPrivateKey",
                        type: "text",
                        value: mintAdminPrivateKey,
                        onChange: (e)=>setMintAdminPrivateKey(e.target.value),
                        className: "w-full p-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400  focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500  disabled:bg-gray-100 disabled:text-gray-500 disabled:border-gray-200",
                        placeholder: "Admin's Private Key"
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                onClick: onMintTokens,
                className: "w-full px-5 py-3 text-sm font-medium text-white transition-colors duration-150 bg-green-600 rounded-lg hover:bg-green-700 focus:ring-4 focus:ring-green-300 focus:outline-none",
                children: "Mint Tokens"
            })
        ]
    });
};
/* harmony default export */ __webpack_exports__.Z = (MintForm);


/***/ }),

/***/ 7010:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5893);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7294);


const TransferForm = (param)=>{
    let { transferAmount, setTransferAmount, senderAddress, setSenderAddress, transferRecipientAddress, setTransferRecipientAddress, onTransferTokens } = param;
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("section", {
        className: "flex flex-col items-center p-4 bg-gray-50 rounded-lg shadow space-y-3",
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h2", {
                className: "text-lg font-semibold text-gray-700",
                children: "Transfer Tokens"
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "w-full",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
                        htmlFor: "senderAddress",
                        className: "sr-only",
                        children: "Sender Address"
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
                        id: "senderAddress",
                        type: "text",
                        value: senderAddress,
                        onChange: (e)=>setSenderAddress(e.target.value),
                        className: "w-full p-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400  focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500  disabled:bg-gray-100 disabled:text-gray-500 disabled:border-gray-200",
                        placeholder: "Sender's Address"
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "w-full",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
                        htmlFor: "transferRecipientAddress",
                        className: "sr-only",
                        children: "Recipient Address"
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
                        id: "transferRecipientAddress",
                        type: "text",
                        value: transferRecipientAddress,
                        onChange: (e)=>setTransferRecipientAddress(e.target.value),
                        className: "w-full p-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400  focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500  disabled:bg-gray-100 disabled:text-gray-500 disabled:border-gray-200",
                        placeholder: "Recipient's Address"
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "w-full",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
                        htmlFor: "transferAmount",
                        className: "sr-only",
                        children: "Amount to Transfer"
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
                        id: "transferAmount",
                        type: "number",
                        value: transferAmount,
                        onChange: (e)=>setTransferAmount(Number(e.target.value)),
                        className: "w-full p-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400  focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500  disabled:bg-gray-100 disabled:text-gray-500 disabled:border-gray-200  invalid:border-red-500 invalid:text-red-600  focus:invalid:border-red-500 focus:invalid:ring-red-500",
                        min: "0"
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                onClick: onTransferTokens,
                className: "w-full px-5 py-3 text-sm font-medium text-white transition-colors duration-150 bg-purple-600 rounded-lg hover:bg-purple-700 focus:ring-4 focus:ring-purple-300 focus:outline-none",
                children: "Transfer Tokens"
            })
        ]
    });
};
/* harmony default export */ __webpack_exports__.Z = (TransferForm);


/***/ }),

/***/ 2052:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.a(module, async function (__webpack_handle_async_dependencies__, __webpack_async_result__) { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ Home; }
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5893);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7294);
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2920);
/* harmony import */ var o1js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9466);
/* harmony import */ var _components_GradientBG__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(8122);
/* harmony import */ var _components_BurnForm__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(570);
/* harmony import */ var _components_MintForm__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(2842);
/* harmony import */ var _components_LoadingSpinner__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(3055);
/* harmony import */ var _components_TransferForm__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(7010);
/* harmony import */ var _zkappWorkerClient__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(9619);
/* harmony import */ var _reactCOIServiceWorker__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(3530);
/* harmony import */ var _reactCOIServiceWorker__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_reactCOIServiceWorker__WEBPACK_IMPORTED_MODULE_10__);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([o1js__WEBPACK_IMPORTED_MODULE_3__]);
o1js__WEBPACK_IMPORTED_MODULE_3__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];











const transactionFee = 0.1;
const initialState = {
    zkappWorkerClient: null,
    hasWallet: false,
    hasBeenSetup: false,
    accountExists: false,
    publicKey: null,
    zkappPublicKey: null,
    creatingTransaction: false
};
function Home() {
    const [state, setState] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(initialState);
    const [displayText, setDisplayText] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("");
    const [transactionLink, setTransactionLink] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("");
    const [mintAmount, setMintAmount] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(0);
    const [signatureMintAmount, setSignatureMintAmount] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(0);
    const [burnAmount, setBurnAmount] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(0);
    const [transferAmount, setTransferAmount] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(0);
    const [recipientAddress, setRecipientAddress] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("");
    const [transferRecipientAddress, setTransferRecipientAddress] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("");
    const [senderAddress, setSenderAddress] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("");
    const [mintAdminPrivateKey, setMintAdminPrivateKey] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("");
    const [mintRecipientAddress, setMintRecipientAddress] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("");
    const [signatureZkAppPrivKey, setsignatureZkAppPrivKey] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("");
    const [signatureRecipientAddress, setSignatureRecipientAddress] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("");
    const [burnRecipientAddress, setBurnRecipientAddress] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("");
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        let init = async ()=>{
            await initializeState();
        };
        init().catch((e)=>console.error(e));
        if (state.hasBeenSetup) {
            if (!state.hasWallet) {
                react_toastify__WEBPACK_IMPORTED_MODULE_2__/* .toast */ .Am.error("Wallet Not Detected! Could not find a wallet.", {
                    position: react_toastify__WEBPACK_IMPORTED_MODULE_2__/* .toast */ .Am.POSITION.BOTTOM_RIGHT
                });
            } else if (state.publicKey) {
                react_toastify__WEBPACK_IMPORTED_MODULE_2__/* .toast */ .Am.success("Wallet Connected! Public Key: ".concat(state.publicKey.toBase58()), {
                    position: react_toastify__WEBPACK_IMPORTED_MODULE_2__/* .toast */ .Am.POSITION.BOTTOM_RIGHT
                });
            }
            if (!state.accountExists && state.publicKey) {
                const faucetLink = "https://faucet.minaprotocol.com/?address=".concat(state.publicKey.toBase58());
                react_toastify__WEBPACK_IMPORTED_MODULE_2__/* .toast */ .Am.error(/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    children: [
                        "Account does not exist.",
                        " ",
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("a", {
                            href: faucetLink,
                            target: "_blank",
                            rel: "noopener noreferrer",
                            className: "text-blue-600 hover:text-blue-800 underline",
                            children: "Visit the faucet to fund this fee payer account"
                        })
                    ]
                }), {
                    position: react_toastify__WEBPACK_IMPORTED_MODULE_2__/* .toast */ .Am.POSITION.BOTTOM_RIGHT
                });
            } else if (state.accountExists) {
                react_toastify__WEBPACK_IMPORTED_MODULE_2__/* .toast */ .Am.success("Account is set up and ready to use.", {
                    position: react_toastify__WEBPACK_IMPORTED_MODULE_2__/* .toast */ .Am.POSITION.BOTTOM_RIGHT
                });
            }
        }
    }, [
        state.hasWallet,
        state.accountExists,
        state.publicKey
    ]);
    const initializeState = async ()=>{
        if (state.hasBeenSetup) return;
        setDisplayText("Loading web worker...");
        const zkappWorkerClient = new _zkappWorkerClient__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .Z();
        await new Promise((resolve)=>setTimeout(resolve, 5000));
        setDisplayText("Done loading web worker");
        await zkappWorkerClient.setActiveInstanceToBerkeley();
        const mina = window.mina;
        if (!mina) {
            console.log("No mina wallet detected");
            setState((s)=>({
                    ...s,
                    hasWallet: false
                }));
            return;
        }
        const publicKeyBase58 = (await mina.requestAccounts())[0];
        const publicKey = o1js__WEBPACK_IMPORTED_MODULE_3__/* .PublicKey */ .nh.fromBase58(publicKeyBase58);
        setDisplayText("Using key:".concat(publicKey.toBase58()));
        const res = await zkappWorkerClient.fetchAccount(publicKey);
        const accountExists = res.error == null;
        await zkappWorkerClient.loadContract();
        setDisplayText("Compiling zkApp...");
        await zkappWorkerClient.compileContract();
        setDisplayText("zkApp compiled...");
        const zkappPublicKey = o1js__WEBPACK_IMPORTED_MODULE_3__/* .PublicKey */ .nh.fromBase58("B62qoxbK8R2Fw9siCVYa1v3d9xYNxdCZsgtEJgFhfd1B9LqkABTfeVp");
        await zkappWorkerClient.initZkappInstance(zkappPublicKey);
        setDisplayText("Getting zkApp state...");
        await zkappWorkerClient.fetchAccount(publicKey);
        setDisplayText("");
        console.log("HasWallet set true");
        setState({
            zkappWorkerClient,
            hasWallet: true,
            hasBeenSetup: true,
            publicKey,
            zkappPublicKey,
            accountExists,
            creatingTransaction: false
        });
    };
    const onTransactionAction = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(async (action)=>{
        if (!state.zkappWorkerClient || !state.publicKey) return;
        const actionMap = {
            mint: async ()=>{
                var _state_zkappWorkerClient;
                return (_state_zkappWorkerClient = state.zkappWorkerClient) === null || _state_zkappWorkerClient === void 0 ? void 0 : _state_zkappWorkerClient.createMintTransaction(mintRecipientAddress, mintAdminPrivateKey, mintAmount);
            },
            burn: async ()=>{
                var _state_zkappWorkerClient;
                return (_state_zkappWorkerClient = state.zkappWorkerClient) === null || _state_zkappWorkerClient === void 0 ? void 0 : _state_zkappWorkerClient.createBurnTransaction(burnRecipientAddress, burnAmount);
            },
            transfer: async ()=>{
                var _state_zkappWorkerClient;
                return (_state_zkappWorkerClient = state.zkappWorkerClient) === null || _state_zkappWorkerClient === void 0 ? void 0 : _state_zkappWorkerClient.createTransferTransaction(senderAddress, transferRecipientAddress, transferAmount);
            },
            createSignature: async ()=>{
                return "asd";
            }
        };
        setState((s)=>({
                ...s,
                creatingTransaction: true
            }));
        setDisplayText("Creating ".concat(action, " transaction..."));
        await actionMap[action]();
        setDisplayText("".concat(action.replace(/^\w/, (c)=>c.toUpperCase()), " transaction created. Proving and sending..."));
        await state.zkappWorkerClient.proveUpdateTransaction();
        const transactionJSON = await state.zkappWorkerClient.getTransactionJSON();
        console.log(transactionJSON);
        const { hash } = await window.mina.sendTransaction({
            transaction: transactionJSON,
            feePayer: {
                fee: transactionFee,
                memo: ""
            }
        });
        const transactionLink = "https://berkeley.minaexplorer.com/transaction/".concat(hash);
        console.log("View transaction at ".concat(transactionLink));
        setTransactionLink(transactionLink);
        setDisplayText(transactionLink);
        setState((s)=>({
                ...s,
                creatingTransaction: false
            }));
    }, [
        state,
        mintAmount,
        burnAmount,
        transferAmount,
        transferRecipientAddress,
        mintRecipientAddress,
        burnRecipientAddress,
        senderAddress,
        mintAdminPrivateKey
    ]);
    const onBurnTokens = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(()=>{
        onTransactionAction("burn");
    }, [
        onTransactionAction
    ]);
    const onMintTokens = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(()=>{
        onTransactionAction("mint");
    }, [
        onTransactionAction
    ]);
    const onCreateSignature = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(()=>{
        onTransactionAction("createSignature");
    }, [
        onTransactionAction
    ]);
    const onTransferTokens = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(()=>{
        onTransactionAction("transfer");
    }, [
        onTransactionAction
    ]);
    const isWalletLinked = state.hasWallet === true;
    const isAccountSetup = state.accountExists && state.hasBeenSetup;
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_GradientBG__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z, {
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("main", {
            className: "container mx-auto px-4 py-8 min-h-screen flex flex-col justify-center items-center",
            children: [
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_LoadingSpinner__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .Z, {
                    transactionUrl: transactionLink,
                    text: displayText,
                    active: state.creatingTransaction || !isAccountSetup
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("section", {
                    className: "space-y-8",
                    children: isWalletLinked && isAccountSetup && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "grid grid-cols-1 md:grid-cols-3 gap-4",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_MintForm__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z, {
                                mintAmount: mintAmount,
                                setMintAmount: setMintAmount,
                                mintRecipientAddress: mintRecipientAddress,
                                mintAdminPrivateKey: mintAdminPrivateKey,
                                setMintAdminPrivateKey: setMintAdminPrivateKey,
                                setMintRecipientAddress: setMintRecipientAddress,
                                onMintTokens: onMintTokens
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_BurnForm__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Z, {
                                burnAmount: burnAmount,
                                setBurnAmount: setBurnAmount,
                                burnRecipientAddress: burnRecipientAddress,
                                setBurnRecipientAddress: setBurnRecipientAddress,
                                onBurnTokens: onBurnTokens
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_TransferForm__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .Z, {
                                transferAmount: transferAmount,
                                setTransferAmount: setTransferAmount,
                                transferRecipientAddress: transferRecipientAddress,
                                setTransferRecipientAddress: setTransferRecipientAddress,
                                senderAddress: senderAddress,
                                setSenderAddress: setSenderAddress,
                                onTransferTokens: onTransferTokens
                            })
                        ]
                    })
                })
            ]
        })
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 9619:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: function() { return /* binding */ ZkappWorkerClient; }
/* harmony export */ });
var ZkappWorkerClient;
ZkappWorkerClient = class ZkappWorkerClient {
    _call(fn, args) {
        return new Promise((resolve, reject)=>{
            const id = this.nextId++;
            this.promises[id] = {
                resolve,
                reject
            };
            const message = {
                id,
                fn,
                args
            };
            this.worker.postMessage(message);
        });
    }
    // Define explicit return types and method signatures for better type checking and readability
    setActiveInstanceToBerkeley() {
        return this._call("setActiveInstanceToBerkeley", {});
    }
    loadContract() {
        return this._call("loadContract", {});
    }
    compileContract() {
        return this._call("compileContract", {});
    }
    fetchAccount(publicKey) {
        return this._call("fetchAccount", {
            publicKey58: publicKey.toBase58()
        });
    }
    initZkappInstance(publicKey) {
        return this._call("initZkappInstance", {
            publicKey58: publicKey.toBase58()
        });
    }
    createMintTransaction(publicKey58, adminPrivateKey58, amount) {
        return this._call("createMintTransaction", {
            publicKey58,
            amount,
            adminPrivateKey58
        });
    }
    createSignature(amount, privKey) {
        return this._call("createSignature", {
            amount,
            privKey
        });
    }
    createBurnTransaction(publicKey58, amount) {
        return this._call("createBurnTransaction", {
            publicKey58,
            amount
        });
    }
    createTransferTransaction(senderPublicKey58, receiverPublicKey58, amount) {
        return this._call("createTransferTransaction", {
            senderPublicKey58,
            receiverPublicKey58,
            amount
        });
    }
    proveUpdateTransaction() {
        return this._call("proveUpdateTransaction", {});
    }
    getTransactionJSON() {
        return this._call("getTransactionJSON", {});
    }
    constructor(){
        this.worker = new Worker(__webpack_require__.tu(new URL(/* worker import */ __webpack_require__.p + __webpack_require__.u(504), __webpack_require__.b)));
        this.promises = {};
        this.nextId = 0;
        this.worker.onmessage = (event)=>{
            const { id, data } = event.data;
            const promise = this.promises[id];
            if (promise) {
                promise.resolve(data);
                delete this.promises[id];
            }
        };
    }
};



/***/ }),

/***/ 1110:
/***/ (function(module) {

// extracted by mini-css-extract-plugin
module.exports = {"main":"Home_main__2uIek","background":"Home_background__CTycG","backgroundGradients":"Home_backgroundGradients__VUGb4","container":"Home_container__9OuOz","tagline":"Home_tagline__Jw01K","start":"Home_start__ELciH","code":"Home_code__BZK8z","grid":"Home_grid__vo_ES","card":"Home_card__HIlp_","center":"Home_center__Y_rV4","logo":"Home_logo__ZEOng","content":"Home_content__Qnbja","spinnerContainer":"Home_spinnerContainer__N38pU","mainContent":"Home_mainContent__nJQdL"};

/***/ }),

/***/ 7663:
/***/ (function(module) {

var __dirname = "/";
(function(){var e={229:function(e){var t=e.exports={};var r;var n;function defaultSetTimout(){throw new Error("setTimeout has not been defined")}function defaultClearTimeout(){throw new Error("clearTimeout has not been defined")}(function(){try{if(typeof setTimeout==="function"){r=setTimeout}else{r=defaultSetTimout}}catch(e){r=defaultSetTimout}try{if(typeof clearTimeout==="function"){n=clearTimeout}else{n=defaultClearTimeout}}catch(e){n=defaultClearTimeout}})();function runTimeout(e){if(r===setTimeout){return setTimeout(e,0)}if((r===defaultSetTimout||!r)&&setTimeout){r=setTimeout;return setTimeout(e,0)}try{return r(e,0)}catch(t){try{return r.call(null,e,0)}catch(t){return r.call(this,e,0)}}}function runClearTimeout(e){if(n===clearTimeout){return clearTimeout(e)}if((n===defaultClearTimeout||!n)&&clearTimeout){n=clearTimeout;return clearTimeout(e)}try{return n(e)}catch(t){try{return n.call(null,e)}catch(t){return n.call(this,e)}}}var i=[];var o=false;var u;var a=-1;function cleanUpNextTick(){if(!o||!u){return}o=false;if(u.length){i=u.concat(i)}else{a=-1}if(i.length){drainQueue()}}function drainQueue(){if(o){return}var e=runTimeout(cleanUpNextTick);o=true;var t=i.length;while(t){u=i;i=[];while(++a<t){if(u){u[a].run()}}a=-1;t=i.length}u=null;o=false;runClearTimeout(e)}t.nextTick=function(e){var t=new Array(arguments.length-1);if(arguments.length>1){for(var r=1;r<arguments.length;r++){t[r-1]=arguments[r]}}i.push(new Item(e,t));if(i.length===1&&!o){runTimeout(drainQueue)}};function Item(e,t){this.fun=e;this.array=t}Item.prototype.run=function(){this.fun.apply(null,this.array)};t.title="browser";t.browser=true;t.env={};t.argv=[];t.version="";t.versions={};function noop(){}t.on=noop;t.addListener=noop;t.once=noop;t.off=noop;t.removeListener=noop;t.removeAllListeners=noop;t.emit=noop;t.prependListener=noop;t.prependOnceListener=noop;t.listeners=function(e){return[]};t.binding=function(e){throw new Error("process.binding is not supported")};t.cwd=function(){return"/"};t.chdir=function(e){throw new Error("process.chdir is not supported")};t.umask=function(){return 0}}};var t={};function __nccwpck_require__(r){var n=t[r];if(n!==undefined){return n.exports}var i=t[r]={exports:{}};var o=true;try{e[r](i,i.exports,__nccwpck_require__);o=false}finally{if(o)delete t[r]}return i.exports}if(typeof __nccwpck_require__!=="undefined")__nccwpck_require__.ab=__dirname+"/";var r=__nccwpck_require__(229);module.exports=r})();

/***/ }),

/***/ 8357:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  w_: function() { return /* reexport */ GenIcon; }
});

// UNUSED EXPORTS: DefaultContext, IconBase, IconContext, IconsManifest

;// CONCATENATED MODULE: ./node_modules/react-icons/lib/esm/iconsManifest.js
var IconsManifest = [
  {
    "id": "ci",
    "name": "Circum Icons",
    "projectUrl": "https://circumicons.com/",
    "license": "MPL-2.0 license",
    "licenseUrl": "https://github.com/Klarr-Agency/Circum-Icons/blob/main/LICENSE"
  },
  {
    "id": "fa",
    "name": "Font Awesome 5",
    "projectUrl": "https://fontawesome.com/",
    "license": "CC BY 4.0 License",
    "licenseUrl": "https://creativecommons.org/licenses/by/4.0/"
  },
  {
    "id": "fa6",
    "name": "Font Awesome 6",
    "projectUrl": "https://fontawesome.com/",
    "license": "CC BY 4.0 License",
    "licenseUrl": "https://creativecommons.org/licenses/by/4.0/"
  },
  {
    "id": "io",
    "name": "Ionicons 4",
    "projectUrl": "https://ionicons.com/",
    "license": "MIT",
    "licenseUrl": "https://github.com/ionic-team/ionicons/blob/master/LICENSE"
  },
  {
    "id": "io5",
    "name": "Ionicons 5",
    "projectUrl": "https://ionicons.com/",
    "license": "MIT",
    "licenseUrl": "https://github.com/ionic-team/ionicons/blob/master/LICENSE"
  },
  {
    "id": "md",
    "name": "Material Design icons",
    "projectUrl": "http://google.github.io/material-design-icons/",
    "license": "Apache License Version 2.0",
    "licenseUrl": "https://github.com/google/material-design-icons/blob/master/LICENSE"
  },
  {
    "id": "ti",
    "name": "Typicons",
    "projectUrl": "http://s-ings.com/typicons/",
    "license": "CC BY-SA 3.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/"
  },
  {
    "id": "go",
    "name": "Github Octicons icons",
    "projectUrl": "https://octicons.github.com/",
    "license": "MIT",
    "licenseUrl": "https://github.com/primer/octicons/blob/master/LICENSE"
  },
  {
    "id": "fi",
    "name": "Feather",
    "projectUrl": "https://feathericons.com/",
    "license": "MIT",
    "licenseUrl": "https://github.com/feathericons/feather/blob/master/LICENSE"
  },
  {
    "id": "lu",
    "name": "Lucide",
    "projectUrl": "https://lucide.dev/",
    "license": "ISC",
    "licenseUrl": "https://github.com/lucide-icons/lucide/blob/main/LICENSE"
  },
  {
    "id": "gi",
    "name": "Game Icons",
    "projectUrl": "https://game-icons.net/",
    "license": "CC BY 3.0",
    "licenseUrl": "https://creativecommons.org/licenses/by/3.0/"
  },
  {
    "id": "wi",
    "name": "Weather Icons",
    "projectUrl": "https://erikflowers.github.io/weather-icons/",
    "license": "SIL OFL 1.1",
    "licenseUrl": "http://scripts.sil.org/OFL"
  },
  {
    "id": "di",
    "name": "Devicons",
    "projectUrl": "https://vorillaz.github.io/devicons/",
    "license": "MIT",
    "licenseUrl": "https://opensource.org/licenses/MIT"
  },
  {
    "id": "ai",
    "name": "Ant Design Icons",
    "projectUrl": "https://github.com/ant-design/ant-design-icons",
    "license": "MIT",
    "licenseUrl": "https://opensource.org/licenses/MIT"
  },
  {
    "id": "bs",
    "name": "Bootstrap Icons",
    "projectUrl": "https://github.com/twbs/icons",
    "license": "MIT",
    "licenseUrl": "https://opensource.org/licenses/MIT"
  },
  {
    "id": "ri",
    "name": "Remix Icon",
    "projectUrl": "https://github.com/Remix-Design/RemixIcon",
    "license": "Apache License Version 2.0",
    "licenseUrl": "http://www.apache.org/licenses/"
  },
  {
    "id": "fc",
    "name": "Flat Color Icons",
    "projectUrl": "https://github.com/icons8/flat-color-icons",
    "license": "MIT",
    "licenseUrl": "https://opensource.org/licenses/MIT"
  },
  {
    "id": "gr",
    "name": "Grommet-Icons",
    "projectUrl": "https://github.com/grommet/grommet-icons",
    "license": "Apache License Version 2.0",
    "licenseUrl": "http://www.apache.org/licenses/"
  },
  {
    "id": "hi",
    "name": "Heroicons",
    "projectUrl": "https://github.com/tailwindlabs/heroicons",
    "license": "MIT",
    "licenseUrl": "https://opensource.org/licenses/MIT"
  },
  {
    "id": "hi2",
    "name": "Heroicons 2",
    "projectUrl": "https://github.com/tailwindlabs/heroicons",
    "license": "MIT",
    "licenseUrl": "https://opensource.org/licenses/MIT"
  },
  {
    "id": "si",
    "name": "Simple Icons",
    "projectUrl": "https://simpleicons.org/",
    "license": "CC0 1.0 Universal",
    "licenseUrl": "https://creativecommons.org/publicdomain/zero/1.0/"
  },
  {
    "id": "sl",
    "name": "Simple Line Icons",
    "projectUrl": "https://thesabbir.github.io/simple-line-icons/",
    "license": "MIT",
    "licenseUrl": "https://opensource.org/licenses/MIT"
  },
  {
    "id": "im",
    "name": "IcoMoon Free",
    "projectUrl": "https://github.com/Keyamoon/IcoMoon-Free",
    "license": "CC BY 4.0 License",
    "licenseUrl": "https://github.com/Keyamoon/IcoMoon-Free/blob/master/License.txt"
  },
  {
    "id": "bi",
    "name": "BoxIcons",
    "projectUrl": "https://github.com/atisawd/boxicons",
    "license": "CC BY 4.0 License",
    "licenseUrl": "https://github.com/atisawd/boxicons/blob/master/LICENSE"
  },
  {
    "id": "cg",
    "name": "css.gg",
    "projectUrl": "https://github.com/astrit/css.gg",
    "license": "MIT",
    "licenseUrl": "https://opensource.org/licenses/MIT"
  },
  {
    "id": "vsc",
    "name": "VS Code Icons",
    "projectUrl": "https://github.com/microsoft/vscode-codicons",
    "license": "CC BY 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by/4.0/"
  },
  {
    "id": "tb",
    "name": "Tabler Icons",
    "projectUrl": "https://github.com/tabler/tabler-icons",
    "license": "MIT",
    "licenseUrl": "https://opensource.org/licenses/MIT"
  },
  {
    "id": "tfi",
    "name": "Themify Icons",
    "projectUrl": "https://github.com/lykmapipo/themify-icons",
    "license": "MIT",
    "licenseUrl": "https://github.com/thecreation/standard-icons/blob/master/modules/themify-icons/LICENSE"
  },
  {
    "id": "rx",
    "name": "Radix Icons",
    "projectUrl": "https://icons.radix-ui.com",
    "license": "MIT",
    "licenseUrl": "https://github.com/radix-ui/icons/blob/master/LICENSE"
  },
  {
    "id": "pi",
    "name": "Phosphor Icons",
    "projectUrl": "https://github.com/phosphor-icons/core",
    "license": "MIT",
    "licenseUrl": "https://github.com/phosphor-icons/core/blob/main/LICENSE"
  },
  {
    "id": "lia",
    "name": "Icons8 Line Awesome",
    "projectUrl": "https://icons8.com/line-awesome",
    "license": "MIT",
    "licenseUrl": "https://github.com/icons8/line-awesome/blob/master/LICENSE.md"
  }
]
// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(7294);
;// CONCATENATED MODULE: ./node_modules/react-icons/lib/esm/iconContext.js

var DefaultContext = {
  color: undefined,
  size: undefined,
  className: undefined,
  style: undefined,
  attr: undefined
};
var IconContext = react.createContext && react.createContext(DefaultContext);
;// CONCATENATED MODULE: ./node_modules/react-icons/lib/esm/iconBase.js
var __assign = undefined && undefined.__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
  };
  return __assign.apply(this, arguments);
};
var __rest = undefined && undefined.__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};


function Tree2Element(tree) {
  return tree && tree.map(function (node, i) {
    return react.createElement(node.tag, __assign({
      key: i
    }, node.attr), Tree2Element(node.child));
  });
}
function GenIcon(data) {
  // eslint-disable-next-line react/display-name
  return function (props) {
    return react.createElement(IconBase, __assign({
      attr: __assign({}, data.attr)
    }, props), Tree2Element(data.child));
  };
}
function IconBase(props) {
  var elem = function (conf) {
    var attr = props.attr,
      size = props.size,
      title = props.title,
      svgProps = __rest(props, ["attr", "size", "title"]);
    var computedSize = size || conf.size || "1em";
    var className;
    if (conf.className) className = conf.className;
    if (props.className) className = (className ? className + " " : "") + props.className;
    return react.createElement("svg", __assign({
      stroke: "currentColor",
      fill: "currentColor",
      strokeWidth: "0"
    }, conf.attr, attr, svgProps, {
      className: className,
      style: __assign(__assign({
        color: props.color || conf.color
      }, conf.style), props.style),
      height: computedSize,
      width: computedSize,
      xmlns: "http://www.w3.org/2000/svg"
    }), title && react.createElement("title", null, title), props.children);
  };
  return IconContext !== undefined ? react.createElement(IconContext.Consumer, null, function (conf) {
    return elem(conf);
  }) : elem(DefaultContext);
}
;// CONCATENATED MODULE: ./node_modules/react-icons/lib/esm/index.js




/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, [674,445,774,888,179], function() { return __webpack_exec__(9208); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ _N_E = __webpack_exports__;
/******/ }
]);