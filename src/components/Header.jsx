import React from 'react';
import { useState } from 'react';
import { RxHamburgerMenu, RxCrossCircled  } from "react-icons/rx";
import useMediaQuery from '@/hooks/useMediaQuery';
import Image from 'next/image';
import { Button } from './ui/button';
import Link from 'next/link';

const navItems = [
  {name:'Home',link:'/#landing'},
  {name:'About',link:'/#about'},
  {name:'Skills',link:'/#skills'},
  {name:'Projects',link:'/#projects'},
  {name:'Contact',link:'/contact'},
];


//items-center border justify-between py-4 px-7
const Header = () => {

  const [active,setActive] = useState(false);
  const isDesktop =  useMediaQuery("(min-width:768px)");

  return (
    <header className=' w-full'>
      <div className='md:flex items-center justify-between bg-secondary md:bg-opacity-60  md:px-10  bottom-0 md:top-0 w-full md:h-24 h-16 fixed z-30'>
          <div  className='font-bold text-black py-2 mx-2 md:flex'>
            
            <Link className='flex sm:max-w-[50%] md:max-w-[100%]' href={navItems[0].link}>
              <Image src='/homeicon.png' alt='homeicon' width={45} height={45}>
              </Image>
              <h1 className='text-textcolor hover:text-primarytext pt-2 text-xl px-4'>Tommy Do</h1>


            </Link>
            
            </div>
            
            <div onClick={()=> setActive(!active)} className='text-3xl absolute right-8 top-4 cursor-pointer md:hidden text-primarytext'>
            
            {active ? (
            <RxCrossCircled className="h-6 w-6" aria-hidden="true" />
          ) : (
            <RxHamburgerMenu className="h-6 w-6" aria-hidden="true" />
          )}
            </div>
            
            <ul className={`md:flex bg-secondary md:bg-opacity-0 md:items-center md:pb-0 pb-10 absolute md:static md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all delay-100 duration-300 ${active ? 'bottom-10 opacity-100':'bottom-[-490px]'} md:opacity-100 opacity-0`}>
              {
                navItems.map((items)=> (
                  
                   <Link href={items.link} className='md:ml-8 text-xl md:my-0  text-textcolor scroll-smooth' scroll={false} key={items.name}>
                    <li>
                    <Button  className='max-w-fit text-sm my-5 uppercase border-b-4 font-medium border-accent border-opacity-0 hover:border-b-4 hover:border-black'>{items.name}
                    </Button>
                    </li>
                  </Link>
                ))
                
              }
              
            </ul>
            
        </div>
    </header>
  )
}

export default Header;


