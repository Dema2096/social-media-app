import { getDocs, collection } from "firebase/firestore"
import { auth, db } from "../../config/firebase"
import { useEffect, useState } from "react"
import Post from "./post"
import { useAuthState } from "react-firebase-hooks/auth"
import { Link } from "react-router-dom"

export interface Post {
    id: string,
    userId: string,
    username: string,
    post: string
}




const Main = () =>{

    const [user] = useAuthState(auth)

    const [postsList, setPostsLists] = useState<Post[] | null>(null)

    const postsRef = collection(db, "posts")

    const getPosts = async () =>{
        const data = await getDocs(postsRef)
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
            (<div>
                <h1>You need to Sign in to see the posts!</h1>
                <Link to="/login">Click here</Link>
            </div>)
        }
        </div>
    )
}

export default Main