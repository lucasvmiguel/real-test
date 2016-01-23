# Real-Test
[![Build Status](https://travis-ci.org/lucasvmiguel/real-test.svg?branch=master)](https://travis-ci.org/lucasvmiguel/real-test)

Package that provides real e2e tests.

## Installation

```bash
$ git clone https://github.com/lucasvmiguel/real-test
```

## Quick Start

```bash
$ npm start [--CONFIG]
```

## Advantages

* Real test E2E
* Easy to write tests
* Componentized

## Actions

* Assert: compare something
```json
  {
    "action": "assert",
    "type": "urlContains|urlEquals",
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
* Log: log into console
```json
  {
    "action": "log",
    "value": "message"
  }
```
* Logger: get log from console in browser
```json
  {
    "action": "logger",
  }
```
* Pause: Pause the test for X milliseconds
```json
  {
    "action": "pause",
    "value": 5000
  }
```
* Read: Read text(assert)
```json
  {
    "action": "read",
    "timeout": 5000,
    "value": "message",
    "selector": "#nav-search > form > div.nav-right > div > input",
    "require": true
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

All actions are in actions [folder](actions)

## Configuration

* If you dont pass the CONFIG arg(terminal), we will run the default configuration
* You can have more than one config file
* If action url does not have a value attribute, the app will use url attribute in json
* originPath is the path where the app will read the tests
* destPath is the path where the app will compile the tests
```json
  {
  "url":{
    "default": "",
    "prefix": "",
    "sufix": ""
  },
    "originPath": "./tests/",
    "destPath": "./tests_written/",
    "format": "utf8"
  }
```

## License

  [MIT](LICENSE)
