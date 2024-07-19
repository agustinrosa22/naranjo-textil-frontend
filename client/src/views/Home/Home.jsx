import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CardsContainer from '../../components/CardsContainer/CardsContainer';
import styles from './Home.module.css';
import { getProducts, searchProducts } from '../../redux/actions';
import ProductListView from '../../components/Filtros/Filtros';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';

const Home = () => {
  const dispatch = useDispatch();
  const productList = useSelector(state => state.productList);
  const loading = useSelector(state => state.loading);
  const error = useSelector(state => state.error);
  const user = useSelector(state => state.user);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const applyFilters = (filters) => {
    dispatch(searchProducts(filters));
  };

  const resetFilters = () => {
    dispatch(getProducts());
  };

  const calculateTotalCost = () => {
    return productList.reduce((total, product) => {
      const productCost = parseFloat(product.costo || 0);
      const productQuantity = parseInt(product.cantidad || 0);
      return total + (productCost * productQuantity);
    }, 0);
  };

  const calculateTotalCostPrevio = () => {
    return productList.reduce((total, product) => {
      const productCost = parseFloat(product.costoPrevio || 0);
      const productQuantity = parseInt(product.cantidad || 0);
      return total + (productCost * productQuantity);
    }, 0);
  };


  const totalCost = calculateTotalCost();
  const totalCostPrevio = calculateTotalCostPrevio();
  const ganaciasPotenciales = totalCost-totalCostPrevio
  const produtosCargados = productList.length

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const scrollToBottom = () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={styles.home}>
      <ProductListView onApplyFilters={applyFilters} onResetFilters={resetFilters} />
      <h1>STOCK</h1>
      {user && user.tipo === 'Admin' && <div className={styles.totalsContainer}>
        <h2>Resumen del Stock</h2>
        <p>Productos cargados: {produtosCargados} productos</p>
        <p>Total Venta del Stock: ${totalCost.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
        <p>Total Costo del Stock: ${totalCostPrevio.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
        <p>Ganacias Potenciales:  ${ganaciasPotenciales.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
      </div>}
      <CardsContainer productList={productList} />
      <button className={styles.scrollButton} onClick={scrollToBottom} style={{ right: '20px' }}>
        <FontAwesomeIcon icon={faArrowDown} />
      </button>
      <button className={styles.scrollButton} onClick={scrollToTop} style={{ left: '20px' }}>
        <FontAwesomeIcon icon={faArrowUp} />
      </button>
    </div>
  );
};

export default Home;
