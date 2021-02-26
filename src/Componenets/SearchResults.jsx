import { CircularProgress, Box } from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import ProductTile from './ProductTile'
import { search } from '../Api Calls/Api'
import { useLocation } from 'react-router-dom'
import Loder from './Loder'

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function SearchResults() {
    let query = useQuery().get('q');
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {

        setLoading(true)
        search(query).then(
            res => {
                if (res.status === 200) {
                    setProducts(res.data)
                    setLoading(false)
                }
            }
        )
    }, [query])

    return (
        <div>
            <h3>Search Results ...</h3>
            {
                loading ? <Loder />

                    : products.length === 0 ? <h1>Nothing Found..</h1> : products.map((prod) => <ProductTile key={prod.id} product={prod} />)
            }
        </div>
    )
}

export default SearchResults
