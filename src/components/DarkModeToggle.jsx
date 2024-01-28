import React from 'react'
import useDarkMode from '@/hooks/darkMode'

export const DarkModeToggle = () => {
    const [colorTheme, setTheme] = useDarkMode();

  return (
    <div className='group fixed bottom-0 right-0 p-2  flex items-end justify-end w-24 h-24  '>
    <div className=' shadow-xl flex items-center justify-center p-3 rounded-full z-50 absolute bg-accent '>
        {colorTheme === "light" ? (
        <div onClick={() => setTheme("light")}>
        <LightIcon />
        </div>
        ) : (
          <div onClick={() => setTheme("dark")}>
        <MoonIcon />
        </div>
      )
    }
    </div>
    </div>
  )
}


function LightIcon(props) {
    return (
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
    );
  }
  
  function MoonIcon(props) {
    return (
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
    );
  }