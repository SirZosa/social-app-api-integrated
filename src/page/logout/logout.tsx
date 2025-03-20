import { useEffect } from "react"
import {logout} from '../../utils/utils'
import { useNavigate } from "react-router"

export default function LogOut(){
    const navigate = useNavigate();
    useEffect(()=>{
        async function out(){
            const loggedout = await logout();
            if(loggedout){
                navigate('/');
                window.location.reload();
            }
        }
        out();
    },[])
    return(
        <div>
            <h1>Log Out</h1>
        </div>
    )
}
    