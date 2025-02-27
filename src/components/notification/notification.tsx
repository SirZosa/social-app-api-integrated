import user from '../../assets/user.svg'
import comment from '../../assets/comment.json';
import heart from '../../assets/heart.json';
import LottiePlayer from '../lottie-player/lottie-player';
import newFollower from '../../assets/new_follower.svg'
import './notification.css'
type NotificationProps = {
    username:string;
    date: string;
    type: 'like'|'comment'|'follower'
}
export default function Notification({username, date, type}:NotificationProps){
    let content = type == 'like' ? "Liked a post." : type == 'comment' ? 'Commented a post.' : 'Started following you.'
    let icon = type == 'comment' ? <LottiePlayer animationDataSrc={comment} startFrame={26} endFrame={0} isActive={false} width={40} height={40} autoplay={true} loop={true}/> : type == 'like' ? <LottiePlayer animationDataSrc={heart} startFrame={1} endFrame={0} isActive={false} width={30} height={30} autoplay={true} loop={true}/> : <img style={{width:'30px', height:'30px'}} src={newFollower} alt='newe follower icon'/>

    return(
        <div className="notification">
            <img className='notification-user-pic' src={user} alt="user image" />
            <div className='notification-info'>
                <div className="notification-content">
                    <div className='notification-header'>{icon}<span className='notification-username'>{username}</span></div>
                    <p>{content}</p>
                </div>
                <span className='notification-date'>{date}</span>
            </div>
        </div>
    )
}