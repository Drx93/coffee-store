import { useEffect } from 'react';
import { useCart } from '../context/CartContext';
import './CartSidebar.css';

export default function CartSidebar() {
    const { items, isOpen, closeCart, removeItem, updateQty, clearCart, totalPrice } = useCart();

    // Fermer avec Échap
    useEffect(() => {
        const handler = (e) => { if (e.key === 'Escape') closeCart(); };
        document.addEventListener('keydown', handler);
        return () => document.removeEventListener('keydown', handler);
    }, [closeCart]);

    // Bloquer le scroll body quand sidebar ouverte
    useEffect(() => {
        document.body.style.overflow = isOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [isOpen]);

    return (
        <>
            <div className={`cart-overlay ${isOpen ? 'cart-overlay--visible' : ''}`} onClick={closeCart} />
            <aside className={`cart-sidebar ${isOpen ? 'cart-sidebar--open' : ''}`}>
                <div className="cart-sidebar__header">
                    <h2>Votre Panier</h2>
                    <button className="cart-sidebar__close" onClick={closeCart} aria-label="Fermer">✕</button>
                </div>

                {items.length === 0 ? (
                    <div className="cart-sidebar__empty">
                        <span>🛒</span>
                        <p>Votre panier est vide</p>
                    </div>
                ) : (
                    <>
                        <ul className="cart-sidebar__list">
                            {items.map((item) => (
                                <li key={item.id} className="cart-item">
                                    <img src={item.image} alt={item.name} className="cart-item__img" />
                                    <div className="cart-item__info">
                                        <p className="cart-item__name">{item.name}</p>
                                        <p className="cart-item__price">{(item.price * item.quantity).toFixed(2)} €</p>
                                        <div className="cart-item__qty">
                                            <button onClick={() => updateQty(item.id, item.quantity - 1)} disabled={item.quantity <= 1}>−</button>
                                            <span>{item.quantity}</span>
                                            <button onClick={() => updateQty(item.id, item.quantity + 1)}>+</button>
                                        </div>
                                    </div>
                                    <button className="cart-item__remove" onClick={() => removeItem(item.id)} aria-label="Supprimer">
                                        🗑
                                    </button>
                                </li>
                            ))}
                        </ul>

                        <div className="cart-sidebar__footer">
                            <div className="cart-sidebar__total">
                                <span>Total</span>
                                <strong>{totalPrice.toFixed(2)} €</strong>
                            </div>
                            <button className="btn btn-primary cart-sidebar__checkout">
                                Commander
                            </button>
                            <button className="cart-sidebar__clear" onClick={clearCart}>
                                Vider le panier
                            </button>
                        </div>
                    </>
                )}
            </aside>
        </>
    );
}
