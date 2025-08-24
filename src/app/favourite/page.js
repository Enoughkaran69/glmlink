"use client";
import styles from '../page.module.css';
import { useState, useEffect } from 'react';
import { getAllReels } from "../../../lib/firestore";
import Link from "next/link";

export default function Favourite() {
  const [reels, setReels] = useState([]);
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    getAllReels().then(setReels);
  const favs = JSON.parse(localStorage.getItem('favouriteReels') || '[]');
  setFavourites(favs);
  }, []);

  const handleRemove = (reelId) => {
    let favs = JSON.parse(localStorage.getItem('favouriteReels') || '[]');
    favs = favs.filter(f => f.id !== reelId);
    localStorage.setItem('favouriteReels', JSON.stringify(favs));
    setFavourites(favs);
  };

  // Map favourite objects to full reel data, fallback to just id/title if not found
  const favouriteReels = favourites.map(fav => {
    const reel = reels.find(r => r.id === fav.id);
    return reel ? { ...reel, title: fav.title } : { id: fav.id, title: fav.title };
  });

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
          <input type="text" placeholder="Search for products or reels..." className={styles.searchInput} id="searchInputFav" />
          <button className={styles.searchButton} onClick={() => {
            const val = document.getElementById('searchInputFav').value;
            if (val) window.location.href = `/search/${val}`;
          }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="white">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
        <h2 className={styles.sectionTitle}>Your Favourites</h2>
        <div className={styles.reelsGrid}>
          {favouriteReels.length > 0 ? favouriteReels.map((reel) => (
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
          )}
        </div>
        <footer className={styles.footer}>
          &copy; 2025 GlamLink. All rights reserved.
        </footer>
      </div>
    </div>
  );
}
