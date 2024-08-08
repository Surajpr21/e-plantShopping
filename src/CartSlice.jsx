import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartItems: []
  },
  reducers: {
    addItem: (state, action) => {
        const item = { ...action.payload, cost: parseFloat(action.payload.cost) || 0 }; // Ensure cost is a number
        const existingItem = state.cartItems.find(cartItem => cartItem.name === item.name);
        if (existingItem) {
          existingItem.quantity += 1;
        } else {
          state.cartItems.push({ ...item, quantity: 1 });
        }
      },      
    removeItem: (state, action) => {
      state.cartItems = state.cartItems.filter(item => item.name !== action.payload);
    },
    clearCart: (state) => {
      state.cartItems = [];
    },
    incrementItem: (state, action) => {
      const itemName = action.payload;
      const item = state.cartItems.find(i => i.name === itemName);
      if (item) {
        item.quantity += 1;
      }
    },
    decrementItem: (state, action) => {
      const itemName = action.payload;
      const item = state.cartItems.find(i => i.name === itemName);
      if (item) {
        item.quantity = Math.max(item.quantity - 1, 1); // Ensure quantity doesn't go below 1
      }
    }
  }
});

export const { addItem, removeItem, clearCart, incrementItem, decrementItem } = cartSlice.actions;
export default cartSlice.reducer;
