// Modules
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'

// Components
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import Button from '../../components/atoms/button/button';
import ModalCart from '../../components/molecules/modalCart/modalCart';

// Styles
import * as Styled from './styled.js'
 
function Home() {
   const dispatch = useDispatch();
   const [showCart, setShowCart] = useState(false);

   const products = useSelector(state => state.productsState.products)
   const cart = useSelector(state => state.cartState.products)

   if (!products.length) {
      return null;
   }

   const handleAddProductToCart = (product) => {
      const newCart = cart;
      const hasProduct = newCart.find(item => item.name === product.name);

      if (hasProduct) {
         hasProduct.quantity++;
         hasProduct.total = (hasProduct.quantity * hasProduct.price).toFixed(2);
      } else {
         newCart.push({
            name: product.name,
            price: product.price,
            quantity: 1,
            total: product.price,
         })
      }
      dispatch({ type: 'SET_CART', data: newCart })
      localStorage.setItem('cart', JSON.stringify(newCart))
   }

   const totalItemsInCart = () =>
      cart.reduce((acc, curr) => acc + curr.quantity, 0);
   

   return (
      <Styled.Wrapper>
         <Button onClick={() => setShowCart(true)}>Show The Cart of My Store ({totalItemsInCart()})</Button>
        <TableContainer>
            <Table aria-label="simple table">
                  <TableHead>
                     <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell align="right">Price</TableCell>
                        <TableCell align="right"></TableCell>
                     </TableRow>
                  </TableHead>
                  <TableBody>
                     {products.map((item, index) => (
                        <TableRow key={index}>
                           <TableCell>{item.name}</TableCell>
                           <TableCell align="right">${item.price}</TableCell>
                           <TableCell align="right">
                              <Button onClick={() => handleAddProductToCart(item)}>Add to Cart</Button>
                           </TableCell>
                        </TableRow>
                     ))}
                  </TableBody>
            </Table>
         </TableContainer>

         <ModalCart showCart={showCart} handleClose={() => setShowCart(false) }/>
       </Styled.Wrapper>
    )
}
 
export default Home