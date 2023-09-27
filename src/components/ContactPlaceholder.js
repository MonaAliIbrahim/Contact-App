import { CardHeader } from "@material-tailwind/react";

export default function ContactPlaceholder() {
  return (
    Array(6).fill({}).map((item, index) => {
      return(
        <CardHeader 
          key={index}
          color="transparent" floated={false} shadow={false} 
          className="animate-pulse flex items-center content-start py-0 px-1 m-0 bg-white dark:bg-gray-200"
        >
          <div className="w-12 h-10 rounded-full bg-gray-200 mr-2 dark:bg-black"></div>
          <div className="self-stretch flex flex-col w-full gap-y-2 !text-sm border-b-[1px] py-2 dark:bg-black">
            <div variant="h6" className="w-10/12 h-4 bg-gray-200 rounded"></div>
            <div variant="paragraph" className="w-7/12 h-3 mb-2 bg-gray-200 rounded"></div>
          </div>
        </CardHeader>
      )
    })
  )
}
