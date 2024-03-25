import React from 'react'
import useDarkMode from '@/hooks/darkMode'
import {useEffect, useState} from "react"
import useMediaQuery from '@/hooks/useMediaQuery'
export const useHasMounted = () => {
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    setHasMounted(true)
  }, [])

  return hasMounted
}

export const DarkModeToggle = () => {
    const [colorTheme, setTheme] = useDarkMode();
    const isDesktop =  useMediaQuery("(min-width:768px)");

  return (
    <div className={'group fixed right-0 p-2 flex justify-center w-24 h-24 z-50 ' + (isDesktop ? 'bottom-16 ' : 'bottom-16' )}>
    <div className=' shadow-xl flex items-center justify-center p-3 rounded-full absolute bg-accent '>
        {useHasMounted && colorTheme === "light" ? (
        <LightIcon onClick={() => setTheme("light")}/>
        ) : (
        <MoonIcon onClick={() => setTheme("dark")}/>  
      )
    }
    </div>
    </div>
  )
}




function LightIcon(props) {
    return (
      <div>
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        className="h-10 w-10 "
        width="24"
        height="24"
        fill="none"
        strokeWidth="1.5"
        color="#000"
        viewBox="0 0 24 24"
      >
        
        <path
          stroke="#000"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 2l-1 1M3 2l1 1M21 16l-1-1M3 16l1-1M9 18h6M10 21h4M12 3C8 3 5.952 4.95 6 8c.023 1.487.5 2.5 1.5 3.5S9 13 9 15h6c0-2 .5-2.5 1.5-3.5h0c1-1 1.477-2.013 1.5-3.5.048-3.05-2-5-6-5z"
        ></path>
      </svg>
      </div>
    );
  }
  
  function MoonIcon(props) {
    return (
      <div>
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        className="h-10 w-10 "
        width="24"
        height="24"
        fill="none"
        strokeWidth="1.5"
        color="#000"
        viewBox="0 0 24 24"
      >
        <circle cx="12" cy="12" r="10" stroke="#000"></circle>
        <path
          stroke="#000"
          d="M7.633 3.067A3.001 3.001 0 114.017 6.32M22 13.05a3.5 3.5 0 10-3 5.914"
        ></path>
        <path
          stroke="#000"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M14.5 8.51l.01-.011M10 17a2 2 0 100-4 2 2 0 000 4z"
        ></path>
      </svg>
      </div>
    );
  }