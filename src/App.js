import './App.css';
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import Profile from './Pages/Profile/Profile';
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
          <Route exact path="/" element={user!== null ? <Home/>: <Navigate to={"/landingpage"}/>} />
          <Route exact path="/landingpage" element={<LandingPage/>}/>
          <Route exact path="/profilepage/:id" element={user!== null ? <Profile/>: <Navigate to={"/landingpage"}/>}/>
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
          <Route exact path="/admin" element={user!==null && user.user.username==='Admin' ? <AdminPage/> : <Navigate to={'/'}/>}/>
          <Route exact path="/*" element={<Navigate to={"/"}/>}/>
          <Route exact path="/test" element={<LoadingAnimation2 />} />
          <Route exact path="/viewstory/:pictureid" element={< ViewStoryImage/>}/>
          {/* <Route exact path="/explore" element={<Explore/>}/> */}
          <Route exact path="/reels" element={<Carousel items={['https://firebasestorage.googleapis.com/v0/b/fdfed-d64be.appspot.com/o/1703178916135Snapchat-1450444302.mp4?alt=media&token=9ed77aae-978b-4f05-97dc-daeec89dba14',
        'https://firebasestorage.googleapis.com/v0/b/fdfed-d64be.appspot.com/o/1703179138384VID-20211205-WA0000.mp4?alt=media&token=c1ee486e-6023-4593-bf58-cc73ebff1b4b',
        'https://firebasestorage.googleapis.com/v0/b/fdfed-d64be.appspot.com/o/1703179290310VID-20220507-WA0022.mp4?alt=media&token=8659bf27-1f96-45a4-ba74-da59c226875e',
        'https://firebasestorage.googleapis.com/v0/b/fdfed-d64be.appspot.com/o/1703179345780VID-20211205-WA0042.mp4?alt=media&token=fbcfa653-8365-419e-8b81-fe73103d266d',
        'https://firebasestorage.googleapis.com/v0/b/fdfed-d64be.appspot.com/o/1703179432832Snapchat-1736359431.mp4?alt=media&token=7d3dcba3-9b3b-444e-bda3-703d01bb8cbb',
        'https://firebasestorage.googleapis.com/v0/b/fdfed-d64be.appspot.com/o/1703179500001VID_20221119_114322_135.mp4?alt=media&token=5594e2da-3972-459e-aa27-8bd16dbe9501',
        'https://firebasestorage.googleapis.com/v0/b/fdfed-d64be.appspot.com/o/1703179557072VID-20211205-WA0041.mp4?alt=media&token=9ac5ea8d-6c88-47e6-87a4-4c6b06c4db3c']}/>}/>
        </Routes>
      </Router>
      <ToastContainer />
    </div>
   
  );
}

export default App;
