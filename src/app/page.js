"use client";
import { getAllReels } from "../../lib/firestore";
import styles from './page.module.css';
import { useState, useEffect } from 'react';

export default function Home() {
  const [reels, setReels] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    getAllReels().then(setReels);
  const favs = JSON.parse(localStorage.getItem('favouriteReels') || '[]');
  setFavorites(favs);
  }, []);

  const handleLike = (reel) => {
    let favs = JSON.parse(localStorage.getItem('favouriteReels') || '[]');
    if (!favs.some(f => f.id === reel.id)) {
      favs.push({ id: reel.id, title: reel.title || reel.titile || "Untitled Reel" });
      localStorage.setItem('favouriteReels', JSON.stringify(favs));
      setFavorites(favs);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.mainContent}>
        {/* Header section */}
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
            <input type="text" placeholder="Search for products or reels..." className={styles.searchInput} id="searchInputHome" />
            <button className={styles.searchButton} onClick={() => {
              const val = document.getElementById('searchInputHome').value;
              if (val) window.location.href = `/search/${val}`;
            }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="white">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
            </button>
          </div>

        {/* Categories Section */}
        <section className={styles.categoriesSection}>
          <h2 className={styles.sectionTitle}>Shop by Category</h2>
          <div className={styles.categoriesGrid}>
            {[
              { icon: "👗", label: "Fashion", color: "#93C5FD", link: "/categories/fashion" },
              { icon: "💄", label: "Beauty", color: "#F9A8D4", link: "/categories/beauty" },
              { icon: "🏠", label: "Decor", color: "#FDE68A", link: "/categories/decor" },
              { icon: "❤️", label: "Favourite", color: "#C4B5FD", link: "/favourite" }
            ].map((category) => (
              category.link ? (
                <a key={category.label} href={category.link} className={styles.categoryItem} style={{ "--bg-color": category.color }}>
                  <div className={styles.categoryIcon}><span>{category.icon}</span></div>
                  <p style={{ color: category.color }}>{category.label}</p>
                </a>
              ) : (
                <div key={category.label} className={styles.categoryItem} style={{ "--bg-color": category.color }}>
                  <div className={styles.categoryIcon}><span>{category.icon}</span></div>
                  <p style={{ color: category.color }}>{category.label}</p>
                </div>
              )
            ))}
          </div>
        </section>

        {/* Reels Grid */}
        <section>
          <h2 className={styles.sectionTitle}>Featured Videos</h2>
          <div className={styles.reelsGrid}>
            {reels.map((reel) => (
              <a key={reel.id} href={`/reel/${reel.id}`} className={styles.reelCard}>
                <div className={styles.reelMedia}>
                  {reel.thumbnail_url ? (
                    reel.thumbnail_url.endsWith('.mp4') ? (
                      <video
                        src={reel.thumbnail_url}
                        className={styles.reelVideo}
                        muted
                      />
                    ) : (
                      <img
                        src={reel.thumbnail_url}
                        alt={reel.title || reel.titile || "reel"}
                        className={styles.reelImage}
                      />
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
                  <h4 style={{ color: '#e9e9e9ff', textDecoration: 'underline', cursor: 'pointer' }}>
                    {reel.title || reel.titile || "Untitled Reel"}
                  </h4>
                </div>
                <button
                  className={styles.likeButton}
                  onClick={e => {
                    e.preventDefault();
                    handleLike(reel);
                  }}
                  aria-label={favorites.some(f => f.id === reel.id) ? "Saved to Favourites" : "Add to Favourites"}
                  style={{ color: favorites.some(f => f.id === reel.id) ? '#9333ea' : '#ef4444' }}
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                  </svg>
                </button>
              </a>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className={styles.footer}>
          &copy; 2025 GlamLink. All rights reserved.
        </footer>
      </div>
    </div>
  );
}