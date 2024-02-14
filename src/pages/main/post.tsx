import { Post as IPost } from "./main"
import { auth, db } from "../../config/firebase"
import { collection, addDoc, query, where, getDocs, deleteDoc, doc } from "firebase/firestore"
import { useAuthState } from "react-firebase-hooks/auth"
import { useEffect, useState } from "react"
import moment from "moment"



interface Props {
    post: IPost
}

interface Like {
    likeId: string,
    userId: string
}


const Post = (props : Props) =>{
    
    const [user] = useAuthState(auth)
    const {post} = props
    const [likes, setLikes] = useState<Like[] | null>(null)

    const likesRef = collection(db, "likes")

    const likesDoc = query(likesRef, where("postId", "==", post.id ))

    const getLikes = async () =>{
       const data = await getDocs(likesDoc)
       setLikes(data.docs.map((doc)=>({userId: doc.data().userId, likeId : doc.id})))
    }

    const addLike = async () =>{
        try{
            const newDoc = await addDoc(likesRef, {
                userId: user?.uid , postId: post.id
              })
              if(user){
                  setLikes((prev)=> prev ? [...prev, {userId: user?.uid, likeId: newDoc.id}] : [{userId: user?.uid, likeId: newDoc.id}]) 
              }
        }
        catch(err){
            console.log(err)
        }
    }

    const removeLike = async () =>{
        try{
            const likeToDeleteQuery = query(likesRef, where("postId", "==", post.id ), where("userId", "==", user?.uid))
            const likeToDeleteData = await getDocs(likeToDeleteQuery)
            const likeId = likeToDeleteData.docs[0].id
            const likeToDelete = doc(db, "likes", likeId )

            await deleteDoc(likeToDelete)
              if(user){
                  setLikes((prev)=> prev && prev.filter((like)=>like.likeId !== likeId)) 
              }
        }
        catch(err){
            console.log(err)
        }
    }

    const hasUserLiked = likes?.find((like) => like.userId === user?.uid)

   

    useEffect(()=>{
        getLikes()
    }, [])

    return(
        <div className="flex justify-center ">
            <div className="bg-cyan-800 rounded-xl m-5 w-[500px] max-h-[1000px] font-mono p-3 sm:h-58 sm:w-80 md:h-58 md:w-96">
                <div className="flex mb-2">
                    <img className="rounded-xl w-12 h-12" src={post.userPhoto || ""} alt="userprofilepic"/>
                    <p className="text-lg bg-cyan-900 mt-0.5 mb-1 ml-1 p-2 sm:text-xs md:text-sm">@{post.username}</p>
                </div>
                <div className="bg-cyan-900 p-3 rounded-xl text-xl max-w-[490px] sm:text-xs md:text-sm">
                    <p className="text-center w-[450px] break-words text-wrap sm:w-[270px] md:w-[335px]">{post.post}</p>
                    <div className="flex mt-3 gap-2">
                        <p className="text-xs">{post.createdAt.toDate().toDateString()}</p>
                        <p className="text-xs">{post.createdAt.toDate().toLocaleTimeString()}</p>
                    </div>
                </div>
                <div className="flex justify-between">
                    <button className="text-xl m-3 py-1 px-2 bg-amber-600 rounded-lg sm:text-xs md:text-sm" onClick={hasUserLiked ? removeLike :addLike}>{hasUserLiked ? <>&#128078;</> : <>&#128077;</> }</button>
                    {likes && <p className="text-lg m-3 p-2 bg-amber-600 rounded-lg sm:text-xs md:text-sm">Likes: {likes?.length}</p>}
                </div>
            </div>
        </div>
    )
}

export default Post