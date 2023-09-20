import Particles from "react-tsparticles"; 
import { loadFull } from "tsparticles"; 
import { Particlesjs } from './particlesjs-config.js'

export default function ParticlesComponent() {

  const particlesInit = async (main) => { 
    await loadFull(main);
  }; 

  return (
    <Particles 
      id="tsparticles" 
      init={particlesInit} 
      loaded={(container) => {}} 
      options={{ 
        background: { 
          color: "#155e75", 
        }, 
        fpsLimit: 60, 
        particles: Particlesjs.particles,
        interactivity: Particlesjs.interactivity,
        retina_detect: true
      }} 
    /> 
  )
}
