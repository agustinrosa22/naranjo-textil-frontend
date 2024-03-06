import React from "react";
import styles from './NavBar.module.css'
import { Link, NavLink } from "react-router-dom";
import Logo from '../../assets/logoNavBar.png';

const NavBar = ()=> {
    return(
        <div className={styles.navContainer}>
        <nav className={styles.navbar}>
            <Link to='/'>
            <img src={Logo} alt="Naranjo Diseño e Interiores" className={styles.logo}/>
            </Link>
            <div className={styles.searchBar}>
                    <input type="text" placeholder="Buscar..." className={styles.input} />
                    <button className={styles.searchButton}>
                        <i className="fas fa-search">buscar</i>
                    </button>
                </div>
                <NavLink to='/balances' className={styles.linkbalance} >
                    <h2>Filtros</h2>
                </NavLink>
            <NavLink to='/create' className={styles.link} >
            <h2>Agregar</h2>
            </NavLink>
            <NavLink to='/balances' className={styles.linkbalance} >
                    <h2>Balances</h2>
                </NavLink>
        </nav>
        </div>
    )
}

export default NavBar