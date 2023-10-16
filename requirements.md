# Software Requirements

## Vision

The vision of this product is to provide a real-time chat server that enables users to engage in instant messaging and communication over the internet. This project aims to solve the pain point of facilitating real-time conversations and collaboration between multiple users. We should care about this product because it offers a reliable and efficient platform for real-time communication, which can be used in a variety of applications, from social networking to business collaboration.

## Scope (In/Out)

### IN - What will your product do:

1. **Real-Time Chat**: Users will be able to send and receive real-time messages in individual and group chats.
2. **Message Queuing**: The server will maintain a message queue to ensure messages are reliably delivered to users, even if they are temporarily offline.
3. **User Registration**: Users can register for accounts to participate in chat.
4. **Message Logging**: The system will log chat messages for reference and history.
5. **Deploy on AWS**: The application will be deployable on AWS EC2 instances for accessibility.

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

## Stretch Goals

Stretch goals for this project may include:

1. Enhanced User Authentication: Implementing JWT-based user authentication.
2. User Roles: Introducing different user roles and permissions.
3. Private Messaging: Supporting private one-on-one messaging.
4. Channels: Adding support for group chat channels.
5. Notifications: Implementing real-time notifications for new messages.

## Functional Requirements

Functional requirements include tasks such as:

1. Users can register and create accounts (cognito?).
2. Users can log in and log out.
3. Users can send messages to other users.
4. Messages are queued and delivered in real-time.
5. Chat messages are logged and retrievable.

## Data Flow

1. User registers and logs in.
2. User sends a message.
3. The message is queued on the server.
4. The message is delivered in real-time to the recipient.
5. Messages are logged for reference and history.

## Non-Functional Requirements

1. **Security**: The application will implement secure communication protocols to protect user data and messages during transmission.

   - Implementation: Using HTTPS for secure data transmission and authentication.

2. **Usability**: The user interface should be intuitive and user-friendly, ensuring a smooth user experience.

   - Implementation: Implementing a responsive and user-friendly chat interface.

These non-functional requirements are crucial for ensuring the application's security and usability while also considering factors like performance and scalability, which can be important for a real-time chat server.
