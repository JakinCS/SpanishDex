import HomepageHeader from './components/HomepageHeader/HomepageHeader'
import HomepageSection from './components/HomepageSection'
import HomepageSectionColumns from './components/HomepageSectionColumns'
import HomepageContactForm from './components/HomepageContactForm'
import HomepageFooter from './components/HomepageFooter';
import GetStartedButton from './components/GetStartedButton';
import { getServerSession } from 'next-auth';
import { MongoClient } from 'mongodb';

async function Homepage() {

  // Get session information
  const session = await getServerSession();

  let findResult;

  if (!!session) {
    const client = new MongoClient(process.env.MONGODB_URI);
    const database = client.db('spanishdex');
    const collection = database.collection('users');
    findResult = await collection.findOne({username: session.user.name}, {projection: {_id: 0, username: 1, profile_picture: 1, profile_colors: 1}});
  } else {
    findResult = false;
  }


  return (
    <>
      <HomepageHeader user={findResult}/>
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
        image={'/images/app-screenshot.jpg'} imageBorder={true} 
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
        image={'/images/flashcards-example.png'} imageBorder={false}
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
      <HomepageFooter />
    </>
  )
}

export default Homepage
