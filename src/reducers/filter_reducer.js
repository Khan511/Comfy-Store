import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from "../actions";

const filter_reducer = (state, action) => {
  switch (action.type) {
    case LOAD_PRODUCTS:
      let maxPrice = action.payload.map((p) => p.price);
      maxPrice = Math.max(...maxPrice);
      return {
        ...state,
        filtered_products: action.payload,
        all_products: action.payload,
        filters: { ...state.filters, max_price: maxPrice, price: maxPrice },
      };

    case SET_LISTVIEW:
      return { ...state, grid_view: false };

    case SET_GRIDVIEW:
      return { ...state, grid_view: true };

    case UPDATE_SORT:
      return { ...state, sort: action.payload };

    case SORT_PRODUCTS:
      const { filtered_products } = state;
      let tempSort = [...filtered_products];

      if (state.sort === "price-lowest") {
        tempSort = tempSort.sort((a, b) => a.price - b.price);
      }
      if (state.sort === "price-highest") {
        tempSort = tempSort.sort((a, b) => b.price - a.price);
      }
      if (state.sort === "name-a") {
        tempSort = tempSort.sort((a, b) => a.name.localeCompare(b.name));
      }
      if (state.sort === "name-z") {
        tempSort = tempSort.sort((a, b) => b.name.localeCompare(a.name));
      }
      return { ...state, filtered_products: tempSort };

    case UPDATE_FILTERS:
      const { name, value } = action.payload;

      return {
        ...state,
        filters: { ...state.filters, [name]: value },
      };

    case FILTER_PRODUCTS:
      const { all_products } = state;
      const { text, category, company, color, shipping, price } = state.filters;

      let tempPrducts = [...all_products];

      // text
      if (text) {
        tempPrducts = tempPrducts.filter((product) => {
          return product.name.toLowerCase().startsWith(text);
        });
      }

      // category
      if (category !== "all") {
        tempPrducts = tempPrducts.filter((product) => {
          return product.category === category;
        });
      }
      // company
      if (company !== "all") {
        tempPrducts = tempPrducts.filter((product) => {
          return product.company === company;
        });
      }
      // color
      if (color !== "all") {
        tempPrducts = tempPrducts.filter((product) => {
          return product.colors.find((col) => col === color);
        });
      }
      // price
      if (price) {
        tempPrducts = tempPrducts.filter((product) => {
          return product.price < price;
        });
      }
      // shipping
      if (shipping) {
        tempPrducts = tempPrducts.filter((product) => {
          return product.shipping === true;
        });
      }
      return { ...state, filtered_products: tempPrducts };

    case CLEAR_FILTERS:
      return {
        ...state,
        filters: {
          ...state.filters,
          text: "",
          company: "all",
          category: "all",
          color: "all",
          price: state.filters.max_price,
          shipping: false,
        },
      };
  }

  throw new Error(`No Matching "${action.type}" - action type`);
};

export default filter_reducer;
