"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/auth/[...nextauth]/route";
exports.ids = ["app/api/auth/[...nextauth]/route"];
exports.modules = {

/***/ "../../client/components/action-async-storage.external":
/*!*******************************************************************************!*\
  !*** external "next/dist/client/components/action-async-storage.external.js" ***!
  \*******************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/action-async-storage.external.js");

/***/ }),

/***/ "../../client/components/request-async-storage.external":
/*!********************************************************************************!*\
  !*** external "next/dist/client/components/request-async-storage.external.js" ***!
  \********************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/request-async-storage.external.js");

/***/ }),

/***/ "../../client/components/static-generation-async-storage.external":
/*!******************************************************************************************!*\
  !*** external "next/dist/client/components/static-generation-async-storage.external.js" ***!
  \******************************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/static-generation-async-storage.external.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "assert":
/*!*************************!*\
  !*** external "assert" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("assert");

/***/ }),

/***/ "buffer":
/*!*************************!*\
  !*** external "buffer" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("buffer");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("events");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("http");

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/***/ ((module) => {

module.exports = require("https");

/***/ }),

/***/ "querystring":
/*!******************************!*\
  !*** external "querystring" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("querystring");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/***/ ((module) => {

module.exports = require("url");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("util");

/***/ }),

/***/ "zlib":
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("zlib");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.ts&appDir=C%3A%5CUsers%5Cadmin%5CDocuments%5Cdocument-explorer%5CRazyasnitel-documentov%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cadmin%5CDocuments%5Cdocument-explorer%5CRazyasnitel-documentov&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.ts&appDir=C%3A%5CUsers%5Cadmin%5CDocuments%5Cdocument-explorer%5CRazyasnitel-documentov%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cadmin%5CDocuments%5Cdocument-explorer%5CRazyasnitel-documentov&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   originalPathname: () => (/* binding */ originalPathname),\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   requestAsyncStorage: () => (/* binding */ requestAsyncStorage),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   staticGenerationAsyncStorage: () => (/* binding */ staticGenerationAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/future/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/future/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/future/route-kind */ \"(rsc)/./node_modules/next/dist/server/future/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_Users_admin_Documents_document_explorer_Razyasnitel_documentov_src_app_api_auth_nextauth_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./src/app/api/auth/[...nextauth]/route.ts */ \"(rsc)/./src/app/api/auth/[...nextauth]/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/auth/[...nextauth]/route\",\n        pathname: \"/api/auth/[...nextauth]\",\n        filename: \"route\",\n        bundlePath: \"app/api/auth/[...nextauth]/route\"\n    },\n    resolvedPagePath: \"C:\\\\Users\\\\admin\\\\Documents\\\\document-explorer\\\\Razyasnitel-documentov\\\\src\\\\app\\\\api\\\\auth\\\\[...nextauth]\\\\route.ts\",\n    nextConfigOutput,\n    userland: C_Users_admin_Documents_document_explorer_Razyasnitel_documentov_src_app_api_auth_nextauth_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { requestAsyncStorage, staticGenerationAsyncStorage, serverHooks } = routeModule;\nconst originalPathname = \"/api/auth/[...nextauth]/route\";\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        serverHooks,\n        staticGenerationAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIuanM/bmFtZT1hcHAlMkZhcGklMkZhdXRoJTJGJTVCLi4ubmV4dGF1dGglNUQlMkZyb3V0ZSZwYWdlPSUyRmFwaSUyRmF1dGglMkYlNUIuLi5uZXh0YXV0aCU1RCUyRnJvdXRlJmFwcFBhdGhzPSZwYWdlUGF0aD1wcml2YXRlLW5leHQtYXBwLWRpciUyRmFwaSUyRmF1dGglMkYlNUIuLi5uZXh0YXV0aCU1RCUyRnJvdXRlLnRzJmFwcERpcj1DJTNBJTVDVXNlcnMlNUNhZG1pbiU1Q0RvY3VtZW50cyU1Q2RvY3VtZW50LWV4cGxvcmVyJTVDUmF6eWFzbml0ZWwtZG9jdW1lbnRvdiU1Q3NyYyU1Q2FwcCZwYWdlRXh0ZW5zaW9ucz10c3gmcGFnZUV4dGVuc2lvbnM9dHMmcGFnZUV4dGVuc2lvbnM9anN4JnBhZ2VFeHRlbnNpb25zPWpzJnJvb3REaXI9QyUzQSU1Q1VzZXJzJTVDYWRtaW4lNUNEb2N1bWVudHMlNUNkb2N1bWVudC1leHBsb3JlciU1Q1Jhenlhc25pdGVsLWRvY3VtZW50b3YmaXNEZXY9dHJ1ZSZ0c2NvbmZpZ1BhdGg9dHNjb25maWcuanNvbiZiYXNlUGF0aD0mYXNzZXRQcmVmaXg9Jm5leHRDb25maWdPdXRwdXQ9JnByZWZlcnJlZFJlZ2lvbj0mbWlkZGxld2FyZUNvbmZpZz1lMzAlM0QhIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFzRztBQUN2QztBQUNjO0FBQ29FO0FBQ2pKO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixnSEFBbUI7QUFDM0M7QUFDQSxjQUFjLHlFQUFTO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxZQUFZO0FBQ1osQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLFFBQVEsaUVBQWlFO0FBQ3pFO0FBQ0E7QUFDQSxXQUFXLDRFQUFXO0FBQ3RCO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDdUg7O0FBRXZIIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZG9jdW1lbnQtZXhwbGFpbmVyLz9hZTk5Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFwcFJvdXRlUm91dGVNb2R1bGUgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9mdXR1cmUvcm91dGUtbW9kdWxlcy9hcHAtcm91dGUvbW9kdWxlLmNvbXBpbGVkXCI7XG5pbXBvcnQgeyBSb3V0ZUtpbmQgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9mdXR1cmUvcm91dGUta2luZFwiO1xuaW1wb3J0IHsgcGF0Y2hGZXRjaCBhcyBfcGF0Y2hGZXRjaCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2xpYi9wYXRjaC1mZXRjaFwiO1xuaW1wb3J0ICogYXMgdXNlcmxhbmQgZnJvbSBcIkM6XFxcXFVzZXJzXFxcXGFkbWluXFxcXERvY3VtZW50c1xcXFxkb2N1bWVudC1leHBsb3JlclxcXFxSYXp5YXNuaXRlbC1kb2N1bWVudG92XFxcXHNyY1xcXFxhcHBcXFxcYXBpXFxcXGF1dGhcXFxcWy4uLm5leHRhdXRoXVxcXFxyb3V0ZS50c1wiO1xuLy8gV2UgaW5qZWN0IHRoZSBuZXh0Q29uZmlnT3V0cHV0IGhlcmUgc28gdGhhdCB3ZSBjYW4gdXNlIHRoZW0gaW4gdGhlIHJvdXRlXG4vLyBtb2R1bGUuXG5jb25zdCBuZXh0Q29uZmlnT3V0cHV0ID0gXCJcIlxuY29uc3Qgcm91dGVNb2R1bGUgPSBuZXcgQXBwUm91dGVSb3V0ZU1vZHVsZSh7XG4gICAgZGVmaW5pdGlvbjoge1xuICAgICAgICBraW5kOiBSb3V0ZUtpbmQuQVBQX1JPVVRFLFxuICAgICAgICBwYWdlOiBcIi9hcGkvYXV0aC9bLi4ubmV4dGF1dGhdL3JvdXRlXCIsXG4gICAgICAgIHBhdGhuYW1lOiBcIi9hcGkvYXV0aC9bLi4ubmV4dGF1dGhdXCIsXG4gICAgICAgIGZpbGVuYW1lOiBcInJvdXRlXCIsXG4gICAgICAgIGJ1bmRsZVBhdGg6IFwiYXBwL2FwaS9hdXRoL1suLi5uZXh0YXV0aF0vcm91dGVcIlxuICAgIH0sXG4gICAgcmVzb2x2ZWRQYWdlUGF0aDogXCJDOlxcXFxVc2Vyc1xcXFxhZG1pblxcXFxEb2N1bWVudHNcXFxcZG9jdW1lbnQtZXhwbG9yZXJcXFxcUmF6eWFzbml0ZWwtZG9jdW1lbnRvdlxcXFxzcmNcXFxcYXBwXFxcXGFwaVxcXFxhdXRoXFxcXFsuLi5uZXh0YXV0aF1cXFxccm91dGUudHNcIixcbiAgICBuZXh0Q29uZmlnT3V0cHV0LFxuICAgIHVzZXJsYW5kXG59KTtcbi8vIFB1bGwgb3V0IHRoZSBleHBvcnRzIHRoYXQgd2UgbmVlZCB0byBleHBvc2UgZnJvbSB0aGUgbW9kdWxlLiBUaGlzIHNob3VsZFxuLy8gYmUgZWxpbWluYXRlZCB3aGVuIHdlJ3ZlIG1vdmVkIHRoZSBvdGhlciByb3V0ZXMgdG8gdGhlIG5ldyBmb3JtYXQuIFRoZXNlXG4vLyBhcmUgdXNlZCB0byBob29rIGludG8gdGhlIHJvdXRlLlxuY29uc3QgeyByZXF1ZXN0QXN5bmNTdG9yYWdlLCBzdGF0aWNHZW5lcmF0aW9uQXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcyB9ID0gcm91dGVNb2R1bGU7XG5jb25zdCBvcmlnaW5hbFBhdGhuYW1lID0gXCIvYXBpL2F1dGgvWy4uLm5leHRhdXRoXS9yb3V0ZVwiO1xuZnVuY3Rpb24gcGF0Y2hGZXRjaCgpIHtcbiAgICByZXR1cm4gX3BhdGNoRmV0Y2goe1xuICAgICAgICBzZXJ2ZXJIb29rcyxcbiAgICAgICAgc3RhdGljR2VuZXJhdGlvbkFzeW5jU3RvcmFnZVxuICAgIH0pO1xufVxuZXhwb3J0IHsgcm91dGVNb2R1bGUsIHJlcXVlc3RBc3luY1N0b3JhZ2UsIHN0YXRpY0dlbmVyYXRpb25Bc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzLCBvcmlnaW5hbFBhdGhuYW1lLCBwYXRjaEZldGNoLCAgfTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXBwLXJvdXRlLmpzLm1hcCJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.ts&appDir=C%3A%5CUsers%5Cadmin%5CDocuments%5Cdocument-explorer%5CRazyasnitel-documentov%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cadmin%5CDocuments%5Cdocument-explorer%5CRazyasnitel-documentov&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./src/app/api/auth/[...nextauth]/route.ts":
/*!*************************************************!*\
  !*** ./src/app/api/auth/[...nextauth]/route.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ handler),\n/* harmony export */   POST: () => (/* binding */ handler)\n/* harmony export */ });\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next-auth */ \"(rsc)/./node_modules/next-auth/index.js\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_auth__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _lib_auth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/lib/auth */ \"(rsc)/./src/lib/auth.ts\");\n\n\nconst handler = next_auth__WEBPACK_IMPORTED_MODULE_0___default()(_lib_auth__WEBPACK_IMPORTED_MODULE_1__.authOptions);\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9zcmMvYXBwL2FwaS9hdXRoL1suLi5uZXh0YXV0aF0vcm91dGUudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBaUM7QUFDUTtBQUV6QyxNQUFNRSxVQUFVRixnREFBUUEsQ0FBQ0Msa0RBQVdBO0FBRU8iLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kb2N1bWVudC1leHBsYWluZXIvLi9zcmMvYXBwL2FwaS9hdXRoL1suLi5uZXh0YXV0aF0vcm91dGUudHM/MDA5OCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTmV4dEF1dGggZnJvbSAnbmV4dC1hdXRoJztcclxuaW1wb3J0IHsgYXV0aE9wdGlvbnMgfSBmcm9tICdAL2xpYi9hdXRoJztcclxuXHJcbmNvbnN0IGhhbmRsZXIgPSBOZXh0QXV0aChhdXRoT3B0aW9ucyk7XHJcblxyXG5leHBvcnQgeyBoYW5kbGVyIGFzIEdFVCwgaGFuZGxlciBhcyBQT1NUIH07XHJcbiJdLCJuYW1lcyI6WyJOZXh0QXV0aCIsImF1dGhPcHRpb25zIiwiaGFuZGxlciIsIkdFVCIsIlBPU1QiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./src/app/api/auth/[...nextauth]/route.ts\n");

