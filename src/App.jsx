import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import Home from './components/Home';
import Favorites from './components/Favorites'; 
import { SnackbarProvider } from "notistack";


function App() {
  return (
    <SnackbarProvider maxSnack={3} anchorOrigin={{ vertical: 'top', horizontal: 'center'}}>


    <Router> 
      <Routes> 
        <Route path="/" element={<Home />} /> 
        <Route path="/favorites" element={<Favorites />} /> 
      </Routes>
    </Router>
    </SnackbarProvider>
  );
}

export default App;