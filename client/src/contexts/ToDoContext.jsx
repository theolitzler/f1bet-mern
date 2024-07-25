// Import the createContext function from the React library
import { createContext } from "react";

// Create a new context called ToDoContext
// This context will be used to manage and share the state of the ToDo application across multiple components
const ToDoContext = createContext();

// Export the ToDoContext to be used in other parts of the application
export default ToDoContext;