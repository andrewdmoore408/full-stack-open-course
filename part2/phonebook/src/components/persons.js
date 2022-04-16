import Contact from './contact';

const Persons = ({ contactsToShow }) => {
  return (
    <div>
      {contactsToShow.map(person => <Contact key={person.name} name={person.name} number={person.number} />)}
    </div>
  );
};

export default Persons;
