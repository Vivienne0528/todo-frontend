import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [pwd, setPwd] = useState('');
    const router = useRouter();

    const handleLogin = async () => {
        try {
            const res = await axios.post('https://todo-backend-6ed0.onrender.com/auth/login', {
                username,
                password: pwd,
            });
            localStorage.setItem('token', res.data.accessToken);
            router.push('/todos');
            console.log('登录成功返回的 accessToken:', res.data.accessToken);
        } catch (err) {
            alert('Login failed');
            console.error(err);
        }
    };

    return (
        <div className="p-8 max-w-md mx-auto">
            <h1 className="text-xl font-bold mb-4">🔐 Login</h1>
            <input
                type="text"
                placeholder="Username"
                className="border w-full px-2 py-1 mb-2"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                className="border w-full px-2 py-1 mb-4"
                value={pwd}
                onChange={(e) => setPwd(e.target.value)}
            />
            <button
                onClick={handleLogin}
                className="bg-blue-500 text-white px-4 py-2 rounded w-full"
            >
                Login
            </button>
        </div>
    );
}
