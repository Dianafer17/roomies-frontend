import React from 'react';

import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import OptionCard from './components/OptionCard';
import CreateAccount from './components/CreateAccount';
import Login from './components/Login';
import Home from './components/Home';
import DeleteUser from './components/DeleteUser'; // Importar DeleteUser
import ConsultaUsuario from './components/ConsultaUsuario';
import ChangePassword from './components/ChangePassword';



function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div className="container">
              <Header />
              <div className="options">
                <Link to="/create-account" className="option-link">
                  <OptionCard
                    imageUrl="https://cdn-icons-png.flaticon.com/512/72/72648.png"
                    altText="Alta de usuario"
                    title="Alta de usuario"
                    description="Crea una nueva cuenta."
                  />
                </Link>
                <Link to="/login" className="option-link">
                  <OptionCard
                    imageUrl="https://cdn-icons-png.flaticon.com/256/24/24875.png"
                    altText="Ingreso"
                    title="Ingreso"
                    description="Accede a tu cuenta."
                  />
                </Link>
              </div>
            </div>
          }
        />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />

        <Route path="/delete-user" element={<DeleteUser />} />


        <Route path="/consulta-usuario" element={<ConsultaUsuario />} />


        <Route path="/Change-Password" element={<ChangePassword />} />
      </Routes>
    </Router>
  );
}

export default App;
