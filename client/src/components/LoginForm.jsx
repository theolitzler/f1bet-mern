import { useState } from "react";
import axios from "axios";

const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:9000/auth/login", { email, password });
            console.log(response.data);
            localStorage.setItem("token", response.data.token);
            // Handle successful login
            // eslint-disable-next-line no-undef
            window.location.href = 'http://localhost:5173/';
        } catch (error) {
            console.error("Login failed", error);
            // Handle login error
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-8 shadow-md rounded-lg">
            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">Email</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
            </div>
            <div className="mb-6">
                <label className="block text-gray-700 font-bold mb-2">Password</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
            </div>
            <button
                type="submit"
                className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
                Login
            </button>
        </form>
    );
};

export default LoginForm;
