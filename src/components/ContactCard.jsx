import { useState, useEffect } from "react";
import { Card, CardHeader, Avatar, Typography } from "@material-tailwind/react"
import { CheckIcon } from '@heroicons/react/24/solid';
import AvatarPlaceholder from "../assets/images/avatars/avatar2.svg";
import { contacts } from "../shared/Services/ContactSlice";

export default function ContactCard({type, searchValue}) {

  const [currentContacts, setCurrentContacts] = useState([]);

  useEffect(() => {
    if(searchValue.length > 0) {
      let filterData = contacts.filter(contact => contact.name.toLowerCase().includes(searchValue));
      setCurrentContacts(filterData);
    }
    else {
      if(type === 'all') {
        setCurrentContacts(contacts);
      }
      else {
        let filterData = contacts.filter(contact => !contact.lastPost.seen);
        setCurrentContacts(filterData);
      }
    }
  }, [type, searchValue]);

  return (
    <Card 
      color="transparent" shadow={false} 
      className="snap-start w-full">
      {currentContacts.map(contact => {
        return(
          <CardHeader 
            key={contact.id}
            color="transparent" floated={false} shadow={false} 
            className="flex items-center content-start py-0 px-1 m-0 hover:bg-secondary">
            <Avatar 
              src={contact.img ? contact.img : AvatarPlaceholder} 
              alt="contact user avatar"
              size="md" variant="circular" 
              className="pr-2"
              />
            <div className="self-stretch flex flex-col w-full gap-0 !text-sm border-b-[1px] py-2">
              <Typography variant="h6" className="text-normal text-gray-900">
                {contact.name}
              </Typography>
              <Typography variant="paragraph" color="blue-gray" className="text-[13px] font-[500]">
                {contact.position}
              </Typography>
            </div>
            <div className="flex flex-col self-stretch justify-center gap-0.5 border-b-[1px] px-1">
              <span className="pt-[6px] text-xs">
                {contact.lastPost.time}
              </span>
              <CheckIcon 
                className="w-4 h-4 ml-auto mr-2"
                color={contact.lastPost.seen ? 'blue' : 'gray'}
              />
            </div>
          </CardHeader>
        )
      })}
    </Card>
  )
}
