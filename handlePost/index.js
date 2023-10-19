const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient({ region: 'us-west-2' });
const comprehend = new AWS.Comprehend();
const translate = new AWS.Translate();
const messagesTable = 'Messages';
const usersTable = 'Users';

exports.handler = async (event) => {
    try {
        if (!event.body) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: 'Invalid request body' }),
            };
        }

        const senderId = parseInt(event.pathParameters.id, 10);
        const userCheckParams = {
            TableName: usersTable,
            Key: {
                UserID: senderId
            }
        };
        const userResult = await docClient.get(userCheckParams).promise();
        if (!userResult.Item) {
            return {
                statusCode: 404,
                body: JSON.stringify({ message: 'User not found' }),
            };
        }

        const isAdmin = userResult.Item.Admin; 

        const message = JSON.parse(event.body);
        if (!message || !message.content || !message.GroupChatId) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: 'Invalid message content or GroupChatId' }),
            };
        }

        const username = userResult.Item.Username;
        const formattedContent = `${username}: ${message.content}`;

        let translatedContent = null; // Initialize with null

        if (message.translateTo) {
            translatedContent = await translateText(formattedContent, 'en', message.translateTo);
        }

        const sentimentData = await analyzeSentiment(formattedContent);
        const sentiment = sentimentData.Sentiment;
        if (sentiment === 'NEGATIVE' || sentiment === 'MIXED') {
            if (isAdmin) {
                console.log(`Alert! Admin with UserID: ${senderId} sent a ${sentiment} message.`);
            } else {
                console.log(`Alert! A ${sentiment} message was sent by UserID: ${senderId}`);
            }
        }

        const newMessage = {
            MessageId: Date.now().toString() + '-' + Math.random().toString(36).substring(2),
            GroupChatId: message.GroupChatId,
            Sender: senderId,
            Content: formattedContent,
            TranslatedContent: translatedContent, // Will be null if no translation was requested
            Timestamp: new Date().toISOString(),
            Sentiment: sentimentData.Sentiment
        };
        
        const params = {
            TableName: messagesTable,
            Item: newMessage,
        };
        await docClient.put(params).promise();

        return {
            statusCode: 200,
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Credentials": true
            },
            body: JSON.stringify({ message: 'Message sent to the group chat.' }),
        };

    } catch (error) {
        console.error('Error sending message:', error.message);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: `Error sending message: ${error.message}` }),
        };
    }
};

async function analyzeSentiment(text) {
    const params = {
        LanguageCode: 'en',
        Text: text
    };
    try {
        const sentimentData = await comprehend.detectSentiment(params).promise();
        return sentimentData;
    } catch (error) {
        console.error("Error analyzing sentiment:", error);
        throw error;
    }
}

async function translateText(input_text, source_language, target_language) {
    const params = {
        Text: input_text,
        SourceLanguageCode: source_language,
        TargetLanguageCode: target_language
    };
    try {
        const translatedData = await translate.translateText(params).promise();
        return translatedData.TranslatedText;
    } catch (error) {
        console.error("Error translating text:", error);
        throw error;
    }
}


