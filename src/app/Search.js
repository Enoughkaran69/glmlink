'use client'
import styles from './page.module.css';

export default function Search() {
    const handleSearch = (event) => {
        event.preventDefault();
        const form = event.target;
        const query = form.search.value;
        if (query) {
            window.location.href = `/search/${query}`;
        }
    };

    return (
        <form className={styles.searchContainer} onSubmit={handleSearch}>
            <input type="text" name="search" placeholder="Search for products or reels..." className={styles.searchInput} />
            <button type="submit" className={styles.searchButton}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="white">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
            </button>
        </form>
    )
}