/***/ }),

/***/ "(rsc)/./src/lib/auth.ts":
/*!*************************!*\
  !*** ./src/lib/auth.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   authOptions: () => (/* binding */ authOptions)\n/* harmony export */ });\n/* harmony import */ var next_auth_providers_google__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next-auth/providers/google */ \"(rsc)/./node_modules/next-auth/providers/google.js\");\n/* harmony import */ var next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next-auth/providers/credentials */ \"(rsc)/./node_modules/next-auth/providers/credentials.js\");\n/* harmony import */ var _supabase__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./supabase */ \"(rsc)/./src/lib/supabase.ts\");\n\n\n\nconst authOptions = {\n    providers: [\n        (0,next_auth_providers_google__WEBPACK_IMPORTED_MODULE_0__[\"default\"])({\n            clientId: process.env.GOOGLE_CLIENT_ID,\n            clientSecret: process.env.GOOGLE_CLIENT_SECRET\n        }),\n        (0,next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_1__[\"default\"])({\n            name: \"Email\",\n            credentials: {\n                email: {\n                    label: \"Email\",\n                    type: \"email\"\n                },\n                password: {\n                    label: \"Password\",\n                    type: \"password\"\n                }\n            },\n            async authorize (credentials) {\n                if (!credentials?.email || !credentials?.password) {\n                    return null;\n                }\n                const { data, error } = await _supabase__WEBPACK_IMPORTED_MODULE_2__.supabase.auth.signInWithPassword({\n                    email: credentials.email,\n                    password: credentials.password\n                });\n                if (error || !data.user) {\n                    return null;\n                }\n                return {\n                    id: data.user.id,\n                    email: data.user.email,\n                    name: data.user.user_metadata?.full_name,\n                    image: data.user.user_metadata?.avatar_url\n                };\n            }\n        })\n    ],\n    callbacks: {\n        async signIn ({ user, account, profile }) {\n            if (account?.provider === \"google\") {\n                const { data: existingUser } = await _supabase__WEBPACK_IMPORTED_MODULE_2__.supabase.from(\"profiles\").select(\"id\").eq(\"email\", user.email).single();\n                if (!existingUser) {\n                    const { error } = await _supabase__WEBPACK_IMPORTED_MODULE_2__.supabase.auth.signUp({\n                        email: user.email,\n                        password: Math.random().toString(36).slice(-8),\n                        options: {\n                            data: {\n                                full_name: user.name,\n                                avatar_url: user.image\n                            }\n                        }\n                    });\n                    if (error) {\n                        console.error(\"Error creating user:\", error);\n                        return false;\n                    }\n                }\n            }\n            return true;\n        },\n        async jwt ({ token, user, account }) {\n            if (user) {\n                token.id = user.id;\n            }\n            return token;\n        },\n        async session ({ session, token }) {\n            if (session.user) {\n                session.user.id = token.id;\n            }\n            return session;\n        }\n    },\n    pages: {\n        signIn: \"/auth/signin\",\n        signUp: \"/auth/signup\",\n        error: \"/auth/error\"\n    },\n    session: {\n        strategy: \"jwt\"\n    },\n    secret: process.env.NEXTAUTH_SECRET\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LEdBQUcsQ0FBQzRDLGVBQWU7QUFDckMsRUFBRSIsInNvdXJjZXMiOlsid2VicGFjazovL2RvY3VtZW50LWV4cGxhaW5lci8uL3NyYy9saWIvYXV0aC50cz82NjkyIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5leHRBdXRoT3B0aW9ucyB9IGZyb20gJ25leHQtYXV0aCc7XHJcbmltcG9ydCBHb29nbGVQcm92aWRlciBmcm9tICduZXh0LWF1dGgvcHJvdmlkZXJzL2dvb2dsZSc7XHJcbmltcG9ydCBDcmVkZW50aWFsc1Byb3ZpZGVyIGZyb20gJ25leHQtYXV0aC9wcm92aWRlcnMvY3JlZGVudGlhbHMnO1xyXG5pbXBvcnQgeyBzdXBhYmFzZSB9IGZyb20gJy4vc3VwYWJhc2UnO1xyXG5cclxuZXhwb3J0IGNvbnN0IGF1dGhPcHRpb25zOiBOZXh0QXV0aE9wdGlvbnMgPSB7XHJcbiAgcHJvdmlkZXJzOiBbXHJcbiAgICBHb29nbGVQcm92aWRlcih7XHJcbiAgICAgIGNsaWVudElkOiBwcm9jZXNzLmVudi5HT09HTEVfQ0xJRU5UX0lEISxcclxuICAgICAgY2xpZW50U2VjcmV0OiBwcm9jZXNzLmVudi5HT09HTEVfQ0xJRU5UX1NFQ1JFVCEsXHJcbiAgICB9KSxcclxuICAgIENyZWRlbnRpYWxzUHJvdmlkZXIoe1xyXG4gICAgICBuYW1lOiAnRW1haWwnLFxyXG4gICAgICBjcmVkZW50aWFsczoge1xyXG4gICAgICAgIGVtYWlsOiB7IGxhYmVsOiAnRW1haWwnLCB0eXBlOiAnZW1haWwnIH0sXHJcbiAgICAgICAgcGFzc3dvcmQ6IHsgbGFiZWw6ICdQYXNzd29yZCcsIHR5cGU6ICdwYXNzd29yZCcgfSxcclxuICAgICAgfSxcclxuICAgICAgYXN5bmMgYXV0aG9yaXplKGNyZWRlbnRpYWxzKSB7XHJcbiAgICAgICAgaWYgKCFjcmVkZW50aWFscz8uZW1haWwgfHwgIWNyZWRlbnRpYWxzPy5wYXNzd29yZCkge1xyXG4gICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCB7IGRhdGEsIGVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZS5hdXRoLnNpZ25JbldpdGhQYXNzd29yZCh7XHJcbiAgICAgICAgICBlbWFpbDogY3JlZGVudGlhbHMuZW1haWwsXHJcbiAgICAgICAgICBwYXNzd29yZDogY3JlZGVudGlhbHMucGFzc3dvcmQsXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGlmIChlcnJvciB8fCAhZGF0YS51c2VyKSB7XHJcbiAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICBpZDogZGF0YS51c2VyLmlkLFxyXG4gICAgICAgICAgZW1haWw6IGRhdGEudXNlci5lbWFpbCEsXHJcbiAgICAgICAgICBuYW1lOiBkYXRhLnVzZXIudXNlcl9tZXRhZGF0YT8uZnVsbF9uYW1lLFxyXG4gICAgICAgICAgaW1hZ2U6IGRhdGEudXNlci51c2VyX21ldGFkYXRhPy5hdmF0YXJfdXJsLFxyXG4gICAgICAgIH07XHJcbiAgICAgIH0sXHJcbiAgICB9KSxcclxuICBdLFxyXG4gIGNhbGxiYWNrczoge1xyXG4gICAgYXN5bmMgc2lnbkluKHsgdXNlciwgYWNjb3VudCwgcHJvZmlsZSB9KSB7XHJcbiAgICAgIGlmIChhY2NvdW50Py5wcm92aWRlciA9PT0gJ2dvb2dsZScpIHtcclxuICAgICAgICBjb25zdCB7IGRhdGE6IGV4aXN0aW5nVXNlciB9ID0gYXdhaXQgc3VwYWJhc2VcclxuICAgICAgICAgIC5mcm9tKCdwcm9maWxlcycpXHJcbiAgICAgICAgICAuc2VsZWN0KCdpZCcpXHJcbiAgICAgICAgICAuZXEoJ2VtYWlsJywgdXNlci5lbWFpbCEpXHJcbiAgICAgICAgICAuc2luZ2xlKCk7XHJcblxyXG4gICAgICAgIGlmICghZXhpc3RpbmdVc2VyKSB7XHJcbiAgICAgICAgICBjb25zdCB7IGVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZS5hdXRoLnNpZ25VcCh7XHJcbiAgICAgICAgICAgIGVtYWlsOiB1c2VyLmVtYWlsISxcclxuICAgICAgICAgICAgcGFzc3dvcmQ6IE1hdGgucmFuZG9tKCkudG9TdHJpbmcoMzYpLnNsaWNlKC04KSxcclxuICAgICAgICAgICAgb3B0aW9uczoge1xyXG4gICAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICAgIGZ1bGxfbmFtZTogdXNlci5uYW1lLFxyXG4gICAgICAgICAgICAgICAgYXZhdGFyX3VybDogdXNlci5pbWFnZSxcclxuICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgaWYgKGVycm9yKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGNyZWF0aW5nIHVzZXI6JywgZXJyb3IpO1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfSxcclxuICAgIGFzeW5jIGp3dCh7IHRva2VuLCB1c2VyLCBhY2NvdW50IH0pIHtcclxuICAgICAgaWYgKHVzZXIpIHtcclxuICAgICAgICB0b2tlbi5pZCA9IHVzZXIuaWQ7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIHRva2VuO1xyXG4gICAgfSxcclxuICAgIGFzeW5jIHNlc3Npb24oeyBzZXNzaW9uLCB0b2tlbiB9KSB7XHJcbiAgICAgIGlmIChzZXNzaW9uLnVzZXIpIHtcclxuICAgICAgICBzZXNzaW9uLnVzZXIuaWQgPSB0b2tlbi5pZCBhcyBzdHJpbmc7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIHNlc3Npb247XHJcbiAgICB9LFxyXG4gIH0sXHJcbiAgcGFnZXM6IHtcclxuICAgIHNpZ25JbjogJy9hdXRoL3NpZ25pbicsXHJcbiAgICBzaWduVXA6ICcvYXV0aC9zaWdudXAnLFxyXG4gICAgZXJyb3I6ICcvYXV0aC9lcnJvcicsXHJcbiAgfSxcclxuICBzZXNzaW9uOiB7XHJcbiAgICBzdHJhdGVneTogJ2p3dCcsXHJcbiAgfSxcclxuICBzZWNyZXQ6IHByb2Nlc3MuZW52Lk5FWFRBVVRIX1NFQ1JFVCxcclxufTtcclxuIl0sIm5hbWVzIjpbIkdvb2dsZVByb3ZpZGVyIiwiQ3JlZGVudGlhbHNQcm92aWRlciIsInN1cGFiYXNlIiwiYXV0aE9wdGlvbnMiLCJwcm92aWRlcnMiLCJjbGllbnRJZCIsInByb2Nlc3MiLCJlbnYiLCJHT09HTEVfQ0xJRU5UX0lEIiwiY2xpZW50U2VjcmV0IiwiR09PR0xFX0NMSUVOVF9TRUNSRVQiLCJuYW1lIiwiY3JlZGVudGlhbHMiLCJlbWFpbCIsImxhYmVsIiwidHlwZSIsInBhc3N3b3JkIiwiYXV0aG9yaXplIiwiZGF0YSIsImVycm9yIiwiYXV0aCIsInNpZ25JbldpdGhQYXNzd29yZCIsInVzZXIiLCJpZCIsInVzZXJfbWV0YWRhdGEiLCJmdWxsX25hbWUiLCJpbWFnZSIsImF2YXRhcl91cmwiLCJjYWxsYmFja3MiLCJzaWduSW4iLCJhY2NvdW50IiwicHJvZmlsZSIsInByb3ZpZGVyIiwiZXhpc3RpbmdVc2VyIiwiZnJvbSIsInNlbGVjdCIsImVxIiwic2luZ2xlIiwic2lnblVwIiwiTWF0aCIsInJhbmRvbSIsInRvU3RyaW5nIiwic2xpY2UiLCJvcHRpb25zIiwiY29uc29sZSIsImp3dCIsInRva2VuIiwic2Vzc2lvbiIsInBhZ2VzIiwic3RyYXRlZ3kiLCJzZWNyZXQiLCJORVhUQVVUSF9TRUNSRVQiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./src/lib/auth.ts\n");

