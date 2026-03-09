import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Cart.css';

export default function Cart() {
    const { items, removeItem, updateQty, clearCart, totalPrice } = useCart();

    return (
        <main className="page-enter">
            <div className="container cart-page">
                <h1 className="section-title">Mon Panier</h1>

                {items.length === 0 ? (
                    <div className="cart-page__empty">
                        <span>🛒</span>
                        <p>Votre panier est vide</p>
                        <Link to="/" className="btn btn-primary">Continuer mes achats</Link>
                    </div>
                ) : (
                    <div className="cart-page__layout">
                        <ul className="cart-page__list">
                            {items.map((item) => (
                                <li key={item.id} className="cart-page__item">
                                    <img src={item.image} alt={item.name} />
                                    <div className="cart-page__item-info">
                                        <h3>{item.name}</h3>
                                        <p>{item.price.toFixed(2)} € / unité</p>
                                        <div className="cart-page__qty">
                                            <button onClick={() => updateQty(item.id, item.quantity - 1)} disabled={item.quantity <= 1}>−</button>
                                            <span>{item.quantity}</span>
                                            <button onClick={() => updateQty(item.id, item.quantity + 1)}>+</button>
                                        </div>
                                    </div>
                                    <div className="cart-page__item-right">
                                        <strong>{(item.price * item.quantity).toFixed(2)} €</strong>
                                        <button onClick={() => removeItem(item.id)} className="cart-page__remove">Supprimer</button>
                                    </div>
                                </li>
                            ))}
                        </ul>

                        <aside className="cart-page__summary">
                            <h2>Récapitulatif</h2>
                            <div className="cart-page__row">
                                <span>Sous-total</span><span>{totalPrice.toFixed(2)} €</span>
                            </div>
                            <div className="cart-page__row">
                                <span>Livraison</span><span>Gratuite</span>
                            </div>
                            <div className="cart-page__divider" />
                            <div className="cart-page__row cart-page__row--total">
                                <strong>Total</strong><strong>{totalPrice.toFixed(2)} €</strong>
                            </div>
                            <button className="btn btn-primary cart-page__checkout">
                                Passer la commande
                            </button>
                            <button className="cart-page__clear" onClick={clearCart}>Vider le panier</button>
                        </aside>
                    </div>
                )}
            </div>
        </main>
    );
}
