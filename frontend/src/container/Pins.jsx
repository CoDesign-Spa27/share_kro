import React,{ useState} from 'react'
import { Routes, Route } from 'react-router-dom'
import { Navbar,Feed,PinDetails,CreatePin,Search} from '../components/index'

import { useTheme } from '../contexts/ThemeContext';
 
const Pins = ({user}) => {
  const { theme }=useTheme()
  const [searchTerm,setSearchTerm]=useState('')
  return (
    <div className='px-2 md:px-5'
    style={{ color: theme === 'light' ? 'black' : 'white' }}
    > 
       <div
        >
       <Navbar
       user={user}
       searchTerm={searchTerm}
       setSearchTerm={setSearchTerm}
       />
       </div>
       <div className='h-full'>
    <Routes>
      <Route path='/' element={<Feed />} />
      <Route path='/category/:categoryId' element={<Feed />} />
      <Route path='/pin-detail/:pinId' element={<PinDetails user={user} />} />
      <Route path='/create-pin' element={<CreatePin user={user} />} />
      <Route path='/search' element={<Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />} />
    </Routes>
       </div>
    </div>
  )
}

export default Pins
