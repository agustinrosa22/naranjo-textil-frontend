import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styles from './Detail.module.css';

const Detail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const productList = useSelector((state) => state.productList); // Obtener el estado de la lista de productos

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

  const handleSellClick = () => {
    console.log('Producto vendido');
  };

  const handleBarcodeClick = () => {
    console.log('Generando código de barras');
  };

  const handleGoBack = () => {
    navigate(-1);

    // Si hay una búsqueda activa, no se debe resetear
    if (!productList.length) {
      // Realizar la búsqueda nuevamente si no hay resultados
      // Puedes implementar la lógica de búsqueda aquí o llamar a la función que realiza la búsqueda
    }
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
        <button onClick={handleGoBack} className={styles.buttonback}>
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
