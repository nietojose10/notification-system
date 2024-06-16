import { AdminForm, NotificationLayout } from '../'
import { Container } from 'react-bootstrap'
import '../nsAdmin.css';

export const NSAdmin = () => {
  return (
    <NotificationLayout>
      <Container>
        <AdminForm/>
      </Container>
    </NotificationLayout>
  )
}
