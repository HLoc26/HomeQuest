import TaskContext from "./TaskContext";
import { useContext } from "react";

export const useTask = () => {
	return useContext(TaskContext);
};
