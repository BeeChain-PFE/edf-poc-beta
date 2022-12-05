import React from 'react'
import "./navbar.css"
const NavBar = ({account}) => {
  return (
    <nav className="navigation">
        
      <div
        className="navigation-menu">
        <ul>
          
          <li>
            <a href="/home">Home</a>
          </li>
          <li>
            <a href="/envoyer">Envoyer Transaction</a>
          </li>
          <li>
            <a href="/lister">List Transactions</a>
          </li>
          <li>
            <a href="/valider">Valider Transaction</a>
          </li>
        </ul>
      </div>
      <div className="account"><p >Account : {account}</p></div>
    </nav>
  )
}

export default NavBar