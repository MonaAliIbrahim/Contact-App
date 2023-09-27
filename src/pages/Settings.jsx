import { useState, useEffect, useContext, useRef, Fragment } from "react";
import { Card, CardHeader, CardBody, Typography, IconButton, Input, Alert } from "@material-tailwind/react";
import { PencilSquareIcon } from '@heroicons/react/24/solid';
import EditUserForm from '../components/EditUserForm';
import { UserContext } from "../shared/Services/UserStore";
import SettingsPlaceholder from "../components/SettingsPlaceholder";
import ImagePlaceholder from '../assets/images/logos/logo.svg';

export default function Settings() {

  const id = localStorage.getItem('userId');
  const { getUser, user, updateUser, loading } = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen((open) => !open);
  const inputRef = useRef();
  const [imgUpload, setImgUpload] = useState(null);
  const [fireUpdate, setFireUpdate] = useState(null);
  const [updateResponse, setUpdateResponse] = useState(null);
  const [openAlert, setOpenAlert] = useState(false);
  const [color, setColor] = useState('');

  const openGallary = () => {
    inputRef.current.children[0].click();
  }

  const ChangeImage = (e) => {
    const reader = new FileReader();
    let file = e.target.files[0];
    if(file) {
      reader.readAsDataURL(file);
      reader.onload = () => { 
        setFireUpdate(true);
        updateUser(id, { image: reader.result })
        .then(() => {
          setImgUpload(reader.result);
          setColor('green');
          setUpdateResponse("user data updated successfuly");
        })
        .catch((error) => {
          setColor('red');
          setUpdateResponse(error.message);
        })
        .finally(() => {
          setOpenAlert(true);
          setTimeout(() => {
            setOpenAlert(false);
            setFireUpdate(false);
          }, 1500)
        })
      }
    }
  };

  useEffect(() => {
    getUser(id);
  }, [])

  return (
    <div className="h-full overflow-x-auto p-8">
      {loading && !fireUpdate ? <SettingsPlaceholder/> : user &&
      <Fragment>
        <Card className="relative mt-6 bg-secondary h-auto md:min-h-[calc(100%-64px)] dark:bg-black">
          <CardHeader color="transparent" className="relative text-center shadow-none min-h-[150px]">
            <div className="!absolute right-0 top-10 hidden">
              <Input type="file" accept="image/*" ref={inputRef} labelProps={{className:'hidden'}} onChange={ChangeImage}/>
            </div>
            <IconButton size="sm" className="!absolute right-0 top-10 bg-red-800" onClick={openGallary}>
              <PencilSquareIcon className="w-5 h-5"/>
            </IconButton>
            <img
              src={imgUpload ? imgUpload : user.image ? user.image : ImagePlaceholder}
              alt="User"
              variant="rounded"
              className="mx-auto rounded-lg object-cover object-center max-h-60"
            />
          </CardHeader>
          <CardBody className="relative my-10 px-4">
            <IconButton size="sm" onClick={handleOpen} className="!absolute right-4 top-0 bg-red-800">
              <PencilSquareIcon className="w-5 h-5"/>
            </IconButton>
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-12 md:col-span-6">
                <div className="user-info">
                  <Typography variant="h5" className="text-primary text-lg">User Name :</Typography>
                  <Typography variant="h6" className="capitalize dark:text-white">{user.name}</Typography>
                </div>
              </div>
              <div className="col-span-12 md:col-span-6">
                <div className="user-info">
                  <Typography variant="h5" className="text-primary text-lg">Email :</Typography>
                  <Typography variant="h6" className="dark:text-white">{user.email}</Typography>
                </div>
              </div>
              <div className="col-span-12 md:col-span-6">
                <div className="user-info">
                  <Typography variant="h5" className="text-primary text-lg">Phone Number :</Typography>
                  <Typography variant="h6" className="dark:text-white">{user.phone}</Typography>
                </div>
              </div>
              <div className="col-span-12 md:col-span-6">
                <div className="user-info">
                  <Typography variant="h5" className="text-primary text-lg">Position :</Typography>
                  <Typography variant="h6" className="dark:text-white">{user.position}</Typography>
                </div>
              </div>
            </div>
          </CardBody>
          {updateResponse &&
          <Alert
            open={openAlert}
            onClose={() => setOpen(false)}
            animate={{
              mount: { y: 100 },
              unmount: { y: 0 },
            }}
            className={`absolute top-0 w-full md:w-[80%] md:left-[10%] px-4 z-10 bg-${color}-800`}>
            <span className="text-center w-full">{updateResponse}</span>
          </Alert>}
        </Card>
        {fireUpdate &&
          <div className="absolute inset-0 bg-secondary opacity-60"></div>}
        <EditUserForm open={open} handleOpen={handleOpen}/>
      </Fragment>}
    </div>
  );
}