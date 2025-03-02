import { Button } from "react-bootstrap";

import axios from "~/api/axios.js";

function AssignButton() {
	const handleAssign = () => {};

	return (
		<Button className="rounded-pill px-3 py-2 btn btn-outline-light my-3" onClick={handleAssign}>
			Nhận nhiệm vụ
		</Button>
	);
}

export default AssignButton;
