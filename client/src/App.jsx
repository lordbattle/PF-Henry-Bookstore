import 'bootstrap/dist/css/bootstrap.min.css'
import "./main.css"
// import Stack from 'react-bootstrap/Stack'
import { Route, Routes, useLocation } from 'react-router-dom'
import Nav from './components/Nav/Nav'
import LandingPage from './components/LandingPage/LandingPage'
import About from './components/About/About'
import Home from './components/Home/Home'
import Login from './components/Login/Login'
import Footer from './components/Footer/Footer'

function App() {

  const { pathname } = useLocation();

  return (
    <div className='container'>
      {/* <Stack direction="horizontal" gap={3}>
</Stack> */}
        { pathname !== '/' && <Nav />}

      <Routes>
        <Route path='/' element={<LandingPage />}></Route>
        <Route path='/home' element={<Home />}></Route>
        <Route path='/about' element={<About />}></Route>
        <Route path='/login' element={<Login />}></Route>
      </Routes> 
      { pathname !== '/' && <Footer />}
  </div>
  )
}

export default App
