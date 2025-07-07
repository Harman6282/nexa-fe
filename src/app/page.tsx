import Banner from "@/components/landing-page/Banner";
import { Navbar } from "@/components/Navbar";
import Image from "next/image";
import Link from "next/link";

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
      {/* Scrolling Banner */}

      <Banner />

      {/* Category Cards */}
      <section className="flex flex-col sm:flex-row gap-6 justify-center my-10">
        {categories.map((cat) => (
          <div
            key={cat.name}
            className="bg-white rounded-xl shadow-md overflow-hidden w-full max-w-xs text-center pb-6 transition-transform hover:-translate-y-1 hover:scale-105"
          >
            <Image
              src={cat.image}
              alt={cat.name}
              width={260}
              height={320}
              className="w-full h-40 sm:h-80 object-cover"
            />
            <h3 className="text-lg font-bold mt-4 mb-2">{cat.name}</h3>
            <button className="mt-2 px-4 py-2 rounded-md bg-pink-500 text-white font-semibold hover:bg-pink-600 transition">
              Explore Now
            </button>
          </div>
        ))}
      </section>
      dslkfjdskfjdlkf
      {/* Product Collection */}
      <h2 className="text-2xl sm:text-3xl font-extrabold my-8 ml-2 sm:ml-8">
        OUR COLLECTION
      </h2>
      <div className="flex flex-wrap gap-2 sm:gap-4 mb-6 ml-2">
        <button className="px-4 py-2 rounded bg-pink-500 text-white font-semibold hover:bg-pink-600 transition">
          Men
        </button>
        <button className="px-4 py-2 rounded bg-pink-500 text-white font-semibold hover:bg-pink-600 transition">
          Coats & Bags
        </button>
        <button className="px-4 py-2 rounded bg-pink-500 text-white font-semibold hover:bg-pink-600 transition">
          Trending
        </button>
        <button className="px-4 py-2 rounded bg-pink-500 text-white font-semibold hover:bg-pink-600 transition">
          Out Wear
        </button>
        <button className="px-4 py-2 rounded bg-pink-500 text-white font-semibold hover:bg-pink-600 transition">
          Accessories
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 px-2 sm:px-8 mb-10">
        {products.map((prod) => (
          <div
            key={prod.name}
            className="bg-white rounded-xl shadow-md overflow-hidden text-center pb-4 transition-transform hover:-translate-y-1 hover:scale-105"
          >
            <Image
              src={prod.image}
              alt={prod.name}
              width={210}
              height={220}
              className="w-full h-40 sm:h-56 object-cover"
            />
            <div className="font-bold mt-3 mb-1">{prod.name}</div>
            <div className="text-pink-500 font-bold mb-2">{prod.price}</div>
            <button className="px-4 py-2 rounded bg-black text-white font-semibold hover:bg-gray-800 transition">
              Add to cart
            </button>
          </div>
        ))}
      </div>

      {/* Cloth and Footwear Collection Section */}
      <h2 className="text-2xl sm:text-3xl font-extrabold text-center my-8">
        CLOTH AND FOOTWEAR COLLECTION
      </h2>
      <div className="text-center max-w-2xl mx-auto mb-10 text-gray-700 text-base sm:text-lg">
        Unlock a new era of style and comfort with our exclusive collection of
        clothing and footwear. Experience the perfect blend of fashion and
        functionality.
      </div>

      {/* Dark Section */}
      <section className="bg-black text-white rounded-2xl flex flex-col lg:flex-row items-center justify-center gap-8 px-4 sm:px-8 py-10 my-12">
        <Image
          src="/men.jpg"
          alt="Clothing Collection"
          width={320}
          height={380}
          className="w-32 h-40 sm:w-56 sm:h-80 lg:w-80 lg:h-96 object-cover rounded-xl shadow-2xl"
        />
        <div className="max-w-md w-full">
          <div className="text-2xl sm:text-3xl font-extrabold mb-4">
            CLOTHING COLLECTION
          </div>
          <div className="text-gray-300 text-base sm:text-lg mb-4">
            Explore our curated selection of premium clothing for every
            occasion. From casual wear to formal attire, find your perfect fit
            and style.
          </div>
          <button className="mt-2 px-6 py-3 rounded-lg bg-white text-black font-bold hover:bg-gray-200 transition">
            Explore Products
          </button>
        </div>
      </section>
    </div>
  );
}
