import React,{ useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { client } from '../client'
import MasonryLayout from './MasonryLayout'
import Spinner from './Spinner'
import { feedQuery, searchQuery } from '../utils/data'

const Feed = () => {
  const [loading,setLoading]=useState(false)
  const [ pins,setPins]=useState(null)
  const { categoryId } =useParams();

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
  return (
    <div>
      {pins && <MasonryLayout  pins={pins}/>}
    </div>
  )
}

export default Feed
