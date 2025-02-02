import spanishdex from "@/public/logo.svg";
import Image from "next/image";
import Link from "next/link";
import HomepageSection from "./components/HomepageSection";
import { auth } from "@/auth"

const NotFound = async () => {
  // Get session information
  const session = await auth();

  return (
    <div>
      <nav className="px-50 py-4 bg-gradient border-bottom border-gray-150 border-2">
        <Link href="/" className='blue-link'>
          <Image
            alt="SpanishDex Logo"
            src={spanishdex}
            placeholder="blur"
            blurDataURL={'/logo.svg'}
            style={{ height: "3.125rem", width: "auto" }}
          />
        </Link>
      </nav>
      <HomepageSection py='80' backgroundColor='white'>
        <h1 className="text-center">Page Not Found</h1>
        <p className="text-center">Could not find requested resource. </p>
        <div className="d-block d-sm-flex column-gap-25">
          {!!session ? 
            <Link href="/dashboard" role="button" className="d-block mx-auto mb-25 mb-sm-0 btn btn-outline-primary">Go To Dashboard</Link> 
            :
            <Link href="/" role="button" className="d-block mx-auto mb-25 mb-sm-0 btn btn-outline-primary">Return Home</Link>
          }
        </div>

      </HomepageSection>
    </div>
  )
}

export default NotFound