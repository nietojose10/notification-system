import { Card, Col, Container, Row } from 'react-bootstrap';
import { CardHome, NotificationLayout } from '../';
import { faTowerBroadcast } from '@fortawesome/free-solid-svg-icons';
import '../notificationHome.css';

export const NotificationHome = () => {
  return (
    <NotificationLayout>
        <Container className="ctn-notification-system-menu">
            <Row>
                <Col lg={4} md={8} sm={12}>
                    <CardHome title="Broadcast Message" icon={faTowerBroadcast} description="Enter to this option to send a message to every user who is subscribed to each channel available" />
                </Col>
                <Col lg={4} md={8} sm={12}>
                    <CardHome title="Log History" icon={faTowerBroadcast} description="Enter to this option to send a message to every user who is subscribed to each channel available" />
                </Col>
                <Col lg={4} md={8} sm={12}>
                    <CardHome title="Admin" icon={faTowerBroadcast} description="Enter to this option to send a message to every user who is subscribed to each channel available" />
                </Col>
            </Row>
        </Container>
    </NotificationLayout>
    // <div>
    //     Hola este es el home
    // </div>
  )
}
