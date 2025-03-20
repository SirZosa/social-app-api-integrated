import { useState, useContext } from "react"
import { UserContext } from "../../App"
import { NavLink, useNavigate } from "react-router"
import Burger from "../burger-icon/burger"
import logo from "../../assets/logo.png"
import fb from '../../assets/Facebook.png'
import ig from '../../assets/Instagram.png'
import tw from '../../assets/Twitter.png'
import notification from '../../assets/notification.svg'
import NotificationsSection from "../notifications-section/notifications-section"
import "./navbar.css"
export default function Navbar(){
    const [open, setOpen] = useState<boolean>(false);
    const [notificationsOpen, setNotificationsOpen] = useState(false)
    const userInfo = useContext(UserContext);
    const navigate = useNavigate();
    function onClickProp(){
        setOpen(prev => !prev);
    }
    function handleNotificationBtn(){
        setNotificationsOpen(prev => !prev)
    }
    return(
        <>
        <nav>
            <div className="nav">
                <img src={logo} className="logo" alt="loco icon" onClick={()=> navigate("/")} />
                <div className="nav-links">
                    <NavLink className={({isActive}) => isActive ? "link-active" : ""} to="/">HOME</NavLink>
                    {!userInfo && <NavLink className={({isActive}) => isActive ? "link-active" : ""} to="/login">LogIn</NavLink>}
                    {!userInfo && <NavLink className={({isActive}) => isActive ? "link-active" : ""} to="signup">Sign UP</NavLink>}
                    {userInfo && <NavLink className={({isActive}) => isActive ? "link-active" : ""} to={`/user/${userInfo.user_hex_id}`}>Profile</NavLink>}
                    {userInfo && <NavLink className={({isActive}) => isActive ? "link-active" : ""} to={`/posts/saved`}>Saved Posts</NavLink>}
                    {userInfo && <NavLink className={({isActive}) => isActive ? "link-active" : ""} to="/logout">Log Out</NavLink>}
                    <button className="nav-links-notification-button" onClick={()=>handleNotificationBtn()}><img src={notification} alt="notification icon" /><div className="active-notification"></div></button>
                </div>
                <div className="burger-icon">
                    <button className="nav-links-notification-button" onClick={()=>handleNotificationBtn()}><img src={notification} alt="notification icon" /><div className="active-notification"></div></button>
                    <Burger arial-label="button" arial-value={open} onClickProp={onClickProp} open={open}/>
                </div>
            </div>
            <div className={`nav-container ${open ? 'open' : 'close'}`}>
                <div className="nav-container-links">
                    <NavLink className={({isActive}) => isActive ? "link-active" : ""} onClick={()=> setOpen(false)} to="/">HOME</NavLink>
                    {!userInfo && <NavLink className={({isActive}) => isActive ? "link-active" : ""} onClick={()=> setOpen(false)} to="/login">LOGIN</NavLink>}
                    {!userInfo && <NavLink className={({isActive}) => isActive ? "link-active" : ""} onClick={()=> setOpen(false)} to="signup">SIGN UP</NavLink>}
                    {userInfo && <NavLink className={({isActive}) => isActive ? "link-active" : ""} onClick={()=> setOpen(false)} to={`/user/${userInfo.user_hex_id}`}>Profile</NavLink>}
                    {userInfo && <NavLink className={({isActive}) => isActive ? "link-active" : ""} onClick={()=> setOpen(false)} to={`/posts/saved`}>Saved Posts</NavLink>}
                    {userInfo && <NavLink className={({isActive}) => isActive ? "link-active" : ""} onClick={()=> setOpen(false)} to="/logout">Log Out</NavLink>}
                </div>
                <div className="nav-socials">
                    <a href="#"><img src={ig} alt="instagram logo" /></a>
                    <a href="#"><img src={fb} alt="facebook logo" /></a>
                    <a href="#"><img src={tw} alt="twitter logo" /></a>
                </div>
            </div>
            {notificationsOpen && <NotificationsSection/>}
        </nav>
        </>
    )
}