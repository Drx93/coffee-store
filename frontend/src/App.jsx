import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import CartSidebar from './components/CartSidebar';
import Footer from './components/Footer';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';

function NotFound() {
    return (
        <main className="page-enter" style={{ textAlign: 'center', padding: '6rem 1rem' }}>
            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '4rem', color: 'var(--color-accent)' }}>404</h1>
            <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem' }}>Page introuvable</p>
            <Link to="/" className="btn btn-primary">Retour à l'accueil</Link>
        </main>
    );
}

export default function App() {
    return (
        <BrowserRouter>
            <CartProvider>
                <Navbar />
                <CartSidebar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/products" element={<Home />} />
                    <Route path="/products/:id" element={<ProductDetail />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
                <Footer />
            </CartProvider>
        </BrowserRouter>
    );
}
