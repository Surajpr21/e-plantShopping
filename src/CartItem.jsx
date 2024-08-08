import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem, clearCart } from './CartSlice';
import './CartItem.css';

function CartItem({ onContinueShopping }) {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.cartItems);

  const handleRemove = (name) => {
    dispatch(removeItem(name));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  // Calculate total cost
  const totalCost = cartItems.reduce((total, item) => {
    const cost = typeof item.cost === 'number' ? item.cost : parseFloat(item.cost) || 0; 
    const quantity = item.quantity || 0;
    return total + cost * quantity;
  }, 0);

  return (
    <div className="cart-container">
      <div className="cart-header">
        <button className="cart-item-delete" onClick={handleClearCart}>Clear Cart</button>
        <div className="total-cost">Total: ${totalCost.toFixed(2)}</div>
        <button className="continue_shopping_btn" onClick={onContinueShopping}>Continue Shopping</button>
      </div>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul className="cart-items-list">
          {cartItems.map(item => (
            <li key={item.name} className="cart-item">
              <img src={item.image} alt={item.name} className="cart-item-image" />
              <div className="cart-item-details">
                <h3 className="cart-item-name">{item.name}</h3>
                <p className="cart-item-cost">${(typeof item.cost === 'number' ? item.cost : parseFloat(item.cost) || 0).toFixed(2)}</p>
                <div className="cart-item-quantity">
                  <span className="cart-item-quantity-value">Quantity: {item.quantity}</span>
                  <button className="cart-item-button" onClick={() => handleRemove(item.name)}>Remove</button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CartItem;