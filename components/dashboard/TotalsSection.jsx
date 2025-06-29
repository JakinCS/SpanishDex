import React from 'react'
import DashboardCard from '../utils/Card'
import Icon from '../utils/Icon'

const TotalsSection = ({decks, cards, indicateLoading, ...props}) => {  
  const totalsSectionBody = (
      <div className='d-block d-sm-flex justify-content-sm-between'>
        <span className="d-flex align-items-center justify-content-center text-primary gap-2 mb-20 mb-sm-0">
          <Icon className="fill-primary" height={24} alt="" src={'/icons/bar_chart.svg'}/>
          <h2 className='fs-3 lh-1'>
            <span className='d-block d-sm-none'>Flashcard Totals</span>
            <span className='d-none d-sm-block'>Totals</span>
          </h2>
        </span>
        {indicateLoading ? 
          
          <div className='placeholder-glow d-flex justify-content-center'>
            <span className='placeholder bg-gray-150 rounded me-25' style={{height: '1.5rem', width: '6rem' }}></span>
            <span className='placeholder bg-gray-150 rounded' style={{height: '1.5rem', width: '6rem' }}></span>
          </div>
          :
          <div className="d-flex flex-wrap gap-10 gap-sm-25 justify-content-center lh-1">
            <span className="d-flex align-items-center justify-content-center gap-3 mx-2 mx-sm-0 fw-medium">
              <Icon height={24} alt="" src={'/icons/deck300.svg'}/>
              <p><span>{decks}</span> {decks === 1 ? 'Deck' : 'Decks'}</p>
            </span>
            <span className="d-flex align-items-center justify-content-center gap-3 mx-2 mx-sm-0 fw-medium">
              <Icon height={24} alt="" src={'/icons/cards300.svg'}/>
              <p><span>{cards}</span> {cards === 1 ? 'Card' : 'Cards'}</p>
            </span>
          </div>
        }
        
      </div>
  )


  return (
    <>
      <DashboardCard {...props} xPadding={30} yPadding={20} className={`flex-grow-1 d-block d-sm-none ${props.className || ''}`}>
        {totalsSectionBody}
      </DashboardCard>
      <DashboardCard {...props} xPadding={30} yPadding={14} className={`d-none d-sm-block flex-grow-1 lh-1 mw-600 ${props.className || ''}`}>
        {totalsSectionBody}
      </DashboardCard>
    </>
  )
}

export default TotalsSection