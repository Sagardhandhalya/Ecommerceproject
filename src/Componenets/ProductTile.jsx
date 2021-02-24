import { Box, Typography } from '@material-ui/core';
import React from 'react'
import { Link } from 'react-router-dom';

function ProductTile({product}) {
    
    
    return (
        <Box display="flex"   alignItems="flex-start" pb={2} mt={2} flexWrap="wrap" borderBottom="1px solid gray">
                <img src={product.thumbnail} alt={product.name} width="120px" height="120px" />
                <Box display="flex"  ml={5} flexDirection="column" textAlign="left">
                   <Link to={`/pd/${product.id}`} style={{textDecoration:'none'}}>
                    <Typography variant="h6" >
                        {product.name}
                    </Typography>
                    </Link>

                    <Typography variant="body1">
                        {product.producer}
                    </Typography>

                    <Typography variant="body2">
                        ${product.price}
                    </Typography>
                   
                </Box>
                
        </Box>
    )
}

export default ProductTile
