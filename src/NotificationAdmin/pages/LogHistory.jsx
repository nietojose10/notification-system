import { Container } from 'react-bootstrap';
import { MessagesReport, NotificationLayout } from '../';

export const LogHistory = () => {
  return (
    <NotificationLayout>
        <Container>
            <MessagesReport />
        </Container>
    </NotificationLayout>
  )
}
