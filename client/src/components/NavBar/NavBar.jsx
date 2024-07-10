import React from "react";
import styles from './NavBar.module.css';
import { Link, NavLink } from "react-router-dom";
import Logo from '../../assets/logoNavBar.png';
import SearchBar from "../searchBar/searchbar";
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/actions';

const NavBar = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);

    const handleLogout = () => {
        dispatch(logout());
        window.location.href = '/';
    };

    return (
        <div className={styles.navContainer}>
            <nav className={styles.navbar}>
                <SearchBar />
                <Link to='/home'>
                    <img src={Logo} alt="Naranjo Diseño e Interiores" className={styles.logo} />
                </Link>
                <div className={styles.navLinks}>
                    {user && user.tipo === 'Admin' && (
                        <NavLink to='/groupedit' className={styles.link}>
                            <h2>Edit Precio</h2>
                        </NavLink>
                    )}
                    {user && user.tipo === 'Admin' && (
                        <NavLink to='/create' className={styles.link}>
                            <h2>Agregar</h2>
                        </NavLink>
                    )}
                    <NavLink to='/balance' className={styles.link}>
                        <h2>Balances</h2>
                    </NavLink>
                    <NavLink to='/carrito' className={styles.link}>
                        <h2>Carrito</h2>
                    </NavLink>
                    <button className={styles.link} onClick={handleLogout}>Logout</button>
                </div>
            </nav>
        </div>
    );
};

export default NavBar;
