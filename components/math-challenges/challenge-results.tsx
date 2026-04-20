'use client';

import { CheckCircle, XCircle, Award, Clock, TrendingUp } from 'lucide-react';

interface ChallengeResultsProps {
  results: any;
  challenge: any;
  onBackToList: () => void;
}

export default function ChallengeResults({ results, challenge, onBackToList }: ChallengeResultsProps) {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  const getPerformanceMessage = (percentage: number) => {
    if (percentage === 100) return 'Perfect Score! 🎉';
    if (percentage >= 80) return 'Excellent Work! 🌟';
    if (percentage >= 60) return 'Good Job! 👍';
    if (percentage >= 40) return 'Keep Practicing! 💪';
    return 'Try Again! 🔄';
  };

  const getPerformanceColor = (percentage: number) => {
    if (percentage >= 80) return 'from-green-900/30 to-emerald-900/30 border-green-800/50';
    if (percentage >= 60) return 'from-blue-900/30 to-cyan-900/30 border-blue-800/50';
    return 'from-orange-900/30 to-yellow-900/30 border-orange-800/50';
  };

  const getScoreColor = (percentage: number) => {
    if (percentage >= 80) return 'text-green-400';
    if (percentage >= 60) return 'text-blue-400';
    return 'text-orange-400';
  };

  return (
    <div className="w-full space-y-6">
      {/* Main Results Card */}
      <div className={`bg-gradient-to-br ${getPerformanceColor(results.percentage)} rounded-xl p-8 border-2`}>
        <div className="text-center">
          <div className="mb-6 flex justify-center">
            <Award className={`w-16 h-16 ${getScoreColor(results.percentage)}`} />
          </div>
          <h2 className="text-4xl font-bold text-white mb-2">{getPerformanceMessage(results.percentage)}</h2>
          <p className="text-gray-400 text-lg">{challenge.title}</p>

          <div className="grid grid-cols-3 gap-6 py-8 mt-6 border-t border-gray-700">
            <div>
              <p className={`text-5xl font-bold ${getScoreColor(results.percentage)}`}>{results.score}/{results.totalQuestions}</p>
              <p className="text-gray-400 text-sm mt-2">Correct Answers</p>
            </div>
            <div>
              <p className={`text-5xl font-bold ${getScoreColor(results.percentage)}`}>{results.percentage}%</p>
              <p className="text-gray-400 text-sm mt-2">Success Rate</p>
            </div>
            <div>
              <p className="text-5xl font-bold text-orange-400">{formatTime(results.timeSpent)}</p>
              <p className="text-gray-400 text-sm mt-2">Time Spent</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-[#1a1f2b] rounded-xl p-6 border border-gray-800">
          <div className="flex items-center gap-3 mb-3">
            <CheckCircle className="w-5 h-5 text-green-400" />
            <p className="text-gray-400 text-sm font-semibold">Correct Answers</p>
          </div>
          <p className="text-4xl font-bold text-green-400">{results.score}</p>
        </div>

        <div className="bg-[#1a1f2b] rounded-xl p-6 border border-gray-800">
          <div className="flex items-center gap-3 mb-3">
            <XCircle className="w-5 h-5 text-red-400" />
            <p className="text-gray-400 text-sm font-semibold">Incorrect Answers</p>
          </div>
          <p className="text-4xl font-bold text-red-400">{results.totalQuestions - results.score}</p>
        </div>

        <div className="bg-[#1a1f2b] rounded-xl p-6 border border-gray-800">
          <div className="flex items-center gap-3 mb-3">
            <Clock className="w-5 h-5 text-orange-400" />
            <p className="text-gray-400 text-sm font-semibold">Total Time</p>
          </div>
          <p className="text-4xl font-bold text-orange-400">{formatTime(results.timeSpent)}</p>
        </div>
      </div>

      {/* Detailed Answers */}
      <div className="space-y-4">
        <h3 className="text-2xl font-bold text-white">Review Your Answers</h3>
        {results.answers.map((answer: any, index: number) => (
          <div 
            key={index} 
            className={`bg-[#1a1f2b] rounded-xl p-6 border-l-4 ${answer.isCorrect ? 'border-l-green-500 border border-gray-800' : 'border-l-red-500 border border-gray-800'}`}
          >
            <div className="flex items-start gap-4">
              {answer.isCorrect ? (
                <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
              ) : (
                <XCircle className="w-6 h-6 text-red-400 flex-shrink-0 mt-1" />
              )}
              <div className="flex-1">
                <p className="font-bold text-white mb-3">{index + 1}. {answer.question}</p>
                <div className="text-sm space-y-2">
                  <p className="text-gray-400">
                    Your answer: <span className="text-white font-semibold">{answer.userAnswer || 'Skipped'}</span>
                  </p>
                  {!answer.isCorrect && (
                    <p className="text-green-400">
                      Correct answer: <span className="font-semibold">{answer.correctAnswer}</span>
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recommendations */}
      <div className="bg-gradient-to-br from-blue-900/20 to-cyan-900/20 rounded-xl p-6 border border-blue-800/50">
        <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5" />
          Recommendations
        </h3>
        <ul className="space-y-3">
          {results.percentage === 100 ? (
            <>
              <li className="flex gap-3">
                <span className="text-green-400 font-bold">✓</span>
                <span className="text-gray-300">Outstanding! Try the next difficulty level</span>
              </li>
              <li className="flex gap-3">
                <span className="text-green-400 font-bold">✓</span>
                <span className="text-gray-300">Challenge yourself with advanced problems</span>
              </li>
            </>
          ) : results.percentage >= 80 ? (
            <>
              <li className="flex gap-3">
                <span className="text-blue-400 font-bold">→</span>
                <span className="text-gray-300">Review the questions you got wrong</span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-400 font-bold">→</span>
                <span className="text-gray-300">Try this challenge again to reinforce learning</span>
              </li>
            </>
          ) : (
            <>
              <li className="flex gap-3">
                <span className="text-orange-400 font-bold">!</span>
                <span className="text-gray-300">Review the concepts tested in this challenge</span>
              </li>
              <li className="flex gap-3">
                <span className="text-orange-400 font-bold">!</span>
                <span className="text-gray-300">Try an easier challenge first, then return to this one</span>
              </li>
            </>
          )}
        </ul>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 pt-4">
        <button 
          onClick={onBackToList}
          className="flex-1 px-6 py-3 bg-transparent hover:bg-gray-800 text-gray-400 hover:text-white font-semibold rounded-lg border border-gray-700 transition-all duration-300"
        >
          Back to Challenges
        </button>
        <button className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white font-semibold rounded-lg transition-all duration-300">
          Retake Challenge
        </button>
      </div>
    </div>
  );
}

