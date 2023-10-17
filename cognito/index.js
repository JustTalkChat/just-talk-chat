const AWS = require('aws-sdk');
const Cognito = new AWS.CognitoIdentityServiceProvider();

exports.handler = async (event) => {
    try {
        // Parse and validate input
        const body = JSON.parse(event.body);
        if (!body.username || !body.password || !body.email) {
            throw new Error('Missing required fields: username, password, or email.');
        }

        // Validate email format (basic check)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(body.email)) {
            throw new Error('Invalid email format.');
        }

        // Construct Cognito parameters
        const params = {
            UserPoolId: process.env.USER_POOL_ID, // Using environment variable for User Pool ID
            Username: body.username,
            MessageAction: 'SUPPRESS',
            TemporaryPassword: body.password, // This is a temporary password; consider generating a random one
            UserAttributes: [
                {
                    Name: 'email',
                    Value: body.email
                }
            ]
        };

        // Register the user in Cognito
        await Cognito.adminCreateUser(params).promise();

        // Successful registration response
        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'User registered successfully!' })
        };

    } catch (error) {
        // Error handling
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message })
        };
    }
};
