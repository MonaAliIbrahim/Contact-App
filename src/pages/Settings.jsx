import { useState, useEffect, useContext, Fragment } from "react";
import { Card, CardHeader, CardBody, Typography, IconButton } from "@material-tailwind/react";
import { PencilSquareIcon } from '@heroicons/react/24/solid';
import EditUserForm from '../components/EditUserForm';
import { UserContext } from "../shared/Services/UserStore";
import SettingsPlaceholder from "../components/SettingsPlaceholder";
import ImagePlaceholder from '../assets/images/logos/logo.svg';

export default function Settings() {

  const { getUser, user, loading } = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen((open) => !open);

  useEffect(() => {
    getUser(localStorage.getItem('userId'));
  }, [])

  return (
    <div className="h-full overflow-x-auto p-8">
      {loading ? <SettingsPlaceholder/> : user &&
      <Fragment>
        <Card className="mt-6 bg-secondary h-auto md:min-h-[calc(100%-64px)]">
          <CardHeader color="transparent" className="relative text-center shadow-none">
            <IconButton type="file" size="sm" className="!absolute right-0 top-10 bg-red-800">
              <PencilSquareIcon className="w-5 h-5"/>
            </IconButton>
            <img
              src={user.image ? user.image : ImagePlaceholder}
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
                  <Typography variant="h6" className="capitalize">{user.name}</Typography>
                </div>
              </div>
              <div className="col-span-12 md:col-span-6">
                <div className="user-info">
                  <Typography variant="h5" className="text-primary text-lg">Email :</Typography>
                  <Typography variant="h6">{user.email}</Typography>
                </div>
              </div>
              <div className="col-span-12 md:col-span-6">
                <div className="user-info">
                  <Typography variant="h5" className="text-primary text-lg">Phone Number :</Typography>
                  <Typography variant="h6">{user.phone}</Typography>
                </div>
              </div>
              <div className="col-span-12 md:col-span-6">
                <div className="user-info">
                  <Typography variant="h5" className="text-primary text-lg">Position :</Typography>
                  <Typography variant="h6">{user.position}</Typography>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
        <EditUserForm open={open} handleOpen={handleOpen}/>
      </Fragment>}
    </div>
  );
}