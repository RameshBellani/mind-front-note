import React, { useState, useEffect } from 'react';
import './NoteForm.css';

const NoteForm = ({ noteToEdit, onSave }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (noteToEdit) {
      setTitle(noteToEdit.title);
      setContent(noteToEdit.content);
      setIsEditing(true);
    } else {
      setTitle('');
      setContent('');
      setIsEditing(false);
    }
  }, [noteToEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = isEditing
      ? `https://mind-note.onrender.com/api/notes/${noteToEdit._id}`
      : 'https://mind-note.onrender.com/api/notes';
    
    const method = isEditing ? 'PUT' : 'POST';
    const headers = {
      'Content-Type': 'application/json',
    };
    const body = JSON.stringify({ title, content });

    try {
      const response = await fetch(url, {
        method,
        headers,
        body,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      onSave(data);
      
      
      setTitle('');
      setContent('');
    } catch (error) {
      console.error('Error handling note:', error);
    }
  };

  return (
    <form className="note-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        required
        className="note-input"
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Content"
        required
        className="note-textarea"
      />
      <button type="submit" className="note-button">
        {isEditing ? 'Update Note' : 'Add Note'}
      </button>
    </form>
  );
};

export default NoteForm;
