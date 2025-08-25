import { getProductsForReel, getReelById } from "../../../../lib/firestore";
import styles from './page.module.css';
import Link from "next/link";

const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "Products", href: "/products" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" }
];

export default async function ReelPage({ params }) {
  const { id } = params;
  const [products, reel] = await Promise.all([
    getProductsForReel(id),
    getReelById(id)
  ]);

  return (
    <div className={styles.container}>
      <div className={styles.mainContent}>
        {/* Header section */}
        <header className={styles.header}>
          <Link href="/" className={styles.logo}>glamlink</Link>
          <nav className={styles.nav}>
            {NAV_LINKS.map((item) => (
              <Link key={item.name} href={item.href} className={styles.navLink}>{item.name}</Link>
            ))}
          </nav>
        </header>
       
        {/* Reel Player & Products */}
        <section>
          <div className={styles.contentGrid}>
            <div className={styles.videoColumn}>
              <div className={styles.videoWrapper}>
                {reel && reel.video_url ? (
                  <video
                    src={reel.video_url}
                    className={styles.videoPlayer}
                    controls
                    poster={reel.thumbnail_url || ''}
                    playsInline
                  />
                ) : (
                  <p>Video not found.</p>
                )}
              </div>
              <h2 className={styles.videoTitle}>{`${id.replace('r', '')}. ${reel?.title || ""}`}</h2>
            </div>

            {/* Products List */}
            <div className={styles.productsColumn}>
              {products && products.length > 0 ? (
                products.map((product) => (
                  <div key={product.id} className={styles.productCard}>
                    <img 
                      src={product.image_url || `https://placehold.co/60x60/805ad5/ffffff?text=${product.name}`}
                      alt={product.name} 
                      className={styles.productImage}
                    />
                    <div className={styles.productInfo}>
                      <h4 className={styles.productName}>{`${product.id.replace('p', '')}. ${product.name}`}</h4>
                      <p className={styles.productPrice}>₹{product.price}</p>
                      <a href={product.link} target="_blank" rel="noopener noreferrer" className={styles.buyButton}>
                        <svg className={styles.cartIcon} viewBox="0 0 20 20" fill="currentColor">
                          <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                        </svg>
                        Buy Now
                      </a>
                    </div>
                  </div>
                ))
              ) : (
                <div className={styles.noProducts}>
                  <p>No products found for this reel</p>
                </div>
              )}
            </div>
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
