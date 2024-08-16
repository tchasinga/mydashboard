import { FaHome } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { signOutUserFailure, signOutUserStart, signOutUserSuccess } from "../redux/user/userSlice.js";
import { useState } from "react";

export default function Header() {
  const [isSignOut, setIsSignOut] = useState(false);
  const currentUser = useSelector((state) => state.user?.user?.currentUser);
  const dispatch = useDispatch();

  const handleSignOut = async () => {
    try {
      setIsSignOut(true);
      dispatch(signOutUserStart());
      const res = await fetch(`https://mydashboard-api-backend-side.onrender.com/apis/aply/signout`);
      const data = await res.json();

      if (!data.success) {
        dispatch(signOutUserFailure(data.message));
        return;
      }
      dispatch(signOutUserSuccess(data));
      setIsSignOut(false);
    } catch (error) {
      console.error(error);
      dispatch(signOutUserFailure(error.message));
    }
  };

  return (
    <div className="py-5">
      <div className="container mx-auto max-w-6xl flex justify-between items-center flex-wrap">
        <div className="text-xl">
          <Link to="/">
            <FaHome />
          </Link>
        </div>

        <div className="flex items-center gap-4">
          {currentUser ? (
            <>
              <div className="text-lg underline">{currentUser.email}</div>
              <Link to="/dashboard" className="cursor-pointer">
                <div className="text-white bg-green-800 p-2 flex justify-center rounded-2xl w-36 hover:bg-orange-800 transition duration-1000">
                  Admin Page
                </div>
              </Link>
              <div
                onClick={handleSignOut}
                className="text-white bg-green-800 p-2 flex justify-center rounded-2xl w-36 cursor-pointer hover:bg-orange-800 transition duration-1000"
              >
                {isSignOut ? "Waiting..." : "Sign Out"}
              </div>
            </>
          ) : (
            <Link to="/signin" className="cursor-pointer">
              <div className="text-white bg-green-800 p-2 flex justify-center rounded-2xl w-36 hover:bg-orange-800 transition duration-1000">
                Sign In
              </div>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}