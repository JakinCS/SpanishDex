
import ButtonWithIcon from "@/components/ButtonWithIcon";
import DashboardCard from "@/components/dashboard/DashboardCard";
import TotalsSection from "@/components/dashboard/TotalsSection";
import Stack from 'react-bootstrap/Stack'
import DecksArea from "@/components/dashboard/DecksArea";

const DashboardSkeleton = () => {
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
          
          <div className='placeholder-glow'>
            <span className='placeholder bg-gray-150 rounded w-100' style={{height: '1.5rem' }}></span>
            <span className='placeholder bg-gray-150 rounded' style={{height: '1.5rem', width: '30%' }}></span>
          </div>
          <div className='placeholder-glow'>
            <span className='placeholder bg-gray-150 rounded d-block d-xs_sm-none' style={{height: '2.5rem', width: '100%' }}></span>
            <span className='placeholder bg-gray-150 rounded d-none d-xs_sm-block' style={{height: '2.5rem', width: '10rem' }}></span>
          </div>
          
        </Stack>
      </DashboardCard>

      <DecksArea indicateLoading={true} decks={[]} />

    </>
  )
}

export default DashboardSkeleton