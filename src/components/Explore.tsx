import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Search } from 'lucide-react';
import { genres, getTopBooksByGenre } from '../data/books';
import { Book } from '../types';

const Explore = () => {
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const [topBooks, setTopBooks] = useState<Book[]>([]);
  const navigate = useNavigate();
  
  const handleGenreSelect = (genreName: string) => {
    setSelectedGenre(genreName);
    const books = getTopBooksByGenre(genreName);
    setTopBooks(books);
  };
  
  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Header */}
      <div className="flex items-center p-4 bg-white shadow-sm">
        <button onClick={() => navigate(-1)} className="p-2">
          <ChevronLeft size={24} className="text-gray-700" />
        </button>
        <h1 className="text-xl font-bold text-gray-800 ml-2">Explore</h1>
      </div>
      
      {/* Search */}
      <div className="p-4 bg-white shadow-sm">
        <div className="relative">
          <input
            type="text"
            placeholder="Search for books or authors"
            className="input-field pl-10"
          />
          <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
        </div>
      </div>
      
      {/* Navigation */}
      <div className="flex border-b">
        <button 
          className="flex-1 py-4 text-gray-500"
          onClick={() => navigate('/dashboard')}
        >
          Your Books
        </button>
        <button className="flex-1 py-4 text-primary-600 border-b-2 border-primary-600 font-medium">
          Explore
        </button>
      </div>
      
      {/* Genres */}
      <div className="p-4">
        <h3 className="font-bold text-lg mb-4">Browse by Genre</h3>
        <div className="flex overflow-x-auto pb-4 space-x-3 -mx-4 px-4 scrollbar-hide">
          {genres.map(genre => (
            <button
              key={genre.id}
              className={`flex-shrink-0 px-4 py-2 rounded-full border transition ${
                selectedGenre === genre.name 
                  ? 'bg-primary-600 text-white border-primary-600' 
                  : 'bg-white text-gray-700 border-gray-200'
              }`}
              onClick={() => handleGenreSelect(genre.name)}
            >
              {genre.name}
            </button>
          ))}
        </div>
      </div>
      
      {/* Top Books */}
      <div className="flex-grow p-4 overflow-y-auto">
        {selectedGenre ? (
          <>
            <h3 className="font-bold text-lg mb-4">Top Books in {selectedGenre}</h3>
            
            <div className="space-y-4">
              {topBooks.map(book => (
                <div key={book.id} className="card flex">
                  <div className="w-20 h-28 flex-shrink-0 overflow-hidden">
                    <img 
                      src={book.coverImage} 
                      alt={book.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-3 flex-grow">
                    <h4 className="font-medium">{book.title}</h4>
                    <p className="text-sm text-gray-600">{book.author}</p>
                    <div className="flex items-center mt-2">
                      <div className="flex items-center text-secondary-500">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                        </svg>
                        <span className="ml-1 text-sm">{book.likes}</span>
                      </div>
                      <span className="ml-3 text-xs text-gray-500">{book.genre}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {topBooks.length > 0 && (
              <div className="mt-6 text-center">
                <button 
                  onClick={() => {
                    sessionStorage.setItem('selectedGenre', selectedGenre);
                    navigate('/swipe');
                  }}
                  className="btn btn-primary"
                >
                  Start Swiping {selectedGenre} Books
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-10 text-gray-500">
            <p>Select a genre to see top books</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Explore;