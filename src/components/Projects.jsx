import React from 'react'
import Image from 'next/image';
import ProjectComponent from './component/ProjectComponent';

const Projects = () => {

  const projectLists = [ 
  {
    name:"Personal Portfolio",
    description: 'Personal Portfolio built on Reactjs and Tailwindcss',
    image: "/slide1.png", 
    github: 'https://github.com/Do-Tommy/personal_portfolio', 
    site: 'https://tommydo.vercel.app/'
  },
  {
    name:"Tpump Randomizer",
    description: 'Tpumps drink randomizer',
    image: "/slide2.png", 
    github: 'https://github.com/Do-Tommy/tpumpme', 
    site: 'https://do-tommy.github.io/tpumpme/'
  },
  {
    name:"Image Converter",
    description: 'Image converter using Python PIL library',
    image: "/slide3.png", 
    github: 'https://github.com/Do-Tommy/py-image-converter', 
    site: 'https://github.com/Do-Tommy/py-image-converter'
  },
  ]

  return (
    <div className='md:grid md:justify-center mb-24 md:mx-[3.5rem]'>
    
    <section id="projects" className='w-full h-[100%] md:max-w-7xl '>
    <div className="container grid max-w-5xl justify-center gap-4 px-4 text-center md:gap-8 md:px-6 lg:grid-cols-2 lg:text-left xl:max-w-[76rem] xl:gap-10">
          <div className="space-y-3">
            <h1 className="text-6xl font-bold tracking-tighter text-text">My Projects</h1>
            <p
              className="mx-auto max-w-[700px] text-text md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-text">
              A collection of my recent projects.
            </p>
          </div>
        
      <div className='grid gap-x-16 md:grid-cols-1 xl:grid-cols-2 flex-wrap'>
        
        {projectLists.map((project,index) => 
        (<ProjectComponent key={index} project={project}/>))}
      
    </div>
    </div>
    </section>

    </div>
  )
}

export default Projects