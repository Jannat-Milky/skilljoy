'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function ReadingClubPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const genres = [
    { 
      id: 'horror', 
      name: 'Horror', 
      imagePath: '/images/genres/genre-horror.png',
      color: 'from-red-600 to-orange-700',
      activeReaders: 234,
      books: 12,
    },
    { 
      id: 'scifi', 
      name: 'Sci-Fi', 
      imagePath: '/images/genres/genre-scifi.png',
      color: 'from-cyan-500 to-blue-600',
      activeReaders: 456,
      books: 18,
    },
    { 
      id: 'fantasy', 
      name: 'Fantasy', 
      imagePath: '/images/genres/genre-fantasy.png',
      color: 'from-purple-500 to-pink-600',
      activeReaders: 567,
      books: 24,
    },
    { 
      id: 'mystery', 
      name: 'Mystery', 
      imagePath: '/images/genres/genre-mystery.png',
      color: 'from-indigo-500 to-purple-600',
      activeReaders: 345,
      books: 15,
    },
    { 
      id: 'romance', 
      name: 'Romance', 
      imagePath: '/images/genres/genre-romance.png',
      color: 'from-pink-500 to-rose-600',
      activeReaders: 678,
      books: 21,
    },
    { 
      id: 'adventure', 
      name: 'Adventure', 
      imagePath: '/images/genres/genre-adventure.png',
      color: 'from-emerald-500 to-green-600',
      activeReaders: 432,
      books: 16,
    },
  ];

  const filteredGenres = genres.filter(g => 
    g.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-[#0f1219]">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-[#1a1f2b] border-b border-gray-800">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/" className="flex items-center gap-2 text-gray-400 hover:text-white transition">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <span className="text-base">Back to Home</span>
              </Link>
              <h1 className="text-2xl font-bold text-white">Reading Club</h1>
            </div>
            
            <div className="flex-1 max-w-2xl mx-8">
              <div className="flex items-center bg-[#2a3040] rounded-full px-6 py-3 border border-gray-700">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search genres..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent text-white text-base ml-3 outline-none placeholder:text-gray-500 w-full"
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery('')} className="p-1 hover:bg-gray-700 rounded-full">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
            </div>
            
            <div className="w-24"></div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="pt-[73px]">
        <div className="p-6">
          {/* Hero */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">
              Choose Your <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Reading Adventure</span>
            </h2>
            <p className="text-gray-400 text-lg">Select a genre to discover books and join reading rooms</p>
          </div>

          {/* Stats Bar */}
          <div className="flex flex-wrap items-center justify-center gap-8 bg-[#1a1f2b] rounded-2xl p-6 mb-8 border border-gray-800 max-w-3xl mx-auto">
            <div className="text-center">
              <p className="text-3xl font-bold text-white">2,712</p>
              <p className="text-gray-400 text-sm">Active Readers</p>
            </div>
            <div className="w-px h-10 bg-gray-700"></div>
            <div className="text-center">
              <p className="text-3xl font-bold text-white">106</p>
              <p className="text-gray-400 text-sm">Books</p>
            </div>
            <div className="w-px h-10 bg-gray-700"></div>
            <div className="text-center">
              <p className="text-3xl font-bold text-white">48</p>
              <p className="text-gray-400 text-sm">Active Rooms</p>
            </div>
          </div>

          {/* Genres Grid */}
          {filteredGenres.length === 0 ? (
            <div className="text-center py-20">
              <h3 className="text-2xl text-white font-semibold mb-2">No genres found</h3>
              <p className="text-gray-400">Try searching for something else</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {filteredGenres.map((genre) => (
                <Link key={genre.id} href={`/reading-club/${genre.id}`} className="group">
                  <div className={`relative rounded-2xl overflow-hidden bg-gradient-to-br ${genre.color} hover:scale-[1.02] hover:shadow-2xl transition-all duration-300`}>
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute top-0 right-0 w-40 h-40 bg-white rounded-full blur-3xl"></div>
                    </div>
                    
                    <div className="relative p-6">
                      <div className="flex items-center gap-5">
                        {/* Image container - larger and properly sized */}
                        <div className="w-28 h-28 rounded-xl bg-white/10 backdrop-blur-sm p-2 flex items-center justify-center flex-shrink-0">
                          <Image 
                            src={genre.imagePath} 
                            alt={genre.name} 
                            width={80} 
                            height={80}
                            className="object-contain w-full h-full"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-3xl font-bold text-white mb-2">{genre.name}</h3>
                          <div className="flex items-center gap-4 text-sm">
                            <span className="text-gray-200 flex items-center gap-1">
                              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                              </svg>
                              {genre.activeReaders} readers
                            </span>
                            <span className="text-gray-200 flex items-center gap-1">
                              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                              </svg>
                              {genre.books} books
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-5 flex items-center justify-between">
                        <div className="flex -space-x-2">
                          {[1, 2, 3].map((i) => (
                            <div key={i} className="w-8 h-8 rounded-full bg-gray-700 border-2 border-white/20 flex items-center justify-center">
                              <svg className="w-4 h-4 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                              </svg>
                            </div>
                          ))}
                        </div>
                        <span className="text-white font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                          Browse Books 
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}