import { useState } from 'react'
import { useSearchParams } from 'react-router';
import InputField from '../../components/input-field/input-field';

export default function LogIn() {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")
  const [searchParams] = useSearchParams()
  const registered = searchParams.get('registered')

  function submitForm(e: React.FormEvent){
    e.preventDefault();
    setLoading(true)
    fetch('http://localhost:3000/v1/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({
        email: email,
        password: password
      })})
      .then((res)=>{
      if(res.ok){
        alert("Login Successful");
      }else{
        alert("Login Failed");
      }
    }).catch(()=>{
      alert("Login Failed");
    }).finally(()=>{
      setLoading(false)
    })
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
