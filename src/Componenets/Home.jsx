import React, { useEffect, useState, useContext } from 'react'
import { BrowserRouter as Router, Route, NavLink, Switch, useRouteMatch, Redirect } from 'react-router-dom'
import Electronics from './ProductCatagory/Electronics'
import Fashion from './ProductCatagory/Fashion'
import Music from './ProductCatagory/Music'
import { Box, makeStyles } from '@material-ui/core'
import { storeContext } from '../Context/store_context'

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

function Home({ children }) {
    const classes = useStyle()
    return (
        <Router>

            <Box display='flex' alignItems="center" p={2} mt={2} mb={5}>
                <NavLink activeClassName={classes.Active} className={classes.atag} to={`/categories/electronics`}>ELECTRONICS</NavLink>
                <NavLink activeClassName={classes.Active} className={classes.atag} to={`/categories/music`}>MUSIC</NavLink>
                <NavLink activeClassName={classes.Active} className={classes.atag} to={`/categories/fashion`}>FASHION</NavLink>
            </Box>
        </Router>
    )
}

export default Home
