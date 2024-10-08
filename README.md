# Backend API

This project is a backend API built with Express.js that manages user data and job postings. It integrates with Firebase for authentication and Firestore for data storage.

## Features

- **User Management**: Create and retrieve user information.
- **Job Management**: Create job postings and retrieve job data.
- **Error Handling**: Proper error handling for 404 and 500 errors.

## Technologies Used

- **Express.js**: Web framework for Node.js.
- **Firebase**: Used for authentication and Firestore database.
- **dotenv**: Environment variable management.
- **CORS**: Cross-Origin Resource Sharing configuration.
- **body-parser**: Parse incoming request bodies in middleware.

## Getting Started

### Prerequisites

Ensure you have Node.js and npm installed.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/backend-api.git
   cd backend-api
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your environment variables:

   ```bash
   PORT=3000
   ```

4. Set up Firebase:
   - Obtain your Firebase service account key in JSON format.
   - Place it in the project under `src/db/` as `serviceAccountKey.json`.

### Running the Server

Start the server using the following command:

```bash
npm start
```

The server will run on `http://localhost:3000`.

## API Endpoints

### User Endpoints

- **Create User**: `POST /users/create`

  - Body:
    ```json
    {
      "uid": "string",
      "email": "string",
      "username": "string",
      "name": "string",
      "lastName": "string",
      "phone": "string",
      "countryName": "string",
      "provinceName": "string",
      "cityName": "string"
    }
    ```
  - Response:
    ```json
    { "message": "User created successfully" }
    ```

- **Get User by ID**: `GET /users/:uid`
  - Headers: `authtoken` (Optional, if authorization is required)
  - Response:
    ```json
    { "user": { ...userData } }
    ```

### Job Endpoints

- **Create Job Post**: `POST /createpost`

  - Body:
    ```json
    {
      "uid": "string",
      "title": "string",
      "description": "string",
      "location": "string"
    }
    ```
  - Response: `Post created successfully!`

- **Get All Jobs**: `GET /jobs`

  - Response:
    ```json
    { "jobs": [ ...jobData ] }
    ```

- **Get Job by Title**: `GET /jobs/:title`
  - Response:
    ```json
    { "job": { ...jobData } }
    ```

## Error Handling

- **404 Error**: For any undefined routes.

  - Response:
    ```json
    {
      "msg": "Something was wrong, please check the code",
      "reqMethod": "GET/POST/etc",
      "reqPath": "/path",
      "reqQuery": { ...queryParams },
      "reqBody": { ...bodyParams }
    }
    ```

- **500 Error**: For any internal server errors.
  - Response:
    ```json
    { "msg": "Internal server error" }
    ```
