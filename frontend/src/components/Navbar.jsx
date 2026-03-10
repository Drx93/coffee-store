import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Navbar.css';

export default function Navbar() {
    const { totalItems, toggleCart } = useCart();

    return (
        <header className="navbar">
            <div className="container navbar__inner">
                <Link to="/" className="navbar__logo">
                    <span className="navbar__logo-icon">☕</span>
                    <span>Café<strong>Store</strong></span>
                </Link>

                <nav className="navbar__links">
                    <Link to="/" className="navbar__link">Accueil</Link>
                    <Link to="/products" className="navbar__link">Produits</Link>
                    <Link to="/cart" className="navbar__link">Mon Panier</Link>
                </nav>

                <button className="navbar__cart-btn" onClick={toggleCart} aria-label="Ouvrir le panier">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                        <line x1="3" y1="6" x2="21" y2="6" />
                        <path d="M16 10a4 4 0 01-8 0" />
                    </svg>
                    {totalItems > 0 && (
                        <span className="navbar__badge" key={totalItems}>{totalItems}</span>
                    )}
                </button>
            </div>
        </header>
    );
}
