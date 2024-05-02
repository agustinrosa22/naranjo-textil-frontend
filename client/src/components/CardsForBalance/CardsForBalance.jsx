import React from 'react';
import style from './CardsForBalance.module.css';

const TransactionCard = ({ transaction }) => {
  return (
    <div className={style.card}>
      <img src={transaction.image} alt="" className={style.image} />
      <div className={style.details}>
        <h2>{transaction.nombreProducto}</h2>
        <p>ID: {transaction.id}</p>
        <p>Cantidad: {transaction.cantidad}</p>
        <p>Venta: {transaction.costo}</p>
        <p>Vendedor: {transaction.vendedor}</p>
        <p>Fecha: {new Date(transaction.fecha).toLocaleDateString('es-MX', { year: 'numeric', month: 'numeric', day: 'numeric', week: 'numeric' })}</p>
        <p>Comentario: {transaction.comentario}</p>
        <p>Tipo: {transaction.tipo}</p>
        <p>Clase: {transaction.clase}</p>
        <p>Costo con iva: {transaction.costoPrevio}</p>
      </div>
    </div>
  );
};

export default TransactionCard;
