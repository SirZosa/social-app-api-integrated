export interface ProfileProps{
    user_hex_id: string;
    username: string;
    first_name: string;
    last_name: string;
    profile_pic: string;
    profile_background_pic: string;
    date_created: string;
    followerCount: number;
    followingCount: number;
    isFollowing?: number;
    user_id: string;
}