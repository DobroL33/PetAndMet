import { domain } from "../customQueryClient";
import axios from "axios";

interface CenterData{
    uuid : string,
    name : string
}

const CenterDataList = async () => {
    try {
      const response = await axios.get(`${domain}/center?page=0`)
      const centersData = response.data.response.boards
      return centersData
    } catch (error) {
      console.log(error)
      return [];
    }
  };
  
  export default CenterDataList;