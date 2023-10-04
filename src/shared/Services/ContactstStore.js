import { createContext, useState } from 'react'; 

export const ContactContext = createContext(null);

export default function ContactContextProvider(props) {

  const [activeContact, setActiveContact] = useState(null);

  const setContact = (contact) => {
    setActiveContact(contact);
  }

  return(
    <ContactContext.Provider value={{ activeContact, setContact }}>
      {props.children}
    </ContactContext.Provider>
  )
}