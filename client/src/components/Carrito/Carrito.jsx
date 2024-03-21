import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { sellProduct } from '../../redux/actions';

const CartView = () => {
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || []);
  const dispatch = useDispatch();

  const removeFromCart = (productId) => {
    const updatedCart = cart.filter(item => item.id !== productId);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const handleCostChange = (productId, newCost) => {
    const updatedCart = cart.map(item => {
      if (item.id === productId) {
        const editedCost = parseFloat(newCost) || item.costo;
        return { ...item, editedCost };
      }
      return item;
    });
    setCart(updatedCart);
  };

  const handlePurchase = (productId) => {
    const product = cart.find(item => item.id === productId);
    if (!product) {
      console.error('Producto no encontrado en el carrito');
      return;
    }

    const saleData = {
      productId: product.id,
      userId: 1, // Aquí debes obtener el ID del usuario de alguna manera
      cantidad: 1, // Por ahora, supongamos que siempre se compra solo una unidad de cada producto
      costo: product.editedCost || product.costo,
      vendedor: product.vendedor || '',
      comentario: product.comentario || ''
    };

    dispatch(sellProduct(saleData));
  };

  return (
    <div>
      <h2>Carrito de Compras</h2>
      {cart.length === 0 ? (
        <p>El carrito está vacío</p>
      ) : (
        <div>
          {cart.map(product => (
            <div key={product.id}>
              <img src={product.image} alt="" />
              <p>{product.nombreProducto} - ${product.editedCost || product.costo}</p>
              
              
              <input
                type="number"
                placeholder="Descuento (%)"
                onChange={(e) => handleCostChange(product.id, product.costo * (1 - parseFloat(e.target.value) / 100))}
              />

              <button onClick={() => removeFromCart(product.id)}>Eliminar</button>
              <button onClick={() => handlePurchase(product.id)}>Finalizar Compra</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CartView;
