# Snake Game Frontend

This is the frontend application for the Snake Game, built with React and Tailwind CSS.

## Tech Stack

- **React.js** - Frontend library for building the user interface
- **Tailwind CSS** - Utility-first CSS framework for styling
- **Zustand** - State management library (Assumption for state managment Zustand is used)
- **React Router** - Client-side routing
- **Axios** - HTTP client for API requests

## Features

- Interactive 2D Snake game with keyboard controls
- User authentication (login with username)
- Real-time score tracking
- Global leaderboard
- Responsive design

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation Steps

1. Clone the repository and navigate to the frontend directory:
   ```bash
   cd snake-game/frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

The application will be available at http://localhost:3000.

## Game Controls

- **Arrow Keys** - Control the snake's direction (Up, Down, Left, Right)
- **Spacebar** - Pause/Resume game

## Folder Structure

```
frontend/
├── public/                # Static assets
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── GameBoard.tsx  # Snake game board
│   │   ├── Login.tsx      # Login form
│   │   ├── Navbar.tsx     # Navigation bar
│   │   ├── Scoreboard.tsx # Score display
│   ├── hooks/           # State management
│   │   ├── useAuth.ts # Authentication store (using Zustand)
│   ├── pages/             # Page components
│   │   ├── Game.tsx       # Game page
│   │   ├── Home.tsx       # Home page
│   │   ├── Leaderboard.tsx# Leaderboard page
│   ├── utils/             # Utility functions
│   │   ├── api.ts         # API service
│   │   ├── gameLogic.ts   # Game mechanics
│   ├── App.tsx             # Main component
│   ├── index.tsx           # Entry point
│   └── index.css          # Global styles and Tailwind imports
├── package.json           # Dependencies and scripts
├── tailwind.config.js     # Tailwind CSS configuration
└── README.md              # Frontend documentation
```

## Building for Production

To create a production build:

```bash
npm run build
```

The build will be created in the `build` directory.

## API Connection

The frontend communicates with the backend API for:
- User authentication
- Score submission
- Leaderboard data retrieval
