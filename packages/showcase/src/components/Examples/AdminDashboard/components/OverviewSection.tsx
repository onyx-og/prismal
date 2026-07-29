import { View, ViewItem, Card, Text, Graph, GraphType, Pie, Table } from "@prismal/react";
import StatusBadge from "./StatusBadge";
import { orders, revenueByMonth, ordersByCategory } from "../mock";
import type { OrderStatus } from "../mock";

interface OverviewSectionProps {
    userCount: number;
}

const totalRevenue = orders.reduce((sum, o) => sum + o.amount, 0);
const avgOrderValue = Math.round(totalRevenue / orders.length);

const recentOrdersData = Object.fromEntries(
    orders.slice(-5).map((o) => [o.id, { Customer: o.customer, Date: o.date, Amount: `$${o.amount}`, Status: o.status }])
);

const OverviewSection = (props: OverviewSectionProps) => {
    const { userCount } = props;

    return (
        <div className="admin-overview">
            <View className="admin-kpi-row" columns={4} cellWidth="1fr" cellHeight={6} gap={1}>
                <ViewItem width={1}>
                    <Card style={{ height: "100%" }} elevation={1} bodyClass="admin-kpi-body">
                        <Text type="body" size="sm" className="admin-kpi-label">Total revenue</Text>
                        <Text type="heading" level={3}>${totalRevenue.toLocaleString()}</Text>
                    </Card>
                </ViewItem>
                <ViewItem width={1}>
                    <Card style={{ height: "100%" }} elevation={1} bodyClass="admin-kpi-body">
                        <Text type="body" size="sm" className="admin-kpi-label">Orders</Text>
                        <Text type="heading" level={3}>{orders.length}</Text>
                    </Card>
                </ViewItem>
                <ViewItem width={1}>
                    <Card style={{ height: "100%" }} elevation={1} bodyClass="admin-kpi-body">
                        <Text type="body" size="sm" className="admin-kpi-label">Customers</Text>
                        <Text type="heading" level={3}>{userCount}</Text>
                    </Card>
                </ViewItem>
                <ViewItem width={1}>
                    <Card style={{ height: "100%" }} elevation={1} bodyClass="admin-kpi-body">
                        <Text type="body" size="sm" className="admin-kpi-label">Avg. order value</Text>
                        <Text type="heading" level={3}>${avgOrderValue}</Text>
                    </Card>
                </ViewItem>
            </View>

            <div className="admin-overview-charts">
                <Card className="admin-revenue-card" elevation={1} header={<Text type="heading" level={5}>Revenue trend</Text>}>
                    <Graph
                        type={GraphType.BAR_VERTICAL}
                        data={revenueByMonth}
                        keys={{ x: "month", y: "revenue" }}
                        className="admin-revenue-graph"
                    />
                </Card>
                <Card className="admin-category-card" elevation={1} header={<Text type="heading" level={5}>Orders by category</Text>}>
                    <div className="admin-category-body">
                        <Pie size={140} data={ordersByCategory} />
                        <ul className="admin-category-legend">
                            {ordersByCategory.map((c) => (
                                <li key={c.name}>
                                    <span className="admin-category-swatch" style={{ backgroundColor: c.color }} />
                                    {c.name} &middot; {c.percentage}%
                                </li>
                            ))}
                        </ul>
                    </div>
                </Card>
            </div>

            <Card elevation={1} header={<Text type="heading" level={5}>Recent orders</Text>}>
                <Table
                    data={recentOrdersData}
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

export default OverviewSection;
