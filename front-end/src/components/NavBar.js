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
                        DeXAggregator
                    </Navbar.Brand>
                    <Account />
                </Container>
            </Navbar>
        </>
    );
}

export default NavBar;
