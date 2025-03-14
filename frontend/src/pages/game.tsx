import { Navigate } from 'react-router-dom';
import useAuthStore from '../hooks/useAuth';
import GameBoard from '../components/game-board';

const Game = () => {
  const { user, loading } = useAuthStore();

  // If loading, show loading spinner
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  // If not logged in, redirect to login page
  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <GameBoard />
      </div>
    </div>
  );
};

export default Game;