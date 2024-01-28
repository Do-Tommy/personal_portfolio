import React from 'react';
import { Link } from 'react-scroll';
import { useState } from 'react';
import { AiFillCloseCircle} from 'react-icons/ai'
import useMediaQuery from '@/hooks/useMediaQuery';
import Image from 'next/image';

import { Button } from './ui/button';

const navItems = [
  {name:'Home',link:'landing'},
  {name:'About',link:'about'},
  {name:'Skills',link:'skills'},
  {name:'Projects',link:'projects'},
  {name:'Contact',link:'/'},
];


//items-center border justify-between py-4 px-7
const Header = () => {

  const [active,setActive] = useState(false);
  const isDesktop =  useMediaQuery("(min-width:768px)");

  return (
    <div className=' w-full '>
      <div className='md:flex items-center justify-between bg-secondary md:bg-opacity-60 py-3  md:px-10 px-8 bottom-0 md:top-0 w-full h-24 fixed z-30'>
          <div  className='font-bold text-black py-4 md:flex'>
            <Link className='flex ' to={navItems[0].link} href={navItems[0].link}>
              <Image src='/homeicon.png' alt='homeicon' width={50} height={50}>
              </Image>
              <h1 className='text-textcolor hover:text-primarytext pt-2 text-xl px-4'>Tommy Do</h1>

  
            </Link>
            
            </div>
            
            <div onClick={()=> setActive(!active)} className='text-3xl absolute right-8 top-7 cursor-pointer md:hidden text-primarytext'>
            <AiFillCloseCircle/>
            </div>
            
            <ul className={`md:flex bg-secondary md:bg-opacity-0 md:items-center md:pb-0 pb-10 absolute md:static md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all delay-100 duration-300 ${active ? 'bottom-10 opacity-100':'bottom-[-490px]'} md:opacity-100 opacity-0`}>
              {
                navItems.map((items)=> (
                  
                  <Link to={items.link} className='md:ml-8 text-xl md:my-0 text-textcolor' spy={true} offset={isDesktop ? -200 : -30} isDynamic={true} smooth={true} key={items.name}>
                    <li>
                    <Button  className='max-w-fit text-sm my-5 uppercase border-b-4 border-accent border-opacity-0 hover:border-b-4 hover:border-black'>{items.name}
                    </Button>
                    </li>
                  </Link>
                ))
              }
            </ul>
            
        </div>
    </div>
  )
}

export default Header;


