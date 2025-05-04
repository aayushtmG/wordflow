import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useTransform, PanInfo } from 'framer-motion';
import { CheckIcon, XIcon } from 'lucide-react';
import { Word } from '../../types';

interface WordCardProps {
  word: Word;
  onSwipe: (wordId: string, recognized: boolean) => void;
}

export const WordCard: React.FC<WordCardProps> = ({ word, onSwipe }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isSwiping, setIsSwiping] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  
  // For swipe animation
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-30, 30]);
  const opacity = useTransform(x, [-200, 0, 200], [0.5, 1, 0.5]);
  const background = useTransform(
    x, 
    [-200, -50, 50, 200], 
    ['rgba(239, 68, 68, 0.2)', 'rgba(255, 255, 255, 1)', 'rgba(255, 255, 255, 1)', 'rgba(34, 197, 94, 0.2)']
  );
  
  const rightIconOpacity = useTransform(x, [10, 200], [0, 1]);
  const leftIconOpacity = useTransform(x, [-200, -10], [1, 0]);
  
  const handleDragEnd = (e: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    setIsSwiping(false);
    
    // Threshold for swipe
    const threshold = 150;
    
    if (info.offset.x > threshold) {
      // Swiped right - recognized
      onSwipe(word.id, true);
    } else if (info.offset.x < -threshold) {
      // Swiped left - not recognized
      onSwipe(word.id, false);
    }
  };
  
  const handleFlip = () => {
    if (!isSwiping) {
      setIsFlipped(!isFlipped);
    }
  };
  
  // Calculate progress percentage
  const totalAttempts = word.recognizedCount + word.failedCount;
  const progressPercentage = totalAttempts > 0 
    ? Math.round((word.recognizedCount / totalAttempts) * 100) 
    : 0;
  
  return (
    <div className="relative w-full max-w-sm mx-auto h-96">
      {/* Success indicator */}
      <motion.div 
        className="absolute top-1/2 right-4 z-10 transform -translate-y-1/2 bg-green-500 rounded-full p-3"
        style={{ opacity: rightIconOpacity }}
      >
        <CheckIcon size={40} className="text-white" />
      </motion.div>
      
      {/* Fail indicator */}
      <motion.div 
        className="absolute top-1/2 left-4 z-10 transform -translate-y-1/2 bg-red-500 rounded-full p-3"
        style={{ opacity: leftIconOpacity }}
      >
        <XIcon size={40} className="text-white" />
      </motion.div>
      
      <motion.div
        ref={cardRef}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        style={{ x, rotate, background }}
        onDragStart={() => setIsSwiping(true)}
        onDragEnd={handleDragEnd}
        onClick={handleFlip}
        whileTap={{ scale: 0.98 }}
        className="w-full h-full rounded-2xl shadow-xl overflow-hidden cursor-pointer perspective relative"
      >
        <motion.div
          className="w-full h-full rounded-xl shadow-xl flex flex-col justify-between p-6 backface-visibility-hidden"
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.6, type: "spring", stiffness: 300, damping: 20 }}
        >
          {!isFlipped ? (
            <>
              <div className="text-sm text-gray-500 flex justify-between">
                <span>Term</span>
                <span>Tap to flip</span>
              </div>
              
              <div className="flex-1 flex items-center justify-center">
                <h2 className="text-3xl font-bold text-center text-gray-800">{word.term}</h2>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>
                    <span className="text-green-600">{word.recognizedCount}</span> recognized
                  </span>
                  <span>
                    <span className="text-red-600">{word.failedCount}</span> missed
                  </span>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-indigo-600 h-2.5 rounded-full transition-all duration-300 ease-out" 
                    style={{ width: `${progressPercentage}%` }}
                  ></div>
                </div>
              </div>
            </>
          ) : (
            <div className="absolute inset-0 p-6 transform rotate-y-180">
              <div className="text-sm text-gray-500 flex justify-between">
                <span>Definition</span>
                <span>Tap to flip back</span>
              </div>
              
              <div className="flex-1 flex items-center justify-center">
                <p className="text-xl text-center text-gray-800">{word.definition}</p>
              </div>
              
              <div className="text-sm text-gray-600 italic text-center">
                Swipe right if you knew it, left if you didn't
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
      
      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-3 pointer-events-none">
        <div className="text-sm text-gray-500 flex items-center">
          <XIcon size={16} className="text-red-500 mr-1" />
          <span>Swipe left if you didn't recognize</span>
        </div>
        <div className="text-sm text-gray-500 flex items-center">
          <CheckIcon size={16} className="text-green-500 mr-1" />
          <span>Swipe right if you recognized</span>
        </div>
      </div>
    </div>
  );
};