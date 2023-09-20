import { Navbar, Avatar, Badge, Tooltip, Button, Typography } from "@material-tailwind/react";
import { ChatBubbleOvalLeftEllipsisIcon, Cog8ToothIcon, ArrowLeftOnRectangleIcon } from '@heroicons/react/24/solid';
import { NavLink, useNavigate } from "react-router-dom";
import Logo from "../../../assets/images/logos/logo9.svg";
import AvatarPlaceholder from "../../../assets/images/avatars/avatar2.svg";
import PropTypes from 'prop-types';

export function AppNavbar() {

  const navigate = useNavigate();

  const signOut = () => {
    navigate('/register');
  }

  return (
    <Navbar className="w-15 p-1 rounded-none text-dark rounded-l-lg border-0 border-r-2 border-cyan-600">
      <div className="h-full flex flex-col justify-between items-center align-middle">
        <img 
          src={Logo} alt="Website Logo" 
          className="w-full h-[50px] object-contain mt-3 animate-pulse opacity-95 brightness-125"/>
        <div className="flex flex-col gap-4">
          <NavLink to={'/'} className={({isActive}) => isActive ? 'activeLink' : ''}>
            <ChatBubbleOvalLeftEllipsisIcon className="h-6 w-6 text-cyan-800 hover:text-red-800"/>
          </NavLink>
          <NavLink to={'/settings'} className={({isActive}) => isActive ? 'activeLink' : ''}>
            <Cog8ToothIcon className="h-6 w-6 text-cyan-800 hover:text-red-800 hover:animate-spin"/>
          </NavLink>
        </div>
        <div className="flex flex-col items-center">
          <Badge 
            color="green" 
            withBorder={true} overlap='circular'
            className="animate-ping !scale-125 !max-w-[3px] !min-w-[1px] !max-h-[3px] !min-h-[1px] opacity-95"
            >
            <Avatar src={AvatarPlaceholder} alt="avatar" size="md" className="mb-2"/>
          </Badge>
          <Tooltip 
            placement="top" 
            className="bg-red-800 mx-1"
            animate={{mount: { scale: 1, y: 0 }, unmount: { scale: 0, y: 25 }}}
            content={
              <div className="flex justify-center items-center gap-x-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-4 w-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5.636 5.636a9 9 0 1012.728 0M12 3v9"/>
                </svg>
                <Typography color="white" className="font-medium">
                  Sign Out
                </Typography>   
              </div>
            }>
            <Button ripple={true} variant="outlined" onClick={signOut} className="border-0 p-2 h-auto !outline-none !shadow-none">
              <ArrowLeftOnRectangleIcon className="h-6 w-6 mb-4 text-cyan-800"/> 
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