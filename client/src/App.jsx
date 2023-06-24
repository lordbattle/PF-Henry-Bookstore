import 'bootstrap/dist/css/bootstrap.min.css'
import Stack from 'react-bootstrap/Stack'
import { Route, Routes, useLocation } from 'react-router-dom'
import Nav from './components/Nav/Nav'
import LandingPage from './components/LandingPage/LandingPage'
import About from './components/About/About'
import Home from './components/Home/Home'
import Login from './components/Login/Login'
// import { useAuth0 } from '@auth0/auth0-react'

function App() {

  const { pathname } = useLocation();
  // const { isAuthenticated, isLoading } = useAuth0();

  return (
    <div className='container'>
      <Stack direction="horizontal" gap={3}>

        { pathname !== '/' && <Nav />}

      <Routes>
        <Route path='/' element={<LandingPage />}></Route>
        <Route path='/home' element={<Home />}></Route>
        <Route path='/about' element={<About />}></Route>
        <Route path='/login' element={<Login />}></Route>
      </Routes>

      {/* <div className="p-2">NameStore</div>
      <div className="p-2 ms-auto">Products</div>
      <div className="vr" />
      <div className="p-2">Log in</div>
      <div className="p-2">Sign un</div> */} 
      </Stack>
  </div>
  )
}

export default App
