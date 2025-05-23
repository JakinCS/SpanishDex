import BackButton from '@/components/BackButton'
import ButtonWithIcon from '@/components/ButtonWithIcon'
import DashboardCard from '@/components/Card'
import IconButton from '@/components/IconButton'
import UnderlineContainer from '@/components/UnderlineContainer'
import Link from 'next/link'

const ViewDeckSkeleton = () => {
  return (
    <>
      <div className='d-flex justify-content-between align-items-center mb-40'>
        <BackButton />
        <div className='d-flex'>
          <ButtonWithIcon className="d-none d-xs_sm-block me-10 disabled" variant='gray' iconSrc='/icons/edit.svg' iconHeight={24} altTag='Edit icon'>Edit Deck</ButtonWithIcon>
          <IconButton className={'d-block d-xs_sm-none me-10 disabled'} variant='gray' iconSrc='/icons/edit.svg' altTag='Edit icon' size='sm' />
          <IconButton variant='light' className={'disabled'} iconSrc='/icons/more.svg' altTag='More icon' size='sm' />
        </div>
      </div>
      <div className='placeholder-glow py-2 mb-25'>
        <span className='placeholder bg-gray-150 rounded' style={{height: '2rem', width: '17rem' }}></span>
      </div>
      <div className='placeholder-glow'>
        <span className='placeholder bg-gray-150 rounded d-none d-sm-block' style={{height: '1.75rem', width: '25rem' }}></span>
        <span className='placeholder bg-gray-150 rounded d-block d-sm-none' style={{height: '1.75rem', width: '12rem' }}></span>
      </div>
      <DashboardCard xPadding={30} yPadding={35} className="my-50" style={{maxWidth: '31.25rem'}}>
        <h3 className="fw-medium text-center text-xs_sm-start heading-underline-blue-100 lh-1 mb-40">Deck Information</h3>
        <div className='d-flex flex-column flex-xs_sm-row gap-15 gap-xs_sm-30'>

          <span className="d-flex align-items-center justify-content-center gap-3 fw-medium">
            <div className='placeholder-glow'>
              <span className='placeholder bg-gray-150 rounded' style={{height: '1.75rem', width: '9rem' }}></span>
            </div>
          </span>
          <span className="d-flex align-items-center justify-content-center gap-3 fw-medium">
            <div className='placeholder-glow'>
              <span className='placeholder bg-gray-150 rounded' style={{height: '1.75rem', width: '9rem' }}></span>
            </div>
          </span>

        </div>
        <hr className='my-20'/>
        <span className="d-flex flex-wrap justify-content-center justify-content-xs_sm-start gap-2">
          <div className='placeholder-glow'>
            <span className='placeholder bg-gray-150 rounded pe-3' style={{height: '1.75rem', width: '6rem' }}></span>
          </div>
          <div className='placeholder-glow'>
            <span className='placeholder bg-gray-150 rounded' style={{height: '1.75rem', width: '8.75rem' }}></span>
          </div>
        </span>
        <hr className='my-20'/>
        <span className="d-flex flex-wrap justify-content-center justify-content-xs_sm-start gap-2">
          <div className='placeholder-glow'>
            <span className='placeholder bg-gray-150 rounded pe-3' style={{height: '1.75rem', width: '9.25rem' }}></span>
          </div>
          <div className='placeholder-glow'>
            <span className='placeholder bg-gray-150 rounded' style={{height: '1.75rem', width: '5.75rem' }}></span>
          </div>
        </span>
      </DashboardCard>

      <UnderlineContainer className='d-block d-sm-none mb-30'>
        <div className="d-flex align-items-center justify-content-between">
          <h3 className='fw-medium'>Review Cards</h3>
        </div>
      </UnderlineContainer>
      <div className='mb-60 d-flex justify-content-center justify-content-xs_sm-start d-sm-none flex-wrap gap-20'>
        <Link href="#" role="button" className='btn btn-primary disabled w-100'>All Cards</Link>
        <Link href="#" role="button" className='btn btn-secondary disabled w-100'>Weak Cards</Link>
      </div>
      <div className='mb-60 d-none d-sm-flex flex-wrap gap-20'>
        <Link href="#" role="button" className='btn btn-primary disabled'>Review All Cards</Link>
        <Link href="#" role="button" className='btn btn-secondary disabled'>Review Weak Cards</Link>
      </div>

      <UnderlineContainer className='mb-30'>
        <div className="d-flex align-items-center justify-content-between">
          <h3 className='fw-medium'>All Cards 
            <div className='d-inline ms-3 placeholder-glow'><span className='placeholder bg-gray-150 rounded' style={{height: '1.75rem', width: '2rem' }}></span></div>
          </h3>
          <ButtonWithIcon isLinkButton={true} className="btn btn-primary d-none d-xs_sm-block disabled" href="#" iconSrc='/icons/add_3.svg' iconHeight={16} altTag='Add icon' iconFillColor="white">Add Cards</ButtonWithIcon>
          <IconButton className={'btn btn-primary d-block d-xs_sm-none disabled'} isLinkButton={true} href='#' iconFillColor="white" iconSrc='/icons/add.svg' altTag='Add icon' size='md' />
        </div>
      </UnderlineContainer>

      <div className='mb-40'>

        <p className="text-center fw-medium mb-4">Loading deck cards . . .</p>      

      </div>

    </>
  )
}

export default ViewDeckSkeleton