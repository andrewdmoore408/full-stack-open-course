import { useState, useEffect, useRef } from 'react';

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
  const [ showAll, setShowAll ] = useState(true);
  const [ errorMessage, setErrorMessage ] = useState(null);
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

  const noteFormRef = useRef();

  const addNote = (noteObject) => {
    noteFormRef.current.toggleVisibility();

    noteService
      .create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote));
      });
  };

  const handleLogin = async ({ username, password }) => {
    try {
        const user = await loginService.login({
        username, password,
      });

      noteService.setToken(user.token);
      window.localStorage.setItem(
        'loggedInNoteAppUser', JSON.stringify(user.token)
        );
      window.localStorage.setItem(
        'name', JSON.stringify(user.name)
      );

      setUser(user);
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
            handleLogin={handleLogin}
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
          <Toggleable
            buttonLabel="new note"
            ref={noteFormRef}
          >
            <NoteForm
              createNote={addNote}
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
