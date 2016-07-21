'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = assert;
function validate(action) {
  if (!action.type) {
    return { error: true, message: 'missing field type in action assert or in an imported test' };
  }
  if (!action.selector) {
    return { error: true, message: 'missing field selector in action assert or in an imported test' };
  }
  if (action.type !== 'urlEquals' && action.type !== 'urlContains' && action.type !== 'elemExists' && action.type !== 'elemNotExists' && action.type !== 'text' && action.type !== 'containsText') {
    return { error: true, message: 'invalid field type in test assert, options available: urlEquals | urlContains | elemExists | elemNotExists | text | containsText' };
  }
  if ((action.type === 'text' || action.type === 'containsText') && !action.value) {
    return { error: true, message: 'missing field value in test assert (type text and containsText needs field value)' };
  }

  return { error: false };
}

function assert(action) {
  var result = validate(action);
  if (result.error) {
    return result;
  }

  if (!action.timeout) action.timeout = 1;

  switch (action.type) {
    case 'urlEquals':
      return '      browser.waitForElementPresent(\'' + action.selector + '\', ' + action.timeout + ', function(){\n        browser.assert.urlEquals(\'' + action.value + '\');\n      });\n      ';
    case 'urlContains':
      return '      browser.waitForElementPresent(\'' + action.selector + '\', ' + action.timeout + ', function(){\n        browser.assert.urlContains(\'' + action.value + '\');\n      });\n      ';
    case 'elemExists':
      return '      browser.waitForElementPresent(\'' + action.selector + '\', ' + action.timeout + ', function(){\n        browser.assert.elementPresent(\'' + action.selector + '\');\n      });\n      ';
    case 'elemNotExists':
      return '      browser.waitForElementNotPresent(\'' + action.selector + '\', ' + action.timeout + ', function(){\n        browser.assert.elementNotPresent(\'' + action.selector + '\');\n      });\n      ';
    case 'text':
      return '\t\t\tbrowser.waitForElementPresent(\'' + action.selector + '\', ' + action.timeout + ', true, function(){\n          browser.getText(\'' + action.selector + '\', function(result) {\n            browser.assert.equal(result.value, \'' + action.value + '\');\n          });\n        });';
    case 'containsText':
      return '\t\t\tbrowser.waitForElementPresent(\'' + action.selector + '\', ' + action.timeout + ', true, function(){\n          browser.assert.containsText(\'' + action.selector + '\', \'' + action.value + '\');\n        });';
  }
}