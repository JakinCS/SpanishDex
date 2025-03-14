import React from 'react'
import Image from 'next/image'
import DashboardCard from './DashboardCard'

const TotalsSection = (props) => {  
  const totalsSectionBody = (
      <div className='d-block d-sm-flex justify-content-sm-between'>
        <span className="d-flex align-items-center justify-content-center text-primary gap-2 mb-20 mb-sm-0">
          <Image className="icon fill-primary" height={24} width={24} alt={'Bar chart icon'} src={'/icons/bar_chart.svg'}/>
          <h3 className='lh-1'>
            <span className='d-block d-sm-none'>Flashcard Totals</span>
            <span className='d-none d-sm-block'>Totals</span>
          </h3>
        </span>
        <div className="d-flex flex-wrap gap-10 gap-sm-25 justify-content-center lh-1">
          <span className="d-flex align-items-center justify-content-center gap-3 mx-2 mx-sm-0 fw-medium">
            <Image className="icon" height={24} width={24} alt={'Deck icon'} src={'/icons/deck300.svg'}/>
            <p><span>6</span> Decks</p>
          </span>
          <span className="d-flex align-items-center justify-content-center gap-3 mx-2 mx-sm-0 fw-medium">
            <Image className="icon" height={24} width={24} alt={'Card icon'} src={'/icons/cards300.svg'}/>
            <p><span>104</span> Cards</p>
          </span>
        </div>
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