import { Spinner } from '@material-tailwind/react';

export default function Loading() {
  return (
    <div className="h-[100vh] w-[100vw] flex justify-center items-center fixed z-10 bg-gray-100 opacity-75">
      <Spinner className="h-8 w-8 brightness-95" color="cyan" />
    </div>
  )
}
