import { BrowserRouter, Routes, Route } from 'react-router'
import { useState, createContext } from 'react'
import Layout from './page/layout/layout'
import Home from './page/home/home'
import UserPage from './page/user-page/user-page'
import Follow from './page/follow/follow'
import SignUpForm from './page/signup/signupform'
import LogIn from './page/login/login'
import './App.css'

export type UserInfo = {
  date_created:string,
  email: string,
  first_name: string,
  last_name: string,
  profile_pic: string|null
  profile_background_pic: string|null,
  user_id:string,
  username: string
}

export const UserContext = createContext<UserInfo | null>(null)
function App() {
  const [userInfo, setUserInfo] = useState<UserInfo|null>(null)
  function getUserInfo(info:UserInfo){
    setUserInfo(info)
  }
  return (
    <UserContext.Provider value={userInfo}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout/>}>
            <Route path='*' element={<h1 style={{textAlign:'center'}}>404 Not Found</h1>} />
            <Route path='user/:id' element={<UserPage/>}/>
            <Route path='user/:id/follow' element={<Follow/>}/>
            <Route index element={<Home/>} />
            <Route path='/signup' element={<SignUpForm/>}/>
            <Route path='/login' element={<LogIn next={getUserInfo}/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  )
}

export default App
