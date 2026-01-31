import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './pages/Login'
import Private from './Components/Private';
import CreateBlog from './pages/CreateBlog';
import Navbar from './Components/Navbar'
import Dashboard from './pages/DashBoard';

const App=()=> {

  return (
    <BrowserRouter>
    <Navbar/>
    <Routes>
       <Route path='/login' element={<Login />}/>
       {/* <Route path='/about' element={<About />}/> */}
       {/* <Route path={import.meta.env.VITE_PRIVATE_URL} element={currentUser ? <Private /> : <SignIn />}/> */}

    <Route element={ <Private /> }>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/blogs/create" element={<CreateBlog />} />
    </Route>
    
    </Routes>
    {/* <ToastContainer theme='dark' position="top-right" autoClose={3000} draggable className='mt-16'/> */}
     {/* <Footer />  */}
    </BrowserRouter>
  )
}

export default App
