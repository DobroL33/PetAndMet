// useAnimal.ts 파일

import create from "zustand";
import { domain } from "../../hooks/customQueryClient";
import { getAccessTokenFromLocalStorage } from "./useAuth";
import axios from "axios";

interface AnimalData {
  name: string;
  age: number;
  // 필요한 추가 속성들을 추가할 수 있습니다.
}

interface UseAnimalState extends AnimalData {
  fetchAnimalData: () => Promise<void>;
}

const useAnimal = create<UseAnimalState>((set) => ({
  name: "",
  age: 0,
  fetchAnimalData: async () => {
    try {
      const accessToken = getAccessTokenFromLocalStorage();
      if (!accessToken) {
        console.error(
          "액세스 토큰이 로컬 스토리지에 존재하지 않습니다. 로그인을 해주세요."
        );
        return;
      }

      const uuid = "aa"; // UUID를 'aa'로 설정
      const animalData = await fetchAnimalDataFromApi(uuid, accessToken);

      // 데이터에서 필요한 값을 추출하여 상태 업데이트
      set({
        name: animalData.name,
        age: animalData.age,
        // 필요한 추가 정보들도 필요에 따라 업데이트
      });
    } catch (error) {
      console.error("애완동물 데이터 가져오기 오류:", error);
    }
  },
}));

async function fetchAnimalDataFromApi(
  uuid: string,
  accessToken: string
): Promise<AnimalData> {
  const url = `${domain}/animal?uuid=${uuid}`;

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    // API 응답 데이터의 response 프로퍼티에서 필요한 데이터 추출
    const responseData = response.data.response;
    const data: AnimalData = {
      name: responseData.name,
      age: responseData.age,
      // 필요한 추가 정보들도 필요에 따라 추가
    };
    console.log(responseData);
    console.log(data);
    return data;
  } catch (error) {
    console.error("API 요청 에러:", error);
    throw error;
  }
}

export default useAnimal;
