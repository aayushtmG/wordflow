import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WordCard } from './WordCard';
import { useWords } from '../../context/WordsContext';
import { Button } from '../ui/Button';
import { CheckCircleIcon, RefreshCwIcon } from 'lucide-react';

export const WordList: React.FC = () => {
  const { 
    words, 
    isLoading, 
    error, 
    updateWordStatus, 
    getNextWord,
    resetProgress 
  } = useWords();
  
  const [currentWord, setCurrentWord] = useState(getNextWord());
  const [isFinished, setIsFinished] = useState(false);
  
  // Update current word when words change or after a swipe
  useEffect(() => {
    const nextWord = getNextWord();
    setCurrentWord(nextWord);
    setIsFinished(!nextWord);
  }, [words]);
  
  const handleSwipe = (wordId: string, recognized: boolean) => {
    updateWordStatus(wordId, recognized);
  };
  
  const handleReset = () => {
    resetProgress();
    setIsFinished(false);
  };
  
  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600"></div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="bg-red-50 text-red-700 p-6 rounded-lg max-w-md">
          <h3 className="font-bold text-lg mb-2">Error</h3>
          <p>{error}</p>
          <Button
            variant="primary"
            className="mt-4"
            onClick={() => window.location.reload()}
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }
  
  if (isFinished) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="h-full flex flex-col items-center justify-center p-6 text-center"
      >
        <CheckCircleIcon size={80} className="text-green-500 mb-6" />
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Great job!</h2>
        <p className="text-lg text-gray-600 mb-8">
          You've gone through all the words in this session.
        </p>
        <Button onClick={handleReset} className="flex items-center text-white">
          <RefreshCwIcon size={18} className="mr-2" />
          Start Over
        </Button>
      </motion.div>
    );
  }
  
  return (
        <div className="h-full  min-w-[300px] sm:min-w-[600px]  flex flex-col p-4 ">
      <AnimatePresence mode="wait">
        {currentWord && (
          <motion.div
            key={currentWord._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}bg-blue-500
            className="flex-1 flex flex-col justify-center"
          >
            <WordCard word={currentWord} onSwipe={handleSwipe} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
