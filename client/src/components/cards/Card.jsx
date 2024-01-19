import React from 'react';
import styles from './Card.module.css';

const Card = (props) => {
    return(
        <div  className={styles.card}>
            <h1>{props.productoId}</h1>
                <h2>Nombre: {props.nombreProducto}</h2>
                <img src={props.image} alt={props.nombreProducto} />
                <p>Medidas: {props.medidas}</p>
                <p>Proveedor: {props.proveedor}</p>
                <p>Id del proveedor {props.proveedorId}</p>
                <p>Cantidad: {props.cantidad}</p>
                <p>fecha: {props.fecha}</p>
                <p>Costo: {props.costo}</p>
                <p>Registro previo: {props.regPrevio}</p>
                <p>Costo previo: {props.costoPrevio}</p>
                
        </div>
    )
}

export default Card;
