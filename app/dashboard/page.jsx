import { getServerSession } from 'next-auth';

async function Dashboard() {

    // Get session information
    const session = await getServerSession();

    return (
      <>
        <h1>Dashboard</h1>    
        {!!session ? 
          <p>You are logged in as {session.user.name}</p>
          :
          <p>You are not logged in</p>
        }
      </>
    )
  }
  
  export default Dashboard
  