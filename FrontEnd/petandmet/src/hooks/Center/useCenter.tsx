import create from "zustand";
import { domain } from "../../hooks/customQueryClient";
import { getAccessTokenFromLocalStorage } from "../useAuth";
import axios from "axios";

interface CenterData {
  centerId: string;
  name: string;
  address: string;
  phone: string;
  email: string;
}

interface UseCenterState extends CenterData {
  fetchCenterData: () => Promise<void>;
}

const useCenter = create<UseCenterState>((set) => ({
  centerId: "",
  name: "",
  address: "",
  phone: "",
  email: "",
  fetchCenterData: async () => {
    try {
      const accessToken = getAccessTokenFromLocalStorage();
      if (!accessToken) {
        console.error(
          "액세스 토큰이 로컬 스토리지에 존재하지 않습니다. 로그인을 해주세요."
        );
        return;
      }
      // center uuid는 centerList에서 뽑아올 center_uuid 에서 선택 후, 그 uuid를 Zustand에서 state 변화해서 그 값만 가져옴.
      const uuid = "0ca11e5c-0a4d-498f-a24c-ff0e1bd2e3d3"; // DB에 있는 더미 데이터
      const centerData = await fetchCenterDataFromApi(uuid, accessToken);

      set({
        centerId: uuid,
        name: centerData.name,
        address: centerData.address,
        phone: centerData.phone,
        email: centerData.email,
      });
    } catch (error) {
      console.error("보호소 데이터 가져오기 오류:", error);
    }
  },
}));

async function fetchCenterDataFromApi(
  uuid: string,
  accessToken: string
): Promise<CenterData> {
  const url = `${domain}/center/detail?id=${uuid}`;

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    // API 응답 데이터의 response 프로퍼티에서 필요한 데이터 추출
    const responseData = response.data.response;
    const data: CenterData = {
      centerId: responseData.centerId,
      name: responseData.name,
      address: responseData.address,
      phone: responseData.phone,
      email: responseData.email,
    };
    return data;
  } catch (error) {
    console.error("API 요청 에러:", error);
    throw error;
  }
}

export default useCenter;
