import create from "zustand";
import { domain } from "../../hooks/customQueryClient";
import { getAccessTokenFromLocalStorage } from "../useAuth";
import axios from "axios";

interface AnimalData {
  animalId: string;
  name: string;
  age: number;
  gender: string;
  breed: string;
}

interface UseAnimalState extends AnimalData {
  fetchAnimalData: () => Promise<void>;
}

const useAnimal = create<UseAnimalState>((set) => ({
  animalId: "",
  name: "",
  age: 0,
  gender: "",
  breed: "",
  fetchAnimalData: async () => {
    try {
      const accessToken = getAccessTokenFromLocalStorage();
      if (!accessToken) {
        console.error(
          "액세스 토큰이 로컬 스토리지에 존재하지 않습니다. 로그인을 해주세요."
        );
        return;
      }
      // UUID를 일단 'aa'로 설정, aa를 event를 넣어서 현재 state가 aa 같은 uuid가 다른 동물 uuid로 바뀌게끔한다.
      // ex )

      const uuid = "aa";
      const animalData = await fetchAnimalDataFromApi(uuid, accessToken);

      set({
        animalId: uuid,
        name: animalData.name,
        age: animalData.age,
        gender: animalData.gender,
        breed: animalData.breed,
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
      animalId: responseData.animalId,
      name: responseData.name,
      age: responseData.age,
      gender: responseData.gender,
      breed: responseData.breed,
    };
    return data;
  } catch (error) {
    console.error("API 요청 에러:", error);
    throw error;
  }
}

export default useAnimal;
