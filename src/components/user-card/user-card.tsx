import './user-card.css'
import remove from '../../assets/remove.svg'
import user from '../../assets/user.svg'
import { useState } from 'react'
import { Link } from 'react-router'
import { followUser, unfollowUser, removeFollower } from '../../utils/utils'
export type UserCardProps={
    username: string;
    user_id: string;
    is_following?: number;
    profile_pic?: string;
    removeBtn?: boolean;
}
function UserCardFollowers({username, user_id, is_following, profile_pic, removeBtn}:UserCardProps){
    const [isFollowing, setIsFollowing] = useState(is_following);
    const [isRemoving, setIsRemoving] = useState(false);
    async function handleFollow(){
        try{
            if(isFollowing){
                const unfollowed = await unfollowUser(user_id)
                if(unfollowed){
                    setIsFollowing(0)
                }
            }
            else{
                const followed = await followUser(user_id)
                if(followed){
                    setIsFollowing(1)
                }
            }
        }
        catch(e){
            alert('error following/unfollowing user')
        }
    }

    async function handleRemove(){
        try{
            const removed = await removeFollower(user_id)
            if(removed){
                setIsRemoving(true)
            }
        }
        catch(e){
            alert('error removing user')
        }
    }

    return(
        <div className="user-card">
            <div>
                <img className='user-card-pic' src={profile_pic ? profile_pic : user} alt="user image" />
                <Link to={`/user/${user_id}`}><span>{username}</span></Link>
            </div>
            <div>
                <button className="user-card-follow-btn" onClick={handleFollow}>{isFollowing === 1 ? 'Unfollow' : 'Follow'}</button>
                {!isRemoving && removeBtn && <button className='remove-btn' onClick={handleRemove}><img src={remove} alt="remove icon" /></button>}
            </div>
        </div>
    )
}

function UserCardFollowing({username, user_id, is_following, profile_pic}:UserCardProps){
    const [isFollowing, setIsFollowing] = useState(is_following);
    async function handleFollow(){
        try{
            if(isFollowing){
                const unfollowed = await unfollowUser(user_id)
                if(unfollowed){
                    setIsFollowing(0)
                }
            }
            else{
                const followed = await followUser(user_id)
                if(followed){
                    setIsFollowing(1)
                }
            }
        }
        catch(e){
            alert('error following/unfollowing user')
        }
    }
    return(
        <div className="user-card">
            <div>
                <img className='user-card-pic' src={profile_pic ? profile_pic : user} alt="user image" />
                <Link to={`/user/${user_id}`}><span>{username}</span></Link>
            </div>
            <div>
                <button className="user-card-follow-btn following" onClick={handleFollow}>{isFollowing === 1 ? 'Unfollow' : 'Follow'}</button>
            </div>
        </div>
    )
}

export {UserCardFollowers, UserCardFollowing}