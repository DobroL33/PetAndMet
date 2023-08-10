import { Box } from '@mui/material';
import CardInfo from 'containers/components/Card'
import axios from 'axios';
import { error } from 'console';
import React, { useEffect, useState } from 'react';

//보호 동물 데이터를 받는다면 animals 활성화
interface AnimalListProps {
  num?: number;
  // animals: Animal[];
}
// num 값에는 보호동물 수가 들어갈 예정
function AnimalList({ num = 15 }: AnimalListProps) {
  const [animalToShow, setAnimalsToShow] = useState<any[]>([]);
  
  useEffect(() => {
    axios.get('https://i9b302.p.ssafy.io/api/v1/animal?page=0')
      .then((response) => {
        console.log(response.data.response); 
        setAnimalsToShow(response.data.response);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [num]);

  let animalsToShow : any = []

  if (num !== undefined) {
    animalsToShow = Array.from({length : num})
  }
  
  return (
    <>
    <Box 
      sx={{
        mt: 1,
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)', // 이 부분을 추가하여 카드를 자동으로 정렬합니다.
        gap: '8px', // 카드 간 간격 설정
        height: '95%',
      }}
    >
      {animalToShow.map((animal:any, idx:number) => (
        <CardInfo key={idx} animal={animal} />
        ))}
    </Box>
    </>
  )
}
export default AnimalList
export {}
