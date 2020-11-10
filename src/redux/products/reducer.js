const initialState = {
    products: []
};

export const productsReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_PRODUCTS':
            return {
                ...state,
                products: [...state.products, ...action.data]
            };
        
        default:
            return state;
    }
};