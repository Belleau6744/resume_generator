import { onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Login from './components/authentication/Login';
import Signup from './components/authentication/Signup';
import Home from './components/Home';
import NavBar from './components/navigation/NavBar';
import ResumeBuilder from './components/studentCenter/builder/ResumeBuilder';
import PdfTemplate from './components/studentCenter/generator/PdfTemplate';
import { auth } from './firebase_setup/firebase';
import { Features } from './redux/features';

const App = () => {
  const dispatch = useDispatch();
  const userID = useSelector(Features.UserFeature.selector.getUserID);

  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
        if (user) {
          dispatch(Features.UserFeature.action.setUserAuthStatus(true));
          dispatch(Features.UserFeature.action.setUserID(user.uid))
          // User is signed in
        } else {
          dispatch(Features.UserFeature.action.setUserAuthStatus(false));
          // User is signed out
        }
      });
}, [dispatch])

  const Layout = () => {
    return (
      <>
        <NavBar />
        <Outlet />
      </>
    )
  }

  const router = createBrowserRouter([
    {
      element: <Layout/>,
      path: '/',
      children: [
        {
          path: "/signup",
          element: <Signup />
        },
        {
          path: '/login',
          element: <Login />
        },
        {
          path: '/',
          element: <Home userID={userID} />
        },
        {
          path: '/test',
          element: <PdfTemplate resumeId={''} userId={undefined} />
        },
        {
          path: '/builder/:resumeID',
          element: <ResumeBuilder />
        }
      ]
    }
  ], { basename: '/resume_generator'})


  return (
    <RouterProvider router={router}/>
  )
}

export default App
