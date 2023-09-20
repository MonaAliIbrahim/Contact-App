import { Button, Dialog, Card, CardBody, CardFooter, Input } from "@material-tailwind/react";
 
export default function EditUserForm({open, handleOpen}) {
  return (
    <Dialog 
      size="md" 
      open={open} 
      handler={handleOpen} 
      className="bg-transparent shadow-none"
      animate={{
        mount: { scale: 1, y: 0 }, unmount: { scale: 0.9, y: -100 },
      }}>
      <Card className="mx-auto w-full max-w-[24rem] p-4">
        <CardBody className="flex flex-col gap-4">
          <Input type="text" label="User Name" size="lg" />
          <Input type="email" label="Email" size="lg" />
          <Input type="password" label="Password" size="lg" />
        </CardBody>
        <CardFooter className="flex justify-center gap-4 pt-0">
          <Button className="bg-primary">
            Update
          </Button>
          <Button className="bg-red-800" onClick={handleOpen}>
            Cancel
          </Button>
        </CardFooter>
      </Card>
    </Dialog>
  );
}