'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = cookie;
function cookie(action) {

  switch (action.type) {
    case 'write':
      return '      browser.setCookie({\n        name: \'' + action.name + '\',\n        value: \'' + action.value + '\'\n      });\n      ';
    case 'assert':
      return '      browser.getCookie(\'' + action.name + '\', function(result){\n        this.assert.equal(result.value, \'' + action.value + '\');\n      });\n      ';
  }
}