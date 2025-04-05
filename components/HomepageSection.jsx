import * as React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

function HomepageSection({children, py, backgroundColor, ...otherProps}) {
    return (
        <Container {...otherProps} fluid as='section' className={`px-5 py-${py} bg-${backgroundColor} ${otherProps.className ? otherProps.className : ''}`}>
            <Row className='justify-content-center g-5 mx-auto' style={{maxWidth: '80rem'}}>
                {React.Children.map(children, (child) => {
                    return <Col xs='12' sm='11' md='10' lg='12' className='d-flex justify-content-center'>
                        {child}
                    </Col>
                })}
            </Row>
        </Container>
    );
}

export default HomepageSection; 