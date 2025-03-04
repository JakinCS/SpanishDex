import { auth, signOut } from "@/auth"
import Link from 'next/link'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'


async function Dashboard() {

    // Get session information
    const session = await auth();

    return (
      <Container className="topLevelContainer text-center" fluid>
        <h1>Dashboard</h1>
        <br />
        {!!session ? 
          <p>You are logged in as {session.user.username} {session.user.email}</p>
          :
          <p>You are not logged in</p>
        }
        <br />
        <div className='d-flex column-gap-3 justify-content-center'>
          <Link href='/' role='button' className='btn btn-outline-primary me-3'>Home</Link>
          <form action={async () => {
            "use server"

            await signOut({ redirectTo: "/" })
          }}>
            <Button variant='outline-danger' type="submit">Log Out</Button>
          </form>
        </div>
        <br />
        <div className="mx-auto mt-3 bg-white p-4 rounded border border-gray-150" style={{maxWidth: '300px'}}>
          <h4>Note:</h4>
          <p className="fw-medium">The building of the dashboard is still in progress.</p>
        </div>
      </Container>
    )
  }
  
  export default Dashboard
  