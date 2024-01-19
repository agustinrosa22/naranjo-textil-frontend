import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import CardsContainer from '../../components/CardsContainer/CardsContainer';
import styles from './Home.module.css';
import { getProducts } from '../../redux/actions';

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <div className={styles.home}>
      <h1>Bienvenido a nuestra tienda</h1>
      <CardsContainer />
    </div>
  );
};

export default Home;