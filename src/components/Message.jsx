import { Fragment, useContext, useEffect, useRef } from "react";
import { Typography } from "@material-tailwind/react";
import { AuthContext } from '../shared/Services/AuthStore';

export default function Message({ messages }) {

  const { user } = useContext(AuthContext);
  const scrollRef = useRef();

  useEffect(() => {
    scrollRef.current.scrollIntoView({ 
      behavior: "smooth",
      block: "end",
      inline: "end"
    });
  }, [messages])
  
  return (
    <Fragment>
      {messages?.sort((a, b) => a.createdAt - b.createdAt).map((message) => (
        <Typography 
          key={message.id}
          variant="paragraph" 
          className={`chat-dialog ${message.uid === user.uid ? "bg-blue-gray-100 float-right" : "bg-white float-left"}`}
          >
          {message.text}
        </Typography>
        ))}
      <span ref={scrollRef} className="block clear-both"></span>
    </Fragment>
  )
}
