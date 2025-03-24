import './follow-section.css'
import { useParams } from 'react-router'
import { useEffect, useContext } from 'react'
import { UserCardFollowers, UserCardFollowing } from '../user-card/user-card'
import { useGetFollowers } from '../../custom-hooks/useGetFollowers'
import { useGetFollowing } from '../../custom-hooks/useGetFollowing'
import { UserContext } from '../../App'
import SkeletonComponent from '../../components/skeleton/skeleton-component'

type FollowSectionProps = {
    type: 'followers' | 'following'
}
export default function FollowSection({type}:FollowSectionProps){
    const { id } = useParams();
    const { followers, setFollowersActive, isFollowersLoading } = useGetFollowers(id!);
    const { following, setFollowingActive, isFollowingLoading } = useGetFollowing(id!);
    const userInfo = useContext(UserContext);

    const placeHolder = [
        <SkeletonComponent key={1} variant="user-card" />,
        <SkeletonComponent key={2} variant="user-card" />,
        <SkeletonComponent key={3} variant="user-card" />,
        <SkeletonComponent key={4} variant="user-card" />,
        <SkeletonComponent key={5} variant="user-card" />
    ];

    useEffect(() => {
        setFollowersActive(type === 'followers');
        setFollowingActive(type === 'following');
    }, [type]);
    return(
        <div className={`follow-section`}>{type == 'followers' && followers.length > 0 ? followers.map((follower,index) => {
          return(
            <UserCardFollowers removeBtn={userInfo?.user_hex_id === id} key={index} username={follower.username} user_id={follower.user_id} is_following={follower.is_following} profile_pic={follower.profile_pic}/>
          )
        }): type == 'following' && following.length > 0 ? following.map((follow,index) => {
          return(
            <UserCardFollowing key={index} username={follow.username} user_id={follow.user_id} is_following={follow.is_following} profile_pic={follow.profile_pic}/>
          )
        }) : <p style={{textAlign: 'center', color: '#666', margin: '2rem 0'}}>No {type} found</p>}
        {type == 'followers' && isFollowersLoading ? placeHolder : type == 'following' && isFollowingLoading ? placeHolder : null}
        </div>
    )
}