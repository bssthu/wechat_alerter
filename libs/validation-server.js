#!/usr/bin/env node
// -*- coding:utf-8 -*-
// File          : validation-server.js
// Author        : bss
// Project       : wechat_alerter
// Description   : 微信接入身份验证
// 


var http = require('http');
var url = require('url');
var querystring = require('querystring');
var crypto = require('crypto');


/**
 * 微信接入身份验证
 * @param httpPort 端口，必须是 80
 * @param token 本地设置的 token，需要与网页上设置的“接口配置信息”的 Token 保持一致
 */
function serveValidationServer(httpPort, token) {

  var serve = function() {
    http.createServer(wechatReceiver).listen(httpPort);
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


exports.serve = serveValidationServer;
