import { useState, useEffect } from 'react';
import personService from './services/personService';

import Filter from './components/filter';
import PersonForm from './components/personform';
import Persons from './components/persons';

const App = () => {
  const [ persons, setPersons ] = useState([]);
  const [ newName, setNewName ] = useState('name to add');
  const [ newNumber, setNewNumber ] = useState('phone number');
  const [ filterBy, setFilterBy ] = useState('');
  const [ showAllContacts, setShowAllContacts ] = useState(true);

  useEffect(() => {
    personService.getAll().then(response => setPersons(response));
  }, []);

  const contactsToShow = showAllContacts
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(filterBy.toLowerCase()));

  const handleAddContact = (event) => {
    event.preventDefault();

    // alert user and avoid adding duplicate contact
    if (persons.find(person => person.name === newName)) {
      alert(`${newName} is already in phonebook`);
    } else {
      personService.addContact({name: newName, number: newNumber})
        .then(personAdded => setPersons(persons.concat(personAdded)));

      setNewName('name to add');
      setNewNumber('phone number');
    }
  };

  const handleDeleteContact = (event) => {
    const idToDelete = Number(event.target.getAttribute('id'));
    const nameToDelete = persons.find(person => person.id === idToDelete).name;

    if (window.confirm(`Delete ${nameToDelete}?`)) {
      personService.deleteContact(idToDelete)
        .then(_ => {
          const newPersons = persons.slice();
          newPersons.splice(newPersons.findIndex(person => person.id === idToDelete), 1);

          setPersons(newPersons);
        });
    }
  };

  const handleFilterChange = (event) => {
    setFilterBy(event.target.value);

    if (filterBy === '') {
      setShowAllContacts(true);
    } else {
      setShowAllContacts(false);
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

      <Filter
        filterBy={filterBy}
        handleFilterChange={handleFilterChange}
      />

      <h3>Add new contact</h3>

      <PersonForm
        handleAddContact={handleAddContact}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />

      <h3>Contacts</h3>

      <Persons
        contactsToShow={contactsToShow}
        handleDeleteContact={handleDeleteContact}
      />
    </div>
  );
}

export default App;
