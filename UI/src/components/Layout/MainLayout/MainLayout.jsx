import NavBar from "~/components/Layout/NavBar/NavBar";

function MainLayout({ children }) {
	return (
		<>
			<NavBar />
			{children}
		</>
	);
}

export default MainLayout;
