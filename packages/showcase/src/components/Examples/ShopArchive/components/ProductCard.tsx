import { Card, Icon, Text, Button } from "@prismal/react";
import type { Product } from "../mock";

interface ProductCardProps {
    product: Product;
    onAdd: (product: Product) => void;
}

const ProductCard = (props: ProductCardProps) => {
    const { product, onAdd } = props;

    return (
        <Card
            elevation={1}
            padding="m"
            bodyClass="product-card-body"
            header={
                <div className="product-card-photo" style={{ backgroundColor: product.accent }}>
                    <Icon name={product.icon} />
                </div>
            }
        >
            <span className="product-card-brand">{product.brand}</span>
            <Text type="heading" level={4} className="product-card-name">{product.name}</Text>
            <div className="product-card-footer-row">
                <span className="product-card-price">${product.price}</span>
                <Button type="primary" iconName="cart-plus" onClick={() => onAdd(product)}>Add</Button>
            </div>
        </Card>
    );
};

export default ProductCard;
