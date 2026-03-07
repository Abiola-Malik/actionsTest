/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 34:
/***/ ((module) => {

module.exports = require("@actions/core");

/***/ }),

/***/ 730:
/***/ ((module) => {

module.exports = require("@actions/github");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nccwpck_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			__webpack_modules__[moduleId](module, module.exports, __nccwpck_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete __webpack_module_cache__[moduleId];
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat */
/******/ 	
/******/ 	if (typeof __nccwpck_require__ !== 'undefined') __nccwpck_require__.ab = __dirname + "/";
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it uses a non-standard name for the exports (exports).
(() => {
var exports = __webpack_exports__;

Object.defineProperty(exports, "__esModule", ({ value: true }));
const core_1 = __nccwpck_require__(34);
const github_1 = __nccwpck_require__(730);
async function run() {
    const token = (0, core_1.getInput)("gh-token");
    const label = (0, core_1.getInput)("label");
    const octokit = (0, github_1.getOctokit)(token);
    const { pull_request } = github_1.context.payload;
    if (!pull_request) {
        (0, core_1.setFailed)("This action can only be run on pull_request events.");
        return;
    }
    const { owner, repo } = github_1.context.repo;
    const prNumber = pull_request.number;
    try {
        await octokit.rest.issues.addLabels({
            owner,
            repo,
            issue_number: prNumber,
            labels: [label],
        });
    }
    catch (error) {
        if (error instanceof Error) {
            (0, core_1.setFailed)(`Failed to add label: ${error.message}`);
        }
        else {
            (0, core_1.setFailed)(`Failed to add label: ${error}`);
        }
    }
}
run();

})();

module.exports = __webpack_exports__;
/******/ })()
;