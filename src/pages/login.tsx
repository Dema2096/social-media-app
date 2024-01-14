import {auth, provider} from "../config/firebase"
import { signInWithPopup } from "firebase/auth"
import { useNavigate } from "react-router-dom"


const Login = () =>{

    const navigate = useNavigate()

    const signInWithGoogle = async () =>{
       const result = await signInWithPopup(auth,provider) 
       navigate("/")
    }


    return(
        <div className="flex justify-center">
            <div className="m-5 bg-cyan-800 p-3 rounded-xl w-96 pb-8">
                 <h1 className="text-xl mt-3 mb-5 bg-cyan-900 rounded-xl py-3">Sign in to continue</h1>
                <div className="bg-amber-600 py-2 px-3 rounded-lg text-white cursor-pointer mb-5 ml-16 flex justify-center gap-3 text-lg w-60">
                    <button  onClick={signInWithGoogle}>Sign in with Google</button>
                    <img className="w-10 h-10" src="../../5847f9cbcef1014c0b5e48c8.png" alt="google icon"/>
                </div>
            </div>
        </div>
    )
}

export default Login