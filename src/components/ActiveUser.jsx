import { useState } from "react";
import { Dialog, DialogHeader, DialogBody, Typography, Popover,PopoverHandler,PopoverContent } from "@material-tailwind/react";
import AvatarPlaceholder from "../assets/images/avatars/avatar2.svg";

export default function ActiveUser({open, toggleMenu, user}) {

  const [openPopover, setOpenPopover] = useState(false);
 
  const triggers = {
    onMouseEnter: () => setOpenPopover(true),
    onMouseLeave: () => setOpenPopover(false),
  };

  const copyEmail= () => {
    setTimeout(() => {
      setOpenPopover(false)
    }, 1500)
    navigator.clipboard.writeText(`${user.email}`);
  }

  return (
    <Dialog size="md" 
      open={open} 
      handler={toggleMenu} 
      animate={{
        mount: { scale: 1, y: 0 },
        unmount: { scale: 0.9, y: -100 },
      }}>
      <DialogHeader className="flex-col justify-between">
        <Typography variant="h4" className="text-red-900 mb-2">
          {user.name}
        </Typography>
        <Typography variant="h6" className="text-gray-800">
          {user.position}
        </Typography>
        <Popover 
          placement="top" offset={0}
          open={openPopover} handler={setOpenPopover}
          animate={{mount: { scale: 1, y: 0 }, unmount: { scale: 0, y: 25 }}}>
          <PopoverHandler onClick={copyEmail}>
            <Typography 
              variant="h6" 
              className="text-gray-800 hover:text-red-900 hover:cursor-pointer">
              {user.email}
            </Typography>
          </PopoverHandler>
          <PopoverContent 
            {...triggers}
            className="z-[10000] bg-black text-white font-bold">
            Text Copied
          </PopoverContent>
        </Popover>
        <Typography variant="h6" className="text-gray-800">
          {user.phone}
        </Typography>
      </DialogHeader>
      <DialogBody className="p-0 rounded-b-lg">
        <img 
          src={user.image ? user.image : AvatarPlaceholder}
          alt="User"
          className="max-h-[500px] w-fit object-cover object-center mx-auto rounded-b-lg"
        />
      </DialogBody>
    </Dialog>
  )
}