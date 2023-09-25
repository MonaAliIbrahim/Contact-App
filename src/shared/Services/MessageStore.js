import { createContext, useState } from "react";
import { auth, db } from "./firbase-config";
import { addDoc, collection, serverTimestamp, query, orderBy, onSnapshot, limit } from "firebase/firestore";

export const MessageContext = createContext(null);

export default function MessageContextProvider(props) {

  const MessageCollection = collection(db, "messages");
  const [messages, setMessages] = useState("");

  const sendMessageService = async (message) => {
    const { uid, displayName, photoURL } = auth.currentUser;
    await addDoc(MessageCollection, {
      text: message,
      name: displayName,
      avatar: photoURL,
      createdAt: serverTimestamp(),
      uid,
    });
  };

  const updateMessageService = () => {
    const q = query(MessageCollection, orderBy("createdAt", "desc"), limit(50));

    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      const fetchedMessages = [];
      QuerySnapshot.forEach((doc) => {
        fetchedMessages.push({ ...doc.data(), id: doc.id });
      });
      const sortedMessages = fetchedMessages.sort((a, b) => a.createdAt - b.createdAt);
      setMessages(sortedMessages);
    });

    return () => unsubscribe;
  }

  return(
    <MessageContext.Provider value={{ sendMessageService, updateMessageService, messages }}>
      {props.children}
    </MessageContext.Provider>
  )
}