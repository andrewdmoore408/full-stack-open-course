const LoginForm = ({ username, onUsernameChange, password, onPasswordChange, onSubmit }) => (
  <form onSubmit={onSubmit}>
    <div>
      username
      <input
        type="text"
        value={username}
        name="username"
        onChange={onUsernameChange}
      />
    </div>
    <div>
      password
      <input
        type="password"
        value={password}
        name="password"
        onChange={onPasswordChange}
      />
    </div>
    <button type="submit">login</button>
  </form>
);

export default LoginForm;
