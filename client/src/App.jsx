import 'bootstrap/dist/css/bootstrap.min.css'
import { Route, Routes, useLocation } from 'react-router-dom'
import Nav from './components/Nav/Nav'
import LandingPage from './components/LandingPage/LandingPage'
import About from './components/About/About'
import Home from './components/Home/Home'
import Login from './components/Login/Login'

function App() {

  const { pathname } = useLocation();

  return (
    <div className='container'>
      

        { pathname !== '/' && <Nav />}

      <Routes>
        <Route path='/' element={<LandingPage />}></Route>
        <Route path='/home' element={<Home />}></Route>
        <Route path='/about' element={<About />}></Route>
        <Route path='/login' element={<Login />}></Route>
      </Routes>
  </div>
  )
}

export default App
