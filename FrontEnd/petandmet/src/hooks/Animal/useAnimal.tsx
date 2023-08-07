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
      const animalData = await fetchAnimalData(uuid, accessToken);

      set((state) => ({
        ...state,
        ...animalData,
      }));
    } catch (error) {
      console.error("애완동물 데이터 가져오기 오류:", error);
    }
  },
}));

async function fetchAnimalData(
  uuid: string,
  accessToken: string
): Promise<AnimalData> {
  const url = `${domain}/animal?uuid=${uuid}`;
  const response = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  ``;
  console.log({ response });
  const data: AnimalData = { name: "abc", age: 123 };
  return data;
}

export default useAnimal;
