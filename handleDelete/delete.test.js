const { handler } = require('./index.js');  // Adjust the path to your actual file
const AWS = require('aws-sdk');

jest.mock('aws-sdk');

describe('Delete user handler', () => {
  let mockGet, mockDelete;

  beforeEach(() => {
    mockGet = jest.fn();
    mockDelete = jest.fn();
    AWS.DynamoDB.DocumentClient.prototype.get = mockGet;
    AWS.DynamoDB.DocumentClient.prototype.delete = mockDelete;
  });

  test('should return 400 if userId is not provided', async () => {
    const event = {
      pathParameters: {}
    };

    const response = await handler(event);

    expect(response.statusCode).toBe(400);
    expect(JSON.parse(response.body)).toEqual({ error: 'UserID is required' });
  });

  test('should return 500 if there is an error', async () => {
    mockGet.mockReturnValueOnce({
      promise: jest.fn().mockRejectedValueOnce(new Error('Some error'))
    });

    const event = {
      pathParameters: { id: '123' }
    };

    const response = await handler(event);

    expect(response.statusCode).toBe(500);
    expect(JSON.parse(response.body)).toEqual({ error: 'Could not delete user' });
  });
});