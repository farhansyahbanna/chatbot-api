
# Chatbot REST API

This is a simple REST API for a chatbot system, built with **AdonisJS v6** and **PostgreSQL**. The API allows users to send questions, stores the conversation history, and interacts with an external chatbot service to provide answers.

## Features

  * Send a question to the chatbot.
  * Save user questions and bot responses to the database.
  * Retrieve a list of all conversations.
  * Retrieve all messages from a specific conversation.
  * Delete a specific conversation.

## Prerequisites

Before you begin, ensure you have the following installed on your system:

  * Node.js (v18 or higher recommended)
  * PostgreSQL

## Installation & Setup

Follow these steps to get the application up and running on your local machine.

1.  **Clone the Repository**

    ```bash
    git clone <your-repository-url>
    cd chatbot-api
    ```

2.  **Install Dependencies**

    ```bash
    npm install
    ```

3.  **Configure Environment Variables**
    Create a `.env` file by copying the example file:

    ```bash
    cp .env.example .env
    ```

    Open the `.env` file and update the PostgreSQL database credentials:

    ```env
    DB_HOST=localhost
    DB_PORT=5432
    DB_USER=your_postgres_user
    DB_PASSWORD=your_postgres_password
    DB_DATABASE=chatbot_db
    ```

4.  **Run Database Migrations**
    Execute the following command to create the necessary tables (`conversations` and `messages`) in your database:

    ```bash
    node ace migration:run
    ```

## Running the Application

To start the development server, run the following command:

```bash
node ace serve --watch
```

The API will be available at `http://localhost:3333`.

## API Endpoints

Here is the documentation for the available API endpoints.

-----

### 1\. Send a Question

Receives a question, forwards it to an external chatbot API, and stores both the question and the answer.

  * **Method**: `POST`
  * **Endpoint**: `/questions`
  * **Body** (JSON):
    ```json
    {
      "question": "Hello, how are you?"
    }
    ```
  * **Success Response** (200 OK):
    ```json
    {
      "answer": "Hello! I am a bot. How can I assist you today?"
    }
    ```

-----

### 2\. Get All Conversations

Retrieves a list of all conversations, including their associated messages.

  * **Method**: `GET`
  * **Endpoint**: `/conversations`
  * **Success Response** (200 OK):
    ```json
    [
        {
            "id": 1,
            "sessionId": "a1b2c3d4-e5f6-7890-1234-567890abcdef",
            "lastMessage": "I am doing great, thanks!",
            "createdAt": "2025-07-12T04:30:00.000Z",
            "updatedAt": "2025-07-12T04:30:05.000Z",
            "messages": [
                {
                    "id": 1,
                    "conversationId": 1,
                    "senderType": "user",
                    "message": "Hello, how are you?",
                    "createdAt": "2025-07-12T04:30:00.000Z"
                },
                {
                    "id": 2,
                    "conversationId": 1,
                    "senderType": "bot",
                    "message": "I am doing great, thanks!",
                    "createdAt": "2025-07-12T04:30:05.000Z"
                }
            ]
        }
    ]
    ```

-----

### 3\. Get a Specific Conversation

Retrieves a single conversation and its messages by its `id`.

  * **Method**: `GET`
  * **Endpoint**: `/conversations/:id`
  * **Success Response** (200 OK):
      * The response format is the same as a single object in the "Get All Conversations" endpoint.
  * **Error Response** (404 Not Found):
    ```json
    {
      "message": "Conversation not found"
    }
    ```

-----

### 4\. Delete a Conversation

Deletes a specific conversation and all of its associated messages by its `id`.

  * **Method**: `DELETE`
  * **Endpoint**: `/conversations/:id`
  * **Success Response**: `204 No Content`
  * **Error Response** (404 Not Found): If the conversation with the specified `id` does not exist.
