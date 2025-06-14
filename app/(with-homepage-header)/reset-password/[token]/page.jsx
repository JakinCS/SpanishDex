
import HomepageSection from "@/components/homepage/HomepageSection";
import ResetPasswordForm from "@/components/forms/ResetPasswordForm";
import crypto from "crypto";
import { MongoClient } from "mongodb";
import { auth } from "@/auth"
import { redirect } from 'next/navigation'

export const metadata = {
  title: "Reset Password - SpanishDex",
};

const ResetPassword = async ({ params }) => {

  // Get session information
  const session = await auth();

  // If someone is logged in, redirect to the dashboard. There's no need to reset the password
  if (!!session) {
    redirect(`/dashboard`)
  }

  const { token } = await params;

  const verifyToken = async () => {
    // Define the client variable, holding a new MongoClient instance  
    const client = new MongoClient(process.env.MONGODB_URI);

    try {
      // Connect to the database
      await client.connect();
      const database = client.db('spanishdex');
      const collection = database.collection('users');

      const hashedToken = crypto.createHash("sha256").update(token).digest('hex');

      const user = await collection.findOne({reset_token: hashedToken, reset_token_expiry: {$gt: Date.now()}}, {projection: {username: 1}})

      if (!user) {
        await client.close();
        return {error: true, errorMessage: 'Your reset password link is invalid or it has expired.', userUsername: ''}
      }
      return {error: false, errorMessage: '', userUsername: user.username}

    } catch (error) {
      await client.close();
      return {error: true, errorMessage: 'Unexpected error occurred. Please try again later.', serverError: error.toString(), userUsername: ''}
    }
  }

  const results = await verifyToken();

  return (
    <>      
      {
        results.error ?
        <HomepageSection py='80' backgroundColor='almost-white'>
          <h1 className="fs-2">Reset Password</h1>
          <p className="text-danger fw-semibold">Error: {results.errorMessage}</p>
          <p className="d-none text-break">{results.serverError}</p> {/* This paragraph holds the full version (if available) of any error */}
        </HomepageSection>
        :
        <HomepageSection py='80' backgroundColor='almost-white'>
          <h1 className="fs-2">Reset Password</h1>
          <p>Enter your new password below.</p>
          <ResetPasswordForm username={results.userUsername} token={token}/>
        </HomepageSection>
      }
    </>
  )
}

export default ResetPassword;