import { useForm } from "react-hook-form"
import * as yup from "yup"
import {yupResolver} from "@hookform/resolvers/yup"
import {addDoc, collection} from "firebase/firestore"
import { db } from "../../config/firebase"
import { auth } from "../../config/firebase"
import {useAuthState} from "react-firebase-hooks/auth"
import { useNavigate } from "react-router-dom"

const CreateForm = () =>{

    const [user] = useAuthState(auth)

    const navigate = useNavigate()

    interface CreateFormData {
        post : string
    }

    const schema = yup.object().shape({
        post: yup.string().required("The post can't be empty")
    })

    const {
        register, 
        handleSubmit,
        formState: {errors}
    } = useForm<CreateFormData>({
        resolver: yupResolver(schema)
    })

    const postsRef = collection(db, "posts")

    const onCreatePost = async (data : CreateFormData) =>{
        await addDoc(postsRef, {
            ...data,
            username: user?.displayName,
            userId: user?.uid
        })
        navigate("/")
    }


return(
    <form onSubmit={handleSubmit(onCreatePost)}>
        <textarea placeholder="Type here..."{...register("post")}/>
        <p style={{color: "red"}}>{errors.post?.message}</p>
        <input type="submit" className="submitForm"/>
    </form>
)
}

export default CreateForm