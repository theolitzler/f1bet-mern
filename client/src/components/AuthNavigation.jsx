import { useState } from "react";
import RegistrationForm from "./RegistrationForm";
import LoginForm from "./LoginForm";

const AuthNavigation = () => {
    const [activeTab, setActiveTab] = useState("login");

    return (
        <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg">
            <div className="flex justify-between p-4 border-b">
                <button
                    onClick={() => setActiveTab("login")}
                    className={`p-2 ${activeTab === "login" ? "text-red-500 border-b-2 border-red-500" : "text-gray-500"}`}
                >
                    Login
                </button>
                <button
                    onClick={() => setActiveTab("register")}
                    className={`p-2 ${activeTab === "register" ? "text-red-500 border-b-2 border-red-500" : "text-gray-500"}`}
                >
                    Register
                </button>
            </div>
            <div className="p-4">
                {activeTab === "login" ? <LoginForm /> : <RegistrationForm />}
            </div>
        </div>
    );
};

export default AuthNavigation;
