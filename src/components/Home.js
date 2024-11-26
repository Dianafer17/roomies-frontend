import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="home-container">
      <h1>Roomies Project</h1>
      <div className="home-options">
        <div className="home-option" ref={menuRef}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/747/747376.png"
            alt="Perfil"
            onClick={toggleMenu}
          />
          <p>Perfil</p>
          {menuOpen && (
            <div className="dropdown-menu">
              <p onClick={() => navigate('/consulta-usuario')}>Consultar información</p>
              <p onClick={() => navigate('/delete-user')}>Eliminar cuenta</p>
            </div>
          )}
        </div>
        <div className="home-option" onClick={() => navigate('/grupos')}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/1077/1077012.png"
            alt="Grupos"
          />
          <p>Grupos</p>
        </div>
        <div className="home-option" onClick={() => navigate('/')}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/1828/1828490.png"
            alt="Cerrar sesión"
          />
          <p>Cerrar sesión</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
