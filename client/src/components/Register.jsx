import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../features/authSlice";
import { useNavigate } from "react-router-dom";
import "./AuthForm.css";

const Register = () => {
  /* Questa è la gestione per lo stato del nome, email e password*/
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  /* utile per inviare le azioni redux */
  const dispatch = useDispatch();
  /* reindirizziamo le pagine */
  const navigate = useNavigate();
  const { error } = useSelector((state) => state.auth);

  /* preveniamo il refresh della pagina */
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      registerUser({
        name,
        email,
        password,
        role: "user",
      })
    )
      .unwrap()
      .then(() => navigate("/"))
      .catch(() => {});
  };

  /* pagina che permette la registrazione al sito web, registrando i dati nel foglio users.json */
  return (
    <div className="auth-container">
      <h2 className="auth-title"> Registrati</h2>
      <form className="auth-form" onSubmit={handleSubmit}>
        <input
          className="auth-input"
          type="text"
          placeholder="Nome"
          value={name}
          required
          onChange={(e) => setName(e.target.value)}
        />

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
        <button className="auth-button" type="submit">
          {" "}
          Registrati
        </button>
        {error && <p className="auth-error">{error}</p>}
      </form>
    </div>
  );
};

export default Register;
