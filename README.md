
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
        "answer": [
            {
                "text": "Belum nemu info yang dicari?\n      Tenang, Maja.AI selalu siap bantu temukan info atau topik yang kamu butuhkan lebih mudah dan cepat.\n\n      Biar nyaman akses fiturnya, pastikan Sobat Majadigi sudah punya akun, ya!",
                "category": "greeting",
                "suggest_links": []
            }
        ]
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
          "id": 2,
          "sessionId": "509676f2-5584-4875-a2d9-9354c6f16b82",
          "lastMessage": "{\"{\\\"text\\\":\\\"Hai, Sobat Majadigi!\\\\n      Selamat datang di Maja.AI, asisten pintar yang bantu Kamu temukan info layanan publik lebih cepat.\\\\n      Mulai ngobrol yuk…\\\\n\\\\n      Ketik pertanyaan atau topik yang ingin Kamu tahu, Maja.AI siap bantu jawab!\\\",\\\"category\\\":\\\"greeting\\\",\\\"suggest_links\\\":[]}\"}",
          "createdAt": "2025-07-12T04:23:05.476+00:00",
          "updatedAt": "2025-07-12T04:23:06.331+00:00",
          "messages": [
              {
                  "id": 3,
                  "conversationId": 2,
                  "senderType": "user",
                  "message": "Apa itu Majagidi",
                  "createdAt": "2025-07-12T04:23:05.492+00:00",
                  "updatedAt": "2025-07-12T04:23:05.493+00:00"
              },
              {
                  "id": 4,
                  "conversationId": 2,
                  "senderType": "bot",
                  "message": "{\"{\\\"text\\\":\\\"Hai, Sobat Majadigi!\\\\n      Selamat datang di Maja.AI, asisten pintar yang bantu Kamu temukan info layanan publik lebih cepat.\\\\n      Mulai ngobrol yuk…\\\\n\\\\n      Ketik pertanyaan atau topik yang ingin Kamu tahu, Maja.AI siap bantu jawab!\\\",\\\"category\\\":\\\"greeting\\\",\\\"suggest_links\\\":[]}\"}",
                  "createdAt": "2025-07-12T04:23:06.326+00:00",
                  "updatedAt": "2025-07-12T04:23:06.326+00:00"
              }
          ]
      },
      {
          "id": 5,
          "sessionId": "a52588de-2232-4cfa-ac1f-c66946bb12dc",
          "lastMessage": "{\"{\\\"text\\\":\\\"Terima kasih sudah berinteraksi dengan Maja.AI, asisten virtual yang siap nunjukin info layanan publik dan hal menarik seputar Jawa Timur—semuanya lebih cepat dan praktis.\\\\n      Aplikasi Majadigi juga tersedia dalam versi mobile, lho!\\\\n\\\\n      Yuk, download Majadigi di ponselmu dan nikmati kemudahan akses layanan publik dalam satu aplikasi.\\\\n\\\\n      Majadigi\\\\n      Simple. Cerdas. Terhubung sepenuhnya.\\\",\\\"category\\\":\\\"greeting\\\",\\\"suggest_links\\\":[]}\"}",
          "createdAt": "2025-07-18T08:12:11.742+00:00",
          "updatedAt": "2025-07-18T08:12:15.704+00:00",
          "messages": [
              {
                  "id": 9,
                  "conversationId": 5,
                  "senderType": "user",
                  "message": "Hello, how are you?",
                  "createdAt": "2025-07-18T08:12:13.738+00:00",
                  "updatedAt": "2025-07-18T08:12:13.739+00:00"
              },
              {
                  "id": 10,
                  "conversationId": 5,
                  "senderType": "bot",
                  "message": "{\"{\\\"text\\\":\\\"Terima kasih sudah berinteraksi dengan Maja.AI, asisten virtual yang siap nunjukin info layanan publik dan hal menarik seputar Jawa Timur—semuanya lebih cepat dan praktis.\\\\n      Aplikasi Majadigi juga tersedia dalam versi mobile, lho!\\\\n\\\\n      Yuk, download Majadigi di ponselmu dan nikmati kemudahan akses layanan publik dalam satu aplikasi.\\\\n\\\\n      Majadigi\\\\n      Simple. Cerdas. Terhubung sepenuhnya.\\\",\\\"category\\\":\\\"greeting\\\",\\\"suggest_links\\\":[]}\"}",
                  "createdAt": "2025-07-18T08:12:15.641+00:00",
                  "updatedAt": "2025-07-18T08:12:15.641+00:00"
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
