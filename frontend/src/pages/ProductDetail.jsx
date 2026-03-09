import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProduct } from '../api/products';
import { useCart } from '../context/CartContext';
import './ProductDetail.css';

export default function ProductDetail() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [qty, setQty] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { addToCart, openCart } = useCart();

    useEffect(() => {
        setLoading(true);
        getProduct(id)
            .then(setProduct)
            .catch(() => setError('Produit introuvable.'))
            .finally(() => setLoading(false));
    }, [id]);

    const handleAdd = () => { addToCart(product, qty); openCart(); };

    if (loading) return <div className="detail-loading container page-enter">Chargement…</div>;
    if (error) return <div className="detail-error container page-enter">{error} <Link to="/">← Retour</Link></div>;

    return (
        <main className="page-enter">
            <div className="container detail">
                <Link to="/" className="detail__back">← Retour à la boutique</Link>
                <div className="detail__grid">
                    <div className="detail__img-wrap">
                        <img src={product.image} alt={product.name} className="detail__img" />
                        {product.badge && <span className="badge detail__badge">{product.badge}</span>}
                    </div>
                    <div className="detail__info">
                        <p className="detail__category">{product.category}</p>
                        <h1 className="detail__name">{product.name}</h1>
                        <p className="detail__desc">{product.description}</p>
                        <p className="detail__price">{product.price.toFixed(2)} €</p>

                        <div className="detail__qty-row">
                            <div className="detail__qty">
                                <button onClick={() => setQty((q) => Math.max(1, q - 1))}>−</button>
                                <span>{qty}</span>
                                <button onClick={() => setQty((q) => q + 1)}>+</button>
                            </div>
                            <button className="btn btn-primary detail__add" onClick={handleAdd}>
                                Ajouter au panier — {(product.price * qty).toFixed(2)} €
                            </button>
                        </div>

                        <p className="detail__stock">
                            {product.stock > 10
                                ? '✅ En stock'
                                : product.stock > 0
                                    ? `⚠️ Plus que ${product.stock} en stock`
                                    : '❌ Rupture de stock'}
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}
