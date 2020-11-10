// Modules
import React from 'react';
 
// Components
import ButtonUi from '@material-ui/core/Button';

function Button(props) {
    const { children, onClick, color } = props;

    return (
        <ButtonUi variant="contained" onClick={onClick} color={color || 'primary'}>
            {children}
        </ButtonUi>
    )
}
 
export default Button