const { handler } = require('./index.js');


jest.mock('aws-sdk', () => {
  return {
      Translate: jest.fn().mockImplementation(() => {
          return {
              translateText: jest.fn().mockReturnValue({
                  promise: jest.fn().mockResolvedValue({ TranslatedText: 'Hola' }),
              }),
          };
      }),
  };
});

describe('AWS Translate handler', () => {

    it('should handle missing parameters gracefully', async () => {
        const event = {};

        const response = await handler(event);
        console.log("Response body:", response.body);  
        expect(response.statusCode).toBe(200);
    });

    it('should return a 200 status code for proper inputs', async () => {
        const event = {
            input_text: 'Hello',
            source_language: 'en',
            target_language: 'es'
        };

        const response = await handler(event);
        expect(response.statusCode).toBe(200);
        expect(typeof JSON.parse(response.body).translatedText).toBe('string');
    });
});

