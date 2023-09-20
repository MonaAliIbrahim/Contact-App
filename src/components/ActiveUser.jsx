import { useState } from "react";
import { Dialog, DialogHeader, DialogBody, Typography, Popover,PopoverHandler,PopoverContent } from "@material-tailwind/react";

export default function ActiveUser({open, toggleMenu}) {

  const user = {
    name: 'Sara Ahmed', position: 'Front-End Developer', email: 'sara.ali@gmail.com', 
    image: 'https://geekflare.com/wp-content/uploads/2023/06/What-is-an-AI-avatar.jpg',
  }

  const [openPopover, setOpenPopover] = useState(false);
 
  const triggers = {
    onMouseEnter: () => setOpenPopover(true),
    onMouseLeave: () => setOpenPopover(false),
  };

  const copyEmail= () => {
    setTimeout(() => {
      setOpenPopover(false)
    }, 1400)
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
      </DialogHeader>
      <DialogBody className="p-0 rounded-b-lg">
        <img alt="Active User"
          className="max-h-[500px] w-full object-cover object-center rounded-b-lg"
          src={user.image}
        />
      </DialogBody>
    </Dialog>
  )
}