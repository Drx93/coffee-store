# CaféStore — Site E-Commerce React + Node.js

Un site e-commerce thème café avec catalogue produits, panier interactif, filtres par catégorie et transitions animées.

---

## Prérequis

- [Node.js](https://nodejs.org/) v18 ou supérieur
- npm (inclus avec Node.js)

---

## Installation & Lancement

> **Deux terminaux séparés** sont nécessaires : un pour le backend, un pour le frontend.

---

### 1️⃣ Backend — API Express (port 5000)

```bash
cd backend
npm install
node server.js
```

Le serveur démarre sur **http://localhost:5000**

Endpoints disponibles :
- `GET /api/products` — tous les produits
- `GET /api/products?category=cafes` — filtrés par catégorie
- `GET /api/products/:id` — un produit par ID
- `GET /api/categories` — liste des catégories

---

### 2️⃣ Frontend — React + Vite (port 5173)

Dans un **nouveau terminal** :

```bash
cd frontend
npm install
npm run dev
```

L'application démarre sur **http://localhost:5173**

---

## Structure du projet

```
site-ecommerce-cafe/
├── backend/
│   ├── data/
│   │   └── products.json     # Base de données produits (12 produits)
│   ├── server.js             # Serveur Express + routes API
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   └── products.js   # Appels Axios vers le backend
│   │   ├── components/
│   │   │   ├── Navbar.jsx    # Barre de navigation + badge panier
│   │   │   ├── ProductCard.jsx
│   │   │   ├── ProductGrid.jsx
│   │   │   ├── CartSidebar.jsx
│   │   │   ├── Hero.jsx
│   │   │   └── Footer.jsx
│   │   ├── context/
│   │   │   └── CartContext.jsx  # Gestion globale du panier (useReducer)
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── ProductDetail.jsx
│   │   │   └── Cart.jsx
│   │   ├── App.jsx           # Routeur React
│   │   ├── main.jsx
│   │   └── index.css         # Design system (tokens, animations)
│   └── package.json
│
└── README.md
```

---

## Fonctionnalités

| Fonctionnalité | Description |
|---|---|
| **Panier global** | Ajout, suppression, modification des quantités |
| **Filtres catégories** | Cafés, Pâtisseries, Accessoires |
| **Animations** | Hover cards, slide-in panier, skeleton loading, badge animé |
| **Responsive** | Adapté mobile, tablette et desktop |
| **Détail produit** | Page dédiée avec sélecteur de quantité et indicateur de stock |
| **Thème sombre** | Design café avec palette brun / crème / or |

---


---

## Notes

- Le panier est géré **côté frontend** via React Context (non persisté entre rechargements).
- La base de données est un simple fichier `products.json` (aucune vraie BDD requise).
- Pour le futur, il faudra ajouter une vrai base de données ducoup
