import Link from 'next/link';
import Image from 'next/image';
import spanishdex from '@/public/logo.svg'

const authLayout = ({ children }) => {
  return (
    <main className='mx-auto mt-4' style={{maxWidth: '31.25rem'}}>
      <nav className='mb-4 ps-4'>
        <Link href="/" className='blue-link'>
          <Image src={spanishdex} alt="SpanishDex logo" style={{height: '2.5rem', width: 'auto'}}/>
        </Link>
      </nav>
      {children}
    </main>
  )
}

export default authLayout