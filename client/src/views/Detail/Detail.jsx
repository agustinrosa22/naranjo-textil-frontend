import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {useParams} from 'react-router-dom';
import styles from './Detail.module.css';
// import { format } from 'date-fns';

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

  const handleSellClick = () => {
    // Aquí puedes agregar la lógica para vender el producto
    console.log('Producto vendido');
  };

  const handleBarcodeClick = () => {
    // Aquí puedes agregar la lógica para generar el código de barras
    console.log('Generando código de barras');
  };
  
  return (
    <div className={styles.container}>
      <div className={styles.detailcontainer}>
      <h1>{product.productoId}</h1>
                <h2>Nombre: {product.nombreProducto}</h2>
                <p>Medidas: {product.medidas}</p>
                <p>Proveedor: {product.proveedor}</p>
                <p>Id del proveedor {product.proveedorId}</p>
                <p>Cantidad: {product.cantidad}</p>
                <p>Fecha: {product.fecha}</p>
                <p>Costo: {product.costo}</p>
                <p>Registro previo: {product.regPrevio}</p>
                <p>Costo previo: {product.costoPrevio}</p>
     <button onClick={() => navigate(-1)} className={styles.buttonback}>
     Volver
     </button>
     <button onClick={handleSellClick} className={styles.sellButton}>
     Vender
     </button>
     <button onClick={handleBarcodeClick} className={styles.barcodeButton}>
     Código de Barras
     </button>
      </div>
      <div className={styles.boxImg}>
                <img src={product.image} alt={product.nombreProducto} />
      </div>
      
    </div>
  );
};

export default Detail;