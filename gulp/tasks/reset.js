import { deleteAsync } from "del"
export const del = () => {
	return deleteAsync(['dist'])
}

