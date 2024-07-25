import Header from "../components/Header";
import ToDoForm from "../components/ToDoForm";
import ToDoList from "../components/ToDoList";
import ToDoContext from "../contexts/ToDoContext";
import ToDoService from "../services/ToDoService";

function Home() {
    // Destructure values and functions from the ToDoService hook
    const { allTodos, toDo, loading, error, getAllToDo, getToDoById, addToDo, editToDo, deleteToDo, setToDo } = ToDoService();

    return (
        <>
            {/* Render the header component */}
            <Header />

            {/* Provide the ToDoContext with necessary values and functions */}
            <ToDoContext.Provider value={{ allTodos, toDo, loading, error, getAllToDo, getToDoById, addToDo, editToDo, deleteToDo, setToDo }}>
                {/* Render the ToDoForm component */}
                <ToDoForm />

                {/* Render the ToDoList component */}
                <ToDoList />
            </ToDoContext.Provider>
        </>
    );
}

export default Home;