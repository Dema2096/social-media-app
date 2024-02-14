import { Link, useNavigate } from "react-router-dom"
import { auth } from "../config/firebase"
import {useAuthState} from "react-firebase-hooks/auth"
import { signOut } from "firebase/auth"


const Navbar = () =>{
    const navigate = useNavigate()
    const [user] = useAuthState(auth)

    const signUserOut = async() =>{
        await signOut(auth)
        navigate("/")
    }


    return(
        <div className="w-full h-20  bg-cyan-800 flex justify-between sm:h-16">
            <Link to="/">
                <div className="flex justify-center rounded-lg p-1 mt-1.5 mb-3 ml-3 bg-green-900 sm:h-12 sm:ml-0.5 sm:w-[76px] md:h-16 md:ml-2 md:w-24">
                    <img src="../../5346913.png" className="h-12 w-12 sm:h-7 sm:w-7 md:h-7 md:w-7" alt="mate society icon"/>
                    <p className="ml-3 p-3 text-3xl font-mono sm:text-xs sm:p-0 sm:ml-0 md:p-0 md:ml-0 md:text-sm">Mate Society</p>
                </div>
            </Link>
            <div className="flex items-center justify-end sm:mr-3 md:mr-5">
                <div className="mr-12 text-center text-white no-underline sm:mr-[66px] md:mr-20">
                    <Link className="m-2.5 bg-indigo-950 p-1.5 rounded-lg sm:text-xs sm:m-[1px] md:text-sm md:m-[1px]" to="/">Home</Link>
                    {!user ? <Link className="m-2.5 bg-indigo-950 p-1.5 rounded-lg sm:text-xs sm:m-[1px] md:text-sm md:m-[1px]" to="/login">Login</Link> : <Link className="m-2.5  bg-indigo-950 p-1.5 rounded-lg sm:text-xs sm:m-[1px] md:text-sm md:m-[1px]" to="/createpost">Create post</Link>}
                </div>
                <div className="flex items-center justify-center mr-12 sm:w-12 sm:mr-8 md:w-12 md:mr-8">
                        {user && (
                            <>
                                <p className="mr-2.5 text-white text-base bg-indigo-950 p-1.5 rounded-lg sm:text-xs sm:mr-1 md:text-sm md:mr-1">@{user?.displayName}</p>
                                <img className="text-base rounded-lg mr-1 sm:mr-0.5 md:mr-0.5" src={user?.photoURL || ""} alt="userprofilepic" width="50" height="50"/>
                                <button className="bg-amber-600 p-1.5 mr-6 ml-2.5 rounded-lg sm:text-xs sm:ml-1 md:text-sm md:ml-1" onClick={signUserOut}>Log out</button>
                            </>
                        )}
                </div>
            </div>
        </div>
    )

}

export default Navbar