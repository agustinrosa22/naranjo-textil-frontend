import React, { useState, useEffect } from 'react';

const CartView = () => {
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || []);

  // Función para eliminar un producto del carrito
  const removeFromCart = (productId) => {
    const updatedCart = cart.filter(item => item.id !== productId);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  // Función para manejar cambios en el costo o descuento
  const handleCostChange = (productId, newCost) => {
    const updatedCart = cart.map(item => {
      if (item.id === productId) {
        // Calcular el nuevo costo editado con el descuento aplicado
        const editedCost = parseFloat(newCost) || item.costo;
        return { ...item, editedCost };
      }
      return item;
    });
    setCart(updatedCart);
  };

  // Función para limpiar el carrito
  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('cart');
  };

  // Efecto para guardar el carrito en el almacenamiento local
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

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
            </div>
          ))}
          <button onClick={clearCart}>Limpiar Carrito</button>
          <button>Finalizar Compra</button>
        </div>
      )}
    </div>
  );
};

export default CartView;
