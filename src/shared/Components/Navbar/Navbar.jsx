import { useEffect, useContext } from 'react';
import { Navbar, Avatar, Badge, Tooltip, Button, Typography, IconButton } from "@material-tailwind/react";
import { ChatBubbleOvalLeftEllipsisIcon, Cog8ToothIcon, ArrowLeftOnRectangleIcon, MoonIcon } from '@heroicons/react/24/solid';
import { NavLink, useNavigate } from "react-router-dom";
import Logo from "../../../assets/images/logos/logo9.svg";
import AvatarPlaceholder from "../../../assets/images/avatars/avatar2.svg";
import PropTypes from 'prop-types';
import { AuthContext } from '../../Services/AuthStore';
import { UserContext } from '../../Services/UserStore';

export function AppNavbar() {

  const { SignOut } = useContext(AuthContext);
  const { getUser, user } = useContext(UserContext);
  const navigate = useNavigate(null);

  const toggleTheme = () => {
    if(!localStorage.getItem('theme')) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
    else {
      document.documentElement.classList.remove('dark');
      localStorage.removeItem('theme');
    }
  }

  const handleSignOut = () => {
    SignOut().then(() => {
      navigate('/register');
    })
  }

  useEffect(() => {
    getUser(localStorage.getItem('userId'));
  }, [])

  return ( 
    <Navbar className="w-15 p-1 rounded-none text-dark rounded-l-lg border-0 border-r-2 border-cyan-600 dark:bg-gray-900">
      <div className="h-full flex flex-col justify-between items-center align-middle">
        <img 
          src={Logo} alt="Website Logo" 
          className="w-full h-[50px] object-contain mt-3 animate-pulse opacity-95 brightness-125"/>
        <div className="flex flex-col gap-4">
          <NavLink to={'/'} className={({isActive}) => isActive ? 'activeLink' : ''}>
            <ChatBubbleOvalLeftEllipsisIcon className="h-6 w-6 text-cyan-800 hover:text-red-800 dark:text-white"/>
          </NavLink>
          <NavLink to={'/settings'} className={({isActive}) => isActive ? 'activeLink' : ''}>
            <Cog8ToothIcon className="h-6 w-6 text-cyan-800 hover:text-red-800 hover:animate-spin dark:text-white"/>
          </NavLink>
          <IconButton onClick={toggleTheme} className="rounded-full h-6 w-6 bg-red-900 hover:shadow-[#ea4335]/20 focus:shadow-[#ea4335]/20 active:shadow-[#ea4335]/10">
            <MoonIcon className='h-4 w-4 dark:text-black p-0'/>
          </IconButton>
        </div>
        <div className="flex flex-col items-center">
          <Badge color="green" withBorder={true} overlap='circular'>
            <Avatar 
              src={user?.image ? user.image : AvatarPlaceholder} 
              alt="avatar" size="md" className="mb-2"/>
          </Badge>
          <Tooltip 
            placement="top" 
            className="bg-red-800 mx-1"
            animate={{mount: { scale: 1, y: 0 }, unmount: { scale: 0, y: 25 }}}
            content={
              <div className="flex justify-center items-center gap-x-2">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" 
                  strokeWidth={2} stroke="currentColor" className="h-4 w-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5.636 5.636a9 9 0 1012.728 0M12 3v9"/>
                </svg>
                <Typography color="white" className="font-medium">
                  Sign Out
                </Typography>   
              </div>
            }>
            <Button 
              ripple={true} variant="outlined"
              className="border-0 p-2 h-auto !outline-none !shadow-none"
              onClick={handleSignOut} >
              <ArrowLeftOnRectangleIcon className="h-6 w-6 mb-4 text-cyan-800 dark:text-white"/> 
            </Button>
          </Tooltip>
        </div>
      </div>
    </Navbar>
  );
}

AppNavbar.propTypes = {
  overlap: PropTypes.func
}