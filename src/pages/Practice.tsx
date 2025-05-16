import React from 'react';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { WordList } from '../components/word/WordList';

export const Practice: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900">Word Practice</h1>
          <p className="text-gray-600 mt-1">
            Swipe right if you recognize the word, swipe left if you don't.
            Tap on the card to reveal the definition.
          </p>
        </div>
        
        <div className="h-[60vh]">
          <WordList />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};
