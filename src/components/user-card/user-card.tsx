import './user-card.css'
import remove from '../../assets/remove.svg'
import user from '../../assets/user.svg'
type UserCardProps={
    username: string;
}
function UserCardFollowers({username}:UserCardProps){
    return(
        <div className="user-card">
            <div>
                <img className='user-card-pic' src={user} alt="user image" />
                <span>{username}</span>
            </div>
            <div>
                <button className="user-card-follow-btn">Follow</button>
                <button className='remove-btn'><img src={remove} alt="remove icon" /></button>
            </div>
        </div>
    )
}

function UserCardFollowing({username}:UserCardProps){
    return(
        <div className="user-card">
            <div>
                <img className='user-card-pic' src={user} alt="user image" />
                <span>{username}</span>
            </div>
            <div>
                <button className="user-card-follow-btn following">Follow</button>
            </div>
        </div>
    )
}

export {UserCardFollowers, UserCardFollowing}