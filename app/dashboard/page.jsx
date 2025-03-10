import { auth, signOut } from "@/auth"
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


async function Dashboard() {

    // Get session information
    const session = await auth();

    return (
      <Container className="topLevelContainer" fluid>
        <h1 className="visually-hidden">Dashboard</h1>
        <div className="d-flex justify-content-between align-items-center mb-80">
          <DashboardCard xPadding={30} yPadding={14} className='lh-1' style={{width: '600px'}}>
            <TotalsSection />
          </DashboardCard>
          <ButtonWithIcon variant='primary' iconSrc='icons/add_3.svg' iconFillColor={'white'} iconHeight={16} altTag={'new deck icon'}>New Deck</ButtonWithIcon>
        </div>        
        <DashboardCard xPadding={30} yPadding={35} className="mb-50" style={{width: '600px'}}>
          <Stack gap={30}>
            <div className="d-flex align-items-center justify-content-between">
              <h3 className="fw-medium heading-underline-blue-100 lh-1">Review Weak Cards</h3>
              <p className="fw-medium"><Image className="icon" height={24} width={24} alt={'Card icon'} src={'/icons/cards300.svg'}/> 30</p>
            </div>          
            <p><span>30</span> cards need review. Practice them now to keep them fresh.</p>
            <div>
              <Button variant='primary'>Practice Now</Button>
            </div>
          </Stack>
        </DashboardCard>
        <div className="d-flex align-items-center justify-content-between py-15 mb-40 border-bottom border-gray-150 border-2">
          <h3 className="fw-medium">All Decks</h3> 
          <div>
            <Button className="me-15">Placeholder</Button>
            <Button>Placeholder</Button>
          </div>
        </div>
        
        {/* <Container className="p-0 mb-80" fluid>
          <Row xs={1} md={2} xl={3} gap={40}>
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

        <div className="d-flex flex-wrap gap-40 mb-20">
          <DashboardDeck className='flex-grow-1 flex-shrink-0'/>
          <DashboardDeck className='flex-grow-1 flex-shrink-0'/>
          <DashboardDeck className='flex-grow-1 flex-shrink-0'/>
          <DashboardDeck className='flex-grow-1 flex-shrink-0'/>
          <DashboardDeck className='flex-grow-1 flex-shrink-0'/>
          <DashboardDeck className='flex-grow-1 flex-shrink-0'/>
          <DashboardDeck className='flex-grow-1 flex-shrink-0'/>
          <DashboardDeck className='flex-grow-1 flex-shrink-0'/>
          <DashboardDeck className='flex-grow-1 flex-shrink-0'/>
          <DashboardDeck className='flex-grow-1 flex-shrink-0'/>

        </div>
      </Container>
    )
  }
  
  export default Dashboard
  