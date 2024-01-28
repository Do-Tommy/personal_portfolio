import React from 'react'
import Image from 'next/image';
import ProjectComponent from './component/ProjectComponent';

const Projects = () => {

  const projectLists = [ 
  {name:"project1",images: ["/slide1.png","/slide2.png",'/slide3.png']},
  {name:"project2",images: ["/slide1.png","/slide2.png",'/slide3.png']} 
  ]

  return (
    <div className='md:flex md:justify-center mb-24 md:mx-[3.5rem]'>
    
    <section id="projects" className='w-full h-[100%] md:max-w-7xl '>
      <div className='py-4 md:flex md:justify-center'>
      <ProjectComponent/>
    </div>
    </section>
    </div>
  )
}

export default Projects