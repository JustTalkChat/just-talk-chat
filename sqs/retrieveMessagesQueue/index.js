'use strict';

const AWS = require('aws-sdk');
const sqs = new AWS.SQS();

function retrieveMessagesFromQueue(userId) {
  let queueUrl = `https://sqs.REGION.amazonaws.com/ACCOUNT_ID/UserQueue_${userId}`;

  let params = {
      QueueUrl: queueUrl,
      MaxNumberOfMessages: 10 // retrieve up to 10 messages at once
  };

  sqs.receiveMessage(params, function(err, data) {
      if (err) console.error(err, err.stack);
      else {
          data.Messages.forEach(message => {
              // Process the message, for example, display it to the user
              console.log(JSON.parse(message.Body));

              // Delete the processed message from the queue
              let deleteParams = {
                  QueueUrl: queueUrl,
                  ReceiptHandle: message.ReceiptHandle
              };
              sqs.deleteMessage(deleteParams, function(err, data) {
                  if (err) console.error(err, err.stack);
              });
          });
      }
  });
}

