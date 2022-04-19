import { useState, useEffect } from 'react';
import axios from 'axios';
import Note from './components/Note';

const App = () => {
  const [ notes, setNotes ] = useState([]);
  const [ newNote, setNewNote ] = useState('A new note...');
  const [ showAll, setShowAll ] = useState(true);

  const hook = () => {
    console.log('effect');

    axios
      .get('http://localhost:3001/notes')
      .then(response => {
        setNotes(response.data);
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

    axios
      .post('http://localhost:3001/notes', newNoteObject)
      .then(response => {
        setNotes(notes.concat(newNoteObject));
        setNewNote('');
      });
  };

  const handleNoteChange = (event) => {
    setNewNote(event.target.value);
  };

  const notesToShow = showAll ? notes : notes.filter(note => note.important);

  const toggleImportanceOf = (id) => {
    console.log('Importance of ', id, ' needs to be toggled');
    const url = `http://localhost:3001/notes/${id}`;
    const noteToUpdate = notes.find(note => note.id === id);
    const updatedNote = { ...noteToUpdate, important: !noteToUpdate.important };

    axios
      .put(url, updatedNote)
      .then(response => {
        setNotes(notes.map(note => note.id === id ? response.data : note));
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
