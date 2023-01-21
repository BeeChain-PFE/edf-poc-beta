import React from "react";
import "./navbar.css";
import { Link } from "react-router-dom";
const NavBar = ({ account }) => {
  return (
    <nav className="navigation">
      <div className="navigation-menu">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/test">Test</Link>
          </li>
          <li>
            <Link to="/did-management">Did management</Link>
          </li>
          <li>
            <Link to="/transactions">Transactions</Link>
          </li>
        </ul>
      </div>
      <div className="account">
        <p>Account : {account}</p>
      </div>
    </nav>
  );
};

export default NavBar;
