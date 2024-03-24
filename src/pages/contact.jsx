'use client';

import React from 'react'
import { useForm } from "react-hook-form"
import { useState } from 'react'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import ReCAPTCHA from 'react-google-recaptcha'
import { contactSchema } from './api/contact'
import { yupResolver } from "@hookform/resolvers/yup"

const Contact = () => {
  const [isSubmitted, setSubmitted] = useState(false)
  const recaptchaRef = React.createRef();

  const form = useForm({
    resolver: yupResolver(contactSchema),
    defaultValues: {
      username: "",
      email: "",
      text:"",
    },
    
  })


  const onSubmit = async (values) => {

    const token = await recaptchaRef.current.executeAsync();
    // Do something with the form values.
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: values.username,
          email: values.email,
          message: values.message,
          token,
          
        }),
      });
      if (res.status=== 200 || res.status===400) {
        
        setSubmitted(true)
      }
      console.log(res.message)
    }
    catch(err) {
      console.error(err)
    }
    
  }

  return isSubmitted ? (
    <div>
      <h1
        className="grid place-items-center text-center font-semibold text-3xl mt-[22.5rem]"
      >
        Thank you for your message!
      </h1>
      
    </div>
    )  : (
    <div className='grid justify-center my-6 mt-32'>
    <h1 className='text-2xl font-extrabold my-6 border-b-2 border-black border-opacity-75'>Lets get in touch!</h1>
  <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 ">
      <FormField
        control={form.control}
        name="username"
        render={({ field }) => (
          <FormItem>
            <FormLabel>First and Last Name</FormLabel>
            <FormControl>
              <Input placeholder="John Doe" {...field} />
            </FormControl>
            {form.formState.errors.username && <div><p className='text-red-500' role="alert">Name Required</p></div>}
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input 
              {...form.register('email',{required:'Email  is required'})}
              {...field} />
            </FormControl>
            {form.formState.errors.email && <div><p className='text-red-500' role="alert">Email Required</p></div>}

          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="message"
        render={({ field }) => (
          <FormItem  className='grid'>
            <FormLabel>Message</FormLabel>
            <FormControl>
            <textarea
                placeholder="Reach out to me!"
                className="resize-none rounded-md"
                {...form.register(
                  'message',
                  {required:'Message is required'
                })
                }
                {...field}
              />
            </FormControl>
          </FormItem>
        )}
      />
      <button type="submit">Submit</button>
      <ReCAPTCHA
      ref={recaptchaRef}
      size="invisible"
      sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
      />
    </form>
  </Form>
  </div>)
    
    
}



export default Contact