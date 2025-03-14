import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router';
import { getPost, getComments } from '../../utils/utils';
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
    const userInfo = useContext(UserContext);
    useEffect(() => {
        const fetchPostAndComments = async () => {
            if (!postId) return;
            try {
                // Fetch post data
                const postRes = await getPost(postId);
                console.log(postRes)
                setPost(postRes);

                // Fetch comments
                const commentsRes = await getComments(postId, 1);
                setComments(commentsRes);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPostAndComments();
    }, [postId]);

    const handleNewComment = async (comment: string) => {
        try {
            const response = await fetch('http://localhost:3000/v1/comment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({
                    post_id: postId,
                    content: comment
                })
            });

            if (!response.ok) throw new Error('Failed to post comment');

            const newComment = await response.json();
            setComments(prev => [newComment, ...prev]);
            
            // Update comment count in post
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
                <Post {...post} logged_user_id={userInfo.user_hex_id} />
                <div className="post-page-comments">
                    <WriteComment onSubmit={handleNewComment} />
                    <div className="comments-list">
                        {comments.map(comment => (
                            <Comment
                                key={comment.comment_id}
                                imgSrc={comment.profile_pic_url || userPic}
                                username={comment.username}
                                comment={comment.content}
                                date={new Date(comment.date_created).toLocaleString()}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
