"use client";
import styles from './page.module.css';
import { useState, useEffect } from 'react';

export default function ReelsGrid({ initialReels }) {
  const [reels, setReels] = useState(initialReels);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem('favouriteReels') || '[]');
    setFavorites(favs);
  }, []);

  const handleLike = (reel) => {
    let favs = JSON.parse(localStorage.getItem('favouriteReels') || '[]');
    if (!favs.some(f => f.id === reel.id)) {
      favs.push({ id: reel.id, title: `${reel.id.replace('r', '')}. ${reel.title || "Untitled Reel"}` });
      localStorage.setItem('favouriteReels', JSON.stringify(favs));
      setFavorites(favs);
    }
  };

  return (
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
                    alt={reel.title || "reel"}
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
                {`${reel.id.replace('r', '')}. ${reel.title || "Untitled Reel"}`}
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
  );
}
