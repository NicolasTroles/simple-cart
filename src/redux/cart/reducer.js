const initialState = {
    products: []
};

export const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_CART':
            return {
                ...state,
                products: [...action.data]
            };
        
        
        default:
            return state;
    }
};