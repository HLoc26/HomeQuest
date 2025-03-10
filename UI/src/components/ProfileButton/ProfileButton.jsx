import { useMediaQuery } from "react-responsive";
import { Button, ProgressBar, Nav } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { useUser } from "~/store";
import styles from "./ProfileButton.module.css";
import goldImg from "~/assets/coin.png";

function ProfileButton() {
	const [userState] = useUser();
	const user = userState.user;
	const theme = userState.theme;
	const isSmallScreen = useMediaQuery({ maxWidth: 576 }); // Bootstrap's 'sm' breakpoint

	// Common content for both button and dropdown
	const buttonContent = (
		<div style={{ minWidth: "150px", flexGrow: 1 }}>
			<div className={`${styles.userName} d-flex`}>
				<span className="flex-grow-1">{user.usn}</span>
				<div className="d-flex gap-2 align-items-center">
					<img src={goldImg} width="20px" height="20px" alt="Gold" />
					{user.gold}
				</div>
			</div>
			<div className="d-flex align-items-center gap-2">
				<p className="m-0">Lv.{user.level}</p>
				<ProgressBar
					now={user.xp}
					label={`${user.xp}%`}
					variant="information"
					style={{
						height: "15px",
						flexGrow: 1,
					}}
				/>
			</div>
		</div>
	);

	if (isSmallScreen) {
		// Render as a regular button with separate navigation links for small screens
		return (
			<div className="w-100">
				<Button href="/user/me" variant={theme} className={`${styles.userBtn} border d-flex align-items-center w-100 mb-3`}>
					{buttonContent}
				</Button>
				<Nav className="flex-column">
					<Nav.Link href="/tasks/completed" className={`${theme === "dark" ? "text-light" : "text-dark"} py-2 border-top`}>
						Completed Tasks
					</Nav.Link>
					<Nav.Link href="/tasks/create" className={`${theme === "dark" ? "text-light" : "text-dark"} py-2 border-top`}>
						Create Task
					</Nav.Link>
					<Nav.Link href="/logout" className={`${theme === "dark" ? "text-light" : "text-dark"} py-2 border-top`}>
						Log out
					</Nav.Link>
				</Nav>
			</div>
		);
	} else {
		// Render as a dropdown on larger screens
		return (
			<Dropdown as={ButtonGroup} className="profile-button-group border" align="end">
				<Button href="/user/me" variant={theme} className={`${styles.userBtn} d-flex flex-grow-1 align-items-center`}>
					{buttonContent}
				</Button>
				<Dropdown.Toggle split variant={theme} id="dropdown-split-basic" style={{ padding: "0.5rem 0.75rem" }} />
				<Dropdown.Menu>
					<Dropdown.Item href="/tasks/completed">Completed Tasks</Dropdown.Item>
					<Dropdown.Item href="/tasks/create">Create Task</Dropdown.Item>
					<Dropdown.Divider />
					<Dropdown.Item href="/logout">Log out</Dropdown.Item>
				</Dropdown.Menu>
			</Dropdown>
		);
	}
}

export default ProfileButton;
