import { Card, Table, Button, Text } from "@prismal/react";
import type { User } from "../mock";

interface UsersSectionProps {
    users: User[];
    onAddUser: () => void;
}

const UsersSection = (props: UsersSectionProps) => {
    const { users, onAddUser } = props;

    const data = Object.fromEntries(
        users.map((u) => [u.id, { Name: u.name, Email: u.email, Role: u.role }])
    );

    return (
        <div className="admin-users">
            <Card
                elevation={1}
                header={
                    <div className="admin-section-header">
                        <Text type="heading" level={5}>Users</Text>
                        <Button type="primary" iconName="user-plus" onClick={onAddUser}>Add user</Button>
                    </div>
                }
            >
                <Table data={data} />
            </Card>
        </div>
    );
};

export default UsersSection;
