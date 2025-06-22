import Left from './home/left/Left'
import Right from './home/right/Right'
import Logout from './home/left1/Logout'
import Signup from './Components/Signup'
import Login from './Components/Login'
import { useAuth } from './context/AuthProvider'
import { Toaster } from 'react-hot-toast';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

function App() {
  const [ authUser, setAuthUser ] = useAuth(); 
  // console.log(authUser);

  return (
    <>
      <Router>
        <Routes>
        <Route path='/' element={authUser? (
          <div className='flex h-screen'>
          <Logout/>
          <Left/>
          <Right/>
        </div>) : (<Navigate to ={"/login"}/>)
        }/>

        <Route path='/signup' element={authUser ? <Navigate to ={"/"}/>: <Signup/>}/>
        <Route path='/login' element={authUser ? <Navigate to ={"/"}/> : <Login/>}/>
        </Routes>
      </Router>
         <Toaster />
    </>
  );

}

export default App;




