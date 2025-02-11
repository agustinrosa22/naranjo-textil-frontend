import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createProduct } from '../../redux/actions';
import { useNavigate } from 'react-router-dom';
import styles from './ProductForm.module.css';
import Logo from '../../assets/logo.png';

const ProductForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(state => state.user);

  const [formData, setFormData] = useState({
    nombreProducto: '',
    productoId: '',
    alto: '', 
    ancho: '',
    proveedor: '',
    proveedorId: '',
    cantidad: '',
    fecha: '',
    costo: '',
    regPrevio: '',
    costoPrevio: '',
    tipo: '',
    clase: '',
  });

  const [selectedImage, setSelectedImage] = useState(null); // Para almacenar la imagen seleccionada
  const [previewImage, setPreviewImage] = useState(''); // Para previsualizar la imagen

  const handleChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;

    // Validación para evitar valores negativos
    if (['alto', 'ancho', 'cantidad', 'costo', 'regPrevio', 'costoPrevio'].includes(name)) {
      newValue = Math.max(0, Number(value));
    }

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: newValue,
    }));
  };

  // Maneja la selección de una imagen
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file); // Guardamos la imagen seleccionada
      setPreviewImage(URL.createObjectURL(file)); // Creamos la URL de previsualización
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataWithImage = new FormData(); // Usamos FormData para enviar la imagen y el resto de datos

    // Agregamos todos los datos del formulario al FormData
    Object.keys(formData).forEach((key) => {
      formDataWithImage.append(key, formData[key]);
    });

    // Si se seleccionó una imagen, también la agregamos
    if (selectedImage) {
      formDataWithImage.append('image', selectedImage); // "image" será el campo donde enviamos la imagen
    }

    try {
      await dispatch(createProduct(formDataWithImage)); // Enviamos el FormData que contiene los datos y la imagen
      navigate('/home'); // Redirigimos tras crear el producto
    } catch (error) {
      alert(`Error al crear producto: ${error.message}`);
    }
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
              disabled={user && user.tipo !== 'Admin'}
            />
          </label>
          <label>
            ID del Producto:
            <input
              className={styles.input}
              placeholder='ID del producto'
              type="text"
              name="productoId"
              value={formData.productoId}
              onChange={handleChange}
              disabled={user && user.tipo !== 'Admin'}
            />
          </label>
          
          {/* Campo para seleccionar la imagen */}
          <label>
            Imagen del producto:
            <input
              className={styles.input}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              disabled={user && user.tipo !== 'Admin'}
            />
          </label>
          
          {/* Previsualización de la imagen seleccionada */}
          {previewImage && (
            <div className={styles.imagePreview}>
              <img src={previewImage} alt="Previsualización" className={styles.preview} />
            </div>
          )}

          <label>
            Alto (cm):
            <input
              className={styles.input}
              placeholder='Alto (cm)'
              type="number"
              name="alto"
              value={formData.alto}
              onChange={handleChange}
              disabled={user && user.tipo !== 'Admin'}
            />
          </label>
          <label>
            Ancho (cm):
            <input
              className={styles.input}
              placeholder='Ancho (cm)'
              type="number"
              name="ancho"
              value={formData.ancho}
              onChange={handleChange}
              disabled={user && user.tipo !== 'Admin'}
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
              disabled={user && user.tipo !== 'Admin'}
            />
          </label>
          <label>
            ID del Proveedor:
            <input
              className={styles.input}
              placeholder='ID del proveedor'
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
              disabled={user && user.tipo !== 'Admin'}
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
            Costo con IVA:
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
              <option value="OTROS">Otros</option>
            </select>
          </div>
          <div>
            <label htmlFor="clase">Clase:</label>
            <select
              id="clase"
              name="clase"
              value={formData.clase}
              onChange={handleChange}
              disabled={user && user.tipo !== 'Admin'}
            >
              <option value="">Seleccione una clase</option>
              <option value="ALMOHADONES">Almohadones</option>
              <option value="MANTAS">Mantas</option>
              <option value="FUNDAS">Fundas</option>
              <option value="PIE DE CAMA">Pie de cama</option>
              <option value="BORLAS">Borlas</option>
              <option value="MOBILIARIO">Mobiliario</option>
              <option value="ALFOMBRAS">Alfombras</option>
              <option value="OTROS">Otros</option>
            </select>
          </div>
          <button type="submit" className={styles.submitButton} disabled={user && user.tipo !== 'Admin'}>
            Crear Producto
          </button>
        </form>
      </div>
      <img src={Logo} alt="Logo" className={styles.img} />
      <button onClick={() => navigate(-1)} className={styles.buttonback}>Volver</button>
    </div>
  );
};

export default ProductForm;
