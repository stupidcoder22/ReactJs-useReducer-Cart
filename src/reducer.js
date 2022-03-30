const reducer = (state, action) => {
  if (action.type === "CLEAR_CART") {
    return { ...state, cart: [] };
  }
  if (action.type === "REMOVE") {
    const newdata = state.cart.filter((data) => data.id !== action.payload);
    return { ...state, cart: newdata };
  }

  if (action.type === "INCREASE") {
    let newcart = state.cart.map((itemcart) => {
      if (itemcart.id === action.payload) {
        return { ...itemcart, amount: itemcart.amount + 1 };
      }
      return itemcart;
    });
    return { ...state, cart: newcart };
  }

  if (action.type === "DECREASE") {
    let newcart = state.cart
      .map((itemcart) => {
        if (itemcart.id === action.payload) {
          return { ...itemcart, amount: itemcart.amount - 1 };
        }
        return itemcart;
      })
      .filter((cart) => cart.amount != 0);
    return { ...state, cart: newcart };
  }

  if (action.type === "GET_TOTAL") {
    const { total, amount } = state.cart.reduce(
      (carttotal, cartitem) => {
        const { price, amount } = cartitem;
        carttotal.amount = carttotal.amount + amount;
        const itemtotal = price * amount;
        carttotal.total = carttotal.total + itemtotal;
        return carttotal;
      },
      {
        total: 0,
        amount: 0,
      }
    );
    return { ...state, total, amount };
  }

  return state;
};

export default reducer;
