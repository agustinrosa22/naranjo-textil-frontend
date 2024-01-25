import React from "react";
import styles from './NavBar.module.css'
import { NavLink } from "react-router-dom";

const NavBar = ()=> {
    return(
        <div className={styles.navContainer}>
        <nav className={styles.navbar}>
            <h2>NAVBAR</h2>
            <NavLink to='/create' >
            <h2>Agregar Producto</h2>
            </NavLink>
        </nav>
        </div>
    )
}

export default NavBar