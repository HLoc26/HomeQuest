import { Button, Container, Nav, Navbar, Offcanvas } from "react-bootstrap";
import { useStore } from "~/store";
import { ThemeButton, ProfileButton } from "~/components";

function NavBar() {
	const [state] = useStore();
	const theme = state.theme;
	const expand = "sm";

	return (
		<Navbar expand={expand} className={`mb-3 shadow-sm ${theme === "dark" ? "bg-dark" : "bg-light"}`} sticky="top">
			<Container fluid>
				{/* Left Section */}
				<div className="d-flex align-items-center gap-3">
					<Navbar.Brand href="/" className="fw-bold d-flex align-items-center gap-2">
						<span
							style={{
								fontSize: "1.5rem",
								color: theme === "dark" ? "#fff" : "#333",
							}}
						>
							HomeQuest
						</span>
					</Navbar.Brand>
					<ThemeButton />
				</div>

				{/* Toggle for Mobile */}
				<Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} className="border-0" />

				{/* Right Section / Offcanvas */}
				<Navbar.Offcanvas
					id={`offcanvasNavbar-expand-${expand}`}
					aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
					placement="end"
					className={theme === "dark" ? "bg-dark text-light" : "bg-light"}
				>
					<Offcanvas.Header closeButton className={theme === "dark" ? "border-secondary" : ""}>
						<Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`} className={theme === "dark" ? "text-light" : ""}>
							Menu
						</Offcanvas.Title>
					</Offcanvas.Header>

					<Offcanvas.Body>
						<Nav className="justify-content-end align-items-center flex-grow-1 gap-2 pe-3">
							<ProfileButton />
						</Nav>
					</Offcanvas.Body>
				</Navbar.Offcanvas>
			</Container>
		</Navbar>
	);
}

export default NavBar;
