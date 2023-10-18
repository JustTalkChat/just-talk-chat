const AWS = require('aws-sdk');
const Cognito = new AWS.CognitoIdentityServiceProvider();

exports.handler = async (event) => {
    try {
        // Parse and validate input
        let body;
        if (event.body && typeof event.body === "string") {
            try {
                body = JSON.parse(event.body);
            } catch (parseError) {
                throw new Error('Invalid request body. Ensure it is a valid JSON.');
            }
        } else if (event.body && typeof event.body === "object") {
            body = event.body;
        } else {
            throw new Error('Request body is missing or not in expected format.');
        }

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
            UserPoolId: process.env.USER_POOL_ID,
            Username: body.username,
            MessageAction: 'SUPPRESS',
            TemporaryPassword: body.password,
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
