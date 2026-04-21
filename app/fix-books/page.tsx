'use client';

import { loadBooks, saveBooks, Book } from '@/app/lib/localStore';
import { useState } from 'react';

export default function FixBooksPage() {
  const [message, setMessage] = useState('');

  const genreImages: Record<string, string[]> = {
    horror: [
      '/images/books/Horror/book-horror-1.png',
      '/images/books/Horror/book-horror-2.png',
      '/images/books/Horror/book-horror-3.png',
      '/images/books/Horror/book-horror-4.png',
      '/images/books/Horror/book-horror-5.png',
      '/images/books/Horror/book-horror-6.png',
    ],
    fantasy: [
      '/images/books/Fantasy/book-fantasy-1.png',
      '/images/books/Fantasy/book-fantasy-2.png',
      '/images/books/Fantasy/book-fantasy-3.png',
      '/images/books/Fantasy/book-fantasy-4.png',
      '/images/books/Fantasy/book-fantasy-5.png',
      '/images/books/Fantasy/book-fantasy-6.png',
    ],
    romance: [
      '/images/books/romance/book-romance-1.png',
      '/images/books/romance/book-romance-2.png',
      '/images/books/romance/book-romance-3.png',
      '/images/books/romance/book-romance-4.png',
      '/images/books/romance/book-romance-5.png',
      '/images/books/romance/book-romance-6.png',
    ],
    scifi: [
      '/images/books/sci-fi/book-scifi-1.png',
      '/images/books/sci-fi/book-scifi-2.png',
    ],
    mystery: [
      '/images/books/mystery/book-mystery-1.png',
      '/images/books/mystery/book-mystery-2.png',
    ],
    adventure: [
      '/images/books/adventure/book-adventure-1.png',
      '/images/books/adventure/book-adventure-2.png',
    ],
  };

  const fixBooks = () => {
    const books = loadBooks();
    const fixedBooks: Book[] = [];
    
    // Group books by genre
    const booksByGenre: Record<string, Book[]> = {};
    books.forEach(book => {
      if (!booksByGenre[book.genre]) {
        booksByGenre[book.genre] = [];
      }
      booksByGenre[book.genre].push(book);
    });
    
    // Assign proper images
    Object.keys(booksByGenre).forEach(genre => {
      const genreBooks = booksByGenre[genre];
      const images = genreImages[genre] || [];
      
      genreBooks.forEach((book, index) => {
        const imageIndex = index % images.length;
        fixedBooks.push({
          ...book,
          image: images[imageIndex] || `/images/books/${genre}/book-${genre}-${index + 1}.png`,
          totalChapters: book.totalChapters || 24,
          totalPages: book.totalPages || 300,
        });
      });
    });
    
    saveBooks(fixedBooks);
    setMessage(`Fixed ${fixedBooks.length} books! Refresh the page.`);
  };

  const clearAndReset = () => {
    localStorage.removeItem('skilljoy_books');
    setMessage('Books cleared! Refresh the page to start fresh.');
  };

  return (
    <main className="min-h-screen bg-[#0f1219] p-8">
      <div className="max-w-md mx-auto bg-[#1a1f2b] rounded-2xl p-6 border border-gray-800">
        <h1 className="text-2xl font-bold text-white mb-4">Fix Book Images</h1>
        
        <p className="text-gray-400 mb-6">
          This will assign proper images to all existing books based on their genre.
        </p>
        
        <button
          onClick={fixBooks}
          className="w-full py-3 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition font-medium mb-3"
        >
          Fix All Books
        </button>
        
        <button
          onClick={clearAndReset}
          className="w-full py-3 bg-red-600/20 text-red-400 rounded-full hover:bg-red-600/30 transition font-medium"
        >
          Clear All Books
        </button>
        
        {message && (
          <p className="mt-4 text-green-400 text-center">{message}</p>
        )}
        
        <a href="/reading-club/horror" className="block mt-4 text-center text-gray-500 hover:text-white">
          Back to Books →
        </a>
      </div>
    </main>
  );
}