import { useLayoutEffect } from 'react';
import { Outlet } from 'react-router-dom';
import './App.scss';

function App() {

  useLayoutEffect(() => {
    if(!localStorage.getItem('theme')) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
    else {
      document.documentElement.classList.remove('dark');
      localStorage.removeItem('theme');
    }
  }, [])

  return (
    <Outlet />
  );
}

export default App;
