import { onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';
import Login from './components/authentication/Login';
import Signup from './components/authentication/Signup';
import Home from './components/Home';
import NavBar from './components/navigation/NavBar';
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
      path: '/resume-generator/',
      children: [
        {
          path: "/resume-generator/signup",
          element: <Signup />
        },
        {
          path: '/resume-generator/login',
          element: <Login />
        },
        {
          path: '/resume-generator/',
          element: <Home userID={userID} />
        }
      ]
    }
  ])


  return (
    <RouterProvider router={router}/>
  )
}

export default App
