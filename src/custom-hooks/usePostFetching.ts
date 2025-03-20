import { useState, useEffect } from 'react';
import { getPosts } from '../utils/utils';
import type { PostProps } from '../components/post/post';

// Create a cache outside the hook to persist data between re-renders
const cache = {
    posts: [] as PostProps[],
    page: 1,
    hasMore: true
};

export function usePostFetching() {
    const [posts, setPosts] = useState<PostProps[]>(cache.posts);
    const [page, setPage] = useState(cache.page);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(cache.hasMore);

    function addPosts(newPosts: PostProps[]) {
        setPosts((prev: PostProps[]) => {
            // Filter out duplicates based on post_id
            const uniqueNewPosts = newPosts.filter(
                (newPost) => !prev.some((post) => post.post_id === newPost.post_id)
            );
            const updatedPosts = prev.concat(uniqueNewPosts);
            cache.posts = updatedPosts;
            return updatedPosts;
        });
    }

    const fetchMorePosts = async () => {
        if (isLoading || !hasMore) return;
        setIsLoading(true);
        try {
            getPosts(page, (response) => {
                if (response.hasMore === false) {
                    setIsLoading(false);
                    cache.hasMore = false;
                    return;
                }
                addPosts(response.posts);
                const nextPage = page + 1;
                setPage(nextPage);
                cache.hasMore = response.hasMore;
                cache.page = nextPage;
                setIsLoading(false);
                setHasMore(response.hasMore);
            });
        } catch (e) {
            console.error('Error fetching posts:', e);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (posts.length === 0) {
            fetchMorePosts();
        }
    }, []);

    useEffect(() => {
        let isThrottled = false;
        const handleScroll = () => {
            if (isThrottled) return;
            isThrottled = true;

            setTimeout(() => {
                const { scrollTop, scrollHeight, clientHeight} = document.documentElement;
                if (scrollTop + clientHeight >= scrollHeight - 10 && !isLoading && hasMore) {
                    console.log('triggered');
                    fetchMorePosts();
                }
                isThrottled = false;
            }, 250); // Throttle for 500ms
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isLoading, hasMore]);

    return {
        posts,
        setPosts: (newPosts: PostProps[] | ((prev: PostProps[]) => PostProps[])) => {
            if (typeof newPosts === 'function') {
                setPosts((prev) => {
                    const result = newPosts(prev);
                    cache.posts = result;
                    return result;
                });
            } else {
                setPosts(newPosts);
                cache.posts = newPosts;
            }
        },
        isLoading,
        hasMore
    };
}