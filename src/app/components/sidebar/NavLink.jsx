"use client"
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

function NavLink({children,icon,...others}) {
  const [isActive, setActive] = useState(false);
  const pathname = usePathname()
  useEffect(() => {
    if(pathname===others.href){
      setActive(true);
    }
    else{
      setActive(false);
    }
  }, [pathname])
  return (
    <Link {...others} className={`relative font-medium flex text-2xl gap-4 p-4 items-center justify-center lg:justify-normal border-y border-transparent  hover:border-grays-200 hover:bg-grays-100 ${isActive && "bg-grays-100"} transition-all`}>
        <span className={(isActive ? "text-white transition-colors text-lg" : "text-text-900 text-lg")}>{icon}</span>
        <span className={(isActive ? "font-bold " : "font-normal ")+"transition-all hidden lg:block"}>{children}</span>
    </Link>
  )
}

export default NavLink