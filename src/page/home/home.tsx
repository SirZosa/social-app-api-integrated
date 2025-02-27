import {useState} from 'react';
import {useLocation, Link} from 'react-router'
import Post from "../../components/post/post";
import user from '../../assets/user.svg';
import './home.css';
export default function Home(){
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const type = queryParams.get('type');
    const [posts] = useState([
        {
          imgSrc: user,
          username: "johndoe",
          content: "Just had a great day at the park!",
          date: "10:15 2/4/2025"
        },
        {
          imgSrc: user,
          username: "aliceb",
          content: "Enjoying the sunset by the beach! 🌅",
          date: "18:45 2/4/2025"
        },
        {
          imgSrc: user,
          username: "bobsmi",
          content: "New recipe success! 🍝",
          date: "12:30 3/4/2025"
        },
        {
          imgSrc: user,
          username: "emmaw",
          content: "Weekend hiking adventures! ⛰️",
          date: "09:00 4/4/2025"
        },
        {
          imgSrc: user,
          username: "mikej",
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
        <section className="feed">
          <div className='follow-nav home-follow-nav'>
            <span className={type != 'following' ? 'follow-active' : ''}><Link to={`${location.pathname}`}>For You</Link></span>
            <span className={type == 'following' ? 'follow-active' : ''}><Link to={`${location.pathname}?type=following`}>Following</Link></span>
          </div>
          {postss ? postss:null }
        </section>
    )
}