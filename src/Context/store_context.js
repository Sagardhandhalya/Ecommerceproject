import { useReducer, createContext, useContext } from 'react'
import { products } from './temp_data'

const initialState = {

    products: {},
    user: localStorage.getItem('user') || null,
    cartProducts: [],
    theme:'dark'
}

const reducer = (state, { action, payload }) => {
    console.log(action);

    switch (action) {

        case 'ADD_TO_CART':
            return { ...state, cartProducts: [...state.cartProducts, payload] }

        case 'UPDATE_PRODUCTS':
            const {key , value} = payload
            const newProducts = state.products;
             newProducts[key] = value;
            return { ...state, products: newProducts}
        
        case 'SIGNIN':
            console.log(payload);
            return {...state , user : payload}

        case 'SIGNOUT':
            return{...state , user:null}

        case 'TOGGLE_THEME':
            if(state.theme === 'dark')
            {
                return {...state , theme : 'light'}
            }

            return {...state , theme : 'dark'}

        default:
            return state;
    }
}

const storeContext = createContext()

const StoreProvider = ({ children }) => {

    const [state, dispatch] = useReducer(reducer, initialState)

    const actions = {
        addToCart: (product, qty) => dispatch({ action: 'ADD_TO_CART', payload: { product, qty } }),
        loadProductsFromServer: (key , value) => dispatch({ action: 'UPDATE_PRODUCTS', payload: {key , value} }),
        signIn : (user) => dispatch({action : 'SIGNIN' , payload:user}),
        signOut : () => dispatch({action : 'SIGNOUT'}),
        toggleTheme :() => dispatch({action : 'TOGGLE_THEME'})
    }

    return (
        <storeContext.Provider value={
            {
                state: state,
                methods: actions
            }
        }>
            {children}
        </storeContext.Provider>
    )

}

const useStore = () => useContext(storeContext)

export { StoreProvider, storeContext , useStore}