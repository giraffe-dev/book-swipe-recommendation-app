import { createContext, useContext, useState, ReactNode } from 'react';
import { User } from '../types';

interface AuthContextType {
  currentUser: User | null;
  login: (email: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
  likeBook: (bookId: string) => void;
  dislikeBook: (bookId: string) => void;
  skipBook: (bookId: string) => void;
}

const defaultUser: User = {
  id: '1',
  email: 'user@example.com',
  username: 'BookLover',
  profileImage: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=800',
  likedBooks: [],
  dislikedBooks: [],
  skippedBooks: [],
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const login = (email: string) => {
    // In a real app, this would be an API call
    setCurrentUser({
      ...defaultUser,
      email,
    });
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const likeBook = (bookId: string) => {
    if (currentUser) {
      setCurrentUser({
        ...currentUser,
        likedBooks: [...currentUser.likedBooks, bookId],
      });
    }
  };

  const dislikeBook = (bookId: string) => {
    if (currentUser) {
      setCurrentUser({
        ...currentUser,
        dislikedBooks: [...currentUser.dislikedBooks, bookId],
      });
    }
  };

  const skipBook = (bookId: string) => {
    if (currentUser) {
      setCurrentUser({
        ...currentUser,
        skippedBooks: [...currentUser.skippedBooks, bookId],
      });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        login,
        logout,
        isAuthenticated: !!currentUser,
        likeBook,
        dislikeBook,
        skipBook,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};