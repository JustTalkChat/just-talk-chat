const AWS = require('aws-sdk');
const { handler } = require('./index.js'); // Replace with path to your Lambda handler file

// Mocking the AWS SDK's DynamoDB DocumentClient
AWS.DynamoDB.DocumentClient = jest.fn();

describe('Basic tests for handler function', () => {
    
    it('should return 400 if GroupChatId is missing', async () => {
        const event = {};
        const response = await handler(event);

        expect(response.statusCode).toBe(400);
        expect(JSON.parse(response.body)).toEqual({ message: 'Invalid request, GroupChatId is missing' });
    });
});
