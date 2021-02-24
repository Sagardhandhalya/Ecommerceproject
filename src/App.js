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
function App() {
  const { state } = useContext(storeContext)
  return (
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

          <Route exact path="/signin">
            <SignIn />
          </Route>

          <Route exact path="/signup">
            <SignUp />
          </Route>

          <Route exact path="/pd/:id">
            <ProductDetailsPage />
          </Route>
          
          <Route exact path="/search">
            <SearchResults/>
          </Route>

        </Switch>

      </div>


    </Router>
  );
}

export default App;
