import React from 'react'
import useMediaQuery from '@/hooks/useMediaQuery';
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import Image from 'next/image';



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
      sideVal: 'border-t-[9px]'
      
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
      sideVal: 'border-r-[9px]'
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
      sideVal: 'border-b-[9px]'
    },
    
    
  ];
  
  return (
    <div id="skills" className='md:flex items-center justify-center md:justify-center md:items-center my-28'>
       <section id="tabcontainer"className='w-full md:max-w-7xl' > 
       <h1 className='text-6xl flex justify-center md:ml-[3.5rem] md:justify-start  mb-6 font-bold text-text'>
        Skills
        
        </h1>
        
      <div className={(isDesktop ? "flex " : ' ') + "justify-start mx-7"} >
      
      <Tabs value="languages"  orientation={isDesktop ? "vertical" : 'horizontal'} className='min-w-[45%] mx-6'>
        <TabsHeader className={"mt-4 bg-transparent " +(isDesktop ? "flex-col flex-wrap" : 'flex-row ')}>
          {data.map(({ label, value }) => ( 
            <Tab className='text-secondary  hover:text-primary md:text-3xl sm:text-md sm:font-bold font-bold ' key={value} value={value}>
              {label}
            </Tab>
          ))}
        </TabsHeader>
        <TabsBody className='h-[21em]'>
          {data.map(({value,desc,sideVal }) => (
            <TabPanel  key={value} value={value}  className={`py-5 text-text ${sideVal} border-accent`} >
              {desc}
            </TabPanel>
            
          ))}
          
        </TabsBody>
      </Tabs>
      <div className='flex justify-center my-8'>
          
      <Image 
        alt='languages'
        className='rounded-lg flex justify-center' 
        width={500}
        height={500}
        src='https://bairesdev.mo.cloudinary.net/blog/2022/01/programming-languages-1.jpg?tx=w_3840,q_auto'>

      </Image>
      </div>
      </div>
      </section> 

      
  
    </div>
  );
}

export default Skills