const LINE_TOKEN = 'rb9LoWNL8K6suDSBRQZYfX9/x6x7XntscsZNDfdW+TEqhD3YdIi8rQQzoKHa72MK09c1fy8zu8N7uhoh0nT4px919DKJMnLdBWNnjqhCQwVkJOaONqyhG2JUDjK0vVgYcHRBnZXtzF7PAnS/YXL6KQdB04t89/1O/w1cDnyilFU=';
const LINE_ENDPOINT = "https://api.line.me/v2/bot/message/reply";
const LINE_USERID = 'Ub60ea87ca5e547fcbd766aee6f24ced2';

// LINEからPOSTリクエストが渡されてきたときに実行される処理
function doPost(e) {
  const json = JSON.parse(e.postData.contents);
  let message = 'あなたは「' + json.events[0].message.text + '」と言いましたね！';
  lineReply(json, message);
}

// LINEへの応答
function lineReply(json, replyText) {

  // 応答用のメッセージを作成
  const message = {
    "replyToken": json.events[0].replyToken,
    "messages": [{
      "type": "text",
      "text": replyText
    }] // メッセージの内容
  };
  // LINE側へデータを返す際に必要となる情報
  options = {
    "method": "post",
    "headers": {
      "Content-Type": "application/json; charset=UTF-8",
      "Authorization": "Bearer " + LINE_TOKEN
    },
    "payload": JSON.stringify(message)
  };
  // LINEへ応答メッセージを返す
  UrlFetchApp.fetch(LINE_ENDPOINT, options);
}

function linePush(e) {
  let message = 'GASからのメッセージです';
  lineReply(message);
}

// LINEへの応答
function lineReply(replyText) {

  const headers = {
    "Authorization": "Bearer " + LINE_TOKEN,
    'Content-type': 'application/json'
  }
  const messages = {
    "headers": headers,
    "to": LINE_USERID,
    "messages": [{
      "type": "text",
      "text": replyText
    }]
  };
  const options = {
    "headers": headers,
    "payload": JSON.stringify(messages)
  };

  UrlFetchApp.fetch(LINE_ENDPOINT, options);
}