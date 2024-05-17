import React from 'react'
import Link from 'next/link';

const Header = () => {
  return (
    <div  className='flex justify-center items-center gap-9'>
      
      <Link href="/">Home</Link>
      <Link href="/components/quote">Quote</Link>
      <Link href="/components/todo">todo</Link>
      <Link href="/components/load">Load</Link>
      <Link href="/components/boss">Boss</Link>
    </div>
  )
}

export default Header;