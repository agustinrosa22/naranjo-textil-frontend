// TransactionView.js

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getTransactionsAndProduct } from '../../redux/actions';
import CardsContainerForBalances from '../../components/CardsContainerForBalances/CardsContainerForBalances';


const TransactionView = () => {
  const dispatch = useDispatch();
  const { loading, error, transactions } = useSelector((state) => state);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [tipo, setTipo] = useState('');
  const [clase, setClase] = useState('');

  useEffect(() => {
    // No se llama a getAllTransactions aquí para evitar la búsqueda automática al cargar el componente
  }, []);

  const calculateTotal = () => {
    let totalCantidad = 0;
    let totalCostoPrevio = 0;
    let totalCosto = 0;

    transactions.forEach((transaction) => {
      totalCantidad += parseInt(transaction.cantidad);
      totalCostoPrevio += parseFloat(transaction.costoPrevio);
      totalCosto += parseFloat(transaction.costo);
    });

    const ganancia = totalCosto - totalCostoPrevio; 

    return { totalCantidad, totalCostoPrevio,  totalCosto, ganancia};
  };

  const { totalCantidad, totalCostoPrevio, totalCosto, ganancia } = calculateTotal();

  const handleFilter = () => {
    // Llama a la acción de Redux solo cuando se presiona el botón de filtrar
    dispatch(getTransactionsAndProduct(startDate, endDate, tipo, clase));
  };

  const handleResetFilters = () => {
    // Resetear los valores de los filtros
    setStartDate('');
    setEndDate('');
    setTipo('');
    setClase('');
    // Volver a obtener las transacciones sin filtros
    dispatch(getTransactionsAndProduct('', '', '', ''));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>VENTAS</h1>
      <div>
        <p>Total Cantidad: {totalCantidad}</p>
        <p>Total Costo Previo: {totalCostoPrevio}</p>
        <p>Total vendido: ${totalCosto}</p>
        <p>Ganancia: ${ganancia}</p>
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
       <label htmlFor="tipo">Tipo:</label>
<select
  id="tipo"
  value={tipo}
  onChange={(e) => setTipo(e.target.value)}
>
  <option value="">Todos</option>
  <option value="ALGODON">Algodón</option>
  <option value="YUTE">Yute</option>
  <option value="SINTETICA">Sintética</option>
  <option value="YUTE + ALGODON">Yute + Algodón</option>
  <option value="LANA">Lana</option>
  <option value="CUERO">Cuero</option>
  <option value="SEAGRASS">Seagrass</option>
  <option value="ROLLER BLACKOUT">Roller Blackout</option>
  <option value="ROLLER POLIESTER">Roller Poliéster</option>
  <option value="BANDAS VERTICALES COZUMEL">Bandas Verticales Cozumel</option>
  <option value="BANDAS VERTICALES VERDANA">Bandas Verticales Verdana</option>
  {/* Otros tipos de productos */}
</select>
<label htmlFor="clase">Clase:</label>
 
  <select
    name="clase"
    value={clase}
    onChange={(e) => setClase(e.target.value)}
  >
    <option value="">Todos</option>
    <option value="ALMOHADONES">Almohadones</option>
    <option value="MANTAS">Mantas</option>
    <option value="FUNDAS">Fundas</option>
    <option value="PIE DE CAMA">Pie de cama</option>
    <option value="BORLAS">Borlas</option>
    <option value="MOBILIARIO">Mobiliario</option>
    {/* Otros tipos de clases */}
  </select>
        <button onClick={handleFilter}>Filtrar</button>
        <button onClick={handleResetFilters}>Resetear Filtros</button>
      </div>
      <CardsContainerForBalances transactions={transactions} />
    </div>
  );
};

export default TransactionView;
