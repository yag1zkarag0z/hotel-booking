import React from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import './App.css'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home';
import AllRooms from './pages/AllRooms';
import RoomDetails from './pages/RoomDetails';
import MyBookings from './pages/MyBookings';
import NotFound from './pages/NotFound';
import Toast from './components/Toast';
import OwnerDashboard from './pages/OwnerDashboard';

const App = () => {

  const isOwnerPath = useLocation().pathname.includes("owner");
  
  

  return (
    <div>
      <Toast />
      {!isOwnerPath && <Navbar />}
      <div className='min-h-[70vh]'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/hotels' element={<AllRooms />} />
          <Route path='/rooms/:id' element={<RoomDetails/>}/>
          <Route path='/my-bookings' element={<MyBookings />} />
          <Route path='/owner' element={<OwnerDashboard />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </div>
      {!isOwnerPath && <Footer />}
    </div>
  )
}

export default App
