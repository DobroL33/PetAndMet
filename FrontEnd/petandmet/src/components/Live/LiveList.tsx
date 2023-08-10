import { Box } from '@mui/material';
import CardInfoLive from 'containers/components/CardLive';
//라이브 가능 동물 데이터를 받는다면 animals 활성화
interface LiveListProps {
  num?: number;
  // animals: Animal[];
}
// num 값에는 라이브가능 동물 수가 들어갈 예정
function LiveList({ num =10 }: LiveListProps) {
  let livesToShow : any = []
  
  if (num !== undefined) {
    livesToShow = Array.from({length : num})
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
      {livesToShow.map((item:any, idx:number) => (
        <CardInfoLive key={idx} />
        ))}
    </Box>
    </>
  )
}
export default LiveList
export {}
