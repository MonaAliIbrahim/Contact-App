import { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "@material-tailwind/react";
import { routes } from './shared/Routing/Routes';
import Loading from './shared/Components/Loading/Loading';
import AuthContextProvider from './shared/Services/AuthStore';
import UserContextProvider from './shared/Services/UserStore';
import ContactContextProvider from './shared/Services/ContactstStore'; 
import MessageContextProvider from './shared/Services/MessageStore';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Suspense fallback={<Loading />}>
    <UserContextProvider>
      <AuthContextProvider>
        <ContactContextProvider>
          <MessageContextProvider>
            <RouterProvider router={routes}>
              <ThemeProvider>
                <App className="scroll-smooth"/>
              </ThemeProvider>
            </RouterProvider>
          </MessageContextProvider>
        </ContactContextProvider>
      </AuthContextProvider>
    </UserContextProvider>
  </Suspense>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
