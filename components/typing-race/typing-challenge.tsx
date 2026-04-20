'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { RotateCcw, Volume2, VolumeX } from 'lucide-react';

interface TypingChallengeProps {
  text: string;
  duration: number;
  onComplete: (stats: ChallengeStats) => void;
}

export interface ChallengeStats {
  wpm: number;
  accuracy: number;
  correctChars: number;
  totalChars: number;
  timeElapsed: number;
  errors: number;
}

const SAMPLE_TEXTS = [
  "The quick brown fox jumps over the lazy dog. This pangram contains every letter of the alphabet at least once.",
  "In the era of information technology, typing speed has become an essential skill for professionals worldwide.",
  "Innovation distinguishes between a leader and a follower. Every keystroke brings you closer to mastery.",
  "The art of programming is the skill of telling another human what one wants the computer to do.",
  "Speed is not the only measure of typing proficiency; accuracy and consistency matter equally in real-world applications.",
];

export function TypingChallenge({ duration, onComplete }: TypingChallengeProps) {
  const [text] = useState(() => SAMPLE_TEXTS[Math.floor(Math.random() * SAMPLE_TEXTS.length)]);
  const [input, setInput] = useState('');
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isActive, setIsActive] = useState(false);
  const [stats, setStats] = useState<ChallengeStats | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);

  const playSound = (type: 'success' | 'error') => {
    if (!soundEnabled) return;
    
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    if (type === 'success') {
      oscillator.frequency.value = 800;
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.1);
    } else {
      oscillator.frequency.value = 300;
      gainNode.gain.setValueAtTime(0.05, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.05);
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.05);
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isActive) {
      setIsActive(false);
      calculateStats();
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeLeft]);

  const calculateStats = () => {
    const correctChars = input.split('').filter((char, idx) => char === text[idx]).length;
    const totalChars = input.length;
    const errors = totalChars - correctChars;
    const wpm = Math.round((totalChars / 5) / (duration / 60));
    const accuracy = totalChars > 0 ? Math.round((correctChars / totalChars) * 100) : 0;

    const challengeStats: ChallengeStats = {
      wpm: Math.max(0, wpm),
      accuracy: Math.min(100, accuracy),
      correctChars,
      totalChars,
      timeElapsed: duration - timeLeft,
      errors,
    };

    setStats(challengeStats);
    onComplete(challengeStats);
  };

  const handleInputChange = (e: string) => {
    if (!isActive && e.length > 0) {
      setIsActive(true);
    }
    setInput(e);
    
    const lastChar = e[e.length - 1];
    if (lastChar && lastChar === text[e.length - 1]) {
      playSound('success');
    } else if (lastChar) {
      playSound('error');
    }
  };

  const handleReset = () => {
    setInput('');
    setTimeLeft(duration);
    setIsActive(false);
    setStats(null);
    inputRef.current?.focus();
  };

  const displayText = text.split('').map((char, idx) => {
    let charClass = 'text-gray-400';
    
    if (idx < input.length) {
      charClass = input[idx] === char ? 'text-green-500 bg-green-900/20' : 'text-red-500 bg-red-900/20';
    } else if (idx === input.length) {
      charClass = 'text-white bg-blue-500/30 animate-pulse';
    }
    
    return (
      <span key={idx} className={`${charClass} transition-all duration-75`}>
        {char}
      </span>
    );
  });

  const timeColor = timeLeft <= 10 ? 'text-red-500' : timeLeft <= 30 ? 'text-yellow-500' : 'text-green-500';

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {/* Timer */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <span className={`text-4xl font-bold ${timeColor} font-mono`}>{timeLeft}s</span>
          <div className="h-2 bg-gray-700 rounded-full overflow-hidden w-32">
            <div
              className={`h-full transition-all duration-500 ${
                timeLeft <= 10 ? 'bg-red-500' : timeLeft <= 30 ? 'bg-yellow-500' : 'bg-green-500'
              }`}
              style={{ width: `${(timeLeft / duration) * 100}%` }}
            />
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setSoundEnabled(!soundEnabled)}
          className="hover:bg-gray-700"
        >
          {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
        </Button>
      </div>

      {/* Text Display Area */}
      <div className="bg-gradient-to-b from-gray-900 to-gray-950 border border-gray-700 rounded-lg p-8 min-h-40 space-y-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(68,_68,_68,.2)_25%,rgba(68,_68,_68,.2)_50%,transparent_50%,transparent_75%,rgba(68,_68,_68,.2)_75%,rgba(68,_68,_68,.2))] bg-[length:60px_60px]" />
        </div>

        <div className="text-2xl leading-relaxed font-mono text-center relative z-10 break-words">
          {displayText}
        </div>
      </div>

      {/* Input Field */}
      <input
        ref={inputRef}
        type="text"
        value={input}
        onChange={(e) => handleInputChange(e.target.value)}
        placeholder={!isActive ? 'Start typing...' : 'Keep typing...'}
        className="w-full px-4 py-3 bg-gray-800 border-2 border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all font-mono text-lg"
        disabled={!isActive && input.length === 0 ? false : timeLeft === 0}
      />

      {/* Stats Row */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 text-center">
          <div className="text-gray-400 text-sm font-semibold uppercase tracking-wider mb-2">Characters</div>
          <div className="text-3xl font-bold text-blue-400">{input.length}</div>
          <div className="text-xs text-gray-500 mt-1">of {text.length}</div>
        </div>
        
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 text-center">
          <div className="text-gray-400 text-sm font-semibold uppercase tracking-wider mb-2">Accuracy</div>
          <div className={`text-3xl font-bold ${input.length > 0 ? 'text-green-400' : 'text-gray-500'}`}>
            {input.length > 0 ? Math.round((input.split('').filter((c, i) => c === text[i]).length / input.length) * 100) : 0}%
          </div>
        </div>

        <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 text-center">
          <div className="text-gray-400 text-sm font-semibold uppercase tracking-wider mb-2">WPM</div>
          <div className="text-3xl font-bold text-purple-400">
            {Math.round((input.length / 5) / ((duration - timeLeft) / 60)) || 0}
          </div>
        </div>

        <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 text-center">
          <div className="text-gray-400 text-sm font-semibold uppercase tracking-wider mb-2">Errors</div>
          <div className="text-3xl font-bold text-red-400">
            {input.split('').filter((c, i) => c !== text[i]).length}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 justify-center">
        <Button
          onClick={handleReset}
          variant="outline"
          className="gap-2 border-gray-600 hover:bg-gray-800"
        >
          <RotateCcw className="w-4 h-4" />
          Reset
        </Button>
        
        {isActive && (
          <Button
            onClick={() => {
              setIsActive(false);
              calculateStats();
            }}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Finish
          </Button>
        )}
      </div>
    </div>
  );
}
