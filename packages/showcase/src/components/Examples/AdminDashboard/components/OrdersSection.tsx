import { Card, Table, Text } from "@prismal/react";
import StatusBadge from "./StatusBadge";
import { orders } from "../mock";
import type { OrderStatus } from "../mock";

const data = Object.fromEntries(
    orders.map((o) => [o.id, { Customer: o.customer, Date: o.date, Amount: `$${o.amount}`, Status: o.status }])
);

const OrdersSection = () => {
    return (
        <div className="admin-orders">
            <Card elevation={1} header={<Text type="heading" level={5}>All orders</Text>}>
                <Table
                    data={data}
                    cellRenderer={({ data, coords }) => {
                        const key = `${coords ? coords.concat() : ""}`;
                        if (coords && coords[1] === "Status") {
                            return <td key={key}><StatusBadge status={data as OrderStatus} /></td>;
                        }
                        return <td key={key}>{data}</td>;
                    }}
                />
            </Card>
        </div>
    );
};

export default OrdersSection;
