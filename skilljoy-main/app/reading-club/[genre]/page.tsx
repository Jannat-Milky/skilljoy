'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useParams } from 'next/navigation';

export default function GenrePage() {
  const params = useParams();
  const genre = params.genre as string;
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBook, setSelectedBook] = useState<string | null>(null);
  const [showModeSelection, setShowModeSelection] = useState(false);
  const [selectedMode, setSelectedMode] = useState<string | null>(null);
  const [showJoinRoomModal, setShowJoinRoomModal] = useState(false);

  const genreInfo: Record<string, { name: string; color: string }> = {
    horror: { name: 'Horror', color: 'from-red-600 to-orange-700' },
    scifi: { name: 'Sci-Fi', color: 'from-cyan-500 to-blue-600' },
    fantasy: { name: 'Fantasy', color: 'from-purple-500 to-pink-600' },
    mystery: { name: 'Mystery', color: 'from-indigo-500 to-purple-600' },
    romance: { name: 'Romance', color: 'from-pink-500 to-rose-600' },
    adventure: { name: 'Adventure', color: 'from-emerald-500 to-green-600' },
  };

  const info = genreInfo[genre] || { name: genre, color: 'from-gray-600 to-gray-700' };

  const allBooks = [
    { 
      id: `${genre}-1`, 
      title: genre === 'horror' ? 'The Haunted Manor' : 
             genre === 'scifi' ? 'Galaxy Explorers' :
             genre === 'fantasy' ? 'Dragon\'s Quest' :
             genre === 'mystery' ? 'The Missing Heir' :
             genre === 'romance' ? 'Eternal Love' : 'Lost Treasure',
      author: 'Edgar Black', 
      readers: 45, 
      chapters: 24, 
      status: 'Popular', 
      statusColor: 'bg-orange-600',
      imagePath: `/images/books/book-${genre}-1.png`
    },
    { 
      id: `${genre}-2`, 
      title: genre === 'horror' ? 'Dark Secrets' : 
             genre === 'scifi' ? 'Neon City 2099' :
             genre === 'fantasy' ? 'The Magic Kingdom' :
             genre === 'mystery' ? 'Secret of the Manor' :
             genre === 'romance' ? 'Love Story' : 'Mountain Quest',
      author: 'Mary Shelley', 
      readers: 32, 
      chapters: 18, 
      status: 'New', 
      statusColor: 'bg-green-600',
      imagePath: `/images/books/book-${genre}-2.png`
    },
    { 
      id: `${genre}-3`, 
      title: genre === 'horror' ? 'Midnight Whispers' : 
             genre === 'scifi' ? 'Space Odyssey' :
             genre === 'fantasy' ? 'Enchanted Forest' :
             genre === 'mystery' ? 'The Locked Room' :
             genre === 'romance' ? 'Summer Romance' : 'Desert Expedition',
      author: 'Stephen Dark', 
      readers: 28, 
      chapters: 21, 
      status: 'Trending', 
      statusColor: 'bg-blue-600',
      imagePath: null
    },
    { 
      id: `${genre}-4`, 
      title: genre === 'horror' ? 'The Last Chapter' : 
             genre === 'scifi' ? 'Robot Uprising' :
             genre === 'fantasy' ? 'Wizard\'s Tower' :
             genre === 'mystery' ? 'The Final Clue' :
             genre === 'romance' ? 'Winter Kiss' : 'Jungle Adventure',
      author: 'Anne Rice', 
      readers: 56, 
      chapters: 30, 
      status: 'Popular', 
      statusColor: 'bg-orange-600',
      imagePath: null
    },
  ];

  const readingModes = [
    { 
      id: 'solo', 
      name: 'Solo Read', 
      icon: '/images/modes/mode-solo.png',
      description: 'Read at your own pace',
      color: 'from-blue-600 to-cyan-600'
    },
    { 
      id: 'dual', 
      name: 'Dual Read', 
      icon: '/images/modes/mode-dual.png',
      description: 'Read with a partner',
      color: 'from-purple-600 to-pink-600'
    },
    { 
      id: 'group', 
      name: 'Group Read', 
      icon: '/images/modes/mode-group.png',
      description: 'Join a reading room',
      color: 'from-green-600 to-emerald-600'
    },
  ];

  const activeRooms = [
    { id: 1, name: 'Night Readers', members: 8, chapter: 5, book: 'The Haunted Manor' },
    { id: 2, name: 'Mystery Solvers', members: 5, chapter: 3, book: 'Dark Secrets' },
    { id: 3, name: 'Late Night Club', members: 12, chapter: 7, book: 'Midnight Whispers' },
  ];

  const filteredBooks = allBooks.filter(b => 
    b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleBookClick = (bookId: string) => {
    setSelectedBook(bookId);
    setShowModeSelection(true);
  };

  const getBookGradient = (index: number) => {
    const gradients = [
      'from-red-700 to-orange-800',
      'from-blue-700 to-cyan-800',
      'from-purple-700 to-pink-800',
      'from-green-700 to-emerald-800',
    ];
    return gradients[index % gradients.length];
  };

  return (
    <main className="min-h-screen bg-[#0f1219]">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-[#1a1f2b] border-b border-gray-800">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/reading-club" className="flex items-center gap-2 text-gray-400 hover:text-white transition">
                <svg className="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <span className="text-base whitespace-nowrap">Back to Genres</span>
              </Link>
              <h1 className={`text-2xl font-bold bg-gradient-to-r ${info.color} bg-clip-text text-transparent whitespace-nowrap`}>
                {info.name} Books
              </h1>
            </div>
            
            <div className="flex-1 max-w-2xl mx-8">
              <div className="flex items-center bg-[#2a3040] rounded-full px-6 py-3 border border-gray-700">
                <svg className="w-5 h-5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search books or authors..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent text-white text-base ml-3 outline-none placeholder:text-gray-500 w-full"
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery('')} className="p-1 hover:bg-gray-700 rounded-full flex-shrink-0">
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

      <div className="pt-[73px] p-6">
        {/* Active Rooms Banner */}
        <div className={`bg-gradient-to-r ${info.color} rounded-2xl p-6 mb-8 max-w-5xl mx-auto mt-4`}>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white mb-1">Active Reading Rooms</h2>
              <p className="text-gray-200">Join readers currently discussing {info.name} books</p>
            </div>
            <button
              onClick={() => setShowJoinRoomModal(true)}
              className="px-6 py-3 bg-white/20 backdrop-blur-sm text-white rounded-full hover:bg-white/30 transition font-medium whitespace-nowrap"
            >
              Join a Room
            </button>
          </div>
        </div>

        {/* Books Grid */}
        <h2 className="text-2xl font-semibold text-white mb-4">Available Books</h2>
        
        {filteredBooks.length === 0 ? (
          <div className="text-center py-20">
            <h3 className="text-2xl text-white font-semibold mb-2">No books found</h3>
            <p className="text-gray-400">Try searching for something else</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredBooks.map((book, index) => (
              <div key={book.id} className="group">
                <div className="bg-[#1a1f2b] rounded-xl overflow-hidden border border-gray-800 hover:border-purple-500/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl h-full flex flex-col">
                  {/* Book Cover */}
                  <div className="aspect-[3/4] relative">
                    {book.imagePath ? (
                      <Image 
                        src={book.imagePath} 
                        alt={book.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    ) : (
                      <div className={`absolute inset-0 bg-gradient-to-br ${getBookGradient(index)} flex items-center justify-center`}>
                        <svg className="w-16 h-16 text-white/40" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                    <div className="absolute top-3 left-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${book.statusColor}`}>
                        {book.status}
                      </span>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="text-white font-bold text-xl truncate">{book.title}</h3>
                      <p className="text-gray-300 truncate">{book.author}</p>
                    </div>
                  </div>
                  
                  {/* Book Details */}
                  <div className="p-4 flex-1 flex flex-col">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-1 text-gray-400">
                        <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                        </svg>
                        <span className="text-sm whitespace-nowrap">{book.readers} readers</span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-400">
                        <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M4 6h16v2H4V6zm0 5h16v2H4v-2zm0 5h10v2H4v-2z" />
                        </svg>
                        <span className="text-sm whitespace-nowrap">{book.chapters} chapters</span>
                      </div>
                    </div>
                    <button 
                      onClick={() => handleBookClick(book.id)}
                      className="w-full py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-medium text-base whitespace-nowrap"
                    >
                      Select Book
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Join Room Modal */}
      {showJoinRoomModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#1a1f2b] rounded-2xl p-6 max-w-md w-full border border-gray-800">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-white">Join a Reading Room</h3>
              <button 
                onClick={() => setShowJoinRoomModal(false)}
                className="p-2 text-gray-400 hover:text-white transition"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {activeRooms.map((room) => (
                <Link
                  key={room.id}
                  href={`/reading-club/room/${room.id}`}
                  onClick={() => setShowJoinRoomModal(false)}
                  className="block p-4 bg-[#2a3040] rounded-xl hover:bg-[#353d50] transition"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-white font-medium">{room.name}</span>
                      <p className="text-gray-400 text-sm">{room.book}</p>
                      <span className="text-gray-400 text-xs">Chapter {room.chapter}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                      </svg>
                      <span>{room.members}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            
            <div className="mt-4">
              <Link
                href={`/reading-club/room/create?genre=${genre}`}
                className="block w-full py-3 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition text-center font-medium"
              >
                Create New Room
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Mode Selection Modal */}
      {showModeSelection && selectedBook && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#1a1f2b] rounded-2xl p-6 max-w-3xl w-full border border-gray-800">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-white">Choose Reading Mode</h3>
              <button 
                onClick={() => {
                  setShowModeSelection(false);
                  setSelectedMode(null);
                }}
                className="p-2 text-gray-400 hover:text-white transition"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {readingModes.map((mode) => (
                <button
                  key={mode.id}
                  onClick={() => setSelectedMode(mode.id)}
                  className={`bg-gradient-to-br ${mode.color} p-5 rounded-xl text-left hover:scale-[1.02] transition-all ${
                    selectedMode === mode.id ? 'ring-4 ring-white/30' : ''
                  }`}
                >
                  <div className="w-16 h-16 bg-white/20 rounded-xl p-3 mb-3">
                    <Image 
                      src={mode.icon} 
                      alt={mode.name} 
                      width={40} 
                      height={40}
                      className="object-contain"
                    />
                  </div>
                  <h4 className="text-xl font-bold text-white mb-1">{mode.name}</h4>
                  <p className="text-white/80 text-sm">{mode.description}</p>
                </button>
              ))}
            </div>

            <div className="flex gap-3">
              {selectedMode && (
                <Link
                  href={`/reading-club/room/create?book=${selectedBook}&mode=${selectedMode}`}
                  className="flex-1 py-3 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition text-center font-medium whitespace-nowrap"
                >
                  {selectedMode === 'group' ? 'Create New Room' : `Start ${selectedMode.charAt(0).toUpperCase() + selectedMode.slice(1)} Reading`}
                </Link>
              )}
              <button
                onClick={() => setShowModeSelection(false)}
                className="px-6 py-3 bg-gray-700 text-white rounded-full hover:bg-gray-600 transition whitespace-nowrap"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}