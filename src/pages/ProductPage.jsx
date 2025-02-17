import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {addComment, removeComment} from "../redux/slices/testAppSlice";


const ProductPage = () =>{
    const {
        itemsOptions
    } = useSelector((state) => state.testApp)

    const dispatch = useDispatch()

    const {id} = useParams()
    const [product, setProduct] = useState([])

    const [newComment, setNewComment] = useState('')
    const [userName, setUserName] = useState('')

    useEffect(()=>{
        const foundProduct = itemsOptions.find((item) => String(item.id) === id)
        setProduct(foundProduct)

    }, [id])

    const handleNewCommentAdd = (e) =>{
        if (newComment && userName){
            const newCommentData ={
                name: userName,
                text: newComment,
                date: new Date().toLocaleString(),
            }
            dispatch(addComment({productId: product.id, comment: newCommentData}))
            setNewComment('')
            setUserName('')
        }
    }

    const handleCommentDelete = (commentId) => {
        dispatch(removeComment({ productId: product.id, commentId }));
    };


    return(
        <div className={'flex flex-col items-center mt-[300px] gap-[50px]'}>
            <div className={'flex flex-col'}>
                <div>Id: {product.id}</div>
                <div>Name: {product.name}</div>
                <div>Weight: {product.weight}</div>
            </div>
            <div>
                Comments Section
                <form>
                    <input type={"text"} value={userName} onChange={(e)=>setUserName(e.target.value)} placeholder={'User Name'}/>
                    <input type={'text'} value={newComment} onChange={(e) => setNewComment(e.target.value)} placeholder={'New Comment'}/>
                    <button onClick={handleNewCommentAdd}>Add comment</button>
                </form>
                <div>
                    Comments:
                    <ul>
                        {
                            product.comments && product.comments.length > 0 ? (
                            product.comments.map((comment, index)=>(
                                <li key={index}>
                                    <h1>{comment.name}</h1>
                                    <p>{comment.text}</p>
                                    <p>{comment.date}</p>
                                    <button onClick={()=> handleCommentDelete(comment.date)}>
                                        Delete Comment
                                    </button>
                                </li>
                            ))
                            ) : (
                                <div>No Comments</div>
                            )
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
}
export default ProductPage