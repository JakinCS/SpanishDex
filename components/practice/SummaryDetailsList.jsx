import React from 'react'
import SummaryCardListItem from './SummaryCardListItem';

const SummaryDetailsList = ({ cards, getScoreById }) => {

  const listOf1s = cards.filter((card) => getScoreById(card._id) === 1);
  const listOf2s = cards.filter((card) => getScoreById(card._id) === 2);
  const listOf3s = cards.filter((card) => getScoreById(card._id) === 3);
  const listOf4s = cards.filter((card) => getScoreById(card._id) === 4);
  const listOf5s = cards.filter((card) => getScoreById(card._id) === 5);

  return (
    <>
      {listOf1s.length > 0 && (
        <>
          <div className='d-flex align-items-center mb-10 gap-10'>
            <div className={'score-indicator d-flex align-items-center justify-content-center rounded' + ` bg-red-300`} style={{height: '2.1875rem', width: '2.1875rem'}}>
              <span className='fw-semibold lh-1'>1</span>
            </div>
            <h3 className='text-danger fs-4'>Hard</h3>
          </div>
          <ul style={{marginBottom: 0, paddingLeft: 0}}>
            {listOf1s.map((card, index) => {
              return <SummaryCardListItem key={card._id} className={index + 1 === listOf1s.length ? 'mb-40' : 'mb-10'} score={1} cardInfo={{spanish: card.spanish, english: card.english}}/>
            })}
          </ul>
        </>
      )}
      {listOf2s.length > 0 && (
        <>
          <div className='d-flex align-items-center mb-10 gap-10'>
            <div className={'score-indicator d-flex align-items-center justify-content-center rounded' + ` bg-yellow-300`} style={{height: '2.1875rem', width: '2.1875rem'}}>
              <span className='fw-semibold lh-1'>2</span>
            </div>
            <h3 className='text-warning fs-4'>Difficult</h3>
          </div>
          <ul style={{marginBottom: 0, paddingLeft: 0}}>
            {listOf2s.map((card, index) => {
              return <SummaryCardListItem key={card._id} className={index + 1 === listOf2s.length ? 'mb-40' : 'mb-10'} score={2} cardInfo={{spanish: card.spanish, english: card.english}}/>
            })}
          </ul>
        </>
      )}
      {listOf3s.length > 0 && (
        <>
          <div className='d-flex align-items-center mb-10 gap-10'>
            <div className={'score-indicator d-flex align-items-center justify-content-center rounded' + ` bg-green-yellow-300`} style={{height: '2.1875rem', width: '2.1875rem'}}>
              <span className='fw-semibold lh-1'>3</span>
            </div>
            <h3 className='text-green-yellow fs-4'>Normal</h3>
          </div>
          <ul style={{marginBottom: 0, paddingLeft: 0}}>
            {listOf3s.map((card, index) => {
              return <SummaryCardListItem key={card._id} className={index + 1 === listOf3s.length ? 'mb-40' : 'mb-10'} score={3} cardInfo={{spanish: card.spanish, english: card.english}}/>
            })}
          </ul>
        </>
      )}
      {listOf4s.length > 0 && (
        <>
          <div className='d-flex align-items-center mb-10 gap-10'>
            <div className={'score-indicator  d-flex align-items-center justify-content-center rounded' + ` bg-yellow-green-300`} style={{height: '2.1875rem', width: '2.1875rem'}}>
              <span className='fw-semibold lh-1'>4</span>
            </div>
            <h3 className='text-yellow-green fs-4'>Good</h3>
          </div>
          <ul style={{marginBottom: 0, paddingLeft: 0}}>
            {listOf4s.map((card, index) => {
              return <SummaryCardListItem key={card._id} className={index + 1 === listOf4s.length ? 'mb-40' : 'mb-10'} score={4} cardInfo={{spanish: card.spanish, english: card.english}}/>
            })}
          </ul>
        </>
      )}
      {listOf5s.length > 0 && (
        <>
          <div className='d-flex align-items-center mb-10 gap-10'>
            <div className={'score-indicator d-flex align-items-center justify-content-center rounded' + ` bg-green-300`} style={{height: '2.1875rem', width: '2.1875rem'}}>
              <span className='fw-semibold lh-1'>5</span>
            </div>
            <h3 className='text-success fs-4'>Easy</h3>
          </div>
          <ul style={{marginBottom: 0, paddingLeft: 0}}>
            {listOf5s.map((card, index) => {
              return <SummaryCardListItem key={card._id} className={'mb-10'} score={5} cardInfo={{spanish: card.spanish, english: card.english}}/>
            })}
          </ul>
        </>
      )}
    </>
  )
}

export default SummaryDetailsList