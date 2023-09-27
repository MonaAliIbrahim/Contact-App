import { useState, useEffect, useContext } from "react";
import { Card, CardHeader, Avatar, Typography } from "@material-tailwind/react";
import AvatarPlaceholder from "../assets/images/avatars/avatar2.svg";
import { UserContext } from "../shared/Services/UserStore";
import { ContactContext } from "../shared/Services/ContactstStore";
import ContactPlaceholder from "./ContactPlaceholder";

export default function ContactCard({type, searchValue}) {

  const [currentContacts, setCurrentContacts] = useState([]);
  const { getUsers, users, loading } = useContext(UserContext);
  const { setContact } = useContext(ContactContext);

  useEffect(() => {
    if(searchValue.length > 0) {
      let filterData = users.filter(contact => contact.name.toLowerCase().includes(searchValue));
      setCurrentContacts(filterData);
    }
    else {
      if(type === 'all') {
        setCurrentContacts(users);
      }
      else {
        let filterData = users.filter(contact => contact.active);
        setCurrentContacts(filterData);
      }
    }
  }, [users, type, searchValue]);

  useEffect(() => {
    getUsers();
  }, [])

  return (
    <Card color="transparent" shadow={false} className="snap-start w-full">
      {loading ? <ContactPlaceholder/> :
        currentContacts.map((contact, index) => {
          return(
            <CardHeader 
              key={index}
              color="transparent" floated={false} shadow={false} 
              className="flex items-center content-start py-0 px-1 m-0 hover:bg-secondary hover:cursor-pointer dark:hover:bg-gray-600"
              onClick={()=> setContact(contact)}
              >
              <Avatar 
                src={contact.image ? contact.image : AvatarPlaceholder} 
                alt="contact user avatar"
                size="md" variant="circular" 
                className="mr-2 w-12 h-12"
                />
              <div className="self-stretch flex flex-col w-full gap-0 !text-sm border-b-[1px] py-2">
                <Typography variant="h6" className="capitalize text-normal text-gray-900 dark:text-white">
                  {contact.name}
                </Typography>
                <Typography variant="paragraph" color="blue-gray" className="text-[13px] font-[500] dark:text-gray-300">
                  {contact.position}
                </Typography>
              </div>
              <div className="flex flex-col self-stretch justify-center gap-0.5 border-b-[1px] px-1">
                <span className={`
                  mx-auto mt-1 block h-2 w-2 rounded-full content-[''] 
                  ${contact.active ? 'bg-green-900' : 'bg-red-900'}
                `}/>
              </div>
            </CardHeader>
          )
        })
      }
    </Card>
  )
}
