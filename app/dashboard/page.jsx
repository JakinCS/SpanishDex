import { auth, signOut } from "@/auth"
import Link from 'next/link'
import Button from 'react-bootstrap/Button'


async function Dashboard() {

    // Get session information
    const session = await auth();

    return (
      <>
        <h1>Dashboard</h1>  
        <br />  
        {!!session ? 
          <p>You are logged in as {session.user.username} {session.user.email}</p>
          :
          <p>You are not logged in</p>
        }
        <br />
        <div className='d-flex column-gap-3'>
          <Link href='/' role='button' className='btn btn-outline-primary me-3'>Home</Link>
          <form action={async () => {
            "use server"

            await signOut({ redirectTo: "/" })
          }}>
            <Button variant='outline-danger' type="submit">Log Out</Button>
          </form>
        </div>        
        <br />
        <p>The building of the dashboard is still in progress.</p>
      </>
    )
  }
  
  export default Dashboard
  