import { useContext } from 'react';
import { myContext } from './Context.tsx'
import { Navigate } from 'react-router-dom';

function PrivateRoute({ children } : { children:JSX.Element}) {
    const userObject = useContext(myContext)
    return userObject ? children : <Navigate to='/login'/>
}

export default PrivateRoute;

