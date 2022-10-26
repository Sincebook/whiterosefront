import Home from '../pages/Home';
import About from '../pages/About';
import { Navigate } from 'react-router-dom';

export default [
    {
        path: '/',
        element: <Navigate to="/about" />
    }, {
        path: 'about',
        element: <About/>
    }, {
        path: 'home',
        element: <Home/>
    }
]

