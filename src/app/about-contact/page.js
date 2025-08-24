"use client";
import styles from '../page.module.css';

export default function AboutContactPage() {
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
          <input type="text" placeholder="Search for products or reels..." className={styles.searchInput} id="searchInputAbout" />
          <button className={styles.searchButton} onClick={() => {
            const val = document.getElementById('searchInputAbout').value;
            if (val) window.location.href = `/search/${val}`;
          }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="white">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
        <h2 className={styles.sectionTitle}>About Us</h2>
        <div style={{ marginBottom: '2rem', color: '#4b5563', fontSize: '1rem', textAlign: 'center' }}>
          <p>
            GlamLink is your destination for curated fashion, beauty, and decor products. We connect you with the latest trends and exclusive reels from top creators. Discover, shop, and get inspired!
          </p>
        </div>
        <h2 className={styles.sectionTitle}>Contact Us</h2>
        <div style={{ color: '#4b5563', fontSize: '1rem', textAlign: 'center' }}>
          <p>Email: support@glamlink.com</p>
          <p>Phone: +91 98765 43210</p>
          <p>Address: 123 Glam Street, Mumbai, India</p>
        </div>
        <footer className={styles.footer}>
          &copy; 2025 GlamLink. All rights reserved.
        </footer>
      </div>
    </div>
  );
}
