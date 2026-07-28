export type Priority = "low" | "medium" | "high";

export interface Todo {
    id: string;
    title: string;
    done: boolean;
    priority: Priority;
}

export const seedTodos: Todo[] = [
    { id: "todo-1", title: "Write showcase example plan", done: true, priority: "high" },
    { id: "todo-2", title: "Wire up the Todo app example", done: false, priority: "high" },
    { id: "todo-3", title: "Review Recipe library layout", done: false, priority: "medium" },
    { id: "todo-4", title: "Buy groceries for weekend dinner", done: false, priority: "low" },
    { id: "todo-5", title: "Reply to design feedback thread", done: true, priority: "medium" },
    { id: "todo-6", title: "Prepare admin dashboard mock data", done: false, priority: "medium" },
    { id: "todo-7", title: "Book dentist appointment", done: false, priority: "low" },
    { id: "todo-8", title: "Update dependency versions", done: false, priority: "low" },
    { id: "todo-9", title: "Draft landing page copy", done: false, priority: "high" },
];
