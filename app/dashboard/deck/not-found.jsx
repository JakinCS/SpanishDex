import Link from "next/link";
import Stack from "react-bootstrap/Stack";

const NotFound = async () => {

  return (
    <Stack gap={25} className="mt-15">
      <h1 className="text-center">Deck Not Found</h1>
      <p className="text-center">Could not find requested deck.</p>
      <div className="d-flex column-gap-25">
        <Link href={'/dashboard'} role="button" className="d-block mx-auto mb-25 mb-sm-0 btn btn-outline-primary">Return to Dashboard</Link>
      </div>
    </Stack>
  )
}

export default NotFound