import React from 'react';
import TransactionCard from '../CardsForBalance/CardsForBalance';
import style from './CardsContainerForBalances.module.module.css';

const CardsContainerForBalances = ({ transactions }) => {
  return (
    <div className={style.container}>
      {transactions.map((transaction) => (
        <TransactionCard key={transaction.id} transaction={transaction} />
      ))}
    </div>
  );
};

export default CardsContainerForBalances;
