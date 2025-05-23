import Link from "next/link";
import Stack from "react-bootstrap/Stack";

const NotFound = async () => {

  return (
    <Stack gap={25} className="mt-15">
      <h1 className="text-center">Cannot Practice Deck</h1>
      <p className="text-center">Could not find the requested deck to practice.</p>
      <div className="d-flex column-gap-25">
        <Link href={'/dashboard'} role="button" className="d-block mx-auto mb-25 mb-sm-0 btn btn-outline-primary">Go to Dashboard</Link>
      </div>
    </Stack>
  )
}

export default NotFound