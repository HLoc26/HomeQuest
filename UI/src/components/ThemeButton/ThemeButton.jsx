import { Button } from "react-bootstrap";

import { useUser, actions } from "~/store";

function ThemeButton() {
	const [userState, userDispatch] = useUser();
	const theme = userState.theme;

	const handleChangeTheme = () => {
		const html = document.getElementsByTagName("html")[0];
		if (theme == "light") {
			html.setAttribute("data-bs-theme", "dark");
			userDispatch(actions.setTheme("dark"));
		} else {
			html.setAttribute("data-bs-theme", "light");
			userDispatch(actions.setTheme("light"));
		}
	};

	return (
		<Button onClick={handleChangeTheme} variant={theme}>
			{theme == "light" ? <i className="bi bi-sun-fill"></i> : <i className="bi bi-moon-fill"></i>}
		</Button>
	);
}

export default ThemeButton;
