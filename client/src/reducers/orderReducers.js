import {CREATE_ORDER, CLEAR_ORDER} from '../types'

export const orderReducer = (state=[], action) => {
    switch(action.type){
        case CREATE_ORDER:
            return {order: [...state, action.payload]}
        case CLEAR_ORDER:
            return {order: null} 
        default:
            return state;       
    }
}

