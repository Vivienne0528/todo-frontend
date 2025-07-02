import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="p-8 bg-white shadow-lg rounded text-center">
        <h1 className="text-2xl font-bold mb-6">🎯 Welcome to Todo App</h1>

        <div className="space-y-4">
          <Link href="/login">
            <button className="bg-blue-500 text-white px-6 py-2 rounded w-full hover:bg-blue-600">
              Login
            </button>
          </Link>

          <Link href="/register">
            <button className="bg-green-500 text-white px-6 py-2 rounded w-full hover:bg-green-600">
              Register
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
