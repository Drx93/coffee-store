import { useState, useEffect, useCallback } from 'react';
import ProductCard from './ProductCard';
import { getProducts, getCategories } from '../api/products';
import './ProductGrid.css';

const CATEGORY_LABELS = {
    tous: 'Tous',
    cafes: '☕ Cafés',
    patisseries: '🥐 Pâtisseries',
    accessoires: '🫙 Accessoires',
};

export default function ProductGrid() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [active, setActive] = useState('tous');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = useCallback(async () => {
        setLoading(true); setError(null);
        try {
            const [prods, cats] = await Promise.all([getProducts(active), getCategories()]);
            setProducts(prods);
            setCategories(cats);
        } catch {
            setError('Impossible de charger les produits. Le serveur backend est-il démarré ?');
        } finally { setLoading(false); }
    }, [active]);

    useEffect(() => { fetchData(); }, [fetchData]);

    const handleFilter = (cat) => { if (cat !== active) setActive(cat); };

    return (
        <section id="products" className="product-grid-section">
            <div className="container">
                <h2 className="section-title">Notre Sélection</h2>
                <p className="section-subtitle">Des produits soigneusement choisis pour les passionnés de café</p>

                <div className="filter-bar">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            className={`filter-btn ${active === cat ? 'filter-btn--active' : ''}`}
                            onClick={() => handleFilter(cat)}
                        >
                            {CATEGORY_LABELS[cat] || cat}
                        </button>
                    ))}
                </div>

                {error && (
                    <div className="product-grid__error">
                        ⚠️ {error}
                    </div>
                )}

                {loading ? (
                    <div className="product-grid__loader">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <div key={i} className="skeleton-card" />
                        ))}
                    </div>
                ) : (
                    <div className="product-grid" key={active}>
                        {products.map((p) => (
                            <ProductCard key={p.id} product={p} />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
