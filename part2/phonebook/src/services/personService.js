import axios from 'axios';

const url = 'http://localhost:3001/persons';

const unpackData = (request) => request.then(response => response.data);

const getAll = () => {
  const request = axios.get(url);

  return unpackData(request);
};

const addContact = (newContact) => {
  const request = axios.post(url, newContact);

  return unpackData(request);
};

export default {
  addContact,
  getAll,
};
