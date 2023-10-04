import { createContext, useState } from "react";
import { auth, db } from "./firbase-config";
import { addDoc, collection, serverTimestamp, query, orderBy, onSnapshot, limit } from "firebase/firestore";

export const MessageContext = createContext(null);

export default function MessageContextProvider(props) {

  const MessageCollection = collection(db, "messages");
  const [messages, setMessages] = useState("");

  const sendMessageService = async (message, targetUserId) => {
    const { uid, displayName, photoURL } = auth.currentUser;

    await addDoc(MessageCollection, {
      text: message,
      name: displayName,
      avatar: photoURL,
      createdAt: serverTimestamp(),
      uid,
      touid: targetUserId
    });
  };

  const updateMessageService = () => {
    const q = query(MessageCollection, orderBy("createdAt", "asc"), limit(50));
    let unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      const fetchedMessages = [];
      QuerySnapshot.forEach((doc) => {
        fetchedMessages.push({ ...doc.data(), id: doc.id });
      });
      // const sortedMessages = fetchedMessages.sort((a, b) => a.createdAt - b.createdAt);
      setMessages(fetchedMessages);
    });

    return () => unsubscribe;
  }

  return(
    <MessageContext.Provider value={{ sendMessageService, updateMessageService, messages }}>
      {props.children}
    </MessageContext.Provider>
  )
}