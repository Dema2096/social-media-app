import { getDocs, collection, query, orderBy, serverTimestamp, FieldValue } from "firebase/firestore"
import { auth, db } from "../../config/firebase"
import { useEffect, useState } from "react"
import Post from "./post"
import { useAuthState } from "react-firebase-hooks/auth"
import { Link } from "react-router-dom"
import { Timestamp } from "firebase/firestore"



export interface Post {
    id: string,
    userId: string,
    username: string,
    post: string,
    createdAt: Timestamp
}




const Main = () =>{

    const [user] = useAuthState(auth)

    const [postsList, setPostsLists] = useState<Post[] | null>(null)

    const postsRef = collection(db, "posts")

   const postsDoc = query(postsRef, orderBy("createdAt", "desc"))

    const getPosts = async () =>{
        const data = await getDocs(postsDoc)
        setPostsLists(data.docs.map((doc)=>({...doc.data(), id:doc.id})) as Post[])
    }

    useEffect(()=>{
        getPosts()
    }, [])

    return(
        <div>
        {user? (<div>{postsList?.map((post)=>(
            <Post post={post}/>
        ))}</div>) : 
            (<div className="flex justify-center"> 
                <div className="m-3 bg-cyan-800 p-3 rounded-xl w-96 pb-8">
                    <h1 className="text-xl mt-3 mb-5 bg-cyan-900 rounded-xl py-3">You need to Sign in to see the posts!</h1>
                    <Link className="bg-amber-600 py-2 px-3 rounded-lg text-lg text-white cursor-pointer mb-5" to="/login">Click here</Link>
                </div>
            </div> )
        }
        </div>
    )
}

export default Main