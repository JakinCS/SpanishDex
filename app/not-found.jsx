import spanishdex from "@/public/logo.svg";
import Image from "next/image";
import Link from "next/link";
import HomepageSection from "@/components/HomepageSection";

const NotFound = async () => {
  return (
    <div>
      <nav className="px-25 px-sm-50 py-4 bg-gradient border-bottom border-gray-150 border-2">
        <div className="mx-auto" style={{maxWidth: '80rem'}}>
          <Link href={'/dashboard'} className='blue-link'>
            <Image
              alt="SpanishDex Logo"
              src={spanishdex}
              placeholder="blur"
              blurDataURL={'/logo.svg'}
              style={{ height: "3.125rem", width: "auto" }}
            />
          </Link>
        </div>
      </nav>
      <div className="px-20">
        <HomepageSection py='80' backgroundColor='white' style={{border: '2px solid #d9d9d9', maxWidth: '80rem'}} className='mt-20 rounded'>
          <h1 className="text-center">Page Not Found</h1>
          <p className="text-center">Could not find requested resource.</p>
          <div className="d-block d-sm-flex column-gap-25">
            <Link href={'/dashboard'} role="button" className="d-block mx-auto mb-25 mb-sm-0 btn btn-outline-primary">Go to Dashboard</Link>
          </div>
        </HomepageSection>
      </div>
    </div>
  )
}

export default NotFound