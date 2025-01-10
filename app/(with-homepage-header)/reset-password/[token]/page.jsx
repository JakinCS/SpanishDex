const ResetPassword = async ({ params }) => {

  const { token } = await params;

  console.log(token)

  return (
    <>
      <h1>Reset Password</h1>
    </>
  )
}

export default ResetPassword;