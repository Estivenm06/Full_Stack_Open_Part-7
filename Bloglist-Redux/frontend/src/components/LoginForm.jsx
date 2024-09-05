import Proptypes from "prop-types";
import { Button } from "@mui/material";
import { TextField } from "@mui/material";
const LoginForm = ({
  handleLogin,
  username,
  handleUsernameChange,
  password,
  handlePasswordChange,
}) => {
  return (
    <form onSubmit={handleLogin}>
      <h2>log in to application</h2>
      <div>
        username
        <TextField
          data-testid="username"
          type="text"
          value={username}
          name="Username"
          onChange={handleUsernameChange}
        />
      </div>
      <div>
        password
        <TextField
          data-testid="password"
          type="password"
          value={password}
          name="password"
          onChange={handlePasswordChange}
        />
      </div>
      <Button variant="contained" type="submit">
        Login
      </Button>
    </form>
  );
};

LoginForm.Proptypes = {
  handleUsernameChange: Proptypes.func.isRequired,
  handlePasswordChange: Proptypes.func.isRequired,
  handleLogin: Proptypes.func.isRequired,
  username: Proptypes.string.isRequired,
  password: Proptypes.string.isRequired,
};

export default LoginForm;
