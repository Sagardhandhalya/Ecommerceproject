import React, { useContext , useState , useEffect} from 'react'
import { storeContext } from '../Context/store_context'
import { Button, IconButton } from '@material-ui/core'
import { Typography, Box } from '@material-ui/core'
import { Link } from 'react-router-dom'
import DeleteIcon from '@material-ui/icons/Delete';

function Cart() {
    const { state } = useContext(storeContext)
    console.log(state.cartProducts);
    const [total, setTotal] = useState(0)
    useEffect(() => {
        let temp =0;
        for(let p of state.cartProducts){
            temp  += p.product.price*p.qty
        }
        setTotal(temp)
    }, [])
    return (
        <div>

           { state.cartProducts.length ? 
             state.cartProducts.map(({ product, qty } , idx) => <Box display="flex" key={idx} justifyContent="space-between" alignItems="flex-start" pb={2} mt={2} flexWrap="wrap" borderBottom="1px solid gray">
                <Box display="flex" justifyContent="center">
                    <img src={product.thumbnail} alt={product.name} width="120px" height="120px" />
                    <Box display="flex" ml={5} flexDirection="column" textAlign="left">
                        <Link to={`/pd/${product.id}`} style={{ textDecoration: 'none' }}>
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
                <Box display="flex" flexDirection="column" alignItems="flex-start" justifyContent="flex-start">
                    <Typography variant="body1">
                        ${product.price} x {qty} = ${product.price * qty}
                    </Typography>

                    {/* <IconButton color="secondary">
                        <DeleteIcon />
                    </IconButton> */}
                </Box>

            </Box>
            )
    : <h1>Cart is Empty...</h1>
           }
        <Box mt={5} display="flex" alignItems="center" justifyContent="space-between">
          <span>Grand Total :<b> ${total}</b></span> 
        <Link to="/checkout" style={{textDecoration:'none'}} >
                <Button variant="contained" color="primary">
                    Checkout
                </Button>
            </Link>
        </Box>
           
        </div>
    )
}

export default Cart
