// TransactionView.js

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllTransactions } from '../../redux/actions';
import CardsContainerForBalances from '../../components/CardsContainerForBalances/CardsContainerForBalances';


const TransactionView = () => {
  const dispatch = useDispatch();
  const { loading, error, transactions } = useSelector((state) => state);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    dispatch(getAllTransactions(startDate, endDate)); // Filtrar por fechas al cargar el componente
  }, [dispatch, startDate, endDate]);

  const calculateTotal = () => {
    let totalCantidad = 0;
    let totalCostoPrevio = 0;

    transactions.forEach((transaction) => {
      totalCantidad += parseInt(transaction.cantidad);
      totalCostoPrevio += parseInt(transaction.costoPrevio);
    });

    return { totalCantidad, totalCostoPrevio };
  };

  const { totalCantidad, totalCostoPrevio } = calculateTotal();

  const handleFilter = () => {
    dispatch(getAllTransactions(startDate, endDate)); // Filtrar por fechas al hacer clic en el botón
  };

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
    <div>
        <p>Total Cantidad: {totalCantidad}</p>
        <p>Total Costo Previo: {totalCostoPrevio}</p>
      </div>
      <div>
        <label htmlFor="startDate">Fecha de inicio:</label>
        <input
          type="date"
          id="startDate"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <label htmlFor="endDate">Fecha de fin:</label>
        <input
          type="date"
          id="endDate"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <button onClick={handleFilter}>Filtrar</button>
      </div>
    <CardsContainerForBalances transactions={transactions} />
  </div>
);
};

export default TransactionView;
