import React,{ useState, useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { client } from '../client'
import MasonryLayout from './MasonryLayout'
import Spinner from './Spinner'
import { feedQuery, searchQuery } from '../utils/data'

const Feed = () => {
  const [loading,setLoading]=useState(false)
  const [ pins,setPins]=useState(null)
  const { categoryId } =useParams();

  const navigate=useNavigate();
  useEffect(()=>{
    setLoading(true)
   if(categoryId){
    const query=searchQuery(categoryId);// specific category
   
    //logic to search for all the posts for specified category
    client.fetch(query).then((data)=>{
      setPins(data);
      setLoading(false);
    })
   }
   else 
   {
    //logic to fetch all the pins
 client.fetch(feedQuery).then((data)=>{
  setPins(data);
  setLoading(false);
 })
   }
  },[categoryId])
  if(loading) return <Spinner message="Getting Your Data" />

  if(!pins?.length)return <h2 className='text-center py-5' >No Pins Available.
  <button className='bg-[#00afb9] mx-2 text-white font-bold p-2 rounded-full w-20 outline-none
  '
  onClick={()=>{
    navigate('/create-pin')
  }}
  >Create</button>
   </h2>
  return (
    <div>
      {pins && <MasonryLayout  pins={pins}/>}
    </div>
  )
}

export default Feed
