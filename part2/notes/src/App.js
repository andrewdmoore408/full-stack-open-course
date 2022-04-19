import { useState, useEffect } from 'react';
import axios from 'axios';

import noteService from './services/notes';
import Note from './components/Note';

const App = () => {
  const [ notes, setNotes ] = useState([]);
  const [ newNote, setNewNote ] = useState('A new note...');
  const [ showAll, setShowAll ] = useState(true);

  const hook = () => {
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes);
      });
  };

  useEffect(hook, []);

  const addNote = (event) => {
    event.preventDefault();

    const newNoteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
    };

    noteService
      .create(newNoteObject)
      .then(newNote => {
        setNotes(notes.concat(newNote));
        setNewNote('');
      });
  };

  const handleNoteChange = (event) => {
    setNewNote(event.target.value);
  };

  const notesToShow = showAll ? notes : notes.filter(note => note.important);

  const toggleImportanceOf = (id) => {
    const noteToUpdate = notes.find(note => note.id === id);
    const newNoteData = { ...noteToUpdate, important: !noteToUpdate.important };

    noteService
      .update(id, newNoteData)
      .then(updatedNote => {
        setNotes(notes.map(note => note.id === id ? updatedNote : note));
      })
      .catch(error => {
        alert(`The note ${noteToUpdate.content} was removed from the server.`);

        setNotes(notes.filter(note => note.id !== id));
      });
  };

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map(note =>
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        )}
      </ul>
      <form onSubmit={addNote}>
        <input
          value={newNote}
          onChange={handleNoteChange}
        />
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default App;
