'use client';

import { Button } from '@/components/ui/button';
import { RotateCcw, Share2, Trophy, Zap, TrendingUp } from 'lucide-react';
import { ChallengeStats } from './typing-challenge';

interface ResultsScreenProps {
  stats: ChallengeStats;
  onRetry: () => void;
}

export function ResultsScreen({ stats, onRetry }: ResultsScreenProps) {
  const getRank = (wpm: number) => {
    if (wpm >= 100) return { rank: 'Master Typist', color: 'text-yellow-400', icon: Trophy };
    if (wpm >= 80) return { rank: 'Expert', color: 'text-purple-400', icon: Zap };
    if (wpm >= 60) return { rank: 'Advanced', color: 'text-blue-400', icon: TrendingUp };
    if (wpm >= 40) return { rank: 'Intermediate', color: 'text-green-400', icon: TrendingUp };
    return { rank: 'Beginner', color: 'text-gray-400', icon: TrendingUp };
  };

  const rankInfo = getRank(stats.wpm);
  const RankIcon = rankInfo.icon;

  const handleShare = () => {
    const text = `I just finished a typing race challenge! 🚀\n\nWPM: ${stats.wpm}\nAccuracy: ${stats.accuracy}%\nCharacters: ${stats.correctChars}/${stats.totalChars}\n\nCan you beat my score?`;
    if (navigator.share) {
      navigator.share({ title: 'Typing Race Score', text });
    } else {
      navigator.clipboard.writeText(text);
      alert('Score copied to clipboard!');
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      {/* Success Animation Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <div className="text-center space-y-4 relative z-10">
        <div className="inline-block">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-xl opacity-75" />
            <div className={`relative flex items-center justify-center w-20 h-20 rounded-full ${rankInfo.color} bg-gray-900 border-2 border-gray-700`}>
              <RankIcon className="w-10 h-10" />
            </div>
          </div>
        </div>
        <h2 className="text-4xl font-bold">Challenge Complete!</h2>
        <p className={`text-2xl font-semibold ${rankInfo.color}`}>{rankInfo.rank}</p>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-900/40 to-blue-900/10 border border-blue-700/50 rounded-lg p-6 text-center space-y-2 hover:border-blue-600 transition-colors">
          <div className="text-gray-400 text-sm font-semibold uppercase tracking-widest">WPM</div>
          <div className="text-4xl font-bold text-blue-400">{stats.wpm}</div>
          <div className="text-xs text-gray-500">Words Per Minute</div>
        </div>

        <div className="bg-gradient-to-br from-green-900/40 to-green-900/10 border border-green-700/50 rounded-lg p-6 text-center space-y-2 hover:border-green-600 transition-colors">
          <div className="text-gray-400 text-sm font-semibold uppercase tracking-widest">Accuracy</div>
          <div className="text-4xl font-bold text-green-400">{stats.accuracy}%</div>
          <div className="text-xs text-gray-500">Perfect matches</div>
        </div>

        <div className="bg-gradient-to-br from-purple-900/40 to-purple-900/10 border border-purple-700/50 rounded-lg p-6 text-center space-y-2 hover:border-purple-600 transition-colors">
          <div className="text-gray-400 text-sm font-semibold uppercase tracking-widest">Characters</div>
          <div className="text-4xl font-bold text-purple-400">{stats.correctChars}</div>
          <div className="text-xs text-gray-500">Typed correctly</div>
        </div>

        <div className="bg-gradient-to-br from-orange-900/40 to-orange-900/10 border border-orange-700/50 rounded-lg p-6 text-center space-y-2 hover:border-orange-600 transition-colors">
          <div className="text-gray-400 text-sm font-semibold uppercase tracking-widest">Errors</div>
          <div className="text-4xl font-bold text-orange-400">{stats.errors}</div>
          <div className="text-xs text-gray-500">Mistakes made</div>
        </div>
      </div>

      {/* Detailed Stats */}
      <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6 space-y-4">
        <h3 className="text-lg font-semibold text-white">Challenge Statistics</h3>
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Total Characters</span>
              <span className="text-white font-semibold">{stats.totalChars}</span>
            </div>
            <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-blue-500 to-blue-600 w-3/4" />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Error Rate</span>
              <span className="text-white font-semibold">{Math.round((stats.errors / stats.totalChars) * 100)}%</span>
            </div>
            <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-red-500 to-red-600"
                style={{ width: `${Math.round((stats.errors / stats.totalChars) * 100)}%` }}
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Time Spent</span>
              <span className="text-white font-semibold">{stats.timeElapsed}s</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Average WPM</span>
              <span className="text-white font-semibold">{Math.round(stats.wpm * 0.85)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Achievement Badge */}
      <div className="bg-gradient-to-r from-yellow-900/30 to-orange-900/30 border border-yellow-700/50 rounded-lg p-6 text-center space-y-2">
        <div className="text-yellow-400 font-semibold uppercase tracking-widest text-sm">🏆 Achievement</div>
        <p className="text-white font-semibold">
          {stats.accuracy === 100 ? '✨ Flawless Performance!' : stats.accuracy >= 95 ? '⭐ Excellent Accuracy' : '🎯 Good Effort'}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Button
          onClick={onRetry}
          className="gap-2 bg-blue-600 hover:bg-blue-700 flex-1"
        >
          <RotateCcw className="w-4 h-4" />
          Try Again
        </Button>
        
        <Button
          onClick={handleShare}
          variant="outline"
          className="gap-2 border-gray-600 hover:bg-gray-800 flex-1"
        >
          <Share2 className="w-4 h-4" />
          Share Score
        </Button>
      </div>

      {/* Tips */}
      <div className="bg-gray-800/30 border border-gray-700 rounded-lg p-4 text-sm text-gray-300 space-y-2">
        <p className="font-semibold text-gray-200">💡 Tips to improve:</p>
        <ul className="list-disc list-inside space-y-1 text-xs">
          <li>Focus on accuracy first, speed will follow naturally</li>
          <li>Practice proper finger positioning and posture</li>
          <li>Take breaks to avoid fatigue and maintain concentration</li>
          <li>Challenge yourself with longer texts and higher difficulty</li>
        </ul>
      </div>
    </div>
  );
}
