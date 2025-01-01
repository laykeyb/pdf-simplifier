import { Mail } from 'lucide-react'
import React from 'react'

const ContactPage = () => {
  return (
    <div className='container mx-auto px-8'>
      <h1 className='lg:text-4xl text-xl mx-auto text-center mb-8'>Contact</h1>
      <a href="mailto:olamilekanworks@gmail.com">
       <Mail className='size-11'/>
       <p>Email me </p> 
      </a>
      
    </div>
  )
}

export default ContactPage