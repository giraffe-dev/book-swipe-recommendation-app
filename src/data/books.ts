import { Book, Genre } from '../types';

export const genres: Genre[] = [
  {
    id: '1',
    name: 'Fiction',
    image: 'https://images.pexels.com/photos/1148399/pexels-photo-1148399.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: '2',
    name: 'Mystery',
    image: 'https://images.pexels.com/photos/3358707/pexels-photo-3358707.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: '3',
    name: 'Science Fiction',
    image: 'https://images.pexels.com/photos/2694037/pexels-photo-2694037.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: '4',
    name: 'Romance',
    image: 'https://images.pexels.com/photos/1024969/pexels-photo-1024969.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: '5',
    name: 'Fantasy',
    image: 'https://images.pexels.com/photos/3354675/pexels-photo-3354675.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: '6',
    name: 'Non-Fiction',
    image: 'https://images.pexels.com/photos/590493/pexels-photo-590493.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
];

export const books: Book[] = [
  {
    id: '1',
    title: 'The Midnight Library',
    author: 'Matt Haig',
    coverImage: 'https://images.pexels.com/photos/6373305/pexels-photo-6373305.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Between life and death there is a library, and within that library, the shelves go on forever. Every book provides a chance to try another life you could have lived.',
    genre: 'Fiction',
    likes: 1250,
  },
  {
    id: '2',
    title: 'Project Hail Mary',
    author: 'Andy Weir',
    coverImage: 'https://images.pexels.com/photos/2908984/pexels-photo-2908984.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Ryland Grace is the sole survivor on a desperate, last-chance mission—and if he fails, humanity and the Earth itself will perish.',
    genre: 'Science Fiction',
    likes: 980,
  },
  {
    id: '3',
    title: 'The Silent Patient',
    author: 'Alex Michaelides',
    coverImage: 'https://images.pexels.com/photos/3747139/pexels-photo-3747139.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Alicia Berenson\'s life is seemingly perfect. A famous painter married to an in-demand fashion photographer, she lives in a grand house with big windows overlooking a park in one of London\'s most desirable areas.',
    genre: 'Mystery',
    likes: 1560,
  },
  {
    id: '4',
    title: 'The Invisible Life of Addie LaRue',
    author: 'V.E. Schwab',
    coverImage: 'https://images.pexels.com/photos/5797908/pexels-photo-5797908.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'A Life No One Will Remember. A Story You Will Never Forget. France, 1714: in a moment of desperation, a young woman makes a Faustian bargain to live forever—and is cursed to be forgotten by everyone she meets.',
    genre: 'Fantasy',
    likes: 1320,
  },
  {
    id: '5',
    title: 'People We Meet on Vacation',
    author: 'Emily Henry',
    coverImage: 'https://images.pexels.com/photos/3155666/pexels-photo-3155666.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Poppy and Alex. Alex and Poppy. They have nothing in common. She\'s a wild child; he wears khakis. She has insatiable wanderlust; he prefers to stay home with a book.',
    genre: 'Romance',
    likes: 890,
  },
  {
    id: '6',
    title: 'Atomic Habits',
    author: 'James Clear',
    coverImage: 'https://images.pexels.com/photos/4065876/pexels-photo-4065876.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'No matter your goals, Atomic Habits offers a proven framework for improving—every day. James Clear, one of the world\'s leading experts on habit formation, reveals practical strategies that will teach you exactly how to form good habits, break bad ones, and master the tiny behaviors that lead to remarkable results.',
    genre: 'Non-Fiction',
    likes: 2100,
  },
  {
    id: '7',
    title: 'Klara and the Sun',
    author: 'Kazuo Ishiguro',
    coverImage: 'https://images.pexels.com/photos/5186869/pexels-photo-5186869.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'From her place in the store, Klara, an Artificial Friend with outstanding observational qualities, watches carefully the behavior of those who come in to browse, and of those who pass on the street outside.',
    genre: 'Fiction',
    likes: 750,
  },
  {
    id: '8',
    title: 'The House in the Cerulean Sea',
    author: 'TJ Klune',
    coverImage: 'https://images.pexels.com/photos/3617500/pexels-photo-3617500.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'A magical island. A dangerous task. A burning secret. Linus Baker leads a quiet, solitary life. At forty, he lives in a tiny house with a devious cat and his old records.',
    genre: 'Fantasy',
    likes: 1100,
  },
  {
    id: '9',
    title: 'The Last Thing He Told Me',
    author: 'Laura Dave',
    coverImage: 'https://images.pexels.com/photos/3747446/pexels-photo-3747446.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Before Owen Michaels disappears, he smuggles a note to his beloved wife of one year: Protect her. Despite her confusion and fear, Hannah Hall knows exactly to whom the note refers—Owen\'s sixteen-year-old daughter, Bailey.',
    genre: 'Mystery',
    likes: 920,
  },
  {
    id: '10',
    title: 'A Gentleman in Moscow',
    author: 'Amor Towles',
    coverImage: 'https://images.pexels.com/photos/4065899/pexels-photo-4065899.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'In 1922, Count Alexander Rostov is deemed an unrepentant aristocrat by a Bolshevik tribunal, and is sentenced to house arrest in the Metropol, a grand hotel across the street from the Kremlin.',
    genre: 'Fiction',
    likes: 1450,
  },
  {
    id: '11',
    title: 'The Vanishing Half',
    author: 'Brit Bennett',
    coverImage: 'https://images.pexels.com/photos/4065905/pexels-photo-4065905.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'The Vignes twin sisters will always be identical. But after growing up together in a small, southern black community and running away at age sixteen, it\'s not just the shape of their daily lives that is different as adults, it\'s everything.',
    genre: 'Fiction',
    likes: 1280,
  },
  {
    id: '12',
    title: 'Dune',
    author: 'Frank Herbert',
    coverImage: 'https://images.pexels.com/photos/3358707/pexels-photo-3358707.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Set on the desert planet Arrakis, Dune is the story of the boy Paul Atreides, heir to a noble family tasked with ruling an inhospitable world where the only thing of value is the "spice" melange.',
    genre: 'Science Fiction',
    likes: 1800,
  },
];

export const getTopBooksByGenre = (genreName: string): Book[] => {
  return books
    .filter((book) => book.genre === genreName)
    .sort((a, b) => b.likes - a.likes)
    .slice(0, 10);
};

export const getBooksByGenre = (genreName: string): Book[] => {
  return books.filter((book) => book.genre === genreName);
};

export const getAllBooks = (): Book[] => {
  return [...books];
};