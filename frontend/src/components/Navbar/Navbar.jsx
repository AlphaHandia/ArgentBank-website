
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./Navbar.css";
import { postUserProfile } from "../../features/user/userActions"; 
import { logoutUser } from "../../features/user/userSlice";
import logo from "../../assets/images/argentBankLogo.webp";

const Navbar = () => {
  // Vérification que le token de l'usager est stocké dans le Storage
  const tokenLocalStorage = localStorage.getItem("Token");
  const tokenSessionStorage = sessionStorage.getItem("token");
  let token = tokenLocalStorage || tokenSessionStorage;
  console.log(token);

  // Récupération du profil utilisateur depuis Redux store
  const userProfile = useSelector((state) => state.user.userProfile); 
  console.log(userProfile);
  
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignOut = (e) => {
    e.preventDefault();
    // Déconnexion de l'usager
    dispatch(logoutUser());
        navigate("/argentBank");
       sessionStorage.removeItem('token',token)
        localStorage.clear('token',token);
        sessionStorage.clear('token',token);
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
      
    // Après la connexion, récupérez le profil de l'utilisateur
   dispatch(postUserProfile());
    // Naviguez vers la page d'accueil ou une autre page appropriée
    navigate("/login");
  };
  // Utilisation de useEffect pour la récupération du profil avant de rendre la barre de navigation en fonction de l'authentification de l'usager connecté par token.
  if (userProfile) {
    return (
      <nav className="main-nav">
        <NavLink to="/ArgentBank" className="main-nav-logo">
          <img
            src={logo}
            alt="Argent Bank Logo"
            className="main-nav-logo-image"
          />
          <h1 className="sr-only">Argent Bank</h1>
        </NavLink>
        <div className="navbar_loginSuccess">
          <NavLink to="/user-account" className="main-nav-item">
            <i className="fa fa-user-circle"></i>
            {userProfile && userProfile.userName}
          </NavLink>
          <NavLink
            to="/ArgentBank"
            className="main-nav-item"
            onClick={handleSignOut}
          >
            <i className="fa fa-sign-out"></i>
            Sign Out
          </NavLink>
        </div>
      </nav>
    );
  } else {
    return (
      <nav className="main-nav">
        <NavLink to="/ArgentBank" className="main-nav-logo">
          <img
            src={logo}
            alt="Argent Bank Logo"
            className="main-nav-logo-image"
          />
          <h1 className="sr-only">Argent Bank</h1>
        </NavLink>
        <div>
        
          <NavLink to="/login" className="main-nav-item"onClick={handleSignIn}>
            <i className="fa fa-user-circle"></i>
            Sign In
          </NavLink>
        </div>
      </nav>
    );
  }
};

export default Navbar;
