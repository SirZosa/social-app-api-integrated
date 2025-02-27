import { useParams } from "react-router";
import {useState} from 'react';
import {Link} from 'react-router'
import Post from "../../components/post/post";
import user from '../../assets/user.svg';
import bg from '../../assets/3001090.jpg'
import './user-page.css'
export default function UserPage(){
    let params = useParams()
    const [posts] = useState([
        {
          imgSrc: user,
          username: `${params.id}`,
          content: "Just had a great day at the park!",
          date: "10:15 2/4/2025"
        },
        {
          imgSrc: user,
          username: `${params.id}`,
          content: "Enjoying the sunset by the beach! 🌅",
          date: "18:45 2/4/2025"
        },
        {
          imgSrc: user,
          username: `${params.id}`,
          content: "New recipe success! 🍝",
          date: "12:30 3/4/2025"
        },
        {
          imgSrc: user,
          username: `${params.id}`,
          content: "Weekend hiking adventures! ⛰️",
          date: "09:00 4/4/2025"
        },
        {
          imgSrc: user,
          username: `${params.id}`,
          content: "Finally finished my project! 💻",
          date: "22:20 5/4/2025"
        }
      ]);
      let postss = posts.map(post =>{
        return(
            <Post imgSrc={post.imgSrc} username={post.username} content={post.content} date={post.date} key={post.username}/>
        )
      })
    return(
        <main>
            <div className="profile-showcase" style={{backgroundImage: `url(${bg})`}}>
                <img className="user-profile-pic" src={user} alt="user image" />
            </div>
            <div className="user-follow-info">
                <p><Link to={`/user/${params.id}/follow?type=followers`}>Followers</Link> <span>30M</span></p>
                <p><Link to={`/user/${params.id}/follow?type=following`}>Following</Link> <span>300K</span></p>
                <button className="user-follow-btn">Follow</button>
            </div>
            <div className="user-info">
                <span className="user-username">{params.id}</span>
                <p className="user-description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque similique mollitia libero odio numquam quis iusto iste, esse ea enim assumenda accusantium</p>
            </div>
            <div className="user-line"></div>
            <section className="user-posts">
                {postss}
            </section>
        </main>
    )
}