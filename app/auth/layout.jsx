import Link from 'next/link';
import Image from 'next/image';
import spanishdex from '@/public/logo.svg'

const authLayout = ({ children }) => {
  return (
    <div className='mx-auto mt-4' style={{maxWidth: '31.25rem'}}>
      <Link href="/" className='d-block mb-4 ps-4'>
        <Image src={spanishdex} alt="SpanishDex logo" style={{height: '2.5rem', width: 'auto'}}/>
      </Link>
      {children}
    </div>
  )
}

export default authLayout