import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router';
import Post from '../../components/post/post';
import type { PostProps } from '../../components/post/post';
import SkeletonComponent from '../../components/skeleton/skeleton-component';
import { getPosts } from '../../utils/utils';
import './home.css';

export default function Home() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const type = queryParams.get('type');
    const [posts, setPosts] = useState<PostProps[]>([]);
    const [postsCards, setPostCards] = useState<JSX.Element[]>([]);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false); // To prevent multiple simultaneous fetches
    const [hasMore, setHasMore] = useState(true); // To track if more posts are available

    // Function to add new posts to the existing posts
    function addPosts(newPosts: PostProps[]) {
        setPosts((prev) => prev.concat(newPosts));
    }

    // Function to fetch more posts
    const fetchMorePosts = async () => {
        if (isLoading || !hasMore) return; // Stop if already loading or no more posts are available
        setIsLoading(true);

        getPosts(page, (response) => {
            if (response.hasMore == false){
                console.log('no more posts');
                setIsLoading(false);
                return;
            }

            addPosts(response.posts); // Add the new posts to the state
            setHasMore(response.hasMore); // Update the hasMore flag
            setPage((prev) => prev + 1); // Increment the page
            setIsLoading(false);
        });
    };

    // Initial fetch when the component mounts
    useEffect(() => {
        fetchMorePosts();
    }, []);

    // Update postsCards whenever posts change
    useEffect(() => {
        const postss = posts?.map((post) => (
            <Post
                post_id={post.post_id}
                user_id={post.user_id}
                media_url={post.media_url}
                username={post.username}
                content={post.content}
                date_created={post.date_created}
                like_count={post.like_count}
                key={post.post_id} // Use post_id as the key instead of username
                profile_pic_url={post.profile_pic_url}
                comment_count={post.comment_count}
                is_liked={post.is_liked}
                is_saved={post.is_saved}
                is_following={post.is_following}
            />
        ));
        setPostCards(postss);
    }, [posts]);

    // Add scroll event listener to detect when the user reaches the bottom
    useEffect(() => {
        const handleScroll = () => {
            const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
            if (scrollTop + clientHeight >= scrollHeight - 10 && !isLoading && hasMore) {
                fetchMorePosts(); // Fetch more posts when the user reaches the bottom
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll); // Clean up the event listener
    }, [isLoading, hasMore]); // Re-attach the listener if isLoading or hasMore changes

    return (
        <section className="feed">
            <div className="follow-nav home-follow-nav">
                <span className={type != 'following' ? 'follow-active' : ''}>
                    <Link to={`${location.pathname}`}>For You</Link>
                </span>
                <span className={type == 'following' ? 'follow-active' : ''}>
                    <Link to={`${location.pathname}?type=following`}>Following</Link>
                </span>
            </div>
            {postsCards.length > 0 ? postsCards : <SkeletonComponent variant="post" />}
            {isLoading && <SkeletonComponent variant="post" />} {/* Show loading skeleton while fetching */}
        </section>
    );
}