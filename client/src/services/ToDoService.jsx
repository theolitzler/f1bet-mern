// Import the useState hook from React to manage component state
import { useState } from "react";

// Import axios for making HTTP requests
import axios from 'axios';

// Import the API_BASE_URL constant from the ApiConfig file
import { API_BASE_URL } from "./ApiConfig";

// Import the toast library for displaying notifications
import toast from 'react-hot-toast';

// Define the ToDoService function to manage to-do operations
function ToDoService() {
    // Define state variables
    const [allTodos, setAllToDos] = useState(null);  // State to store all to-dos
    const [toDo, setToDo] = useState(null);  // State to store a single to-do
    const [loading, setLoading] = useState(false);  // State to manage loading state
    const [error, setError] = useState(false);  // State to manage error state

    // Function to get all to-dos
    const getAllToDo = async () => {
        setLoading(true);  // Set loading to true while fetching data
        await axios.get(`${API_BASE_URL}/all`)
            .then((response) => {
                setError(false);  // Reset error state
                setAllToDos(response.data.message);  // Update allTodos state with response data
            })
            .catch((error) => {
                setError(true);  // Set error state to true
                setAllToDos(null);  // Reset allTodos state
                toast.error((error.response && error.response.data.message) || error.message);  // Show error notification
            });
        setLoading(false);  // Set loading to false after fetching data
    }

    // Function to get a to-do by ID
    const getToDoById = async (id) => {
        setLoading(true);  // Set loading to true while fetching data
        await axios.get(`${API_BASE_URL}/${id}`)
            .then((response) => {
                setError(false);  // Reset error state
                setToDo(response.data.message);  // Update toDo state with response data
            })
            .catch((error) => {
                setError(true);  // Set error state to true
                setToDo(null);  // Reset toDo state
                toast.error((error.response && error.response.data.message) || error.message);  // Show error notification
            });
        setLoading(false);  // Set loading to false after fetching data
    }

    // Function to add a new to-do
    const addToDo = async (task, category) => {
        setLoading(true);  // Set loading to true while making request
        await axios.post(`${API_BASE_URL}/new`, { task: task, category: category })
            .then((response) => {
                setError(false);  // Reset error state
                toast.success(response.data.message);  // Show success notification
            })
            .catch((error) => {
                setError(true);  // Set error state to true
                toast.error((error.response && error.response.data.message) || error.message);  // Show error notification
            });
        setLoading(false);  // Set loading to false after request is complete
        getAllToDo();  // Fetch all to-dos to update the list
    }

    // Function to edit an existing to-do
    const editToDo = async (id, task, category, isCompleted) => {
        setLoading(true);  // Set loading to true while making request
        await axios.put(`${API_BASE_URL}/${id}`, { task: task, category: category, isCompleted: isCompleted })
            .then((response) => {
                setError(false);  // Reset error state
                setToDo(null);  // Reset toDo state
                toast.success(response.data.message);  // Show success notification
            })
            .catch((error) => {
                setError(true);  // Set error state to true
                toast.error((error.response && error.response.data.message) || error.message);  // Show error notification
            });
        setLoading(false);  // Set loading to false after request is complete
        getAllToDo();  // Fetch all to-dos to update the list
    }

    // Function to delete a to-do
    const deleteToDo = async (id) => {
        setLoading(true);  // Set loading to true while making request
        await axios.delete(`${API_BASE_URL}/${id}`)
            .then((response) => {
                setError(false);  // Reset error state
                toast.success(response.data.message);  // Show success notification
            })
            .catch((error) => {
                setError(true);  // Set error state to true
                toast.error((error.response && error.response.data.message) || error.message);  // Show error notification
            });
        setLoading(false);  // Set loading to false after request is complete
        getAllToDo();  // Fetch all to-dos to update the list
    }

    // Return the state variables and functions from the service
    return { allTodos, toDo, loading, error, getAllToDo, getToDoById, addToDo, editToDo, deleteToDo, setToDo };
}

export default ToDoService;