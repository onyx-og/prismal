import { useMemo, useState } from "react";
import {
    Header, ActionBar, SearchBar, Button, Tabs, List, Alert,
    Form, TextInput, Select, useModal,
} from "@prismal/react";
import TodoItem from "./components/TodoItem";
import { seedTodos } from "./mock";
import type { Todo } from "./mock";

type Filter = "all" | "active" | "completed";

const priorityOptions = [
    { value: "low", element: "Low" },
    { value: "medium", element: "Medium", selected: true },
    { value: "high", element: "High" },
];

const TodoApp = () => {
    const [todos, setTodos] = useState<Todo[]>(seedTodos);
    const [filter, setFilter] = useState<Filter>("all");
    const [search, setSearch] = useState("");
    const addTodoModal = useModal();

    const toggleTodo = (id: string) => {
        setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
    };

    const deleteTodo = (id: string) => {
        setTodos((prev) => prev.filter((t) => t.id !== id));
    };

    const clearCompleted = () => {
        setTodos((prev) => prev.filter((t) => !t.done));
    };

    const addTodo = (formData: { [key: string]: any }) => {
        const title = (formData.title as string | undefined)?.trim();
        if (!title) return;
        setTodos((prev) => [
            { id: `todo-${Date.now()}`, title, done: false, priority: (formData.priority as Todo["priority"]) || "medium" },
            ...prev,
        ]);
        addTodoModal.close();
    };

    const filteredTodos = useMemo(() => {
        return todos
            .filter((t) => (filter === "all" ? true : filter === "active" ? !t.done : t.done))
            .filter((t) => t.title.toLowerCase().includes(search.toLowerCase()));
    }, [todos, filter, search]);

    const remaining = todos.filter((t) => !t.done).length;

    return (
        <div className="example-todo-app">
            <Header sticky={false} navClass="todo-app-nav">
                <span className="todo-app-title">Todo</span>
                <SearchBar placeholder="Search tasks" onSearch={setSearch} />
                <Button type="primary" iconName="plus" onClick={addTodoModal.open}>Add task</Button>
            </Header>

            <div className="todo-app-tabs-sticky">
                <Tabs
                    tabsClass="todo-app-tabs"
                    data={[
                        { name: "all", label: "All" },
                        { name: "active", label: "Active" },
                        { name: "completed", label: "Completed" },
                    ]}
                    selected={filter}
                    onChange={(name) => setFilter(name as Filter)}
                />
            </div>

            {filteredTodos.length ? (
                <List
                    className="todo-app-list"
                    type="process"
                    data={filteredTodos}
                    pageSize={6}
                    listProcessor={(items) => ({
                        elements: items.map((todo: Todo) => (
                            <TodoItem key={todo.id} todo={todo} onToggle={toggleTodo} onDelete={deleteTodo} />
                        )),
                    })}
                />
            ) : (
                <Alert message="No tasks match this view — add one above." showClose={false} />
            )}

            <ActionBar
                type="secondary"
                items={[
                    {
                        item: <span>{remaining} task{remaining === 1 ? "" : "s"} remaining</span>,
                        position: "left",
                        key: "remaining",
                    },
                    {
                        item: <Button type="text" onClick={clearCompleted}>Clear completed</Button>,
                        position: "right",
                        key: "clear",
                    },
                ]}
            />

            <addTodoModal.Modal title="Add task">
                <Form gridTemplate="1fr" onSubmit={addTodo}>
                    <TextInput name="title" label="Title" required placeholder="What needs doing?" />
                    <Select name="priority" label="Priority" options={priorityOptions} />
                </Form>
            </addTodoModal.Modal>
        </div>
    );
};

export default TodoApp;
