import React from 'react'
import Link from 'next/link';

const Header = () => {
  return (
    <div  className='flex justify-center items-center gap-9'>
      
      <Link href="/">Home</Link>
      <Link href="/components/quote">Quote</Link>
      <Link href="/components/cal-eve">cal-eve</Link>
      <Link href="/components/cal-ham">cal-ham</Link>
      <Link href="/components/modal">modal</Link>
      <Link href="/components/load">Load</Link>
      <Link href="/components/boss">Boss</Link>
      <Link href="/components/hamburger">Hamburger</Link>
      <Link href="/components/test">Test</Link>
    </div>
  )
}

export default Header;