import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import LoginForm from './components/LoginForm';
import GenreSelection from './components/GenreSelection';
import GetReadyToSwipe from './components/GetReadyToSwipe';
import BookSwiper from './components/BookSwiper';
import Dashboard from './components/Dashboard';
import Explore from './components/Explore';

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route 
            path="/select-genre" 
            element={
              <ProtectedRoute>
                <GenreSelection />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/get-ready" 
            element={
              <ProtectedRoute>
                <GetReadyToSwipe />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/swipe" 
            element={
              <ProtectedRoute>
                <BookSwiper />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/explore" 
            element={
              <ProtectedRoute>
                <Explore />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;