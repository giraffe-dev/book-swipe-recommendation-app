export interface User {
  id: string;
  email: string;
  username: string;
  profileImage: string;
  likedBooks: string[];
  dislikedBooks: string[];
  skippedBooks: string[];
}

export interface Book {
  id: string;
  title: string;
  author: string;
  coverImage: string;
  description: string;
  genre: string;
  likes: number;
}

export interface Genre {
  id: string;
  name: string;
  image: string;
}

export type SwipeDirection = 'left' | 'right' | 'up' | null;