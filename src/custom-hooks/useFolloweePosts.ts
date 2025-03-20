import { useState, useEffect, useRef } from 'react';
import { getFolloweePosts } from '../utils/utils';
import type { PostProps } from '../components/post/post';

// Create a cache outside the hook to persist data between re-renders
const cache = {
    followePosts: [] as PostProps[],
    page: 1,
    hasMore: true
};

export function useFolloweePosts() {
    const [followePosts, setFollowePosts] = useState<PostProps[]>(cache.followePosts);
    const [page, setPage] = useState(cache.page);
    const [isFolloweeLoading, setIsFolloweeLoading] = useState(false);
    const [hasMore, setHasMore] = useState(cache.hasMore);
    const isMounted = useRef(false);

    function addPosts(newPosts: PostProps[]) {
        setFollowePosts((prev: PostProps[]) => {
            const updatedPosts = prev.concat(newPosts);
            cache.followePosts = updatedPosts;
            return updatedPosts;
        });
    }

    async function fetchMorePosts(){
        if (isFolloweeLoading || !hasMore) return;
        setIsFolloweeLoading(true);
        try {
            await getFolloweePosts(page, (response) => {
                if (response.hasMore === false) {
                    setIsFolloweeLoading(false);
                    cache.hasMore = false;
                    return;
                }
                addPosts(response.posts);
                setHasMore(response.hasMore);
                cache.hasMore = response.hasMore;
                const nextPage = page + 1;
                setPage(nextPage);
                cache.page = nextPage;
                setIsFolloweeLoading(false);
            });
        } catch (e) {
            console.error('Error fetching followee posts:', e);
            setIsFolloweeLoading(false);
        }
    }

    useEffect(() => {
        if (!isMounted.current) {
            isMounted.current = true;
            if (followePosts.length === 0) {
                fetchMorePosts();
            }
        }
    }, []);

    useEffect(() => {
        let isThrottled = false;
        const handleScroll = () => {
            if (isThrottled) return;
            isThrottled = true;
            setTimeout(()=>{
                const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
                if (scrollTop + clientHeight >= scrollHeight - 10 && !isFolloweeLoading && hasMore) {
                    fetchMorePosts();
                }
                isThrottled = false;
            },250)
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isFolloweeLoading, hasMore]);

    return {
        followePosts,
        setFollowePosts: (newPosts: PostProps[] | ((prev: PostProps[]) => PostProps[])) => {
            if (typeof newPosts === 'function') {
                setFollowePosts((prev) => {
                    const result = newPosts(prev);
                    cache.followePosts = result;
                    return result;
                });
            } else {
                setFollowePosts(newPosts);
                cache.followePosts = newPosts;
            }
        },
        isFolloweeLoading,
        hasMore
    };
}
