export interface User { 
  id: string;
  username: string;
  email: string;
}

export interface Word {
  id: string;
  term: string;
  definition: string;
  recognizedCount: number;
  failedCount: number;
  lastSeen?: Date;
  category?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface WordsState {
  words: Word[];
  currentWordIndex: number;
  isLoading: boolean;
  error: string | null;
}