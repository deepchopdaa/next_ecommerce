import product1 from "../../public/images/product1.jpg";
import product2 from "../../public/images/product2.jpg";
import product3 from "../../public/images/product3.jpg";
import product4 from "../../public/images/product4.jpg";
import product5 from "../../public/images/product5.jpg";
import product6 from "../../public/images/product6.jpg";
import product7 from "../../public/images/product7.jpg";
import product8 from "../../public/images/product8.jpg";
import product9 from "../../public/images/product9.jpg";
import product10 from "../../public/images/product10.jpg";

const Products = [
    {
        id: 1,
        name: "Apple iPhone 15 Pro",
        brand: "Apple",
        category: "Smartphones",
        price: 139900,
        discountPrice: 124900,
        rating: 4.8,
        reviews: 11234,
        stock: true,
        images: product1,
        description:
            "The Apple iPhone 15 Pro features the all-new A17 Pro chip for unbelievable performance and enhanced power efficiency. " +
            "Built with aerospace-grade titanium, it offers a premium lightweight design, incredible camera upgrades, and smoother gaming performance."
    },
    {
        id: 2,
        name: "Samsung Galaxy S24 Ultra",
        brand: "Samsung",
        category: "Smartphones",
        price: 129999,
        discountPrice: 115999,
        rating: 4.7,
        reviews: 9870,
        stock: true,
        images: product2,
        description:
            "The Samsung Galaxy S24 Ultra comes with a stunning AMOLED display, long-lasting battery life, and industry-leading camera zoom. " +
            "Powered by the latest Snapdragon processor, it ensures flagship-level speed and AI-powered features for a seamless experience."
    },
    {
        id: 3,
        name: "Sony WH-1000XM5 Wireless Headphones",
        brand: "Sony",
        category: "Headphones",
        price: 34990,
        discountPrice: 29990,
        rating: 4.6,
        reviews: 5432,
        stock: true,
        images: product3,
        description:
            "Sony WH-1000XM5 offers industry-leading noise cancellation with advanced dual processors and superior comfort. " +
            "Experience crystal-clear sound, exceptional bass response, and up to 30 hours of battery life for travel and work."
    },
    {
        id: 4,
        name: "Nike Air Max 270",
        brand: "Nike",
        category: "Footwear",
        price: 14999,
        discountPrice: 11999,
        rating: 4.5,
        reviews: 8120,
        stock: true,
        sizes: ["7", "8", "9", "10", "11"],
        images: product4,
        description:
            "The Nike Air Max 270 features a large heel Air unit for unmatched cushioning and all-day comfort. " +
            "With a breathable mesh upper and stylish modern design, it's perfect for daily wear, workouts, and casual outings."
    },
    {
        id: 5,
        name: "HP Pavilion x360 Touchscreen Laptop",
        brand: "HP",
        category: "Laptops",
        price: 72999,
        discountPrice: 65999,
        rating: 4.3,
        reviews: 3450,
        stock: false,
        images: product5,
        description:
            "The HP Pavilion x360 is a powerful 2-in-1 touchscreen laptop designed for productivity, entertainment, and creativity. " +
            "With smooth performance, long battery life, and a flexible 360° hinge, it's perfect for students and professionals."
    },
    {
        id: 6,
        name: "Boat Airdopes 141 Bluetooth Earbuds",
        brand: "boAt",
        category: "Earbuds",
        price: 2999,
        discountPrice: 1199,
        rating: 4.2,
        reviews: 152340,
        stock: true,
        images: product6,
        description:
            "boAt Airdopes 141 offer powerful bass, long 42-hour playback, and ultra-low latency for gaming. " +
            "Its ENx™ noise cancellation ensures clear calling, and the ergonomic fit makes it comfortable for all-day use."
    },
    {
        id: 7,
        name: "MI 4A Pro Smart LED TV 43 inch",
        brand: "Xiaomi",
        category: "Television",
        price: 29999,
        discountPrice: 24999,
        rating: 4.4,
        reviews: 25340,
        stock: true,
        images: product7,
        description:
            "The Mi 4A Pro Smart TV comes with a vivid LED display, PatchWall OS, and built-in Chromecast support. " +
            "Enjoy immersive audio, a smooth Android TV experience, and thousands of apps through Google Play."
    },
    {
        id: 8,
        name: "ASUS ROG Strix Gaming Laptop",
        brand: "ASUS",
        category: "Laptops",
        price: 154999,
        discountPrice: 139999,
        rating: 4.7,
        reviews: 7600,
        stock: true,
        images: product8,
        description:
            "The ASUS ROG Strix is a high-performance gaming laptop featuring advanced cooling, RGB lighting, and a powerful GPU. " +
            "Designed for competitive gamers, it delivers lag-free gameplay, fast refresh rates, and exceptional durability."
    },
    {
        id: 9,
        name: "Canon EOS 1500D DSLR Camera",
        brand: "Canon",
        category: "Camera",
        price: 45999,
        discountPrice: 40999,
        rating: 4.4,
        reviews: 9034,
        stock: true,
        images: product9,
        description:
            "The Canon EOS 1500D is the perfect DSLR for beginners and photography enthusiasts. " +
            "With a 24.1MP sensor, high-quality lenses, and easy Wi-Fi sharing, it captures stunning photos and videos effortlessly."
    },
    {
        id: 10,
        name: "OnePlus Nord CE 3 Lite",
        brand: "OnePlus",
        category: "Smartphones",
        price: 21999,
        discountPrice: 17999,
        rating: 4.3,
        reviews: 48210,
        stock: true,
        images: product10,
        description:
            "The OnePlus Nord CE 3 Lite offers a smooth display, powerful Snapdragon processor, and a long-lasting battery. " +
            "Its 108MP camera captures detailed shots, while fast charging ensures you stay powered throughout the day."
    }
];

export default Products;
