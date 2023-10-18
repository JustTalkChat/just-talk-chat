const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient({ region: 'us-west-2' });

const messagesTable = 'Messages';
const usersTable = 'Users';  

exports.handler = async (event) => {
  try {
    // Validate event
    if (!event.body) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Invalid request body' }),
      };
    }

    // Capture the sender's ID from the path
    const senderId = parseInt(event.pathParameters.id, 10);

    // Check if user exists in the Users table
    const userCheckParams = {
      TableName: usersTable,
      Key: {
        UserID: senderId 
      }
    };

    const userResult = await docClient.get(userCheckParams).promise();

    if (!userResult.Item) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: 'User not found' }),
      };
    }

    // Parse the incoming message from the event body
    const message = JSON.parse(event.body);

    // Validate message content and GroupChatId
    if (!message || !message.content || !message.GroupChatId) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Invalid message content or GroupChatId' }),
      };
    }

    // Create new message for group chat
    const newMessage = {
      MessageId: Date.now().toString() + '-' + Math.random().toString(36).substring(2),
      GroupChatId: message.GroupChatId,
      Sender: senderId,
      Content: message.content,
      Timestamp: new Date().toISOString(),
    };

    const params = {
      TableName: messagesTable,
      Item: newMessage, 
    };

    await docClient.put(params).promise();

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Message sent to the group chat.' }),
    };
  } catch (error) {
    console.error('Error sending message:', error.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: `Error sending message: ${error.message}` }),
    };
  }
};
