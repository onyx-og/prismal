export type OrderStatus = "Paid" | "Pending" | "Refunded";
export type Role = "Admin" | "Editor" | "Viewer";

export interface User {
    id: string;
    name: string;
    email: string;
    role: Role;
}

export interface Order {
    id: string;
    customer: string;
    date: string;
    amount: number;
    status: OrderStatus;
}

export const seedUsers: User[] = [
    { id: "u1", name: "Priya Nair", email: "priya.nair@example.com", role: "Admin" },
    { id: "u2", name: "Marcus Webb", email: "marcus.webb@example.com", role: "Editor" },
    { id: "u3", name: "Elena Torres", email: "elena.torres@example.com", role: "Viewer" },
    { id: "u4", name: "Sam O'Connor", email: "sam.oconnor@example.com", role: "Editor" },
    { id: "u5", name: "Yuki Tanaka", email: "yuki.tanaka@example.com", role: "Viewer" },
];

export const orders: Order[] = [
    { id: "ORD-1001", customer: "Priya Nair", date: "2026-07-14", amount: 128, status: "Paid" },
    { id: "ORD-1002", customer: "Marcus Webb", date: "2026-07-16", amount: 64, status: "Pending" },
    { id: "ORD-1003", customer: "Elena Torres", date: "2026-07-18", amount: 212, status: "Paid" },
    { id: "ORD-1004", customer: "Sam O'Connor", date: "2026-07-20", amount: 45, status: "Refunded" },
    { id: "ORD-1005", customer: "Yuki Tanaka", date: "2026-07-22", amount: 98, status: "Paid" },
    { id: "ORD-1006", customer: "Priya Nair", date: "2026-07-23", amount: 156, status: "Pending" },
    { id: "ORD-1007", customer: "Marcus Webb", date: "2026-07-25", amount: 73, status: "Paid" },
    { id: "ORD-1008", customer: "Elena Torres", date: "2026-07-27", amount: 189, status: "Paid" },
];

export const revenueByMonth = [
    { month: "Feb", revenue: 8200 },
    { month: "Mar", revenue: 9100 },
    { month: "Apr", revenue: 8700 },
    { month: "May", revenue: 10400 },
    { month: "Jun", revenue: 11800 },
    { month: "Jul", revenue: 12650 },
];

export const ordersByCategory = [
    { name: "Apparel", percentage: 38, color: "#3a4a5c", label: "38%" },
    { name: "Footwear", percentage: 27, color: "#5c4632", label: "27%" },
    { name: "Accessories", percentage: 20, color: "#7a5c3a", label: "20%" },
    { name: "Home", percentage: 15, color: "#4a5c3f", label: "15%" },
];
