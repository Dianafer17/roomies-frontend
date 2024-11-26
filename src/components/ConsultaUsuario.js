import React, { useState, useEffect } from 'react';
import './ConsultaUsuario.css';

const ConsultaUsuario = () => {
    const [userData, setUserData] = useState({});
    const [editField, setEditField] = useState(null);
    const [newValue, setNewValue] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch('http://localhost:3001/user-info', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email: localStorage.getItem('userEmail') }),
                });

                const result = await response.json();
                if (response.ok) {
                    setUserData(result);
                } else {
                    alert(result.message || 'Error al cargar datos del usuario.');
                }
            } catch (error) {
                console.error('Error al conectar con el servidor:', error);
            }
        };

        fetchUserData();
    }, []);

    const handleEdit = (field) => {
        setEditField(field);
        setNewValue(userData[field]);
    };

    const handleSave = async () => {
        try {
            const response = await fetch('http://localhost:3001/update-user', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ field: editField, value: newValue, email: userData.email }),
            });

            const result = await response.json();
            if (response.ok) {
                setUserData({ ...userData, [editField]: newValue });
                setEditField(null);
                alert('Datos actualizados correctamente.');
            } else {
                alert(result.message || 'Error al actualizar datos.');
            }
        } catch (error) {
            console.error('Error al conectar con el servidor:', error);
        }
    };

    return (
        <div className="consulta-usuario-container">
            <div className="consulta-usuario-card">
                <h2>Consulta de Usuario</h2>
                <p><strong>Correo:</strong> {userData.email || '---'}</p>
                <p><strong>Nombre Completo:</strong> {userData.full_name || '---'}</p>
                <p><strong>Fecha de Nacimiento:</strong> {userData.birth_date || '---'}</p>
                <p><strong>Género:</strong> {userData.gender || '---'}</p>
                <p className="phone-field">
                    <strong>Teléfono:</strong> {userData.phone || '---'}
                    {editField === 'phone' ? (
                        <div>
                            <input value={newValue} onChange={(e) => setNewValue(e.target.value)} />
                            <button onClick={handleSave} className="edit-button">Guardar</button>
                            <button onClick={() => setEditField(null)} className="edit-button">Cancelar</button>
                        </div>
                    ) : (
                        <button onClick={() => handleEdit('phone')} className="edit-button">
                            Modificar
                        </button>
                    )}
                </p>
                <button onClick={() => window.location.href = '/change-password'} className="change-password-button">
                    Cambiar Contraseña
                </button>
            </div>
        </div>
    );
};

export default ConsultaUsuario;

