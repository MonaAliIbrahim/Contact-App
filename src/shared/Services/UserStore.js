import { createContext, useState } from 'react'; 
import { db } from "./firbase-config";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { doc, updateDoc } from "firebase/firestore";
import jwtDecode from "jwt-decode";

export const UserContext = createContext(null);

export default function UserContextProvider(props) {

  const usersCollection = collection(db, "users");
  const positionsCollection = collection(db, "positions");

  const [positions, setPositions] = useState([]);
  const [addUserResponse, setAddUserResponse] = useState('');
  const [addUserFlag, setAddUserFlag] = useState(null);
  const [users, setUsers] = useState([]);
  const [user, setUser]= useState(null);
  const [loading, setLoading] = useState(null);
  
  const addUser = (user) => {
    setLoading(true);
    setAddUserFlag(null);
    setAddUserResponse('');

    addDoc(usersCollection, user)
    .then(() => {
      setAddUserResponse('User has been created successfuly.');
      setAddUserFlag(true);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);

      setAddUserResponse(errorMessage);
      setAddUserFlag(false);
    })
    .finally(() => {
      setLoading(false);
    })
  }

  const getUser = (id) => {
    setLoading(true);

    getDocs(usersCollection)
    .then((response) => {
      let doc = response.docs.find(doc => doc.id === id);
      setUser(doc.data());
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    })
    .finally(() => {
      setLoading(false);
    })
  }

  const getUsers = () => {
    setLoading(true);
    // get current user
    let encodedToken = localStorage.getItem('userToken');
    let user = jwtDecode(encodedToken);

    getDocs(usersCollection).then((response) => {
      let data = [];
      response.docs.forEach((doc) => {
        // return Users except current user
        if(doc.data().id !== user.user_id) {
          data.push(doc.data());
        }
        else {
          localStorage.setItem('userId', doc.id);
          updateUserActive(doc.id);
        }
      });
      setUsers(data);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    })
    .finally(() => {
      setLoading(false);
    })
  }

  const updateUserActive = (id) => {
    let userDoc = doc(db,'users', id);
    updateDoc(userDoc, { active: true })
    .then(() => {
      console.log("user is activated right now");
    })
    .catch(error =>{
      console.log(error.message)
    })
  }

  const getPostion = () => {
    getDocs(positionsCollection).then((response) => {
      let data = [];
      response.docs.forEach((doc) => {
        data.push(doc.data());
      });
      setPositions(data);

    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    })
  }

  return(
    <UserContext.Provider 
      value={{ 
        getPostion, positions, 
        addUser, addUserFlag, addUserResponse, 
        getUsers, users, getUser, user, loading 
      }}>
      {props.children}
    </UserContext.Provider>
  )
}