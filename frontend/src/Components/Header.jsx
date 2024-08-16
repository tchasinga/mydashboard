
import { FaHome } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { signOutUserFailure, signOutUserStart, signOutUserSuccess } from "../redux/user/userSlice.js";


export default function Header() {
    const currentUser = useSelector((state) => state.user && state.user.user.currentUser)
    const dispatch = useDispatch();
    const handlerSingout = async() => {
        try {
          dispatch(signOutUserStart());
          const res = await fetch(`https://dashboard-manager-apis-connection.onrender.com/apis/aply/signout`)
          const data = await res.json();
      
          if(data.success === false) {
            dispatch(signOutUserFailure(data.message));
            return;
          }
          dispatch(signOutUserSuccess(data));
        } catch (error) {
          console.error(error);
          dispatch(signOutUserFailure(error.message));
        }
      }

    return (
    <div className="py-5">
        <div className="mx-auto max-w-6xl flex justify-between items-center w-full flex-wrap">
             
             <div className="text-xl">
               <Link to={'/'} >
               <FaHome />
               </Link>
             </div>

             <div className="">
                {currentUser ? (
                   <div className="flex justify-center items-center gap-4">
                    <div className="text-lg underline">{currentUser.user.email}</div>
                    <Link to="/dashboard" className="cursor-pointer ">
                      <div className="text-white bg-green-800 p-2 flex justify-center rounded-[20px] w-[150px] hover:bg-orange-800 duration-1000">Admin page</div>
                    </Link>
                   </div>
                ) : (
                    <div className="text-lg">
                        <Link to="/signin" className="cursor-pointer">
                            <div className="text-white bg-green-800 p-2 flex justify-center rounded-[20px] w-[150px] hover:bg-orange-800 duration-1000">Sign In</div>
                        </Link>
                    </div>
                )}
             </div>
             {/* Adding a sing-out function */}
                 <div className="text-lg" >
                        <div onClick={handlerSingout} className="text-white bg-green-800 p-2 flex justify-center rounded-[20px] w-[150px] cursor-pointer hover:bg-orange-800 duration-1000">Sign Out</div>
                    </div>
        </div>
    </div>
  )

}
