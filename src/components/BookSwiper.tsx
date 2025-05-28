import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Share, Menu, X, Check, ArrowUp, ThumbsUp, ThumbsDown } from 'lucide-react';
import { Book, SwipeDirection } from '../types';
import { useAuth } from '../context/AuthContext';
import { getBooksByGenre } from '../data/books';

const BookSwiper = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState<SwipeDirection>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [shareLink, setShareLink] = useState('');
  
  const cardRef = useRef<HTMLDivElement>(null);
  const startX = useRef(0);
  const startY = useRef(0);
  
  const { likeBook, dislikeBook, skipBook } = useAuth();
  const navigate = useNavigate();
  
  // Load books based on selected genre
  useEffect(() => {
    const selectedGenre = sessionStorage.getItem('selectedGenre') || 'Fiction';
    const genreBooks = getBooksByGenre(selectedGenre);
    setBooks(genreBooks);
  }, []);
  
  // Handle swiping logic
  const handleTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
    startY.current = e.touches[0].clientY;
  };
  
  const handleTouchMove = (e: React.TouchEvent) => {
    if (!cardRef.current) return;
    
    const currentX = e.touches[0].clientX;
    const currentY = e.touches[0].clientY;
    
    const diffX = currentX - startX.current;
    const diffY = currentY - startY.current;
    
    // Determine primary direction
    if (Math.abs(diffX) > Math.abs(diffY)) {
      // Horizontal swipe
      cardRef.current.style.transform = `translateX(${diffX}px) rotate(${diffX * 0.1}deg)`;
    } else if (diffY < -50) {
      // Vertical swipe (only up)
      cardRef.current.style.transform = `translateY(${diffY}px)`;
    }
  };
  
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!cardRef.current) return;
    
    const currentX = e.changedTouches[0].clientX;
    const currentY = e.changedTouches[0].clientY;
    
    const diffX = currentX - startX.current;
    const diffY = currentY - startY.current;
    
    // Reset transform
    cardRef.current.style.transform = '';
    
    // Check for significant swipe
    if (diffX > 100) {
      handleSwipe('right');
    } else if (diffX < -100) {
      handleSwipe('left');
    } else if (diffY < -100) {
      handleSwipe('up');
    }
  };
  
  // For mouse events (desktop)
  const handleMouseDown = (e: React.MouseEvent) => {
    startX.current = e.clientX;
    startY.current = e.clientY;
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };
  
  const handleMouseMove = (e: MouseEvent) => {
    if (!cardRef.current) return;
    
    const diffX = e.clientX - startX.current;
    const diffY = e.clientY - startY.current;
    
    if (Math.abs(diffX) > Math.abs(diffY)) {
      cardRef.current.style.transform = `translateX(${diffX}px) rotate(${diffX * 0.1}deg)`;
    } else if (diffY < -50) {
      cardRef.current.style.transform = `translateY(${diffY}px)`;
    }
  };
  
  const handleMouseUp = (e: MouseEvent) => {
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
    
    if (!cardRef.current) return;
    
    const diffX = e.clientX - startX.current;
    const diffY = e.clientY - startY.current;
    
    // Reset transform
    cardRef.current.style.transform = '';
    
    if (diffX > 100) {
      handleSwipe('right');
    } else if (diffX < -100) {
      handleSwipe('left');
    } else if (diffY < -100) {
      handleSwipe('up');
    }
  };
  
  const handleSwipe = (direction: SwipeDirection) => {
    if (!direction || currentIndex >= books.length) return;
    
    setSwipeDirection(direction);
    
    const currentBook = books[currentIndex];
    
    switch (direction) {
      case 'left':
        dislikeBook(currentBook.id);
        break;
      case 'right':
        likeBook(currentBook.id);
        break;
      case 'up':
        skipBook(currentBook.id);
        break;
    }
    
    // Move to next book after animation
    setTimeout(() => {
      setSwipeDirection(null);
      setCurrentIndex(prev => prev + 1);
    }, 500);
  };
  
  const handleButtonSwipe = (direction: SwipeDirection) => {
    handleSwipe(direction);
  };
  
  const handleShare = () => {
    if (currentIndex < books.length) {
      const book = books[currentIndex];
      // Generate a shareable link (in a real app, this would create a unique URL)
      const link = `https://bookswipe.app/share/${book.id}`;
      setShareLink(link);
      setIsShareModalOpen(true);
    }
  };
  
  const copyShareLink = () => {
    navigator.clipboard.writeText(shareLink);
    // You would show a toast or notification here in a real app
  };
  
  const navigateToDashboard = () => {
    navigate('/dashboard');
  };
  
  const navigateToExplore = () => {
    navigate('/explore');
  };
  
  // Check if we've gone through all books
  const isFinished = currentIndex >= books.length;
  
  // Current book
  const currentBook = !isFinished ? books[currentIndex] : null;
  
  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Header */}
      <div className="flex justify-between items-center p-4 bg-white shadow-sm">
        <div className="w-10"></div>
        <h1 className="text-xl font-bold text-primary-800">BookSwipe</h1>
        <div className="flex">
          <button onClick={handleShare} className="p-2">
            <Share size={24} className="text-gray-700" />
          </button>
          <button onClick={() => setIsMenuOpen(true)} className="p-2">
            <Menu size={24} className="text-gray-700" />
          </button>
        </div>
      </div>
      
      {/* Main content */}
      <div className="flex-grow flex items-center justify-center p-4">
        {isFinished ? (
          <div className="text-center p-6 animate-fade-in">
            <h2 className="text-2xl font-bold mb-4">You've viewed all books!</h2>
            <p className="text-gray-600 mb-6">Would you like to explore more genres or see your liked books?</p>
            <div className="flex flex-col gap-3">
              <button onClick={navigateToExplore} className="btn btn-primary">
                Explore More Books
              </button>
              <button onClick={navigateToDashboard} className="btn btn-outline">
                See Your Liked Books
              </button>
            </div>
          </div>
        ) : (
          <div 
            ref={cardRef}
            className={`swipe-card card w-full max-w-md h-[70vh] ${
              swipeDirection === 'left' ? 'swipe-left' : 
              swipeDirection === 'right' ? 'swipe-right' : 
              swipeDirection === 'up' ? 'swipe-up' : ''
            }`}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onMouseDown={handleMouseDown}
          >
            <div className="relative h-3/4">
              <img 
                src={currentBook?.coverImage} 
                alt={currentBook?.title} 
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent text-white">
                <h2 className="text-xl font-bold">{currentBook?.title}</h2>
                <p>{currentBook?.author}</p>
              </div>
              <div className="absolute top-4 right-4 bg-primary-500 text-white px-3 py-1 rounded-full text-sm">
                {currentBook?.genre}
              </div>
            </div>
            <div className="p-4 h-1/4 overflow-y-auto">
              <p className="text-gray-700">{currentBook?.description}</p>
            </div>
          </div>
        )}
      </div>
      
      {/* Action buttons */}
      {!isFinished && (
        <div className="p-6 flex justify-center gap-6">
          <button 
            onClick={() => handleButtonSwipe('left')}
            className="w-14 h-14 flex items-center justify-center rounded-full bg-red-100 text-red-500 shadow-md"
          >
            <X size={28} />
          </button>
          <button 
            onClick={() => handleButtonSwipe('up')}
            className="w-14 h-14 flex items-center justify-center rounded-full bg-blue-100 text-blue-500 shadow-md"
          >
            <ArrowUp size={28} />
          </button>
          <button 
            onClick={() => handleButtonSwipe('right')}
            className="w-14 h-14 flex items-center justify-center rounded-full bg-green-100 text-green-500 shadow-md"
          >
            <Check size={28} />
          </button>
        </div>
      )}
      
      {/* Menu drawer */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/50" onClick={() => setIsMenuOpen(false)}></div>
          <div className="relative w-64 h-full bg-white animate-slide-in-right ml-auto">
            <div className="p-6">
              <button 
                onClick={() => setIsMenuOpen(false)}
                className="absolute top-4 right-4"
              >
                <X size={24} />
              </button>
              
              <div className="flex flex-col items-center py-6">
                <div className="w-20 h-20 rounded-full bg-gray-200 overflow-hidden mb-4">
                  <img 
                    src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=800" 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h2 className="text-xl font-bold">BookLover</h2>
                <p className="text-gray-600 text-sm">user@example.com</p>
              </div>
              
              <div className="mt-6 space-y-4">
                <button 
                  onClick={navigateToDashboard}
                  className="w-full text-left p-3 rounded-lg hover:bg-gray-100"
                >
                  Your Library
                </button>
                <button 
                  onClick={navigateToExplore}
                  className="w-full text-left p-3 rounded-lg hover:bg-gray-100"
                >
                  Explore
                </button>
                <button 
                  className="w-full text-left p-3 rounded-lg hover:bg-gray-100"
                >
                  Settings
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Share modal */}
      {isShareModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setIsShareModalOpen(false)}></div>
          <div className="relative bg-white rounded-xl p-6 w-full max-w-md animate-slide-up">
            <button 
              onClick={() => setIsShareModalOpen(false)}
              className="absolute top-4 right-4"
            >
              <X size={20} />
            </button>
            
            <h3 className="text-xl font-bold mb-4">Share this book</h3>
            
            {currentBook && (
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-24 bg-gray-200 rounded overflow-hidden">
                  <img 
                    src={currentBook.coverImage} 
                    alt={currentBook.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold">{currentBook.title}</h4>
                  <p className="text-sm text-gray-600">{currentBook.author}</p>
                </div>
              </div>
            )}
            
            <div className="flex items-center mb-6">
              <input 
                type="text"
                value={shareLink}
                readOnly
                className="input-field"
              />
              <button 
                onClick={copyShareLink}
                className="ml-2 p-2 bg-primary-100 text-primary-600 rounded-lg"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                </svg>
              </button>
            </div>
            
            <div className="flex gap-3">
              <button className="btn btn-primary flex-1">
                Share via Email
              </button>
              <button className="btn btn-outline flex-1">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookSwiper;