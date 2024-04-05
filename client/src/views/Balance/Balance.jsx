// TransactionView.js

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllTransactions, getProductById } from '../../redux/actions';
import CardsContainerForBalances from '../../components/CardsContainerForBalances/CardsContainerForBalances';


const TransactionView = () => {
  const dispatch = useDispatch();
  const { loading, error, transactions, product } = useSelector((state) => state);

  useEffect(() => {
    dispatch(getAllTransactions('', '')); // Aquí ajusta las fechas según tus necesidades
  }, [dispatch]);


  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
console.log(  transactions);

return (
  <div>
    <h1>VENTAS</h1>
    <CardsContainerForBalances transactions={transactions} />
  </div>
);
};

export default TransactionView;
