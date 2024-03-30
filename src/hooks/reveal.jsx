'use client'

import { motion, useAnimate, useAnimation ,useInView } from "framer-motion"
import { useEffect, useRef } from 'react'


export const Reveal =({ children })=> {
  const ref = useRef(null)
  const isInView = useInView(ref,{amount:0.5}, {once: false});
  const mainControls = useAnimation();
  const slideControls = useAnimation();
  

  useEffect(() => {
    if(isInView) {
        mainControls.start("visible")
        slideControls.start("visible")
        console.log(isInView)
    }
    
  },[isInView,mainControls,slideControls]);

return (
<div ref={ref}
> 
  <motion.div
  variants={{
    hidden : {opacity:0, y:'75'},
    visible: {opacity:1,y:0},

  }}
    initial="hidden"
    animate={mainControls}
    transition={{duration:0.5, delay: 0.15}}
    >
    {children}
    <motion.div
  variants={{
    hidden : { left:0},
    visible: { left:"100%" },

  }}
  style={{
    position: "absolute",
    top:4,
    bottom:4,
    left:0,
    right:0,
    background: "#4e376d",
    zIndex: 20,
  }}
  
    initial="hidden"
    animate={slideControls}
    transition={{ duration: 0.5, ease: "easeIn"}}
    />
  </motion.div>
  
  
  </div>
);
};