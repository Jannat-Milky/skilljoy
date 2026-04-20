'use client';

import { useState } from 'react';
import { SettingsPanel } from '@/components/typing-race/settings-panel';
import { TypingChallenge, ChallengeStats } from '@/components/typing-race/typing-challenge';
import { ResultsScreen } from '@/components/typing-race/results-screen';
import { Leaderboard } from '@/components/typing-race/leaderboard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

type GameState = 'settings' | 'playing' | 'results' | 'leaderboard';

export default function TypingRacePage() {
  const [gameState, setGameState] = useState<GameState>('settings');
  const [duration, setDuration] = useState(60);
  const [stats, setStats] = useState<ChallengeStats | null>(null);

  const handleStartChallenge = (selectedDuration: number) => {
    setDuration(selectedDuration);
    setGameState('playing');
  };

  const handleChallengeComplete = (challengeStats: ChallengeStats) => {
    setStats(challengeStats);
    setGameState('results');
  };

  const handleRetry = () => {
    setGameState('settings');
    setStats(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-white overflow-hidden relative">
      {/* Animated background elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {/* Header */}
        <div className="mb-12 text-center space-y-4">
          <div className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-blue-900/30 border border-blue-700/50 rounded-full mb-4">
            <span className="text-2xl">⌨️</span>
            <span className="text-sm font-semibold text-blue-300">Typing Race Challenge</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
            Speed Racing Game
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Test your typing speed and accuracy. Compete on the leaderboard and become a master typist!
          </p>
        </div>

        {/* Tabs Navigation */}
        <Tabs defaultValue="race" className="w-full space-y-8">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 bg-gray-800/50 border border-gray-700 p-1 rounded-lg">
            <TabsTrigger
              value="race"
              className="data-[state=active]:bg-blue-600 data-[state=active]:text-white rounded transition-all"
            >
              Race
            </TabsTrigger>
            <TabsTrigger
              value="leaderboard"
              className="data-[state=active]:bg-blue-600 data-[state=active]:text-white rounded transition-all"
            >
              Leaderboard
            </TabsTrigger>
          </TabsList>

          {/* Race Tab */}
          <TabsContent value="race" className="space-y-8">
            {gameState === 'settings' && (
              <SettingsPanel onStart={handleStartChallenge} />
            )}

            {gameState === 'playing' && (
              <div className="space-y-6">
                <TypingChallenge
                  text=""
                  duration={duration}
                  onComplete={handleChallengeComplete}
                />
              </div>
            )}

            {gameState === 'results' && stats && (
              <ResultsScreen stats={stats} onRetry={handleRetry} />
            )}
          </TabsContent>

          {/* Leaderboard Tab */}
          <TabsContent value="leaderboard" className="space-y-8">
            <Leaderboard />
          </TabsContent>
        </Tabs>

        {/* Footer Tips */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="bg-gray-800/30 border border-gray-700 rounded-lg p-6 space-y-3">
            <div className="text-3xl">🎯</div>
            <h3 className="font-semibold">Focus on Accuracy</h3>
            <p className="text-sm text-gray-400">Mistakes will cost you. Quality over speed.</p>
          </div>

          <div className="bg-gray-800/30 border border-gray-700 rounded-lg p-6 space-y-3">
            <div className="text-3xl">⚡</div>
            <h3 className="font-semibold">Build Muscle Memory</h3>
            <p className="text-sm text-gray-400">Regular practice improves your reflexes.</p>
          </div>

          <div className="bg-gray-800/30 border border-gray-700 rounded-lg p-6 space-y-3">
            <div className="text-3xl">🏆</div>
            <h3 className="font-semibold">Climb the Ranks</h3>
            <p className="text-sm text-gray-400">Beat others and reach the top of the leaderboard.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
