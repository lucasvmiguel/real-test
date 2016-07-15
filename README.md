# Real-Test
[![Build Status](https://travis-ci.org/lucasvmiguel/real-test.svg?branch=master)](https://travis-ci.org/lucasvmiguel/real-test)

Package that provides real e2e tests.

## Installation

```bash
$ sudo apt-get install xvfb # just to run hidden tests
$ npm install -g nightwatch
$ npm install -g real-test
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

* You can set global variables, these variables will change in tests files (example: {"action": "pause", "value": "!!timeout"})
```json
  {
  "name": "CONFIG_A",
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
    "value": "notebook", (required only with type text)
    "timeout": 10000
  }
```
* Cookie: write or assert
```json
  {
    "action": "cookie",
    "type": "write",
    "value": "b2b"
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
* Resize: resize the screen
```json
  {
    "action": "resize",
    "value": "desktop|mobile|tables"
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
