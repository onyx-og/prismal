import { ButtonGroup, Button, Text } from "@prismal/react";
import type { Product } from "../mock";

interface CartLineProps {
    product: Product;
    qty: number;
    onIncrement: (id: string) => void;
    onDecrement: (id: string) => void;
    onRemove: (id: string) => void;
}

const CartLine = (props: CartLineProps) => {
    const { product, qty, onIncrement, onDecrement, onRemove } = props;

    return (
        <div className="cart-line">
            <div className="cart-line-info">
                <Text type="body" size="md" className="cart-line-name">{product.name}</Text>
                <span className="cart-line-unit-price">${product.price} each</span>
            </div>
            <ButtonGroup>
                <Button iconName="minus" onClick={() => onDecrement(product.id)} />
                <Button readOnly>{qty}</Button>
                <Button iconName="plus" onClick={() => onIncrement(product.id)} />
            </ButtonGroup>
            <span className="cart-line-total">${product.price * qty}</span>
            <Button type="text" shape="circle" iconName="trash-o" onClick={() => onRemove(product.id)} />
        </div>
    );
};

export default CartLine;
