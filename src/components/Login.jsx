import { useState, useEffect, useContext } from 'react';
import { Card, Input, Button, Typography, Spinner } from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from '../shared/Services/AuthStore';
import joi from 'joi';

export default function Login() {

  const [user, setUser] = useState({email: '', password: ''});
  const [validationErrors, setValidationErrors] = useState([]);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const {SignIn, signInFlag, signInResponse, loading} = useContext(AuthContext);
  const navigate = useNavigate();

  const getFormValue = (e) => {
    let currentUser = {...user};
    currentUser[e.target.name] = e.target.value;
    setUser(currentUser);
  }

  const checkValidation = () => {
    // Reset Prev Error Messages
    setValidationErrors('');
    setEmailError('');
    setPasswordError('');
    // Create Schema
    const schema = joi.object({
      email: joi.string().required().email({minDomainSegments: 2, tlds: { allow: ['com', 'net'] }}),  
      password: joi.string().required().min(6).max(20),
    })
    // Validation Response
    let { error } = schema.validate(user, {abortEarly: false});
    return error;
  }

  const submitForm = (e) => {
    e.preventDefault();
    let validationError = checkValidation();
    if(validationError) {
      // Validation Error case
      setValidationErrors(validationError.details);
    }else {
      SignIn(user).then(() => {
        navigate('/');
      })
      .catch((errorMessage) => {
        console.log(errorMessage);
      })
    }
  }

  useEffect(() => {
    if(validationErrors.length > 0) {
      for(const error of validationErrors) {
        // Email
        if(error.context.key === 'email') {
          if(error.type.includes('pattern')) {
            setEmailError("Please Enter a valid Email");
          }else {
            setEmailError(error.message.replace('"email"','Email'));
          }
        }
        // Password
        else if(error.context.key === 'password') {
          setPasswordError(error.message.replace('"password"','Password'));
        }
      }
    }
  }, [validationErrors])

  useEffect(() => {
    if(signInFlag) {
      navigate('/');
    }
  }, [signInFlag])

  return (
    <Card color="white" className="register-card">
      <Typography variant="h4" color="cyan">
        Sign In
      </Typography>
      <Typography className="mt-1 font-normal text-red-800">
        Connect more, Communicate better
      </Typography>
      <form className="mt-8 mb-2" onSubmit={submitForm}>
        <div className="mb-6 flex flex-col gap-7">
          <div>
            <Input 
              size="md" type="email" variant="static" label="Email Address" 
              name="email" autoComplete="off" aria-autocomplete="none"
              className="form-input" labelProps={{className: 'form-label !leading-[11px]'}}
              onChange={getFormValue}
            />
            {emailError &&
              <Typography variant="small" color="red" className="font-normal px-1 mt-1">
                {emailError}
            </Typography>}
          </div>
          <div>
            <Input 
              size="md" type="password" variant="static" label="Password" 
              name="password" autoComplete="off" aria-autocomplete="none"
              className="form-input" labelProps={{className: 'form-label !leading-[11px]'}}
              onChange={getFormValue}
            />
            {passwordError &&
              <Typography variant="small" color="red" className="font-normal px-1 mt-1">
                {passwordError}
            </Typography>}
          </div>
        </div>
        {!signInFlag && signInResponse &&
        <Typography ariant="small" color="red" className="text-center my-[-8px]">
          {signInResponse}
        </Typography>} 
        <Button
          className="mt-8 text-white font-semibold bg-cyan-700 flex justify-center items-center" 
          type="submit" disabled={loading} fullWidth>
          {loading && <Spinner className="h-4 w-4 mx-2" color="blue"/>}
          Login 
        </Button>
        <Typography color="gray" className="mt-4 text-center font-normal">
          You have not an account yet?
          <Link to={'/register/signup'} 
            className="font-normal mx-0 px-2 text-red-800 bg-transparent border-0 shadow-none hover:shadow-none hover:text-primary">
            Sign Up
          </Link>
        </Typography>
      </form>
    </Card>
  )
}
