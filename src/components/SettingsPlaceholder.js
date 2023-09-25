import { Card, CardHeader, CardBody } from "@material-tailwind/react";

export default function SettingsPlaceholder() {
  return (
    <Card className="animate-pulse mt-6 bg-secondary h-auto md:min-h-[calc(100%-64px)]">
      <CardHeader color="transparent" className="relative flex justify-center shadow-none">
        <div className="h-52 w-60 rounded-lg bg-gray-500 opacity-50"/>
      </CardHeader>
      <CardBody className="relative my-10 px-4">
        <div className="grid grid-cols-12 gap-4">
          {Array(4).fill({}).map((el, index) => (
            <div key={index} className="col-span-12 md:col-span-6 opacity-50">
              <div className="flex flex-row justify-center gap-x-3 mb-3">
                <div className="w-2/4 h-6 rounded-full bg-gray-500 mr-2"></div>
                <div className="w-1/4 h-6 rounded-full bg-gray-500"></div>
              </div>
            </div>
          ))}
        </div>
      </CardBody>
    </Card>
  )
}
