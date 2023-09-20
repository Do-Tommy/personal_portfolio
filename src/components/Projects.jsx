import React from 'react'
import { Carousel } from "@material-tailwind/react";

const Projects = () => {
  return (
    <div className='md:flex md:justify-center '>
    <section className='w-full h-[100%] md:max-w-7xl '>
      <h1 className='flex justify-center md:justify-start md:ml-14 text-6xl font-bold text-textcolor py-10'>Projects</h1>
      <div className='py-4 md:flex md:justify-center'>
      
      <Carousel className="ml-10 rounded-xl w-[80%]" >
        <img
          src="https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80"
          alt="image 1"
          className="h-full w-full object-cover"
        />
        <img
          src="https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80"
          alt="image 2"
          className="h-full w-full object-cover"
        />
        <img
          src="https://images.unsplash.com/photo-1518623489648-a173ef7824f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2762&q=80"
          alt="image 3"
          className="h-full w-full object-cover"
        />
      </Carousel>
    </div>
    </section>
    </div>
  )
}

export default Projects