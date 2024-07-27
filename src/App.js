import React from 'react';
import NoteList from './components/NoteList';
import './App.css';

const App = () => {
  return (
    <div>
      <header className="app-header">
        <h1>Notes App</h1>
      </header>
      <main className="app-main">
        <NoteList />
      </main>
    </div>
  );
};

export default App;
