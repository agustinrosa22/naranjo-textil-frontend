import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import Card from "../Cards/Card";
import { getProducts } from "../../redux/actions";
import styles from './CardsContainer.module.css';

const CardsContainer = () => {
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch]);

    const productList = useSelector((state) => state.productList);

    return (
        <div className={styles.container}>
            {productList.map(({productoId, nombreProducto, image, medidas, proveedor, proveedorId, cantidad, fecha, costo, regPrevio, costoPrevio}) => (
                <Card
                    key={productoId}
                    productoId={productoId}
                    nombreProducto={nombreProducto}
                    image={image} // Agrega la propiedad correspondiente para la imagen
                    medidas={medidas}
                    proveedor={proveedor}
                    proveedorId={proveedorId}
                    cantidad={cantidad}
                    fecha={fecha}
                    costo={costo}
                    regPrevio={regPrevio}
                    costoPrevio={costoPrevio}
                />
            ))}
        </div>
    );
};

export default CardsContainer;
