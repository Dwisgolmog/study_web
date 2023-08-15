import { configureStore,createSlice } from '@reduxjs/toolkit'
import cart from './store/cart'

export default configureStore({
  reducer: {
     cart: cart.reducer,
   }
}) 