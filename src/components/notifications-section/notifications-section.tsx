import './notifications-section.css'
import Notification from '../notification/notification'
export default function NotificationsSection(){
    return(
        <section className="notification-section">
            <Notification username='ososa' type='like' date='04/11/2025'></Notification>
            <Notification username='ososa' type='comment' date='04/11/2025'></Notification>
            <Notification username='ososa' type='follower' date='04/11/2025'></Notification>
        </section>
    )
}