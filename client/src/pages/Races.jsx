import Navbar from "../components/Navbar";
import RaceNavigation from "../components/RaceNavigation";
import ToDoService from "../services/ToDoService";

function Home() {
  // Destructure values and functions from the ToDoService hook
  const {
    allTodos,
    toDo,
    loading,
    error,
    getAllToDo,
    getToDoById,
    addToDo,
    editToDo,
    deleteToDo,
    setToDo,
  } = ToDoService();

  return (
    <>
      {/* Render the navbar component */}
      <Navbar />
      <RaceNavigation />
      {/* // Provide the ToDoContext with necessary values and functions
      <ToDoContext.Provider
        value={{
          allTodos,
          toDo,
          loading,
          error,
          getAllToDo,
          getToDoById,
          addToDo,
          editToDo,
          deleteToDo,
          setToDo,
        }}
      >
        // Render the ToDoForm component
        <ToDoForm />
        // Render the ToDoList component
        <ToDoList />
      </ToDoContext.Provider> */}
    </>
  );
}

export default Home;
