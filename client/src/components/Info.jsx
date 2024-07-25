// Define the Info functional component
// This component receives a `message` prop and displays it

function Info({ message }) {
  return (
    <section className="mt-28">
      <p className="text-center">{message}</p>
    </section>
  );
}

// Export the Info component to be used in other parts of the application
export default Info;
