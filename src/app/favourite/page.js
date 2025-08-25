"use client";
import styles from '../page.module.css';
import { useState, useEffect } from 'react';
import { getReelsByIds } from "../../../lib/firestore";
import Link from "next/link";
import Search from "../Search";

export default function Favourite() {
  const [favourites, setFavourites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const favs = JSON.parse(localStorage.getItem('favouriteReels') || '[]');
    const favIds = favs.map(f => f.id);
    if (favIds.length > 0) {
      getReelsByIds(favIds).then(data => {
        setFavourites(data);
        setLoading(false);
      });
    } else {
      setFavourites([]);
      setLoading(false);
    }
  }, []);

  const handleRemove = (reelId) => {
    let favs = JSON.parse(localStorage.getItem('favouriteReels') || '[]');
    favs = favs.filter(f => f.id !== reelId);
    localStorage.setItem('favouriteReels', JSON.stringify(favs));
    setFavourites(favs);
  };

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
        <Search />
        <h2 className={styles.sectionTitle}>Your Favourites</h2>
        <div className={styles.reelsGrid}>
          {loading ? (
            <div className={styles.noProducts}><p>Loading...</p></div>
          ) : (
            favourites.length > 0 ? favourites.map((reel) => (
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
                <button className={styles.likeButton} onClick={() => handleRemove(reel.id)} aria-label="Remove from Favourites" style={{ color: '#ef4444', background: 'white', border: 'none', padding: 0 }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="3 6 5 6 21 6" />
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m5 0V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
                    <line x1="10" y1="11" x2="10" y2="17" />
                    <line x1="14" y1="11" x2="14" y2="17" />
                  </svg>
                </button>
              </div>
            )) : (
              <div className={styles.noProducts}>
                <p>No favourites yet.</p>
              </div>
            )
          )}
        </div>
        <footer className={styles.footer}>
          &copy; 2025 GlamLink. All rights reserved.
        </footer>
      </div>
    </div>
  );
}
