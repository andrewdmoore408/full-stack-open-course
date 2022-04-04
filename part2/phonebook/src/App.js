import { useState } from 'react';
import Contact from './components/contact';

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas' }
  ]);
  const [ newName, setNewName ] = useState('name to add');

  const handleAddContact = (event) => {
    event.preventDefault();

    setPersons(persons.concat({name: newName}));
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleAddContact}>
        <div>
          name:
          <input
            value={newName}
            onChange={handleNameChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons.map(person => <Contact key={person.name} name={person.name} />)}
      </div>
    </div>
  );
}

export default App;
