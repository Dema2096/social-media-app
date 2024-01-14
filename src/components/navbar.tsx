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
        <div className="w-full h-20  bg-cyan-800 flex justify-between">
            <Link to="/">
                <div className="flex justify-center rounded-lg p-1 mt-1.5 mb-3 ml-3 bg-green-900">
                    <img src="../../5346913.png" className="h-12 w-12 " alt="mate society icon"/>
                    <p className="ml-3 p-3 text-3xl font-mono">Mate Society</p>
                </div>
            </Link>
            <div className="flex items-center justify-end">
                <div className="mr-12 text-center text-white no-underline ">
                    <Link className="m-2.5 bg-indigo-950 p-1.5 rounded-lg" to="/">Home</Link>
                    {!user ? <Link className="m-2.5 bg-indigo-950 p-1.5 rounded-lg" to="/login">Login</Link> : <Link className="m-2.5  bg-indigo-950 p-1.5 rounded-lg" to="/createpost">Create post</Link>}
                </div>
                <div className="flex items-center justify-center mr-12">
                        {user && (
                            <>
                                <p className="mr-2.5 text-white text-base bg-indigo-950 p-1.5 rounded-lg">@{user?.displayName}</p>
                                <img className="text-base rounded-lg mr-2" src={user?.photoURL || ""} alt="userprofilepic" width="50" height="50"/>
                                <button className="bg-amber-600 p-1.5 mr-6 ml-2.5 rounded-lg" onClick={signUserOut}>Log out</button>
                            </>
                        )}
                </div>
            </div>
        </div>
    )

}

export default Navbar