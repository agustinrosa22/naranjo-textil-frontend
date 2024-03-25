import React from "react";
import styles from './NavBar.module.css'
import { Link, NavLink } from "react-router-dom";
import Logo from '../../assets/logoNavBar.png'
import SearchBar from "../searchBar/searchbar";
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/actions';

const NavBar = ()=> {
    const dispatch = useDispatch();

    const handleLogout = () => {
      // Dispatch la acción de logout
      dispatch(logout());
      // Redirige al usuario a la página de inicio o a donde sea necesario
      window.location.href = '/'; // Si estás usando un enrutador diferente al de React Router
    };
  
    return(
        <div className={styles.navContainer}>
        <nav className={styles.navbar}>
            <Link to='/home'>
            <img src={Logo} alt="Naranjo Diseño e Interiores" className={styles.logo}/>
            </Link>
            <SearchBar />
                <NavLink to='/balances' className={styles.linkbalance} >
                    <h2>Filtros</h2>
                </NavLink>
            <NavLink to='/create' className={styles.link} >
            <h2>Agregar</h2>
            </NavLink>
            <NavLink to='/balances' className={styles.linkbalance} >
                    <h2>Balances</h2>
                </NavLink>

                <NavLink to='/carrito' className={styles.linkbalance} >
                    <h2>Carrito</h2>
                </NavLink>
                <button className={styles.linkbalance} onClick={handleLogout}>Logout</button>
        </nav>
        </div>
    )
}

export default NavBar