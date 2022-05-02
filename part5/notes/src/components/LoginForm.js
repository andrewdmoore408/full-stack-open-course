const LoginForm = ({ username, onUsernameChange, password, onPasswordChange, onSubmit }) => (
  <form onSubmit={onSubmit}>
    <div>
      Username
      <input
        type="text"
        value={username}
        name="username"
        onChange={onUsernameChange}
      />
    </div>
    <div>
      Password
      <input
        type="password"
        value={password}
        name="password"
        onChange={onPasswordChange}
      />
    </div>
    <button type="submit">Login</button>
  </form>
);

export default LoginForm;
