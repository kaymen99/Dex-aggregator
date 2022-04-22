import { Navbar, Container, Nav } from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.css';
import Account from "./Account"
import logo from '../dapp-logo.png';

function NavBar() {

    return (
        <>
            <Navbar bg="dark" variant="dark" expand="lg">
                <Container>
                    <Navbar.Brand href="/">
                        <img src={logo} width="100px" />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav activeKey={window.location.pathname}
                            className="me-auto"
                            style={{ maxHeight: '100px' }}
                            navbarScroll>
                        </Nav>
                        <Account />
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}

export default NavBar;