import { Nav } from "react-bootstrap"
import { NavBar } from "../../ui/components/NavBar"

export const NotificationLayout = ({ children }) => {
  return (
    <div className="notification-layout">
        <NavBar>
            <Nav.Link href="#home_notification">Home</Nav.Link>
            <Nav.Link href="#home_notification">Admin</Nav.Link>
            <Nav.Link href="#home_notification">Broadcast Message</Nav.Link>
        </NavBar>
        <div className="container-in-layout" >
            { children }
        </div>
    </div>
  )
}
