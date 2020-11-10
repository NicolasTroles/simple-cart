// Modules
import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
 
// Components 
import ModalUi from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import Button from '../../atoms/button/button';

// Styles
import { makeStyles } from '@material-ui/core/styles';
import * as Styled from './styled.js';

const useStyles = makeStyles((theme) => ({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));

function Modal(props) {
    const { showCart, handleClose } = props;
    const classes = useStyles();
    const dispatch = useDispatch();

    const cart = useSelector(state => state.cartState.products);

    const handleDeleteProductFromCart = (product) => {
        let newCart = cart;
        newCart = newCart.filter(item => item.name !== product.name);

        dispatch({ type: 'SET_CART', data: newCart })
        localStorage.setItem('cart', JSON.stringify(newCart))
    }

    
   const totalPrice = () => 
        cart.reduce((acc, curr) => +acc + +curr.total, 0)

    return (
        <ModalUi
            aria-labelledby="spring-modal-title"
            aria-describedby="spring-modal-description"
            className={classes.modal}
            open={showCart}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <div className={classes.paper}>
                {cart.length ?
                    <TableContainer>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Price</TableCell>
                                    <TableCell>Quantity</TableCell>
                                    <TableCell>Total</TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {cart.map((item, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{item.name}</TableCell>
                                        <TableCell>{item.price}</TableCell>
                                        <TableCell>{item.quantity}</TableCell>
                                        <TableCell>${item.total}</TableCell>
                                        <TableCell>
                                            <Button color='secondary' onClick={() => handleDeleteProductFromCart(item)}>Remove From Cart</Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        <Styled.FooterWrapper>
                            <div>
                                Total: ${totalPrice()}
                            </div>
                            <div>
                                <Button>Buy</Button>
                                <Button color='secondary' onClick={handleClose}>Close Modal</Button>
                            </div>
                        </Styled.FooterWrapper>
                    </TableContainer>
                    :
                    'There is no products in the cart'
                }
            </div>
      </ModalUi>
    )
}
 
export default Modal