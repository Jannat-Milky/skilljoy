'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Card {
  id: number;
  pair: string;
  flipped: boolean;
  matched: boolean;
}

export default function MemoryMatchPage() {
  const router = useRouter();
  const memoryQuestions = [
    { pair: 'apple', category: 'Fruit' },
    { pair: 'banana', category: 'Fruit' },
    { pair: 'carrot', category: 'Vegetable' },
    { pair: 'broccoli', category: 'Vegetable' },
    { pair: 'dog', category: 'Animal' },
    { pair: 'cat', category: 'Animal' },
    { pair: 'piano', category: 'Instrument' },
    { pair: 'guitar', category: 'Instrument' },
  ];

  const emotionQuestions = [
    { pair: 'happy', category: 'Emotion' },
    { pair: 'sad', category: 'Emotion' },
    { pair: 'angry', category: 'Emotion' },
    { pair: 'excited', category: 'Emotion' },
    { pair: 'calm', category: 'Emotion' },
    { pair: 'nervous', category: 'Emotion' },
    { pair: 'surprised', category: 'Emotion' },
    { pair: 'confused', category: 'Emotion' },
  ];

  const [cards, setCards] = useState<Card[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [gameWon, setGameWon] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [showConfirmation, setShowConfirmation] = useState(true);
  const [gameStarted, setGameStarted] = useState(false);
  const [showCategorySelection, setShowCategorySelection] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  // Initialize game when category is selected
  useEffect(() => {
    if (selectedCategory && !showCategorySelection) {
      initializeGame();
    }
  }, [selectedCategory, showCategorySelection]);

  // Timer effect
  useEffect(() => {
    if (gameStarted && !gameWon && startTime) {
      const interval = setInterval(() => {
        setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
      }, 100);
      return () => clearInterval(interval);
    }
  }, [gameStarted, gameWon, startTime]);

  // Check for match
  useEffect(() => {
    if (flipped.length === 2) {
      const [first, second] = flipped;
      if (cards[first].pair === cards[second].pair) {
        setMatched([...matched, first, second]);
        setFlipped([]);
      } else {
        setTimeout(() => setFlipped([]), 600);
      }
      setMoves(moves + 1);
    }
  }, [flipped, cards, matched, moves]);

  // Check win condition
  useEffect(() => {
    if (matched.length === cards.length && cards.length > 0) {
      setGameWon(true);
    }
  }, [matched, cards]);

  const initializeGame = () => {
    const questions = selectedCategory === 'Memory' ? memoryQuestions : emotionQuestions;
    const shuffledCards = [...questions, ...questions]
      .sort(() => Math.random() - 0.5)
      .map((item, idx) => ({
        id: idx,
        pair: item.pair,
        flipped: false,
        matched: false,
      }));
    setCards(shuffledCards);
    setFlipped([]);
    setMatched([]);
    setMoves(0);
    setGameWon(false);
    setStartTime(null);
    setElapsedTime(0);
    setShowConfirmation(true);
    setGameStarted(false);
  };

  const resetGame = () => {
    setShowCategorySelection(true);
    setSelectedCategory('');
    setCards([]);
    setFlipped([]);
    setMatched([]);
    setMoves(0);
    setGameWon(false);
    setStartTime(null);
    setElapsedTime(0);
    setShowConfirmation(true);
    setGameStarted(false);
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setShowCategorySelection(false);
  };

  const handleStartGame = () => {
    setShowConfirmation(false);
    setGameStarted(true);
    setStartTime(Date.now());
  };

  const handleNoStart = () => {
    router.push('/');
  };

  const toggleCard = (index: number) => {
    if (!gameStarted || flipped.includes(index) || matched.includes(index) || flipped.length === 2) return;
    setFlipped([...flipped, index]);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <main className="min-h-screen bg-[#0f1219]">
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#1a1f2b] border-b border-gray-800">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="text-xl font-semibold text-white">Memory Match</span>
            </Link>
            <div className="flex items-center gap-8">
              <div className="text-center">
                <span className="text-gray-400 text-sm">Moves</span>
                <p className="text-white text-2xl font-bold">{moves}</p>
              </div>
              <div className="text-center">
                <span className="text-gray-400 text-sm">Time</span>
                <p className="text-white text-2xl font-bold">{formatTime(elapsedTime)}</p>
              </div>
              <div className="text-center">
                <span className="text-gray-400 text-sm">Matched</span>
                <p className="text-white text-2xl font-bold">{matched.length / 2}/{cards.length / 2}</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="pt-32 px-6 pb-12">
        {/* Category Selection Dialog */}
        {showCategorySelection && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-[#1a1f2b] border border-gray-800 rounded-lg p-8 max-w-md relative">
              <button
                onClick={() => window.history.back()}
                className="absolute top-2 right-4 w-8 h-8 flex items-center justify-center bg-purple-500/10 hover:bg-purple-500/20 rounded-full text-purple-500 hover:text-purple-400 transition-all duration-200 hover:scale-110"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <h2 className="text-3xl font-bold text-white mb-6 text-center">Choose Category</h2>
              <div className="flex gap-4 justify-center">
                <button
                  onClick={() => handleCategorySelect('Memory')}
                  className="px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition"
                >
                  Memory
                </button>
                <button
                  onClick={() => handleCategorySelect('Emotion')}
                  className="px-8 py-3 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-lg transition"
                >
                  Emotion
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Confirmation Dialog */}
        {!showCategorySelection && showConfirmation && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-[#1a1f2b] border border-gray-800 rounded-lg p-8 max-w-md">
              <h2 className="text-3xl font-bold text-white mb-6 text-center">Do you want to start?</h2>
              <div className="flex gap-4 justify-center">
                <button
                  onClick={handleStartGame}
                  className="px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition"
                >
                  Yes
                </button>
                <button
                  onClick={handleNoStart}
                  className="px-8 py-3 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-lg transition"
                >
                  No
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Game Content */}
        <div className="max-w-4xl mx-auto">
          {gameWon ? (
            <div className="text-center mb-8">
              <div className="inline-block bg-gradient-to-r from-purple-600 to-orange-600 p-1 rounded-lg mb-4">
                <div className="bg-[#0f1219] px-8 py-4 rounded">
                  <h2 className="text-4xl font-bold text-white mb-2">🎉 You Won!</h2>
                  <p className="text-gray-400 text-lg">
                    Completed in {formatTime(elapsedTime)} with {moves} moves
                  </p>
                </div>
              </div>
            </div>
          ) : null}

          <div className="grid grid-cols-4 gap-4 mb-8">
            {cards.map((card, index) => (
              <button
                key={card.id}
                onClick={() => toggleCard(index)}
                className={`aspect-square rounded-lg font-bold text-xl transition-all duration-200 transform ${
                  flipped.includes(index) || matched.includes(index)
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white scale-100'
                    : 'bg-gray-800 text-gray-600 hover:bg-gray-700 hover:scale-105 cursor-pointer'
                } ${matched.includes(index) ? 'opacity-75' : ''}`}
              >
                {flipped.includes(index) || matched.includes(index) ? card.pair : '?'}
              </button>
            ))}
          </div>

          {gameWon && (
            <div className="flex gap-4 justify-center">
              <button
                onClick={resetGame}
                className="px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition"
              >
                Play Again
              </button>
              <Link
                href="/"
                className="px-8 py-3 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-lg transition"
              >
                Back to Home
              </Link>
            </div>
          )}

          {!gameWon && (
            <div className="text-center">
              <button
                onClick={resetGame}
                className="px-8 py-3 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-lg transition"
              >
                Reset Game
              </button>
            </div>
          )}
        </div>

        {/* Instructions */}
        <div className="max-w-2xl mx-auto mt-12 bg-[#1a1f2b] border border-gray-800 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-white mb-4">How to Play</h3>
          <ul className="text-gray-300 space-y-2">
            <li>• Click on cards to flip them and reveal the words</li>
            <li>• Find matching pairs by remembering card positions</li>
            <li>• Match all pairs to win the game</li>
            <li>• Try to complete it in the fewest moves and shortest time</li>
          </ul>
        </div>
      </div>
    </main>
  );
}
