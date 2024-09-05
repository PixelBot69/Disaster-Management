import { useState } from 'react';
import img from '../assets/img1.png';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await register(username, email, password);
        if (success) {
            navigate('/login'); 
        } else {
            alert('Registration failed. Please try again.');
        }
    };

    return (
        <div className="flex h-screen bg-white">
      <div className="w-full max-w-md m-auto bg-red-100 rounded-lg shadow-lg p-8">
        <img
          src={img}
          alt="Supportive Image"
          className="w-3/4 h-auto mx-auto mb-6"
        />

        <h1 className="text-4xl text-center text-red-600 font-bold mb-6">
          Register
        </h1>

        <p className="text-center text-gray-600 italic mb-6">
          Join us in turning compassion into action. Your participation matters.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-4 py-2 mt-2 bg-white border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 mt-2 bg-white border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-red-600 text-white py-3 px-6 rounded-full hover:bg-red-500 transition duration-300"
          >
            Register
          </button>
        </form>
      </div>
    </div>
    );
};

export default Register;
