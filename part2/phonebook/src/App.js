import { useState, useEffect } from 'react';
import personService from './services/personService';

import Filter from './components/filter';
import PersonForm from './components/personform';
import Persons from './components/persons';
import Notification from './components/notification';

const App = () => {
  const [ persons, setPersons ] = useState([]);
  const [ newName, setNewName ] = useState('name to add');
  const [ newNumber, setNewNumber ] = useState('phone number');
  const [ filterBy, setFilterBy ] = useState('');
  const [ showAllContacts, setShowAllContacts ] = useState(true);
  const [ notificationInfo, setNotificationInfo ] = useState(null);

  useEffect(() => {
    personService.getAll().then(response => setPersons(response));
  }, []);

  const contactsToShow = showAllContacts
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(filterBy.toLowerCase()));

  const handleAddContact = (event) => {
    event.preventDefault();

    // allow user to update number for contact if they confirm
    const alreadyPresent = persons.find(person => person.name === newName);

    if (alreadyPresent && alreadyPresent.number !== newNumber) {
      if (window.confirm(`${alreadyPresent.name} is already in directory. Update with new number: ${newNumber}?`)) {
        const updatedContact = {...alreadyPresent, number: newNumber};

        personService.updateContact(alreadyPresent.id, updatedContact)
          .then(updatedResponse => {
            setPersons(persons.map(person => person === alreadyPresent ? updatedContact : person));

            setNotificationInfo({message: `${updatedContact.name} contact has been updated.`, isError: false});
            setTimeout(() => setNotificationInfo(null), 4000);

            setNewName('name to add');
            setNewNumber('phone number');
          })
          .catch(error => {
            if (error.message.includes('404')) {
              setNotificationInfo({message: `${alreadyPresent.name} was not found in contacts`, isError: true});
            } else if (error.messages.includes('400')) {
              setNotificationInfo({message: error.response.data.error, isError: true});
            }

            setTimeout(() => setNotificationInfo(null), 4000);

            setNewName('name to add');
            setNewNumber('phone number');
          });
      }
    } else {
      personService.addContact({name: newName, number: newNumber})
        .then(personAdded => {
          setPersons(persons.concat(personAdded));

          setNotificationInfo({message: `${personAdded.name} has been added.`, isError: false});
          setTimeout(() => setNotificationInfo(null), 4000);

          setNewName('name to add');
          setNewNumber('phone number');
        })
        .catch(error => {
          console.log(error.response.data.error);
          setNotificationInfo({message: error.response.data.error, isError: true});

          setTimeout(() => setNotificationInfo(null), 4000);
        });
    }
  };

  const handleDeleteContact = (event) => {
    const idToDelete = event.target.getAttribute('id');
    const nameToDelete = persons.find(person => person.id === idToDelete).name;

    if (window.confirm(`Delete ${nameToDelete}?`)) {
      personService.deleteContact(idToDelete)
        .then(_ => {
          const newPersons = persons.slice();
          newPersons.splice(newPersons.findIndex(person => person.id === idToDelete), 1);

          setPersons(newPersons);

          setNotificationInfo({message: `${nameToDelete} has been removed.`, isError: false});
          setTimeout(() => setNotificationInfo(null), 4000);
        })
        .catch(error => {
          console.log(error.response.data.error);

          setNotificationInfo({message: error.response.data.error, isError: true});

          setTimeout(() => setNotificationInfo(null), 4000);
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

      <Notification
        notificationInfo={notificationInfo}
      />

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
