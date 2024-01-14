import { useAuthState } from "react-firebase-hooks/auth"
import CreateForm from "./create-form"
import { auth } from "../../config/firebase"
import { useNavigate } from "react-router-dom"


const CreatePost = () =>{
    const navigate = useNavigate()

    const [user] = useAuthState(auth)

    if(!user){
        navigate("/")
    }


    return(
        <div className="w-full h-auto flex justify-center">
            <CreateForm/>
        </div>
    )
}

export default CreatePost