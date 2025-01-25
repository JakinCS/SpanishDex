import SignInContent from '@/app/components/SignInContent';
import { options } from '@/app/api/auth/[...nextauth]/options';
import { getServerSession } from 'next-auth';
import Link from 'next/link';


const SignIn = async () => {

  // Get session information. If the user is already logged in, different content will be rendered.
  const session = await getServerSession(options);

  return (
    <div className='mx-auto mt-50' style={{maxWidth: '31.25rem'}}>
      {!!session ? 
        <div className='mt-25 bg-white p-50 rounded text-center'>
          <h1 className='fs-2 pb-5'>Log In</h1>
          <p className='pb-5 fw-medium'>You are already logged in.</p>
          <Link href='/dashboard' role='button' className='btn btn-primary'>Go to Dashboard</Link>
        </div> 
        : 
        <SignInContent />
      }
    </div>
  )
}

export default SignIn