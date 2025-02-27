import { Button } from "react-bootstrap";

import { useStore, actions } from "~/store";

function ThemeButton() {
	const [state, dispatch] = useStore();
	const theme = state.theme;

	const handleChangeTheme = () => {
		const html = document.getElementsByTagName("html")[0];
		if (theme == "light") {
			html.setAttribute("data-bs-theme", "dark");
			dispatch(actions.setTheme("dark"));
		} else {
			html.setAttribute("data-bs-theme", "light");
			dispatch(actions.setTheme("light"));
		}
	};

	return (
		<Button onClick={handleChangeTheme} variant={theme}>
			{theme == "light" ? <i className="bi bi-sun-fill"></i> : <i className="bi bi-moon-fill"></i>}
		</Button>
	);
}

export default ThemeButton;
