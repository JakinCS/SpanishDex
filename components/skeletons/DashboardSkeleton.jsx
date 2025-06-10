
import ButtonWithIcon from "@/components/utils/ButtonWithIcon";
import DashboardCard from "@/components/utils/Card";
import TotalsSection from "@/components/dashboard/TotalsSection";
import Stack from 'react-bootstrap/Stack'
import UnderlineContainer from "../utils/UnderlineContainer";
import DashboardCardLoading from "./DashboardCardLoading";

const DashboardSkeleton = () => {
  const fakeDecks = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

  return (
    <>
      <div className="d-flex justify-content-between align-items-center gap-25 mb-25 mb-sm-60">
        <TotalsSection indicateLoading={true} decks={0} cards={0}/>
        <ButtonWithIcon isLinkButton={true} href='#' className="btn btn-primary d-none d-md-block" variant='primary' iconSrc='icons/add_3.svg' iconFillColor={'white'} iconHeight={16} altTag={'new deck icon'}>New Deck</ButtonWithIcon>
      </div>        
      <DashboardCard xPadding={30} yPadding={35} className="mb-30 mb-sm-50 mw-600">
        <Stack gap={30}>
          <div className="d-flex align-items-center justify-content-between">
            <h3 className="fw-medium heading-underline-blue-100 lh-1"><span className="d-block d-xs_sm-none">Weak Cards</span><span className="d-none d-xs_sm-block">Review Weak Cards</span></h3>
            <div className='placeholder-glow'>
              <span className='placeholder bg-gray-150 rounded' style={{height: '1.5rem', width: '2.5rem' }}></span>
            </div>
          </div>          
          
          <div>
            <div className='placeholder-glow' style={{marginBottom: '.25rem', maxHeight: '1.5rem'}}>
              <span className='placeholder bg-gray-150 rounded w-100' style={{height: '1.5rem'}}></span>
            </div>
            <div className='placeholder-glow d-block d-xs_sm-none' style={{marginBottom: '.25rem', maxHeight: '1.5rem'}}>
              <span className='placeholder bg-gray-150 rounded w-100' style={{height: '1.5rem'}}></span>
            </div>
            <div className='placeholder-glow d-block d-sm-none' style={{marginBottom: '.25rem', maxHeight: '1.5rem'}}>
              <span className='placeholder bg-gray-150 rounded' style={{height: '1.5rem', width: '30%' }}></span>
            </div>
          </div>
          <div className='placeholder-glow'>
            <span className='placeholder bg-gray-150 rounded d-block d-xs_sm-none' style={{height: '2.5rem', width: '100%' }}></span>
            <span className='placeholder bg-gray-150 rounded d-none d-xs_sm-block' style={{height: '2.5rem', width: '10rem' }}></span>
          </div>
          
        </Stack>
      </DashboardCard>

      <section>
        <UnderlineContainer className="filter-search-container mb-40">
          <div className="d-flex align-items-center justify-content-between gap-3">
            <h2 className="fw-medium fs-3" aria-live="polite">All Decks</h2>
            <div className="d-flex">
              <div className='placeholder-glow me-15'>
                <span className='placeholder bg-gray-150 rounded d-block d-md-none' style={{height: '2.5rem', width: '2.5rem' }}></span>
                <span className='placeholder bg-gray-150 rounded d-none d-md-block' style={{height: '2.5rem', width: '8.875rem' }}></span>
              </div>
              <div className='placeholder-glow'>
                <span className='placeholder bg-gray-150 rounded d-block d-sm_md-none' style={{height: '2.5rem', width: '2.5rem' }}></span>
                <span className='placeholder bg-gray-150 rounded d-none d-sm_md-block' style={{height: '2.5rem', width: '17.1875rem' }}></span>
              </div>
            </div>
          </div>
        </UnderlineContainer>

        <div className="container-fluid p-0">
          <div className="row" style={{margin: '-1.25rem'}}>
            {fakeDecks.map((deck) => {
              return (
                <section key={`placeholder2${deck}`} className="col-12 col-md-6 col-lg_xl-4 px-0" style={{minWidth: '18.7519525rem'}}>
                  <DashboardCardLoading />
                </section>
              )
            })}
          </div>
        </div>        
      </section>    

    </>
  )
}

export default DashboardSkeleton