import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {

  const navigat = useNavigate();

  const login = () => {
    navigat('/');
  }

  return (
    <Card color="white" className="register-card">
      <Typography variant="h4" color="cyan">
        Sign In
      </Typography>
      <Typography className="mt-1 font-normal text-red-800">
        Connect more, Communicate better
      </Typography>
      <form className="mt-8 mb-2">
        <div className="mb-6 flex flex-col gap-7">
          <Input 
            size="sm" 
            type="email"
            label="Email Address"
            name="email_random_123"
            autoComplete="off"
            aria-autocomplete="none"
            variant="static"
            className="form-input"
            labelProps={{className: 'form-label !leading-[11px]'}}
            />
          <Input 
            size="sm"
            type="password"
            label="Password" 
            name="password_random_123"
            autoComplete="off"
            aria-autocomplete="none"
            variant="static"
            className="form-input"
            labelProps={{className: 'form-label !leading-[11px]'}}
            />
        </div> 
        <Button className="mt-8 text-white font-semibold bg-cyan-700" fullWidth onClick={login}>
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
