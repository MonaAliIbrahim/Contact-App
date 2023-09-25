import { useState } from 'react';
import { Typography, Input, Button, Tabs, TabsHeader, TabsBody, Tab, TabPanel } from "@material-tailwind/react";
import { MagnifyingGlassCircleIcon } from '@heroicons/react/24/solid';
import ContactCard from "./ContactCard";

export default function ContactList() {

  const [searchValue, setSearchValue] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const tabs = [
    { label: "All", value: "all"},
    { label: "Active", value: "active"},
  ];

  return (
    <div className="min-w-[250px] flex flex-col items-stretch h-full gap-x-0 gap-y-3 p-2">
      <Typography variant="h2" className="flex-none text-red-800">
        Let's Contact
      </Typography>
      <div className="relative flex w-full gap-2">
        <Input 
          type="text" 
          color="cyan" 
          variant="standard"
          placeholder="Search..." 
          className="pr-8 focus:!border-red-800" 
          containerProps={{ className: "min-w-[20px]" }}
          onKeyUp={(e) => { setSearchValue(e.target.value) }}
        />
        <Button 
          size="lg" variant="text" 
          className="!absolute right-1 bottom-1 p-0 rounded-full !bg-transparent">
          <MagnifyingGlassCircleIcon className="h-8 w-8 text-primary hover:text-red-800"/>
        </Button>
      </div>
      <Tabs value={activeTab} id="custom-animation" className="grow">
        <TabsHeader className="bg-primary bg-opacity-100 brightness-125 h-[34px] overflow-x-auto">
          {tabs.map(({label, value}) => (
            <Tab 
              key={value} 
              value={value} 
              onClick={() => {setActiveTab(value)}}
              className="text-sm text-white leading-none activeChat">
              {label}
            </Tab>
          ))}
        </TabsHeader>
        <TabsBody 
          animate={{initial: {y: 250}, mount: {y: 0}, unmount: {y: 250}}} 
          className="max-h-[calc(100%-48px)] h-full !mb-2 mt-3 !overflow-y-auto snap-proximity snap-y"
          >
          {activeTab === 'all' &&
            <TabPanel value='all' className="!p-0">
              <ContactCard type='all' searchValue={searchValue}/>
            </TabPanel>}
          {activeTab === 'active' &&
            <TabPanel value='active' className="!p-0">
              <ContactCard type='active' searchValue={searchValue}/>
            </TabPanel>}
        </TabsBody>
      </Tabs>
    </div>
  )
}