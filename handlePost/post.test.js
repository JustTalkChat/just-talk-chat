const AWSMock = require('aws-sdk-mock');
const AWS = require('aws-sdk');
const { handler } = require('./index.js'); 

beforeEach(() => {
    AWSMock.setSDKInstance(AWS);
});

afterEach(() => {
    AWSMock.restore();
});

describe('handler', () => {
    it('returns 400 if event.body is missing', async () => {
        const response = await handler({});
        expect(response.statusCode).toBe(400);
    });

    it('returns 400 if message content or GroupChatId is missing', async () => {
        AWSMock.mock('DynamoDB.DocumentClient', 'get', (params, callback) => {
            callback(null, { Item: { UserID: 123, Username: 'John', Admin: false } });
        });

        const response = await handler({ body: JSON.stringify({ content: 'Hello' }), pathParameters: { id: '123' } });
        expect(response.statusCode).toBe(400);
    });

    it('handles database error when fetching user', async () => {
        AWSMock.mock('DynamoDB.DocumentClient', 'get', (params, callback) => {
            callback(new Error('DB Error')); // Simulate a DB error
        });

        const response = await handler({ body: JSON.stringify({}), pathParameters: { id: '123' } });
        expect(response.statusCode).toBe(500);
    });


});

