import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { filterProducts } from '../../redux/actions';
import styles from './Filtros.module.css'

const ProductListView = () => {
  const dispatch = useDispatch();
  const productList = useSelector(state => state.productList);
  const [precioMin, setPrecioMin] = useState('');
  const [precioMax, setPrecioMax] = useState('');
  const [filters, setFilters] = useState({
    tipo: '',
    clase: '',
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  const applyFilters = () => {
    const filtersToSend = {
      tipo: filters.tipo,
      clase: filters.clase,
      precioMin: precioMin,
      precioMax: precioMax
    };
    dispatch(filterProducts(filtersToSend));
  };
  

  const resetFilters = () => {
    setFilters({
      tipo: '',
      clase: '',
    });
    dispatch(filterProducts({}));
  };

// console.log(productList)
  return (
    <div className={styles.container}>
    <div className={styles.filtersContainer}>
      {/* Filtros */}
      <div className={styles.filterItem}>
        <label>Tipo:</label>
        <select name="tipo" value={filters.tipo} onChange={handleFilterChange} className={styles.select}>
          <option value="">Todos</option>
          <option value="ALGODON">Algodón</option>
          <option value="YUTE">Yute</option>
          <option value="SINTETICA">Sintética</option>
          <option value="YUTE + ALGODON">Yute + Algodón</option>
          <option value="LANA">Lana</option>
          <option value="CUERO">Cuero</option>
          <option value="SEAGRASS">Seagrass</option>
          <option value="BANDAS VERTICALES COZUMEL">Bandas Verticales Cozumel</option>
          <option value="BANDAS VERTICALES VERDANA">Bandas Verticales Verdana</option>
          {/* Otros tipos de productos */}
        </select>
      </div>
      <div className={styles.filterItem}>
        <label>Clase:</label>
        <select name="clase" value={filters.clase} onChange={handleFilterChange} className={styles.select}>
          <option value="">Todos</option>
          <option value="ALMOHADONES">Almohadones</option>
          <option value="MANTAS">Mantas</option>
          <option value="FUNDAS">Fundas</option>
          <option value="PIE DE CAMA">Pie de cama</option>
          <option value="BORLAS">Borlas</option>
          <option value="MOBILIARIO">Mobiliario</option>
          <option value="ALFOMBRAS">Alfombras</option>
          {/* Otros tipos de clases */}
        </select>
      </div>
      <div className={styles.filterItem}>
  <label>Precio Mínimo:</label>
  <input className={styles.select} type="number" value={precioMin} onChange={(e) => setPrecioMin(e.target.value)} />
</div>
<div className={styles.filterItem}>
  <label>Precio Máximo:</label>
  <input className={styles.select} type="number" value={precioMax} onChange={(e) => setPrecioMax(e.target.value)} />
</div>
      <div className={styles.buttonContainer}>
        <button onClick={applyFilters} className={styles.button}>Aplicar Filtros</button>
       
      </div>
      <div className={styles.buttonContainer}>
      <button onClick={resetFilters} className={styles.button}>Reiniciar Filtros</button>
      </div>
    </div>
    </div>
  );
};

export default ProductListView;
