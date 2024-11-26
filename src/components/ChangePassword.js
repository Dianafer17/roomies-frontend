import React, { useState } from 'react';
import './ChangePassword.css';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate para redirección

const ChangePassword = () => {
    const [email, setEmail] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [showPasswords, setShowPasswords] = useState({
        currentPassword: false,
        newPassword: false,
        confirmPassword: false,
    });

    const navigate = useNavigate(); // Hook para redirección

    const toggleShowPassword = (field) => {
        setShowPasswords((prev) => ({
            ...prev,
            [field]: !prev[field],
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            setErrorMessage('Las contraseñas no coinciden.');
            return;
        }

        try {
            const response = await fetch('http://localhost:3001/change-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, currentPassword, newPassword }),
            });

            const result = await response.json();

            if (response.ok) {
                alert('Contraseña actualizada correctamente.');
                setEmail('');
                setCurrentPassword('');
                setNewPassword('');
                setConfirmPassword('');
                setErrorMessage('');
                navigate('/home'); // Redirigir a consultaUsuario
            } else {
                setErrorMessage(result.message || 'Error al cambiar la contraseña.');
            }
        } catch (error) {
            console.error('Error al conectar con el servidor:', error);
            setErrorMessage('Error al conectar con el servidor.');
        }
    };

    return (
        <div className="change-password-container">
            <div className="change-password-card">
                <h2>Cambiar Contraseña</h2>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                <form onSubmit={handleSubmit}>
                    <label>
                        Correo:
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        Contraseña Actual:
                        <div className="password-input-container">
                            <input
                                type={showPasswords.currentPassword ? 'text' : 'password'}
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                required
                            />
                            <button
                                type="button"
                                onClick={() => toggleShowPassword('currentPassword')}
                                className="toggle-password-button"
                            >
                                {showPasswords.currentPassword ? '👁️' : '🙈'}
                            </button>
                        </div>
                    </label>
                    <label>
                        Nueva Contraseña:
                        <div className="password-input-container">
                            <input
                                type={showPasswords.newPassword ? 'text' : 'password'}
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                required
                            />
                            <button
                                type="button"
                                onClick={() => toggleShowPassword('newPassword')}
                                className="toggle-password-button"
                            >
                                {showPasswords.newPassword ? '👁️' : '🙈'}
                            </button>
                        </div>
                    </label>
                    <label>
                        Confirmar Nueva Contraseña:
                        <div className="password-input-container">
                            <input
                                type={showPasswords.confirmPassword ? 'text' : 'password'}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                            <button
                                type="button"
                                onClick={() => toggleShowPassword('confirmPassword')}
                                className="toggle-password-button"
                            >
                                {showPasswords.confirmPassword ? '👁️' : '🙈'}
                            </button>
                        </div>
                    </label>
                    <button type="submit" className="update-button">Actualizar Contraseña</button>
                </form>
            </div>
        </div>
    );
};

export default ChangePassword;
