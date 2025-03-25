import { useEffect, useState, useContext, useRef, useCallback } from 'react';
import { useParams } from 'react-router';
import { getPost, getComments, uploadComment } from '../../utils/utils';
import { UserContext } from '../../App';
import Post from '../../components/post-page/post-for-page';
import WriteComment from '../../components/write-comment/write-comment';
import Comment from '../../components/comment/comment';
import userPic from '../../assets/user.svg';
import './post-page.css';
import type { PostProps } from '../../components/post/post';
import type { CommentData } from '../../components/comment-section/comment-section';

export default function PostPage() {
    const { postId } = useParams();
    const [post, setPost] = useState<PostProps | null>(null);
    const [comments, setComments] = useState<CommentData[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const commentsRef = useRef<HTMLDivElement>(null);
    const userInfo = useContext(UserContext);

    // Fetch initial post and comments
    useEffect(() => {
        const fetchPostAndComments = async () => {
            if (!postId) return;
            try {
                const postRes = await getPost(postId);
                console.log(postRes);
                setPost(postRes);

                const commentsRes = await getComments(postId, 1);
                setComments(commentsRes);
                setPage(2); // Set next page to 2 after initial load
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPostAndComments();
    }, [postId]);

    // Memoized fetch comments function
    const fetchComments = useCallback(async () => {
        if (!hasMore || isLoading || !postId) return;
        setIsLoading(true);
        
        try {
            const newComments = await getComments(postId, page);
            
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
    }, [page, hasMore, isLoading, postId]);

    // Scroll event handler
    useEffect(() => {
        const commentsContainer = commentsRef.current;
        if (!commentsContainer) return;

        const handleScroll = () => {
            const buffer = 100; // pixels from bottom to trigger load
            const { scrollTop, scrollHeight, clientHeight } = commentsContainer;
            
            if (scrollHeight - (scrollTop + clientHeight) < buffer && !isLoading && hasMore) {
                fetchComments();
            }
        };

        commentsContainer.addEventListener('scroll', handleScroll);
        return () => commentsContainer.removeEventListener('scroll', handleScroll);
    }, [isLoading, hasMore, fetchComments]);

    async function handleDeleteComment(commentId: string) {
        setComments(prev => prev.filter(comment => comment.comment_id !== commentId));
}

    // Handle new comment submission
    const handleNewComment = async (comment: string) => {
        if (!postId) return;
        try {
            const response = await uploadComment(postId, comment)
            if (!response) throw new Error('Failed to post comment');
            if (!userInfo) return;
            const newComment: CommentData = {
                comment_id: response,
                user_id: userInfo.user_hex_id,
                username: userInfo.username,
                profile_pic_url: userInfo.profile_pic,
                content: comment,
                date_created: new Date().toISOString(),
                post_id: postId
            }
            
            setComments(prev => [newComment, ...prev]);
            
            if (post) {
                setPost({
                    ...post,
                    comment_count: post.comment_count + 1
                });
            }
        } catch (error) {
            console.error('Error posting comment:', error);
            alert('Failed to post comment');
        }
    };

    if (loading) return <div className="post-page-loading">Loading...</div>;
    if (!post) return <div className="post-page-error">Post not found</div>;

    return (
        <div className="post-page">
            <div className="post-page-content">
                <Post {...post} logged_user_id={userInfo?.user_hex_id || undefined} />
                <div className="post-page-comments">
                    <WriteComment onSubmit={handleNewComment} />
                    <div className="comments-list" ref={commentsRef}>
                        {comments.map(comment => (
                            <Comment
                                key={comment.comment_id}
                                imgSrc={comment.profile_pic_url || userPic}
                                username={comment.username}
                                comment={comment.content}
                                date={new Date(comment.date_created).toLocaleString()}
                                comment_id={comment.comment_id}
                                user_id={comment.user_id}
                                handleDeleteComment={handleDeleteComment}
                            />
                        ))}
                        {isLoading && (
                            <div className="loading-indicator">
                                Loading more comments...
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}