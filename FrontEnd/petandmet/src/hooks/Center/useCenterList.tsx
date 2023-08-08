import create from "zustand";
import { domain } from "../../hooks/customQueryClient";
import { getAccessTokenFromLocalStorage } from "../useAuth";
import axios from "axios";

interface CenterData {
  centerId: string;
  name: string;
}

interface UseCenterListState {
  centerList: Array<CenterData>;
  fetchCenterList: () => Promise<void>;
}

const useCenterList = create<UseCenterListState>((set) => ({
  centerList: [],
  fetchCenterList: async () => {
    try {
      const accessToken = getAccessTokenFromLocalStorage();
      if (!accessToken) {
        console.error(
          "액세스 토큰이 로컬 스토리지에 존재하지 않습니다. 로그인을 해주세요."
        );
        return;
      }

      const centerListData = await fetchCenterListDataFromApi(accessToken);

      set({
        centerList: centerListData,
      });
    } catch (error) {
      console.error("보호소 목록 데이터 가져오기 오류:", error);
    }
  },
}));

async function fetchCenterListDataFromApi(
  accessToken: string
): Promise<Array<CenterData>> {
  const url = `${domain}/center?page=0&size=5`; // Assuming this URL returns the list of centers

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    console.log("여기는 센터리스트", response);

    // API response data contains an object with an array of centers
    const centerListData: Array<CenterData> = response.data.response.map(
      (center: any) => ({
        centerId: center.uuid,
        name: center.name,
      })
    );

    return centerListData;
  } catch (error) {
    console.error("API 요청 에러:", error);
    throw error;
  }
}

export default useCenterList;
