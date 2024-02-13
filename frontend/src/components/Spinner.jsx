import React from 'react';
import { Player, Controls } from '@lottiefiles/react-lottie-player';
import loader from '../assets/loader.json'
const Spinner = ({message}) => {
  return (
    <div className='flex flex-col justify-center items-center w-full h-full'>
         <Player
  autoplay
  loop
  src={loader}
  style={{ height: '100px', width: '100px' }}
>
 
</Player>
        <p className='text-lg text-center px-2'>{message}</p>
    </div>
  )
}

export default Spinner
