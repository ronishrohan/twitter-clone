import React from 'react'

function Button({active,children}){
    return <button className={`relative w-1/2 overflow-hidden flex justify-center items-center hover:bg-[rgba(255,255,255,0.1)] ${active ? "font-bold" : "font-semibold text-text-500"}`}>
        <span className='z-10'>{children}</span>
        {active && <div className='absolute -bottom-full blur-3xl w-1/2 h-16 bg-accent-900' ></div>}
    </button>
}

function TopBar() {
  return (

    <div className='sticky top-0 w-full border-b z-50 border-grays-200 min-h-14 flex text-text-900'>
        <Button active={true}>For You</Button>
        <Button active={false}>Following</Button>
    </div>
  )
}

export default TopBar