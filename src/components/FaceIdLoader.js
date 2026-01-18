import React from 'react'
import Lottie from 'lottie-react'
import FaceId from '../../public/lootie/FaceID.json'

function FaceIdLoader() {
  return (
    <div className=' flex justify-center items-center h-screen w-screen fixed bg-white z-5000'>
      <Lottie animationData={FaceId} loop autoplay style={{height:'20vh'}}/>
    </div>
  )
}

export default FaceIdLoader
