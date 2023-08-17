import { Box } from "@mui/material";
import CardInfo from "containers/components/Card";
import { useEffect, useState } from "react";
import { useAnimalList, Animal } from "hooks/Animal/useAnimalList";

//보호 동물 데이터를 받는다면 animals 활성화
interface AnimalListProps {
  num?: number;
  // animals: Animal[];
}
// num 값에는 보호동물 수가 들어갈 예정
function AnimalList({ num = 15 }: AnimalListProps) {
  const [animalToShow, setAnimalsToShow] = useState<Animal[]>();
  const { data, refetch } = useAnimalList();

  console.log("애니멀 리스트 data?.response");
  console.log(data?.response);

  useEffect(() => {
    refetch();
  }, [num]);

  useEffect(() => {
    if (data) {
      setAnimalsToShow(data.response);
    }
  }, [data]);

  return (
    <>
      <Box
        sx={{
          mt: 1,
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)", // 이 부분을 추가하여 카드를 자동으로 정렬합니다.
          gap: "8px", // 카드 간 간격 설정
          height: "95%",
        }}
      >
        {animalToShow !== undefined &&
          animalToShow.map((animal) => (
            <CardInfo key={animal.animal_uuid} animal={animal} />
          ))}
      </Box>
    </>
  );
}
export default AnimalList;
