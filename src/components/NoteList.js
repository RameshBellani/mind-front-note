import React, { useEffect, useState } from 'react';
import NoteItem from './NoteItem';
import NoteForm from './NoteForm';
import './NoteList.css';
import './NoteForm.css'; 

const NoteList = () => {
  const [notes, setNotes] = useState([]);
  const [noteToEdit, setNoteToEdit] = useState(null);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch('https://mind-note.onrender.com/api/notes');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setNotes(data);
      } catch (error) {
        console.error('Error fetching notes:', error);
      }
    };

    fetchNotes();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`https://mind-note.onrender.com/api/notes/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      setNotes(notes.filter(note => note._id !== id));
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  const handleSave = (newNote) => {
    setNotes(notes.map(note => note._id === newNote._id ? newNote : note));
    setNoteToEdit(null);
  };

  return (
    <div className="note-list-container">
      <div className="note-form-container">
        <NoteForm noteToEdit={noteToEdit} onSave={handleSave} />
      </div>
      <ul className="note-list">
        {notes.map(note => (
          <NoteItem key={note._id} note={note} onDelete={handleDelete} onEdit={() => setNoteToEdit(note)} />
        ))}
      </ul>
    </div>
  );
};

export default NoteList;
