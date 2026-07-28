export type Category = "Apparel" | "Footwear" | "Accessories" | "Home";
export type Brand = "Northline" | "Solari" | "Kadence" | "Umbra";

export interface Product {
    id: string;
    name: string;
    category: Category;
    brand: Brand;
    price: number;
    icon: string;
    accent: string;
}

export const categories: Category[] = ["Apparel", "Footwear", "Accessories", "Home"];
export const brands: Brand[] = ["Northline", "Solari", "Kadence", "Umbra"];

export const products: Product[] = [
    { id: "p1", name: "Ridgeline Wool Jacket", category: "Apparel", brand: "Northline", price: 128, icon: "user", accent: "#3a4a5c" },
    { id: "p2", name: "Everyday Crew Tee", category: "Apparel", brand: "Solari", price: 22, icon: "user", accent: "#3a4a5c" },
    { id: "p3", name: "Cascade Rain Shell", category: "Apparel", brand: "Umbra", price: 96, icon: "user", accent: "#3a4a5c" },
    { id: "p4", name: "Trailhead Hiking Boots", category: "Footwear", brand: "Northline", price: 145, icon: "male", accent: "#5c4632" },
    { id: "p5", name: "Cloudstep Running Shoes", category: "Footwear", brand: "Kadence", price: 89, icon: "male", accent: "#5c4632" },
    { id: "p6", name: "Harbor Canvas Sneakers", category: "Footwear", brand: "Solari", price: 64, icon: "male", accent: "#5c4632" },
    { id: "p7", name: "Meridian Leather Belt", category: "Accessories", brand: "Kadence", price: 38, icon: "tag", accent: "#7a5c3a" },
    { id: "p8", name: "Aviator Sunglasses", category: "Accessories", brand: "Umbra", price: 54, icon: "eye", accent: "#7a5c3a" },
    { id: "p9", name: "Woven Canvas Tote", category: "Accessories", brand: "Northline", price: 42, icon: "shopping-bag", accent: "#7a5c3a" },
    { id: "p10", name: "Ceramic Pour-Over Set", category: "Home", brand: "Umbra", price: 58, icon: "coffee", accent: "#4a5c3f" },
    { id: "p11", name: "Linen Throw Blanket", category: "Home", brand: "Solari", price: 72, icon: "home", accent: "#4a5c3f" },
    { id: "p12", name: "Oak Serving Board", category: "Home", brand: "Kadence", price: 34, icon: "cutlery", accent: "#4a5c3f" },
];
