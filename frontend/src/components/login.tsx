import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../hooks/useAuth';

const Login = () => {
  const [username, setUsername] = useState('');
  const [success, setSuccess] = useState('');
  const { login, loading: isLoading, error } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!username.trim()) {
      useAuthStore.setState({ error: 'Please enter a username to continue' });
      return;
    }
    
    try {
      await login(username);
      
      setSuccess(`Welcome, ${username}!`);
      
      setTimeout(() => {
        navigate('/');
      }, 1500);
      
    } catch (error) {
        console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-md shadow-md w-full max-w-md">
        <div className="flex flex-col space-y-6 items-center">
          <h2 className="text-3xl font-bold text-center text-green-500">
            Snake Game
          </h2>
          
          <p className="text-lg text-center text-gray-700">
            Enter your name to start playing
          </p>
          
          {error && (
            <div className="w-full bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
              {error}
            </div>
          )}
          
          {success && (
            <div className="w-full bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
              {success}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="w-full">
            <div className="flex flex-col space-y-4 w-full">
              <div className="flex flex-col">
                <label htmlFor="username" className="font-medium text-gray-700 mb-1">
                  Username
                </label>
                <input
                  id="username"
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>
              
              <button
                type="submit"
                className={`bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-md w-full transition duration-300 ${
                  isLoading ? 'opacity-70 cursor-not-allowed' : ''
                }`}
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
                    Processing...
                  </div>
                ) : (
                  'Start Playing'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;