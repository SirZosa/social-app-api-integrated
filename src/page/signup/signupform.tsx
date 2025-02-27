import { useState } from 'react'
import InputField from '../../components/input-field/input-field';
import './signupform.css'

export default function SignUpForm() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")
  const [userName, setUserName] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  function submitForm(e: React.FormEvent){
    e.preventDefault();
    console.log(firstName)
    console.log(lastName)
    console.log(userName)
    console.log(email)
    console.log(password)
    console.log(confirmPassword)
    alert("Form submitted");
  }
 
  function resetForm(e: React.FormEvent){
    e.preventDefault();
    setFirstName("");
    setLastName("");
    setUserName("")
    setEmail("");
    setPassword("")
    setConfirmPassword("")
  }

  return (
    <>
      <div className="signup-container">
        <form className='signup-form' onSubmit={submitForm}>
          <InputField value={firstName} type="text" fc={(e)=>setFirstName(e.target.value)}>First Name</InputField>
          <InputField value={lastName} type="text" fc={(e)=>setLastName(e.target.value)}>Last Name</InputField>
          <InputField value={userName} type='text' fc={(e) => setUserName(e.target.value)}>User name</InputField>
          <InputField value={email} type="email" fc={(e)=>setEmail(e.target.value)}>Email</InputField>
          <InputField value={password} type="password" fc={(e)=>setPassword(e.target.value)}>Password</InputField>
          <InputField value={confirmPassword} type="password" fc={(e)=>setConfirmPassword(e.target.value)}>Confirm Password</InputField>
          <div className="signup-form-buttons">
            <button className='signup-button'>SUBMIT</button>
            <button className='signup-button' onClick={resetForm}>RESET</button>
          </div>
        </form>
      </div>
    </>

  )
}
