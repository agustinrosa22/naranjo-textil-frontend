import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createProduct } from '../../redux/actions'
import { useNavigate } from 'react-router-dom';
import styles from './ProductForm.module.css';
import Logo from '../../assets/logo.png'

const ProductForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombreProducto: '',
    productoId:'',
    image: '',
    medidas: '',
    proveedor: '',
    proveedorId: '',
    cantidad: 0,
    fecha: null,
    costo: 0,
    regPrevio: 0,
    costoPrevio: 0,

    // Agrega las demás propiedades del producto según tu modelo
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createProduct(formData));
    // Puedes redirigir al usuario a la lista de productos u otra página después de enviar el formulario
  };

  return (
    <div className={styles.container}>
    <h1 className={styles.title}>Crear Nuevo Producto</h1>
    <div className={styles.formBoxContainer}>
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
        />
      </label>
      <label>
        Medidas:
        <input
          className={styles.input}
          placeholder='Medidas'
          type="text"
          name="medidas"
          value={formData.medidas}
          onChange={handleChange}
        />
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
          />
        </label>
        <label>
          Costo Previo:
          <input
            className={styles.input}
            type="number"
            name="costoPrevio"
            value={formData.costoPrevio}
            onChange={handleChange}
          />
        </label>
        <label>
          Costo:
          <input
            className={styles.input}
            type="number"
            name="costo"
            value={formData.costo}
            onChange={handleChange}
          />
        </label>
      <button type="submit" className={styles.submitButton}>Crear Producto</button>
    </form>
    </div>
    <img src={Logo} alt="" className={styles.img}/>
    <button onClick={() => navigate(-1)} className={styles.buttonback}>
     Volver
     </button>
  </div>
);
};

export default ProductForm;
