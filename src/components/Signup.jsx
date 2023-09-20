import { Card, Input, Button, Checkbox, Typography, Select, Option } from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { positions } from "../shared/Data/Position";

export default function Signup() {

  const navigat = useNavigate();

  const signup = () => {
    navigat('/register');
  }

  return (
    <Card color="white" className="register-card">
      <Typography variant="h4" color="cyan">
        Sign Up
      </Typography>
      <Typography className="mt-1 font-normal text-red-800">
        Enter your details to register.
      </Typography>
      <form className="mt-8 mb-2">
        <div className="flex flex-col gap-y-7">
          <Input 
            size="sm"
            type="text"
            label="User Name"
            name="name_random_123"
            autoComplete="off"
            aria-autocomplete="none"
            variant="static"
            className="form-input"
            labelProps={{className: 'form-label !leading-[11px]'}}
          />
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
            type="tel" 
            name="phone_random_123"
            label="Mobile Number"
            autoComplete="off"
            aria-autocomplete="none"
            variant="static"
            className="form-input"
            labelProps={{className: 'form-label !leading-[11px]'}}
          />
          <div className="w-full">
            <Select 
              size="sm"
              name="position_id"
              label="Select Your Position"
              variant="static"
              className="form-input [&>*:first-child]:left-3 [&>*:first-child]:pt-0" 
              labelProps={{className: 'form-label !leading-[11px]'}}>
              {positions.map((position) => (
                <Option key={position.id} value={position.name}>
                  {position.name}
                </Option>
              ))}
            </Select>
          </div>
          <Input 
            size="sm"
            type="password"
            name="password_random_123"
            label="Password" 
            autoComplete="off"
            aria-autocomplete="none"
            variant="static"
            className="form-input"
            labelProps={{className: 'form-label !leading-[11px]'}}
          />
        </div> 
        <Checkbox
          label={
            <Typography variant="small" color="gray" className="flex items-center font-normal mt-4">
              I agree the
              <Link to={'/terms-of-service'} className="font-medium transition-colors hover:text-cyan-700">
                &nbsp;Terms and Conditions
              </Link>
            </Typography>
          }
          color="cyan"
          ripple={true}
          containerProps={{className: "-ml-2.5 mt-4"}}
        />
        <Button className="mt-6 text-white font-semibold bg-cyan-700" fullWidth onClick={signup}>
          Register 
        </Button>
        <Typography color="gray" className="mt-4 text-center font-normal">
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
