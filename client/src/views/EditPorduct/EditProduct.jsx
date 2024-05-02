import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { editProduct } from '../../redux/actions';
import styles from './EditProduct.module.css';
import axios from 'axios';

const EditProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const [formData, setFormData] = useState({
    nombreProducto: '',
    medidas: '',
    proveedor: '',
    proveedorId: '',
    cantidad: 0,
    fecha: null,
    costo: 0,
    costoPrevio: 0,
    tipo: '',
    regPrevio: '',
    image: '',
    productoId: '',
    clase: '',
    
  });

  // Obtener el producto del estado si es necesario
  // const product = useSelector((state) => state.product);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`/product/${id}`);
        const productData = response.data.data;
        // Establecer los datos del producto en el estado del formulario
        setFormData({
          nombreProducto: productData.nombreProducto,
          medidas: productData.medidas,
          proveedor: productData.proveedor,
          proveedorId: productData.proveedorId,
          cantidad: productData.cantidad,
          fecha: productData.fecha,
          costo: productData.costo,
          costoPrevio: productData.costoPrevio,
          tipo: productData.tipo,
          image: productData.image,
          regPrevio: productData.regPrevio,
          productoId: productData.productoId,
          clase: productData.clase,
        });
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };
    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleMedidasChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      medidas: {
        ...formData.medidas,
        [name]: value,
      },
    });
  }; 

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editProduct(id, formData));
  };

  return (
    <div className={styles.container}>
      <h1>Editar Producto</h1>
      <form onSubmit={handleSubmit}>
      <label>
    Nombre del producto:
    <input
      className={styles.input}
      placeholder='Nombre del producto'
      type="text"
      name="nombreProducto"
      value={formData.nombreProducto}
      onChange={handleChange}
      disabled={user && user.tipo !== 'Admin'}
    />
  </label>
  <label>
    ID del Producto:
    <input
      className={styles.input}
      placeholder='Id del producto '
      type="text"
      name="productoId"
      value={formData.productoId}
      onChange={handleChange}
      disabled={user && user.tipo !== 'Admin'}
    />
  </label>
  <label>
    Imagen:
    <input
      className={styles.input}
      type="text"
      name="image"
      value={formData.image}
      onChange={handleChange}
      disabled={user && user.tipo !== 'Admin'}
    />
  </label>
  <label>
    Medidas:
    <div>
      <input
        className={styles.input}
        placeholder='Alto cm'
        type="number"
        name="alto"
        value={formData.medidas?.alto}
        onChange={handleMedidasChange}
        disabled={user && user.tipo !== 'Admin'}
      />
      <input
        className={styles.input}
        placeholder='Ancho cm'
        type="number"
        name="ancho"
        value={formData.medidas?.ancho}
        onChange={handleMedidasChange}
        disabled={user && user.tipo !== 'Admin'}
      />
    </div>
  </label>
  <label>
    Proveedor:
    <input
      className={styles.input}
      placeholder='Proveedor'
      type="text"
      name="proveedor"
      value={formData.proveedor}
      onChange={handleChange}
      disabled={user && user.tipo !== 'Admin'}
    />
  </label>
  <label>
    ID del Proveedor:
    <input
      className={styles.input}
      placeholder='Id del proveedor'
      type="text"
      name="proveedorId"
      value={formData.proveedorId}
      onChange={handleChange}
      disabled={user && user.tipo !== 'Admin'}
    />
  </label>
  <label>
    Cantidad:
    <input
      className={styles.input}
      type="number"
      name="cantidad"
      value={formData.cantidad}
      onChange={handleChange}
      
    />
  </label>
  <label>
    Fecha:
    <input
      className={styles.input}
      type="date"
      name="fecha"
      value={formData.fecha}
      onChange={handleChange}
      disabled={user && user.tipo !== 'Admin'}
    />
  </label>
  <label>
    Registro Previo:
    <input
      className={styles.input}
      type="number"
      name="regPrevio"
      value={formData.regPrevio}
      onChange={handleChange}
      disabled={user && user.tipo !== 'Admin'}
    />
  </label>
  <label>
    Costo con iva:
    <input
      className={styles.input}
      type="number"
      name="costoPrevio"
      value={formData.costoPrevio}
      onChange={handleChange}
      disabled={user && user.tipo !== 'Admin'}
    />
  </label>
  <label>
    Venta:
    <input
      className={styles.input}
      type="number"
      name="costo"
      value={formData.costo}
      onChange={handleChange}
      disabled={user && user.tipo !== 'Admin'}
    />
  </label>
  <div>
    <label htmlFor="tipo">Tipo:</label>
    <select
      id="tipo"
      name="tipo"
      value={formData.tipo}
      onChange={handleChange}
      disabled={user && user.tipo !== 'Admin'}
    >
      <option value="">Seleccione un tipo</option>
      <option value="ALGODON">Algodón</option>
      <option value="YUTE">Yute</option>
      <option value="SINTETICA">Sintética</option>
      <option value="YUTE + ALGODON">Yute + Algodón</option>
      <option value="LANA">Lana</option>
      <option value="CUERO">Cuero</option>
      <option value="SEAGRASS">Seagrass</option>
      <option value="BANDAS VERTICALES COZUMEL">Bandas Verticales Cozumel</option>
      <option value="BANDAS VERTICALES VERDANA">Bandas Verticales Verdana</option>
    </select>
  </div>
  <div>
    <label htmlFor="tipo">Clase:</label>
    <select
      id="clase"
      name="clase"
      value={formData.clase}
      onChange={handleChange}
      disabled={user && user.tipo !== 'Admin'}
    >
<option value="">Seleccione un tipo</option>
    <option value="ALMOHADONES">Almohadones</option>
    <option value="MANTAS">Mantas</option>
    <option value="FUNDAS">Fundas</option>
    <option value="PIE DE CAMA">Pie de cama</option>
    <option value="BORLAS">Borlas</option>
    <option value="MOBILIARIO">Mobiliario</option>
    </select>
  </div>
  <button type="submit">Guardar Cambios</button>
      </form>
    </div>
  );
};

export default EditProduct;
