// Simple localStorage-based data store - NO AUTH REQUIRED

export interface Book {
  id: string;
  title: string;
  genre: string;
  image: string;
  addedBy: string;
  addedByName: string;
  createdAt: string;
  totalChapters?: number;
  totalPages?: number;
  trackingMode: 'chapter' | 'page';
}

export interface ReadingProgress {
  bookId: string;
  userName: string;
  currentChapter?: number;
  currentPage?: number;
  updatedAt: string;
}

export interface Discussion {
  id: string;
  bookId: string;
  userName: string;
  message: string;
  chapter?: number;
  page?: number;
  createdAt: string;
}

// Get current user name (simple prompt-based)
export const getUserName = (): string => {
  if (typeof window === 'undefined') return 'Reader';
  
  let name = localStorage.getItem('skilljoy_reader_name');
  if (!name) {
    name = prompt('Enter your name to continue:') || 'Reader';
    if (name) localStorage.setItem('skilljoy_reader_name', name);
  }
  return name || 'Reader';
};

// Change user name
export const changeUserName = (newName: string): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem('skilljoy_reader_name', newName);
};

// BOOKS
export const loadBooks = (): Book[] => {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem('skilljoy_books');
  return stored ? JSON.parse(stored) : [];
};

export const saveBooks = (books: Book[]) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem('skilljoy_books', JSON.stringify(books));
};

export const addBook = (book: Omit<Book, 'id' | 'addedBy' | 'addedByName' | 'createdAt'>): Book => {
  const books = loadBooks();
  const userName = getUserName();
  
  const newBook: Book = {
    ...book,
    id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
    addedBy: userName,
    addedByName: userName,
    createdAt: new Date().toISOString(),
  };
  
  books.push(newBook);
  saveBooks(books);
  return newBook;
};

export const updateBook = (bookId: string, updates: Partial<Book>): boolean => {
  const books = loadBooks();
  const index = books.findIndex(b => b.id === bookId);
  if (index !== -1) {
    books[index] = { ...books[index], ...updates };
    saveBooks(books);
    return true;
  }
  return false;
};

export const deleteBook = (bookId: string): boolean => {
  const books = loadBooks();
  const filtered = books.filter(b => b.id !== bookId);
  saveBooks(filtered);
  
  // Also delete progress and discussions
  const progress = loadAllProgress();
  saveAllProgress(progress.filter(p => p.bookId !== bookId));
  
  const discussions = loadAllDiscussions();
  saveAllDiscussions(discussions.filter(d => d.bookId !== bookId));
  
  return true;
};

export const getBooksByGenre = (genre: string): Book[] => {
  return loadBooks().filter(b => b.genre === genre);
};

export const getGenreStats = (): Record<string, { books: number; readers: number }> => {
  const books = loadBooks();
  const progress = loadAllProgress();
  
  const stats: Record<string, { books: number; readers: Set<string> }> = {};
  
  ['horror', 'scifi', 'fantasy', 'mystery', 'romance', 'adventure'].forEach(g => {
    stats[g] = { books: 0, readers: new Set() };
  });
  
  books.forEach(book => {
    if (stats[book.genre]) {
      stats[book.genre].books++;
    }
  });
  
  progress.forEach(p => {
    const book = books.find(b => b.id === p.bookId);
    if (book && stats[book.genre]) {
      stats[book.genre].readers.add(p.userName);
    }
  });
  
  const result: Record<string, { books: number; readers: number }> = {};
  Object.keys(stats).forEach(genre => {
    result[genre] = {
      books: stats[genre].books,
      readers: stats[genre].readers.size
    };
  });
  
  return result;
};

// READING PROGRESS
export const loadAllProgress = (): ReadingProgress[] => {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem('skilljoy_progress');
  return stored ? JSON.parse(stored) : [];
};

export const saveAllProgress = (progress: ReadingProgress[]) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem('skilljoy_progress', JSON.stringify(progress));
};

export const getBookProgress = (bookId: string): ReadingProgress[] => {
  return loadAllProgress().filter(p => p.bookId === bookId);
};

export const updateProgress = (bookId: string, progress: { currentChapter?: number; currentPage?: number }): void => {
  const allProgress = loadAllProgress();
  const userName = getUserName();
  
  const existing = allProgress.findIndex(p => p.bookId === bookId && p.userName === userName);
  
  const updated: ReadingProgress = {
    bookId,
    userName,
    currentChapter: progress.currentChapter,
    currentPage: progress.currentPage,
    updatedAt: new Date().toISOString(),
  };
  
  if (existing >= 0) {
    allProgress[existing] = updated;
  } else {
    allProgress.push(updated);
  }
  
  saveAllProgress(allProgress);
};

export const deleteProgress = (bookId: string, userName: string): void => {
  const allProgress = loadAllProgress();
  const filtered = allProgress.filter(p => !(p.bookId === bookId && p.userName === userName));
  saveAllProgress(filtered);
};

// DISCUSSIONS
export const loadAllDiscussions = (): Discussion[] => {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem('skilljoy_discussions');
  return stored ? JSON.parse(stored) : [];
};

export const saveAllDiscussions = (discussions: Discussion[]) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem('skilljoy_discussions', JSON.stringify(discussions));
};

export const getBookDiscussions = (bookId: string): Discussion[] => {
  return loadAllDiscussions()
    .filter(d => d.bookId === bookId)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
};

export const addDiscussion = (bookId: string, message: string, context?: { chapter?: number; page?: number }): Discussion => {
  const discussions = loadAllDiscussions();
  const userName = getUserName();
  
  const newDiscussion: Discussion = {
    id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
    bookId,
    userName,
    message,
    chapter: context?.chapter,
    page: context?.page,
    createdAt: new Date().toISOString(),
  };
  
  discussions.push(newDiscussion);
  saveAllDiscussions(discussions);
  return newDiscussion;
};

export const deleteDiscussion = (discussionId: string): boolean => {
  const discussions = loadAllDiscussions();
  const filtered = discussions.filter(d => d.id !== discussionId);
  saveAllDiscussions(filtered);
  return true;
};

// Clear all data (for testing)
export const clearAllData = (): void => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('skilljoy_books');
  localStorage.removeItem('skilljoy_progress');
  localStorage.removeItem('skilljoy_discussions');
  localStorage.removeItem('skilljoy_reader_name');
};

// Export all data (for backup)
export const exportAllData = (): string => {
  const data = {
    books: loadBooks(),
    progress: loadAllProgress(),
    discussions: loadAllDiscussions(),
    userName: getUserName(),
  };
  return JSON.stringify(data, null, 2);
};

// Import data (for restore)
export const importAllData = (jsonData: string): boolean => {
  try {
    const data = JSON.parse(jsonData);
    if (data.books) saveBooks(data.books);
    if (data.progress) saveAllProgress(data.progress);
    if (data.discussions) saveAllDiscussions(data.discussions);
    if (data.userName) localStorage.setItem('skilljoy_reader_name', data.userName);
    return true;
  } catch (error) {
    console.error('Import failed:', error);
    return false;
  }
};