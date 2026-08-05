import { Card, Toggle, Text, Button, Chip } from "@prismal/react";
import type { Todo } from "../mock";

interface TodoItemProps {
    todo: Todo;
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
}

const priorityLabel: Record<Todo["priority"], string> = {
    low: "Low",
    medium: "Medium",
    high: "High",
};

const priorityAccent: Record<Todo["priority"], string> = {
    low: "#32b643",
    medium: "#ffb700",
    high: "#e85600",
};

const TodoItem = (props: TodoItemProps) => {
    const { todo, onToggle, onDelete } = props;

    return (
        <Card elevation={1} padding="s" bodyClass="todo-item-body">
            <Toggle type="switch" checked={todo.done} onChange={() => onToggle(todo.id)} />
            <Text
                type="body"
                size="md"
                className={`todo-item-title${todo.done ? " todo-item-done" : ""}`}
            >
                {todo.title}
            </Text>
            <Chip
                type="primary"
                accent={priorityAccent[todo.priority]}
                label={priorityLabel[todo.priority]}
            />
            <Button
                type="text"
                shape="circle"
                iconName="trash-o"
                onClick={() => onDelete(todo.id)}
            />
        </Card>
    );
};

export default TodoItem;
