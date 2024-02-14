import { useForm } from "react-hook-form"
import * as yup from "yup"
import {yupResolver} from "@hookform/resolvers/yup"
import {addDoc, collection, serverTimestamp} from "firebase/firestore"
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
        post: yup.string().required("The post can't be empty").max(230, "Post can't be longer than 230 characters")
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
            userId: user?.uid,
            createdAt: serverTimestamp(),
            userPhoto: user?.photoURL
        })
        navigate("/")
    }


return(
    <div className="">
        <h1 className="mt-5 text-2xl bg-amber-600 p-0.5 rounded-lg text-white sm:w-80  sm:text-center ">Create a new post</h1>
        <form onSubmit={handleSubmit(onCreatePost)} className="mt-12 py-8 px-5 bg-cyan-900 rounded-xl backdrop-blur overflow-hidden resize-none sm:w-80">
            <textarea className=" w-96 h-40 p-3 resize-none border-hidden font-mono bg-white sm:w-64" placeholder="Type here..."{...register("post")}/>
            <p style={{color: "red"}}>{errors.post?.message}</p>
            <input type="submit" className="bg-amber-600 py-2 px-3 mr-6 ml-2.5 rounded-lg text-white cursor-pointer mt-5"/>
        </form>
    </div>
)
}

export default CreateForm