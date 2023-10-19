const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    const userId = parseInt(event.pathParameters.id, 10);

    if (!userId) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: 'UserID is required' }),
        };
    }

    const getParams = {
        TableName: 'Users',
        Key: {
            UserID: userId
        }
    };

    try {
        const user = await dynamoDB.get(getParams).promise();
        
        if (!user.Item) {
            return {
                statusCode: 404,
                body: JSON.stringify({ error: 'User not found' }),
            };
        }

        const deleteParams = {
            TableName: 'Users',
            Key: {
                UserID: userId
            }
        };
        
        await dynamoDB.delete(deleteParams).promise();
        return {
            statusCode: 200,
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Credentials": true
            },
            body: JSON.stringify({ message: 'User deleted successfully' }),
        };

    } catch (error) {
        console.error('Error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Could not delete user' }),
        };
    }
};
