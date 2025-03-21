import { getProfile } from '../utils/utils';
import type { ProfileProps } from '../interfaces/interfaces';
import { useState, useEffect } from 'react';

export function useProfile(user_hex_id: string) {
    const [profile, setProfile] = useState<ProfileProps | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const profileData = await getProfile(user_hex_id);
                setProfile(profileData);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching profile:', error);
                setIsLoading(false);
            }
        };

        fetchProfile();
    }, [user_hex_id]);
    
    return { profile, isLoading };
}