import './Hero.css';

export default function Hero() {
    return (
        <section className="hero">
            <div className="hero__overlay" />
            <div className="hero__content container">
                <p className="hero__eyebrow">Artisanal • Authentique • Passionné</p>
                <h1 className="hero__title">
                    L'art du café,<br />
                    <em>livré chez vous</em>
                </h1>
                <p className="hero__sub">
                    Découvrez notre sélection de cafés d'exception, pâtisseries maison et accessoires barista.
                    Torréfaction artisanale, fraîcheur garantie.
                </p>
                <a href="#products" className="btn btn-primary hero__cta">
                    Découvrir la boutique
                </a>
            </div>
        </section>
    );
}
