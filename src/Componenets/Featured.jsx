import React, { useEffect, useState, useContext } from 'react'
import { storeContext } from '../Context/store_context'
import ProductTile from './ProductTile'
import { featuredProducts } from './../Api Calls/Api'
import Loder from './Loder'


function Featured() {

    const { state, methods } = useContext(storeContext)

    useEffect(() => {
        if (state.products.featured === undefined) {
            featuredProducts().then((res) => {
                console.log(res)
                methods.loadProductsFromServer('featured', res)
            })
        }
        else {
            console.log('product already exits in store..');
        }
    }, [])

    return (
        <div>
            <h3 style={{ marginBottom: "50px" }}>Featured Products </h3>
            { state.products.featured ? state.products.featured.map((product) => < ProductTile key={product.id} from_featured={true} product={product} />) : <Loder />}
        </div>
    )

}

export default Featured
