'strict';

const AWS = require('aws-sdk');
const sqs = new AWS.SQS();

function deleteUserQueue(userId) {
  let queueUrl = `https://sqs.REGION.amazonaws.com/ACCOUNT_ID/UserQueue_${userId}`;

  let params = {
      QueueUrl: queueUrl
  };

  sqs.deleteQueue(params, function(err, data) {
      if (err) console.error(err, err.stack);
      else console.log(`Queue for user ${userId} deleted.`);
  });
}
