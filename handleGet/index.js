const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient({ region: 'us-west-2' });

const messagesTable = 'Messages';

exports.handler = async (event) => {
  try {
    // Validate event and ensure GroupChatId is provided
    if (!event.pathParameters || !event.pathParameters.GroupChatId) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'GroupChatId must be provided in the path' }),
      };
    }

    const groupChatId = event.pathParameters.GroupChatId;

    // Set up parameters to query messages for the specified GroupChatId
    const params = {
      TableName: messagesTable,
      KeyConditionExpression: 'GroupChatId = :gci',
      ExpressionAttributeValues: {
        ':gci': groupChatId,
      },
    };

    // Fetch messages from DynamoDB
    const result = await docClient.query(params).promise();

    return {
      statusCode: 200,
      body: JSON.stringify(result.Items),
    };
  } catch (error) {
    console.error('Error fetching messages:', error.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: `Error fetching messages: ${error.message}` }),
    };
  }
};
