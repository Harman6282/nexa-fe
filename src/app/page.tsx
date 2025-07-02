import { Navbar } from "@/components/Navbar";
import Image from "next/image";
import Link from "next/link";
import styles from "./landing.module.css";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Shop", href: "/products" },
  { name: "About Us", href: "/about" },
];

const categories = [
  {
    name: "Women",
    image: "/women.jpg",
    link: "/women",
  },
  {
    name: "Men",
    image: "/men.jpg",
    link: "/men",
  },
];

const products = [
  {
    name: "BLVCK Grey Hoodie",
    price: "$140",
    image: "/men.jpg",
  },
  {
    name: "Lilac Ribbed Dress",
    price: "$58",
    image: "/women.jpg",
  },
  {
    name: "Bean Jogger Hoodie Set",
    price: "$128",
    image: "/kids.jpg",
  },
  {
    name: "Stylish Winter Hoodie",
    price: "$110",
    image: "/men.jpg",
  },
  {
    name: "Trendy Pullover Hoodie",
    price: "$120",
    image: "/kids.jpg",
  },
];

export default function Home() {
  return (
    <div>
      {/* Custom Navbar */}
      <nav className={styles.navbar}>
        <div className={styles.logo}>REFLECT</div>
        <div className={styles.navLinks}>
          {navLinks.map((link) => (
            <Link key={link.name} href={link.href}>{link.name}</Link>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <span style={{ fontSize: 20, cursor: 'pointer' }}>🔍</span>
          <span style={{ fontSize: 20, cursor: 'pointer' }}>❤️</span>
          <span style={{ fontSize: 20, cursor: 'pointer' }}>🛒</span>
        </div>
      </nav>

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroText}>
          <h1 className={styles.heroTitle}>REFLECT<br />FASHION</h1>
          <p className={styles.heroSubtitle}>
            Discover the latest trends in fashion for men and women. Shop the newest arrivals and elevate your style with our exclusive collection.
          </p>
          <div className={styles.heroBtns}>
            <button className={styles.heroBtn}>Buy Product</button>
            <button className={`${styles.heroBtn} ${styles.secondary}`}>Explore Product</button>
          </div>
        </div>
        <Image src="/men.jpg" alt="Hero" width={400} height={400} className={styles.heroImg} />
      </section>

      {/* Scrolling Banner */}
      <div className={styles.scrollingBanner}>
        <span className={styles.scrollingText}>
          REFLECT FASHION &nbsp; ★ &nbsp; REFLECT FASHION &nbsp; ★ &nbsp; REFLECT FASHION &nbsp; ★ &nbsp; REFLECT FASHION &nbsp; ★ &nbsp; REFLECT FASHION &nbsp; ★ &nbsp; REFLECT FASHION &nbsp; ★ &nbsp;
        </span>
      </div>

      {/* Category Cards */}
      <section className={styles.categories}>
        {categories.map((cat) => (
          <div key={cat.name} className={styles.categoryCard}>
            <Image src={cat.image} alt={cat.name} width={260} height={320} className={styles.categoryImg} />
            <h3 style={{ fontSize: '1.3rem', fontWeight: 700, margin: '1rem 0 0.5rem 0' }}>{cat.name}</h3>
            <button className={styles.categoryBtn}>Explore Now</button>
          </div>
        ))}
      </section>

      {/* Product Collection */}
      <h2 className={styles.sectionTitle}>OUR COLLECTION</h2>
      <div style={{ display: 'flex', gap: 16, marginBottom: 24, marginLeft: 8 }}>
        <button className={styles.categoryBtn}>Men</button>
        <button className={styles.categoryBtn}>Coats & Bags</button>
        <button className={styles.categoryBtn}>Trending</button>
        <button className={styles.categoryBtn}>Out Wear</button>
        <button className={styles.categoryBtn}>Accessories</button>
      </div>
      <div className={styles.productGrid}>
        {products.map((prod) => (
          <div key={prod.name} className={styles.productCard}>
            <Image src={prod.image} alt={prod.name} width={210} height={220} className={styles.productImg} />
            <div className={styles.productName}>{prod.name}</div>
            <div className={styles.productPrice}>{prod.price}</div>
            <button className={styles.productBtn}>Add to cart</button>
          </div>
        ))}
      </div>

      {/* Cloth and Footwear Collection Section */}
      <h2 className={styles.sectionTitle} style={{ textAlign: 'center' }}>CLOTH AND FOOTWEAR COLLECTION</h2>
      <div style={{ textAlign: 'center', maxWidth: 700, margin: '0 auto 2.5rem auto', color: '#444', fontSize: '1.1rem' }}>
        Unlock a new era of style and comfort with our exclusive collection of clothing and footwear. Experience the perfect blend of fashion and functionality.
      </div>

      {/* Dark Section */}
      <section className={styles.darkSection}>
        <Image src="/men.jpg" alt="Clothing Collection" width={320} height={380} className={styles.darkSectionImg} />
        <div className={styles.darkSectionText}>
          <div className={styles.darkSectionTitle}>CLOTHING COLLECTION</div>
          <div style={{ color: '#ccc', fontSize: '1.1rem', marginBottom: 16 }}>
            Explore our curated selection of premium clothing for every occasion. From casual wear to formal attire, find your perfect fit and style.
          </div>
          <button className={styles.darkSectionBtn}>Explore Products</button>
        </div>
      </section>
    </div>
  );
}
