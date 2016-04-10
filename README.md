# Real-Test
[![Build Status](https://travis-ci.org/lucasvmiguel/real-test.svg?branch=master)](https://travis-ci.org/lucasvmiguel/real-test)

Package that provides real e2e tests.

## Installation

```bash
$ npm install -g real_test
```

## Quick Start

```bash
$ real-test -c /home/user/documents/configs/example.json
```

to see more options:
```bash
$ real-test -h
```

## Advantages

* Real test E2E
* Easy to write tests
* Componentized

## Configuration

* If action url does not have a value attribute, the app will use url attribute in json
* You can set global variables, these variables will change in tests files (example: {"action": "pause", "value": "!!timeout"})
```json
  {
  "name": "CONFIG_A",
  "url":{
    "default": "http://www.google.com",
    "prefix": "",
    "sufix": ""
  },
  "variables":{
    "search": "real-test github lucasvmiguel"
  },
    "path": "/home/user/documents/tests"        "path where the app will read the tests"
  }
```

## Actions

* Header: some information to test(needs be the first action)
* IMPORTANT: you can't write action header with 'only' and 'notOnly' at same time
```json
  {
    "action": "header",
    "type": "helper",            "JUST FOR PARCIAL TEST"
    "only": "CONFIG_NAME_A",     "USE IT"
    "notOnly": "CONFIG_NAME_B"   "OR USE IT"
  }
```
* Import: import json inside test
* IMPORTANT: You need set header type helper to import a file
```json
  {
    "action": "import",
    "value": "Login"
  }
```
* Assert: compare something
```json
  {
    "action": "assert",
    "type": "urlContains|urlEquals|elemExists|elemNotExists|text",
    "value": "notebook",
    "timeout": 10000
  }
```
* Click: click on selector
```json
  {
    "action": "click",
    "required": true,
    "selector": "#nav-search > form > div.nav-right > div > input"
  }
```
* Desktop: change to view desktop
```json
  {
    "action": "desktop"
  }
```
* Phone: change to view phone
```json
  {
    "action": "phone"
  }
```
* Tablet: change to view tablet
```json
  {
    "action": "tablet"
  }
```
* Log: log into console
```json
  {
    "action": "log",
    "value": "message"
  }
```
* Pause: Pause the test for X milliseconds
```json
  {
    "action": "pause",
    "value": 5000
  }
```
* Write: Write text
```json
  {
    "action": "write",
    "timeout": 5000,
    "value": "message",
    "selector": "#nav-search > form > div.nav-right > div > input",
    "require": true
  }
```
* Url: Access url
```json
  {
    "action": "url",
    "value": "http://example.com.br"
  }
```

All actions are in actions [folder](code/actions)

## License

  [MIT](LICENSE)
