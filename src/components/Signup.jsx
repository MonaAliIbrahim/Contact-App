import { useState, useEffect, useContext, useMemo } from "react";
import { UserContext } from '../shared/Services/UserStore';
import { AuthContext } from '../shared/Services/AuthStore';
import { Card, Input, Button, Checkbox, Typography, Select, Option, Spinner } from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import joi from 'joi';

export default function Signup() {

  const navigate = useNavigate();
  const { getPostion, positions, addUser, addUserFlag, addUserResponse, loading } = useContext(UserContext);
  const { SignUp, signUpLoading } = useContext(AuthContext);

  const [user, setUser] = useState({name: '', email: '', phone: '', position: '', password: ''});
  const [validationErrors, setValidationErrors] = useState([]);
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [positionError, setPositionError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [serverError, setServerError] = useState('');

  const renderPositons =  useMemo(() => {
    return (
      positions.sort((a,b) => a.id - b.id).map((position) => (
        <Option key={position.id} value={position.name} className="dark:text-white dark:hover:bg-blue-gray-600">
          {position.name}
        </Option>
      ))
    )
  }, [positions])

  useEffect(() => {
    getPostion();
  }, [])

  const getFormValue = (e) => {
    let currentUser = {...user};
    currentUser[e.target.name] = e.target.value;
    setUser(currentUser);
  }

  const getPositionValue = (e) => {
    let currentUser = {...user};
    currentUser.position = e;
    setUser(currentUser);
  }

  const checkValidation = () => {
    // Reset Prev Error Messages
    setValidationErrors('');
    setNameError('');
    setEmailError('');
    setPhoneError('');
    setPositionError('');
    setPasswordError('');
    // Create Schema
    const schema = joi.object({
      name: joi.string().required().pattern(/^[a-zA-Z ]{2,}$/),
      email: joi.string().required().email({minDomainSegments: 2, tlds: { allow: ['com', 'net'] }}), 
      phone: joi.string().required().pattern(/^01[0125][0-9]{8}$/),
      position: joi.string().required(), 
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
      SignUp(user).then((id) => {
        user.id = id;
        addUser(user);
      })
      .catch((errorMessage) => {
        setServerError(errorMessage);
      })
    }
  }

  useEffect(() => {
    if(validationErrors.length > 0) {
      for(const error of validationErrors) {
        // Name
        if(error.context.key === 'name') {
          if(error.type.includes('pattern')) {
            setNameError("User Name must at least 2 Characters of letters only");
          }else {
            setNameError(error.message.replace('"name"', 'User Name'));
          }
        }
        // Email
        else if(error.context.key === 'email') {
          if(error.type.includes('pattern')) {
            setEmailError("Please Enter a valid Email");
          }else {
            setEmailError(error.message.replace('"email"','Email Address'));
          }
        }
        // Phone
        else if(error.context.key === 'phone') {
          if(error.type.includes('pattern')) {
            setPhoneError("Please Enter a valid Mobile Number");
          }else {
            setPhoneError(error.message.replace('"phone"','Mobile Number'));
          }
        }
        // Position
        else if(error.context.key === 'position') {
          setPositionError(error.message.replace('"position"','Position'));
        }
        // Password
        else if(error.context.key === 'password') {
          setPasswordError(error.message.replace('"password"','Password'));
        }
      }
    }
  }, [validationErrors])

  useEffect(() => {
    if(addUserFlag) {
      setTimeout(() => {
        navigate('/register');
      }, 1500)
    }
  }, [addUserFlag])

  return (
    <Card color="white" className="register-card">
      <Typography variant="h4" color="cyan">
        Sign Up
      </Typography>
      <Typography className="mt-1 font-normal text-red-800">
        Enter your details to register.
      </Typography>
      <form onSubmit={submitForm} className="mt-8 mb-2">
        <div className="flex flex-col gap-y-7">
        <div>
          <Input 
            type="text" size="md" variant="static" label="User Name"
            name="name" autoComplete="off" aria-autocomplete="none"
            className="form-input" labelProps={{className: 'form-label !leading-[11px] dark:!text-white'}}
            onChange={getFormValue}
          />
          {nameError && 
          <Typography variant="small" color="red" className="font-normal px-1 mt-1">
            {nameError}
          </Typography>}
        </div>
        <div>
          <Input  
            type="email" size="md" variant="static" label="Email Address"
            name="email" autoComplete="off" aria-autocomplete="none"
            className="form-input" labelProps={{className: 'form-label !leading-[11px] dark:!text-white'}}
            onChange={getFormValue}
          />
          {emailError && 
          <Typography variant="small" color="red" className="font-normal px-1 mt-1">
            {emailError}
          </Typography>}
        </div>
        <div>
          <Input 
            type="tel" size="md" variant="static" label="Mobile Number"
            name="phone" autoComplete="off" aria-autocomplete="none"
            className="form-input" labelProps={{className: 'form-label !leading-[11px] dark:!text-white'}}
            onChange={getFormValue}
          />
          {phoneError && 
          <Typography variant="small" color="red" className="font-normal px-1 mt-1">
            {phoneError}
          </Typography>}
        </div>
          <div className="w-full">
            <Select 
              size="md" variant="static" name="position" label="Select Your Position"
              className="form-input [&>*:first-child]:left-3 [&>*:first-child]:pt-0" 
              labelProps={{className: 'form-label !leading-[11px] dark:text-white'}}
              menuProps={{className: 'dark:!bg-gray-600 dark:border-black'}}
              onChange={getPositionValue}
              >
              {renderPositons}
            </Select>
            {positionError && 
            <Typography variant="small" color="red" className="font-normal px-1 mt-1">
              {positionError}
            </Typography>}
          </div>
          <div>
            <Input 
              type="password" size="md" variant="static" label="Password" 
              name="password" autoComplete="off" aria-autocomplete="none"
              className="form-input" labelProps={{className: 'form-label !leading-[11px] dark:!text-white'}}
              onChange={getFormValue}
            />
            {passwordError && 
            <Typography variant="small" color="red" className="font-normal px-1 mt-1">
              {passwordError}
            </Typography>}
          </div>
        </div> 
        <Checkbox
          label={
            <Typography variant="small" color="gray" className="flex items-center font-normal mt-4 dark:text-white">
              I agree the
              <Link to={'/terms-of-service'} className="font-medium transition-colors hover:text-cyan-700 dark:text-red-800">
                &nbsp;Terms and Conditions
              </Link>
            </Typography>
          }
          color="cyan"
          ripple={true}
          containerProps={{className: "-ml-2.5 mt-4"}}
        />
        {serverError &&
        <Typography ariant="small" color={'red'} className="text-center my-[-8px]">
          {serverError}
        </Typography>} 
        {addUserFlag != null && addUserResponse &&
        <Typography ariant="small" color={addUserFlag ? 'green' : 'red'} className="text-center my-[-8px]">
          {addUserResponse}
        </Typography>} 
        <Button
          className="mt-6 text-white font-semibold bg-cyan-700 flex justify-center items-center" 
          type="submit" disabled={signUpLoading | loading} fullWidth>
          {(loading | signUpLoading)  ? <Spinner className="h-4 w-4 mx-2" color="blue"/> : null}
          Register 
        </Button>
        <Typography color="gray" className="mt-4 text-center font-normal dark:!text-white">
          Already have an account?
          <Link to={'/register'} 
            className="font-normal mx-0 px-2 text-red-800 bg-transparent border-0 shadow-none hover:shadow-none hover:text-primary">
            Sign In
          </Link>
        </Typography>
      </form>
    </Card>
  )
}
