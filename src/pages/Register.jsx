import { useLayoutEffect, useContext } from 'react';
import { Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from '../shared/Services/AuthStore';
import ParticlesComponent from "../shared/Components/Particles/Particles";

export default function Register() {

  const { userData } = useContext(AuthContext);
  const navigate = useNavigate();

  useLayoutEffect(() => {
    if(userData || localStorage.getItem('userToken')) {
      // Return Back if user already Registered
      navigate(-1);
    }
  }, [])

  return (
    <div className="min-h-[100vh] w-full">
      <div className="flex justify-center items-center min-h-[100vh] bg-primary bg-gradient-to-r from-cyan-500 to-blue-500">
        <Outlet />
        <ParticlesComponent /> 
      </div>
    </div>
  )
}
