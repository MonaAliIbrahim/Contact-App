import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import Register from "../../pages/Register";
import SignUp from '../../components/Signup';
import Login from '../../components/Login';
import PageNotFound from '../../pages/PageNotFound';
const MasterLayout = lazy(() => import('../../masterLayout/MasterLayout'));
const Home = lazy(() => import('../../pages/Home'));
const Settings = lazy(() => import('../../pages/Settings'));
const Terms = lazy(() => import('../../pages/Terms'));

export const routes= createBrowserRouter([
  { path: "", redirectTo: <MasterLayout/> },
  { path: "/", element: <MasterLayout/>, errorElement: <Home/>, children: 
    [
      { index: true, element: <Home/> },
      { path: '/settings', element: <Settings/> },
    ]
  },
  { path: "register", element: <Register/>, children: [
      { index: true, element: <Login/> },
      { path: '/register/signup', element: <SignUp/> },
    ]
  },
  { path: "terms-of-service", element: <Terms/> },
  { path: '*', element: <PageNotFound/> }
]);
