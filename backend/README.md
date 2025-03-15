# Snake Game Backend

This is the backend server for the Snake Game application, providing API endpoints for user authentication and score management.

## Tech Stack

- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication

## Features

- RESTful API design
- User authentication (username only)
- Score tracking and persistence
- Leaderboard functionality
- JWT-based session management

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)

### Installation Steps

1. Clone the repository and navigate to the backend directory:
   ```bash
   cd snake-game/backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```
   PORT=3000
   MONGO_URI=mongodb://localhost:27017/snake-game
   JWT_SECRET=your_jwt_secret_key_here
   ```

   For MongoDB Atlas, use the connection string:
   ```
   MONGO_URI=mongodb+srv://<username>:<password>@<cluster-url>/<database-name>?retryWrites=true&w=majority
   ```

4. Start the server:
   ```bash
   # For production
   npm start
   
   # For development with auto-restart
   npm run dev
   ```

The server should be running on http://localhost:3000.

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
  ```json
  { "username": "string" }
  ```

- `POST /api/auth/login` - Login a user
  ```json
  { "username": "string" }
  ```

- `GET /api/auth/profile` - Get user profile (protected)

### Scores

- `GET /api/scores` - Get all scores
- `GET /api/scores/top?limit=10` - Get top scores with optional limit parameter
- `GET /api/scores/user` - Get logged-in user's scores (protected)
- `POST /api/scores` - Add a new score (protected)
  ```json
  { "score": number }
  ```

## Folder Structure

```
backend/
├── config/
│   └── db.js              # Database configuration
├── controllers/
│   ├── authController.js  # Authentication logic
│   └── scoreController.js # Score management logic
├── middleware/
│   └── authMiddleware.js  # JWT authentication middleware
├── models/
│   ├── User.js            # User database model
│   └── Score.js           # Score database model
├── routes/
│   ├── authRoutes.js      # Authentication routes
│   └── scoreRoutes.js     # Score management routes
├── server.js              # Main server file
├── package.json           # Dependencies and scripts
└── README.md              # Backend documentation
```

## Database Models

### User Model

```javascript
{
  username: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Score Model

```javascript
{
  user: ObjectId,
  username: String,
  score: Number,
  gameDate: Date,
  createdAt: Date,
  updatedAt: Date
}
```

## Error Handling

The API returns appropriate HTTP status codes and error messages:

- `400` - Bad Request (invalid input)
- `401` - Unauthorized (authentication required)
- `404` - Not Found
- `500` - Server Error

## Security Features

- JWT token-based authentication
- Protected routes with middleware
- No password storage (username-only authentication for simplicity)