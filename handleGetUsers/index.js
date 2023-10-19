'use strict';
const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();
const usersTable = 'Users';

exports.handler = async (event) => {
    try {
        const params = {
            TableName: usersTable,
        };
        const users = await docClient.scan(params).promise();
        return {
            statusCode: 200,
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Credentials": true
            },
            body: JSON.stringify({ users: users.Items }),
        };
    } catch (error) {
        console.error('Error fetching users:', error.message);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: `Error fetching users: ${error.message}` }),
        };
    }
};
