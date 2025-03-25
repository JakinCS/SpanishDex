import Image from "next/image";
import linkedin from "@/public/icons/linkedin.svg";
import mail from "@/public/icons/mail.svg";
import Footer from './Footer';

function HomepageFooter() {
  return (
    <Footer>
      <a href="mailto:jakinstahl@gmail.com" className='me-3 px-2 py-3 blue-link'>
        <Image src={mail} alt='Mail icon' style={{width: '1.875rem', height: '1.875rem'}}></Image>
      </a>
      <a href="https://www.linkedin.com/in/jakinstahl" className='px-2 py-3 blue-link' style={{marginRight: '-5px'}} target='_blank'>
        <Image src={linkedin} alt='LinkedIn icon' style={{width: '1.875rem', height: '1.875rem'}}></Image>
      </a>
    </Footer>     
  );
}

export default HomepageFooter;