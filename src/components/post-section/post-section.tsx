import { useState, useContext, useEffect } from 'react';
import Post from '../post/post';
import SkeletonComponent from '../skeleton/skeleton-component';
import PostUploader from '../upload-post/upload-post';
import { uploadPost } from '../../utils/utils';
import { UserContext } from '../../App';
import { usePostFetching } from '../../custom-hooks/usePostFetching';
import { useFolloweePosts } from '../../custom-hooks/useFolloweePosts';
import type { PostProps } from '../post/post';
import './post-section.css';

export default function PostSection({type}: {type: string}) {
    const [errorToUpload, setErrorToUpload] = useState(false);
    const { posts, setPosts, isLoading, setActive } = usePostFetching();
    const { followePosts, isFolloweeLoading, setFolloweeActive } = useFolloweePosts();
    const userInfo = useContext(UserContext);
    const placeHolder = [
        <SkeletonComponent key={1} variant="post" />,
        <SkeletonComponent key={2} variant="post" />,
        <SkeletonComponent key={3} variant="post" />,
        <SkeletonComponent key={4} variant="post" />,
        <SkeletonComponent key={5} variant="post" />
    ];
    
    useEffect(() => {
        setActive(type !== 'following');
        setFolloweeActive(type === 'following');
    }, [type]);

    async function handleUploadPost(content: string, media_url: string | undefined) {
        try {
            const posted = await uploadPost(content, media_url);
            const today = new Date();
            const year = today.getFullYear();
            const month = String(today.getMonth() + 1).padStart(2, '0');
            const day = String(today.getDate()).padStart(2, '0');
            const formattedDate = `${year}-${month}-${day}`;
            
            if (posted && userInfo) {
                const { post_id } = posted;
                const newPost: PostProps = {
                    post_id,
                    user_id: userInfo.user_hex_id,
                    media_url: media_url || '',
                    username: userInfo.username,
                    profile_pic_url: userInfo.profile_pic,
                    content,
                    like_count: 0,
                    comment_count: 0,
                    date_created: formattedDate
                };
                setPosts(prev => [newPost, ...prev]);
                setErrorToUpload(false);
            } else {
                setErrorToUpload(true);
            }
        } catch (e) {
            alert('Could not made the post.');
        }
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
            />
        ));
    };

    const renderContent = () => {
        const currentPosts = type === 'following' ? followePosts : posts;
        if (currentPosts.length === 0) {
            return (
                <p style={{textAlign: 'center', color: '#666', margin: '2rem 0'}}>
                    No posts to show
                </p>
            );
        }

        return renderPosts(currentPosts);
    };

    const content = type === '' && posts.length === 0 && isLoading ? placeHolder : type === 'following' && followePosts.length === 0 && isFolloweeLoading ? placeHolder : renderContent();

    return (
        <div className="posts-section">
            {type !== 'following' && <PostUploader next={handleUploadPost} />}
            {errorToUpload && <p style={{textAlign:'center', color:"red", marginBottom:"1rem"}}>Error, could not be posted.</p>}
            {content}
            {isLoading || isFolloweeLoading && <SkeletonComponent variant="post" />}
        </div>
    );
}