import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Heart } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { books } from '../data/books';

const Dashboard = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  
  // Get liked books
  const likedBooks = books.filter(book => 
    currentUser?.likedBooks.includes(book.id)
  );
  
  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Header */}
      <div className="flex items-center p-4 bg-white shadow-sm">
        <button onClick={() => navigate(-1)} className="p-2">
          <ChevronLeft size={24} className="text-gray-700" />
        </button>
        <h1 className="text-xl font-bold text-gray-800 ml-2">Your Profile</h1>
      </div>
      
      {/* Profile section */}
      <div className="bg-primary-600 text-white p-6">
        <div className="flex items-center">
          <div className="w-20 h-20 rounded-full bg-white overflow-hidden">
            <img 
              src={currentUser?.profileImage || "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=800"}
              alt="Profile" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="ml-4">
            <h2 className="text-2xl font-bold">{currentUser?.username || "BookLover"}</h2>
            <p className="opacity-80">{currentUser?.email || "user@example.com"}</p>
          </div>
        </div>
        
        <div className="flex mt-6 text-white">
          <div className="flex-1 text-center">
            <p className="text-2xl font-bold">{currentUser?.likedBooks.length || 0}</p>
            <p className="text-sm opacity-80">Liked</p>
          </div>
          <div className="flex-1 text-center">
            <p className="text-2xl font-bold">{currentUser?.dislikedBooks.length || 0}</p>
            <p className="text-sm opacity-80">Disliked</p>
          </div>
          <div className="flex-1 text-center">
            <p className="text-2xl font-bold">{currentUser?.skippedBooks.length || 0}</p>
            <p className="text-sm opacity-80">Skipped</p>
          </div>
        </div>
      </div>
      
      {/* Navigation */}
      <div className="flex border-b">
        <button className="flex-1 py-4 text-primary-600 border-b-2 border-primary-600 font-medium">
          Your Books
        </button>
        <button 
          className="flex-1 py-4 text-gray-500"
          onClick={() => navigate('/explore')}
        >
          Explore
        </button>
      </div>
      
      {/* Liked books */}
      <div className="flex-grow p-4 overflow-y-auto">
        <h3 className="font-bold text-lg mb-4 flex items-center">
          <Heart size={18} className="text-red-500 mr-2" />
          Books You've Liked
        </h3>
        
        {likedBooks.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-500">You haven't liked any books yet.</p>
            <button 
              onClick={() => navigate('/swipe')}
              className="btn btn-primary mt-4"
            >
              Start Swiping
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {likedBooks.map(book => (
              <div key={book.id} className="card h-full flex flex-col">
                <div className="h-40 overflow-hidden">
                  <img 
                    src={book.coverImage} 
                    alt={book.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-3 flex-grow">
                  <h4 className="font-medium line-clamp-1">{book.title}</h4>
                  <p className="text-sm text-gray-600">{book.author}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;