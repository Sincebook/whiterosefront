import React, { ReactElement, useEffect } from 'react'; 
import { NavLink, useRoutes } from 'react-router-dom';
import './style/App.css';
import router from "./router";
import { findMyInfo, addUser } from "./api/user"

function App(): ReactElement {
  const element = useRoutes(router);

  useEffect(() => {
    const token: string = localStorage.getItem('token')
    if (!token || token === "undefined") {
      addUser().then(res => {
        localStorage.setItem('token', res);
      })
    } else {
      findMyInfo().then(res => {
        console.log('findMyInfo res:', res);
      })
    }
  }, [])

  return (
    <div>
      {element}
    </div>
  )
}

export default App;
