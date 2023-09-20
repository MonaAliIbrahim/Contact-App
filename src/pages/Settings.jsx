import { useState } from "react";
import { Card, CardHeader, CardBody, Typography, IconButton } from "@material-tailwind/react";
import { PencilSquareIcon } from '@heroicons/react/24/solid';
import EditUserForm from '../components/EditUserForm';

export default function Settings() {

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen((open) => !open);

  return (
    <div className="h-full overflow-x-auto p-8">
      <Card className="mt-6 bg-secondary h-auto md:min-h-[calc(100%-64px)]">
        <CardHeader color="transparent" className="relative text-center shadow-none">
          <IconButton type="file" size="sm" className="!absolute right-0 top-10 bg-red-800">
            <PencilSquareIcon className="w-5 h-5"/>
          </IconButton>
          <img
            src="https://geekflare.com/wp-content/uploads/2023/06/What-is-an-AI-avatar.jpg"
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
                <Typography variant="h6">Mona Ali</Typography>
              </div>
            </div>
            <div className="col-span-12 md:col-span-6">
              <div className="user-info">
                <Typography variant="h5" className="text-primary text-lg">Email :</Typography>
                <Typography variant="h6">mona.ali@gmail.com</Typography>
              </div>
            </div>
            <div className="col-span-12 md:col-span-6">
              <div className="user-info">
                <Typography variant="h5" className="text-primary text-lg">Phone Number :</Typography>
                <Typography variant="h6">012566644584</Typography>
              </div>
            </div>
            <div className="col-span-12 md:col-span-6">
              <div className="user-info">
                <Typography variant="h5" className="text-primary text-lg">Position :</Typography>
                <Typography variant="h6">Front-End Developer</Typography>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
      <EditUserForm open={open} handleOpen={handleOpen}/>
    </div>
  );
}