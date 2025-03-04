import { useState } from 'react'
import InputField from '../../components/input-field/input-field';

export default function LogIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")

  function submitForm(e: React.FormEvent){
    e.preventDefault();
    fetch('http://localhost:3000/v1/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({
        email: email,
        password: password
      },
      
    )
    }).then((res)=>{
      console.log(res)
      if(res.ok){
        alert("Login Successful");
      }else{
        alert("Login Failed");
      }
    })
  }

  return (
    <>
      <div className="signup-container">
        <form className='signup-form' onSubmit={submitForm}>
          <InputField value={email} type="email" fc={(e)=>setEmail(e.target.value)}>Email</InputField>
          <InputField value={password} type="password" fc={(e)=>setPassword(e.target.value)}>Password</InputField>
          <div className="signup-form-buttons">
            <button className='signup-button'>LogIn</button>
          </div>
        </form>
      </div>
    </>

  )
}
