import LoginPage from './components/LoginPage.tsx'
import PrivateRoute from './components/PrivateRoute.tsx'
import Content from './components/Content.tsx'
import { Route, Routes, Navigate } from 'react-router-dom'
import { useContext } from 'react'
import { myContext } from './components/Context.tsx'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const userObject = useContext(myContext)
  
  return (
      <Routes>
        <Route path='/login' element={userObject ? <Navigate to='/' /> : <LoginPage/>}/>
        <Route path='*' element={<PrivateRoute><Content/></PrivateRoute>} />
      </Routes>
   
  );
}

export default App;