import { FaHome } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { signOutUserFailure, signOutUserStart, signOutUserSuccess } from "../redux/user/userSlice.js";
import { useState } from "react";

export default function Header() {
  const [signingOut, setSigningOut] = useState();
  const currentUser = useSelector((state) => state.user?.user?.currentUser);
  const dispatch = useDispatch();

  const handlerSingout = async() => {
    try {
      setSigningOut(true)
      dispatch(signOutUserStart());
      const res = await fetch(`https://mydashboard-api-backend-side.onrender.com/apis/aply/signout`)
      const data = await res.json();
  
      if(data.success === false) {
        dispatch(signOutUserFailure(data.message));
        return;
      }
      dispatch(signOutUserSuccess(data));
      setSigningOut(false)
    } catch (error) {
      console.error(error);
      dispatch(signOutUserFailure(error.message));
    }
  }

  return (
    <header className="py-5 bg-gray-900 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl text-white flex items-center gap-2">
          <FaHome />
          <span>MyDashboard</span>
        </Link>

        <div className="flex items-center gap-6">
          {currentUser ? (
            <>
              <span className="text-white text-lg">{currentUser.user.username}</span>
              <Link
                to="/dashboard"
                className="bg-green-600 text-white px-4 py-2 rounded-lg shadow hover:bg-green-700 transition duration-300"
              >
                Admin Page
              </Link>
              <button
                onClick={handlerSingout}
                className="bg-red-600 text-white px-4 py-2 rounded-lg shadow hover:bg-red-700 transition duration-300"
              >
                {signingOut ? "Signing out..." : "Sign Out"}
              </button>
            </>
          ) : (
            <Link
              to="/signin"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition duration-300"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
