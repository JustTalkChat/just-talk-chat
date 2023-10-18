const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient({ region: 'us-west-2' });
const messagesTable = 'Messages';
exports.handler = async (event) => {
    try {
        // Validate event
        if (!event.pathParameters || !event.pathParameters.id) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: 'Invalid request, GroupChatId is missing' }),
            };
        }
        // Capture the GroupChatId from the path
        const groupChatId = event.pathParameters.id;
        // Query the Messages table for the given GroupChatId
        const params = {
            TableName: messagesTable,
            KeyConditionExpression: "GroupChatId = :gcid",
            ExpressionAttributeValues: {
                ":gcid": groupChatId
            }
        };
        const messages = await docClient.query(params).promise();
        if (!messages.Items || messages.Items.length === 0) {
            return {
                statusCode: 404,
                body: JSON.stringify({ message: 'No messages found for the given GroupChatId' }),
            };
        }
        return {
            statusCode: 200,
            body: JSON.stringify({ messages: messages.Items }),
        };
    } catch (error) {
        console.error('Error fetching messages:', error.message);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: `Error fetching messages: ${error.message}` }),
        };
    }
};
