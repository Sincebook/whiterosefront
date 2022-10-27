import React from 'react'; 
import { NavLink, useRoutes } from 'react-router-dom';
import { Button } from 'antd';
import './style/App.css';
import router from "./router";

function App() {
    const element = useRoutes(router);
    return (
      <div>
        <Button type="primary">Button</Button>
        <NavLink to="/about">About</NavLink>
        <br/>
        <NavLink to="/home">Home</NavLink>
        {element}
      </div>
    )
}

export default App;
