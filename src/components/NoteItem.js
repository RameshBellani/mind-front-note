import React from 'react';
import './NoteItem.css';

const NoteItem = ({ note, onDelete, onEdit }) => {
  return (
    <li className="note-item">
      <div className="note-content-container">
        <div className="note-text">
          <h2 className="note-title">{note.title}</h2>
          <p className="note-content">{note.content}</p>
        </div>
        <div className="note-actions">
          <button className="note-button edit-button" onClick={() => onEdit(note)}>
            <i className="fas fa-edit"></i>
          </button>
          <button className="note-button delete-button" onClick={() => onDelete(note._id)}>
            <i className="fas fa-trash-alt"></i>
          </button>
        </div>
      </div>
    </li>
  );
};

export default NoteItem;
