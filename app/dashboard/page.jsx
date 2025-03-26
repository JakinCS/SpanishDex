import { auth } from "@/auth"
import ButtonWithIcon from "@/components/ButtonWithIcon";
import DashboardCard from "@/components/dashboard/DashboardCard";
import TotalsSection from "@/components/dashboard/TotalsSection";
import Link from "next/link";
import Stack from 'react-bootstrap/Stack'
import { MongoClient, ObjectId } from "mongodb";
import PageErrorMessage from "@/components/PageErrorMessage";
import DecksArea from "@/components/dashboard/DecksArea";
import BackToTopButton from "@/components/BackToTopButton";
import Icon from "@/components/Icon";


async function Dashboard() {

    // This object holds totals information used by variants page components.
    let finalData = {
      decks: [],
      total_decks: 0,
      total_cards: 0,
      total_weakCards: 0,
    }

    // Get session information  
    const session = await auth();

    // Define the client variable, holding a new MongoClient instance  
    const client = new MongoClient(process.env.MONGODB_URI);

    try {
      
      // Connect to the database
      await client.connect();
      const database = client.db('spanishdex');

      const deckCollection = database.collection('decks');

      // Fancy aggregation pipeline for retrieving exactly the right information 
      const pipeline = [
        {
          '$match': {
            'user': new ObjectId(session.user.id)
            // 'user': new ObjectId('67730141a2adee1afa997fe6')
          }
        }, {
          '$lookup': {
            'from': 'cards', 
            'localField': '_id', 
            'foreignField': 'parent_deck', 
            'as': 'cards'
          }
        }, {
          '$addFields': {
            'last_practiced': {
              '$ifNull': [
                {
                  '$max': '$cards.last_practiced'
                }, '$date_created'
              ]
            }, 
            'weak_cards': {
              '$size': {
                '$filter': {
                  'input': '$cards', 
                  'as': 'card', 
                  'cond': {
                    '$lte': [
                      '$$card.next_practice_date', new Date()
                    ]
                  }
                }
              }
            }
          }
        }, {
          '$project': {
            'title': 1, 
            'date_created': 1, 
            'last_practiced': 1, 
            'cards': {
              '$size': '$cards'
            }, 
            'weak_cards': 1
          }
        }, {
          '$sort': {
            'last_practiced': -1
          }
        }
      ]

      // Run the aggregation pipeline and store the results in the finalData object.
      const decksCursor = await deckCollection.aggregate(pipeline);
      finalData.decks = await decksCursor.toArray();

      finalData.total_decks = finalData.decks.length; // Calculate total deck number

      // Calculate the number of cards and weak cards.
      // Also, convert the _id to a string (instead of its default object type)
      finalData.decks.forEach((deck) => {
        finalData.total_cards += deck.cards;
        finalData.total_weakCards += deck.weak_cards;

        deck._id = deck._id.toString();
      })    

      await client.close();

    } catch (error) {
      await client.close();
      return (
        <PageErrorMessage error={error}>Unable to load dashboard. Please try again.</PageErrorMessage>
      )
    }
    
    

    return (
      <>
        <div className="d-flex justify-content-between align-items-center gap-25 mb-50 mb-sm-60">
          <TotalsSection decks={finalData.total_decks} cards={finalData.total_cards}/>
          <ButtonWithIcon isLinkButton={true} href='#' className="btn btn-primary d-none d-md-block" variant='primary' iconSrc='icons/add_3.svg' iconFillColor={'white'} iconHeight={16} altTag={'new deck icon'}>New Deck</ButtonWithIcon>
        </div>        
        <DashboardCard xPadding={30} yPadding={35} className="mb-50 mw-600">
          <Stack gap={30}>
            <div className="d-flex align-items-center justify-content-between">
              <h3 className="fw-medium heading-underline-blue-100 lh-1"><span className="d-block d-xs_sm-none">Weak Cards</span><span className="d-none d-xs_sm-block">Review Weak Cards</span></h3>
              <p className="fw-medium"><Icon height={24} alt='Card icon' src='/icons/cards300.svg' /> {finalData.total_weakCards}</p>
            </div>          
            {finalData.total_weakCards !== 0 ?
              <>
                <p><span className="fw-medium">{finalData.total_weakCards}</span> cards need review. Practice them now to keep them fresh.</p>
                <div>
                  <Link role='button' href='#' className='btn btn-primary'>Practice Now</Link>
                </div>
              </>
              :
              <p>You have no weak cards to practice. Way to go!</p>
            }
          </Stack>
        </DashboardCard>

        <DecksArea decks={finalData.decks} />

        <BackToTopButton />

      </>
    )
  }
  
  export default Dashboard
  