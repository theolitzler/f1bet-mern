import { useEffect, useState } from 'react';
import axios from 'axios';
import {API_BASE_URL} from "../services/ApiConfig.jsx";
import { UserOutlined, CrownOutlined } from '@ant-design/icons';
import Navbar from "../components/Navbar.jsx";

const Rankings = () => {
    const [rankings, setRankings] = useState([]);
    const [activeTab, setActiveTab] = useState("general");

    useEffect(() => {
        // Fetch the rankings from the backend
        axios.get(`${API_BASE_URL}/users/rankings`)
            .then(response => {
                setRankings(response.data);
            })
            .catch(error => {
                console.error('Error fetching rankings:', error);
            });
    }, []);

    return (
        <div>
            <Navbar />
            <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg">
                <div className="max-w-4xl mx-auto bg-white shadow-md">
                    <div className="flex justify-between p-4 border-b">
                        <button
                            onClick={() => setActiveTab("general")}
                            className={`p-2 ${
                                activeTab === "general"
                                    ? "text-red-500 border-b-2 border-red-500"
                                    : "text-gray-500"
                            }`}
                        >
                            Général
                        </button>
                        <button
                            onClick={() => setActiveTab("groups")}
                            className={`p-2 ${
                                activeTab === "groups"
                                    ? "text-red-500 border-b-2 border-red-500"
                                    : "text-gray-500"
                            }`}
                        >
                            Groupes
                        </button>
                    </div>
                </div>

                <div className="bg-white pb-4 shadow">
                    <ul className="p-4">
                        {rankings.map((user, index) => (
                            <li key={user.id}
                                className="flex justify-between items-center p-2 bg-gray-100 rounded-lg mb-2">
                                <div className="flex items-center">
                                    <span className="text-lg font-bold mx-4">{index + 1}</span>
                                    {index === 0 ? (
                                        <CrownOutlined className="text-xl text-yellow-500 mr-2"/>
                                    ) : (
                                        <UserOutlined className="text-xl mr-2"/>
                                    )}
                                    <span>{user.username}</span>
                                </div>
                                <span>{user.totalPoints} pts</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div></div>
            </div>

        </div>
    );
};

export default Rankings;