import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Post from '../../components/post/post';
import WriteComment from '../../components/write-comment/write-comment';
import Comment from '../../components/comment/comment';
import userPic from '../../assets/user.svg';
import './post-page.css';

type PostData = {
    media_url: string;
    username: string;
    user_id: string;
    profile_pic_url: string;
    content: string;
    date_created: string;
    like_count: number;
    comment_count: number;
    post_id: string;
    is_liked?: number;
    is_saved?: number;
};

type CommentData = {
    id: string;
    user_id: string;
    username: string;
    profile_pic: string;
    content: string;
    created_at: string;
};

export default function PostPage() {
    const { postId } = useParams();
    const [post, setPost] = useState<PostData | null>(null);
    const [comments, setComments] = useState<CommentData[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPostAndComments = async () => {
            try {
                // Fetch post data
                const postRes = await fetch(`http://localhost:3000/v1/post/${postId}`, {
                    credentials: 'include'
                });
                if (!postRes.ok) throw new Error('Failed to fetch post');
                const postData = await postRes.json();
                setPost(postData);

                // Fetch comments
                const commentsRes = await fetch(`http://localhost:3000/v1/comments/${postId}`, {
                    credentials: 'include'
                });
                if (!commentsRes.ok) throw new Error('Failed to fetch comments');
                const commentsData = await commentsRes.json();
                setComments(commentsData);
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
                <Post {...post} />
                <div className="post-page-comments">
                    <WriteComment onSubmit={handleNewComment} />
                    <div className="comments-list">
                        {comments.map(comment => (
                            <Comment
                                key={comment.id}
                                imgSrc={comment.profile_pic || userPic}
                                username={comment.username}
                                comment={comment.content}
                                date={new Date(comment.created_at).toLocaleString()}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
