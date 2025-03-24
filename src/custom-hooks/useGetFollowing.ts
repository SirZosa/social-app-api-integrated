import { useState, useEffect } from 'react';
import { getProfileFollowing } from '../utils/utils';
import type { UserCardProps } from '../components/user-card/user-card';

// Create a cache outside the hook to persist data between re-renders
const cache = {
    following: [] as UserCardProps[],
    page: 1,
    hasMore: true
};

export function useGetFollowing(id: string) {
    const [following, setFollowing] = useState<UserCardProps[]>(cache.following);
    const [page, setPage] = useState(cache.page);
    const [isFollowingLoading, setIsFollowingLoading] = useState(false);
    const [hasMore, setHasMore] = useState(cache.hasMore);
    const [followingActive, setFollowingActive] = useState(false);

    function addFollowing(newPosts: UserCardProps[]) {
        setFollowing((prev: UserCardProps[]) => {
            const updatedPosts = prev.concat(newPosts);
            cache.following = updatedPosts;
            return updatedPosts;
        });
    }

    async function fetchMoreFollowing(){
        if (isFollowingLoading || !hasMore) return;
        setIsFollowingLoading(true);
        try {
            await getProfileFollowing(id, page, (response) => {
                if (response.hasMore === false) {
                    setIsFollowingLoading(false);
                    cache.hasMore = false;
                    return;
                }
                addFollowing(response.following);
                setHasMore(response.hasMore);
                cache.hasMore = response.hasMore;
                const nextPage = page + 1;
                setPage(nextPage);
                cache.page = nextPage;
                setIsFollowingLoading(false);
            });
        } catch (e) {
            console.error('Error fetching following posts:', e);
            setIsFollowingLoading(false);
        }
    }

    useEffect(() => {
        if (following.length === 0 && followingActive) {
            fetchMoreFollowing();
        }
    }, [followingActive]);

    useEffect(() => {
        let isThrottled = false;
        const handleScroll = () => {
            if (isThrottled || !followingActive) return;
            isThrottled = true;
            setTimeout(()=>{
                const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
                if (scrollTop + clientHeight >= scrollHeight - 10 && !isFollowingLoading && hasMore) {
                    fetchMoreFollowing();
                }
                isThrottled = false;
            },250)
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isFollowingLoading, hasMore, followingActive]);

    return {
        following,
        setFollowing: (newPosts: UserCardProps[] | ((prev: UserCardProps[]) => UserCardProps[])) => {
            if (typeof newPosts === 'function') {
                setFollowing((prev) => {
                    const result = newPosts(prev);
                    cache.following = result;
                    return result;
                });
            } else {
                setFollowing(newPosts);
                cache.following = newPosts;
            }
        },
        isFollowingLoading,
        hasMore,
        setFollowingActive
    };
}
