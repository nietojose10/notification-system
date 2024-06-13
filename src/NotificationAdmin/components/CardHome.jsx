import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Card, Col } from 'react-bootstrap';

export const CardHome = ({ title, icon, description }) => {
  return (
    <Card className="card-notification-home">
        <Card.Header><Col lg={3} md={2} sm={2}> <FontAwesomeIcon icon={icon} size="2xl" style={{color: "#BE7B72",}} /> </Col><Col lg={9} md={10} sm={10}><span className="card-title" >{ title }</span></Col></Card.Header>
        <Card.Body>
            <Card.Text>
                { description }
            </Card.Text>
        </Card.Body>
    </Card>
  )
}
