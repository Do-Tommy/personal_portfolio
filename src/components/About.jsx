import Image from 'next/image'
import React from 'react'

function About() {
  return (
    <div className='md:flex items-center justify-center md:justify-center md:items-center py-4  mb-100'>
      <section id="about" className='w-full h-[100%] md:max-w-7xl'>
      <h1 className='flex justify-center md:justify-start md:ml-14 text-6xl font-bold text-textcolor '>
        About me
      </h1>
      <div className='px-10 mx-4 py-10'>
        <p className='font-prompt text-lg tracking-wide leading-10 text-text '>
          {`I was born and raised in San Jose, California. The incredible hub of technology that is the Silicon Valley. My whole life 
          I have been fascinated and interested about technology. From early on days of the internet customizing MySpace using html and
          css to scripting in video games like Ragnarok online. Tinkering with technology is something I&apos;  ve always enjoyed doing and
          programming has further helped me with this.`}
          
        </p>
      </div>
      <div className='flex justify-center mb-100' >
          <Image width={500} height={500} className='rounded-lg m-auto' src='https://media.california.com/media/_versions_jpg/articles/silicon_valley_hero__3992x2992____v1222x580__.jpg' alt='siliconValley'></Image>
      </div>
      
      </section>
    </div>
  )
}

export default About