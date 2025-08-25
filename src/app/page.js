import { getAllReels } from "../../lib/firestore";
import styles from './page.module.css';
import Search from "./Search";
import ReelsGrid from "./ReelsGrid";

export default async function Home() {
  const reels = await getAllReels();

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
        <Search />

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

        <ReelsGrid initialReels={reels} />

        {/* Footer */}
        <footer className={styles.footer}>
          &copy; 2025 GlamLink. All rights reserved.
        </footer>
      </div>
    </div>
  );
}