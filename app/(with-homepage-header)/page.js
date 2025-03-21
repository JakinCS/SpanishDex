import HomepageSection from '@/components/HomepageSection'
import HomepageSectionColumns from '@/components/HomepageSectionColumns'
import HomepageContactForm from '@/components/HomepageContactForm'
import GetStartedButton from '@/components/GetStartedButton';

export default function Homepage() {
  return (
    <>
      <HomepageSection py='100' backgroundColor='almost-white'>
        <h1 className="text-center" style={{maxWidth: '43.75rem'}}>Flashcards Built for Maximized Learning</h1>
        <p className="text-center" style={{maxWidth: '43.75rem'}}>
          SpanishDex is a flashcards app for Spanish learners. 
          It is the perfect tool for those who want to memorize new vocabulary quicker and retain old vocabulary longer. 
          Start using SpanishDex today for free!
        </p> 
        <GetStartedButton />
        
      </HomepageSection>
      <HomepageSectionColumns 
        py='80' backgroundColor='white' 
        image={'screenshot'} imageBorder={true} 
        imageAlt='SpanishDex dashboard screenshot' 
        imagePosition='left' headingText='Simple Interface'
      >
        <div>
          <p style={{marginBottom: '1.125rem'}}>
            SpanishDex has a simple, clean interface that helps you focus on learning vocabulary. 
            Instead of being complicated, it is intuitive. You don’t need to figure out how to use the app!
          </p>
          <p>
            Every page is straightforward, providing helpful information and features. SpanishDex gives you 
            statistics on your decks and cards, but without making anything feel cluttered.
          </p>
        </div>       
      </HomepageSectionColumns>
      <HomepageSectionColumns 
        py='80' backgroundColor='almost-white'
        image={'flashcards'} imageBorder={false}
        imageAlt='SpanishDex flashcards example'
        imagePosition='right' headingText='Spaced Repetition'
      >
        <div>
          <p style={{marginBottom: '1.125rem'}}>
            This application uses a spaced repetition algorithm to significantly improve your learning.
          </p>
          <p style={{marginBottom: '1.125rem'}}>
            SpanishDex keeps track of the last time you practiced a word, and it remembers whether or not 
            you got the word wrong. It uses this information to determine the best time for you 
            to review the word again, which is usually just as the word is disappearing from your memory. 
            This a scientifically proven way to better retain information.
          </p>
          <p>
            Just create your decks and add the cards, and let SpanishDex do the rest of the work for you!
          </p>
        </div>
      </HomepageSectionColumns>
      <HomepageSection py='80' backgroundColor='white'>
        <h2 className="text-center" style={{maxWidth: '43.75rem'}}>About SpanishDex</h2>
        <div style={{maxWidth: '43.75rem'}}>
          <p className="text-center" style={{marginBottom: '1.125rem'}}>
            SpanishDex was created by Jakin Stahl, a web developer, to demonstrate his coding and design skills. 
            This application was designed in Figma and coded with React and Bootstrap.
          </p> 
          <p className='text-center'>
            He built SpanishDex for Spanish learners like him who are looking for a simple tool for retaining vocabulary words.
          </p>
        </div>
      </HomepageSection>
      <HomepageSection py='80' backgroundColor='almost-white'>
        <h2 className='text-center'>Contact</h2>
        <p className='text-center'>Use the form below to contact Jakin Stahl.</p>
        <HomepageContactForm className='w-100' style={{maxWidth: '34.375rem'}}></HomepageContactForm>
      </HomepageSection>
    </>
  );
}
