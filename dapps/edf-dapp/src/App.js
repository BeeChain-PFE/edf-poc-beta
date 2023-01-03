import React from 'react'

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Test from './components/test/Test';
import Navbar from './components/navbar/NavBar';
export default function App() {
  return (
    <Router>
        <Navbar/>
        <Routes>
          <Route path="/test" element={<Test/>} />
          <Route path="/users" element={<h2>Users</h2>}/>
          <Route path="/" element={<h2>Home</h2>} />
        </Routes>
      
    </Router>
  );
}