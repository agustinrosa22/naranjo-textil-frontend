import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {useParams, Link } from 'react-router-dom';
import styles from './Detail.module.css';

const Detail = () => {
    
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
        try {
            const response = await axios.get(`/product/${id}`)
            setProduct(response.data.data)
        } catch (error) {
            console.log(error);
            console.error('Error fetching product:', error);
        }
    };
    fetchProduct();
  }, [id]);

  
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>DETALLES</h1>
      <h1>{product.productoId}</h1>
                <h2>Nombre: {product.nombreProducto}</h2>
                <p>Id: {product.id}</p>
                <img src={product.image} alt={product.nombreProducto} />
                <p>Medidas: {product.medidas}</p>
                <p>Proveedor: {product.proveedor}</p>
                <p>Id del proveedor {product.proveedorId}</p>
                <p>Cantidad: {product.cantidad}</p>
                <p>fecha: {product.fecha}</p>
                <p>Costo: {product.costo}</p>
                <p>Registro previo: {product.regPrevio}</p>
                <p>Costo previo: {product.costoPrevio}</p>
      
     <button onClick={() => navigate(-1)} className={styles.buttonback}>
     Volver
     </button>
    </div>
  );
};

export default Detail;