#!/usr/bin/env node
// -*- coding:utf-8 -*-
// File          : validation-server.js
// Author        : bss
// Project       : wechat_alerter
// Description   :
// 


var http = require('http');
var https = require('https');
var url = require('url');
var querystring = require('querystring');
var crypto = require('crypto');


function ServeValidationServer(httpPort, token) {

  var serve = function() {
    var validationHttpServer = http
        .createServer(wechatReceiver)
        .listen(httpPort);
  };

  function wechatReceiver(request, response) {
    var query = querystring.parse(url.parse(request.url).query);

    var arr = [ token, query.timestamp, query.nonce ];
    var cryptoSrc = arr.sort().join('');
    var sha1 = crypto.createHash('sha1');
    var signature = sha1.update(cryptoSrc).digest('hex');

    // 身份验证，见“接入指南”
    // http://mp.weixin.qq.com/wiki/17/2d4265491f12608cd170a95559800f2d.html
    if (query.signature === signature) {
      if (query.hasOwnProperty('echostr')) {
        response.write(query.echostr);
      }
    }
    response.end();
  }

  return serve();
}


exports.serve = ServeValidationServer;