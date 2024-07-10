import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { editProduct } from '../../redux/actions';
import style from './GroupEdit.module.css';


const GroupEdit = () => {
  const [products, setProducts] = useState([]); // Inicializa como array vacío
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [newPrice, setNewPrice] = useState('');
  const dispatch = useDispatch();

  // Obtener todos los productos al montar el componente
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/product/');
        const data = Array.isArray(response.data.data) ? response.data.data : []; // Asegúrate de que es un array
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
        setProducts([]); // Inicializa como array vacío si hay error
      }
    };

    fetchProducts();
  }, []);

  // Función para seleccionar/deseleccionar un producto
  const toggleProductSelection = (productId) => {
    setSelectedProducts((prevSelected) => {
      if (prevSelected.includes(productId)) {
        return prevSelected.filter((id) => id !== productId);
      } else {
        return [...prevSelected, productId];
      }
    });
  };

  // Aplicar el nuevo precio a los productos seleccionados
  const applyNewPrice = () => {
    const price = parseFloat(newPrice);
    if (isNaN(price)) {
      console.error('El precio debe ser un número válido');
      return;
    }

    selectedProducts.forEach((productId) => {
      dispatch(editProduct(productId, { costo: price }));
    });

    // Después de aplicar los cambios, puedes vaciar el campo de precio y deseleccionar todos los productos
    setNewPrice('');
    setSelectedProducts([]);
  };

  return (
    <div className={style.groupEditContainer}>
      <h2>Edición de Productos en Grupo</h2>
      <div className={style.productList}>
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product.id} className={style.productItem}>
              <input
                type="checkbox"
                checked={selectedProducts.includes(product.id)}
                onChange={() => toggleProductSelection(product.id)}
              />
             <div className={style.header}>
                    <img src={product.image} className={style.image} alt={product.nombreProducto} />
                    <h2>{product.nombreProducto}</h2>
                </div>
                <div className={style.details}>
                    <div className={style.row}>
                        <p className={style.column}>Medidas:</p>
                        <p>{product?.alto} x {product?.ancho}</p>
                    </div>
                    <div className={style.row}>
                        <p className={style.column}>Tipo:</p>
                        <p>{product.tipo}</p>
                    </div>
                    <div className={style.row}>
                        <p className={style.column}>Clase:</p>
                        <p>{product.clase}</p>
                    </div>
                    <div className={style.row}>
                        <p className={style.column}>Venta:</p>
                        <p>{product.costo}</p>
                    </div>
                    <div className={style.row}>
                        <p className={style.column}>Proveedor:</p>
                        <p>{product.proveedor}</p>
                    </div>
                    <div className={style.row}>
                        <p className={style.column}>Cantidad:</p>
                        <p>{product.cantidad}</p>
                    </div>
                </div>
            </div>
          ))
        ) : (
          <p>No hay productos para mostrar</p>
        )}
      </div>
      <div className={style.actions}>
        <input
          type="number"
          placeholder="Nuevo precio"
          value={newPrice}
          onChange={(e) => setNewPrice(e.target.value)}
        />
        <button
          onClick={applyNewPrice}
          disabled={selectedProducts.length === 0 || newPrice === ''}
        >
          Aplicar nuevo precio
        </button>
      </div>
    </div>
  );
};

export default GroupEdit;
