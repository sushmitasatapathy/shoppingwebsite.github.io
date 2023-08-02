import React, { useState } from 'react';

const Cart = ({ cartItems, setCartItems }) => {
  const [selectedItem, setSelectedItem] = useState(null);

  const removeItemFromCart = (itemId) => {
    setCartItems((prevCartItems) =>
      prevCartItems.filter((item) => item.id !== itemId)
    );

    if (selectedItem && selectedItem.id === itemId) {
      setSelectedItem(null);
    }
  };

  const handleFakeCheckout = () => {
    setCartItems([]);
    setSelectedItem(null);
    alert('Checkout successful! Thank you for shopping!');
  };

  // Function to calculate the total price of items in the cart
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price, 0).toFixed(2);
  };

  return (
    <div>
      
      <h2>Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <ul>
            {cartItems.map((item) => (
              <li key={item.id} onClick={() => setSelectedItem(item)}>
                <div>
                  <img src={item.image} alt={item.title} style={{ width: '50px' }} />
                  {item.title} - ${item.price}
                </div>
                <button onClick={() => removeItemFromCart(item.id)}>Remove</button>
              </li>
            ))}
          </ul>
          <p>Total: ${calculateTotal()}</p>
          <button onClick={handleFakeCheckout}>Fake Checkout</button>
        </div>
      )}
    </div>
  );
};

export default Cart;
