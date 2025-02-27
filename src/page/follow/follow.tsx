import { useLocation, Link } from 'react-router';
import FollowSection from '../../components/follow-section/follow-section';
import './follow.css'
export default function Follow() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const type = queryParams.get('type');

  return (
    <>
        <div className='follow-nav'>
            <span className={type == 'followers' ? 'follow-active' : ''}><Link to={`${location.pathname}?type=followers`}>Followers</Link></span>
            <span className={type == 'following' ? 'follow-active' : ''}><Link to={`${location.pathname}?type=following`}>Following</Link></span>
        </div>
        {type == 'followers' ? <FollowSection type='followers' /> : <FollowSection type='following'/>}
    </>
  );
}