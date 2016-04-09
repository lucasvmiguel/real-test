'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = assert;

var _safe = require('colors/safe');

var _safe2 = _interopRequireDefault(_safe);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function assert(action) {
  if (!action.timeout) action.timeout = 1;

  switch (action.type) {
    case 'urlEquals':
      return '      browser.waitForElementPresent(\'' + action.selector + '\', ' + action.timeout + ', function(){\n        browser.assert.urlEquals(\'' + action.value + '\');\n      });\n      ';
    case 'urlContains':
      return '      browser.waitForElementPresent(\'' + action.selector + '\', ' + action.timeout + ', function(){\n        browser.assert.urlContains(\'' + action.value + '\');\n      });\n      ';
    case 'elemExists':
      return '      browser.waitForElementPresent(\'' + action.selector + '\', ' + action.timeout + ', function(){\n        browser.assert.elementPresent(\'' + action.selector + '\');\n      });\n      ';
    case 'elemNotExists':
      return '      browser.waitForElementPresent(\'' + action.selector + '\', ' + action.timeout + ', function(){\n        browser.assert.elementNotPresent(\'' + action.selector + '\');\n      });\n      ';
    case 'text':
      try {
        return '\t\t\tbrowser.waitForElementPresent(\'' + action.selector + '\', ' + action.timeout + ', true, function(){\n            browser.getText(\'' + action.selector + '\', function(result) {\n              if(!!result.value && typeof result.value === \'string\'){\n                this.assert.equal(result.value.toLowerCase(), \'' + action.value.toLowerCase() + '\');\n              }\n            });\n          });';
      } catch (e) {
        console.log(_safe2.default.red('Error to create assert action' + e));
        process.exit();
      }
  }
}