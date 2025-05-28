import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThumbsUp, ThumbsDown, ArrowUp, Book } from 'lucide-react';

const GetReadyToSwipe = () => {
  const [isReady, setIsReady] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleContinue = () => {
    navigate('/swipe');
  };

  return (
    <div className="h-full flex flex-col items-center justify-center p-6 bg-gradient-to-br from-primary-100 to-accent-100 animate-fade-in">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary-600 text-white mb-6 animate-pulse">
          <Book size={40} />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          {isReady ? "Ready to Swipe!" : "Getting Your Books Ready..."}
        </h1>
        <p className="text-gray-600 max-w-md mx-auto">
          {isReady 
            ? "We've curated some amazing books just for you. Start swiping to find your next great read!" 
            : "We're preparing a personalized selection of books based on your preferences."}
        </p>
      </div>
      
      {isReady && (
        <div className="w-full max-w-md">
          <div className="grid grid-cols-3 gap-6 mb-10">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mb-2">
                <ThumbsDown className="text-red-500" size={24} />
              </div>
              <span className="text-sm text-gray-600">Swipe Left to Dislike</span>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-2">
                <ThumbsUp className="text-green-500" size={24} />
              </div>
              <span className="text-sm text-gray-600">Swipe Right to Like</span>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-2">
                <ArrowUp className="text-blue-500" size={24} />
              </div>
              <span className="text-sm text-gray-600">Swipe Up to Skip</span>
            </div>
          </div>
          
          <button onClick={handleContinue} className="btn btn-primary w-full">
            Start Swiping
          </button>
        </div>
      )}
    </div>
  );
};

export default GetReadyToSwipe;