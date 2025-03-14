import { useState, useEffect } from 'react';
import { getTopScores, getUserScores } from '../utils/api';
import useAuthStore from '../hooks/useAuth';

interface Score {
    _id: string;
    username: string;
    score: number;
    createdAt?: string;
    gameDate: string;
}
const Scoreboard = () => {
  const [topScores, setTopScores] = useState<Score[]>([]);
  const [userScores, setUserScores] = useState<Score[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<string>('top');
  const { user } = useAuthStore();
  
  const fetchScores = async () => {
    try {
      setLoading(true);
      
      // Fetch top scores
      const topScoresData = await getTopScores(10);
      setTopScores(topScoresData);
      
      // Fetch user scores if logged in
      if (user) {
        const userScoresData = await getUserScores();
        setUserScores(userScoresData);
      }
    } catch (error) {
      console.error('Error fetching scores:', error);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchScores();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);
  
  const formatDate = (dateString: string | undefined) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    };
    return new Date(dateString || '').toLocaleDateString(undefined, options);
  };
  
  const isCurrentUser = (username: string) => {
    return user && user.username === username;
  };
  
  return (
    <div>
      <h2 className="text-3xl font-bold mb-6 text-center text-green-500">
        Leaderboard
      </h2>
      
      <div className="flex mb-4 justify-center">
        <button
          className={`mr-2 px-4 py-2 rounded-md transition duration-300 ${
            activeTab === 'top' 
              ? 'bg-green-500 text-white' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
          onClick={() => setActiveTab('top')}
        >
          Top Scores
        </button>
        
        <button
          className={`px-4 py-2 rounded-md transition duration-300 ${
            activeTab === 'user'
              ? 'bg-green-500 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
          disabled={!user}
          onClick={() => setActiveTab('user')}
        >
          My Scores
        </button>
      </div>
      
      <div className="bg-white border border-gray-200 rounded-md overflow-hidden shadow-md">
        {loading ? (
          <div className="flex justify-center items-center min-h-[300px]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
          </div>
        ) : activeTab === 'top' ? (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[10%]">
                  Rank
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[40%]">
                  Player
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider w-[25%]">
                  Score
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[25%]">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {topScores.length > 0 ? (
                topScores.map((score, index) => (
                  <tr 
                    key={score._id}
                    className={isCurrentUser(score.username) ? "bg-green-50" : ""}
                  >
                    <td className="px-6 py-4 whitespace-nowrap font-medium">
                      {index === 0 ? (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                          1st
                        </span>
                      ) : index === 1 ? (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                          2nd
                        </span>
                      ) : index === 2 ? (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-orange-100 text-orange-800">
                          3rd
                        </span>
                      ) : (
                        `${index + 1}th`
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {score.username}
                      {isCurrentUser(score.username) && (
                        <span className="ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          You
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right font-bold">
                      {score.score}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {formatDate(score.createdAt || score.gameDate)}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="px-6 py-6 text-center">
                    No scores available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[10%]">
                  #
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider w-[50%]">
                  Score
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[40%]">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {userScores.length > 0 ? (
                userScores.map((score, index) => (
                  <tr key={score._id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right font-bold">
                      {score.score}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {formatDate(score.createdAt || score.gameDate)}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="px-6 py-6 text-center">
                    You haven't saved any scores yet. Play the game to add your scores!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
      
      {!user && activeTab === 'top' && (
        <p className="mt-4 text-center text-gray-600">
          Log in to track your scores and compare with others!
        </p>
      )}
      
      <div className="mt-6 flex justify-center">
        <button
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-md transition duration-300 flex items-center"
          onClick={fetchScores}
          disabled={loading}
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
              Loading...
            </>
          ) : (
            <>
              <span className="mr-2">🔄</span>
              Refresh Scores
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default Scoreboard;