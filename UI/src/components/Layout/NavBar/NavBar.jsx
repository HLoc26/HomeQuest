import { Container, Nav, Navbar, NavDropdown, Offcanvas } from "react-bootstrap";
import { useState } from "react";

import { useStore } from "~/store";
import ThemeButton from "~/components/ThemeButton/ThemeButton";

function NavBar() {
	const [state] = useStore();
	const [offCanvasToggled, setOffCanvasToggled] = useState(false);

	console.log(offCanvasToggled);

	const expand = "sm";
	return (
		<>
			<Navbar key={expand} expand={expand} className="bg-body-tertiary mb-3">
				<Container fluid>
					<div>
						<Navbar.Brand href="#">HomeQuest</Navbar.Brand>
						<ThemeButton />
					</div>

					<Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
					<Navbar.Offcanvas id={`offcanvasNavbar-expand-${expand}`} aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`} placement="end">
						<Offcanvas.Header closeButton>
							<Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>Menu</Offcanvas.Title>
						</Offcanvas.Header>
						<Offcanvas.Body>
							<Nav className="justify-content-end flex-grow-1 pe-3">
								<Nav.Link href="/">Dashboard </Nav.Link>
								<NavDropdown title={state.user.usn} id={`offcanvasNavbarDropdown-expand-${expand}`} align="end">
									<NavDropdown.Item href="/user/me">Your profile</NavDropdown.Item>
									<NavDropdown.Item href="/tasks">Your tasks</NavDropdown.Item>
									<NavDropdown.Divider />
									<NavDropdown.Item href="/logout">Log out</NavDropdown.Item>
								</NavDropdown>
							</Nav>
						</Offcanvas.Body>
					</Navbar.Offcanvas>
				</Container>
			</Navbar>
		</>
	);
}

export default NavBar;
