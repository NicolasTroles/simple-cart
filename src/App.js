// Modules
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux'

// Components
import Home from './pages/home/home';

// Styles
import './App.css';

const defaultProducts = [{
    name: "Sledgehammer",
    price: 125.75
  },
  {
    name: "Axe",
    price: 190.50
  },
  {
    name: "Bandsaw",
    price: 562.13
  }, {
    name: "Chisel",
    price: 12.9
  },
  {
    name: "Hacksaw",
    price: 18.45
  }
]

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'SET_PRODUCTS', data: defaultProducts });
    const cart = JSON.parse(localStorage.getItem('cart'));

    if (cart && cart.length) {
      dispatch({type: 'SET_CART', data: cart})
    }
  }, [dispatch])

  return (
    <div className="App">
      <Home />
    </div>
  );
}

export default App;
