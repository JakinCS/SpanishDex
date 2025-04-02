import BackButton from '@/components/BackButton'
import ButtonWithIcon from '@/components/ButtonWithIcon'
import CardListItem from '@/components/CardListItem'
import DashboardCard from '@/components/dashboard/DashboardCard'
import Icon from '@/components/Icon'
import IconButton from '@/components/IconButton'
import UnderlineContainer from '@/components/UnderlineContainer'
import MoreButton from '@/components/viewdeck/MoreButton'
import Link from 'next/link'
import Button from 'react-bootstrap/Button'
import { MongoClient, ObjectId } from "mongodb";
import PageErrorMessage from '@/components/PageErrorMessage'


const DeckPage = async ({ params }) => {

  const { id } = await params

  // Define the client variable, holding a new MongoClient instance  
  const client = new MongoClient(process.env.MONGODB_URI);

  let deck;

  try {
    
    // Connect to the database
    await client.connect();
    const database = client.db('spanishdex');

    const deckCollection = database.collection('decks');

    // Fancy aggregation pipeline for retrieving the deck information with a list of cards 
    const pipeline = [
      {
        '$match': {
          '_id': new ObjectId(id)
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
          'description': 1,
          'cards': {
            'english': 1, 
            'spanish': 1, 
            'next_practice_date': 1
          }, 
          'weak_cards': 1
        }
      }
    ]

    // Run the aggregation pipeline and store the results in the finalData object.
    const decksCursor = await deckCollection.aggregate(pipeline);
    deck = (await decksCursor.toArray())[0];
    console.log(deck)

    await client.close();

  } catch (error) {
    await client.close();
    return (
      <PageErrorMessage error={error}>Unable to load page. Please try again.</PageErrorMessage>
    )
  }

  const dateCreated = new Date(deck.date_created);
  // Format the date to a readable format
  const formattedDateCreated = `${dateCreated.toLocaleString('default', { month: 'long' })} ${dateCreated.getDate()}, ${dateCreated.getFullYear()}`;
  
  const lastPracticed = new Date(deck.last_practiced);
  // Format the date to a readable format
  const formattedLastPracticed = `${lastPracticed.toLocaleString('default', { month: 'long' })} ${lastPracticed.getDate()}, ${lastPracticed.getFullYear()}`;


  return (
    <>
      <div className='d-flex justify-content-between align-items-center mb-40'>
        <BackButton />
        <div className='d-flex'>
          <ButtonWithIcon isLinkButton={true} className="btn btn-gray me-10" href="#" iconSrc='/icons/edit.svg' iconHeight={24} altTag='Edit icon'>Edit Deck</ButtonWithIcon>
          <MoreButton deck={{id: deck._id.toString(), title: deck.title}}/> 
        </div>
      </div>
      <h1 className='mb-25'>{deck.title}</h1>
      <p>{deck.description}</p>
      <DashboardCard xPadding={30} yPadding={35} className="mt-50" style={{maxWidth: '31.25rem'}}>
        <h3 className="fw-medium heading-underline-blue-100 lh-1 mb-40">Deck Info</h3>
        <div className='d-flex gap-30'>
          <span className="d-flex align-items-center gap-3 mx-2 mx-sm-0 fw-medium">
            <Icon height={24} alt={'Card icon'} src={'/icons/cards300.svg'}/>
            <p><span>{deck.cards.length}</span> Total Cards</p>
          </span>
          <span className="d-flex align-items-center gap-3 mx-2 mx-sm-0 fw-medium">
            <Icon height={24} alt={'Card icon'} src={'/icons/cards300.svg'}/>
            <p><span>{deck.weak_cards}</span> Weak Cards</p>
          </span>
        </div>
        <hr className='my-20'/>
        <span className="d-flex align-items-center gap-2 mx-2 mx-sm-0">
          <Icon height={24} alt={'Date icon'} src={'/icons/calendar.svg'}/>
          <p><span className='me-3 fw-medium'>Created:</span> {formattedDateCreated}</p>
        </span>
        <hr className='my-20'/>
        <span className="d-flex align-items-center gap-2 mx-2 mx-sm-0">
          <Icon height={24} alt={'Clock icon'} src={'/icons/clock.svg'}/>
          <p><span className='me-3 fw-medium'>Last Practiced:</span> {formattedLastPracticed}</p>
        </span>
      </DashboardCard>
      <div className='mt-50 mb-60'>
        <Link href="#" role="button" className='btn btn-primary me-30'>Review All Cards</Link>
        <Link href="#" role="button" className='btn btn-secondary'>Review Weak Cards</Link>
      </div>

      <UnderlineContainer className='mb-30'>
        <div className="d-flex align-items-center justify-content-between">
          <h3 className='fw-medium'>All Cards ({deck.cards.length})</h3>
          <ButtonWithIcon isLinkButton={true} className="btn btn-primary" href="#" iconSrc='/icons/add_3.svg' iconHeight={16} altTag='Add icon' iconFillColor="white">Add Cards</ButtonWithIcon>
        </div>
      </UnderlineContainer>

      <div className='mb-30'>
        {
          deck.cards.map((card, index) => {
            const key = index + 1;

            const weak = (new Date(card.next_practice_date)).getTime() <= (new Date()).getTime()

            return (
              <CardListItem 
                key={key} 
                number={key} 
                cardInfo={{...card, weak}}
                className="mb-10"
              />
            )
          })
        }

      </div>
    </>
  )
}

export default DeckPage