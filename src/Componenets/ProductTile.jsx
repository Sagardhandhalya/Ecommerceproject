import { Box, Typography, makeStyles } from '@material-ui/core';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
// theme.palette.text.primary
const useStyle = makeStyles((theme) => {
    console.log(theme);
    return {
        atag: {
            color: "#7089f5",
            textDecoration: 'none',
            fontSize: '1.3rem',
            fontWeight: '600'
        },
        Active: {
            borderBottom: '2px solid #DD364F'
        },
        price: {
            marginTop: '30px'
        }
    }

})

function ProductTile({ product, from_featured }) {
    const classes = useStyle()
    return (
        <Box display="flex" alignItems="flex-start" pb={2} mt={2} flexWrap="wrap" borderBottom="1px solid gray">
            <img src={product.thumbnail} alt={product.name} width="120px" height="120px" />
            <Box display="flex" ml={5} flexDirection="column" textAlign="left">

                <Link to={from_featured ? `/pd/featured/${product.id}` : `/pd/${product.category}/${product.id}`} className={classes.atag}>
                    {product.name}
                </Link>

                <Typography variant="body1" >
                    by {product.producer}
                </Typography>


                <Typography variant="body2" className={classes.price}>
                    ${product.price}
                </Typography>
            </Box>
        </Box>
    )
}

export default ProductTile
