#!/usr/bin/env node
// -*- coding:utf-8 -*-
// File          : server.js
// Author        : bss
// Project       : wechat_alerter
// Description   : https://github.com/bssthu/wechat_alerter
// 


// custom modules
var validationServer = require('./libs/validation-server');

// configs
var config = require('./conf/config');


validationServer.serve(config.httpPort, config.token);
