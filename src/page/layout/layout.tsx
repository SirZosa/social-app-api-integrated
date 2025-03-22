import Navbar from "../../components/navbar/navbar";
import { Outlet, useLocation } from "react-router";
import {useEffect} from 'react'
export default function Layout(){
        const location = useLocation();
        
        useEffect(() => {
          document.body.classList.remove('body-no-scroll');
        }, [location.pathname]);
    return(
        <>
        <Navbar />
        <Outlet />
        </>
    )
}