import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './ProductCard.css';

export default function ProductCard({ product }) {
    const { addToCart, openCart } = useCart();

    const handleAdd = (e) => {
        e.preventDefault();
        addToCart(product);
        openCart();
    };

    return (
        <Link to={`/products/${product.id}`} className="card">
            <div className="card__img-wrap">
                <img src={product.image} alt={product.name} className="card__img" loading="lazy" />
                {product.badge && <span className="badge card__badge">{product.badge}</span>}
            </div>
            <div className="card__body">
                <p className="card__category">{product.category}</p>
                <h3 className="card__name">{product.name}</h3>
                <p className="card__desc">{product.description.slice(0, 72)}…</p>
                <div className="card__footer">
                    <span className="card__price">{product.price.toFixed(2)} €</span>
                    <button className="btn btn-primary card__btn" onClick={handleAdd}>
                        + Ajouter
                    </button>
                </div>
            </div>
        </Link>
    );
}
