import { useQuery } from "react-query";
import { getAllPosition } from "../requests/positionRequest";

const useGetAllPosition = () => {
    const data = useQuery(["getAllPosition"], getAllPosition, { retryDelay: 3000 });
    return data;
}

export default useGetAllPosition;