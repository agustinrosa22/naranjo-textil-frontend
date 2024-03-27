import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CardsContainer from '../../components/CardsContainer/CardsContainer';
import styles from './Home.module.css';
import { getProducts, searchProducts } from '../../redux/actions';
import ProductListView from '../../components/Filtros/Filtros';

const Home = () => {
  const dispatch = useDispatch();
  const productList = useSelector(state => state.productList);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const applyFilters = (filters) => {
    dispatch(searchProducts(filters));
  };

  const resetFilters = () => {
    dispatch(getProducts());
  };

  return (
    <div className={styles.home}>
      <ProductListView onApplyFilters={applyFilters} onResetFilters={resetFilters} />
      <h1>STOCK</h1>
      <CardsContainer productList={productList} />
    </div>
  );
};

export default Home;
