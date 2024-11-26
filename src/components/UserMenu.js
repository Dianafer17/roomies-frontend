import React, { useState } from 'react';
import './UserMenu.css';

const UserMenu = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="user-menu-container">
            <div className="user-icon" onClick={toggleMenu}>
                <img
                    src="https://cdn-icons-png.flaticon.com/512/747/747376.png"
                    alt="Usuario"
                    className="user-avatar"
                />
            </div>
            {isOpen && (
                <div className="dropdown-menu">
                    <p onClick={() => navigate('/consulta-usuario')}>Consultar información</p>

                    <p onClick={() => alert('Eliminar cuenta')}>Eliminar cuenta</p>
                </div>
            )}
        </div>
    );
};

export default UserMenu;
