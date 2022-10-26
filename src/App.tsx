import React from 'react'; 
import { NavLink, useRoutes } from 'react-router-dom';
import router from "./router";

function App() {
    const element = useRoutes(router);
    return (
        <div>
            <NavLink to="/about">About</NavLink>
            <br/>
            <NavLink to="/home">Home</NavLink>
            {element}
        </div>
    )
}

export default App;
