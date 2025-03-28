import { useState, useEffect, useRef, useContext } from "react";
import SkeletonComponent from "../skeleton/skeleton-component";
import WriteComment from "../write-comment/write-comment";
import userPic from '../../assets/user.svg';
import back from '../../assets/back.svg';
import Comment from "../comment/comment";
import { getComments, uploadComment } from "../../utils/utils";
import { UserContext } from "../../App";
import './comment-section.css';

type CommentSectionProps = {
    closeComments: () => void;
    post_id: string;
}

export type CommentData = {
    comment_id: string;
    user_id: string;
    username: string;
    profile_pic_url: string;
    content: string;
    date_created: string;
    post_id: string;
}

const placeHolder = [
    <SkeletonComponent key={1} variant="comment" />,
    <SkeletonComponent key={2} variant="comment" />,
    <SkeletonComponent key={3} variant="comment" />,
    <SkeletonComponent key={4} variant="comment" />,
    <SkeletonComponent key={5} variant="comment" />,
    <SkeletonComponent key={6} variant="comment" />,
    <SkeletonComponent key={7} variant="comment" />,
    <SkeletonComponent key={8} variant="comment" />,
    <SkeletonComponent key={9} variant="comment" />,
    <SkeletonComponent key={10} variant="comment" />,
]

export default function CommentSection({ closeComments, post_id }: CommentSectionProps) {
    const [comments, setComments] = useState<CommentData[]>([]);
    const [page, setPage] = useState(1);
    const [mounted, setMounted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const commentsRef = useRef<HTMLDivElement>(null);
    const userInfo = useContext(UserContext)

    async function fetchComments(){
        if (!hasMore || isLoading) return;
        setIsLoading(true);
        try {
            const newComments = await getComments(post_id, page);
            
            if (newComments.length === 0) {
                setHasMore(false);
            } else {
                setComments(prev => [...prev, ...newComments]);
                setPage(prev => prev + 1);
            }
        } catch (error) {
            console.error('Error fetching comments:', error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        setMounted(true);
        document.body.classList.add('body-no-scroll');
        fetchComments();
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            if (!commentsRef.current) return;
            const { scrollTop, scrollHeight, clientHeight } = commentsRef.current;
            if (scrollTop + clientHeight >= scrollHeight - 10 && !isLoading && hasMore) {
                fetchComments(); // Fetch more posts when the user reaches the bottom
            }
        };

        commentsRef.current?.addEventListener('scroll', handleScroll);
        return () => commentsRef.current?.removeEventListener('scroll', handleScroll);
    }, [isLoading, hasMore]);

    function handleClick() {
        setMounted(false);
        document.body.classList.remove('body-no-scroll');
        setTimeout(() => closeComments(), 300);
    }

    async function handleUploadComment(comment: string) {
        const comment_id = await uploadComment(post_id, comment);
        if(comment_id && userInfo){
            const newComment = {
                comment_id,
                user_id: userInfo.user_hex_id,
                username: userInfo.username,
                profile_pic_url: userInfo.profile_pic,
                content: comment,
                date_created: new Date().toISOString(),
                post_id: post_id
            }
            setComments(prev => [newComment].concat(prev));
        }
    }

    async function handleDeleteComment(commentId: string) {
            setComments(prev => prev.filter(comment => comment.comment_id !== commentId));
    }

    const commentsCards = comments.map((comment) => {
        return <Comment
                user_id={comment.user_id}
                logged_user_id={userInfo?.user_hex_id}
                key={comment.comment_id}
                comment_id={comment.comment_id}
                imgSrc={comment.profile_pic_url ? comment.profile_pic_url : userPic}
                username={comment.username}
                comment={comment.content}
                date={new Date(comment.date_created).toLocaleString()}
                handleDeleteComment={handleDeleteComment}
            />
        ;
    });

    return (
        <section className={`comment-section ${mounted ? 'mounted' : ''}`}>
            <button className="comments-close-btn" onClick={handleClick}>
                <img src={back} alt="back button" className="close-btn-img" />
            </button>
            <div className="comments" ref={commentsRef}>
                {commentsCards.length > 0 ? commentsCards : <p>No comments yet</p>}
                {isLoading && placeHolder}
                {!hasMore && comments.length > 0 && <p className="loading-text">No more comments to load.</p>}
            </div>
            <WriteComment onSubmit={(comment: string) => handleUploadComment(comment)} />
        </section>
    );
}