import Contact from './contact';

const Persons = ({ contactsToShow, handleDeleteContact }) => {
  return (
    <div>
      {contactsToShow.map(person => {
        return (
          <Contact
            id={person.id}
            key={person.id}
            name={person.name}
            number={person.number}
            handleDeleteContact={handleDeleteContact}
          />
        )
      })}
    </div>
  );
};

export default Persons;
