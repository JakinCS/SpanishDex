import * as React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Stack from 'react-bootstrap/Stack'

function HomepageSectionColumns({py, py_sm, backgroundColor, image, imagePosition, headingText, children}) {
    return (
        <Container fluid as='section' className={`px-2 px-xs_sm-5 py-${py} py-sm-${py_sm || py} bg-${backgroundColor} overflow-hidden`}>
            <Row className='gy-5 gx-40 gx-xl-80 gx-xxl-100 justify-content-center mx-auto' style={{maxWidth: '80rem'}}>
                <Col xs={{span: 12, order: 0}} sm='11' md='10' lg={{span: '6', order: imagePosition === 'left' ? 0 : 1}} xl='5' className='d-flex flex-column flex-lg-row align-items-center'>
                    <h2 className="mx-auto d-block d-lg-none text-center mb-5">{headingText}</h2>
                    {image}
                </Col>
                <Col xs={{span: 12, order: 1}} sm='11' md='10' lg={{span: '6', order: imagePosition === 'left' ? 1 : 0}} xl='5'>
                    <Stack gap={5}>
                        <h2 className="d-none d-lg-block text-center">{headingText}</h2>
                        {children}
                    </Stack>
                </Col>
            </Row> 
        </Container>
    );
}

export default HomepageSectionColumns; 