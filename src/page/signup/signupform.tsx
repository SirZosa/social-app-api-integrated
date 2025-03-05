import { useState } from 'react'
import { useNavigate } from 'react-router';
import InputField from '../../components/input-field/input-field';
import './signupform.css'

export default function SignUpForm() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("")
  const [password, setPassword] = useState<string>("")
  const [confirmPassword, setConfirmPassword] = useState<string>("")
  const [emailInUse, setEmailInUse] = useState(false)
  const [userNameInUse, setUserNameInUse] = useState(false)
  const [passwordMatch, setPasswordMatch] = useState(true)
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate();

  function submitForm(e: React.FormEvent){
    e.preventDefault();
    setEmailInUse(false)
    setUserNameInUse(false)
    setPasswordMatch(true)
    if(password !== confirmPassword){
      setPasswordMatch(false)
      return
    }
    setLoading(true)
    fetch('http://localhost:3000/v1/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({
        name: firstName,
        lastname: lastName,
        username: userName,
        email: email,
        password: password
      })})
      .then((res)=>{
        if(res.status === 406){
          alert("Please fill all fields with valid data")
        }
        if(res.status === 400){
          setEmailInUse(true)
        }if(res.status === 409){
          setUserNameInUse(true)
        }
        if(res.status === 201){
          setLoading(false)
          navigate('/login?registered=true')
        }
        else{
          alert("Signup Failed");
        }
      }).catch((err)=>{
        alert("Signup Failed");
      }).finally(()=>{
        setLoading(false)
      })
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
      <h1 className='signup-header' style={{textAlign:"center"}}>Signup</h1>
        <form className='signup-form' onSubmit={submitForm}>
          <InputField value={firstName} type="text" fc={(e)=>setFirstName(e.target.value)}>First Name</InputField>
          <InputField value={lastName} type="text" fc={(e)=>setLastName(e.target.value)}>Last Name</InputField>
          <InputField value={userName} type='text' fc={(e) => setUserName(e.target.value)} error={userNameInUse ? "Username already in use." : ""}>User name</InputField>
          <InputField value={email} type="email" fc={(e)=>setEmail(e.target.value)} error={emailInUse ? "Email already in use.": ""}>Email</InputField>
          <InputField value={password} type="password" fc={(e)=>setPassword(e.target.value)} error={!passwordMatch ? "Passwords don't match" : ""}>Password</InputField>
          <InputField value={confirmPassword} type="password" fc={(e)=>setConfirmPassword(e.target.value)}>Confirm Password</InputField>
          <div className="signup-form-buttons">
            <button className='signup-button' disabled={loading}>SUBMIT</button>
            <button className='signup-button' onClick={resetForm} disabled={loading}>RESET</button>
          </div>
        </form>
      </div>
    </>

  )
}
