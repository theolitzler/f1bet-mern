import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import AuthNavigation from "../components/AuthNavigation";
import Navbar from "../components/Navbar.jsx";

const Profile = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const decoded = jwtDecode(token);
                setIsAuthenticated(true);
                setUser(decoded);
            } catch (error) {
                console.error("Invalid token", error);
                setIsAuthenticated(false);
            }
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsAuthenticated(false);
        navigate("/");
    };

    return (
        <div className="max-w-4xl mx-auto">
            <Navbar />
            {isAuthenticated ? (
                <div>
                    <h1 className="text-2xl font-bold">Profile</h1>
                    <p>Email: {user.email}</p>
                    <button onClick={handleLogout} className="mt-4 bg-red-500 text-white px-4 py-2 rounded">
                        Logout
                    </button>
                </div>
            ) : (
                <AuthNavigation />
            )}
        </div>
    );
};

export default Profile;