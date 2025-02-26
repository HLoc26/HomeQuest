import NavBar from "../NavBar/NavBar";

function MainLayout({ children }) {
	return (
		<>
			<NavBar />
			{children}
		</>
	);
}

export default MainLayout;
