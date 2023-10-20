# Software Requirements

## Vision

The vision of this product is to provide a real-time chat server that enables users to engage in instant messaging and communication over the internet, enhanced by AI-driven response suggestions. This project aims to solve the pain point of facilitating real-time conversations and collaboration between multiple users, making the experience more convenient and efficient.

## Scope (In/Out)

### IN - What will your product do:

1. **Real-Time Chat**: Users will be able to send and receive real-time messages in group chat.
2. **AI-Driven Response Suggestions**: The AI system will offer pre-written response options to users in group chats.
3. **Message Queuing**: The server will maintain a message queue to ensure messages are reliably delivered to users, even if they are temporarily offline.
4. **User Registration**: Users can register for accounts to participate in chat (AWS account).
5. **Message Logging**: The system will log chat messages for reference and history.
6. **Deploy on AWS**: The application will be deployable on AWS EC2 instances for accessibility.

### OUT - What will your product not do:

1. **Advanced Authentication**: This project will not include advanced user authentication features like JWT or OAuth.
2. **Advanced User Roles**: It will not implement complex user roles beyond basic user and message handling.

## Minimum Viable Product (MVP)

The MVP functionality will include:

1. Real-time chat functionality for sending and receiving messages.
2. Basic user registration and login.
3. Message queuing to ensure message delivery.
4. Message logging for chat history.
5. Deployment on AWS EC2.
6. AI-Driven response suggestions for users in group chats.

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
4. Messages are queued and delivered in real-time.
5. Chat messages are logged and retrievable.
6. Ai can filter out messages to help create a friendly chat environment.

## Data Flow

1. User registers and logs in.
2. User sends a message.
3. The message is queued on the server.
4. The message is received by AI.
5. The message is delivered in real-time to the recipient.
6. Messages are logged for reference and history.
7. AI privately asks other users if they'd like pre-written response options.
8. If user agrees, user receives response options in a private chat.

## Non-Functional Requirements

1. **Security**: The application will implement secure communication protocols to protect user data and messages during transmission.

   - Implementation: Using HTTPS for secure data transmission and authentication.

2. **Usability**: While the project doesn't include a frontend, it aims to offer an intuitive and user-friendly API, ensuring a smooth developer experience for integrating chat functionalities into various platforms.

   - Implementation: Providing a well-documented API with examples and adopting RESTful design principles.

These non-functional requirements are crucial for ensuring the application's security and usability while also considering factors like performance and scalability, which can be important for a real-time chat server.
