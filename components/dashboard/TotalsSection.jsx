import React from 'react'
import Image from 'next/image'

const TotalsSection = () => {
  return (
    <div className="d-flex justify-content-between">
      <span className="d-flex align-items-center text-primary gap-2">
        <Image className="icon fill-primary" height={24} width={24} alt={'Bar chart icon'} src={'/icons/bar_chart.svg'}/>
        <h3 className='lh-1'>Totals</h3>
      </span>
      <div className="d-flex gap-25 lh-1">
        <span className="d-flex align-items-center gap-3 fw-medium">
          <Image className="icon" height={24} width={24} alt={'Deck icon'} src={'/icons/deck300.svg'}/>
          <p><span>6</span> Decks</p>
        </span>
        <span className="d-flex align-items-center gap-3 fw-medium">
          <Image className="icon" height={24} width={24} alt={'Card icon'} src={'/icons/cards300.svg'}/>
          <p><span>104</span> Cards</p>
        </span>
        <span className="d-flex align-items-center gap-3 fw-medium">
          <Image className="icon" height={24} width={24} alt={'Card icon'} src={'/icons/cards300.svg'}/>
          <p><span>30</span> Weak Cards</p>
        </span>
      </div>
    </div>
  )
}

export default TotalsSection