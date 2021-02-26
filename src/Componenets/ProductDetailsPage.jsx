import React, { useContext, useState } from 'react'
import { Redirect, useParams } from 'react-router-dom'
import { storeContext } from '../Context/store_context'
import { Box, IconButton, makeStyles, Typography } from '@material-ui/core';
import { FormControl, InputLabel, MenuItem, Select, Snackbar } from '@material-ui/core'
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import MuiAlert from '@material-ui/lab/Alert';

const useStyle = makeStyles((theme) => (
  {
    btnclr: {
      color: theme.palette.text.primary
    }
  }
))

function ProductDetailsPage() {
  const { category, id } = useParams();
  const { state, methods } = useContext(storeContext)
  const [open, setOpen] = React.useState(false);
  const classes = useStyle()
  const handleClick = () => {
    setOpen(true);
  };

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  const [qty, setQty] = useState(1)

  const product = state.products[category].filter((prod) => prod.id == id)[0]

  const addToCart = () => {
    methods.addToCart(product, qty)
    setOpen(true)
  }

  return (
    product ? <Box display="flex" alignItems="flex-start" justifyContent="space-between" flexWrap="wrap" pb={2} mt={10} >
      <Box display="flex" >
        <img src={product.thumbnail} alt={product.product_name} width="120px" height="120px" />
        <Box display="flex" ml={5} flexDirection="column" textAlign="left">
          <Typography variant="h6" >
            {product.name}
          </Typography>

          <Typography variant="body1">
            {product.producer}
          </Typography>

          <Typography variant="body2">
            ${product.price}
          </Typography>

        </Box>
      </Box>

      <span> <b>Description :</b> <br /> {product.description}</span>
      <Box display="flex" justifyContent="center" alignItems="center" >
        <FormControl>
          <InputLabel id="demo-simple-select-label">Qty</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={qty}
            onChange={(e) => setQty(e.target.value)}
          >
            <MenuItem selected value={1}>1</MenuItem>
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={3}>3</MenuItem>
            <MenuItem value={4}>4</MenuItem>
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={6}>6</MenuItem>

          </Select>
        </FormControl>

        <IconButton className={classes.btnclr} style={{ marginLeft: '20px' }} onClick={addToCart}>
          <AddShoppingCartIcon />
        </IconButton>

        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success">
            Added {qty} {product.name} to Your Cart
        </Alert>
        </Snackbar>

      </Box>


    </Box>

      : <Redirect to="/" />
  )
}

export default ProductDetailsPage
