import React,{useContext} from 'react'
import { storeContext } from './../Context/store_context'
import ProductTile from './ProductTile'
import {useParams} from 'react-router-dom'
import { Box, makeStyles } from '@material-ui/core'
import { BrowserRouter as Router, Route, NavLink, Switch, useRouteMatch, Redirect } from 'react-router-dom'

const useStyle = makeStyles((theme) => (
    {
        atag: {
            color: "black",
            textDecoration: 'none',
            padding: '10px 15px',
            margin: '2px 10px'
        },
        Active: {
            borderBottom: '2px solid #DD364F'
        }
    }

))

function ProductList() {
    const classes = useStyle()
const {category} = useParams()
const  {state} = useContext(storeContext)

    return (
        <div>
              <Box display='flex' alignItems="center" p={2} mt={2} mb={5}>
                <NavLink activeClassName={classes.Active} className={classes.atag} to={`/categories/electronics`}>ELECTRONICS</NavLink>
                <NavLink activeClassName={classes.Active} className={classes.atag} to={`/categories/music`}>MUSIC</NavLink>
                <NavLink activeClassName={classes.Active} className={classes.atag} to={`/categories/fashion`}>FASHION</NavLink>
            </Box> 

                { state.products.length ?  state.products.filter((prod) => prod.category === category).map( (product) => < ProductTile key={product.id} product={product} /> ) 
                : <Redirect to="/" />  }      
        </div>
    ) 
}

export default ProductList
