import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { marshall } from "@aws-sdk/util-dynamodb";
import fs from 'fs';

// Configure AWS service
const dynamodb = new DynamoDBClient({ region: "us-west-2" });

// Define the DynamoDB table name
const tableName = "Messages";
console.log('CHECKING TO VERIFY TABLENAME', tableName);

export const handler = async (event) => {
  // Load the event input from the event.json file
  const eventInput = JSON.parse(fs.readFileSync('event.json', 'utf8'));
  console.log('Simulated Event Input:', eventInput);

  // Use eventInput as the event object
  event = eventInput;

  try {
    // Parse the incoming message from the event body
    const message = JSON.parse(event.body);
    console.log(message);

    // Create a new chat message with a unique message ID
    const newMessage = {
      MessageId: Date.now().toString(),
      Sender: message.sender,
      Recipient: message.recipient,
      Content: message.content,
      Timestamp: new Date().toISOString(),
    };
    console.log('VERIFYING TO SEE IF I GET NEW MESSAGE', newMessage)

    // Create parameters for putting the message into DynamoDB
    const params = {
      TableName: tableName,
      Item: marshall(newMessage), // Marshall the data for DynamoDB
    };

    // Save the message to DynamoDB
    await dynamodb.send(new PutItemCommand(params));

    // Return a success response
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Message sent successfully" }),
    };
  } catch (error) {
    console.error("Error sending message:", error);
    // Return an error response
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Error sending message" }),
    };
  }
};
