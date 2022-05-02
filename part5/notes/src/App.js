import { useState, useEffect } from 'react';

import noteService from './services/notes';
import loginService from './services/login';
import LoginForm from './components/LoginForm';
import Note from './components/Note';
import NoteForm from './components/NoteForm';
import Notification from './components/Notification';
import Toggleable from './components/Toggleable';
import Footer from './components/Footer';

const App = () => {
  const [ notes, setNotes ] = useState([]);
  const [ newNote, setNewNote ] = useState('A new note...');
  const [ showAll, setShowAll ] = useState(true);
  const [ errorMessage, setErrorMessage ] = useState(null);
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ user, setUser ] = useState(null);

  const loadNotesHook = () => {
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes);
      });
  };

  useEffect(loadNotesHook, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInNoteAppUser');

    if (loggedUserJSON) {
      const user = {
        token: JSON.parse(loggedUserJSON),
        name: JSON.parse(window.localStorage.getItem('name')),
      };

      setUser(user);
      noteService.setToken(user.token);
    }
  }, []);

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

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username, password
      });

      noteService.setToken(user.token);
      window.localStorage.setItem(
        'loggedInNoteAppUser', JSON.stringify(user.token)
        );
      window.localStorage.setItem(
        'name', JSON.stringify(user.name)
      );

      setUser(user);
      setUsername('');
      setPassword('');
    } catch (error) {
      setErrorMessage('Wrong credentials');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const handleLogout = event => {
    window.localStorage.removeItem('loggedInNoteAppUser');
    window.localStorage.removeItem('name');

    noteService.setToken(null);
    setUser(null);
    setErrorMessage('You have been logged out.');
    setTimeout(() => {
      setErrorMessage(null);
    }, 5000);
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
        setErrorMessage(`Note '${noteToUpdate.content}' was already removed from server`);
        setTimeout(() => { setErrorMessage(null) }, 5000);

        setNotes(notes.filter(note => note.id !== id));
      });
  };

  return (
    <div>
      <h1>Notes</h1>

      <Notification
        message={errorMessage}
      />

      {user === null ?
        <Toggleable buttonLabel='login'>
          <LoginForm
            username={username}
            password={password}
            onUsernameChange={({ target }) => setUsername(target.value)}
            onPasswordChange={({ target }) => setPassword(target.value)}
            onSubmit={handleLogin}
          />
        </Toggleable> :
        <div>
            <p>{user.name} logged-in</p>
            <button
              type="button"
              onClick={handleLogout}
            >
              logout
            </button>
          <Toggleable buttonLabel="new note">
            <NoteForm
              value={newNote}
              onChange={handleNoteChange}
              onSubmit={addNote}
            />
          </Toggleable>
        </div>
      }

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

      <Footer />
    </div>
  );
}

export default App;
