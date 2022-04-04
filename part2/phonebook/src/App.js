import { useState } from 'react';
import Contact from './components/contact';

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '408-512-0100' }
  ]);
  const [ newName, setNewName ] = useState('name to add');
  const [ newNumber, setNewNumber ] = useState('phone number');

  const handleAddContact = (event) => {
    event.preventDefault();

    // alert user and avoid adding duplicate contact
    if (persons.find(person => person.name === newName)) {
      alert(`${newName} is already in phonebook`);
    } else {
      setPersons(persons.concat({name: newName, number: newNumber}));
      setNewName('name to add');
      setNewNumber('phone number');
    }
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
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
          number:
          <input
            value={newNumber}
            onChange={handleNumberChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons.map(person => <Contact key={person.name} name={person.name} number={person.number}/>)}
      </div>
    </div>
  );
}

export default App;
