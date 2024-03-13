"use client"
import React, { useEffect, useLayoutEffect, useState } from 'react'
import QuickAccess from './QuickAccess';

function QuickAccessHolder() {
  const [width, setWidth] = useState(400);
    useEffect(() => {
        function changeWidth(){
            
            if(window.innerWidth < 1024){
                setWidth(0)
            }
            else{
                setWidth(400)
            }
        }
        window.addEventListener("resize", changeWidth);
        return () => window.removeEventListener("resize", changeWidth)
    }, [])

  return (
    <div  style={{width: width}} className="relative  shrink-0 transition-all">
      <QuickAccess width={width}></QuickAccess>
    </div>
)}

export default QuickAccessHolder