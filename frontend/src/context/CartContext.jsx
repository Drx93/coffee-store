import { createContext, useContext, useReducer, useCallback } from 'react';

const CartContext = createContext(null);

const initialState = { items: [], isOpen: false };

function cartReducer(state, action) {
    switch (action.type) {
        case 'ADD': {
            const existing = state.items.find((i) => i.id === action.product.id);
            return {
                ...state,
                items: existing
                    ? state.items.map((i) =>
                        i.id === action.product.id
                            ? { ...i, quantity: i.quantity + (action.qty || 1) }
                            : i
                    )
                    : [...state.items, { ...action.product, quantity: action.qty || 1 }],
            };
        }
        case 'REMOVE':
            return { ...state, items: state.items.filter((i) => i.id !== action.id) };
        case 'UPDATE_QTY':
            return {
                ...state,
                items: state.items.map((i) =>
                    i.id === action.id ? { ...i, quantity: Math.max(1, action.qty) } : i
                ),
            };
        case 'CLEAR':
            return { ...state, items: [] };
        case 'TOGGLE_SIDEBAR':
            return { ...state, isOpen: !state.isOpen };
        case 'OPEN_SIDEBAR':
            return { ...state, isOpen: true };
        case 'CLOSE_SIDEBAR':
            return { ...state, isOpen: false };
        default:
            return state;
    }
}

export function CartProvider({ children }) {
    const [state, dispatch] = useReducer(cartReducer, initialState);

    const addToCart = useCallback((product, qty = 1) => dispatch({ type: 'ADD', product, qty }), []);
    const removeItem = useCallback((id) => dispatch({ type: 'REMOVE', id }), []);
    const updateQty = useCallback((id, qty) => dispatch({ type: 'UPDATE_QTY', id, qty }), []);
    const clearCart = useCallback(() => dispatch({ type: 'CLEAR' }), []);
    const toggleCart = useCallback(() => dispatch({ type: 'TOGGLE_SIDEBAR' }), []);
    const openCart = useCallback(() => dispatch({ type: 'OPEN_SIDEBAR' }), []);
    const closeCart = useCallback(() => dispatch({ type: 'CLOSE_SIDEBAR' }), []);

    const totalItems = state.items.reduce((s, i) => s + i.quantity, 0);
    const totalPrice = state.items.reduce((s, i) => s + i.price * i.quantity, 0);

    return (
        <CartContext.Provider
            value={{ ...state, addToCart, removeItem, updateQty, clearCart, toggleCart, openCart, closeCart, totalItems, totalPrice }}
        >
            {children}
        </CartContext.Provider>
    );
}

export const useCart = () => {
    const ctx = useContext(CartContext);
    if (!ctx) throw new Error('useCart must be used within CartProvider');
    return ctx;
};
