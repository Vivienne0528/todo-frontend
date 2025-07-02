import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axiosInstance from '../utils/axiosInstance';

interface Todo {
    _id: string;
    title: string;
    completed: boolean;
}

export default function TodosPage() {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [newTodo, setNewTodo] = useState('');
    const router = useRouter();

    // 获取 Todos
    useEffect(() => {
        const fetchTodos = async () => {
            try {
                const res = await axiosInstance.get('/todos');
                setTodos(res.data);
            } catch (err: any) {
                if (err.response?.status === 401 || err.response?.status === 403) {
                    router.push('/');
                } else {
                    console.error(err);
                }
            }
        };
        fetchTodos();
    }, []);

    // 添加 Todo
    const handleAdd = async () => {
        if (!newTodo.trim()) return;
        try {
            const res = await axiosInstance.post('/todos', { title: newTodo });
            setTodos([...todos, res.data]);
            setNewTodo('');
        } catch (err) {
            console.error(err);
        }
    };

    // 删除 Todo
    const handleDelete = async (id: string) => {
        try {
            await axiosInstance.delete(`/todos/${id}`);
            setTodos(todos.filter(todo => todo._id !== id));
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="p-8 max-w-xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">📝 Todo List</h1>

            <div className="flex mb-4">
                <input
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    placeholder="Add new todo"
                    className="border border-gray-400 px-2 py-1 flex-1 mr-2"
                />
                <button
                    onClick={handleAdd}
                    className="bg-blue-500 text-white px-4 py-1 rounded"
                >
                    Add
                </button>
            </div>

            <ul className="space-y-2">
                {todos.map((todo) => (
                    <li key={todo._id} className="flex justify-between items-center border-b py-1">
                        <span>{todo.title}</span>
                        <button onClick={() => handleDelete(todo._id)} className="text-red-500">
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
