# MERN Authentication with JWT, OAuth, and Redux

## Overview

This project implements a full-stack authentication system using the **MERN** stack (MongoDB, Express, React, Node.js), integrating **JWT** (JSON Web Token) for secure authentication and **OAuth** for Google authentication. **Redux** is used for state management in the frontend to provide a smooth and efficient user experience. The application supports user registration, login, and authentication via Google, with protected routes requiring valid tokens.

<!-- ![App Screenshot](./images/app-screenshot.png)  
*Example of the login screen on the app.* -->

## Features

- **JWT Authentication**: Secure user login and session management with JWT tokens.
- **Google OAuth Integration**: Users can sign in using their Google account.
- **Redux State Management**: A global state is managed using Redux to store user authentication data.
- **Protected Routes**: Routes that require authentication are protected and can only be accessed with a valid JWT.
- **Password Hashing**: Secure password storage with bcrypt.
- **Responsive UI**: Designed with responsive layouts for a seamless experience on mobile and desktop devices (TailwindCSS).

## Technologies Used

- **Frontend**:
  - React
  - Redux
  - Async Fetch (for API calls)
  - React Router (for routing)
  - JWT (for token management)
  
- **Backend**:
  - Node.js
  - Express.js
  - MongoDB (for database)
  - JWT (for authentication)
  - bcryptjs (for password hashing)
  - dotenv (for environment variables)

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/johnwaithira/mern-auth.git
cd mern-auth
```

### 2. Install Backend Dependencies

Go to the `mern-auth` directory and install the required backend packages:

```bash
# in the root folder of mern-auth run this commend

npm install
```

### 3. Set up environment variables

In the `root dir { mern-auth }` directory, create a `.env` file and add the following:

```

PORT=3000
MONGO=your_mongo_connection_string
JWT_SECRET=your_jwt_secret

```

- Replace `your_jwt_secret` with a secret string for JsonWebToken.
- Replace `your_mongo_connection_string` with your MongoDB connection URI.

### 4. Install Frontend Dependencies

Go to the `frontend` directory and install the required frontend packages:

```bash
cd frontend
npm install
```

### 5. Running the Application

#### Backend (Api)

From the `mern-auth` directory, run:

```bash
npm run dev
```

This will start the backend server on `http://localhost:3000`.

#### Frontend (Client)

From the `frontend` directory, run:

```bash
npm run dev
```

This will start the frontend React app on `http://localhost:5173`.

## API Endpoints

### User Authentication

- **POST /api/auth/login**
  - Authenticates the user with email and password.
  - Request body:
    ```json
    {
      "email": "user@example.com",
      "password": "userpassword"
    }
    ```
  - Response:
    - 200: JWT token is returned upon successful authentication.
    - 400: Error message for invalid credentials.

- **POST /api/auth/google**
  - Authenticates the user using Google OAuth.
  - Google OAuth is integrated to allow users to sign in using their Google account.
  - Response:
    - 200: JWT token is returned along with user information.
    - 400: Error message if authentication fails.

- **POST /api/auth/register**
  - Registers a new user with email, name, and password.
  - Request body:
    ```json
    {
      "email": "user@example.com",
      "name": "User Name",
      "password": "userpassword"
    }
    ```
  - Response:
    - 201: Success message with the user data.
    - 400: Error message for failed registration (e.g., email already in use).

### Protected Routes

- **GET /api/user**
  - Retrieves user data for authenticated users.
  - **Requires JWT token** in the request header:
    ```bash
    Authorization: Bearer <your_jwt_token>
    ```
  - Response:
    - 200: User data if the token is valid.
    - 401: Unauthorized if the token is invalid or missing.

## Redux Setup

- **authSlice**: Manages the authentication state, including login, logout, and user data.
- **store**: Combines all slices into a single Redux store.
  
For authentication, the token is stored in the Redux state, and the user’s information is available globally within the app.

## Using Fetch for API Calls

The app uses the built-in `fetch` API for making asynchronous HTTP requests. Here’s an example of how the login process is handled:

```js
 try {
      const res = await fetch("/user/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        }
        , body: JSON.stringify(formData)
      })
      const data = await res.json()      
      if (data.success === false) {
        dispatch(signinFailure(data.message))
        toast.error(data.message)
        return
      }
      dispatch(signinSuccess(data))
      toast.success("Logged in")
      navigate("/")
      console.log(data);
    } catch (error) {
      dispatch(signinFailure(data.message))
      return
    }
```

<!-- ## Screenshots -->

<!-- ![Login Page](./images/login-page.png)  
*Screenshot of the login page in the app.*

![Dashboard](./images/dashboard.png)  
*Screenshot of the dashboard page after logging in.* -->

## Contributing

1. Fork the repository.
2. Clone your fork to your local machine.
3. Create a new branch (`git checkout -b feature-name`).
4. Make changes and commit them (`git commit -am 'Add new feature'`).
5. Push to the branch (`git push origin feature-name`).
6. Open a pull request to the main repository.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Special thanks to [Google Developer Console](https://console.developers.google.com/) for OAuth integration.
- Thanks to the MERN community for continuous support.




