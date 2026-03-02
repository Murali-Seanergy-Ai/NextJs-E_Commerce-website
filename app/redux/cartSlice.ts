




import { createSlice } from "@reduxjs/toolkit"

interface CartItem {
  id: number
  title: string
  price: number
  quantity: number
}

interface CartState {
  cartItems: CartItem[]
}

const initialState: CartState = {
  cartItems: [],
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existing = state.cartItems.find(
        (item) => item.id === action.payload.id
      )

      if (existing) {
        existing.quantity += 1
      } else {
        state.cartItems.push({ ...action.payload, quantity: 1 })
      }
    },
    removeFromCart: (state, action) => {
      const item = state.cartItems.find(i => i.id === action.payload.id)
      if (item && item.quantity >1 ) {
        item.quantity -= 1
      } else {
        state.cartItems = state.cartItems.filter(i => i.id !== action.payload.id)
      }
    },
    clearCart: (state) => {
      state.cartItems = []
    },
  },
})

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions
export default cartSlice.reducer