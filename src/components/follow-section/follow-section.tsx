import './follow-section.css'
import { useState } from 'react'
import { UserCardFollowers, UserCardFollowing } from '../user-card/user-card'
type FollowSectionProps = {
    type: 'followers' | 'following'
}
export default function FollowSection({type}:FollowSectionProps){
    const [followers] = useState([{username:'ososa'},{username:'jhon phon'}, {username:'another user'}, {username:'follower section'}])
    const [following] = useState([{username:'ososa'},{username:'jhon phon'}, {username:'another user'}, {username:'following section'}])
    return(
        <div className={`follow-section`}>{type == 'followers' ? followers.map((follower,index) => {
          return(
            <UserCardFollowers key={index} username={follower.username}/>
          )
        }): following.map((follow,index) => {
          return(
            <UserCardFollowing key={index} username={follow.username}/>
          )
        })}</div>
    )
}