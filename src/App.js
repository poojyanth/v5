import './App.css';
import Home from './Pages/Home/Home'; 
import Login from './Pages/Login/Login';
import Profile from './Pages/Profile/Profile';
import Organization from './Pages/OrganizationPage/Organization';
import { toast, ToastContainer } from 'react-toastify';
import Signup from './Pages/Signup/Signup';
import Explorepage from './Pages/ExplorePage/Explorepage';
import AddNewPost from './Pages/Addnewpost/Addnewpost';
import PostPage from './Pages/PostPage/PostPage';
import SearchPage from './Pages/SearchPage/SearchPage';
import SettingsPage from './Pages/SettingsPage/SettingsPage';
import Chat from './Pages/Chat/Chat';
import ViewStoryImage from './Component/Storiescontainer/ViewStoryImage';
import LandingPage from './Pages/LandingPage/LandingPage';
import LoadingAnimation2 from './Pages/test/test';  
// import Explore from './Component/Explore/Explore';
import Carousel from './Pages/Reels/Carousel';
import AdminPage from './Pages/Admin/Admin';
import Likedposts from './Pages/Likedposts/Likedposts';
import { useSelector}  from 'react-redux'
import Addnewreel from './Component/AddnewReel/Addnewreel';

 
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";


function App() {

  const userDetails = useSelector((state)=>state.user);
  let user = userDetails.user;

  return (

   
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={user!== null ? <Home/>: <Navigate to={"/landingpage"}/>} />
          <Route exact path="/landingpage" element={<LandingPage/>}/>
          <Route exact path="/organization/:id" element={user!== null && user.user.type===2 ? <Organization/>: <Navigate to={"/landingpage"}/>}/>
          <Route exact path="/profilepage/:id" element={user!== null ? <Profile/>: <Login/>}/>
          <Route exact path="/signup" element={user!== null ? <Navigate to={"/"}/> : <Signup/>}/>
          <Route exact path="/login" element={user!== null ? <Navigate to={"/"}/> : <Login/>}/>  
          <Route exact path="/postpage/:postid" element={user!== null ? <PostPage/> : <Navigate to={"/landingpage"}/>}/>
          <Route exact path="/chat" element={user!== null ? <Chat/>: <Navigate to={"/landingpage"}/>} />
          <Route exact path="/get_all_liked_posts" element={<Likedposts />} />
          <Route exact path="/explorepage" element={user!== null ? <Explorepage/> : <Navigate to={"/landingpage"}/>}/>
          <Route exact path="/addnewpost" element={user!== null ? <AddNewPost/> : <Navigate to={"/landingpage"}/>}/>
          <Route exact path="/searchpage/:key" element={user!== null ? <SearchPage/> : <Navigate to={"/landingpage"}/>}/>
          <Route path="/settings/:settingName" element={user!== null ? <SettingsPage /> : <Navigate to={"/landingpage"}/>} />
          <Route exact path="/settings/*" element={user!== null ? <Navigate to={'/settings/Profile'}/>: <Navigate to={"/landingpage"}/>}/>
          <Route exact path="/admin/:category" element={user!==null && user.user.username==='Admin' ? <AdminPage/> : <Navigate to={'/'}/>}/>  
          <Route exact path="/admin" element={user!==null && user.user.username==='Admin' ? <AdminPage/> : <Navigate to={'/'}/>}/>
          <Route exact path="/*" element={<Navigate to={"/"}/>}/>
          <Route exact path="/test" element={<LoadingAnimation2 />} />
          <Route exact path="/viewstory/:pictureid" element={< ViewStoryImage/>}/> 
          <Route exact path="/likedposts" element={< Likedposts/>}/>
          {/* <Route exact path="/explore" element={<Explore/>}/> */}
          <Route exact path="/reels" element={<Carousel items={
            [
        {video:'https://firebasestorage.googleapis.com/v0/b/fdfed-d64be.appspot.com/o/VID-20220310-WA0087.mp4?alt=media&token=ee7c6008-b3e5-4273-9e15-c4677126605b',description:'ninth_video99999999999999999'}
      ]
        }/>}/>
        <Route exact path="/addnewreel" element={<Addnewreel/>} />
        </Routes>
      </Router>
      <ToastContainer />
    </div>
   
  );
}

export default App;
