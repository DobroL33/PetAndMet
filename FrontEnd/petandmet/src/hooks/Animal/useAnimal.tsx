import create from "zustand";
import axios from "axios";

interface AnimalData {
  animal_uuid: string;
  name: string;
  age: number;
  gender: string;
  breed: string;
  center_uuid: string;
  // 여기에 다른 필드를 추가할 수 있습니다.
}

// UseAnimalState 인터페이스 정의
interface UseAnimalState {
  animalData: AnimalData;
  setAnimalData: (data: any) => void; // 데이터를 받아서 AnimalData 형식으로 변환하고 상태를 설정하는 함수
}

// useAnimal 훅을 생성
const useAnimal = create<UseAnimalState>((set) => ({
  animalData: {
    animal_uuid: "",
    name: "",
    age: 0,
    gender: "",
    breed: "",
    center_uuid: "",
    // 여기에 다른 초기값을 추가할 수 있습니다.
  },
  setAnimalData: (data) => {
    // 주어진 배열 데이터를 AnimalData 형식으로 변환
    const animalData: AnimalData = {
      animal_uuid: data.animal_uuid,
      name: data.name,
      age: data.age,
      gender: data.gender,
      breed: data.breed,
      center_uuid: data.center_uuid,
      // 여기에 다른 필드 변환을 추가할 수 있습니다.
    };
    // 상태 설정
    set({ animalData });
  },
}));

export default useAnimal;
