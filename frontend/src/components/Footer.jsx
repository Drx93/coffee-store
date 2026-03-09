import './Footer.css';

export default function Footer() {
    return (
        <footer className="footer">
            <div className="container footer__inner">
                <div>
                    <p className="footer__logo">☕ CaféStore</p>
                    <p className="footer__tagline">Le goût du café, l'art de vivre.</p>
                </div>
                <div className="footer__links">
                    <p className="footer__heading">Boutique</p>
                    <a href="/">Accueil</a>
                    <a href="/products">Produits</a>
                    <a href="/cart">Mon panier</a>
                </div>
                <div className="footer__links">
                    <p className="footer__heading">Contact</p>
                    <a href="mailto:hello@cafestore.fr">hello@cafestore.fr</a>
                    <a href="#">Instagram</a>
                </div>
            </div>
            <p className="footer__copy">© 2026 CaféStore — Tous droits réservés.</p>
        </footer>
    );
}
