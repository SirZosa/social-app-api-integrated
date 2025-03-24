import { useState, useEffect } from 'react';
import { getProfileFollowers } from '../utils/utils';
import type { UserCardProps } from '../components/user-card/user-card';

// Create a cache outside the hook to persist data between re-renders
const cache = {
    followers: [] as UserCardProps[],
    page: 1,
    hasMore: true
};

export function useGetFollowers(id: string) {
    const [followers, setFollowers] = useState<UserCardProps[]>(cache.followers);
    const [page, setPage] = useState(cache.page);
    const [isFollowersLoading, setIsFollowersLoading] = useState(false);
    const [hasMore, setHasMore] = useState(cache.hasMore);
    const [followersActive, setFollowersActive] = useState(false);

    function addFollowers(newPosts: UserCardProps[]) {
        setFollowers((prev: UserCardProps[]) => {
            const updatedPosts = prev.concat(newPosts);
            cache.followers = updatedPosts;
            return updatedPosts;
        });
    }

    async function fetchMorePosts(){
        if (isFollowersLoading || !hasMore) return;
        setIsFollowersLoading(true);
        try {
            await getProfileFollowers(id, page, (response) => {
                if (response.hasMore === false) {
                    setIsFollowersLoading(false);
                    cache.hasMore = false;
                    return;
                }
                addFollowers(response.followers);
                setHasMore(response.hasMore);
                cache.hasMore = response.hasMore;
                const nextPage = page + 1;
                setPage(nextPage);
                cache.page = nextPage;
                setIsFollowersLoading(false);
            });
        } catch (e) {
            console.error('Error fetching followers posts:', e);
            setIsFollowersLoading(false);
        }
    }

    useEffect(() => {
        if (followers.length === 0 && followersActive) {
            fetchMorePosts();
        }
    }, [followersActive]);

    useEffect(() => {
        let isThrottled = false;
        const handleScroll = () => {
            if (isThrottled || !followersActive) return;
            isThrottled = true;
            setTimeout(()=>{
                const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
                if (scrollTop + clientHeight >= scrollHeight - 10 && !isFollowersLoading && hasMore) {
                    fetchMorePosts();
                }
                isThrottled = false;
            },250)
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isFollowersLoading, hasMore, followersActive]);

    return {
        followers,
        setFollowers: (newPosts: UserCardProps[] | ((prev: UserCardProps[]) => UserCardProps[])) => {
            if (typeof newPosts === 'function') {
                setFollowers((prev) => {
                    const result = newPosts(prev);
                    cache.followers = result;
                    return result;
                });
            } else {
                setFollowers(newPosts);
                cache.followers = newPosts;
            }
        },
        isFollowersLoading,
        hasMore,
        setFollowersActive
    };
}
