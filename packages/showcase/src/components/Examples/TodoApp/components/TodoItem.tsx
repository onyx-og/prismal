import { Card, Toggle, Text, Button } from "@prismal/react";
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
            <span className={`todo-item-priority todo-item-priority-${todo.priority}`}>
                {priorityLabel[todo.priority]}
            </span>
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
