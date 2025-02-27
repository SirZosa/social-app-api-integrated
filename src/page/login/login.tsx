import { useState } from 'react'
import InputField from '../../components/input-field/input-field';

export default function LogIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")

  function submitForm(e: React.FormEvent){
    e.preventDefault();
    console.log(email)
    console.log(password)
    alert("Form submitted");
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
