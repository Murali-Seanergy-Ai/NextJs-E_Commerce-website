




import { createSlice } from "@reduxjs/toolkit"

interface CartItem {
  id: number
  title: string
  price: number
  quantity: number
}

interface CartState {
  cartItem: CartItem[],
  login: string,
  logOut:string
}

const initialState: CartState = {
  cartItem: [],
  login: "false",
  logOut: "false"
 
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCartItem: (state, action) => {
      const existing = state.cartItem.find(
        (item) => item.id === action.payload.id
      )

      if (existing) {
        existing.quantity += 1
      } else {
        state.cartItem.push({ ...action.payload, quantity: 1 })
      }
    },
    removeFromCart: (state, action) => {
      const item = state.cartItem.find(i => i.id === action.payload.id)
      if (item && item.quantity >1 ) {
        item.quantity -= 1
      } else {
        state.cartItem = state.cartItem.filter(i => i.id !== action.payload.id)
      }
    },
    clearCart: (state) => {
      state.cartItem = []
    },
    isLogin: (state,action) => {
      console.log("Login action payload:", action.payload) // Debug log to check the payload
      state.login = action.payload,
      localStorage.setItem("isLogin", 'true')
    } ,
    logOut: (state) => {
      state.login = "false",
      localStorage.setItem("isLogin", 'false')
    },
  },
})

export const { addToCartItem, removeFromCart, clearCart, isLogin, logOut } = cartSlice.actions
export default cartSlice.reducer