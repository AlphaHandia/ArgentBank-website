import React from "react";
import logo from "../../assets/images/argentBankLogo.webp";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../features/user/userSlice";
import { postUserProfile } from "../../features/user/userThunks";

const Navbar = () => {
  const tokenLocalStorage = localStorage.getItem("Token");
  const tokenSessionStorage = sessionStorage.getItem("token");
  let token = tokenLocalStorage || tokenSessionStorage;

  const userProfile = useSelector((state) => state.user.userProfile);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignOut = (e) => {
    e.preventDefault();
    dispatch(logoutUser());
    navigate("/");
    sessionStorage.removeItem("token", token);
    localStorage.removeItem("token", token);
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    dispatch(postUserProfile());
    navigate("/login");
  };

  if (userProfile) {
    return (
      <nav className="main-nav">
        <NavLink to="/" className="main-nav-logo">
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
          <NavLink to="/" className="main-nav-item" onClick={handleSignOut}>
            <i className="fa fa-sign-out"></i>
            Sign Out
          </NavLink>
        </div>
      </nav>
    );
  } else {
    return (
      <nav className="main-nav">
        <NavLink to="/" className="main-nav-logo">
          <img
            src={logo}
            alt="Argent Bank Logo"
            className="main-nav-logo-image"
          />
          <h1 className="sr-only">Argent Bank</h1>
        </NavLink>
        <div>
          <NavLink to="/login" className="main-nav-item" onClick={handleSignIn}>
            <i className="fa fa-user-circle"></i>
            Sign In
          </NavLink>
        </div>
      </nav>
    );
  }
};
export default Navbar;
