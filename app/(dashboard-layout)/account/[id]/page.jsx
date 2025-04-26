import AccountPageCard from "@/components/AccountPageCard"
import Container from "react-bootstrap/Container"
import Stack from "react-bootstrap/Stack";
import BackButton from "@/components/BackButton";
import { auth } from "@/auth"
import Link from "next/link";
import { DeleteAccountButton, EditPasswordButton, EditProfilePictureButton } from "@/components/AccountPageButtons";
import { EmailEditSection, ProfilePictureEditSection, UsernameEditSection } from "@/components/AccountPageEditSections";

const AccountPage = async ({ params }) => {

  // Get the user id from the page parameters
  const userId = (await params).id;

  // Get session information
  const session = await auth();

  if (session?.user?.id !== userId) {
    return (
      <Container className="topLevelContainer" fluid>
        <h1 className="text-center mb-15">Unauthorized</h1>
        <p className="text-center mb-25">You are not allowed to view this page.</p>
        <div className="d-flex justify-content-center">
          <Link href="/dashboard" role="button" className="btn btn-primary">Go to Dashboard</Link>          
        </div>
      </Container>
    )
  }

  const creationDate = new Date(session?.user?.date_created);
  const date = `${creationDate.toLocaleString('default', { month: 'long' })} ${creationDate.getDate()}, ${creationDate.getFullYear()}`

  return (
    <>
      <BackButton className="mb-40"/>
      <Container
        className="mx-auto px-0"
        style={{ maxWidth: "40.625rem" }}
        fluid
      >
        <h1 className="text-center text-sm-start mb-40 mb-sm-50">My Account</h1>
        <AccountPageCard className="mb-5" paddingY="30">
          <ProfilePictureEditSection
            userId={userId}
            pictureInfo={{
              profilePicture: session?.user?.profile_picture,
              profileColors: session?.user?.profile_colors,
              firstLetter: session?.user?.username.slice(0, 1).toUpperCase(),
            }}
          />
        </AccountPageCard>
        <AccountPageCard className="mb-5">
          <h3 className="mb-5 text-center text-sm-start">Account Details</h3>
          <Stack gap={20} className="lh-1">
            <div className="d-flex justify-content-between align-items-center">
              <UsernameEditSection
                initialValue={session?.user?.username}
                userId={userId}
              />
            </div>
            <hr />
            <div className="d-flex justify-content-between align-items-center">
              <EmailEditSection
                initialValue={session?.user?.email}
                userId={userId}
              />
            </div>
            <hr />
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <p className="fw-medium mb-3">Password</p>
                <p
                  style={{ fontFamily: "sans-serif", letterSpacing: ".125rem" }}
                >
                  ••••••••••
                </p>
              </div>
              <div>
                <EditPasswordButton userId={userId} />
              </div>
            </div>
          </Stack>
        </AccountPageCard>
        <AccountPageCard className="mb-5">
          <h3 className="mb-20 text-center text-sm-start">Delete Your Account</h3>
          <p className="mb-20 text-center text-sm-start">
            Caution. This action permanently removes your account and all data
            associated with your account. This action cannot be undone.
          </p>
          <DeleteAccountButton userId={userId} />
        </AccountPageCard>
        <p className="mb-20 text-center text-sm-start">
          <span className="fw-medium">Account Created:</span> <span className="text-nowrap">{date}</span>
        </p>
      </Container>
    </>      
  );
}

export default AccountPage