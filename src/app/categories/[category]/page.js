"use client";
import styles from '../../page.module.css';
import { useState, useEffect, use } from 'react';
import { getAllProducts } from '../../../../lib/firestore';

const CATEGORY_MAP = {
  fashion: "Fashion",
  beauty: "Beauty",
  decor: "Decor"
};

export default function CategoryPage({ params }) {
  const { category } = use(params);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getAllProducts().then(all => {
      const filtered = all.filter(p => (p.category || '').toLowerCase() === category);
      setProducts(filtered);
    });
  }, [category]);

  return (
    <div className={styles.container}>
      <div className={styles.mainContent}>
        <header className={styles.header}>
          <div className={styles.logo}>glamlink</div>
          <nav className={styles.nav}>
            {["Home", "Products", "About", "Contact"].map((item) => (
              <a
                key={item}
                href={item === "Home" ? "/" : item === "Products" ? "/products" : item === "Favourite" ? "/favourite" : "/about-contact"}
                className={styles.navLink}
              >
                {item}
              </a>
            ))}
          </nav>
        </header>
        <div className={styles.searchContainer}>
          <input type="text" placeholder="Search for products or reels..." className={styles.searchInput} id="searchInputCat" />
          <button className={styles.searchButton} onClick={() => {
            const val = document.getElementById('searchInputCat').value;
            if (val) window.location.href = `/search/${val}`;
          }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="white">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
        <h2 className={styles.sectionTitle}>{CATEGORY_MAP[category] || "Category"} Products</h2>
        <div className={styles.productsColumn}>
          {products.length > 0 ? (
            products.map(product => (
              <div key={product.id} className={styles.productCard}>
                <img 
                  src={product.image_url || `https://placehold.co/60x60/805ad5/ffffff?text=${product.name}`}
                  alt={product.name}
                  className={styles.productImage}
                />
                <div className={styles.productInfo}>
                  <h4 className={styles.productName}>{product.name}</h4>
                  <p className={styles.productPrice}>₹{product.price}</p>
                  <button className={styles.buyButton}>
                    <svg className={styles.cartIcon} viewBox="0 0 20 20" fill="currentColor">
                      <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                    </svg>
                    Add to Cart
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className={styles.noProducts}>
              <p>No products found in this category.</p>
            </div>
          )}
        </div>
        <footer className={styles.footer}>
          &copy; 2025 GlamLink. All rights reserved.
        </footer>
      </div>
    </div>
  );
}
