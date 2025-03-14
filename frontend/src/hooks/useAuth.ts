import { create } from 'zustand';
import { loginUser, registerUser } from '../utils/api';

const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem('user') || 'null'),
  loading: false,
  error: null,
  
  // Login user
  login: async (username: string) => {
    try {
      set({ loading: true, error: null });
      const data = await loginUser(username);
      
      localStorage.setItem('user', JSON.stringify(data));
      set({ user: data, loading: false });
      
      return data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      set({ 
        error: error.response?.data?.message || 'Login failed', 
        loading: false 
      });
      throw error;
    }
  },
  
  // Register user
  register: async (username: string) => {
    try {
      set({ loading: true, error: null });
      const data = await registerUser(username);
      
      // Save to state and local storage
      localStorage.setItem('user', JSON.stringify(data));
      set({ user: data, loading: false });
      
      return data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      set({ 
        error: error.response?.data?.message || 'Registration failed', 
        loading: false 
      });
      throw error;
    }
  },
  
  // Logout user
  logout: () => {
    localStorage.removeItem('user');
    set({ user: null });
  },
  
  // Clear errors
  clearError: () => set({ error: null }),
}));

export default useAuthStore;