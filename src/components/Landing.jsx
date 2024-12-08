import Link from 'next/link';
import React from 'react'
import SocialMediaIcons from './SocialMediaIcons';
import Image from 'next/image';
import { Reveal } from '@/hooks/reveal';

const Landing = () => {
return (
    <div className='w-full md:h-screen md:justify-center text-center z-0' id='landing'>
        <div className='w-full h-full basis-3/5 pt-0 md:py-10 md:flex items-center justify-center md:justify-center md:items-center'> 
            <div className=' md:flex flex-wrap justify-center'>
                <div className='p-5 md:order-2'>
                    <div >
                        
                        <Image
                        width={900}
                        height={900}
                        alt='profile'
                        className='rounded-lg m-auto flex w-[90%] md:max-w-[500px] md:mr-8'
                        src='/DSC00639.jpg'
                        >
                        </Image>
                        
                    </div>
                </div>
                
                <div className='lg:mr-15 px-5'>
                <Reveal>
                <h1 className='py-4 md:shrink-0 text-6xl text-text font-Prompt font-bold overflow-hidden'>
                    Hey I&apos;m Tommy 
                    <div className='animate-sideways h-[10px] mt-2 bg-secondary border-2 border-secondary'></div>
                </h1>
                </Reveal>
                
                <p className='text-3xl font-bold text-secondary font-Gideon Roman'>
                    Software Engineer
                </p>
                
                <p className='text-lg mt-5 mb-7 m-auto text-text'>
                    New grad looking to build tools for the future. Striving everyday to create something new.
                </p>
                <Link 
                    className="bg-accent text-text -sm py-2 px-7 font-semibold
                    hover:bg-blue hover:text-secondary transition duration-500 "
                    href='/contact'>
                    Contact me
                </Link>
                <div className='flex justify-center'>
                <SocialMediaIcons/>
                </div>
                </div>
            </div>   
        </div>
        
    </div>
)
}

export default Landing;