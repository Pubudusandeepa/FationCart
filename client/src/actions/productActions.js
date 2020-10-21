import {FETCH_PRODUCTS, FILTER_PRODUCTS_BY_SIZE, ORDER_PRODUCTS_BY_PRICE} from '../types'
import axios from 'axios'
import Products from '../components/Products'


export const fetchProducts = () => async (dispatch) => {


    const response = await axios.get("http://localhost:5000/api/products")
   
    dispatch({
        type: FETCH_PRODUCTS,
        payload: response.data
    })

}

export const filterProducts = (products, size) => (dispatch) => {
    dispatch({
        type: FILTER_PRODUCTS_BY_SIZE,
        payload: {
            size: size,
            items: size === "ALL" ? products :  products.filter(x => x.availableSizes.indexOf(size) >= 0 )
        } 
    })
}

export const sortProducts = (filterProducts, sort) => (dispatch) =>{
    const sortedProducts = filterProducts.slice();

    if(sort === "latest") {
        sortedProducts.sort((a, b) => (a._id > b._id ? 1:-1))
    } else {
        sortedProducts.sort((a, b) => sort === "lowest" 
        ? a.price > b.price ? 1:-1
        :a.price >b.price ? -1:1
        
        );
    }

    dispatch({
        type: ORDER_PRODUCTS_BY_PRICE,
        payload: {
            sort: sort,
            items: sortedProducts
        }
    })
}
