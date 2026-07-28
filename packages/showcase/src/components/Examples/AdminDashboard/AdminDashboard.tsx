import { useState } from "react";
import {
    ActionBar, SearchBar, Icon, Menu, Dropdown, Button,
    Form, TextInput, Select, useModal,
} from "@prismal/react";
import OverviewSection from "./components/OverviewSection";
import UsersSection from "./components/UsersSection";
import OrdersSection from "./components/OrdersSection";
import SettingsSection from "./components/SettingsSection";
import { seedUsers } from "./mock";
import type { User } from "./mock";

type Section = "overview" | "users" | "orders" | "settings";

const navItems: { name: Section; label: string; icon: string }[] = [
    { name: "overview", label: "Overview", icon: "dashboard" },
    { name: "users", label: "Users", icon: "users" },
    { name: "orders", label: "Orders", icon: "shopping-cart" },
    { name: "settings", label: "Settings", icon: "cog" },
];

const roleOptions = [
    { value: "Admin", element: "Admin" },
    { value: "Editor", element: "Editor", selected: true },
    { value: "Viewer", element: "Viewer" },
];

const AdminDashboard = () => {
    const [activeSection, setActiveSection] = useState<Section>("overview");
    const [users, setUsers] = useState<User[]>(seedUsers);
    const addUserModal = useModal();

    const addUser = (formData: { [key: string]: any }) => {
        const name = (formData.name as string | undefined)?.trim();
        const email = (formData.email as string | undefined)?.trim();
        if (!name || !email) return;
        setUsers((prev) => [
            ...prev,
            { id: `u-${Date.now()}`, name, email, role: (formData.role as User["role"]) || "Viewer" },
        ]);
        addUserModal.close();
    };

    return (
        <div className="example-admin-dashboard">
            <aside className="admin-nav">
                <div className="admin-nav-brand">Prismal Admin</div>
                <Menu
                    className="admin-nav-menu"
                    data={navItems.map((item) => ({
                        label: item.label,
                        icon: <Icon name={item.icon} />,
                        onClick: () => setActiveSection(item.name),
                        className: item.name === activeSection ? "admin-nav-item-active" : "",
                    }))}
                />
            </aside>

            <div className="admin-main">
                <ActionBar
                    className="admin-topbar"
                    type="secondary"
                    items={[
                        { item: <SearchBar placeholder="Search" />, position: "left", key: "search" },
                        {
                            item: (
                                <Dropdown type="default" toggleElement={<Button shape="circle" iconName="bell" />}>
                                    <ul className="admin-notifications">
                                        <li>Order ORD-1008 was paid.</li>
                                        <li>Sam O'Connor requested a refund.</li>
                                        <li>Weekly report is ready.</li>
                                    </ul>
                                </Dropdown>
                            ),
                            position: "right",
                            key: "notifications",
                        },
                        {
                            item: (
                                <Dropdown type="default" toggleElement={<span className="admin-user-toggle"><Icon name="user-circle" /> Priya</span>}>
                                    <Menu
                                        data={[
                                            { label: "Settings", icon: <Icon name="cog" />, onClick: () => setActiveSection("settings") },
                                            { label: "Sign out", icon: <Icon name="sign-out" /> },
                                        ]}
                                    />
                                </Dropdown>
                            ),
                            position: "right",
                            key: "user-menu",
                        },
                    ]}
                />

                <div className="admin-content">
                    {activeSection === "overview" && <OverviewSection userCount={users.length} />}
                    {activeSection === "users" && <UsersSection users={users} onAddUser={addUserModal.open} />}
                    {activeSection === "orders" && <OrdersSection />}
                    {activeSection === "settings" && <SettingsSection />}
                </div>
            </div>

            <addUserModal.Modal title="Add user">
                <Form gridTemplate="1fr" onSubmit={addUser}>
                    <TextInput name="name" label="Name" required placeholder="Full name" />
                    <TextInput name="email" label="Email" htmlType="email" required placeholder="name@example.com" />
                    <Select name="role" label="Role" options={roleOptions} />
                </Form>
            </addUserModal.Modal>
        </div>
    );
};

export default AdminDashboard;
