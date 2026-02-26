import { User } from '../types';

export const getCurrentUser = async (): Promise<User | null> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  const stored = localStorage.getItem('mock_user');
  if (stored) {
    return JSON.parse(stored);
  }
  return null;
};

export const login = async (email: string): Promise<User> => {
  await new Promise(resolve => setTimeout(resolve, 800));
  const user: User = {
    id: Math.random().toString(36).substring(2, 9),
    name: email.split('@')[0],
    email,
    plan: 'free',
    analysesCount: 0,
  };
  localStorage.setItem('mock_user', JSON.stringify(user));
  return user;
};

export const logout = () => {
  localStorage.removeItem('mock_user');
};
