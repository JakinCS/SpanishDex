import ButtonWithIcon from "@/components/ButtonWithIcon";
import DashboardCard from "@/components/dashboard/DashboardCard";
import TotalsSection from "@/components/dashboard/TotalsSection";
import Link from "next/link";
import Stack from 'react-bootstrap/Stack'
import PageErrorMessage from "@/components/PageErrorMessage";
import DecksArea from "@/components/dashboard/DecksArea";
import BackToTopButton from "@/components/BackToTopButton";
import Icon from "@/components/Icon";
import { getDashboardDeckInfo } from "@/lib/actions";
import { redirect } from "next/navigation";


async function Dashboard() {

    // This object holds totals information used by various page components.
    let finalData;

    try {
      // Use this server action to retrieve the necessary dashboard information.
      const result = await getDashboardDeckInfo();

      if (result.success === false) {
        if (result.message.includes('not logged in')) redirect('/auth/signin'); // Redirect to sign-in if the user is not logged in

        // If there was an error in retrieving the dashboard information, return the error message
        return (
          <PageErrorMessage buttonType={'reload'} error={result.error}>
            {result.message || 'Unable to load dashboard. Please try again.'}
          </PageErrorMessage>
        )
      }

      finalData = result.data; // This will be the final data object returned from the getDashboardDeckInfo function

    } catch (error) {
      return (
        <PageErrorMessage buttonType={'reload'} error={error}>Unable to load dashboard. Please try again.</PageErrorMessage>
      )
    }
    
    

    return (
      <>
        <div className="d-flex justify-content-between align-items-center gap-25 mb-25 mb-sm-60">
          <TotalsSection decks={finalData.total_decks} cards={finalData.total_cards}/>
          <ButtonWithIcon isLinkButton={true} href='/dashboard/deck/new' className="btn btn-primary d-none d-md-block" variant='primary' iconSrc='icons/add_3.svg' iconFillColor={'white'} iconHeight={16} altTag={'new deck icon'}>New Deck</ButtonWithIcon>
        </div>        
        <DashboardCard xPadding={30} yPadding={35} className="mb-30 mb-sm-50 mw-600">
          <Stack gap={30}>
            <div className="d-flex align-items-center justify-content-between">
              <h3 className="fw-medium heading-underline-blue-100 lh-1"><span className="d-block d-xs_sm-none">Weak Cards</span><span className="d-none d-xs_sm-block">Review Weak Cards</span></h3>
              <p className="fw-medium"><Icon height={24} alt='Card icon' src='/icons/cards300.svg' /> {finalData.total_weakCards}</p>
            </div>          
            {finalData.total_weakCards !== 0 ?
              <>
                <p><span className="fw-medium">{finalData.total_weakCards}</span> cards need review. Practice them now to keep them fresh.</p>
                <div>
                  <Link role='button' href='#' className='btn btn-primary d-block d-xs_sm-inline-block'>Practice Now</Link>
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
  