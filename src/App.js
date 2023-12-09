import './App.css';
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import Profile from './Pages/Profile/Profile';
import { toast, ToastContainer } from 'react-toastify';
import Signup from './Pages/Signup/Signup';
import { useSelector}  from 'react-redux'

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";


function App() {

  const userDetails = useSelector((state)=>state.user);
  // console.log(userDetails)
  let user = userDetails.user;
  // console.log(user.user.username);
  // console.log(user.user._id)


  return (

   
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route exact path="/profilepage/:id" element={<Profile />} />
          <Route exact path="/signup" element={user!== null ? <Navigate to={"/"}/> : <Signup/>}/>
          <Route exact path="/login" element={user!== null ? <Navigate to={"/"}/> : <Login/>}/>

        </Routes>
      </Router>
      <ToastContainer />
    </div>
   
  );
}

export default App;
