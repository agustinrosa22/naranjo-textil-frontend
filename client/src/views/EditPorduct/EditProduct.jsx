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
    proveedor: '',
    proveedorId: '',
    alto: '',
    ancho: '',
    cantidad: 0,
    fecha: null,
    costo: 0,
    costoPrevio: 0,
    tipo: '',
    regPrevio: '',
    image: null,  // Cambiado a null para manejar archivos
    productoId: '',
    clase: '',
  });

  const [previewImage, setPreviewImage] = useState(null); // Para mostrar la imagen seleccionada

  // Obtener el producto del backend al cargar el componente
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`/product/${id}`);
        const productData = response.data.data;
        setFormData(productData);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };
    fetchProduct();
  }, [id]);

  // Función para manejar la selección de la imagen
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        image: file,  // Guardar el archivo de la imagen
      });

      // Crear una URL temporal para mostrar la imagen en el preview
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  // Función para manejar cambios en los inputs de texto
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Función para manejar cambios en las medidas (alto/ancho)
  const handleMedidasChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Función para enviar el formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Crear un objeto FormData para manejar archivos e inputs
    const formDataToSend = new FormData();

    // Agregar todos los datos al FormData
    formDataToSend.append('nombreProducto', formData.nombreProducto);
    formDataToSend.append('proveedor', formData.proveedor);
    formDataToSend.append('proveedorId', formData.proveedorId);
    formDataToSend.append('alto', formData.alto);
    formDataToSend.append('ancho', formData.ancho);
    formDataToSend.append('cantidad', formData.cantidad);
    formDataToSend.append('fecha', formData.fecha);
    formDataToSend.append('costo', formData.costo);
    formDataToSend.append('costoPrevio', formData.costoPrevio);
    formDataToSend.append('tipo', formData.tipo);
    formDataToSend.append('regPrevio', formData.regPrevio);
    formDataToSend.append('productoId', formData.productoId);
    formDataToSend.append('clase', formData.clase);

    // Si hay una imagen, agregarla a FormData
    if (formData.image) {
      formDataToSend.append('image', formData.image);
    }

    try {
      // Enviar el formulario con los datos y la imagen
      await dispatch(editProduct(id, formDataToSend));
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
    }
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
            placeholder='ID del producto'
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
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
          {previewImage && (
            <div>
              <img src={previewImage} alt="Preview" className={styles.preview} />
            </div>
          )}
        </label>
        <label>
          Medidas:
          <div>
            <input
              className={styles.input}
              placeholder='Alto cm'
              type="number"
              name="alto"
              value={formData.alto}
              onChange={handleMedidasChange}
              disabled={user && user.tipo !== 'Admin'}
            />
            <input
              className={styles.input}
              placeholder='Ancho cm'
              type="number"
              name="ancho"
              value={formData.ancho}
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
        <button type="submit">Guardar Cambios</button>
      </form>
    </div>
  );
};

export default EditProduct;
