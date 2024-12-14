import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import Home from './components/Home';
import Favorites from './components/Favorites'; 

function App() {
  return (
    <Router> 
      <Routes> 
        <Route path="/" element={<Home />} /> 
        <Route path="/favorites" element={<Favorites />} /> 
      </Routes>
    </Router>
  );
}

export default App;