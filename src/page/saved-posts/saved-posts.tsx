import Post from '../../components/post/post';
import { useSavedPosts } from '../../custom-hooks/useSavedPosts';
import SkeletonComponent from '../../components/skeleton/skeleton-component';
import type { PostProps } from '../../components/post/post';
import { UserContext } from '../../App';
import { useContext } from 'react';


export default function SavedPosts() {
    const { savedPosts,setSavedPosts, isSaveLoading } = useSavedPosts();
    const userInfo = useContext(UserContext);
    
    const placeHolder = [
        <SkeletonComponent key={1} variant="post" />,
        <SkeletonComponent key={2} variant="post" />,
        <SkeletonComponent key={3} variant="post" />,
        <SkeletonComponent key={4} variant="post" />,
        <SkeletonComponent key={5} variant="post" />
    ];

    function handleDelete(post_id: string) {
        setSavedPosts(prev => prev.filter(post => post.post_id !== post_id))
    }

    const renderPosts = (postsData: PostProps[]) => {
        return postsData.map((post) => (
            <Post
                post_id={post.post_id}
                user_id={post.user_id}
                media_url={post.media_url}
                username={post.username}
                content={post.content}
                date_created={post.date_created}
                like_count={post.like_count}
                key={post.post_id}
                profile_pic_url={post.profile_pic_url}
                comment_count={post.comment_count}
                is_liked={post.is_liked}
                is_saved={post.is_saved}
                logged_user_id={userInfo?.user_hex_id}
                handleDelete={handleDelete}
            />
        ));
    };

    const renderContent = () => {
        if (savedPosts.length === 0) {
            return (
                <p style={{textAlign: 'center', color: '#666', margin: '2rem 0'}}>
                    No posts to show
                </p>
            );
        }

        return renderPosts(savedPosts);
    };

    const content = isSaveLoading && savedPosts.length === 0 ? placeHolder : renderContent()

    return (
        <div className="posts-section">
            <h2 style={{textAlign: 'center'}}>Saved Posts</h2>
            {content}
            {isSaveLoading && <SkeletonComponent variant="post" />}
        </div>
    );
}