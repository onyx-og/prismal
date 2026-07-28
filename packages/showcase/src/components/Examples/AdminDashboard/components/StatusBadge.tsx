import type { OrderStatus } from "../mock";

const StatusBadge = (props: { status: OrderStatus }) => {
    return (
        <span className={`admin-status-badge admin-status-badge-${props.status.toLowerCase()}`}>
            {props.status}
        </span>
    );
};

export default StatusBadge;
