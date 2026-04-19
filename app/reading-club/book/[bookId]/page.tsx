'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useParams } from 'next/navigation';

export default function BookDetailPage() {
  const params = useParams();
  const bookId = params.bookId as string;
  const [selectedMode, setSelectedMode] = useState<'solo' | 'dual' | 'group' | null>(null);
  const [showCreateRoom, setShowCreateRoom] = useState(false);

  const book = {
    id: bookId,
    title: 'The Haunted Manor',
    author: 'Edgar Black',
    cover: '/images/reading-club/books/book-horror-1.png',
    description: 'A chilling tale of a mysterious manor that holds dark secrets. When Sarah inherits an old Victorian house, she discovers that the previous owners never truly left. As she unravels the manor\'s history, she must confront the ghosts of the past before becoming one herself.',
    chapters: 24,
    totalPages: 342,
    rating: 4.7,
    readers: 234,
    genre: 'Horror'
  };

  const readingModes = [
    { 
      id: 'solo', 
      name: 'Solo Read', 
      icon: '/images/reading-club/modes/mode-solo.png',
      description: 'Read at your own pace with personal progress tracking',
      color: 'from-blue-600 to-cyan-600'
    },
    { 
      id: 'dual', 
      name: 'Dual Read', 
      icon: '/images/reading-club/modes/mode-dual.png',
      description: 'Read together with a friend and discuss as you go',
      color: 'from-purple-600 to-pink-600'
    },
    { 
      id: 'group', 
      name: 'Group Read', 
      icon: '/images/reading-club/modes/mode-group.png',
      description: 'Join a reading room with multiple readers',
      color: 'from-green-600 to-emerald-600'
    },
  ];

  const activeRooms = [
    { id: 1, name: 'Night Readers', members: 8, mode: 'group', currentChapter: 5 },
    { id: 2, name: 'Mystery Solvers', members: 5, mode: 'group', currentChapter: 3 },
    { id: 3, name: 'Late Night Club', members: 12, mode: 'group', currentChapter: 7 },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#0a0e15] via-[#11161e] to-[#0a0e15]">
      {/* Header */}
      <header className="bg-[#1a1f2b]/90 backdrop-blur-md border-b border-gray-800 sticky top-0 z-40">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center">
            <Link href="/reading-club/horror" className="flex items-center gap-2 text-gray-400 hover:text-white transition">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span className="text-sm">Back to Books</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Book Info Section */}
      <section className="container mx-auto px-6 py-8">
        <div className="bg-[#1a1f2b] rounded-2xl border border-gray-800 overflow-hidden">
          <div className="flex flex-col md:flex-row">
            {/* Book Cover */}
            <div className="md:w-1/3 p-6">
              <div className="aspect-[2/3] relative rounded-xl overflow-hidden">
                <Image src={book.cover} alt={book.title} fill className="object-cover" />
              </div>
            </div>
            
            {/* Book Details */}
            <div className="md:w-2/3 p-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-3 py-1 bg-purple-600/20 text-purple-400 text-xs rounded-full border border-purple-500/30">
                  {book.genre}
                </span>
                <div className="flex items-center gap-1">
                  <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                  <span className="text-white font-medium">{book.rating}</span>
                </div>
              </div>
              
              <h1 className="text-4xl font-bold text-white mb-2">{book.title}</h1>
              <p className="text-xl text-gray-400 mb-4">by {book.author}</p>
              
              <p className="text-gray-300 mb-6 leading-relaxed">{book.description}</p>
              
              <div className="flex flex-wrap gap-6 mb-6">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  <span className="text-gray-300">{book.totalPages} pages</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M4 6h16v2H4V6zm0 5h16v2H4v-2zm0 5h10v2H4v-2z" />
                  </svg>
                  <span className="text-gray-300">{book.chapters} chapters</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>
                  <span className="text-gray-300">{book.readers} active readers</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reading Modes */}
      <section className="container mx-auto px-6 pb-8">
        <h2 className="text-2xl font-bold text-white mb-6">Choose Your Reading Mode</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {readingModes.map((mode) => (
            <button
              key={mode.id}
              onClick={() => setSelectedMode(mode.id as 'solo' | 'dual' | 'group')}
              className={`relative rounded-xl overflow-hidden border transition-all duration-300 ${
                selectedMode === mode.id 
                  ? 'border-purple-500 shadow-lg shadow-purple-500/20 scale-[1.02]' 
                  : 'border-gray-800 hover:border-gray-700'
              }`}
            >
              <div className={`bg-gradient-to-br ${mode.color} p-6`}>
                <div className="w-16 h-16 bg-white/20 rounded-xl backdrop-blur-sm p-3 mb-4">
                  <Image src={mode.icon} alt={mode.name} width={40} height={40} className="w-full h-full object-contain" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{mode.name}</h3>
                <p className="text-white/80 text-sm">{mode.description}</p>
                
                {selectedMode === mode.id && (
                  <div className="absolute top-3 right-3">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                    </svg>
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Active Rooms (for group mode) */}
      {selectedMode === 'group' && (
        <section className="container mx-auto px-6 pb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-white">Active Reading Rooms</h2>
            <button
              onClick={() => setShowCreateRoom(true)}
              className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Create Room
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {activeRooms.map((room) => (
              <Link
                key={room.id}
                href={`/reading-club/room/${room.id}`}
                className="bg-[#1a1f2b] rounded-xl p-4 border border-gray-800 hover:border-purple-500/50 transition"
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-white font-semibold">{room.name}</h3>
                  <span className="text-xs text-gray-400">Ch. {room.currentChapter}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400 text-sm">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>
                  <span>{room.members} members</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Action Button */}
      {selectedMode && (
        <section className="container mx-auto px-6 pb-12">
          <div className="flex justify-center">
            <Link
              href={selectedMode === 'group' && !showCreateRoom ? '#' : `/reading-club/room/new?mode=${selectedMode}&book=${bookId}`}
              onClick={(e) => {
                if (selectedMode === 'group' && !showCreateRoom) {
                  e.preventDefault();
                  setShowCreateRoom(true);
                }
              }}
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-lg font-semibold rounded-full hover:from-purple-700 hover:to-pink-700 transition shadow-lg shadow-purple-500/30"
            >
              {selectedMode === 'solo' && 'Start Reading Solo'}
              {selectedMode === 'dual' && 'Find a Reading Partner'}
              {selectedMode === 'group' && (showCreateRoom ? 'Create New Room' : 'Browse All Rooms')}
            </Link>
          </div>
        </section>
      )}
    </main>
  );
}