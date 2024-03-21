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

  const handleQuantityChange = (productId, newQuantity) => {
    const updatedCart = cart.map(item => {
      if (item.id === productId) {
        return { ...item, cantidad: newQuantity };
      }
      return item;
    });
    setCart(updatedCart);
  };

  const handleSellerChange = (productId, newSeller) => {
    const updatedCart = cart.map(item => {
      if (item.id === productId) {
        return { ...item, vendedor: newSeller };
      }
      return item;
    });
    setCart(updatedCart);
  };

  const handleCommentChange = (productId, newComment) => {
    const updatedCart = cart.map(item => {
      if (item.id === productId) {
        return { ...item, comentario: newComment };
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
      cantidad: product.cantidad,
      costo: product.editedCost || product.costo,
      vendedor: product.vendedor || '',
      comentario: product.comentario || ''
    };

    dispatch(sellProduct(saleData));
  };

  const handleFinalizeAllPurchases = () => {
    cart.forEach(product => handlePurchase(product.id));
    setCart([]); // Vaciar el carrito después de finalizar todas las compras
    localStorage.removeItem('cart');
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

              <input
                type="number"
                placeholder="Cantidad"
                value={product.cantidad}
                onChange={(e) => handleQuantityChange(product.id, parseInt(e.target.value))}
              />

              <input
                type="text"
                placeholder="Vendedor"
                value={product.vendedor || ''}
                onChange={(e) => handleSellerChange(product.id, e.target.value)}
              />

              <input
                type="text"
                placeholder="Comentario"
                value={product.comentario || ''}
                onChange={(e) => handleCommentChange(product.id, e.target.value)}
              />

              <button onClick={() => removeFromCart(product.id)}>Eliminar</button>
              {/* <button onClick={() => handlePurchase(product.id)}>Finalizar Compra</button> */}
            </div>
          ))}
        </div>
      )}
       <button onClick={handleFinalizeAllPurchases}>Finalizar Todas las Compras</button>
    </div>
    
  );
};

export default CartView;