/***/ }),

/***/ "(rsc)/./src/lib/supabase.ts":
/*!*****************************!*\
  !*** ./src/lib/supabase.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   supabase: () => (/* binding */ supabase)\n/* harmony export */ });\n/* harmony import */ var _supabase_supabase_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @supabase/supabase-js */ \"(rsc)/./node_modules/@supabase/supabase-js/dist/index.mjs\");\n\nconst supabaseUrl = \"https://vxldkqrmiywswgvekvzd.supabase.co\";\nconst supabaseAnonKey = \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ4bGRrcXJtaXl3c3dndmVrdnpkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMzMDE5NTUsImV4cCI6MjA4ODg3Nzk1NX0.iHZHH-G96zfikkJ9Je6oMoTHIF2BmJyKSKdER1V8CEo\";\nconst supabase = (0,_supabase_supabase_js__WEBPACK_IMPORTED_MODULE_0__.createClient)(supabaseUrl, supabaseAnonKey);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9zcmMvbGliL3N1cGFiYXNlLnRzIiwibWFwcGluZ3MiOiI7Ozs7O0FBQXFEO0FBRXJELE1BQU1DLGNBQWNDLDBDQUFvQztBQUN4RCxNQUFNRyxrQkFBa0JILGtOQUF5QztBQUUxRCxNQUFNSyxXQUFXUCxtRUFBWUEsQ0FBQ0MsYUFBYUksaUJBQWlCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZG9jdW1lbnQtZXhwbGFpbmVyLy4vc3JjL2xpYi9zdXBhYmFzZS50cz8wNmUxIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNyZWF0ZUNsaWVudCB9IGZyb20gJ0BzdXBhYmFzZS9zdXBhYmFzZS1qcyc7XHJcblxyXG5jb25zdCBzdXBhYmFzZVVybCA9IHByb2Nlc3MuZW52Lk5FWFRfUFVCTElDX1NVUEFCQVNFX1VSTCE7XHJcbmNvbnN0IHN1cGFiYXNlQW5vbktleSA9IHByb2Nlc3MuZW52Lk5FWFRfUFVCTElDX1NVUEFCQVNFX0FOT05fS0VZITtcclxuXHJcbmV4cG9ydCBjb25zdCBzdXBhYmFzZSA9IGNyZWF0ZUNsaWVudChzdXBhYmFzZVVybCwgc3VwYWJhc2VBbm9uS2V5KTtcclxuXHJcbmV4cG9ydCB0eXBlIERhdGFiYXNlID0ge1xyXG4gIHB1YmxpYzoge1xyXG4gICAgVGFibGVzOiB7XHJcbiAgICAgIHByb2ZpbGVzOiB7XHJcbiAgICAgICAgUm93OiB7XHJcbiAgICAgICAgICBpZDogc3RyaW5nO1xyXG4gICAgICAgICAgZW1haWw6IHN0cmluZztcclxuICAgICAgICAgIGZ1bGxfbmFtZTogc3RyaW5nIHwgbnVsbDtcclxuICAgICAgICAgIGF2YXRhcl91cmw6IHN0cmluZyB8IG51bGw7XHJcbiAgICAgICAgICBzdWJzY3JpcHRpb25fdGllcjogJ2ZyZWUnIHwgJ2Jhc2ljJyB8ICdwcm8nIHwgJ2J1c2luZXNzJztcclxuICAgICAgICAgIHN1YnNjcmlwdGlvbl9zdGF0dXM6ICdhY3RpdmUnIHwgJ2NhbmNlbGxlZCcgfCAnZXhwaXJlZCc7XHJcbiAgICAgICAgICBzdWJzY3JpcHRpb25fZXhwaXJlc19hdDogc3RyaW5nIHwgbnVsbDtcclxuICAgICAgICAgIGRvY3VtZW50c19jb3VudDogbnVtYmVyO1xyXG4gICAgICAgICAgZG9jdW1lbnRzX2xpbWl0OiBudW1iZXI7XHJcbiAgICAgICAgICBjcmVhdGVkX2F0OiBzdHJpbmc7XHJcbiAgICAgICAgICB1cGRhdGVkX2F0OiBzdHJpbmc7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBJbnNlcnQ6IHtcclxuICAgICAgICAgIGlkOiBzdHJpbmc7XHJcbiAgICAgICAgICBlbWFpbDogc3RyaW5nO1xyXG4gICAgICAgICAgZnVsbF9uYW1lPzogc3RyaW5nIHwgbnVsbDtcclxuICAgICAgICAgIGF2YXRhcl91cmw/OiBzdHJpbmcgfCBudWxsO1xyXG4gICAgICAgICAgc3Vic2NyaXB0aW9uX3RpZXI/OiAnZnJlZScgfCAnYmFzaWMnIHwgJ3BybycgfCAnYnVzaW5lc3MnO1xyXG4gICAgICAgICAgc3Vic2NyaXB0aW9uX3N0YXR1cz86ICdhY3RpdmUnIHwgJ2NhbmNlbGxlZCcgfCAnZXhwaXJlZCc7XHJcbiAgICAgICAgICBzdWJzY3JpcHRpb25fZXhwaXJlc19hdD86IHN0cmluZyB8IG51bGw7XHJcbiAgICAgICAgICBkb2N1bWVudHNfY291bnQ/OiBudW1iZXI7XHJcbiAgICAgICAgICBkb2N1bWVudHNfbGltaXQ/OiBudW1iZXI7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBVcGRhdGU6IHtcclxuICAgICAgICAgIGVtYWlsPzogc3RyaW5nO1xyXG4gICAgICAgICAgZnVsbF9uYW1lPzogc3RyaW5nIHwgbnVsbDtcclxuICAgICAgICAgIGF2YXRhcl91cmw/OiBzdHJpbmcgfCBudWxsO1xyXG4gICAgICAgICAgc3Vic2NyaXB0aW9uX3RpZXI/OiAnZnJlZScgfCAnYmFzaWMnIHwgJ3BybycgfCAnYnVzaW5lc3MnO1xyXG4gICAgICAgICAgc3Vic2NyaXB0aW9uX3N0YXR1cz86ICdhY3RpdmUnIHwgJ2NhbmNlbGxlZCcgfCAnZXhwaXJlZCc7XHJcbiAgICAgICAgICBzdWJzY3JpcHRpb25fZXhwaXJlc19hdD86IHN0cmluZyB8IG51bGw7XHJcbiAgICAgICAgICBkb2N1bWVudHNfY291bnQ/OiBudW1iZXI7XHJcbiAgICAgICAgICBkb2N1bWVudHNfbGltaXQ/OiBudW1iZXI7XHJcbiAgICAgICAgfTtcclxuICAgICAgfTtcclxuICAgICAgZG9jdW1lbnRzOiB7XHJcbiAgICAgICAgUm93OiB7XHJcbiAgICAgICAgICBpZDogc3RyaW5nO1xyXG4gICAgICAgICAgdXNlcl9pZDogc3RyaW5nO1xyXG4gICAgICAgICAgdGl0bGU6IHN0cmluZztcclxuICAgICAgICAgIG9yaWdpbmFsX2ZpbGVuYW1lOiBzdHJpbmc7XHJcbiAgICAgICAgICBmaWxlX3BhdGg6IHN0cmluZztcclxuICAgICAgICAgIGZpbGVfc2l6ZTogbnVtYmVyO1xyXG4gICAgICAgICAgZmlsZV90eXBlOiBzdHJpbmc7XHJcbiAgICAgICAgICBwYWdlX2NvdW50OiBudW1iZXIgfCBudWxsO1xyXG4gICAgICAgICAgc3RhdHVzOiAncHJvY2Vzc2luZycgfCAnY29tcGxldGVkJyB8ICdmYWlsZWQnO1xyXG4gICAgICAgICAgY3JlYXRlZF9hdDogc3RyaW5nO1xyXG4gICAgICAgICAgdXBkYXRlZF9hdDogc3RyaW5nO1xyXG4gICAgICAgIH07XHJcbiAgICAgIH07XHJcbiAgICAgIGFuYWx5c2VzOiB7XHJcbiAgICAgICAgUm93OiB7XHJcbiAgICAgICAgICBpZDogc3RyaW5nO1xyXG4gICAgICAgICAgZG9jdW1lbnRfaWQ6IHN0cmluZztcclxuICAgICAgICAgIHN1bW1hcnk6IHN0cmluZyB8IG51bGw7XHJcbiAgICAgICAgICBrZXlfcG9pbnRzOiBhbnk7XHJcbiAgICAgICAgICByaXNrczogYW55O1xyXG4gICAgICAgICAgb2JsaWdhdGlvbnM6IGFueTtcclxuICAgICAgICAgIGNoZWNrbGlzdDogYW55O1xyXG4gICAgICAgICAgc3R5bGU6ICdmb3JtYWwnIHwgJ2ZyaWVuZGx5JyB8ICdleHBlcnQnO1xyXG4gICAgICAgICAgY3JlYXRlZF9hdDogc3RyaW5nO1xyXG4gICAgICAgIH07XHJcbiAgICAgIH07XHJcbiAgICAgIGNoYXRfbWVzc2FnZXM6IHtcclxuICAgICAgICBSb3c6IHtcclxuICAgICAgICAgIGlkOiBzdHJpbmc7XHJcbiAgICAgICAgICBkb2N1bWVudF9pZDogc3RyaW5nO1xyXG4gICAgICAgICAgdXNlcl9pZDogc3RyaW5nO1xyXG4gICAgICAgICAgcm9sZTogJ3VzZXInIHwgJ2Fzc2lzdGFudCc7XHJcbiAgICAgICAgICBjb250ZW50OiBzdHJpbmc7XHJcbiAgICAgICAgICBjcmVhdGVkX2F0OiBzdHJpbmc7XHJcbiAgICAgICAgfTtcclxuICAgICAgfTtcclxuICAgIH07XHJcbiAgfTtcclxufTtcclxuIl0sIm5hbWVzIjpbImNyZWF0ZUNsaWVudCIsInN1cGFiYXNlVXJsIiwicHJvY2VzcyIsImVudiIsIk5FWFRfUFVCTElDX1NVUEFCQVNFX1VSTCIsInN1cGFiYXNlQW5vbktleSIsIk5FWFRfUFVCTElDX1NVUEFCQVNFX0FOT05fS0VZIiwic3VwYWJhc2UiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./src/lib/supabase.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/next-auth","vendor-chunks/@babel","vendor-chunks/@supabase","vendor-chunks/tslib","vendor-chunks/iceberg-js","vendor-chunks/jose","vendor-chunks/openid-client","vendor-chunks/oauth","vendor-chunks/@panva","vendor-chunks/yallist","vendor-chunks/preact-render-to-string","vendor-chunks/preact","vendor-chunks/oidc-token-hash","vendor-chunks/cookie"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.ts&appDir=C%3A%5CUsers%5Cadmin%5CDocuments%5Cdocument-explorer%5CRazyasnitel-documentov%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cadmin%5CDocuments%5Cdocument-explorer%5CRazyasnitel-documentov&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();