#!/usr/bin/env node
// -*- coding:utf-8 -*-
// File          : server.js
// Author        : bss
// Project       : wechat_alerter
// Description   : https://github.com/bssthu/wechat_alerter
// 


// custom modules
var validationServer = require('./libs/validation-server');
var accessTokenMgr = require('./libs/access-token');
var alertServer = require('./libs/alert-server');
var templateMessageMgr = require('./libs/template-message');

// configs
var config = require('./conf/config');

// 接入身份验证
validationServer.serve(config.httpPort, config.token);

// 获取 ACCESS_TOKEN
var ACCESS_TOKEN_URI =
    'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential' + '' +
    '&appid=' + config.appId + '&secret=' + config.appsecret;
var accessToken = '';

accessTokenMgr.AccessToken(ACCESS_TOKEN_URI, function(newAccessToken) {
    accessToken = newAccessToken;
});

// 接收消息
alertServer.serve(config.clientPort, config.clientToken, function(message) {
    config.users.forEach(function(user) {
        templateMessageMgr.sendTemplateMessage(message, accessToken, config.templateId, user);
    });
    console.log(message);
});
