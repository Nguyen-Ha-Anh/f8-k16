import {
  ADD_CART,
  INCRE_QUANTITY,
  DECRE_QUANTITY,
  REMOVE_CART,
  TOGGLE_CART
} from "./cartActions";

const initialState = {
  items: [],
  isOpen: false,
};

export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_CART: {
      // san pham da co chua
      const existItem = state.items.find((item) => item.id === action.payload.id);
      if (existItem) {
        return {
          ...state,
          //neu dung san pham duoc add --> tang quantily
          //san pham khac --> giu nguyen
          items: state.items.map((item) =>
            item.id === existItem.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return {
        ...state,
        //them product moi voi quantity = 1
        items: [...state.items, { ...action.payload, quantity: 1 }],
      };
    }
    case INCRE_QUANTITY:
      return {
        ...state,
        //action.payload bay gio la id --> neu trung id thi tang quantity
        items: state.items.map((item) =>
          item.id === action.payload
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      };
    case DECRE_QUANTITY:
      return {
        ...state,
        // trung thi giam
        items: state.items.map((item) =>
          item.id === action.payload
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        //neu giam ve 0 --> xoa 
        .filter((item) => item.quantity > 0)
      };
    case REMOVE_CART:
        return {
            ...state,
            items: state.items.filter((item) => item.id !== action.payload)
        }
    case TOGGLE_CART:
        return {
            ...state,
            isOpen: !state.isOpen
        }
    default:
      return state;
  }
};

