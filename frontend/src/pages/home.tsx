import { Link } from 'react-router-dom';
import useAuthStore from '../hooks/useAuth';
import GameBoard from '../components/game-board';

const Home = () => {
  const { user } = useAuthStore();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto py-8 px-4">
        {user ? (
          <GameBoard />
        ) : (
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex flex-col space-y-6 items-start flex-1">
              <h1 className="text-4xl font-bold text-green-500">
                Snake Game
              </h1>
              
              <p className="text-xl">
                Test your reflexes with this classic Snake Game! Navigate the snake to eat food 
                and grow longer, while avoiding collisions with walls and yourself.
              </p>
              
              <p className="text-lg">
                Login to play and track your scores on the leaderboard!
              </p>
              
              <ul className="space-y-3 my-4">
                <li className="flex items-center">
                  <span className="mr-2">🎮</span>
                  Use arrow keys to control the snake
                </li>
                <li className="flex items-center">
                  <span className="mr-2">🍎</span>
                  Eat food to grow and increase your score
                </li>
                <li className="flex items-center">
                  <span className="mr-2">⚠️</span>
                  Avoid collisions with walls and yourself
                </li>
                <li className="flex items-center">
                  <span className="mr-2">🏆</span>
                  Compete for the highest score on the leaderboard
                </li>
              </ul>
              
              <div className="flex space-x-4 mt-4">
                <Link 
                  to="/login" 
                  className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-md transition duration-300"
                >
                  Login to Play
                </Link>
                <Link 
                  to="/leaderboard" 
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-6 rounded-md transition duration-300"
                >
                  View Leaderboard
                </Link>
              </div>
            </div>
            
            <div className="flex-1 w-full max-w-md">
              <div className="w-full h-72 bg-white border-4 border-green-500 rounded-lg shadow-lg flex items-center justify-center">
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-green-500 mb-4">Ready to Play?</h2>
                  <p className="mb-6 text-gray-600">Login to start your Snake adventure!</p>
                  <Link 
                    to="/login" 
                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-md transition duration-300"
                  >
                    Login Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;