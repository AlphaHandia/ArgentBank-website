import { loginUserAsync } from "../../features/user/userThunks";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";



const Form = () => {
  // Définition des états du formulaire
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  // Accès aux fonctions et données de Redux
  const dispatch = useDispatch();
  const loginError = useSelector((state) => state.user.loginError);
  const token = useSelector((state) => state.user.token);
  const userProfile =useSelector((state) =>state.user.userProfile)
  // Accès à la fonction de navigation de React Router
  const navigate = useNavigate();
// Effet pour rediriger l'utilisateur après la connexion
useEffect(() => {
  console.log("User Profile:", userProfile);
  if (userProfile) {
    console.log("Redirecting to /user-account");
    navigate('/user-account')
    
  }
}, [token, userProfile, navigate]);

  // Gestionnaire de soumission du formulaire
  const handleSignIn = (e) => {
    e.preventDefault();
    // Appel de l'action Redux pour la connexion de l'utilisateur
    dispatch(loginUserAsync({ email, password, rememberMe }));
  };

  let errorMessage = null;
  if (loginError) {
    errorMessage = <p style={{ color: "red" }}>{loginError}</p>;
  }


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
          console.log("ok bouton")
        </form>
      </section>
    </main>
  );
};
console.log("ok bouton")
export default Form;