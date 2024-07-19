import React from 'react';
import { useDispatch, useSelector } from 'react-redux'; // Importa useDispatch para enviar acciones a Redux
import axios from 'axios'; // Axios para realizar solicitudes HTTP
import style from './CardsForBalance.module.css';
import { removeTransactionFromStore } from '../../redux/actions';

const TransactionCard = ({ transaction, onDelete }) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);

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

  // console.log(transaction)


  return (
    <div className={style.card}>
       <div className={style.header}>
                    <img src={transaction.image} className={style.image} alt={transaction.nombreProducto} />
                    <h2>{transaction.nombreProducto}</h2>
                </div>
      <div className={style.details}>
      <div className={style.row}>
                        <p className={style.column}>Clase:</p>
                        <p>{transaction.clase}</p>
                    </div>
                    <div className={style.row}>
                        <p className={style.column}>Cantidad:</p>
                        <p>{transaction.cantidad}</p>
                    </div>
                    <div className={style.row}>
                        <p className={style.column}>Venta:</p>
                        <p>${transaction?.costo?.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                    </div>
                    <div className={style.row}>
                        <p className={style.column}>Vendedor:</p>
                        <p>{transaction.vendedor}</p>
                    </div>
                    <div className={style.row}>
                        <p className={style.column}>Fecha:</p>
                        <p>{new Date(transaction.fecha).toLocaleDateString('es-MX', { year: 'numeric', month: 'numeric', day: 'numeric', week: 'numeric' })}</p>
                    </div>
                    <div className={style.row}>
                        <p className={style.column}>Comentario:</p>
                        <p>{transaction.comentario}</p>
                    </div>
                    <div className={style.row}>
                        <p className={style.column}>Tipo:</p>
                        <p>{transaction.tipo}</p>
                    </div>
                    <div className={style.row}>
                        <p className={style.column}>Clase:</p>
                        <p>{transaction.clase}</p>
                    </div>
                    <div className={style.row}>
                        <p className={style.column}>Costo con iva:</p>
                        <p>{transaction.costoPrevio}</p>
                    </div>
                    <div className={style.row}>
                        <p className={style.column}>Proveedor:</p>
                        <p>{transaction.proveedor}</p>
                    </div>
                    <div className={style.row}>
                        <p className={style.column}>Alto:</p>
                        <p>{transaction.alto}</p>
                    </div>
                    <div className={style.row}>
                        <p className={style.column}>Ancho:</p>
                        <p>{transaction.ancho}</p>
                    </div>
      </div>
      {user && user.tipo === 'Admin' && (
      <button className={style.deleteButton} onClick={handleDelete}>
          Eliminar Transacción
        </button> 
      )}
    </div>
  );
};

export default TransactionCard;