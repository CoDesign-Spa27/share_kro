import React,{useState,useRef,useEffect} from 'react'
import { HiMenu } from 'react-icons/hi'
import { XCircle } from 'lucide-react'
import { Link,Route, Routes} from 'react-router-dom'
import {Sidebar,UserProfile} from '../components'  
import { userQuery } from '../utils/data'
import Pins from './pins'
import { client } from '../client'
import logo from '../assets/logo.png'
import { fetchUser } from '../utils/fetchUser'

 const Home = () => {
   const [toggleSidebar,setToggleSidebar]=useState(false)
   const [ user,setUser] =useState(null)
   const scrollRef=useRef(null);


   const userInfo = fetchUser();
   
   useEffect(()=>{
   const query = userQuery(userInfo?.azp);
  
   client.fetch(query).then((data)=>{
    setUser(data[0]);
     })

   },[])

   useEffect(()=>{
  scrollRef.current.scrollTo(0,0)
   },[])
  return (
    <div className='flex bg-white md:flex-row flex-col h-full transaction-height duration-75 ease-out'>
      <div className='hidden md:flex h-screen flex-initial '>
        <Sidebar user={user && user} closeToggle={setToggleSidebar}/>
      </div>
      <div className='flex md:hidden flex-row   gap-5'>
        <div className='p-2 w-full flex flex-row justify-between shadow-md items-center'>

        <HiMenu fontSize={30} className='cursor-pointer text-black '
        onClick={()=>setToggleSidebar(true)}
        />
        <Link to="/">
        <img src={logo} alt="logo" className='w-24' />
        </Link>
        <Link to={`user-profile/${user?._id}`}>
        <img src={user?.image} alt="logo" className=' w-16 rounded-full' />
        </Link>
        </div>
        {toggleSidebar && (
        <div className='fixed w-4/5 bg-white h-screen overflow-y-auto shadow-md z-10 animate-slide-in'>
        
        <div className=' absolute w-full justify-end items-center px-3 pt-8 '>
          <XCircle fontSize={30} className='cursor-pointer' onClick={()=> setToggleSidebar(false)} />
       <Sidebar user={user && user} closeToggle={setToggleSidebar}  />
        </div>

        </div>
      )}
      </div>
     
      <div className='pb-2 flex-1 h-screen overflow-y-scroll 'ref={scrollRef} >
        <Routes >
           <Route path="/user-profile/:userId" element={<UserProfile/>}/>
           <Route path="/*" element={<Pins user={user && user}/>}/>

          </Routes> 
      
      </div>
    </div>
  )
}

export default Home