import styles from '../page.module.css';
import { getAllProducts } from '../../../lib/firestore';
import Search from '../Search';

export default async function ProductsPage() {
  const products = await getAllProducts();

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
        <h2 className={styles.sectionTitle}>All Products</h2>
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
              <p>No products found.</p>
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
