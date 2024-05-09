# User Authentication System with Express and MongoDB

This is a simple user authentication system built with Express.js and MongoDB. It provides endpoints for user registration, login, and a placeholder for forgot password functionality.

## Installation

1. Clone the repository:

    ```
   https://github.com/Mohammad-Parwez/Task1.git
    ```

2. Install dependencies:

    ```
    cd ./backend
    npm install
    ```

3. Set up MongoDB:

    - Make sure MongoDB is installed and running on your system.
    - Update the MongoDB connection URI in `app.js` if needed (`mongodb://localhost:27017/backend` by default).

4. Start the server:

    ```
    nodemon ./app.js
    ```

5. Access the application at `http://localhost:6391` by default.

## Usage

- **User Registration**: Send a POST request to `/api/auth/register` with `email`, `username`, and `password` fields in the request body. Example:

    ```
    POST /api/auth/register
    Content-Type: application/json

    {
        "email": "example@example.com",
        "username": "example_user",
        "password": "password123"
    }
    ```

- **User Login**: Send a POST request to `/api/auth/login` with `username` and `password` fields in the request body. Example:

    ```
    POST /api/auth/login
    Content-Type: application/json

    {
        "username": "example_user",
        "password": "password123"
    }
    ```

- **Forgot Password**: A placeholder route is available at `/api/auth/forgotpassword` for future implementation of the forgot password functionality.
- 
- **creating Post**:Send a POST request to `/api/autth/posts` with `username` and `content` fields in the request body. Example:

    ```
    POST /api/auth/login
    Content-Type: application/json

    {
        "username": "example_user",
        "password": "password123"
    }
    ```
    - **Reading Post**:Send a GET request to `/api/autth/posts`. Example:

    ```
    POST /api/auth/posts
    Content-Type: application/json
  ```
  - **Updating Post**:Send a PUT request to `/api/autth/posts/:postid` with `content` fields in the request body. Example:

    ```
    PUT /api/auth/posts/:postid
    Content-Type: application/json

    {
        "content": "New content"
    }
    ```
    - **Like Post**:Send a POST request to `/api/autth/posts/:postid/like` with `userId` fields in the request body. Example:

    ```
    POST /api/auth/posts/:postId/like
    Content-Type: application/json

    {
        "userId": "/:userId"
    }
    ```
    - **commenting on Post**:Send a POST request to `/api/autth/posts/:postid/comment` with `userId` and `text` fields in the request body. Example:

    ```
    POST /api/auth/posts/:postid/comment
    Content-Type: application/json

    {
        "userId": "/:userId",
        "text": "password123"
    }
    ```
    - **Deleting Post**:Send a DELETE request to `/api/autth/posts/:postId`. Example:

    ```
    DELETE /api/auth/posts/:postId
    Content-Type: application/json

    {
        
    }
    ```
## Dependencies

- express
- body-parser
- mongoose
- bcryptjs

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
