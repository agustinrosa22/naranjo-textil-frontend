import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CardsContainer from '../../components/CardsContainer/CardsContainer';
import styles from './Home.module.css';
import { getProducts, searchProducts } from '../../redux/actions';
import ProductListView from '../../components/Filtros/Filtros';

const Home = () => {
  const dispatch = useDispatch();
  const productList = useSelector(state => state.productList);
  const loading = useSelector(state => state.loading);
  const error = useSelector(state => state.error);

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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className={styles.home}>
      <ProductListView onApplyFilters={applyFilters} onResetFilters={resetFilters} />
      <h1>STOCK</h1>
      <div className={styles.totalsContainer}>
        <h2>Resumen del Stock</h2>
        <p>Total Venta del Stock: ${totalCost.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
        <p>Total Costo del Stock: ${totalCostPrevio.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
        <p>Ganacias Potenciales:  ${ganaciasPotenciales.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
      </div>
      <CardsContainer productList={productList} />
    </div>
  );
};

export default Home;
