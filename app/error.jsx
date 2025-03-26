'use client'

import spanishdex from "@/public/logo.svg";
import Image from "next/image";
import Link from "next/link";
import HomepageSection from "@/components/HomepageSection";
import Button from "react-bootstrap/Button";
import rightChevron from "@/public/icons/chevron_right.svg";
import downChevron from "@/public/icons/chevron_down.svg";
import { useState } from "react";
import Icon from "@/components/Icon";

const Error = ({ error, reset }) => {

  const [showError, setShowError] = useState(false);

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
        <h1 className="text-center">Unexpected Error Occurred</h1>
        <p className="text-center">We encountered a problem loading this page. <br /> Please try again or come back later.</p>
        <div className="d-block d-sm-flex column-gap-25">
          <Link href="/" role="button" className="d-block mx-auto mb-25 mb-sm-0 btn btn-outline-primary">Return Home</Link>
          <Button className="d-block mx-auto" variant="primary" onClick={reset}>Try Again</Button>
        </div>

      </HomepageSection>
      <HomepageSection py='40' backgroundColor='almost-white'>
        <div>
          <div className="d-flex align-items-center justify-content-center">
            <a href="#" className="d-flex align-items-center justify-content-center mb-3 blue-link" onClick={ (e) => {e.preventDefault(); setShowError( (prev) => !prev )} }>
              <Icon height={30} alt={showError ? 'Down arrow' : 'Right arrow'} src={showError ? downChevron : rightChevron} />
              <p className="pe-2">Error Message</p>
            </a>            
          </div>          
          <p className={"text-center " + (showError ? 'd-block' : 'd-none')}>{error.message || "An error occurred"}</p>
        </div>        
      </HomepageSection>
    </div>
  )
}

export default Error