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
          <div className={'d-flex align-items-center justify-content-center rounded mb-10' + ` bg-red-300`} style={{height: '2.1875rem', width: '2.1875rem'}}>
            <span className='fw-semibold lh-1'>1</span>
          </div>
          {listOf1s.map((card, index) => {
            return <SummaryCardListItem key={card._id} className={index + 1 === listOf1s.length ? 'mb-40' : 'mb-10'} score={1} cardInfo={{spanish: card.spanish, english: card.english}}/>
          })}
        </>
      )}
      {listOf2s.length > 0 && (
        <>
          <div className={'d-flex align-items-center justify-content-center rounded mb-10' + ` bg-yellow-300`} style={{height: '2.1875rem', width: '2.1875rem'}}>
            <span className='fw-semibold lh-1'>2</span>
          </div>
          {listOf2s.map((card, index) => {
            return <SummaryCardListItem key={card._id} className={index + 1 === listOf2s.length ? 'mb-40' : 'mb-10'} score={2} cardInfo={{spanish: card.spanish, english: card.english}}/>
          })}
        </>
      )}
      {listOf3s.length > 0 && (
        <>
          <div className={'d-flex align-items-center justify-content-center rounded mb-10' + ` bg-green-yellow-300`} style={{height: '2.1875rem', width: '2.1875rem'}}>
            <span className='fw-semibold lh-1'>3</span>
          </div>
          {listOf3s.map((card, index) => {
            return <SummaryCardListItem key={card._id} className={index + 1 === listOf3s.length ? 'mb-40' : 'mb-10'} score={3} cardInfo={{spanish: card.spanish, english: card.english}}/>
          })}
        </>
      )}
      {listOf4s.length > 0 && (
        <>
          <div className={'d-flex align-items-center justify-content-center rounded mb-10' + ` bg-yellow-green-300`} style={{height: '2.1875rem', width: '2.1875rem'}}>
            <span className='fw-semibold lh-1'>4</span>
          </div>
          {listOf4s.map((card, index) => {
            return <SummaryCardListItem key={card._id} className={index + 1 === listOf4s.length ? 'mb-40' : 'mb-10'} score={4} cardInfo={{spanish: card.spanish, english: card.english}}/>
          })}
        </>
      )}
      {listOf5s.length > 0 && (
        <>
          <div className={'d-flex align-items-center justify-content-center rounded mb-10' + ` bg-green-300`} style={{height: '2.1875rem', width: '2.1875rem'}}>
            <span className='fw-semibold lh-1'>5</span>
          </div>
          {listOf5s.map((card, index) => {
            return <SummaryCardListItem key={card._id} className={'mb-10'} score={5} cardInfo={{spanish: card.spanish, english: card.english}}/>
          })}
        </>
      )}
    </>
  )
}

export default SummaryDetailsList