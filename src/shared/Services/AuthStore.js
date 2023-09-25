import { createContext, useState } from 'react'; 
import { auth, db } from "./firbase-config";
import { useAuthState } from "react-firebase-hooks/auth";
import { doc, updateDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import jwtDecode from "jwt-decode";

export const AuthContext = createContext(null);

export default function AuthContextProvider(props) {

  const [user] = useAuthState(auth);
  const [userData, setUserData] = useState(null);
  const [signUpFlag, setSignUpFlag] = useState(null);
  const [signUpResponse, setSignUpResponse] = useState('');
  const [signUpLoading, setSignUpLoading] = useState(null);
  const [signInFlag, setSignInFlag] = useState(null);
  const [signInResponse, setSignInResponse] = useState('');
  const [loading, setLoading] = useState(null);

  const SignUp = async({email, password}) => {
    setSignUpLoading(true);
    setSignUpFlag(null);
    setSignUpResponse('');

    return(
      await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        let user = userCredential.user;
        localStorage.setItem('userToken', user.accessToken);
        saveUserData();
        setSignUpFlag(true);

        return user.uid;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if(errorCode === "auth/invalid-email") {
          setSignUpResponse("The email address is not valid.");
        }
        else if(errorCode === "auth/operation-not-allowed") {
          setSignUpResponse("Operation not allowed.");
        }
        else {
          setSignUpResponse(errorMessage);
        }
        setSignUpFlag(false);

        return errorMessage;
      })
      .finally(() => {
        setSignUpLoading(false);
      })
    )
  };

  const SignIn = async({email, password}) => {
    setLoading(true);
    setSignInFlag(null);
    setSignInResponse('');

    return(
      await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        let user = userCredential.user;
        localStorage.setItem('userToken', user.accessToken);
        
        saveUserData();
        setSignInFlag(true);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        if(errorCode === "auth/invalid-email") {
          setSignInResponse("The email address is not valid.");
        }
        else if(errorCode === "auth/invalid-login-credentials") {
          setSignInResponse("Invalid Email or Password");
        }
        else if(errorCode === "auth/operation-not-allowed") {
          setSignInResponse("Operation not allowed.");
        }
        else {
          setSignInResponse(errorMessage);
        }
        setSignInFlag(false);

        return errorMessage;
      })
      .finally(() => {
        setLoading(false);
      })
    )
  };

  const saveUserData = () => {
    let encodedToken = localStorage.getItem('userToken');
    let decodedToken = jwtDecode(encodedToken);
    setUserData(decodedToken);
  }

  const SignOut = async() => {
    await auth.signOut()
    .then(() => {
      console.log('Firebase SignOut Success');
      localStorage.removeItem('userToken');
      setUserData(null);
      // DeActivate User   
      let id = localStorage.getItem('userId'); 
      let userDoc = doc(db,'users', id);
      updateDoc(userDoc, { active: false })
      .then(() => {
        console.log("user has been deactivated");
      })
      .catch(error =>{
        console.log(error.message)
      })
    })
    .catch((error) => {
      console.log('Firebase SignOut Error', error);
    })
  };

  return(
    <AuthContext.Provider 
      value={{ 
        SignUp, signUpFlag, signUpResponse, signUpLoading, 
        SignIn, signInFlag, signInResponse, loading,
        user, userData, SignOut,  
      }}>
      {props.children}
    </AuthContext.Provider>
  )
}