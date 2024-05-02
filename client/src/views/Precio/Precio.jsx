import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {  useParams } from 'react-router-dom';
import styles from './Precio.module.css';
import Logo from '../../assets/logoNavBar.png'



const Precio = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`/product/${id}`);
        setProduct(response.data.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };
    fetchProduct();
  }, [id]);

 // Costo del producto
const costoProducto = product.costo;

// Calcula el descuento del 20%
const descuento = costoProducto * 0.2;

// Calcula el precio al contado restando el descuento
const precioContado = costoProducto - descuento;

  return (
    <div className={styles.container}>
       <div className={styles.navContainer}>
        <nav className={styles.navbar}>
            <img src={Logo} alt="Naranjo Diseño e Interiores" className={styles.logo}/>

        </nav>
        </div>
      <div className={styles.detailcontainer}>
        <h2>{product.nombreProducto}</h2>
        <p>{product.medidas?.alto} x {product.medidas?.ancho}</p>
        <p>Precio lista ${product.costo}</p>
        <p>Precio contado - transferencia ${precioContado}</p>
        <p>{product.tipo}</p>
      </div>
      <div className={styles.boxImg}>
        <img src={product.image} alt={product.nombreProducto} />
      </div>
    </div>
  );
};

export default Precio;
