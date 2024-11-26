import React, { useState } from 'react';
import './CreateAccount.css';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate

const CreateAccount = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    birthDate: '',
    phone: '',
    gender: '',
  });
  const navigate = useNavigate(); // Inicializar useNavigate

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateAge = (birthDate) => {
    const today = new Date();
    const birthDateObj = new Date(birthDate);
    const age = today.getFullYear() - birthDateObj.getFullYear();
    const monthDifference = today.getMonth() - birthDateObj.getMonth();
    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDateObj.getDate())
    ) {
      return age - 1;
    }
    return age;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar edad
    if (validateAge(formData.birthDate) < 18) {
      alert('Fecha de nacimiento inválida: debes tener al menos 18 años.');
      return;
    }

    // Validar teléfono
    if (!/^\d{10}$/.test(formData.phone)) {
      alert('Teléfono inválido: debe contener exactamente 10 dígitos.');
      return;
    }

    // Validar contraseñas coincidentes
    if (formData.password !== formData.confirmPassword) {
      alert('Las contraseñas no coinciden.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          full_name: formData.fullName,
          birth_date: formData.birthDate,
          phone: formData.phone,
          gender: formData.gender,
        }),
      });

      const result = await response.json();
      if (response.ok) {
        alert(result.message);
        navigate('/login'); // Redirigir al componente Home tras registro exitoso
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error('Error al conectar con el servidor:', error);
      alert('Error al conectar con el servidor.');
    }
  };

  return (
    <div className="create-account-container">
      <div className="create-account-box">
        <h1>Alta de Usuario</h1>
        <form className="form-list" onSubmit={handleSubmit}>
          <label>
            Correo Electrónico:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Contraseña:
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Confirmar Contraseña:
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Nombre Completo:
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Fecha de Nacimiento:
            <input
              type="date"
              name="birthDate"
              value={formData.birthDate}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Teléfono:
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Género:
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
            >
              <option value="">Seleccionar</option>
              <option value="Masculino">Masculino</option>
              <option value="Femenino">Femenino</option>
            </select>
          </label>
          <button type="submit" className="submit-button">
            Crear Cuenta
          </button>
        </form>
      </div>
    </div>
  );
};


export default CreateAccount;
