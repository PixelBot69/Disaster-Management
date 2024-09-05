import { useState } from 'react';
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await login(username, password);
        if (success) {
            navigate('/dashboards'); 
        } else {
            alert('Login failed. Please check your credentials.');
        }
    };

    return (
        <div className="flex h-screen bg-white">
      <div className="w-full max-w-md m-auto bg-red-100 rounded-lg shadow-lg p-8">
        <h1 className="text-4xl text-center text-red-600 font-bold mb-6">
          Login
        </h1>

        <p className="text-center text-gray-600 italic mb-6">
          Welcome back! Please login to your account.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700">User</label>
            <input
              type="text"
              name="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-4 py-2 mt-2 bg-white border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <div>
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} required
              className="w-full px-4 py-2 mt-2 bg-white border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-red-600 text-white py-3 px-6 rounded-full hover:bg-red-500 transition duration-300"
          >
            Login
          </button>
        </form>
      </div>
    </div>
    );
};

export default Login;
