import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editProduct, getProducts } from '../../redux/actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import style from './GroupEdit.module.css';

const GroupEdit = () => {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [priceIncrement, setPriceIncrement] = useState('');
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const [products, setProducts] = useState(productList);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  useEffect(() => {
    setProducts(productList);
  }, [productList]);

  const toggleProductSelection = (productId) => {
    setSelectedProducts((prevSelected) =>
      prevSelected.includes(productId)
        ? prevSelected.filter((id) => id !== productId)
        : [...prevSelected, productId]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const increment = parseFloat(priceIncrement);
    if (isNaN(increment)) {
      alert('El incremento debe ser un número válido');
      return;
    }
  
    if (selectedProducts.length === 0) {
      alert('Debes seleccionar al menos un producto');
      return;
    }
  
    try {
      const updatePromises = selectedProducts.map(async (productId) => {
        const product = products.find((p) => p.id === productId);
        if (product) {
          const updatedProduct = {
            ...product, // Mantiene todos los datos originales
            costo: product.costo * (1 + increment / 100), // Solo modifica el costo
          };
  
          await dispatch(editProduct(product.id, updatedProduct));
        }
      });
  
      await Promise.all(updatePromises); // Espera que todas las ediciones se completen
  
      setPriceIncrement('');
      setSelectedProducts([]);
      alert('Productos actualizados correctamente');
    } catch (error) {
      alert(`Error al actualizar los productos: ${error.message || 'Error desconocido'}`);
      console.error('Error al actualizar productos:', error);
    }
  };
  

  return (
    <div className={style.groupEditContainer}>
      <h2>Edición de Productos en Grupo</h2>
      <form onSubmit={handleSubmit}>
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
                    <p>
                      ${selectedProducts.includes(product.id)
                        ? (product.costo * (1 + parseFloat(priceIncrement || 0) / 100)).toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                        : product.costo.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                      }
                    </p>
                  </div>
                  <div className={style.row}>
                    <p className={style.column}>Proveedor:</p>
                    <p>{product.proveedor}</p>
                  </div>
                  <div className={style.row}>
                    <p className={style.column}>Cantidad:</p>
                    <p className={product.cantidad <= 0 ? style.redText : ''}>{product.cantidad}</p>
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
            placeholder="Incremento %"
            value={priceIncrement}
            onChange={(e) => setPriceIncrement(e.target.value)}
          />
          <button type="submit" disabled={selectedProducts.length === 0 || priceIncrement === ''}>
            Aplicar incremento
          </button>
        </div>
      </form>
      <button className={style.scrollButton} onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })} style={{ right: '20px' }}>
        <FontAwesomeIcon icon={faArrowDown} />
      </button>
      <button className={style.scrollButton} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} style={{ left: '20px' }}>
        <FontAwesomeIcon icon={faArrowUp} />
      </button>
    </div>
  );
};

export default GroupEdit;
