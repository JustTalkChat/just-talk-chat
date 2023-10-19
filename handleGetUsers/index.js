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
        // Here we are assuming that the username field exists for each user
        const username = users.Items.map(user => user.Username);
        return {
            statusCode: 200,
            body: JSON.stringify({ username }),
        };
    } catch (error) {
        console.error('Error fetching users:', error.message);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: `Error fetching users: ${error.message}` }),
        };
    }
};

