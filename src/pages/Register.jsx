import ParticlesComponent from "../shared/Components/Particles/Particles";
import { Outlet } from "react-router-dom";

export default function Register() {
  return (
    <div className="min-h-[100vh] w-full">
      <div className="flex justify-center items-center min-h-[100vh] bg-primary bg-gradient-to-r from-cyan-500 to-blue-500">
        <Outlet />
        <ParticlesComponent /> 
      </div>
    </div>
  )
}
