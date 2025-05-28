import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { genres } from '../data/books';

const GenreSelection = () => {
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleGenreSelect = (genreId: string) => {
    setSelectedGenre(genreId);
  };

  const handleContinue = () => {
    if (selectedGenre) {
      const genre = genres.find(g => g.id === selectedGenre);
      if (genre) {
        // Store selected genre in sessionStorage for later use
        sessionStorage.setItem('selectedGenre', genre.name);
        navigate('/get-ready');
      }
    }
  };

  return (
    <div className="h-full flex flex-col p-6 animate-fade-in">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Select a Genre</h1>
        <p className="text-gray-600 mt-2">What are you in the mood for today?</p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 flex-grow">
        {genres.map((genre) => (
          <div 
            key={genre.id}
            className={`card relative cursor-pointer transition-transform hover:scale-105 ${
              selectedGenre === genre.id ? 'ring-4 ring-primary-500' : ''
            }`}
            onClick={() => handleGenreSelect(genre.id)}
          >
            <div className="h-32 md:h-48 overflow-hidden">
              <img 
                src={genre.image} 
                alt={genre.name} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
              <span className="text-white font-medium p-3">{genre.name}</span>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-8">
        <button
          className={`btn btn-primary w-full ${!selectedGenre ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={!selectedGenre}
          onClick={handleContinue}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default GenreSelection;