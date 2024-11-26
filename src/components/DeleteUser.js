import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './DeleteUser.css';

const DeleteUser = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false); // Estado para mostrar/ocultar contraseña
    const navigate = useNavigate();

    const handleDelete = async (e) => {
        e.preventDefault();

        try {
            console.log('Enviando solicitud a /delete-user con:', { email, password });
            const response = await fetch('http://localhost:3001/delete-user', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const result = await response.json();

            if (response.ok) {
                alert('Usuario eliminado con éxito.');
                navigate('/'); // Regresar al inicio después de eliminar
            } else {
                alert(result.message || 'Error al eliminar usuario.');
            }
        } catch (error) {
            console.error('Error al conectar con el servidor:', error);
            alert('Error al conectar con el servidor.');
        }
    };

    const handleCancel = () => {
        navigate('/home'); // Regresar al Home
    };

    return (
        <div className="delete-user-container">
            <div className="delete-user-card">
                <h2>Eliminar Usuario</h2>
                <form onSubmit={handleDelete}>
                    <div className="input-group">
                        <label htmlFor="email">Correo</label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="Ingrese su correo"
                        />
                    </div>
                    <div className="input-group password-group">
                        <label htmlFor="password">Contraseña</label>
                        <div className="password-wrapper">
                            <input
                                id="password"
                                type={showPassword ? 'text' : 'password'} // Cambiar el tipo dinámicamente
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                placeholder="Ingrese su contraseña"
                            />
                            <button
                                type="button"
                                className="toggle-password"
                                onClick={() => setShowPassword(!showPassword)} // Alternar visibilidad
                            >
                                {showPassword ? '🙈' : '👁️'} {/* Ícono de ojo */}
                            </button>
                        </div>
                    </div>
                    <button type="submit" className="delete-button">
                        Confirmar Eliminación
                    </button>
                    <button type="button" className="cancel-button" onClick={handleCancel}>
                        Cancelar
                    </button>
                </form>
            </div>
        </div>
    );
};

export default DeleteUser;
