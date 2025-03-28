import './post.css';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import userPic from '../../assets/user.svg'
import CommentSection from '../comment-section/comment-section.tsx';
import LottiePlayer from '../lottie-player/lottie-player.tsx';
import heart from '../../assets/heart.json';
import save from '../../assets/save.json';
import comment from '../../assets/comment.json';
import { likePost, dislikePost, savePost, removePost, deletePost } from '../../utils/utils.ts';
export type PostProps = {
    media_url: string;
    username: string;
    user_id: string
    profile_pic_url:string
    content: string;
    date_created: string;
    like_count: number;
    comment_count: number;
    post_id: string
    is_liked?: number
    is_saved?:number
    logged_user_id?: string
    handleDelete: (post_id: string) => void
}
export default function Post({
    post_id,
    media_url,
    username,
    content, 
    date_created, 
    like_count, 
    comment_count, 
    profile_pic_url, 
    user_id, 
    is_liked=0, 
    logged_user_id,
    is_saved=0,
    handleDelete 
    }: PostProps){
    const [openComments, setOpenComments] = useState(false)
    const [isLiked, setIsLiked] = useState(is_liked)
    const [likeCount, setLikeCount] = useState(like_count)
    const [isSaved, setIsSaved] = useState(is_saved)
    const navigate = useNavigate()

    async function handleLike(){
        try{
            if(isLiked){
                const disliked = await dislikePost(post_id)
                if(disliked){
                    setIsLiked(prev => {
                        if(prev ==1)return 0
                        return 1
                    })
                    setLikeCount(prev=> prev-1)
                }
            }
            else{
                const liked = await likePost(post_id)
                if(liked){
                    setIsLiked(prev => {
                        if(prev ==1)return 0
                        return 1
                    })
                    setLikeCount(prev=> prev+1)
                }
            }
        }
        catch(e){
            alert('error liking/disliking post')
        }
    }

    async function handleSave(){
        try{
            if(isSaved){
                const removed = await removePost(post_id)
                if(removed){
                    setIsSaved(prev => {
                        if(prev ==1)return 0
                        return 1
                    })
                }
            }
            else{
                const removed = await savePost(post_id)
                if(removed){
                    setIsSaved(prev => {
                        if(prev ==1)return 0
                        return 1
                    })
                }
            }
        }
        catch(e){
            alert('error saving/removing post')
        }
    }

    async function handleDeleteBtn(){
        try{
            const deleted = await deletePost(post_id)
            if(deleted){
                handleDelete(post_id)
            }
        }
        catch(e){
            alert('error deleting post')
        }
    }

    return(
        <article className="post">
            <header className="post-header">
                <img src={profile_pic_url ?? userPic} alt="profile pic" />
                <Link to={`/user/${user_id}`}>
                    <span>{username}</span>
                </Link>
                {logged_user_id == user_id && <button className="delete-btn" onClick={handleDeleteBtn}>×</button>}
            </header>
            <div className="post-content-container" onClick={() => navigate(`/post/${post_id}`)}>
                <p className="post-content">{content}</p>
                {media_url && <img className="post-media" src={media_url} alt="post media" />}
                <span className="date">{new Date(date_created).toLocaleString()}</span>
            </div>
            <div className="icons">
                <div className="likes-icon">
                    <span className="num-of-likes">{likeCount}</span>
                    <LottiePlayer 
                        animationDataSrc={heart} 
                        startFrame={5} 
                        endFrame={10} 
                        isActive={is_liked == 0 ? false : true} 
                        width={30} 
                        height={30}
                        onClick={handleLike}
                    />
                </div>
                <div className="comments-icon">
                    <span className='num-of-comments'>{comment_count}</span>
                    <LottiePlayer animationDataSrc={comment} startFrame={26} endFrame={0} isActive={false} width={40} height={40} autoplay={true} loop={true} onClick={() => setOpenComments(true)}/>
                </div>
                <LottiePlayer 
                    animationDataSrc={save}
                    startFrame={0}
                    endFrame={1} 
                    isActive={is_saved == 0 ? false: true} 
                    width={30} 
                    height={30}
                    onClick={handleSave}
                />
            </div>
            <div className="line"></div>
            {openComments && (<CommentSection closeComments={() => setOpenComments(false)} post_id={post_id}/>)}
        </article>
    )
}