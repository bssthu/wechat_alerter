#!/usr/bin/env node
// -*- coding:utf-8 -*-
// File          : template-message.js
// Author        : bss
// Project       : wechat_alerter
// Description   : 发送模板消息
// 


var request = require('request');

var TEMPLATE_URL_PREFIX = 'https://api.weixin.qq.com/cgi-bin/message/template/send?access_token=';


/**
 * 发送模板消息
 * @param message 消息本体
 * @param accessToken ACCESS_TOKEN
 * @param templateId 模板ID
 * @param user 要推送的用户
 */
function sendTemplateMessage(message, accessToken, templateId, user) {

  var url = TEMPLATE_URL_PREFIX + accessToken;

  var json = {
    "touser": user,
    "template_id": templateId,
    "topcolor": "#FF0000",
    "data": {
      "Message": {
        "value": message,
        "color": "#000000"
      }
    }
  };

  var options = {
    url: url,
    method: 'POST',
    json: true,
    body: json
  };

  request(options, function(error, response, data) {
    try {
      if (data.errcode != 0) {
        console.log(data);
      }
    } catch (err) {
      console.log(err);
    }
  });
}


exports.sendTemplateMessage = sendTemplateMessage;
