import Link from 'next/link';
import React from 'react'
import SocialMediaIcons from './SocialMediaIcons';

const Landing = () => {
return (
    <div className='w-full md:h-screen md:justify-center text-center z-0' id='landing'>
        <div className='w-full h-full max-auto basis-3/5 py-10 md:flex items-center justify-center md:justify-center md:items-center'> 
            <div className='p-5 md:order-2'>
                <div>
                
                    <img
                    alt='profile'
                    className='rounded-lg m-auto flex max-w-[280px] md:max-w-[480px] md:mr-8'
                    src='/DSC00639.jpg'
                    >
                    </img>
                </div>
            </div>
            <div className='lg:mr-48 px-5'>
            <h1 className='py-4 md:shrink-0 text-6xl text-primarytext font-Prompt font-bold'>
                Hey I'm Tommy 
            </h1>
            <p className='text-3xl text-secondary font-Gideon Roman'>
                Software Engineer
            </p>
            <p className='text-lg mt-5 mb-7 max-w-[70%] m-auto text-white'>
                New grad looking to build tools for the future. Striving everyday to create something new.
            </p>
            <Link 
            className="bg-gradient-rainblue text-deep-blue rounded-sm py-2 px-7 font-semibold
              hover:bg-blue hover:text-secondary transition duration-500 "
            href='/'>
            Contact me
            </Link>
            <div className='flex justify-center'>
            <SocialMediaIcons/>
            </div>
            </div>
            
        </div>
        
    </div>
)
}

export default Landing;