import React,{useEffect, useState,useContext} from 'react'
import { storeContext } from '../Context/store_context'
import ProductTile from './ProductTile'
import { fetchProducts } from './../Api Calls/Api'


function Featured() {
        
    const {state , methods} =  useContext(storeContext)

        console.log(methods , state);
             const [loading, setLoading] = useState(true)

             useEffect(() => {
                 
             fetchProducts().then((res) => {
                 console.log(res)
                 methods.loadProductsFromServer(res)
             })
             }, [])

    return (
        <div>
            <h3 style={{marginBottom:"50px"}}>Featured Products </h3>
                { state.products.filter((prod) => prod.is_featured ).map( (product) => < ProductTile key={product.id} product={product} /> ) }      
        </div>
    )
      
}

export default Featured
