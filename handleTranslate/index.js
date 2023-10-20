const AWS = require('aws-sdk');
const translate = new AWS.Translate();

exports.handler = async (event) => {
    try {
        const { input_text, source_language, target_language } = event;

        const params = {
            Text: input_text,
            SourceLanguageCode: source_language,
            TargetLanguageCode: target_language
        };

        const response = await translate.translateText(params).promise();
        return {
            statusCode: 200,
            body: JSON.stringify({ translatedText: response.TranslatedText })
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message })
        };
    }
};

