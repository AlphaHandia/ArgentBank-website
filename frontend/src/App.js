import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Error from "./pages/Error";
import UserAccount from "./pages/UserAccount";
import PrivateRoute from "./routing/PrivateRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/argentBank" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route element={<PrivateRoute />}>
          <Route path="/user-account" element={<UserAccount />} />
        </Route>
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;