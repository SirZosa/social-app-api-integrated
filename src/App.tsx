import { BrowserRouter, Routes, Route } from 'react-router'
import { useState, createContext, useEffect } from 'react'
import { getUserInfo } from './utils/utils'
import Layout from './page/layout/layout'
import Home from './page/home/home'
import UserPage from './page/user-page/user-page'
import Follow from './page/follow/follow'
import SignUpForm from './page/signup/signupform'
import LogIn from './page/login/login'
import LogOut from './page/logout/logout'
import PostPage from './page/post-page/post-page'
import SavedPosts from './page/saved-posts/saved-posts'
import './App.css'

export type UserInfo = {
  date_created:string,
  email: string,
  first_name: string,
  last_name: string,
  profile_pic: string
  profile_background_pic: string,
  user_hex_id:string,
  username: string
}

export const UserContext = createContext<UserInfo | null>(null)
function App() {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null)
  useEffect(()=>{
    async function getInfo(){
      const info = await getUserInfo()
      if(info){
        setUserInfo(info)
      }
    }
    getInfo()
  },[])
  return (
    <UserContext.Provider value={userInfo}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout/>}>
            <Route path='*' element={<h1 style={{textAlign:'center'}}>404 Not Found</h1>} />
            <Route path='user/:id' element={<UserPage/>}/>
            <Route path='user/:id/follow' element={<Follow/>}/>
            <Route path='post/:postId' element={<PostPage/>}/>
            <Route path='post/saved' element={<SavedPosts/>}/>
            <Route index element={<Home/>} />
            <Route path='/signup' element={<SignUpForm/>}/>
            <Route path='/login' element={<LogIn/>}/>
            <Route path='/logout' element={<LogOut/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  )
}

export default App
