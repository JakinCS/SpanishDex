import HomepageSection from '@/components/homepage/HomepageSection'
import HomepageSectionColumns from '@/components/homepage/HomepageSectionColumns'
import ContactForm from '@/components/forms/ContactForm'
import GetStartedButton from '@/components/homepage/GetStartedButton';
import Image from 'next/image';
import screenshot from "@/public/images/app-screenshot.jpg";
import flashcards from "@/public/images/flashcards-example.png";

export default function Homepage() {

  const image1 = <Image 
    priority={true} 
    width={525} 
    height={375} 
    src={screenshot} 
    style={{width: '100%', height: 'auto', boxShadow: '0 .0625rem .25rem .1875rem #00000026'}} 
    className='rounded' 
    alt="Screenshot of the SpanishDex dashboard showing a total number of decks and weak flashcards and listing several flashcard decks."
  />;
  const image2 = <Image 
    priority={true} 
    width={525} 
    height={375} 
    src={flashcards} 
    style={{width: '100%', height: 'auto'}} 
    alt="An example of a pair of SpanishDex flashcards. The front showing the Spanish word and the other side showing the English translation."
  />;


  return (
    <>
      <HomepageSection py='70' py_sm='100' backgroundColor='almost-white'>
        <h1 className="text-center" style={{maxWidth: '43.75rem'}}>Simple and Easy Memorization</h1>
        <p className="text-center" style={{maxWidth: '43.75rem'}}>
          SpanishDex is a flashcards application built to aid Spanish learners of all levels. 
          SpanishDex makes memorizing and retaining vocabulary easy and time efficient. <br />
        </p> 
        <GetStartedButton />
        
      </HomepageSection>
      <HomepageSectionColumns 
        py='60' py_sm={'80'} backgroundColor='white' 
        image={image1} imagePosition='left' headingText='Who is SpanishDex for?'
      >
        <div>
          <p style={{marginBottom: '1.125rem'}}>
            SpanishDex is for those who don’t want to waste their time practicing Spanish words they already know.
          </p>
          <p style={{marginBottom: '1.125rem'}}>
            It’s for those wishing to focus on learning, without a distracting interface and complicated features.
          </p>
          <p style={{marginBottom: '1.125rem'}}>
            It’s for learners who don’t want to forget words they’ve worked hard to learn.
          </p>
          <p>
            SpanishDex accomplishes this with its simple interface and its use of spaced learning.
          </p>
        </div>       
      </HomepageSectionColumns>
      <HomepageSectionColumns 
        py='60' py_sm={'80'} backgroundColor='almost-white'
        image={image2} imagePosition='right' headingText='Simplified Spaced Learning'
      >
        <div>
          <p style={{marginBottom: '1.125rem'}}>
            With spaced learning, words are only practiced when it’s necessary, right before they fade from your memory.
            New words require more frequent practice. 
            But as words become solid in your memory, they will need less and less practice.
          </p>
          <p style={{marginBottom: '1.125rem'}}>
            Determining the best next practice time can get complicated. 
            But SpanishDex simplifies spaced learning and does the work for you. 
            When words are ready for practice, they are labeled as “weak”.
          </p>
          <p>
            Just create decks and add the words you want to learn, and let SpanishDex do the rest!
          </p>
        </div>
      </HomepageSectionColumns>
      <HomepageSection py='60' py_sm={'80'} backgroundColor='white'>
        <h2 className="text-center" style={{maxWidth: '43.75rem'}}>History of SpanishDex</h2>
        <div style={{maxWidth: '43.75rem'}}>
          <p className="text-start" style={{marginBottom: '1.125rem'}}>
            SpanishDex was created by Jakin Stahl, a Spanish learner desiring to use his time efficiently and practice words only when he needed to. 
            He built SpanishDex for Spanish learners like him who are looking for a simple tool for retaining vocabulary words.
          </p> 
          <p className='text-start'>
            This application also demonstrates his skills in web development and web design. 
            It was designed in Figma and build with Next.js and Bootstrap.
          </p>
        </div>
      </HomepageSection>
      <HomepageSection py='60' py_sm={'80'} backgroundColor='almost-white'>
        <h2 className='text-center'>Contact</h2>
        <p className='text-center' style={{maxWidth: '34.375rem'}}>
          Got questions? Have any suggestions?
          Use the form below to get in contact with Jakin.
        </p>
        <ContactForm className='w-100' style={{maxWidth: '34.375rem'}}></ContactForm>
      </HomepageSection>
    </>
  );
}
