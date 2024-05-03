import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';
import Login from './components/authentication/Login';
import NavBar from './components/navigation/NavBar';
import styled from 'styled-components';

const App = () => {

  const Layout = () => {
    return (
      <>
        <NavBar />
        <Container>
          <Outlet />
        </Container>
      </>
    )
  }

  const router = createBrowserRouter([
    {
      element: <Layout/>,
      path: '/resume-generator',
      children: [
        // {
        //   path: "/resume-generator/signup"
        //   element: <Signup />
        // },
        {
          path: '/resume-generator/login',
          element: <Login />
        }
      ]
    }
  ])


  return (
    <RouterProvider router={router}/>
  )
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  height: 100%;
`;

export default App
