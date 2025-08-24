"use client";
import styles from '../../page.module.css';
import { useState, useEffect } from 'react';
import { getAllReels, getAllProducts } from '../../../../lib/firestore';
import { useParams } from 'next/navigation';

export default function SearchResultsPage() {
  const params = useParams();
  const query = params?.query || "";
  const [reels, setReels] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const [allReels, allProducts] = await Promise.all([
        getAllReels(),
        getAllProducts()
      ]);
  let reelResults = [];
  let productResults = [];
  // If query is '3', match products with id 'p3' and reels with id 'r3'
  productResults = allProducts.filter(p => p.id === `p${query}` || String(p.price) === query || p.name?.includes(query));
  reelResults = allReels.filter(r => r.id === `r${query}` || r.title?.includes(query));
  setReels(reelResults);
  setProducts(productResults);
      setLoading(false);
    }
    if (query) fetchData();
  }, [query]);

  return (
    <div className={styles.container}>
      <div className={styles.mainContent}>
        <header className={styles.header}>
          <div className={styles.logo}>glamlink</div>
          <nav className={styles.nav}>
            {["Home", "Products", "About", "Contact", "Favourite"].map((item) => (
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
        <h2 className={styles.sectionTitle}>Search Results for "{query}"</h2>
        {loading ? (
          <div className={styles.noProducts}><p>Loading...</p></div>
        ) : (
          <>
            <h3 className={styles.sectionTitle}>Reels</h3>
            <div className={styles.reelsGrid}>
              {reels.length > 0 ? reels.map(reel => (
                <div key={reel.id} className={styles.reelCard}>
                  <div className={styles.reelMedia}>
                    {reel.thumbnail_url ? (
                      reel.thumbnail_url.endsWith('.mp4') ? (
                        <video src={reel.thumbnail_url} className={styles.reelVideo} muted />
                      ) : (
                        <img src={reel.thumbnail_url} alt={reel.title || "reel"} className={styles.reelImage} />
                      )
                    ) : (
                      <div className={styles.reelPlaceholder}>
                        <svg className={styles.playIcon} viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <div className={styles.reelTitle}>
                    <a href={`/reel/${reel.id}`} className={styles.navLink} style={{ color: '#9333ea', textDecoration: 'underline', cursor: 'pointer' }}>
                      <h4>{reel.title || "Untitled Reel"}</h4>
                    </a>
                  </div>
                </div>
              )) : <div className={styles.noProducts}><p>No reels found.</p></div>}
            </div>
            <h3 className={styles.sectionTitle}>Products</h3>
            <div className={styles.productsColumn}>
              {products.length > 0 ? products.map(product => (
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
              )) : <div className={styles.noProducts}><p>No products found.</p></div>}
            </div>
          </>
        )}
        <footer className={styles.footer}>
          &copy; 2025 GlamLink. All rights reserved.
        </footer>
      </div>
    </div>
  );
}
