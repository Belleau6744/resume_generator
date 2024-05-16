import { onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import Login from './components/authentication/Login';
import Signup from './components/authentication/Signup';
import Home from './components/Home';
import NavBar from './components/navigation/NavBar';
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
      path: '/resume_generator/',
      children: [
        {
          path: "/resume_generator/signup",
          element: <Signup />
        },
        {
          path: '/resume_generator/login',
          element: <Login />
        },
        {
          path: '/resume_generator/',
          element: <Home userID={userID} />
        },
        {
          path: '/resume_generator/test',
          element: <PdfTemplate resumeId={''} userId={undefined} />
        }
      ]
    }
  ])


  return (
    <RouterProvider router={router}/>
  )
}

export default App
