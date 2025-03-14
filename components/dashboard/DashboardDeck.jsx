import Image from 'next/image';
import Link from 'next/link';

const DashboardDeck = (props) => {
  return (
    <div {...props}>
      <Link href="#" className='d-block bg-white px-20 py-25 px-xs_sm-30 py-xs_sm-30 dashboard-deck-card rounded mb-15'>
        <h4 className='fw-medium lh-1 mb-40'>Common Verbs</h4>
        <div className='d-flex gap-25'>
          <span className="d-flex align-items-center gap-2 fs-6 fw-medium">
            <Image className="icon" height={20} width={20} alt={'Flashcard icon'} src={'/icons/cards300.svg'}/>
            <p><span>18</span> Total Cards</p>
          </span>
          <span className="d-flex align-items-center gap-2 fs-6 fw-medium">
            <Image className="icon" height={20} width={20} alt={'Flashcard icon'} src={'/icons/cards300.svg'}/>
            <p><span>3</span> Weak Cards</p>
          </span>
        </div>
      </Link>

      <p className='fw-medium fs-6 lh-1'><span>2</span> Days Ago</p>
    </div>
  )
}

export default DashboardDeck