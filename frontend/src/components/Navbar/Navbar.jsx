import {useEffect} from "react";
import {NavLink,useNavigate} from "react-router-dom";
import{useDispatch, useSelector} from "react-redux";
import"./Navbar.css";
import{PostUserProfile} from "../../actions/post.userprofile.action";
import{logoutUser} from "../../actions/post.user.action";
import logo from"../../../../Backend/designs/img/argentBankLogo.png";

const Navbar =() => {
    //verification que le token de l'usager est stocké dans le Storage
const tokenLocalStorage=localStorage.getItem("Token");
const tokenSessionStorage=sessionStorage.getitem("token");
const token = tokenLocalStorage || tokenSessionStorage;
//Recupération du profil utilisateur depuis redux store
const userProfile = useSelector((state) => state.UserReducer.userProfile);
console.log(userProfile);
const navigate = useNavigate();
const dispatch = useDispatch();
const handleSignOut = (e) => {
    e.preventDefault()
    //Deconnection de l'usager
    dispatch(logoutUser());
    navigate("/ArgentBank");
  };
useEffect(() => {
    dispatch(PostUserProfile());
  }, [dispatch]);
// utilisation de use Effect pour la récupération du profil avan de rendre la barre de navigation en fonction de l'authentification de l'usager connecté  par token.

if (token) {
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
            {userProfile.userName}
          </NavLink>
          <NavLink to="/ArgentBank" className="main-nav-item" onClick={handleSignOut}>
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
          <NavLink to="/login" className="main-nav-item">
            <i className="fa fa-user-circle"></i>
            Sign In
          </NavLink>
        </div>
      </nav>
       );
    }
  };
  



export default Navbar;