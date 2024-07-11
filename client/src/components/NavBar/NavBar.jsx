import React, { useState } from "react";
import styles from './NavBar.module.css';
import { Link, NavLink } from "react-router-dom";
import Logo from '../../assets/logoNavBar.png';
import SearchBar from "../searchBar/searchbar";
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/actions';
import { FaBars, FaTimes } from 'react-icons/fa';


const NavBar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);

    const handleLogout = () => {
        dispatch(logout());
        window.location.href = '/';
    };

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <div className={styles.navContainer}>
            <nav className={styles.navbar}>
              
                <Link to='/home'>
                    <img src={Logo} alt="Naranjo Diseño e Interiores" className={styles.logo} />
                </Link>
                <div className={styles.hamburger} onClick={toggleMenu}>
                    {menuOpen ? <FaTimes /> : <FaBars />}
                </div>
                <div className={`${styles.navLinks} ${menuOpen ? styles.showMenu : ''}`}>
                <SearchBar />
                    {user && user.tipo === 'Admin' && (
                        <NavLink to='/groupedit' className={styles.link} onClick={toggleMenu}>
                            <h2>Edit Precio</h2>
                        </NavLink>
                    )}
                    {user && user.tipo === 'Admin' && (
                        <NavLink to='/create' className={styles.link} onClick={toggleMenu}>
                            <h2>Agregar</h2>
                        </NavLink>
                    )}
                    {user && user.tipo === 'Admin' && (
                        <NavLink to='/balance' className={styles.link} onClick={toggleMenu}>
                            <h2>Balances</h2>
                        </NavLink>
                    )}
                    <NavLink to='/carrito' className={styles.link} onClick={toggleMenu}>
                        <h2>Carrito</h2>
                    </NavLink>
                    <button className={styles.link} onClick={() => { handleLogout(); toggleMenu(); }}>Logout</button>
                </div>
            </nav>
        </div>
    );
};

export default NavBar;
