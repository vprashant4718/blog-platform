import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './pages/Login'
import Private from './Components/Private';
import CreateBlog from './pages/CreateBlog';
import Navbar from './Components/Navbar'
import Dashboard from './pages/DashBoard';
import { ToastContainer } from 'react-toastify';
import AllBlogs from './pages/AllBlogs';
import UserManagement from './pages/UserManagement';
import UpdateBlog from './Components/UpdateBlog';

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
      <Route path="/dashboard/allblogs" element={<AllBlogs />} />
      <Route path="/dashboard/Update/:id" element={<UpdateBlog />} />
      <Route path="/dashboard/usermanagement" element={<UserManagement />} />
    </Route>
    
    </Routes>
    {/* <ToastContainer theme='dark' position="top-right" autoClose={3000} draggable className='mt-16'/> */}
     {/* <Footer />  */}
     <ToastContainer position="top-right" theme='dark' className={'mt-20'} autoClose={3000} />
    </BrowserRouter>
  )
}

export default App
