import './App.css'
import './scss/custom.scss'
// import 'bootstrap/dist/css/bootstrap.min.css'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

function App() {

  return (
    <>
      <div className="bg-primary p-3">Test</div>
      <Card style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title>Card Title</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
          <Button variant="primary">Go somewhere</Button>
          <Button variant="secondary">Go somewhere</Button>
          <Button variant="danger">Go somewhere</Button>
        </Card.Body>
      </Card>
    </>
  )
}

export default App
