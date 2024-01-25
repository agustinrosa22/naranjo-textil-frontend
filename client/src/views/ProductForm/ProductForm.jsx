import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createProduct } from '../../redux/actions'
import { useNavigate } from 'react-router-dom';
import styles from './ProductForm.module.css';

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
    <form onSubmit={handleSubmit}>
      <label>
        Nombre del Producto:
        <input
          type="text"
          name="nombreProducto"
          value={formData.nombreProducto}
          onChange={handleChange}
        />
      </label>
      <label>
        ID del Producto:
        <input
          type="text"
          name="productId"
          value={formData.productoId}
          onChange={handleChange}
        />
      </label>
      <label>
        Imagen:
        <input
          type="text"
          name="image"
          value={formData.image}
          onChange={handleChange}
        />
      </label>
      <label>
        Medidas:
        <input
          type="text"
          name="medidas"
          value={formData.medidas}
          onChange={handleChange}
        />
      </label>
      <label>
        Proveedor:
        <input
          type="text"
          name="proveedor"
          value={formData.proveedor}
          onChange={handleChange}
        />
      </label>
      <label>
        ID del Proveedor:
        <input
          type="text"
          name="proveedorId"
          value={formData.proveedorId}
          onChange={handleChange}
        />
      </label>
      <label>
        Cantidad:
        <input
          type="number"
          name="cantidad"
          value={formData.cantidad}
          onChange={handleChange}
        />
      </label>
      <label>
          Fecha:
          <input
            type="date"
            name="fecha"
            value={formData.fecha}
            onChange={handleChange}
          />
        </label>
        <label>
          Registro Previo:
          <input
            type="number"
            name="regPrevio"
            value={formData.regPrevio}
            onChange={handleChange}
          />
        </label>
        <label>
          Costo Previo:
          <input
            type="number"
            name="costoPrevio"
            value={formData.costoPrevio}
            onChange={handleChange}
          />
        </label>
        <label>
          Costo:
          <input
            type="number"
            name="costo"
            value={formData.costo}
            onChange={handleChange}
          />
        </label>
      <button type="submit">Crear Producto</button>
    </form>
    <button onClick={() => navigate(-1)} className={styles.buttonback}>
     Volver
     </button>
  </div>
);
};

export default ProductForm;
