import { Box } from "@mui/material";
import CardInfo from "containers/components/Card";
import axios from "axios";
import { error } from "console";
import React, { useEffect, useState } from "react";

//보호 동물 데이터를 받는다면 animals 활성화
interface CenterAnimalListProps {
  animals: AnimalsData[]
  // animals: Animal[];
}

interface AnimalsData {
    animal_uuid: string | null;
    animal_photo_url: string | null;
    name: string | null;
    age: number | null;
    specie: string | null;
    breed: string | null;
    center_uuid : string,

  }

// num 값에는 보호동물 수가 들어갈 예정
function CenterAnimalList({ animals }: CenterAnimalListProps) {
  const [animalToShow, setAnimalsToShow] = useState<any[]>([]);

  let animalsToShow: any = [];

  if (animals && animals.length > 0) {
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
            {animals.map((animal: any, idx: number) => (
              <CardInfo key={idx} animal={animal} />
            ))}
          </Box>
        </>
      );
  }
  else{
    return(
        <>
        <h1>등록된 보호 동물이 없습니다.</h1>
        </>
    )
  }

}
export default CenterAnimalList;
export {};
