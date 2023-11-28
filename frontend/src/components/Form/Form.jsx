import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../actions/post.user.action";
import { useNavigate } from "react-router-dom";


const Form = () => {
  // Définition des états du formulaire
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  // Accès aux fonctions et données de Redux
  const dispatch = useDispatch();
  const loginError = useSelector((state) => state.UserReducer.loginError);
  // Accès à la fonction de navigation de React Router
  const navigate = useNavigate();

  // Gestionnaire de soumission du formulaire
  const handleSignIn = (e) => {
    e.preventDefault();
    // Appel de l'action Redux pour la connexion de l'utilisateur
    dispatch(loginUser(email, password, navigate, rememberMe));
  };

  let errorMessage = null;
  if (loginError) {
    errorMessage = <p style={{ color: "red" }}>{loginError}</p>;
  }
  
// Rendu du composant
  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
        <form onSubmit={handleSignIn}>
          <div className="input-wrapper">
            <label htmlFor="email">Username</label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="input-remember">
            <input
              type="checkbox"
              id="remember-me"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <label htmlFor="remember-me">Remember me</label>
          </div>
          {errorMessage}
          <button className="sign-in-button" type="submit">
            Sign In
          </button>
        </form>
      </section>
    </main>
  );
};

export default Form;