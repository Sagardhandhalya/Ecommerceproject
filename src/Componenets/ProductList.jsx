import React, { useContext, useEffect, useState } from 'react'
import { storeContext } from './../Context/store_context'
import ProductTile from './ProductTile'
import { useParams } from 'react-router-dom'
import { Box, makeStyles, Typography } from '@material-ui/core'
import { BrowserRouter as Router, Route, NavLink, Switch, useRouteMatch, Redirect } from 'react-router-dom'
import { fetchProductsForADepartment } from './../Api Calls/Api'
import Loder from './Loder'
const useStyle = makeStyles((theme) => (
    {
        atag: {
            color: theme.palette.text.primary,
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
    const { category } = useParams()
    const { state, methods } = useContext(storeContext)

    useEffect(() => {
        if (state.products[category] === undefined) {
            fetchProductsForADepartment(category).then(res => {
                methods.loadProductsFromServer(category, res)
            })
        }
        else {
            console.log('product already in store..');

        }
    }, [category]
    )

    return (
        <div>
            <Box display='flex' alignItems="center" p={2} mt={2} mb={5}>

                <NavLink activeClassName={classes.Active} className={classes.atag} to={`/categories/electronics`}>  <Typography color="inherit">ELECTRONICS</Typography></NavLink>
                <NavLink activeClassName={classes.Active} className={classes.atag} to={`/categories/music`}>MUSIC</NavLink>
                <NavLink activeClassName={classes.Active} className={classes.atag} to={`/categories/fashion`}>FASHION</NavLink>
            </Box>

            { state.products[category] ? state.products[category].map((product) => < ProductTile key={product.id} product={product} />)
                : <Loder />}
        </div>
    )
}

export default ProductList
