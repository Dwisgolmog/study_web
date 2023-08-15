import { createSlice } from "@reduxjs/toolkit";

let cart = createSlice({
    name: 'cart',
    initialState : [
        {id : 0, name : 'White and Black', count : 2},
        {id : 2, name : 'Grey Yordan', count : 1},
      ],
    reducers:{
        upCount(state,action){
            let product = state.find(item=>item.id==action.payload)
            product.count += 1;
        },
        inCart(state,action){
            
            if(state.find(item=>item.id==action.payload.id)){
                let product = state.find(item=>item.id==action.payload.id)
                product.count += 1;
            }else{
                state.push({id:action.payload.id,name:action.payload.title,count:1});
            }
            
        }
    } 
})

export let {upCount,inCart} = cart.actions

export default cart