'use strict';

const AWS = require('aws-sdk');
const sqs = new AWS.SQS();

function sendMessageToQueue(userId, message) {
  let queueUrl = `https://sqs.REGION.amazonaws.com/ACCOUNT_ID/UserQueue_${userId}`;

  let params = {
      MessageBody: JSON.stringify(message),
      QueueUrl: queueUrl
  };

  sqs.sendMessage(params, function(err, data) {
      if (err) console.error(err, err.stack);
      else console.log(`Message sent to user ${userId}'s queue.`);
  });
}
