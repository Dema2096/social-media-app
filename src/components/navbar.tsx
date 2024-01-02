import { Link } from "react-router-dom"
import { auth } from "../config/firebase"
import {useAuthState} from "react-firebase-hooks/auth"


const Navbar = () =>{
    const [user] = useAuthState(auth)



    return(
        <div className="navbar">
            <div className="links">
                <Link to="/">Home</Link>
                <Link to="/login">Login</Link>
                <div className="user">
                    <p>{user?.displayName}</p>
                    <img src={user?.photoURL || ""} alt="userprofilepic" width="30" height="30"/>
                    <button>Log out</button>
                </div>
            </div>
        </div>
    )

}

export default Navbar