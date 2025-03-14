import { auth } from "@/auth"
import ButtonWithIcon from "@/components/ButtonWithIcon";
import DashboardCard from "@/components/dashboard/DashboardCard";
import DashboardDeck from "@/components/dashboard/DashboardDeck";
import TotalsSection from "@/components/dashboard/TotalsSection";
import Image from "next/image";
import Link from 'next/link'
import Button from 'react-bootstrap/Button'
import Stack from 'react-bootstrap/Stack'
import Container from "react-bootstrap/Container";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import FilterButton from "@/components/dashboard/FilterButton";
import DeckSearch from "@/components/dashboard/DeckSearch";


async function Dashboard() {

    // Get session information
    const session = await auth();

    return (
      <>
        <div className="d-flex justify-content-between align-items-center gap-25 mb-50 mb-sm-60">
          <TotalsSection />
          <ButtonWithIcon className="d-none d-md-block" variant='primary' iconSrc='icons/add_3.svg' iconFillColor={'white'} iconHeight={16} altTag={'new deck icon'}>New Deck</ButtonWithIcon>
        </div>        
        <DashboardCard xPadding={30} yPadding={35} className="mb-50 mw-600">
          <Stack gap={30}>
            <div className="d-flex align-items-center justify-content-between">
              <h3 className="fw-medium heading-underline-blue-100 lh-1"><span className="d-block d-xs_sm-none">Weak Cards</span><span className="d-none d-xs_sm-block">Review Weak Cards</span></h3>
              <p className="fw-medium"><Image className="icon" height={24} width={24} alt={'Card icon'} src={'/icons/cards300.svg'}/> 30</p>
            </div>          
            <p><span className="fw-medium">30</span> cards need review. Practice them now to keep them fresh.</p>
            <div>
              <Button variant='primary'>Practice Now</Button>
            </div>
          </Stack>
        </DashboardCard>

        <div className="filter-search-container d-flex align-items-center justify-content-between py-15 mb-40 border-bottom border-gray-150 border-2">
          <h3 className="fw-medium">All Decks</h3> 
          <div className="d-flex">
            <FilterButton className='me-15'>Recent</FilterButton>
            <DeckSearch />
          </div>
        </div>

        {/* <div className="container-fluid" style={{margin: '-1.25rem'}}> */}
        <div className="container-fluid p-0">
          <div className="row" style={{margin: '-1.25rem'}}>
            <div className="col-12 col-md-6 col-lg_xl-4 px-0" style={{minWidth: '18.7519525rem'}}>
              <DashboardDeck className='p-20 '/> 
            </div>
            <div className="col-12 col-md-6 col-lg_xl-4 px-0" style={{minWidth: '18.7519525rem'}}>
              <DashboardDeck className='p-20'/> 
            </div>
            <div className="col-12 col-md-6 col-lg_xl-4 px-0" style={{minWidth: '18.7519525rem'}}>
              <DashboardDeck className='p-20'/> 
            </div>
            <div className="col-12 col-md-6 col-lg_xl-4 px-0" style={{minWidth: '18.7519525rem'}}>
              <DashboardDeck className='p-20'/> 
            </div>
            <div className="col-12 col-md-6 col-lg_xl-4 px-0" style={{minWidth: '18.7519525rem'}}>
              <DashboardDeck className='p-20'/> 
            </div>
            <div className="col-12 col-md-6 col-lg_xl-4 px-0" style={{minWidth: '18.7519525rem'}}>
              <DashboardDeck className='p-20'/> 
            </div>
            <div className="col-12 col-md-6 col-lg_xl-4 px-0" style={{minWidth: '18.7519525rem'}}>
              <DashboardDeck className='p-20'/> 
            </div>
            <div className="col-12 col-md-6 col-lg_xl-4 px-0" style={{minWidth: '18.7519525rem'}}>
              <DashboardDeck className='p-20'/> 
            </div>
            <div className="col-12 col-md-6 col-lg_xl-4 px-0" style={{minWidth: '18.7519525rem'}}>
              <DashboardDeck className='p-20'/> 
            </div>
            <div className="col-12 col-md-6 col-lg_xl-4 px-0" style={{minWidth: '18.7519525rem'}}>
              <DashboardDeck className='p-20'/> 
            </div>
            <div className="col-12 col-md-6 col-lg_xl-4 px-0" style={{minWidth: '18.7519525rem'}}>
              <DashboardDeck className='p-20'/> 
            </div>
          </div>
        </div>
        
        {/* <Container className="p-0 mb-80" fluid>
          <Row xs={1} md={2} xl={3}>
            <Col>
              <DashboardDeck/>            
            </Col>
            <Col>
              <DashboardDeck/>            
            </Col>
            <Col>
              <DashboardDeck/>            
            </Col>
            <Col>
              <DashboardDeck/>            
            </Col>
            <Col>
              <DashboardDeck/>            
            </Col>
            <Col>
              <DashboardDeck/>            
            </Col>
            <Col>
              <DashboardDeck/>            
            </Col>
            <Col>
              <DashboardDeck/>            
            </Col>
            <Col>
              <DashboardDeck/>            
            </Col>
          </Row>
        </Container> */}

        {/* <div className="d-flex flex-wrap gap-40 mb-20">
          <DashboardDeck className='flex-grow-1 flex-shrink-0'/>
          <DashboardDeck className='flex-grow-1 flex-shrink-0'/>
          <DashboardDeck className='flex-grow-1 flex-shrink-0'/>
          <DashboardDeck className='flex-grow-1 flex-shrink-0'/>
          <DashboardDeck className='flex-grow-1 flex-shrink-0'/>
          <DashboardDeck className='flex-grow-1 flex-shrink-0'/>
          <DashboardDeck className='flex-grow-1 flex-shrink-0'/>
          <DashboardDeck className='flex-grow-1 flex-shrink-0'/>
          <DashboardDeck className='flex-grow-1 flex-shrink-0'/>
          <DashboardDeck className='flex-grow-1 flex-shrink-0' style={{maxWidth: 'calc(100%)'}}/>
          <DashboardDeck className='flex-grow-1 flex-shrink-0' style={{maxWidth: 'calc((100% - 2.5rem) / 2)'}}/>
          <DashboardDeck className='flex-grow-1 flex-shrink-0' style={{maxWidth: 'calc((100% - 5rem) / 3)'}}/>
          <DashboardDeck className='flex-grow-1 flex-shrink-0' style={{maxWidth: 'max(calc((100% - 7.5rem) / 4), 18.7519525rem)'}}/>

        </div> */}
      </>
    )
  }
  
  export default Dashboard
  