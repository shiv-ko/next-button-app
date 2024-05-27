import React from 'react'
import Link from 'next/link';

const page = () => {
  return (
    <div  className='flex justify-center items-center gap-9 h-[270px] w-[1000px]'>
      
      <Link href="/test">Home</Link>
      
      <Link href="/components/test/todo">todo</Link>
      <Link href="/components/load">Load</Link>
      
    </div>
  )
}

export default page