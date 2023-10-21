# Software Requirements

## Vision

The vision of this product is to offer a dynamic chat room where users from around the world can engage in real-time conversations. With our built-in translation feature, users can effortlessly communicate across languages, breaking down linguistic barriers and fostering global connections. Leveraging advanced AI, the platform proactively filters and identifies toxic messages, ensuring a positive communication environment. For enhanced moderation, administrators are granted access to a private chatroom, where they can review all flagged toxic content. This unique combination of features makes our platform both user-friendly, secure, and globally accessible.

## Scope (In/Out)

### IN - What will your product do:

1. **Real-Time Chat with Translation**: Users will be able to send and receive real-time messages in group chat and have them translated in real-time.
2. **AI-Driven Toxic Content Detection**: The AI system will monitor and flag toxic content to ensure a positive communication environment.
3. **Administrator Private Chatroom**: Administrators can review flagged content in a dedicated chatroom.
4. **User Registration**: Users can register for accounts to participate in chat (AWS account).
5. **Message Logging**: The system will log chat messages for reference and history.

### OUT - What will your product not do:

1. **Advanced Authentication**: This project will not include advanced user authentication features like JWT or OAuth.
2. **Advanced User Roles**: It will not implement complex user roles beyond basic user and admin.

## Minimum Viable Product (MVP)

The MVP functionality will include:

1. Real-time chat functionality for sending, receiving, and translating messages.
2. Basic user registration and login.
3. AI-Driven detection of toxic content in messages.
4. Message logging for chat history.
5. Administrator private chatroom for reviewing flagged content.

## Stretch Goals

Stretch goals for this project may include:

1. Enhanced User Authentication: Implementing JWT-based user authentication.
2. User Roles: Introducing different user roles and permissions.
3. Private Messaging: Supporting private one-on-one messaging.
4. Channels: Adding support for group chat channels.
5. Notifications: Implementing real-time notifications for new messages.

## Functional Requirements

Functional requirements include tasks such as:

1. Users can register and create accounts (AWS accounts, possibly Cognito).
2. Users can log in and log out(AWS account).
3. Users can send messages to other users.
4. Messages are delivered in real-time.
5. Chat messages are logged and retrievable.
6. AI can filter out toxic messages and flag them for review.

## Data Flow

1. User registers and logs in (AWS account).
2. User sends a message.
3. The message is received by AI for toxicity check.
4. The message is stored in the database.
5. The message is delivered in real-time to the recipient.
6. Messages are logged for reference and history.
7. If flagged by AI, administrators are notified in the private chatroom.

## Non-Functional Requirements

1. **Security**: The application will implement secure communication protocols to protect user data and messages during transmission.

   - Implementation: Using HTTPS for secure data transmission and authentication.

2. **Usability**: While the project doesn't include a frontend, it aims to offer an intuitive and user-friendly API, ensuring a smooth developer experience for integrating chat functionalities into various platforms.

   - Implementation: Providing a well-documented API with examples and adopting RESTful design principles.

These non-functional requirements are crucial for ensuring the application's security and usability while also considering factors like performance and scalability, which can be important for a real-time chat server.
