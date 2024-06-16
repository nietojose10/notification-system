import { Nav } from "react-bootstrap"
import { NavBar } from "../../ui/components/NavBar"

export const NotificationLayout = ({ children }) => {
  return (
    <div className="notification-layout">
        <NavBar>
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/broadcastMessage">Broadcast Message</Nav.Link>
            <Nav.Link href="/logHistory">Log History</Nav.Link>
            <Nav.Link href="/NSadmin">Admin</Nav.Link>
            {/* /NSadmin */}
        </NavBar>
        <div className="container-in-layout" >
            { children }
        </div>
    </div>
  )
}
