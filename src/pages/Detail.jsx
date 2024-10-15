import React from 'react'
import { useSelector } from 'react-redux'

function Detail() {
    const {detail}=useSelector((state)=>state.blog)
    console.log(detail);
  return (
    <div>

        
    </div>
  )
}

export default Detail