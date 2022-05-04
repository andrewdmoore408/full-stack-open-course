import { useState } from 'react';
import PropTypes from 'prop-types';

const LoginForm = ({ handleLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const startLogin = async (event) => {
    event.preventDefault();

    console.log('username:', username);
    console.log('password:', password);
    await handleLogin({ username, password });

    setUsername('');
    setPassword('');
  };

  return (
    <form onSubmit={startLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  );
};

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
};

export default LoginForm;
