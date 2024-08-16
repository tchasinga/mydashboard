import { useSelector } from "react-redux";

export default function Home() {
  const currentUser = useSelector((state) => state.user && state.user.user.currentUser)
  return (

    <div className="mx-auto flex-col flex min-h-screen justify-center items-center max-w-screen-xl">
       {
        currentUser ?  (
          <div className="text-4xl font-bold text-slate-900">Welcome {currentUser.user.username}</div>
        ) : (
          <div className='text-slate-900'>
            <div className="text-4xl font-bold">Welcome to TechSolve Admin page</div>
            <div className="text-4xl font-bold">Please signin first !</div>
          </div>
        )
       }
    </div>
  )
}
