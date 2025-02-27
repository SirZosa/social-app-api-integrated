import { BrowserRouter, Routes, Route } from 'react-router'
import Layout from './page/layout/layout'
import Home from './page/home/home'
import UserPage from './page/user-page/user-page'
import Follow from './page/follow/follow'
import SignUpForm from './page/signup/signupform'
import LogIn from './page/login/login'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route path='*' element={<h1 style={{textAlign:'center'}}>404 Not Found</h1>} />
          <Route path='user/:id' element={<UserPage/>}/>
          <Route path='user/:id/follow' element={<Follow/>}/>
          <Route index element={<Home/>} />
          <Route path='/signup' element={<SignUpForm/>}/>
          <Route path='/login' element={<LogIn/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
