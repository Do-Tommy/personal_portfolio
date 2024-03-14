import React from 'react'
import { useForm } from "react-hook-form"
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

const Contact = () => {
  const form = useForm({
    defaultValues: {
      username: "",
    },
  })
 
  
  function onSubmit(values) {
    // Do something with the form values.
    
    console.log(values)
  }

  return (
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
                <Input placeholder="@" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem  className='flex'>
              <FormControl>
              <textarea
                  placeholder="Reach out to me!"
                  className="resize-none rounded-md"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <button type="submit">Submit</button>
      </form>
    </Form>
    </div>
  )
}


export default Contact