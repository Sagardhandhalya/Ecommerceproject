import { Search } from '@material-ui/icons'
import React,{useState , useEffect} from 'react'
import ProductTile from './ProductTile'
import {search} from '../Api Calls/Api'
function SearchResults() {

    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        
    search("men").then(
            res => {
                if(res.status === 200)
                {
                    setProducts(res.data)
                    setLoading(false)
                }
            }
        )
    }, [])

    return (
        <div>
            {
                loading ? <h1>Lodding ...</h1>
                : products.map((prod) => <ProductTile key={prod.id} product={prod}/>)
            }
        </div>
    )
}

export default SearchResults
