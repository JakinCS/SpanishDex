import HomepageSection from "@/app/components/HomepageSection";
import ResetPasswordForm from "@/app/components/ResetPasswordForm";

const ResetPassword = async ({ params }) => {

  const { token } = await params;

  console.log(token)

  return (
    <>
      <HomepageSection py='80' backgroundColor='almost-white'>
        <h1 className="fs-2">Reset Password</h1>
        <p>Enter your new password below.</p>
        <ResetPasswordForm />
      </HomepageSection>
    </>
  )
}

export default ResetPassword;