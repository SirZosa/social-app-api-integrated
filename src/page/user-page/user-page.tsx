import { useParams, Link } from "react-router";
import { useState, useContext, useEffect } from 'react';
import Post from '../../components/post/post';
import user from '../../assets/user.svg';
import bg from '../../assets/3001090.jpg'
import { followUser, unfollowUser } from '../../utils/utils';
import './user-page.css'
import { useProfile } from '../../custom-hooks/useProfile';
import { useProfilePosts } from '../../custom-hooks/useProfilePosts';
import {UserContext} from '../../App';
import { Skeleton } from '@mui/material';

export default function UserPage(){
    const { id } = useParams();
    const { profile, isLoading } = useProfile(id!);
    const { profilePosts } = useProfilePosts(id!);
    const [isFollowing, setIsFollowing] = useState(false);
    const userInfo = useContext(UserContext);

    useEffect(() => {
      if (profile) {
        setIsFollowing(profile.isFollowing === 1);
      }
    }, [profile]);

    async function handleFollow(){
      if (!profile) return;
      try{
          if(isFollowing){
              
              const unfollowed = await unfollowUser(profile.user_id)
              if(unfollowed){
                  setIsFollowing(false)
              }
          }
          else{
              const followed = await followUser(profile.user_id)
              if(followed){
                  setIsFollowing(true)
              }
          }
      }
      catch(e){
          alert('error following/unfollowing user')
      }
  }
    if(isLoading) return (
        <main>
            <div className="profile-showcase" style={{backgroundImage: `url(${bg})`}}>
            <img className="user-profile-pic" src={profile && profile.profile_pic ? profile.profile_pic : user} alt="user image" />
            </div>
            <div className="user-follow-info" style={{justifyContent: 'space-around'}}>
                <Skeleton variant="text" width={75} height={40} sx={{ bgcolor: 'rgba(255, 255, 255, 0.2)' }} />
                <Skeleton variant="text" width={75} height={40} sx={{ bgcolor: 'rgba(255, 255, 255, 0.2)' }} />
                <Skeleton variant="text" width={75} height={40} sx={{ bgcolor: 'rgba(255, 255, 255, 0.2)' }} />
            </div>
            <div style={{ padding: '0 20px' }}>
                <Skeleton variant="text" width={125} height={40} sx={{ bgcolor: 'rgba(255, 255, 255, 0.2)' }} style={{ marginBottom: '10px' }} />
                {[1, 2, 3].map((item) => (
                    <div key={item} style={{ marginBottom: '20px' }}>
                        <Skeleton variant="rectangular" height={200} sx={{ bgcolor: 'rgba(255, 255, 255, 0.1)', borderRadius: '8px' }} />
                    </div>
                ))}
            </div>
        </main>
    );
    return(
        <main>
            <div className="profile-showcase" style={{backgroundImage: `url(${bg})`}}>
                <img className="user-profile-pic" src={profile && profile.profile_pic ? profile.profile_pic : user} alt="user image" />
            </div>
            <div className="user-follow-info">
                <p><Link to={`/user/${id}/follow?type=followers`}>Followers</Link> <span>{profile && profile.followerCount}</span></p>
                <p><Link to={`/user/${id}/follow?type=following`}>Following</Link> <span>{profile && profile.followingCount}</span></p>
                {userInfo?.user_hex_id === id ? null : <button className="user-follow-btn" onClick={handleFollow}>{isFollowing ? 'Unfollow' : 'Follow'}</button>}
            </div>
            <div className="user-info">
                <span className="user-username">{profile ? profile.username : id}</span>
                <p className="user-description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque similique mollitia libero odio numquam quis iusto iste, esse ea enim assumenda accusantium</p>
            </div>
            <div className="user-line"></div>
            <section className="user-posts">
              {profilePosts.map((post) => (
                <Post key={post.post_id} {...post} />
              ))}
            </section>
        </main>
    )
}