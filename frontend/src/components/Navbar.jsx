import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useTheme } from '../contexts/ThemeContext';

import { IoMdAdd, IoMdSearch } from 'react-icons/io'
import DarkMode from './DarkMode';
const Navbar = ({searchTerm, setSearchTerm,user}) => {
const {theme} = useTheme();
  const navigate= useNavigate();

  if(!user)
    return null
  return (
    <div className='flex
     gap-2 md:gap-5 w-full mt-5 pb-7 '
     style={{ color: theme === 'light' ? 'black' : 'white' }}
     >
      <div
      className='flex justify-start items-center w-full px-2 rounded-md   border-none outline-none focus-within:shadow-sm '
      >

         <IoMdSearch fontSize={21} color='#00afb9' className='mx-2' />
         <input type="text"
         onChange={(e)=>{setSearchTerm(e.target.value)}}
         placeholder='Search'
         value={searchTerm} 
         onFocus={()=>navigate('/search')}
         className='w-full py-2 mx-2 rounded-full text-center border-b-2 border-[#00afb9] outline-none focus:border-[#00afb9]'
         />
         <DarkMode/>
      </div>
      <div className='flex gap-3'>
   <Link to={`user-profile/${user?._id}`} className='hidden md:block'>
   <img src={user.image} alt="user"
   className='w-14 h-12 rounded-full'
   /> 
  
   </Link>
    
     <Link to="create-pin" className='  rounded-lg w-12 h-12 md:w-14 md-h-12 flex justify-center items-center'>
      
  <IoMdAdd />
   </Link>
      </div>
    </div>
  )
}

export default Navbar
