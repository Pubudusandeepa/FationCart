import axios from 'axios'
import {CREATE_ORDER, CLEAR_CART, CLEAR_ORDER} from '../types'

export const createOrder = (order) => async (dispatch) => {
    console.log(order)
  
    const config = {
        headers: {
            "Content-Type": "application/json"
        },
    }

    const body = {
        order:  order
    }

    try {
  

     const response =  await axios.post('http://localhost:5000/api/orders/Placeorder',body, config)
       
     console.log(response)
     if(response){
        dispatch({
          type: CREATE_ORDER,
          payload: response.data
        })
        localStorage.clear("cartItems")
         dispatch({
         type: CLEAR_CART
        })

     }
    

    } catch (error) {
        console.log(error)
    }


   
    
}

export const clearOrder = () => (dispatch) => {
    dispatch({type: CLEAR_ORDER})
}