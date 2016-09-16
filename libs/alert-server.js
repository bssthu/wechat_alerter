#!/usr/bin/env node
// -*- coding:utf-8 -*-
// File          : alert-server.js
// Author        : bss
// Project       : wechat_alerter
// Description   : 警告接收
// 


var http = require('http');


/**
 * 接收消息
 * 此处暂不加密
 * @param httpPort 接收消息的端口
 * @param token 设置的消息 token，用于验证客户端身份
 * @param updateMessage 更新消息的回调
 */
function serveAlertServer(httpPort, token, updateMessage) {

  var serve = function() {
    http.createServer(alertReceiver).listen(httpPort);
  };

  function alertReceiver(request, response) {
    if (request.method === 'POST') {
      request.setEncoding('utf-8');
      var postData = '';

      request.addListener('data', function (postDataChunk) {
        postData += postDataChunk;
      });

      request.addListener('end', function () {
        // 接收消息，格式如下：
        // {"token": "0000", "message": "hello world!"}
        response.end();
        parsePostData(postData);
      });
    } else {
      response.end();
    }
  }

  function parsePostData(postData) {
    var message = '';
    try {
      var json = JSON.parse(postData);
      if (token != json.token) {
        return;
      }
      message = json.message;
    } catch (err) {
      return;
    }
    updateMessage(message);
  }

  return serve();
}


exports.serve = serveAlertServer;
