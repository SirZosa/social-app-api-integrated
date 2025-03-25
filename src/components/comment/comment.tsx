import './comment.css'
import { Link } from 'react-router'
import { deleteComment } from '../../utils/utils.ts'

type CommentProps = {
    comment_id: string;
    user_id: string;
    username: string;
    comment: string;
    imgSrc: string;
    date: string;
    handleDeleteComment: (commentId: string) => void;
    logged_user_id?:string
}
export default function Comment({comment_id, username, comment, imgSrc, date, handleDeleteComment, logged_user_id, user_id}: CommentProps){
    async function handleDelete(){
        try{
            const deleted = await deleteComment(comment_id)
            if(deleted){
                handleDeleteComment(comment_id);
            }
        }
        catch(e){
            alert('error deleting comment')
        }
    }
    return(
        <div className="comment">
            <img src={imgSrc} alt="profile pic" className="comment-profile-pic" />
            <div className="comment-content">
                <div className="comment-info">
                    <Link to={`/user/${username}`}>
                        <span className="comment-username">{username}</span>
                    </Link>
                    <p className="comment-text">{comment}</p>
                </div>
                <span className="comment-date">{new Date(date).toLocaleString()}</span>
                {logged_user_id == user_id && <button className="delete-btn" onClick={handleDelete}>×</button>}
            </div>
        </div>
    )
}