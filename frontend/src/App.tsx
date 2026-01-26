import { Route, Routes } from 'react-router-dom'
import LandingPage from './components/landingPage'
import Login from './components/login'
import Homepage from './components/homepage'
import MainLayout from './components/mainLayout'
import AdminDashboard from './components/adminDashboard'
import MovieDetail from './components/movieDetail'
import Register from './components/register'

function App() {

  return (
    <>
    <Routes>
      <Route path='/' element={<LandingPage/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/admin' element={<AdminDashboard/>}></Route>
      
      <Route element={<MainLayout/>}>
        <Route path='/home' element={<Homepage/>}/>
        <Route path="/movies/:id" element={<MovieDetail/>} />
      </Route>
    </Routes>
    </>
  )
}

export default App
