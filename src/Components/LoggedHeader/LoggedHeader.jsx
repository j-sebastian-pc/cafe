import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faMugHot, faSearch } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { logout } from '../../store/slices/userSlice';
import { useDispatch } from 'react-redux';
export const LoggedHeader = () => {
    const [showLogoutPopup, setShowLogoutPopup] = useState(false);
    const dispatcher = useDispatch()
    const handleLogout = () => {
        localStorage.clear();
        dispatcher(logout())
        setShowLogoutPopup(false);
        window.location.href = "/";
    };

    const handleClick = () => {
        const $bar = document.querySelector(".navbar")
        $bar.classList.toggle("open")
        $bar.classList.toggle("closed", $bar.classList.contains("open"))
    }
    return (
        <>
            {showLogoutPopup && (
                <div className="logout-popup">
                    <p>¿Estás seguro de que deseas cerrar sesión?</p>
                    <button   className='btn' onClick={handleLogout}>Sí, cerrar sesión</button>
                    <button  className='btn' onClick={() => setShowLogoutPopup(false)}>Cancelar</button>
                </div>
            )}

            <header className="header">
                <div>
                    <button onClick={handleClick} id="menu-btn">
                        <FontAwesomeIcon icon={faBars} />
                    </button>

                    <a href="#" className="logo">
                        <FontAwesomeIcon icon={faMugHot} /> TuCafé
                    </a>
                </div>
                <nav className="navbar">
                    <NavLink to="/">Inicio</NavLink>
                    <NavLink to="/lugares">Lugares</NavLink>
                    <NavLink to="/acerca">Nosotros</NavLink>
                    <NavLink to="/opiniones">Reseñas</NavLink>
                    <NavLink to="/reserva">Reservas</NavLink>
                </nav>

                <div className="search-bar">
                    <input type="text" id="search-input" placeholder="Buscar Lugar..." />
                    <button id="search-btn">
                        <FontAwesomeIcon icon={faSearch} />
                    </button>
                </div>

                {/* Botones de registro y salida */}
                <li>
                    <NavLink to="/PerfilUsuario" className="btn-header">Perfil</NavLink>

                    <button className="btn-header" onClick={() => setShowLogoutPopup(true)}>Salir</button>

                </li>


            </header>
        </>

    )


}