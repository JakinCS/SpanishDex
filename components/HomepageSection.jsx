import * as React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

function HomepageSection(props) {
    return (
        <Container fluid as='section' className={`px-5 py-${props.py} bg-${props.backgroundColor}`}>
            <Row className='justify-content-center g-5 mx-auto' style={{maxWidth: '87.5rem'}}>
                {React.Children.map(props.children, (child) => {
                    return <Col xs='12' sm='11' md='10' lg='12' className='d-flex justify-content-center'>
                        {child}
                    </Col>
                })}
            </Row>
        </Container>
    );
}

export default HomepageSection; 