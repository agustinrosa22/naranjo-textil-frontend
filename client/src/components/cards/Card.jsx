import React from 'react';
import styles from './Card.module.css';
import { Link } from 'react-router-dom';

const Card = (props) => {
    return(
        <div  className={styles.card}>
            <Link to={`/detail/${props.id}`} className={styles.link}>
            <h1>{props.productoId}</h1>
                <h2>{props.nombreProducto}</h2>
                {/* <p>Id: {props.id}</p> */}
                <img src={props.image} alt={props.nombreProducto}  className={styles.image}/>
                {/* <p>Medidas: {props.medidas}</p>
                <p>Proveedor: {props.proveedor}</p> */}
                {/* <p>Id del proveedor {props.proveedorId}</p>
                <p>Cantidad: {props.cantidad}</p>
                <p>fecha: {props.fecha}</p>
                <p>Costo: {props.costo}</p>
                <p>Registro previo: {props.regPrevio}</p>
                <p>Costo previo: {props.costoPrevio}</p>
                 */}
            </Link>
        </div>
    )
}

export default Card;
