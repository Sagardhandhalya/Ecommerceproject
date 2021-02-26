import './App.css';
import Header from './Componenets/Header'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import Checkout from './Componenets/Checkout';
import Cart from './Componenets/Cart';
import Featured from './Componenets/Featured';
import SignIn from './Componenets/AuthComponents/SignIn'
import SignUp from './Componenets/AuthComponents/SignUp'
import ProductDetailsPage from './Componenets/ProductDetailsPage';
import { storeContext } from './Context/store_context';
import { useContext } from 'react'
import ProductList from './Componenets/ProductList'
import SearchResults from './Componenets/SearchResults';
import { createMuiTheme, Paper, ThemeProvider } from '@material-ui/core';
function App() {
  const { state } = useContext(storeContext)
  

   const theme = createMuiTheme({
     palette:{
       type:state.theme
     }
   })
  return (
    <ThemeProvider theme={theme}>
    <Paper style={{minHeight:'100vh'}} >
    <Router>
      <div className="App">
        <Header />
        <Switch>
          <Route exact path="/">
            <Featured />
          </Route>

        <Route path="/categories/:category">
           <ProductList/>
        </Route>

        <Route path="/categories">
          <Redirect to="/categories/music"/>
        </Route>

          <Route path="/checkout">
            <Checkout />
          </Route>

          <Route path="/cart">
            <Cart />
          </Route>

          <Route path="/signin">
            <SignIn />
          </Route>

          <Route path="/signup">
            <SignUp />
          </Route>

          <Route path="/pd/:category/:id">
            <ProductDetailsPage />
          </Route>
          
          <Route path="/search">
            <SearchResults/>
          </Route>

        </Switch>
      </div>
    </Router>
    </Paper>
    </ThemeProvider>
  );
}

export default App;
