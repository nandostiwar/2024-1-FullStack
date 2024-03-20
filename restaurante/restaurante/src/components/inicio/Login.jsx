import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const goTo = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    goTo("/platos");
    // alert(`Username: ${username}\nPassword: ${password}`);
    // Aquí puedes enviar los datos a tu backend para autenticación
  };

  return (
    <>
      <div className="App">
        <div className="login-container">
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="username">Username:</label>
              <input type="text" id="username" name="username" value={username} onChange={handleUsernameChange} required />
            </div>
            <div className="input-group">
              <label htmlFor="password">Password:</label>
              <input type="password" id="password" name="password" value={password} onChange={handlePasswordChange} required />
            </div>
            <button className="btn-login" type="submit">
              Login
            </button>
          </form>
        </div>
      </div>
      <p className="copyrigh">Jhonier Martinez Yela @ 2024</p>
    </>
  );
}

export default Login;
