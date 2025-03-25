import { useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router';
import InputField from '../../components/input-field/input-field';

export default function LogIn() {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")
  const [searchParams] = useSearchParams()
  const registered = searchParams.get('registered')
  const navigate = useNavigate();

  async function submitForm(e: React.FormEvent){
    e.preventDefault();
    setLoading(true)
    try{
      const res = await fetch('https://social-app-backend-xcpr.onrender.com/v1/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
          email: email,
          password: password
        })})
        if(res.status == 200){
          navigate('/')
          window.location.reload();
        }
    }
    catch(e){
      alert('Could not log in')
    }
  }

  return (
    <>
      <div className="signup-container">
        {registered && <p className='signup-success' style={{textAlign:'center', color:"green", marginBottom:"1rem"}}>Registration Successful.</p>}
        <h1 className='signup-header' style={{textAlign:"center"}}>Log In</h1>
        <form className='signup-form' onSubmit={submitForm}>
          <InputField value={email} type="email" fc={(e)=>setEmail(e.target.value)}>Email</InputField>
          <InputField value={password} type="password" fc={(e)=>setPassword(e.target.value)}>Password</InputField>
          <div className="signup-form-buttons">
            <button className='signup-button' disabled={loading}>LogIn</button>
          </div>
        </form>
      </div>
    </>

  )
}
