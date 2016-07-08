'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = cookie;
function cookie(action) {

  switch (action.type) {
    case 'write':
      return '      browser.setCookie({\n        name: \'' + action.name + '\',\n        value: \'' + action.value + '\'\n      });\n      ';
  }
}