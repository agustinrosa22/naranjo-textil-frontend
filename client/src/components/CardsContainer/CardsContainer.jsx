import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import Card from "../Cards/Card";
import { getProducts } from "../../redux/actions";
import styles from './CardsContainer.module.css';
import { format } from 'date-fns';


const CardsContainer = () => {
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch]);

    const productList = useSelector((state) => state.productList);

    return (
        <div className={styles.container}>
            {productList.map(({productoId, nombreProducto, image, alto, ancho, proveedor, proveedorId, cantidad, fecha, costo, regPrevio, costoPrevio, id, tipo, clase}) => (
                <Card
                    key={id}
                    id={id}
                    productoId={productoId}
                    nombreProducto={nombreProducto}
                    image={image} 
                    alto={alto}
                    ancho={ancho}
                    proveedor={proveedor}
                    proveedorId={proveedorId}
                    cantidad={cantidad}
                    fecha={fecha}
                    costo={costo}
                    regPrevio={regPrevio}
                    costoPrevio={costoPrevio}
                    tipo={tipo}
                    clase={clase}
                    className={styles.card}
                />
            ))}
        </div>
    );
};

export default CardsContainer;
