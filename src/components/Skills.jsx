import React from 'react'
import Carousel from '@/hooks/Carousel'
import useMediaQuery from '@/hooks/useMediaQuery';
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";



const Skills = () => {

  const isDesktop =  useMediaQuery("(min-width:768px)");

  const data = [
    {
      label: "Languages",
      value: "languages",
      desc: <ul className='text-primarytext text-3xl space-y-4'>
              <li>C++ </li> 
              <li>Java</li>
              <li>Python</li>
              <li>Javascript</li>
              <li>Kotlin</li>
            </ul>
            
            ,
      
    },
    {
      label: "Frameworks",
      value: "frameworks",
      desc: <ul className='text-primarytext text-3xl space-y-4'>
              <li>Django</li>
              <li>React</li>
              <li>Bootstrap</li>
              <li>Tailwind</li>
              <li>Nextjs</li>
              <li>MySQL</li>
            </ul>,
    },
    {
      label: "Tools",
      value: "tools",
      desc: <ul className='text-primarytext text-3xl space-y-4'>
              <li>VsCode</li>
              <li>Git</li>
              <li>Github</li>
              <li>Wireshark</li>
              <li>Android Studio</li>
            </ul>,
    },
    
    
  ];
  
  return (
    <div id="skills" className='md:flex items-center justify-center md:justify-center md:items-center my-28'>
      <section id="tabcontainer"className='w-full  md:max-w-7xl' >
      <h1 className='text-6xl flex justify-center md:justify-start md:ml-16 mb-6 font-bold text-secondary'>
        Skills
      </h1>
      <div className={(isDesktop ? "flex " : ' ') + "justify-center"} >
      <Tabs value="html"  orientation={isDesktop ? "vertical" : 'horizontal'} className='min-w-[51%] '>
        <TabsHeader className={"mt-4 bg-secondary " +(isDesktop ? "flex-col flex-wrap" : 'flex-row ')}>
          {data.map(({ label, value }) => ( 
            <Tab className='text-secondarytext hover:text-primarytext md:text-3xl font-bold' key={value} value={value}>
              {label}
            </Tab>
          ))}
        </TabsHeader>
        <TabsBody>
          {data.map(({ value, desc }) => (
            <TabPanel  key={value} value={value}  className="py-5 text-white">
              {desc}
            </TabPanel>
            
          ))}
          
        </TabsBody>
      </Tabs>
      <div className='flex justify-center'>
          
      <img 
        className='rounded-lg flex justify-center' 
        width={500} 
        length={500} 
        src='https://bairesdev.mo.cloudinary.net/blog/2022/01/programming-languages-1.jpg?tx=w_3840,q_auto'>

      </img>
      </div>
      </div>
      </section>

      
  
    </div>
  );
}

export default Skills