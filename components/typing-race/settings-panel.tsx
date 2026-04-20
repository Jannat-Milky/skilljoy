'use client';

import { Button } from '@/components/ui/button';
import { Clock, Zap } from 'lucide-react';
import { useState } from 'react';

interface SettingsPanelProps {
  onStart: (duration: number) => void;
}

export function SettingsPanel({ onStart }: SettingsPanelProps) {
  const [selectedDuration, setSelectedDuration] = useState(60);

  const durations = [
    { value: 30, label: '30s', description: 'Quick burst' },
    { value: 60, label: '1 min', description: 'Standard' },
    { value: 120, label: '2 min', description: 'Endurance' },
    { value: 300, label: '5 min', description: 'Marathon' },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-blue-900/30 border border-blue-700/50 rounded-full">
          <Zap className="w-4 h-4 text-blue-400" />
          <span className="text-sm font-semibold text-blue-300">Ready to Race?</span>
        </div>
        <h2 className="text-4xl font-bold">Choose Your Challenge</h2>
        <p className="text-gray-400">Select the duration and test your typing speed</p>
      </div>

      {/* Duration Selection */}
      <div className="space-y-4">
        <label className="text-sm font-semibold uppercase tracking-widest text-gray-300">Challenge Duration</label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {durations.map((duration) => (
            <button
              key={duration.value}
              onClick={() => setSelectedDuration(duration.value)}
              className={`relative group overflow-hidden rounded-lg p-6 transition-all duration-300 transform hover:scale-105 ${
                selectedDuration === duration.value
                  ? 'bg-gradient-to-br from-blue-600 to-blue-700 border-2 border-blue-400 shadow-lg shadow-blue-500/50'
                  : 'bg-gray-800 border-2 border-gray-700 hover:border-gray-600'
              }`}
            >
              {/* Animated background for selected */}
              {selectedDuration === duration.value && (
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 animate-pulse" />
              )}

              <div className="relative z-10 space-y-2 text-center">
                <Clock className="w-6 h-6 mx-auto text-current" />
                <div className="text-2xl font-bold">{duration.label}</div>
                <div className="text-xs opacity-80">{duration.description}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Info Box */}
      <div className="bg-gradient-to-r from-purple-900/40 to-blue-900/40 border border-purple-700/50 rounded-lg p-6 space-y-3">
        <h3 className="font-semibold text-white">How Scoring Works</h3>
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div className="space-y-1">
            <div className="text-gray-400">WPM</div>
            <div className="text-purple-400 font-semibold">Words Per Minute</div>
            <div className="text-xs text-gray-500">Based on characters typed</div>
          </div>
          <div className="space-y-1">
            <div className="text-gray-400">Accuracy</div>
            <div className="text-blue-400 font-semibold">Match Percentage</div>
            <div className="text-xs text-gray-500">Correct vs total typed</div>
          </div>
          <div className="space-y-1">
            <div className="text-gray-400">Rank</div>
            <div className="text-green-400 font-semibold">Achievement Level</div>
            <div className="text-xs text-gray-500">Based on WPM</div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 space-y-2">
          <div className="text-2xl">⚡</div>
          <div className="font-semibold">Real-time Feedback</div>
          <div className="text-sm text-gray-400">Instant visual feedback for every keystroke</div>
        </div>

        <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 space-y-2">
          <div className="text-2xl">🎯</div>
          <div className="font-semibold">Sound Effects</div>
          <div className="text-sm text-gray-400">Optional audio cues for correct/incorrect typing</div>
        </div>

        <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 space-y-2">
          <div className="text-2xl">📊</div>
          <div className="font-semibold">Detailed Stats</div>
          <div className="text-sm text-gray-400">Comprehensive analysis of your performance</div>
        </div>
      </div>

      {/* Start Button */}
      <div className="flex flex-col gap-3">
        <Button
          onClick={() => onStart(selectedDuration)}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-6 text-lg rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
        >
          Start Challenge
        </Button>
        <p className="text-center text-xs text-gray-500">
          Click to begin • Press any key to start typing
        </p>
      </div>
    </div>
  );
}
