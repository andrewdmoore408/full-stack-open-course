import React from 'react';

const Contact = ({ id, name, number, handleDeleteContact }) => (
  <p>
    {name} {number}
    <button
      onClick={handleDeleteContact}
      id={id}
      key={id}
      type="button"
    >
      Delete
    </button>
  </p>
);

export default Contact;
