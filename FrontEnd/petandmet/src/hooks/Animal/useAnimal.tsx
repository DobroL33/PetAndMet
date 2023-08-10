import create from "zustand";
import { domain } from "../../hooks/customQueryClient";
import { getAccessTokenFromLocalStorage } from "../useAuth";
import axios from "axios";

// Animal 데이터의 형식을 정의한 인터페이스
interface AnimalData {
  animalId: string;
  name: string;
  age: number;
  gender: string;
  breed: string;
  center_uuid: string;
}

// UseAnimalState 인터페이스 정의
interface UseAnimalState extends AnimalData {
  fetchAnimalData: () => Promise<AnimalData>;
}

// useAnimal 훅을 생성
const useAnimal = create<UseAnimalState>((set) => ({
  animalId: "",
  name: "",
  age: 0,
  gender: "",
  breed: "",
  center_uuid: "",
  fetchAnimalData: async () => {
    try {
      const accessToken = getAccessTokenFromLocalStorage();
      if (!accessToken) {
        console.error(
          "액세스 토큰이 로컬 스토리지에 존재하지 않습니다. 로그인을 해주세요."
        );
        return Promise.reject("액세스 토큰이 없음");
      }

      const uuid = "982813f2-823d-4286-bc39-ade068d45ddc";
      const animalData = await fetchAnimalDataFromApi(uuid, accessToken);

      set({
        animalId: uuid,
        name: animalData.name,
        age: animalData.age,
        gender: animalData.gender,
        breed: animalData.breed,
        center_uuid: animalData.center_uuid,
      });

      return animalData; // 수정된 부분
    } catch (error) {
      console.error("애완동물 데이터 가져오기 오류:", error);
      return Promise.reject(error); // 수정된 부분
    }
  },
}));

// API로부터 Animal 데이터 가져오는 함수
async function fetchAnimalDataFromApi(
  uuid: string,
  accessToken: string
): Promise<AnimalData> {
  const url = `${domain}/animal/detail?uuid=${uuid}`;

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const responseData = response.data.response;
    const data: AnimalData = {
      animalId: responseData.animalId,
      name: responseData.name,
      age: responseData.age,
      gender: responseData.gender,
      breed: responseData.breed,
      center_uuid: responseData.center_uuid,
    };

    return data;
  } catch (error) {
    console.error("API 요청 에러:", error);
    throw error;
  }
}

export default useAnimal;
