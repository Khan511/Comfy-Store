import { act } from "react-dom/test-utils";
import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from "../actions";

const cart_reducer = (state, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const { id, color, amount, product } = action.payload;

      const tempItem = state.cart.find((item) => item.id === id + color);

      if (tempItem) {
        const tempCart = state.cart.map((cartItem) => {
          if (cartItem.id === id + color) {
            let newAmount = cartItem.amount + amount;
            if (newAmount > cartItem.stockSize) {
              newAmount = cartItem.stockSize;
            }
            return { ...cartItem, amount: newAmount };
          } else {
            return { ...cartItem };
          }
        });
        return { ...state, cart: tempCart };
      } else if (!tempItem) {
        const newItem = {
          id: id + color,
          name: product.name,
          color,
          amount,
          image: product.images[0].url,
          price: product.price,
          stockSize: product.stock,
        };

        return { ...state, cart: [...state.cart, newItem] };
      }
    case REMOVE_CART_ITEM:
      const updateItem = state.cart.filter(
        (item) => item.id !== action.payload
      );

      return { ...state, cart: updateItem };

    case CLEAR_CART:
      return { ...state, cart: [] };

    case TOGGLE_CART_ITEM_AMOUNT:
      const { value } = action.payload;

      const tempCart = state.cart.map((item) => {
        if (item.id === action.payload.id) {
          if (value === "inc") {
            let newAmount = item.amount + 1;
            if (newAmount > item.stockSize) {
              newAmount = item.stockSize;
            }
            return { ...item, amount: newAmount };
          }
          if (value === "dec") {
            let newAmount = item.amount - 1;
            if (newAmount < 1) {
              newAmount = 1;
            }
            return { ...item, amount: newAmount };
          }
        } else {
          return item;
        }
      });

      return { ...state, cart: tempCart };

    case COUNT_CART_TOTALS:
      const { total_items, total_amount } = state.cart.reduce(
        (total, currentItem) => {
          const { price, amount } = currentItem;

          total.total_amount += price * amount;
          total.total_items = state.cart.length;

          return total;
        },
        {
          total_items: 0,
          total_amount: 0,
        }
      );

      return {
        ...state,
        total_amount,
        total_items,
      };
  }

  throw new Error(`No Matching "${action.type}" - action type`);
};

export default cart_reducer;
