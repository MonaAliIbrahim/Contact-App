import { Drawer, Typography, IconButton } from "@material-tailwind/react";

export default function MediaDrawer({open, toggleDrawer, media}) {

  return (
  <Drawer open={open} onClose={toggleDrawer} placement="right" className="p-4 dark:bg-gray-900">
    <div className="mb-6 flex items-center justify-between">
      <Typography variant="h5" color="blue-gray" className="dark:!text-white">
        {media}...
      </Typography>
      <IconButton variant="text" color="blue-gray" className="hover:text-red-800 dark:text-white hover:dark:bg-red-800" onClick={toggleDrawer}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="h-5 w-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </IconButton>
    </div>
    <div className="flex gap-2">
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloribus perferendis dolore inventore quidem, obcaecati asperiores voluptate placeat sunt. Perspiciatis unde nostrum fugit numquam commodi maxime optio porro accusantium autem placeat.
    </div>
  </Drawer>
  )
}
