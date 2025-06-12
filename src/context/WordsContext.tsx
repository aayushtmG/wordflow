import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Word, WordsState } from '../types';
import { useAuth } from './AuthContext'; 

interface WordsContextType extends WordsState {
  loadWords: () => Promise<void>;
  updateWordStatus: (wordId: string, recognized: boolean) => void;
  resetProgress: () => void;
  getNextWord: () => Word | null;
}

const WordsContext = createContext<WordsContextType | undefined>(undefined);

export const WordsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<WordsState>({
    words: [],
    currentWordIndex: 0,
    isLoading: true,
    error: null,
  });
    const {token} = useAuth();
  const loadWords =  useCallback(async () => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
     // In a real app, this would be an API call
      const response = await fetch(import.meta.env.VITE_BACKEND_API + '/api/word',{
                headers: {
                    "Authorization": `Bearer ` + token,
                }
            });
    const data = await response.json();
 console.log(data);
    const fetchedWords = data.words;
    console.log(fetchedWords);
      
      // Get words from local storage or use mock data
      // const storedWords = localStorage.getItem('words');
      // const words = storedWords ? JSON.parse(storedWords) : fetchedWords;
      
      setState({
        words:fetchedWords,
        currentWordIndex: 0,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to load words',
      }));
    }
  },[token]);

  const updateWordStatus =  (wordId: string, recognized: boolean) => {
    setState(prev => {
      const updatedWords = prev.words.map(word => {
        if (word._id === wordId) {
            fetch(import.meta.env.VITE_BACKEND_API  +'/api/word/update/'+ word._id,{
                    method: 'PATCH',
                        headers: {
                "Authorization": "Bearer " + token,
                    "Content-Type": "application/json"
                        },
                        body: JSON.stringify(recognized ? { recognizedCount: word.recognizedCount + 1}: {failedCount: word.failedCount + 1})
                    }).catch(err => console.log(err));
          return {
            ...word,
            recognizedCount: recognized ? word.recognizedCount + 1 : word.recognizedCount,
            failedCount: recognized ? word.failedCount : word.failedCount + 1,
            lastSeen: new Date(),
          };
        }
        return word;
      });
      
      // Store updated words in localStorage
      localStorage.setItem('words', JSON.stringify(updatedWords));
      
      return {
        ...prev,
        words: updatedWords,
        currentWordIndex: (prev.currentWordIndex + 1) % updatedWords.length,
      };
    });
  };

  const resetProgress = () => {
    setState(prev => {
      const resetWords = prev.words.map(word => ({
        ...word,
        recognizedCount: 0,
        failedCount: 0,
        lastSeen: undefined,
      }));
      
      localStorage.setItem('words', JSON.stringify(resetWords));
      
      return {
        ...prev,
        words: resetWords,
        currentWordIndex: 0,
      };
    });
  };

  const getNextWord = (): Word | null => {
    const { words, currentWordIndex } = state;
    return words.length > 0 ? words[currentWordIndex] : null;
  };


  useEffect(() => {
    if(token){
     loadWords()
     }
  },[token]);

  return (
    <WordsContext.Provider
      value={{
        ...state,
        loadWords,
        updateWordStatus,
        resetProgress,
        getNextWord,
      }}
    >
      {children}
    </WordsContext.Provider>
  );
};

export const useWords = (): WordsContextType => {
  const context = useContext(WordsContext);
  if (context === undefined) {
    throw new Error('useWords must be used within a WordsProvider');
  }
  return context;
};
