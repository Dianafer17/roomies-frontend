import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' }); // Estado para almacenar datos del formulario
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); // Inicializar useNavigate

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value }); // Actualiza los datos del formulario
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData), // Envía el estado formData
      });

      const result = await response.json();
      if (response.ok) {
        alert(result.message);

        // Guarda el correo del usuario en localStorage
        localStorage.setItem('userEmail', formData.email);

        // Redirige al componente Home tras ingreso exitoso
        navigate('/home');
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error('Error al ingresar:', error);
      alert('Error al conectar con el servidor.');
    }
  };

  return (
    <div className="login-container">
      <h1 className="login-title">Ingreso</h1>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label htmlFor="email">Correo:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email} // Usando formData.email
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password} // Usando formData.password
            onChange={handleInputChange}
            required
          />
        </div>

        {errorMessage && <p className="error">{errorMessage}</p>}

        <button type="submit">Ingresar</button>
      </form>
    </div>
  );
};

export default Login;
