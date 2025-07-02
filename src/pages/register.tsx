import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function RegisterPage() {
    const [username, setUsername] = useState('');
    const [pwd, setPwd] = useState('');
    const router = useRouter();

    const handleRegister = async () => {
        try {
            const res = await axios.post('http://localhost:3500/auth/register', {
                username,
                password: pwd,
            });
            alert(res.data.message); // "User registered successfully"
            router.push('/'); // 跳转到登录页
        } catch (err) {
            if (axios.isAxiosError(err)) {
                alert(err.response?.data?.message || 'Register failed');
                console.error(err);
            }
        }
    };

    return (
        <div className="p-8 max-w-md mx-auto">
            <h1 className="text-xl font-bold mb-4">📝 Register</h1>
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
                onClick={handleRegister}
                className="bg-green-500 text-white px-4 py-2 rounded w-full"
            >
                Register
            </button>
        </div>
    );
}
