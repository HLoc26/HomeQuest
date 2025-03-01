import { ProgressBar } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Dropdown from "react-bootstrap/Dropdown";
import { useStore } from "~/store";
import styles from "./ProfileButton.module.css";

function ProfileButton() {
	const [state, dispatch] = useStore();
	const user = state.user;
	const theme = state.theme;

	return (
		<Dropdown as={ButtonGroup} className="profile-button-group border">
			<Button href="/user/me" variant={theme} className={`${styles.userBtn} d-flex align-items-center`}>
				<div style={{ minWidth: "150px" }}>
					<div className={styles.userName}>{user.usn}</div>
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
			</Button>

			<Dropdown.Toggle split variant={theme} id="dropdown-split-basic" style={{ padding: "0.5rem 0.75rem" }} />

			<Dropdown.Menu>
				<Dropdown.Item href="/tasks">Your tasks</Dropdown.Item>
				<Dropdown.Divider />
				<Dropdown.Item href="/logout">Log out</Dropdown.Item>
			</Dropdown.Menu>
		</Dropdown>
	);
}

export default ProfileButton;
