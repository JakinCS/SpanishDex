import linkedin from "@/public/icons/linkedin.svg";
import mail from "@/public/icons/mail.svg";
import Footer from './Footer';
import Icon from "../Icon";

function HomepageFooter() {
  return (
    <Footer>
      <a href="mailto:jakinstahl@gmail.com" className='me-3 px-2 py-3 blue-link'>
        <Icon className='social-icon' height={30} src={mail} alt='Mail icon' />
      </a>
      <a href="https://www.linkedin.com/in/jakinstahl" className='px-2 py-3 blue-link' style={{marginRight: '-5px'}} target='_blank'>
        <Icon className='social-icon' height={30} src={linkedin} alt='LinkedIn icon' />
      </a>
    </Footer>     
  );
}

export default HomepageFooter;