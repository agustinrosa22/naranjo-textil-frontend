import React from 'react';
import { useDispatch } from 'react-redux'; // Importa useDispatch para enviar acciones a Redux
import axios from 'axios'; // Axios para realizar solicitudes HTTP
import style from './CardsForBalance.module.css';
import { removeTransactionFromStore } from '../../redux/actions';

const TransactionCard = ({ transaction, onDelete }) => {
  const dispatch = useDispatch();

  const handleDelete = async () => {
    // Mostrar confirmación antes de eliminar
    const confirmed = window.confirm('¿Estás seguro de que quieres eliminar esta transacción?'); // Mensaje de confirmación
    if (!confirmed) {
      return; // Si el usuario cancela, salir sin hacer nada
    }

    try {
      await axios.delete(`/transactions/${transaction.id}`); // Elimina la transacción por ID
      dispatch(removeTransactionFromStore(transaction.id)); // Envía la acción para eliminar del store
      if (onDelete) {
        onDelete(transaction.id); // Notifica al componente padre si se proporciona
      }
    } catch (error) {
      console.error('Error al eliminar la transacción:', error); // Manejo de errores
    }
  };


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
        <p>Proveedor: {transaction.proveedor}</p>
      </div>
      <button className={style.deleteButton} onClick={handleDelete}>
          Eliminar Transacción
        </button> 
    </div>
  );
};

export default TransactionCard;
