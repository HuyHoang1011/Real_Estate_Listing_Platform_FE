// import React from "react";
// import { Link } from "react-router-dom";

// export default function Navbar() {
//   return (
//     <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
//       <div className="text-2xl font-bold text-blue-600">
//         <Link to="/">RealEstate</Link>
//       </div>
//       <ul className="flex space-x-6">
//         <li>
//           <Link to="/" className="hover:text-blue-500">Home</Link>
//         </li>
//         <li>
//           <Link to="/properties" className="hover:text-blue-500">Properties</Link>
//         </li>
//         <li>
//           <Link to="/profile" className="hover:text-blue-500">Profile</Link>
//         </li>
//         <li>
//           <Link to="/admin" className="hover:text-blue-500">Admin</Link>
//         </li>
//       </ul>
//     </nav>
//   );
// }
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      <div className="text-2xl font-bold text-blue-600">
        <Link to={user.role === "admin" ? "/admin" : "/home"}>RealEstate</Link>
      </div>
      <ul className="flex space-x-6">
        {user.role !== "admin" && (
          <>
            <li>
                <Link to="/home" className="hover:text-blue-500">
                    Home
                </Link>
            </li>
            <li>
                <Link to="/properties" className="hover:text-blue-500">Properties</Link>
            </li>
            <li>
                <Link to="/profile" className="hover:text-blue-500">Profile</Link>
            </li>
            {/* Các menu khác cho user */}
          </>
        )}
        {user.role === "admin" && (
          <>
            <li>
              <Link to="/admin" className="hover:text-blue-500">
                Admin Dashboard
              </Link>
            </li>
            {/* Các menu khác cho admin */}
          </>
        )}
        <li>
          <button
            onClick={logout}
            className="hover:text-red-500 font-semibold cursor-pointer bg-transparent border-none"
          >
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
}
