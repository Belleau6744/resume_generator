import ReviewCenter from 'components/reviewerCenter/review/ReviewCenter';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Login from './components/authentication/Login';
import Signup from './components/authentication/Signup';
import Home from './components/Home';
import NavBar from './components/navigation/NavBar';
import ResumeBuilder from './components/studentCenter/builder/ResumeBuilder';
import PdfPreview from './components/studentCenter/generator/PdfPreview';
import { auth } from './firebase/firebase';
import { Features } from './redux/features';

const App = () => {
  const dispatch = useDispatch();
  const userID = useSelector(Features.UserFeature.selector.getUserID);
  const isUserSignedIn = useSelector(Features.UserFeature.selector.isUserSignedIn);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(Features.UserFeature.action.setUserAuthStatus(true));
        dispatch(Features.UserFeature.action.setUserID(user.uid));
      } else {
        dispatch(Features.UserFeature.action.setUserAuthStatus(false));
      }
    });
  }, [dispatch]);

return (
    <BrowserRouter basename='/resume_generator'>
        {isUserSignedIn && <NavBar />}
        <ToastContainer />
        <Routes>
        {!isUserSignedIn ? (
          <>
            <Route path='/signup' element={<Signup/>}/>
            <Route path='/login' element={<Login />}/>
            <Route path='*' element={<Navigate to="/login" />} />
          </>
        ) : (
          <>
            <Route path='/' element={<Home userID={userID}/>} />
            <Route path='/preview/:resumeID' element={<PdfPreview />}/>
            <Route path='/builder/:resumeID' element={<ResumeBuilder />}/>
            <Route path='/review/:resumeID' element={<ReviewCenter />}/>
            <Route path='*' element={<Navigate to="/" />} />
          </>
        )}
        </Routes>
    </BrowserRouter> 
  )
}

export default App
