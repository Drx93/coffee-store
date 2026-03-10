require('dotenv').config();
const express = require('express');
const cors = require('cors');
const products = require('./data/products.json');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

// ─── Routes Produits ─────────────────────────────────────────────────────────

// GET /api/products  →  tous les produits (avec filtre optionnel par catégorie)
app.get('/api/products', (req, res) => {
    const { category } = req.query;
    if (category && category !== 'tous') {
        const filtered = products.filter((p) => p.category === category);
        return res.json(filtered);
    }
    res.json(products);
});

// GET /api/products/:id  →  un produit par id
app.get('/api/products/:id', (req, res) => {
    const product = products.find((p) => p.id === parseInt(req.params.id));
    if (!product) {
        return res.status(404).json({ message: 'Produit introuvable.' });
    }
    res.json(product);
});

// GET /api/categories  →  liste des catégories uniques
app.get('/api/categories', (req, res) => {
    const categories = ['tous', ...new Set(products.map((p) => p.category))];
    res.json(categories);
});

// ─── Panier (in-memory) ───────────────────────────────────────────────────────
let cart = [];

// GET /api/cart
app.get('/api/cart', (req, res) => {
    res.json(cart);
});

// POST /api/cart  →  { productId, quantity }
app.post('/api/cart', (req, res) => {
    const { productId, quantity = 1 } = req.body;
    const product = products.find((p) => p.id === parseInt(productId));
    if (!product) {
        return res.status(404).json({ message: 'Produit introuvable.' });
    }
    const existing = cart.find((item) => item.id === product.id);
    if (existing) {
        existing.quantity += quantity;
    } else {
        cart.push({ ...product, quantity });
    }
    res.status(201).json(cart);
});

// DELETE /api/cart/:id  →  retire un article du panier
app.delete('/api/cart/:id', (req, res) => {
    cart = cart.filter((item) => item.id !== parseInt(req.params.id));
    res.json(cart);
});

// DELETE /api/cart  →  vide le panier
app.delete('/api/cart', (req, res) => {
    cart = [];
    res.json({ message: 'Panier vidé.' });
});

// ─── Lancement du serveur ─────────────────────────────────────────────────────
app.listen(PORT, () => {
    console.log(`\n☕  Serveur e-commerce café démarré`);
    console.log(`   → http://localhost:${PORT}/api/products\n`);
});
