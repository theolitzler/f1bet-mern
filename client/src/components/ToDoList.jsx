import { useContext, useEffect } from 'react';
import ToDoItem from './ToDoItem';
import Info from './Info';
import ToDoContext from '../contexts/ToDoContext';

function ToDoList() {
    // Get context values and functions using useContext hook
    const { allTodos, getAllToDo, editToDo, deleteToDo, getToDoById, loading, error } = useContext(ToDoContext);

    // Fetch all to-do items when component mounts
    useEffect(() => {
        getAllToDo();
    }, []);

    return (
        <section className="my-4 mx-8">
            {/* Display loading message if data is being fetched */}
            {loading ? (
                <Info message="Loading..." />
            ) : (
                // Render to-do items if data is loaded
                allTodos && allTodos.map((todo) => {
                    return <ToDoItem todo={todo} key={todo._id} deleteToDo={deleteToDo} editToDo={editToDo} getToDoById={getToDoById} />;
                })
            )}

            {/* Display message if there are no to-do items */}
            {
               allTodos && allTodos.length === 0 && <Info message="You have no tasks to complete!" />
            }

            {/* Display error message if there is an error */}
            {
              !loading && error && <Info message="Unable to process your request now. Please try again later!" />
            }
        </section>
    );
}

export default ToDoList;