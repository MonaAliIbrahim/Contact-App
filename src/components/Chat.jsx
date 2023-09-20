import { useState, Fragment } from "react";
import { 
  Card, CardHeader, CardBody, CardFooter, Input, IconButton, SpeedDial, Chip, SpeedDialHandler,
  SpeedDialContent, SpeedDialAction, Typography, Avatar, Button, Menu, MenuHandler, MenuList, MenuItem
} from "@material-tailwind/react";
import { 
  MicrophoneIcon, PhotoIcon, DocumentPlusIcon, EllipsisVerticalIcon, MagnifyingGlassIcon 
} from "@heroicons/react/24/solid";
import { PlusIcon } from "@heroicons/react/24/outline";
import AvatarPlaceholder from "../assets/images/avatars/avatar2.svg";
import ActiveUser from "./ActiveUser";
import MediaDrawer from "./MediaDrawer";
import Message from './Message';

export default function Chat() {

  const user = {
    name: 'Sara Ali', position: 'Front-End Developer', email: 'sara.ali@gmail.com', active: false,
    image: 'https://geekflare.com/wp-content/uploads/2023/06/What-is-an-AI-avatar.jpg',
  }

  const [mediaType, setMediaType] = useState(null);

  const [openMenu, setOpenMenu] = useState(false);
  const toggleMenu = () => setOpenMenu(!openMenu);

  const [openDrawer, setOpenDrawer] = useState(false);
  const toggleDrawer = () => setOpenDrawer(!openDrawer);

  return (
    <Fragment>
      <Card className="relative flex flex-col h-[calc(100%-24px)] min-w-[350px] m-3 ml-2 rounded-lg bg-secondary">
        <CardHeader className="m-2 p-2 pb-3 overflow-visible rounded-md bg-transparent shadow-lg shadow-gray-900/10">
          <div className="flex items-center">
            <Button onClick={toggleMenu} variant="outlined" className="p-0 border-0 !outline-none">
              <Avatar src={AvatarPlaceholder} alt="Contact Avatar" size="md" className="w-auto max-h-14"/>
            </Button>
            <div className='grow'>
              <Typography variant="h4" className="font-semibold text-[16px] text-gray-900 px-2">
                Sara
              </Typography>
              <Chip 
                variant="outlined" size="sm" className="border-0 px-1"
                value={user.active ? 'Online' : 'Offline'} 
                color={user.active ? 'green' : 'red'}   
                icon={
                  <span className={`
                    mx-auto mt-1 block h-2 w-2 rounded-full content-[''] 
                    ${user.active ? 'bg-green-900' : 'bg-red-900'}
                  `}/>
                }/>
            </div>
            <IconButton size="sm" variant="text" className="hover:text-red-800 hover:bg-blue-gray-100">
              <MagnifyingGlassIcon className="w-6 h-6"/>
            </IconButton>
            <Menu placement="bottom-end">
              <MenuHandler>
                <IconButton size="sm" variant="text" className="hover:text-red-800 hover:bg-blue-gray-100 !outline-none">
                  <EllipsisVerticalIcon className="w-6 h-6"/>
                </IconButton>
              </MenuHandler>
              <MenuList className="min-w-[150px] shadow-xl">
                <MenuItem>Search</MenuItem>
                <MenuItem onClick={() => {toggleDrawer(); setMediaType('Media')} }>Media</MenuItem>
                <MenuItem onClick={() => {toggleDrawer(); setMediaType('Docs')} }>Docs</MenuItem>
                <MenuItem onClick={() => {toggleDrawer(); setMediaType('Links')} }>Links</MenuItem>
              </MenuList>
            </Menu>
          </div>
        </CardHeader>
        <CardBody className="order-2 z-10 grow self-stretch overflow-y-auto m-2 ml-1 p-2 pb-1">
          <Message/>
        </CardBody>
        <CardFooter className="order-3 z-20 self-end mx-2 p-2 w-[calc(100%-16px)] rounded-md bg-white">
          <div className="relative flex">
            <div className="!absolute left-1 top-1 rounded-full border-0 shadow-none z-10">
              <SpeedDial>
                <SpeedDialHandler>
                  <IconButton color="white" size="sm" className="rounded-full">
                    <PlusIcon className="w-5 h-5 text-blue-gray-800 transition-transform group-hover:rotate-45" />
                  </IconButton>
                </SpeedDialHandler>
                <SpeedDialContent className="rounded-full border border-blue-gray-50 bg-white shadow-xl shadow-black/10 gap-y-0">
                  <SpeedDialAction className="attach-btn hover:!scale-100">
                    <PhotoIcon className="h-5 w-5" />
                  </SpeedDialAction>
                  <SpeedDialAction className="attach-btn hover:!scale-100">
                    <DocumentPlusIcon className="h-5 w-5"/>
                  </SpeedDialAction>
                </SpeedDialContent>
              </SpeedDial>
            </div>
            <Input
              type="text"
              className="px-9 focus:!border-blue-gray-300"
              placeholder="Type your message..."
              labelProps={{className: "hidden"}}
              containerProps={{className: "min-w-0"}}
            />
            <div className="!absolute right-1 top-1 rounded-full border-0 shadow-none z-10">
              <SpeedDial>
                <SpeedDialHandler>
                  <IconButton color="white" size="sm" className="rounded-full">
                    <MicrophoneIcon className="w-5 h-5 text-blue-gray-800 transition-transform group-hover:scale-105" />
                  </IconButton>
                </SpeedDialHandler>
                <SpeedDialContent className="rounded-full border border-blue-gray-50 bg-white shadow-xl shadow-black/10 gap-y-0">
                  <SpeedDialAction className="attach-btn hover:!scale-100">
                    <PhotoIcon className="h-5 w-5"/>
                  </SpeedDialAction>
                </SpeedDialContent>
              </SpeedDial>
            </div>
          </div>
        </CardFooter>
      </Card>
      <ActiveUser open={openMenu} toggleMenu={toggleMenu}/>
      <MediaDrawer open={openDrawer} toggleDrawer={toggleDrawer} media={mediaType}/>
    </Fragment>
  )
}
