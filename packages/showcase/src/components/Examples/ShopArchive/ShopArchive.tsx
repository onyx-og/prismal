import { useMemo, useState } from "react";
import {
    Header, ActionBar, SearchBar, Button, Select, Toggle, List, Alert, Text, Container, useSidebar,
} from "@prismal/react";
import ProductCard from "./components/ProductCard";
import CartLine from "./components/CartLine";
import { products, categories, brands } from "./mock";
import type { Product, Category } from "./mock";

interface CartLineData {
    productId: string;
    qty: number;
}

const priceBands: { value: string; element: string; test: (price: number) => boolean }[] = [
    { value: "any", element: "Any price", test: () => true },
    { value: "under-50", element: "Under $50", test: (p) => p < 50 },
    { value: "50-100", element: "$50 – $100", test: (p) => p >= 50 && p <= 100 },
    { value: "over-100", element: "Over $100", test: (p) => p > 100 },
];

const ShopArchive = () => {
    const [search, setSearch] = useState("");
    const [activeCategories, setActiveCategories] = useState<Set<Category>>(new Set());
    const [brand, setBrand] = useState("all");
    const [priceBand, setPriceBand] = useState("any");
    const [cart, setCart] = useState<CartLineData[]>([]);
    const [orderPlaced, setOrderPlaced] = useState(false);
    const cartSidebar = useSidebar();

    const toggleCategory = (category: Category, checked: boolean) => {
        setActiveCategories((prev) => {
            const next = new Set(prev);
            if (checked) next.add(category);
            else next.delete(category);
            return next;
        });
    };

    const addToCart = (product: Product) => {
        setCart((prev) => {
            const existing = prev.find((l) => l.productId === product.id);
            if (existing) {
                return prev.map((l) => (l.productId === product.id ? { ...l, qty: l.qty + 1 } : l));
            }
            return [...prev, { productId: product.id, qty: 1 }];
        });
        cartSidebar.open();
    };

    const incrementLine = (id: string) => {
        setCart((prev) => prev.map((l) => (l.productId === id ? { ...l, qty: l.qty + 1 } : l)));
    };

    const decrementLine = (id: string) => {
        setCart((prev) => prev
            .map((l) => (l.productId === id ? { ...l, qty: l.qty - 1 } : l))
            .filter((l) => l.qty > 0));
    };

    const removeLine = (id: string) => {
        setCart((prev) => prev.filter((l) => l.productId !== id));
    };

    const checkout = () => {
        setCart([]);
        cartSidebar.close();
        setOrderPlaced(true);
    };

    const filteredProducts = useMemo(() => {
        const band = priceBands.find((b) => b.value === priceBand) ?? priceBands[0];
        return products
            .filter((p) => (activeCategories.size ? activeCategories.has(p.category) : true))
            .filter((p) => (brand === "all" ? true : p.brand === brand))
            .filter((p) => band.test(p.price))
            .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));
    }, [activeCategories, brand, priceBand, search]);

    const cartCount = cart.reduce((sum, l) => sum + l.qty, 0);
    const cartTotal = cart.reduce((sum, l) => {
        const product = products.find((p) => p.id === l.productId);
        return sum + (product ? product.price * l.qty : 0);
    }, 0);

    return (
        <div className="example-shop-archive">
            <Header sticky navClass="shop-archive-nav" stickyClass="shop-archive-nav-flyout">
                <span className="shop-archive-title">Shop Archive</span>
                <SearchBar placeholder="Search products" onSearch={setSearch} />
                <Button iconName="shopping-cart" onClick={cartSidebar.open}>
                    Cart{cartCount ? ` (${cartCount})` : ""}
                </Button>
            </Header>

            {orderPlaced && (
                <Alert
                    message="Order placed — thank you for shopping with us!"
                    closeAlert={() => setOrderPlaced(false)}
                />
            )}

            <div className="shop-archive-layout">
                <aside className="shop-archive-filters">
                    <Text type="heading" level={5}>Category</Text>
                    {categories.map((category) => (
                        <Toggle
                            key={category}
                            label={category}
                            checked={activeCategories.has(category)}
                            onChange={(checked) => toggleCategory(category, checked)}
                        />
                    ))}

                    <Select
                        label="Brand"
                        options={[
                            { value: "all", element: "All brands", selected: true },
                            ...brands.map((b) => ({ value: b, element: b })),
                        ]}
                        onChange={(value) => setBrand(value as string)}
                    />

                    <Select
                        label="Price"
                        options={priceBands.map((b) => ({ value: b.value, element: b.element, selected: b.value === "any" }))}
                        onChange={(value) => setPriceBand(value as string)}
                    />
                </aside>

                <Container type="section" className="shop-archive-results">
                    {filteredProducts.length ? (
                        <List
                            className="shop-archive-grid"
                            type="process"
                            view="grid"
                            cols={3}
                            mdCols={2}
                            xsCols={1}
                            pageSize={6}
                            data={filteredProducts}
                            listProcessor={(items) => ({
                                elements: items.map((product: Product) => (
                                    <ProductCard key={product.id} product={product} onAdd={addToCart} />
                                )),
                            })}
                        />
                    ) : (
                        <Alert message="No products match your filters." showClose={false} />
                    )}
                </Container>
            </div>

            <cartSidebar.Sidebar
                header={
                    <ActionBar
                        items={[
                            { item: <Text type="heading" level={4} className="cart-sidebar-title">Your cart</Text>, position: "left", key: "title" },
                            { item: <Button shape="circle" type="text" iconName="close" onClick={cartSidebar.close} />, position: "right", key: "close" },
                        ]}
                    />
                }
                footer={
                    <div className="cart-sidebar-footer">
                        <span className="cart-sidebar-total">Total: ${cartTotal}</span>
                        <Button type="primary" disabled={!cart.length} onClick={checkout}>Checkout</Button>
                    </div>
                }
            >
                <div className="cart-sidebar-content">
                    {cart.length ? cart.map((line) => {
                        const product = products.find((p) => p.id === line.productId);
                        if (!product) return null;
                        return (
                            <CartLine
                                key={line.productId}
                                product={product}
                                qty={line.qty}
                                onIncrement={incrementLine}
                                onDecrement={decrementLine}
                                onRemove={removeLine}
                            />
                        );
                    }) : <span className="cart-sidebar-empty">Your cart is empty.</span>}
                </div>
            </cartSidebar.Sidebar>
        </div>
    );
};

export default ShopArchive;
