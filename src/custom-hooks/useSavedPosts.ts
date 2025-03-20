import { useState, useEffect } from 'react';
import { getSavedPosts } from '../utils/utils';
import type { PostProps } from '../components/post/post';

// Create a cache outside the hook to persist data between re-renders
const cache = {
    savedPosts: [] as PostProps[],
    page: 1,
    hasMore: true
};

export function useSavedPosts() {
    const [savedPosts, setSavedPosts] = useState<PostProps[]>(cache.savedPosts);
    const [page, setPage] = useState(cache.page);
    const [isSaveLoading, setIsSaveLoading] = useState(false);
    const [hasMore, setHasMore] = useState(cache.hasMore);

    function addPosts(newPosts: PostProps[]) {
        setSavedPosts((prev: PostProps[]) => {
            const updatedPosts = prev.concat(newPosts);
            cache.savedPosts = updatedPosts;
            return updatedPosts;
        });
    }

    async function fetchMorePosts(){
        if (isSaveLoading || !hasMore) return;
        setIsSaveLoading(true);
        try {
            await getSavedPosts(page, (response) => {
                if (response.hasMore === false) {
                    setIsSaveLoading(false);
                    cache.hasMore = false;
                    return;
                }
                addPosts(response.posts);
                setHasMore(response.hasMore);
                cache.hasMore = response.hasMore;
                const nextPage = page + 1;
                setPage(nextPage);
                cache.page = nextPage;
                setIsSaveLoading(false);
            });
        } catch (e) {
            console.error('Error fetching saved posts:', e);
            setIsSaveLoading(false);
        }
    }

    useEffect(() => {
        if (savedPosts.length === 0) {
            fetchMorePosts();
        }
    }, []);

    useEffect(() => {
        let isThrottled = false;
        const handleScroll = () => {
            if (isThrottled) return;
            isThrottled = true;
            setTimeout(()=>{
                const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
                if (scrollTop + clientHeight >= scrollHeight - 10 && !isSaveLoading && hasMore) {
                    fetchMorePosts();
                }
                isThrottled = false;
            },250)
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isSaveLoading, hasMore]);

    return {
        savedPosts,
        setSavedPosts: (newPosts: PostProps[] | ((prev: PostProps[]) => PostProps[])) => {
            if (typeof newPosts === 'function') {
                setSavedPosts((prev) => {
                    const result = newPosts(prev);
                    cache.savedPosts = result;
                    return result;
                });
            } else {
                setSavedPosts(newPosts);
                cache.savedPosts = newPosts;
            }
        },
        isSaveLoading,
        hasMore,
    };
}
