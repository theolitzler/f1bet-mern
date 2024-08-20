import { Link } from "react-router-dom";
import { FlagOutlined, OrderedListOutlined, UserOutlined } from "@ant-design/icons";

function Navbar() {
  return (
    <nav className="bg-gray-800 text-white max-w-4xl mx-auto p-4">
      <div className="flex justify-between">
        <div className="space-x-4">
           <Link to="/" className="hover:text-gray-300">
               <FlagOutlined /> Courses
           </Link>
           <Link to="/rankings" className="hover:text-gray-300">
               <OrderedListOutlined /> Classements
           </Link>
        </div>
         <Link to="/profile" className="hover:text-gray-300">
          <UserOutlined />
         </Link>
      </div>
    </nav>
  );
}

export default Navbar;
