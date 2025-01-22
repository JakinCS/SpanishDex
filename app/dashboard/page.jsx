import { getServerSession } from 'next-auth';
import { options } from '../api/auth/[...nextauth]/options';
import DashboardButtons from './DashboardButtons';

async function Dashboard() {

    // Get session information
    const session = await getServerSession(options);

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
        <DashboardButtons />
        <br />
        <br />
        <p>The building of the dashboard is still in progress.</p>
      </>
    )
  }
  
  export default Dashboard
  