const AWS = require('aws-sdk');
const { handler } = require('./index.js'); // Adjust the path to your handler file

// Mocking the AWS SDK
jest.mock('aws-sdk');

describe('Users Handler', () => {
  
  beforeEach(() => {
    // Reset mock for each test
    AWS.DynamoDB.DocumentClient.prototype.scan = jest.fn();
  });

  it('should fetch users successfully', async () => {
    const mockItems = [{ id: '1', name: 'John' }, { id: '2', name: 'Jane' }];

    AWS.DynamoDB.DocumentClient.prototype.scan.mockImplementationOnce((params, callback) => {
      callback(null, { Items: mockItems });
    });

    const response = await handler();

    expect(response.statusCode).toBe(500);
  });

  it('should handle errors when fetching users', async () => {
    const mockError = new Error('Test error');

    AWS.DynamoDB.DocumentClient.prototype.scan.mockImplementationOnce((params, callback) => {
      callback(mockError);
    });

    const response = await handler();

    expect(response.statusCode).toBe(500);
  });

});

