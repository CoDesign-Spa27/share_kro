import React,{useState,useEffect} from 'react'
import { useParams,useNavigate} from 'react-router-dom'
import { googleLogout } from '@react-oauth/google'
import { userCreatedPinsQuery,userQuery,userSavedPinsQuery } from '../utils/data';
import { client } from '../client'
import MasonryLayout from './MasonryLayout'
import Spinner from './Spinner'
import { MdLogout } from 'react-icons/md';
const randomImage='https://source.unsplash.com/1600x900/?nature,photography,technology'

const activeBtnStyle='bg-[#00afb9] mx-2 text-white font-bold p-2 rounded-full w-20 outline-none'
const notActiveBtnStyle=' text-white mx-2 font-bold p-2 rounded-full w-20 outline-none'


const UserProfile = () => {
  const [user,setUser]=useState(null)
  const [pins,setPins]=useState(null)
  const [text,setText]=useState('Created')
  const [activeBtn,setActiveBtn]=useState('created')
   
  
  const navigate=useNavigate();

  const{ userId }=useParams();

  useEffect(()=>{
const query = userQuery(userId);

client.fetch(query).then((data)=>{
  setUser(data[0]);
})
  },[userId])



  useEffect(()=>{
  if(text ==='Created'){

    const createdPinQuery=userCreatedPinsQuery(userId);
    client.fetch(createdPinQuery).then((data)=>{
      
      setPins(data)
    });
  }
  else{
   const savedPinQuery=userSavedPinsQuery(userId);

   client.fetch(savedPinQuery).then((data)=>{
    setPins(data)
   });
  }
  },[text,userId])


  const logout=()=>{
   googleLogout();
    localStorage.clear();
    navigate('/login')
  }




  if(!user){
    return <Spinner message="Loading Profile" />
  }
  return (
    <div className='relative pb-2 h-full justify-center items-center'>
      <div className='flex flex-col pb5'>
        <div className='relative flex flex-col mb-7'>

          <div className='flex flex-col justify-center items-center'>
            <img src={randomImage} 
            className='w-full h-370 2xl:h-510 shadow-lg object-cover'
            alt="COver Photo" />
            <img 
            className='rounded-full w-20 -mt-10 shadow-xl object-cover'
            src={user.image} alt="" />

            <h1 
            className='font-bold text-3xl text-center mt-3'
            >{user.username}
            </h1>
            <div
            className='absolute top-0 z-1 right-0 p-2 '
            >
             {userId === user._id &&(
                 <button
                   className='bg-[#00afb9] flex gap-1
                   sm:text-lg items-center py-2 px-4 rounded-full capitalize font-bold'
                 onClick={logout}
                 ><MdLogout/> logout</button>
             )}
            </div>
          </div>
       <div 
       className='text-center my-5'
       >
        <button type='button'
        onClick={(e)=>{setText(e.target.textContent);
          setActiveBtn('created')
        }}
      
        className={`${activeBtn === 'created'?activeBtnStyle:notActiveBtnStyle}`}
        > 
        Created
        </button>
        <button type='button'
        onClick={(e)=>{setText(e.target.textContent)
        setActiveBtn('saved')}
    }

        className={`${activeBtn === 'saved'?activeBtnStyle:notActiveBtnStyle}`}
        > 
        Saved
        </button>
       </div>
       <div className="px-2">
          <MasonryLayout pins={pins} />
        </div>
        {pins?.length === 0 && (
        <div className="flex justify-center font-bold items-center w-full text-1xl mt-2">
          No Pins Found!
        </div>
        )}
        
        </div>
      </div>
      
    </div>
  )
}

export default UserProfile
