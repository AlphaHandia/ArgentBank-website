import React from "react";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import UserWelcome from "../components/UserWelcome/Userwelcome";
import Account from "../components/Account/Account";

const User = () => {
  return (
    <div className="page_account">
      <Navbar />
      <main className="main bg-dark">
        <UserWelcome />
        <Account
          accountType="Checking"
          accountNumber="x8349"
          amount="$2,082.79"
          description="Available Balance"
        />
        <Account
          accountType="Savings"
          accountNumber="x6712"
          amount="$10,928.42"
          description="Available Balance"
        />
        <Account
          accountType="Credit Card"
          accountNumber="x8349"
          amount="$184.30"
          description="Current Balance"
        />
      </main>
      <Footer />
    </div>
  );
};

export default User;
