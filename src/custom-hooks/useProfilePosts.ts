import { useState, useEffect } from 'react';
import { getProfilePosts } from '../utils/utils';
import type { PostProps } from '../components/post/post';

export function useProfilePosts(user_hex_id: string) {
    const [profilePosts, setProfilePosts] = useState<PostProps[]>([]);
    const [page, setPage] = useState(1);
    const [isProfileLoading, setIsProfileLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    function addPosts(newPosts: PostProps[]) {
        setProfilePosts((prev: PostProps[]) => {
            const updatedPosts = prev.concat(newPosts);
            return updatedPosts;
        });
    }

    async function fetchMorePosts(){
        if (isProfileLoading || !hasMore) return;
        setIsProfileLoading(true);
        try {
            await getProfilePosts(user_hex_id,page, (response) => {
                if (response.hasMore === false) {
                    setIsProfileLoading(false);
                    return;
                }
                addPosts(response.posts);
                setHasMore(response.hasMore);
                const nextPage = page + 1;
                setPage(nextPage);
                setIsProfileLoading(false);
            });
        } catch (e) {
            console.error('Error fetching profile posts:', e);
            setIsProfileLoading(false);
        }
    }

    useEffect(() => {
        fetchMorePosts();
    }, []);

    useEffect(() => {
        let isThrottled = false;
        const handleScroll = () => {
            if (isThrottled) return;
            isThrottled = true;
            setTimeout(()=>{
                const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
                if (scrollTop + clientHeight >= scrollHeight - 10 && !isProfileLoading && hasMore) {
                    fetchMorePosts();
                }
                isThrottled = false;
            },250)
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isProfileLoading, hasMore]);

    return {
        profilePosts,
        setProfilePosts: (newPosts: PostProps[] | ((prev: PostProps[]) => PostProps[])) => {
            if (typeof newPosts === 'function') {
                setProfilePosts((prev) => {
                    const result = newPosts(prev);
                    return result;
                });
            } else {
                setProfilePosts(newPosts);
            }
        },
        isProfileLoading,
        hasMore
    };
}
