import React from 'react';
import styles from './Card.module.css';
import { Link } from 'react-router-dom';

const Card = (props) => {
 return (
        <div className={styles.card}>
            <Link to={`/detail/${props.id}`} className={styles.link}>
                <div className={styles.header}>
                    <img src={props.image} className={styles.image} alt={props.nombreProducto} />
                    <h2>{props.nombreProducto}</h2>
                </div>
                <div className={styles.details}>
                    <div className={styles.row}>
                        <p className={styles.column}>Medidas:</p>
                        <p>{props.medidas?.alto} x {props.medidas?.ancho}</p>
                    </div>
                    <div className={styles.row}>
                        <p className={styles.column}>Tipo:</p>
                        <p>{props.tipo}</p>
                    </div>
                    <div className={styles.row}>
                        <p className={styles.column}>Clase:</p>
                        <p>{props.clase}</p>
                    </div>
                    <div className={styles.row}>
                        <p className={styles.column}>Venta:</p>
                        <p>{props.costo}</p>
                    </div>
                    <div className={styles.row}>
                        <p className={styles.column}>Proveedor:</p>
                        <p>{props.proveedor}</p>
                    </div>
                    <div className={styles.row}>
                        <p className={styles.column}>Cantidad:</p>
                        <p>{props.cantidad}</p>
                    </div>
                </div>
            </Link>
        </div>
    );
}

export default Card;
