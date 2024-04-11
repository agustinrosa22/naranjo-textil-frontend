import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styles from './Detail.module.css';
import QRCode from 'qrcode.react';
import html2canvas from 'html2canvas';



const Detail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const productList = useSelector((state) => state.productList); // Obtener el estado de la lista de productos
  const [showQR, setShowQR] = useState(false);
  const [costoQR, setCostoQR] = useState('');
  const [downloadingQR, setDownloadingQR] = useState(false);
  const [cart, setCart] = useState([]);
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

  // const handleBarcodeClick = () => {
  //   // console.log('Valor del costo:', product.costo);
  //   // console.log('Estado de showQR:', showQR);
  //   setShowQR(true);
  //   setCostoQR("costo:" + " $" +  product.costo);
  // };

  const handleBarcodeClick = () => {
    setShowQR(true);
    const qrValue = `http://localhost:3000/precio/${id}`;
    setCostoQR(qrValue);
  };
  
  const handleDownloadQR = () => {
    setDownloadingQR(true);
    const qrCodeContainer = document.getElementById('qr-code-container');
  
    html2canvas(qrCodeContainer).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = 'qr_code.png';
      link.href = imgData;
      link.click();
      setDownloadingQR(false);
    });
  };

  const handleGoBack = () => {
    navigate(-1);

    // Si hay una búsqueda activa, no se debe resetear
    if (!productList.length) {
      // Realizar la búsqueda nuevamente si no hay resultados
      // Puedes implementar la lógica de búsqueda aquí o llamar a la función que realiza la búsqueda
    }
  };

  const addToCart = () => {
     // Obtener el carrito actual del almacenamiento local
  const currentCart = JSON.parse(localStorage.getItem('cart')) || [];

  // Agregar el nuevo producto al carrito existente
  const updatedCart = [...currentCart, { ...product, cantidad: 1 }];

  // Guardar el carrito actualizado en el almacenamiento local
  localStorage.setItem('cart', JSON.stringify(updatedCart));

  // Actualizar el estado del carrito en el componente
  setCart(updatedCart);

  console.log(updatedCart);
  };

  return (
    <div className={styles.container}>
      <div className={styles.detailcontainer}>
        <h1>{product.productoId}</h1>
        <h2>Nombre: {product.nombreProducto}</h2>
        <p>Medidas: {product.medidas?.alto} x {product.medidas?.ancho}</p>
        <p>Proveedor: {product.proveedor}</p>
        <p>Id del proveedor {product.proveedorId}</p>
        <p>Cantidad: {product.cantidad}</p>
        <p>Fecha: {product.fecha}</p>
        <p>Costo: {product.costo}</p>
        <p>Registro previo: {product.regPrevio}</p>
        <p>Costo previo: {product.costoPrevio}</p>
        <p>Tipo: {product.tipo}</p>
        <p>clase: {product.clase}</p>
        <button onClick={handleGoBack} className={styles.buttonback}>
          Volver
        </button>
        <Link to={`/edit/${id}`} > {/* Agrega el botón para editar el producto */}
        <button className={styles.barcodeButton}>
          Editar
        </button>
        </Link>
        <button onClick={handleBarcodeClick} className={styles.barcodeButton}>
          Código de QR
        </button>
        <button onClick={addToCart} className={styles.addToCartButton}>
          Agregar al Carrito
        </button>
        <div id="qr-code-container">
  {showQR && <QRCode value={costoQR} />}
</div>
<button
  onClick={handleDownloadQR}
  className={styles.downloadButton}
  disabled={downloadingQR}
>
  Descargar QR
</button>

      </div>
      <div className={styles.boxImg}>
        <img src={product.image} alt={product.nombreProducto} />
      </div>
    </div>
  );
};

export default Detail;
