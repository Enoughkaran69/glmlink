import styles from '../page.module.css';
import Search from '../Search';

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
        <Search />
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