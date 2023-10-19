'use strict';
 const AWS = require('aws-sdk');
 const sqs = new AWS.SQS();

 function createUserQueue(userId) {
  let params = {
      QueueName: `UserQueue_${userId}`
  };

  sqs.createQueue(params, function(err, data) {
      if (err) console.error(err, err.stack);
      else console.log(`Queue created for user ${userId}:`, data.QueueUrl);
  });
}

