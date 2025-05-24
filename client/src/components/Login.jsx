import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../features/authSlice";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./AuthForm.css";

const Login = () => {
  /* ci creaiamo il componente login */
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error } = useSelector((state) => state.auth);
  /* funzione per il submit del form , ovvero l'invio di esso */
  const handleSubmit = (e) => {
    /* impediamo che la pagina si riaggiorni di default */
    e.preventDefault();
    dispatch(
      loginUser({
        email,
        password,
      }))
      .unwrap()
      .then(() => navigate("/"))
      .catch(() => {});
  };
/* form per inserire email e passsord */
  return (
    <div className="auth-container">
      <h2 className="auth-title">Login</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <input
          className="auth-input"
          type="email"
          placeholder="Email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="auth-input"
          type="password"
          placeholder="Password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="auth-button" type="submit">Login</button>
      </form>

      <p className="auth-text">Non hai un account? <Link to="/register">Registrati</Link></p>

      {error && <p className="auth-error">{error}</p>}
    </div>
  );
  };


export default Login;
