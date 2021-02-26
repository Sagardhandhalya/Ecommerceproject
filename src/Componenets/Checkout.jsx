import React, { useContext, useState, useEffect } from 'react'
import { storeContext } from '../Context/store_context'
import { Redirect } from 'react-router-dom'
import MuiAlert from '@material-ui/lab/Alert';
import { Snackbar, Button } from '@material-ui/core'

function Checkout() {
  const { state } = useContext(storeContext)
  const [open, setOpen] = React.useState(false);
  const [total, setTotal] = useState(0)
  const handleClick = () => {
    setOpen(true);
  };

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  const placeOrder = () => {
    setOpen(true)
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  useEffect(() => {
    let temp = 0;
    for (let p of state.cartProducts) {
      temp += p.product.price * p.qty
    }
    setTotal(temp)
  }, [])
  return (
    <div>
      { (state.user) ? <>

        <h3> Your Total : ${total} </h3>
        <Button variant="contained" color="primary" onClick={placeOrder}>
          Place Order
                </Button>
        <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success">
            Order Places SuccessFully !!:)
        </Alert>
        </Snackbar>
      </>

        : <Redirect to="/signin" />}

    </div>
  )
}

export default Checkout
