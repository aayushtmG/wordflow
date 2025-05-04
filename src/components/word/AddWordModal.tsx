import React, { useState } from 'react';
import { PlusIcon, XIcon } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { useWords } from '../../context/WordsContext';

interface AddWordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddWordModal: React.FC<AddWordModalProps> = ({ isOpen, onClose }) => {
  const [term, setTerm] = useState('');
  const [definition, setDefinition] = useState('');
  const [category, setCategory] = useState('');
  const { words, loadWords } = useWords();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!term || !definition) return;
    
    const newWord = {
      id: crypto.randomUUID(),
      term,
      definition,
      category: category || 'Vocabulary',
      recognizedCount: 0,
      failedCount: 0,
    };
    
    // Add to localStorage
    const updatedWords = [...words, newWord];
    localStorage.setItem('words', JSON.stringify(updatedWords));
    
    // Refresh words list
    await loadWords();
    
    // Reset form
    setTerm('');
    setDefinition('');
    setCategory('');
    onClose();
  };
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md transform transition-all">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900">Add New Word</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 transition-colors"
          >
            <XIcon size={24} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-4">
            <Input
              label="Term"
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              placeholder="Enter the word or phrase"
              autoFocus
            />
            
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1 text-gray-700">
                Definition
              </label>
              <textarea
                value={definition}
                onChange={(e) => setDefinition(e.target.value)}
                placeholder="Enter the definition"
                className="w-full px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200 min-h-[100px]"
              />
            </div>
            
            <Input
              label="Category (optional)"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="e.g., Vocabulary, Business, Technical"
            />
          </div>
          
          <div className="mt-6 flex justify-end space-x-3">
            <Button
              type="button"
              variant="secondary"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!term || !definition}
            >
              Add Word
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};